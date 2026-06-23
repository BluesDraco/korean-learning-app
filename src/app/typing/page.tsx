'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ChevronRight, Trophy, Lock, Check, Flame, Volume2, ArrowLeft } from 'lucide-react';
import { getTheme, getThemeWords, getAllThemes, getThemeCategories } from '@/data/vocabulary';
import { awardXp, updateStreak, getProfile } from '@/lib/gamification';
import { speakWord } from '@/lib/tts';
import { useIsDesktop } from '@/lib/useIsMobile';
import { DiffFeedback } from '@/components/dictation/DiffFeedback';
import { KoreanKeyboardDisplay } from '@/components/dictation/KoreanKeyboardDisplay';
import type { ThemePack } from '@/types';
import { db } from '@/lib/db';
import type { WordBook } from '@/types';
import { useAuth } from '@/components/AuthProvider';
import { normalizeKorean } from '@/lib/koreanDiff';

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

// ── Sound effects via Web Audio API ──────────────────────

function playCorrectSound() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    [523.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.1 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.18);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.18);
    });
    setTimeout(() => ctx.close(), 500);
  } catch { /* ignore */ }
}

function playWrongSound() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.15);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.start(now); osc.stop(now + 0.22);
    setTimeout(() => ctx.close(), 500);
  } catch { /* ignore */ }
}

// ── Storage helpers ───────────────────────────────────────

function getPackProgress(themeId: string): PackProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`typing-pack-${themeId}`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function savePackProgress(themeId: string, p: PackProgress) {
  try { localStorage.setItem(`typing-pack-${themeId}`, JSON.stringify(p)); } catch { /* ignore */ }
}

function getShowTranslation(): boolean {
  try { return localStorage.getItem('typing-show-translation') !== 'false'; } catch { return true; }
}

function setShowTranslationPref(v: boolean) {
  try { localStorage.setItem('typing-show-translation', String(v)); } catch { /* ignore */ }
}

// ── Build items from theme ────────────────────────────────

async function buildTypingItems(themeId: string): Promise<TypingItem[]> {
  const [theme, wordsData] = await Promise.all([getTheme(themeId), getThemeWords(themeId)]);
  if (!theme) return [];
  const words = wordsData.slice(0, 8).map((e, i) => ({
    id: `w-${i}`, korean: e.korean,
    chinese: e.meanings[0]?.chinese ?? '', type: 'word' as const,
  }));
  const sentences = (theme.sentences ?? []).slice(0, 6).map((s, i) => ({
    id: `s-${i}`, korean: s.korean, chinese: s.chinese, type: 'sentence' as const,
  }));
  return [...words, ...sentences];
}

// ── Unlock logic ──────────────────────────────────────────

function isPackUnlocked(theme: ThemePack, allThemes: ThemePack[]): boolean {
  const inCategory = allThemes.filter(t => t.category === theme.category);
  const idx = inCategory.findIndex(t => t.id === theme.id);
  if (idx === 0) return true;
  return getPackProgress(inCategory[idx - 1].id) !== null;
}

// ── WPM ──────────────────────────────────────────────────

function calcWpm(chars: number, ms: number): number {
  if (ms <= 0) return 0;
  return Math.round((chars / 5) / (ms / 60000));
}

// ── Char-level target display ─────────────────────────────

