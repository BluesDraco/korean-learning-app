import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 23 · 1-3 문법 탐험 · 语法关
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：진짜 vs 정말 场景差 + 追星常用句 (팬이 되다 / V고 싶어요 复用)
 */
export const day23Grammar: GrammarSubQuestData = {
  day: 23, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握 진짜 vs 정말 · 追星表达框架',

  fix: [
    {
      id: 'd23-g3-f1',
      promptKo: '선생님, 진짜 감사합니다.',
      promptZh: '对老师说"真的非常感谢"，哪句最得体？',
      choices: [
        { text: '선생님, 진짜 감사합니다.', correct: false },
        { text: '선생님, 정말 감사합니다.', correct: true },
        { text: '선생님, 진짜 고마워.', correct: false },
        { text: '선생님, 정말 고마워.', correct: false },
      ],
      explain: '对长辈/正式场合 → 정말 감사합니다 更得体。진짜 语感偏幼稚',
    },
    {
      id: 'd23-g3-f2',
      promptKo: '이 가방 정말이에요?',
      promptZh: '"这包是真品吗？"哪句正确？',
      choices: [
        { text: '이 가방 정말이에요?', correct: false },
        { text: '이 가방 진짜예요?', correct: true },
        { text: '이 가방 정말예요?', correct: false },
        { text: '이 가방 진짜이에요?', correct: false },
      ],
      explain: '진짜 当"真品"时是名词。정말 没有名词用法。진짜 无收音 → 예요',
    },
    {
      id: 'd23-g3-f3',
      promptKo: '저도 팬가 됐어요.',
      promptZh: '"我也成为粉丝了"哪句正确？',
      choices: [
        { text: '저도 팬가 됐어요.', correct: false },
        { text: '저도 팬이 됐어요.', correct: true },
        { text: '저도 팬을 됐어요.', correct: false },
        { text: '저도 팬도 됐어요.', correct: false },
      ],
      explain: '「N이/가 되다」= 成为 N。팬 有收音 ㄴ → 이',
    },
    {
      id: 'd23-g3-f4',
      promptKo: '콘서트를 가고 싶어요.',
      promptZh: '"想去演唱会"哪句最标准？',
      choices: [
        { text: '콘서트를 가고 싶어요.', correct: false },
        { text: '콘서트에 가고 싶어요.', correct: true },
        { text: '콘서트가 가고 싶어요.', correct: false },
        { text: '콘서트도 가고 싶어요.', correct: false },
      ],
      explain: '가다 用 에 表方向。콘서트에 가다 = 去演唱会',
    },
    {
      id: 'd23-g3-f5',
      promptKo: '이 노래 진짜 좋아해요.',
      promptZh: '"这首歌真的好听"最标准的说法？',
      choices: [
        { text: '이 노래 진짜 좋아해요.', correct: false },
        { text: '이 노래 진짜 좋아요.', correct: true },
        { text: '이 노래 진짜 있어요.', correct: false },
        { text: '이 노래 진짜 되어요.', correct: false },
      ],
      explain: '좋아요 = 好（形容词，评价客观好听）；좋아해요 = 喜欢（动词，评价主观喜好）。评价"好听"用 좋아요',
    },
  ],

  compose: [
    {
      id: 'd23-g3-c1',
      zhHint: '真的吗？真的好想去！',
      audioKo: '진짜? 정말 가고 싶어요!',
      answer: ['진짜?', '정말', '가고', '싶어요!'],
      tokens: ['진짜?', '정말', '가고', '싶어요!', '진짜예요?', '있어요?', '있어요.'],
      explain: '진짜?（口语惊喜）+ 정말 가고 싶어요（认真表达）',
    },
    {
      id: 'd23-g3-c2',
      zhHint: '真的非常感谢。',
      audioKo: '정말 감사합니다.',
      answer: ['정말', '감사합니다.'],
      tokens: ['정말', '감사합니다.', '진짜', '고마워.', '반가워요.'],
      explain: '합쇼체场合优先 정말。감사합니다 是합쇼체标准感谢',
    },
    {
      id: 'd23-g3-c3',
      zhHint: '我也成为粉丝了。',
      audioKo: '저도 팬이 됐어요.',
      answer: ['저도', '팬이', '됐어요.'],
      tokens: ['저도', '팬이', '됐어요.', '팬가', '팬을', '있어요.', '해요.'],
      explain: '「N이/가 되다」= 成为 N。팬 有收音 → 이',
    },
    {
      id: 'd23-g3-c4',
      zhHint: '这首歌真好听。',
      audioKo: '이 노래 진짜 좋아요.',
      answer: ['이', '노래', '진짜', '좋아요.'],
      tokens: ['이', '노래', '진짜', '좋아요.', '정말요', '좋아해요.', '들어요.'],
      explain: '진짜 + 좋아요 = 加强"真的好"。좋아요（好听）≠ 좋아해요（喜欢）',
    },
  ],

  rule: [
    {
      id: 'd23-g3-r1',
      promptZh: '关于 진짜 vs 정말，哪句最准确？',
      choices: [
        { text: '진짜 口语更随意 / 정말 正式通用。对长辈/正式场合优先 정말', correct: true },
        { text: '两者完全一样', correct: false },
        { text: '진짜 只指 "真品"', correct: false },
        { text: '정말 只用书面语', correct: false },
      ],
      explain: '进阶用法：韩国年轻人对话里两个词都出现，但语感不同——用错会显得不合场合',
    },
    {
      id: 'd23-g3-r2',
      promptZh: '关于 진짜 当"真品"用法，哪句最准确？',
      choices: [
        { text: '진짜 = 真的（副词）+ 真品（名词）。"이거 진짜예요?" = 这是真的吗？（问真伪）', correct: true },
        { text: '진짜 只能当副词', correct: false },
        { text: '这种用法要用 정말', correct: false },
        { text: '这种用法要用 진짜의', correct: false },
      ],
      explain: '「진짜 가짜?」= 真的假的？年轻人聊天最爱说。정말가짜 是错的',
    },
    {
      id: 'd23-g3-r3',
      promptZh: '关于「N이/가 되다」，哪句最准确？',
      choices: [
        { text: '「N이/가 되다」= 成为 N。必须用主格，不用宾格。팬 → 팬이 되다', correct: true },
        { text: '되다 用宾格 을/를', correct: false },
        { text: 'N 后面直接接 되다，不需要助词', correct: false },
        { text: '되다 只在过去时使用', correct: false },
      ],
      explain: '되다 是自动词。「成为~」的主体是"~"，用主格 이/가',
    },
    {
      id: 'd23-g3-r4',
      promptZh: '关于 좋아요 vs 좋아해요，哪句最准确？',
      choices: [
        { text: '좋아요 = 好（形容词，客观评价）；좋아해요 = 喜欢（动词，主观情感）', correct: true },
        { text: '两者意思完全一样', correct: false },
        { text: '좋아요 用于人，좋아해요 用于物', correct: false },
        { text: '좋아해요 是过去时', correct: false },
      ],
      explain: '노래가 좋아요 = 歌好听；노래를 좋아해요 = 喜欢这首歌。前者用 이/가，后者用 을/를',
    },
  ],
};
