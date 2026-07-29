'use client';

// Practice 页内嵌单词本面板
// 桌面：右侧滑入 360px 列；手机：中心对话框。
// 数据只读：展示用户已收藏的词，分本切换 + 搜索 + 点行填输入框 + TTS。
// 不做增删改（去 /vocabulary/books）。

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { X, Search, Volume2, ExternalLink } from 'lucide-react';
import { db } from '@/lib/db';
import { speakWord } from '@/lib/tts';
import type { Word, WordBook } from '@/types';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  open: boolean;
  onClose: () => void;
  onPick: (ko: string) => void;
}

export function WordbookPanel({ open, onClose, onPick }: Props) {
  const { lang } = useLang();
  const [books, setBooks] = useState<WordBook[]>([]);
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [activeBookId, setActiveBookId] = useState<string>('');
  const [search, setSearch] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const load = useCallback(async () => {
    setLoadError(false);
    try {
      const [bs, ws] = await Promise.all([
        db.wordBooks.toArray(),
        db.words.toArray(),
      ]);
      const sortedBooks = bs.slice().sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setBooks(sortedBooks);
      setAllWords(ws);
      setActiveBookId((cur) => cur || sortedBooks[0]?.id || '');
      setLoaded(true);
    } catch {
      setLoadError(true);
    }
  }, []);

  // 首次 open 时加载
  useEffect(() => {
    if (open && !loaded) load();
  }, [open, loaded, load]);

  // ESC 关闭
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const activeBook = books.find((b) => b.id === activeBookId);
  const wordMap = new Map(allWords.map((w) => [w.id, w]));
  const bookWords: Word[] = (activeBook?.wordIds ?? [])
    .map((id) => wordMap.get(id))
    .filter((w): w is Word => !!w);
  const meaningOf = (w: Word) =>
    w.meanings?.length ? w.meanings.map((m) => m.chinese).join('；') : (w.meaning ?? '');
  const filtered = search.trim()
    ? bookWords.filter((w) => {
        const q = search.trim().toLowerCase();
        return w.word.toLowerCase().includes(q) || meaningOf(w).toLowerCase().includes(q);
      })
    : bookWords;

  if (!open) return null;

  const isEmpty = loaded && books.length === 0;

  return (
    <>
      <div className="wordbook-backdrop" onClick={onClose} role="presentation" />
      <aside className={`wordbook-panel${open ? ' open' : ''}`}>
        <header className="wbp-header">
          <div className="wbp-title">📓 {t('wbpanel.title', lang)}</div>
          <button type="button" className="wbp-close" onClick={onClose} aria-label={t('wbpanel.close', lang)}>
            <X size={18} />
          </button>
        </header>

        {loadError && (
          <div className="wbp-state">
            <p>{t('wbpanel.load_failed', lang)}</p>
            <button type="button" className="wbp-retry" onClick={load}>{t('wbpanel.retry', lang)}</button>
          </div>
        )}

        {!loaded && !loadError && (
          <div className="wbp-state"><p>{t('wbpanel.loading', lang)}</p></div>
        )}

        {isEmpty && (
          <div className="wbp-state">
            <div className="wbp-empty-icon">📚</div>
            <p className="wbp-empty-title">{t('wbpanel.empty_title', lang)}</p>
            <p className="wbp-empty-sub">{t('wbpanel.empty_sub', lang)}</p>
            <Link href="/vocabulary/books" className="wbp-empty-link">
              {t('wbpanel.manage_books', lang)} <ExternalLink size={12} />
            </Link>
          </div>
        )}

        {loaded && books.length > 0 && (
          <>
            <div className="wbp-tabs">
              {books.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={`wbp-tab${b.id === activeBookId ? ' active' : ''}`}
                  onClick={() => { setActiveBookId(b.id); setSearch(''); }}
                >
                  <span className="wbp-tab-name">{b.name}</span>
                  <span className="wbp-tab-count">{b.wordIds.length}</span>
                </button>
              ))}
            </div>

            <div className="wbp-search">
              <Search size={14} />
              <input
                type="text"
                placeholder={t('wbpanel.search_placeholder', lang)}
                aria-label={t('wbpanel.search_aria', lang)}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="wbp-list">
              {filtered.length === 0 ? (
                <div className="wbp-list-empty">
                  {search.trim() ? t('wbpanel.no_match', lang) : t('wbpanel.book_empty', lang)}
                </div>
              ) : (
                filtered.map((w) => (
                  <div
                    key={w.id}
                    className="wbp-item"
                    onClick={() => onPick(w.word)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') onPick(w.word); }}
                  >
                    <div className="wbp-item-text">
                      <div className="wbp-item-ko">{w.word}</div>
                      {meaningOf(w) && <div className="wbp-item-zh">{meaningOf(w)}</div>}
                    </div>
                    <button
                      type="button"
                      className="wbp-item-tts"
                      onClick={(e) => { e.stopPropagation(); speakWord(w.word); }}
                      aria-label={t('wbpanel.play_audio', lang)}
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
