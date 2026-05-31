'use client';

import { useState, useCallback } from 'react';
import { Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { updateProfile, awardXp, updateStreak } from '@/lib/gamification';
import type { UserProfile } from '@/types';
import { speak } from '@/lib/tts';

interface Props {
  onComplete: () => void;
}

const QUIZ_OPTIONS = ['谢谢', '你好', '再见', '对不起'];
const QUIZ_CORRECT = '你好';

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<UserProfile['targetLevel']>('beginner');
  const [animating, setAnimating] = useState(false);
  const [quizResult, setQuizResult] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSteps = 4;

  // Save level to profile
  const handleLevelSelect = useCallback(async (l: UserProfile['targetLevel']) => {
    setLevel(l);
    await updateProfile({ targetLevel: l });
  }, []);

  // Step 1→2→3→4 progression
  const next = useCallback(async () => {
    if (step === 3) {
      // Complete onboarding
      await updateProfile({ onboardingComplete: true });
      fetch('/api/auth/onboarding', { method: 'POST' }).catch(() => {});
      try { await awardXp(10); } catch { /* not critical */ }
      try { await updateStreak(); } catch { /* not critical */ }
      onComplete();
      return;
    }
    setAnimating(true);
    await new Promise((r) => setTimeout(r, 400));
    setAnimating(false);
    setStep((s) => s + 1);
  }, [step, onComplete]);

  // Quiz handler
  const handleQuiz = (answer: string) => {
    const correct = answer === QUIZ_CORRECT;
    setQuizResult(correct);
    if (correct) {
      setShowConfetti(true);
    }
  };

  const retryQuiz = () => {
    setQuizResult(null);
    setShowConfetti(false);
  };

  // Background confetti particles
  const confettiParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.5}s`,
    color: ['#FF8FAB', '#C9B8E8', '#A8D8D0', '#FFE4A0', '#FFBEA8'][i % 5],
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--bg-base)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step
                  ? 'w-10 bg-[var(--pink-primary)]'
                  : i < step
                    ? 'w-5 bg-[var(--mint-soft)]'
                    : 'w-5 bg-[var(--bg-muted)]'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div
          className={`bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 text-center shadow-lg transition-all duration-400 ${
            animating ? 'opacity-0 translate-y-4' : 'opacity-100'
          }`}
        >
          {/* ── Step 0: Tori greeting ── */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="text-7xl animate-bounce-in">🐰</div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  안녕하세요！
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  我是托里 🐰<br />
                  你来了，我好开心！<br />
                  我们一起学韩语吧？
                </p>
              </div>
              <button
                onClick={next}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:brightness-90 text-white rounded-2xl font-bold text-sm transition-all active:scale-95"
              >
                我准备好了！
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* ── Step 1: Level selection ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <div className="text-5xl mb-4">📊</div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                  你现在的韩语水平是？
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  托里会根据你的水平推荐学习内容
                </p>
              </div>

              <div className="space-y-3">
                {([
                  { value: 'beginner' as const, label: '完全零基础', desc: '从四十音和问候语开始', emoji: '🌱' },
                  { value: 'beginner' as const, label: '会一点点', desc: '认识字母，能说简单问候', emoji: '🌿' },
                  { value: 'intermediate' as const, label: '初级水平', desc: 'TOPIK 1-2，能简单对话', emoji: '🌳' },
                  { value: 'advanced' as const, label: '中级以上', desc: 'TOPIK 3+，能流利表达', emoji: '🌺' },
                ]).map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleLevelSelect(opt.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      level === opt.value
                        ? 'bg-[var(--pink-primary)]/10 border-[var(--pink-primary)]/50'
                        : 'bg-[var(--bg-soft)] border-[var(--border-color)] hover:border-[var(--border-hover)]'
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-[var(--text-primary)]">{opt.label}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:brightness-90 text-white rounded-2xl font-bold text-sm transition-all active:scale-95"
              >
                继续
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* ── Step 2: First Korean word (activation moment) ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <div className="text-xs text-[var(--text-muted)] mb-1 bg-[var(--bg-soft)] inline-block px-3 py-1 rounded-full">
                  花30秒，学会你的第一个韩语词
                </div>
              </div>

              {/* Word card */}
              <div className="bg-[var(--bg-soft)] border-2 border-[var(--pink-pale)] rounded-2xl p-6 space-y-3">
                <p className="text-4xl font-bold text-[var(--text-primary)]">안녕하세요</p>
                <p className="text-sm text-[var(--text-muted)]">an-nyeong-ha-se-yo</p>
                <button
                  onClick={() => speak('안녕하세요', 0.75)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors text-sm"
                >
                  <Volume2 size={16} />
                  听发音
                </button>
                <div className="border-t border-[var(--border-color)] pt-3 mt-3">
                  <p className="text-lg font-bold text-[var(--pink-primary)]">你好</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    韩语最常用的问候语
                  </p>
                </div>
                <div className="bg-[var(--pink-primary)]/5 rounded-xl p-3 text-xs text-[var(--text-secondary)]">
                  🐰 学会这个词，你就能和任何韩国人打招呼了！
                </div>
              </div>

              {!quizResult ? (
                <>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    小测验：안녕하세요 是什么意思？
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {QUIZ_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleQuiz(opt)}
                        className="py-3 px-4 bg-[var(--bg-soft)] border border-[var(--border-color)] rounded-xl text-sm font-medium text-[var(--text-primary)] hover:border-[var(--pink-primary)]/40 hover:bg-[var(--pink-primary)]/5 transition-all active:scale-95"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              ) : quizResult === true ? (
                <div className="space-y-4 animate-bounce-in">
                  <div className="text-6xl">🎉</div>
                  <div>
                    <p className="text-xl font-bold text-[var(--mint-soft)]">答对了！</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      토리好骄傲 🐰
                    </p>
                  </div>
                  <button
                    onClick={next}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:brightness-90 text-white rounded-2xl font-bold text-sm transition-all active:scale-95"
                  >
                    太棒了！
                    <Sparkles size={18} />
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-slide-up">
                  <div className="text-5xl">🐰</div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    没关系，再看一次
                  </p>
                  <button
                    onClick={retryQuiz}
                    className="w-full py-3 bg-[var(--bg-soft)] border border-[var(--border-color)] rounded-2xl text-sm font-medium text-[var(--text-primary)] hover:border-[var(--pink-primary)]/30 transition-all"
                  >
                    再看一次
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Step 3: Achievement celebration ── */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Confetti */}
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {confettiParticles.map((p) => (
                    <div
                      key={p.id}
                      className="confetti"
                      style={{
                        left: p.left,
                        animationDelay: p.delay,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '0',
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="text-7xl animate-bounce-achievement">🎉</div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  你学会了第一个韩语词！
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  和托里的韩语之旅正式开始了
                </p>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[var(--mint-soft)]">🎉</div>
                  <div className="text-xs text-[var(--text-muted)]">首词解锁</div>
                </div>
                <div className="bg-[var(--peach-soft)]/10 border border-[var(--peach-soft)]/20 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[var(--peach-soft)]">+10</div>
                  <div className="text-xs text-[var(--text-muted)]">经验值</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={next}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:brightness-90 text-white rounded-2xl font-bold text-sm transition-all active:scale-95"
                >
                  继续学习
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={next}
                  className="flex-1 py-3.5 bg-[var(--bg-soft)] border border-[var(--border-color)] rounded-2xl text-sm font-medium text-[var(--text-primary)] hover:border-[var(--pink-primary)]/30 transition-all"
                >
                  先逛逛
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
