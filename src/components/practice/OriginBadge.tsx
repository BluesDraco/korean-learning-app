'use client';

/**
 * 题源徽章 · 显示题目来自:错题 / 我保存的 / 阅读 / AI / 系统
 * 单一 UI 组件,4 个模式共用
 */

import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export type OriginKind = 'mistake' | 'my-sentence' | 'my-word' | 'reading' | 'ai-chat' | 'diary' | 'system';

interface OriginBadgeProps {
  origin?: OriginKind;
  label?: string; // 具体来源描述,如 "已错 3 次" / "咖啡厅主题包"
  /** 定位模式 · absolute=覆盖在卡右上;inline=行内显示 */
  variant?: 'absolute' | 'inline';
  /** system 默认隐藏(避免用户觉得吵),需要显示传 true */
  showSystem?: boolean;
}

const META: Record<OriginKind, { emoji: string; label: string; softVar: string; strongVar: string }> = {
  mistake:       { emoji: '🧠', label: 'prac.origin_mistake',     softVar: 'var(--hr-pink-soft)',   strongVar: 'var(--hr-pink-strong)' },
  'my-sentence': { emoji: '📌', label: 'prac.origin_my_sentence', softVar: 'var(--hr-purple-soft)', strongVar: 'var(--hr-purple-strong)' },
  'my-word':     { emoji: '📖', label: 'prac.origin_my_word',     softVar: 'var(--hr-peach-soft)',  strongVar: 'var(--hr-peach-strong)' },
  reading:       { emoji: '📚', label: 'prac.origin_reading',     softVar: 'var(--hr-mint-soft)',   strongVar: 'var(--hr-mint-strong)' },
  'ai-chat':     { emoji: '💬', label: 'prac.origin_ai_chat',     softVar: 'var(--hr-purple-soft)', strongVar: 'var(--hr-purple-strong)' },
  diary:         { emoji: '📔', label: 'prac.origin_diary',       softVar: 'var(--hr-peach-soft)',  strongVar: 'var(--hr-peach-strong)' },
  system:        { emoji: '🎯', label: 'prac.origin_system',      softVar: 'var(--hr-surface-3)',   strongVar: 'var(--hr-ink-3)' },
};

export function OriginBadge({ origin, label, variant = 'absolute', showSystem = false }: OriginBadgeProps) {
  const { lang } = useLang();
  if (!origin) return null;
  if (origin === 'system' && !showSystem) return null;

  const meta = META[origin];
  const metaLabel = t(meta.label, lang);
  const title = label ? `${metaLabel} · ${label}` : metaLabel;

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '3px 8px',
    borderRadius: 99,
    background: meta.softVar,
    // border 用 currentColor 避免 hex 拼接的暗色崩溃
    border: '1px solid currentColor',
    fontFamily: 'var(--hr-mono)',
    fontSize: 9.5,
    color: meta.strongVar,
    fontWeight: 700,
    letterSpacing: '.08em',
    whiteSpace: 'nowrap',
    // 徽章是装饰性的,不吸收点击(避免遮挡下方元素点击/tap)
    pointerEvents: 'none',
    userSelect: 'none',
  };

  const positioned: React.CSSProperties = variant === 'absolute'
    ? { position: 'absolute', top: 10, right: 10, zIndex: 2 }
    : {};

  return (
    <div
      role="note"
      aria-label={title}
      title={title}
      style={{ ...baseStyle, ...positioned }}
    >
      <span aria-hidden style={{ fontSize: 11 }}>{meta.emoji}</span>
      <span>{metaLabel}</span>
    </div>
  );
}
