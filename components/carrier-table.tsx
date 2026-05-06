'use client';

import { CarrierScheduleRow } from '@/lib/data';
import { AlertTriangle, Truck } from 'lucide-react';

interface CarrierTableProps {
  schedule: CarrierScheduleRow[];
}

const CARRIER_COLORS: Record<string, string> = {
  UPS: '#F59E0B',
  USPS: '#22C55E',
  FedEx: '#8B5CF6',
};

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  'Drop-off ONLY': { bg: 'rgba(16,185,129,0.1)', text: '#34D399' },
  'Pickup ONLY': { bg: 'rgba(239,68,68,0.1)', text: '#F87171' },
  'Drop-off & Pickup': { bg: 'rgba(34,197,94,0.1)', text: '#4ADE80' },
};

export function CarrierTable({ schedule }: CarrierTableProps) {
  return (
    <div style={{ borderRadius: 12, border: '1px solid #2A2A35', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Carrier', 'Time', 'Type', 'Frequency', 'Key Rules'].map(h => (
              <th key={h} style={{ padding: '10px 14px', backgroundColor: '#111118', color: '#9090A8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35', whiteSpace: 'nowrap' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedule.map((row, i) => {
            const carrierColor = CARRIER_COLORS[row.carrier] ?? '#9090A8';
            const typeCfg = TYPE_COLORS[row.type] ?? { bg: 'transparent', text: '#9090A8' };
            return (
              <tr key={i} style={{ backgroundColor: row.critical ? 'rgba(239,68,68,0.02)' : undefined }}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <Truck size={13} color={carrierColor} />
                    <span style={{ fontWeight: 700, color: carrierColor, fontSize: 13 }}>{row.carrier}</span>
                    {row.critical && <AlertTriangle size={11} color="#EF4444" />}
                  </div>
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontFamily: 'var(--font-mono)', fontSize: 12.5, color: '#F0F0F5', whiteSpace: 'nowrap' }}>
                  {row.time}
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top' }}>
                  <span style={{ fontSize: 11.5, fontWeight: 600, padding: '2px 8px', borderRadius: 9999, backgroundColor: typeCfg.bg, color: typeCfg.text, whiteSpace: 'nowrap' }}>
                    {row.type}
                  </span>
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, color: '#9090A8', whiteSpace: 'nowrap' }}>
                  {row.frequency}
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top' }}>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {row.rules.map((rule, ri) => (
                      <li key={ri} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12, color: '#9090A8', lineHeight: 1.4 }}>
                        <span style={{ color: '#5A5A70', flexShrink: 0 }}>·</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
