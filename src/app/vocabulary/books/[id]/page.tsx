'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Plus, Trash2, Volume2, Search, Loader2, CheckSquare, Square, FolderInput, X, Headphones, ChevronUp, ChevronDown, BookmarkPlus } from 'lucide-react';
import { db } from '@/lib/db';
import { AddToBookModal } from '@/components/AddToBookModal';
import { WordAudioPlayer } from '@/components/WordAudioPlayer';
import { speak, speakWord } from '@/lib/tts';
import { TappableText } from '@/components/TappableText';
import { getEntryByKorean } from '@/data/vocabulary/index';
import type { WordBook, Word, WordEntry } from '@/types';
import { useIsDesktop } from '@/lib/useIsMobile';

export default function BookDetailPage() {
  const isWideViewport = useIsDesktop();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [book, setBook] = useState<WordBook | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [managing, setManaging] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [allBooks, setAllBooks] = useState<{ id: string; name: string }[]>([]);
  const [showMoveSheet, setShowMoveSheet] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [savedSentenceIds, setSavedSentenceIds] = useState<Set<string>>(new Set());
  const [entriesMap, setEntriesMap] = useState<Map<string, WordEntry>>(new Map());

  useEffect(() => {
    const needEntry = words.filter(w => {
      const valid = w.examples.filter(ex => ex.text && ex.text !== '[object Object]');
      return valid.length === 0;
    });
    let cancelled = false;
    (async () => {
      const uniqueWords = [...new Set(needEntry.map(w => w.word))];
      const results = await Promise.all(uniqueWords.map(w => getEntryByKorean(w)));
      if (cancelled) return;
      const map = new Map<string, WordEntry>();
      uniqueWords.forEach((w, i) => { if (results[i]) map.set(w, results[i]!); });
      setEntriesMap(map);
    })();
    return () => { cancelled = true; };
  }, [words]);

  const saveSentence = async (korean: string, chinese: string, sourceTitle: string) => {
    if (savedSentenceIds.has(korean)) return;
    const existing = await db.sentences.where('korean').equals(korean).first().catch(() => null);
    if (!existing) {
      await db.sentences.add({ id: crypto.randomUUID(), korean, chinese, source_type: 'vocabulary', source_id: 'book-' + id, source_title: sourceTitle, created_at: new Date().toISOString() }).catch(() => {});
    }
    setSavedSentenceIds((prev) => new Set(prev).add(korean));
  };

  const load = useCallback(async () => {
    try {
      const b = await db.wordBooks.get(id);
      if (!b) { router.replace('/vocabulary/books'); return; }
      setBook(b);
      const { recordVocabVisit } = await import('@/lib/progress/dailyHero');
      recordVocabVisit({ source: 'books', unitId: b.id, unitTitle: b.name });
      const loaded = await db.words.where('id').anyOf(b.wordIds).toArray();
      setWords(loaded.filter((w): w is Word => w != null));
    } catch {
      // db error — leave empty state
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    db.wordBooks.toArray().then(books =>
      setAllBooks(books.filter(b => b.id !== id).map(b => ({ id: b.id, name: b.name })))
    );
  }, [id]);

  const toggleSelect = (wordId: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(wordId) ? next.delete(wordId) : next.add(wordId);
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

  const handleBatchRemove = async () => {
    if (!book || selected.size === 0) return;
    if (!confirm(`确定从单词本中移除这 ${selected.size} 个单词？`)) return;
    const newIds = book.wordIds.filter(wid => !selected.has(wid));
    await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() }).catch(() => {});
    setBook({ ...book, wordIds: newIds });
    setWords(prev => prev.filter(w => !selected.has(w.id)));
    setSelected(new Set());
    setManaging(false);
  };

  const handleMoveToBook = async (targetBookId: string) => {
    if (!book || selected.size === 0) return;
    try {
      const targetBook = await db.wordBooks.get(targetBookId);
      if (!targetBook) return;
      const newTargetIds = [...new Set([...targetBook.wordIds, ...[...selected]])];
      await db.wordBooks.update(targetBookId, { wordIds: newTargetIds, updatedAt: Date.now() });
      const newIds = book.wordIds.filter(wid => !selected.has(wid));
      await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
      setBook({ ...book, wordIds: newIds });
      setWords(prev => prev.filter(w => !selected.has(w.id)));
      setSelected(new Set());
      setManaging(false);
      setShowMoveSheet(false);
    } catch {
      setShowMoveSheet(false);
    }
  };

  const handleRemoveWord = async (wordId: string) => {
    if (!book) return;
    if (!confirm('从单词本中移除这个单词？')) return;
    const newIds = book.wordIds.filter((wid) => wid !== wordId);
    await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() }).catch(() => {});
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
    <div className={isWideViewport ? 'py-6 max-w-5xl mx-auto px-4 space-y-5 pb-[calc(56px+env(safe-area-inset-bottom,0px)+128px)]' : 'py-4 max-w-2xl mx-auto px-4 space-y-4 pb-[calc(56px+env(safe-area-inset-bottom,0px)+128px)]'}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <Link
          href="/vocabulary/books"
          style={{
            display: 'inline-flex', alignItems: 'center',
            color: 'var(--color-ink-2)', textDecoration: 'none',
          }}
        >
          <ArrowLeft size={20} />
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>{book.name}</h1>
          <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
            {book.description || `${words.length} 个单词`}
          </p>
        </div>
        <Link
          href={`/vocabulary/books/${book.id}/flashcards`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0,
            background: 'var(--color-pink-base)', color: '#fff',
            borderRadius: 'var(--radius-pill)', padding: '10px 18px',
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
            boxShadow: 'var(--shadow-sm)',
          }}
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
        {!managing && (
          <button
            onClick={() => setShowAddModal(true)}
            className="shrink-0 flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)] transition-colors"
          >
            <Plus size={16} />添加
          </button>
        )}
        <button
          onClick={() => { setManaging(!managing); setSelected(new Set()); }}
          className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${managing ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]'}`}
        >
          {managing ? '取消' : '管理'}
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
          {managing && (
            <button onClick={toggleSelectAll} className="text-xs text-[var(--pink-primary)] font-medium">
              {selected.size === filteredWords.length ? '取消全选' : `全选 (${filteredWords.length})`}
            </button>
          )}
          {filteredWords.map((word) => {
            const isExpanded = expandedId === word.id;
            const masteryLabels: Record<string, string> = {
              new: '新词', learning: '学习中', reviewing: '复习中', mastered: '已掌握',
            };
            const masteryColors: Record<string, string> = {
              new: 'bg-[var(--pink-primary)]/8 text-[var(--pink-primary)]',
              learning: 'bg-[var(--peach-soft)]/15 text-[var(--peach-soft)]',
              reviewing: 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]',
              mastered: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]',
            };
            return (
              <div
                key={word.id}
                className={`bg-[var(--bg-card)] rounded-xl border overflow-hidden transition-all ${selected.has(word.id) ? 'border-[var(--pink-primary)] bg-[var(--pink-primary)]/5' : 'border-[var(--border-color)]'}`}
                onClick={managing ? () => toggleSelect(word.id) : undefined}
              >
                {/* Collapsed row */}
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
                      {word.source === 'yonsei' && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--purple-soft)]/15 text-[var(--purple-soft)] shrink-0 font-medium">
                          延世单词
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
                        onClick={(e) => { e.stopPropagation(); speakWord(word.word, 0.8); }}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                      >
                        <Volume2 size={14} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveWord(word.id); }}
                        className="p-1.5 rounded-lg hover:bg-[var(--color-danger-bg)] text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                      {isExpanded ? <ChevronUp size={14} className="text-[var(--text-muted)]" /> : <ChevronDown size={14} className="text-[var(--text-muted)]" />}
                    </div>
                  )}
                </div>

                {/* Expanded details */}
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
                              <TappableText text={ex.text} className="text-sm text-[var(--text-primary)]" source="单词本" highlightWord={word.word} />
                              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.translation}</p>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); speak(ex.text, 0.8); }}
                              className="p-1 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] shrink-0"
                            >
                              <Volume2 size={14} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); saveSentence(ex.text, ex.translation, word.word); }}
                              className="p-1 rounded-lg hover:bg-[var(--bg-accent)] transition-colors shrink-0"
                              style={{ color: savedSentenceIds.has(ex.text) ? 'var(--pink-primary)' : 'var(--text-muted)' }}
                            >
                              <BookmarkPlus size={14} fill={savedSentenceIds.has(ex.text) ? 'currentColor' : 'none'} />
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

      {/* Listen button — fixed above tab bar */}
      {words.length > 0 && !showAddModal && !showMoveSheet && (
        <div
          className="fixed left-0 right-0 px-4 z-[80] md:left-[208px]"
          style={{ bottom: 'calc(56px + env(safe-area-inset-bottom, 0px) + 8px)' }}
        >
          <button
            onClick={() => setShowAudioPlayer(!showAudioPlayer)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg"
            style={{ background: 'linear-gradient(135deg, #FFE4EC, #EAF8F5)', color: 'var(--pink-primary)' }}
          >
            <Headphones size={18} />
            {showAudioPlayer ? '关闭听单词' : '听单词（一遍韩语一遍中文）'}
          </button>
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

      {/* Batch action bar */}
      {managing && selected.size > 0 && (
        <div className="fixed left-0 right-0 z-[60] flex items-center justify-center gap-3 px-4 md:left-[108px] md:bottom-3" style={{ bottom: 'calc(56px + env(safe-area-inset-bottom, 0px) + 12px)' }}>
          <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-4 py-3 shadow-lg">
            <span className="text-xs text-[var(--text-secondary)]">已选 {selected.size} 个</span>
            <button
              onClick={() => setShowMoveSheet(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-input)] text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)]"
            >
              <FolderInput size={15} />
              移到单词本
            </button>
            <button
              onClick={handleBatchRemove}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-danger-bg)] text-sm text-[var(--color-danger)]"
            >
              <Trash2 size={15} />
              批量删除
            </button>
          </div>
        </div>
      )}

      {/* Move sheet */}
      {showMoveSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }} onClick={() => setShowMoveSheet(false)}>
          <div className="w-full max-w-lg bg-[var(--bg-card)] rounded-t-2xl px-5 pt-5 pb-[calc(20px+env(safe-area-inset-bottom,0px))] flex flex-col max-h-[70dvh]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between shrink-0 mb-3">
              <span className="text-sm font-medium text-[var(--text-primary)]">移到单词本</span>
              <button onClick={() => setShowMoveSheet(false)} className="p-1 text-[var(--text-muted)]"><X size={18} /></button>
            </div>
            {allBooks.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] py-4 text-center">没有其他单词本</p>
            ) : (
              <div className="space-y-2 overflow-y-auto flex-1 min-h-0" style={{ WebkitOverflowScrolling: 'touch' }}>
                {allBooks.map(b => (
                  <button
                    key={b.id}
                    onClick={() => handleMoveToBook(b.id)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-[var(--bg-input)] text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/5 transition-colors"
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Word audio player — hide when any modal is open */}
      {showAudioPlayer && !showAddModal && !showMoveSheet && (
        <WordAudioPlayer
          words={words.map(w => ({ korean: w.word, chinese: w.meaning }))}
          extraBottom={68}
        />
      )}
    </div>
  );
}
