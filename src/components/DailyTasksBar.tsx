'use client';

import { memo } from 'react';
import Link from 'next/link';
import { BookOpen, Languages, BookMarked, ArrowRight, Sparkles } from 'lucide-react';
import type { TodayTasks } from '@/lib/progress';

export default memo(function DailyTasksBar({ tasks }: { tasks: TodayTasks }) {
  const items = [
    {
      key: 'srsReview',
      icon: BookOpen,
      label: 'SRS复习',
      detail: tasks.srsReview.done
        ? '已完成'
        : tasks.srsReview.dueCount > 0
          ? `${tasks.srsReview.dueCount} 个待复习`
          : '暂无待复习',
      href: '/review',
      done: tasks.srsReview.done || tasks.srsReview.dueCount === 0,
      color: 'var(--peach-soft)',
    },
    {
      key: 'newGrammar',
      icon: Languages,
      label: '今日课程',
      detail: tasks.newGrammar.done ? '已完成' : '学1条新语法',
      href: '/daily',
      done: tasks.newGrammar.done,
      color: 'var(--purple-soft)',
    },
    {
      key: 'reading',
      icon: BookMarked,
      label: '读绘本',
      detail: tasks.reading.done ? '已完成' : '读5分钟',
      href: '/learn/picture-books',
      done: tasks.reading.done,
      color: 'var(--mint-soft)',
    },
  ];

  return (
    <div className="card-washi p-4" style={{ '--washi-color': 'var(--pink-pale)' } as React.CSSProperties}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-[var(--text-primary)]">今日任务</span>
        {tasks.allDone && (
          <span className="inline-flex items-center gap-1 text-xs text-[var(--mint-soft)]">
            <Sparkles size={12} />
            全部完成
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border transition-colors group ${
                item.done
                  ? 'bg-[var(--mint-soft)]/5 border-[var(--mint-soft)]/15'
                  : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--border-hover)]'
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <Icon size={16} style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[var(--text-primary)]">{item.label}</div>
                <div className={`text-xs ${item.done ? 'text-[var(--mint-soft)]' : 'text-[var(--text-muted)]'}`}>
                  {item.detail}
                </div>
              </div>
              {!item.done && (
                <ArrowRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
});
