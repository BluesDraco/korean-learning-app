'use client'

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  BarChart3, BookOpen, Bookmark, TrendingUp, Loader2, Flame, Zap,
  Target, Brain, AlertTriangle, Activity, ArrowLeft,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { db } from '@/lib/db';
import { memoryHealthScore, retentionDistribution, generateCurvePoints, wordStability, atRiskWords, type RetentionBucket } from '@/lib/forgetting-curve';
import type { Word, MasteryLevel, UserProfile } from '@/types';

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
  totalRead: number;
  totalSavedItems: number;
}

// 图表用 dynamic({ ssr:false }) 懒加载，把 recharts(含 d3) 移出 /stats 首屏 bundle。
const chartLoading = () => <div style={{ height: 200 }} className="flex items-center justify-center"><Loader2 size={20} className="animate-spin text-[var(--text-muted)]" /></div>;
const WeekReviewChart = dynamic(() => import('./StatsCharts').then((m) => m.WeekReviewChart), { ssr: false, loading: chartLoading });
const MasteryPieChart = dynamic(() => import('./StatsCharts').then((m) => m.MasteryPieChart), { ssr: false, loading: chartLoading });
const SrsBinsChart = dynamic(() => import('./StatsCharts').then((m) => m.SrsBinsChart), { ssr: false, loading: chartLoading });
const SkillsRadarChart = dynamic(() => import('./StatsCharts').then((m) => m.SkillsRadarChart), { ssr: false, loading: chartLoading });
const RetentionBucketsChart = dynamic(() => import('./StatsCharts').then((m) => m.RetentionBucketsChart), { ssr: false, loading: chartLoading });
const ForgettingCurveChart = dynamic(() => import('./StatsCharts').then((m) => m.ForgettingCurveChart), { ssr: false, loading: chartLoading });

function totalXpForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += i * 100 + 50;
  }
  return total;
}

