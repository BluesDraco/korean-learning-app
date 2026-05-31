import type { PronunciationItem } from '@/types';

// ═══════════════════════════════════════════
// Phase 2 expanded content — 30 items covering all Korean pronunciation challenges
// ═══════════════════════════════════════════

export const vowelPairs: PronunciationItem[] = [
  {
    id: 'vowel-eo-o', textKo: '어 vs 오', textZh: 'ㅓ 和 ㅗ 的区别',
    type: 'sound', level: 'beginner',
    focus: ['ㅓ/ㅗ', '元音区分'],
    tips: ['어 嘴巴更开，舌头放平', '오 嘴巴拢圆，嘴唇前突'],
    segments: [{ text: '어', hint: '像英语 "uh"' }, { text: '오', hint: '像英语 "oh" 但更短' }],
  },
  {
    id: 'vowel-eu-u', textKo: '으 vs 우', textZh: 'ㅡ 和 ㅜ 的区别',
    type: 'sound', level: 'beginner',
    focus: ['ㅡ/ㅜ', '元音区分'],
    tips: ['으 嘴唇不圆，像微笑时发"e"', '우 嘴唇拢圆'],
    segments: [{ text: '으' }, { text: '우' }],
  },
  {
    id: 'vowel-ae-e', textKo: '애 vs 에', textZh: 'ㅐ 和 ㅔ 的区别',
    type: 'sound', level: 'beginner',
    focus: ['ㅐ/ㅔ', '元音区分'],
    tips: ['现代韩语中两者已非常接近', '애 嘴巴略大，에 嘴巴略小'],
    segments: [{ text: '애' }, { text: '에' }],
  },
  {
    id: 'vowel-yeo-yo', textKo: '여 vs 요', textZh: 'ㅕ 和 ㅛ 的区别',
    type: 'sound', level: 'beginner',
    focus: ['ㅕ/ㅛ', '元音区分'],
    tips: ['여 先发 ㅣ 再滑到 ㅓ', '요 先发 ㅣ 再滑到 ㅗ'],
    segments: [{ text: '여' }, { text: '요' }],
  },
];

export const syllableDrills: PronunciationItem[] = [
  {
    id: 'syl-ga-na-da', textKo: '가 나 다 라 마 바 사', textZh: '基础音节练习',
    type: 'syllable', level: 'beginner',
    focus: ['音节', '基础辅音'],
    tips: ['每个音节均匀用力', '不要拖长也不要太短'],
    segments: [
      { text: '가 나 다' },
      { text: '라 마 바' },
      { text: '사 아 자' },
    ],
  },
  {
    id: 'syl-ka-ta-pa', textKo: '카 타 파 차', textZh: '送气音节练习',
    type: 'syllable', level: 'beginner',
    focus: ['送气音', '气流控制'],
    tips: ['每个音节有明显气流送出', '手掌放嘴前感受气流'],
    segments: [
      { text: '카' }, { text: '타' }, { text: '파' }, { text: '차' },
    ],
  },
  {
    id: 'syl-kka-tta-ppa', textKo: '까 따 빠 짜', textZh: '紧音音节练习',
    type: 'syllable', level: 'beginner',
    focus: ['紧音', '肌肉控制'],
    tips: ['喉部绷紧，用腹部力量', '比松音更短更用力'],
    segments: [
      { text: '까' }, { text: '따' }, { text: '빠' }, { text: '짜' },
    ],
  },
];

