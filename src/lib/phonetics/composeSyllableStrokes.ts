// 把字母级笔画（200×200 viewBox）按音节布局仿射变换到方块字内，合成音节笔画
// cho → jung → jong 的笔顺顺序

import type { ProgressiveStroke } from '@/data/phonetics-progressive';
import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';

type Box = [x: number, y: number, w: number, h: number];

interface TrackTable {
  cho: Box;
  jung: Box;
  jong?: Box;
}

// layout: 'vertical' = 元音在右（ㅏ类）；'horizontal' = 元音在下（ㅗ类）
function pickTracks(layout: 'horizontal' | 'vertical', hasJong: boolean): TrackTable {
  if (!hasJong) {
    return layout === 'vertical'
      ? { cho: [10, 10, 90, 180], jung: [100, 10, 90, 180] }
      : { cho: [10, 10, 180, 90], jung: [10, 100, 180, 90] };
  }
  return layout === 'vertical'
    ? { cho: [10, 10, 90, 120], jung: [100, 10, 90, 120], jong: [10, 130, 180, 60] }
    : { cho: [10, 10, 180, 70], jung: [10, 80, 180, 60], jong: [10, 140, 180, 50] };
}

// SVG path 数字逐对缩放+平移。命令字母保留原样，本数据集只用 M/L/C 绝对命令。
function transformPath(d: string, dst: Box): string {
  const [dx, dy, dw, dh] = dst;
  const sx = dw / 200;
  const sy = dh / 200;
  let xTurn = true; // 下一个数字是 x（true）还是 y（false）
  return d.replace(/([MLCmlc])|(-?\d+(?:\.\d+)?)/g, (_, cmd, num) => {
    if (cmd) {
      xTurn = true;
      return cmd;
    }
    const v = parseFloat(num);
    const out = xTurn ? v * sx + dx : v * sy + dy;
    xTurn = !xTurn;
    return out.toFixed(2);
  });
}

function transformStroke(stroke: ProgressiveStroke, dst: Box, label: string, idx: number, lang: Lang): ProgressiveStroke {
  const [dx, dy, dw, dh] = dst;
  const sx = dw / 200;
  const sy = dh / 200;
  return {
    d: transformPath(stroke.d, dst),
    arrow: {
      x: stroke.arrow.x * sx + dx,
      y: stroke.arrow.y * sy + dy,
      rot: stroke.arrow.rot,
    },
    hint: t('phonetics.stroke_format', lang, { label, n: idx + 1, hint: stroke.hint }),
  };
}

export function composeSyllableStrokes(
  choStrokes: ProgressiveStroke[],
  jungStrokes: ProgressiveStroke[],
  jongStrokes: ProgressiveStroke[] | undefined,
  layout: 'horizontal' | 'vertical',
  lang: Lang = 'zh',
): ProgressiveStroke[] {
  const hasJong = !!(jongStrokes && jongStrokes.length > 0);
  const tracks = pickTracks(layout, hasJong);
  const out: ProgressiveStroke[] = [];
  choStrokes.forEach((s, i) => out.push(transformStroke(s, tracks.cho, '①', i, lang)));
  jungStrokes.forEach((s, i) => out.push(transformStroke(s, tracks.jung, '②', i, lang)));
  if (hasJong && tracks.jong) {
    jongStrokes!.forEach((s, i) => out.push(transformStroke(s, tracks.jong!, '③', i, lang)));
  }
  return out;
}
