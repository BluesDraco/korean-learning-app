import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 29 · 1-3 문법 탐험 · 语法관
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：过去时 ~았/었어요 三规则 + ㅂ 不规则过去 + 缩合
 */
export const day29Grammar: GrammarSubQuestData = {
  day: 29, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '过去时三规则 + 缩合 + 不规则识别',

  fix: [
    {
      id: 'd29-g3-f1',
      promptKo: '어제 학교에 가았어요.',
      promptZh: '"昨天去学校了"哪句正确？',
      choices: [
        { text: '어제 학교에 가았어요.', correct: false },
        { text: '어제 학교에 갔어요.', correct: true },
        { text: '어제 학교에 가았아요.', correct: false },
        { text: '어제 학교에 가어요.', correct: false },
      ],
      explain: '가+았 缩合为 갔（ㅏ+ㅏ=ㅏㅆ）· 缩合是必须的',
    },
    {
      id: 'd29-g3-f2',
      promptKo: '한국어 공부하았어요.',
      promptZh: '"学了韩语"哪句正确？',
      choices: [
        { text: '한국어 공부하았어요.', correct: false },
        { text: '한국어 공부했어요.', correct: true },
        { text: '한국어 공부하었어요.', correct: false },
        { text: '한국어 공부하여요.', correct: false },
      ],
      explain: '하다 → 했어요（하+였 缩合）· 하다类无条件规则',
    },
    {
      id: 'd29-g3-f3',
      promptKo: '음악 듣었어요.',
      promptZh: '"听了音乐"哪句正确？',
      choices: [
        { text: '음악 듣었어요.', correct: false },
        { text: '음악 들었어요.', correct: true },
        { text: '음악 듣았어요.', correct: false },
        { text: '음악 들았어요.', correct: false },
      ],
      explain: '듣다 ㄷ 不规则：ㄷ 在元音前变 ㄹ → 들 + 었어요',
    },
    {
      id: 'd29-g3-f4',
      promptKo: '정말 즐겁었어요.',
      promptZh: '"真的很开心（过去）"哪句正确？',
      choices: [
        { text: '정말 즐겁었어요.', correct: false },
        { text: '정말 즐거웠어요.', correct: true },
        { text: '정말 즐겁았어요.', correct: false },
        { text: '정말 즐거웠아요.', correct: false },
      ],
      explain: 'ㅂ 不规则：ㅂ→우 + 었 = 우었 缩合 = 웠',
    },
    {
      id: 'd29-g3-f5',
      promptKo: '내일 학교에 갔어요.',
      promptZh: '"明天要去学校"哪句最合适？',
      choices: [
        { text: '내일 학교에 갔어요.', correct: false },
        { text: '내일 학교에 가요.', correct: true },
        { text: '내일 학교에 갈게요.', correct: false },
        { text: '내일 학교에 왔어요.', correct: false },
      ],
      explain: '"明天"= 未来 → 用现在时或将来时。「내일 + 过去时」是矛盾',
    },
  ],

  compose: [
    {
      id: 'd29-g3-c1',
      zhHint: '昨天下雨了。',
      audioKo: '어제 비가 왔어요.',
      answer: ['어제', '비가', '왔어요.'],
      tokens: ['어제', '비가', '왔어요.', '내일', '오았어요.', '와요.', '올게요.'],
      explain: '오다 → 왔어요 + 어제 = 过去 · 天气日记标准句',
    },
    {
      id: 'd29-g3-c2',
      zhHint: '真的很开心。',
      audioKo: '정말 즐거웠어요.',
      answer: ['정말', '즐거웠어요.'],
      tokens: ['정말', '즐거웠어요.', '즐겁었어요.', '즐거워요.', '진짜', '기뻐요.'],
      explain: 'ㅂ 不规则过去 · 回顾情感必用',
    },
    {
      id: 'd29-g3-c3',
      zhHint: '学了韩语。',
      audioKo: '한국어 공부했어요.',
      answer: ['한국어', '공부했어요.'],
      tokens: ['한국어', '공부했어요.', '공부하았어요.', '공부해요.', '해요.', '있어요.'],
      explain: '하다 → 했어요（无条件）',
    },
    {
      id: 'd29-g3-c4',
      zhHint: '我鼓起了勇气。',
      audioKo: '저는 용기를 냈어요.',
      answer: ['저는', '용기를', '냈어요.'],
      tokens: ['저는', '용기를', '냈어요.', '내요.', '낼게요.', '있어요.', '없어요.'],
      explain: '내다 → 냈어요（내+었→缩合 ㅐ+ㅓ=ㅐ+ㅆ）· 日记最后一句的分量',
    },
  ],

  rule: [
    {
      id: 'd29-g3-r1',
      promptZh: '关于过去时三规则，哪句最准确？',
      choices: [
        { text: '词干末元音 ㅏ/ㅗ → 았어요；其他 → 었어요；하다 → 했어요', correct: true },
        { text: '统一都接 ㅆ어요', correct: false },
        { text: '有收音接 었어요，无收音接 요', correct: false },
        { text: '现在时加 ㅆ 就是过去', correct: false },
      ],
      explain: '和 해요体 아/어 规则完全对应 · 尾巴换成 ㅆ어요',
    },
    {
      id: 'd29-g3-r2',
      promptZh: '关于 하다 类过去时，哪句最准确？',
      choices: [
        { text: '하다 → 했어요（하+였 缩合）· 所有 하다 类无条件', correct: true },
        { text: '하다 → 하았어요（按 ㅏ 规则）', correct: false },
        { text: '하다 → 하었어요（按 어 规则）', correct: false },
        { text: '하다 → 했다요', correct: false },
      ],
      explain: '공부했어요 / 운동했어요 / 사랑했어요 全部同规则',
    },
    {
      id: 'd29-g3-r3',
      promptZh: '关于 ㅂ 不规则过去时，哪句最准确？',
      choices: [
        { text: 'ㅂ→우 + 었어요 缩合。즐겁+었 → 즐거우었 → 즐거웠어요', correct: true },
        { text: 'ㅂ 消失。즐거었어요', correct: false },
        { text: 'ㅂ 保持。즐겁었어요', correct: false },
        { text: 'ㅂ → ㅁ。즐검었어요', correct: false },
      ],
      explain: '춥다 → 추웠어요；부끄럽다 → 부끄러웠어요 都同规则',
    },
    {
      id: 'd29-g3-r4',
      promptZh: '关于过去时的时间词搭配，哪句最准确？',
      choices: [
        { text: '어제/작년/전에 + 过去时 → 逻辑一致。내일 + 过去时 是错的', correct: true },
        { text: '任何时间词都能配过去时', correct: false },
        { text: '내일 + 过去时 = 已经安排好', correct: false },
        { text: '过去时不能搭时间词', correct: false },
      ],
      explain: '时间词决定时态。「내일 갔어요」= 矛盾（明天+去了）· 母语者绝不这么说',
    },
  ],
};
