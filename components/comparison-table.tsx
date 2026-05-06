'use client';

import { ComparisonRow, ComparisonRating } from '@/lib/data';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface ComparisonTableProps {
  rows: ComparisonRow[];
}

const RATING_CONFIG: Record<ComparisonRating, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  strong: { icon: CheckCircle2, color: '#10B981', bg: 'rgba(16,185,129,0.08)', label: 'Strong fit' },
  moderate: { icon: AlertCircle, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', label: 'Partial fit' },
  limited: { icon: XCircle, color: '#EF4444', bg: 'rgba(239,68,68,0.08)', label: 'Not suitable' },
};

function RatingCell({ rating, notes }: { rating: ComparisonRating; notes: string }) {
  const cfg = RATING_CONFIG[rating];
  const Icon = cfg.icon;
  return (
    <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', backgroundColor: cfg.bg, verticalAlign: 'top' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
        <Icon size={14} color={cfg.color} style={{ flexShrink: 0, marginTop: 2 }} />
        <span style={{ fontSize: 12, color: '#9090A8', lineHeight: 1.5 }}>{notes}</span>
      </div>
    </td>
  );
}

export function ComparisonTable({ rows }: ComparisonTableProps) {
  return (
    <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #2A2A35' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
        <thead>
          <tr>
            <th style={{ padding: '12px 14px', backgroundColor: '#111118', color: '#9090A8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35', whiteSpace: 'nowrap', width: '30%' }}>
              Requirement
            </th>
            <th style={{ padding: '12px 14px', backgroundColor: 'rgba(245,158,11,0.06)', color: '#F59E0B', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35', whiteSpace: 'nowrap', width: '35%' }}>
              Power Platform
            </th>
            <th style={{ padding: '12px 14px', backgroundColor: 'rgba(34,197,94,0.06)', color: '#4ADE80', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35', whiteSpace: 'nowrap', width: '35%' }}>
              Custom Code
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', fontSize: 13, color: '#F0F0F5', verticalAlign: 'top', fontWeight: 500 }}>
                {row.requirement}
              </td>
              <RatingCell rating={row.powerPlatform.rating} notes={row.powerPlatform.notes} />
              <RatingCell rating={row.customCode.rating} notes={row.customCode.notes} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
