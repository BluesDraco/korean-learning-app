'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Play, RotateCw } from 'lucide-react';
import type { ProgressiveLetter } from '@/data/phonetics-progressive';
import { unlockAudioContext } from '@/lib/tts';
import { playPhoneticAudio } from '@/lib/audio/phoneticsPlayer';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

// 双面卡片：正 = 字母大字，反 = 罗马音 + 中文近似 + 口诀 + 真人音频
// 点击翻面（CSS 3d transform）

interface Props {
  [k: string]: unknown;
  letter: ProgressiveLetter;
  stage?: number;
  onRate?: (quality: 0 | 3 | 5) => void;   // 自评：忘了 / 想起来 / 脱口而出
  showRating?: boolean;                    // 翻面后是否显示自评条
}

export default function FlashCard({ letter, stage, onRate, showRating = true }: Props) {
  const { lang } = useLang();
  const [flipped, setFlipped] = useState(false);

  // 字母变化时复位
  useEffect(() => { setFlipped(false); }, [letter.jamo]);

  const play = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    unlockAudioContext();
    playPhoneticAudio(letter.syllable);
  }, [letter.syllable]);

  return (
    <div style={{ perspective: 1200, width: '100%', maxWidth: 360, margin: '0 auto' }}>
      <div
        onClick={() => setFlipped((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped((v) => !v); } }}
        style={{
          position: 'relative',
          width: '100%', height: 'max(300px, calc(var(--vh-100) * 0.45))',
          transformStyle: 'preserve-3d',
          transition: 'transform .55s cubic-bezier(.16,1,.3,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
          cursor: 'pointer',
        }}
      >
        {/* 正面 */}
        <div style={faceStyle('var(--color-surface-2)')}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--color-ink-3)' }}>
            ◆ Stage {stage ?? '·'} · {t('phonetics.flashcard_tag', lang)}
          </div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(120px, 24vw, 180px)', lineHeight: 1, color: 'var(--color-ink-1)', letterSpacing: '-.04em' }}>
            {letter.jamo}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-ink-3)', fontSize: 12 }}>
            <RotateCw size={14} />{t('phonetics.flashcard_flip_hint', lang)}
          </div>
        </div>
        {/* 背面 */}
        <div style={{ ...faceStyle('var(--color-surface-2)'), transform: 'rotateY(180deg)', gap: 12 }}>
          <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 600, fontSize: 42, color: 'var(--color-pink-strong)', lineHeight: 1 }}>
            {letter.romanization}
          </div>
          <div style={{ fontSize: 16, color: 'var(--color-ink-2)' }}>{t('phonetics.flashcard_approx', lang)}{lang === 'en' ? letter.cnApproxEn ?? letter.cnApprox : letter.cnApprox}</div>
          <button onClick={play} aria-label={t('phonetics.flashcard_play_aria', lang)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 999,
            background: 'var(--color-pink-base)', color: '#fff',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(255,127,168,.3)',
          }}>
            <Play size={16} fill="#fff" /> {t('phonetics.flashcard_play', lang)}
          </button>
          <div style={{ fontSize: 13, color: 'var(--color-ink-2)', lineHeight: 1.5, padding: '0 16px', textAlign: 'center' }}>
            {lang === 'en' ? letter.mnemonicEn ?? letter.mnemonic : letter.mnemonic}
          </div>
        </div>
      </div>

      {flipped && showRating && onRate && (
        <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'center' }}>
          <button onClick={() => onRate(0)} style={rateBtn('var(--color-status-danger)')}>{t('phonetics.flashcard_rate_forgot', lang)}</button>
          <button onClick={() => onRate(3)} style={rateBtn('var(--color-gold-base)')}>{t('phonetics.flashcard_rate_recall', lang)}</button>
          <button onClick={() => onRate(5)} style={rateBtn('var(--color-mint-strong)')}>{t('phonetics.flashcard_rate_fluent', lang)}</button>
        </div>
      )}
    </div>
  );
}

function faceStyle(bg: string): React.CSSProperties {
  return {
    position: 'absolute', inset: 0,
    background: bg,
    border: '1px solid var(--color-border-1)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: '0 4px 20px rgba(58,46,41,.06)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  };
}

function rateBtn(color: string): React.CSSProperties {
  return {
    flex: 1, padding: '12px 18px',
    fontSize: 14, fontWeight: 600,
    background: 'var(--color-surface-2)',
    border: `1.5px solid ${color}`,
    color,
    borderRadius: 12, cursor: 'pointer',
    transition: 'all .15s',
  };
}
