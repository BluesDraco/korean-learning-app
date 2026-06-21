'use client';

import { useState, useCallback } from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { updateProfile, awardXp, updateStreak } from '@/lib/gamification';
import { useLang } from '@/components/LangProvider';
import { t, type Lang, setLang } from '@/lib/i18n';

interface Props {
  onComplete: () => void;
}

type OnboardingGoal = 'shadowing' | 'analysis' | 'explore';

const GOAL_ROUTES: Record<OnboardingGoal, string> = {
  shadowing: '/shadowing',
  analysis: '/ai/analyze',
  explore: '/daily',
};

export default function Onboarding({ onComplete }: Props) {
  const router = useRouter();
  const { lang, setLang: setContextLang } = useLang();
  // step -1 = language select, 0 = greeting, 1 = goal
  const [step, setStep] = useState<-1 | 0 | 1>(-1);
  const [selectedGoal, setSelectedGoal] = useState<OnboardingGoal | null>(null);
  const [animating, setAnimating] = useState(false);

  const goalOptions = [
    { key: 'shadowing' as OnboardingGoal, emoji: '🎬', label: t('onboarding.goal_shadowing', lang), desc: t('onboarding.goal_shadowing_desc', lang) },
    { key: 'analysis' as OnboardingGoal, emoji: '🔍', label: t('onboarding.goal_analyze', lang), desc: t('onboarding.goal_analyze_desc', lang) },
    { key: 'explore' as OnboardingGoal, emoji: '🧭', label: t('onboarding.goal_explore', lang), desc: t('onboarding.goal_explore_desc', lang) },
  ];

  const completeAndRedirect = useCallback(async (goal: OnboardingGoal | null) => {
    try { await updateProfile({ onboardingComplete: true }); } catch { /* not critical */ }
    fetch('/api/auth/onboarding', { method: 'POST' }).catch(() => {});
    try { await awardXp(10); } catch { /* not critical */ }
    try { await updateStreak(); } catch { /* not critical */ }
    if (typeof window !== 'undefined' && goal) {
      try { localStorage.setItem('tori_onboarding_goal', goal); } catch { /* not critical */ }
    }
    onComplete();
    router.replace(goal ? GOAL_ROUTES[goal] : '/daily');
  }, [onComplete, router]);

  const pickLang = useCallback(async (l: Lang) => {
    setLang(l);
    setContextLang(l);
    setAnimating(true);
    await new Promise((r) => setTimeout(r, 300));
    setAnimating(false);
    setStep(0);
  }, [setContextLang]);

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

  // progress dots only for step 0 and 1
  const totalSteps = 2;

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--bg-base)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Progress dots (hidden on language step) */}
        {step >= 0 && (
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
        )}

        {/* Card */}
        <div
          className={`bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 text-center shadow-lg transition-all duration-300 ${
            animating ? 'opacity-0 translate-y-4' : 'opacity-100'
          }`}
        >

          {/* ── Step -1: Language selection ── */}
          {step === -1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-center mb-2">
                  <Globe size={36} className="text-[var(--pink-primary)]" />
                </div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  Choose your language / 选择语言
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Can be changed in Settings / 可在设置页随时修改
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => pickLang('zh')}
                  className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-[var(--border-color)] hover:border-[var(--pink-primary)]/50 hover:bg-[var(--pink-primary)]/5 transition-all active:scale-95"
                >
                  <span className="text-3xl">🇨🇳</span>
                  <span className="font-bold text-[var(--text-primary)]">中文</span>
                  <span className="text-xs text-[var(--text-muted)]">Chinese</span>
                </button>
                <button
                  onClick={() => pickLang('en')}
                  className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-[var(--border-color)] hover:border-[var(--pink-primary)]/50 hover:bg-[var(--pink-primary)]/5 transition-all active:scale-95"
                >
                  <span className="text-3xl">🇺🇸</span>
                  <span className="font-bold text-[var(--text-primary)]">English</span>
                  <span className="text-xs text-[var(--text-muted)]">英文</span>
                </button>
              </div>
            </div>
          )}

          {/* ── Step 0: Tori greeting ── */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  {t('onboarding.greeting_title', lang)}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                  {t('onboarding.greeting_lines', lang).split(' / ').join('\n')}
                </p>
              </div>
              <button
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:brightness-90 text-white rounded-2xl font-bold text-sm transition-all active:scale-95"
              >
                {t('onboarding.greeting_btn', lang)}
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* ── Step 1: Start method selection ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                  {t('onboarding.goal_title', lang)}
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  {t('onboarding.goal_subtitle', lang)}
                </p>
              </div>

              <div className="space-y-3">
                {goalOptions.map((opt) => (
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
                  {t('onboarding.start_btn', lang)}
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={handleSkip}
                  className="w-full py-3 text-[var(--text-muted)] text-sm hover:text-[var(--text-secondary)] transition-colors"
                >
                  {t('onboarding.skip_btn', lang)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
