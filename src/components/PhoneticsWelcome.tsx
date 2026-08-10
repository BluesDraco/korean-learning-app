'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, X, Volume2, Sparkles, Compass } from 'lucide-react';
import { speak, speakWord } from '@/lib/tts';
import { useLang } from '@/components/LangProvider';
import { useAuth } from '@/components/AuthProvider';
import { t } from '@/lib/i18n';

// 6-26 串号事故教训：localStorage key 必须带 userId 前缀。
function welcomeKey(userId: string): string {
  return `phonetics-welcome-seen:${userId}`;
}

export default function PhoneticsWelcome({ onDone }: { onDone: () => void }) {
  const { lang } = useLang();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const STEPS = [
    {
      emoji: '👋',
      title: t('phoneticsWelcome.step0_title', lang),
      subtitle: t('phoneticsWelcome.step0_subtitle', lang),
      highlights: [
        t('phoneticsWelcome.step0_highlight1', lang),
        t('phoneticsWelcome.step0_highlight2', lang),
        t('phoneticsWelcome.step0_highlight3', lang),
      ],
    },
    {
      emoji: '🧩',
      title: t('phoneticsWelcome.step1_title', lang),
      subtitle: t('phoneticsWelcome.step1_subtitle', lang),
      visual: true,
      highlights: [
        t('phoneticsWelcome.step1_highlight1', lang),
        t('phoneticsWelcome.step1_highlight2', lang),
        t('phoneticsWelcome.step1_highlight3', lang),
      ],
    },
    {
      emoji: '🎯',
      title: t('phoneticsWelcome.step2_title', lang),
      subtitle: t('phoneticsWelcome.step2_subtitle', lang),
      interactive: true,
    },
  ];

  useEffect(() => {
    if (dismissed) {
      if (user?.id) localStorage.setItem(welcomeKey(user.id), '1');
      onDone();
    }
  }, [dismissed, onDone, user?.id]);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--bg-base)]/90 backdrop-blur-md">
      {/* Card */}
      <div className="relative w-full max-w-[380px] max-h-[calc(100dvh-48px)] overflow-y-auto rounded-[32px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-[0_18px_48px_rgba(120,70,90,0.16)] p-6 space-y-6">
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step ? 'bg-[var(--pink-primary)] w-6' : i < step ? 'bg-[var(--mint-soft)]' : 'bg-[var(--border-color)]'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <div className="text-6xl">{current.emoji}</div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">{current.title}</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{current.subtitle}</p>
        </div>

        {/* Highlights list (steps 0-1) */}
        {current.highlights && !current.interactive && (
          <div className="space-y-3">
            {current.highlights.map((h, i) => (
              <div
                key={i}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-[var(--text-primary)]">{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Visual demo (step 1) */}
        {current.visual && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-center gap-2 flex-wrap text-2xl font-bold">
              <span className="bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] px-4 py-3 rounded-2xl">ㄱ</span>
              <span className="text-[var(--text-muted)]">+</span>
              <span className="bg-[var(--purple-soft)]/10 text-[var(--purple-soft)] px-4 py-3 rounded-2xl">ㅏ</span>
              <span className="text-[var(--text-muted)]">=</span>
              <button
                onClick={() => speakWord('가')}
                className="bg-gradient-to-br from-[var(--pink-primary)]/20 to-[var(--purple-soft)]/20 text-[var(--text-primary)] px-6 py-3 rounded-2xl text-3xl hover:scale-105 transition-transform"
              >
                가
                <Volume2 size={14} className="inline ml-2 text-[var(--text-muted)]" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap text-2xl font-bold">
              <span className="bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] px-4 py-3 rounded-2xl">ㅎ</span>
              <span className="text-[var(--text-muted)]">+</span>
              <span className="bg-[var(--purple-soft)]/10 text-[var(--purple-soft)] px-4 py-3 rounded-2xl">ㅏ</span>
              <span className="text-[var(--text-muted)]">+</span>
              <span className="bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] px-4 py-3 rounded-2xl">ㄴ</span>
              <span className="text-[var(--text-muted)]">=</span>
              <button
                onClick={() => speakWord('한')}
                className="bg-gradient-to-br from-[var(--pink-primary)]/20 to-[var(--purple-soft)]/20 text-[var(--text-primary)] px-6 py-3 rounded-2xl text-3xl hover:scale-105 transition-transform"
              >
                한
                <Volume2 size={14} className="inline ml-2 text-[var(--text-muted)]" />
              </button>
            </div>
            <p className="text-xs text-center text-[var(--text-muted)]">
              {t('phoneticsWelcome.click_to_hear_hint', lang)}
            </p>
          </div>
        )}

        {/* Interactive demo (step 2) */}
        {current.interactive && <QuickComposeDemo />}

        {/* Content accuracy notice (step 2 only) */}
        {current.interactive && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-xs text-amber-700 leading-relaxed">
            📋 当前内容准确度待校正，预计本周完成，届时将同步更新。
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 justify-center">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl text-sm font-medium hover:bg-[var(--bg-accent)] transition-colors"
            >
              {t('phoneticsWelcome.prev_button', lang)}
            </button>
          )}
          {!isLast ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] text-white rounded-2xl text-sm font-bold hover:shadow-lg hover:shadow-[var(--pink-primary)]/25 transition-colors transition-opacity transition-shadow active:scale-95"
            >
              {t('phoneticsWelcome.next_button', lang)}
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setDismissed(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--pink-primary)] to-[var(--peach-soft)] text-white rounded-2xl text-sm font-bold hover:shadow-lg hover:shadow-[var(--pink-primary)]/25 transition-colors transition-opacity transition-shadow active:scale-95"
            >
              <Compass size={16} />
              {t('phoneticsWelcome.start_button', lang)}
            </button>
          )}
        </div>

        {/* Skip */}
        {!isLast && (
          <button
            onClick={() => setDismissed(true)}
            className="block mx-auto text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            {t('phoneticsWelcome.skip_button', lang)}
          </button>
        )}
      </div>
    </div>
  );
}

