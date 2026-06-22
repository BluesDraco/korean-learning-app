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

const FEATURES = [
  { emoji: '🎬', label: '影子跟读', desc: '用韩剧、采访片段一句一句练听说' },
  { emoji: '🎵', label: 'KPOP 跟唱', desc: '跟着喜欢的歌学韩语，边唱边记' },
  { emoji: '🔍', label: '内容拆解', desc: '粘贴韩文，马上看懂意思和用法' },
  { emoji: '📖', label: '语法课程', desc: '30天入门，系统打好语法基础' },
  { emoji: '🃏', label: '闪卡复习', desc: 'SRS间隔重复，高效记忆单词' },
  { emoji: '🗞️', label: '韩娱热帖', desc: '读真实的韩娱内容，顺便学韩语' },
];

export default function Onboarding({ onComplete }: Props) {
  const router = useRouter();
  const { lang, setLang: setContextLang } = useLang();
  // step -1 = language select, 0 = greeting, 1 = feature showcase
  const [step, setStep] = useState<-1 | 0 | 1>(-1);
  const [animating, setAnimating] = useState(false);

  const completeAndRedirect = useCallback(async () => {
    try { await updateProfile({ onboardingComplete: true }); } catch { /* not critical */ }
    fetch('/api/auth/onboarding', { method: 'POST' }).catch(() => {});
    try { await awardXp(10); } catch { /* not critical */ }
    try { await updateStreak(); } catch { /* not critical */ }
    onComplete();
    router.replace('/daily');
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

  const totalSteps = 2;

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--bg-base)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Progress dots */}
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

          {/* ── Step 1: Feature showcase ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                  Tori 能帮你做什么？
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  所有功能随时可用，想从哪里开始都行。
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left">
                {FEATURES.map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col gap-1 p-3 rounded-xl bg-[var(--bg-soft)] border border-[var(--border-color)]"
                  >
                    <span className="text-xl">{f.emoji}</span>
                    <div className="text-xs font-semibold text-[var(--text-primary)]">{f.label}</div>
                    <div className="text-[11px] text-[var(--text-muted)] leading-snug">{f.desc}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={completeAndRedirect}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:brightness-90 text-white rounded-2xl font-bold text-sm transition-all active:scale-95"
              >
                开始使用 Tori
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

