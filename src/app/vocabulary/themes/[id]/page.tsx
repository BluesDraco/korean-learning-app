'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Volume2,
  ChevronDown, ChevronUp, Loader2, BookmarkPlus, Check, Trash2, CheckSquare, Square, ListChecks, CheckCircle,
  Eye, EyeOff, MoreHorizontal, Languages,
} from 'lucide-react';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { getTheme, getThemeWords } from '@/data/vocabulary';
import { displayRomanHyphen } from '@/lib/dictionary';
import { db, deleteWordsByText } from '@/lib/db';
import type { WordEntry, ThemePack } from '@/types';
import { speakWord } from '@/lib/tts';
import { useAuth } from '@/components/AuthProvider';
import { TappableText } from '@/components/TappableText';
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';
import { useIsDesktop } from '@/lib/useIsMobile';
import { t } from '@/lib/i18n';
import { pick } from '@/lib/content-lang';
import { useLang } from '@/components/LangProvider';

type TabKey = 'words' | 'dialogues' | 'pitfalls' | 'sentences';

export default function ThemeDetailPage() {
  const isWideViewport = useIsDesktop();
  const { lang } = useLang();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawTab = searchParams.get('tab');
  const currentTab: TabKey = (['words', 'dialogues', 'pitfalls', 'sentences'] as const).includes(rawTab as TabKey)
    ? (rawTab as TabKey)
    : 'words';

  const [theme, setTheme] = useState<ThemePack | null>(null);
  const [words, setWords] = useState<WordEntry[]>([]);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [learningIds, setLearningIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [expandedSentence, setExpandedSentence] = useState<number | null>(null);
  const [sentenceAnalysis, setSentenceAnalysis] = useState<Map<number, any>>(new Map());
  const [analyzingSentence, setAnalyzingSentence] = useState<number | null>(null);
  const analysisCache = useRef<Map<string, any>>(new Map());
  const [expandedWord, setExpandedWord] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const [sheetWord, setSheetWord] = useState<WordEntry | null>(null);
  const [addingAll, setAddingAll] = useState(false);
  const [addedAll, setAddedAll] = useState(false);
  const [addAllBook, setAddAllBook] = useState(false);
  const [managing, setManaging] = useState(false);
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [deletePending, setDeletePending] = useState(false);
  const [savedSentenceIds, setSavedSentenceIds] = useState<Set<string>>(new Set());
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

  const switchTab = (tab: TabKey) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === 'words') params.delete('tab');
    else params.set('tab', tab);
    const qs = params.toString();
    router.replace(`/vocabulary/themes/${id}${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  useEffect(() => {
    if (managing) document.body.setAttribute('data-batch-managing', '1');
    else document.body.removeAttribute('data-batch-managing');
    return () => document.body.removeAttribute('data-batch-managing');
  }, [managing]);

  useEffect(() => {
    (async () => {
      try {
        const t = await getTheme(id);
        if (!t) { router.replace('/vocabulary/library'); return; }
        setTheme(t);

        const { recordVocabVisit } = await import('@/lib/progress/dailyHero');
        recordVocabVisit({ source: 'themes', unitId: id, unitTitle: t.name });

        const w = await getThemeWords(id);
        setWords(w);
        try {
          const koreanWords = w.map((e) => e.korean);
          const userWords = koreanWords.length
            ? await db.words.where('word').anyOf(koreanWords).toArray()
            : [];
          const mastered = new Set<string>();
          const learning = new Set<string>();
          for (const uw of userWords) {
            if (uw.mastery === 'mastered') mastered.add(uw.word);
            else if (uw.mastery !== 'new') learning.add(uw.word);
          }
          setMasteredIds(mastered);
          setLearningIds(learning);
        } catch {
          // db error — show words without mastery state
        }
      } catch { setLoadError(true); } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  const toggleSentence = async (index: number, korean: string) => {
    if (expandedSentence === index && sentenceAnalysis.get(index) !== 'error') {
      setExpandedSentence(null);
      return;
    }
    if (analyzingSentence !== null) return;
    setExpandedSentence(index);
    if (sentenceAnalysis.has(index) && sentenceAnalysis.get(index) !== 'error') return;
    const cached = analysisCache.current.get(korean);
    if (cached) {
      setSentenceAnalysis(prev => new Map(prev).set(index, cached));
      return;
    }
    // 游客未登录：AI 解析需登录，直接留空走静态 breakdown 兜底
    if (!user) return;
    setAnalyzingSentence(index);
    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: korean, mode: 'learn' }),
      });
      if (res.ok) {
        const data = await res.json();
        analysisCache.current.set(korean, data);
        setSentenceAnalysis(prev => new Map(prev).set(index, data));
      } else {
        setSentenceAnalysis(prev => new Map(prev).set(index, 'error'));
      }
    } catch {
      setSentenceAnalysis(prev => new Map(prev).set(index, 'error'));
    } finally {
      setAnalyzingSentence(null);
    }
  };

  const saveSentence = async (korean: string, chinese: string, sourceTitle: string) => {
    if (savedSentenceIds.has(korean)) return;
    const existing = await db.sentences.where('korean').equals(korean).first().catch(() => null);
    if (!existing) {
      await db.sentences.add({ id: crypto.randomUUID(), korean, chinese, source_type: 'vocabulary', source_id: 'theme-' + id, source_title: sourceTitle, created_at: Date.now() }).catch((e) => { console.error('saveSentence: failed to add sentence', korean, e); });
    }
    setSavedSentenceIds((prev) => new Set(prev).add(korean));
  };

  const handleAddAllToBook = async (bookId: string) => {
    if (!theme || addingAll) return;
    setAddingAll(true);
    try {
      const themeKoreans = words.map(e => e.korean);
      const [book, scopedUserWords] = await Promise.all([
        db.wordBooks.get(bookId),
        themeKoreans.length ? db.words.where('word').anyOf(themeKoreans).toArray() : Promise.resolve([]),
      ]);
      if (!book) return;
      const now = Date.now();
      const userWordMap = new Map(scopedUserWords.map(w => [w.word, w]));
      const existingBookIdSet = new Set(book.wordIds);
      const toInsert: any[] = [];
      const newWordIds: string[] = [];
      for (const entry of words) {
        const existing = userWordMap.get(entry.korean);
        if (!existing) {
          const wordId = crypto.randomUUID();
          toInsert.push({
            id: wordId, word: entry.korean, pronunciation: entry.romanization,
            meaning: entry.meanings[0]?.chinese || '', partOfSpeech: entry.partOfSpeech,
            examples: entry.examples.map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })),
            sourceEntryId: entry.id, mastery: 'new', srsLevel: 0, easeFactor: 2.5, interval: 0,
            nextReview: now, createdAt: now, lastReviewed: null, source: 'library',
          });
          newWordIds.push(wordId);
        } else if (!existingBookIdSet.has(existing.id)) {
          newWordIds.push(existing.id);
        }
      }
      await Promise.all([
        toInsert.length > 0 ? db.words.bulkPut(toInsert) : Promise.resolve(),
        newWordIds.length > 0 ? db.wordBooks.update(bookId, { wordIds: [...book.wordIds, ...newWordIds], updatedAt: now }) : Promise.resolve(),
      ].map(p => p.catch(() => { throw new Error('bulkPut or update failed'); })));
      setAddedAll(true);
      setTimeout(() => setAddedAll(false), 3000);
    } catch {
      alert(t('vocab.err_save_failed', lang));
    } finally {
      setAddingAll(false);
      setAddAllBook(false);
    }
  };

  const unmasteredWords = words.filter(e => !masteredIds.has(e.korean));
  const allSelected = unmasteredWords.length > 0 && unmasteredWords.every(e => selectedWords.has(e.korean));

  const toggleSelect = (korean: string) => {
    setSelectedWords(prev => { const s = new Set(prev); s.has(korean) ? s.delete(korean) : s.add(korean); return s; });
  };

  const toggleSelectAll = () => {
    if (allSelected) setSelectedWords(new Set());
    else setSelectedWords(new Set(unmasteredWords.map(e => e.korean)));
  };

  const exitManage = () => { setManaging(false); setSelectedWords(new Set()); setDeletePending(false); };

  const toggleMastered = async (entry: WordEntry) => {
    const now = Date.now();
    const isMastered = masteredIds.has(entry.korean);
    try {
      const rows = await db.words.where('word').equals(entry.korean).toArray();
      if (isMastered) {
        if (rows.length) {
          await db.words.bulkUpdate(
            rows.map(r => ({ id: r.id, mastery: 'learning', srsLevel: 1, interval: 1, nextReview: now }))
          );
        }
        setMasteredIds(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
        setLearningIds(prev => new Set(prev).add(entry.korean));
      } else {
        if (rows.length) {
          await db.words.bulkUpdate(
            rows.map(r => ({ id: r.id, mastery: 'mastered', srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now }))
          );
        } else {
          await db.words.put({
            id: crypto.randomUUID(), word: entry.korean, pronunciation: entry.romanization,
            meaning: entry.meanings[0]?.chinese || '', partOfSpeech: entry.partOfSpeech,
            examples: entry.examples.map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })),
            sourceEntryId: entry.id, mastery: 'mastered', srsLevel: 5, easeFactor: 2.5, interval: 21,
            nextReview: now + 21 * 86400000, createdAt: now, lastReviewed: now, source: 'library',
          });
        }
        setMasteredIds(prev => new Set(prev).add(entry.korean));
        setLearningIds(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
      }
    } catch {
      alert(t('vocab.err_check_login', lang));
    }
  };

  const batchMaster = async () => {
    const now = Date.now();
    const selected = words.filter(e => selectedWords.has(e.korean));
    const selectedKoreans = selected.map(e => e.korean);
    try {
      const scopedUserWords = selectedKoreans.length ? await db.words.where('word').anyOf(selectedKoreans).toArray() : [];
      const userWordMap = new Map(scopedUserWords.map(w => [w.word, w]));
      const toUpdate: any[] = [];
      const toInsert: any[] = [];
      for (const entry of selected) {
        const existing = userWordMap.get(entry.korean);
        if (existing) {
          toUpdate.push({ id: existing.id, mastery: 'mastered', srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now });
        } else {
          toInsert.push({
            id: crypto.randomUUID(), word: entry.korean, pronunciation: entry.romanization,
            meaning: entry.meanings[0]?.chinese || '', partOfSpeech: entry.partOfSpeech,
            examples: entry.examples.map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })),
            sourceEntryId: entry.id, mastery: 'mastered', srsLevel: 5, easeFactor: 2.5, interval: 21,
            nextReview: now + 21 * 86400000, createdAt: now, lastReviewed: now, source: 'library',
          });
        }
      }
      await Promise.all([
        toUpdate.length > 0 ? db.words.bulkUpdate(toUpdate) : Promise.resolve(),
        toInsert.length > 0 ? db.words.bulkPut(toInsert) : Promise.resolve(),
      ]);
      setMasteredIds(prev => { const s = new Set(prev); selectedWords.forEach(w => s.add(w)); return s; });
      setLearningIds(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
      exitManage();
    } catch {
      alert(t('vocab.err_check_login', lang));
    }
  };

  const batchDelete = async () => {
    try {
      await deleteWordsByText(selectedWords); // 删词 + 从收藏本剔除孤儿 id
    } catch {
      alert(t('vocab.err_check_login', lang));
      exitManage();
      return;
    }
    setMasteredIds(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
    setLearningIds(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
    exitManage();
  };

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
        <p className="text-sm text-[var(--text-muted)]">{t('common.error', lang)}</p>
        <button onClick={() => window.location.reload()} className="text-sm text-[var(--pink-primary)] underline underline-offset-2">
          {t('common.retry', lang)}
        </button>
      </div>
    );
  }

  if (!theme) return null;

  const totalWords = words.length;
  const masteredCount = masteredIds.size;
  const learningCount = learningIds.size;
  const progressPercent = totalWords > 0 ? Math.round(((masteredCount + learningCount) / totalWords) * 100) : 0;

  const dialogueCount = theme.dialogues?.length || 0;
  const pitfallCount = theme.pitfalls?.length || 0;
  const sentenceCount = theme.sentences.length;

  const allTabs: { key: TabKey; labelKey: string; count: number }[] = [
    { key: 'words', labelKey: 'vocab.td_tab_words', count: totalWords },
    { key: 'dialogues', labelKey: 'vocab.td_tab_dialogues', count: dialogueCount },
    { key: 'pitfalls', labelKey: 'vocab.td_tab_pitfalls', count: pitfallCount },
    { key: 'sentences', labelKey: 'vocab.td_tab_sentences', count: sentenceCount },
  ];
  const tabs = allTabs.filter(tab => tab.count > 0 || tab.key === 'words');

  return (
    <div className={isWideViewport ? 'py-6 w-full px-8 pb-8' : 'py-4 max-w-2xl mx-auto px-4 pb-8'}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <Link
          href="/vocabulary/library?tab=themes"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
            marginBottom: 14,
          }}
        >
          <ArrowLeft size={14} />
          {t('vocab.td_back_to_themes', lang)}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 44, lineHeight: 1 }}>{theme.emoji}</span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0, lineHeight: 1.2 }}>{theme.name}</h1>
            {theme.description && (
              <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 0', lineHeight: 1.5 }}>{theme.description}</p>
            )}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
              marginTop: 8, fontSize: 12, color: 'var(--color-ink-3)',
            }}>
              <span>{t('vocab.td_n_words', lang, { n: totalWords })}</span>
              {dialogueCount > 0 && <><span style={{ opacity: 0.4 }}>·</span><span>{t('vocab.td_n_dialogues', lang, { n: dialogueCount })}</span></>}
              {pitfallCount > 0 && <><span style={{ opacity: 0.4 }}>·</span><span>{t('vocab.td_n_pitfalls', lang, { n: pitfallCount })}</span></>}
              {sentenceCount > 0 && <><span style={{ opacity: 0.4 }}>·</span><span>{t('vocab.td_n_sentences', lang, { n: sentenceCount })}</span></>}
              {progressPercent > 0 && (
                <>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span style={{ color: 'var(--mint-soft)', fontWeight: 600 }}>{t('vocab.td_pct_learned', lang, { pct: progressPercent })}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tab Bar */}
      <div
        className="sticky z-10 -mx-4 md:-mx-8 px-4 md:px-8 mb-4"
        style={{
          top: 'var(--top-safe, 0)',
          background: 'var(--color-surface-1)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
          {tabs.map((tab) => {
            const active = currentTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => switchTab(tab.key)}
                style={{
                  position: 'relative',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '10px 14px',
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--pink-primary)' : 'var(--text-secondary)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {t(tab.labelKey, lang)}
                <span
                  style={{
                    fontSize: 11, fontWeight: 600,
                    padding: '1px 6px',
                    borderRadius: 999,
                    background: active ? 'rgba(255,127,168,0.14)' : 'var(--bg-input)',
                    color: active ? 'var(--pink-primary)' : 'var(--text-muted)',
                    minWidth: 20,
                    textAlign: 'center',
                  }}
                >
                  {tab.count}
                </span>
                {active && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 8, right: 8, bottom: -1,
                      height: 2,
                      background: 'var(--pink-primary)',
                      borderRadius: 2,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab · Dialogues */}
      {currentTab === 'dialogues' && theme.dialogues && theme.dialogues.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {theme.dialogues.map((d, di) => (
            <div
              key={di}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 1px 2px rgba(36, 25, 23, 0.04)',
              }}
            >
              {/* Scene header — 卡片头部带渐变底 */}
              <div
                style={{
                  padding: isWideViewport ? '20px 28px 16px' : '16px 18px 14px',
                  background: 'linear-gradient(180deg, rgba(255,127,168,0.06) 0%, transparent 100%)',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span
                    style={{
                      fontSize: isWideViewport ? 22 : 20,
                      fontWeight: 800,
                      color: 'var(--pink-primary)',
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                      lineHeight: 1,
                      letterSpacing: '-.02em',
                    }}
                  >
                    {String(di + 1).padStart(2, '0')}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: isWideViewport ? 17 : 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.35 }}>
                      {d.title}
                    </p>
                    {d.scene && (
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 0', fontStyle: 'italic', lineHeight: 1.5 }}>
                        {d.scene}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Script turns — 大 padding + 更宽 gap */}
              <div style={{ padding: isWideViewport ? '20px 28px 24px' : '14px 18px 18px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: isWideViewport ? 20 : 16 }}>
                  {d.turns.map((turn, ti) => {
                    const isMe = turn.speaker === 'me';
                    return (
                      <div
                        key={ti}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: `${isWideViewport ? 64 : 48}px 1fr auto`,
                          gap: isWideViewport ? 20 : 12,
                          alignItems: 'baseline',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '.14em',
                            textTransform: 'uppercase',
                            color: isMe ? 'var(--pink-primary)' : 'var(--text-muted)',
                            textAlign: 'right',
                            paddingTop: 3,
                            userSelect: 'none',
                          }}
                        >
                          {isMe ? t('vocab.td_role_me', lang) : t('vocab.td_role_clerk', lang)}
                        </span>
                        <div style={{ minWidth: 0 }}>
                          <TappableText
                            text={turn.korean}
                            className="break-words"
                            style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}
                            source="实景对话"
                          />
                          <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '6px 0 0', lineHeight: 1.6 }}>{pick(lang, turn.chinese, turn.english)}</p>
                          {turn.note && (
                            <p style={{
                              fontSize: 12, color: 'var(--text-muted)',
                              margin: '8px 0 0', lineHeight: 1.6,
                              padding: '6px 10px',
                              background: 'var(--bg-input)',
                              borderLeft: '2px solid var(--pink-pale)',
                              borderRadius: '0 6px 6px 0',
                            }}>
                              {turn.note}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => speakWord(turn.korean)}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                          style={{ alignSelf: 'start' }}
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab · Pitfalls */}
      {currentTab === 'pitfalls' && theme.pitfalls && theme.pitfalls.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {theme.pitfalls.map((p, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 1px 2px rgba(36, 25, 23, 0.04)',
              }}
            >
              {/* Card header — 编号 + 标题 */}
              <div
                style={{
                  padding: isWideViewport ? '18px 28px 14px' : '14px 18px 12px',
                  background: 'linear-gradient(180deg, rgba(255,183,77,0.08) 0%, transparent 100%)',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span
                    style={{
                      fontSize: isWideViewport ? 22 : 20,
                      fontWeight: 800,
                      color: 'var(--peach-soft)',
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                      lineHeight: 1,
                      letterSpacing: '-.02em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontSize: isWideViewport ? 17 : 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.4, flex: 1, minWidth: 0, overflowWrap: 'break-word' }}>
                    <span style={{ marginRight: 6 }}>⚠️</span>{p.title}
                  </p>
                </div>
              </div>

              <div style={{ padding: isWideViewport ? '20px 28px 24px' : '16px 18px 18px' }}>
                {/* Compare card */}
                {(p.wrong || p.right) && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isWideViewport ? '1fr 1fr' : '1fr',
                      gap: isWideViewport ? 0 : 10,
                      borderRadius: 12,
                      overflow: 'hidden',
                      marginBottom: 16,
                      border: isWideViewport ? '1px solid var(--border-color)' : 'none',
                    }}
                  >
                    {p.wrong && (
                      <div
                        style={{
                          padding: isWideViewport ? '14px 18px' : '12px 14px',
                          background: 'rgba(239,68,68,0.05)',
                          borderRight: isWideViewport ? '1px solid var(--border-color)' : 'none',
                          border: isWideViewport ? 'none' : '1px solid rgba(239,68,68,0.2)',
                          borderRadius: isWideViewport ? 0 : 10,
                        }}
                      >
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', color: 'rgb(220,38,38)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5, textTransform: 'uppercase' }}>
                          <span style={{ fontSize: 12 }}>✗</span> {t('vocab.td_dont_say', lang)}
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.55 }}>
                          <TappableText text={p.wrong} className="break-words" source="雷区" />
                        </div>
                      </div>
                    )}
                    {p.right && (
                      <div
                        style={{
                          padding: isWideViewport ? '14px 18px' : '12px 14px',
                          background: 'rgba(174,227,216,0.12)',
                          border: isWideViewport ? 'none' : '1px solid rgba(174,227,216,0.35)',
                          borderRadius: isWideViewport ? 0 : 10,
                        }}
                      >
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', color: 'var(--mint-soft)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5, textTransform: 'uppercase' }}>
                          <span style={{ fontSize: 12 }}>✓</span> {t('vocab.td_should_say', lang)}
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.55 }}>
                          <TappableText text={p.right} className="break-words" source="雷区" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Detail */}
                <p style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  margin: 0,
                }}>
                  {p.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab · Sentences */}
      {currentTab === 'sentences' && theme.sentences.length > 0 && (
        <div>
          <div className="space-y-2">
            {theme.sentences.map((s, i) => {
              const isExpanded = expandedSentence === i;
              const isAnalyzing = analyzingSentence === i;
              const analysis = sentenceAnalysis.get(i);
              const hasAiAnalysis = analysis && analysis !== 'error';
              const hasBreakdown = s.breakdown && s.breakdown.length > 0;
              return (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                  <div
                    className="p-3 flex items-start gap-3 group cursor-pointer"
                    onClick={() => toggleSentence(i, s.korean)}
                  >
                    <span className="text-xs font-bold text-[var(--text-muted)] w-5 shrink-0 mt-0.5">{i + 1}.</span>
                    <div className="flex-1 min-w-0">
                      {(s.situation || s.situationNote) && (
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          {s.situation && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: 'rgba(255,127,168,0.1)', color: 'var(--pink-primary)' }}>
                              {s.situation}
                            </span>
                          )}
                          {s.situationNote && (
                            <span className="text-[10px] text-[var(--text-muted)]">{s.situationNote}</span>
                          )}
                        </div>
                      )}
                      <TappableText text={s.korean} className="break-words" style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }} source="场景句型" />
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{pick(lang, s.chinese, s.english)}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); speakWord(s.korean); }}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                      >
                        <Volume2 size={14} />
                      </button>
                      <span className="text-[var(--text-muted)]">
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    </div>
                  </div>
                  {isExpanded && (
                    <div style={{ padding: '10px 14px 14px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-input)' }}>
                      {isAnalyzing ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 size={18} className="animate-spin" style={{ color: 'var(--pink-primary)' }} />
                        </div>
                      ) : hasAiAnalysis ? (
                        <div className="space-y-3">
                          {/* 点击查词 */}
                          <div>
                            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>{t('vocab.sentences_tap_word', lang)}</p>
                            <TappableText
                              text={s.korean}
                              source="场景句型"
                              style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-primary)' }}
                            />
                          </div>
                          {/* 语法点 */}
                          {(analysis.grammar ?? []).length > 0 && (
                            <div>
                              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>{t('vocab.sentences_grammar', lang)}</p>
                              <div className="space-y-2">
                                {(analysis.grammar as any[]).map((g: any, j: number) => (
                                  <div key={j} className="pl-2 border-l-2 border-[var(--mint-soft)]">
                                    <p className="text-[15px] font-bold text-[var(--text-primary)]">{g.pattern}{g.title ? ` · ${g.title}` : ''}</p>
                                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{g.usage || g.explanation}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* 助词 */}
                          {(analysis.particles ?? []).length > 0 && (
                            <div>
                              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>{t('vocab.sentences_particles', lang)}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1">
                                {(analysis.particles as any[]).map((p: any, j: number) => (
                                  <span key={j} className="text-[14px]">
                                    <span className="font-bold text-[var(--text-primary)]">{p.text}</span>
                                    <span className="text-[var(--text-muted)] ml-1">{p.explanation}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : hasBreakdown ? (
                        <>
                          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                            {t('vocab.td_grammar', lang)}
                          </p>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {s.breakdown!.map((b, j) => {
                              const role = b.role || b.partOfSpeech || '';
                              const note = b.note || b.meaning || '';
                              return (
                                <div
                                  key={j}
                                  style={{
                                    display: 'grid',
                                    gridTemplateColumns: '84px 1fr',
                                    gap: 12,
                                    alignItems: 'baseline',
                                    padding: '6px 0',
                                    borderBottom: j < s.breakdown!.length - 1 ? '1px dashed var(--border-color)' : 'none',
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: 10,
                                      fontWeight: 700,
                                      letterSpacing: '.08em',
                                      color: 'var(--pink-primary)',
                                      textAlign: 'right',
                                      wordBreak: 'keep-all',
                                    }}
                                  >
                                    {role}
                                  </span>
                                  <div style={{ minWidth: 0 }}>
                                    <TappableText text={b.text} className="text-[15px] font-semibold" source="语法拆解" />
                                    {note && (
                                      <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.5 }}>{note}</p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <p className="text-xs text-[var(--text-muted)] text-center py-2">{t('vocab.sentences_analyze_failed', lang)}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab · Words */}
      {currentTab === 'words' && (
      <div>
        <div className="mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {managing ? (
              <button
                onClick={exitManage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[var(--pink-primary)] text-white transition-colors"
              >
                <ListChecks size={12} />
                {t('vocab.cancel_manage', lang)}
              </button>
            ) : (
              <>
                <button
                  onClick={toggleCn}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${showCn ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30'}`}
                >
                  {showCn ? <Eye size={12} /> : <EyeOff size={12} />}
                  {showCn ? t('vocab.hide_cn', lang) : t('vocab.show_cn', lang)}
                </button>
                <button
                  onClick={toggleRn}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${showRn ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30'}`}
                >
                  <Languages size={12} />
                  {showRn ? t('vocab.hide_rn', lang) : t('vocab.show_rn', lang)}
                </button>
                <button
                  onClick={() => { if (authLoading) return; if (!user) { router.push('/auth/login?redirect=' + window.location.pathname); return; } setAddAllBook(true); }}
                  disabled={addingAll || addedAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] text-xs font-medium hover:bg-[var(--pink-primary)]/20 disabled:opacity-50 transition-colors"
                >
                  {addingAll ? <Loader2 size={12} className="animate-spin" /> : <BookmarkPlus size={12} />}
                  {addedAll ? t('vocab.added', lang) : t('vocab.add_all_to_book', lang)}
                </button>
                <DropdownMenu
                  triggerAriaLabel={t('vocab.more', lang)}
                  triggerClassName="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30 transition-colors"
                  trigger={<><MoreHorizontal size={14} />{t('vocab.more', lang)}</>}
                >
                  {(close) => (
                    <>
                      <Link
                        href={`/vocabulary/themes/${id}/mastered`}
                        onClick={close}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors"
                      >
                        <Check size={16} className="text-[var(--mint-soft)]" />
                        {t('vocab.ld_mastered_n', lang, { n: words.filter(e => masteredIds.has(e.korean)).length })}
                      </Link>
                      <button
                        onClick={() => { setManaging(true); close(); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors text-left"
                      >
                        <ListChecks size={16} className="text-[var(--text-muted)]" />
                        {t('vocab.manage', lang)}
                      </button>
                    </>
                  )}
                </DropdownMenu>
              </>
            )}
          </div>
        </div>

        {/* Select-all bar */}
        {managing && (
          <div className="flex items-center justify-between px-1 mb-2">
            <button onClick={toggleSelectAll} className="flex items-center gap-1.5 text-xs text-[var(--pink-primary)] font-medium">
              {allSelected ? <CheckSquare size={14} /> : <Square size={14} />}
              {allSelected ? t('vocab.cancel_select_all', lang) : t('vocab.select_all_unmastered', lang)}
            </button>
            <span className="text-xs text-[var(--text-muted)]">{t('vocab.selected_n', lang, { n: selectedWords.size })}</span>
          </div>
        )}

        {(() => {
          const wordByKo = new Map(words.map(w => [w.korean, w]));
          const koById = new Map(theme.wordIds.map((id, i) => [id, words[i]?.korean]));
          const usedKo = new Set<string>();
          const renderGroups: { label: string; emoji?: string; items: WordEntry[] }[] = [];
          if (theme.wordGroups && theme.wordGroups.length > 0) {
            for (const g of theme.wordGroups) {
              const items: WordEntry[] = [];
              for (const wid of g.wordIds) {
                const ko = koById.get(wid);
                const w = ko ? wordByKo.get(ko) : undefined;
                if (w && !usedKo.has(w.korean)) {
                  items.push(w);
                  usedKo.add(w.korean);
                }
              }
              if (items.length > 0) renderGroups.push({ label: g.label, emoji: g.emoji, items });
            }
            const leftover = words.filter(w => !usedKo.has(w.korean));
            if (leftover.length > 0) renderGroups.push({ label: t('vocab.td_group_other', lang), emoji: '🔖', items: leftover });
          } else {
            renderGroups.push({ label: '', items: words });
          }

          return renderGroups.map((group, gi) => (
            <div key={gi} style={{ marginBottom: gi < renderGroups.length - 1 ? 24 : 0 }}>
              {group.label && (
                <p style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase',
                  color: 'var(--text-muted)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  {group.emoji && <span style={{ fontSize: 14 }}>{group.emoji}</span>}
                  <span>{group.label}</span>
                  <span style={{ marginLeft: 4, fontSize: 10, opacity: 0.6 }}>· {group.items.length}</span>
                </p>
              )}
              {(() => {
                const renderCard = (entry: typeof group.items[number]) => {
            const isExpanded = expandedWord === entry.id;
            const isMastered = masteredIds.has(entry.korean);
            const isLearning = learningIds.has(entry.korean);
            const isSelected = selectedWords.has(entry.korean);

            return (
              <div
                key={entry.id}
                className={`bg-[var(--bg-card)] border rounded-xl overflow-hidden transition-colors ${isSelected ? 'border-[var(--mint-soft)] bg-[var(--mint-soft)]/5' : 'border-[var(--border-color)]'}`}
              >
                {/* Summary row */}
                <div className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--bg-card-hover)] transition-colors">
                  {managing && (
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${isSelected ? 'bg-[var(--mint-soft)] border-[var(--mint-soft)]' : 'border-[var(--border-color)] bg-[var(--bg-card)]'}`}
                      onClick={() => toggleSelect(entry.korean)}
                    >
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                  )}
                  <button
                    onClick={() => { if (managing) { toggleSelect(entry.korean); return; } setExpandedWord(isExpanded ? null : entry.id); }}
                    className="flex-1 flex items-center gap-3 min-w-0 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2.5 min-w-0">
                        <span className="ko-text font-bold text-[var(--text-primary)] text-[19px] leading-tight whitespace-nowrap">{entry.korean}</span>
                        {showRn && <span className="min-w-0 truncate text-[12.5px] font-semibold tracking-wide text-[var(--pink-primary)]">
                          [{displayRomanHyphen(entry.romanization, entry.korean)}]
                        </span>}
                      </div>
                      <div className="flex items-center gap-2 mt-2 min-w-0">
                        {entry.partOfSpeech && (
                          <span className="shrink-0 text-[10.5px] font-semibold px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-muted)]">{entry.partOfSpeech}</span>
                        )}
                        {showCn ? (
                          <span className="text-sm text-[var(--text-primary)] leading-snug truncate">{entry.meanings.map((m) => pick(lang, m.chinese, m.english)).join('；')}</span>
                        ) : (
                          <span className="text-xs text-[var(--text-muted)] leading-snug truncate">{t('vocab.tap_reveal_cn', lang)}</span>
                        )}
                        {entry.authoritativeLevel && (
                          <span className="shrink-0 text-[11px] text-[var(--text-muted)] font-medium">{t('vocab.td_topik_level', lang, { n: entry.authoritativeLevel })}</span>
                        )}
                        {isMastered && (
                          <span className="shrink-0 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[var(--mint-soft)]/12 text-[var(--mint-soft)]">{t('vocab.mastered', lang)}</span>
                        )}
                        {isLearning && (
                          <span className="shrink-0 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[var(--peach-soft)]/12 text-[var(--peach-soft)]">{t('vocab.learning', lang)}</span>
                        )}
                      </div>
                    </div>
                  </button>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {!managing && (
                      <>
                        <button
                          onClick={() => speakWord(entry.korean)}
                          className="no-touch-min w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                          aria-label={t('vocab.play', lang)}
                        >
                          <Volume2 size={17} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleMastered(entry); }}
                          className={`no-touch-min w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isMastered ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/12' : 'text-[var(--text-muted)] hover:bg-[var(--mint-soft)]/12 hover:text-[var(--mint-soft)]'}`}
                          title={isMastered ? t('vocab.unmaster', lang) : t('vocab.mark_mastered', lang)}
                          aria-label={isMastered ? t('vocab.unmaster', lang) : t('vocab.mark_mastered', lang)}
                        >
                          <Check size={17} />
                        </button>
                        <button
                          onClick={() => { if (authLoading) return; if (!user) { router.push('/auth/login?redirect=' + window.location.pathname); return; } setSheetWord(entry); }}
                          className="no-touch-min w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                          aria-label={t('vocab.add_to_book', lang)}
                        >
                          <BookmarkPlus size={17} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3 animate-slide-up">
                    {/* Meanings */}
                    {entry.meanings.map((m, i) => (
                      <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-medium bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] px-1.5 py-0.5 rounded">
                            {m.nuance}
                          </span>
                          <span className="text-xs bg-[var(--bg-accent)] text-[var(--text-secondary)] px-1.5 py-0.5 rounded">
                            {m.register}
                          </span>
                        </div>
                        {!showCn && <p className="text-sm text-[var(--text-primary)]">{pick(lang, m.chinese, m.english)}</p>}
                      </div>
                    ))}

                    {/* Examples */}
                    {entry.examples.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-[var(--text-muted)]">{t('vocab.td_example', lang)}</p>
                        {entry.examples.map((ex, i) => (
                          <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3 flex items-start gap-2">
                            <div className="flex-1 min-w-0">
                              <TappableText text={ex.korean} className="text-[var(--text-primary)]" style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.5 }} source="主题词库" highlightWord={entry.korean} />
                              <p className="text-[13px] text-[var(--text-secondary)] mt-1 leading-snug">{pick(lang, ex.chinese, ex.english)}</p>
                              {ex.scene && (
                                <span className="inline-block text-[13px] text-[var(--text-muted)] mt-1 bg-[var(--bg-card)] px-1.5 py-0.5 rounded">
                                  {ex.scene}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); speakWord(ex.korean); }}
                              className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                            >
                              <Volume2 size={14} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); saveSentence(ex.korean, ex.chinese, entry.korean); }}
                              className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors shrink-0"
                              style={{ color: savedSentenceIds.has(ex.korean) ? 'var(--pink-primary)' : 'var(--text-muted)' }}
                            >
                              <BookmarkPlus size={14} fill={savedSentenceIds.has(ex.korean) ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-secondary)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
                };
                if (isWideViewport) {
                  return (
                    <div className="grid grid-cols-2 gap-3 items-start">
                      <div className="space-y-3">{group.items.filter((_, i) => i % 2 === 0).map(renderCard)}</div>
                      <div className="space-y-3">{group.items.filter((_, i) => i % 2 === 1).map(renderCard)}</div>
                    </div>
                  );
                }
                return <div className="space-y-2">{group.items.map(renderCard)}</div>;
              })()}
            </div>
          ));
        })()}
      </div>
      )}

      {/* Single word sheet */}
      {sheetWord && (
        <AddToBookSheet
          word={{
            korean: sheetWord.korean,
            pronunciation: sheetWord.romanization,
            meaning: sheetWord.meanings[0]?.chinese || '',
            partOfSpeech: sheetWord.partOfSpeech,
            examples: sheetWord.examples.map(ex => ({ text: ex.korean, translation: ex.chinese })),
            sourceEntryId: sheetWord.id,
          }}
          onClose={() => setSheetWord(null)}
        />
      )}


      {/* Add all sheet */}
      {addAllBook && (
        <AddToBookSheet
          word={{ korean: '', pronunciation: '', meaning: '', partOfSpeech: '' }}
          title={t('vocab.add_to_book_n', lang, { n: totalWords })}
          onClose={() => setAddAllBook(false)}
          onSelectBook={handleAddAllToBook}
        />
      )}

      {/* Batch action bar */}
      {managing && selectedWords.size > 0 && (
        <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[60] flex justify-center pointer-events-none">
          <div className="pointer-events-auto w-full max-w-lg mx-4 mb-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 shadow-xl flex gap-2">
            {deletePending ? (
              <>
                <button onClick={() => setDeletePending(false)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] text-sm font-semibold">
                  {t('common.cancel', lang)}
                </button>
                <button onClick={batchDelete} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--color-danger)] text-white text-sm font-semibold">
                  <Trash2 size={14} /> {t('vocab.confirm_delete_n', lang, { n: selectedWords.size })}
                </button>
              </>
            ) : (
              <>
                <button onClick={batchMaster} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--mint-soft)]/15 text-[var(--mint-soft)] text-sm font-semibold hover:bg-[var(--mint-soft)]/25 transition-colors">
                  <CheckCircle size={14} /> {t('vocab.mark_mastered_n', lang, { n: selectedWords.size })}
                </button>
                <button onClick={() => setDeletePending(true)} className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--color-danger-bg)] text-[var(--color-danger)] text-sm font-semibold hover:brightness-95 transition-colors">
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
