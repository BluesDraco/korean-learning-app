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
    tips: ['以 y 的口型起步，迅速滑向 ㅓ（不要分两个音节读）', '요 以 y 口型起步，迅速滑向 ㅗ（嘴型圆）'],
    segments: [{ text: '여' }, { text: '요' }],
  },
  {
    id: 'vowel-wa-wo', textKo: '와 vs 워', textZh: 'ㅘ 和 ㅝ 的区别',
    type: 'sound', level: 'beginner',
    focus: ['元音区分', '复合元音'],
    tips: ['와 = ㅗ+ㅏ，嘴先圆后张开', '워 = ㅜ+ㅓ，嘴先嘟起再放平', '와 结尾嘴巴是开的，워 结尾嘴巴是扁的'],
    segments: [{ text: '와' }, { text: '워' }],
  },
  {
    id: 'vowel-wi-ui', textKo: '위 vs 의', textZh: 'ㅟ 和 ㅢ 的区别',
    type: 'sound', level: 'beginner',
    focus: ['元音区分', '复合元音'],
    tips: ['위 = ㅜ+ㅣ，嘴先嘟起再拉平，类似英语 we', '의 = ㅡ+ㅣ，嘴角先拉平再微笑，是韩语最难元音之一', '의 作助词"的"时通常读成 에'],
    segments: [{ text: '위' }, { text: '의' }],
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
      { text: '사 자 하' },
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
    tips: ['声带绷紧，短促爆发，无气流送出', '比松音更短更有力，比送气音无气流'],
    segments: [
      { text: '까' }, { text: '따' }, { text: '빠' }, { text: '짜' },
    ],
  },
  {
    id: 'syl-na-la', textKo: '나 vs 라', textZh: 'ㄴ 和 ㄹ 的区别',
    type: 'syllable', level: 'beginner',
    focus: ['ㄴ/ㄹ', '辅音区分'],
    tips: ['나 舌尖抵上牙后方，气流从鼻腔出', '라 舌尖快速弹击上牙后方，气流从口腔出', '나 是鼻音，라 是弹音，感受舌尖动作的差异'],
    segments: [{ text: '나', hint: '鼻音' }, { text: '라', hint: '弹音' }],
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
    tips: ['ㅅ(사) 气流较轻，像轻声"s"', 'ㅆ(싸) 声带绷紧，气流短促有力，不像送气音那样爆出'],
    segments: [{ text: '사', hint: '松音' }, { text: '싸', hint: '紧音' }],
  },
  {
    id: 'cons-n-l', textKo: 'ㄴ / ㄹ', textZh: '鼻音 / 弹音',
    type: 'sound', level: 'beginner',
    focus: ['基础辅音', 'ㄴ/ㄹ'],
    tips: ['ㄴ(나) 舌尖抵上牙后方，气流从鼻腔出（鼻音）', 'ㄹ(라) 舌尖快速弹击上齿龈（弹音），不要卷舌', 'ㄹ 在收音位置变为侧音 [l]，舌尖贴住不弹'],
    segments: [{ text: '나', hint: '鼻音' }, { text: '라', hint: '弹音' }],
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
    id: 'batchim-it', textKo: '있', textZh: '收音 ㄷ系 — 舌尖抵住',
    type: 'word', level: 'beginner',
    focus: ['收音', 'ㄷ'],
    tips: ['收成 t 音（ㄷ系），舌尖抵住上牙不爆破', '不是 "이쓰"，要短促收住'],
  },
  {
    id: 'batchim-hanguk', textKo: '한국', textZh: '韩国 — 两个收音',
    type: 'word', level: 'beginner',
    focus: ['收音', 'ㄴ', 'ㄱ'],
    tips: ['한 的 ㄴ 收音舌抵上牙', '국 的 ㄱ 收音喉咙收紧'],
  },
  {
    id: 'batchim-ilgeop', textKo: '읽', textZh: '双终声 ㄺ — 视情况而定',
    type: 'word', level: 'beginner',
    focus: ['收音', '双收音'],
    tips: ['独立或接辅音时代表音为 ㄱ：읽다 → 익따', '接元音时 ㄹ 留原位、ㄱ 连读：읽어 → 일거', '口诀：后面有元音就"两个都读"'],
  },
  {
    id: 'batchim-eolgul', textKo: '얼굴', textZh: '脸 — ㄹ 收音练习',
    type: 'word', level: 'beginner',
    focus: ['收音', 'ㄹ'],
    tips: ['얼 的 ㄹ 收音舌尖轻贴上齿龈，保持侧音 [l]，不弹开', '굴 的 ㄹ 同理', '不要读成 "어르구르"'],
    segments: [{ text: '얼', hint: 'ㄹ收音' }, { text: '굴', hint: 'ㄹ收音' }],
  },
  {
    id: 'batchim-bang', textKo: '방', textZh: '房间 — ㅇ 收音(-ng)',
    type: 'word', level: 'beginner',
    focus: ['收音', 'ㅇ'],
    tips: ['收音 ㅇ 发 [ŋ]，舌根抵软腭，气流从鼻腔出', '类似英语 "sing" 结尾的 ng', '不要加尾音，直接收住'],
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
    tips: ['ㅎ 收音后接元音时 ㅎ 消失（不是移过去，而是脱落）', '实际读 "조아요"', '区别于普通连音：普通连音是收音移到下一音节，ㅎ脱落是直接消失'],
    segments: [{ text: '좋' }, { text: '아요' }, { text: '좋아요', hint: '→ 조아요' }],
  },
  {
    id: 'link-opseoyo', textKo: '없어요', textZh: '겹받침连音 — 없 + 어요',
    type: 'word', level: 'elementary',
    focus: ['连音', '겹받침'],
    tips: ['없 的双终声 ㅄ：ㅂ留原位，ㅅ连到어变成써', '实际读 "업써요"', '双终声连音：第二个字母连到下个音节作初声'],
    segments: [{ text: '없' }, { text: '어요' }, { text: '없어요', hint: '→ 업써요' }],
  },
  {
    id: 'link-meogeosseoyo', textKo: '먹었어요', textZh: '连续连音 — 먹 + 었 + 어요',
    type: 'phrase', level: 'elementary',
    focus: ['连音', '경음화'],
    tips: ['먹 的收音 ㄱ 连到 었 变成 거', '었 的收音 ㅆ 连到 어요变成 써요', '实际读 "머거써요"'],
    segments: [{ text: '먹' }, { text: '었' }, { text: '어요' }, { text: '먹었어요', hint: '→ 머거써요' }],
  },
  {
    id: 'link-kkochi', textKo: '꽃이', textZh: '连音 — 꽃 + 이',
    type: 'word', level: 'elementary',
    focus: ['连音', '구개음화'],
    tips: ['꽃 的收音 ㄷ系(ㅊ)代表音 ㄷ 连到 이，ㄷ+이腭化→ㅈ', '실제발음 "꼬치"', '이 引发腭化：ㄷ→ㅈ，ㅌ→ㅊ'],
    segments: [{ text: '꽃' }, { text: '이' }, { text: '꽃이', hint: '→ 꼬치' }],
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
    tips: ['합니다 经비음화读成 함니다', '함 的 ㅁ 收音要闭紧嘴巴', '니다 不要读太重'],
    segments: [{ text: '감사' }, { text: '합니다', hint: '→ 함니다' }],
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
    tips: ['收音 ㄹ 舌尖轻贴上齿龈，保持侧음 [l]，不弹开', '不是 "무르"'],
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
    tips: ['죄 的 ㅚ 标准音嘴型圆（类似法语eu），口语中常读成 we', '송 的 ㅇ 收音要充分（-ng）', '합니다 经비음화读成 함니다'],
    segments: [
      { text: '죄송' },
      { text: '합니다', hint: '→ 함니다' },
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
  {
    id: 'phrase-eodi', textKo: '어디에 있어요?', textZh: '在哪里？',
    romanization: 'eo-di-e i-sseo-yo',
    type: 'phrase', level: 'elementary',
    focus: ['日常表达', '连음', '疑问语调'],
    tips: ['어디에 의 에 是 ㅔ，嘴型偏小', '있어요 实际读 이써요（连음）', '结尾上扬表示疑问'],
    segments: [{ text: '어디에' }, { text: '있어요', hint: '→ 이써요' }],
  },
  {
    id: 'phrase-jal', textKo: '잘 부탁드립니다', textZh: '请多关照',
    romanization: 'jal bu-tak-deu-rim-ni-da',
    type: 'phrase', level: 'elementary',
    focus: ['日常表达', '收음', 'ㄹ收음'],
    tips: ['잘 的 ㄹ 收음舌尖轻贴上齿龈', '부탁 的 ㄱ 收음喉咙收紧', '드립니다 经비음화读 드림니다'],
    segments: [{ text: '잘' }, { text: '부탁' }, { text: '드립니다', hint: '→ 드림니다' }],
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
    tips: ['来自30天入门模板', '先听标准音，再跟读'],
  }));
}
