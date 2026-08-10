'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Loader2, Sparkles, Volume2 } from 'lucide-react';
import type { ToriDay, ToriCarrotMessage, ToriModuleKind } from '@/types/tori-diary';
import { pickGreeting, type CarrotProgressLike } from '@/lib/carrot-greeting';
import { speak } from '@/lib/tts';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/useToast';
import { sfxPop } from '@/lib/sfx';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

type CarrotProgress = CarrotProgressLike;

/** 从 carrotHint 提取「...」引号内的具体问题，做成当日定制建议；不足时用通用 fallback 补 */
function extractSuggestions(hint: string | undefined, fallback: string[]): string[] {
  if (!hint) return fallback;
  // 匹配 「...」『...』 中的话题（内容里可能含直引号 "..."，不切断）
  const matches = [...hint.matchAll(/[「『]([^「『」』]+)[」』]/g)].map((m) => m[1].trim()).filter(Boolean);
  if (matches.length === 0) return fallback;
  // 取前 3 条作为建议问题，不足 3 条用 fallback 补齐
  const out = matches.slice(0, 3);
  while (out.length < 3) out.push(fallback[out.length]);
  return out;
}

/** 把含韩文的纯文本拆成 [text, ko, text, ...] 段；连续韩文（≥1 字）后渲染小喇叭 */
function renderWithSpeakers(text: string, speakAria: string) {
  // 匹配连续韩文片段：完整音节 가-힯 + jamo ㄱ-㆏，允许中间空格
  const re = /[가-힯ㄱ-㆏](?:[가-힯ㄱ-㆏\s]*[가-힯ㄱ-㆏])?/g;
  const parts: Array<{ type: 'text' | 'ko'; value: string }> = [];
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIdx) parts.push({ type: 'text', value: text.slice(lastIdx, m.index) });
    parts.push({ type: 'ko', value: m[0] });
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < text.length) parts.push({ type: 'text', value: text.slice(lastIdx) });

  return parts.map((p, i) => {
    if (p.type === 'text') return <span key={i}>{p.value}</span>;
    return (
      <span key={i} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 3 }}>
        <span>{p.value}</span>
        <button
          onClick={(e) => { e.stopPropagation(); speak(p.value).catch(() => {}); }}
          aria-label={speakAria}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 4px',
            color: 'var(--color-pink-base)', display: 'inline-flex', alignItems: 'center',
            verticalAlign: 'middle', borderRadius: 4,
          }}
        >
          <Volume2 size={12} />
        </button>
      </span>
    );
  });
}

interface Props {
  [k: string]: unknown;
  day: ToriDay;
  currentModule: ToriModuleKind;
  progress?: CarrotProgress;
  locked?: boolean;
  lockedMsg?: string;
  inline?: boolean;
}

const MODULE_LABEL_KEYS: Record<ToriModuleKind, string> = {
  opening: 'carrot.module_opening',
  words: 'carrot.module_words',
  flashcard: 'carrot.module_flashcard',
  dialogue: 'carrot.module_dialogue',
  grammar: 'carrot.module_grammar',
  output: 'carrot.module_output',
  recap: 'carrot.module_recap',
};

const SUMMARY_TAG = '__summary__';
const SUMMARIZE_COOLDOWN_MS = 60_000;

/**
 * 勇气胡萝卜 AI 助手 — 悬浮按钮 + 抽屉面板
 * 历史 localStorage 持久化，最多保留 20 轮
 */
const CARROT_POS_KEY = 'carrot-pos';
const CARROT_FAB_SIZE = 56;

function clampCarrotPos(x: number, y: number) {
  return {
    x: Math.max(0, Math.min(x, window.innerWidth - CARROT_FAB_SIZE)),
    y: Math.max(0, Math.min(y, window.innerHeight - CARROT_FAB_SIZE)),
  };
}

