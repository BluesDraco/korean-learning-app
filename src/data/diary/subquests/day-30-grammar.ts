import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 30 · 1-3 문법 탐험 · 语法关 · 毕业总复习
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：~지만 转折 + N 동안 + ㄹ 词干 살다 变位 + 30天所学复习
 */
export const day30Grammar: GrammarSubQuestData = {
  day: 30, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '毕业总复习 · 지만 / 동안 / 살게요',

  fix: [
    {
      id: 'd30-g3-f1',
      promptKo: '실수도 많고 행복했어요.',
      promptZh: '"虽然失误多但很幸福"哪句正确？',
      choices: [
        { text: '실수도 많고 행복했어요.', correct: false },
        { text: '실수도 많았지만 행복했어요.', correct: true },
        { text: '실수도 많았어서 행복했어요.', correct: false },
        { text: '실수도 많으면 행복했어요.', correct: false },
      ],
      explain: '~고 是并列，不是转折。~지만 才是"但是"。~서 是原因',
    },
    {
      id: 'd30-g3-f2',
      promptKo: '30일 전에 행복했어요.',
      promptZh: '"30 天里很幸福"哪句正确？',
      choices: [
        { text: '30일 전에 행복했어요.', correct: false },
        { text: '30일 동안 행복했어요.', correct: true },
        { text: '30일 후에 행복했어요.', correct: false },
        { text: '30일 까지 행복했어요.', correct: false },
      ],
      explain: 'N 동안 = N 期间。전에 = 之前；후에 = 之后',
    },
    {
      id: 'd30-g3-f3',
      promptKo: '앞으로도 잘 사을게요.',
      promptZh: '"今后也会好好生活"哪句正确？',
      choices: [
        { text: '앞으로도 잘 사을게요.', correct: false },
        { text: '앞으로도 잘 살게요.', correct: true },
        { text: '앞으로도 잘 살아요.', correct: false },
        { text: '앞으로도 잘 살겠어요.', correct: false },
      ],
      explain: '살다 ㄹ词干 + ㄹ게요 → 살게요（词干本身有 ㄹ，不再插 ㄹ）',
    },
    {
      id: 'd30-g3-f4',
      promptKo: '집이 무거워요.',
      promptZh: '"行李好重"哪句正确？',
      choices: [
        { text: '집이 무거워요.', correct: false },
        { text: '짐이 무거워요.', correct: true },
        { text: '짐이 무겁어요.', correct: false },
        { text: '짐가 무거워요.', correct: false },
      ],
      explain: '짐 = 行李 / 집 = 家。差一字母。무겁다 ㅂ 不规则 → 무거워요',
    },
    {
      id: 'd30-g3-f5',
      promptKo: '30일 전에 한국에 가요.',
      promptZh: '"30 天前来到韩国"哪句正确？',
      choices: [
        { text: '30일 전에 한국에 가요.', correct: false },
        { text: '30일 전에 한국에 왔어요.', correct: true },
        { text: '30일 전에 한국에 갈 거예요.', correct: false },
        { text: '30일 후에 한국에 왔어요.', correct: false },
      ],
      explain: '"전에"（之前）+ 过去时 · 逻辑一致 · "왔어요" = 来了',
    },
  ],

  compose: [
    {
      id: 'd30-g3-c1',
      zhHint: '30 天犯过很多错，但真的很幸福。',
      audioKo: '30일 동안 실수도 많았지만, 정말 행복했어요.',
      answer: ['30일', '동안', '실수도', '많았지만,', '정말', '행복했어요.'],
      tokens: ['30일', '동안', '실수도', '많았지만,', '정말', '행복했어요.', '전에', '힘들었어요.', '많고'],
      explain: '동안（期间）+ 많았지만（过去+转折）+ 정말 + 행복했어요',
    },
    {
      id: 'd30-g3-c2',
      zhHint: '今后也会好好生活。',
      audioKo: '앞으로도 잘 살게요.',
      answer: ['앞으로도', '잘', '살게요.'],
      tokens: ['앞으로도', '잘', '살게요.', '살아요.', '사을게요.', '살겠어요.', '살고 있어요.'],
      explain: 'ㄹ 词干 + ㄹ게요 · 「앞으로도」道别承诺句',
    },
    {
      id: 'd30-g3-c3',
      zhHint: '30 天前来到韩国。',
      audioKo: '30일 전에 한국에 왔어요.',
      answer: ['30일', '전에', '한국에', '왔어요.'],
      tokens: ['30일', '전에', '한국에', '왔어요.', '동안', '후에', '가요.', '갈게요.'],
      explain: '전에 + 과거시제 · 叙述起点',
    },
    {
      id: 'd30-g3-c4',
      zhHint: '老师、朋友们真的感谢。',
      audioKo: '선생님, 친구들 진짜 감사합니다.',
      answer: ['선생님,', '친구들', '진짜', '감사합니다.'],
      tokens: ['선생님,', '친구들', '진짜', '감사합니다.', '고마워.', '반가워요.', '없어요.'],
      explain: '합쇼체 감사합니다 · 毕业致谢标准句',
    },
  ],

  rule: [
    {
      id: 'd30-g3-r1',
      promptZh: '关于「V/A + 지만」的用法，哪句最准确？',
      choices: [
        { text: '~지만 = 但是（转折连接）。直接接词干，前后主语可相同', correct: true },
        { text: '~지만 是并列连接', correct: false },
        { text: '~지만 表示原因', correct: false },
        { text: '~지만 只用书面语', correct: false },
      ],
      explain: '실수도 많았지만 행복했어요（虽然失误多但幸福）· 主语都是"我"',
    },
    {
      id: 'd30-g3-r2',
      promptZh: '关于「N 동안 / 전에 / 후에」，哪句最准确？',
      choices: [
        { text: '동안 = 期间；전에 = 之前；후에 = 之后 · 三个都是时间表达', correct: true },
        { text: '三个意思都一样', correct: false },
        { text: '동안 = 一次', correct: false },
        { text: '전에 = 现在', correct: false },
      ],
      explain: '30일 동안（30天里）/ 30일 전에（30天前）/ 30일 후에（30天后）',
    },
    {
      id: 'd30-g3-r3',
      promptZh: '关于 살다 → 살게요 的变位，哪句最准确？',
      choices: [
        { text: 'ㄹ 词干 + ㄹ게요 → 살게요（词干本身有 ㄹ，不再重复插 ㄹ）', correct: true },
        { text: '살+을게요 → 살을게요', correct: false },
        { text: '살→사+ㄹ게요 → 사을게요', correct: false },
        { text: 'ㄹ 词干过去 → 살게요', correct: false },
      ],
      explain: '만들다 → 만들게요 / 살다 → 살게요 · ㄹ 词干都直接 + 게요',
    },
    {
      id: 'd30-g3-r4',
      promptZh: '关于 짐 vs 집 的辨析，哪句最准确？',
      choices: [
        { text: '짐 = 行李，收音 ㅁ；집 = 家，收音 ㅂ。초성都是 ㅈ，差别只在最后一个收音字母', correct: true },
        { text: '两个词一样', correct: false },
        { text: '짐 = 家', correct: false },
        { text: '집 = 行李', correct: false },
      ],
      explain: 'Day 3 Tori 说错「집이 무거워요」= 家好重。正确的是「짐이 무거워요」= 行李好重',
    },
  ],
};
