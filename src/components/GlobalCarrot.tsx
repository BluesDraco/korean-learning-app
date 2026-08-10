'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Loader2, Volume2, MessageCircle, BookText, Braces, SpellCheck, Trash2, Copy, RotateCcw, Square, Check, Plus } from 'lucide-react';
import type { ToriCarrotMessage } from '@/types/tori-diary';
import { speak } from '@/lib/tts';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/useToast';
import { sfxPop } from '@/lib/sfx';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';
import './carrot.css';

type CarrotMode = 'chat' | 'lookup' | 'grammar' | 'correct';

interface LookupCard {
  [k: string]: unknown;
  korean: string;
  romanization: string;
  meanings: { chinese: string; partOfSpeech: string }[];
  baseForm?: string;
  inflectionNote?: string;
  examples: { korean: string; chinese: string }[];
}
interface GrammarCard {
  [k: string]: unknown;
  skeleton: { subject: string; predicate: string; object: string };
  translation: string;
  particles: { text: string; role: string }[];
  endings: { text: string; base: string; meaning: string }[];
  pitfalls: string[];
}
type CarrotMsg = ToriCarrotMessage & {
  kind?: 'text' | 'lookup' | 'grammar' | 'correct';
  card?: LookupCard | GrammarCard;
};

/** 把含韩文的纯文本拆段，连续韩文后渲染小喇叭（与日记版一致） */
function renderWithSpeakers(text: string, speakAria: string) {
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
          className="carrot-speak-btn"
        >
          <Volume2 size={12} />
        </button>
      </span>
    );
  });
}

const CARROT_POS_KEY = 'carrot-global-pos';
const CARROT_FAB_SIZE = 56;

function clampCarrotPos(x: number, y: number) {
  return {
    x: Math.max(0, Math.min(x, window.innerWidth - CARROT_FAB_SIZE)),
    y: Math.max(0, Math.min(y, window.innerHeight - CARROT_FAB_SIZE)),
  };
}

/**
 * 全站通用勇气胡萝卜 AI 助手 — 悬浮按钮 + 抽屉面板
 * 与日记版共用抽屉 UI + 拖拽逻辑，但不依赖 ToriDay：上下文只传板块名。
 * 历史按 userId 全局单 key 持久化，最多 20 轮；仅登录用户可见。
 */
