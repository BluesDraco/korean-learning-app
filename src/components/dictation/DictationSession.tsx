'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Trophy, Volume2, Keyboard, Pen } from 'lucide-react';
import { awardXp, updateStreak } from '@/lib/gamification';
import { useIsDesktop } from '@/lib/useIsMobile';
import { DiffFeedback } from './DiffFeedback';
import { KoreanKeyboardDisplay } from './KoreanKeyboardDisplay';
import { useHangulIme } from '@/lib/useHangulIme';
import { db } from '@/lib/db';
import { normalizeKorean } from '@/lib/koreanDiff';
import { saveProgress, loadProgress, clearProgress, TTL_FLASHCARD } from '@/lib/progress-storage';
import { useAuth } from '@/components/AuthProvider';
import { speak } from '@/lib/tts';
import { playCorrectSound, playWrongSound, playComplete } from '@/lib/audio/sfx';
import { OriginBadge } from '@/components/practice/OriginBadge';
import type { OriginKind } from '@/components/practice/OriginBadge';
import { KeyboardHint } from '@/components/practice/KeyboardHint';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { getGuestId } from '@/lib/guestId';
import '@/app/practice/practice-redesign.css';

export interface DictationItem {
  [k: string]: unknown;
  korean: string;
  meaning: string;
  type: 'word' | 'sentence';
  /** 教学脚手架 · 拼写/发音陷阱(单词) 或 语法点(句子) */
  tricky?: string;
  grammarPoint?: string;
  /** 题源标签 · 从 userPool.PoolOrigin 复用 */
  origin?: OriginKind;
  originLabel?: string;
}

interface DictationSessionProps {
  [k: string]: unknown;
  items: DictationItem[];
  onExit: () => void;
  exitLabel?: string;
  /** 完成时的自定义结算屏(v2 hub 用),不传则用内置 done 屏 */
  renderDone?: (stats: { correct: number; total: number; xp: number; onRetry: () => void }) => React.ReactNode;
  /** v2 hub 包在 Shell 中时传 true,隐藏内部顶部进度条(避免与 shell 顶栏重复) */
  hideTopProgress?: boolean;
  /** v2 hub 通知外部当前进度(用于 shell 顶栏) */
  onProgress?: (current: number, total: number) => void;
  /** 通知外部完成 · shell 隐藏顶栏进度 */
  onFinished?: () => void;
  /** 子模式 key(用于 SESSION_KEY 隔离,不同子模式不串号) */
  submodeKey?: string;
}

