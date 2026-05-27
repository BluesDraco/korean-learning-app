'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
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

// ═══════════════════════════════════════════════════════════════
// Study Room Decorations — streak-dependent
// ═══════════════════════════════════════════════════════════════

const DECOR_TIERS: Record<number, { corner: string; shelf: string; extras: string[] }> = {
  0:  { corner: '',       shelf: '📖', extras: [] },
  1:  { corner: '🪴',     shelf: '📖 📚', extras: [] },
  3:  { corner: '🪴 📝',  shelf: '📖 📚 📝', extras: ['☕'] },
  7:  { corner: '🪴 📝 🌸', shelf: '📖 📚 📝 🏆', extras: ['☕', '🕯️', '✨'] },
  30: { corner: '🪴 📝 🌸 ⭐', shelf: '📖 📚 📝 🏆 👑', extras: ['☕', '🕯️', '✨', '🌟', '🎀'] },
};

function getDecorTier(streak: number) {
  if (streak >= 30) return DECOR_TIERS[30];
  if (streak >= 7) return DECOR_TIERS[7];
  if (streak >= 3) return DECOR_TIERS[3];
  if (streak >= 1) return DECOR_TIERS[1];
  return DECOR_TIERS[0];
}

// ═══════════════════════════════════════════════════════════════
// Tactile Rating Button Config
// ═══════════════════════════════════════════════════════════════

