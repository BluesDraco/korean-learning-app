'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Mic, Volume2, BookOpen, ChevronRight, Headphones, Sparkles,
  GraduationCap, Zap,
  type LucideIcon,
} from 'lucide-react';
import { PronunciationSession } from '@/components/pronunciation/PronunciationSession';
import {
  vowelPairs, consonantPairs, batchimWords, commonWords, commonPhrases,
  syllableDrills, linkingSounds,
  getTodayItems, itemsFromCourseWords,
} from '@/data/pronunciation/content';
import { db } from '@/lib/db';
import { thirtyDayCourse } from '@/data/thirtyDayCourse';
import type { PronunciationItem } from '@/types';

interface Category {
  key: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  items: PronunciationItem[];
  color: string;
}

const categories: Category[] = [
  {
    key: 'vowel', title: '元音区分', subtitle: 'ㅓ/ㅗ · ㅡ/ㅜ · ㅐ/ㅔ · ㅕ/ㅛ',
    icon: Volume2, items: vowelPairs,
    color: 'text-[var(--mint-soft)]',
  },
  {
    key: 'syllable', title: '音节练习', subtitle: '基础音节 · 送气音节 · 紧音音节',
    icon: Zap, items: syllableDrills,
    color: 'text-[var(--peach-soft)]',
  },
  {
    key: 'consonant', title: '松/紧/送气音', subtitle: 'ㄱㅋㄲ · ㄷㅌㄸ · ㅂㅍㅃ · ㅈㅊㅉ',
    icon: Mic, items: consonantPairs,
    color: 'text-[var(--purple-soft)]',
  },
  {
    key: 'batchim', title: '收音训练', subtitle: '掌握韩语关键收尾音',
    icon: Headphones, items: batchimWords,
    color: 'text-[var(--peach-soft)]',
  },
  {
    key: 'linking', title: '连音训练', subtitle: '한국어 · 있어요 · 좋아요',
    icon: Sparkles, items: linkingSounds,
    color: 'text-[var(--mint-soft)]',
  },
  {
    key: 'words', title: '常用词发音', subtitle: '日常高频词，练到自然',
    icon: BookOpen, items: commonWords,
    color: 'text-[var(--pink-primary)]',
  },
  {
    key: 'phrases', title: '实用句跟读', subtitle: '场景化表达，完整说出',
    icon: Sparkles, items: commonPhrases,
    color: 'text-[var(--mint-soft)]',
  },
];

