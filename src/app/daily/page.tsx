'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Loader2, Sparkles, Check, BookOpen,
  Mic, BookMarked, Edit3, Target, GraduationCap,
} from 'lucide-react';
import { buildDailyPlan, type DailyPlan } from '@/lib/daily/buildDailyPlan';

const TASK_ICONS: Record<string, React.ComponentType<any>> = {
  course: GraduationCap,
  srsReview: BookOpen,
  pronunciation: Mic,
  reading: BookMarked,
  output: Edit3,
};

const TASK_COLORS: Record<string, string> = {
  course: 'var(--purple-soft)',
  srsReview: 'var(--peach-soft)',
  pronunciation: 'var(--pink-primary)',
  reading: 'var(--mint-soft)',
  output: 'var(--amber-soft)',
};

export default function DailyPage() {
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const p = await buildDailyPlan();
      setPlan(p);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-[var(--text-muted)]">加载失败，请刷新重试</p>
      </div>
    );
  }

  const weekday = ['日', '一', '二', '三', '四', '五', '六'];
  const d = new Date();
  const dateStr = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${weekday[d.getDay()]}`;
  const progressPercent = plan.totalCount > 0 ? Math.round((plan.completedCount / plan.totalCount) * 100) : 0;

  return (
    <div className="py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">今日学习</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">{dateStr}</p>
        </div>
        {plan.course && (
          <div className="text-right">
            <div className="text-xs text-[var(--text-muted)]">当前进度</div>
            <div className="text-lg font-bold text-[var(--purple-soft)]">Day {plan.courseDay}</div>
          </div>
        )}
      </div>

      {/* All done banner */}
      {plan.allDone && (
        <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-4 flex items-center gap-3">
          <Sparkles size={20} className="text-[var(--mint-soft)]" />
          <div>
            <p className="text-sm font-bold text-[var(--mint-soft)]">今日任务全部完成!</p>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">太棒了，继续保持!</p>
          </div>
        </div>
      )}

      {/* Task cards */}
      <div className="space-y-3">
        {plan.tasks.map((task) => {
          const Icon = TASK_ICONS[task.key] || Target;
          const color = TASK_COLORS[task.key] || 'var(--text-secondary)';

          return (
            <div
              key={task.key}
              className={`rounded-2xl border p-4 transition-all ${
                task.done
                  ? 'bg-[var(--mint-soft)]/5 border-[var(--mint-soft)]/15'
                  : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--border-hover)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}15` }}
                >
                  {task.done ? (
                    <Check size={20} className="text-[var(--mint-soft)]" />
                  ) : (
                    <Icon size={20} color={color} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[var(--text-primary)]">{task.label}</span>
                    {task.optional && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">可选</span>
                    )}
                    {task.done && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]">已完成</span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">{task.detail}</p>
                </div>
                {!task.done && (
                  <Link
                    href={task.href}
                    className="flex items-center gap-1 shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {task.key === 'course' ? '开始' : '去完成'}
                    <ArrowRight size={12} />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[var(--text-secondary)]">今日进度</span>
          <span className="text-xs text-[var(--text-muted)]">{plan.completedCount}/{plan.totalCount} 已完成</span>
        </div>
        <div className="w-full bg-[var(--bg-input)] rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] transition-all duration-500"
            style={{ width: `${Math.max(4, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-2 justify-center">
        <Link
          href="/course"
          className="text-xs text-[var(--text-muted)] hover:text-[var(--purple-soft)] transition-colors px-3 py-1.5 rounded-lg bg-[var(--bg-input)]"
        >
          查看30天课程路线
        </Link>
        <Link
          href="/learn"
          className="text-xs text-[var(--text-muted)] hover:text-[var(--purple-soft)] transition-colors px-3 py-1.5 rounded-lg bg-[var(--bg-input)]"
        >
          全部单元列表
        </Link>
      </div>
    </div>
  );
}
