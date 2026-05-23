'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { BookOpen, Check, X, Loader2, ArrowLeft, Star, Zap, Flame, Volume2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/db';
import { calculateSRS, QUALITY_LABELS } from '@/lib/srs';
import { updateStreak, awardXp, XP_REWARDS, getProfile } from '@/lib/gamification';
import type { Word, ReviewSession } from '@/types';

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId');

  const [words, setWords] = useState<Word[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [complete, setComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, passed: 0, startTime: 0 });
  const [xpEarned, setXpEarned] = useState(0);
  const [leveledUp, setLeveledUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);

  const loadWords = useCallback(async () => {
    const now = Date.now();
    let dueWords: Word[];
    if (videoId) {
      dueWords = await db.words.where('sourceVideoId').equals(videoId).toArray();
    } else {
      dueWords = await db.words.where('nextReview').belowOrEqual(now).sortBy('nextReview');
      if (dueWords.length === 0) {
        dueWords = await db.words.where('mastery').anyOf('new', 'learning', 'reviewing').limit(10).toArray();
      }
    }
    setWords(dueWords);
    if (dueWords.length === 0) {
      setComplete(true);
    }
    setSessionStats({ reviewed: 0, passed: 0, startTime: Date.now() });
    setLoading(false);
  }, [videoId]);

  useEffect(() => { loadWords(); }, [loadWords]);

  const handleFlip = () => {
    setShowAnswer(true);
    setFlipped(true);
  };

  const handleAnswer = async (quality: number) => {
    if (!showAnswer) {
      handleFlip();
      return;
    }

    const word = words[currentIdx];
    const result = calculateSRS(quality, word.srsLevel, word.easeFactor, word.interval);

    const newMastery = result.srsLevel >= 5 ? 'mastered' : result.srsLevel >= 3 ? 'reviewing' : 'learning';

    await db.words.update(word.id, {
      srsLevel: result.srsLevel,
      easeFactor: result.easeFactor,
      interval: result.interval,
      nextReview: result.nextReview,
      lastReviewed: Date.now(),
      mastery: newMastery as Word['mastery'],
    });

    const passed = quality >= 3;
    // Award XP
    const xp = passed ? (quality >= 5 ? XP_REWARDS.perfectReview : XP_REWARDS.wordReviewed) : 0;
    let lvlUp = false;
    let nl = 0;
    if (xp > 0) {
      const result = await awardXp(xp);
      lvlUp = result.leveledUp;
      nl = result.newLevel;
    }
    setXpEarned((prev) => prev + xp);
    if (lvlUp) { setLeveledUp(true); setNewLevel(nl); }

    setSessionStats((prev) => ({
      ...prev,
      reviewed: prev.reviewed + 1,
      passed: prev.passed + (passed ? 1 : 0),
    }));

    if (currentIdx + 1 >= words.length) {
      await updateStreak();
      const finalReviewed = sessionStats.reviewed + 1;
      const finalPassed = sessionStats.passed + (passed ? 1 : 0);
      await db.reviewSessions.put({
        id: crypto.randomUUID(),
        date: Date.now(),
        wordsReviewed: finalReviewed,
        wordsPassed: finalPassed,
        duration: Math.round((Date.now() - sessionStats.startTime) / 1000),
        xpEarned: xpEarned + xp,
      });
      setComplete(true);
    } else {
      setCurrentIdx(currentIdx + 1);
      setShowAnswer(false);
      setFlipped(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (complete) {
    const accuracy = sessionStats.reviewed > 0 ? Math.round((sessionStats.passed / sessionStats.reviewed) * 100) : 0;
    return (
      <div className="py-6 max-w-lg mx-auto">
        <div className="text-center py-12 space-y-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--mint-soft)]/20 to-[var(--pink-primary)]/20 flex items-center justify-center mx-auto border-2 border-[var(--mint-soft)]/30">
              <Star size={40} className="text-[var(--peach-soft)] fill-[var(--peach-soft)]/20" />
            </div>
            {leveledUp && (
              <div className="absolute -top-2 -right-1/3 bg-[var(--peach-soft)] text-[var(--text-primary)] text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                Level Up! {newLevel}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">复习完成!</h1>
            <p className="text-[var(--text-secondary)] mt-2">
              复习了 {sessionStats.reviewed} 个单词，通过 {sessionStats.passed} 个
            </p>
            <p className={`text-lg font-medium mt-1 ${accuracy >= 80 ? 'text-[var(--mint-soft)]' : accuracy >= 50 ? 'text-[var(--peach-soft)]' : 'text-[var(--peach-soft)]'}`}>
              {accuracy}% 正确率
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
              <Zap size={20} className="text-[var(--peach-soft)] mx-auto mb-1" />
              <div className="text-xl font-bold text-[var(--text-primary)]">+{xpEarned}</div>
              <div className="text-xs text-[var(--text-secondary)]">XP</div>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
              <Flame size={20} className="text-[var(--peach-soft)] mx-auto mb-1" />
              <div className="text-xl font-bold text-[var(--text-primary)]">{sessionStats.passed}</div>
              <div className="text-xs text-[var(--text-secondary)]">通过</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setComplete(false); setCurrentIdx(0); setShowAnswer(false); setFlipped(false); setXpEarned(0); setSessionStats({ reviewed: 0, passed: 0, startTime: Date.now() }); setLeveledUp(false); loadWords(); }}
              className="px-5 py-2.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-[var(--text-primary)] text-sm font-medium rounded-xl transition-colors"
            >
              再来一轮
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-5 py-2.5 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] text-sm font-medium rounded-xl transition-colors"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="py-6 max-w-lg mx-auto">
        <div className="text-center py-16 space-y-6">
          <BookOpen size={48} className="text-[var(--text-placeholder)] mx-auto" />
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">没有待复习的单词</h1>
            <p className="text-[var(--text-secondary)] text-sm mt-2">去学习新单词吧</p>
          </div>
          <button
            onClick={() => router.push('/learn')}
            className="px-5 py-2.5 bg-[var(--purple-soft)] hover:bg-[var(--purple-soft)] text-[var(--text-primary)] text-sm font-medium rounded-xl transition-colors"
          >
            开始每日学习
          </button>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIdx];

  return (
    <div className="py-6 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
          <span>{currentIdx + 1} / {words.length}</span>
          <span>XP +{xpEarned}</span>
        </div>
        <div className="w-5" />
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
        <div
          className="bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((currentIdx + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* Card with flip animation */}
      <div className="perspective-1000">
        <div
          className={`relative transition-all duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front of card (question) */}
          <div className={`bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 space-y-6 ${flipped ? 'hidden' : ''}`}>
            <div className="text-center">
              <p className="text-xs text-[var(--text-muted)] mb-1">
                {currentWord.partOfSpeech} · {currentWord.pronunciation}
              </p>
              <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-6">{currentWord.word}</h2>

              <button
                onClick={handleFlip}
                className="px-10 py-4 bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] hover:from-[var(--pink-primary)] hover:to-[var(--purple-soft)] text-[var(--text-primary)] rounded-2xl transition-all text-base font-medium shadow-lg shadow-[var(--pink-primary)]/20 active:scale-95"
              >
                翻转查看答案
              </button>
            </div>
          </div>

          {/* Back of card (answer) */}
          <div className={`bg-[var(--bg-card-hover)] border border-[var(--border-color)] rounded-3xl p-8 space-y-6 animate-fade-in ${!flipped ? 'hidden' : ''}`}>
            <div className="text-center">
              <p className="text-xs text-[var(--text-muted)] mb-1">
                {currentWord.partOfSpeech} · {currentWord.pronunciation}
              </p>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{currentWord.word}</h2>

              <div className="bg-[var(--bg-input)] rounded-2xl p-5 mb-4">
                <p className="text-[var(--text-primary)] text-xl font-medium">{currentWord.meaning}</p>
                {currentWord.examples.length > 0 && (
                  <div className="mt-3 space-y-2 text-left">
                    {currentWord.examples.slice(0, 2).map((ex, i) => (
                      <div key={i}>
                        <div className="flex items-start gap-2">
                          <p className="text-sm text-[var(--text-primary)]">{ex.text}</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); speakKorean(ex.text); }}
                            className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                            title="听例句发音"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">{ex.translation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quality buttons in a grid */}
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2, 3, 4, 5].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleAnswer(q)}
                    className={`px-2 py-3 rounded-xl text-xs font-medium transition-all active:scale-95 ${
                      q < 3
                        ? 'bg-[var(--color-danger)]/10 hover:bg-[var(--color-danger)]/20 text-[var(--color-danger)] border border-[var(--color-danger)]/20'
                        : q < 4
                          ? 'bg-[var(--peach-soft)]/10 hover:bg-[var(--peach-soft)]/20 text-[var(--peach-soft)] border border-[var(--peach-soft)]/20'
                          : 'bg-[var(--mint-soft)]/15 hover:bg-[var(--mint-soft)]/20 text-[var(--mint-soft)] border border-[var(--mint-soft)]/20'
                    }`}
                  >
                    <div className="text-lg mb-0.5">{q >= 4 ? '✓' : q >= 3 ? '○' : '✗'}</div>
                    <div>{QUALITY_LABELS[q]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session stats */}
      {sessionStats.reviewed > 0 && (
        <div className="flex items-center justify-center gap-4 text-xs text-[var(--text-muted)]">
          <span>已复习: {sessionStats.reviewed}</span>
          <span>通过: {sessionStats.passed}</span>
          <span>XP: +{xpEarned}</span>
        </div>
      )}
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    }>
      <ReviewContent />
    </Suspense>
  );
}
