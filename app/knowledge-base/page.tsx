'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AppShell } from '@/components/app-shell';
import { Header } from '@/components/header';
import { FlowDiagram } from '@/components/flow-diagram';
import { SOPCard } from '@/components/sop-card';
import { GlossaryTable } from '@/components/glossary-table';
import { CarrierTable } from '@/components/carrier-table';
import {
  INTAKE_TYPES, REPAIR_TIERS, RETURN_CLASSIFICATIONS,
  CARRIER_SCHEDULE, BUSINESS_GLOSSARY,
  ACCOUNTING_FLOWS, ROLES_DATA, INVENTORY_STATES,
} from '@/lib/data';
import { BookOpen, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

const KB_SECTIONS = [
  { id: 'overview', label: 'Business Overview' },
  { id: 'lifecycle', label: 'GPU Lifecycle' },
  { id: 'intake', label: 'Intake Types' },
  { id: 'repairs', label: 'Repair Tiers' },
  { id: 'returns', label: 'Returns Classification' },
  { id: 'fba-returns', label: 'FBA Returns' },
  { id: 'carriers', label: 'Carrier Schedule' },
  { id: 'packages', label: 'Package Sorting' },
  { id: 'accounting', label: 'Accounting Workflow' },
  { id: 'warehouse', label: 'Warehouse Structure' },
  { id: 'skustack', label: 'SkuStack Replacement (Android)' },
  { id: 'roles', label: 'Roles & Permissions' },
  { id: 'glossary', label: 'Business Glossary' },
];

const FRAUD_RISK_CONFIG: Record<string, { color: string; bg: string }> = {
  high: { color: '#F87171', bg: 'rgba(239,68,68,0.1)' },
  medium: { color: '#FCD34D', bg: 'rgba(245,158,11,0.1)' },
  low: { color: '#34D399', bg: 'rgba(16,185,129,0.1)' },
  'n/a': { color: '#9090A8', bg: 'rgba(90,90,112,0.1)' },
};

const URGENCY_CONFIG: Record<string, { label: string; color: string }> = {
  immediate: { label: 'Immediate', color: '#F87171' },
  high: { label: 'High', color: '#FCD34D' },
  normal: { label: 'Normal', color: '#34D399' },
};

export default function KnowledgeBasePage() {
  const [activeSection, setActiveSection] = useState('overview');
  // Lock scroll-spy while a click-triggered smooth scroll is in flight,
  // otherwise the IntersectionObserver fires mid-scroll and flips the active item.
  const lockUntilRef = useRef<number>(0);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`kb-${id}`);
    if (!el) return;

    setActiveSection(id);

    // Lock observer for ~900ms (covers a typical smooth-scroll animation)
    lockUntilRef.current = Date.now() + 900;
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      lockUntilRef.current = 0;
    }, 900);

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Scroll-spy: on every scroll, pick the last section whose top is above the fold.
  // This never skips a section — unlike IntersectionObserver with rootMargin,
  // which can silently miss sections that pass through the zone too quickly
  // or whose intersectionRatio never crosses a discrete threshold.
  useEffect(() => {
    let ticking = false;
    const FOLD = 120; // px from top of viewport; a section above this line is "active"

    const updateActive = () => {
      ticking = false;
      if (Date.now() < lockUntilRef.current) return;

      let currentId = KB_SECTIONS[0].id;
      for (const section of KB_SECTIONS) {
        const el = document.getElementById(`kb-${section.id}`);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= FOLD) {
          currentId = section.id; // advanced past this section's top
        } else {
          break; // sections are in DOM order — first one below the fold ends the scan
        }
      }

      setActiveSection(prev => (prev === currentId ? prev : currentId));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    };

    updateActive(); // initial pass
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, []);

  // Jump to the section matching the URL hash (used by global-search navigations
  // like "/knowledge-base#kb-sops"). Runs on mount and on every hash change.
  useEffect(() => {
    const jumpToHash = () => {
      const raw = window.location.hash.replace(/^#/, '');
      if (!raw) return;
      const id = raw.startsWith('kb-') ? raw.slice(3) : raw;
      const valid = KB_SECTIONS.some(s => s.id === id);
      if (!valid) return;

      const el = document.getElementById(`kb-${id}`);
      if (!el) return;

      // Lock the scroll-spy while we jump, then set active section
      lockUntilRef.current = Date.now() + 900;
      setActiveSection(id);
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };

    jumpToHash();
    window.addEventListener('hashchange', jumpToHash);
    return () => window.removeEventListener('hashchange', jumpToHash);
  }, []);


  return (
    <AppShell>
      <Header
        title="Knowledge Base"
        description="Complete operational documentation — business processes, SOPs, workflows, and reference data."
        badge={<span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 9999, backgroundColor: 'rgba(16,185,129,0.1)', color: '#34D399', border: '1px solid rgba(16,185,129,0.2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Live Reference</span>}
      />

      {/* Mobile section selector (shown <lg) */}
      <div
        className="lg:hidden sticky-under-topbar"
        style={{ padding: '12px 16px', borderBottom: '1px solid #1E1E2A', backgroundColor: '#0D0D13' }}
      >
        <select
          value={activeSection}
          onChange={e => scrollTo(e.target.value)}
          style={{
            width: '100%', backgroundColor: '#17171E', border: '1px solid #2A2A35',
            borderRadius: 7, color: '#F0F0F5', fontSize: 13, padding: '8px 12px',
            outline: 'none', cursor: 'pointer', appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239090A8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
            paddingRight: 32,
          }}
        >
          {KB_SECTIONS.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start', maxWidth: 1280, margin: '0 auto' }}>
        {/* Left sidebar nav — sticky below top bar, always full-height scrollable */}
        <aside
          style={{
            width: 220,
            flexShrink: 0,
            position: 'sticky',
            top: 56,
            alignSelf: 'flex-start',
            height: 'calc(100vh - 56px)',
            overflowY: 'auto',
            padding: '24px 12px 64px 20px',
            borderRight: '1px solid #1E1E2A',
          }}
          className="hidden lg:block scrollbar-thin"
        >
          <div style={{ fontSize: 10, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8, paddingLeft: 10 }}>On This Page</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {KB_SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '6px 10px',
                  borderRadius: 6,
                  fontSize: 12.5,
                  fontWeight: activeSection === s.id ? 500 : 400,
                  color: activeSection === s.id ? '#F0F0F5' : '#9090A8',
                  backgroundColor: activeSection === s.id ? '#1E1E2A' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  borderLeft: activeSection === s.id ? '2px solid #22C55E' : '2px solid transparent',
                  paddingLeft: 12,
                }}
                onMouseEnter={e => { if (activeSection !== s.id) { e.currentTarget.style.backgroundColor = '#17171E'; e.currentTarget.style.color = '#F0F0F5'; } }}
                onMouseLeave={e => { if (activeSection !== s.id) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#9090A8'; } }}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0, padding: '28px 20px 60px' }}>
          <div style={{ maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 48 }}>

            {/* A. Business Overview */}
            <section id="kb-overview">
              <SectionHeading id="overview" label="A" title="Business Overview" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <InfoCard>
                  <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#F0F0F5' }}>What AmazinXpress Does</h3>
                  <p style={{ margin: 0, fontSize: 13.5, color: '#9090A8', lineHeight: 1.7 }}>
                    AmazinXpress buys, refurbishes, repairs, and resells graphics cards (GPUs). The goal is to become the best GPU reseller in the United States — not only in size but in quality. The company is also becoming a trusted destination for GPU repairs and plans to eventually expand into other electronics categories.
                  </p>
                </InfoCard>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                  {[
                    { label: 'Core Business', value: 'Buy → Refurbish → Repair → Resell GPUs', color: '#22C55E' },
                    { label: 'Vision', value: 'Best GPU reseller in the United States', color: '#10B981' },
                    { label: 'Differentiator', value: 'Quality + Repair expertise + Serial tracking', color: '#F59E0B' },
                    { label: 'Expansion', value: 'GPU Exchange + other electronics categories', color: '#8B5CF6' },
                  ].map((c, i) => (
                    <div key={i} style={{ backgroundColor: '#1A1A24', border: `1px solid ${c.color}25`, borderRadius: 10, padding: '14px 16px', borderTop: `2px solid ${c.color}` }}>
                      <div style={{ fontSize: 10.5, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 5 }}>{c.label}</div>
                      <div style={{ fontSize: 13.5, color: '#F0F0F5', fontWeight: 500, lineHeight: 1.4 }}>{c.value}</div>
                    </div>
                  ))}
                </div>
                <div className="ax-callout ax-callout-accent" style={{ borderRadius: 10, padding: '14px 16px', backgroundColor: 'rgba(34,197,94,0.06)', borderLeft: '3px solid #22C55E' }}>
                  <strong style={{ color: '#4ADE80', fontSize: 13 }}>Core System Principle:</strong>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9090A8', lineHeight: 1.6 }}>
                    Every GPU is tracked individually by serial number from the moment it enters the business to the moment it leaves — capturing every action, decision, flag, repair, sale, and return in one continuous history.
                  </p>
                </div>
              </div>
            </section>

            {/* B. GPU Lifecycle */}
            <section id="kb-lifecycle">
              <SectionHeading id="lifecycle" label="B" title="GPU Production Lifecycle" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <FlowDiagram
                  steps={[
                    { label: 'Intake', color: '#22C55E' },
                    { label: 'Receiving S1', color: '#22C55E' },
                    { label: 'Receiving S2', color: '#22C55E' },
                    { label: 'Testing', color: '#F59E0B' },
                    { label: 'Cleaning', color: '#10B981' },
                    { label: 'Packaging', color: '#10B981' },
                    { label: 'Warehousing', color: '#8B5CF6' },
                    { label: 'Sales', color: '#10B981' },
                  ]}
                  branches={[
                    { label: 'Testing fail', steps: [{ label: 'Tier 1 Repair', color: '#F59E0B' }, { label: 'Re-test / Write-off', color: '#EF4444' }] },
                    { label: 'Receiving mismatch', steps: [{ label: 'Escalation', color: '#EF4444' }, { label: 'Vendor Return / Hold', color: '#F59E0B' }] },
                    { label: 'Customer return', steps: [{ label: 'RTG Inspection', color: '#8B5CF6' }, { label: 'Restock / Repair / Case', color: '#06B6D4' }] },
                    { label: 'Any stage', steps: [{ label: 'Flag Added', color: '#EF4444' }, { label: 'BLOCKED', color: '#EF4444' }] },
                  ]}
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                  {[
                    { stage: 'Intake', who: 'Receiving team / Customer', key: 'Classify intake type, create record' },
                    { stage: 'Receiving Stage 1', who: 'Technician', key: 'Unpack, count, scan tracking number' },
                    { stage: 'Receiving Stage 2', who: 'Technician', key: 'Inspect, assign condition, confirm SN' },
                    { stage: 'Testing', who: 'Technician', key: 'HWiNFO/GPU-Z test, pass/fail recording' },
                    { stage: 'Cleaning', who: 'Production team', key: 'Clean exterior, remove dust and debris' },
                    { stage: 'Packaging', who: 'Production team', key: 'Anti-static wrap, label, bulk or individual' },
                    { stage: 'Warehousing', who: 'Warehouse team', key: 'Bin assignment, location tracking' },
                    { stage: 'Sales', who: 'Sales channels', key: 'FBA/FBM/eBay/B2B/GPU Exchange' },
                  ].map((s, i) => (
                    <div key={i} style={{ backgroundColor: '#1A1A24', border: '1px solid #2A2A35', borderRadius: 9, padding: '12px 14px' }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#F0F0F5', marginBottom: 4 }}>{s.stage}</div>
                      <div style={{ fontSize: 11, color: '#22C55E', marginBottom: 5, fontWeight: 500 }}>By: {s.who}</div>
                      <div style={{ fontSize: 11.5, color: '#5A5A70', lineHeight: 1.5 }}>{s.key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* C. Intake Types */}
            <section id="kb-intake">
              <SectionHeading id="intake" label="C" title="Intake Types" />
              <div style={{ borderRadius: 12, border: '1px solid #2A2A35', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Code', 'Label', 'Source', 'Special Rules', 'Downstream Workflow'].map(h => (
                        <th key={h} style={{ padding: '10px 14px', backgroundColor: '#111118', color: '#9090A8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {INTAKE_TYPES.map((t, i) => (
                      <tr key={i}>
                        <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top' }}>
                          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: '#4ADE80', backgroundColor: 'rgba(34,197,94,0.08)', padding: '2px 7px', borderRadius: 4 }}>{t.code}</code>
                        </td>
                        <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 13, fontWeight: 600, color: '#F0F0F5', whiteSpace: 'nowrap' }}>{t.label}</td>
                        <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, color: '#9090A8', lineHeight: 1.5 }}>{t.source}</td>
                        <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, color: '#9090A8', lineHeight: 1.5, maxWidth: 200 }}>{t.specialRules}</td>
                        <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, color: '#9090A8', lineHeight: 1.5 }}>{t.downstreamWorkflow}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* D. Repair Tiers */}
            <section id="kb-repairs">
              <SectionHeading id="repairs" label="D" title="Repair Tiers" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
                {REPAIR_TIERS.map(tier => (
                  <div key={tier.tier} style={{ backgroundColor: '#1A1A24', border: `1px solid ${tier.tier === 1 ? 'rgba(245,158,11,0.25)' : 'rgba(239,68,68,0.25)'}`, borderRadius: 12, padding: '18px 20px', borderTop: `3px solid ${tier.tier === 1 ? '#F59E0B' : '#EF4444'}` }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: tier.tier === 1 ? '#F59E0B' : '#EF4444', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Tier {tier.tier}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F0F5', marginBottom: 4 }}>{tier.label}</div>
                    <div style={{ fontSize: 12, color: '#5A5A70', marginBottom: 14 }}>Performed by: <span style={{ color: '#9090A8' }}>{tier.performedBy}</span></div>
                    {[
                      { heading: 'Triggers', items: tier.triggers, color: '#06B6D4' },
                      { heading: 'Actions', items: tier.actions, color: '#10B981' },
                      { heading: 'Outcomes', items: tier.outcomes, color: '#8B5CF6' },
                    ].map(group => (
                      <div key={group.heading} style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 10.5, color: group.color, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 5 }}>{group.heading}</div>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                          {group.items.map((item, i) => (
                            <li key={i} style={{ fontSize: 12.5, color: '#9090A8', display: 'flex', gap: 6, lineHeight: 1.5 }}>
                              <span style={{ color: group.color, flexShrink: 0 }}>·</span>{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {/* E. Returns Classification */}
            <section id="kb-returns">
              <SectionHeading id="returns" label="E" title="Returns Classification" />
              <div style={{ borderRadius: 12, border: '1px solid #2A2A35', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Classification', 'Description', 'Fraud Risk', 'Routing Action', 'Urgency'].map(h => (
                        <th key={h} style={{ padding: '10px 14px', backgroundColor: '#111118', color: '#9090A8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RETURN_CLASSIFICATIONS.map((r, i) => {
                      const riskCfg = FRAUD_RISK_CONFIG[r.fraudRisk];
                      const urgencyCfg = URGENCY_CONFIG[r.urgency];
                      return (
                        <tr key={i}>
                          <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 13, fontWeight: 600, color: '#F0F0F5', whiteSpace: 'nowrap' }}>{r.label}</td>
                          <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, color: '#9090A8', lineHeight: 1.5, maxWidth: 220 }}>{r.description}</td>
                          <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top' }}>
                            <span style={{ fontSize: 11.5, fontWeight: 600, padding: '2px 8px', borderRadius: 9999, backgroundColor: riskCfg.bg, color: riskCfg.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{r.fraudRisk}</span>
                          </td>
                          <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, color: '#9090A8', lineHeight: 1.5 }}>{r.routingAction}</td>
                          <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top' }}>
                            <span style={{ fontSize: 11.5, fontWeight: 600, color: urgencyCfg.color }}>{urgencyCfg.label}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* E2. FBA Returns */}
            <section id="kb-fba-returns">
              <SectionHeading id="fba-returns" label="E2" title="FBA Returns — Auto-Ingestion & LPN Tracking" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="ax-callout" style={{ borderRadius: 9, padding: '13px 16px', backgroundColor: 'rgba(6,182,212,0.06)', borderLeft: '3px solid #06B6D4' }}>
                  <strong style={{ color: '#22D3EE', fontSize: 13 }}>How it works:</strong>
                  <span style={{ fontSize: 13, color: '#9090A8', marginLeft: 6 }}>Amazon SP-API automatically pulls FBA return data on a scheduled basis. Every return arrives pre-populated with LPN, ASIN, FNSKU, return reason, and action/state tags — no manual entry required.</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                  {[
                    { label: 'LPN', desc: 'License Plate Number — unique ID Amazon assigns to the return package. Used to match back to original sale.', color: '#06B6D4' },
                    { label: 'ASIN', desc: 'Amazon Standard Identification Number — identifies the product listing the return is for.', color: '#8B5CF6' },
                    { label: 'FNSKU', desc: 'Fulfillment Network SKU — your specific inventory code in the FBA warehouse.', color: '#F59E0B' },
                    { label: 'Return Reason', desc: 'Amazon-provided reason code for the return (e.g. defective, not as described, changed mind).', color: '#10B981' },
                    { label: 'Action Tags', desc: 'What Amazon did with the return (e.g. returned to seller, discarded, repackaged).', color: '#EF4444' },
                    { label: 'State Tags', desc: 'Condition Amazon assessed on the return (e.g. sellable, unsellable, customer damaged).', color: '#F97316' },
                  ].map((f, i) => (
                    <div key={i} style={{ backgroundColor: '#1A1A24', border: `1px solid ${f.color}25`, borderRadius: 9, padding: '12px 14px', borderTop: `2px solid ${f.color}` }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#F0F0F5', marginBottom: 4 }}>{f.label}</div>
                      <div style={{ fontSize: 12, color: '#9090A8', lineHeight: 1.5 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Matching Flow</div>
                  {[
                    { step: 1, label: 'SP-API Pull', desc: 'Scheduled job fetches new FBA returns from Amazon Seller Partner API.', color: '#06B6D4' },
                    { step: 2, label: 'LPN Capture', desc: 'Each return record is stored with its LPN, ASIN, FNSKU, return reason, action tag, and state tag.', color: '#8B5CF6' },
                    { step: 3, label: 'Auto-Match', desc: 'System attempts to match LPN to the original sale serial number using FBA shipment records.', color: '#10B981' },
                    { step: 4, label: 'Matched', desc: 'Return linked to SN history. Unit flagged for RTG inspection and routed to the returns workflow.', color: '#22C55E' },
                    { step: 5, label: 'Unmatched — Manual Review', desc: 'LPN that cannot be auto-matched is flagged and routed to a manual review queue for resolution.', color: '#EF4444' },
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, backgroundColor: '#1A1A24', border: '1px solid #2A2A35', borderRadius: 9, padding: '11px 16px', alignItems: 'flex-start' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: `${s.color}18`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700, color: s.color, flexShrink: 0 }}>{s.step}</div>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#F0F0F5', marginBottom: 2 }}>{s.label}</div>
                        <div style={{ fontSize: 12, color: '#9090A8', lineHeight: 1.5 }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* F. Carrier Schedule */}
            <section id="kb-carriers">
              <SectionHeading id="carriers" label="F" title="Carrier Schedule" />
              <CarrierTable schedule={CARRIER_SCHEDULE} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10, marginTop: 14 }}>
                {[
                  { icon: AlertTriangle, color: '#EF4444', title: 'UPS Morning Rule', body: 'UPS morning visit (9:45 AM ±30 min) is DROP-OFF ONLY. Never hand outgoing packages during this visit.' },
                  { icon: CheckCircle2, color: '#10B981', title: 'USPS Rule', body: 'ALWAYS give packages when USPS arrives. Do not hold for a second visit.' },
                  { icon: Clock, color: '#F59E0B', title: 'FedEx Rule', body: 'FedEx does NOT come every day. If they do not arrive — someone must drive to FedEx drop-off.' },
                ].map((card, i) => (
                  <div key={i} style={{ backgroundColor: '#1A1A24', border: `1px solid ${card.color}25`, borderLeft: `3px solid ${card.color}`, borderRadius: 9, padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                      <card.icon size={14} color={card.color} />
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: '#F0F0F5' }}>{card.title}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12.5, color: '#9090A8', lineHeight: 1.5 }}>{card.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* G. Package Sorting */}
            <section id="kb-packages">
              <SectionHeading id="packages" label="G" title="Incoming Package Sorting" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { type: 'Inventory POs', addressedTo: 'OCDeals Purchasing / AmazinXpress Inc Purchasing', action: 'Place on Inventory Receiving shelves', note: 'OCDeals Parts label may be GPU inventory — check weight', color: '#22C55E', urgency: 'Normal' },
                  { type: 'FBM Returns', addressedTo: 'Amazon RTG–FBM Returns / Walmart WMT MP Returns', action: 'Take IMMEDIATELY to person in charge of FBM returns', note: 'HIGHLY time-sensitive — refunds required within 2 business days', color: '#EF4444', urgency: 'Immediate' },
                  { type: 'FBA Removal Orders', addressedTo: 'RTG prefix on Ship-To', action: 'Take to FBA Returns staging area', note: 'Subtypes: Manual Removal, Fulfillable, Unfulfillable, Stranded', color: '#F59E0B', urgency: 'High' },
                  { type: 'Supplies', addressedTo: 'Supplies + team member name', action: 'Name listed → deliver to desk. No name → production supervisor', note: '', color: '#10B981', urgency: 'Normal' },
                  { type: 'Parts', addressedTo: 'Parts + team member name', action: 'Name listed → deliver to desk. No name → operations coordinator', note: '', color: '#8B5CF6', urgency: 'Normal' },
                ].map((pkg, i) => (
                  <div key={i} style={{ backgroundColor: '#1A1A24', border: `1px solid ${pkg.color}25`, borderLeft: `3px solid ${pkg.color}`, borderRadius: 9, padding: '13px 16px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ minWidth: 140 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#F0F0F5', marginBottom: 3 }}>{pkg.type}</div>
                      <div style={{ fontSize: 11, color: '#5A5A70', lineHeight: 1.5 }}>Addressed to: {pkg.addressedTo}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, color: '#9090A8', marginBottom: 3, lineHeight: 1.5 }}><strong style={{ color: '#F0F0F5' }}>Action:</strong> {pkg.action}</div>
                      {pkg.note && <div style={{ fontSize: 12, color: '#5A5A70', lineHeight: 1.5 }}><strong>Note:</strong> {pkg.note}</div>}
                    </div>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 9999, backgroundColor: `${pkg.color}15`, color: pkg.color }}>{pkg.urgency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* H. Accounting Workflow */}
            <section id="kb-accounting">
              <SectionHeading id="accounting" label="H" title="Accounting Workflow" />
              <div className="ax-callout ax-callout-success" style={{ borderRadius: 9, padding: '13px 16px', backgroundColor: 'rgba(16,185,129,0.06)', borderLeft: '3px solid #10B981', marginBottom: 12 }}>
                <strong style={{ color: '#34D399', fontSize: 13 }}>Goal:</strong>
                <span style={{ fontSize: 13, color: '#9090A8', marginLeft: 6 }}>Inventory values in IMS must always match QBO at all times.</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10, marginBottom: 20 }}>
                {[
                  { label: 'ASIN in FBA context', body: 'ASIN is stored on every FBA shipment record and FBA return record. Used to reconcile Amazon-reported inventory against IMS inventory by product listing.', color: '#8B5CF6' },
                  { label: 'FNSKU in FBA context', body: 'FNSKU identifies your specific inventory unit inside the FBA warehouse. Printed on unit labels before FBA shipment. Appears on FBA return records alongside LPN for matching.', color: '#F59E0B' },
                  { label: 'LPN in returns flow', body: 'LPN is Amazon\'s package-level ID for each FBA return. The ERP auto-matches LPN to the original sale SN. Matched returns trigger the RTG inspection and accounting adjustment. Unmatched LPNs are held in the manual review queue pending resolution before any accounting entry is made.', color: '#06B6D4' },
                ].map((note, i) => (
                  <div key={i} style={{ backgroundColor: '#1A1A24', border: `1px solid ${note.color}25`, borderLeft: `3px solid ${note.color}`, borderRadius: 9, padding: '12px 16px' }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: '#F0F0F5', marginBottom: 5 }}>{note.label}</div>
                    <p style={{ margin: 0, fontSize: 12, color: '#9090A8', lineHeight: 1.6 }}>{note.body}</p>
                  </div>
                ))}
              </div>
              {ACCOUNTING_FLOWS.map(flow => (
                <div key={flow.id} style={{ marginBottom: 24 }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: '#F0F0F5' }}>{flow.name}</h4>
                  <p style={{ margin: '0 0 14px', fontSize: 13, color: '#9090A8', lineHeight: 1.5 }}>{flow.description}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {flow.steps.map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: 14, backgroundColor: '#1A1A24', border: '1px solid #2A2A35', borderRadius: 9, padding: '12px 16px', alignItems: 'flex-start' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#4ADE80', flexShrink: 0 }}>{step.step}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F5', marginBottom: step.debit || step.notes ? 5 : 0 }}>{step.action}</div>
                          {(step.debit || step.credit) && (
                            <div style={{ display: 'flex', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                              {step.debit && <span style={{ fontSize: 12, color: '#34D399', backgroundColor: 'rgba(16,185,129,0.08)', padding: '1px 8px', borderRadius: 4 }}>DR: {step.debit}</span>}
                              {step.credit && <span style={{ fontSize: 12, color: '#F87171', backgroundColor: 'rgba(239,68,68,0.08)', padding: '1px 8px', borderRadius: 4 }}>CR: {step.credit}</span>}
                            </div>
                          )}
                          {step.notes && <div style={{ fontSize: 12, color: '#5A5A70', lineHeight: 1.5 }}>{step.notes}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* I. Warehouse Structure */}
            <section id="kb-warehouse">
              <SectionHeading id="warehouse" label="I" title="Warehouse Structure" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                {/* 5-warehouse inventory flow */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>5-Warehouse Inventory Flow</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[
                      { from: 'Placentia', to: 'Interim Warehouse', trigger: 'Ships out to Amazon', sub: '− Placentia  +  Interim Warehouse', fromColor: '#22C55E', toColor: '#06B6D4', physical: false },
                      { from: 'Interim Warehouse', to: 'FBA', trigger: 'Amazon checks in shipment', sub: '− Interim Warehouse  +  FBA', fromColor: '#06B6D4', toColor: '#8B5CF6', physical: false },
                      { from: 'FBA', to: 'Interim Return Warehouse', trigger: 'Customer return processed by Amazon', sub: '− FBA  +  Interim Return Warehouse', fromColor: '#8B5CF6', toColor: '#F97316', physical: false },
                      { from: 'Interim Return Warehouse', to: 'Placentia', trigger: 'Return received & inspected at warehouse', sub: '− Interim Return Warehouse  +  Placentia', fromColor: '#F97316', toColor: '#22C55E', physical: true },
                    ].map((flow, i) => (
                      <div key={i} style={{ backgroundColor: '#1A1A24', border: '1px solid #2A2A35', borderRadius: 9, padding: '11px 16px', display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                          <span style={{ fontSize: 12.5, fontWeight: 700, color: flow.fromColor, whiteSpace: 'nowrap' }}>{flow.from}</span>
                          <span style={{ fontSize: 13, color: '#5A5A70' }}>→</span>
                          <span style={{ fontSize: 12.5, fontWeight: 700, color: flow.toColor, whiteSpace: 'nowrap' }}>{flow.to}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 160 }}>
                          <div style={{ fontSize: 12, color: '#9090A8', marginBottom: 3 }}><strong style={{ color: '#F0F0F5' }}>Trigger:</strong> {flow.trigger}</div>
                          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#5A5A70', backgroundColor: '#111118', padding: '1px 8px', borderRadius: 4 }}>{flow.sub}</code>
                        </div>
                        {!flow.physical && <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 7px', borderRadius: 9999, backgroundColor: 'rgba(6,182,212,0.1)', color: '#06B6D4', whiteSpace: 'nowrap' }}>Digital / Virtual</span>}
                        {flow.physical && <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 7px', borderRadius: 9999, backgroundColor: 'rgba(34,197,94,0.1)', color: '#22C55E', whiteSpace: 'nowrap' }}>Physical Receipt</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5 warehouses reference */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>All 5 Warehouses</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                    {[
                      { label: 'Placentia', desc: 'Main physical warehouse — production floor, testing, packaging, and sellable inventory storage.', color: '#22C55E', type: 'Physical' },
                      { label: 'Interim Warehouse', desc: 'Digital — inventory shipped from Placentia that has not yet been checked in at Amazon.', color: '#06B6D4', type: 'Digital / Virtual' },
                      { label: 'FBA', desc: 'Amazon\'s fulfillment centers — inventory live and available for Amazon to pick, pack, and ship.', color: '#8B5CF6', type: 'Amazon' },
                      { label: 'Interim Return Warehouse', desc: 'Digital — FBA returns processed by Amazon but not yet physically received at Placentia.', color: '#F97316', type: 'Digital / Virtual' },
                      { label: 'Production Area', desc: 'Physical zone within Placentia for active production — receiving, testing, cleaning, packaging stations.', color: '#F59E0B', type: 'Physical' },
                    ].map((wh, i) => (
                      <div key={i} style={{ backgroundColor: '#1A1A24', border: `1px solid ${wh.color}25`, borderRadius: 9, padding: '12px 14px', borderTop: `2px solid ${wh.color}` }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#F0F0F5', marginBottom: 3 }}>{wh.label}</div>
                        <div style={{ fontSize: 10.5, color: wh.color, fontWeight: 600, marginBottom: 5 }}>{wh.type}</div>
                        <div style={{ fontSize: 12, color: '#9090A8', lineHeight: 1.5 }}>{wh.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bin hierarchy */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Bin Hierarchy (within Placentia)</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
                    {[
                      { label: 'Bin', desc: 'Single slot — smallest scannable unit', color: '#22C55E' },
                      { label: 'Shelving Unit', desc: 'Group of bins in one shelving rack', color: '#8B5CF6' },
                      { label: 'Region', desc: 'Named area within a warehouse section', color: '#10B981' },
                      { label: 'Area', desc: 'Production, Warehouse, Returns zones', color: '#F59E0B' },
                    ].map((level, i) => (
                      <div key={i} style={{ backgroundColor: '#1A1A24', border: `1px solid ${level.color}25`, borderRadius: 9, padding: '12px 14px', borderTop: `2px solid ${level.color}` }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#F0F0F5', marginBottom: 4 }}>{level.label}</div>
                        <div style={{ fontSize: 12, color: '#9090A8', lineHeight: 1.4 }}>{level.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>All Inventory States</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {INVENTORY_STATES.map(s => (
                      <code key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9090A8', backgroundColor: '#1A1A24', border: '1px solid #2A2A35', padding: '2px 8px', borderRadius: 4 }}>{s}</code>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* K. SkuStack Replacement */}
            <section id="kb-skustack">
              <SectionHeading id="skustack" label="K" title="SkuStack Replacement — Android Scanning App" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="ax-callout" style={{ borderRadius: 9, padding: '13px 16px', backgroundColor: 'rgba(34,197,94,0.06)', borderLeft: '3px solid #22C55E' }}>
                  <strong style={{ color: '#4ADE80', fontSize: 13 }}>Replaces SkuStack entirely.</strong>
                  <span style={{ fontSize: 13, color: '#9090A8', marginLeft: 6 }}>Delivered as a native Android app built with React Native. All bin scanning, product scanning, transfers, label printing, and movement logging are native to the ERP. Every ID and serial number is clickable with drill-down navigation to full unit history.</span>
                </div>

                {/* Android App Platform */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Android App — Platform Details</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                    {[
                      { label: 'React Native', desc: 'Built with React Native for native Android performance. Shares business logic with the ERP web app.', color: '#06B6D4' },
                      { label: 'APK Distribution', desc: 'Distributed as an APK via sideload or MDM — no Play Store listing required. Deploy directly to warehouse devices.', color: '#8B5CF6' },
                      { label: 'Camera Barcode Scanning', desc: 'Uses the Android device camera for barcode and QR code scanning. No dedicated scanner hardware required.', color: '#22C55E' },
                      { label: 'Zebra Printer (BT/USB)', desc: 'Connects to Zebra label printers via Bluetooth or USB directly from the app. ZPL format label output.', color: '#F59E0B' },
                      { label: 'Offline Mode', desc: 'Works on the warehouse floor with intermittent WiFi. Scans queue locally and sync to the ERP in the background.', color: '#10B981' },
                    ].map((item, i) => (
                      <div key={i} style={{ backgroundColor: '#1A1A24', border: `1px solid ${item.color}25`, borderRadius: 9, padding: '12px 14px', borderTop: `2px solid ${item.color}` }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#F0F0F5', marginBottom: 4 }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: '#9090A8', lineHeight: 1.5 }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scanning flows */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Core Scanning Flows</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                    {[
                      { label: 'Bin Scanning', desc: 'Scan a bin location to view all units in it, add units, or start a transfer.', color: '#22C55E' },
                      { label: 'Product Scanning', desc: 'Scan a unit serial number to see its current location, stage, history, and flags.', color: '#06B6D4' },
                      { label: 'Bin-to-Bin Transfer', desc: 'Scan source bin → scan target bin → confirm. Movement logged with timestamp and technician.', color: '#8B5CF6' },
                      { label: 'SKU-to-SKU Transfer', desc: 'Reassign units from one SKU/condition classification to another — permission-controlled.', color: '#F59E0B' },
                      { label: 'Bin Movements Log', desc: 'Full audit trail of every scan and movement — searchable by SN, bin, session ID, or date.', color: '#10B981' },
                    ].map((flow, i) => (
                      <div key={i} style={{ backgroundColor: '#1A1A24', border: `1px solid ${flow.color}25`, borderRadius: 9, padding: '12px 14px', borderTop: `2px solid ${flow.color}` }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#F0F0F5', marginBottom: 4 }}>{flow.label}</div>
                        <div style={{ fontSize: 12, color: '#9090A8', lineHeight: 1.5 }}>{flow.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Label printing */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Label Printing — Printed on PO Receipt</div>
                  <div style={{ backgroundColor: '#1A1A24', border: '1px solid #2A2A35', borderRadius: 10, padding: '16px 18px' }}>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                      {['Serial Number (QR code)', 'SKU', 'Condition Grade', 'PO Number', 'Received Date', 'FNSKU'].map((field, i) => (
                        <span key={i} style={{ fontSize: 11.5, fontWeight: 600, padding: '3px 10px', borderRadius: 9999, backgroundColor: 'rgba(34,197,94,0.1)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.2)' }}>{field}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 12.5, color: '#9090A8', lineHeight: 1.6 }}>
                      Labels are printed automatically when a PO is received. Supports <strong style={{ color: '#F0F0F5' }}>Zebra printers</strong> (ZPL label format). Re-print is available from any unit record at any time. FNSKU appears on the label so units are FBA-ready on receipt.
                    </div>
                  </div>
                </div>

                {/* Session ID */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Session ID — Scan Grouping</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { step: 1, label: 'Session Begins', desc: 'When a technician starts scanning, a Session ID is auto-generated. No manual input required.', color: '#06B6D4' },
                      { step: 2, label: 'Scans Grouped', desc: 'Every scan performed — bin scans, product scans, transfers — is associated with the active Session ID.', color: '#8B5CF6' },
                      { step: 3, label: 'Session Ends', desc: 'Session is closed manually or automatically after inactivity. Final scan count recorded.', color: '#F59E0B' },
                      { step: 4, label: 'Session History', desc: 'Any session can be looked up by Session ID. Shows: technician, start/end time, all scans, all actions taken.', color: '#22C55E' },
                    ].map((s, i) => (
                      <div key={i} style={{ display: 'flex', gap: 14, backgroundColor: '#1A1A24', border: '1px solid #2A2A35', borderRadius: 9, padding: '11px 16px', alignItems: 'flex-start' }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: `${s.color}18`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700, color: s.color, flexShrink: 0 }}>{s.step}</div>
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#F0F0F5', marginBottom: 2 }}>{s.label}</div>
                          <div style={{ fontSize: 12, color: '#9090A8', lineHeight: 1.5 }}>{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* J. Roles & Permissions */}
            <section id="kb-roles">
              <SectionHeading id="roles" label="J" title="Roles & Permissions" />
              <div style={{ borderRadius: 12, border: '1px solid #2A2A35', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Role', 'Description', 'Module Access', 'Financial', 'Reclassify', 'External'].map(h => (
                        <th key={h} style={{ padding: '10px 14px', backgroundColor: '#111118', color: '#9090A8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROLES_DATA.map((role, i) => (
                      <tr key={i}>
                        <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top' }}>
                          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: '#4ADE80', backgroundColor: 'rgba(34,197,94,0.08)', padding: '2px 7px', borderRadius: 4 }}>{role.role}</code>
                        </td>
                        <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, color: '#9090A8', lineHeight: 1.5 }}>{role.description}</td>
                        <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {role.moduleAccess.map((m, mi) => <span key={mi} style={{ fontSize: 11.5, color: '#9090A8' }}>· {m}</span>)}
                          </div>
                        </td>
                        <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', textAlign: 'center' }}>
                          {role.canFinancialActions ? <CheckCircle2 size={14} color="#10B981" /> : <span style={{ color: '#5A5A70', fontSize: 12 }}>—</span>}
                        </td>
                        <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', textAlign: 'center' }}>
                          {role.canReclassify ? <CheckCircle2 size={14} color="#10B981" /> : <span style={{ color: '#5A5A70', fontSize: 12 }}>—</span>}
                        </td>
                        <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', textAlign: 'center' }}>
                          {role.isExternal ? <span style={{ fontSize: 11, color: '#F59E0B', fontWeight: 600 }}>External</span> : <span style={{ fontSize: 11, color: '#5A5A70' }}>Internal</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* L. Business Glossary */}
            <section id="kb-glossary">
              <SectionHeading id="glossary" label="L" title="Business Glossary" />
              <GlossaryTable terms={BUSINESS_GLOSSARY} />
            </section>

          </div>
        </div>
      </div>
    </AppShell>
  );
}

function SectionHeading({ label, title }: { id: string; label: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid #2A2A35' }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#22C55E', flexShrink: 0, fontFamily: 'var(--font-mono)' }}>{label}</div>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#F0F0F5', letterSpacing: '-0.01em' }}>{title}</h2>
    </div>
  );
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#1A1A24', border: '1px solid #2A2A35', borderRadius: 12, padding: '18px 20px' }}>
      {children}
    </div>
  );
}
