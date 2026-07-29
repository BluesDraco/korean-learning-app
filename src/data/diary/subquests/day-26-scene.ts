import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 26 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：다이소再访 · 从进店打招呼到列购物清单到追加+结账
 */
export const day26Scene: SceneSubQuestData = {
  day: 26, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '다이소购物一整个流程',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd26-sc-s1',
      scenario: '羊店员招呼「어서 오세요~ 뭐 필요하세요?」，你想说洗发水和毛巾都要，最完整的一句？',
      choices: [
        { ko: '샴푸 필요해요. 그리고 수건도요.', zh: '需要洗发水。还有毛巾。', correct: true },
        { ko: '샴푸를 사요.', zh: '买洗发水。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '「N 필요해요 + 그리고 + N 도」列多物 · 다이소购物必备',
    },
    {
      type: 'situation',
      id: 'd26-sc-s2',
      scenario: '文具区看到一根胡萝卜形状的橙色笔，你觉得可爱想问价格，最自然的一句？',
      choices: [
        { ko: '이 당근 볼펜 얼마예요?', zh: '这个胡萝卜笔多少钱？', correct: true },
        { ko: '당근을 필요해요.', zh: '需要胡萝卜。', correct: false },
        { ko: '볼펜이 뭐예요?', zh: '圆珠笔是什么？', correct: false },
        { ko: '이거 사고 싶어요.', zh: '想买这个。', correct: false },
      ],
      explain: '问价格万能句 = 「N 얼마예요?」· 是问价格最短最标准的问法',
    },
    {
      type: 'situation',
      id: 'd26-sc-s3',
      scenario: '结账时店员问「봉투 필요하세요?」，你自带了环保袋，最得体的一句？',
      choices: [
        { ko: '아니요, 괜찮아요.', zh: '不用，没关系。', correct: true },
        { ko: '싫어요.', zh: '不要。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '봉투가 뭐예요?', zh: '袋子是什么？', correct: false },
      ],
      explain: '婉拒 → 「아니요, 괜찮아요」（不用，没关系）· 「싫어요」（讨厌）在这里失礼',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd26-sc-d1',
      lines: [
        { speaker: '점원 양', ko: '어서 오세요~ 뭐 필요하세요?', zh: '欢迎光临~需要什么？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '샴푸 필요해요. 그리고 수건도요.', zh: '需要洗发水。还有毛巾。', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '괜찮아요.', zh: '没关系。', correct: false },
      ],
      explain: '被问需要什么 → 说出商品名 + 필요해요',
    },
    {
      type: 'dialogue',
      id: 'd26-sc-d2',
      lines: [
        { speaker: '점원 양', ko: '천 원이에요. 귀여워요, 안 그래요?', zh: '1000元。很可爱吧？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 이것도 주세요.', zh: '是的，这个也要。', correct: true },
        { ko: '아니요, 안 사요.', zh: '不，不买。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '决定买 → 「이것도 주세요」· 도 表示追加',
    },
    {
      type: 'dialogue',
      id: 'd26-sc-d3',
      lines: [
        { speaker: '점원 양', ko: '다른 건 필요 없으세요?', zh: '还需要别的吗？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 이것만 살게요.', zh: '嗯，只买这些。', correct: true },
        { ko: '아니요, 만나서 반가워요.', zh: '不，很高兴认识你。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '뭐 필요해요?', zh: '需要什么？', correct: false },
      ],
      explain: '不追加时 → 「이것만 살게요」（只买这些）· 만 = 只，ㄹ게요 = 承诺',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd26-sc-c1',
      ko: '봉투 필요하세요?',
      promptZh: '这句话最可能在什么情境下听到？',
      choices: [
        { zh: '在便利店/超市/百货店结账时，店员询问是否要购物袋', correct: true },
        { zh: '朋友问要不要一起看电影', correct: false },
        { zh: '医生问哪里不舒服', correct: false },
        { zh: '房东问押金准备好了没', correct: false },
      ],
      explain: '「봉투 필요하세요?」是韩国收银员必问句 · 购物袋另收费',
    },
    {
      type: 'context',
      id: 'd26-sc-c2',
      ko: '이것도 주세요.',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '购物时突然又想要多一件东西', correct: true },
        { zh: '第一次点菜', correct: false },
        { zh: '感谢别人送礼', correct: false },
        { zh: '拒绝对方推荐', correct: false },
      ],
      explain: '도（也）= 追加。已选的基础上 "这个也要"',
    },
  ],
};
