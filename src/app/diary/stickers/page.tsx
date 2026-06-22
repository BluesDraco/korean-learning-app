'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookMarked } from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { stickers, getStickerByDay } from '@/data/diary';
import '@/components/diary/diary.css';

const PALETTE_BG: Record<string, string> = {
  pink: 'linear-gradient(135deg, #ffe4ee, #fff8fb)',
  mint: 'linear-gradient(135deg, #e3f5f0, #f4fbf8)',
  yellow: 'linear-gradient(135deg, #fdf4e3, #fffaf0)',
  cream: 'linear-gradient(135deg, #f5edd9, #fcf7ec)',
  gold: 'linear-gradient(135deg, #e9d3a4, #fdf4e3)',
  peach: 'linear-gradient(135deg, #ffefe6, #fff7f1)',
  purple: 'linear-gradient(135deg, #efe7ff, #f7f3ff)',
};

export default function DiaryStickersPage() {
  const { user, loading: authLoading } = useAuth();
  const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) { setLoaded(true); return; }
    (async () => {
      try {
        const rows = await db.toriStickersOwned.toArray();
        setOwnedIds(new Set(rows.filter((r) => r.userId === user.id).map((r) => r.stickerId)));
      } catch { /* ignore */ }
      finally { setLoaded(true); }
    })();
  }, [user]);

  if (authLoading || !loaded) {
    return (
      <div className="diary-root diary-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="diary-handwriting-zh" style={{ color: 'var(--diary-ink-soft)' }}>加载中…</div>
      </div>
    );
  }

  // 30 张占位（已写的 sticker 用真数据，未写的用 day 占位）
  const slots: Array<{ day: number; sticker: ReturnType<typeof getStickerByDay> }> = [];
  for (let d = 1; d <= 30; d++) {
    slots.push({ day: d, sticker: getStickerByDay(d) });
  }

  return (
    <div className="diary-root diary-page" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 16px 40px' }}>
        <Link href="/diary" style={{ textDecoration: 'none' }}>
          <button
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-soft)',
              background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
              marginBottom: 16,
            }}
          >
            <ArrowLeft size={14} /> 回到日记
          </button>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <BookMarked size={22} color="var(--diary-gold-deep)" />
          <h1 className="diary-h2 diary-handwriting-zh" style={{ margin: 0 }}>
            我的贴纸册
          </h1>
        </div>
        <p className="diary-handwriting-zh diary-text-soft" style={{ marginBottom: 24 }}>
          已收集 {ownedIds.size} / 30 张
        </p>

        {/* 贴纸网格 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 14 }}>
          {slots.map(({ day, sticker }) => {
            const owned = sticker ? ownedIds.has(sticker.id) : false;
            return (
              <div
                key={day}
                style={{
                  aspectRatio: '1',
                  borderRadius: 'var(--diary-r-md)',
                  background: owned && sticker ? PALETTE_BG[sticker.paletteHint] : 'var(--diary-paper-deep)',
                  border: owned ? '2px solid var(--diary-gold)' : '1.5px dashed var(--diary-line-strong)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  textAlign: 'center',
                  opacity: owned ? 1 : 0.4,
                }}
              >
                {owned && sticker ? (
                  <>
                    <div style={{ fontSize: 28, marginBottom: 4 }}>🐰</div>
                    <div className="diary-handwriting-zh" style={{ fontSize: 11, fontWeight: 700, color: 'var(--diary-ink)', lineHeight: 1.3 }}>
                      {sticker.title}
                    </div>
                    <div className="diary-handwriting-zh" style={{ fontSize: 9, color: 'var(--diary-ink-soft)', marginTop: 4, lineHeight: 1.3 }}>
                      DAY {day}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 22, marginBottom: 4, opacity: 0.4 }}>?</div>
                    <div style={{ fontSize: 11, color: 'var(--diary-ink-faint)' }}>DAY {day}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
