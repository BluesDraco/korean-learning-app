'use client';

import type { ReactNode } from 'react';

export type TagPreset = 'level' | 'category' | 'feature' | 'status' | 'count';
export type TagTone = 'pink' | 'purple' | 'mint' | 'peach' | 'gold' | 'neutral';

export interface TagProps {
  [k: string]: unknown;
  preset?: TagPreset;
  tone?: TagTone;
  children: ReactNode;
  className?: string;
  /** 圆角 999 胶囊 / 软方角 6px */
  shape?: 'pill' | 'rounded';
  /** 视觉强度：solid 实底 / soft 浅染（默认）/ outline 描边 */
  variant?: 'solid' | 'soft' | 'outline';
}

const TONE_BG: Record<TagTone, string> = {
  pink: 'var(--color-pink-soft)',
  purple: 'var(--color-purple-soft)',
  mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)',
  gold: 'var(--color-gold-soft)',
  neutral: 'var(--color-surface-3)',
};

const TONE_FG: Record<TagTone, string> = {
  pink: 'var(--color-pink-strong)',
  purple: 'var(--color-purple-strong)',
  mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)',
  gold: 'var(--color-gold-strong)',
  neutral: 'var(--color-ink-2)',
};

const TONE_SOLID_BG: Record<TagTone, string> = {
  pink: 'var(--color-pink-base)',
  purple: 'var(--color-purple-base)',
  mint: 'var(--color-mint-base)',
  peach: 'var(--color-peach-base)',
  gold: 'var(--color-gold-base)',
  neutral: 'var(--color-ink-2)',
};

/**
 * Tag — 标签组件
 *
 * preset 仅用于语义自动选 tone（level→pink/purple/mint, status→gold/mint/neutral 等）。
 * 自定义场景直接传 tone 即可。
 *
 * 不支持 removable —— 学习场景的 tag 是只读语义。
 */
export function Tag({
  preset,
  tone: toneProp,
  children,
  className = '',
  shape = 'pill',
  variant = 'soft',
}: TagProps) {
  const tone: TagTone = toneProp ?? presetToTone(preset);

  const bg =
    variant === 'solid'
      ? TONE_SOLID_BG[tone]
      : variant === 'outline'
        ? 'transparent'
        : TONE_BG[tone];
  const fg = variant === 'solid' ? '#fff' : TONE_FG[tone];
  const border = variant === 'outline' ? `1.5px solid ${TONE_FG[tone]}` : '1.5px solid transparent';

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '4px 10px',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-weight-semibold)',
        letterSpacing: 'var(--tracking-snug)',
        lineHeight: 1.2,
        color: fg,
        background: bg,
        border,
        borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-sm)',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

function presetToTone(preset: TagPreset | undefined): TagTone {
  switch (preset) {
    case 'level':
      return 'mint';
    case 'category':
      return 'pink';
    case 'feature':
      return 'purple';
    case 'status':
      return 'gold';
    case 'count':
      return 'neutral';
    default:
      return 'neutral';
  }
}
