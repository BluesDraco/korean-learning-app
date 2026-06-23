import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 10 · 학교 식당 · 有什么 / 没什么
 *
 * 剧情：中午 12 点，Junho 拉兔莉去学校식당（食堂）。
 * 排队到她时，袋鼠阿姨看着她问："오늘 뭐 드릴까요?"
 * 兔莉点了 김치찌개 (泡菜汤)，结果袋鼠阿姨笑着摇头："오늘 없어요. 된장찌개 있어요."
 * （今天没有，有大酱汤。）兔莉吃完后香得想哭——又咸又香。
 *
 * 学习目标：있어요 / 없어요 / 食堂用语 / 韩国常见菜名
 * 韩语自审：korean skill PASS
 */
export const day10: ToriDay = {
  day: 10,
  phase: 'foundation',
  title: '학교 식당 · 有什么 / 没什么',
  subtitle: '没吃到泡菜汤但吃到了人生第一碗大酱汤',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9月 11일 점심시간',
    weather: '首尔 · 晴',
    toriPose: 'happy',
    diaryText: `9月 11日，中午 12:10。

Junho 在教室门口等我："토리야, 점심 같이 가자."
他说的"가자"我居然听懂了——一起走。

学校식당排着长长的队，
窗口飘着辣辣香香的味道。

轮到我了。袋鼠阿姨抬头："오늘 뭐 드릴까요?"
我事先查好了：김치찌개. (泡菜汤)
我紧张地说："김치찌개 있어요?"
（有泡菜汤吗？）

袋鼠阿姨笑着摇头：
"오늘 없어요. 된장찌개 있어요."
（今天没有。有大酱汤。）

我不知道된장是什么，
Junho 偷偷拿手机翻译给我看——大酱。

我点点头："그럼 된장찌개 주세요."
（那请给我大酱汤。）

吃下第一口的时候，
咸、香、烫，
鼻子有点酸。
不是辣的，是想家的那种酸。`,
  },

  words: [
    {
      id: 'd10-w1',
      korean: '있어요',
      hangul: 'i-sseo-yo',
      zh: '有 / 在',
      pos: '动词',
      example: { ko: '시간 있어요?', zh: '有时间吗？' },
      tip: '动词「있다」(有/在) 的礼貌形。万能字之一',
    },
    {
      id: 'd10-w2',
      korean: '없어요',
      hangul: 'eop-seo-yo',
      zh: '没有 / 不在',
      pos: '动词',
      example: { ko: '오늘 없어요.', zh: '今天没有。' },
      tip: '动词「없다」的礼貌形。「있어요」的反义词',
    },
    {
      id: 'd10-w3',
      korean: '김치찌개',
      hangul: 'kim-chi-jji-gae',
      zh: '泡菜汤',
      pos: '名词',
      example: { ko: '김치찌개 주세요.', zh: '请给我泡菜汤。' },
      tip: '韩国国民汤。配米饭神器',
    },
    {
      id: 'd10-w4',
      korean: '된장찌개',
      hangul: 'doen-jang-jji-gae',
      zh: '大酱汤',
      pos: '名词',
      example: { ko: '된장찌개도 맛있어요.', zh: '大酱汤也好吃。' },
      tip: '된장 = 大酱（韩国传统发酵酱）',
    },
    {
      id: 'd10-w5',
      korean: '점심',
      hangul: 'jeom-sim',
      zh: '午饭',
      pos: '名词',
      example: { ko: '점심 같이 먹어요.', zh: '一起吃午饭。' },
      tip: '搭配：아침(早饭) / 점심(午饭) / 저녁(晚饭)',
    },
    {
      id: 'd10-w6',
      korean: '맛있어요',
      hangul: 'ma-si-sseo-yo',
      zh: '好吃',
      pos: '形容词',
      example: { ko: '진짜 맛있어요!', zh: '真的好吃！' },
      tip: '反义词「맛없어요」(不好吃) — 注意 ㅅ 在前一字尾不发音',
    },
  ],

  dialogue: {
    scene: '학교 식당 · 点餐窗口',
    setting: {
      time: '中午 12:10',
      place: '学校食堂',
      npc: '袋鼠阿姨',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '袋鼠阿姨',
        ko: '오늘 뭐 드릴까요?',
        hangul: 'o-neul mwo deu-ril-kka-yo',
        zh: '今天给您什么？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '김치찌개 있어요?',
        hangul: 'kim-chi-jji-gae i-sseo-yo',
        zh: '有泡菜汤吗？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '袋鼠阿姨',
        ko: '오늘 없어요. 된장찌개 있어요.',
        hangul: 'o-neul eop-seo-yo. doen-jang-jji-gae i-sseo-yo',
        zh: '今天没有。有大酱汤。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '그럼 된장찌개 주세요.',
        hangul: 'geu-reom doen-jang-jji-gae ju-se-yo',
        zh: '那请给我大酱汤。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '阿姨把托盘递过来，兔莉应该说什么？',
        practice: 'pick',
        choices: [
          { ko: '감사합니다. 잘 먹겠습니다.', zh: '谢谢。我会好好吃的。', correct: true },
          { ko: '맛없어요.', zh: '不好吃。', correct: false },
          { ko: '없어요.', zh: '没有。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '있어요 / 없어요',
    pattern: 'N + 있어요 (有) · N + 없어요 (没有)',
    whenToUse: '问"有没有X"。点餐、问时间、问东西在不在 — 全用这一对。',
    rules: [
      '「**있어요**」 = 有 / 在，万能动词',
      '「**없어요**」 = 没有 / 不在，**없**字的「ㅄ」받침真要练发音',
      '前面名词用「이/가」: 시간**이** 있어요? · 돈**이** 없어요',
    ],
    examples: [
      { ko: '김치찌개 있어요?', zh: '有泡菜汤吗？', highlight: '있어요' },
      { ko: '오늘 없어요.', zh: '今天没有。', highlight: '없어요' },
      { ko: '시간 있어요?', zh: '有时间吗？', highlight: '있어요' },
      { ko: '문제없어요.', zh: '没问题。', highlight: '없어요' },
    ],
    pitfall:
      '「없어요」的「ㅄ」받침初学者最易发错。实际念 [업써요]，左边 ㅂ 发音，右边 ㅅ 不读但变[ㅆ]。多听多模仿。',
  },

  output: [
    {
      id: 'd10-o1',
      kind: 'fill',
      prompt: '김치찌개 ___?',
      zhHint: '有泡菜汤吗？',
      answer: '있어요',
      successMsg: '袋鼠阿姨抬头看你一眼 ✓',
    },
  ],

  recap: {
    toriPose: 'happy',
    praise: '问出了"有没有"的句子。今天还学会了「잘 먹었습니다」。',
    preview: '明天 Junho 说带我去다이소买生活用品。"이거 / 그거 / 저거" 要派上用场了。',
    stickerId: 'sticker-d10',
  },

  carrotHint:
    '今天的胡萝卜：「있어요和없어요发音区别」「韩国食堂常见菜」「饭后怎么说谢谢」',
};
