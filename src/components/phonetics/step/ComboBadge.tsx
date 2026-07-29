'use client';
import React from 'react';

export default function ComboBadge({ combo }: { combo: number }) {
  if (combo < 2) return null;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontFamily: 'ui-monospace, monospace',
        fontSize: 12, fontWeight: 700,
        color: 'var(--color-status-danger)',
        background: 'var(--color-peach-soft)',
        padding: '6px 12px',
        borderRadius: 999,
        whiteSpace: 'nowrap',
      }}
      key={combo}
    >
      <span style={{ fontSize: 14 }}>🔥</span> COMBO {combo}
    </span>
  );
}
