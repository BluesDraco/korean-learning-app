'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Volume2, Check, X, ChevronRight, BookOpen, Flag, ListChecks } from 'lucide-react';
import { cancelSpeech, speakDialog, unlockAudioContext, playAudioUrl } from '@/lib/tts';
import { db } from '@/lib/db';
import type { TopikSession, TopikMistake, TopikTypeMastery } from '@/types';
import type { TopikQuestion, TopikSection } from '@/data/topik-questions';
import { loadTopikQuestionsByIds, loadTopikSections } from '@/lib/dataLoader';
import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C as _LIGHT_C, DARK_C as _DARK_C } from '@/lib/theme';
import { getListeningPlayCount, type ExamMode } from '@/lib/topik/examRules';
import { saveProgress, loadProgress, clearProgress, TTL_EXAM, TTL_RESULT } from '@/lib/progress-storage';
import { useAuth } from '@/components/AuthProvider';
import { Modal, Button } from '@/components/ui';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { playSuccess, playError, playComplete } from '@/lib/soundManager';
import '../../topik-redesign.css';
import './exam-rail.css';

const LIGHT_C = { ..._LIGHT_C, optionBg: '#f9f5f2', innerCard: '#fff', overlayBg: 'rgba(0,0,0,0.45)' };
const DARK_C  = { ..._DARK_C, optionBg: '#252040', innerCard: '#1E1B2E', overlayBg: 'rgba(0,0,0,0.6)' };

type LegacyMode = 'exam' | 'practice' | 'mistakes' | 'simulate';
type Stage = 'listening' | 'reading';

// 新版（来自考前说明页）
interface RealExamState {
  kind: 'real';
  examSetId: string;
  examRound: number;
  level: 'I' | 'II';
  mode: ExamMode;
  listenIds: string[];
  readIds: string[];
  listenTimeLeft: number;
  readTimeLeft: number;
  stage: Stage;
  idx: number;
  answers: [string, number][];
  marks: string[];
  playCounts?: [string, number][];  // 每道听力题已播放次数
  officialTotalQuestions?: number;  // exam-sets 申报的真实题总数（含数据缺失题）
  startedAt: number;
}

// 旧版（专项/模拟/错题重练）
interface LegacyState {
  kind: 'legacy';
  sectionId: string;
  mode: LegacyMode;
  questionIds: string[];
  timeLeft: number;
  idx: number;
  answers: [string, number][];
  marks?: string[];
  startedAt: number;
}

function detectKind(raw: unknown): 'real' | 'legacy' {
  if (raw && typeof raw === 'object' && 'listenIds' in raw && 'stage' in raw) return 'real';
  return 'legacy';
}

