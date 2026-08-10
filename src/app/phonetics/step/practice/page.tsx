'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useSmartBack } from '@/lib/useSmartBack';
import { readAll, fmtTime, type PracticeMode, type PracticeStats, type PracticeRow } from '@/lib/practice/aggregate';
import { useTheme } from '@/components/ThemeProvider';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';
import PlaceIntro from '@/components/PlaceIntro';
import { MobileRedirect } from '@/components/practice/MobileRedirect';
import './practice-redesign.css';

type Tab = 'mode' | 'mistakes';

interface ModeMeta {
  key: PracticeMode;
  name: string;
  kr: string;
  desc: string;
  tone: 'speak' | 'dict' | 'write' | 'type';
  href: string;
}

const MODES: ModeMeta[] = [
  { key: 'listening', name: 'practice.short_speaking',  kr: '말하기',    desc: 'practice.hub_speaking_desc',  tone: 'speak', href: '/speaking' },
  { key: 'dictation', name: 'practice.short_dictation', kr: '받아쓰기',  desc: 'practice.hub_dictation_desc', tone: 'dict',  href: '/dictation' },
  { key: 'writing',   name: 'practice.short_writing',   kr: '쓰기',      desc: 'practice.hub_writing_desc',   tone: 'write', href: '/writing' },
  { key: 'typing',    name: 'practice.short_typing',    kr: '타자 연습', desc: 'practice.hub_typing_desc',    tone: 'type',  href: '/typing' },
];

