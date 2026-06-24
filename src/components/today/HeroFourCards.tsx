'use client';

import Link from 'next/link';
import { ChevronRight, BookOpen, NotebookPen, Music2, FileText } from 'lucide-react';

interface CardProgress {
  label: string;
  detail: string;
  href: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  tone: 'pink' | 'mint' | 'peach' | 'purple';
  progress?: number;
  progressText?: string;
  imageUrl?: string;
}

const TONE_BG: Record<CardProgress['tone'], string> = {
  pink: 'var(--color-pink-soft)',
  mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)',
  purple: 'var(--color-purple-soft)',
};
const TONE_FG: Record<CardProgress['tone'], string> = {
  pink: 'var(--color-pink-strong)',
  mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)',
  purple: 'var(--color-purple-strong)',
};

export interface HeroProgressData {
  vocab: { mastered: number; total: number; lastUnitTitle?: string; href: string };
  diary: { currentDay: number; total: number; sceneImageUrl?: string };
  phonetic: { completed: number; total: number };
  grammar: { completed: number; total: number };
}

function pct(n: number, d: number): number {
  if (d === 0) return 0;
  return Math.min(100, Math.round((n / d) * 100));
}

/**
 * 今日页 4 张大卡：日记（带图） · 词汇 · 字母 · 语法
 *
 * 手机：日记图片卡首位 + 3 张行卡
 * 桌面：日记图片卡跨两列 + 词汇/字母/语法 三栏
 */
export function HeroFourCards({ data, layout = 'mobile' }: { data: HeroProgressData; layout?: 'mobile' | 'desktop' }) {
  const diaryCard: CardProgress = {
    label: '兔莉的韩语日记',
    detail: data.diary.currentDay > 1 ? `继续 Day ${data.diary.currentDay} / 30` : '从 Day 1 开始',
    href: '/diary',
    Icon: NotebookPen,
    tone: 'pink',
    progress: pct(data.diary.currentDay - 1, data.diary.total),
    progressText: `Day ${data.diary.currentDay - 1}/${data.diary.total}`,
    imageUrl: data.diary.sceneImageUrl,
  };

  const vocabCard: CardProgress = {
    label: '词汇',
    detail: data.vocab.lastUnitTitle ? `继续：${data.vocab.lastUnitTitle}` : '从词库开始',
    href: data.vocab.href || '/vocabulary',
    Icon: BookOpen,
    tone: 'purple',
    progress: data.vocab.total > 0 ? pct(data.vocab.mastered, data.vocab.total) : 0,
    progressText: data.vocab.total > 0 ? `${data.vocab.mastered}/${data.vocab.total}` : '开始',
  };

  const phoneticCard: CardProgress = {
    label: '韩文字母',
    detail: data.phonetic.completed > 0 ? `已学 ${data.phonetic.completed} 步` : '从 40 音开始',
    href: '/phonetics',
    Icon: Music2,
    tone: 'mint',
    progress: pct(data.phonetic.completed, data.phonetic.total),
    progressText: data.phonetic.total > 0 ? `${data.phonetic.completed}/${data.phonetic.total}` : '开始',
  };

  const grammarCard: CardProgress = {
    label: '语法入门',
    detail: data.grammar.completed > 0 ? `已学 ${data.grammar.completed} 张语法卡` : '从 P1 第 1 张开始',
    href: '/grammar',
    Icon: FileText,
    tone: 'peach',
    progress: pct(data.grammar.completed, data.grammar.total),
    progressText: data.grammar.total > 0 ? `${data.grammar.completed}/${data.grammar.total}` : '开始',
  };

  if (layout === 'desktop') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 28 }}>
        {/* 日记跨两列 · 图在左 1/3，文字在右 */}
        <div style={{ gridColumn: '1 / -1' }}>
          <DiaryRowCard card={diaryCard} />
        </div>
        <RowCard card={vocabCard} />
        <RowCard card={phoneticCard} />
        <div style={{ gridColumn: '1 / -1' }}>
          <RowCard card={grammarCard} />
        </div>
      </div>
    );
  }

  // 手机
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
      <DiaryFeatureCard card={diaryCard} />
      <RowCard card={vocabCard} />
      <RowCard card={phoneticCard} />
      <RowCard card={grammarCard} />
    </div>
  );
}

