'use client';

import { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import type { ToriDay } from '@/types/tori-diary';
import { pickGreeting, type CarrotProgressLike } from '@/lib/carrot-greeting';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  day: ToriDay;
  progress?: CarrotProgressLike;
  locked?: boolean;
  lockedMsg?: string;
}

const SUGGESTED_QUESTIONS = [
  'diary.carrotp.q1',
  'diary.carrotp.q2',
  'diary.carrotp.q3',
];

export function CarrotPanel({ day, progress, locked, lockedMsg }: Props) {
  const { lang } = useLang();
  const greeting = useMemo(() => pickGreeting(day.day, lang, progress), [day.day, lang, progress]);

  const openChat = () => {
    window.dispatchEvent(new Event('openCarrot'));
  };

  return (
    <div>
      {/* 第一张卡：勇气胡萝卜问候 */}
      <div className="desk-words-card" style={{ marginBottom: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 44, display: 'block', marginBottom: 4 }}>🥕</span>
          <span className="tag" style={{ marginBottom: 0 }}>{t('diary.carrotp.title', lang)}</span>
        </div>
        <p style={{
          fontSize: 14, lineHeight: 1.85, color: 'var(--ink-2)',
          fontFamily: "'Inter', sans-serif",
          textAlign: 'center', margin: '0 0 18px',
        }}>
          {greeting}
        </p>

        {/* 进度简表 */}
        {progress && (
          <div className="info-row" style={{ marginBottom: 14 }}>
            <div className="info-item">
              <div className="info-label" style={{ fontSize: 10 }}>{t('diary.carrotp.statCompleted', lang)}</div>
              <div className="info-val" style={{ fontSize: 12 }}>{t('diary.carrotp.statDays', lang, { n: progress.completedDays })}</div>
            </div>
            <div className="info-item">
              <div className="info-label" style={{ fontSize: 10 }}>{t('diary.carrotp.statCollected', lang)}</div>
              <div className="info-val" style={{ fontSize: 12 }}>{t('diary.carrotp.statSentences', lang, { n: progress.sentencesCount })}</div>
            </div>
            <div className="info-item">
              <div className="info-label" style={{ fontSize: 10 }}>{t('diary.carrotp.statRecordings', lang)}</div>
              <div className="info-val" style={{ fontSize: 12 }}>{t('diary.carrotp.statRecCount', lang, { n: progress.recordingsCount })}</div>
            </div>
          </div>
        )}

        <button
          onClick={openChat}
          disabled={locked}
          title={locked ? (lockedMsg ?? t('diary.carrotp.lockedDefault', lang)) : undefined}
          style={{
            width: '100%', height: 44, borderRadius: 999,
            background: locked ? 'rgba(80,70,70,0.3)' : 'linear-gradient(135deg, #ff9d4a, #ffc070)',
            color: locked ? 'rgba(255,255,255,0.35)' : '#fff',
            border: 'none', cursor: locked ? 'not-allowed' : 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: 14, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            boxShadow: '0 4px 14px rgba(255,157,74,0.32)',
            transition: 'transform .15s',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Sparkles size={14} /> {locked ? t('diary.carrotp.lockedBtn', lang) : t('diary.carrotp.openBtn', lang)}
        </button>
      </div>

      {/* 第二张卡：推荐问题 */}
      <div className="desk-words-card">
        <span className="tag" style={{ marginBottom: 10 }}>{t('diary.carrotp.tryAsk', lang)}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={openChat}
              disabled={locked}
              style={{
                padding: '10px 16px',
                fontSize: 13,
                color: 'var(--ink)',
                background: 'var(--paper-deep)',
                border: '1px solid var(--line)',
                borderRadius: 12,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                textAlign: 'left',
                transition: 'background .15s, border-color .15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--gold-soft)';
                e.currentTarget.style.borderColor = 'var(--gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--paper-deep)';
                e.currentTarget.style.borderColor = 'var(--line)';
              }}
            >
              {t(q, lang)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
