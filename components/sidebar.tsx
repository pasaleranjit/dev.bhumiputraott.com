'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen, GitCompare,
  LayoutDashboard,
  LogOut,
  Map,
  Milestone,
  Workflow,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export const SIDEBAR_WIDTH = 248;

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/knowledge-base', label: 'Knowledge Base', icon: BookOpen },
  { href: '/tech-comparison', label: 'Tech Comparison', icon: GitCompare },
  { href: '/roadmap', label: 'Roadmap', icon: Map },
  { href: '/process', label: 'Business Process', icon: Milestone },
  { href: '/playground', label: 'Playground', icon: Workflow },
];

// ─── Brand with INTERNAL badge ────────────────────────────────────────────────

function Brand() {
  return (
    <Link href="/" style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '2px 2px' }}>
        <div
          style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            fontSize: 17, fontWeight: 800, color: '#0A0A0F',
            letterSpacing: '-0.02em',
            boxShadow: '0 2px 10px rgba(34,197,94,0.4)',
          }}
        >
          A
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0, flex: 1 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#F0F0F5', letterSpacing: '-0.01em' }}>
            AmazinXpress
          </span>
          <span
            style={{
              fontSize: 9, fontWeight: 700, color: '#4ADE80',
              backgroundColor: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(34,197,94,0.3)',
              padding: '2px 6px', borderRadius: 4,
              letterSpacing: '0.08em', flexShrink: 0,
            }}
          >
            INTERNAL
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Nav Link ─────────────────────────────────────────────────────────────────

function NavLink({ item, isActive, onClick }: { item: NavItem; isActive: boolean; onClick?: () => void }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      prefetch
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '9px 12px', borderRadius: 7,
        fontSize: 13.5, fontWeight: isActive ? 600 : 500,
        color: isActive ? '#F0F0F5' : '#9090A8',
        textDecoration: 'none',
        backgroundColor: isActive ? 'rgba(34,197,94,0.1)' : 'transparent',
        border: `1px solid ${isActive ? 'rgba(34,197,94,0.2)' : 'transparent'}`,
        transition: 'background-color 0.12s ease, color 0.12s ease',
      }}
      onMouseEnter={e => {
        if (!isActive) { e.currentTarget.style.backgroundColor = '#17171E'; e.currentTarget.style.color = '#F0F0F5'; }
      }}
      onMouseLeave={e => {
        if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#9090A8'; }
      }}
    >
      <Icon size={16} color={isActive ? '#22C55E' : '#5A5A70'} strokeWidth={2} />
      <span>{item.label}</span>
    </Link>
  );
}

// ─── Sidebar Inner ────────────────────────────────────────────────────────────

interface SidebarInnerProps {
  pathname: string;
  onLogout: () => void;
  onClose?: () => void;
}

function SidebarInner({ pathname, onLogout, onClose }: SidebarInnerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '14px 12px' }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingRight: onClose ? 4 : 0 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Brand />
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              width: 28, height: 28, borderRadius: 6,
              background: 'none', border: '1px solid #2A2A35', cursor: 'pointer', color: '#9090A8',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Portal label */}
      <div style={{
        fontSize: 10.5, color: '#5A5A70', textTransform: 'uppercase',
        letterSpacing: '0.1em', fontWeight: 700,
        padding: '24px 12px 8px',
      }}>
        Portal
      </div>

      {/* Nav + Key Dev Points (scrollable) */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map(item => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return <NavLink key={item.href} item={item} isActive={isActive} onClick={onClose} />;
          })}
        </nav>
      </div>

      {/* Sign out */}
      <div style={{ paddingTop: 10, borderTop: '1px solid #1E1E2A' }}>
        <button
          onClick={onLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%',
            padding: '9px 12px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#9090A8', fontSize: 13.5, fontWeight: 500,
            borderRadius: 7, textAlign: 'left',
            transition: 'background-color 0.12s ease, color 0.12s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#F87171'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#9090A8'; }}
        >
          <LogOut size={16} strokeWidth={2} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  desktopOpen: boolean;
}

export function Sidebar({ mobileOpen, onMobileClose, desktopOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <>
      {/* Desktop sidebar (md+) — animates width to collapse */}
      <motion.aside
        className="hidden md:flex"
        animate={{ width: desktopOpen ? SIDEBAR_WIDTH : 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 280 }}
        style={{
          flexShrink: 0,
          backgroundColor: '#0D0D13',
          borderRight: '1px solid #1E1E2A',
          height: '100vh',
          position: 'sticky',
          top: 0,
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Fixed-width inner so content doesn't squish during animation */}
        <div style={{ width: SIDEBAR_WIDTH, height: '100%', flexShrink: 0 }}>
          <SidebarInner pathname={pathname} onLogout={handleLogout} />
        </div>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 45, backdropFilter: 'blur(3px)' }}
            />
            <motion.aside
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              style={{
                position: 'fixed',
                left: 0, top: 0, bottom: 0,
                width: 288, maxWidth: '85vw',
                backgroundColor: '#0D0D13',
                borderRight: '1px solid #1E1E2A',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <SidebarInner pathname={pathname} onLogout={handleLogout} onClose={onMobileClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