export default function PracticePage() {
  const smartBack = useSmartBack('/learning');
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { theme } = useTheme();
  const { lang } = useLang();
  const initialTab = (searchParams.get('tab') as Tab) || 'mode';
  const [tab, setTab] = useState<Tab>(initialTab === 'mistakes' ? 'mistakes' : 'mode');

  const [stats, setStats] = useState<PracticeStats | null>(null);
  const [recent, setRecent] = useState<PracticeRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    readAll(user?.id, 8, lang)
      .then(({ stats: s, recent: r }) => {
        if (cancelled) return;
        setStats(s);
        setRecent(r);
        setLoaded(true);
      })
      .catch(e => {
        if (!cancelled) { console.error('[practice hub] readAll failed', e); setStats(null); setRecent([]); setLoaded(true); }
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
  const goal = 4;
  const remaining = Math.max(0, goal - modesDone);
  const pct = Math.min(100, Math.round((modesDone / goal) * 100));
  const streak = stats?.streak ?? 0;
  const weeklyTotal = stats?.weekly?.reduce((a, b) => a + b, 0) ?? 0;

  // Ring chart
  const r = 33;
  const circumference = 2 * Math.PI * r;
  const dashoffset = circumference * (1 - pct / 100);

  // Push card: most recent practice item
  const pushItem = recent.length > 0 ? recent[0] : null;
  const pushMeta = pushItem ? MODES.find(m => m.key === pushItem.mode) : null;

  return (
    <div className="pr-scope">
      <MobileRedirect to="/practice-v2" />
      <PlaceIntro place="practice" dark={theme === 'dark'} />
      <div className="hr-stage">
        <div className="hr-mobile-back">
          <button className="hr-mobile-back-btn" onClick={smartBack} aria-label={t('practice.back', lang)}>
            <ArrowLeft size={14} /> {t('practice.back', lang)}
          </button>
        </div>

        {/* ── 品牌抬头 ── */}
        <header className="hr-page-head">
          <div className="hr-brand">
            <div className="hr-brand-mark">Tori</div>
            <div className="hr-brand-kr">연습</div>
            <div className="hr-brand-sub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c1 4-2 5-2 8a2 2 0 0 0 4 0c0-1 1-2 1-2 2 2 3 4 3 6a6 6 0 0 1-12 0c0-4 4-6 6-12Z" />
              </svg>
              {t('practice.streak_n_days', lang, { n: streak })}
            </div>
          </div>
          <div className="hr-brand-sub" data-md-show>{t('practice.brand_tagline', lang)}</div>
        </header>

        {/* ── 分段控件 ── */}
        <div className="pr-seg" role="tablist" aria-label={t('practice.center', lang)}>
          <button
            role="tab"
            aria-selected={tab === 'mode'}
            className={tab === 'mode' ? 'on' : ''}
            onClick={() => switchTab('mode')}
          >
            {t('practice.tab_today', lang)}
          </button>
          <button
            role="tab"
            aria-selected={tab === 'mistakes'}
            className={tab === 'mistakes' ? 'on' : ''}
            onClick={() => switchTab('mistakes')}
          >
            {t('practice.tab_mistakes', lang)}
          </button>
        </div>

        {/* ── 今日训练 ── */}
        {tab === 'mode' && !loaded && <SkeletonBlock rows={4} />}

        {tab === 'mode' && loaded && (
          <div className="pr-hub-layout">
            <div className="pr-hub-col">
          <div className="pr-screen">
            {/* Ring chart hero */}
            <div className="pr-dash">
              <div className="pr-ring">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r={r} fill="none" stroke="var(--hr-border-1)" strokeWidth="8" />
                  <circle
                    cx="40" cy="40" r={r} fill="none"
                    stroke={pct >= 100 ? 'var(--hr-good)' : 'var(--hr-coral)'}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                    style={{ transition: 'stroke-dashoffset .6s cubic-bezier(.22,1,.36,1), stroke .4s' }}
                  />
                </svg>
                <div className="pr-ring-txt">
                  <b>{modesDone}</b><s>/{goal}</s>
                </div>
              </div>
              <div className="pr-dash-body">
                <div className="pr-dash-hi">{t('practice.trained_n_today', lang, { n: modesDone })}</div>
                <div className="pr-dash-line">
                  {pct >= 100
                    ? t('practice.goal_all_done', lang)
                    : t('practice.goal_n_remain', lang, { n: remaining })}
                </div>
                <div className="pr-dash-stats">
                  <div className="pr-dash-stat">
                    <b className="fire">{streak}</b>
                    <s>{t('practice.stat_streak', lang)}</s>
                  </div>
                  <div className="pr-dash-stat">
                    <b>{weeklyTotal}</b>
                    <s>{t('practice.stat_week', lang)}</s>
                  </div>
                </div>
              </div>
            </div>

            {/* Push card · 接着练下去 */}
            {pushItem && pushMeta && (
              <Link href={pushItem.href} className={`pr-push ${pushMeta.tone}`}>
                <div className="pr-push-ico">
                  <ModeIcon mode={pushMeta.key} />
                </div>
                <div className="pr-push-tag">{t('practice.last_half_done', lang)}</div>
                <div className="pr-push-t">{t(pushMeta.name, lang)}<span className="kr">{pushMeta.kr}</span></div>
                <div className="pr-push-d">{t('practice.resume_hint', lang, { meta: pushItem.meta })}</div>
                <div className="pr-push-cta">
                  {t('practice.continue_btn', lang)}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )}

            {/* 全部练习 */}
            <div className="pr-sec">
              <div className="pr-sec-t">{t('practice.all_modes', lang)}</div>
            </div>
            <div className="pr-rows">
              {MODES.map(m => {
                const done = doneOf(m.key, stats);
                const metric = modeMetric(m.key, stats, lang);
                return (
                  <Link key={m.key} href={m.href} className={`pr-row ${m.tone}`}>
                    <div className="pr-row-ico">
                      <ModeIcon mode={m.key} />
                    </div>
                    <div className="pr-row-body">
                      <div className="pr-row-t">{t(m.name, lang)}<span className="kr">{m.kr}</span></div>
                      <div className="pr-row-d">{t(m.desc, lang)}</div>
                    </div>
                    {!done && metric && (
                      <div className="pr-row-meta">
                        <b>{metric.value}</b>
                        <s>{metric.label}</s>
                      </div>
                    )}
                    {done && (
                      <div className="pr-row-done">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m5 13 4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
            </div>
            <HubRail stats={stats} recent={recent} loggedIn={!!user?.id} lang={lang} />
          </div>
        )}

        {/* ── 错题本 ── */}
        {tab === 'mistakes' && (
          <div className="pr-hub-layout">
            <div className="pr-hub-col">
              <div className="pr-screen">
                <MistakesTab loggedIn={!!user?.id} lang={lang} />
              </div>
            </div>
            <HubRail stats={stats} recent={recent} loggedIn={!!user?.id} lang={lang} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ═════ HELPERS ═════ */

function doneOf(key: PracticeMode, stats: PracticeStats | null): boolean {
  if (!stats) return false;
  return stats[key].doneToday;
}

function modeMetric(key: PracticeMode, stats: PracticeStats | null, _lang: Lang): { value: string; label: string } | null {
  if (!stats) return null;
  switch (key) {
    case 'listening':
      if (!stats.listening.today && !stats.listening.total) return null;
      return { value: String(stats.listening.total), label: _lang === 'zh' ? '次' : 'times' };
    case 'dictation':
      return { value: stats.dictation.total ? `${stats.dictation.accuracy}%` : '–', label: _lang === 'zh' ? '准确率' : 'accuracy' };
    case 'writing':
      if (!stats.writing.total) return null;
      return { value: String(stats.writing.total), label: _lang === 'zh' ? '篇' : 'pieces' };
    case 'typing':
      if (!stats.typing.bestWpm) return null;
      return { value: String(stats.typing.bestWpm), label: 'WPM' };
  }
}

/* ═════ INLINE SVG ICONS ═════ */

function ModeIcon({ mode }: { mode: PracticeMode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      {mode === 'listening' && (
        <>
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <path d="M12 19v3" />
        </>
      )}
      {mode === 'dictation' && (
        <>
          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        </>
      )}
      {mode === 'writing' && (
        <>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </>
      )}
      {mode === 'typing' && (
        <>
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 10h.01M10 10h.01M14 10h.01M8 14h8" />
        </>
      )}
    </svg>
  );
}

/* ═════ DESKTOP RAIL ═════ */

const RAIL_MODES: { key: PracticeMode; name: string; kr: string; tone: string; href: string }[] = [
  { key: 'listening', name: 'practice.short_speaking',  kr: '말하기',    tone: 'speak', href: '/speaking' },
  { key: 'dictation', name: 'practice.short_dictation', kr: '받아쓰기',  tone: 'dict',  href: '/dictation' },
  { key: 'writing',   name: 'practice.short_writing',   kr: '쓰기',      tone: 'write', href: '/writing' },
  { key: 'typing',    name: 'practice.short_typing',    kr: '타자',      tone: 'type',  href: '/typing' },
];

function HubRail({ stats, recent, loggedIn, lang }: { stats: PracticeStats | null; recent: PracticeRow[]; loggedIn: boolean; lang: Lang }) {
  return (
    <aside className="pr-hub-rail" aria-label={t('practice.rail_aria', lang)}>
      <div className="pr-hub-card">
        <div className="pr-hub-card-title">{t('practice.today_checkin', lang)}</div>
        <div className="pr-hub-tasks">
          {RAIL_MODES.map(m => {
            const done = stats ? stats[m.key].doneToday : false;
            return (
              <Link key={m.key} href={m.href} className={`pr-hub-task${done ? ' done' : ''}`}>
                <span className="pr-hub-task-ico" aria-hidden>
                  {done ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 13 4 4L19 7"/></svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/></svg>
                  )}
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
                  <span className={`pr-hub-recent-chip ${meta?.tone ?? 'type'}`}>{meta ? t(meta.name, lang) : t('practice.generic', lang)}</span>
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

/* ═════ MISTAKES TAB ═════ */

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
        <Link href="/mine/mistakes?tab=dictation" style={{ fontFamily: 'var(--hr-sans)', fontSize: 12, color: 'var(--hr-write)', textDecoration: 'none', fontWeight: 600 }}>
          {t('practice.mistake_practice', lang)} ›
        </Link>
      </div>
      {mistakes.slice(0, 30).map(m => (
        <Link key={m.korean} href="/mine/mistakes?tab=dictation" className="pr-recent-row">
          <span className="pr-recent-chip dict">{t('practice.short_dictation', lang)}</span>
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
