'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, MessageSquare, Reply, User } from 'lucide-react';

interface Feedback {
  id: string;
  path: string;
  type: string;
  message: string;
  status: string;
  created_at: number;
  user_id: string | null;
  username: string | null;
  nickname: string | null;
}

const TYPE_LABEL: Record<string, string> = {
  content_error: '内容错误',
  bug: 'Bug',
  suggestion: '建议',
  other: '其他',
};

export default function AdminFeedbackPage() {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/feedback')
      .then(r => r.json())
      .then(data => {
        if (data.feedbacks) setFeedbacks(data.feedbacks);
        else setError('加载失败');
      })
      .catch(() => setError('加载失败'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={28} className="animate-spin text-[var(--text-muted)]" />
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500 py-8">{error}</p>;
  }

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">用户反馈</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">共 {feedbacks.length} 条反馈，点击回复发送私信</p>
      </div>

      {feedbacks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <MessageSquare size={36} className="text-[var(--text-muted)]" />
          <p className="text-sm text-[var(--text-muted)]">暂无反馈</p>
        </div>
      )}

      <div className="space-y-3">
        {feedbacks.map(fb => (
          <div
            key={fb.id}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[var(--bg-input)] flex items-center justify-center shrink-0">
                  <User size={14} className="text-[var(--text-muted)]" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {fb.nickname || fb.username || '匿名用户'}
                  </span>
                  {fb.username && (
                    <span className="text-xs text-[var(--text-muted)] ml-1.5">@{fb.username}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">
                  {TYPE_LABEL[fb.type] || fb.type}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  {new Date(fb.created_at).toLocaleDateString('zh-CN')}
                </span>
              </div>
            </div>

            {/* Message */}
            <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">{fb.message}</p>

            {/* Path */}
            {fb.path && (
              <p className="text-xs text-[var(--text-muted)] font-mono bg-[var(--bg-input)] px-2 py-1 rounded-lg w-fit">
                {fb.path}
              </p>
            )}

            {/* Reply button */}
            {fb.user_id ? (
              <button
                onClick={() => router.push(`/admin/messages?userId=${fb.user_id}`)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-[var(--pink-pale)] text-[var(--pink-primary)] font-medium hover:bg-[#FFD0E0] transition-colors"
              >
                <Reply size={13} />
                回复用户
              </button>
            ) : (
              <span className="text-xs text-[var(--text-muted)]">匿名提交，无法回复</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
