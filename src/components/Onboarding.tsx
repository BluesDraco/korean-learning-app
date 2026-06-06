'use client';

import { useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { updateProfile, awardXp, updateStreak } from '@/lib/gamification';

interface Props {
  onComplete: () => void;
}

type OnboardingGoal = 'shadowing' | 'analysis' | 'kpop' | 'explore';

const GOAL_OPTIONS: { key: OnboardingGoal; emoji: string; label: string; desc: string }[] = [
  { key: 'shadowing', emoji: '🎬', label: '看视频跟读', desc: '用韩剧、采访、YouTube 片段一句一句练听说' },
  { key: 'analysis', emoji: '🔍', label: '拆一句韩语', desc: '粘贴韩文，马上看懂意思、单词和用法' },
  { key: 'kpop', emoji: '🎤', label: '用 KPOP / 韩娱学', desc: '跟唱歌词，看懂热帖和 idol 表达' },
  { key: 'explore', emoji: '🧭', label: '先逛一逛', desc: '进入今日页，看看 Tori 能做什么' },
];

const GOAL_ROUTES: Record<OnboardingGoal, string> = {
  shadowing: '/shadowing',
  analysis: '/ai/analyze',
  kpop: '/korea/kpop',
  explore: '/daily',
};

export default function Onboarding({ onComplete }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<OnboardingGoal | null>(null);
  const [animating, setAnimating] = useState(false);

  const totalSteps = 2;

  const completeAndRedirect = useCallback(async (goal: OnboardingGoal | null) => {
    try {
      await updateProfile({ onboardingComplete: true });
    } catch { /* don't block on IndexedDB failure */ }
    fetch('/api/auth/onboarding', { method: 'POST' }).catch(() => {});
    try { await awardXp(10); } catch { /* not critical */ }
    try { await updateStreak(); } catch { /* not critical */ }
    if (typeof window !== 'undefined' && goal) {
      try { localStorage.setItem('tori_onboarding_goal', goal); } catch { /* not critical */ }
    }

    onComplete();
    const target = goal ? GOAL_ROUTES[goal] : '/daily';
    router.replace(target);
  }, [onComplete, router]);

  const handleNext = useCallback(async () => {
    setAnimating(true);
    await new Promise((r) => setTimeout(r, 400));
    setAnimating(false);
    setStep(1);
  }, []);

  const handleStart = useCallback(async () => {
    if (!selectedGoal) return;
    await completeAndRedirect(selectedGoal);
  }, [selectedGoal, completeAndRedirect]);

  const handleSkip = useCallback(async () => {
    await completeAndRedirect(null);
  }, [completeAndRedirect]);

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
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  안녕하세요！
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  我是托里<br />
                  你来了，我好开心！<br />
                  我们一起学韩语吧？
                </p>
              </div>
              <button
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:brightness-90 text-white rounded-2xl font-bold text-sm transition-all active:scale-95"
              >
                我准备好了！
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* ── Step 1: Start method selection ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                  你想先用 Tori 做什么？
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  选择一个开始方式，之后也可以随时切换。
                </p>
              </div>

              <div className="space-y-3">
                {GOAL_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSelectedGoal(opt.key)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      selectedGoal === opt.key
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

              <div className="space-y-3">
                <button
                  onClick={handleStart}
                  disabled={!selectedGoal}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:brightness-90 text-white rounded-2xl font-bold text-sm transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  开始使用
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={handleSkip}
                  className="w-full py-3 text-[var(--text-muted)] text-sm hover:text-[var(--text-secondary)] transition-colors"
                >
                  跳过，先进入 Tori
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
