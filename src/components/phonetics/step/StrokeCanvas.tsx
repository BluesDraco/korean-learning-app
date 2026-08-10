'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { matchStroke, findBestMatchIndex, parseSvgPath, samplePath, type Point } from '@/lib/phonetics/strokeMatch';
import type { ProgressiveStroke } from '@/data/phonetics-progressive';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export type StrokeFeedback =
  | { kind: 'ok'; distance: number }
  | { kind: 'shape'; distance: number }       // 形状偏差
  | { kind: 'order'; expected: number; actual: number };  // 笔顺：实际更像 actual+1 笔

interface Props {
  targetStrokeCount: number;
  ghostChar?: string;
  idealStrokes?: ProgressiveStroke[];  // 传入则启用路径匹配
  onStrokeChange?: (count: number, feedback?: StrokeFeedback) => void;
  // 覆盖率模式：每次落笔后回调用户覆盖了 ideal 路径多少（0-100）。
  // 用于不要求分笔的场景（如音节描写允许连笔），blend 阶段按覆盖率判完成。
  onCoverageChange?: (pct: number) => void;
  coverageThresholdPx?: number;  // 用户点距离 ideal 点小于该值视为覆盖，默认 24（canvas 像素）
  hideStrokeCounter?: boolean;   // 覆盖率模式下隐藏底部「已描笔画 X/Y」计数（笔数失去意义）
  hideToolbar?: boolean;         // 隐藏顶部「手写描写 · 引导/独立」标题
}

