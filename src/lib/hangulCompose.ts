/**
 * Hangul jamo buffer composition + QWERTY (Dubeolsik) mapping.
 * 抽自 KoreanKeyboard 组件，供工具页复用。原组件不改动。
 */

export const CHO  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
export const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
export const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const CHO_SET = new Set(CHO);
const JUNG_SET = new Set(JUNG);

const FC: Record<string, Record<string, string>> = {
  'ㄱ': { 'ㅅ': 'ㄳ' },
  'ㄴ': { 'ㅈ': 'ㄵ', 'ㅎ': 'ㄶ' },
  'ㄹ': { 'ㄱ': 'ㄺ', 'ㅁ': 'ㄻ', 'ㅂ': 'ㄼ', 'ㅅ': 'ㄽ', 'ㅌ': 'ㄾ', 'ㅍ': 'ㄿ', 'ㅎ': 'ㅀ' },
  'ㅂ': { 'ㅅ': 'ㅄ' },
};
const VC: Record<string, Record<string, string>> = {
  'ㅗ': { 'ㅏ': 'ㅘ', 'ㅐ': 'ㅙ', 'ㅣ': 'ㅚ' },
  'ㅜ': { 'ㅓ': 'ㅝ', 'ㅔ': 'ㅞ', 'ㅣ': 'ㅟ' },
  'ㅡ': { 'ㅣ': 'ㅢ' },
};

function isC(j: string) { return CHO_SET.has(j); }
function isV(j: string) { return JUNG_SET.has(j); }

function buildSyl(cho: string, jung: string, jong: string): string {
  const ci = CHO.indexOf(cho);
  const vi = JUNG.indexOf(jung);
  const fi = JONG.indexOf(jong);
  if (ci < 0 || vi < 0 || fi < 0) return cho + jung + jong;
  return String.fromCharCode(0xAC00 + ci * 588 + vi * 28 + fi);
}

/** jamo 数组组合为可显示韩文（含未组合 jamo） */
export function composeBuffer(buf: string[]): string {
  const out: string[] = [];
  let i = 0;
  while (i < buf.length) {
    if (isV(buf[i])) {
      let vowel = buf[i];
      i++;
      if (i < buf.length && isV(buf[i])) {
        const c = VC[vowel]?.[buf[i]];
        if (c) { vowel = c; i++; }
      }
      if (i < buf.length && isC(buf[i])) {
        let maybeFinal = buf[i];
        let nextI = i + 1;
        if (nextI < buf.length && isC(buf[nextI])) {
          const fc = FC[maybeFinal]?.[buf[nextI]];
          if (fc) { maybeFinal = fc; nextI++; }
        }
        if (nextI >= buf.length || !isV(buf[nextI])) {
          out.push(buildSyl('ㅇ', vowel, maybeFinal));
          i = nextI;
        } else {
          out.push(vowel);
        }
      } else {
        out.push(vowel);
      }
      continue;
    }
    if (buf[i] === ' ') { out.push(' '); i++; continue; }

    const cho = buf[i];
    i++;
    if (i >= buf.length || !isV(buf[i])) {
      out.push(cho);
      continue;
    }
    let jung = buf[i];
    i++;
    if (i < buf.length && isV(buf[i])) {
      const c = VC[jung]?.[buf[i]];
      if (c) { jung = c; i++; }
    }
    let jong = '';
    if (i < buf.length && isC(buf[i])) {
      let maybeJong = buf[i];
      let nextI = i + 1;
      if (nextI < buf.length && isC(buf[nextI])) {
        const fc = FC[maybeJong]?.[buf[nextI]];
        if (fc) { maybeJong = fc; nextI++; }
      }
      if (nextI >= buf.length || !isV(buf[nextI])) {
        jong = maybeJong;
        i = nextI;
      }
    }
    out.push(buildSyl(cho, jung, jong));
  }
  return out.join('');
}

