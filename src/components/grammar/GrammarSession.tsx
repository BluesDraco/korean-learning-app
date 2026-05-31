'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  ArrowLeft, Volume2, Sparkles, Zap,
  Lightbulb, AlertCircle, CheckCircle2,
} from 'lucide-react';
import type { GrammarPoint } from '@/types';
import { GRAMMAR_TO_COURSE_DAY } from '@/data/grammar-new';
import { getCourseDayForGrammar } from '@/data/thirtyDayCourse';
import { globalPlayer } from '@/lib/audio/player';
import { db } from '@/lib/db';
import { awardXp, XP_REWARDS } from '@/lib/gamification';

interface Props {
  grammar: GrammarPoint;
  onClose: () => void;
  reviewQueue?: GrammarPoint[];
  onNextReview?: (next: GrammarPoint) => void;
}

type StepType = 'target' | 'examples' | 'rule' | 'substitution' | 'choice' | 'output' | 'settlement';

function Badge({ text }: { text: string }) {
  return (
    <span className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">
      {text}
    </span>
  );
}

const stepLabels: Record<StepType, string> = {
  target: '今日目标', examples: '例句感知', rule: '规则解析',
  substitution: '替换练习', choice: '判断对错', output: '造句输出',
  settlement: '完成',
};

export function GrammarSession({ grammar, onClose, reviewQueue, onNextReview }: Props) {
  const [step, setStep] = useState<StepType>('target');
  const [subIdx, setSubIdx] = useState(0);
  const [choiceIdx, setChoiceIdx] = useState(0);
  const [outputText, setOutputText] = useState('');
  const [choiceResult, setChoiceResult] = useState<'correct' | 'wrong' | null>(null);
  const [selectedChoiceOption, setSelectedChoiceOption] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [playerState, setPlayerState] = useState<string>('idle');
  const [nextReviewDays, setNextReviewDays] = useState(1);
  const correctRef = useRef(0);
  const wrongRef = useRef(0);

  const subTemplates = grammar.practiceTemplates.filter((t) => t.type === 'substitution');
  const choiceTemplates = grammar.practiceTemplates.filter((t) => t.type === 'choice');
  const outputTemplate = grammar.practiceTemplates.find((t) => t.type === 'output');
  const courseDay = GRAMMAR_TO_COURSE_DAY[grammar.id];

  const intervalLabel = (days: number): string => {
    if (days <= 1) return '明天';
    if (days <= 7) return `${days} 天后`;
    if (days <= 14) return '两周后';
    return '一个月后';
  };

  useEffect(() => {
    globalPlayer.setStateChange(setPlayerState);
    return () => { globalPlayer.stop(); };
  }, []);

  const isPlaying = playerState === 'playing' || playerState === 'loading';

  const playTTS = useCallback((text: string) => {
    globalPlayer.speakTTS(text, 0.8);
  }, []);

  // ── Compute next review interval (SRS-like) ──
  const getNextInterval = (correctCount: number, status: string): number => {
    if (status === 'difficult') return 1; // 1 day
    if (correctCount <= 1) return 1;       // 1 day
    if (correctCount === 2) return 3;      // 3 days
    if (correctCount === 3) return 7;      // 7 days
    if (correctCount === 4) return 14;     // 14 days
    return 30; // mastered — 30 days
  };

  const getNextStatus = (correctCount: number, status: string): import('@/types').UserGrammarState['status'] => {
    if (status === 'difficult') return 'learning';
    if (correctCount >= 5) return 'mastered';
    if (correctCount >= 3) return 'familiar';
    return 'learning';
  };

  // ── Save grammar state on settlement ──
  const saveState = useCallback(async () => {
    try {
      const c = correctRef.current;
      const w = wrongRef.current;
      const existing = await db.userGrammarStates.get(grammar.id);
      const now = Date.now();
      const totalCorrect = (existing?.correctCount ?? 0) + c;
      const totalWrong = (existing?.wrongCount ?? 0) + w;
      const newStatus = w > c ? 'difficult' : getNextStatus(totalCorrect, existing?.status ?? 'new');
      const intervalDays = getNextInterval(totalCorrect, newStatus);
      setNextReviewDays(intervalDays);
      if (existing) {
        await db.userGrammarStates.update(grammar.id, {
          status: newStatus,
          seenCount: existing.seenCount + 1,
          correctCount: totalCorrect,
          wrongCount: totalWrong,
          lastSeenAt: now,
          nextReviewAt: now + intervalDays * 24 * 60 * 60 * 1000,
          updatedAt: now,
        });
      } else {
        await db.userGrammarStates.put({
          id: grammar.id,
          status: newStatus,
          seenCount: 1,
          correctCount: c,
          wrongCount: w,
          lastSeenAt: now,
          nextReviewAt: now + intervalDays * 24 * 60 * 60 * 1000,
          source: 'grammar_session',
          createdAt: now,
          updatedAt: now,
        });
      }
      await awardXp(XP_REWARDS.wordReviewed);
    } catch (_) {}
  }, [grammar.id]);

  const goNextStep = useCallback(() => {
    const seq: StepType[] = [
      'target',
      ...(grammar.examples.length > 0 ? ['examples' as StepType] : []),
      'rule',
      ...(subTemplates.length > 0 ? ['substitution' as StepType] : []),
      ...(choiceTemplates.length > 0 ? ['choice' as StepType] : []),
      ...(outputTemplate ? ['output' as StepType] : []),
      'settlement',
    ];

    const idx = seq.indexOf(step);
    if (idx >= 0 && idx < seq.length - 1) {
      const next = seq[idx + 1];
      if (next === 'settlement') saveState();
      setStep(next);
      setChoiceResult(null);
      setSelectedChoiceOption(null);
      setChoiceIdx(0);
      setOutputText('');
    }
  }, [step, grammar.examples.length, subTemplates.length, choiceTemplates.length, outputTemplate, saveState]);

  // ── Substitution logic ──
  const currentSub = subTemplates[subIdx] ?? null;

  const handleSubNext = () => {
    correctRef.current += 1;
    if (subIdx + 1 < subTemplates.length) {
      setSubIdx(subIdx + 1);
      setCorrectCount((c) => c + 1);
    } else {
      setCorrectCount((c) => c + 1);
      goNextStep();
    }
  };

  // ── Choice logic ──
  const currentChoice = choiceTemplates[choiceIdx] ?? null;

  const handleChoiceSelect = (opt: string) => {
    if (choiceResult) return;
    if (!currentChoice) return;
    setSelectedChoiceOption(opt);
    if (opt === currentChoice.answer) {
      setChoiceResult('correct');
      correctRef.current += 1;
      setCorrectCount((c) => c + 1);
    } else {
      setChoiceResult('wrong');
      wrongRef.current += 1;
      setWrongCount((c) => c + 1);
    }
  };

  const handleChoiceNext = () => {
    if (choiceIdx + 1 < choiceTemplates.length) {
      setChoiceIdx(choiceIdx + 1);
      setChoiceResult(null);
      setSelectedChoiceOption(null);
    } else {
      goNextStep();
    }
  };

  // ── Output logic ──
  const handleOutputSubmit = () => {
    if (outputText.trim()) {
      correctRef.current += 1;
      setCorrectCount((c) => c + 1);
      goNextStep();
    }
  };

  const handleRestart = useCallback(() => {
    setStep('target');
    setSubIdx(0);
    setChoiceIdx(0);
    setOutputText('');
    setChoiceResult(null);
    setSelectedChoiceOption(null);
    setCorrectCount(0);
    setWrongCount(0);
    setNextReviewDays(1);
    correctRef.current = 0;
    wrongRef.current = 0;
  }, []);

  // ── Render ──
  const totalSteps = 1 + (grammar.examples.length > 0 ? 1 : 0) + 1 + (subTemplates.length > 0 ? 1 : 0) + (choiceTemplates.length > 0 ? 1 : 0) + (outputTemplate ? 1 : 0);
  const stepIdx = ['target', 'examples', 'rule', 'substitution', 'choice', 'output'].indexOf(step);
  const progress = ((stepIdx + 1) / totalSteps) * 100;

  // ═══════════════════════════════ SETTLEMENT ═══════════════════════════════
  if (step === 'settlement') {
    const courseRef = getCourseDayForGrammar(grammar.id);

    return (
      <div className="py-4 max-w-lg mx-auto space-y-6 text-center">
        <div className="text-6xl">🐰</div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">句型完成!</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            学会了：{grammar.displayTitle}
          </p>
          {courseRef && (
            <p className="text-xs text-[var(--mint-soft)] mt-1">
              此句型来自 Day {courseRef.day}·{courseRef.title}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <CheckCircle2 size={20} className="text-[var(--mint-soft)] mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--text-primary)]">{correctCount}</div>
            <div className="text-xs text-[var(--text-muted)]">答对</div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <Zap size={20} className="text-[var(--peach-soft)] mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--text-primary)]">{grammar.displayTitle}</div>
            <div className="text-xs text-[var(--text-muted)]">已学句型</div>
          </div>
        </div>

        <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-5 text-left">
          <p className="text-sm font-bold text-[var(--text-primary)] mb-2">你现在可以说：</p>
          {grammar.examples.slice(0, 3).map((ex, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5">
              <span className="text-xs text-[var(--text-muted)] w-1 h-1 rounded-full bg-[var(--mint-soft)] shrink-0" />
              <span className="text-sm text-[var(--text-secondary)]">{ex.ko}</span>
              <span className="text-xs text-[var(--text-muted)]">{ex.zh}</span>
            </div>
          ))}
          <p className="text-[10px] text-[var(--mint-soft)] mt-2">{intervalLabel(nextReviewDays)}会帮你复习这个句型</p>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] font-medium text-sm">
            返回句型页
          </button>
          <button onClick={handleRestart} className="flex-1 py-3 rounded-xl bg-[var(--pink-primary)] text-white font-medium text-sm">
            再来一遍
          </button>
        </div>
        {reviewQueue && reviewQueue.length > 0 && onNextReview && (
          <button
            onClick={() => onNextReview(reviewQueue[0])}
            className="w-full py-3.5 bg-gradient-to-r from-[var(--peach-soft)] to-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm"
          >
            下一个复习 ({reviewQueue.length} 个剩余)
          </button>
        )}
      </div>
    );
  }

  // ═══════════════════════════════ PRACTICE ═══════════════════════════════
  return (
    <div className="py-4 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </button>
        <span className="text-xs font-medium text-[var(--text-primary)]">{stepLabels[step]}</span>
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Sparkles size={12} />{grammar.pattern}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[var(--border-color)]/40 rounded-full h-1.5 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-[var(--mint-soft)] to-[var(--pink-primary)] transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>

      {/* Card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 min-h-[460px] flex flex-col items-center justify-center text-center space-y-5">
        {/* ── TARGET ── */}
        {step === 'target' && (
          <>
            <Badge text="今日句型" />
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">{grammar.displayTitle}</h2>
            <p className="text-sm text-[var(--text-muted)]">{grammar.functionZh}</p>
            {grammar.useCases.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center">
                {grammar.useCases.map((uc) => (
                  <span key={uc} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]">{uc}</span>
                ))}
              </div>
            )}
            <button onClick={goNextStep} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
              开始学习
            </button>
          </>
        )}

        {/* ── EXAMPLES ── */}
        {step === 'examples' && (
          <>
            <Badge text="例句感知" />
            <p className="text-xs text-[var(--text-muted)]">先读一遍例句，感受一下这个句型</p>
            <div className="space-y-3 w-full">
              {grammar.examples.map((ex, i) => (
                <div key={i} className="bg-[var(--bg-input)] rounded-xl p-4 text-left flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">{ex.ko}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{ex.zh}</p>
                  </div>
                  <button
                    onClick={() => playTTS(ex.ko)}
                    className="p-2 rounded-xl text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/10 transition-colors shrink-0"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={goNextStep} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
              看懂了，看规则
            </button>
          </>
        )}

        {/* ── RULE ── */}
        {step === 'rule' && (
          <>
            <Badge text="规则解析" />
            {courseDay && (
              <p className="text-[10px] text-[var(--text-muted)]">
                在课程 Day {courseDay} 学过这个句型
              </p>
            )}
            <p className="text-sm text-[var(--text-primary)] font-bold">{grammar.shortExplanation}</p>
            {grammar.structure.length > 0 && (
              <div className="bg-[var(--bg-input)] rounded-2xl p-4 w-full text-left space-y-1.5">
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">结构公式</p>
                {grammar.structure.map((s, i) => (
                  <div key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--mint-soft)] mt-0.5 shrink-0">{i + 1}.</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            )}
            {grammar.toriTip && (
              <div className="flex items-start gap-2 bg-[var(--peach-soft)]/10 border border-[var(--peach-soft)]/20 rounded-xl p-3 w-full text-left">
                <Lightbulb size={14} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--text-secondary)]">{grammar.toriTip}</p>
              </div>
            )}
            {grammar.commonMistakes.length > 0 && (
              <div className="bg-[var(--pink-pale)]/10 border border-[var(--pink-primary)]/10 rounded-xl p-3 w-full text-left space-y-1">
                <p className="text-[10px] text-[var(--pink-primary)] font-medium mb-1">常见错误</p>
                {grammar.commonMistakes.map((cm, i) => (
                  <div key={i} className="text-xs">
                    <span className="text-[var(--color-danger)] line-through">{cm.wrong}</span>
                    <span className="text-[var(--text-muted)] mx-1">→</span>
                    <span className="text-[var(--mint-soft)]">{cm.correct}</span>
                  </div>
                ))}
              </div>
            )}
            <button onClick={goNextStep} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
              {subTemplates.length > 0 ? '开始练习' : '继续'}
            </button>
          </>
        )}

        {/* ── SUBSTITUTION ── */}
        {step === 'substitution' && currentSub && (
          <>
            <Badge text="替换练习" />
            <p className="text-xs text-[var(--text-muted)]">{currentSub.prompt}</p>
            {currentSub.template && (
              <h3 className="text-xl font-extrabold text-[var(--text-primary)]">{currentSub.template}</h3>
            )}
            {currentSub.slots && (
              <div className="flex flex-wrap gap-2 justify-center">
                {currentSub.slots.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => playTTS(slot)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all ${
                      isPlaying
                        ? 'bg-[var(--bg-input)] text-[var(--text-muted)]'
                        : 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-[var(--text-muted)]">先读每个替换词，感受不同组合</p>
            <button onClick={handleSubNext} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
              {subIdx + 1 < subTemplates.length ? '下一组' : '继续'}
            </button>
          </>
        )}

        {/* ── CHOICE ── */}
        {step === 'choice' && currentChoice && (
          <>
            <Badge text={`判断对错 ${choiceIdx + 1}/${choiceTemplates.length}`} />
            <p className="text-sm text-[var(--text-primary)] font-medium">{currentChoice.prompt}</p>

            <div className="space-y-2 w-full">
              {currentChoice.options?.map((opt, i) => {
                let btnStyle = 'bg-[var(--bg-input)] text-[var(--text-primary)] hover:border-[var(--pink-primary)]/30';
                if (choiceResult) {
                  if (opt === currentChoice.answer) {
                    btnStyle = 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)] text-[var(--mint-soft)]';
                  } else if (opt === selectedChoiceOption) {
                    btnStyle = 'bg-[var(--color-danger-bg)] border-[var(--color-danger-light)] text-[var(--color-danger)]';
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleChoiceSelect(opt)}
                    disabled={choiceResult !== null}
                    className={`w-full p-3 rounded-xl border text-sm text-left transition-all ${btnStyle} ${
                      choiceResult ? 'border' : 'border border-transparent'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {choiceResult && (
              <div className={`flex items-start gap-2 rounded-xl p-3 w-full text-left ${
                choiceResult === 'correct'
                  ? 'bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20'
                  : 'bg-[var(--color-danger-bg)] border border-[var(--color-danger-light)]'
              }`}>
                {choiceResult === 'correct'
                  ? <CheckCircle2 size={14} className="text-[var(--mint-soft)] shrink-0 mt-0.5" />
                  : <AlertCircle size={14} className="text-[var(--color-danger)] shrink-0 mt-0.5" />
                }
                <div>
                  <p className="text-xs font-medium text-[var(--text-primary)]">
                    {choiceResult === 'correct' ? '正确!' : '再想想'}
                  </p>
                  {currentChoice.explanation && (
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{currentChoice.explanation}</p>
                  )}
                </div>
              </div>
            )}

            {choiceResult && (
              <button onClick={handleChoiceNext} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
                {choiceIdx + 1 < choiceTemplates.length ? '下一题' : '继续'}
              </button>
            )}
          </>
        )}

        {/* ── OUTPUT ── */}
        {step === 'output' && outputTemplate && (
          <>
            <Badge text="造句输出" />
            <p className="text-sm text-[var(--text-primary)] font-medium">{outputTemplate.prompt}</p>
            {outputTemplate.template && (
              <div className="bg-[var(--bg-input)] rounded-xl px-4 py-3 w-full">
                <p className="text-sm font-mono text-[var(--text-secondary)]">{outputTemplate.template}</p>
              </div>
            )}
            <div className="w-full">
              <textarea
                value={outputText}
                onChange={(e) => setOutputText(e.target.value)}
                placeholder="写下你的韩语句子..."
                rows={3}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] resize-none focus:outline-none focus:border-[var(--pink-pale)] transition-colors"
              />
            </div>
            <button
              onClick={handleOutputSubmit}
              disabled={!outputText.trim()}
              className={`w-full py-3 rounded-2xl font-bold text-sm transition-colors ${
                outputText.trim()
                  ? 'bg-[var(--pink-primary)] text-white'
                  : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
              }`}
            >
              完成
            </button>
          </>
        )}
      </div>
    </div>
  );
}
