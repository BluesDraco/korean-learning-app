import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 39 · 한글날 · 世宗大王和韩文的生日
 *
 * 剧情：10月9日한글날，学校放假但火鹤老师专门讲了一节课——世宗大王创制韩文的故事。
 * Tori第一次理解韩文字母的逻辑——辅音来自人的嘴形。她觉得韩文比想象中更科学，也更美。
 *
 * 学习目标：추측 ~는 것 같아요 / 한글 유래 어휘
 * 语料层级：해요体 + 문화 표현
 * 韩语自审：korean skill PASS
 */
export const day39: ToriDay = {
  level: 'intermediate',
  day: 9,
  phase: 'expansion',
  title: '한글날 · 为什么韩文有自己的生日',
  subtitle: '世宗大王和24个字母的故事',
  heroImageUrl: '/images/diary/day-39-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 12일 · 토요일 오전',
    weather: '兽尔 · 秋高气爽',
    toriPose: 'shy',
    diaryText: `10月12日，周六上午。

한글날（10月9日）本是国庆假期，
但那天恰好是工作日课程，老师说要另择时间补讲——
"이번 주 토요일에 한글날 특별 수업이에요"（这周六上一节한글날特别课）。
教室里只有一半的人来，大家都是自愿的。

老师翻开一张古画——
一位穿龙袍的国王，
正弯着腰在纸上写字。

"세종대왕이에요. 한글을 만드셨어요."
（这位是世宗大王，他创造了韩文。）

原来韩文字母是被"发明"出来的——
不是自然演变，是设计出来的。

老师指着字母 ㄱ：
"이건 혀가 목구멍을 막는 모양이에요."
（这是舌头堵住喉咙的样子。）

ㅁ 是嘴的形状。
ㅅ 是牙齿的形状。
ㅇ 是喉咙的形状。

我盯着黑板，突然愣住——
原来我这30天写的每一个字母，
都是一张脸的一部分。

"한글이 진짜 과학적인 것 같아요."
（韩文真的好像很科学呢。）
我说。

火鹤老师笑了。
"그래서 세계에서 유일하게 생일이 있는 글자예요."
（所以这是世界上唯一有生日的文字。）`,
  },

  words: [
    {
      id: 'd39-w1',
      korean: '한글날',
      hangul: 'han-geul-lal',
      zh: '韩文日（10月9日）',
      pos: '名词',
      example: { ko: '한글날은 10월 9일이에요.', zh: '韩文日是10月9日。' },
      tip: '한글(韩文) + 날(日)。世界唯一有生日的文字',
    },
    {
      id: 'd39-w2',
      korean: '세종대왕',
      hangul: 'se-jong-dae-wang',
      zh: '世宗大王',
      pos: '名词',
      example: { ko: '세종대왕이 한글을 만드셨어요.', zh: '世宗大王创造了韩文。' },
      tip: '朝鲜王朝第四代国王。1443年颁布《训民正音》',
    },
    {
      id: 'd39-w3',
      korean: '만들다',
      hangul: 'man-deul-da',
      zh: '制作/创造',
      pos: '动词',
      example: { ko: '한글을 만들었어요.', zh: '创造了韩文。' },
      tip: 'ㄹ 词干：만들다 → 만들어요/만드네요(ㄹ 탈락)/만든。요리 만들기 = 做料理',
    },
    {
      id: 'd39-w4',
      korean: '과학적',
      hangul: 'gwa-hak-jeok',
      zh: '科学的',
      pos: '形容词',
      example: { ko: '한글은 과학적이에요.', zh: '韩文是科学的。' },
      tip: '과학(科学) + 적(的)。汉字词形容词，加이에요/예요',
    },
    {
      id: 'd39-w5',
      korean: '글자',
      hangul: 'geul-ja',
      zh: '字/文字',
      pos: '名词',
      example: { ko: '이 글자는 뭐예요?', zh: '这个字是什么？' },
      tip: '한 글자 = 一个字。한자 = 汉字，한글 = 韩文字母',
    },
    {
      id: 'd39-w6',
      korean: '특별하다',
      hangul: 'teuk-byeol-ha-da',
      zh: '特别',
      pos: '形容词',
      example: { ko: '오늘은 특별한 날이에요.', zh: '今天是特别的日子。' },
      tip: '特(특) + 别(별) + 하다。特别的一件事: 특별한 것',
    },
  ],

  dialogue: {
    scene: '教室·한글날 특별 수업',
    setting: {
      time: '周六上午 10:00',
      place: '韩光语学院·中级班教室',
      npc: '火鹤老师',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '火鹤老师',
        ko: '오늘은 한글날이에요. 세종대왕이 한글을 만드신 날이에요.',
        hangul: 'o-neu-reun han-geul-la-ri-e-yo. se-jong-dae-wang-i han-geu-reul man-deu-sin na-ri-e-yo',
        zh: '今天是韩文日。世宗大王创造韩文的日子。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '火鹤老师',
        ko: 'ㄱ은 혀가 목구멍을 막는 모양이에요.',
        hangul: 'gi-yeo-geun hyeo-ga mok-gu-meong-eul mang-neun mo-yang-i-e-yo',
        zh: 'ㄱ是舌头堵住喉咙的样子。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '어? 진짜 입 모양이랑 비슷해.',
        hangul: 'eo? jin-jja ip mo-yang-i-rang bi-seu-tae',
        zh: '咦？真的和嘴型很像。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '한글이 진짜 과학적인 것 같아요.',
        hangul: 'han-geu-ri jin-jja gwa-hak-jeo-gin geot ga-ta-yo',
        zh: '韩文真的好像很科学呢。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '火鹤老师',
        ko: '그래서 세계에서 유일하게 생일이 있는 글자예요.',
        hangul: 'geu-rae-seo se-gye-e-seo yu-il-ha-ge saeng-i-ri in-neun geul-ja-ye-yo',
        zh: '所以是世界上唯一有生日的文字。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '火鹤老师问"어때요, 한글이?"。Tori想说"感觉比想象中更美"。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '생각보다 더 아름다운 것 같아요.', zh: '感觉比想象中更美。', correct: true },
          { ko: '한글은 이상해요.', zh: '韩文很奇怪。', correct: false },
          { ko: '한글을 만들었어요.', zh: '我创造了韩文。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '好像___：~는 것 같아요',
    pattern: 'V + **는 것 같아요** · A + **(으)ㄴ 것 같아요** · N + **인 것 같아요**',
    whenToUse: '「感觉/好像___」的推测句尾。Tori 说 「한글이 과학적인 것 같아요」 = 韩文好像很科学——不是断言，而是柔和地表达自己的看法。韩语里表达观点用 ~는 것 같아요 显得**不武断、有礼貌**，母语者最爱用。',
    rules: [
      '**动词现在 → ~는 것 같아요**：가다 → 가는 것 같아요（好像去）。먹다 → 먹는 것 같아요（好像在吃）',
      '**形容词 → ~(으)ㄴ 것 같아요**：예쁘다 → 예쁜 것 같아요（好像很漂亮）。과학적이다 → 과학적**인** 것 같아요（好像很科学）',
      '**名词 → ~인 것 같아요**：학생이다 → 학생인 것 같아요（好像是学生）。한국 사람인 것 같아요',
      '**过去 → ~(으)ㄴ 것 같아요 (动词)**：먹었다 → 먹은 것 같아요（好像吃过了）。온 것 같아요 = 好像来了'
    ],
    examples: [
      { ko: '한글은 과학적인 것 같아요.', zh: '韩文好像很科学。', highlight: '과학적인 것 같아요', note: '과학적 + 이다 → **인 것 같아요**。名词/이다结尾的形容词都用 인' },
      { ko: '비가 오는 것 같아요.', zh: '好像在下雨。', highlight: '오는 것 같아요', note: '오다(动词现在) → **는 것 같아요**。看天气推测最常用' },
      { ko: '이 김치볶음밥이 매운 것 같아요.', zh: '这个泡菜炒饭好像很辣。', highlight: '매운 것 같아요', note: '맵다(形容词) → **매운 것 같아요**。ㅂ 不规则 → 매운' },
      { ko: '준호는 KPOP 팬인 것 같아요.', zh: 'Junho好像是KPOP粉丝。', highlight: '팬인 것 같아요', note: '팬(名词) + 이다 → **인 것 같아요**。推测别人身份' },
    ],
    pitfall:
      '① 动词 vs 形容词接法不同：动词 ~는 것 같아요 / 形容词 ~(으)ㄴ 것 같아요。混用 = 母语者听懂但奇怪。② 名词一定要接 **인**（이다 + ㄴ）：❌ 학생 것 같아요 → ✅ 학생**인** 것 같아요。③ 表达自己的**观点/推测**用 ~는 것 같아요，表达**事实**用 ~아/어요。"这个好吃"确信 → 맛있어요；"这个好像好吃" → 맛있는 것 같아요.',
  },

  output: [
    {
      id: 'd39-o1',
      kind: 'compose',
      zhHint: '韩文好像很科学。',
      tokens: ['한글이', '진짜', '과학적인', '것 같아요', '것이에요', '과학적이', '것이 있어요'],
      composeAnswer: ['한글이', '진짜', '과학적인', '것 같아요'],
      successMsg: 'Tori 对火鹤老师说的一句。柔和又准确。',
    },
    {
      id: 'd39-o2',
      kind: 'listen-choice',
      audioKo: '세계에서 유일하게 생일이 있는 글자예요.',
      successMsg: '✓ 世上唯一有生日的文字——韩语课的名场面。',
      choices: [
        { zh: '世界上唯一有生日的文字。', correct: true },
        { zh: '世界上最古老的文字。', correct: false },
        { zh: '生日在世界的一种文字。', correct: false },
        { zh: '文字里没有生日。', correct: false },
      ],
    },
    {
      id: 'd39-o3',
      kind: 'zh-to-ko',
      zhPrompt: '好像在下雨。',
      successMsg: '"비가 오는 것 같아요." — 动词现在 → 는 것 같아요.',
      choices: [
        { ko: '비가 오는 것 같아요.', correct: true },
        { ko: '비가 오은 것 같아요.', correct: false },
        { ko: '비가 온 것 같아요.', correct: false },
        { ko: '비가 온다는 것 같아요.', correct: false },
      ],
    },
    {
      id: 'd39-o4',
      kind: 'particle-error',
      zhHint: 'Junho好像是KPOP粉丝。',
      successMsg: '팬(名词) → **인 것 같아요**。名词接인。',
      choices: [
        { ko: '준호는 팬인 것 같아요.', correct: true },
        { ko: '준호는 팬 것 같아요.', correct: false },
        { ko: '준호는 팬는 것 같아요.', correct: false },
        { ko: '준호는 팬이 것 같아요.', correct: false },
      ],
    },
    {
      id: 'd39-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 39 全对。你写下的每个字母，都是一张脸的一部分。',
      pairs: [
        { ko: '한글날', zh: '韩文日' },
        { ko: '세종대왕', zh: '世宗大王' },
        { ko: '만들다', zh: '创造' },
        { ko: '과학적', zh: '科学的' },
        { ko: '특별하다', zh: '特别' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '한글의 생일을 알게 됐어요. 30일 동안 쓴 글자에 이야기가 하나 더 생겼어요.',
    preview: '晚上，Minji邀请Tori去她家吃饭——第一次进韩国朋友的家。',
    stickerId: 'sticker-d39',
    sceneImageUrl: '/images/diary/day-39-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~는 것 같아요 什么时候用？」「ㄱㅁㅅㅇ 都是嘴巴形状吗？」',
};
