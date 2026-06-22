'use client';

import { useEffect, useState } from 'react';
import type { ToriDay } from '@/types/tori-diary';
import { getStickerByDay } from '@/data/diary';
import { Home, BookMarked } from 'lucide-react';
import Link from 'next/link';

interface Props {
  day: ToriDay;
  onComplete: () => void;
}

const PALETTE_BG: Record<string, string> = {
  pink: 'linear-gradient(135deg, #ffe4ee, #fff8fb)',
  mint: 'linear-gradient(135deg, #e3f5f0, #f4fbf8)',
  yellow: 'linear-gradient(135deg, #fdf4e3, #fffaf0)',
  cream: 'linear-gradient(135deg, #f5edd9, #fcf7ec)',
  gold: 'linear-gradient(135deg, #e9d3a4, #fdf4e3)',
  peach: 'linear-gradient(135deg, #ffefe6, #fff7f1)',
  purple: 'linear-gradient(135deg, #efe7ff, #f7f3ff)',
};

/**
 * Day Recap — 收尾 + 颁发贴纸
 * 贴纸盖印动画 + 表扬文案 + 明天预告 + 回首页/贴纸册按钮
 */
export function DiaryRecap({ day }: Props) {
  const sticker = getStickerByDay(day.day);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStamped(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="diary-anim-fade-up" style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 18 }}>
        <span className="diary-tag" style={{ background: 'var(--diary-stamp-red)', color: '#fff' }}>
          RECAP · 今天收尾
        </span>
      </div>

      <h2 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 8 }}>
        {day.recap.praise}
      </h2>

      <p className="diary-handwriting-zh diary-text-soft" style={{ fontSize: 'var(--diary-text-md)', marginBottom: 30 }}>
        DAY {day.day} 完成 · 你赢得了今天的贴纸
      </p>

      {/* 贴纸盖印 */}
      {sticker && (
        <div
          className={stamped ? 'diary-anim-stamp' : ''}
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 200,
            margin: '0 auto 32px',
            borderRadius: '50%',
            background: PALETTE_BG[sticker.paletteHint] ?? PALETTE_BG.cream,
            border: '3px solid var(--diary-gold)',
            boxShadow: '0 12px 28px -10px rgba(58, 42, 30, 0.4)',
            position: 'relative',
            opacity: stamped ? 1 : 0,
          }}
        >
          <div
            style={{
              fontSize: 48,
              marginBottom: 6,
            }}
          >
            🐰
          </div>
          <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', fontWeight: 700, color: 'var(--diary-ink)' }}>
            {sticker.title}
          </div>
          <div
            className="diary-handwriting-zh"
            style={{
              fontSize: 'var(--diary-text-xs)',
              color: 'var(--diary-ink-soft)',
              marginTop: 4,
              maxWidth: 160,
              lineHeight: 1.4,
            }}
          >
            {sticker.meaning}
          </div>
        </div>
      )}

      {/* 明日预告 */}
      <div
        className="diary-card-paper"
        style={{
          textAlign: 'left',
          background: 'var(--diary-paper)',
          borderLeft: '3px solid var(--diary-stamp-red)',
          padding: '14px 18px',
          marginBottom: 28,
          maxWidth: 460,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <span
          className="diary-handwriting-zh"
          style={{ fontSize: 'var(--diary-text-xs)', color: 'var(--diary-stamp-red)', fontWeight: 700, letterSpacing: '0.06em' }}
        >
          明日预告 · TOMORROW
        </span>
        <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink)', marginTop: 6, lineHeight: 1.7 }}>
          {day.recap.preview}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/diary/stickers" style={{ textDecoration: 'none' }}>
          <button className="diary-btn diary-btn-ghost">
            <BookMarked size={14} /> 我的贴纸册
          </button>
        </Link>
        <Link href="/diary" style={{ textDecoration: 'none' }}>
          <button className="diary-btn diary-btn-primary">
            <Home size={14} /> 回到日记
          </button>
        </Link>
      </div>
    </div>
  );
}
