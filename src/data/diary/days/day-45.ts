import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 45 · 중간고사 · 中级月考
 *
 * 剧情：中级月考。Tori发现自己考场上没那么紧张。比起刚来时满头大汗，现在完全拿捏。
 * 火鹤老师宣布85分合格。Tori对自己说：进步了很多。
 *
 * 学习目标：비교 ~보다 (더) / 시험 어휘 / 자신감 표현
 * 语料层级：해요体 + 반말（내면 독백）
 * 韩语自审：korean skill PASS
 */
export const day45: ToriDay = {
  level: 'intermediate',
  day: 15,
  phase: 'expansion',
  title: '中级月考 · 轻松通过', titleEn: 'Intermediate monthly exam · passed with ease',
  subtitle: '比起刚来时——已经不那么紧张了', subtitleEn: 'Compared to when I first came—I\'m not as nervous now.',
  heroImageUrl: '/images/diary/day-45-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 17일 · 목요일 오전',
    weather: '兽尔 · 晴', weatherEn: 'Seoul · Sunny',
    toriPose: 'proud',
    diaryText: `10月17日，周四上午。

한빛语学院305号教室。
中间考试。

试卷发下来的时候，我做了三次深呼吸。
——上次月考（Day 30初级毕业月考）
——我手心全是汗。

这次，我打开卷子。
读到第一题——助词填空——
突然觉得，
"어? 이거 다 아는 건데?"
（咦？这些我都会啊？）

15题助词填空，几乎不用停。
5题语法搭配，看一眼就能圈。
听力两遍——我第一遍就听懂。
最后作文题："나의 한 달의 변화"（我这一个月的变化）。

我写了：

"저는 30일 전보다 한국어를 더 잘해요.
30일 전에는 지하철에서 길을 잃어서 울었어요.
지금은 다른 사람에게 길을 알려줄 수 있어요."

（我比30天前韩语更好了。
30天前我在地铁里迷路哭过。
现在我可以给别人指路。）

交卷。

下午成绩公布——85分。합격.

火鹤老师笑着说：
"토리, 진짜 많이 늘었네요."
（兔莉，真的进步很多呢。）

回家路上，
心里默默说了一句：
——저 진짜 많이 늘었어요.（我真的进步很多。）`,
  },

  words: [
    {
      id: 'd45-w1',
      korean: '시험',
      hangul: 'si-heom',
      zh: '考试', zhEn: 'exam',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오늘 시험이 있어요.', zh: '今天有考试。', zhEn: 'There\'s a test today.' },
      tip: '试(시) + 验(험)。汉字词。중간시험 = 期中考', tipEn: '试(시) + 验(험). Sino-Korean word. 중간시험 = midterm exam',
    },
    {
      id: 'd45-w2',
      korean: '중간고사',
      hangul: 'jung-gan-go-sa',
      zh: '期中考', zhEn: 'midterm exam',
      pos: '名词', posEn: 'Noun',
      example: { ko: '중간고사 잘 봤어요.', zh: '期中考考得不错。', zhEn: 'Did well on the midterm.' },
      tip: '中间(중간) + 考查(고사)。기말고사 = 期末考', tipEn: '中间(중간) + 考查(고사). 기말고사 = final exam',
    },
    {
      id: 'd45-w3',
      korean: '합격',
      hangul: 'hap-gyeok',
      zh: '合格/及格', zhEn: 'pass',
      pos: '名词', posEn: 'Noun',
      example: { ko: '85점, 합격이에요.', zh: '85分，合格。', zhEn: '85 points, passed.' },
      tip: '合(합) + 格(격)。합격하다 = 及格 / 불합격 = 不合格', tipEn: '合(합) + 格(격). 합격하다 = pass / 불합격 = fail',
    },
    {
      id: 'd45-w4',
      korean: '늘다',
      hangul: 'neul-da',
      zh: '增长/进步', zhEn: 'growth/progress',
      pos: '动词', posEn: 'Verb',
      example: { ko: '한국어 실력이 늘었어요.', zh: '韩语实力进步了。', zhEn: 'Your Korean skills have improved.' },
      tip: 'ㄹ 词干。과거 → 늘었어요。실력이 늘다 是固定搭配', tipEn: 'ㄹ stem. Past → 늘었어요. 실력이 늘다 is a fixed expression.',
    },
    {
      id: 'd45-w5',
      korean: '변화',
      hangul: 'byeon-hwa',
      zh: '变化', zhEn: 'change',
      pos: '名词', posEn: 'Noun',
      example: { ko: '30일 동안 큰 변화가 있었어요.', zh: '30天里有很大变化。', zhEn: 'There\'s been a big change in 30 days.' },
      tip: '变(변) + 化(화)。汉字词', tipEn: '变(변) + 化(화). Sino-Korean word.',
    },
    {
      id: 'd45-w6',
      korean: '자신감',
      hangul: 'ja-sin-gam',
      zh: '自信', zhEn: 'confidence',
      pos: '名词', posEn: 'Noun',
      example: { ko: '자신감이 생겼어요.', zh: '有了自信。', zhEn: 'I\'ve gained confidence.' },
      tip: '自信(자신) + 感(감)。자신감이 생기다 = 长了自信', tipEn: '自信(자신) + 感(감). 자신감이 생기다 = gained confidence',
    },
  ],

  dialogue: {
    scene: '305号教室·중간고사', sceneEn: 'Room 305 · Midterm Exam',
    setting: {
      time: '周四上午 10:00 - 12:00', timeEn: 'Thursday morning 10:00 - 12:00',
      place: '韩光语学院·中级班', placeEn: 'Hangwang Language Institute · Intermediate Class',
      npc: '火鹤老师', npcEn: 'Teacher Flamingo',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '火鹤老师', npcNameEn: 'Teacher Flamingo',
        ko: '자, 시험 시작합니다. 2시간 있습니다.',
        hangul: 'ja, si-heom si-jak-ham-ni-da. du-si-gan it-seum-ni-da',
        zh: '好，考试开始。有2小时。', zhEn: 'Okay, the exam begins. You have 2 hours.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '어? 이거 다 아는 건데?',
        hangul: 'eo? i-geo da a-neun geon-de?',
        zh: '咦？这些我都会啊？', zhEn: 'Huh? I know all of this?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '저는 30일 전보다 한국어를 더 잘해요.',
        hangul: 'jeo-neun sam-sib-il jeon-bo-da han-gu-geo-reul deo jal-hae-yo',
        zh: '我比30天前韩语说得更好。', zhEn: 'I speak Korean better than 30 days ago.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '지금은 다른 사람에게 길을 알려줄 수 있어요.',
        hangul: 'ji-geu-meun da-reun sa-ra-me-ge gi-reul al-lyeo-jul su i-sseo-yo',
        zh: '现在我可以给别人指路。', zhEn: 'Now I can give directions to others.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '火鹤老师', npcNameEn: 'Teacher Flamingo',
        ko: '토리, 진짜 많이 늘었네요. 축하해요.',
        hangul: 'to-ri, jin-jja ma-ni neu-reon-ne-yo. chuk-a-hae-yo',
        zh: '兔莉，真的进步很多呢。恭喜。', zhEn: 'Tori, you\'ve really improved a lot. Congratulations.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '老师说"진짜 많이 늘었네요"，Tori想谦虚回应但也想说自己确实努力了。合适的一句？', zhEn: 'The teacher said "진짜 많이 늘었네요." Tori wants to respond humbly but also acknowledge her hard work. Which is the right response?',
        practice: 'pick',
        choices: [
          { ko: '감사합니다. 계속 열심히 할게요.', zh: '谢谢。我会继续努力的。', zhEn: 'Thank you. I\'ll keep working hard.', correct: true },
          { ko: '아니에요, 별로 안 늘었어요.', zh: '哪里，没进步什么。', zhEn: 'Oh, I haven\'t improved much.', correct: false },
          { ko: '저 원래 잘해요.', zh: '我本来就会。', zhEn: 'I already knew it.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '比___更___：~보다 (더)', titleEn: 'More ___ than ___ : ~보다 (더)',
    pattern: 'N + **보다** + (더) + A/V',
    whenToUse: '「比___更___」的比较句型。Tori 说 「30일 전**보다** **더** 잘해요」= 比30天前更好。~보다 直接接名词表**比较对象**，더 = 更加。发表/反思/回顾都必备。', whenToUseEn: 'The comparative pattern "more ___ than ___". Tori says "30일 전**보다** **더** 잘해요" = better than 30 days ago. ~보다 attaches directly to a noun to mark the **comparison target**, 더 = more. Essential for presentations/reflections/reviews.',
    rules: [
      '**基本公式**：비교 대상 + 보다 (+ 더) + 형용사/동사。김치찌개보다 된장찌개가 (더) 좋아요',
      '**더 可省**：~보다 本身已含"比"意，더(更) 加了更强调。语义都对',
      '**주어 이/가 + N보다**：저는 준호보다 키가 커요 = 我比 Junho 高（主语 이/가，比较对象 보다）',
      '**~보다 vs ~에 비해서**：~보다 更口语；~에 비해서 更书面。两者可互换但语域不同'
    ],
    examples: [
      { ko: '30일 전보다 한국어를 더 잘해요.', zh: '比30天前韩语更好。', zhEn: 'Korean is better than 30 days ago.', highlight: '전보다 ... 더 잘해요', note: '30일 전 + 보다 + 더 + 잘해요。Tori 试卷作文原句', noteEn: '30일 전 + 보다 + 더 + 잘해요. Tori\'s original sentence from the exam essay.' },
      { ko: '오늘이 어제보다 더 추워요.', zh: '今天比昨天更冷。', zhEn: 'It\'s colder today than yesterday.', highlight: '어제보다 더 추워요', note: '어제 + 보다 + 더 + 추워요(춥다 ㅂ不规则)。天气比较', noteEn: 'Yesterday + than + more + cold (춥다 ㅂ irregular). Comparing weather.' },
      { ko: '커피보다 차가 좋아요.', zh: '比起咖啡，更喜欢茶。', zhEn: 'I prefer tea to coffee.', highlight: '커피보다 ... 좋아요', note: '더 省略也 OK。喜好比较最常用', noteEn: 'Omitting 더 is also OK. Most common in preference comparisons.' },
      { ko: '중간고사가 초급 시험보다 어려웠어요.', zh: '期中考比初级考试更难。', zhEn: 'The midterm is harder than the beginner exam.', highlight: '보다 어려웠어요', note: '~보다 后可以接过去时。变化对比', noteEn: '~보다 can be followed by past tense. Comparing changes.' },
    ],
    pitfall:
      '① 主语用 **이/가**，比较对象用 **보다**：❌ 저보다 준호가 더 커요 (Junho 高) → 主语和 보다 弄反。正确：저는 준호보다 작아요 = 我比Junho矮。② ~보다 前面必须是**名词**，动词不能直接接。想用动词做比较：~는 것보다（做...的这件事比...）。③ 更→더，最→가장/제일。别混。',
  },

  output: [
    {
      id: 'd45-o1',
      kind: 'compose',
      zhHint: '我比30天前韩语更好。', zhHintEn: 'My Korean is better than 30 days ago.',
      tokens: ['저는', '30일 전보다', '한국어를', '더 잘해요', '더 못해요', '한국어가'],
      composeAnswer: ['저는', '30일 전보다', '한국어를', '더 잘해요'],
      successMsg: 'Tori试卷上写的一句。보다 + 더，比较到位。', successMsgEn: 'A sentence written on Tori\'s test. 보다 + 더, comparison done right.',
    },
    {
      id: 'd45-o2',
      kind: 'listen-choice',
      audioKo: '토리, 진짜 많이 늘었네요.',
      successMsg: '✓ 老师夸学生进步的一句。~네요 感叹.', successMsgEn: '✓ A sentence where the teacher praises a student\'s progress. ~네요 expresses admiration.',
      choices: [
        { zh: '兔莉，真的进步很多呢。', zhEn: 'Tori, you\'ve really improved a lot.', correct: true },
        { zh: '兔莉，好好加油。', zhEn: 'Tori, keep up the good work.', correct: false },
        { zh: '兔莉，考试很难。', zhEn: 'Tori, the exam was hard.', correct: false },
        { zh: '兔莉，没进步。', zhEn: 'Tori, no progress.', correct: false },
      ],
    },
    {
      id: 'd45-o3',
      kind: 'zh-to-ko',
      zhPrompt: '今天比昨天更冷。', zhPromptEn: 'It\'s colder today than yesterday.',
      successMsg: '"오늘이 어제보다 더 추워요." — 어제 + 보다 + 더 + 추워요.',
      choices: [
        { ko: '오늘이 어제보다 더 추워요.', correct: true },
        { ko: '오늘보다 어제가 더 추워요.', correct: false },
        { ko: '오늘이 어제보다 더 춥어요.', correct: false },
        { ko: '오늘은 어제에 더 추워요.', correct: false },
      ],
    },
    {
      id: 'd45-o4',
      kind: 'particle-error',
      zhHint: '期中考比初级考试更难。', zhHintEn: 'The midterm is harder than the beginner exam.',
      successMsg: '중간고사 有받침 → **가**；초급 시험(대상) → **보다**.',
      choices: [
        { ko: '중간고사가 초급 시험보다 어려웠어요.', correct: true },
        { ko: '중간고사보다 초급 시험이 어려웠어요.', correct: false },
        { ko: '중간고사가 초급 시험에 어려웠어요.', correct: false },
        { ko: '중간고사는 초급 시험이 어려웠어요.', correct: false },
      ],
    },
    {
      id: 'd45-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 45 全对。85점 합격, 진짜 많이 늘었어요.', successMsgEn: '✓ Day 45 all correct. 85 points, passed, you\'ve really improved a lot.',
      pairs: [
        { ko: '시험', zh: '考试', zhEn: 'exam' },
        { ko: '합격', zh: '合格', zhEn: 'pass' },
        { ko: '늘다', zh: '进步', zhEn: 'progress' },
        { ko: '변화', zh: '变化', zhEn: 'change' },
        { ko: '자신감', zh: '自信', zhEn: 'confidence' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '85점 합격! Day 30 초급 월말고사 때 손에 났던 땀은 이제 옛일이에요.',
    preview: '明天是Haru的生日——三个朋友要偷偷给她过。', previewEn: 'Tomorrow is Haru\'s birthday—three friends are planning a surprise for her.',
    stickerId: 'sticker-d45',
    sceneImageUrl: '/images/diary/day-45-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~보다 和 ~에 비해서 有什么区别？」「\'더\' 和 \'가장\' 有什么区别？」',
};
