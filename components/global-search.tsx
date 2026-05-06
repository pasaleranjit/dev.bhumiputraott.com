'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Hash, FileText, Package, BookOpen,
  GitCompare, Map, LayoutDashboard, CornerDownLeft, Layers,
  Cpu, Milestone,
} from 'lucide-react';
import {
  MODULES_DATA, FEATURES_DATA, BUSINESS_GLOSSARY, INTEGRATIONS_DATA,
  INTAKE_TYPES, REPAIR_TIERS, RETURN_CLASSIFICATIONS, CARRIER_SCHEDULE,
  ACCOUNTING_FLOWS, ROLES_DATA,
  SPRINTS_HYBRID, MILESTONES_HYBRID,
  SPRINTS, MILESTONES,
  SPRINTS_PP, MILESTONES_PP,
  TECH_COMPARISON,
  RECOMMENDED_TOOL_ROWS, PP_ARCHITECTURE_LAYERS,
  CC_STRENGTHS, CC_TRADEOFFS,
  HYBRID_LAYERS, DECISION_SUMMARY_ROWS, HYBRID_DIFF_ROWS, HYBRID_SAME_ROWS,
  IMPL_PLAN_ROWS,
  KEY_DEVELOPMENT_POINTS, STATS, BUILD_PHASES,
  CURRENT_SYSTEMS_REPLACED, SYSTEMS_KEPT, CREDENTIALS_DATA,
  POWER_PLATFORM_WINS, POWER_PLATFORM_LIMITATIONS, ARCHITECTURE_LAYERS,
  PP_COST_ROWS, CC_COST_ROWS, INVENTORY_STATES,
  GROUPS, PROCESS_STEPS,
} from '@/lib/data';

// ─── Result types ─────────────────────────────────────────────────────────────

interface SearchResult {
  id: string;
  group: 'Pages' | 'Modules' | 'Features' | 'SOPs' | 'Glossary' | 'Integrations' | 'Knowledge Base' | 'Roadmap' | 'Tech Comparison' | 'Dashboard' | 'Process' | 'Playground';
  label: string;
  sublabel?: string;
  href: string;
  hash?: string;
  icon: React.ElementType;
}

const PAGES: SearchResult[] = [
  { id: 'p-dashboard', group: 'Pages', label: 'Dashboard', sublabel: 'Project overview, stats, modules, features, integrations', href: '/', icon: LayoutDashboard },
  { id: 'p-kb', group: 'Pages', label: 'Knowledge Base', sublabel: 'Business operations, SOPs, workflows, glossary', href: '/knowledge-base', icon: BookOpen },
  { id: 'p-tech', group: 'Pages', label: 'Tech Comparison', sublabel: 'Power Platform vs custom code analysis', href: '/tech-comparison', icon: GitCompare },
  { id: 'p-roadmap', group: 'Pages', label: 'Roadmap', sublabel: 'Milestones and sprint-by-sprint delivery plan', href: '/roadmap', icon: Map },
  { id: 'p-playground', group: 'Pages', label: 'GPU Lifecycle Simulator', sublabel: 'Playground · Interactive workflow — walk through every node and decision in the GPU state machine', href: '/playground', icon: Cpu },
  { id: 'p-process', group: 'Pages', label: 'Business Process', sublabel: 'Step-by-step GPU lifecycle tour — Intake → Receiving → Testing → Cleaning → Packaging → Warehousing → Sales', href: '/process', icon: Milestone },
];

