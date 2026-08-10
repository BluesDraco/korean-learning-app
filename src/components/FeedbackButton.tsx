'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, X, Check } from 'lucide-react';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'feedback-btn-pos';
const BTN_SIZE = 44;

function clampPos(x: number, y: number) {
  return {
    x: Math.max(0, Math.min(x, window.innerWidth - BTN_SIZE)),
    y: Math.max(0, Math.min(y, window.innerHeight - BTN_SIZE)),
  };
}

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [hidden, setHidden] = useState(() =>
    typeof document !== 'undefined' && document.body.hasAttribute('data-batch-managing')
  );
  const pathname = usePathname();

  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  // ref mirrors pos so event handlers always read current value without stale closure
  const posRef = useRef<{ x: number; y: number } | null>(null);

  const dragging = useRef(false);
  const dragStart = useRef<{ mx: number; my: number; bx: number; by: number } | null>(null);
  const didDrag = useRef(false);
  const activeTouchId = useRef<number | null>(null);

  // Initialize position after mount
  useEffect(() => {
    let saved: { x: number; y: number } | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) saved = JSON.parse(raw);
    } catch {}
    const initial = saved
      ? clampPos(saved.x, saved.y)
      : clampPos(window.innerWidth - BTN_SIZE - 16, window.innerHeight - BTN_SIZE - 72 - 16);
    posRef.current = initial;
    setPos(initial);
  }, []);

  // Keep posRef in sync
  const updatePos = useCallback((x: number, y: number) => {
    const clamped = clampPos(x, y);
    posRef.current = clamped;
    setPos(clamped);
  }, []);

  const savePos = useCallback(() => {
    if (!posRef.current) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(posRef.current)); } catch {}
  }, []);

  // Clamp position on window resize
  useEffect(() => {
    const onResize = () => {
      if (!posRef.current) return;
      const clamped = clampPos(posRef.current.x, posRef.current.y);
      posRef.current = clamped;
      setPos(clamped);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Batch-managing observer
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setHidden(document.body.hasAttribute('data-batch-managing'));
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ['data-batch-managing'] });
    return () => obs.disconnect();
  }, []);

  // Mouse drag — registered once, reads from refs
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
      // defer reset so the click event that follows mouseup still sees didDrag=true
      setTimeout(() => { didDrag.current = false; }, 0);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [updatePos, savePos]); // stable callbacks, effect runs once

  // Touch drag — passive by default, only prevent scroll while actively dragging
  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current || !dragStart.current) return;
      const touch = activeTouchId.current !== null
        ? Array.from(e.changedTouches).find(t => t.identifier === activeTouchId.current)
        : e.touches[0];
      if (!touch) return;
      const dx = touch.clientX - dragStart.current.mx;
      const dy = touch.clientY - dragStart.current.my;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDrag.current = true;
      if (didDrag.current) e.preventDefault(); // only block scroll when actually dragging button
      updatePos(dragStart.current.bx + dx, dragStart.current.by + dy);
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!dragging.current) return;
      const touch = Array.from(e.changedTouches).find(t => t.identifier === activeTouchId.current);
      if (!touch) return;
      dragging.current = false;
      dragStart.current = null;
      activeTouchId.current = null;
      savePos();
      // defer reset so the tap/click event that follows touchend still sees didDrag=true
      setTimeout(() => { didDrag.current = false; }, 0);
    };
    // Must be non-passive to allow e.preventDefault() inside, but we only call it when dragging
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [updatePos, savePos]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (open) return;
    dragging.current = true;
    didDrag.current = false;
    dragStart.current = {
      mx: e.clientX, my: e.clientY,
      bx: posRef.current?.x ?? 0, by: posRef.current?.y ?? 0,
    };
    e.preventDefault();
  }, [open]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (open) return;
    const touch = e.touches[0];
    activeTouchId.current = touch.identifier;
    dragging.current = true;
    didDrag.current = false;
    dragStart.current = {
      mx: touch.clientX, my: touch.clientY,
      bx: posRef.current?.x ?? 0, by: posRef.current?.y ?? 0,
    };
  }, [open]);

  const handleClick = useCallback(() => {
    if (didDrag.current) return;
    setOpen(true);
  }, []);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: pathname, type: 'content_error', message }),
      });
      setSent(true);
      setTimeout(() => { setOpen(false); setSent(false); setMessage(''); }, 1500);
    } catch {}
  };

  if (hidden || pos === null) return null;

  return (
    <>
      <button
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={handleClick}
        style={{ left: pos.x, top: pos.y, width: BTN_SIZE, height: BTN_SIZE, touchAction: 'none' }}
        className="fixed z-50 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--border-color)] shadow-lg flex items-center justify-center hover:shadow-xl hover:border-[var(--pink-primary)]/40 transition-shadow text-[var(--text-muted)] hover:text-[var(--pink-primary)] cursor-grab active:cursor-grabbing select-none"
        title="报告错误"
      >
        <MessageSquare size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-4">
          <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5 space-y-4 animate-bounce-in border border-[var(--border-color)]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <MessageSquare size={16} className="text-[var(--pink-primary)]" />
                报告问题
              </h3>
              <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)] transition-colors">
                <X size={16} />
              </button>
            </div>

            {sent ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-[var(--mint-soft)]/10 flex items-center justify-center mx-auto">
                  <Check size={24} className="text-[var(--mint-soft)]" />
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)]">感谢反馈！</p>
                <p className="text-xs text-[var(--text-muted)]">托里会尽快处理</p>
              </div>
            ) : (
              <>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="描述你发现的问题..."
                  rows={3}
                  className="w-full rounded-xl border border-[var(--border-color)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] bg-[var(--bg-input)] resize-none focus:outline-none focus:border-[var(--pink-primary)]/40 transition-colors"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!message.trim()}
                  className="w-full py-2.5 rounded-xl bg-[var(--pink-primary)] hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-all active:scale-[0.98]"
                >
                  提交反馈
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