export function CarrotHelper({ day, currentModule, progress, locked, lockedMsg, inline }: Props) {
  const { lang } = useLang();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [messages, setMessages] = useState<ToriCarrotMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lastSummarizeAt, setLastSummarizeAt] = useState(0);
  const [now, setNow] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  // ── 拖动（模仿 FeedbackButton 的可靠模式）──
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const posRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const dragging = useRef(false);
  const dragStart = useRef<{ mx: number; my: number; bx: number; by: number } | null>(null);
  const didDrag = useRef(false);
  const activeTouchId = useRef<number | null>(null);

  // 面板拖拽位置（独立于 fab 位置，未拖时用默认锚点）
  const [panelPos, setPanelPos] = useState<{ x: number; y: number } | null>(null);
  const panelPosRef = useRef<{ x: number; y: number } | null>(null);
  const panelDragging = useRef(false);
  const panelDragStart = useRef<{ mx: number; my: number; bx: number; by: number } | null>(null);
  const panelTouchId = useRef<number | null>(null);

  // 用户隔离：未登录就不持久化（messages 仅内存态）
  const storageKey = user?.id ? `tori-carrot-history-${user.id}-${day.day}` : '';

  useEffect(() => { setMounted(true); }, []);

  // 在途 AI 请求：卸载/切 Day 时中止，避免回来 setState 落到旧实例
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  // Initialize position after mount
  useEffect(() => {
    let saved: { x: number; y: number } | null = null;
    try {
      const raw = localStorage.getItem(CARROT_POS_KEY);
      if (raw) saved = JSON.parse(raw);
    } catch {}
    const initial = saved
      ? clampCarrotPos(saved.x, saved.y)
      : clampCarrotPos(window.innerWidth - CARROT_FAB_SIZE - 16, window.innerHeight - CARROT_FAB_SIZE - 72 - 16);
    posRef.current = initial;
    setPos(initial);
  }, []);

  // Frame-throttled position update
  const updatePos = useCallback((x: number, y: number) => {
    const clamped = clampCarrotPos(x, y);
    posRef.current = clamped;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      setPos(posRef.current);
    });
  }, []);

  const savePos = useCallback(() => {
    if (!posRef.current) return;
    try { localStorage.setItem(CARROT_POS_KEY, JSON.stringify(posRef.current)); } catch {}
  }, []);

  // Clamp on window resize
  useEffect(() => {
    const onResize = () => {
      if (!posRef.current) return;
      const clamped = clampCarrotPos(posRef.current.x, posRef.current.y);
      posRef.current = clamped;
      setPos(clamped);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Mouse drag (global listeners)
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current || !dragStart.current) return;
      const dx = e.clientX - dragStart.current.mx;
      const dy = e.clientY - dragStart.current.my;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDrag.current = true;
      updatePos(dragStart.current.bx + dx, dragStart.current.by + dy);
    };
    const onMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      dragStart.current = null;
      savePos();
      setTimeout(() => { didDrag.current = false; }, 0);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [updatePos, savePos]);

  // Touch drag：按需注册（vivo/华为自带浏览器对常驻 passive:false touchmove 会降级 native 滚动）
  // ref 保存最新回调，避免闭包过时
  const updatePosRef = useRef(updatePos);
  const savePosRef = useRef(savePos);
  useEffect(() => { updatePosRef.current = updatePos; savePosRef.current = savePos; }, [updatePos, savePos]);

  const touchMoveHandlerRef = useRef<((e: TouchEvent) => void) | null>(null);
  const touchEndHandlerRef = useRef<((e: TouchEvent) => void) | null>(null);
  useEffect(() => () => {
    if (touchMoveHandlerRef.current) window.removeEventListener('touchmove', touchMoveHandlerRef.current);
    if (touchEndHandlerRef.current) {
      window.removeEventListener('touchend', touchEndHandlerRef.current);
      window.removeEventListener('touchcancel', touchEndHandlerRef.current);
    }
  }, []);

  const onDragMouseDown = useCallback((e: React.MouseEvent) => {
    if (open) return;
    dragging.current = true;
    didDrag.current = false;
    dragStart.current = {
      mx: e.clientX, my: e.clientY,
      bx: posRef.current?.x ?? 0, by: posRef.current?.y ?? 0,
    };
    e.preventDefault();
  }, [open]);

  const onDragTouchStart = useCallback((e: React.TouchEvent) => {
    if (open) return;
    // 覆盖前先清理上一次挂载的（防重复挂载导致泄漏）
    if (touchMoveHandlerRef.current) window.removeEventListener('touchmove', touchMoveHandlerRef.current);
    if (touchEndHandlerRef.current) {
      window.removeEventListener('touchend', touchEndHandlerRef.current);
      window.removeEventListener('touchcancel', touchEndHandlerRef.current);
    }
    const touch = e.touches[0];
    activeTouchId.current = touch.identifier;
    dragging.current = true;
    didDrag.current = false;
    dragStart.current = {
      mx: touch.clientX, my: touch.clientY,
      bx: posRef.current?.x ?? 0, by: posRef.current?.y ?? 0,
    };
    // 按需挂载 window 监听器，松手立即卸
    const onMove = (ev: TouchEvent) => {
      if (!dragging.current || !dragStart.current) return;
      const t = activeTouchId.current !== null
        ? Array.from(ev.changedTouches).find(tt => tt.identifier === activeTouchId.current)
        : ev.touches[0];
      if (!t) return;
      const dx = t.clientX - dragStart.current.mx;
      const dy = t.clientY - dragStart.current.my;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDrag.current = true;
      if (didDrag.current) ev.preventDefault();
      updatePosRef.current(dragStart.current.bx + dx, dragStart.current.by + dy);
    };
    const cleanup = () => {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchcancel', onEnd);
      touchMoveHandlerRef.current = null;
      touchEndHandlerRef.current = null;
    };
    const onEnd = (ev: TouchEvent) => {
      const t = Array.from(ev.changedTouches).find(tt => tt.identifier === activeTouchId.current);
      if (!t) return; // 不是我们跟踪的手指，忽略
      cleanup();
      if (dragging.current) {
        dragging.current = false;
        dragStart.current = null;
        activeTouchId.current = null;
        savePosRef.current();
        setTimeout(() => { didDrag.current = false; }, 0);
      }
    };
    touchMoveHandlerRef.current = onMove;
    touchEndHandlerRef.current = onEnd;
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onEnd);
  }, [open]);

  const handleFabClick = useCallback(() => {
    if (didDrag.current) return;
    sfxPop();
    setOpen(true);
  }, []);

  // ── 面板拖拽（鼠标：常驻监听；触摸：按需注册，同上原因） ──
  const panelMoveCore = useCallback((clientX: number, clientY: number) => {
    if (!panelDragging.current || !panelDragStart.current) return;
    const dx = clientX - panelDragStart.current.mx;
    const dy = clientY - panelDragStart.current.my;
    const PANEL_W = Math.min(420, window.innerWidth - 32);
    const PANEL_H = Math.min(560, window.innerHeight - 160);
    const x = Math.max(0, Math.min(panelDragStart.current.bx + dx, window.innerWidth - PANEL_W));
    const y = Math.max(0, Math.min(panelDragStart.current.by + dy, window.innerHeight - PANEL_H));
    panelPosRef.current = { x, y };
    setPanelPos({ x, y });
  }, []);
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => panelMoveCore(e.clientX, e.clientY);
    const onEnd = () => {
      panelDragging.current = false;
      panelDragStart.current = null;
      panelTouchId.current = null;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
    };
  }, [panelMoveCore]);
  const panelTouchMoveRef = useRef<((e: TouchEvent) => void) | null>(null);
  const panelTouchEndRef = useRef<((e: TouchEvent) => void) | null>(null);
  useEffect(() => () => {
    if (panelTouchMoveRef.current) window.removeEventListener('touchmove', panelTouchMoveRef.current);
    if (panelTouchEndRef.current) {
      window.removeEventListener('touchend', panelTouchEndRef.current);
      window.removeEventListener('touchcancel', panelTouchEndRef.current);
    }
  }, []);

  const onPanelHeaderMouseDown = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).parentElement?.getBoundingClientRect();
    if (!rect) return;
    panelDragging.current = true;
    panelDragStart.current = { mx: e.clientX, my: e.clientY, bx: rect.left, by: rect.top };
    panelPosRef.current = { x: rect.left, y: rect.top };
    setPanelPos({ x: rect.left, y: rect.top });
    e.preventDefault();
  }, []);

  const onPanelHeaderTouchStart = useCallback((e: React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).parentElement?.getBoundingClientRect();
    if (!rect) return;
    // 覆盖前先清理上一次
    if (panelTouchMoveRef.current) window.removeEventListener('touchmove', panelTouchMoveRef.current);
    if (panelTouchEndRef.current) {
      window.removeEventListener('touchend', panelTouchEndRef.current);
      window.removeEventListener('touchcancel', panelTouchEndRef.current);
    }
    const t = e.touches[0];
    panelTouchId.current = t.identifier;
    panelDragging.current = true;
    panelDragStart.current = { mx: t.clientX, my: t.clientY, bx: rect.left, by: rect.top };
    panelPosRef.current = { x: rect.left, y: rect.top };
    setPanelPos({ x: rect.left, y: rect.top });
    // 按需挂载 window touchmove/touchend，松手立即卸
    const onMove = (ev: TouchEvent) => {
      const touch = Array.from(ev.changedTouches).find(x => x.identifier === panelTouchId.current) || ev.touches[0];
      if (!touch) return;
      if (panelDragging.current) ev.preventDefault();
      panelMoveCore(touch.clientX, touch.clientY);
    };
    const cleanup = () => {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchcancel', onEnd);
      panelTouchMoveRef.current = null;
      panelTouchEndRef.current = null;
    };
    const onEnd = (ev: TouchEvent) => {
      const touch = Array.from(ev.changedTouches).find(x => x.identifier === panelTouchId.current);
      if (!touch) return;
      cleanup();
      panelDragging.current = false;
      panelDragStart.current = null;
      panelTouchId.current = null;
    };
    panelTouchMoveRef.current = onMove;
    panelTouchEndRef.current = onEnd;
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onEnd);
  }, [panelMoveCore]);

  // 重新打开面板时重置位置到默认锚点
  useEffect(() => {
    if (!open) {
      setPanelPos(null);
      panelPosRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('openCarrot', handler);
    return () => window.removeEventListener('openCarrot', handler);
  }, []);

  // 加载历史（用户切换时也会触发 — storageKey 变了）
  useEffect(() => {
    if (!mounted) return;
    if (!storageKey) { setMessages([]); return; }
    try {
      const raw = localStorage.getItem(storageKey);
      setMessages(raw ? JSON.parse(raw) : []);
    } catch { setMessages([]); }
  }, [mounted, storageKey]);

  // 保存历史
  useEffect(() => {
    if (!mounted || !storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages.slice(-20)));
    } catch { /* ignore */ }
  }, [messages, storageKey, mounted]);

  // 滚到底部
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  // 节流倒计时刷新
  useEffect(() => {
    if (!lastSummarizeAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [lastSummarizeAt]);

  const cooldownLeft = useMemo(() => {
    if (!lastSummarizeAt) return 0;
    return Math.max(0, SUMMARIZE_COOLDOWN_MS - (now - lastSummarizeAt));
  }, [lastSummarizeAt, now]);

  const canSummarize = !loading && cooldownLeft === 0 && progress !== undefined;

  const greeting = useMemo(() => pickGreeting(day.day, lang, progress), [day.day, lang, progress]);

  const buildContext = () => ({
    day: day.day,
    module: t(MODULE_LABEL_KEYS[currentModule], 'zh'),  // 发给 AI 的上下文固定中文
    dayTitle: day.title,
    dayHint: day.carrotHint,
    ...progress,
  });

  // 输入框 placeholder 用当天的引导提示；过长部分浏览器自动以省略号显示
  const inputPlaceholder = useMemo(() => {
    if (locked) return t('carrot.input_placeholder', lang);
    return day.carrotHint?.trim() || t('carrot.input_placeholder', lang);
  }, [day.carrotHint, locked, lang]);

  // 当日建议问题：从 carrotHint 提取引号内的话题，不足回退通用
  const suggestions = useMemo(
    () => extractSuggestions(day.carrotHint, [t('carrot.q_grammar', lang), t('carrot.q_correct', lang), t('carrot.q_meaning', lang)]),
    [day.carrotHint, lang]
  );

  const handleSend = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    const newUserMsg: ToriCarrotMessage = { role: 'user', text: userText, ts: Date.now() };
    setMessages((m) => [...m, newUserMsg]);
    setInput('');
    setLoading(true);

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const resp = await fetch('/api/ai/carrot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctrl.signal,
        body: JSON.stringify({
          userMessage: userText,
          history: messages.slice(-10).map((m) => ({
            ...m,
            text: m.text.startsWith(SUMMARY_TAG) ? m.text.slice(SUMMARY_TAG.length) : m.text,
          })),
          context: buildContext(),
        }),
      });
      if (!resp.ok) {
        // AI 不可用：撤回用户消息，让用户能重试（不塞假回答）
        setMessages((m) => m.filter((x) => x !== newUserMsg));
        setInput(userText);
        showToast(t('carrot.err_distracted', lang), 'error');
        return;
      }
      const data = await resp.json();
      if (data.reply) {
        setMessages((m) => [...m, { role: 'tori', text: data.reply, ts: Date.now() }]);
      } else {
        setMessages((m) => m.filter((x) => x !== newUserMsg));
        setInput(userText);
        showToast(t('carrot.err_distracted', lang), 'error');
      }
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return; // 卸载中止，不动已消失的 UI
      // 网络异常：撤回用户消息，把输入填回去让用户重发
      setMessages((m) => m.filter((x) => x !== newUserMsg));
      setInput(userText);
      showToast(t('carrot.err_network', lang), 'error');
    } finally {
      if (abortRef.current === ctrl) abortRef.current = null;
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!canSummarize) return;
    setLastSummarizeAt(Date.now());
    setNow(Date.now());
    setLoading(true);
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const resp = await fetch('/api/ai/carrot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctrl.signal,
        body: JSON.stringify({
          summarize: true,
          context: buildContext(),
        }),
      });
      if (!resp.ok) {
        // 总结失败 — 不塞假总结，让用户看到操作没生效，cooldown 也撤回让用户能马上重试
        setLastSummarizeAt(0);
        showToast(t('carrot.err_summary', lang), 'error');
        return;
      }
      const data = await resp.json();
      if (data.reply) {
        setMessages((m) => [...m, { role: 'tori', text: `${SUMMARY_TAG}${data.reply}`, ts: Date.now() }]);
      } else {
        setLastSummarizeAt(0);
        showToast(t('carrot.err_summary', lang), 'error');
      }
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
      setLastSummarizeAt(0);
      showToast(t('carrot.err_network', lang), 'error');
    } finally {
      if (abortRef.current === ctrl) abortRef.current = null;
      setLoading(false);
    }
  };

  if (!mounted) return null;

  // ═══ 桌面常开模式 — 直接渲染，不用 portal，无浮动按钮 ═══
  if (inline) {
    if (locked) {
      return (
        <div style={{ padding: 20, textAlign: 'center', color: 'var(--diary-ink-faint)', fontSize: 13, fontFamily: "'Inter',sans-serif" }}>
          🎒 {lockedMsg ?? t('carrot.locked_default', lang)}
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--diary-paper)', borderRadius: 18, border: '1px solid var(--diary-line)', overflow: 'hidden', maxHeight: 520, minHeight: 360 }}>
        {/* 头部 */}
        <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--diary-line)', background: 'var(--diary-gold-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>🥕</span>
            <span style={{ fontFamily: 'var(--diary-font-zh)', fontSize: 15, fontWeight: 700, color: 'var(--diary-ink)' }}>{t('carrot.name', lang)}</span>
          </div>
          <button
            onClick={handleSummarize}
            disabled={!canSummarize}
            title={progress === undefined ? t('carrot.summary_loading', lang) : cooldownLeft > 0 ? t('carrot.summary_cooldown', lang, { n: Math.ceil(cooldownLeft / 1000) }) : t('carrot.summary_tip', lang)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', fontSize: 12, fontWeight: 600, color: canSummarize ? 'var(--diary-gold-deep)' : 'var(--diary-ink-faint)', background: canSummarize ? 'var(--diary-gold-soft)' : 'var(--diary-paper-deep)', border: '1px solid var(--diary-gold)', borderRadius: 999, cursor: canSummarize ? 'pointer' : 'not-allowed' }}
          >
            <Sparkles size={12} /> {cooldownLeft > 0 ? `${Math.ceil(cooldownLeft / 1000)}s` : t('carrot.summary', lang)}
          </button>
        </div>

        {/* 对话区 */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <span style={{ fontSize: 32 }}>🥕</span>
              <p className="diary-handwriting-zh" style={{ fontSize: 13, color: 'var(--diary-ink-soft)', margin: '10px 0', lineHeight: 1.8, padding: '0 4px' }}>{greeting}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
                {suggestions.map((q) => (
                  <button key={q} onClick={() => handleSend(q)} className="diary-handwriting-zh"
                    style={{ padding: '8px 12px', fontSize: 12, color: 'var(--diary-ink)', background: 'var(--diary-paper-deep)', border: '1px solid var(--diary-line)', borderRadius: 999, cursor: 'pointer', textAlign: 'left' }}>{q}</button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, idx) => {
            const isSummary = m.role === 'tori' && m.text.startsWith(SUMMARY_TAG);
            const displayText = isSummary ? m.text.slice(SUMMARY_TAG.length) : m.text;
            return (
              <div key={idx} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '88%', padding: '8px 12px', borderRadius: 12, background: m.role === 'user' ? 'var(--diary-ink)' : 'var(--diary-paper-deep)', color: m.role === 'user' ? 'var(--diary-paper)' : 'var(--diary-ink)', fontSize: 13, lineHeight: 1.65, border: m.role === 'tori' ? '1px solid var(--diary-line)' : 'none' }}
                className={m.role === 'tori' ? 'diary-handwriting-zh' : ''}>
                {isSummary && <div style={{ fontSize: 11, color: 'var(--diary-gold-deep)', fontWeight: 700, marginBottom: 4 }}>{t('carrot.recap_title', lang)}</div>}
                <span style={{ whiteSpace: 'pre-wrap' }}>{m.role === 'tori' ? renderWithSpeakers(displayText, t('carrot.speak_aria', lang)) : displayText}</span>
              </div>
            );
          })}
          {loading && (
            <div style={{ alignSelf: 'flex-start', padding: '8px 12px', background: 'var(--diary-paper-deep)', border: '1px solid var(--diary-line)', borderRadius: 12, color: 'var(--diary-ink-faint)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Loader2 size={12} className="animate-spin" /> {t('carrot.thinking', lang)}
            </div>
          )}
        </div>

        {/* 输入区 */}
        <div style={{ padding: '10px 14px', borderTop: '1px solid var(--diary-line)', display: 'flex', gap: 8, background: 'var(--diary-paper)', flexShrink: 0 }}>
          <input
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder={inputPlaceholder} disabled={loading}
            style={{ flex: 1, padding: '8px 14px', fontSize: 13, background: 'var(--diary-paper-deep)', border: '1px solid var(--diary-line)', borderRadius: 999, outline: 'none', color: 'var(--diary-ink)', fontFamily: "'Inter',sans-serif" }}
          />
          <button onClick={() => handleSend()} disabled={!input.trim() || loading}
            style={{ width: 36, height: 36, borderRadius: '50%', background: input.trim() && !loading ? 'var(--diary-ink)' : 'var(--diary-line)', color: 'var(--diary-paper)', border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Send size={14} />
          </button>
        </div>
      </div>
    );
  }

  if (locked) {
    return createPortal(
      <div className="diary-root" style={{ display: 'contents' }}>
        <button
          onClick={() => showToast(lockedMsg ?? t('carrot.locked_toast', lang), 'info')}
          aria-label={t('carrot.gone_aria', lang)}
          style={{
            position: 'fixed', right: 16,
            bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
            zIndex: 250, width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(80,70,70,0.55)', border: '1.5px dashed rgba(255,255,255,0.18)',
            color: 'rgba(255,255,255,0.35)', fontSize: 26, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          🎒
        </button>
      </div>,
      document.body
    );
  }

  return createPortal(
    // portal 挂到 body，脱离 .diary-root；包一层 diary-root(display:contents 不影响布局)
    // 让 var(--diary-*) 能解析，[data-theme=dark] .diary-root 也能命中，暗色才生效
    <div className="diary-root" style={{ display: 'contents' }}>
      {/* 浮按钮 */}
      {!open && !hidden && pos !== null && (
        <div
          className="carrot-fab-wrap"
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            zIndex: 250,
            touchAction: 'none',
          }}
        >
          <button
            ref={fabRef}
            onMouseDown={onDragMouseDown}
            onTouchStart={onDragTouchStart}
            onClick={handleFabClick}
            aria-label={t('carrot.fab_aria', lang)}
            className="carrot-fab"
            style={{
              width: CARROT_FAB_SIZE, height: CARROT_FAB_SIZE, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff9d4a, #ffc070)',
              border: 'none',
              boxShadow: '0 8px 22px rgba(255, 157, 74, 0.42)',
              color: '#fff', fontSize: 28,
              cursor: 'grab',
              touchAction: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
          >🥕</button>
        </div>
      )}
      {/* 隐藏后的恢复小点 */}
      {hidden && !open && (
        <div
          style={{
            position: 'fixed',
            right: 8,
            bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
            zIndex: 249,
            width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(80,70,70,0.3)',
            border: 'none', cursor: 'pointer',
          }}
          onClick={() => setHidden(false)}
          title={t('carrot.restore_aria', lang)}
          aria-label={t('carrot.restore_aria', lang)}
        />
      )}

      {/* 抽屉（无遮罩，不阻塞正文交互） */}
      {open && (
        <>
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: 'fixed',
              ...(panelPos
                ? { left: panelPos.x, top: panelPos.y }
                : { right: 16, bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }),
              zIndex: 250,
              width: 'min(420px, calc(100vw - 32px))',
              height: 'min(560px, calc(100vh - 160px))',
              background: 'var(--diary-paper-deep)',
              borderRadius: 24,
              boxShadow: '0 24px 56px rgba(58, 42, 30, 0.32)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid var(--diary-line)',
            }}
          >
            {/* 头部（可拖拽） */}
            <div
              onMouseDown={onPanelHeaderMouseDown}
              onTouchStart={onPanelHeaderTouchStart}
              style={{
                padding: '14px 18px',
                borderBottom: '1px solid var(--diary-line)',
                background: 'linear-gradient(135deg, var(--diary-paper-deep), var(--diary-paper))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'grab',
                touchAction: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>🥕</span>
                <div>
                  <p
                    className="diary-handwriting-zh"
                    style={{ fontSize: 14, fontWeight: 700, color: 'var(--diary-ink)', margin: 0 }}
                  >
                    {t('carrot.name', lang)}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--diary-ink-soft)', margin: 0 }}>
                    {t('carrot.tagline', lang)}
                  </p>
                </div>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleSummarize}
                  disabled={!canSummarize}
                  title={
                    progress === undefined
                      ? t('carrot.summary_loading_full', lang)
                      : cooldownLeft > 0
                      ? t('carrot.summary_cooldown', lang, { n: Math.ceil(cooldownLeft / 1000) })
                      : t('carrot.summary_tip_full', lang)
                  }
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '5px 11px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: canSummarize ? 'var(--diary-gold-deep)' : 'var(--diary-ink-faint)',
                    background: canSummarize ? 'rgba(200,153,91,0.14)' : 'rgba(200,153,91,0.06)',
                    border: '1px solid var(--diary-gold)',
                    borderRadius: 999,
                    cursor: canSummarize ? 'pointer' : 'not-allowed',
                    transition: 'background 0.15s',
                  }}
                >
                  <Sparkles size={11} />
                  {cooldownLeft > 0 ? `${Math.ceil(cooldownLeft / 1000)}s` : t('carrot.summary', lang)}
                </button>
                <button
                  onClick={() => { sfxPop(); setOpen(false); }}
                  style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'transparent', border: 'none',
                    color: 'var(--diary-ink-soft)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  aria-label={t('carrot.close_aria', lang)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 对话区 */}
            <div
              ref={scrollRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <span style={{ fontSize: 32 }}>🥕</span>
                  <p
                    className="diary-handwriting-zh"
                    style={{ fontSize: 13, color: 'var(--diary-ink)', margin: '12px 0', lineHeight: 1.7, padding: '0 12px' }}
                  >
                    {greeting}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
                    {suggestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSend(q)}
                        className="diary-handwriting-zh"
                        style={{
                          padding: '7px 12px',
                          fontSize: 12,
                          color: 'var(--diary-ink)',
                          background: 'var(--diary-paper-deep)',
                          border: '1px solid var(--diary-gold)',
                          borderRadius: 999,
                          cursor: 'pointer',
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, idx) => {
                const isSummary = m.role === 'tori' && m.text.startsWith(SUMMARY_TAG);
                if (isSummary) {
                  return (
                    <div
                      key={idx}
                      style={{
                        alignSelf: 'flex-start',
                        maxWidth: '92%',
                        background: 'var(--diary-paper-deep)',
                        borderLeft: '3px solid var(--diary-gold)',
                        border: '1px solid var(--diary-line)',
                        borderLeftWidth: 3,
                        borderLeftColor: 'var(--diary-gold)',
                        borderRadius: '4px 14px 14px 4px',
                        padding: '10px 12px 10px 14px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          color: 'var(--diary-gold-deep)',
                          fontWeight: 700,
                          letterSpacing: 0.4,
                          marginBottom: 4,
                        }}
                      >
                        {t('carrot.recap_title', lang)}
                      </div>
                      <div
                        className="diary-handwriting-zh"
                        style={{
                          fontSize: 13,
                          lineHeight: 1.6,
                          color: 'var(--diary-ink)',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {renderWithSpeakers(m.text.slice(SUMMARY_TAG.length), t('carrot.speak_aria', lang))}
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={idx}
                    style={{
                      alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      padding: '8px 12px',
                      borderRadius: 14,
                      background: m.role === 'user' ? 'var(--diary-ink)' : 'var(--diary-paper-deep)',
                      color: m.role === 'user' ? 'var(--diary-paper)' : 'var(--diary-ink)',
                      fontSize: 13,
                      lineHeight: 1.6,
                      border: m.role === 'tori' ? '1px solid var(--diary-line)' : 'none',
                      whiteSpace: 'pre-wrap',
                    }}
                    className={m.role === 'tori' ? 'diary-handwriting-zh' : ''}
                  >
                    {m.role === 'tori' ? renderWithSpeakers(m.text, t('carrot.speak_aria', lang)) : m.text}
                  </div>
                );
              })}

              {loading && (
                <div
                  style={{
                    alignSelf: 'flex-start',
                    padding: '8px 12px',
                    background: 'var(--diary-paper-deep)',
                    border: '1px solid var(--diary-line)',
                    borderRadius: 14,
                    color: 'var(--diary-ink-soft)',
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Loader2 size={12} className="animate-spin" />
                  {t('carrot.thinking', lang)}
                </div>
              )}
            </div>

            {/* 输入区 */}
            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid var(--diary-line)',
                display: 'flex',
                gap: 8,
                background: 'var(--diary-paper-deep)',
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={inputPlaceholder}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '8px 14px',
                  fontSize: 13,
                  background: 'var(--diary-paper-deep)',
                  border: '1px solid var(--diary-line)',
                  borderRadius: 999,
                  outline: 'none',
                  color: 'var(--diary-ink)',
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: input.trim() && !loading ? 'var(--diary-ink)' : 'var(--diary-ink-faint)',
                  color: 'var(--diary-paper)',
                  border: 'none',
                  cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
                aria-label={t('carrot.send_aria', lang)}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>,
    document.body
  );
}
