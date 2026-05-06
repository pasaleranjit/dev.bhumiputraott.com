'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ClipboardList,
  CornerUpLeft,
  DollarSign,
  FileText,
  Microscope,
  Milestone,
  Package,
  PackageCheck,
  PackageOpen,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  ShoppingCart,
  Sparkles,
  Trophy,
  Truck,
  Undo2,
  User,
  Warehouse,
  Wrench,
  Zap,
} from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { PROCESS_STEPS, type ProcessStep } from '@/lib/data';

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  PackageOpen,
  ClipboardList,
  PackageCheck,
  DollarSign,
  Microscope,
  Wrench,
  Sparkles,
  Package,
  Warehouse,
  ShoppingCart,
  Truck,
  Undo2,
  FileText,
  RefreshCw,
  User,
  CornerUpLeft,
  Zap,
};

const NODE_W = 210;
const NODE_H = 150;
const NODE_H_WITH_CHANNELS = 250; // taller for intake step that lists parallel channels
const COL_GAP = 90;
const ROW_BOB = 60; // vertical alternation to give the row a playful rhythm

function getNodeHeight(step: ProcessStep) {
  return step.channels && step.channels.length > 0 ? NODE_H_WITH_CHANNELS : NODE_H;
}

const PULSE_CSS = `
  @keyframes processNodePulse {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }
  @keyframes processShimmerBorder {
    0%   { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  @keyframes processBounceArrow {
    0%, 100% { transform: translateX(0); }
    50%      { transform: translateX(4px); }
  }
`;

const TOTAL_XP = PROCESS_STEPS.reduce((s, x) => s + x.xp, 0);

function stepPosition(index: number) {
  return {
    x: index * (NODE_W + COL_GAP),
    y: index % 2 === 0 ? 0 : ROW_BOB,
  };
}

// ─── Custom React Flow node ──────────────────────────────────────────────────

