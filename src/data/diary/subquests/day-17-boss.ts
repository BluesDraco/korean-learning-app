import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 17 · 1-5 Boss 战 · ~아/어 주세요 综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 18：수민은행 · 银行开户
 */
export const day17Boss: BossSubQuestData = {
  day: 17, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: 'T-Money 卡通关 · 从"하나 주세요"到"카드로 할게요"', subtitleEn: 'T-Money Card Mission · From "하나 주세요" to "카드로 할게요"',
  intro: '猫头鹰售票员的眼镜片映着窗外的日光。你手心汗湿——但要用韩语走完办卡 + 充值 + 付款的全流程。Boss 战开始。', introEn: 'The owl ticket clerk\'s glasses reflect the sunlight outside. Your palms are sweaty—but you\'ll need to use Korean to get through the whole process: getting the card, recharging, and paying. Boss battle begins.',
  outroHook: '通过！蓝色的卡在手心还有点凉，但你握紧了。回宿舍路上，Junho 提醒你还没开韩国银行账户——学费要打给学校、房租要转给房东。下一关：수민은행（兽民银行），乌龟柜员说话很慢，请耐心。', outroHookEn: 'Passed! The blue card is still a bit cold in your hand, but you hold it tight. On the way back to the dorm, Junho reminds you that you haven\'t opened a Korean bank account yet—tuition needs to be sent to the school, and rent to the landlord. Next level: 수민은행 (Soomin Bank). The turtle teller speaks slowly, so be patient.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd17-b5-t1',
        audioKo: '충전 해 주세요.',
        choices: [
          { text: '请帮我充值。', textEn: 'Please recharge it for me.', correct: true },
          { text: '请给我一张卡。', textEn: 'Please give me a card.', correct: false },
          { text: '请稍等一下。', textEn: 'Please wait a moment.', correct: false },
          { text: '请帮我拍照。', textEn: 'Please take a photo for me.', correct: false },
        ],
        explain: '충전(充值) + 해 주세요（하다 类）', explainEn: '충전 (recharge) + 해 주세요 (하다 type)',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd17-b5-t2',
        audioKo: '카드로 할게요.',
        choices: [
          { text: '我用卡付。', textEn: 'I\'ll pay by card.', correct: true },
          { text: '我要卡。', textEn: 'I want a card.', correct: false },
          { text: '卡多少钱？', textEn: 'How much is the card?', correct: false },
          { text: '卡不行吗？', textEn: 'Can\'t I use a card?', correct: false },
        ],
        explain: '카드 + 로（方式）+ 할게요（意愿）= 我用卡付', explainEn: '카드 + 로 (method) + 할게요 (intention) = I\'ll pay with card',
      },
    },
    {
      type: 'choice',
      label: '语法改错', labelEn: 'Grammar Correction',
      task: {
        id: 'd17-b5-t3',
        promptZh: '"请帮我拍照"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "Please take a photo for me"?',
        choices: [
          { text: '사진 찍아 주세요.', correct: false },
          { text: '사진 찍어 주세요.', correct: true },
          { text: '사진 찍으세요.', correct: false },
          { text: '사진 찍고 있어요.', correct: false },
        ],
        explain: '찍다 词干 ㅣ → 어 주세요。「찍아 주세요 ❌」', explainEn: '찍다 stem ㅣ → 어 주세요. "찍아 주세요 ❌"',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd17-b5-t4',
        promptKo: '도와주세요',
        promptHangul: 'do-wa-ju-se-yo',
        choices: [
          { text: '请帮帮我', textEn: 'Please help me', correct: true },
          { text: '请给我', textEn: 'Please give me', correct: false },
          { text: '请稍等', textEn: 'Please wait a moment', correct: false },
          { text: '请慢走', textEn: 'Please go safely', correct: false },
        ],
        explain: '돕다(ㅂ 不规则) → 도와 + 주세요。紧急求助黄金句', explainEn: '돕다 (ㅂ irregular) → 도와 + 주세요. The golden phrase for urgent help',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd17-b5-t5',
        zhHint: '请给我一张 T-money 卡。', zhHintEn: 'Please give me a T-money card.',
        audioKo: '티머니카드 하나 주세요.',
        answer: ['티머니카드', '하나', '주세요.'],
        tokens: ['티머니카드', '하나', '주세요.', '한 장', '일', '있어요.'],
        explain: '「하나 주세요」= 请给我一张/一个。주다 本身不需要 아/어', explainEn: '"하나 주세요" = Please give me one. 주다 itself doesn\'t need 아/어',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd17-b5-t6',
        zhHint: '请稍等一下。', zhHintEn: 'Please wait a moment.',
        audioKo: '잠깐 기다려 주세요.',
        answer: ['잠깐', '기다려', '주세요.'],
        tokens: ['잠깐', '기다려', '주세요.', '기다리세요.', '기다렸어요.', '기다리고 있어요.'],
        explain: '기다리다 词干 ㅣ → 기다려 주세요', explainEn: '기다리다 stem ㅣ → 기다려 주세요',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd17-b5-t7',
        audioKo: '카드로 하실 거예요, 현금으로 하실 거예요?',
        promptZh: '售票员问"用卡还是现金？"你想用卡付，最自然的一句？', promptZhEn: 'The clerk asks, "Card or cash?" You want to pay by card. What\'s the most natural thing to say?',
        choices: [
          { text: '카드로 할게요.', correct: true },
          { text: '카드 있어요?', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '만 원이요.', correct: false },
        ],
        explain: 'N + 로 + 할게요 = 用 N 付。카드 无받침 → 로',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd17-b5-t8',
        promptZh: '游客搭话「저기요, 잠깐 시간 있어요?」（有时间吗？）— 你猜想他想请人拍照，最自然的一句？', promptZhEn: 'A tourist approaches you: "저기요, 잠깐 시간 있어요?" (Got a moment?) — You guess they want a photo taken. What\'s the most natural thing to say?',
        choices: [
          { text: '네, 사진 찍어 드릴까요?', correct: true },
          { text: '아니요, 없어요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '游客搭话通常想拍照。「찍어 드릴까요?」= 要我为您拍吗（드리다 是 주다 敬语）', explainEn: 'Tourists usually want photos. "찍어 드릴까요?" = Shall I take one for you? (드리다 is the honorific form of 주다)',
      },
    },
  ],
};
