'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import type { ThemePack } from '@/types';
import { knowledgeCategories } from '@/data/knowledge';

const categoryEmojis: Record<string, string> = {
  '生活场景': '📍',
  '社交表达': '💬',
  '韩流场景': '🎭',
  '旅行韩国': '✈️',
  '职场学习': '💼',
  '职场进阶': '📊',
  '生活进阶': '🏠',
};

export function ThemesSection() {
  const [themes, setThemes] = useState<ThemePack[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('@/data/vocabulary').then(({ getAllThemes, getThemeCategories }) => {
      setThemes(getAllThemes());
      setCategories(getThemeCategories());
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={24} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (themes.length === 0) {
    return (
      <div className="text-center py-16">
        <Sparkles size={40} className="text-[var(--text-placeholder)] mx-auto mb-3" />
        <p className="text-sm text-[var(--text-secondary)]">暂无主题词包</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">词包正在陆续制作中</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {categories.map((cat) => {
        const catThemes = themes.filter((t) => t.category === cat);
        return (
          <div key={cat}>
            <h2 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>{categoryEmojis[cat] || '📦'}</span>
              {cat}
              <span className="text-xs text-[var(--text-muted)] normal-case">({catThemes.length}个词包)</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {catThemes.map((theme) => {
                const wordCount = theme.wordIds.length;
                return (
                  <Link
                    key={theme.id}
                    href={`/vocabulary/themes/${theme.id}`}
                    className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 hover:border-[var(--pink-primary)]/40 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <div className="text-3xl mb-3">{theme.emoji}</div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-tight mb-1">
                      {theme.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-3">
                      {theme.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <BookOpen size={11} />
                        {wordCount}词
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {theme.estimatedMinutes}分钟
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* 基础词汇 — 来自知识分类 */}
      <div className="border-t border-[var(--border-color)] pt-6">
        <h2 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-2">
          <span>📚</span>
          基础词汇
          <span className="text-xs text-[var(--text-muted)] normal-case">({knowledgeCategories.length}个分类)</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {knowledgeCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/knowledge/${cat.slug}`}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 hover:border-[var(--purple-soft)]/50 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-tight mb-0.5">
                {cat.name}
              </h3>
              <p className="text-xs text-[var(--purple-soft)] mb-2">{cat.nameKo}</p>
              <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <BookOpen size={11} />
                {cat.words.length}词
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
