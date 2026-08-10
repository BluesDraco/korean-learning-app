'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HighlightedExample } from '@/components/vocabulary/HighlightedExample';
import { X, Volume2, Check, Loader2, Bookmark, BookmarkCheck, Sparkles } from 'lucide-react';
import { speakWord } from '@/lib/tts';
import { db } from '@/lib/db';
import { stripParticle } from '@/lib/koreanParticles';
import { displayRoman } from '@/lib/dictionary';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import type { WordBook } from '@/types';

interface LookupResult {
  korean: string;
  romanization: string;
  meaning: string;
  meanings?: { chinese: string; partOfSpeech?: string }[];
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

type QueryState = 'loading' | 'found' | 'not_found' | 'error' | 'need_login';
type SaveState = 'idle' | 'selecting' | 'saving' | 'saved';

const WORDTAP_KEYFRAMES = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;

export function WordTapSheet({ surface, source, onClose, onSaved }: WordTapSheetProps) {
  const { lang } = useLang();
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
  const [retryToken, setRetryToken] = useState(0);

  // 按义项的"懒加载例句"内存状态，仅本次弹窗有效
  type MeaningExState = {
    state: 'idle' | 'loading' | 'done' | 'empty' | 'error';
    examples?: { korean: string; chinese: string }[];
  };
  const [meaningEx, setMeaningEx] = useState<Record<number, MeaningExState>>({});

  const generateMeaningExamples = async (i: number) => {
    if (!result) return;
    const m = result.meanings?.[i];
    if (!m) return;
    setMeaningEx((prev) => ({ ...prev, [i]: { state: 'loading' } }));
    try {
      const res = await fetch('/api/ai/meaning-examples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: result.korean,
          baseForm: result.baseForm || result.korean,
          meaningChinese: m.chinese,
          meaningPartOfSpeech: m.partOfSpeech || '',
          allMeanings: (result.meanings || []).map((x) => x.chinese),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMeaningEx((prev) => ({ ...prev, [i]: { state: 'error' } }));
        return;
      }
      const list = Array.isArray(data.examples) ? data.examples : [];
      if (list.length === 0) {
        setMeaningEx((prev) => ({ ...prev, [i]: { state: 'empty', examples: [] } }));
        return;
      }
      setMeaningEx((prev) => ({ ...prev, [i]: { state: 'done', examples: list } }));
    } catch {
      setMeaningEx((prev) => ({ ...prev, [i]: { state: 'error' } }));
    }
  };

  useEffect(() => {
    let cancelled = false;
    // 重试时跳过缓存（用户主动要求重查）
    if (retryToken === 0 && lookupCache.has(activeSurface)) {
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
        if (res.status === 401) { setQueryState('need_login'); return; }
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
  }, [activeSurface, retryToken]);

  async function handleAddToBook() {
    setSaveState('selecting');
    // 查重 key 必须跟入库时的 lookupKey 一致，否则 "용기를" 查不到已入库的 "용기"，UI 会假装没添加过
    const lookupKey = result?.baseForm || result?.korean || stripParticle(activeSurface);
    const [allBooks, existing] = await Promise.all([
      db.wordBooks.toArray(),
      db.words.where('word').equals(lookupKey).first(),
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
      // 优先按 baseForm 查重；fallback 用 surface 时剥一下助词，避免「용기를」这种脏数据
      const lookupKey = result?.baseForm || result?.korean || stripParticle(activeSurface);
      const existing = await db.words.where('word').equals(lookupKey).first();
      if (existing) {
        wordId = existing.id;
      } else {
        const lookupMeanings = Array.isArray(result?.meanings)
          ? result!.meanings.filter((m): m is { chinese: string; partOfSpeech?: string } => !!m && typeof m.chinese === 'string')
          : [];
        const meaningStr = lookupMeanings.length
          ? lookupMeanings.map((m) => m.chinese).join('；')
          : (result?.meaning ?? '');
        const hangul = result?.baseForm || result?.korean || stripParticle(activeSurface);
        const newWord = {
          id: crypto.randomUUID(),
          // 存原型词（baseForm），fallback 用 surface 时剥助词，避免「용기를」这种脏数据进词库
          word: hangul,
          // 入库前净化 pronunciation：AI 偶尔把韩文塞进去，用 displayRoman 兜底
          pronunciation: displayRoman(result?.romanization, hangul),
          meaning: meaningStr,
          ...(lookupMeanings.length ? { meanings: lookupMeanings } : {}),
          partOfSpeech: lookupMeanings[0]?.partOfSpeech || result?.partOfSpeech || '',
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

  if (typeof window === 'undefined') return null;

  const sheetNode = (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: 'var(--font-ko-sheet, inherit)' }}
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
          background: 'var(--color-surface-2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '20px 22px 28px',
          maxHeight: 'var(--vh-80)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-ko-sheet, inherit)', fontSize: 26, fontWeight: 800, color: 'var(--color-ink-3)', flex: 1 }}>{activeSurface}</span>
          <button
            onClick={e => { e.stopPropagation(); speakWord(activeSurface); }}
            style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--color-border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-ink-3)', background: 'transparent', cursor: 'pointer' }}
          >
            <Volume2 size={15} />
          </button>
          <button
            onClick={onClose}
            style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--color-border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-ink-3)', background: 'transparent', cursor: 'pointer' }}
          >
            <X size={15} />
          </button>
        </div>

        {/* 变形提示行 */}
        {queryState === 'found' && result?.baseForm && result.baseForm !== activeSurface && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, padding: '7px 12px', background: 'var(--color-purple-soft)', borderRadius: 12, border: '1px solid var(--color-purple-base)' }}>
            <span style={{ fontSize: 12, color: 'var(--color-ink-3)', flexShrink: 0 }}>{t('wordtap.baseForm', lang)}</span>
            <span
              onClick={e => { e.stopPropagation(); setSaveState('idle'); setActiveSurface(result.baseForm!); }}
              style={{ fontFamily: 'var(--font-ko-sheet, inherit)', fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', borderBottom: '2px solid var(--color-purple-base)', cursor: 'pointer' }}
            >
              {result.baseForm}
            </span>
            {result.inflectionNote && (
              <span style={{ fontSize: 11, color: 'var(--color-purple-strong)', marginLeft: 'auto', textAlign: 'right', lineHeight: 1.4 }}>
                {result.inflectionNote}
              </span>
            )}
          </div>
        )}

        {/* query states */}
        {queryState === 'loading' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            <div style={{ height: 22, borderRadius: 8, background: 'var(--color-surface-4)', width: '60%' }} />
            <div style={{ height: 16, borderRadius: 8, background: 'var(--color-surface-4)', width: '40%' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, color: 'var(--color-ink-3)', fontSize: 12 }}>
              <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
              {t('wordtap.querying', lang)}
            </div>
          </div>
        )}

