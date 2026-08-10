'use client'

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { ArrowLeft, CheckCircle, PenLine, RotateCcw } from 'lucide-react';
import { db } from '@/lib/db';
import type { TopikMistake } from '@/types';
import type { TopikQuestion } from '@/data/topik-questions';
import { loadTopikQuestionsByIds } from '@/lib/dataLoader';
import { saveProgress, TTL_EXAM } from '@/lib/progress-storage';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../topik-redesign.css';

interface MistakeRow {
  mistake: TopikMistake;
  question: TopikQuestion;
}

interface UndoState {
  id: string;
  row: MistakeRow;
  timer: ReturnType<typeof setTimeout>;
}

export default function TopikMistakesPage() {
  const { lang } = useLang();
  const router = useRouter();
  const smartBack = useSmartBack('/topik');
  const [rows, setRows] = useState<MistakeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [undoState, setUndoState] = useState<UndoState | null>(null);
  const undoRef = useRef<UndoState | null>(null);

  async function load() {
    try {
      const mistakes = await db.topikMistakes.filter((m: TopikMistake) => m.mastered === 0);
      const ids = Array.from(new Set(mistakes.map((m: TopikMistake) => m.questionId)));
      const topikQuestions = await loadTopikQuestionsByIds(ids);
      const qById = new Map(topikQuestions.map(q => [q.id, q]));
      const withQ = mistakes
        .map((m: TopikMistake) => ({ mistake: m, question: qById.get(m.questionId) }))
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

  // 组件卸载时立即提交挂起的已掌握操作
  useEffect(() => {
    return () => {
      const pending = undoRef.current;
      if (pending) {
        clearTimeout(pending.timer);
        db.topikMistakes.update(pending.id, { mastered: 1 }).catch(e => console.error('[topik] mistakes cleanup update failed:', e));
      }
    };
  }, []);

  function handleMastered(id: string) {
    const row = rows.find(r => r.mistake.id === id);
    if (!row) return;

    // 取消上一条还在等待的撤销（立即提交）
    if (undoRef.current) {
      clearTimeout(undoRef.current.timer);
      db.topikMistakes.update(undoRef.current.id, { mastered: 1 }).catch(e => console.error('[topik] mistakes undo update failed:', e));
    }

    // 乐观移除
    setRows(prev => prev.filter(r => r.mistake.id !== id));

    // 3 秒后真正写 DB
    const timer = setTimeout(() => {
      db.topikMistakes.update(id, { mastered: 1 }).catch(e => console.error('[topik] mistakes master update failed:', e));
      setUndoState(null);
      undoRef.current = null;
    }, 3000);

    const next = { id, row, timer };
    undoRef.current = next;
    setUndoState(next);
  }

  function handleUndo() {
    if (!undoState) return;
    clearTimeout(undoState.timer);
    // 把移除的行放回原位（按 wrongCount 排序）
    setRows(prev => {
      const restored = [...prev, undoState.row];
      restored.sort((a, b) => b.mistake.wrongCount - a.mistake.wrongCount);
      return restored;
    });
    setUndoState(null);
    undoRef.current = null;
  }

  function startPractice() {
    if (rows.length === 0) return;
    const sessionId = crypto.randomUUID();
    saveProgress(`topik-exam-${sessionId}`, {
      sectionId: 'mistakes-review',
      questionIds: rows.map(r => r.question.id),
      mode: 'mistakes',
      timeLeft: -1,
      idx: 0,
      answers: [],
      startedAt: Date.now(),
    }, TTL_EXAM);
    router.push(`/topik/exam/${sessionId}`);
  }

  function formatDate(ts: number) {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  return (
    <div className="tk-scope">
      <div className="hr-stage" style={{ maxWidth: 720, margin: '0 auto' }}>

        <div className="hr-mobile-back">
          <button className="hr-mobile-back-btn" onClick={smartBack} aria-label={t('topik.back', lang)}>
            <ArrowLeft size={14} /> {t('topik.back', lang)}
          </button>
        </div>

        <header className="hr-page-head">
          <div className="hr-brand">
            <div className="hr-brand-mark">Tori</div>
            <div className="hr-brand-kr">오답</div>
            <div className="hr-brand-sub">{t('topik.mt_brand_sub', lang)}</div>
          </div>
          <div className="hr-brand-sub" data-md-show>{t('topik.mt_need_strengthen', lang, { n: rows.length })}</div>
        </header>

        {loading ? (
          <div className="tk-fullpage-msg">
            <div className="hint">{t('topik.loading', lang)}</div>
          </div>
        ) : rows.length === 0 && !undoState ? (
          <div className="tk-empty" style={{ paddingTop: 60 }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🎉</div>
            <p className="tk-empty-title">{t('topik.mt_empty', lang)}</p>
            <p className="tk-empty-hint">{t('topik.mt_empty_hint', lang)}</p>
            <button className="tk-goto-btn" onClick={smartBack}>{t('topik.go_practice', lang)}</button>
          </div>
        ) : (
          <>
            <div className="tk-mistake-list">
              {rows.map(({ mistake, question }) => (
                <div key={mistake.id} className="tk-mistake-card">
                  <div className="tk-mistake-body">
                    <div className="tk-mistake-tags">
                      {question.topic && <span className="tk-mistake-tag">#{question.topic}</span>}
                      <span className="tk-mistake-tag">×{mistake.wrongCount}</span>
                      {question.testPoint && <span className="tk-mistake-testpoint">{t('topik.mt_testpoint', lang, { point: question.testPoint })}</span>}
                    </div>
                    <p className="tk-mistake-prompt">{question.prompt}</p>
                    <div className="tk-mistake-when">{t('topik.mt_last_wrong', lang, { date: formatDate(mistake.lastWrongAt) })}</div>
                  </div>
                  <button className="tk-mistake-mark" onClick={() => handleMastered(mistake.id)} aria-label={t('topik.mt_mastered', lang)} title={t('topik.mt_mastered', lang)}>
                    <CheckCircle size={16} />
                  </button>
                </div>
              ))}
            </div>

            {rows.length > 0 && (
              <button className="tk-practice-btn" onClick={startPractice}>
                <PenLine size={16} />{t('topik.mt_practice_again', lang, { n: rows.length })}
              </button>
            )}
          </>
        )}
      </div>

      {undoState && (
        <div className="tk-undo-bar">
          <div className="tk-undo-bar-body">
            <CheckCircle size={16} color="var(--hr-mint-base)" />
            <span className="msg">{t('topik.mt_marked_mastered', lang)}</span>
            <button className="tk-undo-btn" onClick={handleUndo}>
              <RotateCcw size={12} />{t('topik.mt_undo', lang)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

