'use client';

import { motion } from 'framer-motion';
import { TeamMember } from '@/lib/data';

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export function TeamCard({ member, index }: TeamCardProps) {
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (member.progressPct / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      style={{
        backgroundColor: '#1A1A24',
        border: '1px solid #2A2A35',
        borderRadius: 12,
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minWidth: 160,
        flex: '1 1 160px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Progress ring avatar */}
        <div style={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}>
          <svg width="52" height="52" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="26" cy="26" r="20" fill="none" stroke="#2A2A35" strokeWidth="3" />
            <circle
              cx="26" cy="26" r="20" fill="none"
              stroke={member.color}
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: member.color,
            }}
          >
            {member.initials}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F5', lineHeight: 1.3 }}>
            {member.name}
          </div>
          <div style={{ fontSize: 11, color: '#9090A8', marginTop: 2, lineHeight: 1.4 }}>
            {member.role}
          </div>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 10, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4 }}>
          Current Focus
        </div>
        <div style={{ fontSize: 12, color: '#9090A8', lineHeight: 1.5 }}>
          {member.focus}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: '#5A5A70' }}>Sprint progress</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: member.color, fontFamily: 'var(--font-mono)' }}>
          {member.progressPct}%
        </span>
      </div>
    </motion.div>
  );
}
