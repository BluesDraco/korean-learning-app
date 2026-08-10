'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Flame, Edit3, Calendar as CalendarIcon, Check, ChevronRight, Trophy, AlertCircle } from 'lucide-react';
import type { TopikSession, TopikUserGoal } from '@/types';
import type { TopikQuestionIndexItem } from '@/lib/dataLoader';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/useToast';
import { saveProgress, TTL_EXAM } from '@/lib/progress-storage';
import { db } from '@/lib/db';
import { isSessionPassed } from '@/lib/topik/examRules';
import GoalSettingModal, { type GoalDraft } from '@/components/topik/GoalSettingModal';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  [k: string]: unknown;
  allSessions: TopikSession[];
  sessionsLoaded: boolean;
  questionIndex: TopikQuestionIndexItem[];
  userGoal: TopikUserGoal | null;
  setUserGoal: (g: TopikUserGoal | null) => void;
}

type Section = 'listening' | 'reading';
type Level = 'beginner' | 'intermediate';
type Difficulty = 'easy' | 'medium' | 'hard' | 'all';
type Count = 10 | 20 | 30 | 50;

function ymd(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SimulateTab({ allSessions, sessionsLoaded, questionIndex, userGoal, setUserGoal }: Props) {
  const { lang } = useLang();
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [section, setSection] = useState<Section>('listening');
  const [level, setLevel] = useState<Level>('beginner');
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [count, setCount] = useState<Count>(20);
  const [goalModalOpen, setGoalModalOpen] = useState(false);

  const daysLeft = userGoal?.targetDate ? Math.max(0, Math.ceil((userGoal.targetDate - Date.now()) / 86400000)) : null;

  // 只从"自由训练"session 派生打卡态和最近记录
  // 判据：mode='simulate' + section='sim-free'（区分旧模拟练习 tab 遗留的 session）
  const simSessions = useMemo(
    () => allSessions.filter(s => s.mode === 'simulate' && s.section === 'sim-free'),
    [allSessions]
  );

  const streakDays = useMemo(() => {
    const days: { date: string; done: boolean }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      days.push({ date: ymd(d.getTime()), done: false });
    }
    const doneDates = new Set(simSessions.map(s => ymd(s.completedAt)));
    for (const d of days) d.done = doneDates.has(d.date);
    return days;
  }, [simSessions]);

  const currentStreak = useMemo(() => {
    let streak = 0;
    for (let i = streakDays.length - 1; i >= 0; i--) {
      if (streakDays[i].done) streak++;
      else break;
    }
    return streak;
  }, [streakDays]);

  const recentSims = useMemo(
    () => [...simSessions].sort((a, b) => b.completedAt - a.completedAt).slice(0, 5),
    [simSessions]
  );

  const pool = useMemo(() => {
    return questionIndex.filter(q =>
      q.section === section &&
      q.level === level &&
      (difficulty === 'all' || q.difficulty === difficulty)
    );
  }, [questionIndex, section, level, difficulty]);

  const startTraining = useCallback(() => {
    if (pool.length === 0) {
      showToast(t('topik.sim_no_pool', lang), 'info');
      return;
    }
    // pool < count 时允许重复出题凑满：轮询 shuffle 直到达到 count
    const ids: string[] = [];
    while (ids.length < count) {
      const chunk = shuffle(pool).slice(0, count - ids.length).map(q => q.id);
      ids.push(...chunk);
    }
    const sessionId = crypto.randomUUID();
    saveProgress(`topik-exam-${sessionId}`, {
      sectionId: 'sim-free',
      questionIds: ids,
      mode: 'simulate',
      timeLeft: -1,
      idx: 0,
      answers: [],
      startedAt: Date.now(),
    }, TTL_EXAM);
    router.push(`/topik/exam/${sessionId}`);
  }, [pool, count, router, showToast, lang]);

  async function saveGoal(draft: GoalDraft) {
    if (!user?.id) { setGoalModalOpen(false); return; }
    const now = Date.now();
    const existing = userGoal;
    const record: TopikUserGoal = {
      id: existing?.id || `tug-${user.id}`,
      userId: user.id,
      targetDate: draft.targetDate,
      targetLevel: draft.targetLevel,
      dailyQuestionCount: draft.dailyQuestionCount,
      updatedAt: now,
      createdAt: existing?.createdAt || now,
    };
    try {
      await db.topikUserGoals.put(record);
      setUserGoal(record);
    } catch { /* non-blocking */ }
    setGoalModalOpen(false);
  }

  if (!sessionsLoaded) {
    return <div style={{ textAlign: 'center', padding: 40, color: 'var(--hr-ink-3)', fontSize: 13, fontFamily: 'var(--hr-mono)', letterSpacing: '.14em' }}>{t('topik.loading', lang)}</div>;
  }

  const diffLabelMap: Record<Difficulty, string> = { easy: t('topik.sim_diff_easy', lang), medium: t('topik.sim_diff_medium', lang), hard: t('topik.sim_diff_hard', lang), all: t('topik.sim_diff_all', lang) };
  const sectionLabelMap: Record<Section, string> = { listening: t('topik.filter_listening', lang), reading: t('topik.filter_reading', lang) };
  const levelLabelMap: Record<Level, string> = { beginner: t('topik.filter_topik_I', lang), intermediate: t('topik.filter_topik_II', lang) };

  return (
    <div>
      {/* 目标 hero */}
      <div className="tk-goal-hero">
        <button className="tk-goal-edit" onClick={() => setGoalModalOpen(true)} aria-label={t('topik.sim_goal_edit', lang)}>
          <Edit3 size={14} />
        </button>
        {daysLeft !== null ? (
          <div>
            <div className="tk-goal-label">{t('topik.sim_goal_days_to', lang, { level: userGoal?.targetLevel || '' })}</div>
            <div className="tk-goal-days">
              <span className="tk-goal-num">{daysLeft}</span>
              <span className="tk-goal-unit">{t('topik.sim_goal_days_unit', lang)}</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="tk-goal-label">{t('topik.sim_goal_none', lang)}</div>
            <button className="tk-goal-empty-cta" onClick={() => setGoalModalOpen(true)}>{t('topik.sim_goal_set_date', lang)}</button>
          </div>
        )}

        <div className="tk-streak-row">
          <Flame size={18} color={currentStreak > 0 ? 'var(--hr-peach-strong)' : 'var(--hr-ink-3)'} fill={currentStreak > 0 ? 'var(--hr-peach-strong)' : 'none'} />
          <span className="tk-streak-num">{currentStreak}</span>
          <span className="tk-streak-label">{t('topik.sim_streak_continuous', lang)}</span>
        </div>
      </div>

      {/* 7 日打卡 */}
      <div className="tk-card">
        <div className="tk-card-head">
          <CalendarIcon size={14} color="currentColor" style={{ opacity: 0.6 }} />
          <p className="tk-card-title">{t('topik.sim_card_week_train', lang)}</p>
        </div>
        <div className="tk-streak-grid">
          {streakDays.map((d, i) => {
            const isToday = i === 6;
            const dayLabel = ['topik.wd_sun','topik.wd_mon','topik.wd_tue','topik.wd_wed','topik.wd_thu','topik.wd_fri','topik.wd_sat'].map(k => t(k, lang))[new Date(d.date.replace(/-/g, '/')).getDay()];
            const cls = ['tk-streak-day', isToday ? 'today' : ''].filter(Boolean).join(' ');
            const dotCls = ['tk-streak-dot', d.done ? 'done' : '', isToday ? 'today' : ''].filter(Boolean).join(' ');
            return (
              <div key={d.date} className={cls}>
                <div className={dotCls}>
                  {d.done && <Check size={14} strokeWidth={3} />}
                </div>
                <span className="tk-streak-daylabel">{dayLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 训练配置 */}
      <div className="tk-card">
        <div className="tk-card-head">
          <p className="tk-card-title">{t('topik.sim_card_start_train', lang)}</p>
        </div>

        <div className="tk-opt-block">
          <div className="tk-opt-label">{t('topik.sim_opt_section', lang)}</div>
          <div className="tk-opt-grid-2">
            {(['listening', 'reading'] as Section[]).map(k => (
              <button key={k} onClick={() => setSection(k)} className={`tk-opt-btn${section === k ? ' active' : ''}`}>
                {sectionLabelMap[k]}
              </button>
            ))}
          </div>
        </div>

        <div className="tk-opt-block">
          <div className="tk-opt-label">{t('topik.sim_opt_level', lang)}</div>
          <div className="tk-opt-grid-2">
            {(['beginner', 'intermediate'] as Level[]).map(k => (
              <button key={k} onClick={() => setLevel(k)} className={`tk-opt-btn${level === k ? ' active' : ''}`}>
                {levelLabelMap[k]}
              </button>
            ))}
          </div>
        </div>

        <div className="tk-opt-block">
          <div className="tk-opt-label">{t('topik.sim_opt_difficulty', lang)}</div>
          <div className="tk-opt-grid-4">
            {(['easy', 'medium', 'hard', 'all'] as Difficulty[]).map(k => (
              <button key={k} onClick={() => setDifficulty(k)} className={`tk-opt-btn${difficulty === k ? ' active' : ''}`}>
                {diffLabelMap[k]}
              </button>
            ))}
          </div>
        </div>

        <div className="tk-opt-block">
          <div className="tk-opt-label">{t('topik.sim_opt_count', lang)}</div>
          <div className="tk-opt-grid-4">
            {([10, 20, 30, 50] as Count[]).map(k => (
              <button key={k} onClick={() => setCount(k)} className={`tk-opt-btn${count === k ? ' active' : ''}`}>
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="tk-pool-hint">
          {t('topik.sim_pool_hint', lang, { n: pool.length })}
          {pool.length > 0 && pool.length < count && (
            <span className="warn">{t('topik.sim_pool_warn', lang, { n: pool.length })}</span>
          )}
        </div>

        <button className="tk-start-btn" onClick={startTraining} disabled={pool.length === 0}>
          {t('topik.sim_start_btn', lang, { n: count })}
        </button>
      </div>

      {/* 最近训练 */}
      {recentSims.length > 0 && (
        <div className="tk-card">
          <div className="tk-card-head">
            <p className="tk-card-title">{t('topik.sim_recent_train', lang)}</p>
          </div>
          <div className="tk-recent-list">
            {recentSims.map(s => {
              const passed = isSessionPassed(s);
              const d = new Date(s.completedAt);
              const dateStr = `${d.getMonth() + 1}/${d.getDate()}`;
              return (
                <button
                  key={s.id}
                  onClick={() => router.push(`/topik/result/${s.id}`)}
                  className="tk-recent-item"
                  style={{ border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                >
                  <div className={`tk-recent-score ${passed ? 'pass' : 'fail'}`}>{s.score}</div>
                  <div className="tk-recent-info">
                    <p className="tk-recent-name">{t('topik.sim_recent_free', lang, { date: dateStr })}</p>
                    <div className="tk-recent-meta">{s.correctCount}/{s.totalCount}</div>
                  </div>
                  {passed ? <Trophy size={14} color="var(--hr-mint-strong)" /> : <AlertCircle size={14} color="var(--hr-pink-strong)" />}
                  <ChevronRight size={14} color="currentColor" style={{ opacity: 0.4 }} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <GoalSettingModal
        open={goalModalOpen}
        initial={{ targetDate: userGoal?.targetDate, targetLevel: userGoal?.targetLevel, dailyQuestionCount: userGoal?.dailyQuestionCount || 15 }}
        onClose={() => setGoalModalOpen(false)}
        onSave={saveGoal}
      />
    </div>
  );
}
