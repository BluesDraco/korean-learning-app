import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 47 · 엄마와 영상통화 · 想家夜晚
 *
 * 剧情：晚上Tori想家给妈妈打视频。妈妈突然说了一句韩语——"용기 내"——是Tori教她的。
 * Tori哭着笑了。妈妈记住了她的韩语，虽然只有一个词。
 *
 * 学习目标：간접인용 ~다고 하다 / 통화 어휘 / 감정 표현
 * 语料层级：해요体 · 감성 표현
 * 韩语自审：korean skill PASS
 */
export const day47: ToriDay = {
  level: 'intermediate',
  day: 17,
  phase: 'expansion',
  title: '想家夜晚 · 和妈妈视频',
  subtitle: '妈妈突然说了一句韩语——"용기 내"',
  heroImageUrl: '/images/diary/day-47-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 19일 · 토요일 밤',
    weather: '兽尔 · 阴',
    toriPose: 'shy',
    diaryText: `10月19日，周六晚上。

Haru生日结束后回宿舍。
房间一下子安静下来。
桌上还剩两块蛋糕，
但我一口都吃不下。

想家了。

打开手机，妈妈的头像在通讯录第一位。
我拨了视频通话。

铃响两声，妈妈接了。
她刚洗完碗，头发湿着，围着围裙。

"闺女，怎么这么晚？"
"妈妈，我就是想你了。"

妈妈笑了。然后说：
"妈妈也想你。"

停顿了一下，她说：

"용기 내."

——是我一个月前教她的那句话。
她记住了。

只有一个词，
发音也不标准，
但那三个字砸在我胸口，
砸得我眼泪一下子涌出来。

我笑着哭。

妈妈也哭。
她说："别哭，妈妈就是想练一下。"

挂电话前她又说了一遍：
"용기 내, 闺女。"`,
  },

  words: [
    {
      id: 'd47-w1',
      korean: '영상통화',
      hangul: 'yeong-sang-tong-hwa',
      zh: '视频通话',
      pos: '名词',
      example: { ko: '엄마랑 영상통화 했어요.', zh: '和妈妈视频通话了。' },
      tip: '영상(影像) + 통화(通话)。카톡 영상통화 = 微信韩国版',
    },
    {
      id: 'd47-w2',
      korean: '보고 싶다',
      hangul: 'bo-go sip-da',
      zh: '想（想念）',
      pos: '表达',
      example: { ko: '엄마 보고 싶어요.', zh: '想妈妈。' },
      tip: 'Day 32 学过。这次和妈妈说出口',
    },
    {
      id: 'd47-w3',
      korean: '가르치다',
      hangul: 'ga-reu-chi-da',
      zh: '教',
      pos: '动词',
      example: { ko: '엄마한테 한국어 한 마디 가르쳤어요.', zh: '教了妈妈一句韩语。' },
      tip: '가르치다 → 가르쳐요。~에게/한테 ~을/를 가르치다',
    },
    {
      id: 'd47-w4',
      korean: '기억하다',
      hangul: 'gi-eok-a-da',
      zh: '记住/记得',
      pos: '动词',
      example: { ko: '엄마가 그 말을 기억하셨어요.', zh: '妈妈记住了那句话。' },
      tip: '기억(记忆) + 하다。기억나다(自动·想起) vs 기억하다(他动·记住)',
    },
    {
      id: 'd47-w5',
      korean: '발음',
      hangul: 'ba-reum',
      zh: '发音',
      pos: '名词',
      example: { ko: '엄마 발음이 서툴러도 괜찮아요.', zh: '妈妈发音不熟练也没关系。' },
      tip: '发(발) + 音(음)。발음이 좋다 = 发音好',
    },
    {
      id: 'd47-w6',
      korean: '연습',
      hangul: 'yeon-seup',
      zh: '练习',
      pos: '名词',
      example: { ko: '엄마도 연습하고 계셨어요.', zh: '妈妈也在练习。' },
      tip: '练(연) + 习(습)。연습하다 = 练习',
    },
  ],

  dialogue: {
    scene: '심야 · 엄마와 영상통화',
    setting: {
      time: '周六 22:30',
      place: 'Tori 宿舍 · 视频屏幕两端',
      npc: '妈妈',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '엄마, 저 지금 너무 보고 싶어요.',
        hangul: 'eom-ma, jeo ji-geum neo-mu bo-go si-peo-yo',
        zh: '妈妈，我现在好想你。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '妈妈',
        ko: '엄마도 딸이 보고 싶다.',
        hangul: 'eom-ma-do tta-ri bo-go sip-da',
        zh: '妈妈也想闺女啊。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '妈妈',
        ko: '용기 내.',
        hangul: 'yong-gi nae',
        zh: '要有勇气。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '엄마가 그 말을 기억하셨어! 한 달 전에 가르쳐 준 그 말을.',
        hangul: 'eom-ma-ga geu ma-reul gi-eo-ka-syeo-sseo! han dal jeo-ne ga-reu-chyeo jun geu ma-reul',
        zh: '妈妈记住了那句话！一个月前教她的那句。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '엄마가 발음도 잘하시네요.',
        hangul: 'eom-ma-ga ba-reum-do jal-ha-si-ne-yo',
        zh: '妈妈发音也不错呢。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '妈妈问"闺女最近韩国怎么样"，Tori想转述Haru上次说的话"记忆会留下"。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '하루가 기억은 남는다고 했어요.', zh: 'Haru说"记忆会留下"。', correct: true },
          { ko: '하루가 기억이 없다고 했어요.', zh: 'Haru说"没有记忆"。', correct: false },
          { ko: '하루가 기억을 잊었어요.', zh: 'Haru忘记了记忆。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '据说 / 说___：~다고 하다 (간접인용)',
    pattern: 'V + **ㄴ/는다고 하다** · A + **다고 하다** · N + **(이)라고 하다**',
    whenToUse: '「(某人) 说___」的间接引用句型。Tori 想告诉妈妈 Haru 说过的话：「하루가 기억은 남**는다고 했어요**」= Haru说记忆会留下。转述别人的话必用它——聊天、写日记、报告都离不开。',
    rules: [
      '**动词 + ㄴ/는다고 하다**：动词现在 → 남는다고 / 간다고。无收音 → **ㄴ다**（가다→간다고），有받침 → **는다**（먹다→먹는다고）',
      '**形容词 + 다고 하다**：예쁘다고 하다 / 매웠다고 하다。形容词直接 + 다고',
      '**名词 + (이)라고 하다**：학생이라고 하다 = 说是学生。有收音加 이라고，无收音直接 라고（친구라고）',
      '**过去 → ~았/었다고 하다**：하루가 왔다고 했어요 = 说Haru来了。이 하나만 알면 소식 전달은 다 됨'
    ],
    examples: [
      { ko: '하루가 기억은 남는다고 했어요.', zh: 'Haru说记忆会留下。', highlight: '남는다고 했어요', note: '남다 有받침 ㅁ → **는다고**。间接引用他人的话' },
      { ko: '엄마가 용기 내라고 하셨어요.', zh: '妈妈说要有勇气。', highlight: '내라고 하셨어요', note: '내다 + ~(으)라고 하다(命令引用)。转述长辈的鼓励' },
      { ko: '준호가 발음이 좋다고 했어요.', zh: 'Junho说发音好。', highlight: '좋다고 했어요', note: '좋다(형용사) → **다고 했어요**（不加는）' },
      { ko: '민지가 오늘 바쁘다고 해요.', zh: 'Minji说今天忙。', highlight: '바쁘다고 해요', note: '바쁘다(形) → 바쁘**다고 해요**（现在时可加해요，不加았）' },
    ],
    pitfall:
      '① 动词 **ㄴ/는다고** vs 形容词 **다고**：❌ 예쁘는다고 → ✅ 예쁘**다고**。 动词现在时必加ㄴ/는。② 命令句的间接引用不用 다고，用 **~(으)라고**：엄마가 오라고 했어요（妈妈说来） / 엄마가 온다고 했어요（妈妈说要来）— 意思差远了。③ 반말去하다변화即可，最常用 ~다고 해 / ~다고 그러네.',
  },

  output: [
    {
      id: 'd47-o1',
      kind: 'compose',
      zhHint: 'Haru说记忆会留下。',
      tokens: ['하루가', '기억은', '남는다고', '했어요', '남았다고', '남아요'],
      composeAnswer: ['하루가', '기억은', '남는다고', '했어요'],
      successMsg: '~다고 했어요，间接引用最刚需句型。',
    },
    {
      id: 'd47-o2',
      kind: 'listen-choice',
      audioKo: '엄마가 발음도 잘하시네요.',
      successMsg: '✓ 夸妈妈发音。~시네요 敬语感叹.',
      choices: [
        { zh: '妈妈发音也不错呢。', correct: true },
        { zh: '妈妈发音不好。', correct: false },
        { zh: '妈妈没在练发音。', correct: false },
        { zh: '妈妈发音很快。', correct: false },
      ],
    },
    {
      id: 'd47-o3',
      kind: 'zh-to-ko',
      zhPrompt: '妈妈说要有勇气。',
      successMsg: '"엄마가 용기 내라고 하셨어요." — 命令引用 ~(으)라고 하다.',
      choices: [
        { ko: '엄마가 용기 내라고 하셨어요.', correct: true },
        { ko: '엄마가 용기 낸다고 하셨어요.', correct: false },
        { ko: '엄마가 용기 내다고 하셨어요.', correct: false },
        { ko: '엄마가 용기 내고 하셨어요.', correct: false },
      ],
    },
    {
      id: 'd47-o4',
      kind: 'particle-error',
      zhHint: 'Junho说发音好。（형용사引用）',
      successMsg: '좋다(形容词) → **좋다고**（不加는）。형용사直接 다고.',
      choices: [
        { ko: '준호가 발음이 좋다고 했어요.', correct: true },
        { ko: '준호가 발음이 좋는다고 했어요.', correct: false },
        { ko: '준호가 발음이 좋았다고 하다.', correct: false },
        { ko: '준호가 발음을 좋다고 했어요.', correct: false },
      ],
    },
    {
      id: 'd47-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 47 全对。妈妈的那句"용기 내"——记住了。',
      pairs: [
        { ko: '영상통화', zh: '视频通话' },
        { ko: '가르치다', zh: '教' },
        { ko: '기억하다', zh: '记住' },
        { ko: '발음', zh: '发音' },
        { ko: '연습', zh: '练习' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '엄마가 "용기 내"를 기억해 주셨어요. 한 마디, 한 사람의 마음.',
    preview: '明天 Junho 带大家去看韩国电影——一半听不懂，但心听得懂。',
    stickerId: 'sticker-d47',
    sceneImageUrl: '/images/diary/day-47-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~다고 하다 和 ~(으)라고 하다 什么时候用？」「~ㄴ다고 和 ~는다고 怎么选？」',
};
