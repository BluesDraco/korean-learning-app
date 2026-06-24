'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Sparkles, PenLine, Mic, Trophy, MessageSquare, ChevronRight } from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { PageHeader, Section, Card } from '@/components/ui';
import { HeroFourCards, type HeroProgressData } from '@/components/today/HeroFourCards';
import { TodayPickSheet } from '@/components/today/TodayPickSheet';
import { getVocabProgress, getDiaryProgress, getPhoneticProgress, getGrammarProgress } from '@/lib/progress/dailyHero';
import { buildDailyPlanFromApi, type DailyPlan } from '@/lib/daily/buildDailyPlan';

const TONE_BG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-soft)', mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)', purple: 'var(--color-purple-soft)',
};
const TONE_FG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-strong)', mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)', purple: 'var(--color-purple-strong)',
};

const MINE = [
  { Icon: PenLine,        label: '我的错题', desc: '默写答错的词，集中复习薄弱项。',  href: '/mine/dictation-mistakes', tone: 'pink' as const },
  { Icon: Mic,            label: '我的录音', desc: '发音练习的录音记录，回听对比。',  href: '/mine/recordings',         tone: 'pink' as const },
  { Icon: Trophy,         label: '我的成就', desc: '学习里程碑与成就徽章。',          href: '/achievement/card',        tone: 'peach' as const },
  { Icon: MessageSquare,  label: '消息',     desc: '系统消息与通知。',                href: '/messages',                tone: 'mint' as const },
];

export function DesktopDailyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [stats, setStats] = useState({ words: 0, sentences: 0, articlesRead: 0 });
  const [heroData, setHeroData] = useState<HeroProgressData | null>(null);
  const [pickOpen, setPickOpen] = useState(false);
  const [plan, setPlan] = useState<DailyPlan | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const words = await db.words.count();
        const sentences = 0;
        const readRows = await db.readingProgress.toArray();
        const articlesRead = readRows.filter((r: { completedAt?: number }) => r.completedAt).length;
        setStats({ words, sentences, articlesRead });
      } catch { /* ignore */ }
    })();
    buildDailyPlanFromApi().then(setPlan).catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const [vocab, diary, phonetic, grammar] = await Promise.all([
        getVocabProgress(),
        getDiaryProgress(user.id),
        getPhoneticProgress(),
        getGrammarProgress(),
      ]);
      if (cancelled) return;
      const vocabHref = vocab.source && vocab.unitId
        ? `/vocabulary/${vocab.source}/${vocab.unitId}`
        : '/vocabulary';
      setHeroData({
        vocab: { mastered: vocab.mastered, total: vocab.total, lastUnitTitle: vocab.unitTitle, href: vocabHref },
        diary: { currentDay: diary.currentDay, total: diary.total },
        phonetic: { completed: phonetic.completed, total: phonetic.total },
        grammar: { completed: grammar.completed, total: grammar.total },
      });
    })();
    return () => { cancelled = true; };
  }, [user]);

  const displayName = user?.nickname ?? '同学';

  return (
    <div>
      {/* Hero with Tori illustration */}
      <header
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'stretch',
          background: 'linear-gradient(135deg, var(--color-pink-soft), var(--hero-grad-end-pink))',
          border: '1px solid var(--color-border-1)',
          borderRadius: 'var(--radius-xl)',
          padding: 0,
          marginBottom: 24,
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 1, padding: '32px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-pink-strong)', letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
            토리의 한국어 일기 · TORI&apos;S DIARY
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-ink-1)', margin: '10px 0 8px', lineHeight: 1.15 }}>
            你好，{displayName}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--color-ink-3)', margin: 0, lineHeight: 1.6 }}>
            绘本、韩剧表达、韩娱热点 ── 都可以变成你的学习材料。
          </p>
        </div>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-end' }}>
          <Image
            src="/images/tori-hero-daily-desktop.png"
            alt=""
            width={320}
            height={320}
            priority
            unoptimized
            style={{ display: 'block', height: 280, width: 'auto', objectFit: 'contain', objectPosition: 'bottom right' }}
          />
        </div>
      </header>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { value: stats.words,        label: '已保存单词' },
          { value: stats.sentences,    label: '已保存句子' },
          { value: stats.articlesRead, label: '热点阅读' },
        ].map((s) => (
          <Card key={s.label} variant="stat" padding="md">
            <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0, lineHeight: 1 }}>
              {s.value || '—'}
            </p>
            <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '6px 0 0' }}>{s.label}</p>
          </Card>
        ))}
      </div>

      {/* 4 张大卡：1 + 3 不对称（日记占大格） */}
      {heroData && <HeroFourCards data={heroData} layout="desktop" />}

      {/* 今日推荐按钮 */}
      <button
        onClick={() => setPickOpen(true)}
        style={{
          width: '100%',
          padding: '18px 22px',
          marginBottom: 24,
          background: 'linear-gradient(135deg, var(--color-pink-soft), var(--color-purple-soft))',
          border: '1.5px solid var(--color-border-1)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), var(--shadow-sm)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all var(--dur-fast) var(--ease-soft)',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--color-pink-strong)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
            Today&apos;s Pick
          </p>
          <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-ink-1)', margin: '3px 0 0' }}>
            今日推荐 · {plan && plan.totalCount > 0 ? `${plan.completedCount}/${plan.totalCount} 完成` : '看看今天做什么'}
          </p>
        </div>
        <ChevronRight size={20} color="var(--color-pink-strong)" />
      </button>

      {/* 我的 */}
      <Section title="我的" spacing="normal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {MINE.map(({ Icon, label, desc, href, tone }) => (
            <Card key={href} as="button" onClick={() => router.push(href)} variant="default" padding="md" interactive>
              <div
                style={{
                  width: 44, height: 44, borderRadius: 'var(--radius-md)',
                  background: TONE_BG[tone], color: TONE_FG[tone],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 12,
                }}
                aria-hidden
              >
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>{label}</p>
              <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '4px 0 0', lineHeight: 1.5 }}>{desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {plan && (
        <TodayPickSheet
          open={pickOpen}
          onClose={() => setPickOpen(false)}
          tasks={plan.tasks}
          completedCount={plan.completedCount}
          totalCount={plan.totalCount}
        />
      )}
    </div>
  );
}
