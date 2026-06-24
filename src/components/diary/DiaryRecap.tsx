'use client';

import { useEffect, useRef, useState } from 'react';
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

const CHECKPOINT_LABELS: Record<number, string> = {
  7: '关卡 1 通关', 14: '关卡 2 通关', 21: '关卡 3 通关',
  26: '关卡 4 通关', 29: '关卡 5 通关', 30: '最终考试通过',
};

const STARS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 23 + 7) % 97}%`,
  delay: `${(i * 0.37) % 3}s`,
  duration: `${2.5 + (i * 0.19) % 2}s`,
  size: `${14 + (i * 7) % 14}px`,
}));

/**
 * Day Recap — 收尾 + 颁发贴纸
 * 关卡日有额外的全屏通关庆祝遮罩
 */
export function DiaryRecap({ day, onComplete }: Props) {
  const sticker = getStickerByDay(day.day);
  const [stamped, setStamped] = useState(false);
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const isCheckpointDay = !!day.isCheckpoint;

  useEffect(() => {
    const t = setTimeout(() => {
      setStamped(true);
      if (!completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current();
      }
      if (isCheckpointDay) {
        setTimeout(() => setShowCheckpoint(true), 600);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [day.day, isCheckpointDay]);

  return (
    <>
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

        {/* 9:16 场景图占位 + 角标贴纸 */}
        {sticker && (
          <div
            className={stamped ? 'diary-anim-stamp' : ''}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 270,
              aspectRatio: '9 / 16',
              margin: '0 auto 32px',
              borderRadius: 'var(--diary-r-md)',
              overflow: 'hidden',
              background: PALETTE_BG[sticker.paletteHint] ?? PALETTE_BG.cream,
              border: '1.5px solid var(--diary-gold)',
              boxShadow: '0 16px 36px -14px rgba(58, 42, 30, 0.4)',
              opacity: stamped ? 1 : 0,
            }}
          >
            {day.recap.sceneImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={day.recap.sceneImageUrl}
                alt={sticker.title}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: 96, opacity: 0.5, lineHeight: 1 }}>🐰</div>
              </div>
            )}
            <div style={{
              position: 'absolute', right: 10, bottom: 10, padding: '8px 12px',
              background: 'rgba(252, 247, 236, 0.94)', border: '1.5px solid var(--diary-gold)',
              borderRadius: 'var(--diary-r-sm)', backdropFilter: 'blur(4px)',
              boxShadow: '0 4px 10px -3px rgba(58, 42, 30, 0.25)', maxWidth: '78%',
            }}>
              <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', fontWeight: 700, color: 'var(--diary-ink)', lineHeight: 1.3 }}>
                {sticker.title}
              </div>
              <div className="diary-handwriting-zh" style={{ fontSize: 11, color: 'var(--diary-ink-soft)', lineHeight: 1.4, marginTop: 2 }}>
                {sticker.meaning}
              </div>
            </div>
          </div>
        )}

        {/* 明日预告 */}
        <div className="diary-card-paper" style={{
          textAlign: 'left', background: 'var(--diary-paper)',
          borderLeft: '3px solid var(--diary-stamp-red)', padding: '14px 18px',
          marginBottom: 28, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto',
        }}>
          <span className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-xs)', color: 'var(--diary-stamp-red)', fontWeight: 700, letterSpacing: '0.06em' }}>
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

      {/* 关卡通关全屏庆祝 */}
      {isCheckpointDay && showCheckpoint && (
        <div className="diary-checkpoint-overlay">
          {/* 星星粒子 */}
          <div className="diary-checkpoint-stars">
            {STARS.map((s, i) => (
              <span
                key={i}
                className="diary-checkpoint-star"
                style={{ left: s.left, bottom: '-20px', fontSize: s.size, animationDelay: s.delay, animationDuration: s.duration }}
              >★</span>
            ))}
          </div>

          {/* 贴纸放大 */}
          {sticker && (
            <div className="diary-checkpoint-sticker" style={{
              background: PALETTE_BG[sticker.paletteHint] ?? PALETTE_BG.gold,
            }}>
              {day.recap.sceneImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={day.recap.sceneImageUrl} alt={sticker.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>🐰</div>
              )}
            </div>
          )}

          <div className="diary-checkpoint-cleared">
            {CHECKPOINT_LABELS[day.isCheckpoint!] ?? '关卡通关'}
          </div>
          <div className="diary-checkpoint-sub">
            CHECKPOINT CLEARED · DAY {day.day}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setShowCheckpoint(false)}
              className="diary-btn diary-btn-ghost"
              style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              关闭
            </button>
            <Link href="/diary" style={{ textDecoration: 'none' }}>
              <button className="diary-btn diary-btn-primary" style={{ background: 'var(--diary-gold-deep)', borderColor: 'var(--diary-gold)' }}>
                <Home size={14} /> 回到日记
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