export const consonantPairs: PronunciationItem[] = [
  {
    id: 'cons-g-k-kk', textKo: 'ㄱ / ㅋ / ㄲ', textZh: '松音 / 送气音 / 紧音',
    type: 'sound', level: 'beginner',
    focus: ['ㄱ/ㅋ/ㄲ', '松紧送气'],
    tips: ['ㄱ(가) 正常轻声，不要用力', 'ㅋ(카) 有明显气流', 'ㄲ(까) 用力收紧，爆发很短'],
    segments: [{ text: '가', hint: '松音' }, { text: '카', hint: '送气' }, { text: '까', hint: '紧音' }],
  },
  {
    id: 'cons-d-t-tt', textKo: 'ㄷ / ㅌ / ㄸ', textZh: '松音 / 送气音 / 紧音',
    type: 'sound', level: 'beginner',
    focus: ['ㄷ/ㅌ/ㄸ', '松紧送气'],
    tips: ['ㄷ(다) 舌头轻触上牙后方', 'ㅌ(타) 有明显爆气', 'ㄸ(따) 舌头用力顶住再弹开'],
    segments: [{ text: '다', hint: '松音' }, { text: '타', hint: '送气' }, { text: '따', hint: '紧音' }],
  },
  {
    id: 'cons-b-p-pp', textKo: 'ㅂ / ㅍ / ㅃ', textZh: '松音 / 送气音 / 紧音',
    type: 'sound', level: 'beginner',
    focus: ['ㅂ/ㅍ/ㅃ', '松紧送气'],
    tips: ['ㅂ(바) 嘴唇轻轻碰一下', 'ㅍ(파) 有明显喷气', 'ㅃ(빠) 嘴唇用力收紧再弹开'],
    segments: [{ text: '바', hint: '松音' }, { text: '파', hint: '送气' }, { text: '빠', hint: '紧音' }],
  },
  {
    id: 'cons-j-ch-jj', textKo: 'ㅈ / ㅊ / ㅉ', textZh: '松音 / 送气音 / 紧音',
    type: 'sound', level: 'beginner',
    focus: ['ㅈ/ㅊ/ㅉ', '松紧送气'],
    tips: ['ㅈ(자) 舌尖轻触上牙后方', 'ㅊ(차) 有明显送气', 'ㅉ(짜) 舌尖用力顶住后弹开'],
    segments: [{ text: '자', hint: '松音' }, { text: '차', hint: '送气' }, { text: '짜', hint: '紧音' }],
  },
  {
    id: 'cons-s-ss', textKo: 'ㅅ / ㅆ', textZh: '松音 / 紧音',
    type: 'sound', level: 'beginner',
    focus: ['ㅅ/ㅆ', '紧音'],
    tips: ['ㅅ(사) 气流较轻', 'ㅆ(싸) 气流更强更紧'],
    segments: [{ text: '사', hint: '松音' }, { text: '싸', hint: '紧音' }],
  },
];

export const batchimWords: PronunciationItem[] = [
  {
    id: 'batchim-an', textKo: '안', textZh: '收音 ㄴ — 舌抵上牙',
    type: 'word', level: 'beginner',
    focus: ['收音', 'ㄴ'],
    tips: ['舌头抵住上牙后方不松开', '不是 "아느"'],
  },
  {
    id: 'batchim-eop', textKo: '없', textZh: '收音 ㅄ — 闭唇收住',
    type: 'word', level: 'beginner',
    focus: ['收音', 'ㅂ'],
    tips: ['嘴巴闭紧收住', '不要读成 "어버"'],
  },
  {
    id: 'batchim-it', textKo: '있', textZh: '收音 ㅆ — 舌尖抵住',
    type: 'word', level: 'beginner',
    focus: ['收音', 'ㅅ'],
    tips: ['收成 t 音，舌尖抵住上牙', '不是 "이쓰"，要短促收住'],
  },
  {
    id: 'batchim-hanguk', textKo: '한국', textZh: '韩国 — 双收音',
    type: 'word', level: 'beginner',
    focus: ['收音', 'ㄴ', 'ㄱ'],
    tips: ['한 的 ㄴ 收音舌抵上牙', '국 的 ㄱ 收音喉咙收紧'],
  },
  {
    id: 'batchim-ilgeop', textKo: '읽', textZh: '收音 ㄺ — 读右边',
    type: 'word', level: 'beginner',
    focus: ['收音', '双收音'],
    tips: ['双收音 ㄺ 读右边的 ㄱ', '实际读 "익"', '代表字：읽다 → 익따'],
  },
];

