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
  level: 'beginner',
  day: 1,
  phase: 'foundation',
  title: '出发前夜 · 妈妈的胡萝卜', titleEn: 'The Night Before Departure · Mom\'s Carrots',
  subtitle: '镜子前的第一次自我介绍', subtitleEn: 'First Self-Introduction in Front of the Mirror',
  heroImageUrl: '/images/diary/day-01-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 1일 · 출발 전날 밤',
    weather: '兔莉卧室 · 灯下', weatherEn: 'Tori\'s Room · Under the Lamp',
    toriPose: 'shy',
    diaryText: `9月 1日，出发前夜。

我对着镜子练了一百遍"안녕하세요"，嘴还是有点抖。
明天就要一个人飞兽尔了——
我的韩语词典只有翻烂了的两页，胡萝卜笔咬秃了第三支。

妈妈悄悄走进来，把一根胡萝卜塞进我背包。
胡萝卜上用毛笔写着"용기"（勇气）。
她说："有事问它，它会帮你。"

我笑她迷信。但还是，把胡萝卜放进了最里层的口袋。
明天，我就要去兽尔了。`,
  },

  words: [
    {
      id: 'd01-w1',
      korean: '안녕하세요',
      hangul: 'an-nyeong-ha-se-yo',
      zh: '你好（敬语）', zhEn: 'Hello (polite)',
      pos: '感叹词', posEn: 'Interjection',
      example: { ko: '안녕하세요. 토리예요.', zh: '你好。我是兔莉。', zhEn: 'Hello. I\'m Tori.' },
      tip: '韩语第一句。无论早晚都可以用', tipEn: 'Your first Korean sentence. Can be used any time of day.',
    },
    {
      id: 'd01-w2',
      korean: '저',
      hangul: 'jeo',
      zh: '我（敬语谦称）', zhEn: 'I (humble, polite)',
      pos: '代词', posEn: 'Pronoun',
      example: { ko: '저는 토리예요.', zh: '我是兔莉。', zhEn: 'I am Tori.' },
      tip: '对长辈、陌生人用「저」；对朋友才用「나」', tipEn: 'Use \'저\' with elders and strangers; use \'나\' only with friends.',
    },
    {
      id: 'd01-w3',
      korean: '이름',
      hangul: 'i-reum',
      zh: '名字', zhEn: 'Name',
      pos: '名词', posEn: 'Noun',
      example: { ko: '제 이름은 토리예요.', zh: '我的名字是兔莉。', zhEn: 'My name is Tori.' },
      tip: '「제」是「저의」(我的) 的缩写', tipEn: '\'제\' is the contraction of \'저의\' (my).',
    },
    {
      id: 'd01-w4',
      korean: '중국 사람',
      hangul: 'jung-guk sa-ram',
      zh: '中国人', zhEn: 'Chinese person',
      pos: '名词', posEn: 'Noun',
      example: { ko: '저는 중국 사람이에요.', zh: '我是中国人。', zhEn: 'I am Chinese.' },
      tip: '「국가 + 사람」是表达国籍的标准句式', tipEn: '\'국가 + 사람\' is the standard pattern for expressing nationality.',
    },
    {
      id: 'd01-w5',
      korean: '만나서 반가워요',
      hangul: 'man-na-seo ban-ga-wo-yo',
      zh: '很高兴认识你', zhEn: 'Nice to meet you',
      pos: '表达', posEn: 'Expression',
      example: { ko: '안녕하세요, 만나서 반가워요.', zh: '你好，很高兴认识你。', zhEn: 'Hello, nice to meet you.' },
      tip: '第一次见面时礼貌的结尾。比「만나서 반갑습니다」更亲切', tipEn: 'A polite way to end a first meeting. Warmer than \'만나서 반갑습니다\'',
    },
    {
      id: 'd01-w6',
      korean: '용기',
      hangul: 'yong-gi',
      zh: '勇气', zhEn: 'Courage',
      pos: '名词', posEn: 'Noun',
      example: { ko: '용기를 내요.', zh: '鼓起勇气。', zhEn: 'Gather your courage.' },
      tip: '妈妈在胡萝卜上写的两个字。这一路上你也会需要它', tipEn: 'Two words Mom wrote on the carrot. You\'ll need them along the way too.',
    },
    {
      id: 'd01-w7',
      korean: '감사합니다',
      hangul: 'gam-sa-ham-ni-da',
      zh: '谢谢', zhEn: 'Thank you',
      pos: '表达', posEn: 'Expression',
      example: { ko: '감사합니다, 엄마.', zh: '谢谢妈妈。', zhEn: 'Thank you, Mom.' },
      tip: '最高敬语版的"谢谢"。「감사해요」更日常，「고마워」是반말。第一天先学最稳的', tipEn: 'The most formal version of \'thank you.\' \'감사해요\' is more casual, and \'고마워\' is 반말. Start with the safest one on day one.',
    },
  ],

  dialogue: {
    scene: '镜子前的练习', sceneEn: 'Practice in front of the mirror',
    setting: {
      time: '出发前夜', timeEn: 'The night before departure',
      place: '兔莉的卧室·全身镜前', placeEn: 'Tori\'s bedroom, in front of the full-length mirror',
      npc: '镜子里的兔莉 / 妈妈', npcEn: 'Tori in the mirror / Mom',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '안녕하세요.',
        hangul: 'an-nyeong-ha-se-yo',
        zh: '你好。', zhEn: 'Hello.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '저는 토리예요.',
        hangul: 'jeo-neun to-ri-ye-yo',
        zh: '我是兔莉。', zhEn: 'I am Tori.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '저는 중국 사람이에요.',
        hangul: 'jeo-neun jung-guk sa-ram-i-e-yo',
        zh: '我是中国人。', zhEn: 'I am Chinese.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '妈妈', npcNameEn: 'Mom',
        ko: '토리야, 이거 가져가.',
        hangul: 'to-ri-ya, i-geo ga-jyeo-ga',
        zh: '兔莉，把这个带上。', zhEn: 'Tori, take this with you.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '이 당근… 왜 용기라고 써 있지?',
        hangul: 'i dang-geun… wae yong-gi-ra-go sseo it-ji?',
        zh: '这根胡萝卜……为什么写着"勇气"？', zhEn: 'This carrot... why does it say \'courage\'?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '兔莉应该怎么回应妈妈？', zhEn: 'How should Tori respond to Mom?',
        practice: 'pick',
        choices: [
          { ko: '감사합니다.', zh: '谢谢。', zhEn: 'Thank you.', correct: true },
          { ko: '안녕하세요.', zh: '你好。', zhEn: 'Hello.', correct: false },
          { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '我是 ___ : 이에요 / 예요', titleEn: 'I am ___ : 이에요 / 예요',
    pattern: 'N(有收音) + 이에요  /  N(无收音) + 예요', patternEn: 'N (with final consonant) + 이에요 / N (no final consonant) + 예요',
    whenToUse: '韩语第一课——介绍自己、说"是什么"。이에요/예요 是最常用的句尾之一，相当于中文的"是"。Day 1 兔莉对镜子说"안녕하세요, 저는 토리예요"。', whenToUseEn: 'Your first Korean lesson—introducing yourself and saying \'what something is.\' 이에요/예요 is one of the most common endings, equivalent to \'is/am\' in English. On Day 1, Tori says to the mirror, \'안녕하세요, 저는 토리예요.\'',
    rules: [
      '**基本公式**：名词 + 이에요/예요 = 是 ___。区别只看名词最后一个字有没有收音',
      '**有收音 → 이에요**：학생 → 학생이에요（我是学生）。사람 → 사람이에요（我是人/中国人）。收音是字母表下半部的 14 个单终声 + 11 个双终声',
      '**无收音 → 예요**：토리 → 토리예요（我是兔莉）。친구 → 친구예요（是朋友）。无收音就是最后一个字只有上半截，没收底',
      '**快速判断法**：把名词最后一个字拆开看——只有"初声+中声"= 无收音 → 예요；有"初声+中声+终声"= 有收音 → 이에요',
      '**은/는 配合使用**：저는 토리예요 = 说到我（主题 은/는）+ 是兔莉（이에요/예요）。은/는 选哪个也看收音：저(无) → 는，이름(有) → 은',
      '**疑问预览**：把 이에요/예요 句尾升调 → 变疑问句。토리예요（是兔莉）→ 토리예요?（是兔莉吗？）Day 6 会详细学',
      '**否定预览**：이에요/예요 的否定是"이/가 아니에요"。학생이에요 → 학생이 아니에요（不是学生）Day 4 会详细学',
    ],
    examples: [
      { ko: '저는 토리예요.', zh: '我是兔莉。', zhEn: 'I am Tori.', highlight: '예요', note: '토리 末字"리"无收音 → 예요。저 无收音 → 는。第一天最重要的一句', noteEn: 'The last letter of 토리, \'리\', has no final consonant → 예요. 저 has no final consonant → 는. The most important sentence of day one.' },
      { ko: '저는 학생이에요.', zh: '我是学生。', zhEn: 'I am a student.', highlight: '이에요', note: '학생 末字"생"有收音 ㅇ → 이에요。학(学) + 생(生) 都是汉字词', noteEn: 'The last letter of 학생, "생", has a final consonant ㅇ → 이에요. 학(学) and 생(生) are both Sino-Korean words.' },
      { ko: '저는 중국 사람이에요.', zh: '我是中国人。', zhEn: 'I am Chinese.', highlight: '이에요', note: '사람 末字"람"有收音 ㅁ → 이에요。중국(中国) + 사람(人)', noteEn: 'The last letter of 사람, "람", has a final consonant ㅁ → 이에요. 중국(中国) + 사람(人).' },
      { ko: '이름은 토리예요.', zh: '名字是兔莉。', zhEn: 'My name is Tori.', highlight: '예요 + 은', note: '이름 有收音 ㅁ → 主题助词 은。토리 无收音 → 예요。은/는 + 이에요/예요 首次同框', noteEn: '이름 has a final consonant ㅁ → topic particle 은. 토리 has no final consonant → 예요. First time seeing 은/는 + 이에요/예요 together.' },
      { ko: '제 이름은 토리예요.', zh: '我的名字是兔莉。', zhEn: 'My name is Tori.', highlight: '제 ... 은', note: '제 = 저의(我的)缩写。完整自我介绍: 저는 ___예요 + 제 이름은 ___예요', noteEn: '제 is the abbreviation of 저의 (my). Full self-introduction: 저는 ___예요 + 제 이름은 ___예요.' },
    ],
    pitfall:
      '① 判断只看"最后一个字"，不是整个词：중국 사람 → 看"람"有收音 ㅁ → 이에요。② 初学者常把 예요 写成 이예요 ❌— 无收音时是 예요 不是 이예요。③ 收音 ㅇ 虽然不发音但算收音！학생 → 이에요（不是 예요），因为 생 有收音 ㅇ。',
  },

  output: [
    {
      id: 'd01-o1',
      kind: 'compose',
      zhHint: '我是兔莉。', zhHintEn: 'I am Tori.',
      tokens: ['저는', '토리예요', '저예요', '토리는', '토리야'],
      composeAnswer: ['저는', '토리예요'],
      successMsg: '镜子里的兔莉对你笑了一下。一句话，开始了。', successMsgEn: 'Tori in the mirror smiled at you. With one sentence, it began.',
    },
    {
      id: 'd01-o2',
      kind: 'listen-choice',
      audioKo: '저는 중국 사람이에요.',
      successMsg: '✓ 是这句。这一句兔莉明天会反复用到。', successMsgEn: '✓ That\'s the one. Tori will use this sentence repeatedly tomorrow.',
      choices: [
        { zh: '我是中国人。', zhEn: 'I am Chinese.', correct: true },
        { zh: '我是韩国人。', zhEn: 'I am Korean.', correct: false },
        { zh: '我的名字是兔莉。', zhEn: 'My name is Tori.', correct: false },
        { zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
    },
    {
      id: 'd01-o3',
      kind: 'zh-to-ko',
      zhPrompt: '我的名字是兔莉。', zhPromptEn: 'My name is Tori.',
      successMsg: '"제 이름은 토리예요." — 标准自我介绍开头。', successMsgEn: '"제 이름은 토리예요." — The standard way to start a self-introduction.',
      choices: [
        { ko: '제 이름은 토리예요.', correct: true },
        { ko: '저는 이름 토리예요.', correct: false },
        { ko: '제 이름이에요 토리.', correct: false },
        { ko: '토리 이름 저예요.', correct: false },
      ],
    },
    {
      id: 'd01-o4',
      kind: 'particle-error',
      zhHint: '我是中国人。', zhHintEn: 'I am Chinese.',
      successMsg: '저(无收音(받침 없음)) → 는；사람(받침ㅁ) → 이에요。两条规则都拿下。',
      choices: [
        { ko: '저는 중국 사람이에요.', correct: true },
        { ko: '저은 중국 사람이에요.', correct: false },
        { ko: '저는 중국 사람예요.', correct: false },
        { ko: '저는 중국 사람이예요.', correct: false },
      ],
    },
    {
      id: 'd01-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 1 核心词全部对上。明天，机场见。', successMsgEn: '✓ All Day 1 core words matched. See you at the airport tomorrow.',
      pairs: [
        { ko: '안녕하세요', zh: '你好', zhEn: 'Hello' },
        { ko: '저', zh: '我（敬语）', zhEn: 'I (polite)' },
        { ko: '이름', zh: '名字', zhEn: 'Name' },
        { ko: '용기', zh: '勇气', zhEn: 'Courage' },
        { ko: '만나서 반가워요', zh: '很高兴认识你', zhEn: 'Nice to meet you' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '今天，比昨天勇敢了一点点。토리, 잘했어요!', praiseEn: 'Today, you were a little braver than yesterday. Tori, 잘했어요!',
    preview: '明天，我要在飞机上第一次用韩语点饮料。空乘姐姐会问什么？', previewEn: 'Tomorrow, I\'ll order a drink in Korean for the first time on the plane. What will the flight attendant ask?',
    stickerId: 'sticker-d01',
    sceneImageUrl: '/images/diary/day-01-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：如果不知道怎么自我介绍，就问它「韩语里怎么说我叫XX」「이에요和예요有什么区别」。',
};
