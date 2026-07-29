'use client';

// 子关卡通用件 · 供听力/语法/情景/Boss 四关复用
// 词汇关(SubQuestClient) 保留自己的内部实现不动，避免大改回归

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Volume2, RotateCcw, ArrowRight, Star, ChevronLeft, Check, X, RefreshCcw } from 'lucide-react';
import type { ToriLevel } from '@/types/tori-diary';
import type { ToriSubQuestProgress, ToriSubQuestStars, ToriSubQuestIdx, ToriSubQuestKind, ChoiceQuizTask, ComposeQuizTask } from '@/types/tori-subquest';
import { speak, unlockAudioContext } from '@/lib/tts';
import { sfxCorrect, sfxWrong, sfxPop, sfxChime, sfxCelebration } from '@/lib/sfx';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/useToast';
import { CarrotHelper } from '@/components/diary/CarrotHelper';
import { getDay } from '@/data/diary';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

// ═══════════════════════════════════════════════════════════
// 星级
// ═══════════════════════════════════════════════════════════

export function starsFromWrong(wrong: number): ToriSubQuestStars {
  if (wrong === 0) return 3;
  if (wrong <= 2) return 2;
  if (wrong <= 4) return 1;
  return 0;
}

/**
 * 按正确率判定星级 —— 短测验（总题 ≤4）也能真判失败。
 * ≥80% 三星 / ≥60% 二星 / ≥40% 一星 / 低于则 0 星重来。
 * total 缺失（≤0）时退回按错题数判定。
 */
export function starsFromScore(wrong: number, total: number): ToriSubQuestStars {
  if (total <= 0) return starsFromWrong(wrong);
  const rate = Math.max(0, total - wrong) / total;
  if (rate >= 0.8) return 3;
  if (rate >= 0.6) return 2;
  if (rate >= 0.4) return 1;
  return 0;
}

/** Fisher–Yates 洗牌 · 不改原数组 */
export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ═══════════════════════════════════════════════════════════
// 答题记录
// ═══════════════════════════════════════════════════════════

export interface AnswerLog {
  taskId: string;
  prompt: string;
  hangul?: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string;
}

// ═══════════════════════════════════════════════════════════
// 通用子关卡状态 hook · 4 个 Client（Listen/Grammar/Scene/Boss）共用
// 提炼骨架：wrongCount + logs + startRef + carrots + xp + epoch
// 每关自己管 phase/taskIdx（各关结构差异大不通用）
// ═══════════════════════════════════════════════════════════

export function useSubQuestState() {
  const [wrongCount, setWrongCount] = useState(0);
  const [logs, setLogs] = useState<AnswerLog[]>([]);
  const [epoch, setEpoch] = useState(0);
  const startRef = useRef(Date.now());

  const carrots = Math.max(0, 3 - wrongCount);
  const xp = logs.filter((l) => l.isCorrect).length * 10;

  /** 记录一条答题日志，非正确题自动累加 wrongCount */
  const recordLog = useCallback((log: AnswerLog) => {
    setLogs((prev) => [...prev, log]);
    if (!log.isCorrect) setWrongCount((w) => w + 1);
  }, []);

  /** 重置所有状态，用于「再挑战一次」/ admin 跳段清零 */
  const reset = useCallback(() => {
    setWrongCount(0);
    setLogs([]);
    setEpoch((e) => e + 1);
    startRef.current = Date.now();
  }, []);

  return { wrongCount, logs, epoch, startRef, carrots, xp, recordLog, reset };
}

// ═══════════════════════════════════════════════════════════
// 进度写入 hook
// ═══════════════════════════════════════════════════════════

/**
 * 落库 hook。返回 true=已写入 / false=失败（调用方据此决定是否显示通关）。
 * stars 由调用方按正确率算好传入（判分归 ResultShell）。
 */
export function usePersistResult(
  level: ToriLevel, day: number, idx: ToriSubQuestIdx, kind: ToriSubQuestKind,
) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { lang } = useLang();
  return useCallback(async (finalWrong: number, stars: ToriSubQuestStars): Promise<boolean> => {
    if (!user) {
      showToast(t('diary.sqs.toastNotLoggedIn', lang), 'info');
      return false;
    }
    const id = `${user.id}-${level}-${day}-${idx}`;
    try {
      const existing = await db.toriSubQuestProgress.get(id) as ToriSubQuestProgress | undefined;
      const now = Date.now();
      const bestStars: ToriSubQuestStars = existing ? (Math.max(existing.stars, stars) as ToriSubQuestStars) : stars;
      const record: ToriSubQuestProgress = {
        id, userId: user.id, level, day, idx, kind,
        stars: bestStars,
        wrongCount: finalWrong,
        attempts: (existing?.attempts ?? 0) + 1,
        firstClearedAt: existing?.firstClearedAt ?? (stars >= 1 ? now : undefined),
        updatedAt: now,
      };
      await db.toriSubQuestProgress.put(record);
      return true;
    } catch (err) {
      console.error('[subquest] persist failed', err);
      showToast(t('diary.sqs.toastSaveFailed', lang), 'error');
      return false;
    }
  }, [user, level, day, idx, kind, showToast, lang]);
}

