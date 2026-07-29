import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 11 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 11 主流程 다이소场景
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 이거/그거/저거+助词+动词，reply 铺 결제/포장 应对
 */
export const day11Listen: ListenSubQuestData = {
  day: 11, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在 다이소 货架前，分辨这个 / 那个 / 那个远的',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd11-l2-m1',
      audioKo: '저거 얼마예요?',
      choices: [
        { text: '这个多少钱？', correct: false },
        { text: '那个（远处）多少钱？', correct: true },
        { text: '那个（对方那）多少钱？', correct: false },
        { text: '这里多少钱？', correct: false },
      ],
      explain: '저거(远处那个) + 얼마예요?（多少钱？）。저(远) 是韩语空间三层的第三层',
    },
    {
      id: 'd11-l2-m2',
      audioKo: '천 원이에요.',
      choices: [
        { text: '10000 元。', correct: false },
        { text: '1000 元。', correct: true },
        { text: '100 元。', correct: false },
        { text: '10 元。', correct: false },
      ],
      explain: '천(千) + 원(韩元) = 1000 元。约合 5 RMB。다이소的招牌价',
    },
    {
      id: 'd11-l2-m3',
      audioKo: '수건 세 개 주세요.',
      choices: [
        { text: '请给我三条毛巾。', correct: true },
        { text: '请给我两条毛巾。', correct: false },
        { text: '请给我一条毛巾。', correct: false },
        { text: '请给我毛巾洗发水。', correct: false },
      ],
      explain: '수건(毛巾) + 세 개(3 个·固有数 셋→세) + 주세요。数东西用固有数不用汉字数',
    },
    {
      id: 'd11-l2-m4',
      audioKo: '이거 좋아해요.',
      choices: [
        { text: '这个好。', correct: false },
        { text: '喜欢这个。', correct: true },
        { text: '这个多少钱？', correct: false },
        { text: '这个有。', correct: false },
      ],
      explain: '이거(这个) + 좋아해요(喜欢·动词)。좋아하다 vs 좋다 不同——喜欢用动词 좋아하다',
    },
    {
      id: 'd11-l2-m5',
      audioKo: '이것도 주세요.',
      choices: [
        { text: '这个不要。', correct: false },
        { text: '这个也请给我。', correct: true },
        { text: '这个是什么？', correct: false },
        { text: '这个多少钱？', correct: false },
      ],
      explain: '이것(这个) + 도(也) + 주세요。CU/다이소 结账追加商品的黄金句',
    },
  ],

  // ─── 听句填空 ───
  cloze: [
    {
      id: 'd11-l2-c1',
      audioKo: '저거 얼마예요?',
      clozeParts: ['', '얼마예요?'],
      choices: [
        { text: '저거', correct: true },
        { text: '이거', correct: false },
        { text: '엄마', correct: false },
        { text: '뭐', correct: false },
      ],
      explain: '货架远处的东西 → 저거。问价用 얼마예요?',
    },
    {
      id: 'd11-l2-c2',
      audioKo: '이거 세 개 주세요.',
      clozeParts: ['이거 ', '주세요.'],
      choices: [
        { text: '세 개', correct: true },
        { text: '삼 개', correct: false },
        { text: '셋 개', correct: false },
        { text: '세 병', correct: false },
      ],
      explain: '固有数 셋 → 세（搭量词变形） + 개。价格用汉字数(삼)，数东西用固有数(세)',
    },
    {
      id: 'd11-l2-c3',
      audioKo: '샴푸가 필요해요.',
      clozeParts: ['샴푸', '필요해요.'],
      choices: [
        { text: '가', correct: true },
        { text: '를', correct: false },
        { text: '에', correct: false },
        { text: '도', correct: false },
      ],
      explain: '필요하다 前用**主格 이/가**（不是宾格 을/를）。跟 있다/없다 一样是"存在"类感受词——用主格',
    },
    {
      id: 'd11-l2-c4',
      audioKo: '저거는 뭐예요?',
      clozeParts: ['저거는 ', '?'],
      choices: [
        { text: '뭐예요', correct: true },
        { text: '얼마예요', correct: false },
        { text: '있어요', correct: false },
        { text: '없어요', correct: false },
      ],
      explain: '저거 + 는(主题助词) + 뭐예요?(是什么？)。「저거는 ~」= 那个呢，暗示"我在问这个（相比别的）"',
    },
  ],

  // ─── 听对话选回应 ───
  reply: [
    {
      id: 'd11-l2-r1',
      audioKo: '저거 얼마예요?',
      promptZh: '客人指着远处货架问「저거 얼마예요?」你（店员）看到是 1000 元的商品，应该？',
      choices: [
        { text: '저거요? 천 원이에요.', correct: false },
        { text: '그거요? 천 원이에요.', correct: true },
        { text: '이거요? 천 원이에요.', correct: false },
        { text: '얼마예요? 몰라요.', correct: false },
      ],
      explain: '客人 저거 → 店员 그거（"你指的那个"）。空间指代要换视角。「그거요?」是先确认一下再报价',
    },
    {
      id: 'd11-l2-r2',
      audioKo: '이 키링 좋아해?',
      promptZh: 'Junho 반말问"这个胡萝卜钥匙扣，喜欢吗？"你想说"很喜欢"用반말，应该？',
      choices: [
        { text: '응, 진짜 좋아해!', correct: true },
        { text: '아니요, 좋아요.', correct: false },
        { text: '괜찮아요, 감사합니다.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '반말对반말：응(嗯·반말"是") + 좋아해(喜欢·반말·去 요)。「좋아요」是形容词"好"，跟"喜欢"不同',
    },
    {
      id: 'd11-l2-r3',
      audioKo: '이것도 필요하세요?',
      promptZh: '店员问"这个也需要吗？"你已经决定一起买，应该？',
      choices: [
        { text: '네, 이것도 주세요.', correct: true },
        { text: '아니요, 없어요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '몰라요.', correct: false },
      ],
      explain: '要就答 네, ~도 주세요。「이것도 주세요」= 这个也请给我。CU/다이소 结账黄金句',
    },
  ],
};
