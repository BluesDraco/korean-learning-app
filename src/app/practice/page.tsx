'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useSmartBack } from '@/lib/useSmartBack';
import { readAll, fmtTime, type PracticeMode, type PracticeStats, type PracticeRow } from '@/lib/practice/aggregate';
import { useTheme } from '@/components/ThemeProvider';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';
import PlaceIntro from '@/components/PlaceIntro';
import './practice-redesign.css';

type Tab = 'mode' | 'mistakes';

const TAB_META: { key: Tab; label: string; kr: string }[] = [
  { key: 'mode',     label: 'practice.tab_mode',     kr: '연습' },
  { key: 'mistakes', label: 'practice.tab_mistakes', kr: '오답노트' },
];

interface ModeMeta {
  key: PracticeMode;
  num: string;
  emoji: string;
  name: string;
  kr: string;
  desc: string;
  tone: 'mint' | 'peach' | 'purple' | 'pink';
  href: string;
  subChip?: string;
}

const MODES: ModeMeta[] = [
  { key: 'listening', num: '01', emoji: '🎙️', name: 'practice.mode_speaking',  kr: '말하기', desc: 'practice.mode_speaking_desc',  tone: 'mint',   href: '/speaking', subChip: 'practice.chip_3modes' },
  { key: 'dictation', num: '02', emoji: '✍️', name: 'practice.mode_dictation', kr: '받아쓰기',    desc: 'practice.mode_dictation_desc', tone: 'peach',  href: '/dictation', subChip: 'practice.chip_3modes' },
  { key: 'writing',   num: '03', emoji: '📝', name: 'practice.mode_writing',   kr: '쓰기',        desc: 'practice.mode_writing_desc',   tone: 'purple', href: '/writing',   subChip: 'practice.chip_4modes' },
  { key: 'typing',    num: '04', emoji: '⌨️', name: 'practice.mode_typing',    kr: '타자 연습',   desc: 'practice.mode_typing_desc',    tone: 'pink',   href: '/typing',    subChip: 'practice.chip_3modes' },
];

export default function PracticePage() {
  const smartBack = useSmartBack('/learning');
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { theme } = useTheme();
  const { lang } = useLang();
  const initialTab = (searchParams.get('tab') as Tab) || 'mode';
  const [tab, setTab] = useState<Tab>(TAB_META.some(t => t.key === initialTab) ? initialTab : 'mode');

  const [stats, setStats] = useState<PracticeStats | null>(null);
  const [recent, setRecent] = useState<PracticeRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    readAll(user?.id, 8, lang)
      .then(({ stats: s, recent: r }) => {
        if (cancelled) return;
        setStats(s);
        setRecent(r);
      });
    return () => { cancelled = true; };
  }, [user?.id, lang]);

  const switchTab = useCallback((next: Tab) => {
    setTab(next);
    const url = new URL(window.location.href);
    if (next === 'mode') url.searchParams.delete('tab'); else url.searchParams.set('tab', next);
    window.history.replaceState({}, '', url.toString());
  }, []);

  const modesDone = stats?.modesDoneToday ?? 0;
  const heroDone = modesDone >= 4;

  return (
    <div className="pr-scope">
      <PlaceIntro place="practice" dark={theme === 'dark'} />
      <div className="hr-stage">
        <div className="hr-mobile-back">
          <button className="hr-mobile-back-btn" onClick={smartBack} aria-label={t('practice.back', lang)}>
            <ArrowLeft size={14} /> {t('practice.back', lang)}
          </button>
        </div>

        <header className="hr-page-head">
          <div className="hr-brand">
            <div className="hr-brand-mark">Tori</div>
            <div className="hr-brand-kr">연습</div>
            <div className="hr-brand-sub">{t('practice.brand_sub', lang)}</div>
          </div>
          <div className="hr-brand-sub" data-md-show>{t('practice.brand_tagline', lang)}</div>
        </header>

        {tab === 'mode' && stats === null && <SkeletonBlock rows={4} />}
        {tab === 'mode' && stats !== null && <Dashboard stats={stats} done={heroDone} modesDone={modesDone} lang={lang} />}

        <div className="pr-hub-layout">
          <div className="pr-hub-col">
            <nav className="hr-main-tabs" role="tablist" aria-label={t('practice.center', lang)}>
              {TAB_META.map(tm => (
                <button
                  key={tm.key}
                  role="tab"
                  aria-selected={tab === tm.key}
                  className={`hr-main-tab${tab === tm.key ? ' active' : ''}`}
                  onClick={() => switchTab(tm.key)}
                >
                  {t(tm.label, lang)}
                  <span className="hr-kr">{tm.kr}</span>
                </button>
              ))}
            </nav>

            <section role="tabpanel" className="pr-screen" key={tab}>
              {tab === 'mode'     && <ModeTab stats={stats} lang={lang} />}
              {tab === 'mistakes' && <MistakesTab loggedIn={!!user?.id} lang={lang} />}
            </section>
          </div>

          <HubRail stats={stats} recent={recent} loggedIn={!!user?.id} lang={lang} />
        </div>
      </div>
    </div>
  );
}

