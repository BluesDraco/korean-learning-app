/**
 * Romanization → Hangul 反向转换。
 * 用 Revised Romanization 主流规则，采用最长匹配。
 * 覆盖：cho(19) + jung(21) + jong(28)。
 * 已知限制：连音/激音/紧音的音变（如 gukmul→궁물）不逆推，只做"字面"逐音节。
 */

const CHO_LIST: { rom: string; jamo: string }[] = [
  { rom: 'kk', jamo: 'ㄲ' },
  { rom: 'tt', jamo: 'ㄸ' },
  { rom: 'pp', jamo: 'ㅃ' },
  { rom: 'ss', jamo: 'ㅆ' },
  { rom: 'jj', jamo: 'ㅉ' },
  { rom: 'ch', jamo: 'ㅊ' },
  { rom: 'g', jamo: 'ㄱ' },
  { rom: 'n', jamo: 'ㄴ' },
  { rom: 'd', jamo: 'ㄷ' },
  { rom: 'r', jamo: 'ㄹ' },
  { rom: 'l', jamo: 'ㄹ' },
  { rom: 'm', jamo: 'ㅁ' },
  { rom: 'b', jamo: 'ㅂ' },
  { rom: 's', jamo: 'ㅅ' },
  { rom: 'j', jamo: 'ㅈ' },
  { rom: 'k', jamo: 'ㅋ' },
  { rom: 't', jamo: 'ㅌ' },
  { rom: 'p', jamo: 'ㅍ' },
  { rom: 'h', jamo: 'ㅎ' },
];

const JUNG_LIST: { rom: string; jamo: string }[] = [
  { rom: 'yae', jamo: 'ㅒ' },
  { rom: 'yeo', jamo: 'ㅕ' },
  { rom: 'wae', jamo: 'ㅙ' },
  { rom: 'ae', jamo: 'ㅐ' },
  { rom: 'ya', jamo: 'ㅑ' },
  { rom: 'ye', jamo: 'ㅖ' },
  { rom: 'wa', jamo: 'ㅘ' },
  { rom: 'oe', jamo: 'ㅚ' },
  { rom: 'yo', jamo: 'ㅛ' },
  { rom: 'wo', jamo: 'ㅝ' },
  { rom: 'we', jamo: 'ㅞ' },
  { rom: 'wi', jamo: 'ㅟ' },
  { rom: 'yu', jamo: 'ㅠ' },
  { rom: 'eu', jamo: 'ㅡ' },
  { rom: 'ui', jamo: 'ㅢ' },
  { rom: 'eo', jamo: 'ㅓ' },
  { rom: 'a', jamo: 'ㅏ' },
  { rom: 'e', jamo: 'ㅔ' },
  { rom: 'o', jamo: 'ㅗ' },
  { rom: 'u', jamo: 'ㅜ' },
  { rom: 'i', jamo: 'ㅣ' },
];

// 收音表——终声。空为无终声。ㅇ、ㅎ 一般不作为常见终声输入。
const JONG_LIST: { rom: string; jamo: string }[] = [
  { rom: 'ng', jamo: 'ㅇ' },
  { rom: 'kk', jamo: 'ㄲ' },
  { rom: 'ss', jamo: 'ㅆ' },
  { rom: 'ch', jamo: 'ㅊ' },
  { rom: 'ks', jamo: 'ㄳ' },
  { rom: 'nj', jamo: 'ㄵ' },
  { rom: 'nh', jamo: 'ㄶ' },
  { rom: 'lk', jamo: 'ㄺ' },
  { rom: 'lm', jamo: 'ㄻ' },
  { rom: 'lb', jamo: 'ㄼ' },
  { rom: 'ls', jamo: 'ㄽ' },
  { rom: 'lt', jamo: 'ㄾ' },
  { rom: 'lp', jamo: 'ㄿ' },
  { rom: 'lh', jamo: 'ㅀ' },
  { rom: 'ps', jamo: 'ㅄ' },
  { rom: 'g', jamo: 'ㄱ' },
  { rom: 'k', jamo: 'ㄱ' },
  { rom: 'n', jamo: 'ㄴ' },
  { rom: 'd', jamo: 'ㄷ' },
  { rom: 't', jamo: 'ㄷ' },
  { rom: 'l', jamo: 'ㄹ' },
  { rom: 'r', jamo: 'ㄹ' },
  { rom: 'm', jamo: 'ㅁ' },
  { rom: 'b', jamo: 'ㅂ' },
  { rom: 'p', jamo: 'ㅂ' },
  { rom: 's', jamo: 'ㅅ' },
];

