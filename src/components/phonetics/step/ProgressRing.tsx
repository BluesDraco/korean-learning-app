'use client';
import React from 'react';

interface Props {
  [k: string]: unknown;
  value: number;      // 0~100
  size?: number;
  stroke?: number;
  label?: string;
  bottomLabel?: string;
}

export default function ProgressRing({ value, size = 120, stroke = 8, label, bottomLabel }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (c * Math.max(0, Math.min(100, value))) / 100;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-pink-base)" />
            <stop offset="100%" stopColor="var(--color-peach-base)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border-1)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset .8s cubic-bezier(.16,1,.3,1)' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        {label && <span style={{ fontFamily: 'serif', fontWeight: 800, fontSize: 32, color: 'var(--color-ink-1)', lineHeight: 1 }}>{label}</span>}
        {bottomLabel && <span style={{ fontSize: 11, color: 'var(--color-ink-3)', marginTop: 4, letterSpacing: '.1em' }}>{bottomLabel}</span>}
      </div>
    </div>
  );
}
