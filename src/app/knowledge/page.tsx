'use client';

import Link from 'next/link';
import { Library, ArrowRight, Search, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { knowledgeCategories } from '@/data/knowledge';

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
    <div className="py-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">知识库</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          按分类学习韩语单词 · {knowledgeCategories.length} 个分类 · 每个单词配有罗马音、例句和用法提示
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

      {/* Category Grid - 2 cols mobile, 3 md, 4 lg */}
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
