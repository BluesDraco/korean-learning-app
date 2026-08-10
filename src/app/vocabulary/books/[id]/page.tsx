'use client';

import { useEffect, useState, useCallback } from 'react';
import { useIsDesktop } from '@/lib/useIsMobile';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Plus, Trash2, Volume2, Search, Loader2, CheckSquare, Square, FolderInput, X, ChevronDown, BookmarkPlus, Check, Eye, EyeOff, Printer } from 'lucide-react';
import { db } from '@/lib/db';
import { AddToBookModal } from '@/components/AddToBookModal';
import { VocabExportModal } from '@/components/VocabExportModal';
import { speakWord } from '@/lib/tts';
import { TappableText } from '@/components/TappableText';
import GrammarExplainBubble from '@/components/GrammarExplainBubble';
import { getEntryByKorean } from '@/data/vocabulary/index';
import { displayRomanHyphen } from '@/lib/dictionary';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';
import type { WordBook, Word, WordEntry } from '@/types';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { lang } = useLang();
  const isWideViewport = useIsDesktop();
  const [book, setBook] = useState<WordBook | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [exportWords, setExportWords] = useState<Word[] | null>(null);
  const [managing, setManaging] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [allBooks, setAllBooks] = useState<{ id: string; name: string }[]>([]);
  const [showMoveSheet, setShowMoveSheet] = useState(false);
  const [savedSentenceIds, setSavedSentenceIds] = useState<Set<string>>(new Set());
  const [entriesMap, setEntriesMap] = useState<Map<string, WordEntry>>(new Map());
  const [filter, setFilter] = useState<'all' | 'learning'>('all');
  const [showCn, setShowCn] = useState(true);

  useEffect(() => {
    try { if (localStorage.getItem('vocab_show_cn') === '0') setShowCn(false); } catch { /* ignore */ }
  }, []);

  const toggleCn = () => {
    setShowCn(prev => {
      const next = !prev;
      try { localStorage.setItem('vocab_show_cn', next ? '1' : '0'); } catch { /* ignore */ }
      return next;
    });
  };

  const [showRn, setShowRn] = useState(true);

  useEffect(() => {
    try { if (localStorage.getItem('vocab_show_rn') === '0') setShowRn(false); } catch { /* ignore */ }
  }, []);

  const toggleRn = () => {
    setShowRn(prev => {
      const next = !prev;
      try { localStorage.setItem('vocab_show_rn', next ? '1' : '0'); } catch { /* ignore */ }
      return next;
    });
  };

  // 按义项的"生成例句"加载态：key = `${wordId}:${meaningIndex}`
  const [meaningExState, setMeaningExState] = useState<Record<string, 'idle' | 'loading' | 'empty' | 'error'>>({});

  const generateMeaningExamples = async (word: Word, meaningIndex: number) => {
    const m = word.meanings?.[meaningIndex];
    if (!m) return;
    const key = `${word.id}:${meaningIndex}`;
    setMeaningExState((prev) => ({ ...prev, [key]: 'loading' }));
    try {
      const res = await fetch('/api/ai/meaning-examples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: word.word,
          baseForm: word.word,
          meaningChinese: m.chinese,
          meaningPartOfSpeech: m.partOfSpeech || '',
          allMeanings: (word.meanings || []).map((x) => x.chinese),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMeaningExState((prev) => ({ ...prev, [key]: 'error' }));
        return;
      }
      const list = Array.isArray(data.examples) ? data.examples : [];
      if (list.length === 0) {
        setMeaningExState((prev) => ({ ...prev, [key]: 'empty' }));
        return;
      }
      const newExamples = list.map((ex: { korean: string; chinese: string }) => ({
        text: ex.korean,
        translation: ex.chinese,
        source: 'manual' as const,
      }));
      // 写入 word.meanings[i].examples 并持久化
      const newMeanings = (word.meanings || []).map((mm, idx) => idx === meaningIndex ? { ...mm, examples: newExamples } : mm);
      try {
        await db.words.update(word.id, { meanings: newMeanings });
      } catch {
        setMeaningExState((prev) => ({ ...prev, [key]: 'error' }));
        return;
      }
      setWords((prev) => prev.map((w) => w.id === word.id ? { ...w, meanings: newMeanings } : w));
      setMeaningExState((prev) => { const next = { ...prev }; delete next[key]; return next; });
    } catch {
      setMeaningExState((prev) => ({ ...prev, [key]: 'error' }));
    }
  };

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
      await db.sentences.add({ id: crypto.randomUUID(), korean, chinese, source_type: 'vocabulary', source_id: 'book-' + id, source_title: sourceTitle, created_at: Date.now() }).catch((e) => { console.error('saveSentence: failed to add sentence', korean, e); });
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
      setLoadError(true);
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
    if (!confirm(t('vocab.bd_confirm_remove_n', lang, { n: selected.size }))) return;
    const newIds = book.wordIds.filter(wid => !selected.has(wid));
    // 先写库再改 UI：若 DB 失败（401/网络/SQLITE）不改 state，避免刷新后"恢复"
    try {
      await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
    } catch (err) {
      alert(t('vocab.err_remove_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
      return;
    }
    setSelected(new Set());
    setManaging(false);
    // 从服务端重新拉一次，确保 UI 与 DB 一致
    await load();
  };

  const handleMoveToBook = async (targetBookId: string) => {
    if (!book || selected.size === 0) return;
    try {
      const targetBook = await db.wordBooks.get(targetBookId);
      if (!targetBook) { setShowMoveSheet(false); return; }
      const newTargetIds = [...new Set([...targetBook.wordIds, ...[...selected]])];
      const newIds = book.wordIds.filter(wid => !selected.has(wid));
      // 先写目标再删源：若第一步失败词仍在源本，不会丢词
      await db.wordBooks.update(targetBookId, { wordIds: newTargetIds, updatedAt: Date.now() });
      await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
    } catch (err) {
      setShowMoveSheet(false);
      alert(t('vocab.err_move_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
      return;
    }
    setSelected(new Set());
    setManaging(false);
    setShowMoveSheet(false);
    await load();
  };

  const toggleMastered = async (word: Word) => {
    const now = Date.now();
    const isMastered = word.mastery === 'mastered';
    const patch = isMastered
      ? { mastery: 'learning' as const, srsLevel: 1, interval: 1, nextReview: now }
      : { mastery: 'mastered' as const, srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now };
    // 乐观更新
    setWords(prev => prev.map(w => w.id === word.id ? { ...w, ...patch } : w));
    try {
      await db.words.update(word.id, patch);
    } catch (err) {
      // 回滚
      setWords(prev => prev.map(w => w.id === word.id ? { ...w, mastery: word.mastery } : w));
      alert(t('vocab.err_mark_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
    }
  };

  const handleRemoveWord = async (wordId: string) => {
    if (!book) return;
    if (!confirm(t('vocab.bd_confirm_remove_one', lang))) return;
    const newIds = book.wordIds.filter((wid) => wid !== wordId);
    try {
      await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
    } catch (err) {
      alert(t('vocab.err_remove_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
      return;
    }
    await load();
  };

  const meaningOf = (w: Word) =>
    w.meanings?.length ? w.meanings.map((m) => m.chinese).join('；') : w.meaning;

  const baseWords = filter === 'learning' ? words.filter(w => w.mastery !== 'mastered') : words;
  const filteredWords = search
    ? baseWords.filter((w) => w.word.includes(search) || meaningOf(w).includes(search) || w.pronunciation.includes(search))
    : baseWords;
  const masteredCount = words.filter(w => w.mastery === 'mastered').length;
  const learningCount = words.length - masteredCount;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-sm text-[var(--text-muted)]">{t('vocab.err_load_failed', lang)}</p>
        <button onClick={() => { setLoadError(false); setLoading(true); load(); }} className="text-sm text-[var(--pink-primary)] underline underline-offset-2">
          {t('common.retry', lang)}
        </button>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="py-4 md:py-6 w-full max-w-2xl md:max-w-none mx-auto md:mx-0 px-4 md:px-8 space-y-4 md:space-y-5 pb-[calc(56px+env(safe-area-inset-bottom,0px)+40px)]">
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
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.name}</h1>
          <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
            {book.description || t('vocab.bd_n_words', lang, { n: words.length })}
          </p>
        </div>
        {words.length > 0 && !managing && (
          <button
            onClick={() => setExportWords(words)}
            className="shrink-0 flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-3 py-2 text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)] transition-colors"
          >
            <Printer size={16} />{t('vocab.export', lang)}
          </button>
        )}
      </div>

      {/* Flashcard entry */}
      <Link
        href={`/vocabulary/books/${book.id}/flashcards`}
        className="flex items-center gap-3 p-4 rounded-xl border transition-colors"
        style={{ background: 'var(--color-pink-soft)', borderColor: 'var(--color-pink-soft)', textDecoration: 'none' }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--bg-card)' }}>
          <BookOpen size={18} style={{ color: 'var(--color-pink-base)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t('vocab.bd_flashcard', lang)}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{t('vocab.bd_flashcard_sub', lang)}</p>
        </div>
        <ChevronDown size={16} style={{ color: 'var(--text-muted)', transform: 'rotate(-90deg)' }} />
      </Link>

      {/* Progress stats */}
      {words.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setFilter(f => f === 'learning' ? 'all' : 'learning')}
            className="flex flex-col items-start gap-1 p-3 rounded-2xl border transition-colors text-left"
            style={{
              background: filter === 'learning' ? 'var(--color-peach-soft)' : 'var(--bg-card)',
              borderColor: filter === 'learning' ? 'var(--peach-soft)' : 'var(--border-color)',
            }}
          >
            <span className="text-xs text-[var(--text-muted)]">{t('vocab.bd_learning_filter', lang)}{filter === 'learning' ? t('vocab.bd_filtering', lang) : ''}</span>
            <span className="text-lg font-bold text-[var(--peach-soft)]">{learningCount}</span>
          </button>
          <Link
            href={masteredCount > 0 ? `/vocabulary/books/${book.id}/mastered` : '#'}
            style={{ pointerEvents: masteredCount > 0 ? 'auto' : 'none', background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            className="flex flex-col items-start gap-1 p-3 rounded-2xl border transition-colors text-left"
          >
            <span className="text-xs text-[var(--text-muted)]">{t('vocab.mastered', lang)}</span>
            <span className="text-lg font-bold text-[var(--mint-soft)]">{masteredCount}</span>
          </Link>
        </div>
      )}

      {/* Search + Add */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('vocab.search_word_ph', lang)}
            className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
          />
        </div>
        {!managing && (
          <button
            onClick={toggleCn}
            title={showCn ? t('vocab.hide_cn', lang) : t('vocab.show_cn', lang)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${showCn ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30'}`}
          >
            {showCn ? <Eye size={12} /> : <EyeOff size={12} />}
            <span className="whitespace-nowrap">zh</span>
          </button>
        )}
        {!managing && (
          <button
            onClick={toggleRn}
            title={showRn ? t('vocab.hide_rn', lang) : t('vocab.show_rn', lang)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${showRn ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30'}`}
          >
            {showRn ? <Eye size={12} /> : <EyeOff size={12} />}
            <span className="whitespace-nowrap">rm</span>
          </button>
        )}
        {!managing && (
          <button
            onClick={() => setShowAddModal(true)}
            className="shrink-0 flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)] transition-colors"
          >
            <Plus size={16} />{t('vocab.bd_add', lang)}
          </button>
        )}
        <button
          onClick={() => { setManaging(!managing); setSelected(new Set()); }}
          className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${managing ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]'}`}
        >
          {managing ? t('common.cancel', lang) : t('vocab.manage', lang)}
        </button>
      </div>

      {/* Word list */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">📝</span>
          <p className="text-[var(--text-secondary)] text-sm mb-1">
            {search ? t('vocab.no_match_word', lang) : t('vocab.bd_empty', lang)}
          </p>
          <p className="text-[var(--text-muted)] text-xs mb-4">
            {search ? t('vocab.try_other_keyword', lang) : t('vocab.bd_empty_hint', lang)}
          </p>
          {!search && (
            <button onClick={() => setShowAddModal(true)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--color-pink-base)' }}>{t('vocab.bd_add_word', lang)}</button>
          )}
        </div>
      ) : (
        <>
          {managing && (
            <button onClick={toggleSelectAll} className="text-xs text-[var(--pink-primary)] font-medium min-h-11 px-3 bg-transparent border-none cursor-pointer">
              {selected.size === filteredWords.length ? t('vocab.cancel_select_all', lang) : t('vocab.select_all_n', lang, { n: filteredWords.length })}
            </button>
          )}
          {(() => {
          const renderCard = (word: typeof filteredWords[number]) => {
            const isExpanded = expandedId === word.id;
            const isMastered = word.mastery === 'mastered';
            const masteryLabel = isMastered ? t('vocab.mastered', lang) : t('vocab.learning', lang);
            const masteryColor = isMastered
              ? 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]'
              : 'bg-[var(--peach-soft)]/15 text-[var(--peach-soft)]';
            return (
              <div
                key={word.id}
                className={`bg-[var(--bg-card)] rounded-xl border overflow-hidden transition-all ${selected.has(word.id) ? 'border-[var(--pink-primary)] bg-[var(--pink-primary)]/5' : 'border-[var(--border-color)]'}`}
                onClick={managing ? () => toggleSelect(word.id) : undefined}
              >
                {/* Collapsed row */}
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--bg-card-hover)] transition-colors"
                  onClick={managing ? undefined : () => setExpandedId(isExpanded ? null : word.id)}
                >
                  {managing && (
                    <div className="shrink-0 text-[var(--pink-primary)]">
                      {selected.has(word.id) ? <CheckSquare size={18} /> : <Square size={18} className="text-[var(--text-muted)]" />}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2.5 min-w-0">
                      <span className="ko-text font-bold text-[var(--text-primary)] text-[19px] leading-tight whitespace-nowrap">{word.word}</span>
                      {showRn && <span className="min-w-0 truncate text-[12.5px] font-semibold tracking-wide text-[var(--pink-primary)]">
                        [{displayRomanHyphen(word.pronunciation, word.word)}]
                      </span>}
                    </div>
                    <div className="flex items-center gap-2 mt-2 min-w-0">
                      {word.partOfSpeech && (
                        <span className="shrink-0 text-[10.5px] font-semibold px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-muted)]">{word.partOfSpeech}</span>
                      )}
                      {showCn ? (
                        <span className="text-sm text-[var(--text-primary)] leading-snug truncate">{meaningOf(word)}</span>
                      ) : (
                        <span className="text-xs text-[var(--text-muted)] leading-snug truncate">{t('vocab.tap_reveal_cn', lang)}</span>
                      )}
                      {!managing && (
                        <span className={`text-[10.5px] px-2 py-0.5 rounded-full shrink-0 font-semibold ${masteryColor}`}>
                          {masteryLabel}
                        </span>
                      )}
                    </div>
                  </div>
                  {!managing && (
                    <div className="flex items-center gap-0.5 shrink-0 ml-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); speakWord(word.word); }}
                        className="no-touch-min w-9 h-9 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors flex items-center justify-center"
                        aria-label={t('vocab.play', lang)}
                      >
                        <Volume2 size={17} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleMastered(word); }}
                        className={`no-touch-min w-9 h-9 rounded-lg transition-colors flex items-center justify-center ${isMastered ? 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]' : 'hover:bg-[var(--mint-soft)]/15 text-[var(--text-muted)] hover:text-[var(--mint-soft)]'}`}
                        aria-label={isMastered ? t('vocab.bd_unmark_mastered', lang) : t('vocab.bd_mark_mastered', lang)}
                        title={isMastered ? t('vocab.bd_unmark_mastered', lang) : t('vocab.bd_mark_mastered', lang)}
                      >
                        <Check size={17} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveWord(word.id); }}
                        className="no-touch-min w-9 h-9 rounded-lg hover:bg-[var(--color-danger-bg)] text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors flex items-center justify-center"
                        aria-label={t('vocab.delete', lang)}
                      >
                        <Trash2 size={16} />
                      </button>
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
                  <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3 animate-fade-in">
                    {word.meanings?.length ? (
                      <div className="space-y-2">
                        {word.meanings.map((m, i) => {
                          const exKey = `${word.id}:${i}`;
                          const exState = meaningExState[exKey];
                          const hasExamples = !!m.examples && m.examples.length > 0;
                          return (
                            <div key={i} className="bg-[var(--bg-input)] rounded-lg px-3 py-2">
                              <div className="flex items-center gap-2">
                                <span className="text-[var(--text-muted)] text-xs">{i + 1}.</span>
                                <span className="flex-1 min-w-0 break-words text-sm font-medium text-[var(--text-primary)]">{m.chinese}</span>
                                {m.partOfSpeech && (
                                  <span className="text-xs text-[var(--text-muted)] font-normal">{m.partOfSpeech}</span>
                                )}
                                {!hasExamples && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); generateMeaningExamples(word, i); }}
                                    disabled={exState === 'loading'}
                                    aria-label={t('vocab.bd_gen_example', lang)}
                                    title={t('vocab.bd_gen_example', lang)}
                                    className="min-w-11 min-h-11 flex items-center justify-center rounded hover:bg-[var(--bg-accent)] text-[var(--pink-primary)] disabled:opacity-40"
                                  >
                                    {exState === 'loading' ? <Loader2 size={13} className="animate-spin" /> : <BookmarkPlus size={13} />}
                                  </button>
                                )}
                              </div>
                              {hasExamples && (
                                <div className="mt-2 ml-5 space-y-2 pl-2.5" style={{ borderLeft: '2px solid var(--color-pink-soft)' }}>
                                  {m.examples!.map((ex, j) => (
                                    <div key={j}>
                                      <div className="flex items-start gap-2">
                                        <div className="flex-1 min-w-0">
                                          <TappableText text={ex.text} className="text-[15px] leading-relaxed text-[var(--text-primary)]" source="单词本" highlightWord={word.word} />
                                          <p className="text-[13px] text-[var(--text-secondary)] mt-1 leading-snug">{ex.translation}</p>
                                        </div>
                                        <button
                                          onClick={(e) => { e.stopPropagation(); speakWord(ex.text); }}
                                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] shrink-0"
                                          aria-label={t('vocab.speak', lang)}
                                        >
                                          <Volume2 size={15} />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {exState === 'empty' && (
                                <p className="mt-1 ml-5 text-[11px] text-[var(--text-muted)] italic">{t('vocab.bd_no_example', lang)}</p>
                              )}
                              {exState === 'error' && (
                                <p className="mt-1 ml-5 text-[11px] text-[var(--color-danger)]">{t('vocab.bd_gen_failed', lang)}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                    {examples.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                        {examples.slice(0, 4).map((ex, i) => (
                          <div key={i} className="bg-[var(--bg-input)] rounded-lg px-3 py-2">
                            <div className="flex items-start gap-2">
                              <div className="flex-1 min-w-0">
                                <TappableText text={ex.text} className="text-[15px] leading-relaxed text-[var(--text-primary)]" source="单词本" highlightWord={word.word} />
                                <p className="text-[13px] text-[var(--text-secondary)] mt-1 leading-snug">{ex.translation}</p>
                              </div>
                              <button
                                onClick={(e) => { e.stopPropagation(); speakWord(ex.text); }}
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
                            <div onClick={(e) => e.stopPropagation()}>
                              <GrammarExplainBubble sentence={ex.text} translation={ex.translation} variant="compact" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  );
                })()}
              </div>
            );
          };
          if (isWideViewport) {
            return (
              <div className="grid grid-cols-2 gap-3 items-start">
                <div className="space-y-3">{filteredWords.filter((_, i) => i % 2 === 0).map(renderCard)}</div>
                <div className="space-y-3">{filteredWords.filter((_, i) => i % 2 === 1).map(renderCard)}</div>
              </div>
            );
          }
          return <div className="space-y-2">{filteredWords.map(renderCard)}</div>;
          })()}
        </>
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

      {/* Export PDF modal */}
      {exportWords && (
        <VocabExportModal
          bookName={book.name}
          words={exportWords}
          onClose={() => setExportWords(null)}
        />
      )}

      {/* Batch action bar */}
      {managing && selected.size > 0 && (
        <div className="fixed left-0 right-0 z-[60] flex items-center justify-center gap-3 px-4 md:left-[108px] md:bottom-3" style={{ bottom: 'calc(56px + env(safe-area-inset-bottom, 0px) + 12px)' }}>
          <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-4 py-3 shadow-lg">
            <span className="text-xs text-[var(--text-secondary)]">{t('vocab.selected_n', lang, { n: selected.size })}</span>
            <button
              onClick={() => setExportWords(words.filter(w => selected.has(w.id)))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-input)] text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)]"
            >
              <Printer size={15} />
              {t('vocab.export_selected_n', lang, { n: selected.size })}
            </button>
            <button
              onClick={() => setShowMoveSheet(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-input)] text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)]"
            >
              <FolderInput size={15} />
              {t('vocab.move_to_book', lang)}
            </button>
            <button
              onClick={handleBatchRemove}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-danger-bg)] text-sm text-[var(--color-danger)]"
            >
              <Trash2 size={15} />
              {t('vocab.batch_delete', lang)}
            </button>
          </div>
        </div>
      )}

      {/* Move sheet */}
      {showMoveSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setShowMoveSheet(false)}>
          <div className="w-full max-w-lg bg-[var(--bg-card)] rounded-t-2xl px-5 pt-5 pb-[calc(56px+env(safe-area-inset-bottom,0px))] flex flex-col max-h-[70dvh]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between shrink-0 mb-3">
              <span className="text-sm font-medium text-[var(--text-primary)]">{t('vocab.move_to_book', lang)}</span>
              <button onClick={() => setShowMoveSheet(false)} aria-label={t('common.close', lang)} className="min-w-11 min-h-11 flex items-center justify-center text-[var(--text-muted)]"><X size={18} /></button>
            </div>
            {allBooks.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] py-4 text-center">{t('vocab.bd_no_other_books', lang)}</p>
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

    </div>
  );
}
