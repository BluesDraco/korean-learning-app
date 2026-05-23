'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Loader2, Target, Zap, Flame, Star, TrendingUp, AlertCircle,
  ArrowRight, BookOpen, Headphones, Mic, PenTool, Coffee,
  Sparkles, Trophy, Clock, BarChart3,
} from 'lucide-react';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/gamification';
import type { UserProfile, Word, MasteryLevel } from '@/types';

interface WordStats {
  total: number;
  mastered: number;
  learning: number;
  reviewing: number;
  new: number;
  weakWords: Word[];
  dueWords: Word[];
  categoryStrength: Record<string, { total: number; mastered: number }>;
}

const levelLabels: Record<string, { label: string; color: string; bg: string; description: string }> = {
  beginner: { label: '初级', color: 'text-[var(--mint-soft)]', bg: 'bg-[var(--mint-soft)]/10', description: '正在建立韩语基础' },
  intermediate: { label: '中级', color: 'text-[var(--peach-soft)]', bg: 'bg-[var(--peach-soft)]/10', description: '持续提升韩语能力' },
  advanced: { label: '高级', color: 'text-[var(--purple-soft)]', bg: 'bg-[var(--purple-soft)]/10', description: '深入掌握韩语知识' },
};

export default function AIStudyPlanPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wordStats, setWordStats] = useState<WordStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      // Load profile
      const p = await getProfile();
      setProfile(p);

      // Load words
      const words = await db.words.toArray();
      const masteredWords = words.filter((w) => w.mastery === 'mastered');
      const learningWords = words.filter((w) => w.mastery === 'learning');
      const reviewingWords = words.filter((w) => w.mastery === 'reviewing');
      const newWords = words.filter((w) => w.mastery === 'new');
      const now = Date.now();

      // Due words for SRS review
      const dueWords = words.filter(
        (w) => w.nextReview <= now && w.mastery !== 'new'
      );

      // Weak words: learning/reviewing with low easeFactor
      const weakWords = words
        .filter((w) => w.mastery === 'learning' || w.mastery === 'reviewing')
        .sort((a, b) => a.easeFactor - b.easeFactor);

      // Category strength by partOfSpeech
      const categoryStrength: Record<string, { total: number; mastered: number }> = {};
      for (const w of words) {
        const cat = w.partOfSpeech || '未分类';
        if (!categoryStrength[cat]) {
          categoryStrength[cat] = { total: 0, mastered: 0 };
        }
        categoryStrength[cat].total++;
        if (w.mastery === 'mastered') {
          categoryStrength[cat].mastered++;
        }
      }

      setWordStats({
        total: words.length,
        mastered: masteredWords.length,
        learning: learningWords.length,
        reviewing: reviewingWords.length,
        new: newWords.length,
        weakWords: weakWords.slice(0, 5),
        dueWords,
        categoryStrength,
      });
    } catch (err) {
      console.error('Failed to load study plan data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  // Empty state: no profile
  if (!profile || !profile.onboardingComplete) {
    return (
      <div className="py-12 max-w-2xl mx-auto">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--pink-primary)]/15 to-[var(--purple-soft)]/15 flex items-center justify-center mx-auto border border-[var(--pink-pale)]">
            <Target size={40} className="text-[var(--pink-primary)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">AI 学习方案</h1>
            <p className="text-[var(--text-secondary)] mt-2 max-w-sm mx-auto">
              还没有完成个人资料设置。请先完成初始设置，以便为您生成个性化的学习方案。
            </p>
          </div>
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] hover:from-[var(--purple-soft)] hover:to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-all text-sm font-medium shadow-lg shadow-[var(--purple-soft)]/15 active:scale-95"
          >
            完成设置
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const levelInfo = levelLabels[profile.targetLevel] || levelLabels.beginner;
  const totalWords = wordStats?.total || 0;
  const masteredRate = totalWords > 0 ? Math.round(((wordStats?.mastered || 0) / totalWords) * 100) : 0;

  return (
    <div className="py-6 max-w-2xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles size={22} className="text-[var(--purple-soft)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">AI 学习方案</h1>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          基于你的学习数据，为您定制专属学习路径
        </p>
      </div>

      {/* User summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Level badge */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center">
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${levelInfo.bg} mx-auto mb-2`}>
            <Trophy size={18} className={levelInfo.color} />
          </div>
          <p className={`text-sm font-bold ${levelInfo.color}`}>{levelInfo.label}</p>
          <p className="text-[13px] text-[var(--text-muted)] mt-0.5">学习等级</p>
        </div>

        {/* XP */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--peach-soft)]/10 mx-auto mb-2">
            <Zap size={18} className="text-[var(--peach-soft)]" />
          </div>
          <p className="text-sm font-bold text-[var(--text-primary)]">{profile.xp} XP</p>
          <p className="text-[13px] text-[var(--text-muted)] mt-0.5">经验值</p>
        </div>

        {/* Streak */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-danger)]/10 mx-auto mb-2">
            <Flame size={18} className="text-[var(--color-danger)]" />
          </div>
          <p className="text-sm font-bold text-[var(--text-primary)]">{profile.streak} 天</p>
          <p className="text-[13px] text-[var(--text-muted)] mt-0.5">连续学习</p>
        </div>
      </div>

      {/* Word progress bar */}
      {totalWords > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-[var(--pink-primary)]" />
              <span className="text-sm font-medium text-[var(--text-primary)]">词汇掌握度</span>
            </div>
            <span className="text-xs text-[var(--text-muted)]">
              {wordStats?.mastered || 0}/{totalWords} ({masteredRate}%)
            </span>
          </div>
          <div className="w-full bg-[var(--bg-input)] rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[var(--mint-soft)] to-[var(--pink-primary)] h-2 rounded-full transition-all"
              style={{ width: `${masteredRate}%` }}
            />
          </div>
          <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--mint-soft)]" /> 已掌握 {wordStats?.mastered || 0}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--peach-soft)]" /> 学习中 {wordStats?.learning || 0}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--purple-soft)]" /> 待复习 {(wordStats?.reviewing || 0) + (wordStats?.new || 0)}
            </span>
          </div>
        </div>
      )}

      {/* Due review alert */}
      {wordStats && wordStats.dueWords.length > 0 && (
        <div className="bg-[var(--peach-soft)]/5 border border-[var(--peach-soft)]/15 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle size={18} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-[var(--text-primary)]">有待复习的单词</p>
            <p className="text-xs text-[var(--text-secondary)]">
              你有 <span className="text-[var(--peach-soft)] font-bold">{wordStats.dueWords.length}</span> 个单词到了复习时间，建议优先完成复习。
            </p>
          </div>
        </div>
      )}

      {/* Today's Recommended Path */}
      <div>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <Target size={18} className="text-[var(--pink-primary)]" />
          今日推荐路径
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-0">
          {/* Step 1: Review due words */}
          <div className="flex gap-4 pb-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--pink-primary)] text-white flex items-center justify-center text-sm font-bold shadow-md shadow-[var(--pink-primary)]/20">
              1
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-[var(--pink-primary)]" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">复习到期单词</h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                基于 SRS 间隔重复算法，复习记忆最薄弱的单词。当前{wordStats?.dueWords.length ? `有 ${wordStats.dueWords.length} 个` : '暂无'}到期单词。
              </p>
              {wordStats && wordStats.dueWords.length > 0 && (
                <Link
                  href="/review"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--pink-primary)] hover:text-[var(--pink-primary)] font-medium"
                >
                  开始复习 <ArrowRight size={12} />
                </Link>
              )}
            </div>
          </div>

          {/* Vertical connector */}
          <div className="ml-[17px] w-px h-3 bg-[var(--pink-pale)]" />

          {/* Step 2: Daily lesson */}
          <div className="flex gap-4 py-4 border-t border-[var(--border-color)]">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--purple-soft)] text-white flex items-center justify-center text-sm font-bold shadow-md shadow-[var(--purple-soft)]/20">
              2
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <BookOpen size={15} className="text-[var(--purple-soft)]" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">每日课程</h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                完成今日精选课程，学习新单词和语法知识。课程内容根据{levelInfo.label}水平定制。
              </p>
              <Link
                href="/learn"
                className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--purple-soft)] hover:text-[var(--purple-soft)] font-medium"
              >
                开始学习 <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Step 3: Focus practice */}
          <div className="flex gap-4 py-4 border-t border-[var(--border-color)]">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--mint-soft)] text-white flex items-center justify-center text-sm font-bold shadow-md shadow-[var(--mint-soft)]/20">
              3
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Headphones size={15} className="text-[var(--mint-soft)]" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">专项练习</h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                {profile.targetLevel === 'beginner'
                  ? '针对较弱项进行听写练习，巩固基础词汇的听辨能力。'
                  : profile.targetLevel === 'intermediate'
                  ? '通过写作练习强化语法运用和表达准确性。'
                  : '进行高级听力训练，提升快速理解自然语速韩语的能力。'}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <Link
                  href="/dictation"
                  className="inline-flex items-center gap-1 text-xs text-[var(--mint-soft)] hover:text-[#60B5AC] font-medium"
                >
                  听写练习 <ArrowRight size={12} />
                </Link>
                <Link
                  href="/writing"
                  className="inline-flex items-center gap-1 text-xs text-[var(--mint-soft)] hover:text-[#60B5AC] font-medium"
                >
                  写作练习 <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Step 4: Shadowing */}
          <div className="flex gap-4 py-4 border-t border-[var(--border-color)]">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--peach-soft)] text-white flex items-center justify-center text-sm font-bold shadow-md shadow-[var(--peach-soft)]/20">
              4
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Mic size={15} className="text-[var(--peach-soft)]" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">影子跟读</h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                跟随视频或音频进行影子跟读练习，同步提高口语流利度和发音准确性。选择你喜欢的韩语视频开始吧。
              </p>
              <Link
                href="/shadowing"
                className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--peach-soft)] hover:text-[#FFA040] font-medium"
              >
                开始跟读 <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Step 5: Free study */}
          <div className="flex gap-4 pt-4 border-t border-[var(--border-color)]">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-danger)] text-white flex items-center justify-center text-sm font-bold shadow-md shadow-[var(--color-danger)]/20">
              5
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Coffee size={15} className="text-[var(--color-danger)]" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">自由学习</h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                浏览视频库、词汇表或语法库，自由选择感兴趣的内容进行学习。保持好奇心是最好的学习动力。
              </p>
              <div className="flex items-center gap-3 mt-2">
                <Link
                  href="/videos"
                  className="inline-flex items-center gap-1 text-xs text-[var(--color-danger)] hover:text-[#EF5350] font-medium"
                >
                  视频 <ArrowRight size={12} />
                </Link>
                <Link
                  href="/vocabulary"
                  className="inline-flex items-center gap-1 text-xs text-[var(--color-danger)] hover:text-[#EF5350] font-medium"
                >
                  词汇 <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weak Point Analysis */}
      {wordStats && (
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-[var(--color-danger)]" />
            薄弱项分析
          </h2>
          <div className="space-y-4">
            {/* Weak words */}
            {wordStats.weakWords.length > 0 && (
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <AlertCircle size={15} className="text-[var(--color-danger)]" />
                  需要加强的单词
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  以下单词的记忆强度最低，建议多加复习：
                </p>
                <div className="space-y-1.5">
                  {wordStats.weakWords.map((w) => (
                    <div
                      key={w.id}
                      className="flex items-center justify-between px-3 py-2 bg-[var(--bg-input)] rounded-xl"
                    >
                      <div>
                        <span className="text-sm font-medium text-[var(--text-primary)]">{w.word}</span>
                        <span className="text-xs text-[var(--text-secondary)] ml-2">{w.meaning}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-[var(--text-muted)]">
                          强度: {(w.easeFactor * 100).toFixed(0)}%
                        </span>
                        <span
                          className={`text-[13px] px-1.5 py-0.5 rounded-full ${
                            w.mastery === 'learning'
                              ? 'bg-[var(--peach-soft)]/10 text-[var(--peach-soft)]'
                              : 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]'
                          }`}
                        >
                          {w.mastery === 'learning' ? '学习中' : '复习中'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {wordStats.dueWords.length > 0 && (
                  <Link
                    href="/review"
                    className="inline-flex items-center gap-1 text-xs text-[var(--pink-primary)] hover:text-[var(--pink-primary)] font-medium"
                  >
                    去复习这些单词 <ArrowRight size={12} />
                  </Link>
                )}
              </div>
            )}

            {/* Category strength */}
            {Object.keys(wordStats.categoryStrength).length > 0 && (
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Star size={15} className="text-[var(--peach-soft)]" />
                  词类掌握情况
                </h3>
                <div className="space-y-2">
                  {Object.entries(wordStats.categoryStrength)
                    .sort((a, b) => {
                      const rateA = a[1].total > 0 ? a[1].mastered / a[1].total : 0;
                      const rateB = b[1].total > 0 ? b[1].mastered / b[1].total : 0;
                      return rateA - rateB;
                    })
                    .map(([cat, data]) => {
                      const rate = data.total > 0 ? Math.round((data.mastered / data.total) * 100) : 0;
                      return (
                        <div key={cat} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[var(--text-primary)]">{cat}</span>
                            <span className="text-xs text-[var(--text-secondary)]">
                              {data.mastered}/{data.total} ({rate}%)
                            </span>
                          </div>
                          <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all ${
                                rate >= 80
                                  ? 'bg-[var(--mint-soft)]'
                                  : rate >= 50
                                  ? 'bg-[var(--peach-soft)]'
                                  : 'bg-[var(--color-danger)]'
                              }`}
                              style={{ width: `${Math.max(rate, 5)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
                {Object.entries(wordStats.categoryStrength).some(
                  ([_, d]) => d.total > 0 && d.mastered / d.total < 0.5
                ) && (
                  <p className="text-xs text-[var(--color-danger)] mt-2">
                    提示：黄色和红色标识的词类需要更多练习。建议在学习时优先关注这些类型的词汇。
                  </p>
                )}
              </div>
            )}

            {/* No data fallback */}
            {wordStats.weakWords.length === 0 && Object.keys(wordStats.categoryStrength).length === 0 && (
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-center">
                <Sparkles size={28} className="text-[var(--purple-soft)] mx-auto mb-3" />
                <p className="text-sm text-[var(--text-primary)] font-medium">暂无数据</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  开始学习后，系统会自动分析你的薄弱项并给出针对性建议。
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
