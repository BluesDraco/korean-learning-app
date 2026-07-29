'use client';
import React, { useEffect, useState } from 'react';

const COLORS = ['#ff7fa8', '#ff9d7a', '#7dc6b3', '#a896d9', '#c8995b'];

interface Piece { left: string; bg: string; delay: string; dur: string; circle: boolean; size: number; }

const CONFETTI_KEYFRAMES = `@keyframes confettiFall { 0% { transform: translateY(0) rotate(0); opacity: 1; } 100% { transform: translateY(105vh) rotate(720deg); opacity: 0; } }`;

export default function Confetti({ count = 20 }: { count?: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    // 尊重系统级"减弱动画"：前庭敏感 / 易晕眩用户看不到彩带雨
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const arr: Piece[] = Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      bg: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: `${Math.random() * 0.8}s`,
      dur: `${2.5 + Math.random() * 1.5}s`,
      circle: Math.random() < 0.4,
      size: 6 + Math.floor(Math.random() * 6),
    }));
    setPieces(arr);
  }, [count]);

  return (
    <>
      <style>{CONFETTI_KEYFRAMES}</style>
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'fixed',
            top: '-10px',
            left: p.left,
            width: p.size, height: p.size,
            background: p.bg,
            borderRadius: p.circle ? '50%' : 0,
            pointerEvents: 'none',
            zIndex: 70,
            animation: `confettiFall ${p.dur} linear ${p.delay} forwards`,
          }}
        />
      ))}
    </>
  );
}
