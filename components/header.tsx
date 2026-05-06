'use client';

interface HeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}

export function Header({ title, description, badge, actions }: HeaderProps) {
  return (
    <div
      style={{
        borderBottom: '1px solid #1E1E2A',
        padding: '22px 20px 18px',
        backgroundColor: '#0A0A0F',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#F0F0F5', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {title}
              </h1>
              {badge}
            </div>
            {description && (
              <p style={{ margin: '5px 0 0', fontSize: 13.5, color: '#9090A8', lineHeight: 1.5 }}>
                {description}
              </p>
            )}
          </div>
          {actions && <div style={{ flexShrink: 0 }}>{actions}</div>}
        </div>
      </div>
    </div>
  );
}