export default function StatsPage() {
  const router = useRouter();
  const smartBack = useSmartBack('/mine');
  const { lang } = useLang();
  const [stats, setStats] = useState<Stats | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
      const [words, sessions, dictationRecords, p, articleProgress] = await Promise.all([
        db.words.orderBy('id').limit(3000).toArray(),
        db.reviewSessions.orderBy('date').reverse().limit(1000).toArray(),
        db.dictationRecords.orderBy('id').limit(1000).toArray(),
        db.userProfiles.get('main'),
        db.userArticleProgress.orderBy('id').limit(1000).toArray(),
      ]);

      const todayStart = new Date().setHours(0, 0, 0, 0);
      const weekStart = todayStart - 6 * 86400000;

      const totalWords = words.length;
      const masteredWords = words.filter((w) => w.mastery === 'mastered').length;
      const totalReviews = sessions.reduce((s, r) => s + r.wordsReviewed, 0);
      const totalDictations = dictationRecords.length;
      const totalShadowings = 0;
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
        { name: 'stats.mastery_new', value: masteryCount.new },
        { name: 'stats.mastery_learning', value: masteryCount.learning },
        { name: 'stats.mastery_reviewing', value: masteryCount.reviewing },
        { name: 'stats.mastery_mastered', value: masteryCount.mastered },
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
        { skill: 'stats.skill_vocab', score: vocabScore, fullMark: 100 },
        { skill: 'stats.skill_listening', score: listeningScore, fullMark: 100 },
        { skill: 'stats.skill_speaking', score: speakingScore, fullMark: 100 },
        { skill: 'stats.skill_mastery', score: reviewScore, fullMark: 100 },
        { skill: 'stats.skill_grammar', score: grammarScore, fullMark: 100 },
        { skill: 'stats.skill_persistence', score: dailyScore, fullMark: 100 },
      ];

      const healthScore = memoryHealthScore(words);
      const retentionBuckets = retentionDistribution(words);
      const avgStability = words.filter((w) => w.lastReviewed != null).length > 0
        ? words.filter((w) => w.lastReviewed != null).reduce((s, w) => s + wordStability(w), 0) / words.filter((w) => w.lastReviewed != null).length
        : 3;
      const curvePoints = generateCurvePoints(Math.max(avgStability, 1));
      const atRisk = atRiskWords(words);

      // Reading stats
      const totalRead = articleProgress.filter((ap) => ap.status === 'completed').length;
      const totalSavedItems = articleProgress.reduce((sum, ap) => sum + ap.savedSentenceIds.length + ap.savedWordIds.length, 0);

      if (cancelled) return;
      setStats({ totalWords, masteredWords, totalReviews, totalDictations, totalShadowings, todayReviews, weekReviews, masteryDistribution, srsBins, totalXp, skills, healthScore, retentionBuckets, curvePoints, atRisk, totalRead, totalSavedItems });
      setProfile(p || null);
      if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!stats) return null;

  const xpPercent = profile
    ? Math.min(100, Math.round((profile.xp / Math.max(1, profile.xpToNextLevel)) * 100))
    : 0;

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto md:max-w-none">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button onClick={smartBack} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors bg-transparent border-none p-0 cursor-pointer"><ArrowLeft size={20} /></button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t('stats.title', lang)}</h1>
            <p className="text-[var(--text-secondary)] text-sm mt-1">{t('stats.subtitle', lang)}</p>
          </div>
        </div>
        {profile && (
          <div className="shrink-0 bg-[var(--bg-input)] rounded-xl px-4 py-2 text-center">
            <div className="text-[var(--pink-primary)] font-bold text-lg">{profile.level}</div>
            <div className="text-[13px] text-[var(--text-secondary)]">{t('stats.level_badge', lang)}</div>
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
                <span className="text-sm font-medium text-[var(--text-primary)]">{t('stats.level_progress', lang)}</span>
              </div>
              <span className="text-xs text-[var(--text-muted)]">Lv.{profile.level}</span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-bold text-[var(--text-primary)]">{stats.totalXp.toLocaleString()}</span>
              <span className="text-sm text-[var(--text-muted)]">{t('stats.total_xp', lang)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[var(--text-secondary)]">
                {t('stats.xp_to_next', lang, { pct: xpPercent, next: profile.level + 1 })}
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
                <span className="text-sm font-medium text-[var(--text-primary)]">{t('stats.streak_title', lang)}</span>
              </div>
              {profile.streak >= 7 && <span className="text-xs text-[var(--peach-soft)] font-medium">{t('stats.streak_hot', lang)}</span>}
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`text-3xl font-bold ${profile.streak > 0 ? 'text-[var(--peach-soft)]' : 'text-[var(--text-secondary)]'}`}>
                {profile.streak}
              </span>
              <span className="text-sm text-[var(--text-muted)]">{t('common.days', lang)}</span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              {t('stats.longest_streak', lang, { n: profile.longestStreak })}
            </p>
          </div>
        </div>
      )}

      {/* Summary Cards - Core Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'stats.card_total_words', value: stats.totalWords, icon: BookOpen, color: 'text-[var(--pink-primary)]', bg: 'bg-[var(--pink-primary)]/10' },
          { label: 'stats.card_mastered', value: stats.masteredWords, icon: TrendingUp, color: 'text-[var(--mint-soft)]', bg: 'bg-[var(--mint-soft)]/15' },
          { label: 'stats.card_streak', value: profile?.streak ?? 0, icon: Flame, color: 'text-[var(--peach-soft)]', bg: 'bg-[var(--peach-soft)]/15' },
          { label: 'stats.card_xp', value: stats.totalXp.toLocaleString(), icon: Zap, color: 'text-[var(--peach-soft)]', bg: 'bg-yellow-500/10' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-4`}>
            <Icon size={18} className={color} />
            <div className={`text-2xl font-bold mt-2 ${color}`}>{value}</div>
            <div className="text-[var(--text-secondary)] text-xs mt-1">{t(label, lang)}</div>
          </div>
        ))}
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'stats.card_total_reviews', value: stats.totalReviews, icon: BarChart3, color: 'text-[var(--purple-soft)]' },
          { label: 'stats.card_today_reviews', value: stats.todayReviews, icon: Target, color: 'text-[var(--blue-soft)]', href: '/review' },
          { label: 'stats.card_read', value: stats.totalRead, icon: BookOpen, color: 'text-[var(--mint-soft)]', href: '/reading' },
          { label: 'stats.card_saved', value: stats.totalSavedItems, icon: Bookmark, color: 'text-[var(--purple-soft)]' },
        ].map(({ label, value, icon: Icon, color, href }) => {
          const card = (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 text-center">
              <Icon size={16} className={`${color} mx-auto mb-1`} />
              <div className={`text-xl font-bold ${color}`}>{value}</div>
              <div className="text-[13px] text-[var(--text-muted)] mt-0.5">{t(label, lang)}</div>
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
                <div className="text-[13px] text-[var(--text-muted)] mt-0.5">{t(label, lang)}</div>
              </button>
            );
          }
          return <div key={label}>{card}</div>;
        })}
      </div>

      {/* Weekly Review Chart */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
        <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4">{t('stats.chart_week', lang)}</h3>
        <WeekReviewChart data={stats.weekReviews} />
      </div>

      {/* Two-column charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mastery Pie */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
          <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4">{t('stats.chart_mastery', lang)}</h3>
          <MasteryPieChart data={stats.masteryDistribution} />
        </div>

        {/* SRS Level Bars */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
          <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4">{t('stats.chart_srs', lang)}</h3>
          <SrsBinsChart data={stats.srsBins} />
        </div>
      </div>

      {/* Skills Radar Chart */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
        <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4">{t('stats.chart_radar', lang)}</h3>
        <SkillsRadarChart data={stats.skills} />
        <div className="grid grid-cols-3 gap-2 mt-3">
          {stats.skills.map((s) => (
            <div key={s.skill} className="text-center">
              <div className="text-lg font-bold text-[var(--text-primary)]">{s.score}</div>
              <div className="text-[13px] text-[var(--text-muted)]">{t(s.skill, lang)}</div>
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
            <span className="text-sm font-medium text-[var(--text-primary)]">{t('stats.chart_health', lang)}</span>
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
                <span className="text-xs text-[var(--text-secondary)]">{t('stats.health_90', lang)}</span>
                <span className="text-xs font-medium text-[var(--text-primary)] ml-auto">{t('stats.health_words', lang, { n: stats.retentionBuckets[0].count })}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[var(--blue-soft)]" />
                <span className="text-xs text-[var(--text-secondary)]">{t('stats.health_70', lang)}</span>
                <span className="text-xs font-medium text-[var(--text-primary)] ml-auto">{t('stats.health_words', lang, { n: stats.retentionBuckets[1].count })}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[var(--peach-soft)]" />
                <span className="text-xs text-[var(--text-secondary)]">{t('stats.health_40', lang)}</span>
                <span className="text-xs font-medium text-[var(--text-primary)] ml-auto">{t('stats.health_words', lang, { n: stats.retentionBuckets[2].count })}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[var(--color-danger)]" />
                <span className="text-xs text-[var(--text-secondary)]">{t('stats.health_low', lang)}</span>
                <span className="text-xs font-medium text-[var(--text-primary)] ml-auto">{t('stats.health_words', lang, { n: stats.retentionBuckets[3].count })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Retention Distribution Bar */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={18} className="text-[var(--blue-soft)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">{t('stats.chart_retention', lang)}</span>
          </div>
          <RetentionBucketsChart data={stats.retentionBuckets} />
        </div>
      </div>

      {/* Forgetting Curve Chart */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-[var(--pink-primary)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">{t('stats.chart_curve', lang)}</span>
          </div>
          <span className="text-xs text-[var(--text-muted)]">{t('stats.curve_note', lang)}</span>
        </div>
        <ForgettingCurveChart data={stats.curvePoints} />
        <p className="text-xs text-[var(--text-muted)] mt-2">
          {t('stats.curve_hint', lang)}
        </p>
      </div>

      {/* At-risk words */}
      {stats.atRisk.length > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--color-danger)]/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-[var(--color-danger)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">{t('stats.atrisk_title', lang)}</span>
            <span className="text-xs text-[var(--text-muted)]">{t('stats.atrisk_note', lang)}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.atRisk.map((w) => (
              <button
                key={w.id}
                onClick={() => router.push(`/review?wordIds=${encodeURIComponent(stats.atRisk.map((a) => a.id).join(','))}`)}
                className="px-3 py-2 rounded-xl bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/15 text-sm text-[var(--text-primary)] hover:bg-[var(--color-danger)]/10 transition-colors"
              >
                <span className="font-medium">{w.word}</span>
                <span className="text-[var(--text-muted)] ml-1.5 text-xs">{w.meaning}</span>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
