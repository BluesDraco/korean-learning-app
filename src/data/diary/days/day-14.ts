import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 14 · ★关卡 2 · 咖啡馆点单 · 口误连环
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
  title: '★关卡 2 · 咖啡馆点单',
  subtitle: '没有朋友帮忙，从打招呼到道谢全靠自己',
  isCheckpoint: 14,
  estimatedMin: 15,

  opening: {
    date: '9月 14日 周五 下午',
    weather: '兽尔 · 晴',
    toriPose: 'nervous',
    diaryText: `9月 14日，周五下午。

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
      zh: '订单 / 点单',
      pos: '名词',
      example: { ko: '주문 도와드릴게요.', zh: '我帮您点单。' },
      tip: '动词 주문하다。店员常用语 도와드릴게요 是"我来帮您"',
    },
    {
      id: 'd14-w2',
      korean: '따뜻한',
      hangul: 'tta-tteu-tan',
      zh: '热的',
      pos: '形容词',
      example: { ko: '따뜻한 라떼 주세요.', zh: '请给我热拿铁。' },
      tip: '따뜻하다 的定语形。Tori 今天说反了一次——注意不是 차가운(冰的)',
    },
    {
      id: 'd14-w3',
      korean: '차가운',
      hangul: 'cha-ga-un',
      zh: '冰的',
      pos: '形容词',
      example: { ko: '차가운 아메리카노 주세요.', zh: '请给我冰美式。' },
      tip: '차갑다 的定语形。아이스 是外来词，차가운 是纯韩语的说法',
    },
    {
      id: 'd14-w4',
      korean: '달게',
      hangul: 'dal-ge',
      zh: '甜的（副词形）',
      pos: '副词',
      example: { ko: '달게 해 주세요.', zh: '请做成甜的。' },
      tip: '달다 → 달게。反义词 짜게(咸的)。Tori 今天说反了……',
    },
    {
      id: 'd14-w5',
      korean: '포장',
      hangul: 'po-jang',
      zh: '外带 / 打包',
      pos: '名词',
      example: { ko: '포장이에요.', zh: '是外带。' },
      tip: '反义词 드시고 가세요(堂食)。对应对子一定要记清',
    },
    {
      id: 'd14-w6',
      korean: '맛있게 드세요',
      hangul: 'ma-sit-ge deu-se-yo',
      zh: '请慢用',
      pos: '表达',
      example: { ko: '라떼 나왔어요. 맛있게 드세요.', zh: '拿铁好了，请慢用。' },
      tip: '店员递咖啡时的固定结束语。맛있게(好吃的) + 드세요(请用)',
    },
  ],

  dialogue: {
    scene: '하루카페 收银台',
    setting: {
      time: '下午 2 点',
      place: '하루카페 收银台',
      npc: '金毛店员',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '金毛店员',
        ko: '어서 오세요. 주문 도와드릴게요.',
        hangul: 'eo-seo-o-se-yo. ju-mun do-wa-deu-ril-ge-yo',
        zh: '欢迎光临。我帮您点单。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '따뜻한… 아이스 라떼…',
        hangul: 'tta-tteu-tan… a-i-seu ra-tte…',
        zh: '热的……冰拿铁……（说错了——Tori 把两个相反的词拼一起了）',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '金毛店员',
        ko: '따뜻한 아이스요?',
        hangul: 'tta-tteu-tan a-i-seu-yo',
        zh: '热的冰吗？（憋笑）',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '아, 아니요! 따뜻한 라떼요!',
        hangul: 'a, a-ni-yo! tta-tteu-tan ra-tte-yo!',
        zh: '啊，不是！热拿铁！',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '설탕… 짜게…',
        hangul: 'seol-tang… jja-ge…',
        zh: '糖……咸的……（又说错了——짜게是咸的。店员憋笑："달게?"）',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 네, 달게요. 죄송해요.',
        hangul: 'ne, ne, dal-ge-yo. joe-song-hae-yo',
        zh: '是，是的，甜的。对不起。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '죽고 싶다… 근데 커피는 왔다!',
        hangul: 'juk-go sip-da… geun-de keo-pi-neun wat-da!',
        zh: '想死……但是咖啡来了！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '金毛问"드시고 가세요, 포장이세요?"（堂食还是外带？），Tori 想坐下来喝——选哪句？',
        practice: 'pick',
        choices: [
          { ko: '드시고 가요. 여기서 먹어요.', zh: '堂食。在这里喝。', correct: true },
          { ko: '포장이에요. 가져갈게요.', zh: '外带。带走。（Tori 想坐下来喝，语境不对）', correct: false },
          { ko: '따뜻한 아이스요.', zh: '热的冰。（刚才已经纠正过一次了）', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '形容词反义 · 咖啡厅常用',
    pattern: '**따뜻한**(热) / **차가운**(冰) / **달게**(甜) / **짜게**(咸)',
    whenToUse: '咖啡厅、餐厅里描述温度、口味。别跟 Tori 一样说反。',
    rules: [
      '**따뜻한** = 热的（定语形）：따뜻한 라떼 = 热拿铁',
      '**차가운** = 冰的（定语形）：차가운 아메리카노 = 冰美式',
      '**달게** = 甜的（副词形）：달게 해 주세요 = 请做成甜的',
      '**짜게** = 咸的（副词形）：짜게 해 주세요 = 请做成咸的（别对咖啡说这句）',
    ],
    examples: [
      { ko: '따뜻한 라떼 한 잔 주세요.', zh: '请给我一杯热拿铁。', highlight: '따뜻한', note: '**따뜻한** = 따뜻하다 的定语形，修饰后面的名词 라떼' },
      { ko: '차가운 아메리카노 주세요.', zh: '请给我冰美式。', highlight: '차가운', note: '**차가운** = 차갑다 的定语形。口语里也常说 아이스 아메리카노' },
      { ko: '달게 해 주세요.', zh: '请做成甜的。', highlight: '달게', note: '**달게** = 달다(甜) + 게(副词形)。"甜的"→"짜게"是 Tori 今天的经典口误' },
      { ko: '맛있게 드세요.', zh: '请慢用。', highlight: '맛있게', note: '**맛있게** = 맛있다(好吃) + 게→"好吃地"。店员递餐的固定结束句' },
    ],
    pitfall:
      '짜다 = 咸，달다 = 甜。两个字都是 2 个韩文音节，不要搞反。Tori 今天的翻车现场就是最好的教训：짜게 라떼 주세요？那杯咖啡绝对不能喝。',
  },

  output: [
    {
      id: 'd14-o1',
      kind: 'compose',
      zhHint: '请给我一杯热拿铁。（关卡综合）',
      tokens: ['따뜻한', '라떼', '한 잔', '주세요', '차가운', '짜게'],
      composeAnswer: ['따뜻한', '라떼', '한 잔', '주세요'],
      successMsg: '✓ 热的。不是冰的。第一次说对了。',
    },
    {
      id: 'd14-o2',
      kind: 'compose',
      zhHint: '我帮您点单。（店员常用语）',
      tokens: ['주문', '도와드릴게요', '받으세요', '주세요', '맛있게', '드세요'],
      composeAnswer: ['주문', '도와드릴게요'],
      successMsg: '✓ 金毛店员在格子围裙上擦了擦手，开始帮你点单。',
    },
    {
      id: 'd14-o3',
      kind: 'listen-choice',
      audioKo: '맛있게 드세요.',
      successMsg: '✓ 「请慢用」。——店员递出咖啡的最后一句，每个韩国人都会说。',
      choices: [
        { zh: '请慢用。', correct: true },
        { zh: '请带走。', correct: false },
        { zh: '请等一下。', correct: false },
        { zh: '请再点。', correct: false },
      ],
    },
    {
      id: 'd14-o4',
      kind: 'zh-to-ko',
      zhPrompt: '啊，不是！热拿铁！（纠正自己的口误）',
      successMsg: '"아, 아니요!" 是纠正口误的标准开头。Tori 今天用了三次。',
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
      successMsg: '✓ 关卡 2 通关！咖啡是对的，口误是学费。金毛店员给你多挤了一层奶泡 🥕',
      pairs: [
        { ko: '주문', zh: '点单' },
        { ko: '따뜻한', zh: '热的' },
        { ko: '차가운', zh: '冰的' },
        { ko: '포장', zh: '外带' },
        { ko: '맛있게 드세요', zh: '请慢用' },
      ],
    },
  ],

  recap: {
    toriPose: 'celebrate',
    praise: '🎉 关卡 2 通关！口误四次，咖啡一杯，但靠自己一个人点到了。토리, 대단해요!',
    preview: '下周开始——找房子、签合同。兽尔的独立生活，真正开始了。',
    stickerId: 'sticker-d14',
  },

  carrotHint:
    '关卡通关！可以问胡萝卜「韩语咖啡厅完整对话」「달다和짜다怎么分」「形容词副词形게怎么用」',
};
