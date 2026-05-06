'use client';

import { motion } from 'framer-motion';
import { ArchitectureLayer } from '@/lib/data';

interface ArchitectureDiagramProps {
  layers: ArchitectureLayer[];
}

export function ArchitectureDiagram({ layers }: ArchitectureDiagramProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {layers.map((layer, i) => (
        <motion.div
          key={layer.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 0,
            borderRadius: 10,
            overflow: 'hidden',
            border: `1px solid ${layer.color}25`,
          }}
        >
          {/* Layer label */}
          <div
            style={{
              width: 140,
              flexShrink: 0,
              backgroundColor: `${layer.color}10`,
              borderRight: `1px solid ${layer.color}25`,
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: layer.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
              {layer.label}
            </div>
            <div style={{ fontSize: 10.5, color: '#5A5A70' }}>
              {layer.sublabel}
            </div>
          </div>

          {/* Items */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#111118',
              padding: '10px 14px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              alignItems: 'center',
            }}
          >
            {layer.items.map((item, j) => (
              <div
                key={j}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '5px 10px',
                  backgroundColor: '#1A1A24',
                  border: `1px solid #2A2A35`,
                  borderRadius: 7,
                  minWidth: 90,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: '#F0F0F5' }}>{item.name}</span>
                {item.tech && (
                  <span style={{ fontSize: 10, color: '#5A5A70', marginTop: 1 }}>{item.tech}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
