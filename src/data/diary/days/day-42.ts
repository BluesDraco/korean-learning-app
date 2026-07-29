import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 42 · 발표 · 讲台上的火锅
 *
 * 剧情：Tori上讲台介绍中国火锅文化。带了火锅底料当道具。讲到"火锅的核心是一起"时，
 * 同学们鼓掌。连Danielle都笑了——那是Tori第一次看到Danielle笑。
 *
 * 学习目标：조건 ~(으)면 / 병렬 ~고 / 발표 마무리
 * 语料层级：해요体 · 정중한 발표
 * 韩语自审：korean skill PASS
 */
export const day42: ToriDay = {
  level: 'intermediate',
  day: 12,
  phase: 'expansion',
  title: '课堂发表 · 介绍中国火锅',
  subtitle: '"火锅的核心是一起" — 教室鼓掌了',
  heroImageUrl: '/images/diary/day-42-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 14일 · 월요일 오후',
    weather: '兽尔 · 秋晴',
    toriPose: 'proud',
    diaryText: `10月14日，周一下午。

第三节课，중급반教室。
15双眼睛，PPT打开，我上台。

"안녕하세요, 저는 토리예요.
오늘은 중국의 훠궈 문화를 소개하겠습니다."

（大家好，我是兔莉。
今天我要介绍中国的火锅文化。）

火锅底料从背包里拿出来——
教室有人吸了一口气"어, 저거 진짜 매워 보이는데!"

第一张PPT：一群人围着一个锅。
第二张PPT：一群人围着一个舞台。

我停顿一下，说：

"훠궈랑 KPOP 공연은 공통점이 하나 있어요.
바로 '함께'예요.
함께 먹으면 훠궈, 함께 응원하면 콘서트.
음식이든 음악이든, 혼자보다 함께가 맛있어요."

（火锅和KPOP演唱会有一个共同点。
就是"一起"。
一起吃就是火锅，一起应援就是演唱会。
不管是食物还是音乐，一起比一个人更有味道。）

教室安静了两秒。
然后有人鼓掌了。
是Junho带头的，Haru跟上，Minji隔着班级远远也在鼓掌——
最后一个鼓掌的，是最后一排的Danielle。

她笑了。
我第一次看到Danielle笑。`,
  },

  words: [
    {
      id: 'd42-w1',
      korean: '강당',
      hangul: 'gang-dang',
      zh: '大礼堂/讲堂',
      pos: '名词',
      example: { ko: '강당에서 발표해요.', zh: '在讲堂发表。' },
      tip: '讲(강) + 堂(당)。学校里正式发表的地方',
    },
    {
      id: 'd42-w2',
      korean: '박수',
      hangul: 'bak-su',
      zh: '掌声',
      pos: '名词',
      example: { ko: '발표가 끝나고 박수를 받았어요.', zh: '发表完受到掌声。' },
      tip: '拍(박) + 手(수)。박수를 치다 = 鼓掌',
    },
    {
      id: 'd42-w3',
      korean: '핵심',
      hangul: 'haek-sim',
      zh: '核心',
      pos: '名词',
      example: { ko: '훠궈의 핵심은 함께예요.', zh: '火锅的核心是一起。' },
      tip: '核(핵) + 心(심)。发表里的关键词',
    },
    {
      id: 'd42-w4',
      korean: '바로',
      hangul: 'ba-ro',
      zh: '就是/正是',
      pos: '副词',
      example: { ko: '바로 함께예요.', zh: '就是"一起"。' },
      tip: '强调答案的副词。바로 + N = 就是N',
    },
    {
      id: 'd42-w5',
      korean: '음식',
      hangul: 'eum-sik',
      zh: '食物',
      pos: '名词',
      example: { ko: '중국 음식은 다양해요.', zh: '中国食物多样。' },
      tip: '饮(음) + 食(식)。요리 是"料理"（成品），음식 是"食物"更广',
    },
    {
      id: 'd42-w6',
      korean: '음악',
      hangul: 'eu-mak',
      zh: '音乐',
      pos: '名词',
      example: { ko: '음악이 흐르면 마음이 편해요.', zh: '音乐流淌心就安。' },
      tip: '音(음) + 乐(악)。KPOP은 한국 음악의 대표',
    },
  ],

  dialogue: {
    scene: '중급반 교실·발표',
    setting: {
      time: '周一下午 14:20',
      place: '韩光语学院·中级班教室',
      npc: '老师 / Junho / Danielle',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '안녕하세요, 오늘은 중국 훠궈 문화를 소개하겠습니다.',
        hangul: 'an-nyeong-ha-se-yo, o-neu-reun jung-guk hwo-gwo mun-hwa-reul so-gae-ha-get-seum-ni-da',
        zh: '大家好，今天我要介绍中国火锅文化。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '훠궈랑 KPOP 공연은 공통점이 하나 있어요.',
        hangul: 'hwo-gwo-rang KPOP gong-yeo-neun gong-tong-jjeo-mi ha-na i-sseo-yo',
        zh: '火锅和KPOP演出有一个共同点。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '바로 "함께"예요. 함께 먹으면 훠궈, 함께 응원하면 콘서트.',
        hangul: 'ba-ro ham-kke-ye-yo. ham-kke meo-geu-myeon hwo-gwo, ham-kke eung-won-ha-myeon kon-seo-teu',
        zh: '就是"一起"。一起吃就是火锅，一起应援就是演唱会。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '와, 진짜 좋은 발표였어!',
        hangul: 'wa, jin-jja jo-eun bal-pyo-yeo-sseo!',
        zh: '哇，真的是很好的发表！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '다니엘도 웃었어… 처음이야.',
        hangul: 'da-ni-el-do u-seo-sseo… cheo-eu-mi-ya',
        zh: 'Danielle也笑了……是第一次。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '发表结束Tori向大家道谢。合适的结束语是？',
        practice: 'pick',
        choices: [
          { ko: '들어주셔서 감사합니다.', zh: '感谢大家聆听。', correct: true },
          { ko: '많이 먹었어요.', zh: '吃了很多。', correct: false },
          { ko: '안녕히 계세요.', zh: '再见（对留下的人）。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '如果___的话：~(으)면',
    pattern: 'V/A 어간 + **(으)면**',
    whenToUse: '「如果做___」的假设条件连接。Tori 说 「함께 먹으면 훠궈」= 如果一起吃就是火锅。~(으)면 表条件也表习惯性因果——是韩语最常用的连接词尾之一，发表/讲道理/推荐都离不开。',
    rules: [
      '**基本公式**：V/A 어간 + (으)면。收音判断：无收音 + **면**，有收音 + **으면**。먹다 → 먹**으면**，가다 → 가**면**',
      '**ㄹ收音特殊**：만들다 → 만들**면**（不加으）。살다 → 살**면**',
      '**过去假设 → ~았/었으면**：만약 어제 왔으면 좋았을 텐데（要是昨天来了就好了）',
      '**~(으)면 좋겠어요**：表愿望"要是___就好了"。한국어를 잘하면 좋겠어요 = 要是能说好韩语就好了。Day 44 会详细复习'
    ],
    examples: [
      { ko: '함께 먹으면 훠궈, 함께 응원하면 콘서트.', zh: '一起吃就是火锅，一起应援就是演唱会。', highlight: '먹으면 ... 응원하면', note: '먹다(有받침) → 먹**으면** / 응원하다(하다) → 응원하**면**。发表金句' },
      { ko: '한국에 가면 뭐 하고 싶어요?', zh: '如果去韩国想做什么？', highlight: '가면', note: '가다 无收音 → **면**。旅行/规划的经典疑问' },
      { ko: '비가 오면 우산을 가져가세요.', zh: '如果下雨请带伞。', highlight: '오면', note: '오다 无받침 → **면**。~(으)면 + 命令(가져가세요) 是合法组合，跟 ~아/어서 不同' },
      { ko: '이 노래를 들으면 훠궈 생각이 나요.', zh: '听到这首歌会想起火锅。', highlight: '들으면', note: '듣다 ㄷ 不规则 → 들으면（ㄷ→ㄹ + 으면）。触发回忆的搭配' },
    ],
    pitfall:
      '① ~(으)면 vs ~아/어서：~(으)면 是**假设/条件**（如果），~아/어서 是**事实原因**（因为）。"下雨了所以不去" = 비가 와서 안 가요；"如果下雨就不去" = 비가 오면 안 가요。② ~(으)면 后面**可以接命令**（不像 ~아/어서）：비가 오면 우산 가져가세요 ✓。③ ㄷ/ㅂ/ㄹ 不规则动词接 ~(으)면 时按平时的不规则处理：듣다→들으면 / 돕다→도우면 / 만들다→만들면.',
  },

  output: [
    {
      id: 'd42-o1',
      kind: 'compose',
      zhHint: '一起吃就是火锅。',
      tokens: ['함께', '먹으면', '훠궈예요', '먹으니까', '먹었으면', '훠궈예'],
      composeAnswer: ['함께', '먹으면', '훠궈예요'],
      successMsg: '发表核心句。~(으)면 + N + 이에요/예요，逻辑清晰。',
    },
    {
      id: 'd42-o2',
      kind: 'listen-choice',
      audioKo: '들어주셔서 감사합니다.',
      successMsg: '✓ 발표 마무리 정석. 記住这句。',
      choices: [
        { zh: '感谢大家聆听。', correct: true },
        { zh: '请进来。', correct: false },
        { zh: '请慢走。', correct: false },
        { zh: '请再讲一遍。', correct: false },
      ],
    },
    {
      id: 'd42-o3',
      kind: 'zh-to-ko',
      zhPrompt: '如果下雨请带伞。',
      successMsg: '"비가 오면 우산을 가져가세요." — ~(으)면 后接命令 OK.',
      choices: [
        { ko: '비가 오면 우산을 가져가세요.', correct: true },
        { ko: '비가 와서 우산을 가져가세요.', correct: false },
        { ko: '비가 오면 우산이 없어요.', correct: false },
        { ko: '비가 온면 우산을 가져가세요.', correct: false },
      ],
    },
    {
      id: 'd42-o4',
      kind: 'particle-error',
      zhHint: '听到这首歌会想起火锅。',
      successMsg: '듣다 ㄷ 不规则 → **들으면**（ㄷ 变 ㄹ + 으면）。',
      choices: [
        { ko: '이 노래를 들으면 훠궈 생각이 나요.', correct: true },
        { ko: '이 노래를 듣면 훠궈 생각이 나요.', correct: false },
        { ko: '이 노래를 듣으면 훠궈 생각이 나요.', correct: false },
        { ko: '이 노래가 들으면 훠궈 생각이 나요.', correct: false },
      ],
    },
    {
      id: 'd42-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 42 全对。你的第一次讲台，被鼓掌了。',
      pairs: [
        { ko: '박수', zh: '掌声' },
        { ko: '핵심', zh: '核心' },
        { ko: '바로', zh: '就是' },
        { ko: '음식', zh: '食物' },
        { ko: '음악', zh: '音乐' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '박수를 받았어요! "함께의 맛"—— 다니엘도 웃게 만들었어요.',
    preview: '明天期中考完，大家去노래방——Junho要开麦了。',
    stickerId: 'sticker-d42',
    sceneImageUrl: '/images/diary/day-42-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~(으)면 和 ~아/어서 有什么区别？」「发表结尾怎么说？」',
};
