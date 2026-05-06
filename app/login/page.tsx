'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Cpu, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        setError('Incorrect password. Please try again.');
        setShake(true);
        setPassword('');
        setTimeout(() => setShake(false), 600);
        inputRef.current?.focus();
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, #2A2A35 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.5,
        }}
      />

      {/* Floating GPU chip shapes */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[
          { top: '10%', left: '8%', size: 60, delay: 0 },
          { top: '60%', left: '5%', size: 45, delay: 1.5 },
          { top: '25%', right: '10%', size: 55, delay: 2 },
          { top: '70%', right: '8%', size: 40, delay: 0.8 },
          { top: '45%', left: '50%', size: 30, delay: 3 },
        ].map((chip, i) => (
          <div
            key={i}
            className="animate-gpu-float"
            style={{
              position: 'absolute',
              top: chip.top,
              left: 'left' in chip ? chip.left : undefined,
              right: 'right' in chip ? (chip as { right: string; size: number; delay: number; top: string }).right : undefined,
              animationDelay: `${chip.delay}s`,
              opacity: 0.12,
            }}
          >
            <svg width={chip.size} height={chip.size} viewBox="0 0 60 60" fill="none">
              <rect x="15" y="15" width="30" height="30" rx="4" stroke="#22C55E" strokeWidth="1.5" />
              <rect x="20" y="20" width="20" height="20" rx="2" fill="#22C55E" opacity="0.3" />
              {[0, 1, 2].map(n => (
                <g key={n}>
                  <line x1="15" y1={22 + n * 5} x2="8" y2={22 + n * 5} stroke="#22C55E" strokeWidth="1.2" />
                  <line x1="45" y1={22 + n * 5} x2="52" y2={22 + n * 5} stroke="#22C55E" strokeWidth="1.2" />
                  <line x1={22 + n * 5} y1="15" x2={22 + n * 5} y2="8" stroke="#22C55E" strokeWidth="1.2" />
                  <line x1={22 + n * 5} y1="45" x2={22 + n * 5} y2="52" stroke="#22C55E" strokeWidth="1.2" />
                </g>
              ))}
            </svg>
          </div>
        ))}
      </div>

      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={shake ? 'animate-shake' : ''}
        style={{
          width: '100%',
          maxWidth: 400,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: '#111118',
            border: '1px solid #2A2A35',
            borderRadius: 16,
            padding: '36px 32px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,197,94,0.1)',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 13,
                backgroundColor: '#22C55E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 14,
                boxShadow: '0 0 24px rgba(34,197,94,0.4)',
              }}
            >
              <Cpu size={26} color="#fff" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#F0F0F5', letterSpacing: '-0.02em', marginBottom: 3 }}>
                Amazin<span style={{ color: '#22C55E' }}>Xpress</span>
              </div>
              <div style={{ fontSize: 12, color: '#5A5A70', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
                ERP Documentation Portal
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #2A2A35', marginBottom: 24 }} />

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#9090A8', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>
                Access Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={14}
                  style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#5A5A70', pointerEvents: 'none' }}
                />
                <input
                  ref={inputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter portal password"
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    backgroundColor: '#0A0A0F',
                    border: `1px solid ${error ? '#EF4444' : '#2A2A35'}`,
                    borderRadius: 8,
                    color: '#F0F0F5',
                    fontSize: 14,
                    padding: '10px 36px',
                    outline: 'none',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#22C55E'; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.12)'; }}
                  onBlur={e => { e.target.style.borderColor = error ? '#EF4444' : '#2A2A35'; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#5A5A70', padding: 2, display: 'flex' }}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: '#F87171', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 7, padding: '8px 12px' }}
              >
                <AlertCircle size={13} />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !password.trim()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                padding: '11px 16px',
                backgroundColor: loading || !password.trim() ? '#1A1A24' : '#22C55E',
                color: loading || !password.trim() ? '#5A5A70' : '#fff',
                border: '1px solid transparent',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: loading || !password.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
                marginTop: 4,
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      animation: 'spin 0.6s linear infinite',
                    }}
                  />
                  Authenticating...
                </>
              ) : (
                <>
                  Access Portal
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p style={{ fontSize: 11, color: '#5A5A70', textAlign: 'center', margin: '20px 0 0', lineHeight: 1.5 }}>
            Internal access only. Unauthorized access is prohibited.
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
