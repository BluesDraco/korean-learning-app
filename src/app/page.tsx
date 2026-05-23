'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  BookOpen, Film, Mic, Pencil, BarChart3, ArrowRight, Plus, Loader2,
  Flame, Star, TrendingUp, Target, Zap, Trophy, GraduationCap, Sparkles, Lightbulb,
} from 'lucide-react';
import { db } from '@/lib/db';
import { getProfile, getTodayLog, getWeekStreak, updateStreak } from '@/lib/gamification';
import Onboarding from '@/components/Onboarding';
import type { Word, UserProfile, DailyLog } from '@/types';

interface DashboardStats {
  dueCount: number;
  learningCount: number;
  masteredCount: number;
  todayNew: number;
}

export default function Home() {
  const [stats, setStats] = useState<DashboardStats>({ dueCount: 0, learningCount: 0, masteredCount: 0, todayNew: 0 });
  const [recentWords, setRecentWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [todayLog, setTodayLog] = useState<DailyLog | null>(null);
  const [weekStreak, setWeekStreak] = useState<ReturnType<typeof getWeekStreak> extends Promise<infer T> ? T : never>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [bunnyClicks, setBunnyClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleBunnyClick = () => {
    const next = bunnyClicks + 1;
    setBunnyClicks(next);
    if (next >= 10 && !showEasterEgg) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
    }
  };

  const load = useCallback(async () => {
    const now = Date.now();
    const todayStart = new Date().setHours(0, 0, 0, 0);

    const [allWords, profileData, tLog, wStreak] = await Promise.all([
      db.words.toArray(),
      getProfile(),
      getTodayLog(),
      getWeekStreak(),
    ]);

    const dueCount = allWords.filter((w) => w.nextReview <= now).length;
    const learningCount = allWords.filter((w) => w.mastery === 'learning' || w.mastery === 'reviewing').length;
    const masteredCount = allWords.filter((w) => w.mastery === 'mastered').length;
    const todayNew = allWords.filter((w) => w.createdAt >= todayStart).length;

    setStats({ dueCount, learningCount, masteredCount, todayNew });

    const recent = await db.words.orderBy('createdAt').reverse().limit(5).toArray();
    setRecentWords(recent);
    setProfile(profileData);
    setTodayLog(tLog);
    setWeekStreak(wStreak);
    setShowOnboarding(!profileData.onboardingComplete);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    load();
  };

  const todayGreeting = new Date().getHours() < 12 ? '좋은 아침이에요' : new Date().getHours() < 18 ? '좋은 오후예요' : '좋은 저녁이에요';

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  const goalWordsMet = profile ? todayLog && todayLog.wordsLearned >= profile.dailyGoalWords : false;
  const xpPercent = profile ? Math.round((profile.xp / profile.xpToNextLevel) * 100) : 0;

  return (
    <div className="py-4 space-y-4">
      {/* Cute decoration bar with easter egg bunny */}
      <div className="flex items-center gap-2 text-xs text-[var(--text-placeholder)] mb-1 relative">
        <span
          className="animate-float cursor-pointer select-none hover:scale-125 transition-transform"
          onClick={handleBunnyClick}
          title="点我!"
        >🐰</span>
        <span className="animate-float">🎀</span>
        <span className="animate-float">🌸</span>
        <span className="text-[13px] ml-1">韩语学习手帐</span>
        {/* Sparkle decorations */}
        <span className="sparkle absolute -top-1 left-16" style={{ fontSize: '10px', animationDelay: '0s' }}>✨</span>
        <span className="sparkle absolute top-3 right-4" style={{ fontSize: '8px', animationDelay: '0.7s' }}>✧</span>
        {showEasterEgg && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-[var(--bg-card)] border-2 border-[var(--pink-primary)] rounded-2xl px-4 py-2 shadow-lg animate-bounce-achievement z-50 whitespace-nowrap">
            <span className="text-sm font-bold text-[var(--pink-primary)]">🎉 토리가 나타났다! 你发现了隐藏彩蛋!</span>
          </div>
        )}
      </div>
      {/* Welcome Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">
            {profile ? `안녕하세요, ${profile.nickname}` : '开始学习'}
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">{todayGreeting}</p>
        </div>
        {profile && (
          <Link
            href="/settings"
            className="shrink-0 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] rounded-xl px-4 py-2 text-center transition-colors"
          >
            <div className="text-[var(--pink-primary)] font-bold text-lg">{profile.level}</div>
            <div className="text-[13px] text-[var(--text-secondary)]">等级</div>
          </Link>
        )}
      </div>

      {/* XP Progress Bar */}
      {profile && (
        <div className="card-sticker p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-[var(--peach-soft)]" />
              <span className="text-xs text-[var(--text-secondary)]">
                {xpPercent}% 到等级 {profile.level + 1}
              </span>
            </div>
            <span className="text-xs text-[var(--text-muted)]">{profile.xp}/{profile.xpToNextLevel} XP</span>
          </div>
          <div className="w-full bg-[var(--bg-input)] rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] transition-all duration-700"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Streak Calendar */}
      {profile && (
        <div className="card-washi p-4" style={{ '--washi-color': 'var(--peach-soft)' } as React.CSSProperties}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame size={18} className={profile.streak > 0 ? 'text-[var(--peach-soft)]' : 'text-[var(--text-muted)]'} />
              <span className="text-sm font-medium text-[var(--text-primary)]">
                连续 {profile.streak} 天
              </span>
              {profile.streak >= 7 && <span className="text-xs text-[var(--peach-soft)] font-medium">🔥</span>}
            </div>
            <span className="text-xs text-[var(--text-muted)]">最长 {profile.longestStreak} 天</span>
          </div>
          <div className="flex gap-2 justify-between">
            {weekStreak.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[13px] text-[var(--text-muted)]">{day.dayLabel}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    day.studied
                      ? 'bg-gradient-to-br from-[var(--peach-soft)] to-[var(--pink-primary)] text-[var(--text-primary)] shadow-lg shadow-[var(--peach-soft)]/20'
                      : day.isToday
                        ? 'bg-[var(--bg-input)] border-2 border-[var(--pink-primary)]/50 text-[var(--text-secondary)]'
                        : 'bg-[var(--bg-input)] text-[var(--text-placeholder)]'
                  }`}
                >
                  {day.studied ? <Star size={12} className="fill-[var(--color-danger-bg)]" /> : day.date.split('/')[1]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Target */}
      {profile && (
        <div className="grid grid-cols-2 gap-3">
          <div className={`card-standard p-4 ${goalWordsMet ? 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/30' : ''}`} style={{ '--card-rotate': '-1deg' } as React.CSSProperties}>
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className={goalWordsMet ? 'text-[var(--mint-soft)]' : 'text-[var(--text-secondary)]'} />
              <span className="text-xs text-[var(--text-secondary)]">今日单词</span>
              {goalWordsMet && <Sparkles size={14} className="text-[var(--mint-soft)]" />}
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-bold ${goalWordsMet ? 'text-[var(--mint-soft)]' : 'text-[var(--text-primary)]'}`}>
                {todayLog?.wordsLearned || 0}
              </span>
              <span className="text-sm text-[var(--text-muted)]">/ {profile.dailyGoalWords}</span>
            </div>
          </div>
          <div className="card-standard p-4" style={{ '--card-rotate': '1deg' } as React.CSSProperties}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-[var(--text-secondary)]" />
              <span className="text-xs text-[var(--text-secondary)]">今日 XP</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[var(--peach-soft)]">{todayLog?.xpEarned || 0}</span>
              <span className="text-sm text-[var(--text-muted)]">XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Smart Study Plan Suggestion */}
      {profile && (
        <div className="card-dashed bg-gradient-to-r from-[var(--purple-soft)]/10 to-[var(--pink-primary)]/10 border-[var(--purple-soft)]/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={18} className="text-[var(--peach-soft)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">今日学习建议</span>
          </div>
          <div className="space-y-3">
            {(() => {
              const suggestions: { text: string; action: string; href: string; color: string }[] = [];

              if (stats.dueCount > 0) {
                suggestions.push({
                  text: `你有 ${stats.dueCount} 个单词等待复习，及时复习能巩固记忆`,
                  action: '去复习',
                  href: '/review',
                  color: 'var(--peach-soft)',
                });
              }

              const wordsLeft = profile.dailyGoalWords - (todayLog?.wordsLearned || 0);
              if (wordsLeft > 0) {
                suggestions.push({
                  text: `今日还需学习 ${wordsLeft} 个单词才能完成目标（${todayLog?.wordsLearned || 0}/${profile.dailyGoalWords}）`,
                  action: '去学习',
                  href: '/learn',
                  color: 'var(--purple-soft)',
                });
              }

              if (todayLog && todayLog.shadowingDone === 0 && stats.learningCount > 5) {
                suggestions.push({
                  text: '今天还没练口语，试试影子跟读提升发音吧',
                  action: '去跟读',
                  href: '/shadowing',
                  color: 'var(--mint-soft)',
                });
              }

              if (suggestions.length === 0) {
                suggestions.push({
                  text: '今天表现很棒！继续保持，挑战下一个单元吧',
                  action: '去学习',
                  href: '/learn',
                  color: 'var(--purple-soft)',
                });
              }

              return suggestions.slice(0, 2).map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="flex items-center justify-between bg-[var(--bg-card)] rounded-xl px-4 py-3 border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-colors group"
                >
                  <span className="text-sm text-[var(--text-secondary)]">{s.text}</span>
                  <span className="shrink-0 flex items-center gap-1 text-xs font-medium ml-3 group-hover:translate-x-0.5 transition-transform" style={{ color: s.color }}>
                    {s.action}
                    <ArrowRight size={14} />
                  </span>
                </Link>
              ));
            })()}
          </div>
        </div>
      )}

      {/* Action Grid */}
      <div>
        <h2 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-3">快捷操作</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Daily Learning - primary CTA */}
          <Link
            href="/learn"
            className="col-span-2 flex items-center gap-4 card-washi bg-gradient-to-r from-[var(--purple-soft)]/10 to-[var(--pink-primary)]/10 border-[var(--purple-soft)]/30 rounded-2xl p-5 hover:from-[var(--purple-soft)]/20 hover:to-[var(--pink-primary)]/20 transition-all group"
            style={{ '--washi-color': 'var(--purple-soft)' } as React.CSSProperties}
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--purple-soft)]/20 flex items-center justify-center">
              <GraduationCap size={24} className="text-[var(--purple-soft)]" />
            </div>
            <div className="flex-1">
              <div className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--purple-soft)] transition-colors">每日学习</div>
              <div className="text-xs text-[var(--text-secondary)]">结构化课程 · 单词 + 语法</div>
            </div>
            <ArrowRight size={20} className="text-[var(--purple-soft)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {stats.dueCount > 0 ? (
            <Link
              href="/review"
              className="flex items-center gap-3 bg-[var(--peach-soft)]/15 border border-[var(--peach-soft)]/20 rounded-2xl p-4 hover:bg-[var(--peach-soft)]/20 transition-colors"
            >
              <BookOpen size={20} className="text-[var(--peach-soft)]" />
              <div>
                <div className="text-sm font-medium text-[var(--text-primary)]">复习卡片</div>
                <div className="text-xs text-[var(--peach-soft)]">{stats.dueCount} 个待复习</div>
              </div>
              <ArrowRight size={16} className="text-[var(--peach-soft)] ml-auto" />
            </Link>
          ) : (
            <Link
              href="/videos"
              className="flex items-center gap-3 bg-[var(--pink-primary)]/10 border border-[var(--pink-primary)]/20 rounded-2xl p-4 hover:bg-[var(--pink-primary)]/15 transition-colors"
            >
              <Film size={20} className="text-[var(--pink-primary)]" />
              <div>
                <div className="text-sm font-medium text-[var(--text-primary)]">导入视频</div>
                <div className="text-xs text-[var(--text-secondary)]">YouTube 学韩语</div>
              </div>
              <Plus size={16} className="text-[var(--pink-primary)] ml-auto" />
            </Link>
          )}

          <Link
            href="/dictation"
            className="flex items-center gap-3 bg-[var(--purple-soft)]/15 border border-[var(--purple-soft)]/20 rounded-2xl p-4 hover:bg-[var(--pink-primary)]/20 transition-colors"
          >
            <Pencil size={20} className="text-[var(--purple-soft)]" />
            <div>
              <div className="text-sm font-medium text-[var(--text-primary)]">听写练习</div>
              <div className="text-xs text-[var(--text-secondary)]">听力训练</div>
            </div>
            <ArrowRight size={16} className="text-[var(--purple-soft)] ml-auto" />
          </Link>

          <Link
            href="/shadowing"
            className="flex items-center gap-3 bg-[var(--mint-soft)]/15 border border-[var(--mint-soft)]/20 rounded-2xl p-4 hover:bg-[var(--mint-soft)]/20 transition-colors"
          >
            <Mic size={20} className="text-[var(--mint-soft)]" />
            <div>
              <div className="text-sm font-medium text-[var(--text-primary)]">影子跟读</div>
              <div className="text-xs text-[var(--text-secondary)]">口语训练</div>
            </div>
            <ArrowRight size={16} className="text-[var(--mint-soft)] ml-auto" />
          </Link>

          <Link
            href="/stats"
            className="flex items-center gap-3 bg-[var(--blue-soft)]/15 border border-[var(--blue-soft)]/20 rounded-2xl p-4 hover:bg-[var(--mint-soft)]/20 transition-colors"
          >
            <BarChart3 size={20} className="text-[var(--blue-soft)]" />
            <div>
              <div className="text-sm font-medium text-[var(--text-primary)]">学习统计</div>
              <div className="text-xs text-[var(--text-secondary)]">查看进度</div>
            </div>
            <ArrowRight size={16} className="text-[var(--blue-soft)] ml-auto" />
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: '待复习', value: stats.dueCount, color: 'text-[var(--peach-soft)]' },
          { label: '学习中', value: stats.learningCount, color: 'text-[var(--peach-soft)]' },
          { label: '已掌握', value: stats.masteredCount, color: 'text-[var(--mint-soft)]' },
          { label: '今日新增', value: stats.todayNew, color: 'text-[var(--pink-primary)]' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card-standard rounded-xl p-3 text-center" style={{ '--card-rotate': `${(Math.random() * 2 - 1).toFixed(1)}deg` } as React.CSSProperties}>
            <div className={`text-xl font-bold ${color}`}>{value}</div>
            <div className="text-[13px] text-[var(--text-muted)] mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent Words */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">最近添加的单词</h2>
          <Link href="/vocabulary" className="text-xs text-[var(--pink-primary)] hover:text-[var(--pink-primary)]">
            查看全部 →
          </Link>
        </div>
        {recentWords.length === 0 ? (
          <div className="text-center py-8 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
            <BookOpen size={32} className="text-[var(--text-placeholder)] mx-auto mb-2" />
            <p className="text-[var(--text-muted)] text-sm">还没有单词，去导入视频或开始每日学习吧</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentWords.map((word) => {
              const masteryColors = { new: 'bg-[var(--pink-pale)]', learning: 'bg-[var(--peach-soft)]/80', reviewing: 'bg-[var(--pink-primary)]/80', mastered: 'bg-[var(--mint-soft)]/80' };
              const masteryLabels = { new: '新词', learning: '学习中', reviewing: '复习中', mastered: '已掌握' };
              return (
                <div
                  key={word.id}
                  className="flex items-center justify-between bg-[var(--bg-card)] rounded-xl px-4 py-3 border border-[var(--border-color)] hover:border-[var(--pink-pale)] transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--text-primary)] font-medium text-sm">{word.word}</span>
                      <span className="text-[var(--pink-primary)]/70 text-xs bg-[var(--pink-primary)]/10 px-1.5 py-0.5 rounded">{word.pronunciation}</span>
                    </div>
                    <div className="text-[var(--text-secondary)] text-xs truncate mt-0.5">{word.meaning}</div>
                  </div>
                  <span className={`text-[13px] px-2 py-0.5 rounded-full text-[var(--text-primary)]/80 shrink-0 ml-3 ${masteryColors[word.mastery]}`}>
                    {masteryLabels[word.mastery]}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
