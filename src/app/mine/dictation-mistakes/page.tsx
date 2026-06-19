'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, PenLine } from 'lucide-react';
import { db } from '@/lib/db';
import type { DictationRecord } from '@/types';
import { DictationSession } from '@/components/dictation/DictationSession';
import type { DictationItem } from '@/components/dictation/DictationSession';
import { useTheme } from '@/components/ThemeProvider';

interface MistakeGroup {
  korean: string;
  meaning: string;
  wrongCount: number;
  lastWrongAt: number;
  records: DictationRecord[];
}

const LIGHT_C = { ink: '#241917', muted: '#89756e', line: '#eee0d8', pink: '#ff7fa8', pinkSoft: '#fff0f5', bg: '#fffbf7', mint: '#aee3d8', mintBg: '#eaf8f5' };
const DARK_C  = { ink: '#F0E8FF', muted: '#B8A8C8', line: '#3A3060', pink: '#ff7fa8', pinkSoft: '#2D2848', bg: '#1E1B2E', mint: '#4A6058', mintBg: '#1E3530' };

export default function DictationMistakesPage() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const router = useRouter();
  const [mistakes, setMistakes] = useState<MistakeGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [practicing, setPracticing] = useState(false);

  async function loadMistakes() {
    try {
      const wrongRecords = await db.dictationRecords.filter(r => !r.correct);
      const grouped: Record<string, MistakeGroup> = {};
      for (const r of wrongRecords) {
        if (!grouped[r.wordId]) {
          grouped[r.wordId] = {
            korean: r.wordId,
            meaning: r.meaning || '',
            wrongCount: 0,
            lastWrongAt: 0,
            records: [],
          };
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
    await Promise.all(records.map((r: DictationRecord) => db.dictationRecords.delete(r.id)));
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
        difficulty="beginner"
        onExit={() => { setPracticing(false); loadMistakes(); }}
        exitLabel="返回错题本"
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 16px 0' }}>
        <button onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${C.line}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={16} style={{ color: C.muted }} />
        </button>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 900, color: C.ink, margin: 0 }}>听写错题本</h1>
          <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{mistakes.length} 个词需要加强</p>
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {loading ? (
          <div style={{ textAlign: 'center', paddingTop: 60, color: C.muted, fontSize: 14 }}>加载中...</div>
        ) : mistakes.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 60 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>暂无错题</p>
            <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>完成听写练习后，答错的词会出现在这里</p>
            <button
              onClick={() => router.push('/dictation')}
              style={{ marginTop: 20, padding: '12px 28px', borderRadius: 14, background: C.pink, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              去听写练习
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {mistakes.map(m => (
                <div key={m.korean} style={{ background: '#fff', borderRadius: 16, border: `1px solid ${C.line}`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{m.korean}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: C.pink, background: C.pinkSoft, borderRadius: 6, padding: '2px 7px' }}>×{m.wrongCount}</span>
                    </div>
                    {m.meaning && <p style={{ fontSize: 12, color: C.muted, margin: '2px 0 0' }}>{m.meaning}</p>}
                    <p style={{ fontSize: 11, color: '#c4a89e', margin: '2px 0 0' }}>最近出错 {formatDate(m.lastWrongAt)}</p>
                  </div>
                  <button
                    onClick={() => handleMastered(m.korean)}
                    style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${C.line}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                    title="已掌握，从错题本移除"
                  >
                    <Trash2 size={15} style={{ color: C.muted }} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPracticing(true)}
              style={{ width: '100%', marginTop: 20, padding: '14px 0', borderRadius: 14, background: C.ink, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <PenLine size={16} />
              再练一遍
            </button>
          </>
        )}
      </div>
    </div>
  );
}
