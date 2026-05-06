'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Rocket, Zap, GitMerge, FileText } from 'lucide-react';
import type { StatCard } from '@/lib/data';

const ICON_MAP: Record<string, React.ElementType> = {
  Layers, Rocket, Zap, GitMerge, FileText,
};

interface StatCardProps {
  stat: StatCard;
  index: number;
  highlighted?: boolean;
}

export function StatCardComponent({ stat, index, highlighted }: StatCardProps) {
  const Icon = ICON_MAP[stat.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      style={{
        backgroundColor: highlighted ? `rgba(34,197,94,0.04)` : '#111118',
        border: `1px solid ${highlighted ? 'rgba(34,197,94,0.3)' : '#1E1E2A'}`,
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'default',
        transition: 'border-color 0.15s ease',
      }}
    >
      {/* Colored top accent */}
      <div style={{ height: 3, backgroundColor: stat.color, opacity: highlighted ? 1 : 0.7 }} />

      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
        {/* Label row with icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{
            fontSize: 10.5, fontWeight: 700, color: '#5A5A70',
            textTransform: 'uppercase', letterSpacing: '0.09em',
          }}>
            {stat.label}
          </span>
          {Icon && (
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              backgroundColor: `${stat.color}12`,
              border: `1px solid ${stat.color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={13} color={stat.color} strokeWidth={2.2} />
            </div>
          )}
        </div>

        {/* Value */}
        <div style={{
          fontSize: 34, fontWeight: 800, color: stat.color,
          lineHeight: 1, letterSpacing: '-0.03em',
          fontFeatureSettings: '"tnum"',
        }}>
          {stat.value}
        </div>

        {/* Sub text */}
        {stat.sub && (
          <div style={{ fontSize: 11.5, color: '#5A5A70', marginTop: 6, lineHeight: 1.4 }}>
            {stat.sub}
          </div>
        )}
      </div>
    </motion.div>
  );
}
