'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, GitBranch } from 'lucide-react';

export interface FlowStep {
  label: string;
  sublabel?: string;
  color?: string;
  branch?: boolean;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  branches?: { label: string; steps: FlowStep[] }[];
  horizontal?: boolean;
}

function StepBox({ step, index }: { step: FlowStep; index: number }) {
  const color = step.color ?? '#22C55E';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      style={{
        padding: '8px 14px',
        backgroundColor: `${color}10`,
        border: `1px solid ${color}30`,
        borderRadius: 8,
        textAlign: 'center',
        minWidth: 100,
      }}
    >
      <div style={{ fontSize: 12.5, fontWeight: 600, color: '#F0F0F5', lineHeight: 1.3 }}>{step.label}</div>
      {step.sublabel && (
        <div style={{ fontSize: 10.5, color: '#5A5A70', marginTop: 2 }}>{step.sublabel}</div>
      )}
    </motion.div>
  );
}

export function FlowDiagram({ steps, branches, horizontal = true }: FlowDiagramProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Main path */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 4,
        }}
      >
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <StepBox step={step} index={i} />
            {i < steps.length - 1 && <ArrowRight size={14} color="#5A5A70" />}
          </div>
        ))}
      </div>

      {/* Branch paths */}
      {branches && branches.length > 0 && (
        <div style={{ borderTop: '1px dashed #2A2A35', paddingTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <GitBranch size={12} color="#5A5A70" />
            <span style={{ fontSize: 11, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Exception Paths
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {branches.map((branch, bi) => (
              <div key={bi} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: '#9090A8',
                    backgroundColor: '#1A1A24',
                    border: '1px solid #2A2A35',
                    borderRadius: 6,
                    padding: '3px 8px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {branch.label}
                </div>
                <ArrowRight size={12} color="#5A5A70" />
                {branch.steps.map((step, si) => (
                  <div key={si} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <StepBox step={step} index={bi * 10 + si + steps.length} />
                    {si < branch.steps.length - 1 && <ArrowRight size={12} color="#5A5A70" />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
