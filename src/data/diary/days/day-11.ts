import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 11 · 다이소 · 这个 / 那个 / 那个远的
 *
 * 剧情：兔莉宿舍漏了——洗发水快没了、毛巾没买、拖鞋偏小。
 * Junho 拍胸："다이소 가자! 거기서 다 있어!"
 * 一只温柔的羊店员站在收银台后。Tori 指着远处货架上的洗发水问"저거 얼마예요?"
 * 羊店员笑着说："저거요? 천 원이에요." 一千元！Tori 决定一次买齐生活全套。
 *
 * 学习目标：이거 / 그거 / 저거 综合应用 / 다이소 生活词
 * 韩语自审：korean skill PASS
 */
export const day11: ToriDay = {
  level: 'beginner',
  day: 11,
  phase: 'foundation',
  title: '다이소 · 这个 / 那个 / 那个远的',
  subtitle: '所有东西都 1000 元的奇妙世界',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9월 12일 화요일 저녁',
    weather: '首尔 · 阴',
    toriPose: 'cheer',
    diaryText: `9月 12日，周二傍晚。

宿舍清单一片狼藉：
샴푸（洗发水）剩半瓶、수건（毛巾）只有飞机上发的那条、
拖鞋偏小到大拇指无处安放……

Junho 拍我肩膀："다이소 가자! 거기서 다 있어!"
（去 Daiso！那里啥都有！）

다이소 = 韩国的"千元百货"。
店里货架很高，所有标签都是数字 + 원。

我指着远处一排洗发水问："저거 얼마예요?"
羊店员（戴白色围裙！）笑着说："저거요? 천 원이에요."

천 원？！等于 5 块人民币？！
我啊的一声，怀里直接抱了三瓶。

结账时我看到桌上的胡萝卜挂件——
"이거도 주세요!"
羊店员把它递给我，
脸上写着"又一个被胡萝卜俘获的留学生"。`,
  },

  words: [
    {
      id: 'd11-w1',
      korean: '샴푸',
      hangul: 'syam-pu',
      zh: '洗发水',
      pos: '名词',
      example: { ko: '샴푸 있어요?', zh: '有洗发水吗？' },
      tip: '英文 shampoo 音译。日常用品大多是外来词',
    },
    {
      id: 'd11-w2',
      korean: '수건',
      hangul: 'su-geon',
      zh: '毛巾',
      pos: '名词',
      example: { ko: '수건 두 장 주세요.', zh: '请给我两条毛巾。' },
      tip: '量词「장」用于扁平的东西：纸、毛巾、卡',
    },
    {
      id: 'd11-w3',
      korean: '슬리퍼',
      hangul: 'seul-li-peo',
      zh: '拖鞋',
      pos: '名词',
      example: { ko: '슬리퍼 신어요.', zh: '穿拖鞋。' },
      tip: 'slipper 音译。韩国家里、宿舍都必备',
    },
    {
      id: 'd11-w4',
      korean: '이거',
      hangul: 'i-geo',
      zh: '这个',
      pos: '代词',
      example: { ko: '이거 주세요.', zh: '请给我这个。' },
      tip: 'Day 8 复习。手边的东西',
    },
    {
      id: 'd11-w5',
      korean: '그거',
      hangul: 'geu-geo',
      zh: '那个（对方那）',
      pos: '代词',
      example: { ko: '그거 뭐예요?', zh: '那个是什么？' },
      tip: '对方手边或刚提到的',
    },
    {
      id: 'd11-w6',
      korean: '저거',
      hangul: 'jeo-geo',
      zh: '那个（远处）',
      pos: '代词',
      example: { ko: '저거 얼마예요?', zh: '那个（远处）多少钱？' },
      tip: '远处的、第三方位置的',
    },
  ],

  dialogue: {
    scene: '다이소 收银台前',
    setting: {
      time: '傍晚 6 点',
      place: 'Daiso 학교 근처점',
      npc: '羊店员 + Junho',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '저기요, 저거 얼마예요?',
        hangul: 'jeo-gi-yo, jeo-geo eol-ma-ye-yo',
        zh: '不好意思，那个（远处）多少钱？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '羊店员',
        ko: '저거요? 천 원이에요.',
        hangul: 'jeo-geo-yo? cheon won-i-e-yo',
        zh: '那个吗？1000 元。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '와… 그럼 세 개 주세요.',
        hangul: 'wa… geu-reom se gae ju-se-yo',
        zh: '哇…那请给我三个。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '이거 봐! 당근 키링!',
        hangul: 'i-geo bwa! dang-geun ki-ring',
        zh: '看！胡萝卜钥匙扣！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '兔莉对羊店员说"这个也给我"，应该怎么说？',
        practice: 'pick',
        choices: [
          { ko: '이거도 주세요.', zh: '这个也请给我。', correct: true },
          { ko: '저거 없어요.', zh: '那个没有。', correct: false },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '指示三人组复习 · 이거 그거 저거',
    pattern: '이거 (我身边) · 그거 (你身边/刚提到) · 저거 (远处)',
    whenToUse: '指着任何东西买、问、评论。三者各占一个空间区域。',
    rules: [
      '**이거** + 名词 = 这个___ : 이거 샴푸예요',
      '**그거** + 名词 = 那个___（你那）',
      '**저거** + 名词 = 那个___（远处）',
      '后面加助词「도」(也): 이거**도** 주세요',
    ],
    examples: [
      { ko: '이거 얼마예요?', zh: '这个多少钱？', highlight: '이거' },
      { ko: '그거 주세요.', zh: '请给我那个（你那）。', highlight: '그거' },
      { ko: '저거 좋아해요.', zh: '我喜欢那个（远处）。', highlight: '저거' },
      { ko: '이거도 주세요.', zh: '这个也请给我。', highlight: '이거도' },
    ],
    pitfall:
      '初学者常乱混。简单口诀：「**我手 = 이**, **你手 = 그**, **远处 = 저**」。三个 ㅈ/ㄱ/ㅈ 开头的辅音区分清楚。',
  },

  output: [
    {
      id: 'd11-o1',
      kind: 'compose',
      zhHint: '那个（远处）多少钱？',
      tokens: ['저거', '얼마예요', '?', '이거', '그거', '있어요'],
      composeAnswer: ['저거', '얼마예요', '?'],
      successMsg: '羊店员指了一下："저거요? 천 원이에요." ✓',
    },
    {
      id: 'd11-o2',
      kind: 'listen-choice',
      audioKo: '저거 천 원이에요.',
      successMsg: '✓ 「那个 1000 元」。「저거」= 远处的那个；「천 원」= 1000 韩元（约 5 RMB）。',
      choices: [
        { zh: '那个 1000 元。', correct: true },
        { zh: '这个 1000 元。', correct: false },
        { zh: '那个 100 元。', correct: false },
        { zh: '那个 10000 元。', correct: false },
      ],
    },
    {
      id: 'd11-o3',
      kind: 'zh-to-ko',
      zhPrompt: '请也给我这个。',
      successMsg: '"이거도 주세요" — 「도」= 也，紧贴在「이거」后面。',
      choices: [
        { ko: '이거도 주세요.', correct: true },
        { ko: '이거를 주세요.', correct: false },
        { ko: '저거도 주세요.', correct: false },
        { ko: '이거가 주세요.', correct: false },
      ],
    },
    {
      id: 'd11-o4',
      kind: 'particle-error',
      zhHint: '请给我三个那个（远处的）。',
      successMsg: '「세 개」是固有数 셋(3) 配量词「개」时变「세」。1=한, 2=두, 3=세, 4=네。',
      choices: [
        { ko: '저거 세 개 주세요.', correct: true },
        { ko: '저거 셋 개 주세요.', correct: false },
        { ko: '저거 삼 개 주세요.', correct: false },
        { ko: '저거 세 잔 주세요.', correct: false },
      ],
    },
  ],

  recap: {
    toriPose: 'cheer',
    praise: '今天买齐了生活套装 + 一只胡萝卜钥匙扣。토리, 알차게 보냈어요!',
    preview: '明天去 Haru 推荐的小咖啡馆。她说店员是只猫，咖啡香到能让人想家。',
    stickerId: 'sticker-d11',
  },

  carrotHint:
    '今天的胡萝卜：「韩国 Daiso 文化」「指示代词三个区别」「生活用品韩语怎么说」',
};
