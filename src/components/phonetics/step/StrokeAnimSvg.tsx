'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ProgressiveStroke } from '@/data/phonetics-progressive';
import { GLYPH_OUTLINES } from '@/data/phonetics-glyph-outlines';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  strokes: ProgressiveStroke[];
  size?: number;
  ghostChar?: string;
}

// 每笔时长 & 停顿
const STROKE_DUR_MS = 900;
const STROKE_GAP_MS = 300;
const EASE = 'cubic-bezier(.16, 1, .3, 1)';

// 缓动函数（CSS ease-out cubic-bezier 的近似），用于 rAF 手动动画
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// 圆圈字(ㅇㅎ)的真圆轮廓用轴对齐矩形 clip 揭示会露出方角穿帮，只有这两个字走中心线描边书写。
// 斜撇字(ㅅㅈㅊㅆㅉ)虽是斜线，但用真实字形轮廓填充 + 竖向矩形从上往下逐笔揭示效果自然，
// 且字形正确(简笔直线拼不出带弧度笔锋的真谚文字母)，故一律优先用 glyph 真实轮廓。
const CIRCLE_JAMO = new Set(['ㅇ', 'ㅎ']);

export default function StrokeAnimSvg({ strokes, size = 200, ghostChar }: Props) {
  const { lang } = useLang();
  const uid = React.useId().replace(/:/g, '');
  const glyph = ghostChar ? GLYPH_OUTLINES[ghostChar] : null;
  // 有真实字形轮廓数据就优先用它填充；仅圆圈字(矩形 clip 穿帮)回落中心线描边。
  const useGlyphOutline = !!glyph && glyph.strokes.length > 0 && !(ghostChar != null && CIRCLE_JAMO.has(ghostChar));
  const glyphStrokes = glyph?.strokes ?? [];

  // 每笔独立进度 [0,1]，rAF 驱动，避免 SMIL 在 iPad Safari 上 drop
  const strokeCount = useGlyphOutline ? glyphStrokes.length : strokes.length;
  const [progress, setProgress] = useState<number[]>(() => Array(strokeCount).fill(0));
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const runIdRef = useRef(0);

  const play = useCallback(() => {
    // 取消上一次
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const myRun = ++runIdRef.current;
    startTimeRef.current = performance.now();
    setProgress(Array(strokeCount).fill(0));

    const totalDur = strokeCount * (STROKE_DUR_MS + STROKE_GAP_MS);
    const tick = (now: number) => {
      if (runIdRef.current !== myRun) return;
      const elapsed = now - startTimeRef.current;
      const next: number[] = [];
      for (let i = 0; i < strokeCount; i++) {
        const strokeStart = i * (STROKE_DUR_MS + STROKE_GAP_MS);
        const localElapsed = elapsed - strokeStart;
        if (localElapsed <= 0) next.push(0);
        else if (localElapsed >= STROKE_DUR_MS) next.push(1);
        else next.push(easeOutCubic(localElapsed / STROKE_DUR_MS));
      }
      setProgress(next);
      if (elapsed < totalDur) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [strokeCount]);

  // 首次挂载 + strokeCount 变化时启动一次
  useEffect(() => {
    play();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      runIdRef.current++; // 让在飞的 rAF 停下
    };
  }, [play]);

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: 'block', margin: '0 auto' }}>
        {useGlyphOutline ? (
          <>
            {/* 用 clipPath 把 glyph 外轮廓切成"已画部分"的形状 */}
            <defs>
              <clipPath id={`glyph-clip-${uid}`} clipPathUnits="userSpaceOnUse">
                {glyphStrokes.map((rects, i) => {
                  const t = progress[i] ?? 0;
                  // 一笔内可能含多个 rect（L 型如 ㄱ=横+竖）。它们必须按数组顺序「依次」揭示，
                  // 而不是共用同一进度同时完成。按各段长度比例切分本笔进度。
                  const lens = rects.map(([, , rw, rh]) => Math.max(rw, rh));
                  const total = lens.reduce((a, b) => a + b, 0) || 1;
                  let cum = 0;
                  return rects.map((r, j) => {
                    const [rx, ry, rw, rh] = r;
                    const start = cum / total;
                    const end = (cum + lens[j]) / total;
                    cum += lens[j];
                    const subT = end <= start ? 1 : Math.max(0, Math.min(1, (t - start) / (end - start)));
                    const horizontal = rw >= rh;
                    const cw = horizontal ? rw * subT : rw;
                    const ch = horizontal ? rh : rh * subT;
                    return <rect key={`${i}-${j}`} x={rx} y={ry} width={cw} height={ch} />;
                  });
                })}
              </clipPath>
            </defs>
            {/* 只渲染一次 glyph，避免多个实例的抗锯齿边缘叠加成细线 */}
            <path
              d={glyph!.d}
              fill="#ff5e92"
              fillRule="evenodd"
              clipPath={`url(#glyph-clip-${uid})`}
            />
          </>
        ) : (
          // 兜底：中心线 stroke 渲染（无 glyph outline 数据时）
          strokes.map((s, i) => {
            const t = progress[i] ?? 0;
            const showArrow = t >= 0.95;
            return (
              <g key={i}>
                <path
                  d={s.d}
                  fill="none"
                  stroke="#ff5e92"
                  strokeWidth={22}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: 1 - t,
                  }}
                />
                <polygon
                  points={`${s.arrow.x - 5},${s.arrow.y - 5} ${s.arrow.x + 6},${s.arrow.y} ${s.arrow.x - 5},${s.arrow.y + 5}`}
                  fill="#ff5e92"
                  transform={`rotate(${s.arrow.rot} ${s.arrow.x} ${s.arrow.y})`}
                  style={{ opacity: showArrow ? 1 : 0, transition: `opacity .3s ${EASE}` }}
                />
              </g>
            );
          })
        )}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 8, flexWrap: 'wrap' }}>
        {(useGlyphOutline ? glyphStrokes : strokes).map((_, i) => {
          const strokeHint = (st?: { hint: string; hintEn?: string }) => st ? (lang === 'en' ? st.hintEn ?? st.hint : st.hint) : undefined;
          const hint = useGlyphOutline
            ? (glyphStrokes.length === strokes.length ? strokeHint(strokes[i]) : t('phonetics.anim_stroke_n', lang, { n: i + 1 }))
            : strokeHint(strokes[i]);
          return (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 14, color: 'var(--color-pink-strong)' }}>
                {['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧'][i] ?? `${i + 1}`}
              </div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'var(--color-ink-3)', marginTop: 2 }}>
                {hint}
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={play}
        style={{
          marginTop: 12, padding: '6px 14px', fontSize: 12,
          fontFamily: 'ui-monospace, monospace',
          border: '1px solid var(--color-border-2)',
          borderRadius: 999, background: 'var(--color-surface-2)',
          color: 'var(--color-ink-3)', cursor: 'pointer',
        }}
      >{t('phonetics.anim_replay', lang)}</button>
    </div>
  );
}