// ═══════════════════════════════════════════════════════════
// 主题跟随
// ═══════════════════════════════════════════════════════════

export function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

// ═══════════════════════════════════════════════════════════
// HUD
// ═══════════════════════════════════════════════════════════

export function CarrotHUD({ carrots, xp }: { carrots: number; xp: number }) {
  const { lang } = useLang();
  const lost = 3 - carrots;
  return (
    <div className="subquest-hud-notebook" aria-label={t('diary.sqs.hudAria', lang, { carrots, xp })}>
      <span className="subquest-hud-count">
        <span className="subquest-hud-num">{xp}</span>
        <span className="subquest-hud-unit">{t('diary.sqs.pointUnit', lang)}</span>
      </span>
      <span className="subquest-hud-divider" aria-hidden>·</span>
      <span className="subquest-hud-carrot-mark" title={carrots === 3 ? t('diary.sqs.fullCourage', lang) : t('diary.sqs.lostCarrots', lang, { n: lost })}>
        <span className="subquest-hud-carrot-emoji" aria-hidden>🥕</span>
        <span className="subquest-hud-carrot-x">×{carrots}</span>
      </span>
    </div>
  );
}

export function PhaseDot({ index, label, done, current }: {
  index: number; label: string; done: boolean; current: boolean;
}) {
  return (
    <div className={`subquest-phase-dot${done ? ' is-done' : ''}${current ? ' is-current' : ''}`}>
      <span className="subquest-phase-dot-circle">{done ? '✓' : index}</span>
      <span className="subquest-phase-dot-label">{label}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 答题回顾行
// ═══════════════════════════════════════════════════════════

export function AnswerLogRow({ idx, entry }: { idx: number; entry: AnswerLog }) {
  const { lang } = useLang();
  return (
    <div
      style={{
        padding: '10px 14px',
        background: entry.isCorrect ? 'color-mix(in srgb, var(--color-mint-strong) 6%, var(--paper))' : 'color-mix(in srgb, var(--stamp) 6%, var(--paper))',
        border: `1px solid ${entry.isCorrect ? 'color-mix(in srgb, var(--color-mint-strong) 22%, transparent)' : 'color-mix(in srgb, var(--stamp) 22%, transparent)'}`,
        borderRadius: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: entry.isCorrect ? 0 : 6 }}>
        <span style={{
          width: 24, height: 24, borderRadius: '50%',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: entry.isCorrect ? 'var(--color-mint-strong)' : 'var(--stamp)',
          color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0,
        }}>
          {entry.isCorrect ? <Check size={12} /> : <X size={12} />}
        </span>
        <span style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.06em' }}>Q{idx}</span>
        <span style={{ flex: 1, minWidth: 0, overflowWrap: 'break-word', fontFamily: 'var(--font-ko)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>
          {entry.prompt}
        </span>
        {entry.hangul && (
          <span style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '.06em' }}>[{entry.hangul}]</span>
        )}
      </div>
      {!entry.isCorrect && (
        <div style={{ marginLeft: 34, fontSize: 12, lineHeight: 1.7 }}>
          <div style={{ color: 'var(--ink-3)' }}>
            {t('diary.sqs.youChose', lang)} · <span style={{ color: 'var(--stamp)', textDecoration: 'line-through' }}>{entry.userAnswer}</span>
          </div>
          <div style={{ color: 'var(--ink-3)', marginTop: 2 }}>
            {t('diary.sqs.correctLabel', lang)} · <b style={{ color: 'var(--ink)' }}>{entry.correctAnswer}</b>
          </div>
          {entry.explanation && (
            <div style={{ marginTop: 4, color: 'var(--ink-2)', fontStyle: 'italic' }}>💡 {entry.explanation}</div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ChoiceBlock · 单道选择题（听力/语法/Boss 共用）
// ═══════════════════════════════════════════════════════════

export function ChoiceBlock({ task, index, total, tagLabel, onResolve }: {
  task: ChoiceQuizTask;
  index: number;
  total: number;
  tagLabel: string;
  onResolve: (log: AnswerLog) => void;
}) {
  const { user } = useAuth();
  const { lang } = useLang();
  const isAdmin = user?.role === 'admin';
  // locked: set only on correct pick OR after 3 wrong attempts
  const [locked, setLocked] = useState<number | null>(null);
  const lockedRef = useRef(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [shaking, setShaking] = useState(false);
  const firstWrongRef = useRef(false);
  const autoPlayedForRef = useRef<string | null>(null);
  // 追踪本组件内起的定时器，卸载/切题时统一清，避免在已卸载实例上 setState/resolve
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const track = (id: ReturnType<typeof setTimeout>) => { timersRef.current.push(id); return id; };
  useEffect(() => () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; }, []);

  // shuffle choices once per task
  const shuffled = useMemo(() => {
    const arr = task.choices.map((c, i) => ({ ...c, origIdx: i }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [task]);

  useEffect(() => {
    if (!task.audioKo) return;
    // 换题时 audioKo 变了，重新触发自动播放；同一题不重复播（防 StrictMode 双跑）
    if (autoPlayedForRef.current === task.audioKo) return;
    autoPlayedForRef.current = task.audioKo;
    // 首题进入时页面还没交互，浏览器可能拦截自动播放 → 延迟一帧并解锁 AudioContext
    const audioKo = task.audioKo;
    const timer = setTimeout(() => {
      unlockAudioContext();
      speak(audioKo).catch(() => {});
    }, 120);
    return () => clearTimeout(timer);
  }, [task.audioKo]);

  const correctChoice = shuffled.find(c => c.correct);

  const resolveCorrect = () => {
    onResolve({
      taskId: task.id,
      prompt: task.promptKo || task.promptZh || task.audioKo || '',
      hangul: task.promptHangul,
      userAnswer: locked !== null ? shuffled[locked].text : (correctChoice?.text ?? ''),
      correctAnswer: correctChoice?.text ?? '',
      isCorrect: !firstWrongRef.current,
      explanation: firstWrongRef.current ? task.explain : undefined,
    });
  };

  const handlePick = (i: number) => {
    if (lockedRef.current || locked !== null) return;
    const choice = shuffled[i];
    if (choice.correct) {
      lockedRef.current = true;
      sfxCorrect();
      setLocked(i);
      // 听力题：有 audioKo 无 promptKo，答对后等用户点"下一题"再走（可看原文）
      // 其他题型：自动 650ms 后进下一题（保持原节奏）
      const hasAudioReveal = !!task.audioKo && !task.promptKo;
      if (!hasAudioReveal) {
        track(setTimeout(resolveCorrect, 650));
      }
    } else {
      sfxWrong();
      setShaking(true);
      firstWrongRef.current = true;
      const newWrong = wrongAttempts + 1;
      setWrongAttempts(newWrong);
      track(setTimeout(() => setShaking(false), 480));
      if (newWrong >= 3) { lockedRef.current = true; setLocked(i); } // lock after 3rd wrong
    }
  };

  const retry = () => { sfxPop(); };
  const replay = () => { sfxPop(); if (task.audioKo) speak(task.audioKo).catch(() => {}); };
  const continueWrong = () => {
    onResolve({
      taskId: task.id,
      prompt: task.promptKo || task.promptZh || task.audioKo || '',
      hangul: task.promptHangul,
      userAnswer: locked !== null ? shuffled[locked].text : '',
      correctAnswer: correctChoice?.text ?? '',
      isCorrect: false,
      explanation: task.explain,
    });
  };

  const isLockedWrong = locked !== null && !shuffled[locked]?.correct;

  const skip = () => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    sfxPop();
    onResolve({
      taskId: task.id,
      prompt: task.promptKo || task.promptZh || task.audioKo || '',
      hangul: task.promptHangul,
      userAnswer: t('diary.sqs.skipped', lang),
      correctAnswer: correctChoice?.text ?? '',
      isCorrect: true, // 跳过视为通过，不计错
      explanation: task.explain,
    });
  };

  return (
    <div className={shaking ? 'diary-anim-shake' : ''} style={{ position: 'relative' }}>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 8 }}>
        {tagLabel} · {index + 1} / {total}
      </div>
      {isAdmin && locked === null && (
        <button
          onClick={skip}
          title={t('diary.sqs.skipTitle', lang)}
          style={{
            position: 'absolute', top: -6, right: 0, zIndex: 2,
            padding: '3px 10px', fontSize: 11,
            border: '1px solid var(--line)', borderRadius: 999,
            background: 'var(--paper)', color: 'var(--ink-3)', cursor: 'pointer',
          }}
        >{t('diary.sqs.skip', lang)}</button>
      )}

      {task.audioKo && (
        <div style={{ textAlign: 'center', marginTop: 6, marginBottom: 12 }}>
          <button className="subquest-big-play" onClick={replay} aria-label={t('diary.sqs.replay', lang)} style={{ width: 64, height: 64 }}>
            <Volume2 size={24} strokeWidth={2} />
          </button>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 10, letterSpacing: '.06em' }}>{t('diary.sqs.clickReplay', lang)}</div>
        </div>
      )}
      {task.promptZh && !task.clozeParts && (
        <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-zh)', marginBottom: 14, lineHeight: 1.6 }}>
          {task.promptZh}
        </div>
      )}
      {task.promptKo && !task.clozeParts && (
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 'var(--diary-text-2xl)', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-ko)' }}>{task.promptKo}</div>
          {task.promptHangul && <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.06em', marginTop: 4 }}>[{task.promptHangul}]</div>}
        </div>
      )}
      {task.clozeParts && (
        <div style={{ textAlign: 'center', marginBottom: 16, fontSize: 'var(--diary-text-xl)', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-ko)', lineHeight: 1.5 }}>
          {task.clozeParts[0]}
          <span style={{
            display: 'inline-block', minWidth: 44, borderBottom: '2.5px solid var(--gold)',
            margin: '0 6px', color: 'var(--gold-deep)',
          }}>{locked !== null ? shuffled[locked].text : '　?　'}</span>
          {task.clozeParts[1]}
        </div>
      )}

      {/* 机会指示点（1-2次错误时显示） */}
      {wrongAttempts > 0 && wrongAttempts < 3 && locked === null && (
        <div style={{ textAlign: 'center', marginBottom: 10, display: 'flex', justifyContent: 'center', gap: 6 }}>
          {[0, 1, 2].map(k => (
            <span key={k} style={{
              width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
              background: k < wrongAttempts ? 'var(--stamp)' : 'var(--line)',
              transition: 'background .2s',
            }} />
          ))}
          <span style={{ fontSize: 11, color: 'var(--stamp)', marginLeft: 6 }}>{t('diary.sqs.chancesLeft', lang, { n: 3 - wrongAttempts })}</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shuffled.map((c, i) => {
          const isLocked = locked === i;
          const showCorrect = isLocked && c.correct;
          const showWrong = isLockedWrong && isLocked;
          const showRevealCorrect = isLockedWrong && c.correct; // reveal correct after 3 wrong
          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              disabled={locked !== null}
              className={`subquest-choice${showCorrect || showRevealCorrect ? ' is-correct' : ''}${showWrong ? ' is-wrong' : ''}`}
            >
              <span className="subquest-choice-badge">
                {showCorrect || showRevealCorrect ? '✓' : showWrong ? '✕' : String.fromCharCode(65 + i)}
              </span>
              {c.text}
            </button>
          );
        })}
      </div>

      {locked !== null && shuffled[locked]?.correct && task.audioKo && !task.promptKo && (
        <div style={{
          marginTop: 14, padding: '12px 14px', border: '1px solid var(--line)',
          borderRadius: 12, background: 'var(--paper)',
        }}>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.06em', marginBottom: 6 }}>{t('diary.sqs.originalText', lang)}</div>
          <div className="diary-ko" style={{ fontSize: 'var(--diary-text-lg)', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-ko)', lineHeight: 1.5 }}>{task.audioKo}</div>
          {task.promptHangul && <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.06em', marginTop: 4 }}>[{task.promptHangul}]</div>}
          {task.promptZh && <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 6 }}>{task.promptZh}</div>}
          <button className="subquest-retry-btn" style={{ marginTop: 10, alignSelf: 'flex-end', display: 'block', marginLeft: 'auto' }} onClick={resolveCorrect}>{t('diary.sqs.nextQuestion', lang)}</button>
        </div>
      )}

      {isLockedWrong && (
        <div className="subquest-feedback" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RotateCcw size={14} />
            <span>{t('diary.sqs.outOfChancesChoice', lang, { answer: correctChoice?.text ?? '' })}{task.explain ? ` · ${task.explain}` : ''}</span>
          </div>
          <button className="subquest-retry-btn" style={{ alignSelf: 'flex-end' }} onClick={continueWrong}>{t('diary.sqs.gotItContinue', lang)}</button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ComposeBlock · 组句题（语法/Boss 共用）
// ═══════════════════════════════════════════════════════════

export function ComposeBlock({ task, index, total, tagLabel, onResolve }: {
  task: ComposeQuizTask;
  index: number;
  total: number;
  tagLabel: string;
  onResolve: (log: AnswerLog) => void;
}) {
  const { user } = useAuth();
  const { lang } = useLang();
  const isAdmin = user?.role === 'admin';
  const [picked, setPicked] = useState<number[]>([]);
  const [state, setState] = useState<'idle' | 'right' | 'wrong' | 'reveal'>('idle');
  const resolvedRef = useRef(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const firstWrongRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const track = (id: ReturnType<typeof setTimeout>) => { timersRef.current.push(id); return id; };
  useEffect(() => () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; }, []);

  const shuffled = useMemo(() => {
    return task.tokens.map((tk, i) => ({ tk, i })).sort(() => Math.random() - 0.5);
  }, [task]);

  const answerText = task.answer.join(' ');

  const pick = (tokenIdx: number) => {
    if (state === 'right' || state === 'reveal') return;
    if (picked.includes(tokenIdx)) return;
    sfxPop();
    const next = [...picked, tokenIdx];
    setPicked(next);
    if (next.length === task.answer.length) {
      const built = next.map(i => task.tokens[i]);
      const correct = built.every((tk, k) => tk === task.answer[k]);
      if (correct) {
        sfxCorrect();
        setState('right');
        track(setTimeout(() => {
          if (resolvedRef.current) return;
          resolvedRef.current = true;
          onResolve({
            taskId: task.id,
            prompt: answerText,
            userAnswer: built.join(' '),
            correctAnswer: answerText,
            isCorrect: !firstWrongRef.current,
            explanation: firstWrongRef.current ? task.explain : undefined,
          });
        }, 700));
      } else {
        sfxWrong();
        firstWrongRef.current = true;
        const newWrong = wrongAttempts + 1;
        setWrongAttempts(newWrong);
        setState('wrong');
        if (newWrong >= 3) {
          // 3rd wrong: reveal answer, wait for user to click continue
          track(setTimeout(() => setState('reveal'), 600));
        } else {
          // 1st/2nd wrong: auto-reset after shake
          track(setTimeout(() => { setPicked([]); setState('idle'); }, 900));
        }
      }
    }
  };

  const reset = () => { setPicked([]); setState('idle'); sfxPop(); };
  const unpick = (k: number) => {
    if (state === 'right' || state === 'reveal') return;
    sfxPop();
    setPicked(prev => prev.filter((_, i) => i !== k));
  };
  const continueReveal = () => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    onResolve({
      taskId: task.id,
      prompt: answerText,
      userAnswer: picked.map(i => task.tokens[i]).join(' '),
      correctAnswer: answerText,
      isCorrect: false,
      explanation: task.explain,
    });
  };

  const skip = () => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    sfxPop();
    onResolve({
      taskId: task.id,
      prompt: answerText,
      userAnswer: t('diary.sqs.skipped', lang),
      correctAnswer: answerText,
      isCorrect: true, // 跳过视为通过，不计错
      explanation: task.explain,
    });
  };

  return (
    <div className={state === 'wrong' ? 'diary-anim-shake' : ''} style={{ position: 'relative' }}>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 8 }}>
        {tagLabel} · {index + 1} / {total}
      </div>
      {isAdmin && state !== 'right' && state !== 'reveal' && (
        <button
          onClick={skip}
          title={t('diary.sqs.skipTitle', lang)}
          style={{
            position: 'absolute', top: -6, right: 0, zIndex: 2,
            padding: '3px 10px', fontSize: 11,
            border: '1px solid var(--line)', borderRadius: 999,
            background: 'var(--paper)', color: 'var(--ink-3)', cursor: 'pointer',
          }}
        >{t('diary.sqs.skip', lang)}</button>
      )}
      <div style={{ textAlign: 'center', marginTop: 4 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 4 }}>{t('diary.sqs.buildSentence', lang)}</div>
        <div style={{ fontSize: 'var(--diary-text-xl)', fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-zh)' }}>{task.zhHint}</div>
      </div>

      {/* 机会指示点 */}
      {wrongAttempts > 0 && wrongAttempts < 3 && (state === 'idle' || state === 'wrong') && (
        <div style={{ textAlign: 'center', marginTop: 8, display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center' }}>
          {[0, 1, 2].map(k => (
            <span key={k} style={{
              width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
              background: k < wrongAttempts ? 'var(--stamp)' : 'var(--line)',
            }} />
          ))}
          <span style={{ fontSize: 11, color: 'var(--stamp)', marginLeft: 6 }}>{t('diary.sqs.chancesLeft', lang, { n: 3 - wrongAttempts })}</span>
        </div>
      )}

      {/* 已选区 */}
      <div style={{
        marginTop: 16, minHeight: 56, display: 'flex', flexWrap: 'wrap', gap: 8,
        alignItems: 'center', justifyContent: 'center', padding: '12px 14px',
        background: 'var(--paper-deep)', borderRadius: 12,
        border: `1.5px ${state === 'right' ? 'solid var(--color-mint-strong)' : state === 'wrong' || state === 'reveal' ? 'solid var(--stamp)' : 'dashed var(--stitch)'}`,
      }}>
        {picked.length === 0
          ? <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{t('diary.sqs.composeHint', lang)}</span>
          : picked.map((ti, k) => (
              <button
                key={k}
                onClick={() => unpick(k)}
                disabled={state === 'right' || state === 'reveal'}
                title={t('diary.sqs.tapToUndo', lang)}
                style={{
                  fontFamily: 'var(--font-ko)', fontSize: 17, fontWeight: 600, color: 'var(--ink)',
                  background: 'var(--paper)', border: '1px solid var(--gold)', borderRadius: 8,
                  padding: '4px 12px', cursor: 'pointer', transition: 'all .15s',
                }}
              >{task.tokens[ti]}</button>
            ))}
      </div>

      {/* 词块池 */}
      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        {shuffled.map(({ tk, i }) => {
          const used = picked.includes(i);
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={used || state === 'right' || state === 'reveal'}
              style={{
                fontFamily: 'var(--font-ko)', fontSize: 17, fontWeight: 600,
                color: used ? 'var(--ink-3)' : 'var(--ink)',
                background: used ? 'transparent' : 'var(--paper)',
                border: `1.5px solid ${used ? 'var(--line)' : 'var(--line-strong, var(--stitch))'}`,
                borderRadius: 10, padding: '10px 16px', cursor: used ? 'default' : 'pointer',
                opacity: used ? 0.4 : 1, transition: 'all .18s',
              }}
            >{tk}</button>
          );
        })}
      </div>

      {/* 1-2次错误提示（短暂出现） */}
      {state === 'wrong' && wrongAttempts < 3 && (
        <div className="subquest-feedback">
          <RotateCcw size={14} />
          <span>{t('diary.sqs.wrongOrder', lang, { n: 3 - wrongAttempts })}</span>
        </div>
      )}

      {/* 3次错误揭示答案 */}
      {state === 'reveal' && (
        <div className="subquest-feedback" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RotateCcw size={14} />
            <span>{t('diary.sqs.correctOrder', lang, { answer: answerText })}{task.explain ? ` · ${task.explain}` : ''}</span>
          </div>
          <button className="subquest-retry-btn" style={{ alignSelf: 'flex-end' }} onClick={continueReveal}>{t('diary.sqs.gotItContinue', lang)}</button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Confetti
// ═══════════════════════════════════════════════════════════

export function Confetti({ count }: { count: number }) {
  const pieces = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 0.8,
    duration: 2 + Math.random() * 1.2,
    color: ['#FFB3C6', '#B8E0D8', '#F6DC8C', '#D9C8F0', '#C14E3A'][i % 5],
    rotate: Math.random() * 360,
  })), [count]);
  return (
    <div className="subquest-confetti-root">
      {pieces.map((p) => (
        <div key={p.id} className="subquest-confetti-piece" style={{
          left: `${p.left}%`, background: p.color, transform: `rotate(${p.rotate}deg)`,
          animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
        }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ResultShell · 结算（参数化 eyebrow / 下一关）
// ═══════════════════════════════════════════════════════════

export function ResultShell({
  wrongCount, total, elapsedMs, level, day, eyebrow, nextLabel, outroHook,
  onPersist, onRetry, onBack, onNext,
}: {
  wrongCount: number;
  /** 本关总题数，用于按正确率判星；缺省则退回按错题数 */
  total?: number;
  elapsedMs: number; level: ToriLevel; day: number;
  eyebrow: string;
  /** 有下一关则显示该按钮文案；null 则显示"回到日记" */
  nextLabel: string | null;
  /** 可选：Boss 通关后的下一段剧情钩子 */
  outroHook?: string;
  /** 落库；返回 false 时结算页进入"保存失败"态，不放行通关 */
  onPersist: (wrong: number, stars: ToriSubQuestStars) => Promise<boolean>;
  onRetry: () => void; onBack: () => void; onNext: () => void;
}) {
  const { lang } = useLang();
  const stars = total !== undefined ? starsFromScore(wrongCount, total) : starsFromWrong(wrongCount);
  const [litCount, setLitCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [saveState, setSaveState] = useState<'saving' | 'saved' | 'failed'>('saving');
  const persistingRef = useRef(false);

  const runPersist = useCallback(() => {
    if (persistingRef.current) return;
    persistingRef.current = true;
    setSaveState('saving');
    onPersist(wrongCount, stars).then((ok) => {
      setSaveState(ok ? 'saved' : 'failed');
    }).finally(() => {
      persistingRef.current = false;
    });
  }, [onPersist, wrongCount, stars]);

  useEffect(() => { runPersist(); }, [runPersist]);

  useEffect(() => {
    setLitCount(0);
    if (stars === 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < stars; i++) {
      timers.push(setTimeout(() => {
        setLitCount(i + 1);
        sfxChime(i === 0 ? 'low' : i === 1 ? 'mid' : 'high');
      }, 400 + i * 260));
    }
    if (stars === 3) {
      timers.push(setTimeout(() => { sfxCelebration(); setShowConfetti(true); }, 400 + 3 * 260 + 200));
      timers.push(setTimeout(() => setShowConfetti(false), 4000));
    }
    return () => timers.forEach(clearTimeout);
  }, [stars]);

  const seconds = Math.round(elapsedMs / 1000);
  const message = stars === 3 ? t('diary.sqs.msg3', lang)
    : stars === 2 ? t('diary.sqs.msg2', lang)
    : stars === 1 ? t('diary.sqs.msg1', lang)
    : t('diary.sqs.msg0', lang);

  return (
    <div style={{ padding: '10px 4px 6px', textAlign: 'center', position: 'relative' }}>
      {showConfetti && <Confetti count={20} />}
      <div style={{ fontSize: 11, color: 'var(--gold-deep)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 8 }}>
        {eyebrow}
      </div>
      <div style={{ margin: '22px 0 10px', display: 'flex', justifyContent: 'center', gap: 12 }}>
        {[0, 1, 2].map((i) => {
          const lit = i < litCount;
          return (
            <div key={i} className={`subquest-star-slot${lit ? ' is-lit' : ''}`}>
              <Star size={48} strokeWidth={1.4}
                fill={lit ? 'var(--gold)' : 'transparent'}
                color={lit ? 'var(--gold-deep)' : 'var(--line)'}
                className="subquest-star-icon" />
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 'var(--diary-text-xl)', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-zh)', marginTop: 6 }}>{message}</div>
      {outroHook && stars >= 1 && (
        <div style={{
          margin: '18px auto 0', maxWidth: 440,
          padding: '12px 16px',
          background: 'color-mix(in srgb, var(--gold) 8%, var(--paper))',
          border: '1px solid color-mix(in srgb, var(--gold) 28%, transparent)',
          borderRadius: 12, fontSize: 13, lineHeight: 1.7, color: 'var(--ink-2)',
          fontStyle: 'italic', textAlign: 'left',
        }}>
          {outroHook}
        </div>
      )}
      <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 26, fontSize: 12, color: 'var(--ink-3)' }}>
        <span>{t('diary.sqs.statWrong', lang)} · <b style={{ color: 'var(--ink)' }}>{wrongCount}</b></span>
        <span>{t('diary.sqs.statTime', lang)} · <b style={{ color: 'var(--ink)' }}>{seconds}s</b></span>
        <span>{t('diary.sqs.statStars', lang)} · <b style={{ color: 'var(--gold-deep)' }}>{stars}/3</b></span>
      </div>
      {stars >= 1 && saveState === 'failed' && (
        <div style={{
          margin: '20px auto 0', maxWidth: 440, padding: '14px 16px',
          background: 'color-mix(in srgb, var(--stamp) 8%, var(--paper))',
          border: '1px solid color-mix(in srgb, var(--stamp) 30%, transparent)',
          borderRadius: 12, textAlign: 'left',
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{t('diary.sqs.saveFailedTitle', lang)}</div>
          <div style={{ fontSize: 12, lineHeight: 1.7, color: 'var(--ink-2)' }}>{t('diary.sqs.saveFailedDesc', lang)}</div>
        </div>
      )}
      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {stars >= 1 && saveState === 'failed' ? (
          <button className="subquest-cta-primary" onClick={() => { sfxPop(); runPersist(); }}>
            <RefreshCcw size={16} style={{ marginRight: 6 }} />{t('diary.sqs.saveRetry', lang)}
          </button>
        ) : stars >= 1 && nextLabel ? (
          <button className="subquest-cta-primary" disabled={saveState === 'saving'} onClick={() => { sfxPop(); onNext(); }}>{saveState === 'saving' ? t('diary.sqs.saving', lang) : <>{nextLabel} <ArrowRight size={16} /></>}</button>
        ) : stars >= 1 ? (
          <button className="subquest-cta-primary" disabled={saveState === 'saving'} onClick={() => { sfxPop(); onBack(); }}>{saveState === 'saving' ? t('diary.sqs.saving', lang) : <>{t('diary.sqs.backToDiary', lang)} <ArrowRight size={16} /></>}</button>
        ) : (
          <button className="subquest-cta-primary" onClick={() => { sfxPop(); onRetry(); }}>{t('diary.sqs.tryAgain', lang)}</button>
        )}
        {stars >= 1 && nextLabel && saveState !== 'failed' && <button className="subquest-cta-ghost" onClick={() => { sfxPop(); onBack(); }}>{t('diary.sqs.backToDiary', lang)}</button>}
        {stars < 1 && <button className="subquest-cta-ghost" onClick={() => { sfxPop(); onBack(); }}>{t('diary.sqs.backToDiary', lang)}</button>}
        {stars >= 1 && saveState !== 'failed' && (
          <button className="subquest-cta-ghost" onClick={() => { sfxPop(); onRetry(); }}>
            <RefreshCcw size={14} style={{ marginRight: 6 }} />{t('diary.sqs.replayOnce', lang)}
          </button>
        )}
      </div>
      <div style={{ marginTop: 14, fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.06em' }}>
        {level === 'beginner' ? '이야기 하나' : level === 'intermediate' ? '이야기 둘' : '이야기 셋'} · Day {day}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SubQuestFrame · 双端外壳（手机 topbar+HUD+dots / 桌面 side+CarrotHelper 右栏）
// ═══════════════════════════════════════════════════════════

export interface FrameStep { key: string; label: string; en: string; }

export function SubQuestFrame({
  level, day, idx, koTitle, subtitle, kindLabel,
  steps, currentStepIdx, isResult,
  carrots, xp, onPhaseJump, children,
}: {
  level: ToriLevel; day: number; idx: number;
  koTitle: string; subtitle: string; kindLabel: string;
  steps: FrameStep[]; currentStepIdx: number; isResult: boolean;
  carrots: number; xp: number;
  onPhaseJump?: (stepKey: string) => void;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isDark = useIsDark();
  const { user } = useAuth();
  const { lang } = useLang();
  const isAdmin = user?.role === 'admin';
  const dayData = useMemo(() => getDay(level, day), [level, day]);

  const stepTitle = isResult ? t('diary.sqs.result', lang)
    : steps[currentStepIdx] ? steps[currentStepIdx].label : kindLabel;

  const canJump = (i: number) => isAdmin || (!isResult && i < currentStepIdx);

  const PhaseNav = ({ s, i, compact }: { s: FrameStep; i: number; compact?: boolean }) => {
    const done = !isResult && i < currentStepIdx;
    const cur = !isResult && i === currentStepIdx;
    const jumpable = canJump(i) && !!onPhaseJump;
    if (compact) {
      return (
        <div
          className={`subquest-phase-dot${done || isResult ? ' is-done' : ''}${cur ? ' is-current' : ''}${jumpable ? ' is-jumpable' : ''}`}
          onClick={jumpable ? () => onPhaseJump!(s.key) : undefined}
          style={jumpable ? { cursor: 'pointer' } : undefined}
          title={jumpable ? t('diary.sqs.jumpBack', lang, { label: s.label }) : undefined}
        >
          <span className="subquest-phase-dot-circle">{done || isResult ? '✓' : i + 1}</span>
          <span className="subquest-phase-dot-label">{s.label}</span>
        </div>
      );
    }
    return (
      <div
        key={s.key}
        className={`subquest-desk-phase-row${done || isResult ? ' is-done' : ''}${cur ? ' is-current' : ''}${jumpable ? ' is-jumpable' : ''}`}
        onClick={jumpable ? () => onPhaseJump!(s.key) : undefined}
        style={jumpable ? { cursor: 'pointer' } : undefined}
        title={jumpable ? t('diary.sqs.jumpBack', lang, { label: s.label }) : undefined}
      >
        <span className="subquest-desk-phase-num">{done || isResult ? '✓' : i + 1}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div>{s.label}</div>
          <div style={{ fontSize: 10, letterSpacing: '.1em', color: 'var(--ink-3)', textTransform: 'uppercase', marginTop: 2 }}>{s.en}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={`diary-compare subquest-root ${isDark ? 'D' : 'L'}`} style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
      {/* ─── 手机端 ─── */}
      <div className="phone">
        <div className="topbar">
          <button className="topbar-back" onClick={() => { sfxPop(); router.push('/diary'); }} aria-label={t('diary.sqs.back', lang)}>
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button className="topbar-home" onClick={() => { sfxPop(); router.push(`/diary/${level}/${day}`); }}>{t('diary.sqs.mainDay', lang)}</button>
          <button className="topbar-home" onClick={() => { sfxPop(); router.push('/daily'); }} aria-label={t('diary.sqs.backToHome', lang)} style={{ background: 'linear-gradient(135deg,#ff8fab,#ff6b8f)', color: '#fff', borderColor: '#ff6b8f', fontWeight: 700 }}>{t('diary.sqs.homeSite', lang)}</button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="topbar-day">Day {day} · 1-{idx} · {koTitle}</div>
            <div className="topbar-step">
              {isResult ? t('diary.sqs.result', lang) : t('diary.sqs.stepIndicator', lang, { cur: currentStepIdx + 1, total: steps.length, title: stepTitle })}
            </div>
          </div>
        </div>

        <div className="subquest-hud">
          <CarrotHUD carrots={carrots} xp={xp} />
        </div>

        <div className="scroll" style={{ padding: '0 0 calc(72px + env(safe-area-inset-bottom, 0px))' }}>
          {steps.length > 0 && (
            <div className="subquest-phase-dots">
              {steps.map((s, i) => <PhaseNav key={s.key} s={s} i={i} compact />)}
            </div>
          )}
          <div className="card">
            <span className="tape tape-tl" />
            <span className="tape tape-tr" />
            <span className="tag">{stepTitle}</span>
            <div className="diary-anim-fade-up">{children}</div>
          </div>
        </div>
      </div>

      {/* ─── 桌面端 ─── */}
      <div className="desktop">
        <div className="desk-side">
          <div className="desk-side-nav">
            <button className="desk-side-back" onClick={() => { sfxPop(); router.push('/diary'); }}>{t('diary.sqs.backToDiaryArrow', lang)}</button>
            <button className="desk-side-home" onClick={() => { sfxPop(); router.push(`/diary/${level}/${day}`); }} style={{ background: 'var(--paper-deep)', color: 'var(--ink-3)', border: '1px solid var(--line)', padding: '4px 12px', fontSize: 13, fontWeight: 400, boxShadow: 'none' }}>{t('diary.sqs.mainDay', lang)}</button>
            <button className="desk-side-home" onClick={() => { sfxPop(); router.push('/daily'); }} aria-label={t('diary.sqs.backToHome', lang)}>{t('diary.sqs.backToHomeSite', lang)}</button>
          </div>
          <div className="subquest-desk-side">
            <div>
              <div className="desk-side-day" style={{ fontSize: 22 }}>Day {day} · 1-{idx}</div>
              <div className="subquest-desk-side-title">{koTitle}</div>
              <div className="subquest-desk-side-sub">{subtitle}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CarrotHUD carrots={carrots} xp={xp} />
            </div>
            {steps.length > 0 && (
              <div className="subquest-desk-phase-list">
                {steps.map((s, i) => <PhaseNav key={s.key} s={s} i={i} />)}
              </div>
            )}
          </div>
        </div>

        <div className="desk-main">
          <div className="desk-eyebrow">Day {day} · {kindLabel} · {koTitle}</div>
          <div className="desk-main-h">{isResult ? t('diary.sqs.result', lang) : `${stepTitle}`}</div>
          <div className="desk-meta">
            <span>🎯 {subtitle}</span>
            <span>{t('diary.sqs.carrotsRemaining', lang, { n: carrots })}</span>
          </div>
          <div className="desk-content-grid">
            <div className="desk-col-left">
              <div className="card" style={{ margin: 0 }}>
                <span className="tape tape-tl" />
                <span className="tape tape-tr" />
                <span className="tag">{stepTitle}</span>
                <div className="diary-anim-fade-up">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 勇气胡萝卜 AI · 浮动按钮（手机+桌面通用），桌面右栏按钮 dispatch openCarrot 打开它 */}
      {dayData && <CarrotHelper day={dayData} currentModule="output" />}
    </div>
  );
}
