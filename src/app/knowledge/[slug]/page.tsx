'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Lightbulb, Volume2, BookmarkPlus, CheckSquare, Square, ListChecks, X } from 'lucide-react';
import { useState } from 'react';
import { knowledgeCategories } from '@/data/knowledge';
import type { KnowledgeWord } from '@/data/knowledge';
import { knowledgeGroups, knowledgeThemeLinks } from '@/data/knowledge-groups';
import { speak, speakWord } from '@/lib/tts';
import { TappableText } from '@/components/TappableText';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/db';
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export default function KnowledgeCategoryPage() {
  const { lang } = useLang();
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sheetWord, setSheetWord] = useState<KnowledgeWord | null>(null);
  const [addAllBook, setAddAllBook] = useState(false);
  const [addingAll, setAddingAll] = useState(false);
  const [addedAll, setAddedAll] = useState(false);
  const [managing, setManaging] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const category = knowledgeCategories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="py-6 text-center">
        <p className="text-[var(--text-secondary)]">{t('know.category_not_found', lang)}</p>
        <Link href="/vocabulary/library?tab=themes" className="text-[var(--pink-primary)] text-sm mt-4 block">{t('know.back_to_library', lang)}</Link>
      </div>
    );
  }

  const groups = knowledgeGroups[category.slug];
  const themeLink = knowledgeThemeLinks[category.slug];
  const wordById = new Map(category.words.map((w) => [w.id, w]));

  const requireAuth = () => {
    if (authLoading) return false;
    if (!user) { router.push('/auth/login?redirect=' + window.location.pathname); return false; }
    return true;
  };

  const toWordData = (word: KnowledgeWord) => ({
    korean: word.word,
    pronunciation: word.pronunciation,
    meaning: word.meaning,
    partOfSpeech: word.partOfSpeech,
    examples: [{ text: word.example, translation: word.exampleZh }],
    sourceEntryId: word.id,
  });

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => { const s = new Set(prev); if (s.has(id)) s.delete(id); else s.add(id); return s; });
  };
  const allSelected = selectedIds.size === category.words.length;
  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(category.words.map(w => w.id)));
  };
  const exitManage = () => { setManaging(false); setSelectedIds(new Set()); };

  const handleAddToBook = async (bookId: string, wordsToAdd: KnowledgeWord[]) => {
    const [book, allUserWords] = await Promise.all([
      db.wordBooks.get(bookId),
      db.words.toArray(),
    ]);
    if (!book) return;
    const now = Date.now();
    const userWordMap = new Map(allUserWords.map(w => [w.word, w]));
    const existingBookIdSet = new Set(book.wordIds);
    const toInsert: any[] = [];
    const newWordIds: string[] = [];
    for (const word of wordsToAdd) {
      const existing = userWordMap.get(word.word);
      if (!existing) {
        const wordId = crypto.randomUUID();
        toInsert.push({
          id: wordId, word: word.word, pronunciation: word.pronunciation,
          meaning: word.meaning, partOfSpeech: word.partOfSpeech,
          examples: [{ text: word.example, translation: word.exampleZh, source: 'dictionary' as const }],
          sourceEntryId: word.id, mastery: 'new', srsLevel: 0, easeFactor: 2.5, interval: 0,
          nextReview: now, createdAt: now, lastReviewed: null, source: 'library',
        });
        newWordIds.push(wordId);
      } else if (!existingBookIdSet.has(existing.id)) {
        newWordIds.push(existing.id);
      }
    }
    await Promise.all([
      toInsert.length > 0 ? db.words.bulkPut(toInsert).catch(() => {}) : Promise.resolve(),
      newWordIds.length > 0 ? db.wordBooks.update(bookId, { wordIds: [...book.wordIds, ...newWordIds], updatedAt: now }).catch(() => {}) : Promise.resolve(),
    ]);
  };

  const handleAddAllToBook = async (bookId: string) => {
    if (addingAll) return;
    setAddingAll(true);
    try {
      const target = managing && selectedIds.size > 0
        ? category.words.filter(w => selectedIds.has(w.id))
        : category.words;
      await handleAddToBook(bookId, target);
      setAddedAll(true);
      setTimeout(() => setAddedAll(false), 3000);
      exitManage();
    } finally {
      setAddingAll(false);
      setAddAllBook(false);
    }
  };

  const renderWord = (word: KnowledgeWord) => {
    const isExpanded = expandedId === word.id;
    return (
      <div
        key={word.id}
        className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden"
      >
        {/* Main row */}
        <div className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--bg-card-hover)] transition-colors">
          {managing && (
            <button
              onClick={() => toggleSelect(word.id)}
              className="shrink-0 text-[var(--pink-primary)]"
              title={selectedIds.has(word.id) ? t('know.deselect', lang) : t('know.select', lang)}
            >
              {selectedIds.has(word.id)
                ? <CheckSquare size={20} />
                : <Square size={20} className="text-[var(--text-muted)]" />}
            </button>
          )}
          <button
            onClick={() => managing ? toggleSelect(word.id) : setExpandedId(isExpanded ? null : word.id)}
            className="flex-1 flex items-center gap-3 min-w-0 text-left"
          >
            <span className="text-xl shrink-0">{word.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[var(--text-primary)]" style={{ fontSize: 18 }}>{word.word}</span>
                <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded">
                  [{word.pronunciation}]
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-secondary)]">
                  {word.partOfSpeech}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">{word.meaning}</p>
            </div>
          </button>
          {!managing && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); speakWord(word.word); }}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                title={t('know.listen_pronunciation', lang)}
              >
                <Volume2 size={14} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); if (requireAuth()) setSheetWord(word); }}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                title={t('know.add_to_wordbook', lang)}
              >
                <BookmarkPlus size={14} />
              </button>
              <button onClick={() => setExpandedId(isExpanded ? null : word.id)}>
                {isExpanded
                  ? <ChevronUp size={16} className="text-[var(--text-muted)]" />
                  : <ChevronDown size={16} className="text-[var(--text-muted)]" />
                }
              </button>
            </div>
          )}
        </div>

        {/* Expanded detail */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3 animate-slide-up">
            {/* Example */}
            <div className="bg-[var(--bg-input)] rounded-lg p-3 flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">{t('know.example', lang)}</p>
                <TappableText text={word.example} className="text-sm text-[var(--text-primary)]" source="基础词汇" />
                <p className="text-xs text-[var(--text-secondary)] mt-1">{word.exampleZh}</p>
              </div>
              <button
                onClick={() => speak(word.example)}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                title={t('know.listen_example', lang)}
              >
                <Volume2 size={14} />
              </button>
            </div>

            {/* Usage note */}
            {word.note && (
              <div className="flex items-start gap-3 rounded-lg p-3 bg-[var(--peach-soft)]/8 border border-[var(--peach-soft)]/15">
                <Lightbulb size={14} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-[var(--peach-soft)] font-medium mb-0.5">{t('know.usage_note', lang)}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{word.note}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-4 space-y-4">
      {/* Header */}
      <div>
        <Link href="/vocabulary/library?tab=themes" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} />
          {t('know.back_to_library', lang)}
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">{category.name}</h1>
              <span className="text-sm text-[var(--text-muted)]">{category.nameKo}</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">{category.description} · {t('know.n_words', lang, { n: category.words.length })}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        {!managing ? (
          <>
            <button
              onClick={() => { if (requireAuth()) setAddAllBook(true); }}
              disabled={addingAll}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)] hover:text-[var(--pink-primary)] transition-colors disabled:opacity-50"
            >
              <BookmarkPlus size={15} />
              {addedAll ? t('know.added', lang) : t('know.add_all_to_wordbook', lang)}
            </button>
            <button
              onClick={() => { if (requireAuth()) setManaging(true); }}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)] hover:text-[var(--pink-primary)] transition-colors"
            >
              <ListChecks size={15} />
              {t('know.select', lang)}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={toggleSelectAll}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)] hover:text-[var(--pink-primary)] transition-colors"
            >
              {allSelected ? <CheckSquare size={15} /> : <Square size={15} />}
              {allSelected ? t('know.deselect_all', lang) : t('know.select_all', lang)}
            </button>
            <button
              onClick={() => { if (selectedIds.size > 0) setAddAllBook(true); }}
              disabled={selectedIds.size === 0 || addingAll}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-[var(--pink-primary)] text-white transition-colors disabled:opacity-40"
            >
              <BookmarkPlus size={15} />
              {t('know.add_n', lang, { n: selectedIds.size })}
            </button>
            <button
              onClick={exitManage}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors ml-auto"
            >
              <X size={15} />
              {t('know.cancel', lang)}
            </button>
          </>
        )}
      </div>

      {/* Word list */}
      {groups ? (
        <div className="space-y-5">
          {groups.map((group) => (
            <div key={group.label}>
              <h2 className="text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                <span>{group.emoji}</span>
                {group.label}
                <span className="text-xs text-[var(--text-muted)]">({group.wordIds.length})</span>
              </h2>
              <div className="space-y-2">
                {group.wordIds.map((id) => {
                  const word = wordById.get(id);
                  return word ? renderWord(word) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {category.words.map((word) => renderWord(word))}
        </div>
      )}

      {/* 跨板块引导：背完名词 → 场景对话 */}
      {themeLink && (
        <Link
          href={`/vocabulary/themes/${themeLink.themeId}`}
          className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 hover:border-[var(--pink-primary)]/40 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200 group"
        >
          <span className="text-3xl shrink-0">{themeLink.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[var(--text-muted)] mb-0.5">{t('know.try_scene_dialogue', lang)}</p>
            <p className="font-semibold text-sm text-[var(--text-primary)]">{themeLink.name}</p>
          </div>
          <ArrowRight size={18} className="text-[var(--text-muted)] group-hover:text-[var(--pink-primary)] transition-colors shrink-0" />
        </Link>
      )}

      {/* Single word sheet */}
      {sheetWord && (
        <AddToBookSheet
          word={toWordData(sheetWord)}
          onClose={() => setSheetWord(null)}
        />
      )}

      {/* Add-all / batch sheet */}
      {addAllBook && (
        <AddToBookSheet
          word={{ korean: '', pronunciation: '', meaning: '', partOfSpeech: '' }}
          title={managing && selectedIds.size > 0 ? t('know.add_n_words', lang, { n: selectedIds.size }) : t('know.add_all_n_words', lang, { n: category.words.length })}
          onClose={() => setAddAllBook(false)}
          onSelectBook={handleAddAllToBook}
        />
      )}
    </div>
  );
}