const PAGE_TABS: SearchResult[] = [
  // Dashboard tabs
  { id: 'tab-overview',     group: 'Pages', label: 'Dashboard → Overview',     sublabel: 'Project stats, key development points, systems replaced, build phases', href: '/?tab=overview',     icon: LayoutDashboard },
  { id: 'tab-modules',      group: 'Pages', label: 'Dashboard → Modules',      sublabel: 'All 30 modules across Phase 1 and Phase 2 — status, priority, progress', href: '/?tab=modules',      icon: LayoutDashboard },
  { id: 'tab-features',     group: 'Pages', label: 'Dashboard → Features',     sublabel: 'Feature list with priority, status, and module assignment', href: '/?tab=features',     icon: LayoutDashboard },
  { id: 'tab-integrations', group: 'Pages', label: 'Dashboard → Integrations', sublabel: 'API integrations — QBO, Amazon SP-API, eBay, EasyPost, Microsoft 365, Stripe, Pusher', href: '/?tab=integrations', icon: LayoutDashboard },
  { id: 'tab-credentials',  group: 'Pages', label: 'Dashboard → Credentials', sublabel: 'Environment variables and API credentials for all integrations', href: '/?tab=credentials',  icon: LayoutDashboard },
  // Roadmap tabs
  { id: 'tab-roadmap-hybrid',  group: 'Pages', label: 'Roadmap → Hybrid (Recommended)', sublabel: 'Custom ERP core + M365 native — recommended architecture roadmap · sprints milestones', href: '/roadmap?tab=hybrid',          icon: Map },
  { id: 'tab-roadmap-custom',  group: 'Pages', label: 'Roadmap → Custom Code',          sublabel: 'Fully custom stack — Next.js Node.js PostgreSQL — sprint plan and milestones', href: '/roadmap?tab=custom',          icon: Map },
  { id: 'tab-roadmap-pp',      group: 'Pages', label: 'Roadmap → Power Platform',       sublabel: 'Low-code Dataverse Power Apps Power Automate — 8-sprint Phase 1 plan', href: '/roadmap?tab=power-platform', icon: Map },
  // Tech Comparison tabs
  { id: 'tab-tc-comparison', group: 'Pages', label: 'Tech Comparison → Side-by-Side',       sublabel: 'Requirements matrix · cost comparison · recommended tool by component', href: '/tech-comparison?tab=comparison',     icon: GitCompare },
  { id: 'tab-tc-pp',         group: 'Pages', label: 'Tech Comparison → Power Platform',     sublabel: 'PP wins · limitations · Power Apps Power Automate Dataverse architecture layers', href: '/tech-comparison?tab=power-platform', icon: GitCompare },
  { id: 'tab-tc-cc',         group: 'Pages', label: 'Tech Comparison → Custom Code',        sublabel: 'Strengths · trade-offs · system architecture — Next.js Node.js PostgreSQL Redis', href: '/tech-comparison?tab=custom-code',     icon: GitCompare },
  { id: 'tab-tc-hybrid',     group: 'Pages', label: 'Tech Comparison → Hybrid Architecture',sublabel: 'Four-layer hybrid design · decision summary · what changes vs stays identical', href: '/tech-comparison?tab=hybrid',          icon: GitCompare },
  { id: 'tab-tc-impl',       group: 'Pages', label: 'Tech Comparison → Implementation Plan',sublabel: 'Phase-by-phase comparison of Power Platform vs Custom Code vs Hybrid', href: '/tech-comparison?tab=impl-plan',       icon: GitCompare },
];

