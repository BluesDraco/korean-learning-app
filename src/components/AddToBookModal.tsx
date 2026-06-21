'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { HighlightedExample } from '@/components/vocabulary/HighlightedExample';
import { X, Search, Check, Plus, Loader2, Volume2, AlertCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { searchEntries } from '@/data/vocabulary/index';
import { speakWord } from '@/lib/tts';
import type { WordBook, Word, WordEntry } from '@/types';

interface Props {
  mode: 'select-books' | 'select-words';
  preSelectedWordIds?: string[];
  bookId?: string;
  onClose: () => void;
  onDone: () => void;
}

type ResultItem =
  | { kind: 'saved'; word: Word }
  | { kind: 'entry'; entry: WordEntry };

interface LookupResult {
  korean: string;
  romanization: string;
  meaning: string;
  partOfSpeech: string;
  examples: { korean: string; chinese: string }[];
}

function entryToWord(entry: WordEntry): Word {
  return {
    id: crypto.randomUUID(),
    word: entry.korean,
    pronunciation: entry.romanization,
    meaning: entry.meanings[0]?.chinese ?? '',
    partOfSpeech: entry.partOfSpeech,
    examples: entry.examples.slice(0, 3).map((ex) => ({
      text: ex.korean,
      translation: ex.chinese,
      source: 'manual' as const,
    })),
    sourceEntryId: entry.id,
    source: 'library',
    mastery: 'new',
    srsLevel: 0,
    nextReview: Date.now(),
    easeFactor: 2.5,
    interval: 0,
    createdAt: Date.now(),
    lastReviewed: null,
  };
}

function lookupToWord(result: LookupResult): Word {
  return {
    id: crypto.randomUUID(),
    word: result.korean,
    pronunciation: result.romanization,
    meaning: result.meaning,
    partOfSpeech: result.partOfSpeech,
    examples: result.examples.map((ex) => ({
      text: ex.korean,
      translation: ex.chinese,
      source: 'manual' as const,
    })),
    source: 'manual',
    mastery: 'new',
    srsLevel: 0,
    nextReview: Date.now(),
    easeFactor: 2.5,
    interval: 0,
    createdAt: Date.now(),
    lastReviewed: null,
  };
}

export function AddToBookModal({ mode, preSelectedWordIds, bookId, onClose, onDone }: Props) {
  const [books, setBooks] = useState<WordBook[]>([]);
  const [savedWords, setSavedWords] = useState<Word[]>([]);
  const [search, setSearch] = useState('');
  const [selectedBookIds, setSelectedBookIds] = useState<Set<string>>(new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const selectedEntriesRef = React.useRef<Map<string, WordEntry>>(new Map());
  const [loading, setLoading] = useState(true);

  // Manual input tab state
  const [inputTab, setInputTab] = useState<'search' | 'manual'>('search');
  const [manualInput, setManualInput] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
  const [lookupError, setLookupError] = useState('');
  const [manualSaving, setManualSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (mode === 'select-books') {
        setBooks(await db.wordBooks.orderBy('createdAt').reverse().toArray());
      } else if (bookId) {
        const book = await db.wordBooks.get(bookId);
        const all = await db.words.orderBy('createdAt').reverse().toArray();
        const existingIds = new Set(book?.wordIds || []);
        setSavedWords(all.filter((w) => !existingIds.has(w.id)));
      }
      setLoading(false);
    };
    load();
  }, [mode, bookId]);

  const [results, setResults] = useState<ResultItem[]>([]);

  useEffect(() => {
    if (mode !== 'select-words') { setResults([]); return; }
    if (!search.trim()) {
      setResults(savedWords.map((w) => ({ kind: 'saved', word: w })));
      return;
    }
    (async () => {
      const q = search.trim();
      const savedMatches = savedWords.filter(
        (w) => w.word.includes(q) || w.meaning.includes(q) || w.pronunciation.includes(q)
      );
      const savedKorean = new Set(savedMatches.map((w) => w.word));
      const entryMatches = (await searchEntries(q))
        .filter((e) => !savedKorean.has(e.korean))
        .slice(0, 50);
      setResults([
        ...savedMatches.map((w): ResultItem => ({ kind: 'saved', word: w })),
        ...entryMatches.map((e): ResultItem => ({ kind: 'entry', entry: e })),
      ]);
    })();
  }, [search, savedWords, mode]);

  const handleLookup = async () => {
    if (!manualInput.trim()) return;
    setLookupLoading(true);
    setLookupResult(null);
    setLookupError('');
    try {
      const res = await fetch('/api/ai/word-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: manualInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setLookupError('请先登录后再查词');
        } else {
          setLookupError(data.error || '查询失败，请重试');
        }
      } else {
        setLookupResult(data);
      }
    } catch {
      setLookupError('网络异常，请重试');
    } finally {
      setLookupLoading(false);
    }
  };

  const handleManualSave = async () => {
    if (!lookupResult || !bookId) return;
    setManualSaving(true);
    try {
      const book = await db.wordBooks.get(bookId);
      if (!book) return;
      // Check if korean word already exists
      const existingWord = await db.words.where('word').equals(lookupResult.korean).first();
      let wordId: string;
      if (existingWord) {
        wordId = existingWord.id;
      } else {
        const newWord = lookupToWord(lookupResult);
        await db.words.add(newWord);
        wordId = newWord.id;
      }
      if (!book.wordIds.includes(wordId)) {
        await db.wordBooks.update(bookId, {
          wordIds: [...book.wordIds, wordId],
          updatedAt: Date.now(),
        });
      }
      onDone();
      onClose();
    } catch {
      setLookupError('保存失败，请重试');
    } finally {
      setManualSaving(false);
    }
  };

  const handleSave = async () => {
    if (mode === 'select-books' && preSelectedWordIds) {
      for (const bid of selectedBookIds) {
        const book = await db.wordBooks.get(bid);
        if (book) {
          const existing = new Set(book.wordIds);
          for (const wid of preSelectedWordIds) {
            if (!existing.has(wid)) book.wordIds.push(wid);
          }
          await db.wordBooks.update(bid, { wordIds: book.wordIds, updatedAt: Date.now() });
        }
      }
    } else if (mode === 'select-words' && bookId) {
      const book = await db.wordBooks.get(bookId);
      if (!book) return;
      const existing = new Set(book.wordIds);
      const newWordIds: string[] = [];
      for (const id of selectedIds) {
        const saved = savedWords.find((w) => w.id === id);
        if (saved) {
          if (!existing.has(saved.id)) newWordIds.push(saved.id);
          continue;
        }
        const entry = selectedEntriesRef.current.get(id);
        if (entry) {
          const existingWord = await db.words.where('word').equals(entry.korean).first();
          if (existingWord) {
            if (!existing.has(existingWord.id)) newWordIds.push(existingWord.id);
          } else {
            const newWord = entryToWord(entry);
            await db.words.add(newWord);
            newWordIds.push(newWord.id);
          }
        }
      }
      for (const wid of newWordIds) {
        if (!existing.has(wid)) book.wordIds.push(wid);
      }
      await db.wordBooks.update(bookId, { wordIds: book.wordIds, updatedAt: Date.now() });
    }
    onDone();
    onClose();
  };

  const toggleBook = (id: string) => {
    setSelectedBookIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleItem = (id: string, entry?: WordEntry) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        selectedEntriesRef.current.delete(id);
      } else {
        next.add(id);
        if (entry) selectedEntriesRef.current.set(id, entry);
      }
      return next;
    });
  };

  const filteredBooks = search ? books.filter((b) => b.name.includes(search)) : books;

  return (
    <div className="fixed inset-x-0 bottom-0 top-0 z-[100] flex items-end sm:items-center justify-center"
      style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div
        className="relative bg-[var(--bg-card)] rounded-t-3xl sm:rounded-2xl border border-[var(--border-color)] shadow-xl w-full sm:max-w-md flex flex-col animate-slide-up-drawer"
        style={{ maxHeight: 'calc(100dvh - 56px - env(safe-area-inset-bottom, 0px))', pointerEvents: 'auto', touchAction: 'pan-y' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            {mode === 'select-books' ? '添加到单词本' : '添加单词'}
          </h2>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={20} />
          </button>
        </div>

        {/* Tab switcher (only for select-words mode) */}
        {mode === 'select-words' && (
          <div className="px-5 pb-3 shrink-0">
            <div className="flex gap-1 bg-[var(--bg-input)] rounded-xl p-1">
              <button
                onClick={() => setInputTab('search')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  inputTab === 'search'
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                搜索词库
              </button>
              <button
                onClick={() => setInputTab('manual')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  inputTab === 'manual'
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                手动输入
              </button>
            </div>
          </div>
        )}

        {/* Manual input tab */}
        {mode === 'select-words' && inputTab === 'manual' ? (
          <div
            className="flex-1 min-h-0 overflow-y-auto px-5 pb-4 space-y-4"
            style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
          >
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-2">输入韩文或中文，AI 自动补全翻译和发音</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => { setManualInput(e.target.value); setLookupResult(null); setLookupError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                  placeholder="如：안녕하세요 或 你好"
                  className="flex-1 bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-2.5 px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
                />
                <button
                  onClick={handleLookup}
                  disabled={!manualInput.trim() || lookupLoading}
                  className="px-4 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white text-sm font-medium disabled:opacity-40 transition-opacity shrink-0"
                >
                  {lookupLoading ? <Loader2 size={16} className="animate-spin" /> : '查询'}
                </button>
              </div>
            </div>

            {/* Error */}
            {lookupError && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100">
                <AlertCircle size={15} className="text-red-400 shrink-0" />
                <p className="text-xs text-red-500">{lookupError}</p>
              </div>
            )}

            {/* Loading skeleton */}
            {lookupLoading && (
              <div className="bg-[var(--bg-input)] rounded-2xl p-4 space-y-2 animate-pulse">
                <div className="h-6 w-24 bg-[var(--border-color)] rounded" />
                <div className="h-4 w-32 bg-[var(--border-color)] rounded" />
                <div className="h-4 w-full bg-[var(--border-color)] rounded" />
                <div className="h-4 w-3/4 bg-[var(--border-color)] rounded" />
              </div>
            )}

            {/* Result preview */}
            {lookupResult && !lookupLoading && (
              <div className="bg-[var(--bg-input)] rounded-2xl p-4 space-y-3">
                {/* Word header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[var(--text-primary)]">{lookupResult.korean}</span>
                      <button
                        onClick={() => speakWord(lookupResult.korean, 0.85)}
                        className="p-1.5 rounded-lg bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors"
                      >
                        <Volume2 size={15} />
                      </button>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{lookupResult.romanization}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[var(--bg-card)] text-[var(--text-secondary)] shrink-0 border border-[var(--border-color)]">
                    {lookupResult.partOfSpeech}
                  </span>
                </div>

                {/* Meaning */}
                <p className="text-sm font-medium text-[var(--text-primary)]">{lookupResult.meaning}</p>

                {/* Examples */}
                {lookupResult.examples.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-[var(--text-muted)]">例句</p>
                    {lookupResult.examples.map((ex, i) => (
                      <div key={i} className="bg-[var(--bg-card)] rounded-xl px-3 py-2 flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <HighlightedExample text={ex.korean} word={lookupResult.korean} className="text-sm text-[var(--text-primary)]" />
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.chinese}</p>
                        </div>
                        <button
                          onClick={() => speakWord(ex.korean, 0.85)}
                          className="p-1 text-[var(--text-muted)] hover:text-[var(--pink-primary)] shrink-0"
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Confirm button */}
                <button
                  onClick={handleManualSave}
                  disabled={manualSaving}
                  className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--pink-primary)] hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-1.5"
                >
                  {manualSaving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
                  {manualSaving ? '添加中...' : '添加这个单词'}
                </button>
              </div>
            )}

            {/* Empty hint */}
            {!lookupResult && !lookupLoading && !lookupError && (
              <div className="text-center py-8 space-y-1">
                <p className="text-sm text-[var(--text-muted)]">支持韩文和中文输入</p>
                <p className="text-xs text-[var(--text-muted)]">例：학교 / 학교 / 学校</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Search bar */}
            <div className="px-5 pb-3 shrink-0">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={mode === 'select-books' ? '搜索单词本...' : '搜索单词（支持韩文/中文）...'}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
                />
              </div>
              {mode === 'select-words' && !search && (
                <p className="text-xs text-[var(--text-muted)] mt-1.5 px-1">搜索可从全部词库中选词</p>
              )}
            </div>

            {/* List */}
            <div
              className="flex-1 min-h-0 overflow-y-auto px-5 pb-4"
              style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
            >
              {loading ? (
                <div className="text-center py-8 text-[var(--text-muted)] text-sm">加载中...</div>
              ) : mode === 'select-books' ? (
                filteredBooks.length === 0 ? (
                  <div className="text-center py-8 text-[var(--text-muted)] text-sm">
                    {books.length === 0 ? '还没有创建单词本，请先创建' : '没有匹配的单词本'}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredBooks.map((book) => (
                      <button
                        key={book.id}
                        onClick={() => toggleBook(book.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          selectedBookIds.has(book.id)
                            ? 'bg-[var(--pink-primary)]/10 border border-[var(--pink-primary)]/30'
                            : 'hover:bg-[var(--bg-card-hover)] border border-transparent'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                          selectedBookIds.has(book.id) ? 'bg-[var(--pink-primary)] text-white' : 'border-2 border-[var(--border-color)]'
                        }`}>
                          {selectedBookIds.has(book.id) && <Check size={12} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[var(--text-primary)] truncate">{book.name}</div>
                          <div className="text-xs text-[var(--text-muted)]">{book.wordIds.length} 个单词</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )
              ) : results.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-muted)] text-sm">
                  {search ? '没有找到匹配的单词' : '没有可添加的单词，试试搜索'}
                </div>
              ) : (
                <div className="space-y-1">
                  {results.map((item) => {
                    const id = item.kind === 'saved' ? item.word.id : item.entry.id;
                    const korean = item.kind === 'saved' ? item.word.word : item.entry.korean;
                    const pronunciation = item.kind === 'saved' ? item.word.pronunciation : item.entry.romanization;
                    const meaning = item.kind === 'saved'
                      ? item.word.meaning
                      : item.entry.meanings[0]?.chinese ?? '';
                    const isSelected = selectedIds.has(id);
                    return (
                      <button
                        key={id}
                        onClick={() => toggleItem(id, item.kind === 'entry' ? item.entry : undefined)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          isSelected
                            ? 'bg-[var(--pink-primary)]/10 border border-[var(--pink-primary)]/30'
                            : 'hover:bg-[var(--bg-card-hover)] border border-transparent'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                          isSelected ? 'bg-[var(--pink-primary)] text-white' : 'border-2 border-[var(--border-color)]'
                        }`}>
                          {isSelected && <Check size={12} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[var(--text-primary)]">{korean}</span>
                            <span className="text-xs text-[var(--text-muted)]">{pronunciation}</span>
                            {item.kind === 'entry' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--mint-soft)]/20 text-[var(--mint-soft)] shrink-0">词库</span>
                            )}
                          </div>
                          <div className="text-xs text-[var(--text-secondary)] truncate">{meaning}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-[var(--border-color)] shrink-0">
              <button
                onClick={handleSave}
                disabled={
                  (mode === 'select-books' && selectedBookIds.size === 0) ||
                  (mode === 'select-words' && selectedIds.size === 0)
                }
                className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-[var(--pink-primary)] hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-1.5"
              >
                <Plus size={16} />
                {mode === 'select-books'
                  ? `添加到 ${selectedBookIds.size} 个单词本`
                  : `添加 ${selectedIds.size} 个单词`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
