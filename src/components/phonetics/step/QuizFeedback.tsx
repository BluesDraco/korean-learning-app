'use client';
import React from 'react';
import type { ProgressiveLetter } from '@/data/phonetics-progressive';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  [k: string]: unknown;
  target: ProgressiveLetter;
  isRight: boolean;
  buttonLabel: string;
  onNext: () => void;
  size?: 'compact' | 'full';
}

const kwStyle: React.CSSProperties = {
  fontWeight: 700, color: 'var(--color-pink-strong)',
};

export default function QuizFeedback({ target, isRight, buttonLabel, onNext, size = 'full' }: Props) {
  const { lang } = useLang();
  const titleSize = size === 'compact' ? 16 : 18;
  const bodySize = size === 'compact' ? 13 : 14;
  const kwSize = size === 'compact' ? 14 : 16;
  const btnPad = size === 'compact' ? '10px 20px' : '12px 24px';
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'serif', fontWeight: 700, fontSize: titleSize, marginBottom: 6, color: isRight ? 'var(--color-status-success)' : 'var(--color-status-danger)' }}>
        {isRight ? '정답! ✓' : '틀림 ✗'}
      </div>
      <div style={{ fontSize: bodySize, color: 'var(--color-ink-2)', lineHeight: 1.6 }}>
        {isRight ? (
          <><span style={{ ...kwStyle, fontSize: kwSize }}>{target.jamo}</span> {t('phonetics.qfb_right_pron_before', lang)}&ldquo;{target.romanization}&rdquo;{t('phonetics.qfb_right_pron_after', lang)}{lang === 'en' ? target.mouthHintEn ?? target.mouthHint : target.mouthHint}</>
        ) : (
          <>{t('phonetics.qfb_wrong_answer_is', lang)} <span style={{ ...kwStyle, fontSize: kwSize }}>{target.jamo}</span> ({target.romanization}){t('phonetics.qfb_wrong_period', lang)}{lang === 'en' ? target.mouthHintEn ?? target.mouthHint : target.mouthHint} {t('phonetics.qfb_wrong_diff_with', lang)} <span style={{ ...kwStyle, fontSize: kwSize }}>{target.confused.jamo}</span> {t('phonetics.qfb_wrong_diff_colon', lang)}{lang === 'en' ? target.confused.tipEn ?? target.confused.tip : target.confused.tip}</>
        )}
      </div>
      <button onClick={onNext} style={{
        marginTop: 12, width: '100%', padding: btnPad,
        fontSize: size === 'compact' ? 14 : 15, fontWeight: 500,
        borderRadius: size === 'compact' ? 10 : 12, border: 'none', cursor: 'pointer',
        background: 'var(--color-pink-base)', color: '#fff',
      }}>
        {buttonLabel}
      </button>
    </>
  );
}
