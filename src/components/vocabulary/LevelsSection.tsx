'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Target, Loader2 } from 'lucide-react';
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

type LevelInfo = {
  level: number;
  totalCount: number;
  mastered: number;
  learning: number;
};

export function LevelsSection() {
  const [levels, setLevels] = useState<LevelInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ getAllLevels, getLevelWords }, allUserWords] = await Promise.all([
        import('@/data/vocabulary').catch(() => ({ getAllLevels: () => [], getLevelWords: () => [] })),
        db.words.toArray().catch(() => []),
      ]);
      const userMasteredSet = new Set(allUserWords.filter((w) => w.mastery === 'mastered').map((w) => w.word));
      const userLearningSet = new Set(allUserWords.filter((w) => w.mastery !== 'mastered' && w.mastery !== 'new').map((w) => w.word));

      const allLevels = await getAllLevels();
      const result = await Promise.all(allLevels.map(async (lvl) => {
        const words = await getLevelWords(lvl.level);
        const koreanWords = words.map((w) => w.korean);
        return {
          level: lvl.level,
          totalCount: words.length,
          mastered: koreanWords.filter((w) => userMasteredSet.has(w)).length,
          learning: koreanWords.filter((w) => userLearningSet.has(w)).length,
        };
      }));
      setLevels(result);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={24} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  const topikI = levels.filter((l) => l.level <= 2);
  const topikII = levels.filter((l) => l.level >= 3);

  return (
    <div className="space-y-6">
      {/* TOPIK I */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="px-2 py-0.5 rounded-md bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] text-xs font-bold">TOPIK I</div>
          <span className="text-xs text-[var(--text-muted)]">初级 · 1-2级</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {topikI.map((lvl) => {
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
                  {total.toLocaleString()} 词
                </p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[var(--text-muted)]">
                    <span>已学 {done}/{total}</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5 flex overflow-hidden">
                    <div className="h-full rounded-l-full transition-all" style={{ width: `${total > 0 ? (lvl.mastered / total) * 100 : 0}%`, backgroundColor: 'var(--mint-soft)' }} />
                    <div className="h-full transition-all" style={{ width: `${total > 0 ? (lvl.learning / total) * 100 : 0}%`, backgroundColor: 'var(--peach-soft)' }} />
                    <div className="h-full rounded-r-full flex-1" style={{ backgroundColor: 'var(--border-color)' }} />
                  </div>
                  <div className="flex gap-3 text-[13px] text-[var(--text-muted)]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mint-soft)' }} /> 掌握 {lvl.mastered}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--peach-soft)' }} /> 学习 {lvl.learning}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* TOPIK II */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="px-2 py-0.5 rounded-md bg-[var(--purple-soft)]/10 text-[var(--purple-soft)] text-xs font-bold">TOPIK II</div>
          <span className="text-xs text-[var(--text-muted)]">中高级 · 3-6级</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {topikII.map((lvl) => {
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
                  {total.toLocaleString()} 词
                </p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[var(--text-muted)]">
                    <span>已学 {done}/{total}</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5 flex overflow-hidden">
                    <div className="h-full rounded-l-full transition-all" style={{ width: `${total > 0 ? (lvl.mastered / total) * 100 : 0}%`, backgroundColor: 'var(--mint-soft)' }} />
                    <div className="h-full transition-all" style={{ width: `${total > 0 ? (lvl.learning / total) * 100 : 0}%`, backgroundColor: 'var(--peach-soft)' }} />
                    <div className="h-full rounded-r-full flex-1" style={{ backgroundColor: 'var(--border-color)' }} />
                  </div>
                  <div className="flex gap-3 text-[13px] text-[var(--text-muted)]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mint-soft)' }} /> 掌握 {lvl.mastered}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--peach-soft)' }} /> 学习 {lvl.learning}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
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
