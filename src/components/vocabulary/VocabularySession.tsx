'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { ArrowLeft, Volume2, Zap, Flame, Star, Sparkles, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import { db } from '@/lib/db';
import { calculateSRS } from '@/lib/srs';
import { awardXp, XP_REWARDS } from '@/lib/gamification';
import { speak } from '@/lib/tts';
import type { Word } from '@/types';

interface Props {
  words: Word[];
  onClose: () => void;
}

type CardType = 'intro' | 'reveal' | 'listen-choice' | 'meaning-choice' | 'fill-blank';
type SessionPhase = 'loading' | 'intro' | 'practice' | 'settlement';

const MAX_REVIEW = 8;
const MAX_NEW = 5;

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

export function VocabularySession({ words, onClose }: Props) {
  const [phase, setPhase] = useState<SessionPhase>('loading');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [cardType, setCardType] = useState<CardType>('intro');
  const [sessionWords, setSessionWords] = useState<Word[]>([]);
  const [options, setOptions] = useState<{ text: string; correct: boolean }[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [passed, setPassed] = useState(0);
  const [newLearned, setNewLearned] = useState<string[]>([]);
  const allMeaningsRef = useRef<string[]>([]);
  const allKoreanRef = useRef<string[]>([]);

  // ── Build session queue ──
  useEffect(() => {
    const now = Date.now();
    const dueReview = words
      .filter((w) => w.nextReview <= now && w.mastery !== 'mastered')
      .slice(0, MAX_REVIEW);
    const newWords = words
      .filter((w) => w.mastery === 'new' && w.srsLevel === 0)
      .slice(0, MAX_NEW);
    const queue = [...dueReview, ...newWords];
    setSessionWords(queue);

    // Build global distractor pools
    allMeaningsRef.current = words.map((w) => w.meaning).filter(Boolean);
    allKoreanRef.current = words.map((w) => w.word).filter(Boolean);

    if (queue.length === 0) {
      setPhase('settlement');
    } else {
      const first = queue[0];
      if (first.mastery === 'new') {
        setCardType('intro');
        // Auto-speak after mount
        setTimeout(() => speak(first.word, 0.75), 300);
      } else {
        setCardType('reveal');
      }
      setPhase('practice');
    }
  }, [words]);

  const currentWord = sessionWords[currentIdx];

  // ── Build options for current card type ──
  useEffect(() => {
    if (!currentWord || cardType === 'intro' || cardType === 'reveal') return;
    const pool = cardType === 'meaning-choice' ? allKoreanRef.current : allMeaningsRef.current;
    const correct = cardType === 'meaning-choice' ? currentWord.word : currentWord.meaning;
    const distractors = pickDistractors(correct, pool, 3);
    const opts = shuffle([
      { text: correct, correct: true },
      ...distractors.map((d) => ({ text: d, correct: false })),
    ]);
    setOptions(opts);
    setSelectedOption(null);
    setAnswered(false);

    // Auto-speak for listen-choice
    if (cardType === 'listen-choice') {
      setTimeout(() => speak(currentWord.word, 0.75), 200);
    }
  }, [currentIdx, cardType, currentWord]);

  // ── Pick next card type for practice phase ──
  const pickNextCardType = useCallback((word: Word, lastType: CardType): CardType => {
    if (word.mastery === 'new' && lastType === 'intro') {
      // After intro, pick from listen-choice or meaning-choice
      return Math.random() > 0.5 ? 'listen-choice' : 'meaning-choice';
    }
    // Rotate: listen → meaning → fill → listen ...
    const types: CardType[] = ['listen-choice', 'meaning-choice', 'fill-blank'];
    const idx = types.indexOf(lastType);
    return idx >= 0 ? types[(idx + 1) % types.length] : 'listen-choice';
  }, []);

  // ── Handle option selection ──
  const handleSelect = useCallback(async (idx: number) => {
    if (answered || !currentWord) return;
    setAnswered(true);
    setSelectedOption(idx);
    const isCorrect = options[idx]?.correct ?? false;
    const quality = isCorrect ? 4 : 1;

    // Update SRS
    const result = calculateSRS(quality, currentWord.srsLevel, currentWord.easeFactor, currentWord.interval);
    const newMastery = result.srsLevel >= 5 ? 'mastered' : result.srsLevel >= 3 ? 'reviewing' : 'learning';

    await db.words.update(currentWord.id, {
      srsLevel: result.srsLevel,
      easeFactor: result.easeFactor,
      interval: result.interval,
      nextReview: result.nextReview,
      lastReviewed: Date.now(),
      mastery: newMastery as Word['mastery'],
    });

    if (isCorrect) {
      setPassed((p) => p + 1);
      const xp = currentWord.mastery === 'new' ? XP_REWARDS.wordLearned : XP_REWARDS.wordReviewed;
      setXpEarned((prev) => prev + xp);
      if (currentWord.mastery === 'new') {
        setNewLearned((prev) => [...prev, currentWord.word]);
      }
      await awardXp(xp);
    }
  }, [answered, currentWord, options]);

  // ── Handle reveal / intro → next step ──
  const handleRevealOrNext = useCallback(async () => {
    if (!currentWord) return;

    if (cardType === 'intro' || cardType === 'reveal') {
      // Move to practice card for this word
      const nextType = pickNextCardType(currentWord, cardType);
      setCardType(nextType);
      return;
    }

    // After answering practice card, move to next word
    if (currentIdx + 1 >= sessionWords.length) {
      setPhase('settlement');
    } else {
      const nextWord = sessionWords[currentIdx + 1];
      const nextType = nextWord.mastery === 'new' ? 'intro' : 'reveal';
      setCurrentIdx(currentIdx + 1);
      setCardType(nextType);
      if (nextType === 'intro') {
        setTimeout(() => speak(nextWord.word, 0.75), 300);
      }
    }
  }, [currentIdx, currentWord, cardType, pickNextCardType, sessionWords]);

  // ── Handle listening again ──
  const handleSpeak = useCallback(() => {
    if (currentWord) speak(currentWord.word, 0.75);
  }, [currentWord]);

  // ── Render ──
  if (phase === 'loading') {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (phase === 'settlement') {
    const total = sessionWords.length;
    const accuracy = total > 0 ? Math.round((passed / total) * 100) : 0;
    return (
      <div className="py-4 max-w-lg mx-auto space-y-6 text-center">
        <div className="text-6xl">🐰</div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">练习完成!</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {total > 0 ? `复习了 ${total} 个词，通过 ${passed} 个` : '暂无待练习词汇'}
          </p>
          {accuracy > 0 && (
            <p className={`text-lg font-bold mt-1 ${accuracy >= 70 ? 'text-[var(--mint-soft)]' : 'text-[var(--peach-soft)]'}`}>
              {accuracy}% 正确率
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
            <div className="text-xl font-bold text-[var(--text-primary)]">{passed}</div>
            <div className="text-xs text-[var(--text-muted)]">通过</div>
          </div>
        </div>

        {/* New words learned */}
        {newLearned.length > 0 && (
          <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-4 text-left">
            <p className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-[var(--mint-soft)]" />
              今天新学会
            </p>
            <div className="flex flex-wrap gap-2">
              {newLearned.map((w) => (
                <span key={w} className="px-3 py-1.5 rounded-xl bg-[var(--mint-soft)]/15 text-sm font-medium text-[var(--mint-soft)]">
                  {w}
                </span>
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">明天会帮你复习这些词</p>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] font-medium text-sm">
            返回词汇页
          </button>
          <button onClick={() => window.location.reload()} className="flex-1 py-3 rounded-xl bg-[var(--pink-primary)] text-white font-medium text-sm">
            再来一轮
          </button>
        </div>
      </div>
    );
  }

  // ── Practice phase ──
  const progress = ((currentIdx) / sessionWords.length) * 100;

  return (
    <div className="py-4 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </button>
        <span className="text-xs text-[var(--text-muted)]">{currentIdx + 1} / {sessionWords.length}</span>
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Zap size={12} />{xpEarned}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[var(--border-color)]/40 rounded-full h-1.5 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }} />
      </div>

      {/* Card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 min-h-[420px] flex flex-col items-center justify-center text-center">
        {/* ── Intro Card ── */}
        {(cardType === 'intro' || cardType === 'reveal') && (
          <div className="space-y-5 w-full">
            <div className="text-4xl">{currentWord?.partOfSpeech === '常用语' ? '💬' : '📝'}</div>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">{currentWord?.word}</h2>
            {currentWord?.pronunciation && (
              <p className="text-sm text-[var(--text-muted)] font-mono">[{currentWord.pronunciation}]</p>
            )}
            <button onClick={handleSpeak} className="p-3 rounded-xl bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors">
              <Volume2 size={22} />
            </button>
            <div className="bg-[var(--pink-pale)]/10 border border-[var(--pink-primary)]/10 rounded-2xl p-4">
              <p className="text-lg font-bold text-[var(--pink-primary)]">{currentWord?.meaning}</p>
              {currentWord?.partOfSpeech && (
                <p className="text-xs text-[var(--text-muted)] mt-1">{currentWord.partOfSpeech}</p>
              )}
            </div>
            {currentWord?.examples.length > 0 && (
              <div className="text-left space-y-2">
                {currentWord.examples.slice(0, 2).map((ex, i) => (
                  <div key={i} className="bg-[var(--bg-input)] rounded-xl p-3 text-sm">
                    <p className="text-[var(--text-primary)]">{ex.text}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{ex.translation}</p>
                  </div>
                ))}
              </div>
            )}
            <button onClick={handleRevealOrNext} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
              {currentWord?.mastery === 'new' ? '开始练习' : '记得，下一题'}
            </button>
          </div>
        )}

        {/* ── Listen Choice ── */}
        {cardType === 'listen-choice' && (
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
                          ? 'bg-red-500/10 border-red-500/30 text-red-400'
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
              <button onClick={handleRevealOrNext} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
                {currentIdx + 1 >= sessionWords.length ? '查看结果' : '下一题'}
              </button>
            )}
          </div>
        )}

        {/* ── Meaning Choice ── */}
        {cardType === 'meaning-choice' && (
          <div className="space-y-5 w-full">
            <p className="text-sm text-[var(--text-muted)]">这个中文用韩语怎么说？</p>
            <div className="bg-[var(--bg-input)] rounded-2xl p-4">
              <p className="text-xl font-bold text-[var(--text-primary)]">{currentWord?.meaning}</p>
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
                          ? 'bg-red-500/10 border-red-500/30 text-red-400'
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
              <button onClick={handleRevealOrNext} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
                {currentIdx + 1 >= sessionWords.length ? '查看结果' : '下一题'}
              </button>
            )}
          </div>
        )}

        {/* ── Fill Blank ── */}
        {cardType === 'fill-blank' && (
          <div className="space-y-5 w-full">
            <p className="text-sm text-[var(--text-muted)]">选出正确的词补全句子</p>
            {/* Generate a simple fill-blank from examples or meaning */}
            <div className="bg-[var(--bg-input)] rounded-2xl p-5 text-left">
              <p className="text-lg">
                {(() => {
                  const ex = currentWord?.examples[0];
                  if (ex) {
                    const replaced = ex.text.replace(currentWord.word, '____');
                    if (replaced !== ex.text) return replaced;
                    return `____ — ${ex.translation}`;
                  }
                  return `____ (${currentWord?.meaning})`;
                })()}
              </p>
              {currentWord?.examples[0] && (
                <p className="text-xs text-[var(--text-muted)] mt-2">{currentWord.examples[0].translation}</p>
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
                          ? 'bg-red-500/10 border-red-500/30 text-red-400'
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
              <button onClick={handleRevealOrNext} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
                {currentIdx + 1 >= sessionWords.length ? '查看结果' : '下一题'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