// 起笔（pointerdown）到结笔（pointerup）算 1 笔
// 若传 idealStrokes，结笔时做形状+笔顺比对，发回 feedback
export default function StrokeCanvas({ targetStrokeCount, ghostChar, idealStrokes, onStrokeChange, onCoverageChange, coverageThresholdPx = 24, hideStrokeCounter, hideToolbar }: Props) {
  const { lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingRef = useRef(false);
  const lastPtRef = useRef<Point | null>(null);
  const currentStrokePointsRef = useRef<Point[]>([]);
  const coveredCellsRef = useRef<Set<string>>(new Set());    // 已覆盖网格 key，只增不重建
  const idealCellsRef = useRef<Set<string>>(new Set());      // ideal 点归并后的网格 key 集合
  const sizeRef = useRef<{ w: number; h: number }>({ w: 400, h: 260 });
  const rafRef = useRef<number | null>(null);                 // 节流 onCoverageChange
  const strokeCountRef = useRef(0);                            // 用于 finishStroke 读取最新值
  const winCleanupRef = useRef<((ev: PointerEvent) => void) | null>(null);     // window listener 清理函数
  const setupCanvasRef = useRef<(() => void) | null>(null);                     // 供 clear() 主动触发 buffer 重建
  const [strokeCount, setStrokeCount] = useState(0);
  const [ghostOn, setGhostOn] = useState(true);
  // canvas 实际尺寸稳定时递增，用于触发 idealCells 重算（避免用默认 400x260 错算覆盖网格）
  const [sizeReady, setSizeReady] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      // 布局稳定后微小抖动（±1px）忽略，避免频繁重设导致画布被清空
      const prev = sizeRef.current;
      if (ctxRef.current && Math.abs(prev.w - rect.width) < 1 && Math.abs(prev.h - rect.height) < 1) return;

      // 重设 buffer 前先 snapshot 旧画布到临时 canvas（如已存在内容），
      // 重设后再拉伸画回来 —— 转屏也不会丢笔画，同时消除坐标偏移。
      let snapshot: HTMLCanvasElement | null = null;
      if (ctxRef.current && canvas.width > 0 && canvas.height > 0 && strokeCountRef.current > 0) {
        const tmp = document.createElement('canvas');
        tmp.width = canvas.width;
        tmp.height = canvas.height;
        const tctx = tmp.getContext('2d');
        if (tctx) {
          tctx.drawImage(canvas, 0, 0);
          snapshot = tmp;
        }
      }

      sizeRef.current = { w: rect.width, h: rect.height };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      // 从 CSS token 读笔画色，暗色模式下自动切浅色墨
      const inkColor = getComputedStyle(document.documentElement).getPropertyValue('--color-ink-2').trim() || '#3a2e29';
      ctx.strokeStyle = inkColor;
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctxRef.current = ctx;

      if (snapshot) {
        // 拉伸到新的 CSS 尺寸（ctx 已 scale(dpr, dpr)，绘制走 CSS 坐标系）
        ctx.drawImage(snapshot, 0, 0, rect.width, rect.height);
      }

      setSizeReady((n) => n + 1);
    };
    setupCanvas();
    setupCanvasRef.current = setupCanvas;
    // 尺寸变化时重设内部缓冲区，避免 CSS 尺寸变了但内部 buffer 不变导致的坐标偏移。
    // 已完成笔画通过 snapshot + drawImage 保留下来（会随新尺寸拉伸，笔画形状比例改变但不消失）。
    // 只在正在绘制时忽略，避免打断用户手势。
    const ro = new ResizeObserver(() => {
      if (drawingRef.current) return;
      setupCanvas();
    });
    ro.observe(canvas);
    // iOS 选择放大镜(loupe)由原生 touch 手势触发，CSS user-select:none + React 事件的
    // stopPropagation 都拦不住；必须在非 passive 的 touchstart/touchmove 上 preventDefault。
    const stopTouch = (e: TouchEvent) => e.preventDefault();
    canvas.addEventListener('touchstart', stopTouch, { passive: false });
    canvas.addEventListener('touchmove', stopTouch, { passive: false });
    return () => {
      ro.disconnect();
      canvas.removeEventListener('touchstart', stopTouch);
      canvas.removeEventListener('touchmove', stopTouch);
      setupCanvasRef.current = null;
    };
  }, []);

  // 预计算 ideal 覆盖点 → 网格 key 集合。依赖 sizeReady 保证 canvas 实际尺寸就绪后才计算，
  // 否则会用默认 400x260 但真实 canvas 可能是 350x260（手机窄屏），idealCells 全错位，
  // 用户永远描不到 → 卡在同一个字。
  useEffect(() => {
    if (!idealStrokes || idealStrokes.length === 0) {
      idealCellsRef.current = new Set();
      return;
    }
    const { w, h } = sizeRef.current;
    if (w === 0 || h === 0) return;
    const scale = Math.min(w, h) / 200;
    const offsetX = (w - 200 * scale) / 2;
    const offsetY = (h - 200 * scale) / 2;
    const cell = coverageThresholdPx;
    const keys = new Set<string>();
    for (const s of idealStrokes) {
      const dense = parseSvgPath(s.d);
      const re = samplePath(dense, 24);
      for (const p of re) {
        const cx = Math.floor((p.x * scale + offsetX) / cell);
        const cy = Math.floor((p.y * scale + offsetY) / cell);
        keys.add(`${cx},${cy}`);
      }
    }
    idealCellsRef.current = keys;
  }, [idealStrokes, coverageThresholdPx, sizeReady]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (winCleanupRef.current) {
        window.removeEventListener('pointerup', winCleanupRef.current);
        window.removeEventListener('pointercancel', winCleanupRef.current);
        winCleanupRef.current = null;
      }
      if (typeof document !== 'undefined') {
        document.body.classList.remove('stroke-drawing');
      }
    };
  }, []);

  // 节流调用 onCoverageChange
  const scheduleCoverageUpdate = useCallback(() => {
    if (!onCoverageChange) return;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const ideal = idealCellsRef.current;
      if (ideal.size === 0) return;
      const covered = coveredCellsRef.current;
      let hit = 0;
      for (const key of ideal) {
        if (covered.has(key)) hit++;
      }
      onCoverageChange(Math.round((hit / ideal.size) * 100));
    });
  }, [onCoverageChange]);

  // 用 offsetX/offsetY（元素内坐标），不用 clientX-rect：iPad 横屏 body{zoom:0.92} 下
  // getBoundingClientRect 与 clientX 坐标空间不一致，相减错配→笔迹偏移+放大 1/zoom 倍。
  // offsetX 与 sizeRef（CSS 尺寸）同坐标系，笔顺匹配/覆盖率网格不受影响；zoom=1 时等价。
  const localPoint = useCallback((e: React.PointerEvent): Point => {
    return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  }, []);

  const finishStroke = useCallback(() => {
    drawingRef.current = false;
    lastPtRef.current = null;
    const userPoints = currentStrokePointsRef.current;

    // 先计算 feedback，不在 setState updater 内产生副作用
    let feedback: StrokeFeedback | undefined;
    const idx = strokeCountRef.current;
    if (idealStrokes && idealStrokes[idx]) {
      const { w, h } = sizeRef.current;
      const expected = matchStroke(userPoints, idealStrokes[idx].d, w, h);
      if (expected.ok) {
        feedback = { kind: 'ok', distance: expected.distance };
      } else {
        const best = findBestMatchIndex(userPoints, idealStrokes, w, h, [idx, Math.min(idx + 1, idealStrokes.length - 1)]);
        if (best.index !== idx && best.distance + 20 < expected.distance) {
          feedback = { kind: 'order', expected: idx, actual: best.index };
        } else {
          feedback = { kind: 'shape', distance: expected.distance };
        }
      }
    }
    const next = idx + 1;
    strokeCountRef.current = next;
    setStrokeCount(next);
    onStrokeChange?.(next, feedback);

    // 增量覆盖：把当前笔画点加入覆盖网格，节流回调
    if (onCoverageChange && idealStrokes && idealStrokes.length > 0) {
      const cell = coverageThresholdPx;
      for (const p of userPoints) {
        coveredCellsRef.current.add(`${Math.floor(p.x / cell)},${Math.floor(p.y / cell)}`);
      }
      scheduleCoverageUpdate();
    }
  }, [onStrokeChange, idealStrokes, onCoverageChange, coverageThresholdPx, scheduleCoverageUpdate]);

  const onDown = useCallback((e: React.PointerEvent) => {
    // iPad/慢渲染场景：首笔前强制同步 buffer 尺寸，避免坐标偏移
    if (setupCanvasRef.current) setupCanvasRef.current();
    if (!ctxRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    // 捕获指针：确保 pointerup 在 canvas 外也能收到，避免 onLeave 提前打断笔画
    if (canvas && canvas.setPointerCapture) {
      try { canvas.setPointerCapture(e.pointerId); } catch { /* 极少数设备不支持，忽略 */ }
    } else if (canvas && (canvas as any).setCapture) {
      try { (canvas as any).setCapture(); } catch { /* ignore */ }
    }
    // 落笔即禁止全页选中/长按/触摸滚动 · 手指滑出画板到正文也不会选中文字
    if (typeof document !== 'undefined') {
      document.body.classList.add('stroke-drawing');
    }
    // window 级指针释放兜底：不支持 capture 的设备也能正常结笔
    const pid = e.pointerId;
    const onWinUp = (ev: PointerEvent) => {
      if (ev.pointerId !== pid) return;
      window.removeEventListener('pointerup', onWinUp);
      window.removeEventListener('pointercancel', onWinUp);
      if (winCleanupRef.current === onWinUp) winCleanupRef.current = null;
      if (drawingRef.current) finishStroke();
      if (typeof document !== 'undefined') {
        document.body.classList.remove('stroke-drawing');
      }
    };
    window.addEventListener('pointerup', onWinUp);
    window.addEventListener('pointercancel', onWinUp);
    winCleanupRef.current = onWinUp;

    drawingRef.current = true;
    const p = localPoint(e);
    lastPtRef.current = p;
    currentStrokePointsRef.current = [p];
  }, [localPoint, finishStroke]);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!drawingRef.current || !ctxRef.current || !lastPtRef.current) return;
    e.preventDefault();
    const ctx = ctxRef.current;
    // 高频事件（iPad 120Hz + coalescedEvents）：一次 pointermove 可能包含多个采样点
    const events: PointerEvent[] = typeof (e.nativeEvent as PointerEvent).getCoalescedEvents === 'function'
      ? (e.nativeEvent as PointerEvent).getCoalescedEvents()
      : [];
    // 用 offsetX/offsetY（对 zoom 免疫，见 localPoint 注释）；coalesced 事件同样带 offset，
    // 且省掉 getBoundingClientRect，避免 120Hz 下每点强制重排
    const points: Point[] = events.length > 0
      ? events.map((ev) => ({ x: ev.offsetX, y: ev.offsetY }))
      : [{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }];
    // 每段单独 subpath：短路径 stroke 常数级开销，避免路径累积导致的越画越卡
    for (const p of points) {
      const last = lastPtRef.current!;
      // 亚像素抖动过滤：<0.7px 位移才过滤（原来 1.18px 阈值在 120Hz 触控下会滤掉正常慢速点，导致视觉卡顿）
      const dx = p.x - last.x;
      const dy = p.y - last.y;
      if (dx * dx + dy * dy < 0.5) continue;
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      lastPtRef.current = p;
      currentStrokePointsRef.current.push(p);
    }
  }, []);

  const onUp = useCallback(() => {
    // window listener 已经处理，避免双调
    if (!drawingRef.current) return;
    finishStroke();
  }, [finishStroke]);

  const onCancel = useCallback(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('stroke-drawing');
    }
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastPtRef.current = null;
  }, []);

  const onLeave = useCallback(() => {
    // 指针捕获成功后不会触发 leave；不支持捕获的设备上鼠标离开 canvas 只停笔、不结笔
    if (!drawingRef.current) return;
    lastPtRef.current = null;
  }, []);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    const { w, h } = sizeRef.current;
    ctx.clearRect(0, 0, w, h);
    strokeCountRef.current = 0;
    setStrokeCount(0);
    currentStrokePointsRef.current = [];
    coveredCellsRef.current = new Set();
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    onStrokeChange?.(0);
    onCoverageChange?.(0);
    // 清除后主动重建 buffer：若期间发生过 resize（CSS 尺寸变了但 strokeCount>0 时被 skip），
    // 此刻是重建的安全时机，避免下次落笔坐标偏移。
    setupCanvasRef.current?.();
  }, [onStrokeChange, onCoverageChange]);

  const reached = strokeCount >= targetStrokeCount;

  return (
    <div style={{
      background: 'var(--color-surface-2)',
      border: '1px solid var(--color-border-2)',
      borderRadius: 'var(--radius-md)',
      padding: 24, textAlign: 'center',
    }}>
      {!hideToolbar && (
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 12 }}>
          {t('phonetics.canvas_title', lang)} · {ghostOn ? t('phonetics.canvas_mode_guided', lang) : t('phonetics.canvas_mode_free', lang)}
        </div>
      )}
      <div
        onContextMenu={(e) => e.preventDefault()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: 400, margin: '0 auto',
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
        }}
      >
        {ghostOn && ghostChar ? (
          <>
            {/* 描写建议区：180×180 虚线米字格，居中，视觉引导用户在框内书写 */}
            <div
              aria-hidden
              style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 180, height: 180,
                border: '1px dashed rgba(255,127,168,0.35)',
                borderRadius: 6,
                pointerEvents: 'none',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, bottom: 0, left: '50%',
                width: 1, borderLeft: '1px dashed rgba(255,127,168,0.25)',
              }} />
              <div style={{
                position: 'absolute', left: 0, right: 0, top: '50%',
                height: 1, borderTop: '1px dashed rgba(255,127,168,0.25)',
              }} />
            </div>
            <div
              aria-hidden
              className="ph-stroke-ghost"
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif",
                fontWeight: 700,
                fontSize: 150,
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >{ghostChar}</div>
          </>
        ) : null}
        <canvas
          ref={canvasRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onCancel}
          onPointerLeave={onLeave}
          className="ph-stroke-canvas"
          style={{
            width: '100%', maxWidth: 560, height: 260,
            border: '1px solid rgba(255,127,168,0.18)',
            borderRadius: 20,
            cursor: 'crosshair',
            touchAction: 'none',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </div>
      {/* 清除按钮任何场景都保留（hideToolbar 只隐藏模式切换） */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12, flexWrap: 'wrap' }}>
        <button type="button" onClick={clear} style={toolBtn}>{t('phonetics.canvas_clear', lang)}</button>
        {!hideToolbar && (
          <>
            <button type="button" onClick={() => setGhostOn(true)} style={{ ...toolBtn, ...(ghostOn ? toolBtnActive : {}) }}>
              {t('phonetics.canvas_guide_on', lang)}
            </button>
            <button type="button" onClick={() => { setGhostOn(false); clear(); }} style={{ ...toolBtn, ...(!ghostOn ? toolBtnActive : {}) }}>
              {t('phonetics.canvas_free_write', lang)}
            </button>
          </>
        )}
      </div>
      {!hideToolbar && (
        <>
          <div style={{ marginTop: 10, fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--color-ink-3)' }}>
            {ghostChar ? t('phonetics.canvas_trace_hint', lang, { char: ghostChar }) : t('phonetics.canvas_free_hint', lang)}
          </div>
        </>
      )}
      {!hideStrokeCounter && (
        <div style={{ marginTop: 8, fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--color-ink-3)' }}>
          {t('phonetics.canvas_stroke_counter', lang)}<b style={{ color: reached ? 'var(--color-mint-strong)' : 'var(--color-pink-strong)', fontFamily: 'serif', fontSize: 16 }}>{strokeCount}</b> / {targetStrokeCount}
          {reached && <span style={{ marginLeft: 8, color: 'var(--color-mint-strong)' }}>✓</span>}
        </div>
      )}
    </div>
  );
}

const toolBtn: React.CSSProperties = {
  padding: '12px 16px', minHeight: 44, fontSize: 12, fontFamily: 'ui-monospace, monospace',
  border: '1px solid var(--color-border-2)', borderRadius: 999,
  background: 'var(--color-surface-2)', color: 'var(--color-ink-3)', cursor: 'pointer',
};
const toolBtnActive: React.CSSProperties = {
  background: 'var(--color-pink-soft)', borderColor: 'var(--color-pink-base)', color: 'var(--color-pink-strong)',
};
