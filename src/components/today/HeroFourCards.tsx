'use client';

import Link from 'next/link';
import { ChevronRight, BookOpen, NotebookPen, Music2, FileText } from 'lucide-react';

interface CardProgress {
  label: string;
  detail: string;
  href: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  tone: 'pink' | 'mint' | 'peach' | 'purple';
  /** 0-100；undefined = 显示开始 */
  progress?: number;
  /** 进度文案，例如 "12/30" 或 "4/40 음" */
  progressText?: string;
}

const TONE_BG: Record<CardProgress['tone'], string> = {
  pink: 'var(--color-pink-soft)', mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)', purple: 'var(--color-purple-soft)',
};
const TONE_FG: Record<CardProgress['tone'], string> = {
  pink: 'var(--color-pink-strong)', mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)', purple: 'var(--color-purple-strong)',
};

export interface HeroProgressData {
  vocab: { mastered: number; total: number; lastUnitTitle?: string; href: string };
  diary: { currentDay: number; total: number };
  phonetic: { completed: number; total: number };
  grammar: { completed: number; total: number };
}

function pct(n: number, d: number): number {
  if (d === 0) return 0;
  return Math.min(100, Math.round((n / d) * 100));
}

/**
 * 今日页 4 张大卡：词汇 / 日记 / 字母 / 语法
 *
 * - 手机端：1 列纵排
 * - 桌面端：1 + 3 不对称网格（日记占大格，其他三张右侧纵列）
 */
export function HeroFourCards({ data, layout = 'mobile' }: { data: HeroProgressData; layout?: 'mobile' | 'desktop' }) {
  const cards: CardProgress[] = [
    {
      label: '词汇',
      detail: data.vocab.lastUnitTitle ? `继续：${data.vocab.lastUnitTitle}` : '从词库开始',
      href: data.vocab.href || '/vocabulary',
      Icon: BookOpen,
      tone: 'purple',
      progress: data.vocab.total > 0 ? pct(data.vocab.mastered, data.vocab.total) : undefined,
      progressText: data.vocab.total > 0 ? `${data.vocab.mastered}/${data.vocab.total}` : undefined,
    },
    {
      label: '兔莉的韩语日记',
      detail: data.diary.currentDay > 1 ? `继续 Day ${data.diary.currentDay} / 30` : '从 Day 1 开始',
      href: '/diary',
      Icon: NotebookPen,
      tone: 'pink',
      progress: pct(data.diary.currentDay - 1, data.diary.total),
      progressText: `${data.diary.currentDay - 1}/${data.diary.total}`,
    },
    {
      label: '韩文字母',
      detail: data.phonetic.completed > 0 ? `已学 ${data.phonetic.completed} 步` : '从 40 音开始',
      href: '/phonetics',
      Icon: Music2,
      tone: 'mint',
      progress: pct(data.phonetic.completed, data.phonetic.total),
      progressText: data.phonetic.total > 0 ? `${data.phonetic.completed}/${data.phonetic.total}` : undefined,
    },
    {
      label: '语法入门',
      detail: data.grammar.completed > 0 ? `已学 ${data.grammar.completed} 张语法卡` : '从 P1 第 1 张开始',
      href: '/grammar',
      Icon: FileText,
      tone: 'peach',
      progress: pct(data.grammar.completed, data.grammar.total),
      progressText: data.grammar.total > 0 ? `${data.grammar.completed}/${data.grammar.total}` : undefined,
    },
  ];

  if (layout === 'desktop') {
    // 桌面 1 + 3 不对称网格
    const [card1, ...rest] = cards; // card1 = 词汇 (放右侧), 但日记应居首位
    const diaryCard = cards[1];
    const sideCards = [cards[0], cards[2], cards[3]];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 24 }}>
        <BigHeroCard card={diaryCard} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sideCards.map((c) => <SmallRowCard key={c.href} card={c} />)}
        </div>
      </div>
    );
  }

  // 手机 1 列
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
      {cards.map((c) => <SmallRowCard key={c.href} card={c} />)}
    </div>
  );
}

function BigHeroCard({ card }: { card: CardProgress }) {
  const { Icon, label, detail, href, tone, progress, progressText } = card;
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          height: '100%',
          minHeight: 280,
          padding: '32px 28px',
          borderRadius: 'var(--radius-lg)',
          background: `linear-gradient(135deg, ${TONE_BG[tone]} 0%, var(--color-surface-1) 100%)`,
          border: '1.5px solid var(--color-border-1)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'pointer',
          transition: 'transform var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.5), var(--shadow-pink-glow, var(--shadow-md))`; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.5), var(--shadow-sm)`; }}
      >
        <div>
          <div
            style={{
              width: 56, height: 56, borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.5)', color: TONE_FG[tone],
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 18,
            }}
          >
            <Icon size={26} strokeWidth={1.75} />
          </div>
          <p style={{ fontSize: 11, fontWeight: 800, color: TONE_FG[tone], letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
            FEATURED
          </p>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-ink-1)', margin: '6px 0 8px', lineHeight: 1.2 }}>
            {label}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--color-ink-3)', lineHeight: 1.6, margin: 0 }}>
            {detail}
          </p>
        </div>
        <div style={{ marginTop: 24 }}>
          {progress !== undefined && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-ink-3)' }}>{progressText}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: TONE_FG[tone] }}>{progress}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.6)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${TONE_FG[tone]}, var(--color-pink-base))`,
                    width: `${progress}%`,
                    transition: 'width var(--dur-slow) var(--ease-soft)',
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

function SmallRowCard({ card }: { card: CardProgress }) {
  const { Icon, label, detail, href, tone, progress, progressText } = card;
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          padding: '18px 18px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-surface-1)',
          border: '1.5px solid var(--color-border-1)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), var(--shadow-sm)',
          cursor: 'pointer',
          transition: 'transform var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.5), var(--shadow-pink-glow, var(--shadow-md))`; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.5), var(--shadow-sm)`; }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 48, height: 48, borderRadius: 'var(--radius-md)',
              background: TONE_BG[tone], color: TONE_FG[tone],
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
            aria-hidden
          >
            <Icon size={22} strokeWidth={1.75} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
              {label}
            </p>
            <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '3px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {detail}
            </p>
          </div>
          <ChevronRight size={18} color="var(--color-ink-4)" />
        </div>
        {progress !== undefined && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: 'var(--color-ink-3)' }}>{progressText}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: TONE_FG[tone] }}>{progress}%</span>
            </div>
            <div style={{ height: 5, borderRadius: 'var(--radius-pill)', background: 'var(--color-surface-4)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${TONE_FG[tone]}, var(--color-pink-base))`,
                  width: `${progress}%`,
                  transition: 'width var(--dur-slow) var(--ease-soft)',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
