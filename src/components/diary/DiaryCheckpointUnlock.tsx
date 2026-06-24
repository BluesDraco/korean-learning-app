'use client';

import { useState, useEffect } from 'react';
import type { ToriDay } from '@/types/tori-diary';

interface Props {
  day: ToriDay;
  onComplete: () => void;
}

export function DiaryCheckpointUnlock({ day, onComplete }: Props) {
  const cfg = day.checkpointConfig;
  const lines = cfg?.unlockDialogue ?? [];
  const [step, setStep] = useState(0);
  const [carrotVisible, setCarrotVisible] = useState(false);

  useEffect(() => {
    if (step >= lines.length && !carrotVisible) {
      const t = setTimeout(() => setCarrotVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [step, lines.length, carrotVisible]);

  return (
    <div
      className="diary-anim-fade-up"
      style={{
        background: '#0f0c1a',
        borderRadius: 'var(--diary-r-lg)',
        padding: '36px 28px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', color: '#4ecdc4', marginBottom: 4 }}>
        ★ 通关
      </div>

      {/* 对白逐步展示 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
        {lines.slice(0, step + 1).map((line, i) => (
          <div
            key={i}
            className="diary-anim-fade-up"
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 12,
              padding: '12px 16px',
              textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 11, color: '#4ecdc4', fontWeight: 700, display: 'block', marginBottom: 4 }}>
              {line.npcName}
            </span>
            <p className="diary-handwriting-ko" style={{ fontSize: 16, color: '#fff', margin: 0, marginBottom: 4 }}>
              {line.ko}
            </p>
            <p className="diary-handwriting-zh" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              {line.zh}
            </p>
          </div>
        ))}
      </div>

      {/* 胡萝卜归来动画 */}
      {carrotVisible && (
        <div
          className="diary-anim-fade-up"
          style={{ fontSize: 48, animation: 'diary-bounce 0.6s ease' }}
        >
          🥕
        </div>
      )}

      {/* 继续按钮 */}
      {!carrotVisible && step < lines.length - 1 && (
        <button
          onClick={() => setStep(s => s + 1)}
          style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.6)', borderRadius: 999,
            padding: '8px 24px', fontSize: 13, cursor: 'pointer',
          }}
        >
          继续
        </button>
      )}

      {carrotVisible && (
        <button
          onClick={onComplete}
          style={{
            background: '#4ecdc4', color: '#0f0c1a', border: 'none',
            borderRadius: 999, padding: '12px 32px', fontSize: 14,
            fontWeight: 900, cursor: 'pointer',
          }}
        >
          胡萝卜回来了 · 继续 →
        </button>
      )}
    </div>
  );
}
