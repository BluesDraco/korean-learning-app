'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Library, RefreshCw, BookOpen, Bookmark } from 'lucide-react';
import { PageHeader, Section, Card, Button } from '@/components/ui';

const QUICK_LINKS = [
  { Icon: Library,    label: '韩语词库',    desc: '主题词包 · 分级词表 · 延世教材 · 情景词典', href: '/vocabulary/library',           tone: 'pink'   as const },
  { Icon: RefreshCw,  label: '闪卡复习',    desc: 'SRS 间隔复习，巩固已学单词',                href: '/review',                       tone: 'mint'   as const },
  { Icon: BookOpen,   label: '我的单词本',  desc: '按主题分组管理单词',                        href: '/vocabulary/books',             tone: 'purple' as const },
  { Icon: Bookmark,   label: '我的句子',    desc: '保存的句子 · 语法拆解 · 打字练习',          href: '/vocabulary?tab=sentences',     tone: 'peach'  as const },
];

const TONE_BG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-soft)', mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)', purple: 'var(--color-purple-soft)',
};
const TONE_FG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-strong)', mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)', purple: 'var(--color-purple-strong)',
};

interface Stats {
  total: number;
  mastered: number;
  learning: number;
  dueReview: number;
}

export function DesktopVocabularyPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({ total: 0, mastered: 0, learning: 0, dueReview: 0 });

  useEffect(() => {
    (async () => {
      try {
        const { db } = await import('@/lib/db');
        const now = Date.now();
        const [total, mastered, learning, dueWords] = await Promise.all([
          db.words.count(),
          db.words.where('mastery').equals('mastered').count(),
          db.words.where('mastery').anyOf('learning', 'reviewing').count(),
          db.words.where('nextReview').belowOrEqual(now).toArray(),
        ]);
        const dueReview = dueWords.filter((w: { mastery?: string }) => w.mastery !== 'mastered').length;
        setStats({ total, mastered, learning, dueReview });
      } catch { /* ignore */ }
    })();
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="단어 · VOCABULARY"
        title="我的单词与词库"
        subtitle="保存单词、闪卡复习、整理单词本，把遇到的韩语词汇变成长期记忆。"
        tone="pink"
      />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { value: stats.total,     label: '已保存单词', tone: 'neutral' as const },
          { value: stats.mastered,  label: '已掌握',     tone: 'mint' as const },
          { value: stats.learning,  label: '学习中',     tone: 'peach' as const },
          { value: stats.dueReview, label: stats.dueReview > 0 ? '待复习 →' : '待复习', tone: 'pink' as const, action: stats.dueReview > 0 ? () => router.push('/review') : undefined },
        ].map((s) => {
          const isInteractive = !!s.action;
          const accent = s.tone === 'neutral' ? 'var(--color-ink-1)' : TONE_FG[s.tone];
          return (
            <Card
              key={s.label}
              variant="stat"
              padding="md"
              {...(isInteractive ? { as: 'button', onClick: s.action, interactive: true } : {})}
            >
              <p style={{ fontSize: 30, fontWeight: 800, color: accent, margin: 0, lineHeight: 1 }}>
                {s.value || '—'}
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '6px 0 0' }}>{s.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Quick links */}
      <Section title="全部功能" spacing="normal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {QUICK_LINKS.map(({ Icon, label, desc, href, tone }) => (
            <Card key={href} as="button" onClick={() => router.push(href)} variant="default" padding="md" interactive>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                    {label}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '4px 0 0', lineHeight: 1.5 }}>
                    {desc}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Due review CTA */}
      {stats.dueReview > 0 && (
        <Card variant="hero" tone="pink" padding="lg" style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                有 {stats.dueReview} 个单词等待复习
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>
                趁记忆还热，现在复习效果最好。
              </p>
            </div>
            <Button variant="primary" tone="pink" onClick={() => router.push('/review')}>
              开始复习
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