function TargetChars({ target, input }: { target: string; input: string }) {
  const chars = Array.from(target);
  const typed = Array.from(input);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'flex-end', flex: 1 }}>
      {chars.map((ch, i) => {
        let charColor = '#d4c5be';
        let underColor = '#eee0d8';
        let isCurrent = false;
        let strikethrough = false;
        let glow = '';

        if (i < typed.length) {
          if (typed[i] === ch) {
            charColor = 'var(--color-mint-strong)';
            underColor = 'var(--color-mint-soft)';
            glow = '0 0 8px #aee3d870';
          } else {
            charColor = '#e04a6a';
            underColor = 'var(--color-pink-base)';
            strikethrough = true;
          }
        } else if (i === typed.length) {
          charColor = '#241917';
          underColor = 'var(--color-pink-base)';
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

export default function TypingPage() {
  const { user, loading: authLoading } = useAuth();
  const [pageState, setPageState] = useState<PageState>('home');
  const [activeThemeId, setActiveThemeId] = useState('');
  const [items, setItems] = useState<TypingItem[]>([]);
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
  const [xpTotal, setXpTotal] = useState(0);
  const [showTranslation, setShowTranslation] = useState(true);
  const [resultData, setResultData] = useState<{ wpm: number; accuracy: number; elapsed: number; xp: number } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const correctCountRef = useRef(0);
  const xpTotalRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const comboRef = useRef(0);
  const autoAdvancingRef = useRef(false);

  const isDesktop = useIsDesktop();

  useEffect(() => {
    getProfile().then(p => setStreak(p.streak)).catch(() => {});
    setShowTranslation(getShowTranslation());
  }, []);

  useEffect(() => {
    if (startTime && pageState === 'session') {
      timerRef.current = setInterval(() => setElapsed(Date.now() - startTime), 300);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTime, pageState]);

  // Auto-play TTS on item change
  useEffect(() => {
    if (pageState === 'session' && items[index]) {
      const t = setTimeout(() => speakWord(items[index].korean, 0.85), 300);
      return () => clearTimeout(t);
    }
  }, [index, pageState, items]);

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

  useEffect(() => {
    if (authLoading || !user) return;
    db.wordBooks.toArray().then(books => setWordBooks(books.filter(b => b.wordIds.length > 0 && !b.id.startsWith('yonsei-') && !b.id.startsWith('seoul-')))).catch(() => {});
    db.sentences.count().then(n => setMySentenceCount(n)).catch(() => setMySentenceCount(0));
  }, [user, authLoading]);

  async function openIntro(themeId: string, prebuilt?: TypingItem[]) {
    const built = prebuilt ?? await buildTypingItems(themeId);
    if (built.length === 0) return;
    setActiveThemeId(themeId);
    setItems(built);
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

  function startPack() {
    setIndex(0); setInput(''); setSubmitted(false); setLastCorrect(null);
    setStartTime(null); setElapsed(0); setCorrectCount(0); setXpTotal(0); setCombo(0);
    correctCountRef.current = 0; xpTotalRef.current = 0;
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

  const current = items[index];

  const handleSubmit = useCallback(() => {
    if (!current || !input.trim() || submitted || isComposing) return;
    const isCorrect = normalizeKorean(input) === normalizeKorean(current.korean);
    setSubmitted(true);
    setLastCorrect(isCorrect);
    if (isCorrect) {
      playCorrectSound();
      correctCountRef.current += 1;
      setCorrectCount(correctCountRef.current);
      awardXp(5).catch(() => {});
      xpTotalRef.current += 5;
      setXpTotal(xpTotalRef.current);
      comboRef.current += 1;
      setCombo(comboRef.current);
      autoAdvancingRef.current = true;
      setTimeout(() => { autoAdvancingRef.current = false; handleNext(); }, 600);
    } else {
      playWrongSound();
      comboRef.current = 0;
      setCombo(0);
    }
  }, [input, submitted, isComposing, current]);

  function handleNext() {
    if (index + 1 >= items.length) {
      finishSession();
    } else {
      setIndex(i => i + 1);
      setInput(''); setSubmitted(false); setLastCorrect(null);
    }
  }

  function finishSession() {
    const ms = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
    const totalChars = items.reduce((s, it) => s + it.korean.replace(/\s/g, '').length, 0);
    const wpm = calcWpm(totalChars, ms);
    const accuracy = items.length > 0 ? Math.round((correctCountRef.current / items.length) * 100) : 0;
    const xp = xpTotalRef.current;
    const prev = getPackProgress(activeThemeId);
    savePackProgress(activeThemeId, {
      completedAt: Date.now(),
      bestWpm: Math.max(wpm, prev?.bestWpm ?? 0),
      bestAccuracy: Math.max(accuracy, prev?.bestAccuracy ?? 0),
      practiceCount: (prev?.practiceCount ?? 0) + 1,
    });
    updateStreak().catch(() => {});
    getProfile().then(p => setStreak(p.streak)).catch(() => {});
    setResultData({ wpm, accuracy, elapsed: ms, xp });
    setPageState('result');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      if (!submitted) handleSubmit();
      else if (!autoAdvancingRef.current) handleNext();
    }
  }

  function toggleTranslation() {
    const next = !showTranslation;
    setShowTranslation(next);
    setShowTranslationPref(next);
  }

  const elapsedSec = Math.floor(elapsed / 1000);
  const elapsedDisplay = `${Math.floor(elapsedSec / 60)}:${String(elapsedSec % 60).padStart(2, '0')}`;

  // ── Intro ─────────────────────────────────────────────────
  if (pageState === 'intro') {
    const theme = allThemes.find(t => t.id === activeThemeId);
    const displayEmoji = theme?.emoji ?? '📖';
    const displayName = theme?.name ?? wordBooks.find(b => `wb-${b.id}` === activeThemeId)?.name ?? (activeThemeId === 'my-sentences' ? '我的句子' : '我的单词本');
    const displayDesc = theme?.description ?? '来自单词本的词汇与例句';
    const previewWords = items.filter(i => i.type === 'word').slice(0, 6);
    const previewSents = items.filter(i => i.type === 'sentence').slice(0, 3);
    return (
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '8px 0 100px' }}>
        <div style={{ background: 'linear-gradient(135deg, #ff7fa8, #b49ccf)', borderRadius: 24, padding: '28px 24px', marginBottom: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>{displayEmoji}</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: 'white', margin: '0 0 8px' }}>{displayName}</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.6 }}>{displayDesc}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {[{ label: '单词', value: previewWords.length }, { label: '句子', value: previewSents.length }, { label: '合计', value: items.length }].map(s => (
            <div key={s.label} style={{ flex: 1, background: 'white', borderRadius: 14, border: '1px solid #eee0d8', padding: '12px 8px', textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#241917', margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: '#89756e', margin: '2px 0 0' }}>{s.label}</p>
            </div>
          ))}
        </div>
        {previewWords.length > 0 && (
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #eee0d8', padding: '16px', marginBottom: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#89756e', margin: '0 0 12px', letterSpacing: '0.05em' }}>将要练习的单词</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {previewWords.map((item, i) => (
                <div key={i} style={{ background: 'var(--color-pink-soft)', borderRadius: 10, padding: '6px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#241917', fontFamily: "'Malgun Gothic', sans-serif" }}>{item.korean}</span>
                  <span style={{ fontSize: 10, color: '#89756e' }}>{item.chinese}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {previewSents.length > 0 && (
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #eee0d8', padding: '16px', marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#89756e', margin: '0 0 12px', letterSpacing: '0.05em' }}>将要练习的句子</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {previewSents.map((item, i) => (
                <div key={i} style={{ borderLeft: '3px solid #aee3d8', paddingLeft: 10 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#241917', margin: '0 0 2px', fontFamily: "'Malgun Gothic', sans-serif" }}>{item.korean}</p>
                  <p style={{ fontSize: 12, color: '#89756e', margin: 0 }}>{item.chinese}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ background: '#f5ede8', borderRadius: 12, padding: '10px 14px', marginBottom: 20, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 16 }}>💡</span>
          <p style={{ fontSize: 12, color: '#5a4640', margin: 0, lineHeight: 1.6 }}>
            每题自动播放发音，可点 🔊 重听。答对得 5 XP，连续答对有连击奖励！
            {isDesktop && ' 电脑端提供虚拟键盘高亮对照。'}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={startPack} style={{ padding: '14px 0', borderRadius: 16, background: '#241917', color: '#fff', fontSize: 15, fontWeight: 800, border: 'none', cursor: 'pointer' }}>
            开始打字 →
          </button>
          <button onClick={() => setPageState('home')} style={{ padding: '12px 0', borderRadius: 16, background: '#f5ede8', color: '#5a4640', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            返回
          </button>
        </div>
      </div>
    );
  }

  // ── Result ────────────────────────────────────────────────
  if (pageState === 'result' && resultData) {
    const theme = allThemes.find(t => t.id === activeThemeId);
    const resEmoji = theme?.emoji ?? '📖';
    const resName = theme?.name ?? wordBooks.find(b => `wb-${b.id}` === activeThemeId)?.name ?? (activeThemeId === 'my-sentences' ? '我的句子' : '我的单词本');
    const resSec = Math.floor(resultData.elapsed / 1000);
    const resDisplay = `${Math.floor(resSec / 60)}:${String(resSec % 60).padStart(2, '0')}`;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 20, padding: '20px' }}>
        <div style={{ background: 'var(--color-pink-soft)', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Trophy size={36} style={{ color: 'var(--color-pink-base)' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#89756e', margin: '0 0 4px' }}>完成主题包</p>
          <p style={{ fontSize: 22, fontWeight: 900, color: '#241917', margin: 0 }}>{resEmoji} {resName}</p>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[{ label: '正确率', value: `${resultData.accuracy}%` }, { label: 'WPM', value: String(resultData.wpm) }, { label: '用时', value: resDisplay }].map(stat => (
            <div key={stat.label} style={{ background: 'white', borderRadius: 14, border: '1px solid #eee0d8', padding: '12px 20px', textAlign: 'center', minWidth: 80 }}>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#241917', margin: 0 }}>{stat.value}</p>
              <p style={{ fontSize: 11, color: '#89756e', margin: '2px 0 0' }}>{stat.label}</p>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--color-mint-soft)', borderRadius: 14, padding: '10px 20px' }}>
          <span style={{ fontSize: 13, color: 'var(--color-mint-strong)', fontWeight: 700 }}>+{resultData.xp} XP 已获得</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 340, marginTop: 8 }}>
          <button onClick={startPack} style={{ padding: '13px 0', borderRadius: 14, background: '#241917', color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            再练一次
          </button>
          <button onClick={() => setPageState('home')} style={{ padding: '13px 0', borderRadius: 14, background: '#f5ede8', color: '#5a4640', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            返回主题
          </button>
        </div>
      </div>
    );
  }

  // ── Session ───────────────────────────────────────────────
  if (pageState === 'session' && current) {
    const cardBorderColor = submitted ? (lastCorrect ? 'var(--color-mint-soft)' : 'var(--color-pink-base)') : '#eee0d8';
    const cardBg = submitted ? (lastCorrect ? '#f0faf8' : '#fff5f7') : 'white';
    const cardShadow = submitted
      ? lastCorrect ? '0 4px 24px #aee3d840' : '0 4px 24px #ff7fa830'
      : '0 2px 16px rgba(78,52,46,.06)';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 40, maxWidth: 600, margin: '0 auto' }}>
        <style>{`
          @keyframes pulse-block { 0%,100%{opacity:1} 50%{opacity:.5} }
          @keyframes combo-pop { from{transform:scale(.6);opacity:0} to{transform:scale(1);opacity:1} }
          @keyframes blink-underline { 0%,100%{opacity:1} 50%{opacity:0} }
        `}</style>

        {/* Pixel progress + combo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 3, flex: 1 }}>
            {items.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 8, borderRadius: 3,
                background: i < index ? 'var(--color-pink-base)' : i === index ? '#ffb8cf' : '#eee0d8',
                boxShadow: i < index ? '0 0 5px #ff7fa840' : 'none',
                animation: i === index ? 'pulse-block 1s infinite' : 'none',
              }} />
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#89756e', whiteSpace: 'nowrap' }}>{index + 1} / {items.length}</span>
          <span style={{ fontSize: 12, color: '#89756e', fontVariantNumeric: 'tabular-nums' }}>{elapsedDisplay}</span>
        </div>

        {/* Combo badge */}
        {combo >= 2 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              background: 'linear-gradient(135deg, #ff7fa8, #b49ccf)',
              borderRadius: 20, padding: '4px 14px',
              fontSize: 13, fontWeight: 800, color: 'white',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 4px 14px #ff7fa840',
              animation: 'combo-pop 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
            }}>
              <span>🔥 连击</span>
              <span style={{ fontSize: 18 }}>{combo}</span>
            </div>
          </div>
        )}

        {/* Card */}
        <div style={{
          background: cardBg, borderRadius: 20,
          border: `1.5px solid ${cardBorderColor}`,
          padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 14,
          boxShadow: cardShadow,
          transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Top accent line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #ff7fa8, #b49ccf, transparent)', opacity: 0.5 }} />

          {/* Translation row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontSize: 14, fontWeight: 500,
              color: showTranslation ? '#5a4640' : 'transparent',
              background: showTranslation ? 'transparent' : '#eee0d8',
              borderRadius: 6, transition: 'all 0.15s', padding: showTranslation ? 0 : '2px 8px',
            }}>
              {current.chinese}
            </span>
            <button onClick={toggleTranslation} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#89756e', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }}>
              {showTranslation ? <Eye size={13} /> : <EyeOff size={13} />}
              {showTranslation ? '隐藏' : '显示'}
            </button>
          </div>

          {/* Target chars + speaker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <TargetChars target={current.korean} input={input} />
            <button
              onClick={() => speakWord(current.korean, 0.85)}
              style={{ flexShrink: 0, width: 42, height: 42, borderRadius: '50%', background: 'var(--color-pink-soft)', border: '1.5px solid #ffd6e5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
            >
              <Volume2 size={17} style={{ color: 'var(--color-pink-base)' }} />
            </button>
          </div>

          {/* Type badge */}
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, alignSelf: 'flex-start',
            color: current.type === 'word' ? 'var(--color-pink-base)' : 'var(--color-mint-strong)',
            background: current.type === 'word' ? 'var(--color-pink-soft)' : 'var(--color-mint-soft)',
            border: `1px solid ${current.type === 'word' ? '#ffd6e5' : '#aee3d860'}`,
          }}>
            {current.type === 'word' ? '单词' : '句子'}
          </span>
        </div>

        {/* Input or diff feedback */}
        {!submitted ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                onKeyDown={handleKeyDown}
                placeholder="用韩语键盘输入..."
                style={{
                  width: '100%', padding: '15px 52px 15px 18px', borderRadius: 14,
                  border: '2px solid #eee0d8', fontSize: 20, color: '#241917',
                  outline: 'none', fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif",
                  boxSizing: 'border-box', background: 'white', caretColor: 'var(--color-pink-base)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--color-pink-base)'; e.target.style.boxShadow = '0 0 0 4px #ff7fa815'; }}
                onBlur={e => { e.target.style.borderColor = '#eee0d8'; e.target.style.boxShadow = 'none'; }}
              />
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: '#f5ede8', borderRadius: 6, padding: '3px 7px', fontSize: 10, color: '#89756e' }}>↵</span>
            </div>
            <p style={{ fontSize: 11, color: '#89756e', marginTop: 2 }}>请切换系统键盘为韩语后输入</p>

            {/* Desktop keyboard */}
            {isDesktop && <KoreanKeyboardDisplay value={input} />}

            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              style={{
                padding: '13px 0', borderRadius: 14,
                background: input.trim() ? '#241917' : '#eee0d8',
                color: input.trim() ? '#fff' : '#89756e',
                fontSize: 14, fontWeight: 700, border: 'none',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                boxShadow: input.trim() ? '0 4px 16px rgba(36,25,23,.18)' : 'none',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
            >
              提交
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <DiffFeedback userInput={input.replace(/\s/g, '')} correct={current.korean.replace(/\s/g, '')} />
            <button
              onClick={handleNext}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '13px 0', borderRadius: 14,
                background: 'linear-gradient(135deg, #ff7fa8, #b49ccf)',
                color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 16px #ff7fa840',
              }}
            >
              {index + 1 >= items.length ? '查看结果' : '下一条'}
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Home ─────────────────────────────────────────────────
  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ marginBottom: 16 }}>
        <Link href="/tools" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#89756e', textDecoration: 'none', marginBottom: 10 }}>
          <ArrowLeft size={15} /> 返回
        </Link>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#241917', margin: 0 }}>韩文打字</h1>
        <p style={{ fontSize: 13, color: '#89756e', marginTop: 4, marginBottom: 0 }}>选择主题包，边打字边学词汇</p>
      </div>

      {streak > 0 && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--color-pink-soft)', borderRadius: 20, padding: '6px 14px', marginBottom: 20 }}>
          <Flame size={14} style={{ color: 'var(--color-pink-base)' }} />
          <span style={{ fontSize: 13, color: 'var(--color-pink-base)', fontWeight: 700 }}>连续练习 {streak} 天</span>
        </div>
      )}

      {categories.map(cat => {
        const themes = allThemes.filter(t => t.category === cat);
        return (
          <div key={cat} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: '#89756e', margin: '0 0 10px', letterSpacing: '0.05em' }}>{cat}</h2>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
              {themes.map(theme => {
                const progress = getPackProgress(theme.id);
                const unlocked = isPackUnlocked(theme, allThemes);
                const wordCount = Math.min(theme.wordIds.length, 8);
                const sentCount = (theme.sentences ?? []).slice(0, 6).length;
                return (
                  <button
                    key={theme.id}
                    onClick={() => unlocked && openIntro(theme.id)}
                    style={{
                      flexShrink: 0, width: 140, padding: '14px 12px', borderRadius: 16,
                      border: `1.5px solid ${progress ? 'var(--color-mint-soft)' : unlocked ? '#eee0d8' : '#eee0d8'}`,
                      background: progress ? 'var(--color-mint-soft)' : unlocked ? 'white' : '#f9f4f0',
                      cursor: unlocked ? 'pointer' : 'not-allowed',
                      textAlign: 'left', position: 'relative', opacity: unlocked ? 1 : 0.6,
                      boxShadow: unlocked ? '0 2px 12px rgba(78,52,46,.06)' : 'none',
                    }}
                  >
                    {progress && (
                      <div style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: '50%', background: 'var(--color-mint-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={10} style={{ color: 'white' }} />
                      </div>
                    )}
                    {!unlocked && (
                      <div style={{ position: 'absolute', top: 8, right: 8 }}>
                        <Lock size={12} style={{ color: '#89756e' }} />
                      </div>
                    )}
                    <div style={{ fontSize: 26, marginBottom: 6 }}>{theme.emoji}</div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#241917', margin: '0 0 4px', lineHeight: 1.3 }}>{theme.name}</p>
                    <p style={{ fontSize: 11, color: '#89756e', margin: 0 }}>{wordCount}词 · {sentCount}句</p>
                    {progress && (
                      <p style={{ fontSize: 11, color: 'var(--color-mint-strong)', margin: '4px 0 0', fontWeight: 600 }}>
                        最佳 {progress.bestWpm} WPM
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
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: '#89756e', margin: '0 0 10px', letterSpacing: '0.05em' }}>我的单词本</h2>
        {wordBooks.length === 0 ? (
          <p style={{ fontSize: 13, color: '#89756e' }}>暂无单词本，请先在词汇页添加单词。</p>
        ) : (
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
            {wordBooks.map(book => (
              <button
                key={book.id}
                onClick={() => openWordBook(book)}
                style={{
                  flexShrink: 0, width: 140, padding: '14px 12px', borderRadius: 16,
                  border: '1.5px solid #eee0d8', background: 'white', cursor: 'pointer',
                  textAlign: 'left', boxShadow: '0 2px 12px rgba(78,52,46,.06)',
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 6 }}>📖</div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#241917', margin: '0 0 4px', lineHeight: 1.3 }}>{book.name}</p>
                <p style={{ fontSize: 11, color: '#89756e', margin: 0 }}>{book.wordIds.length} 个词</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 我的句子 */}
      {user && mySentenceCount !== null && mySentenceCount > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: '#89756e', margin: '0 0 10px', letterSpacing: '0.05em' }}>我的句子</h2>
          <div style={{ display: 'flex', gap: 10, paddingBottom: 6 }}>
            <button
              onClick={openMySentences}
              style={{
                flexShrink: 0, width: 140, padding: '14px 12px', borderRadius: 16,
                border: '1.5px solid #aee3d8', background: 'var(--color-mint-soft)', cursor: 'pointer',
                textAlign: 'left', boxShadow: '0 2px 12px rgba(78,52,46,.06)',
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 6 }}>🔖</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#241917', margin: '0 0 4px', lineHeight: 1.3 }}>我收藏的句子</p>
              <p style={{ fontSize: 11, color: 'var(--color-mint-strong)', margin: 0, fontWeight: 600 }}>{mySentenceCount} 条句子</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
