'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';
import { GlobalSearch, useGlobalSearch } from './global-search';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  // Persist desktop sidebar state in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('desktopSidebarOpen');
    if (stored !== null) {
      setDesktopSidebarOpen(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('desktopSidebarOpen', JSON.stringify(desktopSidebarOpen));
  }, [desktopSidebarOpen]);

  const { open: searchOpen, setOpen: setSearchOpen } = useGlobalSearch();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0A0A0F' }}>
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        desktopOpen={desktopSidebarOpen}
      />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <TopBar
          onOpenMenu={() => setMobileSidebarOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          onToggleDesktopSidebar={() => setDesktopSidebarOpen(o => !o)}
          desktopSidebarOpen={desktopSidebarOpen}
        />
        <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
      </div>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