export function DictationSession({ items, onExit, exitLabel, renderDone, hideTopProgress = false, onProgress, onFinished, submodeKey = 'default' }: DictationSessionProps) {
  const { user } = useAuth();
  const { lang } = useLang();
  // 默认值不能用 hook,改在组件内兜底(原默认 '返回配置')
  const exitLabelText = exitLabel || t('dict.exit_default', lang);
  // 用简易 hash 消除串号 · 32 位循环加权,同长度不同内容不再冲突
  const itemsHash = (() => {
    let h = 0;
    const s = items.map(i => i.korean).join('|');
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    }
    return h.toString(36);
  })();
  const SESSION_KEY = `dictation-session:${user?.id ?? 'anon'}:${submodeKey}:${items.length}:${itemsHash}`;

  const [index, setIndex] = useState(() => {
    const saved = loadProgress<{ idx: number; total: number }>(SESSION_KEY);
    if (saved && saved.total === items.length && saved.idx > 0 && saved.idx < items.length) return saved.idx;
    return 0;
  });
  const [input, setInput] = useState('');
  const [inputMode, setInputMode] = useState<'type' | 'hand'>('type');
  const [submitted, setSubmitted] = useState(false);
  const [xpTotal, setXpTotal] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const ttsTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isDesktop = useIsDesktop();

  const [ttsFailed, setTtsFailed] = useState(false);
  const playTts = (text: string, speed?: number) => {
    speak(text, speed).catch(() => {
      setTtsFailed(true);
      clearTimeout(ttsTimerRef.current);
      ttsTimerRef.current = setTimeout(() => setTtsFailed(false), 2000);
    });
  };

  // 桌面端 · 自立型韩文 IME(物理键+虚拟键统一入口,不依赖系统输入法)
  const ime = useHangulIme({
    onChange: setInput,
    onEnter: () => handleSubmit(),
    guardBackspace: isDesktop,
  });

  useEffect(() => {
    if (done) { clearProgress(SESSION_KEY); return; }
    saveProgress(SESSION_KEY, { idx: index, total: items.length }, TTL_FLASHCARD);
  }, [index, done, SESSION_KEY, items.length]);

  useEffect(() => {
    onProgress?.(index + 1, items.length);
  }, [index, items.length, onProgress]);

  // 桌面端聚焦管理 · 输入期聚焦显示区(物理键直接可用)、提交后聚焦「下一题」(Enter 进下一题)
  // 依赖 index+submitted:回车换题后 submitted 转 false、显示区重新挂载,这一轮会补聚焦
  // 双 rAF:等 React 提交完新 DOM 再聚焦,单帧时显示区可能还没挂载导致聚焦失败(需手动点)
  useEffect(() => {
    if (!isDesktop || done) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => {
      if (submitted) nextBtnRef.current?.focus();
      else if (inputMode === 'type') displayRef.current?.focus();
    }));
    return () => cancelAnimationFrame(id);
  }, [index, submitted, isDesktop, done, inputMode]);

  const current = items[index];

  function resetForItem() {
    setInput('');
    setSubmitted(false);
    ime.reset();
  }

  const autoPlayedRef = useRef<Set<number>>(new Set());
  useEffect(() => {
    if (!current) return;
    resetForItem();
    // 每题首次进入自动播 TTS
    if (!autoPlayedRef.current.has(index)) {
      autoPlayedRef.current.add(index);
      // 句子放慢到 0.75,单词 0.9(单词太慢反而失真)
      const speed = current.type === 'sentence' ? 0.75 : 0.9;
      const timer = setTimeout(() => playTts(current.korean, speed), 400);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function handleSubmit() {
    if (!input.trim() || submitted) return;
    const isCorrect = normalizeKorean(input) === normalizeKorean(current.korean);
    setSubmitted(true);
    if (isCorrect) {
      playCorrectSound();
      setCorrectCount(c => c + 1);
      awardXp(8).catch(e => console.error('[dictation] awardXp failed', e));
      setXpTotal(x => x + 8);
    } else {
      playWrongSound();
    }
    db.dictationRecords.add({
      id: `dict-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      userId: user?.id || getGuestId(),
      wordId: current.korean,
      meaning: current.meaning,
      date: Date.now(),
      correct: isCorrect,
      userInput: input.trim(),
      type: current.type,
    }).catch(e => console.error('[dictation] dictationRecords.add failed', e));
  }

  function handleNext() {
    if (index + 1 >= items.length) {
      playComplete();
      updateStreak().catch(e => console.error('[dictation] updateStreak failed', e));
      setDone(true);
      onFinished?.();
    } else {
      setIndex(i => i + 1);
    }
  }

  function handleSkip() {
    // 跳过 = 不计分,但记为错题(进错题本、SRS 数据完整)
    setInput('');
    ime.reset();  // 清桌面 IME buffer，防残留 jamo 续接到下一题
    setSubmitted(true);
    db.dictationRecords.add({
      id: `dict-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      userId: user?.id || getGuestId(),
      wordId: current.korean,
      meaning: current.meaning,
      date: Date.now(),
      correct: false,
      userInput: '',
      type: current.type,
    }).catch(e => console.error('[dictation] dictationRecords.add (skip) failed', e));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      if (!submitted) handleSubmit();
      else handleNext();
    }
  }

  // ── Done screen ──
  if (done) {
    if (renderDone) {
      return <>{renderDone({
        correct: correctCount,
        total: items.length,
        xp: xpTotal,
        onRetry: () => { setIndex(0); setCorrectCount(0); setXpTotal(0); setDone(false); resetForItem(); },
      })}</>;
    }
    const pct = Math.round((correctCount / items.length) * 100);
    return (
      <div className="pr-scope" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 20, padding: '0 20px' }}>
        <div style={{ background: 'var(--hr-peach-soft)', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--hr-peach-base)' }}>
          <Trophy size={36} style={{ color: 'var(--hr-peach-strong)' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--hr-serif)', fontStyle: 'italic', fontSize: 44, fontWeight: 700, color: 'var(--hr-ink-1)', margin: 0, letterSpacing: '-.02em' }}>{pct}%</p>
          <p style={{ fontSize: 14, color: 'var(--hr-ink-3)', marginTop: 4 }}>{t('dict.correct_of_total', lang, { a: correctCount, b: items.length })}</p>
        </div>
        <div style={{ background: 'var(--hr-peach-soft)', borderRadius: 14, padding: '10px 20px', border: '1px solid var(--hr-peach-base)' }}>
          <span style={{ fontSize: 13, color: 'var(--hr-peach-strong)', fontWeight: 700 }}>{t('dict.xp_earned', lang, { n: xpTotal })}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 400, marginTop: 8 }}>
          <button
            onClick={() => { setIndex(0); setCorrectCount(0); setXpTotal(0); setDone(false); resetForItem(); }}
            style={{ padding: '13px 0', borderRadius: 14, background: 'var(--hr-ink-1)', color: 'var(--hr-surface-1)', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            {t('dict.retry_round', lang)}
          </button>
          <button
            onClick={onExit}
            style={{ padding: '13px 0', borderRadius: 14, background: 'transparent', border: '1.5px solid var(--hr-border-2)', color: 'var(--hr-ink-2)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            {exitLabelText}
          </button>
        </div>
      </div>
    );
  }

  // 统一渲染 · 桌面上下堆叠、手机单列
  const promptCard = (
    <div style={{
      background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
      borderRadius: 16, padding: isDesktop ? '32px 32px 28px' : '32px 20px 28px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      boxShadow: 'var(--hr-shadow-sm)',
      position: 'relative',
    }}>
      <OriginBadge origin={current.origin} label={current.originLabel} />
      <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0 }}>
        Write the Korean for
      </p>
      <p style={{ fontSize: isDesktop ? 36 : 30, fontWeight: 800, color: 'var(--hr-ink-1)', margin: 0, textAlign: 'center', lineHeight: 1.3, letterSpacing: '-.01em' }}>
        {current.meaning}
      </p>
      {/* 大号听音按钮 · 一键重播 */}
      <button
        onClick={() => playTts(current.korean, current.type === 'sentence' ? 0.75 : 0.9)}
        aria-label={t('dict.listen_pron', lang)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px',
          borderRadius: 999,
          border: '1.5px solid var(--hr-peach-base)',
          background: 'var(--hr-peach-strong)', color: '#fff',
          fontSize: 14, fontWeight: 700, cursor: 'pointer', minHeight: 44,
          boxShadow: '0 6px 20px rgba(217,122,85,.35)',
          transition: 'transform .15s var(--hr-ease)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <Volume2 size={16} /> {t('dict.listen_pron', lang)}
      </button>
      {ttsFailed && (
        <p style={{ fontSize: 12, color: 'var(--hr-pink-strong)', margin: 0, textAlign: 'center', animation: 'dictCaretBlink 1s step-end infinite' }}>
          {t('dict.tts_failed', lang)}
        </p>
      )}
      <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-ink-3)', background: 'var(--hr-surface-3)', border: '1px solid var(--hr-border-2)', borderRadius: 99, padding: '3px 12px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
        {current.type === 'word' ? 'Word' : 'Sentence'}
      </span>
    </div>
  );

  const modeToggle = (
    <div style={{ display: 'flex', gap: 4, background: 'var(--hr-surface-3)', borderRadius: 999, padding: 4 }}>
      {(['type', 'hand'] as const).map(m => (
        <button
          key={m}
          onClick={() => {
            // 切到打字(桌面自绘 IME)前把已有内容(手写填入的)同步进 buffer，
            // 否则第一个键会 commit([jamo]) 覆盖掉整串已输入内容
            if (m === 'type' && isDesktop) ime.syncExternal(input);
            setInputMode(m);
          }}
          style={{
            flex: 1, padding: '9px 0', borderRadius: 999, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            fontSize: 13.5, fontWeight: 700, fontFamily: 'var(--hr-hangul)',
            background: inputMode === m ? 'var(--hr-surface-1)' : 'transparent',
            color: inputMode === m ? 'var(--hr-peach-strong)' : 'var(--hr-ink-3)',
            boxShadow: inputMode === m ? '0 2px 8px rgba(58,46,41,.08)' : 'none',
            transition: 'all .2s var(--hr-ease)',
          }}
        >
          {m === 'type' ? <><Keyboard size={15} />{t('dict.mode_type', lang)}</> : <><Pen size={15} />{t('dict.mode_hand', lang)}</>}
        </button>
      ))}
    </div>
  );

  const inputArea = !submitted ? (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {modeToggle}
      {inputMode === 'hand' ? (
        isDesktop ? (
          <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', textAlign: 'center', lineHeight: 1.6, padding: '16px 12px', margin: 0 }}>
            {t('prac.hw_guide_desktop', lang)}
          </p>
        ) : (
          <div style={{ padding: '8px 2px' }}>
            <KeyboardHint text={t('prac.hw_guide_mobile', lang)} />
          </div>
        )
      ) : isDesktop ? (
        // 桌面 · App 接管输入(不依赖系统输入法)· 只读显示区 + 闪烁光标
        <div
          ref={displayRef}
          {...ime.keyProps}
          role="textbox"
          aria-label={t('dict.input_area_aria', lang)}
          onClick={() => displayRef.current?.focus()}
          style={{
            width: '100%', padding: '16px 18px', borderRadius: 14, minHeight: 60,
            border: '2px solid var(--hr-peach-base)', boxShadow: '0 0 0 4px rgba(255,157,122,.12)',
            fontSize: 22, color: 'var(--hr-ink-1)', fontFamily: 'var(--hr-hangul)',
            boxSizing: 'border-box', background: 'var(--hr-surface-2)', outline: 'none', cursor: 'text',
            display: 'flex', alignItems: 'center', flexWrap: 'wrap',
          }}
        >
          {input
            ? <span>{input}</span>
            : <span style={{ color: 'var(--hr-ink-4)' }}>{t('dict.hand_placeholder', lang)}</span>}
          <span aria-hidden style={{
            display: 'inline-block', width: 2, height: 26, marginLeft: 2,
            background: 'var(--hr-peach-strong)', animation: 'dictCaretBlink 1s step-end infinite',
          }} />
        </div>
      ) : (
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('dict.input_placeholder', lang)}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: 14,
            border: '2px solid var(--hr-border-2)', fontSize: 18, color: 'var(--hr-ink-1)',
            outline: 'none', fontFamily: 'var(--hr-hangul)', boxSizing: 'border-box',
            background: 'var(--hr-surface-2)', caretColor: 'var(--hr-peach-strong)',
            transition: 'border-color .15s var(--hr-ease), box-shadow .15s var(--hr-ease)',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--hr-peach-base)'; e.target.style.boxShadow = '0 0 0 4px rgba(255,157,122,.15)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--hr-border-2)'; e.target.style.boxShadow = 'none'; }}
        />
      )}
      {inputMode === 'type' && (isDesktop ? (
        <p style={{ fontSize: 12, color: 'var(--hr-ink-3)', margin: 0, textAlign: 'left' }}>{t('dict.type_hint', lang)}</p>
      ) : (
        <KeyboardHint />
      ))}
      {inputMode === 'type' && isDesktop && (
        <KoreanKeyboardDisplay
          composingText={input}
          pressedKey={ime.pressedKey}
          onJamo={ime.inputJamo}
          onBackspace={ime.backspace}
          onSpace={ime.space}
        />
      )}
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <button
          onClick={handleSkip}
          style={{
            padding: isDesktop ? '14px 22px' : '13px 18px', borderRadius: 14,
            background: 'transparent', border: '1.5px solid var(--hr-border-2)', color: 'var(--hr-ink-3)',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >{t('dict.view_answer_skip', lang)}</button>
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          style={{
            flex: 1, minWidth: 0, padding: isDesktop ? '14px 0' : '13px 0', borderRadius: 14,
            background: input.trim() ? 'var(--hr-ink-1)' : 'var(--hr-border-3)',
            color: input.trim() ? 'var(--hr-surface-1)' : 'var(--hr-ink-4)',
            fontSize: isDesktop ? 15 : 14, fontWeight: 700, border: 'none',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            transition: 'background .15s var(--hr-ease)',
          }}
        >{t('dict.submit', lang)}</button>
      </div>
    </div>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {input.trim() ? (
        <DiffFeedback userInput={normalizeKorean(input)} correct={normalizeKorean(current.korean)} />
      ) : (
        <div style={{ background: 'var(--hr-peach-soft)', border: '1.5px solid var(--hr-peach-base)', borderRadius: 14, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-peach-strong)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>{t('dict.skipped', lang)}</p>
          <p style={{ fontFamily: 'var(--hr-hangul)', fontSize: 22, fontWeight: 700, color: 'var(--hr-ink-1)', margin: 0 }}>{current.korean}</p>
          <p style={{ fontSize: 12, color: 'var(--hr-ink-3)', margin: 0 }}>{t('dict.skip_replay_hint', lang)}</p>
        </div>
      )}
      {/* 答错/跳过 → 已收进错题本轻提示 */}
      {(!input.trim() || normalizeKorean(input) !== normalizeKorean(current.korean)) && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start', background: 'var(--hr-surface-3)', border: '1px solid var(--hr-border-2)', borderRadius: 999, padding: '5px 12px' }}>
          <span style={{ fontSize: 13 }} aria-hidden>🧠</span>
          <span style={{ fontSize: 12, color: 'var(--hr-ink-2)', fontWeight: 600 }}>{t('dict.added_to_mistakes', lang)}</span>
        </div>
      )}
      {/* 教学脚手架 · 拼写陷阱 / 语法点 · 每题都展示,让做完能带走东西 */}
      {(current.tricky || current.grammarPoint) && (
        <div style={{
          background: 'var(--hr-surface-2)',
          border: '1.5px dashed var(--hr-peach-base)',
          borderRadius: 12,
          padding: '12px 14px',
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 16, lineHeight: 1, marginTop: 1 }} aria-hidden>
            {current.tricky ? '⚠️' : '📖'}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontFamily: 'var(--hr-mono)',
              fontSize: 10, color: 'var(--hr-peach-strong)',
              letterSpacing: '.14em', textTransform: 'uppercase',
              margin: 0, fontWeight: 700,
            }}>
              {current.tricky ? t('dict.tricky_here', lang) : t('dict.involves_grammar', lang)}
            </p>
            <p style={{
              fontSize: 13, color: 'var(--hr-ink-2)',
              margin: '3px 0 0', lineHeight: 1.55,
            }}>
              {current.tricky || current.grammarPoint}
            </p>
          </div>
        </div>
      )}
      <button
        ref={nextBtnRef}
        onClick={handleNext}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: isDesktop ? '14px 0' : '13px 0', borderRadius: 14,
          background: 'var(--hr-ink-1)', color: 'var(--hr-surface-1)',
          fontSize: isDesktop ? 15 : 14, fontWeight: 700, border: 'none', cursor: 'pointer',
        }}
      >
        {index + 1 >= items.length ? t('dict.view_result', lang) : t('dict.next_q', lang)}
        <ChevronRight size={16} />
      </button>
    </div>
  );

  return (
    <div className="pr-scope" style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720, margin: '0 auto', paddingBottom: 20 }}>
      <style>{`@keyframes dictCaretBlink { 0%,50%{opacity:1} 50.01%,100%{opacity:0} }`}</style>
      {!hideTopProgress && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0, height: 6, background: 'var(--hr-border-1)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(index / items.length) * 100}%`, background: 'var(--hr-peach-base)', borderRadius: 999, transition: 'width 0.3s' }} />
          </div>
          <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 11, color: 'var(--hr-ink-3)', whiteSpace: 'nowrap', letterSpacing: '.05em' }}>{index + 1} / {items.length}</span>
        </div>
      )}
      {promptCard}
      {inputArea}
    </div>
  );
}
