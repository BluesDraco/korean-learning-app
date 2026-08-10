import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 46 · 하루의 생일 · 仓鼠的惊喜
 *
 * 剧情：Haru的生日。Tori、Minji、Junho偷偷准备了蛋糕和礼物。Haru开门看到蛋糕时，
 * 眼睛亮了。她说"이건 처음이야"——第一次有人给她办生日派对。
 * Tori心里一沉：Haru一直是独自一人啊。（伏笔延续 Day 34）
 *
 * 学习目标：~아/어 주다 施惠 / 생일 어휘 / 축하 표현
 * 语料层级：해요体 + 반말（朋友间）
 * 韩语自审：korean skill PASS
 */
export const day46: ToriDay = {
  level: 'intermediate',
  day: 16,
  phase: 'expansion',
  title: 'Haru的生日 · 仓鼠的惊喜',
  subtitle: '"这是第一次有人给我过生日"',
  heroImageUrl: '/images/diary/day-46-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 18일 · 금요일 저녁',
    weather: '兽尔 · 秋雨',
    toriPose: 'happy',
    diaryText: `10月18日，周五晚上。

Haru的生日。
她自己没说，但是Minji翻朋友圈翻到的。

下午我们三个偷偷在Minji家做准备——
Junho买了草莓蛋糕（真的粉粉的），
我买了向日葵花束，
Minji包了礼物：一本手账本，
封面上还印了个小仓鼠头像。

19点整。
我们三个躲在302门口楼梯拐角。
Junho按门铃。

Haru开门——
她穿着家居服，头发有点乱。
看到我们，看到蛋糕，
她愣住了。

"…이건 처음이야."
（这是……第一次。）

我们一起唱생일 축하 노래。
Haru吹蜡烛，眼睛红了一下。
Junho拍照拍到没电。

"고마워, 정말 고마워."
（谢谢你们，真的谢谢。）

回宿舍路上，
我一直在想那句"처음이야"。

Haru 20几岁了，
30天里她照顾我、陪我、教我做饭——
但她自己，
从来没被这样过。

我心里有点闷。
她的"以前的朋友"到底是谁？
Haru 一直是独自一人吗？`,
  },

  words: [
    {
      id: 'd46-w1',
      korean: '생일',
      hangul: 'saeng-il',
      zh: '生日',
      pos: '名词',
      example: { ko: '오늘 하루 생일이에요.', zh: '今天Haru生日。' },
      tip: '生(생) + 日(일)。생일 축하해 = 生日快乐',
    },
    {
      id: 'd46-w2',
      korean: '축하하다',
      hangul: 'chuk-a-ha-da',
      zh: '祝贺',
      pos: '动词',
      example: { ko: '생일 축하해!', zh: '生日快乐！' },
      tip: '祝(축) + 贺(하) + 하다。축하해 (반말) / 축하해요 / 축하드립니다',
    },
    {
      id: 'd46-w3',
      korean: '케이크',
      hangul: 'ke-i-keu',
      zh: '蛋糕',
      pos: '名词',
      example: { ko: '딸기 케이크를 샀어요.', zh: '买了草莓蛋糕。' },
      tip: '英语 cake 的外来语。생일 케이크 = 生日蛋糕',
    },
    {
      id: 'd46-w4',
      korean: '선물',
      hangul: 'seon-mul',
      zh: '礼物',
      pos: '名词',
      example: { ko: '선물을 준비했어요.', zh: '准备了礼物。' },
      tip: '膳(선) + 物(물)。선물을 주다 = 送礼物 / 받다 = 收礼物',
    },
    {
      id: 'd46-w5',
      korean: '촛불',
      hangul: 'chot-bul',
      zh: '蜡烛（火）',
      pos: '名词',
      example: { ko: '촛불을 껐어요.', zh: '吹灭了蜡烛。' },
      tip: '초(烛) + 불(火)。촛불을 끄다 = 吹蜡烛（用 끄다-灭）',
    },
    {
      id: 'd46-w6',
      korean: '처음',
      hangul: 'cheo-eum',
      zh: '第一次/初次',
      pos: '名词',
      example: { ko: '이건 처음이야.', zh: '这是第一次。' },
      tip: '처음 = 第一次/初次（固有词，无汉字）。Haru 那句"이건 처음이야"藏着秘密',
    },
  ],

  dialogue: {
    scene: '302号门口·생일 서프라이즈',
    setting: {
      time: '周五 19:00',
      place: '韩光宿舍302号门口',
      npc: 'Haru / Junho / Minji',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '자, 초 켰다. 문 열려면 벨 눌러.',
        hangul: 'ja, cho kyeot-da. mun yeol-lyeo-myeon bel nul-leo',
        zh: '好，蜡烛点了。让她开门就按门铃。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '하루야, 생일 축하해!',
        hangul: 'ha-ru-ya, saeng-il chuk-a-hae!',
        zh: 'Haru，生日快乐！',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '…이건 처음이야. 진짜 고마워.',
        hangul: 'i-geon cheo-eu-mi-ya. jin-jja go-ma-wo',
        zh: '……这是第一次。真的谢谢。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '작은 선물이야. 우리가 다 같이 준비했어.',
        hangul: 'ja-geun seon-mu-ri-ya. u-ri-ga da ga-chi jun-bi-hae-sseo',
        zh: '一点小礼物。我们一起准备的。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '"처음이야"… 하루 계속 혼자였어?',
        hangul: 'cheo-eu-mi-ya… ha-ru gye-sok hon-ja-yeo-sseo?',
        zh: '"第一次"……Haru 一直是一个人吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru吹完蜡烛红了眼睛。Tori想安慰她"以后每年我们都陪你过"。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '앞으로 매년 우리가 같이 있어 줄게.', zh: '以后每年我们都陪你。', correct: true },
          { ko: '울지 마, 슬픈 일이 아니야.', zh: '别哭，不是伤心事。', correct: false },
          { ko: '이제 됐어. 그만하자.', zh: '够了，别搞了。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '为(某人)做___：~아/어 주다',
    pattern: 'V + **아/어 주다** (해요体: **아/어 줘요**)',
    whenToUse: '「为___做___」的施惠句尾。Day 36 学过被动版(엄마가 보내주셨어요)，Day 46 学主动版：我为别人做。Tori 说 「앞으로 매년 같이 있어 줄게」= 以后每年陪你。~아/어 주다 = 主动为对方做，是韩语表达关心的核心句型。',
    rules: [
      '**基本公式**：V + 아/어 주다。아/어 变形同해요体规则。먹다 → 먹어 주다 / 도와주다 / 사주다',
      '**约定 → ~아/어 줄게 / 줄게요**：앞으로 있어 줄게 = 以后陪你。约定/承诺时用 ~ㄹ게',
      '**请求 → ~아/어 주세요**：도와주세요 = 请帮我。노래 불러 주세요 = 请为我唱歌',
      '**주다 vs 드리다**：对长辈用 **드리다**。선생님께 편지를 써 드렸어요 = 给老师写了信'
    ],
    examples: [
      { ko: '앞으로 매년 같이 있어 줄게.', zh: '以后每年都陪你。', highlight: '있어 줄게', note: '있다 → 있어 + 주다 + ㄹ게 = 있어 줄게。约定/承诺陪伴' },
      { ko: '생일 케이크를 사줬어요.', zh: '给她买了生日蛋糕。', highlight: '사줬어요', note: '사다 → 사 + 줬어요（过去时）。为别人买' },
      { ko: '한국어 좀 가르쳐 주세요.', zh: '请教我一点韩语。', highlight: '가르쳐 주세요', note: '가르치다 → 가르쳐 + 주세요。请求最刚需句' },
      { ko: '노래 불러 줘.', zh: '给我唱首歌。', highlight: '불러 줘', note: '부르다 → 불러 + 줘(반말命令)。朋友间的请求' },
    ],
    pitfall:
      '① 施惠对象：~아/어 주다 = 我/别人为**对方**做。~아/어 받다 不存在！被动要用 ~아/어 주다 + 시(엄마가 주셨어요)。② **주다 vs 드리다**：对长辈必须 드리다 — 부모님께 선물을 사드렸어요（O）/ 사줬어요对父母(X 失礼)。③ 承诺用 ~아/어 줄게 (내가 해줄게)，请求用 ~아/어 주세요 (해주세요)，二者混用即失礼。',
  },

  output: [
    {
      id: 'd46-o1',
      kind: 'compose',
      zhHint: '以后每年都陪你。',
      tokens: ['앞으로', '매년', '우리가', '같이', '있어 줄게', '있어', '있을게'],
      composeAnswer: ['앞으로', '매년', '우리가', '같이', '있어 줄게'],
      successMsg: 'Tori给Haru的承诺。~아/어 줄게，未来的约定。',
    },
    {
      id: 'd46-o2',
      kind: 'listen-choice',
      audioKo: '이건 처음이야. 진짜 고마워.',
      successMsg: '✓ Haru原句。"이건 처음이야" — 藏着一整段过去。',
      choices: [
        { zh: '这是第一次。真的谢谢。', correct: true },
        { zh: '这些是最后一次。谢谢。', correct: false },
        { zh: '这个第一次不来。', correct: false },
        { zh: '第一次真的不要。', correct: false },
      ],
    },
    {
      id: 'd46-o3',
      kind: 'zh-to-ko',
      zhPrompt: '请教我一点韩语。',
      successMsg: '"한국어 좀 가르쳐 주세요." — 请求 ~아/어 주세요.',
      choices: [
        { ko: '한국어 좀 가르쳐 주세요.', correct: true },
        { ko: '한국어 좀 가르쳐 드리세요.', correct: false },
        { ko: '한국어 좀 가르쳐요.', correct: false },
        { ko: '한국어를 가르치 주세요.', correct: false },
      ],
    },
    {
      id: 'd46-o4',
      kind: 'particle-error',
      zhHint: '给妈妈写信了。（长辈）',
      successMsg: '엄마 (长辈) → **써드렸어요**。对长辈用 드리다。',
      choices: [
        { ko: '엄마한테 편지를 써드렸어요.', correct: true },
        { ko: '엄마한테 편지를 써줬어요.', correct: false },
        { ko: '엄마에게 편지를 써졌어요.', correct: false },
        { ko: '엄마한테 편지를 써 있어요.', correct: false },
      ],
    },
    {
      id: 'd46-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 46 全对。Haru眼睛红了一下——但今晚是甜的。',
      pairs: [
        { ko: '생일', zh: '生日' },
        { ko: '축하하다', zh: '祝贺' },
        { ko: '케이크', zh: '蛋糕' },
        { ko: '선물', zh: '礼物' },
        { ko: '처음', zh: '第一次' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '하루의 첫 번째 생일 파티. 파티가 아니라, 시작이었어요.',
    preview: '明天Tori想妈妈想到不行——一通视频，妈妈说了一句韩语。',
    stickerId: 'sticker-d46',
    sceneImageUrl: '/images/diary/day-46-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「주세요 和 드리세요 什么时候用？」「생일 축하해 和 축하드립니다 有什么区别？」',
};
