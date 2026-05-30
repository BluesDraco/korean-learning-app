'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Pen, Undo2, Trash2, Check, Loader2, AlertCircle } from 'lucide-react';

interface Props {
  onInsert: (text: string) => void;
  onCancel: () => void;
}

interface Stroke {
  points: { x: number; y: number; pressure: number }[];
}

function drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  if (stroke.points.length < 2) return;
  ctx.beginPath();
  ctx.strokeStyle = '#1e293b';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (let i = 0; i < stroke.points.length; i++) {
    const p = stroke.points[i];
    const pressure = Math.max(0.3, p.pressure || 0.5);
    ctx.lineWidth = 2 + pressure * 4;
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();
}

export function HandwritingPad({ onInsert, onCancel }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const isDrawingRef = useRef(false);
  const currentPointsRef = useRef<{ x: number; y: number; pressure: number }[]>([]);
  const [recognized, setRecognized] = useState('');
  const [manualText, setManualText] = useState('');
  const [recognizing, setRecognizing] = useState(false);
  const [error, setError] = useState('');
  const [canvasSize, setCanvasSize] = useState({ w: 400, h: 280 });
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Resize canvas to fit container (debounced)
  useEffect(() => {
    const resize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const w = rect.width - 16;
        const h = Math.min(280, window.innerHeight * 0.35);
        setCanvasSize({ w, h });
      }, 100);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, []);

  // Redraw background + all completed strokes
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid pattern
    ctx.strokeStyle = '#e5e7eb20';
    ctx.lineWidth = 0.5;
    const gridSize = 40;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Center crosshair
    ctx.strokeStyle = '#e5e7eb40';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([4, 8]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    for (const stroke of strokes) {
      drawStroke(ctx, stroke);
    }
  }, [strokes]);

  useEffect(() => { redraw(); }, [redraw, canvasSize]);

  const getPos = useCallback((e: React.PointerEvent): { x: number; y: number; pressure: number } => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
      pressure: e.pressure || 0.5,
    };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    canvasRef.current?.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    // Redraw to get a clean background + existing strokes for the new drawing layer
    redraw();
    const pos = getPos(e);
    currentPointsRef.current = [pos];
    // Draw initial dot
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = '#1e293b';
      ctx.arc(pos.x, pos.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [getPos, redraw]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDrawingRef.current) return;
    const pos = getPos(e);
    const points = currentPointsRef.current;
    const prev = points[points.length - 1];
    points.push(pos);

    // Draw directly to canvas — no state update per pixel
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && prev) {
      ctx.beginPath();
      ctx.strokeStyle = '#1e293b';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const pressure = Math.max(0.3, pos.pressure || 0.5);
      ctx.lineWidth = 2 + pressure * 4;
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  }, [getPos]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    canvasRef.current?.releasePointerCapture(e.pointerId);
    isDrawingRef.current = false;
    const points = currentPointsRef.current;
    if (points.length >= 2) {
      setStrokes((prev) => [...prev, { points: [...points] }]);
    }
    currentPointsRef.current = [];
  }, []);

  const undo = useCallback(() => {
    setStrokes((prev) => prev.slice(0, -1));
    setRecognized('');
    setError('');
  }, []);

  const clear = useCallback(() => {
    setStrokes([]);
    setRecognized('');
    setManualText('');
    setError('');
  }, []);

  const recognize = useCallback(async () => {
    if (strokes.length === 0) return;
    setRecognizing(true);
    setError('');
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Force a redraw first so the canvas is up-to-date
      redraw();
      const dataUrl = canvas.toDataURL('image/png');
      const res = await fetch('/api/ai/handwriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setRecognized(data.text || '');
      setManualText(data.text || '');
    } catch (err: any) {
      setError(err.message || '识别失败');
    } finally {
      setRecognizing(false);
    }
  }, [strokes, redraw]);

  const confirm = useCallback(() => {
    const text = manualText.trim() || recognized.trim();
    if (text) {
      onInsert(text);
      clear();
    }
  }, [manualText, recognized, onInsert, clear]);

  return (
    <div className="bg-[var(--bg-soft)] border-t border-[var(--border-color)] rounded-t-2xl">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border-color)]/60">
        <Pen size={16} className="text-[var(--pink-primary)]" />
        <span className="text-sm font-medium text-[var(--text-primary)]">手写</span>

        <div className="flex-1" />

        <button
          onClick={undo}
          disabled={strokes.length === 0}
          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)] disabled:opacity-30 transition-colors"
          title="撤销"
        >
          <Undo2 size={16} />
        </button>
        <button
          onClick={clear}
          disabled={strokes.length === 0}
          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 disabled:opacity-30 transition-colors"
          title="清除"
        >
          <Trash2 size={16} />
        </button>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors text-xs font-medium"
          title="切换到键盘"
        >
          ⌨
        </button>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="p-2">
        <canvas
          ref={canvasRef}
          width={canvasSize.w}
          height={canvasSize.h}
          className="w-full rounded-xl bg-[#faf9f6] border border-[var(--border-color)]/80 touch-none cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
      </div>

      {/* Recognition result + manual input */}
      <div className="px-3 pb-3 space-y-2">
        {/* Recognize button */}
        <button
          onClick={recognize}
          disabled={strokes.length === 0 || recognizing}
          className="w-full py-2 rounded-xl bg-[var(--purple-soft)]/15 text-[var(--purple-soft)] text-sm font-medium hover:bg-[var(--purple-soft)]/25 disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
        >
          {recognizing ? (
            <><Loader2 size={14} className="animate-spin" /> 识别中...</>
          ) : (
            <>✨ 识别手写</>
          )}
        </button>

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-amber-500">
            <AlertCircle size={12} />
            {error}，请手动输入
          </div>
        )}

        {/* Input + confirm row */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            placeholder="手写识别结果 / 手动输入..."
            className="flex-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)]/60"
            onKeyDown={(e) => {
              if (e.key === 'Enter') confirm();
            }}
          />
          <button
            onClick={confirm}
            disabled={!manualText.trim() && !recognized.trim()}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center gap-1.5"
          >
            <Check size={15} />
            确认
          </button>
        </div>
      </div>
    </div>
  );
}
