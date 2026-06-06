'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { ArrowLeft, Volume2, Zap, Star, Sparkles, CheckCircle, XCircle, Flame } from 'lucide-react';
import { db } from '@/lib/db';
import { calculateSRS } from '@/lib/srs';
import { awardXp, XP_REWARDS, updateStreak } from '@/lib/gamification';
import { speak, speakWord } from '@/lib/tts';
import type { Word, MasteryLevel } from '@/types';

interface Props {
  words: Word[];
  onClose: () => void;
}

type StepType = 'warmup-reveal' | 'intro' | 'listen-choice' | 'meaning-choice' | 'fill-blank';
type Phase = 'loading' | 'practice' | 'settlement';

interface Step {
  word: Word;
  stepType: StepType;
  roundLabel: string;
}

const MAX_REVIEW = 8;
const MAX_NEW = 5;
const WARMUP_COUNT = 2;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(correct: string, pool: string[], count: number): string[] {
  const filtered = pool.filter((m) => m !== correct && m.trim().length > 0);
  return shuffle(filtered).slice(0, count);
}

const ROUND_NAMES: Record<StepType, string> = {
  'warmup-reveal': '热身回顾',
  'intro': '新词学习',
  'listen-choice': '听音选义',
  'meaning-choice': '看义选词',
  'fill-blank': '句子填空',
};

