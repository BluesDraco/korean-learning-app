'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PenLine, X, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

const OPEN_KEY = 'tori-tracepad-open';

interface Props {
  [k: string]: unknown;
  word: string;
}

export function TracePad({ word }: Props) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [curIdx, setCurIdx] = useState(0);   // 当前描哪个字（单画板，一次一字）
  const [tracedIdx, setTracedIdx] = useState<Set<number>>(new Set()); // 已落笔描过的字（进度点点亮）
  const [justFinished, setJustFinished] = useState(false); // 停笔瞬间：引导"下一字"跳动
  const [allDone, setAllDone] = useState(false); // 全部描完：完成动效
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);
  const bufferSizeRef = useRef<{ w: number; h: number; dpr: number }>({ w: 0, h: 0, dpr: 1 });
  const activePointerRef = useRef<number | null>(null);
  // window 级抬笔兜底：canvas 若因系统手势/切后台/捕获异常收不到 pointerup，
  // activePointerRef 会卡住旧 id 导致之后每笔 onDown 直接 return（画不出、直到重挂才复位）。
  // 对齐 StrokeCanvas 的兜底：在 window 上收 up/cancel，凭闭包 pid 强制复位。
  const winUpRef = useRef<((e: PointerEvent) => void) | null>(null);

  useEffect(() => {
    try { if (localStorage.getItem(OPEN_KEY) === '1') setOpen(true); } catch { /* ignore */ }
  }, []);

  const setOpenPersist = (v: boolean) => {
    setOpen(v);
    try { localStorage.setItem(OPEN_KEY, v ? '1' : '0'); } catch { /* ignore */ }
  };

  // 笔迹用品牌粉，手账涂写感；暗色模式自动适配（--color-pink-base 有明暗两套值）
  const readInkColor = (): string => {
    if (typeof window === 'undefined') return '#ff7fa8';
    try {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--color-pink-base').trim();
      return v || '#ff7fa8';
    } catch { return '#ff7fa8'; }
  };

  // 把 buffer 尺寸和 CSS 尺寸对齐。参数 force=true 时强制重设（切卡/展开时用）。
  const syncCanvasBuffer = useCallback((force = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const prev = bufferSizeRef.current;
    if (!force && prev.w === rect.width && prev.h === rect.height && prev.dpr === dpr) return;
    // 重设 buffer 前先 snapshot 旧笔迹（强制重建时避免丢笔），重建后拉伸画回
    let snapshot: HTMLCanvasElement | null = null;
    if (canvas.width > 0 && canvas.height > 0 && prev.w > 0) {
      const tmp = document.createElement('canvas');
      tmp.width = canvas.width;
      tmp.height = canvas.height;
      const tctx = tmp.getContext('2d');
      if (tctx) { tctx.drawImage(canvas, 0, 0); snapshot = tmp; }
    }
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = readInkColor();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (snapshot) ctx.drawImage(snapshot, 0, 0, rect.width, rect.height);
    bufferSizeRef.current = { w: rect.width, h: rect.height, dpr };
  }, []);

  // 展开或切卡时：强制重建 buffer（清空笔迹 + 重设画笔样式 + 重置指针状态）
  // 换词时回到第一个字，清空进度
  useEffect(() => {
    setCurIdx(0);
    setTracedIdx(new Set());
    setJustFinished(false);
    setAllDone(false);
  }, [word]);

  // 切字时收起停笔引导（新字还没写）
  useEffect(() => { setJustFinished(false); }, [curIdx]);

  // 组件卸载：清掉可能残留的 window 兜底监听（防内存泄漏/幽灵回调）
  useEffect(() => {
    return () => {
      if (winUpRef.current) {
        window.removeEventListener('pointerup', winUpRef.current);
        window.removeEventListener('pointercancel', winUpRef.current);
        winUpRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    // 重置指针状态，避免切卡瞬间旧 pointerId 卡住 onDown
    drawingRef.current = false;
    activePointerRef.current = null;
    lastPtRef.current = null;
    // 切字/展开时若上一笔的 window 兜底还挂着，一并清除（新字重新落笔会重挂）
    if (winUpRef.current) {
      window.removeEventListener('pointerup', winUpRef.current);
      window.removeEventListener('pointercancel', winUpRef.current);
      winUpRef.current = null;
    }
    bufferSizeRef.current = { w: 0, h: 0, dpr: 1 };
    // 展开动画/慢渲染时首帧 rect 可能为 0，双 rAF 等 layout 结算后再测量，避免 buffer 停在默认尺寸致落笔偏移
    const rafIds: number[] = [];
    rafIds.push(requestAnimationFrame(() => {
      rafIds.push(requestAnimationFrame(() => syncCanvasBuffer(true)));
    }));
    syncCanvasBuffer(true);
    const ro = new ResizeObserver(() => {
      if (!drawingRef.current) syncCanvasBuffer();
    });
    ro.observe(canvas);
    // 平板横竖屏旋转：iOS Safari 旋转后 ResizeObserver 时序不可靠，
    // orientationchange 后延时强制重建 buffer，杜绝旋转后落笔偏移
    let orientTimer: ReturnType<typeof setTimeout> | null = null;
    const onOrient = () => {
      if (orientTimer) clearTimeout(orientTimer);
      orientTimer = setTimeout(() => { if (!drawingRef.current) syncCanvasBuffer(true); }, 250);
    };
    window.addEventListener('orientationchange', onOrient);
    // iOS 选择放大镜(loupe)由原生 touch 手势触发，CSS user-select:none + React 事件的
    // stopPropagation 都拦不住；必须在非 passive 的 touchstart/touchmove 上 preventDefault。
    const stopTouch = (e: TouchEvent) => e.preventDefault();
    canvas.addEventListener('touchstart', stopTouch, { passive: false });
    canvas.addEventListener('touchmove', stopTouch, { passive: false });
    return () => {
      ro.disconnect();
      rafIds.forEach(cancelAnimationFrame);
      window.removeEventListener('orientationchange', onOrient);
      canvas.removeEventListener('touchstart', stopTouch);
      canvas.removeEventListener('touchmove', stopTouch);
      if (orientTimer) clearTimeout(orientTimer);
    };
    // curIdx 变（切字）时重跑：清空画布 + 重建 buffer
  }, [open, word, curIdx, syncCanvasBuffer]);

  const chars = Array.from(word);
  const cellCount = chars.length || 1;
  const safeIdx = Math.min(curIdx, cellCount - 1);
  const curChar = chars[safeIdx] ?? '';
  // 单画板：一次描一个字，画板铺满容器。固定一个舒适尺寸，词长也不缩小。
  const boardHeight = 200;
  const lineWidth = 8;

  // 用 offsetX/offsetY（元素内坐标），不用 clientX-rect：iPad 横屏 body{zoom:0.92} 下
  // getBoundingClientRect 与 clientX 处于不同坐标空间，相减错配→笔迹偏移+放大 1/zoom 倍。
  // offsetX 由浏览器在元素自身坐标系算好，对 zoom 免疫；zoom=1 时等价（桌面/手机零回归）。
  const getPt = (e: React.PointerEvent<HTMLCanvasElement>) => ({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointerRef.current !== null) return; // 忽略第二根手指
    e.preventDefault();
    e.stopPropagation();
    // 首笔前强制同步 buffer（对齐 StrokeCanvas），杜绝 buffer 停在默认尺寸导致的落笔偏移
    syncCanvasBuffer(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.lineWidth = lineWidth;
    // 每笔都重读一次颜色，暗色模式切换后新笔迹立即生效
    ctx.strokeStyle = readInkColor();
    try { canvas.setPointerCapture(e.pointerId); } catch { /* Safari 老版本忽略 */ }
    activePointerRef.current = e.pointerId;
    drawingRef.current = true;
    lastPtRef.current = getPt(e);
    // window 兜底：本笔若在 canvas 外/被系统吞掉抬笔，也能收到并复位状态
    const pid = e.pointerId;
    const onWinUp = (ev: PointerEvent) => {
      if (ev.pointerId !== pid) return;
      window.removeEventListener('pointerup', onWinUp);
      window.removeEventListener('pointercancel', onWinUp);
      if (winUpRef.current === onWinUp) winUpRef.current = null;
      drawingRef.current = false;
      lastPtRef.current = null;
      activePointerRef.current = null;
    };
    window.addEventListener('pointerup', onWinUp);
    window.addEventListener('pointercancel', onWinUp);
    winUpRef.current = onWinUp;
    setJustFinished(false); // 重新落笔时撤销上一次的"停笔引导"
    setTracedIdx(prev => prev.has(safeIdx) ? prev : new Set(prev).add(safeIdx));
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || e.pointerId !== activePointerRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !lastPtRef.current) return;
    // Apple Pencil / 高刷平板：一次 pointermove 含多个合并采样点，全部取出逐段连线，笔迹才跟手顺滑
    const native = e.nativeEvent as PointerEvent;
    const coalesced: PointerEvent[] = typeof native.getCoalescedEvents === 'function'
      ? native.getCoalescedEvents() : [];
    // 用 offsetX/offsetY（对 zoom 免疫，见 getPt 注释）；coalesced 事件同样带 offset
    const pts = coalesced.length > 0
      ? coalesced.map((ev) => ({ x: ev.offsetX, y: ev.offsetY }))
      : [{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }];
    for (const pt of pts) {
      ctx.beginPath();
      ctx.moveTo(lastPtRef.current.x, lastPtRef.current.y);
      ctx.lineTo(pt.x, pt.y);
      ctx.stroke();
      lastPtRef.current = pt;
    }
  };

  const onUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerId !== activePointerRef.current) return;
    drawingRef.current = false;
    lastPtRef.current = null;
    activePointerRef.current = null;
    if (winUpRef.current) {
      window.removeEventListener('pointerup', winUpRef.current);
      window.removeEventListener('pointercancel', winUpRef.current);
      winUpRef.current = null;
    }
    try { canvasRef.current?.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    setJustFinished(true); // 停笔：引导按钮跳动提示"可以继续下一字/完成"
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    // 用 canvas 实际像素尺寸清除（除以 dpr 得 CSS 尺寸）
    const dpr = bufferSizeRef.current.dpr || Math.min(window.devicePixelRatio || 1, 2);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpenPersist(true); }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-[14px] text-[13px] font-bold transition-all"
        style={{
          background: 'var(--color-pink-soft)',
          color: 'var(--color-pink-strong)',
          border: '1px solid rgba(255,127,168,0.28)',
          boxShadow: '0 1px 3px rgba(255,127,168,0.15)',
          cursor: 'pointer',
        }}
      >
        <PenLine size={15} strokeWidth={2.2} style={{ color: '#ff7fa8' }} />
        {t('vocab.trace_do_once', lang)}
      </button>
    );
  }

  return (
    <div
      className="rounded-[16px] overflow-hidden"
      style={{
        background: 'var(--fc-example-bg)',
        border: '1px solid var(--fc-card-border)',
        boxShadow: 'inset 0 0 0 1px rgba(255,127,168,0.10)',
        touchAction: 'none',
      }}
      onClick={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      {/* 头部：标题 + 清除 + 关闭 */}
      <div className="flex items-center justify-between px-3.5 py-2.5" style={{ borderBottom: '1px solid var(--fc-divider)' }}>
        <span className="flex items-center gap-1.5 text-[13px] font-bold" style={{ color: 'var(--fc-example-zh)' }}>
          <PenLine size={14} strokeWidth={2.2} style={{ color: '#ff7fa8' }} /> {t('vocab.trace_title', lang)}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); clear(); }}
            className="rounded-full flex items-center justify-center transition-colors"
            style={{
              width: 32, height: 32,
              background: 'rgba(255,127,168,0.08)',
              color: 'var(--color-pink-strong)',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={t('vocab.trace_clear', lang)}
            title={t('vocab.trace_clear', lang)}
          >
            <RotateCcw size={14} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpenPersist(false); }}
            className="rounded-full flex items-center justify-center transition-colors"
            style={{
              width: 32, height: 32,
              background: 'rgba(255,127,168,0.08)',
              color: 'var(--fc-example-zh)',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={t('vocab.trace_close_aria', lang)}
            title={t('vocab.trace_close', lang)}
          >
            <X size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* 画板：单个大米字格 + 当前字水印 + canvas 叠加（一次描一个字，铺满不缩小） */}
      <div className="p-3">
        {/* 进度点：每字一点，当前字放大高亮，描过的点亮 */}
        {cellCount > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 10 }}>
            {chars.map((_, i) => {
              const isCur = i === safeIdx;
              const isTraced = tracedIdx.has(i);
              return (
                <span
                  key={i}
                  aria-hidden
                  style={{
                    width: isCur ? 9 : 7, height: isCur ? 9 : 7, borderRadius: '50%',
                    background: isTraced || isCur ? 'var(--color-pink-base)' : 'rgba(255,127,168,0.25)',
                    transform: isCur ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all .2s',
                  }}
                />
              );
            })}
          </div>
        )}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: boardHeight,
            background: 'var(--color-surface-2)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: 'inset 0 0 0 1px rgba(255,127,168,0.10)',
          }}
        >
          {/* 米字格 + 当前字水印（居中，正方形，随高度定宽） */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                height: '100%',
                aspectRatio: '1 / 1',
                position: 'relative',
                border: '1px dashed rgba(255,127,168,0.55)',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 0, borderLeft: '1px dashed rgba(255,127,168,0.30)' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 0, borderTop: '1px dashed rgba(255,127,168,0.30)' }} />
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                style={{ position: 'absolute', inset: '7%', width: '86%', height: '86%' }}
              >
                <text
                  x="50" y="50"
                  textAnchor="middle" dominantBaseline="central"
                  fontFamily="'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif"
                  fontWeight="700" fontSize="92"
                  fill="rgba(255,127,168,0.32)"
                >
                  {curChar}
                </text>
              </svg>
            </div>
          </div>

          {/* Canvas：铺满整个画板区域 */}
          <canvas
            ref={canvasRef}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onPointerLeave={onUp}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              position: 'absolute',
              inset: 10,
              width: 'calc(100% - 20px)',
              height: 'calc(100% - 20px)',
              touchAction: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none',
              WebkitTapHighlightColor: 'transparent',
              cursor: 'crosshair',
              zIndex: 1,
            }}
          />
        </div>

        {/* 完成态：全部描完的正反馈 */}
        {allDone ? (
          <div className="tracepad-done" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 800, color: 'var(--color-pink-strong)' }}>
              <span style={{ fontSize: 18 }}>🌸</span> {t('vocab.trace_all_done', lang)}
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); clear(); setAllDone(false); setTracedIdx(new Set()); setCurIdx(0); }}
              className="rounded-full text-[13px] font-bold transition-colors"
              style={{ padding: '8px 18px', minHeight: 40, background: 'rgba(255,127,168,0.08)', color: 'var(--color-pink-strong)', border: 'none', cursor: 'pointer' }}
            >
              <RotateCcw size={14} strokeWidth={2.4} style={{ display: 'inline', marginRight: 4, verticalAlign: '-2px' }} />
              {t('vocab.trace_again', lang)}
            </button>
          </div>
        ) : cellCount === 1 ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setAllDone(true); setJustFinished(false); }}
              className={`flex items-center gap-1 rounded-full text-[13px] font-bold transition-colors${justFinished ? ' tracepad-nudge' : ''}`}
              style={{
                padding: '8px 20px', minHeight: 40,
                background: justFinished ? 'var(--color-pink-base)' : 'rgba(255,127,168,0.08)',
                color: justFinished ? '#fff' : 'var(--color-pink-strong)',
                border: 'none', cursor: 'pointer',
              }}
              aria-label={t('vocab.trace_finish', lang)}
            >
              {t('vocab.trace_finish', lang)} <ChevronRight size={16} strokeWidth={2.4} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 10 }}>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setCurIdx(i => Math.max(0, i - 1)); }}
              disabled={safeIdx <= 0}
              className="flex items-center gap-1 rounded-full text-[13px] font-bold transition-colors"
              style={{
                padding: '7px 14px', minHeight: 40,
                background: 'rgba(255,127,168,0.08)', color: 'var(--color-pink-strong)',
                border: 'none', cursor: safeIdx <= 0 ? 'default' : 'pointer',
                opacity: safeIdx <= 0 ? 0.35 : 1,
              }}
              aria-label={t('vocab.trace_prev', lang)}
            >
              <ChevronLeft size={16} strokeWidth={2.4} /> {t('vocab.trace_prev', lang)}
            </button>
            <span className="text-[13px] font-black tabular-nums" style={{ color: 'var(--fc-example-zh)' }}>
              {safeIdx + 1} / {cellCount}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (safeIdx >= cellCount - 1) { setAllDone(true); setJustFinished(false); }
                else { setCurIdx(i => Math.min(cellCount - 1, i + 1)); }
              }}
              className={`flex items-center gap-1 rounded-full text-[13px] font-bold transition-colors${justFinished ? ' tracepad-nudge' : ''}`}
              style={{
                padding: '7px 14px', minHeight: 40,
                background: justFinished ? 'var(--color-pink-base)' : 'rgba(255,127,168,0.08)',
                color: justFinished ? '#fff' : 'var(--color-pink-strong)',
                border: 'none', cursor: 'pointer',
              }}
              aria-label={safeIdx >= cellCount - 1 ? t('vocab.trace_finish', lang) : t('vocab.trace_next', lang)}
            >
              {safeIdx >= cellCount - 1 ? t('vocab.trace_finish', lang) : t('vocab.trace_next', lang)} <ChevronRight size={16} strokeWidth={2.4} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes tracepadNudge { 0%,100%{transform:translateX(0)} 25%{transform:translateX(3px)} 75%{transform:translateX(-3px)} }
        .tracepad-nudge { animation: tracepadNudge .5s ease-in-out 2; }
        @keyframes tracepadPop { 0%{transform:scale(.7);opacity:0} 60%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        .tracepad-done { animation: tracepadPop .35s ease-out; }
        @media (prefers-reduced-motion: reduce) { .tracepad-nudge, .tracepad-done { animation: none; } }
      `}</style>
    </div>
  );
}