const RATING_BUTTONS = [
  { q: 0, emoji: '😰', label: '完全忘了', color: '#FEE2E2', border: '#FECACA', text: '#DC2626', activeBg: '#FEE2E2' },
  { q: 1, emoji: '🤔', label: '有点印象', color: '#FFF7ED', border: '#FED7AA', text: '#EA580C', activeBg: '#FFF7ED' },
  { q: 2, emoji: '💡', label: '比较清楚', color: '#FEFCE8', border: '#FDE68A', text: '#CA8A04', activeBg: '#FEFCE8' },
  { q: 3, emoji: '🎯', label: '非常熟练', color: '#F0FDF4', border: '#BBF7D0', text: '#16A34A', activeBg: '#F0FDF4' },
];

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
  const [toriReaction, setToriReaction] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const touchXRef = useRef<number>(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

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

    const all = await db.words.toArray();
    setAllMeanings(all.map((w) => w.meaning).filter(Boolean));

    const profile = await getProfile();
    setStreak(profile.streak);

    setSessionStats({ reviewed: 0, passed: 0, startTime: Date.now() });
    setLoading(false);
  }, [videoId]);

  useEffect(() => { loadWords(); }, [loadWords]);

  useEffect(() => {
    if (words.length === 0 || allMeanings.length === 0) return;
    const current = words[currentIdx];
    const correct = current.meaning;

    const pool = allMeanings.filter((m) => m !== correct && m.trim().length > 0);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const distractors = shuffled.slice(0, 3);

    const opts = [
      { text: correct, correct: true },
      ...distractors.map((d) => ({ text: d, correct: false })),
      { text: '不知道', correct: false },
    ].sort(() => Math.random() - 0.5);

    const dontKnow = opts.find((o) => o.text === '不知道')!;
    const rest = opts.filter((o) => o.text !== '不知道');
    setOptions([...rest.sort(() => Math.random() - 0.5), dontKnow]);
  }, [currentIdx, words, allMeanings]);

  // 3D tilt effect on card
  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (flipped) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: y * 8, y: x * 8 });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  const handlePickOption = (idx: number) => {
    const opt = options[idx];
    setSelectedCorrect(opt.correct);
    setSelfAssessment(opt.correct ? 3 : 0);
    setShowAnswer(true);
    setFlipped(true);
    setCardTilt({ x: 0, y: 0 });
  };

  const handleConfirm = async () => {
    const quality = selfAssessment;

    const reactions: Record<number, string> = {
      0: '没关系，下次一定记住 🐰',
      1: '快想起来了，再来一次！🐰',
      2: '记起来了！继续加油',
      3: '不错！越来越熟了',
      4: '厉害！托里也想学你',
      5: '满分！토리超骄傲！🎉',
    };
    setToriReaction(reactions[quality] || '继续加油！🐰');
    await new Promise((r) => setTimeout(r, 800));
    setToriReaction(null);

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

  const decor = getDecorTier(streak);

  // ═══════════════════════════════════════════════════════════════
  // SRS Intro Modal
  // ═══════════════════════════════════════════════════════════════
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
            className="w-full py-3 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/90 text-white rounded-2xl font-medium text-sm transition-colors"
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

  // ═══════════════════════════════════════════════════════════════
  // Completion Screen
  // ═══════════════════════════════════════════════════════════════
  if (complete) {
    const accuracy = sessionStats.reviewed > 0 ? Math.round((sessionStats.passed / sessionStats.reviewed) * 100) : 0;
    return (
      <div className="relative min-h-screen" style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, #FFF5F5 50%, #FFF0F3 100%)' }}>
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#2D1B10 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 text-3xl opacity-30 select-none pointer-events-none">{decor.corner}</div>
        <div className="absolute top-4 right-4 text-3xl opacity-30 select-none pointer-events-none">{decor.shelf}</div>
        <div className="absolute bottom-4 left-4 text-2xl opacity-20 select-none pointer-events-none flex gap-2">
          {decor.extras.map((e, i) => <span key={i}>{e}</span>)}
        </div>

        <div className="py-6 max-w-lg mx-auto relative z-10">
          <div className="text-center py-12 space-y-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[var(--mint-soft)]/20 to-[var(--pink-primary)]/20 flex items-center justify-center mx-auto border-2 border-[var(--mint-soft)]/30 shadow-lg"
                style={{ boxShadow: '0 4px 24px rgba(168,216,208,0.15), 0 1px 3px rgba(0,0,0,0.04)' }}>
                <span className="text-6xl animate-float">🐰</span>
              </div>
              {leveledUp && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--peach-soft)] to-[var(--pink-primary)] text-white text-xs font-bold px-4 py-1.5 rounded-full animate-bounce-achievement shadow-lg">
                  Level Up! {newLevel}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">复习完成!</h1>
              <p className="text-[var(--text-secondary)] text-sm mt-2">
                🐰 今天的复习全做完了！<br />词汇们已经在脑子里安家了，好好休息，明天再来
              </p>
              <p className={`text-lg font-medium mt-1 ${accuracy >= 80 ? 'text-[var(--mint-soft)]' : accuracy >= 50 ? 'text-[var(--peach-soft)]' : 'text-[var(--peach-soft)]'}`}>
                {accuracy}% 正确率
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
              <div className="bg-white/80 backdrop-blur-sm border border-[var(--border-color)] rounded-2xl p-4 shadow-sm">
                <Zap size={20} className="text-[var(--peach-soft)] mx-auto mb-1" />
                <div className="text-xl font-bold text-[var(--text-primary)]">+{xpEarned}</div>
                <div className="text-xs text-[var(--text-secondary)]">XP</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-[var(--border-color)] rounded-2xl p-4 shadow-sm">
                <Flame size={20} className="text-[var(--peach-soft)] mx-auto mb-1" />
                <div className="text-xl font-bold text-[var(--text-primary)]">{sessionStats.passed}</div>
                <div className="text-xs text-[var(--text-secondary)]">通过</div>
              </div>
            </div>

            {(() => {
              const healthScore = memoryHealthScore(words);
              const atRisk = atRiskWords(words, 3);
              return (
                <div className="bg-white/80 backdrop-blur-sm border border-[var(--border-color)] rounded-2xl p-4 max-w-xs mx-auto w-full space-y-3 shadow-sm">
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
                className="px-5 py-2.5 bg-[var(--pink-primary)] hover:brightness-95 text-white text-sm font-medium rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                再来一轮
              </button>
              <button
                onClick={() => router.push('/')}
                className="px-5 py-2.5 bg-white/80 border border-[var(--border-color)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                返回首页
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="relative min-h-screen" style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, #FFF5F5 50%, #FFF0F3 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#2D1B10 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="py-6 max-w-lg mx-auto relative z-10">
          <div className="text-center py-16 space-y-4">
            <div className="text-7xl animate-float">🐰</div>
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">今天没有要复习的词</h1>
              <p className="text-[var(--text-secondary)] text-sm mt-2">
                要不要去学一些新词？🐰
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => router.push('/learn')}
                className="px-5 py-2.5 bg-[var(--pink-primary)] hover:brightness-90 text-white text-sm font-medium rounded-full transition-all shadow-md active:scale-95"
              >
                去学习
              </button>
              <button
                onClick={() => router.push('/vocabulary')}
                className="px-5 py-2.5 bg-white/80 border border-[var(--border-color)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] text-sm font-medium rounded-full transition-all shadow-sm active:scale-95"
              >
                词汇库
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIdx];

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, #FFF5F5 50%, #FFF0F3 100%)' }}>
      {/* ══════════════════════════════════════════════════════════
          Background Texture Layer
          ══════════════════════════════════════════════════════════ */}
      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(#2D1B10 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
      {/* Subtle paper grain via repeating gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(45,27,16,0.03) 2px, rgba(45,27,16,0.03) 4px)`,
        }} />

      {/* ══════════════════════════════════════════════════════════
          Corner Decorations (streak-dependent)
          ══════════════════════════════════════════════════════════ */}
      {/* Top-left: bookshelf corner */}
      <div className="absolute top-3 left-4 text-2xl opacity-25 select-none pointer-events-none transition-all duration-700">
        {decor.corner || '📖'}
      </div>
      {/* Top-right: study items */}
      <div className="absolute top-3 right-4 text-2xl opacity-25 select-none pointer-events-none transition-all duration-700">
        {decor.shelf}
      </div>
      {/* Bottom-left: cozy extras */}
      <div className="absolute bottom-3 left-4 text-xl opacity-20 select-none pointer-events-none flex gap-1.5 transition-all duration-700">
        {decor.extras.map((e, i) => <span key={i}>{e}</span>)}
      </div>
      {/* Bottom-right: bunny */}
      <div className="absolute bottom-3 right-4 text-xl opacity-20 select-none pointer-events-none animate-float">
        🐰
      </div>

      {/* ══════════════════════════════════════════════════════════
          Main Content
          ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 py-4 max-w-lg mx-auto space-y-4 px-4">

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-1.5 -ml-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            {/* Streak badge */}
            {streak >= 3 && (
              <div className="flex items-center gap-1 text-xs font-bold text-[var(--peach-soft)] bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[var(--peach-soft)]/20 shadow-sm">
                <Flame size={12} fill="currentColor" /> {streak}天
              </div>
            )}
            <span className="text-xs text-[var(--text-muted)]">{currentIdx + 1}/{words.length}</span>
          </div>
          <div className="w-5" />
        </div>

        {/* ── Bookshelf Progress ── */}
        <div className="flex items-center gap-1.5 justify-center">
          {words.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-300 rounded-sm"
              style={{
                width: '6px',
                height: i < currentIdx ? `${16 + Math.random() * 12}px` : '6px',
                background: i < currentIdx
                  ? 'linear-gradient(180deg, #FF8FAB, #C9B8E8)'
                  : i === currentIdx
                    ? 'linear-gradient(180deg, #FFB3C6, #FF8FAB)'
                    : '#E8D5C8',
                borderRadius: '1px 1px 0 0',
                boxShadow: i === currentIdx ? '0 0 8px rgba(255,143,171,0.3)' : 'none',
              }}
            />
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════
            3D Flashcard
            ══════════════════════════════════════════════════════════ */}
        {/* Tori reaction overlay */}
        {toriReaction && (
          <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none">
            <div className="bg-white/95 backdrop-blur-sm border-2 border-[var(--pink-light)] rounded-2xl px-6 py-4 shadow-xl animate-bounce-achievement text-center">
              <span className="text-sm font-medium text-[var(--text-primary)]">{toriReaction}</span>
            </div>
          </div>
        )}

        <div
          ref={cardRef}
          className="perspective-1000 w-full"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          onTouchStart={(e) => { touchXRef.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (flipped) return;
            const delta = e.changedTouches[0].clientX - touchXRef.current;
            if (Math.abs(delta) > 60 && !showAnswer) {
              if (delta > 0) {
                setSwipeDirection('right');
                const correctOpt = options.find(o => o.correct);
                if (correctOpt) {
                  setSelectedCorrect(true);
                  setSelfAssessment(3);
                  setShowAnswer(true);
                  setFlipped(true);
                }
              } else {
                setSwipeDirection('left');
                setSelectedCorrect(false);
                setSelfAssessment(0);
                setShowAnswer(true);
                setFlipped(true);
              }
              setTimeout(() => setSwipeDirection(null), 400);
            }
          }}
        >
          <div
            className="transition-all duration-500 transform-style-3d"
            style={{
              minHeight: '480px',
              transform: `rotateY(${flipped ? 180 : 0}deg) rotateX(${cardTilt.x}deg) rotateY(${flipped ? 180 : cardTilt.y}deg)`,
              ...(swipeDirection === 'left' ? { transform: 'translateX(-16px) rotateY(-4deg)' } : {}),
              ...(swipeDirection === 'right' ? { transform: 'translateX(16px) rotateY(4deg)' } : {}),
            }}
          >
            {/* ══════════════════════════════════════════════════════
                FRONT — MCQ
                ══════════════════════════════════════════════════════ */}
            <div
              className={`absolute inset-0 rounded-3xl p-6 flex flex-col items-center justify-center transition-opacity duration-300 ${
                flipped ? 'opacity-0 pointer-events-none' : ''
              }`}
              style={{
                backfaceVisibility: 'hidden',
                minHeight: '480px',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFBF7 100%)',
                boxShadow: `
                  0 1px 2px rgba(0,0,0,0.03),
                  0 2px 6px rgba(0,0,0,0.04),
                  0 6px 16px rgba(0,0,0,0.05),
                  0 12px 32px rgba(0,0,0,0.06),
                  0 20px 48px rgba(0,0,0,0.04)
                `,
                border: '1.5px solid #F0E8DD',
              }}
            >
              {/* Card paper lines (subtle) */}
              <div className="absolute inset-6 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, #2D1B10 27px, #2D1B10 28px)',
                }} />

              <div className="relative z-10 w-full flex flex-col items-center">
                <p className="text-[11px] text-[var(--text-muted)] mb-1 tracking-wide">
                  {currentWord.partOfSpeech} · {currentWord.pronunciation}
                </p>
                <h2 className="text-5xl font-bold text-[var(--text-primary)] mb-1 tracking-tight">{currentWord.word}</h2>
                <p className="text-xs text-[var(--text-muted)] mb-6">选择正确的中文意思</p>

                <div className="grid grid-cols-1 gap-2.5 w-full">
                  {options.map((opt, i) => {
                    const isDontKnow = opt.text === '不知道';
                    return (
                      <button
                        key={i}
                        onClick={() => handlePickOption(i)}
                        className={`px-4 py-3.5 rounded-2xl border text-[15px] font-medium transition-all duration-150 active:scale-[0.97] ${
                          isDontKnow
                            ? 'bg-[#F5F0EB]/60 border-[#E8D5C8] text-[var(--text-muted)] hover:bg-[#F5F0EB] hover:border-[#D0C0B0]'
                            : 'bg-white border-[#F0E8DD] text-[var(--text-primary)] hover:border-[var(--pink-primary)]/30 hover:bg-[var(--pink-primary)]/[0.03] hover:shadow-sm'
                        }`}
                      >
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════
                BACK — Answer + Quality Rating
                ══════════════════════════════════════════════════════ */}
            <div
              className={`absolute inset-0 rounded-3xl p-5 flex flex-col items-center transition-opacity duration-300 ${
                !flipped ? 'opacity-0 pointer-events-none' : ''
              }`}
              style={{
                backfaceVisibility: 'hidden',
                minHeight: '480px',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFBF7 100%)',
                boxShadow: `
                  0 1px 2px rgba(0,0,0,0.03),
                  0 2px 6px rgba(0,0,0,0.04),
                  0 6px 16px rgba(0,0,0,0.05),
                  0 12px 32px rgba(0,0,0,0.06),
                  0 20px 48px rgba(0,0,0,0.04)
                `,
                border: '1.5px solid rgba(255,143,171,0.2)',
              }}
            >
              {/* Correct / Wrong badge */}
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold mb-2 ${
                selectedCorrect
                  ? 'bg-[var(--mint-soft)]/12 text-[var(--mint-soft)]'
                  : 'bg-[var(--color-danger)]/8 text-[var(--color-danger)]'
              }`}>
                {selectedCorrect ? '✓ 回答正确' : '✗ 回答错误'}
              </div>

              <p className="text-[11px] text-[var(--text-muted)] mb-1">
                {currentWord.partOfSpeech} · {currentWord.pronunciation}
              </p>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">{currentWord.word}</h2>

              {/* Correct meaning */}
              <div className="bg-[var(--pink-primary)]/[0.06] border-2 border-[var(--pink-primary)]/15 rounded-2xl p-4 mb-3 w-full">
                <p className="text-[10px] text-[var(--text-muted)] mb-1 uppercase tracking-wider">正确意思</p>
                <p className="text-[var(--pink-primary)] text-2xl font-bold text-center">{currentWord.meaning}</p>
              </div>

              {currentWord.examples.length > 0 && (
                <div className="w-full space-y-1.5 mb-3 text-left">
                  {currentWord.examples.slice(0, 2).map((ex, i) => (
                    <div key={i} className="bg-[#FDF8F0] rounded-xl px-3 py-2 border border-[#F0E8DD]/50">
                      <div className="flex items-start gap-2">
                        <p className="text-sm text-[var(--text-primary)] flex-1">{ex.text}</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); speakKorean(ex.text); }}
                          className="p-1 rounded-lg hover:bg-white/60 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
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

              {/* ══════════════════════════════════════════════════════
                  Tactile Rating Buttons
                  ══════════════════════════════════════════════════════ */}
              <div className="w-full space-y-3 mt-auto">
                <p className="text-xs font-medium text-[var(--text-muted)] text-center uppercase tracking-wider">掌握程度</p>
                <div className="flex gap-2">
                  {RATING_BUTTONS.map((btn) => (
                    <button
                      key={btn.q}
                      onClick={() => setSelfAssessment(btn.q)}
                      className="flex-1 py-3 rounded-2xl flex flex-col items-center gap-1 transition-all duration-150 active:scale-95"
                      style={{
                        backgroundColor: selfAssessment === btn.q ? btn.color : '#FAFAFA',
                        border: selfAssessment === btn.q
                          ? `2px solid ${btn.border}`
                          : '1.5px solid #F0E8DD',
                        color: btn.text,
                        boxShadow: selfAssessment === btn.q
                          ? `0 2px 8px ${btn.border}40`
                          : '0 1px 2px rgba(0,0,0,0.02)',
                      }}
                    >
                      <span className="text-xl">{btn.emoji}</span>
                      <span className="text-[10px] font-medium leading-tight">{btn.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleConfirm()}
                  className="w-full py-3.5 bg-gradient-to-r from-[var(--pink-primary)] to-[#FF6B95] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-all shadow-md hover:shadow-lg"
                  style={{ boxShadow: '0 4px 16px rgba(255,143,171,0.3)' }}
                >
                  确认，下一题
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Session stats ── */}
        {sessionStats.reviewed > 0 && (
          <div className="flex items-center justify-center gap-4 text-xs text-[var(--text-muted)]">
            <span>已复习: {sessionStats.reviewed}</span>
            <span>通过: {sessionStats.passed}</span>
            <span>XP: +{xpEarned}</span>
          </div>
        )}
      </div>
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
