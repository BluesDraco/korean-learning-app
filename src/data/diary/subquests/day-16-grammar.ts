import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 16 · 1-3 문법 탐험 · 语法关
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：~고 있어요（进行时）+ 与 ~고 싶어요、~아/어요 的对比
 */
export const day16Grammar: GrammarSubQuestData = {
  day: 16, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '~고 있어요 · 正在做的进行时',

  fix: [
    {
      id: 'd16-g3-f1',
      promptKo: '학교 근처 원룸을 찾아 있어요.',
      promptZh: '"正在找学校附近的一居室"最标准的写法？',
      choices: [
        { text: '학교 근처 원룸을 찾아 있어요.', correct: false },
        { text: '학교 근처 원룸을 찾고 있어요.', correct: true },
        { text: '학교 근처 원룸이 찾고 있어요.', correct: false },
        { text: '학교 근처 원룸을 찾은 있어요.', correct: false },
      ],
      explain: '进行时公式 = V + **고** 있어요，不是 아/어 있어요（那是"结果状态"）。宾语 원룸 用 을',
    },
    {
      id: 'd16-g3-f2',
      promptKo: '예쁘고 있어요.',
      promptZh: '"（她）很漂亮" 想用进行时——哪句正确？',
      choices: [
        { text: '예쁘고 있어요.', correct: false },
        { text: '예뻐요.', correct: true },
        { text: '예쁘고 싶어요.', correct: false },
        { text: '예쁘를 있어요.', correct: false },
      ],
      explain: '~고 있어요 只能接**动词**，不能接形容词。形容词直接用 해요体：예쁘다 → 예뻐요',
    },
    {
      id: 'd16-g3-f3',
      promptKo: '지금 뭐 하고 싶어요?',
      promptZh: '朋友打电话问"你现在在做什么？"（问当前动作）最自然的说法？',
      choices: [
        { text: '지금 뭐 하고 싶어요?', correct: false },
        { text: '지금 뭐 하고 있어요?', correct: true },
        { text: '지금 뭐 할래요?', correct: false },
        { text: '지금 뭐 했어요?', correct: false },
      ],
      explain: '问当前动作用 **~고 있어요?**。「~고 싶어요?」= 想做什么(愿望)；「~할래요?」= 要做什么(意愿/邀请)。三者不同',
    },
    {
      id: 'd16-g3-f4',
      promptKo: '안경을 쓰고 싶어요.',
      promptZh: '想说"我戴着眼镜"（描述当前状态）最标准的说法？',
      choices: [
        { text: '안경을 쓰고 싶어요.', correct: false },
        { text: '안경을 쓰고 있어요.', correct: true },
        { text: '안경을 썼어요.', correct: false },
        { text: '안경을 쓸래요.', correct: false },
      ],
      explain: '穿戴状态用 ~고 있어요。「쓰고 싶어요」= 想戴（愿望，还没戴）；「쓰고 있어요」= 戴着（当前状态）',
    },
    {
      id: 'd16-g3-f5',
      promptKo: '토리가 원룸을 찾고 있어요.',
      promptZh: '"兔莉正在找一居室"（第三人称）最标准的说法？',
      choices: [
        { text: '토리가 원룸을 찾고 있어요.', correct: true },
        { text: '토리가 원룸을 찾고 있어해요.', correct: false },
        { text: '토리는 원룸을 찾고 싶어해요.', correct: false },
        { text: '토리가 원룸을 찾아요.', correct: false },
      ],
      explain: '~고 있어요 是**动作陈述**，第一/第二/第三人称都可以直接用。跟 ~고 싶어요（限第一人称，第三人称要加 하다）不同',
    },
  ],

  compose: [
    {
      id: 'd16-g3-c1',
      zhHint: '正在找一居室。',
      audioKo: '원룸 찾고 있어요.',
      answer: ['원룸', '찾고', '있어요.'],
      tokens: ['원룸', '찾고', '있어요.', '찾아요.', '찾을래요.', '찾고 싶어요.'],
      explain: '찾다 + 고 있어요 = 正在找。租房场景核心句',
    },
    {
      id: 'd16-g3-c2',
      zhHint: '正在学韩语。',
      audioKo: '한국어 공부하고 있어요.',
      answer: ['한국어', '공부하고', '있어요.'],
      tokens: ['한국어', '공부하고', '있어요.', '공부해요.', '공부하고 싶어요.', '공부할래요.'],
      explain: '공부하다(하다 类) + 고 있어요 = 正在学',
    },
    {
      id: 'd16-g3-c3',
      zhHint: '正在等朋友。',
      audioKo: '친구를 기다리고 있어요.',
      answer: ['친구를', '기다리고', '있어요.'],
      tokens: ['친구를', '기다리고', '있어요.', '기다려요.', '기다렸어요.', '친구가'],
      explain: '기다리다 + 고 있어요 = 正在等。宾语 친구 末字"구"无받침 → 用 를（有받침才用 을）',
    },
    {
      id: 'd16-g3-c4',
      zhHint: '押金500万，月租50万左右。',
      audioKo: '보증금은 500만, 월세는 50만 정도요.',
      answer: ['보증금은', '500만,', '월세는', '50만', '정도요.'],
      tokens: ['보증금은', '500만,', '월세는', '50만', '정도요.', '월세가', '보증금이'],
      explain: '押金 + 月租的标准预算表达。「정도요」= 左右/差不多。是 「정도예요」的口语省略',
    },
  ],

  rule: [
    {
      id: 'd16-g3-r1',
      promptZh: '关于 ~고 있어요 vs ~고 싶어요，哪句最准确？',
      choices: [
        { text: '고 있어요 = 正在做（动作进行中）；고 싶어요 = 想做（愿望）', correct: true },
        { text: '两者可互换', correct: false },
        { text: '고 있어요 用于过去，고 싶어요 用于现在', correct: false },
        { text: '고 있어요 用于第三人称，고 싶어요 用于第一人称', correct: false },
      ],
      explain: '고 있어요：찾고 있어요（正在找）。고 싶어요：찾고 싶어요（想找）。前者描述当下动作，后者表达愿望',
    },
    {
      id: 'd16-g3-r2',
      promptZh: '关于「~고 있어요」和「~아/어 있어요」的区别，哪句最准确？',
      choices: [
        { text: '~고 있어요 = 动作正在进行；~아/어 있어요 = 动作结果的持续状态', correct: true },
        { text: '两者完全一样', correct: false },
        { text: '~고 있어요 是口语，~아/어 있어요 是书面', correct: false },
        { text: '~고 있어요 用于形容词，~아/어 있어요 用于动词', correct: false },
      ],
      explain: '앉고 있어요 = 正在坐下的动作；앉아 있어요 = 已经坐着的状态。两者用于不同场景',
    },
    {
      id: 'd16-g3-r3',
      promptZh: '关于「고 있어요」接形容词，哪句最准确？',
      choices: [
        { text: '고 있어요 只能接动词，形容词直接用 해요체（예뻐요/좋아요）', correct: true },
        { text: '形容词可以接：예쁘고 있어요 ✓', correct: false },
        { text: '形容词要加 하다 再接', correct: false },
        { text: '形容词的进行时用 ~네요', correct: false },
      ],
      explain: '~고 있어요 是动词专用。形容词的"现在状态"直接用 해요체或加时间副词：「지금 예뻐요」= 现在很漂亮',
    },
    {
      id: 'd16-g3-r4',
      promptZh: '"戴着眼镜"最自然的说法？',
      choices: [
        { text: '안경을 쓰고 있어요.（穿戴状态·~고 있어요 特殊用法）', correct: true },
        { text: '안경을 써요.（一般现在时）', correct: false },
        { text: '안경을 쓰고 싶어요.（愿望）', correct: false },
        { text: '안경을 썼어요.（过去时）', correct: false },
      ],
      explain: '衣服/眼镜/帽子等**穿戴类**动词 + 고 있어요 = 穿/戴着的状态。不是"正在戴"的动作，而是"戴着"的持续',
    },
  ],
};
