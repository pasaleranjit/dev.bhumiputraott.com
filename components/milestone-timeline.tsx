'use client';

import { motion } from 'framer-motion';
import { Milestone } from '@/lib/data';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

const PHASE_COLORS: Record<number, string> = {
  1: '#F59E0B',
  2: '#8B5CF6',
  0: '#22C55E',
};

const PHASE_LABELS: Record<number, string> = {
  1: 'Phase 1',
  2: 'Phase 2',
  0: 'Launch',
};

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  const groups = milestones.reduce<
    Array<{ phase: number; items: Array<{ m: Milestone; globalIndex: number }> }>
  >((acc, m, i) => {
    const last = acc[acc.length - 1];
    if (last && last.phase === m.phase) last.items.push({ m, globalIndex: i });
    else acc.push({ phase: m.phase, items: [{ m, globalIndex: i }] });
    return acc;
  }, []);

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
      <div style={{ display: 'flex', gap: 80, minWidth: 'max-content', padding: '8px 0 24px', alignItems: 'flex-start' }}>
        {groups.map((group) => {
          const groupColor = PHASE_COLORS[group.phase] ?? '#22C55E';
          return (
            <div
              key={group.phase}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                padding: '8px 14px 12px',
                border: `1px solid ${groupColor}40`,
                borderRadius: 12,
                backgroundColor: `${groupColor}0A`,
                flexShrink: 0,
              }}
            >
              {/* Phase header */}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: groupColor,
                  paddingLeft: 32,
                  marginBottom: 2,
                }}
              >
                {PHASE_LABELS[group.phase] ?? `Phase ${group.phase}`}
              </div>

              {/* Group inner row */}
              <div style={{ display: 'flex', gap: 0, position: 'relative' }}>
                {/* Connecting line — only when group has 2+ nodes */}
                {group.items.length > 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 28,
                      left: 32,
                      right: 32,
                      height: 2,
                      backgroundColor: '#2A2A35',
                      zIndex: 0,
                    }}
                  />
                )}

                {group.items.map(({ m: milestone, globalIndex }) => {
                  const color = PHASE_COLORS[milestone.phase] ?? '#22C55E';
                  const Icon = milestone.status === 'past'
                    ? CheckCircle2
                    : milestone.status === 'current'
                    ? Clock
                    : Circle;

                  return (
                    <motion.div
                      key={globalIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: globalIndex * 0.06 }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 10,
                        width: 140,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {/* Node */}
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          backgroundColor: milestone.status === 'future' ? '#1A1A24' : `${color}20`,
                          border: `2px solid ${milestone.status === 'future' ? '#2A2A35' : color}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          ...(milestone.status === 'current' ? { boxShadow: `0 0 12px ${color}60` } : {}),
                        }}
                      >
                        <Icon size={16} color={milestone.status === 'future' ? '#5A5A70' : color} />
                      </div>

                      {/* Content */}
                      <div style={{ textAlign: 'center', padding: '0 6px' }}>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: milestone.status === 'future' ? '#5A5A70' : color,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: 3,
                          }}
                        >
                          {milestone.date}
                        </div>
                        <div
                          style={{
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: milestone.status === 'future' ? '#9090A8' : '#F0F0F5',
                            lineHeight: 1.3,
                            marginBottom: 4,
                          }}
                        >
                          {milestone.label}
                        </div>
                        <div style={{ fontSize: 11, color: '#5A5A70', lineHeight: 1.5 }}>
                          {milestone.description}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
