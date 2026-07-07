'use client'

import React, { useState, useEffect, useRef, Suspense, createContext, useContext, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Search, X, AlertCircle, Volume2, Lightbulb, ChevronDown, ChevronRight, Lock, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { sentencePatterns, getTodayPattern, getRecommendedPatterns } from '@/data/grammar-new';
import { grammarPoints, type GrammarPoint as LegacyPoint } from '@/data/grammar';
import { grammarParts } from '@/data/grammar-parts';
import { GrammarSession } from '@/components/grammar/GrammarSession';
import { db } from '@/lib/db';
import { speak } from '@/lib/tts';
import { useAuth } from '@/components/AuthProvider';
import type { GrammarPoint, GrammarCard, UserGrammarState, ConnectionRule } from '@/types';
import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C as _LIGHT_C, DARK_C as _DARK_C } from '@/lib/theme';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/useToast';

// grammar-cards 按 Part 动态加载，避免 1MB 数据阻塞首屏
const partLoaders: Record<string, () => Promise<{ [key: string]: GrammarCard[] }>> = {
  p1: () => import('@/data/grammar-cards-p1') as any,
  p2: () => import('@/data/grammar-cards-p2') as any,
  p3: () => import('@/data/grammar-cards-p3') as any,
  p4: () => import('@/data/grammar-cards-p4') as any,
  p5: () => import('@/data/grammar-cards-p5') as any,
  p6: () => import('@/data/grammar-cards-p6') as any,
  p7: () => import('@/data/grammar-cards-p7') as any,
  p8: () => import('@/data/grammar-cards-p8') as any,
  p9: () => import('@/data/grammar-cards-p9') as any,
  p10: () => import('@/data/grammar-cards-p10') as any,
  p11: () => import('@/data/grammar-cards-p11') as any,
  p12: () => import('@/data/grammar-cards-p12') as any,
  p13: () => import('@/data/grammar-cards-p13') as any,
  p14: () => import('@/data/grammar-cards-p14') as any,
  p15: () => import('@/data/grammar-cards-p15') as any,
  p16: () => import('@/data/grammar-cards-p16') as any,
  p17: () => import('@/data/grammar-cards-p17') as any,
  p18: () => import('@/data/grammar-cards-p18') as any,
  p19: () => import('@/data/grammar-cards-p19') as any,
  p20: () => import('@/data/grammar-cards-p20') as any,
  p21: () => import('@/data/grammar-cards-p21') as any,
  p22: () => import('@/data/grammar-cards-p22') as any,
  p23: () => import('@/data/grammar-cards-p23') as any,
  p24: () => import('@/data/grammar-cards-p24') as any,
  p25: () => import('@/data/grammar-cards-p25') as any,
  p26: () => import('@/data/grammar-cards-p26') as any,
  p27: () => import('@/data/grammar-cards-p27') as any,
  p28: () => import('@/data/grammar-cards-p28') as any,
  p29: () => import('@/data/grammar-cards-p29') as any,
  p30: () => import('@/data/grammar-cards-p30') as any,
  p31: () => import('@/data/grammar-cards-p31') as any,
};

const partCache: Record<string, GrammarCard[]> = {};

async function loadPartCards(part: string): Promise<GrammarCard[]> {
  if (partCache[part]) return partCache[part];
  try {
    const mod = await partLoaders[part]();
    const key = Object.keys(mod)[0];
    partCache[part] = mod[key] as GrammarCard[];
    return partCache[part];
  } catch (e) {
    console.error(`[grammar] loadPartCards failed for ${part}`, e);
    return [];
  }
}

async function loadGrammarCard(cardId: string): Promise<GrammarCard | null> {
  const match = cardId.match(/^card-(p\d+)-/);
  if (!match) return null;
  const cards = await loadPartCards(match[1]);
  return cards.find(c => c.id === cardId) ?? null;
}

const PART_ORDER = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31'];

async function loadNextCard(cardId: string): Promise<GrammarCard | null> {
  const match = cardId.match(/^card-(p\d+)-l(\d+)$/);
  if (!match) return null;
  const part = match[1];
  const lesson = parseInt(match[2], 10);
  const nextId = `card-${part}-l${String(lesson + 1).padStart(2, '0')}`;
  const cards = await loadPartCards(part);
  const next = cards.find(c => c.id === nextId);
  if (next) return next;
  // Try first card of next part
  const nextPartIdx = PART_ORDER.indexOf(part) + 1;
  if (nextPartIdx >= PART_ORDER.length) return null;
  const nextPart = PART_ORDER[nextPartIdx];
  const nextPartCards = await loadPartCards(nextPart);
  return nextPartCards[0] ?? null;
}

const LIGHT_C = { ..._LIGHT_C, purple: 'var(--color-purple-base)', purpleBg: 'var(--color-purple-soft)' };
const DARK_C  = { ..._DARK_C, purple: 'var(--color-purple-base)', purpleBg: 'var(--color-surface-3)' };

const ColorCtx = createContext<typeof LIGHT_C>(LIGHT_C);
const useC = () => useContext(ColorCtx);

const GRAMMAR_STYLES = `
    /* L1-L5 design system */
    .hook-box { background: linear-gradient(135deg,color-mix(in srgb,var(--color-pink-base) 12%,var(--bg-card)),color-mix(in srgb,var(--color-mint-soft) 20%,var(--bg-card))); border-radius: 22px; padding: 20px; margin-bottom: 16px; }
    .reminder-box { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 14px; padding: 16px 18px; font-size: 16px; color: var(--text-secondary); line-height: 1.75; }
    .reminder-box .hl, .reminder-box b { color: var(--color-pink-base); font-weight: 700; }
    .compare-grid { display: grid; grid-template-columns: 1fr; border-radius: 18px; overflow: hidden; border: 1px solid var(--border-color); margin-bottom: 16px; }
    @media (min-width: 480px) { .compare-grid { grid-template-columns: 1fr 1fr; } }
    .cc { padding: 18px 16px; }
    .cc.formal { background: color-mix(in srgb,var(--color-status-info) 12%,var(--bg-card)); }
    .cc.daily { background: color-mix(in srgb,var(--color-pink-base) 10%,var(--bg-card)); }
    .cc-lang { font-size: 12px; font-weight: 800; letter-spacing: .1em; color: var(--text-muted); margin-bottom: 10px; }
    .compare-note { background: var(--bg-soft); border-radius: 14px; padding: 16px 18px; font-size: 16px; color: var(--text-secondary); line-height: 1.75; }
    .compare-note .hl { color: var(--color-pink-base); font-weight: 700; }
    .pill { display: inline-block; padding: 4px 10px; border-radius: 8px; font-size: 16px; font-weight: 800; }
    .p-s { background: color-mix(in srgb,var(--color-mint-strong) 18%,var(--bg-card)); color: var(--color-mint-strong); }
    .p-o { background: color-mix(in srgb,var(--color-purple-base) 18%,var(--bg-card)); color: var(--color-purple-base); }
    .p-v { background: var(--color-pink-base); color: white; }
    .p-n { background: color-mix(in srgb,var(--color-status-info) 18%,var(--bg-card)); color: var(--color-status-info); }
    .p-q { background: color-mix(in srgb,var(--color-gold-strong) 18%,var(--bg-card)); color: var(--color-gold-strong); }
    .tok-row { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px; }
    .tok { padding: 7px 13px; border-radius: 9px; font-size: 16px; font-weight: 700; }
    .t-s { background: color-mix(in srgb,var(--color-mint-strong) 18%,var(--bg-card)); color: var(--color-mint-strong); }
    .t-o { background: color-mix(in srgb,var(--color-purple-base) 18%,var(--bg-card)); color: var(--color-purple-base); }
    .t-v { background: var(--color-pink-base); color: white; }
    .t-p { background: color-mix(in srgb,var(--color-peach-strong) 18%,var(--bg-card)); color: var(--color-peach-strong); }
    .t-n { background: color-mix(in srgb,var(--color-status-info) 18%,var(--bg-card)); color: var(--color-status-info); }
    .t-q { background: color-mix(in srgb,var(--color-gold-strong) 18%,var(--bg-card)); color: var(--color-gold-strong); }
    .word-col { display: flex; flex-direction: column; gap: 10px; }
    /* L6-L10 design system */
    .block { background: var(--bg-card); border-radius: 14px; padding: 18px; margin-bottom: 14px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .block .h2 { font-size: .95rem; font-weight: 700; margin-bottom: 10px; color: var(--color-mint-strong); }
    .ko { font-size: 17px; font-weight: 700; color: var(--text-primary); }
    .zh { font-size: 16px; color: var(--text-muted); margin-top: 4px; line-height: 1.6; }
    /* Step0Html / CompareHtml 兜底类（让简陋骨架卡片有基本样式） */
    .sub { color: var(--text-muted); font-size: 16px; margin-bottom: 22px; }
    .step0-hook { display: flex; flex-direction: column; gap: 14px; }
    .hook-sent { background: var(--bg-input); border-radius: 14px; padding: 14px 16px; display: flex; flex-direction: column; gap: 4px; }
    .hook-sent .ko { font-size: 17px; font-weight: 800; color: var(--text-primary); }
    .hook-sent .zh { font-size: 15px; color: var(--text-muted); margin-top: 0; }
    .compare { display: flex; flex-direction: column; gap: 14px; margin: 12px 0; }
    .cmp-block { background: var(--bg-card); border-radius: 14px; padding: 16px 18px; border: 1px solid var(--border-color); box-shadow: 0 1px 4px rgba(0,0,0,.04); }
    .cmp-title { font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 10px; }
    .cmp-row { font-size: 16px; color: var(--text-secondary); line-height: 1.7; padding: 4px 0; display: flex; flex-wrap: wrap; gap: 8px; align-items: baseline; }
    .cmp-row .badge { font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px; background: color-mix(in srgb,var(--color-pink-base) 12%,var(--bg-card)); color: var(--color-pink-base); letter-spacing: .04em; flex-shrink: 0; }
    .cmp-row .ko { font-size: 16px; font-weight: 700; }
    .cmp-row .zh { font-size: 15px; color: var(--text-muted); margin-top: 0; }
    .row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 8px; }
    .chip { padding: 6px 13px; border-radius: 20px; font-size: .88rem; font-weight: 600; cursor: pointer; border: 2px solid transparent; transition: all .15s; }
    .chip.s { background: color-mix(in srgb,var(--color-mint-strong) 18%,var(--bg-card)); color: var(--color-mint-strong); border-color: color-mix(in srgb,var(--color-mint-strong) 30%,var(--bg-card)); }
    .chip.o { background: color-mix(in srgb,var(--color-purple-strong) 18%,var(--bg-card)); color: var(--color-purple-strong); border-color: color-mix(in srgb,var(--color-purple-strong) 30%,var(--bg-card)); }
    .chip.v { background: color-mix(in srgb,var(--color-pink-strong) 18%,var(--bg-card)); color: var(--color-pink-strong); border-color: color-mix(in srgb,var(--color-pink-strong) 30%,var(--bg-card)); }
    .chip.p { background: color-mix(in srgb,var(--color-peach-strong) 18%,var(--bg-card)); color: var(--color-peach-strong); border-color: color-mix(in srgb,var(--color-peach-strong) 30%,var(--bg-card)); }
    .chip.t { background: color-mix(in srgb,var(--color-status-info) 18%,var(--bg-card)); color: var(--color-status-info); border-color: color-mix(in srgb,var(--color-status-info) 30%,var(--bg-card)); }
    .chip.n { background: color-mix(in srgb,var(--color-ink-3) 18%,var(--bg-card)); color: var(--color-ink-3); border-color: color-mix(in srgb,var(--color-ink-3) 30%,var(--bg-card)); }
    table { width: 100%; border-collapse: collapse; font-size: .86rem; }
    th { background: color-mix(in srgb,var(--color-pink-base) 15%,var(--bg-card)); color: var(--color-pink-strong); padding: 7px 10px; text-align: left; font-weight: 700; }
    td { padding: 7px 10px; border-bottom: 1px solid var(--border-color); color: var(--text-primary); }
    tr:last-child td { border-bottom: none; }
    .card-title { font-size: 21px; font-weight: 900; color: var(--text-primary); line-height: 1.3; margin: 0 0 10px 0; }
    .card-body { font-size: 16px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 12px; }
    .card-body b { color: var(--text-primary); }
    /* Overview / completion page design systems */
    .overview { padding: 0 2px; }
    .ov-hero { background: linear-gradient(135deg,color-mix(in srgb,var(--color-pink-base) 15%,var(--bg-card)),color-mix(in srgb,var(--color-mint-soft) 20%,var(--bg-card))); border-radius: 24px; padding: 22px 20px; margin-bottom: 16px; }
    .ov-hero-label { font-size: 12px; font-weight: 800; color: var(--color-pink-base); letter-spacing: .08em; margin-bottom: 6px; }
    .ov-hero-title { font-size: 22px; font-weight: 900; color: var(--text-primary); margin-bottom: 6px; }
    .ov-hero-sub { font-size: 16px; color: var(--text-secondary); line-height: 1.6; }
    .ov-section { margin-bottom: 14px; }
    .ov-section-hd { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; padding: 0 2px; }
    .ov-section-line { width: 3px; height: 16px; border-radius: 99px; flex-shrink: 0; }
    .ov-section-title { font-size: 16px; font-weight: 800; letter-spacing: .05em; color: var(--text-primary); }
    .ov-block { background: var(--bg-card); border-radius: 18px; padding: 16px 18px; border: 1px solid var(--border-color); box-shadow: 0 2px 8px rgba(78,52,46,.05); margin-bottom: 14px; }
    .struct-zh { font-size: 16px; color: var(--text-muted); margin-top: 3px; }
    .t-t { background: var(--color-gold-soft); color: var(--color-gold-strong); padding: 5px 11px; border-radius: 9px; font-size: 16px; font-weight: 700; }
    .mistake { border-radius: 14px; overflow: hidden; border: 1px solid var(--border-color); margin-bottom: 16px; }
    .m-w { background: color-mix(in srgb,var(--color-status-danger) 8%,var(--bg-card)); padding: 13px 16px; display: flex; align-items: center; gap: 10px; }
    .m-r { background: color-mix(in srgb,var(--color-mint-strong) 8%,var(--bg-card)); padding: 13px 16px; display: flex; align-items: center; gap: 10px; }
    .m-txt { font-size: 16px; color: var(--text-primary); line-height: 1.6; }
    .m-note { font-size: 16px; color: var(--text-muted); margin-top: 6px; line-height: 1.7; }
    .bx { background: var(--color-status-danger); color: white; font-size: 12px; font-weight: 800; padding: 2px 7px; border-radius: 99px; flex-shrink: 0; }
    .bo { background: var(--color-mint-strong); color: white; font-size: 12px; font-weight: 800; padding: 2px 7px; border-radius: 99px; flex-shrink: 0; }
    .table-wrap { border-radius: 10px; overflow: hidden; border: 1px solid var(--border-color); }
    .tbl-row { display: flex; }
    .tbl-row.hd .tc { background: color-mix(in srgb,var(--color-pink-base) 12%,var(--bg-card)); color: var(--color-pink-strong); font-weight: 800; font-size: 13px; }
    .tc { flex: 1; padding: 10px 12px; font-size: 16px; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
    .tbl-row:last-child .tc { border-bottom: none; }
    /* L6-L10 overview */
    .ov-title { font-size: 22px; font-weight: 900; color: var(--text-primary); margin: 8px 0 4px; }
    .ov-sub { font-size: 16px; color: var(--text-muted); margin-bottom: 14px; }
    .ov-sec { background: var(--bg-card); border-radius: 14px; padding: 16px 18px; margin-bottom: 14px; border: 1px solid var(--border-color); box-shadow: 0 2px 6px rgba(78,52,46,.05); }
    .ov-sec h3 { font-size: 16px; font-weight: 800; color: var(--color-mint-strong); margin: 0 0 10px 0; }
    .badge { display: inline-block; background: color-mix(in srgb,var(--color-pink-base) 15%,var(--bg-card)); color: var(--color-pink-base); font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 99px; letter-spacing: .05em; margin-bottom: 4px; }
    .relearn-btn { width: 100%; padding: 13px; border-radius: 16px; border: 1.5px solid var(--border-color); background: var(--bg-card); color: var(--text-muted); font-size: 13px; font-weight: 700; cursor: pointer; margin-top: 8px; }
    /* 三端响应式 */
    @media (min-width: 768px) {
      .ov-hero-title { font-size: 24px; }
      .ov-title { font-size: 24px; }
      .ov-block { padding: 18px 22px; }
      .ov-sec { padding: 18px 22px; }
    }
    @media (min-width: 1024px) {
      .ov-hero-title { font-size: 26px; }
      .ov-title { font-size: 26px; }
    }
    /* 桌面两列布局 */
    .overview-desktop .overview { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start; }
    .overview-desktop .ov-hero { grid-column: 1 / -1; }
    .overview-desktop .badge { grid-column: 1 / -1; }
    .overview-desktop .ov-title { grid-column: 1 / -1; }
    .overview-desktop .ov-sub { grid-column: 1 / -1; }
`;