function StepNode({
  data,
}: {
  data: {
    step: ProcessStep;
    index: number;
    total: number;
    isActive: boolean;
    isReached: boolean;
  };
}) {
  const { step, index, total, isActive, isReached } = data;
  const Icon = ICONS[step.icon] ?? Milestone;

  const borderColor = isActive ? step.accent : isReached ? `${step.accent}aa` : '#1E1E2A';
  const boxShadow = isActive
    ? `0 0 0 2px ${step.accent}, 0 0 36px ${step.accent}66, 0 0 80px ${step.accent}22`
    : isReached
    ? `0 6px 22px ${step.accent}22`
    : '0 2px 10px rgba(0,0,0,0.3)';
  const bg = isActive ? '#14141C' : isReached ? '#111118' : '#0D0D13';
  const opacity = isReached || isActive ? 1 : 0.6;

  return (
    <div
      style={{
        width: NODE_W,
        height: getNodeHeight(step),
        background: bg,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 14,
        padding: '14px 14px 10px',
        boxShadow,
        opacity,
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.4s ease, opacity 0.3s ease',
        animation: isActive ? 'processNodePulse 2s ease-in-out infinite' : 'none',
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: step.accent, width: 8, height: 8, border: 'none' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: step.accent, width: 8, height: 8, border: 'none' }}
      />

      {/* Step number pill */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 10,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: step.accent,
          fontFamily: 'var(--font-mono)',
        }}
      >
        {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
      </div>

      {/* Check badge (reached) */}
      {isReached && (
        <div
          style={{
            position: 'absolute',
            top: 6,
            right: 8,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: step.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 10px ${step.accent}aa`,
          }}
        >
          <Check size={11} color="#0A0A0F" strokeWidth={4} />
        </div>
      )}

      {/* Emoji hero with icon accent */}
      <div
        style={{
          position: 'relative',
          width: 58,
          height: 58,
          borderRadius: 14,
          background: `radial-gradient(circle at 30% 30%, ${step.accent}33 0%, ${step.accent}0d 60%, transparent 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 6,
        }}
      >
        <span
          style={{
            fontSize: 38,
            lineHeight: 1,
            filter: isActive ? `drop-shadow(0 0 14px ${step.accent}cc)` : 'none',
            transition: 'filter 0.3s ease',
          }}
        >
          {step.emoji}
        </span>
        <div
          style={{
            position: 'absolute',
            bottom: -4,
            right: -4,
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: '#0A0A0F',
            border: `1.5px solid ${step.accent}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isActive ? `0 0 10px ${step.accent}aa` : 'none',
          }}
        >
          <Icon size={11} color={step.accent} strokeWidth={2.5} />
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: '#F0F0F5',
          textAlign: 'center',
          lineHeight: 1.25,
          letterSpacing: '-0.005em',
          padding: '0 4px',
        }}
      >
        {step.title}
      </div>

      {/* Parallel channels (intake sources, etc.) — shown as a 2-column pill grid */}
      {step.channels && step.channels.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 4,
            width: '100%',
            padding: '0 2px',
            marginTop: 2,
          }}
        >
          {step.channels.map((ch) => (
            <div
              key={ch.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '3px 6px',
                borderRadius: 6,
                background: `${ch.accent}14`,
                border: `1px solid ${ch.accent}55`,
                fontSize: 8.5,
                fontWeight: 600,
                color: '#E5E7EB',
                letterSpacing: '-0.005em',
                lineHeight: 1.2,
                overflow: 'hidden',
              }}
            >
              <span style={{ fontSize: 11, flexShrink: 0 }}>{ch.emoji}</span>
              <span
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {ch.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* XP badge */}
      {/* <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: '#FBBF24',
          padding: '1px 7px',
          borderRadius: 9999,
          background: 'rgba(251,191,36,0.1)',
          border: '1px solid rgba(251,191,36,0.3)',
          letterSpacing: '0.04em',
        }}
      >
        +{step.xp} XP
      </div> */}
    </div>
  );
}

const NODE_TYPES = {
  stepNode: StepNode as React.ComponentType<any>,
};

// ─── Inner component ─────────────────────────────────────────────────────────

function ProcessInner() {
  const total = PROCESS_STEPS.length;
  const [reached, setReached] = useState<Set<string>>(() => new Set([PROCESS_STEPS[0].id]));
  const [activeId, setActiveId] = useState<string>(PROCESS_STEPS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);

  const { setCenter } = useReactFlow();

  const markReached = useCallback((id: string) => {
    setReached((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      markReached(id);
      setActiveId(id);
    },
    [markReached]
  );

  const handleReset = useCallback(() => {
    const firstId = PROCESS_STEPS[0].id;
    setReached(new Set([firstId]));
    setActiveId(firstId);
    setIsPlaying(false);
  }, []);

  const handleTogglePlay = useCallback(() => {
    const currentIndex = PROCESS_STEPS.findIndex((s) => s.id === activeId);
    if (currentIndex >= total - 1) {
      // At the end — restart the tour from the top
      handleReset();
      setIsPlaying(true);
      return;
    }
    setIsPlaying((p) => !p);
  }, [activeId, total, handleReset]);

  // Auto-advance during play tour
  useEffect(() => {
    if (!isPlaying) return;
    const currentIndex = PROCESS_STEPS.findIndex((s) => s.id === activeId);
    if (currentIndex >= total - 1) {
      setIsPlaying(false);
      return;
    }
    const t = setTimeout(() => {
      handleSelect(PROCESS_STEPS[currentIndex + 1].id);
    }, 1500);
    return () => clearTimeout(t);
  }, [isPlaying, activeId, total, handleSelect]);

  // Build nodes
  const rfNodes = useMemo<Node[]>(
    () =>
      PROCESS_STEPS.map((step, i) => ({
        id: step.id,
        type: 'stepNode',
        position: stepPosition(i),
        data: {
          step,
          index: i,
          total,
          isActive: step.id === activeId,
          isReached: reached.has(step.id),
        },
      })),
    [activeId, reached, total]
  );

  // Build edges
  const rfEdges = useMemo<Edge[]>(
    () =>
      PROCESS_STEPS.slice(0, -1).map((step, i) => {
        const next = PROCESS_STEPS[i + 1];
        const bothReached = reached.has(step.id) && reached.has(next.id);
        const leadsFromActive = step.id === activeId;
        const active = bothReached || leadsFromActive;
        return {
          id: `${step.id}->${next.id}`,
          source: step.id,
          target: next.id,
          type: 'smoothstep',
          animated: active,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: bothReached ? '#22C55E' : leadsFromActive ? '#F59E0B' : '#374151',
          },
          style: {
            stroke: bothReached ? '#22C55E' : leadsFromActive ? '#F59E0B' : '#2A2A35',
            strokeWidth: active ? 2.5 : 1.5,
            opacity: active ? 1 : 0.4,
          },
        };
      }),
    [reached, activeId]
  );

  // Lock body scroll while this page is mounted (canvas owns the viewport)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Zoom to first node once ReactFlow is initialized
  const handleInit = useCallback(() => {
    const step = PROCESS_STEPS[0];
    const p = stepPosition(0);
    const h = getNodeHeight(step);
    setCenter(p.x + NODE_W / 2, p.y + h / 2, { zoom: 1.3, duration: 700 });
  }, [setCenter]);

  // Auto-pan to active node on selection changes (skip on initial mount)
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    const idx = PROCESS_STEPS.findIndex((s) => s.id === activeId);
    if (idx < 0) return;
    const p = stepPosition(idx);
    const h = getNodeHeight(PROCESS_STEPS[idx]);
    setCenter(p.x + NODE_W / 2, p.y + h / 2, { zoom: 1.1, duration: 700 });
  }, [activeId, setCenter]);

  const reachedCount = reached.size;
  const percent = Math.round((reachedCount / total) * 100);
  const earnedXp = useMemo(
    () => PROCESS_STEPS.reduce((sum, s) => (reached.has(s.id) ? sum + s.xp : sum), 0),
    [reached]
  );
  const activeStep = PROCESS_STEPS.find((s) => s.id === activeId)!;
  const activeIndex = PROCESS_STEPS.findIndex((s) => s.id === activeId);
  const isComplete = reachedCount === total;
  const isLastActive = activeIndex === total - 1;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: '#020617',
        overflow: 'hidden',
      }}
    >
      <style>{PULSE_CSS}</style>

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '12px 20px',
          background: 'rgba(10,10,15,0.85)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #1E1E2A',
          flexShrink: 0,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Milestone size={16} color="#22C55E" strokeWidth={2.5} />
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#4B5563',
                letterSpacing: '0.1em',
                lineHeight: 1,
                marginBottom: 3,
              }}
            >
              GPU LIFECYCLE
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: '#F0F0F5',
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}
            >
              Business Process
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            flex: 1,
            minWidth: 180,
            height: 8,
            background: '#17171E',
            border: '1px solid #1E1E2A',
            borderRadius: 9999,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${percent}%`,
              background: 'linear-gradient(90deg, #22C55E 0%, #06B6D4 50%, #8B5CF6 100%)',
              borderRadius: 9999,
              transition: 'width 0.5s ease',
              boxShadow: percent > 0 ? '0 0 10px rgba(34,197,94,0.55)' : 'none',
            }}
          />
        </div>

        {/* Counts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#F0F0F5',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {reachedCount}
            <span style={{ color: '#5A5A70' }}>/{total}</span>
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: percent === 100 ? '#4ADE80' : '#9090A8',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {percent}%
          </span>
          {/* <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#FBBF24',
              letterSpacing: '0.04em',
              fontVariantNumeric: 'tabular-nums',
              padding: '3px 8px',
              background: 'rgba(251,191,36,0.1)',
              border: '1px solid rgba(251,191,36,0.25)',
              borderRadius: 9999,
            }}
          >
            {earnedXp}/{TOTAL_XP} XP
          </span> */}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={handleTogglePlay}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              background: isPlaying ? 'rgba(34,197,94,0.15)' : '#111827',
              border: `1px solid ${isPlaying ? '#22C55E' : '#374151'}`,
              borderRadius: 8,
              color: isPlaying ? '#4ADE80' : '#D1D5DB',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {isPlaying ? <Pause size={12} strokeWidth={2.5} /> : <Play size={12} strokeWidth={2.5} />}
            {isPlaying ? 'Pause' : isLastActive && !isComplete ? 'Replay Tour' : 'Play Tour'}
          </button>
          <button
            onClick={handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              background: '#111827',
              border: '1px solid #374151',
              borderRadius: 8,
              color: '#D1D5DB',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={12} strokeWidth={2.5} />
            Reset
          </button>
        </div>
      </div>

      {/* ── Canvas ─────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          nodeTypes={NODE_TYPES}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          onNodeClick={(_, node) => handleSelect(node.id)}
          onInit={handleInit}
          minZoom={0.3}
          maxZoom={1.5}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#1F2937" />
        </ReactFlow>

        {/* Active step info card (bottom-center overlay) */}
        <AnimatePresence mode="wait">
          {!isComplete && (
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 20, x: '-50%' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 20,
                left: '50%',
                width: 'min(720px, calc(100% - 40px))',
                padding: '16px 20px',
                borderRadius: 14,
                background: 'rgba(13,13,19,0.92)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${activeStep.accent}66`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.5), 0 0 30px ${activeStep.accent}22`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: activeStep.accent,
                    padding: '2px 8px',
                    borderRadius: 9999,
                    background: `${activeStep.accent}14`,
                    border: `1px solid ${activeStep.accent}44`,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  STEP {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 17,
                    fontWeight: 700,
                    color: '#F0F0F5',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                    flex: 1,
                    minWidth: 180,
                  }}
                >
                  <span style={{ marginRight: 8, fontSize: 20 }}>{activeStep.emoji}</span>
                  {activeStep.title}
                </h3>
                {/* <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#FBBF24',
                    padding: '2px 8px',
                    borderRadius: 9999,
                    background: 'rgba(251,191,36,0.1)',
                    border: '1px solid rgba(251,191,36,0.3)',
                    letterSpacing: '0.04em',
                  }}
                >
                  +{activeStep.xp} XP
                </span> */}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: '#9090A8', lineHeight: 1.6 }}>
                {activeStep.description}
              </p>
              {activeStep.channels && activeStep.channels.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: '#5A5A70',
                      marginBottom: 6,
                    }}
                  >
                    PARALLEL CHANNELS
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {activeStep.channels.map((ch) => (
                      <span
                        key={ch.label}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '4px 9px',
                          borderRadius: 9999,
                          background: `${ch.accent}1a`,
                          border: `1px solid ${ch.accent}55`,
                          color: '#E5E7EB',
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        <span style={{ fontSize: 13 }}>{ch.emoji}</span>
                        {ch.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {(activeIndex > 0 || !isLastActive) && (
                <div
                  style={{
                    marginTop: 10,
                    paddingTop: 10,
                    borderTop: '1px solid #1E1E2A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ fontSize: 11, color: '#5A5A70' }}>
                    Click any node on the canvas, or use the buttons to navigate
                  </span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {activeIndex > 0 && (
                      <button
                        onClick={() => handleSelect(PROCESS_STEPS[activeIndex - 1].id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '5px 12px',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid #2A2A35',
                          borderRadius: 8,
                          color: '#9090A8',
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                          letterSpacing: '0.02em',
                        }}
                      >
                        ← Prev
                      </button>
                    )}
                    {!isLastActive && (
                      <button
                        onClick={() => handleSelect(PROCESS_STEPS[activeIndex + 1].id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '5px 12px',
                          background: `${activeStep.accent}1f`,
                          border: `1px solid ${activeStep.accent}`,
                          borderRadius: 8,
                          color: activeStep.accent,
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                          letterSpacing: '0.02em',
                        }}
                      >
                        Next step
                        <span style={{ display: 'inline-flex', animation: 'processBounceArrow 1.2s ease-in-out infinite' }}>
                          →
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion overlay */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
              animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
              exit={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 20,
                left: '50%',
                width: 'min(560px, calc(100% - 40px))',
                padding: '26px 24px',
                borderRadius: 16,
                background: '#0D0D13',
                border: '1px solid transparent',
                backgroundImage:
                  'linear-gradient(#0D0D13, #0D0D13), linear-gradient(90deg, #22C55E, #06B6D4, #8B5CF6, #F59E0B, #22C55E)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                backgroundSize: '200% 100%',
                animation: 'processShimmerBorder 4s linear infinite',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  margin: '0 auto 10px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Trophy size={30} color="#FBBF24" strokeWidth={2} />
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#4ADE80',
                  letterSpacing: '0.14em',
                  marginBottom: 6,
                }}
              >
                JOURNEY COMPLETE
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#F0F0F5',
                  letterSpacing: '-0.02em',
                  marginBottom: 8,
                }}
              >
                You&apos;ve seen the whole business
              </h3>
              <button
                onClick={handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '9px 16px',
                  background: '#111827',
                  border: '1px solid #374151',
                  borderRadius: 8,
                  color: '#D1D5DB',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={13} strokeWidth={2.5} />
                Run it again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Page export ─────────────────────────────────────────────────────────────

export default function ProcessPage() {
  return (
    <AppShell>
      <ReactFlowProvider>
        <ProcessInner />
      </ReactFlowProvider>
    </AppShell>
  );
}
