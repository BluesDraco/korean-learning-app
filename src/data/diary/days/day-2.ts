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
  title: '飞机上 · 第一次说韩语', titleEn: 'On the plane · First time speaking Korean',
  subtitle: '一杯可乐 = 半个胜利', subtitleEn: 'One cola = half a victory',
  heroImageUrl: '/images/diary/day-02-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 2일 · 비행기 안',
    weather: '云层之上', weatherEn: 'Above the clouds',
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
"콜라 한 잔 주세요."

她笑了。我也笑了。
胡萝卜在口袋里好像也笑了一下。`,
  },

  words: [
    {
      id: 'd02-w1',
      korean: '네',
      hangul: 'ne',
      zh: '是 / 好', zhEn: 'Yes / Okay',
      pos: '感叹词', posEn: 'Interjection',
      example: { ko: '네, 알겠어요.', zh: '好的，我明白了。', zhEn: 'Okay, I understand.' },
      tip: '韩语里说"是"用「네」，比「예」更日常', tipEn: 'In Korean, \'yes\' is \'네\', which is more casual than \'예\'.',
    },
    {
      id: 'd02-w2',
      korean: '아니요',
      hangul: 'a-ni-yo',
      zh: '不是 / 不用', zhEn: 'No / Not needed',
      pos: '感叹词', posEn: 'Interjection',
      example: { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。', zhEn: 'No need, it\'s fine.' },
      tip: '婉拒别人的好意必备', tipEn: 'Essential for politely declining someone\'s kindness',
    },
    {
      id: 'd02-w3',
      korean: '콜라',
      hangul: 'kol-la',
      zh: '可乐', zhEn: 'Cola',
      pos: '名词', posEn: 'Noun',
      example: { ko: '콜라 한 잔 주세요.', zh: '请给我一杯可乐。', zhEn: 'Please give me a cola.' },
      tip: '韩国外来语很多直接音译。咖啡=커피，啤酒=맥주（这个不是音译）', tipEn: 'Many Korean loanwords are direct transliterations. Coffee=커피, beer=맥주 (this one isn\'t a transliteration).',
    },
    {
      id: 'd02-w4',
      korean: '주세요',
      hangul: 'ju-se-yo',
      zh: '请给我', zhEn: 'Please give me',
      pos: '表达', posEn: 'Expression',
      example: { ko: '물 한 잔 주세요.', zh: '请给我一杯水。', zhEn: 'Please give me a glass of water.' },
      tip: '韩国生活第一句神咒。能说出这三个字，半个韩国就通了', tipEn: 'The first magic phrase for living in Korea. Say these three words, and half of Korea opens up.',
    },
    {
      id: 'd02-w5',
      korean: '감사합니다',
      hangul: 'gam-sa-ham-ni-da',
      zh: '谢谢（正式）', zhEn: 'Thank you (formal)',
      pos: '表达', posEn: 'Expression',
      example: { ko: '도와주셔서 감사합니다.', zh: '谢谢您的帮助。', zhEn: 'Thank you for your help.' },
      tip: '「고마워요」是熟人之间，「감사합니다」是对所有人都用得起的安全牌', tipEn: '\'고마워요\' is for close acquaintances, \'감사합니다\' is a safe card for everyone.',
    },
    {
      id: 'd02-w6',
      korean: '죄송합니다',
      hangul: 'joe-song-ham-ni-da',
      zh: '对不起（正式）', zhEn: 'Sorry (formal)',
      pos: '表达', posEn: 'Expression',
      example: { ko: '늦어서 죄송합니다.', zh: '对不起我迟到了。', zhEn: 'Sorry I\'m late.' },
      tip: '比「미안해요」更正式。对长辈、对陌生人用', tipEn: 'More formal than \'미안해요\'. Use it with elders and strangers.',
    },
  ],

  dialogue: {
    scene: '飞机上 · 餐车经过', sceneEn: 'On the plane · Cart passing by',
    setting: {
      time: '飞机起飞后 1 小时', timeEn: '1 hour after takeoff',
      place: '机舱 28F 座位', placeEn: 'Seat 28F in the cabin',
      npc: '仙鹤空乘', npcEn: 'Crane flight attendant',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '仙鹤空乘', npcNameEn: 'Crane flight attendant',
        ko: '음료수 드릴까요?',
        hangul: 'eum-nyo-su deu-ril-kka-yo',
        zh: '需要饮料吗？', zhEn: 'Would you like a drink?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 콜라 한 잔 주세요.',
        hangul: 'ne, kol-la han jan ju-se-yo',
        zh: '好的，请给我一杯可乐。', zhEn: 'Yes, please give me a cola.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '仙鹤空乘', npcNameEn: 'Crane flight attendant',
        ko: '얼음 드릴까요?',
        hangul: 'eo-reum deu-ril-kka-yo',
        zh: '要冰块吗？', zhEn: 'Would you like ice?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '아니요, 괜찮아요.',
        hangul: 'a-ni-yo, gwaen-cha-na-yo',
        zh: '不用了，谢谢。', zhEn: 'No, thank you.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '해냈다! 첫 한국어!',
        hangul: 'hae-naet-da! cheot han-gu-geo!',
        zh: '做到了！第一句韩语！', zhEn: 'You did it! Your first Korean sentence!',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '空乘把可乐递过来，兔莉应该说什么？', zhEn: 'The flight attendant hands over the cola—what should Tori say?',
        practice: 'pick',
        choices: [
          { ko: '감사합니다.', zh: '谢谢。', zhEn: 'Thank you.', correct: true },
          { ko: '죄송합니다.', zh: '对不起。', zhEn: 'I\'m sorry.', correct: false },
          { ko: '안녕하세요.', zh: '你好。', zhEn: 'Hello.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '请给我 ___ : ~ 주세요', titleEn: 'Please give me ___ : ~ 주세요',
    pattern: 'N + 을/를 (可省略) + 주세요', patternEn: 'N + 을/를 (optional) + 주세요',
    whenToUse: '点单、问别人要东西、请求帮忙。韩国生活第一个万能句型：只要在名词后加「주세요」就变成礼貌请求。', whenToUseEn: 'Ordering, asking for something, requesting help. The first all-purpose phrase for life in Korea: just add \'주세요\' after a noun to make a polite request.',
    rules: [
      '**基本公式**：名词 + 주세요。无论名词有没有收音，都直接用 `N + 주세요`',
      '**有收音名词**：물(水,받침 ㄹ) + 주세요 → 물 주세요（请给我水）',
      '**无收音名词**：콜라(可乐,无받침) + 주세요 → 콜라 주세요（请给我可乐）',
      '**加宾格助词**（更标准）：N + 을/를 + 주세요。有收音 → 을（물**을** 주세요），无收音 → 를（콜라**를** 주세요）',
      '**口语省略**：日常对话中 을/를 常省略，콜라 주세요 比 콜라를 주세요 更常见',
      '**敬语升级**：주세요 → 부탁드립니다（最礼貌），对长辈/正式场合：「메뉴 부탁드립니다」（请给我菜单）',
      '**组合动词**：动词词干 + 아/어 + 주세요 = 请帮我做 ___。도와(帮) + 주세요 → 도와주세요（请帮帮我）',
      '**否定**：주세요 没有直接否定。拒绝时用「아니요, 괜찮아요」（不用了，没关系）。不要用「안 주세요」❌',
    ],
    examples: [
      { ko: '콜라 주세요.', zh: '请给我可乐。', zhEn: 'Please give me a cola.', highlight: '주세요', note: '콜라 无받침，直接加 주세요。口语省略 을/를' },
      { ko: '물 한 잔 주세요.', zh: '请给我一杯水。', zhEn: 'Please give me a glass of water.', highlight: '주세요', note: '물(水) + 한 잔(一杯，量词) + 주세요。한 잔 夹在中间', noteEn: '물 (water) + 한 잔 (one cup, counter) + 주세요. 한 잔 goes in between.' },
      { ko: '메뉴 주세요.', zh: '请给我菜单。', zhEn: 'Please give me the menu.', highlight: '주세요', note: '메뉴 无받침 → 直接加 주세요。餐厅第一步' },
      { ko: '도와주세요!', zh: '请帮帮我！', zhEn: 'Please help me!', highlight: '도와주세요', note: '돕다(帮) → 도와(词干变形) + 주세요 = 请帮我。固定组合', noteEn: '돕다 (to help) → 도와 (stem change) + 주세요 = please help me. A fixed combination.' },
      { ko: '메뉴 부탁드립니다.', zh: '麻烦给我菜单。（最礼貌）', zhEn: 'Could I have the menu, please? (Most polite)', highlight: '부탁드립니다', note: '比 주세요 更正式，对长辈或高级餐厅用', noteEn: 'More formal than 주세요, used with elders or at upscale restaurants.' },
      { ko: '콜라를 주세요.', zh: '请给我可乐。（加宾格助词）', zhEn: 'Please give me a cola. (With object particle)', highlight: '를', note: '콜라 无받침 → 宾格 조사 를。加了更语法正确，但口语常省略' },
    ],
    pitfall:
      '① 不要对 주세요 加否定：안 주세요 ❌ → 괜찮아요 ✅。② 「주세요」不是"请"的万能翻译——"请坐"是 앉으세요，不是 앉 주세요。③ 对老师/老板用 부탁드립니다 比 주세요 更得体。',
  },

  output: [
    {
      id: 'd02-o1',
      kind: 'compose',
      zhHint: '请给我一杯可乐。', zhHintEn: 'Please give me a cola.',
      tokens: ['콜라', '주세요', '얼음', '감사합니다', '아니요'],
      composeAnswer: ['콜라', '주세요'],
      successMsg: '空乘姐姐笑着把可乐递过来了 🥤', successMsgEn: 'The flight attendant smiles and hands over the cola 🥤',
    },
    {
      id: 'd02-o2',
      kind: 'listen-choice',
      audioKo: '물 한 잔 주세요.',
      successMsg: '✓ 是「请给我一杯水」。「물」(水) + 「한 잔」(一杯) + 「주세요」。', successMsgEn: '✓ It\'s \'Please give me a glass of water.\' \'물\' (water) + \'한 잔\' (one glass) + \'주세요\'.',
      choices: [
        { zh: '请给我一杯水。', zhEn: 'Please give me a glass of water.', correct: true },
        { zh: '请给我一杯可乐。', zhEn: 'Please give me a cola.', correct: false },
        { zh: '请给我冰块。', zhEn: 'Please give me some ice.', correct: false },
        { zh: '不用了，谢谢。', zhEn: 'No, thank you.', correct: false },
      ],
    },
    {
      id: 'd02-o3',
      kind: 'zh-to-ko',
      zhPrompt: '好的，请给我一杯可乐。', zhPromptEn: 'Yes, please give me a cola.',
      successMsg: '"네, 콜라 한 잔 주세요." — 兔莉的人生第一次韩语点单。', successMsgEn: '"Yes, one cola, please." — Tori\'s first-ever Korean order.',
      choices: [
        { ko: '네, 콜라 한 잔 주세요.', correct: true },
        { ko: '아니요, 콜라 한 잔 주세요.', correct: false },
        { ko: '네, 콜라 부탁해요.', correct: false },
        { ko: '콜라 네 주세요.', correct: false },
      ],
    },
    {
      id: 'd02-o4',
      kind: 'particle-error',
      zhHint: '请给我一杯可乐。', zhHintEn: 'Please give me a cola.',
      successMsg: '콜라 无받침 → 을/를 省略也可。口语中最常见的点单句式。',
      choices: [
        { ko: '콜라 한 잔 주세요.', correct: true },
        { ko: '콜라에 한 잔 주세요.', correct: false },
        { ko: '콜라가 한 잔 주세요.', correct: false },
        { ko: '콜라은 한 잔 주세요.', correct: false },
      ],
    },
    {
      id: 'd02-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 2 核心词全部对上。下了飞机，一切才刚刚开始。', successMsgEn: '✓ Day 2 core vocabulary all checks out. Off the plane, and it\'s only just beginning.',
      pairs: [
        { ko: '네', zh: '是 / 好', zhEn: 'Yes / Okay' },
        { ko: '아니요', zh: '不是 / 不用', zhEn: 'No / Not needed' },
        { ko: '주세요', zh: '请给我', zhEn: 'Please give me' },
        { ko: '감사합니다', zh: '谢谢（正式）', zhEn: 'Thank you (formal)' },
        { ko: '죄송합니다', zh: '对不起（正式）', zhEn: 'Sorry (formal)' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '第一次对韩国人说出了韩语。토리, 진짜 잘했어요!', praiseEn: 'The first time speaking Korean to a Korean person. Tori, you did great!',
    preview: '明天就要落地仁爪了。机场出口，会发生什么呢？我已经有点紧张了。', previewEn: 'Tomorrow we land at Incheon. What will happen at the airport exit? I\'m already a little nervous.',
    stickerId: 'sticker-d02',
    sceneImageUrl: '/images/diary/day-02-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：可以问它「飞机上韩语怎么说水/咖啡/茶」「주세요前面要加什么助词吗」',
};
