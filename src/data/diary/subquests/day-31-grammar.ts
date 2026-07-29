import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 31 · 2-3 문법 탐험 · 语法关 · ~네요 感叹
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：V/A 词干 + 네요 · N + (이)네요 · ㄹ 词干脱落 · ~네요 vs ~아/어요 差别
 */
export const day31Grammar: GrammarSubQuestData = {
  day: 1, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '感叹的 ~네요 · 有无收音 · ㄹ 脱落',

  fix: [
    {
      id: 'd31-g3-f1',
      promptKo: '학생네요!',
      promptZh: '"(她) 是学生啊！"哪句正确？',
      choices: [
        { text: '학생네요!', correct: false },
        { text: '학생이네요!', correct: true },
        { text: '학생예네요!', correct: false },
        { text: '학생이예요네!', correct: false },
      ],
      explain: '학생 有收音 ㅇ → 名词 + **이네요**（有收音一定要加 이）',
    },
    {
      id: 'd31-g3-f2',
      promptKo: '유창하다요!',
      promptZh: '"真流利呢！"哪句正确？',
      choices: [
        { text: '유창하다요!', correct: false },
        { text: '유창하네요!', correct: true },
        { text: '유창해네요!', correct: false },
        { text: '유창합니다네요!', correct: false },
      ],
      explain: 'V/A 词干 + 네요，不是 다 + 요；也不能和 습니다 混用',
    },
    {
      id: 'd31-g3-f3',
      promptKo: '다니엘씨, 서울에 살네요.',
      promptZh: '"Danielle 原来住在首尔啊。"哪句正确？',
      choices: [
        { text: '다니엘씨, 서울에 살네요.', correct: false },
        { text: '다니엘씨, 서울에 사네요.', correct: true },
        { text: '다니엘씨, 서울에 살아네요.', correct: false },
        { text: '다니엘씨, 서울에 살으네요.', correct: false },
      ],
      explain: '살다 ㄹ 词干 · ~네 前 ㄹ 脱落 → **사네요**（ㄹ 见 ㄴ 就掉）',
    },
    {
      id: 'd31-g3-f4',
      promptKo: '실력이 대단해네요!',
      promptZh: '"水平真了不起呢！"哪句正确？',
      choices: [
        { text: '실력이 대단해네요!', correct: false },
        { text: '실력이 대단하네요!', correct: true },
        { text: '실력이 대단합니네요!', correct: false },
        { text: '실력이 대단하다요!', correct: false },
      ],
      explain: '~네요 直接接**词干**（대단하-），不是 해요体 或 습니다体',
    },
    {
      id: 'd31-g3-f5',
      promptKo: '(1 + 1 = 2 을 보고) 정답이 2네요!',
      promptZh: '看到"1 + 1 = 2"这种已知事实，用 ~네요 合适吗？下列哪句用法最贴切？',
      choices: [
        { text: '이미 아는 사실은 ~네요를 쓰지 않고 ~예요/이에요를 씁니다.', correct: true },
        { text: '~네요는 언제나 써도 됩니다.', correct: false },
        { text: '~네요는 과거 사실에만 씁니다.', correct: false },
        { text: '~네요는 부정문에서만 씁니다.', correct: false },
      ],
      explain: '~네요 = 说话人**当下发现 / 感受**（新信息）。已知的事用 ~아/어요 就够',
    },
  ],

  compose: [
    {
      id: 'd31-g3-c1',
      zhHint: '发音真流利呢！',
      audioKo: '발음이 진짜 유창하네요!',
      answer: ['발음이', '진짜', '유창하네요!'],
      tokens: ['발음이', '진짜', '유창하네요!', '유창해요.', '유창합니다.', '유창하다요!'],
      explain: 'V/A 词干 + 네요 · Junho 悄悄话的原句',
    },
    {
      id: 'd31-g3-c2',
      zhHint: '(她) 是学生啊！',
      audioKo: '학생이네요!',
      answer: ['학생이네요!'],
      tokens: ['학생이네요!', '학생네요!', '학생이예요네!', '학생이에요!'],
      explain: '학생 有收音 ㅇ → **이네요**',
    },
    {
      id: 'd31-g3-c3',
      zhHint: 'Danielle 原来住在首尔啊。',
      audioKo: '다니엘씨는 서울에 사네요.',
      answer: ['다니엘씨는', '서울에', '사네요.'],
      tokens: ['다니엘씨는', '서울에', '사네요.', '살네요.', '살아요.', '살으네요.'],
      explain: '살다 ㄹ 词干 + ~네요 → ㄹ 脱落 → **사네요**',
    },
    {
      id: 'd31-g3-c4',
      zhHint: '实力真了不起呢！',
      audioKo: '실력이 정말 대단하네요!',
      answer: ['실력이', '정말', '대단하네요!'],
      tokens: ['실력이', '정말', '대단하네요!', '대단해네요!', '대단해요.', '대단합니다.'],
      explain: '실력 + 이（有收音 ㄱ → 이）· 대단하 + 네요',
    },
  ],

  rule: [
    {
      id: 'd31-g3-r1',
      promptZh: '关于「V/A + ~네요」的用法，哪句最准确？',
      choices: [
        { text: '~네요 = 说话人当下发现 / 感受（新信息）。直接接词干', correct: true },
        { text: '~네요 只用于书面语', correct: false },
        { text: '~네요 是否定形', correct: false },
        { text: '~네요 表示未来意志', correct: false },
      ],
      explain: '유창하네요 = 现场"哇！(才发现) 真流利啊" · 不是普通陈述',
    },
    {
      id: 'd31-g3-r2',
      promptZh: '关于名词后接 ~네요 的规则，哪句最准确？',
      choices: [
        { text: '有收音 → **이네요**（학생이네요）；无收音 → **네요**（토리네요）', correct: true },
        { text: '所有名词一律 + 네요，无论收音', correct: false },
        { text: '所有名词一律 + 이네요，无论收音', correct: false },
        { text: '有收音 → 네요；无收音 → 이네요', correct: false },
      ],
      explain: '与 ~예요/이에요 判定规则完全一致（有收音加 이）',
    },
    {
      id: 'd31-g3-r3',
      promptZh: '关于 살다 → 사네요 的变化，哪句最准确？',
      choices: [
        { text: 'ㄹ 词干 + ~네요 时 ㄹ 脱落 → **사네요**', correct: true },
        { text: 'ㄹ 词干 + ~네요 时 ㄹ 保留 → 살네요', correct: false },
        { text: '살다 → 살아네요', correct: false },
        { text: '살다 → 살으네요', correct: false },
      ],
      explain: 'ㄹ 见 ㄴ 就掉。알다 → 아네요, 만들다 → 만드네요 同理',
    },
    {
      id: 'd31-g3-r4',
      promptZh: '关于「~네요 vs ~아/어요」的差别，哪句最准确？',
      choices: [
        { text: '~네요 = 现场感受 / 新信息；~아/어요 = 普通陈述 / 已知事实', correct: true },
        { text: '两者完全一样，可任意互换', correct: false },
        { text: '~네요 敬语等级更高', correct: false },
        { text: '~아/어요 只用于书面语', correct: false },
      ],
      explain: '第一次见面夸 "한국어 잘하시네요"（发现感）比 "한국어 잘해요"（陈述）自然得多',
    },
  ],
};
