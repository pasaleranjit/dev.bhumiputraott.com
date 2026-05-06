'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Circle, Clock } from 'lucide-react';
import { Sprint } from '@/lib/data';
import { StatusBadge } from './status-badge';

interface SprintCardProps {
  sprint: Sprint;
  defaultOpen?: boolean;
}

export function SprintCard({ sprint, defaultOpen = false }: SprintCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  const completed = sprint.tasks.filter(t => t.status === 'completed').length;
  const inProgress = sprint.tasks.filter(t => t.status === 'in-progress').length;
  const total = sprint.tasks.length;

  return (
    <div
      style={{
        backgroundColor: '#1A1A24',
        border: `1px solid ${open ? '#333340' : '#2A2A35'}`,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '15px 18px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
            color: '#22C55E',
            fontFamily: 'var(--font-mono)',
            flexShrink: 0,
          }}
        >
          S{sprint.number}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#F0F0F5' }}>{sprint.title}</span>
            <StatusBadge status={sprint.status} size="sm" />
          </div>
          <div style={{ fontSize: 12, color: '#5A5A70', marginTop: 2 }}>
            {sprint.dateRange} · {completed}/{total} tasks complete
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Mini progress */}
          <div style={{ width: 48, height: 3, backgroundColor: '#2A2A35', borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(completed / total) * 100}%`, backgroundColor: '#10B981', borderRadius: 9999 }} />
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={15} color="#5A5A70" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 18px 16px', borderTop: '1px solid #1E1E2A', paddingTop: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {sprint.tasks.map((task, i) => {
                  const icon = task.status === 'completed'
                    ? <CheckCircle2 size={14} color="#10B981" />
                    : task.status === 'in-progress'
                    ? <Clock size={14} color="#22C55E" />
                    : <Circle size={14} color="#5A5A70" />;

                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                      <div style={{ flexShrink: 0 }}>{icon}</div>
                      <span
                        style={{
                          fontSize: 13,
                          color: task.status === 'completed' ? '#5A5A70' : task.status === 'in-progress' ? '#F0F0F5' : '#9090A8',
                          textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                          lineHeight: 1.4,
                        }}
                      >
                        {task.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