        {(queryState === 'not_found' || queryState === 'error') && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 12 }}>
              {queryState === 'error' ? t('wordtap.queryFail', lang) : t('wordtap.notFound', lang)}
            </p>
            <button
              onClick={() => setRetryToken(t => t + 1)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 18px', borderRadius: 999,
                background: 'var(--bg-soft)', color: 'var(--color-pink-strong)',
                border: '1px solid var(--color-pink-soft)',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}
            >
              {t('wordtap.retry', lang)}
            </button>
          </div>
        )}

        {queryState === 'need_login' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ fontSize: 14, color: 'var(--color-ink-3)', marginBottom: 12 }}>{t('wordtap.needLogin', lang)}</p>
            <a href="/auth/login" style={{ display: 'inline-block', padding: '8px 20px', borderRadius: 10, background: 'var(--color-pink-base)', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>{t('wordtap.goLogin', lang)}</a>
          </div>
        )}

        {queryState === 'found' && result && (
          <div style={{ marginBottom: 20 }}>
            {/* meaning(s) */}
            {result.meanings && result.meanings.length > 0 ? (
              <div style={{ marginBottom: 8 }}>
                {result.meanings.map((m, i) => {
                  const ex = meaningEx[i];
                  return (
                    <div key={i} style={{ marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 17, fontWeight: 700, color: 'var(--color-ink-1)', lineHeight: 1.5 }}>
                        {result.meanings && result.meanings.length > 1 && (
                          <span style={{ fontSize: 13, color: 'var(--color-ink-3)' }}>{i + 1}.</span>
                        )}
                        <span style={{ flex: 1, minWidth: 0 }}>{m.chinese}</span>
                        {m.partOfSpeech && (
                          <span style={{ fontSize: 12, color: 'var(--color-ink-3)', fontWeight: 400 }}>{m.partOfSpeech}</span>
                        )}
                        <button
                          onClick={() => generateMeaningExamples(i)}
                          disabled={ex?.state === 'loading'}
                          aria-label={t('wordtap.genExample', lang)}
                          title={t('wordtap.genExample', lang)}
                          style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: 24, height: 24, borderRadius: 8, border: '1px solid var(--color-border-1)',
                            background: 'var(--color-surface-3)', color: 'var(--color-pink-strong)', cursor: 'pointer',
                            opacity: ex?.state === 'loading' ? 0.5 : 1,
                          }}
                        >
                          {ex?.state === 'loading' ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                        </button>
                      </div>
                      {ex?.state === 'done' && ex.examples && ex.examples.length > 0 && (
                        <div style={{ marginLeft: result.meanings && result.meanings.length > 1 ? 22 : 0, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {ex.examples.map((e, j) => (
                            <div key={j} style={{ fontSize: 13 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <HighlightedExample text={e.korean} word={result.korean} className="" />
                                <button
                                  onClick={evt => { evt.stopPropagation(); speakWord(e.korean); }}
                                  aria-label={t('a11y.play_audio', lang)}
                                  style={{ width: 22, height: 22, borderRadius: '50%', border: '1px solid var(--color-pink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pink-strong)', background: 'transparent', cursor: 'pointer', padding: 0, flexShrink: 0 }}
                                >
                                  <Volume2 size={11} />
                                </button>
                              </div>
                              <div style={{ fontSize: 12, color: 'var(--color-ink-3)', marginTop: 1 }}>{e.chinese}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {ex?.state === 'empty' && (
                        <div style={{ marginLeft: result.meanings && result.meanings.length > 1 ? 22 : 0, marginTop: 2, fontSize: 11, color: 'var(--color-ink-3)', fontStyle: 'italic' }}>
                          {t('wordtap.exEmpty', lang)}
                        </div>
                      )}
                      {ex?.state === 'error' && (
                        <div style={{ marginLeft: result.meanings && result.meanings.length > 1 ? 22 : 0, marginTop: 2, fontSize: 11, color: 'var(--color-status-danger)' }}>
                          {t('wordtap.exError', lang)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-ink-1)', marginBottom: 8 }}>
                {result.meaning}
              </div>
            )}
            {/* meta */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
              <span style={{ fontSize: 13, background: 'var(--color-pink-soft)', color: 'var(--color-pink-strong)', padding: '2px 8px', borderRadius: 8 }}>
                [{displayRoman(result.romanization, result.korean)}]
              </span>
              {result.partOfSpeech && (
                <span style={{ fontSize: 13, background: 'var(--color-surface-4)', color: 'var(--color-ink-3)', padding: '2px 8px', borderRadius: 8 }}>
                  {result.partOfSpeech}
                </span>
              )}
              {source && (
                <span style={{ fontSize: 12, background: 'var(--color-surface-4)', color: 'var(--color-ink-3)', padding: '2px 8px', borderRadius: 8 }}>
                  {source}
                </span>
              )}
            </div>
            {/* examples */}
            {result.examples.slice(0, 2).map((ex, i) => (
              <div key={i} style={{ background: 'var(--color-pink-soft)', borderRadius: 12, padding: '8px 12px', marginBottom: 6, border: '1px solid var(--color-pink-soft)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <HighlightedExample text={ex.korean} word={activeSurface} style={{ fontSize: 13, color: 'var(--color-ink-1)', margin: 0, flex: 1, minWidth: 0 }} highlightColor="var(--color-pink-strong)" highlightBg="transparent" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    <button
                      onClick={e => { e.stopPropagation(); speakWord(ex.korean); }}
                      style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid var(--color-pink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pink-strong)', background: 'transparent', cursor: 'pointer', padding: 0 }}
                    >
                      <Volume2 size={12} />
                    </button>
                    <button
                      onClick={async e => {
                        e.stopPropagation();
                        if (savedExamples.has(ex.korean)) return;
                        const existing = await db.sentences.where('korean').equals(ex.korean).first().catch(() => null);
                        if (!existing) {
                          await db.sentences.add({ id: crypto.randomUUID(), korean: ex.korean, chinese: ex.chinese, source_type: 'vocabulary', source_id: 'word-' + activeSurface, source_title: activeSurface, created_at: Date.now() }).catch(() => {});
                        }
                        setSavedExamples(prev => new Set([...prev, ex.korean]));
                      }}
                      style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid var(--color-pink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: savedExamples.has(ex.korean) ? 'var(--color-pink-strong)' : 'var(--color-ink-4)', background: 'transparent', cursor: savedExamples.has(ex.korean) ? 'default' : 'pointer', padding: 0 }}
                    >
                      {savedExamples.has(ex.korean) ? <BookmarkCheck size={12} /> : <Bookmark size={12} />}
                    </button>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '3px 0 0' }}>{ex.chinese}</p>
              </div>
            ))}
          </div>
        )}

        {/* save area */}
        {queryState === 'found' && (
          <div style={{ borderTop: '1px solid var(--color-border-1)', paddingTop: 16 }}>
            {saveState === 'idle' && (
              <button
                onClick={handleAddToBook}
                style={{ width: '100%', padding: '13px 0', borderRadius: 14, background: 'var(--color-pink-base)', color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                {t('wordtap.addToBook', lang)}
              </button>
            )}

            {(saveState === 'selecting' || saveState === 'saving') && (
              <div>
                <p style={{ fontSize: 13, color: 'var(--color-ink-3)', marginBottom: 10 }}>{t('wordtap.selectBook', lang)}</p>
                {books.length === 0 ? (
                  <p style={{ fontSize: 13, color: 'var(--color-ink-3)', textAlign: 'center', padding: '12px 0' }}>{t('wordtap.noBooks', lang)}</p>
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
                            background: already ? 'var(--color-pink-soft)' : 'var(--color-surface-4)',
                            border: 'none', cursor: already ? 'default' : 'pointer',
                            fontSize: 14, color: already ? 'var(--color-pink-strong)' : 'var(--color-ink-1)',
                            fontWeight: already ? 600 : 400,
                            opacity: saveState === 'saving' && !already ? 0.5 : 1,
                          }}
                        >
                          <span>{book.name}</span>
                          {already && <Check size={15} style={{ color: 'var(--color-pink-strong)' }} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {saveState === 'saved' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 0', borderRadius: 14, background: 'var(--color-pink-soft)', color: 'var(--color-pink-strong)', fontSize: 14, fontWeight: 700 }}>
                <Check size={16} />
                {t('wordtap.savedToBook', lang)}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{WORDTAP_KEYFRAMES}</style>
    </div>
  );

  return createPortal(sheetNode, document.body);
}
