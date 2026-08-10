import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 48 · 한국 영화 · 心听得懂
 *
 * 剧情：Junho带大家去看韩国电影。Tori看了一半发现没懂剧情，
 * 但从演员的表情和音乐里感受到了情感。散场后Junho给她讲剧情。
 * Tori想——虽然听不懂话，但心听得懂。
 *
 * 学习目标：대조 ~지만 (복습) / 부연 ~는데 / 영화 어휘
 * 语料层级：해요体 + 반말
 * 韩语自审：korean skill PASS
 */
export const day48: ToriDay = {
  level: 'intermediate',
  day: 18,
  phase: 'expansion',
  title: '看电影 · 韩国电影课',
  subtitle: '一半听不懂，但心听得懂',
  heroImageUrl: '/images/diary/day-48-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 20일 · 일요일 저녁',
    weather: '兽尔 · 秋雨',
    toriPose: 'shy',
    diaryText: `10月20日，周日晚上。

弘爪 CGV 5号厅。
四人一排——Junho、我、Haru、Minji。

Junho选的片子是最近很火的一部——
"동물의 계절"（动物的季节）。
海报上一只鹿看着夕阳。

灯暗下来。

第一句台词我没懂。
第二句我没懂。
第三句是俚语我更没懂。

但我看到——
鹿妈妈在森林里找孩子的表情，
配着钢琴慢慢慢慢的音符，
突然一下就哭了。

我不知道具体的剧情，
但那种"找不到孩子"的心情，
不需要翻译。

散场后大家去麦当劳。
Junho咬着薯条给我复盘：
"저 사슴 엄마가 사냥꾼한테 아이 잃었잖아—"
（那鹿妈妈被猎人夺走了孩子——）

我点头。
一句话一句话对照的时候，
之前哭的地方，我又哭了一遍。

한국말은 아직 반은 못 알아듣지만,
마음은 다 알아들었어요.
（韩语我还有一半听不懂，
但心，全都听懂了。）`,
  },

  words: [
    {
      id: 'd48-w1',
      korean: '영화',
      hangul: 'yeong-hwa',
      zh: '电影',
      pos: '名词',
      example: { ko: '한국 영화를 봤어요.', zh: '看了韩国电影。' },
      tip: '映(영) + 画(화)。영화관 = 电影院',
    },
    {
      id: 'd48-w2',
      korean: '대사',
      hangul: 'dae-sa',
      zh: '台词',
      pos: '名词',
      example: { ko: '이 영화 대사가 어려워요.', zh: '这部电影台词很难。' },
      tip: '台(대) + 词(사)。대사가 빠르다 = 台词快',
    },
    {
      id: 'd48-w3',
      korean: '이해하다',
      hangul: 'i-hae-ha-da',
      zh: '理解',
      pos: '动词',
      example: { ko: '반은 이해했어요.', zh: '理解了一半。' },
      tip: '理(이) + 解(해) + 하다。이해가 되다 = 能理解',
    },
    {
      id: 'd48-w4',
      korean: '표정',
      hangul: 'pyo-jeong',
      zh: '表情',
      pos: '名词',
      example: { ko: '배우 표정이 진짜였어요.', zh: '演员表情很真。' },
      tip: '表(표) + 情(정)。표정이 좋다/나쁘다',
    },
    {
      id: 'd48-w5',
      korean: '감동',
      hangul: 'gam-dong',
      zh: '感动',
      pos: '名词',
      example: { ko: '너무 감동했어요.', zh: '太感动了。' },
      tip: '感(감) + 动(동)。감동적이다 = 感人的 / 감동받다 = 受感动',
    },
    {
      id: 'd48-w6',
      korean: '자막',
      hangul: 'ja-mak',
      zh: '字幕',
      pos: '名词',
      example: { ko: '자막이 없어서 힘들었어요.', zh: '没字幕所以很难。' },
      tip: '字(자) + 幕(막)。영화 자막 = 电影字幕',
    },
  ],

  dialogue: {
    scene: 'CGV·散场后麦当劳',
    setting: {
      time: '周日晚 22:15',
      place: 'CGV 5호관 → 맥도날드',
      npc: 'Junho / Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '어때, 재밌었어?',
        hangul: 'eo-ttae, jae-mi-sseo-sseo?',
        zh: '怎么样，好看吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '반은 이해 못 했지만, 감동은 다 느꼈어.',
        hangul: 'ba-neun i-hae mot haet-ji-man, gam-dong-eun da neu-kkyeo-sseo',
        zh: '一半没懂，但感动全感受到了。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '나도 처음엔 그랬어. 한국어보다 마음이 빨라.',
        hangul: 'na-do cheo-eu-men geu-rae-sseo. han-gu-geo-bo-da ma-eu-mi ppal-la',
        zh: '我一开始也这样。心比韩语快。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '저 사슴 엄마가 사냥꾼한테 아이 잃었잖아—',
        hangul: 'jeo sa-seum eom-ma-ga sa-nyang-kkun-han-te a-i i-reo-sseot-ja-na',
        zh: '那鹿妈妈被猎人夺走了孩子——',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '자막이 있으면 좋은데, 없어서 진짜 힘들었어.',
        hangul: 'ja-ma-gi i-sseu-myeon jo-eun-de, eop-seo-seo jin-jja him-deu-reo-sseo',
        zh: '有字幕就好了，没有真的很难。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Junho说下次要不看没字幕的挑战片。Tori想说"下次带字幕的吧"。合适的回应？',
        practice: 'pick',
        choices: [
          { ko: '다음엔 자막 있는 걸로 보자.', zh: '下次看有字幕的吧。', correct: true },
          { ko: '자막 없는 게 재밌어.', zh: '没字幕更有意思。', correct: false },
          { ko: '다시는 영화 안 봐.', zh: '再也不看电影了。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '虽然___但___：~지만 / ~는데',
    pattern: 'V/A + **지만** · V + **는데** / A + **(으)ㄴ데**',
    whenToUse: '两种最刚需的"转折/铺垫"连接。**~지만** = 明确的"虽然但是"；**~는데** = 语感更柔的"话锋一转/带铺垫"。Tori 说 「반은 이해 못 했**지만** 감동은 다 느꼈어」= 虽然一半没懂，但感动全懂了。Day 30 초급 결말学过~지만，这次深化+对比~는데。',
    rules: [
      '**~지만 直接接**：V/A 어간 + 지만。좋다 → 좋**지만** / 있다 → 있**지만** / 매웠다 → 매웠**지만**',
      '**~는데(动词现在)/~(으)ㄴ데(形容词)**：있다→있**는데** / 예쁘다→예**쁜데** / 좋다→좋**은데**',
      '**~지만 =明确转折 / ~는데 =话锋铺垫**：매운데 맛있어요（辣但好吃 · 带铺垫感） vs 맵지만 맛있어요（虽然辣但好吃 · 直白）',
      '**~는데 高频度**：韩国人对话里 ~는데 频率远高于 ~지만，讲原因/铺垫/委婉都用它'
    ],
    examples: [
      { ko: '반은 이해 못 했지만 감동은 다 느꼈어.', zh: '虽然一半没懂，但感动全懂了。', highlight: '못 했지만 ... 느꼈어', note: '이해하다 → 이해 못 하다 + 았지만。명확 대조' },
      { ko: '자막이 있으면 좋은데, 없어서 힘들었어.', zh: '有字幕就好了，可惜没有。', highlight: '좋은데 ... 없어서', note: '좋다 형용사 → **좋은데**。전제 + 아쉬움 표현. Tori原句' },
      { ko: '한국어보다 마음이 빨라.', zh: '心比韩语快。', highlight: '보다 ... 빨라', note: 'Day 45学过的 ~보다 复习。Haru的一句诗意' },
      { ko: '영화가 재미있는데 자막이 없어요.', zh: '电影有意思，可惜没字幕。', highlight: '재미있는데', note: '재미있다 动词形 → **있는데**。~는데 铺垫用法' },
    ],
    pitfall:
      '① 动词用 **는데**（있는데/가는데），形容词用 **(으)ㄴ데**（예쁜데/좋은데）—— 混用是初中级最常见错误。② ~지만 语感直白，~는데 语感柔软/日常。写正式发表用 ~지만，聊天用 ~는데。③ ~는데 除了转折还有**铺垫**功能：여기 김치찌개 시켰는데 진짜 맛있어요 = 我点了泡菜汤，超好吃（不是转折）—— 这是母语者最常用法。',
  },

  output: [
    {
      id: 'd48-o1',
      kind: 'compose',
      zhHint: '虽然一半没懂，但感动全懂了。',
      tokens: ['반은', '이해 못 했지만', '감동은', '다 느꼈어', '이해했지만', '못 느꼈어'],
      composeAnswer: ['반은', '이해 못 했지만', '감동은', '다 느꼈어'],
      successMsg: '~지만 명확 대조。今天最重要的一句。',
    },
    {
      id: 'd48-o2',
      kind: 'listen-choice',
      audioKo: '한국어보다 마음이 빨라.',
      successMsg: '✓ Haru的诗意一句。~보다 比较句复习.',
      choices: [
        { zh: '心比韩语快。', correct: true },
        { zh: '韩语说得快。', correct: false },
        { zh: '韩语比心慢。', correct: false },
        { zh: '心不快。', correct: false },
      ],
    },
    {
      id: 'd48-o3',
      kind: 'zh-to-ko',
      zhPrompt: '电影有意思，可惜没字幕。',
      successMsg: '"영화가 재미있는데 자막이 없어요." — 재미있다(V) → 있는데.',
      choices: [
        { ko: '영화가 재미있는데 자막이 없어요.', correct: true },
        { ko: '영화가 재미있은데 자막이 없어요.', correct: false },
        { ko: '영화가 재미있는데 자막이 있어요.', correct: false },
        { ko: '영화가 재미있지만 자막을 없어요.', correct: false },
      ],
    },
    {
      id: 'd48-o4',
      kind: 'particle-error',
      zhHint: '有字幕就好了。',
      successMsg: '좋다(형용사) → **좋은데**。형용사 ~(으)ㄴ데.',
      choices: [
        { ko: '자막이 있으면 좋은데.', correct: true },
        { ko: '자막이 있으면 좋는데.', correct: false },
        { ko: '자막이 있으면 좋다는데.', correct: false },
        { ko: '자막이 있어서 좋은데.', correct: false },
      ],
    },
    {
      id: 'd48-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 48 全对。一半没懂，但心听懂了。',
      pairs: [
        { ko: '영화', zh: '电影' },
        { ko: '대사', zh: '台词' },
        { ko: '표정', zh: '表情' },
        { ko: '감동', zh: '感动' },
        { ko: '자막', zh: '字幕' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '한국말은 아직 반쯤. 마음은 이미 다. — 그 사이가 지금 토리.',
    preview: '明天Minji和Junho吵翻了——Tori第一次站出来调解。',
    stickerId: 'sticker-d48',
    sceneImageUrl: '/images/diary/day-48-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~지만 和 ~는데 什么时候用？」「~(으)ㄴ데 和 ~는데 怎么选？」',
};
