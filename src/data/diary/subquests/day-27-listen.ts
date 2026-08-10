import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 27 · 1-2 귀 트이기 · 听力子关卡
 * 素材：Day 27 主流程「烤肉店·Minji请客」+ 补充聚餐语料
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化「ㄹ게(요) 承诺 + 잘 먹겠/었 时态区分」
 */
export const day27Listen: ListenSubQuestData = {
  day: 27, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在烤肉店的烟里听清朋友的每一句约定', subtitleEn: 'Hear every promise clearly through the smoke of the BBQ restaurant',

  meaning: [
    {
      id: 'd27-l2-m1',
      audioKo: '오늘 내가 한턱 낸다!',
      choices: [
        { text: '今天我请客！', textEn: 'I\'m treating today!', correct: true },
        { text: '今天我不请客。', textEn: 'I\'m not treating today.', correct: false },
        { text: '今天我付一半。', textEn: 'I\'ll pay half today.', correct: false },
        { text: '今天不吃饭。', textEn: 'I\'m not eating today.', correct: false },
      ],
      explain: '한턱 내다 是"请一顿"固定搭配。반말 낸다 是宣示语气', explainEn: '한턱 내다 is the fixed phrase for "treat someone to a meal." 반말 낸다 is a declarative tone',
    },
    {
      id: 'd27-l2-m2',
      audioKo: '삼겹살 4인분 주세요.',
      choices: [
        { text: '请给我4人份五花肉。', textEn: 'Please give me 4 servings of pork belly.', correct: true },
        { text: '五花肉一人一份。', textEn: 'One serving of pork belly per person.', correct: false },
        { text: '4号桌上五花肉。', textEn: 'Pork belly on table 4.', correct: false },
        { text: '五花肉多少钱？', textEn: 'How much is the pork belly?', correct: false },
      ],
      explain: '烤肉店必用：数量 + 인분。四人聚餐 → 4인분', explainEn: 'Essential at BBQ restaurants: number + 인분. Four people → 4인분',
    },
    {
      id: 'd27-l2-m3',
      audioKo: '다음에 제가 살게요.',
      choices: [
        { text: '下次我请。', textEn: 'Next time, I\'ll treat.', correct: true },
        { text: '下次帮我买。', textEn: 'Buy it for me next time.', correct: false },
        { text: '下次不用请。', textEn: 'No need to treat next time.', correct: false },
        { text: '下次一起买。', textEn: 'Let\'s buy it together next time.', correct: false },
      ],
      explain: '사다 → 살게요（ㄹ게요 承诺）。韩国请客文化的回礼约定', explainEn: '사다 → 살게요 (ㄹ게요 promise). The reciprocal promise in Korean treat culture',
    },
    {
      id: 'd27-l2-m4',
      audioKo: '잘 먹겠습니다!',
      choices: [
        { text: '我开动了！', textEn: 'I\'m digging in!', correct: true },
        { text: '吃好了。', textEn: 'I ate well.', correct: false },
        { text: '不好吃。', textEn: 'It\'s not tasty.', correct: false },
        { text: '一起吃。', textEn: 'Let\'s eat together.', correct: false },
      ],
      explain: '겠 = 将要 → 饭前用。과거 잘 먹었습니다 才是"吃好了"', explainEn: '겠 = will → used before eating. 과거 잘 먹었습니다 is the correct "I ate well"',
    },
    {
      id: 'd27-l2-m5',
      audioKo: '계산 도와드릴게요.',
      choices: [
        { text: '我帮您结账。', textEn: 'I\'ll pay the bill for you.', correct: true },
        { text: '请自己结账。', textEn: 'Please pay for yourself.', correct: false },
        { text: '结账机在那边。', textEn: 'The checkout machine is over there.', correct: false },
        { text: '结账免费。', textEn: 'Checkout is free.', correct: false },
      ],
      explain: '도와드리다 = 帮您（주다 的敬语）+ ㄹ게요 承诺 · 店员标准句', explainEn: '도와드리다 = to help you (honorific of 주다) + ㄹ게요 promise · standard staff phrase',
    },
  ],

  cloze: [
    {
      id: 'd27-l2-c1',
      audioKo: '오늘 내가 한턱 낼게!',
      clozeParts: ['오늘 내가 한턱 ', '!'],
      choices: [
        { text: '낼게', correct: true },
        { text: '내다', correct: false },
        { text: '내요', correct: false },
        { text: '냈어', correct: false },
      ],
      explain: '내다 + ㄹ게（반말承诺）', explainEn: '내다 + ㄹ게 (informal promise)',
    },
    {
      id: 'd27-l2-c2',
      audioKo: '다음에 제가 살게요.',
      clozeParts: ['다음에 제가 ', '.'],
      choices: [
        { text: '살게요', correct: true },
        { text: '사을게요', correct: false },
        { text: '사요', correct: false },
        { text: '샀어요', correct: false },
      ],
      explain: '사다 + ㄹ게요 → 살게요（ㄹ 插入）', explainEn: '사다 + ㄹ게요 → 살게요 (ㄹ insertion)',
    },
    {
      id: 'd27-l2-c3',
      audioKo: '잘 먹겠습니다!',
      clozeParts: ['잘 ', '!'],
      choices: [
        { text: '먹겠습니다', correct: true },
        { text: '먹었습니다', correct: false },
        { text: '먹습니다', correct: false },
        { text: '먹었어요', correct: false },
      ],
      explain: '饭前 → 겠（将要）。먹었 是"已经吃了"（饭后用）', explainEn: 'Before eating → 겠 (will). 먹었 means \'already ate\' (used after meals)',
    },
    {
      id: 'd27-l2-c4',
      audioKo: '시험이 끝났어요!',
      clozeParts: ['시험이 ', '!'],
      choices: [
        { text: '끝났어요', correct: true },
        { text: '끝나요', correct: false },
        { text: '끝나겠어요', correct: false },
        { text: '끝났었어요', correct: false },
      ],
      explain: '过去时 → 끝나 + 았어요 → 끝났어요（缩合）', explainEn: 'Past tense → 끝나 + 았어요 → 끝났어요 (contraction)',
    },
  ],

  reply: [
    {
      id: 'd27-l2-r1',
      audioKo: '오늘 내가 한턱 낸다!',
      promptZh: 'Minji 宣布请客，你想抢着付并说明理由，最自然的一句？', promptZhEn: 'Minji announces she\'s treating, you want to grab the bill and explain why. What\'s the most natural thing to say?',
      choices: [
        { text: '아니, 오늘 내가 낼게. 시험 끝난 기념으로.', correct: true },
        { text: '싫어. 배 안 고파.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '抢买单 → 내가 낼게 + 理由（시험 끝난 기념으로 = 庆祝考完）', explainEn: 'Grabbing the bill → 내가 낼게 + reason (시험 끝난 기념으로 = to celebrate finishing the exam)',
    },
    {
      id: 'd27-l2-r2',
      audioKo: '한국에서는 시험 끝나면 내가 사. 다음에 토리가 사.',
      promptZh: 'Minji 用韩国请客文化说服你，你想接受并感谢约定，最合适的一句？', promptZhEn: 'Minji convinces you with Korean treating culture, you want to accept and thank her for the promise. What\'s the most fitting response?',
      choices: [
        { text: '알았어. 다음엔 내가 꼭 살게!', correct: true },
        { text: '싫어. 지금 내가 내야 해.', correct: false },
        { text: '몰라.', correct: false },
        { text: '얼마예요?', correct: false },
      ],
      explain: '알았어（接受）+ 다음엔 내가 꼭 살게（回礼约定）· 반말 최강 승낙', explainEn: '알았어 (accept) + 다음엔 내가 꼭 살게 (promise to return the favor) · strongest informal acceptance',
    },
    {
      id: 'd27-l2-r3',
      audioKo: '계산 도와드릴게요. 60,000원입니다.',
      promptZh: '店员报出金额，Minji 结账，你想感谢款待并约定下次，最完整的一句？', promptZhEn: 'The staff gives the total, Minji pays. You want to thank her for the meal and promise next time. What\'s the most complete thing to say?',
      choices: [
        { text: '잘 먹었습니다. 다음엔 제가 살게요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '싫어요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '被请客后必备两句：잘 먹었습니다（感谢款待）+ 다음엔 제가 살게요（回礼）', explainEn: 'Two must-say phrases after being treated: 잘 먹었습니다 (thanks for the meal) + 다음엔 제가 살게요 (return the favor)',
    },
  ],
};
