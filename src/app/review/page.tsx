'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { Loader2, ArrowLeft, Zap, Flame, Volume2, Brain, TrendingUp, RotateCcw, Star, Activity } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/db';
import { calculateSRS } from '@/lib/srs';
import { updateStreak, awardXp, XP_REWARDS, getProfile } from '@/lib/gamification';
import { emitXpFlyout, emitStreakMilestone } from '@/components/XpOverlay';
import { memoryHealthScore, atRiskWords } from '@/lib/forgetting-curve';
import type { Word } from '@/types';

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

const RATING_BUTTONS = [
  { q: 0, emoji: '😰', label: '忘了' },
  { q: 1, emoji: '🤔', label: '模糊' },
  { q: 2, emoji: '💡', label: '记得' },
  { q: 3, emoji: '🎯', label: '熟练' },
];

function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId');

  const [words, setWords] = useState<Word[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [complete, setComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, passed: 0, startTime: 0 });
  const [xpEarned, setXpEarned] = useState(0);
  const [leveledUp, setLeveledUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [selfAssessment, setSelfAssessment] = useState(0);
  const [selectedCorrect, setSelectedCorrect] = useState<boolean | null>(null);
  const [allMeanings, setAllMeanings] = useState<string[]>([]);
  const [options, setOptions] = useState<{ text: string; correct: boolean }[]>([]);
  const [showIntro, setShowIntro] = useState(false);
  const [toriReaction, setToriReaction] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const touchXRef = useRef<number>(0);

  useEffect(() => {
    if (!localStorage.getItem('srs-intro-seen')) setShowIntro(true);
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
    if (dueWords.length === 0) setComplete(true);

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
    const correct = words[currentIdx].meaning;
    const pool = allMeanings.filter((m) => m !== correct && m.trim().length > 0);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const distractors = shuffled.slice(0, 3);
    const opts = [
      { text: correct, correct: true },
      ...distractors.map((d) => ({ text: d, correct: false })),
      { text: '不知道', correct: false },
    ];
    const dontKnow = opts.find((o) => o.text === '不知道')!;
    const rest = opts.filter((o) => o.text !== '不知道');
    setOptions([...rest.sort(() => Math.random() - 0.5), dontKnow]);
  }, [currentIdx, words, allMeanings]);

  const handlePickOption = (idx: number) => {
    const opt = options[idx];
    setSelectedCorrect(opt.correct);
    setSelfAssessment(opt.correct ? 3 : 0);
    setFlipped(true);
  };

  const handleConfirm = async () => {
    const quality = selfAssessment;
    const reactions: Record<number, string> = {
      0: '没关系，下次一定记住 🐰',
      1: '快想起来了，再来一次！🐰',
      2: '记起来了！继续加油 💪',
      3: '不错！越来越熟了 ✨',
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

    const passed = quality >= 2;
    const xp = passed ? XP_REWARDS.wordReviewed : 0;
    let lvlUp = false;
    let nl = 0;
    if (xp > 0) {
      const r = await awardXp(xp);
      lvlUp = r.leveledUp;
      nl = r.newLevel;
      emitXpFlyout(xp);
      if (lvlUp) window.dispatchEvent(new CustomEvent('level-up', { detail: { level: nl } }));
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
      if (streakResult.isMilestone) emitStreakMilestone(streakResult.milestone);
      await db.reviewSessions.put({
        id: crypto.randomUUID(),
        date: Date.now(),
        wordsReviewed: sessionStats.reviewed + 1,
        wordsPassed: sessionStats.passed + (passed ? 1 : 0),
        duration: Math.round((Date.now() - sessionStats.startTime) / 1000),
        xpEarned: xpEarned + xp,
      });
      setComplete(true);
    } else {
      setCurrentIdx(currentIdx + 1);
      setFlipped(false);
      setSelfAssessment(0);
      setSelectedCorrect(null);
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // Shared background wrapper
  // ═══════════════════════════════════════════════════════════════
  const bgStyle = { background: 'linear-gradient(180deg, #FDF8F0 0%, #FFF5F2 40%, #FFF0F3 100%)' };

  // ── Intro modal ──
  if (showIntro) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/30" onClick={dismissIntro} />
        <div className="relative bg-white border border-[var(--border-default)] rounded-3xl shadow-2xl w-full max-w-sm p-6 space-y-5 animate-bounce-in">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-[var(--pink-pale)]/30 flex items-center justify-center mx-auto mb-3">
              <Brain size={28} className="text-[var(--pink-primary)]" />
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">SRS 间隔重复</h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">比普通背诵效率高 2-3 倍的科学记忆法</p>
          </div>
          <div className="space-y-3">
            {[
              { icon: TrendingUp, color: 'text-[var(--mint-soft)]', title: '在你快忘的时候提醒你', desc: '系统根据遗忘曲线自动计算最佳复习时机' },
              { icon: RotateCcw, color: 'text-[var(--peach-soft)]', title: '忘记的多练，记住的少练', desc: '每个单词有自己的复习节奏，不再一刀切' },
              { icon: Star, color: 'text-[var(--purple-soft)]', title: '诚实评分效果最好', desc: '你的评分决定下次见到这个词的时间' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3">
                <item.icon size={16} className={`${item.color} shrink-0 mt-0.5`} />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{item.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={dismissIntro} className="w-full py-3 bg-[var(--pink-primary)] hover:brightness-95 text-white rounded-2xl font-bold text-sm transition-all active:scale-[0.97]">
            知道了
          </button>
        </div>
      </div>
    );
  }

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={bgStyle}>
        <Loader2 size={32} className="animate-spin text-[var(--text-muted)]" />
      </div>
    );
  }

  // ── Complete ──
  if (complete) {
    const accuracy = sessionStats.reviewed > 0 ? Math.round((sessionStats.passed / sessionStats.reviewed) * 100) : 0;
    return (
      <div className="relative min-h-screen flex items-center justify-center" style={bgStyle}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2D1B10 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="absolute top-6 left-6 text-3xl opacity-25 select-none pointer-events-none">📖 📚</div>
        <div className="absolute bottom-6 right-6 text-3xl opacity-20 select-none pointer-events-none animate-float">🐰</div>

        <div className="text-center py-12 px-4 space-y-6 max-w-sm mx-auto relative z-10">
          <div className="relative inline-block">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[var(--mint-soft)]/10 to-[var(--pink-primary)]/10 flex items-center justify-center mx-auto border-2 border-[var(--pink-pale)]/40"
              style={{ boxShadow: '0 4px 24px rgba(255,143,171,0.08)' }}>
              <span className="text-6xl animate-float">🐰</span>
            </div>
            {leveledUp && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--peach-soft)] to-[var(--pink-primary)] text-white text-xs font-bold px-4 py-1.5 rounded-full animate-bounce-achievement shadow-lg whitespace-nowrap">
                Level Up! {newLevel}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">复习完成</h1>
            <p className="text-[var(--text-secondary)] text-sm mt-2">今天的复习全做完了，明天再来吧 🐰</p>
            <p className={`text-lg font-bold mt-2 ${accuracy >= 80 ? 'text-[var(--mint-soft)]' : accuracy >= 50 ? 'text-[var(--peach-soft)]' : 'text-[var(--color-danger)]'}`}>
              {accuracy}% 正确率
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/70 backdrop-blur-sm border border-[var(--border-default)] rounded-2xl p-4">
              <Zap size={20} className="text-[var(--peach-soft)] mx-auto mb-1" />
              <div className="text-xl font-bold text-[var(--text-primary)]">+{xpEarned}</div>
              <div className="text-xs text-[var(--text-muted)]">XP</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-[var(--border-default)] rounded-2xl p-4">
              <Flame size={20} className="text-[var(--peach-soft)] mx-auto mb-1" />
              <div className="text-xl font-bold text-[var(--text-primary)]">{sessionStats.passed}</div>
              <div className="text-xs text-[var(--text-muted)]">通过</div>
            </div>
          </div>

          {(() => {
            const healthScore = memoryHealthScore(words);
            const atRisk = atRiskWords(words, 3);
            return (
              <div className="bg-white/70 backdrop-blur-sm border border-[var(--border-default)] rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-[var(--purple-soft)]" />
                  <span className="text-xs font-medium text-[var(--text-secondary)]">记忆健康度</span>
                  <span className={`text-sm font-bold ml-auto ${healthScore >= 70 ? 'text-[var(--mint-soft)]' : healthScore >= 40 ? 'text-[var(--peach-soft)]' : 'text-[var(--color-danger)]'}`}>
                    {healthScore}/100
                  </span>
                </div>
                <div className="w-full bg-[var(--bg-muted)] rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${healthScore >= 70 ? 'bg-[var(--mint-soft)]' : healthScore >= 40 ? 'bg-[var(--peach-soft)]' : 'bg-[var(--color-danger)]'}`}
                    style={{ width: `${healthScore}%` }} />
                </div>
                {atRisk.length > 0 && (
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1.5">建议复习：</p>
                    <div className="flex flex-wrap gap-1">
                      {atRisk.map((w) => (
                        <span key={w.id} className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/10 text-[var(--text-secondary)]">{w.word}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          <div className="flex gap-3 justify-center">
            <button onClick={() => { setComplete(false); setCurrentIdx(0); setFlipped(false); setSelfAssessment(0); setSelectedCorrect(null); setXpEarned(0); setSessionStats({ reviewed: 0, passed: 0, startTime: Date.now() }); setLeveledUp(false); loadWords(); }}
              className="px-6 py-2.5 bg-[var(--pink-primary)] hover:brightness-95 text-white text-sm font-bold rounded-full transition-all active:scale-95 shadow-md">
              再来一轮
            </button>
            <button onClick={() => router.push('/')}
              className="px-6 py-2.5 bg-white/80 border border-[var(--border-default)] hover:bg-[var(--bg-muted)] text-[var(--text-primary)] text-sm font-medium rounded-full transition-all active:scale-95">
              返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Empty ──
  if (words.length === 0) {
    return (
      <div className="relative min-h-screen flex items-center justify-center" style={bgStyle}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2D1B10 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="text-center py-16 space-y-4 relative z-10">
          <div className="text-7xl animate-float">🐰</div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">今天没有要复习的词</h1>
          <p className="text-[var(--text-secondary)] text-sm">要不要去学一些新词？</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => router.push('/learn')} className="px-5 py-2.5 bg-[var(--pink-primary)] hover:brightness-90 text-white text-sm font-bold rounded-full transition-all active:scale-95 shadow-md">去学习</button>
            <button onClick={() => router.push('/vocabulary')} className="px-5 py-2.5 bg-white/80 border border-[var(--border-default)] hover:bg-[var(--bg-muted)] text-[var(--text-primary)] text-sm font-medium rounded-full transition-all active:scale-95">词汇库</button>
          </div>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIdx];
  const progress = (currentIdx / words.length) * 100;

  return (
    <div className="relative min-h-screen" style={bgStyle}>
      {/* Paper texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#2D1B10 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

      {/* Tori reaction */}
      {toriReaction && (
        <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm border-2 border-[var(--pink-light)] rounded-2xl px-6 py-4 shadow-xl animate-bounce-achievement">
            <span className="text-sm font-bold text-[var(--text-primary)]">{toriReaction}</span>
          </div>
        </div>
      )}

      <div className="relative z-10 py-4 max-w-lg mx-auto space-y-4 px-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-1.5 -ml-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            {streak >= 3 && (
              <div className="flex items-center gap-1 text-xs font-bold text-[var(--peach-soft)] bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[var(--peach-soft)]/15">
                <Flame size={11} fill="currentColor" /> {streak}天
              </div>
            )}
            <span className="text-xs text-[var(--text-muted)] tabular-nums">{currentIdx + 1}/{words.length}</span>
          </div>
          <div className="w-5" />
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#E8D5C8]/40 rounded-full h-1 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }} />
        </div>

        {/* ══════════════════════════════════════════════════════════
            3D Flashcard
            ══════════════════════════════════════════════════════════ */}
        <div
          className="perspective-1000 w-full"
          onTouchStart={(e) => { touchXRef.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (flipped) return;
            const delta = e.changedTouches[0].clientX - touchXRef.current;
            if (Math.abs(delta) > 60) {
              if (delta > 0) {
                const correctOpt = options.find(o => o.correct);
                if (correctOpt) { setSelectedCorrect(true); setSelfAssessment(3); setFlipped(true); }
              } else {
                setSelectedCorrect(false); setSelfAssessment(0); setFlipped(true);
              }
            }
          }}
        >
          <div className="relative" style={{ minHeight: '500px' }}>
            <div
              className="w-full transition-all duration-500 transform-style-3d"
              style={{
                minHeight: '500px',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* ═══════════════════════════════════════════════════
                  FRONT — MCQ
                  ═══════════════════════════════════════════════════ */}
              <div
                className={`absolute inset-0 rounded-3xl p-5 flex flex-col items-center justify-center ${
                  flipped ? 'opacity-0 pointer-events-none' : ''
                }`}
                style={{
                  backfaceVisibility: 'hidden',
                  minHeight: '500px',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFCF9 100%)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.05), 0 24px 56px rgba(0,0,0,0.03)',
                  border: '1px solid #F0E8DD',
                }}
              >
                <p className="text-xs text-[var(--text-muted)] mb-1">{currentWord.partOfSpeech} · {currentWord.pronunciation}</p>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-[2.75rem] font-extrabold text-[var(--text-primary)] tracking-tight leading-none">{currentWord.word}</h2>
                  <button
                    onClick={(e) => { e.stopPropagation(); speakKorean(currentWord.word); }}
                    className="p-2 rounded-xl bg-[var(--bg-soft)] hover:bg-[var(--pink-pale)]/40 text-[var(--pink-primary)] transition-colors"
                  >
                    <Volume2 size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2.5 w-full">
                  {options.map((opt, i) => {
                    const isDontKnow = opt.text === '不知道';
                    return (
                      <button
                        key={i}
                        onClick={() => handlePickOption(i)}
                        className={`px-4 py-3.5 rounded-2xl border text-[15px] font-medium transition-all duration-150 active:scale-[0.97] ${
                          isDontKnow
                            ? 'bg-transparent border-dashed border-[#D0C0B0] text-[var(--text-muted)] hover:bg-[#F5F0EB]/50'
                            : 'bg-white border-[#F0E8DD] text-[var(--text-primary)] hover:border-[var(--pink-primary)]/30 hover:bg-[var(--pink-pale)]/10 hover:shadow-sm'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                <p className="text-[10px] text-[var(--text-muted)] mt-4">← 左滑不认识  ·  右滑认识 →</p>
              </div>

              {/* ═══════════════════════════════════════════════════
                  BACK — Answer + Rating
                  ═══════════════════════════════════════════════════ */}
              <div
                className={`absolute inset-0 rounded-3xl p-5 flex flex-col items-center rotate-y-180 ${
                  !flipped ? 'opacity-0 pointer-events-none' : ''
                }`}
                style={{
                  backfaceVisibility: 'hidden',
                  minHeight: '500px',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFCF9 100%)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.05), 0 24px 56px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(255,143,171,0.15)',
                }}
              >
                <div className={`px-4 py-1 rounded-full text-xs font-bold mb-2 ${
                  selectedCorrect
                    ? 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] border border-[var(--mint-soft)]/20'
                    : 'bg-[var(--color-danger)]/5 text-[var(--color-danger)] border border-[var(--color-danger)]/10'
                }`}>
                  {selectedCorrect ? '✓ 正确' : '✗ 错误'}
                </div>

                <p className="text-xs text-[var(--text-muted)]">{currentWord.partOfSpeech} · {currentWord.pronunciation}</p>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">{currentWord.word}</h2>
                  <button
                    onClick={(e) => { e.stopPropagation(); speakKorean(currentWord.word); }}
                    className="p-1.5 rounded-lg hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                {/* Meaning */}
                <div className="bg-[var(--pink-pale)]/10 border border-[var(--pink-primary)]/10 rounded-2xl p-4 w-full mb-2">
                  <p className="text-[10px] text-[var(--text-muted)] mb-0.5 uppercase tracking-wider">中文意思</p>
                  <p className="text-[var(--pink-primary)] text-2xl font-bold text-center">{currentWord.meaning}</p>
                </div>

                {/* Examples */}
                {currentWord.examples.length > 0 && (
                  <div className="w-full space-y-1 mb-2">
                    {currentWord.examples.slice(0, 2).map((ex, i) => (
                      <div key={i} className="bg-[#FDF8F0] rounded-xl px-3 py-2 border border-[#F0E8DD]/50">
                        <div className="flex items-start gap-1.5">
                          <p className="text-[13px] text-[var(--text-primary)] flex-1 leading-snug">{ex.text}</p>
                          <button onClick={(e) => { e.stopPropagation(); speakKorean(ex.text); }}
                            className="p-0.5 rounded hover:bg-white/50 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0 mt-0.5">
                            <Volume2 size={12} />
                          </button>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)]">{ex.translation}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Rating buttons */}
                <div className="w-full mt-auto">
                  <p className="text-[10px] font-medium text-[var(--text-muted)] text-center mb-2 uppercase tracking-wider">你记得怎么样？</p>
                  <div className="flex gap-2 mb-2">
                    {RATING_BUTTONS.map((btn) => {
                      const active = selfAssessment === btn.q;
                      return (
                        <button
                          key={btn.q}
                          onClick={() => setSelfAssessment(btn.q)}
                          className="flex-1 py-3 rounded-2xl flex flex-col items-center gap-0.5 transition-all duration-150 active:scale-95"
                          style={{
                            backgroundColor: active ? 'var(--pink-pale)' : '#FAFAFA',
                            border: active ? '2px solid var(--pink-primary)' : '1.5px solid #F0E8DD',
                            color: active ? 'var(--pink-primary)' : 'var(--text-muted)',
                            boxShadow: active ? '0 2px 8px rgba(255,143,171,0.2)' : 'none',
                          }}
                        >
                          <span className="text-xl">{btn.emoji}</span>
                          <span className="text-[10px] leading-tight">{btn.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleConfirm}
                    className="w-full py-3.5 bg-gradient-to-r from-[var(--pink-primary)] to-[#FF6B95] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-all"
                    style={{ boxShadow: '0 4px 16px rgba(255,143,171,0.25)' }}
                  >
                    {currentIdx + 1 >= words.length ? '完成复习' : '确认，下一题'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Session stats */}
        {sessionStats.reviewed > 0 && (
          <div className="flex items-center justify-center gap-5 text-[11px] text-[var(--text-muted)]">
            <span>已复习 {sessionStats.reviewed}</span>
            <span>通过 {sessionStats.passed}</span>
            <span>+{xpEarned} XP</span>
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
