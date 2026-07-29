'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { Eye, EyeOff, Lock, Check, Flame, Volume2, ArrowLeft, ChevronRight } from 'lucide-react';
import { getTheme, getThemeWords, getAllThemes, getThemeCategories } from '@/data/vocabulary';
import { awardXp, updateStreak, getProfile } from '@/lib/gamification';
import { speakWord } from '@/lib/tts';
import { useIsDesktop } from '@/lib/useIsMobile';
import { DiffFeedback } from '@/components/dictation/DiffFeedback';
import { KoreanKeyboardDisplay } from '@/components/dictation/KoreanKeyboardDisplay';
import { useHangulIme } from '@/lib/useHangulIme';
import type { ThemePack } from '@/types';
import { db } from '@/lib/db';
import type { WordBook } from '@/types';
import { useAuth } from '@/components/AuthProvider';
import { normalizeKorean, composeJamo } from '@/lib/koreanDiff';
import { playCorrectSound, playWrongSound, playComplete } from '@/lib/audio/sfx';
import { useToast } from '@/hooks/useToast';
import { PracticeSessionShell } from '@/components/practice/PracticeSessionShell';
import { PracticeResult } from '@/components/practice/PracticeResult';
import { PracticeNextHint } from '@/components/practice/PracticeNextHint';
import { KeyboardHint } from '@/components/practice/KeyboardHint';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { saveProgress, loadProgress, clearProgress, TTL_FLASHCARD } from '@/lib/progress-storage';
import { getGuestId } from '@/lib/guestId';
import '../practice/practice-redesign.css';

// ── Types ────────────────────────────────────────────────

interface TypingItem {
  id: string;
  korean: string;
  chinese: string;
  type: 'word' | 'sentence';
}

interface PackProgress {
  completedAt: number;
  bestWpm: number;
  bestAccuracy: number;
  practiceCount: number;
}

type PageState = 'home' | 'intro' | 'session' | 'result';

interface TypingSnapshot {
  activeThemeId: string;
  index: number;
  items: TypingItem[];
  mastery: MasteryMap;
  reviewMode: boolean;
  correctCount: number;
  correctChars: number;
  xpTotal: number;
  combo: number;
  startTime: number | null;
}

// ── Storage helpers ───────────────────────────────────────
// pack + mastery 走 db.typingPackProgress / db.typingMastery (云端同步)
// show-translation 保留 localStorage（纯 UI 偏好，用户在本机上选一次记住）

function getShowTranslation(userId: string | undefined): boolean {
  if (!userId) return true;
  try { return localStorage.getItem(`typing-show-translation:${userId}`) !== 'false'; } catch { return true; }
}

function setShowTranslationPref(userId: string | undefined, v: boolean) {
  if (!userId) return;
  try { localStorage.setItem(`typing-show-translation:${userId}`, String(v)); } catch { /* ignore */ }
}

// ── Build items from theme ────────────────────────────────

// 每包上限 · 词包已升级到 ~40 词,放宽到全用(封 40 防超长);句子用满(封 12)
const MAX_WORDS_PER_PACK = 40;
const MAX_SENTS_PER_PACK = 12;

async function buildTypingItems(themeId: string): Promise<TypingItem[]> {
  const [theme, wordsData] = await Promise.all([getTheme(themeId), getThemeWords(themeId)]);
  if (!theme) return [];
  const words = wordsData.slice(0, MAX_WORDS_PER_PACK).map((e, i) => ({
    id: `w-${i}`, korean: e.korean,
    chinese: e.meanings[0]?.chinese ?? '', type: 'word' as const,
  }));
  const sentences = (theme.sentences ?? []).slice(0, MAX_SENTS_PER_PACK).map((s, i) => ({
    id: `s-${i}`, korean: s.korean, chinese: s.chinese, type: 'sentence' as const,
  }));
  return [...words, ...sentences];
}

// 键位闯关 · typingLevels 每级转 TypingItem(text 即目标,label/chinese 作提示)
async function buildLevelItems(levelId: number): Promise<TypingItem[]> {
  const { typingLevels } = await import('@/data/typingLevels');
  const lv = typingLevels.find(l => l.id === levelId);
  if (!lv) return [];
  return lv.texts.map((t, i) => ({
    id: `lv-${levelId}-${i}`,
    korean: t.text,
    chinese: t.chinese ? `${t.label} · ${t.chinese}` : t.label,
    // 字母/音节练习按 word 记(短、无空格),句子/短文按 sentence
    type: t.text.includes(' ') || t.text.length > 12 ? 'sentence' : 'word',
  }));
}

// 键位闯关 5 级静态元数据(用于卡片/标题展示,不必异步加载整份数据)
const LEVEL_META: { id: number; name: string; emoji: string; desc: string }[] = [
  { id: 1, name: 'typing.lv1_name', emoji: '⌨️', desc: 'typing.lv1_desc' },
  { id: 2, name: 'typing.lv2_name', emoji: '🧩', desc: 'typing.lv2_desc' },
  { id: 3, name: 'typing.lv3_name', emoji: '📝', desc: 'typing.lv3_desc' },
  { id: 4, name: 'typing.lv4_name', emoji: '📖', desc: 'typing.lv4_desc' },
  { id: 5, name: 'typing.lv5_name', emoji: '⏱️', desc: 'typing.lv5_desc' },
];

// ── Unlock logic ──────────────────────────────────────────

// ── Mastery (per-item streak) ─────────────────────────────

type MasteryMap = Record<string, number>;
const MASTERY_THRESHOLD = 3;

function getItemKey(it: TypingItem): string { return `${it.type}:${it.korean}`; }

function isItemMastered(m: MasteryMap, it: TypingItem): boolean {
  return (m[getItemKey(it)] ?? 0) >= MASTERY_THRESHOLD;
}

// ── Unlock logic (theme packs) ────────────────────────────
// packMap 由主组件维护，unlock 判断读该缓存
function isPackUnlockedByMap(theme: ThemePack, allThemes: ThemePack[], packMap: Record<string, PackProgress>): boolean {
  const inCategory = allThemes.filter(t => t.category === theme.category);
  const idx = inCategory.findIndex(t => t.id === theme.id);
  if (idx === 0) return true;
  return !!packMap[inCategory[idx - 1].id];
}

// ── WPM ──────────────────────────────────────────────────

function calcWpm(chars: number, ms: number): number {
  if (ms <= 0) return 0;
  return Math.round(chars / (ms / 60000));
}

// ── Char-level target display ─────────────────────────────

