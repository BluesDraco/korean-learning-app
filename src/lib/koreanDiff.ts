import { t } from './i18n';
import type { Lang } from './i18n';

const INITIALS = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const MEDIALS  = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const FINALS   = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const DOUBLE_JAMO: Record<string, string> = {
  'ㄱㄱ':'ㄲ','ㄷㄷ':'ㄸ','ㅂㅂ':'ㅃ','ㅅㅅ':'ㅆ','ㅈㅈ':'ㅉ',
  'ㄱㅅ':'ㄳ','ㄴㅈ':'ㄵ','ㄴㅎ':'ㄶ','ㄹㄱ':'ㄺ','ㄹㅁ':'ㄻ',
  'ㄹㅂ':'ㄼ','ㄹㅅ':'ㄽ','ㄹㅌ':'ㄾ','ㄹㅍ':'ㄿ','ㄹㅎ':'ㅀ','ㅂㅅ':'ㅄ',
};

// 相邻裸元音合并成复合元音(ㅗ+ㅏ→ㅘ, ㅡ+ㅣ→ㅢ 等),使分开打与整体打判定等价
const COMPOUND_VOWEL: Record<string, string> = {
  'ㅗㅏ':'ㅘ','ㅗㅐ':'ㅙ','ㅗㅣ':'ㅚ',
  'ㅜㅓ':'ㅝ','ㅜㅔ':'ㅞ','ㅜㅣ':'ㅟ','ㅡㅣ':'ㅢ',
};

function isSyllable(c: string) { const code = c.charCodeAt(0); return code >= 0xAC00 && code <= 0xD7A3; }

export function composeJamo(s: string): string {
  const chars = [...s];
  const out: string[] = [];
  let i = 0;
  while (i < chars.length) {
    const c0 = chars[i];
    if (isSyllable(c0) || !INITIALS.includes(c0)) {
      // 裸元音打头时,尝试与下一个裸元音合并成复合元音
      if (MEDIALS.includes(c0) && i + 1 < chars.length) {
        const merged = COMPOUND_VOWEL[c0 + chars[i + 1]];
        if (merged) { out.push(merged); i += 2; continue; }
      }
      out.push(c0); i++; continue;
    }
    if (i + 1 >= chars.length || !MEDIALS.includes(chars[i + 1])) { out.push(c0); i++; continue; }
    const choIdx = INITIALS.indexOf(c0);
    let jung = chars[i + 1];
    i += 2;
    // 中声后若跟可组合的裸元音,合并成复合元音(ㄱ+ㅜ+ㅣ→귀)
    if (i < chars.length) {
      const merged = COMPOUND_VOWEL[jung + chars[i]];
      if (merged) { jung = merged; i++; }
    }
    const jungIdx = MEDIALS.indexOf(jung);
    let jongIdx = 0;
    if (i < chars.length && INITIALS.includes(chars[i])) {
      let jongCh = chars[i];
      let jongAdvance = 1;
      if (i + 1 < chars.length && INITIALS.includes(chars[i + 1])) {
        const doubled = DOUBLE_JAMO[jongCh + chars[i + 1]];
        if (doubled) {
          const afterDouble = i + 2;
          if (afterDouble >= chars.length || !MEDIALS.includes(chars[afterDouble])) {
            jongCh = doubled;
            jongAdvance = 2;
          }
        }
      }
      const afterJong = i + jongAdvance;
      if (afterJong < chars.length && MEDIALS.includes(chars[afterJong])) {
        // 이 자모는 다음 음절 초성
      } else {
        const ji = FINALS.indexOf(jongCh);
        if (ji > 0) { jongIdx = ji; i += jongAdvance; }
      }
    }
    out.push(String.fromCodePoint(0xAC00 + (choIdx * 21 + jungIdx) * 28 + jongIdx));
  }
  return out.join('');
}

export function normalizeKorean(s: string): string {
  return composeJamo(s.normalize('NFC'))
    .replace(/[。？！，,.?!、…～~·ㆍ「」『』（）()《》〈〉""''\-—\s]+/g, '')
    .trim();
}

function isKorean(ch: string) {
  const c = ch.charCodeAt(0);
  return c >= 0xAC00 && c <= 0xD7A3;
}

function decompose(syllable: string) {
  const code = syllable.charCodeAt(0) - 0xAC00;
  const init = Math.floor(code / (21 * 28));
  const med  = Math.floor((code % (21 * 28)) / 28);
  const fin  = code % 28;
  return { initial: INITIALS[init], medial: MEDIALS[med], final: FINALS[fin] };
}

export interface DiffSegment { char: string; status: 'correct' | 'wrong' | 'extra' | 'missing'; }

