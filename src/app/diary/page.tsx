'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { Modal } from '@/components/ui';
import { TOTAL_DAYS, isCheckpoint, days as ALL_DAYS } from '@/data/diary';
import '@/components/diary/diary.css';

interface ChapterDef {
  num: string;
  title: string;
  ko: string;
  rangeLabel: string;
  startDay: number;
  endDay: number;
}

const CHAPTERS: ChapterDef[] = [
  { num: 'One',          title: '出发与落地',     ko: '출발과 첫걸음 · Day 1–7',   rangeLabel: '1–7',   startDay: 1,  endDay: 7  },
  { num: 'Two',          title: '日常生活',       ko: '일상의 시작 · Day 8–14',   rangeLabel: '8–14',  startDay: 8,  endDay: 14 },
  { num: 'Three',        title: '独立生活',       ko: '독립적인 생활 · Day 15–21', rangeLabel: '15–21', startDay: 15, endDay: 21 },
  { num: 'Four · final', title: '社交融入与毕业', ko: '소속과 졸업 · Day 22–30',  rangeLabel: '22–30', startDay: 22, endDay: 30 },
];

export default function DiaryPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [currentDay, setCurrentDay] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [showSoonModal, setShowSoonModal] = useState(false);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!user) { setLoaded(true); return; }
    (async () => {
      try {
        const rows = await db.toriProgress.toArray();
        const userRows = rows.filter((r) => r.userId === user.id);
        const done = new Set<number>();
        userRows.forEach((r) => { if (r.completedAt) done.add(r.day); });
        setCompletedDays(done);
        const next = Math.min(Math.max(0, ...Array.from(done)) + 1, TOTAL_DAYS);
        setCurrentDay(next || 1);
      } catch { /* ignore */ }
      finally { setLoaded(true); }
    })();
  }, [user]);

  const handleDayClick = (day: number) => {
    if (isAdmin) {
      router.push(`/diary/${day}`);
      return;
    }
    if (day > currentDay) return;
    setShowSoonModal(true);
  };

  const currentDayData = ALL_DAYS.find((d) => d.day === currentDay);
  const currentDayTitle = currentDayData?.title ?? `Day ${currentDay}`;
  const progressPct = Math.round((completedDays.size / TOTAL_DAYS) * 100);
  const allCleared = completedDays.size === TOTAL_DAYS;

  // ── Loading
  if (authLoading || !loaded) {
    return (
      <div className="diary-root diary-list-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="diary-handwriting-zh" style={{ color: 'var(--color-ink-3)' }}>加载中…</div>
      </div>
    );
  }

  // ── Not logged in
  if (!user) {
    return (
      <div className="diary-root diary-list-page" style={{ minHeight: '100vh' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '64px 24px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🐰</div>
          <h1 className="diary-list-h1" style={{ marginBottom: 12 }}>兔莉的韩语日记</h1>
          <p style={{ fontSize: 14, color: 'var(--color-ink-2)', marginBottom: 28, lineHeight: 1.65 }}>
            30 天，和兔莉一起从零学韩语。<br />登录后开始你的第 1 天。
          </p>
          <Link href="/auth/login?redirect=/diary" style={{ textDecoration: 'none' }}>
            <button className="diary-btn diary-btn-primary">登录 · 开始 Day 1</button>
          </Link>
        </div>
      </div>
    );
  }

  const heroContent = (
    <>
      <p className="diary-list-eyebrow">a story of 30 days</p>
      <p className="diary-list-ko">토리의 한국어 일기</p>
      <h1 className="diary-list-h1">兔莉的<br />韩语日记。</h1>
      <p className="diary-list-lead">从中国家里到首尔动物城。<br />每天 15 分钟，跟兔莉一起。</p>

      <div className="diary-list-progress">
        <div className="diary-list-progress-top">
          <span className="diary-list-progress-label">your progress</span>
          <span className="diary-list-progress-value">
            {completedDays.size}<span className="diary-list-progress-value-total"> / {TOTAL_DAYS}</span>
          </span>
        </div>
        <div className="diary-list-progress-bar">
          <div className="diary-list-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {isAdmin ? (
        <Link href={allCleared ? '/diary/stickers' : `/diary/${currentDay}`} className="diary-list-cta" style={{ textDecoration: 'none' }}>
          <div className="diary-list-cta-left">
            <div className="diary-list-cta-label">{allCleared ? 'congratulations' : 'continue'}</div>
            <div className="diary-list-cta-next">
              {allCleared ? '查看毕业贴纸册' : `Day ${currentDay} · ${currentDayTitle}`}
            </div>
          </div>
          <div className="diary-list-cta-arrow">→</div>
        </Link>
      ) : (
        <button onClick={() => setShowSoonModal(true)} className="diary-list-cta">
          <div className="diary-list-cta-left">
            <div className="diary-list-cta-label">{allCleared ? 'congratulations' : 'continue'}</div>
            <div className="diary-list-cta-next">
              {allCleared ? '查看毕业贴纸册' : `Day ${currentDay} · ${currentDayTitle}`}
            </div>
          </div>
          <div className="diary-list-cta-arrow">→</div>
        </button>
      )}
    </>
  );

  const chaptersContent = (
    <div className="diary-list-chapters">
      {CHAPTERS.map((ch) => {
        const days: number[] = [];
        for (let d = ch.startDay; d <= ch.endDay; d++) days.push(d);
        const chapterDone = days.filter((d) => completedDays.has(d)).length;
        const chapterTotal = days.length;
        const status = chapterDone === chapterTotal ? '已完成' : chapterDone > 0 ? '进行中' : '未开启';

        return (
          <section key={ch.num} className="diary-list-chapter">
            <header className="diary-list-chapter-head">
              <div>
                <p className="diary-list-chap-num">Chapter {ch.num}</p>
                <h2 className="diary-list-chap-h2">{ch.title}</h2>
                <p className="diary-list-chap-ko">{ch.ko}</p>
              </div>
              <div className="diary-list-chap-stats">
                <span className="diary-list-chap-stats-num">{chapterDone}/{chapterTotal}</span>
                {status}
              </div>
            </header>

            <div className="diary-list-days">
              {days.map((d) => {
                const dayData = ALL_DAYS.find((x) => x.day === d);
                const dayTitle = dayData?.title ?? `Day ${d}`;
                const daySub = dayData?.subtitle ?? '';
                const locked = !isAdmin && d > currentDay;
                const done = completedDays.has(d);
                const current = d === currentDay && !done;
                const checkpoint = isCheckpoint(d);

                const classNames = [
                  'diary-list-day',
                  done && 'is-done',
                  current && 'is-current',
                  locked && 'is-locked',
                  // current 优先：current+checkpoint 同日时不附加 is-checkpoint，避免金色覆盖 TODAY
                  checkpoint && !current && 'is-checkpoint',
                ].filter(Boolean).join(' ');

                return (
                  <button
                    key={d}
                    onClick={() => handleDayClick(d)}
                    disabled={locked}
                    className={classNames}
                  >
                    <div className="diary-list-day-num">{String(d).padStart(2, '0')}</div>
                    <div className="diary-list-day-body">
                      <div className="diary-list-day-title">{dayTitle}</div>
                      <div className="diary-list-day-sub">
                        {daySub && <span className="diary-list-day-sub-ko">{daySub}</span>}
                      </div>
                    </div>
                    <span className="diary-list-day-marker">
                      {current ? 'TODAY' : done && checkpoint ? 'CLEARED' : done ? '✓' : checkpoint ? '◆' : '·'}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );

  return (
    <div className="diary-root diary-list-page">
      {/* 桌面端 980+: 左 sidebar + 右 main */}
      <div className="diary-list-layout">
        <aside className="diary-list-sidecol diary-list-hero">
          {heroContent}
        </aside>
        <main className="diary-list-maincol">
          {chaptersContent}
        </main>
      </div>

      {/* 移动端 < 980: hero 顶部 + 章节下方（CSS 媒体查询塌成单列） */}

      <Modal open={showSoonModal} onClose={() => setShowSoonModal(false)} size="sm" closeButton={false}>
        <div style={{ textAlign: 'center', padding: '4px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🥕</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, color: 'var(--color-ink-1)', letterSpacing: '-0.02em' }}>
            这一关还在准备中
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-ink-3)', marginBottom: 22 }}>
            Tori 在首尔的故事正在打磨细节。
            <br />预计本周开放，到时候你就能陪她一起过这 30 天了。
          </p>
          <button onClick={() => setShowSoonModal(false)} className="diary-btn diary-btn-primary" style={{ width: '100%' }}>
            好的，下周来
          </button>
        </div>
      </Modal>
    </div>
  );
}
