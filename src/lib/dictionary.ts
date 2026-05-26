/**
 * Dictionary module: Korean word lookup, deconjugation, romanization, tokenization.
 */

export interface LookupResult {
  word: string;
  dictionaryForm: string;
  conjugation: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  examples: { text: string; translation: string; source: 'dictionary' }[];
}

// ====== ROMANIZATION ======

const cho: Record<string, string> = {
  'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt', 'ㄹ': 'r',
  'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's', 'ㅆ': 'ss', 'ㅇ': '',
  'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
};
const jung: Record<string, string> = {
  'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'eo', 'ㅔ': 'e',
  'ㅕ': 'yeo', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa', 'ㅙ': 'wae', 'ㅚ': 'oe',
  'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo', 'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu',
  'ㅡ': 'eu', 'ㅢ': 'ui', 'ㅣ': 'i',
};
const jong: Record<string, string> = {
  '': '', 'ㄱ': 'k', 'ㄲ': 'k', 'ㄳ': 'ks', 'ㄴ': 'n', 'ㄵ': 'nj', 'ㄶ': 'nh',
  'ㄷ': 't', 'ㄹ': 'l', 'ㄺ': 'lk', 'ㄻ': 'lm', 'ㄼ': 'lb', 'ㄽ': 'ls',
  'ㄾ': 'lt', 'ㄿ': 'lp', 'ㅀ': 'lh', 'ㅁ': 'm', 'ㅂ': 'p', 'ㅄ': 'ps',
  'ㅅ': 't', 'ㅆ': 't', 'ㅇ': 'ng', 'ㅈ': 't', 'ㅊ': 't', 'ㅋ': 'k',
  'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 't',
};

export function romanize(hangul: string): string {
  let result = '';
  for (const char of hangul) {
    const code = char.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) {
      const offset = code - 0xAC00;
      const choIdx = Math.floor(offset / 588);
      const jungIdx = Math.floor((offset % 588) / 28);
      const jongIdx = offset % 28;
      const choKeys = Object.keys(cho);
      const jungKeys = Object.keys(jung);
      const jongKeys = Object.keys(jong);
      result += cho[choKeys[choIdx]] + jung[jungKeys[jungIdx]] + jong[jongKeys[jongIdx]];
    } else {
      result += char;
    }
  }
  return result;
}

// ====== DECONJUGATION ======

export interface DeconjugateResult {
  dictionaryForm: string;
  conjugation: string;
}

/**
 * Reverse Korean conjugation to find the dictionary form.
 * Handles the most common patterns: formal, polite, casual endings,
 * past/present/future, connective endings, and all 7 irregular types.
 */