/* ═════ 桌面专属右栏 · 今日打卡 + 最近练习(纯功能,≥1280 显示) ═════ */
const RAIL_MODES: { key: PracticeMode; name: string; kr: string; tone: string; href: string }[] = [
  { key: 'listening', name: 'practice.short_speaking',  kr: '말하기',    tone: 'mint',   href: '/speaking' },
  { key: 'dictation', name: 'practice.short_dictation', kr: '받아쓰기',  tone: 'peach',  href: '/dictation' },
  { key: 'writing',   name: 'practice.short_writing',   kr: '쓰기',      tone: 'purple', href: '/writing' },
  { key: 'typing',    name: 'practice.short_typing',    kr: '타자',      tone: 'pink',   href: '/typing' },
];

function doneOf(key: PracticeMode, stats: PracticeStats | null): boolean {
  if (!stats) return false;
  return stats[key].doneToday;
}

function HubRail({ stats, recent, loggedIn, lang }: { stats: PracticeStats | null; recent: PracticeRow[]; loggedIn: boolean; lang: Lang }) {
  return (
    <aside className="pr-hub-rail" aria-label={t('practice.rail_aria', lang)}>
      <div className="pr-hub-card">
        <div className="pr-hub-card-title">{t('practice.today_checkin', lang)}</div>
        <div className="pr-hub-tasks">
          {RAIL_MODES.map(m => {
            const done = doneOf(m.key, stats);
            return (
              <Link key={m.key} href={m.href} className={`pr-hub-task${done ? ' done' : ''}`}>
                <span className="pr-hub-task-ico" aria-hidden>
                  {done ? <CheckCircle2 size={17} /> : <Circle size={17} />}
                </span>
                <span className="pr-hub-task-name">{t(m.name, lang)}</span>
                <span className="pr-hub-task-kr">{m.kr}</span>
                <span className="pr-hub-task-state">{done ? t('practice.done', lang) : t('practice.todo', lang)}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pr-hub-card pr-hub-recent-card">
        <div className="pr-hub-card-title">{t('practice.recent', lang)}</div>
        {!loggedIn ? (
          <div className="pr-hub-empty">{t('practice.rail_login', lang)}</div>
        ) : recent.length === 0 ? (
          <div className="pr-hub-empty">{t('practice.rail_empty', lang)}</div>
        ) : (
          <div className="pr-hub-recent">
            {recent.map(r => {
              const meta = RAIL_MODES.find(m => m.key === r.mode);
              return (
                <Link key={r.id} href={r.href} className="pr-hub-recent-row">
                  <span className={`pr-hub-recent-chip ${meta?.tone ?? 'pink'}`}>{meta ? t(meta.name, lang) : t('practice.generic', lang)}</span>
                  <div className="pr-hub-recent-body">
                    <div className="pr-hub-recent-meta">{r.meta}</div>
                    <div className="pr-hub-recent-time">{fmtTime(r.timestamp, lang)}</div>
                  </div>
                  <span className="pr-hub-recent-score">{r.scoreText}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}

/* ═════ DASHBOARD · 今日进度 + 4 模式统计卡 ═════ */
type MetricCell = { num: number; unit?: string; label: string };
function Dashboard({ stats, done, modesDone, lang }: { stats: PracticeStats | null; done: boolean; modesDone: number; lang: Lang }) {
  const goal = 4;
  const pct = Math.min(100, (modesDone / goal) * 100);

  const modes: {
    key: PracticeMode; name: string; kr: string; tone: 'mint'|'peach'|'purple'|'pink';
    metrics: [MetricCell, MetricCell, MetricCell];
    lastAt?: number;
    bar: number[];
  }[] = [
    {
      key: 'listening', name: t('practice.short_speaking', lang), kr: '말하기', tone: 'mint',
      metrics: [
        { num: stats?.listening.total ?? 0, label: t('practice.metric_total', lang) },
        { num: stats?.listening.today ?? 0, label: t('practice.metric_today', lang) },
        { num: stats?.weeklyByMode.listening?.reduce((a,b)=>a+b, 0) ?? 0, label: t('practice.metric_week', lang) },
      ],
      lastAt: stats?.listening.lastAt,
      bar: stats?.weeklyByMode.listening ?? [0,0,0,0,0,0,0],
    },
    {
      key: 'dictation', name: t('practice.short_dictation', lang), kr: '받아쓰기', tone: 'peach',
      metrics: [
        { num: stats?.dictation.total ?? 0, label: t('practice.metric_total', lang) },
        { num: stats?.dictation.today ?? 0, label: t('practice.metric_today', lang) },
        { num: stats?.dictation.accuracy ?? 0, unit: '%', label: t('practice.metric_accuracy', lang) },
      ],
      lastAt: stats?.dictation.lastAt,
      bar: stats?.weeklyByMode.dictation ?? [0,0,0,0,0,0,0],
    },
    {
      key: 'writing', name: t('practice.short_writing', lang), kr: '쓰기', tone: 'purple',
      metrics: [
        { num: stats?.writing.total ?? 0, label: t('practice.metric_total', lang) },
        { num: stats?.writing.today ?? 0, label: t('practice.metric_today', lang) },
        { num: stats?.weeklyByMode.writing?.reduce((a,b)=>a+b, 0) ?? 0, label: t('practice.metric_week', lang) },
      ],
      lastAt: stats?.writing.lastAt,
      bar: stats?.weeklyByMode.writing ?? [0,0,0,0,0,0,0],
    },
    {
      key: 'typing', name: t('practice.short_typing', lang), kr: '타자 연습', tone: 'pink',
      metrics: [
        { num: stats?.typing.total ?? 0, label: t('practice.metric_total', lang) },
        { num: stats?.typing.today ?? 0, label: t('practice.metric_today', lang) },
        { num: stats?.typing.bestWpm ?? 0, label: t('practice.metric_best_wpm', lang) },
      ],
      lastAt: stats?.typing.lastAt,
      bar: stats?.weeklyByMode.typing ?? [0,0,0,0,0,0,0],
    },
  ];

  const goalRemaining = Math.max(0, goal - modesDone);
  const streak = stats?.streak ?? 0;

  return (
    <section className="pr-dash" role="region" aria-label={t('practice.center', lang)}>
      <div className="pr-dash-stats">
        <div className="pr-dash-stat">
          <div>
            <span className={`pr-dash-stat-num${done ? ' mint' : ' pink'}`}>{modesDone}</span>
            <span className="pr-dash-stat-unit">/{goal}</span>
          </div>
          <div className="pr-dash-stat-label">{t('practice.stat_today_modes', lang)}</div>
        </div>
        <div className="pr-dash-stat">
          <div>
            <span className="pr-dash-stat-num">{streak}</span>
          </div>
          <div className="pr-dash-stat-label">{t('practice.stat_streak', lang)}</div>
        </div>
        <div className="pr-dash-stat">
          <div>
            <span className="pr-dash-stat-num">{stats?.weekly.reduce((a,b)=>a+b, 0) ?? 0}</span>
          </div>
          <div className="pr-dash-stat-label">{t('practice.stat_week', lang)}</div>
        </div>
      </div>

      <div className={`pr-dash-today${done ? ' done' : ''}`}>
        <div className="pr-dash-today-icon">{done ? '✓' : modesDone}</div>
        <div className="pr-dash-today-body">
          <div className="pr-dash-today-line">
            <span className="pr-dash-today-label">{t('practice.today_goal', lang)}</span>
            <span className="pr-dash-today-metric">{t('practice.n_modes', lang, { done: modesDone, goal })}</span>
            <span className="pr-dash-today-hint">
              {done ? t('practice.goal_done', lang) : modesDone === 0 ? t('practice.goal_start', lang) : t('practice.goal_remain', lang, { n: goalRemaining })}
            </span>
          </div>
          <div className="pr-dash-progress" aria-hidden>
            <div className="pr-dash-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="pr-dash-modes">
        {modes.map(m => {
          const modeMax = Math.max(1, ...m.bar);
          return (
            <Link key={m.key} href={hrefOf(m.key)} className={`pr-dash-mode ${m.tone}`} aria-label={t('practice.mode_stat_aria', lang, { name: m.name })}>
              <div className="pr-dash-mode-head">
                <span className="pr-dash-mode-name">{m.name}</span>
                <span className="pr-dash-mode-kr">{m.kr}</span>
              </div>

              <div className="pr-dash-metrics">
                {m.metrics.map((cell, i) => (
                  <div key={i} className="pr-dash-metric">
                    <div>
                      <span className={`pr-dash-metric-num${cell.num === 0 ? ' zero' : ''}`}>{cell.num}</span>
                      {cell.unit && <span className="pr-dash-metric-unit">{cell.unit}</span>}
                    </div>
                    <span className="pr-dash-metric-label">{cell.label}</span>
                  </div>
                ))}
              </div>

              <div className="pr-dash-spark" aria-hidden>
                {m.bar.map((v, i) => {
                  const active = v > 0;
                  const h = active ? Math.max(30, Math.round((v / modeMax) * 100)) : 20;
                  return (
                    <div
                      key={i}
                      className={`pr-dash-spark-cell${active ? ' on' : ''}${i === 6 ? ' today' : ''}`}
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>

              <span className="pr-dash-mode-arrow" aria-hidden>
                <ChevronRight size={16} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function hrefOf(m: PracticeMode): string {
  return MODES.find(x => x.key === m)?.href ?? '/practice';
}

/* ═════ MODE TAB ═════ */
function ModeTab({ stats, lang }: { stats: PracticeStats | null; lang: Lang }) {
  return (
    <div className="pr-mode-grid">
      {MODES.map(m => (
        <Link
          key={m.key}
          href={m.href}
          className={`pr-mode-card ${m.tone}`}
          aria-label={t('practice.enter_mode', lang, { name: t(m.name, lang) })}
        >
          <div className="pr-mode-num">{m.num}</div>
          <div className="pr-mode-emoji">{m.emoji}</div>
          <div className="pr-mode-name">{t(m.name, lang)}</div>
          <div className="pr-mode-kr">{m.kr}</div>
          <div className="pr-mode-desc">{t(m.desc, lang)}</div>
          {m.subChip && <span className="pr-mode-subchip">{t(m.subChip, lang)} ▸</span>}
          <div className="pr-mode-stat">
            <span>{modeStatLabel(m.key, lang)}</span>
            <span style={{ marginLeft: 'auto' }} className="pr-mode-stat-num">{modeStatValue(m.key, stats)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function modeStatLabel(key: PracticeMode, lang: Lang) {
  switch (key) {
    case 'listening': return t('practice.stat_today_count', lang);
    case 'dictation': return t('practice.metric_accuracy', lang);
    case 'writing':   return t('practice.stat_total_pieces', lang);
    case 'typing':    return t('practice.metric_best_wpm', lang);
  }
}

function modeStatValue(key: PracticeMode, stats: PracticeStats | null): string {
  if (!stats) return '–';
  switch (key) {
    case 'listening': return String(stats.listening.today);
    case 'dictation': return stats.dictation.total ? `${stats.dictation.accuracy}%` : '–';
    case 'writing':   return String(stats.writing.total);
    case 'typing':    return stats.typing.bestWpm ? String(stats.typing.bestWpm) : '–';
  }
}

/* ═════ MISTAKES TAB · 默写错题本(仅默写有真错题数据) ═════ */
interface MistakeGroup { korean: string; meaning: string; wrongCount: number; lastWrongAt: number; }

function MistakesTab({ loggedIn, lang }: { loggedIn: boolean; lang: Lang }) {
  const [mistakes, setMistakes] = useState<MistakeGroup[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedIn) { setLoading(false); return; }
    let cancelled = false;
    (async () => {
      try {
        const { db } = await import('@/lib/db');
        const wrong = await db.dictationRecords.filter(r => !r.correct);
        const grouped: Record<string, MistakeGroup> = {};
        for (const r of wrong) {
          const key = r.wordId;
          if (!grouped[key]) grouped[key] = { korean: key, meaning: r.meaning || '', wrongCount: 0, lastWrongAt: 0 };
          grouped[key].wrongCount += 1;
          if (r.date > grouped[key].lastWrongAt) grouped[key].lastWrongAt = r.date;
        }
        const sorted = Object.values(grouped).sort((a, b) => b.wrongCount - a.wrongCount);
        if (!cancelled) setMistakes(sorted);
      } catch {
        if (!cancelled) setMistakes([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div className="pr-empty">
        <div className="pr-empty-icon">🔒</div>
        <div className="pr-empty-title">{t('practice.mistakes_login_title', lang)}</div>
        <div className="pr-empty-desc">{t('practice.mistakes_login_desc', lang)}</div>
        <Link href="/auth/login?redirect=/practice?tab=mistakes" className="pr-empty-cta">{t('practice.go_login', lang)}</Link>
      </div>
    );
  }
  if (loading) return <SkeletonBlock rows={5} />;
  if (!mistakes || mistakes.length === 0) {
    return (
      <div className="pr-empty">
        <div className="pr-empty-icon">🎉</div>
        <div className="pr-empty-title">{t('practice.no_mistakes', lang)}</div>
        <div className="pr-empty-desc">{t('practice.no_mistakes_desc', lang)}</div>
        <Link href="/dictation" className="pr-empty-cta">{t('practice.go_dictation', lang)}</Link>
      </div>
    );
  }

  return (
    <div className="pr-recent-list">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, letterSpacing: '.16em', color: 'var(--hr-ink-3)', textTransform: 'uppercase' }}>
          {t('practice.words_need_work', lang, { n: mistakes.length })}
        </div>
        <Link href="/mine/mistakes?tab=dictation" style={{ fontFamily: 'var(--hr-sans)', fontSize: 12, color: 'var(--hr-pink-strong)', textDecoration: 'none', fontWeight: 600 }}>
          {t('practice.mistake_practice', lang)} ›
        </Link>
      </div>
      {mistakes.slice(0, 30).map(m => (
        <Link key={m.korean} href="/mine/mistakes?tab=dictation" className="pr-recent-row">
          <span className="pr-recent-chip peach">{t('practice.short_dictation', lang)}</span>
          <div className="pr-recent-body">
            <div className="pr-recent-title" style={{ fontFamily: 'var(--hr-hangul)', fontSize: 15 }}>{m.korean}</div>
            <div className="pr-recent-meta">{m.meaning || '—'}</div>
          </div>
          <div className="pr-recent-score">×{m.wrongCount}</div>
        </Link>
      ))}
    </div>
  );
}

/* ═════ SKELETON ═════ */
function SkeletonBlock({ rows }: { rows: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{
          height: 60, borderRadius: 12, background: 'var(--hr-surface-3)',
          border: '1px solid var(--hr-border-1)', opacity: .6,
        }} />
      ))}
    </div>
  );
}
