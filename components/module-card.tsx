'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Module } from '@/lib/data';
import { StatusBadge } from './status-badge';
import { PriorityBadge } from './priority-badge';
import { ProgressBar } from './progress-bar';

interface ModuleCardProps {
  module: Module;
  index: number;
  id?: string;
}

export function ModuleCard({ module, index, id }: ModuleCardProps) {
  const [expanded, setExpanded] = useState(false);

  const phaseColor = module.phase === 1 ? '#F59E0B' : '#8B5CF6';

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      style={{
        backgroundColor: '#1A1A24',
        border: '1px solid #2A2A35',
        borderRadius: 12,
        transition: 'border-color 0.15s ease',
      }}
    >
      <div style={{ padding: '16px 18px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              backgroundColor: `${phaseColor}15`,
              border: `1px solid ${phaseColor}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: 11,
              fontWeight: 700,
              color: phaseColor,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {module.id}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F0F5', lineHeight: 1.3, marginBottom: 4 }}>
              {module.name}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '1px 7px',
                  borderRadius: 9999,
                  backgroundColor: `${phaseColor}15`,
                  color: phaseColor,
                  border: `1px solid ${phaseColor}30`,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                Phase {module.phase}
              </span>
              <StatusBadge status={module.status} size="sm" />
              <PriorityBadge priority={module.priority} />
            </div>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 12.5, color: '#9090A8', lineHeight: 1.6, margin: '0 0 12px' }}>
          {module.description}
        </p>

        {/* Progress */}
        <div style={{ marginBottom: 12 }}>
          <ProgressBar value={module.progress} height={3} />
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#5A5A70',
            fontSize: 11.5,
            padding: 0,
            fontWeight: 500,
            transition: 'color 0.15s ease',
          }}
        >
          {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          {module.subItems.length} sub-features
        </button>
      </div>

      {/* Expanded sub-items */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ borderTop: '1px solid #1E1E2A', padding: '12px 18px', backgroundColor: '#111118', borderRadius: '0 0 12px 12px' }}
        >
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {module.subItems.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#9090A8', lineHeight: 1.5 }}>
                <span style={{ color: '#22C55E', marginTop: 2, flexShrink: 0 }}>›</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}
