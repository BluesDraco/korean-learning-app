'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Loader2, UserPlus, X } from 'lucide-react';
import { useAdminData } from '@/lib/useAdminData';
import type { AmbassadorsResponse } from '@/types/admin';

export default function AdminAmbassadorsPage() {
  const { data, loading, refetch } = useAdminData<AmbassadorsResponse>('/api/admin/ambassadors');
  const [acting, setActing] = useState<string | null>(null);

  const act = async (userId: string, action: 'grant' | 'revoke') => {
    setActing(userId);
    try {
      const res = await fetch('/api/admin/ambassadors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`操作失败：${err.error || res.status}`);
        return;
      }
      refetch();
    } finally {
      setActing(null);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  return (
    <div className="py-4 max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">学习大使</h1>
        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]">
          {data.ambassadors.length} 位
        </span>
      </div>

      <p className="text-sm text-[var(--text-secondary)]">
        授予条件：连续打卡 ≥ 30 天。下方「候选用户」为已达标但未授予的用户。
      </p>

      {/* 已授予的大使 */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-[var(--text-muted)]">现任大使</h2>
        {data.ambassadors.map((a) => (
          <div
            key={a.userId}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center gap-4"
          >
            <Star size={24} className="text-[var(--peach-soft)] fill-current shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[var(--text-primary)]">{a.nickname}</p>
              <p className="text-xs text-[var(--text-muted)]">
                获得时间：{a.ambassadorSince ? new Date(a.ambassadorSince).toLocaleDateString('zh-CN') : '-'}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{a.ambassadorReason || '-'}</p>
            </div>
            <div className="text-right text-xs text-[var(--text-muted)] space-y-0.5">
              <p>等级 {a.level}</p>
              <p>XP {a.xp}</p>
              <p>连签 {a.longestStreak}天</p>
            </div>
            <button
              onClick={() => act(a.userId, 'revoke')}
              disabled={acting === a.userId}
              className="text-[var(--text-muted)] hover:text-red-400 p-1 disabled:opacity-40"
              title="撤销大使"
            >
              {acting === a.userId ? <Loader2 size={16} className="animate-spin" /> : <X size={16} />}
            </button>
          </div>
        ))}
        {data.ambassadors.length === 0 && (
          <div className="text-center py-12 space-y-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl">
            <Star size={40} className="text-[var(--text-placeholder)] mx-auto" />
            <p className="text-sm text-[var(--text-muted)]">还没有学习大使</p>
          </div>
        )}
      </section>

      {/* 候选用户 */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-[var(--text-muted)]">候选用户（连续打卡 ≥ 30 天）</h2>
        {data.candidates.map((c) => (
          <div
            key={c.userId}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[var(--text-primary)]">{c.nickname}</p>
              <p className="text-xs text-[var(--text-muted)]">等级 {c.level} · XP {c.xp} · 连签 {c.longestStreak}天</p>
            </div>
            <button
              onClick={() => act(c.userId, 'grant')}
              disabled={acting === c.userId}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--purple-soft)] text-white rounded-lg text-xs font-medium hover:opacity-90 disabled:opacity-50"
            >
              {acting === c.userId ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
              授予
            </button>
          </div>
        ))}
        {data.candidates.length === 0 && (
          <p className="text-sm text-[var(--text-muted)] text-center py-8">暂无符合条件的候选用户</p>
        )}
      </section>
    </div>
  );
}
