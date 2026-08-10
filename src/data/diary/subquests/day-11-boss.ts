import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 11 · 1-5 Boss 战 · 指示词升级综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 12：Minji 教韩币"만 원"
 */
export const day11Boss: BossSubQuestData = {
  day: 11, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '다이소通关 · 이/그/저 三层空间 + 数量', subtitleEn: 'Daiso Challenge · 이/그/저 three-level space + quantities',
  intro: '收银台前，塑料袋鼓鼓地装着：三瓶洗发水、两条毛巾、一双拖鞋、一个胡萝卜钥匙扣。羊店员的白围裙上有一小片货架标签。Junho 用手机拍你——这一关，你要靠自己念出总价的数字。', introEn: 'At the checkout counter, a plastic bag bulges with: three bottles of shampoo, two towels, a pair of slippers, and a carrot keychain. The sheep clerk\'s white apron has a small price tag stuck on it. Junho films you with his phone—in this round, you have to read out the total price on your own.',
  outroHook: '通过！Junho 帮你拎袋子回宿舍。「토리야, 너 한국 돈 봤어?」——他问你看过韩币没。你摇摇头，他笑得意味深长。明天下午 Minji 会拉你去文具店，教你念 「만 원」——舌头准备打结。', outroHookEn: 'Passed! Junho carries your bag back to the dorm. "Toriya, neo hanguk don bwasseo?"—he asks if you\'ve seen Korean money. You shake your head, and he smiles knowingly. Tomorrow afternoon, Minji will drag you to the stationery store to teach you how to say "man won"—get ready for your tongue to tie itself in knots.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd11-b5-t1',
        audioKo: '저거 얼마예요?',
        choices: [
          { text: '这个多少钱？', textEn: 'How much is this?', correct: false },
          { text: '那个（远处）多少钱？', textEn: 'How much is that (over there)?', correct: true },
          { text: '那个（对方那）多少钱？', textEn: 'How much is that one (over there by you)?', correct: false },
          { text: '这里多少钱？', textEn: 'How much is this?', correct: false },
        ],
        explain: '저(远) 是空间三层的第三层。远处货架问价用 저거', explainEn: 'Jeo (far) is the third level of spatial deixis. Use jeogeo to ask prices for shelves far away.',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd11-b5-t2',
        audioKo: '이것도 주세요.',
        choices: [
          { text: '这个不要。', textEn: 'I don\'t want this.', correct: false },
          { text: '这个也请给我。', textEn: 'I\'ll take this too, please.', correct: true },
          { text: '这个是什么？', textEn: 'What is this?', correct: false },
          { text: '这个多少钱？', textEn: 'How much is this?', correct: false },
        ],
        explain: '이것 + 도(也) + 주세요。CU/다이소 结账追加商品黄金句', explainEn: 'Igeot + do (also) + juseyo. The golden phrase for adding items at CU/Daiso checkout.',
      },
    },
    {
      type: 'choice',
      label: '助词/形态改错', labelEn: 'Particle/Form Correction',
      task: {
        id: 'd11-b5-t3',
        promptZh: '"喜欢这个胡萝卜钥匙扣"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "I like this carrot keychain"?',
        choices: [
          { text: '이 당근 키링 좋아요.', correct: false },
          { text: '이 당근 키링 좋아해요.', correct: true },
          { text: '이거 당근 키링 좋아해요.', correct: false },
          { text: '이 당근 키링 좋다.', correct: false },
        ],
        explain: '좋다(好·형용사) vs 좋아하다(喜欢·동사)。喜欢用动词。이 + 名词 = 这~（限定词）', explainEn: 'Jota (good·adjective) vs joahada (to like·verb). Use the verb for "like." I + noun = "this~" (determiner).',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd11-b5-t4',
        promptKo: '필요해요',
        promptHangul: 'pi-ryo-hae-yo',
        choices: [
          { text: '需要', textEn: 'Need', correct: true },
          { text: '想要', textEn: 'To want', correct: false },
          { text: '有', textEn: 'to have / there is', correct: false },
          { text: '喜欢', textEn: 'like', correct: false },
        ],
        explain: '汉字词 필요(必要) + 하다。前用主格 이/가', explainEn: 'Sino-Korean piryo (necessary) + hada. Use subject particles i/ga before it.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd11-b5-t5',
        zhHint: '请给我三个那个（远处）。', zhHintEn: 'Please give me three of those (over there).',
        audioKo: '저거 세 개 주세요.',
        answer: ['저거', '세', '개', '주세요.'],
        tokens: ['저거', '세', '개', '주세요.', '셋', '삼', '병'],
        explain: '저거 + 固有数 세(3) + 개(通用量词) + 주세요', explainEn: 'Jeogeo + native number se (3) + gae (general counter) + juseyo',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd11-b5-t6',
        zhHint: '这个也请给我。', zhHintEn: 'I\'ll take this too, please.',
        audioKo: '이것도 주세요.',
        answer: ['이것도', '주세요.'],
        tokens: ['이것도', '주세요.', '이거가', '이것을', '저것을', '이거는'],
        explain: '이것(这个·书面) + 도(也) + 주세요', explainEn: 'Igeot (this·written) + do (also) + juseyo',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd11-b5-t7',
        audioKo: '저거 얼마예요?',
        promptZh: '客人指着远处货架问「저거 얼마예요?」你（店员）应该？', promptZhEn: 'A customer points at a far shelf and asks "jeogeo eolmayeyo?" What should you (the clerk) say?',
        choices: [
          { text: '저거요? 천 원이에요.', correct: false },
          { text: '그거요? 천 원이에요.', correct: true },
          { text: '이거요? 천 원이에요.', correct: false },
          { text: '얼마예요? 몰라요.', correct: false },
        ],
        explain: '客人 저거 → 店员 그거（客人指的那个）。空间指代换视角', explainEn: 'Customer\'s jeogeo → clerk\'s geugeo (the one the customer pointed at). Shift perspective in spatial deixis.',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd11-b5-t8',
        promptZh: '"需要洗发水"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "I need shampoo"?',
        choices: [
          { text: '샴푸가 필요해요.', correct: true },
          { text: '샴푸를 필요해요.', correct: false },
          { text: '샴푸에 필요해요.', correct: false },
          { text: '샴푸는 필요해요.', correct: false },
        ],
        explain: '필요하다 前用主格 이/가（感受类动词）。샴푸 무받침 → 가',
      },
    },
  ],
};
