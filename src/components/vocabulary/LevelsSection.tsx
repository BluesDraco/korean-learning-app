'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Target } from 'lucide-react';
import { db } from '@/lib/db';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

const levelColors: Record<number, string> = {
  1: 'var(--mint-soft)', 2: 'var(--mint-soft)',
  3: 'var(--pink-primary)', 4: 'var(--pink-primary)',
  5: 'var(--color-purple-strong)', 6: 'var(--color-purple-strong)',
};

type LevelInfo = { level: number; totalCount: number; mastered: number; learning: number };

const FALLBACK: LevelInfo[] = [1,2,3,4,5,6].map(level => ({ level, totalCount: 0, mastered: 0, learning: 0 }));

export function LevelsSection() {
  const { lang } = useLang();
  const [levels, setLevels] = useState<LevelInfo[]>(FALLBACK);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

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
      } catch { setLoadError(true); }
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
            {t('vocab.level_n_ji', lang, { n: lvl.level })}
          </span>
          <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" />
        </div>
        <p className="text-xs text-[var(--text-secondary)] mb-1">{t(`vocab.level_name_${lvl.level}`, lang)}</p>
        <p className="text-sm font-bold text-[var(--text-primary)] mb-3">
          {total > 0 ? t('vocab.levels_n_words', lang, { n: total.toLocaleString() }) : t('vocab.hub_plan_dash', lang)}
        </p>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-[var(--text-muted)]">
            <span>{progressLoaded ? t('vocab.levels_learned', lang, { done, total }) : t('vocab.hub_plan_dash', lang)}</span>
            <span>{progressLoaded ? `${pct}%` : ''}</span>
          </div>
          <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5 flex overflow-hidden">
            <div className="h-full rounded-l-full transition-all duration-500" style={{ width: progressLoaded && total > 0 ? `${(lvl.mastered / total) * 100}%` : '0%', backgroundColor: 'var(--mint-soft)' }} />
            <div className="h-full transition-all duration-500" style={{ width: progressLoaded && total > 0 ? `${(lvl.learning / total) * 100}%` : '0%', backgroundColor: 'var(--peach-soft)' }} />
            <div className="h-full rounded-r-full flex-1" style={{ backgroundColor: 'var(--border-color)' }} />
          </div>
          <div className="flex gap-3 text-[13px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mint-soft)' }} /> {t('vocab.levels_masterd_n', lang, { n: progressLoaded ? lvl.mastered : t('vocab.hub_plan_dash', lang) })}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--peach-soft)' }} /> {t('vocab.levels_learning_n', lang, { n: progressLoaded ? lvl.learning : t('vocab.hub_plan_dash', lang) })}
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
          <span className="text-xs text-[var(--text-muted)]">{t('vocab.levels_from_to', lang)}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {loadError ? (
            <div className="col-span-full flex flex-col items-center gap-3 py-8">
              <p className="text-sm text-[var(--color-ink-3)]">{t('vocab.load_failed_refresh', lang)}</p>
              <button onClick={() => { setLoadError(false); window.location.reload(); }} className="text-sm text-[var(--color-pink-strong)] font-medium underline">{t('vocab.hub_reload', lang)}</button>
            </div>
          ) : (
            levels.map(renderCard)
          )}
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center">
        <Target size={20} className="text-[var(--pink-primary)] mx-auto mb-2" />
        <p className="text-sm text-[var(--text-primary)] font-medium">{t('vocab.levels_goal_title', lang)}</p>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          {t('vocab.levels_goal_sub', lang)}
        </p>
      </div>
    </div>
  );
}
