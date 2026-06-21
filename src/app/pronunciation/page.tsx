'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronRight, GraduationCap } from 'lucide-react';
import { PronunciationSession } from '@/components/pronunciation/PronunciationSession';
import {
  vowelPairs, consonantPairs, batchimWords, commonWords, commonPhrases,
  syllableDrills, linkingSounds,
  getTodayItems, itemsFromCourseWords,
} from '@/data/pronunciation/content';
import { db } from '@/lib/db';
import { thirtyDayCourse } from '@/data/thirtyDayCourse';
import type { PronunciationItem } from '@/types';
import { MobilePageHero } from '@/components/mobile/MobilePageHero';
import { ToriPrimaryButton } from '@/components/mobile/ToriPrimaryButton';
import { ToriSectionHeader } from '@/components/mobile/ToriSectionHeader';

interface GridCategory {
  key: string;
  title: string;
  subtitle: string;
  icon: string;
  items: PronunciationItem[];
  accent: string;
}

interface RowCategory {
  key: string;
  title: string;
  subtitle: string;
  items: PronunciationItem[];
  accent: string;
}

const gridCategories: GridCategory[] = [
  { key: 'vowel',     title: '元音区分',   subtitle: 'ㅓ/ㅗ · ㅡ/ㅜ · ㅐ/ㅔ', icon: '🔊', items: vowelPairs,    accent: '#aee3d8' },
  { key: 'consonant', title: '松/紧/送气', subtitle: 'ㄱ/ㅋ/ㄲ · ㄷ/ㅌ/ㄸ',   icon: '🎤', items: consonantPairs, accent: '#c4a8e8' },
  { key: 'syllable',  title: '音节练习',   subtitle: '基础 · 送气 · 紧音',     icon: '⚡', items: syllableDrills, accent: '#ffb896' },
  { key: 'batchim',   title: '收音训练',   subtitle: 'ㄱ/ㄴ/ㄷ/ㄹ/ㅁ/ㅂ/ㅇ', icon: '🎧', items: batchimWords,   accent: '#ff7fa8' },
];

const rowCategories: RowCategory[] = [
  { key: 'linking', title: '连音训练',   subtitle: '한국어 · 있어요 · 좋아요', items: linkingSounds, accent: '#aee3d8' },
  { key: 'words',   title: '常用词发音', subtitle: '안녕하세요 · 감사합니다',   items: commonWords,   accent: '#ff7fa8' },
  { key: 'phrases', title: '实用句跟读', subtitle: '场景化完整表达',            items: commonPhrases, accent: '#c4a8e8' },
];

const allCategories = [...gridCategories, ...rowCategories];

export default function PronunciationPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-[var(--border-color)] border-t-[var(--pink-primary)] rounded-full animate-spin" />
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}

