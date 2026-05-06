'use client';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid #2A2A35',
        gap: 2,
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '10px 18px',
              fontSize: 13.5,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#F0F0F5' : '#9090A8',
              background: 'none',
              border: 'none',
              borderBottom: isActive ? '2px solid #22C55E' : '2px solid transparent',
              marginBottom: -1,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '1px 5px',
                  borderRadius: 9999,
                  backgroundColor: isActive ? 'rgba(34,197,94,0.2)' : '#111118',
                  color: isActive ? '#4ADE80' : '#5A5A70',
                  border: `1px solid ${isActive ? 'rgba(34,197,94,0.3)' : '#2A2A35'}`,
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
