import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 23 · 弘爪街 생카 · 老虎追星的样子
 *
 * 剧情：Junho拽着Tori去弘爪街拐角的달빛카페，外头排了30人。
 * 排队时Tori觉得角落有一只灰狼盯着她看了一眼，转头就消失了。
 *
 * 学习目标：진짜 vs 정말 / KPOP粉丝词汇 / 感叹表达
 * 语料层级：해요体 + 반말（Junho朋友语气）
 * 韩语自审：korean skill PASS（자연성/문법/조사 三关）
 */
export const day23: ToriDay = {
  level: 'beginner',
  day: 23,
  phase: 'expression',
  title: '弘爪街生咖 · 老虎追星的样子', titleEn: 'Hongdae Street Cafe · A tiger fanboying',
  subtitle: 'Junho兴奋到尾巴在抖', subtitleEn: 'Junho\'s tail is trembling with excitement',
  heroImageUrl: '/images/diary/day-23-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 23일 · 월요일 오후',
    weather: '兽尔 · 晴朗', weatherEn: 'Seoul · Sunny',
    toriPose: 'shy',
    diaryText: `9月23日，周一下午。

Junho一下课就拽着我跑：
"토리야 빨리! 모찌 오빠 생카 오늘까지야!"
（兔莉快点！Mochi哥生日咖啡今天结束！）

弘爪街拐角，一家叫「달빛카페」（月光咖啡）的小店，
外头排了快30人。
玻璃橱窗贴满粉色应援横幅。

Junho的尾巴在抖。
我第一次见老虎这么兴奋。

排队的时候——
角落里，好像有一只灰色的狼盯着我看了一眼。
我转头，什么都没有。

大概是错觉吧。`,
  },

  words: [
    {
      id: 'd23-w1',
      korean: '오빠',
      hangul: 'o-ppa',
      zh: '哥哥/男爱豆（女粉对男偶像的称呼）', zhEn: 'Oppa / male idol (what female fans call male idols)',
      pos: '名词', posEn: 'Noun',
      example: { ko: '모찌 오빠 진짜 멋있어요!', zh: 'Mochi哥真帅！', zhEn: 'Mochi oppa is so handsome!' },
      tip: '오빠 本义是"亲哥哥"（女性用），追星时指男爱豆', tipEn: '오빠 originally means "older brother" (used by females), but in fan culture it refers to male idols.',
    },
    {
      id: 'd23-w2',
      korean: '언니',
      hangul: 'eon-ni',
      zh: '姐姐/女爱豆（女粉对女偶像的称呼）', zhEn: 'Unnie / female idol (what female fans call female idols)',
      pos: '名词', posEn: 'Noun',
      example: { ko: '언니 노래 정말 좋아요.', zh: '姐姐的歌真的很好听。', zhEn: 'Unnie\'s songs are really good.' },
      tip: '언니 本义是"亲姐姐"（女性用），追星时指女爱豆', tipEn: '언니 originally means "older sister" (used by females), but in fan culture it refers to female idols.',
    },
    {
      id: 'd23-w3',
      korean: '팬',
      hangul: 'paen',
      zh: '粉丝', zhEn: 'Fan',
      pos: '名词', posEn: 'Noun',
      example: { ko: '저도 팬이 됐어요.', zh: '我也成为粉丝了。', zhEn: 'I became a fan too.' },
      tip: '英语 fan 的韩式外来语。팬이 되다 = 成为粉丝', tipEn: 'Korean loanword from English "fan." 팬이 되다 = to become a fan.',
    },
    {
      id: 'd23-w4',
      korean: '콘서트',
      hangul: 'kon-seo-teu',
      zh: '演唱会', zhEn: 'Concert',
      pos: '名词', posEn: 'Noun',
      example: { ko: '콘서트에 가고 싶어요.', zh: '想去演唱会。', zhEn: 'I want to go to the concert.' },
      tip: '英语 concert 的韩式外来语。콘서트 표 = 演唱会门票', tipEn: 'Korean loanword from English \'concert.\' 콘서트 표 = concert ticket',
    },
    {
      id: 'd23-w5',
      korean: '진짜',
      hangul: 'jin-jja',
      zh: '真的（口语/随意）', zhEn: 'really (casual/informal)',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '진짜 좋아요!', zh: '真的好棒！', zhEn: 'That\'s really awesome!' },
      tip: '진짜 比 정말 更口语、更年轻人语感。朋友间常用', tipEn: '진짜 is more casual and youthful than 정말. Commonly used among friends.',
    },
    {
      id: 'd23-w6',
      korean: '정말',
      hangul: 'jeong-mal',
      zh: '真的（正式/所有场合）', zhEn: 'really (formal/all situations)',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '정말 감사합니다.', zh: '真的非常感谢。', zhEn: 'Thank you so much.' },
      tip: '정말 比 진짜 更正式。对长辈/正式场合优先用 정말', tipEn: '정말 is more formal than 진짜. Use 정말 with elders or in formal settings.',
    },
  ],

  dialogue: {
    scene: '弘爪街·生日咖啡排队', sceneEn: 'Hongjo Street · Birthday Café Lineup',
    setting: {
      time: '周一下午', timeEn: 'Monday afternoon',
      place: '달빛카페（月光咖啡）门口', placeEn: 'In front of Dalbit Café (Moonlight Café)',
      npc: 'Junho（老虎·班长·KPOP死忠）', npcEn: 'Junho (Tiger · Class President · KPOP Superfan)',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '토리야, 여기 봐. 모찌 오빠 생일카페야!',
        hangul: 'to-ri-ya, yeo-gi bwa. mo-jji o-ppa saeng-il-ka-pe-ya!',
        zh: '兔莉你看，这是Mochi哥生日咖啡店！', zhEn: 'Tori, look! This is Mochi oppa\'s birthday café!',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '와, 진짜 사람 많아!',
        hangul: 'wa, jin-jja sa-ram ma-na!',
        zh: '哇，真的好多人！', zhEn: 'Wow, there are so many people!',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '음료 한 잔 사면 응원 카드 받을 수 있어!',
        hangul: 'eum-nyo han jan sa-myeon eung-won ka-deu ba-deul su i-sseo!',
        zh: '买一杯就能拿到应援卡！', zhEn: 'Buy one drink and you get a support card!',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '나도 팬이 돼도 돼?',
        hangul: 'na-do pae-ni dwae-do dwae?',
        zh: '我也可以当粉丝吗？', zhEn: 'Can I be a fan too?',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '방금 늑대… 나를 봤나?',
        hangul: 'bang-geum neuk-dae… na-reul bwat-na?',
        zh: '刚才那个狼……看我了吗？', zhEn: 'Did that wolf just now... look at me?',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: 'Junho说演唱会下周开，Tori很兴奋想去。她应该怎么说？', zhEn: 'Junho said the concert is next week, and Tori is excited to go. What should she say?',
        practice: 'pick',
        choices: [
          { ko: '진짜? 정말 가고 싶어요!', zh: '真的吗？真的好想去！', zhEn: 'Really? I really want to go!', correct: true },
          { ko: '콘서트가 뭐예요?', zh: '演唱会是什么？', zhEn: 'What\'s a concert?', correct: false },
          { ko: '저는 안 가요.', zh: '我不去。', zhEn: 'I\'m not going.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '真的：진짜 vs 정말', titleEn: 'Really: 진짜 vs 정말',
    pattern: '**진짜** = 真的（口语/年轻人/朋友间）  |  **정말** = 真的（正式/礼貌/通用）', patternEn: '**진짜** = really (casual/young/among friends)  |  **정말** = really (formal/polite/general)',
    whenToUse: '两个都是"真的"，但语感和使用场景不同。Day 23 Junho说"진짜"（朋友间口语），Tori 表达"我真的想去"时特意用해요体+정말 = 郑重、认真的态度。跟朋友说话主体用반말（진짜?/사람 많아!）+ 关键情感句转해요体加重认真感——韩国年轻人真实用法。', whenToUseEn: 'Both mean \'really,\' but they differ in nuance and usage. On Day 23, Junho says \'진짜\' (casual among friends), while Tori deliberately uses 해요체 + 정말 to say \'I really want to go\' — showing a sincere, earnest attitude. When talking to friends, the main tone is 반말 (진짜?/사람 많아!), but switching to 해요체 for key emotional sentences adds weight — this is how young Koreans actually speak.',
    rules: [
      '**진짜 用法**：口语、朋友间、感叹时。진짜 좋아요!（真好！）/ 진짜?（真的吗？）/ 진짜 맛있어!（真好吃！）。语气更随意、更有感情色彩',
      '**정말 用法**：所有场合通用，偏正式。정말 감사합니다（真的很感谢）/ 정말 좋아해요（真的很喜欢）。对长辈、不熟的人、正式场合用 정말',
      '**互换规则**：정말 可以替代所有 진짜 的位置（安全选择）；진짜 不能替代所有 정말 的位置（对老师说 진짜 감사합니다 有点幼稚）',
      '**名词用法**：진짜 还能当名词 = "真货"。이거 진짜예요?（这是真品吗？）/ 진짜 가짜?（真的假的？）。정말 没有名词用法',
      '**感叹强调**：진짜 常单独使用表惊讶。"진짜?!"（真的？！）非常口语。정말 单独用时正式感更重："정말요?"（真的吗？）',
      '**叠加使用**：진짜 정말（真的真的）年轻人强调时会叠用。진짜 진짜（真的真的）也常见。但不会说 정말 정말 정말（太啰嗦）',
      '**书面 vs 口语**：写作文/邮件/报告 → 정말。聊天/短信/朋友对话 → 진짜。两个都出现在 Day 23 的对话里',
    ],
    examples: [
      { ko: '진짜 좋아요!', zh: '真的好棒！', zhEn: 'That\'s really awesome!', highlight: '진짜', note: '口语感叹。朋友间表达兴奋/惊讶时最自然的选择', noteEn: 'Casual exclamation. The most natural choice for expressing excitement/surprise among friends.' },
      { ko: '정말 감사합니다.', zh: '真的非常感谢。', zhEn: 'Thank you so much.', highlight: '정말', note: '합쇼체正式感谢。用 진짜 감사합니다 也行但语感偏年轻', noteEn: 'Formal thanks in 합쇼체. You can also say 진짜 감사합니다, but it sounds more youthful.' },
      { ko: '진짜? 정말 가고 싶어요!', zh: '真的吗？真的好想去！', zhEn: 'Really? I really want to go!', highlight: '진짜 + 정말', note: '진짜?（惊讶反问·口语）+ 정말 가고 싶어요（认真表达愿望·稍正式）', noteEn: 'Really? (surprised retort, casual) + I really want to go (earnest wish, slightly formal)' },
      { ko: '이 가방 진짜예요?', zh: '这包是真品吗？', zhEn: 'Is this bag genuine?', highlight: '진짜', note: '진짜 当名词 = 真品/真货。정말 没有这个用法', noteEn: '진짜 as a noun = genuine/real. 정말 doesn\'t have this usage.' },
      { ko: '정말 미안해요.', zh: '真的很抱歉。', zhEn: 'I\'m really sorry.', highlight: '정말', note: '道歉时用 정말 更真诚。진짜 미안해 也可以但更随意（반말）', noteEn: 'Use 정말 for apologies—it sounds more sincere. 진짜 미안해 works too but is more casual (반말).' },
    ],
    pitfall:
      '① 对长辈/老师说"진짜요?"不算错但语感偏幼稚，推荐"정말요?"更得体。② 진짜 当名词（真品）时，정말 不能替换：이거 정말이에요? ❌ → 이거 진짜예요? ✓。③ 书面语（作文/邮件）中避免 진짜，用 정말 或 참으로。',
  },

  output: [
    {
      id: 'd23-o1',
      kind: 'compose',
      zhHint: '真的吗？真的好想去！', zhHintEn: 'Really? I really want to go!',
      tokens: ['진짜', '정말', '가고', '싶어요', '좋아요', '있어요'],
      composeAnswer: ['진짜', '정말', '가고', '싶어요'],
      successMsg: '진짜? 정말 가고 싶어요! — 두 단어를 같이 쓰면 진심이 전해져요.',
    },
    {
      id: 'd23-o2',
      kind: 'listen-choice',
      audioKo: '음료 한 잔 사면 응원 카드 받을 수 있어!',
      successMsg: '✓ 사면 = 买了的话；받을 수 있어 = 能拿到。生日咖啡的规则。', successMsgEn: '✓ 사면 = if you buy; 받을 수 있어 = you can get. The birthday coffee rule.',
      choices: [
        { zh: '买一杯就能拿到应援卡！', zhEn: 'Buy one drink and you get a support card!', correct: true },
        { zh: '应援卡可以买一杯饮料。', zhEn: 'A support card can get you one drink.', correct: false },
        { zh: '一杯饮料30块。', zhEn: 'One drink costs 30 yuan.', correct: false },
        { zh: '不能买饮料。', zhEn: 'You can\'t buy a drink.', correct: false },
      ],
    },
    {
      id: 'd23-o3',
      kind: 'zh-to-ko',
      zhPrompt: '真的非常感谢。', zhPromptEn: 'Thank you so much.',
      successMsg: '"정말 감사합니다." — 正式感谢用 정말，不用 진짜。', successMsgEn: '"정말 감사합니다." — Use 정말 for formal thanks, not 진짜.',
      choices: [
        { ko: '정말 감사합니다.', correct: true },
        { ko: '진짜 감사합니다.', correct: false },
        { ko: '정말 고마워.', correct: false },
        { ko: '진짜 고맙습니다.', correct: false },
      ],
    },
    {
      id: 'd23-o4',
      kind: 'particle-error',
      zhHint: '我也成为粉丝了。', zhHintEn: 'I became a fan too.',
      successMsg: '팬 有收音ㄴ → 이 됐어요。저 无收音 → 도。', successMsgEn: '팬 has final consonant ㄴ → 이 됐어요. 저 has no final consonant → 도.',
      choices: [
        { ko: '저도 팬이 됐어요.', correct: true },
        { ko: '저도 팬가 됐어요.', correct: false },
        { ko: '저는도 팬이 됐어요.', correct: false },
        { ko: '저도 팬이 됬어요.', correct: false },
      ],
    },
    {
      id: 'd23-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 23 全对。Tori也开始追星了！', successMsgEn: '✓ Day 23 all correct. Tori\'s getting into fan culture too!',
      pairs: [
        { ko: '오빠', zh: '男爱豆（女粉称呼）', zhEn: 'male idol (female fan\'s term)' },
        { ko: '팬', zh: '粉丝', zhEn: 'Fan' },
        { ko: '콘서트', zh: '演唱会', zhEn: 'Concert' },
        { ko: '진짜', zh: '真的（口语）', zhEn: 'really (casual)' },
        { ko: '정말', zh: '真的（正式）', zhEn: 'really (formal)' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '첫 생카 방문 완료! 진짜 재밌었어요, 토리!',
    preview: '明天群聊会炸——三个朋友同时 @ 我，约新开的咖啡馆。', previewEn: 'The group chat will blow up tomorrow—three friends @ me at once, planning a new café.',
    stickerId: 'sticker-d23',
    sceneImageUrl: '/images/diary/day-23-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「진짜和정말有什么区别？」「韩国生日咖啡是什么文化？」',
};
