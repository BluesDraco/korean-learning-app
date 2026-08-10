import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 14 · 咖啡馆点单 · 口误连环
 *
 * 剧情：Tori 去了从没去过的新店「하루카페」，没有朋友帮忙。
 * 金毛大狗店员在收银台后。她想点热拿铁，说成了"热的冰的"；
 * 糖度说成了"甜的咸的"；店员憋着笑帮她纠正。
 * 最终她端到了正确的咖啡——虽然过程惨不忍睹，但她一个人做到了。
 *
 * 学习目标：咖啡馆完整6句 / 形容词反义 / 独立点单
 * 语料层级：해요体
 * 韩语自审：korean skill PASS（자연성/문법/발음 三关）
 */
export const day14: ToriDay = {
  level: 'beginner',
  day: 14,
  phase: 'foundation',
  title: '咖啡馆点单', titleEn: 'Ordering at a café',
  subtitle: '没有朋友帮忙，从打招呼到道谢全靠自己', subtitleEn: 'No friend to help—from greeting to thanking, all on your own.',
  heroImageUrl: '/images/diary/day-14-hero.jpg',
  estimatedMin: 15,

  opening: {
    date: '9월 14일 · 토요일 오후',
    weather: '兽尔 · 晴', weatherEn: 'Seoul · Sunny',
    toriPose: 'nervous',
    diaryText: `9月 14日，周六下午。

我决定一个人去一家新咖啡馆。
Haru 给了地址，Minji 给了祝福，Junho 说"혼자 갈 수 있어!"（你自己能行！）

推开门，收银台后站着一只巨大的金毛犬。
他系着格子围裙，声音温柔但低到震桌。

我深吸一口气："따뜻한… 아이스 라떼…"
（热的……冰拿铁……）

他笑了。

然后我说了更离谱的：설탕 짜게 주세요.（糖，要咸的。）

他笑出了声，轻轻说："달게?"
（甜的吗？）

我脸已经红到耳朵尖了。
"네, 네, 달게요. 죄송해요."

最后，当我端着一杯真正的——热的、甜的——拿铁坐下时，
我盯着那个纸杯，盯着杯子上歪歪扭扭写着的"Tori"两个字，
笑了。
一个人，完成了。`,
  },

  words: [
    {
      id: 'd14-w1',
      korean: '주문',
      hangul: 'ju-mun',
      zh: '订单 / 点单', zhEn: 'Order',
      pos: '名词', posEn: 'Noun',
      example: { ko: '주문 도와드릴게요.', zh: '我帮您点单。', zhEn: 'I\'ll take your order.' },
      tip: '动词 주문하다。店员常用语 도와드릴게요 是"我来帮您"', tipEn: 'Verb 주문하다. Staff\'s common phrase 도와드릴게요 means "I\'ll help you."',
    },
    {
      id: 'd14-w2',
      korean: '따뜻한',
      hangul: 'tta-tteu-tan',
      zh: '热的', zhEn: 'Hot',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '따뜻한 라떼 주세요.', zh: '请给我热拿铁。', zhEn: 'Please give me a hot latte.' },
      tip: '따뜻하다 的定语形。Tori 今天说反了一次——注意不是 차가운(冰的)', tipEn: 'Adnominal form of 따뜻하다. Tori said it backwards once today—note it\'s not 차가운 (iced).',
    },
    {
      id: 'd14-w3',
      korean: '차가운',
      hangul: 'cha-ga-un',
      zh: '冰的', zhEn: 'Iced',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '차가운 아메리카노 주세요.', zh: '请给我冰美式。', zhEn: 'Please give me an iced Americano.' },
      tip: '차갑다 的定语形。아이스 是外来词，차가운 是纯韩语的说法', tipEn: 'Adnominal form of 차갑다. 아이스 is a loanword; 차가운 is the pure Korean term.',
    },
    {
      id: 'd14-w4',
      korean: '달게',
      hangul: 'dal-ge',
      zh: '甜的（副词形）', zhEn: 'Sweet (adverbial form)',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '달게 해 주세요.', zh: '请做成甜的。', zhEn: 'Please make it sweet.' },
      tip: '달다 → 달게。反义词 짜게(咸的)。Tori 今天说反了……', tipEn: '달다 → 달게. Antonym 짜게 (salty). Tori said it backwards today...',
    },
    {
      id: 'd14-w5',
      korean: '포장',
      hangul: 'po-jang',
      zh: '外带 / 打包', zhEn: 'Takeout',
      pos: '名词', posEn: 'Noun',
      example: { ko: '포장이에요.', zh: '是外带。', zhEn: 'It\'s for takeout.' },
      tip: '反义词 드시고 가세요(堂食)。对应对子一定要记清', tipEn: 'Antonym 드시고 가세요 (dine-in). Make sure to remember the pairs.',
    },
    {
      id: 'd14-w6',
      korean: '맛있게 드세요',
      hangul: 'ma-sit-ge deu-se-yo',
      zh: '请慢用', zhEn: 'Enjoy your meal',
      pos: '表达', posEn: 'Expression',
      example: { ko: '라떼 나왔어요. 맛있게 드세요.', zh: '拿铁好了，请慢用。', zhEn: 'Your latte is ready, enjoy.' },
      tip: '店员递咖啡时的固定结束语。맛있게(好吃的) + 드세요(请用)', tipEn: 'A fixed closing phrase when the barista hands over coffee. 맛있게 (deliciously) + 드세요 (please eat)',
    },
  ],

  dialogue: {
    scene: '하루카페 收银台', sceneEn: 'Haru Cafe counter',
    setting: {
      time: '下午 2 点', timeEn: '2 PM',
      place: '하루카페 收银台', placeEn: 'Haru Cafe counter',
      npc: '金毛店员', npcEn: 'Golden retriever barista',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '金毛店员', npcNameEn: 'Golden retriever barista',
        ko: '어서 오세요. 주문 도와드릴게요.',
        hangul: 'eo-seo-o-se-yo. ju-mun do-wa-deu-ril-ge-yo',
        zh: '欢迎光临。我帮您点单。', zhEn: 'Welcome. I\'ll take your order.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '따뜻한… 아이스 라떼…',
        hangul: 'tta-tteu-tan… a-i-seu ra-tte…',
        zh: '热的……冰拿铁……（说错了——Tori 把两个相反的词拼一起了）', zhEn: 'Hot... iced latte... (messed up—Tori combined two opposite words)',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '金毛店员', npcNameEn: 'Golden retriever barista',
        ko: '따뜻한 아이스요?',
        hangul: 'tta-tteu-tan a-i-seu-yo',
        zh: '热的冰吗？（憋笑）', zhEn: 'Hot iced? (holding back a laugh)',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '아, 아니요! 따뜻한 라떼요!',
        hangul: 'a, a-ni-yo! tta-tteu-tan ra-tte-yo!',
        zh: '啊，不是！热拿铁！', zhEn: 'Ah, no! Hot latte!',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '설탕… 짜게…',
        hangul: 'seol-tang… jja-ge…',
        zh: '糖……咸的……（又说错了——짜게是咸的。店员憋笑："달게?"）', zhEn: 'Sugar... salty... (messed up again—짜게 means salty. The barista holds back a laugh: "달게?")',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 네, 달게요. 죄송해요.',
        hangul: 'ne, ne, dal-ge-yo. joe-song-hae-yo',
        zh: '是，是的，甜的。对不起。', zhEn: 'Yes, yes, sweet. Sorry.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '죽고 싶다… 근데 커피는 왔다!',
        hangul: 'juk-go sip-da… geun-de keo-pi-neun wat-da!',
        zh: '想死……但是咖啡来了！', zhEn: 'I want to die... but the coffee\'s here!',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '金毛店员', npcNameEn: 'Golden retriever barista',
        ko: '드시고 가세요, 포장이세요?',
        hangul: 'deu-si-go ga-se-yo, po-jang-i-se-yo?',
        zh: '堂食还是外带？', zhEn: 'For here or to go?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Tori 想坐下来喝——应该怎么回答？', zhEn: 'Tori wants to sit down and drink—how should she answer?',
        practice: 'pick',
        choices: [
          { ko: '여기서 먹을게요.', zh: '堂食（在这里喝）。', zhEn: 'For here (drink here).', correct: true },
          { ko: '포장이에요. 가져갈게요.', zh: '外带。带走。（Tori 想坐下来喝，语境不对）', zhEn: 'To go. Take away. (Tori wants to sit down, so this doesn\'t fit)', correct: false },
          { ko: '따뜻한 아이스요.', zh: '热的冰。（刚才已经纠正过一次了）', zhEn: 'Hot iced. (Already corrected once)', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '形容词变形 · 咖啡厅生存韩语', titleEn: 'Adjective conjugation · Survival Korean at the café',
    pattern: '따뜻한 / 차가운（定语形） + N  /  달게 / 짜게（副词形） + 해 주세요', patternEn: '따뜻한 / 차가운 (attributive form) + N / 달게 / 짜게 (adverbial form) + 해 주세요',
    whenToUse: 'Chapter 2 收官——Day 14 兔莉在咖啡厅把"甜的"说成"咸的"，闹了笑话。但这也是最深刻的教训。形容词在韩语里放到名词前（定语形）和放到动词前（副词形）要变形，规则简单但一紧张就容易错。', whenToUseEn: 'Chapter 2 finale—Day 14: Tori said "salty" instead of "sweet" at the café, causing a funny blunder. But it was also the most memorable lesson. In Korean, adjectives change form when placed before nouns (attributive) versus before verbs (adverbial). The rule is simple, but easy to mess up when nervous.',
    rules: [
      '**形容词定语形（修饰名词）**：词干 + 은/ㄴ。有收音 → 은（작은 컵 = 小杯子），无收音 → ㄴ（예쁜 꽃 = 漂亮的花）。特殊：ㅂ不规则 → 先变 운/운 再加（춥다 → 추운 날씨 = 冷的天气；덥다 → 더운 여름 = 热的夏天）',
      '**따뜻한 vs 차가운**：따뜻하다(温暖) → 따뜻한 = 热的/温的（定语）。차갑다(冰冷) → 차가운 = 冰的（定语，ㅂ不规则：차갑 → 차가 + 운 = 차가운）。따뜻한 라떼 = 热拿铁、차가운 아메리카노 = 冰美式',
      '**形容词副词形（修饰动词）**：词干 + 게 = ___地。달다(甜) → 달게 = 甜地。짜다(咸) → 짜게 = 咸地。맛있다(好吃) → 맛있게 = 好吃地。韩语的"请做成甜/咸的" = 달게/짜게 해 주세요（甜地/咸地 做 + 请给我）',
      '**해 주세요 组合**：하다(做) + 아/어 + 주세요 = 请给我做___。달게 해 주세요 = 请做成甜的。차갑게 해 주세요 = 请做成冰的。形容词副词形 + 해 주세요 = 请按这种方式做',
      '**温度四兄弟**：뜨겁다(烫) > 따뜻하다(温/暖) > 시원하다(凉爽) > 차갑다(冰冷)。中文"热"可能对应 뜨거운(烫) 或 따뜻한(温暖)——咖啡用 따뜻한，汤用 뜨거운。차가운 = 冰的，시원한 = 凉爽（夏天舒服的凉）',
      '**味道五兄弟**：달다(甜) / 짜다(咸) / 맵다(辣) / 시다(酸) / 쓰다(苦)。各变副词形：달게 / 짜게 / 맵게 / 시게 / 쓰게。맵게 해 주세요 = 请做成辣的',
      '**咖啡厅万能句型**：___ 한 잔 주세요（请给我一杯___）。따뜻한/차가운 + 饮料名 + 한 잔 + 주세요。한 잔 = 一杯（量词）。아메리카노 한 잔 주세요（请给我一杯美式）',
      '**Chapter 2 知识回顾**：Day 8 고 싶어요（想做）+ Day 9 이거/그거/저거（指点）+ Day 10 있어요/없어요（有没有）+ Day 11 指示词升级 + Day 12 汉字数（价格）+ Day 13 病情描述 → Day 14 全部在咖啡厅场景综合运用',
    ],
    examples: [
      { ko: '따뜻한 라떼 한 잔 주세요.', zh: '请给我一杯热拿铁。', zhEn: 'Please give me a hot latte.', highlight: '따뜻한 + 한 잔', note: '따뜻하다 → 따뜻한(定语)。한 잔(一杯) + 주세요(Day 2)。完整的咖啡厅点单句式', noteEn: '따뜻하다 → 따뜻한 (attributive). 한 잔 (one cup) + 주세요 (Day 2). A complete café ordering pattern.' },
      { ko: '차가운 아메리카노 주세요.', zh: '请给我冰美式。', zhEn: 'Please give me an iced Americano.', highlight: '차가운', note: '차갑다 → 차가운(ㅂ不规则)。口语常说 아이스 아메리카노(ice americano)', noteEn: '차갑다 → 차가운 (ㅂ irregular). In speech, people often say 아이스 아메리카노 (ice americano).' },
      { ko: '달게 해 주세요.', zh: '请做成甜的。', zhEn: 'Please make it sweet.', highlight: '달게 해 주세요', note: '달다 → 달게(副词形) + 하다 → 해 + 주세요 = 请做甜的。兔莉说错成 짜게 的翻车现场', noteEn: '달다 → 달게 (adverbial) + 하다 → 해 + 주세요 = make it sweet. The scene where Tori messed up and said 짜게 instead.' },
      { ko: '맛있게 드세요.', zh: '请慢用。', zhEn: 'Please enjoy.', highlight: '맛있게', note: '맛있다 → 맛있게(副词形) + 드세요(吃的敬语)。店员递餐的固定结束语，不可少', noteEn: '맛있다 → 맛있게 (adverbial) + 드세요 (honorific for eating). A fixed closing phrase when the barista serves the food—essential.' },
      { ko: '뜨거우니까 조심하세요.', zh: '因为烫，请小心。', zhEn: 'It\'s hot, so please be careful.', highlight: '뜨거우니까', note: '뜨겁다 → 뜨거우 + 니까(因为)。ㅂ不规则。조심하다 = 小心', noteEn: '뜨겁다 → 뜨거우 + 니까 (because). ㅂ irregular. 조심하다 = to be careful' },
      { ko: '차가운 것 하고 따뜻한 것 주세요.', zh: '请给我冰的和热的。', zhEn: 'Please give me one iced and one hot.', highlight: '하고', note: '것(东西) 的书面形。하고 = 和(Day 11复习)。两种温度都要的句型', noteEn: '것 (thing) written form. 하고 = and (Day 11 review). Pattern for wanting both temperatures' },
    ],
    pitfall:
      '① 달다(甜) vs 짜다(咸) 发音混淆——달 词头 ㄷ 平音、字音张口，짜 词头 ㅉ 紧音、字音收紧。嘴型和气流都要区分。② 차갑다 是 ㅂ不规则 → 차가운，不是 차갑은 ❌。所有 ㅂ结尾形容词都按此规则。③ 한 잔 的 한 是**固有数词** 하나 修饰量词时的变形（하나 → 한），不能说 일 잔 ❌——数东西用固有数，价格用汉字数。④ 对咖啡师说 짜게 해 주세요 = 咸拿铁——绝对不要犯 Tori 的错误！',
  },

  output: [
    {
      id: 'd14-o1',
      kind: 'compose',
      zhHint: '请给我一杯热拿铁。', zhHintEn: 'Please give me a hot latte.',
      tokens: ['따뜻한', '라떼', '한 잔', '주세요', '차가운', '짜게'],
      composeAnswer: ['따뜻한', '라떼', '한 잔', '주세요'],
      successMsg: '✓ 热的。不是冰的。第一次说对了。', successMsgEn: '✓ Hot. Not iced. Got it right the first time.',
    },
    {
      id: 'd14-o2',
      kind: 'compose',
      zhHint: '我帮您点单。（店员常用语）', zhHintEn: 'I\'ll take your order. (Common staff phrase)',
      tokens: ['주문', '도와드릴게요', '받으세요', '주세요', '맛있게', '드세요'],
      composeAnswer: ['주문', '도와드릴게요'],
      successMsg: '✓ 金毛店员在格子围裙上擦了擦手，开始帮你点单。', successMsgEn: '✓ The golden retriever barista wiped their hands on the checkered apron and started taking your order.',
    },
    {
      id: 'd14-o3',
      kind: 'listen-choice',
      audioKo: '맛있게 드세요.',
      successMsg: '✓ 「请慢用」。——店员递出咖啡的最后一句，每个韩国人都会说。', successMsgEn: '✓ "Enjoy." — The last thing the barista says when handing over the coffee. Every Korean says it.',
      choices: [
        { zh: '请慢用。', zhEn: 'Please enjoy.', correct: true },
        { zh: '请带走。', zhEn: 'To go, please.', correct: false },
        { zh: '请等一下。', zhEn: 'Please wait a moment.', correct: false },
        { zh: '请再点。', zhEn: 'Please order again.', correct: false },
      ],
    },
    {
      id: 'd14-o4',
      kind: 'zh-to-ko',
      zhPrompt: '啊，不是！热拿铁！（纠正自己的口误）', zhPromptEn: 'Ah, no! Hot latte! (Correcting a slip of the tongue)',
      successMsg: '"아, 아니요!" 是纠正口误的标准开头。Tori 今天用了三次。', successMsgEn: '"아, 아니요!" is the standard way to start correcting a slip. Tori used it three times today.',
      choices: [
        { ko: '아, 아니요! 따뜻한 라떼요!', correct: true },
        { ko: '네, 맞아요. 따뜻한 라떼요.', correct: false },
        { ko: '아, 아니요! 차가운 라떼요!', correct: false },
        { ko: '네, 아니요. 따뜻한 라떼요.', correct: false },
      ],
    },
    {
      id: 'd14-o5',
      kind: 'match-pair',
      successMsg: '✓ 通关！咖啡是对的，口误是学费。金毛店员给你多挤了一层奶泡 🥕', successMsgEn: '✓ Level clear! The coffee was right, the slips were tuition. The golden retriever barista added an extra layer of foam for you 🥕',
      pairs: [
        { ko: '주문', zh: '点单', zhEn: 'Order' },
        { ko: '따뜻한', zh: '热的', zhEn: 'Hot' },
        { ko: '차가운', zh: '冰的', zhEn: 'Iced' },
        { ko: '포장', zh: '外带', zhEn: 'takeout' },
        { ko: '맛있게 드세요', zh: '请慢用', zhEn: 'Enjoy your meal' },
      ],
    },
  ],

  recap: {
    toriPose: 'celebrate',
    praise: '🎉 通关！口误四次，咖啡一杯，但靠自己一个人点到了。토리, 대단해요!', praiseEn: '🎉 Level clear! Four slips, one coffee, but you ordered it all by yourself. 토리, 대단해요!',
    preview: '下周开始——找房子、签合同。兽尔的独立生活，真正开始了。', previewEn: 'Starting next week — finding a place, signing a lease. Sio\'s independent life truly begins.',
    stickerId: 'sticker-d14',
    sceneImageUrl: '/images/diary/day-14-scene.jpg',
  },

  carrotHint:
    '通关！可以问胡萝卜「韩语咖啡厅完整对话」「달다和짜다怎么分」「形容词副词形게怎么用」',
};
