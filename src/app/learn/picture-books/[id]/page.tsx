'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, Play, Pause, Eye, EyeOff, Check, BookmarkPlus, Menu, Sun, Moon } from 'lucide-react';
import { pictureBooks } from '@/data/pictureBooks';
import type { PictureBookPage } from '@/data/pictureBooks';
import { speak, cancelSpeech, speakPreRecorded } from '@/lib/tts';
import { useMembership } from '@/lib/useMembership';
import { canAccessBookIndex, isPaidTier } from '@/lib/membership-benefits';

// 绘本正文预录音源路径（狐狸女声）。行索引 = page.korean.split('\n') 的下标（未过滤，跳空行保索引），
// 与生成脚本严格一致；缺文件时 speakPreRecorded 回落 edge-tts。
const bookLineAudioUrl = (bookId: string, pageIdx: number, lineIdx: number) =>
  `/audio/picture-books/${bookId}/p${pageIdx}-l${lineIdx}.mp3`;
import { TappableText } from '@/components/TappableText';
import { savePage, markComplete, getProgress, getChinesePref, setChinesePref, saveVocabWord } from '@/lib/pictureBookProgress';
import { useLang } from '@/components/LangProvider';
import { useSmartBack } from '@/lib/useSmartBack';
import { t } from '@/lib/i18n';
import { db } from '@/lib/db';
import type { UserArticleProgress } from '@/types';
import LibrarySidebar, { type SidebarArticle } from '../../_components/LibrarySidebar';
import { TOPIC_META } from '../../_components/topics';
import '../../../learn/picture-books/[id]/picture-book.css';
import '../../library.css';

const FLIP_DURATION = 600;

/* ═══════════════════════════════════════════════════════
   Illustration
   ═══════════════════════════════════════════════════════ */
function IllustrationImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error || !src) {
    return <span className="text-4xl sm:text-5xl leading-relaxed whitespace-pre-line text-center p-4">{fallback}</span>;
  }
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 440px"
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Image card
   ═══════════════════════════════════════════════════════ */
