'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, X, Volume2, Sparkles, Compass } from 'lucide-react';
import { speak, speakWord } from '@/lib/tts';

const WELCOME_KEY = 'phonetics-welcome-seen';

const STEPS = [
  {
    emoji: '👋',
    title: '韩语40音，其实很简单',
    subtitle: '韩文是世界上唯一一个被指定为 UNESCO 世界记录遗产的文字 — 因为它太科学了',
    highlights: [
      '21 个元音 + 19 个辅音 = 40 个字母',
      '每个字母的发音几乎完全固定，没有英语那样的不规则',
      '15 分钟就能看懂所有韩文',
    ],
  },
  {
    emoji: '🧩',
    title: '韩文的秘密：像积木一样拼',
    subtitle: '每个"韩文字"其实是一个方块，由 2-3 个字母拼成',
    visual: true,
    highlights: [
      '初声（开头的辅音）+ 中声（元音）= 一个音节',
      '有终声（收音）时再加一个辅音在底部',
      '가 = ㄱ + ㅏ，한 = ㅎ + ㅏ + ㄴ',
    ],
  },
  {
    emoji: '🎯',
    title: '你来试试',
    subtitle: '点一下这些字母，拼出你的第一个韩文',
    interactive: true,
  },
];

export default function PhoneticsWelcome({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) {
      localStorage.setItem(WELCOME_KEY, '1');
      onDone();
    }
  }, [dismissed, onDone]);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#fff7fa]/90 backdrop-blur-md">
      {/* White card */}
      <div className="relative w-full max-w-[380px] max-h-[calc(100dvh-48px)] overflow-y-auto rounded-[32px] bg-white border border-pink-100 shadow-[0_18px_48px_rgba(120,70,90,0.16)] p-6 space-y-6">
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
                onClick={() => speakWord('가', 0.7)}
                className="bg-gradient-to-br from-[var(--pink-primary)]/20 to-[var(--purple-soft)]/20 text-[var(--text-primary)] px-6 py-3 rounded-2xl text-3xl hover:scale-105 transition-transform"
              >
                加
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
                onClick={() => speakWord('한', 0.7)}
                className="bg-gradient-to-br from-[var(--pink-primary)]/20 to-[var(--purple-soft)]/20 text-[var(--text-primary)] px-6 py-3 rounded-2xl text-3xl hover:scale-105 transition-transform"
              >
                한
                <Volume2 size={14} className="inline ml-2 text-[var(--text-muted)]" />
              </button>
            </div>
            <p className="text-xs text-center text-[var(--text-muted)]">
              点击韩文听发音 ↑
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
              上一步
            </button>
          )}
          {!isLast ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] text-white rounded-2xl text-sm font-bold hover:shadow-lg hover:shadow-[var(--pink-primary)]/25 transition-all active:scale-95"
            >
              继续
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setDismissed(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--pink-primary)] to-[var(--peach-soft)] text-white rounded-2xl text-sm font-bold hover:shadow-lg hover:shadow-[var(--pink-primary)]/25 transition-all active:scale-95"
            >
              <Compass size={16} />
              开始学习
            </button>
          )}
        </div>

        {/* Skip */}
        {!isLast && (
          <button
            onClick={() => setDismissed(true)}
            className="block mx-auto text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            跳过介绍，直接开始
          </button>
        )}
      </div>
    </div>
  );
}

function QuickComposeDemo() {
  const [cho, setCho] = useState<string | null>(null);
  const [jung, setJung] = useState<string | null>(null);

  const CHO_SET = [
    { letter: 'ㄱ', rom: 'g' },
    { letter: 'ㄴ', rom: 'n' },
    { letter: 'ㅁ', rom: 'm' },
    { letter: 'ㅅ', rom: 's' },
    { letter: 'ㅇ', rom: '(无)' },
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
      <p className="text-xs text-center text-[var(--text-muted)]">选一个辅音 + 一个元音，拼出你的第一个韩文</p>

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
              onClick={() => speakWord(syllable, 0.7)}
              className="p-2 rounded-xl bg-[var(--pink-primary)]/10 hover:bg-[var(--pink-primary)]/20 text-[var(--pink-primary)] transition-colors"
            >
              <Volume2 size={22} />
            </button>
            <Sparkles size={20} className="text-[var(--peach-soft)]" />
          </div>
        ) : (
          <div className="text-sm text-[var(--text-muted)] py-6">
            ↑ 上面选一个辅音和一个元音试试
          </div>
        )}
      </div>
    </div>
  );
}

export function hasSeenWelcome(): boolean {
  try {
    return localStorage.getItem(WELCOME_KEY) === '1';
  } catch {
    return true;
  }
}
