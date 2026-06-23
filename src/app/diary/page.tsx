'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { Modal } from '@/components/ui';
import { TOTAL_DAYS, isCheckpoint, days as ALL_DAYS } from '@/data/diary';
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
    if (isAdmin) { router.push(`/diary/${day}`); return; }
    if (day === 1) { router.push('/diary/1'); return; }
    setShowSoonModal(true);
  };

  const currentDayData = ALL_DAYS.find((d) => d.day === currentDay);
  const currentDayTitle = currentDayData?.title ?? `Day ${currentDay}`;
  const progressPct = Math.round((completedDays.size / TOTAL_DAYS) * 100);
  const allCleared = completedDays.size === TOTAL_DAYS;
  const remainDays = TOTAL_DAYS - completedDays.size;

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
        <button
          aria-label="关闭"
          className="diary-v4-close"
          onClick={() => router.back()}
        >
          <X size={18} strokeWidth={1.75} />
        </button>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '120px 24px 40px', textAlign: 'center' }}>
          <h1 className="diary-v4-h1" style={{ marginBottom: 16, textAlign: 'center' }}>
            兔莉的<wbr /><span className="diary-v4-h1-br" />韩语日记
          </h1>
          <p style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 15, color: 'var(--color-ink-2)', marginBottom: 28, lineHeight: 1.85 }}>
            30 天，和兔莉一起从零学韩语。<br />登录后开始你的第 1 天。
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
      <p className="diary-v4-eyebrow">a story of 30 days</p>
      <p className="diary-v4-ko-title">토리의 한국어 일기</p>
      <h1 className="diary-v4-h1">兔莉的<wbr /><span className="diary-v4-h1-br" />韩语日记</h1>

      <div className="diary-v4-lead-card">
        <p className="diary-v4-lead">30 天，从中国家里到首尔动物城，<br />每天 15 分钟，跟兔莉一起零基础学习韩语。</p>
      </div>

      {/* 16:9 hero 横幅 */}
      <div className="diary-v4-illust">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/diary/tori-bedroom-hero.png" alt="Tori 在卧室准备出发去首尔" />
        <span className="diary-v4-illust-tag">{allCleared ? '已毕业' : `Day ${currentDay} · ${currentDayTitle}`}</span>
      </div>

      <div className="diary-v4-progress">
        <div className="diary-v4-progress-top">
          <span className="diary-v4-progress-label">your progress · {remainDays > 0 ? `还剩 ${remainDays} 天` : '已完成'}</span>
          <span className="diary-v4-progress-value">
            {completedDays.size}<span className="diary-v4-progress-total">/{TOTAL_DAYS}</span>
          </span>
        </div>
        <div className="diary-v4-progress-bar">
          <div className="diary-v4-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {isAdmin || (!allCleared && currentDay === 1) ? (
        <Link
          href={allCleared ? '/diary/stickers' : `/diary/${currentDay}`}
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

  const chaptersContent = (
    <div className="diary-v4-chapters">
      {CHAPTERS.map((ch) => {
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
                  const dayData = ALL_DAYS.find((x) => x.day === d);
                  const dayTitle = dayData?.title ?? `Day ${d}`;
                  const daySub = dayData?.subtitle ?? '';
                  const locked = !isAdmin && d !== 1;
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
                      disabled={locked}
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
      })}
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
            这一关还在准备中
          </h2>
          <p style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 14, lineHeight: 1.85, color: 'var(--color-ink-3)', marginBottom: 22, letterSpacing: '0.02em' }}>
            Tori 在首尔的故事正在打磨细节。
            <br />预计本周开放，到时候你就能陪她一起过这 30 天了。
          </p>
          <button onClick={() => setShowSoonModal(false)} className="diary-list-cta" style={{ width: '100%' }}>
            <span style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 15, fontWeight: 700, letterSpacing: '0.02em', flex: 1 }}>好的，下周来</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
