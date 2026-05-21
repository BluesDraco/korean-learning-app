'use client';

import { useEffect, useState } from 'react';
import { BarChart3, BookOpen, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { db } from '@/lib/db';
import type { Word, ReviewSession, MasteryLevel } from '@/types';

interface Stats {
  totalWords: number;
  masteredWords: number;
  totalReviews: number;
  totalDictations: number;
  todayReviews: number;
  weekReviews: { date: string; count: number }[];
  masteryDistribution: { name: string; value: number }[];
  srsBins: { level: string; count: number }[];
}

const COLORS = ['#64748b', '#eab308', '#3b82f6', '#10b981'];

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const words: Word[] = await db.words.toArray();
      const sessions: ReviewSession[] = await db.reviewSessions.orderBy('date').reverse().toArray();
      const dictationRecords = await db.dictationRecords.toArray();

      const now = Date.now();
      const todayStart = new Date().setHours(0, 0, 0, 0);
      const weekStart = todayStart - 6 * 86400000;

      const totalWords = words.length;
      const masteredWords = words.filter((w) => w.mastery === 'mastered').length;
      const totalReviews = sessions.reduce((s, r) => s + r.wordsReviewed, 0);
      const totalDictations = dictationRecords.length;
      const todayReviews = sessions.filter((s) => s.date >= todayStart).reduce((s, r) => s + r.wordsReviewed, 0);

      // Weekly review counts
      const weekReviews: { date: string; count: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const dayStart = weekStart + d * 86400000;
        const dayEnd = dayStart + 86400000;
        const count = sessions.filter((s) => s.date >= dayStart && s.date < dayEnd).reduce((s, r) => s + r.wordsReviewed, 0);
        const date = new Date(dayStart);
        weekReviews.push({
          date: `${date.getMonth() + 1}/${date.getDate()}`,
          count,
        });
      }

      // Mastery distribution
      const masteryCount: Record<MasteryLevel, number> = { new: 0, learning: 0, reviewing: 0, mastered: 0 };
      words.forEach((w) => { masteryCount[w.mastery]++; });
      const masteryDistribution = [
        { name: '新词', value: masteryCount.new },
        { name: '学习中', value: masteryCount.learning },
        { name: '复习中', value: masteryCount.reviewing },
        { name: '已掌握', value: masteryCount.mastered },
      ];

      // SRS level bins
      const levelBins = [
        { level: 'L0', min: 0, max: 0 },
        { level: 'L1-2', min: 1, max: 2 },
        { level: 'L3-4', min: 3, max: 4 },
        { level: 'L5-6', min: 5, max: 6 },
        { level: 'L7+', min: 7, max: Infinity },
      ];
      const srsBins = levelBins.map(({ level, min, max }) => ({
        level,
        count: words.filter((w) => w.srsLevel >= min && w.srsLevel <= max).length,
      }));

      setStats({ totalWords, masteredWords, totalReviews, totalDictations, todayReviews, weekReviews, masteryDistribution, srsBins });
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-slate-400" />
      </div>
    );
  }

  if (!stats) return null;

  const summaryCards = [
    { label: '总单词', value: stats.totalWords, icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: '已掌握', value: stats.masteredWords, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: '复习次数', value: stats.totalReviews, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: '今日复习', value: stats.todayReviews, icon: BarChart3, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">学习统计</h1>
        <p className="text-slate-400 text-sm mt-1">追踪你的学习进度</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {summaryCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-4`}>
            <Icon size={18} className={color} />
            <div className={`text-2xl font-bold mt-2 ${color}`}>{value}</div>
            <div className="text-slate-400 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Weekly Review Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-medium text-white mb-4">本周复习</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={stats.weekReviews}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Two-column charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mastery Pie */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-medium text-white mb-4">掌握分布</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={stats.masteryDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                {stats.masteryDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {stats.masteryDistribution.map((item, i) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs text-slate-400">
                <div className="w-3 h-3 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                {item.name} ({item.value})
              </div>
            ))}
          </div>
        </div>

        {/* SRS Level Bars */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-medium text-white mb-4">SRS 等级分布</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.srsBins} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <YAxis dataKey="level" type="category" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
