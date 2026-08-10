import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 26 · 大创 재방문 · 买了小胡萝卜笔
 *
 * 剧情：Tori再去大创买生活用品，顺手买了一根胡萝卜形状的笔——
 * 和妈妈给的勇气胡萝卜一模一样的颜色。她把笔别在耳朵上。
 *
 * 学习目标：~필요해요（需要）/ 购物补充表达 / 귀엽다 变位
 * 语料层级：해요体（面对店员，礼貌日常）
 * 韩语自审：korean skill PASS（자연성/문법/조사 三关）
 */
export const day26: ToriDay = {
  level: 'beginner',
  day: 26,
  phase: 'expression',
  title: '大创 再访 · 买了小胡萝卜笔', titleEn: 'Daiso revisit · Bought a little carrot pen',
  subtitle: '和妈妈的胡萝卜一模一样的颜色', subtitleEn: 'The exact same color as Mom\'s carrot',
  heroImageUrl: '/images/diary/day-26-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 26일 · 목요일 오후',
    weather: '兽尔 · 多云', weatherEn: 'Seoul · Cloudy',
    toriPose: 'shy',
    diaryText: `9月26日，周四下午。

搬进新家后，还缺一些东西。
洗发水用完了，毛巾也该换新的了。

大创——万能百元店。
走进去，那只穿围裙的羊店员还认得我：
"어서 오세요~"

我拿了洗发水、毛巾、垃圾袋。
走到文具区的时候——
看到一根橙色的笔。

胡萝卜形状。
和妈妈给我的那根勇气胡萝卜，一模一样的颜色。

我把它拿起来，别在耳朵上。
镜子里的兔莉，好像可爱了不少。`,
  },

  words: [
    {
      id: 'd26-w1',
      korean: '필요하다',
      hangul: 'pi-ryo-ha-da',
      zh: '需要', zhEn: 'Need',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '샴푸 필요해요.', zh: '需要洗发水。', zhEn: 'I need shampoo.' },
      tip: '필요(必要) + 하다。N이/가 필요하다 = 需要___', tipEn: '필요 (necessity) + 하다. N이/가 필요하다 = need ___',
    },
    {
      id: 'd26-w2',
      korean: '사다',
      hangul: 'sa-da',
      zh: '买', zhEn: 'Buy',
      pos: '动词', posEn: 'Verb',
      example: { ko: '볼펜을 샀어요.', zh: '买了圆珠笔。', zhEn: 'Bought a ballpoint pen.' },
      tip: '사다 → 사요(해요体)；샀어요(过去)。사 末元音ㅏ→아요 缩合=사요', tipEn: '사다 → 사요 (해요 form); 샀어요 (past). 사 ends in vowel ㅏ → 아요 contracts to 사요',
    },
    {
      id: 'd26-w3',
      korean: '귀',
      hangul: 'gwi',
      zh: '耳朵', zhEn: 'Ear',
      pos: '名词', posEn: 'Noun',
      example: { ko: '펜을 귀에 꽂았어요.', zh: '把笔别在耳朵上了。', zhEn: 'Clipped the pen on my ear.' },
      tip: '귀 无收音。귀에(在耳朵上)；귀걸이 = 耳环', tipEn: '귀 has no final consonant. 귀에 (on the ear); 귀걸이 = earring',
    },
    {
      id: 'd26-w4',
      korean: '볼펜',
      hangul: 'bol-pen',
      zh: '圆珠笔', zhEn: 'Ballpoint pen',
      pos: '名词', posEn: 'Noun',
      example: { ko: '이 당근 볼펜 얼마예요?', zh: '这个胡萝卜笔多少钱？', zhEn: 'How much is this carrot pen?' },
      tip: '볼(ball) + 펜(pen)。韩式外来语复合词', tipEn: '볼 (ball) + 펜 (pen). Korean-style loanword compound',
    },
    {
      id: 'd26-w5',
      korean: '키링',
      hangul: 'ki-ring',
      zh: '钥匙扣', zhEn: 'Keychain',
      pos: '名词', posEn: 'Noun',
      example: { ko: '당근 키링 귀여워요!', zh: '胡萝卜钥匙扣好可爱！', zhEn: 'The carrot keychain is so cute!' },
      tip: '英语 key ring 的韩式外来语。大创에서 많이 팔아요', tipEn: 'Korean loanword from English \'key ring\'. They sell a lot at Daiso',
    },
    {
      id: 'd26-w6',
      korean: '귀엽다',
      hangul: 'gwi-yeop-da',
      zh: '可爱', zhEn: 'Cute',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '이거 진짜 귀여워요!', zh: '这个真的好可爱！', zhEn: 'This is really cute!' },
      tip: '귀엽다 是 ㅂ불규칙：귀엽+어요 → 귀여워요（ㅂ→우）', tipEn: '귀엽다 is a ㅂ-irregular: 귀엽+어요 → 귀여워요 (ㅂ→우)',
    },
  ],

  dialogue: {
    scene: '大创·买生活用品', sceneEn: 'Daiso · Buying daily necessities',
    setting: {
      time: '周四下午', timeEn: 'Thursday afternoon',
      place: '大创（百元店）', placeEn: 'Daiso (100-yen store)',
      npc: '羊店员（穿围裙）', npcEn: 'Sheep clerk (wearing an apron)',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '샴푸 필요해요. 그리고 수건도요.',
        hangul: 'syam-pu pi-ryo-hae-yo. geu-ri-go su-geon-do-yo.',
        zh: '需要洗发水。还有毛巾。', zhEn: 'I need shampoo. And a towel too.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '羊店员', npcNameEn: 'Sheep clerk',
        ko: '여기 있어요. 다른 건요?',
        hangul: 'yeo-gi i-sseo-yo. da-reun geon-yo?',
        zh: '给您。还需要别的吗？', zhEn: 'Here you go. Anything else?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '이 당근 볼펜 얼마예요?',
        hangul: 'i dang-geun bol-pen eol-ma-ye-yo?',
        zh: '这个胡萝卜笔多少钱？', zhEn: 'How much is this carrot pen?',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '羊店员', npcNameEn: 'Sheep clerk',
        ko: '천 원이에요. 귀여워요, 안 그래요?',
        hangul: 'cheon won-i-e-yo. gwi-yeo-wo-yo, an geu-rae-yo?',
        zh: '1000元。很可爱吧？', zhEn: '1,000 won. Cute, right?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '엄마 당근이랑 같은 색…',
        hangul: 'eom-ma dang-geun-i-rang ga-teun saek…',
        zh: '和妈妈的胡萝卜一样的颜色……', zhEn: 'The same color as Mom\'s carrots...',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: 'Tori决定买这支胡萝卜笔。她应该怎么跟店员说？', zhEn: 'Tori decides to buy this carrot pen. What should she say to the clerk?',
        practice: 'pick',
        choices: [
          { ko: '이것도 주세요. 귀여워요!', zh: '这个也要。好可爱！', zhEn: 'I\'ll take this too. So cute!', correct: true },
          { ko: '필요 없어요.', zh: '不需要。', zhEn: 'I don\'t need it.', correct: false },
          { ko: '비싸요.', zh: '太贵了。', zhEn: 'Too expensive.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '需要：N이/가 필요해요', titleEn: 'Need: N이/가 필요해요',
    pattern: 'N(有收音) + **이** 필요해요  /  N(无收音) + **가** 필요해요 = 需要___', patternEn: 'N (with final consonant) + **이** 필요해요 / N (no final consonant) + **가** 필요해요 = need ___',
    whenToUse: '表达"需要某东西"。필요하다(需要) 是形容词，前面的名词用主格助词 이/가。Day 26 兔莉说"샴푸 필요해요"——买东西时告诉店员自己需要什么。', whenToUseEn: 'Expresses "need something." 필요하다 (to need) is an adjective, and the preceding noun takes the subject particle 이/가. On Day 26, Tori says "샴푸 필요해요" — telling the clerk what she needs while shopping.',
    rules: [
      '**基本公式**：N이/가 필요하다 = 需要___。필요하다 是形容词（不是动词），所以主语用 이/가。샴푸가 필요해요（需要洗发水）',
      '**口语省略**：日常口语中 이/가 经常省略。샴푸 필요해요 = 샴푸가 필요해요。两个都对，口语更自然的是省略形',
      '**필요 없다**：不需要 = N 필요 없어요。우산 필요 없어요（不需要雨伞）。없다 前面用空格',
      '**뭐가 필요해요?**：需要什么？= 뭐가 필요해요? / 뭐 필요해요?。店员常问"다른 거 필요하세요?"（还需要别的吗？）',
      '**돈이 필요하다**：钱 有收音ㄴ → 이 필요하다。돈이 필요해요（需要钱）。시간이 필요해요（需要时间）',
      '**귀엽다 变位**：귀엽다 是 ㅂ불규칙 → 귀엽+어요 → 귀여워요（ㅂ脱落变우+어=워）。不是 귀엽어요 ❌',
      '**이것도 주세요**：이것(这个) + 도(也) + 주세요(给我)。购物时追加商品的标准句。口语也说 이거도，但 Day 9 学过标准写法是 이것도',
    ],
    examples: [
      { ko: '샴푸 필요해요.', zh: '需要洗发水。', zhEn: 'I need shampoo.', highlight: '필요해요', note: '샴푸 무收音 → 가 可省略。口语自然省略형' },
      { ko: '돈이 필요해요.', zh: '需要钱。', zhEn: 'I need money.', highlight: '이 필요해요', note: '돈 有收音ㄴ → 이 필요해요。이 在口语中也可省但书面保留', noteEn: '돈 has final consonant ㄴ → 이 필요해요. 이 can be dropped in speech but is kept in writing.' },
      { ko: '시간이 더 필요해요.', zh: '需要更多时间。', zhEn: 'I need more time.', highlight: '이 필요해요', note: '시간 有收音ㄴ → 이。더(更) 放在 필요해요 前面', noteEn: '시간 has final consonant ㄴ → 이. 더 (more) goes before 필요해요.' },
      { ko: '우산 필요 없어요.', zh: '不需要雨伞。', zhEn: 'I don\'t need an umbrella.', highlight: '필요 없어요', note: '필요 없다 = 不需要。없다 是独立形容词，和 필요 之间有空格', noteEn: '필요 없다 = don\'t need. 없다 is a separate adjective, with a space between 필요 and 없다.' },
      { ko: '이거 진짜 귀여워요!', zh: '这个真的好可爱！', zhEn: 'This is really cute!', highlight: '귀여워요', note: '귀엽다 ㅂ불규칙 → 귀엽+어요 = 귀여워요。ㅂ→우+ㅓ=워' },
    ],
    pitfall:
      '① 필요하다 是形容词，名词用이/가（不是 을/를）：샴푸를 필요해요 ❌ → 샴푸가 필요해요 ✓。② 귀엽다 变位：귀엽어요 ❌ → 귀여워요 ✓（ㅂ불규칙）。③ 필요 없다 中间有空格：필요없다 ❌ → 필요 없다 ✓。',
  },

  output: [
    {
      id: 'd26-o1',
      kind: 'compose',
      zhHint: '需要洗发水。还有毛巾。', zhHintEn: 'I need shampoo. And a towel too.',
      tokens: ['샴푸', '필요해요', '그리고', '수건도요', '사요', '있어요'],
      composeAnswer: ['샴푸', '필요해요', '그리고', '수건도요'],
      successMsg: '샴푸 필요해요. 그리고 수건도요. — 大创에서 완벽한 쇼핑!', successMsgEn: '샴푸 필요해요. 그리고 수건도요. — Perfect shopping at Daiso!',
    },
    {
      id: 'd26-o2',
      kind: 'listen-choice',
      audioKo: '천 원이에요. 귀여워요, 안 그래요?',
      successMsg: '✓ 천 원 = 1000元；귀여워요 = 可爱；안 그래요? = 对吧？', successMsgEn: '✓ 천 원 = 1,000 won; 귀여워요 = cute; 안 그래요? = right?',
      choices: [
        { zh: '1000元。很可爱吧？', zhEn: '1,000 won. Cute, right?', correct: true },
        { zh: '1万元。很贵吧？', zhEn: '10,000 won. Pretty expensive, right?', correct: false },
        { zh: '免费的。要吗？', zhEn: 'It\'s free. Want it?', correct: false },
        { zh: '1000元。太丑了吧？', zhEn: '1,000 won. Too ugly, right?', correct: false },
      ],
    },
    {
      id: 'd26-o3',
      kind: 'zh-to-ko',
      zhPrompt: '需要钱。', zhPromptEn: 'I need money.',
      successMsg: '"돈이 필요해요." — 돈 有收音ㄴ → 이 필요해요。', successMsgEn: '"돈이 필요해요." — 돈 has a final consonant ㄴ → 이 필요해요.',
      choices: [
        { ko: '돈이 필요해요.', correct: true },
        { ko: '돈을 필요해요.', correct: false },
        { ko: '돈이 필요하다요.', correct: false },
        { ko: '돈 필요 있어요.', correct: false },
      ],
    },
    {
      id: 'd26-o4',
      kind: 'particle-error',
      zhHint: '这个真的好可爱！', zhHintEn: 'This is really cute!',
      successMsg: '귀엽다 ㅂ불규칙 → 귀여워요（ㅂ脱落→우+ㅓ=워）。', successMsgEn: '귀엽다 ㅂ-irregular → 귀여워요 (ㅂ drops → 우+ㅓ=워).',
      choices: [
        { ko: '이거 진짜 귀여워요!', correct: true },
        { ko: '이거 진짜 귀엽어요!', correct: false },
        { ko: '이거 진짜 귀여요!', correct: false },
        { ko: '이거 진짜 귀엽요!', correct: false },
      ],
    },
    {
      id: 'd26-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 26 全对。胡萝卜笔已别在耳朵上，和Tori一起出发。', successMsgEn: '✓ Day 26 all correct. Carrot pen tucked behind ear, setting off with Tori.',
      pairs: [
        { ko: '필요하다', zh: '需要', zhEn: 'Need' },
        { ko: '사다', zh: '买', zhEn: 'Buy' },
        { ko: '귀엽다', zh: '可爱', zhEn: 'Cute' },
        { ko: '볼펜', zh: '圆珠笔', zhEn: 'Ballpoint pen' },
        { ko: '키링', zh: '钥匙扣', zhEn: 'Keychain' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '당근 볼펜 샀어요! 엄마 당근이랑 같은 색이에요. 토리, 귀여워요!',
    preview: '明天四人聚餐——Tori要第一次请客。韩语怎么说"我来付"？', previewEn: 'Tomorrow\'s four-person dinner — Tori\'s first time treating. How do you say "I\'ll pay" in Korean?',
    stickerId: 'sticker-d26',
    sceneImageUrl: '/images/diary/day-26-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「필요하다前面的名词为什么用이/가不用을/를？」「귀엽다为什么变成귀여워요？」',
};
