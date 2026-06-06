'use client';

import Link from 'next/link';
import { Library, ArrowRight, Search, X, BookOpen, UtensilsCrossed, Plane } from 'lucide-react';
import { useState, useMemo } from 'react';
import { knowledgeCategories } from '@/data/knowledge';
import { ARTICLES } from '@/data/articleMeta';

const TOPIC_TABS = [
  { key: 'culture', label: '韩国文化', icon: BookOpen, color: 'var(--pink-primary)', href: '/korea/culture', count: ARTICLES.filter((a) => a.category === 'culture').length },
  { key: 'food', label: '韩国美食', icon: UtensilsCrossed, color: 'var(--peach-soft)', href: '/korea/food', count: ARTICLES.filter((a) => a.category === 'food').length },
  { key: 'travel', label: '韩国旅行', icon: Plane, color: 'var(--mint-soft)', href: '/korea/travel', count: ARTICLES.filter((a) => a.category === 'travel').length },
];

export default function KnowledgePage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return knowledgeCategories;
    const q = search.trim().toLowerCase();
    return knowledgeCategories.filter(
      (cat) =>
        cat.name.includes(q) ||
        cat.nameKo.includes(q) ||
        cat.description.includes(q) ||
        cat.words.some((w) => w.word.includes(q) || w.meaning.includes(q) || w.pronunciation.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="py-4 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">韩国小知识</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          文化 · 美食 · 旅行 · 词汇，从感兴趣的话题了解韩国
        </p>
      </div>

      {/* Topic cards — culture, food, travel */}
      <div className="grid grid-cols-3 gap-3">
        {TOPIC_TABS.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 hover:border-[var(--pink-pale)] hover:shadow-md transition-all text-center group"
          >
            <tab.icon size={24} className="mx-auto mb-2" style={{ color: tab.color }} />
            <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--pink-primary)] transition-colors">
              {tab.label}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{tab.count} 篇文章</div>
          </Link>
        ))}
      </div>

      {/* Featured articles */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">近期文章</h2>
          <Link href="/korea/culture" className="text-[11px] text-[var(--pink-primary)] hover:underline flex items-center gap-0.5">
            全部文章 <ArrowRight size={11} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ARTICLES.slice(0, 4).map((article) => (
            <Link
              key={article.slug}
              href={`/korea/${article.category}/${article.slug}`}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--pink-pale)] hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: article.color + '18', color: article.color }}
                >
                  {article.tag.slice(0, 3)}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">{article.readTime}</span>
              </div>
              <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--pink-primary)] transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-1">{article.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--border-color)]" />

      {/* Original vocabulary knowledge base */}
      <div>
        <h2 className="text-sm font-bold text-[var(--text-primary)] mb-1">分类词汇</h2>
        <p className="text-xs text-[var(--text-muted)] mb-3">
          {knowledgeCategories.length} 个分类 · 每个单词配有罗马音、例句和用法提示
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索分类或单词..."
          className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-3 pl-10 pr-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={14} />
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Library size={48} className="text-[var(--text-placeholder)] mx-auto mb-4" />
          <p className="text-[var(--text-muted)]">没有找到匹配的分类</p>
        </div>
      )}

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((cat) => (
          <Link
            key={cat.id}
            href={`/knowledge/${cat.slug}`}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 hover:border-[var(--pink-primary)]/40 hover:bg-[var(--bg-input)]/50 transition-all group"
          >
            <div className="text-5xl mb-4">{cat.emoji}</div>
            <h3 className="text-[var(--text-primary)] font-bold text-lg group-hover:text-[var(--pink-primary)] transition-colors">
              {cat.name}
            </h3>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">{cat.nameKo}</p>
            <p className="text-xs text-[var(--text-placeholder)] mt-2 line-clamp-2 leading-relaxed">{cat.description}</p>
            <div className="flex items-center gap-1 mt-3 text-xs text-[var(--pink-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
              <span>{cat.words.length} 个单词</span>
              <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
