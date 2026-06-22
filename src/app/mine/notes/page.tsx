'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, StickyNote, Plus, Trash2 } from 'lucide-react';
import { db } from '@/lib/db';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader, Section, Card, Button } from '@/components/ui';

interface Note {
  id: string;
  title: string;
  content?: string;
  sourceType?: string;
  createdAt?: number;
  updatedAt?: number;
}

export default function MineNotesPage() {
  const isDesktop = useIsDesktop();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.notes.orderBy('createdAt').reverse().toArray()
      .then((rows) => setNotes(rows as Note[]))
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, []);

  const deleteNote = async (id: string) => {
    if (!confirm('删除这条笔记？')) return;
    await db.notes.delete(id).catch(() => {});
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const containerCls = isDesktop ? 'py-4 max-w-5xl mx-auto' : 'py-4 max-w-2xl mx-auto';

  return (
    <div className={containerCls}>
      <Link
        href="/mine"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
          marginBottom: 14,
        }}
      >
        <ArrowLeft size={14} />
        返回我的
      </Link>

      <PageHeader
        eyebrow="MY NOTES"
        title="我的笔记"
        subtitle={notes.length > 0 ? `共 ${notes.length} 条` : '记录学习中的灵感与备忘'}
        tone="mint"
        flat
      />

      {loading ? (
        <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 24, height: 24, borderRadius: '50%',
              border: '2px solid var(--color-pink-base)', borderTopColor: 'transparent',
              animation: 'tori-spin 0.7s linear infinite',
              margin: '0 auto',
            }}
          />
        </Card>
      ) : notes.length === 0 ? (
        <Card variant="hero" tone="mint" padding="lg">
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 64, height: 64, borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface-2)', color: 'var(--color-mint-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
              }}
              aria-hidden
            >
              <StickyNote size={28} strokeWidth={1.75} />
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: '0 0 6px' }}>
              还没有笔记
            </h2>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '0 0 20px', lineHeight: 1.6 }}>
              学习过程中记录的笔记和备忘，会出现在这里
            </p>
            <Link href="/grammar" style={{ textDecoration: 'none' }}>
              <Button variant="primary" tone="black" icon={<Plus size={15} />}>去学习</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Section spacing="normal">
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 10 }}>
            {notes.map((note) => (
              <Card key={note.id} variant="default" padding="md">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: 15, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0,
                        overflow: 'hidden', display: '-webkit-box',
                        WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const,
                      }}
                    >
                      {note.title}
                    </h3>
                    {note.content && (
                      <p
                        style={{
                          fontSize: 12, color: 'var(--color-ink-3)', margin: '6px 0 0', lineHeight: 1.6,
                          overflow: 'hidden', display: '-webkit-box',
                          WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const,
                        }}
                      >
                        {note.content}
                      </p>
                    )}
                    {note.createdAt && (
                      <p style={{ fontSize: 11, color: 'var(--color-ink-4)', margin: '8px 0 0' }}>
                        {new Date(note.createdAt).toLocaleDateString('zh-CN')}
                        {note.sourceType && ` · ${note.sourceType}`}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    title="删除"
                    style={{
                      flexShrink: 0,
                      padding: 8, borderRadius: 'var(--radius-sm)',
                      background: 'transparent', border: 'none',
                      color: 'var(--color-ink-4)',
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
