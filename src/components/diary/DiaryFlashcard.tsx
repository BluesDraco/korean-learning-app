'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ToriDay, ToriWord } from '@/types/tori-diary';
import { Volume2, ChevronRight, Check, X, RotateCcw, Sparkles } from 'lucide-react';
import { speak } from '@/lib/tts';
import { sfxCorrect, sfxWrong } from '@/lib/sfx';
import { WordTapSheet } from '@/components/WordTapSheet';

interface Props {
  day: ToriDay;
  onComplete: () => void;
}

type Phase = 'review' | 'quiz' | 'done';

/**
 * Day Flashcard — 在 words 和 dialogue 之间
 * Phase 1 review: 翻卡过一遍今日的 N 个词
 * Phase 2 quiz: N 道韩→中速测，错 2 次也放过
 * Phase 3 done: 自动 onComplete
 */
export function DiaryFlashcard({ day, onComplete }: Props) {
  const words = day.words;
  const [phase, setPhase] = useState<Phase>('review');
  const [tapWord, setTapWord] = useState<string | null>(null);

  // ─── Phase 1: review ───
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState<Set<string>>(new Set());

  // ─── Phase 2: quiz ───
  const quizQs = useMemo(() => buildQuiz(words), [words]);
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [wrongCount, setWrongCount] = useState(0);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (!shaking) return;
    const t = setTimeout(() => setShaking(false), 480);
    return () => clearTimeout(t);
  }, [shaking]);

  useEffect(() => {
    setPicked(null); setChecked('idle'); setWrongCount(0); setShaking(false);
  }, [qIdx]);

  if (!words || words.length === 0) {
    // 没词的话直接放过（不应发生）
    return (
      <div className="diary-anim-fade-up" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <p className="diary-text-soft" style={{ marginBottom: 20 }}>今天没有新词，直接进入对话。</p>
        <button onClick={onComplete} className="diary-btn diary-btn-primary">
          继续 · 对话 <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // Phase 1: REVIEW · 翻卡过一遍
  // ─────────────────────────────────────────────
  if (phase === 'review') {
    const word = words[idx];
    const isSeen = seen.has(word.id);
    const isLast = idx === words.length - 1;
    const allSeen = seen.size === words.length;

    const handleFlip = () => {
      setFlipped(true);
      const next = new Set(seen); next.add(word.id);
      setSeen(next);
    };

    const handleNext = () => {
      if (isLast) {
        if (allSeen) setPhase('quiz');
        return;
      }
      setIdx(idx + 1);
      setFlipped(false);
    };

    const handlePrev = () => {
      if (idx === 0) return;
      setIdx(idx - 1);
      setFlipped(seen.has(words[idx - 1].id));
    };

    const handleRestart = () => {
      setIdx(0); setFlipped(false); setSeen(new Set());
    };

    return (
      <div className="diary-anim-fade-up" style={{ paddingBottom: 32 }}>
        <div style={{ marginBottom: 18 }}>
          <span className="diary-tag diary-tag-mint">FLASHCARD · 闪卡复习</span>
        </div>
        <h2 className="diary-h2" style={{ marginBottom: 6 }}>过一遍今天的 {words.length} 个词</h2>
        <p className="diary-text-soft" style={{ fontSize: 13, marginBottom: 20 }}>
          点卡片看翻面，按 🔊 听发音 · 反面例句可点词查词 · {seen.size}/{words.length} 已看过
        </p>

        {/* 进度点 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 22 }}>
          {words.map((w, i) => (
            <span key={w.id} style={{
              width: i === idx ? 18 : 6, height: 6, borderRadius: 6,
              background: seen.has(w.id)
                ? '#5ea886'
                : i === idx
                ? 'var(--color-pink-base)'
                : 'var(--diary-line-strong)',
              transition: 'all 0.2s',
            }} />
          ))}
        </div>

        {/* 闪卡本体 */}
        <FlashcardFace
          word={word}
          flipped={flipped}
          onFlip={handleFlip}
          onTapWord={setTapWord}
        />

        {/* 上一张 / 进度 / 下一张（顶部一栏） */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22 }}>
          <button
            onClick={handlePrev}
            disabled={idx === 0}
            className="diary-btn diary-btn-ghost"
            style={{ opacity: idx === 0 ? 0.3 : 1 }}
          >
            ← 上一张
          </button>
          <span className="diary-text-soft" style={{ fontSize: 12 }}>{idx + 1} / {words.length}</span>
          {isLast ? (
            <button
              onClick={handleNext}
              disabled={!allSeen}
              className="diary-btn diary-btn-primary"
              style={{ opacity: allSeen ? 1 : 0.4, cursor: allSeen ? 'pointer' : 'not-allowed' }}
            >
              开始速测 <Sparkles size={14} />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isSeen}
              className="diary-btn diary-btn-primary"
              style={{ opacity: isSeen ? 1 : 0.4, cursor: isSeen ? 'pointer' : 'not-allowed' }}
            >
              下一张 <ChevronRight size={14} />
            </button>
          )}
        </div>

        {/* 「再翻一遍」按钮 — 翻完一轮才显示 */}
        {allSeen && (
          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <button onClick={handleRestart} className="diary-btn diary-btn-ghost" style={{ fontSize: 12 }}>
              <RotateCcw size={12} /> 再翻一遍
            </button>
          </div>
        )}

        {/* 查词面板 */}
        {tapWord && (
          <WordTapSheet
            surface={tapWord}
            source={`diary-flashcard:d${day.day}`}
            onClose={() => setTapWord(null)}
          />
        )}
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // Phase 2: QUIZ · 韩→中速测，错 2 次放过
  // ─────────────────────────────────────────────
  if (phase === 'quiz' && quizQs.length > 0) {
    const q = quizQs[qIdx];
    const isLast = qIdx === quizQs.length - 1;

    const handlePick = (i: number) => {
      if (checked === 'correct') return;
      setPicked(i);
      if (q.options[i].correct) {
        setChecked('correct');
        sfxCorrect();
      } else {
        setChecked('wrong');
        setShaking(true);
        sfxWrong();
        setWrongCount((c) => c + 1);
      }
    };

    const handleRetry = () => {
      setPicked(null); setChecked('idle');
    };

    const canAdvance = checked === 'correct' || wrongCount >= 2;

    const handleNext = () => {
      if (isLast) { setPhase('done'); onComplete(); return; }
      setQIdx(qIdx + 1);
    };

    return (
      <div className="diary-anim-fade-up" style={{ paddingBottom: 32 }}>
        <div style={{ marginBottom: 18 }}>
          <span className="diary-tag" style={{ background: 'var(--color-pink-base)', color: '#fff' }}>QUIZ · 速测</span>
        </div>
        <h2 className="diary-h2" style={{ marginBottom: 6 }}>看韩文，挑对应的中文</h2>
        <p className="diary-text-soft" style={{ fontSize: 13, marginBottom: 20 }}>
          {qIdx + 1}/{quizQs.length} · 答错两次也会放过你 · 点韩文查词
        </p>

        <div className="diary-card-paper" style={{ padding: '24px 22px', background: 'var(--diary-paper)' }}>
          {/* 韩文题面 */}
          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <button
              onClick={() => { speak(q.ko, 0.85).catch(() => {}); }}
              aria-label="听发音"
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'var(--color-pink-base)', color: '#fff', border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 10, boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Volume2 size={18} />
            </button>
            <button
              onClick={() => setTapWord(q.ko)}
              style={{
                display: 'block', margin: '0 auto', background: 'transparent', border: 'none', cursor: 'pointer',
                fontSize: 26, fontWeight: 700, color: 'var(--diary-ink)', letterSpacing: '0.01em',
                padding: 0, lineHeight: 1.2,
              }}
              aria-label="查词"
            >
              {q.ko}
            </button>
            {q.hangul && (
              <div style={{ fontSize: 12, color: 'var(--diary-ink-soft)', fontStyle: 'italic', marginTop: 6 }}>
                [{q.hangul}]
              </div>
            )}
          </div>

          {/* 选项 */}
          <div className={shaking ? 'diary-anim-shake' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {q.options.map((opt, i) => {
              const isPicked = picked === i;
              const showResult = checked !== 'idle' && isPicked;
              return (
                <button
                  key={i}
                  onClick={() => handlePick(i)}
                  disabled={checked === 'correct'}
                  style={{
                    padding: '12px 16px', textAlign: 'left', borderRadius: 12,
                    border: checked === 'correct' && opt.correct ? '1.5px solid #5ea886'
                      : showResult && !opt.correct ? '1.5px solid var(--diary-stamp-red)'
                      : '1.5px solid var(--diary-line)',
                    background: checked === 'correct' && opt.correct ? 'rgba(94,168,134,0.16)'
                      : showResult && !opt.correct ? 'rgba(193,78,58,0.12)'
                      : 'var(--diary-paper-deep)',
                    cursor: checked === 'correct' ? 'default' : 'pointer',
                    fontSize: 15, fontWeight: 600, color: 'var(--diary-ink)',
                    transition: 'all 0.15s',
                  }}
                >
                  {opt.zh}
                  {checked === 'correct' && opt.correct && <Check size={16} color="#5ea886" style={{ marginLeft: 8, display: 'inline', verticalAlign: 'middle' }} />}
                  {showResult && !opt.correct && <X size={16} color="var(--diary-stamp-red)" style={{ marginLeft: 8, display: 'inline', verticalAlign: 'middle' }} />}
                </button>
              );
            })}
          </div>

          {/* 错答提示 */}
          {checked === 'wrong' && wrongCount < 2 && (
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(193,78,58,0.10)', borderRadius: 6, borderLeft: '3px solid var(--diary-stamp-red)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <X size={16} color="var(--diary-stamp-red)" />
              <span style={{ fontSize: 13 }}>再想想？（剩 {2 - wrongCount} 次机会）</span>
              <button onClick={handleRetry} className="diary-btn diary-btn-ghost" style={{ padding: '4px 10px', fontSize: 11, marginLeft: 'auto' }}>
                <RotateCcw size={12} /> 重选
              </button>
            </div>
          )}
          {checked === 'wrong' && wrongCount >= 2 && (
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(255,184,77,0.10)', borderRadius: 6, borderLeft: '3px solid var(--color-gold-base, #e0a500)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>🥕</span>
              <span style={{ fontSize: 13 }}>没关系，先继续。正确答案：<strong style={{ color: 'var(--diary-ink)' }}>{q.options.find((o) => o.correct)?.zh}</strong></span>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 22 }}>
          <button
            onClick={handleNext}
            className="diary-btn diary-btn-primary"
            disabled={!canAdvance}
            style={{ opacity: canAdvance ? 1 : 0.4, cursor: canAdvance ? 'pointer' : 'not-allowed' }}
          >
            {isLast ? '继续 · 对话' : '下一题'} <ChevronRight size={16} />
          </button>
        </div>

        {tapWord && (
          <WordTapSheet
            surface={tapWord}
            source={`diary-flashcard:d${day.day}`}
            onClose={() => setTapWord(null)}
          />
        )}
      </div>
    );
  }

  // Phase done: 已 onComplete，组件会被父级换掉。这里给个兜底
  return null;
}

/* ═══════ 闪卡正反面 ═══════ */
function FlashcardFace({
  word, flipped, onFlip, onTapWord,
}: {
  word: ToriWord; flipped: boolean; onFlip: () => void;
  onTapWord: (surface: string) => void;
}) {
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(word.korean, 0.85).catch(() => {});
  };
  const handleSpeakExample = (e: React.MouseEvent, ko: string) => {
    e.stopPropagation();
    speak(ko, 0.85).catch(() => {});
  };
  const handleTapKorean = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTapWord(word.korean);
  };
  const handleTapExampleWord = (e: React.MouseEvent, w: string) => {
    e.stopPropagation();
    onTapWord(w);
  };

  return (
    <div
      onClick={onFlip}
      className="diary-card-paper"
      style={{
        position: 'relative',
        minHeight: 220,
        padding: '32px 24px 28px',
        cursor: 'pointer',
        background: flipped ? 'var(--diary-paper)' : 'var(--diary-paper-deep)',
        border: '1.5px solid var(--diary-line-strong)',
        borderRadius: 16,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.25s ease, transform 0.18s ease',
        userSelect: 'none',
      }}
    >
      <button
        onClick={handleSpeak}
        aria-label="听发音"
        style={{
          position: 'absolute', top: 14, right: 14,
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--color-pink-base)', color: '#fff', border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <Volume2 size={16} />
      </button>

      {!flipped ? (
        <>
          <div style={{ fontSize: 11, color: 'var(--diary-ink-soft)', letterSpacing: '0.08em', marginBottom: 14, textTransform: 'uppercase' }}>
            正面 · 韩文
          </div>
          <button
            onClick={handleTapKorean}
            aria-label="查词"
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: 36, fontWeight: 700, color: 'var(--diary-ink)', textAlign: 'center', marginBottom: 8,
            }}
          >
            {word.korean}
          </button>
          <div style={{ fontSize: 13, color: 'var(--diary-ink-soft)', fontStyle: 'italic' }}>
            [{word.hangul}]
          </div>
          <div style={{ marginTop: 18, fontSize: 11, color: 'var(--diary-ink-faint)', letterSpacing: '0.04em' }}>
            点卡片查看意思 · 点单词查词
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 11, color: '#5ea886', letterSpacing: '0.08em', marginBottom: 12, textTransform: 'uppercase' }}>
            反面 · 中文
          </div>
          {/* 反面也保留韩文 + 罗马音，保持上下文 */}
          <button
            onClick={handleTapKorean}
            aria-label="查词"
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: 22, fontWeight: 700, color: 'var(--diary-ink)', textAlign: 'center', marginBottom: 4,
            }}
          >
            {word.korean}
          </button>
          <div style={{ fontSize: 12, color: 'var(--diary-ink-soft)', fontStyle: 'italic', marginBottom: 14 }}>
            [{word.hangul}]
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--diary-ink)', textAlign: 'center', marginBottom: 12 }}>
            {word.zh}
          </div>
          <div style={{ fontSize: 11, color: 'var(--diary-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
            {word.pos}
          </div>
          {word.example && (
            <div style={{ marginTop: 12, padding: '12px 14px', background: 'var(--diary-paper-deep)', borderRadius: 8, width: '100%', maxWidth: 360 }}>
              <div style={{ fontSize: 14, color: 'var(--diary-ink)', marginBottom: 6, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                {word.example.ko.split(/\s+/).filter(Boolean).map((tok, i) => (
                  <button
                    key={`${tok}-${i}`}
                    onClick={(e) => handleTapExampleWord(e, tok)}
                    style={{
                      background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                      fontSize: 14, color: 'var(--diary-ink)',
                      borderBottom: '1px dotted var(--diary-line-strong)',
                    }}
                  >
                    {tok}
                  </button>
                ))}
                <button
                  onClick={(e) => handleSpeakExample(e, word.example.ko)}
                  aria-label="听例句"
                  style={{
                    background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                    color: 'var(--color-pink-base)', display: 'inline-flex', alignItems: 'center',
                  }}
                >
                  <Volume2 size={13} />
                </button>
              </div>
              <div style={{ fontSize: 12, color: 'var(--diary-ink-soft)', textAlign: 'center' }}>{word.example.zh}</div>
            </div>
          )}
          {word.tip && (
            <div style={{ marginTop: 10, fontSize: 11, color: 'var(--diary-ink-faint)', textAlign: 'center', fontStyle: 'italic' }}>
              💡 {word.tip}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ═══════ 速测题生成 ═══════ */
interface QuizQ {
  ko: string;
  hangul: string;
  options: Array<{ zh: string; correct: boolean }>;
}

function buildQuiz(words: ToriWord[]): QuizQ[] {
  return words.map((w) => {
    const distractors = words
      .filter((x) => x.id !== w.id)
      .map((x) => x.zh);
    const pickedDistractors = shuffle(distractors).slice(0, 3);
    const options = shuffle([
      { zh: w.zh, correct: true },
      ...pickedDistractors.map((zh) => ({ zh, correct: false })),
    ]);
    return { ko: w.korean, hangul: w.hangul, options };
  });
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
