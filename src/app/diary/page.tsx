'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Lock } from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { Modal } from '@/components/ui';
import { TOTAL_DAYS_PER_LEVEL, isCheckpoint, getLevel } from '@/data/diary';
import type { ToriLevel } from '@/types/tori-diary';
import '@/components/diary/diary.css';

interface ChapterDef {
  num: string;
  romanNum: string;
  title: string;
  ko: string;
  startDay: number;
  endDay: number;
  tone: 'pink' | 'mint' | 'purple' | 'gold';
}

const CHAPTERS: ChapterDef[] = [
  { num: 'One',          romanNum: 'i',   title: '出发与落地',     ko: '출발과 첫걸음 · Day 1–7',   startDay: 1,  endDay: 7,  tone: 'pink' },
  { num: 'Two',          romanNum: 'ii',  title: '日常生活',       ko: '일상의 시작 · Day 8–14',   startDay: 8,  endDay: 14, tone: 'mint' },
  { num: 'Three',        romanNum: 'iii', title: '独立生活',       ko: '독립적인 생활 · Day 15–21', startDay: 15, endDay: 21, tone: 'purple' },
  { num: 'Four · final', romanNum: 'iv',  title: '社交融入与毕业', ko: '소속과 졸업 · Day 22–30',  startDay: 22, endDay: 30, tone: 'gold' },
];

const LEVELS: { key: ToriLevel; label: string; sub: string }[] = [
  { key: 'beginner',     label: '初级·生存期', sub: 'Day 1–30' },
  { key: 'intermediate', label: '中级·融入期', sub: 'Day 31–60' },
  { key: 'advanced',     label: '高级·蜕变期', sub: 'Day 61–90' },
];