// ── 跟读对照专用：LCS 对齐版 diff ──
// getCharDiff 按位置硬比，中间漏/多一字会导致其后全部错位标红。
// 跟读场景（识别文本 vs 目标）用 Needleman-Wunsch 对齐，把漏字/多字/错字分开。
export interface AlignedCell {
  status: 'ok' | 'sub' | 'ins' | 'missing'; // ins=用户多说, missing=用户漏说
  char: string;   // 展示用：ok/sub/ins 取用户字，missing 取目标字
  target?: string; // sub 时的正确字
}

function phonemeNote(uc: string, cc: string, lang: Lang): string | null {
  if (!isKorean(uc) || !isKorean(cc)) return null;
  const dU = decompose(uc);
  const dC = decompose(cc);
  const parts: string[] = [];
  if (dU.initial !== dC.initial) parts.push(t('koreanDiff.phoneme_consonant', lang, { got: dU.initial, expected: dC.initial }));
  if (dU.medial !== dC.medial) parts.push(t('koreanDiff.phoneme_vowel', lang, { got: dU.medial, expected: dC.medial }));
  if (dU.final !== dC.final) parts.push(t('koreanDiff.phoneme_final', lang, { got: dU.final || t('koreanDiff.phoneme_none', lang), expected: dC.final || t('koreanDiff.phoneme_none', lang) }));
  return parts.length ? parts.join('，') : null;
}

export function getAlignedDiff(userInput: string, correct: string, lang: Lang = 'zh'): { cells: AlignedCell[]; notes: string[] } {
  const u = normalizeKorean(userInput);
  const c = normalizeKorean(correct);
  const n = u.length;
  const m = c.length;
  const dp: number[][] = Array.from({ length: n + 1 }, (_, i) =>
    Array.from({ length: m + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = u[i - 1] === c[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j - 1] + cost, dp[i - 1][j] + 1, dp[i][j - 1] + 1);
    }
  }
  const cells: AlignedCell[] = [];
  const notes: string[] = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + (u[i - 1] === c[j - 1] ? 0 : 1)) {
      if (u[i - 1] === c[j - 1]) {
        cells.unshift({ status: 'ok', char: u[i - 1] });
      } else {
        cells.unshift({ status: 'sub', char: u[i - 1], target: c[j - 1] });
        const pn = phonemeNote(u[i - 1], c[j - 1], lang);
        notes.unshift(pn ? `"${u[i - 1]}"→"${c[j - 1]}"：${pn}` : t('koreanDiff.should_be', lang, { got: u[i - 1], expected: c[j - 1] }));
      }
      i--; j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      cells.unshift({ status: 'ins', char: u[i - 1] });
      notes.unshift(t('koreanDiff.extra_said', lang, { char: u[i - 1] }));
      i--;
    } else {
      cells.unshift({ status: 'missing', char: c[j - 1] });
      notes.unshift(t('koreanDiff.missed', lang, { char: c[j - 1] }));
      j--;
    }
  }
  return { cells, notes };
}

export function getCharDiff(userInput: string, correct: string, lang: Lang = 'zh') {
  const userDiff: DiffSegment[] = [];
  const correctDiff: DiffSegment[] = [];
  const notes: string[] = [];
  const maxLen = Math.max(userInput.length, correct.length);

  for (let i = 0; i < maxLen; i++) {
    const uc = userInput[i] || '';
    const cc = correct[i] || '';

    if (!uc) {
      correctDiff.push({ char: cc, status: 'missing' });
      notes.push(t('koreanDiff.missing', lang, { char: cc }));
    } else if (!cc) {
      userDiff.push({ char: uc, status: 'extra' });
      notes.push(t('koreanDiff.extra', lang, { char: uc }));
    } else if (uc === cc) {
      userDiff.push({ char: uc, status: 'correct' });
      correctDiff.push({ char: cc, status: 'correct' });
    } else {
      userDiff.push({ char: uc, status: 'wrong' });
      correctDiff.push({ char: cc, status: 'wrong' });

      if (isKorean(uc) && isKorean(cc)) {
        const dU = decompose(uc);
        const dC = decompose(cc);
        const parts: string[] = [];
        if (dU.initial !== dC.initial) parts.push(t('koreanDiff.phoneme_consonant', lang, { got: dU.initial, expected: dC.initial }));
        if (dU.medial  !== dC.medial)  parts.push(t('koreanDiff.phoneme_vowel', lang, { got: dU.medial, expected: dC.medial }));
        if (dU.final   !== dC.final)   parts.push(t('koreanDiff.phoneme_final', lang, { got: dU.final || t('koreanDiff.phoneme_none', lang), expected: dC.final || t('koreanDiff.phoneme_none', lang) }));
        if (parts.length) notes.push(`"${uc}"→"${cc}": ${parts.join('，')}`);
        else notes.push(t('koreanDiff.should_be', lang, { got: uc, expected: cc }));
      } else {
        notes.push(t('koreanDiff.should_be', lang, { got: uc, expected: cc }));
      }
    }
  }

  return { userDiff, correctDiff, notes };
}
