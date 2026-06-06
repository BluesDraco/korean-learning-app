'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Plus } from 'lucide-react';
import { db } from '@/lib/db';

interface Article {
  id: string;
  title: string;
  originalText?: string;
  translatedText?: string;
  sourceUrl?: string;
  createdAt?: number;
}

export default function MineArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.articles.orderBy('createdAt').reverse().toArray()
      .then((rows) => setArticles(rows as Article[]))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-4 space-y-4">
      <div className="flex items-center gap-2 text-[13px]">
        <Link href="/mine" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
          <ArrowLeft size={14} />返回
        </Link>
        <span className="text-[var(--border-color)]">/</span>
        <span className="text-[var(--text-secondary)] font-medium">我的文章</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-[var(--text-primary)]">我的文章</h1>
        {articles.length > 0 && (
          <span className="text-[12px] text-[var(--text-muted)]">{articles.length} 篇</span>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 rounded-full border-2 border-[var(--pink-primary)] border-t-transparent animate-spin" />
        </div>
      ) : articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--bg-muted)] flex items-center justify-center mb-4">
            <FileText size={28} className="text-[var(--border-color)]" />
          </div>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">还没有保存文章</h2>
          <p className="text-[13px] text-[var(--text-muted)] max-w-xs leading-relaxed">
            在阅读文章时点击保存，内容会出现在这里
          </p>
          <Link
            href="/reading"
            className="mt-6 flex items-center gap-2 h-11 px-6 rounded-full bg-[var(--text-primary)] text-white text-[13px] font-bold"
          >
            <Plus size={15} />去阅读
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="rounded-[20px] bg-[var(--bg-card)] border border-[var(--border-color)] p-4 shadow-[0_2px_8px_rgba(92,64,38,0.04)]"
            >
              <h3 className="text-[15px] font-bold text-[var(--text-primary)] line-clamp-1">{article.title}</h3>
              {article.originalText && (
                <p className="text-[12px] text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">
                  {article.originalText}
                </p>
              )}
              {article.createdAt && (
                <p className="text-[11px] text-[var(--border-color)] mt-2">
                  {new Date(article.createdAt).toLocaleDateString('zh-CN')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
