'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import type { ThemePack } from '@/types';
import { knowledgeCategories } from '@/data/knowledge';

const categoryEmojiKeys: Record<string, string> = {
  '生活场景': 'vocab.cat_life',
  '社交表达': 'vocab.cat_social',
  '韩流场景': 'vocab.cat_hallyu',
  '旅行韩国': 'vocab.cat_travel',
  '职场学习': 'vocab.cat_work',
  '职场进阶': 'vocab.cat_work_adv',
  '生活进阶': 'vocab.cat_life_adv',
};

// categoryEmojis still used for display name lookup — the keys are the Chinese names,
// which now map to i18n keys via categoryEmojiKeys
const categoryEmojis: Record<string, string> = {
  '生活场景': '📍',
  '社交表达': '💬',
  '韩流场景': '🎭',
  '旅行韩国': '✈️',
  '职场学习': '💼',
  '职场进阶': '📊',
  '生活进阶': '🏠',
};

const difficultyLabelKey: Record<string, string> = {
  beginner: 'vocab.th_diff_beginner',
  intermediate: 'vocab.th_diff_intermediate',
  advanced: 'vocab.th_diff_advanced',
};

const difficultyBg: Record<string, { color: string; bg: string }> = {
  beginner:     { color: 'var(--mint-soft)',    bg: 'color-mix(in srgb, var(--mint-soft) 15%, transparent)' },
  intermediate: { color: 'var(--pink-primary)', bg: 'color-mix(in srgb, var(--pink-primary) 12%, transparent)' },
  advanced:     { color: 'var(--purple-soft)',  bg: 'color-mix(in srgb, var(--purple-soft) 15%, transparent)' },
};

type ThemeProgress = { mastered: number; learning: number };

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
        <p className="text-sm text-[var(--text-secondary)]">{t('vocab.th_no_packs', lang)}</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">{t('vocab.th_packs_wip', lang)}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {categories.map((cat) => {
        const catThemes = themes.filter((th) => th.category === cat);
        return (
          <div key={cat}>
            <h2 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>{categoryEmojis[cat] || '📦'}</span>
              {t(categoryEmojiKeys[cat] || 'vocab.cat_life', lang)}
              <span className="text-xs text-[var(--text-muted)] normal-case">{t('vocab.th_pack_count', lang, { n: catThemes.length })}</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {catThemes.map((theme) => {
                const prog = progress.get(theme.id);
                const total = theme.wordIds?.length ?? 0;
                const mastered = prog?.mastered ?? 0;
                const learning = prog?.learning ?? 0;
                const done = mastered + learning;
                const hasProgress = !!prog;
                const isCompleted = hasProgress && total > 0 && mastered >= total;
                const diff = theme.difficulty;
                const diffStyle = diff ? difficultyBg[diff] : undefined;

                return (
                  <Link
                    key={theme.id}
                    href={`/vocabulary/themes/${theme.id}`}
                    className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 hover:border-[var(--pink-primary)]/40 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200 group flex flex-col"
                  >
                    {/* Emoji + difficulty badge */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-3xl" aria-hidden="true">{theme.emoji}</div>
                      {diff && diffStyle && (
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md shrink-0"
                          style={{ color: diffStyle.color, background: diffStyle.bg }}
                        >
                          {t(difficultyLabelKey[diff], lang)}
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-tight mb-1">
                      {theme.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[var(--text-muted)] line-clamp-1 mb-2">
                      {theme.description}
                    </p>

                    {/* Preview word chips */}
                    {theme.previewWords && theme.previewWords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {theme.previewWords.slice(0, 3).map((w) => (
                          <span
                            key={w}
                            className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-secondary)]"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bottom: progress bar or static meta */}
                    <div className="mt-auto">
                      {hasProgress && total > 0 ? (
                        <>
                          <div className="flex justify-between text-[11px] mb-1.5">
                            <span className="text-[var(--text-muted)]">
                              {isCompleted ? t('vocab.th_completed', lang) : t('vocab.th_learned', lang, { done, total })}
                            </span>
                            <span style={{ color: isCompleted ? 'var(--mint-soft)' : 'var(--text-muted)' }}>
                              {isCompleted ? '✓' : `${Math.round((done / total) * 100)}%`}
                            </span>
                          </div>
                          <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5 flex overflow-hidden">
                            <div
                              className="h-full rounded-l-full transition-all duration-500"
                              style={{ width: `${(mastered / total) * 100}%`, backgroundColor: 'var(--mint-soft)' }}
                            />
                            <div
                              className="h-full transition-all duration-500"
                              style={{ width: `${(learning / total) * 100}%`, backgroundColor: 'var(--peach-soft)' }}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <BookOpen size={11} />
                            {t('vocab.th_n_words', lang, { n: total })}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare size={11} />
                            {t('vocab.th_n_sentences', lang, { n: theme.sentences.length + (theme.dialogues?.length || 0) })}
                          </span>
                        </div>
                      )}
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
