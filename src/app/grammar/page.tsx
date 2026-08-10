'use client'

import React, { useState, useEffect, useRef, Suspense, createContext, useContext, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Search, X, AlertCircle, Volume2, Lightbulb, ChevronDown, ChevronRight, Lock, Star, Loader2, CheckCircle2, Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { sentencePatterns, getTodayPattern, getRecommendedPatterns } from '@/data/grammar-new';
import { grammarPoints, type GrammarPoint as LegacyPoint } from '@/data/grammar';
import { grammarParts, type GrammarPart } from '@/data/grammar-parts';
import { GrammarSession } from '@/components/grammar/GrammarSession';
import { WordTapSheet } from '@/components/WordTapSheet';
import { db } from '@/lib/db';
import { isLessonDone, loadLessonMap, markLessonDone, type LessonMap } from '@/lib/grammar/lessonStates';
import { derivePracticeGroups, deriveRegularListening, loadGrammarBankPart, getBankEntry } from '@/lib/grammar/derivePractice';
import { normalizeKorean } from '@/lib/koreanDiff';
import { GrammarWriteExercise } from '@/components/grammar/GrammarWriteExercise';
import { speak } from '@/lib/tts';
import { playSuccess, playError, playComplete } from '@/lib/soundManager';
import { useAuth } from '@/components/AuthProvider';
import { useMembership } from '@/lib/useMembership';
import { isPaidTier, canPurchaseMembership } from '@/lib/membership-benefits';
import type { GrammarPoint, GrammarCard, UserGrammarState, ConnectionRule, PracticeGroups, GrammarBankEntry } from '@/types';
import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C as _LIGHT_C, DARK_C as _DARK_C } from '@/lib/theme';
import { useLang } from '@/components/LangProvider';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/useToast';
import PlaceIntro from '@/components/PlaceIntro';
import './grammar-redesign.css';

// 语法库→章节课 精确匹配：只按逗号切段、剥掉括号说明后整段相等，
// 避免"에""은/는"这类短标题被当子串误命中长 pattern（导致跳错课）
const gr_clean = (s: string) => s.replace(/[（(].*?[)）]/g, '').replace(/\s+/g, ' ').trim();
const gr_segs = (s: string) => s.split(/[,，]/).map(gr_clean).filter(Boolean);
function findLessonForPoint(
  point: { pattern: string; title: string },
  lessons: { title: string; cardId: string }[],
) {
  const pSegs = gr_segs(point.pattern);
  return lessons.find(l => {
    const lSegs = gr_segs(l.title);
    return pSegs.some(ps => lSegs.some(ls => ls === ps));
  });
}

// grammar-cards 按 Part 动态加载，避免 1MB 数据阻塞首屏
const partLoaders: Record<string, () => Promise<{ [key: string]: GrammarCard[] }>> = {
  p1: () => import('@/data/grammar-cards-p1'),
  p2: () => import('@/data/grammar-cards-p2'),
  p3: () => import('@/data/grammar-cards-p3'),
  p4: () => import('@/data/grammar-cards-p4'),
  p5: () => import('@/data/grammar-cards-p5'),
  p6: () => import('@/data/grammar-cards-p6'),
  p7: () => import('@/data/grammar-cards-p7'),
  p8: () => import('@/data/grammar-cards-p8'),
  p9: () => import('@/data/grammar-cards-p9'),
  p10: () => import('@/data/grammar-cards-p10'),
  p11: () => import('@/data/grammar-cards-p11'),
  p12: () => import('@/data/grammar-cards-p12'),
  p13: () => import('@/data/grammar-cards-p13'),
  p14: () => import('@/data/grammar-cards-p14'),
  p15: () => import('@/data/grammar-cards-p15'),
  p16: () => import('@/data/grammar-cards-p16'),
  p17: () => import('@/data/grammar-cards-p17'),
  p18: () => import('@/data/grammar-cards-p18'),
  p19: () => import('@/data/grammar-cards-p19'),
  p20: () => import('@/data/grammar-cards-p20'),
  p21: () => import('@/data/grammar-cards-p21'),
  p22: () => import('@/data/grammar-cards-p22'),
  p23: () => import('@/data/grammar-cards-p23'),
  p24: () => import('@/data/grammar-cards-p24'),
  p25: () => import('@/data/grammar-cards-p25'),
  p26: () => import('@/data/grammar-cards-p26'),
  p27: () => import('@/data/grammar-cards-p27'),
  p28: () => import('@/data/grammar-cards-p28'),
  p29: () => import('@/data/grammar-cards-p29'),
  p30: () => import('@/data/grammar-cards-p30'),
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

const PART_ORDER = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30'];

function partLabel(n: number, lang: string): string {
  const zh = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','二十一','二十二','二十三','二十四','二十五','二十六','二十七','二十八','二十九','三十','三十一'];
  const en = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV','XXV','XXVI','XXVII','XXVIII','XXIX','XXX','XXXI'];
  return lang === 'en' ? en[n - 1] : zh[n - 1];
}

const CHAPTER1_KEYS = ['card-p1-l01','card-p1-l02','card-p1-l03','card-p1-l04','card-p1-l05','card-p1-l06','card-p1-l07','card-p1-l08','card-p1-l09','card-p1-l10'];

// Enter/Space 激活 role=button 的 div（可聚焦语义）
function onActivateKey(fn: () => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); }
  };
}

// 无偏洗牌（sort(()=>random-0.5) 分布不均）
function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function loadNextCard(cardId: string): Promise<GrammarCard | null> {
  // 从 grammarParts 按章节顺序找当前 cardId 的下一课，而非递增 ID 数字
  // （cardId 编号不一定等于课序，P2/P24 等有历史遗留错位）
  let found = false;
  for (const part of grammarParts) {
    for (let i = 0; i < part.lessons.length; i++) {
      if (found) {
        const nextId = part.lessons[i].cardId;
        const cards = await loadPartCards(`p${part.partNumber}`);
        return cards.find(c => c.id === nextId) ?? null;
      }
      if (part.lessons[i].cardId === cardId) found = true;
    }
  }
  return null;
}

const LIGHT_C = { ..._LIGHT_C, purple: 'var(--color-purple-base)', purpleBg: 'var(--color-purple-soft)' };
const DARK_C  = { ..._DARK_C, purple: 'var(--color-purple-base)', purpleBg: 'var(--color-surface-3)' };

const ColorCtx = createContext<typeof LIGHT_C>(LIGHT_C);
const useC = () => useContext(ColorCtx);

type Tab = 'chapters' | 'library';
// ── GrammarCardView ───────────────────────────────────────────────────────────

// 把文本里的韩文片段（谚文音节 + 相邻助词/箭头）高亮成粉色，让语法关键词跳出来。
// 用于接续规则：text 混了中韩文，韩文才是语法点。
function highlightKorean(text: string): React.ReactNode[] {
  const parts = text.split(/([가-힣][가-힣\s\/·→~ㄱ-ㅎㅏ-ㅣ]*[가-힣~]|[가-힣])/g);
  return parts.map((p, i) =>
    /[가-힣]/.test(p)
      ? <b key={i} className="gr-rule-kw">{p}</b>
      : <span key={i}>{p}</span>
  );
}

