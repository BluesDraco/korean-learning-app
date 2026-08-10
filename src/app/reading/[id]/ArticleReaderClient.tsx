'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Volume2, ChevronRight, Check, Sparkles,
  Trophy, BookOpen, Target, Lightbulb, Bookmark, Star, X,
  Headphones, Square, Menu, Sun, Moon, Play, Pause, Gauge, Mic,
  Languages, Puzzle, Keyboard, PenLine,
} from 'lucide-react';
import { levelLabel, levelColor } from '@/data/reading-meta';
import { speak, speakWord, cancelSpeech, unlockAudioContext } from '@/lib/tts';
import GrammarExplainBubble from '@/components/GrammarExplainBubble';
import GrammarPointCard from '../_components/GrammarPointCard';
import type { GrammarCard } from '@/types';
import { loadGrammarCards } from '../_components/loadGrammarCard';
import { saveRecording } from '@/lib/audio/saveRecording';
import { useMicRecorder } from '@/lib/audio/useMicRecorder';
import { db, ensureFavoritesBook } from '@/lib/db';
import { stripParticle } from '@/lib/koreanParticles';
import { awardXp, addStudyMinutes, incrementTodayLog } from '@/lib/gamification';
import { useFeedback } from '@/hooks/useFeedback';
import { WordTapSheet } from '@/components/WordTapSheet';
import AnnotationLayer from './AnnotationLayer';
import type { Article, ArticleQuestion, ArticleWord, UserArticleProgress, AnnotationStroke } from '@/types';
import { saveProgress, loadProgress, clearProgress, TTL_FLASHCARD } from '@/lib/progress-storage';
import { useAuth } from '@/components/AuthProvider';
import { useMembership } from '@/lib/useMembership';
import { readingLockState, freeStoryIds, storyLockState } from '@/lib/membership-benefits';
import LibrarySidebar from '../_components/LibrarySidebar';
import { TOPIC_META } from '../_components/topics';
import { useLang } from '@/components/LangProvider';
import { useIsDesktop } from '@/lib/useIsMobile';
import { FloatingKoreanKeyboard } from '@/components/FloatingKoreanKeyboard';
import { useSmartBack } from '@/lib/useSmartBack';
import { t, type Lang } from '@/lib/i18n';
import '../library.css'; // reader 页复用 library 样式（侧栏、暗色等）

type Step = 'goals' | 'vocab' | 'reading' | 'key_sentence' | 'quiz' | 'output' | 'settlement';

type OutputFeedback = {
  original: string;
  corrected: string;
  reason: string;
  isCorrect: boolean;
  scores: { vocabulary: number; grammar: number; naturalness: number; overall: number };
  saveExpression: string;
};

const AUDIO_SPEEDS = [0.75, 0.85, 1, 1.15, 1.3] as const;

function fmtTime(s: number): string {
  if (!isFinite(s) || s < 0) s = 0;
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

type ShadowVerdict = 'correct' | 'acceptable' | 'wrong';
interface ShadowResult { result: ShadowVerdict; score: number; correctAnswer: string; errorReason: string | null; tip: string | null; }
const SHADOW_META: Record<ShadowVerdict, { labelKey: string; color: string }> = {
  correct: { labelKey: 'reading.shadow_great', color: 'var(--mint-soft)' },
  acceptable: { labelKey: 'reading.shadow_ok', color: 'var(--mint-soft)' },
  wrong: { labelKey: 'reading.shadow_retry', color: 'var(--peach-soft)' },
};

// 跟读弹窗：听原音(mp3该句区间) + 录音(MediaRecorder,可回放对比) + 识别打分(speaking-judge)
function ShadowingModal({ ko, zh, audioUrl, start, end, onClose, lang, dark }: {
  ko: string; zh: string; audioUrl?: string; start?: number; end?: number; onClose: () => void; lang: Lang; dark: boolean;
}) {
  const [phase, setPhase] = useState<'idle' | 'recording' | 'judging' | 'result'>('idle');
  const [spoken, setSpoken] = useState('');
  const [res, setRes] = useState<ShadowResult | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [myAudioUrl, setMyAudioUrl] = useState<string | null>(null);
  const [playingOrig, setPlayingOrig] = useState(false);
  const [playingMine, setPlayingMine] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = useAuth();

  const myBlobRef = useRef<Blob | null>(null);
  const durationRef = useRef<number>(0);
  const origAudioRef = useRef<HTMLAudioElement | null>(null);
  const mineAudioRef = useRef<HTMLAudioElement | null>(null);
  // 录音 URL 变化时回收上一个 blob URL，防内存泄漏
  useEffect(() => () => { if (myAudioUrl) URL.revokeObjectURL(myAudioUrl); }, [myAudioUrl]);

  // 听原音：播放整篇 mp3 的该句 [start,end] 区间
  const playOriginal = () => {
    const a = origAudioRef.current;
    if (!a) return;
    if (!a.paused) { a.pause(); return; }
    if (typeof start === 'number') a.currentTime = start;
    unlockAudioContext();
    a.play().then(() => setPlayingOrig(true)).catch(() => { setPlayingOrig(false); });
  };
  const onOrigTime = () => {
    const a = origAudioRef.current;
    if (a && typeof end === 'number' && a.currentTime >= end) { a.pause(); setPlayingOrig(false); }
  };

  const judge = async (text: string) => {
    setPhase('judging');
    try {
      const r = await fetch('/api/ai/speaking-judge', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spoken: text, target: ko, meaning: zh, type: 'sentence' }),
      });
      if (r.status === 401) { setErr(t('reading.please_login', lang)); setPhase('idle'); return; }
      if (r.status === 429) { setErr(t('reading.shadow_limit', lang)); setPhase('idle'); return; }
      if (!r.ok) { setErr(t('reading.score_unavailable', lang)); setPhase('idle'); return; }
      const d = await r.json();
      const verdict: ShadowVerdict = ['correct', 'acceptable', 'wrong'].includes(d?.result) ? d.result : 'wrong';
      setRes({ result: verdict, score: typeof d.score === 'number' ? d.score : 0, correctAnswer: d.correctAnswer ?? ko, errorReason: d.errorReason ?? null, tip: d.tip ?? null });
      setPhase('result');
    } catch { setErr(t('reading.network_error', lang)); setPhase('idle'); }
  };

  // 录音走全站统一的 useMicRecorder：AudioRecorder 直捕 16k 无损 PCM → /api/asr/aliyun。
  // 绕过 MediaRecorder 的 Opus 有损压缩，辅音特征不丢，识别更准（与 speaking/companion 等入口一致）。
  // onResult 的 meta.wav 同时用于「回放对比」与「保存到我的录音」。
  const mic = useMicRecorder({
    onResult: (text, meta) => {
      if (meta) {
        myBlobRef.current = meta.wav;
        durationRef.current = meta.durationMs;
        setMyAudioUrl(prev => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(meta.wav); });
      }
      setSpoken(text);
      judge(text);
    },
    onError: (msg) => { setErr(msg); setPhase('idle'); },
    minMs: 500,
    tooShortMsg: t('audio.too_short', lang),
  });

  const startRecording = () => {
    setErr(null); setRes(null); setSpoken(''); setSaved(false);
    if (myAudioUrl) { URL.revokeObjectURL(myAudioUrl); setMyAudioUrl(null); }
    myBlobRef.current = null;
    setPhase('recording');
    void mic.start();
  };

  const stopRecording = () => {
    // 切到 judging 避免按钮闪回「开始录音」；hook 内部完成 ASR 后经 onResult → judge
    setPhase('judging');
    void mic.stop();
  };

  const playMine = () => {
    const a = mineAudioRef.current;
    if (!a) return;
    if (!a.paused) { a.pause(); return; }
    unlockAudioContext();
    a.play().then(() => setPlayingMine(true)).catch(() => { setPlayingMine(false); });
  };

  const handleSaveMine = async () => {
    if (!myBlobRef.current) return;
    const id = await saveRecording({
      blob: myBlobRef.current,
      durationMs: durationRef.current,
      type: 'shadowing',
      sourceType: 'reading',
      korean: ko,
      userId: user?.id,
    });
    if (id) setSaved(true);
  };

  const recording = phase === 'recording';

  return createPortal(
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'oklch(20% 0.02 65 / 0.5)', backdropFilter: 'blur(3px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, animation: 'shadowBackdrop .2s ease-out' }}>
        <div className={`lib-scope lib-reader${dark ? ' lib-dark' : ''}`} onClick={(e) => e.stopPropagation()} style={{
          position: 'relative', width: '100%', maxWidth: 440, minHeight: 'auto', maxHeight: '90vh', overflowY: 'auto',
          background: 'var(--bg-card)', borderRadius: 22, padding: '22px 24px 24px',
          boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-1)',
          animation: 'shadowCard .34s var(--ease) both',
        }}>
        {/* 顶栏：场景 kicker + 关闭 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--amber-deep)' }}>
            <Mic size={13} /> {t('reading.shadow_score', lang)}
          </span>
          <button onClick={onClose} aria-label={t('reading.close', lang)} style={{ display: 'flex', width: 28, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 8, color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* 目标句：琥珀竖线引用块 */}
        <div style={{ position: 'relative', paddingLeft: 14, marginBottom: 18 }}>
          <span aria-hidden style={{ position: 'absolute', left: 0, top: 2, bottom: 2, width: 3, borderRadius: 2, background: 'var(--amber)' }} />
          <p style={{ fontFamily: "'Noto Sans KR',sans-serif", fontSize: 19, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.55, marginBottom: 5 }}>{ko}</p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{zh}</p>
        </div>

        {/* 听原音 + 录音：ghost 次要 / 实心主要 */}
        <div style={{ display: 'flex', gap: 10 }}>
          {audioUrl && (
            <>
              <audio ref={origAudioRef} src={audioUrl} preload="metadata" onTimeUpdate={onOrigTime} onPause={() => setPlayingOrig(false)} onEnded={() => setPlayingOrig(false)} />
              <button onClick={playOriginal} style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '13px 18px', borderRadius: 14, border: '1px solid var(--border-2)', background: 'var(--bg-input)', color: 'var(--text-secondary)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                {playingOrig ? <Pause size={16} /> : <Volume2 size={16} />} {t('reading.listen_original', lang)}
              </button>
            </>
          )}
          {!recording ? (
            <button onClick={startRecording} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 0', borderRadius: 14, border: 'none', background: 'var(--amber)', color: 'oklch(22% 0.03 65)', fontSize: 14, fontWeight: 800, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
              <Mic size={16} /> {myAudioUrl ? t('reading.record_again', lang) : t('reading.start_record', lang)}
            </button>
          ) : (
            <button onClick={stopRecording} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 0', borderRadius: 14, border: 'none', background: 'var(--advanced)', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
              <Square size={13} fill="currentColor" /> {t('reading.stop_record', lang)}
            </button>
          )}
        </div>

        {/* 录音中：脉冲 + 实时识别 */}
        {recording && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 14 }}>
            <span aria-hidden style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--advanced)', animation: 'shadowPulse 1.1s var(--ease) infinite', flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              {spoken || t('reading.recording', lang)}
            </p>
          </div>
        )}

        {err && <p style={{ fontSize: 12.5, color: 'var(--advanced)', marginTop: 14, marginBottom: 0 }}>{err}</p>}
        {phase === 'judging' && (
          <p style={{ fontSize: 13, color: 'var(--amber-deep)', marginTop: 14, marginBottom: 0, display: 'flex', alignItems: 'center', gap: 7 }}>
            <Sparkles size={14} className="animate-spin" /> {t('reading.scoring', lang)}
          </p>
        )}

        {/* 我的录音回放 */}
        {myAudioUrl && !recording && (
          <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <audio ref={mineAudioRef} src={myAudioUrl} onPause={() => setPlayingMine(false)} onEnded={() => setPlayingMine(false)} />
            <button onClick={playMine} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 15px', borderRadius: 999, border: '1px solid var(--border-2)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {playingMine ? <Pause size={14} /> : <Play size={14} />} {t('reading.play_my_recording', lang)}
            </button>
            {user && (
              <button onClick={handleSaveMine} disabled={saved} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 15px', borderRadius: 999, border: '1px solid var(--border-2)', background: saved ? 'transparent' : 'var(--bg-input)', color: saved ? 'var(--text-muted)' : 'var(--text-secondary)', fontSize: 13, fontWeight: 600, cursor: saved ? 'default' : 'pointer' }}>
                {saved ? <Check size={14} /> : <Bookmark size={14} />} {saved ? t('mine.recordings_saved', lang) : t('mine.recordings_save', lang)}
              </button>
            )}
          </div>
        )}

        {/* 打分结果：分数大字 + 语义色，无描边盒 */}
        {phase === 'result' && res && (
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--border-1)', animation: 'shadowResult .4s var(--ease) both' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 40, fontWeight: 900, lineHeight: 1, color: SHADOW_META[res.result].color, letterSpacing: '-.02em' }}>{res.score}</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: SHADOW_META[res.result].color }}>{t(SHADOW_META[res.result].labelKey, lang)}</span>
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
              {t('reading.recognized', lang)}<span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{spoken || '—'}</span>
            </p>
            {res.errorReason && <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 6, marginBottom: 0, lineHeight: 1.55 }}>{res.errorReason}</p>}
            {res.tip && <p style={{ fontSize: 12.5, color: 'var(--amber-deep)', marginTop: 6, marginBottom: 0, lineHeight: 1.55 }}>💡 {res.tip}</p>}
          </div>
        )}
        <style>{`
          @keyframes shadowBackdrop { 0% { opacity: 0; } 100% { opacity: 1; } }
          @keyframes shadowCard { 0% { opacity: 0; transform: translateY(12px) scale(.97); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
          @keyframes shadowResult { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }
          @keyframes shadowPulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .35; transform: scale(.7); } }
        `}</style>
        </div>
      </div>,
    document.body,
  );
}

