// @ts-nocheck
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/app-shell';
import { Header } from '@/components/header';
import { SprintCard } from '@/components/sprint-card';
import { MilestoneTimeline } from '@/components/milestone-timeline';
import {
  MILESTONES, SPRINTS,
  MILESTONES_PP, SPRINTS_PP,
  MILESTONES_HYBRID, SPRINTS_HYBRID,
  type Milestone, type Sprint,
} from '@/lib/data';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type ArchTab = 'custom' | 'power-platform' | 'hybrid';

const TABS: { id: ArchTab; label: string; badge?: string }[] = [
  { id: 'hybrid', label: 'Hybrid', badge: 'Recommended' },
  { id: 'custom', label: 'Custom Code' },
  { id: 'power-platform', label: 'Power Platform' },
];

const ARCH_META: Record<ArchTab, {
  color: string;
  bgColor: string;
  borderColor: string;
  icon: 'check' | 'info' | 'warn';
  headline: string;
  description: string;
  phase1Count: number;
  phase1Label: string;
  phase2Label: string;
}> = {
  hybrid: {
    color: '#F59E0B',
    bgColor: 'rgba(245,158,11,0.05)',
    borderColor: 'rgba(245,158,11,0.2)',
    icon: 'check',
    headline: 'Hybrid Architecture — Recommended',
    description: 'Custom code for the ERP core and GPU Exchange. Microsoft 365 used natively for collaboration (Teams, SharePoint, Outlook, Planner) via Power Automate and Graph API — no extra licensing. Same full delivery timeline as the custom code path, with M365 notifications and approval workflows handled zero-code.',
    phase1Count: 13,
    phase1Label: 'Phase 1 — Core ERP',
    phase2Label: 'Phase 2 — GPU Exchange & AI Readiness',
  },
  custom: {
    color: '#10B981',
    bgColor: 'rgba(16,185,129,0.05)',
    borderColor: 'rgba(16,185,129,0.2)',
    icon: 'info',
    headline: 'Custom Code — Full Stack',
    description: 'Fully custom-coded system: Next.js frontend, Node.js backend, PostgreSQL, Redis. Maximum capability ceiling — real-time dashboards, strict state machines, public-facing GPU Exchange. Higher upfront development investment with no ongoing per-seat licensing costs.',
    phase1Count: 13,
    phase1Label: 'Phase 1 — Core ERP',
    phase2Label: 'Phase 2 — GPU Exchange & AI Readiness',
  },
  'power-platform': {
    color: '#8B5CF6',
    bgColor: 'rgba(139,92,246,0.05)',
    borderColor: 'rgba(139,92,246,0.2)',
    icon: 'warn',
    headline: 'Power Platform — Internal ERP Only',
    description: 'Low-code build on Dataverse, Power Apps, Power Automate, and Power BI. Faster Phase 1 delivery (8 sprints vs 13). Lower upfront build cost. However: real-time floor dashboard is not achievable, strict state machine enforcement requires workarounds, and GPU Exchange cannot be delivered on Power Pages — a separate custom-code project would be required.',
    phase1Count: 8,
    phase1Label: 'Phase 1 — Core ERP (8 sprints)',
    phase2Label: 'Phase 2 — Advanced Modules (no GPU Exchange)',
  },
};

const ROADMAP_DATA: Record<ArchTab, { milestones: Milestone[]; sprints: Sprint[] }> = {
  custom: { milestones: MILESTONES, sprints: SPRINTS },
  'power-platform': { milestones: MILESTONES_PP, sprints: SPRINTS_PP },
  hybrid: { milestones: MILESTONES_HYBRID, sprints: SPRINTS_HYBRID },
};

export default function RoadmapPage() {
  return (
    <Suspense fallback={null}>
      <RoadmapContent />
    </Suspense>
  );
}

function RoadmapContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as ArchTab) ?? 'hybrid';
  const setActiveTab = (tab: ArchTab) => router.push(`/roadmap?tab=${tab}`, { scroll: false });

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#sprint-')) return;
    const id = hash.replace(/^#/, '');
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const meta = ARCH_META[activeTab];
  const { milestones, sprints } = ROADMAP_DATA[activeTab];
  const phase1Sprints = sprints.slice(0, meta.phase1Count);
  const phase2Sprints = sprints.slice(meta.phase1Count);

  return (
    <AppShell>
      <Header
        title="Roadmap"
        description="Milestones and sprint-by-sprint delivery plan from kickoff through full launch."
        badge={<span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 9999, backgroundColor: 'rgba(90,90,112,0.15)', color: '#9090A8', border: '1px solid #2A2A35', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Planning Phase</span>}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', padding: '0 20px' }}>

        {/* Tab bar — right-aligned, same pattern as tech-comparison */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 0 0', borderBottom: '1px solid #1E1E2A', marginBottom: 28 }}>
          <div style={{ display: 'flex', gap: 2, backgroundColor: '#111118', border: '1px solid #2A2A35', borderRadius: 9, padding: 3 }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px',
                  borderRadius: 7,
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.15s ease',
                  backgroundColor: activeTab === tab.id ? '#1E1E2C' : 'transparent',
                  color: activeTab === tab.id ? '#F0F0F5' : '#5A5A70',
                  boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.4)' : 'none',
                }}
              >
                {tab.label}
                {tab.badge && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 4,
                    backgroundColor: activeTab === tab.id ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)',
                    color: '#F59E0B',
                    border: '1px solid rgba(245,158,11,0.25)',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{ paddingBottom: 60 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

              {/* Architecture context banner */}
              <div style={{ backgroundColor: meta.bgColor, border: `1px solid ${meta.borderColor}`, borderRadius: 12, padding: '18px 20px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, marginTop: 1 }}>
                  {meta.icon === 'check' && <CheckCircle2 size={15} color={meta.color} />}
                  {meta.icon === 'info' && <Info size={15} color={meta.color} />}
                  {meta.icon === 'warn' && <AlertTriangle size={15} color={meta.color} />}
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: meta.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{meta.headline}</div>
                  <p style={{ margin: 0, fontSize: 13, color: '#9090A8', lineHeight: 1.75 }}>{meta.description}</p>
                </div>
              </div>

              {/* Power Platform warning */}
              {activeTab === 'power-platform' && (
                <div style={{ backgroundColor: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <AlertTriangle size={13} color="#F87171" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ margin: 0, fontSize: 12.5, color: '#9090A8', lineHeight: 1.7 }}>
                    <strong style={{ color: '#F0F0F5' }}>GPU Exchange is not included in this roadmap.</strong> Power Pages cannot deliver SSR, SEO-indexed product pages, Stripe checkout, or ecommerce-grade UX. Delivering GPU Exchange on this path requires a separate custom-code project (Next.js 15 + Stripe) scoped and estimated independently.
                  </p>
                </div>
              )}

              {/* Milestones */}
              <section>
                <SectionHeading number="01" title="Milestones" subtitle="Major project milestones from kickoff to launch" />
                <div style={{ backgroundColor: '#111118', border: '1px solid #1E1E2A', borderRadius: 12, padding: '24px 20px' }}>
                  <MilestoneTimeline milestones={milestones} />
                </div>
              </section>

              {/* Phase 1 Sprints */}
              <section>
                <SectionHeading
                  number="02"
                  title={meta.phase1Label}
                  subtitle={`${phase1Sprints.length} sprints — click to expand task details`}
                  accentColor={meta.color}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {phase1Sprints.map((sprint, i) => (
                    <motion.div
                      key={`${activeTab}-p1-${sprint.number}`}
                      id={`sprint-${sprint.number}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <SprintCard sprint={sprint} defaultOpen={sprint.number === 1} />
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Phase 2 Sprints */}
              {phase2Sprints.length > 0 && (
                <section>
                  <SectionHeading
                    number="03"
                    title={meta.phase2Label}
                    subtitle={`${phase2Sprints.length} sprints — click to expand task details`}
                    accentColor="#8B5CF6"
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {phase2Sprints.map((sprint, i) => (
                      <motion.div
                        key={`${activeTab}-p2-${sprint.number}`}
                        id={`sprint-${sprint.number}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <SprintCard sprint={sprint} defaultOpen={false} />
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  );
}

function SectionHeading({
  number, title, subtitle, accentColor = '#22C55E',
}: {
  number: string;
  title: string;
  subtitle: string;
  accentColor?: string;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <div style={{ fontSize: 11, color: '#5A5A70', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{number}</div>
        <div style={{ height: 1, width: 24, backgroundColor: '#2A2A35' }} />
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#F0F0F5', letterSpacing: '-0.01em' }}>{title}</h2>
        <div style={{ height: 3, width: 3, borderRadius: '50%', backgroundColor: accentColor, opacity: 0.7 }} />
      </div>
      <p style={{ margin: '0 0 0 50px', fontSize: 13, color: '#5A5A70' }}>{subtitle}</p>
    </div>
  );
}
