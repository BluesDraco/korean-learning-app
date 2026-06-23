import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 1 · 출발 전날 밤 · 出发前夜
 *
 * 剧情：兔莉（토리）在中国的卧室，行李箱已经爆炸三次。她站在全身镜前练习自我介绍，
 * 妈妈悄悄进来，把一根写着「용기」（勇气）的胡萝卜塞进她的背包，告诉她「有事问它，它会帮你」。
 * 兔莉嘴上笑她迷信，但还是把胡萝卜收下了。
 *
 * 学习目标：基础问候 / 自我介绍 / 가 + 이에요/예요
 * 语料层级：해요体（礼貌但温暖，标准自我介绍体）
 * 韩语自审：korean skill PASS（자연성/문법/발음 三关）
 */
export const day1: ToriDay = {
  day: 1,
  phase: 'foundation',
  title: '出发前夜 · 妈妈的胡萝卜',
  subtitle: '镜子前的第一次自我介绍',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9月 1日 출발 전날 밤',
    weather: '中国 北京 · 晴',
    toriPose: 'shy',
    diaryText: `9月 1日，出发前夜。

我对着镜子练了一百遍"안녕하세요"，嘴还是有点抖。
明天就要一个人飞首尔了——
我的韩语词典只有翻烂了的两页，胡萝卜笔咬秃了第三支。

妈妈悄悄走进来，把一根胡萝卜塞进我背包。
胡萝卜上用毛笔写着"용기"（勇气）。
她说："有事问它，它会帮你。"

我笑她迷信。但还是，把胡萝卜放进了最里层的口袋。
明天，我就要去首尔了。`,
  },

  words: [
    {
      id: 'd01-w1',
      korean: '안녕하세요',
      hangul: 'an-nyeong-ha-se-yo',
      zh: '你好（敬语）',
      pos: '感叹词',
      example: { ko: '안녕하세요. 토리예요.', zh: '你好。我是兔莉。' },
      tip: '韩语第一句。无论早晚都可以用',
    },
    {
      id: 'd01-w2',
      korean: '저',
      hangul: 'jeo',
      zh: '我（敬语谦称）',
      pos: '代词',
      example: { ko: '저는 토리예요.', zh: '我是兔莉。' },
      tip: '对长辈、陌生人用「저」；对朋友才用「나」',
    },
    {
      id: 'd01-w3',
      korean: '이름',
      hangul: 'i-reum',
      zh: '名字',
      pos: '名词',
      example: { ko: '제 이름은 토리예요.', zh: '我的名字是兔莉。' },
      tip: '「제」是「저의」(我的) 的缩写',
    },
    {
      id: 'd01-w4',
      korean: '중국 사람',
      hangul: 'jung-guk sa-ram',
      zh: '中国人',
      pos: '名词',
      example: { ko: '저는 중국 사람이에요.', zh: '我是中国人。' },
      tip: '「국가 + 사람」是表达国籍的标准句式',
    },
    {
      id: 'd01-w5',
      korean: '만나서 반가워요',
      hangul: 'man-na-seo ban-ga-wo-yo',
      zh: '很高兴认识你',
      pos: '表达',
      example: { ko: '안녕하세요, 만나서 반가워요.', zh: '你好，很高兴认识你。' },
      tip: '第一次见面时礼貌的结尾。比「만나서 반갑습니다」更亲切',
    },
    {
      id: 'd01-w6',
      korean: '용기',
      hangul: 'yong-gi',
      zh: '勇气',
      pos: '名词',
      example: { ko: '용기를 내요.', zh: '鼓起勇气。' },
      tip: '妈妈在胡萝卜上写的两个字。这一路上你也会需要它',
    },
  ],

  dialogue: {
    scene: '镜子前的练习',
    setting: {
      time: '出发前夜',
      place: '兔莉的卧室·全身镜前',
      npc: '镜子里的兔莉 / 妈妈',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '안녕하세요.',
        hangul: 'an-nyeong-ha-se-yo',
        zh: '你好。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '저는 토리예요.',
        hangul: 'jeo-neun to-ri-ye-yo',
        zh: '我是兔莉。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '저는 중국 사람이에요.',
        hangul: 'jeo-neun jung-guk sa-ram-i-e-yo',
        zh: '我是中国人。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '妈妈',
        ko: '토리야, 이거 가져가.',
        hangul: 'to-ri-ya, i-geo ga-jyeo-ga',
        zh: '兔莉，把这个带上。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '兔莉应该怎么回应妈妈？',
        practice: 'pick',
        choices: [
          { ko: '감사합니다.', zh: '谢谢。', correct: true },
          { ko: '안녕하세요.', zh: '你好。', correct: false },
          { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '我是 ___ : 이에요 / 예요',
    pattern: 'N + 이에요 / 예요',
    whenToUse: '介绍自己、说"是什么"。这是韩语最常用的句尾之一。',
    rules: [
      '名词最后一个字 有받침 → 이에요：학생 → 학생**이에요**',
      '名词最后一个字 没有받침 → 예요：토리 → 토리**예요**',
      '助词「은/는」表示「这个话题」：저**는** = "至于我"',
    ],
    examples: [
      { ko: '저는 토리예요.', zh: '我是兔莉。', highlight: '예요' },
      { ko: '저는 학생이에요.', zh: '我是学生。', highlight: '이에요' },
      { ko: '저는 중국 사람이에요.', zh: '我是中国人。', highlight: '이에요' },
      { ko: '이름은 토리예요.', zh: '名字是兔莉。', highlight: '예요' },
    ],
    pitfall:
      '「토리」最后一字「리」没有받침（리 = ㄹ+ㅣ, 但 ㄹ是初声不是받침）→ 用 예요。「사람」最后一字「람」有받침 ㅁ → 用 이에요。判断的是「最后一个字」，不是整个词。',
  },

  output: [
    {
      id: 'd01-o1',
      kind: 'fill',
      prompt: '저는 토리예요.',
      zhHint: '我是兔莉。',
      answer: '예요',
      tokens: ['저는', '토리예요', '저예요', '토리는', '토리야'],
      composeAnswer: ['저는', '토리예요'],
      successMsg: '镜子里的兔莉对你笑了一下。一句话，开始了。',
    },
    {
      id: 'd01-o2',
      kind: 'fill',
      prompt: '저는 중국 사람이에요.',
      zhHint: '我是中国人。',
      answer: '이에요',
      tokens: ['저는', '중국', '사람이에요', '사람은', '한국', '저예요'],
      composeAnswer: ['저는', '중국', '사람이에요'],
      successMsg: '"중국 사람이에요." 兔莉在镜子前点点头。',
    },
    {
      id: 'd01-o3',
      kind: 'fill',
      prompt: '제 이름은 토리예요.',
      zhHint: '我的名字是兔莉。',
      answer: '예요',
      tokens: ['제', '이름은', '토리예요', '이름이에요', '저는', '토리는'],
      composeAnswer: ['제', '이름은', '토리예요'],
      successMsg: '✓ 三句话连起来，你已经能站在镜子前完整自我介绍了。',
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '今天，比昨天勇敢了一点点。토리, 잘했어요!',
    preview: '明天，我要在飞机上第一次用韩语点饮料。空乘姐姐会问什么？',
    stickerId: 'sticker-d01',
  },

  carrotHint:
    '今天的胡萝卜：如果不知道怎么自我介绍，就问它「韩语里怎么说我叫XX」「이에요和예요有什么区别」。',
};
