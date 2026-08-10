import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 41 · 발표 준비 · 火锅和KPOP的共同点
 *
 * 剧情：火鹤老师布置课堂发表——介绍自己的国家。Tori决定介绍中国火锅文化。
 * 她准备了一整晚，把火锅底料带到教室当道具。想到一个连接：火锅和KPOP的共同点是"一起"。
 *
 * 学习目标：목적 ~기 위해서 / 준비 표현 / 발표 어휘
 * 语料层级：해요体 · 书面感
 * 韩语自审：korean skill PASS
 */
export const day41: ToriDay = {
  level: 'intermediate',
  day: 11,
  phase: 'expansion',
  title: '课堂发表准备 · 火锅和KPOP的共同点', titleEn: 'Class presentation prep · What hotpot and KPOP have in common',
  subtitle: '深夜书桌前的PPT和一袋火锅底料', subtitleEn: 'Late-night desk with a PPT and a bag of hotpot base',
  heroImageUrl: '/images/diary/day-41-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 13일 · 일요일 밤',
    weather: '兽尔 · 秋雨', weatherEn: 'Seoul · Autumn rain',
    toriPose: 'shy',
    diaryText: `10月13日，周日深夜。

火鹤老师布置了课堂发表——
"우리나라를 소개해 보세요."（介绍自己的国家。）

我盯着PPT空白页发呆。
介绍中国太大了。长城？功夫？熊猫？
每一个都被讲烂了。

翻到抽屉最里层，
妈妈寄来的火锅底料还剩一袋。

眼睛突然亮了——
就讲火锅。
不讲历史，不讲地理。
讲一锅红油怎么变成一群人的晚餐。

我打开搜索引擎查韩语单词：
훠궈、공동、같이 먹기 문화……

写着写着，我停下来。
火锅和KPOP有什么共同点？

一起吃 vs 一起喊。
围着锅 vs 围着舞台。
辣到眼泪 vs 燃到眼泪。

哈——都是"함께"（一起）。
我在标题上写下：

「함께의 맛」
（一起的味道）

窗外雨还在下，
我准备到凌晨两点。
明天，讲台见。`,
  },

  words: [
    {
      id: 'd41-w1',
      korean: '발표',
      hangul: 'bal-pyo',
      zh: '发表/演讲', zhEn: 'presentation',
      pos: '名词', posEn: 'Noun',
      example: { ko: '내일 발표가 있어요.', zh: '明天有发表。', zhEn: 'I have a presentation tomorrow.' },
      tip: '发(발) + 表(표)。汉字词。발표하다 = 做发表', tipEn: '발 (发) + 표 (表). Sino-Korean word. 발표하다 = to present',
    },
    {
      id: 'd41-w2',
      korean: '준비하다',
      hangul: 'jun-bi-ha-da',
      zh: '准备', zhEn: 'preparation',
      pos: '动词', posEn: 'Verb',
      example: { ko: '발표를 준비하고 있어요.', zh: '正在准备发表。', zhEn: 'I\'m preparing for the presentation.' },
      tip: '준비(准备) + 하다。사전 준비 = 事前准备', tipEn: '준비 (preparation) + 하다. 사전 준비 = advance preparation',
    },
    {
      id: 'd41-w3',
      korean: '소개하다',
      hangul: 'so-gae-ha-da',
      zh: '介绍', zhEn: 'introduce',
      pos: '动词', posEn: 'Verb',
      example: { ko: '우리나라를 소개해요.', zh: '介绍我的国家。', zhEn: 'I\'ll introduce my country.' },
      tip: '소개(介绍) + 하다。자기소개 = 自我介绍', tipEn: '소개 (introduce) + 하다. 자기소개 = self-introduction',
    },
    {
      id: 'd41-w4',
      korean: '문화',
      hangul: 'mun-hwa',
      zh: '文化', zhEn: 'culture',
      pos: '名词', posEn: 'Noun',
      example: { ko: '중국 훠궈 문화를 발표해요.', zh: '发表中国火锅文化。', zhEn: 'I\'ll present on Chinese hotpot culture.' },
      tip: '文(문) + 化(화)。汉字词，用法和中文一样', tipEn: '文(문) + 化(화). Sino-Korean word, used the same way as in Chinese.',
    },
    {
      id: 'd41-w5',
      korean: '공통점',
      hangul: 'gong-tong-jjeom',
      zh: '共同点', zhEn: 'Common point',
      pos: '名词', posEn: 'Noun',
      example: { ko: '훠궈와 KPOP의 공통점은 "함께"예요.', zh: '火锅和KPOP的共同点是"一起"。', zhEn: 'The common point between hotpot and KPOP is "together."' },
      tip: '공통(共同) + 점(点)。发表里常用来做对比', tipEn: '공통(共同) + 점(点). Often used in presentations for comparisons.',
    },
    {
      id: 'd41-w6',
      korean: '주제',
      hangul: 'ju-je',
      zh: '主题', zhEn: 'Topic',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오늘 발표 주제는 훠궈예요.', zh: '今天发表主题是火锅。', zhEn: 'Today\'s presentation topic is hotpot.' },
      tip: '主(주) + 题(제)。汉字词。주제를 정하다 = 定主题', tipEn: '主(주) + 题(제). Sino-Korean word. 주제를 정하다 = to set a topic.',
    },
  ],

  dialogue: {
    scene: '자기 방·PPT 만들기',
    setting: {
      time: '周日深夜', timeEn: 'Late Sunday Night',
      place: 'Tori的书桌', placeEn: 'Tori\'s desk',
      npc: '（内心 / Junho 消息）', npcEn: '(Inner thoughts / Junho\'s message)',
    },
    lines: [
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '뭘 소개하지? 만리장성? 판다?',
        hangul: 'mwol so-gae-ha-ji? mal-li-jang-seong? pan-da?',
        zh: '介绍什么呢？长城？熊猫？', zhEn: 'What should I introduce? The Great Wall? Pandas?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '훠궈 문화를 소개하기 위해서 자료를 찾자.',
        hangul: 'hwo-gwo mun-hwa-reul so-gae-ha-gi wi-hae-seo ja-ryo-reul chat-ja',
        zh: '为了介绍火锅文化，来找资料吧。', zhEn: 'Let\'s look for materials to introduce hotpot culture.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '토리, 발표 준비 잘 돼가?',
        hangul: 'to-ri, bal-pyo jun-bi jal dwae-ga?',
        zh: '兔莉，发表准备顺利吗？', zhEn: 'Tori, is your presentation prep going well?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '응, 훠궈랑 KPOP의 공통점을 찾았어.',
        hangul: 'eung, hwo-gwo-rang KPOP-ui gong-tong-jjeo-meul cha-ja-sseo',
        zh: '嗯，找到火锅和KPOP的共同点了。', zhEn: 'Yeah, I found the common point between hotpot and KPOP.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '진짜? 뭔데?',
        hangul: 'jin-jja? mwon-de?',
        zh: '真的？是什么？', zhEn: 'Really? What is it?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Junho问共同点是什么。Tori想用一个词概括。合适的一句？', zhEn: 'Junho asks what the common point is. Tori wants to sum it up in one word. Which fits?',
        practice: 'pick',
        choices: [
          { ko: '"함께"야. 같이 먹고 같이 응원하는 거.', zh: '是"一起"。一起吃、一起应援。', zhEn: 'It\'s "together." Eating together, cheering together.', correct: true },
          { ko: '아직 몰라.', zh: '还不知道。', zhEn: 'I don\'t know yet.', correct: false },
          { ko: '훠궈가 더 매워.', zh: '火锅更辣。', zhEn: 'Hotpot is spicier.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '为了___：~기 위해서', titleEn: 'To do ___ : ~기 위해서',
    pattern: 'V 어간 + **기 위해서** · N + **을/를 위해서**',
    whenToUse: '「为了做___」的目的连接。Tori 说 「훠궈 문화를 소개하기 위해서 자료를 찾아요」= 为了介绍火锅文化去找资料。~기 위해서 前是目的，后是行动。发表准备/写论文/学韩语的动机都可以用。', whenToUseEn: 'Connects purpose with "to do ___". Tori says "훠궈 문화를 소개하기 위해서 자료를 찾아요" = to introduce hotpot culture, I look for materials. ~기 위해서 is followed by the action, preceded by the purpose. Works for presentation prep, writing papers, or motivations for learning Korean.',
    rules: [
      '**动词 + 기 위해서**：소개하다 → 소개하기 위해서（为了介绍）。배우다 → 배우기 위해서（为了学）',
      '**名词 + 을/를 위해서**：가족을 위해서（为了家人）。발표를 위해서（为了发表）',
      '**~기 위해**：书面/正式版本，去掉서。논문을 쓰기 위해 자료를 모아요',
      '**主语一致**：~기 위해서 前后一般是同一个人。为别人做用 ~을/를 위해서（N 형）'
    ],
    examples: [
      { ko: '훠궈 문화를 소개하기 위해서 자료를 찾아요.', zh: '为了介绍火锅文化在找资料。', zhEn: 'I\'m looking for materials to introduce hotpot culture.', highlight: '소개하기 위해서', note: '소개하다 → 소개하기 + 위해서。发表准备的经典句', noteEn: '소개하다 → 소개하기 + 위해서. A classic sentence for presentation prep.' },
      { ko: '한국어를 배우기 위해서 한국에 왔어요.', zh: '为了学韩语来到韩国。', zhEn: 'I came to Korea to learn Korean.', highlight: '배우기 위해서', note: '배우다 → 배우기 + 위해서。留学生自述固定表达', noteEn: '배우다 → 배우기 + 위해서. A fixed expression for international students\' self-introductions.' },
      { ko: '가족을 위해서 열심히 일해요.', zh: '为了家人努力工作。', zhEn: 'I work hard for my family.', highlight: '가족을 위해서', note: '名词后加 을/를 위해서。가족(有받침 ㄱ) → 을' },
      { ko: '건강을 위해서 매일 운동해요.', zh: '为了健康每天运动。', zhEn: 'Exercise every day for your health.', highlight: '건강을 위해서', note: '건강(有받침 ㅇ) → 을 위해서。健康/家人/梦想是三大名词搭配' },
    ],
    pitfall:
      '① 动词用 **기 위해서**（기 是名词化），名词用 **을/를 위해서**（을/를 是宾格助词）。混用是初学者最常见错误。② ~기 위해서 前后**主语要一致**：为了自己做用 ~기 위해서；为了别人做用 ~을/를 위해서（N형）。③ 有个更口语的替代 ~(으)려고，但语感更"打算"，不完全等价。~기 위해서 更书面正式。',
  },

  output: [
    {
      id: 'd41-o1',
      kind: 'compose',
      zhHint: '为了介绍火锅文化在找资料。', zhHintEn: 'I\'m looking for materials to introduce hotpot culture.',
      tokens: ['훠궈 문화를', '소개하기 위해서', '자료를', '찾아요', '소개하려고', '찾았어요'],
      composeAnswer: ['훠궈 문화를', '소개하기 위해서', '자료를', '찾아요'],
      successMsg: '기 위해서 + 主行动。发表准备第一步。', successMsgEn: '기 위해서 + main action. The first step in preparing a presentation.',
    },
    {
      id: 'd41-o2',
      kind: 'listen-choice',
      audioKo: '한국어를 배우기 위해서 한국에 왔어요.',
      successMsg: '✓ 留学生自我介绍必备句。', successMsgEn: '✓ Essential sentence for international students\' self-introductions.',
      choices: [
        { zh: '为了学韩语来到韩国。', zhEn: 'I came to Korea to learn Korean.', correct: true },
        { zh: '来了韩国之后开始学韩语。', zhEn: 'I started learning Korean after coming to Korea.', correct: false },
        { zh: '在韩国的时候学韩语。', zhEn: 'I learned Korean while in Korea.', correct: false },
        { zh: '韩国人学韩语。', zhEn: 'Koreans learn Korean.', correct: false },
      ],
    },
    {
      id: 'd41-o3',
      kind: 'zh-to-ko',
      zhPrompt: '为了健康每天运动。', zhPromptEn: 'Exercise every day for your health.',
      successMsg: '"건강을 위해서 매일 운동해요." — 名词用 을/를 위해서。', successMsgEn: '"건강을 위해서 매일 운동해요." — Use 을/를 위해서 with nouns.',
      choices: [
        { ko: '건강을 위해서 매일 운동해요.', correct: true },
        { ko: '건강기 위해서 매일 운동해요.', correct: false },
        { ko: '건강을 위해기 매일 운동해요.', correct: false },
        { ko: '건강이 위해서 매일 운동해요.', correct: false },
      ],
    },
    {
      id: 'd41-o4',
      kind: 'particle-error',
      zhHint: '为了家人努力工作。', zhHintEn: 'I work hard for my family.',
      successMsg: '가족(받침 ㄱ) → **을 위해서**。名词 + 을/를 위해서 = 목적.',
      choices: [
        { ko: '가족을 위해서 열심히 일해요.', correct: true },
        { ko: '가족를 위해서 열심히 일해요.', correct: false },
        { ko: '가족기 위해서 열심히 일해요.', correct: false },
        { ko: '가족의 위해서 열심히 일해요.', correct: false },
      ],
    },
    {
      id: 'd41-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 41 全对。明天讲台见——「함께의 맛」。', successMsgEn: '✓ Day 41 all correct. See you at the podium tomorrow — \'The Taste of Togetherness.\'',
      pairs: [
        { ko: '발표', zh: '发表', zhEn: 'Presentation' },
        { ko: '준비하다', zh: '准备', zhEn: 'preparation' },
        { ko: '소개하다', zh: '介绍', zhEn: 'introduce' },
        { ko: '문화', zh: '文化', zhEn: 'culture' },
        { ko: '공통점', zh: '共同点', zhEn: 'Common point' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '「함께의 맛」이라는 제목까지 정했어요. 새벽 두 시까지 잘 준비했어요.',
    preview: '明天上台。5分钟，一袋火锅底料，一个连接——能讲好吗？', previewEn: 'Going on stage tomorrow. 5 minutes, a bag of hotpot seasoning, one connection — can I pull it off?',
    stickerId: 'sticker-d41',
    sceneImageUrl: '/images/diary/day-41-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~기 위해서 和 ~(으)려고 有什么区别？」「发表开场怎么说？」',
};
