'use client';

import Link from 'next/link';
import { X, BookOpen, Mic, BookMarked, Edit3, GraduationCap, Target } from 'lucide-react';

interface Task {
  key: string;
  label: string;
  detail?: string;
  href: string;
  done?: boolean;
}

const TASK_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  course: GraduationCap,
  srsReview: BookOpen,
  pronunciation: Mic,
  reading: BookMarked,
  output: Edit3,
};

const TASK_TONE: Record<string, 'pink' | 'mint' | 'peach' | 'purple'> = {
  course: 'purple',
  srsReview: 'peach',
  pronunciation: 'pink',
  reading: 'mint',
  output: 'peach',
};

const TONE_BG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-soft)', mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)', purple: 'var(--color-purple-soft)',
};
const TONE_FG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-strong)', mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)', purple: 'var(--color-purple-strong)',
};

/** 「今日推荐」按钮 + Sheet · 移动端弹出今日任务列表 */
export function TodayPickSheet({ open, onClose, tasks, completedCount, totalCount }: {
  open: boolean;
  onClose: () => void;
  tasks: Task[];
  completedCount: number;
  totalCount: number;
}) {
  if (!open) return null;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 90,
          backdropFilter: 'blur(4px)', animation: 'tori-fade-in 200ms var(--ease-soft)',
        }}
      />
      <div
        style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 91,
          background: 'var(--color-surface-1)',
          borderTopLeftRadius: 24, borderTopRightRadius: 24,
          maxHeight: '85vh', overflowY: 'auto',
          padding: '20px 20px calc(40px + env(safe-area-inset-bottom, 0px))',
          boxShadow: '0 -8px 32px rgba(78,52,46,0.16)',
          animation: 'tori-slide-up 280ms var(--ease-soft)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--color-pink-strong)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
              今日推荐
            </p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-ink-1)', margin: '4px 0 0' }}>
              {tasks.length > 0 ? '今天的小任务' : '今天没什么要做的'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="关闭"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--color-surface-3)', color: 'var(--color-ink-2)',
              border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {totalCount > 0 && (
          <div style={{ marginBottom: 18, padding: '12px 14px', background: 'var(--color-surface-3)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--color-ink-3)' }}>今日进度</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--color-pink-strong)' }}>
                {completedCount}/{totalCount} 完成
              </span>
            </div>
            <div style={{ height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--color-surface-4)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--color-purple-base), var(--color-pink-base))',
                  width: `${Math.max(4, progressPercent)}%`,
                  transition: 'width var(--dur-slow) var(--ease-soft)',
                }}
              />
            </div>
          </div>
        )}

        {tasks.length === 0 ? (
          <div style={{ padding: '40px 16px', textAlign: 'center' }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>🎉</p>
            <p style={{ fontSize: 14, color: 'var(--color-ink-2)', margin: 0 }}>
              今天所有任务都完成了，去刷词汇或日记吧！
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tasks.map((task) => {
              const Icon = TASK_ICONS[task.key] || Target;
              const tone = TASK_TONE[task.key] || 'peach';
              return (
                <Link
                  key={task.key}
                  href={task.href}
                  onClick={onClose}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--color-border-1)',
                      background: 'var(--color-surface-1)',
                      display: 'flex', alignItems: 'center', gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 40, height: 40, borderRadius: 'var(--radius-md)',
                        background: TONE_BG[tone], color: TONE_FG[tone],
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}
                      aria-hidden
                    >
                      <Icon size={18} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                        {task.label}
                      </p>
                      {task.detail && (
                        <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                          {task.detail}
                        </p>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 11, fontWeight: 800,
                        color: TONE_FG[tone],
                        background: TONE_BG[tone],
                        padding: '5px 12px', borderRadius: 'var(--radius-pill)',
                        flexShrink: 0,
                      }}
                    >
                      去做
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes tori-fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes tori-slide-up { from { transform: translateY(100%) } to { transform: translateY(0) } }
      `}</style>
    </>
  );
}
