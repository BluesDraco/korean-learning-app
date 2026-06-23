'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Sparkles, BookMarked, Flag } from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { Modal } from '@/components/ui';
import { TOTAL_DAYS, isCheckpoint, weekOf } from '@/data/diary';
import '@/components/diary/diary.css';

const WEEK_TITLES: Record<1 | 2 | 3 | 4, { title: string; subtitle: string }> = {
  1: { title: 'Week 1', subtitle: '准备出发到落地报到' },
  2: { title: 'Week 2', subtitle: '日常生活技能' },
  3: { title: 'Week 3', subtitle: '独立生活技能' },
  4: { title: 'Week 4', subtitle: '社交融入 + 毕业' },
};

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
        userRows.forEach((r) => {
          if (r.completedAt) done.add(r.day);
        });
        setCompletedDays(done);
        // 当前 day = 最大已完成 + 1，但不超过 30
        const next = Math.min(Math.max(0, ...Array.from(done)) + 1, TOTAL_DAYS);
        setCurrentDay(next || 1);
      } catch { /* ignore */ }
      finally { setLoaded(true); }
    })();
  }, [user]);

  const handleDayClick = (day: number) => {
    if (day > currentDay) return; // 锁定
    if (!isAdmin) {
      setShowSoonModal(true);
      return;
    }
    router.push(`/diary/${day}`);
  };

  if (authLoading || !loaded) {
    return (
      <div className="diary-root diary-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="diary-handwriting-zh" style={{ color: 'var(--diary-ink-soft)' }}>加载中…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="diary-root diary-page" style={{ minHeight: '100vh' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '64px 24px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🐰</div>
          <h1 className="diary-h1 diary-handwriting-zh" style={{ marginBottom: 12 }}>
            兔莉的韩语日记
          </h1>
          <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)', marginBottom: 28 }}>
            30 天，和兔莉一起从零学韩语。<br />
            登录后开始你的第 1 天。
          </p>
          <Link href="/auth/login?redirect=/diary" style={{ textDecoration: 'none' }}>
            <button className="diary-btn diary-btn-primary">登录 · 开始 Day 1</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="diary-root diary-page" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '24px 16px 40px' }}>
        {/* Hero */}
        <div
          className="diary-card-paper"
          style={{
            padding: '28px 24px',
            marginBottom: 28,
            background: 'linear-gradient(135deg, #fdf4e3, #fcf7ec)',
            border: '1.5px solid var(--diary-gold-soft)',
            position: 'relative',
          }}
        >
          <span className="diary-tape diary-tape-pink" style={{ top: -8, left: 24 }} />
          <span className="diary-tape diary-tape-mint" style={{ top: -8, right: 36 }} />
          <p className="diary-eyebrow" style={{ marginBottom: 8 }}>토리의 한국어 일기</p>
          <h1 className="diary-h1 diary-handwriting-zh" style={{ marginBottom: 8 }}>
            兔莉的韩语日记
          </h1>
          <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)', marginBottom: 20 }}>
            30 天，从中国家里到首尔动物城。每天 15 分钟，跟兔莉一起。
          </p>

          {/* 进度 */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink)' }}>
                已完成 {completedDays.size} / {TOTAL_DAYS} 天
              </span>
              <span className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-gold-deep)', fontWeight: 700 }}>
                {Math.round((completedDays.size / TOTAL_DAYS) * 100)}%
              </span>
            </div>
            <div className="diary-progress-track">
              <div className="diary-progress-fill" style={{ width: `${(completedDays.size / TOTAL_DAYS) * 100}%` }} />
            </div>
          </div>

          {/* CTA */}
          {isAdmin ? (
            <Link href={`/diary/${currentDay}`} style={{ textDecoration: 'none' }}>
              <button className="diary-btn diary-btn-primary" style={{ width: '100%' }}>
                <Sparkles size={16} />
                {completedDays.size === 0 ? '开始 Day 1' : `继续 Day ${currentDay}`}
              </button>
            </Link>
          ) : (
            <button
              className="diary-btn diary-btn-primary"
              style={{ width: '100%' }}
              onClick={() => setShowSoonModal(true)}
            >
              <Sparkles size={16} />
              {completedDays.size === 0 ? '开始 Day 1' : `继续 Day ${currentDay}`}
            </button>
          )}

          <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center' }}>
            <Link href="/diary/stickers" style={{ textDecoration: 'none' }}>
              <button className="diary-btn diary-btn-ghost" style={{ padding: '6px 14px', fontSize: 'var(--diary-text-sm)' }}>
                <BookMarked size={13} /> 我的贴纸册
              </button>
            </Link>
          </div>
        </div>

        {/* Week sections */}
        {[1, 2, 3, 4].map((wk) => {
          const w = wk as 1 | 2 | 3 | 4;
          const startDay = (w - 1) * 7 + 1;
          const endDay = Math.min(w * 7 + (w === 4 ? 2 : 0), TOTAL_DAYS); // Week 4 = 22-30 (9 days)
          const realStart = w === 4 ? 22 : startDay;
          const realEnd = w === 4 ? 30 : Math.min(w * 7, TOTAL_DAYS);
          const days: number[] = [];
          for (let d = realStart; d <= realEnd; d++) days.push(d);

          return (
            <div key={wk} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
                <h2 className="diary-h3 diary-handwriting-zh" style={{ margin: 0 }}>
                  {WEEK_TITLES[w].title}
                </h2>
                <span className="diary-handwriting-zh diary-text-soft" style={{ fontSize: 'var(--diary-text-sm)' }}>
                  {WEEK_TITLES[w].subtitle}
                </span>
              </div>

              <div className="diary-grid-30">
                {days.map((d) => {
                  const locked = d > currentDay;
                  const done = completedDays.has(d);
                  const current = d === currentDay && !done;
                  const checkpoint = isCheckpoint(d);
                  return (
                    <button
                      key={d}
                      onClick={() => handleDayClick(d)}
                      className={`diary-day-cell ${locked ? 'locked' : ''} ${done ? 'done' : ''} ${current ? 'current' : ''}`}
                      disabled={locked}
                      title={
                        locked
                          ? `第 ${d} 天 · 未解锁`
                          : done
                            ? `第 ${d} 天 · 已完成`
                            : `第 ${d} 天${checkpoint ? ' · 关卡' : ''}`
                      }
                    >
                      {locked && (
                        <Lock size={14} color="var(--diary-ink-faint)" style={{ marginBottom: 4 }} />
                      )}
                      <span className="diary-day-num">{d}</span>
                      {checkpoint && !locked && (
                        <Flag size={11} color={d === 30 ? 'var(--diary-stamp-red)' : 'var(--diary-gold-deep)'} style={{ marginTop: 2 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 「本周开放」弹窗 */}
      <Modal
        open={showSoonModal}
        onClose={() => setShowSoonModal(false)}
        size="sm"
        closeButton={false}
      >
        <div style={{ textAlign: 'center', padding: '4px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🥕</div>
          <h2
            className="diary-handwriting-zh"
            style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, color: 'var(--color-ink-1, #241917)' }}
          >
            这一关还在准备中
          </h2>
          <p
            className="diary-handwriting-zh"
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: 'var(--color-ink-3, #89756e)',
              marginBottom: 22,
            }}
          >
            Tori 在首尔的故事正在打磨细节。
            <br />
            预计本周开放，到时候你就能陪她一起过这 30 天了。
          </p>
          <button
            onClick={() => setShowSoonModal(false)}
            className="diary-btn diary-btn-primary"
            style={{ width: '100%' }}
          >
            好的，下周来
          </button>
        </div>
      </Modal>
    </div>
  );
}