export const linkingSounds: PronunciationItem[] = [
  {
    id: 'link-hangukeo', textKo: '한국어', textZh: '连音 — 한국 + 어',
    type: 'word', level: 'elementary',
    focus: ['连音', '收音连读'],
    tips: ['국 的收音 ㄱ 连到 어 变成 거', '实际读 "한구거"'],
    segments: [{ text: '한국' }, { text: '어' }, { text: '한국어', hint: '→ 한구거' }],
  },
  {
    id: 'link-isseoyo', textKo: '있어요', textZh: '连音 — 있 + 어요',
    type: 'word', level: 'elementary',
    focus: ['连音', '紧音'],
    tips: ['있 的收音 ㅆ 连到 어 变成 써', '实际读 "이써요"'],
    segments: [{ text: '있' }, { text: '어요' }, { text: '있어요', hint: '→ 이써요' }],
  },
  {
    id: 'link-joayo', textKo: '좋아요', textZh: '连音 + ㅎ脱落',
    type: 'word', level: 'elementary',
    focus: ['连音', 'ㅎ脱落'],
    tips: ['ㅎ 收音后接元音时 ㅎ 脱落', '实际读 "조아요"'],
  },
];

export const commonWords: PronunciationItem[] = [
  {
    id: 'word-annyeong', textKo: '안녕하세요', textZh: '您好',
    romanization: 'an-nyeong-ha-se-yo',
    type: 'word', level: 'beginner',
    focus: ['日常问候', '语调'],
    tips: ['세요 要轻一点，不要拖长', '整句语调自然下降'],
    segments: [{ text: '안녕' }, { text: '하세요' }],
  },
  {
    id: 'word-gamsa', textKo: '감사합니다', textZh: '谢谢',
    romanization: 'gam-sa-ham-ni-da',
    type: 'word', level: 'beginner',
    focus: ['日常表达', '收音'],
    tips: ['함 的 ㅁ 收音要闭紧嘴巴', '니다 不要读太重'],
    segments: [{ text: '감사' }, { text: '합니다' }],
  },
  {
    id: 'word-juseyo', textKo: '주세요', textZh: '请给我',
    romanization: 'ju-se-yo',
    type: 'word', level: 'beginner',
    focus: ['日常表达', '语调'],
    tips: ['세요 要自然，像请求不是命令'],
  },
  {
    id: 'word-gwaenchana', textKo: '괜찮아요', textZh: '没关系 / 还好',
    romanization: 'gwaen-cha-na-yo',
    type: 'word', level: 'beginner',
    focus: ['日常表达', '复合元音'],
    tips: ['괜 是复合元音 ㅙ', '찮 收音为 ㄶ → 连读 차나'],
  },
  {
    id: 'word-sarang', textKo: '사랑해요', textZh: '我爱你',
    romanization: 'sa-rang-hae-yo',
    type: 'word', level: 'beginner',
    focus: ['日常表达', '复合元音'],
    tips: ['랑 的 ㅏ 要饱满', '해요 的 해 是 ㅐ 不是 ㅔ'],
  },
  {
    id: 'word-mul', textKo: '물', textZh: '水',
    romanization: 'mul',
    type: 'word', level: 'beginner',
    focus: ['收音', 'ㄹ'],
    tips: ['收音 ㄹ 舌尖轻触上牙后方', '不是 "무르"', '舌头要卷得快'],
  },
  {
    id: 'word-keopi', textKo: '커피', textZh: '咖啡',
    romanization: 'keo-pi',
    type: 'word', level: 'beginner',
    focus: ['送气音', '元音'],
    tips: ['커 的 ㅋ 有明显送气', '피 不要太重'],
  },
];

