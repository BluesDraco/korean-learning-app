import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 8 · CU 便利店 · 第一次自己买饭
 *
 * 剧情：早上 8:30，兔莉饿得肚子叫，没等 Haru 起床，自己下楼去 CU 便利店。
 * 一只懒洋洋的考拉店员靠在收银台后，慢吞吞地说话。
 * Tori 看着冰柜里花花绿绿的삼각김밥半天，鼓起勇气挑了一个金枪鱼味的，
 * 又顺手拿了一瓶香蕉牛奶。结账时手抖把零钱撒了一地，考拉哥哥淡定地等她。
 *
 * 学习目标：~주세요 综合 / 数字 1-10 韩固有数 / 便利店物品
 * 韩语自审：korean skill PASS
 */
export const day8: ToriDay = {
  day: 8,
  phase: 'foundation',
  title: 'CU 便利店 · 第一次自己买饭',
  subtitle: '一个金枪鱼三角饭团 + 一瓶香蕉牛奶',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9月 9일 월요일 아침',
    weather: '首尔 · 晴',
    toriPose: 'shy',
    diaryText: `9月 9日，周一早上 8:30。
肚子叫得能吓到 Haru。
我没等她起床，自己下楼去 CU。

考拉店员靠在收银台后面打哈欠，
他说"안녕하세요"的时候像在叹气。

我盯着冰柜半天，
紫菜包饭分参鸡汤味、金枪鱼味、辣鸡味……
最后挑了金枪鱼。

转身又抓了一瓶香蕉牛奶——
真的是亮黄色，妈妈见了肯定笑。

结账时我紧张地说："이거 주세요. 그리고 이것도요."
考拉哥哥扫码："2,800원이에요."
我手抖，零钱撒了一地。

他没有笑，只是淡淡说："천천히 하세요."
（慢慢来。）

第一次一个人买饭。
我赢了。`,
  },

  words: [
    {
      id: 'd08-w1',
      korean: '편의점',
      hangul: 'pyeo-nui-jeom',
      zh: '便利店',
      pos: '名词',
      example: { ko: '편의점에 가요.', zh: '我去便利店。' },
      tip: '韩国便利店密度全球第一。CU、GS25、7-Eleven 三足鼎立',
    },
    {
      id: 'd08-w2',
      korean: '삼각김밥',
      hangul: 'sam-gak-gim-bap',
      zh: '三角紫菜包饭',
      pos: '名词',
      example: { ko: '삼각김밥 하나 주세요.', zh: '请给我一个三角饭团。' },
      tip: '삼각(三角) + 김밥(紫菜包饭)。便利店神级早餐',
    },
    {
      id: 'd08-w3',
      korean: '바나나우유',
      hangul: 'ba-na-na-u-yu',
      zh: '香蕉牛奶',
      pos: '名词',
      example: { ko: '바나나우유 한 병 주세요.', zh: '请给我一瓶香蕉牛奶。' },
      tip: '韩国国民饮料。亮黄色塑料罐子，去到都看得到',
    },
    {
      id: 'd08-w4',
      korean: '하나',
      hangul: 'ha-na',
      zh: '一个 / 1（固有数）',
      pos: '名词',
      example: { ko: '하나 주세요.', zh: '请给我一个。' },
      tip: '韩国数字有两套：固有数(하나/둘/셋) 数东西、汉字数(일/이/삼) 报号码',
    },
    {
      id: 'd08-w5',
      korean: '둘',
      hangul: 'dul',
      zh: '两个 / 2（固有数）',
      pos: '名词',
      example: { ko: '커피 두 잔 주세요.', zh: '请给我两杯咖啡。' },
      tip: '둘 + 量词时变「두」: 두 잔 / 두 개 / 두 명',
    },
    {
      id: 'd08-w6',
      korean: '천천히',
      hangul: 'cheon-cheon-hi',
      zh: '慢慢地',
      pos: '副词',
      example: { ko: '천천히 하세요.', zh: '请慢慢来。' },
      tip: '韩国人最温柔的一句话。考拉哥哥说的就是这句',
    },
  ],

  dialogue: {
    scene: 'CU 便利店收银台',
    setting: {
      time: '早上 8:30',
      place: '宿舍楼下 CU',
      npc: '考拉店员',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '考拉店员',
        ko: '안녕하세요. 결제 도와드릴게요.',
        hangul: 'an-nyeong-ha-se-yo. gyeol-je do-wa-deu-ril-ge-yo',
        zh: '你好，我帮您结账。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '이거 주세요. 그리고 이것도요.',
        hangul: 'i-geo ju-se-yo. geu-ri-go i-geot-do-yo',
        zh: '请给我这个。还有这个也是。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '考拉店员',
        ko: '네. 2,800원이에요.',
        hangul: 'ne. i-cheon-pal-baek-won-i-e-yo',
        zh: '好的，2800 韩元。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '여기요. 죄송해요, 천천히…',
        hangul: 'yeo-gi-yo. joe-song-hae-yo, cheon-cheon-hi',
        zh: '给你，对不起，慢一点…',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '考拉哥哥说"천천히 하세요"，兔莉应该说什么？',
        practice: 'pick',
        choices: [
          { ko: '감사합니다.', zh: '谢谢。', correct: true },
          { ko: '안녕히 가세요.', zh: '再见。', correct: false },
          { ko: '아니요, 괜찮아요.', zh: '不用了。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '指示代词 · 이거 / 그거 / 저거',
    pattern: '이거 (这个) · 그거 (那个 · 对方那) · 저거 (那个 · 远处)',
    whenToUse: '便利店、商店里指着东西买的时候。三选一规则韩国人很严格。',
    rules: [
      '**이거** = 我手边的：「이거 주세요」(请给我这个)',
      '**그거** = 对方那边的 / 你刚才提到的：「그거 얼마예요?」(那个多少钱？)',
      '**저거** = 远处第三方的：「저거 보세요」(看那边那个)',
    ],
    examples: [
      { ko: '이거 주세요.', zh: '请给我这个。', highlight: '이거' },
      { ko: '그거 얼마예요?', zh: '那个（你那）多少钱？', highlight: '그거' },
      { ko: '저거 뭐예요?', zh: '那个（远处）是什么？', highlight: '저거' },
      { ko: '이것도 주세요.', zh: '这个也请给我。', highlight: '이것' },
    ],
    pitfall:
      '正式书面语用「이것 / 그것 / 저것」。口语用「이거 / 그거 / 저거」。本周一律用口语版即可。',
  },

  output: [
    {
      id: 'd08-o1',
      kind: 'compose',
      zhHint: '请给我这个。',
      tokens: ['이거', '주세요', '저거', '그거', '이것도요', '주실래요'],
      composeAnswer: ['이거', '주세요'],
      successMsg: '考拉哥哥按下了扫码枪 ✓',
    },
    {
      id: 'd08-o2',
      kind: 'listen-choice',
      audioKo: '바나나우유 한 병 주세요.',
      successMsg: '✓ 「请给我一瓶香蕉牛奶」。「한 병」= 一瓶（固有数 하나 + 量词 병 时变「한」）。',
      choices: [
        { zh: '请给我一瓶香蕉牛奶。', correct: true },
        { zh: '请给我一瓶可乐。', correct: false },
        { zh: '请给我一个三角饭团。', correct: false },
        { zh: '请给我两杯咖啡。', correct: false },
      ],
    },
    {
      id: 'd08-o3',
      kind: 'zh-to-ko',
      zhPrompt: '请给我这个。还有这个也是。',
      successMsg: '"이것도요" = "这个也（请给我）"。「도」是「也」，省略 주세요 是口语。',
      choices: [
        { ko: '이거 주세요. 그리고 이것도요.', correct: true },
        { ko: '그거 주세요. 그리고 이것도요.', correct: false },
        { ko: '이거 주세요. 그리고 그것도요.', correct: false },
        { ko: '저거 주세요. 그리고 저것도요.', correct: false },
      ],
    },
    {
      id: 'd08-o4',
      kind: 'particle-error',
      zhHint: '请给我两杯咖啡。',
      successMsg: '두(2) + 量词「잔」(杯) → 「두 잔」。固有数 2 = 둘，但搭量词时变「두」。',
      choices: [
        { ko: '커피 두 잔 주세요.', correct: true },
        { ko: '커피 둘 잔 주세요.', correct: false },
        { ko: '커피 이 잔 주세요.', correct: false },
        { ko: '커피 두 병 주세요.', correct: false },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '一个人买饭成功！而且记住了"천천히 하세요"。토리, 너무 잘했어요!',
    preview: '明天 Minji 要带我去街边的店买文具。她说要教我看懂 만 원。',
    stickerId: 'sticker-d08',
  },

  carrotHint:
    '今天的胡萝卜：「韩国便利店常见食物有哪些」「数字 1-10 怎么读」「点单怎么说"还有这个"」',
};
