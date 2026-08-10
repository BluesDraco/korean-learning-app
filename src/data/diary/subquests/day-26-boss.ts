import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 26 · 1-5 Boss 战 · 다이소再访综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：N 이/가 필요해요 + 필요 없다 + ㅂ불규칙 + 追加购买
 */
export const day26Boss: BossSubQuestData = {
  day: 26, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '把胡萝卜笔别在耳朵上', subtitleEn: 'Clip the carrot pen on your ear.',
  intro: '篮子里堆着洗发水、毛巾、垃圾袋。走到文具区，那根橙色的胡萝卜笔在灯下发着和记忆里一样的颜色。收银台的羊店员抬头看你——今天这一趟购物要好好走完。', introEn: 'The basket is piled with shampoo, towels, and trash bags. Walking to the stationery aisle, that orange carrot pen glows under the light, the same color as in your memory. The sheep cashier at the counter looks up at you—finish this shopping trip well today.',
  outroHook: '通过！胡萝卜笔别在耳朵上。明天四人聚餐，Tori 想第一次请客——"我来付"，韩语怎么说？', outroHookEn: 'Passed! Carrot pen clipped on your ear. Tomorrow\'s four-person dinner, Tori wants to treat for the first time—"I\'ll pay," how do you say it in Korean?',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd26-b5-t1',
        audioKo: '샴푸 필요해요.',
        choices: [
          { text: '需要洗发水。', textEn: 'I need shampoo.', correct: true },
          { text: '洗发水没了。', textEn: 'The shampoo is gone.', correct: false },
          { text: '不用洗发水。', textEn: 'No shampoo needed.', correct: false },
          { text: '买洗发水。', textEn: 'Buy shampoo.', correct: false },
        ],
        explain: 'N 필요해요 = 需要 N', explainEn: 'N 필요해요 = need N',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd26-b5-t2',
        audioKo: '봉투 필요하세요?',
        choices: [
          { text: '需要袋子吗？', textEn: 'Do you need a bag?', correct: true },
          { text: '袋子多少钱？', textEn: 'How much is the bag?', correct: false },
          { text: '没有袋子。', textEn: 'No bags.', correct: false },
          { text: '装袋子。', textEn: 'Put it in a bag.', correct: false },
        ],
        explain: '收银员必问句', explainEn: 'Cashier\'s must-ask phrase',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd26-b5-t3',
        promptZh: '"需要钱"哪句正确？', promptZhEn: 'Which sentence is correct for "need money"?',
        choices: [
          { text: '돈을 필요해요.', correct: false },
          { text: '돈이 필요해요.', correct: true },
          { text: '돈은 필요해요.', correct: false },
          { text: '돈가 필요해요.', correct: false },
        ],
        explain: '필요하다 是形容词 → 主语用 이/가。돈 有收音 → 이', explainEn: '필요하다 is an adjective → subject uses 이/가. 돈 has a final consonant → 이',
      },
    },
    {
      type: 'choice',
      label: '形态改错', labelEn: 'Fix the form',
      task: {
        id: 'd26-b5-t4',
        promptZh: '"这个真的好可爱"哪句正确？', promptZhEn: 'Which sentence is correct for "This is really cute"?',
        choices: [
          { text: '이거 진짜 귀엽어요!', correct: false },
          { text: '이거 진짜 귀여워요!', correct: true },
          { text: '이거 진짜 귀엽아요!', correct: false },
          { text: '이거 진짜 귀엽여요!', correct: false },
        ],
        explain: 'ㅂ 不规则 → 귀엽 → 귀여워요', explainEn: 'ㅂ irregular → 귀엽 → 귀여워요',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd26-b5-t5',
        promptKo: '얼마예요?',
        promptHangul: 'eol-ma-ye-yo',
        choices: [
          { text: '多少钱？', textEn: 'How much is it?', correct: true },
          { text: '多少人？', textEn: 'How many people?', correct: false },
          { text: '多远？', textEn: 'How far?', correct: false },
          { text: '多久？', textEn: 'How long?', correct: false },
        ],
        explain: '얼마예요? = 多少钱？· 问价格万能句', explainEn: '얼마예요? = How much? · The go-to phrase for asking prices',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd26-b5-t6',
        zhHint: '需要洗发水。还有毛巾。', zhHintEn: 'I need shampoo. And a towel too.',
        audioKo: '샴푸 필요해요. 그리고 수건도요.',
        answer: ['샴푸', '필요해요.', '그리고', '수건도요.'],
        tokens: ['샴푸', '필요해요.', '그리고', '수건도요.', '수건을', '있어요.', '주세요.'],
        explain: '「N 필요해요 + 그리고 + N 도」列多物', explainEn: '「N 필요해요 + 그리고 + N 도」List multiple items',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd26-b5-t7',
        zhHint: '这个也要。', zhHintEn: 'I want this too.',
        audioKo: '이것도 주세요.',
        answer: ['이것도', '주세요.'],
        tokens: ['이것도', '주세요.', '이것을', '이것이', '주지 마세요.', '얼마예요?'],
        explain: '追加时用 도 = 也', explainEn: 'Use 도 when adding = also',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd26-b5-t8',
        promptZh: '店员问「봉투 필요하세요?」，你自带了环保袋，最得体的一句？', promptZhEn: 'The clerk asks 「봉투 필요하세요?」, you brought your own eco bag, what\'s the most polite response?',
        choices: [
          { text: '아니요, 괜찮아요.', correct: true },
          { text: '싫어요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '봉투가 뭐예요?', correct: false },
        ],
        explain: '婉拒 = 아니요, 괜찮아요。싫어요 是"讨厌"，语气过重', explainEn: 'Polite refusal = 아니요, 괜찮아요. 싫어요 means "I hate it," too strong',
      },
    },
  ],
};
