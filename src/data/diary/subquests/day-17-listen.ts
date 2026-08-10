import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 17 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 17 主流程「T-Money 卡 · 猫头鹰售票员」
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 ~아/어 주세요，reply 铺 售票员应对
 */
export const day17Listen: ListenSubQuestData = {
  day: 17, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在地铁站售票窗口，听清猫头鹰的每一句', subtitleEn: 'At the subway ticket booth, listen carefully to every word the owl says',

  meaning: [
    {
      id: 'd17-l2-m1',
      audioKo: '티머니카드 하나 주세요.',
      choices: [
        { text: '请给我一张 T-money 卡。', textEn: 'Please give me a T-money card.', correct: true },
        { text: 'T-money 卡有一张。', textEn: 'There is one T-money card.', correct: false },
        { text: '有一张卡吗？', textEn: 'Do you have a card?', correct: false },
        { text: '请充值 T-money 卡。', textEn: 'Please charge the T-money card.', correct: false },
      ],
      explain: '티머니카드 + 하나(固有数一) + 주세요 = 请给我一张 T-money 卡', explainEn: '티머니카드 + 하나 (native number one) + 주세요 = Please give me one T-money card',
    },
    {
      id: 'd17-l2-m2',
      audioKo: '충전 해 주세요.',
      choices: [
        { text: '请帮我充值。', textEn: 'Please recharge it for me.', correct: true },
        { text: '请给我一张卡。', textEn: 'Please give me a card.', correct: false },
        { text: '请等一下。', textEn: 'Please wait a moment.', correct: false },
        { text: '请帮我拍照。', textEn: 'Please take a photo for me.', correct: false },
      ],
      explain: '충전(充值) + 하다 → 해 주세요 = 请帮我充值。「하다 → 해 주세요」标准变形', explainEn: '충전 (charge) + 하다 → 해 주세요 = Please charge it for me. \'하다 → 해 주세요\' is the standard conjugation',
    },
    {
      id: 'd17-l2-m3',
      audioKo: '카드는 4,000원이에요.',
      choices: [
        { text: '卡是 4000 元。', textEn: 'The card is 4,000 won.', correct: true },
        { text: '卡是 40000 元。', textEn: 'The card is 40,000 won.', correct: false },
        { text: '现金 4000 元。', textEn: 'Cash is 4,000 won.', correct: false },
        { text: '找 4000 元。', textEn: 'Change is 4,000 won.', correct: false },
      ],
      explain: '사천원 = 4000 元。T-money 卡实体费用', explainEn: '사천원 = 4,000 won. The cost of the physical T-money card',
    },
    {
      id: 'd17-l2-m4',
      audioKo: '카드로 할게요.',
      choices: [
        { text: '我用卡付。', textEn: 'I\'ll pay by card.', correct: true },
        { text: '我要卡。', textEn: 'I want a card.', correct: false },
        { text: '卡是多少钱？', textEn: 'How much is the card?', correct: false },
        { text: '卡可以吗？', textEn: 'Is the card okay?', correct: false },
      ],
      explain: '카드 + 로(方式·用~) + 할게요(意愿·我会做) = 我用卡付。收银台标准句', explainEn: '카드 + 로 (method·with~) + 할게요 (intention·I\'ll do) = I\'ll pay with card. Standard checkout phrase.',
    },
    {
      id: 'd17-l2-m5',
      audioKo: '잠깐 기다려 주세요.',
      choices: [
        { text: '请稍等一下。', textEn: 'Please wait a moment.', correct: true },
        { text: '一起等吧。', textEn: 'Let\'s wait together.', correct: false },
        { text: '等我一下吗？', textEn: 'Will you wait for me?', correct: false },
        { text: '不用等了。', textEn: 'No need to wait.', correct: false },
      ],
      explain: '잠깐(稍) + 기다리다 → 기다려 주세요 = 请稍等。기다리 词尾 ㅣ → 기다려', explainEn: '잠깐 (a moment) + 기다리다 → 기다려 주세요 = Please wait a moment. 기다리 stem ㅣ → 기다려',
    },
  ],

  cloze: [
    {
      id: 'd17-l2-c1',
      audioKo: '충전 해 주세요.',
      clozeParts: ['충전 ', '.'],
      choices: [
        { text: '해 주세요', correct: true },
        { text: '해요', correct: false },
        { text: '하고 있어요', correct: false },
        { text: '했어요', correct: false },
      ],
      explain: '하다 类动词 → 해 주세요。「充值/学习/工作」等 하다 类都是这个变形', explainEn: '하다-type verbs → 해 주세요. All 하다 verbs like \'recharge/study/work\' follow this pattern.',
    },
    {
      id: 'd17-l2-c2',
      audioKo: '사진 찍어 주세요.',
      clozeParts: ['사진 ', '.'],
      choices: [
        { text: '찍어 주세요', correct: true },
        { text: '찍아 주세요', correct: false },
        { text: '찍으세요', correct: false },
        { text: '찍고 있어요', correct: false },
      ],
      explain: '찍다 词干"찍"元音 ㅣ → 어 주세요（不是 아）。「사진 찍어 주세요」= 旅行必备', explainEn: '찍다 stem "찍" vowel ㅣ → 어 주세요 (not 아). 「사진 찍어 주세요」= essential for travel.',
    },
    {
      id: 'd17-l2-c3',
      audioKo: '도와주세요.',
      clozeParts: ['', '주세요.'],
      choices: [
        { text: '도와', correct: true },
        { text: '돕아', correct: false },
        { text: '돕어', correct: false },
        { text: '돕고', correct: false },
      ],
      explain: '돕다 是 ㅂ 不规则 → 돕 + 아 = 도와（不是 돕아 ❌）。「도와주세요」是紧急求助', explainEn: '돕다 is ㅂ-irregular → 돕 + 아 = 도와 (not 돕아 ❌). 「도와주세요」is for urgent help.',
    },
    {
      id: 'd17-l2-c4',
      audioKo: '카드 하나 주세요.',
      clozeParts: ['카드 ', '주세요.'],
      choices: [
        { text: '하나', correct: true },
        { text: '한 개', correct: false },
        { text: '일', correct: false },
        { text: '한', correct: false },
      ],
      explain: '「하나」独立用（不搭量词）时保留原形。搭量词时才变 「한」（如 한 개、한 잔）。这里省略了「장」量词直接用 하나', explainEn: '\'하나\' stays in its base form when used alone (without a counter). It becomes \'한\' with counters (e.g., 한 개, 한 잔). Here the counter \'장\' is omitted and 하나 is used directly.',
    },
  ],

  reply: [
    {
      id: 'd17-l2-r1',
      audioKo: '어떻게 도와드릴까요?',
      promptZh: '售票员用敬语问"我能怎么帮您？"你想办 T-money 卡，最自然的一句？', promptZhEn: 'The ticket clerk asks politely, "How can I help you?" You want to get a T-money card—what\'s the most natural thing to say?',
      choices: [
        { text: '티머니카드 하나 주세요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
        { text: '몰라요.', correct: false },
      ],
      explain: '售票员开场后直接说明需求：物品 + 하나 + 주세요', explainEn: 'After the clerk opens, state your need directly: item + 하나 + 주세요.',
    },
    {
      id: 'd17-l2-r2',
      audioKo: '충전은 얼마 하시겠어요?',
      promptZh: '售票员问"充多少钱？"你想充一万元，最自然的一句？', promptZhEn: 'The clerk asks, "How much do you want to charge?" You want to charge 10,000 won—what\'s the most natural thing to say?',
      choices: [
        { text: '만 원이요.', correct: true },
        { text: '천 원이요.', correct: false },
        { text: '카드예요.', correct: false },
        { text: '없어요.', correct: false },
      ],
      explain: '「만 원이요」= 一万元（省略动词的口语回答）。「~이요/요」是名词后的礼貌收尾', explainEn: '\'만 원이요\' = 10,000 won (colloquial answer with the verb omitted). \'~이요/요\' is a polite ending after nouns.',
    },
    {
      id: 'd17-l2-r3',
      audioKo: '카드로 하실 거예요, 현금으로 하실 거예요?',
      promptZh: '售票员问"用卡还是用现金？"你想用卡，最自然的一句？', promptZhEn: 'The clerk asks, "Card or cash?" You want to use card—what\'s the most natural thing to say?',
      choices: [
        { text: '카드로 할게요.', correct: true },
        { text: '현금으로 할게요.', correct: false },
        { text: '카드 있어요?', correct: false },
        { text: '만 원이요.', correct: false },
      ],
      explain: '「카드로 할게요」= 我用卡付。로 = 方式助词。할게요 = 意愿形（我会做）', explainEn: '\'카드로 할게요\' = I\'ll pay with card. 로 = method particle. 할게요 = intention form (I\'ll do).',
    },
  ],
};
