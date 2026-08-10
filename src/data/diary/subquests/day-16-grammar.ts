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
  subtitle: '~고 있어요 · 正在做的进行时', subtitleEn: '~고 있어요 · present progressive for ongoing actions',

  fix: [
    {
      id: 'd16-g3-f1',
      promptKo: '학교 근처 원룸을 찾아 있어요.',
      promptZh: '"正在找学校附近的一居室"最标准的写法？', promptZhEn: 'What\'s the most standard way to write "I\'m looking for a studio near school"?',
      choices: [
        { text: '학교 근처 원룸을 찾아 있어요.', correct: false },
        { text: '학교 근처 원룸을 찾고 있어요.', correct: true },
        { text: '학교 근처 원룸이 찾고 있어요.', correct: false },
        { text: '학교 근처 원룸을 찾은 있어요.', correct: false },
      ],
      explain: '进行时公式 = V + **고** 있어요，不是 아/어 있어요（那是"结果状态"）。宾语 원룸 用 을', explainEn: 'Progressive formula = V + **고** 있어요, not 아/어 있어요 (that\'s for "resultative state"). The object 원룸 takes 을.',
    },
    {
      id: 'd16-g3-f2',
      promptKo: '예쁘고 있어요.',
      promptZh: '"（她）很漂亮" 想用进行时——哪句正确？', promptZhEn: 'You want to say "(She) is pretty" using the progressive—which is correct?',
      choices: [
        { text: '예쁘고 있어요.', correct: false },
        { text: '예뻐요.', correct: true },
        { text: '예쁘고 싶어요.', correct: false },
        { text: '예쁘를 있어요.', correct: false },
      ],
      explain: '~고 있어요 只能接**动词**，不能接形容词。形容词直接用 해요体：예쁘다 → 예뻐요', explainEn: '~고 있어요 only attaches to **verbs**, not adjectives. For adjectives, use the 해요 form directly: 예쁘다 → 예뻐요.',
    },
    {
      id: 'd16-g3-f3',
      promptKo: '지금 뭐 하고 싶어요?',
      promptZh: '朋友打电话问"你现在在做什么？"（问当前动作）最自然的说法？', promptZhEn: 'Your friend calls and asks, "What are you doing right now?" (asking about current action). What\'s the most natural way to say it?',
      choices: [
        { text: '지금 뭐 하고 싶어요?', correct: false },
        { text: '지금 뭐 하고 있어요?', correct: true },
        { text: '지금 뭐 할래요?', correct: false },
        { text: '지금 뭐 했어요?', correct: false },
      ],
      explain: '问当前动作用 **~고 있어요?**。「~고 싶어요?」= 想做什么(愿望)；「~할래요?」= 要做什么(意愿/邀请)。三者不同', explainEn: 'To ask about a current action, use **~고 있어요?**. ~고 싶어요? = what you want to do (desire); ~할래요? = what you\'re going to do (intention/invitation). They\'re different.',
    },
    {
      id: 'd16-g3-f4',
      promptKo: '안경을 쓰고 싶어요.',
      promptZh: '想说"我戴着眼镜"（描述当前状态）最标准的说法？', promptZhEn: 'You want to say "I\'m wearing glasses" (describing current state). What\'s the most standard way?',
      choices: [
        { text: '안경을 쓰고 싶어요.', correct: false },
        { text: '안경을 쓰고 있어요.', correct: true },
        { text: '안경을 썼어요.', correct: false },
        { text: '안경을 쓸래요.', correct: false },
      ],
      explain: '穿戴状态用 ~고 있어요。「쓰고 싶어요」= 想戴（愿望，还没戴）；「쓰고 있어요」= 戴着（当前状态）', explainEn: 'For wearing/accessory states, use ~고 있어요. 쓰고 싶어요 = want to wear (desire, not yet wearing); 쓰고 있어요 = wearing (current state).',
    },
    {
      id: 'd16-g3-f5',
      promptKo: '토리가 원룸을 찾고 있어요.',
      promptZh: '"兔莉正在找一居室"（第三人称）最标准的说法？', promptZhEn: 'What\'s the most standard way to say "Tori is looking for a studio" (third person)?',
      choices: [
        { text: '토리가 원룸을 찾고 있어요.', correct: true },
        { text: '토리가 원룸을 찾고 있어해요.', correct: false },
        { text: '토리는 원룸을 찾고 싶어해요.', correct: false },
        { text: '토리가 원룸을 찾아요.', correct: false },
      ],
      explain: '~고 있어요 是**动作陈述**，第一/第二/第三人称都可以直接用。跟 ~고 싶어요（限第一人称，第三人称要加 하다）不同', explainEn: '~고 있어요 is an **action statement**—can be used directly with first/second/third person. Unlike ~고 싶어요 (limited to first person; third person requires adding 하다).',
    },
  ],

  compose: [
    {
      id: 'd16-g3-c1',
      zhHint: '正在找一居室。', zhHintEn: 'I\'m looking for a studio.',
      audioKo: '원룸 찾고 있어요.',
      answer: ['원룸', '찾고', '있어요.'],
      tokens: ['원룸', '찾고', '있어요.', '찾아요.', '찾을래요.', '찾고 싶어요.'],
      explain: '찾다 + 고 있어요 = 正在找。租房场景核心句', explainEn: '찾다 + 고 있어요 = am looking for. Core sentence for rental scenarios.',
    },
    {
      id: 'd16-g3-c2',
      zhHint: '正在学韩语。', zhHintEn: 'I\'m learning Korean.',
      audioKo: '한국어 공부하고 있어요.',
      answer: ['한국어', '공부하고', '있어요.'],
      tokens: ['한국어', '공부하고', '있어요.', '공부해요.', '공부하고 싶어요.', '공부할래요.'],
      explain: '공부하다(하다 类) + 고 있어요 = 正在学', explainEn: '공부하다 (하다 type) + 고 있어요 = currently studying',
    },
    {
      id: 'd16-g3-c3',
      zhHint: '正在等朋友。', zhHintEn: 'I\'m waiting for a friend.',
      audioKo: '친구를 기다리고 있어요.',
      answer: ['친구를', '기다리고', '있어요.'],
      tokens: ['친구를', '기다리고', '있어요.', '기다려요.', '기다렸어요.', '친구가'],
      explain: '기다리다 + 고 있어요 = 正在等。宾语 친구 末字"구"无받침 → 用 를（有받침才用 을）',
    },
    {
      id: 'd16-g3-c4',
      zhHint: '押金500万，月租50万左右。', zhHintEn: 'Deposit is 5 million won, and monthly rent is around 500,000 won.',
      audioKo: '보증금은 500만, 월세는 50만 정도요.',
      answer: ['보증금은', '500만,', '월세는', '50만', '정도요.'],
      tokens: ['보증금은', '500만,', '월세는', '50만', '정도요.', '월세가', '보증금이'],
      explain: '押金 + 月租的标准预算表达。「정도요」= 左右/差不多。是 「정도예요」的口语省略', explainEn: 'Standard budget expression for deposit + monthly rent. 「정도요」 = about/approximately. It\'s a colloquial abbreviation of 「정도예요」',
    },
  ],

  rule: [
    {
      id: 'd16-g3-r1',
      promptZh: '关于 ~고 있어요 vs ~고 싶어요，哪句最准确？', promptZhEn: 'About ~고 있어요 vs ~고 싶어요, which is most accurate?',
      choices: [
        { text: '고 있어요 = 正在做（动作进行中）；고 싶어요 = 想做（愿望）', textEn: '고 있어요 = currently doing (action in progress); 고 싶어요 = want to do (desire)', correct: true },
        { text: '两者可互换', textEn: 'The two are interchangeable', correct: false },
        { text: '고 있어요 用于过去，고 싶어요 用于现在', textEn: '고 있어요 is used for the past, 고 싶어요 for the present', correct: false },
        { text: '고 있어요 用于第三人称，고 싶어요 用于第一人称', textEn: '고 있어요 is used for third person, 고 싶어요 for first person', correct: false },
      ],
      explain: '고 있어요：찾고 있어요（正在找）。고 싶어요：찾고 싶어요（想找）。前者描述当下动作，后者表达愿望', explainEn: '고 있어요: 찾고 있어요 (currently looking). 고 싶어요: 찾고 싶어요 (want to look). The former describes an ongoing action, the latter expresses a desire',
    },
    {
      id: 'd16-g3-r2',
      promptZh: '关于「~고 있어요」和「~아/어 있어요」的区别，哪句最准确？', promptZhEn: 'About the difference between 「~고 있어요」 and 「~아/어 있어요」, which is most accurate?',
      choices: [
        { text: '~고 있어요 = 动作正在进行；~아/어 있어요 = 动作结果的持续状态', textEn: '~고 있어요 = action in progress; ~아/어 있어요 = continuing state resulting from an action', correct: true },
        { text: '两者完全一样', textEn: 'The two are exactly the same', correct: false },
        { text: '~고 있어요 是口语，~아/어 있어요 是书面', textEn: '~고 있어요 is spoken, ~아/어 있어요 is written', correct: false },
        { text: '~고 있어요 用于形容词，~아/어 있어요 用于动词', textEn: '~고 있어요 is used with adjectives, ~아/어 있어요 with verbs', correct: false },
      ],
      explain: '앉고 있어요 = 正在坐下的动作；앉아 있어요 = 已经坐着的状态。两者用于不同场景', explainEn: '앉고 있어요 = the action of sitting down; 앉아 있어요 = the state of already sitting. The two are used in different situations',
    },
    {
      id: 'd16-g3-r3',
      promptZh: '关于「고 있어요」接形容词，哪句最准确？', promptZhEn: 'About 「고 있어요」 with adjectives, which is most accurate?',
      choices: [
        { text: '고 있어요 只能接动词，形容词直接用 해요체（예뻐요/좋아요）', textEn: '고 있어요 can only attach to verbs; adjectives directly use 해요체 (예뻐요/좋아요)', correct: true },
        { text: '形容词可以接：예쁘고 있어요 ✓', textEn: 'Adjectives can attach: 예쁘고 있어요 ✓', correct: false },
        { text: '形容词要加 하다 再接', textEn: 'Adjectives need to add 하다 before attaching', correct: false },
        { text: '形容词的进行时用 ~네요', textEn: 'The progressive form of adjectives uses ~네요', correct: false },
      ],
      explain: '~고 있어요 是动词专用。形容词的"现在状态"直接用 해요체或加时间副词：「지금 예뻐요」= 现在很漂亮', explainEn: '~고 있어요 is exclusive to verbs. For adjectives, the "present state" directly uses 해요체 or adds a time adverb: 「지금 예뻐요」 = is pretty now',
    },
    {
      id: 'd16-g3-r4',
      promptZh: '"戴着眼镜"最自然的说法？', promptZhEn: 'What\'s the most natural way to say "wearing glasses"?',
      choices: [
        { text: '안경을 쓰고 있어요.（穿戴状态·~고 있어요 特殊用法）', textEn: '안경을 쓰고 있어요. (wearing state · special use of ~고 있어요)', correct: true },
        { text: '안경을 써요.（一般现在时）', textEn: '안경을 써요. (simple present)', correct: false },
        { text: '안경을 쓰고 싶어요.（愿望）', textEn: '안경을 쓰고 싶어요. (desire)', correct: false },
        { text: '안경을 썼어요.（过去时）', textEn: 'I wore glasses. (past tense)', correct: false },
      ],
      explain: '衣服/眼镜/帽子等**穿戴类**动词 + 고 있어요 = 穿/戴着的状态。不是"正在戴"的动作，而是"戴着"的持续', explainEn: 'For verbs like **wearing** clothes/glasses/hats, + 고 있어요 = the state of wearing. It\'s not the action of "putting on," but the ongoing state of "wearing."',
    },
  ],
};