export function GlobalCarrot({ sectionName }: { sectionName: string }) {
  const { lang } = useLang();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [messages, setMessages] = useState<CarrotMsg[]>([]);
  const [mode, setMode] = useState<CarrotMode>('chat');
  const [input, setInput] = useState('');
  const [copiedTs, setCopiedTs] = useState<number | null>(null);
  const [selChip, setSelChip] = useState<{ x: number; y: number; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  // 面板拖拽位置（独立于 fab）
  const [panelPos, setPanelPos] = useState<{ x: number; y: number } | null>(null);
  const panelPosRef = useRef<{ x: number; y: number } | null>(null);
  const panelDragging = useRef(false);
  const panelDragStart = useRef<{ mx: number; my: number; bx: number; by: number } | null>(null);
  const panelTouchId = useRef<number | null>(null);

  // 用户隔离：未登录不持久化（messages 仅内存态）
  const storageKey = user?.id ? `tori-carrot-global-${user.id}` : '';

  useEffect(() => { setMounted(true); }, []);

  // 在途 AI 请求：卸载时中止
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  // 初始化位置（右下角，避让底部导航）
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

  // Mouse drag
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

  // Touch drag：按需注册
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
    const onMove = (ev: TouchEvent) => {
      if (!dragging.current || !dragStart.current) return;
      const tt = activeTouchId.current !== null
        ? Array.from(ev.changedTouches).find((x) => x.identifier === activeTouchId.current)
        : ev.touches[0];
      if (!tt) return;
      const dx = tt.clientX - dragStart.current.mx;
      const dy = tt.clientY - dragStart.current.my;
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
      const tt = Array.from(ev.changedTouches).find((x) => x.identifier === activeTouchId.current);
      if (!tt) return;
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

  // ── 面板拖拽 ──
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
    if (panelTouchMoveRef.current) window.removeEventListener('touchmove', panelTouchMoveRef.current);
    if (panelTouchEndRef.current) {
      window.removeEventListener('touchend', panelTouchEndRef.current);
      window.removeEventListener('touchcancel', panelTouchEndRef.current);
    }
    const touch = e.touches[0];
    panelTouchId.current = touch.identifier;
    panelDragging.current = true;
    panelDragStart.current = { mx: touch.clientX, my: touch.clientY, bx: rect.left, by: rect.top };
    panelPosRef.current = { x: rect.left, y: rect.top };
    setPanelPos({ x: rect.left, y: rect.top });
    const onMove = (ev: TouchEvent) => {
      const tt = Array.from(ev.changedTouches).find((x) => x.identifier === panelTouchId.current) || ev.touches[0];
      if (!tt) return;
      if (panelDragging.current) ev.preventDefault();
      panelMoveCore(tt.clientX, tt.clientY);
    };
    const cleanup = () => {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchcancel', onEnd);
      panelTouchMoveRef.current = null;
      panelTouchEndRef.current = null;
    };
    const onEnd = (ev: TouchEvent) => {
      const tt = Array.from(ev.changedTouches).find((x) => x.identifier === panelTouchId.current);
      if (!tt) return;
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

  // 关闭时重置面板位置
  useEffect(() => {
    if (!open) {
      setPanelPos(null);
      panelPosRef.current = null;
    }
  }, [open]);

  // openCarrot 事件打开面板；可携带 detail:{text, mode} 用于划词直查
  const handleSendRef = useRef<(text?: string, overrideMode?: CarrotMode, histOverride?: CarrotMsg[]) => void>(() => {});
  useEffect(() => {
    const handler = (e: Event) => {
      setOpen(true);
      setHidden(false);
      const detail = (e as CustomEvent).detail as { text?: string; mode?: CarrotMode } | undefined;
      if (detail?.mode) setMode(detail.mode);
      if (detail?.text) {
        const m = detail.mode ?? 'lookup';
        setTimeout(() => handleSendRef.current(detail.text, m), 0);
      }
    };
    window.addEventListener('openCarrot', handler);
    return () => window.removeEventListener('openCarrot', handler);
  }, []);

  // 划词：选中含韩文的文本 → 冒出「查词」小气泡
  useEffect(() => {
    const onSelChange = () => {
      const sel = window.getSelection();
      const text = sel?.toString().trim() ?? '';
      // 面板打开时不干扰；无韩文/过长不弹
      if (!text || open || text.length > 40 || !/[가-힣]/.test(text)) { setSelChip(null); return; }
      // 忽略在助手面板内的选择
      const node = sel?.anchorNode as HTMLElement | null;
      const el = node?.nodeType === 1 ? node : node?.parentElement;
      if (el?.closest?.('.carrot-scope')) { setSelChip(null); return; }
      try {
        const rect = sel!.getRangeAt(0).getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) { setSelChip(null); return; }
        setSelChip({
          x: Math.min(rect.left + rect.width / 2, window.innerWidth - 60),
          y: Math.max(rect.top - 8, 40),
          text,
        });
      } catch { setSelChip(null); }
    };
    document.addEventListener('selectionchange', onSelChange);
    return () => document.removeEventListener('selectionchange', onSelChange);
  }, [open]);

  // 加载历史
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

  // 空状态随 tab 变化：各自的引导语 + 可点即发的示例
  const emptyState = useMemo(() => {
    switch (mode) {
      case 'lookup':
        return { desc: t('carrot.empty_lookup', lang), chips: ['설레다', '괜찮아요', '먹다'] };
      case 'grammar':
        return { desc: t('carrot.empty_grammar', lang), chips: ['저는 학생이에요', '밥을 먹고 있어요'] };
      case 'correct':
        return { desc: t('carrot.empty_correct', lang), chips: ['나는 학교에 가요', '어제 친구를 만나요'] };
      default:
        return {
          desc: t('carrot.empty_chat', lang, { section: sectionName }),
          chips: [t('carrot.ex_chat_1', lang), t('carrot.ex_chat_2', lang)],
        };
    }
  }, [mode, lang, sectionName]);

  const MODES: { id: CarrotMode; labelKey: string; icon: typeof MessageCircle }[] = useMemo(() => [
    { id: 'chat', labelKey: 'carrot.tab_chat', icon: MessageCircle },
    { id: 'lookup', labelKey: 'carrot.tab_lookup', icon: BookText },
    { id: 'grammar', labelKey: 'carrot.tab_grammar', icon: Braces },
    { id: 'correct', labelKey: 'carrot.tab_correct', icon: SpellCheck },
  ], []);

  const placeholder = useMemo(() => {
    switch (mode) {
      case 'lookup': return t('carrot.ph_lookup', lang);
      case 'grammar': return t('carrot.ph_grammar', lang);
      case 'correct': return t('carrot.ph_correct', lang);
      default: return t('carrot.input_placeholder', lang);
    }
  }, [mode, lang]);

  // 闲聊：走 SSE 流式，逐块追加到占位气泡
  const sendChat = async (userText: string, ctrl: AbortController, hist: CarrotMsg[]) => {
    const resp = await fetch('/api/ai/carrot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: ctrl.signal,
      body: JSON.stringify({
        userMessage: userText,
        mode: 'general',
        history: hist.filter((m) => m.text.trim()).slice(-10).map((m) => ({ role: m.role, text: m.text })),
        context: { module: sectionName },
        stream: true,
      }),
    });
    if (!resp.ok || !resp.body) throw new Error('bad-response');

    const streamTs = Date.now();
    setMessages((m) => [...m, { role: 'tori', text: '', ts: streamTs, kind: 'text' }]);

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let acc = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      acc += decoder.decode(value, { stream: true });
      setMessages((m) => m.map((x) =>
        x.role === 'tori' && x.ts === streamTs && x.kind === 'text' ? { ...x, text: acc } : x,
      ));
    }
    if (!acc.trim()) {
      setMessages((m) => m.filter((x) => !(x.role === 'tori' && x.ts === streamTs)));
      throw new Error('empty');
    }
  };

  // 结构化模式：查词 / 拆语法 / 纠错
  const sendStructured = async (userText: string, ctrl: AbortController, effMode: CarrotMode) => {
    const url = effMode === 'lookup' ? '/api/ai/word-lookup' : '/api/ai/grammar-explain';
    const body = effMode === 'lookup' ? { input: userText } : { sentence: userText };
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: ctrl.signal,
      body: JSON.stringify(body),
    });
    const data = await resp.json().catch(() => null);
    if (resp.status === 429) throw new Error('quota');
    if (!resp.ok || !data) throw new Error(data?.error || 'bad-response');

    const kind: CarrotMsg['kind'] = effMode === 'lookup' ? 'lookup' : effMode === 'correct' ? 'correct' : 'grammar';
    setMessages((m) => [...m, { role: 'tori', text: '', ts: Date.now(), kind, card: data }]);
  };

  // text: 指定发送内容（划词/重发）；overrideMode: 指定模式（划词跳过 setMode 异步）
  // histOverride: 指定闲聊上下文（重新生成时避免读到闭包里的陈旧 messages）
  const handleSend = async (text?: string, overrideMode?: CarrotMode, histOverride?: CarrotMsg[]) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    const effMode = overrideMode ?? mode;

    // 语法/纠错要求韩文输入
    if ((effMode === 'grammar' || effMode === 'correct') && !/[가-힣]/.test(userText)) {
      showToast(t('carrot.err_input_ko', lang), 'error');
      return;
    }

    const newUserMsg: CarrotMsg = { role: 'user', text: userText, ts: Date.now(), kind: 'text' };
    // hist 为闲聊上下文：优先用调用方传入的（重新生成场景），否则取当前 messages
    const hist = histOverride ?? messages;
    setMessages((m) => [...m, newUserMsg]);
    setInput('');
    setLoading(true);

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      if (effMode === 'chat') await sendChat(userText, ctrl, hist);
      else await sendStructured(userText, ctrl, effMode);
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
      const reason = (err as Error)?.message;
      // 回滚：移除本次 user 气泡与可能的空占位
      setMessages((m) => m.filter((x) => x !== newUserMsg && !(x.role === 'tori' && x.kind === 'text' && !x.text)));
      setInput(userText);
      if (reason === 'quota') showToast(t('carrot.err_quota', lang), 'error');
      else if (reason === 'empty') showToast(t('carrot.err_distracted', lang), 'error');
      else showToast(t('carrot.err_network', lang), 'error');
    } finally {
      if (abortRef.current === ctrl) abortRef.current = null;
      setLoading(false);
    }
  };

  handleSendRef.current = handleSend;

  // 停止流式：abort 当前请求，清理可能残留的空 tori 气泡
  const handleStop = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setLoading(false);
    setMessages((m) => m.filter((x) => !(x.role === 'tori' && x.kind === 'text' && !x.text.trim())));
  };

  // 重新生成：砍掉末尾的 tori 回复 + 对应 user 消息，再用该 user 内容重发
  const handleRegenerate = () => {
    if (loading) return;
    let lastUserText = '';
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') { lastUserText = messages[i].text; break; }
    }
    if (!lastUserText) return;
    // 裁剪：移除末尾连续 tori + 对应 user，得到重发前的干净历史
    const trimmed = [...messages];
    while (trimmed.length && trimmed[trimmed.length - 1].role === 'tori') trimmed.pop();
    if (trimmed.length && trimmed[trimmed.length - 1].role === 'user') trimmed.pop();
    setMessages(trimmed);
    // 显式传入裁剪后的历史，避免 handleSend 读到闭包里的陈旧 messages
    setTimeout(() => handleSend(lastUserText, undefined, trimmed), 0);
  };

  // 清空对话
  const handleClear = () => {
    setMessages([]);
    if (storageKey) { try { localStorage.removeItem(storageKey); } catch {} }
  };

  // 复制回复（按 message.ts 标记复制态）
  const copyText = (text: string, ts?: number) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedTs(ts ?? -1);
      setTimeout(() => setCopiedTs(null), 1500);
    }).catch(() => {});
  };

  if (!mounted || !user) return null;

  const speakAria = t('carrot.speak_aria', lang);

  return createPortal(
    <>
      {/* 划词「查词」气泡 */}
      {selChip && !open && (
        <button
          className="carrot-scope carrot-sel-chip"
          style={{ position: 'fixed', left: selChip.x, top: selChip.y, zIndex: 260 }}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            const text = selChip.text;
            setSelChip(null);
            window.getSelection()?.removeAllRanges();
            window.dispatchEvent(new CustomEvent('openCarrot', { detail: { text, mode: 'lookup' } }));
          }}
        >
          <BookText size={13} />{t('carrot.sel_lookup', lang)}
        </button>
      )}

      {/* 浮按钮 */}
      {!open && !hidden && pos !== null && (
        <div className="carrot-scope carrot-fab-wrap" style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 250, touchAction: 'none' }}>
          <button
            ref={fabRef}
            onMouseDown={onDragMouseDown}
            onTouchStart={onDragTouchStart}
            onClick={handleFabClick}
            aria-label={t('carrot.fab_aria', lang)}
            className="carrot-fab"
          >🥕</button>
        </div>
      )}
      {/* 隐藏后的恢复小点 */}
      {hidden && !open && (
        <button
          className="carrot-scope carrot-restore-dot"
          onClick={() => setHidden(false)}
          title={t('carrot.restore_aria', lang)}
          aria-label={t('carrot.restore_aria', lang)}
        />
      )}

      {/* 抽屉 */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="carrot-scope carrot-panel"
          style={{
            position: 'fixed',
            ...(panelPos
              ? { left: panelPos.x, top: panelPos.y }
              : { right: 16, bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }),
          }}
        >
          {/* 头部（可拖拽） */}
          <div
            className="carrot-header"
            onMouseDown={onPanelHeaderMouseDown}
            onTouchStart={onPanelHeaderTouchStart}
          >
            <div className="carrot-header-brand">
              <span className="carrot-header-badge">🥕</span>
              <div>
                <p className="carrot-header-name">{t('carrot.name', lang)}</p>
                <p className="carrot-header-tag">{t('carrot.tagline', lang)}</p>
              </div>
            </div>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 2 }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {messages.length > 0 && (
                <button
                  className="carrot-header-btn"
                  onClick={handleClear}
                  aria-label={t('carrot.clear_aria', lang)}
                  title={t('carrot.clear_aria', lang)}
                >
                  <Trash2 size={16} />
                </button>
              )}
              <button
                className="carrot-header-btn"
                onClick={() => { sfxPop(); setOpen(false); }}
                aria-label={t('carrot.close_aria', lang)}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* 模式切换 */}
          <div className="carrot-tabs">
            {MODES.map((md) => {
              const Icon = md.icon;
              return (
                <button
                  key={md.id}
                  className={`carrot-tab${mode === md.id ? ' active' : ''}`}
                  onClick={() => { sfxPop(); setMode(md.id); }}
                >
                  <Icon size={13} />
                  {t(md.labelKey, lang)}
                </button>
              );
            })}
          </div>

          {/* 对话区 */}
          <div ref={scrollRef} className="carrot-scroll">
            {messages.length === 0 && (
              <div className="carrot-empty">
                <span className="carrot-empty-emoji">🥕</span>
                <p className="carrot-empty-text">{emptyState.desc}</p>
                <div className="carrot-empty-chips">
                  {emptyState.chips.map((c) => (
                    <button key={c} className="carrot-empty-chip" onClick={() => handleSend(c, mode)}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, idx) => {
              if (m.role === 'user') {
                return <div key={idx} className="carrot-bubble user">{m.text}</div>;
              }
              if (m.kind === 'lookup' && m.card) {
                return <LookupCardView key={idx} card={m.card as LookupCard} speakAria={speakAria} lang={lang} />;
              }
              if ((m.kind === 'grammar' || m.kind === 'correct') && m.card) {
                return <GrammarCardView key={idx} card={m.card as GrammarCard} correct={m.kind === 'correct'} lang={lang} />;
              }
              const isLastTori = idx === messages.length - 1 && !loading && !!m.text.trim();
              return (
                <div key={idx} className="carrot-msg-tori">
                  <div className="carrot-bubble tori">
                    {renderWithSpeakers(m.text, speakAria)}
                  </div>
                  {isLastTori && (
                    <div className="carrot-msg-actions">
                      <button className="carrot-msg-action" onClick={() => copyText(m.text, m.ts)} aria-label={t('carrot.copy_aria', lang)} title={t('carrot.copy_aria', lang)}>
                        {copiedTs === m.ts ? <Check size={13} /> : <Copy size={13} />}
                      </button>
                      <button className="carrot-msg-action" onClick={handleRegenerate} aria-label={t('carrot.regen_aria', lang)} title={t('carrot.regen_aria', lang)}>
                        <RotateCcw size={13} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="carrot-loading">
                <Loader2 size={12} className="animate-spin" />
                {t('carrot.thinking', lang)}
              </div>
            )}
          </div>

          {/* 输入区 */}
          <div className="carrot-input-bar">
            <input
              className="carrot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder={placeholder}
              disabled={loading}
            />
            {loading ? (
              <button
                className="carrot-send carrot-stop"
                onClick={handleStop}
                aria-label={t('carrot.stop_aria', lang)}
                title={t('carrot.stop_aria', lang)}
              >
                <Square size={13} fill="currentColor" />
              </button>
            ) : (
              <button
                className="carrot-send"
                onClick={() => handleSend()}
                disabled={!input.trim()}
                aria-label={t('carrot.send_aria', lang)}
              >
                <Send size={15} />
              </button>
            )}
          </div>
        </div>
      )}
    </>,
    document.body
  );
}

// ── 结构化卡片：查词 ──
function LookupCardView({ card, speakAria, lang }: { card: LookupCard; speakAria: string; lang: Lang }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const wordData = {
    korean: card.korean,
    pronunciation: card.romanization || '',
    meaning: (card.meanings ?? []).map((m) => m.chinese).join('；'),
    partOfSpeech: card.meanings?.[0]?.partOfSpeech ?? '',
    examples: (card.examples ?? []).map((e) => ({ text: e.korean, translation: e.chinese })),
  };
  return (
    <div className="carrot-card">
      <div className="carrot-card-head">
        <span className="carrot-card-ko">{card.korean}</span>
        {card.romanization && <span className="carrot-card-rom">{card.romanization}</span>}
        <button className="carrot-speak-btn" aria-label={speakAria} onClick={() => speak(card.korean).catch(() => {})}>
          <Volume2 size={13} />
        </button>
        <button className="carrot-card-fav" onClick={() => setSheetOpen(true)}>
          <Plus size={13} />{t('carrot.add_to_book', lang)}
        </button>
      </div>
      {sheetOpen && <AddToBookSheet word={wordData} onClose={() => setSheetOpen(false)} />}
      {card.meanings?.length > 0 && (
        <div>
          <div className="carrot-card-sec-label">{t('carrot.card_meaning', lang)}</div>
          {card.meanings.map((mn, i) => (
            <div key={i} className="carrot-card-meaning-row">
              {mn.partOfSpeech && <span className="carrot-pos-tag">{mn.partOfSpeech}</span>}
              <span className="carrot-card-meaning-txt">{mn.chinese}</span>
            </div>
          ))}
        </div>
      )}
      {card.inflectionNote && (
        <div className="carrot-card-note">
          {card.baseForm ? `${card.baseForm} · ` : ''}{card.inflectionNote}
        </div>
      )}
      {card.examples?.length > 0 && (
        <div>
          <div className="carrot-card-sec-label">{t('carrot.card_example', lang)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {card.examples.map((eg, i) => (
              <div key={i} className="carrot-eg">
                <span className="carrot-eg-ko">
                  {eg.korean}
                  <button className="carrot-speak-btn" aria-label={speakAria} onClick={() => speak(eg.korean).catch(() => {})}>
                    <Volume2 size={12} />
                  </button>
                </span>
                <span className="carrot-eg-zh">{eg.chinese}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── 结构化卡片：拆语法 / 纠错 ──
function GrammarCardView({ card, correct, lang }: { card: GrammarCard; correct: boolean; lang: Lang }) {
  const skParts = [card.skeleton?.subject, card.skeleton?.object, card.skeleton?.predicate].filter(Boolean) as string[];
  return (
    <div className="carrot-card">
      {card.translation && (
        <div className="carrot-card-tr">{t('carrot.card_translation', lang)}：{card.translation}</div>
      )}
      {/* 纠错模式把易错点提到最前 */}
      {correct && (
        card.pitfalls?.length > 0
          ? <div>
              <div className="carrot-card-sec-label">{t('carrot.card_pitfall', lang)}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {card.pitfalls.map((p, i) => <div key={i} className="carrot-pitfall">{p}</div>)}
              </div>
            </div>
          : <div className="carrot-card-note">{t('carrot.card_no_pitfall', lang)}</div>
      )}
      {skParts.length > 0 && (
        <div>
          <div className="carrot-card-sec-label">{t('carrot.card_skeleton', lang)}</div>
          <div className="carrot-skeleton">
            {skParts.map((sk, i) => <span key={i} className="carrot-skeleton-part">{sk}</span>)}
          </div>
        </div>
      )}
      {card.particles?.length > 0 && (
        <div>
          <div className="carrot-card-sec-label">{t('carrot.card_particle', lang)}</div>
          <div className="carrot-chip-wrap">
            {card.particles.map((pt, i) => (
              <span key={i} className="carrot-chip"><span className="k">{pt.text}</span><span className="r">{pt.role}</span></span>
            ))}
          </div>
        </div>
      )}
      {card.endings?.length > 0 && (
        <div>
          <div className="carrot-card-sec-label">{t('carrot.card_ending', lang)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {card.endings.map((en, i) => (
              <span key={i} className="carrot-chip"><span className="k">{en.text}</span><span className="r">{en.base} · {en.meaning}</span></span>
            ))}
          </div>
        </div>
      )}
      {/* 语法解析模式易错点放最后 */}
      {!correct && card.pitfalls?.length > 0 && (
        <div>
          <div className="carrot-card-sec-label">{t('carrot.card_pitfall', lang)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {card.pitfalls.map((p, i) => <div key={i} className="carrot-pitfall">{p}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}
