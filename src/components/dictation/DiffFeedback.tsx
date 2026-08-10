'use client';

import { getCharDiff, normalizeKorean } from '@/lib/koreanDiff';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface DiffFeedbackProps {
  [k: string]: unknown;
  userInput: string;
  correct: string;
}

export function DiffFeedback({ userInput, correct }: DiffFeedbackProps) {
  const { lang } = useLang();
  const { userDiff, correctDiff, notes } = getCharDiff(
    userInput.replace(/\s/g, ''),
    correct.replace(/\s/g, '')
  );
  const isCorrect = normalizeKorean(userInput) === normalizeKorean(correct);

  if (isCorrect) {
    return (
      <div style={{ background: 'var(--color-mint-soft)', borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22 }}>✓</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-mint-strong)' }}>{t('ddiff.correct', lang)}</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* 你的答案 */}
      <div style={{ background: 'rgba(214,86,86,0.08)', borderRadius: 14, padding: '12px 16px' }}>
        <p style={{ fontSize: 11, color: 'var(--color-status-danger)', fontWeight: 700, marginBottom: 8, letterSpacing: '0.05em' }}>{t('ddiff.yourAnswer', lang)}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {userDiff.length > 0 ? userDiff.map((seg, i) => (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 36,
              height: 36,
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 700,
              background: seg.status === 'correct' ? 'var(--color-mint-soft)' : seg.status === 'wrong' ? 'rgba(214,86,86,0.15)' : 'rgba(199,153,0,0.12)',
              color: seg.status === 'correct' ? 'var(--color-mint-strong)' : seg.status === 'wrong' ? 'var(--color-status-danger)' : 'var(--color-status-warning)',
              textDecoration: seg.status === 'wrong' ? 'line-through' : 'none',
              border: seg.status === 'extra' ? '1px dashed var(--color-status-danger)' : 'none',
            }}>
              {seg.char}
            </span>
          )) : (
            <span style={{ fontSize: 14, color: 'var(--color-status-danger)', fontStyle: 'italic' }}>{t('ddiff.noInput', lang)}</span>
          )}
        </div>
      </div>

      {/* 正确答案 */}
      <div style={{ background: 'var(--color-mint-soft)', borderRadius: 14, padding: '12px 16px' }}>
        <p style={{ fontSize: 11, color: 'var(--color-mint-strong)', fontWeight: 700, marginBottom: 8, letterSpacing: '0.05em' }}>{t('ddiff.correctAnswer', lang)}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {correctDiff.map((seg, i) => (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 36,
              height: 36,
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 700,
              background: seg.status === 'correct' ? 'rgba(58,175,169,0.15)' : seg.status === 'missing' ? 'rgba(199,153,0,0.12)' : 'rgba(214,86,86,0.15)',
              color: seg.status === 'correct' ? 'var(--color-mint-strong)' : seg.status === 'missing' ? 'var(--color-status-warning)' : 'var(--color-status-danger)',
              border: seg.status === 'missing' ? '1px dashed var(--color-status-warning)' : 'none',
            }}>
              {seg.char}
            </span>
          ))}
        </div>
      </div>

      {/* 错误分析 */}
      {notes.length > 0 && (
        <div style={{ background: 'var(--color-surface-3)', borderRadius: 14, padding: '10px 14px' }}>
          <p style={{ fontSize: 11, color: 'var(--color-ink-3)', fontWeight: 700, marginBottom: 6, letterSpacing: '0.05em' }}>{t('ddiff.errorAnalysis', lang)}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {notes.map((note, i) => (
              <p key={i} style={{ fontSize: 13, color: 'var(--color-ink-2)', margin: 0 }}>· {note}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
