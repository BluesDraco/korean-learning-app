import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 26 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：다이소再访 · 从进店打招呼到列购物清单到追加+结账
 */
export const day26Scene: SceneSubQuestData = {
  day: 26, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '다이소购物一整个流程', subtitleEn: 'The whole Daiso shopping process',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd26-sc-s1',
      scenario: '羊店员招呼「어서 오세요~ 뭐 필요하세요?」，你想说洗发水和毛巾都要，最完整的一句？', scenarioEn: 'The sheep clerk greets you with \'어서 오세요~ 뭐 필요하세요?\' You want to say you need both shampoo and a towel. What\'s the most complete sentence?',
      choices: [
        { ko: '샴푸 필요해요. 그리고 수건도요.', zh: '需要洗发水。还有毛巾。', zhEn: 'I need shampoo. And a towel too.', correct: true },
        { ko: '샴푸를 사요.', zh: '买洗发水。', zhEn: 'Buy shampoo.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '「N 필요해요 + 그리고 + N 도」列多物 · 다이소购物必备', explainEn: '\'N 필요해요 + 그리고 + N 도\' — listing multiple items · essential for Daiso shopping',
    },
    {
      type: 'situation',
      id: 'd26-sc-s2',
      scenario: '文具区看到一根胡萝卜形状的橙色笔，你觉得可爱想问价格，最自然的一句？', scenarioEn: 'You see an orange pen shaped like a carrot in the stationery section. You think it\'s cute and want to ask the price. What\'s the most natural sentence?',
      choices: [
        { ko: '이 당근 볼펜 얼마예요?', zh: '这个胡萝卜笔多少钱？', zhEn: 'How much is this carrot pen?', correct: true },
        { ko: '당근을 필요해요.', zh: '需要胡萝卜。', zhEn: 'I need a carrot.', correct: false },
        { ko: '볼펜이 뭐예요?', zh: '圆珠笔是什么？', zhEn: 'What is a ballpoint pen?', correct: false },
        { ko: '이거 사고 싶어요.', zh: '想买这个。', zhEn: 'I want to buy this.', correct: false },
      ],
      explain: '问价格万能句 = 「N 얼마예요?」· 是问价格最短最标准的问法', explainEn: 'Universal price question = \'N 얼마예요?\' — the shortest and most standard way to ask a price',
    },
    {
      type: 'situation',
      id: 'd26-sc-s3',
      scenario: '结账时店员问「봉투 필요하세요?」，你自带了环保袋，最得体的一句？', scenarioEn: 'At checkout, the clerk asks \'봉투 필요하세요?\' You brought your own eco-bag. What\'s the most polite response?',
      choices: [
        { ko: '아니요, 괜찮아요.', zh: '不用，没关系。', zhEn: 'No, it\'s fine.', correct: true },
        { ko: '싫어요.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '봉투가 뭐예요?', zh: '袋子是什么？', zhEn: 'What is a bag?', correct: false },
      ],
      explain: '婉拒 → 「아니요, 괜찮아요」（不用，没关系）· 「싫어요」（讨厌）在这里失礼', explainEn: 'Polite refusal → \'아니요, 괜찮아요\' (No, it\'s fine) · \'싫어요\' (I hate it) would be rude here',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd26-sc-d1',
      lines: [
        { speaker: '점원 양', ko: '어서 오세요~ 뭐 필요하세요?', zh: '欢迎光临~需要什么？', zhEn: 'Welcome~ What do you need?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '샴푸 필요해요. 그리고 수건도요.', zh: '需要洗发水。还有毛巾。', zhEn: 'I need shampoo. And a towel too.', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '괜찮아요.', zh: '没关系。', zhEn: 'It\'s okay.', correct: false },
      ],
      explain: '被问需要什么 → 说出商品名 + 필요해요', explainEn: 'When asked what you need → say the item name + 필요해요',
    },
    {
      type: 'dialogue',
      id: 'd26-sc-d2',
      lines: [
        { speaker: '점원 양', ko: '천 원이에요. 귀여워요, 안 그래요?', zh: '1000元。很可爱吧？', zhEn: '1,000 won. Cute, right?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 이것도 주세요.', zh: '是的，这个也要。', zhEn: 'Yes, I want this too.', correct: true },
        { ko: '아니요, 안 사요.', zh: '不，不买。', zhEn: 'No, I won\'t buy it.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '决定买 → 「이것도 주세요」· 도 表示追加', explainEn: 'Deciding to buy → \'이것도 주세요\' · 도 indicates addition',
    },
    {
      type: 'dialogue',
      id: 'd26-sc-d3',
      lines: [
        { speaker: '점원 양', ko: '다른 건 필요 없으세요?', zh: '还需要别的吗？', zhEn: 'Anything else?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 이것만 살게요.', zh: '嗯，只买这些。', zhEn: 'Yeah, just these.', correct: true },
        { ko: '아니요, 만나서 반가워요.', zh: '不，很高兴认识你。', zhEn: 'No, nice to meet you.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '뭐 필요해요?', zh: '需要什么？', zhEn: 'What do you need?', correct: false },
      ],
      explain: '不追加时 → 「이것만 살게요」（只买这些）· 만 = 只，ㄹ게요 = 承诺', explainEn: 'When not adding more → \'이것만 살게요\' (I\'ll just buy these) · 만 = only, ㄹ게요 = promise/commitment',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd26-sc-c1',
      ko: '봉투 필요하세요?',
      promptZh: '这句话最可能在什么情境下听到？', promptZhEn: 'In what situation would you most likely hear this sentence?',
      choices: [
        { zh: '在便利店/超市/百货店结账时，店员询问是否要购物袋', zhEn: 'At a convenience store/supermarket/department store checkout, when the clerk asks if you need a shopping bag', correct: true },
        { zh: '朋友问要不要一起看电影', zhEn: 'A friend asks if you want to watch a movie together', correct: false },
        { zh: '医生问哪里不舒服', zhEn: 'A doctor asks where it hurts', correct: false },
        { zh: '房东问押金准备好了没', zhEn: 'A landlord asks if the deposit is ready', correct: false },
      ],
      explain: '「봉투 필요하세요?」是韩国收银员必问句 · 购物袋另收费', explainEn: '"봉투 필요하세요?" is a must-know phrase from Korean cashiers — shopping bags cost extra',
    },
    {
      type: 'context',
      id: 'd26-sc-c2',
      ko: '이것도 주세요.',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '购物时突然又想要多一件东西', zhEn: 'When shopping, suddenly wanting one more item', correct: true },
        { zh: '第一次点菜', zhEn: 'Ordering for the first time', correct: false },
        { zh: '感谢别人送礼', zhEn: 'Thanking someone for a gift', correct: false },
        { zh: '拒绝对方推荐', zhEn: 'Declining a recommendation', correct: false },
      ],
      explain: '도（也）= 追加。已选的基础上 "这个也要"', explainEn: '도 (also) = addition. On top of what you\'ve chosen, "this too"',
    },
  ],
};