export default function PronunciationPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
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
  const [stats, setStats] = useState<{ totalAttempts: number; recentItems: string[] } | null>(null);

  // Handle ?day=X — direct course pronunciation from lesson completion
  useEffect(() => {
    const dayParam = searchParams.get('day');
    if (!dayParam) return;
    const dayNum = parseInt(dayParam);
    if (isNaN(dayNum)) return;
    const course = thirtyDayCourse.find((c) => c.day === dayNum);
    if (course && course.words.length > 0) {
      const items = itemsFromCourseWords(
        course.words.map((w) => ({ korean: w.korean, chinese: w.chinese, pronunciation: w.pronunciation })),
        dayNum,
      );
      setSessionItems(items);
    }
  }, [searchParams]);

  // Handle ?focus=X — direct pronunciation from Hangul letter detail
  useEffect(() => {
    const focusParam = searchParams.get('focus');
    if (!focusParam) return;

    const matchingItems: PronunciationItem[] = [];
    for (const cat of categories) {
      for (const item of cat.items) {
        if (item.focus.includes(focusParam)) {
          matchingItems.push(item);
        }
      }
    }

    if (matchingItems.length > 0) {
      setSessionItems(matchingItems);
    }
  }, [searchParams]);

  // Load pronunciation stats
  useEffect(() => {
    (async () => {
      try {
        const attempts = await db.pronunciationAttempts.toArray();
        if (attempts.length === 0) return;
        // Get unique recent item IDs
        const recent = attempts
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 20);
        const seenIds = new Set<string>();
        const recentIds: string[] = [];
        for (const a of recent) {
          if (!seenIds.has(a.itemId) && recentIds.length < 5) {
            seenIds.add(a.itemId);
            recentIds.push(a.itemId);
          }
        }
        setStats({ totalAttempts: attempts.length, recentItems: recentIds });
      } catch (_) {}
    })();
  }, []);

  // Load course pronunciation items from completed days
  useEffect(() => {
    (async () => {
      try {
        const events = await db.learningEvents.toArray();
        const completedDays = new Set<number>();
        for (const e of events) {
          if (e.action === 'complete' && e.dayNum) {
            completedDays.add(e.dayNum);
          }
        }
        if (completedDays.size === 0) return;

        // Find the latest completed day
        const latestDay = Math.max(...completedDays);
        const course = thirtyDayCourse.find((c) => c.day === latestDay);
        if (!course || course.words.length === 0) return;

        const items = itemsFromCourseWords(
          course.words.map((w) => ({ korean: w.korean, chinese: w.chinese, pronunciation: w.pronunciation })),
          latestDay,
        );
        setCourseItems({ dayNum: latestDay, title: course.title, items });
      } catch (_) {}
    })();
  }, []);

  if (sessionItems) {
    return <PronunciationSession items={sessionItems} onClose={() => setSessionItems(null)} />;
  }

  const todayItems = getTodayItems(3);

  return (
    <div className="py-4 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Mic size={22} className="text-[var(--mint-soft)]" />
          发音练习
        </h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">跟着 Tori 读，声音不用大，先开口就很好</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center justify-around">
          <div className="text-center">
            <p className="text-lg font-extrabold text-[var(--mint-soft)]">{stats.totalAttempts}</p>
            <p className="text-[10px] text-[var(--text-muted)]">开口次数</p>
          </div>
          <div className="w-px h-8 bg-[var(--border-color)]" />
          <div className="text-center">
            <p className="text-lg font-extrabold text-[var(--pink-primary)]">{stats.recentItems.length}</p>
            <p className="text-[10px] text-[var(--text-muted)]">练习内容</p>
          </div>
        </div>
      )}

      {/* Course words — shown when user has completed course days */}
      {courseItems && (
        <div className="bg-gradient-to-br from-[var(--purple-soft)]/10 to-[var(--pink-primary)]/10 border-2 border-[var(--purple-soft)]/20 rounded-3xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <GraduationCap size={18} className="text-[var(--purple-soft)]" />
            <span className="text-sm font-bold text-[var(--text-primary)]">课程 Day {courseItems.dayNum} · {courseItems.title}</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            练习你刚学过的 {courseItems.items.length} 个单词发音
          </p>
          <div className="flex flex-wrap gap-2">
            {courseItems.items.map((it) => (
              <span key={it.id} className="text-xs px-2.5 py-1.5 rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)] font-medium">
                {it.textKo}
              </span>
            ))}
          </div>
          <button
            onClick={() => setSessionItems(courseItems.items)}
            className="w-full py-3 bg-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-all"
          >
            练习课程单词发音
          </button>
        </div>
      )}

      {/* Today's practice */}
      <div className="bg-gradient-to-br from-[var(--mint-soft)]/10 to-[var(--pink-primary)]/10 border-2 border-[var(--mint-soft)]/20 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-[var(--mint-soft)]" />
          <span className="text-sm font-bold text-[var(--text-primary)]">今日发音练习</span>
          <span className="text-[10px] text-[var(--text-muted)] ml-auto">~3 分钟</span>
        </div>

        <p className="text-xs text-[var(--text-secondary)]">
          今天练 {todayItems.length} 个内容：{todayItems.map((it) => it.textKo).join(' · ')}
        </p>

        <button
          onClick={() => setSessionItems(todayItems)}
          className="w-full py-3.5 bg-[var(--mint-soft)] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-all"
        >
          开始今日发音练习
        </button>
      </div>

      {/* Category grid */}
      <div>
        <p className="text-sm font-bold text-[var(--text-primary)] mb-3">发音专项训练</p>
        <div className="space-y-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSessionItems(cat.items)}
              className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center gap-4 hover:border-[var(--mint-soft)]/30 transition-all group text-left"
            >
              <div className={`p-2.5 rounded-xl bg-[var(--bg-input)] ${cat.color}`}>
                <cat.icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[var(--text-primary)]">{cat.title}</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{cat.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[var(--text-muted)]">{cat.items.length}项</span>
                <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Beginner tip */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <p className="text-sm font-bold text-[var(--text-primary)] mb-1">新手建议</p>
        <p className="text-xs text-[var(--text-muted)]">
          不需要一次练完所有内容。每天 3 分钟，跟着标准音读 3-5 次，重点是听到自己的声音，慢慢找到韩语发音的感觉。
        </p>
      </div>
    </div>
  );
}
