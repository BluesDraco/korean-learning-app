'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Trophy, RotateCcw, BookOpen, ChevronRight } from 'lucide-react';
import type { TopikQuestion, TopikSection } from '@/data/topik-questions';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C as _LIGHT_C, DARK_C as _DARK_C } from '@/lib/theme';

const LIGHT_C = { ..._LIGHT_C, mistakeBg: '#f9f5f2', statBg: '#f0ece8', actionBg: '#f0ece8' };
const DARK_C  = { ..._DARK_C, mistakeBg: '#252040', statBg: '#2A2040', actionBg: '#2A2040' };

interface ResultData {
  sectionId: string;
  mode: string;
  score: number;
  correctCount: number;
  totalCount: number;
  durationSec: number;
  wrongQuestionIds: string[];
}

export default function TopikResultPage() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const { sessionId } = useParams<{ sessionId: string }>();
  const router = useRouter();
  const [result, setResult] = useState<ResultData | null>(null);
  const [wrongQuestions, setWrongQuestions] = useState<TopikQuestion[]>([]);
  const [topikSections, setTopikSections] = useState<TopikSection[]>([]);

  useEffect(() => {
    if (!sessionId) return;
    import('@/data/topik-questions').then(({ topikQuestions, topikSections: secs }) => {
      setTopikSections(secs);
      try {
        const saved = sessionStorage.getItem(`topik-result-${sessionId}`);
        if (!saved) { router.replace('/topik'); return; }
        const data = JSON.parse(saved) as ResultData;
        setResult(data);
        const wqs = data.wrongQuestionIds.map(id => topikQuestions.find(q => q.id === id)).filter(Boolean) as TopikQuestion[];
        setWrongQuestions(wqs);
      } catch {
        router.replace('/topik');
      }
    });
  }, [sessionId, router]);

  if (!result) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: C.bg, color: C.muted, fontSize: 14 }}>加载中...</div>;
  }

  const passed = result.score >= 60;
  const sectionInfo = topikSections.find(s => s.id === result.sectionId);
  const mins = Math.floor(result.durationSec / 60);
  const secs = result.durationSec % 60;

  function practiceMistakes() {
    if (result!.wrongQuestionIds.length === 0) return;
    const newSessionId = crypto.randomUUID();
    try {
      sessionStorage.setItem(`topik-exam-${newSessionId}`, JSON.stringify({
        questionIds: result!.wrongQuestionIds,
        mode: 'mistakes',
        timeLeft: -1,
        idx: 0,
        answers: [],
        startedAt: Date.now(),
      }));
    } catch { /* ignore */ }
    router.push(`/topik/exam/${newSessionId}`);
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 16px 0' }}>
        <button onClick={() => router.replace('/topik')} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${C.line}`, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={16} color={C.muted} />
        </button>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 900, color: C.ink, margin: 0 }}>练习结果</h1>
          <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{sectionInfo?.title || result.sectionId}</p>
        </div>
      </div>

      <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Score card */}
        <div style={{ background: C.card, borderRadius: 20, border: `1px solid ${C.line}`, padding: '28px 20px', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: passed ? C.mintBg : C.pinkSoft, border: `3px solid ${passed ? C.mint : C.pink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            {passed ? <Trophy size={36} color={C.mint} /> : <RotateCcw size={36} color={C.pink} />}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: C.ink, margin: '0 0 4px' }}>
            {passed ? '축하합니다! 🎉' : '继续加油！'}
          </h2>
          <p style={{ fontSize: 13, color: C.muted, margin: '0 0 20px' }}>
            {sectionInfo?.title} · {mins}分{secs.toString().padStart(2, '0')}秒
          </p>

          {/* Score number */}
          <div style={{ fontSize: 56, fontWeight: 900, color: passed ? C.mint : C.pink, lineHeight: 1, margin: '0 0 4px' }}>{result.score}</div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>/ 100 分</div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div style={{ background: C.statBg, borderRadius: 12, padding: '10px 6px' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.mint }}>{result.correctCount}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>正确</div>
            </div>
            <div style={{ background: C.pinkSoft, borderRadius: 12, padding: '10px 6px' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.pink }}>{result.totalCount - result.correctCount}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>错误</div>
            </div>
            <div style={{ background: C.statBg, borderRadius: 12, padding: '10px 6px' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.ink }}>{result.totalCount}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>总题数</div>
            </div>
          </div>
        </div>

        {/* Wrong questions */}
        {wrongQuestions.length > 0 && (
          <div style={{ background: C.card, borderRadius: 20, border: `1px solid ${C.line}`, padding: '16px' }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: C.ink, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <BookOpen size={15} color={C.muted} />错题分析
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 320, overflowY: 'auto' }}>
              {wrongQuestions.map(q => (
                <div key={q.id} style={{ background: C.mistakeBg, borderRadius: 12, padding: 12 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
                    {q.topic && <span style={{ fontSize: 11, fontWeight: 700, color: C.pink, background: C.pinkSoft, borderRadius: 6, padding: '2px 7px' }}>#{q.topic}</span>}
                    {q.testPoint && <span style={{ fontSize: 11, color: C.muted }}>考点: {q.testPoint}</span>}
                    {q.difficulty && <span style={{ fontSize: 11, color: C.muted }}>{q.difficulty === 'easy' ? '简单' : q.difficulty === 'medium' ? '中等' : '困难'}</span>}
                  </div>
                  <p style={{ fontSize: 13, color: C.ink, margin: '0 0 6px', lineHeight: 1.5 }}>{q.prompt}</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.5 }}>{q.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {wrongQuestions.length > 0 && (
            <button onClick={practiceMistakes} style={{ width: '100%', padding: '14px 0', borderRadius: 14, background: C.pink, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <RotateCcw size={16} />重练错题 ({wrongQuestions.length}题)
            </button>
          )}
          <Link href="/topik/practice" style={{ width: '100%', padding: '14px 0', borderRadius: 14, background: C.actionBg, color: C.ink, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}>
            专项练习 <ChevronRight size={16} />
          </Link>
          <button onClick={() => router.replace('/topik')} style={{ width: '100%', padding: '14px 0', borderRadius: 14, background: C.ink, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
}
