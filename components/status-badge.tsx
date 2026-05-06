'use client';

import { Status } from '@/lib/data';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<Status, { label: string; bg: string; text: string; dot: string }> = {
  'planned': { label: 'Planned', bg: 'rgba(90,90,112,0.15)', text: '#9090A8', dot: '#5A5A70' },
  'in-progress': { label: 'In Progress', bg: 'rgba(34,197,94,0.15)', text: '#4ADE80', dot: '#22C55E' },
  'completed': { label: 'Completed', bg: 'rgba(16,185,129,0.15)', text: '#34D399', dot: '#10B981' },
  'deferred': { label: 'Deferred', bg: 'rgba(245,158,11,0.15)', text: '#FCD34D', dot: '#F59E0B' },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];
  const padding = size === 'sm' ? '1px 6px' : '2px 8px';
  const fontSize = size === 'sm' ? '10px' : '11px';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding,
        fontSize,
        fontWeight: 600,
        letterSpacing: '0.03em',
        borderRadius: '9999px',
        backgroundColor: cfg.bg,
        color: cfg.text,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: cfg.dot,
          flexShrink: 0,
          ...(status === 'in-progress' ? {
            boxShadow: `0 0 4px ${cfg.dot}`,
            animation: 'pulse 2s ease-in-out infinite',
          } : {}),
        }}
      />
      {cfg.label}
    </span>
  );
}