export function VocabularySession({ words, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>('loading');
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);
  const [options, setOptions] = useState<{ text: string; correct: boolean }[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [streakInfo, setStreakInfo] = useState<{ streak: number; isMilestone: boolean; milestone: number } | null>(null);
  const [sessionKey, setSessionKey] = useState(0);

  // Per-word tracking: session-level correct/wrong counts (accumulated across rounds)
  const wordScoresRef = useRef<Map<string, { correct: number; wrong: number; xpAwarded: boolean }>>(new Map());
  const latestSrsRef = useRef<Map<string, { srsLevel: number; easeFactor: number; interval: number }>>(new Map());
  const sessionWordsRef = useRef<Word[]>([]);
  const allMeaningsRef = useRef<string[]>([]);
  const allKoreanRef = useRef<string[]>([]);
  const answeringRef = useRef(false); // guards against double-click

  // Derived state
  const step = steps[currentStep];

  // ── Build session queue and steps ──
  useEffect(() => {
    const now = Date.now();
    const dueReview = words
      .filter((w) => w.nextReview <= now && w.mastery !== 'mastered')
      .slice(0, MAX_REVIEW);
    const newWords = words
      .filter((w) => w.mastery === 'new' && w.srsLevel === 0)
      .slice(0, MAX_NEW);

    const sessionWords = [...dueReview, ...newWords];
    sessionWordsRef.current = sessionWords;
    allMeaningsRef.current = words.map((w) => w.meaning).filter(Boolean);
    allKoreanRef.current = words.map((w) => w.word).filter(Boolean);

    // Reset scores and SRS tracking on restart
    wordScoresRef.current.clear();
    latestSrsRef.current.clear();
    const scores = wordScoresRef.current;
    for (const w of sessionWords) {
      scores.set(w.id, { correct: 0, wrong: 0, xpAwarded: false });
    }

    if (sessionWords.length === 0) {
      setPhase('settlement');
      return;
    }

    // Build steps
    const built: Step[] = [];
    const warmupWords = dueReview.slice(0, WARMUP_COUNT);
    const introWords = newWords;
    const allSession = sessionWords;
    const fillWords = newWords;

    // Warmup round
    for (const w of warmupWords) {
      built.push({ word: w, stepType: 'warmup-reveal', roundLabel: ROUND_NAMES['warmup-reveal'] });
    }

    // Intro round
    for (const w of introWords) {
      built.push({ word: w, stepType: 'intro', roundLabel: ROUND_NAMES['intro'] });
    }

    // Listen round
    for (const w of allSession) {
      built.push({ word: w, stepType: 'listen-choice', roundLabel: ROUND_NAMES['listen-choice'] });
    }

    // Meaning round
    for (const w of allSession) {
      built.push({ word: w, stepType: 'meaning-choice', roundLabel: ROUND_NAMES['meaning-choice'] });
    }

    // Fill-blank round
    for (const w of fillWords) {
      built.push({ word: w, stepType: 'fill-blank', roundLabel: ROUND_NAMES['fill-blank'] });
    }

    setSteps(built);
    setPhase('practice');

    // Auto-speak first step if intro
    const first = built[0];
    if (first && first.stepType === 'intro') {
      setTimeout(() => speakWord(first.word.word, 0.75), 300);
    }
  }, [words, sessionKey]);

  // ── Build options for choice/fill cards ──
  useEffect(() => {
    if (!step || (step.stepType !== 'listen-choice' && step.stepType !== 'meaning-choice' && step.stepType !== 'fill-blank')) return;

    // meaning-choice: show Chinese → pick Korean. Others: show Korean → pick Chinese.
    // fill-blank: show Korean sentence with blank → pick Korean word.
    const isKoreanOpts = step.stepType === 'meaning-choice' || step.stepType === 'fill-blank';
    const pool = isKoreanOpts ? allKoreanRef.current : allMeaningsRef.current;
    const correct = isKoreanOpts ? step.word.word : step.word.meaning;

    const distractors = pickDistractors(correct, pool, 3);
    const opts = shuffle([
      { text: correct, correct: true },
      ...distractors.map((d) => ({ text: d, correct: false })),
    ]);
    setOptions(opts);
    setSelectedOption(null);
    setAnswered(false);
    answeringRef.current = false;

    // Auto-speak for listen-choice
    if (step.stepType === 'listen-choice') {
      setTimeout(() => speakWord(step.word.word, 0.75), 200);
    }
  }, [currentStep, step]);

  // ── Handle option select ──
  const handleSelect = useCallback(async (idx: number) => {
    if (answered || !step || answeringRef.current) return;
    answeringRef.current = true;
    setAnswered(true);
    setSelectedOption(idx);
    const isCorrect = options[idx]?.correct ?? false;
    const quality = isCorrect ? 4 : 1;

    // Track per-word score
    const scores = wordScoresRef.current;
    const prev = scores.get(step.word.id) || { correct: 0, wrong: 0, xpAwarded: false };
    if (isCorrect) {
      scores.set(step.word.id, { ...prev, correct: prev.correct + 1 });
    } else {
      scores.set(step.word.id, { ...prev, wrong: prev.wrong + 1 });
    }

    // Update SRS — use latest values in case this word already appeared in earlier rounds
    const lastSrs = latestSrsRef.current.get(step.word.id);
    const curSrs = lastSrs || { srsLevel: step.word.srsLevel, easeFactor: step.word.easeFactor, interval: step.word.interval };
    const result = calculateSRS(quality, curSrs.srsLevel, curSrs.easeFactor, curSrs.interval);
    latestSrsRef.current.set(step.word.id, result);
    const newMastery: MasteryLevel =
      result.srsLevel >= 5 ? 'mastered' :
      result.srsLevel >= 3 ? 'reviewing' :
      result.srsLevel >= 1 ? 'learning' :
      'new';

    await db.words.update(step.word.id, {
      srsLevel: result.srsLevel,
      easeFactor: result.easeFactor,
      interval: result.interval,
      nextReview: result.nextReview,
      lastReviewed: Date.now(),
      mastery: newMastery,
      correctCount: (step.word.correctCount || 0) + (isCorrect ? 1 : 0),
      wrongCount: (step.word.wrongCount || 0) + (isCorrect ? 0 : 1),
    });

    if (isCorrect) {
      const entry = scores.get(step.word.id)!;
      const isNewWord = step.word.mastery === 'new';
      // Award wordLearned XP only once per new word
      const xp = (isNewWord && !entry.xpAwarded) ? XP_REWARDS.wordLearned : XP_REWARDS.wordReviewed;
      if (isNewWord) entry.xpAwarded = true;
      setXpEarned((p) => p + xp);
      await awardXp(xp);
    }
  }, [answered, step, options]);

  // ── Handle advance (intro/warmup reveal or after answer) ──
  const handleAdvance = useCallback(async () => {
    if (!step) return;

    // For warmup-reveal and intro, clicking the button just advances (no answer needed)
    if (step.stepType === 'warmup-reveal' || step.stepType === 'intro') {
      if (currentStep + 1 >= steps.length) {
        // Update streak on session complete
        const { streak, isMilestone, milestone } = await updateStreak();
        setStreakInfo({ streak, isMilestone, milestone });
        setPhase('settlement');
      } else {
        const nextStep = steps[currentStep + 1];
        setCurrentStep(currentStep + 1);
        if (nextStep.stepType === 'intro') {
          setTimeout(() => speakWord(nextStep.word.word, 0.75), 300);
        }
      }
      return;
    }

    // For practice cards, require answer
    if (!answered) return;

    if (currentStep + 1 >= steps.length) {
      const { streak, isMilestone, milestone } = await updateStreak();
      setStreakInfo({ streak, isMilestone, milestone });
      setPhase('settlement');
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, step, steps, answered]);

  // ── Handle speak ──
  const handleSpeak = useCallback(() => {
    if (step) speakWord(step.word.word, 0.75);
  }, [step]);

  const handleSpeakFillBlank = useCallback(() => {
    if (step) {
      // For fill-blank, speak the example sentence if available
      const ex = step.word.examples[0];
      speak(ex?.text || step.word.word, 0.75);
    }
  }, [step]);

  // ── Fill-blank text ──
  const fillBlankText = useMemo(() => {
    if (!step || step.stepType !== 'fill-blank') return { korean: '', chinese: '' };
    const w = step.word;
    const ex = w.examples[0];
    if (ex) {
      const replaced = ex.text.replace(w.word, '____');
      if (replaced !== ex.text) return { korean: replaced, chinese: ex.translation };
      return { korean: `____ — ${ex.text}`, chinese: ex.translation };
    }
    return { korean: `____ (${w.meaning})`, chinese: '' };
  }, [step]);

  // ── Compute settlement stats (re-computes when phase changes) ──
  const settlementStats = useMemo(() => {
    const sw = sessionWordsRef.current;
    const scores = wordScoresRef.current;

    let totalCorrect = 0;
    let totalWrong = 0;
    for (const w of sw) {
      const s = scores.get(w.id);
      if (s) {
        totalCorrect += s.correct;
        totalWrong += s.wrong;
      }
    }
    const total = totalCorrect + totalWrong;
    const accuracy = total > 0 ? Math.round((totalCorrect / total) * 100) : 0;

    const newLearned = sw.filter((w) => {
      const s = scores.get(w.id);
      return s && s.correct > s.wrong && (w.mastery === 'new');
    }).map((w) => w.word);

    const oldReviewed = sw.filter((w) => {
      const s = scores.get(w.id);
      return s && s.correct > s.wrong && w.mastery !== 'new';
    }).length;

    return {
      totalCorrect,
      totalWrong,
      total,
      accuracy,
      newLearned,
      oldReviewed,
      tomorrowReview: sw.length,
      sessionCount: sw.length,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Derived step counts for progress
  const currentRoundName = step?.roundLabel || '';

  // ── Render ──
  if (phase === 'loading') {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (phase === 'settlement') {
    const s = settlementStats;
    return (
      <div className="py-4 max-w-lg mx-auto space-y-6 text-center">
        <div className="text-6xl">🐰</div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">练习完成!</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            共 {s.sessionCount} 个词，答题 {s.total} 次
          </p>
          {s.accuracy > 0 && (
            <p className={`text-lg font-bold mt-1 ${s.accuracy >= 70 ? 'text-[var(--mint-soft)]' : 'text-[var(--peach-soft)]'}`}>
              {s.accuracy}% 正确率
            </p>
          )}
          {streakInfo && (
            <p className="text-xs text-[var(--text-muted)] mt-1 flex items-center justify-center gap-1">
              <Flame size={12} className="text-[var(--peach-soft)]" />
              连续学习 {streakInfo.streak} 天
              {streakInfo.isMilestone && <span className="text-[var(--peach-soft)]">里程碑!</span>}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <Zap size={20} className="text-[var(--peach-soft)] mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--text-primary)]">+{xpEarned}</div>
            <div className="text-xs text-[var(--text-muted)]">经验值</div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <Star size={20} className="text-[var(--purple-soft)] mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--text-primary)]">{s.totalCorrect}/{s.total}</div>
            <div className="text-xs text-[var(--text-muted)]">答对/总题数</div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <Sparkles size={20} className="text-[var(--mint-soft)] mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--text-primary)]">{s.newLearned.length}</div>
            <div className="text-xs text-[var(--text-muted)]">新学词汇</div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <CheckCircle size={20} className="text-[var(--pink-primary)] mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--text-primary)]">{s.oldReviewed}</div>
            <div className="text-xs text-[var(--text-muted)]">巩固旧词</div>
          </div>
        </div>

        {/* New words learned */}
        {s.newLearned.length > 0 && (
          <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-4 text-left">
            <p className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-[var(--mint-soft)]" />
              今天新学会
            </p>
            <div className="flex flex-wrap gap-2">
              {s.newLearned.map((w) => (
                <span key={w} className="px-3 py-1.5 rounded-xl bg-[var(--mint-soft)]/15 text-sm font-medium text-[var(--mint-soft)]">
                  {w}
                </span>
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">明天会帮你复习这 {s.tomorrowReview} 个词</p>
          </div>
        )}

        {/* No new words but reviewed */}
        {s.newLearned.length === 0 && s.oldReviewed > 0 && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <p className="text-sm text-[var(--text-primary)]">
              巩固了 <span className="font-bold text-[var(--pink-primary)]">{s.oldReviewed}</span> 个旧词
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">明天要复习 {s.tomorrowReview} 个词</p>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] font-medium text-sm">
            返回词汇页
          </button>
          <button onClick={() => { setPhase('loading'); setCurrentStep(0); setSteps([]); setXpEarned(0); setStreakInfo(null); setSessionKey(k => k + 1); }} className="flex-1 py-3 rounded-xl bg-[var(--pink-primary)] text-white font-medium text-sm">
            再来一轮
          </button>
        </div>
      </div>
    );
  }

  // ── Practice phase ──
  if (!step) return null;

  const progress = ((currentStep) / steps.length) * 100;

  return (
    <div className="py-4 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-[var(--text-primary)]">{currentRoundName}</span>
          <span className="text-[10px] text-[var(--text-muted)]">{currentStep + 1} / {steps.length}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Zap size={12} />{xpEarned}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[var(--border-color)]/40 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Round badge */}
      <div className="flex justify-center">
        <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
          step.stepType === 'warmup-reveal' ? 'bg-slate-500/10 text-slate-400' :
          step.stepType === 'intro' ? 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]' :
          'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]'
        }`}>
          {step.roundLabel}
        </span>
      </div>

      {/* Card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 min-h-[420px] flex flex-col items-center justify-center text-center">
        {/* ── Warmup Reveal ── */}
        {step.stepType === 'warmup-reveal' && (
          <div className="space-y-5 w-full">
            <p className="text-xs text-[var(--text-muted)]">快速回顾，看看还记得吗？</p>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">{step.word.word}</h2>
            {step.word.pronunciation && (
              <p className="text-sm text-[var(--text-muted)] font-mono">[{step.word.pronunciation}]</p>
            )}
            <button onClick={handleSpeak} className="p-3 rounded-xl bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors">
              <Volume2 size={22} />
            </button>
            <div className="bg-[var(--pink-pale)]/10 border border-[var(--pink-primary)]/10 rounded-2xl p-4">
              <p className="text-lg font-bold text-[var(--pink-primary)]">{step.word.meaning}</p>
              {step.word.partOfSpeech && (
                <p className="text-xs text-[var(--text-muted)] mt-1">{step.word.partOfSpeech}</p>
              )}
            </div>
            <button onClick={handleAdvance} className="w-full py-3 bg-slate-500/20 text-[var(--text-secondary)] rounded-2xl font-bold text-sm hover:bg-slate-500/30 transition-colors">
              记得，继续
            </button>
          </div>
        )}

        {/* ── Intro Card ── */}
        {step.stepType === 'intro' && (
          <div className="space-y-5 w-full">
            <div className="text-4xl">{step.word.partOfSpeech === '常用语' ? '💬' : '📝'}</div>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">{step.word.word}</h2>
            {step.word.pronunciation && (
              <p className="text-sm text-[var(--text-muted)] font-mono">[{step.word.pronunciation}]</p>
            )}
            <button onClick={handleSpeak} className="p-3 rounded-xl bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors">
              <Volume2 size={22} />
            </button>
            <div className="bg-[var(--pink-pale)]/10 border border-[var(--pink-primary)]/10 rounded-2xl p-4">
              <p className="text-lg font-bold text-[var(--pink-primary)]">{step.word.meaning}</p>
              {step.word.partOfSpeech && (
                <p className="text-xs text-[var(--text-muted)] mt-1">{step.word.partOfSpeech}</p>
              )}
            </div>
            {step.word.examples.length > 0 && (
              <div className="text-left space-y-2">
                {step.word.examples.slice(0, 2).map((ex, i) => (
                  <div key={i} className="bg-[var(--bg-input)] rounded-xl p-3 text-sm">
                    <p className="text-[var(--text-primary)]">{ex.text}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{ex.translation}</p>
                  </div>
                ))}
              </div>
            )}
            <button onClick={handleAdvance} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
              开始练习
            </button>
          </div>
        )}

        {/* ── Listen Choice ── */}
        {step.stepType === 'listen-choice' && (
          <div className="space-y-5 w-full">
            <p className="text-sm text-[var(--text-muted)]">听发音，选出正确的中文意思</p>
            <button onClick={handleSpeak} className="p-4 rounded-2xl bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors">
              <Volume2 size={28} />
            </button>
            <p className="text-xs text-[var(--text-muted)]">点击喇叭听发音</p>
            <div className="grid grid-cols-1 gap-2.5 w-full">
              {options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const showCorrect = answered && opt.correct;
                const showWrong = answered && isSelected && !opt.correct;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={answered}
                    className={`px-4 py-3 rounded-2xl border text-sm font-medium transition-all ${
                      showCorrect
                        ? 'bg-[var(--mint-soft)]/10 border-[var(--mint-soft)]/30 text-[var(--mint-soft)]'
                        : showWrong
                          ? 'bg-[var(--color-danger-bg)] border-[var(--color-danger-light)] text-[var(--color-danger)]'
                          : isSelected
                            ? 'bg-[var(--pink-primary)]/10 border-[var(--pink-primary)]/30'
                            : 'bg-[var(--bg-input)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-pale)]'
                    }`}
                  >
                    {opt.text}
                    {showCorrect && <CheckCircle size={14} className="inline ml-1" />}
                    {showWrong && <XCircle size={14} className="inline ml-1" />}
                  </button>
                );
              })}
            </div>
            {answered && (
              <button onClick={handleAdvance} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
                {currentStep + 1 >= steps.length ? '查看结果' : '下一题'}
              </button>
            )}
          </div>
        )}

        {/* ── Meaning Choice ── */}
        {step.stepType === 'meaning-choice' && (
          <div className="space-y-5 w-full">
            <p className="text-sm text-[var(--text-muted)]">这个中文用韩语怎么说？</p>
            <div className="bg-[var(--bg-input)] rounded-2xl p-4">
              <p className="text-xl font-bold text-[var(--text-primary)]">{step.word.meaning}</p>
            </div>
            <div className="grid grid-cols-1 gap-2.5 w-full">
              {options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const showCorrect = answered && opt.correct;
                const showWrong = answered && isSelected && !opt.correct;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={answered}
                    className={`px-4 py-3 rounded-2xl border text-base font-semibold transition-all ${
                      showCorrect
                        ? 'bg-[var(--mint-soft)]/10 border-[var(--mint-soft)]/30 text-[var(--mint-soft)]'
                        : showWrong
                          ? 'bg-[var(--color-danger-bg)] border-[var(--color-danger-light)] text-[var(--color-danger)]'
                          : isSelected
                            ? 'bg-[var(--pink-primary)]/10 border-[var(--pink-primary)]/30'
                            : 'bg-[var(--bg-input)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-pale)]'
                    }`}
                  >
                    {opt.text}
                    {showCorrect && <CheckCircle size={14} className="inline ml-1" />}
                    {showWrong && <XCircle size={14} className="inline ml-1" />}
                  </button>
                );
              })}
            </div>
            {answered && (
              <button onClick={handleAdvance} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
                {currentStep + 1 >= steps.length ? '查看结果' : '下一题'}
              </button>
            )}
          </div>
        )}

        {/* ── Fill Blank ── */}
        {step.stepType === 'fill-blank' && (
          <div className="space-y-5 w-full">
            <p className="text-sm text-[var(--text-muted)]">选出正确的词补全句子</p>
            <button onClick={handleSpeakFillBlank} className="p-2 rounded-xl bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors">
              <Volume2 size={18} />
            </button>
            <div className="bg-[var(--bg-input)] rounded-2xl p-5 text-left">
              <p className="text-lg text-[var(--text-primary)]">{fillBlankText.korean}</p>
              {fillBlankText.chinese && (
                <p className="text-xs text-[var(--text-muted)] mt-2">{fillBlankText.chinese}</p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-2.5 w-full">
              {options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const showCorrect = answered && opt.correct;
                const showWrong = answered && isSelected && !opt.correct;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={answered}
                    className={`px-4 py-3 rounded-2xl border text-base font-semibold transition-all ${
                      showCorrect
                        ? 'bg-[var(--mint-soft)]/10 border-[var(--mint-soft)]/30 text-[var(--mint-soft)]'
                        : showWrong
                          ? 'bg-[var(--color-danger-bg)] border-[var(--color-danger-light)] text-[var(--color-danger)]'
                          : isSelected
                            ? 'bg-[var(--pink-primary)]/10 border-[var(--pink-primary)]/30'
                            : 'bg-[var(--bg-input)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-pale)]'
                    }`}
                  >
                    {opt.text}
                    {showCorrect && <CheckCircle size={14} className="inline ml-1" />}
                    {showWrong && <XCircle size={14} className="inline ml-1" />}
                  </button>
                );
              })}
            </div>
            {answered && (
              <button onClick={handleAdvance} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
                {currentStep + 1 >= steps.length ? '查看结果' : '下一题'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