// 从点击坐标定位落在哪个韩语词（어절）上，用于全页「点词查词」事件委托。
// 覆盖结构化字段 + 三块 baked HTML——不用给每个字段包组件。
const HANGUL_RE = /[가-힣]/;
function eojeolAtPoint(x: number, y: number): string | null {
  const doc = document as Document & {
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
  };
  let node: Node | null = null;
  let offset = 0;
  if (doc.caretRangeFromPoint) {
    const r = doc.caretRangeFromPoint(x, y);
    if (r) { node = r.startContainer; offset = r.startOffset; }
  } else if (doc.caretPositionFromPoint) {
    const p = doc.caretPositionFromPoint(x, y);
    if (p) { node = p.offsetNode; offset = p.offset; }
  }
  if (!node || node.nodeType !== Node.TEXT_NODE) return null;
  const text = node.textContent ?? '';
  if (!text) return null;
  // 以空白/标点为边界，向两侧扩展出完整어절
  const isBoundary = (ch: string) => !ch || /[\s.,!?;:()[\]{}"'。，、！？；：（）「」『』…·—~\/]/.test(ch);
  let start = Math.min(offset, text.length - 1);
  if (start < 0) return null;
  if (isBoundary(text[start]) && start > 0) start -= 1;
  let end = start;
  while (start > 0 && !isBoundary(text[start - 1])) start -= 1;
  while (end < text.length && !isBoundary(text[end])) end += 1;
  const word = text.slice(start, end).trim();
  if (!word || !HANGUL_RE.test(word)) return null;
  return word;
}

// baked HTML（step0/compare/overview）里的韩语例句没有喇叭——渲染后 DOM 扫一遍注入。
// 判定放在「直接文本节点」上（韩文占优、≥4 音节，排除内联强调标签里的语法 token），
// 朗读用整元素 textContent 过滤掉中文/括号注释。
const SPK_SKIP_TAG = /^(B|STRONG|I|EM|U|MARK|SUP|SUB|BUTTON|A)$/;
const VOLUME_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';

function directTextKoreanInfo(el: Element): { hangul: number; hanzi: number } {
  let hangul = 0, hanzi = 0;
  el.childNodes.forEach((n) => {
    if (n.nodeType !== Node.TEXT_NODE) return;
    for (const ch of n.textContent ?? '') {
      const c = ch.charCodeAt(0);
      if (c >= 0xac00 && c <= 0xd7a3) hangul++;
      else if (c >= 0x4e00 && c <= 0x9fff) hanzi++;
    }
  });
  return { hangul, hanzi };
}

function koreanSpeakText(raw: string): string {
  return raw
    .replace(/（[^）]*）/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[一-鿿]/g, ' ')
    .replace(/[→~·—/]/g, ' ')
    .replace(/[A-Za-z]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function injectBakedSpeakers(root: HTMLElement, lang: Lang): HTMLButtonElement[] {
  const created: HTMLButtonElement[] = [];
  const wraps = root.querySelectorAll('.gr-step0-html-wrap, .gr-compare-html-wrap, .overview-desktop');
  wraps.forEach((wrap) => {
    wrap.querySelectorAll('div, span, p, li').forEach((el) => {
      if (SPK_SKIP_TAG.test(el.tagName)) return;
      if (el.closest('[data-gr-spk]')) return; // 祖先已注入，避免句中片段再挂
      const { hangul, hanzi } = directTextKoreanInfo(el);
      if (hangul < 4 || hangul < hanzi) return; // 韩文成句才挂，滤掉内联语法 token
      const koText = koreanSpeakText(el.textContent ?? '');
      if (koText.length < 2) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gr-baked-play';
      btn.setAttribute('aria-label', t('a11y.play_audio', lang));
      btn.innerHTML = VOLUME_SVG;
      btn.addEventListener('click', (ev) => { ev.stopPropagation(); speak(koText); });
      el.setAttribute('data-gr-spk', '1');
      el.appendChild(btn);
      created.push(btn);
    });
  });
  return created;
}

const WBLOCK_ROLES = new Set(['subject', 'object', 'verb', 'place', 'time', 'adverb', 'noun', 'adjective', 'plain']);

function WordBlockEl({ role, text }: { role: string; text: string }) {
  const cls = WBLOCK_ROLES.has(role) ? role : 'plain';
  return <span className={`gr-wblock ${cls}`}>{text}</span>;
}

function TokenEl({ role }: { role: string }) {
  const { lang } = useLang();
  const roleLabel: Record<string, string> = {
    subject: t('grammar.token_subject', lang), object: t('grammar.token_object', lang), verb: t('grammar.token_verb', lang), place: t('grammar.token_place', lang), time: t('grammar.token_time', lang), adverb: t('grammar.token_adverb', lang), noun: t('grammar.token_noun', lang), adjective: t('grammar.token_adjective', lang),
  };
  if (role === 'plain' || !roleLabel[role]) return null;
  return <span className={`gr-wtoken ${role}`}>{roleLabel[role]}</span>;
}

// ── GrammarCardView sub-components ───────────────────────────────────────────

function CardSortStep({ examples }: { examples: GrammarCard['cardExamples'] }) {
  const { lang } = useLang();
  const quizzes = React.useMemo(() => examples.map(eg => ({
    words: eg.wordBlocks.map(wb => wb.text),
    answer: eg.wordBlocks.map(wb => wb.text),
    zh: eg.zh,
  })), [examples]);

  const [qIdx, setQIdx] = React.useState(0);
  const [states, setStates] = React.useState<SortQState[]>(() => mkSortStates(quizzes));
  const [allDone, setAllDone] = React.useState(false);

  React.useEffect(() => {
    setStates(mkSortStates(quizzes));
    setQIdx(0);
    setAllDone(false);
  }, [quizzes]);

  const cur = states[qIdx];
  const patch = (upd: Partial<SortQState>) => setStates(s => s.map((st, i) => i === qIdx ? { ...st, ...upd } : st));

  const pick = (word: string, idx: number) => {
    if (!cur || cur.checked || cur.used.includes(idx)) return;
    patch({ used: [...cur.used, idx], answers: [...cur.answers, word] });
  };

  const remove = (i: number) => {
    if (!cur || cur.checked) return;
    const newAns = cur.answers.filter((_, j) => j !== i);
    const newUsed: number[] = [];
    for (const w of newAns) {
      const j = cur.order.findIndex((ww, k) => ww === w && !newUsed.includes(k));
      if (j >= 0) newUsed.push(j);
    }
    patch({ answers: newAns, used: newUsed });
  };

  const check = () => {
    const q = quizzes[qIdx];
    if (!q || !cur || cur.checked || cur.answers.length < q.answer.length) return;
    const ok = cur.answers.join('|') === q.answer.join('|');
    patch({ checked: true, result: ok ? 'ok' : 'ng' });
    if (ok && qIdx === quizzes.length - 1) { playComplete(); setAllDone(true); }
    else if (ok) playSuccess();
    else playError();
  };

  const reset = () => {
    patch({ order: shuffle(quizzes[qIdx]?.words ?? []), answers: [], used: [], checked: false, result: null });
  };

  const goPrev = () => { if (qIdx > 0) setQIdx(qIdx - 1); };
  const goNext = () => { if (qIdx < quizzes.length - 1) setQIdx(qIdx + 1); };

  if (!quizzes.length || !cur) return null;
  const { order, answers, used, checked, result } = cur;
  const q = quizzes[qIdx];
  const canNext = checked && result === 'ok' && qIdx < quizzes.length - 1;

  return (
    <div>
      <div className="gr-quiz-qnum">{t('grammar.quiz_q_number', lang, { n: String(qIdx + 1), total: String(quizzes.length) })}</div>
      <div className="gr-quiz-prompt">{q.zh}</div>
      <div className="gr-quiz-bank">
        {order.map((w, i) => (
          <button key={i} onClick={() => pick(w, i)} disabled={used.includes(i)} className="gr-quiz-chip">{w}</button>
        ))}
      </div>
      <div className={`gr-quiz-track${result === 'ok' ? ' ok' : result === 'ng' ? ' ng' : ''}`}>
        {answers.length === 0
          ? <span className="gr-quiz-track-empty">{t('grammar.quiz_placeholder', lang)}</span>
          : answers.map((w, i) => <button key={i} onClick={() => remove(i)} className="gr-quiz-answer">{w}</button>)}
      </div>
      {result && (
        <div className={`gr-quiz-feedback${result === 'ok' ? ' ok' : ' ng'}`}>
          {result === 'ok' ? (allDone ? t('grammar.quiz_all_done', lang) : t('grammar.quiz_correct', lang)) : t('grammar.quiz_wrong_answer', lang, { answer: q.answer.join(' ') })}
          {result !== 'ok' && <button onClick={() => speak(q.answer.join(' '))} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={12} /></button>}
        </div>
      )}
      <div className="gr-quiz-actions">
        <button onClick={goPrev} disabled={qIdx === 0} className="gr-quiz-btn">{t('grammar.quiz_prev', lang)}</button>
        <button onClick={reset} className="gr-quiz-btn">{t('grammar.quiz_reset', lang)}</button>
        {canNext
          ? <button onClick={goNext} className="gr-quiz-btn primary">{t('grammar.quiz_next', lang)}</button>
          : <button onClick={check} disabled={checked} className="gr-quiz-btn primary">{t('grammar.quiz_check', lang)}</button>
        }
      </div>
    </div>
  );
}

function CardJudgeStep({ mistakes }: { mistakes: GrammarCard['mistakes'] }) {
  const { lang } = useLang();
  // 用 ref 渲染期缓存，仅在 mistakes 变化时重算一次。
  // 不用 useMemo：其缓存可被 React 丢弃重算，Math.random 会重掷 → 已答题的 A/B 内容与正确答案对调（答对变答错）。
  const judgesRef = React.useRef<{ src: typeof mistakes; arr: Array<{ A: string; B: string; ans: 'A' | 'B'; why: string }> } | null>(null);
  if (!judgesRef.current || judgesRef.current.src !== mistakes) {
    judgesRef.current = {
      src: mistakes,
      arr: mistakes.map(m => {
        const swap = Math.random() < 0.5;
        return {
          A: swap ? m.wrong : m.correct,
          B: swap ? m.correct : m.wrong,
          ans: swap ? 'B' as const : 'A' as const,
          why: m.note,
        };
      }),
    };
  }
  const judges = judgesRef.current.arr;
  const [states, setStates] = React.useState(() => judges.map(() => ({ done: false, ok: false, picked: '' })));

  const pick = (i: number, choice: string) => {
    if (states[i].done) return;
    const ok = choice === judges[i].ans;
    if (ok) playSuccess(); else playError();
    setStates(s => s.map((item, j) => j === i ? { done: true, ok, picked: choice } : item));
  };

  if (!judges.length) return null;

  return (
    <div>
      {judges.map((q, i) => {
        const s = states[i];
        const optCls = (ch: string) => {
          if (!s.done) return '';
          if (ch === q.ans) return ' ok';
          if (ch === s.picked && s.picked !== q.ans) return ' ng';
          return '';
        };
        return (
          <div key={i} className="gr-jq">
            <div className="gr-jq-num">{t('grammar.quiz_q_judge', lang, { n: String(i + 1) })}</div>
            <div className="gr-jq-opts">
              {(['A', 'B'] as const).map(ch => (
                <div key={ch} className="gr-jq-opt-row">
                  <button onClick={() => pick(i, ch)} disabled={s.done} className={`gr-opt-btn${optCls(ch)}`}>
                    {ch}. {ch === 'A' ? q.A : q.B}
                  </button>
                  <button onClick={() => speak(ch === 'A' ? q.A : q.B)} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={13} /></button>
                </div>
              ))}
            </div>
            {s.done && (
              <div className="gr-jq-result">
                <div className={`gr-jq-verdict${s.ok ? ' ok' : ' ng'}`}>{s.ok ? t('grammar.quiz_correct', lang) : t('grammar.quiz_wrong_choice', lang, { choice: q.ans })}</div>
                <div className="gr-jq-why">{q.why}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SpecialQuizStep({ quiz, onScore }: { quiz: NonNullable<GrammarCard['specialQuiz']>; onScore?: (s: { correct: number; total: number }) => void }) {
  const { lang } = useLang();
  const [states, setStates] = React.useState(() => quiz.questions.map(() => ({ done: false, ok: false, picked: '' })));

  const pick = (qi: number, optIdx: number) => {
    if (states[qi].done) return;
    const ok = optIdx === quiz.questions[qi].answer;
    const newStates = states.map((item, j) => j === qi ? { done: true, ok, picked: quiz.questions[qi].options[optIdx] } : item);
    if (newStates.every(s => s.done)) playComplete();
    else if (ok) playSuccess();
    else playError();
    setStates(newStates);
    onScore?.({ correct: newStates.filter(s => s.ok).length, total: newStates.filter(s => s.done).length });
  };

  const allDone = states.every(s => s.done);
  const correctCount = states.filter(s => s.ok).length;

  return (
    <div>
      <h2 className="gr-card-h">{quiz.title}</h2>
      <p className="gr-card-lede">{quiz.body}</p>
      {allDone && (
        <div className="gr-sq-score">
          {t('grammar.quiz_progress', lang, { n: String(correctCount), total: String(quiz.questions.length) })}
        </div>
      )}
      {quiz.questions.map((q, qi) => {
        const s = states[qi];
        const optCls = (optIdx: number) => {
          if (!s.done) return '';
          if (optIdx === q.answer) return ' ok';
          if (s.picked === q.options[optIdx] && optIdx !== q.answer) return ' ng';
          return '';
        };
        return (
          <div key={qi} className="gr-jq">
            <div className="gr-jq-num">
              {t('grammar.quiz_q_simple', lang, { n: String(qi + 1) })}{q.prompt ? ` · ${q.prompt}` : ''}
            </div>
            {(q.pre !== undefined || q.post !== undefined) ? (
              <div className="gr-sq-fill">
                {q.pre}
                {s.done ? (
                  <span className={s.ok ? 'picked-ok' : 'picked-ng'}>{s.picked}</span>
                ) : (
                  <span className="blank" />
                )}
                {q.post}
              </div>
            ) : null}
            <div>
              {q.options.map((opt, optIdx) => (
                <button key={optIdx} onClick={() => pick(qi, optIdx)} disabled={s.done} className={`gr-opt-btn inline${optCls(optIdx)}`}>
                  {quiz.type === 'judge' ? `${optIdx === 0 ? 'A' : 'B'}. ${opt}` : opt}
                </button>
              ))}
            </div>
            {s.done && (
              <div className="gr-jq-result">
                <div className={`gr-jq-verdict${s.ok ? ' ok' : ' ng'}`}>
                  {s.ok ? t('grammar.quiz_correct', lang) : t('grammar.quiz_wrong_answer', lang, { answer: q.options[q.answer] })}
                  {!s.ok && quiz.type !== 'judge' && <button onClick={() => speak(q.options[q.answer])} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={12} /></button>}
                </div>
                <div className="gr-jq-why">{q.explanation}</div>
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
  const { lang } = useLang();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [step, setStep] = React.useState(0);
  const [tapWord, setTapWord] = React.useState<string | null>(null);
  const scopeRef = React.useRef<HTMLDivElement>(null);
  // 全页「点词查词」：事件委托到滚动容器，用 caretRangeFromPoint 定位어절。
  // 跳过交互控件（按钮/输入/排序词块/可点 chip）——那些自己有点击逻辑。
  const onScopeClick = React.useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, textarea, select, [role="button"]')) return;
    if (window.getSelection()?.toString()) return; // 用户在划词选择，别打断
    const word = eojeolAtPoint(e.clientX, e.clientY);
    if (word) setTapWord(word);
  }, []);
  // 桌面详情页是 position:fixed 独立滚动容器，翻页要滚它自己（window 无效）
  const scrollTop = React.useCallback(() => {
    scopeRef.current?.scrollTo({ top: 0 });
    window.scrollTo(0, 0);
  }, []);
  const [lessonStates, setLessonStates] = React.useState<LessonMap>({});
  React.useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    loadLessonMap().then(map => { if (!cancelled) setLessonStates(map); }).catch((e) => { console.error('Failed to load lesson map:', e); });
    return () => { cancelled = true; };
  }, [user?.id]);
  // baked HTML 韩语句注入喇叭：每次换 step / 换课后重扫（dangerouslySetInnerHTML 内容 React 不管）
  React.useEffect(() => {
    const root = scopeRef.current;
    if (!root) return;
    // 等 dangerouslySetInnerHTML 落地
    const id = window.setTimeout(() => injectBakedSpeakers(root, lang), 0);
    return () => window.clearTimeout(id);
  }, [step, card.id]);
  const linkedGps = card.linkedGrammarIds
    .map(id => sentencePatterns.find(p => p.id === id))
    .filter(Boolean) as GrammarPoint[];

  // 右侧常驻速查面板数据（桌面 ≥1200px 显示）
  const cheatFormula = card.structures[0] ?? null;
  const cheatPoints = (card.connectionRules ?? [])
    .filter(r => r.type === 'rule' || r.type === 'note' || r.type === 'usage')
    .slice(0, 5);
  const cheatVocab = (card.connectionRules ?? [])
    .filter((r): r is ConnectionRule => typeof r !== 'string' && r.type === 'vocab')
    .slice(0, 4);
  const cheatExamples = (card.cardExamples ?? [])
    .map(eg => ({ ko: eg.wordBlocks.map(wb => wb.text).join(' '), zh: eg.zh }))
    .filter(e => e.ko)
    .slice(0, 3);
  const cheatScenarios = (card.scenarios ?? []).slice(0, 2);
  const cheatMistakes = (card.mistakes ?? []).slice(0, 3);
  const hasCheat = !!cheatFormula || cheatPoints.length > 0 || cheatVocab.length > 0
    || cheatExamples.length > 0 || cheatScenarios.length > 0 || cheatMistakes.length > 0;

  const hasStructures = card.structures.length > 0;
  const hasRules = card.connectionRules.length > 0;
  const hasExamples = card.cardExamples.length > 0;
  const hasScenarios = card.scenarios.length > 0;
  const hasMistakes = card.mistakes.length > 0;
  const hasReadingGuide = !!card.readingGuide;
  const hasQuickTable = !!card.quickTable;
  const hasSpecialQuiz = !!card.specialQuiz;

  // 产出型练习（追加在原有步骤后、DONE 前）：离线题库命中优先，未命中回落卡片派生
  const [bankEntry, setBankEntry] = React.useState<GrammarBankEntry | null>(null);
  React.useEffect(() => {
    let cancelled = false;
    loadGrammarBankPart(card.partNumber).then(f => { if (!cancelled) setBankEntry(getBankEntry(f, card.id)); });
    return () => { cancelled = true; };
  }, [card.id, card.partNumber]);

  // 本课有题库条目时以题库为准（某类型为空=故意不出，如形式课不出仿写/续写）；
  // 整个 part 无题库（bankEntry===null）才回落卡片派生。
  const hasBank = bankEntry !== null;
  const fallbackListening = React.useMemo(() => deriveRegularListening(card), [card]);
  const listeningData = hasBank ? bankEntry!.listening : fallbackListening;
  const hasListening = !!listeningData && listeningData.length > 0;

  // 仿写：题库模板优先（带换词槽提示）；无题库时回落本课首例句
  const bankImitate = bankEntry?.imitate?.[0];
  const fallbackImitate = card.cardExamples[0];
  const hasImitate = hasBank ? !!bankImitate : (hasExamples && !!fallbackImitate);
  // 续写：题库问句 opener 优先（带作答提示）；无题库时回落本课首情景
  const bankContinue = bankEntry?.continue?.[0];
  const fallbackContinue = card.scenarios[0];
  const hasContinue = hasBank ? !!bankContinue : (hasScenarios && !!fallbackContinue);

  type StepDef = { emoji: string; label: string; en: string };
  const steps: StepDef[] = [
    { emoji: '💡', label: t('grammar.step_intro', lang), en: 'INTRO' },
    ...(card.conceptCompare || card.compareHtml ? [{ emoji: '🔀', label: card.compareLabel || t('grammar.step_compare', lang), en: 'COMPARE' }] : []),
    ...(hasStructures ? [{ emoji: '📐', label: t('grammar.step_structure', lang), en: 'STRUCTURE' }] : []),
    ...(hasRules ? [{ emoji: '🔗', label: t('grammar.step_rules', lang), en: 'RULES' }] : []),
    ...(hasReadingGuide ? [{ emoji: '👁️', label: t('grammar.step_reading', lang), en: 'READING' }] : []),
    ...(hasQuickTable ? [{ emoji: '📊', label: t('grammar.step_quicktable', lang), en: 'TABLE' }] : []),
    ...(hasScenarios ? [{ emoji: '🌏', label: t('grammar.step_scenario', lang), en: 'SCENE' }] : []),
    ...(hasMistakes ? [{ emoji: '⚠️', label: t('grammar.step_mistake', lang), en: 'PITFALL' }] : []),
    ...(hasExamples ? [{ emoji: '🎯', label: t('grammar.step_sort', lang), en: 'ORDER' }] : []),
    ...(hasSpecialQuiz ? [{ emoji: '🧠', label: t('grammar.step_special', lang), en: 'QUIZ' }] : []),
    ...(hasMistakes && !hasSpecialQuiz ? [{ emoji: '🧐', label: t('grammar.step_judge', lang), en: 'JUDGE' }] : []),
    ...(hasListening ? [{ emoji: '🎧', label: t('grammar.step_listening', lang), en: 'LISTEN' }] : []),
    ...(hasImitate ? [{ emoji: '✍️', label: t('grammar.step_imitate', lang), en: 'IMITATE' }] : []),
    ...(hasContinue ? [{ emoji: '💬', label: t('grammar.step_continue', lang), en: 'CONTINUE' }] : []),
    { emoji: '🎉', label: t('grammar.step_done', lang), en: 'DONE' },
  ];

  const total = steps.length;
  const cfg = steps[step];
  const progress = ((step + 1) / total) * 100;

  const isEmpty = !card.whatItDoes;

  const goNext = () => {
    const next = Math.min(total - 1, step + 1);
    if (next === total - 1 && user?.id) {
      markLessonDone(card.id).catch((e) => {
        console.warn('Grammar lesson save failed:', e);
        showToast(t('grammar.save_progress_error', lang), 'error');
      });
    }
    setStep(next);
    scrollTop();
  };
  const goPrev = () => { setStep(s => Math.max(0, s - 1)); scrollTop(); };

  // 桌面键盘翻页 ←/→（输入框聚焦时不拦截）；用 ref 引最新函数避免闭包陈旧
  const navRef = React.useRef({ goNext, goPrev });
  navRef.current = { goNext, goPrev };
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); navRef.current.goNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); navRef.current.goPrev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
  let listeningStepIdx = -1;
  let imitateStepIdx = -1;
  let continueStepIdx = -1;
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
  if (hasListening) { listeningStepIdx = cursor++; }
  if (hasImitate) { imitateStepIdx = cursor++; }
  if (hasContinue) { continueStepIdx = cursor++; }
  doneStepIdx = cursor;

  if (isEmpty) {
    return (
      <div className="gr-scope gr-card-scope">
        <div className="gr-card-topbar">
          <button onClick={onBack} className="gr-card-back" aria-label={t('ui.ph_back', lang)}><ArrowLeft size={18} /></button>
          <div className="gr-card-toptitle">{t('grammar.card_part_lesson', lang, { n: String(card.lessonNumber) })}</div>
        </div>
        <div className="gr-card-empty">
          <div className="emoji">📝</div>
          <p className="t">{t('grammar.empty_title', lang)}</p>
          <p className="d">{t('grammar.empty_desc', lang)}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={scopeRef} onClick={onScopeClick} className={`gr-scope gr-card-scope${step === doneStepIdx ? ' is-done' : ''}`}>
      {/* 顶部进度导航（移动端；桌面隐藏，由左栏承载） */}
      <div className="gr-card-topbar">
        <button onClick={onBack} className="gr-card-back" aria-label={t('ui.ph_back', lang)}><ArrowLeft size={18} /></button>
        <div className="gr-card-topinfo">
          <div className="gr-card-topline">
            <span className="gr-card-toptitle">{t('grammar.card_part_lesson_title', lang, { title: card.title })}</span>
            <span className="gr-card-topcount">{step + 1} / {total}</span>
          </div>
          <div className="gr-card-progress">
            <div className="gr-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="gr-card-layout">
        {/* 左侧导航栏（仅桌面显示） */}
        <aside className="gr-card-rail">
          <button onClick={onBack} className="gr-rail-back">
            <ArrowLeft size={16} /> {t('ui.ph_back', lang)}
          </button>
          <div>
            <div className="gr-rail-label">{t('grammar.card_part_lesson', lang, { n: String(card.lessonNumber) })}</div>
            <div className="gr-rail-focus">{card.structures[0]?.ko || card.title}</div>
            <div className="gr-rail-title">{card.title}</div>
          </div>
          <div>
            <div className="gr-rail-progress-top">
              <span className="l">{t('grammar.progress', lang)}</span>
              <span className="gr-card-topcount">{step + 1} / {total}</span>
            </div>
            <div className="gr-card-progress">
              <div className="gr-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <nav className="gr-rail-steps">
            {steps.map((s, i) => {
              const state = i === step ? 'active' : i < step ? 'done' : 'todo';
              return (
                <button
                  key={i}
                  onClick={() => { setStep(i); scrollTop(); }}
                  className={`gr-rail-step ${state}`}
                  aria-current={i === step ? 'step' : undefined}
                >
                  <span className="gr-rail-step-num">{i < step ? '✓' : String(i + 1).padStart(2, '0')}</span>
                  <span className="gr-rail-step-text">
                    <span className="gr-rail-step-label">{s.label}</span>
                    <span className="gr-rail-step-en">{s.en}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* 内容区（右栏） */}
        <div className="gr-card-body">
        {/* 主区抬头：eyebrow → 大标题 → meta（仅桌面显示，对齐 practice 层级） */}
        <header className="gr-card-lead">
          <div className="gr-lead-eyebrow">
            {t('grammar.card_hero_part_lesson', lang, { n: String(card.lessonNumber) })}
          </div>
          <h1 className="gr-lead-title">{card.title}</h1>
          <div className="gr-lead-meta">
            <span className="gr-lead-step">{cfg.label}</span>
            <span className="gr-lead-count">{String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          </div>
        </header>

        {/* 步骤标签（移动端保留，桌面隐藏——抬头已承载） */}
        <span className="gr-card-badge">{cfg.label}</span>

        {/* Step 0: 今天学什么 */}
        {step === 0 && (
          <div className="gr-card-panel">
            {card.step0Html ? (
              <div className="gr-step0-html-wrap" dangerouslySetInnerHTML={{ __html: card.step0Html }} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div className="gr-card-h big">{card.whatItDoes}</div>
                  {(() => {
                    const lines = card.whatItDoesBody.split('\n').filter(Boolean);
                    const body = lines.slice(0, -1);
                    const key = lines[lines.length - 1];
                    return <>
                      {body.length > 0 && <div className="gr-card-lede" style={{ marginBottom: 12 }}>{body.join('\n')}</div>}
                      <div className="gr-card-keyline">{key}</div>
                    </>;
                  })()}
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
                    <div>
                      <div className="gr-card-order zh">
                        <div className="gr-card-order-label">{t('grammar.cn_expression', lang)}</div>
                        <div className="gr-card-order-blocks">
                          {zhParts.map((p, i) => <WordBlockEl key={i} role={p.role} text={p.text} />)}
                        </div>
                      </div>
                      <div className="gr-card-order ko">
                        <div className="gr-card-order-label">{t('grammar.ko_expression', lang)}</div>
                        <div className="gr-card-order-blocks">
                          {koParts.map((p, i) => <WordBlockEl key={i} role={p.role} text={p.text} />)}
                        </div>
                        <div className="gr-card-order-hint">{t('grammar.verb_end', lang)}</div>
                      </div>
                    </div>
                    <div className="gr-card-note">
                      <p className="gr-card-note-body" style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: card.conceptCompare!.note }} />
                    </div>
                  </>;
                })()}
                {/* 无 conceptCompare 且无 step0Html 时，用已有数据撑起"今天学什么"页，
                    避免只剩一句导语的空页（复用 structures + connectionRules）*/}
                {!card.conceptCompare && (() => {
                  const preview = card.structures.slice(0, 2);
                  const rules = (card.connectionRules ?? [])
                    .map(r => ({ text: r.text, examples: r.examples }))
                    .slice(0, 3);
                  if (preview.length === 0 && rules.length === 0) return null;
                  return <>
                    {preview.length > 0 && (
                      <div className="gr-card-sub">
                        <div className="gr-card-note-label" style={{ marginBottom: 12 }}>
                          {t('grammar.sample_sentences', lang)}
                        </div>
                        <div className="gr-card-list">
                          {preview.map((s, i) => (
                            <div key={i}>
                              <div className="gr-card-row" style={{ marginBottom: 6 }}>
                                <p className="gr-card-ko" style={{ margin: 0 }}>{s.ko}</p>
                                <button onClick={() => speak(s.ko)} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={13} /></button>
                              </div>
                              {s.zh && <p className="gr-card-zh" style={{ margin: 0 }}>{s.zh}</p>}
                              {s.tokens?.length > 0 && (
                                <div className="gr-card-tokrow" style={{ marginTop: 8 }}>
                                  {s.tokens.map((tk, j) => (
                                    <span key={j} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                      <WordBlockEl role={tk.role} text={tk.text} />
                                      {j < s.tokens.length - 1 && <span className="gr-card-tokplus">+</span>}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {rules.length > 0 && (
                      <div className="gr-card-note mint">
                        <div className="gr-card-note-label">{t('grammar.what_learn', lang)}</div>
                        <div className="gr-card-note-body">
                          {rules.map((r, i) => (
                            <div key={i} style={{ marginBottom: i < rules.length - 1 ? 6 : 0 }}>
                              <b style={{ color: 'var(--hr-ink-1)' }}>{r.text}</b>
                              {r.examples && <span style={{ color: 'var(--hr-ink-3)', marginLeft: 6 }}>{r.examples}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>;
                })()}
              </div>
            )}
          </div>
        )}

        {/* 和中文比一比 */}
        {step === conceptCompareStepIdx && (
          <div className="gr-card-panel">
            {card.compareHtml ? (
              <div className="gr-compare-html-wrap" dangerouslySetInnerHTML={{ __html: card.compareHtml }} />
            ) : card.conceptCompare ? (
              <div>
                <div className="gr-card-h">{t('grammar.word_order', lang)}<em>{t('grammar.different', lang)}</em></div>
                <div className="gr-card-lede" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span>{t('grammar.compare_note', lang)}</span>
                  <button onClick={() => speak(card.conceptCompare!.ko)} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={12} /></button>
                </div>
                <div style={{ marginBottom: 6 }}>
                  <div className="gr-card-order zh">
                    <div className="gr-card-order-label">{t('grammar.cn_order', lang)}</div>
                    <div className="gr-card-order-blocks">
                      {card.conceptCompare.zh.split(' · ').map((text, i) => (
                        <WordBlockEl key={i} role={(['subject','verb','object'][i] || 'plain')} text={text} />
                      ))}
                    </div>
                  </div>
                  <div className="gr-card-order ko">
                    <div className="gr-card-order-label">{t('grammar.ko_order', lang)}</div>
                    <div className="gr-card-order-blocks">
                      {card.structures[0]?.tokens.map((t, i) => (
                        <WordBlockEl key={i} role={t.role} text={t.text} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="gr-card-note">
                  <p className="gr-card-note-body"
                    style={{ margin: 0 }}
                    dangerouslySetInnerHTML={{ __html: t('grammar.word_order_note', lang) }} />
                </div>
              </div>
            ) : null}
          </div>
        )}

          {/* 语法结构 */}
          {step === structureStepIdx && (
            <div className="gr-card-panel">
              <h2 className="gr-card-h">{t('grammar.section_structure', lang)}</h2>
              {card.structureNote && (
                <div className="gr-card-note mint">
                  <div className="gr-card-note-label">{t('grammar.step_purpose', lang)}</div>
                  <div className="gr-card-note-body">{card.structureNote}</div>
                </div>
              )}
              <div className="gr-card-list">
                {card.structures.map((s, i) => (
                  <div key={i} className="gr-card-sub">
                    <div className="gr-card-row" style={{ marginBottom: 10 }}>
                      <p className="gr-card-ko" style={{ margin: 0 }}>{s.ko}</p>
                      <button onClick={e => { e.stopPropagation(); speak(s.ko); }} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={13} /></button>
                    </div>
                    {s.zh && <p className="gr-card-zh" style={{ marginTop: 0, marginBottom: 10 }}>{s.zh}</p>}
                    <div className="gr-card-tokrow">
                      {s.tokens.map((tk, j) => (
                        <span key={j} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <WordBlockEl role={tk.role} text={tk.text} />
                          <TokenEl role={tk.role} />
                          {j < s.tokens.length - 1 && <span className="gr-card-tokplus">+</span>}
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
                <div className="gr-card-panel">
                  <h2 className="gr-card-h">{t('grammar.section_rules', lang)}</h2>
                  {card.rulesNote && (
                    <div className="gr-card-note">
                    <div className="gr-card-note-label" style={{ color: 'var(--hr-pink-strong)' }}>{t('grammar.why_rules', lang)}</div>
                      <div className="gr-card-note-body">{card.rulesNote}</div>
                    </div>
                  )}
                  <div className="gr-card-list">
                    {rules.map((rule, i) => {
                      return (
                        <div key={i} className="gr-rule-item">
                          <div className="gr-rule-num">{i + 1}</div>
                          <div style={{ flex: 1 }}><b>{rule.text}</b>{rule.examples ? ` — ${rule.examples}` : ''}</div>
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
            const META: Record<ConnectionRule['type'], { label: string; tone: string }> = {
              rule:    { label: t('grammar.section_rule', lang), tone: 'mint' },
              usage:   { label: t('grammar.section_usage', lang), tone: 'mint' },
              compare: { label: t('grammar.section_compare', lang), tone: 'purple' },
              note:    { label: t('grammar.section_note', lang), tone: 'gold' },
              vocab:   { label: t('grammar.section_vocab', lang), tone: 'purple' },
              example: { label: t('grammar.section_example', lang), tone: '' },
            };
            return (
              <div className="gr-card-panel">
                <h2 className="gr-card-h">{t('grammar.section_rules', lang)}</h2>
                {card.rulesNote && (
                  <div className="gr-card-note mint">
                    <div className="gr-card-note-label" style={{ color: 'var(--hr-pink-strong)' }}>{t('grammar.why_rules', lang)}</div>
                    <div className="gr-card-note-body">{card.rulesNote}</div>
                  </div>
                )}
                <div className="gr-card-list">
                  {ORDER.filter(type => grouped[type]?.length).map(type => {
                    const items = grouped[type]!;
                    const m = META[type];
                    return (
                      <div key={type} className={`gr-rule-group${m.tone ? ' ' + m.tone : ''}`}>
                        <div className="gr-rule-group-head">
                          <span className="gr-rule-group-dot" aria-hidden />
                          <span>{m.label}</span>
                        </div>
                        <div>
                          {items.map((item, i) => (
                            <div key={i} className="gr-rule-line">
                              <span className="gr-rule-bullet" aria-hidden>{i + 1}</span>
                              <div className="gr-rule-body">
                                <span className="gr-rule-text">{highlightKorean(item.text)}</span>
                                {item.examples && <span className="gr-rule-eg">{highlightKorean(item.examples)}</span>}
                              </div>
                              {item.type === 'example' && <button onClick={() => speak(item.examples ? (koreanSpeakText(item.examples) || item.examples) : item.text)} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={12} /></button>}
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
            <div className="gr-card-panel">
              <h2 className="gr-card-h">{card.readingGuide.title}</h2>
              <p className="gr-card-lede">{card.readingGuide.body}</p>
              <div style={{ marginBottom: 14 }}>
                {card.readingGuide.steps.map(s => (
                  <div key={s.num} className="gr-read-step">
                    <div className="gr-read-num">{s.num}</div>
                    <div className="gr-read-txt" dangerouslySetInnerHTML={{ __html: s.text }} />
                  </div>
                ))}
              </div>
              {card.readingGuide.demo && (
                <div className="gr-read-demo">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <p className="gr-card-ko" style={{ margin: 0 }}>{card.readingGuide.demo.ko}</p>
                    <button onClick={() => speak(card.readingGuide!.demo!.ko)} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={13} /></button>
                  </div>
                  {card.readingGuide.demo.rows.map((row, i) => (
                    <div key={i} className="gr-read-demo-row">
                      <span className="gr-read-demo-label">{row.label}</span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--hr-ink-1)' }} dangerouslySetInnerHTML={{ __html: row.text }} />
                    </div>
                  ))}
                  <p style={{ fontSize: 14.5, color: 'var(--hr-ink-1)', fontWeight: 600, marginTop: 8, marginBottom: 0 }}>{card.readingGuide.demo.result}</p>
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
                  {cell.zh && <span className="sub">{cell.zh}</span>}
                </>
              );
            };
            return (
              <div className="gr-card-panel">
                <h2 className="gr-card-h">{title}</h2>
                {body && <p className="gr-card-lede">{body}</p>}
                {/* 移动端：卡片堆叠式 */}
                <div className="gr-qt-cards gr-qt-mobile">
                  {rows.map((row, ri) => (
                    <div key={ri} className="gr-qt-card">
                      <div className="gr-qt-card-title">{renderCell(row[0])}</div>
                      {headers.length === 4 ? (
                        <>
                          <div className="gr-qt-field">
                            <div className="gr-qt-field-label">{headers[1]}</div>
                            <div className="gr-qt-field-val">{renderCell(row[1])}</div>
                          </div>
                          <div className="gr-qt-grid2">
                            {[2, 3].map(i => (
                              <div key={i} className="gr-qt-field">
                                <div className="gr-qt-field-label">{headers[i]}</div>
                                <div className="gr-qt-field-val">{renderCell(row[i])}</div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        headers.slice(1).map((h, i) => (
                          <div key={i} className="gr-qt-field">
                            <div className="gr-qt-field-label">{h}</div>
                            <div className="gr-qt-field-val">{renderCell(row[i + 1])}</div>
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                </div>
                {/* 桌面端：表格式 */}
                <div className="gr-qt-table gr-qt-desktop">
                  <div className="gr-qt-thead" style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
                    {headers.map((h, i) => <div key={i} className="gr-qt-th">{h}</div>)}
                  </div>
                  {rows.map((row, ri) => (
                    <div key={ri} className="gr-qt-trow" style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
                      {row.map((cell, ci) => <div key={ci} className="gr-qt-td">{renderCell(cell)}</div>)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}


          {/* 真实场景 */}
          {step === scenarioStepIdx && (
            <div className="gr-card-panel">
              <h2 className="gr-card-h">{t('grammar.section_scenario', lang)}</h2>
              {card.scenarioNote && (
                <div className="gr-card-note purple">
                  <div className="gr-card-note-label">{t('grammar.when_use', lang)}</div>
                  <div className="gr-card-note-body">{card.scenarioNote}</div>
                </div>
              )}
              <div className="gr-card-list">
                {card.scenarios.map((sc, i) => (
                  <div key={i} className="gr-scn">
                    <span className="gr-scn-icon">{sc.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="gr-scn-ctx">{sc.context}</p>
                      <div className="gr-card-row" style={{ marginBottom: 8 }}>
                        <p className="gr-card-ko" style={{ margin: 0 }}>{sc.ko}</p>
                        <button onClick={e => { e.stopPropagation(); speak(sc.ko); }} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={13} /></button>
                      </div>
                      <p className="gr-card-zh" style={{ margin: 0 }}>{sc.zh}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 别踩坑 */}
          {step === mistakeStepIdx && (
            <div className="gr-card-panel">
              <h2 className="gr-card-h">{t('grammar.section_mistake', lang)}</h2>
              <div className="gr-card-list">
                {card.mistakes.map((m, i) => (
                  <div key={i} className="gr-mis">
                    <div className="gr-mis-line wrong">
                      <span className="gr-mis-tag wrong">✗ {t('grammar.mistake_wrong', lang)}</span>
                      <span className="gr-mis-txt">{m.wrong}</span>
                      <button onClick={e => { e.stopPropagation(); speak(m.wrong); }} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={13} /></button>
                    </div>
                    <div className="gr-mis-line right">
                      <span className="gr-mis-tag right">✓ {t('grammar.mistake_right', lang)}</span>
                      <span className="gr-mis-txt">{m.correct}</span>
                      <button onClick={e => { e.stopPropagation(); speak(m.correct); }} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={13} /></button>
                    </div>
                    <div className="gr-mis-note">{m.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 排序练习 */}
          {step === sortStepIdx && (
            <div className="gr-card-panel">
              <h2 className="gr-card-h">{t('grammar.section_sort', lang)}</h2>
              <p className="gr-card-lede">{t('grammar.section_sort_desc', lang)}</p>
              <CardSortStep key={card.id + '-sort'} examples={card.cardExamples} />
            </div>
          )}

          {/* 特殊练习 */}
          {step === specialQuizStepIdx && card.specialQuiz && (
            <div className="gr-card-panel">
              <SpecialQuizStep quiz={card.specialQuiz} />
            </div>
          )}

          {/* 判断对错 */}
          {step === judgeStepIdx && (
            <div className="gr-card-panel">
              <h2 className="gr-card-h">{t('grammar.section_judge', lang)}</h2>
              <p className="gr-card-lede">{t('grammar.section_judge_desc', lang)}</p>
              <CardJudgeStep key={card.id + '-judge'} mistakes={card.mistakes} />
            </div>
          )}

          {/* 听力：听句选意思 */}
          {step === listeningStepIdx && listeningData && (
            <div className="gr-card-panel">
              <h2 className="gr-card-h">{t('grammar.section_listening', lang)}</h2>
              <p className="gr-card-lede">{t('grammar.section_listening_desc', lang)}</p>
              <ListeningMCStep key={card.id + '-listen'} data={listeningData} />
            </div>
          )}

          {/* 仿写：题库模板（带换词槽）优先，否则照本课例句 */}
          {step === imitateStepIdx && hasImitate && (bankImitate || fallbackImitate) && (
            <div className="gr-card-panel">
              <h2 className="gr-card-h">{t('grammar.section_imitate', lang)}</h2>
              <p className="gr-card-lede">{t('grammar.section_imitate_desc', lang)}</p>
              <GrammarWriteExercise
                key={card.id + '-imitate'}
                mode="imitate"
                grammarPoint={card.title}
                whatItDoes={card.whatItDoes}
                stem={bankImitate
                  ? { ko: bankImitate.ko, zh: bankImitate.zh }
                  : { ko: fallbackImitate.wordBlocks.map(wb => wb.text).join(' '), zh: fallbackImitate.zh }}
                swapHint={bankImitate?.swapSlot}
                lang={lang}
              />
            </div>
          )}

          {/* 续写：题库问句 opener（带作答提示）优先，否则照本课情景 */}
          {step === continueStepIdx && hasContinue && (bankContinue || fallbackContinue) && (
            <div className="gr-card-panel">
              <h2 className="gr-card-h">{t('grammar.section_continue', lang)}</h2>
              <p className="gr-card-lede">{t('grammar.section_continue_desc', lang)}</p>
              <GrammarWriteExercise
                key={card.id + '-continue'}
                mode="continue"
                grammarPoint={card.title}
                whatItDoes={card.whatItDoes}
                stem={bankContinue
                  ? { ko: bankContinue.ko, zh: bankContinue.zh }
                  : { ko: fallbackContinue.ko, zh: fallbackContinue.zh, context: fallbackContinue.context }}
                continueHint={bankContinue?.expectHint}
                lang={lang}
              />
            </div>
          )}

          {/* 完成 */}
          {step === doneStepIdx && (
            <div className="gr-card-panel">
              {card.overviewHtml ? (
                <>
                  {/* L10 第一章全部完成横幅（React读localStorage，不依赖HTML原型JS） */}
                  {card.lessonNumber === 10 && card.partNumber === 1 && (() => {
                    const allDone = CHAPTER1_KEYS.every(k => isLessonDone(lessonStates[k]));
                    return allDone ? (
                      <div className="gr-done-chapter">
                        <h2>{t('grammar.done_chapter_title', lang)}</h2>
                        <p>{t('grammar.done_chapter_desc', lang)}</p>
                      </div>
                    ) : null;
                  })()}
                  <div className="overview-desktop" dangerouslySetInnerHTML={{ __html: card.overviewHtml }} />
                </>
              ) : (
                <>
                  {/* L10 第一章全部完成横幅 */}
                  {card.lessonNumber === 10 && card.partNumber === 1 && (() => {
                    const allDone = CHAPTER1_KEYS.every(k => isLessonDone(lessonStates[k]));
                    return allDone ? (
                      <div className="gr-done-chapter">
                        <h2>{t('grammar.done_chapter_title', lang)}</h2>
                        <p>{t('grammar.done_chapter_desc', lang)}</p>
                      </div>
                    ) : null;
                  })()}
                  <div style={{ marginBottom: 18 }}>
                    <h2 className="gr-card-h big" style={{ margin: 0 }}>{card.title}</h2>
                    <p className="gr-card-lede" style={{ marginTop: 6, marginBottom: 0 }}>{card.whatItDoes}</p>
                  </div>
                  {card.connectionRules.length > 0 && (
                    <div className="gr-card-note mint">
                      <div className="gr-card-note-label">{t('grammar.done_core_rules', lang)}</div>
                      <div className="gr-card-note-body" style={{ lineHeight: 2 }}>
                        {card.connectionRules.map((rule, i) => {
                          const text = `${rule.text}${rule.examples ? '　' + rule.examples : ''}`;
                          const speakText = rule.examples || rule.text;
                          const isExample = typeof rule !== 'string' && rule.type === 'example';
                          return (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ flex: 1 }}>{text}</span>
                              {isExample && <button onClick={() => speak(speakText)} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={11} /></button>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {card.quickTable && (
                    <div className="gr-card-sub" style={{ marginBottom: 14 }}>
                      <div className="gr-card-note-label" style={{ color: 'var(--hr-mint-strong)', marginBottom: 10 }}>{card.quickTable.title}</div>
                      <div style={{ overflowX: 'auto' }}>
                        <table>
                          <thead><tr>{card.quickTable.headers.map((h, i) => (
                            <th key={i} style={{ whiteSpace: 'nowrap' }}>{h}</th>
                          ))}</tr></thead>
                          <tbody>{card.quickTable.rows.map((row, ri) => (
                            <tr key={ri}>{row.map((cell, ci) => (
                              <td key={ci}>
                                {typeof cell === 'object' && cell !== null && 'ko' in cell
                                  ? (() => {
                                      const c = cell as { ko: string; zh: string };
                                      return <><span style={{ display: 'block', fontWeight: 700 }}>{c.ko}</span>{c.zh && <span style={{ display: 'block', fontSize: 11, color: 'var(--hr-ink-3)' }}>{c.zh}</span>}</>;
                                    })()
                                  : cell}
                              </td>
                            ))}</tr>
                          ))}</tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {card.mistakes.length > 0 && (
                    <div className="gr-card-note" style={{ background: 'var(--hr-pink-soft)', borderColor: 'var(--hr-pink-base)' }}>
                      <div className="gr-card-note-label" style={{ color: 'var(--hr-pink-strong)' }}>{t('grammar.done_common_errors', lang)}</div>
                      {card.mistakes.slice(0, 4).map((m, i) => (
                        <div key={i} style={{ fontSize: 14.5, lineHeight: 1.8, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                          <span style={{ color: 'var(--color-status-danger)', textDecoration: 'line-through' }}>{m.wrong}</span>{' → '}
                          <span style={{ color: 'var(--hr-mint-strong)' }}>{m.correct}</span>
                          <button onClick={() => speak(m.correct)} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={11} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  {linkedGps.length > 0 && (
                    <div style={{ marginBottom: 14 }}>
                      <p className="gr-card-note-label" style={{ marginBottom: 12 }}>{t('grammar.done_continue_practice', lang)}</p>
                      {linkedGps.map(gp => (
                        <button key={gp.id} onClick={() => onStartGrammar(gp)} className="gr-done-link">
                          ▶ {t('grammar.practice_prefix', lang)}{gp.displayTitle}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* 关联语法（overviewHtml 模式下也显示） */}
              {card.overviewHtml && linkedGps.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <p className="gr-card-note-label" style={{ marginBottom: 12 }}>{t('grammar.done_continue_practice', lang)}</p>
                  {linkedGps.map(gp => (
                    <button key={gp.id} onClick={() => onStartGrammar(gp)} className="gr-done-link">
                      ▶ {t('grammar.practice_prefix', lang)}{gp.displayTitle}
                    </button>
                  ))}
                </div>
              )}

              {/* 完成按钮（overviewHtml 有自己的重新学习按钮，这里只放完成） */}
              {!card.overviewHtml && (
                <button onClick={() => { setStep(0); scrollTop(); }} className="gr-done-relearn">
                  {t('grammar.done_relearn', lang)}
                </button>
              )}
              <div className="gr-done-divider">
                <button onClick={onComplete} className="gr-done-complete">
                  {t('grammar.done_complete', lang)}
                </button>
              </div>
            </div>
          )}

        {/* 未登录提示：进度不会保存 */}
        {!user?.id && (
          <div className="gr-guest-hint">
            {t('grammar.login_to_save', lang)}
          </div>
        )}

        {/* 底部翻页导航 */}
        <div className="gr-card-nav">
          {step > 0 && (
            <button onClick={goPrev} className="gr-nav-prev">{t('grammar.nav_prev_page', lang)}</button>
          )}
          {step < doneStepIdx && (
            <button onClick={goNext} className="gr-nav-next">
              {t('grammar.nav_next_page', lang)}
            </button>
          )}
        </div>
      </div>

      {/* 右侧常驻速查面板（仅桌面 ≥1200px） */}
      {hasCheat && (
        <aside className="gr-card-cheat">
          <div className="gr-cheat-label">{t('grammar.quick_ref', lang)}</div>
          {cheatFormula && (
            <div className="gr-cheat-block">
              <div className="gr-cheat-head">{t('grammar.cheat_pattern', lang)}</div>
              <div className="gr-cheat-formula">
                <span className="gr-cheat-formula-ko">{cheatFormula.ko}</span>
                <button onClick={() => speak(cheatFormula.ko)} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={12} /></button>
              </div>
              {cheatFormula.zh && <div className="gr-cheat-formula-zh">{cheatFormula.zh}</div>}
            </div>
          )}
          {cheatPoints.length > 0 && (
            <div className="gr-cheat-block">
              <div className="gr-cheat-head">{t('grammar.cheat_key_points', lang)}</div>
              <ul className="gr-cheat-points">
                {cheatPoints.map((p, i) => (
                  <li key={i} className="gr-cheat-point">{p.text}</li>
                ))}
              </ul>
            </div>
          )}
          {cheatExamples.length > 0 && (
            <div className="gr-cheat-block">
              <div className="gr-cheat-head">{t('grammar.cheat_examples', lang)}</div>
              <ul className="gr-cheat-egs">
                {cheatExamples.map((e, i) => (
                  <li key={i} className="gr-cheat-eg">
                    <div className="gr-cheat-eg-row">
                      <span className="gr-cheat-eg-ko">{e.ko}</span>
                      <button onClick={() => speak(e.ko)} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={12} /></button>
                    </div>
                    {e.zh && <div className="gr-cheat-eg-zh">{e.zh}</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cheatScenarios.length > 0 && (
            <div className="gr-cheat-block">
              <div className="gr-cheat-head">{t('grammar.cheat_in_context', lang)}</div>
              <ul className="gr-cheat-scns">
                {cheatScenarios.map((s, i) => (
                  <li key={i} className="gr-cheat-scn">
                    <div className="gr-cheat-scn-ctx">{s.context}</div>
                    <div className="gr-cheat-eg-row">
                      <span className="gr-cheat-eg-ko">{s.ko}</span>
                      <button onClick={() => speak(s.ko)} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={12} /></button>
                    </div>
                    {s.zh && <div className="gr-cheat-eg-zh">{s.zh}</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cheatVocab.length > 0 && (
            <div className="gr-cheat-block">
              <div className="gr-cheat-head">{t('grammar.cheat_vocabulary', lang)}</div>
              <ul className="gr-cheat-vocab">
                {cheatVocab.map((v, i) => (
                  <li key={i} className="gr-cheat-vocab-item">
                    <span className="gr-cheat-vocab-text">{v.text}</span>
                    {v.examples && <span className="gr-cheat-vocab-eg">{v.examples}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cheatMistakes.length > 0 && (
            <div className="gr-cheat-block">
              <div className="gr-cheat-head warn">{t('grammar.cheat_watch_out', lang)}</div>
              <ul className="gr-cheat-mistakes">
                {cheatMistakes.map((m, i) => (
                  <li key={i} className="gr-cheat-mistake">
                    <div className="gr-cheat-mistake-row">
                      <span className="x">{m.wrong}</span>
                      <span className="arw">→</span>
                      <span className="o">{m.correct}</span>
                    </div>
                    {m.note && <div className="gr-cheat-mistake-why">{m.note}</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      )}
      </div>
      {tapWord && (
        <WordTapSheet
          surface={tapWord}
          source="grammar"
          onClose={() => setTapWord(null)}
          onSaved={() => setTapWord(null)}
        />
      )}
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

type SortQState = { order: string[]; answers: string[]; used: number[]; checked: boolean; result: 'ok' | 'ng' | null };
const mkSortStates = (data: { words: string[] }[]): SortQState[] => data.map(q => ({ order: shuffle(q.words), answers: [], used: [], checked: false, result: null }));

function SortStep({ data = SORT_Q, onScore }: { data?: typeof SORT_Q; onScore?: (s: { correct: number; total: number }) => void }) {
  const C = useC();
  const { lang } = useLang();
  const [qIdx, setQIdx] = React.useState(0);
  const [states, setStates] = React.useState<SortQState[]>(() => mkSortStates(data));
  const [allDone, setAllDone] = React.useState(false);

  // Report score: count questions answered correctly so far
  React.useEffect(() => {
    const correct = states.filter(s => s.result === 'ok').length;
    onScore?.({ correct, total: data.length });
  }, [states, data.length, onScore]);

  const cur = states[qIdx];
  const patch = (upd: Partial<SortQState>) => setStates(s => s.map((st, i) => i === qIdx ? { ...st, ...upd } : st));

  const pick = (word: string, idx: number) => {
    if (!cur || cur.checked || cur.used.includes(idx)) return;
    patch({ used: [...cur.used, idx], answers: [...cur.answers, word] });
  };

  const remove = (i: number) => {
    if (!cur || cur.checked) return;
    const newAns = cur.answers.filter((_, j) => j !== i);
    const newUsed: number[] = [];
    for (const w of newAns) {
      const j = cur.order.findIndex((ww, k) => ww === w && !newUsed.includes(k));
      if (j >= 0) newUsed.push(j);
    }
    patch({ answers: newAns, used: newUsed });
  };

  const check = () => {
    const q = data[qIdx];
    if (!cur || cur.checked || cur.answers.length < q.answer.length) return;
    const ok = cur.answers.join('|') === q.answer.join('|');
    patch({ checked: true, result: ok ? 'ok' : 'ng' });
    if (ok && qIdx === data.length - 1) setAllDone(true);
  };

  const reset = () => {
    const q = data[qIdx];
    patch({ order: shuffle(q.words), answers: [], used: [], checked: false, result: null });
  };

  const goPrev = () => { if (qIdx > 0) setQIdx(qIdx - 1); };
  const goNext = () => { if (qIdx < data.length - 1) setQIdx(qIdx + 1); };

  if (!cur) return null;
  const { order, answers, used, checked, result } = cur;
  const q = data[qIdx];
  const trackBg = result === 'ok' ? 'var(--color-mint-soft)' : result === 'ng' ? 'var(--color-danger-bg)' : 'var(--color-surface-3)';
  const trackBorder = result === 'ok' ? 'var(--color-mint-strong)' : result === 'ng' ? 'var(--color-status-danger)' : 'var(--color-border-1)';
  const canNext = checked && result === 'ok' && qIdx < data.length - 1;

  return (
    <div>
      <div style={{ fontSize: 15, color: C.muted, marginBottom: 4 }}>{t('grammar.quiz_q_number', lang, { n: String(qIdx + 1), total: String(data.length) })}</div>
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
        {result === 'ok' ? (allDone ? t('grammar.practice_sort_all_done', lang) : t('grammar.quiz_correct', lang)) : t('grammar.quiz_wrong_sort', lang, { answer: q.answer.join(' ') })}
        {result !== 'ok' && <button onClick={() => speak(q.answer.join(' '))} style={{ padding: 4, borderRadius: 6, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={12} /></button>}
      </div>}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={goPrev} disabled={qIdx === 0} style={{ padding: '12px 16px', borderRadius: 14, border: `1.5px solid ${C.line}`, background: C.card, color: C.muted, fontSize: 16, cursor: qIdx === 0 ? 'default' : 'pointer', opacity: qIdx === 0 ? 0.4 : 1 }}>{t('grammar.quiz_prev', lang)}</button>
        <button onClick={reset} style={{ padding: '12px 16px', borderRadius: 14, border: `1.5px solid ${C.line}`, background: C.card, color: C.muted, fontSize: 16, cursor: 'pointer' }}>{t('grammar.quiz_reset', lang)}</button>
        {canNext
          ? <button onClick={goNext} style={{ flex: 1, padding: 12, borderRadius: 14, border: 'none', background: 'var(--color-mint-strong)', color: 'white', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>{t('grammar.quiz_next', lang)}</button>
          : <button onClick={check} disabled={checked} style={{ flex: 1, padding: 12, borderRadius: 14, border: 'none', background: 'var(--color-ink-1)', color: 'white', fontSize: 16, fontWeight: 800, cursor: checked ? 'default' : 'pointer', opacity: checked ? 0.5 : 1 }}>{t('grammar.quiz_check', lang)}</button>
        }
      </div>
    </div>
  );
}

function FillStep({ data, onScore }: { data: NonNullable<PracticeGroups['fill1']> | NonNullable<PracticeGroups['cloze']>; onScore?: (s: { correct: number; total: number }) => void }) {
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
            <div style={{ fontSize: 15, color: C.muted, fontWeight: 700, marginBottom: 10 }}>{t('grammar.quiz_q_simple', lang, { n: String(i + 1) })}</div>
            {'hint' in q && q.hint && <div style={{ fontSize: 15, background: C.bg, borderRadius: 10, padding: '8px 12px', color: C.muted, marginBottom: 10 }}>{q.hint}</div>}
            <div style={{ fontSize: 17, fontWeight: 700, color: C.ink, marginBottom: 10 }}>{sentence}</div>
            {q.opts.map(opt => {
              let border = `1.5px solid ${C.line}`, bg = C.card;
              if (s.done) {
                if (opt === q.ans) { border = '1.5px solid var(--color-mint-strong)'; bg = 'var(--color-mint-soft)'; }
                else if (opt === s.picked && s.picked !== q.ans) { border = '1.5px solid var(--color-status-danger)'; bg = 'var(--color-danger-bg)'; }
              }
              const mark = s.done ? (opt === q.ans ? ' ✓' : (opt === s.picked ? ' ✗' : '')) : '';
              return (
                <button key={opt} onClick={() => pick(i, opt)} style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 14, border, background: bg, fontSize: 17, fontWeight: 700, color: C.ink, cursor: 'pointer', margin: '0 8px 8px 0' }}>{opt}{mark}</button>
              );
            })}
            {s.done && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 16, color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', fontWeight: 700, margin: '6px 0 2px' }}>{s.ok ? t('grammar.quiz_correct', lang) : t('grammar.quiz_wrong_answer', lang, { answer: q.ans })}</div>
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

function MorphStep({ data = MORPH_DATA, onScore }: { data?: typeof MORPH_DATA; onScore?: (s: { correct: number; total: number }) => void }) {
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
        return (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 15, color: C.muted, fontWeight: 700, marginBottom: 10 }}>{t('grammar.quiz_q_simple', lang, { n: String(i + 1) })}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.ink, marginBottom: 12 }}>{q.label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
              {q.opts.map(opt => {
                let border = `1.5px solid ${C.line}`, bg = C.card;
                if (s.done) {
                  if (opt === q.ans) { border = '1.5px solid var(--color-mint-strong)'; bg = 'var(--color-mint-soft)'; }
                  else if (opt === s.picked && s.picked !== q.ans) { border = '1.5px solid var(--color-status-danger)'; bg = 'var(--color-danger-bg)'; }
                }
                const mark = s.done ? (opt === q.ans ? ' ✓' : (opt === s.picked ? ' ✗' : '')) : '';
                return (
                  <button key={opt} onClick={() => pick(i, opt)} style={{ padding: '10px 16px', borderRadius: 14, border, background: bg, fontSize: 17, fontWeight: 700, color: C.ink, cursor: 'pointer' }}>{opt}{mark}</button>
                );
              })}
            </div>
            {s.done && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 16, color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', fontWeight: 700, margin: '6px 0 2px' }}>{s.ok ? t('grammar.quiz_correct', lang) : t('grammar.quiz_wrong_answer', lang, { answer: q.ans })}</div>
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

function JudgeStep({ data = JUDGE_DATA, onScore }: { data?: typeof JUDGE_DATA; onScore?: (s: { correct: number; total: number }) => void }) {
  const C = useC();
  const { lang } = useLang();
  const [states, setStates] = React.useState<JudgeState[]>(() => data.map(() => ({ done: false, ok: null, picked: null })));

  const pick = (i: number, choice: string) => {
    if (states[i].done) return;
    const ok = choice === data[i].ans;
    const newStates = states.map((item, j) => j === i ? { done: true, ok, picked: choice } : item);
    setStates(newStates);
    const correct = newStates.filter(s => s.ok).length;
    const answered = newStates.filter(s => s.done).length;
    onScore?.({ correct, total: answered });
  };

  return (
    <div>
      {data.map((q, i) => {
        const s = states[i];
        const btnStyle = (choice: string): React.CSSProperties => {
          if (!s.done) return { border: `1.5px solid ${C.line}`, background: C.card };
          if (choice === q.ans) return { border: '1.5px solid var(--color-mint-strong)', background: 'var(--color-mint-soft)' };
          if (choice === s.picked && s.picked !== q.ans) return { border: '1.5px solid var(--color-status-danger)', background: 'var(--color-danger-bg)' };
          return { border: `1.5px solid ${C.line}`, background: C.card };
        };
        return (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 15, color: C.muted, fontWeight: 700, marginBottom: 10 }}>{t('grammar.quiz_q_natural', lang, { n: String(i + 1) })}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8 }}>
              {(['A', 'B'] as const).map(ch => (
                <div key={ch} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button onClick={() => pick(i, ch)} style={{ flex: 1, padding: '11px 14px', borderRadius: 14, fontSize: 17, fontWeight: 700, color: C.ink, cursor: 'pointer', textAlign: 'left', ...btnStyle(ch) }}>
                    {ch}. {ch === 'A' ? q.A : q.B}{s.done ? (ch === q.ans ? ' ✓' : (ch === s.picked ? ' ✗' : '')) : ''}
                  </button>
                  <button onClick={() => speak(ch === 'A' ? q.A : q.B)} style={{ padding: 6, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={13} /></button>
                </div>
              ))}
            </div>
            {s.done && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 16, color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', fontWeight: 700, margin: '6px 0 2px' }}>{s.ok ? t('grammar.quiz_correct', lang) : t('grammar.quiz_wrong_answer', lang, { answer: q.ans })}</div>
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

function ErrStep({ data = ERR_DATA, onScore }: { data?: typeof ERR_DATA; onScore?: (s: { correct: number; total: number }) => void }) {
  const C = useC();
  const { lang } = useLang();
  const [states, setStates] = React.useState<ErrState[]>(() => data.map(() => ({ revealed: false })));

  const reveal = (i: number) => {
    setStates(s => {
      const next = s.map((item, j) => j === i ? { revealed: true } : item);
      const correct = next.filter(st => st.revealed).length;
      onScore?.({ correct, total: data.length });
      return next;
    });
  };

  return (
    <div>
      {data.map((q, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 15, color: C.muted, fontWeight: 700, marginBottom: 10 }}>{t('grammar.quiz_q_find_error', lang, { n: String(i + 1) })}</div>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.line}` }}>
            <div style={{ background: `color-mix(in srgb, #e05555 8%, ${C.card})`, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: 'var(--color-status-danger)', color: 'white', fontSize: 13, fontWeight: 800, padding: '2px 7px', borderRadius: 99, flexShrink: 0 }}>{t('grammar.mistake_wrong', lang)}</span>
              <span style={{ fontSize: 17, fontWeight: 600, flex: 1, minWidth: 0, overflowWrap: 'break-word' }}>{q.wrong}</span>
              <button onClick={() => speak(q.wrong)} style={{ padding: 6, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={13} /></button>
            </div>
            {states[i].revealed ? (
              <>
                <div style={{ background: `color-mix(in srgb, #2db89b 8%, ${C.card})`, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: 'var(--color-mint-strong)', color: 'white', fontSize: 13, fontWeight: 800, padding: '2px 7px', borderRadius: 99, flexShrink: 0 }}>{t('grammar.mistake_right', lang)}</span>
                  <span style={{ fontSize: 17, fontWeight: 600, flex: 1, minWidth: 0, overflowWrap: 'break-word' }}>{q.right}</span>
                  <button onClick={() => speak(q.right)} style={{ padding: 6, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={13} /></button>
                </div>
                <div style={{ background: C.bg, borderTop: `1px solid ${C.line}`, padding: '8px 14px', fontSize: 15, color: C.muted, lineHeight: 1.5 }}>{q.why}</div>
              </>
            ) : (
              <div style={{ padding: '10px 14px' }}>
                <button onClick={() => reveal(i)} style={{ padding: '8px 16px', borderRadius: 12, border: '1.5px solid var(--color-mint-base)', background: 'var(--color-mint-soft)', color: 'var(--color-mint-strong)', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>{t('grammar.quiz_show_answer', lang)}</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScenarioStep({ data, onScore }: { data: NonNullable<PracticeGroups['scenario']>; onScore?: (s: { correct: number; total: number }) => void }) {
  const C = useC();
  const { lang } = useLang();
  const [states, setStates] = React.useState(() => data.map(() => ({ done: false, ok: false, picked: '' })));

  const pick = (qi: number, opt: string) => {
    if (states[qi].done) return;
    const newStates = states.map((item, j) => j === qi ? { done: true, ok: opt === data[qi].ans, picked: opt } : item);
    setStates(newStates);
    onScore?.({ correct: newStates.filter(s => s.ok).length, total: newStates.filter(s => s.done).length });
  };

  return (
    <div>
      {data.map((q, qi) => {
        const s = states[qi];
        const btnStyle = (opt: string): React.CSSProperties => {
          if (!s.done) return { border: `1.5px solid ${C.line}`, background: C.card };
          if (opt === q.ans) return { border: '1.5px solid var(--color-mint-strong)', background: 'var(--color-mint-soft)' };
          if (opt === s.picked) return { border: '1.5px solid var(--color-status-danger)', background: 'var(--color-danger-bg)' };
          return { border: `1.5px solid ${C.line}`, background: C.card };
        };
        return (
          <div key={qi} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{q.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--color-mint-strong)', background: 'var(--color-mint-soft)', padding: '2px 9px', borderRadius: 99, flexShrink: 0 }}>{q.context}</span>
              <span style={{ fontSize: 15, color: C.ink, fontWeight: 700 }}>{q.zh}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {q.options.map((opt, oi) => (
                <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button onClick={() => pick(qi, opt)} disabled={s.done} style={{ flex: 1, padding: '11px 14px', borderRadius: 14, fontSize: 17, fontWeight: 700, color: C.ink, cursor: s.done ? 'default' : 'pointer', textAlign: 'left', ...btnStyle(opt) }}>
                    {opt}{s.done ? (opt === q.ans ? ' ✓' : (opt === s.picked ? ' ✗' : '')) : ''}
                  </button>
                  <button onClick={() => speak(opt)} style={{ padding: 6, borderRadius: 8, background: 'rgba(255,127,168,.08)', border: 'none', cursor: 'pointer', color: C.pink, flexShrink: 0 }}><Volume2 size={13} /></button>
                </div>
              ))}
            </div>
            {s.done && (
              <div style={{ fontSize: 16, color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', fontWeight: 700, margin: '8px 0 2px' }}>
                {s.ok ? t('grammar.quiz_correct', lang) : t('grammar.quiz_wrong_answer', lang, { answer: q.ans })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// 听力选择题：听韩语句选中文意思。题干韩语只用喇叭播放，不显示文字（真听力）。
function ListeningMCStep({ data, onScore }: { data: NonNullable<PracticeGroups['listening']>; onScore?: (s: { correct: number; total: number }) => void }) {
  const C = useC();
  const { lang } = useLang();
  const [states, setStates] = React.useState(() => data.map(() => ({ done: false, ok: false, picked: '' })));

  const pick = (qi: number, opt: string) => {
    if (states[qi].done) return;
    const newStates = states.map((item, j) => j === qi ? { done: true, ok: opt === data[qi].ans, picked: opt } : item);
    setStates(newStates);
    onScore?.({ correct: newStates.filter(s => s.ok).length, total: newStates.filter(s => s.done).length });
  };

  return (
    <div>
      {data.map((q, qi) => {
        const s = states[qi];
        const btnStyle = (opt: string): React.CSSProperties => {
          if (!s.done) return { border: `1.5px solid ${C.line}`, background: C.card };
          if (opt === q.ans) return { border: '1.5px solid var(--color-mint-strong)', background: 'var(--color-mint-soft)' };
          if (opt === s.picked) return { border: '1.5px solid var(--color-status-danger)', background: 'var(--color-danger-bg)' };
          return { border: `1.5px solid ${C.line}`, background: C.card };
        };
        return (
          <div key={qi} style={{ marginBottom: 20 }}>
            <button onClick={() => speak(q.ko)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 14, border: `1.5px solid ${C.pinkSoft}`, background: 'rgba(255,127,168,.06)', color: C.pink, fontSize: 14, fontWeight: 800, cursor: 'pointer', marginBottom: 10 }}>
              <Volume2 size={18} /> {t('grammar.practice_listen_play', lang)}
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {q.options.map((opt, oi) => (
                <button key={oi} onClick={() => pick(qi, opt)} disabled={s.done} style={{ padding: '11px 14px', borderRadius: 14, fontSize: 15, fontWeight: 700, color: C.ink, cursor: s.done ? 'default' : 'pointer', textAlign: 'left', ...btnStyle(opt) }}>
                  {opt}{s.done ? (opt === q.ans ? ' ✓' : (opt === s.picked ? ' ✗' : '')) : ''}
                </button>
              ))}
            </div>
            {s.done && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '10px 0 2px' }}>
                <span style={{ fontSize: 15, color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', fontWeight: 700 }}>
                  {s.ok ? t('grammar.quiz_correct', lang) : t('grammar.practice_listen_answer', lang, { answer: q.ans })}
                </span>
                <button onClick={() => speak(q.ko)} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={13} /></button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// 听写题（综合测验）：听韩语句写出来，本地 normalizeKorean 比对（忽略空格/标点）。
function DictationStep({ data, onScore }: { data: NonNullable<PracticeGroups['dictation']>; onScore?: (s: { correct: number; total: number }) => void }) {
  const C = useC();
  const { lang } = useLang();
  const [states, setStates] = React.useState(() => data.map(() => ({ done: false, ok: false, input: '' })));

  const setInput = (qi: number, v: string) => {
    setStates(prev => prev.map((item, j) => j === qi ? { ...item, input: v } : item));
  };
  const check = (qi: number) => {
    if (states[qi].done || !states[qi].input.trim()) return;
    const ok = normalizeKorean(states[qi].input) === normalizeKorean(data[qi].ko);
    const newStates = states.map((item, j) => j === qi ? { ...item, done: true, ok } : item);
    setStates(newStates);
    onScore?.({ correct: newStates.filter(s => s.ok).length, total: newStates.filter(s => s.done).length });
  };

  return (
    <div>
      {data.map((q, qi) => {
        const s = states[qi];
        return (
          <div key={qi} style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <button onClick={() => speak(q.ko)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 14, border: `1.5px solid ${C.pinkSoft}`, background: 'rgba(255,127,168,.06)', color: C.pink, fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
                <Volume2 size={18} /> {t('grammar.practice_listen_play', lang)}
              </button>
              <span style={{ fontSize: 13, color: C.muted, fontWeight: 600 }}>{q.zh}</span>
            </div>
            <input
              value={s.input}
              onChange={e => setInput(qi, e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') check(qi); }}
              disabled={s.done}
              placeholder={t('grammar.practice_dictation_placeholder', lang)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 14, fontSize: 16, fontWeight: 600, color: C.ink, background: C.card, border: `1.5px solid ${s.done ? (s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)') : C.line}`, outline: 'none' }}
            />
            {!s.done ? (
              <button onClick={() => check(qi)} disabled={!s.input.trim()} style={{ marginTop: 10, padding: '10px 18px', borderRadius: 99, fontSize: 14, fontWeight: 800, color: s.input.trim() ? '#fff' : C.muted, background: s.input.trim() ? C.ink : C.line, border: 'none', cursor: s.input.trim() ? 'pointer' : 'default' }}>
                {t('grammar.practice_dictation_check', lang)}
              </button>
            ) : (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 15, color: s.ok ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', fontWeight: 700, marginBottom: 6 }}>
                  {s.ok ? t('grammar.quiz_correct', lang) : t('grammar.practice_dictation_wrong', lang)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, background: 'var(--color-mint-soft)' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>{q.ko}</span>
                  <button onClick={() => speak(q.ko)} className="gr-card-play sm" aria-label={t('a11y.play_audio', lang)}><Volume2 size={13} /></button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ScoreStep({ onComplete, items, abilities, showNextHint }: {
  onComplete: () => void;
  items: { label: string; correct: number; max: number }[];
  abilities?: string[];
  showNextHint?: boolean;
}) {
  const C = useC();
  const { lang } = useLang();
  const total = items.reduce((s, it) => s + it.correct, 0);
  const max = items.reduce((s, it) => s + it.max, 0);
  // P1 专属能力清单（派生 part 会传入本 part 的 connectionRules 要点）
  const p1Abilities = [
    '韩语基本语序：谓语放句末',
    '正式体 합니다/습니다，日常体 아요/어요',
    '话题助词 은/는（有收音→은，无收音→는）',
    '宾语助词 을/를（有收音→을，无收音→를）',
    '地点助词 에（方向·存在·时间）vs 에서（动作地点）',
    '过去时 -았/었어요，将来时 -을/ㄹ 거예요',
    '进行时 -고 있어요',
  ];
  const abilityList = abilities && abilities.length > 0 ? abilities : p1Abilities;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {max > 0 && (
        <div style={{ background: 'linear-gradient(135deg, var(--color-pink-soft), var(--color-mint-soft))', borderRadius: 20, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 42, fontWeight: 900, color: C.pink }}>{total}<span style={{ fontSize: 18, color: C.muted }}> / {max}</span></div>
          <div style={{ fontSize: 16, color: C.muted, marginTop: 4 }}>{t('grammar.practice_score_correct', lang)}</div>
        </div>
      )}
      {items.length > 0 && (
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-2">
          {items.map((it, i) => (
            <div key={i} style={{ background: C.bg, borderRadius: 14, padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.pink }}>{it.correct}/{it.max}</div>
              <div style={{ fontSize: 15, color: C.muted, marginTop: 3 }}>{it.label}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: '14px 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.muted, marginBottom: 10 }}>{t('grammar.practice_abilities', lang)}</div>
        {abilityList.map((item, i) => (
          <div key={i} style={{ fontSize: 15, color: C.ink, lineHeight: 1.8 }}>✓ {item}</div>
        ))}
      </div>
      {showNextHint && (
        <div style={{ background: C.bg, borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.muted, marginBottom: 4 }}>{t('grammar.practice_next_phase', lang)}</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{t('grammar.next_phase_title', lang)}</div>
          <div style={{ fontSize: 15, color: C.muted, marginTop: 3 }}>{t('grammar.next_phase_desc', lang)}</div>
        </div>
      )}
      <button onClick={onComplete} style={{ width: '100%', padding: 14, borderRadius: 16, border: 'none', background: 'linear-gradient(135deg, var(--color-mint-base), var(--color-pink-base))', color: 'white', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
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
  { badge: '🗺️', label: '情景应用', color: 'var(--color-mint-strong)' },
  { badge: '🧠', label: '综合选择', color: 'var(--color-purple-strong)' },
  { badge: '🏆', label: '练习完成', color: 'var(--color-peach-base,#e07a30)' },
  { badge: '🧩', label: '词块填空', color: 'var(--color-purple-base)' },
  { badge: '🎧', label: '听写', color: 'var(--color-mint-strong)' },
  { badge: '✍️', label: '仿写', color: 'var(--color-pink-base)' },
  { badge: '💬', label: '续写', color: 'var(--color-pink-strong)' },
];
const STEP_CONFIG_EN = [
  { badge: '📋', label: 'Overview', color: 'var(--color-pink-base)' },
  { badge: '🎯', label: 'Word order', color: 'var(--color-mint-strong)' },
  { badge: '✏️', label: 'Particles ①', color: 'var(--color-purple-strong)' },
  { badge: '✏️', label: 'Particles ②', color: 'var(--color-purple-base)' },
  { badge: '🔄', label: 'Conjugation', color: 'var(--color-mint-strong)' },
  { badge: '✅', label: 'True/False', color: 'var(--color-status-warning)' },
  { badge: '⚠️', label: 'Error correction', color: 'var(--color-status-danger)' },
  { badge: '🗺️', label: 'In context', color: 'var(--color-mint-strong)' },
  { badge: '🧠', label: 'Multiple choice', color: 'var(--color-purple-strong)' },
  { badge: '🏆', label: 'Results', color: 'var(--color-peach-base,#e07a30)' },
  { badge: '🧩', label: 'Word cloze', color: 'var(--color-purple-base)' },
  { badge: '🎧', label: 'Dictation', color: 'var(--color-mint-strong)' },
  { badge: '✍️', label: 'Write your own', color: 'var(--color-pink-base)' },
  { badge: '💬', label: 'Continue it', color: 'var(--color-pink-strong)' },
];

// 步骤语义索引（对应 STEP_CONFIG_ZH/EN 的固定顺序）
const PS_INTRO = 0, PS_SORT = 1, PS_FILL1 = 2, PS_FILL2 = 3, PS_MORPH = 4, PS_JUDGE = 5, PS_ERR = 6, PS_SCENARIO = 7, PS_QUIZ = 8, PS_SCORE = 9, PS_CLOZE = 10, PS_DICTATION = 11, PS_IMITATE = 12, PS_CONTINUE = 13;

function ComprehensivePractice({ card, onBack, onComplete }: { card: GrammarCard; onBack: () => void; onComplete: () => void }) {
  const C = useC();
  const { lang } = useLang();
  const [step, setStep] = React.useState(0);

  // 数据源分支：P1 用精心设计的模块常量；其他 part 优先派生本 part 专属题；
  // 派生不出内容但带已审选择题（specialQuiz）的空壳 part 走 quiz-only（只做本 part 选择题，
  // 不回落 P1 无关常量）；真正空的极端兜底才回 P1 常量避免白屏。
  const authored = card.practiceGroups;
  // 空壳 part（l11 无素材）需要本 part 的 l01-l10 兄弟卡聚合派生（Path B）；
  // 仿写/续写也从兄弟课取真实语法点（例句所属课的 title）。P1 走常量、不需要。
  // 兄弟卡有缓存，命中几乎零开销。
  const [siblings, setSiblings] = React.useState<GrammarCard[]>([]);
  React.useEffect(() => {
    if (card.partNumber === 1) return;
    let cancelled = false;
    loadPartCards(`p${card.partNumber}`).then(cards => {
      if (!cancelled) setSiblings(cards.filter(c => c.id !== card.id));
    });
    return () => { cancelled = true; };
  }, [card]);

  // 离线题库（l11 本卡）：听写命中优先；仿写/续写命中优先（否则回落兄弟课派生）
  const [bankEntry, setBankEntry] = React.useState<GrammarBankEntry | null>(null);
  React.useEffect(() => {
    let cancelled = false;
    loadGrammarBankPart(card.partNumber).then(f => { if (!cancelled) setBankEntry(getBankEntry(f, card.id)); });
    return () => { cancelled = true; };
  }, [card.id, card.partNumber]);

  const derived = React.useMemo(
    () => (card.partNumber === 1 ? undefined : derivePracticeGroups(card, siblings)),
    [card, siblings],
  );
  const derivedHasData = !!(derived && ((derived.sort?.length ?? 0) + (derived.judge?.length ?? 0) + (derived.err?.length ?? 0) + (derived.scenario?.length ?? 0) + (derived.cloze?.length ?? 0) > 0));
  const isDerived = !authored && derivedHasData;
  const hasQuiz = !!card.specialQuiz;
  const quizOnly = !authored && !derivedHasData && card.partNumber !== 1 && hasQuiz;

  let sortData: PracticeGroups['sort'], fill1Data: PracticeGroups['fill1'], fill2Data: PracticeGroups['fill2'];
  let morphData: PracticeGroups['morph'], judgeData: PracticeGroups['judge'], errData: PracticeGroups['err'];
  let scenarioData: PracticeGroups['scenario'], clozeData: PracticeGroups['cloze'], dictationData: PracticeGroups['dictation'];
  if (authored) {
    ({ sort: sortData, fill1: fill1Data, fill2: fill2Data, morph: morphData, judge: judgeData, err: errData, scenario: scenarioData, cloze: clozeData, dictation: dictationData } = authored);
  } else if (derivedHasData) {
    sortData = derived!.sort; judgeData = derived!.judge; errData = derived!.err; scenarioData = derived!.scenario; clozeData = derived!.cloze; dictationData = derived!.dictation;
    // 派生模式无助词填空①②/变形（P1 专属），对应 step 自动跳过；词块填空由 clozeData 驱动
  } else if (quizOnly) {
    // 仅本 part 已审选择题，其余题型留空，对应 step 自动跳过
  } else {
    sortData = SORT_Q; fill1Data = FILL3_DATA; fill2Data = FILL4_DATA; morphData = MORPH_DATA; judgeData = JUDGE_DATA as PracticeGroups['judge']; errData = ERR_DATA;
  }
  // 听写：题库命中优先（全新句，最受益于新鲜内容），否则用派生/常量
  if (bankEntry?.dictation?.length) dictationData = bankEntry.dictation;

  // 仿写/续写：l11 是综合练习卡，其题库 grammarPoint 是「综合练习N」不适合当目标语法标签，
  // 故 l11 仍走兄弟课派生（用兄弟课真实 title 当目标语法点）。题库仅供 l11 听写换新。
  const imitateSib = siblings.find(c => c.cardExamples?.length);
  const continueSib = siblings.find(c => c.scenarios?.length);
  const imitateStem = imitateSib?.cardExamples[0];
  const continueStem = continueSib?.scenarios[0];

  // 仅记正确数；max 值从数据实时派生（避免 useState 初始化时数据未就绪导致分母恒 0）
  const [scores, setScores] = React.useState({
    sort: 0, fill3: 0, fill4: 0, morph: 0, judge: 0, err: 0,
    scenario: 0, cloze: 0, quiz: 0, dictation: 0,
    imitate: 0, imitatemax: 0,
    continue: 0, continuemax: 0,
  });
  const scoreMax = {
    sort: sortData?.length ?? 0,
    fill3: fill1Data?.length ?? 0,
    fill4: fill2Data?.length ?? 0,
    morph: morphData?.length ?? 0,
    judge: judgeData?.length ?? 0,
    err: errData?.length ?? 0,
    scenario: scenarioData?.length ?? 0,
    cloze: clozeData?.length ?? 0,
    quiz: card.specialQuiz?.questions.length ?? 0,
    dictation: dictationData?.length ?? 0,
    imitate: scores.imitatemax,
    continue: scores.continuemax,
  };

  // 桌面详情页是 position:fixed 独立滚动容器，翻页要滚它自己（window 无效）
  const scopeRef = React.useRef<HTMLDivElement>(null);
  const scrollTop = React.useCallback(() => {
    scopeRef.current?.scrollTo({ top: 0 });
    window.scrollTo(0, 0);
  }, []);

  const configs = lang === 'en' ? STEP_CONFIG_EN : STEP_CONFIG_ZH;
  const railLabel = t('grammar.part_practice', lang, { n: partLabel(card.partNumber, lang) });
  // 标题随 part 走：用本 part 卡片字段（内容为中文教材，同常规课做法），缺失才回落通用文案
  const practiceTitle = card.title || t('grammar.practice_title', lang);
  const introTitle = card.whatItDoes || t('grammar.practice_intro_title', lang);
  const introDesc = card.whatItDoesBody?.split('\n')[0] || t('grammar.practice_intro_desc', lang);

  // 覆盖考点 / 能力清单：P1 用手写要点，派生 part 用本 part connectionRules
  const p1Coverage: [string, string][] = [
    [t('grammar.p1c_word_order', lang), t('grammar.p1c_word_order_sub', lang)],
    [t('grammar.p1c_formal', lang), t('grammar.p1c_formal_sub', lang)],
    [t('grammar.p1c_polite', lang), t('grammar.p1c_polite_sub', lang)],
    [t('grammar.p1c_topic', lang), t('grammar.p1c_topic_sub', lang)],
    [t('grammar.p1c_object', lang), t('grammar.p1c_object_sub', lang)],
    [t('grammar.p1c_place', lang), t('grammar.p1c_place_sub', lang)],
    [t('grammar.p1c_tense', lang), t('grammar.p1c_tense_sub', lang)],
  ];
  // 考点来源：本卡 connectionRules 优先；空壳 part 本卡为空则聚合兄弟卡（Path B）
  const rulesSource = (card.connectionRules?.length ? card.connectionRules : siblings.flatMap(c => c.connectionRules ?? []));
  const ruleCoverage: [string, string][] = rulesSource
    .map(r => [r.text, r.examples ?? ''] as [string, string])
    .slice(0, 8);
  // 空壳 quiz-only part（连兄弟卡规则都没派生出题）用本 part 已审主题名，别回落 P1 无关考点
  const coverage: [string, string][] = quizOnly
    ? [[card.whatItDoes || card.specialQuiz!.title, '']]
    : isDerived && ruleCoverage.length > 0 ? ruleCoverage : p1Coverage;

  // 动态步骤：intro + 有数据的题型 + score
  type PStep = { badge: string; label: string; en: string; render: () => React.ReactNode };
  const steps: PStep[] = [];
  const pushStep = (idx: number, render: () => React.ReactNode) => {
    steps.push({ badge: configs[idx].badge, label: configs[idx].label, en: STEP_CONFIG_EN[idx].label, render });
  };
  const exerciseCount = [sortData, fill1Data, fill2Data, morphData, judgeData, errData, scenarioData, clozeData, dictationData].filter(d => d?.length).length + (card.specialQuiz ? 1 : 0) + (imitateStem ? 1 : 0) + (continueStem ? 1 : 0);

  pushStep(PS_INTRO, () => (
    <>
      <h2 className="gr-card-h">{introTitle}</h2>
      <p className="gr-card-lede">{introDesc}</p>
      <div style={{ background: 'linear-gradient(135deg, var(--color-pink-soft), var(--color-mint-soft))', borderRadius: 18, padding: 20 }}>
        <div className="gr-card-note-label" style={{ marginBottom: 12 }}>{t('grammar.practice_coverage_title', lang)}</div>
        {coverage.map(([title, sub]) => (
          <div key={title} style={{ background: C.card, borderRadius: 14, padding: '10px 14px', marginBottom: 6 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.ink }}>{title}</div>
            {sub && <div style={{ fontSize: 15, color: C.muted }}>{sub}</div>}
          </div>
        ))}
      </div>
      <div className="gr-card-note" dangerouslySetInnerHTML={{ __html: t('grammar.practice_intro_note', lang, { n: exerciseCount }) }} />
    </>
  ));
  if (sortData?.length) pushStep(PS_SORT, () => (
    <>
      <h2 className="gr-card-h">{t('grammar.practice_sort_title', lang)}</h2>
      <p className="gr-card-lede">{t('grammar.practice_sort_desc', lang)}</p>
      <SortStep data={sortData} onScore={s => setScores(prev => ({ ...prev, sort: s.correct }))} />
    </>
  ));
  if (clozeData?.length) pushStep(PS_CLOZE, () => (
    <>
      <h2 className="gr-card-h">{t('grammar.practice_cloze_title', lang)}</h2>
      <p className="gr-card-lede">{t('grammar.practice_cloze_desc', lang)}</p>
      <FillStep data={clozeData} onScore={s => setScores(prev => ({ ...prev, cloze: s.correct }))} />
    </>
  ));
  if (fill1Data?.length) pushStep(PS_FILL1, () => (
    <>
      <h2 className="gr-card-h">{t('grammar.practice_fill1_title', lang)}</h2>
      <p className="gr-card-lede">{t('grammar.practice_fill1_desc', lang)}</p>
      <FillStep data={fill1Data} onScore={s => setScores(prev => ({ ...prev, fill3: s.correct }))} />
    </>
  ));
  if (fill2Data?.length) pushStep(PS_FILL2, () => (
    <>
      <h2 className="gr-card-h">{t('grammar.practice_fill2_title', lang)}</h2>
      <p className="gr-card-lede">{t('grammar.practice_fill2_desc', lang)}</p>
      <FillStep data={fill2Data} onScore={s => setScores(prev => ({ ...prev, fill4: s.correct }))} />
    </>
  ));
  if (morphData?.length) pushStep(PS_MORPH, () => (
    <>
      <h2 className="gr-card-h">{t('grammar.practice_morph_title', lang)}</h2>
      <p className="gr-card-lede">{t('grammar.practice_morph_desc', lang)}</p>
      <MorphStep data={morphData} onScore={s => setScores(prev => ({ ...prev, morph: s.correct }))} />
    </>
  ));
  if (judgeData?.length) pushStep(PS_JUDGE, () => (
    <>
      <h2 className="gr-card-h">{t('grammar.practice_judge_title', lang)}</h2>
      <p className="gr-card-lede">{t('grammar.practice_judge_desc', lang)}</p>
      <JudgeStep data={judgeData} onScore={s => setScores(prev => ({ ...prev, judge: s.correct }))} />
    </>
  ));
  if (errData?.length) pushStep(PS_ERR, () => (
    <>
      <h2 className="gr-card-h">{t('grammar.practice_error_title', lang)}</h2>
      <p className="gr-card-lede">{t('grammar.practice_error_desc', lang)}</p>
      <ErrStep data={errData} onScore={s => setScores(prev => ({ ...prev, err: s.correct }))} />
    </>
  ));
  if (scenarioData?.length) pushStep(PS_SCENARIO, () => (
    <>
      <h2 className="gr-card-h">{t('grammar.practice_scenario_title', lang)}</h2>
      <p className="gr-card-lede">{t('grammar.practice_scenario_desc', lang)}</p>
      <ScenarioStep data={scenarioData} onScore={s => setScores(prev => ({ ...prev, scenario: s.correct }))} />
    </>
  ));
  if (card.specialQuiz) pushStep(PS_QUIZ, () => (
    <SpecialQuizStep quiz={card.specialQuiz!} onScore={s => setScores(prev => ({ ...prev, quiz: s.correct }))} />
  ));
  if (dictationData?.length) pushStep(PS_DICTATION, () => (
    <>
      <h2 className="gr-card-h">{t('grammar.section_dictation', lang)}</h2>
      <p className="gr-card-lede">{t('grammar.section_dictation_desc', lang)}</p>
      <DictationStep data={dictationData} onScore={s => setScores(prev => ({ ...prev, dictation: s.correct }))} />
    </>
  ));
  if (imitateStem && imitateSib) pushStep(PS_IMITATE, () => (
    <>
      <h2 className="gr-card-h">{t('grammar.section_imitate', lang)}</h2>
      <p className="gr-card-lede">{t('grammar.section_imitate_desc', lang)}</p>
      <GrammarWriteExercise
        mode="imitate"
        grammarPoint={imitateSib.title}
        whatItDoes={imitateSib.whatItDoes}
        stem={{ ko: imitateStem.wordBlocks.map(wb => wb.text).join(' '), zh: imitateStem.zh }}
        lang={lang}
        onScore={s => setScores(prev => ({ ...prev, imitate: s.correct, imitatemax: s.total }))}
      />
    </>
  ));
  if (continueStem && continueSib) pushStep(PS_CONTINUE, () => (
    <>
      <h2 className="gr-card-h">{t('grammar.section_continue', lang)}</h2>
      <p className="gr-card-lede">{t('grammar.section_continue_desc', lang)}</p>
      <GrammarWriteExercise
        mode="continue"
        grammarPoint={continueSib.title}
        whatItDoes={continueSib.whatItDoes}
        stem={{ ko: continueStem.ko, zh: continueStem.zh, context: continueStem.context }}
        lang={lang}
        onScore={s => setScores(prev => ({ ...prev, continue: s.correct, continuemax: s.total }))}
      />
    </>
  ));
  const scoreItems = [
    { label: t('grammar.practice_score_sort', lang), correct: scores.sort, max: scoreMax.sort },
    { label: t('grammar.practice_score_cloze', lang), correct: scores.cloze, max: scoreMax.cloze },
    { label: t('grammar.practice_score_fill1', lang), correct: scores.fill3, max: scoreMax.fill3 },
    { label: t('grammar.practice_score_fill2', lang), correct: scores.fill4, max: scoreMax.fill4 },
    { label: t('grammar.practice_score_morph', lang), correct: scores.morph, max: scoreMax.morph },
    { label: t('grammar.practice_score_judge', lang), correct: scores.judge, max: scoreMax.judge },
    { label: t('grammar.practice_score_err', lang), correct: scores.err, max: scoreMax.err },
    { label: t('grammar.practice_score_scenario', lang), correct: scores.scenario, max: scoreMax.scenario },
    { label: t('grammar.practice_score_correct', lang), correct: scores.quiz, max: scoreMax.quiz },
    { label: t('grammar.practice_score_dictation', lang), correct: scores.dictation, max: scoreMax.dictation },
    { label: t('grammar.practice_score_write', lang), correct: scores.imitate + scores.continue, max: scoreMax.imitate + scoreMax.continue },
  ].filter(it => it.max > 0);
  const abilities = (isDerived && ruleCoverage.length > 0) || quizOnly
    ? coverage.map(([title]) => title)
    : undefined;
  pushStep(PS_SCORE, () => <ScoreStep onComplete={onComplete} items={scoreItems} abilities={abilities} showNextHint={card.partNumber === 1} />);

  const total = steps.length;
  const safeStep = Math.min(step, total - 1);
  const cur = steps[safeStep];
  const isScore = safeStep === total - 1;
  const progress = ((safeStep + 1) / total) * 100;
  const scoreTotal = scores.sort + scores.cloze + scores.fill3 + scores.fill4 + scores.morph + scores.judge + scores.err + scores.scenario + scores.quiz + scores.dictation + scores.imitate + scores.continue;
  const scoreTotalMax = scoreMax.sort + scoreMax.cloze + scoreMax.fill3 + scoreMax.fill4 + scoreMax.morph + scoreMax.judge + scoreMax.err + scoreMax.scenario + scoreMax.quiz + scoreMax.dictation + scoreMax.imitate + scoreMax.continue;

  return (
    <div ref={scopeRef} className={`gr-scope gr-card-scope${isScore ? ' is-done' : ''}`}>
      {/* 顶部进度导航（移动端；桌面隐藏，由左栏承载） */}
      <div className="gr-card-topbar">
        <button onClick={onBack} className="gr-card-back" aria-label={t('ui.ph_back', lang)}><ArrowLeft size={18} /></button>
        <div className="gr-card-topinfo">
          <div className="gr-card-topline">
            <span className="gr-card-toptitle">{practiceTitle}</span>
            <span className="gr-card-topcount">{safeStep + 1} / {total}</span>
          </div>
          <div className="gr-card-progress">
            <div className="gr-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="gr-card-layout">
        {/* 左侧导航栏（仅桌面显示） */}
        <aside className="gr-card-rail">
          <button onClick={onBack} className="gr-rail-back">
            <ArrowLeft size={16} /> {t('ui.ph_back', lang)}
          </button>
          <div>
            <div className="gr-rail-label">{railLabel}</div>
            <div className="gr-rail-focus">{practiceTitle}</div>
            <div className="gr-rail-title">{t('grammar.wrap_up', lang)}</div>
          </div>
          <div>
            <div className="gr-rail-progress-top">
              <span className="l">{t('grammar.progress', lang)}</span>
              <span className="gr-card-topcount">{safeStep + 1} / {total}</span>
            </div>
            <div className="gr-card-progress">
              <div className="gr-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <nav className="gr-rail-steps">
            {steps.map((s, i) => {
              const state = i === safeStep ? 'active' : i < safeStep ? 'done' : 'todo';
              return (
                <button
                  key={i}
                  onClick={() => { setStep(i); scrollTop(); }}
                  className={`gr-rail-step ${state}`}
                  aria-current={i === safeStep ? 'step' : undefined}
                >
                  <span className="gr-rail-step-num">{i < safeStep ? '✓' : String(i + 1).padStart(2, '0')}</span>
                  <span className="gr-rail-step-text">
                    <span className="gr-rail-step-label">{s.label}</span>
                    <span className="gr-rail-step-en">{s.en}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* 内容区（右栏） */}
        <div className="gr-card-body">
          {/* 主区抬头：eyebrow → 大标题 → meta（仅桌面显示） */}
          <header className="gr-card-lead">
            <div className="gr-lead-eyebrow">{railLabel}</div>
            <h1 className="gr-lead-title">{practiceTitle}</h1>
            <div className="gr-lead-meta">
              <span className="gr-lead-step">{cur.badge} {cur.label}</span>
              <span className="gr-lead-count">{String(safeStep + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            </div>
          </header>

          {/* 步骤标签（移动端保留，桌面隐藏——抬头已承载） */}
          <span className="gr-card-badge">{cur.badge} {cur.label}</span>

          <div className="gr-card-panel">
            {steps.map((s, i) => (
              <div key={i} style={{ display: i === safeStep ? 'block' : 'none' }}>
                {s.render()}
              </div>
            ))}
          </div>

          {/* 底部翻页导航 */}
          {!isScore && (
            <div className="gr-card-nav">
              {safeStep > 0 && (
                <button onClick={() => { setStep(safeStep - 1); scrollTop(); }} className="gr-nav-prev">{t('grammar.nav_prev_page', lang)}</button>
              )}
              <button onClick={() => { setStep(safeStep + 1); scrollTop(); }} className="gr-nav-next">
                {safeStep === total - 2 ? t('grammar.nav_see_result', lang) : t('grammar.nav_next_page', lang)}
              </button>
            </div>
          )}
        </div>

        {/* 右侧常驻速查面板（仅桌面 ≥1280px） */}
        <aside className="gr-card-cheat">
          <div className="gr-cheat-label">{t('grammar.chapter_title', lang, { title: card.title })}</div>
          <div className="gr-cheat-block">
            <div className="gr-cheat-head">{t('grammar.chapter_covered', lang)}</div>
            <ul className="gr-cheat-points">
              {coverage.map(([title, sub]) => (
                <li key={title} className="gr-cheat-point">{title}{sub && <span style={{ color: 'var(--hr-ink-4)', marginLeft: 6 }}>{sub}</span>}</li>
              ))}
            </ul>
          </div>
          {scoreTotalMax > 0 && (
            <div className="gr-cheat-block">
              <div className="gr-cheat-head">{t('grammar.chapter_score', lang)}</div>
              <div className="gr-cheat-formula">
                <span className="gr-cheat-formula-ko">{scoreTotal}<span style={{ fontSize: 15, color: 'var(--hr-ink-3)' }}> / {scoreTotalMax}</span></span>
              </div>
              <div className="gr-cheat-formula-zh">{t('grammar.chapter_correct_sofar', lang)}</div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

// ── ChaptersTab ───────────────────────────────────────────────────────────────

function ChaptersTab({ onOpenCard, isAdmin, refreshTick }: { onOpenCard: (card: GrammarCard) => void; isAdmin: boolean; refreshTick: number }) {
  const { lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const { tier, loading: memLoading, error: memError, retry: retryMembership } = useMembership();
  // 会员内容墙：免费档仅第一章（Part 1）。admin/付费档放行；加载中不锁避免闪。
  const memberLockedFromPart2 = !isAdmin && !memLoading && !isPaidTier(tier);
  const [lessonStates, setLessonStates] = useState<LessonMap>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set([1]));
  const [activeLevel, setActiveLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // 统一打开课程：加载 chunk 期间标记 loadingId，失败给提示（避免静默无反馈）
  const openLesson = async (cardId: string) => {
    if (loadingId) return;
    setLoadingId(cardId);
    try {
      const card = await loadGrammarCard(cardId);
      if (card) onOpenCard(card);
      else showToast(t('grammar.load_error', lang), 'error');
    } catch {
      showToast(t('grammar.load_error', lang), 'error');
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    if (!user?.id) { setIsLoaded(true); return; }
    let cancelled = false;
    loadLessonMap()
      .then(map => { if (!cancelled) setLessonStates(map); })
      .catch((e) => { console.error('Failed to load lesson map:', e); })
      .finally(() => { if (!cancelled) setIsLoaded(true); });
    return () => { cancelled = true; };
  }, [user?.id, refreshTick]);

  const toggle = (partNumber: number) => setExpanded(prev => {
    const next = new Set(prev);
    next.has(partNumber) ? next.delete(partNumber) : next.add(partNumber);
    return next;
  });

  const totalLessons = grammarParts.reduce((sum, p) => sum + p.lessons.length, 0);
  const doneLessons = Object.values(lessonStates).filter(s => isLessonDone(s)).length;

  const [continueCard, setContinueCard] = useState<GrammarCard | null>(null);
  const [continuePartTitle, setContinuePartTitle] = useState('');
  const [query, setQuery] = useState('');

  // 复用的课程行渲染（章节手风琴 + 搜索结果共用）
  const renderLessonRow = (part: GrammarPart, lesson: GrammarPart['lessons'][number]) => {
    const lessonState = lessonStates[lesson.cardId];
    const status: 'done' | 'todo' | 'started' = isLessonDone(lessonState) ? 'done' : lessonState ? 'started' : 'todo';
    const isCurrent = continueCard?.id === lesson.cardId;
    // 会员墙：免费档 Part≥2 锁（点击去定价页），与「未开发 Part>6」的普通锁区分
    const memberLocked = memberLockedFromPart2 && part.partNumber > 1;
    const isLocked = false; // 全 30 章内容已上线；付费边界由 memberLocked 会员墙控制（2026-08-02）
    const isRowLoading = loadingId === lesson.cardId;
    const rowCls = ['gr-lesson-row', status === 'done' ? 'done' : '', isCurrent ? 'current' : '', (isLocked || memberLocked) ? 'locked' : '', isRowLoading ? 'loading' : ''].filter(Boolean).join(' ');
    const activate = () => {
      if (memberLocked) {
        if (memError) { retryMembership(); return; }
        if (!canPurchaseMembership()) { showToast(t('membership.coming_soon_toast', lang)); return; }
        router.push('/membership');
        return;
      }
      if (!isLocked) openLesson(lesson.cardId);
    };
    return (
      <div
        key={lesson.cardId}
        className={rowCls}
        role={isLocked ? undefined : 'button'}
        tabIndex={isLocked ? undefined : 0}
        aria-disabled={isLocked || undefined}
        aria-busy={isRowLoading || undefined}
        onClick={activate}
        onKeyDown={isLocked ? undefined : onActivateKey(activate)}
      >
        <span className="gr-lesson-num">
          {isRowLoading ? <Loader2 size={14} className="gr-spin" /> : isLocked ? <Lock size={12} /> : status === 'done' ? '✓' : isCurrent ? '▶' : lesson.lessonNumber}
        </span>
        <div className="gr-lesson-info">
          <div className="gr-lesson-eyebrow">{t('grammar.lesson_label', lang, { n: String(lesson.lessonNumber) })}</div>
          <p className="gr-lesson-title">{lesson.title}</p>
        </div>
        {!isLocked && status === 'done' && <span className="gr-lesson-badge done">{t('grammar.chapters_status_done', lang)}</span>}
        {!isLocked && isCurrent && status !== 'done' && (
          <button className="gr-lesson-cta" onClick={e => { e.stopPropagation(); openLesson(lesson.cardId); }}>
            {t('grammar.chapters_study_btn', lang)}
          </button>
        )}
        {!isLocked && !isCurrent && status === 'todo' && <span className="gr-lesson-badge todo">{t('grammar.chapters_status_todo', lang)}</span>}
        {isLocked && <span className="gr-lesson-badge coming">{t('grammar.chapters_status_coming', lang)}</span>}
      </div>
    );
  };

  const q = query.trim().toLowerCase();
  const searchResults = q
    ? grammarParts.flatMap(part => part.lessons
        .filter(l => l.title.toLowerCase().includes(q) || part.title.toLowerCase().includes(q))
        .map(lesson => ({ part, lesson })))
    : [];

  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;
    const setCardWithPart = async (cardId: string): Promise<boolean> => {
      const part = grammarParts.find(p => p.lessons.some(l => l.cardId === cardId));
      if (!part) return false;
      const card = await loadGrammarCard(cardId);
      if (!cancelled && card) {
        setContinueCard(card);
        setContinuePartTitle(t('grammar.part_and_title', lang, { part: partLabel(part.partNumber, lang), title: part.title }));
        return true;
      }
      return false;
    };
    (async () => {
      // 优先"最后离开的那一课"（未完成时）——记录用户上次学到哪
      let lastCard: string | null = null;
      try { lastCard = localStorage.getItem('tori:grammar:lastCard'); } catch {}
      if (lastCard && !isLessonDone(lessonStates[lastCard])) {
        if (await setCardWithPart(lastCard)) return;
      }
      // 否则回退到"第一课未完成的课"
      for (const part of grammarParts) {
        for (const lesson of part.lessons) {
          if (isLessonDone(lessonStates[lesson.cardId])) continue;
          if (await setCardWithPart(lesson.cardId)) return;
        }
      }
    })();
    return () => { cancelled = true; };
  }, [isLoaded, lessonStates, isAdmin]);

  return (
    <div className="gr-hub-layout">
    <div className="gr-hub-col">
      {/* Stats */}
      <div className="gr-stats">
        {[
          { n: doneLessons, l: t('grammar.chapters_done_count', lang), cls: 'done' },
          { n: doneLessons > 0 && doneLessons < totalLessons ? 1 : 0, l: t('grammar.chapters_in_progress', lang), cls: 'doing' },
          { n: totalLessons, l: t('grammar.chapters_total', lang), cls: '' },
        ].map(({ n, l, cls }) => (
          <div key={l} className={`gr-stat ${cls}`.trim()}>
            <div className="gr-stat-num">{n}</div>
            <div className="gr-stat-label">{l}</div>
          </div>
        ))}
      </div>

      {/* 整体进度 */}
      <div className="gr-progress-wrap">
        <div className="gr-progress-info">
          <div className="gr-pi-label">{t('grammar.chapters_overall_progress', lang)}</div>
          <div className="gr-pi-text">
            <b>{doneLessons}</b> / {totalLessons} · {continueCard ? continuePartTitle : doneLessons === totalLessons ? t('grammar.chapters_all_done', lang) : t('grammar.chapters_from_part1', lang)}
          </div>
        </div>
        <div className="gr-progress-bar">
          <div className="gr-fill" style={{ width: `${(doneLessons / totalLessons) * 100}%` }} />
        </div>
      </div>

      {/* 继续学习 · hero 纸感卡 */}
      {continueCard && (
        <div
          className="gr-hero"
          role="button"
          tabIndex={0}
          onClick={() => onOpenCard(continueCard!)}
          onKeyDown={onActivateKey(() => onOpenCard(continueCard!))}
        >
          <span className="gr-tape" />
          <div className="gr-hero-label">
            <b>{t('grammar.chapters_continue', lang)}</b> · {t('grammar.chapters_lesson_n', lang, { n: String(continueCard.lessonNumber) })}
          </div>
          <h3 className="gr-hero-title">{continueCard.title}</h3>
          {continueCard.whatItDoes && !continueCard.isPractice && (
            <p className="gr-hero-lede">{continueCard.whatItDoes}</p>
          )}
          <button
            className="gr-hero-cta"
            onClick={e => { e.stopPropagation(); onOpenCard(continueCard!); }}
          >
            {t('grammar.chapters_continue', lang)}
          </button>
        </div>
      )}

      <div className="gr-section-head">
        <h2><em>{t('grammar.chapters_all_parts', lang)}</em></h2>
        <span className="gr-kr">단원 목록</span>
      </div>

      <div className="gr-lib-search">
        <Search size={16} className="gr-lib-icon" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('grammar.search_placeholder', lang)}
        />
        {query && (
          <button className="gr-lib-clear" onClick={() => setQuery('')} aria-label={t('grammar.clear_search', lang)}>
            <X size={14} />
          </button>
        )}
      </div>

      {q ? (
        searchResults.length === 0 ? (
          <div className="gr-lib-empty">
            <p className="gr-empty-title">{t('grammar.search_no_results', lang, { query })}</p>
            <p className="gr-empty-hint">{t('grammar.search_empty', lang)}</p>
          </div>
        ) : (
          <>
            <div className="gr-lib-hint"><b>{searchResults.length}</b> {t('grammar.lesson_count', lang)}</div>
            <div className="gr-lesson-list gr-search-list">
              {searchResults.map(({ part, lesson }) => renderLessonRow(part, lesson))}
            </div>
          </>
        )
      ) : (
      <>
      <div className="gr-level-tabs">
        {([
          { key: 'beginner', label: t('grammar.level_beginner', lang), sub: 'P1–P6' },
          { key: 'intermediate', label: t('grammar.level_intermediate', lang), sub: 'P7–P16' },
          { key: 'advanced', label: t('grammar.level_advanced', lang), sub: 'P17–P30' },
        ] as const).map(lv => (
          <button
            key={lv.key}
            onClick={() => setActiveLevel(lv.key)}
            className={`gr-level-tab${activeLevel === lv.key ? ' active' : ''}`}
          >
            {lv.label}
            <span className="gr-lt-sub">{lv.sub}</span>
          </button>
        ))}
      </div>

      <div className="gr-part-list">
      {grammarParts.filter(part => {
        if (activeLevel === 'beginner') return part.partNumber <= 6;
        if (activeLevel === 'intermediate') return part.partNumber >= 7 && part.partNumber <= 16;
        return part.partNumber >= 17;
      }).map((part, idx) => {
        const isPartLocked = false; // 全 30 章已上线，可自由展开；付费边界由课程行 memberLocked 控制（2026-08-02）
        const isOpen = !isPartLocked && expanded.has(part.partNumber);
        const doneInPart = part.lessons.filter(l => isLessonDone(lessonStates[l.cardId])).length;
        const isActive = doneInPart > 0 && doneInPart < part.lessons.length;
        const isDone = doneInPart === part.lessons.length;
        const displayIdx = idx + 1; // tab 内相对编号（1 起）

        const partCardCls = ['gr-part-card', isDone ? 'done' : '', isActive ? 'active' : '', isPartLocked ? 'locked' : ''].filter(Boolean).join(' ');
        return (
          <div key={part.partNumber} id={`gr-part-${part.partNumber}`} className={partCardCls}>
            <button className="gr-part-head" onClick={() => !isPartLocked && toggle(part.partNumber)}>
              {(isPartLocked || isDone) && (
                <span className="gr-part-num">
                  {isPartLocked ? <Lock size={22} /> : '✓'}
                </span>
              )}
              <div className="gr-part-info">
                <p className="gr-part-title">{t('grammar.part_and_title', lang, { part: partLabel(displayIdx, lang), title: part.title })}</p>
                <p className="gr-part-meta">{isPartLocked ? t('grammar.chapters_status_coming', lang) : t('grammar.part_lesson_count', lang, { n: String(part.lessons.length) }) + (doneInPart > 0 ? t('grammar.part_lessons_done', lang, { done: String(doneInPart), total: String(part.lessons.length) }) : '')}</p>
              </div>
              <div className="gr-part-bar">
                <div className="gr-fill" style={{ width: `${(doneInPart / part.lessons.length) * 100}%` }} />
              </div>
              {!isPartLocked && (
                <span className="gr-part-chev">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
              )}
            </button>

            {isOpen && (
              <div className="gr-lesson-list">
                {part.lessons.map(lesson => renderLessonRow(part, lesson))}
              </div>
            )}
          </div>
        );
      })}
      </div>

      <p className="gr-footer-note">{t('grammar.chapters_total_footer', lang, { n: String(totalLessons) })}</p>
      </>
      )}
    </div>{/* /gr-hub-col */}

    {/* ── 桌面专属右栏（学习进度 + 继续学习，纯功能） ── */}
    {(() => {
      const pct = totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0;
      const R = 33, CIRC = 2 * Math.PI * R;
      return (
        <aside className="gr-hub-rail" aria-label={t('grammar.nav_aria', lang)}>
          <div className="gr-hub-card">
            <div className="gr-hub-card-title"><Star size={13} /> {t('grammar.sidebar_progress_title', lang)}</div>
            <div className="gr-hub-ring-wrap">
              <div className="gr-hub-ring">
                <svg width="78" height="78" viewBox="0 0 78 78">
                  <circle className="gr-hub-ring-track" cx="39" cy="39" r={R} fill="none" strokeWidth="6" />
                  <circle className="gr-hub-ring-fill" cx="39" cy="39" r={R} fill="none" strokeWidth="6"
                    strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - pct / 100)} />
                </svg>
                <div className="gr-hub-ring-num"><b>{pct}%</b><span>DONE</span></div>
              </div>
              <div className="gr-hub-ring-meta">
                {t('grammar.sidebar_progress_desc', lang, { mastered: doneLessons, total: totalLessons })}
              </div>
            </div>
          </div>

          <div className="gr-hub-card">
            <div className="gr-hub-card-title">{t('grammar.sidebar_continue_title', lang)}</div>
            {continueCard ? (
              <div className="gr-hub-tasks">
                <button type="button" className="gr-hub-task"
                  onClick={() => onOpenCard(continueCard)}>
                  <span className="gr-hub-task-icon"><Circle size={18} /></span>
                  <span className="gr-hub-task-body">
                    <span className="gr-hub-task-name">{continueCard.title}</span>
                    {continuePartTitle && <span className="gr-hub-task-kr">{continuePartTitle}</span>}
                  </span>
                  <span className="gr-hub-task-state">{t('grammar.sidebar_continue_btn', lang)} <ChevronRight size={12} style={{ verticalAlign: '-2px' }} /></span>
                </button>
              </div>
            ) : (
              <div className="gr-hub-empty">{t('grammar.sidebar_all_done', lang)}<br />{t('grammar.sidebar_all_done_sub', lang)}</div>
            )}
          </div>

          <div className="gr-hub-card gr-hub-parts-card">
            <div className="gr-hub-card-title">{t('grammar.sidebar_all_parts', lang, { n: grammarParts.length })}</div>
            <div className="gr-hub-parts-list">
              {grammarParts.map((part) => {
                const locked = false; // 全 30 章已上线（2026-08-02）
                const doneN = part.lessons.filter(l => isLessonDone(lessonStates[l.cardId])).length;
                const totalN = part.lessons.length;
                const full = totalN > 0 && doneN === totalN;
                const numLabel = partLabel(part.partNumber, lang);
                const level: 'beginner' | 'intermediate' | 'advanced' = part.partNumber <= 6 ? 'beginner' : part.partNumber <= 16 ? 'intermediate' : 'advanced';
                const jump = () => {
                  if (locked) return;
                  setActiveLevel(level);
                  setExpanded(prev => new Set(prev).add(part.partNumber));
                  setTimeout(() => {
                    document.getElementById(`gr-part-${part.partNumber}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 60);
                };
                const cls = ['gr-hub-part', full ? 'done' : '', locked ? 'locked' : ''].filter(Boolean).join(' ');
                return (
                  <button key={part.partNumber} type="button" className={cls}
                    onClick={jump} disabled={locked} title={part.title}>
                    <span className="gr-hub-part-num">{locked ? <Lock size={12} /> : full ? <CheckCircle2 size={15} /> : numLabel}</span>
                    <span className="gr-hub-part-body">
                      <span className="gr-hub-part-name">{part.title}</span>
                      <span className="gr-hub-part-sub">{locked ? t('grammar.sidebar_coming_soon', lang) : t('grammar.sidebar_lesson_count', lang, { n: doneN, total: totalN })}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      );
    })()}
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
  const { lang } = useLang();
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
          {[{ n: learnedCount, l: t('grammar.stat_mastered', lang), c: 'var(--color-mint-strong)' }, { n: learningCount, l: t('grammar.stat_learning', lang), c: C.pink }, { n: difficultCount, l: t('grammar.stat_difficult', lang), c: 'var(--color-ink-3)' }].map(({ n, l, c }, i, arr) => (
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
        <div style={{ background: 'linear-gradient(135deg, var(--hr-peach-soft), var(--hr-pink-soft))', border: '1.5px solid var(--hr-peach-soft)', borderRadius: 20, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 16 }}>✨</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{t('grammar.review_needed', lang)}</span>
            <span style={{ fontSize: 15, color: C.muted }}>{t('grammar.review_count', lang, { n: String(reviewPatterns.length) })}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            {reviewPatterns.slice(0, 4).map(gp => (
              <button key={gp.id} onClick={() => onStartGrammar(gp)} style={{ padding: '6px 12px', borderRadius: 8, background: C.card, border: `1px solid ${C.line}`, fontSize: 16, color: C.ink, cursor: 'pointer' }}>
                {gp.displayTitle}
              </button>
            ))}
          </div>
          <button onClick={() => onStartReview(reviewPatterns)} style={{ width: '100%', padding: '10px 0', background: 'var(--hr-peach-soft)', border: '1px solid var(--hr-peach-soft)', borderRadius: 12, fontSize: 15, fontWeight: 600, color: 'var(--color-ink-3)', cursor: 'pointer' }}>
            {t('grammar.review_btn', lang, { n: reviewPatterns.length })}
          </button>
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, var(--hr-pink-soft), var(--hr-purple-soft))', border: '1.5px solid var(--hr-pink-soft)', borderRadius: 24, padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 16 }}>🎯</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{t('grammar.today_pattern', lang)}</span>
          <span style={{ fontSize: 15, color: C.muted, marginLeft: 'auto' }}>{t('grammar.today_duration', lang)}</span>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <p style={{ fontSize: 15, color: C.muted, marginBottom: 4 }}>{t('grammar.today_learn', lang)}</p>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: C.ink, margin: 0 }}>{todayPattern.displayTitle}</h2>
          <p style={{ fontSize: 16, color: C.muted, fontFamily: 'monospace', marginTop: 4 }}>{todayPattern.pattern}</p>
        </div>
        <p style={{ fontSize: 16, color: C.muted, marginBottom: 14 }}>{todayPattern.functionZh}</p>
        <button onClick={() => onStartGrammar(todayPattern)} style={{ width: '100%', padding: '13px 0', borderRadius: 14, background: C.pink, color: '#fff', fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
          {t('grammar.today_start', lang)}
        </button>
      </div>

      {recommended.length > 0 && (
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 8 }}>{t('grammar.recommended', lang)}</p>
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
      <mark style={{ background: 'var(--hr-pink-soft)', color: 'var(--color-status-danger)', borderRadius: 3, padding: '0 1px', fontWeight: 700 }}>{matched}</mark>
      {after}
    </>
  );
}

function LibraryTab({ onStartGrammar }: { onStartGrammar: (gp: GrammarPoint) => void }) {
  const { lang } = useLang();
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.id) { setFavorites([]); return; }
    let cancelled = false;
    db.grammarFavorites.toArray()
      .then(rows => { if (!cancelled) setFavorites(rows.map(r => r.id)); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [user?.id]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const isRemoving = prev.includes(id);
      const next = isRemoving ? prev.filter(x => x !== id) : [...prev, id];
      if (isRemoving) {
        db.grammarFavorites.delete(id).catch(() => {
          setFavorites(p => p.includes(id) ? p : [...p, id]); // 回滚
        });
      } else {
        db.grammarFavorites.put({ id, createdAt: Date.now() }).catch(() => {
          setFavorites(p => p.filter(x => x !== id)); // 回滚
        });
      }
      return next;
    });
  };

  const categories = ['조사', '어미', '연결', '시제', '존대', '문형', '인용', '사동/피동'];
  const categoryLabels: Record<string, string> = {
    '조사': t('grammar.cat_조사', lang), '어미': t('grammar.cat_어미', lang), '연결': t('grammar.cat_연결', lang),
    '시제': t('grammar.cat_시제', lang), '존대': t('grammar.cat_존대', lang), '문형': t('grammar.cat_문형', lang),
    '인용': t('grammar.cat_인용', lang), '사동/피동': t('grammar.cat_사동피동', lang),
  };
  const levelConfig: Record<string, { label: string; bg: string; color: string }> = {
    beginner:     { label: t('grammar.level_beginner', lang), bg: 'var(--color-mint-soft)', color: 'var(--color-mint-strong)' },
    intermediate: { label: t('grammar.level_intermediate', lang), bg: 'var(--color-pink-soft)', color: 'var(--color-pink-base)' },
    advanced:     { label: t('grammar.level_advanced', lang), bg: 'var(--color-purple-soft)', color: 'var(--color-purple-base)' },
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
    <div className="gr-hub-layout">
    <div className="gr-hub-col">
      {/* 统计条 */}
      <div className="gr-lib-topbar">
        <span className="gr-lib-total"><b>{grammarPoints.length}</b>{t('grammar.library_count', lang, { n: '' }).trim()}</span>
        {(['beginner', 'intermediate', 'advanced'] as const).map(lv => (
          <button
            key={lv}
            onClick={() => { setActiveLevel(activeLevel === lv ? 'all' : lv); setShowFavorites(false); }}
            className={`gr-lib-chip ${activeLevel === lv ? `active ${lv}` : ''}`.trim()}
          >
            {levelConfig[lv].label} {counts[lv]}
          </button>
        ))}
        <button
          onClick={() => { setShowFavorites(f => !f); setActiveLevel('all'); }}
          className={`gr-lib-chip fav${showFavorites ? ' active' : ''}`}
        >
          <Star size={11} fill={showFavorites ? 'currentColor' : 'none'} />
          {t('grammar.favorites', lang)} {favorites.length > 0 ? favorites.length : ''}
        </button>
      </div>

      {/* 搜索框 */}
      <div className="gr-lib-search">
        <Search size={16} className="gr-lib-icon" />
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={t('grammar.library_search_placeholder', lang)}
        />
        {searchQuery && (
          <button className="gr-lib-clear" onClick={() => setSearchQuery('')}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* 分类筛选 */}
      <div className="gr-lib-cats">
        <button
          onClick={() => setActiveCategory('all')}
          className={`gr-lib-cat${activeCategory === 'all' ? ' active' : ''}`}
        >
          {t('grammar.library_all', lang)}
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`gr-lib-cat${activeCategory === cat ? ' active' : ''}`}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {/* 结果数 / 空状态 */}
      {filtered.length === 0 ? (
        <div className="gr-lib-empty">
          <p className="gr-empty-title">
            {showFavorites ? t('grammar.library_no_favorites', lang) : t('grammar.library_no_results', lang, { query: searchQuery })}
          </p>
          <p className="gr-empty-hint">{showFavorites ? t('grammar.library_no_favorites_hint', lang) : t('grammar.library_no_results_hint', lang)}</p>
        </div>
      ) : (
        <div className="gr-lib-hint"><b>{filtered.length}</b> {t('grammar.library_results', lang, { n: '' }).trim()}</div>
      )}

      {/* 列表 */}
      <div className="gr-lib-list">
        {filtered.map((gp: LegacyPoint) => {
          const isOpen = expandedId === gp.id;
          const lv = levelConfig[gp.level] || levelConfig.beginner;
          const isFav = favorites.includes(gp.id);
          const matchedLesson = findLessonForPoint(gp, allLessons);
          return (
            <div key={gp.id} className={`gr-lib-item${isOpen ? ' open' : ''}`}>
              <div className="gr-lib-head">
                <button className="gr-lib-head-btn" onClick={() => setExpandedId(isOpen ? null : gp.id)}>
                  <span className={`gr-lib-level ${gp.level}`}>{lv.label}</span>
                  <div className="gr-lib-head-body">
                    <p className="gr-lib-head-title">{gp.title}</p>
                    <p className="gr-lib-head-sub">
                      <span className="gr-lib-pattern">{gp.pattern}</span>
                      {' · '}{gp.topik}
                    </p>
                  </div>
                  {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                </button>
                <button
                  onClick={e => toggleFavorite(gp.id, e)}
                  className={`gr-lib-fav${isFav ? ' on' : ''}`}
                  aria-label="favorite"
                >
                  <Star size={15} fill={isFav ? 'currentColor' : 'none'} />
                </button>
              </div>

              {isOpen && (
                <div className="gr-lib-body">
                  <div className="gr-lib-def">
                    {[
                      { l: t('grammar.def_structure', lang), v: gp.pattern, mono: true },
                      { l: t('grammar.def_meaning', lang), v: gp.explanation, mono: false },
                      ...(gp.conjugation ? [{ l: t('grammar.def_conjugation', lang), v: gp.conjugation, mono: false }] : []),
                      { l: t('grammar.def_usage', lang), v: gp.usage, mono: false },
                    ].map(item => (
                      <div key={item.l} className="gr-lib-def-row">
                        <span className="gr-lib-def-label">{item.l}</span>
                        <span className={`gr-lib-def-val${item.mono ? ' mono' : ''}`}>{item.v}</span>
                      </div>
                    ))}
                  </div>

                  {gp.examples.length > 0 && (
                    <div>
                      <div className="gr-lib-ex-head"><b>{gp.examples.length}</b> {t('grammar.library_example_count', lang)}</div>
                      <div className="gr-lib-examples">
                        {gp.examples.map((ex, i) => (
                          <div key={i} className="gr-lib-example">
                            <div className="gr-lib-ex-body">
                              <p className="gr-lib-ex-ko">{highlightPattern(ex.ko, gp.pattern)}</p>
                              <p className="gr-lib-ex-zh">{ex.zh}</p>
                              {ex.note && <p className="gr-lib-ex-note">💡 {ex.note}</p>}
                            </div>
                            <button className="gr-lib-ex-play" onClick={e => { e.stopPropagation(); speak(ex.ko); }} aria-label="play">
                              <Volume2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {gp.toriTip && (
                    <div className="gr-lib-tip">
                      <div className="gr-lib-tip-head"><Lightbulb size={11} />{t('grammar.library_practice_tip', lang)}</div>
                      <div className="gr-lib-tip-body">{gp.toriTip}</div>
                    </div>
                  )}

                  {gp.difference && gp.similarPatterns && (
                    <div className="gr-lib-diff">
                      <AlertCircle size={14} className="gr-lib-diff-icon" />
                      <div>
                        <div className="gr-lib-diff-head">{t('grammar.library_difference', lang, { patterns: gp.similarPatterns.join(', ') })}</div>
                        <div className="gr-lib-diff-body">{gp.difference}</div>
                      </div>
                    </div>
                  )}

                  <div className="gr-lib-actions">
                    {matchedLesson && (
                      <button className="gr-lib-action go-lesson" onClick={() => router.push(`/grammar?card=${matchedLesson.cardId}`)}>
                        {t('grammar.library_go_lesson', lang)}
                      </button>
                    )}
                    {(() => {
                      const sp = sentencePatterns.find(p => p.id === gp.id);
                      return sp ? (
                        <button className="gr-lib-action practice" onClick={() => onStartGrammar(sp)}>
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
    </div>{/* /gr-hub-col */}

    {/* ── 桌面专属右栏（词库统计 + 分类导航） ── */}
    <aside className="gr-hub-rail" aria-label={t('grammar.library_nav_aria', lang)}>
      <div className="gr-hub-card">
        <div className="gr-hub-card-title"><Star size={13} /> {t('grammar.library_stats', lang)}</div>
        <div className="gr-lib-rail-stats">
          <div className="gr-lib-rail-total">
            <b>{grammarPoints.length}</b>
            <span>{t('grammar.pattern_count', lang)}</span>
          </div>
          <div className="gr-lib-rail-levels">
            {(['beginner', 'intermediate', 'advanced'] as const).map(lv => (
              <button
                key={lv}
                className={`gr-lib-rail-level ${lv}${activeLevel === lv ? ' active' : ''}`}
                onClick={() => { setActiveLevel(activeLevel === lv ? 'all' : lv); setShowFavorites(false); }}
              >
                <span className="gr-lib-rail-level-num">{counts[lv]}</span>
                <span className="gr-lib-rail-level-label">{levelConfig[lv].label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="gr-hub-card gr-hub-parts-card">
        <div className="gr-hub-card-title">{t('grammar.category_nav', lang)}</div>
        <div className="gr-hub-parts-list">
          <button
            className={`gr-hub-part${activeCategory === 'all' ? ' done' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <span className="gr-hub-part-num">{t('grammar.all', lang)}</span>
            <span className="gr-hub-part-body">
              <span className="gr-hub-part-name">{t('grammar.library_all', lang)}</span>
              <span className="gr-hub-part-sub">{t('grammar.item_count', lang, { n: String(grammarPoints.length) })}</span>
            </span>
          </button>
          {categories.map(cat => {
            const n = grammarPoints.filter(g => g.category === cat).length;
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                className={`gr-hub-part${active ? ' done' : ''}`}
                onClick={() => setActiveCategory(cat)}
                title={cat}
              >
                <span className="gr-hub-part-num">{(categoryLabels[cat] || cat).slice(0, 1)}</span>
                <span className="gr-hub-part-body">
                  <span className="gr-hub-part-name">{categoryLabels[cat] || cat}</span>
                  <span className="gr-hub-part-sub">{t('grammar.item_count', lang, { n: String(n) })}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

function GrammarContent() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const { lang } = useLang();
  const router = useRouter();
  const smartBack = useSmartBack('/learning');
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const isAdmin = user?.role === 'admin';
  const [tab, setTab] = useState<Tab>('chapters');
  const [grammarStates, setGrammarStates] = useState<Record<string, UserGrammarState>>({});
  const [sessionGrammar, setSessionGrammar] = useState<GrammarPoint | null>(null);
  const [reviewQueue, setReviewQueue] = useState<GrammarPoint[]>([]);
  const [activeCard, setActiveCard] = useState<GrammarCard | null>(null);
  const [chaptersRefreshTick, setChaptersRefreshTick] = useState(0);
  const savedScrollY = useRef(0);
  const openCard = (card: GrammarCard) => {
    savedScrollY.current = window.scrollY;
    try { localStorage.setItem('tori:grammar:lastCard', card.id); } catch {}
    setActiveCard(card);
  };
  const closeCard = () => {
    setActiveCard(null);
    // 关卡片时刷一次 ChaptersTab —— 因为用户可能走到最后一步（已经写入 markLessonDone）后直接返回而没点"完成"按钮
    setChaptersRefreshTick(t => t + 1);
    requestAnimationFrame(() => window.scrollTo(0, savedScrollY.current));
  };

  useEffect(() => {
    let cancelled = false;
    db.userGrammarStates.toArray().then(states => {
      if (cancelled) return;
      const map: Record<string, UserGrammarState> = {};
      for (const s of states) map[s.id] = s;
      setGrammarStates(map);
    }).catch((err) => console.error('IndexedDB error:', err));
    return () => { cancelled = true; };
  }, [user?.id]);

  // 手机用户重定向到 v2（原生化版本）。桌面/平板横屏保留 v1。
  useEffect(() => {
    const isDesktop = window.innerWidth > window.innerHeight && window.innerWidth >= 1024;
    if (!isDesktop) {
      const qs = searchParams.toString();
      router.replace(qs ? `/grammar-v2?${qs}` : '/grammar-v2');
    }
  }, []);

  useEffect(() => {
    const patternParam = searchParams.get('pattern');
    if (patternParam) {
      const gp = sentencePatterns.find(g => g.id === patternParam);
      if (gp) setSessionGrammar(gp);
    }
    const cardParam = searchParams.get('card');
    if (cardParam) {
      let cancelled = false;
      loadGrammarCard(cardParam).then(card => {
        if (cancelled || !card) return;
        setTab('chapters'); openCard(card);
      });
      return () => { cancelled = true; };
    }
  }, [searchParams]);

  // 自动恢复到上次学习的那一课详情画面（无深链接参数时）
  const didRestore = useRef(false);
  useEffect(() => {
    if (didRestore.current) return;
    didRestore.current = true;
    if (searchParams.get('card') || searchParams.get('pattern')) return;
    let last: string | null = null;
    try { last = localStorage.getItem('tori:grammar:lastCard'); } catch {}
    if (!last) return;
    loadGrammarCard(last).then(card => {
      if (card) { setTab('chapters'); openCard(card); }
    }).catch(() => {});
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
    }).catch((err) => console.error('IndexedDB error:', err));
    setSessionGrammar(null);
    setReviewQueue([]);
  };

  const handleCompleteCard = async (card: GrammarCard) => {
    if (!user?.id) {
      showToast(t('grammar.login_required_toast', lang), 'error');
      router.push('/auth/login?redirect=/grammar');
      return;
    }
    try {
      await markLessonDone(card.id);
      setChaptersRefreshTick(t => t + 1);
    } catch (e) {
      console.warn('Failed to save lesson state:', e);
      showToast(t('grammar.save_error', lang), 'error');
    }

    try {
      const next = await loadNextCard(card.id);
      if (next) {
        try { localStorage.setItem('tori:grammar:lastCard', next.id); } catch {}
        setActiveCard(next);
        window.scrollTo(0, 0);
      } else {
        setActiveCard(null);
      }
    } catch (e) {
      console.warn('Failed to load next card:', e);
      setActiveCard(null);
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
    if (activeCard.isPractice) {
      return (
        <ColorCtx.Provider value={C}>
          <ComprehensivePractice
            card={activeCard}
            onBack={closeCard}
            onComplete={() => handleCompleteCard(activeCard)}
          />
        </ColorCtx.Provider>
      );
    }
    return (
      <ColorCtx.Provider value={C}>
        <GrammarCardView
          key={activeCard.id}
          card={activeCard}
          partTitle={part ? t('grammar.part_and_title', lang, { part: partLabel(part.partNumber, lang), title: part.title }) : ''}
          totalInPart={part?.lessons.length ?? 10}
          onBack={closeCard}
          onComplete={() => handleCompleteCard(activeCard)}
          onStartGrammar={gp => { closeCard(); setSessionGrammar(gp); }}
        />
      </ColorCtx.Provider>
    );
  }

  return (
    <ColorCtx.Provider value={C}>
    <div className="gr-scope">
      <PlaceIntro place="grammar" dark={theme === 'dark'} />
      <div className="hr-stage">

        <div className="hr-mobile-back">
          <button onClick={smartBack} className="hr-mobile-back-btn" aria-label={t('ui.ph_back', lang)}>
            <ArrowLeft size={14} /> {t('ui.ph_back', lang)}
          </button>
        </div>

        <header className="hr-page-head">
          <div className="hr-brand">
            <div className="hr-brand-mark">Tori</div>
            <div className="hr-brand-kr">문법</div>
            <div className="hr-brand-sub">{t('grammar.page_title', lang)}</div>
          </div>
          <div className="hr-brand-sub" data-md-show>{t('grammar.page_subtitle', lang)}</div>
        </header>

        <nav className="hr-main-tabs">
          {([
            ['chapters', t('grammar.tab_chapters', lang), '단원 학습'],
            ['library', t('grammar.tab_library', lang), '문법 사전'],
          ] as [Tab, string, string][]).map(([key, label, kr]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`hr-main-tab${tab === key ? ' active' : ''}`}
            >
              {label}
              <span className="hr-kr">{kr}</span>
            </button>
          ))}
        </nav>

        <div key={tab} className="gr-screen">
          {tab === 'chapters' && <ChaptersTab onOpenCard={openCard} isAdmin={isAdmin} refreshTick={chaptersRefreshTick} />}
          {tab === 'library' && <LibraryTab onStartGrammar={setSessionGrammar} />}
        </div>
      </div>
    </div>
    </ColorCtx.Provider>
  );
}

export default function GrammarPage() {
  return (
    <Suspense fallback={<div style={{ padding: 48, textAlign: 'center', color: 'var(--color-ink-3)' }}>Loading...</div>}>
      <GrammarContent />
    </Suspense>
  );
}
