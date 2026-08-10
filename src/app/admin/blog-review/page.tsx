'use client';

import { useEffect, useState } from 'react';
import { Loader2, Award, Heart, MessageCircle, Image as ImageIcon } from 'lucide-react';

interface ReviewPost {
  [k: string]: unknown;
  id: string;
  slug: string;
  authorId: string;
  authorNickname: string;
  text: string;
  moderatedText: string;
  coverImageUrl: string;
  overall: number;
  likeCount: number;
  commentCount: number;
  publishedAt: number;
  featureDate: string;
  featureRank: number;
}

function tomorrowStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function BlogReviewPage() {
  const [posts, setPosts] = useState<ReviewPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // 每篇帖的本地编辑态（改写正文 / 入选日期 / 名次）
  const [drafts, setDrafts] = useState<Record<string, { text: string; date: string; rank: number }>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    fetch('/api/admin/blog-review')
      .then((r) => r.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts);
          const d: Record<string, { text: string; date: string; rank: number }> = {};
          for (const p of data.posts as ReviewPost[]) {
            d[p.id] = {
              text: p.moderatedText || p.text,
              date: p.featureDate || tomorrowStr(),
              rank: p.featureRank || 0,
            };
          }
          setDrafts(d);
        } else setError('加载失败');
      })
      .catch(() => setError('加载失败'))
      .finally(() => setLoading(false));
  }, []);

  const patch = (id: string, field: 'text' | 'date' | 'rank', value: string | number) => {
    setDrafts((cur) => ({ ...cur, [id]: { ...cur[id], [field]: value } }));
  };

  const submit = async (id: string, rank: number) => {
    const d = drafts[id];
    setSaving(id);
    try {
      const res = await fetch(`/api/admin/blog-review/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moderatedText: d.text, featureDate: rank > 0 ? d.date : '', featureRank: rank }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        alert(j.error ?? '操作失败');
        return;
      }
      // 更新本地态
      setPosts((cur) => cur.map((p) => (p.id === id ? { ...p, featureRank: rank, featureDate: rank > 0 ? d.date : '', moderatedText: d.text } : p)));
      patch(id, 'rank', rank);
      setNotice(rank > 0 ? `已设为 TOP${rank}` : '已撤销入选');
      setTimeout(() => setNotice(''), 2500);
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-[var(--text-muted)]">
        <Loader2 className="animate-spin" size={20} /> <span className="ml-2">加载中…</span>
      </div>
    );
  }
  if (error) return <div className="text-red-500 py-10">{error}</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <Award size={20} /> 动物城·每日评选二审
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          仅显示「一审通过 + 用户勾选参赛」的帖子。审核修改正文后设定发布日期与名次（TOP3），确认后次日公开。公开时只用动物昵称，不暴露真实账号。
        </p>
      </div>

      {notice && (
        <div className="mb-4 text-xs px-3 py-2 rounded-lg bg-emerald-50 text-emerald-600 w-fit">{notice}</div>
      )}

      {posts.length === 0 ? (
        <div className="text-[var(--text-muted)] py-10 text-center">暂无待评选的帖子</div>
      ) : (
        <div className="space-y-4">
          {posts.map((p) => {
            const d = drafts[p.id];
            const featured = p.featureRank > 0;
            return (
              <div key={p.id} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">🐾 {p.authorNickname || '(未设昵称)'}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-soft)] text-[var(--text-muted)]">综合分 {p.overall}</span>
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1"><Heart size={12} /> {p.likeCount}</span>
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1"><MessageCircle size={12} /> {p.commentCount}</span>
                  {p.coverImageUrl && <span className="text-xs text-[var(--text-muted)] flex items-center gap-1"><ImageIcon size={12} /> 配图</span>}
                  {featured && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
                      已入选 {p.featureDate} · TOP{p.featureRank}
                    </span>
                  )}
                </div>

                <div className="mb-2">
                  <div className="text-xs text-[var(--text-muted)] mb-1">作者原文</div>
                  <div className="text-sm text-[var(--text-primary)] whitespace-pre-wrap bg-[var(--bg-soft)] rounded-lg p-2">{p.text}</div>
                </div>

                <div className="mb-3">
                  <div className="text-xs text-[var(--text-muted)] mb-1">改写后公开正文（审核修改）</div>
                  <textarea
                    className="w-full text-sm text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-2 min-h-[64px]"
                    value={d.text}
                    onChange={(e) => patch(p.id, 'text', e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <label className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    发布日期
                    <input
                      type="date"
                      className="text-sm border border-[var(--border-color)] rounded-md px-2 py-1 bg-[var(--bg-card)] text-[var(--text-primary)]"
                      value={d.date}
                      onChange={(e) => patch(p.id, 'date', e.target.value)}
                    />
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((rank) => (
                      <button
                        key={rank}
                        type="button"
                        disabled={saving === p.id}
                        onClick={() => submit(p.id, rank)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${
                          p.featureRank === rank
                            ? 'bg-amber-500 text-white border-amber-500'
                            : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--bg-soft)]'
                        }`}
                      >
                        入选 TOP{rank}
                      </button>
                    ))}
                    {featured && (
                      <button
                        type="button"
                        disabled={saving === p.id}
                        onClick={() => submit(p.id, 0)}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium border border-[var(--border-color)] text-red-500 hover:bg-red-50"
                      >
                        撤销入选
                      </button>
                    )}
                    {saving === p.id && <Loader2 className="animate-spin text-[var(--text-muted)]" size={14} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
