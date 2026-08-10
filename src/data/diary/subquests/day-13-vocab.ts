import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 13 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——围绕感冒 + 药店场景：
 * - core: 열 / 목 / 머리 / 아파요 / 따뜻한 물 / 병원
 * - ext:  식후 / 처방전
 *
 * 教学重点：
 *   열/목/머리 是描述症状的身体三部位
 *   아파요 是「痛」的해요体（형용사·前用主格 이/가）
 *   따뜻한 물 是白鹭姐姐嘱咐的"多喝热水"关键词组
 *   식후 = 饭后（药店指导用语·汉字词）
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day13Vocab: VocabSubQuestData = {
  day: 13,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '在 약국 柜台学会的 8 个救命词',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd13-v1-e1',
      korean: '열',
      hangul: 'yeol',
      zh: '发烧 / 热',
      pos: '名词',
      example: { ko: '열이 나요.', zh: '发烧了。' },
      tip: '固有词。「열」既是"热"也是"10"（同音异义）。搭配 「~이 나다」= 发（症状）→ 열이 나요',
      tier: 'core',
    },
    {
      id: 'd13-v1-e2',
      korean: '목',
      hangul: 'mok',
      zh: '嗓子 / 脖子',
      pos: '名词',
      example: { ko: '목이 아파요.', zh: '嗓子痛。' },
      tip: '固有词。既指"喉咙内部"（嗓子痛）也指"脖子外部"。「목이 아파요」= 嗓子痛，最常见的感冒症状',
      tier: 'core',
    },
    {
      id: 'd13-v1-e3',
      korean: '머리',
      hangul: 'meo-ri',
      zh: '头 / 头发',
      pos: '名词',
      example: { ko: '머리가 아파요.', zh: '头痛。' },
      tip: '固有词。既指"头部"也指"头发"。「머리가 아파요」= 头痛。「머리를 자르다」= 剪头发',
      tier: 'core',
    },
    {
      id: 'd13-v1-e4',
      korean: '아파요',
      hangul: 'a-pa-yo',
      zh: '痛 / 疼',
      pos: '形容词',
      example: { ko: '어디가 아파요?', zh: '哪里痛？' },
      tip: '아프다 → 아파요（으不规则：아프 → 아파）。前用**主格 이/가**。头痛/嗓子痛/肚子痛都用这个',
      tier: 'core',
    },
    {
      id: 'd13-v1-e5',
      korean: '따뜻한 물',
      hangul: 'tta-tteu-tan mul',
      zh: '热水 / 温水',
      pos: '名词',
      example: { ko: '따뜻한 물 많이 마셔요.', zh: '多喝热水。' },
      tip: '따뜻하다(温暖) → 따뜻한(定语形) + 물(水)。白鹭姐姐嘱咐感冒必喝——韩国和中国一样信"喝热水"',
      tier: 'core',
    },
    {
      id: 'd13-v1-e6',
      korean: '병원',
      hangul: 'byeong-won',
      zh: '医院',
      pos: '名词',
      example: { ko: '병원 가야 돼요?', zh: '要去医院吗？' },
      tip: '汉字词「病院」。「병원 vs 약국」区分：병원 = 医院(看医生)；약국 = 药店(买药)。轻症去 약국即可',
      tier: 'core',
    },
    {
      id: 'd13-v1-e7',
      korean: '식후',
      hangul: 'sik-hu',
      zh: '饭后',
      pos: '名词',
      example: { ko: '식후에 드세요.', zh: '请饭后服用。' },
      tip: '汉字词「食后」。반대말 「식전」= 饭前。药盒上必写 「식후 30분」= 饭后 30 分钟',
      tier: 'ext',
    },
    {
      id: 'd13-v1-e8',
      korean: '처방전',
      hangul: 'cheo-bang-jeon',
      zh: '处方',
      pos: '名词',
      example: { ko: '처방전 있어요?', zh: '有处方吗？' },
      tip: '汉字词「处方笺」。韩国有些药需要 병원 医生开处方才能在 약국买。감기药通常不用',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd13-v1-w1', korean: '열',  hangul: 'yeol',    wordKorean: '열',       wordZh: '发烧' },
    { id: 'd13-v1-w2', korean: '목',  hangul: 'mok',     wordKorean: '목',       wordZh: '嗓子' },
    { id: 'd13-v1-w3', korean: '머',  hangul: 'meo',     wordKorean: '머리',     wordZh: '头' },
    { id: 'd13-v1-w4', korean: '아',  hangul: 'a',       wordKorean: '아파요',   wordZh: '痛' },
    { id: 'd13-v1-w5', korean: '따',  hangul: 'tta',     wordKorean: '따뜻한 물', wordZh: '热水' },
    { id: 'd13-v1-w6', korean: '병',  hangul: 'byeong',  wordKorean: '병원',     wordZh: '医院' },
    { id: 'd13-v1-w7', korean: '식',  hangul: 'sik',     wordKorean: '식후',     wordZh: '饭后' },
    { id: 'd13-v1-w8', korean: '처',  hangul: 'cheo',    wordKorean: '처방전',   wordZh: '处方' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd13-v1-r1',
      korean: '열',
      hangul: 'yeol',
      choices: [
        { zh: '发烧 / 热', correct: true },
        { zh: '冷 / 凉', correct: false },
        { zh: '疼 / 痛', correct: false },
        { zh: '累 / 困', correct: false },
      ],
    },
    {
      id: 'd13-v1-r2',
      korean: '목',
      hangul: 'mok',
      choices: [
        { zh: '嗓子 / 脖子', correct: true },
        { zh: '肚子', correct: false },
        { zh: '眼睛', correct: false },
        { zh: '鼻子', correct: false },
      ],
    },
    {
      id: 'd13-v1-r3',
      korean: '머리',
      hangul: 'meo-ri',
      choices: [
        { zh: '头 / 头发', correct: true },
        { zh: '手 / 手指', correct: false },
        { zh: '脚 / 腿', correct: false },
        { zh: '眼睛', correct: false },
      ],
    },
    {
      id: 'd13-v1-r4',
      korean: '아파요',
      hangul: 'a-pa-yo',
      choices: [
        { zh: '痛 / 疼', correct: true },
        { zh: '累 / 辛苦', correct: false },
        { zh: '冷 / 凉', correct: false },
        { zh: '饿', correct: false },
      ],
    },
    {
      id: 'd13-v1-r5',
      korean: '따뜻한 물',
      hangul: 'tta-tteu-tan mul',
      choices: [
        { zh: '热水 / 温水', correct: true },
        { zh: '冰水', correct: false },
        { zh: '牛奶', correct: false },
        { zh: '茶', correct: false },
      ],
    },
    {
      id: 'd13-v1-r6',
      korean: '병원',
      hangul: 'byeong-won',
      choices: [
        { zh: '医院', correct: true },
        { zh: '药店', correct: false },
        { zh: '便利店', correct: false },
        { zh: '公司', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd13-v1-s1',
      zhHint: '药店',
      answer: ['약', '국'],
      // 干扰："악"（초성 ㅇ 相同、终声 ㄱ 相同、元音差 ㅑ→ㅏ）；"군"（받침 ㄱ→ㄴ 混）
      syllables: ['약', '국', '악', '군'],
    },
    {
      id: 'd13-v1-s2',
      zhHint: '感冒',
      answer: ['감', '기'],
      // 干扰："강"（받침 ㅁ→ㅇ 混）；"지"（초성 ㄱ→ㅈ 混）
      syllables: ['감', '기', '강', '지'],
    },
    {
      id: 'd13-v1-s3',
      zhHint: '鼻涕',
      answer: ['콧', '물'],
      // 干扰："콘"（받침 ㅅ→ㄴ 混）；"불"（초성 ㅁ→ㅂ 混）
      syllables: ['콧', '물', '콘', '불'],
    },
    {
      id: 'd13-v1-s4',
      zhHint: '医院',
      answer: ['병', '원'],
      // 干扰："방"（초성 ㅂ 相同、元음 ㅕ→ㅏ 混）；"완"（초성 ㅇ 相同、元음差别）
      syllables: ['병', '원', '방', '완'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd13-v1-d1', korean: '감기',    hangul: 'gam-gi',     syllables: ['감', '기'],       zh: '感冒' },
    { id: 'd13-v1-d2', korean: '아파요',  hangul: 'a-pa-yo',    syllables: ['아', '파', '요'], zh: '痛' },
    { id: 'd13-v1-d3', korean: '드세요',  hangul: 'deu-se-yo',  syllables: ['드', '세', '요'], zh: '请服用' },
  ],
};
