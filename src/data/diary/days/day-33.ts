import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 33 · 엄마에게 편지 · 第一封韩语家书
 *
 * 剧情：Tori用韩语给妈妈写了一封信，拍照发过去。妈妈用翻译软件读完后哭了，
 * 回了一段语音："妈妈不懂韩语，但妈妈懂你。" Tori存起来听了三遍。
 *
 * 学习目标：~고 있어요 진행 복습 + 편지 문체 / 근황 표현
 * 语料层级：해요体 · 书面亲密
 * 韩语自审：korean skill PASS
 */
export const day33: ToriDay = {
  level: 'intermediate',
  day: 3,
  phase: 'expansion',
  title: '第一封家书 · 给妈妈写信', titleEn: 'First Letter Home · Writing to Mom',
  subtitle: '妈妈看不懂韩语，但妈妈懂你', subtitleEn: 'Mom can\'t read Korean, but Mom understands you',
  heroImageUrl: '/images/diary/day-33-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 6일 · 일요일 밤',
    weather: '兽尔 · 秋雨初停', weatherEn: 'Tori · First Autumn Rain Stopped',
    toriPose: 'shy',
    diaryText: `10月6日，中秋后的第二天。

我从抽屉里翻出那本妈妈塞进包的信纸——
封面上有一只小胡萝卜印花，是妈妈亲手贴的。

"엄마, 잘 지내고 있어요."
（妈妈，我过得很好。）

我一个字一个字写。
写了两个小时，只写满一页。

写完拍了照片，发给妈妈。
"妈妈看不懂韩语的。"我知道。
但我还是想让她看见我写的每一笔。

三十分钟后，语音来了。

"闺女，妈妈用翻译软件看完了。
妈妈不懂韩语，但妈妈懂你。"

后面的话被吸鼻子的声音盖住。

我把这段语音收藏，听了三遍。
第三遍的时候，我也哭了。`,
  },

  words: [
    {
      id: 'd33-w1',
      korean: '편지',
      hangul: 'pyeon-ji',
      zh: '信', zhEn: 'Letter',
      pos: '名词', posEn: 'Noun',
      example: { ko: '엄마한테 편지를 썼어요.', zh: '给妈妈写了信。', zhEn: 'Wrote a letter to Mom.' },
      tip: '편(便) + 지(纸)。汉字词。~에게/한테 편지를 쓰다', tipEn: '편(便) + 지(纸). Sino-Korean word. ~에게/한테 편지를 쓰다',
    },
    {
      id: 'd33-w2',
      korean: '잘 지내다',
      hangul: 'jal ji-nae-da',
      zh: '过得好', zhEn: 'Doing well',
      pos: '表达', posEn: 'Expression',
      example: { ko: '엄마, 저 잘 지내고 있어요.', zh: '妈妈，我过得很好。', zhEn: 'Mom, I\'m doing well.' },
      tip: '写信/打电话第一句必备。~고 있어요 表进行状态', tipEn: 'Essential first line for letters/calls. ~고 있어요 indicates ongoing state',
    },
    {
      id: 'd33-w3',
      korean: '번역기',
      hangul: 'beon-yeok-gi',
      zh: '翻译器', zhEn: 'Translator',
      pos: '名词', posEn: 'Noun',
      example: { ko: '엄마가 번역기로 읽었어요.', zh: '妈妈用翻译器读了。', zhEn: 'Mom read it with a translator.' },
      tip: '번역(翻译) + 기(器)。翻译软件也用这个词', tipEn: '번역(translation) + 기(device). Also used for translation apps',
    },
    {
      id: 'd33-w4',
      korean: '읽다',
      hangul: 'ik-da',
      zh: '读', zhEn: 'Read',
      pos: '动词', posEn: 'Verb',
      example: { ko: '편지를 세 번 읽었어요.', zh: '把信读了三遍。', zhEn: 'Read the letter three times.' },
      tip: '收音 ㄺ → 读音 [익따]。~을/를 읽다', tipEn: 'Final consonant ㄺ → pronounced [익따]. ~을/를 읽다',
    },
    {
      id: 'd33-w5',
      korean: '녹음',
      hangul: 'no-geum',
      zh: '录音', zhEn: 'Recording',
      pos: '名词', posEn: 'Noun',
      example: { ko: '엄마 녹음을 저장했어요.', zh: '把妈妈的录音存起来了。', zhEn: 'Saved Mom\'s recording.' },
      tip: '录(녹) + 音(음)。녹음(名词) / 녹음하다(动词)', tipEn: '录(녹) + 音(음). 녹음(noun) / 녹음하다(verb)',
    },
    {
      id: 'd33-w6',
      korean: '건강',
      hangul: 'geon-gang',
      zh: '健康', zhEn: 'health',
      pos: '名词', posEn: 'Noun',
      example: { ko: '엄마 건강 조심하세요.', zh: '妈妈请注意健康。', zhEn: 'Mom, please take care of your health.' },
      tip: '건강하다(形容词健康) / 건강 조심하세요 是给家人的经典关照句', tipEn: '건강하다(adjective, healthy) / 건강 조심하세요 is a classic caring phrase for family',
    },
  ],

  dialogue: {
    scene: '写信·发送·语音回复', sceneEn: 'Write · Send · Voice Reply',
    setting: {
      time: '周日深夜', timeEn: 'Late Sunday Night',
      place: 'Tori的宿舍书桌前', placeEn: 'At Tori\'s dorm desk',
      npc: '妈妈（语音消息）', npcEn: 'Mom (Voice Message)',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '엄마, 저 잘 지내고 있어요.',
        hangul: 'eom-ma, jeo jal ji-nae-go i-sseo-yo',
        zh: '妈妈，我过得很好。', zhEn: 'Mom, I\'m doing well.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '한국어 공부도 열심히 하고 있어요.',
        hangul: 'han-gu-geo gong-bu-do yeol-sim-hi ha-go i-sseo-yo',
        zh: '我也在努力学韩语。', zhEn: 'I\'m also working hard to learn Korean.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '친구도 세 명 생겼어요. 준호, 민지, 하루.',
        hangul: 'chin-gu-do se myeong saeng-gyeo-sseo-yo. jun-ho, min-ji, ha-ru',
        zh: '我也交了三个朋友。Junho、Minji、Haru。', zhEn: 'I also made three friends: Junho, Minji, and Haru.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '엄마도 건강 조심하세요.',
        hangul: 'eom-ma-do geon-gang jo-sim-ha-se-yo',
        zh: '妈妈也请注意健康。', zhEn: 'Mom, please take care of your health too.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '엄마가 번역기로 다 읽었을까?',
        hangul: 'eom-ma-ga beon-yeok-gi-ro da il-geo-sseul-kka?',
        zh: '妈妈用翻译器都读了吗？', zhEn: 'Did you read it all with a translator, Mom?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '妈妈刚发来语音说"看完了"。信的结尾Tori用哪句签名最自然？', zhEn: 'Mom just sent a voice message saying she finished reading it. Which sign-off would be most natural for Tori to use at the end of the letter?',
        practice: 'pick',
        choices: [
          { ko: '엄마, 사랑해요. 토리 올림.', zh: '妈妈，我爱你。兔莉敬上。', zhEn: 'Mom, I love you. From Tori.', correct: true },
          { ko: '안녕히 가세요.', zh: '请慢走。', zhEn: 'Take care.', correct: false },
          { ko: '엄마 잘 부탁드립니다.', zh: '妈妈请多关照。', zhEn: 'Please take care of me, Mom.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '正在___：~고 있어요（进行时复习）', titleEn: 'Currently ___ : ~고 있어요 (Present Progressive Review)',
    pattern: 'V 어간 + **고 있어요**',
    whenToUse: '表示"正在做___"的持续动作。写信/打电话报近况必备：잘 지내고 있어요（我过得好） / 공부하고 있어요（正在学习）。Day 16 首次学过，Day 33 深化——这次用在"给家人报平安"这个高频场景里。', whenToUseEn: 'Indicates an ongoing action of "doing ___". Essential for updating someone on how you\'re doing in letters or calls: 잘 지내고 있어요 (I\'m doing well) / 공부하고 있어요 (I\'m studying). First learned on Day 16, deepened on Day 33—this time used in the common scenario of "letting family know you\'re safe."',
    rules: [
      '**基本公式**：动词词干 + 고 있어요 = "正在___"。持续状态和瞬时动作都能用',
      '**报近况专用**：잘 지내고 있어요（过得好）/ 한국에서 살고 있어요（住在韩国）/ 한국어를 배우고 있어요（在学韩语）— 这三句是写家书三件套',
      '**过去时 → ~고 있었어요**：어제 편지를 쓰고 있었어요 = 昨天正在写信',
      '**敬语升级 → ~고 계세요**：对长辈用「~고 계세요」。엄마는 지금 뭐 하고 계세요? = 妈妈现在在做什么？'
    ],
    examples: [
      { ko: '잘 지내고 있어요.', zh: '过得很好。', zhEn: 'I\'m doing well.', highlight: '지내고 있어요', note: '지내다 → 지내고 있어요。写信第一句的固定表达', noteEn: '지내다 → 지내고 있어요. A fixed expression for the first line of a letter.' },
      { ko: '한국어를 배우고 있어요.', zh: '正在学韩语。', zhEn: 'I\'m learning Korean.', highlight: '배우고 있어요', note: '배우다(学) → 배우고 있어요。近况报告第二句', noteEn: '배우다 (to learn) → 배우고 있어요. The second sentence in an update on how things are going.' },
      { ko: '지금 편지를 쓰고 있어요.', zh: '现在正在写信。', zhEn: 'I\'m writing a letter right now.', highlight: '쓰고 있어요', note: '쓰다(写) → 쓰고 있어요。지금 强调"此刻"的进行', noteEn: '쓰다 (to write) → 쓰고 있어요. 지금 emphasizes the ongoing action "right now."' },
      { ko: '엄마는 뭐 하고 계세요?', zh: '妈妈在做什么呢？', zhEn: 'What is Mom doing?', highlight: '계세요', note: '있어요 的敬语形是 계세요。对长辈问近况用这个', noteEn: 'The honorific form of 있어요 is 계세요. Use this when asking an elder how they\'re doing.' },
    ],
    pitfall:
      '① ~고 있어요 前必须是动词，形容词不能用（❌ 예쁘고 있어요）。② 名词后不能直接接（❌ 학생고 있어요 → ✅ 학생이에요）。③ 对长辈/父母问近况用 **~고 계세요** 而不是 ~고 있어요，这是敬语差异，Day 33 写信刚好复习。',
  },

  output: [
    {
      id: 'd33-o1',
      kind: 'compose',
      zhHint: '妈妈，我过得很好。', zhHintEn: 'Mom, I\'m doing well.',
      tokens: ['엄마', '저', '잘', '지내고 있어요', '지내요', '지냈어요'],
      composeAnswer: ['엄마', '저', '잘', '지내고 있어요'],
      successMsg: '写信第一句。妈妈最想看的一句。', successMsgEn: 'The first line of the letter. The one Mom most wants to see.',
    },
    {
      id: 'd33-o2',
      kind: 'listen-choice',
      audioKo: '엄마도 건강 조심하세요.',
      successMsg: '✓ 关心长辈健康的经典句。', successMsgEn: '✓ A classic sentence for caring about an elder\'s health.',
      choices: [
        { zh: '妈妈也请注意健康。', zhEn: 'Mom, please take care of your health too.', correct: true },
        { zh: '妈妈请多关照。', zhEn: 'Please take care of me, Mom.', correct: false },
        { zh: '妈妈感冒了吗？', zhEn: 'Did Mom catch a cold?', correct: false },
        { zh: '妈妈也生病了。', zhEn: 'Mom is sick too.', correct: false },
      ],
    },
    {
      id: 'd33-o3',
      kind: 'zh-to-ko',
      zhPrompt: '妈妈现在在做什么呢？', zhPromptEn: 'What is Mom doing right now?',
      successMsg: '"엄마는 지금 뭐 하고 계세요?" — 对长辈的进行时敬语。', successMsgEn: '"엄마는 지금 뭐 하고 계세요?" — Honorific present progressive for addressing an elder.',
      choices: [
        { ko: '엄마는 지금 뭐 하고 계세요?', correct: true },
        { ko: '엄마는 지금 뭐 하고 있어요?', correct: false },
        { ko: '엄마는 지금 뭐 해요 계세요?', correct: false },
        { ko: '엄마는 지금 뭐 하고 계요?', correct: false },
      ],
    },
    {
      id: 'd33-o4',
      kind: 'particle-error',
      zhHint: '正在给妈妈写信。', zhHintEn: 'I\'m writing a letter to Mom.',
      successMsg: '엄마 → 한테（给人用한테/에게）；편지 末字 지 无收音 → 를。两个助词都要选对。', successMsgEn: '엄마 → 한테 (use 한테/에게 for people); 편지 ends in 지 with no final consonant → 를. Both particles must be chosen correctly.',
      choices: [
        { ko: '엄마한테 편지를 쓰고 있어요.', correct: true },
        { ko: '엄마에 편지를 쓰고 있어요.', correct: false },
        { ko: '엄마한테 편지가 쓰고 있어요.', correct: false },
        { ko: '엄마한테서 편지를 쓰고 있어요.', correct: false },
      ],
    },
    {
      id: 'd33-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 33 全对。家书里的每个词，都是想家的形状。', successMsgEn: '✓ Day 33 all correct. Every word in the letter home is shaped like homesickness.',
      pairs: [
        { ko: '편지', zh: '信', zhEn: 'Letter' },
        { ko: '잘 지내다', zh: '过得好', zhEn: 'Doing well' },
        { ko: '번역기', zh: '翻译器', zhEn: 'Translator' },
        { ko: '녹음', zh: '录音', zhEn: 'Recording' },
        { ko: '건강', zh: '健康', zhEn: 'health' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '엄마한테 첫 한국어 편지! 잘 썼어요. 토리, 성장하고 있어요.',
    preview: '明天，Tori想问Haru一个问题——那天地铁里，为什么帮我？', previewEn: 'Tomorrow, Tori wants to ask Haru a question—why did you help me on the subway that day?',
    stickerId: 'sticker-d33',
    sceneImageUrl: '/images/diary/day-33-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~고 있어요 和 ~고 계세요 有什么区别？」「怎么写韩语信开头结尾？」',
};
