import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 12 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——围绕文具店 + 韩币场景：
 * - core: 문구점 / 볼펜 / 노트 / 지우개 / 이천 / 오천
 * - ext:  맞아요 / 비싸요
 *
 * 教学重点：
 *   문구점 是 Day 12 的场景关键词
 *   볼펜/노트/지우개 是文具三件套
 *   이천/오천 是汉字数（价格数字）的常用组合
 *   맞아요 是餐厅/店铺"对"的常用回应词
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day12Vocab: VocabSubQuestData = {
  day: 12,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '在学校对面文具店学会的 8 个词',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd12-v1-e1',
      korean: '문구점',
      hangul: 'mun-gu-jeom',
      zh: '文具店',
      pos: '名词',
      example: { ko: '문구점 가요.', zh: '去文具店。' },
      tip: '汉字词「文具店」。문(文) + 구(具) + 점(店)。学校附近街道多，常和便利店挨在一起',
      tier: 'core',
    },
    {
      id: 'd12-v1-e2',
      korean: '볼펜',
      hangul: 'bol-pen',
      zh: '圆珠笔',
      pos: '名词',
      example: { ko: '볼펜 있어요?', zh: '有圆珠笔吗？' },
      tip: '外来词 ballpoint pen。也说 「펜」= 笔。搭配量词 「자루」(支)——볼펜 한 자루',
      tier: 'core',
    },
    {
      id: 'd12-v1-e3',
      korean: '노트',
      hangul: 'no-teu',
      zh: '本子 / 笔记本',
      pos: '名词',
      example: { ko: '노트 두 권 주세요.', zh: '请给我两本本子。' },
      tip: '外来词 note。搭配量词 「권」(本)。「공책」是纯韩语说法但年轻人更多用 노트',
      tier: 'core',
    },
    {
      id: 'd12-v1-e4',
      korean: '지우개',
      hangul: 'ji-u-gae',
      zh: '橡皮',
      pos: '名词',
      example: { ko: '지우개 필요해요.', zh: '需要橡皮。' },
      tip: '固有词。지우다(擦) + 개(工具后缀) = 用来擦的东西。文具店最便宜的东西之一',
      tier: 'core',
    },
    {
      id: 'd12-v1-e5',
      korean: '이천',
      hangul: 'i-cheon',
      zh: '两千 / 2000',
      pos: '数词',
      example: { ko: '이천 원이에요.', zh: '2000 元。' },
      tip: '이(2) + 천(1000) = 2000。汉字数从高位读。价格常见组合：천/이천/삼천/오천',
      tier: 'core',
    },
    {
      id: 'd12-v1-e6',
      korean: '오천',
      hangul: 'o-cheon',
      zh: '五千 / 5000',
      pos: '数词',
      example: { ko: '오천 원 주세요.', zh: '请给我 5000 元。' },
      tip: '오(5) + 천(1000) = 5000。오천원 纸币是韩国常见小额纸币（第二小面值）',
      tier: 'core',
    },
    {
      id: 'd12-v1-e7',
      korean: '맞아요',
      hangul: 'ma-ja-yo',
      zh: '对 / 没错',
      pos: '动词',
      example: { ko: '네, 맞아요.', zh: '是的，对。' },
      tip: '맞다(对) 的해요体。确认对方说得对时用。反义 「틀리다」= 错。반말是 「맞아」',
      tier: 'ext',
    },
    {
      id: 'd12-v1-e8',
      korean: '비싸요',
      hangul: 'bi-ssa-yo',
      zh: '贵',
      pos: '形容词',
      example: { ko: '너무 비싸요.', zh: '太贵了。' },
      tip: '비싸다 的해요体。反义 「싸다」= 便宜。价格惊叹三兄弟：싸요(便宜)/괜찮아요(还行)/비싸요(贵)',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd12-v1-w1', korean: '문',  hangul: 'mun',   wordKorean: '문구점',   wordZh: '文具店' },
    { id: 'd12-v1-w2', korean: '볼',  hangul: 'bol',   wordKorean: '볼펜',     wordZh: '圆珠笔' },
    { id: 'd12-v1-w3', korean: '노',  hangul: 'no',    wordKorean: '노트',     wordZh: '笔记本' },
    { id: 'd12-v1-w4', korean: '개',  hangul: 'gae',   wordKorean: '지우개',   wordZh: '橡皮' },
    { id: 'd12-v1-w5', korean: '천',  hangul: 'cheon', wordKorean: '이천',     wordZh: '两千' },
    { id: 'd12-v1-w6', korean: '오',  hangul: 'o',     wordKorean: '오천',     wordZh: '五千' },
    { id: 'd12-v1-w7', korean: '맞',  hangul: 'mat',   wordKorean: '맞아요',   wordZh: '对' },
    { id: 'd12-v1-w8', korean: '비',  hangul: 'bi',    wordKorean: '비싸요',   wordZh: '贵' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd12-v1-r1',
      korean: '문구점',
      hangul: 'mun-gu-jeom',
      choices: [
        { zh: '文具店', correct: true },
        { zh: '便利店', correct: false },
        { zh: '书店', correct: false },
        { zh: '药店', correct: false },
      ],
    },
    {
      id: 'd12-v1-r2',
      korean: '볼펜',
      hangul: 'bol-pen',
      choices: [
        { zh: '圆珠笔', correct: true },
        { zh: '铅笔', correct: false },
        { zh: '钢笔', correct: false },
        { zh: '荧光笔', correct: false },
      ],
    },
    {
      id: 'd12-v1-r3',
      korean: '노트',
      hangul: 'no-teu',
      choices: [
        { zh: '本子 / 笔记本', correct: true },
        { zh: '课本', correct: false },
        { zh: '资料', correct: false },
        { zh: '文件夹', correct: false },
      ],
    },
    {
      id: 'd12-v1-r4',
      korean: '지우개',
      hangul: 'ji-u-gae',
      choices: [
        { zh: '橡皮', correct: true },
        { zh: '铅笔', correct: false },
        { zh: '尺子', correct: false },
        { zh: '胶带', correct: false },
      ],
    },
    {
      id: 'd12-v1-r5',
      korean: '이천',
      hangul: 'i-cheon',
      choices: [
        { zh: '两千 / 2000', correct: true },
        { zh: '两百 / 200', correct: false },
        { zh: '两万 / 20000', correct: false },
        { zh: '二十 / 20', correct: false },
      ],
    },
    {
      id: 'd12-v1-r6',
      korean: '오천',
      hangul: 'o-cheon',
      choices: [
        { zh: '五千 / 5000', correct: true },
        { zh: '五百 / 500', correct: false },
        { zh: '五万 / 50000', correct: false },
        { zh: '五十 / 50', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd12-v1-s1',
      zhHint: '文具店',
      answer: ['문', '구', '점'],
      // 干扰："먼"（元音 ㅜ→ㅓ 混）；"덤"（초성 ㅈ→ㄷ 混，收音差别）
      syllables: ['문', '구', '점', '먼', '덤'],
    },
    {
      id: 'd12-v1-s2',
      zhHint: '橡皮',
      answer: ['지', '우', '개'],
      // 干扰："주"（元音 ㅣ→ㅜ 混，无 우 音节的位置错）；"게"（元音 ㅐ→ㅔ 高频混淆）
      syllables: ['지', '우', '개', '주', '게'],
    },
    {
      id: 'd12-v1-s3',
      zhHint: '两千',
      answer: ['이', '천'],
      // 干扰："오"（数字混淆 2→5）；"전"（초성 ㅊ→ㅈ 送气差别）
      syllables: ['이', '천', '오', '전'],
    },
    {
      id: 'd12-v1-s4',
      zhHint: '多少钱',
      answer: ['얼', '마', '예', '요'],
      // 干扰："올"（받침 ㄹ 相同、元音差别）；"이"（초성 ㅇ 相同、位置错）
      syllables: ['얼', '마', '예', '요', '올', '이'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd12-v1-d1', korean: '만',      hangul: 'man',           syllables: ['만'],                zh: '万 / 10000' },
    { id: 'd12-v1-d2', korean: '천 원',   hangul: 'cheon won',     syllables: ['천', '원'],          zh: '1000 元' },
    { id: 'd12-v1-d3', korean: '얼마예요', hangul: 'eol-ma-ye-yo',  syllables: ['얼', '마', '예', '요'], zh: '多少钱' },
  ],
};
