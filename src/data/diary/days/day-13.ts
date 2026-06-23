import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 13 · 약국 · 感冒了 + Haru 陪去药店
 *
 * 剧情：半夜兔莉鼻塞醒来，咳嗽到肺都疼。早上 Haru 敲门发现她脸色发白，
 * 二话不说："약국 가자."（去药店吧。）一只白鹭药剂师姐姐站在柜台后。
 * 兔莉怯怯地说："감기 걸렸어요. 콧물이 나요."（我感冒了，流鼻涕。）
 * 白鹭姐姐温柔地拿了三盒药："이 약 드세요. 따뜻한 물 많이 마셔요."
 * 回宿舍路上，Haru 说她刚来韩国时也是这样开始的。
 *
 * 学习目标：症状词 / ~ 걸리다 / 약 드세요 / 礼貌建议
 * 韩语自审：korean skill PASS
 */
export const day13: ToriDay = {
  day: 13,
  phase: 'foundation',
  title: '약국 · 感冒了',
  subtitle: 'Haru 陪我去药店，我学会了描述病情',
  isCheckpoint: null,
  estimatedMin: 13,

  opening: {
    date: '9월 14일 목요일 오전',
    weather: '首尔 · 雨',
    toriPose: 'sleepy',
    diaryText: `9月 14日，半夜 2 点，我被鼻塞憋醒。
喉咙像着了火，咳一声胸口就疼。
胡萝卜在床头静静的。

早上 7 点，Haru 敲门借酱油。
她看到我脸色就皱眉："토리, 너 얼굴이 너무 안 좋아."
（兔莉，你脸色太差了。）

二话不说："약국 가자."
（去药店吧。）

她拽着我下楼。
药店在便利店旁边，白色招牌写着大大的"약"。
推开门，一只优雅的白鹭姐姐站在柜台后。

我怯怯地说："감기 걸렸어요. 콧물이 나요."
（我感冒了，流鼻涕。）

白鹭姐姐温柔地拿了三盒药：
"감기약, 콧물약, 기침약. 식후에 드세요."
（感冒药、鼻涕药、咳嗽药。饭后服用。）
她又加了一句："따뜻한 물 많이 마셔요."
（多喝热水。）

回宿舍的路上，Haru 说：
"나도 처음 한국 왔을 때 이렇게 시작했어."
（我刚来韩国时也是这样开始的。）

吃完药躺下时，我突然懂了——
学韩语和过日子，
都是从生病那天真正开始的。`,
  },

  words: [
    {
      id: 'd13-w1',
      korean: '약국',
      hangul: 'yak-guk',
      zh: '药店',
      pos: '名词',
      example: { ko: '약국 가요.', zh: '我去药店。' },
      tip: '韩国药店一般在便利店附近，认招牌上大大的「약」字',
    },
    {
      id: 'd13-w2',
      korean: '감기',
      hangul: 'gam-gi',
      zh: '感冒',
      pos: '名词',
      example: { ko: '감기 걸렸어요.', zh: '我感冒了。' },
      tip: '搭配：~걸리다 (得病)。「감기 걸렸어요」固定搭配',
    },
    {
      id: 'd13-w3',
      korean: '콧물',
      hangul: 'kon-mul',
      zh: '鼻涕',
      pos: '名词',
      example: { ko: '콧물이 나요.', zh: '流鼻涕。' },
      tip: '搭配：~이/가 나요 (流出)。「콧물이 나요」',
    },
    {
      id: 'd13-w4',
      korean: '기침',
      hangul: 'gi-chim',
      zh: '咳嗽',
      pos: '名词',
      example: { ko: '기침이 심해요.', zh: '咳嗽很厉害。' },
      tip: '搭配：~이 심해요 (很严重) / ~이 나요 (出现)',
    },
    {
      id: 'd13-w5',
      korean: '약',
      hangul: 'yak',
      zh: '药',
      pos: '名词',
      example: { ko: '이 약 드세요.', zh: '请吃这个药。' },
      tip: '前缀：감기약(感冒药) / 두통약(头痛药) / 콧물약(鼻涕药)',
    },
    {
      id: 'd13-w6',
      korean: '드세요',
      hangul: 'deu-se-yo',
      zh: '请吃 / 请喝（敬语）',
      pos: '表达',
      example: { ko: '식후에 드세요.', zh: '请饭后服用。' },
      tip: '「먹다 / 마시다」的尊敬形。对病人、长辈用',
    },
  ],

  dialogue: {
    scene: '약국 柜台',
    setting: {
      time: '早上 8 点',
      place: '宿舍附近 약국',
      npc: '白鹭药剂师',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '白鹭药剂师',
        ko: '어디가 불편하세요?',
        hangul: 'eo-di-ga bul-pyeon-ha-se-yo',
        zh: '哪里不舒服？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '감기 걸렸어요. 콧물이 나요.',
        hangul: 'gam-gi geol-lyeo-sseo-yo. kon-mul-i na-yo',
        zh: '我感冒了，流鼻涕。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '白鹭药剂师',
        ko: '기침도 해요?',
        hangul: 'gi-chim-do hae-yo',
        zh: '也咳嗽吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 좀 해요.',
        hangul: 'ne, jom hae-yo',
        zh: '是的，有点。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '白鹭姐姐说"식후에 드세요. 따뜻한 물 많이 마셔요."，兔莉应该回什么？',
        practice: 'pick',
        choices: [
          { ko: '네, 알겠습니다. 감사합니다.', zh: '好的，我知道了。谢谢。', correct: true },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
          { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '描述病情 · 名词 + 걸렸어요 / 나요',
    pattern: '병 + 걸렸어요 (得了___) · 증상 + 이/가 나요 (出现___)',
    whenToUse: '看病、买药、跟朋友说"我不太舒服"时。',
    rules: [
      '**병 + 걸렸어요** = 得了___病：감기 **걸렸어요** / 독감 **걸렸어요**',
      '**증상 + 이/가 나요** = 出现/流___：콧물**이** 나요 / 열**이** 나요',
      '严重程度：「많이 / 좀 / 조금」+ 症状：기침이 **많이** 나요 (咳得很多)',
    ],
    examples: [
      { ko: '감기 걸렸어요.', zh: '我感冒了。', highlight: '걸렸어요' },
      { ko: '콧물이 나요.', zh: '流鼻涕。', highlight: '나요' },
      { ko: '열이 나요.', zh: '发烧。', highlight: '나요' },
      { ko: '기침이 심해요.', zh: '咳得很厉害。', highlight: '심해요' },
    ],
    pitfall:
      '「감기 걸렸어요」是过去时（걸리다 → 걸렸어요），不是「감기 있어요」。表达"现在病在身上"用过去时是因为韩语强调"已经得了"。',
  },

  output: [
    {
      id: 'd13-o1',
      kind: 'fill',
      prompt: '___ 걸렸어요. 콧물이 나요.',
      zhHint: '我感冒了，流鼻涕。',
      answer: '감기',
      successMsg: '白鹭药剂师姐姐拿出了三盒药递给你 ✓',
    },
  ],

  recap: {
    toriPose: 'sleepy',
    praise: '在韩国第一次生病、第一次自己买药。Haru 在你身边。',
    preview: '关卡 2 要来了。咖啡馆点单的完整对话，一个人能撑下来吗？',
    stickerId: 'sticker-d13',
  },

  carrotHint:
    '今天的胡萝卜：「韩国常见症状词」「药店常用句」「饭后吃药怎么说」',
};
