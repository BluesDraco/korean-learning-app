'use client';

import { useState, useEffect, useRef } from 'react';
import type { ToriDay, ToriModuleState } from '@/types/tori-diary';
import { Volume2, ChevronRight } from 'lucide-react';
import { speak, prefetchAudio } from '@/lib/tts';
import { sfxPop } from '@/lib/sfx';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  day: ToriDay;
  onComplete: () => void;
  onBack?: () => void;
  initialState?: ToriModuleState['words'];
  onStateChange?: (patch: ToriModuleState['words']) => void;
}

export function DiaryWords({ day, onComplete, onBack, initialState, onStateChange }: Props) {
  const { lang } = useLang();
  const [flippedIds, setFlippedIds] = useState<Set<string>>(() => new Set(initialState?.flippedIds ?? []));
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    onStateChange?.({ flippedIds: Array.from(flippedIds) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flippedIds]);
  const safeComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  // 进入词汇模块时后台预加载所有单词的发音——用户点击时秒播
  useEffect(() => {
    day.words?.forEach((w) => { prefetchAudio(w.korean); });
  }, [day.words]);

  // 数据缺失守卫
  if (!day.words || day.words.length === 0) {
    return (
      <div className="diary-anim-fade-up" style={{ padding: 24, textAlign: 'center' }}>
        <p className="diary-text-soft" style={{ marginBottom: 16 }}>{t('diary.words.empty', lang)}</p>
        <button onClick={safeComplete} className="diary-btn diary-btn-primary">{t('diary.words.next', lang)}</button>
      </div>
    );
  }

  const allFlipped = flippedIds.size === day.words.length;

  const handleFlip = (id: string) => {
    sfxPop();
    setFlippedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSpeak = async (id: string, ko: string) => {
    setSpeakingId(id);
    try {
      await speak(ko);
    } finally {
      setSpeakingId(null);
    }
  };

  return (
    <div className="diary-anim-fade-up">
      <div style={{ marginBottom: 18 }}>
        <span className="diary-tag diary-tag-gold">{t('diary.words.tag', lang)}</span>
      </div>
      <h2 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 6 }}>
        {t('diary.words.heading', lang, { n: day.words.length })}
      </h2>
      <p className="diary-handwriting-zh diary-text-soft" style={{ marginBottom: 20 }}>
        {t('diary.words.hint', lang, { flipped: flippedIds.size, total: day.words.length })}
      </p>

      <hr className="diary-hr-dashed" />

      <div>
        {day.words.map((word, idx) => {
          const flipped = flippedIds.has(word.id);
          return (
            <div
              key={word.id}
              className="diary-detail-word-row"
              role="button"
              tabIndex={0}
              aria-pressed={flipped}
              onClick={() => handleFlip(word.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip(word.id); } }}
            >
              <div className="diary-word-stamp">{['🐹','🌸','✦','🎵','💡','📖'][Math.min(idx, 5)]}</div>
              <div className="diary-detail-word-meta">
                {/* 韩文主体 */}
                <div className="diary-ko">{word.korean}</div>
                <div className="diary-romaji" style={{ marginTop: 2 }}>{word.hangul}</div>

                {/* 翻开后显示中文 + 例句 */}
                {flipped && (
                  <div className="diary-anim-fade-up" style={{ marginTop: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', fontWeight: 700, color: 'var(--diary-ink)' }}>
                        {word.zh}
                      </span>
                      <span className="diary-detail-pos">{word.pos}</span>
                    </div>

                    {/* 例句 */}
                    <div className="diary-detail-example-quote">
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                        <div className="diary-detail-example-quote-ko">{word.example.ko}</div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleSpeak(word.id, word.example.ko); }}
                          style={{
                            flexShrink: 0, width: 30, height: 30, borderRadius: 12,
                            background: 'var(--diary-paper-deep)', border: 'none',
                            color: 'var(--diary-ink-faint)', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 13,
                          }}
                          aria-label={t('diary.words.playExample', lang)}
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                      <div className="diary-detail-example-quote-zh">{word.example.zh}</div>
                    </div>

                    {word.tip && (
                      <p className="diary-detail-tip">💡 {word.tip}</p>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeak(word.id, word.korean);
                }}
                className="diary-detail-play-btn"
                aria-label={t('diary.words.playWord', lang)}
                aria-pressed={speakingId === word.id}
              >
                <Volume2 size={16} />
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              flex: 1, height: 52, borderRadius: 14,
              background: 'var(--diary-paper-deep)', color: 'var(--diary-ink-2)',
              border: '1px solid var(--diary-line)', cursor: 'pointer',
              fontSize: 16, fontWeight: 600,
              fontFamily: 'var(--diary-font-zh)',
            }}
          >
            {t('diary.words.prev', lang)}
          </button>
        )}
        <button
          onClick={safeComplete}
          disabled={!allFlipped}
          className="diary-btn diary-btn-primary"
          style={{ flex: 2, opacity: allFlipped ? 1 : 0.4, cursor: allFlipped ? 'pointer' : 'not-allowed' }}
        >
          {t('diary.words.nextScene', lang)} <ChevronRight size={16} />
        </button>
      </div>
      {!allFlipped && (
        <p style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-faint)', marginTop: 8, textAlign: 'center' }}>
          {t('diary.words.flipAllTip', lang, { n: day.words.length })}
        </p>
      )}
    </div>
  );
}
