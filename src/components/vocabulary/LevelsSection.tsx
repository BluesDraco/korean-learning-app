'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Target } from 'lucide-react';
import { db } from '@/lib/db';

const levelNames: Record<number, string> = {
  1: '1级 · 入门', 2: '2级 · 基础', 3: '3级 · 进阶',
  4: '4级 · 中级', 5: '5级 · 高级', 6: '6级 · 精通',
};

const levelColors: Record<number, string> = {
  1: 'var(--mint-soft)', 2: 'var(--mint-soft)',
  3: 'var(--pink-primary)', 4: 'var(--pink-primary)',
  5: 'var(--purple-soft)', 6: 'var(--purple-soft)',
};

type LevelInfo = { level: number; totalCount: number; mastered: number; learning: number };

const FALLBACK: LevelInfo[] = [1,2,3,4,5,6].map(level => ({ level, totalCount: 0, mastered: 0, learning: 0 }));

export function LevelsSection() {
  const [levels, setLevels] = useState<LevelInfo[]>(FALLBACK);
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { getAllLevels, getLevelWords } = await import('@/data/vocabulary');
        const allLevels = await getAllLevels();

        // Phase 1: totals (fast)
        const totalsByLevel = new Map<number, { korean: string }[]>();
        const totals = await Promise.all(allLevels.map(async (lvl) => {
          let words: { korean: string }[] = [];
          try { words = await getLevelWords(lvl.level); } catch { /* empty */ }
          totalsByLevel.set(lvl.level, words);
          return { level: lvl.level, totalCount: words.length, mastered: 0, learning: 0 };
        }));
        if (cancelled) return;
        if (totals.length > 0) setLevels(totals);

        // Phase 2: progress (slower, db read + intersection)
        const allUserWords = await db.words.toArray();
        if (cancelled) return;
        const masteredSet = new Set(allUserWords.filter((w) => w.mastery === 'mastered').map((w) => w.word));
        const learningSet = new Set(allUserWords.filter((w) => w.mastery !== 'mastered' && w.mastery !== 'new').map((w) => w.word));

        const enriched = totals.map((lvl) => {
          const words = totalsByLevel.get(lvl.level) ?? [];
          const koreanWords = words.map((w) => w.korean);
          return {
            ...lvl,
            mastered: koreanWords.filter((w) => masteredSet.has(w)).length,
            learning: koreanWords.filter((w) => learningSet.has(w)).length,
          };
        });
        if (!cancelled) {
          setLevels(enriched);
          setProgressLoaded(true);
        }
      } catch { /* keep fallback */ }
    })();
    return () => { cancelled = true; };
  }, []);

  const renderCard = (lvl: LevelInfo) => {
    const total = lvl.totalCount;
    const done = lvl.mastered + lvl.learning;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return (
      <Link
        key={lvl.level}
        href={`/vocabulary/levels/${lvl.level}`}
        className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 hover:border-[var(--pink-primary)]/30 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all group"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold" style={{ color: levelColors[lvl.level] }}>
            {lvl.level}级
          </span>
          <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" />
        </div>
        <p className="text-xs text-[var(--text-secondary)] mb-1">{levelNames[lvl.level]}</p>
        <p className="text-sm font-bold text-[var(--text-primary)] mb-3">
          {total > 0 ? `${total.toLocaleString()} 词` : '——'}
        </p>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-[var(--text-muted)]">
            <span>{progressLoaded ? `已学 ${done}/${total}` : '—'}</span>
            <span>{progressLoaded ? `${pct}%` : ''}</span>
          </div>
          <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5 flex overflow-hidden">
            <div className="h-full rounded-l-full transition-all duration-500" style={{ width: progressLoaded && total > 0 ? `${(lvl.mastered / total) * 100}%` : '0%', backgroundColor: 'var(--mint-soft)' }} />
            <div className="h-full transition-all duration-500" style={{ width: progressLoaded && total > 0 ? `${(lvl.learning / total) * 100}%` : '0%', backgroundColor: 'var(--peach-soft)' }} />
            <div className="h-full rounded-r-full flex-1" style={{ backgroundColor: 'var(--border-color)' }} />
          </div>
          <div className="flex gap-3 text-[13px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mint-soft)' }} /> 掌握 {progressLoaded ? lvl.mastered : '—'}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--peach-soft)' }} /> 学习 {progressLoaded ? lvl.learning : '—'}
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="px-2 py-0.5 rounded-md bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] text-xs font-bold">TOPIK</div>
          <span className="text-xs text-[var(--text-muted)]">从入门 1 级到精通 6 级</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {levels.map(renderCard)}
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center">
        <Target size={20} className="text-[var(--pink-primary)] mx-auto mb-2" />
        <p className="text-sm text-[var(--text-primary)] font-medium">系统打卡，目标明确</p>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          知道自己在第几级、还差多少词、哪些词是薄弱点。有目标感，留存率高得多。
        </p>
      </div>
    </div>
  );
}
