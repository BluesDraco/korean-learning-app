/**
 * Maps Hangul letters → pronunciation practice focus tags.
 * Used to bridge the Hangul module (四十音) with the Pronunciation module.
 */

// Individual vowels → pronunciation focus tags
export const VOWEL_TO_FOCUS: Record<string, string> = {
  'ㅏ': '元音区分',
  'ㅑ': '元音区分',
  'ㅓ': 'ㅓ/ㅗ',
  'ㅕ': 'ㅕ/ㅛ',
  'ㅗ': 'ㅓ/ㅗ',
  'ㅛ': 'ㅕ/ㅛ',
  'ㅜ': 'ㅡ/ㅜ',
  'ㅠ': '元音区分',
  'ㅡ': 'ㅡ/ㅜ',
  'ㅣ': '元音区分',
  'ㅐ': 'ㅐ/ㅔ',
  'ㅒ': 'ㅐ/ㅔ',
  'ㅔ': 'ㅐ/ㅔ',
  'ㅖ': '元音区分',
  'ㅘ': '元音区分',
  'ㅙ': '元音区分',
  'ㅚ': '元音区分',
  'ㅝ': '元音区分',
  'ㅞ': '元音区分',
  'ㅟ': '元音区分',
  'ㅢ': '元音区分',
};

// Individual consonants → pronunciation focus tags
export const CONSONANT_TO_FOCUS: Record<string, string> = {
  'ㄱ': 'ㄱ/ㅋ/ㄲ',
  'ㅋ': 'ㄱ/ㅋ/ㄲ',
  'ㄲ': 'ㄱ/ㅋ/ㄲ',
  'ㄷ': 'ㄷ/ㅌ/ㄸ',
  'ㅌ': 'ㄷ/ㅌ/ㄸ',
  'ㄸ': 'ㄷ/ㅌ/ㄸ',
  'ㅂ': 'ㅂ/ㅍ/ㅃ',
  'ㅍ': 'ㅂ/ㅍ/ㅃ',
  'ㅃ': 'ㅂ/ㅍ/ㅃ',
  'ㅅ': 'ㅅ/ㅆ',
  'ㅆ': 'ㅅ/ㅆ',
  'ㅈ': 'ㅈ/ㅊ/ㅉ',
  'ㅊ': 'ㅈ/ㅊ/ㅉ',
  'ㅉ': 'ㅈ/ㅊ/ㅉ',
  'ㄴ': '基础辅音',
  'ㄹ': '基础辅音',
  'ㅁ': '基础辅音',
  'ㅇ': '基础辅音',
  'ㅎ': '基础辅音',
};

// Batchim groups → focus tags
export const BATCHIM_TO_FOCUS: Record<string, string> = {
  'ㄱ/ㄲ/ㅋ': '收音',
  'ㄴ': '收音',
  'ㄷ/ㅅ/ㅆ/ㅈ/ㅊ/ㅌ/ㅎ': '收音',
  'ㄹ': '收音',
  'ㅁ': '收音',
  'ㅂ/ㅍ': '收音',
  'ㅇ': '收音',
};

/** Get the pronunciation focus tag for any Hangul letter */
export function getFocusForLetter(letter: string): string | null {
  // Check single letter mappings first
  if (VOWEL_TO_FOCUS[letter]) return VOWEL_TO_FOCUS[letter];
  if (CONSONANT_TO_FOCUS[letter]) return CONSONANT_TO_FOCUS[letter];

  // Check batchim (compound notation like "ㄱ/ㄲ/ㅋ")
  if (BATCHIM_TO_FOCUS[letter]) return BATCHIM_TO_FOCUS[letter];

  // Try matching consonant parts in batchim strings
  for (const key of Object.keys(BATCHIM_TO_FOCUS)) {
    if (key.includes(letter)) return BATCHIM_TO_FOCUS[key];
  }

  return null;
}
