'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, X, Search, Loader2, Star } from 'lucide-react';
import { db, FAVORITES_BOOK_ID } from '@/lib/db';
import { WordBookCard } from '@/components/WordBookCard';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';
import type { WordBook } from '@/types';

const PRESET_COLORS = [
  { value: 'var(--color-vocab)', labelKey: 'vocab.books_color_cream', hex: '#FFE4A0' },
  { value: 'var(--pink-primary)', labelKey: 'vocab.books_color_coral', hex: '#FF8FAB' },
  { value: 'var(--mint-soft)', labelKey: 'vocab.books_color_mint', hex: '#A8D8D0' },
  { value: 'var(--purple-soft)', labelKey: 'vocab.books_color_lavender', hex: '#C9B8E8' },
  { value: 'var(--blue-soft)', labelKey: 'vocab.books_color_sky', hex: '#A8C8E8' },
  { value: 'var(--peach-soft)', labelKey: 'vocab.books_color_peach', hex: '#FFBEA8' },
];

export function BooksSection() {
  const [books, setBooks] = useState<WordBook[]>([]);
  const [wordCounts, setWordCounts] = useState<Record<string, number>>({});
  const [masteredCounts, setMasteredCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<WordBook | null>(null);
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formColor, setFormColor] = useState(PRESET_COLORS[0].value);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<WordBook | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { showToast } = useToast();
  const { lang } = useLang();

  const load = useCallback(async () => {
    const list = await db.wordBooks.orderBy('createdAt').reverse().toArray();
    // 「我的收藏」置顶
    const favIdx = list.findIndex(b => b.id === FAVORITES_BOOK_ID);
    if (favIdx > 0) {
      const [fav] = list.splice(favIdx, 1);
      list.unshift(fav);
    }
    setBooks(list);
    const counts: Record<string, number> = {};
    for (const b of list) {
      counts[b.id] = b.wordIds.length;
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = () => {
    setEditingBook(null);
    setFormName('');
    setFormDesc('');
    setFormColor(PRESET_COLORS[0].value);
    setShowModal(true);
  };

  const handleRename = (book: WordBook) => {
    setEditingBook(book);
    setFormName(book.name);
    setFormDesc(book.description);
    setFormColor(book.color);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formName.trim()) return;
    const trimmed = formName.trim();
    if (!editingBook && books.some(b => b.name === trimmed)) {
      showToast(t('vocab.books_duplicate_name', lang), 'error');
      return;
    }
    setSaving(true);
    const now = Date.now();
    try {
      if (editingBook) {
        await db.wordBooks.update(editingBook.id, {
          name: formName.trim(),
          description: formDesc.trim(),
          color: formColor,
          updatedAt: now,
        });
      } else {
        await db.wordBooks.put({
          id: crypto.randomUUID(),
          name: formName.trim(),
          description: formDesc.trim(),
          wordIds: [],
          color: formColor,
          createdAt: now,
          updatedAt: now,
        });
      }
      setShowModal(false);
      load();
    } catch {
      showToast(t('vocab.books_err_save', lang), 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    const book = books.find((b) => b.id === id);
    if (!book) return;
    setDeleteTarget(book);
  };

  const confirmDelete = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await db.wordBooks.delete(deleteTarget.id);
      setDeleteTarget(null);
      showToast(t('vocab.books_deleted', lang), 'success');
      load();
    } catch {
      showToast(t('vocab.books_err_delete', lang), 'error');
    } finally {
      setDeleting(false);
    }
  };

  const filteredBooks = search
    ? books.filter((b) => b.name.includes(search) || b.description.includes(search))
    : books;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={24} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('vocab.books_search_ph', lang)}
            className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
          />
        </div>
        <button
          onClick={handleCreate}
          className="shrink-0 flex items-center gap-1.5 bg-[var(--pink-primary)] text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          {t('vocab.hub_new', lang)}
        </button>
      </div>

      {loadError ? (
        <div className="text-center py-16">
          <p className="text-sm text-[var(--text-secondary)] mb-3">{t('vocab.load_failed', lang)}</p>
          <button onClick={() => { setLoadError(false); load(); }} className="text-sm text-[var(--pink-primary)] underline">{t('vocab.retry', lang)}</button>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-3">📚</span>
          <p className="text-[var(--text-secondary)] text-sm mb-1">
            {search ? t('vocab.books_no_match', lang) : t('vocab.books_no_custom', lang)}
          </p>
          <p className="text-[var(--text-muted)] text-xs mb-4">
            {search ? t('vocab.books_try_keyword', lang) : t('vocab.books_create_first', lang)}
          </p>
          {!search && (
            <button
              onClick={handleCreate}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'var(--pink-primary)' }}
            >
              {t('vocab.books_new_book', lang)}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <WordBookCard
              key={book.id}
              book={book}
              wordCount={wordCounts[book.id] || 0}
              masteredCount={masteredCounts[book.id] || 0}
              onRename={handleRename}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowModal(false)} />
          <div className="relative bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-xl w-full max-w-md p-6 space-y-4 animate-bounce-in max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {editingBook ? t('vocab.books_edit_book', lang) : t('vocab.books_new_book_title', lang)}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X size={20} />
              </button>
            </div>

            <div>
              <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">{t('vocab.books_name', lang)}</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && formName.trim()) handleSave(); }}
                placeholder={t('vocab.books_name_ph', lang)}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">{t('vocab.books_desc', lang)}</label>
              <input
                type="text"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && formName.trim()) handleSave(); }}
                placeholder={t('vocab.books_desc_ph', lang)}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">{t('vocab.books_theme_color', lang)}</label>
              <div className="flex items-center gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setFormColor(c.value)}
                    className={`w-10 h-10 rounded-full transition-all ${
                      formColor === c.value ? 'ring-2 ring-offset-2 ring-[var(--pink-primary)] scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={t(c.labelKey, lang)}
                    aria-label={t(c.labelKey, lang)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-colors"
              >
                {t('common.cancel', lang)}
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !formName.trim()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium text-white bg-[var(--pink-primary)] hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                {saving ? <><Loader2 size={14} className="animate-spin" />{t('vocab.books_saving', lang)}</> : t('common.save', lang)}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => !deleting && setDeleteTarget(null)} />
          <div className="relative bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-xl w-full max-w-sm p-5 space-y-4 animate-bounce-in">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">{t('vocab.books_delete_book', lang)}</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                {t('vocab.books_delete_confirm', lang, { name: deleteTarget.name })}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-input)] text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] disabled:opacity-50 transition-colors"
              >
                {t('common.cancel', lang)}
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-[var(--color-danger)] hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {deleting ? t('vocab.books_deleting', lang) : t('vocab.books_confirm_delete', lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
