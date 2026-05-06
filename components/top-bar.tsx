'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, PanelLeftClose, PanelLeftOpen, Globe } from 'lucide-react';
import { SearchTrigger } from './global-search';
import { useLang } from '@/lib/lang-context';

interface TopBarProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onToggleDesktopSidebar: () => void;
  desktopSidebarOpen: boolean;
}

export const TOPBAR_HEIGHT = 56;

const ROUTE_LABELS: Record<string, string> = {
  '/': 'Dashboard',
  '/knowledge-base': 'Knowledge Base',
  '/tech-comparison': 'Tech Stack',
  '/roadmap': 'Dev Roadmap',
  '/process': 'Business Flow',
};

function Breadcrumb() {
  const pathname = usePathname();
  const current = ROUTE_LABELS[pathname] ?? ROUTE_LABELS[`/${pathname.split('/')[1]}`] ?? 'Docs';

  return (
    // NOTE: no `display` in inline style — `hidden` class must win below md,
    // and `md:flex` takes over from md+. Inline display would override both.
    <nav
      aria-label="Breadcrumb"
      className="hidden md:flex"
      style={{ alignItems: 'center', gap: 10, flexShrink: 0, minWidth: 0 }}
    >
      <Link
        href="/"
        style={{
          fontSize: 13.5, fontWeight: 500, color: '#9090A8',
          textDecoration: 'none', whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#F0F0F5'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#9090A8'; }}
      >
        Bhoomiputra OTT
      </Link>
      <span style={{ color: '#3A3A48', fontSize: 14 }}>/</span>
      <span
        style={{
          fontSize: 13.5, fontWeight: 600, color: '#F0F0F5', whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}
      >
        {current}
      </span>
    </nav>
  );
}

function StatusIndicator() {
  // Hidden below sm; shown sm+. Again, no inline `display` so `hidden` wins below sm.
  return (
    <div
      className="hidden sm:flex"
      style={{
        alignItems: 'center', gap: 7, flexShrink: 0,
        padding: '5px 11px',
        backgroundColor: 'rgba(249,115,22,0.08)',
        border: '1px solid rgba(249,115,22,0.25)',
        borderRadius: 999,
      }}
    >
      <span
        style={{
          width: 7, height: 7, borderRadius: '50%', backgroundColor: '#F97316',
          boxShadow: '0 0 6px rgba(249,115,22,0.8)',
        }}
      />
      <span style={{ fontSize: 11.5, fontWeight: 600, color: '#FDBA74', whiteSpace: 'nowrap' }}>
        Proposal Phase
      </span>
    </div>
  );
}

function LanguageToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="hidden sm:flex"
      style={{
        alignItems: 'center', gap: 5, flexShrink: 0,
        padding: '5px 10px',
        backgroundColor: '#17171E',
        border: '1px solid #2A2A35',
        borderRadius: 6,
        color: '#9090A8',
        fontSize: 11.5,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.12s ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#1E1E2A';
        e.currentTarget.style.color = '#F97316';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = '#17171E';
        e.currentTarget.style.color = '#9090A8';
      }}
    >
      <Globe size={13} />
      {lang === 'en' ? 'EN' : 'मराठी'}
    </button>
  );
}

export function TopBar({ onOpenMenu, onOpenSearch, onToggleDesktopSidebar, desktopSidebarOpen }: TopBarProps) {
  const ToggleIcon = desktopSidebarOpen ? PanelLeftClose : PanelLeftOpen;

  return (
    <div
      style={{
        position: 'sticky', top: 0, zIndex: 30,
        height: TOPBAR_HEIGHT,
        backgroundColor: 'rgba(10,10,15,0.85)',
        borderBottom: '1px solid #1E1E2A',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        gap: 10,
      }}
    >
      {/* Hamburger — mobile only. No inline display so md:hidden can win. */}
      <button
        onClick={onOpenMenu}
        aria-label="Open menu"
        className="md:hidden"
        style={{
          width: 34, height: 34, borderRadius: 7,
          backgroundColor: '#17171E',
          border: '1px solid #2A2A35',
          alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#9090A8', flexShrink: 0,
        }}
      >
        <Menu size={16} />
      </button>

      {/* Sidebar toggle — desktop only. No inline display so hidden/md:flex can win. */}
      <button
        onClick={onToggleDesktopSidebar}
        aria-label={desktopSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        className="hidden md:flex"
        style={{
          width: 34, height: 34, borderRadius: 7,
          backgroundColor: '#17171E',
          border: '1px solid #2A2A35',
          alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#9090A8', flexShrink: 0,
          transition: 'background-color 0.12s ease, color 0.12s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1E1E2A'; e.currentTarget.style.color = '#F0F0F5'; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#17171E'; e.currentTarget.style.color = '#9090A8'; }}
      >
        <ToggleIcon size={16} />
      </button>

      {/* Breadcrumb — desktop only */}
      <Breadcrumb />

      {/* Spacer pushes search + status to the right */}
      <div style={{ flex: 1, minWidth: 0 }} />

      {/* Search — always visible. On mobile it takes the remaining space up to 360px. */}
      <div style={{ flexShrink: 1, flexGrow: 1, minWidth: 0, maxWidth: 360 }}>
        <SearchTrigger onClick={onOpenSearch} />
      </div>

      {/* Language toggle — hidden on narrow mobile */}
      <LanguageToggle />

      {/* Status — hidden on narrow mobile */}
      <StatusIndicator />
    </div>
  );
}
