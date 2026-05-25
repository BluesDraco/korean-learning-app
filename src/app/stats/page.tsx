'use client';

import { useEffect, useState } from 'react';
import {
  BarChart3, BookOpen, TrendingUp, Loader2, Flame, Zap, Trophy,
  Award, Star, Target, Pencil, Brain, AlertTriangle, Activity,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  LineChart, Line, Area, AreaChart,
} from 'recharts';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { ACHIEVEMENT_DEFS } from '@/types';
import { memoryHealthScore, retentionDistribution, generateCurvePoints, wordStability, atRiskWords, type RetentionBucket } from '@/lib/forgetting-curve';
import type { Word, ReviewSession, Achievement, MasteryLevel, UserProfile } from '@/types';

interface Stats {
  totalWords: number;
  masteredWords: number;
  totalReviews: number;
  totalDictations: number;
  totalShadowings: number;
  todayReviews: number;
  weekReviews: { date: string; count: number }[];
  masteryDistribution: { name: string; value: number }[];
  srsBins: { level: string; count: number }[];
  totalXp: number;
  skills: { skill: string; score: number; fullMark: number }[];
  healthScore: number;
  retentionBuckets: RetentionBucket[];
  curvePoints: { day: number; retention: number }[];
  atRisk: Word[];
}

const COLORS = ['var(--text-muted)', 'var(--color-highlight)', 'var(--pink-primary)', 'var(--mint-soft)'];
const RADAR_COLORS = ['var(--pink-primary)', 'var(--purple-soft)', 'var(--mint-soft)', 'var(--peach-soft)', 'var(--peach-soft)', 'var(--blue-soft)'];

function totalXpForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += i * 100 + 50;
  }
  return total;
}

