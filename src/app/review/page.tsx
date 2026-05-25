'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { BookOpen, Check, X, Loader2, ArrowLeft, Star, Zap, Flame, Volume2, Brain, TrendingUp, RotateCcw, Activity } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/db';
import { calculateSRS, QUALITY_LABELS } from '@/lib/srs';
import { updateStreak, awardXp, XP_REWARDS, getProfile } from '@/lib/gamification';
import { emitXpFlyout, emitStreakMilestone } from '@/components/XpOverlay';
import { memoryHealthScore, atRiskWords } from '@/lib/forgetting-curve';
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
  const [selfAssessment, setSelfAssessment] = useState<number>(0);
  const [selectedCorrect, setSelectedCorrect] = useState<boolean | null>(null);
  const [allMeanings, setAllMeanings] = useState<string[]>([]);
  const [options, setOptions] = useState<{ text: string; correct: boolean }[]>([]);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('srs-intro-seen');
    if (!seen) setShowIntro(true);
  }, []);

  const dismissIntro = () => {
    localStorage.setItem('srs-intro-seen', '1');
    setShowIntro(false);
  };

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

    // Load all word meanings for distractor generation
    const all = await db.words.toArray();
    setAllMeanings(all.map((w) => w.meaning).filter(Boolean));

    setSessionStats({ reviewed: 0, passed: 0, startTime: Date.now() });
    setLoading(false);
  }, [videoId]);

  useEffect(() => { loadWords(); }, [loadWords]);

  // Generate MCQ options when word changes
  useEffect(() => {
    if (words.length === 0 || allMeanings.length === 0) return;
    const current = words[currentIdx];
    const correct = current.meaning;

    // Pick 3 random distractors
    const pool = allMeanings.filter((m) => m !== correct && m.trim().length > 0);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const distractors = shuffled.slice(0, 3);

    const opts = [
      { text: correct, correct: true },
      ...distractors.map((d) => ({ text: d, correct: false })),
      { text: '不知道', correct: false },
    ].sort(() => Math.random() - 0.5);

    // Ensure "不知道" is always last
    const dontKnow = opts.find((o) => o.text === '不知道')!;
    const rest = opts.filter((o) => o.text !== '不知道');
    setOptions([...rest.sort(() => Math.random() - 0.5), dontKnow]);
  }, [currentIdx, words, allMeanings]);

  const handlePickOption = (idx: number) => {
    const opt = options[idx];
    setSelectedCorrect(opt.correct);
    setSelfAssessment(opt.correct ? 3 : 0);
    setShowAnswer(true);
    setFlipped(true);
  };

  const handleConfirm = async () => {
    const quality = selfAssessment;
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
      emitXpFlyout(xp);
      if (lvlUp) { window.dispatchEvent(new CustomEvent('level-up', { detail: { level: nl } })); }
    }
    setXpEarned((prev) => prev + xp);
    if (lvlUp) { setLeveledUp(true); setNewLevel(nl); }

    setSessionStats((prev) => ({
      ...prev,
      reviewed: prev.reviewed + 1,
      passed: prev.passed + (passed ? 1 : 0),
    }));

    if (currentIdx + 1 >= words.length) {
      const streakResult = await updateStreak();
      if (streakResult.isMilestone) { emitStreakMilestone(streakResult.milestone); }
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
      setSelfAssessment(0);
      setSelectedCorrect(null);
    }
  };

  // SRS intro modal
  if (showIntro) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/30" onClick={dismissIntro} />
        <div className="relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-2xl w-full max-w-sm p-6 space-y-5 animate-bounce-in">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-[var(--pink-primary)]/10 flex items-center justify-center mx-auto mb-3">
              <Brain size={28} className="text-[var(--pink-primary)]" />
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">SRS 间隔重复</h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">比普通背诵效率高 2-3 倍的科学记忆法</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <TrendingUp size={16} className="text-[var(--mint-soft)] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">在你快忘的时候提醒你</p>
                <p className="text-xs text-[var(--text-muted)]">系统根据遗忘曲线自动计算最佳复习时机</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw size={16} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">忘记的多练，记住的少练</p>
                <p className="text-xs text-[var(--text-muted)]">每个单词有自己的复习节奏，不再一刀切</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Star size={16} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">每次打分 0-5</p>
                <p className="text-xs text-[var(--text-muted)]">"完全忘了"到"非常熟练"，评分决定下次见它的时间</p>
              </div>
            </div>
          </div>

          <button
            onClick={dismissIntro}
            className="w-full py-3 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/90 text-[var(--text-primary)] rounded-2xl font-medium text-sm transition-colors"
          >
            知道了
          </button>
        </div>
      </div>
    );
  }

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

          {/* Memory health indicator */}
          {(() => {
            const healthScore = memoryHealthScore(words);
            const atRisk = atRiskWords(words, 3);
            return (
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 max-w-xs mx-auto w-full space-y-3">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-[var(--purple-soft)]" />
                  <span className="text-xs font-medium text-[var(--text-secondary)]">记忆健康度</span>
                  <span className={`text-sm font-bold ml-auto ${healthScore >= 70 ? 'text-[var(--mint-soft)]' : healthScore >= 40 ? 'text-[var(--peach-soft)]' : 'text-[var(--color-danger)]'}`}>
                    {healthScore}/100
                  </span>
                </div>
                <div className="w-full bg-[var(--bg-input)] rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${healthScore >= 70 ? 'bg-[var(--mint-soft)]' : healthScore >= 40 ? 'bg-[var(--peach-soft)]' : 'bg-[var(--color-danger)]'}`}
                    style={{ width: `${healthScore}%` }}
                  />
                </div>
                {atRisk.length > 0 && (
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1.5">建议复习：</p>
                    <div className="flex flex-wrap gap-1">
                      {atRisk.map((w) => (
                        <span key={w.id} className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/15 text-[var(--text-secondary)]">
                          {w.word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setComplete(false); setCurrentIdx(0); setShowAnswer(false); setFlipped(false); setSelfAssessment(0); setSelectedCorrect(null); setXpEarned(0); setSessionStats({ reviewed: 0, passed: 0, startTime: Date.now() }); setLeveledUp(false); loadWords(); }}
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
      <div className="perspective-1000 w-full max-w-md mx-auto">
        <div className="relative" style={{ minHeight: '520px' }}>
          <div
            className={`w-full transition-all duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}
            style={{ minHeight: '520px' }}
          >
            {/* ── Front: MCQ ── */}
            <div
              className={`absolute inset-0 bg-[var(--bg-card)] border-2 border-[var(--pink-pale)] rounded-3xl p-6 flex flex-col items-center justify-center ${flipped ? 'opacity-0 pointer-events-none' : ''}`}
              style={{ backfaceVisibility: 'hidden', minHeight: '520px' }}
            >
              <p className="text-xs text-[var(--text-muted)] mb-1">
                {currentWord.partOfSpeech} · {currentWord.pronunciation}
              </p>
              <h2 className="text-5xl font-bold text-[var(--text-primary)] mb-1">{currentWord.word}</h2>
              <p className="text-xs text-[var(--text-muted)] mb-5">选择正确的中文意思</p>

              <div className="grid grid-cols-1 gap-2.5 w-full">
                {options.map((opt, i) => {
                  const isDontKnow = opt.text === '不知道';
                  return (
                    <button
                      key={i}
                      onClick={() => handlePickOption(i)}
                      className={`px-4 py-3.5 rounded-xl border text-sm font-medium transition-all active:scale-[0.98] ${
                        isDontKnow
                          ? 'bg-[var(--bg-input)] border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-accent)]'
                          : 'bg-[var(--bg-input)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)]/40 hover:bg-[var(--pink-primary)]/5'
                      }`}
                    >
                      <span className="text-[15px]">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Back: Answer + Quality ── */}
            <div
              className={`absolute inset-0 bg-[var(--bg-card)] border-2 border-[var(--pink-primary)]/30 rounded-3xl p-6 flex flex-col items-center rotate-y-180 ${!flipped ? 'opacity-0 pointer-events-none' : ''}`}
              style={{ backfaceVisibility: 'hidden', minHeight: '520px' }}
            >
              {/* Correct / Wrong badge */}
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold mb-3 ${
                selectedCorrect
                  ? 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]'
                  : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'
              }`}>
                {selectedCorrect ? '✓ 回答正确' : '✗ 回答错误'}
              </div>

              <p className="text-xs text-[var(--text-muted)] mb-1">
                {currentWord.partOfSpeech} · {currentWord.pronunciation}
              </p>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{currentWord.word}</h2>

              {/* Correct meaning — prominent */}
              <div className="bg-[var(--pink-primary)]/10 border-2 border-[var(--pink-primary)]/25 rounded-2xl p-5 mb-3 w-full">
                <p className="text-xs text-[var(--text-muted)] mb-1">正确意思</p>
                <p className="text-[var(--pink-primary)] text-2xl font-bold text-center">{currentWord.meaning}</p>
              </div>

              {currentWord.examples.length > 0 && (
                <div className="w-full space-y-1.5 mb-3 text-left">
                  {currentWord.examples.slice(0, 2).map((ex, i) => (
                    <div key={i} className="bg-[var(--bg-input)] rounded-xl px-3 py-2">
                      <div className="flex items-start gap-2">
                        <p className="text-sm text-[var(--text-primary)] flex-1">{ex.text}</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); speakKorean(ex.text); }}
                          className="p-1 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
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

              {/* Quality rating */}
              <div className="w-full space-y-3 mt-auto">
                <p className="text-sm font-medium text-[var(--text-secondary)] text-center">掌握程度</p>
                <div className="flex gap-2">
                  {[
                    { q: 0, label: '完全忘了' },
                    { q: 1, label: '有点印象' },
                    { q: 2, label: '比较清楚' },
                    { q: 3, label: '非常熟练' },
                  ].map((item) => (
                    <button
                      key={item.q}
                      onClick={() => setSelfAssessment(item.q)}
                      className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 text-xs font-medium transition-all ${
                        selfAssessment === item.q
                          ? 'bg-[var(--pink-primary)] text-white shadow-md'
                          : 'bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-accent)]'
                      }`}
                    >
                      <span className="text-lg font-bold">{item.q}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleConfirm()}
                  className="w-full py-3.5 bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm active:scale-95 transition-all mt-1"
                >
                  确认，下一题
                </button>
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
