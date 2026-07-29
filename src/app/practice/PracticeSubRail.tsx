'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';
import { readAll, fmtTime, type PracticeMode, type PracticeStats, type PracticeRow } from '@/lib/practice/aggregate';

type StatCell = { num: string | number; label: string };

function metricsOf(mode: PracticeMode, s: PracticeStats, lang: Lang): StatCell[] {
  if (mode === 'listening') return [{ num: s.listening.total, label: t('prac.rail_cum', lang) }, { num: s.listening.today, label: t('prac.rail_today', lang) }, { num: s.weeklyByMode.listening?.reduce((a, b) => a + b, 0) ?? 0, label: t('prac.rail_week', lang) }];
  if (mode === 'dictation') return [{ num: s.dictation.total, label: t('prac.rail_cum', lang) }, { num: s.dictation.today, label: t('prac.rail_today', lang) }, { num: `${s.dictation.accuracy}%`, label: t('prac.rail_accuracy', lang) }];
  if (mode === 'writing')   return [{ num: s.writing.total, label: t('prac.rail_cum', lang) }, { num: s.writing.today, label: t('prac.rail_today', lang) }, { num: s.weeklyByMode.writing?.reduce((a, b) => a + b, 0) ?? 0, label: t('prac.rail_week', lang) }];
  return [{ num: s.typing.total, label: t('prac.rail_cum', lang) }, { num: s.typing.bestWpm, label: t('prac.rail_best_wpm', lang) }, { num: `${s.typing.bestAcc}%`, label: t('prac.rail_best_acc', lang) }];
}

export function PracticeSubRail({ mode, chipLabel }: { mode: PracticeMode; chipLabel: string }) {
  const { user } = useAuth();
  const { lang } = useLang();
  const [stats, setStats] = useState<PracticeStats | null>(null);
  const [recent, setRecent] = useState<PracticeRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    readAll(user?.id, 30, lang).then(({ stats: s, recent: r }) => {
      if (cancelled) return;
      setStats(s);
      setRecent(r.filter(x => x.mode === mode));
    });
    return () => { cancelled = true; };
  }, [user?.id, mode, lang]);

  const cells = stats ? metricsOf(mode, stats, lang) : [];

  return (
    <aside className="pr-hub-rail" aria-label={t('prac.rail_aria', lang)}>
      <div className="pr-hub-card">
        <div className="pr-hub-card-title">{t('prac.rail_mode_progress', lang)}</div>
        <div className="pr-hub-stats">
          {cells.map(c => (
            <div key={c.label} className="pr-hub-stat">
              <div className="pr-hub-stat-num">{c.num}</div>
              <div className="pr-hub-stat-label">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pr-hub-card pr-hub-recent-card">
        <div className="pr-hub-card-title">{t('prac.rail_recent', lang)}</div>
        {!user?.id ? (
          <div className="pr-hub-empty">{t('prac.rail_login_sync', lang)}</div>
        ) : recent.length === 0 ? (
          <div className="pr-hub-empty">{t('prac.rail_no_record', lang)}</div>
        ) : (
          <div className="pr-hub-recent">
            {recent.map(r => (
              <Link key={r.id} href={r.href} className="pr-hub-recent-row">
                <span className={`pr-hub-recent-chip ${chipLabel}`}>{chipLabel === 'mint' ? t('prac.rail_chip_listening', lang) : chipLabel === 'peach' ? t('prac.rail_chip_dictation', lang) : chipLabel === 'purple' ? t('prac.rail_chip_writing', lang) : t('prac.rail_chip_typing', lang)}</span>
                <div className="pr-hub-recent-body">
                  <div className="pr-hub-recent-meta">{r.meta}</div>
                  <div className="pr-hub-recent-time">{fmtTime(r.timestamp, lang)}</div>
                </div>
                <span className="pr-hub-recent-score">{r.scoreText}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
