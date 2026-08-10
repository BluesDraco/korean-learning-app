import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 9 · CU 便利店 · 第一次自己买饭
 *
 * 剧情：Tori 饿得肚子叫，自己下楼去 CU 便利店。
 * 懒洋洋的考拉店员靠在收银台后。
 * Tori 用 이거/그거/저거 比划了一通，成功买到了三角饭团+香蕉牛奶。
 * 结账时手抖把零钱撒了一地，考拉哥哥淡定地等她。
 *
 * 学习目标：指示代词 이거/그거/저거 / 数字 1-10 / 便利店物品
 * 语料层级：해요体
 * 韩语自审：korean skill PASS（자연성/문법/발음 三关）
 */
export const day9: ToriDay = {
  level: 'beginner',
  day: 9,
  phase: 'foundation',
  title: 'CU 便利店 · 第一次自己买饭', titleEn: 'CU convenience store · First time buying a meal by myself',
  subtitle: '一个金枪鱼三角饭团 + 一瓶香蕉牛奶', subtitleEn: 'A tuna triangle kimbap + a bottle of banana milk',
  heroImageUrl: '/images/diary/day-09-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 9일 · 월요일 아침',
    weather: '兽尔 · 晴', weatherEn: 'Seoul · Sunny',
    toriPose: 'shy',
    diaryText: `9月 9日，周一早上 8:30。
肚子叫得能吓到 Haru。
我没等她起床，自己下楼去 CU。

考拉店员靠在收银台后面打哈欠，
他说"안녕하세요"的时候像在叹气。

我盯着冰柜半天——
紫菜包饭分참치（金枪鱼）、참깨（芝麻）、매운닭（辣鸡）三种。
最后挑了金枪鱼。
转身又抓了一瓶香蕉牛奶——真的是亮黄色，妈妈见了肯定笑。

结账时我指着袋里的东西说：
"이거 주세요. 그리고 이것도요."
（请给我这个。还有这个也请给我。）

考拉哥哥扫码："2,800원이에요."
我掏硬币时手一抖，零钱撒了一地。

他没有笑，只是淡淡地说：
"천천히 하세요."
（慢慢来。）

我一个人买饭成功了。`,
  },

  words: [
    {
      id: 'd09-w1',
      korean: '편의점',
      hangul: 'pyeo-nui-jeom',
      zh: '便利店', zhEn: 'Convenience store',
      pos: '名词', posEn: 'Noun',
      example: { ko: '편의점에 가요.', zh: '我去便利店。', zhEn: 'I\'m going to the convenience store.' },
      tip: '韩国便利店密度全球第一。CU、GS25、7-Eleven 三足鼎立', tipEn: 'Korea has the highest convenience store density in the world. CU, GS25, and 7-Eleven dominate.',
    },
    {
      id: 'd09-w2',
      korean: '삼각김밥',
      hangul: 'sam-gak-gim-bap',
      zh: '三角紫菜包饭', zhEn: 'Triangle kimbap',
      pos: '名词', posEn: 'Noun',
      example: { ko: '삼각김밥 하나 주세요.', zh: '请给我一个三角饭团。', zhEn: 'Please give me a triangle kimbap.' },
      tip: '삼각(三角) + 김밥(紫菜包饭)。便利店神级早餐', tipEn: '삼각 (triangle) + 김밥 (kimbap). The ultimate convenience store breakfast.',
    },
    {
      id: 'd09-w3',
      korean: '바나나우유',
      hangul: 'ba-na-na-u-yu',
      zh: '香蕉牛奶', zhEn: 'Banana milk',
      pos: '名词', posEn: 'Noun',
      example: { ko: '바나나우유 한 병 주세요.', zh: '请给我一瓶香蕉牛奶。', zhEn: 'Please give me a bottle of banana milk.' },
      tip: '韩国国民饮料。亮黄色塑料罐子，走到哪都看得到', tipEn: 'Korea\'s national drink. Bright yellow plastic bottle, you see it everywhere.',
    },
    {
      id: 'd09-w4',
      korean: '이거',
      hangul: 'i-geo',
      zh: '这个', zhEn: 'This',
      pos: '代词', posEn: 'Pronoun',
      example: { ko: '이거 주세요.', zh: '请给我这个。', zhEn: 'Please give me this.' },
      tip: '口语用「이거」，正式书面用「이것」。指着东西时用', tipEn: 'Use "이거" in speech, "이것" in formal writing. Use when pointing at something.',
    },
    {
      id: 'd09-w5',
      korean: '그거',
      hangul: 'geu-geo',
      zh: '那个（对方那边的）', zhEn: 'That one (near the other person)',
      pos: '代词', posEn: 'Pronoun',
      example: { ko: '그거 얼마예요?', zh: '那个多少钱？', zhEn: 'How much is that?' },
      tip: '店员手里的、收银台上的——用 그거。远处货架上的——用 저거', tipEn: 'For what the clerk is holding or what\'s on the counter—use 그거. For what\'s on a shelf far away—use 저거.',
    },
    {
      id: 'd09-w6',
      korean: '저거',
      hangul: 'jeo-geo',
      zh: '那个（远处的）', zhEn: 'that one (over there)',
      pos: '代词', posEn: 'Pronoun',
      example: { ko: '저거 뭐예요?', zh: '那个（远处）是什么？', zhEn: 'What is that (over there)?' },
      tip: '저(那边) + 거(东西)。收银台远端的架子上—用 저거', tipEn: '저 (over there) + 거 (thing). For the shelf at the far end of the counter—use 저거.',
    },
  ],

  dialogue: {
    scene: 'CU 便利店收银台', sceneEn: 'CU convenience store counter',
    setting: {
      time: '早上 8:30', timeEn: '8:30 AM',
      place: '宿舍楼下 CU', placeEn: 'CU downstairs from the dorm',
      npc: '考拉店员', npcEn: 'Koala barista',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '考拉店员', npcNameEn: 'Koala barista',
        ko: '안녕하세요. 계산 도와드릴게요.',
        hangul: 'an-nyeong-ha-se-yo. gye-san do-wa-deu-ril-ge-yo',
        zh: '你好，我帮您结账。', zhEn: 'Hello, I\'ll ring you up.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '이거 주세요. 그리고 이것도요.',
        hangul: 'i-geo ju-se-yo. geu-ri-go i-geot-do-yo',
        zh: '请给我这个。还有这个也是。', zhEn: 'I\'ll take this one. And this too, please.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '考拉店员', npcNameEn: 'Koala barista',
        ko: '네. 2,800원이에요.',
        hangul: 'ne. i-cheon-pal-baek-won-i-e-yo',
        zh: '好的，2800 韩元。', zhEn: 'Okay, that\'ll be 2,800 won.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '여기요. 죄송해요, 천천히…',
        hangul: 'yeo-gi-yo. joe-song-hae-yo, cheon-cheon-hi',
        zh: '给你。对不起，慢一点…', zhEn: 'Here you go. Sorry, a bit slow…',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '혼자 샀다! 성공!',
        hangul: 'hon-ja sat-da! seong-gong!',
        zh: '自己买到了！成功！', zhEn: 'I bought it myself! Success!',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '考拉哥哥说"천천히 하세요"，Tori 零钱撒了一地觉得很不好意思——该说什么？', zhEn: 'Koala oppa said "천천히 하세요" and Tori dropped her change everywhere, feeling embarrassed—what should she say?',
        practice: 'pick',
        choices: [
          { ko: '감사합니다. 천천히 할게요.', zh: '谢谢。我会慢慢来的。（道谢+回应）', zhEn: 'Thank you. I\'ll take my time. (Thanking + responding)', correct: true },
          { ko: '죄송합니다, 안 살게요.', zh: '对不起，不买了。（放弃买东西——不合逻辑）', zhEn: 'Sorry, I won\'t buy it. (Giving up on buying—doesn\'t make sense)', correct: false },
          { ko: '여기는 편의점이에요.', zh: '这里是便利店。（考拉当然知道，不对题）', zhEn: 'This is a convenience store. (Koala obviously knows that—irrelevant)', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '指示代词 · 이거 / 그거 / 저거', titleEn: 'Demonstrative pronouns · 이거 / 그거 / 저거',
    pattern: '**이거**（我这边）/ **그거**（你那边）/ **저거**（远处）', patternEn: '**이거** (near me) / **그거** (near you) / **저거** (far away)',
    whenToUse: '韩国便利店、市场、餐厅里指着东西点单必备。韩语空间指示分三层（我/你/远处），比中文"这个/那个"多一层，掌握后韩国生活方便十倍。Day 9 兔莉在便利店买三角饭团和香蕉牛奶。', whenToUseEn: 'Essential for pointing at items to order in Korean convenience stores, markets, and restaurants. Korean spatial deixis has three levels (me/you/far), one more than Chinese\'s "this/that"—master it and life in Korea gets ten times easier. Day 9: Tori buys a triangle kimbap and banana milk at the convenience store.',
    rules: [
      '**三层空间体系**：이(这·说话人附近) / 그(那·听话人附近或刚才提过的) / 저(那·两人都远的第三方)。中文只有"这/那"两层，韩语多了一层"对方那边"',
      '**口语 vs 书面**：口语 = 이거/그거/저거（거 = 것的口语缩写）。书面 = 이것/그것/저것。便利店、日常对话一律用口语 거。写作文、正式文件用 것',
      '**이거 = 我手边的东西**：이거 주세요（请给我这个）、이거 얼마예요?（这个多少钱？）。你指的东西在你手边或离你近',
      '**그거 = 对方那边/刚才提过的**：그거 주세요（请给我那个·在对方那边）、그거 얼마예요?（你刚才说的那个多少钱？）。对话中"你刚说的那个"也属于 그',
      '**저거 = 远处第三方**：저거 보세요（看那边那个）、저거 뭐예요?（远处那个是什么？）。两人都够不着、视线所及的远处',
      '**加助词**：이거는（这个呢·主题）、이거를（把这个·宾格）。口语常省略助词直接说 이거 주세요',
      '**이것도 / 저것도**：도 = 也。이것도 주세요（这个也请给我）。两个东西都要时万能句',
      '**이것저것**：这个那个 = 各种各样。이것저것 다 샀어요（这个那个全买了）。固定搭配，不可写成 이거저거',
    ],
    examples: [
      { ko: '이거 주세요.', zh: '请给我这个。', zhEn: 'Please give me this.', highlight: '이거', note: '이(这) + 거(东西·口语)。我手边的东西，指着说', noteEn: '이 (this) + 거 (thing, colloquial). For something right by me, said while pointing.' },
      { ko: '그거 얼마예요?', zh: '那个多少钱？', zhEn: 'How much is that?', highlight: '그거', note: '그(你那边/刚提的) + 거。问对方那边的东西或刚才提过的物品', noteEn: '그 (your side/just mentioned) + 거. For something on the other person\'s side or something just mentioned.' },
      { ko: '저거 뭐예요?', zh: '那个（远处）是什么？', zhEn: 'What is that (over there)?', highlight: '저거', note: '저(远处) + 거。两人都够不着的远处东西', noteEn: '저 (far) + 거. For something far away that neither can reach.' },
      { ko: '이것도 주세요.', zh: '这个也请给我。', zhEn: 'I\'ll take this too, please.', highlight: '이것 + 도', note: '이것(正式"这个") + 도(也)。再加一样东西时的标准表达', noteEn: '이것 (formal "this") + 도 (also). Standard way to add another item.' },
      { ko: '그리고 이것도요.', zh: '还有这个也是。', zhEn: 'And this one too.', highlight: '그리고 + 도', note: '그리고(还有/而且) + 이것도요。兔莉在便利店点两个东西的组合句', noteEn: '그리고 (and/also) + 이것도요. Tori\'s combined sentence ordering two items at the convenience store.' },
      { ko: '저것 좀 보세요.', zh: '请看那边那个。', zhEn: 'Please look at that one over there.', highlight: '저것 + 좀', note: '저것(远处那个) + 좀(请·委婉)。좀 让请求更柔和', noteEn: '저것 (that over there) + 좀 (please, softening). 좀 makes the request softer.' },
    ],
    pitfall:
      '① 中文"那个"不分远近，但韩语严格分 그거(对方那边)和 저거(远处)。问店员"那个多少钱"时如果东西在对方身后货架上 → 그거 얼마예요? ✅，不是 저거 얼마예요? ❌。② 이것저것 是固定搭配不能写成 이거저거。③ 正式场合（商务邮件、报告）用 이것/그것/저것，不用口语 거。',
  },

  output: [
    {
      id: 'd09-o1',
      kind: 'compose',
      zhHint: '请给我这个。（在便利店指着东西说）', zhHintEn: 'Please give me this. (Pointing at something at the convenience store.)',
      tokens: ['이거', '주세요', '저거', '그거', '이것도요', '주실래요'],
      composeAnswer: ['이거', '주세요'],
      successMsg: '考拉哥哥按下了扫码枪 ✓', successMsgEn: 'Koala oppa pressed the barcode scanner ✓',
    },
    {
      id: 'd09-o2',
      kind: 'listen-choice',
      audioKo: '바나나우유 한 병 주세요.',
      successMsg: '✓ 「请给我一瓶香蕉牛奶」。「한 병」= 一瓶（固有数 하나 搭量词时变「한」）。', successMsgEn: '✓ "Please give me a bottle of banana milk." 한 병 = one bottle (native number 하나 becomes 한 before a counter).',
      choices: [
        { zh: '请给我一瓶香蕉牛奶。', zhEn: 'Please give me a bottle of banana milk.', correct: true },
        { zh: '请给我一瓶可乐。', zhEn: 'Please give me a cola.', correct: false },
        { zh: '请给我一个三角饭团。', zhEn: 'Please give me a triangle kimbap.', correct: false },
        { zh: '请给我两杯咖啡。', zhEn: 'Please give me two cups of coffee.', correct: false },
      ],
    },
    {
      id: 'd09-o3',
      kind: 'zh-to-ko',
      zhPrompt: '请给我这个。还有这个也是。', zhPromptEn: 'I\'ll take this one. And this too, please.',
      successMsg: '"이것도요" = "这个也（请给我）"。「도」是「也」，省略 주세요 是口语。', successMsgEn: '"이것도요" = "This too (please give me)." 도 means "also," and dropping 주세요 is colloquial.',
      choices: [
        { ko: '이거 주세요. 그리고 이것도요.', correct: true },
        { ko: '그거 주세요. 그리고 이것도요.', correct: false },
        { ko: '이거 주세요. 그리고 그것도요.', correct: false },
        { ko: '저거 주세요. 그리고 저것도요.', correct: false },
      ],
    },
    {
      id: 'd09-o4',
      kind: 'particle-error',
      zhHint: '请给我两杯咖啡。', zhHintEn: 'Please give me two cups of coffee.',
      successMsg: '두(2) + 量词「잔」(杯) → 「두 잔」。固有数 둘 搭量词时变「두」。', successMsgEn: '두 (2) + counter 잔 (cup) → 두 잔. Native number 둘 becomes 두 before a counter.',
      choices: [
        { ko: '커피 두 잔 주세요.', correct: true },
        { ko: '커피 둘 잔 주세요.', correct: false },
        { ko: '커피 이 잔 주세요.', correct: false },
        { ko: '커피 두 병 주세요.', correct: false },
      ],
    },
    {
      id: 'd09-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 9 核心词全部对上。一个人买饭成功，考拉哥哥的哈欠也跟着说了再见。', successMsgEn: '✓ Day 9 core words all matched. Successfully bought food alone, and Koala oppa\'s yawn also said goodbye.',
      pairs: [
        { ko: '편의점', zh: '便利店', zhEn: 'Convenience store' },
        { ko: '삼각김밥', zh: '三角饭团', zhEn: 'Triangle rice ball' },
        { ko: '이거', zh: '这个', zhEn: 'This' },
        { ko: '그거', zh: '那个(对方)', zhEn: 'that (the other person)' },
        { ko: '저거', zh: '那个(远处)', zhEn: 'that one (over there)' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '一个人买饭成功！而且记住了"천천히 하세요"。토리, 너무 잘했어요!', praiseEn: 'Successfully bought food alone! And remembered "천천히 하세요." Tori, you did so well!',
    preview: '明天中午 Junho 要拉我去学校食堂。听说要学会"有没有"这两个万能词——있어요 / 없어요。', previewEn: 'Tomorrow at noon, Junho is dragging me to the school cafeteria. I hear I need to learn the two all-purpose words for "have/have not"—있어요 / 없어요.',
    stickerId: 'sticker-d09',
    sceneImageUrl: '/images/diary/day-09-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「韩国便利店常见食物有哪些」「数字 1-10 怎么读」「点单怎么说"还有这个"」',
};