/* ═══════════════════════════════════
   桌面 日记 Row Card：图在左 1/3，文字在右
   ═══════════════════════════════════ */
function DiaryRowCard({ card }: { card: CardProgress }) {
  const { label, detail, href, tone, progress, progressText, imageUrl } = card;
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: 'var(--color-surface-1)',
          border: '1px solid var(--color-border-1)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 1px 4px oklch(28% 0.02 30 / 0.04)',
          transition: 'box-shadow 180ms ease, transform 180ms ease',
          cursor: 'pointer',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 18px oklch(28% 0.02 30 / 0.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px oklch(28% 0.02 30 / 0.04)'; }}
      >
        {imageUrl && (
          <div style={{ aspectRatio: '16 / 9', overflow: 'hidden', background: 'var(--color-surface-3)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        )}
        <div style={{ padding: '40px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: TONE_FG[tone], letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>
            tori&apos;s diary · 王牌
          </p>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: 'var(--color-ink-1)', margin: '18px 0 18px', lineHeight: 1.3 }}>
            {label}
          </h2>
          <p style={{ fontSize: 19, color: 'var(--color-ink-3)', margin: '0 0 30px', lineHeight: 1.8 }}>
            {detail}
          </p>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-ink-3)' }}>{progressText}</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: TONE_FG[tone] }}>{progress ?? 0}%</span>
            </div>
            <div style={{ height: 7, borderRadius: 4, background: 'var(--color-surface-4)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  background: TONE_FG[tone],
                  width: `${Math.max(2, progress ?? 0)}%`,
                  transition: 'width 500ms ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════
   日记 Feature Card：图片 + 文字 + 进度
   ═══════════════════════════════════ */
function DiaryFeatureCard({ card }: { card: CardProgress }) {
  const { label, detail, href, tone, progress, progressText, imageUrl } = card;
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: 'var(--color-surface-1)',
          border: '1px solid var(--color-border-1)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 1px 4px oklch(28% 0.02 30 / 0.04)',
          transition: 'box-shadow 180ms ease, transform 180ms ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 18px oklch(28% 0.02 30 / 0.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px oklch(28% 0.02 30 / 0.04)'; }}
      >
        {imageUrl && (
          <div style={{ width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', background: 'var(--color-surface-3)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        )}
        <div style={{ padding: '18px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: TONE_FG[tone], letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                tori&apos;s diary · 王牌
              </p>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-ink-1)', margin: '4px 0 4px', lineHeight: 1.2 }}>
                {label}
              </h2>
              <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: 0 }}>
                {detail}
              </p>
            </div>
            <ChevronRight size={18} color="var(--color-ink-4)" style={{ flexShrink: 0 }} />
          </div>
          {progress !== undefined && (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-ink-3)' }}>{progressText}</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: TONE_FG[tone] }}>{progress}%</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: 'var(--color-surface-4)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    background: TONE_FG[tone],
                    width: `${Math.max(2, progress)}%`,
                    transition: 'width 500ms ease',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════
   行卡：图标 + 文字 + 进度
   ═══════════════════════════════════ */
function RowCard({ card }: { card: CardProgress }) {
  const { Icon, label, detail, href, tone, progress, progressText } = card;
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: 'var(--color-surface-1)',
          border: '1px solid var(--color-border-1)',
          borderRadius: 14,
          padding: '16px 18px',
          boxShadow: '0 1px 3px oklch(28% 0.02 30 / 0.03)',
          transition: 'box-shadow 180ms ease, transform 180ms ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px oklch(28% 0.02 30 / 0.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px oklch(28% 0.02 30 / 0.03)'; }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: 12,
              background: TONE_BG[tone], color: TONE_FG[tone],
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
            aria-hidden
          >
            <Icon size={20} strokeWidth={1.75} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0, lineHeight: 1.3 }}>
              {label}
            </p>
            <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {detail}
            </p>
          </div>
          <ChevronRight size={16} color="var(--color-ink-4)" style={{ flexShrink: 0 }} />
        </div>
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: 'var(--color-ink-3)' }}>{progressText}</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: TONE_FG[tone] }}>{progress ?? 0}%</span>
          </div>
          <div style={{ height: 3, borderRadius: 2, background: 'var(--color-surface-4)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                background: TONE_FG[tone],
                width: `${Math.max(2, progress ?? 0)}%`,
                transition: 'width 500ms ease',
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
