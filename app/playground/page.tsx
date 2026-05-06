// @ts-nocheck
'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AppShell } from '@/components/app-shell';
import {
  Background,
  BackgroundVariant,
  Edge,
  Handle,
  MarkerType,
  Node,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import { GROUPS, HistoryEntry, KIND_META, NodeKind, WF_EDGES, WF_NODES, WFEdge, getAlignedWFNodes } from '@/lib/data';
import { Search } from 'lucide-react';

const DONE_META = { bg: '#021A0E', border: '#16A34A', color: '#86EFAC' };

const PULSE_CSS = `
  @keyframes nodePulse {
    0%,100% { box-shadow: 0 0 0 2px #3B82F6, 0 0 14px rgba(59,130,246,0.45); }
    50%      { box-shadow: 0 0 0 4px #3B82F6, 0 0 30px rgba(59,130,246,0.75); }
  }
  @keyframes blockedPulse {
    0%,100% { box-shadow: 0 0 0 2px #A855F7, 0 0 10px rgba(168,85,247,0.35); }
    50%      { box-shadow: 0 0 0 3px #A855F7, 0 0 20px rgba(168,85,247,0.6); }
  }
`;

const OPTIMAL_SOLD_STEPS = 18;

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const mins = String(date.getUTCMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${mins}`;
};

interface SavedPath {
  id: string;
  name: string;
  timestamp: number;
  history: HistoryEntry[];
  finalNodeId: string;
  finalNodeLabel: string;
  isTerminalGood: boolean;
}

// ─── Edge routing helpers (module-level, computed once) ───────────────────────
//
// Routing is computed in three passes at import time:
//   1. resolveRoute  — per edge, search every (side combo × offset candidate)
//                      with a real segment-vs-node collision check. A zero-
//                      collision route always wins; otherwise the resolver
//                      picks the smallest collision count with the *largest*
//                      offset, so the path visibly bends around the blocker
//                      instead of passing through it.
//   2. slot assign   — per (node, side), spread the edges across N slots so
//                      edges sharing a side don't all launch from the same pixel.
//   3. offset stagger— +10px stagger on top of each edge's resolved base offset
//                      for edges sharing the same source slot, so smoothstep
//                      paths in a shared trunk run don't overlap.

type Side = 'right' | 'left' | 'top' | 'bottom';
const SIDE_PREFIX: Record<Side, string> = { right: 'r', left: 'l', top: 't', bottom: 'b' };

// Number of attachment slots per side. 5 fits the highest-fan-out node (start)
// while keeping per-node Handle count manageable.
const NUM_SLOTS = 5;

// Default React Flow smoothstep offset.
const DEFAULT_OFFSET = 20;

// Pre-align nodes and build a position lookup (pure, no side-effects).
const ALIGNED_NODES = getAlignedWFNodes();
const _NODE_POS = new Map(ALIGNED_NODES.map(n => [n.id, n]));
const _EDGE_BY_ID = new Map(WF_EDGES.map(e => [e.id, e]));

const isHorizSide = (s: Side) => s === 'left' || s === 'right';

function pickSides(
  src: { x: number; y: number } | undefined,
  tgt: { x: number; y: number } | undefined,
): { srcSide: Side; tgtSide: Side } {
  if (!src || !tgt) return { srcSide: 'right', tgtSide: 'left' };
  const dx = tgt.x - src.x;
  const dy = tgt.y - src.y;
  // Angle in degrees, [-180, 180]. 0° = pure right, 90° = pure down.
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const abs = Math.abs(angle);
  // Bias toward horizontal handles up to ±55°, so a node with several
  // outgoing edges fans across multiple sides instead of stacking on `right`.
  const HORIZ_THRESHOLD = 55;
  if (abs <= HORIZ_THRESHOLD) return { srcSide: 'right', tgtSide: 'left' };
  if (abs >= 180 - HORIZ_THRESHOLD) return { srcSide: 'left', tgtSide: 'right' };
  return angle > 0
    ? { srcSide: 'bottom', tgtSide: 'top' }
    : { srcSide: 'top', tgtSide: 'bottom' };
}

// Bounding box used for edge-vs-node collision checks. Matches the rendered
// node footprint (width is set in WorkflowNodeComponent; height is content-driven
// but ~60 in practice). A small padding keeps the path visibly clear of nodes.
const N_BOX_W = 200;
const N_BOX_H = 60;
const COLLISION_PAD = 6;

function sidePoint(
  node: { x: number; y: number },
  side: Side,
  slotIdx: number = Math.floor(NUM_SLOTS / 2),
): { x: number; y: number } {
  const pct = (slotIdx + 1) / (NUM_SLOTS + 1);
  switch (side) {
    case 'right':  return { x: node.x + N_BOX_W,        y: node.y + N_BOX_H * pct };
    case 'left':   return { x: node.x,                  y: node.y + N_BOX_H * pct };
    case 'top':    return { x: node.x + N_BOX_W * pct,  y: node.y };
    case 'bottom': return { x: node.x + N_BOX_W * pct,  y: node.y + N_BOX_H };
  }
}

type Seg = [number, number, number, number]; // [x1, y1, x2, y2], axis-aligned

// Approximate React Flow's smoothstep path as axis-aligned segments at a given
// offset. For parallel src/tgt sides the trunk runs through the midpoint by
// default, but a larger offset pushes the trunk outward — which is precisely
// what lets a wider offset detour around a blocking node.
function smoothstepPath(
  sp: { x: number; y: number },
  srcSide: Side,
  tp: { x: number; y: number },
  tgtSide: Side,
  offset: number,
): Seg[] {
  const sH = isHorizSide(srcSide);
  const tH = isHorizSide(tgtSide);

  if (sH && tH) {
    let trunkX: number;
    if (srcSide === 'right' && tgtSide === 'left') {
      trunkX = sp.x < tp.x ? Math.max((sp.x + tp.x) / 2, sp.x + offset) : sp.x + offset;
    } else if (srcSide === 'left' && tgtSide === 'right') {
      trunkX = sp.x > tp.x ? Math.min((sp.x + tp.x) / 2, sp.x - offset) : sp.x - offset;
    } else if (srcSide === 'right') {
      trunkX = Math.max(sp.x, tp.x) + offset;
    } else {
      trunkX = Math.min(sp.x, tp.x) - offset;
    }
    return [
      [sp.x, sp.y, trunkX, sp.y],
      [trunkX, sp.y, trunkX, tp.y],
      [trunkX, tp.y, tp.x, tp.y],
    ];
  }
  if (!sH && !tH) {
    let trunkY: number;
    if (srcSide === 'bottom' && tgtSide === 'top') {
      trunkY = sp.y < tp.y ? Math.max((sp.y + tp.y) / 2, sp.y + offset) : sp.y + offset;
    } else if (srcSide === 'top' && tgtSide === 'bottom') {
      trunkY = sp.y > tp.y ? Math.min((sp.y + tp.y) / 2, sp.y - offset) : sp.y - offset;
    } else if (srcSide === 'bottom') {
      trunkY = Math.max(sp.y, tp.y) + offset;
    } else {
      trunkY = Math.min(sp.y, tp.y) - offset;
    }
    return [
      [sp.x, sp.y, sp.x, trunkY],
      [sp.x, trunkY, tp.x, trunkY],
      [tp.x, trunkY, tp.x, tp.y],
    ];
  }
  // L-shape: corner is fixed by the sides; offset doesn't move the trunk.
  if (sH) {
    return [[sp.x, sp.y, tp.x, sp.y], [tp.x, sp.y, tp.x, tp.y]];
  }
  return [[sp.x, sp.y, sp.x, tp.y], [sp.x, tp.y, tp.x, tp.y]];
}

function segHitsBox(seg: Seg, bx: number, by: number): boolean {
  const [x1, y1, x2, y2] = seg;
  const px1 = bx - COLLISION_PAD, py1 = by - COLLISION_PAD;
  const px2 = bx + N_BOX_W + COLLISION_PAD, py2 = by + N_BOX_H + COLLISION_PAD;
  if (x1 === x2) {
    if (x1 < px1 || x1 > px2) return false;
    const lo = Math.min(y1, y2), hi = Math.max(y1, y2);
    return hi >= py1 && lo <= py2;
  }
  if (y1 === y2) {
    if (y1 < py1 || y1 > py2) return false;
    const lo = Math.min(x1, x2), hi = Math.max(x1, x2);
    return hi >= px1 && lo <= px2;
  }
  return false;
}

function pathCollisions(srcId: string, tgtId: string, segs: Seg[]): number {
  let count = 0;
  for (const n of ALIGNED_NODES) {
    if (n.id === srcId || n.id === tgtId) continue;
    for (const seg of segs) {
      if (segHitsBox(seg, n.x, n.y)) { count++; break; }
    }
  }
  return count;
}

// All 12 directional handle pairs (excluding same-side, which kinks back on itself).
const SIDE_OPTIONS: Array<{ srcSide: Side; tgtSide: Side }> = [
  { srcSide: 'right',  tgtSide: 'left'   },
  { srcSide: 'left',   tgtSide: 'right'  },
  { srcSide: 'bottom', tgtSide: 'top'    },
  { srcSide: 'top',    tgtSide: 'bottom' },
  { srcSide: 'right',  tgtSide: 'top'    },
  { srcSide: 'right',  tgtSide: 'bottom' },
  { srcSide: 'left',   tgtSide: 'top'    },
  { srcSide: 'left',   tgtSide: 'bottom' },
  { srcSide: 'bottom', tgtSide: 'left'   },
  { srcSide: 'bottom', tgtSide: 'right'  },
  { srcSide: 'top',    tgtSide: 'left'   },
  { srcSide: 'top',    tgtSide: 'right'  },
];

// Offset candidates searched per side combo. Includes the default plus a
// progressively wider series so the resolver can detour the trunk around
// blocking nodes when no clean route exists.
const OFFSET_CANDIDATES = [20, 40, 80, 140, 220, 320];

interface ResolvedRoute {
  srcSide: Side;
  tgtSide: Side;
  offset: number;
  collisions: number;
}

// Pass 1: per-edge route resolution.
//
// For each edge we evaluate every (side combo) × (offset candidate). Each
// candidate is scored by how many *other* nodes its actual smoothstep
// segments (with padding) intersect. Selection rules:
//   • zero-collision wins outright; among ties prefer the geometric pick
//     at the smallest offset for visual cleanness.
//   • when no zero-collision route exists, pick the lowest collision count
//     with the *largest* offset — a wide detour reads as "going around"
//     instead of "passing through."
function resolveRoute(srcId: string, tgtId: string): ResolvedRoute {
  const src = _NODE_POS.get(srcId);
  const tgt = _NODE_POS.get(tgtId);
  const fallback: ResolvedRoute = {
    srcSide: 'right', tgtSide: 'left', offset: DEFAULT_OFFSET, collisions: 0,
  };
  if (!src || !tgt) return fallback;

  const initial = pickSides(src, tgt);
  const orderedCombos = [
    initial,
    ...SIDE_OPTIONS.filter(o => !(o.srcSide === initial.srcSide && o.tgtSide === initial.tgtSide)),
  ];

  type Cand = ResolvedRoute & { isInitial: boolean };
  let best: Cand | null = null;

  for (let i = 0; i < orderedCombos.length; i++) {
    const combo = orderedCombos[i];
    const sp = sidePoint(src, combo.srcSide);
    const tp = sidePoint(tgt, combo.tgtSide);
    const isInitial = i === 0;

    for (const offset of OFFSET_CANDIDATES) {
      const segs = smoothstepPath(sp, combo.srcSide, tp, combo.tgtSide, offset);
      const collisions = pathCollisions(srcId, tgtId, segs);
      const cand: Cand = {
        srcSide: combo.srcSide,
        tgtSide: combo.tgtSide,
        offset,
        collisions,
        isInitial,
      };

      if (!best) { best = cand; continue; }
      if (cand.collisions < best.collisions) { best = cand; continue; }
      if (cand.collisions > best.collisions) continue;

      // Same collision count — apply tiebreakers.
      if (cand.collisions === 0) {
        // Prefer the natural geometric pick, then the smaller offset.
        if (cand.isInitial !== best.isInitial) {
          if (cand.isInitial) best = cand;
        } else if (cand.offset < best.offset) {
          best = cand;
        }
      } else {
        // Unavoidable crossing — prefer a *wider* detour so the path visibly
        // bends around the blocker rather than skimming through it.
        if (cand.offset > best.offset) best = cand;
      }
    }
  }

  return best ?? fallback;
}

const _resolved = new Map<string, ResolvedRoute>();
for (const we of WF_EDGES) {
  _resolved.set(we.id, resolveRoute(we.from, we.to));
}

// Pass 2: slot assignment. Group outgoing edges per (sourceNode, side) and
// sort by the *other* end's coordinate along the relevant axis (y for r/l,
// x for t/b). Same for incoming. Then evenly distribute across NUM_SLOTS.
function assignSlotIndex(count: number, idx: number): number {
  if (count <= 1) return Math.floor(NUM_SLOTS / 2);
  return Math.round((idx / (count - 1)) * (NUM_SLOTS - 1));
}

const _outGroups = new Map<string, string[]>();
const _inGroups = new Map<string, string[]>();
for (const we of WF_EDGES) {
  const r = _resolved.get(we.id)!;
  const oKey = `${we.from}|${r.srcSide}`;
  const iKey = `${we.to}|${r.tgtSide}`;
  if (!_outGroups.has(oKey)) _outGroups.set(oKey, []);
  if (!_inGroups.has(iKey)) _inGroups.set(iKey, []);
  _outGroups.get(oKey)!.push(we.id);
  _inGroups.get(iKey)!.push(we.id);
}

const _srcSlot = new Map<string, number>();
const _tgtSlot = new Map<string, number>();
for (const [key, ids] of _outGroups) {
  const side = key.split('|')[1] as Side;
  const sorted = ids.slice().sort((a, b) => {
    const aTo = _NODE_POS.get(_EDGE_BY_ID.get(a)!.to);
    const bTo = _NODE_POS.get(_EDGE_BY_ID.get(b)!.to);
    if (!aTo || !bTo) return 0;
    return side === 'right' || side === 'left' ? aTo.y - bTo.y : aTo.x - bTo.x;
  });
  sorted.forEach((id, i) => _srcSlot.set(id, assignSlotIndex(sorted.length, i)));
}
for (const [key, ids] of _inGroups) {
  const side = key.split('|')[1] as Side;
  const sorted = ids.slice().sort((a, b) => {
    const aFrom = _NODE_POS.get(_EDGE_BY_ID.get(a)!.from);
    const bFrom = _NODE_POS.get(_EDGE_BY_ID.get(b)!.from);
    if (!aFrom || !bFrom) return 0;
    return side === 'right' || side === 'left' ? aFrom.y - bFrom.y : aFrom.x - bFrom.x;
  });
  sorted.forEach((id, i) => _tgtSlot.set(id, assignSlotIndex(sorted.length, i)));
}

const EDGE_HANDLES = new Map<string, { sourceHandle: string; targetHandle: string }>(
  WF_EDGES.map(we => {
    const r = _resolved.get(we.id)!;
    const ss = _srcSlot.get(we.id) ?? Math.floor(NUM_SLOTS / 2);
    const ts = _tgtSlot.get(we.id) ?? Math.floor(NUM_SLOTS / 2);
    return [we.id, {
      sourceHandle: `${SIDE_PREFIX[r.srcSide]}${ss}`,
      targetHandle: `${SIDE_PREFIX[r.tgtSide]}${ts}`,
    }];
  }),
);

// Pass 3: stagger edges sharing a source slot so trunks don't overlap. Each
// edge starts from its resolved base offset (which already accounts for any
// collision detour) and gets +10px per same-slot sibling.
const _slotGroups = new Map<string, string[]>();
for (const we of WF_EDGES) {
  const { sourceHandle } = EDGE_HANDLES.get(we.id)!;
  const k = `${we.from}|${sourceHandle}`;
  if (!_slotGroups.has(k)) _slotGroups.set(k, []);
  _slotGroups.get(k)!.push(we.id);
}
const EDGE_OFFSETS = new Map<string, number>();
for (const ids of _slotGroups.values()) {
  ids.forEach((id, i) => {
    const base = _resolved.get(id)!.offset;
    EDGE_OFFSETS.set(id, base + i * 10);
  });
}

// ─── Path counts per terminal (computed once at module load) ─────────────────

interface TerminalPathCount {
  id: string;
  label: string;
  kind: 'terminal_good' | 'terminal_bad';
  count: number;
}

function countPathsPerTerminal(): TerminalPathCount[] {
  const counts = new Map<string, number>();
  function dfs(nodeId: string, visited: Set<string>): void {
    const node = WF_NODES.find(n => n.id === nodeId);
    if (!node) return;
    if (node.kind === 'terminal_good' || node.kind === 'terminal_bad') {
      counts.set(nodeId, (counts.get(nodeId) ?? 0) + 1);
      return;
    }
    for (const edge of WF_EDGES.filter(e => e.from === nodeId && !visited.has(e.to))) {
      visited.add(edge.to);
      dfs(edge.to, visited);
      visited.delete(edge.to);
    }
  }
  dfs('start', new Set(['start']));
  return WF_NODES
    .filter(n => n.kind === 'terminal_good' || n.kind === 'terminal_bad')
    .map(n => ({
      id: n.id,
      label: n.label.replace(/^\p{Extended_Pictographic}[️⃣]?\s*/u, '').trim(),
      kind: n.kind as 'terminal_good' | 'terminal_bad',
      count: counts.get(n.id) ?? 0,
    }))
    .sort((a, b) => b.count - a.count);
}

const TERMINAL_PATH_COUNTS = countPathsPerTerminal();

// ─── Example workflows: shortest path to each terminal ───────────────────────
//
// One representative workflow per outcome — covers all 11 terminal cases. BFS
// from `start` tracks the parent edge for each visited node, then we walk
// backward from the terminal to reconstruct a HistoryEntry[] compatible with
// the existing highlight machinery.

function shortestHistoryBetween(startId: string, terminalId: string): HistoryEntry[] | null {
  if (startId === terminalId) return [];
  const parent = new Map<string, { fromNodeId: string; edgeId: string }>();
  const seen = new Set<string>([startId]);
  const queue: string[] = [startId];
  while (queue.length > 0) {
    const id = queue.shift()!;
    if (id === terminalId) break;
    for (const edge of WF_EDGES) {
      if (edge.from !== id || seen.has(edge.to)) continue;
      seen.add(edge.to);
      parent.set(edge.to, { fromNodeId: id, edgeId: edge.id });
      queue.push(edge.to);
    }
  }
  if (!parent.has(terminalId)) return null;

  const history: HistoryEntry[] = [];
  let cur = terminalId;
  while (cur !== startId) {
    const p = parent.get(cur);
    if (!p) return null;
    const fromNode = WF_NODES.find(n => n.id === p.fromNodeId);
    const edge = WF_EDGES.find(e => e.id === p.edgeId);
    if (!fromNode || !edge) return null;
    history.unshift({
      fromNodeId: p.fromNodeId,
      fromNodeLabel: fromNode.label,
      toNodeId: cur,
      action: edge.label,
    });
    cur = p.fromNodeId;
  }
  return history;
}

const shortestHistoryTo = (terminalId: string) => shortestHistoryBetween('start', terminalId);

// Curated full-lifecycle path: start → Purchase Intake → Sold & Delivered.
// The plain BFS shortest path to done_sold goes via the FBA Return branch,
// which skips the production-lifecycle nodes most readers expect to see in an
// "intake to sold" example. Forcing the route through the `purchase` node
// produces the canonical happy path: receiving, testing, cleaning, packaging,
// warehousing, listing, sale, delivery.
function buildIntakeToSoldWorkflow(): SavedPath | null {
  const head = shortestHistoryBetween('start', 'purchase');
  const tail = shortestHistoryBetween('purchase', 'done_sold');
  if (!head || !tail || tail.length === 0) return null;
  const finalNode = WF_NODES.find(n => n.id === 'done_sold');
  if (!finalNode) return null;
  return {
    id: 'example-intake-to-sold',
    name: '📥 Intake → 🎉 Sold & Delivered',
    timestamp: 0,
    history: [...head, ...tail],
    finalNodeId: 'done_sold',
    finalNodeLabel: finalNode.label,
    isTerminalGood: true,
  };
}

const _intakeToSold = buildIntakeToSoldWorkflow();

const EXAMPLE_WORKFLOWS: SavedPath[] = [
  ...(_intakeToSold ? [_intakeToSold] : []),
  ...TERMINAL_PATH_COUNTS
    .map((t): SavedPath | null => {
      const history = shortestHistoryTo(t.id);
      if (!history || history.length === 0) return null;
      const finalNode = WF_NODES.find(n => n.id === t.id);
      if (!finalNode) return null;
      return {
        id: `example-${t.id}`,
        name: t.label,
        timestamp: 0,
        history,
        finalNodeId: t.id,
        finalNodeLabel: finalNode.label,
        isTerminalGood: t.kind === 'terminal_good',
      };
    })
    .filter((p): p is SavedPath => p !== null),
];

// ─── Group panel node ─────────────────────────────────────────────────────────

function GroupPanelNode({ data }: { data: { label: string; bg: string; borderColor: string } }) {
  // Strip the 2-char hex alpha suffix (e.g. "#F59E0B55" → "#F59E0B") for full-opacity text
  const solidColor = data.borderColor.length === 9 ? data.borderColor.slice(0, 7) : data.borderColor;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: data.bg,
        border: `1.5px dashed ${data.borderColor}`,
        borderRadius: 14,
        padding: '42px 20px 20px 20px',
        pointerEvents: 'none',
        userSelect: 'none',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 12,
          right: 12,
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: solidColor,
            letterSpacing: '0.04em',
            lineHeight: 1.3,
            backgroundColor: `${solidColor}18`,
            border: `1px solid ${solidColor}40`,
            borderRadius: 6,
            padding: '3px 10px',
            backdropFilter: 'blur(4px)',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {data.label}
        </span>
      </div>
    </div>
  );
}

// ─── Emoji extractor ─────────────────────────────────────────────────────────

function extractEmoji(label: string): { emoji: string; text: string } {
  // Matches one emoji cluster at the start: base char + optional variation selector
  // or ZWJ sequence (covers 🖥️, 📦, 🔧, etc.)
  const re = /^(\p{Extended_Pictographic}[️⃣]?(?:‍\p{Extended_Pictographic}[️⃣]?)*)\s*/u;
  const m = label.match(re);
  return m ? { emoji: m[1], text: label.slice(m[0].length) } : { emoji: '', text: label };
}

// ─── Custom node component ────────────────────────────────────────────────────

function WorkflowNodeComponent({
  data,
}: {
  data: {
    kind: NodeKind;
    label: string;
    isActive: boolean;
    isDone: boolean;
    isHighlighted: boolean;
  };
}) {
  const { kind, label, isActive, isDone, isHighlighted } = data;
  const { emoji, text } = extractEmoji(label);
  const base = KIND_META[kind];
  const m =
    (kind === 'process' || kind === 'scan' || kind === 'financial' || kind === 'notification') && isDone
      ? { bg: DONE_META.bg, border: DONE_META.border, color: DONE_META.color }
      : base;

  const isBlocked = kind === 'blocked';

  return (
    <div
      style={{
        background: m.bg,
        border: `1.5px solid ${isHighlighted ? '#22D3EE' : m.border}`,
        borderRadius: 8,
        width: 200,
        color: m.color,
        fontWeight: 500,
        lineHeight: 1.45,
        transition: 'all 0.3s ease',
        animation: isActive
          ? 'nodePulse 1.8s ease-in-out infinite'
          : isBlocked
          ? 'blockedPulse 2.5s ease-in-out infinite'
          : 'none',
        outline: isHighlighted && !isActive ? '2px solid #22D3EE' : 'none',
        outlineOffset: isHighlighted && !isActive ? 3 : 0,
        boxShadow: isHighlighted && !isActive ? '0 0 18px rgba(34,211,238,0.55)' : undefined,
        cursor: 'default',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
      }}
    >
      {/* Target handles — NUM_SLOTS attachment points per side, invisible.
          Slots let edges from different sources land at different pixels on
          the same edge of a node, instead of all converging to one point. */}
      {Array.from({ length: NUM_SLOTS }, (_, i) => {
        const pct = `${((i + 1) / (NUM_SLOTS + 1)) * 100}%`;
        const baseStyle = { opacity: 0, width: 6, height: 6 } as const;
        return (
          <React.Fragment key={`tgt-${i}`}>
            <Handle type="target" id={`l${i}`} position={Position.Left}   style={{ ...baseStyle, top:  pct }} />
            <Handle type="target" id={`r${i}`} position={Position.Right}  style={{ ...baseStyle, top:  pct }} />
            <Handle type="target" id={`t${i}`} position={Position.Top}    style={{ ...baseStyle, left: pct }} />
            <Handle type="target" id={`b${i}`} position={Position.Bottom} style={{ ...baseStyle, left: pct }} />
          </React.Fragment>
        );
      })}

      {/* Emoji strip — 20% horizontal, full node height */}
      {emoji && (
        <div
          style={{
            width: '20%',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `${m.border}18`,
            borderRight: `1px solid ${m.border}33`,
            fontSize: 30,
            lineHeight: 1,
            filter: isActive ? `drop-shadow(0 0 8px ${m.border}cc)` : 'none',
            transition: 'filter 0.3s ease',
          }}
        >
          {emoji}
        </div>
      )}

      {/* Content — badge + label text */}
      <div
        style={{
          flex: 1,
          padding: '8px 8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 8,
            color: m.border,
            fontWeight: 700,
            letterSpacing: '0.06em',
          }}
        >
          {KIND_META[kind].tag}
        </div>
        <div style={{ fontSize: 11, lineHeight: 1.45 }}>{text}</div>
      </div>

      {/* Source handles — NUM_SLOTS attachment points per side, mirroring targets. */}
      {Array.from({ length: NUM_SLOTS }, (_, i) => {
        const pct = `${((i + 1) / (NUM_SLOTS + 1)) * 100}%`;
        const baseStyle = { opacity: 0, width: 6, height: 6 } as const;
        return (
          <React.Fragment key={`src-${i}`}>
            <Handle type="source" id={`l${i}`} position={Position.Left}   style={{ ...baseStyle, top:  pct }} />
            <Handle type="source" id={`r${i}`} position={Position.Right}  style={{ ...baseStyle, top:  pct }} />
            <Handle type="source" id={`t${i}`} position={Position.Top}    style={{ ...baseStyle, left: pct }} />
            <Handle type="source" id={`b${i}`} position={Position.Bottom} style={{ ...baseStyle, left: pct }} />
          </React.Fragment>
        );
      })}
    </div>
  );
}

const NODE_TYPES = {
  workflowNode: WorkflowNodeComponent as React.ComponentType<any>,
  group_panel: GroupPanelNode as React.ComponentType<any>,
};

// ─── Inner component ──────────────────────────────────────────────────────────

function PlaygroundInner() {
  const [currentNode, setCurrentNode] = useState<string>('start');
  const [visited, setVisited] = useState<Set<string>>(new Set(['start']));
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [filterKind, setFilterKind] = useState<NodeKind | 'all'>('all');
  const [savedPaths, setSavedPaths] = useState<SavedPath[]>([]);
  const [highlightedPathId, setHighlightedPathId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'sidebar' | 'examples' | 'saved'>('sidebar');
  const savedSignatures = React.useRef(new Set<string>());

  const { setCenter, getNode } = useReactFlow();

  // ── DB is the single source of truth — savedPaths state is always
  //    populated from /api/paths, never from optimistic local appends.
  const refreshSavedPaths = useCallback(async () => {
    try {
      const r = await fetch('/api/paths');
      const data = (await r.json()) as SavedPath[];
      if (!Array.isArray(data)) return;
      setSavedPaths(data);
      savedSignatures.current = new Set(
        data.map(p => p.history.map(h => `${h.fromNodeId}>${h.toNodeId}`).join('|'))
      );
    } catch {}
  }, []);

  useEffect(() => {
    refreshSavedPaths();
  }, [refreshSavedPaths]);

  const onInit = useCallback((instance: any) => {
    setTimeout(() => {
      instance.setCenter(85, 430, { zoom: 1.5, duration: 800 });
    }, 100);
  }, []);

  const currentWF = WF_NODES.find((n) => n.id === currentNode)!;
  const nextActions = WF_EDGES.filter((e) => e.from === currentNode);
  const isTerminal =
    currentWF.kind === 'terminal_good' || currentWF.kind === 'terminal_bad';

  // ── Auto-save the path when a terminal is reached. Persistence flow:
  //    POST → DB INSERT OR IGNORE (UNIQUE index on signature dedups) →
  //    re-fetch list from DB → setState. Local state never holds an entry
  //    that isn't actually in SQLite.
  useEffect(() => {
    if (!isTerminal || history.length === 0) return;
    const signature = history.map(h => `${h.fromNodeId}>${h.toNodeId}`).join('|');
    if (savedSignatures.current.has(signature)) return;

    const entry: SavedPath = {
      id: `path-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: currentWF.label.replace(/^\W+\s*/u, '').slice(0, 40),
      timestamp: Date.now(),
      history: [...history],
      finalNodeId: currentNode,
      finalNodeLabel: currentWF.label,
      isTerminalGood: currentWF.kind === 'terminal_good',
    };

    fetch('/api/paths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    })
      .then(() => refreshSavedPaths())
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTerminal, currentNode]);

  // ── Compute highlight node/edge ids for the currently selected saved path
  const highlightSets = useMemo(() => {
    const nodes = new Set<string>();
    const edges = new Set<string>();
    if (!highlightedPathId) return { nodes, edges };
    const path =
      savedPaths.find((p) => p.id === highlightedPathId) ??
      EXAMPLE_WORKFLOWS.find((p) => p.id === highlightedPathId);
    if (!path) return { nodes, edges };
    path.history.forEach((h) => {
      nodes.add(h.fromNodeId);
      nodes.add(h.toNodeId);
      const edge = WF_EDGES.find(
        (e) => e.from === h.fromNodeId && e.to === h.toNodeId && e.label === h.action,
      );
      if (edge) edges.add(edge.id);
    });
    return { nodes, edges };
  }, [highlightedPathId, savedPaths]);

  const handleHighlightPath = useCallback(
    (pathId: string) => {
      setHighlightedPathId((prev) => (prev === pathId ? null : pathId));
    },
    [],
  );

  const handleDeletePath = useCallback((pathId: string) => {
    setHighlightedPathId((prev) => (prev === pathId ? null : prev));
    fetch(`/api/paths?id=${encodeURIComponent(pathId)}`, { method: 'DELETE' })
      .then(() => refreshSavedPaths())
      .catch(() => {});
  }, [refreshSavedPaths]);

  // ── Pan canvas to a node without mutating workflow state ─────────────────
  const handlePeekNode = useCallback(
    (nodeId: string) => {
      const rfNode = getNode(nodeId);
      if (!rfNode) return;
      setCenter(rfNode.position.x + 85, rfNode.position.y + 30, {
        zoom: 1.5,
        duration: 600,
      });
    },
    [getNode, setCenter],
  );

  // ── Back navigation ──────────────────────────────────────────────────────
  const canGoBack = history.length > 0;

  const handleBack = useCallback(() => {
    if (!canGoBack) return;

    setHistory((prev) => {
      const next = [...prev];
      next.pop();
      return next;
    });

    setVisited((prev) => {
      const newVisited = new Set<string>(['start']);
      history.slice(0, -1).forEach((entry) => {
        newVisited.add(entry.fromNodeId);
        newVisited.add(entry.toNodeId);
      });
      return newVisited;
    });

    const prevEntry = history[history.length - 1];
    setCurrentNode(prevEntry.fromNodeId);
  }, [history, canGoBack]);

  // ── React Flow nodes ─────────────────────────────────────────────────────
  const rfNodes = useMemo<Node[]>(() => {
    const groupPanels: Node[] = GROUPS.map((g) => ({
      id: g.id,
      type: 'group_panel',
      position: { x: g.x, y: g.y },
      style: { width: g.w, height: g.h },
      selectable: false,
      draggable: false,
      focusable: false,
      zIndex: -1,
      data: { label: g.label, bg: g.bg, borderColor: g.borderColor },
    }));
    const workflowNodes: Node[] = ALIGNED_NODES.map((wn) => ({
      id: wn.id,
      position: { x: wn.x, y: wn.y },
      type: 'workflowNode',
      zIndex: 1,
      data: {
        kind: wn.kind,
        label: wn.label,
        isActive: wn.id === currentNode,
        isDone: visited.has(wn.id) && wn.id !== currentNode,
        isHighlighted: highlightSets.nodes.has(wn.id),
      },
    }));
    return [...groupPanels, ...workflowNodes];
  }, [currentNode, visited, highlightSets]);

  // ── React Flow edges ─────────────────────────────────────────────────────
  const rfEdges = useMemo(
    () =>
      WF_EDGES.map((we) => {
        const srcVisited = visited.has(we.from);
        const tgtVisited = visited.has(we.to);
        const traversed = srcVisited && tgtVisited;
        const available = activeTab === 'sidebar' && we.from === currentNode;
        const highlighted = highlightSets.edges.has(we.id);
        const { sourceHandle, targetHandle } = EDGE_HANDLES.get(we.id)!;
        const offset = EDGE_OFFSETS.get(we.id) ?? 0;

        const stroke = highlighted
          ? '#22D3EE'
          : traversed
          ? '#16A34A'
          : available
          ? '#F59E0B'
          : '#94afd4';

        const isStep = we.id === 'e_oem_yes';

        return {
          id: we.id,
          source: we.from,
          target: we.to,
          sourceHandle: isStep ? 'r2' : sourceHandle,
          targetHandle: isStep ? 't2' : targetHandle,
          type: isStep ? 'step' : 'smoothstep',
          animated: highlighted || traversed || available,
          ...(isStep ? {} : { pathOptions: { borderRadius: 10, offset } }),
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: highlighted
              ? '#22D3EE'
              : traversed
              ? '#16A34A'
              : available
              ? '#F59E0B'
              : '#374151',
          },
          style: {
            stroke,
            strokeWidth: highlighted ? 2.5 : traversed || available ? 2 : 1,
            opacity: highlighted ? 1 : traversed || available ? 1 : 0.18,
          },
          zIndex: highlighted ? 10 : 0,
        };
      }) as Edge[],
    [currentNode, visited, highlightSets, activeTab]
  );

  // ── Lock page scroll for full-screen layout ──────────────────────────────
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // ── Auto-pan to active node ───────────────────────────────────────────────
  useEffect(() => {
    const rfNode = getNode(currentNode);
    if (rfNode) {
      setCenter(rfNode.position.x + 85, rfNode.position.y + 30, {
        zoom: 1.4,
        duration: 700,
      });
    }
  }, [currentNode, getNode, setCenter]);

  // ── Action handler ────────────────────────────────────────────────────────
  const handleAction = useCallback(
    (edge: WFEdge) => {
      setHistory((prev) => [
        ...prev,
        {
          fromNodeId: currentNode,
          fromNodeLabel: currentWF.label,
          toNodeId: edge.to,
          action: edge.label,
        },
      ]);
      setVisited((prev) => new Set([...prev, edge.to]));
      setCurrentNode(edge.to);
    },
    [currentNode, currentWF]
  );

  // ── Restart ───────────────────────────────────────────────────────────────
  const handleRestart = useCallback(() => {
    setCurrentNode('start');
    setVisited(new Set(['start']));
    setHistory([]);
    setHighlightedPathId(null);
    setActiveTab('sidebar');
    savedSignatures.current = new Set(
      savedPaths.map(p => p.history.map(h => `${h.fromNodeId}>${h.toNodeId}`).join('|'))
    );
  }, [savedPaths]);

  const meta = KIND_META[currentWF.kind];

  const efficiency =
    isTerminal && history.length > 0
      ? Math.min(100, Math.round((OPTIMAL_SOLD_STEPS / history.length) * 100))
      : null;

  const efficiencyColor =
    efficiency == null
      ? '#9CA3AF'
      : efficiency >= 80
      ? '#4ADE80'
      : efficiency >= 50
      ? '#FBBF24'
      : '#F87171';

  const totalNodes = WF_NODES.length;
  const visitedCount = visited.size;
  const progressPct = Math.round((visitedCount / totalNodes) * 100);

  const kindCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    WF_NODES.forEach((n) => {
      counts[n.kind] = (counts[n.kind] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredNextActions = filterKind === 'all'
    ? nextActions
    : nextActions.filter((e) => {
        const target = WF_NODES.find((n) => n.id === e.to);
        return target?.kind === filterKind;
      });

  // Search saved paths across name, final node label, and the action text
  // of every step in the path's history.
  const filteredSavedPaths = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return savedPaths;
    return savedPaths.filter(p => {
      if (p.name.toLowerCase().includes(q)) return true;
      if (p.finalNodeLabel.toLowerCase().includes(q)) return true;
      return p.history.some(
        h =>
          h.action.toLowerCase().includes(q) ||
          h.fromNodeLabel.toLowerCase().includes(q),
      );
    });
  }, [savedPaths, searchQuery]);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 56px)', background: '#020617', overflow: 'hidden' }}>
      <style>{PULSE_CSS}</style>

      {/* ── CANVAS ──────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          nodeTypes={NODE_TYPES}
          onInit={onInit}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          minZoom={0.04}
          maxZoom={2}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#1F2937" />
        </ReactFlow>
      </div>

      {/* ── SIDE PANEL ──────────────────────────────────────────────────── */}
      <div
        style={{
          width: 300,
          flexShrink: 0,
          borderLeft: '1px solid #1F2937',
          display: 'flex',
          flexDirection: 'column',
          background: '#06090F',
          overflowY: 'auto',
          height: '100%'
        }}
        className="scrollbar-thin"
      >
        {/* Header */}
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #1F2937', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <button
              onClick={handleBack}
              disabled={!canGoBack}
              style={{
                flex: 1,
                padding: '5px 10px',
                background: canGoBack ? '#111827' : '#0A0E16',
                border: `1px solid ${canGoBack ? '#374151' : '#1F2937'}`,
                borderRadius: 6,
                color: canGoBack ? '#9CA3AF' : '#374151',
                fontSize: 11,
                cursor: canGoBack ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!canGoBack) return;
                e.currentTarget.style.background = '#1C2333';
                e.currentTarget.style.color = '#D1D5DB';
              }}
              onMouseLeave={(e) => {
                if (!canGoBack) return;
                e.currentTarget.style.background = '#111827';
                e.currentTarget.style.color = '#9CA3AF';
              }}
            >
              ← Back
            </button>
            <button
              onClick={handleRestart}
              style={{
                flex: 1,
                padding: '5px 10px',
                background: '#111827',
                border: '1px solid #374151',
                borderRadius: 6,
                color: '#9CA3AF',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              ↺ Restart
            </button>
            <button
              onClick={() => { setSearchOpen(o => !o); setSearchQuery(''); }}
              title="Search saved paths"
              style={{
                flex: 1,
                padding: '5px 10px',
                background: searchOpen ? '#1E293B' : '#111827',
                border: `1px solid ${searchOpen ? '#94A3B8' : '#374151'}`,
                borderRadius: 6,
                color: searchOpen ? '#E2E8F0' : '#9CA3AF',
                cursor: 'pointer',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                fontSize: 11,
              }}
            >
              <Search size={12} strokeWidth={2} />
              <span>Search</span>
            </button>
          </div>
          {searchOpen && (
            <div style={{ marginBottom: 8 }}>
              <input
                autoFocus
                type="text"
                placeholder="Search saved paths…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  background: '#0D1117',
                  border: '1px solid #374151',
                  borderRadius: 6,
                  color: '#E2E8F0',
                  fontSize: 11,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {searchQuery && (
                <div
                  style={{
                    marginTop: 6,
                    background: '#0A0E16',
                    border: '1px solid #1F2937',
                    borderRadius: 6,
                    maxHeight: 220,
                    overflowY: 'auto',
                  }}
                  className="scrollbar-thin"
                >
                  <div style={{
                    padding: '6px 10px',
                    fontSize: 9, color: '#4B5563',
                    fontWeight: 700, letterSpacing: '0.08em',
                    borderBottom: '1px solid #1F2937',
                  }}>
                    {filteredSavedPaths.length} of {savedPaths.length} match
                  </div>
                  {filteredSavedPaths.length === 0 ? (
                    <div style={{ padding: '10px', fontSize: 10, color: '#4B5563', fontStyle: 'italic' }}>
                      No saved paths match &ldquo;{searchQuery}&rdquo;.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {filteredSavedPaths.map(p => {
                        const isHL = p.id === highlightedPathId;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => handleHighlightPath(p.id)}
                            title={isHL ? 'Click to clear highlight' : 'Click to highlight this path on canvas'}
                            style={{
                              padding: '6px 10px',
                              background: isHL ? '#062A33' : 'transparent',
                              border: 'none',
                              borderBottom: '1px solid #111827',
                              textAlign: 'left',
                              cursor: 'pointer',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => {
                              if (!isHL) e.currentTarget.style.background = '#111827';
                            }}
                            onMouseLeave={e => {
                              if (!isHL) e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                              <span style={{ fontSize: 10 }}>{p.isTerminalGood ? '✅' : '❌'}</span>
                              <span style={{
                                fontSize: 10, fontWeight: 600, lineHeight: 1.3,
                                color: isHL ? '#22D3EE' : '#94A3B8',
                              }}>
                                {p.name}
                              </span>
                            </div>
                            <div style={{ fontSize: 9, color: '#4B5563' }}>
                              {p.history.length} steps · {formatTimestamp(p.timestamp)}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Progress bar */}
          <div style={{ height: 3, background: '#1F2937', borderRadius: 9999, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #2563EB, #16A34A)',
                borderRadius: 9999,
                transition: 'width 0.5s ease',
              }}
            />
          </div>

          {/* Legend / filter tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
            <div
              onClick={() => setFilterKind('all')}
              style={{
                display: 'flex', alignItems: 'center', gap: 3,
                fontSize: 8, fontWeight: 700,
                color: filterKind === 'all' ? '#F1F5F9' : '#6B7280',
                background: filterKind === 'all' ? '#1E293B' : '#0D1117',
                border: `1px solid ${filterKind === 'all' ? '#94A3B8' : '#374151'}`,
                padding: '1px 5px', borderRadius: 3, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <span>ALL</span>
              <span style={{ color: '#4B5563' }}>({nextActions.length})</span>
            </div>
            {(Object.entries(KIND_META) as [NodeKind, typeof KIND_META[NodeKind]][]).map(([kind, m]) => (
              <div
                key={kind}
                onClick={() => setFilterKind(filterKind === kind ? 'all' : kind)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 3,
                  fontSize: 8, color: m.color, background: m.bg,
                  border: `1px solid ${m.border}`, padding: '1px 5px',
                  borderRadius: 3, cursor: 'pointer',
                  opacity: filterKind === 'all' || filterKind === kind ? 1 : 0.4,
                  transition: 'opacity 0.15s',
                }}
              >
                <span>{m.tag}</span>
                <span style={{ color: '#4B5563' }}>({kindCounts[kind] ?? 0})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div style={{
          display: 'flex', borderBottom: '1px solid #1F2937', flexShrink: 0,
          background: '#06090F',
        }}>
          {([
            { id: 'sidebar', label: 'Sidebar' },
            { id: 'examples', label: `Examples (${EXAMPLE_WORKFLOWS.length})` },
            { id: 'saved', label: `Saved (${savedPaths.length})` },
          ] as const).map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                style={{
                  flex: 1,
                  padding: '8px 6px',
                  background: isActive ? '#0D1520' : 'transparent',
                  border: 'none',
                  borderBottom: `2px solid ${isActive ? '#22D3EE' : 'transparent'}`,
                  color: isActive ? '#E2E8F0' : '#6B7280',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#94A3B8';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#6B7280';
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Current node info */}
        {activeTab === 'sidebar' && (
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #1F2937', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.06em',
              padding: '2px 7px', borderRadius: 4,
              background: meta.bg, border: `1px solid ${meta.border}`, color: meta.color,
            }}>
              {KIND_META[currentWF.kind].tag}
            </span>
            <span style={{ fontSize: 9, color: '#4B5563' }}>{currentWF.role}</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0', marginBottom: 6, lineHeight: 1.4 }}>
            {currentWF.label}
          </div>
          <div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.65 }}>
            {currentWF.description}
          </div>
        </div>
        )}

        {/* Actions or terminal */}
        {activeTab === 'sidebar' && (isTerminal ? (
          <div style={{ padding: '16px 14px', borderBottom: '1px solid #1F2937', flexShrink: 0, textAlign: 'center' }}>
            <div style={{ fontSize: 26, marginBottom: 6 }}>
              {currentWF.kind === 'terminal_good' ? '✅' : '❌'}
            </div>
            <div style={{
              fontSize: 12, fontWeight: 600,
              color: currentWF.kind === 'terminal_good' ? '#4ADE80' : '#F87171',
              marginBottom: 12,
            }}>
              {currentWF.kind === 'terminal_good' ? 'Path Complete!' : 'Journey Ended'}
            </div>
            {efficiency !== null && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, color: '#4B5563', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 4 }}>
                  EFFICIENCY SCORE
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: efficiencyColor, lineHeight: 1, marginBottom: 2 }}>
                  {efficiency}%
                </div>
                <div style={{ fontSize: 10, color: '#4B5563' }}>
                  {history.length} decisions · optimal ≈ {OPTIMAL_SOLD_STEPS}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={handleBack}
                disabled={!canGoBack}
                style={{
                  flex: 1, padding: '9px',
                  background: canGoBack ? '#111827' : '#0A0E16',
                  border: `1px solid ${canGoBack ? '#374151' : '#1F2937'}`,
                  borderRadius: 6,
                  color: canGoBack ? '#D1D5DB' : '#374151',
                  fontSize: 12,
                  cursor: canGoBack ? 'pointer' : 'not-allowed',
                }}
              >
                ← Back
              </button>
              <button
                onClick={handleRestart}
                style={{
                  flex: 1, padding: '9px',
                  background: '#111827', border: '1px solid #374151',
                  borderRadius: 6, color: '#D1D5DB', fontSize: 12, cursor: 'pointer',
                }}
              >
                ↺ New Path
              </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: '12px 14px', borderBottom: '1px solid #1F2937', flexShrink: 0 }}>
            <div style={{ fontSize: 9, color: '#4B5563', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8 }}>
              NEXT ACTIONS {filterKind !== 'all' && (
                <span style={{ color: '#F59E0B', marginLeft: 4 }}>· filtered</span>
              )}
            </div>
            {filteredNextActions.length === 0 ? (
              <div style={{ fontSize: 11, color: '#4B5563', fontStyle: 'italic', lineHeight: 1.7 }}>
                No {filterKind !== 'all' ? KIND_META[filterKind as NodeKind]?.tag : ''} actions available.{' '}
                <span
                  onClick={() => setFilterKind('all')}
                  style={{ color: '#F59E0B', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Show all actions
                </span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {filteredNextActions.map((edge) => {
                  const targetNode = WF_NODES.find((n) => n.id === edge.to);
                  const tMeta = targetNode ? KIND_META[targetNode.kind] : meta;
                  return (
                    <button
                      key={edge.id}
                      onClick={() => handleAction(edge)}
                      style={{
                        padding: '8px 10px',
                        background: '#0D1117',
                        border: `1px solid ${meta.border}33`,
                        borderRadius: 6,
                        color: '#CBD5E1',
                        fontSize: 11,
                        textAlign: 'left',
                        cursor: 'pointer',
                        lineHeight: 1.45,
                        transition: 'all 0.15s',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                      }}
                      onMouseEnter={(e) => {
                        const b = e.currentTarget;
                        b.style.background = '#161D2B';
                        b.style.borderColor = meta.border;
                        b.style.color = '#F1F5F9';
                      }}
                      onMouseLeave={(e) => {
                        const b = e.currentTarget;
                        b.style.background = '#0D1117';
                        b.style.borderColor = `${meta.border}33`;
                        b.style.color = '#CBD5E1';
                      }}
                    >
                      <span style={{
                        fontSize: 8, fontWeight: 700,
                        color: tMeta.color, background: tMeta.bg,
                        border: `1px solid ${tMeta.border}`,
                        padding: '1px 4px', borderRadius: 3,
                        marginTop: 1, flexShrink: 0, letterSpacing: '0.04em',
                      }}>
                        {tMeta.tag}
                      </span>
                      <span>{edge.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* Example workflows — shortest path to each terminal, one per outcome.
            Read-only; clicking highlights the path on the canvas via the same
            machinery as user-saved paths. */}
        {activeTab === 'examples' && (
        <div style={{
          padding: '10px 14px', borderBottom: '1px solid #1F2937', flexShrink: 0,
          overflowY: 'auto',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 6,
          }}>
            <div style={{ fontSize: 9, color: '#4B5563', fontWeight: 700, letterSpacing: '0.08em' }}>
              EXAMPLE WORKFLOWS ({EXAMPLE_WORKFLOWS.length})
            </div>
            {highlightedPathId?.startsWith('example-') && (
              <button
                onClick={() => setHighlightedPathId(null)}
                style={{
                  fontSize: 9, color: '#22D3EE', background: 'transparent',
                  border: 'none', cursor: 'pointer', padding: 0,
                }}
              >
                Clear highlight
              </button>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {EXAMPLE_WORKFLOWS.map((p) => {
              const isHL = p.id === highlightedPathId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleHighlightPath(p.id)}
                  title={isHL ? 'Click to clear highlight' : 'Click to highlight this path on canvas'}
                  style={{
                    padding: '6px 8px',
                    background: isHL ? '#062A33' : '#0A0E16',
                    borderRadius: 5,
                    border: `1px solid ${isHL ? '#22D3EE' : '#161D2B'}`,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2,
                  }}>
                    <span style={{ fontSize: 10 }}>
                      {p.isTerminalGood ? '✅' : '❌'}
                    </span>
                    <span style={{
                      fontSize: 10, color: isHL ? '#E2E8F0' : '#94A3B8',
                      fontWeight: 600, lineHeight: 1.3,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {p.name}
                    </span>
                  </div>
                  <div style={{ fontSize: 9, color: '#4B5563' }}>
                    {p.history.length} steps · shortest path
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        )}

        {/* Stats row */}
        {activeTab === 'sidebar' && (
        <div style={{
          padding: '8px 14px', borderBottom: '1px solid #1F2937',
          flexShrink: 0, display: 'flex', gap: 12,
        }}>
          {[
            { label: 'NODES', value: totalNodes },
            { label: 'EDGES', value: WF_EDGES.length },
            { label: 'VISITED', value: visitedCount },
            { label: 'STEPS', value: history.length },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>{s.value}</div>
              <div style={{ fontSize: 8, color: '#374151', fontWeight: 700, letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
        )}

        {/* Outcome path breakdown */}
        {/* <div style={{ padding: '10px 14px', borderBottom: '1px solid #1F2937', flexShrink: 0, maxHeight: 200, overflowY: 'auto' }}>
          <div style={{ fontSize: 9, color: '#4B5563', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6 }}>
            PATHS TO EACH OUTCOME
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {TERMINAL_PATH_COUNTS.map(t => {
              const isGood = t.kind === 'terminal_good';
              const maxCount = TERMINAL_PATH_COUNTS[0].count || 1;
              const barPct = Math.round((t.count / maxCount) * 100);
              return (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 9, flexShrink: 0 }}>{isGood ? '✅' : '❌'}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{
                        fontSize: 9, color: isGood ? '#86EFAC' : '#FCA5A5',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        maxWidth: 140,
                      }}>{t.label}</span>
                      <span style={{ fontSize: 9, color: '#6B7280', flexShrink: 0 }}>
                        {t.count.toLocaleString()}
                      </span>
                    </div>
                    <div style={{ height: 2, background: '#1F2937', borderRadius: 9999 }}>
                      <div style={{
                        height: '100%',
                        width: `${barPct}%`,
                        background: isGood ? '#16A34A' : '#DC2626',
                        borderRadius: 9999,
                      }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}

        {/* Saved paths (persisted in SQLite). Always rendered when search is open
            so users see a "no matches" state instead of the section disappearing. */}
        {activeTab === 'saved' && (
          <div style={{
            padding: '10px 14px', borderBottom: '1px solid #1F2937', flexShrink: 0,
            overflowY: 'auto',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 6,
            }}>
              <div style={{ fontSize: 9, color: '#4B5563', fontWeight: 700, letterSpacing: '0.08em' }}>
                {searchQuery
                  ? `SEARCH RESULTS (${filteredSavedPaths.length}/${savedPaths.length})`
                  : `SAVED PATHS (${savedPaths.length})`}
              </div>
              {highlightedPathId && (
                <button
                  onClick={() => setHighlightedPathId(null)}
                  style={{
                    fontSize: 9, color: '#22D3EE', background: 'transparent',
                    border: 'none', cursor: 'pointer', padding: 0,
                  }}
                >
                  Clear highlight
                </button>
              )}
            </div>
            {filteredSavedPaths.length === 0 ? (
              <div style={{ fontSize: 10, color: '#4B5563', fontStyle: 'italic', lineHeight: 1.6 }}>
                {searchQuery ? `No saved paths match "${searchQuery}".` : 'No saved paths yet.'}
              </div>
            ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {filteredSavedPaths.map((p) => {
                const isHL = p.id === highlightedPathId;
                return (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex', alignItems: 'stretch', gap: 4,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleHighlightPath(p.id)}
                      title={isHL ? 'Click to clear highlight' : 'Click to highlight this path on canvas'}
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        background: isHL ? '#062A33' : '#0A0E16',
                        borderRadius: 5,
                        border: `1px solid ${isHL ? '#22D3EE' : '#161D2B'}`,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2,
                      }}>
                        <span style={{ fontSize: 10 }}>
                          {p.isTerminalGood ? '✅' : '❌'}
                        </span>
                        <span style={{
                          fontSize: 10, color: isHL ? '#E2E8F0' : '#94A3B8',
                          fontWeight: 600, lineHeight: 1.3,
                        }}>
                          {p.name}
                        </span>
                      </div>
                      <div style={{ fontSize: 9, color: '#4B5563' }}>
                        {p.history.length} steps · {formatTimestamp(p.timestamp)}
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePath(p.id)}
                      title="Delete saved path"
                      style={{
                        padding: '0 8px',
                        background: '#0A0E16',
                        border: '1px solid #161D2B',
                        borderRadius: 5,
                        color: '#6B7280',
                        cursor: 'pointer',
                        fontSize: 12,
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#2A0E0E';
                        e.currentTarget.style.borderColor = '#7F1D1D';
                        e.currentTarget.style.color = '#F87171';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#0A0E16';
                        e.currentTarget.style.borderColor = '#161D2B';
                        e.currentTarget.style.color = '#6B7280';
                      }}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        )}

        {/* History log */}
        {activeTab === 'sidebar' && (
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px 14px 6px', flexShrink: 0, fontSize: 9, color: '#4B5563', fontWeight: 700, letterSpacing: '0.08em' }}>
            PATH HISTORY ({history.length})
          </div>
          <div style={{ padding: '0 14px 14px' }}>
            {history.length === 0 ? (
              <div style={{ fontSize: 11, color: '#1F2937', fontStyle: 'italic', lineHeight: 1.6 }}>
                No decisions yet. Select an action above to begin.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[...history].reverse().map((entry, i) => {
                  const isLastEntry = i === 0;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handlePeekNode(entry.toNodeId)}
                      title={`Jump view to: ${entry.fromNodeLabel} → ${entry.action}`}
                      style={{
                        padding: '6px 8px',
                        background: isLastEntry ? '#0D1520' : '#0A0E16',
                        borderRadius: 5,
                        border: `1px solid ${isLastEntry ? '#1E2D40' : '#161D2B'}`,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#161D2B';
                        e.currentTarget.style.borderColor = '#22D3EE55';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isLastEntry ? '#0D1520' : '#0A0E16';
                        e.currentTarget.style.borderColor = isLastEntry ? '#1E2D40' : '#161D2B';
                      }}
                    >
                      <div style={{ fontSize: 9, color: '#374151', marginBottom: 2 }}>
                        Step {history.length - i} — {entry.fromNodeLabel}
                      </div>
                      <div style={{ fontSize: 10, color: '#64748B', lineHeight: 1.45 }}>
                        → {entry.action}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function PlaygroundPage() {
  return (
    <AppShell>
      <ReactFlowProvider>
        <PlaygroundInner />
      </ReactFlowProvider>
    </AppShell>
  );
}