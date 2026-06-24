'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, X, Search, Loader2, Star } from 'lucide-react';
import { db, FAVORITES_BOOK_ID } from '@/lib/db';
import { WordBookCard } from '@/components/WordBookCard';
import type { WordBook } from '@/types';

const PRESET_COLORS = [
  { value: 'var(--color-vocab)', label: '奶黄', hex: '#FFE4A0' },
  { value: 'var(--pink-primary)', label: '珊瑚粉', hex: '#FF8FAB' },
  { value: 'var(--mint-soft)', label: '薄荷绿', hex: '#A8D8D0' },
  { value: 'var(--purple-soft)', label: '薰衣草紫', hex: '#C9B8E8' },
  { value: 'var(--blue-soft)', label: '天空蓝', hex: '#A8C8E8' },
  { value: 'var(--peach-soft)', label: '蜜桃', hex: '#FFBEA8' },
];

export function BooksSection() {
  const [books, setBooks] = useState<WordBook[]>([]);
  const [wordCounts, setWordCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<WordBook | null>(null);
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formColor, setFormColor] = useState(PRESET_COLORS[0].value);
  const [saving, setSaving] = useState(false);

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
    setWordCounts(counts);
    setLoading(false);
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
    setSaving(true);
    const now = Date.now();
    if (editingBook) {
      await db.wordBooks.update(editingBook.id, {
        name: formName.trim(),
        description: formDesc.trim(),
        color: formColor,
        updatedAt: now,
      }).catch(() => {});
    } else {
      await db.wordBooks.put({
        id: crypto.randomUUID(),
        name: formName.trim(),
        description: formDesc.trim(),
        wordIds: [],
        color: formColor,
        createdAt: now,
        updatedAt: now,
      }).catch(() => {});
    }
    setShowModal(false);
    setSaving(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除这个单词本吗？')) return;
    await db.wordBooks.delete(id).catch(() => {});
    load();
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
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索单词本..."
            className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
          />
        </div>
        <button
          onClick={handleCreate}
          className="shrink-0 flex items-center gap-1.5 bg-[var(--pink-primary)] text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          新建
        </button>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-3">📚</span>
          <p className="text-[var(--text-secondary)] text-sm mb-1">
            {search ? '没有找到匹配的单词本' : '还没有自定义单词本'}
          </p>
          <p className="text-[var(--text-muted)] text-xs mb-4">
            {search ? '换个关键词试试' : '创建你的第一个单词本，开始整理单词吧'}
          </p>
          {!search && (
            <button onClick={handleCreate} className="btn-primary">+ 新建单词本</button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <WordBookCard
              key={book.id}
              book={book}
              wordCount={wordCounts[book.id] || 0}
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
                {editingBook ? '编辑单词本' : '新建单词本'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X size={20} />
              </button>
            </div>

            <div>
              <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">名称</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="例如：日常用语、旅行必备..."
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">说明（可选）</label>
              <input
                type="text"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="简短描述这个单词本..."
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">主题色</label>
              <div className="flex items-center gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setFormColor(c.value)}
                    className={`w-8 h-8 rounded-full transition-all ${
                      formColor === c.value ? 'ring-2 ring-offset-2 ring-[var(--pink-primary)] scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !formName.trim()}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-[var(--pink-primary)] hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                {saving ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