function PageContent() {
  const searchParams = useSearchParams();
  const [sessionItems, setSessionItems] = useState<PronunciationItem[] | null>(null);
  const [courseItems, setCourseItems] = useState<{ dayNum: number; title: string; items: PronunciationItem[] } | null>(null);
  const [stats, setStats] = useState<{ totalAttempts: number; recentItems: number } | null>(null);

  // Handle ?day=X
  useEffect(() => {
    const dayParam = searchParams.get('day');
    if (!dayParam) return;
    const dayNum = parseInt(dayParam);
    if (isNaN(dayNum)) return;
    const course = thirtyDayCourse.find((c) => c.day === dayNum);
    if (course && course.words.length > 0) {
      setSessionItems(itemsFromCourseWords(
        course.words.map((w) => ({ korean: w.korean, chinese: w.chinese, pronunciation: w.pronunciation })),
        dayNum,
      ));
    }
  }, [searchParams]);

  // Handle ?focus=X
  useEffect(() => {
    const focusParam = searchParams.get('focus');
    if (!focusParam) return;
    const matched: PronunciationItem[] = [];
    for (const cat of allCategories) {
      for (const item of cat.items) {
        if (item.focus.includes(focusParam)) matched.push(item);
      }
    }
    if (matched.length > 0) setSessionItems(matched);
  }, [searchParams]);

  // Load stats
  useEffect(() => {
    (async () => {
      try {
        const attempts = await db.pronunciationAttempts.toArray();
        if (attempts.length === 0) return;
        const seenIds = new Set<string>();
        for (const a of attempts) seenIds.add(a.itemId);
        setStats({ totalAttempts: attempts.length, recentItems: seenIds.size });
      } catch (_e) {}
    })();
  }, []);

  // Load course items
  useEffect(() => {
    (async () => {
      try {
        const events = await db.learningEvents.toArray();
        const completedDays = new Set<number>();
        for (const e of events) {
          if (e.action === 'complete' && e.dayNum) completedDays.add(e.dayNum);
        }
        if (completedDays.size === 0) return;
        const latestDay = Math.max(...completedDays);
        const course = thirtyDayCourse.find((c) => c.day === latestDay);
        if (!course || course.words.length === 0) return;
        const items = itemsFromCourseWords(
          course.words.map((w) => ({ korean: w.korean, chinese: w.chinese, pronunciation: w.pronunciation })),
          latestDay,
        );
        setCourseItems({ dayNum: latestDay, title: course.title, items });
      } catch (_e2) {}
    })();
  }, []);

  if (sessionItems) {
    return <PronunciationSession items={sessionItems} onClose={() => setSessionItems(null)} />;
  }

  const todayItems = getTodayItems(3);

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto md:max-w-3xl">

      {/* Header */}
      <MobilePageHero
        title="发音练习"
        description="跟着 Tori 读，开口是最快的进步"
        variant="pink"
        icon="🎤"
      />

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl p-3 text-center" style={{ background: 'var(--bg-muted)' }}>
            <p className="text-[22px] font-black text-[var(--pink-primary)] leading-none">{stats.totalAttempts}</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">开口次数</p>
          </div>
          <div className="rounded-2xl p-3 text-center" style={{ background: 'var(--bg-muted)' }}>
            <p className="text-[22px] font-black text-[var(--pink-primary)] leading-none">{stats.recentItems}</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">练过内容</p>
          </div>
          <div className="rounded-2xl p-3 text-center" style={{ background: 'var(--bg-muted)' }}>
            <p className="text-[22px] font-black text-[var(--pink-primary)] leading-none">{todayItems.length}</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">今日任务</p>
          </div>
        </div>
      )}

      {/* Course words */}
      {courseItems && (
        <div className="rounded-[24px] p-5 bg-[var(--bg-card)] border border-[var(--border-color)] relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full" style={{ background: 'rgba(196,168,232,.12)' }} />
          <div className="flex items-center gap-2 mb-3 relative z-[1]">
            <GraduationCap size={16} className="text-[#9b72d0]" />
            <span className="text-sm font-bold text-[var(--text-primary)]">课程 Day {courseItems.dayNum} · {courseItems.title}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4 relative z-[1]">
            {courseItems.items.map((it) => (
              <span key={it.id} className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-muted)] text-[var(--text-primary)] font-medium">
                {it.textKo}
              </span>
            ))}
          </div>
          <div className="relative z-[1]">
            <ToriPrimaryButton onClick={() => setSessionItems(courseItems.items)}>
              练习课程单词发音
            </ToriPrimaryButton>
          </div>
        </div>
      )}

      {/* Today's practice */}
      <div className="rounded-[28px] p-5 relative overflow-hidden bg-[var(--bg-card)] border border-[var(--border-default)]">
        <div className="absolute -right-5 -top-5 w-[100px] h-[100px] rounded-full" style={{ background: 'rgba(255,127,168,.08)' }} />
        <div className="absolute right-5 -bottom-8 w-[70px] h-[70px] rounded-full" style={{ background: 'rgba(174,227,216,.12)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 bg-[var(--pink-pale)] text-[var(--pink-primary)] rounded-full px-3 py-1 text-[11px] font-bold">
              ✦ 今日练习
            </span>
            <span className="text-[11px] text-[var(--text-muted)] ml-auto">~3 分钟</span>
          </div>
          <p className="text-[18px] font-black text-[var(--text-primary)] leading-snug mb-1">
            {todayItems.map((it) => it.textKo).join(' · ')}
          </p>
          <p className="text-xs text-[var(--text-muted)] mb-4">{todayItems.length} 个内容，听一遍、读一遍</p>
          <ToriPrimaryButton onClick={() => setSessionItems(todayItems)}>
            开始今日练习
          </ToriPrimaryButton>
        </div>
      </div>

      {/* Grid: 4 core categories */}
      <div>
        <ToriSectionHeader title="发音专项" className="mb-3" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {gridCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSessionItems(cat.items)}
              className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-3.5 text-left active:scale-[0.97] transition-all hover:border-[var(--pink-primary)]/30 hover:shadow-sm"
            >
              <div className="flex items-start justify-between mb-2.5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-[20px]"
                  style={{ background: cat.accent + '22' }}
                >
                  {cat.icon}
                </div>
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full mt-1"
                  style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)' }}
                >
                  {cat.items.length}项
                </span>
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)] mb-0.5">{cat.title}</p>
              <p className="text-[11px] text-[var(--text-muted)] leading-snug">{cat.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Rows: 3 advanced categories */}
      <div>
        <ToriSectionHeader title="进阶练习" className="mb-3" />
        <div className="space-y-2.5">
          {rowCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSessionItems(cat.items)}
              className="w-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-3.5 flex items-center gap-3 text-left active:scale-[0.98] transition-all hover:border-[var(--pink-primary)]/30 hover:shadow-sm"
            >
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: cat.accent }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[var(--text-primary)]">{cat.title}</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{cat.subtitle}</p>
              </div>
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0"
                style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)' }}
              >
                {cat.items.length}项
              </span>
              <ChevronRight size={15} className="text-[var(--text-muted)] shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Beginner tip */}
      <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-4">
        <p className="text-sm font-bold text-[var(--text-primary)] mb-1">新手建议</p>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          不需要一次练完所有内容。每天 3 分钟，跟着标准音读 3-5 次，重点是听到自己的声音，慢慢找到韩语发音的感觉。
        </p>
      </div>

    </div>
  );
}