// 韩语音节合成表（jamo → Unicode index）
const CHO_INDEX: Record<string, number> = {
  'ㄱ': 0, 'ㄲ': 1, 'ㄴ': 2, 'ㄷ': 3, 'ㄸ': 4, 'ㄹ': 5, 'ㅁ': 6, 'ㅂ': 7,
  'ㅃ': 8, 'ㅅ': 9, 'ㅆ': 10, 'ㅇ': 11, 'ㅈ': 12, 'ㅉ': 13, 'ㅊ': 14,
  'ㅋ': 15, 'ㅌ': 16, 'ㅍ': 17, 'ㅎ': 18,
};
const JUNG_INDEX: Record<string, number> = {
  'ㅏ': 0, 'ㅐ': 1, 'ㅑ': 2, 'ㅒ': 3, 'ㅓ': 4, 'ㅔ': 5, 'ㅕ': 6, 'ㅖ': 7,
  'ㅗ': 8, 'ㅘ': 9, 'ㅙ': 10, 'ㅚ': 11, 'ㅛ': 12, 'ㅜ': 13, 'ㅝ': 14,
  'ㅞ': 15, 'ㅟ': 16, 'ㅠ': 17, 'ㅡ': 18, 'ㅢ': 19, 'ㅣ': 20,
};
const JONG_INDEX: Record<string, number> = {
  '': 0, 'ㄱ': 1, 'ㄲ': 2, 'ㄳ': 3, 'ㄴ': 4, 'ㄵ': 5, 'ㄶ': 6, 'ㄷ': 7,
  'ㄹ': 8, 'ㄺ': 9, 'ㄻ': 10, 'ㄼ': 11, 'ㄽ': 12, 'ㄾ': 13, 'ㄿ': 14,
  'ㅀ': 15, 'ㅁ': 16, 'ㅂ': 17, 'ㅄ': 18, 'ㅅ': 19, 'ㅆ': 20, 'ㅇ': 21,
  'ㅈ': 22, 'ㅊ': 23, 'ㅋ': 24, 'ㅌ': 25, 'ㅍ': 26, 'ㅎ': 27,
};

function composeSyllable(cho: string, jung: string, jong: string = ''): string {
  const ci = CHO_INDEX[cho];
  const ji = JUNG_INDEX[jung];
  const jgi = JONG_INDEX[jong];
  if (ci == null || ji == null || jgi == null) return '';
  return String.fromCharCode(0xAC00 + ci * 588 + ji * 28 + jgi);
}

/** 最长匹配：从 pos 开始，返回 [匹配 rom, 匹配 jamo, newPos]，找不到则返回 null */
function matchLongest(
  input: string,
  pos: number,
  table: { rom: string; jamo: string }[]
): [string, string, number] | null {
  const sorted = [...table].sort((a, b) => b.rom.length - a.rom.length);
  for (const { rom, jamo } of sorted) {
    if (input.slice(pos, pos + rom.length) === rom) {
      return [rom, jamo, pos + rom.length];
    }
  }
  return null;
}

/**
 * 把罗马音转成韩文（Hangul 音节）。
 * 输入按小写英文/短横/空格解析。非可识别字符原样保留。
 * @example romanToHangul('annyeonghaseyo') → '안녕하세요'
 */
export function romanToHangul(input: string): string {
  const src = input.toLowerCase().trim();
  let out = '';
  let i = 0;

  while (i < src.length) {
    const ch = src[i];

    // 元音开头 → 用 ㅇ 兜底作为初声
    // 分隔符/空格直接输出
    if (ch === ' ' || ch === '-' || ch === "'") {
      out += ch === ' ' ? ' ' : '';
      i++;
      continue;
    }

    // 尝试匹配初声
    const choMatch = matchLongest(src, i, CHO_LIST);
    let choJamo: string;
    let jungStart: number;

    if (choMatch) {
      choJamo = choMatch[1];
      jungStart = choMatch[2];
    } else {
      // 没有辅音开头，用 ㅇ 兜底
      choJamo = 'ㅇ';
      jungStart = i;
    }

    // 尝试匹配中声（必须有）
    const jungMatch = matchLongest(src, jungStart, JUNG_LIST);
    if (!jungMatch) {
      // 无法组成音节，原样输出这个字符，跳过
      out += src[i];
      i++;
      continue;
    }
    const jungJamo = jungMatch[1];
    let nextPos = jungMatch[2];

    // 尝试匹配终声（可选，且必须后面不能紧跟元音——否则该辅音属于下音节的初声）
    let jongJamo = '';
    const jongMatch = matchLongest(src, nextPos, JONG_LIST);
    if (jongMatch) {
      const afterJong = jongMatch[2];
      // 复合终声（长度>1）直接吃
      if (jongMatch[0].length > 1) {
        jongJamo = jongMatch[1];
        nextPos = afterJong;
      } else {
        // 单终声：若后面还有元音，说明这个辅音属于下一个音节的初声，不能吃
        const nextIsVowel = matchLongest(src, afterJong, JUNG_LIST);
        if (!nextIsVowel) {
          jongJamo = jongMatch[1];
          nextPos = afterJong;
        }
      }
    }

    const syllable = composeSyllable(choJamo, jungJamo, jongJamo);
    out += syllable || src.slice(i, nextPos);
    i = nextPos;
  }

  return out;
}
