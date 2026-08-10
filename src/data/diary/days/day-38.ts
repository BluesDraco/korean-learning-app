import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 38 · 김치볶음밥 · 第一次没翻车
 *
 * 剧情：Haru来教Tori做泡菜炒饭。Tori紧张地切泡菜、炒饭——居然没翻车。
 * 拍照发给妈妈"我会做饭了"。妈妈秒回一只兔子竖大拇指的表情包。
 *
 * 学习目标：능력 ~(으)ㄹ 수 있어요/없어요 / 요리 어휘
 * 语料层级：해요体
 * 韩语自审：korean skill PASS
 */
export const day38: ToriDay = {
  level: 'intermediate',
  day: 8,
  phase: 'expansion',
  title: '自己做饭 · 第一次没翻车', titleEn: 'Cooking on her own · Didn\'t mess up for the first time',
  subtitle: 'Haru来教泡菜炒饭——原来我也可以', subtitleEn: 'Haru teaches kimchi fried rice—turns out I can do it too',
  heroImageUrl: '/images/diary/day-38-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 11일 · 금요일 저녁',
    weather: '兽尔 · 晴', weatherEn: 'Seoul · Sunny',
    toriPose: 'shy',
    diaryText: `10月11日，周五晚上。

Haru拎着一袋泡菜、一颗鸡蛋、一小盒米饭出现在我门口。

"오늘부터 너도 김치볶음밥 할 수 있어."
（从今天起，你也会做泡菜炒饭了。）

我看着案板上那颗鸡蛋，突然紧张——
Day 1的行李箱、Day 3的机场、Day 14的咖啡馆——
没有一件事比"自己做饭"更让我心跳。

Haru在旁边教：
"김치를 잘게 잘라. 팬에 기름 두르고, 김치 먼저 볶아."
（把泡菜切小块。锅里放油，先炒泡菜。）

我照做——
锅里滋啦一声，红油飞起来。
我下意识地退了半步。
Haru笑："괜찮아, 튀는 게 정상이야."
（没事，飞油是正常的。）

饭下锅，一起翻。
最后打个鸡蛋，撒芝麻。

十分钟后——
一碗真的、能吃的、我做的김치볶음밥。

我拍了照片发给妈妈：
"엄마, 나 요리할 수 있어요."
（妈妈，我会做饭了。）

三秒后妈妈回了一张兔子竖大拇指的表情包。

Haru尝了一口，认真点头：
"이 정도면 진짜 잘한 거야."
（这个水准算真的做得不错了。）`,
  },

  words: [
    {
      id: 'd38-w1',
      korean: '요리',
      hangul: 'yo-ri',
      zh: '料理/做饭', zhEn: 'cooking',
      pos: '名词', posEn: 'Noun',
      example: { ko: '요리를 배우고 있어요.', zh: '正在学做饭。', zhEn: 'I\'m learning to cook.' },
      tip: '料(요) + 理(리)。요리하다 = 做饭。요리사 = 厨师', tipEn: '料(요) + 理(리). 요리하다 = to cook. 요리사 = chef',
    },
    {
      id: 'd38-w2',
      korean: '볶다',
      hangul: 'bok-da',
      zh: '炒', zhEn: 'to stir-fry',
      pos: '动词', posEn: 'Verb',
      example: { ko: '김치를 볶아요.', zh: '炒泡菜。', zhEn: 'Stir-fry kimchi.' },
      tip: '发音 [복따]。볶음밥 = 炒饭。제일 쉬운 요리 방법', tipEn: 'Pronunciation [복따]. 볶음밥 = fried rice. The easiest cooking method.',
    },
    {
      id: 'd38-w3',
      korean: '자르다',
      hangul: 'ja-reu-da',
      zh: '切', zhEn: 'Cut',
      pos: '动词', posEn: 'Verb',
      example: { ko: '김치를 잘게 잘라요.', zh: '把泡菜切小块。', zhEn: 'Cut the kimchi into small pieces.' },
      tip: '르 不规则：자르다 → 잘라요（不是자르어요）', tipEn: '르 irregular: 자르다 → 잘라요 (not 자르어요)',
    },
    {
      id: 'd38-w4',
      korean: '재료',
      hangul: 'jae-ryo',
      zh: '材料/食材', zhEn: 'Ingredients',
      pos: '名词', posEn: 'Noun',
      example: { ko: '재료가 다 있어요.', zh: '食材都齐了。', zhEn: 'All the ingredients are ready.' },
      tip: '材(재) + 料(료)。요리 재료 = 做饭食材', tipEn: '材(재) + 料(료). 요리 재료 = cooking ingredients',
    },
    {
      id: 'd38-w5',
      korean: '팬',
      hangul: 'paen',
      zh: '平底锅', zhEn: 'Frying pan',
      pos: '名词', posEn: 'Noun',
      example: { ko: '팬에 기름을 둘러요.', zh: '在平底锅里放油。', zhEn: 'Put oil in the frying pan.' },
      tip: '英语 pan 的外来语。냄비(炖锅) vs 팬(平底煎锅)', tipEn: 'Loanword from English \'pan\'. 냄비 (stew pot) vs 팬 (frying pan)',
    },
    {
      id: 'd38-w6',
      korean: '기름',
      hangul: 'gi-reum',
      zh: '油', zhEn: 'Oil',
      pos: '名词', posEn: 'Noun',
      example: { ko: '기름을 좀 둘러요.', zh: '放一点油。', zhEn: 'Add a little oil.' },
      tip: '기름을 두르다 = 放油/淋油。做菜必备', tipEn: '기름을 두르다 = to coat with oil. Essential for cooking.',
    },
  ],

  dialogue: {
    scene: '301号房·厨房小台', sceneEn: 'Room 301 · Kitchen Counter',
    setting: {
      time: '周五晚 7:00', timeEn: 'Friday 7:00 PM',
      place: 'Tori的宿舍·迷你厨房', placeEn: 'Tori\'s Dorm · Mini Kitchen',
      npc: 'Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리, 오늘은 김치볶음밥 만들어 볼래?',
        hangul: 'to-ri, o-neu-reun kim-chi-bok-kkeum-bap man-deu-reo bol-lae?',
        zh: '兔莉，今天要不要试试做泡菜炒饭？', zhEn: 'Tori, want to try making kimchi fried rice today?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '음… 나 할 수 있을까?',
        hangul: 'eum… na hal su i-sseul-kka?',
        zh: '嗯……我能做得来吗？', zhEn: 'Hmm... Can I do it?',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '당연히 할 수 있어. 재료 다 있어.',
        hangul: 'dang-yeon-hi hal su i-sseo. jae-ryo da i-sseo',
        zh: '当然能。食材都齐了。', zhEn: 'Of course you can. All the ingredients are ready.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '팬이 뜨거워… 진짜 요리사 같아.',
        hangul: 'pae-ni tteu-geo-wo… jin-jja yo-ri-sa ga-ta',
        zh: '锅好烫……感觉像个真的厨师了。', zhEn: 'The pan is so hot... I feel like a real chef.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '엄마, 나 요리할 수 있어요!',
        hangul: 'eom-ma, na yo-ri-hal su i-sseo-yo!',
        zh: '妈妈，我会做饭了！', zhEn: 'Mom, I can cook now!',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru尝完饭说好吃。Tori想说"下次我做给你吃"。合适的一句？', zhEn: 'After tasting the food, Haru says it\'s delicious. Tori wants to say "Next time I\'ll cook for you." Which is the right sentence?',
        practice: 'pick',
        choices: [
          { ko: '다음엔 내가 해줄게.', zh: '下次我做给你吃。', zhEn: 'Next time I\'ll cook for you.', correct: true },
          { ko: '다음엔 네가 해줘.', zh: '下次你做给我吃。', zhEn: 'Next time you cook for me.', correct: false },
          { ko: '내일 또 먹을래?', zh: '明天还要吃吗？', zhEn: 'Do you want to eat it again tomorrow?', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '会/能___：~(으)ㄹ 수 있어요 / 없어요', titleEn: 'Can/Can\'t ___: ~(으)ㄹ 수 있어요 / 없어요',
    pattern: 'V 어간 + **(으)ㄹ 수 있어요 / 없어요**',
    whenToUse: '表达"能不能做___"的能力/可能性。Day 38 Tori 第一次说 「나 요리할 수 있어요」（我会做饭了）。**있어요** = 能，**없어요** = 不能。这是初级学韩语第一个"自我肯定"的句型。', whenToUseEn: 'Expresses the ability/possibility of "can or can\'t do ___". Day 38 Tori says for the first time, "나 요리할 수 있어요" (I can cook). **있어요** = can, **없어요** = can\'t. This is the first "self-affirmation" pattern in beginner Korean.',
    rules: [
      '**基本公式**：动词词干 + (으)ㄹ 수 있어요 = 能___。收音判断决定 **ㄹ** 还是 **을**',
      '**无收音 → ~ㄹ 수 있어요**：가다 → 갈 수 있어요（能去）。마시다 → 마실 수 있어요（能喝）',
      '**有收音 → ~을 수 있어요**：먹다 → 먹을 수 있어요（能吃）。읽다 → 읽을 수 있어요（能读）',
      '**否定 → ~(으)ㄹ 수 없어요 / 못**：两种说法都可。매운 거 못 먹어요 或 매운 거 먹을 수 없어요 都对'
    ],
    examples: [
      { ko: '나 요리할 수 있어요.', zh: '我会做饭。', zhEn: 'I can cook.', highlight: '할 수 있어요', note: '요리하다 → 할 수 있어요。Day 38 Tori 对妈妈说的原句', noteEn: '요리하다 → 할 수 있어요. The exact sentence Tori says to her mom on Day 38.' },
      { ko: '김치볶음밥 만들 수 있어.', zh: '会做泡菜炒饭。', zhEn: 'I can make kimchi fried rice.', highlight: '만들 수 있어', note: '만들다 ㄹ收音特殊 — 直接接 **ㄹ 수 있어**（不重复ㄹ）', noteEn: '만들다 has a special ㄹ batchim — just add **ㄹ 수 있어** directly (no repeated ㄹ).' },
      { ko: '매운 거는 잘 못 먹어요.', zh: '我不太能吃辣。', zhEn: 'I can\'t eat spicy food very well.', highlight: '못 먹어요', note: '못 + 동사 = 更口语的"不能"。못 먹다 / 못 가다 高频', noteEn: '못 + verb = more colloquial "can\'t". 못 먹다 / 못 가다 are high-frequency.' },
      { ko: '한국어로 편지 쓸 수 있어요.', zh: '能用韩语写信。', zhEn: 'I can write a letter in Korean.', highlight: '쓸 수 있어요', note: '쓰다 无받침 → **ㄹ 수 있어요**。자기 성장 표현' },
    ],
    pitfall:
      '① 收音判断决定 ㄹ / 을：❌ 먹ㄹ 수 있어요 → ✅ 먹**을** 수 있어요。② ㄹ受音动词（만들다/살다/알다）**不重复ㄹ**：만들 수 있어요（O） / 만들ㄹ 수 있어요（X）。③ **못** vs **~(으)ㄹ 수 없다**：口语更常用 못（못 먹어요），书面/正式用 ~(으)ㄹ 수 없다。두 가지 다 맞음.',
  },

  output: [
    {
      id: 'd38-o1',
      kind: 'compose',
      zhHint: '妈妈，我会做饭了！', zhHintEn: 'Mom, I can cook now!',
      tokens: ['엄마', '나', '요리할 수 있어요', '요리해요', '요리했어요', '못 해요'],
      composeAnswer: ['엄마', '나', '요리할 수 있어요'],
      successMsg: 'Tori给妈妈发出的那条消息。可以了。', successMsgEn: 'The message Tori sends to her mom. That\'s it.',
    },
    {
      id: 'd38-o2',
      kind: 'listen-choice',
      audioKo: '매운 거는 잘 못 먹어요.',
      successMsg: '✓ 못 + 动词 = 口语版"不能"。', successMsgEn: '✓ 못 + verb = colloquial "can\'t".',
      choices: [
        { zh: '我不太能吃辣。', zhEn: 'I can\'t eat spicy food very well.', correct: true },
        { zh: '我很爱吃辣。', zhEn: 'I really like spicy food.', correct: false },
        { zh: '辣的东西不好吃。', zhEn: 'Spicy things don\'t taste good.', correct: false },
        { zh: '我没吃辣的。', zhEn: 'I didn\'t eat anything spicy.', correct: false },
      ],
    },
    {
      id: 'd38-o3',
      kind: 'zh-to-ko',
      zhPrompt: '能用韩语写信。', zhPromptEn: 'I can write a letter in Korean.',
      successMsg: '"한국어로 편지 쓸 수 있어요." — 쓰다 无받침 → ㄹ 수 있어요.',
      choices: [
        { ko: '한국어로 편지 쓸 수 있어요.', correct: true },
        { ko: '한국어로 편지 쓸수 있어요.', correct: false },
        { ko: '한국어로 편지 쓸 수 없어요.', correct: false },
        { ko: '한국어로 편지 쓰을 수 있어요.', correct: false },
      ],
    },
    {
      id: 'd38-o4',
      kind: 'particle-error',
      zhHint: '能吃泡菜。', zhHintEn: 'I can eat kimchi.',
      successMsg: '먹다 有收音 → **을 수 있어요**。ㄹ / 을 看收音。', successMsgEn: '먹다 has a batchim → **을 수 있어요**. Choose ㄹ / 을 based on the batchim.',
      choices: [
        { ko: '김치를 먹을 수 있어요.', correct: true },
        { ko: '김치를 먹ㄹ 수 있어요.', correct: false },
        { ko: '김치를 먹수 있어요.', correct: false },
        { ko: '김치를 먹을수 있어요.', correct: false },
      ],
    },
    {
      id: 'd38-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 38 全对。第一碗饭，第一次没翻车。', successMsgEn: '✓ Day 38 all correct. First bowl of rice, first time not messing up.',
      pairs: [
        { ko: '요리', zh: '做饭', zhEn: 'cooking' },
        { ko: '볶다', zh: '炒', zhEn: 'to stir-fry' },
        { ko: '자르다', zh: '切', zhEn: 'Cut' },
        { ko: '재료', zh: '食材', zhEn: 'ingredients' },
        { ko: '기름', zh: '油', zhEn: 'Oil' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '첫 요리 성공! 엄마가 이모티콘 하나 딱 보내주셨어요.',
    preview: '这周六，学校要补讲한글날——世宗大王和韩文字母的一节课。', previewEn: 'This Saturday, school is making up a class on 한글날 — a lesson on King Sejong and the Korean alphabet.',
    stickerId: 'sticker-d38',
    sceneImageUrl: '/images/diary/day-38-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~(으)ㄹ 수 있어요 和 ~(으)ㄹ 줄 알아요 有什么区别？」「김치볶음밥 怎么做？」',
};
