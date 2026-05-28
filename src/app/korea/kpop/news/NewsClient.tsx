'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, BookOpen, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  tag: string;
  source: string;
  sourceUrl: string;
  bilibiliQuery: string;
  vocab: { ko: string; zh: string }[];
}

interface CacheData {
  date: string;
  updatedAt: number;
  items: NewsItem[];
  stale?: boolean;
  error?: string;
}

export function NewsClient() {
  const [data, setData] = useState<CacheData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

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
      setError('加载失败，请稍后重试');
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
        setData({ date: new Date().toISOString().slice(0, 10), updatedAt: Date.now(), items: json.items });
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

  if (error && !data) {
    return (
      <div className="text-center py-12">
        <AlertCircle size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
        <p className="text-sm text-[var(--text-muted)]">{error}</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">请确保已配置 DEEPSEEK_NEWS_KEY</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            🤖 AI 每日整理
          </h2>
          {data && (
            <span className="text-xs text-[var(--text-muted)]">
              {data.date} 更新
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
          {refreshing ? (
            <RefreshCw size={13} className="animate-spin" />
          ) : (
            <Sparkles size={13} />
          )}
          {refreshing ? '整理中...' : '手动刷新'}
        </button>
      </div>

      {/* News grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data?.items.map((item) => (
          <article
            key={item.id}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[var(--pink-pale)] hover:shadow-md transition-all"
          >
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">
                  {item.tag}
                </span>
                <span className="text-xs text-[var(--text-muted)]">{item.date}</span>
                <span className="text-[10px] text-[var(--text-muted)] ml-auto">
                  来源: {item.source}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {item.summary}
              </p>

              {/* Vocab */}
              <div className="bg-[var(--bg-input)] rounded-xl p-3 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-2">
                  <BookOpen size={13} />
                  关键词汇
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.vocab.map((v) => (
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

              {/* Links */}
              <div className="flex items-center gap-3">
                <a
                  href={`https://search.bilibili.com/all?keyword=${encodeURIComponent(item.bilibiliQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--pink-primary)] hover:underline font-medium"
                >
                  <ExternalLink size={14} />
                  B站搜索
                </a>
                {item.sourceUrl && item.sourceUrl !== '#' && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    <ExternalLink size={14} />
                    原文链接
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {data?.items.length === 0 && (
        <div className="text-center py-12 text-[var(--text-muted)] text-sm">
          暂无资讯，点击「手动刷新」获取最新KPOP动态
        </div>
      )}
    </div>
  );
}
