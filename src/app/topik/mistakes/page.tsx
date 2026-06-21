'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, PenLine } from 'lucide-react';
import { db } from '@/lib/db';
import type { TopikMistake } from '@/types';
import type { TopikQuestion } from '@/data/topik-questions';
import { useTheme } from '@/components/ThemeProvider';

const LIGHT_C = { ink: '#241917', muted: '#89756e', line: '#eee0d8', pink: '#ff7fa8', pinkSoft: '#fff0f5', bg: '#fffbf7', mint: '#aee3d8', mintBg: '#eaf8f5', card: '#fff', dateMuted: '#c4a89e' };
const DARK_C  = { ink: '#F0E8FF', muted: '#B8A8C8', line: '#3A3060', pink: '#ff7fa8', pinkSoft: '#2D2848', bg: '#1E1B2E', mint: '#4A6058', mintBg: '#1E3530', card: '#282440', dateMuted: '#9A8AB0' };

interface MistakeRow {
  mistake: TopikMistake;
  question: TopikQuestion;
}

export default function TopikMistakesPage() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const router = useRouter();
  const [rows, setRows] = useState<MistakeRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const [{ topikQuestions }, mistakes] = await Promise.all([
        import('@/data/topik-questions'),
        db.topikMistakes.filter((m: TopikMistake) => m.mastered === 0),
      ]);
      const withQ = mistakes
        .map((m: TopikMistake) => ({ mistake: m, question: topikQuestions.find(q => q.id === m.questionId) }))
        .filter((r: { question: TopikQuestion | undefined }) => r.question) as MistakeRow[];
      withQ.sort((a, b) => b.mistake.wrongCount - a.mistake.wrongCount);
      setRows(withQ);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleMastered(id: string) {
    try {
      await db.topikMistakes.update(id, { mastered: 1 });
      setRows(prev => prev.filter(r => r.mistake.id !== id));
    } catch { /* ignore */ }
  }

  function startPractice() {
    if (rows.length === 0) return;
    const sessionId = crypto.randomUUID();
    try {
      sessionStorage.setItem(`topik-exam-${sessionId}`, JSON.stringify({
        questionIds: rows.map(r => r.question.id),
        mode: 'mistakes',
        timeLeft: -1,
        idx: 0,
        answers: [],
        startedAt: Date.now(),
      }));
    } catch { /* ignore */ }
    router.push(`/topik/exam/${sessionId}`);
  }

  function formatDate(ts: number) {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 16px 0' }}>
        <button onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${C.line}`, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={16} color={C.muted} />
        </button>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 900, color: C.ink, margin: 0 }}>TOPIK 错题本</h1>
          <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{rows.length} 题需要加强</p>
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {loading ? (
          <div style={{ textAlign: 'center', paddingTop: 60, color: C.muted, fontSize: 14 }}>加载中...</div>
        ) : rows.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 60 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>暂无错题</p>
            <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>完成练习后，答错的题会出现在这里</p>
            <button onClick={() => router.push('/topik')} style={{ marginTop: 20, padding: '12px 28px', borderRadius: 14, background: C.pink, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              去练习
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {rows.map(({ mistake, question }) => (
                <div key={mistake.id} style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.line}`, padding: '14px 16px', display: 'flex', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      {question.topic && <span style={{ fontSize: 11, fontWeight: 700, color: C.pink, background: C.pinkSoft, borderRadius: 6, padding: '2px 7px' }}>#{question.topic}</span>}
                      <span style={{ fontSize: 11, fontWeight: 700, color: C.pink, background: C.pinkSoft, borderRadius: 6, padding: '2px 7px' }}>×{mistake.wrongCount}</span>
                      {question.testPoint && <span style={{ fontSize: 11, color: C.muted }}>考点: {question.testPoint}</span>}
                    </div>
                    <p style={{ fontSize: 13, color: C.ink, margin: '0 0 4px', lineHeight: 1.5 }}>{question.prompt}</p>
                    <p style={{ fontSize: 11, color: C.dateMuted, margin: 0 }}>最近出错 {formatDate(mistake.lastWrongAt)}</p>
                  </div>
                  <button onClick={() => handleMastered(mistake.id)} style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${C.line}`, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, alignSelf: 'center' }} title="已掌握，移除">
                    <Trash2 size={15} color={C.muted} />
                  </button>
                </div>
              ))}
            </div>

            <button onClick={startPractice} style={{ width: '100%', marginTop: 20, padding: '14px 0', borderRadius: 14, background: C.ink, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <PenLine size={16} />再练一遍 ({rows.length}题)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
