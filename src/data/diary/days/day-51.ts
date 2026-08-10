import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 51 · 생카 혼자 · 一个人追星
 *
 * 剧情：Junho上班、Minji考试。Tori一个人推开달빛카페的玻璃门——这次是真正的粉丝。
 * 她用韩语点招牌饮品、拿到小卡。从点单到拿卡全靠自己。
 *
 * 学习目标：자립 표현 · 从 Day 23 到 Day 51 的对照
 * 语料层级：해요体
 * 韩语自审：korean skill PASS
 */
export const day51: ToriDay = {
  level: 'intermediate',
  day: 21,
  phase: 'expansion',
  title: '生咖独行 · 一个人追星', titleEn: 'Solo Cafe Run · Fan Life Alone',
  subtitle: '这一次，是真正的粉丝了', subtitleEn: 'This time, I\'m a real fan',
  heroImageUrl: '/images/diary/day-51-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 23일 · 수요일 오후',
    weather: '兽尔 · 晴', weatherEn: 'Seoul · Sunny',
    toriPose: 'shy',
    diaryText: `10月23日，周三下午。

Junho今天在便利店打工，Minji在图书馆。
Haru在打盹。
但 Mochi 오빠 的新 앨범 生咖今天最后一天。

我一个人去。

달빛카페 门口的粉红色 배너 还在飘——
和 Day 23 那次一样的地方。
但那时我是被 Junho 拽过来的旁观者，
现在我是自己走过来的粉丝。

我深呼吸，推门。

排队大概20分钟。
到我的时候，我说：

"안녕하세요. 오늘 시그니처 음료 하나 주세요.
포토카드 랜덤 1장이에요, 맞죠?"

（你好，来一杯今天的招牌饮品。
随机小卡一张，对吧？）

考拉店员点头，扫码：
"9,500원이에요."

递卡片刷卡——完全无障碍。

拿到饮品和小卡，我坐在窗边。
拆开塑料袋。

——是Mochi正脸卡！
Junho知道会疯的那种。

我拍照发群里，
Junho发了三十几个感叹号。
Minji发了一个"공식팬 인증"。
Haru发了两个字："예뻐."

一个人的下午，
但胡萝卜笔在纸上写下第一行：
"오늘, 나 진짜 팬이었어."`,
  },

  words: [
    {
      id: 'd51-w1',
      korean: '시그니처',
      hangul: 'si-geu-ni-cheo',
      zh: '招牌（饮品）', zhEn: 'Signature (drink)',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오늘 시그니처 음료 뭐예요?', zh: '今天招牌饮品是什么？', zhEn: 'What\'s today\'s signature drink?' },
      tip: '英语 signature 的外来语。카페 메뉴 상용어', tipEn: 'Loanword from English \'signature.\' Common cafe menu term.',
    },
    {
      id: 'd51-w2',
      korean: '포토카드',
      hangul: 'po-to-ka-deu',
      zh: '小卡（明星照片）', zhEn: 'Photocard (idol photo)',
      pos: '名词', posEn: 'Noun',
      example: { ko: '포토카드 랜덤 1장이에요.', zh: '随机小卡一张。', zhEn: 'One random photocard.' },
      tip: 'photo card 의 외래어. 팬덤의 상용어',
    },
    {
      id: 'd51-w3',
      korean: '랜덤',
      hangul: 'raen-deom',
      zh: '随机', zhEn: 'Random',
      pos: '名词', posEn: 'Noun',
      example: { ko: '랜덤으로 나와요.', zh: '随机开出。', zhEn: 'Random draw.' },
      tip: 'random 외래어. 韩国粉圈日常词汇', tipEn: 'Loanword from \'random.\' Everyday term in Korean fan culture.',
    },
    {
      id: 'd51-w4',
      korean: '팬',
      hangul: 'paen',
      zh: '粉丝', zhEn: 'Fan',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오늘, 나 진짜 팬이었어.', zh: '今天，我是真正的粉丝。', zhEn: 'Today, I\'m a true fan.' },
      tip: 'Day 23 学过。这次Tori自己承认了', tipEn: 'Learned on Day 23. This time Tori admits it herself.',
    },
    {
      id: 'd51-w5',
      korean: '카드',
      hangul: 'ka-deu',
      zh: '卡（信用卡/照片卡）', zhEn: 'Card (credit card/photocard)',
      pos: '名词', posEn: 'Noun',
      example: { ko: '카드로 결제할게요.', zh: '刷卡结账。', zhEn: 'Pay by card.' },
      tip: '신용카드 = 信用卡 / 포카 = 포토카드 缩略', tipEn: 'Credit card = credit card / Poca = photocard abbreviation.',
    },
    {
      id: 'd51-w6',
      korean: '뽑다',
      hangul: 'ppop-da',
      zh: '抽/挑', zhEn: 'Draw/Pick',
      pos: '动词', posEn: 'Verb',
      example: { ko: '오빠 사진을 뽑았어요!', zh: '抽到了오빠的照片！', zhEn: 'I pulled oppa\'s photo!' },
      tip: '追星圈固定用法。카드 뽑다 = 抽到卡', tipEn: 'Fixed phrase in fan circles. \'Pull a card\' = draw a card.',
    },
  ],

  dialogue: {
    scene: '달빛카페·시그니처 주문',
    setting: {
      time: '周三 15:30', timeEn: 'Wed 3:30 PM',
      place: '달빛카페（Mochi 生咖场地）', placeEn: 'Moonlight Cafe (Mochi\'s fan cafe venue)',
      npc: '考拉店员', npcEn: 'Koala barista',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '안녕하세요. 오늘 시그니처 음료 하나 주세요.',
        hangul: 'an-nyeong-ha-se-yo. o-neul si-geu-ni-cheo eum-nyo ha-na ju-se-yo',
        zh: '你好。来一杯今天的招牌饮品。', zhEn: 'Hi. I\'ll have today\'s signature drink.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '포토카드 랜덤 1장 들어 있어요, 맞죠?',
        hangul: 'po-to-ka-deu raen-deom han-jang deu-reo i-sseo-yo, mat-jjyo?',
        zh: '随机小卡一张对吧？', zhEn: 'One random photocard, right?',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '考拉店员', npcNameEn: 'Koala barista',
        ko: '네, 맞아요. 9,500원이에요.',
        hangul: 'ne, ma-ja-yo. gu-cheon-o-bae-gwo-ni-e-yo',
        zh: '是的。9,500元。', zhEn: 'Yes. That\'ll be 9,500 won.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '카드로 결제할게요.',
        hangul: 'ka-deu-ro gyeol-je-hal-ge-yo',
        zh: '我刷卡结账。', zhEn: 'I\'ll pay by card.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: 'Day 23에 준호가 대신 주문해줬는데, 오늘은 내가 다 했어.',
        hangul: 'Day 23-e jun-ho-ga dae-sin ju-mun-hae-jwon-neun-de, o-neu-reun nae-ga da hae-sseo',
        zh: 'Day 23 那天Junho帮我点，今天全靠自己。', zhEn: 'On Day 23, Junho ordered for me. Today, I did it all on my own.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '拆卡看到是Mochi正脸卡。Tori发群里第一句话最合适的是？', zhEn: 'When I opened the card, it was a Mochi front-face card. What\'s the most fitting first message for Tori to send to the group chat?',
        practice: 'pick',
        choices: [
          { ko: '얘들아, 나 모찌 오빠 정면 뽑았어!', zh: '朋友们，我抽到Mochi正面卡！', zhEn: 'Guys, I pulled a Mochi front-face card!', correct: true },
          { ko: '카드 없어. 미안.', zh: '没抽到卡。抱歉。', zhEn: 'I didn\'t pull a card. Sorry.', correct: false },
          { ko: '이제 팬 안 할래.', zh: '不想当粉丝了。', zhEn: 'I don\'t want to be a fan anymore.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '独立复习：혼자서 다 할 수 있어요', titleEn: 'Independent review: I can do it all by myself.',
    pattern: 'V + **~(으)ㄹ 수 있어요** · **혼자서**',
    whenToUse: 'Day 51 是"自立主题"复习日——不学新语法，而是把 Day 38 学的能力表达 ~(으)ㄹ 수 있어요 + 主体强调副词 혼자서(独自) 整合。从"我会做饭"到"我一个人能追完星"，同样的句型承载不同分量的成长。', whenToUseEn: 'Day 51 is a \'self-reliance theme\' review day—no new grammar, but integrating the ability expression ~(으)ㄹ 수 있어요 from Day 38 with the subject-emphasizing adverb 혼자서 (alone). From \'I can cook\' to \'I can finish fan-chasing alone,\' the same pattern carries different weights of growth.',
    rules: [
      '**能力表达（Day 38 复习）**：V 어간 + (으)ㄹ 수 있어요。无收音 + ㄹ / 有收音 + 을',
      '**副词 혼자서**：完整形态"独自地"。혼자서 갔어요 = 一个人去了。~서 强调"以___方式"',
      '**表 "独立完成" 的句子结构**：혼자서 + V + ~(으)ㄹ 수 있어요',
      '**과거 → ~(으)ㄹ 수 있었어요**：혼자서 주문할 수 있었어요 = 能一个人点单了'
    ],
    examples: [
      { ko: '혼자서 주문할 수 있어요.', zh: '一个人能点单。', zhEn: 'I can order by myself.', highlight: '혼자서 ... 할 수 있어요', note: '주문하다 → 주문할 수 있어요。今天 Tori 的自我承认', noteEn: '주문하다 → 주문할 수 있어요. Today\'s self-acknowledgment from Tori.' },
      { ko: '혼자서 카드도 뽑았어요.', zh: '一个人也抽到卡了。', zhEn: 'I pulled a card by myself too.', highlight: '혼자서 ... 뽑았어요', note: '뽑다 有받침 → 뽑았어요。반말/해요体都可' },
      { ko: '나 혼자서 다 할 수 있어.', zh: '我一个人全能搞定。', zhEn: 'I can handle everything by myself.', highlight: '나 혼자서', note: '나 + 혼자서 强调"我独自"。~수 있어 반말', noteEn: '나 + 혼자서 emphasizes \'me alone.\' ~수 있어 in casual speech.' },
      { ko: 'Day 23에는 못 했지만, 오늘은 할 수 있어요.', zh: 'Day 23时做不到，今天可以了。', zhEn: 'I couldn\'t do it on Day 23, but today I can.', highlight: '못 했지만 ... 할 수 있어요', note: '过去 vs 现在 대조 = 성장 표현. Day 45学过的 ~보다 + ~지만 组合', noteEn: 'Past vs. present contrast = expression of growth. Combination of ~보다 + ~지만 learned on Day 45.' },
    ],
    pitfall:
      '① **혼자** vs **혼자서**：혼자 是"独自"的名词/副词兼用，혼자서 强调"以独自方式"。日常用 혼자 更多，强调 자립 用 혼자서。② ~(으)ㄹ 수 있다 收音判断（Day 38 pitfall 复习）：뽑다 有받침 → 뽑**을** 수 있어요 ✓。③ ~(으)ㄹ 줄 알다 也表"会"，但语感偏"技能"（会骑车/会做饭）。Day 51 主题是"独立完成一件事"用 ~(으)ㄹ 수 있어요 更合适。',
  },

  output: [
    {
      id: 'd51-o1',
      kind: 'compose',
      zhHint: '一个人能点单。', zhHintEn: 'I can order by myself.',
      tokens: ['혼자서', '주문할 수', '있어요', '주문해요', '주문할래요', '혼자서만'],
      composeAnswer: ['혼자서', '주문할 수', '있어요'],
      successMsg: '혼자서 + ~(으)ㄹ 수 있어요，Day 51 自立主题的一句。', successMsgEn: '혼자서 + ~(으)ㄹ 수 있어요, a sentence from the Day 51 self-reliance theme.',
    },
    {
      id: 'd51-o2',
      kind: 'listen-choice',
      audioKo: '카드로 결제할게요.',
      successMsg: '✓ 咖啡馆结账最刚需句。~로 = 用（工具）.', successMsgEn: '✓ The most essential sentence for paying at a café. ~로 = with (a tool).',
      choices: [
        { zh: '我刷卡结账。', zhEn: 'I\'ll pay by card.', correct: true },
        { zh: '给我卡。', zhEn: 'Give me the card.', correct: false },
        { zh: '不能刷卡。', zhEn: 'I can\'t use a card.', correct: false },
        { zh: '卡换掉。', zhEn: 'Swap the card.', correct: false },
      ],
    },
    {
      id: 'd51-o3',
      kind: 'zh-to-ko',
      zhPrompt: '我一个人全能搞定。', zhPromptEn: 'I can handle everything by myself.',
      successMsg: '"나 혼자서 다 할 수 있어." — 반말 자립 선언.',
      choices: [
        { ko: '나 혼자서 다 할 수 있어.', correct: true },
        { ko: '나 혼자 다 못 해.', correct: false },
        { ko: '나 다 할 수 있는 혼자야.', correct: false },
        { ko: '나 혼자 다 할 수 없어.', correct: false },
      ],
    },
    {
      id: 'd51-o4',
      kind: 'particle-error',
      zhHint: 'Day 23时做不到，今天可以了。', zhHintEn: 'I couldn\'t do it on Day 23, but today I can.',
      successMsg: '~았지만 대조 (Day 48 배운) + 오늘은 (주제 은) = 성장 표현.',
      choices: [
        { ko: 'Day 23에는 못 했지만, 오늘은 할 수 있어요.', correct: true },
        { ko: 'Day 23에는 못 했으니까, 오늘은 할 수 있어요.', correct: false },
        { ko: 'Day 23에는 못 했지만, 오늘이 할 수 있어요.', correct: false },
        { ko: 'Day 23에서 못 했지만, 오늘은 할 수 있어요.', correct: false },
      ],
    },
    {
      id: 'd51-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 51 全对。혼자서 다 했어요.', successMsgEn: '✓ All correct on Day 51. I did it all by myself.',
      pairs: [
        { ko: '시그니처', zh: '招牌', zhEn: 'signboard' },
        { ko: '포토카드', zh: '小卡', zhEn: 'photocard' },
        { ko: '랜덤', zh: '随机', zhEn: 'Random' },
        { ko: '팬', zh: '粉丝', zhEn: 'Fan' },
        { ko: '뽑다', zh: '抽（卡）', zhEn: 'pull (a card)' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '혼자서 생카 다녀왔어요. Day 23 옆에서 보던 사람이, 오늘은 주인공.',
    preview: '明天签售会——三人狂奔穿过弘爪街的霓虹灯。', previewEn: 'Tomorrow is the fan signing event—the three of them sprint through the neon lights of Hongjwa Street.',
    stickerId: 'sticker-d51',
    sceneImageUrl: '/images/diary/day-51-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「혼자 和 혼자서 有什么区别？」「생카 拿到小卡怎么说？」',
};
