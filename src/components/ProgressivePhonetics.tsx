'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Check, X, ArrowRight, RotateCcw, Trophy, Sparkles, Lock, Volume2, Ear } from 'lucide-react';
import { progressiveSteps } from '@/data/phonetics-steps';
import type { PhoneticLetter } from '@/data/phonetics';
import { speak, speakWord } from '@/lib/tts';
import { emitXpFlyout } from '@/components/XpOverlay';
import ReadingPractice from '@/components/ReadingPractice';
import { getFocusForLetter } from '@/data/pronunciation/letter-map';
import Link from 'next/link';

function shuffleArray<T>(arr: T[]): T[] {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

function generateStepQuiz(letters: PhoneticLetter[]) {
  const pool = [...letters].sort(() => Math.random() - 0.5).slice(0, Math.min(6, letters.length));
  return pool.map((item) => {
    const isLetterQ = Math.random() > 0.5;
    const wrongOptions = pool
      .filter((l) => l.id !== item.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      id: item.id,
      prompt: isLetterQ
        ? `"${item.letter}" 的发音是？`
        : `发音 "${item.romanization}" 对应哪个字母？`,
      correctAnswer: isLetterQ ? item.romanization : item.letter,
      options: shuffleArray([
        isLetterQ ? item.romanization : item.letter,
        ...wrongOptions.map((w) => (isLetterQ ? w.romanization : w.letter)),
      ]),
      item,
    };
  });
}

function generateListenQuiz(letters: PhoneticLetter[]) {
  const pool = [...letters].sort(() => Math.random() - 0.5).slice(0, Math.min(6, letters.length));
  return pool.map((item) => {
    const wrongOptions = pool
      .filter((l) => l.id !== item.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      id: item.id,
      correctAnswer: item.letter,
      options: shuffleArray([item.letter, ...wrongOptions.map((w) => w.letter)]),
      item,
    };
  });
}

const COMPLETED_KEY = 'phonetics-completed-steps';

function loadCompletedSteps(): Set<string> {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}

function saveCompletedSteps(steps: Set<string>) {
  localStorage.setItem(COMPLETED_KEY, JSON.stringify([...steps]));
}

type Mode = 'browse' | 'quiz' | 'listen';

export default function ProgressivePhonetics() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<Mode>('browse');
  const [quizQuestions, setQuizQuestions] = useState<ReturnType<typeof generateStepQuiz>>([]);
  const [listenQuestions, setListenQuestions] = useState<ReturnType<typeof generateListenQuiz>>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const audioPlayedRef = useRef(false);

  useEffect(() => { setCompletedSteps(loadCompletedSteps()); }, []);

  const activeStep = progressiveSteps[activeStepIdx];
  const allDone = progressiveSteps.every((s) => completedSteps.has(s.id));
  const doneCount = progressiveSteps.filter((s) => completedSteps.has(s.id)).length;

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const startQuiz = useCallback(() => {
    const questions = generateStepQuiz(activeStep.letters);
    setQuizQuestions(questions);
    setQuizIdx(0);
    setQuizAnswer(null);
    setQuizCorrect(0);
    setQuizComplete(false);
    setMode('quiz');
  }, [activeStep]);

  const startListen = useCallback(() => {
    const questions = generateListenQuiz(activeStep.letters);
    setListenQuestions(questions);
    setQuizIdx(0);
    setQuizAnswer(null);
    setQuizCorrect(0);
    setQuizComplete(false);
    audioPlayedRef.current = false;
    setMode('listen');
  }, [activeStep]);

  // Auto-play audio for listen mode
  useEffect(() => {
    if (mode === 'listen' && listenQuestions.length > 0 && !audioPlayedRef.current && quizAnswer === null && !quizComplete) {
      audioPlayedRef.current = true;
      const item = listenQuestions[quizIdx];
      speakWord(item.item.name, 0.7);
    }
  }, [mode, listenQuestions, quizIdx, quizAnswer, quizComplete]);

  const handleQuizAnswer = (idx: number) => {
    setQuizAnswer(idx);
    const questions = mode === 'listen' ? listenQuestions : quizQuestions;
    if (idx === questions[quizIdx].options.indexOf(questions[quizIdx].correctAnswer)) {
      setQuizCorrect((prev) => prev + 1);
    }
  };

  const handleQuizNext = () => {
    const questions = mode === 'listen' ? listenQuestions : quizQuestions;
    if (quizIdx + 1 >= questions.length) {
      setQuizComplete(true);
      if (quizCorrect >= Math.ceil(questions.length * 0.6)) {
        const newCompleted = new Set(completedSteps);
        newCompleted.add(activeStep.id);
        setCompletedSteps(newCompleted);
        saveCompletedSteps(newCompleted);
        emitXpFlyout(15);
      }
    } else {
      setQuizIdx((prev) => prev + 1);
      setQuizAnswer(null);
      audioPlayedRef.current = false;
    }
  };

  const replayAudio = () => {
    const questions = mode === 'listen' ? listenQuestions : quizQuestions;
    if (questions[quizIdx]) {
      speakWord(questions[quizIdx].item.name, 0.7);
    }
  };

  const goToStep = (idx: number) => {
    setActiveStepIdx(idx);
    setMode('browse');
    setQuizAnswer(null);
    setQuizIdx(0);
    setQuizComplete(false);
  };

  const questions = mode === 'listen' ? listenQuestions : quizQuestions;

  return (
    <div className="py-4 space-y-6">
      {/* Step progress bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {progressiveSteps.map((step, i) => {
          const isCurrent = i === activeStepIdx;
          const isDone = completedSteps.has(step.id);
          const isLocked = i > 0 && !completedSteps.has(progressiveSteps[i - 1].id);
          return (
            <button
              key={step.id}
              onClick={() => goToStep(i)}
              disabled={isLocked}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isCurrent
                  ? 'bg-[var(--pink-primary)] text-[var(--text-primary)] shadow-lg shadow-[var(--pink-primary)]/30'
                  : isDone
                    ? 'bg-[var(--mint-soft)]/20 text-[var(--mint-soft)] border border-[var(--mint-soft)]/40'
                    : isLocked
                      ? 'bg-[var(--bg-input)] text-[var(--text-placeholder)] cursor-not-allowed'
                      : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border border-[var(--border-color)]'
              }`}
            >
              {isDone ? <Check size={12} /> : isLocked ? <Lock size={10} /> : <span>{i + 1}</span>}
              {step.title}
              {i < progressiveSteps.length - 1 && (
                <span className="text-[var(--text-muted)] ml-0.5">›</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Progress summary */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[var(--text-secondary)]">学习进度</span>
            <span className="text-xs font-bold text-[var(--text-primary)]">{doneCount}/{progressiveSteps.length}</span>
          </div>
          <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] h-1.5 rounded-full transition-all"
              style={{ width: `${(doneCount / progressiveSteps.length) * 100}%` }}
            />
          </div>
        </div>
        {doneCount >= 3 && (
          <Link
            href="/course"
            className="shrink-0 text-xs text-[var(--pink-primary)] hover:underline font-medium"
          >
            开始学课程 →
          </Link>
        )}
      </div>

      {/* All done celebration */}
      {allDone && (
        <div className="bg-gradient-to-r from-[var(--mint-soft)]/15 to-[var(--purple-soft)]/15 border border-[var(--mint-soft)]/30 rounded-2xl p-5 text-center animate-fade-in space-y-3">
          <div className="text-3xl">🏆</div>
          <div>
            <p className="text-sm font-bold text-[var(--text-primary)]">축하합니다! 韩语40音全部学习完毕！</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              你已经掌握了所有韩文字母 — 现在任何韩文你都能读出来了！
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            <Link
              href="/course"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--pink-primary)] text-white rounded-xl text-xs font-bold transition-colors hover:shadow-lg hover:shadow-[var(--pink-primary)]/25"
            >
              开始三十天课程 <ArrowRight size={14} />
            </Link>
            <Link
              href="/phonetics"
              onClick={() => {
                setActiveStepIdx(0);
                setMode('browse');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--bg-input)] text-[var(--text-primary)] rounded-xl text-xs font-medium transition-colors hover:bg-[var(--bg-accent)]"
            >
              去音节拼装器 <Sparkles size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* Step header */}
      {/* Reading step browse */}
      {mode === 'browse' && activeStep.isReadingStep && (
        <ReadingPractice words={activeStep.readingWords || []} step={activeStep} />
      )}

      {/* Normal step browse */}
      {mode === 'browse' && !activeStep.isReadingStep && (
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {activeStep.title} <span className="text-[var(--text-muted)] text-base font-normal">({activeStep.titleKo})</span>
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-md mx-auto">
              {activeStep.description}
            </p>
            <div className="text-xs text-[var(--text-muted)] mt-2">
              {activeStep.letters.length} 个字母
            </div>
          </div>

          {/* Letter cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {activeStep.letters.map((letter) => {
              const isExpanded = expandedCards.has(letter.id);
              return (
                <div
                  key={letter.id}
                  className={`bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 transition-all ${
                    isExpanded ? 'ring-2 ring-[var(--pink-primary)]/30 shadow-lg' : 'hover:border-[var(--border-hover)]'
                  }`}
                >
                  <button
                    onClick={() => speakWord(letter.name, 0.7)}
                    className="w-full text-3xl font-extrabold text-[var(--text-primary)] mb-1 text-center block hover:text-[var(--pink-primary)] transition-colors"
                    style={{ fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}
                    title="点击听发音"
                  >
                    {letter.letter}
                  </button>
                  <div className="text-sm text-[var(--text-secondary)] text-center mb-2">
                    {letter.name} <span className="text-[var(--text-muted)]">[{letter.romanization}]</span>
                  </div>
                  <button
                    onClick={() => toggleCard(letter.id)}
                    className="w-full flex items-center justify-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors py-1"
                  >
                    {isExpanded ? '收起' : '详情'}
                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                  {isExpanded && (
                    <div className="mt-2 pt-2 border-t border-[var(--border-color)] space-y-2 animate-fade-in">
                      <div className="text-xs text-[var(--text-secondary)]">
                        <span className="text-[var(--text-muted)]">发音：</span>{letter.sound}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        <span className="text-[var(--text-muted)]">记忆：</span>{letter.mnemonic}
                      </div>
                      {letter.strokeOrder && letter.strokeOrder.length > 0 && (
                        <div className="text-xs">
                          <span className="text-[var(--text-muted)]">笔顺：</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {letter.strokeOrder.map((s, i) => (
                              <span key={i} className="bg-[var(--bg-input)] px-1.5 py-0.5 rounded text-[var(--text-secondary)] text-[11px]">
                                {i + 1}. {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {getFocusForLetter(letter.letter) && (
                        <Link
                          href={`/pronunciation?focus=${encodeURIComponent(getFocusForLetter(letter.letter)!)}`}
                          className="flex items-center justify-center gap-1.5 w-full py-2 mt-1 rounded-xl bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 text-xs font-medium text-[var(--mint-soft)] hover:bg-[var(--mint-soft)]/20 transition-colors"
                        >
                          练习发音 <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Confused pairs section */}
          {activeStep.confusedPairs.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <span>⚠️</span> 易混淆发音对比
              </h3>
              <div className="space-y-3">
                {activeStep.confusedPairs.map((pair) => (
                  <div key={pair.id} className="bg-[var(--bg-card)] border border-[var(--peach-soft)]/20 rounded-2xl p-4">
                    <div className="text-sm font-medium text-[var(--text-primary)] mb-1">{pair.label}</div>
                    <div className="text-xs text-[var(--text-muted)] mb-3">{pair.tip}</div>
                    <div className="flex flex-wrap gap-2">
                      {pair.letters.map((l) => (
                        <button
                          key={l.id}
                          onClick={() => speakWord(l.name, 0.7)}
                          className="flex items-center gap-2 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] rounded-xl px-3 py-2 transition-colors"
                          title="点击听发音"
                        >
                          <span className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}>
                            {l.letter}
                          </span>
                          <span className="text-xs text-[var(--text-secondary)]">[{l.romanization}]</span>
                          <Volume2 size={12} className="text-[var(--text-muted)]" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quiz CTA buttons */}
          <div className="space-y-3">
            <button
              onClick={startQuiz}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-all font-bold text-sm hover:shadow-lg hover:shadow-[var(--pink-primary)]/25 active:scale-[0.98]"
            >
              看字选音测验
              <ArrowRight size={18} />
            </button>
            <button
              onClick={startListen}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--peach-soft)] to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-all font-bold text-sm hover:shadow-lg hover:shadow-[var(--pink-primary)]/25 active:scale-[0.98]"
            >
              <Ear size={18} />
              听音选字测验
            </button>
          </div>
        </>
      )}

      {/* Quiz / Listen mode (shared) */}
      {(mode === 'quiz' || mode === 'listen') && !quizComplete && questions.length > 0 && (
        <div className="py-2 space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setMode('browse'); setQuizAnswer(null); }}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              ← 返回浏览
            </button>
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {mode === 'listen' ? '听力' : '测验'} {quizIdx + 1}/{questions.length}
            </span>
            <span className="text-xs text-[var(--text-muted)]">正确: {quizCorrect}</span>
          </div>

          <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
            <div
              className="bg-[var(--pink-primary)] h-1.5 rounded-full transition-all"
              style={{ width: `${((quizIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-6">
            {/* Listen mode: show speaker button + prompt */}
            {mode === 'listen' && (
              <div className="text-center space-y-3">
                <p className="text-sm text-[var(--text-secondary)]">听发音，选择对应的字母</p>
                <button
                  onClick={replayAudio}
                  className="inline-flex items-center gap-2 px-6 py-4 bg-[var(--pink-primary)]/10 border-2 border-[var(--pink-primary)]/30 rounded-3xl hover:bg-[var(--pink-primary)]/20 transition-colors"
                >
                  <Volume2 size={28} className="text-[var(--pink-primary)]" />
                  <span className="text-sm font-bold text-[var(--pink-primary)]">点击播放发音</span>
                </button>
              </div>
            )}

            {/* Quiz mode: show text prompt */}
            {mode === 'quiz' && (
              <h2 className="text-lg font-bold text-[var(--text-primary)] text-center">
                {quizQuestions[quizIdx].prompt}
              </h2>
            )}

            <div className="space-y-3">
              {questions[quizIdx].options.map((opt, i) => {
                const correctIdx = questions[quizIdx].options.indexOf(questions[quizIdx].correctAnswer);
                let btnClass = 'bg-[var(--bg-input)] border border-[var(--border-color)] hover:border-[var(--border-hover)]';
                if (quizAnswer !== null) {
                  if (i === correctIdx) {
                    btnClass = 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
                  } else if (i === quizAnswer && i !== correctIdx) {
                    btnClass = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50 text-[var(--color-danger)]';
                  } else {
                    btnClass = 'bg-[var(--bg-input)] border-[var(--border-color)] opacity-50';
                  }
                }
                const isKoreanChar = mode === 'listen' || (mode === 'quiz' && quizQuestions[quizIdx].prompt.includes('发音'));
                return (
                  <button
                    key={i}
                    onClick={() => quizAnswer === null && handleQuizAnswer(i)}
                    disabled={quizAnswer !== null}
                    className={`w-full p-4 rounded-xl text-left text-sm transition-all ${btnClass} font-bold`}
                    style={{ fontFamily: isKoreanChar ? "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" : undefined }}
                  >
                    <span className={isKoreanChar ? 'text-2xl' : ''}>{opt}</span>
                    {quizAnswer !== null && i === correctIdx && (
                      <Check size={16} className="text-[var(--mint-soft)] inline ml-2" />
                    )}
                    {quizAnswer !== null && i === quizAnswer && i !== correctIdx && (
                      <X size={16} className="text-[var(--color-danger)] inline ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {quizAnswer !== null && (
              <div className="space-y-3 pt-2 border-t border-[var(--border-color)]">
                {mode === 'listen' && (
                  <button
                    onClick={replayAudio}
                    className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors"
                  >
                    <Volume2 size={14} />
                    再听一次
                  </button>
                )}
                <button
                  onClick={handleQuizNext}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors font-medium active:scale-95"
                >
                  {quizIdx + 1 >= questions.length ? '查看结果' : '下一题'}
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quiz / Listen complete */}
      {(mode === 'quiz' || mode === 'listen') && quizComplete && (
        <div className="py-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--purple-soft)]/20 to-[var(--pink-primary)]/20 flex items-center justify-center mx-auto border-2 border-[var(--purple-soft)]/30">
            {quizCorrect >= Math.ceil(questions.length * 0.6) ? (
              <Trophy size={36} className="text-[var(--peach-soft)]" />
            ) : (
              <RotateCcw size={36} className="text-[var(--text-muted)]" />
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {quizCorrect >= Math.ceil(questions.length * 0.6)
                ? `${activeStep.title} 完成！`
                : '再试一次？'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              正确 {quizCorrect}/{questions.length}
              （{Math.round((quizCorrect / questions.length) * 100)}%）
            </p>
          </div>

          {quizCorrect >= Math.ceil(questions.length * 0.6) && (
            <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-3">
              <div className="flex items-center gap-2 justify-center">
                <Sparkles size={16} className="text-[var(--mint-soft)]" />
                <span className="text-sm text-[var(--text-primary)]">+15 XP</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={mode === 'listen' ? startListen : startQuiz}
              className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
            >
              <RotateCcw size={16} />
              重新测验
            </button>
            {activeStepIdx < progressiveSteps.length - 1 && quizCorrect >= Math.ceil(questions.length * 0.6) && (
              <button
                onClick={() => goToStep(activeStepIdx + 1)}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
              >
                下一步: {progressiveSteps[activeStepIdx + 1].title}
                <ArrowRight size={16} />
              </button>
            )}
            <button
              onClick={() => setMode('browse')}
              className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
            >
              返回浏览
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
