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
  /** 16:9 章节图（日记卡专用） */
  imageUrl?: string;
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
  diary: { currentDay: number; total: number; sceneImageUrl?: string };
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
  // 手机：日记首位 + 16:9 图
  // 桌面：日记占大格

  const diaryCard: CardProgress = {
    label: '兔莉的韩语日记',
    detail: data.diary.currentDay > 1 ? `继续 Day ${data.diary.currentDay} / 30` : '从 Day 1 开始',
    href: '/diary',
    Icon: NotebookPen,
    tone: 'pink',
    progress: pct(data.diary.currentDay - 1, data.diary.total),
    progressText: `${data.diary.currentDay - 1}/${data.diary.total}`,
    imageUrl: data.diary.sceneImageUrl,
  };

  const vocabCard: CardProgress = {
    label: '词汇',
    detail: data.vocab.lastUnitTitle ? `继续：${data.vocab.lastUnitTitle}` : '从词库开始',
    href: data.vocab.href || '/vocabulary',
    Icon: BookOpen,
    tone: 'purple',
    progress: data.vocab.total > 0 ? pct(data.vocab.mastered, data.vocab.total) : undefined,
    progressText: data.vocab.total > 0 ? `${data.vocab.mastered}/${data.vocab.total}` : undefined,
  };

  const phoneticCard: CardProgress = {
    label: '韩文字母',
    detail: data.phonetic.completed > 0 ? `已学 ${data.phonetic.completed} 步` : '从 40 音开始',
    href: '/phonetics',
    Icon: Music2,
    tone: 'mint',
    progress: pct(data.phonetic.completed, data.phonetic.total),
    progressText: data.phonetic.total > 0 ? `${data.phonetic.completed}/${data.phonetic.total}` : undefined,
  };

  const grammarCard: CardProgress = {
    label: '语法入门',
    detail: data.grammar.completed > 0 ? `已学 ${data.grammar.completed} 张语法卡` : '从 P1 第 1 张开始',
    href: '/grammar',
    Icon: FileText,
    tone: 'peach',
    progress: pct(data.grammar.completed, data.grammar.total),
    progressText: data.grammar.total > 0 ? `${data.grammar.completed}/${data.grammar.total}` : undefined,
  };

  if (layout === 'desktop') {
    // 桌面 1 + 3 不对称网格：日记占大格、词汇/字母/语法纵列
    const sideCards = [vocabCard, phoneticCard, grammarCard];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 18, marginBottom: 28 }}>
        <BigHeroCard card={diaryCard} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {sideCards.map((c) => <SmallRowCard key={c.href} card={c} />)}
        </div>
      </div>
    );
  }

  // 手机 1 列：日记首位
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
      {[diaryCard, vocabCard, phoneticCard, grammarCard].map((c) => <SmallRowCard key={c.href} card={c} />)}
    </div>
  );
}

function BigHeroCard({ card }: { card: CardProgress }) {
  const { Icon, label, detail, href, tone, progress, progressText, imageUrl } = card;
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          height: '100%',
          minHeight: 300,
          borderRadius: 20,
          background: `linear-gradient(145deg, ${TONE_BG[tone]} 0%, var(--color-surface-1) 60%)`,
          border: '1px solid var(--color-border-1)',
          boxShadow: '0 2px 16px oklch(28% 0.02 30 / 0.06)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 180ms var(--ease-soft), box-shadow 180ms var(--ease-soft)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px oklch(28% 0.02 30 / 0.14)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px oklch(28% 0.02 30 / 0.06)'; }}
      >
        {imageUrl && (
          <div style={{ padding: '12px 12px 0', flexShrink: 0 }}>
            <div style={{ width: '100%', aspectRatio: '16 / 9', maxHeight: 200, overflow: 'hidden', borderRadius: 12, background: 'var(--color-surface-3)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        )}
        <div style={{ flex: 1, padding: imageUrl ? '14px 28px 22px' : '28px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div
              style={{
                width: 52, height: 52, borderRadius: 14,
                background: 'rgba(255,255,255,0.6)', color: TONE_FG[tone],
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <Icon size={24} strokeWidth={1.6} />
            </div>
            <p style={{ fontSize: 12, fontWeight: 700, color: TONE_FG[tone], letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
              FEATURED
            </p>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-ink-1)', margin: '6px 0 8px', lineHeight: 1.15 }}>
              {label}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--color-ink-3)', lineHeight: 1.6, margin: 0 }}>
              {detail}
            </p>
          </div>
          <div style={{ marginTop: 24 }}>
            {progress !== undefined && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, alignItems: 'baseline' }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-ink-3)' }}>{progressText}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: TONE_FG[tone] }}>{progress}%</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.5)', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%', borderRadius: 2,
                      background: TONE_FG[tone],
                      width: `${Math.min(100, progress)}%`,
                      transition: 'width 500ms var(--ease-soft)',
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function SmallRowCard({ card }: { card: CardProgress }) {
  const { Icon, label, detail, href, tone, progress, progressText, imageUrl } = card;
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          borderRadius: 20,
          background: 'var(--color-surface-1)',
          border: '1px solid var(--color-border-1)',
          boxShadow: '0 2px 12px oklch(28% 0.02 30 / 0.04)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 180ms var(--ease-soft), box-shadow 180ms var(--ease-soft)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px oklch(28% 0.02 30 / 0.10)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px oklch(28% 0.02 30 / 0.04)'; }}
      >
        {imageUrl && (
          <div style={{ padding: '10px 10px 0' }}>
            <div style={{ width: '100%', aspectRatio: '16 / 9', maxHeight: 180, overflow: 'hidden', borderRadius: 12, background: 'var(--color-surface-3)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt=""
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          </div>
        )}
        <div style={{ padding: imageUrl ? '16px 20px' : '20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            {/* 左侧色块 */}
            <div
              style={{
                width: 46, height: 46, borderRadius: 14,
                background: TONE_BG[tone], color: TONE_FG[tone],
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                marginTop: 1,
              }}
              aria-hidden
            >
              <Icon size={22} strokeWidth={1.6} />
            </div>
            {/* 中间文字 */}
            <div style={{ flex: 1, minWidth: 0, paddingTop: 3 }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0, lineHeight: 1.25 }}>
                {label}
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '5px 0 0', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {detail}
              </p>
            </div>
            {/* 右箭头 */}
            <ChevronRight size={16} color="var(--color-ink-4)" style={{ marginTop: 4, flexShrink: 0 }} />
          </div>
          {/* 进度条 */}
          {progress !== undefined && (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-ink-3)' }}>{progressText}</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: TONE_FG[tone] }}>{progress}%</span>
              </div>
              <div style={{ height: 3, borderRadius: 2, background: 'var(--color-surface-4)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%', borderRadius: 2,
                    background: TONE_FG[tone],
                    width: `${Math.min(100, progress)}%`,
                    transition: 'width 500ms var(--ease-soft)',
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
