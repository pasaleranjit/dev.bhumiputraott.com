'use client';

import { SOPDocument } from '@/lib/data';
import { FileText, File, FileSpreadsheet, FileType, Presentation } from 'lucide-react';

interface SOPCardProps {
  sop: SOPDocument;
}

const FILE_TYPE_ICONS: Record<string, React.ElementType> = {
  pdf: FileType,
  docx: File,
  txt: FileText,
  xlsx: FileSpreadsheet,
  pptx: Presentation,
};

const FILE_TYPE_COLORS: Record<string, string> = {
  pdf: '#EF4444',
  docx: '#22C55E',
  txt: '#9090A8',
  xlsx: '#10B981',
  pptx: '#F59E0B',
};

const STATUS_CONFIG = {
  active: { label: 'Active', bg: 'rgba(16,185,129,0.1)', color: '#34D399' },
  'in-development': { label: 'In Development', bg: 'rgba(245,158,11,0.1)', color: '#FCD34D' },
  draft: { label: 'Draft', bg: 'rgba(90,90,112,0.15)', color: '#9090A8' },
};

function formatDate(dateStr: string): string {
  if (dateStr === 'TBD') return 'TBD';
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month)-1]} ${parseInt(day)}, ${year}`;
}

export function SOPCard({ sop }: SOPCardProps) {
  const Icon = FILE_TYPE_ICONS[sop.fileType] ?? FileText;
  const fileColor = FILE_TYPE_COLORS[sop.fileType] ?? '#9090A8';
  const statusCfg = STATUS_CONFIG[sop.status];

  return (
    <div
      style={{
        backgroundColor: '#1A1A24',
        border: '1px solid #2A2A35',
        borderRadius: 10,
        padding: '14px 16px',
        display: 'flex',
        gap: 12,
        transition: 'border-color 0.15s ease',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 7,
          backgroundColor: `${fileColor}15`,
          border: `1px solid ${fileColor}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={16} color={fileColor} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F5', lineHeight: 1.3 }}>{sop.name}</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: '1px 6px',
              borderRadius: 9999,
              backgroundColor: statusCfg.bg,
              color: statusCfg.color,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {statusCfg.label}
          </span>
        </div>
        <p style={{ fontSize: 12, color: '#9090A8', margin: '0 0 8px', lineHeight: 1.5 }}>{sop.covers}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <span style={{ fontSize: 10.5, color: '#5A5A70', backgroundColor: '#111118', padding: '1px 7px', borderRadius: 4, border: '1px solid #2A2A35', fontFamily: 'var(--font-mono)' }}>
            {sop.folder}
          </span>
          <span style={{ fontSize: 10.5, color: fileColor, backgroundColor: `${fileColor}10`, padding: '1px 7px', borderRadius: 4, border: `1px solid ${fileColor}25`, textTransform: 'uppercase', fontWeight: 600 }}>
            .{sop.fileType}
          </span>
          <span style={{ fontSize: 10.5, color: '#5A5A70' }}>{formatDate(sop.date)}</span>
        </div>
      </div>
    </div>
  );
}
