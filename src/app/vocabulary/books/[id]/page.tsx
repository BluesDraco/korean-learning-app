'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Plus, Trash2, Volume2, Search, Loader2 } from 'lucide-react';
import { db } from '@/lib/db';
import { AddToBookModal } from '@/components/AddToBookModal';
import { speak } from '@/lib/tts';
import type { WordBook, Word } from '@/types';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [book, setBook] = useState<WordBook | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const load = useCallback(async () => {
    const b = await db.wordBooks.get(id);
    if (!b) { router.push('/vocabulary/books'); return; }
    setBook(b);
    const loaded = await db.words.bulkGet(b.wordIds);
    setWords(loaded.filter((w): w is Word => w != null));
    setLoading(false);
  }, [id, router]);

  useEffect(() => { load(); }, [load]);

  const handleRemoveWord = async (wordId: string) => {
    if (!book) return;
    const newIds = book.wordIds.filter((wid) => wid !== wordId);
    await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
    setBook({ ...book, wordIds: newIds });
    setWords((prev) => prev.filter((w) => w.id !== wordId));
  };

  const filteredWords = search
    ? words.filter((w) => w.word.includes(search) || w.meaning.includes(search) || w.pronunciation.includes(search))
    : words;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/vocabulary/books" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">{book.name}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {book.description || `${words.length} 个单词`}
          </p>
        </div>
        <Link
          href={`/vocabulary/books/${book.id}/flashcards`}
          className="shrink-0 flex items-center gap-1.5 bg-[var(--pink-primary)] text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <BookOpen size={16} />
          开始学习
        </Link>
      </div>

      {/* Search + Add */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索单词..."
            className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="shrink-0 flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)] transition-colors"
        >
          <Plus size={16} />
          添加
        </button>
      </div>

      {/* Word list */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">📝</span>
          <p className="text-[var(--text-secondary)] text-sm mb-1">
            {search ? '没有找到匹配的单词' : '这个单词本还是空的'}
          </p>
          <p className="text-[var(--text-muted)] text-xs mb-4">
            {search ? '换个关键词试试' : '从单词库中添加单词吧'}
          </p>
          {!search && (
            <button onClick={() => setShowAddModal(true)} className="btn-primary">+ 添加单词</button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredWords.map((word) => {
            const isExpanded = expandedId === word.id;
            const masteryColors: Record<string, string> = {
              new: 'bg-[var(--pink-pale)]', learning: 'bg-[var(--peach-soft)]/80',
              reviewing: 'bg-[var(--pink-primary)]/80', mastered: 'bg-[var(--mint-soft)]/80',
            };
            const masteryLabels: Record<string, string> = {
              new: '新词', learning: '学习中', reviewing: '复习中', mastered: '已掌握',
            };
            return (
              <div
                key={word.id}
                className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] transition-all"
              >
                {/* Collapsed row */}
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : word.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--text-primary)]">{word.word}</span>
                      <span className="text-xs text-[var(--text-muted)]">{word.pronunciation}</span>
                      <span className="text-[13px] px-1.5 py-0.5 rounded bg-[var(--bg-input)] text-[var(--text-secondary)] shrink-0">
                        {word.partOfSpeech}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] truncate mt-0.5">{word.meaning}</div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(word.word, 0.8); }}
                    className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] shrink-0"
                  >
                    <Volume2 size={15} />
                  </button>
                  <span className={`text-[13px] px-2 py-0.5 rounded-full text-[var(--text-primary)]/80 shrink-0 ${masteryColors[word.mastery]}`}>
                    {masteryLabels[word.mastery]}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveWord(word.id); }}
                    className="p-1.5 rounded-lg hover:bg-[var(--color-danger-bg)] text-[var(--text-muted)] hover:text-[var(--color-danger)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="从本中移除"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-2 animate-fade-in">
                    <div className="text-sm font-medium text-[var(--text-primary)]">{word.meaning}</div>
                    {word.examples.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-xs text-[var(--text-muted)]">例句</p>
                        {word.examples.slice(0, 3).map((ex, i) => (
                          <div key={i} className="flex items-start gap-2 bg-[var(--bg-input)] rounded-lg px-3 py-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-[var(--text-primary)]">{ex.text}</p>
                              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.translation}</p>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); speak(ex.text, 0.8); }}
                              className="p-1 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] shrink-0"
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add words modal */}
      {showAddModal && (
        <AddToBookModal
          mode="select-words"
          bookId={book.id}
          onClose={() => setShowAddModal(false)}
          onDone={load}
        />
      )}
    </div>
  );
}
