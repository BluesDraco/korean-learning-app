import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 19 · 1-3 문법 탐험 · 语法关
 * 3 段：助词改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：N + 도 助词替换规则 + 病症表达搭配（X이 아프다 / X이 나다）
 */
export const day19Grammar: GrammarSubQuestData = {
  day: 19, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握 N + 도 助词替换 + 症状表达搭配',

  fix: [
    {
      id: 'd19-g3-f1',
      promptKo: '저는도 학생이에요.',
      promptZh: '"我也是学生"哪句正确？',
      choices: [
        { text: '저는도 학생이에요.', correct: false },
        { text: '저도 학생이에요.', correct: true },
        { text: '저는 도 학생이에요.', correct: false },
        { text: '저이 학생이에요.', correct: false },
      ],
      explain: '도 直接替换 은/는，不叠加。저 + 는 → 저 + 도，不能写 저는도',
    },
    {
      id: 'd19-g3-f2',
      promptKo: '커피를도 주세요.',
      promptZh: '"咖啡也请给我"哪句正确？',
      choices: [
        { text: '커피를도 주세요.', correct: false },
        { text: '커피도 주세요.', correct: true },
        { text: '커피가도 주세요.', correct: false },
        { text: '커피 도 주세요.', correct: false },
      ],
      explain: '도 替换宾格 을/를，不叠加。커피 + 를 → 커피 + 도',
    },
    {
      id: 'd19-g3-f3',
      promptKo: '열이 나고, 목이 아파요.',
      promptZh: '"也发烧，嗓子也疼"最标准的说法？',
      choices: [
        { text: '열이 나고, 목이 아파요.', correct: false },
        { text: '열도 나고, 목도 아파요.', correct: true },
        { text: '열도 나고, 목이도 아파요.', correct: false },
        { text: '열이도 나고, 목도 아파요.', correct: false },
      ],
      explain: '并列两个症状 → 都要加 도，且都替换主格 이/가。不能写 이도 或 이 + 도',
    },
    {
      id: 'd19-g3-f4',
      promptKo: '머리를 아파요.',
      promptZh: '"头疼"哪句正确？',
      choices: [
        { text: '머리를 아파요.', correct: false },
        { text: '머리가 아파요.', correct: true },
        { text: '머리는 아파요.', correct: false },
        { text: '머리에 아파요.', correct: false },
      ],
      explain: '아프다 是形容词（表状态）→ 主语用 이/가，不用宾格 을/를。머리 无收音 → 가',
    },
    {
      id: 'd19-g3-f5',
      promptKo: '감기를 걸렸어요.',
      promptZh: '"感冒了"哪句正确？',
      choices: [
        { text: '감기를 걸렸어요.', correct: false },
        { text: '감기에 걸렸어요.', correct: true },
        { text: '감기가 걸렸어요.', correct: false },
        { text: '감기는 걸렸어요.', correct: false },
      ],
      explain: '걸리다 用 에（不用宾格）。「감기에 걸리다」是固定搭配，"挂上感冒"的意象',
    },
  ],

  compose: [
    {
      id: 'd19-g3-c1',
      zhHint: '也发烧，嗓子也疼。',
      audioKo: '열도 나고, 목도 아파요.',
      answer: ['열도', '나고,', '목도', '아파요.'],
      tokens: ['열도', '나고,', '목도', '아파요.', '열이', '목이', '나요.', '아파요?'],
      explain: '「A도 V고, B도 V」是并列症状标准句式',
    },
    {
      id: 'd19-g3-c2',
      zhHint: '我也是学生。',
      audioKo: '저도 학생이에요.',
      answer: ['저도', '학생이에요.'],
      tokens: ['저도', '학생이에요.', '저는도', '학생예요.', '학생도'],
      explain: '저 + 도，替换了 는。学생 有收音 → 이에요',
    },
    {
      id: 'd19-g3-c3',
      zhHint: '流鼻涕。',
      audioKo: '콧물이 나요.',
      answer: ['콧물이', '나요.'],
      tokens: ['콧물이', '나요.', '콧물을', '나요?', '콧물이 있어요.'],
      explain: '나다 用 이/가。콧물 末字有收音 → 이。惯用表达"流鼻涕"',
    },
    {
      id: 'd19-g3-c4',
      zhHint: '感冒了。',
      audioKo: '감기에 걸렸어요.',
      answer: ['감기에', '걸렸어요.'],
      tokens: ['감기에', '걸렸어요.', '감기를', '감기가', '걸었어요.'],
      explain: '「感冒」用 에 + 걸리다，不是 을/를。걸렸어요 是过去时',
    },
  ],

  rule: [
    {
      id: 'd19-g3-r1',
      promptZh: '关于 N + 도 的用法，哪句最准确？',
      choices: [
        { text: '도 替换 은/는、이/가、을/를，不叠加。저는 → 저도（不是 저는도）', correct: true },
        { text: '도 是主格助词，用来引出主语', correct: false },
        { text: '도 只能用在名词后，不能接时间词', correct: false },
        { text: '도 表示"只有"的意思', correct: false },
      ],
      explain: '도 = "也"。核心是**替换**主题/主格/宾格助词，不能与它们叠加使用',
    },
    {
      id: 'd19-g3-r2',
      promptZh: '"肚子疼"哪句正确？',
      choices: [
        { text: '배를 아파요.', correct: false },
        { text: '배가 아파요.', correct: true },
        { text: '배는 아파요.', correct: false },
        { text: '배에 아파요.', correct: false },
      ],
      explain: '아프다 是形容词 → 主语用 이/가。배 无收音 → 가',
    },
    {
      id: 'd19-g3-r3',
      promptZh: '关于「감기에 걸리다」搭配，哪句最准确？',
      choices: [
        { text: '感冒用 에 + 걸리다，是固定搭配，不能用 을/를', correct: true },
        { text: '可以说 감기를 걸리다', correct: false },
        { text: '感冒用 하다：감기를 해요', correct: false },
        { text: '感冒用 있다：감기가 있어요（这样最常用）', correct: false },
      ],
      explain: '母语惯用「감기에 걸리다」。类比：열이 나다（发烧）、배가 아프다（肚子疼）也都是固定搭配',
    },
    {
      id: 'd19-g3-r4',
      promptZh: '"明天也要去医院"哪句正确？',
      choices: [
        { text: '내일은도 병원에 가야 해요.', correct: false },
        { text: '내일도 병원에 가야 해요.', correct: true },
        { text: '내일 도 병원에 가야 해요.', correct: false },
        { text: '내일이도 병원에 가야 해요.', correct: false },
      ],
      explain: '时间词后也能接 도。「내일도」= 明天也，不能加"은"',
    },
  ],
};