function TargetChars({ target, input }: { target: string; input: string }) {
  // 手机系统输入法会把相邻辅音+元音自动合成音节(ㅎ+ㅗ→호),而键位闯关目标是散字母序列。
  // 显示前把目标和输入都过 composeJamo 归一,格子按合成后的音节分,和用户实际能输入的一致(判定层同样归一)。
  const chars = Array.from(composeJamo(target.normalize('NFC')));
  const typed = Array.from(composeJamo(input.normalize('NFC')));
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'flex-end', flex: 1, minWidth: 0 }}>
      {chars.map((ch, i) => {
        let charColor = 'var(--hr-border-3)';
        let underColor = 'var(--hr-border-1)';
        let isCurrent = false;
        let strikethrough = false;
        let glow = '';

        if (i < typed.length) {
          if (typed[i] === ch) {
            charColor = 'var(--hr-mint-strong)';
            underColor = 'var(--hr-mint-soft)';
            glow = '0 0 8px rgba(125,198,179,.45)';
          } else {
            charColor = 'var(--hr-pink-strong)';
            underColor = 'var(--hr-pink-base)';
            strikethrough = true;
          }
        } else if (i === typed.length) {
          charColor = 'var(--hr-ink-1)';
          underColor = 'var(--hr-pink-base)';
          isCurrent = true;
        }

        const isSpace = ch === ' ';
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{
              fontSize: isSpace ? 11 : 30,
              fontWeight: 800,
              fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif",
              color: charColor,
              textShadow: glow,
              textDecoration: strikethrough ? 'line-through' : 'none',
              lineHeight: 1,
              minWidth: isSpace ? 10 : undefined,
            }}>
              {isSpace ? '·' : ch}
            </span>
            <div style={{
              height: 2,
              minWidth: isSpace ? 10 : 18,
              borderRadius: 1,
              background: underColor,
              animation: isCurrent ? 'blink-underline 0.75s infinite' : 'none',
            }} />
          </div>
        );
      })}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────

const TYPING_KEYFRAMES = `
  @keyframes pulse-block { 0%,100%{opacity:1} 50%{opacity:.5} }
  @keyframes combo-pop { from{transform:scale(.6);opacity:0} to{transform:scale(1);opacity:1} }
  @keyframes blink-underline { 0%,100%{opacity:1} 50%{opacity:0} }
`;

