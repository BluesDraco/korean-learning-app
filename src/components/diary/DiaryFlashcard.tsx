'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ToriDay, ToriWord, ToriModuleState } from '@/types/tori-diary';
import { Volume2, ChevronRight, Check, X, RotateCcw, ArrowLeft } from 'lucide-react';
import { speak } from '@/lib/tts';
import { sfxCorrect, sfxWrong } from '@/lib/sfx';
import { WordTapSheet } from '@/components/WordTapSheet';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import type { ZhChoice } from '@/types/inline';

interface Props {
  [k: string]: unknown;
  day: ToriDay;
  onComplete: () => void;
  onBack?: () => void;
  initialState?: ToriModuleState['flashcard'];
  onStateChange?: (patch: ToriModuleState['flashcard']) => void;
}

type Phase = 'review' | 'quiz' | 'done';

/**
 * Day Flashcard — 在 words 和 dialogue 之间
 * Phase 1 review: 翻卡过一遍今日的 N 个词
 * Phase 2 quiz: N 道韩→中速测，错 2 次也放过
 * Phase 3 done: 自动 onComplete
 */
export function DiaryFlashcard({ day, onComplete, onBack, initialState, onStateChange }: Props) {
  const { lang } = useLang();
  const words = day.words;
  const [phase, setPhase] = useState<Phase>(initialState?.phase ?? 'review');
  const [tapWord, setTapWord] = useState<string | null>(null);
  const completedRef = useRef(false);
  const safeComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  // ─── Phase 1: review ───
  const [idx, setIdx] = useState(initialState?.idx ?? 0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState<Set<string>>(new Set(initialState?.seen ?? []));

  // ─── Phase 2: quiz ───
  const quizQs = useMemo(() => buildQuiz(words), [words]);
  const [qIdx, setQIdx] = useState(initialState?.qIdx ?? 0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [wrongCount, setWrongCount] = useState(initialState?.wrongCount ?? 0);
  const [shaking, setShaking] = useState(false);

  // 保存到父级：翻卡、进入速测、切题都触发；done 是瞬时态不存
  useEffect(() => {
    if (phase === 'done') return;
    onStateChange?.({ phase, idx, seen: Array.from(seen), qIdx, wrongCount });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, idx, seen, qIdx, wrongCount]);

  useEffect(() => {
    if (!shaking) return;
    const timer = setTimeout(() => setShaking(false), 480);
    return () => clearTimeout(timer);
  }, [shaking]);

  useEffect(() => {
    setPicked(null); setChecked('idle'); setWrongCount(0); setShaking(false);
  }, [qIdx]);

  if (!words || words.length === 0) {
    // 没词的话直接放过（不应发生）
    return (
      <div className="diary-anim-fade-up" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <p className="diary-text-soft" style={{ marginBottom: 20 }}>{t('diary.fc.noWords', lang)}</p>
        <div style={{ display: 'flex', gap: 12 }}>
          {onBack && (
            <button onClick={onBack} style={{ flex: 1, height: 52, borderRadius: 14, background: 'var(--diary-paper-deep)', color: 'var(--diary-ink-2)', border: '1px solid var(--diary-line)', cursor: 'pointer', fontSize: 16, fontWeight: 600, fontFamily: 'var(--diary-font-zh)' }}>{t('diary.fc.prevStep', lang)}</button>
          )}
          <button onClick={safeComplete} className="diary-btn diary-btn-primary" style={{ flex: 2 }}>
            {t('diary.fc.continueDialogue', lang)} <ChevronRight size={16} />
          </button>
        </div>
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
        {onBack && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <button
              onClick={onBack}
              aria-label={t('diary.fc.back', lang)}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                color: 'var(--diary-ink-soft)', display: 'inline-flex', alignItems: 'center',
              }}
            >
              <ArrowLeft size={20} />
            </button>
            <span className="diary-tag diary-tag-mint">{t('diary.fc.tagFlashcard', lang)}</span>
          </div>
        )}
        {!onBack && (
          <div style={{ marginBottom: 18 }}>
            <span className="diary-tag diary-tag-mint">{t('diary.fc.tagFlashcard', lang)}</span>
          </div>
        )}
        <h2 className="diary-h2" style={{ marginBottom: 6 }}>{t('diary.fc.reviewTitle', lang, { n: words.length })}</h2>
        <p className="diary-text-soft" style={{ fontSize: 13, marginBottom: 20 }}>
          {t('diary.fc.reviewHint', lang, { seen: seen.size, total: words.length })}
        </p>

        {/* 进度点：已看(深绿+大点)/当前(粉条)/未看(灰圈) — 形状+颜色双重区分 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 22 }}>
          {words.map((w, i) => {
            const isSeenDot = seen.has(w.id);
            const isCurrentDot = i === idx;
            return (
              <span key={w.id} style={{
                width: isCurrentDot ? 22 : 10,
                height: 10,
                borderRadius: isCurrentDot ? 5 : '50%',
                background: isSeenDot
                  ? 'var(--color-mint-strong)'
                  : isCurrentDot
                  ? 'var(--color-pink-base)'
                  : 'transparent',
                border: isSeenDot
                  ? 'none'
                  : isCurrentDot
                  ? 'none'
                  : '2px solid var(--diary-line-strong)',
                transition: 'all 0.2s',
                boxShadow: isCurrentDot ? '0 0 0 3px rgba(255,127,168,0.18)' : 'none',
              }} />
            );
          })}
        </div>

        {/* 闪卡本体 */}
        <FlashcardFace
          word={word}
          flipped={flipped}
          onFlip={handleFlip}
          onTapWord={setTapWord}
        />

        {/* 键盘导航：上一张 / 下一张 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 22 }}>
          <button onClick={handlePrev} disabled={idx === 0}
            className="diary-btn diary-btn-ghost"
            style={{ fontSize: 12, padding: '4px 14px', opacity: idx === 0 ? 0.25 : 1 }}
          >
            {t('diary.fc.prevCard', lang)}
          </button>
          <span className="diary-text-soft" style={{ fontSize: 12, minWidth: '3em', textAlign: 'center' }}>{idx + 1} / {words.length}</span>
          <button onClick={handleNext} disabled={isLast ? !allSeen : !isSeen}
            className="diary-btn diary-btn-ghost"
            style={{ fontSize: 12, padding: '4px 14px', opacity: (isLast ? allSeen : isSeen) ? 1 : 0.25 }}
          >
            {(isLast ? allSeen : isSeen) ? (isLast ? t('diary.fc.enterQuiz', lang) : t('diary.fc.nextCard', lang)) : t('diary.fc.flipFirst', lang)}
          </button>
        </div>

        {/* 模块导航：上一步(1/3) + 开始速测(2/3) */}
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          {onBack && (
            <button onClick={onBack} style={{ flex: 1, height: 52, borderRadius: 14, background: 'var(--diary-paper-deep)', color: 'var(--diary-ink-2)', border: '1px solid var(--diary-line)', cursor: 'pointer', fontSize: 16, fontWeight: 600, fontFamily: 'var(--diary-font-zh)' }}>{t('diary.fc.prevStep', lang)}</button>
          )}
          <button
            onClick={() => { if (allSeen) setPhase('quiz'); }}
            disabled={!allSeen}
            className="diary-btn diary-btn-primary"
            style={{ flex: 2, opacity: allSeen ? 1 : 0.4, cursor: allSeen ? 'pointer' : 'not-allowed' }}
          >
            {t('diary.fc.startQuiz', lang)} <ChevronRight size={16} />
          </button>
        </div>

        {/* 「再翻一遍」按钮 — 翻完一轮才显示 */}
        {allSeen && (
          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <button onClick={handleRestart} className="diary-btn diary-btn-ghost" style={{ fontSize: 12 }}>
              <RotateCcw size={12} /> {t('diary.fc.flipAgain', lang)}
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
      if (isLast) { setPhase('done'); safeComplete(); return; }
      setQIdx(qIdx + 1);
    };

    return (
      <div className="diary-anim-fade-up" style={{ paddingBottom: 32 }}>
        <div style={{ marginBottom: 18 }}>
          <span className="diary-tag" style={{ background: 'var(--color-pink-base)', color: '#fff' }}>{t('diary.fc.tagQuiz', lang)}</span>
        </div>
        <h2 className="diary-h2" style={{ marginBottom: 6 }}>{t('diary.fc.quizTitle', lang)}</h2>
        <p className="diary-text-soft" style={{ fontSize: 13, marginBottom: 20 }}>
          {qIdx + 1}/{quizQs.length} · {t('diary.fc.quizHint', lang)}
        </p>

        <div className="diary-card-paper" style={{ padding: '24px 22px', background: 'var(--diary-paper)' }}>
          {/* 韩文题面 */}
          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <button
              onClick={() => { speak(q.ko).catch(() => {}); }}
              aria-label={t('diary.fc.listen', lang)}
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
              aria-label={t('diary.fc.lookup', lang)}
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
                    border: checked === 'correct' && opt.correct ? '1.5px solid var(--color-mint-strong)'
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
                  {checked === 'correct' && opt.correct && <Check size={16} color="var(--color-mint-strong)" style={{ marginLeft: 8, display: 'inline', verticalAlign: 'middle' }} />}
                  {showResult && !opt.correct && <X size={16} color="var(--diary-stamp-red)" style={{ marginLeft: 8, display: 'inline', verticalAlign: 'middle' }} />}
                </button>
              );
            })}
          </div>

          {/* 错答提示 */}
          {checked === 'wrong' && wrongCount < 2 && (
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(193,78,58,0.10)', borderRadius: 6, borderLeft: '3px solid var(--diary-stamp-red)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <X size={16} color="var(--diary-stamp-red)" />
              <span style={{ fontSize: 13 }}>{t('diary.fc.tryAgainCount', lang, { n: 2 - wrongCount })}</span>
              <button onClick={handleRetry} className="diary-btn diary-btn-ghost" style={{ padding: '4px 10px', fontSize: 11, marginLeft: 'auto' }}>
                <RotateCcw size={12} /> {t('diary.fc.reselect', lang)}
              </button>
            </div>
          )}
          {checked === 'wrong' && wrongCount >= 2 && (
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(255,184,77,0.10)', borderRadius: 6, borderLeft: '3px solid var(--color-gold-base, #e0a500)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>🥕</span>
              <span style={{ fontSize: 13 }}>{t('diary.fc.moveOnAnswer', lang)}<strong style={{ color: 'var(--diary-ink)' }}>{q.options.find((o) => o.correct)?.zh}</strong></span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
          {onBack && (
            <button onClick={onBack} style={{ flex: 1, height: 52, borderRadius: 14, background: 'var(--diary-paper-deep)', color: 'var(--diary-ink-2)', border: '1px solid var(--diary-line)', cursor: 'pointer', fontSize: 16, fontWeight: 600, fontFamily: 'var(--diary-font-zh)' }}>{t('diary.fc.prevStep', lang)}</button>
          )}
          <button
            onClick={handleNext}
            className="diary-btn diary-btn-primary"
            disabled={!canAdvance}
            style={{ flex: 2, opacity: canAdvance ? 1 : 0.4, cursor: canAdvance ? 'pointer' : 'not-allowed' }}
          >
            {isLast ? t('diary.fc.continueDialogue', lang) : t('diary.fc.nextQuestion', lang)} <ChevronRight size={16} />
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
  const { lang } = useLang();
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(word.korean).catch(() => {});
  };
  const handleSpeakExample = (e: React.MouseEvent, ko: string) => {
    e.stopPropagation();
    speak(ko).catch(() => {});
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
        aria-label={t('diary.fc.listen', lang)}
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
            {t('diary.fc.frontLabel', lang)}
          </div>
          <button
            onClick={handleTapKorean}
            aria-label={t('diary.fc.lookup', lang)}
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
            {t('diary.fc.frontTapHint', lang)}
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 11, color: 'var(--color-mint-strong)', letterSpacing: '0.08em', marginBottom: 12, textTransform: 'uppercase' }}>
            {t('diary.fc.backLabel', lang)}
          </div>
          {/* 反面也保留韩文 + 罗马音，保持上下文 */}
          <button
            onClick={handleTapKorean}
            aria-label={t('diary.fc.lookup', lang)}
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
                  aria-label={t('diary.fc.listenExample', lang)}
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
  [k: string]: unknown;
  ko: string;
  hangul: string;
  options: Array<ZhChoice>;
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
