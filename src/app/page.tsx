'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Film, Mic, Pencil, BarChart3, ArrowRight, Plus } from 'lucide-react';
import { db } from '@/lib/db';
import type { Word, MasteryLevel } from '@/types';

interface DashboardStats {
  dueCount: number;
  learningCount: number;
  masteredCount: number;
  todayNew: number;
}

const masteryLabel: Record<MasteryLevel, string> = {
  new: '新词',
  learning: '学习中',
  reviewing: '复习中',
  mastered: '已掌握',
};

const masteryColor: Record<MasteryLevel, string> = {
  new: 'bg-slate-600',
  learning: 'bg-yellow-500/80',
  reviewing: 'bg-blue-500/80',
  mastered: 'bg-emerald-500/80',
};

export default function Home() {
  const [stats, setStats] = useState<DashboardStats>({ dueCount: 0, learningCount: 0, masteredCount: 0, todayNew: 0 });
  const [recentWords, setRecentWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const now = Date.now();
      const todayStart = new Date().setHours(0, 0, 0, 0);

      const allWords = await db.words.toArray();
      const dueCount = allWords.filter((w) => w.nextReview <= now).length;
      const learningCount = allWords.filter((w) => w.mastery === 'learning' || w.mastery === 'reviewing').length;
      const masteredCount = allWords.filter((w) => w.mastery === 'mastered').length;
      const todayNew = allWords.filter((w) => w.createdAt >= todayStart).length;

      setStats({ dueCount, learningCount, masteredCount, todayNew });

      const recent = await db.words.orderBy('createdAt').reverse().limit(5).toArray();
      setRecentWords(recent);
      setLoading(false);
    };
    load();
  }, []);

  const statCards = [
    { label: '待复习', value: stats.dueCount, href: '/review', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: '学习中', value: stats.learningCount, href: '/vocabulary', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: '已掌握', value: stats.masteredCount, href: '/vocabulary?filter=mastered', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: '今日新增', value: stats.todayNew, href: '/vocabulary', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ];

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">开始学习</h1>
        <p className="text-slate-400 text-sm mt-1">坚持每天进步一点点</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statCards.map(({ label, value, href, color, bg }) => (
          <Link key={label} href={href} className={`${bg} rounded-xl p-4 hover:scale-[1.02] transition-transform`}>
            <div className={`text-2xl font-bold ${color}`}>{loading ? '-' : value}</div>
            <div className="text-slate-400 text-xs mt-1">{label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">快捷操作</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.dueCount > 0 ? (
            <Link
              href="/review"
              className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 hover:bg-orange-500/20 transition-colors"
            >
              <BookOpen size={20} className="text-orange-400" />
              <div>
                <div className="text-sm font-medium text-white">开始复习</div>
                <div className="text-xs text-slate-400">{stats.dueCount} 个待复习</div>
              </div>
              <ArrowRight size={16} className="text-orange-400 ml-auto" />
            </Link>
          ) : (
            <Link
              href="/videos"
              className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 hover:bg-blue-500/20 transition-colors"
            >
              <Film size={20} className="text-blue-400" />
              <div>
                <div className="text-sm font-medium text-white">导入视频</div>
                <div className="text-xs text-slate-400">开始学习新内容</div>
              </div>
              <Plus size={16} className="text-blue-400 ml-auto" />
            </Link>
          )}
          <Link
            href="/dictation"
            className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 hover:bg-purple-500/20 transition-colors"
          >
            <Pencil size={20} className="text-purple-400" />
            <div>
              <div className="text-sm font-medium text-white">听写练习</div>
              <div className="text-xs text-slate-400">听力训练</div>
            </div>
            <ArrowRight size={16} className="text-purple-400 ml-auto" />
          </Link>
          <Link
            href="/shadowing"
            className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 hover:bg-emerald-500/20 transition-colors"
          >
            <Mic size={20} className="text-emerald-400" />
            <div>
              <div className="text-sm font-medium text-white">影子跟读</div>
              <div className="text-xs text-slate-400">口语训练</div>
            </div>
            <ArrowRight size={16} className="text-emerald-400 ml-auto" />
          </Link>
          <Link
            href="/stats"
            className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 hover:bg-cyan-500/20 transition-colors"
          >
            <BarChart3 size={20} className="text-cyan-400" />
            <div>
              <div className="text-sm font-medium text-white">学习统计</div>
              <div className="text-xs text-slate-400">查看进度</div>
            </div>
            <ArrowRight size={16} className="text-cyan-400 ml-auto" />
          </Link>
        </div>
      </div>

      {/* Recent Words */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">最近添加的单词</h2>
          <Link href="/vocabulary" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
            查看全部
          </Link>
        </div>
        {recentWords.length === 0 ? (
          <div className="text-center py-8 bg-slate-900 rounded-xl border border-slate-800">
            <BookOpen size={32} className="text-slate-600 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">还没有单词，去导入一个视频开始学习吧</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentWords.map((word) => (
              <div
                key={word.id}
                className="flex items-center justify-between bg-slate-900 rounded-xl px-4 py-3 border border-slate-800"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{word.word}</span>
                    <span className="text-slate-500 text-xs">{word.pronunciation}</span>
                  </div>
                  <div className="text-slate-400 text-sm truncate">{word.meaning}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full text-white/80 shrink-0 ml-3 ${masteryColor[word.mastery]}`}>
                  {masteryLabel[word.mastery]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
