/**
 * Korean pronunciation normalizer
 * Converts written Korean to spoken form before passing to TTS.
 * Only applied to short text (≤8 syllables) of pure Hangul.
 *
 * Rules: 연음, ㅎ탈락, 격음화, 비음화, 유음화, 구개음화, 경음화, 겹받침 처리
 */

const INITIAL = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const FINAL   = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const CHO_IDX: Record<string, number> = Object.fromEntries(INITIAL.map((c, i) => [c, i]));
const JONG_IDX: Record<string, number> = Object.fromEntries(FINAL.map((c, i) => [c, i]));

// Double batchim: [representative (stays), mover (goes to next syllable as initial)]
const DOUBLE_BATCHIM: Record<string, [string, string]> = {
  'ㄳ': ['ㄱ', 'ㅅ'], 'ㄵ': ['ㄴ', 'ㅈ'], 'ㄶ': ['ㄴ', 'ㅎ'],
  'ㄺ': ['ㄹ', 'ㄱ'],  // 읽어→일거: ㄹ stays, ㄱ moves
  'ㄻ': ['ㄹ', 'ㅁ'], 'ㄼ': ['ㄹ', 'ㅂ'],
  'ㄽ': ['ㄹ', 'ㅅ'], 'ㄾ': ['ㄹ', 'ㅌ'], 'ㄿ': ['ㅂ', 'ㅍ'],
  'ㅀ': ['ㄹ', 'ㅎ'], 'ㅄ': ['ㅂ', 'ㅅ'],
};

const BATCHIM_REP: Record<string, string> = {
  'ㄱ':'ㄱ','ㄲ':'ㄱ','ㄳ':'ㄱ','ㄺ':'ㄱ',
  'ㄴ':'ㄴ','ㄵ':'ㄴ','ㄶ':'ㄴ',
  'ㄷ':'ㄷ','ㅅ':'ㄷ','ㅆ':'ㄷ','ㅈ':'ㄷ','ㅊ':'ㄷ','ㅌ':'ㄷ','ㅎ':'ㄷ',
  'ㄹ':'ㄹ','ㄻ':'ㄹ','ㄼ':'ㄹ','ㄽ':'ㄹ','ㄾ':'ㄹ','ㄿ':'ㄹ','ㅀ':'ㄹ',
  'ㅁ':'ㅁ', 'ㅂ':'ㅂ','ㅄ':'ㅂ', 'ㅇ':'ㅇ', 'ㅍ':'ㅂ','ㅋ':'ㄱ',
};

interface Syl { cho: number; jung: number; jong: number; char: string }

function decompose(code: number): { cho: number; jung: number; jong: number } | null {
  if (code < 0xAC00 || code > 0xD7A3) return null;
  const o = code - 0xAC00;
  return { cho: Math.floor(o / (21 * 28)), jung: Math.floor((o % (21 * 28)) / 28), jong: o % 28 };
}

function compose(cho: number, jung: number, jong: number): string {
  return String.fromCharCode(0xAC00 + cho * 21 * 28 + jung * 28 + jong);
}

function toSyls(text: string): Syl[] {
  return Array.from(text).map((ch) => {
    const d = decompose(ch.charCodeAt(0));
    return d ? { ...d, char: ch } : { cho: -1, jung: -1, jong: -1, char: ch };
  });
}

function fromSyls(syls: Syl[]): string {
  return syls.map((s) => s.cho < 0 ? s.char : compose(s.cho, s.jung, s.jong)).join('');
}

function choOf(c: string): number { return CHO_IDX[c] ?? -1; }
function jongOf(c: string): number { return JONG_IDX[c] ?? 0; }

// Words where the rule engine produces wrong output — map to correct spoken form
const PRONUNCIATION_EXCEPTIONS: Record<string, string> = {
  '맛있다': '마싯따',
  '맛있어': '마시써',
  '맛있어요': '마시써요',
  '맛있는': '마신는',
  '맛없다': '마덥따',
  '맛없어': '마덥써',
  '맛없는': '마덤는',
  '멋있다': '머싯따',
  '멋있어': '머시써',
  '멋있어요': '머시써요',
  '값있다': '가빗따',
  '꽃이': '꼬치',
  '꽃을': '꼬츨',
  '꽃은': '꼬츤',
  '닭이': '달기',
  '닭을': '달글',
  '닭은': '달근',
  '읽어': '일거',
  '읽어요': '일거요',
};

