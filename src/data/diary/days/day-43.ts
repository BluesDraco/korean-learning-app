import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 43 · 노래방 · Junho唱歌太猛
 *
 * 剧情：期中考结束，四人去노래방。Junho点了首rap唱到整栋楼在抖。
 * Tori鼓起勇气唱了一首追星学的歌，意外地好。Junho说实力不错，Haru角落笑着鼓掌。
 *
 * 学习目标：시도 ~아/어 보다 / 노래방 어휘 / 격려 표현
 * 语料层级：해요体 + 반말（朋友间）
 * 韩语自审：korean skill PASS
 */
export const day43: ToriDay = {
  level: 'intermediate',
  day: 13,
  phase: 'expansion',
  title: '노래방 · Junho唱歌太猛',
  subtitle: '第一次开麦，唱了追星学的那首歌',
  heroImageUrl: '/images/diary/day-43-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 15일 · 화요일 저녁',
    weather: '兽尔 · 秋夜',
    toriPose: 'shy',
    diaryText: `10月15日，周二晚上。

期中考结束。
弘爪街拐角的黄色招牌——"코인 노래방"（投币K房）。

推开门那一秒，我耳朵嗡的一下。
Junho已经点了他的歌——
一首快到耳朵跟不上的rap。

他抓过麦克风，
副歌起——整栋楼都在抖。
Haru在角落笑到眼泪快出来。
Minji录视频录到手抖。

轮到我。
遥控器递到我手里。
我犹豫了两秒。

"토리, 뭐라도 한번 불러 봐."
（Tori，随便唱一首试试。）
Haru说。

我搜索——
Day 25演唱会那首歌的名字。
按下确认。

熟悉的前奏响起。

我开麦——
"저는 그날 응원봉을 처음 잡았어요…"
（我那天第一次拿起应援棒……）

不是原歌词。
是我自己改的。

Junho愣了两秒，然后拍手叫好：
"토리, 실력 진짜 늘었네!"
（兔莉，实力真的进步了！）

Haru在角落，只是笑，
安静地鼓掌。

28天听的KPOP——有效果了。`,
  },

  words: [
    {
      id: 'd43-w1',
      korean: '노래방',
      hangul: 'no-rae-bang',
      zh: 'KTV/K房',
      pos: '名词',
      example: { ko: '노래방에 갔어요.', zh: '去了KTV。' },
      tip: '노래(歌) + 방(房)。코인 노래방 = 投币小房',
    },
    {
      id: 'd43-w2',
      korean: '부르다',
      hangul: 'bu-reu-da',
      zh: '唱（歌）/叫',
      pos: '动词',
      example: { ko: '노래를 불러요.', zh: '唱歌。' },
      tip: '르 不规则：부르다 → 불러요（不是부르어요）',
    },
    {
      id: 'd43-w3',
      korean: '마이크',
      hangul: 'ma-i-keu',
      zh: '麦克风',
      pos: '名词',
      example: { ko: '마이크 잡아요.', zh: '拿麦克风。' },
      tip: '英语 mic 的外来语。~를 잡다 = 拿起',
    },
    {
      id: 'd43-w4',
      korean: '실력',
      hangul: 'sil-lyeok',
      zh: '实力',
      pos: '名词',
      example: { ko: '토리 실력 늘었어!', zh: '兔莉实力进步了！' },
      tip: 'Day 31 学过。这次 "실력이 늘다" = 实力增长',
    },
    {
      id: 'd43-w5',
      korean: '용기',
      hangul: 'yong-gi',
      zh: '勇气',
      pos: '名词',
      example: { ko: '용기를 내서 노래를 불렀어요.', zh: '鼓起勇气唱了歌。' },
      tip: 'Day 1 妈妈胡萝卜上写的两个字。Day 43 再登场',
    },
    {
      id: 'd43-w6',
      korean: '멋있다',
      hangul: 'meo-sit-da',
      zh: '帅/酷',
      pos: '形容词',
      example: { ko: '준호 랩 진짜 멋있어!', zh: 'Junho rap真帅！' },
      tip: '发音 [머싣따]。夸人夸表演都用得上',
    },
  ],

  dialogue: {
    scene: '노래방 3호실',
    setting: {
      time: '周二晚 20:00',
      place: '弘爪街코인 노래방',
      npc: 'Junho / Haru / Minji',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '내가 먼저 부를게. 잘 봐!',
        hangul: 'nae-ga meon-jeo bu-reul-ge. jal bwa!',
        zh: '我先唱。看好了！',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리, 뭐라도 한번 불러 봐.',
        hangul: 'to-ri, mwo-ra-do han-beon bul-leo bwa',
        zh: '兔莉，随便唱一首试试。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '떨려… 근데 오늘은 한번 불러 볼래.',
        hangul: 'tteol-lyeo… geun-de o-neu-reun han-beon bul-leo bol-lae',
        zh: '好紧张……但今天想试试看。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '저는 그날 응원봉을 처음 잡았어요…',
        hangul: 'jeo-neun geu-nal eung-won-bong-eul cheo-eum ja-ba-sseo-yo',
        zh: '我那天第一次拿起了应援棒……',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '토리, 실력 진짜 늘었네!',
        hangul: 'to-ri, sil-lyeok jin-jja neu-reon-ne!',
        zh: '兔莉，实力真的进步了！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Junho夸完之后。Tori鼓起勇气想再唱一首。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '한 곡 더 불러 볼래.', zh: '再试着唱一首。', correct: true },
          { ko: '이제 집에 갈래.', zh: '现在要回家了。', correct: false },
          { ko: '내가 못 해.', zh: '我做不到。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '试着做___：~아/어 보다',
    pattern: 'V 어간 + **아/어 보다** (해요体: **아/어 봐요**)',
    whenToUse: '「尝试做___」的最刚需句尾。Haru 说 「뭐라도 한번 불러 **봐**」= 随便唱一首试试。~아/어 보다 = 试着做。发表/唱歌/新料理/新地方——鼓励别人和描述自己"尝试过"都用它。',
    rules: [
      '**基本公式**：V + 아/어 보다。变形和해요体一样——阳性元音(ㅏ/ㅗ) → 아 보다；其他 → 어 보다；하다 → 해 보다',
      '**过去时 → ~아/어 봤어요**：먹어 봤어요 = 试着吃过。가 봤어요 = 去过。表"经验"最常用',
      '**建议/邀请 → ~아/어 보세요**：김치볶음밥을 만들어 보세요 = 试着做泡菜炒饭吧',
      '**반말命令 → ~아/어 봐**：불러 봐 = 试着唱吧。Haru 在노래방原句'
    ],
    examples: [
      { ko: '한번 불러 봐.', zh: '试着唱一次吧。', highlight: '불러 봐', note: '부르다 → 불러(르 不规则) + 봐(반말)。노래방 场景的经典鼓励句' },
      { ko: '이 노래를 들어 보세요.', zh: '请试着听这首歌。', highlight: '들어 보세요', note: '듣다 → 들어(ㄷ 不规则) + 보세요。推荐歌曲的礼貌说法' },
      { ko: '한국 음식을 먹어 봤어요.', zh: '试过韩国料理。', highlight: '먹어 봤어요', note: '먹다 → 먹어 봤어요（过去时）。表经验最常用' },
      { ko: '용기를 내서 발표해 봤어요.', zh: '鼓起勇气试着发表了。', highlight: '발표해 봤어요', note: '발표하다 → 발표해 봤어요。Day 42 Tori 的经验' },
    ],
    pitfall:
      '① ~아/어 보다 ≠ 单纯"看"（보다 原意）：여기 앉아 봐 = 请坐坐看（不是看这里）。语法化了。② 过去时 ~아/어 봤어요 = "试过/有过经验"，和 ~았/었어요（做过） 语感不同：먹었어요 = 吃了；먹어 봤어요 = 尝过。③ 命令/邀请形 ~아/어 보세요 最常听到，餐厅点单/店员推荐/朋友邀约都用它。',
  },

  output: [
    {
      id: 'd43-o1',
      kind: 'compose',
      zhHint: '试着唱一次吧。',
      tokens: ['한번', '노래를', '불러 봐', '불러요', '불렀어', '한번씩'],
      composeAnswer: ['한번', '노래를', '불러 봐'],
      successMsg: 'Haru在노래방对Tori说的原句。반말鼓励。',
    },
    {
      id: 'd43-o2',
      kind: 'listen-choice',
      audioKo: '한국 음식을 먹어 봤어요.',
      successMsg: '✓ ~아/어 봤어요 = 表"尝过/经验过"。',
      choices: [
        { zh: '试过韩国料理。', correct: true },
        { zh: '想吃韩国料理。', correct: false },
        { zh: '不能吃韩国料理。', correct: false },
        { zh: '会做韩国料理。', correct: false },
      ],
    },
    {
      id: 'd43-o3',
      kind: 'zh-to-ko',
      zhPrompt: '请试着听这首歌。',
      successMsg: '"이 노래를 들어 보세요." — 듣다 → 들어 보세요.',
      choices: [
        { ko: '이 노래를 들어 보세요.', correct: true },
        { ko: '이 노래를 듣어 보세요.', correct: false },
        { ko: '이 노래를 듣 보세요.', correct: false },
        { ko: '이 노래가 들어 보세요.', correct: false },
      ],
    },
    {
      id: 'd43-o4',
      kind: 'particle-error',
      zhHint: '鼓起勇气试着发表了。',
      successMsg: '발표하다 → **발표해 봤어요**（하다 → 해 + 봤어요）.',
      choices: [
        { ko: '용기를 내서 발표해 봤어요.', correct: true },
        { ko: '용기를 내서 발표하 봤어요.', correct: false },
        { ko: '용기를 내서 발표하아 봤어요.', correct: false },
        { ko: '용기를 내서 발표하고 봤어요.', correct: false },
      ],
    },
    {
      id: 'd43-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 43 全对。麦克风递到手上——Tori接住了。',
      pairs: [
        { ko: '노래방', zh: 'KTV' },
        { ko: '부르다', zh: '唱' },
        { ko: '마이크', zh: '麦克风' },
        { ko: '용기', zh: '勇气' },
        { ko: '멋있다', zh: '帅' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '노래방에서 처음 마이크 잡았어요! 28일치 KPOP 훈련——효과 있었어요.',
    preview: '明天天气好，四人去兽尔江野餐——铺毯子、紫菜包饭、草莓。',
    stickerId: 'sticker-d43',
    sceneImageUrl: '/images/diary/day-43-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~아/어 보다 和 ~아/어 봤어요 什么时候用？」「노래방 结账怎么说？」',
};