export default function TypingPage() {
  const { user, loading: authLoading } = useAuth();
  const { lang } = useLang();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const src = searchParams.get('src'); // 'theme' | 'book' | 'sentences' | null
  const smartBack = useSmartBack('/typing');
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>('home');
  const [activeThemeId, setActiveThemeId] = useState('');
  const [items, setItems] = useState<TypingItem[]>([]);
  const [mastery, setMastery] = useState<MasteryMap>({});
  const [reviewMode, setReviewMode] = useState(false);
  const [streak, setStreak] = useState(0);

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [combo, setCombo] = useState(0);
  const [isComposing, setIsComposing] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [resultData, setResultData] = useState<{ wpm: number; accuracy: number; elapsed: number; xp: number } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const submittedRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const correctCountRef = useRef(0);
  const correctCharsRef = useRef(0);
  const xpTotalRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const comboRef = useRef(0);

  const isDesktop = useIsDesktop();

  const typingSessionKey = user?.id
    ? `typing-session:${user.id}:${activeThemeId}`
    : `typing-session:guest:${activeThemeId}`;

  // Save session snapshot on each item change (so tab-close / crash doesn't lose all progress)
  useEffect(() => {
    if (pageState !== 'session' || !activeThemeId) return;
    saveProgress(typingSessionKey, {
      activeThemeId,
      index,
      items,
      mastery,
      reviewMode,
      correctCount: correctCountRef.current,
      correctChars: correctCharsRef.current,
      xpTotal: xpTotalRef.current,
      combo: comboRef.current,
      startTime: startTimeRef.current,
    }, TTL_FLASHCARD);
  }, [index, pageState, typingSessionKey, activeThemeId, items, mastery, reviewMode]);

  useEffect(() => {
    let cancelled = false;
    getProfile()
      .then(p => { if (!cancelled) setStreak(p.streak); })
      .catch(e => console.error('[typing] streak load failed', e));
    setShowTranslation(getShowTranslation(user?.id));
    return () => { cancelled = true; };
  }, [user?.id]);

  useEffect(() => {
    if (startTime && pageState === 'session') {
      timerRef.current = setInterval(() => setElapsed(Date.now() - startTime), 300);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTime, pageState]);

  // 进入 session 时冻结过滤结果，避免 session 中 mastery 升级导致 playableItems 缩短、index 越位
  const sessionMasteryRef = useRef<MasteryMap>({});
  const playableItems = useMemo(() => {
    if (reviewMode) return items;
    const filterMastery = pageState === 'session' ? sessionMasteryRef.current : mastery;
    return items.filter(it => !isItemMastered(filterMastery, it));
  }, [items, mastery, reviewMode, pageState]);

  // playableItems 的引用每次 mastery 变化都会变，所以 TTS useEffect 不能依赖 playableItems。
  // 用 ref 持有 current item 的韩文，effect 只在 index 变化时触发
  const currentKoreanRef = useRef<string>('');
  currentKoreanRef.current = playableItems[index]?.korean ?? '';

  // Auto-play TTS on item change（只依赖 index/pageState，韩文从 ref 取，防止 mastery 变化触发重跑）
  useEffect(() => {
    if (pageState === 'session' && currentKoreanRef.current) {
      const ko = currentKoreanRef.current;
      const t = setTimeout(() => speakWord(ko), 300);
      return () => clearTimeout(t);
    }
  }, [index, pageState]);

  // 桌面端聚焦管理 · 输入期聚焦显示区、提交后聚焦反馈区(让 Enter 进下一题)
  // 双 rAF:等 React 提交完新 DOM 再聚焦,单帧时显示区可能还没挂载导致聚焦失败(需手动点)
  useEffect(() => {
    if (!isDesktop || pageState !== 'session') return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => {
      if (submitted) submittedRef.current?.focus();
      else displayRef.current?.focus();
    }));
    return () => cancelAnimationFrame(id);
  }, [index, submitted, pageState, isDesktop]);

  const [allThemes, setAllThemes] = useState<ThemePack[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [wordBooks, setWordBooks] = useState<WordBook[]>([]);
  const [mySentenceCount, setMySentenceCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const [themes, cats] = await Promise.all([getAllThemes(), getThemeCategories()]);
      setAllThemes(themes);
      setCategories(cats);
    })();
  }, []);

  const [packMap, setPackMap] = useState<Record<string, PackProgress>>({});

  useEffect(() => {
    if (authLoading || !user) return;
    let cancelled = false;
    db.wordBooks.toArray().then(books => { if (!cancelled) setWordBooks(books.filter(b => b.wordIds.length > 0)); }).catch(e => console.error('[typing] wordBooks load failed', e));
    db.sentences.count().then(n => { if (!cancelled) setMySentenceCount(n); }).catch(() => { if (!cancelled) setMySentenceCount(0); });
    db.typingPackProgress.toArray().then(rows => {
      if (cancelled) return;
      const map: Record<string, PackProgress> = {};
      for (const r of rows) {
        map[r.id] = {
          completedAt: r.completedAt,
          bestWpm: r.bestWpm,
          bestAccuracy: r.bestAccuracy,
          practiceCount: r.practiceCount,
        };
      }
      setPackMap(map);
    }).catch(e => console.error('[typing] pack progress load failed', e));
    return () => { cancelled = true; };
  }, [user, authLoading]);

  async function loadMastery(themeId: string): Promise<MasteryMap> {
    try {
      const rows = await db.typingMastery.where('themeId').equals(themeId).toArray();
      const m: MasteryMap = {};
      for (const r of rows) m[r.itemKey] = r.streak;
      return m;
    } catch { return {}; }
  }

  async function openIntro(themeId: string, prebuilt?: TypingItem[]) {
    const built = prebuilt ?? await buildTypingItems(themeId);
    if (built.length === 0) {
      showToast(t('typing.toast_empty_pack', lang), 'info');
      return;
    }
    setActiveThemeId(themeId);
    setItems(built);
    const loadedMastery = await loadMastery(themeId);
    setMastery(loadedMastery);
    setReviewMode(false);

    // Check for saved session snapshot and auto-resume
    const snapKey = user?.id
      ? `typing-session:${user.id}:${themeId}`
      : `typing-session:guest:${themeId}`;
    const snap = loadProgress<TypingSnapshot>(snapKey);
    if (snap && snap.activeThemeId === themeId && snap.items.length === built.length && snap.index < built.length) {
      setIndex(snap.index);
      setReviewMode(snap.reviewMode);
      correctCountRef.current = snap.correctCount;
      correctCharsRef.current = snap.correctChars;
      xpTotalRef.current = snap.xpTotal;
      comboRef.current = snap.combo;
      setCorrectCount(snap.correctCount);
      setCombo(snap.combo);
      setStartTime(snap.startTime);
      startTimeRef.current = snap.startTime;
      setInput(''); setSubmitted(false); setLastCorrect(null);
      ime.reset();
      setPageState('session');
      return;
    }

    setPageState('intro');
  }

  async function openWordBook(book: WordBook) {
    const words = await db.words.where('id').anyOf(book.wordIds).toArray();
    if (words.length === 0) return;
    const builtItems: TypingItem[] = [];
    words.forEach((w, i) => {
      builtItems.push({ id: `wb-w-${i}`, korean: w!.word, chinese: w!.meaning, type: 'word' });
      (w!.examples ?? []).forEach((ex, j) => {
        if (ex.text) builtItems.push({ id: `wb-s-${i}-${j}`, korean: ex.text, chinese: ex.translation ?? '', type: 'sentence' });
      });
    });
    openIntro(`wb-${book.id}`, builtItems);
  }

  async function openMySentences() {
    const sentences = await db.sentences.toArray().catch(() => []);
    if (sentences.length === 0) return;
    const builtItems: TypingItem[] = sentences.map((s: any, i: number) => ({
      id: `ms-${i}`,
      korean: s.korean,
      chinese: s.chinese ?? '',
      type: 'sentence' as const,
    }));
    openIntro('my-sentences', builtItems);
  }

  async function openLevel(levelId: number) {
    const built = await buildLevelItems(levelId);
    openIntro(`lv-${levelId}`, built);
  }

  function startPack() {
    sessionMasteryRef.current = { ...mastery };
    ime.reset();
    setIndex(0); setInput(''); setSubmitted(false); setLastCorrect(null);
    setStartTime(null); setElapsed(0); setCorrectCount(0); setCombo(0);
    correctCountRef.current = 0; correctCharsRef.current = 0; xpTotalRef.current = 0;
    startTimeRef.current = null; comboRef.current = 0;
    setPageState('session');
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (submitted) return;
    const val = e.target.value;
    if (!startTimeRef.current && val.length > 0) {
      const now = Date.now();
      startTimeRef.current = now;
      setStartTime(now);
    }
    setInput(val);
  }

  function handleCompositionStart() { setIsComposing(true); }
  function handleCompositionEnd(e: React.CompositionEvent<HTMLInputElement>) {
    setIsComposing(false);
    const val = (e.target as HTMLInputElement).value;
    if (!startTimeRef.current && val.length > 0) {
      const now = Date.now();
      startTimeRef.current = now;
      setStartTime(now);
    }
    setInput(val);
  }

  // 虚拟键盘输入 · 走 setInput,但同样负责起表(WPM 计时起点)
  function handleKbInput(val: string) {
    if (submitted) return;
    if (!startTimeRef.current && val.length > 0) {
      const now = Date.now();
      startTimeRef.current = now;
      setStartTime(now);
    }
    setInput(val);
  }

  const current = playableItems[index];
  const masteredCount = items.filter(it => isItemMastered(mastery, it)).length;
  const allMastered = items.length > 0 && masteredCount === items.length;

  const handleSubmit = useCallback(() => {
    if (!current || !input.trim() || submitted || isComposing) return;
    const isCorrect = normalizeKorean(input) === normalizeKorean(current.korean);
    setSubmitted(true);
    setLastCorrect(isCorrect);

    // 复习模式不写 mastery；常规模式：答对 +1 / 答错清零
    if (!reviewMode) {
      const key = getItemKey(current);
      const nextStreak = isCorrect ? (mastery[key] ?? 0) + 1 : 0;
      const nextMastery = { ...mastery, [key]: nextStreak };
      setMastery(nextMastery);
      const rowId = `${activeThemeId}:${key}`;
      db.typingMastery.put({
        id: rowId,
        themeId: activeThemeId,
        itemKey: key,
        streak: nextStreak,
        updatedAt: Date.now(),
      }).catch(e => console.error('[typing] mastery put failed', e));
    }

    if (isCorrect) {
      playCorrectSound();
      correctCountRef.current += 1;
      correctCharsRef.current += current.korean.replace(/\s/g, '').length;
      setCorrectCount(correctCountRef.current);
      awardXp(5).catch(e => console.error('[typing] awardXp failed', e));
      xpTotalRef.current += 5;
      comboRef.current += 1;
      setCombo(comboRef.current);
    } else {
      playWrongSound();
      comboRef.current = 0;
      setCombo(0);
      // 答错并入共享错题本(与默写同一个 dictationRecords)· 键位闯关(纯字母/短文)不并入
      if (!activeThemeId.startsWith('lv-')) {
        db.dictationRecords.add({
          id: `type-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          userId: user?.id || getGuestId(),
          wordId: current.korean,
          meaning: current.chinese,
          date: Date.now(),
          correct: false,
          userInput: input.trim(),
        }).catch(e => console.error('[typing] record put failed', e));
      }
    }
  }, [input, submitted, isComposing, current, mastery, reviewMode, activeThemeId, user?.id]);

  function handleNext() {
    if (index + 1 >= playableItems.length) {
      finishSession();
    } else {
      setIndex(i => i + 1);
      ime.reset();
      setInput(''); setSubmitted(false); setLastCorrect(null);
    }
  }

  function handleSkip() {
    // 跳过 = 不计分,直接进下一题
    ime.reset();
    setInput(''); setSubmitted(false); setLastCorrect(null);
    handleNext();
  }

  function finishSession() {
    clearProgress(typingSessionKey);
    const ms = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
    const wpm = calcWpm(correctCharsRef.current, ms);
    const accuracy = playableItems.length > 0 ? Math.round((correctCountRef.current / playableItems.length) * 100) : 0;
    const xp = xpTotalRef.current;
    const prev = packMap[activeThemeId];
    const now = Date.now();
    const nextProgress: PackProgress = {
      completedAt: now,
      bestWpm: Math.max(wpm, prev?.bestWpm ?? 0),
      bestAccuracy: Math.max(accuracy, prev?.bestAccuracy ?? 0),
      practiceCount: (prev?.practiceCount ?? 0) + 1,
    };
    setPackMap(prevMap => ({ ...prevMap, [activeThemeId]: nextProgress }));
    db.typingPackProgress.put({
      id: activeThemeId,
      completedAt: nextProgress.completedAt,
      bestWpm: nextProgress.bestWpm,
      bestAccuracy: nextProgress.bestAccuracy,
      practiceCount: nextProgress.practiceCount,
      updatedAt: now,
    }).catch(e => console.error('[typing] pack progress put failed', e));
    updateStreak().catch(e => console.error('[typing] updateStreak failed', e));
    getProfile().then(p => setStreak(p.streak)).catch(e => console.error('[typing] profile reload failed', e));
    setResultData({ wpm, accuracy, elapsed: ms, xp });
    setPageState('result');
    playComplete();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      if (!submitted) handleSubmit();
      else handleNext();
    }
  }

  // 桌面端 · 自立型韩文 IME(物理键+虚拟键统一入口,不依赖系统输入法)
  const ime = useHangulIme({
    onChange: handleKbInput,
    onEnter: () => { if (!submitted) handleSubmit(); else handleNext(); },
    guardBackspace: isDesktop && pageState === 'session',
  });

  function toggleTranslation() {
    const next = !showTranslation;
    setShowTranslation(next);
    setShowTranslationPref(user?.id, next);
  }

  const elapsedSec = Math.floor(elapsed / 1000);
  const elapsedDisplay = `${Math.floor(elapsedSec / 60)}:${String(elapsedSec % 60).padStart(2, '0')}`;

  // 统一解析当前练习集的展示信息(主题/词本/句子/键位闯关)
  function resolveDisplay(): { emoji: string; name: string; desc: string } {
    const theme = allThemes.find(t => t.id === activeThemeId);
    if (theme) return { emoji: theme.emoji ?? '📖', name: theme.name, desc: theme.description ?? '' };
    const lvMatch = activeThemeId.match(/^lv-(\d+)$/);
    if (lvMatch) {
      const lv = LEVEL_META.find(l => l.id === Number(lvMatch[1]));
      if (lv) return { emoji: lv.emoji, name: t(lv.name, lang), desc: t(lv.desc, lang) };
    }
    const book = wordBooks.find(b => `wb-${b.id}` === activeThemeId);
    if (book) return { emoji: '📖', name: book.name, desc: t('typing.book_desc', lang) };
    if (activeThemeId === 'my-sentences') return { emoji: '🔖', name: t('typing.my_sentences', lang), desc: t('typing.my_sentences_desc', lang) };
    return { emoji: '📖', name: t('typing.my_book', lang), desc: t('typing.book_desc', lang) };
  }

  // ── Intro ─────────────────────────────────────────────────
  if (pageState === 'intro') {
    const { emoji: displayEmoji, name: displayName, desc: displayDesc } = resolveDisplay();
    const previewWords = playableItems.filter(i => i.type === 'word').slice(0, 6);
    const previewSents = playableItems.filter(i => i.type === 'sentence').slice(0, 3);
    const masteryPct = items.length > 0 ? Math.round((masteredCount / items.length) * 100) : 0;
    const handleReset = () => {
      if (typeof window === 'undefined') return;
      if (!window.confirm(t('typing.reset_confirm', lang))) return;
      const themeId = activeThemeId;
      db.typingMastery.where('themeId').equals(themeId).delete().catch(e => console.error('[typing] mastery delete failed', e));
      setMastery({});
      setReviewMode(false);
    };
    const handleStart = () => {
      if (allMastered) setReviewMode(true);
      startPack();
    };
    return (
      <div className="pr-scope">
        <div className="hr-stage" style={{ paddingBottom: isDesktop ? 40 : 'calc(72px + env(safe-area-inset-bottom, 0px))' }}>
          <div className="hr-mobile-back" style={{ display: 'block' }}>
            <button
              className="hr-mobile-back-btn"
              onClick={() => { setPageState('home'); }}
              aria-label={t('typing.back_to_groups', lang)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <ArrowLeft size={14} /> {t('typing.back_to_groups', lang)}
            </button>
          </div>

          <div className="pr-hero-card pink">
            <span className="pr-hero-tape" aria-hidden />
            <div className="pr-hero-label">Typing Pack</div>
            <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 4 }}>{displayEmoji}</div>
            <div className="pr-hero-num" style={{ fontSize: 26 }}>{displayName}</div>
            <p className="pr-hero-caption">{displayDesc}</p>
            <div className="pr-hero-chips">
              <div className="pr-hero-chip pink"><span className="pr-chip-count">{previewWords.length}</span><span className="pr-chip-label">{t('typing.chip_words', lang)}</span></div>
              <div className="pr-hero-chip mint"><span className="pr-chip-count">{previewSents.length}</span><span className="pr-chip-label">{t('typing.chip_sentences', lang)}</span></div>
              <div className="pr-hero-chip peach"><span className="pr-chip-count">{playableItems.length}</span><span className="pr-chip-label">{t('typing.chip_total', lang)}</span></div>
            </div>
          </div>

          {masteredCount > 0 && (
            <div style={{ background: 'var(--hr-surface-2)', borderRadius: 14, border: '1px solid var(--hr-border-2)', padding: '14px 16px', margin: '16px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--hr-ink-2)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {t('typing.mastered_label', lang)} <b style={{ color: 'var(--hr-ink-1)', fontFamily: 'var(--hr-serif)', fontStyle: 'italic', fontSize: 15 }}>{masteredCount}</b>
                  <span style={{ color: 'var(--hr-ink-3)' }}>/ {items.length}</span>
                </span>
                <button onClick={handleReset} style={{ fontSize: 11, color: 'var(--hr-ink-3)', background: 'transparent', border: '1px solid var(--hr-border-2)', cursor: 'pointer', padding: '4px 10px', borderRadius: 999, fontFamily: 'var(--hr-mono)', letterSpacing: '.08em' }}>
                  ↺ {t('typing.reset', lang)}
                </button>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: 'var(--hr-border-1)', overflow: 'hidden' }}>
                <div style={{ width: `${masteryPct}%`, height: '100%', background: 'var(--hr-pink-strong)', transition: 'width .3s var(--hr-ease)' }} />
              </div>
            </div>
          )}

          {previewWords.length > 0 && (
            <div style={{ background: 'var(--hr-surface-2)', borderRadius: 14, border: '1px solid var(--hr-border-2)', padding: '16px', marginBottom: 12 }}>
              <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, fontWeight: 600, color: 'var(--hr-ink-3)', margin: '0 0 12px', letterSpacing: '.14em', textTransform: 'uppercase' }}>{t('typing.preview_words', lang)}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {previewWords.map((item, i) => (
                  <div key={i} style={{ background: 'var(--hr-pink-soft)', borderRadius: 10, padding: '6px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--hr-ink-1)', fontFamily: 'var(--hr-hangul)' }}>{item.korean}</span>
                    <span style={{ fontSize: 10, color: 'var(--hr-ink-3)' }}>{item.chinese}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {previewSents.length > 0 && (
            <div style={{ background: 'var(--hr-surface-2)', borderRadius: 14, border: '1px solid var(--hr-border-2)', padding: '16px', marginBottom: 16 }}>
              <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, fontWeight: 600, color: 'var(--hr-ink-3)', margin: '0 0 12px', letterSpacing: '.14em', textTransform: 'uppercase' }}>{t('typing.preview_sentences', lang)}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {previewSents.map((item, i) => (
                  <div key={i} style={{ borderLeft: '3px solid var(--hr-mint-base)', paddingLeft: 10 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--hr-ink-1)', margin: '0 0 2px', fontFamily: 'var(--hr-hangul)' }}>{item.korean}</p>
                    <p style={{ fontSize: 12, color: 'var(--hr-ink-3)', margin: 0 }}>{item.chinese}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {allMastered && (
            <div style={{ background: 'var(--hr-mint-soft)', borderRadius: 12, padding: '14px 16px', marginBottom: 12, textAlign: 'center', border: '1px solid var(--hr-mint-base)' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--hr-mint-strong)', margin: '0 0 4px' }}>{t('typing.all_mastered_title', lang)}</p>
              <p style={{ fontSize: 12, color: 'var(--hr-ink-2)', margin: 0 }}>{t('typing.all_mastered_desc', lang)}</p>
            </div>
          )}
          <div style={{ background: 'var(--hr-surface-3)', borderRadius: 12, padding: '10px 14px', marginBottom: 20, display: 'flex', gap: 8, alignItems: 'flex-start', border: '1px dashed var(--hr-border-2)' }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <p style={{ fontSize: 12, color: 'var(--hr-ink-2)', margin: 0, lineHeight: 1.6 }}>
              {t('typing.tip_main', lang)}
              {isDesktop && t('typing.tip_desktop', lang)}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={handleStart} style={{ padding: '14px 0', borderRadius: 14, background: 'var(--hr-ink-1)', color: 'var(--hr-surface-1)', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              {allMastered ? t('typing.btn_review_once', lang) : t('typing.btn_start_typing', lang, { n: playableItems.length })}
            </button>
            <button onClick={() => setPageState('home')} style={{ padding: '12px 0', borderRadius: 14, background: 'transparent', border: '1.5px solid var(--hr-border-2)', color: 'var(--hr-ink-2)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              {t('typing.btn_back', lang)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Result ────────────────────────────────────────────────
  if (pageState === 'result' && resultData) {
    const { emoji: resEmoji, name: resName } = resolveDisplay();
    const resSec = Math.floor(resultData.elapsed / 1000);
    const resDisplay = `${Math.floor(resSec / 60)}:${String(resSec % 60).padStart(2, '0')}`;
    return (
      <PracticeResult
        tone="pink"
        score={resultData.wpm}
        scoreUnit="SPM"
        caption={`${resEmoji} ${resName} · ${t('typing.result_time_prefix', lang)} ${resDisplay}`}
        stats={[
          { num: `${resultData.accuracy}%`, label: t('typing.result_accuracy', lang) },
          { num: resultData.wpm, label: 'SPM' },
          { num: resDisplay, label: t('typing.result_time', lang) },
        ]}
        xp={resultData.xp}
        primaryLabel={allMastered ? t('typing.btn_review_again', lang) : t('typing.btn_practice_again', lang, { n: playableItems.length })}
        onPrimary={() => { if (allMastered) setReviewMode(true); else setReviewMode(false); startPack(); }}
        secondaryLabel={t('typing.btn_back_theme', lang)}
        onSecondary={() => setPageState('home')}
        footer={<PracticeNextHint current="typing" assumeCurrentDone />}
      />
    );
  }

  // ── Session ───────────────────────────────────────────────
  if (pageState === 'session' && current) {
    const cardBorderColor = submitted ? (lastCorrect ? 'var(--hr-mint-base)' : 'var(--hr-pink-base)') : 'var(--hr-border-2)';
    const cardBg = submitted ? (lastCorrect ? 'var(--hr-mint-soft)' : 'var(--hr-pink-soft)') : 'var(--hr-surface-2)';

    return (
      <PracticeSessionShell
        tone="pink"
        modeName={t('typing.mode_name', lang)}
        modeKr="타자 연습"
        current={index + 1}
        total={playableItems.length}
        onBack={() => setPageState('intro')}
        ctaLabel={!submitted ? t('typing.btn_submit', lang) : (index + 1 >= playableItems.length ? t('typing.btn_see_result', lang) : t('typing.btn_next', lang))}
        onCta={() => {
          if (!submitted) { handleSubmit(); return; }
          handleNext();
        }}
        ctaDisabled={!submitted && !input.trim()}
        secondaryLabel={!submitted ? t('typing.btn_skip', lang) : undefined}
        onSecondary={!submitted ? handleSkip : undefined}
      >
        <style>{TYPING_KEYFRAMES}</style>

        {/* 计时 + combo 一行 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 11, color: 'var(--hr-ink-3)', letterSpacing: '.08em', fontVariantNumeric: 'tabular-nums' }}>
            {elapsedDisplay} · {correctCount}/{playableItems.length} {t('typing.correct_suffix', lang)}
          </span>
          {combo >= 2 && (
            <div style={{
              background: 'var(--hr-pink-strong)',
              borderRadius: 999, padding: '3px 12px',
              fontSize: 12, fontWeight: 700, color: '#fff',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              animation: 'combo-pop 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
            }}>
              🔥 {t('typing.combo', lang)} <span style={{ fontSize: 15, fontFamily: 'var(--hr-serif)', fontStyle: 'italic' }}>{combo}</span>
            </div>
          )}
        </div>

        {/* Card */}
        <div style={{
          background: cardBg, borderRadius: 16,
          border: `1.5px solid ${cardBorderColor}`,
          padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 14,
          boxShadow: 'var(--hr-shadow-sm)',
          transition: 'background .2s var(--hr-ease), border-color .2s var(--hr-ease)',
        }}>
          {/* Translation row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontSize: 14, fontWeight: 500,
              color: showTranslation ? 'var(--hr-ink-2)' : 'transparent',
              background: showTranslation ? 'transparent' : 'var(--hr-border-1)',
              borderRadius: 6, transition: 'all .15s var(--hr-ease)', padding: showTranslation ? 0 : '2px 8px',
            }}>
              {current.chinese}
            </span>
            <button onClick={toggleTranslation} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--hr-ink-3)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }}>
              {showTranslation ? <Eye size={13} /> : <EyeOff size={13} />}
              {showTranslation ? t('typing.hide', lang) : t('typing.show', lang)}
            </button>
          </div>

          {/* Target chars + speaker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <TargetChars target={current.korean} input={input} />
            <button
              onClick={() => speakWord(current.korean)}
              style={{ flexShrink: 0, width: 42, height: 42, borderRadius: '50%', background: 'var(--hr-pink-soft)', border: '1.5px solid var(--hr-pink-base)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Volume2 size={17} style={{ color: 'var(--hr-pink-strong)' }} />
            </button>
          </div>

          {/* Type badge */}
          <span style={{
            fontSize: 10.5, fontWeight: 600, padding: '3px 10px', borderRadius: 999, alignSelf: 'flex-start',
            fontFamily: 'var(--hr-mono)', letterSpacing: '.14em', textTransform: 'uppercase',
            color: current.type === 'word' ? 'var(--hr-pink-strong)' : 'var(--hr-mint-strong)',
            background: current.type === 'word' ? 'var(--hr-pink-soft)' : 'var(--hr-mint-soft)',
            border: `1px solid ${current.type === 'word' ? 'var(--hr-pink-base)' : 'var(--hr-mint-base)'}`,
          }}>
            {current.type === 'word' ? 'Word' : 'Sentence'}
          </span>
        </div>

        {/* Input or diff feedback */}
        {!submitted ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            {isDesktop ? (
              // 桌面 · App 接管输入(不依赖系统输入法)· 只读显示区 + 闪烁光标
              <div
                ref={displayRef}
                {...ime.keyProps}
                role="textbox"
                aria-label={t('typing.input_aria', lang)}
                onClick={() => displayRef.current?.focus()}
                style={{
                  width: '100%', padding: '15px 18px', borderRadius: 14, minHeight: 56,
                  border: '2px solid var(--hr-pink-base)', boxShadow: '0 0 0 4px rgba(255,127,168,.12)',
                  fontSize: 20, color: 'var(--hr-ink-1)', fontFamily: 'var(--hr-hangul)',
                  boxSizing: 'border-box', background: 'var(--hr-surface-2)', outline: 'none', cursor: 'text',
                  display: 'flex', alignItems: 'center', flexWrap: 'wrap',
                }}>
                {input
                  ? <span>{input}</span>
                  : <span style={{ color: 'var(--hr-ink-4)' }}>{t('typing.input_placeholder_desktop', lang)}</span>}
                <span aria-hidden style={{
                  display: 'inline-block', width: 2, height: 24, marginLeft: 2,
                  background: 'var(--hr-pink-base)', animation: 'blink-underline 1s step-end infinite',
                }} />
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  onKeyDown={handleKeyDown}
                  placeholder={t('typing.input_placeholder_mobile', lang)}
                  style={{
                    width: '100%', padding: '15px 52px 15px 18px', borderRadius: 14,
                    border: '2px solid var(--hr-border-2)', fontSize: 20, color: 'var(--hr-ink-1)',
                    outline: 'none', fontFamily: 'var(--hr-hangul)',
                    boxSizing: 'border-box', background: 'var(--hr-surface-2)', caretColor: 'var(--hr-pink-base)',
                    transition: 'border-color .2s var(--hr-ease), box-shadow .2s var(--hr-ease)',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--hr-pink-base)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(255,127,168,.15)';
                    // block:'nearest' — 只在输入框被挡住时最小滚动,已可见就不动,避免把上方目标词顶出屏幕
                    requestAnimationFrame(() => { requestAnimationFrame(() => { e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }); });
                  }}
                  onBlur={e => { e.target.style.borderColor = 'var(--hr-border-2)'; e.target.style.boxShadow = 'none'; }}
                />
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'var(--hr-surface-3)', borderRadius: 6, padding: '3px 7px', fontSize: 10, color: 'var(--hr-ink-3)', fontFamily: 'var(--hr-mono)' }}>↵</span>
              </div>
            )}
            {isDesktop
              ? <p style={{ fontSize: 11, color: 'var(--hr-ink-3)', margin: '2px 0 0' }}>{t('typing.hint_desktop_keyboard', lang)}</p>
              : <KeyboardHint />}

            {isDesktop && (
              <KoreanKeyboardDisplay
                composingText={input}
                pressedKey={ime.pressedKey}
                onJamo={ime.inputJamo}
                onBackspace={ime.backspace}
                onSpace={ime.space}
              />
            )}
          </div>
        ) : (
          <div
            ref={submittedRef}
            tabIndex={isDesktop ? 0 : undefined}
            onKeyDown={isDesktop ? (e => { if (e.key === 'Enter') { e.preventDefault(); handleNext(); } }) : undefined}
            style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10, outline: 'none' }}
          >
            <DiffFeedback userInput={input.replace(/\s/g, '')} correct={current.korean.replace(/\s/g, '')} />
            {lastCorrect === false && !activeThemeId.startsWith('lv-') && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start', background: 'var(--hr-surface-3)', border: '1px solid var(--hr-border-2)', borderRadius: 999, padding: '5px 12px' }}>
                <span style={{ fontSize: 13 }} aria-hidden>🧠</span>
                <span style={{ fontSize: 12, color: 'var(--hr-ink-2)', fontWeight: 600 }}>{t('typing.added_to_wrongbook', lang)}</span>
              </div>
            )}
          </div>
        )}
      </PracticeSessionShell>
    );
  }

  // ── Home 4 卡入口 (无 src 参数) ──────────────────────────
  if (!src) {
    const smartBackToPractice = () => { window.location.href = '/practice'; };
    const bookCount = wordBooks.length;
    const sentCount = mySentenceCount ?? 0;
    const themeCount = allThemes.length;
    return (
      <div className="pr-scope">
        <div className="hr-stage" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
          <div className="hr-mobile-back" style={{ display: 'block' }}>
            <button
              className="hr-mobile-back-btn"
              onClick={smartBackToPractice}
              aria-label={t('typing.back_to_practice_center', lang)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <ArrowLeft size={14} /> {t('typing.back_to_practice_short', lang)}
            </button>
          </div>

          <header className="hr-page-head">
            <div className="hr-brand">
              <div className="hr-brand-mark">Tori</div>
              <div className="hr-brand-kr">타자 연습</div>
              <div className="hr-brand-sub">{t('typing.brand_sub', lang)}</div>
            </div>
            <div className="hr-brand-sub" data-md-show>{t('typing.brand_tagline', lang)}</div>
          </header>

          {streak > 0 && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--hr-pink-soft)', borderRadius: 20, padding: '6px 14px', marginBottom: 24, border: '1px solid var(--hr-pink-base)' }}>
              <Flame size={14} style={{ color: 'var(--hr-pink-strong)' }} />
              <span style={{ fontSize: 13, color: 'var(--hr-pink-strong)', fontWeight: 700 }}>{t('typing.streak_prefix', lang)} <span style={{ fontFamily: 'var(--hr-serif)', fontStyle: 'italic', fontSize: 15 }}>{streak}</span> {t('typing.streak_suffix', lang)}</span>
            </div>
          )}

          <div className="pr-sub-list pr-sub-list--4" role="list" aria-label={t('typing.four_modes_aria', lang)}>
            {[
              { num: '01', en: 'Key Levels', name: t('typing.card_level_name', lang),   kr: '타자 레벨',  desc: t('typing.card_level_desc', lang), href: '/typing?src=level' },
              { num: '02', en: 'Theme',     name: t('typing.card_theme_name', lang),    kr: '주제 팩',    desc: t('typing.card_theme_desc', lang, { n: themeCount }), href: '/typing?src=theme' },
              { num: '03', en: 'My Book',   name: t('typing.card_book_name', lang), kr: '내 단어장',  desc: bookCount > 0 ? t('typing.card_book_desc', lang, { n: bookCount }) : t('typing.card_book_desc_empty', lang), href: '/typing?src=book' },
              { num: '04', en: 'Sentences', name: t('typing.card_sent_name', lang),  kr: '내 문장',    desc: sentCount > 0 ? t('typing.card_sent_desc', lang, { n: sentCount }) : t('typing.card_sent_desc_empty', lang), href: '/typing?src=sentences' },
            ].map(s => (
              <button
                key={s.num}
                type="button"
                onClick={() => { router.push(s.href); }}
                className="pr-sub-card pink"
                role="listitem"
                aria-label={t('typing.enter_mode', lang, { name: s.name })}
                style={{ font: 'inherit', textAlign: 'left', cursor: 'pointer' }}
              >
                <div className="pr-sub-num" aria-hidden>{s.num}</div>
                <div className="pr-sub-body">
                  <span className="pr-sub-en">{s.en}</span>
                  <span className="pr-sub-name">{s.name}</span>
                  <span className="pr-sub-kr">{s.kr}</span>
                  <p className="pr-sub-desc">{s.desc}</p>
                </div>
                <ChevronRight size={20} className="pr-sub-arrow" aria-hidden />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Home 分组视图 (src=theme|book|sentences) ─────────────
  return (
    <div className="pr-scope">
      <div className="hr-stage" style={{ paddingBottom: isDesktop ? 40 : 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
        <div className="hr-mobile-back" style={{ display: 'block' }}>
          <button
            className="hr-mobile-back-btn"
            onClick={smartBack}
            aria-label={t('typing.back_to_typing_home', lang)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <ArrowLeft size={14} /> {t('typing.back_to_typing_home_short', lang)}
          </button>
        </div>

        <header className="hr-page-head">
          <div className="hr-brand">
            <div className="hr-brand-mark">Tori</div>
            <div className="hr-brand-kr">
              {src === 'level' ? '타자 레벨' : src === 'theme' ? '주제 팩' : src === 'book' ? '내 단어장' : '내 문장'}
            </div>
            <div className="hr-brand-sub">
              {src === 'level' ? t('typing.card_level_name', lang) : src === 'theme' ? t('typing.card_theme_name', lang) : src === 'book' ? t('typing.card_book_name', lang) : t('typing.card_sent_name', lang)}
            </div>
          </div>
          <div className="hr-brand-sub" data-md-show>{t('typing.pick_one', lang)}</div>
        </header>

        {streak > 0 && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--hr-pink-soft)', borderRadius: 20, padding: '6px 14px', marginBottom: 24, border: '1px solid var(--hr-pink-base)' }}>
            <Flame size={14} style={{ color: 'var(--hr-pink-strong)' }} />
            <span style={{ fontSize: 13, color: 'var(--hr-pink-strong)', fontWeight: 700 }}>{t('typing.streak_full', lang, { n: streak })}</span>
          </div>
        )}

      {src === 'level' && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, fontWeight: 600, color: 'var(--hr-ink-3)', margin: '0 0 4px', letterSpacing: '.14em', textTransform: 'uppercase' }}>{t('typing.level_section_title', lang)}</h2>
          <p style={{ fontSize: 12, color: 'var(--hr-ink-3)', margin: '0 0 14px', lineHeight: 1.5 }}>{t('typing.level_section_desc', lang)}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {LEVEL_META.map((lv, i) => {
              const progress = packMap[`lv-${lv.id}`] ?? null;
              const unlocked = i === 0 || !!packMap[`lv-${LEVEL_META[i - 1].id}`];
              return (
                <button
                  key={lv.id}
                  onClick={() => unlocked && openLevel(lv.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '16px 16px', borderRadius: 14,
                    border: `1.5px solid ${progress ? 'var(--hr-mint-base)' : 'var(--hr-border-2)'}`,
                    background: progress ? 'var(--hr-mint-soft)' : 'var(--hr-surface-2)',
                    cursor: unlocked ? 'pointer' : 'not-allowed', textAlign: 'left',
                    opacity: unlocked ? 1 : 0.55, boxShadow: unlocked ? 'var(--hr-shadow-sm)' : 'none',
                  }}
                >
                  <span style={{ fontSize: 30, flexShrink: 0 }}>{lv.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--hr-ink-1)', margin: '0 0 2px' }}>
                      Lv.{lv.id} {t(lv.name, lang)}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--hr-ink-3)', margin: 0 }}>{t(lv.desc, lang)}</p>
                    {progress && (
                      <p style={{ fontSize: 11, color: 'var(--hr-mint-strong)', margin: '4px 0 0', fontWeight: 600 }}>
                        {t('typing.best_label', lang)} <span style={{ fontFamily: 'var(--hr-serif)', fontStyle: 'italic' }}>{progress.bestWpm}</span> SPM · {progress.bestAccuracy}%
                      </p>
                    )}
                  </div>
                  {progress ? (
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--hr-mint-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={12} style={{ color: '#fff' }} />
                    </div>
                  ) : unlocked ? (
                    <ChevronRight size={18} style={{ color: 'var(--hr-ink-4)', flexShrink: 0 }} />
                  ) : (
                    <Lock size={14} style={{ color: 'var(--hr-ink-3)', flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {src === 'theme' && categories.map(cat => {
        const themes = allThemes.filter(t => t.category === cat);
        return (
          <div key={cat} style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, fontWeight: 600, color: 'var(--hr-ink-3)', margin: '0 0 10px', letterSpacing: '.14em', textTransform: 'uppercase' }}>{cat}</h2>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
              {themes.map(theme => {
                const progress = packMap[theme.id] ?? null;
                const unlocked = isPackUnlockedByMap(theme, allThemes, packMap);
                const wordCount = Math.min(theme.wordIds.length, 8);
                const sentCount = (theme.sentences ?? []).slice(0, 6).length;
                return (
                  <button
                    key={theme.id}
                    onClick={() => unlocked && openIntro(theme.id)}
                    style={{
                      flexShrink: 0, width: 140, padding: '14px 12px', borderRadius: 14,
                      border: `1.5px solid ${progress ? 'var(--hr-mint-base)' : 'var(--hr-border-2)'}`,
                      background: progress ? 'var(--hr-mint-soft)' : 'var(--hr-surface-2)',
                      cursor: unlocked ? 'pointer' : 'not-allowed',
                      textAlign: 'left', position: 'relative', opacity: unlocked ? 1 : 0.55,
                      boxShadow: unlocked ? 'var(--hr-shadow-sm)' : 'none',
                    }}
                  >
                    {progress && (
                      <div style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: '50%', background: 'var(--hr-mint-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={10} style={{ color: '#fff' }} />
                      </div>
                    )}
                    {!unlocked && (
                      <div style={{ position: 'absolute', top: 8, right: 8 }}>
                        <Lock size={12} style={{ color: 'var(--hr-ink-3)' }} />
                      </div>
                    )}
                    <div style={{ fontSize: 26, marginBottom: 6 }}>{theme.emoji}</div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--hr-ink-1)', margin: '0 0 4px', lineHeight: 1.3 }}>{theme.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--hr-ink-3)', margin: 0 }}>{t('typing.theme_count', lang, { w: wordCount, s: sentCount })}</p>
                    {progress && (
                      <p style={{ fontSize: 11, color: 'var(--hr-mint-strong)', margin: '4px 0 0', fontWeight: 600 }}>
                        {t('typing.best_label', lang)} <span style={{ fontFamily: 'var(--hr-serif)', fontStyle: 'italic' }}>{progress.bestWpm}</span> SPM
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* 我的单词本 */}
      {src === 'book' && <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, fontWeight: 600, color: 'var(--hr-ink-3)', margin: '0 0 10px', letterSpacing: '.14em', textTransform: 'uppercase' }}>{t('typing.my_book', lang)}</h2>
        {wordBooks.length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--hr-ink-3)' }}>{t('typing.no_book', lang)}</p>
        ) : (
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
            {wordBooks.map(book => (
              <button
                key={book.id}
                onClick={() => openWordBook(book)}
                style={{
                  flexShrink: 0, width: 140, padding: '14px 12px', borderRadius: 14,
                  border: '1.5px solid var(--hr-border-2)', background: 'var(--hr-surface-2)', cursor: 'pointer',
                  textAlign: 'left', boxShadow: 'var(--hr-shadow-sm)',
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 6 }}>📖</div>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--hr-ink-1)', margin: '0 0 4px', lineHeight: 1.3 }}>{book.name}</p>
                <p style={{ fontSize: 11, color: 'var(--hr-ink-3)', margin: 0 }}>{t('typing.book_word_count', lang, { n: book.wordIds.length })}</p>
              </button>
            ))}
          </div>
        )}
      </div>}

      {/* 我的句子 */}
      {src === 'sentences' && (
        user && mySentenceCount !== null && mySentenceCount > 0 ? (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, fontWeight: 600, color: 'var(--hr-ink-3)', margin: '0 0 10px', letterSpacing: '.14em', textTransform: 'uppercase' }}>{t('typing.my_sentences', lang)}</h2>
          <div style={{ display: 'flex', gap: 10, paddingBottom: 6 }}>
            <button
              onClick={openMySentences}
              style={{
                flexShrink: 0, width: 140, padding: '14px 12px', borderRadius: 14,
                border: '1.5px solid var(--hr-mint-base)', background: 'var(--hr-mint-soft)', cursor: 'pointer',
                textAlign: 'left', boxShadow: 'var(--hr-shadow-sm)',
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 6 }}>🔖</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--hr-ink-1)', margin: '0 0 4px', lineHeight: 1.3 }}>{t('typing.my_saved_sentences', lang)}</p>
              <p style={{ fontSize: 11, color: 'var(--hr-mint-strong)', margin: 0, fontWeight: 600 }}>{t('typing.sentence_count', lang, { n: mySentenceCount })}</p>
            </button>
          </div>
        </div>
        ) : (
        <div style={{ marginBottom: 28, textAlign: 'center', padding: '28px 16px' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📝</div>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--hr-ink-1)', margin: '0 0 6px', lineHeight: 1.3 }}>
            {!user ? t('typing.login_to_save_sentences', lang) : t('typing.no_saved_sentences', lang)}
          </p>
          <p style={{ fontSize: 12, color: 'var(--hr-ink-3)', margin: 0 }}>
            {!user ? t('typing.login_to_save_sentences_hint', lang) : t('typing.no_saved_sentences_hint', lang)}
          </p>
        </div>
        )
      )}
      </div>
    </div>
  );
}