export default function StatsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [words, sessions, dictationRecords, shadowingRecords, achs, p] = await Promise.all([
        db.words.toArray(),
        db.reviewSessions.orderBy('date').reverse().toArray(),
        db.dictationRecords.toArray(),
        db.shadowingRecords.toArray(),
        db.achievements.toArray(),
        db.userProfiles.get('main'),
      ]);

      const now = Date.now();
      const todayStart = new Date().setHours(0, 0, 0, 0);
      const weekStart = todayStart - 6 * 86400000;

      const totalWords = words.length;
      const masteredWords = words.filter((w) => w.mastery === 'mastered').length;
      const totalReviews = sessions.reduce((s, r) => s + r.wordsReviewed, 0);
      const totalDictations = dictationRecords.length;
      const totalShadowings = shadowingRecords.length;
      const todayReviews = sessions.filter((s) => s.date >= todayStart).reduce((s, r) => s + r.wordsReviewed, 0);
      const totalXp = p ? totalXpForLevel(p.level) + p.xp : 0;

      // Weekly review counts
      const weekReviews: { date: string; count: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const dayStart = weekStart + d * 86400000;
        const dayEnd = dayStart + 86400000;
        const count = sessions.filter((s) => s.date >= dayStart && s.date < dayEnd).reduce((s, r) => s + r.wordsReviewed, 0);
        const date = new Date(dayStart);
        weekReviews.push({ date: `${date.getMonth() + 1}/${date.getDate()}`, count });
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

      // Skill scores for radar chart (scale 0-100)
      const vocabScore = Math.min(100, Math.round((totalWords / 300) * 100));
      const listeningScore = Math.min(100, Math.round((totalDictations / 100) * 100));
      const speakingScore = Math.min(100, Math.round((totalShadowings / 50) * 100));
      const reviewScore = Math.min(100, Math.round((masteredWords / Math.max(1, totalWords)) * 100));
      const grammarScore = Math.min(100, Math.round((masteredWords / Math.max(1, totalWords)) * 80));
      const dailyScore = p ? Math.min(100, p.streak * 5) : 0;
      const skills = [
        { skill: '词汇量', score: vocabScore, fullMark: 100 },
        { skill: '听力', score: listeningScore, fullMark: 100 },
        { skill: '口语', score: speakingScore, fullMark: 100 },
        { skill: '掌握率', score: reviewScore, fullMark: 100 },
        { skill: '语法', score: grammarScore, fullMark: 100 },
        { skill: '坚持', score: dailyScore, fullMark: 100 },
      ];

      const healthScore = memoryHealthScore(words);
      const retentionBuckets = retentionDistribution(words);
      const avgStability = words.filter((w) => w.lastReviewed != null).length > 0
        ? words.filter((w) => w.lastReviewed != null).reduce((s, w) => s + wordStability(w), 0) / words.filter((w) => w.lastReviewed != null).length
        : 3;
      const curvePoints = generateCurvePoints(Math.max(avgStability, 1));
      const atRisk = atRiskWords(words);

      setStats({ totalWords, masteredWords, totalReviews, totalDictations, totalShadowings, todayReviews, weekReviews, masteryDistribution, srsBins, totalXp, skills, healthScore, retentionBuckets, curvePoints, atRisk });
      setAchievements(achs);
      setProfile(p || null);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!stats) return null;

  const earnedTypes = new Set<string>(achievements.map((a) => a.type));
  const achievementEntries = Object.entries(ACHIEVEMENT_DEFS) as [string, { title: string; description: string; icon: string }][];

  const xpPercent = profile
    ? Math.min(100, Math.round((profile.xp / profile.xpToNextLevel) * 100))
    : 0;

  return (
    <div className="py-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">学习统计</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">追踪你的学习进度与成就</p>
        </div>
        {profile && (
          <div className="shrink-0 bg-[var(--bg-input)] rounded-xl px-4 py-2 text-center">
            <div className="text-[var(--pink-primary)] font-bold text-lg">{profile.level}</div>
            <div className="text-[13px] text-[var(--text-secondary)]">等级</div>
          </div>
        )}
      </div>

      {/* Profile Summary */}
      {profile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Level & XP Card */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-[var(--peach-soft)]" />
                <span className="text-sm font-medium text-[var(--text-primary)]">等级进度</span>
              </div>
              <span className="text-xs text-[var(--text-muted)]">Lv.{profile.level}</span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-bold text-[var(--text-primary)]">{stats.totalXp.toLocaleString()}</span>
              <span className="text-sm text-[var(--text-muted)]">总 XP</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[var(--text-secondary)]">
                {xpPercent}% 到等级 {profile.level + 1}
              </span>
              <span className="text-xs text-[var(--text-muted)]">{profile.xp}/{profile.xpToNextLevel} XP</span>
            </div>
            <div className="w-full bg-[var(--bg-input)] rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] transition-all duration-700"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame size={18} className={profile.streak > 0 ? 'text-[var(--peach-soft)]' : 'text-[var(--text-muted)]'} />
                <span className="text-sm font-medium text-[var(--text-primary)]">学习连续</span>
              </div>
              {profile.streak >= 7 && <span className="text-xs text-[var(--peach-soft)] font-medium">火爆!</span>}
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`text-3xl font-bold ${profile.streak > 0 ? 'text-[var(--peach-soft)]' : 'text-[var(--text-secondary)]'}`}>
                {profile.streak}
              </span>
              <span className="text-sm text-[var(--text-muted)]">天</span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              最长连续 {profile.longestStreak} 天
            </p>
          </div>
        </div>
      )}

      {/* Summary Cards - Core Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: '总单词', value: stats.totalWords, icon: BookOpen, color: 'text-[var(--pink-primary)]', bg: 'bg-[var(--pink-primary)]/10' },
          { label: '已掌握', value: stats.masteredWords, icon: TrendingUp, color: 'text-[var(--mint-soft)]', bg: 'bg-[var(--mint-soft)]/15' },
          { label: '连续天数', value: profile?.streak ?? 0, icon: Flame, color: 'text-[var(--peach-soft)]', bg: 'bg-[var(--peach-soft)]/15' },
          { label: '总 XP', value: stats.totalXp.toLocaleString(), icon: Zap, color: 'text-[var(--peach-soft)]', bg: 'bg-yellow-500/10' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-4`}>
            <Icon size={18} className={color} />
            <div className={`text-2xl font-bold mt-2 ${color}`}>{value}</div>
            <div className="text-[var(--text-secondary)] text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: '总复习次数', value: stats.totalReviews, icon: BarChart3, color: 'text-[var(--purple-soft)]' },
          { label: '今日复习', value: stats.todayReviews, icon: Target, color: 'text-[var(--blue-soft)]', href: '/review' },
          { label: '听写练习', value: stats.totalDictations, icon: Pencil, color: 'text-[var(--purple-soft)]' },
          { label: '已获成就', value: achievements.length, icon: Trophy, color: 'text-[var(--peach-soft)]' },
        ].map(({ label, value, icon: Icon, color, href }) => {
          const card = (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 text-center">
              <Icon size={16} className={`${color} mx-auto mb-1`} />
              <div className={`text-xl font-bold ${color}`}>{value}</div>
              <div className="text-[13px] text-[var(--text-muted)] mt-0.5">{label}</div>
            </div>
          );
          if (href) {
            return (
              <button
                key={label}
                onClick={() => router.push(href)}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 text-center hover:border-[var(--pink-pale)] transition-colors w-full cursor-pointer"
              >
                <Icon size={16} className={`${color} mx-auto mb-1`} />
                <div className={`text-xl font-bold ${color}`}>{value}</div>
                <div className="text-[13px] text-[var(--text-muted)] mt-0.5">{label}</div>
              </button>
            );
          }
          return <div key={label}>{card}</div>;
        })}
      </div>

      {/* Weekly Review Chart */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
        <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4">本周复习</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={stats.weekReviews}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
            <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-primary)' }} />
            <Bar dataKey="count" fill="var(--pink-primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Two-column charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mastery Pie */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
          <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4">掌握分布</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={stats.masteryDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                {stats.masteryDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-primary)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {stats.masteryDistribution.map((item, i) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <div className="w-3 h-3 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                {item.name} ({item.value})
              </div>
            ))}
          </div>
        </div>

        {/* SRS Level Bars */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
          <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4">SRS 等级分布</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.srsBins} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
              <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <YAxis dataKey="level" type="category" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-primary)' }} />
              <Bar dataKey="count" fill="var(--purple-soft)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skills Radar Chart */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
        <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4">能力雷达图</h3>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={stats.skills} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="var(--border-color)" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
              axisLine={false}
            />
            <Radar
              name="能力值"
              dataKey="score"
              stroke="var(--pink-primary)"
              fill="var(--pink-primary)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {stats.skills.map((s) => (
            <div key={s.skill} className="text-center">
              <div className="text-lg font-bold text-[var(--text-primary)]">{s.score}</div>
              <div className="text-[13px] text-[var(--text-muted)]">{s.skill}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Memory Health & Forgetting Curve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Memory Health Score */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Brain size={18} className="text-[var(--purple-soft)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">记忆健康度</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 shrink-0">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="var(--bg-input)" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  stroke={stats.healthScore >= 70 ? 'var(--mint-soft)' : stats.healthScore >= 40 ? 'var(--peach-soft)' : 'var(--color-danger)'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(stats.healthScore / 100) * 213.6} 213.6`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-[var(--text-primary)]">{stats.healthScore}</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[var(--mint-soft)]" />
                <span className="text-xs text-[var(--text-secondary)]">90%+ 牢固记忆</span>
                <span className="text-xs font-medium text-[var(--text-primary)] ml-auto">{stats.retentionBuckets[0].count} 词</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[var(--blue-soft)]" />
                <span className="text-xs text-[var(--text-secondary)]">70-90% 正常范围</span>
                <span className="text-xs font-medium text-[var(--text-primary)] ml-auto">{stats.retentionBuckets[1].count} 词</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[var(--peach-soft)]" />
                <span className="text-xs text-[var(--text-secondary)]">40-70% 需要复习</span>
                <span className="text-xs font-medium text-[var(--text-primary)] ml-auto">{stats.retentionBuckets[2].count} 词</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[var(--color-danger)]" />
                <span className="text-xs text-[var(--text-secondary)]">&lt;40% 即将遗忘</span>
                <span className="text-xs font-medium text-[var(--text-primary)] ml-auto">{stats.retentionBuckets[3].count} 词</span>
              </div>
            </div>
          </div>
        </div>

        {/* Retention Distribution Bar */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={18} className="text-[var(--blue-soft)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">记忆保持分布</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={stats.retentionBuckets} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="label" type="category" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-primary)' }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {stats.retentionBuckets.map((b, i) => (
                  <Cell key={i} fill={b.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Forgetting Curve Chart */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-[var(--pink-primary)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">艾宾浩斯遗忘曲线</span>
          </div>
          <span className="text-xs text-[var(--text-muted)]">基于你的平均记忆稳定度</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={stats.curvePoints}>
            <defs>
              <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--pink-primary)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--pink-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
            <XAxis
              dataKey="day"
              label={{ value: '距上次复习（天）', position: 'insideBottom', offset: -5, fill: 'var(--text-muted)', fontSize: 11 }}
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              label={{ value: '记忆保持率 (%)', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 11 }}
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-primary)' }}
              formatter={(v: any) => [`${v}%`, '记忆保持率']}
            />
            <Area
              type="monotone"
              dataKey="retention"
              stroke="var(--pink-primary)"
              strokeWidth={2}
              fill="url(#retentionGradient)"
              dot={false}
              activeDot={{ r: 4, fill: 'var(--pink-primary)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-xs text-[var(--text-muted)] mt-2">
          曲线下方的面积越小、下降越快，说明需要更频繁复习。蓝色区域越大越好。
        </p>
      </div>

      {/* At-risk words */}
      {stats.atRisk.length > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--color-danger)]/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-[var(--color-danger)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">即将遗忘的词汇</span>
            <span className="text-xs text-[var(--text-muted)]">建议尽快复习</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.atRisk.map((w) => (
              <button
                key={w.id}
                onClick={() => router.push('/review')}
                className="px-3 py-2 rounded-xl bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/15 text-sm text-[var(--text-primary)] hover:bg-[var(--color-danger)]/10 transition-colors"
              >
                <span className="font-medium">{w.word}</span>
                <span className="text-[var(--text-muted)] ml-1.5 text-xs">{w.meaning}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Award size={18} className="text-[var(--peach-soft)]" />
          <h2 className="text-sm font-medium text-[var(--text-primary)] uppercase tracking-wider">成就徽章</h2>
          <span className="text-xs text-[var(--text-muted)] ml-1">
            {achievements.length}/{achievementEntries.length}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {achievementEntries.map(([type, def]) => {
            const earned = earnedTypes.has(type as string);
            const earnedData = achievements.find((a) => (a.type as string) === type);
            return (
              <div
                key={type}
                className={`rounded-xl p-3 text-center border transition-all ${
                  earned
                    ? 'bg-[var(--bg-card)] border-[var(--pink-pale)] hover:border-amber-500/50'
                    : 'bg-white/40 border-[var(--border-color)]/50 opacity-50'
                }`}
              >
                <div className={`text-2xl mb-1.5 ${earned ? '' : 'grayscale'}`}>
                  {def.icon}
                </div>
                <div className={`text-xs font-medium ${earned ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  {def.title}
                </div>
                <div className={`text-[13px] mt-0.5 line-clamp-2 ${earned ? 'text-[var(--text-secondary)]' : 'text-[var(--text-placeholder)]'}`}>
                  {def.description}
                </div>
                {earned && earnedData ? (
                  <div className="flex items-center justify-center gap-1 mt-1.5 text-[13px] text-[var(--peach-soft)]/70">
                    <Star size={10} className="fill-amber-400/70" />
                    {new Date(earnedData.earnedAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                  </div>
                ) : (
                  <div className="mt-1.5">
                    <span className="inline-block text-[13px] text-[var(--text-placeholder)] w-5 h-5 rounded-full border border-[var(--pink-pale)] leading-5">
                      ?
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