export default function DiaryPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [activeLevel, setActiveLevel] = useState<ToriLevel>('beginner');
  const [completed, setCompleted] = useState<Record<ToriLevel, Set<number>>>({
    beginner: new Set(), intermediate: new Set(), advanced: new Set(),
  });
  const [loaded, setLoaded] = useState(false);
  const [showSoonModal, setShowSoonModal] = useState(false);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!user) { setLoaded(true); return; }
    (async () => {
      try {
        const rows = await db.toriProgress.toArray();
        const userRows = rows.filter((r) => r.userId === user.id);
        const next: Record<ToriLevel, Set<number>> = { beginner: new Set(), intermediate: new Set(), advanced: new Set() };
        userRows.forEach((r) => {
          const lvl = (r.level ?? 'beginner') as ToriLevel;
          if (r.completedAt) next[lvl].add(r.day);
        });
        setCompleted(next);
      } catch { /* ignore */ }
      finally { setLoaded(true); }
    })();
  }, [user]);

  const isLevelUnlocked = (level: ToriLevel): boolean => {
    if (isAdmin) return true;
    if (level === 'beginner') return true;
    if (level === 'intermediate') return completed.beginner.size >= TOTAL_DAYS_PER_LEVEL;
    return completed.intermediate.size >= TOTAL_DAYS_PER_LEVEL;
  };

  const completedDays = completed[activeLevel];
  const currentDay = Math.min(Math.max(0, ...Array.from(completedDays)) + 1, TOTAL_DAYS_PER_LEVEL) || 1;
  const allDaysForLevel = getLevel(activeLevel);
  const currentDayData = allDaysForLevel.find((d) => d.day === currentDay);
  const currentDayTitle = currentDayData?.title ?? `Day ${currentDay}`;
  const progressPct = Math.round((completedDays.size / TOTAL_DAYS_PER_LEVEL) * 100);
  const allCleared = completedDays.size >= TOTAL_DAYS_PER_LEVEL;
  const remainDays = TOTAL_DAYS_PER_LEVEL - completedDays.size;

  const handleDayClick = (day: number) => {
    if (!isLevelUnlocked(activeLevel)) { setShowSoonModal(true); return; }
    if (isAdmin) { router.push(`/diary/${activeLevel}/${day}`); return; }
    if (activeLevel === 'beginner' && day === 1) { router.push('/diary/beginner/1'); return; }
    // progressive unlock: only allow if previous day done or is next day
    if (completedDays.has(day - 1) || day === currentDay) {
      router.push(`/diary/${activeLevel}/${day}`);
    } else {
      setShowSoonModal(true);
    }
  };

  // ── Loading
  if (authLoading || !loaded) {
    return (
      <div className="diary-fullscreen">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div className="diary-v4-loading">加载中…</div>
        </div>
      </div>
    );
  }

  // ── Not logged in
  if (!user) {
    return (
      <div className="diary-fullscreen">
        <button aria-label="关闭" className="diary-v4-close" onClick={() => router.back()}>
          <X size={18} strokeWidth={1.75} />
        </button>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '120px 24px 40px', textAlign: 'center' }}>
          <h1 className="diary-v4-h1" style={{ marginBottom: 16, textAlign: 'center' }}>
            兔莉的<wbr /><span className="diary-v4-h1-br" />韩语日记
          </h1>
          <p style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 15, color: 'var(--color-ink-2)', marginBottom: 28, lineHeight: 1.85 }}>
            90 天，三个阶段，从零到流利。<br />登录后开始你的第 1 天。
          </p>
          <Link href="/auth/login?redirect=/diary" style={{ textDecoration: 'none' }}>
            <button className="diary-list-cta" style={{ display: 'inline-flex', width: 'auto' }}>
              <span style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 16, fontWeight: 700, letterSpacing: '0.02em', padding: '0 8px' }}>登录 · 开始 Day 1</span>
              <span className="diary-list-cta-arrow">→</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const heroContent = (
    <>
      <p className="diary-v4-eyebrow">a story of 90 days</p>
      <p className="diary-v4-ko-title">토리의 한국어 일기</p>
      <h1 className="diary-v4-h1">兔莉的<wbr /><span className="diary-v4-h1-br" />韩语日记</h1>

      <div className="diary-v4-lead-card">
        <p className="diary-v4-lead">90 天，三个阶段，<br />每天 15 分钟，跟兔莉一起从零学韩语。</p>
      </div>

      <div className="diary-v4-illust">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/diary/tori-bedroom-hero.png" alt="Tori 在卧室准备出发去首尔" />
        <span className="diary-v4-illust-tag">{allCleared ? '已完成' : `${activeLevel === 'beginner' ? '初级' : activeLevel === 'intermediate' ? '中级' : '高级'} Day ${currentDay} · ${currentDayTitle}`}</span>
      </div>

      <div className="diary-v4-progress">
        <div className="diary-v4-progress-top">
          <span className="diary-v4-progress-label">your progress · {remainDays > 0 ? `还剩 ${remainDays} 天` : '已完成'}</span>
          <span className="diary-v4-progress-value">
            {completedDays.size}<span className="diary-v4-progress-total">/{TOTAL_DAYS_PER_LEVEL}</span>
          </span>
        </div>
        <div className="diary-v4-progress-bar">
          <div className="diary-v4-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {isAdmin || (!allCleared && currentDay === 1 && activeLevel === 'beginner') ? (
        <Link
          href={allCleared ? '/diary/stickers' : `/diary/${activeLevel}/${currentDay}`}
          className="diary-v4-cta"
          style={{ textDecoration: 'none' }}
        >
          <div className="diary-v4-cta-left">
            <div className="diary-v4-cta-label">{allCleared ? 'congratulations' : 'continue'}</div>
            <div className="diary-v4-cta-next">
              {allCleared ? '查看毕业贴纸册' : `Day ${currentDay} · ${currentDayTitle}`}
            </div>
          </div>
          <div className="diary-v4-cta-arrow">→</div>
        </Link>
      ) : (
        <button onClick={() => setShowSoonModal(true)} className="diary-v4-cta">
          <div className="diary-v4-cta-left">
            <div className="diary-v4-cta-label">{allCleared ? 'congratulations' : 'continue'}</div>
            <div className="diary-v4-cta-next">
              {allCleared ? '查看毕业贴纸册' : `Day ${currentDay} · ${currentDayTitle}`}
            </div>
          </div>
          <div className="diary-v4-cta-arrow">→</div>
        </button>
      )}
    </>
  );

  const levelTabs = (
    <div style={{ display: 'flex', gap: 0, marginBottom: 28, marginTop: 8, borderBottom: '1px solid var(--diary-line)' }}>
      {LEVELS.map((lv) => {
        const active = lv.key === activeLevel;
        const locked = !isLevelUnlocked(lv.key);
        return (
          <button
            key={lv.key}
            onClick={() => setActiveLevel(lv.key)}
            style={{
              flex: 1,
              padding: '10px 4px 8px',
              background: 'transparent',
              border: 'none',
              borderBottom: active ? '2.5px solid var(--diary-stamp-red)' : '2.5px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              transition: 'opacity 0.15s',
              opacity: locked ? 0.45 : 1,
            }}
          >
            <span style={{
              fontFamily: 'var(--diary-v4-serif)',
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: active ? 'var(--diary-stamp-red)' : 'var(--diary-ink)',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {locked && <Lock size={10} />}
              {lv.label}
            </span>
            <span style={{
              fontFamily: 'var(--diary-v4-serif)',
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: '0.06em',
              color: active ? 'var(--diary-stamp-red)' : 'var(--diary-ink-soft)',
            }}>
              {lv.sub}
            </span>
          </button>
        );
      })}
    </div>
  );

  const unlocked = isLevelUnlocked(activeLevel);

  const chaptersContent = (
    <div className="diary-v4-chapters">
      {levelTabs}
      {!unlocked ? (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <Lock size={40} strokeWidth={1.5} style={{ marginBottom: 14, color: 'var(--color-ink-4)' }} />
          <p style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 15, fontWeight: 700, color: 'var(--color-ink-1)', marginBottom: 8 }}>
            {activeLevel === 'intermediate' ? '完成初级 30 天后解锁' : '完成中级 30 天后解锁'}
          </p>
          <p style={{ fontSize: 13, color: 'var(--color-ink-3)' }}>加油，完成上一阶段就能解锁这里</p>
        </div>
      ) : (
        CHAPTERS.map((ch) => {
          const days: number[] = [];
          for (let d = ch.startDay; d <= ch.endDay; d++) days.push(d);
          const chapterDone = days.filter((d) => completedDays.has(d)).length;
          const chapterTotal = days.length;
          const status = chapterDone === chapterTotal ? '已完成' : chapterDone > 0 ? '进行中' : '未开启';

          return (
            <article key={ch.num} className="diary-v4-chapter" data-tone={ch.tone}>
              <header className="diary-v4-chapter-band" data-num={ch.romanNum}>
                <div className="diary-v4-chapter-band-head">
                  <div>
                    <p className="diary-v4-chap-num">Chapter {ch.num}</p>
                    <h2 className="diary-v4-chap-h2">{ch.title}</h2>
                    <p className="diary-v4-chap-ko">{ch.ko}</p>
                  </div>
                  <div className="diary-v4-chap-stats">
                    <span className="diary-v4-chap-stats-num">{chapterDone}/{chapterTotal}</span>
                    <span className="diary-v4-chap-stats-label">{status}</span>
                  </div>
                </div>
              </header>
              <div className="diary-v4-chapter-body">
                <div className="diary-v4-days">
                  {days.map((d) => {
                    const dayData = allDaysForLevel.find((x) => x.day === d);
                    const dayTitle = dayData?.title ?? `Day ${d}`;
                    const daySub = dayData?.subtitle ?? '';
                    const locked = !isAdmin && !completedDays.has(d) && d !== currentDay && !(d === 1 && activeLevel === 'beginner');
                    const done = completedDays.has(d);
                    const current = d === currentDay && !done;
                    const checkpoint = isCheckpoint(d);

                    const classNames = [
                      'diary-v4-day',
                      done && 'is-done',
                      current && 'is-current',
                      locked && 'is-locked',
                      checkpoint && !current && 'is-checkpoint',
                    ].filter(Boolean).join(' ');

                    return (
                      <button
                        key={d}
                        onClick={() => handleDayClick(d)}
                        disabled={locked && !isAdmin}
                        className={classNames}
                      >
                        <div className="diary-v4-day-num">{String(d).padStart(2, '0')}</div>
                        <div className="diary-v4-day-body">
                          <div className="diary-v4-day-title">{dayTitle}</div>
                          {daySub && <div className="diary-v4-day-sub">{daySub}</div>}
                        </div>
                        <span className="diary-v4-day-marker">
                          {current ? 'TODAY' : done && checkpoint ? 'CLEARED' : done ? '✓' : checkpoint ? '◆' : '·'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })
      )}
    </div>
  );

  return (
    <div className="diary-fullscreen">
      <button aria-label="关闭" className="diary-v4-close" onClick={() => router.back()}>
        <X size={18} strokeWidth={1.75} />
      </button>

      <div className="diary-v4-layout">
        <aside className="diary-v4-sidecol">
          <div className="diary-v4-brand-mini">tori diary</div>
          {heroContent}
        </aside>
        <main className="diary-v4-maincol">
          {chaptersContent}
        </main>
      </div>

      <Modal open={showSoonModal} onClose={() => setShowSoonModal(false)} size="sm" closeButton={false}>
        <div style={{ textAlign: 'center', padding: '4px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🥕</div>
          <h2 style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 20, fontWeight: 800, marginBottom: 10, color: 'var(--color-ink-1)', letterSpacing: '0.02em' }}>
            请按顺序学习
          </h2>
          <p style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 14, lineHeight: 1.85, color: 'var(--color-ink-3)', marginBottom: 22, letterSpacing: '0.02em' }}>
            完成前一天的内容后才能解锁下一天，加油！
          </p>
          <button onClick={() => setShowSoonModal(false)} className="diary-list-cta" style={{ width: '100%' }}>
            <span style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 15, fontWeight: 700, letterSpacing: '0.02em', flex: 1 }}>明白了</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
