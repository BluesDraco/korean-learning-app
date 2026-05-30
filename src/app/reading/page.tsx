'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Filter, ChevronRight, ArrowLeft } from 'lucide-react';
import { articles, levelLabel, levelColor } from '@/data/articles';
import type { Article } from '@/data/articles';

export default function ReadingListPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Article['level'] | 'all'>('all');

  const filtered = filter === 'all' ? articles : articles.filter((a) => a.level === filter);

  return (
    <div className="py-4 space-y-4">
      {/* Header */}
      <div>
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} />
          返回首页
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">文章阅读</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          逐句阅读韩语文章，音频跟读，中韩双语解析
        </p>
      </div>

      {/* Level filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
            filter === 'all'
              ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium'
              : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
          }`}
        >
          <Filter size={14} className="inline mr-1" />
          全部
        </button>
        {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setFilter(filter === level ? 'all' : level)}
            className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
              filter === level
                ? `${levelColor[level]} font-medium ring-1 ring-[var(--pink-pale)]`
                : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
            }`}
          >
            {levelLabel[level]}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-xs text-[var(--text-muted)]">
        共 {filtered.length} 篇文章
        {filter !== 'all' && ` / ${levelLabel[filter]}`}
      </p>

      {/* Article cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((article) => (
          <button
            key={article.id}
            onClick={() => router.push(`/reading/${article.id}`)}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-left hover:border-[var(--pink-primary)]/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--pink-primary)]/10 flex items-center justify-center text-2xl">
                {article.emoji}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[article.level]}`}>
                {levelLabel[article.level]}
              </span>
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{article.title}</h3>
            <p className="text-xs text-[var(--text-muted)] mb-2">{article.titleKo}</p>
            <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">{article.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">
                {article.category} · {article.sentences.length} 句
              </span>
              <ChevronRight size={14} className="text-[var(--text-muted)]" />
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen size={40} className="text-[var(--text-placeholder)] mx-auto mb-3" />
          <p className="text-[var(--text-secondary)] text-sm">没有匹配的文章</p>
        </div>
      )}
    </div>
  );
}
