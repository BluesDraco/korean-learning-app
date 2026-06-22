'use client';

import { useState } from 'react';
import type { ToriDay } from '@/types/tori-diary';
import { Volume2, ChevronRight } from 'lucide-react';
import { speak } from '@/lib/tts';

interface Props {
  day: ToriDay;
  onComplete: () => void;
}

/**
 * Day Words — 6 个新词
 * 翻卡 + 真人 TTS。全部翻看过才能 onComplete
 */
export function DiaryWords({ day, onComplete }: Props) {
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const allFlipped = flippedIds.size === day.words.length;

  const handleFlip = (id: string) => {
    setFlippedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSpeak = async (id: string, ko: string) => {
    setSpeakingId(id);
    try {
      await speak(ko, 0.8);
    } finally {
      setSpeakingId(null);
    }
  };

  return (
    <div className="diary-anim-fade-up">
      <div style={{ marginBottom: 18 }}>
        <span className="diary-tag diary-tag-gold">WORDS · 单词</span>
      </div>
      <h2 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 6 }}>
        今天的 6 个词
      </h2>
      <p className="diary-handwriting-zh diary-text-soft" style={{ marginBottom: 20 }}>
        点开卡片看意思，按 🔊 听发音。{flippedIds.size}/{day.words.length} 已翻看
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {day.words.map((word) => {
          const flipped = flippedIds.has(word.id);
          return (
            <div
              key={word.id}
              className="diary-card-paper"
              style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }}
              onClick={() => handleFlip(word.id)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* 韩文主体 */}
                  <div className="diary-ko">{word.korean}</div>
                  <div className="diary-romaji" style={{ marginTop: 2 }}>{word.hangul}</div>

                  {/* 翻开后显示中文 + 例句 */}
                  {flipped && (
                    <div className="diary-anim-fade-up" style={{ marginTop: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span
                          className="diary-handwriting-zh"
                          style={{
                            fontSize: 'var(--diary-text-md)',
                            fontWeight: 700,
                            color: 'var(--diary-ink)',
                          }}
                        >
                          {word.zh}
                        </span>
                        <span
                          style={{
                            fontSize: 'var(--diary-text-xs)',
                            padding: '1px 8px',
                            borderRadius: 4,
                            background: 'var(--diary-gold-soft)',
                            color: 'var(--diary-gold-deep)',
                            fontWeight: 600,
                          }}
                        >
                          {word.pos}
                        </span>
                      </div>

                      {/* 例句 */}
                      <div
                        style={{
                          padding: '10px 12px',
                          background: 'var(--diary-paper-deep)',
                          borderLeft: '2px solid var(--diary-gold)',
                          borderRadius: 'var(--diary-r-sm)',
                          marginBottom: 8,
                        }}
                      >
                        <div className="diary-handwriting-ko" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink)', marginBottom: 2 }}>
                          {word.example.ko}
                        </div>
                        <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-soft)' }}>
                          {word.example.zh}
                        </div>
                      </div>

                      {word.tip && (
                        <p
                          className="diary-handwriting-zh"
                          style={{
                            fontSize: 'var(--diary-text-sm)',
                            color: 'var(--diary-ink-soft)',
                            margin: 0,
                            fontStyle: 'italic',
                          }}
                        >
                          💡 {word.tip}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(word.id, word.korean);
                  }}
                  style={{
                    flexShrink: 0,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1.5px solid var(--diary-gold)',
                    background: 'var(--diary-paper)',
                    color: speakingId === word.id ? 'var(--diary-stamp-red)' : 'var(--diary-gold-deep)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="播放发音"
                >
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onComplete}
          disabled={!allFlipped}
          className="diary-btn diary-btn-primary"
          style={{ opacity: allFlipped ? 1 : 0.4, cursor: allFlipped ? 'pointer' : 'not-allowed' }}
        >
          下一步 · 场景对话 <ChevronRight size={16} />
        </button>
        {!allFlipped && (
          <p style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-faint)', marginTop: 8 }}>
            请先翻看所有 {day.words.length} 张卡片
          </p>
        )}
      </div>
    </div>
  );
}