export const COMPOUND_JUNG: Record<string, string[]> = {
  'ㅘ': ['ㅗ','ㅏ'], 'ㅙ': ['ㅗ','ㅐ'], 'ㅚ': ['ㅗ','ㅣ'],
  'ㅝ': ['ㅜ','ㅓ'], 'ㅞ': ['ㅜ','ㅔ'], 'ㅟ': ['ㅜ','ㅣ'],
  'ㅢ': ['ㅡ','ㅣ'],
};
export const COMPOUND_JONG: Record<string, string[]> = {
  'ㄳ': ['ㄱ','ㅅ'], 'ㄵ': ['ㄴ','ㅈ'], 'ㄶ': ['ㄴ','ㅎ'],
  'ㄺ': ['ㄹ','ㄱ'], 'ㄻ': ['ㄹ','ㅁ'], 'ㄼ': ['ㄹ','ㅂ'],
  'ㄽ': ['ㄹ','ㅅ'], 'ㄾ': ['ㄹ','ㅌ'], 'ㄿ': ['ㄹ','ㅍ'],
  'ㅀ': ['ㄹ','ㅎ'], 'ㅄ': ['ㅂ','ㅅ'],
};

/** 拆解一个韩文音节为 jamo 数组 */
export function decomposeSyl(syl: string): string[] {
  const code = syl.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7AF) return [syl];
  const offset = code - 0xAC00;
  const fi = offset % 28;
  const vi = ((offset - fi) / 28) % 21;
  const ci = ((offset - fi) / 28 - vi) / 21;
  const parts: string[] = [CHO[ci]];
  const j = JUNG[vi];
  parts.push(...(COMPOUND_JUNG[j] || [j]));
  if (fi > 0) {
    const f = JONG[fi];
    parts.push(...(COMPOUND_JONG[f] || [f]));
  }
  return parts;
}

export function decomposeFull(text: string): string[] {
  const out: string[] = [];
  for (const ch of text) {
    if (ch === ' ') { out.push(' '); continue; }
    const code = ch.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7AF) {
      out.push(...decomposeSyl(ch));
    } else {
      out.push(ch);
    }
  }
  return out;
}

/** QWERTY (Dubeolsik) → jamo 映射 */
export const QWERTY_TO_JAMO: Record<string, { base: string; shift?: string }> = {
  q: { base: 'ㅂ', shift: 'ㅃ' },
  w: { base: 'ㅈ', shift: 'ㅉ' },
  e: { base: 'ㄷ', shift: 'ㄸ' },
  r: { base: 'ㄱ', shift: 'ㄲ' },
  t: { base: 'ㅅ', shift: 'ㅆ' },
  y: { base: 'ㅛ' },
  u: { base: 'ㅕ' },
  i: { base: 'ㅑ' },
  o: { base: 'ㅐ', shift: 'ㅒ' },
  p: { base: 'ㅔ', shift: 'ㅖ' },
  a: { base: 'ㅁ' },
  s: { base: 'ㄴ' },
  d: { base: 'ㅇ' },
  f: { base: 'ㄹ' },
  g: { base: 'ㅎ' },
  h: { base: 'ㅗ' },
  j: { base: 'ㅓ' },
  k: { base: 'ㅏ' },
  l: { base: 'ㅣ' },
  z: { base: 'ㅋ' },
  x: { base: 'ㅌ' },
  c: { base: 'ㅊ' },
  v: { base: 'ㅍ' },
  b: { base: 'ㅠ' },
  n: { base: 'ㅜ' },
  m: { base: 'ㅡ' },
};

/** 单个 QWERTY 键 (a-z) + shift 状态 → 对应 jamo；返回 null 表示无映射 */
export function qwertyKeyToJamo(key: string, shift: boolean): string | null {
  const k = key.toLowerCase();
  const map = QWERTY_TO_JAMO[k];
  if (!map) return null;
  return shift && map.shift ? map.shift : map.base;
}
