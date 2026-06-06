'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, StickyNote, Plus, Trash2 } from 'lucide-react';
import { db } from '@/lib/db';

interface Note {
  id: string;
  title: string;
  content?: string;
  sourceType?: string;
  createdAt?: number;
  updatedAt?: number;
}

export default function MineNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.notes.orderBy('createdAt').reverse().toArray()
      .then((rows) => setNotes(rows as Note[]))
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, []);

  const deleteNote = async (id: string) => {
    await db.notes.delete(id).catch(() => {});
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="py-4 space-y-4">
      <div className="flex items-center gap-2 text-[13px]">
        <Link href="/mine" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
          <ArrowLeft size={14} />返回
        </Link>
        <span className="text-[var(--border-color)]">/</span>
        <span className="text-[var(--text-secondary)] font-medium">我的笔记</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-[var(--text-primary)]">我的笔记</h1>
        {notes.length > 0 && (
          <span className="text-[12px] text-[var(--text-muted)]">{notes.length} 条</span>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 rounded-full border-2 border-[var(--pink-primary)] border-t-transparent animate-spin" />
        </div>
      ) : notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--bg-muted)] flex items-center justify-center mb-4">
            <StickyNote size={28} className="text-[var(--border-color)]" />
          </div>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">还没有笔记</h2>
          <p className="text-[13px] text-[var(--text-muted)] max-w-xs leading-relaxed">
            学习过程中记录的笔记和备忘，会出现在这里
          </p>
          <Link
            href="/grammar"
            className="mt-6 flex items-center gap-2 h-11 px-6 rounded-full bg-[var(--text-primary)] text-white text-[13px] font-bold"
          >
            <Plus size={15} />去学习
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-[20px] bg-[var(--bg-card)] border border-[var(--border-color)] p-4 shadow-[0_2px_8px_rgba(92,64,38,0.04)]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-[var(--text-primary)] line-clamp-1">{note.title}</h3>
                  {note.content && (
                    <p className="text-[12px] text-[var(--text-muted)] mt-1 line-clamp-3 leading-relaxed">
                      {note.content}
                    </p>
                  )}
                  {note.createdAt && (
                    <p className="text-[11px] text-[var(--border-color)] mt-2">
                      {new Date(note.createdAt).toLocaleDateString('zh-CN')}
                      {note.sourceType && ` · ${note.sourceType}`}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="shrink-0 p-2 rounded-xl text-[var(--border-color)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)] transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
