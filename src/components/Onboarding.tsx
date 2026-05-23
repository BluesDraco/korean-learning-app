'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Target, Flame, BookOpen, Mic, Pencil } from 'lucide-react';
import { getProfile, updateProfile } from '@/lib/gamification';
import type { UserProfile } from '@/types';

const steps = [
  {
    title: '欢迎来到 한국어',
    description: '你的个性化韩语学习助手',
    emoji: '🇰🇷',
    content: '通过 YouTube 视频学韩语、智能背单词、影子跟读练口语，一切都围绕你的学习节奏。',
  },
  {
    title: '设定你的水平',
    description: '让我们为你定制学习内容',
    emoji: '📊',
    content: 'level',
  },
  {
    title: '每日目标',
    description: '设定每天的学习目标',
    emoji: '🎯',
    content: 'goals',
  },
  {
    title: '准备好开始了吗？',
    description: '每天进步一点点',
    emoji: '🚀',
    content: '课程结构一览：',
    features: [
      { icon: BookOpen, label: '知识库', desc: '分类单词 + 例句', color: 'text-[var(--pink-primary)]' },
      { icon: Target, label: '每日学习', desc: '结构化课程', color: 'text-[var(--purple-soft)]' },
      { icon: Flame, label: '间隔复习', desc: '科学记忆曲线', color: 'text-[var(--peach-soft)]' },
      { icon: Pencil, label: '听写练习', desc: '听力强化', color: 'text-[var(--purple-soft)]' },
      { icon: Mic, label: '影子跟读', desc: '口语训练', color: 'text-[var(--mint-soft)]' },
    ],
  },
];

interface Props {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<UserProfile['targetLevel']>('beginner');
  const [wordGoal, setWordGoal] = useState(10);
  const [minGoal, setMinGoal] = useState(15);
  const [nickname, setNickname] = useState('');

  const handleNext = async () => {
    if (step === 1) {
      // Save level
      const p = await getProfile();
      await updateProfile({ targetLevel: level });
    }
    if (step === 2) {
      // Save goals
      await updateProfile({ dailyGoalWords: wordGoal, dailyGoalMinutes: minGoal });
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      await updateProfile({ onboardingComplete: true, nickname: nickname || '学习者' });
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--bg-base)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-[var(--pink-primary)]' : i < step ? 'w-4 bg-[var(--pink-primary)]/50' : 'w-4 bg-[var(--bg-soft)]'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-3xl p-8 text-center animate-slide-up shadow-lg">
          <div className="text-5xl mb-6">{steps[step].emoji}</div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{steps[step].title}</h2>
          <p className="text-[var(--text-secondary)] text-sm mb-6">{steps[step].description}</p>

          {step === 0 && (
            <p className="text-[var(--text-primary)] text-sm leading-relaxed">{steps[step].content}</p>
          )}

          {step === 1 && (
            <div className="space-y-3">
              {([
                { value: 'beginner' as const, label: '初级', desc: 'TOPIK 1-2 · 刚开始学韩语', emoji: '🌱' },
                { value: 'intermediate' as const, label: '中级', desc: 'TOPIK 3-4 · 有一定基础', emoji: '🌿' },
                { value: 'advanced' as const, label: '高级', desc: 'TOPIK 5-6 · 进阶提升', emoji: '🌳' },
              ]).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setLevel(opt.value)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                    level === opt.value
                      ? 'bg-[var(--pink-primary)]/10 border-[var(--pink-primary)]/50'
                      : 'bg-[var(--bg-soft)] border-[var(--border-default)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <div>
                    <div className="text-[var(--text-primary)] font-medium text-sm">{opt.label}</div>
                    <div className="text-[var(--text-secondary)] text-xs">{opt.desc}</div>
                  </div>
                  {level === opt.value && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-[var(--pink-primary)] flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-2 block text-left">每日学习单词</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={wordGoal}
                    onChange={(e) => setWordGoal(Number(e.target.value))}
                    className="flex-1 accent-[var(--pink-primary)]"
                  />
                  <span className="text-[var(--text-primary)] font-bold text-lg w-10">{wordGoal}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-2 block text-left">每日学习时间（分钟）</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={minGoal}
                    onChange={(e) => setMinGoal(Number(e.target.value))}
                    className="flex-1 accent-[var(--pink-primary)]"
                  />
                  <span className="text-[var(--text-primary)] font-bold text-lg w-10">{minGoal}</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-[var(--text-primary)] text-sm">{steps[step].content}</p>
              <div className="space-y-2">
                {steps[step].features?.map((f) => (
                  <div key={f.label} className="flex items-center gap-3 bg-[var(--bg-soft)] rounded-xl p-3 text-left">
                    <f.icon size={18} className={f.color} />
                    <div>
                      <div className="text-sm text-[var(--text-primary)] font-medium">{f.label}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <label className="text-xs text-[var(--text-secondary)] mb-2 block text-left">你的昵称</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="学习者"
                  maxLength={12}
                  className="w-full bg-[var(--bg-soft)] border border-[var(--border-default)] rounded-xl py-3 px-4 text-[var(--text-primary)] text-center placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          {step > 0 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              上一步
            </button>
          ) : <div />}
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-[var(--pink-primary)] hover:brightness-90 text-white rounded-xl transition-colors text-sm font-medium"
          >
            {step === steps.length - 1 ? '开始学习' : '下一步'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
