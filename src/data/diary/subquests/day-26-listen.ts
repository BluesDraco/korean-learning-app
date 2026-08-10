import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 26 · 1-2 귀 트이기 · 听力子关卡
 * 素材：Day 26 主流程「다이소·羊店员」+ 补充买东西语料
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化「N이/가 필요해요」+ ㅂ불규칙 귀엽다
 */
export const day26Listen: ListenSubQuestData = {
  day: 26, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在百元店走一圈，听懂每一句店员招呼', subtitleEn: 'Walk around a 100-yen store and understand every greeting from the staff',

  meaning: [
    {
      id: 'd26-l2-m1',
      audioKo: '샴푸 필요해요.',
      choices: [
        { text: '需要洗发水。', textEn: 'I need shampoo.', correct: true },
        { text: '洗发水没有了。', textEn: 'The shampoo is all gone.', correct: false },
        { text: '不用洗发水。', textEn: 'No shampoo needed.', correct: false },
        { text: '要换洗发水。', textEn: 'I need to change the shampoo.', correct: false },
      ],
      explain: '「N 필요해요」= 需要 N。省略了主格助词 이/가（口语常见）', explainEn: 'N 필요해요 = I need N. The subject particle 이/가 is omitted (common in speech)',
    },
    {
      id: 'd26-l2-m2',
      audioKo: '이 당근 볼펜 얼마예요?',
      choices: [
        { text: '这个胡萝卜笔多少钱？', textEn: 'How much is this carrot pen?', correct: true },
        { text: '这里有胡萝卜。', textEn: 'There are carrots here.', correct: false },
        { text: '胡萝卜好吃吗？', textEn: 'Are the carrots delicious?', correct: false },
        { text: '胡萝卜笔好用吗？', textEn: 'Is the carrot pen easy to use?', correct: false },
      ],
      explain: '얼마예요? = 多少钱？问价格必用', explainEn: '얼마예요? = How much is it? Essential for asking prices',
    },
    {
      id: 'd26-l2-m3',
      audioKo: '천 원이에요.',
      choices: [
        { text: '1000元。', textEn: '1,000 won.', correct: true },
        { text: '10000元。', textEn: '10,000 won.', correct: false },
        { text: '一件商品。', textEn: 'One item.', correct: false },
        { text: '免费。', textEn: 'Free.', correct: false },
      ],
      explain: '천(千) + 원(韩元)。다이소 商品多在 1000-5000 원', explainEn: '천 (thousand) + 원 (Korean won). Daiso items are mostly 1,000-5,000 won.',
    },
    {
      id: 'd26-l2-m4',
      audioKo: '봉투 필요하세요?',
      choices: [
        { text: '需要袋子吗？', textEn: 'Do you need a bag?', correct: true },
        { text: '袋子多少钱？', textEn: 'How much is the bag?', correct: false },
        { text: '没有袋子。', textEn: 'No bags.', correct: false },
        { text: '袋子在哪？', textEn: 'Where are the bags?', correct: false },
      ],
      explain: '收银员必问句。韩国购物袋要另外收费', explainEn: 'A must-ask from the cashier. Shopping bags cost extra in Korea.',
    },
    {
      id: 'd26-l2-m5',
      audioKo: '이거 진짜 귀여워요!',
      choices: [
        { text: '这个真的好可爱！', textEn: 'This is really cute!', correct: true },
        { text: '这个真的很贵。', textEn: 'This is really expensive.', correct: false },
        { text: '这个坏了。', textEn: 'This is broken.', correct: false },
        { text: '这个真好吃。', textEn: 'This is really delicious.', correct: false },
      ],
      explain: '귀엽다 ㅂ 不规则 → 귀여워요', explainEn: '귀엽다 ㅂ irregular → 귀여워요',
    },
  ],

  cloze: [
    {
      id: 'd26-l2-c1',
      audioKo: '샴푸가 필요해요.',
      clozeParts: ['샴푸', ' 필요해요.'],
      choices: [
        { text: '가', correct: true },
        { text: '을', correct: false },
        { text: '는', correct: false },
        { text: '에', correct: false },
      ],
      explain: '필요하다 是形容词 → 主语用 이/가。샴푸 无收音 → 가', explainEn: '필요하다 is an adjective → subject takes 이/가. 샴푸 has no final consonant → 가',
    },
    {
      id: 'd26-l2-c2',
      audioKo: '돈이 필요해요.',
      clozeParts: ['돈', ' 필요해요.'],
      choices: [
        { text: '이', correct: true },
        { text: '가', correct: false },
        { text: '을', correct: false },
        { text: '는', correct: false },
      ],
      explain: '돈 有收音 ㄴ → 이', explainEn: '돈 has final consonant ㄴ → 이',
    },
    {
      id: 'd26-l2-c3',
      audioKo: '이거 진짜 귀여워요!',
      clozeParts: ['이거 진짜 ', '!'],
      choices: [
        { text: '귀여워요', correct: true },
        { text: '귀엽어요', correct: false },
        { text: '귀엽아요', correct: false },
        { text: '귀요요', correct: false },
      ],
      explain: 'ㅂ 不规则 → 귀엽 → 귀여워요', explainEn: 'ㅂ irregular → 귀엽 → 귀여워요',
    },
    {
      id: 'd26-l2-c4',
      audioKo: '샴푸, 그리고 수건도요.',
      clozeParts: ['샴푸, ', ' 수건도요.'],
      choices: [
        { text: '그리고', correct: true },
        { text: '하지만', correct: false },
        { text: '그러나', correct: false },
        { text: '왜냐하면', correct: false },
      ],
      explain: '그리고 = 还有/然后。列出多物时用', explainEn: '그리고 = and/then. Used when listing multiple items.',
    },
  ],

  reply: [
    {
      id: 'd26-l2-r1',
      audioKo: '어서 오세요~ 뭐 필요하세요?',
      promptZh: '店员问需要什么，你想说洗发水和毛巾都要，最完整的一句？', promptZhEn: 'The clerk asks what you need. You want both shampoo and a towel. What\'s the most complete sentence?',
      choices: [
        { text: '샴푸 필요해요. 그리고 수건도요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '싫어요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '「N 필요해요」+ 그리고 + 「N 도」列多物 · 다이소购物标准句', explainEn: '「N 필요해요」+ 그리고 + 「N 도」 to list multiple items · Standard Daiso shopping sentence',
    },
    {
      id: 'd26-l2-r2',
      audioKo: '천 원이에요. 귀여워요, 안 그래요?',
      promptZh: '店员说 1000 元且好可爱，你决定买，最自然的一句？', promptZhEn: 'The clerk says it\'s 1,000 won and cute. You decide to buy it. What\'s the most natural sentence?',
      choices: [
        { text: '네, 이것도 주세요.', correct: true },
        { text: '아니요, 안 사요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '「이것도 주세요」= 这个也要。追加商品的标准句', explainEn: '「이것도 주세요」= I\'ll take this too. Standard sentence for adding items.',
    },
    {
      id: 'd26-l2-r3',
      audioKo: '봉투 필요하세요?',
      promptZh: '收银员问需要袋子吗，你带了自己的环保袋，最自然的一句？', promptZhEn: 'The cashier asks if you need a bag. You brought your own eco-bag. What\'s the most natural sentence?',
      choices: [
        { text: '아니요, 괜찮아요.', correct: true },
        { text: '네, 만나서 반가워요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '싫어요.', correct: false },
      ],
      explain: '不需要 → 「아니요, 괜찮아요」。比 「싫어요」（讨厌） 得体', explainEn: 'No need → 「아니요, 괜찮아요」. More polite than 「싫어요」 (hate).',
    },
  ],
};
