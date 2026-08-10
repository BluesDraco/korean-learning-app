import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 30 · 1-1 단어 마스터 · 毕业词汇子关卡
 *
 * 主流程 6 词（졸업/시험/합격/행복/실수/중급）之外的 8 个新词。
 * - core: 초급 / 짐 / 집 / 동안 / 살다 / 무겁다（进认词考察）
 * - ext:  지만 / 앞으로도（进拼写 / 听辨）
 *
 * 场景延展：从"짐/집辨析梗"到"30天回顾"到"今后也请多关照"。
 */
export const day30Vocab: VocabSubQuestData = {
  day: 30,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '毕业感言 · 写给自己的 8 个词',

  encounter: [
    {
      id: 'd30-v1-e1',
      korean: '초급',
      hangul: 'cho-geup',
      zh: '初级',
      pos: '名词',
      example: { ko: '초급반 졸업이에요.', zh: '初级班毕业了。' },
      tip: '汉字词「初级」。등급 순서 초급 → 중급 → 고급',
      tier: 'core',
    },
    {
      id: 'd30-v1-e2',
      korean: '짐',
      hangul: 'jim',
      zh: '行李',
      pos: '名词',
      example: { ko: '짐이 무거워요.', zh: '行李好重。' },
      tip: 'Day 3 Tori 说错成 「집이 무거워요」（家好重）。差一个字母差一个世界',
      tier: 'core',
    },
    {
      id: 'd30-v1-e3',
      korean: '집',
      hangul: 'jip',
      zh: '家',
      pos: '名词',
      example: { ko: '집이 넓어요.', zh: '家很大。' },
      tip: '固有词。和 짐 差一个字母 · 하지만 意思完全不同',
      tier: 'core',
    },
    {
      id: 'd30-v1-e4',
      korean: '동안',
      hangul: 'dong-an',
      zh: '期间',
      pos: '名词',
      example: { ko: '30일 동안 정말 행복했어요.', zh: '30天很幸福。' },
      tip: '时间量词 + 동안 = 期间。「N일/시간/년 동안」是标准搭配',
      tier: 'core',
    },
    {
      id: 'd30-v1-e5',
      korean: '살다',
      hangul: 'sal-da',
      zh: '生活 / 住',
      pos: '动词',
      example: { ko: '서울에 살아요.', zh: '住在首尔。' },
      tip: 'ㄹ 词干动词。해요体：살아요。承诺句：잘 살게요 = 会好好生活',
      tier: 'core',
    },
    {
      id: 'd30-v1-e6',
      korean: '무겁다',
      hangul: 'mu-geop-da',
      zh: '重',
      pos: '形容词',
      example: { ko: '가방이 무거워요.', zh: '包好重。' },
      tip: 'ㅂ 不规则 → 무거워요。过去 무거웠어요。反义 가볍다 = 轻',
      tier: 'core',
    },
    {
      id: 'd30-v1-e7',
      korean: '지만',
      hangul: 'ji-man',
      zh: '虽然……但是',
      pos: '语尾',
      example: { ko: '실수도 많았지만 행복했어요.', zh: '虽然失误多但幸福。' },
      tip: 'V/A + 지만 = 但是（转折）。前后主语可相同 · 直接接词干',
      tier: 'ext',
    },
    {
      id: 'd30-v1-e8',
      korean: '앞으로도',
      hangul: 'a-peu-ro-do',
      zh: '今后也',
      pos: '副词',
      example: { ko: '앞으로도 잘 부탁드려요.', zh: '今后也请多关照。' },
      tip: '앞으로 + 도（也）· 「앞으로도 잘 부탁드려요」是关系延续的标准句',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd30-v1-r1',
      korean: '초급',
      hangul: 'cho-geup',
      choices: [
        { zh: '初级', correct: true },
        { zh: '中级', correct: false },
        { zh: '高级', correct: false },
        { zh: '入门', correct: false },
      ],
    },
    {
      id: 'd30-v1-r2',
      korean: '짐',
      hangul: 'jim',
      choices: [
        { zh: '行李', correct: true },
        { zh: '家', correct: false },
        { zh: '包裹', correct: false },
        { zh: '货物', correct: false },
      ],
    },
    {
      id: 'd30-v1-r3',
      korean: '집',
      hangul: 'jip',
      choices: [
        { zh: '家', correct: true },
        { zh: '行李', correct: false },
        { zh: '房间', correct: false },
        { zh: '客厅', correct: false },
      ],
    },
    {
      id: 'd30-v1-r4',
      korean: '동안',
      hangul: 'dong-an',
      choices: [
        { zh: '期间', correct: true },
        { zh: '前面', correct: false },
        { zh: '后来', correct: false },
        { zh: '暂时', correct: false },
      ],
    },
    {
      id: 'd30-v1-r5',
      korean: '살다',
      hangul: 'sal-da',
      choices: [
        { zh: '生活 / 住', correct: true },
        { zh: '死', correct: false },
        { zh: '买', correct: false },
        { zh: '来', correct: false },
      ],
    },
    {
      id: 'd30-v1-r6',
      korean: '무겁다',
      hangul: 'mu-geop-da',
      choices: [
        { zh: '重', correct: true },
        { zh: '轻', correct: false },
        { zh: '大', correct: false },
        { zh: '硬', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd30-v1-s1',
      zhHint: '毕业',
      answer: ['졸', '업'],
      // 干扰："졸"（同）；"엄"（초성 ㅇ 相同）
      syllables: ['졸', '업', '졷', '엄'],
    },
    {
      id: 'd30-v1-s2',
      zhHint: '合格',
      answer: ['합', '격'],
      // 干扰："합"（同）；"결"（意思相关 결제 一部分）
      syllables: ['합', '격', '핪', '결'],
    },
    {
      id: 'd30-v1-s3',
      zhHint: '幸福',
      answer: ['행', '복'],
      // 干扰："형"（초성 ㅎ 相同、元음 差别）；"북"（初声 ㅂ 相同、元음差别）
      syllables: ['행', '복', '형', '북'],
    },
    {
      id: 'd30-v1-s4',
      zhHint: '中级',
      answer: ['중', '급'],
      // 干扰："중"（同）；"금"（元음 ㅡ 相同）
      syllables: ['중', '급', '증', '금'],
    },
  ],

  write: [
    { id: 'd30-v1-w1', korean: '졸', hangul: 'jol',       wordKorean: '졸업',        wordZh: '毕业' },
    { id: 'd30-v1-w2', korean: '시', hangul: 'si',        wordKorean: '시험',        wordZh: '考试' },
    { id: 'd30-v1-w3', korean: '합', hangul: 'hap',       wordKorean: '합격',        wordZh: '合格' },
    { id: 'd30-v1-w4', korean: '행', hangul: 'haeng',     wordKorean: '행복',        wordZh: '幸福' },
    { id: 'd30-v1-w5', korean: '실', hangul: 'sil',       wordKorean: '실수',        wordZh: '失误' },
    { id: 'd30-v1-w6', korean: '중', hangul: 'jung',      wordKorean: '중급',        wordZh: '中级' },
    { id: 'd30-v1-w7', korean: '짐', hangul: 'jim',       wordKorean: '짐',          wordZh: '行李' },
    { id: 'd30-v1-w8', korean: '집', hangul: 'jip',       wordKorean: '집',          wordZh: '家' },
  ],

  dictation: [
    { id: 'd30-v1-d1', korean: '짐이 무거워요',   hangul: 'ji-mi mu-geo-wo-yo',    syllables: ['짐', '이', '무', '거', '워', '요'], zh: '行李重' },
    { id: 'd30-v1-d2', korean: '합격했어요',       hangul: 'hap-gyeo-kae-sseo-yo',  syllables: ['합', '격', '했', '어', '요'],       zh: '合格了' },
    { id: 'd30-v1-d3', korean: '진짜 감사합니다',  hangul: 'jin-jja gam-sa-ham-ni-da', syllables: ['진', '짜', '감', '사', '합', '니', '다'], zh: '真的感谢' },
  ],
};
