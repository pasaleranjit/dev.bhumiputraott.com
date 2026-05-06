'use client';

interface ProgressBarProps {
  value: number;
  label?: boolean;
  height?: number;
  color?: string;
}

export function ProgressBar({ value, label = true, height = 4, color = '#22C55E' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <div
        style={{
          flex: 1,
          height,
          backgroundColor: '#2A2A35',
          borderRadius: 9999,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${clamped}%`,
            backgroundColor: clamped === 0 ? '#2A2A35' : clamped === 100 ? '#10B981' : color,
            borderRadius: 9999,
            transition: 'width 0.6s ease',
          }}
        />
      </div>
      {label && (
        <span style={{ fontSize: 11, color: '#5A5A70', fontFamily: 'var(--font-mono)', minWidth: 28, textAlign: 'right' }}>
          {clamped}%
        </span>
      )}
    </div>
  );
}