type Tab = 'chapters' | 'library';
type LessonStatus = 'done' | 'started' | 'todo';

// ── localStorage helpers ──────────────────────────────────────────────────────
// 6-26 串号事故教训：所有跨用户共享 localStorage 都必须带 userId 前缀。
// 未登录时不写入（返回空），防止匿名进度被下个登录用户继承。

function lessonStatesKey(userId: string): string {
  return `grammar_lesson_states:${userId}`;
}

function loadLessonStates(userId: string | undefined): Record<string, LessonStatus> {
  if (typeof window === 'undefined' || !userId) return {};
  try {
    return JSON.parse(localStorage.getItem(lessonStatesKey(userId)) || '{}');
  } catch {
    return {};
  }
}

function saveLessonState(userId: string | undefined, cardId: string, status: LessonStatus) {
  if (typeof window === 'undefined' || !userId) return;
  const states = loadLessonStates(userId);
  states[cardId] = status;
  localStorage.setItem(lessonStatesKey(userId), JSON.stringify(states));
}

// ── GrammarCardView ───────────────────────────────────────────────────────────

function WordBlockEl({ role, text }: { role: string; text: string }) {
  const styles: Record<string, React.CSSProperties> = {
    subject: { background: 'var(--color-mint-soft)', color: 'var(--color-mint-strong)' },
    object:  { background: 'var(--color-purple-soft)', color: 'var(--color-purple-strong)' },
    verb:    { background: 'var(--color-pink-base)', color: 'white' },
    place:   { background: 'var(--color-mint-soft)', color: 'var(--color-status-warning)' },
    time:    { background: 'var(--color-purple-soft)', color: 'var(--color-purple-strong)' },
    plain:   { background: 'var(--bg-muted)', color: 'var(--text-primary)' },
  };
  const s = styles[role] || styles.plain;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 8, fontSize: 17, fontWeight: 800, whiteSpace: 'nowrap', ...s }}>
      {text}
    </span>
  );
}

function TokenEl({ role }: { role: string }) {
  const styles: Record<string, React.CSSProperties> = {
    subject: { background: 'var(--color-mint-soft)', color: 'var(--color-mint-strong)' },
    object:  { background: 'var(--color-purple-soft)', color: 'var(--color-purple-strong)' },
    verb:    { background: 'var(--color-pink-base)', color: 'white' },
    place:   { background: 'var(--color-mint-soft)', color: 'var(--color-status-warning)' },
    time:    { background: 'var(--color-purple-soft)', color: 'var(--color-purple-strong)' },
  };
  const roleLabel: Record<string, string> = {
    subject: '主语', object: '宾语', verb: '谓语', place: '地点', time: '时间',
  };
  if (role === 'plain') return null;
  const s = styles[role] || {};
  return (
    <span style={{ fontSize: 14, padding: '4px 12px', borderRadius: 8, fontWeight: 800, ...s }}>
      {roleLabel[role] || role}
    </span>
  );
}

// ── GrammarCardView sub-components ───────────────────────────────────────────