function ImageCard({ page }: { page: PictureBookPage }) {
  return (
    <div className="w-full h-full overflow-hidden relative" style={{ backgroundColor: page.bgColor || 'var(--honey-wash)' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        {page.imageUrl ? (
          <IllustrationImage src={page.imageUrl} fallback={page.illustration} alt={page.chinese} />
        ) : (
          <span className="text-4xl whitespace-pre-line text-center p-4">{page.illustration}</span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Vocab Summary Panel — last page
   ═══════════════════════════════════════════════════════ */
function VocabSummaryPanel({ page, bookTitle, nextBookId }: { page: PictureBookPage; bookTitle: string; nextBookId: string | null }) {
  const { lang } = useLang();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState(false);

  const saveAll = async () => {
    if (saving || saved) return;
    setSaving(true);
    setSaveErr(false);
    try {
      for (const v of page.vocab) {
        await saveVocabWord(v.word, v.meaning, bookTitle);
      }
      setSaved(true);
    } catch {
      setSaveErr(true);
    } finally { setSaving(false); }
  };

  return (
    <div className="pbr-summary">
      <h2 className="pbr-sum-title">{t('pb.vocab_learned', lang)}</h2>
      <p className="pbr-sum-sub">{t('pb.vocab_count', lang, { n: page.vocab.length })}</p>

      <div style={{ margin: '18px 0 20px' }}>
        {page.vocab.map((v, i) => (
          <div key={v.word} className="pbr-sum-row">
            <span className="pbr-sum-idx">{String(i + 1).padStart(2, '0')}</span>
            <button className="pbr-sum-ko" onClick={(e) => { e.stopPropagation(); speak(v.word); }}>{v.word}</button>
            <span className="pbr-sum-dots" />
            <span className="pbr-sum-zh">{v.meaning}</span>
          </div>
        ))}
      </div>

      {saveErr && <p role="alert" className="pbr-sum-err">{t('pb.save_failed', lang)}</p>}
      <div className="pbr-controls" style={{ paddingLeft: 0, justifyContent: 'center', margin: 0 }}>
        <button className="pbr-play" onClick={saveAll} disabled={saving || saved}>
          {saved ? <><Check size={15} /> {t('pb.saved_to_book', lang)}</> : <><BookmarkPlus size={15} /> {saving ? t('pb.saving', lang) : (saveErr ? t('pb.retry', lang) : t('pb.save_all_to_book', lang))}</>}
        </button>
        <button className="pbr-toggle" onClick={() => speak(page.vocab.map((v) => v.word).join(', '), 0.7)}>
          <Volume2 size={13} /> {t('pb.read_all', lang)}
        </button>
        {nextBookId && (
          <Link href={`/reading/picture-books/${nextBookId}`} className="pbr-toggle" style={{ textDecoration: 'none' }}>
            {t('pb.next_book', lang)} <ChevronRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Text Panel — learning-first journal design
   ═══════════════════════════════════════════════════════ */
function TextPanel({ page, bookId, pageIdx, bookTitle, nextBookId, showChinese, onToggleChinese, showRoman, onToggleRoman, activeLine, isPlaying, onTogglePlay }: {
  page: PictureBookPage; bookId: string; pageIdx: number; bookTitle: string; nextBookId: string | null;
  showChinese: boolean; onToggleChinese: () => void;
  showRoman: boolean; onToggleRoman: () => void;
  activeLine: number; isPlaying: boolean; onTogglePlay: () => void;
}) {
  const { lang } = useLang();
  if (page.isSummary) {
    return <VocabSummaryPanel page={page} bookTitle={bookTitle} nextBookId={nextBookId} />;
  }

  const koLines = page.korean.split('\n');
  const proLines = page.pronunciation.split('\n');
  const zhLines = page.chinese.split('\n');

  // 把一行韩文按 page.vocab 生词拆分，命中词包 .word-lookup 高亮 span，其余走 TappableText
  const renderVocabLine = (text: string, vocab: { word: string }[]) => {
    if (!text.trim() || vocab.length === 0) {
      return <TappableText text={text} source={`picture-book:${bookTitle}`} className="pbr-ko" />;
    }
    // 收集所有生词在文本中的位置，按起止排序
    const matches: { start: number; end: number; word: string }[] = [];
    for (const v of vocab) {
      let pos = 0;
      while ((pos = text.indexOf(v.word, pos)) !== -1) {
        matches.push({ start: pos, end: pos + v.word.length, word: v.word });
        pos += v.word.length;
      }
    }
    if (matches.length === 0) {
      return <TappableText text={text} source={`picture-book:${bookTitle}`} className="pbr-ko" />;
    }
    // 去重叠，按 start 排序
    matches.sort((a, b) => a.start - b.start);
    const merged: typeof matches = [];
    for (const m of matches) {
      if (merged.length === 0 || m.start >= merged[merged.length - 1].end) {
        merged.push(m);
      }
    }
    // 拆分渲染
    const segments: React.ReactNode[] = [];
    let cursor = 0;
    merged.forEach((m, idx) => {
      if (m.start > cursor) {
        segments.push(
          <TappableText key={`t${idx}`} text={text.slice(cursor, m.start)} source={`picture-book:${bookTitle}`} className="pbr-ko" />
        );
      }
      segments.push(
        <TappableText key={`h${idx}`} text={text.slice(m.start, m.end)} source={`picture-book:${bookTitle}`} className="pbr-ko word-lookup" />
      );
      cursor = m.end;
    });
    if (cursor < text.length) {
      segments.push(
        <TappableText key="end" text={text.slice(cursor)} source={`picture-book:${bookTitle}`} className="pbr-ko" />
      );
    }
    return <span className="pbr-ko">{segments}</span>;
  };

  return (
    <div className="pbr-read">
      <div className="pbr-lines">
        {koLines.map((ko, i) => {
          const active = activeLine === i;
          return (
            <div key={i} className={`pbr-line${active ? ' active' : ''}`} style={{ '--i': i } as React.CSSProperties}>
              <span className="pbr-num">{String(i + 1).padStart(2, '0')}</span>
              {showRoman && <div className="pbr-roman">{proLines[i] ?? '…'}</div>}
              <div className="pbr-ko-row">
                {renderVocabLine(ko, page.vocab ?? [])}
                <button
                  className="pbr-speak"
                  onClick={(e) => { e.stopPropagation(); speakPreRecorded(bookLineAudioUrl(bookId, pageIdx, i), ko, 0.85); }}
                  title={t('pb.read_this_line', lang)}
                >
                  <Volume2 size={15} />
                </button>
              </div>
              {showChinese && <div className="pbr-zh">{zhLines[i] ?? '…'}</div>}
            </div>
          );
        })}
      </div>

      <div className="pbr-controls">
        <button className="pbr-play" onClick={onTogglePlay}>
          {isPlaying ? <><Pause size={15} /> {t('pb.pause', lang)}</> : <><Play size={15} /> {t('pb.read_page', lang)}</>}
        </button>
        <button className={`pbr-toggle${showChinese ? ' on' : ''}`} onClick={onToggleChinese}>
          {showChinese ? <EyeOff size={13} /> : <Eye size={13} />} {t('pb.translation', lang)}
        </button>
        <button className={`pbr-toggle${showRoman ? ' on' : ''}`} onClick={onToggleRoman}>
          {showRoman ? t('pb.hide_roman', lang) : t('pb.roman', lang)}
        </button>
      </div>

      <div className="pbr-vocab">
        {page.vocab.map((v) => (
          <button key={v.word} className="pbr-chip" onClick={(e) => { e.stopPropagation(); speak(v.word); }}>
            <span className="pbr-chip-ko">{v.word}</span>
            <span className="pbr-chip-zh">{v.meaning}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Reader
   ═══════════════════════════════════════════════════════ */
export default function PictureBookReaderPage() {
  const { lang } = useLang();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const smartBack = useSmartBack('/reading');
  const book = pictureBooks.find((b) => b.id === id);
  const bookIndex = pictureBooks.findIndex((b) => b.id === id);
  const { tier, matrix, loading: memLoading } = useMembership();

  // 阅览室侧栏
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setDark(document.documentElement.getAttribute('data-theme') === 'dark');
    }
  }, []);
  const [articles, setArticles] = useState<SidebarArticle[]>([]);
  const [articleProgress, setArticleProgress] = useState<Map<string, UserArticleProgress>>(new Map());
  useEffect(() => {
    let cancelled = false;
    (async () => {
      // 侧栏精简清单走 API，避免把 27k 行文章全库打进本页 bundle。
      try {
        const res = await fetch('/api/reading/sidebar');
        if (res.ok && !cancelled) {
          const data = await res.json();
          setArticles(data.articles ?? []);
        }
      } catch { /* skip */ }
      try {
        const all = await db.userArticleProgress.toArray();
        if (cancelled) return;
        const map = new Map<string, UserArticleProgress>();
        for (const p of all) map.set(p.articleId, p);
        setArticleProgress(map);
      } catch { /* skip */ }
    })();
    return () => { cancelled = true; };
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const swipeOffsetRef = useRef(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const isSwipingRef = useRef(false);
  const swipeRafRef = useRef<number | null>(null);

  const [showChinese, setShowChinese] = useState(false);
  const [showRoman, setShowRoman] = useState(false);
  const [flip, setFlip] = useState<{ to: number; dir: 'forward' | 'backward'; active: boolean } | null>(null);
  const flipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read-along
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  const playSeqRef = useRef(0);

  // 下一本（列表里的下一本，末尾回到 null）
  const nextBookId = useMemo(() => {
    if (!book) return null;
    const idx = pictureBooks.findIndex((b) => b.id === book.id);
    return idx >= 0 && idx < pictureBooks.length - 1 ? pictureBooks[idx + 1].id : null;
  }, [book]);

  // 恢复：续读页 + 译文偏好
  const restoredRef = useRef(false);
  useEffect(() => {
    if (!book || restoredRef.current) return;
    restoredRef.current = true;
    setShowChinese(getChinesePref());
    const prog = getProgress(book.id);
    if (prog && prog.page > 0 && prog.page < book.pages.length) {
      setCurrentPage(prog.page);
    }
  }, [book]);

  useEffect(() => {
    return () => { if (flipTimerRef.current) clearTimeout(flipTimerRef.current); };
  }, []);

  const totalPages = book?.pages.length ?? 0;
  const canGoNext = currentPage < totalPages - 1;
  const canGoPrev = currentPage > 0;

  // 这本书对当前会员档是否被内容墙锁住（memLoading 时先按未锁算，副作用/渲染另用 memLoading 短路）
  const bookLocked = !isPaidTier(tier) && bookIndex >= 0 && !canAccessBookIndex(matrix, tier, bookIndex);

  // 存进度 + 末页标记完成（会员加载中或被锁的书不记进度，避免锁着的书被误标完成）
  useEffect(() => {
    if (!book || memLoading || bookLocked) return;
    savePage(book.id, currentPage);
    if (currentPage === book.pages.length - 1) markComplete(book.id);
  }, [book, currentPage, memLoading, bookLocked]);

  const toggleChinese = useCallback(() => {
    setShowChinese((v) => { setChinesePref(!v); return !v; });
  }, []);

  const stopPlay = useCallback(() => {
    playSeqRef.current++;
    cancelSpeech();
    setIsPlaying(false);
    setActiveLine(-1);
  }, []);

  const executeFlip = useCallback((dir: 'forward' | 'backward') => {
    stopPlay();
    const target = dir === 'forward'
      ? Math.min(currentPage + 1, totalPages - 1)
      : Math.max(currentPage - 1, 0);

    setFlip({ to: target, dir, active: false });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlip((prev) => prev ? { ...prev, active: true } : null);
      });
    });

    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    flipTimerRef.current = setTimeout(() => {
      setCurrentPage(target);
      setFlip(null);
    }, FLIP_DURATION + 20);
  }, [currentPage, totalPages, stopPlay]);

  const goNext = useCallback(() => {
    if (!canGoNext || flip) return;
    executeFlip('forward');
  }, [canGoNext, flip, executeFlip]);

  const goPrev = useCallback(() => {
    if (!canGoPrev || flip) return;
    executeFlip('backward');
  }, [canGoPrev, flip, executeFlip]);

  const jumpToPage = useCallback((target: number) => {
    if (flip || target === currentPage || target < 0 || target >= totalPages) return;
    stopPlay();
    if (target === currentPage + 1) { executeFlip('forward'); return; }
    if (target === currentPage - 1) { executeFlip('backward'); return; }
    setCurrentPage(target);
  }, [flip, currentPage, totalPages, executeFlip, stopPlay]);

  // 整页跟读：逐行朗读 + 高亮，读完自动清空。
  // 按未过滤 split 下标迭代（跳空行但保留下标），与音源路径 + 高亮下标严格一致。
  const togglePlay = useCallback(() => {
    if (isPlaying) { stopPlay(); return; }
    if (!book) return;
    const cur = book.pages[currentPage];
    if (!cur || cur.isSummary) return;
    const lines = cur.korean.split('\n');
    if (!lines.some((l) => l.trim())) return;

    const mySeq = ++playSeqRef.current;
    setIsPlaying(true);

    const readLine = (i: number) => {
      if (playSeqRef.current !== mySeq) return;
      if (i >= lines.length) { setIsPlaying(false); setActiveLine(-1); return; }
      if (!lines[i].trim()) { readLine(i + 1); return; }
      setActiveLine(i);
      speakPreRecorded(bookLineAudioUrl(book.id, currentPage, i), lines[i], 0.85, () => {
        if (playSeqRef.current !== mySeq) return;
        readLine(i + 1);
      });
    };
    readLine(0);
  }, [isPlaying, stopPlay, book, currentPage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    swipeOffsetRef.current = 0;
    isSwipingRef.current = false;
    setSwipeOffset(0);
    setIsSwiping(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
      isSwipingRef.current = true;
      swipeOffsetRef.current = Math.max(-60, Math.min(60, dx));
      if (!swipeRafRef.current) {
        swipeRafRef.current = requestAnimationFrame(() => {
          swipeRafRef.current = null;
          setIsSwiping(true);
          setSwipeOffset(swipeOffsetRef.current);
        });
      }
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    isSwipingRef.current = false;
    const offset = swipeOffsetRef.current;
    swipeOffsetRef.current = 0;
    if (offset > 40) goPrev();
    else if (offset < -40) goNext();
    setSwipeOffset(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  // 卸载时停朗读
  useEffect(() => () => { playSeqRef.current++; cancelSpeech(); }, []);

  // 把 WordTapSheet 弹窗里的韩文字体设成绘本衬线
  useEffect(() => {
    document.documentElement.style.setProperty('--font-ko-sheet', "'Gowun Batang', 'Noto Serif SC', serif");
    return () => { document.documentElement.style.removeProperty('--font-ko-sheet'); };
  }, []);

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="text-6xl block mb-4">📖</span>
          <p className="text-[var(--text-secondary)] text-sm">{t('pb.not_found', lang)}</p>
          <Link href="/reading" className="text-[var(--pink-primary)] text-sm mt-2 inline-block">{t('pb.back_list', lang)}</Link>
        </div>
      </div>
    );
  }

  // 会员状态加载中：先出占位，避免付费绘本正文/插画在判墙前抢先渲染（内容闪现）
  if (memLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="text-4xl animate-pulse" aria-label={t('pb.loading', lang)}>📖</span>
      </div>
    );
  }

  // 会员内容墙：免费档仅前 N 本（默认 3）
  if (bookLocked) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-6">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-5xl block">👑</span>
          <p className="text-lg font-bold text-[var(--text-primary)]">{t('pb.member_book', lang)}</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
            {t('pb.member_book_sub', lang)}
          </p>
          <button
            onClick={() => router.push('/membership')}
            className="mt-2 px-6 py-2.5 rounded-full text-white text-sm font-bold"
            style={{ background: 'linear-gradient(150deg, #ff9dbb, #ff7fa8)', boxShadow: '0 5px 15px rgba(255,127,168,0.32)' }}
          >
            {t('pb.unlock_hall', lang)}
          </button>
          <Link href="/reading" className="text-[var(--pink-primary)] text-sm inline-block">{t('pb.back_list', lang)}</Link>
        </div>
      </div>
    );
  }

  const page = book.pages[currentPage];
  const flipActive = flip?.active ?? false;
  const flipPage = flip ? book.pages[flip.to] : null;
  const displayPage = flipPage ?? page;

  const leavingTransform = flipActive ? 'rotateY(-180deg)' : 'rotateY(0deg)';
  const enteringTransform = flipActive ? 'rotateY(0deg)' : 'rotateY(180deg)';

  const pct = totalPages > 1 ? Math.round((currentPage / (totalPages - 1)) * 100) : 100;
  const totalVocab = book.pages.reduce((n, p) => n + (p.vocab?.length ?? 0), 0);

  return (
    <div className={`lib-scope lib-picbook${dark ? ' lib-dark' : ''}`}>
      <div className={`lib-theme-toggle${drawerOpen ? ' drawer-open' : ''}`}>
        <button className={`lib-theme-btn${!dark ? ' active' : ''}`} onClick={() => { setDark(false); document.documentElement.setAttribute('data-theme', 'light'); }}><Sun size={13} /> 밝게</button>
        <button className={`lib-theme-btn${dark ? ' active' : ''}`} onClick={() => { setDark(true); document.documentElement.setAttribute('data-theme', 'dark'); }}><Moon size={13} /> 어둡게</button>
      </div>
      <div className="lib-shell">
        <LibrarySidebar
          articles={articles}
          progress={articleProgress}
          topics={TOPIC_META}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
        <div className="home-screen" role="main">
          <div className="main-topbar">
            <div className="breadcrumb">
              <button className="lib-menu-btn" onClick={() => setDrawerOpen(true)} aria-label="목록"><Menu size={17} /></button>
              <button className="lib-back" onClick={smartBack} aria-label="뒤로"><ArrowLeft size={16} /></button>
              <span>동물 도시 도서관</span>
              <span>›</span>
              <button className="kb-crumb-link" onClick={() => router.push('/reading')}>그림책관</button>
              <span>›</span>
              <span className="current">{book.title}</span>
            </div>
          </div>
          <div className="main-content">
            <div className="kb-reader-layout">
    <div className="pb-reader-root">
      <div className="pbr-shell">

        {/* Top bar */}
        <div className="pbr-top">
          <Link href="/reading" className="pbr-back">
            <ArrowLeft size={15} />
            <span>{t('pb.book_list', lang)}</span>
          </Link>
          <div className="pbr-titlebox">
            <span className="pbr-kicker">동물 도시 그림책관</span>
            <span className="pbr-booktitle">{book.title}</span>
          </div>
          <div className="pbr-chapter"><b>{String(currentPage + 1).padStart(2, '0')}</b> / {totalPages}</div>
        </div>

        {/* 3-col stage */}
        <div className="pbr-stage">

          {/* 左栏 目录 */}
          <aside className="pbr-toc">
            <div className="pbr-toc-card">
              <div className="pbr-progress-ring">
                <div className="pbr-ring" style={{ '--pct': `${pct}%` } as React.CSSProperties}><b>{pct}%</b></div>
                <div className="pbr-progress-meta">
                  <span className="big">{t('pb.reading_page', lang, { cur: currentPage + 1, total: totalPages })}</span>
                  <span className="sm">{t('pb.total_pages', lang, { n: totalPages })}</span>
                </div>
              </div>
              <div className="pbr-toc-head"><span className="hdot" />{t('pb.toc', lang)}</div>
              <div className="pbr-toc-list">
                {book.pages.map((_, i) => (
                  <button
                    key={i}
                    className={`pbr-toc-item${i === currentPage ? ' on' : ''}${i < currentPage ? ' read' : ''}`}
                    onClick={() => jumpToPage(i)}
                    disabled={!!flip}
                  >
                    <span className="pbr-toc-label">{t('pb.page_n', lang, { n: i + 1 })}</span>
                    {i < currentPage && <Check className="pbr-toc-check" size={12} strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="pbr-toc-card pbr-toc-vocab">
              <div>
                <div className="n">{totalVocab}</div>
                <div className="lbl">{t('pb.book_vocab', lang)}</div>
              </div>
            </div>
          </aside>

          {/* 中栏 拍立得插画 */}
          <div className="pbr-photo-wrap">
            <div
              className="pbr-photo pb-stage"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ transform: isSwiping && !flip ? `rotate(-1.4deg) translateX(${swipeOffset}px)` : undefined }}
            >
              <span className="pbr-tape tl" aria-hidden />
              <span className="pbr-tape br" aria-hidden />
              <div className="pbr-photo-img" style={{ perspective: '1200px' }}>
                {flip ? (
                  <>
                    <div className="pb-frame" style={{
                      position: 'absolute', inset: 0, zIndex: 20,
                      transformOrigin: 'left center', transform: leavingTransform,
                      transition: flipActive ? `transform ${FLIP_DURATION}ms ease-in-out` : 'none',
                      backfaceVisibility: 'hidden',
                    }}>
                      <ImageCard page={book.pages[flip.dir === 'forward' ? currentPage : flip.to]} />
                    </div>
                    <div className="pb-frame" style={{
                      position: 'absolute', inset: 0, zIndex: 10,
                      transformOrigin: 'left center', transform: enteringTransform,
                      transition: flipActive ? `transform ${FLIP_DURATION}ms ease-in-out` : 'none',
                      backfaceVisibility: 'hidden',
                    }}>
                      <ImageCard page={book.pages[flip.to]} />
                    </div>
                  </>
                ) : (
                  <div className="pb-frame" style={{ position: 'absolute', inset: 0 }}>
                    <ImageCard page={page} />
                  </div>
                )}
              </div>
              {!displayPage.isSummary && <div className="pbr-photo-caption">{t('pb.page_n', lang, { n: (flip ? flip.to : currentPage) + 1 })}</div>}
            </div>
          </div>

          {/* 右栏 正文 */}
          <TextPanel
            page={displayPage}
            bookId={book.id}
            pageIdx={flip ? flip.to : currentPage}
            bookTitle={book.title}
            nextBookId={nextBookId}
            showChinese={showChinese}
            onToggleChinese={toggleChinese}
            showRoman={showRoman}
            onToggleRoman={() => setShowRoman((v) => !v)}
            activeLine={flip ? -1 : activeLine}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
          />
        </div>

        {/* Footer nav */}
        <div className="pbr-foot">
          <button className="pbr-arrow" onClick={goPrev} disabled={!canGoPrev || !!flip} aria-label={t('pb.prev_page', lang)}>
            <ChevronLeft size={18} />
          </button>
          <div className="pbr-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`pbr-dot${i === currentPage ? ' on' : ''}${i < currentPage ? ' read' : ''}`}
                onClick={() => jumpToPage(i)}
                disabled={!!flip}
                aria-label={t('pb.page_n', lang, { n: i + 1 })}
              />
            ))}
          </div>
          <span className="pbr-foot-hint">← → · {t('pb.toc', lang)}</span>
          <button className="pbr-arrow" onClick={goNext} disabled={!canGoNext || !!flip} aria-label={t('pb.next_page', lang)}>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 移动端悬浮翻页（滚动到哪都能切页） */}
        <div className="pbr-float-nav" aria-hidden={false}>
          <button className="pbr-fab" onClick={goPrev} disabled={!canGoPrev || !!flip} aria-label={t('pb.prev_page', lang)}>
            <ChevronLeft size={20} />
          </button>
          <span className="pbr-fab-page">{currentPage + 1}<i>/</i>{totalPages}</span>
          <button className="pbr-fab" onClick={goNext} disabled={!canGoNext || !!flip} aria-label={t('pb.next_page', lang)}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
              <aside className="kb-reader-rail">
                <div className="kb-rail-card">
                  <h4 className="kb-rail-card-title">{t('reading.rail_toc', lang)}</h4>
                  <div className="kb-rail-toc">
                    {book.pages.map((_, i) => (
                      <button
                        key={i}
                        className={`kb-rail-toc-item${i === currentPage ? ' active' : ''}${i < currentPage ? ' read' : ''}`}
                        onClick={() => jumpToPage(i)}
                        disabled={!!flip}
                      >
                        <span className="kb-rail-toc-emoji">{i < currentPage ? '✓' : String(i + 1)}</span>
                        <span>{t('pb.page_n', lang, { n: i + 1 })}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {page && page.vocab.length > 0 && (
                  <div className="kb-rail-card">
                    <h4 className="kb-rail-card-title">{t('reading.rail_page_vocab', lang)}</h4>
                    <div className="kb-rail-vocab">
                      {page.vocab.map((v) => (
                        <div className="kb-rail-vocab-item" key={v.word}>
                          <span className="kb-rail-vocab-ko">{v.word}</span>
                          <span className="kb-rail-vocab-zh">{v.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="kb-rail-card">
                  <h4 className="kb-rail-card-title">{t('reading.rail_info', lang)}</h4>
                  <div className="kb-rail-info">
                    <div className="kb-rail-info-row"><span>📖</span><span>{t('pb.total_pages', lang, { n: totalPages })}</span></div>
                    <div className="kb-rail-info-row"><span>📝</span><span>{t('pb.book_vocab', lang)} {totalVocab}</span></div>
                    <div className="kb-rail-info-row"><span>{book.emoji}</span><span>{book.title}</span></div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
