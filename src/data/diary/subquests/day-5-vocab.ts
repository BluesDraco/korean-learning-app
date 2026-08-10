import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 5 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——围绕邻居/早晨/邀请场景：
 * - core: 아침 / 식당 / 몰라요 / 알아요 / 오늘 / 좋아요（进认词考察）
 * - ext:  갈래요 / 어제（进拼写/听写考察）
 *
 * 教学重点：알아요 vs 몰라요 是 Haru 主流程对话直接使用的一对反义词。
 * 갈래요 是邀请句核心动词，Day 5 grammar 会作为组句素材。
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day5Vocab: VocabSubQuestData = {
  day: 5,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '走廊里悄悄多学的 8 个词',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd05-v1-e1',
      korean: '아침',
      hangul: 'a-chim',
      zh: '早晨 / 早饭',
      pos: '名词',
      example: { ko: '아침 먹었어요?', zh: '吃早饭了吗？' },
      tip: '一词两用：既指"早晨"也指"早饭"。「점심」= 午饭，「저녁」= 晚饭。韩国人问候第一句常是"아침 먹었어요?"',
      tier: 'core',
    },
    {
      id: 'd05-v1-e2',
      korean: '식당',
      hangul: 'sik-dang',
      zh: '食堂 / 餐厅',
      pos: '名词',
      example: { ko: '식당은 1층에 있어요.', zh: '食堂在 1 楼。' },
      tip: '汉字词「食堂」。校内叫 학생식당（学生食堂），校外一般叫 식당 或 음식점。',
      tier: 'core',
    },
    {
      id: 'd05-v1-e3',
      korean: '몰라요',
      hangul: 'mol-la-yo',
      zh: '不知道',
      pos: '动词',
      example: { ko: '아니요, 몰라요.', zh: '不，不知道。' },
      tip: '「모르다」的해요体。留学生天天用的实话。搭配 「저기요, 좀 몰라서요」= "不好意思，我不太清楚"，比直接 몰라요 委婉。',
      tier: 'core',
    },
    {
      id: 'd05-v1-e4',
      korean: '알아요',
      hangul: 'a-ra-yo',
      zh: '知道 / 认识',
      pos: '动词',
      example: { ko: '네, 알아요.', zh: '是的，我知道。' },
      tip: '「알다」的해요体。跟 몰라요 是一对反义词。알아요? 既能问"知道吗"也能问"认识吗"。',
      tier: 'core',
    },
    {
      id: 'd05-v1-e5',
      korean: '오늘',
      hangul: 'o-neul',
      zh: '今天',
      pos: '名词',
      example: { ko: '오늘은 날씨가 좋아요.', zh: '今天天气好。' },
      tip: '受收音 ㄹ 影响，主题助词用 은 → 오늘은。「어제」(昨天) / 「내일」(明天) 一组三个。',
      tier: 'core',
    },
    {
      id: 'd05-v1-e6',
      korean: '좋아요',
      hangul: 'jo-a-yo',
      zh: '好 / 喜欢',
      pos: '形容词',
      example: { ko: '한국 음식이 좋아요.', zh: '喜欢韩国菜。' },
      tip: '「좋다」的해요体。既表评价（好）也表喜好（喜欢）。注意：좋아요 是形容词，前面用主格 이/가「什么让人喜欢」，别用宾格 을/를。「저는 김치가 좋아요」= 我喜欢泡菜。',
      tier: 'core',
    },
    {
      id: 'd05-v1-e7',
      korean: '갈래요',
      hangul: 'gal-lae-yo',
      zh: '要去吗 / 想去',
      pos: '动词',
      example: { ko: '같이 갈래요?', zh: '一起去吗？' },
      tip: '「가다」+ ~ㄹ래요 = 询问对方意愿。邀请专用句尾。发音 [갈래요]，ㄹ+ㄹ 连音要念清。',
      tier: 'ext',
    },
    {
      id: 'd05-v1-e8',
      korean: '어제',
      hangul: 'eo-je',
      zh: '昨天',
      pos: '名词',
      example: { ko: '어제 밤에 KPOP 들었어요.', zh: '昨晚听 KPOP 了。' },
      tip: '和 오늘（今天）/ 내일（明天）配套。Haru 就是用「어제 밤에」抓到兔莉听 KPOP 的现行。',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd05-v1-w1', korean: '아',  hangul: 'a',       wordKorean: '아침',   wordZh: '早晨' },
    { id: 'd05-v1-w2', korean: '식',  hangul: 'sik',     wordKorean: '식당',   wordZh: '食堂' },
    { id: 'd05-v1-w3', korean: '몰',  hangul: 'mol',     wordKorean: '몰라요', wordZh: '不知道' },
    { id: 'd05-v1-w4', korean: '알',  hangul: 'al',      wordKorean: '알아요', wordZh: '知道' },
    { id: 'd05-v1-w5', korean: '오',  hangul: 'o',       wordKorean: '오늘',   wordZh: '今天' },
    { id: 'd05-v1-w6', korean: '좋',  hangul: 'jo',      wordKorean: '좋아요', wordZh: '好 / 喜欢' },
    { id: 'd05-v1-w7', korean: '갈',  hangul: 'gal',     wordKorean: '갈래요', wordZh: '要去吗' },
    { id: 'd05-v1-w8', korean: '어',  hangul: 'eo',      wordKorean: '어제',   wordZh: '昨天' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd05-v1-r1',
      korean: '아침',
      hangul: 'a-chim',
      choices: [
        { zh: '早晨 / 早饭', correct: true },
        { zh: '晚上', correct: false },
        { zh: '中午', correct: false },
        { zh: '夜里', correct: false },
      ],
    },
    {
      id: 'd05-v1-r2',
      korean: '식당',
      hangul: 'sik-dang',
      choices: [
        { zh: '食堂 / 餐厅', correct: true },
        { zh: '厨房', correct: false },
        { zh: '教室', correct: false },
        { zh: '便利店', correct: false },
      ],
    },
    {
      id: 'd05-v1-r3',
      korean: '몰라요',
      hangul: 'mol-la-yo',
      choices: [
        { zh: '不知道', correct: true },
        { zh: '不要', correct: false },
        { zh: '不喜欢', correct: false },
        { zh: '不是', correct: false },
      ],
    },
    {
      id: 'd05-v1-r4',
      korean: '알아요',
      hangul: 'a-ra-yo',
      choices: [
        { zh: '知道 / 认识', correct: true },
        { zh: '喜欢', correct: false },
        { zh: '有', correct: false },
        { zh: '想要', correct: false },
      ],
    },
    {
      id: 'd05-v1-r5',
      korean: '오늘',
      hangul: 'o-neul',
      choices: [
        { zh: '今天', correct: true },
        { zh: '昨天', correct: false },
        { zh: '明天', correct: false },
        { zh: '每天', correct: false },
      ],
    },
    {
      id: 'd05-v1-r6',
      korean: '좋아요',
      hangul: 'jo-a-yo',
      choices: [
        { zh: '好 / 喜欢', correct: true },
        { zh: '不好', correct: false },
        { zh: '一般', correct: false },
        { zh: '讨厌', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词，非字母级）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd05-v1-s1',
      zhHint: '早晨',
      answer: ['아', '침'],
      // 干扰："야"（元音 ㅏ→ㅑ 高频混淆）；"참"（初声 ㅊ→ㅊ 相同，元音差别）
      syllables: ['아', '침', '야', '참'],
    },
    {
      id: 'd05-v1-s2',
      zhHint: '食堂',
      answer: ['식', '당'],
      // 干扰："싣"（收音 ㄱ→ㄷ 混）；"당"字重复本身即答案—换成"덩"（元音 ㅏ→ㅓ 混）
      syllables: ['식', '당', '싣', '덩'],
    },
    {
      id: 'd05-v1-s3',
      zhHint: '不知道',
      answer: ['몰', '라', '요'],
      // 干扰："말"（元音 ㅗ→ㅏ 混）；"래"（元音 ㅏ→ㅐ 高频混淆）
      syllables: ['몰', '라', '요', '말', '래'],
    },
    {
      id: 'd05-v1-s4',
      zhHint: '昨天',
      answer: ['어', '제'],
      // 干扰："아"（元音 ㅓ→ㅏ 混）；"재"（元音 ㅔ→ㅐ 高频混淆）
      syllables: ['어', '제', '아', '재'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd05-v1-d1', korean: '아침',   hangul: 'a-chim',    syllables: ['아', '침'],       zh: '早晨' },
    { id: 'd05-v1-d2', korean: '알아요', hangul: 'a-ra-yo',   syllables: ['알', '아', '요'], zh: '知道' },
    { id: 'd05-v1-d3', korean: '같이',   hangul: 'ga-chi',    syllables: ['같', '이'],       zh: '一起（读音 [가치]，字形写 같이）' },
  ],
};
