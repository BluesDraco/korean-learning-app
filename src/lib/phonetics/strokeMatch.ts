// 笔画路径匹配算法
// 把 SVG path (M/L/C 命令) 采样成点列，与用户笔画点列做双向 Hausdorff 比较

export interface Point { x: number; y: number; }

// ─────────── SVG path 解析 ───────────

// 解析 `M x y L x y M x y C x y x y x y` 等。返回多段子路径（每段折线/曲线 → 等距采样后的密点序列）。
// 本数据集只用 M / L / C 三种命令。
export function parseSvgPath(d: string, samplesPerSeg = 40): Point[] {
  const tokens = d.replace(/,/g, ' ').match(/[MLCmlc]|-?\d+(\.\d+)?/g) ?? [];
  const points: Point[] = [];
  let i = 0;
  let cur: Point = { x: 0, y: 0 };
  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd === 'M' || cmd === 'm') {
      const x = parseFloat(tokens[i++]);
      const y = parseFloat(tokens[i++]);
      cur = cmd === 'm' && points.length ? { x: cur.x + x, y: cur.y + y } : { x, y };
      points.push(cur);
    } else if (cmd === 'L' || cmd === 'l') {
      const x = parseFloat(tokens[i++]);
      const y = parseFloat(tokens[i++]);
      const next = cmd === 'l' ? { x: cur.x + x, y: cur.y + y } : { x, y };
      // 直线段：按距离按比例插值
      const segLen = dist(cur, next);
      const n = Math.max(2, Math.round(segLen / 5));
      for (let s = 1; s <= n; s++) {
        const t = s / n;
        points.push({ x: cur.x + (next.x - cur.x) * t, y: cur.y + (next.y - cur.y) * t });
      }
      cur = next;
    } else if (cmd === 'C' || cmd === 'c') {
      const c1 = { x: parseFloat(tokens[i++]), y: parseFloat(tokens[i++]) };
      const c2 = { x: parseFloat(tokens[i++]), y: parseFloat(tokens[i++]) };
      const end = { x: parseFloat(tokens[i++]), y: parseFloat(tokens[i++]) };
      const abs1 = cmd === 'c' ? { x: cur.x + c1.x, y: cur.y + c1.y } : c1;
      const abs2 = cmd === 'c' ? { x: cur.x + c2.x, y: cur.y + c2.y } : c2;
      const absEnd = cmd === 'c' ? { x: cur.x + end.x, y: cur.y + end.y } : end;
      for (let s = 1; s <= samplesPerSeg; s++) {
        const t = s / samplesPerSeg;
        points.push(bezier(cur, abs1, abs2, absEnd, t));
      }
      cur = absEnd;
    }
  }
  return points;
}

function bezier(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

function dist(a: Point, b: Point): number {
  const dx = a.x - b.x, dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// ─────────── 等距采样 ───────────

// 按累积弧长重新均匀采样 n 个点
export function samplePath(points: Point[], n = 20): Point[] {
  if (points.length === 0) return [];
  if (points.length === 1) return new Array(n).fill(points[0]);
  const lens: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    lens.push(lens[i - 1] + dist(points[i - 1], points[i]));
  }
  const total = lens[lens.length - 1];
  if (total === 0) return new Array(n).fill(points[0]);
  const out: Point[] = [];
  for (let k = 0; k < n; k++) {
    const target = (k / (n - 1)) * total;
    let j = 0;
    while (j < lens.length - 1 && lens[j + 1] < target) j++;
    const segLen = lens[j + 1] - lens[j];
    const t = segLen === 0 ? 0 : (target - lens[j]) / segLen;
    out.push({
      x: points[j].x + (points[j + 1].x - points[j].x) * t,
      y: points[j].y + (points[j + 1].y - points[j].y) * t,
    });
  }
  return out;
}

// ─────────── Modified Hausdorff 距离 ───────────

// 注意：不是真 Hausdorff（max of min）。这里是 mean of min（双向均值），更宽松不被极端点拖偏。
export function modifiedHausdorff(a: Point[], b: Point[]): number {
  if (a.length === 0 || b.length === 0) return Infinity;
  const forward = avg(a.map((p) => minDist(p, b)));
  const backward = avg(b.map((p) => minDist(p, a)));
  return (forward + backward) / 2;
}

function minDist(p: Point, set: Point[]): number {
  let m = Infinity;
  for (const q of set) {
    const d = dist(p, q);
    if (d < m) m = d;
  }
  return m;
}

function avg(arr: number[]): number {
  return arr.reduce((s, x) => s + x, 0) / arr.length;
}

// ─────────── 笔画匹配（带坐标转换） ───────────

const THRESHOLD = 60;       // 60px ≈ 23% canvas 高度，宽松

export interface StrokeMatchResult {
  [k: string]: unknown;
  distance: number;
  ok: boolean;
  orderHint?: number;       // 用户实际更像第 N 笔
}

// userPoints: canvas 像素坐标
// idealSvgD: SVG path d（200×200 viewBox）
// canvasW/H: canvas 像素宽高（用于缩放 SVG 点，保持纵横比，理想笔画居中）
export function matchStroke(
  userPoints: Point[],
  idealSvgD: string,
  canvasW: number,
  canvasH: number,
): StrokeMatchResult {
  if (userPoints.length < 2) return { distance: Infinity, ok: false };
  const idealDense = parseSvgPath(idealSvgD);
  // 保纵横比缩放：取较小因子，让整图等比贴合 canvas 短边
  const scale = Math.min(canvasW, canvasH) / 200;
  const offsetX = (canvasW - 200 * scale) / 2;
  const offsetY = (canvasH - 200 * scale) / 2;
  const idealCanvas = idealDense.map((p) => ({
    x: p.x * scale + offsetX,
    y: p.y * scale + offsetY,
  }));
  const idealSampled = samplePath(idealCanvas, 20);
  const userSampled = samplePath(userPoints, 20);
  const distance = modifiedHausdorff(userSampled, idealSampled);
  return { distance, ok: distance <= THRESHOLD };
}

// 找用户笔画最像第几笔（用于笔顺提示）
// indexRange 限制比较范围，默认查所有；笔顺检测建议传 [i, i+1] 避免误报到很后的笔
export function findBestMatchIndex(
  userPoints: Point[],
  idealStrokes: Array<{ d: string }>,
  canvasW: number,
  canvasH: number,
  indexRange?: [number, number],
): { index: number; distance: number } {
  const [from, to] = indexRange ?? [0, idealStrokes.length - 1];
  let best = -1;
  let bestDist = Infinity;
  for (let i = from; i <= to && i < idealStrokes.length; i++) {
    const r = matchStroke(userPoints, idealStrokes[i].d, canvasW, canvasH);
    if (r.distance < bestDist) { bestDist = r.distance; best = i; }
  }
  return { index: best, distance: bestDist };
}