export const commonPhrases: PronunciationItem[] = [
  {
    id: 'phrase-coffee', textKo: '아이스 아메리카노 주세요', textZh: '请给我一杯冰美式',
    romanization: 'a-i-seu a-me-ri-ka-no ju-se-yo',
    type: 'phrase', level: 'elementary',
    focus: ['点单表达', '节奏', '语调'],
    tips: ['分三块读：아이스 / 아메리카노 / 주세요', '주세요 语调下降表示礼貌请求'],
    segments: [
      { text: '아이스', hint: '冰' },
      { text: '아메리카노', hint: '美式咖啡' },
      { text: '주세요', hint: '请给我' },
    ],
  },
  {
    id: 'phrase-intro', textKo: '저는 중국 사람이에요', textZh: '我是中国人',
    romanization: 'jeo-neun jung-guk sa-ra-mi-e-yo',
    type: 'phrase', level: 'elementary',
    focus: ['自我介绍', '语调'],
    tips: ['저는 的 는 要轻', '이에요 结尾自然下降'],
    segments: [
      { text: '저는' },
      { text: '중국 사람' },
      { text: '이에요' },
    ],
  },
  {
    id: 'phrase-weather', textKo: '오늘 날씨가 좋아요', textZh: '今天天气好',
    romanization: 'o-neul nal-ssi-ga jo-a-yo',
    type: 'phrase', level: 'elementary',
    focus: ['日常表达', '紧音'],
    tips: ['날씨 的 씨 是紧音，要用力短促', '좋아요 实际读 조아요'],
    segments: [
      { text: '오늘' },
      { text: '날씨가' },
      { text: '좋아요' },
    ],
  },
  {
    id: 'phrase-mian', textKo: '죄송합니다', textZh: '对不起（正式）',
    romanization: 'joe-song-ham-ni-da',
    type: 'phrase', level: 'elementary',
    focus: ['日常表达', '收音', '复合元音'],
    tips: ['죄 是 ㅚ 相当于 we', '송 的 ㅇ 收音要充分'],
    segments: [
      { text: '죄송' },
      { text: '합니다' },
    ],
  },
  {
    id: 'phrase-bap', textKo: '밥 먹었어요?', textZh: '吃饭了吗？',
    romanization: 'bap meo-geo-sseo-yo',
    type: 'phrase', level: 'elementary',
    focus: ['日常表达', '连音'],
    tips: ['먹었어요 实际读 머거써요', '结尾上扬表示疑问'],
    segments: [
      { text: '밥' },
      { text: '먹었어요', hint: '→ 머거써요' },
    ],
  },
  {
    id: 'phrase-yogiyo', textKo: '여기요!', textZh: '这里 / 服务员！',
    romanization: 'yeo-gi-yo',
    type: 'phrase', level: 'beginner',
    focus: ['日常表达', '语调'],
    tips: ['语调要稍微上扬才能引起注意', '요 不要太重'],
  },
];

// ═══════════════════════════════════════════
// Aggregated list
// ═══════════════════════════════════════════

export const allPronunciationItems: PronunciationItem[] = [
  ...vowelPairs,
  ...syllableDrills,
  ...consonantPairs,
  ...batchimWords,
  ...linkingSounds,
  ...commonWords,
  ...commonPhrases,
];

/** Pick a balanced daily set: 1 vowel pair + 1 consonant pair + 1 word/phrase */
export function getTodayItems(count: number = 3): PronunciationItem[] {
  const today = new Date().getDate();
  const vIdx = today % vowelPairs.length;
  const cIdx = today % consonantPairs.length;
  const wIdx = today % (commonWords.length + commonPhrases.length);
  const wordPool = [...commonWords, ...commonPhrases];

  const result: PronunciationItem[] = [
    vowelPairs[vIdx],
    consonantPairs[cIdx],
    wordPool[wIdx],
  ];
  return result.slice(0, count);
}

/** Generate pronunciation items from course words (for course integration) */
export function itemsFromCourseWords(words: { korean: string; chinese: string; pronunciation: string }[], dayNum: number): PronunciationItem[] {
  return words.map((w, i) => ({
    id: `course-d${dayNum}-w${i}`,
    textKo: w.korean,
    textZh: w.chinese,
    romanization: w.pronunciation,
    type: 'word' as const,
    level: 'beginner' as const,
    focus: ['课程单词', `Day ${dayNum}`],
    source: 'course',
    sourceId: `day-${dayNum}`,
    tips: ['来自30天课程', '先听标准音，再跟读'],
  }));
}
