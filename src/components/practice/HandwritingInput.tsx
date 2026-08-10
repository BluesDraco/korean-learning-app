'use client';

// 单画板覆盖式手写输入（对标 Gboard/中文手写）：
// 在大画板写一个韩文字 → 停笔约 1s 自动识别 → 该字上屏、画板清空 → 接着在同一画板写下一个。
// 识别走 /api/ai/handwriting（qwen-vl-ocr），单字识别更准。
// 对外只暴露 value/onChange：宿主拿到累积拼出的韩文串，塞进自己的 input state 即可。

import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, Delete, Eraser } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface HandwritingInputProps {
  [k: string]: unknown;
  /** 当前已识别拼出的韩文串（受控） */
  value: string;
  /** 每次识别/删除后回调最新串 */
  onChange: (text: string) => void;
  /** 停笔自动识别的等待毫秒，默认 1300（容纳一个音节块的笔间停顿，又不过分拖慢） */
  autoDelayMs?: number;
}

export function HandwritingInput({ value, onChange, autoDelayMs = 1300 }: HandwritingInputProps) {
  const { lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const drawingRef = useRef(false);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const hasInkRef = useRef(false);
  const recTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  // 累积串放 ref，供异步识别回调读取最新值（避免闭包旧值）
  const valueRef = useRef(value);
  valueRef.current = value;

  const [recognizing, setRecognizing] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const [hint, setHint] = useState<string | null>(null);

  const dprRef = useRef(1);

  const setupCanvas = useCallback((force = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const prev = sizeRef.current;
    // buffer 已与当前 CSS 尺寸一致时跳过重建（避免清空正在写的笔迹）
    if (!force && ctxRef.current && prev.w === rect.width && prev.h === rect.height && dprRef.current === dpr) return;
    // 强制重建时 snapshot 旧笔迹再拉回，避免落笔前校准清掉当前字
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
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (snapshot) ctx.drawImage(snapshot, 0, 0, rect.width, rect.height);
    ctxRef.current = ctx;
    sizeRef.current = { w: rect.width, h: rect.height };
    dprRef.current = dpr;
  }, []);

  // canvas strokeStyle 只吃字符串色值，不能用 CSS var；这两个值即 --hr-ink-1 的明暗字面量
  // eslint-disable-next-line no-restricted-syntax
  const inkColor = () =>
    document.documentElement.getAttribute('data-theme') === 'dark' ? '#F0E8FF' : '#1a1310';

  const clearPad = useCallback(() => {
    const ctx = ctxRef.current;
    const { w, h } = sizeRef.current;
    if (ctx) ctx.clearRect(0, 0, w, h);
    hasInkRef.current = false;
    setShowTip(true);
    setHint(null);
  }, []);

  const recognize = useCallback(async () => {
    if (!hasInkRef.current || !canvasRef.current) return;
    if (recTimerRef.current) { clearTimeout(recTimerRef.current); recTimerRef.current = null; }
    const canvas = canvasRef.current;
    setRecognizing(true);
    setHint(null);
    let dataUrl: string;
    try {
      // OCR 归一化，三步大幅提升 qwen-vl-ocr 准确率：
      // ① 白底黑字：画布 buffer 是透明底 + 明/暗色墨迹，直接送会被解码成同色底同色字
      //    （亮色近黑墨迹配透明→黑底=几乎不可见）。用墨迹 alpha 当 mask 填纯黑、铺白底，
      //    明暗模式都归一成 OCR 训练分布（白底黑字）。
      // ② 裁到笔迹包围盒 + 居中放大到固定 512：用户只在画布中间写一个字，大量留白会稀释
      //    特征；裁出字并放大铺满标准画面，让字够大够清晰。
      // ③ 固定尺寸消除窄手机低分辨率导出（~600×400）的影响。
      const cw = canvas.width, ch = canvas.height;
      // 用 alpha 通道扫描包围盒（墨迹随主题变色，但 alpha 恒 >0，比读 RGB 稳）
      const srcCtx = canvas.getContext('2d');
      if (!srcCtx) throw new Error('no ctx');
      const img = srcCtx.getImageData(0, 0, cw, ch).data;
      let minX = cw, minY = ch, maxX = 0, maxY = 0;
      for (let y = 0; y < ch; y++) {
        for (let x = 0; x < cw; x++) {
          if (img[(y * cw + x) * 4 + 3] > 10) {
            if (x < minX) minX = x; if (x > maxX) maxX = x;
            if (y < minY) minY = y; if (y > maxY) maxY = y;
          }
        }
      }
      if (maxX < minX || maxY < minY) throw new Error('no ink'); // 无墨迹
      const bw = maxX - minX + 1, bh = maxY - minY + 1;
      // 目标：512×512 白底，字按长边缩放到 ~78% 居中，四周留 padding（OCR 喜欢一点边距）
      const OUT = 512, target = OUT * 0.78;
      const scale = target / Math.max(bw, bh);
      const dw = bw * scale, dh = bh * scale;
      const dx = (OUT - dw) / 2, dy = (OUT - dh) / 2;
      const flat = document.createElement('canvas');
      flat.width = OUT; flat.height = OUT;
      const fctx = flat.getContext('2d');
      if (!fctx) throw new Error('no ctx');
      fctx.fillStyle = '#ffffff';
      fctx.fillRect(0, 0, OUT, OUT);
      // 先把裁剪区的墨迹归一成纯黑（透明底），再贴到白底居中放大
      const ink = document.createElement('canvas');
      ink.width = bw; ink.height = bh;
      const ictx = ink.getContext('2d');
      if (!ictx) throw new Error('no ctx');
      ictx.drawImage(canvas, minX, minY, bw, bh, 0, 0, bw, bh);
      ictx.globalCompositeOperation = 'source-in';
      ictx.fillStyle = '#000000';
      ictx.fillRect(0, 0, bw, bh);
      fctx.imageSmoothingEnabled = true;
      fctx.imageSmoothingQuality = 'high';
      fctx.drawImage(ink, dx, dy, dw, dh);
      dataUrl = await new Promise<string>((resolve, reject) => {
        flat.toBlob(blob => {
          if (!blob) return reject(new Error('toBlob failed'));
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.error ?? new Error('reader failed'));
          reader.readAsDataURL(blob);
        }, 'image/png');
      });
    } catch {
      setRecognizing(false);
      setHint(t('prac.hw_err_notgood', lang));
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch('/api/ai/handwriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl, expectedCount: 1 }),
        signal: controller.signal,
      });
      const json = await res.json().catch(() => ({}));
      // 取第一个韩文字符：单画板一次写一个。含完整音节块(가-힣)和单字母(자모)，
      // 40음/发音听写答案常是单字母，不能只留音节块否则永远识别不出。
      const detected: string = (json.text ?? '').replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, '').slice(0, 1);
      if (detected) {
        onChange(valueRef.current + detected);
        clearPad();
      } else {
        // 没认出韩文字：保留笔迹，提示重写，不清空（免得用户白写）
        setHint(t('prac.hw_err_notfound', lang));
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setHint(t('prac.hw_err_fail', lang));
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setRecognizing(false);
    }
  }, [onChange, clearPad, lang]);

  const scheduleRec = useCallback(() => {
    if (recTimerRef.current) clearTimeout(recTimerRef.current);
    recTimerRef.current = setTimeout(() => recognize(), autoDelayMs);
  }, [recognize, autoDelayMs]);

  // 画布事件
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setupCanvas();
    const ro = new ResizeObserver(() => { if (!drawingRef.current) setupCanvas(); });
    ro.observe(canvas);

    // 用 offsetX/offsetY（浏览器算好的画板内坐标），不用 clientX-rect：
    // iPad 横屏 body{zoom:0.92} 下 getBoundingClientRect 返回未缩放的布局坐标、
    // 而 clientX 是缩放后视觉坐标，两者相减错配→笔迹偏移+放大 1/zoom 倍。
    // offsetX 直接是元素内部坐标，对 zoom 免疫；zoom=1 时与 clientX-rect 等价（桌面/手机零回归）。
    const pos = (e: PointerEvent) => ({ x: e.offsetX, y: e.offsetY });
    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      // 首笔前强制校准 buffer，杜绝 buffer 停在默认尺寸导致的落笔偏移（snapshot 已保住笔迹）
      setupCanvas(true);
      if (recTimerRef.current) { clearTimeout(recTimerRef.current); recTimerRef.current = null; }
      try { canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      drawingRef.current = true;
      lastRef.current = pos(e);
      setShowTip(false);
      setHint(null);
    };
    const onMove = (e: PointerEvent) => {
      if (!drawingRef.current || !ctxRef.current || !lastRef.current) return;
      e.preventDefault();
      const ctx = ctxRef.current;
      const p = pos(e);
      ctx.strokeStyle = inkColor();
      ctx.beginPath();
      ctx.moveTo(lastRef.current.x, lastRef.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      lastRef.current = p;
      hasInkRef.current = true;
    };
    const onUp = () => {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      lastRef.current = null;
      scheduleRec();
    };

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    // iOS 选择放大镜(loupe)由原生 touch 手势触发，CSS user-select:none + pointer 事件
    // 的 preventDefault 拦不住；必须在非 passive 的 touchstart/touchmove 上 preventDefault。
    const stopTouch = (e: TouchEvent) => e.preventDefault();
    canvas.addEventListener('touchstart', stopTouch, { passive: false });
    canvas.addEventListener('touchmove', stopTouch, { passive: false });
    // 平板旋转后 iOS Safari 尺寸上报滞后，延时强制重建（snapshot 保住笔迹）
    let orientTimer: ReturnType<typeof setTimeout> | null = null;
    const onOrient = () => {
      if (orientTimer) clearTimeout(orientTimer);
      orientTimer = setTimeout(() => { if (!drawingRef.current) setupCanvas(true); }, 250);
    };
    window.addEventListener('orientationchange', onOrient);
    return () => {
      ro.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      canvas.removeEventListener('touchstart', stopTouch);
      canvas.removeEventListener('touchmove', stopTouch);
      window.removeEventListener('orientationchange', onOrient);
      if (orientTimer) clearTimeout(orientTimer);
    };
  }, [setupCanvas, scheduleRec]);

  // 卸载清理
  useEffect(() => {
    return () => {
      if (recTimerRef.current) clearTimeout(recTimerRef.current);
      abortRef.current?.abort();
    };
  }, []);

  const delLast = () => {
    if (!value) return;
    onChange(value.slice(0, -1));
  };
  const clearAll = () => {
    if (value) onChange('');
    clearPad();
  };

  return (
    <div className="hw-scope" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* 答案框：实时拼出识别结果 */}
      <div
        aria-live="polite"
        aria-label={value ? t('prac.hw_written_aria', lang, { value }) : t('prac.hw_answer_empty_aria', lang)}
        style={{
          minHeight: 56, border: '2px solid var(--hr-border-2)', borderRadius: 14,
          background: 'var(--hr-surface-2)', display: 'flex', alignItems: 'center',
          padding: '0 16px', gap: 4, flexWrap: 'wrap',
        }}
      >
        {value
          ? [...value].map((ch, i) => (
              <span key={i} style={{ fontFamily: 'var(--hr-hangul)', fontSize: 26, fontWeight: 700, color: 'var(--hr-ink-1)' }}>{ch}</span>
            ))
          : <span style={{ color: 'var(--hr-ink-4)', fontSize: 15 }}>{t('prac.hw_placeholder', lang)}</span>}
        <span aria-hidden style={{ width: 2, height: 26, background: 'var(--hr-pink-strong)', animation: 'hwCaretBlink 1s step-end infinite', marginLeft: 2 }} />
      </div>

      {/* 单画板 */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2' }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={t('prac.hw_pad_aria', lang)}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            width: '100%', height: '100%', display: 'block', touchAction: 'none',
            userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none',
            WebkitTapHighlightColor: 'transparent',
            background: 'var(--hr-surface-2)',
            border: `2px solid ${recognizing ? 'var(--hr-peach-strong)' : 'var(--hr-border-2)'}`,
            borderRadius: 18, cursor: 'crosshair', transition: 'border-color .2s',
          }}
        />
        {showTip && !value && !hint && (
          <div aria-hidden style={{ position: 'absolute', top: 12, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: 'var(--hr-ink-4)', fontStyle: 'italic', pointerEvents: 'none' }}>
            {t('prac.hw_write_here', lang)}
          </div>
        )}
        {recognizing && (
          <div aria-live="polite" style={{ position: 'absolute', top: 8, right: 10, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: 'var(--hr-peach-strong)', background: 'var(--hr-surface-3)', borderRadius: 999, padding: '3px 10px' }}>
            <span className="hw-dots" aria-hidden><span /><span /><span /></span>
            {t('prac.hw_recognizing', lang)}
          </div>
        )}
      </div>

      {/* 识别失败/没认出提示 */}
      {hint && (
        <p role="alert" style={{ margin: 0, textAlign: 'center', fontSize: 12.5, color: 'var(--hr-peach-strong)', fontWeight: 600 }}>
          {hint}
        </p>
      )}

      {/* 工具条：识别/删除为主操作，清空为破坏性操作，视觉降权+靠右分隔 */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
        <button type="button" onClick={recognize} className="hw-tool" style={toolBtn}>
          <Sparkles size={13} /> {t('prac.hw_recognize_now', lang)}
        </button>
        <button type="button" onClick={delLast} className="hw-tool" style={toolBtn}>
          <Delete size={13} /> {t('prac.hw_delete_one', lang)}
        </button>
        <button type="button" onClick={clearAll} className="hw-tool hw-tool-danger" style={{ ...toolBtn, color: 'var(--hr-ink-4)' }}>
          <Eraser size={13} /> {t('prac.hw_clear', lang)}
        </button>
      </div>

      {/* NOTE: These .hw-scope tokens mirror .pr-scope values from practice-redesign.css
          for standalone use. Keep in sync with practice-redesign.css. */}
      <style>{`
        .hw-scope {
          --hr-surface-1: #fffbf7; --hr-surface-2: #ffffff; --hr-surface-3: #fff4f0;
          --hr-ink-1: #1a1310; --hr-ink-3: #89756e; --hr-ink-4: #b8a79e;
          --hr-border-2: #efe1da; --hr-border-3: #c9b7aa;
          --hr-pink-strong: #e55a87; --hr-peach-strong: #d97a55;
          --hr-hangul: 'Noto Sans KR', sans-serif;
          --hr-ease: cubic-bezier(.4,0,.2,1);
        }
        [data-theme='dark'] .hw-scope {
          --hr-surface-1: #1E1B2E; --hr-surface-2: #282440; --hr-surface-3: #322C4E;
          --hr-ink-1: #F0E8FF; --hr-ink-3: #9a8fbf; --hr-ink-4: #6a5f8f;
          --hr-border-2: #3A3060; --hr-border-3: #574589;
          --hr-pink-strong: #ff9dc0; --hr-peach-strong: #ffb69b;
        }
        @keyframes hwCaretBlink { 0%,50%{opacity:1} 50.01%,100%{opacity:0} }
        .hw-dots span { display:inline-block; width:5px; height:5px; border-radius:50%; background:var(--hr-peach-strong); margin:0 1.5px; animation:hwBounce 1.2s infinite ease-in-out; }
        .hw-dots span:nth-child(2){animation-delay:.16s} .hw-dots span:nth-child(3){animation-delay:.32s}
        @keyframes hwBounce { 0%,80%,100%{transform:scale(.5);opacity:.4} 40%{transform:scale(1);opacity:1} }
        .hw-tool:focus-visible { outline: 2px solid var(--hr-pink-strong); outline-offset: 2px; }
        .hw-tool:hover { border-color: var(--hr-border-3); }
        .hw-tool-danger:hover { color: var(--hr-peach-strong); border-color: var(--hr-peach-strong); }
        @media (prefers-reduced-motion: reduce) {
          .hw-dots span { animation: none; opacity: .7; }
          .hw-scope [style*="hwCaretBlink"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

const toolBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '9px 16px', borderRadius: 999, border: '1px solid var(--hr-border-2)',
  background: 'var(--hr-surface-2)', color: 'var(--hr-ink-3)', fontSize: 12, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'var(--hr-hangul)',
};
