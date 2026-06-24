'use client';

import { useState, useEffect } from 'react';
import type { ToriDay } from '@/types/tori-diary';

interface Props { day: ToriDay; onReady: () => void; }

export function DiaryCheckpointPrelude({ day, onReady }: Props) {
  const rawLines = day.checkpointConfig?.preludeLines ?? ['关卡开始。', '靠自己。'];
  const checkpointNum = [7,14,21,26,29].indexOf(day.isCheckpoint as number) + 1;
  const [visibleCount, setVisibleCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (visibleCount < rawLines.length) {
      const t = setTimeout(() => setVisibleCount(v => v + 1), rawLines[visibleCount] === '' ? 180 : 700);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowButton(true), 1000);
      return () => clearTimeout(t);
    }
  }, [visibleCount, rawLines.length]);

  return (
    <div style={{
      background: 'radial-gradient(ellipse 90% 60% at 50% 15%, #1a0a2e 0%, #0d0818 50%, #060510 100%)',
      borderRadius: 20,
      padding: '40px 28px 36px',
      minHeight: 380,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* ambient glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
        <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 6px #a855f7' }} />
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
          color: 'rgba(168,85,247,0.7)', textTransform: 'uppercase',
          fontFamily: 'system-ui',
        }}>
          CHECKPOINT {checkpointNum > 0 ? `· ${String(checkpointNum).padStart(2,'0')}` : ''}
        </span>
      </div>

      {/* story lines */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {rawLines.slice(0, visibleCount).map((line, i) => {
          if (line === '') return <div key={i} style={{ height: 12 }} />;
          const isLast = i === rawLines.filter(l => l !== '').length + rawLines.slice(0, rawLines.filter(l=>l!=='').map((_,j)=>j).indexOf(i)).filter(l=>l==='').length - 1;
          const isBold = line.startsWith('—');
          return (
            <p key={i} style={{
              margin: 0,
              fontFamily: 'var(--diary-font-zh)',
              fontSize: isBold ? 20 : 14,
              fontWeight: isBold ? 700 : 400,
              color: isBold ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.52)',
              lineHeight: 2.2,
              animation: 'cp-line-in 0.5s ease both',
              letterSpacing: isBold ? '0.02em' : 0,
            }}>
              {line}
            </p>
          );
        })}
      </div>

      {/* button */}
      <div style={{ marginTop: 40, display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={onReady}
          style={{
            background: 'transparent',
            border: `1px solid rgba(168,85,247,${showButton ? '0.5' : '0'})`,
            color: `rgba(168,85,247,${showButton ? '0.85' : '0'})`,
            borderRadius: 999,
            padding: '10px 28px',
            fontSize: 13,
            fontWeight: 600,
            cursor: showButton ? 'pointer' : 'default',
            transition: 'all 1s ease, background 0.2s',
            letterSpacing: '0.05em',
            fontFamily: 'var(--diary-font-zh)',
            pointerEvents: showButton ? 'auto' : 'none',
          }}
          onMouseEnter={e => { if (showButton) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(168,85,247,0.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
        >
          我准备好了 →
        </button>
      </div>
    </div>
  );
}
