'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, Play, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { db } from '@/lib/db';
import { useFeedback } from '@/hooks/useFeedback';
import type { DailyCourse } from '@/data/thirtyDayCourse';
import { ToriCardMascot } from '@/components/mobile/ToriCardMascot';

const weeks = [
  { label: '第一周', sub: '日常问候与自我介绍', days: [1, 2, 3, 4, 5, 6, 7], color: 'var(--color-pink-base)' },
  { label: '第二周', sub: '日常生活', days: [8, 9, 10, 11, 12, 13, 14], color: 'var(--color-mint-base)' },
  { label: '第三周', sub: '社交与表达', days: [15, 16, 17, 18, 19, 20, 21], color: 'var(--color-purple-base)' },
  { label: '第四周', sub: '进阶日常 + 总测试', days: [22, 23, 24, 25, 26, 27, 28, 29, 30], color: 'var(--color-gold-base)' },
];

export default function CoursePage() {
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [course, setCourse] = useState<DailyCourse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { click: feedbackClick } = useFeedback();

  useEffect(() => {
    Promise.all([
      import('@/data/thirtyDayCourse').then((m) => m.thirtyDayCourse),
      db.learningEvents.where('action').equals('complete').toArray().then((events) => {
        const days = new Set<number>();
        for (const e of events) { if (e.dayNum) days.add(e.dayNum); }
        return db.words.where('source').equals('course').toArray().then((words) => {
          for (const w of words) {
            if (w.sourceDetail) {
              const m = w.sourceDetail.match(/Day (\d+)/);
              if (m) days.add(parseInt(m[1], 10));
            }
          }
          return days;
        });
      }).catch(() => new Set<number>()),
    ]).then(([data, days]) => {
      setCourse(data);
      setCompletedDays(days);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const currentDay = completedDays.size > 0 ? Math.min(Math.max(...completedDays) + 1, 30) : 1;
  const completedCount = completedDays.size;

  if (loading || !course) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  return (
    <div className="py-4 mx-auto max-w-2xl">
      <Link href="/learning" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-4">
        <ArrowLeft size={16} /> 返回
      </Link>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'KaiTi', 'STKaiti', cursive" }}>
          30天入门路线
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-2">
          每天15分钟 · 8个单词 · 1个语法 · 3句口语 · 5个默写 · 1个输出任务
        </p>
      </div>

      {/* Progress overview */}
      <div className="relative overflow-visible bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 pr-28 mb-6">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[var(--text-primary)]">学习进度</span>
            <span className="text-xs text-[var(--text-muted)]">{completedCount} / 30 天已完成</span>
          </div>
          <div className="w-full bg-[var(--bg-input)] rounded-full h-2.5 mb-4">
            <div
              className="h-2.5 rounded-full bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] transition-all duration-700"
              style={{ width: `${Math.max(3, Math.round((completedCount / 30) * 100))}%` }}
            />
          </div>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-xl font-bold text-[var(--pink-primary)]">240</div>
              <div className="text-[11px] text-[var(--text-muted)] mt-0.5">单词</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[var(--purple-soft)]">30</div>
              <div className="text-[11px] text-[var(--text-muted)] mt-0.5">语法点</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[var(--mint-soft)]">90</div>
              <div className="text-[11px] text-[var(--text-muted)] mt-0.5">实用句</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[var(--amber-soft)]">30</div>
              <div className="text-[11px] text-[var(--text-muted)] mt-0.5">输出任务</div>
            </div>
          </div>
        </div>
        <ToriCardMascot pose="sit" size="md" />
      </div>

      {/* Course timeline */}
      <div className="space-y-6">
        {weeks.map((week) => (
          <div key={week.label}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: week.color }} />
              <h2 className="text-sm font-bold text-[var(--text-primary)]">{week.label}</h2>
              <span className="text-[11px] text-[var(--text-muted)]">· {week.sub}</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {week.days.map((dayNum) => {
                const day = course[dayNum - 1];
                const isCompleted = completedDays.has(dayNum);
                const isCurrent = dayNum === currentDay && !isCompleted;
                const isLocked = dayNum > currentDay && !isCompleted;

                return isLocked ? (
                  <div
                    key={dayNum}
                    className="rounded-xl p-3 text-center border bg-[var(--bg-input)] border-[var(--border-color)] opacity-40 cursor-not-allowed"
                  >
                    <div className="text-2xl mb-1">{day.emoji}</div>
                    <div className="text-[11px] font-bold text-[var(--text-primary)]">Day {dayNum}</div>
                    <div className="text-[10px] text-[var(--text-muted)] truncate">{day.title}</div>
                    <div className="mt-1.5"><Lock size={12} className="text-[var(--text-placeholder)] mx-auto" /></div>
                  </div>
                ) : (
                  <Link
                    key={dayNum}
                    href={`/course/${dayNum}?source=course`}
                    onClick={feedbackClick}
                    className={`rounded-xl p-3 text-center transition-all group border ${
                      isCompleted
                        ? 'bg-[var(--mint-soft)]/5 border-[var(--mint-soft)]/20 hover:border-[var(--mint-soft)]/40'
                        : isCurrent
                          ? 'bg-gradient-to-br from-[var(--purple-soft)]/10 to-[var(--pink-primary)]/10 border-[var(--purple-soft)]/30 hover:border-[var(--purple-soft)]/50 hover:shadow-md'
                          : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--pink-pale)]'
                    }`}
                  >
                    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{day.emoji}</div>
                    <div className="text-[11px] font-bold text-[var(--text-primary)]">Day {dayNum}</div>
                    <div className="text-[10px] text-[var(--text-muted)] truncate">{day.title}</div>
                    <div className="mt-1.5">
                      {isCompleted ? (
                        <Check size={14} className="text-[var(--mint-soft)] mx-auto" />
                      ) : isCurrent ? (
                        <Play size={14} className="text-[var(--purple-soft)] mx-auto" />
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link
          href={`/course/${currentDay}?source=course`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold hover:opacity-90 transition-opacity"
        >
          {completedCount > 0 ? `继续第 ${currentDay} 天` : '从第一天开始'}
        </Link>
      </div>
    </div>
  );
}
