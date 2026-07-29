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
  title: '自己做饭 · 第一次没翻车',
  subtitle: 'Haru来教泡菜炒饭——原来我也可以',
  heroImageUrl: '/images/diary/day-38-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 11일 · 금요일 저녁',
    weather: '兽尔 · 晴',
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
      zh: '料理/做饭',
      pos: '名词',
      example: { ko: '요리를 배우고 있어요.', zh: '正在学做饭。' },
      tip: '料(요) + 理(리)。요리하다 = 做饭。요리사 = 厨师',
    },
    {
      id: 'd38-w2',
      korean: '볶다',
      hangul: 'bok-da',
      zh: '炒',
      pos: '动词',
      example: { ko: '김치를 볶아요.', zh: '炒泡菜。' },
      tip: '发音 [복따]。볶음밥 = 炒饭。제일 쉬운 요리 방법',
    },
    {
      id: 'd38-w3',
      korean: '자르다',
      hangul: 'ja-reu-da',
      zh: '切',
      pos: '动词',
      example: { ko: '김치를 잘게 잘라요.', zh: '把泡菜切小块。' },
      tip: '르 不规则：자르다 → 잘라요（不是자르어요）',
    },
    {
      id: 'd38-w4',
      korean: '재료',
      hangul: 'jae-ryo',
      zh: '材料/食材',
      pos: '名词',
      example: { ko: '재료가 다 있어요.', zh: '食材都齐了。' },
      tip: '材(재) + 料(료)。요리 재료 = 做饭食材',
    },
    {
      id: 'd38-w5',
      korean: '팬',
      hangul: 'paen',
      zh: '平底锅',
      pos: '名词',
      example: { ko: '팬에 기름을 둘러요.', zh: '在平底锅里放油。' },
      tip: '英语 pan 的外来语。냄비(炖锅) vs 팬(平底煎锅)',
    },
    {
      id: 'd38-w6',
      korean: '기름',
      hangul: 'gi-reum',
      zh: '油',
      pos: '名词',
      example: { ko: '기름을 좀 둘러요.', zh: '放一点油。' },
      tip: '기름을 두르다 = 放油/淋油。做菜必备',
    },
  ],

  dialogue: {
    scene: '301号房·厨房小台',
    setting: {
      time: '周五晚 7:00',
      place: 'Tori的宿舍·迷你厨房',
      npc: 'Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리, 오늘은 김치볶음밥 만들어 볼래?',
        hangul: 'to-ri, o-neu-reun kim-chi-bok-kkeum-bap man-deu-reo bol-lae?',
        zh: '兔莉，今天要不要试试做泡菜炒饭？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '음… 나 할 수 있을까?',
        hangul: 'eum… na hal su i-sseul-kka?',
        zh: '嗯……我能做得来吗？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '당연히 할 수 있어. 재료 다 있어.',
        hangul: 'dang-yeon-hi hal su i-sseo. jae-ryo da i-sseo',
        zh: '当然能。食材都齐了。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '팬이 뜨거워… 진짜 요리사 같아.',
        hangul: 'pae-ni tteu-geo-wo… jin-jja yo-ri-sa ga-ta',
        zh: '锅好烫……感觉像个真的厨师了。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '엄마, 나 요리할 수 있어요!',
        hangul: 'eom-ma, na yo-ri-hal su i-sseo-yo!',
        zh: '妈妈，我会做饭了！',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru尝完饭说好吃。Tori想说"下次我做给你吃"。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '다음엔 내가 해줄게.', zh: '下次我做给你吃。', correct: true },
          { ko: '다음엔 네가 해줘.', zh: '下次你做给我吃。', correct: false },
          { ko: '내일 또 먹을래?', zh: '明天还要吃吗？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '会/能___：~(으)ㄹ 수 있어요 / 없어요',
    pattern: 'V 어간 + **(으)ㄹ 수 있어요 / 없어요**',
    whenToUse: '表达"能不能做___"的能力/可能性。Day 38 Tori 第一次说 「나 요리할 수 있어요」（我会做饭了）。**있어요** = 能，**없어요** = 不能。这是初级学韩语第一个"自我肯定"的句型。',
    rules: [
      '**基本公式**：动词词干 + (으)ㄹ 수 있어요 = 能___。收音判断决定 **ㄹ** 还是 **을**',
      '**无收音 → ~ㄹ 수 있어요**：가다 → 갈 수 있어요（能去）。마시다 → 마실 수 있어요（能喝）',
      '**有收音 → ~을 수 있어요**：먹다 → 먹을 수 있어요（能吃）。읽다 → 읽을 수 있어요（能读）',
      '**否定 → ~(으)ㄹ 수 없어요 / 못**：两种说法都可。매운 거 못 먹어요 或 매운 거 먹을 수 없어요 都对'
    ],
    examples: [
      { ko: '나 요리할 수 있어요.', zh: '我会做饭。', highlight: '할 수 있어요', note: '요리하다 → 할 수 있어요。Day 38 Tori 对妈妈说的原句' },
      { ko: '김치볶음밥 만들 수 있어.', zh: '会做泡菜炒饭。', highlight: '만들 수 있어', note: '만들다 ㄹ收音特殊 — 直接接 **ㄹ 수 있어**（不重复ㄹ）' },
      { ko: '매운 거는 잘 못 먹어요.', zh: '我不太能吃辣。', highlight: '못 먹어요', note: '못 + 동사 = 更口语的"不能"。못 먹다 / 못 가다 高频' },
      { ko: '한국어로 편지 쓸 수 있어요.', zh: '能用韩语写信。', highlight: '쓸 수 있어요', note: '쓰다 无받침 → **ㄹ 수 있어요**。자기 성장 표현' },
    ],
    pitfall:
      '① 收音判断决定 ㄹ / 을：❌ 먹ㄹ 수 있어요 → ✅ 먹**을** 수 있어요。② ㄹ受音动词（만들다/살다/알다）**不重复ㄹ**：만들 수 있어요（O） / 만들ㄹ 수 있어요（X）。③ **못** vs **~(으)ㄹ 수 없다**：口语更常用 못（못 먹어요），书面/正式用 ~(으)ㄹ 수 없다。두 가지 다 맞음.',
  },

  output: [
    {
      id: 'd38-o1',
      kind: 'compose',
      zhHint: '妈妈，我会做饭了！',
      tokens: ['엄마', '나', '요리할 수 있어요', '요리해요', '요리했어요', '못 해요'],
      composeAnswer: ['엄마', '나', '요리할 수 있어요'],
      successMsg: 'Tori给妈妈发出的那条消息。可以了。',
    },
    {
      id: 'd38-o2',
      kind: 'listen-choice',
      audioKo: '매운 거는 잘 못 먹어요.',
      successMsg: '✓ 못 + 动词 = 口语版"不能"。',
      choices: [
        { zh: '我不太能吃辣。', correct: true },
        { zh: '我很爱吃辣。', correct: false },
        { zh: '辣的东西不好吃。', correct: false },
        { zh: '我没吃辣的。', correct: false },
      ],
    },
    {
      id: 'd38-o3',
      kind: 'zh-to-ko',
      zhPrompt: '能用韩语写信。',
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
      zhHint: '能吃泡菜。',
      successMsg: '먹다 有收音 → **을 수 있어요**。ㄹ / 을 看收音。',
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
      successMsg: '✓ Day 38 全对。第一碗饭，第一次没翻车。',
      pairs: [
        { ko: '요리', zh: '做饭' },
        { ko: '볶다', zh: '炒' },
        { ko: '자르다', zh: '切' },
        { ko: '재료', zh: '食材' },
        { ko: '기름', zh: '油' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '첫 요리 성공! 엄마가 이모티콘 하나 딱 보내주셨어요.',
    preview: '这周六，学校要补讲한글날——世宗大王和韩文字母的一节课。',
    stickerId: 'sticker-d38',
    sceneImageUrl: '/images/diary/day-38-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~(으)ㄹ 수 있어요 和 ~(으)ㄹ 줄 알아요 有什么区别？」「김치볶음밥 怎么做？」',
};
