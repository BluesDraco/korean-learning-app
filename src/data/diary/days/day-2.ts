import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 2 · 飞机上 · 第一次说韩语
 *
 * 剧情：飞机起飞后，仙鹤空乘姐姐推餐车过来。兔莉紧张得手心冒汗，
 * 摸了摸口袋里的勇气胡萝卜，鼓起勇气用韩语点了一杯可乐。
 *
 * 学习目标：~주세요 句式 / 네 vs 아니요 / 飞机上的礼貌用语
 * 韩语自审：korean skill PASS（조사/敬语/自然度 三关）
 */
export const day2: ToriDay = {
  level: 'beginner',
  day: 2,
  phase: 'foundation',
  title: '飞机上 · 第一次说韩语',
  subtitle: '一杯可乐 = 半个胜利',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9月 2日 비행기 안',
    weather: '云层之上 · 晴',
    toriPose: 'shy',
    diaryText: `9月 2日，飞机上。

我座位 28F，靠窗。
起飞那一刻，胡萝卜从口袋里探出半个头，
像在跟云朵打招呼。

窗外云层翻涌，兽尔动物城就在云的下面等着我。

空乘姐姐是一只白色的仙鹤。
她推着餐车走过来，对我说了一串话。
我只听懂了一个字："드릴까요?"
（给你什么？）

我紧紧握住口袋里的胡萝卜，
深呼吸，说出了人生第一次对韩国人说的韩语：
"콜라 주세요."

她笑了。我也笑了。
胡萝卜在口袋里好像也笑了一下。`,
  },

  words: [
    {
      id: 'd02-w1',
      korean: '네',
      hangul: 'ne',
      zh: '是 / 好',
      pos: '感叹词',
      example: { ko: '네, 알겠어요.', zh: '好的，我明白了。' },
      tip: '韩语里说"是"用「네」，比「예」更日常',
    },
    {
      id: 'd02-w2',
      korean: '아니요',
      hangul: 'a-ni-yo',
      zh: '不是 / 不用',
      pos: '感叹词',
      example: { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。' },
      tip: '婉拒别人的好意必备',
    },
    {
      id: 'd02-w3',
      korean: '콜라',
      hangul: 'kol-la',
      zh: '可乐',
      pos: '名词',
      example: { ko: '콜라 주세요.', zh: '请给我一杯可乐。' },
      tip: '韩国外来语很多直接音译。咖啡=커피，啤酒=맥주（这个不是音译）',
    },
    {
      id: 'd02-w4',
      korean: '주세요',
      hangul: 'ju-se-yo',
      zh: '请给我',
      pos: '表达',
      example: { ko: '물 한 잔 주세요.', zh: '请给我一杯水。' },
      tip: '韩国生活第一句神咒。能说出这三个字，半个韩国就通了',
    },
    {
      id: 'd02-w5',
      korean: '감사합니다',
      hangul: 'gam-sa-ham-ni-da',
      zh: '谢谢（正式）',
      pos: '表达',
      example: { ko: '도와주셔서 감사합니다.', zh: '谢谢您的帮助。' },
      tip: '「고마워요」是熟人之间，「감사합니다」是对所有人都用得起的安全牌',
    },
    {
      id: 'd02-w6',
      korean: '죄송합니다',
      hangul: 'joe-song-ham-ni-da',
      zh: '对不起（正式）',
      pos: '表达',
      example: { ko: '늦어서 죄송합니다.', zh: '对不起我迟到了。' },
      tip: '比「미안해요」更正式。对长辈、对陌生人用',
    },
  ],

  dialogue: {
    scene: '飞机上 · 餐车经过',
    setting: {
      time: '飞机起飞后 1 小时',
      place: '机舱 28F 座位',
      npc: '仙鹤空乘',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '仙鹤空乘',
        ko: '음료수 드릴까요?',
        hangul: 'eum-nyo-su deu-ril-kka-yo',
        zh: '需要饮料吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 콜라 주세요.',
        hangul: 'ne, kol-la ju-se-yo',
        zh: '好的，请给我一杯可乐。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '仙鹤空乘',
        ko: '얼음 드릴까요?',
        hangul: 'eo-reum deu-ril-kka-yo',
        zh: '要冰块吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '아니요, 괜찮아요.',
        hangul: 'a-ni-yo, gwaen-cha-na-yo',
        zh: '不用了，谢谢。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '해냈다! 첫 한국어!',
        hangul: 'hae-naet-da! cheot han-gu-geo!',
        zh: '做到了！第一句韩语！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '空乘把可乐递过来，兔莉应该说什么？',
        practice: 'pick',
        choices: [
          { ko: '감사합니다.', zh: '谢谢。', correct: true },
          { ko: '죄송합니다.', zh: '对不起。', correct: false },
          { ko: '안녕하세요.', zh: '你好。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '请给我 ___ : ~ 주세요',
    pattern: 'N + 주세요',
    whenToUse: '点单、问别人要东西、请求帮忙。韩国生活第一个万能句。',
    rules: [
      '名词后直接加「주세요」就行：콜라 → 콜라 **주세요**',
      '更礼貌的说法：把「주세요」换成「**부탁드립니다**」',
      '反过来别人对你说「드릴까요?」意思就是「要不要给您___?」',
    ],
    examples: [
      { ko: '콜라 주세요.', zh: '请给我可乐。', highlight: '주세요', note: '명사 직접 + **주세요**。口语可省略조사 을/를' },
      { ko: '물 한 잔 주세요.', zh: '请给我一杯水。', highlight: '주세요', note: '**한 잔**（一杯）是量词结构，물(水) + 한 잔(一杯) + 주세요' },
      { ko: '메뉴 주세요.', zh: '请给我菜单。', highlight: '주세요', note: '메뉴 无받침，直接加 **주세요** 即可' },
      { ko: '도와주세요.', zh: '请帮帮我。', highlight: '주세요', note: '도와(帮) + **주세요** 合并为一个词，是请求帮助的固定表达' },
    ],
    pitfall:
      '「주세요」前的名词不用加「을/를」也可以（口语很常省略），但加了更标准：「콜라를 주세요」也对。',
  },

  output: [
    {
      id: 'd02-o1',
      kind: 'compose',
      zhHint: '请给我一杯可乐。',
      tokens: ['콜라', '주세요', '얼음', '감사합니다', '아니요'],
      composeAnswer: ['콜라', '주세요'],
      successMsg: '空乘姐姐笑着把可乐递过来了 🥤',
    },
    {
      id: 'd02-o2',
      kind: 'listen-choice',
      audioKo: '물 한 잔 주세요.',
      successMsg: '✓ 是「请给我一杯水」。「물」(水) + 「한 잔」(一杯) + 「주세요」。',
      choices: [
        { zh: '请给我一杯水。', correct: true },
        { zh: '请给我一杯可乐。', correct: false },
        { zh: '请给我冰块。', correct: false },
        { zh: '不用了，谢谢。', correct: false },
      ],
    },
    {
      id: 'd02-o3',
      kind: 'zh-to-ko',
      zhPrompt: '好的，请给我一杯可乐。',
      successMsg: '"네, 콜라 주세요." — 兔莉的人生第一次韩语点单。',
      choices: [
        { ko: '네, 콜라 주세요.', correct: true },
        { ko: '아니요, 콜라 주세요.', correct: false },
        { ko: '네, 콜라 부탁해요.', correct: false },
        { ko: '콜라 네 주세요.', correct: false },
      ],
    },
    {
      id: 'd02-o4',
      kind: 'particle-error',
      zhHint: '请给我一杯可乐。',
      successMsg: '콜라 无받침 → 을/를 省略也可。口语中最常见的点单句式。',
      choices: [
        { ko: '콜라 주세요.', correct: true },
        { ko: '콜라를 주세요.', correct: false },
        { ko: '콜라가 주세요.', correct: false },
        { ko: '콜라은 주세요.', correct: false },
      ],
    },
    {
      id: 'd02-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 2 核心词全部对上。下了飞机，一切才刚刚开始。',
      pairs: [
        { ko: '네', zh: '是 / 好' },
        { ko: '아니요', zh: '不是 / 不用' },
        { ko: '주세요', zh: '请给我' },
        { ko: '감사합니다', zh: '谢谢（正式）' },
        { ko: '죄송합니다', zh: '对不起（正式）' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '第一次对韩国人说出了韩语。토리, 진짜 잘했어요!',
    preview: '明天就要落地仁爪了。机场出口，会发生什么呢？我已经有点紧张了。',
    stickerId: 'sticker-d02',
  },

  carrotHint:
    '今天的胡萝卜：可以问它「飞机上韩语怎么说水/咖啡/茶」「주세요前面要加什么助词吗」',
};