function QuickComposeDemo() {
  const { lang } = useLang();
  const [cho, setCho] = useState<string | null>(null);
  const [jung, setJung] = useState<string | null>(null);

  const CHO_SET = [
    { letter: 'ㄱ', rom: 'g' },
    { letter: 'ㄴ', rom: 'n' },
    { letter: 'ㅁ', rom: 'm' },
    { letter: 'ㅅ', rom: 's' },
    { letter: 'ㅇ', rom: t('phoneticsWelcome.consonant_none_label', lang) },
    { letter: 'ㅎ', rom: 'h' },
  ];

  const JUNG_SET = [
    { letter: 'ㅏ', rom: 'a' },
    { letter: 'ㅓ', rom: 'eo' },
    { letter: 'ㅗ', rom: 'o' },
    { letter: 'ㅜ', rom: 'u' },
    { letter: 'ㅡ', rom: 'eu' },
    { letter: 'ㅣ', rom: 'i' },
  ];

  const compose = (c: string, v: string): string => {
    const choMap: Record<string, number> = { 'ㄱ':0,'ㄴ':2,'ㅁ':6,'ㅅ':9,'ㅇ':11,'ㅎ':18 };
    const jungMap: Record<string, number> = { 'ㅏ':0,'ㅓ':4,'ㅗ':8,'ㅜ':13,'ㅡ':18,'ㅣ':20 };
    return String.fromCodePoint(0xAC00 + (choMap[c] ?? 11) * 588 + (jungMap[v] ?? 0) * 28);
  };

  const syllable = cho && jung ? compose(cho, jung) : null;

  return (
    <div className="space-y-4">
      <p className="text-xs text-center text-[var(--text-muted)]">{t('phoneticsWelcome.compose_hint', lang)}</p>

      {/* Selection */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="flex gap-2 flex-wrap justify-center">
          {CHO_SET.map((item) => (
            <button
              key={item.letter}
              onClick={() => setCho(item.letter)}
              className={`w-12 h-12 rounded-xl text-xl font-bold transition-all ${
                cho === item.letter
                  ? 'bg-[var(--pink-primary)] text-white shadow-lg shadow-[var(--pink-primary)]/30 scale-110'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)]/30'
              }`}
            >
              {item.letter}
            </button>
          ))}
        </div>
        <span className="text-[var(--text-muted)] text-lg">+</span>
        <div className="flex gap-2 flex-wrap justify-center">
          {JUNG_SET.map((item) => (
            <button
              key={item.letter}
              onClick={() => setJung(item.letter)}
              className={`w-12 h-12 rounded-xl text-xl font-bold transition-all ${
                jung === item.letter
                  ? 'bg-[var(--purple-soft)] text-white shadow-lg shadow-[var(--purple-soft)]/30 scale-110'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--purple-soft)]/30'
              }`}
            >
              {item.letter}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="text-center">
        {syllable ? (
          <div className="inline-flex items-center gap-3 bg-gradient-to-br from-[var(--pink-primary)]/10 to-[var(--purple-soft)]/10 border-2 border-[var(--pink-primary)]/20 rounded-3xl px-8 py-5 animate-fade-in">
            <span className="text-4xl font-extrabold text-[var(--text-primary)]">{syllable}</span>
            <button
              onClick={() => speakWord(syllable)}
              className="p-2 rounded-xl bg-[var(--pink-primary)]/10 hover:bg-[var(--pink-primary)]/20 text-[var(--pink-primary)] transition-colors"
            >
              <Volume2 size={22} />
            </button>
            <Sparkles size={20} className="text-[var(--peach-soft)]" />
          </div>
        ) : (
          <div className="text-sm text-[var(--text-muted)] py-6">
            {t('phoneticsWelcome.compose_idle_hint', lang)}
          </div>
        )}
      </div>
    </div>
  );
}

export function hasSeenWelcome(userId: string | undefined): boolean {
  if (!userId) return true; // 未登录不弹窗（其他流程会处理登录）
  try {
    return localStorage.getItem(welcomeKey(userId)) === '1';
  } catch {
    return true;
  }
}