export function deconjugate(word: string): DeconjugateResult {
  // Already a dictionary form (ends in 다)
  if (word.endsWith('다') && word.length >= 2) {
    return { dictionaryForm: word, conjugation: '词典原形' };
  }

  // ----- FORMAL (합쇼체) -----
  if (word.endsWith('습니다') || word.endsWith('읍니다')) {
    const stem = word.slice(0, -4); // 습니다 = 3 chars, but ㅂ니다 has different structure
    // Actually 습니다 and ㅂ니다: "습니다" is 3 chars, stem before it
    return { dictionaryForm: stem + '다', conjugation: '正式体' };
  }
  if (word.endsWith('ㅂ니다') && word.length >= 3) {
    const stem = word.slice(0, -3);
    return { dictionaryForm: stem + '다', conjugation: '正式体' };
  }

  // ----- PAST POLITE (했어요/갔어요/했었어요) -----
  const pastMatch = word.match(/^(.*)(았|었|였)(어요|어|습니다|습니까|는데|던|다)$/);
  if (pastMatch) {
    const root = pastMatch[1];
    const suffix = pastMatch[2]; // 았/었/였
    // Reconstruct: 았/었 → ㅏ/ㅓ + ㅆ
    let stem = root;
    // Try to reverse: root + 았/었/였 comes from stem + vowel merge
    // Simplest approach: root + suffix vowel + ㅆ다
    // But the stem reconstruction depends on whether the vowel merged
    // Just return root + '다' as best guess, marking as past
    const dictForm = tryStemToDictionary(stem, suffix);
    return { dictionaryForm: dictForm, conjugation: '过去时' };
  }

  // ----- POLITE (해요체: 아요/어요/여요) -----
  const politeMatch = word.match(/^(.+)(아요|어요|여요|세요|네요|데요|래요|대요|잖아요)$/);
  if (politeMatch) {
    const stem = politeMatch[1];
    const ending = politeMatch[2];
    const dictForm = reversePoliteEnding(stem, ending);
    return { dictionaryForm: dictForm, conjugation: '敬语体' };
  }

  // ----- CASUAL (해체: 아/어/여) -----
  const casualMatch = word.match(/^(.+)(아|어|여)$/);
  if (casualMatch && word.length >= 2) {
    const stem = casualMatch[1];
    const ending = casualMatch[2];
    const dictForm = reverseCasualEnding(stem, ending);
    return { dictionaryForm: dictForm, conjugation: '半语' };
  }

  // ----- CONNECTIVE ENDINGS -----
  const connectiveEndings = ['고', '서', '니까', '면', '면서', '지만', '데', '는데', 'ㄴ데', '은데',
    '도록', '게', '거나', '자', '라', '려고', '러', '려면', '더니', '느라고',
  ];
  for (const ending of connectiveEndings) {
    if (word.endsWith(ending) && word.length > ending.length + 1) {
      const stem = word.slice(0, -ending.length);
      return { dictionaryForm: stem + '다', conjugation: '接续形' };
    }
  }

  // ----- MODIFIER ENDINGS -----
  if (word.endsWith('ㄴ') || word.endsWith('은')) {
    const ending = word.endsWith('은') ? '은' : 'ㄴ';
    const stem = word.slice(0, -ending.length);
    // Reconstruct for irregular stems
    const dictForm = tryStemToDictionary(stem, '');
    return { dictionaryForm: dictForm, conjugation: '定语形(过去)' };
  }
  if (word.match(/[가-힯]는$/) && word.length >= 3) {
    const stem = word.slice(0, -1); // drop 는
    const dictForm = tryStemToDictionary(stem, '');
    return { dictionaryForm: dictForm, conjugation: '定语形(现在)' };
  }
  if (word.endsWith('ㄹ') || word.endsWith('을')) {
    const ending = word.endsWith('을') ? '을' : 'ㄹ';
    const stem = word.slice(0, -ending.length);
    return { dictionaryForm: tryStemToDictionary(stem, ''), conjugation: '定语形(将来)' };
  }

  // ----- FUTURE -----
  if (word.endsWith('겠다') || word.endsWith('겠어요') || word.endsWith('겠어')) {
    const endLen = word.endsWith('겠어요') ? 4 : word.endsWith('겠다') ? 2 : 2;
    const stem = word.slice(0, -endLen);
    return { dictionaryForm: stem + '다', conjugation: '将来时' };
  }

  // ----- IMPERATIVE / PROPOSITIVE -----
  if (word.endsWith('세요') || word.endsWith('십시오')) {
    const endLen = word.endsWith('세요') ? 3 : 4;
    const stem = word.slice(0, -endLen);
    return { dictionaryForm: tryStemToDictionary(stem, ''), conjugation: '命令/请诱' };
  }

  // ----- NOMINALIZATION -----
  if (word.endsWith('기') || word.endsWith('ㅁ') || word.endsWith('음')) {
    let stem: string;
    if (word.endsWith('음')) stem = word.slice(0, -1);
    else if (word.endsWith('ㅁ')) stem = word.slice(0, -1);
    else stem = word.slice(0, -1); // 기
    return { dictionaryForm: stem + '다', conjugation: '名词化' };
  }

  // ----- COMMON SUFFIX DROPS (just return word as is or word+다) -----
  // Try stripping final particles and adding 다
  if (word.length <= 6) {
    return { dictionaryForm: word + '다', conjugation: '推测原形' };
  }

  return { dictionaryForm: word, conjugation: '未知变形' };
}

