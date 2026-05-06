'use client';

import { useState } from 'react';
import { GlossaryTerm } from '@/lib/data';
import { SearchInput } from './search-input';

interface GlossaryTableProps {
  terms: GlossaryTerm[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Accounting: '#10B981',
  Fulfillment: '#22C55E',
  Returns: '#EF4444',
  Production: '#F59E0B',
  Shipping: '#06B6D4',
  Warehouse: '#8B5CF6',
  Technology: '#F97316',
};

export function GlossaryTable({ terms }: GlossaryTableProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(terms.map(t => t.category))).sort()];

  const filtered = terms.filter(t => {
    const matchesSearch = !search ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.fullForm.toLowerCase().includes(search.toLowerCase()) ||
      t.meaning.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search terms, abbreviations, meanings..." />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: '5px 12px',
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                border: `1px solid ${categoryFilter === cat ? (CATEGORY_COLORS[cat] ?? '#22C55E') : '#2A2A35'}`,
                backgroundColor: categoryFilter === cat ? `${CATEGORY_COLORS[cat] ?? '#22C55E'}15` : 'transparent',
                color: categoryFilter === cat ? (CATEGORY_COLORS[cat] ?? '#22C55E') : '#9090A8',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 12, border: '1px solid #2A2A35', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Term', 'Full Form', 'Meaning', 'Category', 'Source'].map(h => (
                <th key={h} style={{ padding: '10px 14px', backgroundColor: '#111118', color: '#9090A8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid #2A2A35', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#5A5A70', fontSize: 13 }}>
                  No terms match your search.
                </td>
              </tr>
            ) : (
              filtered.map((term, i) => {
                const catColor = CATEGORY_COLORS[term.category] ?? '#9090A8';
                return (
                  <tr key={i}>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#F0F0F5' }}>{term.term}</span>
                    </td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, color: '#9090A8' }}>
                      {term.fullForm}
                    </td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 12.5, color: '#9090A8', lineHeight: 1.5, maxWidth: 320 }}>
                      {term.meaning}
                    </td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top' }}>
                      <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 9999, backgroundColor: `${catColor}12`, color: catColor, border: `1px solid ${catColor}25`, whiteSpace: 'nowrap' }}>
                        {term.category}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E1E2A', verticalAlign: 'top', fontSize: 11.5, color: '#5A5A70', whiteSpace: 'nowrap' }}>
                      {term.source}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div style={{ fontSize: 11, color: '#5A5A70' }}>
        {filtered.length} of {terms.length} terms shown
      </div>
    </div>
  );
}