export default function TopikExamPage() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  // 交卷二次确认弹窗。用自绘 Modal 替代原生 confirm() —— iOS PWA(standalone)下 confirm 可能
  // 静默返回 false，导致有未答题时永远交不了卷。message 为提示文案，onConfirm 为确认后动作。
  const [submitConfirm, setSubmitConfirm] = useState<{ message: string; onConfirm: () => void } | null>(null);

  // 通用状态
  const [questions, setQuestions] = useState<TopikQuestion[]>([]);
  const [allSections, setAllSections] = useState<TopikSection[]>([]);
  const [loaded, setLoaded] = useState(false);
  // 会话读不到（换设备/换浏览器/超 6 小时过期/题目全失效）：不静默弹回首页，
  // 而是渲染友好空状态页，解释这个链接为何打不开。见 finishExam 上方加载逻辑。
  const [sessionGone, setSessionGone] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<string, number>>(new Map());
  const [marks, setMarks] = useState<Set<string>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [playCounts, setPlayCounts] = useState<Map<string, number>>(new Map());

  // 模式区分
  const [kind, setKind] = useState<'real' | 'legacy'>('legacy');
  const [mode, setMode] = useState<ExamMode | LegacyMode>('practice');
  const [examRound, setExamRound] = useState<number>(36);
  const [level, setLevel] = useState<'I' | 'II'>('I');
  const [examSetId, setExamSetId] = useState<string>('');
  const [officialTotalQuestions, setOfficialTotalQuestions] = useState<number>(0);

  // 真题模式
  const [listenIds, setListenIds] = useState<string[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [listenTimeLeft, setListenTimeLeft] = useState(0);
  const [readTimeLeft, setReadTimeLeft] = useState(0);
  const [stage, setStage] = useState<Stage>('listening');
  const [stageTransition, setStageTransition] = useState(false);

  // 旧版模式
  const [legacySectionId, setLegacySectionId] = useState('beginner-listening');
  const [legacyTimeLeft, setLegacyTimeLeft] = useState(-1);

  // startedAt 必须从 session 持久化中读，否则刷新后时长归零
  const [startedAt, setStartedAt] = useState<number>(0);

  const [aiExplain, setAiExplain] = useState<Map<string, string>>(new Map());
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const [panelOpen, setPanelOpen] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayedRef = useRef<Set<string>>(new Set());
  const finishCalledRef = useRef(false);
  const stageSwitchedRef = useRef(false);  // 防止"提前交卷"和"听力时间到"竞争触发双重切阶段
  const legacyTimeLeftInitRef = useRef<number>(0);
  const playingLockRef = useRef(false);  // 防止双击播放扣 2 次次数
  const currentIdxRef = useRef(currentIdx);  // goNext 防闭包过期（快速连点"下一题"）

  // 当前题
  const currentQ = useMemo(() => {
    if (kind === 'real') {
      const ids = stage === 'listening' ? listenIds : readIds;
      const id = ids[currentIdx];
      return questions.find(q => q.id === id) || null;
    }
    return questions[currentIdx] || null;
  }, [kind, stage, listenIds, readIds, currentIdx, questions]);

  const isListening = currentQ?.section === 'listening';
  const stageQuestions = useMemo(() => {
    if (kind === 'real') {
      const ids = stage === 'listening' ? listenIds : readIds;
      return ids.map(id => questions.find(q => q.id === id)).filter(Boolean) as TopikQuestion[];
    }
    return questions;
  }, [kind, stage, listenIds, readIds, questions]);

  const totalCount = stageQuestions.length;
  const currentTimeLeft = kind === 'real'
    ? (stage === 'listening' ? listenTimeLeft : readTimeLeft)
    : legacyTimeLeft;

  // 仿真模式：答题过程中不显示对错
  const isRealMode = kind === 'real' && mode === 'real';

  // 加载 session
  useEffect(() => {
    if (!sessionId) return;
    let alive = true;
    (async () => {
      let data: RealExamState | LegacyState | null;
      try {
        data = loadProgress<RealExamState | LegacyState>(`topik-exam-${sessionId}`);
      } catch {
        if (alive) { setSessionGone(true); setLoaded(true); }
        return;
      }
      if (!data) {
        if (alive) { setSessionGone(true); setLoaded(true); }
        return;
      }
      const k = detectKind(data);
      const ids = k === 'real'
        ? [...(data as RealExamState).listenIds, ...(data as RealExamState).readIds]
        : (data as LegacyState).questionIds;
      const [qs, secs] = await Promise.all([
        loadTopikQuestionsByIds(ids),
        loadTopikSections(),
      ]);
      if (!alive) return;
      setAllSections(secs);
      const byId = new Map(qs.map(q => [q.id, q]));
      setKind(k);

      if (k === 'real') {
        const d = data as RealExamState;
        const listenQs = d.listenIds.map(id => byId.get(id)).filter(Boolean) as TopikQuestion[];
        const readQs   = d.readIds.map(id => byId.get(id)).filter(Boolean) as TopikQuestion[];
        if (listenQs.length + readQs.length === 0) { setSessionGone(true); setLoaded(true); return; }
        setQuestions([...listenQs, ...readQs]);
        setListenIds(d.listenIds);
        setReadIds(d.readIds);
        setListenTimeLeft(d.listenTimeLeft);
        setReadTimeLeft(d.readTimeLeft);
        setStage(d.stage);
        setMode(d.mode);
        setExamRound(d.examRound);
        setLevel(d.level);
        setExamSetId(d.examSetId);
        setOfficialTotalQuestions(d.officialTotalQuestions || (d.listenIds.length + d.readIds.length));
        setStartedAt(d.startedAt || Date.now());
        setCurrentIdx(d.idx || 0);
        setAnswers(new Map(d.answers || []));
        setMarks(new Set(d.marks || []));
        setPlayCounts(new Map(d.playCounts || []));
      } else {
        const d = data as LegacyState;
        const orderedQs = d.questionIds.map(id => byId.get(id)).filter(Boolean) as TopikQuestion[];
        if (orderedQs.length === 0) { setSessionGone(true); setLoaded(true); return; }
        setQuestions(orderedQs);
        setLegacySectionId(d.sectionId || 'beginner-listening');
        const initTl = d.timeLeft ?? -1;
        legacyTimeLeftInitRef.current = initTl;
        setLegacyTimeLeft(initTl);
        setMode(d.mode || 'practice');
        setStartedAt(d.startedAt || Date.now());
        setCurrentIdx(d.idx || 0);
        setAnswers(new Map(d.answers || []));
        setMarks(new Set(d.marks || []));
      }
      setLoaded(true);
    })().catch((e) => { console.error('[topik] exam session load failed:', e); if (alive) { setSessionGone(true); setLoaded(true); } });
    return () => { alive = false; };
  }, [sessionId]);

  // 卸载时停掉残留的 TTS 播放（浏览器后退/手势关闭/SPA 导航离开）
  useEffect(() => () => { cancelSpeech(); }, []);

  // Timer — 只在 loaded/kind/stage/stageTransition 变化时重建。倒计时通过 functional update 避免闭包陈旧。
  // 阶段过渡浮层显示期间暂停计时，避免阅读段时间被白白消耗。
  useEffect(() => {
    if (!loaded) return;
    if (stageTransition) return;  // 浮层期间不计时
    // legacy 无限模式（timeLeft = -1）不启动计时器
    if (kind === 'legacy' && legacyTimeLeftInitRef.current < 0) return;

    timerRef.current = setInterval(() => {
      if (kind === 'real') {
        if (stage === 'listening') {
          setListenTimeLeft(prev => prev <= 0 ? 0 : prev - 1);
        } else {
          setReadTimeLeft(prev => prev <= 0 ? 0 : prev - 1);
        }
      } else {
        setLegacyTimeLeft(prev => prev <= 0 ? prev : prev - 1);
      }
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [loaded, kind, stage, stageTransition]);

  // 持久化进度。守 startedAt 一致，防止 sessionId 切换时用旧 state 污染新会话。
  useEffect(() => {
    if (!loaded || !sessionId || !startedAt) return;
    const data = loadProgress<RealExamState | LegacyState>(`topik-exam-${sessionId}`);
    if (!data || data.startedAt !== startedAt) return;
    const next = kind === 'real'
      ? { ...data, idx: currentIdx, answers: Array.from(answers.entries()), marks: Array.from(marks), stage, listenTimeLeft, readTimeLeft, playCounts: Array.from(playCounts.entries()) }
      : { ...data, idx: currentIdx, answers: Array.from(answers.entries()), marks: Array.from(marks), timeLeft: legacyTimeLeft };
    saveProgress(`topik-exam-${sessionId}`, next, TTL_EXAM);
  }, [currentIdx, answers, marks, listenTimeLeft, readTimeLeft, legacyTimeLeft, stage, playCounts, loaded, sessionId, kind, startedAt]);

  const finishExam = useCallback(async () => {
    if (finishCalledRef.current) return;
    finishCalledRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    cancelSpeech();
    playComplete();

    const now = Date.now();
    const allTargets = questions;
    const correctCount = Array.from(answers.entries()).reduce((acc, [qid, sel]) => {
      const q = allTargets.find(x => x.id === qid);
      return q && sel === q.correctIdx ? acc + 1 : acc;
    }, 0);
    // 真题模式按 TOPIK 官方计分（每题 2 分，跳过题不算分）；旧版用百分制
    const score = kind === 'real'
      ? correctCount * 2
      : (allTargets.length > 0 ? Math.round((correctCount / allTargets.length) * 100) : 0);
    const durationSec = Math.round((now - startedAt) / 1000);

    const session: TopikSession = {
      id: sessionId,
      userId: user?.id ?? '',
      mode: kind === 'real' ? 'exam' : (mode as LegacyMode),
      examSetId: kind === 'real' ? examSetId : undefined,
      section: kind === 'real' ? examSetId : legacySectionId,
      score,
      correctCount,
      totalCount: allTargets.length,
      durationSec,
      completedAt: now,
      createdAt: now,
    };

    const wrongEntries = Array.from(answers.entries()).filter(([qid, sel]) => {
      const q = allTargets.find(x => x.id === qid);
      return q && sel !== q.correctIdx;
    });

    // 按 questionType 聚合本 session 的题（含答对+答错），用于更新题型掌握率
    const typeBuckets = new Map<string, { attempts: number; correct: number }>();
    for (const [qid, sel] of answers.entries()) {
      const q = allTargets.find(x => x.id === qid);
      if (!q) continue;
      const key = q.questionType || 'unknown';
      const cur = typeBuckets.get(key) || { attempts: 0, correct: 0 };
      cur.attempts++;
      if (sel === q.correctIdx) cur.correct++;
      typeBuckets.set(key, cur);
    }

    // 用于结果页展示"上次掌握率 → 本次掌握率"的旧值快照
    // 先在 try 外读取，即使后续 DB 写失败，结果页也能显示真实的历史对比
    const masterySnapshot: Record<string, { attempts: number; correct: number }> = {};
    let existingMasteryMap = new Map<string, TopikTypeMastery>();
    if (user?.id && typeBuckets.size > 0) {
      try {
        const keys = Array.from(typeBuckets.keys());
        const existingMastery = await db.topikTypeMastery
          .filter((m: TopikTypeMastery) => m.userId === user.id && keys.includes(m.questionType));
        existingMasteryMap = new Map(existingMastery.map((m: TopikTypeMastery) => [m.questionType, m]));
        for (const qtype of keys) {
          const existing = existingMasteryMap.get(qtype);
          masterySnapshot[qtype] = existing
            ? { attempts: existing.attempts, correct: existing.correct }
            : { attempts: 0, correct: 0 };
        }
      } catch {
        // 读旧值失败：结果页会把所有题型当作"新掌握"，但至少不会崩
      }
    }

    let dbWriteFailed = false;
    try {
      await db.topikSessions.add(session);
      const existingMistakes = await db.topikMistakes.filter((m: TopikMistake) => wrongEntries.some(([qid]) => m.questionId === qid && m.mastered === 0)).catch((e) => { console.error('[topik] failed to load existing mistakes:', e); return [] as TopikMistake[]; });
      const existingMap = new Map(existingMistakes.map((m: TopikMistake) => [m.questionId, m]));
      await Promise.all(wrongEntries.map(async ([qid]) => {
        const existing = existingMap.get(qid);
        if (existing) {
          await db.topikMistakes.update(existing.id, { wrongCount: existing.wrongCount + 1, lastWrongAt: now, sessionId });
        } else {
          await db.topikMistakes.add({ id: `tm-${now}-${qid}`, userId: user?.id ?? '', questionId: qid, sessionId, wrongCount: 1, lastWrongAt: now, mastered: 0, createdAt: now });
        }
      }));

      // 题型掌握统计 upsert（每种 questionType 单行）
      if (user?.id && typeBuckets.size > 0) {
        await Promise.all(Array.from(typeBuckets.entries()).map(async ([qtype, delta]) => {
          const existing = existingMasteryMap.get(qtype);
          if (existing) {
            await db.topikTypeMastery.update(existing.id, {
              attempts: existing.attempts + delta.attempts,
              correct: existing.correct + delta.correct,
              lastPracticedAt: now,
            });
          } else {
            // 用 put 而非 add：id 是 ttm-${userId}-${questionType} 确定性主键，
            // 跨设备并发时后写覆盖前写，避免 add 撞主键抛错让整个 upsert 循环失败
            await db.topikTypeMastery.put({
              id: `ttm-${user.id}-${qtype}`,
              userId: user.id,
              questionType: qtype,
              attempts: delta.attempts,
              correct: delta.correct,
              lastPracticedAt: now,
              createdAt: now,
            });
          }
        }));
      }

    } catch (e) {
      // DB 写失败：不静默假成功。标记后传给结果页提示"本次成绩未存入记录"，
      // 成绩已算出且 localStorage 有快照故结果页仍可看，但用户需知道 history/错题本没这场。
      dbWriteFailed = true;
      console.error('[topik] finishExam DB write failed:', e);
    }

    saveProgress(`topik-result-${sessionId}`, {
      dbWriteFailed,
      sectionId: kind === 'real' ? examSetId : legacySectionId,
      examSetId: kind === 'real' ? examSetId : undefined,
      examRound: kind === 'real' ? examRound : undefined,
      level: kind === 'real' ? level : undefined,
      mode: kind === 'real' ? 'exam' : mode,
      examMode: kind === 'real' ? mode : undefined,
      score, correctCount, totalCount: allTargets.length, durationSec,
      officialTotalQuestions: kind === 'real' ? officialTotalQuestions : undefined,
      wrongQuestionIds: wrongEntries.map(([qid]) => qid),
      allQuestionIds: allTargets.map(q => q.id),
      answers: Array.from(answers.entries()),
      masterySnapshot,  // 结算前每个 questionType 的 {attempts, correct}，用于结果页展示掌握率变化
    }, TTL_RESULT);

    // 结算完成后清理 in-progress 存储
    clearProgress(`topik-exam-${sessionId}`);

    router.replace(`/topik/result/${sessionId}`);
  }, [answers, questions, sessionId, mode, legacySectionId, startedAt, router, kind, examSetId, examRound, level, officialTotalQuestions, user?.id]);

  // 切到阅读段（共用入口，防竞争）
  const switchToReadingStage = useCallback(() => {
    if (stageSwitchedRef.current) return;
    stageSwitchedRef.current = true;
    cancelSpeech();
    setStage('reading');
    setCurrentIdx(0);
    setShowAnswer(false);
    setShowTranslation(false);
    autoPlayedRef.current = new Set();
    setStageTransition(true);
  }, []);

  // 时间到自动交卷（真题模式只交当前段；旧版直接结束）
  useEffect(() => {
    if (!loaded) return;
    if (kind === 'legacy' && legacyTimeLeft === 0 && questions.length > 0) { finishExam(); return; }
    if (kind === 'real') {
      if (stage === 'listening' && listenTimeLeft === 0 && listenIds.length > 0) {
        if (readIds.length > 0) switchToReadingStage();
        else finishExam();
      } else if (stage === 'reading' && readTimeLeft === 0 && readIds.length > 0) {
        finishExam();
      }
    }
  }, [legacyTimeLeft, listenTimeLeft, readTimeLeft, finishExam, questions.length, loaded, kind, stage, listenIds.length, readIds.length, switchToReadingStage]);

  const handlePlayAudio = useCallback(async () => {
    if (!currentQ?.audioText) return;
    // 同步锁：playing state 异步，防止双击同时进入两次播放
    if (playingLockRef.current) return;
    // 必须在 await 之前同步调用 unlock——iOS 要求 AudioContext.resume() 在用户手势内完成
    unlockAudioContext();
    const used = playCounts.get(currentQ.id) || 0;
    const maxPlays = isRealMode ? getListeningPlayCount(examRound) : Infinity;
    if (used >= maxPlays) return;
    playingLockRef.current = true;
    setPlaying(true);
    if (kind === 'real') {
      setPlayCounts(prev => { const m = new Map(prev); m.set(currentQ.id, used + 1); return m; });
    }
    // 按行拆分 audioText，按说话人标签选 voice：여자/여성/여학생 → sunhi，남자/남성/남학생 → injoon
    // 无标签或其他标签（기자/사회자/전문가/人名 等）默认 sunhi
    // 部分脚本把多轮对话用空格挤在一行里，句末标点后的「说话人:」需先归一化成换行，否则说话人名会被读出来
    const normalized = currentQ.audioText
      .replace(/([.?!])\s+(?=[^\s:]{1,10}(?:\s[^\s:]{1,10})?\s*:)/g, '$1\n');
    const lines = normalized.split('\n').map(s => s.trim()).filter(Boolean);
    const segments = lines.map(line => {
      const m = line.match(/^([^\s:]{1,10}(?:\s[^\s:]{1,10})?)\s*:\s*(.*)$/);
      // 只有「说话人:」而无正文（TOPIK II「이어질 말」题的空发话行）→ 不朗读，避免读出说话人名
      if (m) {
        const isMale = /남자|남성|남학생/.test(m[1]);
        return { voice: isMale ? 'injoon' : 'sunhi', text: m[2] };
      }
      return { voice: 'sunhi', text: line };
    });
    try {
      // 优先用静态预生成音频（直出 nginx，避开 8800 实时合成）
      const staticUrl = `/audio/topik/${currentQ.id}.mp3`;
      let playedStatic = false;
      try {
        const check = await fetch(staticUrl, { method: 'HEAD' });
        if (check.ok) {
          await playAudioUrl(staticUrl);
          playedStatic = true;
        }
      } catch { /* 静默回落 speakDialog */ }
      if (!playedStatic) {
        const validSegs = segments.filter(s => s.text);
        if (validSegs.length > 0) {
          await speakDialog(validSegs, 0.85);
        }
      }
    } catch (e) {
      console.error('[TOPIK audio] speakDialog failed:', e);
      // Audio playback failed — show a brief visible hint instead of silent failure
      setAudioError(true);
      setTimeout(() => setAudioError(false), 3000);
    } finally {
    setPlaying(false);
    playingLockRef.current = false;
    }
  }, [currentQ, playCounts, kind, examRound, isRealMode]);

  // 听力播放改为手动：用户点击"播放"按钮才开始，不再自动触发

  const selectAnswer = (optionIdx: number) => {
    if (!currentQ) return;
    if (showAnswer) return;
    const newAnswers = new Map(answers);
    newAnswers.set(currentQ.id, optionIdx);
    setAnswers(newAnswers);
    // 仿真模式：不显示对错，直接允许进入下一题
    if (isRealMode) {
      // 不 setShowAnswer
    } else {
      setShowAnswer(true);
      if (optionIdx === currentQ.correctIdx) playSuccess(); else playError();
    }
  };

  const toggleMark = () => {
    if (!currentQ) return;
    const next = new Set(marks);
    if (next.has(currentQ.id)) next.delete(currentQ.id);
    else next.add(currentQ.id);
    setMarks(next);
  };

  const fetchAiExplain = useCallback(async () => {
    if (!currentQ || aiLoading || aiExplain.has(currentQ.id)) return;
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch('/api/ai/topik-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQ.id,
          audioText: currentQ.audioText || undefined,
          prompt: currentQ.prompt,
          options: currentQ.options,
          correctIdx: currentQ.correctIdx,
          userPickedIdx: answers.get(currentQ.id),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t('topik.ex_ai_fail', lang));
      setAiExplain(prev => new Map(prev).set(currentQ.id, data.explanation));
    } catch (e) {
      setAiError(e instanceof Error ? e.message : t('topik.ex_request_fail', lang));
    } finally {
      setAiLoading(false);
    }
  }, [currentQ, aiLoading, aiExplain, answers, lang]);

  function gotoIdx(i: number) {
    if (i < 0 || i >= totalCount) return;
    cancelSpeech();
    setPlaying(false);
    setCurrentIdx(i);
    setShowAnswer(false);
    setShowTranslation(false);
    setAiError(null);
    setPanelOpen(false);
  }

  function goNext() {
    currentIdxRef.current = currentIdx;
    if (currentIdxRef.current + 1 < totalCount) {
      gotoIdx(currentIdxRef.current + 1);
      return;
    }
    // 阶段结束
    if (kind === 'real' && stage === 'listening' && readIds.length > 0) {
      switchToReadingStage();
      return;
    }
    // 仿真模式最后一题：检查是否有未答题，给二次确认
    if (kind === 'real' && mode === 'real') {
      const unansweredCount = questions.filter(q => !answers.has(q.id)).length;
      if (unansweredCount > 0) {
        cancelSpeech();  // 弹窗期间停音，避免背景音
        setSubmitConfirm({ message: t('topik.ex_unanswered_confirm', lang, { n: unansweredCount }), onConfirm: finishExam });
        return;
      }
    }
    finishExam();
  }

  function submitStageEarly() {
    if (kind !== 'real') return;
    cancelSpeech();  // 暂停 TTS 再弹窗
    setSubmitConfirm({
      message: t('topik.ex_stage_early_confirm', lang),
      onConfirm: () => {
        if (stage === 'listening' && readIds.length > 0) switchToReadingStage();
        else finishExam();
      },
    });
  }

  function formatTime(s: number) {
    if (s < 0) return '—';
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  }

  const stageLabel = kind === 'real'
    ? (stage === 'listening' ? t('topik.ex_stage_listen', lang) : t('topik.ex_stage_read', lang))
    : (allSections.find(s => s.id === legacySectionId)?.title || t('topik.ex_stage_practice', lang));

  if (sessionGone) {
    return (
      <div className="tk-scope">
        <div className="tk-empty" style={{ maxWidth: 440, margin: '0 auto', padding: '80px 24px 40px' }}>
          <p className="tk-empty-title">{t('topik.ex_session_gone_title', lang)}</p>
          <p className="tk-empty-hint">{t('topik.ex_session_gone_hint', lang)}</p>
          <button className="tk-goto-btn" onClick={() => router.replace('/topik')}>{t('topik.ex_session_gone_btn', lang)}</button>
        </div>
      </div>
    );
  }

  if (!loaded || !currentQ) {
    return (
      <div className="tk-scope">
        <div className="tk-fullpage-msg">
          <div className="hint">{t('topik.loading', lang)}</div>
        </div>
      </div>
    );
  }

  const userPicked = answers.get(currentQ.id);
  const isMarked = marks.has(currentQ.id);
  const playUsed = playCounts.get(currentQ.id) || 0;
  const playMax = isRealMode && isListening ? getListeningPlayCount(examRound) : Infinity;
  const playRemain = playMax === Infinity ? Infinity : Math.max(0, playMax - playUsed);

  const timerWarn = currentTimeLeft > 0 && currentTimeLeft <= 60;

  return (
    <div className="tk-scope">
      <Modal open={showExitConfirm} onClose={() => setShowExitConfirm(false)} title={t('topik.ex_exit_title', lang)} size="sm">
        <p style={{ fontSize: 14, color: 'var(--color-ink-2)', lineHeight: 1.6, marginBottom: 20 }}>
          {t('topik.ex_exit_body', lang)}
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" fullWidth onClick={() => setShowExitConfirm(false)}>{t('topik.ex_continue', lang)}</Button>
          <Button variant="primary" tone="pink" fullWidth onClick={() => { setShowExitConfirm(false); router.replace('/topik'); }}>{t('topik.ex_exit', lang)}</Button>
        </div>
      </Modal>

      <Modal open={!!submitConfirm} onClose={() => setSubmitConfirm(null)} title={t('topik.ex_submit_title', lang)} size="sm">
        <p style={{ fontSize: 14, color: 'var(--color-ink-2)', lineHeight: 1.6, marginBottom: 20 }}>
          {submitConfirm?.message}
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" fullWidth onClick={() => setSubmitConfirm(null)}>{t('topik.ex_continue', lang)}</Button>
          <Button variant="primary" tone="pink" fullWidth onClick={() => { const cb = submitConfirm?.onConfirm; setSubmitConfirm(null); cb?.(); }}>{t('topik.ex_submit_confirm', lang)}</Button>
        </div>
      </Modal>

      <div className="tk-exam-header">
        <div className="tk-exam-header-left">
          <button className="tk-exam-back" onClick={() => { cancelSpeech(); setShowExitConfirm(true); }} aria-label={t('topik.back', lang)}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <p className="tk-exam-stage-title">{stageLabel}</p>
            {kind === 'real' && <div className="tk-exam-stage-sub">{t('topik.ex_header_sub', lang, { round: examRound, level, mode: t(mode === 'real' ? 'topik.ex_mode_real' : 'topik.ex_mode_practice', lang) })}</div>}
          </div>
        </div>
        <div className={`tk-exam-timer${timerWarn ? ' warn' : ''}`}>
          <Clock size={14} />
          {formatTime(currentTimeLeft)}
        </div>
      </div>

      <div className="tk-exam-progress">
        <div className="tk-exam-progress-bar">
          <div className="tk-exam-progress-fill" style={{ width: `${((currentIdx + 1) / totalCount) * 100}%` }} />
        </div>
        <span className="tk-exam-progress-count">{currentIdx + 1} / {totalCount}</span>
        <button className="tk-exam-panel-btn" onClick={() => setPanelOpen(true)} aria-label={t('topik.ex_rail_panel', lang)}>
          <ListChecks size={16} />
        </button>
      </div>

      {/* Question card + 桌面常驻右栏 */}
      <div className="tk-exam-layout">
      <div className="tk-exam-col">
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: C.card, borderRadius: 20, border: `1px solid ${C.line}`, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Audio */}
          {isListening && currentQ.audioText && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={() => handlePlayAudio()} disabled={playing || (isRealMode && playRemain === 0)} style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${C.line}`, background: playing ? C.optionBg : C.card, cursor: playing || (isRealMode && playRemain === 0) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 6, opacity: playing ? 0.7 : 1 }}>
                <Volume2 size={18} color={playing ? C.pink : C.muted} />
                <span style={{ fontSize: 12, color: playing ? C.pink : C.muted, fontWeight: 600 }}>
                  {playing ? t('topik.ex_playing', lang) : isRealMode && playRemain === 0 ? t('topik.ex_played_out', lang) : t('topik.ex_play', lang)}
                </span>
              </button>
              {audioError && (
                <span style={{ fontSize: 11, color: 'var(--color-status-danger)', fontWeight: 600 }}>{t('topik.ex_play_fail', lang)}</span>
              )}
              {isRealMode && (
                <span style={{ fontSize: 11, color: C.muted }}>
                  {t('topik.ex_play_remain', lang, { remain: playRemain, max: playMax })}
                </span>
              )}
            </div>
          )}

          {/* Topic + number */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {currentQ.topic && <span style={{ fontSize: 12, fontWeight: 700, color: C.pink, background: C.pinkSoft, borderRadius: 6, padding: '2px 8px' }}>#{currentQ.topic}</span>}
            {(() => {
              const gid = currentQ.groupId;
              if (!gid) return null;
              const m = gid.match(/G(\d+)-(\d+)$/);
              return m ? <span style={{ fontSize: 11, color: C.muted, background: C.optionBg, borderRadius: 6, padding: '2px 8px', fontWeight: 600 }}>{t('topik.ex_group', lang, { a: m[1], b: m[2] })}</span> : null;
            })()}
            {currentQ.testPoint && <span style={{ fontSize: 11, color: C.muted }}>{t('topik.ex_testpoint', lang, { point: currentQ.testPoint })}</span>}
            <button onClick={toggleMark} aria-label={t('topik.ex_mark', lang)} style={{ marginLeft: 'auto', padding: '8px 12px', minHeight: 36, borderRadius: 8, border: `1px solid ${isMarked ? C.pink : C.line}`, background: isMarked ? C.pinkSoft : 'transparent', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <Flag size={12} color={isMarked ? C.pink : C.muted} />
              <span style={{ fontSize: 11, color: isMarked ? C.pink : C.muted, fontWeight: 600 }}>{isMarked ? t('topik.ex_marked', lang) : t('topik.ex_mark', lang)}</span>
            </button>
            <span style={{ fontSize: 11, color: C.muted }}>{t('topik.ex_question_no', lang, { n: currentQ.number })}</span>
          </div>

          {/* Prompt */}
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{currentQ.prompt}</p>
            {!isRealMode && !isListening && (
              <div style={{ marginTop: 6 }}>
                {!showTranslation ? (
                  <button onClick={() => setShowTranslation(true)} style={{ fontSize: 12, color: C.muted, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>{t('topik.ex_show_translation', lang)}</button>
                ) : (
                  <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0', whiteSpace: 'pre-wrap' }}>{currentQ.promptZh}</p>
                )}
              </div>
            )}
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {currentQ.options.map((opt: string, i: number) => {
              let bg = C.optionBg, border = C.line, opacity = 1;
              const picked = userPicked === i;
              if (showAnswer) {
                if (i === currentQ.correctIdx) { bg = C.mintBg; border = C.mint; }
                else if (picked && i !== currentQ.correctIdx) { bg = C.pinkSoft; border = C.pink; }
                else { opacity = 0.45; }
              } else if (picked) {
                // 已选但未揭晓：用中性深色边框 + 浅底，避免粉色误暗示"错了"
                bg = C.card;
                border = C.ink;
              }
              return (
                <button key={i} onClick={() => selectAnswer(i)} disabled={showAnswer} style={{ background: bg, border: `${picked && !showAnswer ? 2 : 1}px solid ${border}`, borderRadius: 12, padding: picked && !showAnswer ? '11px 13px' : '12px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: showAnswer ? 'default' : 'pointer', opacity, width: '100%', textAlign: 'left' }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: picked && !showAnswer ? C.ink : C.card, border: `1px solid ${picked && !showAnswer ? C.ink : C.line}`, color: picked && !showAnswer ? '#fff' : C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{String.fromCharCode(65 + i)}</span>
                  <span style={{ fontSize: 14, color: C.ink, flex: 1, minWidth: 0, overflowWrap: 'break-word' }}>{opt}</span>
                  {showAnswer && i === currentQ.correctIdx && <Check size={16} color={C.mint} />}
                  {showAnswer && picked && i !== currentQ.correctIdx && <X size={16} color={C.pink} />}
                </button>
              );
            })}
          </div>

          {/* Explanation (仅练习模式) */}
          {showAnswer && !isRealMode && (
            <div style={{ background: C.optionBg, borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {isListening && currentQ.audioText && (
                <div style={{ background: C.innerCard, borderRadius: 10, padding: 12, border: `1px solid ${C.line}` }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, margin: '0 0 6px' }}>{t('topik.ex_listen_script', lang)}</p>
                  {(() => {
                    const ko = currentQ.audioText.split('\n');
                    const zh = (currentQ.audioTextZh || '').split('\n');
                    if (currentQ.audioTextZh && ko.length === zh.length) {
                      return ko.map((line, i) => (
                        <div key={i} style={{ marginBottom: i < ko.length - 1 ? 8 : 0 }}>
                          <p className="ko-text" style={{ fontSize: 13, color: C.ink, margin: 0, lineHeight: 1.6 }}>{line}</p>
                          {zh[i] && <p style={{ fontSize: 12, color: C.muted, margin: '2px 0 0', lineHeight: 1.6 }}>{zh[i]}</p>}
                        </div>
                      ));
                    }
                    return (
                      <>
                        <p className="ko-text" style={{ fontSize: 13, color: C.ink, margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{currentQ.audioText}</p>
                        {currentQ.audioTextZh && <p style={{ fontSize: 12, color: C.muted, margin: '8px 0 0', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{currentQ.audioTextZh}</p>}
                      </>
                    );
                  })()}
                </div>
              )}
              <p style={{ fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.6 }}>{currentQ.explanation}</p>
              {currentQ.vocabulary?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: C.muted }}>{t('topik.ex_core_vocab', lang)}</span>
                  {currentQ.vocabulary.map((v: string, vi: number) => (
                    <span key={vi} style={{ fontSize: 12, background: C.card, border: `1px solid ${C.line}`, borderRadius: 8, padding: '2px 8px', color: C.ink }}>{v}</span>
                  ))}
                </div>
              )}
              {currentQ.reviewGrammarId && (
                <a href={`/grammar?${currentQ.reviewGrammarId.startsWith('card-') ? 'card' : 'pattern'}=${currentQ.reviewGrammarId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#8b5cf6', background: 'rgba(139,92,246,0.08)', borderRadius: 8, padding: '6px 12px', textDecoration: 'none', border: '1px solid rgba(139,92,246,0.2)', width: 'fit-content' }}>
                  <BookOpen size={12} />{t('topik.ex_go_grammar', lang)}
                </a>
              )}
              {(() => {
                const ai = aiExplain.get(currentQ.id);
                if (ai) {
                  return (
                    <div style={{ marginTop: 4, background: C.innerCard, borderRadius: 10, padding: 12, border: `1px solid ${C.line}` }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#8b5cf6', margin: '0 0 6px' }}>{t('topik.ex_ai_detail', lang)}</p>
                      <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{ai}</div>
                    </div>
                  );
                }
                return (
                  <div style={{ marginTop: 4 }}>
                    <button onClick={fetchAiExplain} disabled={aiLoading} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#8b5cf6', background: 'rgba(139,92,246,0.08)', borderRadius: 8, padding: '6px 12px', border: '1px solid rgba(139,92,246,0.2)', cursor: aiLoading ? 'wait' : 'pointer', opacity: aiLoading ? 0.6 : 1 }}>
                      ✨ {aiLoading ? t('topik.ex_ai_thinking', lang) : t('topik.ex_ai_ask', lang)}
                    </button>
                    {aiError && <p style={{ fontSize: 11, color: C.pink, margin: '6px 0 0' }}>{aiError}</p>}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Action bar */}
          <div style={{ display: 'flex', gap: 8 }}>
            {currentIdx > 0 && (
              <button onClick={() => gotoIdx(currentIdx - 1)} style={{ padding: '14px 16px', borderRadius: 14, background: C.optionBg, color: C.ink, fontSize: 14, fontWeight: 700, border: `1px solid ${C.line}`, cursor: 'pointer' }}>
                {t('topik.ex_prev', lang)}
              </button>
            )}
            <button
              onClick={goNext}
              disabled={isRealMode ? false : !showAnswer}
              style={{
                flex: 1, padding: '14px 0', borderRadius: 14,
                background: (isRealMode || showAnswer) ? C.ink : C.line,
                color: (isRealMode || showAnswer) ? '#fff' : C.muted,
                fontSize: 14, fontWeight: 700, border: 'none',
                cursor: (isRealMode || showAnswer) ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {currentIdx + 1 >= totalCount
                ? (kind === 'real' && stage === 'listening' && readIds.length > 0 ? t('topik.ex_enter_reading', lang) : t('topik.ex_view_result', lang))
                : t('topik.ex_next', lang)}
              <ChevronRight size={16} />
            </button>
          </div>

          {/* 提前交卷（仅真题模式听力段） */}
          {kind === 'real' && stage === 'listening' && readIds.length > 0 && (
            <button onClick={submitStageEarly} style={{ marginTop: 4, padding: '12px 8px', minHeight: 44, borderRadius: 10, background: 'transparent', color: C.muted, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              {t('topik.ex_submit_early', lang)}
            </button>
          )}
        </div>
      </div>
      </div>{/* /tk-exam-col */}

      {/* ── 桌面常驻右栏（答题速览 · 题号面板） ── */}
      {(() => {
        const answeredCount = stageQuestions.filter(q => answers.has(q.id)).length;
        const markedCount = stageQuestions.filter(q => marks.has(q.id)).length;
        const pct = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0;
        const R = 32, CIRC = 2 * Math.PI * R;
        return (
          <aside className="er-rail" aria-label={t('topik.ex_rail_nav', lang)}>
            <div className="er-card">
              <div className="er-card-title"><Clock size={13} className="er-ico" /> {t('topik.ex_rail_overview', lang)}</div>
              <div className="er-ring-wrap">
                <div className="er-ring">
                  <svg width="76" height="76" viewBox="0 0 76 76">
                    <circle className="er-ring-track" cx="38" cy="38" r={R} fill="none" strokeWidth="6" />
                    <circle className="er-ring-fill" cx="38" cy="38" r={R} fill="none" strokeWidth="6"
                      strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - pct / 100)} />
                  </svg>
                  <div className="er-ring-num">{pct}%</div>
                </div>
                <div className="er-ring-meta">
                  {t('topik.ex_answered_label', lang)} <b>{answeredCount}</b> / {totalCount}<br />
                  {markedCount > 0 ? t('topik.ex_rail_marked_review', lang, { n: markedCount }) : t('topik.ex_rail_no_marks', lang)}
                </div>
              </div>
              <div className="er-overview-stats">
                <div className={`er-stat timer${timerWarn ? ' warn' : ''}`}><span>{t('topik.ex_rail_time_left', lang)}</span><b>{formatTime(currentTimeLeft)}</b></div>
                <div className="er-stat mark"><span>{t('topik.ex_rail_marked', lang)}</span><b>{markedCount}</b></div>
              </div>
            </div>

            <div className="er-card">
              <div className="er-card-title"><ListChecks size={13} className="er-ico" /> {t('topik.ex_rail_panel', lang)}</div>
              <div className="er-qgrid">
                {stageQuestions.map((q, i) => {
                  const answered = answers.has(q.id);
                  const marked = marks.has(q.id);
                  const isCurrent = i === currentIdx;
                  const cls = ['er-qnum', answered ? 'answered' : '', isCurrent ? 'current' : ''].filter(Boolean).join(' ');
                  return (
                    <button key={q.id} onClick={() => gotoIdx(i)} className={cls} aria-label={`${t('topik.ex_aria_question', lang, { num: q.number || i + 1 })}${answered ? ` ${t('topik.ex_legend_answered', lang)}` : ''}${marked ? ` ${t('topik.ex_rail_marked', lang)}` : ''}`} aria-current={isCurrent ? 'true' : undefined}>
                      {q.number || i + 1}
                      {marked && <span className="er-qflag" aria-hidden />}
                    </button>
                  );
                })}
              </div>
              <div className="er-legend">
                <span><i style={{ background: 'var(--color-mint-base)' }} />{t('topik.ex_legend_answered', lang)}</span>
                <span><i style={{ background: 'var(--er-coral)' }} />{t('topik.ex_legend_current', lang)}</span>
                <span><i style={{ background: 'var(--color-gold-base)' }} />{t('topik.ex_legend_marked', lang)}</span>
                <span><i style={{ border: '1.5px solid var(--color-border-3, var(--color-border-2))' }} />{t('topik.ex_legend_unanswered', lang)}</span>
              </div>
              <button className="er-submit" onClick={() => setShowExitConfirm(true)}>{t('topik.ex_rail_exit', lang)}</button>
            </div>
          </aside>
        );
      })()}
      </div>{/* /tk-exam-layout */}

      {/* 阶段过渡浮层 */}
      {stageTransition && (
        <div className="tk-overlay center">
          <div className="tk-stage-transition">
            <span className="tk-stage-transition-icon">
              <BookOpen size={28} />
            </span>
            <p className="tk-stage-transition-title">{t('topik.ex_stage_done_title', lang)}</p>
            <p className="tk-stage-transition-desc" style={{ whiteSpace: 'pre-line' }}>
              {t('topik.ex_stage_done_desc', lang, { min: Math.floor(readTimeLeft / 60) })}
            </p>
            <button className="tk-start-exam-btn" onClick={() => setStageTransition(false)}>
              {t('topik.ex_start_reading', lang)}
            </button>
          </div>
        </div>
      )}

      {/* 题号面板（抽屉） */}
      {panelOpen && (
        <div className="tk-overlay bottom" onClick={() => setPanelOpen(false)}>
          <div className="tk-panel-sheet" onClick={e => e.stopPropagation()}>
            <div className="tk-panel-head">
              <p className="tk-panel-title">{t('topik.ex_panel_title', lang)}<span className="stage">{stageLabel}</span></p>
              <button className="tk-panel-close" onClick={() => setPanelOpen(false)}>{t('topik.ex_panel_close', lang)}</button>
            </div>
            <div className="tk-panel-grid">
              {stageQuestions.map((q, i) => {
                const answered = answers.has(q.id);
                const marked = marks.has(q.id);
                const current = i === currentIdx;
                const cls = ['tk-panel-num', answered ? 'answered' : '', current ? 'current' : ''].filter(Boolean).join(' ');
                return (
                  <button key={q.id} onClick={() => gotoIdx(i)} className={cls}>
                    {q.number || i + 1}
                    {marked && <Flag size={10} color="var(--hr-pink-strong)" style={{ position: 'absolute', top: 3, right: 3 }} />}
                  </button>
                );
              })}
            </div>
            <div className="tk-panel-legend">
              <span>{t('topik.ex_panel_answered', lang)}</span>
              <span>{t('topik.ex_panel_unanswered', lang)}</span>
              <span>{t('topik.ex_panel_marked', lang)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
