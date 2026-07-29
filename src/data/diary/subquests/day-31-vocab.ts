import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 31 · 2-1 단어 마스터 · 中级班第一天词汇子关卡
 *
 * 主流程 6 词（중급반 / 유창하다 / 부럽다 / 실력 / 대단하다 / 여우）+ 2 个扩展词
 * - core: 중급반 / 유창하다 / 부럽다 / 실력 / 대단하다 / 여우（进认词考察）
 * - ext:  똑같이 / 아직（进拼写 / 听辨）
 *
 * 场景延展：Danielle 登场 → 感叹她的实力 → 心里泛起的羡慕
 */
export const day31Vocab: VocabSubQuestData = {
  day: 1,
  level: 'intermediate',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '中级班第一天的 8 个词',

  encounter: [
    {
      id: 'd31-v1-e1',
      korean: '중급반',
      hangul: 'jung-geup-ban',
      zh: '中级班',
      pos: '名词',
      example: { ko: '오늘부터 중급반이에요.', zh: '从今天起是中级班。' },
      tip: '中(중) + 级(급) + 班(반) 三字汉字词。순서：초급반 → 중급반 → 고급반',
      tier: 'core',
    },
    {
      id: 'd31-v1-e2',
      korean: '유창하다',
      hangul: 'yu-chang-ha-da',
      zh: '流利',
      pos: '形容词',
      example: { ko: '다니엘은 한국어가 유창해요.', zh: 'Danielle 的韩语很流利。' },
      tip: '유창(流畅) + 하다。夸别人语言好最标准的一个词。感叹用 유창하네요',
      tier: 'core',
    },
    {
      id: 'd31-v1-e3',
      korean: '부럽다',
      hangul: 'bu-reop-da',
      zh: '羡慕',
      pos: '形容词',
      example: { ko: '진짜 부러워요.', zh: '真的很羡慕。' },
      tip: 'ㅂ 不规则 → 부러워요（해요体）。~네요 前保持原样：부럽네요',
      tier: 'core',
    },
    {
      id: 'd31-v1-e4',
      korean: '실력',
      hangul: 'sil-lyeok',
      zh: '实力 / 水平',
      pos: '名词',
      example: { ko: '실력이 대단하네요.', zh: '水平真了不起呢。' },
      tip: '实(실) + 力(력)。学习 / 工作 / 运动都能说 실력',
      tier: 'core',
    },
    {
      id: 'd31-v1-e5',
      korean: '대단하다',
      hangul: 'dae-dan-ha-da',
      zh: '了不起 / 厉害',
      pos: '形容词',
      example: { ko: '토리, 대단하네요!', zh: '兔莉，真厉害呢！' },
      tip: '比 잘하다 更强的一个词，带敬佩感。常和 실력 / 사람 搭配',
      tier: 'core',
    },
    {
      id: 'd31-v1-e6',
      korean: '여우',
      hangul: 'yeo-u',
      zh: '狐狸',
      pos: '名词',
      example: { ko: '새로 온 친구는 여우예요.', zh: '新来的朋友是狐狸。' },
      tip: '여우 无收音 → 예요。俗语「여우같다」也用来形容人机灵',
      tier: 'core',
    },
    {
      id: 'd31-v1-e7',
      korean: '똑같이',
      hangul: 'ttok-ga-chi',
      zh: '一样地 / 同样',
      pos: '副词',
      example: { ko: '똑같이 외국인인데 왜 잘하지?', zh: '同样是外国人，为什么这么厉害？' },
      tip: '똑같다（一样）的副词形。发音 [똑까치] · 口盖音化：ㅌ + ㅣ → ㅊ',
      tier: 'ext',
    },
    {
      id: 'd31-v1-e8',
      korean: '아직',
      hangul: 'a-jik',
      zh: '还 / 尚',
      pos: '副词',
      example: { ko: '저는 아직 부족해요.', zh: '我还差得远。' },
      tip: '常和 안/못 或 부족하다 搭配。「아직 멀었어요」= 还早呢',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd31-v1-r1',
      korean: '중급반',
      hangul: 'jung-geup-ban',
      choices: [
        { zh: '中级班', correct: true },
        { zh: '初级班', correct: false },
        { zh: '高级班', correct: false },
        { zh: '中学', correct: false },
      ],
    },
    {
      id: 'd31-v1-r2',
      korean: '유창하다',
      hangul: 'yu-chang-ha-da',
      choices: [
        { zh: '流利', correct: true },
        { zh: '认真', correct: false },
        { zh: '难', correct: false },
        { zh: '流畅（河水）', correct: false },
      ],
    },
    {
      id: 'd31-v1-r3',
      korean: '부럽다',
      hangul: 'bu-reop-da',
      choices: [
        { zh: '羡慕', correct: true },
        { zh: '讨厌', correct: false },
        { zh: '骄傲', correct: false },
        { zh: '委屈', correct: false },
      ],
    },
    {
      id: 'd31-v1-r4',
      korean: '실력',
      hangul: 'sil-lyeok',
      choices: [
        { zh: '实力 / 水平', correct: true },
        { zh: '实话', correct: false },
        { zh: '努力', correct: false },
        { zh: '压力', correct: false },
      ],
    },
    {
      id: 'd31-v1-r5',
      korean: '대단하다',
      hangul: 'dae-dan-ha-da',
      choices: [
        { zh: '了不起 / 厉害', correct: true },
        { zh: '普通', correct: false },
        { zh: '大声', correct: false },
        { zh: '简单', correct: false },
      ],
    },
    {
      id: 'd31-v1-r6',
      korean: '여우',
      hangul: 'yeo-u',
      choices: [
        { zh: '狐狸', correct: true },
        { zh: '兔子', correct: false },
        { zh: '狼', correct: false },
        { zh: '猫', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd31-v1-s1',
      zhHint: '中级',
      answer: ['중', '급'],
      syllables: ['중', '급', '증', '금'],
    },
    {
      id: 'd31-v1-s2',
      zhHint: '流畅（유창）',
      answer: ['유', '창'],
      syllables: ['유', '창', '윤', '장'],
    },
    {
      id: 'd31-v1-s3',
      zhHint: '实力',
      answer: ['실', '력'],
      syllables: ['실', '력', '신', '역'],
    },
    {
      id: 'd31-v1-s4',
      zhHint: '狐狸',
      answer: ['여', '우'],
      syllables: ['여', '우', '요', '유'],
    },
  ],

  write: [
    { id: 'd31-v1-w1', korean: '중', hangul: 'jung',   wordKorean: '중급반', wordZh: '中级班' },
    { id: 'd31-v1-w2', korean: '유', hangul: 'yu',     wordKorean: '유창하다', wordZh: '流利' },
    { id: 'd31-v1-w3', korean: '창', hangul: 'chang',  wordKorean: '유창하다', wordZh: '流利' },
    { id: 'd31-v1-w4', korean: '부', hangul: 'bu',     wordKorean: '부럽다', wordZh: '羡慕' },
    { id: 'd31-v1-w5', korean: '실', hangul: 'sil',    wordKorean: '실력', wordZh: '实力' },
    { id: 'd31-v1-w6', korean: '대', hangul: 'dae',    wordKorean: '대단하다', wordZh: '了不起' },
    { id: 'd31-v1-w7', korean: '여', hangul: 'yeo',    wordKorean: '여우', wordZh: '狐狸' },
    { id: 'd31-v1-w8', korean: '우', hangul: 'u',      wordKorean: '여우', wordZh: '狐狸' },
  ],

  dictation: [
    { id: 'd31-v1-d1', korean: '유창하네요',       hangul: 'yu-chang-ha-ne-yo',        syllables: ['유', '창', '하', '네', '요'],       zh: '真流利呢' },
    { id: 'd31-v1-d2', korean: '실력이 대단해요',   hangul: 'sil-lyeo-gi dae-dan-hae-yo', syllables: ['실', '력', '이', '대', '단', '해', '요'], zh: '水平真了不起' },
    { id: 'd31-v1-d3', korean: '진짜 부러워요',     hangul: 'jin-jja bu-reo-wo-yo',      syllables: ['진', '짜', '부', '러', '워', '요'], zh: '真的很羡慕' },
  ],
};
