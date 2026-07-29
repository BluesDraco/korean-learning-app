import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 2 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——都是飞机上兔莉可能听到、可能要用的：
 * - core: 물 / 커피 / 메뉴 / 얼음 / 잔 / 부탁드립니다（进认词考察）
 * - ext:  주스 / 괜찮아요（进拼写/听写考察）
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 * 星级：全对 3 星 / 错 1-2 二星 / 错 3-4 一星 / 错 5+ 零星
 */
export const day2Vocab: VocabSubQuestData = {
  day: 2,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '飞机餐车悄悄多学的 8 个词',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd02-v1-e1',
      korean: '물',
      hangul: 'mul',
      zh: '水',
      pos: '名词',
      example: { ko: '물 한 잔 주세요.', zh: '请给我一杯水。' },
      tip: '飞机上最安全的第一句点单。收音 ㄹ 要卷舌尖轻轻抵上颚，不是中文的"木"，是短促的"muhl"。',
      tier: 'core',
    },
    {
      id: 'd02-v1-e2',
      korean: '커피',
      hangul: 'keo-pi',
      zh: '咖啡',
      pos: '名词',
      example: { ko: '커피 한 잔 부탁드립니다.', zh: '麻烦给我一杯咖啡。' },
      tip: '外来语 coffee 的音译。ㅋ 是送气"k"（比中文 k 更用力吐气），ㅍ 是送气"p"。',
      tier: 'core',
    },
    {
      id: 'd02-v1-e3',
      korean: '메뉴',
      hangul: 'me-nyu',
      zh: '菜单',
      pos: '名词',
      example: { ko: '메뉴 주세요.', zh: '请给我菜单。' },
      tip: '外来语 menu。落地首尔后进任何餐厅，这一句和「저기요」是黄金组合。',
      tier: 'core',
    },
    {
      id: 'd02-v1-e4',
      korean: '얼음',
      hangul: 'eo-reum',
      zh: '冰块',
      pos: '名词',
      example: { ko: '얼음 많이 주세요.', zh: '请多给点冰。' },
      tip: '空乘问 「얼음 드릴까요?」（要冰吗）时会用到。第一个字 ㅓ 是"张嘴的 e"，不是圆嘴的"哦"。',
      tier: 'core',
    },
    {
      id: 'd02-v1-e5',
      korean: '잔',
      hangul: 'jan',
      zh: '杯（量词）',
      pos: '名词',
      example: { ko: '콜라 한 잔.', zh: '一杯可乐。' },
      tip: '数杯子专用量词。「한 잔」=一杯，「두 잔」=两杯。永远和数字放在名词和「주세요」之间。',
      tier: 'core',
    },
    {
      id: 'd02-v1-e6',
      korean: '부탁드립니다',
      hangul: 'bu-tak-deu-rim-ni-da',
      zh: '拜托您了 / 麻烦您',
      pos: '表达',
      example: { ko: '메뉴 부탁드립니다.', zh: '麻烦给我菜单。' },
      tip: '「주세요」的敬语升级版。对空乘、店员、老师用会显得非常有教养。发音有 6 个音节，慢慢来。',
      tier: 'core',
    },
    {
      id: 'd02-v1-e7',
      korean: '주스',
      hangul: 'ju-seu',
      zh: '果汁',
      pos: '名词',
      example: { ko: '오렌지 주스 주세요.', zh: '请给我橙汁。' },
      tip: '外来语 juice。飞机上除了可乐咖啡，果汁是第三选项。ㅈ 不送气，比中文"j"更轻。',
      tier: 'ext',
    },
    {
      id: 'd02-v1-e8',
      korean: '괜찮아요',
      hangul: 'gwaen-cha-na-yo',
      zh: '没关系 / 不用了',
      pos: '表达',
      example: { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。' },
      tip: '婉拒的黄金搭档。空乘问要不要冰、路人问要不要帮忙——不想要就回「아니요, 괜찮아요」。',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字，各代表 1 词，可开描红）
  // 覆盖率 ≥20% 及格，不产生错题
  // ─────────────────────────────────────────────
  write: [
    { id: 'd02-v1-w1', korean: '물',  hangul: 'mul',     wordKorean: '물',           wordZh: '水' },
    { id: 'd02-v1-w2', korean: '커',  hangul: 'keo',     wordKorean: '커피',         wordZh: '咖啡' },
    { id: 'd02-v1-w3', korean: '메',  hangul: 'me',      wordKorean: '메뉴',         wordZh: '菜单' },
    { id: 'd02-v1-w4', korean: '얼',  hangul: 'eol',     wordKorean: '얼음',         wordZh: '冰块' },
    { id: 'd02-v1-w5', korean: '잔',  hangul: 'jan',     wordKorean: '잔',           wordZh: '杯' },
    { id: 'd02-v1-w6', korean: '부',  hangul: 'bu',      wordKorean: '부탁드립니다', wordZh: '拜托您了' },
    { id: 'd02-v1-w7', korean: '주',  hangul: 'ju',      wordKorean: '주스',         wordZh: '果汁' },
    { id: 'd02-v1-w8', korean: '괜',  hangul: 'gwaen',   wordKorean: '괜찮아요',     wordZh: '没关系' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // 干扰项：从本关词 + Day 1 熟词里挑，制造真实混淆
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd02-v1-r1',
      korean: '물',
      hangul: 'mul',
      choices: [
        { zh: '水', correct: true },
        { zh: '果汁', correct: false },
        { zh: '可乐', correct: false },
        { zh: '牛奶', correct: false },
      ],
    },
    {
      id: 'd02-v1-r2',
      korean: '커피',
      hangul: 'keo-pi',
      choices: [
        { zh: '咖啡', correct: true },
        { zh: '可乐', correct: false },
        { zh: '奶茶', correct: false },
        { zh: '茶', correct: false },
      ],
    },
    {
      id: 'd02-v1-r3',
      korean: '메뉴',
      hangul: 'me-nyu',
      choices: [
        { zh: '菜单', correct: true },
        { zh: '名字', correct: false },
        { zh: '地图', correct: false },
        { zh: '账单', correct: false },
      ],
    },
    {
      id: 'd02-v1-r4',
      korean: '얼음',
      hangul: 'eo-reum',
      choices: [
        { zh: '冰块', correct: true },
        { zh: '水', correct: false },
        { zh: '雪', correct: false },
        { zh: '牛奶', correct: false },
      ],
    },
    {
      id: 'd02-v1-r5',
      korean: '잔',
      hangul: 'jan',
      choices: [
        { zh: '杯（量词）', correct: true },
        { zh: '碗', correct: false },
        { zh: '瓶', correct: false },
        { zh: '盒', correct: false },
      ],
    },
    {
      id: 'd02-v1-r6',
      korean: '부탁드립니다',
      hangul: 'bu-tak-deu-rim-ni-da',
      choices: [
        { zh: '拜托您了 / 麻烦您', correct: true },
        { zh: '谢谢您', correct: false },
        { zh: '对不起', correct: false },
        { zh: '没关系', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词，非字母级）
  // 干扰音节挑形状接近的字，用户认的是"音节整体形状"
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd02-v1-s1',
      zhHint: '咖啡',
      answer: ['커', '피'],
      // 干扰："코"（元音 ㅓ→ㅗ 常混）；"파"（初声 ㅍ 相同，元音差）
      syllables: ['커', '피', '코', '파'],
    },
    {
      id: 'd02-v1-s2',
      zhHint: '菜单',
      answer: ['메', '뉴'],
      // 干扰："매"（元音 ㅔ→ㅐ 高频混淆）；"누"（元音 ㅠ→ㅜ 相近）
      syllables: ['메', '뉴', '매', '누'],
    },
    {
      id: 'd02-v1-s3',
      zhHint: '冰块',
      answer: ['얼', '음'],
      // 干扰："올"（元音 ㅓ→ㅗ 圆嘴差别）；"움"（元音 ㅡ→ㅜ 高频混淆）
      syllables: ['얼', '음', '올', '움'],
    },
    {
      id: 'd02-v1-s4',
      zhHint: '果汁',
      answer: ['주', '스'],
      // 干扰："추"（初声 ㅈ→ㅊ 送气差别）；"수"（初声 ㅈ→ㅅ 高频混淆）
      syllables: ['주', '스', '추', '수'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // 覆盖率 ≥20% 及格，不产生错题
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd02-v1-d1', korean: '물',       hangul: 'mul',            syllables: ['물'],                     zh: '水' },
    { id: 'd02-v1-d2', korean: '메뉴',     hangul: 'me-nyu',         syllables: ['메', '뉴'],               zh: '菜单' },
    { id: 'd02-v1-d3', korean: '괜찮아요', hangul: 'gwaen-cha-na-yo', syllables: ['괜', '찮', '아', '요'],   zh: '没关系' },
  ],
};
