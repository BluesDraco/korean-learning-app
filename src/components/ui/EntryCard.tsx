'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Card } from './Card';

type EntryTone = 'pink' | 'mint' | 'peach' | 'purple' | 'gold';
type EntryLayout = 'row' | 'block' | 'compact';

const TONE_BG: Record<EntryTone, string> = {
  pink: 'var(--color-pink-soft)',
  mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)',
  purple: 'var(--color-purple-soft)',
  gold:  '#fdf4e3',
};

const TONE_FG: Record<EntryTone, string> = {
  pink: 'var(--color-pink-strong)',
  mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)',
  purple: 'var(--color-purple-strong)',
  gold:  '#9b7a3e',
};

export interface EntryCardProps {
  label: string;
  detail?: string;
  href?: string;
  onClick?: () => void;
  /** 图标组件（lucide）或自定义节点 */
  icon: ReactNode;
  tone?: EntryTone;
  /** row：图标在左 + 标题+详情 + 右侧 pill；block：图标在上方 + 文字下方；compact：居中图标 + 居中小字 */
  layout?: EntryLayout;
  /** 进度（0-100）。row 模式显示在底部；block 模式不显示 */
  progress?: number;
  /** 右侧 pill 文字（仅 row 模式） */
  cta?: string;
  /** 是否禁用（灰态） */
  disabled?: boolean;
  /** 进度条 tone（默认跟 tone） */
  progressTone?: EntryTone;
}

/**
 * EntryCard — 落地页入口卡（5 个 TabBar 页通用）
 * 替代 /daily 和 /learning 重复的 inline 卡片
 */
export function EntryCard({
  label,
  detail,
  href,
  onClick,
  icon,
  tone = 'pink',
  layout = 'row',
  progress,
  cta,
  disabled = false,
  progressTone,
}: EntryCardProps) {
  const inner = renderInner({ label, detail, icon, tone, layout, progress, cta, progressTone });

  if (disabled) {
    return (
      <Card variant="outlined" padding={layout === 'compact' ? 'sm' : 'md'}
        style={{ opacity: 0.55, cursor: 'not-allowed' }}>
        {inner}
      </Card>
    );
  }

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} onClick={onClick}>
        <Card variant="default" padding={layout === 'compact' ? 'sm' : 'md'} interactive>
          {inner}
        </Card>
      </Link>
    );
  }

  return (
    <Card variant="default" padding={layout === 'compact' ? 'sm' : 'md'} interactive
      onClick={onClick} as={onClick ? 'button' : 'div'}>
      {inner}
    </Card>
  );
}

function renderInner({
  label, detail, icon, tone, layout, progress, cta, progressTone,
}: Omit<EntryCardProps, 'href' | 'onClick' | 'disabled'> & { tone: EntryTone; layout: EntryLayout }) {
  const iconBox = (size: number) => (
    <div
      style={{
        width: size, height: size,
        borderRadius: 'var(--radius-md)',
        background: TONE_BG[tone],
        color: TONE_FG[tone],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
      aria-hidden
    >
      {icon}
    </div>
  );

  if (layout === 'compact') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        {iconBox(36)}
        <p style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-ink-1)',
          margin: 0, textAlign: 'center',
        }}>{label}</p>
      </div>
    );
  }

  if (layout === 'block') {
    return (
      <div>
        <div style={{ marginBottom: 10 }}>{iconBox(36)}</div>
        <p style={{
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-ink-1)',
          margin: 0,
          letterSpacing: 'var(--tracking-snug)',
        }}>{label}</p>
        {detail && (
          <p style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-ink-3)',
            margin: '4px 0 0',
            lineHeight: 'var(--leading-snug)',
          }}>{detail}</p>
        )}
      </div>
    );
  }

  // row
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
      {iconBox(40)}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-ink-1)',
          margin: 0,
          letterSpacing: 'var(--tracking-snug)',
        }}>{label}</p>
        {detail && (
          <p style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-ink-3)',
            margin: '2px 0 0',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{detail}</p>
        )}
        {progress !== undefined && (
          <div style={{
            marginTop: 8, height: 4, width: '100%',
            background: 'var(--color-surface-3)',
            borderRadius: 'var(--radius-pill)', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${Math.max(0, Math.min(100, progress))}%`,
              background: TONE_BG[progressTone ?? tone],
              borderRadius: 'var(--radius-pill)',
              transition: 'width var(--dur-base) var(--ease-out-quart)',
            }} />
          </div>
        )}
      </div>
      {cta && (
        <span style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--font-weight-semibold)',
          color: TONE_FG[tone],
          background: TONE_BG[tone],
          padding: '6px 12px',
          borderRadius: 'var(--radius-pill)',
          flexShrink: 0,
          letterSpacing: 'var(--tracking-snug)',
        }}>{cta}</span>
      )}
    </div>
  );
}
