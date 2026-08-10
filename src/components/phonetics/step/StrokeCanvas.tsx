'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { matchStroke, findBestMatchIndex, parseSvgPath, samplePath, type Point } from '@/lib/phonetics/strokeMatch';
import type { ProgressiveStroke } from '@/data/phonetics-progressive';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { collectHandwriting } from '@/lib/handwriting/collect';
import type { StrokePoint } from '@/lib/handwriting/types';

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
  // 采集用：跨笔累积完整笔迹（带 t/pressure），写完一个字时提交给训练数据管道
  const collectStrokesRef = useRef<StrokePoint[][]>([]);
  const curCollectStrokeRef = useRef<StrokePoint[]>([]);
  const collectedRef = useRef(false); // 防止同一字重复采集
  const coveredCellsRef = useRef<Set<string>>(new Set());    // 已覆盖网格 key，只增不重建
  const idealCellsRef = useRef<Set<string>>(new Set());      // ideal 点归并后的网格 key 集合
  const sizeRef = useRef<{ w: number; h: number }>({ w: 400, h: 260 });
  const rafRef = useRef<number | null>(null);                 // 节流 onCoverageChange
  const strokeCountRef = useRef(0);                            // 用于 finishStroke 读取最新值
  const winCleanupRef = useRef<((ev: PointerEvent) => void) | null>(null);     // window listener 清理函数
  const activePointerIdRef = useRef<number | null>(null);                      // 多指防护：只认第一根手指/笔
  const setupCanvasRef = useRef<(() => void) | null>(null);                     // 供 clear() 主动触发 buffer 重建
  const [strokeCount, setStrokeCount] = useState(0);
  const [ghostOn, setGhostOn] = useState(true);
  // canvas 实际尺寸稳定时递增，用于触发 idealCells 重算（避免用默认 400x260 错算覆盖网格）
  const [sizeReady, setSizeReady] = useState(0);

  // 目标字切换时重置采集状态（父组件可能不 clear 就换字）
  useEffect(() => {
    collectStrokesRef.current = [];
    curCollectStrokeRef.current = [];
    collectedRef.current = false;
  }, [ghostChar]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      // ⭐2026-08-07 画板坐标统一物理空间(治 iPad 横屏 body{zoom} 微信笔迹偏移,详见 HandwritingInput):
      //   坐标用 offsetX(画板内物理偏移),故 sizeRef/buffer/判定基准全用物理尺寸 clientWidth×zoom。
      const bz = parseFloat(getComputedStyle(document.body).zoom || '1') || 1;
      const pw = canvas.clientWidth * bz, ph = canvas.clientHeight * bz;
      if (pw === 0 || ph === 0) return;
      // 布局稳定后微小抖动（±1px）忽略，避免频繁重设导致画布被清空
      const prev = sizeRef.current;
      if (ctxRef.current && Math.abs(prev.w - pw) < 1 && Math.abs(prev.h - ph) < 1) return;

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

      sizeRef.current = { w: pw, h: ph };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(pw * dpr);
      canvas.height = Math.round(ph * dpr);
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;
      // setTransform 用 buffer/物理宽,让 1 绘制单位=1 offset(物理)像素
      ctx.setTransform(canvas.width / pw, 0, 0, canvas.height / ph, 0, 0);
      // 从 CSS token 读笔画色，暗色模式下自动切浅色墨
      const inkColor = getComputedStyle(document.documentElement).getPropertyValue('--color-ink-2').trim() || '#3a2e29';
      ctx.strokeStyle = inkColor;
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctxRef.current = ctx;

      if (snapshot) {
        // 拉伸到新的物理尺寸（ctx 已 setTransform，绘制走物理 offset 坐标系）
        ctx.drawImage(snapshot, 0, 0, pw, ph);
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
    // 平板横竖屏旋转：iOS Safari 旋转后 ResizeObserver 时序不可靠，
    // orientationchange 后延时强制重建 buffer，杜绝旋转后落笔偏移
    let orientTimer: ReturnType<typeof setTimeout> | null = null;
    const onOrient = () => {
      if (orientTimer) clearTimeout(orientTimer);
      orientTimer = setTimeout(() => { if (!drawingRef.current) setupCanvas(); }, 250);
    };
    window.addEventListener('orientationchange', onOrient);
    // iOS 选择放大镜(loupe)由原生 touch 手势触发，CSS user-select:none + React 事件的
    // stopPropagation 都拦不住；必须在非 passive 的 touchstart/touchmove 上 preventDefault。
    const stopTouch = (e: TouchEvent) => e.preventDefault();
    canvas.addEventListener('touchstart', stopTouch, { passive: false });
    canvas.addEventListener('touchmove', stopTouch, { passive: false });
    return () => {
      ro.disconnect();
      canvas.removeEventListener('touchstart', stopTouch);
      canvas.removeEventListener('touchmove', stopTouch);
      window.removeEventListener('orientationchange', onOrient);
      if (orientTimer) clearTimeout(orientTimer);
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

  // ⭐2026-08-07 用 offsetX/offsetY(画板内物理偏移),微信/Safari 都对(详见 HandwritingInput 定案)。
  // clientX-rect.left 在微信 body{zoom} 下是混合空间(clientX物理/rect布局)必偏。
  // coalesced 子点 offsetX 恒 0,传主事件 shift=(offset-client) 平移校正。
  const canvasLocal = useCallback((ev: PointerEvent, shift?: { x: number; y: number }): Point => {
    if (shift) return { x: ev.clientX + shift.x, y: ev.clientY + shift.y };
    return { x: ev.offsetX, y: ev.offsetY };
  }, []);

  const localPoint = useCallback((e: React.PointerEvent): Point => {
    return canvasLocal(e.nativeEvent as PointerEvent);
  }, [canvasLocal]);

  const finishStroke = useCallback(() => {
    drawingRef.current = false;
    lastPtRef.current = null;
    activePointerIdRef.current = null;
    document.body.classList.remove('stroke-drawing');
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

    // 采集：提交当前完成的笔画到累积器
    if (curCollectStrokeRef.current.length > 0) {
      collectStrokesRef.current.push(curCollectStrokeRef.current);
      curCollectStrokeRef.current = [];
    }
    // 写完整字（笔数达到目标）且有明确目标字（ghostChar）时采集一次
    if (ghostChar && !collectedRef.current && next >= targetStrokeCount) {
      collectedRef.current = true;
      collectHandwriting(ghostChar, collectStrokesRef.current, sizeRef.current.w, sizeRef.current.h, 'ghost');
      collectStrokesRef.current = [];
    }

    // 增量覆盖：把当前笔画点加入覆盖网格，节流回调
    if (onCoverageChange && idealStrokes && idealStrokes.length > 0) {
      const cell = coverageThresholdPx;
      for (const p of userPoints) {
        coveredCellsRef.current.add(`${Math.floor(p.x / cell)},${Math.floor(p.y / cell)}`);
      }
      scheduleCoverageUpdate();
    }
  }, [onStrokeChange, idealStrokes, onCoverageChange, coverageThresholdPx, scheduleCoverageUpdate, ghostChar, targetStrokeCount]);

  const onDown = useCallback((e: React.PointerEvent) => {
    // 正在绘制时忽略第二根手指/手掌接触
    if (drawingRef.current) return;
    // iPad/慢渲染场景：首笔前强制同步 buffer 尺寸，避免坐标偏移
    if (setupCanvasRef.current) setupCanvasRef.current();
    if (!ctxRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (canvas && canvas.setPointerCapture) {
      try { canvas.setPointerCapture(e.pointerId); } catch { /* 极少数设备不支持，忽略 */ }
    } else if (canvas && (canvas as any).setCapture) {
      try { (canvas as any).setCapture(); } catch { /* ignore */ }
    }
    if (typeof document !== 'undefined') {
      document.body.classList.add('stroke-drawing');
    }
    // window 级指针释放兜底：不支持 capture 的设备也能正常结笔
    const pid = e.pointerId;
    activePointerIdRef.current = pid;
    const onWinUp = (ev: PointerEvent) => {
      if (ev.pointerId !== pid) return;
      window.removeEventListener('pointerup', onWinUp);
      window.removeEventListener('pointercancel', onWinUp);
      if (winCleanupRef.current === onWinUp) winCleanupRef.current = null;
      if (drawingRef.current) finishStroke();
    };
    window.addEventListener('pointerup', onWinUp);
    window.addEventListener('pointercancel', onWinUp);
    winCleanupRef.current = onWinUp;

    drawingRef.current = true;
    const p = localPoint(e);
    lastPtRef.current = p;
    currentStrokePointsRef.current = [p];
    // 采集：开始新笔画（带 t/pressure）
    const ne = e.nativeEvent as PointerEvent;
    curCollectStrokeRef.current = [{ x: p.x, y: p.y, t: ne.timeStamp, pressure: ne.pressure ?? 0.5 }];
  }, [localPoint, finishStroke]);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!drawingRef.current || !ctxRef.current || !lastPtRef.current) return;
    if (e.pointerId !== activePointerIdRef.current) return;
    e.preventDefault();
    const ctx = ctxRef.current;
    const native = e.nativeEvent as PointerEvent;
    // 高频事件（120Hz + coalescedEvents）：一次 pointermove 多个采样点，逐点取本地坐标。
    // 主事件 native 用 offsetX/offsetY;coalesced 子点 offsetX 恒 0,用主事件 shift 平移校正。
    const shift = { x: native.offsetX - native.clientX, y: native.offsetY - native.clientY };
    const coalesced: PointerEvent[] = typeof native.getCoalescedEvents === 'function'
      ? native.getCoalescedEvents()
      : [];
    const points: { p: Point; t: number; pressure: number }[] = (coalesced.length > 0 ? coalesced : [native])
      .map(ev => ({ p: ev === native ? canvasLocal(ev) : canvasLocal(ev, shift), t: ev.timeStamp, pressure: ev.pressure ?? 0.5 }));
    // 每段单独 subpath：短路径 stroke 常数级开销，避免路径累积导致的越画越卡
    for (const { p, t: pt, pressure } of points) {
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
      curCollectStrokeRef.current.push({ x: p.x, y: p.y, t: pt, pressure });
    }
  }, [canvasLocal]);

  const onUp = useCallback((e: React.PointerEvent) => {
    // window listener 已经处理，避免双调
    if (!drawingRef.current || e.pointerId !== activePointerIdRef.current) return;
    finishStroke();
  }, [finishStroke]);

  const onCancel = useCallback(() => {
    document.body.classList.remove('stroke-drawing');
    drawingRef.current = false;
    lastPtRef.current = null;
    activePointerIdRef.current = null;
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
    collectStrokesRef.current = [];
    curCollectStrokeRef.current = [];
    collectedRef.current = false;
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
