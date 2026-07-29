import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 9 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——围绕 CU 便利店场景：
 * - core: 커피 / 물 / 계산 / 봉투 / 개(量词) / 병(量词)
 * - ext:  천천히 / 여기요
 *
 * 教学重点：
 *   개/병 是韩语生活量词——所有便利店结账必须搭配
 *   천천히 是 Day 9 考拉哥哥的招牌温柔句"慢慢来"
 *   여기요 用于示意店员到桌边或递东西时的"这儿"（招呼陌生店员母语者更常用 저기요）
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day9Vocab: VocabSubQuestData = {
  day: 9,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '在 CU 收银台前捡起的 8 个词',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd09-v1-e1',
      korean: '커피',
      hangul: 'keo-pi',
      zh: '咖啡',
      pos: '名词',
      example: { ko: '커피 한 잔 주세요.', zh: '请给我一杯咖啡。' },
      tip: '外来词 coffee。搭配量词「잔」(杯)。발음 [커피]，注意 「ㅋ」是送气的爆破音',
      tier: 'core',
    },
    {
      id: 'd09-v1-e2',
      korean: '물',
      hangul: 'mul',
      zh: '水',
      pos: '名词',
      example: { ko: '물 한 병 주세요.', zh: '请给我一瓶水。' },
      tip: '固有词。搭配「병」(瓶) / 「잔」(杯)。「따뜻한 물」= 热水（Day 13 会用）。「생수」= 矿泉水',
      tier: 'core',
    },
    {
      id: 'd09-v1-e3',
      korean: '계산',
      hangul: 'gye-san',
      zh: '结账 / 计算',
      pos: '名词',
      example: { ko: '계산 도와드릴게요.', zh: '我帮您结账。' },
      tip: '汉字词「计算」。动词 계산하다。店员标准语「계산 도와드릴게요」是 CU 收银台一进门就听到的一句',
      tier: 'core',
    },
    {
      id: 'd09-v1-e4',
      korean: '봉투',
      hangul: 'bong-tu',
      zh: '袋子',
      pos: '名词',
      example: { ko: '봉투 필요하세요?', zh: '需要袋子吗？' },
      tip: '汉字词「封套」。韩国便利店塑料袋收费 100 원。「봉투 주세요」= 请给我袋子。也说 「비닐봉투」= 塑料袋',
      tier: 'core',
    },
    {
      id: 'd09-v1-e5',
      korean: '개',
      hangul: 'gae',
      zh: '个（量词）',
      pos: '量词',
      example: { ko: '삼각김밥 두 개 주세요.', zh: '请给我两个三角饭团。' },
      tip: '万能量词——大部分东西都能用。搭配固有数：한 개(1个)、두 개(2个)、세 개(3个)、네 개(4个)、다섯 개(5个)',
      tier: 'core',
    },
    {
      id: 'd09-v1-e6',
      korean: '병',
      hangul: 'byeong',
      zh: '瓶（量词）',
      pos: '量词',
      example: { ko: '물 한 병.', zh: '一瓶水。' },
      tip: '汉字词「瓶」。搭配固有数——한 병(1瓶)、두 병(2瓶)。用于饮料、酒。「병」也可以是"病"，靠上下文分',
      tier: 'core',
    },
    {
      id: 'd09-v1-e7',
      korean: '천천히',
      hangul: 'cheon-cheon-hi',
      zh: '慢慢地',
      pos: '副词',
      example: { ko: '천천히 하세요.', zh: '慢慢来。' },
      tip: '「천천히 하세요」是韩国人最温柔的一句——考拉哥哥今天说的。也用于「천천히 드세요」(慢慢吃)',
      tier: 'ext',
    },
    {
      id: 'd09-v1-e8',
      korean: '여기요',
      hangul: 'yeo-gi-yo',
      zh: '这儿（示意 / 递东西）',
      pos: '感叹词',
      example: { ko: '여기요, 김밥 하나 더 주세요.', zh: '（招手示意店员到桌边）请再来一个紫菜包饭。' },
      tip: '「여기」(这里) + 요。招呼陌生店员母语者通常用「저기요」；「여기요」多用于**已经确认位置**（示意店员这桌）或递东西时"这里"。日常首选 저기요',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd09-v1-w1', korean: '커',  hangul: 'keo',    wordKorean: '커피',     wordZh: '咖啡' },
    { id: 'd09-v1-w2', korean: '물',  hangul: 'mul',    wordKorean: '물',       wordZh: '水' },
    { id: 'd09-v1-w3', korean: '계',  hangul: 'gye',    wordKorean: '계산',     wordZh: '结账' },
    { id: 'd09-v1-w4', korean: '봉',  hangul: 'bong',   wordKorean: '봉투',     wordZh: '袋子' },
    { id: 'd09-v1-w5', korean: '개',  hangul: 'gae',    wordKorean: '개',       wordZh: '个' },
    { id: 'd09-v1-w6', korean: '병',  hangul: 'byeong', wordKorean: '병',       wordZh: '瓶' },
    { id: 'd09-v1-w7', korean: '천',  hangul: 'cheon',  wordKorean: '천천히',   wordZh: '慢慢地' },
    { id: 'd09-v1-w8', korean: '여',  hangul: 'yeo',    wordKorean: '여기요',   wordZh: '这儿' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd09-v1-r1',
      korean: '커피',
      hangul: 'keo-pi',
      choices: [
        { zh: '咖啡', correct: true },
        { zh: '果汁', correct: false },
        { zh: '牛奶', correct: false },
        { zh: '可乐', correct: false },
      ],
    },
    {
      id: 'd09-v1-r2',
      korean: '물',
      hangul: 'mul',
      choices: [
        { zh: '水', correct: true },
        { zh: '奶', correct: false },
        { zh: '汤', correct: false },
        { zh: '茶', correct: false },
      ],
    },
    {
      id: 'd09-v1-r3',
      korean: '계산',
      hangul: 'gye-san',
      choices: [
        { zh: '结账 / 计算', correct: true },
        { zh: '订餐', correct: false },
        { zh: '预订', correct: false },
        { zh: '取消', correct: false },
      ],
    },
    {
      id: 'd09-v1-r4',
      korean: '봉투',
      hangul: 'bong-tu',
      choices: [
        { zh: '袋子', correct: true },
        { zh: '盒子', correct: false },
        { zh: '纸巾', correct: false },
        { zh: '收据', correct: false },
      ],
    },
    {
      id: 'd09-v1-r5',
      korean: '개',
      hangul: 'gae',
      choices: [
        { zh: '个（量词，通用）', correct: true },
        { zh: '瓶（量词）', correct: false },
        { zh: '杯（量词）', correct: false },
        { zh: '张（量词）', correct: false },
      ],
    },
    {
      id: 'd09-v1-r6',
      korean: '병',
      hangul: 'byeong',
      choices: [
        { zh: '瓶（量词）', correct: true },
        { zh: '个（量词）', correct: false },
        { zh: '本（量词）', correct: false },
        { zh: '张（量词）', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd09-v1-s1',
      zhHint: '咖啡',
      answer: ['커', '피'],
      // 干扰："코"（元音 ㅓ→ㅗ 高频混）；"비"（초성 ㅍ→ㅂ 送气差别）
      syllables: ['커', '피', '코', '비'],
    },
    {
      id: 'd09-v1-s2',
      zhHint: '结账 / 计算',
      answer: ['계', '산'],
      // 干扰："개"（元音 ㅖ→ㅐ 混）；"손"（초성 ㅅ 相同、元音差别）
      syllables: ['계', '산', '개', '손'],
    },
    {
      id: 'd09-v1-s3',
      zhHint: '袋子',
      answer: ['봉', '투'],
      // 干扰："방"（收音 ㅇ 相同、元音 ㅗ→ㅏ 混）；"두"（초성 ㅌ→ㄷ 送气差别）
      syllables: ['봉', '투', '방', '두'],
    },
    {
      id: 'd09-v1-s4',
      zhHint: '慢慢地',
      answer: ['천', '천', '히'],
      // 干扰："전"（초성 ㅊ→ㅈ 送气差别）；"이"（초성 ㅎ→ㅇ 混）
      syllables: ['천', '천', '히', '전', '이'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd09-v1-d1', korean: '이거',    hangul: 'i-geo',       syllables: ['이', '거'],            zh: '这个' },
    { id: 'd09-v1-d2', korean: '주세요',  hangul: 'ju-se-yo',    syllables: ['주', '세', '요'],      zh: '请给我' },
    { id: 'd09-v1-d3', korean: '얼마예요', hangul: 'eol-ma-ye-yo', syllables: ['얼', '마', '예', '요'], zh: '多少钱' },
  ],
};
