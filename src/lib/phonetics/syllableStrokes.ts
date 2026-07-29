// 把任意韩文音节字（如 '한'/'네'/'학'）拆解到 cho/jung/jong 的 jamo strokes，
// 再走 composeSyllableStrokes 拼成 200×200 音节方块内的笔画数据，供 StrokeCanvas 使用。

import { PROGRESSIVE_STAGES } from '@/data/phonetics-progressive';
import type { ProgressiveStroke } from '@/data/phonetics-progressive';
import { composeSyllableStrokes } from './composeSyllableStrokes';

const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

// 元音方向：这些是"竖排"（元音在初声右侧），其余是"横排"（元音在初声下方）
const VERTICAL_JUNG = new Set(['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅣ']);

// jamo → strokes 索引（延迟构建，冷启动时才扫一遍）
let JAMO_INDEX: Map<string, ProgressiveStroke[]> | null = null;

function getJamoIndex(): Map<string, ProgressiveStroke[]> {
  if (JAMO_INDEX) return JAMO_INDEX;
  const m = new Map<string, ProgressiveStroke[]>();
  PROGRESSIVE_STAGES.forEach((stage) => {
    stage.letters.forEach((l) => {
      if (l.jamo && Array.isArray(l.strokes) && l.strokes.length > 0) {
        // 只在第一次遇到时写入，让 stage1/2/3 覆盖 stage4/5 的空 strokes
        if (!m.has(l.jamo)) m.set(l.jamo, l.strokes);
      }
    });
  });
  JAMO_INDEX = m;
  return m;
}

export function findLetterStrokes(jamo: string): ProgressiveStroke[] {
  return getJamoIndex().get(jamo) ?? [];
}

/** 音节字 → 拼装后的 idealStrokes（用于 StrokeCanvas 的路径匹配） */
export function buildSyllableIdealStrokes(syllable: string): ProgressiveStroke[] {
  if (!syllable) return [];
  const code = syllable.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return [];
  const choIdx = Math.floor(code / 588);
  const jungIdx = Math.floor((code % 588) / 28);
  const jongIdx = code % 28;

  const choS = findLetterStrokes(CHO[choIdx]);
  const jungJamo = JUNG[jungIdx];
  const jungS = findLetterStrokes(jungJamo);
  const jongS = jongIdx > 0 ? findLetterStrokes(JONG[jongIdx]) : undefined;

  if (choS.length === 0 || jungS.length === 0) return [];

  const layout: 'vertical' | 'horizontal' = VERTICAL_JUNG.has(jungJamo) ? 'vertical' : 'horizontal';
  return composeSyllableStrokes(choS, jungS, jongS, layout);
}

/** 音节的目标笔画数 */
export function countSyllableStrokes(syllable: string): number {
  return buildSyllableIdealStrokes(syllable).length;
}
