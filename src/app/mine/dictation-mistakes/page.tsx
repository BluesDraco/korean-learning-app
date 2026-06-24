'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, PenLine } from 'lucide-react';
import { db } from '@/lib/db';
import type { DictationRecord } from '@/types';
import { DictationSession } from '@/components/dictation/DictationSession';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader, Section, Card, Button } from '@/components/ui';

interface MistakeGroup {
  korean: string;
  meaning: string;
  wrongCount: number;
  lastWrongAt: number;
  records: DictationRecord[];
}

export default function DictationMistakesPage() {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const [mistakes, setMistakes] = useState<MistakeGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [practicing, setPracticing] = useState(false);

  async function loadMistakes() {
    try {
      const wrongRecords = await db.dictationRecords.filter(r => !r.correct);
      const grouped: Record<string, MistakeGroup> = {};
      for (const r of wrongRecords) {
        if (!grouped[r.wordId]) {
          grouped[r.wordId] = { korean: r.wordId, meaning: r.meaning || '', wrongCount: 0, lastWrongAt: 0, records: [] };
        }
        grouped[r.wordId].wrongCount++;
        if (r.date > grouped[r.wordId].lastWrongAt) grouped[r.wordId].lastWrongAt = r.date;
        grouped[r.wordId].records.push(r);
      }
      const sorted = Object.values(grouped).sort((a, b) => b.wrongCount - a.wrongCount);
      setMistakes(sorted);
    } catch {
      setMistakes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadMistakes(); }, []);

  async function handleMastered(korean: string) {
    const records = await db.dictationRecords.filter(r => r.wordId === korean);
    await Promise.all(records.map((r: DictationRecord) => db.dictationRecords.delete(r.id).catch(() => {})));
    setMistakes(prev => prev.filter(m => m.korean !== korean));
  }

  function formatDate(ts: number) {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  if (practicing) {
    return (
      <DictationSession
        items={mistakes.map(m => ({ korean: m.korean, meaning: m.meaning, type: 'word' as const }))}
        onExit={() => { setPracticing(false); loadMistakes(); }}
        exitLabel="返回错题本"
      />
    );
  }

  const containerCls = isDesktop ? 'py-4 max-w-4xl mx-auto' : 'py-4 max-w-2xl mx-auto';

  return (
    <div className={containerCls} style={{ paddingBottom: 40 }}>
      <button
        onClick={() => router.back()}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', background: 'transparent', border: 'none',
          padding: 0, cursor: 'pointer', marginBottom: 14,
        }}
      >
        <ArrowLeft size={16} />
        返回
      </button>

      <PageHeader
        eyebrow="MISTAKE BOOK"
        title="默写错题本"
        subtitle={`${mistakes.length} 个词需要加强`}
        tone="pink"
        flat
      />

      {loading ? (
        <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--color-ink-3)', margin: 0 }}>加载中…</p>
        </Card>
      ) : mistakes.length === 0 ? (
        <Card variant="hero" tone="mint" padding="lg">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>暂无错题</p>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 18px' }}>
              完成默写练习后，答错的词会出现在这里
            </p>
            <Button variant="primary" tone="pink" onClick={() => router.push('/dictation')}>
              去默写练习
            </Button>
          </div>
        </Card>
      ) : (
        <Section spacing="normal">
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 10 }}>
            {mistakes.map(m => (
              <Card key={m.korean} variant="default" padding="md">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 18, fontWeight: 900, color: 'var(--color-ink-1)' }}>{m.korean}</span>
                      <span
                        style={{
                          fontSize: 11, fontWeight: 700,
                          color: 'var(--color-pink-strong)', background: 'var(--color-pink-soft)',
                          borderRadius: 6, padding: '2px 8px',
                        }}
                      >
                        ×{m.wrongCount}
                      </span>
                    </div>
                    {m.meaning && (
                      <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>{m.meaning}</p>
                    )}
                    <p style={{ fontSize: 11, color: 'var(--color-ink-4)', margin: '2px 0 0' }}>
                      最近出错 {formatDate(m.lastWrongAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleMastered(m.korean)}
                    title="已掌握，从错题本移除"
                    style={{
                      width: 34, height: 34, borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border-2)', background: 'var(--color-surface-2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', flexShrink: 0,
                      color: 'var(--color-ink-3)',
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <Button
              variant="primary"
              tone="black"
              size="lg"
              fullWidth
              icon={<PenLine size={16} />}
              onClick={() => setPracticing(true)}
            >
              再练一遍
            </Button>
          </div>
        </Section>
      )}
    </div>
  );
}
