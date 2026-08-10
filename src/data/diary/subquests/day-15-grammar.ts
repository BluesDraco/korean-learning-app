import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 15 · 1-3 문법 탐험 · 语法关
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：~고 싶어요（愿望）vs ~을래요/ㄹ래요（决心/意愿）
 */
export const day15Grammar: GrammarSubQuestData = {
  day: 15, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '~고 싶어요 / ~을래요 · 想做 vs 打算做',

  fix: [
    {
      id: 'd15-g3-f1',
      promptKo: '라면 그만 먹ㄹ래요.',
      promptZh: '"不再吃泡面了"最标准的写法？',
      choices: [
        { text: '라면 그만 먹ㄹ래요.', correct: false },
        { text: '라면 그만 먹을래요.', correct: true },
        { text: '라면 그만 먹래요.', correct: false },
        { text: '라면 그만 먹을레요.', correct: false },
      ],
      explain: '먹다 词干"먹"有받침 ㄱ → 을래요。「먹ㄹ래요」是错拼；「먹래요」漏了 을；「먹을레요」래→레 错字',
    },
    {
      id: 'd15-g3-f2',
      promptKo: '같이 가을래요?',
      promptZh: '"一起去吗？"最标准的说法？',
      choices: [
        { text: '같이 가을래요?', correct: false },
        { text: '같이 갈래요?', correct: true },
        { text: '같이 가ㄹ래요?', correct: false },
        { text: '같이 가는래요?', correct: false },
      ],
      explain: '가다 词干"가"无받침 → ㄹ래요 直接接 → 갈래요。有받침才用 을래요',
    },
    {
      id: 'd15-g3-f3',
      promptKo: '예쁘고 싶어요.',
      promptZh: '"想变漂亮"最标准的说法？',
      choices: [
        { text: '예쁘고 싶어요.', correct: false },
        { text: '예뻐지고 싶어요.', correct: true },
        { text: '예쁠래요.', correct: false },
        { text: '예쁨을 싶어요.', correct: false },
      ],
      explain: '~고 싶어요 只能接**动词**，不能接形容词。要说"想变~"用「형용사 + 아/어지다 + 고 싶어요」→ 예쁘다 → 예뻐지다 → 예뻐지고 싶어요',
    },
    {
      id: 'd15-g3-f4',
      promptKo: '토리가 요리 배우고 싶어요.',
      promptZh: '第三人称"兔莉想学做菜"最自然的说法？',
      choices: [
        { text: '토리가 요리 배우고 싶어요.', correct: false },
        { text: '토리가 요리 배우고 싶어해요.', correct: true },
        { text: '토리가 요리 배울래요.', correct: false },
        { text: '토리가 요리 배웠어요.', correct: false },
      ],
      explain: '고 싶어요 只用于第一人称和第二人称疑问。第三人称必须加 하다 → 고 싶어해요',
    },
    {
      id: 'd15-g3-f5',
      promptKo: '뭐 먹고 싶어요?',
      promptZh: '朋友之间问"你想吃什么？"最自然的说法？',
      choices: [
        { text: '뭐 먹고 싶어요?', correct: false },
        { text: '뭐 먹을래?', correct: true },
        { text: '뭐 먹을래요?', correct: false },
        { text: '뭐 먹었어요?', correct: false },
      ],
      explain: '朋友间用 반말——「뭐 먹을래?」= 你想吃什么？「먹고 싶어요?」是해요体（对陌生人/长辈），「먹을래요?」是해요体（对陌生人）。반말时去 요',
    },
  ],

  compose: [
    {
      id: 'd15-g3-c1',
      zhHint: '想学做菜。',
      audioKo: '요리 배우고 싶어요.',
      answer: ['요리', '배우고', '싶어요.'],
      tokens: ['요리', '배우고', '싶어요.', '배워요.', '배울래요.', '가르치고'],
      explain: '배우다(学) + 고 싶어요 = 想学。宾语 요리 后省略 를 是口语',
    },
    {
      id: 'd15-g3-c2',
      zhHint: '不再吃泡面了。',
      audioKo: '라면 그만 먹을래요.',
      answer: ['라면', '그만', '먹을래요.'],
      tokens: ['라면', '그만', '먹을래요.', '먹고', '싶어요.', '더', '먹었어요.'],
      explain: '「그만 + V을래요」= 不再做~。먹다(有받침) → 먹을래요',
    },
    {
      id: 'd15-g3-c3',
      zhHint: '一起做菜吗？（邀请）',
      audioKo: '같이 요리할래요?',
      answer: ['같이', '요리할래요?'],
      tokens: ['같이', '요리할래요?', '요리해요?', '요리하고', '싶어요?', '먹을래요?'],
      explain: '요리하다(无받침) + ㄹ래요 = 할래요。「같이 ~할래요?」= 一起做~吗？',
    },
    {
      id: 'd15-g3-c4',
      zhHint: 'Haru，教我做菜吧。（반말·请求朋友）',
      audioKo: '하루야, 요리 가르쳐 줘.',
      answer: ['하루야,', '요리', '가르쳐', '줘.'],
      tokens: ['하루야,', '요리', '가르쳐', '줘.', '가르쳐요.', '주세요.', '배워'],
      explain: '가르치다 + 어 줘(반말请求) = 教我。「~아/어 줘」是반말的「~아/어 주세요」',
    },
  ],

  rule: [
    {
      id: 'd15-g3-r1',
      promptZh: '关于 ~고 싶어요 vs ~을래요，哪句最准确？',
      choices: [
        { text: '고 싶어요 = 内心愿望（想~，可能不行动）；을래요 = 当下决定/意愿（我要~，马上行动）', correct: true },
        { text: '两者完全一样，可以互换', correct: false },
        { text: '고 싶어요 用于书面，을래요 用于口语', correct: false },
        { text: '고 싶어요 是过去时，을래요 是将来时', correct: false },
      ],
      explain: '고 싶어요 偏情感表达；을래요 偏具体决定/邀请。「집에 가고 싶어요」= 想回家(内心)；「집에 갈래」= 我要回家了(动作)',
    },
    {
      id: 'd15-g3-r2',
      promptZh: '关于 ~을래요/ㄹ래요 的收音判断，哪句最准确？',
      choices: [
        { text: '词干有받침 → 을래요（먹→먹을래요）；词干无받침 → ㄹ래요（가→갈래요）', correct: true },
        { text: '所有词都用 을래요', correct: false },
        { text: '按词长判断——长词用 을래요，短词用 ㄹ래요', correct: false },
        { text: '按元音判断——ㅏㅗ 用 을래요，其他用 ㄹ래요', correct: false },
      ],
      explain: '看词干最后一个字有没有받침。有 → 을래요；无 → ㄹ래요。跟 을/를、은/는 一样的规则',
    },
    {
      id: 'd15-g3-r3',
      promptZh: '关于「~고 싶어요 接形容词」哪句最准确？',
      choices: [
        { text: '고 싶어요 只能接动词。想变漂亮要用「예뻐지고 싶어요」（形容词 + 아/어지다 → 动词化）', correct: true },
        { text: '고 싶어요 可以直接接形容词——예쁘고 싶어요 ✓', correct: false },
        { text: '形容词不能表达愿望', correct: false },
        { text: '形容词加 을래요 就行', correct: false },
      ],
      explain: '「예쁘다」是형용사。要表达"想变~"必须先动词化 → 아/어지다。예쁘 + 어지다 → 예뻐지다 → 예뻐지고 싶어요',
    },
    {
      id: 'd15-g3-r4',
      promptZh: '"你想吃什么？"最自然的说法？',
      choices: [
        { text: '뭐 먹을래요?（提议，最自然）', correct: true },
        { text: '뭐 먹고 싶어요?（问对方内心愿望，稍正式）', correct: false },
        { text: '뭐 먹었어요?（问过去时态）', correct: false },
        { text: '뭐 먹었어?（问过去반말）', correct: false },
      ],
      explain: '「먹을래요?」= 提议/邀请（约饭必备）；「먹고 싶어요?」= 问内心愿望（较正式）。朋友间常用「먹을래?」（去 요·반말）',
    },
  ],
};