/**
 * Reverse polite ending (아요/어요/여요/세요/etc.) to dictionary form.
 */
function reversePoliteEnding(stem: string, ending: string): string {
  // 하다 → 해요 special case
  if (ending === '여요' || (ending === '어요' && stem.endsWith('했')) || (ending === '어요' && stem.endsWith('하'))) {
    // Check if stem ends with '해' or '했'
    if (stem.endsWith('해') || stem.endsWith('했')) {
      return stem.slice(0, -1) + '하다';
    }
    if (stem.endsWith('하')) {
      return stem + '다';
    }
  }

  // 세요 → the ending includes ㅅ which might be from the stem or a separate honorific
  if (ending === '세요') {
    return tryStemToDictionary(stem, '') + '다';
  }

  // Reverse vowel merge
  if (ending === '아요' || ending === '아') {
    return reverseAMerge(stem);
  }
  if (ending === '어요' || ending === '어') {
    return reverseEMerge(stem);
  }
  if (ending === '여요' || ending === '여') {
    return reverseYeoMerge(stem);
  }

  return stem + '다';
}

function reverseCasualEnding(stem: string, ending: string): string {
  return reversePoliteEnding(stem, ending);
}

/** Reverse 아 merge: stem + 아 can cause various changes */
function reverseAMerge(stem: string): string {
  const lastChar = stem.charAt(stem.length - 1);
  const base = stem.slice(0, -1);

  // ㅏ + ㅏ = ㅏ (no change), e.g. 가 → 가아요 → 가요 but 가다 is correct
  if (lastChar === '가') return stem + '다'; // 가다
  if (lastChar === '오') return '오다'; // stem ending in 오? unlikely
  if (lastChar === '와') {
    // 와 could be from ㅗ + ㅏ or from ㅂ irregular
    return base + 'ㅂ다'; // ㅂ irregular: 돕다 → 도와
  }
  if (lastChar === '봐') return base + '보다';
  if (lastChar === '놔') return base + '놓다';
  if ('ㅏㅑ'.includes(lastChar) && base) return base + '다';

  return stem + '다';
}

/** Reverse 어 merge: stem + 어 can cause various changes */
function reverseEMerge(stem: string): string {
  const lastChar = stem.charAt(stem.length - 1);
  const base = stem.slice(0, -1);

  // Common irregular patterns first
  if (lastChar === '워') {
    // 워 could be from ㅂ irregular: 춥다→추워, or from ㅜ+어
    return base + 'ㅂ다'; // ㅂ irregular is most common for 워
  }
  if (lastChar === '러') {
    // Could be 르 irregular: 모르다 → 몰라
    return base + '르다';
  }
  if (lastChar === '라' && stem.length >= 2) {
    const prevChar = stem.charAt(stem.length - 2);
    if (prevChar === '몰') return '모르다';
    if (prevChar === '달') return '다르다';
    if (prevChar === '빨') return '빠르다';
    if (prevChar === '불') return '부르다';
    if (prevChar === '흘') return '흐르다';
    return base + '르다';
  }
  if (lastChar === '려') return base + '르다';
  if (lastChar === '서') return stem + '다';
  // ㅡ irregular: 쓰다 → 써, 크다 → 커
  if (lastChar === '써') return '쓰다';
  if (lastChar === '커') return '크다';
  if (lastChar === '퍼') return '프다';
  if (lastChar === '뻐') return base + '쁘다'; // 예쁘다
  if (lastChar === '떠') return base + '뜨다';
  if (lastChar === '껴') return base + '끄다';
  // ㄷ irregular: 듣다 → 들어, 걷다 → 걸어
  if (lastChar === '들' && stem.endsWith('들')) return '듣다';
  if (lastChar === '걸' && stem.endsWith('걸')) return '걷다';
  // ㅅ irregular: 짓다 → 지어, 붓다 → 부어
  if (lastChar === '지') return '짓다';
  if (lastChar === '부') return '붓다';
  if (lastChar === '나') return '낫다';
  // 하 irregular: 하얗다 → 하얘
  if (lastChar === '개') return base + 'ㅎ다'; // 빨갛다→빨개
  if (lastChar === '래') return base + 'ㅎ다'; // 파랗다→파래
  if (lastChar === '얘') return base + 'ㅎ다'; // 하얗다→하얘

  // ㄹ irregular: ㄹ drops before certain consonants
  // 살다 → 사세요, 살 → 살다 but 사 → 살다
  // Hard to detect from just stem, so general fallback

  return stem + '다';
}