function hasBatchim(word: string): boolean {
  if (!word) return false;
  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return false;
  return (code - 0xAC00) % 28 !== 0;
}

// 无段落数据 → 按每 3 句切成段落，给流式正文视觉换行
function splitParagraphs(sentences: Article['sentences']): Article['sentences'][] {
  // 按 paragraphBreak 标记自然分段；无标记时按 5 句一段兜底
  const out: Article['sentences'][] = [];
  let start = 0;
  for (let i = 0; i < sentences.length; i++) {
    if (sentences[i].paragraphBreak && i > start) {
      out.push(sentences.slice(start, i));
      start = i;
    }
  }
  if (start < sentences.length) out.push(sentences.slice(start));
  // 如果全篇没有标记（所有句子都在一段），用 5 句分段兜底
  if (out.length <= 1 && sentences.length > 5) {
    const size = 5;
    const chunks: Article['sentences'][] = [];
    for (let i = 0; i < sentences.length; i += size) chunks.push(sentences.slice(i, i + size));
    return chunks;
  }
  return out;
}

function resolveParticle(template: string, word: string): string {
  const batchim = hasBatchim(word);
  return template
    .replace('___', word)
    .replace('을/를', batchim ? '을' : '를')
    .replace('은/는', batchim ? '은' : '는')
    .replace('이/가', batchim ? '이' : '가');
}

