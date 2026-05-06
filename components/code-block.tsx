'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'bash', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        backgroundColor: '#0A0A0F',
        border: '1px solid #2A2A35',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      {(filename || language) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 14px',
            borderBottom: '1px solid #1E1E2A',
            backgroundColor: '#111118',
          }}
        >
          <span style={{ fontSize: 12, color: '#5A5A70', fontFamily: 'var(--font-mono)' }}>
            {filename || language}
          </span>
          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: copied ? '#10B981' : '#5A5A70',
              fontSize: 11,
              padding: '2px 6px',
              borderRadius: 4,
              transition: 'color 0.15s ease',
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre
        style={{
          margin: 0,
          padding: '16px',
          fontSize: 12.5,
          lineHeight: 1.7,
          color: '#C0C0D8',
          fontFamily: 'var(--font-mono)',
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
