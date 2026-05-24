'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, X, ArrowRight, RotateCcw, Trophy, Sparkles, Star, Lock } from 'lucide-react';
import { progressiveSteps, type ProgressiveStep } from '@/data/phonetics-steps';
import type { PhoneticLetter } from '@/data/phonetics';
import { emitXpFlyout } from '@/components/XpOverlay';

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

export default function ProgressivePhonetics() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<'browse' | 'quiz'>('browse');
  const [quizQuestions, setQuizQuestions] = useState<ReturnType<typeof generateStepQuiz>>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  useEffect(() => { setCompletedSteps(loadCompletedSteps()); }, []);

  const activeStep = progressiveSteps[activeStepIdx];
  const prevCompleted = activeStepIdx > 0 ? completedSteps.has(progressiveSteps[activeStepIdx - 1].id) : true;
  const allDone = progressiveSteps.every((s) => completedSteps.has(s.id));

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

  const handleQuizAnswer = (idx: number) => {
    setQuizAnswer(idx);
    if (idx === quizQuestions[quizIdx].options.indexOf(quizQuestions[quizIdx].correctAnswer)) {
      setQuizCorrect((prev) => prev + 1);
    }
  };

  const handleQuizNext = () => {
    if (quizIdx + 1 >= quizQuestions.length) {
      setQuizComplete(true);
      const passed = quizCorrect + (quizAnswer !== null && quizAnswer === quizQuestions[quizIdx].options.indexOf(quizQuestions[quizIdx].correctAnswer) ? 0 : 0) >= Math.ceil(quizQuestions.length / 2);
      // Actually, recount the correct count properly
      const totalCorrect = quizAnswer === quizQuestions[quizIdx].options.indexOf(quizQuestions[quizIdx].correctAnswer) ? quizCorrect : quizCorrect;
      if (totalCorrect >= Math.ceil(quizQuestions.length * 0.6)) {
        const newCompleted = new Set(completedSteps);
        newCompleted.add(activeStep.id);
        setCompletedSteps(newCompleted);
        saveCompletedSteps(newCompleted);
        emitXpFlyout(15);
      }
    } else {
      setQuizIdx((prev) => prev + 1);
      setQuizAnswer(null);
    }
  };

  const goToStep = (idx: number) => {
    setActiveStepIdx(idx);
    setMode('browse');
    setQuizAnswer(null);
    setQuizIdx(0);
    setQuizComplete(false);
  };

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
              {isDone ? <Check size={12} /> : isLocked ? <Lock size={10} /> : <span>{step.emoji}</span>}
              {step.title}
              {i < progressiveSteps.length - 1 && (
                <span className="text-[var(--text-muted)] ml-0.5">›</span>
              )}
            </button>
          );
        })}
      </div>

      {/* All done celebration */}
      {allDone && (
        <div className="bg-gradient-to-r from-[var(--mint-soft)]/15 to-[var(--purple-soft)]/15 border border-[var(--mint-soft)]/30 rounded-2xl p-4 text-center animate-fade-in">
          <div className="text-3xl mb-2">🏆</div>
          <p className="text-sm font-bold text-[var(--text-primary)]">축하합니다! 四十音全部学习完毕！</p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            你已经掌握了所有韩文字母，可以开始学习单词了
          </p>
        </div>
      )}

      {/* Step header */}
      {mode === 'browse' && (
        <>
          <div className="text-center">
            <div className="text-5xl mb-3">{activeStep.emoji}</div>
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
                  {/* Header */}
                  <div className="mb-2">
                    <span className="text-2xl">{letter.emoji}</span>
                  </div>
                  <div className="text-3xl font-extrabold text-[var(--text-primary)] mb-1 text-center" style={{ fontFamily: "'Nanum Gothic', sans-serif" }}>
                    {letter.letter}
                  </div>
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
                  {/* Expanded detail */}
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
                        <div
                          key={l.id}
                          className="flex items-center gap-2 bg-[var(--bg-input)] rounded-xl px-3 py-2"
                        >
                          <span className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Nanum Gothic', sans-serif" }}>
                            {l.letter}
                          </span>
                          <span className="text-xs text-[var(--text-secondary)]">[{l.romanization}]</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Start quiz button */}
          <button
            onClick={startQuiz}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-all font-bold text-sm hover:shadow-lg hover:shadow-[var(--pink-primary)]/25 active:scale-[0.98]"
          >
            开始测验
            <ArrowRight size={18} />
          </button>
        </>
      )}

      {/* Quiz mode */}
      {mode === 'quiz' && !quizComplete && quizQuestions.length > 0 && (
        <div className="py-2 space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setMode('browse'); setQuizAnswer(null); }}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              ← 返回浏览
            </button>
            <span className="text-sm font-medium text-[var(--text-primary)]">测验 {quizIdx + 1}/{quizQuestions.length}</span>
            <span className="text-xs text-[var(--text-muted)]">正确: {quizCorrect}</span>
          </div>

          <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
            <div
              className="bg-[var(--pink-primary)] h-1.5 rounded-full transition-all"
              style={{ width: `${((quizIdx + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-[var(--text-primary)] text-center">
              {quizQuestions[quizIdx].prompt}
            </h2>

            <div className="space-y-3">
              {quizQuestions[quizIdx].options.map((opt, i) => {
                const correctIdx = quizQuestions[quizIdx].options.indexOf(quizQuestions[quizIdx].correctAnswer);
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
                return (
                  <button
                    key={i}
                    onClick={() => quizAnswer === null && handleQuizAnswer(i)}
                    disabled={quizAnswer !== null}
                    className={`w-full p-4 rounded-xl text-left text-sm transition-all ${btnClass} font-bold`}
                    style={{ fontFamily: quizQuestions[quizIdx].prompt.includes('发音') ? "'Nanum Gothic', sans-serif" : undefined }}
                  >
                    {opt}
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
              <button
                onClick={handleQuizNext}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors font-medium active:scale-95"
              >
                {quizIdx + 1 >= quizQuestions.length ? '查看结果' : '下一题'}
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quiz complete */}
      {mode === 'quiz' && quizComplete && (
        <div className="py-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--purple-soft)]/20 to-[var(--pink-primary)]/20 flex items-center justify-center mx-auto border-2 border-[var(--purple-soft)]/30">
            {quizCorrect >= Math.ceil(quizQuestions.length * 0.6) ? (
              <Trophy size={36} className="text-[var(--peach-soft)]" />
            ) : (
              <RotateCcw size={36} className="text-[var(--text-muted)]" />
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {quizCorrect >= Math.ceil(quizQuestions.length * 0.6)
                ? `${activeStep.title} 完成！`
                : '再试一次？'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              正确 {quizCorrect}/{quizQuestions.length}
              （{Math.round((quizCorrect / quizQuestions.length) * 100)}%）
            </p>
          </div>

          {quizCorrect >= Math.ceil(quizQuestions.length * 0.6) && (
            <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-3">
              <div className="flex items-center gap-2 justify-center">
                <Sparkles size={16} className="text-[var(--mint-soft)]" />
                <span className="text-sm text-[var(--text-primary)]">+15 XP</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={startQuiz}
              className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
            >
              <RotateCcw size={16} />
              重新测验
            </button>
            {activeStepIdx < progressiveSteps.length - 1 && quizCorrect >= Math.ceil(quizQuestions.length * 0.6) && (
              <button
                onClick={() => {
                  goToStep(activeStepIdx + 1);
                }}
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
