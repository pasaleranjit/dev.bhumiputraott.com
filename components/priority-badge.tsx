'use client';

import { Priority } from '@/lib/data';

interface PriorityBadgeProps {
  priority: Priority;
}

const PRIORITY_CONFIG: Record<Priority, { bg: string; text: string; border: string }> = {
  'P1': { bg: 'rgba(239,68,68,0.1)', text: '#F87171', border: 'rgba(239,68,68,0.3)' },
  'P2': { bg: 'rgba(245,158,11,0.1)', text: '#FCD34D', border: 'rgba(245,158,11,0.3)' },
  'P3': { bg: 'rgba(90,90,112,0.15)', text: '#9090A8', border: 'rgba(90,90,112,0.3)' },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const cfg = PRIORITY_CONFIG[priority];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1px 7px',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.05em',
        borderRadius: '4px',
        backgroundColor: cfg.bg,
        color: cfg.text,
        border: `1px solid ${cfg.border}`,
        fontFamily: 'var(--font-mono)',
      }}
    >
      {priority}
    </span>
  );
}
