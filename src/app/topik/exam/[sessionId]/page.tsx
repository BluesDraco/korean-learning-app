'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Volume2, Check, X, ChevronRight, BookOpen } from 'lucide-react';
import { speakBrowser, cancelSpeech } from '@/lib/tts';
import { db } from '@/lib/db';
import type { TopikSession, TopikMistake } from '@/types';
import type { TopikQuestion, TopikSection } from '@/data/topik-questions';
import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C as _LIGHT_C, DARK_C as _DARK_C } from '@/lib/theme';

const LIGHT_C = { ..._LIGHT_C, optionBg: '#f9f5f2', innerCard: '#fff' };
const DARK_C  = { ..._DARK_C, optionBg: '#252040', innerCard: '#1E1B2E' };

export default function TopikExamPage() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const { sessionId } = useParams<{ sessionId: string }>();
  const router = useRouter();

  const [questions, setQuestions] = useState<TopikQuestion[]>([]);
  const [sectionId, setSectionId] = useState('beginner-listening');
  const [mode, setMode] = useState<'exam' | 'practice' | 'mistakes'>('practice');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<string, number>>(new Map());
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(-1); // -1 = no timer
  const [playing, setPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const [loaded, setLoaded] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayedRef = useRef<number>(-1);
  const finishCalledRef = useRef(false);

  const [allSections, setAllSections] = useState<TopikSection[]>([]);
  const sectionInfo = allSections.find(s => s.id === sectionId) || allSections[0];
  const isListening = sectionInfo?.section === 'listening';

  // Load session from sessionStorage
  useEffect(() => {
    if (!sessionId) return;
    import('@/data/topik-questions').then(({ topikQuestions, topikSections }) => {
      setAllSections(topikSections);
      try {
        const saved = sessionStorage.getItem(`topik-exam-${sessionId}`);
        if (!saved) { router.replace('/topik'); return; }
        const data = JSON.parse(saved) as {
          sectionId?: string; questionIds?: string[]; mode?: string;
          timeLeft?: number; idx?: number; answers?: [string, number][]; startedAt?: number;
        };
        let qs: TopikQuestion[] = [];
        if (data.questionIds && data.questionIds.length > 0) {
          qs = data.questionIds.map(id => topikQuestions.find(q => q.id === id)).filter(Boolean) as TopikQuestion[];
        } else if (data.sectionId) {
          const sec = topikSections.find(s => s.id === data.sectionId);
          if (sec) qs = topikQuestions.filter(q => q.section === sec.section && q.level === sec.level);
        }
        if (qs.length === 0) { router.replace('/topik'); return; }
        setQuestions(qs);
        setSectionId(data.sectionId || 'beginner-listening');
        setMode((data.mode as TopikSession['mode']) || 'practice');
        setCurrentIdx(data.idx || 0);
        setAnswers(new Map(data.answers || []));
        setTimeLeft(data.timeLeft ?? -1);
        autoPlayedRef.current = (data.idx || 0) - 1;
      } catch {
        router.replace('/topik');
        return;
      }
      setLoaded(true);
    });
  }, [sessionId, router]);

  // Timer
  useEffect(() => {
    if (!loaded || timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current!); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [loaded]);

  // Persist progress
  useEffect(() => {
    if (!loaded || !sessionId) return;
    try {
      const saved = sessionStorage.getItem(`topik-exam-${sessionId}`);
      if (!saved) return;
      const data = JSON.parse(saved);
      sessionStorage.setItem(`topik-exam-${sessionId}`, JSON.stringify({ ...data, idx: currentIdx, answers: Array.from(answers.entries()), timeLeft }));
    } catch { /* ignore */ }
  }, [currentIdx, answers, timeLeft, loaded, sessionId]);

  const finishExam = useCallback(async () => {
    if (finishCalledRef.current) return;
    finishCalledRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    cancelSpeech();

    const now = Date.now();
    const correctCount = Array.from(answers.entries()).reduce((acc, [qid, sel]) => {
      const q = questions.find(x => x.id === qid);
      return q && sel === q.correctIdx ? acc + 1 : acc;
    }, 0);
    const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const durationSec = Math.round((now - startedAt) / 1000);

    const session: TopikSession = {
      id: sessionId,
      userId: '',
      mode,
      section: sectionId,
      score,
      correctCount,
      totalCount: questions.length,
      durationSec,
      completedAt: now,
      createdAt: now,
    };

    // Write wrong answers to mistakes
    const wrongEntries = Array.from(answers.entries()).filter(([qid, sel]) => {
      const q = questions.find(x => x.id === qid);
      return q && sel !== q.correctIdx;
    });

    try {
      await db.topikSessions.add(session);

      // Upsert mistakes
      const existingMistakes = await db.topikMistakes.filter((m: TopikMistake) => wrongEntries.some(([qid]) => m.questionId === qid && m.mastered === 0)).catch(() => [] as TopikMistake[]);
      const existingMap = new Map(existingMistakes.map((m: TopikMistake) => [m.questionId, m]));

      await Promise.all(wrongEntries.map(async ([qid]) => {
        const existing = existingMap.get(qid);
        if (existing) {
          await db.topikMistakes.update(existing.id, { wrongCount: existing.wrongCount + 1, lastWrongAt: now, sessionId });
        } else {
          await db.topikMistakes.add({
            id: `tm-${now}-${qid}`,
            userId: '',
            questionId: qid,
            sessionId,
            wrongCount: 1,
            lastWrongAt: now,
            mastered: 0,
            createdAt: now,
          });
        }
      }));
    } catch { /* ignore, still navigate */ }

    // Store result in sessionStorage for result page
    try {
      sessionStorage.setItem(`topik-result-${sessionId}`, JSON.stringify({
        sectionId, mode, score, correctCount, totalCount: questions.length, durationSec,
        wrongQuestionIds: wrongEntries.map(([qid]) => qid),
      }));
    } catch { /* ignore */ }

    router.replace(`/topik/result/${sessionId}`);
  }, [answers, questions, sessionId, mode, sectionId, startedAt, router]);

  // Auto-submit on time up
  useEffect(() => {
    if (loaded && timeLeft === 0 && questions.length > 0) finishExam();
  }, [timeLeft, finishExam, questions.length, loaded]);

  const handlePlayAudio = useCallback(async () => {
    const q = questions[currentIdx];
    if (!q?.audioText || playing) return;
    setPlaying(true);
    try { await speakBrowser(q.audioText, 0.85); } catch { /* ignore */ }
    setPlaying(false);
  }, [questions, currentIdx, playing]);

  // Auto-play listening
  useEffect(() => {
    if (!loaded || !isListening || !questions.length) return;
    const q = questions[currentIdx];
    if (!q?.audioText || showAnswer || autoPlayedRef.current === currentIdx) return;
    autoPlayedRef.current = currentIdx;
    const t = setTimeout(() => handlePlayAudio(), 400);
    return () => clearTimeout(t);
  }, [currentIdx, loaded, isListening, questions, showAnswer, handlePlayAudio]);

  const selectAnswer = (optionIdx: number) => {
    if (showAnswer) return;
    const q = questions[currentIdx];
    const newAnswers = new Map(answers);
    newAnswers.set(q.id, optionIdx);
    setAnswers(newAnswers);
    setShowAnswer(true);
  };

  const goNext = () => {
    if (currentIdx + 1 >= questions.length) {
      finishExam();
    } else {
      setCurrentIdx(prev => prev + 1);
      setShowAnswer(false);
      setShowTranslation(false);
      setPlaying(false);
      cancelSpeech();
    }
  };

  const formatTime = (s: number) => {
    if (s < 0) return '—';
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  };

  if (!loaded || questions.length === 0) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: C.bg, color: C.muted, fontSize: 14 }}>加载中...</div>;
  }

  const currentQ = questions[currentIdx];

  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 0', background: C.card, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => { if (confirm('确定退出？')) { cancelSpeech(); router.replace('/topik'); } }} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${C.line}`, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={16} color={C.muted} />
          </button>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{sectionInfo.title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, fontFamily: 'monospace', color: timeLeft > 0 && timeLeft <= 60 ? C.pink : C.ink }}>
          <Clock size={14} />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, height: 6, background: C.line, borderRadius: 3 }}>
          <div style={{ height: 6, background: C.pink, borderRadius: 3, width: `${((currentIdx + 1) / questions.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontSize: 12, color: C.muted, flexShrink: 0 }}>{currentIdx + 1}/{questions.length}</span>
      </div>

      {/* Question card */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: C.card, borderRadius: 20, border: `1px solid ${C.line}`, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Audio */}
          {isListening && currentQ.audioText && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={handlePlayAudio} disabled={playing} style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${C.line}`, background: playing ? C.optionBg : C.card, cursor: playing ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 6, opacity: playing ? 0.7 : 1 }}>
                <Volume2 size={18} color={playing ? C.pink : C.muted} />
                <span style={{ fontSize: 12, color: playing ? C.pink : C.muted, fontWeight: 600 }}>
                  {playing ? '播放中...' : '重听'}
                </span>
              </button>
              {playing && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.pink, display: 'inline-block', animation: 'pulse 1s infinite' }} />
                </span>
              )}
            </div>
          )}

          {/* Topic + number */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {currentQ.topic && <span style={{ fontSize: 12, fontWeight: 700, color: C.pink, background: C.pinkSoft, borderRadius: 6, padding: '2px 8px' }}>#{currentQ.topic}</span>}
            {currentQ.testPoint && <span style={{ fontSize: 11, color: C.muted }}>考点: {currentQ.testPoint}</span>}
            <span style={{ fontSize: 11, color: C.muted, marginLeft: 'auto' }}>第{currentQ.number}题</span>
          </div>

          {/* Prompt */}
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{currentQ.prompt}</p>
            {isListening ? (
              <div style={{ marginTop: 6 }}>
                {!showTranslation ? (
                  <button onClick={() => setShowTranslation(true)} style={{ fontSize: 12, color: C.muted, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>显示翻译</button>
                ) : (
                  <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0' }}>{currentQ.promptZh}</p>
                )}
              </div>
            ) : (
              <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0' }}>{currentQ.promptZh}</p>
            )}
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {currentQ.options.map((opt: string, i: number) => {
              let bg = C.optionBg, border = C.line, opacity = 1;
              if (showAnswer) {
                if (i === currentQ.correctIdx) { bg = C.mintBg; border = C.mint; }
                else if (i === answers.get(currentQ.id) && i !== currentQ.correctIdx) { bg = C.pinkSoft; border = C.pink; }
                else { opacity = 0.45; }
              }
              return (
                <button key={i} onClick={() => selectAnswer(i)} disabled={showAnswer} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: showAnswer ? 'default' : 'pointer', opacity, width: '100%', textAlign: 'left' }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: C.card, border: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: C.muted, flexShrink: 0 }}>{String.fromCharCode(65 + i)}</span>
                  <span style={{ fontSize: 14, color: C.ink, flex: 1 }}>{opt}</span>
                  {showAnswer && i === currentQ.correctIdx && <Check size={16} color={C.mint} />}
                  {showAnswer && i === answers.get(currentQ.id) && i !== currentQ.correctIdx && <X size={16} color={C.pink} />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showAnswer && (
            <div style={{ background: C.optionBg, borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {isListening && currentQ.audioText && (
                <div style={{ background: C.innerCard, borderRadius: 10, padding: 12, border: `1px solid ${C.line}` }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, margin: '0 0 4px' }}>听力原文</p>
                  <p style={{ fontSize: 13, color: C.ink, margin: 0, lineHeight: 1.6 }}>{currentQ.audioText}</p>
                </div>
              )}
              <p style={{ fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.6 }}>{currentQ.explanation}</p>
              {currentQ.vocabulary.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: C.muted }}>核心词汇:</span>
                  {currentQ.vocabulary.map((v: string, vi: number) => (
                    <span key={vi} style={{ fontSize: 12, background: C.card, border: `1px solid ${C.line}`, borderRadius: 8, padding: '2px 8px', color: C.ink }}>{v}</span>
                  ))}
                </div>
              )}
              {currentQ.reviewGrammarId && (
                <a href={`/grammar?pattern=${currentQ.reviewGrammarId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#8b5cf6', background: 'rgba(139,92,246,0.08)', borderRadius: 8, padding: '6px 12px', textDecoration: 'none', border: '1px solid rgba(139,92,246,0.2)', width: 'fit-content' }}>
                  <BookOpen size={12} />去练习这个句型 →
                </a>
              )}
            </div>
          )}

          {/* Next button */}
          {showAnswer && (
            <button onClick={goNext} style={{ width: '100%', padding: '14px 0', borderRadius: 14, background: C.ink, color: C.bg, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {currentIdx + 1 >= questions.length ? '查看结果' : '下一题'}
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
