'use client';

import { useState, useEffect } from 'react';
import { HighlightedExample } from '@/components/vocabulary/HighlightedExample';
import { X, Volume2, Check, Loader2, Bookmark, BookmarkCheck } from 'lucide-react';
import { speakWord } from '@/lib/tts';
import { db } from '@/lib/db';
import type { WordBook } from '@/types';

interface LookupResult {
  korean: string;
  romanization: string;
  meaning: string;
  partOfSpeech: string;
  baseForm?: string;
  inflectionNote?: string;
  examples: { korean: string; chinese: string }[];
}

const lookupCache = new Map<string, LookupResult>();

interface WordTapSheetProps {
  surface: string;
  source?: string;
  onClose: () => void;
  onSaved?: (surface: string) => void;
}

type QueryState = 'loading' | 'found' | 'not_found' | 'error';
type SaveState = 'idle' | 'selecting' | 'saving' | 'saved';

export function WordTapSheet({ surface, source, onClose, onSaved }: WordTapSheetProps) {
  const [queryState, setQueryState] = useState<QueryState>(
    () => lookupCache.has(surface) ? 'found' : 'loading'
  );
  const [result, setResult] = useState<LookupResult | null>(
    () => lookupCache.get(surface) ?? null
  );
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [books, setBooks] = useState<WordBook[]>([]);
  const [savedBookIds, setSavedBookIds] = useState<Set<string>>(new Set());
  const [savedExamples, setSavedExamples] = useState<Set<string>>(new Set());
  const [activeSurface, setActiveSurface] = useState(surface);

  useEffect(() => {
    let cancelled = false;
    if (lookupCache.has(activeSurface)) {
      setResult(lookupCache.get(activeSurface) ?? null);
      setQueryState('found');
      return;
    }
    setQueryState('loading');
    setResult(null);
    async function lookup() {
      try {
        const res = await fetch('/api/ai/word-lookup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: activeSurface }),
        });
        if (cancelled) return;
        if (!res.ok) { setQueryState('not_found'); return; }
        const data = await res.json();
        if (cancelled) return;
        lookupCache.set(activeSurface, data);
        setResult(data);
        setQueryState('found');
      } catch {
        if (!cancelled) setQueryState('error');
      }
    }
    lookup();
    return () => { cancelled = true; };
  }, [activeSurface]);

  async function handleAddToBook() {
    setSaveState('selecting');
    const [allBooks, existing] = await Promise.all([
      db.wordBooks.toArray(),
      db.words.where('word').equals(activeSurface).first(),
    ]);
    setBooks(allBooks);
    if (existing) {
      const bookSet = new Set<string>();
      for (const b of allBooks) {
        if (b.wordIds.includes(existing.id)) bookSet.add(b.id);
      }
      setSavedBookIds(bookSet);
    }
  }

  async function handleSelectBook(book: WordBook) {
    if (savedBookIds.has(book.id)) return;
    setSaveState('saving');
    try {
      let wordId: string;
      const existing = await db.words.where('word').equals(activeSurface).first();
      if (existing) {
        wordId = existing.id;
      } else {
        const newWord = {
          id: crypto.randomUUID(),
          word: result?.korean ?? activeSurface,
          pronunciation: result?.romanization ?? '',
          meaning: result?.meaning ?? '',
          partOfSpeech: result?.partOfSpeech ?? '',
          examples: (result?.examples ?? []).map(ex => ({
            text: ex.korean,
            translation: ex.chinese,
            source: 'manual' as const,
          })),
          source: source ?? 'vocabulary',
          mastery: 'new' as const,
          srsLevel: 0,
          nextReview: Date.now(),
          easeFactor: 2.5,
          interval: 1,
          createdAt: Date.now(),
          lastReviewed: null,
        };
        await db.words.add(newWord);
        wordId = newWord.id;
      }
      if (!book.wordIds.includes(wordId)) {
        await db.wordBooks.update(book.id, {
          wordIds: [...book.wordIds, wordId],
          updatedAt: Date.now(),
        });
      }
      setSavedBookIds(prev => new Set([...prev, book.id]));
      setSaveState('saved');
      onSaved?.(activeSurface);
      setTimeout(() => onClose(), 900);
    } catch {
      setSaveState('selecting');
    }
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      onClick={onClose}
    >
      {/* backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />

      {/* sheet */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 520,
          margin: '0 auto',
          borderRadius: '32px',
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '20px 22px 28px',
          maxHeight: '80vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: '#241917', flex: 1 }}>{activeSurface}</span>
          <button
            onClick={e => { e.stopPropagation(); speakWord(activeSurface, 0.75); }}
            style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid #eee0d8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#89756e', background: 'transparent', cursor: 'pointer' }}
          >
            <Volume2 size={15} />
          </button>
          <button
            onClick={onClose}
            style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid #eee0d8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#89756e', background: 'transparent', cursor: 'pointer' }}
          >
            <X size={15} />
          </button>
        </div>

        {/* 变形提示行 */}
        {queryState === 'found' && result?.baseForm && result.baseForm !== activeSurface && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, padding: '7px 12px', background: '#eaf8f5', borderRadius: 12, border: '1px solid rgba(174,227,216,.5)' }}>
            <span style={{ fontSize: 12, color: '#89756e', flexShrink: 0 }}>原型</span>
            <span
              onClick={e => { e.stopPropagation(); setSaveState('idle'); setActiveSurface(result.baseForm!); }}
              style={{ fontSize: 16, fontWeight: 800, color: '#241917', borderBottom: '2px solid #aee3d8', cursor: 'pointer' }}
            >
              {result.baseForm}
            </span>
            {result.inflectionNote && (
              <span style={{ fontSize: 11, color: '#5eaf9e', marginLeft: 'auto', textAlign: 'right', lineHeight: 1.4 }}>
                {result.inflectionNote}
              </span>
            )}
          </div>
        )}

        {/* query states */}
        {queryState === 'loading' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            <div style={{ height: 22, borderRadius: 8, background: '#f0e8e4', width: '60%' }} />
            <div style={{ height: 16, borderRadius: 8, background: '#f0e8e4', width: '40%' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, color: '#89756e', fontSize: 12 }}>
              <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
              查询中...
            </div>
          </div>
        )}

        {(queryState === 'not_found' || queryState === 'error') && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#89756e', fontSize: 14 }}>
            未找到该词释义
          </div>
        )}

        {queryState === 'found' && result && (
          <div style={{ marginBottom: 20 }}>
            {/* meaning */}
            <div style={{ fontSize: 17, fontWeight: 700, color: '#241917', marginBottom: 8 }}>
              {result.meaning}
            </div>
            {/* meta */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
              {result.romanization && (
                <span style={{ fontSize: 13, background: 'rgba(255,127,168,0.08)', color: '#ff7fa8', padding: '2px 8px', borderRadius: 8 }}>
                  [{result.romanization}]
                </span>
              )}
              {result.partOfSpeech && (
                <span style={{ fontSize: 13, background: '#f5ede8', color: '#89756e', padding: '2px 8px', borderRadius: 8 }}>
                  {result.partOfSpeech}
                </span>
              )}
              {source && (
                <span style={{ fontSize: 12, background: '#f5ede8', color: '#89756e', padding: '2px 8px', borderRadius: 8 }}>
                  {source}
                </span>
              )}
            </div>
            {/* examples */}
            {result.examples.slice(0, 2).map((ex, i) => (
              <div key={i} style={{ background: '#fff0f5', borderRadius: 12, padding: '8px 12px', marginBottom: 6, border: '1px solid rgba(255,127,168,0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <HighlightedExample text={ex.korean} word={activeSurface} style={{ fontSize: 13, color: '#241917', margin: 0, flex: 1 }} highlightColor="#ff7fa8" highlightBg="transparent" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    <button
                      onClick={e => { e.stopPropagation(); speakWord(ex.korean, 0.75); }}
                      style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid rgba(255,127,168,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff7fa8', background: 'transparent', cursor: 'pointer', padding: 0 }}
                    >
                      <Volume2 size={12} />
                    </button>
                    <button
                      onClick={async e => {
                        e.stopPropagation();
                        if (savedExamples.has(ex.korean)) return;
                        const existing = await db.sentences.where('korean').equals(ex.korean).first().catch(() => null);
                        if (!existing) {
                          await db.sentences.add({ korean: ex.korean, chinese: ex.chinese, source_type: 'vocabulary', source_id: 'word-' + activeSurface, source_title: activeSurface, created_at: new Date().toISOString() });
                        }
                        setSavedExamples(prev => new Set([...prev, ex.korean]));
                      }}
                      style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid rgba(255,127,168,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: savedExamples.has(ex.korean) ? '#ff7fa8' : '#c7b7b0', background: 'transparent', cursor: savedExamples.has(ex.korean) ? 'default' : 'pointer', padding: 0 }}
                    >
                      {savedExamples.has(ex.korean) ? <BookmarkCheck size={12} /> : <Bookmark size={12} />}
                    </button>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: '#89756e', margin: '3px 0 0' }}>{ex.chinese}</p>
              </div>
            ))}
          </div>
        )}

        {/* save area */}
        {queryState === 'found' && (
          <div style={{ borderTop: '1px solid #eee0d8', paddingTop: 16 }}>
            {saveState === 'idle' && (
              <button
                onClick={handleAddToBook}
                style={{ width: '100%', padding: '13px 0', borderRadius: 14, background: '#241917', color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                加入单词本
              </button>
            )}

            {(saveState === 'selecting' || saveState === 'saving') && (
              <div>
                <p style={{ fontSize: 13, color: '#89756e', marginBottom: 10 }}>选择单词本</p>
                {books.length === 0 ? (
                  <p style={{ fontSize: 13, color: '#89756e', textAlign: 'center', padding: '12px 0' }}>暂无单词本，请先创建</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {books.map(book => {
                      const already = savedBookIds.has(book.id);
                      return (
                        <button
                          key={book.id}
                          onClick={() => handleSelectBook(book)}
                          disabled={already || saveState === 'saving'}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '10px 14px', borderRadius: 12,
                            background: already ? '#fff0f5' : '#f5ede8',
                            border: 'none', cursor: already ? 'default' : 'pointer',
                            fontSize: 14, color: already ? '#ff7fa8' : '#241917',
                            fontWeight: already ? 600 : 400,
                            opacity: saveState === 'saving' && !already ? 0.5 : 1,
                          }}
                        >
                          <span>{book.name}</span>
                          {already && <Check size={15} style={{ color: '#ff7fa8' }} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {saveState === 'saved' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 0', borderRadius: 14, background: '#fff0f5', color: '#ff7fa8', fontSize: 14, fontWeight: 700 }}>
                <Check size={16} />
                已加入单词本
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
