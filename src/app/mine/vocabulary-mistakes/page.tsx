'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, AlertCircle, RotateCcw } from 'lucide-react';
import { db } from '@/lib/db';
import type { SpellingMistake } from '@/types';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader, Section, Card, Button } from '@/components/ui';

type TabType = 'all' | 'spelling' | 'sentence';

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}小时前`;
  const days = Math.floor(hours / 24);
  return `${days}天前`;
}

export default function VocabularyMistakesPage() {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const [mistakes, setMistakes] = useState<SpellingMistake[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabType>('all');

  const loadMistakes = useCallback(async () => {
    setLoading(true);
    try {
      const all = await db.spellingMistakes.toArray();
      all.sort((a, b) => b.createdAt - a.createdAt);
      setMistakes(all);
    } catch {
      setMistakes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadMistakes(); }, [loadMistakes]);

  const deleteMistake = async (id: string) => {
    await db.spellingMistakes.delete(id).catch(() => {});
    setMistakes(prev => prev.filter(m => m.id !== id));
  };

  const clearAll = async () => {
    const filtered = tab === 'all' ? mistakes : mistakes.filter(m => m.mistakeType === tab);
    await Promise.all(filtered.map(m => db.spellingMistakes.delete(m.id).catch(() => {})));
    if (tab === 'all') {
      setMistakes([]);
    } else {
      setMistakes(prev => prev.filter(m => m.mistakeType !== tab));
    }
  };

  const retryMistakes = () => {
    const filtered = tab === 'all' ? mistakes : mistakes.filter(m => m.mistakeType === tab);
    const wordIds = [...new Set(filtered.map(m => m.wordId).filter(Boolean))];
    if (wordIds.length === 0) return;
    router.push(`/review?wordIds=${wordIds.join(',')}`);
  };

  const filtered = tab === 'all' ? mistakes : mistakes.filter(m => m.mistakeType === tab);
  const spellingCount = mistakes.filter(m => m.mistakeType === 'spelling').length;
  const sentenceCount = mistakes.filter(m => m.mistakeType === 'sentence').length;

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: 'all', label: '全部', count: mistakes.length },
    { key: 'spelling', label: '默写', count: spellingCount },
    { key: 'sentence', label: '造句', count: sentenceCount },
  ];

  const containerCls = isDesktop ? 'py-4 max-w-5xl mx-auto' : 'py-4 max-w-2xl mx-auto';

  return (
    <div className={containerCls} style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}>
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
        eyebrow="MISTAKE BOOK"
        title="我的错题"
        subtitle={mistakes.length > 0 ? `共 ${mistakes.length} 道错题待重练` : '默写和造句中答错的内容会记录在这里'}
        tone="pink"
        flat
      />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {tabs.map(t => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: '8px 18px', borderRadius: 'var(--radius-pill)',
                fontSize: 13, fontWeight: 700,
                background: active ? 'var(--color-ink-1)' : 'var(--color-surface-2)',
                color: active ? '#fff' : 'var(--color-ink-3)',
                border: active ? 'none' : '1px solid var(--color-border-2)',
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-soft)',
              }}
            >
              {t.label} {t.count > 0 && <span style={{ opacity: 0.7 }}>({t.count})</span>}
            </button>
          );
        })}
      </div>

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
      ) : filtered.length === 0 ? (
        <Card variant="hero" tone="mint" padding="lg">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
            <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>暂无错题</p>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>
              继续保持，做练习时的错误会记录在这里
            </p>
          </div>
        </Card>
      ) : (
        <Section spacing="normal">
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 10 }}>
            {filtered.map(m => (
              <Card key={m.id} variant="default" padding="md">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <AlertCircle size={16} color="var(--color-pink-strong)" />
                      <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-ink-1)' }}>{m.word}</span>
                      <span
                        style={{
                          fontSize: 11, fontWeight: 700,
                          padding: '2px 8px', borderRadius: 'var(--radius-pill)',
                          background: m.mistakeType === 'spelling' ? 'var(--color-pink-soft)' : 'var(--color-mint-soft)',
                          color: m.mistakeType === 'spelling' ? 'var(--color-pink-strong)' : 'var(--color-mint-strong)',
                        }}
                      >
                        {m.mistakeType === 'spelling' ? '默写' : '造句'}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '0 0 8px' }}>{m.meaning}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ fontSize: 13 }}>
                        <span style={{ color: 'var(--color-ink-3)' }}>我的：</span>
                        <span style={{ textDecoration: 'line-through', color: 'var(--color-pink-strong)' }}>
                          {m.userInput || '（未填写）'}
                        </span>
                      </div>
                      <div style={{ fontSize: 13 }}>
                        <span style={{ color: 'var(--color-ink-3)' }}>正确：</span>
                        <span style={{ color: 'var(--color-mint-strong)', fontWeight: 700 }}>{m.correctAnswer}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => deleteMistake(m.id)}
                      title="删除"
                      style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: 'var(--color-pink-soft)', color: 'var(--color-pink-strong)',
                        border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                    <span style={{ fontSize: 11, color: 'var(--color-ink-4)' }}>{timeAgo(m.createdAt)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {filtered.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))',
            left: 0, right: 0,
            background: 'var(--color-surface-1)',
            borderTop: '1px solid var(--color-border-1)',
            zIndex: 60,
            padding: '12px 16px',
          }}
        >
          <div style={{
            display: 'flex', gap: 8,
            maxWidth: isDesktop ? 720 : '100%',
            margin: '0 auto',
          }}>
            <Button variant="secondary" fullWidth icon={<Trash2 size={14} />} onClick={clearAll}>
              清空{tab !== 'all' ? tabs.find(t => t.key === tab)?.label : '全部'}
            </Button>
            <Button variant="primary" tone="black" fullWidth icon={<RotateCcw size={14} />} onClick={retryMistakes}>
              重练错题
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