const KB_SECTIONS: SearchResult[] = [
  { id: 'kb-overview', group: 'Knowledge Base', label: 'Business Overview', sublabel: 'Buy refurbish repair resell GPUs · AmazinXpress · GPU Exchange · serial number tracking · best GPU reseller', href: '/knowledge-base', hash: '#kb-overview', icon: BookOpen },
  { id: 'kb-lifecycle', group: 'Knowledge Base', label: 'GPU Production Lifecycle', sublabel: 'Intake → Receiving S1 → Receiving S2 → Testing → Cleaning → Packaging → Warehousing → Sales · production flow', href: '/knowledge-base', hash: '#kb-lifecycle', icon: BookOpen },
  { id: 'kb-intake', group: 'Knowledge Base', label: 'Intake Types', sublabel: 'eBay B2B walk-in customer sell trade-in repair FBA return FBM return · intake classification codes', href: '/knowledge-base', hash: '#kb-intake', icon: BookOpen },
  { id: 'kb-repairs', group: 'Knowledge Base', label: 'Repair Tiers', sublabel: 'Tier 1 basic repair Tier 2 deep diagnostics · triggers actions outcomes · escalation write-off', href: '/knowledge-base', hash: '#kb-repairs', icon: BookOpen },
  { id: 'kb-returns', group: 'Knowledge Base', label: 'Returns Classification', sublabel: 'Ours defective functioning · Not Ours same different SKU · fraud risk routing urgency · Amazon case reimbursement', href: '/knowledge-base', hash: '#kb-returns', icon: BookOpen },
  { id: 'kb-fba-returns', group: 'Knowledge Base', label: 'FBA Returns — Auto-Ingestion & LPN Tracking', sublabel: 'SP-API auto-pull · LPN license plate number · ASIN FNSKU · return reason action state tags · auto-match manual review', href: '/knowledge-base', hash: '#kb-fba-returns', icon: BookOpen },
  { id: 'kb-carriers', group: 'Knowledge Base', label: 'Carrier Schedule', sublabel: 'UPS morning drop-off only 9:45 AM · UPS afternoon pickup 3:30 PM · USPS always give · FedEx not daily drive drop-off', href: '/knowledge-base', hash: '#kb-carriers', icon: BookOpen },
  { id: 'kb-packages', group: 'Knowledge Base', label: 'Incoming Package Sorting', sublabel: 'Inventory POs receiving shelves · FBM returns 2 business days time-sensitive · FBA removal orders · supplies parts sorting', href: '/knowledge-base', hash: '#kb-packages', icon: BookOpen },
  { id: 'kb-accounting', group: 'Knowledge Base', label: 'Accounting Workflow', sublabel: 'QBO sync · ASIN FNSKU LPN in accounting · prepaid inventory COGS write-downs FBA FIFO reconciliation IMS QuickBooks', href: '/knowledge-base', hash: '#kb-accounting', icon: BookOpen },
  { id: 'kb-warehouse', group: 'Knowledge Base', label: 'Warehouse Structure', sublabel: 'Placentia Interim FBA Interim Return Production Area · bin shelf region area · 5 warehouse inventory flow · digital virtual physical', href: '/knowledge-base', hash: '#kb-warehouse', icon: BookOpen },
  { id: 'kb-skustack', group: 'Knowledge Base', label: 'SkuStack Replacement — Android Scanning App', sublabel: 'React Native APK · camera barcode QR · bin-to-bin SKU transfer · Zebra printer ZPL · offline sync · session ID · SkuStack', href: '/knowledge-base', hash: '#kb-skustack', icon: BookOpen },
  { id: 'kb-roles', group: 'Knowledge Base', label: 'Roles & Permissions', sublabel: '10 roles: technician repair_tech returns_specialist warehouse floor_manager purchasing finance admin customer b2b_seller', href: '/knowledge-base', hash: '#kb-roles', icon: BookOpen },
  { id: 'kb-glossary', group: 'Knowledge Base', label: 'Business Glossary', sublabel: 'All acronyms and definitions: GPU SN PO FBA FBM LPN ASIN FNSKU MSKU RTG LPOS QBO SKU IMS and more', href: '/knowledge-base', hash: '#kb-glossary', icon: BookOpen },
];

const GROUP_COLORS: Record<string, { color: string; bg: string; border: string; dim: string }> = {
  'Pages':           { color: '#60A5FA', bg: 'rgba(96,165,250,0.15)',   border: 'rgba(96,165,250,0.3)',   dim: 'rgba(96,165,250,0.45)' },
  'Modules':         { color: '#F97316', bg: 'rgba(249,115,22,0.15)',   border: 'rgba(249,115,22,0.3)',   dim: 'rgba(249,115,22,0.45)' },
  'Features':        { color: '#A78BFA', bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.3)',  dim: 'rgba(167,139,250,0.45)' },
  'SOPs':            { color: '#22D3EE', bg: 'rgba(34,211,238,0.15)',   border: 'rgba(34,211,238,0.3)',   dim: 'rgba(34,211,238,0.45)' },
  'Glossary':        { color: '#FBBF24', bg: 'rgba(251,191,36,0.15)',   border: 'rgba(251,191,36,0.3)',   dim: 'rgba(251,191,36,0.45)' },
  'Integrations':    { color: '#F472B6', bg: 'rgba(244,114,182,0.15)', border: 'rgba(244,114,182,0.3)',  dim: 'rgba(244,114,182,0.45)' },
  'Knowledge Base':  { color: '#34D399', bg: 'rgba(52,211,153,0.15)',   border: 'rgba(52,211,153,0.3)',   dim: 'rgba(52,211,153,0.45)' },
  'Roadmap':         { color: '#4ADE80', bg: 'rgba(74,222,128,0.15)',   border: 'rgba(74,222,128,0.3)',   dim: 'rgba(74,222,128,0.45)' },
  'Tech Comparison': { color: '#818CF8', bg: 'rgba(129,140,248,0.15)', border: 'rgba(129,140,248,0.3)',  dim: 'rgba(129,140,248,0.45)' },
  'Dashboard':       { color: '#94A3B8', bg: 'rgba(148,163,184,0.15)', border: 'rgba(148,163,184,0.3)',  dim: 'rgba(148,163,184,0.45)' },
  'Process':         { color: '#FB923C', bg: 'rgba(251,146,60,0.15)',   border: 'rgba(251,146,60,0.3)',   dim: 'rgba(251,146,60,0.45)' },
  'Playground':      { color: '#67E8F9', bg: 'rgba(103,232,249,0.15)', border: 'rgba(103,232,249,0.3)',  dim: 'rgba(103,232,249,0.45)' },
};
const DEFAULT_GC = { color: '#4ADE80', bg: 'rgba(74,222,128,0.15)', border: 'rgba(74,222,128,0.3)', dim: 'rgba(74,222,128,0.45)' };

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

