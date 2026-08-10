import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 20 · 1-3 문법 탐험 · 语法关
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：N에 뭐가 들어 있어요? / N만 들어 있어요 / N은/는 따로예요
 */
export const day20Grammar: GrammarSubQuestData = {
  day: 20, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握「N 里包含什么/只包含 X/Y 另算」三件套', subtitleEn: 'Master the trio: what\'s included in N / only X included / Y billed separately',

  fix: [
    {
      id: 'd20-g3-f1',
      promptKo: '관리비 뭐가 들어 있어요?',
      promptZh: '"管理费包含什么？"哪句正确？', promptZhEn: 'Which sentence is correct for "What does the management fee include?"',
      choices: [
        { text: '관리비 뭐가 들어 있어요?', correct: false },
        { text: '관리비에 뭐가 들어 있어요?', correct: true },
        { text: '관리비가 뭐 들어 있어요?', correct: false },
        { text: '관리비는 뭐가 들어 갔어요?', correct: false },
      ],
      explain: '「N에」中的 에 不能省。에 = 在里面。들어 있어요 表状态"包含着"', explainEn: 'The 에 in 「N에」 can\'t be omitted. 에 = inside. 들어 있어요 expresses the state of \'containing\'',
    },
    {
      id: 'd20-g3-f2',
      promptKo: '관리비에 뭐를 들어 있어요?',
      promptZh: '哪句正确？', promptZhEn: 'Which sentence is correct?',
      choices: [
        { text: '관리비에 뭐를 들어 있어요?', correct: false },
        { text: '관리비에 뭐가 들어 있어요?', correct: true },
        { text: '관리비에 뭐는 들어 있어요?', correct: false },
        { text: '관리비에 뭐도 들어 있어요?', correct: false },
      ],
      explain: '들어 있다 是自动词 → 前面用主格 이/가，不用宾格 을/를', explainEn: '들어 있다 is intransitive → use subject particle 이/가, not object particle 을/를',
    },
    {
      id: 'd20-g3-f3',
      promptKo: '전기세가 따로예요.',
      promptZh: '"电费另算"最自然的说法？', promptZhEn: 'What\'s the most natural way to say \'electricity is billed separately\'?',
      choices: [
        { text: '전기세가 따로예요.', correct: false },
        { text: '전기세는 따로예요.', correct: true },
        { text: '전기세를 따로예요.', correct: false },
        { text: '전기세에 따로예요.', correct: false },
      ],
      explain: '陈述"某项另算"用主题助词 은/는 更自然。전기세 末字"세"无收音 → 는', explainEn: 'Using topic particle 은/는 is more natural for \'billed separately.\' 전기세 ends in \'세\' (no final consonant) → 는',
    },
    {
      id: 'd20-g3-f4',
      promptKo: '인터넷은 들어 있어요.',
      promptZh: '"只包含网费"哪句正确？', promptZhEn: 'Which sentence is correct for "Only internet is included"?',
      choices: [
        { text: '인터넷은 들어 있어요.', correct: false },
        { text: '인터넷만 들어 있어요.', correct: true },
        { text: '인터넷이 들어 있어요.', correct: false },
        { text: '인터넷도 들어 있어요.', correct: false },
      ],
      explain: '「만」= 只。要表达"只包含"必须用 만，是 만 才有限定含义', explainEn: '「만」= only. To say \'includes only,\' you must use 만—it\'s what adds the restrictive meaning',
    },
    {
      id: 'd20-g3-f5',
      promptKo: '수도세가 청소비만 들어 있어요.',
      promptZh: '"只包含水费和清洁费"哪句正确？', promptZhEn: 'Which sentence correctly says \'includes only water and cleaning fees\'?',
      choices: [
        { text: '수도세가 청소비만 들어 있어요.', correct: false },
        { text: '수도세랑 청소비만 들어 있어요.', correct: true },
        { text: '수도세는 청소비도 들어 있어요.', correct: false },
        { text: '수도세만 청소비만 들어 있어요.', correct: false },
      ],
      explain: '并列两项用 「A랑 B」（口语）或「A와 B」（书面）。만 加在最后一项 → 「A랑 B만」', explainEn: 'To list two items, use 「A랑 B」 (spoken) or 「A와 B」 (written). Add 만 to the last item → 「A랑 B만」',
    },
  ],

  compose: [
    {
      id: 'd20-g3-c1',
      zhHint: '管理费包含什么？', zhHintEn: 'What does the maintenance fee include?',
      audioKo: '관리비에 뭐가 들어 있어요?',
      answer: ['관리비에', '뭐가', '들어', '있어요?'],
      tokens: ['관리비에', '뭐가', '들어', '있어요?', '관리비', '뭐를', '있어요.', '얼마예요?'],
      explain: 'N에 + 뭐가 + 들어 있어요? 是租房必问句', explainEn: 'N에 + 뭐가 + 들어 있어요? is a must-ask question when renting',
    },
    {
      id: 'd20-g3-c2',
      zhHint: '包里装着什么？', zhHintEn: 'What\'s in the bag?',
      audioKo: '가방에 뭐가 들어 있어요?',
      answer: ['가방에', '뭐가', '들어', '있어요?'],
      tokens: ['가방에', '뭐가', '들어', '있어요?', '가방', '뭐를', '가방이', '들어 갔어요?'],
      explain: '同样句式，换个 N 就行。租房/过海关/点套餐都能问', explainEn: 'Same pattern, just swap N. Works for renting, customs, ordering set meals',
    },
    {
      id: 'd20-g3-c3',
      zhHint: '电费另算。', zhHintEn: 'Electricity is extra.',
      audioKo: '전기세는 따로예요.',
      answer: ['전기세는', '따로예요.'],
      tokens: ['전기세는', '따로예요.', '전기세가', '전기세도', '따로 있어요.', '아니에요.'],
      explain: '「N은/는 따로예요」是租房时房东最常说的结构', explainEn: '「N은/는 따로예요」 is the structure landlords use most when renting',
    },
    {
      id: 'd20-g3-c4',
      zhHint: '只包含水费。', zhHintEn: 'Only includes the water bill.',
      audioKo: '수도세만 들어 있어요.',
      answer: ['수도세만', '들어', '있어요.'],
      tokens: ['수도세만', '들어', '있어요.', '수도세는', '수도세가', '있어요?', '들어 갔어요.'],
      explain: '「만」= 只。放在名词后限定"只有这一项"', explainEn: '「만」= only. Placed after a noun to limit it to \'just this one item\'',
    },
  ],

  rule: [
    {
      id: 'd20-g3-r1',
      promptZh: '关于「N에 뭐가 들어 있어요?」，哪句最准确？', promptZhEn: 'Which statement about 「N에 뭐가 들어 있어요?」 is most accurate?',
      choices: [
        { text: 'N에 表示"在里面"，뭐가 是主格，들어 있어요 是"包含/装着"的持续状态', textEn: 'N에 means \'inside,\' 뭐가 is the subject, 들어 있어요 is the ongoing state of \'containing/holding\'', correct: true },
        { text: 'N에 是宾格，뭐가 是主语', textEn: 'N에 is the object, 뭐가 is the subject', correct: false },
        { text: '들어 있어요 是"进入"的动作', textEn: '들어 있어요 is the action of \'entering\'', correct: false },
        { text: '뭐가 可以换成 뭐를，意思一样', textEn: '뭐가 can be swapped for 뭐를 with the same meaning', correct: false },
      ],
      explain: 'V + 어 있다 = 持续状态。「들어 있다」= 已进入并保持 = 包含着/装着', explainEn: 'V + 어 있다 = ongoing state. 「들어 있다」= entered and remains = contains/holds',
    },
    {
      id: 'd20-g3-r2',
      promptZh: '关于「들어 있다」和「들다」的区别，哪句最准确？', promptZhEn: 'Which statement about the difference between 「들어 있다」 and 「들다」 is most accurate?',
      choices: [
        { text: '들어 있다 = 包含着（状态）；들다 有"进入/花费/举起"等多重含义', textEn: '들어 있다 = contains (state); 들다 has multiple meanings like "enter/spend/raise"', correct: true },
        { text: '两者完全一样', textEn: 'The two are exactly the same', correct: false },
        { text: '들다 是敬语', textEn: '들다 is honorific', correct: false },
        { text: '들어 있다 只用书面', textEn: '들어 있다 is only used in writing', correct: false },
      ],
      explain: '들어 있다 是「들다 + 어 있다」持续状态。"돈이 들다"= 花钱、"손 들다"= 举手 — 都是들다', explainEn: '들어 있다 is a continuous state of "들다 + 어 있다". "돈이 들다" = spend money, "손 들다" = raise hand — both use 들다',
    },
    {
      id: 'd20-g3-r3',
      promptZh: '关于「만」的用法，哪句最准确？', promptZhEn: 'Which sentence about the usage of "만" is most accurate?',
      choices: [
        { text: '「만」= 只，紧跟名词后，表示限定范围', textEn: '"만" = only, follows nouns to limit the scope', correct: true },
        { text: '「만」= 也，跟도意思一样', textEn: '"만" = also, same as 도', correct: false },
        { text: '「만」= 都，跟다意思一样', textEn: '"만" = all, same as 다', correct: false },
        { text: '「만」是数量词', textEn: '"만" is a quantifier', correct: false },
      ],
      explain: '「만」和 「도」相反：만 = 只（限定），도 = 也（增加）', explainEn: '"만" and "도" are opposites: 만 = only (limiting), 도 = also (adding)',
    },
    {
      id: 'd20-g3-r4',
      promptZh: '关于「따로」的用法，哪句最准确？', promptZhEn: 'Which sentence about the usage of "따로" is most accurate?',
      choices: [
        { text: '따로 = 另外/单独。租房时表示"不包含在里面，另算"', textEn: '따로 = separately/alone. In renting, it means "not included, charged separately"', correct: true },
        { text: '따로 = 一起', textEn: '따로 = together', correct: false },
        { text: '따로 = 免费', textEn: '따로 = free', correct: false },
        { text: '따로 只能修饰动词', textEn: '따로 can only modify verbs', correct: false },
      ],
      explain: '「전기세는 따로예요」= 电费另算。租房/结账/分份都用', explainEn: '"전기세는 따로예요" = electricity is separate. Used in renting/billing/splitting',
    },
  ],
};