export function normalizeKoreanPronunciation(text: string): string {
  const cleaned = text.trim();

  // Exact match
  if (PRONUNCIATION_EXCEPTIONS[cleaned]) return PRONUNCIATION_EXCEPTIONS[cleaned];

  if (!/^[가-힣\s]+$/.test(cleaned)) return text;

  // For multi-word input, process each token independently so exception table
  // takes precedence per token while rule engine still handles non-exception tokens
  if (cleaned.includes(' ')) {
    return cleaned.split(' ').map((token) => {
      if (!token) return token;
      if (PRONUNCIATION_EXCEPTIONS[token]) return PRONUNCIATION_EXCEPTIONS[token];
      return normalizeKoreanPronunciation(token);
    }).join(' ');
  }

  const syllableCount = Array.from(cleaned.replace(/\s/g, '')).filter((ch) => {
    const c = ch.charCodeAt(0); return c >= 0xAC00 && c <= 0xD7A3;
  }).length;
  if (syllableCount > 20) return text;

  let syls = toSyls(cleaned);

  for (let pass = 0; pass < 3; pass++) {
    const before = fromSyls(syls);

    for (let i = 0; i < syls.length - 1; i++) {
      const curr = syls[i], next = syls[i + 1];
      if (curr.cho < 0 || next.cho < 0) continue;
      const jongChar = FINAL[curr.jong], nextChoChar = INITIAL[next.cho], nextJungIdx = next.jung;

      // ── 겹받침 + 모음 초성 ────────────────────────────────────────
      if (curr.jong !== 0 && next.cho === 11 && DOUBLE_BATCHIM[jongChar]) {
        const [rep, mover] = DOUBLE_BATCHIM[jongChar];
        if (jongChar === 'ㄶ') { syls[i] = { ...curr, jong: jongOf('ㄴ') }; continue; }
        if (jongChar === 'ㅀ') { syls[i] = { ...curr, jong: jongOf('ㄹ') }; continue; }
        const newJong = jongOf(rep), newCho = choOf(mover);
        if (newCho >= 0) { syls[i] = { ...curr, jong: newJong }; syls[i + 1] = { ...next, cho: newCho }; continue; }
      }

      // ── 구개음화: ㄷ/ㅌ + 이 ────────────────────────────────────
      if (curr.jong !== 0 && next.cho === 11 && nextJungIdx === 20) {
        if (jongChar === 'ㄷ') { syls[i] = { ...curr, jong: 0 }; syls[i + 1] = { ...next, cho: choOf('ㅈ') }; continue; }
        if (jongChar === 'ㅌ') { syls[i] = { ...curr, jong: 0 }; syls[i + 1] = { ...next, cho: choOf('ㅊ') }; continue; }
      }
      // ── 구개음화: ㄷ/ㅌ + 히 (격음화+구개음화: 굳히다→구치다) ──────
      if (curr.jong !== 0 && next.cho === 18 && nextJungIdx === 20) {
        if (jongChar === 'ㄷ' || jongChar === 'ㅌ') { syls[i] = { ...curr, jong: 0 }; syls[i + 1] = { ...next, cho: choOf('ㅊ') }; continue; }
      }

      // ── 연음 + ㅎ탈락 ────────────────────────────────────────────
      if (curr.jong !== 0 && next.cho === 11) {
        if (jongChar === 'ㅎ') { syls[i] = { ...curr, jong: 0 }; continue; }
        const mc = choOf(jongChar);
        if (mc >= 0) { syls[i] = { ...curr, jong: 0 }; syls[i + 1] = { ...next, cho: mc }; continue; }
      }

      // ── 격음화: ㅎ받침 + 평음 ────────────────────────────────────
      if (jongChar === 'ㅎ') {
        const m: Record<string, string> = { 'ㄱ': 'ㅋ', 'ㄷ': 'ㅌ', 'ㅂ': 'ㅍ', 'ㅈ': 'ㅊ' };
        if (m[nextChoChar]) { syls[i] = { ...curr, jong: 0 }; syls[i + 1] = { ...next, cho: choOf(m[nextChoChar]) }; continue; }
      }
      // ── 격음화: ㄶ받침 + 평음 (ㄴ 유지, 평음→격음) ──────────────
      if (jongChar === 'ㄶ') {
        const m: Record<string, string> = { 'ㄱ': 'ㅋ', 'ㄷ': 'ㅌ', 'ㅂ': 'ㅍ', 'ㅈ': 'ㅊ' };
        if (m[nextChoChar]) { syls[i] = { ...curr, jong: jongOf('ㄴ') }; syls[i + 1] = { ...next, cho: choOf(m[nextChoChar]) }; continue; }
      }
      // ── 격음화: ㅀ받침 + 평음 (ㄹ 유지, 평음→격음) ──────────────
      if (jongChar === 'ㅀ') {
        const m: Record<string, string> = { 'ㄱ': 'ㅋ', 'ㄷ': 'ㅌ', 'ㅂ': 'ㅍ', 'ㅈ': 'ㅊ' };
        if (m[nextChoChar]) { syls[i] = { ...curr, jong: jongOf('ㄹ') }; syls[i + 1] = { ...next, cho: choOf(m[nextChoChar]) }; continue; }
      }
      // ── 격음화 역방향: 평음 받침 + ㅎ 초성 ──────────────────────
      if (nextChoChar === 'ㅎ') {
        const m: Record<string, string> = { 'ㄱ': 'ㅋ', 'ㄷ': 'ㅌ', 'ㅂ': 'ㅍ', 'ㅈ': 'ㅊ' };
        const rep = BATCHIM_REP[jongChar] ?? jongChar;
        if (m[rep]) { syls[i] = { ...curr, jong: 0 }; syls[i + 1] = { ...next, cho: choOf(m[rep]) }; continue; }
      }

      // ── 비음화 ────────────────────────────────────────────────────
      const nasal: Record<string, string> = {
        'ㄱ':'ㅇ','ㄲ':'ㅇ','ㅋ':'ㅇ','ㄳ':'ㅇ','ㄺ':'ㅇ',
        'ㄷ':'ㄴ','ㅅ':'ㄴ','ㅆ':'ㄴ','ㅈ':'ㄴ','ㅊ':'ㄴ','ㅌ':'ㄴ','ㅎ':'ㄴ',
        'ㅂ':'ㅁ','ㅍ':'ㅁ','ㅄ':'ㅁ','ㄿ':'ㅁ','ㄼ':'ㅁ',
      };
      if ((nextChoChar === 'ㄴ' || nextChoChar === 'ㅁ') && nasal[jongChar]) {
        syls[i] = { ...curr, jong: jongOf(nasal[jongChar]) }; continue;
      }

      // ── 유음화 ────────────────────────────────────────────────────
      if (jongChar === 'ㄹ' && nextChoChar === 'ㄴ') { syls[i + 1] = { ...next, cho: choOf('ㄹ') }; continue; }
      if (jongChar === 'ㄴ' && nextChoChar === 'ㄹ') { syls[i] = { ...curr, jong: jongOf('ㄹ') }; syls[i + 1] = { ...next, cho: choOf('ㄹ') }; continue; }

      // ── 경음화: 폐쇄 받침 + 평음 초성 ───────────────────────────
      const tens: Record<string, string> = { 'ㄱ': 'ㄲ', 'ㄷ': 'ㄸ', 'ㅂ': 'ㅃ', 'ㅅ': 'ㅆ', 'ㅈ': 'ㅉ' };
      const stopSet = new Set(['ㄱ','ㄲ','ㄳ','ㄺ','ㄷ','ㅂ','ㅄ','ㄿ']);
      const repJong = BATCHIM_REP[jongChar] ?? jongChar;
      if (syls.length >= 3 && stopSet.has(repJong) && tens[nextChoChar]) { syls[i + 1] = { ...next, cho: choOf(tens[nextChoChar]) }; continue; }
    }

    if (fromSyls(syls) === before) break;
  }

  // 받침 대표음 정규화 (모음 초성 앞 제외)
  for (let i = 0; i < syls.length; i++) {
    const s = syls[i];
    if (s.cho < 0 || s.jong === 0) continue;
    const jongChar = FINAL[s.jong];
    const rep = BATCHIM_REP[jongChar];
    if (!rep || rep === jongChar) continue;
    const nextIsVowel = i < syls.length - 1 && syls[i + 1].cho >= 0 && INITIAL[syls[i + 1].cho] === 'ㅇ';
    if (!nextIsVowel) {
      syls[i] = { ...s, jong: jongOf(rep) };
    }
  }

  return fromSyls(syls);
}