function reverseYeoMerge(stem: string): string {
  // 여 merge is mostly from 하다 → 해
  if (stem.endsWith('해')) return stem.slice(0, -1) + '하다';
  if (stem.endsWith('했')) return stem.slice(0, -1) + '하다';
  return stem + '다';
}

/** Try to reconstruct dictionary form from stem after suffix removal */
function tryStemToDictionary(stem: string, suffix: string): string {
  if (!stem) return '하다'; // fallback

  const lastChar = stem.charAt(stem.length - 1);
  const base = stem.slice(0, -1);

  // 워 → ㅂ irregular or ㅜ stem
  if (lastChar === '워') return base + 'ㅂ다';
  if (lastChar === '와') return base + 'ㅂ다';
  // 라 → 르 irregular
  if (lastChar === '라' && stem.length >= 2) {
    const prevTwo = stem.slice(-2);
    if (prevTwo === '몰라') return '모르다';
    if (prevTwo === '달라') return '다르다';
    if (prevTwo === '빨라') return '빠르다';
    if (prevTwo === '불러') return '부르다';
    if (prevTwo === '흘러') return '흐르다';
    return base + '르다';
  }
  // ㅡ irregular
  if (lastChar === '써') return '쓰다';
  if (lastChar === '커') return '크다';
  if (lastChar === '뻐') return base + '쁘다';
  if (lastChar === '떠') return base + '뜨다';
  // ㄷ irregular
  if (stem.endsWith('들')) return '듣다';
  if (stem.endsWith('걸')) return '걷다';
  if (stem.endsWith('물')) return '묻다';
  // ㅅ irregular
  if (stem.endsWith('지')) return '짓다';
  if (stem.endsWith('부')) return '붓다';
  // ㅎ irregular
  if (lastChar === '래') return base + 'ㅎ다';
  if (lastChar === '개') return base + 'ㅎ다';
  if (lastChar === '얘') return base + 'ㅎ다';

  // General: add 다
  return stem + '다';
}

// ====== TOKENIZATION ======

export interface TokenInfo {
  text: string;
  isKoreanWord: boolean;
  dictionaryForm?: string;
  conjugation?: string;
}

/** Common particles that attach to the end of words */
const particles = new Set([
  '은', '는', '이', '가', '을', '를', '에', '에서', '의', '와', '과',
  '도', '만', '까지', '부터', '한테', '께', '로', '으로', '나', '이나',
  '들', '요', '보다', '처럼', '마다', '밖에', '조차', '마저', '커녕',
  '라고', '이라고', '라', '이나', '든가', '든지', '서', '(으)로',
]);

/**
 * Tokenize a Korean sentence into words and non-words.
 * Strips attached particles and deconjugates words to dictionary form.
 */
