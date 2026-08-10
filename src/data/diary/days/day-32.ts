import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 32 · 추석 · 中秋节·一个人的节日
 *
 * 剧情：中秋节放假。朋友们都回家了，Tori一个人在宿舍。她去便利店买了饭团当月饼。
 * Haru敲门递给她一盒松片糕，说"연휴라서 혼자 있으면 안 돼요"（放假一个人不行）。
 * Tori想起家乡的月饼、想起妈妈，眼泪是咸的，松片糕是甜的。
 *
 * 学习目标：원인 ~아/어서 / 명절 표현 / 감정어휘
 * 语料层级：해요体 + ~아/어서 因果
 * 韩语自审：korean skill PASS
 */
export const day32: ToriDay = {
  level: 'intermediate',
  day: 2,
  phase: 'expansion',
  title: '中秋节 · 一个人的节日',
  subtitle: '朋友都回家了，Haru敲门递来一盒松片糕',
  heroImageUrl: '/images/diary/day-32-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 5일 · 토요일 저녁',
    weather: '兽尔 · 秋高气爽',
    toriPose: 'shy',
    diaryText: `10月5日，中秋节。

宿舍走廊安静得能听见冰箱的嗡嗡声。
Junho回釜山了，Minji回大邱了，连值班的浣熊阿姨都下班了。

我下楼去便利店，买了两个三角饭团当月饼。
店里播着"한가위 잘 보내세요"（祝您中秋愉快）的广播——
声音再温柔，也温柔不到一个人的宿舍里。

回来的路上，302的门开了一条缝。
Haru探出头："토리, 연휴라서 혼자 있으면 안 돼요."
（放假嘛，一个人可不行。）

她递过来一盒粉粉绿绿的松片糕。
"엄마가 만든 거예요. 같이 먹어요."
（妈妈做的。一起吃吧。）

我咬了一口——甜的。
然后想起家乡的老式月饼，想起妈妈。
眼泪掉在盒盖上，咸的。

甜的松片糕，咸的眼泪，
今晚的月亮，好像也没那么远。`,
  },

  words: [
    {
      id: 'd32-w1',
      korean: '추석',
      hangul: 'chu-seok',
      zh: '中秋节',
      pos: '名词',
      example: { ko: '오늘은 추석이에요.', zh: '今天是中秋节。' },
      tip: '韩国最大的传统节日之一，全家团圆吃松片糕',
    },
    {
      id: 'd32-w2',
      korean: '연휴',
      hangul: 'yeon-hyu',
      zh: '连休/假期',
      pos: '名词',
      example: { ko: '연휴라서 학교가 쉬어요.', zh: '因为放假，学校休息。' },
      tip: '연(连) + 휴(休)。汉字词。3天以上假期都可以叫 연휴',
    },
    {
      id: 'd32-w3',
      korean: '송편',
      hangul: 'song-pyeon',
      zh: '松片糕',
      pos: '名词',
      example: { ko: '엄마가 송편을 만들었어요.', zh: '妈妈做了松片糕。' },
      tip: '半月形的年糕，中秋必吃。里面包芝麻、豆沙或栗子',
    },
    {
      id: 'd32-w4',
      korean: '보고 싶다',
      hangul: 'bo-go sip-da',
      zh: '想（想念）',
      pos: '表达',
      example: { ko: '엄마가 보고 싶어요.', zh: '想妈妈。' },
      tip: '보다(看) + 고 싶다。字面"想看"= 想念。想人想家都用这个',
    },
    {
      id: 'd32-w5',
      korean: '고향',
      hangul: 'go-hyang',
      zh: '故乡/家乡',
      pos: '名词',
      example: { ko: '고향 생각이 나요.', zh: '想起家乡了。' },
      tip: '故(고) + 乡(향)。汉字词，和中文一样',
    },
    {
      id: 'd32-w6',
      korean: '눈물',
      hangul: 'nun-mul',
      zh: '眼泪',
      pos: '名词',
      example: { ko: '눈물이 났어요.', zh: '流眼泪了。' },
      tip: '눈(眼) + 물(水) = 眼泪。나다(出现) 搭配 → 눈물이 나다',
    },
  ],

  dialogue: {
    scene: '302号门口·松片糕',
    setting: {
      time: '中秋夜',
      place: '韩光宿舍3楼走廊',
      npc: 'Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리, 연휴라서 혼자 있으면 안 돼요.',
        hangul: 'to-ri, yeon-hyu-ra-seo hon-ja i-sseu-myeon an dwae-yo',
        zh: '兔莉，放假嘛，一个人可不行。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '엄마가 만든 송편이에요. 같이 먹어요.',
        hangul: 'eom-ma-ga man-deun song-pyeon-i-e-yo. ga-chi meo-geo-yo',
        zh: '这是妈妈做的松片糕。一起吃吧。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '고마워요. 저는 오늘 고향이 너무 보고 싶어서…',
        hangul: 'go-ma-wo-yo. jeo-neun o-neul go-hyang-i neo-mu bo-go si-peo-seo…',
        zh: '谢谢。今天太想家了……',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '괜찮아요. 나도 처음에 그랬어요.',
        hangul: 'gwaen-cha-na-yo. na-do cheo-eu-me geu-rae-sseo-yo',
        zh: '没事。我刚开始也这样。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '단맛과 짠맛이 같이 나네요.',
        hangul: 'dan-ma-tgwa jjan-ma-si ga-chi na-ne-yo',
        zh: '甜的和咸的味道一起出来了呢。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru问"怎么了"，Tori想说"因为想妈妈了"。合适的说法是？',
        practice: 'pick',
        choices: [
          { ko: '엄마가 보고 싶어서 그래요.', zh: '因为想妈妈才这样。', correct: true },
          { ko: '엄마를 봤어요.', zh: '看到妈妈了。', correct: false },
          { ko: '엄마는 어디 있어요?', zh: '妈妈在哪里？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '因为___所以___：~아/어서',
    pattern: 'V/A 어간 + **아서 / 어서 / 여서(하다→해서)**',
    whenToUse: '韩语表达"因为__"最自然的连接词尾。Haru说「연휴라서 혼자 있으면 안 돼요」= 因为放假嘛，不能一个人。~아/어서 前后必须逻辑上有因果关系，且**后半句不能是命令/建议**（那要用 ~(으)니까）。',
    rules: [
      '**基本公式**：动词/形容词词干 + 아서/어서。变形规则和해요体一样——阳性元音(ㅏ/ㅗ) → 아서；其他 → 어서；하다 → 해서',
      '**名词句用 ~(이)라서**：연휴다 → 연휴라서（因为是连休）；학생이다 → 학생이라서（因为是学生）。这是 이에요/예요 的连接形式',
      '**后半句不能是命令/建议**：❌ 배고파서 밥 먹어요（意思对但语感怪）→ ✅ 배고프니까 밥 먹어요（因为饿，吃饭吧）。~아/어서 只用于陈述/感叹/表达情感',
      '**过去时不用变**：昨天下雨的原因也用 비가 와서（不用 왔어서）。~아/어서 前面永远用原形，时态放句尾',
    ],
    examples: [
      { ko: '연휴라서 혼자예요.', zh: '因为是连休所以一个人。', highlight: '라서', note: '연휴 无收音 → 라서。名词句最常见的因果连接' },
      { ko: '엄마가 보고 싶어서 울었어요.', zh: '因为想妈妈所以哭了。', highlight: '싶어서', note: '싶다 → 싶어서。表情感原因的经典搭配' },
      { ko: '송편이 맛있어서 세 개나 먹었어요.', zh: '松片糕太好吃所以吃了三个。', highlight: '맛있어서', note: '맛있다 → 맛있어서。前因(好吃) + 后果(吃了) 逻辑清晰' },
      { ko: '늦어서 죄송해요.', zh: '不好意思迟到了。', highlight: '늦어서', note: '늦다 → 늦어서。道歉时最常用的固定表达' },
    ],
    pitfall:
      '① 后半句是命令/建议时**必须用 ~(으)니까**，不能用 ~아/어서：❌ 비가 와서 우산 가져가세요 → ✅ 비가 오니까 우산 가져가세요。② 时态放句尾，~아/어서 前永远原形：❌ 왔어서 → ✅ 와서。③ 名词后面是 **(이)라서** 不是 **~아/어서**，学生们最爱写错。',
  },

  output: [
    {
      id: 'd32-o1',
      kind: 'compose',
      zhHint: '因为想家所以哭了。',
      tokens: ['고향이', '보고 싶어서', '울었어요', '보고 싶으면', '울어요', '보고 싶다'],
      composeAnswer: ['고향이', '보고 싶어서', '울었어요'],
      successMsg: '보고 싶어서 + 过去时。今晚的Tori用得上。',
    },
    {
      id: 'd32-o2',
      kind: 'listen-choice',
      audioKo: '연휴라서 혼자 있으면 안 돼요.',
      successMsg: '✓ Haru的原话。放假不该一个人。',
      choices: [
        { zh: '因为放假，一个人可不行。', correct: true },
        { zh: '放假我们一起过。', correct: false },
        { zh: '一个人放假很好。', correct: false },
        { zh: '一个人不能放假。', correct: false },
      ],
    },
    {
      id: 'd32-o3',
      kind: 'zh-to-ko',
      zhPrompt: '因为松片糕好吃所以吃了三个。',
      successMsg: '"송편이 맛있어서 세 개나 먹었어요." — ~아/어서 + 过去时。',
      choices: [
        { ko: '송편이 맛있어서 세 개나 먹었어요.', correct: true },
        { ko: '송편이 맛있었어서 세 개나 먹었어요.', correct: false },
        { ko: '송편은 맛있어서 세 개나 먹었어요.', correct: false },
        { ko: '송편이 맛있으니까 세 개나 먹어요.', correct: false },
      ],
    },
    {
      id: 'd32-o4',
      kind: 'particle-error',
      zhHint: '因为是连休，学校休息。',
      successMsg: '연휴 无收音 → **라서** (名词句)。不是 어서 也不是 이라서。',
      choices: [
        { ko: '연휴라서 학교가 쉬어요.', correct: true },
        { ko: '연휴어서 학교가 쉬어요.', correct: false },
        { ko: '연휴이라서 학교가 쉬어요.', correct: false },
        { ko: '연휴라니까 학교가 쉬어요.', correct: false },
      ],
    },
    {
      id: 'd32-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 32 核心词全对。一个人的节日，也有味道。',
      pairs: [
        { ko: '추석', zh: '中秋节' },
        { ko: '연휴', zh: '连休' },
        { ko: '송편', zh: '松片糕' },
        { ko: '고향', zh: '故乡' },
        { ko: '눈물', zh: '眼泪' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '한 사람이 아니라 두 사람의 추석이었어요. 토리, 오늘도 잘했어요.',
    preview: '明天，Tori想给妈妈写一封韩语信——妈妈看得懂吗？',
    stickerId: 'sticker-d32',
    sceneImageUrl: '/images/diary/day-32-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~아/어서和~(으)니까有什么区别？」「추석和中国中秋节一样吗？」',
};
