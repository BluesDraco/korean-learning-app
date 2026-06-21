'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Search, Trash2, Volume2, CheckSquare, Square,
  FolderInput, X, ChevronDown, ChevronUp, Plus, Loader2,
} from 'lucide-react';
import { db } from '@/lib/db';
import { speak, speakWord } from '@/lib/tts';
import { TappableText } from '@/components/TappableText';
import { getEntryByKorean } from '@/data/vocabulary/index';
import type { Word, WordBook, WordEntry } from '@/types';

export default function ReviewPoolPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [managing, setManaging] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [wordBooks, setWordBooks] = useState<WordBook[]>([]);
  const [showImportSheet, setShowImportSheet] = useState(false);
  const [showMoveSheet, setShowMoveSheet] = useState(false);
  const [importingBook, setImportingBook] = useState<string | null>(null);
  const [entriesMap, setEntriesMap] = useState<Map<string, WordEntry>>(new Map());

  useEffect(() => {
    const needEntry = words.filter(w => {
      const valid = w.examples.filter(ex => ex.text && ex.text !== '[object Object]');
      return valid.length === 0;
    });
    (async () => {
      const uniqueWords = [...new Set(needEntry.map(w => w.word))];
      const results = await Promise.all(uniqueWords.map(w => getEntryByKorean(w)));
      const map = new Map<string, WordEntry>();
      uniqueWords.forEach((w, i) => { if (results[i]) map.set(w, results[i]!); });
      setEntriesMap(map);
    })();
  }, [words]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const now = Date.now();
      const due = await db.words.where('nextReview').belowOrEqual(now).toArray()
        .then(ws => ws.filter(w => w.mastery !== 'mastered'));
      setWords(due);
    } catch {
      // db error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    db.wordBooks.toArray().then(setWordBooks);
  }, []);

  const filteredWords = useMemo(() => {
    if (!search.trim()) return words;
    const q = search.toLowerCase();
    return words.filter(w =>
      w.word.includes(q) || w.meaning.includes(q) || w.pronunciation.includes(q)
    );
  }, [words, search]);

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === filteredWords.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredWords.map(w => w.id)));
    }
  };

  const handleBatchDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`确定删除这 ${selected.size} 个单词？此操作不可撤销。`)) return;
    await Promise.all([...selected].map(id => db.words.delete(id)));
    // Remove deleted wordIds from all word books
    const allBooks = await db.wordBooks.toArray();
    await Promise.all(allBooks.map(book => {
      const newIds = book.wordIds.filter(wid => !selected.has(wid));
      if (newIds.length !== book.wordIds.length) {
        return db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
      }
    }));
    setWords(prev => prev.filter(w => !selected.has(w.id)));
    setSelected(new Set());
    setManaging(false);
  };

  const handleMoveToBook = async (bookId: string) => {
    if (selected.size === 0) return;
    try {
      const book = await db.wordBooks.get(bookId);
      if (!book) return;
      const newIds = [...new Set([...book.wordIds, ...[...selected]])];
      await db.wordBooks.update(bookId, { wordIds: newIds, updatedAt: Date.now() });
      setShowMoveSheet(false);
      setSelected(new Set());
      setManaging(false);
    } catch {
      setShowMoveSheet(false);
    }
  };

  const handleImportFromBook = async (bookId: string) => {
    if (importingBook) return;
    setImportingBook(bookId);
    try {
      const book = await db.wordBooks.get(bookId);
      if (!book) return;
      const bookWords = await db.words.where('id').anyOf(book.wordIds).toArray();
      const now = Date.now();
      const existing = new Set(words.map(w => w.word));
      const toImport = bookWords.filter((w): w is Word => w != null && !existing.has(w.word));
      for (const w of toImport) {
        await db.words.update(w.id, { nextReview: now });
      }
      await load();
    } finally {
      setImportingBook(null);
      setShowImportSheet(false);
    }
  };

  const masteryLabels: Record<string, string> = {
    new: '新词', learning: '学习中', reviewing: '复习中', mastered: '已掌握',
  };
  const masteryColors: Record<string, string> = {
    new: 'bg-[var(--pink-primary)]/8 text-[var(--pink-primary)]',
    learning: 'bg-[var(--peach-soft)]/15 text-[var(--peach-soft)]',
    reviewing: 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]',
    mastered: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  return (
    <div className="py-4 space-y-4 pb-32">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/vocabulary" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">待复习词库</h1>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">共 {words.length} 个单词到期待复习</p>
        </div>
        <Link
          href="/review"
          className="shrink-0 flex items-center gap-1.5 bg-[var(--pink-primary)] text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          开始复习
        </Link>
      </div>

      {/* Search + Import + Manage */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜索单词..."
            className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
          />
        </div>
        {!managing && (
          <button
            onClick={() => setShowImportSheet(true)}
            className="shrink-0 flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)] transition-colors"
          >
            <Plus size={15} />导入
          </button>
        )}
        <button
          onClick={() => { setManaging(!managing); setSelected(new Set()); }}
          className={`shrink-0 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${managing ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]'}`}
        >
          {managing ? '取消' : '管理'}
        </button>
      </div>

      {/* Word list */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">🎉</span>
          <p className="text-[var(--text-secondary)] text-sm mb-1">
            {search ? '没有找到匹配的单词' : '暂无待复习单词'}
          </p>
          <p className="text-[var(--text-muted)] text-xs">
            {search ? '换个关键词试试' : '所有单词都已复习完成'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {managing && (
            <button onClick={toggleSelectAll} className="text-xs text-[var(--pink-primary)] font-medium">
              {selected.size === filteredWords.length ? '取消全选' : `全选 (${filteredWords.length})`}
            </button>
          )}
          {filteredWords.map(word => {
            const isExpanded = expandedId === word.id;
            return (
              <div
                key={word.id}
                className={`bg-[var(--bg-card)] rounded-xl border overflow-hidden transition-all ${selected.has(word.id) ? 'border-[var(--pink-primary)] bg-[var(--pink-primary)]/5' : 'border-[var(--border-color)]'}`}
                onClick={managing ? () => toggleSelect(word.id) : undefined}
              >
                <div
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[var(--bg-card-hover)] transition-colors"
                  onClick={managing ? undefined : () => setExpandedId(isExpanded ? null : word.id)}
                >
                  {managing && (
                    <div className="shrink-0 text-[var(--pink-primary)]">
                      {selected.has(word.id) ? <CheckSquare size={18} /> : <Square size={18} className="text-[var(--text-muted)]" />}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[var(--text-primary)] text-sm">{word.word}</span>
                      <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded">
                        [{word.pronunciation}]
                      </span>
                      {word.partOfSpeech && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-secondary)] shrink-0">
                          {word.partOfSpeech}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[var(--text-secondary)] truncate">{word.meaning}</span>
                      {!managing && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 font-medium ${masteryColors[word.mastery]}`}>
                          {masteryLabels[word.mastery]}
                        </span>
                      )}
                    </div>
                  </div>
                  {!managing && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={e => { e.stopPropagation(); speakWord(word.word, 0.8); }}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                      >
                        <Volume2 size={14} />
                      </button>
                      <button
                        onClick={async e => {
                          e.stopPropagation();
                          if (!confirm(`删除「${word.word}」？`)) return;
                          await db.words.delete(word.id);
                          const allBooks = await db.wordBooks.toArray();
                          await Promise.all(allBooks.map(book => {
                            const newIds = book.wordIds.filter(wid => wid !== word.id);
                            if (newIds.length !== book.wordIds.length) {
                              return db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
                            }
                          }));
                          setWords(prev => prev.filter(w => w.id !== word.id));
                        }}
                        className="p-1.5 rounded-lg hover:bg-[var(--color-danger-bg)] text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                      {isExpanded ? <ChevronUp size={14} className="text-[var(--text-muted)]" /> : <ChevronDown size={14} className="text-[var(--text-muted)]" />}
                    </div>
                  )}
                </div>

                {isExpanded && (() => {
                  const validExamples = word.examples.filter(ex => ex.text && ex.text !== '[object Object]');
                  const entry = validExamples.length === 0 ? entriesMap.get(word.word) : null;
                  const examples = validExamples.length > 0
                    ? validExamples
                    : entry?.examples.slice(0, 3).map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })) ?? [];
                  return (
                    <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-2 animate-fade-in">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{word.meaning}</p>
                      {examples.length > 0 && (
                        <div className="space-y-1.5">
                          {examples.slice(0, 3).map((ex, i) => (
                            <div key={i} className="flex items-start gap-2 bg-[var(--bg-input)] rounded-lg px-3 py-2">
                              <div className="flex-1 min-w-0">
                                <TappableText text={ex.text} className="text-sm text-[var(--text-primary)]" source="待复习词库" highlightWord={word.word} />
                                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.translation}</p>
                              </div>
                              <button
                                onClick={e => { e.stopPropagation(); speak(ex.text, 0.8); }}
                                className="p-1 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] shrink-0"
                              >
                                <Volume2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>
      )}

      {/* Batch action bar */}
      {managing && selected.size > 0 && (
        <div
          className="fixed left-0 right-0 z-[60] flex items-center justify-center px-4 md:left-[108px]"
          style={{ bottom: 'calc(56px + env(safe-area-inset-bottom, 0px) + 12px)' }}
        >
          <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-4 py-3 shadow-lg">
            <span className="text-xs text-[var(--text-secondary)]">已选 {selected.size} 个</span>
            <button
              onClick={() => setShowMoveSheet(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-input)] text-sm text-[var(--text-primary)]"
            >
              <FolderInput size={15} />加入单词本
            </button>
            <button
              onClick={handleBatchDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-danger-bg)] text-sm text-[var(--color-danger)]"
            >
              <Trash2 size={15} />删除
            </button>
          </div>
        </div>
      )}

      {/* Import from book sheet */}
      {showImportSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }} onClick={() => setShowImportSheet(false)}>
          <div
            className="w-full max-w-lg bg-[var(--bg-card)] rounded-t-2xl px-5 pt-5 pb-5 flex flex-col"
            style={{ maxHeight: '65dvh' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between shrink-0 mb-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">从单词本导入到复习队列</p>
              <button onClick={() => setShowImportSheet(false)} className="p-1 text-[var(--text-muted)]"><X size={18} /></button>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-3">将单词本中还未到复习期的单词立即加入今日复习</p>
            <div className="overflow-y-auto flex-1 min-h-0 space-y-2 pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
              {wordBooks.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)] py-4 text-center">还没有单词本</p>
              ) : wordBooks.map(book => (
                <button
                  key={book.id}
                  onClick={() => handleImportFromBook(book.id)}
                  disabled={!!importingBook}
                  className="w-full text-left px-4 py-3 rounded-xl bg-[var(--bg-input)] text-sm flex items-center gap-3 transition-colors hover:bg-[var(--bg-accent)] disabled:opacity-60"
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: book.color || 'var(--pink-primary)' }} />
                  <span className="flex-1 text-[var(--text-primary)] truncate">{book.name}</span>
                  <span className="text-xs text-[var(--text-muted)]">{book.wordIds.length} 词</span>
                  {importingBook === book.id && <Loader2 size={14} className="animate-spin text-[var(--text-muted)]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Move to book sheet */}
      {showMoveSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }} onClick={() => setShowMoveSheet(false)}>
          <div
            className="w-full max-w-lg bg-[var(--bg-card)] rounded-t-2xl px-5 pt-5 pb-5 flex flex-col"
            style={{ maxHeight: '65dvh' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between shrink-0 mb-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">加入单词本</p>
              <button onClick={() => setShowMoveSheet(false)} className="p-1 text-[var(--text-muted)]"><X size={18} /></button>
            </div>
            <div className="overflow-y-auto flex-1 min-h-0 space-y-2 pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
              {wordBooks.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)] py-4 text-center">还没有单词本</p>
              ) : wordBooks.map(book => (
                <button
                  key={book.id}
                  onClick={() => handleMoveToBook(book.id)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-[var(--bg-input)] text-sm flex items-center gap-3 transition-colors hover:bg-[var(--bg-accent)]"
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: book.color || 'var(--pink-primary)' }} />
                  <span className="flex-1 text-[var(--text-primary)] truncate">{book.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