function CardSortStep({ examples }: { examples: GrammarCard['cardExamples'] }) {
  const C = useC();
  const { lang } = useLang();
  const quizzes = React.useMemo(() => examples.map(eg => ({
    words: eg.wordBlocks.map(wb => wb.text),
    answer: eg.wordBlocks.map(wb => wb.text),
    zh: eg.zh,
  })), [examples]);

  const [qIdx, setQIdx] = React.useState(0);
  const [order, setOrder] = React.useState<string[]>([]);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [used, setUsed] = React.useState<number[]>([]);
  const [checked, setChecked] = React.useState(false);
  const [result, setResult] = React.useState<'ok' | 'ng' | null>(null);
  const [allDone, setAllDone] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  React.useEffect(() => {
    const words = quizzes[qIdx]?.words ?? [];
    setOrder([...words].sort(() => Math.random() - 0.5));
    setAnswers([]); setUsed([]); setChecked(false); setResult(null);
  }, [qIdx, quizzes]);

  const pick = (word: string, idx: number) => {
    if (checked || used.includes(idx)) return;
    setUsed(u => [...u, idx]);
    setAnswers(a => [...a, word]);
  };

  const remove = (i: number) => {
    if (checked) return;
    const newAns = answers.filter((_, j) => j !== i);
    setAnswers(newAns);
    const newUsed: number[] = [];
    for (const w of newAns) {
      const j = order.findIndex((ww, k) => ww === w && !newUsed.includes(k));
      if (j >= 0) newUsed.push(j);
    }
    setUsed(newUsed);
  };

  const check = () => {
    const q = quizzes[qIdx];
    if (!q || answers.length < q.answer.length) return;
    setChecked(true);
    const ok = answers.join('|') === q.answer.join('|');
    setResult(ok ? 'ok' : 'ng');
    if (ok && qIdx < quizzes.length - 1) {
      timerRef.current = setTimeout(() => setQIdx(i => i + 1), 900);
    } else if (ok) {
      setAllDone(true);
    }
  };

  const reset = () => {
    setOrder([...(quizzes[qIdx]?.words ?? [])].sort(() => Math.random() - 0.5));
    setAnswers([]); setUsed([]); setChecked(false); setResult(null);
  };

  if (!quizzes.length) return null;
  const q = quizzes[qIdx];
  const trackBorder = result === 'ok' ? 'var(--color-mint-strong)' : result === 'ng' ? 'var(--color-status-danger)' : C.line;
  const trackBg = result === 'ok' ? 'var(--color-mint-soft)' : result === 'ng' ? 'var(--color-status-danger)' + '1a' : C.card;

  return (
    <div>
      <div style={{ fontSize: 15, color: C.muted, marginBottom: 10 }}>{t('grammar.quiz_q_number', lang).replace('{n}', String(qIdx + 1)).replace('{total}', String(quizzes.length))}</div>
      <div style={{ background: C.bg, borderRadius: 14, padding: '14px 16px', fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>{q.zh}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        {order.map((w, i) => (
          <button key={i} onClick={() => pick(w, i)} disabled={used.includes(i)}
            style={{ padding: '12px 18px', borderRadius: 14, background: C.card, border: `1.5px solid ${C.line}`, fontSize: 17, fontWeight: 700, color: used.includes(i) ? 'var(--color-border-3)' : C.ink, cursor: used.includes(i) ? 'default' : 'pointer', opacity: used.includes(i) ? 0.3 : 1, whiteSpace: 'nowrap' }}>{w}</button>
        ))}
      </div>
      <div style={{ minHeight: 60, border: `2px dashed ${trackBorder}`, borderRadius: 18, padding: '12px 16px', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', background: trackBg, marginBottom: 12 }}>
        {answers.length === 0
          ? <span style={{ fontSize: 14, color: 'var(--color-border-3)' }}>{t('grammar.quiz_placeholder', lang)}</span>
          : answers.map((w, i) => <button key={i} onClick={() => remove(i)} style={{ padding: '10px 16px', borderRadius: 12, background: C.pink, color: 'white', fontSize: 17, fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>{w}</button>)}
      </div>
      {result && (
        <div style={{ fontSize: 15, fontWeight: 700, color: result === 'ok' ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          {result === 'ok' ? (allDone ? t('grammar.quiz_all_done', lang) : t('grammar.quiz_correct', lang)) : t('grammar.quiz_wrong_answer', lang).replace('{answer}', q.answer.join(' '))}
          {result !== 'ok' && <button onClick={() => speak(q.answer.join(' '))} style={{ padding: 4, borderRadius: 6, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={12} /></button>}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={reset} style={{ padding: '13px 18px', borderRadius: 16, border: `1.5px solid ${C.line}`, background: C.card, color: C.muted, fontSize: 15, cursor: 'pointer' }}>{t('grammar.quiz_reset', lang)}</button>
        <button onClick={check} style={{ flex: 1, padding: 13, borderRadius: 16, border: 'none', background: 'var(--color-ink-1)', color: 'white', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>{t('grammar.quiz_check', lang)}</button>
      </div>
    </div>
  );
}

function CardJudgeStep({ mistakes }: { mistakes: GrammarCard['mistakes'] }) {
  const C = useC();
  const { lang } = useLang();
  const judges = React.useMemo(() => mistakes.map(m => {
    const swap = Math.random() < 0.5;
    return {
      A: swap ? m.wrong : m.correct,
      B: swap ? m.correct : m.wrong,
      ans: swap ? 'B' as const : 'A' as const,
      why: m.note,
    };
  }), [mistakes]);
  const [states, setStates] = React.useState(() => judges.map(() => ({ done: false, ok: false, picked: '' })));

  const pick = (i: number, choice: string) => {
    if (states[i].done) return;
    setStates(s => s.map((item, j) => j === i ? { done: true, ok: choice === judges[i].ans, picked: choice } : item));
  };

  if (!judges.length) return null;

  return (
    <div>
      {judges.map((q, i) => {
        const s = states[i];
        const btnStyle = (ch: string): React.CSSProperties => {
          if (!s.done) return { border: `1.5px solid ${C.line}`, background: C.card };
          if (ch === q.ans) return { border: '1.5px solid var(--color-mint-strong)', background: 'var(--color-mint-soft)' };
          if (ch === s.picked && s.picked !== q.ans) return { border: '1.5px solid var(--color-status-danger)', background: 'rgba(214,86,86,0.08)' };
          return { border: `1.5px solid ${C.line}`, background: C.card };
        };
        return (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 15, color: C.muted, fontWeight: 700, marginBottom: 10 }}>{t('grammar.quiz_q_judge', lang).replace('{n}', String(i + 1))}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8 }}>
              {(['A', 'B'] as const).map(ch => (
                <div key={ch} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button onClick={() => pick(i, ch)}
                    style={{ flex: 1, padding: '11px 14px', borderRadius: 14, fontSize: 17, fontWeight: 700, color: C.ink, cursor: 'pointer', textAlign: 'left', ...btnStyle(ch) }}>
                    {ch}. {ch === 'A' ? q.A : q.B}
                  </button>
                  <button onClick={() => speak(ch === 'A' ? q.A : q.B)} style={{ padding: 6, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={13} /></button>
                </div>
              ))}
            </div>
            {s.done && (
              <div>
                <div style={{ fontSize: 16, color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', fontWeight: 700, marginBottom: 2 }}>{s.ok ? t('grammar.quiz_correct', lang) : t('grammar.quiz_wrong_choice', lang).replace('{choice}', q.ans)}</div>
                <div style={{ fontSize: 15, color: C.muted }}>{q.why}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SpecialQuizStep({ quiz }: { quiz: NonNullable<GrammarCard['specialQuiz']> }) {
  const C = useC();
  const { lang } = useLang();
  const [states, setStates] = React.useState(() => quiz.questions.map(() => ({ done: false, ok: false, picked: '' })));

  const pick = (qi: number, optIdx: number) => {
    if (states[qi].done) return;
    setStates(s => s.map((item, j) => j === qi ? { done: true, ok: optIdx === quiz.questions[qi].answer, picked: quiz.questions[qi].options[optIdx] } : item));
  };

  const allDone = states.every(s => s.done);
  const correctCount = states.filter(s => s.ok).length;

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 8 }}>{quiz.title}</h2>
      <p style={{ fontSize: 15, color: C.muted, marginBottom: 16 }}>{quiz.body}</p>
      {allDone && (
        <div style={{ background: C.mintBg, borderRadius: 14, padding: '12px 16px', marginBottom: 16, fontSize: 15, fontWeight: 700, color: C.ink }}>
          完成 {correctCount}/{quiz.questions.length} {lang === 'en' ? 'correct' : '题'}
        </div>
      )}
      {quiz.questions.map((q, qi) => {
        const s = states[qi];
        const btnStyle = (optIdx: number): React.CSSProperties => {
          if (!s.done) return { border: `1.5px solid ${C.line}`, background: C.card };
          if (optIdx === q.answer) return { border: '1.5px solid var(--color-mint-strong)', background: 'var(--color-mint-soft)' };
          if (s.picked === q.options[optIdx] && optIdx !== q.answer) return { border: '1.5px solid var(--color-status-danger)', background: 'rgba(214,86,86,0.08)' };
          return { border: `1.5px solid ${C.line}`, background: C.card };
        };
        return (
          <div key={qi} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.muted, marginBottom: 8 }}>
              {t('grammar.quiz_q_simple', lang).replace('{n}', String(qi + 1))}{q.prompt ? ` · ${q.prompt}` : ''}
            </div>
            {/* sentence with blank for fill type */}
            {(q.pre !== undefined || q.post !== undefined) ? (
              <div style={{ fontSize: 17, fontWeight: 700, color: C.ink, marginBottom: 10 }}>
                {q.pre}
                {s.done ? (
                  <span style={{ color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)' }}>{s.picked}</span>
                ) : (
                  <span style={{ display: 'inline-block', width: 36, height: 20, borderBottom: `2px solid ${C.mint}`, verticalAlign: 'bottom' }} />
                )}
                {q.post}
              </div>
            ) : null}
            <div>
              {q.options.map((opt, optIdx) => (
                <button key={optIdx} onClick={() => pick(qi, optIdx)}
                  style={{ display: 'inline-block', padding: '10px 18px', borderRadius: 14, ...btnStyle(optIdx), fontSize: 17, fontWeight: 700, color: C.ink, cursor: 'pointer', margin: '0 8px 8px 0' }}>
                  {quiz.type === 'judge' ? `${optIdx === 0 ? 'A' : 'B'}. ${opt}` : opt}
                </button>
              ))}
            </div>
            {s.done && (
              <div>
                <div style={{ fontSize: 15, color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', fontWeight: 700, marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {s.ok ? t('grammar.quiz_correct', lang) : t('grammar.quiz_wrong_answer', lang).replace('{answer}', q.options[q.answer])}
                  {!s.ok && <button onClick={() => speak(q.options[q.answer])} style={{ padding: 4, borderRadius: 6, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={12} /></button>}
                </div>
                <div style={{ fontSize: 15, color: C.muted, marginTop: 2 }}>{q.explanation}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}


// ── GrammarCardView (step-by-step flip card) ──────────────────────────────────

function GrammarCardView({
  card,
  partTitle,
  totalInPart,
  onBack,
  onComplete,
  onStartGrammar,
}: {
  card: GrammarCard;
  partTitle: string;
  totalInPart: number;
  onBack: () => void;
  onComplete: () => void;
  onStartGrammar: (gp: GrammarPoint) => void;
}) {
  const C = useC();
  const { lang } = useLang();
  const { user } = useAuth();
  const [step, setStep] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(true);
  const [lessonStates, setLessonStates] = React.useState<Record<string, string>>({});
  React.useEffect(() => {
    setLessonStates(loadLessonStates(user?.id));
  }, [card.id]);
  React.useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
      setIsDesktop(w >= 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const linkedGps = card.linkedGrammarIds
    .map(id => sentencePatterns.find(p => p.id === id))
    .filter(Boolean) as GrammarPoint[];

  const hasStructures = card.structures.length > 0;
  const hasRules = card.connectionRules.length > 0;
  const hasExamples = card.cardExamples.length > 0;
  const hasScenarios = card.scenarios.length > 0;
  const hasMistakes = card.mistakes.length > 0;
  const hasReadingGuide = !!card.readingGuide;
  const hasQuickTable = !!card.quickTable;
  const hasSpecialQuiz = !!card.specialQuiz;

  type StepDef = { badge: string; emoji: string; label: string; color: string };
  const steps: StepDef[] = [
    { badge: '💡', emoji: '💡', label: t('grammar.step_intro', lang), color: C.pink },
    ...(card.conceptCompare || card.compareHtml ? [{ badge: '🔀', emoji: '🔀', label: card.compareLabel || t('grammar.step_compare', lang), color: 'var(--color-purple-base)' }] : []),
    ...(hasStructures ? [{ badge: '📐', emoji: '📐', label: t('grammar.step_structure', lang), color: 'var(--color-purple-strong)' }] : []),
    ...(hasRules ? [{ badge: '🔗', emoji: '🔗', label: t('grammar.step_rules', lang), color: 'var(--color-purple-base)' }] : []),
    ...(hasReadingGuide ? [{ badge: '👁️', emoji: '👁️', label: t('grammar.step_reading', lang), color: 'var(--color-purple-strong)' }] : []),
    ...(hasQuickTable ? [{ badge: '📊', emoji: '📊', label: t('grammar.step_quicktable', lang), color: 'var(--color-purple-strong)' }] : []),
    ...(hasScenarios ? [{ badge: '🌏', emoji: '🌏', label: t('grammar.step_scenario', lang), color: 'var(--color-ink-3)' }] : []),
    ...(hasMistakes ? [{ badge: '⚠️', emoji: '⚠️', label: t('grammar.step_mistake', lang), color: 'var(--color-status-danger)' }] : []),
    ...(hasExamples ? [{ badge: '🎯', emoji: '🎯', label: t('grammar.step_sort', lang), color: 'var(--color-mint-strong)' }] : []),
    ...(hasSpecialQuiz ? [{ badge: '🧠', emoji: '🧠', label: t('grammar.step_special', lang), color: 'var(--color-status-warning)' }] : []),
    ...(hasMistakes && !hasSpecialQuiz ? [{ badge: '🧐', emoji: '🧐', label: t('grammar.step_judge', lang), color: 'var(--color-status-warning)' }] : []),
    { badge: '🎉', emoji: '🎉', label: t('grammar.step_done', lang), color: C.pink },
  ];

  const total = steps.length;
  const cfg = steps[step];
  const progress = ((step + 1) / total) * 100;

  const isEmpty = !card.whatItDoes;

  const goNext = () => {
    const next = Math.min(total - 1, step + 1);
    if (next === total - 1) saveLessonState(user?.id, card.id, 'done');
    setStep(next);
    window.scrollTo(0, 0);
  };
  const goPrev = () => { setStep(s => Math.max(0, s - 1)); window.scrollTo(0, 0); };

  let conceptCompareStepIdx = -1;
  let structureStepIdx = -1;
  let rulesStepIdx = -1;
  let readingGuideStepIdx = -1;
  let quickTableStepIdx = -1;
  let scenarioStepIdx = -1;
  let mistakeStepIdx = -1;
  let sortStepIdx = -1;
  let specialQuizStepIdx = -1;
  let judgeStepIdx = -1;
  let doneStepIdx = -1;

  let cursor = 1;
  if (card.conceptCompare || card.compareHtml) { conceptCompareStepIdx = cursor++; }
  if (hasStructures) { structureStepIdx = cursor++; }
  if (hasRules) { rulesStepIdx = cursor++; }
  if (hasReadingGuide) { readingGuideStepIdx = cursor++; }
  if (hasQuickTable) { quickTableStepIdx = cursor++; }
  if (hasScenarios) { scenarioStepIdx = cursor++; }
  if (hasMistakes) { mistakeStepIdx = cursor++; }
  if (hasExamples) { sortStepIdx = cursor++; }
  if (hasSpecialQuiz) { specialQuizStepIdx = cursor++; }
  if (hasMistakes && !hasSpecialQuiz) { judgeStepIdx = cursor++; }
  doneStepIdx = cursor;

  if (isEmpty) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', background: C.card, borderBottom: `1px solid ${C.line}`, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 13, background: C.bg, border: 'none', cursor: 'pointer', fontSize: 22, color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
          <div style={{ flex: 1, fontSize: 16, fontWeight: 800, color: C.ink }}>{lang === 'en' ? `Part ${card.partNumber} · Lesson ${card.lessonNumber}` : `第${card.partNumber}部分 · 第${card.lessonNumber}课`}</div>
        </div>
        <div style={{ padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📝</div>
          <p style={{ fontSize: 16, fontWeight: 800, color: C.ink, marginBottom: 8 }}>{t('grammar.empty_title', lang)}</p>
          <p style={{ fontSize: 15, color: C.muted }}>{t('grammar.empty_desc', lang)}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {/* 顶部进度导航 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', background: C.card, borderBottom: `1px solid ${C.line}`, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 13, background: C.bg, border: 'none', cursor: 'pointer', fontSize: 22, color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: C.ink }}>{lang === 'en' ? `Part ${card.partNumber} · Lesson ${card.lessonNumber} ${card.title}` : `第${card.partNumber}部分 · 第${card.lessonNumber}课 ${card.title}`}</span>
            <span style={{ fontSize: 13, color: C.muted, fontWeight: 700 }}>{step + 1} / {total}</span>
          </div>
          <div style={{ height: 6, background: C.line, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: `linear-gradient(90deg, ${C.mint}, ${C.pink})`, borderRadius: 99, width: `${progress}%`, transition: 'width .35s' }} />
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div style={{
        maxWidth: isDesktop ? 760 : isTablet ? 680 : 560,
        margin: '0 auto',
        padding: isMobile ? `0 0 calc(90px + 56px + env(safe-area-inset-bottom, 0px))` : `16px 24px 40px`
      }}>
        <style>{GRAMMAR_STYLES}</style>

        {/* Badge */}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 800, padding: '3px 10px', borderRadius: 99, letterSpacing: '.07em', background: `${cfg.color}18`, color: cfg.color, marginBottom: 8, marginTop: isMobile ? 12 : 0, marginLeft: isMobile ? 16 : 0 }}>
          {cfg.emoji} {cfg.label}
        </span>

        {/* Step 0: 今天学什么 */}
        {step === 0 && (
          <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
            {card.step0Html ? (
              <div dangerouslySetInnerHTML={{ __html: card.step0Html }} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: C.ink, marginBottom: 8 }}>{card.whatItDoes}</div>
                  <div style={{ fontSize: 16, color: C.muted, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{card.whatItDoesBody}</div>
                </div>
                {card.conceptCompare && (() => {
                  const zhParts = card.conceptCompare!.zh.split(' · ').map((t, i) => ({
                    text: t, role: (['subject','verb','object'][i] || 'plain')
                  }));
                  const koParts = card.structures[0]?.tokens.map(t => {
                    const zh = zhParts.find(z => z.role === t.role);
                    return { text: zh ? `${t.text}（${zh.text}）` : t.text, role: t.role };
                  }) ?? [];
                  return <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ background: `color-mix(in srgb, #aee3d8 15%, ${C.card})`, borderRadius: 14, padding: '14px 16px' }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--color-mint-strong)', letterSpacing: '.06em', marginBottom: 10 }}>{lang === 'en' ? 'Chinese expression' : '中文说法'}</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {zhParts.map((p, i) => <WordBlockEl key={i} role={p.role} text={p.text} />)}
                        </div>
                      </div>
                      <div style={{ background: `color-mix(in srgb, #ff7fa8 10%, ${C.card})`, borderRadius: 14, padding: '14px 16px' }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: C.pink, letterSpacing: '.06em', marginBottom: 10 }}>{lang === 'en' ? 'Korean expression' : '韩语说法'}</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                          {koParts.map((p, i) => <WordBlockEl key={i} role={p.role} text={p.text} />)}
                        </div>
                        <div style={{ fontSize: 13, color: C.pink, fontWeight: 700 }}>{lang === 'en' ? '👆 Verb goes to the end' : '👆 动词跑到最后面去了'}</div>
                      </div>
                    </div>
                    <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: '13px 15px' }}>
                      <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.65, margin: 0 }} dangerouslySetInnerHTML={{ __html: card.conceptCompare!.note }} />
                    </div>
                  </>;
                })()}
              </div>
            )}
          </div>
        )}

        {/* 和中文比一比 */}
        {step === conceptCompareStepIdx && (
          <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
            {card.compareHtml ? (
              <div dangerouslySetInnerHTML={{ __html: card.compareHtml }} />
            ) : card.conceptCompare ? (
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 8 }}>{lang === 'en' ? 'Word order is different' : '语序不一样'}</div>
                <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span>{lang === 'en' ? `Chinese "${card.conceptCompare.zh}" → Korean "${card.conceptCompare.ko}" — the verb always goes last.` : `中文「${card.conceptCompare.zh}」，韩语变成「${card.conceptCompare.ko}」——动作永远压轴。`}</span>
                  <button onClick={() => speak(card.conceptCompare!.ko)} style={{ padding: 4, borderRadius: 6, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={12} /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  <div style={{ background: 'var(--color-mint-soft)', borderRadius: 14, padding: '14px 16px' }}>
                    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.1em', color: 'var(--color-mint-strong)', marginBottom: 10 }}>{lang === 'en' ? 'Chinese order' : '中文顺序'}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {card.conceptCompare.zh.split(' · ').map((text, i) => (
                        <WordBlockEl key={i} role={(['subject','verb','object'][i] || 'plain')} text={text} />
                      ))}
                    </div>
                  </div>
                  <div style={{ background: `color-mix(in srgb, #ff7fa8 10%, ${C.card})`, borderRadius: 14, padding: '14px 16px' }}>
                    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.1em', color: C.pink, marginBottom: 10 }}>{lang === 'en' ? 'Korean order' : '韩语顺序'}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {card.structures[0]?.tokens.map((t, i) => (
                        <WordBlockEl key={i} role={t.role} text={t.text} />
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ background: C.bg, borderRadius: 14, padding: '13px 15px' }}>
                  <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.65, margin: 0 }}>
                    先说「谁」→ 再说「什么/哪里」→ <span style={{ color: C.pink, fontWeight: 700 }}>动作/状态放最后</span>
                    <br /><br />
                    韩语不是按中文逐字翻译的，遇到长句先<span style={{ color: C.pink, fontWeight: 700 }}>跳到句尾</span>判断"在做什么"，再往前拆成分。
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        )}

          {/* 语法结构 */}
          {step === structureStepIdx && (
            <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 12 }}>{t('grammar.section_structure', lang)}</h2>
              {card.structureNote && (
                <div style={{ background: `linear-gradient(135deg, color-mix(in srgb, #aee3d8 20%, ${C.card}), color-mix(in srgb, #6b7ff0 15%, ${C.card}))`, borderRadius: 14, padding: '12px 16px', marginBottom: 16, border: `1px solid ${C.line}` }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--color-mint-strong)', marginBottom: 4 }}>{lang === 'en' ? '📐 What does this step do?' : '📐 这一步在干什么？'}</div>
                  <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{card.structureNote}</div>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {card.structures.map((s, i) => (
                  <div key={i} style={{ background: C.bg, borderRadius: 18, padding: '16px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                      <p style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.4, flex: 1 }}>{s.ko}</p>
                      <button onClick={e => { e.stopPropagation(); speak(s.ko); }} style={{ padding: 4, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0, marginTop: 2 }}><Volume2 size={13} /></button>
                    </div>
                    {s.zh && <p style={{ fontSize: 15, color: C.muted, marginBottom: 10 }}>{s.zh}</p>}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                      {s.tokens.map((tk, j) => (
                        <span key={j} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <WordBlockEl role={tk.role} text={tk.text} />
                          <TokenEl role={tk.role} />
                          {j < s.tokens.length - 1 && <span style={{ color: 'var(--color-border-3)', fontSize: 16 }}>+</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 接续规则 */}
          {step === rulesStepIdx && (() => {
            const rules = card.connectionRules;
            const isLegacy = rules.length > 0 && typeof rules[0] === 'string';
            if (isLegacy) {
              // 旧版：纯列表（P2-P6 兼容）
              return (
                <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 12 }}>{t('grammar.section_rules', lang)}</h2>
                  {card.rulesNote && (
                    <div style={{ background: C.bg, borderRadius: 14, padding: '12px 16px', marginBottom: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: C.pink, marginBottom: 4 }}>📌 {lang === 'en' ? 'Why are these rules needed?' : '为什么需要这些规则？'}</div>
                      <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{card.rulesNote}</div>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {(rules as string[]).map((rule, i) => {
                      const dashIdx = rule.indexOf(' — ');
                      const head = dashIdx >= 0 ? rule.slice(0, dashIdx) : rule;
                      const tail = dashIdx >= 0 ? rule.slice(dashIdx) : '';
                      return (
                        <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.75, background: C.bg, borderRadius: 14, padding: '14px 16px' }}>
                          <div style={{ width: 28, height: 28, background: C.pink, color: '#fff', borderRadius: '50%', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                          <div style={{ flex: 1 }}><span style={{ color: C.pink, fontWeight: 800 }}>{head}</span>{tail}</div>
                          <button onClick={() => speak(head)} style={{ padding: 4, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0, marginTop: 2 }}><Volume2 size={12} /></button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
            // 新版：分类卡片式（P1）
            const typed = rules as ConnectionRule[];
            const ORDER: ConnectionRule['type'][] = ['rule', 'usage', 'compare', 'note', 'vocab', 'example'];
            const grouped: Partial<Record<ConnectionRule['type'], ConnectionRule[]>> = {};
            typed.forEach(r => { (grouped[r.type] = grouped[r.type] || []).push(r); });
            const META: Record<ConnectionRule['type'], { icon: string; label: string; bg: string; border: string; titleColor: string }> = {
              rule:    { icon: '🔗', label: '接续规则',   bg: 'var(--color-mint-soft)', border: 'var(--color-mint-strong)', titleColor: 'var(--color-mint-strong)' },
              usage:   { icon: '💡', label: '使用场景',   bg: 'var(--color-mint-soft)', border: 'var(--color-mint-strong)', titleColor: 'var(--color-mint-strong)' },
              compare: { icon: '↔️', label: '对比辨析',   bg: 'var(--color-purple-soft)', border: 'var(--color-purple-strong)', titleColor: 'var(--color-purple-strong)' },
              note:    { icon: '⚠️', label: '注意事项',   bg: 'var(--color-surface-4)', border: 'var(--color-status-warning)', titleColor: 'var(--color-status-warning)' },
              vocab:   { icon: '📋', label: '词汇补充',   bg: 'var(--color-purple-soft)', border: 'var(--color-purple-base)', titleColor: 'var(--color-purple-base)' },
              example: { icon: '📝', label: '教材例句',   bg: 'var(--color-surface-4)', border: 'var(--color-border-1)', titleColor: 'var(--color-ink-3)' },
            };
            return (
              <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 12 }}>{t('grammar.section_rules', lang)}</h2>
                {card.rulesNote && (
                  <div style={{ background: 'linear-gradient(135deg, var(--color-mint-soft), var(--color-pink-soft))', borderRadius: 14, padding: '12px 16px', marginBottom: 16, border: '1px solid #f0e0c0' }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: C.pink, marginBottom: 4 }}>📌 {lang === 'en' ? 'Why are these rules needed?' : '为什么需要这些规则？'}</div>
                    <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{card.rulesNote}</div>
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {ORDER.filter(t => grouped[t]?.length).map(t => {
                    const items = grouped[t]!;
                    const m = META[t];
                    return (
                      <div key={t} style={{ background: m.bg, borderRadius: 16, border: `1.5px solid ${m.border}`, padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                          <span style={{ fontSize: 15 }}>{m.icon}</span>
                          <span style={{ fontSize: 15, fontWeight: 800, color: m.titleColor, letterSpacing: '.04em' }}>{m.label}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {items.map((item, i) => (
                            <div key={i} style={{ fontSize: 15, lineHeight: 1.75, color: C.ink, whiteSpace: 'pre-line', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                              <div>
                                <span style={{ fontWeight: 700 }}>{item.text}</span>
                                {item.examples && (
                                  <span style={{ display: 'inline-block', background: 'rgba(0,0,0,.05)', borderRadius: 6, padding: '1px 7px', marginLeft: 6, fontSize: 15, color: C.muted, fontFamily: 'monospace' }}>
                                    {item.examples}
                                  </span>
                                )}
                              </div>
                              <button onClick={() => speak(item.examples || item.text)} style={{ padding: 4, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0, marginTop: 2 }}><Volume2 size={12} /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* 阅读方法 */}
          {step === readingGuideStepIdx && card.readingGuide && (
            <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 8 }}>{card.readingGuide.title}</h2>
              <p style={{ fontSize: 15, color: C.muted, marginBottom: 16 }}>{card.readingGuide.body}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {card.readingGuide.steps.map(s => (
                  <div key={s.num} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: C.bg, borderRadius: 14, padding: '12px 14px' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 99, background: C.pink, color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{s.num}</div>
                    <div style={{ fontSize: 15, color: C.ink, fontWeight: 600, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: s.text }} />
                  </div>
                ))}
              </div>
              {card.readingGuide.demo && (
                <div style={{ background: C.pinkSoft, borderRadius: 14, padding: '13px 15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <p style={{ fontSize: 15, fontWeight: 800, color: C.ink, margin: 0 }}>{card.readingGuide.demo.ko}</p>
                    <button onClick={() => speak(card.readingGuide!.demo!.ko)} style={{ padding: 6, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={13} /></button>
                  </div>
                  {card.readingGuide.demo.rows.map((row, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: C.muted, whiteSpace: 'nowrap' }}>{row.label}</span>
                      <span style={{ fontSize: 15, fontWeight: 700 }} dangerouslySetInnerHTML={{ __html: row.text }} />
                    </div>
                  ))}
                  <p style={{ fontSize: 15, color: C.ink, fontWeight: 600, marginTop: 8 }}>{card.readingGuide.demo.result}</p>
                </div>
              )}
            </div>
          )}

          {/* 速记表 */}
          {step === quickTableStepIdx && card.quickTable && (() => {
            const { title, body, headers, rows } = card.quickTable!;
            type TCell = string | { ko: string; zh: string };
            const renderCell = (cell: TCell) => {
              if (typeof cell === 'string') return <>{cell}</>;
              return (
                <>
                  <span style={{ display: 'block', fontWeight: 700 }}>{cell.ko}</span>
                  <span style={{ display: 'block', fontSize: 11, color: C.muted, marginTop: 2 }}>{cell.zh}</span>
                </>
              );
            };
            return (
              <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 8 }}>{title}</h2>
                {body && <p style={{ fontSize: 15, color: C.muted, marginBottom: 16 }}>{body}</p>}
                {isMobile ? (
                  // 移动端：卡片堆叠式
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {rows.map((row, ri) => (
                      <div key={ri} style={{ background: ri % 2 === 0 ? C.bg : C.card, borderRadius: 14, padding: '14px 16px', border: `1px solid ${C.line}` }}>
                        <div style={{ fontSize: 17, fontWeight: 800, color: C.ink, marginBottom: 8 }}>{renderCell(row[0])}</div>
                        {headers.length === 4 ? (
                          <>
                            <div style={{ marginBottom: 6 }}>
                              <div style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>{headers[1]}</div>
                              <div style={{ fontSize: 15, color: C.ink, fontWeight: 600 }}>{renderCell(row[1])}</div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                              {[2, 3].map(i => (
                                <div key={i}>
                                  <div style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>{headers[i]}</div>
                                  <div style={{ fontSize: 15, color: C.ink, fontWeight: 600 }}>{renderCell(row[i])}</div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {headers.slice(1).map((h, i) => (
                              <div key={i}>
                                <div style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>{h}</div>
                                <div style={{ fontSize: 15, color: C.ink, fontWeight: 600 }}>{renderCell(row[i + 1])}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  // 桌面端：表格式（字号/padding 微调）
                  <div style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${C.line}` }}>
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${headers.length}, 1fr)`, background: C.ink }}>
                      {headers.map((h, i) => (
                        <div key={i} style={{ padding: '10px 14px', fontSize: 13, color: '#fff', fontWeight: 800, borderRight: i < headers.length - 1 ? `1px solid rgba(255,255,255,.15)` : 'none' }}>{h}</div>
                      ))}
                    </div>
                    {rows.map((row, ri) => (
                      <div key={ri} style={{ display: 'grid', gridTemplateColumns: `repeat(${headers.length}, 1fr)`, background: ri % 2 === 0 ? C.bg : C.card }}>
                        {row.map((cell, ci) => (
                          <div key={ci} style={{ padding: '10px 14px', fontSize: 15, color: C.ink, fontWeight: 600, borderRight: ci < headers.length - 1 ? `1px solid ${C.line}` : 'none', borderTop: `1px solid ${C.line}` }}>{renderCell(cell)}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}


          {/* 真实场景 */}
          {step === scenarioStepIdx && (
            <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 12 }}>{t('grammar.section_scenario', lang)}</h2>
              {card.scenarioNote && (
                <div style={{ background: `linear-gradient(135deg, color-mix(in srgb, #6b7ff0 12%, ${C.card}), color-mix(in srgb, #aee3d8 15%, ${C.card}))`, borderRadius: 14, padding: '12px 16px', marginBottom: 16, border: `1px solid ${C.line}` }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--color-purple-strong)', marginBottom: 4 }}>{lang === 'en' ? '🌏 When to use?' : '🌏 什么时候用？'}</div>
                  <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{card.scenarioNote}</div>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {card.scenarios.map((sc, i) => (
                  <div key={i} style={{ background: C.bg, borderRadius: 18, padding: '20px 18px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{sc.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 10 }}>{sc.context}</p>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                        <p style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.5, flex: 1 }}>{sc.ko}</p>
                        <button onClick={e => { e.stopPropagation(); speak(sc.ko); }} style={{ padding: 4, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0, marginTop: 2 }}><Volume2 size={13} /></button>
                      </div>
                      <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.65 }}>{sc.zh}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 别踩坑 */}
          {step === mistakeStepIdx && (
            <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 16 }}>{t('grammar.section_mistake', lang)}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {card.mistakes.map((m, i) => (
                  <div key={i} style={{ borderRadius: 18, overflow: 'hidden', border: `1px solid ${C.line}` }}>
                    <div style={{ background: `color-mix(in srgb, #e05555 8%, ${C.card})`, padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 13, fontWeight: 800, padding: '3px 8px', borderRadius: 6, background: 'rgba(214,86,86,0.12)', color: 'var(--color-status-danger)', whiteSpace: 'nowrap', marginTop: 2 }}>✗ 错</span>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flex: 1 }}>
                        <span style={{ fontSize: 17, lineHeight: 1.65, flex: 1 }}>{m.wrong}</span>
                        <button onClick={e => { e.stopPropagation(); speak(m.wrong); }} style={{ padding: 4, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0, marginTop: 2 }}><Volume2 size={13} /></button>
                      </div>
                    </div>
                    <div style={{ background: `color-mix(in srgb, #2db89b 8%, ${C.card})`, padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 13, fontWeight: 800, padding: '3px 8px', borderRadius: 6, background: 'rgba(58,175,169,0.12)', color: 'var(--color-mint-strong)', whiteSpace: 'nowrap', marginTop: 2 }}>✓ 对</span>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flex: 1 }}>
                        <span style={{ fontSize: 17, lineHeight: 1.65, flex: 1 }}>{m.correct}</span>
                        <button onClick={e => { e.stopPropagation(); speak(m.correct); }} style={{ padding: 4, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0, marginTop: 2 }}><Volume2 size={13} /></button>
                      </div>
                    </div>
                    <div style={{ padding: '13px 16px', background: C.bg, fontSize: 15, color: C.muted, lineHeight: 1.7 }}>{m.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 排序练习 */}
          {step === sortStepIdx && (
            <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 8 }}>{t('grammar.section_sort', lang)}</h2>
              <p style={{ fontSize: 15, color: C.muted, marginBottom: 16 }}>{t('grammar.section_sort_desc', lang)}</p>
              <CardSortStep key={card.id + '-sort'} examples={card.cardExamples} />
            </div>
          )}

          {/* 特殊练习 */}
          {step === specialQuizStepIdx && card.specialQuiz && (
            <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
              <SpecialQuizStep quiz={card.specialQuiz} />
            </div>
          )}

          {/* 判断对错 */}
          {step === judgeStepIdx && (
            <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 8 }}>{t('grammar.section_judge', lang)}</h2>
              <p style={{ fontSize: 15, color: C.muted, marginBottom: 16 }}>{t('grammar.section_judge_desc', lang)}</p>
              <CardJudgeStep key={card.id + '-judge'} mistakes={card.mistakes} />
            </div>
          )}

          {/* 完成 */}
          {step === doneStepIdx && (
            <div style={{ background: C.card, borderRadius: isMobile ? 16 : 22, border: `1px solid ${C.line}`, boxShadow: '0 4px 20px rgba(78,52,46,.09)', padding: isMobile ? '24px 20px' : '32px 32px' }}>
              {card.overviewHtml ? (
                <>
                  {/* L10 第一章全部完成横幅（React读localStorage，不依赖HTML原型JS） */}
                  {card.lessonNumber === 10 && card.partNumber === 1 && (() => {
                    const chapterKeys = ['card-p1-l01','card-p1-l02','card-p1-l03','card-p1-l04','card-p1-l05','card-p1-l06','card-p1-l07','card-p1-l08','card-p1-l09','card-p1-l10'];
                    const freshStates = loadLessonStates(user?.id);
                    const allDone = chapterKeys.every(k => freshStates[k] === 'done');
                    return allDone ? (
                      <div style={{ background: 'linear-gradient(135deg,#ff7fa8,#aee3d8)', borderRadius: 16, padding: 20, textAlign: 'center', marginBottom: 16 }}>
                        <h2 style={{ fontSize: 20, fontWeight: 900, color: 'white', margin: 0 }}>{t('grammar.done_chapter_title', lang)}</h2>
                        <p style={{ fontSize: 15, color: 'rgba(255,255,255,.9)', marginTop: 6, marginBottom: 0 }}>{t('grammar.done_chapter_desc', lang)}</p>
                      </div>
                    ) : null;
                  })()}
                  <div className={isDesktop ? 'overview-desktop' : ''} dangerouslySetInnerHTML={{ __html: card.overviewHtml }} />
                </>
              ) : (
                <>
                  {/* L10 第一章全部完成横幅 */}
                  {card.lessonNumber === 10 && card.partNumber === 1 && (() => {
                    const chapterKeys = ['card-p1-l01','card-p1-l02','card-p1-l03','card-p1-l04','card-p1-l05','card-p1-l06','card-p1-l07','card-p1-l08','card-p1-l09','card-p1-l10'];
                    const freshStates = loadLessonStates(user?.id);
                    const allDone = chapterKeys.every(k => freshStates[k] === 'done');
                    return allDone ? (
                      <div style={{ background: 'linear-gradient(135deg,#ff7fa8,#aee3d8)', borderRadius: 16, padding: 20, textAlign: 'center', marginBottom: 16 }}>
                        <h2 style={{ fontSize: 20, fontWeight: 900, color: 'white', marginBottom: 6, margin: 0 }}>{t('grammar.done_chapter_title', lang)}</h2>
                        <p style={{ fontSize: 15, color: 'rgba(255,255,255,.9)', marginTop: 6 }}>{t('grammar.done_chapter_desc', lang)}</p>
                      </div>
                    ) : null;
                  })()}
                  <div style={{ marginBottom: 18 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: C.ink, marginBottom: 4, margin: 0 }}>{card.title}</h2>
                    <p style={{ fontSize: 15, color: C.muted, marginTop: 6, marginBottom: 0 }}>{card.whatItDoes}</p>
                  </div>
                  {card.connectionRules.length > 0 && (
                    <div style={{ background: C.mintBg, borderRadius: 14, padding: 16, marginBottom: 14 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-mint-strong)', marginBottom: 10, margin: '0 0 10px 0' }}>{t('grammar.done_core_rules', lang)}</h3>
                      <div style={{ fontSize: 15, lineHeight: 2, color: C.ink }}>
                        {card.connectionRules.map((rule, i) => {
                          const text = typeof rule === 'string' ? rule : `${rule.text}${(rule as any).examples ? '　' + (rule as any).examples : ''}`;
                          const speakText = typeof rule === 'string' ? rule.split(' — ')[0] : ((rule as any).examples || rule.text);
                          return (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ flex: 1 }}>{text}</span>
                              <button onClick={() => speak(speakText)} style={{ padding: 3, borderRadius: 6, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={11} /></button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {card.quickTable && (
                    <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-mint-strong)', marginBottom: 10, margin: '0 0 10px 0' }}>{card.quickTable.title}</h3>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
                          <thead><tr>{card.quickTable.headers.map((h, i) => (
                            <th key={i} style={{ background: C.pinkSoft, color: C.pink, padding: '7px 10px', textAlign: 'left', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>{h}</th>
                          ))}</tr></thead>
                          <tbody>{card.quickTable.rows.map((row, ri) => (
                            <tr key={ri}>{row.map((cell, ci) => (
                              <td key={ci} style={{ padding: '7px 10px', borderBottom: `1px solid ${C.line}`, color: C.ink, fontSize: 15 }}>
                                {typeof cell === 'object' && cell !== null && 'ko' in cell
                                  ? <><span style={{ display: 'block', fontWeight: 700 }}>{(cell as { ko: string; zh: string }).ko}</span><span style={{ display: 'block', fontSize: 11, color: C.muted }}>{(cell as { ko: string; zh: string }).zh}</span></>
                                  : cell}
                              </td>
                            ))}</tr>
                          ))}</tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {card.mistakes.length > 0 && (
                    <div style={{ background: C.pinkSoft, borderRadius: 14, padding: 16, marginBottom: 14 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 800, color: C.pink, marginBottom: 10, margin: '0 0 10px 0' }}>{t('grammar.done_common_errors', lang)}</h3>
                      {card.mistakes.slice(0, 4).map((m, i) => (
                        <div key={i} style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                          <span style={{ color: 'var(--color-status-danger)', textDecoration: 'line-through' }}>{m.wrong}</span>{' → '}
                          <span style={{ color: 'var(--color-mint-strong)' }}>{m.correct}</span>
                          <button onClick={() => speak(m.correct)} style={{ padding: 3, borderRadius: 6, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={11} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  {linkedGps.length > 0 && (
                    <div style={{ background: C.bg, borderRadius: 14, padding: 16, marginBottom: 14 }}>
                      <p style={{ fontSize: 15, fontWeight: 800, color: C.muted, marginBottom: 12, margin: '0 0 12px 0' }}>{t('grammar.done_continue_practice', lang)}</p>
                      {linkedGps.map(gp => (
                        <button key={gp.id} onClick={() => onStartGrammar(gp)}
                          style={{ display: 'block', width: '100%', padding: '12px 16px', background: C.pinkSoft, border: `1px solid rgba(255,127,168,.2)`, borderRadius: 14, fontSize: 15, fontWeight: 700, color: C.pink, cursor: 'pointer', marginBottom: 8, textAlign: 'left' }}>
                          ▶ 练习：{gp.displayTitle}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* 关联语法（overviewHtml 模式下也显示） */}
              {card.overviewHtml && linkedGps.length > 0 && (
                <div style={{ background: C.bg, borderRadius: 14, padding: 16, marginBottom: 14 }}>
                  <p style={{ fontSize: 15, fontWeight: 800, color: C.muted, marginBottom: 12, margin: '0 0 12px 0' }}>继续练习关联语法：</p>
                  {linkedGps.map(gp => (
                    <button key={gp.id} onClick={() => onStartGrammar(gp)}
                      style={{ display: 'block', width: '100%', padding: '12px 16px', background: C.pinkSoft, border: `1px solid rgba(255,127,168,.2)`, borderRadius: 14, fontSize: 15, fontWeight: 700, color: C.pink, cursor: 'pointer', marginBottom: 8, textAlign: 'left' }}>
                      ▶ 练习：{gp.displayTitle}
                    </button>
                  ))}
                </div>
              )}

              {/* 完成按钮（overviewHtml 有自己的重新学习按钮，这里只放完成） */}
              {!card.overviewHtml && (
                <button onClick={() => { setStep(0); window.scrollTo(0, 0); }}
                  style={{ width: '100%', padding: 14, borderRadius: 14, border: `1.5px solid ${C.line}`, background: C.card, color: C.muted, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>
                  {t('grammar.done_relearn', lang)}
                </button>
              )}
              <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, marginTop: 20 }}>
                <button onClick={onComplete}
                  style={{ width: '100%', padding: 17, borderRadius: 99, border: 'none', background: `linear-gradient(135deg, ${C.mint}, ${C.pink})`, color: 'white', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
                  {t('grammar.done_complete', lang)}
                </button>
              </div>
            </div>
          )}
      </div>

      {/* 底部翻页导航 */}
      <div style={isMobile ? {
        position: 'fixed',
        bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))',
        left: 0, right: 0,
        padding: '12px 20px', background: 'var(--color-surface-1)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${C.line}`, display: 'flex', gap: 10, zIndex: 70
      } : {
        padding: '14px 0 0', display: 'flex', gap: 10
      }}>
        {step > 0 && (
          <button onClick={goPrev} style={{ padding: '15px 18px', borderRadius: 18, border: `1.5px solid ${C.line}`, background: C.card, color: C.muted, fontSize: 16, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>{t('grammar.nav_prev_page', lang)}</button>
        )}
        {step < doneStepIdx && (
          <button onClick={goNext} style={{ flex: 1, padding: 15, borderRadius: 18, border: 'none', background: 'var(--color-ink-1)', color: 'white', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
            {t('grammar.nav_next_page', lang)}
          </button>
        )}
      </div>
    </div>
  );
}

// ── ComprehensivePractice (第一章综合练习) ────────────────────────────────────

const SORT_Q = [
  { words: ['저는','밥을','먹어요'], answer: ['저는','밥을','먹어요'], hint: '主语→宾语→谓语，动词放句末' },
  { words: ['저는','학교에','가요'], answer: ['저는','학교에','가요'], hint: '방향助词 에，动词放句末' },
  { words: ['저는','한국어를','공부해요'], answer: ['저는','한국어를','공부해요'], hint: '宾语助词 를，动词放句末' },
  { words: ['저는','카페에서','커피를','마셔요'], answer: ['저는','카페에서','커피를','마셔요'], hint: '에서=动作发生地点，마셔요 放句末' },
  { words: ['저는','지금','이 노래를','듣고 있어요'], answer: ['저는','지금','이 노래를','듣고 있어요'], hint: '进行时 -고 있어요，放句末' },
];

const FILL3_DATA = [
  { pre: '학생', post: '', opts: ['예요','이에요'], ans: '이에요', why: '학생 有收音ㅇ→이에요' },
  { pre: '학교', post: '', opts: ['예요','이에요'], ans: '예요', why: '학교 无收音→예요' },
  { pre: '선생님', post: '', opts: ['예요','이에요'], ans: '이에요', why: '선생님 有收音ㅁ→이에요' },
  { pre: '카페', post: '', opts: ['예요','이에요'], ans: '예요', why: '카페 无收音→예요' },
  { pre: '저', post: '학생이에요', opts: ['은','는'], ans: '는', why: '저 无收音→는' },
  { pre: '밥', post: '맛있어요', opts: ['은','는'], ans: '은', why: '밥 有收音ㅂ→은' },
  { pre: '한국어', post: '재미있어요', opts: ['은','는'], ans: '는', why: '어 无收音→는' },
  { pre: '선생님', post: '바빠요', opts: ['은','는'], ans: '은', why: '님 有收音ㅁ→은' },
];

const FILL4_DATA = [
  { pre: '한국어', post: '공부해요', opts: ['을','를'], ans: '를', why: '어 无收音→를' },
  { pre: '밥', post: '먹어요', opts: ['을','를'], ans: '을', why: '밥 有收音ㅂ→을' },
  { pre: '음악', post: '들어요', opts: ['을','를'], ans: '을', why: '악 有收音ㄱ→을' },
  { pre: '커피', post: '마셔요', opts: ['을','를'], ans: '를', why: '피 无收音→를' },
  { pre: '학교', post: '공부해요', opts: ['에','에서'], ans: '에서', why: '공부하다 是动作→에서' },
  { pre: '집', post: '가요', opts: ['에','에서'], ans: '에', why: '가다 是方向→에' },
  { pre: '카페', post: '친구를 만나요', opts: ['에','에서'], ans: '에서', why: '만나다 是动作→에서' },
  { pre: '집', post: '있어요', opts: ['에','에서'], ans: '에', why: '있다 是存在→에' },
  { pre: '세 시', post: '만나요', opts: ['에','에서'], ans: '에', why: '时间点用 에' },
];

const MORPH_DATA = [
  { label: '가다 → 합니다体', opts: ['갑니다','가습니다','가ㅂ니다'], ans: '갑니다', why: '词干가 无收音→ㅂ니다' },
  { label: '먹다 → 합니다体', opts: ['먹ㅂ니다','먹이다','먹습니다'], ans: '먹습니다', why: '词干먹 有收音→습니다' },
  { label: '하다 → 합니다体', opts: ['하ㅂ니다','합니다','하습니다'], ans: '합니다', why: '하다固定变합니다' },
  { label: '읽다 → 합니다体', opts: ['읽어요','읽습니다','읽ㅂ니다'], ans: '읽습니다', why: '词干읽 有收音→습니다' },
  { label: '갑니다 → 疑问句', opts: ['갑니까?','갑니다?','가니다?'], ans: '갑니까?', why: '陈述→疑问：-ㅂ니다 → -ㅂ니까?' },
  { label: '먹습니다 → 疑问句', opts: ['먹습니까?','먹ㅂ니까?','먹니까?'], ans: '먹습니까?', why: '陈述→疑问：-습니다 → -습니까?' },
];

const JUDGE_DATA = [
  { A: '어제 공부했어요', B: '어제 공부해요', ans: 'A', why: '어제(昨天) 是过去→-았/었어요' },
  { A: '내일 공부할 거예요', B: '내일 공부했어요', ans: 'A', why: '내일(明天) 是将来→-을 거예요' },
  { A: '지금 밥을 먹고 있어요', B: '지금 밥을 먹었어요', ans: 'A', why: '지금(现在) 进行中→-고 있어요' },
  { A: '지난주에 영화를 봤어요', B: '지난주에 영화를 볼 거예요', ans: 'A', why: '지난주(上周) 是过去→-았/었어요' },
  { A: '오늘 학교에 가요', B: '오늘에 학교에 가요', ans: 'A', why: '오늘/내일/어제 不加 에' },
  { A: '집에 있어요', B: '집에서 있어요', ans: 'A', why: '있다 是存在→地点用 에' },
];

const ERR_DATA = [
  { wrong: '저은 학생이에요', right: '저는 학생이에요', why: '저 无收音→는' },
  { wrong: '저는 밥를 먹어요', right: '저는 밥을 먹어요', why: '밥 有收音ㅂ→을' },
  { wrong: '학교에 공부해요', right: '학교에서 공부해요', why: '공부하다 是动作→에서' },
  { wrong: '집에서 있어요', right: '집에 있어요', why: '있다 是存在→에' },
  { wrong: '내일 공부했어요', right: '내일 공부할 거예요', why: '내일 是将来→将来时' },
  { wrong: '학생습니다', right: '학생입니다', why: '학생 是名词→입니다' },
];

type FillState = { done: boolean; ok: boolean | null; picked: string | null };
type JudgeState = { done: boolean; ok: boolean | null; picked: string | null };
type ErrState = { revealed: boolean };

function SortStep({ onDone }: { onDone: () => void }) {
  const C = useC();
  const { lang } = useLang();
  const [qIdx, setQIdx] = React.useState(0);
  const [order, setOrder] = React.useState<string[]>([]);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [used, setUsed] = React.useState<number[]>([]);
  const [checked, setChecked] = React.useState(false);
  const [result, setResult] = React.useState<'ok'|'ng'|null>(null);
  const [allDone, setAllDone] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  React.useEffect(() => {
    const q = SORT_Q[qIdx];
    setOrder([...q.words].sort(() => Math.random() - 0.5));
    setAnswers([]); setUsed([]); setChecked(false); setResult(null);
  }, [qIdx]);

  const pick = (word: string, idx: number) => {
    if (checked || used.includes(idx)) return;
    setUsed(u => [...u, idx]);
    setAnswers(a => [...a, word]);
  };

  const remove = (i: number) => {
    if (checked) return;
    const newAns = answers.filter((_, j) => j !== i);
    setAnswers(newAns);
    const newUsed: number[] = [];
    for (const w of newAns) {
      const j = order.findIndex((ww, k) => ww === w && !newUsed.includes(k));
      if (j >= 0) newUsed.push(j);
    }
    setUsed(newUsed);
  };

  const check = () => {
    const q = SORT_Q[qIdx];
    if (answers.length < q.answer.length) return;
    setChecked(true);
    const ok = answers.join('|') === q.answer.join('|');
    setResult(ok ? 'ok' : 'ng');
    if (ok && qIdx < SORT_Q.length - 1) {
      timerRef.current = setTimeout(() => setQIdx(i => i + 1), 900);
    } else if (ok) {
      setAllDone(true);
    }
  };

  const reset = () => {
    const q = SORT_Q[qIdx];
    setOrder([...q.words].sort(() => Math.random() - 0.5));
    setAnswers([]); setUsed([]); setChecked(false); setResult(null);
  };

  const q = SORT_Q[qIdx];
  const trackBg = result === 'ok' ? 'var(--color-mint-soft)' : result === 'ng' ? 'rgba(214,86,86,0.06)' : 'var(--color-surface-3)';
  const trackBorder = result === 'ok' ? 'var(--color-mint-strong)' : result === 'ng' ? 'var(--color-status-danger)' : 'var(--color-border-1)';

  return (
    <div>
      <div style={{ fontSize: 15, color: C.muted, marginBottom: 4 }}>{t('grammar.quiz_q_number', lang).replace('{n}', String(qIdx + 1)).replace('{total}', String(SORT_Q.length))}</div>
      <div style={{ fontSize: 15, background: C.bg, borderRadius: 10, padding: '8px 12px', color: C.muted, marginBottom: 10 }}>{q.hint}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {order.map((w, i) => (
          <button key={i} onClick={() => pick(w, i)} disabled={used.includes(i)} style={{ padding: '8px 14px', borderRadius: 12, background: C.card, border: `1.5px solid ${C.line}`, fontSize: 17, fontWeight: 700, color: used.includes(i) ? 'var(--color-border-3)' : C.ink, cursor: used.includes(i) ? 'default' : 'pointer', opacity: used.includes(i) ? 0.3 : 1 }}>{w}</button>
        ))}
      </div>
      <div style={{ minHeight: 50, border: `2px dashed ${trackBorder}`, borderRadius: 14, padding: '8px 12px', display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', background: trackBg, marginBottom: 8 }}>
        {answers.length === 0
          ? <span style={{ fontSize: 16, color: 'var(--color-border-3)' }}>{t('grammar.quiz_placeholder', lang)}</span>
          : answers.map((w, i) => <button key={i} onClick={() => remove(i)} style={{ padding: '6px 12px', borderRadius: 10, background: C.pink, color: 'white', fontSize: 17, fontWeight: 700, border: 'none', cursor: 'pointer' }}>{w}</button>)
        }
      </div>
      {result && <div style={{ fontSize: 15, fontWeight: 700, color: result === 'ok' ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        {result === 'ok' ? (allDone ? t('grammar.practice_sort_all_done', lang) : t('grammar.quiz_correct', lang)) : t('grammar.quiz_wrong_sort', lang).replace('{answer}', q.answer.join(' '))}
        {result !== 'ok' && <button onClick={() => speak(q.answer.join(' '))} style={{ padding: 4, borderRadius: 6, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={12} /></button>}
      </div>}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={reset} style={{ padding: '12px 16px', borderRadius: 14, border: `1.5px solid ${C.line}`, background: C.card, color: C.muted, fontSize: 16, cursor: 'pointer' }}>{t('grammar.quiz_reset', lang)}</button>
        <button onClick={check} style={{ flex: 1, padding: 12, borderRadius: 14, border: 'none', background: 'var(--color-ink-1)', color: 'white', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>{t('grammar.quiz_check', lang)}</button>
      </div>
    </div>
  );
}

function FillStep({ data, onScore }: { data: typeof FILL3_DATA; onScore?: (s: { correct: number; total: number }) => void }) {
  const C = useC();
  const { lang } = useLang();
  const [states, setStates] = React.useState<FillState[]>(() => data.map(() => ({ done: false, ok: null, picked: null })));

  const pick = (i: number, opt: string) => {
    if (states[i].done) return;
    const ok = opt === data[i].ans;
    const newStates = states.map((item, j) => j === i ? { done: true, ok, picked: opt } : item);
    setStates(newStates);
    const correct = newStates.filter(s => s.ok).length;
    const answered = newStates.filter(s => s.done).length;
    onScore?.({ correct, total: answered });
  };

  return (
    <div>
      {data.map((q, i) => {
        const s = states[i];
        const blank = s.done
          ? <span style={{ color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', fontWeight: 800 }}>{s.picked}</span>
          : <span style={{ display: 'inline-block', width: 32, height: 18, borderBottom: '2px solid #aee3d8', verticalAlign: 'bottom' }} />;
        const sentence = q.post ? <>{q.pre}{blank} {q.post}</> : <>{q.pre}{blank}</>;
        return (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 15, color: C.muted, fontWeight: 700, marginBottom: 10 }}>{t('grammar.quiz_q_simple', lang).replace('{n}', String(i + 1))}</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.ink, marginBottom: 10 }}>{sentence}</div>
            {q.opts.map(opt => {
              let border = '1.5px solid #eee0d8', bg = 'white';
              if (s.done) {
                if (opt === q.ans) { border = '1.5px solid #2db89b'; bg = 'var(--color-mint-soft)'; }
                else if (opt === s.picked && s.picked !== q.ans) { border = '1.5px solid #e05555'; bg = 'rgba(214,86,86,0.08)'; }
              }
              return (
                <button key={opt} onClick={() => pick(i, opt)} style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 14, border, background: bg, fontSize: 17, fontWeight: 700, color: C.ink, cursor: 'pointer', margin: '0 8px 8px 0' }}>{opt}</button>
              );
            })}
            {s.done && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 16, color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', fontWeight: 700, margin: '6px 0 2px' }}>{s.ok ? t('grammar.quiz_correct', lang) : t('grammar.quiz_wrong_answer', lang).replace('{answer}', q.ans)}</div>
                <div style={{ fontSize: 15, color: C.muted }}>{q.why}</div>
              </div>
            )}
            {!s.done && <div style={{ marginBottom: 14 }} />}
          </div>
        );
      })}
    </div>
  );
}

function MorphStep({ onScore }: { onScore?: (s: { correct: number; total: number }) => void }) {
  const C = useC();
  const { lang } = useLang();
  const [states, setStates] = React.useState<FillState[]>(() => MORPH_DATA.map(() => ({ done: false, ok: null, picked: null })));

  const pick = (i: number, opt: string) => {
    if (states[i].done) return;
    const ok = opt === MORPH_DATA[i].ans;
    const newStates = states.map((item, j) => j === i ? { done: true, ok, picked: opt } : item);
    setStates(newStates);
    const correct = newStates.filter(s => s.ok).length;
    const answered = newStates.filter(s => s.done).length;
    onScore?.({ correct, total: answered });
  };

  return (
    <div>
      {MORPH_DATA.map((q, i) => {
        const s = states[i];
        return (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 15, color: C.muted, fontWeight: 700, marginBottom: 10 }}>{t('grammar.quiz_q_simple', lang).replace('{n}', String(i + 1))}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.ink, marginBottom: 12 }}>{q.label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
              {q.opts.map(opt => {
                let border = '1.5px solid #eee0d8', bg = 'white';
                if (s.done) {
                  if (opt === q.ans) { border = '1.5px solid #2db89b'; bg = 'var(--color-mint-soft)'; }
                  else if (opt === s.picked && s.picked !== q.ans) { border = '1.5px solid #e05555'; bg = 'rgba(214,86,86,0.08)'; }
                }
                return (
                  <button key={opt} onClick={() => pick(i, opt)} style={{ padding: '10px 16px', borderRadius: 14, border, background: bg, fontSize: 17, fontWeight: 700, color: C.ink, cursor: 'pointer' }}>{opt}</button>
                );
              })}
            </div>
            {s.done && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 16, color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', fontWeight: 700, margin: '6px 0 2px' }}>{s.ok ? t('grammar.quiz_correct', lang) : t('grammar.quiz_wrong_answer', lang).replace('{answer}', q.ans)}</div>
                <div style={{ fontSize: 15, color: C.muted }}>{q.why}</div>
              </div>
            )}
            {!s.done && <div style={{ marginBottom: 12 }} />}
          </div>
        );
      })}
    </div>
  );
}

function JudgeStep({ onScore }: { onScore?: (s: { correct: number; total: number }) => void }) {
  const C = useC();
  const { lang } = useLang();
  const [states, setStates] = React.useState<JudgeState[]>(() => JUDGE_DATA.map(() => ({ done: false, ok: null, picked: null })));

  const pick = (i: number, choice: string) => {
    if (states[i].done) return;
    const ok = choice === JUDGE_DATA[i].ans;
    const newStates = states.map((item, j) => j === i ? { done: true, ok, picked: choice } : item);
    setStates(newStates);
    const correct = newStates.filter(s => s.ok).length;
    const answered = newStates.filter(s => s.done).length;
    onScore?.({ correct, total: answered });
  };

  return (
    <div>
      {JUDGE_DATA.map((q, i) => {
        const s = states[i];
        const btnStyle = (choice: string): React.CSSProperties => {
          if (!s.done) return { border: `1.5px solid ${C.line}`, background: C.card };
          if (choice === q.ans) return { border: '1.5px solid #2db89b', background: 'var(--color-mint-soft)' };
          if (choice === s.picked && s.picked !== q.ans) return { border: '1.5px solid #e05555', background: 'rgba(214,86,86,0.08)' };
          return { border: `1.5px solid ${C.line}`, background: C.card };
        };
        return (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 15, color: C.muted, fontWeight: 700, marginBottom: 10 }}>{t('grammar.quiz_q_natural', lang).replace('{n}', String(i + 1))}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8 }}>
              {(['A', 'B'] as const).map(ch => (
                <div key={ch} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button onClick={() => pick(i, ch)} style={{ flex: 1, padding: '11px 14px', borderRadius: 14, fontSize: 17, fontWeight: 700, color: C.ink, cursor: 'pointer', textAlign: 'left', ...btnStyle(ch) }}>
                    {ch}. {ch === 'A' ? q.A : q.B}
                  </button>
                  <button onClick={() => speak(ch === 'A' ? q.A : q.B)} style={{ padding: 6, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={13} /></button>
                </div>
              ))}
            </div>
            {s.done && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 16, color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', fontWeight: 700, margin: '6px 0 2px' }}>{s.ok ? t('grammar.quiz_correct', lang) : t('grammar.quiz_wrong_answer', lang).replace('{answer}', q.ans)}</div>
                <div style={{ fontSize: 15, color: C.muted }}>{q.why}</div>
              </div>
            )}
            {!s.done && <div style={{ marginBottom: 12 }} />}
          </div>
        );
      })}
    </div>
  );
}

function ErrStep() {
  const C = useC();
  const { lang } = useLang();
  const [states, setStates] = React.useState<ErrState[]>(() => ERR_DATA.map(() => ({ revealed: false })));

  const reveal = (i: number) => setStates(s => s.map((item, j) => j === i ? { revealed: true } : item));

  return (
    <div>
      {ERR_DATA.map((q, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 15, color: C.muted, fontWeight: 700, marginBottom: 10 }}>{t('grammar.quiz_q_find_error', lang).replace('{n}', String(i + 1))}</div>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.line}` }}>
            <div style={{ background: `color-mix(in srgb, #e05555 8%, ${C.card})`, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: 'var(--color-status-danger)', color: 'white', fontSize: 13, fontWeight: 800, padding: '2px 7px', borderRadius: 99, flexShrink: 0 }}>错</span>
              <span style={{ fontSize: 17, fontWeight: 600, flex: 1 }}>{q.wrong}</span>
              <button onClick={() => speak(q.wrong)} style={{ padding: 6, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={13} /></button>
            </div>
            {states[i].revealed ? (
              <>
                <div style={{ background: `color-mix(in srgb, #2db89b 8%, ${C.card})`, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: 'var(--color-mint-strong)', color: 'white', fontSize: 13, fontWeight: 800, padding: '2px 7px', borderRadius: 99, flexShrink: 0 }}>正</span>
                  <span style={{ fontSize: 17, fontWeight: 600, flex: 1 }}>{q.right}</span>
                  <button onClick={() => speak(q.right)} style={{ padding: 6, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={13} /></button>
                </div>
                <div style={{ background: C.bg, borderTop: `1px solid ${C.line}`, padding: '8px 14px', fontSize: 15, color: C.muted, lineHeight: 1.5 }}>{q.why}</div>
              </>
            ) : (
              <div style={{ padding: '10px 14px' }}>
                <button onClick={() => reveal(i)} style={{ padding: '8px 16px', borderRadius: 12, border: '1.5px solid #aee3d8', background: 'var(--color-mint-soft)', color: 'var(--color-mint-strong)', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>{t('grammar.quiz_show_answer', lang)}</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScoreStep({ onComplete, scores }: { onComplete: () => void; scores?: { fill3: number; fill3max: number; fill4: number; fill4max: number; morph: number; morphmax: number; judge: number; judgemax: number } }) {
  const C = useC();
  const { lang } = useLang();
  const total = (scores?.fill3 ?? 0) + (scores?.fill4 ?? 0) + (scores?.morph ?? 0) + (scores?.judge ?? 0);
  const max = (scores?.fill3max ?? FILL3_DATA.length) + (scores?.fill4max ?? FILL4_DATA.length) + (scores?.morphmax ?? MORPH_DATA.length) + (scores?.judgemax ?? JUDGE_DATA.length);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ background: 'linear-gradient(135deg, var(--color-pink-soft), var(--color-mint-soft))', borderRadius: 20, padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 42, fontWeight: 900, color: C.pink }}>{total}<span style={{ fontSize: 18, color: C.muted }}> / {max}</span></div>
        <div style={{ fontSize: 16, color: C.muted, marginTop: 4 }}>{t('grammar.practice_score_correct', lang)}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <div style={{ background: C.bg, borderRadius: 14, padding: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: C.pink }}>{scores?.fill3 ?? 0}/{scores?.fill3max ?? FILL3_DATA.length}</div>
          <div style={{ fontSize: 15, color: C.muted, marginTop: 3 }}>{t('grammar.practice_score_fill1', lang)}</div>
        </div>
        <div style={{ background: C.bg, borderRadius: 14, padding: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: C.pink }}>{scores?.fill4 ?? 0}/{scores?.fill4max ?? FILL4_DATA.length}</div>
          <div style={{ fontSize: 15, color: C.muted, marginTop: 3 }}>{t('grammar.practice_score_fill2', lang)}</div>
        </div>
        <div style={{ background: C.bg, borderRadius: 14, padding: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: C.pink }}>{scores?.morph ?? 0}/{scores?.morphmax ?? MORPH_DATA.length}</div>
          <div style={{ fontSize: 15, color: C.muted, marginTop: 3 }}>{t('grammar.practice_score_morph', lang)}</div>
        </div>
        <div style={{ background: C.bg, borderRadius: 14, padding: 12, textAlign: 'center', gridColumn: 'span 3' }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: C.pink }}>{scores?.judge ?? 0}/{scores?.judgemax ?? JUDGE_DATA.length}</div>
          <div style={{ fontSize: 15, color: C.muted, marginTop: 3 }}>{t('grammar.practice_score_judge', lang)}</div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: '14px 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.muted, marginBottom: 10 }}>{t('grammar.practice_abilities', lang)}</div>
        {[
          '韩语基本语序：谓语放句末',
          '正式体 합니다/습니다，日常体 아요/어요',
          '话题助词 은/는（有收音→은，无收音→는）',
          '宾语助词 을/를（有收音→을，无收音→를）',
          '地点助词 에（方向·存在·时间）vs 에서（动作地点）',
          '过去时 -았/었어요，将来时 -을/ㄹ 거예요',
          '进行时 -고 있어요',
        ].map((item, i) => (
          <div key={i} style={{ fontSize: 15, color: C.ink, lineHeight: 1.8 }}>✓ {item}</div>
        ))}
      </div>
      <div style={{ background: C.bg, borderRadius: 16, padding: '14px 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.muted, marginBottom: 4 }}>{t('grammar.practice_next_phase', lang)}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>02｜常用固定句型及助词</div>
        <div style={{ fontSize: 15, color: C.muted, marginTop: 3 }}>去哪里、和谁、有/没有、请求命令、数词量词……</div>
      </div>
      <button onClick={onComplete} style={{ width: '100%', padding: 14, borderRadius: 16, border: 'none', background: 'linear-gradient(135deg,#aee3d8,#ff7fa8)', color: 'white', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
        {t('grammar.practice_complete_btn', lang)}
      </button>
    </div>
  );
}

const STEP_CONFIG_ZH = [
  { badge: '📋', label: '练习说明', color: 'var(--color-pink-base)' },
  { badge: '🎯', label: '句子排序', color: 'var(--color-mint-strong)' },
  { badge: '✏️', label: '助词填空①', color: 'var(--color-purple-strong)' },
  { badge: '✏️', label: '助词填空②', color: 'var(--color-purple-base)' },
  { badge: '🔄', label: '变形练习', color: 'var(--color-mint-strong)' },
  { badge: '✅', label: '判断正误', color: 'var(--color-status-warning)' },
  { badge: '⚠️', label: '改错练习', color: 'var(--color-status-danger)' },
  { badge: '🏆', label: '练习完成', color: 'var(--color-peach-base,#e07a30)' },
];
const STEP_CONFIG_EN = [
  { badge: '📋', label: 'Overview', color: 'var(--color-pink-base)' },
  { badge: '🎯', label: 'Word order', color: 'var(--color-mint-strong)' },
  { badge: '✏️', label: 'Particles ①', color: 'var(--color-purple-strong)' },
  { badge: '✏️', label: 'Particles ②', color: 'var(--color-purple-base)' },
  { badge: '🔄', label: 'Conjugation', color: 'var(--color-mint-strong)' },
  { badge: '✅', label: 'True/False', color: 'var(--color-status-warning)' },
  { badge: '⚠️', label: 'Error correction', color: 'var(--color-status-danger)' },
  { badge: '🏆', label: 'Results', color: 'var(--color-peach-base,#e07a30)' },
];
const STEPS_TOTAL = 8;

function ComprehensivePractice({ card, onBack, onComplete }: { card: GrammarCard; onBack: () => void; onComplete: () => void }) {
  const C = useC();
  const { lang } = useLang();
  const [step, setStep] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const [scores, setScores] = React.useState({ fill3: 0, fill3max: FILL3_DATA.length, fill4: 0, fill4max: FILL4_DATA.length, morph: 0, morphmax: MORPH_DATA.length, judge: 0, judgemax: JUDGE_DATA.length });
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const configs = lang === 'en' ? STEP_CONFIG_EN : STEP_CONFIG_ZH;
  const cfg = configs[step];
  const progress = ((step + 1) / STEPS_TOTAL) * 100;

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {/* 顶部 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: C.card, borderBottom: `1px solid ${C.line}`, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 10, background: C.bg, border: 'none', cursor: 'pointer', fontSize: 18, color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: C.ink }}>{t('grammar.practice_title', lang)}</span>
            <span style={{ fontSize: 15, color: C.muted, fontWeight: 700 }}>{step + 1} / {STEPS_TOTAL}</span>
          </div>
          <div style={{ height: 5, background: C.line, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg,#aee3d8,#ff7fa8)', borderRadius: 99, width: `${progress}%`, transition: 'width .45s' }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: isMobile ? `0 0 calc(90px + 56px + env(safe-area-inset-bottom, 0px))` : '16px 24px 40px' }}>
        {/* Badge */}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 16, fontWeight: 800, padding: '3px 10px', borderRadius: 99, background: `${cfg.color}18`, color: cfg.color, alignSelf: 'flex-start', marginTop: isMobile ? 12 : 0, marginLeft: isMobile ? 16 : 0, marginBottom: 8 }}>
          {cfg.badge} {cfg.label}
        </span>
        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: isMobile ? 16 : 22, padding: isMobile ? '24px 20px' : '32px 32px', boxShadow: '0 4px 20px rgba(78,52,46,.09)', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Step 0: 说明 */}
          {step === 0 && (
            <>
              <div style={{ fontSize: 21, fontWeight: 900, color: C.ink }}>{t('grammar.practice_intro_title', lang)}</div>
              <div style={{ fontSize: 16, color: C.muted, lineHeight: 1.7 }}>{t('grammar.practice_intro_desc', lang)}</div>
              <div style={{ background: 'linear-gradient(135deg, var(--color-pink-soft), var(--color-mint-soft))', borderRadius: 22, padding: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.muted, marginBottom: 12 }}>{t('grammar.practice_coverage_title', lang)}</div>
                {[
                  ['🔤','韩语基本语序','谓语放句末'],
                  ['🎙️','正式礼貌体','합니다 / 습니다 / 입니다'],
                  ['💬','日常礼貌体','아요 / 어요 / 예요 / 이에요'],
                  ['🏷️','话题助词','은 / 는'],
                  ['🎯','宾语助词','을 / 를'],
                  ['📍','地点与时间','에 / 에서'],
                  ['⏳','时态','过去 / 将来 / 进行时'],
                ].map(([icon, title, sub]) => (
                  <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.card, borderRadius: 14, padding: '10px 14px', marginBottom: 6 }}>
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: C.ink }}>{title}</div>
                      <div style={{ fontSize: 15, color: C.muted }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: '13px 15px', fontSize: 15, color: C.muted, lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: lang === 'en'
                ? 'Includes <b>7 exercises</b>: word order, fill-in, conjugation, judgment & error correction.<br />Wrong answers show the correct answer — just keep going.'
                : '共 <span style="color:#ff7fa8;font-weight:700">7 组练习</span>，包含排序、填空、变形、判断和改错。<br />选错了会显示正确答案，可以继续往下做。' }} />
            </>
          )}

          {/* Step 1: 排序 */}
          {step === 1 && (
            <>
              <div style={{ fontSize: 21, fontWeight: 900, color: C.ink }}>{t('grammar.practice_sort_title', lang)}</div>
              <div style={{ fontSize: 16, color: C.muted, lineHeight: 1.65 }}>{t('grammar.practice_sort_desc', lang)}</div>
              <SortStep onDone={() => {}} />
            </>
          )}

          {/* Step 2: 填空① */}
          {step === 2 && (
            <>
              <div style={{ fontSize: 21, fontWeight: 900, color: C.ink }}>{t('grammar.practice_fill1_title', lang)}</div>
              <div style={{ fontSize: 16, color: C.muted, lineHeight: 1.7 }}>{t('grammar.practice_fill1_desc', lang)}</div>
              <FillStep data={FILL3_DATA} onScore={s => setScores(prev => ({ ...prev, fill3: s.correct }))} />
            </>
          )}

          {/* Step 3: 填空② */}
          {step === 3 && (
            <>
              <div style={{ fontSize: 21, fontWeight: 900, color: C.ink }}>{t('grammar.practice_fill2_title', lang)}</div>
              <div style={{ fontSize: 16, color: C.muted, lineHeight: 1.7 }}>{t('grammar.practice_fill2_desc', lang)}</div>
              <FillStep data={FILL4_DATA} onScore={s => setScores(prev => ({ ...prev, fill4: s.correct }))} />
            </>
          )}

          {/* Step 4: 变形 */}
          {step === 4 && (
            <>
              <div style={{ fontSize: 21, fontWeight: 900, color: C.ink }}>{t('grammar.practice_morph_title', lang)}</div>
              <div style={{ fontSize: 16, color: C.muted, lineHeight: 1.7 }}>{t('grammar.practice_morph_desc', lang)}</div>
              <MorphStep onScore={s => setScores(prev => ({ ...prev, morph: s.correct }))} />
            </>
          )}

          {/* Step 5: 判断 */}
          {step === 5 && (
            <>
              <div style={{ fontSize: 21, fontWeight: 900, color: C.ink }}>{t('grammar.practice_judge_title', lang)}</div>
              <div style={{ fontSize: 16, color: C.muted, lineHeight: 1.7 }}>{t('grammar.practice_judge_desc', lang)}</div>
              <JudgeStep onScore={s => setScores(prev => ({ ...prev, judge: s.correct }))} />
            </>
          )}

          {/* Step 6: 改错 */}
          {step === 6 && (
            <>
              <div style={{ fontSize: 21, fontWeight: 900, color: C.ink }}>{t('grammar.practice_error_title', lang)}</div>
              <div style={{ fontSize: 16, color: C.muted, lineHeight: 1.7 }}>{t('grammar.practice_error_desc', lang)}</div>
              <ErrStep />
            </>
          )}

          {/* Step 7: 完成 */}
          {step === 7 && <ScoreStep onComplete={onComplete} scores={scores} />}
        </div>
      </div>

      {/* 底部导航 */}
      {step < 7 && (
        <div style={isMobile ? { position: 'fixed', bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))', left: 0, right: 0, padding: '12px 16px', background: C.card, borderTop: `1px solid ${C.line}`, display: 'flex', gap: 10, zIndex: 70 } : { padding: '12px 0 0', display: 'flex', gap: 10 }}>
          {step > 0 && (
            <button onClick={() => { setStep(s => s - 1); window.scrollTo(0, 0); }} style={{ padding: '14px 16px', borderRadius: 16, border: `1.5px solid ${C.line}`, background: C.card, color: C.muted, fontSize: 15, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>{t('grammar.nav_prev_page', lang)}</button>
          )}
          <button onClick={() => { setStep(s => s + 1); window.scrollTo(0, 0); }} style={{ flex: 1, padding: 14, borderRadius: 16, border: 'none', background: 'var(--color-ink-1)', color: 'white', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
            {step === 6 ? t('grammar.nav_see_result', lang) : t('grammar.nav_next_page', lang)}
          </button>
        </div>
      )}
    </div>
  );
}

// ── ChaptersTab ───────────────────────────────────────────────────────────────

function ChaptersTab({ onOpenCard, isAdmin }: { onOpenCard: (card: GrammarCard) => void; isAdmin: boolean }) {
  const C = useC();
  const { lang } = useLang();
  const { user } = useAuth();
  const [lessonStates, setLessonStates] = useState<Record<string, LessonStatus>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set([1]));
  const [activeLevel, setActiveLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  useEffect(() => {
    setLessonStates(loadLessonStates(user?.id));
    setIsLoaded(true);
  }, [user?.id]);

  const toggle = (partNumber: number) => setExpanded(prev => {
    const next = new Set(prev);
    next.has(partNumber) ? next.delete(partNumber) : next.add(partNumber);
    return next;
  });

  const totalLessons = grammarParts.reduce((sum, p) => sum + p.lessons.length, 0);
  const doneLessons = Object.values(lessonStates).filter(s => s === 'done').length;

  const [continueCard, setContinueCard] = useState<GrammarCard | null>(null);
  const [continuePartTitle, setContinuePartTitle] = useState('');
  const partNums = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四'];

  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;
    (async () => {
      for (const part of grammarParts) {
        for (const lesson of part.lessons) {
          if (lessonStates[lesson.cardId] === 'done') continue;
          if (!isAdmin && lesson.lessonNumber === 11 && part.partNumber !== 1) continue;
          const card = await loadGrammarCard(lesson.cardId);
          if (!cancelled && card) {
            setContinueCard(card);
            setContinuePartTitle(lang === 'en' ? `Part ${part.partNumber} · ${part.title}` : `第${partNums[part.partNumber - 1]}部分 · ${part.title}`);
          }
          return;
        }
      }
    })();
    return () => { cancelled = true; };
  }, [isLoaded, lessonStates, isAdmin]);

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
        {[
          { n: doneLessons, l: t('grammar.chapters_done_count', lang), c: 'var(--color-mint-strong)' },
          { n: doneLessons > 0 && doneLessons < totalLessons ? 1 : 0, l: t('grammar.chapters_in_progress', lang), c: C.pink },
          { n: totalLessons, l: t('grammar.chapters_total', lang), c: C.ink },
        ].map(({ n, l, c }) => (
          <div key={l} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 20, padding: '14px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: c, lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 5 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* 整体进度 */}
      <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 24, padding: '16px 18px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 800 }}>{t('grammar.chapters_overall_progress', lang)}</span>
          <span style={{ fontSize: 13, color: C.muted }}>{continueCard ? continuePartTitle : doneLessons === totalLessons ? t('grammar.chapters_all_done', lang) : t('grammar.chapters_from_part1', lang)}</span>
        </div>
        <div style={{ height: 8, background: C.line, borderRadius: 999, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${C.mint}, ${C.pink})`, width: `${(doneLessons / totalLessons) * 100}%`, transition: 'width .4s' }} />
        </div>
        <p style={{ fontSize: 13, color: C.muted }}>{t('grammar.chapters_completed_n', lang).replace('{done}', String(doneLessons)).replace('{total}', String(totalLessons))}</p>
      </div>

      {/* 继续学习 */}
      {continueCard && (
        <div
          onClick={() => onOpenCard(continueCard!)}
          style={{ background: `linear-gradient(135deg, rgba(255,127,168,.07), rgba(180,156,207,.07))`, border: `1.5px solid rgba(255,127,168,.2)`, borderRadius: 28, padding: 20, marginBottom: 16, cursor: 'pointer', boxShadow: '0 8px 32px rgba(255,127,168,.1)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 800 }}>{t('grammar.chapters_continue', lang)}</span>
            <span style={{ fontSize: 13, fontWeight: 800, background: C.pinkSoft, color: C.pink, borderRadius: 999, padding: '4px 12px' }}>{t('grammar.chapters_in_progress', lang)}</span>
          </div>
          <p style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>{t('grammar.chapters_lesson_n', lang).replace('{n}', String(continueCard.lessonNumber))}</p>
          <p style={{ fontSize: 15, color: C.ink, fontWeight: 800, marginBottom: 2 }}>{continueCard.title}</p>
          {continueCard.whatItDoes && !continueCard.isPractice && (
            <p style={{ fontSize: 15, color: C.muted, marginBottom: 16 }}>{continueCard.whatItDoes}</p>
          )}
          <div style={{ marginBottom: (!continueCard.whatItDoes || continueCard.isPractice) ? 16 : 0 }} />
          <button
            onClick={e => { e.stopPropagation(); onOpenCard(continueCard!); }}
            style={{ width: '100%', padding: '14px 0', borderRadius: 99, background: C.pink, color: '#fff', fontSize: 16, fontWeight: 800, border: 'none', cursor: 'pointer' }}
          >
            {t('grammar.chapters_continue', lang)}
          </button>
        </div>
      )}

      <p style={{ fontSize: 13, fontWeight: 800, color: C.muted, letterSpacing: '.6px', textTransform: 'uppercase', margin: '18px 0 10px' }}>{t('grammar.chapters_all_parts', lang)}</p>

      <div style={{ display: 'flex', gap: 6, padding: 4, background: 'var(--color-surface-4)', borderRadius: 14, marginBottom: 14 }}>
        {([
          { key: 'beginner', label: lang === 'en' ? 'Beginner' : '初级', sub: 'P1-P6' },
          { key: 'intermediate', label: lang === 'en' ? 'Intermediate' : '中级', sub: 'P7-P16' },
          { key: 'advanced', label: lang === 'en' ? 'Advanced' : '高级', sub: 'P17-P30' },
        ] as const).map(tab => {
          const active = activeLevel === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveLevel(tab.key)}
              style={{
                flex: 1,
                padding: '10px 4px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                background: active ? C.card : 'transparent',
                boxShadow: active ? '0 2px 6px rgba(78,52,46,.08)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 800, color: active ? C.ink : C.muted }}>{tab.label}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: active ? C.pink : C.muted, letterSpacing: '.4px' }}>{tab.sub}</span>
            </button>
          );
        })}
      </div>

      {(() => {
        const info = {
          beginner: {
            status: lang === 'en' ? 'Complete · 6 parts / 66 lessons' : '已完备 · 6 部 · 66 课',
            gap: lang === 'en' ? '已覆盖 TOPIK 1-2 级核心考纲' : '已覆盖 TOPIK 1-2 级核心考纲',
            color: '#2db89b',
            bg: C.mintBg,
          },
          intermediate: {
            status: lang === 'en' ? 'Complete · 10 parts / 92 lessons' : '已完备 · 10 部 · 92 课',
            gap: lang === 'en' ? 'Optional: 방언/口语音变' : '可选补充：방언 / 口语音变',
            color: '#6b7ff0',
            bg: 'rgba(107,127,240,.08)',
          },
          advanced: {
            status: lang === 'en' ? 'Complete · 15 parts / 116 lessons' : '已完备 · 15 部 · 116 课',
            gap: lang === 'en' ? 'Optional: 网络新造语 / 방언 표현' : '可选补充：网络新造语、방언 표현',
            color: '#ff7fa8',
            bg: C.pinkSoft,
          },
        }[activeLevel];
        return (
          <div style={{ background: info.bg, border: `1px solid ${info.color}33`, borderRadius: 14, padding: '12px 14px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: info.color, letterSpacing: '.4px', marginBottom: 4 }}>{info.status}</div>
            <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.5 }}>{info.gap}</div>
          </div>
        );
      })()}

      {grammarParts.filter(part => {
        if (activeLevel === 'beginner') return part.partNumber <= 6;
        if (activeLevel === 'intermediate') return part.partNumber >= 7 && part.partNumber <= 16;
        return part.partNumber >= 17;
      }).map(part => {
        const isPartLocked = !isAdmin && part.partNumber >= 7;
        const isOpen = !isPartLocked && expanded.has(part.partNumber);
        const doneInPart = part.lessons.filter(l => lessonStates[l.cardId] === 'done').length;
        const isActive = doneInPart > 0 && doneInPart < part.lessons.length;
        const isDone = doneInPart === part.lessons.length;

        return (
          <div key={part.partNumber} style={{ background: C.card, border: `1px solid ${isActive ? 'rgba(255,127,168,.35)' : C.line}`, borderRadius: 24, marginBottom: 10, overflow: 'hidden', boxShadow: isActive ? '0 4px 16px rgba(255,127,168,.08)' : '0 4px 16px rgba(78,52,46,.06)', opacity: isPartLocked ? 0.6 : 1 }}>
            <button
              onClick={() => !isPartLocked && toggle(part.partNumber)}
              style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, cursor: isPartLocked ? 'default' : 'pointer', background: 'transparent', border: 'none', textAlign: 'left' }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isDone ? 20 : 16, fontWeight: 900, flexShrink: 0, background: isPartLocked ? 'var(--color-surface-4)' : isDone ? C.mintBg : isActive ? C.pinkSoft : 'var(--color-surface-4)', color: isPartLocked ? C.muted : isDone ? 'var(--color-mint-strong)' : isActive ? C.pink : C.muted }}>
                {isPartLocked ? <Lock size={16} /> : isDone ? '✓' : partNums[part.partNumber - 1]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: isDone || isActive ? C.ink : C.muted, margin: 0 }}>{lang === 'en' ? `Part ${part.partNumber} · ${part.title}` : `第${partNums[part.partNumber - 1]}部分 · ${part.title}`}</p>
                  {part.partNumber >= 7 && part.partNumber <= 16 && <span style={{ fontSize: 11, fontWeight: 800, background: 'linear-gradient(135deg,#6b7ff0,#a78bfa)', color: 'white', borderRadius: 999, padding: '2px 8px', flexShrink: 0 }}>{lang === 'en' ? 'Intermediate' : '中级'}</span>}
                  {part.partNumber >= 17 && <span style={{ fontSize: 11, fontWeight: 800, background: 'linear-gradient(135deg,#ff7fa8,#ff5c8a)', color: 'white', borderRadius: 999, padding: '2px 8px', flexShrink: 0 }}>{lang === 'en' ? 'Advanced' : '高级'}</span>}
                </div>
                <p style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>{isPartLocked ? t('grammar.chapters_status_coming', lang) : lang === 'en' ? `${part.lessons.length} lessons${doneInPart > 0 ? ` · ${doneInPart}/${part.lessons.length} done` : ''}` : `${part.lessons.length} 课${doneInPart > 0 ? ` · ${doneInPart}/${part.lessons.length} 已完成` : ''}`}</p>
              </div>
              <div style={{ width: 56, height: 6, background: C.line, borderRadius: 999, overflow: 'hidden', flexShrink: 0 }}>
                <div style={{ height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${C.mint}, ${C.pink})`, width: `${(doneInPart / part.lessons.length) * 100}%` }} />
              </div>
              {!isPartLocked && (isOpen ? <ChevronDown size={16} color={C.muted} /> : <ChevronRight size={16} color={C.muted} />)}
            </button>

            {isOpen && (
              <div style={{ borderTop: `1px solid ${C.line}` }}>
                {part.lessons.map(lesson => {
                  const status = lessonStates[lesson.cardId] || 'todo';
                  const isCurrent = continueCard?.id === lesson.cardId;
                  const isPracticeLesson = lesson.lessonNumber === 11;
                  const practiceUnavailable = isPracticeLesson && part.partNumber !== 1;
                  const isLocked = isAdmin ? false : (part.partNumber > 6 || practiceUnavailable);

                  return (
                    <div
                      key={lesson.cardId}
                      onClick={async () => {
                        if (isLocked) return;
                        const card = await loadGrammarCard(lesson.cardId);
                        if (card) onOpenCard(card);
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: `1px solid ${C.line}`, background: isLocked ? 'transparent' : isCurrent ? C.pinkSoft : 'transparent', cursor: isLocked ? 'default' : 'pointer', opacity: isLocked ? 0.45 : 1 }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, flexShrink: 0, background: isLocked ? 'var(--color-surface-4)' : status === 'done' ? C.mintBg : isCurrent ? C.pinkSoft : 'var(--color-surface-4)', border: `1px solid ${isLocked ? C.line : status === 'done' ? C.mint : isCurrent ? C.pink : C.line}`, color: isLocked ? C.muted : status === 'done' ? 'var(--color-mint-strong)' : isCurrent ? C.pink : C.muted }}>
                        {isLocked ? <Lock size={12} /> : status === 'done' ? '✓' : isCurrent ? '▶' : lesson.lessonNumber}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{t('grammar.lesson_label', lang).replace('{n}', String(lesson.lessonNumber))}</p>
                        <p style={{ fontSize: 16, fontWeight: 800, color: isLocked ? C.muted : status === 'done' ? C.ink : isCurrent ? C.ink : C.muted, margin: 0 }}>{lesson.title}</p>
                      </div>
                      {!isLocked && status === 'done' && <span style={{ fontSize: 12, fontWeight: 800, background: C.mintBg, color: 'var(--color-mint-strong)', borderRadius: 999, padding: '3px 10px', flexShrink: 0 }}>{t('grammar.chapters_status_done', lang)}</span>}
                      {!isLocked && isCurrent && status !== 'done' && (
                        <button onClick={async e => { e.stopPropagation(); const c = await loadGrammarCard(lesson.cardId); if (c) onOpenCard(c); }} style={{ padding: '6px 14px', borderRadius: 10, background: C.pink, color: '#fff', fontSize: 13, fontWeight: 800, border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                          {t('grammar.chapters_study_btn', lang)}
                        </button>
                      )}
                      {!isLocked && !isCurrent && status === 'todo' && <span style={{ fontSize: 12, fontWeight: 800, background: C.bg, color: C.muted, borderRadius: 999, padding: '3px 10px', flexShrink: 0 }}>{t('grammar.chapters_status_todo', lang)}</span>}
                      {isLocked && <span style={{ fontSize: 12, fontWeight: 800, background: C.bg, color: C.muted, borderRadius: 999, padding: '3px 10px', flexShrink: 0 }}>{t('grammar.chapters_status_coming', lang)}</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <p style={{ fontSize: 13, color: C.muted, textAlign: 'center', padding: '16px 0 0' }}>{t('grammar.chapters_total_footer', lang).replace('{n}', String(totalLessons))}</p>
    </div>
  );
}

// ── Practice Tab ──────────────────────────────────────────────────────────────

function PracticeTab({
  grammarStates,
  onStartGrammar,
  onStartReview,
}: {
  grammarStates: Record<string, UserGrammarState>;
  onStartGrammar: (gp: GrammarPoint) => void;
  onStartReview: (patterns: GrammarPoint[]) => void;
}) {
  const C = useC();
  const learnedCount = Object.values(grammarStates).filter(s => s.status === 'mastered' || s.status === 'familiar').length;
  const learningCount = Object.values(grammarStates).filter(s => s.status === 'learning').length;
  const difficultCount = Object.values(grammarStates).filter(s => s.status === 'difficult').length;
  const studiedIds = Object.keys(grammarStates);
  const todayPattern = getTodayPattern(studiedIds);
  const now = Date.now();

  const reviewDue = Object.values(grammarStates).filter(s =>
    s.status === 'difficult' || (s.nextReviewAt && s.nextReviewAt <= now),
  );
  const reviewPatterns = reviewDue.map(s => sentencePatterns.find(g => g.id === s.id)).filter(Boolean) as GrammarPoint[];
  const recommended = getRecommendedPatterns(studiedIds, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(learnedCount > 0 || learningCount > 0) && (
        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 20, display: 'flex', justifyContent: 'space-around', padding: '14px 0' }}>
          {[{ n: learnedCount, l: '已掌握', c: 'var(--color-mint-strong)' }, { n: learningCount, l: '学习中', c: C.pink }, { n: difficultCount, l: '易错', c: 'var(--color-ink-3)' }].map(({ n, l, c }, i, arr) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: c }}>{n}</div>
                <div style={{ fontSize: 16, color: C.muted, marginTop: 2 }}>{l}</div>
              </div>
              {i < arr.length - 1 && <div style={{ width: 1, height: 32, background: C.line, margin: '0 16px' }} />}
            </div>
          ))}
        </div>
      )}

      {reviewPatterns.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg, rgba(232,168,124,.08), rgba(255,127,168,.08))', border: '1.5px solid rgba(232,168,124,.2)', borderRadius: 20, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 16 }}>✨</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>需要复习</span>
            <span style={{ fontSize: 15, color: C.muted }}>{reviewPatterns.length} 个句型待巩固</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            {reviewPatterns.slice(0, 4).map(gp => (
              <button key={gp.id} onClick={() => onStartGrammar(gp)} style={{ padding: '6px 12px', borderRadius: 8, background: C.card, border: `1px solid ${C.line}`, fontSize: 16, color: C.ink, cursor: 'pointer' }}>
                {gp.displayTitle}
              </button>
            ))}
          </div>
          <button onClick={() => onStartReview(reviewPatterns)} style={{ width: '100%', padding: '10px 0', background: 'rgba(232,168,124,.1)', border: '1px solid rgba(232,168,124,.2)', borderRadius: 12, fontSize: 15, fontWeight: 600, color: 'var(--color-ink-3)', cursor: 'pointer' }}>
            复习 {reviewPatterns.length} 个句型
          </button>
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, rgba(255,127,168,.08), rgba(180,156,207,.08))', border: '1.5px solid rgba(255,127,168,.18)', borderRadius: 24, padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 16 }}>🎯</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>今日句型</span>
          <span style={{ fontSize: 15, color: C.muted, marginLeft: 'auto' }}>~3 分钟</span>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <p style={{ fontSize: 15, color: C.muted, marginBottom: 4 }}>今天学会：</p>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: C.ink, margin: 0 }}>{todayPattern.displayTitle}</h2>
          <p style={{ fontSize: 16, color: C.muted, fontFamily: 'monospace', marginTop: 4 }}>{todayPattern.pattern}</p>
        </div>
        <p style={{ fontSize: 16, color: C.muted, marginBottom: 14 }}>{todayPattern.functionZh}</p>
        <button onClick={() => onStartGrammar(todayPattern)} style={{ width: '100%', padding: '13px 0', borderRadius: 14, background: C.pink, color: '#fff', fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
          开始 3 分钟练习
        </button>
      </div>

      {recommended.length > 0 && (
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 8 }}>推荐学习</p>
          {recommended.map(gp => (
            <button key={gp.id} onClick={() => onStartGrammar(gp)} style={{ width: '100%', background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 8, textAlign: 'left' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: 0 }}>{gp.displayTitle}</p>
                <p style={{ fontSize: 15, color: C.muted, marginTop: 2 }}>{gp.functionZh}</p>
              </div>
              <ChevronRight size={16} color={C.muted} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Library Tab ───────────────────────────────────────────────────────────────

function highlightPattern(text: string, pattern: string): React.ReactNode {
  const raw = pattern.replace(/^-+/, '').replace(/[?+]/g, '');
  const variants: string[] = [];
  const parts = raw.split('/');
  for (const part of parts) {
    const trimmed = part.trim().replace(/^-/, '');
    if (trimmed.includes('(으)')) {
      variants.push(trimmed.replace('(으)', '으'));
      variants.push(trimmed.replace('(으)', ''));
    } else if (trimmed.includes('(이)')) {
      variants.push(trimmed.replace('(이)', '이'));
      variants.push(trimmed.replace('(이)', ''));
    } else if (trimmed.includes('(ㄹ)')) {
      variants.push(trimmed.replace('(ㄹ)', 'ㄹ'));
      variants.push(trimmed.replace('(ㄹ)', ''));
    } else {
      if (trimmed) variants.push(trimmed);
    }
  }
  if (variants.length === 0) return text;
  variants.sort((a, b) => b.length - a.length);
  const escaped = variants.map(v => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`);
  const match = text.match(regex);
  if (!match || match.index === undefined) return text;
  const before = text.slice(0, match.index);
  const matched = match[0];
  const after = text.slice(match.index + matched.length);
  return (
    <>
      {before}
      <mark style={{ background: 'rgba(255,127,168,0.18)', color: 'var(--color-status-danger)', borderRadius: 3, padding: '0 1px', fontWeight: 700 }}>{matched}</mark>
      {after}
    </>
  );
}

function LibraryTab({ onStartGrammar }: { onStartGrammar: (gp: GrammarPoint) => void }) {
  const C = useC();
  const { lang } = useLang();
  const router = useRouter();
  const { user } = useAuth();
  const favKey = user?.id ? `grammar-favorites:${user.id}` : 'grammar-favorites';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem(user?.id ? `grammar-favorites:${user.id}` : 'grammar-favorites') || '[]'); } catch { return []; }
  });

  // Re-load favorites when user changes (login/logout/switch account)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try { setFavorites(JSON.parse(localStorage.getItem(favKey) || '[]')); } catch { setFavorites([]); }
  }, [favKey]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try { localStorage.setItem(favKey, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const categories = ['조사', '어미', '연결', '시제', '존대', '문형', '인용', '사동/피동'];
  const categoryLabels: Record<string, string> = {
    '조사': '助词', '어미': '语尾', '연결': '连接',
    '시제': '时制', '존대': '敬语', '문형': '句型',
    '인용': '引用', '사동/피동': '使被动',
  };
  const levelConfig: Record<string, { label: string; bg: string; color: string }> = {
    beginner:     { label: '初级', bg: 'var(--color-mint-soft)', color: 'var(--color-mint-strong)' },
    intermediate: { label: '中级', bg: 'var(--color-pink-soft)', color: 'var(--color-pink-base)' },
    advanced:     { label: '高级', bg: 'var(--color-purple-soft)', color: 'var(--color-purple-base)' },
  };

  const counts = useMemo(() => ({
    beginner:     grammarPoints.filter(g => g.level === 'beginner').length,
    intermediate: grammarPoints.filter(g => g.level === 'intermediate').length,
    advanced:     grammarPoints.filter(g => g.level === 'advanced').length,
  }), []);

  // flat list of all lessons for cross-referencing
  const allLessons = useMemo(() => grammarParts.flatMap(p => p.lessons), []);

  const filtered = useMemo(() => {
    let result = grammarPoints;
    if (showFavorites) result = result.filter(g => favorites.includes(g.id));
    if (activeLevel !== 'all') result = result.filter(g => g.level === activeLevel);
    if (activeCategory !== 'all') result = result.filter(g => g.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.pattern.toLowerCase().includes(q) ||
        g.usage.toLowerCase().includes(q) ||
        g.explanation.toLowerCase().includes(q),
      );
    }
    return result;
  }, [activeLevel, activeCategory, searchQuery, showFavorites, favorites]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      {/* 统计条 */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: C.muted, fontWeight: 600 }}>{t('grammar.library_count', lang).replace('{n}', String(grammarPoints.length))}</span>
        {(['beginner', 'intermediate', 'advanced'] as const).map(lv => (
          <button key={lv} onClick={() => { setActiveLevel(activeLevel === lv ? 'all' : lv); setShowFavorites(false); }}
            style={{ padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', background: activeLevel === lv ? levelConfig[lv].bg : 'transparent', color: activeLevel === lv ? levelConfig[lv].color : C.muted }}>
            {levelConfig[lv].label} {counts[lv]}
          </button>
        ))}
        <button onClick={() => { setShowFavorites(f => !f); setActiveLevel('all'); }}
          style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', background: showFavorites ? 'rgba(255,193,7,.15)' : 'transparent', color: showFavorites ? 'var(--color-status-warning)' : C.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Star size={11} fill={showFavorites ? 'var(--color-status-warning)' : 'none'} />{lang === 'en' ? 'Favorites' : '收藏'} {favorites.length > 0 ? favorites.length : ''}
        </button>
      </div>

      {/* 搜索框 */}
      <div style={{ position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: C.muted }} />
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={t('grammar.library_search_placeholder', lang)}
          style={{ width: '100%', background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: '10px 36px', fontSize: 15, color: C.ink, outline: 'none' }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.muted }}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* 分类筛选 */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
        <button onClick={() => setActiveCategory('all')} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: activeCategory === 'all' ? C.ink : C.card, color: activeCategory === 'all' ? '#fff' : C.muted }}>{t('grammar.library_all', lang)}</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: activeCategory === cat ? C.ink : C.card, color: activeCategory === cat ? '#fff' : C.muted }}>
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {/* 结果数 / 空状态 */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 0', color: C.muted }}>
          <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
            {showFavorites ? t('grammar.library_no_favorites', lang) : t('grammar.library_no_results', lang).replace('{query}', searchQuery)}
          </p>
          <p style={{ fontSize: 13 }}>{showFavorites ? t('grammar.library_no_favorites_hint', lang) : t('grammar.library_no_results_hint', lang)}</p>
        </div>
      ) : (
        <p style={{ fontSize: 13, color: C.muted }}>{t('grammar.library_results', lang).replace('{n}', String(filtered.length))}</p>
      )}

      {/* 列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((gp: LegacyPoint) => {
          const isOpen = expandedId === gp.id;
          const lv = levelConfig[gp.level] || levelConfig.beginner;
          const isFav = favorites.includes(gp.id);
          // 匹配章节学习课程（pattern 或 title 字符串包含关系）
          const matchedLesson = allLessons.find(l =>
            l.title.includes(gp.pattern) || gp.pattern.includes(l.title) ||
            l.title.includes(gp.title) || gp.title.includes(l.title)
          );
          return (
            <div key={gp.id} style={{ background: C.card, border: `1px solid ${isOpen ? C.pink : C.line}`, borderRadius: 20, overflow: 'hidden', transition: 'border-color .15s' }}>
              {/* 标题行 */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', gap: 10 }}>
                <button onClick={() => setExpandedId(isOpen ? null : gp.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', minWidth: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8, background: lv.bg, color: lv.color, flexShrink: 0 }}>{lv.label}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: 0 }}>{gp.title}</p>
                    <p style={{ fontSize: 13, color: C.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 1 }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: C.purple }}>{gp.pattern}</span>
                      {' · '}{gp.topik}
                    </p>
                  </div>
                  {isOpen ? <ChevronDown size={15} color={C.muted} /> : <ChevronRight size={15} color={C.muted} />}
                </button>
                <button onClick={e => toggleFavorite(gp.id, e)} style={{ padding: 6, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, color: isFav ? 'var(--color-status-warning)' : C.muted }}>
                  <Star size={15} fill={isFav ? 'var(--color-status-warning)' : 'none'} />
                </button>
              </div>

              {/* 展开内容 */}
              {isOpen && (
                <div style={{ borderTop: `1px solid ${C.line}`, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>

                  {/* ① 语法说明 */}
                  <div style={{ background: C.bg, borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { l: '结构', v: gp.pattern, mono: true },
                      { l: '意思', v: gp.explanation },
                      ...(gp.conjugation ? [{ l: '接续', v: gp.conjugation, mono: false }] : []),
                      { l: '场景', v: gp.usage },
                    ].map(item => (
                      <div key={item.l} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, width: 28, flexShrink: 0, paddingTop: 2 }}>{item.l}</span>
                        <span style={{ fontSize: 15, fontFamily: item.mono ? 'monospace' : undefined, fontWeight: item.mono ? 700 : undefined, color: item.mono ? C.purple : C.ink, lineHeight: 1.6 }}>{item.v}</span>
                      </div>
                    ))}
                  </div>

                  {/* ② 例句 */}
                  {gp.examples.length > 0 && (
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: '.5px', marginBottom: 8 }}>{t('grammar.library_example_count', lang).replace('{n}', String(gp.examples.length))}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {gp.examples.map((ex, i) => (
                          <div key={i} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: 16, fontWeight: 600, color: C.ink, margin: 0 }}>{highlightPattern(ex.ko, gp.pattern)}</p>
                              <p style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{ex.zh}</p>
                              {ex.note && (
                                <p style={{ fontSize: 12, color: C.pink, marginTop: 4, margin: '4px 0 0', fontStyle: 'italic' }}>💡 {ex.note}</p>
                              )}
                            </div>
                            <button onClick={e => { e.stopPropagation(); speak(ex.ko); }} style={{ padding: 6, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}>
                              <Volume2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* toriTip */}
                  {gp.toriTip && (
                    <div style={{ background: 'rgba(232,168,124,.08)', border: '1px solid rgba(232,168,124,.2)', borderRadius: 12, padding: 12 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-ink-3)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}><Lightbulb size={11} />{t('grammar.library_practice_tip', lang)}</p>
                      <p style={{ fontSize: 14, color: C.muted }}>{gp.toriTip}</p>
                    </div>
                  )}

                  {/* 相似语法 */}
                  {gp.difference && gp.similarPatterns && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: 'rgba(180,156,207,.08)', border: '1px solid rgba(180,156,207,.15)', borderRadius: 12, padding: 12 }}>
                      <AlertCircle size={13} style={{ color: C.purple, flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: C.purple, marginBottom: 4 }}>{t('grammar.library_difference', lang).replace('{patterns}', gp.similarPatterns.join(', '))}</p>
                        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{gp.difference}</p>
                      </div>
                    </div>
                  )}

                  {/* ③ 底部操作 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {matchedLesson && (
                      <button onClick={() => router.push(`/grammar?card=${matchedLesson.cardId}`)}
                        style={{ width: '100%', padding: '10px 0', borderRadius: 12, background: C.mintBg, border: `1px solid ${C.mint}`, fontSize: 14, fontWeight: 700, color: 'var(--color-mint-strong)', cursor: 'pointer' }}>
                        {t('grammar.library_go_lesson', lang)}
                      </button>
                    )}
                    {(() => {
                      const sp = sentencePatterns.find(p => p.id === gp.id);
                      return sp ? (
                        <button onClick={() => onStartGrammar(sp)}
                          style={{ width: '100%', padding: '10px 0', borderRadius: 12, background: 'rgba(255,127,168,.1)', border: '1px solid rgba(255,127,168,.2)', fontSize: 14, fontWeight: 700, color: C.pink, cursor: 'pointer' }}>
                          {t('grammar.library_practice_pattern', lang)}
                        </button>
                      ) : null;
                    })()}
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

function GrammarContent() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const { lang } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const isAdmin = user?.role === 'admin';
  const [tab, setTab] = useState<Tab>('chapters');
  const [grammarStates, setGrammarStates] = useState<Record<string, UserGrammarState>>({});
  const [sessionGrammar, setSessionGrammar] = useState<GrammarPoint | null>(null);
  const [reviewQueue, setReviewQueue] = useState<GrammarPoint[]>([]);
  const [activeCard, setActiveCard] = useState<GrammarCard | null>(null);
  const savedScrollY = useRef(0);
  const openCard = (card: GrammarCard) => {
    if (card.isPractice && card.partNumber !== 1 && !isAdmin) return;
    savedScrollY.current = window.scrollY;
    setActiveCard(card);
  };
  const closeCard = () => { setActiveCard(null); requestAnimationFrame(() => window.scrollTo(0, savedScrollY.current)); };

  useEffect(() => {
    let cancelled = false;
    db.userGrammarStates.toArray().then(states => {
      if (cancelled) return;
      const map: Record<string, UserGrammarState> = {};
      for (const s of states) map[s.id] = s;
      setGrammarStates(map);
    }).catch((err) => console.warn('IndexedDB error:', err));
    return () => { cancelled = true; };
  }, [user?.id]);

  useEffect(() => {
    const patternParam = searchParams.get('pattern');
    if (patternParam) {
      const gp = sentencePatterns.find(g => g.id === patternParam);
      if (gp) setSessionGrammar(gp);
    }
    const cardParam = searchParams.get('card');
    if (cardParam) {
      loadGrammarCard(cardParam).then(card => {
        if (card) { setTab('chapters'); openCard(card); }
      });
    }
  }, [searchParams]);

  const startReview = (patterns: GrammarPoint[]) => {
    if (patterns.length === 0) return;
    setSessionGrammar(patterns[0]);
    setReviewQueue(patterns.slice(1));
  };

  const handleCloseSession = () => {
    db.userGrammarStates.toArray().then(states => {
      const map: Record<string, UserGrammarState> = {};
      for (const s of states) map[s.id] = s;
      setGrammarStates(map);
    }).catch((err) => console.warn('IndexedDB error:', err));
    setSessionGrammar(null);
    setReviewQueue([]);
  };

  const handleCompleteCard = async (card: GrammarCard) => {
    try {
      saveLessonState(user?.id, card.id, 'done');
    } catch (e) {
      console.warn('Failed to save lesson state:', e);
    }

    const next = await loadNextCard(card.id);
    if (next && (isAdmin || next.partNumber === 1)) {
      setActiveCard(next);
      window.scrollTo(0, 0);
    } else {
      setActiveCard(null);
      if (!isAdmin && next && next.partNumber !== 1) {
        setTimeout(() => showToast('第 ' + next.partNumber + ' 部分即将开放，敬请期待！', 'info'), 100);
      }
    }
  };

  if (sessionGrammar) {
    return (
      <GrammarSession
        key={sessionGrammar.id}
        grammar={sessionGrammar}
        onClose={handleCloseSession}
        reviewQueue={reviewQueue}
        onNextReview={reviewQueue.length > 0 ? (next) => { setSessionGrammar(next); setReviewQueue(q => q.slice(1)); } : undefined}
      />
    );
  }

  if (activeCard) {
    const part = grammarParts.find(p => p.partNumber === activeCard.partNumber);
    const partNums = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四'];
    if (activeCard.isPractice) {
      return (
        <ComprehensivePractice
          card={activeCard}
          onBack={closeCard}
          onComplete={() => handleCompleteCard(activeCard)}
        />
      );
    }
    return (
      <GrammarCardView
        key={activeCard.id}
        card={activeCard}
        partTitle={part ? `第${partNums[part.partNumber - 1]}部分 · ${part.title}` : ''}
        totalInPart={part?.lessons.length ?? 10}
        onBack={closeCard}
        onComplete={() => handleCompleteCard(activeCard)}
        onStartGrammar={gp => { closeCard(); setSessionGrammar(gp); }}
      />
    );
  }

  return (
    <ColorCtx.Provider value={C}>
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 40 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <button onClick={() => router.back()} style={{ width: 38, height: 38, borderRadius: 13, border: `1px solid ${C.line}`, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <ArrowLeft size={16} color={C.muted} />
            </button>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: C.ink, margin: 0 }}>{t('grammar.page_title', lang)}</h1>
          </div>
          <p style={{ fontSize: 15, color: C.muted, marginLeft: 50 }}>{t('grammar.page_subtitle', lang)}</p>
        </div>

        <div style={{ display: 'flex', background: C.bg, borderRadius: 16, padding: 4, gap: 3, marginBottom: 18 }}>
          {([['chapters', t('grammar.tab_chapters', lang)], ['library', t('grammar.tab_library', lang)]] as [Tab, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: '10px 4px', borderRadius: 13, border: 'none', background: tab === key ? C.card : 'transparent', color: tab === key ? C.ink : C.muted, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: tab === key ? '0 2px 8px rgba(0,0,0,.08)' : 'none' }}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'chapters' && <ChaptersTab onOpenCard={openCard} isAdmin={isAdmin} />}
        {tab === 'library' && <LibraryTab onStartGrammar={setSessionGrammar} />}
      </div>
    </div>
    </ColorCtx.Provider>
  );
}

export default function GrammarPage() {
  return (
    <Suspense>
      <GrammarContent />
    </Suspense>
  );
}
