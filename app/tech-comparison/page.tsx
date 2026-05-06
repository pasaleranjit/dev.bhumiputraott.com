'use client';

import { AppShell } from '@/components/app-shell';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { CollapsibleSection } from '@/components/collapsible-section';
import { ComparisonTable } from '@/components/comparison-table';
import { Header } from '@/components/header';
import {
  ARCHITECTURE_LAYERS,
  CC_COST_ROWS, CC_STRENGTHS, CC_TRADEOFFS,
  DECISION_SUMMARY_ROWS,
  HYBRID_DIFF_ROWS, HYBRID_LAYERS, HYBRID_SAME_ROWS,
  IMPL_PLAN_ROWS,
  PP_ARCHITECTURE_LAYERS, PP_COST_ROWS,
  POWER_PLATFORM_LIMITATIONS, POWER_PLATFORM_WINS,
  RECOMMENDED_TOOL_ROWS,
  TECH_COMPARISON, TECH_COMPARISON_TABS,
  type CompTab,
} from '@/lib/data';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, DollarSign, Lightbulb } from 'lucide-react';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TechComparisonPage() {
  return (
    <Suspense fallback={null}>
      <TechComparisonContent />
    </Suspense>
  );
}

function TechComparisonContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as CompTab) ?? 'comparison';
  const setActiveTab = (tab: CompTab) => router.push(`/tech-comparison?tab=${tab}`, { scroll: false });

  return (
    <AppShell>
      <Header
        title="Power Platform vs Custom Code"
        description="A technical evaluation of both approaches for the AmazinXpress ERP system."
        badge={
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 9999, backgroundColor: 'rgba(34,197,94,0.1)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Decision Document
          </span>
        }
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', padding: '0 20px' }}>

        {/* Tab bar — right-aligned */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 0 0', borderBottom: '1px solid #1E1E2A', marginBottom: 28 }}>
          <div style={{ display: 'flex', gap: 2, backgroundColor: '#111118', border: '1px solid #2A2A35', borderRadius: 9, padding: 3 }}>
            {TECH_COMPARISON_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
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

            {/* ── SIDE-BY-SIDE COMPARISON TAB ── */}
            {activeTab === 'comparison' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                <div style={{ backgroundColor: '#111118', border: '1px solid #2A2A35', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Lightbulb size={14} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ margin: 0, fontSize: 12.5, color: '#9090A8', lineHeight: 1.7 }}>
                    This matrix evaluates both platforms against the specific requirements of the AmazinXpress ERP. Each rating reflects practical capability, implementation effort, and operational trade-offs for this use case. — not a general endorsement or dismissal of either platform. Power Platform is genuinely powerful for the right problems; this document identifies where those problems overlap with this project and where they don't.
                  </p>
                </div>

                <section>
                  <SectionLabel number="01" title="Requirements comparison matrix" />
                  <ComparisonTable rows={TECH_COMPARISON} />
                </section>

                <section>
                  <SectionLabel number="02" title="Cost Comparison" />
                  <div style={{ backgroundColor: '#111118', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 14, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <AlertTriangle size={13} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
                    <p style={{ margin: 0, fontSize: 12.5, color: '#9090A8', lineHeight: 1.7 }}>
                      <strong style={{ color: '#F0F0F5' }}>This table shows ongoing infrastructure/licensing costs only.</strong> It does not include upfront build cost.
                      Power Platform requires fewer developer hours to stand up initial forms and workflows — a real upfront advantage.
                      Custom code has significantly higher upfront development investment, offset by lower long-term operational cost and no per-seat licensing growth.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
                    {/* Power Platform */}
                    <div style={{ backgroundColor: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 12, padding: '20px 22px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <DollarSign size={16} color="#8B5CF6" />
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#F0F0F5' }}>Power Platform</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                        {PP_COST_ROWS.map((row, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: '#9090A8', borderBottom: '1px dashed #2A2A35', paddingBottom: 6 }}>
                            <span>{row.label}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', color: row.valueColor ?? '#F0F0F5' }}>{row.value}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: 12, color: '#9090A8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Ongoing estimate</span>
                        <span style={{ fontSize: 22, fontWeight: 700, color: '#C4B5FD', fontFamily: 'var(--font-mono)' }}>$800–$2,000+</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#5A5A70', textAlign: 'right', marginTop: 2 }}>per month (scales with headcount)</div>
                    </div>

                    {/* Custom Code */}
                    <div style={{ backgroundColor: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 12, padding: '20px 22px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <DollarSign size={16} color="#10B981" />
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#F0F0F5' }}>Custom Code</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                        {CC_COST_ROWS.map((row, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: '#9090A8', borderBottom: '1px dashed #2A2A35', paddingBottom: 6 }}>
                            <span>{row.label}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', color: row.valueColor ?? '#F0F0F5' }}>{row.value}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: 12, color: '#9090A8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Ongoing estimate</span>
                        <span style={{ fontSize: 22, fontWeight: 700, color: '#34D399', fontFamily: 'var(--font-mono)' }}>$100–$300</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#5A5A70', textAlign: 'right', marginTop: 2 }}>per month (flat regardless of headcount)</div>
                    </div>
                  </div>
                </section>

                <section>
                  <SectionLabel number="03" title="Recommended Tool by Component" />
                  <div style={{ borderRadius: 12, border: '1px solid #2A2A35', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          {['Component', 'Recommended Tool', 'Reason'].map(h => (
                            <th key={h} style={{ padding: '10px 14px', backgroundColor: '#111118', color: '#9090A8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {RECOMMENDED_TOOL_ROWS.map((row, i) => (
                          <tr key={i}>
                            <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, fontWeight: 600, color: '#F0F0F5', whiteSpace: 'nowrap' }}>{row.component}</td>
                            <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top' }}>
                              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: '#4ADE80', backgroundColor: 'rgba(34,197,94,0.08)', padding: '2px 7px', borderRadius: 4, whiteSpace: 'nowrap' }}>{row.tool}</code>
                            </td>
                            <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, color: '#9090A8', lineHeight: 1.5 }}>{row.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}

            {/* ── POWER PLATFORM TAB ── */}
            {activeTab === 'power-platform' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                <div style={{ backgroundColor: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 12, padding: '20px 22px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Overview</div>
                  <p style={{ margin: 0, fontSize: 13, color: '#9090A8', lineHeight: 1.75 }}>
                    Microsoft Power Platform is a low-code/no-code suite comprising Power Apps (app builder), Power Automate (workflow automation), Power BI (analytics), and Dataverse (data platform). It is deeply integrated with Microsoft 365 and is designed to let non-developers build business applications and automations without writing code. It excels at simple internal tools, approval workflows, and M365-connected automations.
                  </p>
                </div>

                <section>
                  <SectionLabel number="01" title="Where Power Platform Excels" />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
                    {POWER_PLATFORM_WINS.map((win, i) => (
                      <motion.div
                        key={win.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        style={{ backgroundColor: '#1A1A24', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 10, padding: '16px 18px', borderTop: '2px solid #8B5CF6' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                          <CheckCircle2 size={14} color="#8B5CF6" />
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#F0F0F5' }}>{win.title}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 12.5, color: '#9090A8', lineHeight: 1.6 }}>{win.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionLabel number="02" title="Limitations for This Project" />
                  <p style={{ fontSize: 13, color: '#9090A8', margin: '0 0 16px', lineHeight: 1.6 }}>
                    These limitations are specific to the AmazinXpress ERP requirements — not general flaws. Power Platform is the right tool for many organizations; these are the constraints that matter for this specific system.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {POWER_PLATFORM_LIMITATIONS.map((lim, i) => (
                      <CollapsibleSection
                        key={lim.id}
                        title={`${i + 1}. ${lim.title}`}
                        badge={<span style={{ fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 4, backgroundColor: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.25)' }}>Limitation</span>}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#F0F0F5', lineHeight: 1.5 }}>{lim.summary}</p>
                          <p style={{ margin: 0, fontSize: 12.5, color: '#9090A8', lineHeight: 1.7 }}>{lim.detail}</p>
                        </div>
                      </CollapsibleSection>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionLabel number="03" title="Power Platform Architecture" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {PP_ARCHITECTURE_LAYERS.map((layer, i) => (
                      <motion.div
                        key={layer.letter}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        style={{ display: 'flex', gap: 0, borderRadius: 12, overflow: 'hidden', border: `1px solid ${layer.color}30` }}
                      >
                        <div style={{ width: 160, flexShrink: 0, backgroundColor: `${layer.color}10`, padding: '14px 16px', borderRight: `1px solid ${layer.color}25`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <div style={{ fontSize: 9, fontWeight: 700, color: layer.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>{layer.letter}</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#F0F0F5', marginBottom: 3, lineHeight: 1.3 }}>{layer.title}</div>
                          <div style={{ fontSize: 11, color: '#5A5A70', lineHeight: 1.4 }}>{layer.subtitle}</div>
                        </div>
                        <div style={{ flex: 1, backgroundColor: '#111118', padding: '12px 14px', display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                          {layer.items.map((item, j) => (
                            <span key={j} style={{ fontSize: 12, fontWeight: 500, color: '#F0F0F5', backgroundColor: '#1A1A24', border: '1px solid #2A2A35', padding: '4px 10px', borderRadius: 6 }}>{item}</span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* ── CUSTOM CODE TAB ── */}
            {activeTab === 'custom-code' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                <div style={{ backgroundColor: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: '20px 22px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Overview</div>
                  <p style={{ margin: 0, fontSize: 13, color: '#9090A8', lineHeight: 1.75 }}>
                    A fully custom-coded stack using industry-standard open-source technologies: Next.js for the frontend, Node.js for the backend, PostgreSQL for the database, and Redis for caching. This approach provides complete control over data models, business logic, UI, and integrations — at the cost of requiring developer effort for every feature. No vendor lock-in, no per-seat licensing, and no ceiling on what can be built.
                  </p>
                </div>

                <section>
                  <SectionLabel number="01" title="Strengths for This Project" />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
                    {CC_STRENGTHS.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        style={{ backgroundColor: '#1A1A24', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, padding: '16px 18px', borderTop: '2px solid #10B981' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                          <CheckCircle2 size={14} color="#10B981" />
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#F0F0F5' }}>{item.title}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 12.5, color: '#9090A8', lineHeight: 1.6 }}>{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionLabel number="02" title="Trade-offs to Acknowledge" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {CC_TRADEOFFS.map((item, i) => (
                      <div key={i} style={{ backgroundColor: '#111118', border: '1px solid #2A2A35', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <AlertTriangle size={14} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F5', marginBottom: 4 }}>{item.title}</div>
                          <p style={{ margin: 0, fontSize: 12.5, color: '#9090A8', lineHeight: 1.6 }}>{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionLabel number="03" title="Custom Code — System Architecture" />
                  <ArchitectureDiagram layers={ARCHITECTURE_LAYERS} />
                </section>
              </div>
            )}

            {/* ── HYBRID ARCHITECTURE TAB ── */}
            {activeTab === 'hybrid' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                <div style={{ backgroundColor: '#111118', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, padding: '20px 22px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Recommended Approach</div>
                  <p style={{ margin: 0, fontSize: 13, color: '#9090A8', lineHeight: 1.75 }}>
                    The recommended architecture is not "Power Platform vs Custom Code" — it's using each tool exactly where it has genuine advantages. Microsoft 365 is kept natively for collaboration (Teams, SharePoint, Outlook, Planner). The ERP and GPU Exchange are built in custom code. Third-party integrations (QBO, Amazon, eBay, Stripe) are the same regardless of which platform is chosen.
                  </p>
                </div>

                <section>
                  <SectionLabel number="01" title="Hybrid Architecture — Four Layers" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {HYBRID_LAYERS.map((layer, i) => (
                      <motion.div key={layer.letter} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                        <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${layer.color}30` }}>
                          <div style={{ display: 'flex', gap: 0 }}>
                            <div style={{ width: 180, flexShrink: 0, backgroundColor: `${layer.color}12`, padding: '16px 18px', borderRight: `1px solid ${layer.color}25`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <div style={{ width: 22, height: 22, borderRadius: 5, backgroundColor: `${layer.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: layer.color, fontFamily: 'var(--font-mono)' }}>{layer.letter}</div>
                                <span style={{ fontSize: 10, fontWeight: 700, color: layer.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Layer {layer.letter}</span>
                              </div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F5', marginBottom: 3, lineHeight: 1.3 }}>{layer.title}</div>
                              <div style={{ fontSize: 11, color: '#5A5A70', lineHeight: 1.4 }}>{layer.subtitle}</div>
                            </div>
                            <div style={{ flex: 1, backgroundColor: '#111118', padding: '14px 16px' }}>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                                {layer.items.map((item, j) => (
                                  <span key={j} style={{ fontSize: 12, fontWeight: 500, color: '#F0F0F5', backgroundColor: '#1A1A24', border: `1px solid ${layer.color}30`, padding: '4px 10px', borderRadius: 6 }}>{item}</span>
                                ))}
                              </div>
                              <p style={{ margin: 0, fontSize: 12, color: '#5A5A70', lineHeight: 1.5, fontStyle: 'italic' }}>{layer.rationale}</p>
                            </div>
                          </div>
                        </div>
                        {layer.connector && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0 5px 16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                              <div style={{ width: 1.5, height: 8, backgroundColor: `${layer.color}60` }} />
                              <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `5px solid ${layer.color}80` }} />
                            </div>
                            <span style={{ fontSize: 10.5, color: '#5A5A70', fontStyle: 'italic' }}>{layer.connectorLabel}</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionLabel number="02" title="Decision Summary" />
                  <div style={{ borderRadius: 12, border: '1px solid #2A2A35', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          {['Concern', 'Decision', 'Why'].map(h => (
                            <th key={h} style={{ padding: '10px 14px', backgroundColor: '#111118', color: '#9090A8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {DECISION_SUMMARY_ROWS.map((row, i) => {
                          const isCustom = row.decision.toLowerCase().includes('custom');
                          return (
                            <tr key={i}>
                              <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, fontWeight: 600, color: '#F0F0F5' }}>{row.concern}</td>
                              <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top' }}>
                                <span style={{
                                  fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 9999, whiteSpace: 'nowrap',
                                  ...(isCustom
                                    ? { color: '#34D399', backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }
                                    : { color: '#C4B5FD', backgroundColor: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)' })
                                }}>
                                  {row.decision}
                                </span>
                              </td>
                              <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, color: '#9090A8', lineHeight: 1.5 }}>{row.why}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <SectionLabel number="03" title="Hybrid vs Custom Code — What Actually Changes" />

                  <div style={{ marginBottom: 10, fontSize: 11, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What changes in Hybrid</div>
                  <div style={{ borderRadius: 12, border: '1px solid #2A2A35', overflow: 'hidden', marginBottom: 20 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <colgroup>
                        <col style={{ width: '22%' }} />
                        <col style={{ width: '39%' }} />
                        <col style={{ width: '39%' }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th style={{ padding: '9px 14px', backgroundColor: '#111118', color: '#9090A8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35' }}>Aspect</th>
                          <th style={{ padding: '9px 14px', backgroundColor: 'rgba(16,185,129,0.06)', color: '#34D399', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid rgba(16,185,129,0.2)', borderLeft: '1px solid rgba(16,185,129,0.15)' }}>Custom Code</th>
                          <th style={{ padding: '9px 14px', backgroundColor: 'rgba(245,158,11,0.06)', color: '#FBBF24', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid rgba(245,158,11,0.2)', borderLeft: '1px solid rgba(245,158,11,0.15)' }}>Hybrid</th>
                        </tr>
                      </thead>
                      <tbody>
                        {HYBRID_DIFF_ROWS.map((row, i) => (
                          <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                            <td style={{ padding: '9px 14px', borderBottom: '1px solid #1E1E2A', fontSize: 12, fontWeight: 700, color: '#F0F0F5', verticalAlign: 'top' }}>{row.aspect}</td>
                            <td style={{ padding: '9px 14px', borderBottom: '1px solid #1E1E2A', borderLeft: '1px solid rgba(16,185,129,0.1)', fontSize: 12, color: '#9090A8', lineHeight: 1.6, verticalAlign: 'top', backgroundColor: 'rgba(16,185,129,0.015)' }}>{row.customCode}</td>
                            <td style={{ padding: '9px 14px', borderBottom: '1px solid #1E1E2A', borderLeft: '1px solid rgba(245,158,11,0.1)', fontSize: 12, color: '#9090A8', lineHeight: 1.6, verticalAlign: 'top', backgroundColor: 'rgba(245,158,11,0.015)' }}>{row.hybrid}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ marginBottom: 10, fontSize: 11, fontWeight: 700, color: '#9090A8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What stays identical</div>
                  <div style={{ borderRadius: 12, border: '1px solid #2A2A35', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <colgroup><col style={{ width: '30%' }} /><col style={{ width: '70%' }} /></colgroup>
                      <thead>
                        <tr>
                          <th style={{ padding: '9px 14px', backgroundColor: '#111118', color: '#9090A8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35' }}>Area</th>
                          <th style={{ padding: '9px 14px', backgroundColor: '#111118', color: '#9090A8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35', borderLeft: '1px solid #2A2A35' }}>Both use the same</th>
                        </tr>
                      </thead>
                      <tbody>
                        {HYBRID_SAME_ROWS.map((row, i) => (
                          <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                            <td style={{ padding: '9px 14px', borderBottom: '1px solid #1E1E2A', fontSize: 12, fontWeight: 700, color: '#F0F0F5', verticalAlign: 'top' }}>{row.area}</td>
                            <td style={{ padding: '9px 14px', borderBottom: '1px solid #1E1E2A', borderLeft: '1px solid #2A2A35', fontSize: 12, color: '#9090A8', lineHeight: 1.6, verticalAlign: 'top' }}>{row.both}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}

            {/* ── IMPLEMENTATION PLAN TAB ── */}
            {activeTab === 'impl-plan' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                <div style={{ backgroundColor: '#111118', border: '1px solid #2A2A35', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Lightbulb size={14} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ margin: 0, fontSize: 12.5, color: '#9090A8', lineHeight: 1.7 }}>
                    This table compares what implementation actually looks like phase-by-phase for each approach. Hybrid uses Power Automate only where it has a genuine zero-code advantage (M365 connections), and custom code everywhere else — it is not "both platforms doing everything."
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    { color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.25)', label: 'Power Platform' },
                    { color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', label: 'Custom Code' },
                    { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', label: 'Hybrid' },
                  ].map(({ bg, border, label }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: bg, border: `1px solid ${border}` }} />
                      <span style={{ fontSize: 12, color: '#9090A8', fontWeight: 600 }}>{label}</span>
                    </div>
                  ))}
                </div>

                <section>
                  <SectionLabel number="01" title="Phase-by-Phase Comparison" />
                  <div style={{ borderRadius: 12, border: '1px solid #2A2A35', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <colgroup>
                        <col style={{ width: '16%' }} />
                        <col style={{ width: '28%' }} />
                        <col style={{ width: '28%' }} />
                        <col style={{ width: '28%' }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th style={{ padding: '11px 14px', backgroundColor: '#111118', color: '#9090A8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35' }}>Phase</th>
                          <th style={{ padding: '11px 14px', backgroundColor: 'rgba(139,92,246,0.07)', color: '#C4B5FD', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid rgba(139,92,246,0.2)', borderLeft: '1px solid rgba(139,92,246,0.2)' }}>Power Platform</th>
                          <th style={{ padding: '11px 14px', backgroundColor: 'rgba(16,185,129,0.07)', color: '#34D399', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid rgba(16,185,129,0.2)', borderLeft: '1px solid rgba(16,185,129,0.2)' }}>Custom Code</th>
                          <th style={{ padding: '11px 14px', backgroundColor: 'rgba(245,158,11,0.07)', color: '#FBBF24', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid rgba(245,158,11,0.2)', borderLeft: '1px solid rgba(245,158,11,0.2)' }}>Hybrid</th>
                        </tr>
                      </thead>
                      <tbody>
                        {IMPL_PLAN_ROWS.map((row, i) => (
                          <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.012)' }}>
                            <td style={{ padding: '11px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12, fontWeight: 700, color: '#F0F0F5', lineHeight: 1.45 }}>{row.phase}</td>
                            <td style={{ padding: '11px 14px', borderBottom: '1px solid #1E1E2A', borderLeft: '1px solid rgba(139,92,246,0.1)', verticalAlign: 'top', fontSize: 12, color: '#9090A8', lineHeight: 1.65, backgroundColor: 'rgba(139,92,246,0.015)' }}>{row.pp}</td>
                            <td style={{ padding: '11px 14px', borderBottom: '1px solid #1E1E2A', borderLeft: '1px solid rgba(16,185,129,0.1)', verticalAlign: 'top', fontSize: 12, color: '#9090A8', lineHeight: 1.65, backgroundColor: 'rgba(16,185,129,0.015)' }}>{row.cc}</td>
                            <td style={{ padding: '11px 14px', borderBottom: '1px solid #1E1E2A', borderLeft: '1px solid rgba(245,158,11,0.1)', verticalAlign: 'top', fontSize: 12, color: '#9090A8', lineHeight: 1.65, backgroundColor: 'rgba(245,158,11,0.015)' }}>{row.hy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  );
}

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: '#5A5A70', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{number}</div>
      <div style={{ height: 1, width: 24, backgroundColor: '#2A2A35' }} />
      <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#F0F0F5', letterSpacing: '-0.01em' }}>{title}</h2>
    </div>
  );
}
