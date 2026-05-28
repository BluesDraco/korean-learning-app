'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, BookOpen, RefreshCw, Sparkles, AlertCircle, Play, Eye, User } from 'lucide-react';

interface NewsPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  tag: string;
  source: 'bilibili' | 'weibo';
  sourceUrl: string;
  bvid?: string;
  pic?: string;
  author?: string;
  vocab: { ko: string; zh: string }[];
}

interface CacheData {
  date: string;
  updatedAt: number;
  posts: NewsPost[];
  stale?: boolean;
  error?: string;
}

export function NewsClient() {
  const [data, setData] = useState<CacheData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  async function fetchNews() {
    try {
      const res = await fetch('/api/kpop-news');
      const json = await res.json();
      if (json.error) {
        setError(json.error);
      } else {
        setData(json);
        setError('');
      }
    } catch {
      setError('加载失败');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    try {
      const res = await fetch('/api/kpop-news', { method: 'POST' });
      const json = await res.json();
      if (json.ok) {
        setData({ date: new Date().toISOString().slice(0, 10), updatedAt: Date.now(), posts: json.posts });
        setError('');
      } else {
        setError(json.error || '刷新失败');
      }
    } catch {
      setError('网络错误');
    } finally {
      setRefreshing(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw size={24} className="animate-spin mx-auto text-[var(--text-muted)]" />
        <p className="text-sm text-[var(--text-muted)] mt-3">加载中...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">🤖 AI 智能整理</h2>
          {data && (
            <span className="text-xs text-[var(--text-muted)]">
              {data.date} 更新 · {data.posts.length} 条帖子
              {data.stale && ' · 待刷新'}
            </span>
          )}
          {error && (
            <span className="text-xs text-amber-500 flex items-center gap-1">
              <AlertCircle size={11} />{error}
            </span>
          )}
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 disabled:opacity-50 transition-all border border-[var(--pink-primary)]/20"
        >
          {refreshing ? <RefreshCw size={13} className="animate-spin" /> : <Sparkles size={13} />}
          {refreshing ? '整理中...' : '手动刷新'}
        </button>
      </div>

      {error && !data && (
        <div className="text-center py-12">
          <AlertCircle size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
          <p className="text-sm text-[var(--text-muted)]">{error}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">请确保已配置 DEEPSEEK_NEWS_KEY 并重启服务</p>
        </div>
      )}

      {/* Post feed — single column chronological */}
      <div className="space-y-5">
        {data?.posts.map((post) => (
          <article
            key={post.id}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[var(--pink-pale)]/50 transition-all"
          >
            <div className="p-5">
              {/* Meta row */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    post.source === 'bilibili'
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  {post.source === 'bilibili' ? '📺 B站' : '🔴 微博'}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">
                  {post.tag}
                </span>
                {post.author && (
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <User size={11} />{post.author}
                  </span>
                )}
                <span className="text-xs text-[var(--text-muted)] ml-auto">{post.date}</span>
              </div>

              {/* Video embed for Bilibili */}
              {post.source === 'bilibili' && post.bvid && (
                <div className="mb-4 rounded-xl overflow-hidden bg-black relative aspect-video">
                  {activeVideo === post.bvid ? (
                    <iframe
                      src={`//player.bilibili.com/player.html?bvid=${post.bvid}&page=1&autoplay=0`}
                      className="w-full h-full border-0"
                      allowFullScreen
                      title={post.title}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center cursor-pointer relative group"
                      onClick={() => setActiveVideo(post.bvid!)}
                    >
                      {post.pic ? (
                        <img
                          src={post.pic}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center" />
                      )}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                          <Play size={28} className="text-pink-500 ml-1" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 text-xs text-white/80 bg-black/50 px-2.5 py-1 rounded-full">
                        点击播放视频
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Title & Summary */}
              <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {post.summary}
              </p>

              {/* Vocab */}
              {post.vocab.length > 0 && (
                <div className="bg-[var(--bg-input)] rounded-xl p-3 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-2">
                    <BookOpen size={13} />
                    学韩语
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.vocab.map((v) => (
                      <span
                        key={v.ko}
                        className="inline-flex items-center gap-1.5 text-sm bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg px-3 py-1"
                      >
                        <span className="font-bold text-[var(--text-primary)]">{v.ko}</span>
                        <span className="text-[var(--text-muted)]">{v.zh}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Source link */}
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--pink-primary)] hover:underline font-medium"
              >
                <ExternalLink size={14} />
                {post.source === 'bilibili' ? '在B站查看原视频' : '在微博查看原文'}
              </a>
            </div>
          </article>
        ))}
      </div>

      {data?.posts.length === 0 && !error && (
        <div className="text-center py-12 text-[var(--text-muted)] text-sm">
          暂无内容，点击右上角「手动刷新」
        </div>
      )}
    </div>
  );
}
