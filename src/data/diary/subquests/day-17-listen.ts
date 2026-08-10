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
  subtitle: '在地铁站售票窗口，听清猫头鹰的每一句',

  meaning: [
    {
      id: 'd17-l2-m1',
      audioKo: '티머니카드 하나 주세요.',
      choices: [
        { text: '请给我一张 T-money 卡。', correct: true },
        { text: 'T-money 卡有一张。', correct: false },
        { text: '有一张卡吗？', correct: false },
        { text: '请充值 T-money 卡。', correct: false },
      ],
      explain: '티머니카드 + 하나(固有数一) + 주세요 = 请给我一张 T-money 卡',
    },
    {
      id: 'd17-l2-m2',
      audioKo: '충전 해 주세요.',
      choices: [
        { text: '请帮我充值。', correct: true },
        { text: '请给我一张卡。', correct: false },
        { text: '请等一下。', correct: false },
        { text: '请帮我拍照。', correct: false },
      ],
      explain: '충전(充值) + 하다 → 해 주세요 = 请帮我充值。「하다 → 해 주세요」标准变形',
    },
    {
      id: 'd17-l2-m3',
      audioKo: '카드는 4,000원이에요.',
      choices: [
        { text: '卡是 4000 元。', correct: true },
        { text: '卡是 40000 元。', correct: false },
        { text: '现金 4000 元。', correct: false },
        { text: '找 4000 元。', correct: false },
      ],
      explain: '사천원 = 4000 元。T-money 卡实体费用',
    },
    {
      id: 'd17-l2-m4',
      audioKo: '카드로 할게요.',
      choices: [
        { text: '我用卡付。', correct: true },
        { text: '我要卡。', correct: false },
        { text: '卡是多少钱？', correct: false },
        { text: '卡可以吗？', correct: false },
      ],
      explain: '카드 + 로(方式·用~) + 할게요(意愿·我会做) = 我用卡付。收银台标准句',
    },
    {
      id: 'd17-l2-m5',
      audioKo: '잠깐 기다려 주세요.',
      choices: [
        { text: '请稍等一下。', correct: true },
        { text: '一起等吧。', correct: false },
        { text: '等我一下吗？', correct: false },
        { text: '不用等了。', correct: false },
      ],
      explain: '잠깐(稍) + 기다리다 → 기다려 주세요 = 请稍等。기다리 词尾 ㅣ → 기다려',
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
      explain: '하다 类动词 → 해 주세요。「充值/学习/工作」等 하다 类都是这个变形',
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
      explain: '찍다 词干"찍"元音 ㅣ → 어 주세요（不是 아）。「사진 찍어 주세요」= 旅行必备',
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
      explain: '돕다 是 ㅂ 不规则 → 돕 + 아 = 도와（不是 돕아 ❌）。「도와주세요」是紧急求助',
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
      explain: '「하나」独立用（不搭量词）时保留原形。搭量词时才变 「한」（如 한 개、한 잔）。这里省略了「장」量词直接用 하나',
    },
  ],

  reply: [
    {
      id: 'd17-l2-r1',
      audioKo: '어떻게 도와드릴까요?',
      promptZh: '售票员用敬语问"我能怎么帮您？"你想办 T-money 卡，最自然的一句？',
      choices: [
        { text: '티머니카드 하나 주세요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
        { text: '몰라요.', correct: false },
      ],
      explain: '售票员开场后直接说明需求：物品 + 하나 + 주세요',
    },
    {
      id: 'd17-l2-r2',
      audioKo: '충전은 얼마 하시겠어요?',
      promptZh: '售票员问"充多少钱？"你想充一万元，最自然的一句？',
      choices: [
        { text: '만 원이요.', correct: true },
        { text: '천 원이요.', correct: false },
        { text: '카드예요.', correct: false },
        { text: '없어요.', correct: false },
      ],
      explain: '「만 원이요」= 一万元（省略动词的口语回答）。「~이요/요」是名词后的礼貌收尾',
    },
    {
      id: 'd17-l2-r3',
      audioKo: '카드로 하실 거예요, 현금으로 하실 거예요?',
      promptZh: '售票员问"用卡还是用现金？"你想用卡，最自然的一句？',
      choices: [
        { text: '카드로 할게요.', correct: true },
        { text: '현금으로 할게요.', correct: false },
        { text: '카드 있어요?', correct: false },
        { text: '만 원이요.', correct: false },
      ],
      explain: '「카드로 할게요」= 我用卡付。로 = 方式助词。할게요 = 意愿形（我会做）',
    },
  ],
};
