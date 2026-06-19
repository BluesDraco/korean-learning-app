const INITIALS = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const MEDIALS  = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const FINALS   = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const DOUBLE_JAMO: Record<string, string> = {
  'ㄱㄱ':'ㄲ','ㄷㄷ':'ㄸ','ㅂㅂ':'ㅃ','ㅅㅅ':'ㅆ','ㅈㅈ':'ㅉ',
  'ㄱㅅ':'ㄳ','ㄴㅈ':'ㄵ','ㄴㅎ':'ㄶ','ㄹㄱ':'ㄺ','ㄹㅁ':'ㄻ',
  'ㄹㅂ':'ㄼ','ㄹㅅ':'ㄽ','ㄹㅌ':'ㄾ','ㄹㅍ':'ㄿ','ㄹㅎ':'ㅀ','ㅂㅅ':'ㅄ',
};

function isSyllable(c: string) { const code = c.charCodeAt(0); return code >= 0xAC00 && code <= 0xD7A3; }

export function composeJamo(s: string): string {
  const chars = [...s];
  const out: string[] = [];
  let i = 0;
  while (i < chars.length) {
    const c0 = chars[i];
    if (isSyllable(c0) || !INITIALS.includes(c0)) { out.push(c0); i++; continue; }
    if (i + 1 >= chars.length || !MEDIALS.includes(chars[i + 1])) { out.push(c0); i++; continue; }
    const choIdx = INITIALS.indexOf(c0);
    const jungIdx = MEDIALS.indexOf(chars[i + 1]);
    i += 2;
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
  return composeJamo(s.normalize('NFC')).replace(/[。？！，,.?!、…\s]+/g, '').trim();
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

export function getCharDiff(userInput: string, correct: string) {
  const userDiff: DiffSegment[] = [];
  const correctDiff: DiffSegment[] = [];
  const notes: string[] = [];
  const maxLen = Math.max(userInput.length, correct.length);

  for (let i = 0; i < maxLen; i++) {
    const uc = userInput[i] || '';
    const cc = correct[i] || '';

    if (!uc) {
      correctDiff.push({ char: cc, status: 'missing' });
      notes.push(`缺少: "${cc}"`);
    } else if (!cc) {
      userDiff.push({ char: uc, status: 'extra' });
      notes.push(`多余: "${uc}"`);
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
        if (dU.initial !== dC.initial) parts.push(`辅音 ${dU.initial}→${dC.initial}`);
        if (dU.medial  !== dC.medial)  parts.push(`元音 ${dU.medial}→${dC.medial}`);
        if (dU.final   !== dC.final)   parts.push(`尾音 ${dU.final || '无'}→${dC.final || '无'}`);
        if (parts.length) notes.push(`"${uc}"→"${cc}": ${parts.join('，')}`);
        else notes.push(`"${uc}" 应为 "${cc}"`);
      } else {
        notes.push(`"${uc}" 应为 "${cc}"`);
      }
    }
  }

  return { userDiff, correctDiff, notes };
}