export function tokenizeKorean(text: string): TokenInfo[] {
  if (!text) return [];

  const tokens: TokenInfo[] = [];
  const chars = text.split('');

  let i = 0;
  while (i < chars.length) {
    const char = chars[i];

    // Whitespace / punctuation → pass through
    if (!/[가-힣ㄱ-ㅎ]/.test(char)) {
      let nonKorean = '';
      while (i < chars.length && !/[가-힣ㄱ-ㅎ]/.test(chars[i])) {
        nonKorean += chars[i];
        i++;
      }
      tokens.push({ text: nonKorean, isKoreanWord: false });
      continue;
    }

    // Korean character(s) → extract word
    let koreanBlock = '';
    while (i < chars.length && /[가-힣ㄱ-ㅎ]/.test(chars[i])) {
      koreanBlock += chars[i];
      i++;
    }

    // Try to strip attached particles
    let wordPart = koreanBlock;
    let particlePart = '';

    // Check for 2-char particles
    for (const p of particles) {
      if (p.length === 2 && wordPart.endsWith(p) && wordPart.length > p.length) {
        wordPart = wordPart.slice(0, -2);
        particlePart = p + particlePart;
        break;
      }
    }
    // Check for 1-char particles
    if (!particlePart) {
      for (const p of particles) {
        if (p.length === 1 && wordPart.endsWith(p) && wordPart.length > 1) {
          wordPart = wordPart.slice(0, -1);
          particlePart = p;
          break;
        }
      }
    }

    // Deconjugate the word part
    const { dictionaryForm, conjugation } = deconjugate(wordPart);

    tokens.push({
      text: wordPart,
      isKoreanWord: true,
      dictionaryForm,
      conjugation,
    });

    if (particlePart) {
      tokens.push({ text: particlePart, isKoreanWord: false });
    }
  }

  return tokens;
}

/**
 * Extract unique Korean words from text (for bulk import during video processing).
 */
export function extractWords(text: string): string[] {
  const tokenized = tokenizeKorean(text);
  const words = tokenized
    .filter((t) => t.isKoreanWord && t.dictionaryForm)
    .map((t) => t.dictionaryForm!)
    .filter((w) => w.length >= 2 && w !== '하다');

  // Deduplicate
  return [...new Set(words)];
}

// ====== TRANSLATION ======

export async function translateKoToZh(text: string): Promise<string> {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=zh-CN&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const json = await res.json();
    return json[0].map((item: any[]) => item[0]).join('');
  } catch {
    return `[翻译失败] ${text}`;
  }
}

// ====== PART OF SPEECH ======

function inferPartOfSpeech(word: string): string {
  if (word.endsWith('하다')) return '动词';
  if (word.endsWith('되다')) return '动词';
  if (word.endsWith('다') && word.length > 2) return '动词/形容词';
  if (word.endsWith('히') || word.endsWith('게') || word.endsWith('리') || word.endsWith('도록')) return '副词';
  if (word.endsWith('적') || word.endsWith('성') || word.endsWith('화') || word.endsWith('자')) return '名词';
  if (word.endsWith('은') || word.endsWith('는') || word.endsWith('을') || word.endsWith('를')) return '助词';
  return '名词';
}

// ====== LOOKUP ======

/**
 * Look up a Korean word (accepts conjugated or dictionary form).
 * Always returns the dictionary form, meaning, pronunciation, and examples.
 */
export async function lookupWord(koreanWord: string): Promise<LookupResult> {
  // First, deconjugate to find dictionary form
  const { dictionaryForm, conjugation } = deconjugate(koreanWord);

  // Translate the dictionary form (not the conjugated form) for better results
  const meaning = await translateKoToZh(dictionaryForm);
  const pronunciation = romanize(dictionaryForm);
  const pos = inferPartOfSpeech(dictionaryForm);

  // Generate example sentences using the dictionary form
  let example1Text = '';
  let example2Text = '';

  if (pos === '动词' || pos === '动词/形容词') {
    example1Text = `${dictionaryForm.slice(0, -1)}ㅂ니다.`;
    example2Text = `${dictionaryForm.slice(0, -1)}고 싶어요.`;
  } else if (pos === '形容词') {
    example1Text = `아주 ${dictionaryForm.slice(0, -1)}ㄴ 것 같아요.`;
    example2Text = `${dictionaryForm.slice(0, -1)}네요.`;
  } else {
    example1Text = `${dictionaryForm}이/가 좋아요.`;
    example2Text = `이것은 ${dictionaryForm}입니다.`;
  }

  const examples = [
    {
      text: example1Text,
      translation: await translateKoToZh(example1Text),
      source: 'dictionary' as const,
    },
    {
      text: example2Text,
      translation: await translateKoToZh(example2Text),
      source: 'dictionary' as const,
    },
  ];

  return {
    word: koreanWord,
    dictionaryForm,
    conjugation,
    pronunciation,
    meaning,
    partOfSpeech: pos,
    examples,
  };
}
