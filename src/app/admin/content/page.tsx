'use client';

import { useAdminData } from '@/lib/useAdminData';
import type { ContentResponse } from '@/types/admin';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, MessageCircle } from 'lucide-react';

const statusTabs = [
  { key: 'pending', label: '待处理' },
  { key: 'resolved', label: '已修复' },
  { key: 'ignored', label: '已忽略' },
  { key: 'all', label: '全部' },
];

const typeLabels: Record<string, string> = {
  content_error: '内容错误',
  bug: 'Bug',
  suggestion: '建议',
  word_error: '单词错误',
  translation_error: '翻译错误',
  audio_error: '音频错误',
  other: '其他',
};

const typeColors: Record<string, string> = {
  content_error: 'bg-amber-50 text-amber-500',
  bug: 'bg-red-50 text-red-400',
  suggestion: 'bg-blue-50 text-blue-500',
  word_error: 'bg-amber-50 text-amber-500',
  translation_error: 'bg-blue-50 text-blue-500',
  audio_error: 'bg-purple-50 text-purple-500',
};

export default function ContentPage() {
  const [status, setStatus] = useState('pending');
  const { data, loading, refetch } = useAdminData<ContentResponse>(`/api/admin/content?feedbackStatus=${status}`);
  const router = useRouter();

  const handleResolve = async (id: string, newStatus: 'resolved' | 'ignored') => {
    setActing(id);
    try {
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
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

  // 首帧无数据才整页转圈；切 tab 时保留旧数据不闪
  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FF8FAB] border-t-transparent" />
      </div>
    );
  }
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🐰</span>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">内容管理</h1>
          <p className="text-sm text-[var(--text-muted)]">模块统计与用户反馈</p>
        </div>
      </div>

      {/* Module stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {data.moduleStats.map((m) => (
          <div key={m.module} className="bg-[var(--bg-card)] rounded-xl p-4 text-center border border-[var(--border-color)]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <p className="text-2xl mb-1">{m.icon}</p>
            <p className="text-lg font-extrabold text-[var(--text-primary)]">{m.totalItems}</p>
            <p className="text-xs text-[var(--text-muted)]">{m.module}</p>
          </div>
        ))}
      </div>

      {/* Feedback */}
      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">
            用户反馈
            <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">共 {data.total} 条</span>
          </h3>
          <div className="flex gap-1 bg-[var(--bg-input)] rounded-lg p-0.5">
            {statusTabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setStatus(t.key)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  status === t.key ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] font-semibold shadow-sm' : 'text-[var(--text-muted)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-[#F5E6E0]">
          {data.feedbacks.length === 0 && (
            <div className="px-5 py-12 text-center text-sm text-[var(--text-muted)]">暂无{statusTabs.find((t) => t.key === status)?.label}反馈</div>
          )}
          {data.feedbacks.map((f) => (
            <div key={f.id} className="px-5 py-4 hover:bg-[var(--bg-soft)] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[f.type] || 'bg-[var(--bg-input)] text-[var(--text-muted)]'}`}>
                      {typeLabels[f.type] || f.type}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      f.status === 'pending' ? 'bg-red-50 text-red-400' :
                      f.status === 'resolved' ? 'bg-emerald-50 text-emerald-500' :
                      'bg-[var(--bg-input)] text-[var(--text-muted)]'
                    }`}>
                      {f.status === 'pending' ? '待处理' : f.status === 'resolved' ? '已修复' : '已忽略'}
                    </span>
                    {f.path && (
                      <span className="text-xs text-[var(--text-muted)] font-mono bg-[var(--bg-input)] px-2 py-0.5 rounded-lg">{f.path}</span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-primary)] whitespace-pre-wrap">{f.content}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-[var(--text-muted)]">{f.username}</span>
                    <span className="text-xs text-[var(--text-placeholder)]">
                      {new Date(f.createdAt).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                {f.status === 'pending' && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {f.userId ? (
                      <button
                        onClick={() => router.push(`/admin/messages?userId=${f.userId}`)}
                        className="p-1.5 rounded-lg hover:bg-[var(--pink-primary)]/10 text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                        title="发私信"
                      >
                        <MessageCircle size={16} />
                      </button>
                    ) : (
                      <span className="text-[10px] text-[var(--text-placeholder)]" title="匿名提交">匿名</span>
                    )}
                    <button
                      onClick={() => router.push(`/admin/messages?userId=${f.userId}`)}
                      className="p-1.5 rounded-lg hover:bg-[var(--pink-primary)]/10 text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                      title="发私信"
                    >
                      <MessageCircle size={16} />
                    </button>
                    <button
                      onClick={() => handleResolve(f.id, 'resolved')}
                      disabled={acting === f.id}
                      className="p-1.5 rounded-lg hover:bg-emerald-50 text-[var(--text-muted)] hover:text-emerald-500 transition-colors disabled:opacity-40"
                      title="标记已修复"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => handleResolve(f.id, 'ignored')}
                      disabled={acting === f.id}
                      className="p-1.5 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)] transition-colors disabled:opacity-40"
                      title="忽略"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