export default function ArticleReaderClient({ article: initialArticle }: { article: Article }) {
  const router = useRouter();
  const backToList = useSmartBack('/reading');
  const { lang } = useLang();
  const { user } = useAuth();
  const { tier, loading: memLoading } = useMembership();
  const params = useParams();
  const articleId = params.id as string;
  const [article, setArticle] = useState<Article | null | undefined>(initialArticle);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [progressMap, setProgressMap] = useState<Map<string, UserArticleProgress>>(new Map());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setDark(document.documentElement.getAttribute('data-theme') === 'dark');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    // 加载全部文章（侧栏需要）及当前篇关联语法课
    import('@/data/reading-new').then((m) => {
      if (cancelled) return;
      setAllArticles(m.readingArticles.filter((a) => !a.hidden));
    });
    setGrammarCards([]);
    if (initialArticle?.grammarCardIds?.length) {
      loadGrammarCards(initialArticle.grammarCardIds).then((cards) => {
        if (!cancelled) setGrammarCards(cards);
      });
    }
    (async () => {
      try {
        const all = await db.userArticleProgress.toArray();
        if (cancelled) return;
        const map = new Map<string, UserArticleProgress>();
        for (const p of all) map.set(p.articleId, p);
        setProgressMap(map);
        // 回填当前篇已读/已收藏，避免结算数归零、书签图标错、重复 toggle
        const cur = map.get(articleId);
        if (cur) {
          if (cur.readSentenceIds?.length) setRevealedZh(new Set(cur.readSentenceIds));
          if (cur.savedSentenceIds?.length) setSavedSentences(new Set(cur.savedSentenceIds));
          if (cur.savedWordIds?.length) setSavedWords(new Set(cur.savedWordIds));
        }
      } catch { /* 无本地库 */ }
    })();
    return () => { cancelled = true; };
  }, [articleId]);

  // 服务端传入的文章变化时同步（客户端导航切换文章）
  useEffect(() => { setArticle(initialArticle); }, [initialArticle]);

  const [step, setStep] = useState<Step>('goals');
  const [revealedZh, setRevealedZh] = useState<Set<string>>(new Set());
  const [showParaTrans, setShowParaTrans] = useState(false);
  const [savedSentences, setSavedSentences] = useState<Set<string>>(new Set());
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [expandedVocab, setExpandedVocab] = useState<Set<string>>(new Set());
  const [playingAll, setPlayingAll] = useState(false);
  const playAllRef = useRef(false);
  // 预录全文音频（狐狸女声 mp3 + 时间戳高亮）
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioCur, setAudioCur] = useState(0);
  const [audioDur, setAudioDur] = useState(0);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const quizAnsweredRef = useRef<Set<string>>(new Set()); // 同步锁，挡同帧双击重复计分
  const [quizRevealed, setQuizRevealed] = useState<Record<string, boolean>>({});
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [outputValue, setOutputValue] = useState('');
  const isDesktop = useIsDesktop();
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [sentenceToast, setSentenceToast] = useState(false);
  const [outputDone, setOutputDone] = useState(false);
  const [outputScoring, setOutputScoring] = useState(false);
  const [outputFeedback, setOutputFeedback] = useState<OutputFeedback | null>(null);
  const [exprSaved, setExprSaved] = useState(false);
  const [finalXp, setFinalXp] = useState(10);
  const enterTimeRef = useRef(Date.now());
  const [selectedWord, setSelectedWord] = useState<ArticleWord | null>(null);
  const [aiLookupWord, setAiLookupWord] = useState<string | null>(null);
  // 手写批注：模式开关 + 笔迹 + 画笔状态。笔迹按 article.id 存一行，走 CloudTable 云同步。
  const [annotateMode, setAnnotateMode] = useState(false);
  const [annStrokes, setAnnStrokes] = useState<AnnotationStroke[]>([]);
  const annStrokesRef = useRef(annStrokes); // 供 unmount flush 读取最新值
  annStrokesRef.current = annStrokes;
  const [penColor, setPenColor] = useState<AnnotationStroke['color']>('yellow');
  const [eraser, setEraser] = useState(false);
  const annBoxRef = useRef<HTMLDivElement | null>(null);
  const annBaseRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const annSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);
  const sentenceToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const outputScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  const [shadowIdx, setShadowIdx] = useState<number | null>(null); // 当前打开跟读弹窗的句索引
  const [quizTransShown, setQuizTransShown] = useState<Record<string, boolean>>({}); // quiz 题目：已展开中文翻译的题 id
  const [revealedPoints, setRevealedPoints] = useState(1); // 重点句型页：已揭示的语法点卡片数（逐个出现）
  const [grammarCards, setGrammarCards] = useState<GrammarCard[]>([]); // 关联语法课（异步加载）
  const completedRef = useRef(false);
  const { success: feedbackSuccess, complete: feedbackComplete, click: feedbackClick, error: feedbackError } = useFeedback();

  const SESSION_KEY = `reading-progress-${articleId}-${user?.id ?? 'guest'}`;

  // restore session progress on mount
  useEffect(() => {
    const saved = loadProgress<{ s: Step; qi: number; qa: Record<string, string>; qr: Record<string, boolean>; qc: number; ov: string; t0: number }>(SESSION_KEY);
    if (!saved) return;
    const { s, qi, qa, qr, qc, ov, t0 } = saved;
    if (s && s !== 'goals' && s !== 'settlement') {
      setStep(s);
      setQuizIdx(qi ?? 0);
      setQuizAnswers(qa ?? {});
      setQuizRevealed(qr ?? {});
      setQuizCorrect(qc ?? 0);
      if (ov) setOutputValue(ov);
      if (t0) enterTimeRef.current = t0; // 跨会话累计学习时长
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist step progress
  useEffect(() => {
    if (step === 'settlement') { clearProgress(SESSION_KEY); return; }
    saveProgress(SESSION_KEY, { s: step, qi: quizIdx, qa: quizAnswers, qr: quizRevealed, qc: quizCorrect, ov: outputValue, t0: enterTimeRef.current }, TTL_FLASHCARD);
  }, [step, quizIdx, quizAnswers, quizRevealed, quizCorrect, outputValue, SESSION_KEY]);

  // 载入本文已保存的手写批注(一文章一行，id=article.id)
  useEffect(() => {
    if (!article) return;
    let alive = true;
    (async () => {
      try {
        const row = await db.articleAnnotations.get(article.id);
        if (alive && row?.strokes && Array.isArray(row.strokes)) setAnnStrokes(row.strokes);
      } catch { /* 读失败保持空，不打断阅读 */ }
    })();
    return () => { alive = false; };
  }, [article]);

  // 批注变更：本地即时更新 + 防抖 400ms 写库(失败静默，不影响画布)
  const handleAnnChange = useCallback((next: AnnotationStroke[]) => {
    setAnnStrokes(next);
    if (!article) return;
    if (annSaveTimer.current) clearTimeout(annSaveTimer.current);
    annSaveTimer.current = setTimeout(() => {
      const now = Date.now();
      db.articleAnnotations.put({
        id: article.id, articleId: article.id, strokes: next,
        baseW: annBaseRef.current.w, baseH: annBaseRef.current.h,
        createdAt: now, updatedAt: now,
      }).catch(() => { /* 写失败静默：本地画布已更新，下次变更会重试 */ });
    }, 400);
  }, [article]);

  useEffect(() => () => {
    if (annSaveTimer.current) { clearTimeout(annSaveTimer.current); annSaveTimer.current = null; }
    // 卸载前同步落盘，避免最后 400ms 批注丢失
    if (annStrokesRef.current.length > 0 && article) {
      const now = Date.now();
      db.articleAnnotations.put({
        id: article.id, articleId: article.id, strokes: annStrokesRef.current,
        baseW: annBaseRef.current.w, baseH: annBaseRef.current.h,
        createdAt: now, updatedAt: now,
      }).catch(() => {});
    }
  }, [article]);

  useEffect(() => {
    if (!article || completedRef.current) return;
    // Record view event
    (async () => {
      try {
        const now = Date.now();
        await db.articleLearningEvents.put({
          id: crypto.randomUUID(), articleId: article.id,
          action: 'view_article', createdAt: now,
        });
        const existing = await db.userArticleProgress.get(article.id);
        if (!existing) {
          await db.userArticleProgress.put({
            id: article.id, articleId: article.id,
            userId: user?.id,
            status: 'reading', readSentenceIds: [],
            savedSentenceIds: [], savedWordIds: [],
            lastReadAt: now, createdAt: now, updatedAt: now,
          });
        } else {
          await db.userArticleProgress.update(article.id, {
            status: existing.status === 'completed' ? 'completed' : 'reading',
            lastReadAt: now, updatedAt: now,
          });
        }
      } catch { console.error('[reading] view_event write error'); }
    })();
    return () => {
      playAllRef.current = false; mountedRef.current = false; cancelSpeech();
      if (sentenceToastTimer.current) { clearTimeout(sentenceToastTimer.current); sentenceToastTimer.current = null; }
      if (outputScrollTimer.current) { clearTimeout(outputScrollTimer.current); outputScrollTimer.current = null; }
    };
  }, [article]);

  // 离开阅读步骤时停止全文播放（内联停止逻辑，避免引用后置声明的 const 函数触发 TDZ）
  useEffect(() => {
    if (step !== 'reading') {
      if (playAllRef.current) {
        playAllRef.current = false;
        setPlayingAll(false);
        cancelSpeech();
        setSpeakingId(null);
      }
      const a = audioRef.current;
      if (a && !a.paused) a.pause();
    }
    // 每次进入重点句型页，语法点从第一张开始逐个揭示
    if (step === 'key_sentence') setRevealedPoints(1);
    // 切换步骤后回到页面顶端（否则停留在上一页滚动位置）
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'auto' });
  }, [step]);

  // Auto-skip steps that have no data
  useEffect(() => {
    if (step === 'key_sentence' && article && !article.keySentence) {
      setStep('quiz');
    }
    if (step === 'output' && article && !article.outputTask) {
      handleComplete();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, article]);

  const toggleRevealZh = useCallback((sId: string) => {
    setRevealedZh((prev) => {
      const next = new Set(prev);
      if (next.has(sId)) next.delete(sId); else next.add(sId);
      db.userArticleProgress.update(article!.id, {
        readSentenceIds: [...next], updatedAt: Date.now(),
      }).catch((e) => { console.error('ArticleReader: update readSentenceIds failed', e); });
      return next;
    });
    db.articleLearningEvents.put({
      id: crypto.randomUUID(), articleId: article?.id ?? '', sentenceId: sId,
      action: 'reveal_translation', createdAt: Date.now(),
    }).catch((e) => { console.error('ArticleReader: log reveal_translation failed', e); });
  }, [article?.id]);

  const handleFullTextClick = useCallback((sId: string) => {
    // 正文点句只高亮当前句，不改变正文结构、不跳转到精读区
    setActiveHighlight(sId);
  }, []);

  const progressPct = useMemo(() => {
    const steps: Step[] = ['goals', 'vocab', 'reading', 'key_sentence', 'quiz', 'output', 'settlement'];
    return ((steps.indexOf(step)) / (steps.length - 1)) * 100;
  }, [step]);

  if (article === undefined) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-[var(--pink-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--text-secondary)]">{t('reading.article_not_found', lang)}</p>
        <button onClick={() => router.push('/reading')} className="mt-3 text-sm text-[var(--pink-primary)] hover:underline">
          {t('reading.back_to_list', lang)}
        </button>
      </div>
    );
  }

  // 会员内容墙：故事集（이야기）按难度档各放前 N 篇免费，走 storyLockState；
  // 其余内容（纪实文章等）仍是免费档仅 A1 级，走 readingLockState。admin 例外可进入。
  const isStory = article.topic === '이야기';
  const storyBlocked = isStory
    ? allArticles.length > 0 &&
      storyLockState(
        tier,
        freeStoryIds(allArticles.filter((a) => a.topic === '이야기')).has(article.id),
        user?.role === 'admin',
      ).blocked
    : readingLockState(tier, article.level, user?.role === 'admin').blocked;
  if (!memLoading && storyBlocked) {
    return (
      <div className="py-24 px-6 text-center flex flex-col items-center gap-3">
        <div className="text-5xl">👑</div>
        <p className="text-lg font-bold text-[var(--text-primary)]">{t('reading.member_only', lang)}</p>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
          {t('reading.member_wall_body', lang)}
        </p>
        <button
          onClick={() => router.push('/membership')}
          className="mt-2 px-6 py-2.5 rounded-full text-white text-sm font-bold"
          style={{ background: 'linear-gradient(150deg, #ff9dbb, #ff7fa8)', boxShadow: '0 5px 15px rgba(255,127,168,0.32)' }}
        >
          {t('reading.unlock_all', lang)}
        </button>
        <button onClick={() => router.push('/reading')} className="text-sm text-[var(--text-secondary)] hover:underline">
          {t('reading.back_to_list', lang)}
        </button>
      </div>
    );
  }

  const speakSentence = async (sId: string, text: string) => {
    stopPlayAll();
    cancelSpeech();
    setSpeakingId(sId);
    try {
      await speak(text);
    } catch { console.error('[reading] speakSentence error', text); } finally {
      setSpeakingId(null);
    }
  };

  const stopPlayAll = () => {
    playAllRef.current = false;
    setPlayingAll(false);
    cancelSpeech();
    setSpeakingId(null);
  };

  // 全文听力回退（无预录音频时）：连续朗读，只高亮正文当前句，绝不滚动、不强制展开精读
  const playAll = async () => {
    if (!article) return;
    if (playAllRef.current) { stopPlayAll(); return; }
    playAllRef.current = true;
    setPlayingAll(true);
    for (const s of article.sentences) {
      if (!playAllRef.current) break;
      setActiveHighlight(s.id);
      setSpeakingId(s.id);
      try {
        await speak(s.ko);
      } catch { /* 跳过朗读失败的句子 */ }
      if (!playAllRef.current) break;
      await new Promise((r) => setTimeout(r, 350)); // 句间停顿
    }
    playAllRef.current = false;
    setPlayingAll(false);
    setSpeakingId(null);
  };

  // ── 预录全文音频：播放/暂停 ──
  const toggleFullAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    stopPlayAll();
    cancelSpeech();
    if (a.paused) {
      unlockAudioContext();
      a.playbackRate = audioSpeed;
      a.play().catch(() => { setPlayingAll(false); });
    } else {
      a.pause();
    }
  };

  // timeupdate：currentTime 落在哪句 [start,end] 就高亮该句 + 展中文 + 滚动
  const onAudioTime = () => {
    const a = audioRef.current;
    if (!a || !article?.audioTimings) return;
    setAudioCur(a.currentTime);
    const t = a.currentTime;
    const timings = article.audioTimings;
    let idx = -1;
    for (let i = 0; i < timings.length; i++) {
      if (t >= timings[i].start && t < timings[i].end) { idx = i; break; }
      if (t >= timings[i].start) idx = i; // 落在句间停顿则保持上一句
    }
    if (idx < 0) return;
    const s = article.sentences[idx];
    if (!s || activeHighlight === s.id) return;
    // 播放时只高亮正文当前句，不强制滚动、不强制展开译文（由用户点击控制）
    setActiveHighlight(s.id);
  };

  const setAudioSpeedAndApply = (s: number) => {
    setAudioSpeed(s);
    setSpeedMenuOpen(false);
    if (audioRef.current) audioRef.current.playbackRate = s;
  };

  const seekAudio = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    a.currentTime = ratio * a.duration;
    setAudioCur(a.currentTime);
  };

  // 把一句韩文渲染成内联 token；命中词库的词用 .word-lookup（可点查词）
  const renderInlineWords = (s: Article['sentences'][number]) =>
    s.ko.split(/(\s+)/).map((token, i) => {
      if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
      const wordInfo = s.words.find((w) => {
        if (token.length / w.word.length > 1.8) return false;
        if (token.startsWith(w.word)) return true;
        if (w.word.endsWith('다')) return token.startsWith(w.word.slice(0, -1));
        return false;
      });
      if (wordInfo) {
        return (
          <span
            key={i}
            className="word-lookup"
            onClick={(e) => { e.stopPropagation(); setSelectedWord(wordInfo); }}
          >
            {token}
          </span>
        );
      }
      const cleaned = stripParticle(token.replace(/[.,!?"'"'。，！？、]/g, ''));
      return (
        <span
          key={i}
          className="word-lookup ai"
          onClick={(e) => { e.stopPropagation(); setSelectedWord(null); setAiLookupWord(cleaned); }}
        >
          {token}
        </span>
      );
    });

  // 例句点词查词：按空格切词，每个词可点（走 AI 查词，因为例句无 words 数据）
  const renderTappableExample = (text: string) =>
    text.split(/(\s+)/).map((token, i) => {
      if (/^\s+$/.test(token) || !token) return <span key={i}>{token}</span>;
      const cleaned = stripParticle(token.replace(/[.,!?"'"'。，！？、]/g, ''));
      if (!cleaned) return <span key={i}>{token}</span>;
      return (
        <span
          key={i}
          className="word-lookup ai"
          onClick={(e) => { e.stopPropagation(); setSelectedWord(null); setAiLookupWord(cleaned); }}
        >
          {token}
        </span>
      );
    });

  const toggleSaveSentence = async (sId: string) => {
    const wasSaved = savedSentences.has(sId);
    setSavedSentences((prev) => {
      const next = new Set(prev);
      if (next.has(sId)) next.delete(sId); else next.add(sId);
      return next;
    });
    feedbackClick();
    if (!wasSaved) { feedbackSuccess(t('reading.saved_sentence', lang)); setSentenceToast(true); if (sentenceToastTimer.current) clearTimeout(sentenceToastTimer.current); sentenceToastTimer.current = setTimeout(() => { if (mountedRef.current) setSentenceToast(false); }, 3000); }
    try {
      const p = await db.userArticleProgress.get(article.id);
      const ids = new Set(p?.savedSentenceIds || []);
      if (ids.has(sId)) ids.delete(sId); else ids.add(sId);
      await db.userArticleProgress.update(article.id, {
        savedSentenceIds: [...ids], updatedAt: Date.now(),
      });
      // 同步写入 db.sentences，方便"我的句子"页面展示
      if (!wasSaved) {
        const sentence = article.sentences.find((s) => s.id === sId);
        if (sentence) {
          const existing = await db.sentences.where('korean').equals(sentence.ko).first().catch(() => null);
          if (!existing) {
            await db.sentences.add({
              id: crypto.randomUUID(),
              userId: user?.id,
              korean: sentence.ko,
              chinese: sentence.zh ?? '',
              source_type: 'reading',
              source_id: article.id,
              source_title: article.title,
              created_at: Date.now(),
            });
          }
        }
      }
    } catch {
      // 写库失败：回滚乐观更新，避免"显示已收藏但重开就没了"的假象
      setSavedSentences((prev) => {
        const next = new Set(prev);
        if (wasSaved) next.add(sId); else next.delete(sId);
        return next;
      });
      feedbackError(t('reading.save_failed', lang));
    }
  };

  const toggleSaveWord = async (word: string) => {
    const wasSaved = savedWords.has(word);
    setSavedWords((prev) => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word); else next.add(word);
      return next;
    });
    feedbackClick();
    if (!wasSaved) feedbackSuccess(t('reading.added_word', lang));
    try {
      const p = await db.userArticleProgress.get(article.id);
      const ids = new Set(p?.savedWordIds || []);
      if (ids.has(word)) ids.delete(word); else ids.add(word);
      await db.userArticleProgress.update(article.id, {
        savedWordIds: [...ids], updatedAt: Date.now(),
      });
      // Also add to vocabulary
      const wordInfo = article.coreWords.find((w) => w.word === word)
        || article.sentences.flatMap((s) => s.words).find((w) => w.word === word);
      if (wordInfo) {
        const exists = await db.words.where('word').equals(word).first();
        let wordId: string;
        if (!exists) {
          wordId = crypto.randomUUID();
          await db.words.put({
            id: wordId, word: stripParticle(wordInfo.word),
            pronunciation: wordInfo.pronunciation || '', meaning: wordInfo.meaning,
            partOfSpeech: '单词', examples: [], source: 'reading',
            sourceDetail: article.title, mastery: 'new', srsLevel: 0,
            easeFactor: 2.5, interval: 0, nextReview: Date.now(),
            correctCount: 0, wrongCount: 0, createdAt: Date.now(), lastReviewed: null,
          });
        } else {
          wordId = exists.id;
        }
        // 加入收藏夹单词本
        if (!wasSaved) {
          const bookId = await ensureFavoritesBook();
          const book = await db.wordBooks.get(bookId);
          if (book && !book.wordIds.includes(wordId)) {
            await db.wordBooks.update(bookId, { wordIds: [...book.wordIds, wordId], updatedAt: Date.now() });
          }
        }
      }
    } catch {
      // 写库失败：回滚乐观更新
      setSavedWords((prev) => {
        const next = new Set(prev);
        if (wasSaved) next.add(word); else next.delete(word);
        return next;
      });
      feedbackError(t('reading.save_failed', lang));
    }
  };

  const handleQuizAnswer = (q: ArticleQuestion, idx: number, answer: string) => {
    // 已答过直接返回：disabled/quizAnswers 是异步 state 挡不住同帧双击，
    // 用 ref 做同步锁，否则 quizCorrect 会重复 +1 导致得分虚高甚至超 100
    if (quizAnsweredRef.current.has(q.id)) return;
    quizAnsweredRef.current.add(q.id);
    setQuizAnswers((prev) => ({ ...prev, [q.id]: answer }));
    if (answer === (q.options?.[q.answer] ?? '')) setQuizCorrect((prev) => prev + 1);
    setQuizRevealed((prev) => ({ ...prev, [q.id]: true }));
    // 累积式：答完当前解锁的最后一题就解锁下一题，让它出现在下方
    if (idx === quizIdx) setQuizIdx((prev) => Math.min(prev + 1, article.questions.length - 1));
    db.articleLearningEvents.put({
      id: crypto.randomUUID(), articleId: article.id,
      action: 'answer_question', payload: { questionId: q.id, answer, correct: answer === (q.options?.[q.answer] ?? '') },
      createdAt: Date.now(),
    }).catch((e) => { console.error('ArticleReader: log answer_question failed', e); });
  };

  const handleOutputSubmit = async () => {
    const text = outputValue.trim();
    if (!text || outputScoring) return;
    setOutputScoring(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    let retriable = false; // 401/429：不锁定完成态，允许登录/次日后重试
    try {
      const res = await fetch('/api/ai/writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, topic: article.outputTask?.template ?? article.title }),
        signal: controller.signal,
      });
      if (res.ok) {
        const data = await res.json();
        // 校验批改结构：scores 缺失则视为畸形，不设 feedback，走「未能批改」兜底
        if (data && data.scores && typeof data.scores.overall === 'number') {
          setOutputFeedback(data);
        }
      } else if (res.status === 401) {
        retriable = true;
        feedbackComplete(t('reading.ai_login_required', lang));
      } else if (res.status === 429) {
        retriable = true;
        feedbackComplete(t('reading.ai_quota_used', lang));
      }
      // 其余失败：不设 feedback，UI 走「未能批改」兜底
    } catch {
      // 超时/网络失败：静默走兜底，不挡流程
      if (!retriable) setOutputDone(true);
    } finally {
      clearTimeout(timeoutId);
      setOutputScoring(false);
      if (!retriable) setOutputDone(true);
    }
    if (retriable) return; // 未真正提交，不记埋点
    db.articleLearningEvents.put({
      id: crypto.randomUUID(), articleId: article.id,
      action: 'complete_output', payload: { answer: text },
      createdAt: Date.now(),
    }).catch((e) => { console.error('ArticleReader: log complete_output failed', e); });
  };

  const handleSaveExpression = async () => {
    const expr = outputFeedback?.saveExpression;
    if (!expr || exprSaved || !user) return;
    try {
      await db.sentences.add({
        id: crypto.randomUUID(),
        userId: user.id,
        korean: expr.split('—')[0]?.trim() || expr,
        chinese: expr.split('—')[1]?.trim() || '',
        source_type: 'reading',
        source_id: article.id,
        source_title: article.title,
        created_at: Date.now(),
      });
      setExprSaved(true);
      feedbackComplete(t('reading.saved_to_wordbook', lang));
    } catch { feedbackComplete(t('reading.save_failed', lang)); }
  };

  const handleComplete = async () => {
    if (completedRef.current) { setStep('settlement'); return; } // 已成功完成过 → 直接进结算，不重复发 XP
    try {
      const now = Date.now();
      const score = article.questions.length > 0
        ? Math.round((quizCorrect / article.questions.length) * 100) : 0;
      const outputScore = outputFeedback?.scores?.overall;
      await db.userArticleProgress.update(article.id, {
        status: 'completed', quizScore: score,
        outputAnswer: outputValue || undefined,
        outputScore,
        completedAt: now, updatedAt: now,
      });
      await db.articleLearningEvents.put({
        id: crypto.randomUUID(), articleId: article.id,
        action: 'complete_article', payload: { quizScore: score },
        createdAt: now,
      });
      // 落库成功才锁定，防落库失败后 ref 锁死无法重试（原来先置位再落库=失败即假完成）
      completedRef.current = true;
      incrementTodayLog('articlesRead').catch((e) => { console.error('ArticleReader: incrementTodayLog failed', e); });
      // XP：难度基础分 × 表现系数(保底 50%) + output 加成
      const BASE: Record<string, number> = { A1: 8, A2: 10, B1: 12, B2: 14, C1: 16, C2: 18 };
      const base = BASE[article.level] ?? 10;
      const perf = article.questions.length > 0 ? quizCorrect / article.questions.length : 1;
      const outputBonus = outputFeedback ? (outputFeedback.isCorrect ? 4 : 2) : 0;
      const xp = Math.round(base * (0.5 + 0.5 * perf)) + outputBonus;
      setFinalXp(xp);
      awardXp(xp);
      // 真实学习时长（封顶预估×3 防挂机）
      const realMin = Math.round((now - enterTimeRef.current) / 60000);
      addStudyMinutes(Math.max(1, Math.min(realMin, article.estimatedMinutes * 3)));
    } catch {
      // 落库失败：不锁 ref、不进结算，提示用户重试「完成」
      feedbackComplete(t('reading.score_unavailable', lang));
      return;
    }
    feedbackComplete(t('reading.reading_complete_toast', lang));
    setStep('settlement');
  };

  // 线性流程的有效步骤顺序（跳过当前文章没有数据的 key_sentence / output）
  const flowSteps: Step[] = (() => {
    const all: Step[] = ['goals', 'vocab', 'reading', 'key_sentence', 'quiz', 'output', 'settlement'];
    return all.filter((s) => {
      if (s === 'key_sentence' && !article.keySentence) return false;
      if (s === 'output' && !article.outputTask) return false;
      return true;
    });
  })();

  // 顶部返回键：逐级退回上一步；已在第一步(goals)或结算页则退出到文章列表
  const handleBack = () => {
    if (step === 'goals' || step === 'settlement') {
      backToList();
      return;
    }
    const idx = flowSteps.indexOf(step);
    const prev = idx > 0 ? flowSteps[idx - 1] : 'goals';
    setStep(prev);
  };

  const total = article.sentences.length;
  const readCount = revealedZh.size;

  return (
    <div className={`lib-scope lib-reader${dark ? ' lib-dark' : ''}`}>
      {/* 主题切换 */}
      <div className={`lib-theme-toggle${drawerOpen ? ' drawer-open' : ''}`}>
        <button className={`lib-theme-btn${!dark ? ' active' : ''}`} onClick={() => { setDark(false); document.documentElement.setAttribute('data-theme', 'light'); }}><Sun size={13} /> 밝게</button>
        <button className={`lib-theme-btn${dark ? ' active' : ''}`} onClick={() => { setDark(true); document.documentElement.setAttribute('data-theme', 'dark'); }}><Moon size={13} /> 어둡게</button>
      </div>
      <div className="lib-shell">
        <LibrarySidebar
          articles={allArticles}
          progress={progressMap}
          topics={TOPIC_META}
          currentArticleId={article.id}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
        <div className="lib-reader-main py-4 space-y-4 max-w-2xl mx-auto lg:max-w-none px-4 lg:px-8 w-full">
      {sentenceToast && (
        <div style={{ position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)', background: '#201815', color: '#fff', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 700, zIndex: 200, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
          {t('reading.saved_sentence', lang)}
          <a href="/vocabulary?tab=sentences" style={{ color: 'var(--color-mint-soft)', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>{t('reading.view_arrow', lang)}</a>
        </div>
      )}
      {/* Top bar */}
      <div className="lib-topbar-row flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="lib-menu-btn" onClick={() => setDrawerOpen(true)} aria-label={t('reading.menu', lang)}><Menu size={17} /></button>
          <button onClick={handleBack} className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={16} /> {step === 'goals' || step === 'settlement' ? t('reading.article_list', lang) : t('reading.prev_step', lang)}
          </button>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[article.level]}`}>
          {levelLabel[article.level]} · {t('reading.n_minutes', lang, { n: article.estimatedMinutes })}
        </span>
      </div>

      {/* Step progress */}
      <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
        <div className="bg-[var(--mint-soft)] h-1.5 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
      </div>

      {/* ── Step: Goals ── */}
      {step === 'goals' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[var(--mint-soft)]/10 flex items-center justify-center text-3xl">
                {article.emoji}
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">{article.title}</h1>
                <p className="text-sm text-[var(--text-muted)]">{article.titleKo}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                <Target size={14} className="text-[var(--mint-soft)]" />
                {t('reading.goals_intro', lang)}
              </p>
              {article.learningGoals.map((g, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-input)] rounded-xl p-3">
                  <span className="w-6 h-6 rounded-lg bg-[var(--mint-soft)]/15 text-[var(--mint-soft)] flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  {g}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep('vocab')}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-colors transition-opacity transition-shadow"
          >
            {t('reading.start_vocab', lang)} <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* ── Step: Vocab ── */}
      {step === 'vocab' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
            <p className="text-sm font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
              <BookOpen size={16} className="text-[var(--mint-soft)]" />
              {t('reading.core_vocab_title', lang)}
            </p>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              {t('reading.core_vocab_hint', lang, { n: article.coreWords.length })}
            </p>

            <div className="vocab-preview-grid">
              {article.coreWords.map((w) => (
                <div key={w.word} className="vocab-preview-card">
                  {/* 词头：喇叭 + 韩语大字 + 罗马音 + 释义 + 收藏 */}
                  <div className="vocab-preview-head">
                    <button
                      onClick={() => { cancelSpeech(); setSpeakingId(`vocab-${w.word}`); speakWord(w.word).finally(() => setSpeakingId(null)); }}
                      className={`vocab-preview-speak ${speakingId === `vocab-${w.word}` ? 'active' : ''}`}
                      aria-label={t('reading.speak_word', lang)}
                    >
                      <Volume2 size={17} />
                    </button>
                    <div className="vocab-preview-word-box">
                      <div className="vocab-preview-word-line">
                        <span
                          className="word-lookup vocab-preview-word"
                          onClick={(e) => { e.stopPropagation(); setSelectedWord(null); setAiLookupWord(stripParticle(w.word)); }}
                        >
                          {w.word}
                        </span>
                        {w.pronunciation && <span className="vocab-preview-roman">[{w.pronunciation}]</span>}
                      </div>
                      <p className="vocab-preview-meaning">{w.meaning}</p>
                    </div>
                    <button
                      onClick={() => toggleSaveWord(w.word)}
                      className={`vocab-preview-save ${savedWords.has(w.word) ? 'saved' : ''}`}
                      aria-label={t('reading.add_to_wordbook', lang)}
                    >
                      <Bookmark size={16} fill={savedWords.has(w.word) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  {/* 例句卡 */}
                  {w.examples && w.examples.length > 0 && (
                    <div className="vocab-preview-examples">
                      {w.examples.map((ex, ei) => (
                        <div key={ei} className="vocab-preview-ex">
                          <button
                            onClick={() => { cancelSpeech(); setSpeakingId(`vocab-ex-${w.word}-${ei}`); speakWord(ex.ko).finally(() => setSpeakingId(null)); }}
                            className={`vocab-preview-ex-speak ${speakingId === `vocab-ex-${w.word}-${ei}` ? 'active' : ''}`}
                            aria-label={t('reading.speak_example', lang)}
                          >
                            <Volume2 size={13} />
                          </button>
                          <div className="vocab-preview-ex-text">
                            <p className="vocab-preview-ex-ko">{renderTappableExample(ex.ko)}</p>
                            <p className="vocab-preview-ex-zh">{ex.zh}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setStep('goals')} className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl font-medium text-sm">
              {t('reading.back', lang)}
            </button>
            <button
              onClick={() => setStep('reading')}
              className="flex-[2] flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
            >
              {t('reading.start_reading', lang)} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step: Reading ── */}
      {step === 'reading' && (
        <div className="animate-fade-in space-y-4">
          {/* Progress bar */}
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <div className="flex-1 bg-[var(--bg-input)] rounded-full h-1.5" role="progressbar" aria-valuenow={total > 0 ? Math.round((readCount / total) * 100) : 0} aria-valuemin={0} aria-valuemax={100}>
              <div className="bg-[var(--mint-soft)] h-1.5 rounded-full transition-all"
                style={{ width: `${total > 0 ? (readCount / total) * 100 : 0}%` }} />
            </div>
            <span className="shrink-0 tabular-nums">{t('reading.understood_count', lang, { n: readCount, m: total })}</span>
          </div>

          {/* 全文听力：有预录音频用真人女声 mp3 + 时间戳高亮，否则回落逐句 TTS */}
          {article.audioUrl ? (
            <div className="lib-audio-bar">
              <audio
                ref={audioRef}
                src={article.audioUrl}
                preload="metadata"
                onTimeUpdate={onAudioTime}
                onLoadedMetadata={(e) => setAudioDur((e.target as HTMLAudioElement).duration || 0)}
                onPlay={() => setAudioPlaying(true)}
                onPause={() => setAudioPlaying(false)}
                onEnded={() => { setAudioPlaying(false); setActiveHighlight(null); }}
              />
              <button className="lib-audio-play" onClick={toggleFullAudio} aria-label={audioPlaying ? t('reading.pause', lang) : t('reading.play', lang)}>
                {audioPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>
              <div className="lib-audio-mid">
                <div className="lib-audio-label">
                  <Headphones size={13} /> {t('reading.full_audio_zh', lang)} · 여우 목소리
                </div>
                <div className="lib-audio-track" onClick={seekAudio}>
                  <div className="lib-audio-fill" style={{ width: `${audioDur > 0 ? (audioCur / audioDur) * 100 : 0}%` }} />
                </div>
              </div>
              <span className="lib-audio-time tabular-nums">{fmtTime(audioCur)} / {fmtTime(audioDur || article.audioTimings?.[article.audioTimings.length - 1]?.end || 0)}</span>
              <div className="lib-audio-speed-wrap">
                <button className={`lib-audio-speed${audioSpeed !== 1 ? ' active' : ''}`} onClick={() => setSpeedMenuOpen((v) => !v)} aria-label={t('reading.speed', lang)}>
                  <Gauge size={13} /> {audioSpeed}x
                </button>
                {speedMenuOpen && (
                  <div className="lib-audio-speed-menu">
                    {AUDIO_SPEEDS.map((s) => (
                      <button key={s} className={`lib-audio-speed-opt${audioSpeed === s ? ' active' : ''}`} onClick={() => setAudioSpeedAndApply(s)}>
                        {s}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={playAll}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-colors ${
                playingAll
                  ? 'bg-[var(--mint-soft)]/15 border border-[var(--mint-soft)]/40 text-[var(--mint-soft)]'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--mint-soft)]/40'
              }`}
            >
              {playingAll ? <><Square size={15} fill="currentColor" /> {t('reading.stop_playback', lang)}</> : <><Headphones size={16} /> {t('reading.full_audio_continuous', lang)}</>}
            </button>
          )}

          {/* 三栏：中间(原文+逐句拆解) + 右栏(进度环/生词/相关) */}
          <div className="lib-read-3col">

            {/* ── 中间列：原文 + 逐句拆解（拆解在原文下方） ── */}
            <div className="lib-read-body space-y-4">
              {/* 原文卡片 */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
                {/* 文章头 */}
                <div className="px-5 pt-5 pb-4 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl">{article.emoji}</span>
                    <div>
                      <h2 className="text-base font-bold text-[var(--text-primary)] leading-tight">{article.title}</h2>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{article.titleKo}</p>
                    </div>
                  </div>
                </div>
                {/* 翻译总开关 + 批注开关 */}
                <div className="px-5 pt-4 flex items-center justify-end gap-2">
                  <button
                    onClick={() => { setAnnotateMode((v) => !v); setEraser(false); }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      annotateMode
                        ? 'bg-[var(--peach-soft)] text-white'
                        : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                    aria-pressed={annotateMode}
                  >
                    <PenLine size={13} /> {t('reading.annotate', lang)}
                  </button>
                  <button
                    onClick={() => setShowParaTrans((v) => !v)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      showParaTrans
                        ? 'bg-[var(--mint-soft)] text-white'
                        : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Languages size={13} /> {t(showParaTrans ? 'reading.hide_translation' : 'reading.show_translation', lang)}
                  </button>
                </div>
                {/* 正文：流式杂志排版（17px / 1.85），点词查释义、点句展译文。批注模式叠 canvas 层 */}
                <div ref={annBoxRef} style={{ position: 'relative' }}>
                <div className="lib-article-content">
                  {splitParagraphs(article.sentences).map((para, pi) => (
                    <div key={pi}>
                      <p>
                        {para.map((s) => (
                          <span
                            key={s.id}
                            className={`lib-sentence${activeHighlight === s.id ? ' active' : ''}`}
                            onClick={() => handleFullTextClick(s.id)}
                          >
                            {renderInlineWords(s)}
                            {' '}
                          </span>
                        ))}
                      </p>
                      {showParaTrans && (
                        <p className="text-sm text-[var(--text-secondary)] bg-[var(--bg-input)] rounded-lg px-3 py-2 animate-fade-in" style={{ marginTop: 12 }}>
                          {para.map((s) => s.zh).join('')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                  <AnnotationLayer
                    containerRef={annBoxRef}
                    active={annotateMode}
                    dark={dark}
                    strokes={annStrokes}
                    onChange={handleAnnChange}
                    penColor={penColor}
                    setPenColor={setPenColor}
                    eraser={eraser}
                    setEraser={setEraser}
                  />
                </div>
                {/* 正文提示 */}
                <div className="px-5 pb-4 flex items-center gap-1.5">
                  <Lightbulb size={12} className="text-[var(--peach-soft)] shrink-0" />
                  <p className="text-[11px] text-[var(--text-muted)]">{annotateMode ? t('reading.annotate_hint', lang) : t('reading.body_hint', lang)}</p>
                </div>
              </div>

              {/* ── 逐句拆解（原文下方） ── */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2">
                  <BookOpen size={14} className="text-[var(--mint-soft)]" />
                  <span className="text-sm font-bold text-[var(--text-primary)]">{t('reading.sentence_breakdown', lang)}</span>
                  <span className="text-xs text-[var(--text-muted)] ml-auto">{t('reading.breakdown_hint', lang)}</span>
                </div>
                <div className="divide-y divide-[var(--border-color)]">
                  {article.sentences.map((s, idx) => (
                    <div
                      key={s.id}
                      style={{
                        borderLeft: revealedZh.has(s.id) ? '3px solid var(--mint-soft)' : '3px solid transparent',
                        transition: 'border-color 0.2s',
                        contentVisibility: 'auto',
                      }}
                    >
                      {/* 句子行 */}
                      <div className="flex items-center gap-2 px-4 py-3">
                        <span style={{
                          width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                          background: revealedZh.has(s.id) ? 'var(--mint-soft)' : 'var(--bg-input)',
                          color: revealedZh.has(s.id) ? '#fff' : 'var(--text-muted)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 10, fontWeight: 700, transition: 'all 0.2s',
                        }}>
                          {idx + 1}
                        </span>
                        <div
                          onClick={() => toggleRevealZh(s.id)}
                          className="flex-1 min-w-0 break-words text-left text-base leading-relaxed text-[var(--text-primary)] cursor-pointer"
                        >
                          {revealedZh.has(s.id) ? (
                            <span>
                              {s.ko.split(/(\s+)/).map((token, i) => {
                                if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
                                const wordInfo = s.words.find(w => {
                                  if (token.length / w.word.length > 1.8) return false;
                                  if (token.startsWith(w.word)) return true;
                                  if (w.word.endsWith('다')) return token.startsWith(w.word.slice(0, -1));
                                  return false;
                                });
                                if (wordInfo) {
                                  return (
                                    <span
                                      key={i}
                                      onClick={(e) => { e.stopPropagation(); setAiLookupWord(null); setSelectedWord(wordInfo); }}
                                      className="cursor-pointer hover:bg-[var(--mint-soft)]/10 rounded-sm transition-colors"
                                      style={{
                                        borderBottom: savedWords.has(wordInfo.word) ? '2px solid var(--peach-soft)' : '1px dashed var(--border-color)',
                                      }}
                                    >
                                      {token}
                                    </span>
                                  );
                                }
                                const cleaned = token.replace(/[。？！，,.?!、…·"'"'()（）\[\]]+$/g, '').replace(/^[「『"'"']+/g, '').trim();
                                if (!cleaned) return <span key={i}>{token}</span>;
                                return (
                                  <span
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); setSelectedWord(null); setAiLookupWord(cleaned); }}
                                    className="cursor-pointer hover:bg-[var(--mint-soft)]/10 rounded-sm transition-colors"
                                    style={{ borderBottom: '1px dotted var(--border-color)' }}
                                  >
                                    {token}
                                  </span>
                                );
                              })}
                            </span>
                          ) : (
                            <span>
                              {s.ko.split(/(\s+)/).map((token, i) => {
                                if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
                                const cleaned = token.replace(/[。？！，,.?!、…·"'"'()（）\[\]]+$/g, '').replace(/^[「『"'"']+/g, '').trim();
                                if (!cleaned) return <span key={i}>{token}</span>;
                                return (
                                  <span
                                    key={i}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (!revealedZh.has(s.id)) toggleRevealZh(s.id);
                                      setSelectedWord(null);
                                      setAiLookupWord(cleaned);
                                    }}
                                    className="cursor-pointer hover:bg-[var(--mint-soft)]/10 rounded-sm transition-colors"
                                  >
                                    {token}
                                  </span>
                                );
                              })}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-0.5 shrink-0">
                          <button
                            onClick={() => speakSentence(s.id, s.ko)}
                            aria-label={t('reading.speak_sentence', lang)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              speakingId === s.id ? 'text-[var(--mint-soft)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                            }`}
                          >
                            <Volume2 size={13} />
                          </button>
                          <button
                            onClick={() => toggleSaveSentence(s.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              savedSentences.has(s.id) ? 'text-[var(--peach-soft)]' : 'text-[var(--text-muted)] hover:text-[var(--peach-soft)]'
                            }`}
                          >
                            <Bookmark size={13} fill={savedSentences.has(s.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>

                      {/* 展开：中文译文 + 罗马音 + AI 语法解析（闪卡同款四段式：主干/助词/词尾/易错点） */}
                      {revealedZh.has(s.id) && (
                        <div className="px-4 pb-2 pl-10 space-y-1.5 animate-fade-in">
                          <p className="text-sm text-[var(--text-secondary)] bg-[var(--bg-input)] rounded-lg px-3 py-1.5">
                            {s.zh}
                          </p>
                          {s.pronunciation && (
                            <p className="text-xs text-[var(--text-muted)] font-mono">[{s.pronunciation}]</p>
                          )}
                          <div onClick={(e) => e.stopPropagation()} className="flex items-start flex-wrap gap-2">
                            <GrammarExplainBubble sentence={s.ko} translation={s.zh} variant="compact" />
                            <button
                              onClick={() => setShadowIdx(idx)}
                              style={{ marginTop: 8 }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/40 text-[var(--mint-soft)] hover:bg-[var(--mint-soft)]/20 transition-colors"
                            >
                              <Mic size={13} /> {t('reading.shadow_score', lang)}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 右栏：읽기 진행 + 이 글에서 만난 단어 + 같은 주제 ── */}
            <aside className="lib-rightpanel">
              {/* 진행 진度环 */}
              {(() => {
                const total = article.sentences.length;
                const read = revealedZh.size;
                const pct = total > 0 ? Math.round((read / total) * 100) : 0;
                const R = 30, C = 2 * Math.PI * R;
                const remainMin = Math.max(0, Math.round(article.estimatedMinutes * (1 - pct / 100)));
                return (
                  <div className="rp-card">
                    <div className="rp-title"><BookOpen size={13} /> 읽기 진행 · {t('reading.progress_zh', lang)}</div>
                    <div className="rp-ring-wrap">
                      <div className="rp-ring">
                        <svg width="72" height="72" viewBox="0 0 72 72">
                          <circle className="rp-ring-track" cx="36" cy="36" r={R} fill="none" strokeWidth="6" />
                          <circle className="rp-ring-fill" cx="36" cy="36" r={R} fill="none" strokeWidth="6"
                            strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} />
                        </svg>
                        <div className="rp-ring-num">{pct}%</div>
                      </div>
                      <div className="rp-ring-meta">
                        약 <b>{remainMin}분</b> 남음<br />
                        {total}문장 중 <b>{read}</b>문장 읽음
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* 이 글에서 만난 단어：本文核心词（点词查词，喇叭朗读） */}
              {article.coreWords.length > 0 && (
                <div className="rp-card">
                  <div className="rp-title"><Bookmark size={13} /> 이 글에서 만난 단어</div>
                  <p className="rp-vocab-hint">{t('reading.vocab_panel_hint', lang)}</p>
                  <div className="rp-vocab">
                    {article.coreWords.map((w, i) => {
                      const hasEx = !!w.examples && w.examples.length > 0;
                      const open = expandedVocab.has(w.word);
                      return (
                      <div key={`${w.word}-${i}`} className="rp-vocab-wrap">
                        <div className="rp-vocab-item"
                          onClick={() => { setSelectedWord(null); setAiLookupWord(stripParticle(w.word)); }}>
                          <span className="rp-vocab-ko">{w.word}</span>
                          <span className="rp-vocab-zh">{w.meaning}</span>
                          {hasEx && (
                            <button
                              className={`rp-vocab-ex-toggle${open ? ' open' : ''}`}
                              onClick={(e) => { e.stopPropagation(); setExpandedVocab((prev) => { const n = new Set(prev); if (n.has(w.word)) n.delete(w.word); else n.add(w.word); return n; }); }}
                              aria-label={t('reading.example', lang)}
                            >
                              {t('reading.example_short', lang)}
                            </button>
                          )}
                          <button
                            className="rp-vocab-speak"
                            onClick={(e) => { e.stopPropagation(); speakWord(w.word); }}
                            aria-label={t('reading.speak', lang)}
                          >
                            <Volume2 size={13} />
                          </button>
                        </div>
                        {hasEx && open && (
                          <div className="rp-vocab-examples">
                            {w.examples!.map((ex, ei) => (
                              <div key={ei} className="rp-vocab-ex">
                                <button
                                  className="rp-vocab-ex-speak"
                                  onClick={(e) => { e.stopPropagation(); speakWord(ex.ko); }}
                                  aria-label={t('reading.speak_example', lang)}
                                >
                                  <Volume2 size={11} />
                                </button>
                                <div className="rp-vocab-ex-body">
                                  <span className="rp-vocab-ex-ko">{ex.ko}</span>
                                  <span className="rp-vocab-ex-zh">{ex.zh}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 같은 주제 相关文章 */}
              {(() => {
                const related = allArticles
                  .filter((a) => a.id !== article.id && (a.topic === article.topic || a.level === article.level))
                  .slice(0, 3);
                if (related.length === 0) return null;
                return (
                  <div className="rp-card">
                    <div className="rp-title"><BookOpen size={13} /> 같은 주제 · {t('reading.related_zh', lang)}</div>
                    {related.map((a) => (
                      <div key={a.id} className="rp-related-item" onClick={() => router.push(`/reading/${a.id}`)}>
                        <div className="rp-related-emoji">{a.emoji}</div>
                        <div className="rp-related-body">
                          <div className="rp-related-title">{a.title}</div>
                          <div className="rp-related-meta">{levelLabel[a.level]} · {a.estimatedMinutes}분</div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </aside>
          </div>

          {/* 导航按钮（与中间阅读列对齐，不横跨右栏） */}
          <div className="flex gap-2 lib-read-nav">
            <button onClick={() => {
                if (revealedZh.size > 0) {
                  db.userArticleProgress.update(article.id, {
                    readSentenceIds: [...revealedZh],
                    updatedAt: Date.now(),
                  }).catch((e) => { console.error('ArticleReader: update progress (back_to_vocab) failed', e); });
                }
                setStep('vocab');
              }} className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl font-medium text-sm">
              {t('reading.back_to_vocab', lang)}
            </button>
            <button
              onClick={() => {
                if (revealedZh.size > 0) {
                  db.userArticleProgress.update(article.id, {
                    readSentenceIds: [...revealedZh],
                    updatedAt: Date.now(),
                  }).catch((e) => { console.error('ArticleReader: update progress (continue) failed', e); });
                }
                // 故事无重点句型（轻流），直接进测验，不显示空的重点句型页
                setStep(article.keySentence ? 'key_sentence' : 'quiz');
              }}
              className="flex-[2] flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
            >
              {article.keySentence ? t('reading.see_key_patterns', lang) : t('reading.continue_quiz', lang)} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step: Key Sentence ── auto-skip if no data */}
      {step === 'key_sentence' && !article.keySentence && (
        <div className="py-8 text-center">
          <p className="text-sm text-[var(--text-muted)] mb-4">{t('reading.no_key_pattern', lang)}</p>
          <button
            onClick={() => setStep('quiz')}
            className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
          >
            {t('reading.continue_quiz', lang)} <ChevronRight size={18} />
          </button>
        </div>
      )}
      {step === 'key_sentence' && article.keySentence && (
        <div className="space-y-4">
          {/* 卡片0：本课重点句 */}
          <div
            className="bg-[var(--bg-card)] border-2 border-[var(--mint-soft)]/25 rounded-2xl p-5 animate-fade-in"
            style={{ animationFillMode: 'backwards' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Star size={18} className="text-[var(--peach-soft)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">{t('reading.key_sentence_title', lang)}</span>
            </div>
            <p className="text-xl font-bold text-[var(--text-primary)] leading-relaxed" style={{ fontFamily: "'Pretendard', sans-serif" }}>
              {article.keySentence.ko}
            </p>
            <p className="text-sm text-[var(--text-secondary)] mt-2">{article.keySentence.zh}</p>
            <button
              onClick={() => speakSentence('key', article.keySentence!.ko)}
              className={`mt-3 flex items-center gap-2 text-sm transition-colors ${
                speakingId === 'key' ? 'text-[var(--mint-soft)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Volume2 size={16} />
              {speakingId === 'key' ? t('reading.playing', lang) : t('reading.speak_sentence', lang)}
            </button>
          </div>

          {/* 卡片1：句型精讲（原 grammarNote） */}
          <div
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 animate-fade-in"
            style={{ animationDelay: '0.06s', animationFillMode: 'backwards' }}
          >
            <p className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5 mb-2">
              <Lightbulb size={15} className="text-[var(--peach-soft)]" /> {t('reading.pattern_detail', lang)}
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {article.keySentence.grammarNote}
            </p>
          </div>

          {/* 卡片2...N：本文用到的语法点 —— 一张张揭示，不一次全出，减轻阅读压力 */}
          {(() => {
            if (grammarCards.length === 0) return null;
            const shown = Math.min(revealedPoints, grammarCards.length);
            const hasMore = shown < grammarCards.length;
            return (
              <>
                <p
                  className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1.5 pt-1 animate-fade-in"
                  style={{ animationDelay: '0.12s', animationFillMode: 'backwards' }}
                >
                  <Puzzle size={13} className="text-[var(--mint-soft)]" /> {t('reading.grammar_points', lang, { n: shown, m: grammarCards.length })}
                </p>
                {grammarCards.slice(0, shown).map((card) => (
                  <GrammarPointCard key={card.id} card={card} lang={lang} onSpeak={(txt) => speak(txt)} />
                ))}
                {hasMore && (
                  <button
                    onClick={() => setRevealedPoints((n) => n + 1)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm border border-dashed border-[var(--mint-soft)]/50 text-[var(--mint-soft)] bg-[var(--mint-soft)]/5 hover:bg-[var(--mint-soft)]/12 transition-colors"
                  >
                    {t('reading.expand_next_point', lang, { n: grammarCards.length - shown })} <ChevronRight size={16} />
                  </button>
                )}
              </>
            );
          })()}

          <div className="flex gap-2 pt-1">
            <button onClick={() => setStep('reading')} className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl font-medium text-sm">
              {t('reading.back_to_reading', lang)}
            </button>
            <button
              onClick={() => setStep('quiz')}
              className="flex-[2] flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
            >
              {t('reading.do_quiz', lang)} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step: Quiz ── */}
      {step === 'quiz' && article.questions.length === 0 && (
        <div className="py-8 text-center space-y-4 animate-fade-in">
          <p className="text-sm text-[var(--text-muted)]">{t('reading.no_quiz', lang)}</p>
          <button
            onClick={() => setStep('output')}
            className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
          >
            {t('reading.continue_output', lang)} <ChevronRight size={18} />
          </button>
        </div>
      )}
      {step === 'quiz' && article.questions.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between text-sm">
            <button onClick={handleBack} className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <ArrowLeft size={15} /> {t('reading.prev_step', lang)}
            </button>
            <span className="font-bold text-[var(--text-primary)]">{t('reading.quiz_title', lang)}</span>
            <span className="text-[var(--text-muted)]">{Object.keys(quizAnswers).length}/{article.questions.length}</span>
          </div>

          <div className="w-full bg-[var(--bg-input)] rounded-full h-1">
            <div className="bg-[var(--mint-soft)] h-1 rounded-full transition-all"
              style={{ width: `${(Object.keys(quizAnswers).length / article.questions.length) * 100}%` }} />
          </div>

          {article.questions.map((q, i) => (
            <div key={q.id} className={i <= quizIdx ? 'animate-fade-in' : 'hidden'}>
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-4">
                <div className="space-y-1.5">
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">
                    {q.type === 'main_idea' ? t('reading.q_main_idea', lang) : q.type === 'vocab' ? t('reading.q_vocab', lang) : q.type === 'grammar' ? t('reading.q_grammar', lang) : t('reading.q_detail', lang)}
                  </span>
                  <p className="text-[15px] font-bold text-[var(--text-primary)] leading-relaxed whitespace-pre-line" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>{q.prompt}</p>
                  {q.promptZh && (
                    quizTransShown[q.id] ? (
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed whitespace-pre-line">{q.promptZh}</p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setQuizTransShown((s) => ({ ...s, [q.id]: true }))}
                        className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--mint-soft)] transition-colors"
                      >
                        <Languages size={12} /> {t('reading.show_translation', lang)}
                      </button>
                    )
                  )}
                </div>

                <div className="space-y-2">
                  {q.options?.map((opt) => {
                    const isAnswered = quizAnswers[q.id];
                    const isSelected = isAnswered === opt;
                    const isCorrect = opt === (q.options?.[q.answer] ?? '');
                    let btnClass = 'bg-[var(--bg-input)] border border-[var(--border-color)] hover:border-[var(--border-hover)]';
                    if (isAnswered && quizRevealed[q.id]) {
                      if (isCorrect) btnClass = 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
                      else if (isSelected) btnClass = 'bg-red-500/10 border-red-500/50 text-red-500';
                      else btnClass = 'bg-[var(--bg-input)] border-[var(--border-color)] opacity-50';
                    }
                    return (
                      <button
                        key={opt}
                        onClick={() => { if (!quizAnswers[q.id]) handleQuizAnswer(q, i, opt); }}
                        disabled={!!quizAnswers[q.id]}
                        className={`w-full p-3.5 rounded-xl text-left text-sm transition-all ${btnClass} flex items-center justify-between`}
                      >
                        <span style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>{opt}</span>
                        {isAnswered && quizRevealed[q.id] && isCorrect && <Check size={16} className="text-[var(--mint-soft)]" />}
                        {isAnswered && quizRevealed[q.id] && isSelected && !isCorrect && <X size={16} className="text-red-500" />}
                      </button>
                    );
                  })}
                </div>

                {quizAnswers[q.id] && quizRevealed[q.id] && q.explanation && (
                  <div className="bg-[var(--bg-input)] rounded-xl p-3 animate-fade-in">
                    <p className="text-xs text-[var(--text-muted)] mb-0.5">{t('reading.explanation', lang)}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{q.explanation}</p>
                  </div>
                )}
              </div>

              {i === article.questions.length - 1 && quizAnswers[q.id] && quizRevealed[q.id] && (
                <button
                  onClick={() => setStep('output')}
                  className="w-full mt-3 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
                >
                  {t('reading.enter_output', lang)}
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Step: Output ── auto-skip if no data */}
      {step === 'output' && !article.outputTask && (
        <div className="py-8 text-center">
          <p className="text-sm text-[var(--text-muted)] mb-4">{t('reading.no_output', lang)}</p>
          <button
            onClick={handleComplete}
            className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
          >
            {t('reading.complete_reading', lang)} <Trophy size={18} />
          </button>
        </div>
      )}
      {step === 'output' && article.outputTask && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[var(--peach-soft)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">{t('reading.output_title', lang)}</span>
            </div>

            <p className="text-sm text-[var(--text-secondary)]">
              {t('reading.output_intro', lang)}
            </p>

            <div className="bg-[var(--bg-input)] rounded-xl p-4">
              <p className="text-sm text-[var(--text-muted)] mb-3">{t('reading.pattern_template', lang)}</p>
              <div className="flex items-start gap-2 mb-3">
                <p className="text-lg font-bold text-[var(--text-primary)] flex-1">{article.outputTask.template}</p>
                <button
                  onClick={() => speakWord(article.outputTask!.template)}
                  aria-label={t('reading.speak_example', lang)}
                  className="shrink-0 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                >
                  <Volume2 size={16} />
                </button>
              </div>
              {article.outputTask.example && (
                <p className="text-xs text-[var(--text-muted)] mb-3 flex items-center gap-1.5">
                  <span>{t('reading.example_prefix', lang)}{article.outputTask.example}</span>
                  <button
                    onClick={() => speakWord(article.outputTask!.example!)}
                    aria-label={t('reading.speak_example', lang)}
                    className="shrink-0 p-1 rounded text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                  >
                    <Volume2 size={13} />
                  </button>
                </p>
              )}

              {article.outputTask.slots && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.outputTask.slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setOutputValue((prev) => {
                        // 已有内容且切换的是不同 slot：不覆盖，避免用户已写的丢失
                        const filled = resolveParticle(article.outputTask!.template, slot);
                        if (!prev) return filled;
                        // 已包含当前 slot 语义 → 清空以便再选
                        if (prev.includes(slot)) return '';
                        // 已有其它内容 → 保留不动，用户需手动清空
                        return prev;
                      })}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        outputValue.includes(slot)
                          ? 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]'
                          : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}

              <input
                type="text"
                value={outputValue}
                onChange={(e) => setOutputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !outputDone) handleOutputSubmit(); }}
                onFocus={(e) => { if (outputScrollTimer.current) clearTimeout(outputScrollTimer.current); outputScrollTimer.current = setTimeout(() => { if (mountedRef.current) e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 300); }}
                placeholder={t('reading.output_placeholder', lang)}
                className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--mint-soft)]/50"
              />
              {isDesktop && !outputDone && (
                <button
                  onClick={() => setShowKeyboard(v => !v)}
                  className="mt-2 mx-auto flex items-center gap-1.5 h-9 px-3.5 rounded-xl text-[13px] font-medium bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                >
                  <Keyboard size={14} /> {t('keyboard.toggle', lang)}
                </button>
              )}
            </div>

            {outputDone && outputFeedback && (
              <div className="space-y-3 animate-fade-in">
                {/* 评分 */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--mint-soft)]/25 to-[var(--purple-soft)]/25 border border-[var(--mint-soft)]/30 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-[var(--text-primary)] leading-none">{outputFeedback.scores.overall}</span>
                    <span className="text-[9px] text-[var(--text-muted)] mt-0.5">{t('reading.score_overall', lang)}</span>
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-2 text-center">
                    {([['reading.score_vocab', outputFeedback.scores.vocabulary], ['reading.score_grammar', outputFeedback.scores.grammar], ['reading.score_natural', outputFeedback.scores.naturalness]] as const).map(([labelKey, val]) => (
                      <div key={labelKey} className="bg-[var(--bg-input)] rounded-lg py-1.5">
                        <p className="text-sm font-bold text-[var(--text-primary)] leading-none">{val}</p>
                        <p className="text-[10px] text-[var(--text-muted)] mt-1">{t(labelKey, lang)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* 参考答案 */}
                <div className="bg-[var(--mint-soft)]/12 border border-[var(--mint-soft)]/25 rounded-xl p-3">
                  <p className="text-xs text-[var(--text-muted)] mb-1">{outputFeedback.isCorrect ? t('reading.natural_ref', lang) : t('reading.reference_answer', lang)}</p>
                  <p className="text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Pretendard', sans-serif" }}>{outputFeedback.corrected}</p>
                </div>
                {/* 讲解 */}
                {outputFeedback.reason && (
                  <div className="bg-[var(--bg-input)] rounded-xl p-3">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{outputFeedback.reason}</p>
                  </div>
                )}
                {/* 存表达 */}
                {outputFeedback.saveExpression && (
                  <button
                    onClick={handleSaveExpression}
                    disabled={exprSaved}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[var(--peach-soft)]/40 text-[var(--peach-soft)] text-sm font-medium disabled:opacity-50"
                  >
                    <Bookmark size={14} fill={exprSaved ? 'currentColor' : 'none'} />
                    {exprSaved ? t('reading.saved_to_wordbook', lang) : `${t('reading.save_to_wordbook_prefix', lang)}${outputFeedback.saveExpression}`}
                  </button>
                )}
              </div>
            )}
            {/* 批改失败兜底：回显原句 */}
            {outputDone && !outputFeedback && (
              <div className="bg-[var(--bg-input)] rounded-xl p-4 text-center animate-fade-in">
                <Check size={18} className="text-[var(--mint-soft)] mx-auto mb-1.5" />
                <p className="text-sm font-medium text-[var(--text-secondary)]">{t('reading.submitted_no_grade', lang)}</p>
                <p className="text-base font-bold text-[var(--text-primary)] mt-1" style={{ fontFamily: "'Pretendard', sans-serif" }}>{outputValue}</p>
              </div>
            )}
          </div>

          {!outputDone ? (
            <button
              onClick={handleOutputSubmit}
              disabled={!outputValue.trim() || outputScoring}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm disabled:opacity-50 active:scale-[0.97] transition-colors transition-opacity transition-shadow"
            >
              {outputScoring ? <><Sparkles size={18} className="animate-pulse" /> {t('reading.ai_scoring', lang)}</> : <>{t('reading.confirm_output', lang)} <ChevronRight size={18} /></>}
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-colors transition-opacity transition-shadow"
            >
              {t('reading.complete_output', lang)} <Trophy size={18} />
            </button>
          )}
          {isDesktop && !outputDone && (
            <FloatingKoreanKeyboard
              value={outputValue}
              onChange={setOutputValue}
              visible={showKeyboard}
              onClose={() => setShowKeyboard(false)}
            />
          )}
        </div>
      )}

      {/* ── Step: Settlement ── */}
      {step === 'settlement' && (
        <div className="py-6 space-y-6 animate-fade-in text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--mint-soft)]/20 to-[var(--purple-soft)]/20 flex items-center justify-center mx-auto border-2 border-[var(--mint-soft)]/30">
            <Trophy size={36} className="text-[var(--peach-soft)]" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{t('reading.reading_complete', lang)}</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {t('reading.you_finished', lang, { title: article.title })}
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{t('reading.settle_core_vocab', lang)}</span>
              <span className="text-[var(--text-primary)] font-bold">{t('reading.n_items', lang, { n: article.coreWords.length })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{t('reading.settle_comprehension', lang)}</span>
              <span className="text-[var(--text-primary)] font-bold">
                {article.questions.length > 0
                  ? t('reading.n_correct', lang, { n: quizCorrect, m: article.questions.length })
                  : t('reading.no_quiz', lang)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{t('reading.settle_saved_sentences', lang)}</span>
              <span className="text-[var(--text-primary)] font-bold">{t('reading.n_sentences', lang, { n: savedSentences.size })}</span>
            </div>
            {outputValue && (
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">{t('reading.settle_your_sentence', lang)}</span>
                <span className="text-[var(--mint-soft)] font-bold text-xs max-w-[200px] truncate">{outputValue}</span>
              </div>
            )}
            {outputFeedback && (
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">{t('reading.settle_output_score', lang)}</span>
                <span className="text-[var(--text-primary)] font-bold">{t('reading.n_points', lang, { n: outputFeedback.scores.overall })}</span>
              </div>
            )}
          </div>

          <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-3">
            <div className="flex items-center gap-2 justify-center">
              <Sparkles size={16} className="text-[var(--mint-soft)]" />
              <span className="text-sm text-[var(--text-primary)]">+{finalXp} XP</span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => router.push('/reading')}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-colors transition-opacity transition-shadow"
            >
              {t('reading.read_more', lang)} <BookOpen size={18} />
            </button>
            <button
              onClick={() => {
                setRevealedZh(new Set());
                setSelectedWord(null);
                setQuizIdx(0);
                setQuizAnswers({});
                setQuizRevealed({});
                setQuizCorrect(0);
                quizAnsweredRef.current = new Set();
                setOutputValue('');
                setOutputDone(false);
                setStep('goals');
              }}
              className="w-full py-3 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl font-medium text-sm"
            >
              {t('reading.reread', lang)}
            </button>
          </div>
        </div>
      )}
      {/* ── Word detail bottom drawer ── */}
      {selectedWord && typeof window !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          <div
            onClick={() => setSelectedWord(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 200 }}
          />
          {/* Drawer */}
          <div style={{
            position: 'fixed', bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))', left: 0, right: 0, zIndex: 201,
            background: 'var(--bg-card)', borderRadius: '20px 20px 0 0',
            padding: '20px 20px 20px',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
            maxWidth: 560, margin: '0 auto',
          }}>
            {/* Handle */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border-color)', margin: '0 auto 16px' }} />
            {/* Close */}
            <button
              onClick={() => setSelectedWord(null)}
              aria-label={t('reading.close', lang)}
              style={{ position: 'absolute', top: 8, right: 8, padding: 12, color: 'var(--text-muted)', minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            {/* Word */}
            <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
              {selectedWord.word}
            </p>
            {selectedWord.pronunciation && (
              <p style={{ fontSize: 14, color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: 8 }}>
                [{selectedWord.pronunciation}]
              </p>
            )}
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 20 }}>
              {selectedWord.meaning}
            </p>
            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => speakWord(selectedWord.word)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '11px 0', borderRadius: 14, border: '1px solid var(--border-color)',
                  background: 'var(--bg-input)', fontSize: 14, color: 'var(--text-primary)', fontWeight: 600,
                }}
              >
                <Volume2 size={16} /> {t('reading.speak', lang)}
              </button>
              <button
                onClick={() => { toggleSaveWord(selectedWord.word); setSelectedWord(null); }}
                style={{
                  flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '11px 0', borderRadius: 14, border: 'none',
                  background: savedWords.has(selectedWord.word) ? 'var(--peach-soft)' : 'var(--ink)',
                  color: '#fff', fontSize: 14, fontWeight: 700,
                }}
              >
                <Bookmark size={16} fill={savedWords.has(selectedWord.word) ? '#fff' : 'none'} />
                {savedWords.has(selectedWord.word) ? t('reading.added_to_wordbook', lang) : t('reading.add_to_wordbook', lang)}
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
      {aiLookupWord && (
        <WordTapSheet
          surface={aiLookupWord}
          source={`reading:${article.id}`}
          onClose={() => setAiLookupWord(null)}
          onSaved={() => setAiLookupWord(null)}
        />
      )}
      {shadowIdx !== null && article.sentences[shadowIdx] && (
        <ShadowingModal
          ko={article.sentences[shadowIdx].ko}
          zh={article.sentences[shadowIdx].zh}
          audioUrl={article.audioUrl}
          start={article.audioTimings?.[shadowIdx]?.start}
          end={article.audioTimings?.[shadowIdx]?.end}
          onClose={() => setShadowIdx(null)}
          lang={lang}
          dark={dark}
        />
      )}
        </div>
      </div>
    </div>
  );
}
