'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Lightbulb, Search, Sparkles, ArrowRight, Mail, Check, Bot, Globe, Clock } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: '句子拆解',
    description: '输入韩语句子，自动拆解每个单词和语法结构，附带发音和释义参考',
    href: '/ai/analyze',
    color: 'var(--purple-soft)',
    status: '可用',
    statusColor: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]',
  },
  {
    icon: MessageSquare,
    title: '情景对话',
    description: '8个生活场景的沉浸式对话练习（便利店、餐厅、问路、咖啡厅等）',
    href: '/ai/chat',
    color: 'var(--pink-primary)',
    status: '可用',
    statusColor: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]',
  },
  {
    icon: Lightbulb,
    title: '智能学习方案',
    description: '根据你当前的词汇掌握情况和学习进度，生成个性化学习路径',
    href: '/ai/plan',
    color: 'var(--peach-soft)',
    status: '可用',
    statusColor: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]',
  },
];

const upcomingFeatures = [
  {
    icon: Bot,
    title: 'AI 实时对话',
    description: '接入大语言模型，用韩语与 AI 自由对话，实时纠正语法和发音错误',
    eta: '规划中',
  },
  {
    icon: Globe,
    title: '动态内容生成',
    description: '根据你的兴趣和水平，AI 自动生成新的绘本故事和练习题',
    eta: '规划中',
  },
  {
    icon: Lightbulb,
    title: '智能错题分析',
    description: 'AI 分析你的错题模式，找出薄弱点并针对性出题强化',
    eta: '规划中',
  },
];

export default function AiPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Store in localStorage for now — real backend later
      const existing = JSON.parse(localStorage.getItem('ai-waitlist') || '[]');
      existing.push({ email: email.trim(), date: Date.now() });
      localStorage.setItem('ai-waitlist', JSON.stringify(existing));
      setSubmitted(true);
    }
  };

  return (
    <div className="py-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-3">
          <span className="text-5xl">🤖</span>
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">AI 学习助手</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-md mx-auto">
          目前使用本地智能分析，未来将接入大语言模型，提供更智能的韩语学习体验
        </p>
      </div>

      {/* Current features */}
      <div>
        <h2 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-3">当前功能</h2>
        <div className="space-y-3">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="flex items-start gap-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 hover:border-[var(--border-hover)] hover:shadow-lg transition-all group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${f.color}20` }}
              >
                <f.icon size={20} style={{ color: f.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{f.title}</h3>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${f.statusColor}`}>
                    {f.status}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{f.description}</p>
              </div>
              <ArrowRight size={18} className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </div>

      {/* Coming soon */}
      <div>
        <h2 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-2">
          <Sparkles size={14} className="text-[var(--peach-soft)]" />
          即将上线（需接入 AI 模型）
        </h2>
        <div className="space-y-3">
          {upcomingFeatures.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-4 bg-[var(--bg-card)]/60 border border-dashed border-[var(--border-color)] rounded-2xl p-5 opacity-70"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-input)] flex items-center justify-center shrink-0">
                <f.icon size={20} className="text-[var(--text-placeholder)]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-[var(--text-secondary)]">{f.title}</h3>
                  <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">
                    <Clock size={10} className="inline mr-0.5" />
                    {f.eta}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email signup */}
      <div className="bg-gradient-to-r from-[var(--purple-soft)]/15 to-[var(--pink-primary)]/10 border border-[var(--purple-soft)]/20 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-3">📮</div>
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
          {submitted ? '感谢订阅！' : 'AI 功能上线时通知我'}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] mb-4">
          {submitted
            ? 'AI 新功能上线后你会第一时间收到通知'
            : '留下邮箱，AI 增强功能上线时第一时间通知你'}
        </p>
        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-[var(--mint-soft)]">
            <Check size={18} />
            <span className="text-sm font-medium">已记录</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
            <div className="flex-1 relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-placeholder)]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-9 pr-3 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--pink-primary)]"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/90 text-[var(--text-primary)] rounded-xl text-sm font-medium transition-colors"
            >
              订阅
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