export function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allResults: SearchResult[] = useMemo(() => {
    return [
      ...PAGES,
      ...PAGE_TABS,
      ...KB_SECTIONS,
      ...MODULES_DATA.map<SearchResult>(m => ({
        id: `m-${m.id}`, group: 'Modules', label: `${m.id}. ${m.name}`,
        sublabel: `${m.description} · ${m.subItems.join(' · ')}`,
        href: '/?tab=modules', hash: `#module-${m.id}`, icon: Layers,
      })),
      ...FEATURES_DATA.map<SearchResult>(f => ({
        id: `f-${f.id}`, group: 'Features', label: f.name,
        sublabel: `${f.moduleName} · ${f.description}`,
        href: '/?tab=features', hash: `#feature-${f.id}`, icon: Package,
      })),
      ...INTEGRATIONS_DATA.map<SearchResult>(i => ({
        id: `i-${i.id}`, group: 'Integrations', label: i.name,
        sublabel: `${i.category} · ${i.description} · ${i.usedFor}`,
        href: '/?tab=integrations', hash: `#integration-${i.id}`, icon: Hash,
      })),
      ...INTAKE_TYPES.map<SearchResult>(t => ({
        id: `intake-${t.code}`, group: 'SOPs', label: `Intake: ${t.label}`,
        sublabel: `${t.source} · ${t.specialRules} · ${t.downstreamWorkflow}`,
        href: '/knowledge-base', hash: '#kb-intake', icon: FileText,
      })),
      ...REPAIR_TIERS.map<SearchResult>(t => ({
        id: `repair-tier-${t.tier}`, group: 'SOPs', label: `Tier ${t.tier} Repair: ${t.label}`,
        sublabel: `${t.performedBy} · ${t.triggers.join(' · ')} · ${t.actions.join(' · ')}`,
        href: '/knowledge-base', hash: '#kb-repairs', icon: FileText,
      })),
      ...RETURN_CLASSIFICATIONS.map<SearchResult>((r, i) => ({
        id: `return-${i}`, group: 'SOPs', label: `Return: ${r.label}`,
        sublabel: `${r.description} · Fraud: ${r.fraudRisk} · ${r.routingAction} · ${r.urgency}`,
        href: '/knowledge-base', hash: '#kb-returns', icon: FileText,
      })),
      ...CARRIER_SCHEDULE.map<SearchResult>((c, i) => ({
        id: `carrier-${i}`, group: 'SOPs', label: `Carrier: ${c.carrier} — ${c.type}`,
        sublabel: `${c.time} · ${c.frequency} · ${c.rules.join(' · ')}`,
        href: '/knowledge-base', hash: '#kb-carriers', icon: FileText,
      })),
      ...ACCOUNTING_FLOWS.map<SearchResult>(f => ({
        id: `accounting-${f.id}`, group: 'SOPs', label: `Accounting: ${f.name}`,
        sublabel: `${f.description} · ${f.steps.map(s => s.action).join(' · ')}`,
        href: '/knowledge-base', hash: '#kb-accounting', icon: FileText,
      })),
      ...ROLES_DATA.map<SearchResult>(r => ({
        id: `role-${r.role}`, group: 'SOPs', label: `Role: ${r.label}`,
        sublabel: `${r.description} · ${r.moduleAccess.join(', ')}`,
        href: '/knowledge-base', hash: '#kb-roles', icon: FileText,
      })),
      ...SPRINTS_HYBRID.map<SearchResult>(s => ({
        id: `sprint-hybrid-${s.number}`, group: 'Roadmap', label: `Sprint ${s.number}: ${s.title}`,
        sublabel: `Hybrid · ${s.dateRange} · ${s.tasks.map(t => t.name).join(' · ')}`,
        href: '/roadmap?tab=hybrid', hash: `#sprint-${s.number}`, icon: Map,
      })),
      ...MILESTONES_HYBRID.map<SearchResult>((m, i) => ({
        id: `milestone-hybrid-${i}`, group: 'Roadmap', label: m.label,
        sublabel: `Hybrid · ${m.date} · ${m.description}`,
        href: '/roadmap?tab=hybrid', icon: Map,
      })),
      ...SPRINTS.map<SearchResult>(s => ({
        id: `sprint-custom-${s.number}`, group: 'Roadmap', label: `Sprint ${s.number}: ${s.title}`,
        sublabel: `Custom Code · ${s.dateRange} · ${s.tasks.map(t => t.name).join(' · ')}`,
        href: '/roadmap?tab=custom', hash: `#sprint-${s.number}`, icon: Map,
      })),
      ...MILESTONES.map<SearchResult>((m, i) => ({
        id: `milestone-custom-${i}`, group: 'Roadmap', label: m.label,
        sublabel: `Custom Code · ${m.date} · ${m.description}`,
        href: '/roadmap?tab=custom', icon: Map,
      })),
      ...SPRINTS_PP.map<SearchResult>(s => ({
        id: `sprint-pp-${s.number}`, group: 'Roadmap', label: `Sprint ${s.number}: ${s.title}`,
        sublabel: `Power Platform · ${s.dateRange} · ${s.tasks.map(t => t.name).join(' · ')}`,
        href: '/roadmap?tab=power-platform', hash: `#sprint-${s.number}`, icon: Map,
      })),
      ...MILESTONES_PP.map<SearchResult>((m, i) => ({
        id: `milestone-pp-${i}`, group: 'Roadmap', label: m.label,
        sublabel: `Power Platform · ${m.date} · ${m.description}`,
        href: '/roadmap?tab=power-platform', icon: Map,
      })),
      ...TECH_COMPARISON.map<SearchResult>((t, i) => ({
        id: `tech-${i}`, group: 'Tech Comparison', label: t.requirement,
        sublabel: `Power Platform: ${t.powerPlatform.notes.slice(0, 100)} · Custom Code: ${t.customCode.notes.slice(0, 100)}`,
        href: '/tech-comparison?tab=comparison', icon: GitCompare,
      })),
      ...RECOMMENDED_TOOL_ROWS.map<SearchResult>((r, i) => ({
        id: `tc-tool-${i}`, group: 'Tech Comparison', label: `Recommended: ${r.component}`,
        sublabel: `${r.tool} · ${r.reason}`,
        href: '/tech-comparison?tab=comparison', icon: GitCompare,
      })),
      ...PP_ARCHITECTURE_LAYERS.map<SearchResult>(l => ({
        id: `tc-pp-${l.letter}`, group: 'Tech Comparison', label: `Power Platform: ${l.title}`,
        sublabel: `${l.subtitle} · ${l.items.join(' · ')}`,
        href: '/tech-comparison?tab=power-platform', icon: GitCompare,
      })),
      ...CC_STRENGTHS.map<SearchResult>((s, i) => ({
        id: `tc-cc-strength-${i}`, group: 'Tech Comparison', label: `Custom Code Strength: ${s.title}`,
        sublabel: s.desc,
        href: '/tech-comparison?tab=custom-code', icon: GitCompare,
      })),
      ...CC_TRADEOFFS.map<SearchResult>((t, i) => ({
        id: `tc-cc-tradeoff-${i}`, group: 'Tech Comparison', label: `Custom Code Trade-off: ${t.title}`,
        sublabel: t.detail,
        href: '/tech-comparison?tab=custom-code', icon: GitCompare,
      })),
      ...HYBRID_LAYERS.map<SearchResult>(l => ({
        id: `tc-hybrid-layer-${l.letter}`, group: 'Tech Comparison', label: `Hybrid Layer ${l.letter}: ${l.title}`,
        sublabel: `${l.subtitle} · ${l.items.join(' · ')} · ${l.rationale}`,
        href: '/tech-comparison?tab=hybrid', icon: GitCompare,
      })),
      ...DECISION_SUMMARY_ROWS.map<SearchResult>((r, i) => ({
        id: `tc-decision-${i}`, group: 'Tech Comparison', label: `Decision: ${r.concern}`,
        sublabel: `${r.decision} · ${r.why}`,
        href: '/tech-comparison?tab=hybrid', icon: GitCompare,
      })),
      ...HYBRID_DIFF_ROWS.map<SearchResult>((r, i) => ({
        id: `tc-hybrid-diff-${i}`, group: 'Tech Comparison', label: `Hybrid vs Custom: ${r.aspect}`,
        sublabel: `Custom: ${r.customCode.slice(0, 80)} · Hybrid: ${r.hybrid.slice(0, 80)}`,
        href: '/tech-comparison?tab=hybrid', icon: GitCompare,
      })),
      ...HYBRID_SAME_ROWS.map<SearchResult>((r, i) => ({
        id: `tc-hybrid-same-${i}`, group: 'Tech Comparison', label: `Both use same: ${r.area}`,
        sublabel: r.both,
        href: '/tech-comparison?tab=hybrid', icon: GitCompare,
      })),
      ...IMPL_PLAN_ROWS.map<SearchResult>((r, i) => ({
        id: `tc-impl-${i}`, group: 'Tech Comparison', label: `Implementation: ${r.phase}`,
        sublabel: `PP: ${r.pp.slice(0, 80)} · CC: ${r.cc.slice(0, 80)}`,
        href: '/tech-comparison?tab=impl-plan', icon: GitCompare,
      })),
      ...BUSINESS_GLOSSARY.map<SearchResult>(t => ({
        id: `g-${t.term}`, group: 'Glossary', label: `${t.term} — ${t.fullForm}`,
        sublabel: `${t.meaning} · ${t.category} · ${t.source}`,
        href: '/knowledge-base', hash: '#kb-glossary', icon: Hash,
      })),
      // ── Dashboard – Overview tab ──────────────────────────────────────────
      ...KEY_DEVELOPMENT_POINTS.map<SearchResult>(kd => ({
        id: `kd-${kd.id}`, group: 'Dashboard', label: kd.title,
        sublabel: `${kd.description} · ${kd.tag}`,
        href: '/?tab=overview', icon: LayoutDashboard,
      })),
      ...STATS.map<SearchResult>((stat, i) => ({
        id: `stat-${i}`, group: 'Dashboard', label: `Stat: ${stat.label}`,
        sublabel: `${stat.value}${stat.sub ? ' · ' + stat.sub : ''}`,
        href: '/?tab=overview', icon: LayoutDashboard,
      })),
      ...BUILD_PHASES.map<SearchResult>(bp => ({
        id: `build-phase-${bp.phase}`, group: 'Dashboard', label: bp.label,
        sublabel: `${bp.start} → ${bp.end} · ${bp.highlights.join(' · ')}`,
        href: '/?tab=overview', icon: LayoutDashboard,
      })),
      ...CURRENT_SYSTEMS_REPLACED.map<SearchResult>((sys, i) => ({
        id: `sys-replaced-${i}`, group: 'Dashboard', label: `Replacing: ${sys.oldSystem}`,
        sublabel: `${sys.oldDescription} → ${sys.replacement} · ${sys.category}`,
        href: '/?tab=overview', icon: LayoutDashboard,
      })),
      ...SYSTEMS_KEPT.map<SearchResult>((sys, i) => ({
        id: `sys-kept-${i}`, group: 'Dashboard', label: `Keeping: ${sys.name}`,
        sublabel: `${sys.description} · ${sys.role} · ${sys.category}`,
        href: '/?tab=overview', icon: LayoutDashboard,
      })),
      // ── Dashboard – Credentials tab ───────────────────────────────────────
      ...CREDENTIALS_DATA.map<SearchResult>(cred => ({
        id: `cred-${cred.variable}`, group: 'Dashboard', label: `Credential: ${cred.variable}`,
        sublabel: `${cred.description} · ${cred.category}`,
        href: '/?tab=credentials', icon: LayoutDashboard,
      })),
      // ── Tech Comparison – Power Platform tab ──────────────────────────────
      ...POWER_PLATFORM_WINS.map<SearchResult>(win => ({
        id: `pp-win-${win.id}`, group: 'Tech Comparison', label: `PP Win: ${win.title}`,
        sublabel: win.description,
        href: '/tech-comparison?tab=power-platform', icon: GitCompare,
      })),
      ...POWER_PLATFORM_LIMITATIONS.map<SearchResult>(lim => ({
        id: `pp-lim-${lim.id}`, group: 'Tech Comparison', label: `PP Limitation: ${lim.title}`,
        sublabel: `${lim.summary} · ${lim.detail.slice(0, 120)}`,
        href: '/tech-comparison?tab=power-platform', icon: GitCompare,
      })),
      // ── Tech Comparison – Custom Code tab ─────────────────────────────────
      ...ARCHITECTURE_LAYERS.map<SearchResult>(layer => ({
        id: `cc-arch-${layer.id}`, group: 'Tech Comparison', label: `Architecture: ${layer.label}`,
        sublabel: `${layer.sublabel} · ${layer.items.map(i => i.name + (i.tech ? ` (${i.tech})` : '')).join(' · ')}`,
        href: '/tech-comparison?tab=custom-code', icon: GitCompare,
      })),
      // ── Tech Comparison – Comparison tab (costs) ──────────────────────────
      ...PP_COST_ROWS.map<SearchResult>((row, i) => ({
        id: `pp-cost-${i}`, group: 'Tech Comparison', label: `PP Cost: ${row.label}`,
        sublabel: row.value,
        href: '/tech-comparison?tab=comparison', icon: GitCompare,
      })),
      ...CC_COST_ROWS.map<SearchResult>((row, i) => ({
        id: `cc-cost-${i}`, group: 'Tech Comparison', label: `Custom Code Cost: ${row.label}`,
        sublabel: row.value,
        href: '/tech-comparison?tab=comparison', icon: GitCompare,
      })),
      // ── Knowledge Base – Inventory States (Warehouse section) ─────────────
      ...INVENTORY_STATES.map<SearchResult>((state, i) => ({
        id: `inv-state-${i}`, group: 'Knowledge Base', label: `Inventory State: ${state}`,
        sublabel: 'GPU unit lifecycle state · warehouse tracking · state machine',
        href: '/knowledge-base', hash: '#kb-warehouse', icon: BookOpen,
      })),
      // ── Process page steps ────────────────────────────────────────────────
      ...PROCESS_STEPS.map<SearchResult>(step => ({
        id: `process-${step.id}`, group: 'Process', label: step.title,
        sublabel: `${step.description}${step.channels ? ' · ' + step.channels.map(c => c.label).join(', ') : ''}`,
        href: '/process', icon: Milestone,
      })),
      // ── Playground workflow group panels ──────────────────────────────────
      ...GROUPS.map<SearchResult>(g => ({
        id: `group-${g.id}`, group: 'Playground', label: g.label,
        sublabel: 'GPU lifecycle workflow section · interactive simulator',
        href: '/playground', icon: Cpu,
      })),
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allResults.slice(0, 8);
    const matched = allResults.filter(r =>
      r.label.toLowerCase().includes(q) || (r.sublabel?.toLowerCase().includes(q) ?? false)
    );
    return matched.slice(0, 50);
  }, [query, allResults]);

  const grouped = useMemo(() => {
    const map: Record<string, SearchResult[]> = {};
    filtered.forEach(r => {
      if (!map[r.group]) map[r.group] = [];
      map[r.group].push(r);
    });
    return map;
  }, [filtered]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => setSelectedIndex(0), [query]);

  // Lock body scroll while palette is open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, filtered.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filtered[selectedIndex];
        if (selected) navigate(selected);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, filtered, selectedIndex]);

  const navigate = (r: SearchResult) => {
    onClose();
    router.push(r.href + (r.hash ?? ''));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '12vh 16px 16px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            style={{
              width: '100%',
              maxWidth: 620,
              maxHeight: '72vh',
              backgroundColor: '#111118',
              border: '1px solid #2A2A35',
              borderRadius: 12,
              boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.02)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid #1E1E2A', flexShrink: 0 }}>
              <Search size={16} color="#5A5A70" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search modules, features, SOPs, glossary, pages..."
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  color: '#F0F0F5', fontSize: 14.5, minWidth: 0,
                }}
              />
              <kbd style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: '#5A5A70',
                padding: '2px 7px', border: '1px solid #2A2A35', borderRadius: 4,
                backgroundColor: '#1A1A24', flexShrink: 0,
              }}>
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '4px 8px 8px', minHeight: 0 }}>
              {filtered.length === 0 ? (
                <div style={{ padding: '48px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: 13, color: '#5A5A70' }}>No results for &ldquo;{query}&rdquo;</div>
                </div>
              ) : (
                Object.entries(grouped).map(([group, results]) => {
                  const gc = GROUP_COLORS[group] ?? DEFAULT_GC;
                  return (
                  <div key={group} style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 10.5, color: gc.color, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, padding: '6px 10px 4px', opacity: 0.8 }}>
                      {group}
                      <span style={{ marginLeft: 6, color: '#3A3A48' }}>·</span>
                      <span style={{ marginLeft: 6, color: '#3A3A48' }}>{results.length}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {results.map((result) => {
                        const globalIndex = filtered.indexOf(result);
                        const isSelected = globalIndex === selectedIndex;
                        const Icon = result.icon;
                        return (
                          <button
                            key={result.id}
                            onClick={() => navigate(result)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 10,
                              padding: '9px 10px', width: '100%', textAlign: 'left',
                              backgroundColor: isSelected ? gc.bg.replace('0.15', '0.08') : 'transparent',
                              border: 'none', cursor: 'pointer', borderRadius: 7,
                              transition: 'background-color 0.1s ease',
                            }}
                          >
                            <div style={{
                              width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                              backgroundColor: isSelected ? gc.bg : '#17171E',
                              border: `1px solid ${isSelected ? gc.border : '#2A2A35'}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <Icon size={13} color={isSelected ? gc.color : gc.dim} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 500, color: '#F0F0F5', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {result.label}
                              </div>
                              {result.sublabel && (
                                <div style={{ fontSize: 11.5, color: '#5A5A70', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.3 }}>
                                  {result.sublabel}
                                </div>
                              )}
                            </div>
                            {isSelected && (
                              <CornerDownLeft size={13} color={gc.color} style={{ flexShrink: 0 }} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderTop: '1px solid #1E1E2A', backgroundColor: '#0D0D13', fontSize: 10.5, color: '#5A5A70', flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <kbd style={{ fontFamily: 'var(--font-mono)', padding: '1px 5px', border: '1px solid #2A2A35', borderRadius: 3, backgroundColor: '#1A1A24' }}>↑↓</kbd>
                  Navigate
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <kbd style={{ fontFamily: 'var(--font-mono)', padding: '1px 5px', border: '1px solid #2A2A35', borderRadius: 3, backgroundColor: '#1A1A24' }}>↵</kbd>
                  Open
                </span>
              </div>
              <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Search Trigger Button ────────────────────────────────────────────────────

interface SearchTriggerProps {
  onClick: () => void;
  className?: string;
}

export function SearchTrigger({ onClick, className }: SearchTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={className}
      aria-label="Open search"
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '7px 12px',
        width: '100%',
        backgroundColor: '#17171E',
        border: '1px solid #2A2A35',
        borderRadius: 7,
        cursor: 'pointer',
        color: '#9090A8',
        fontSize: 12.5,
        transition: 'all 0.12s ease',
        minWidth: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#333340'; e.currentTarget.style.backgroundColor = '#1A1A24'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A35'; e.currentTarget.style.backgroundColor = '#17171E'; }}
    >
      <Search size={14} color="#5A5A70" style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        Search documentation...
      </span>
      <kbd style={{
        fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#5A5A70',
        padding: '1px 6px', border: '1px solid #2A2A35', borderRadius: 4,
        backgroundColor: '#0D0D13', flexShrink: 0,
      }} className="hidden sm:inline-block">
        ⌘K
      </kbd>
    </button>
  );
}

// ─── Hook to manage search state globally ─────────────────────────────────────

export function useGlobalSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return { open, setOpen };
}
