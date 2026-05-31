'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';

interface DiaryData {
  nickname: string;
  level: number;
  xp: number;
  streak: number;
  longestStreak: number;
  createdAt: number;
  isAmbassador: boolean;
  totalWords: number;
  masteredWords: number;
  reviewCount: number;
  studyDays: number;
  chatCount: number;
  booksCount: number;
  topWords: { word: string; weight: number }[];
}

function getToriMessage(days: number): string {
  if (days < 7) return '刚开始学习的每一天都是闪亮的！托里会一直陪着你 🌱';
  if (days < 30) return '你已经坚持了一段时间了，托里为你感到骄傲！继续加油 💪';
  if (days < 100) return '学习成为了一种习惯，托里最喜欢和你一起学习的时光 ✨';
  return '百天的坚持，你已经是托里心中最棒的学习伙伴了！未来还要一起走 🌟';
}

export function DiaryClient({ data }: { data: DiaryData }) {
  const startDate = new Date(data.createdAt).toLocaleDateString('zh-CN');
  const maxWeight = Math.max(...data.topWords.map((w) => w.weight), 1);

  return (
    <div className="min-h-screen bg-[var(--bg-soft)]">
      <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-5xl animate-bounce">🐰</div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">韩语学习日记</h1>
          {data.isAmbassador && (
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] text-sm font-medium">
              <Star size={14} className="fill-current" /> 深度学习者
            </div>
          )}
        </div>

        {/* User info */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">{data.nickname}</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            {startDate} 加入 · 已学习 {data.studyDays} 天
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '学习单词', value: data.totalWords, icon: '📚' },
            { label: '掌握单词', value: data.masteredWords, icon: '✅' },
            { label: 'SRS复习', value: data.reviewCount, icon: '🔄' },
            { label: '绘本阅读', value: data.booksCount, icon: '📖' },
            { label: 'AI对话', value: data.chatCount, icon: '💬' },
            { label: '最长连签', value: `${data.longestStreak}天`, icon: '🔥' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[var(--bg-card)]/80 border border-[var(--border-color)] rounded-2xl p-4 text-center"
            >
              <span className="text-2xl">{s.icon}</span>
              <div className="text-lg font-bold text-[var(--text-primary)] mt-1">{s.value}</div>
              <div className="text-xs text-[var(--text-secondary)]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Word cloud */}
        {data.topWords.length > 0 && (
          <div className="bg-[var(--bg-card)]/80 border border-[var(--pink-pale)] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4 text-center">
              最常复习的词汇
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {data.topWords.map((w) => {
                const ratio = w.weight / maxWeight;
                const size = 0.75 + ratio * 1.25; // 0.75rem - 2rem
                const opacity = 0.4 + ratio * 0.6;
                const colors = ['var(--pink-primary)', 'var(--purple-soft)', 'var(--mint-soft)', '#FFB8C6', '#B8C6E8'];
                const color = colors[Math.floor(ratio * (colors.length - 1))];
                return (
                  <span
                    key={w.word}
                    style={{
                      fontSize: `${size}rem`,
                      color,
                      opacity,
                      fontWeight: ratio > 0.7 ? 700 : 400,
                    }}
                  >
                    {w.word}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Tori's message */}
        <div className="bg-[var(--bg-card)]/80 border border-[var(--border-color)] rounded-2xl p-6 text-center space-y-3">
          <span className="text-4xl">🐰</span>
          <p className="text-sm text-[var(--text-primary)] leading-relaxed">
            {getToriMessage(data.studyDays)}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">想和托里一起学韩语吗？</p>
          <Link
            href="/auth/register"
            className="inline-block px-8 py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-medium hover:brightness-90 transition-colors shadow-lg shadow-[var(--pink-primary)]/20"
          >
            我也要开始学韩语
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[var(--text-placeholder)] pb-8">
          韩语学习日记 · 和托里一起成长
        </p>
      </div>
    </div>
  );
}
