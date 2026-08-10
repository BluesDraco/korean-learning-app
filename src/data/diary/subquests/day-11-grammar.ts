import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 11 · 1-3 문법 탐험 · 语法关
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：이거/그거/저거 升级——加助词、加动词、加数量
 * 教学梯度：
 *   fix 挑常见错误——좋아요 vs 좋아해요 / 是/에 主宾格 / 固有数量词变形
 *   → compose 从单句到复杂店内对话
 *   → rule 抽象规则：动词 vs 形容词 / 视角切换 / 助词层叠
 */
export const day11Grammar: GrammarSubQuestData = {
  day: 11, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '指示词升级 · 加助词、加数量、加动词',

  // ─── 助词/形态改错 ───
  fix: [
    {
      id: 'd11-g3-f1',
      promptKo: '이거 좋아요.',
      promptZh: '"我喜欢这个"哪句正确？',
      choices: [
        { text: '이거 좋아요.', correct: false },
        { text: '이거 좋아해요.', correct: true },
        { text: '이거 좋아하다.', correct: false },
        { text: '이거 좋다.', correct: false },
      ],
      explain: '「좋다」= 好（形容词）；「좋아하다」= 喜欢（动词）。表达"我喜欢"必须用动词 좋아해요。이거 좋아요 = "这个好"，跟"喜欢"不同',
    },
    {
      id: 'd11-g3-f2',
      promptKo: '수건 삼 개 주세요.',
      promptZh: '"请给我三条毛巾"哪句正确？',
      choices: [
        { text: '수건 삼 개 주세요.', correct: false },
        { text: '수건 세 개 주세요.', correct: true },
        { text: '수건 셋 개 주세요.', correct: false },
        { text: '수건 세 잔 주세요.', correct: false },
      ],
      explain: '数东西用固有数不用汉字数（삼×，세✓）。固有数 셋 搭量词变 세。毛巾属通用物用 개 量词',
    },
    {
      id: 'd11-g3-f3',
      promptKo: '샴푸를 필요해요.',
      promptZh: '"需要洗发水"哪句正确？',
      choices: [
        { text: '샴푸를 필요해요.', correct: false },
        { text: '샴푸가 필요해요.', correct: true },
        { text: '샴푸에 필요해요.', correct: false },
        { text: '샴푸는 필요해요.', correct: false },
      ],
      explain: '필요하다 前用**主格 이/가**（跟 있다/없다 一样）。샴푸 무받침 → 가。感受动词都用主格',
    },
    {
      id: 'd11-g3-f4',
      promptKo: '저거는 있어요?',
      promptZh: '"有那个（远处）吗？"最自然的说法？',
      choices: [
        { text: '저거는 있어요?', correct: false },
        { text: '저거 있어요?', correct: true },
        { text: '저거를 있어요?', correct: false },
        { text: '저거에 있어요?', correct: false },
      ],
      explain: '指示词 + 있어요/없어요 通常直接接（省略 은/는 或 이/가）。加 는 略生硬；口语最自然是「저거 있어요?」',
    },
    {
      id: 'd11-g3-f5',
      promptKo: '이것도 이것도 주세요.',
      promptZh: '"这个和那个都要"最自然的说法？',
      choices: [
        { text: '이것도 이것도 주세요.', correct: false },
        { text: '이거하고 저거 주세요.', correct: true },
        { text: '이거를 저거를 주세요.', correct: false },
        { text: '이것가 저것가 주세요.', correct: false },
      ],
      explain: '「하고」= 和/跟（口语并列助词）。이거하고 저거 = 这个和那个。多个东西并列用 하고，不重复 도',
    },
  ],

  // ─── 组句 ───
  compose: [
    {
      id: 'd11-g3-c1',
      zhHint: '那个（远处）多少钱？',
      audioKo: '저거 얼마예요?',
      answer: ['저거', '얼마예요?'],
      tokens: ['저거', '얼마예요?', '이거', '그거', '있어요?', '뭐예요?'],
      explain: '저거(远处那个) + 얼마예요?（多少钱？）。空间三层最远的一层，问远处货架价格',
    },
    {
      id: 'd11-g3-c2',
      zhHint: '请给我三个那个（远处）。',
      audioKo: '저거 세 개 주세요.',
      answer: ['저거', '세', '개', '주세요.'],
      tokens: ['저거', '세', '개', '주세요.', '셋', '삼', '병'],
      explain: '저거 + 固有数 세 + 개(通用量词) + 주세요。1000 원一次买三个',
    },
    {
      id: 'd11-g3-c3',
      zhHint: '这个也请给我。（追加商品）',
      audioKo: '이것도 주세요.',
      answer: ['이것도', '주세요.'],
      tokens: ['이것도', '주세요.', '이거가', '이것을', '저것을', '이거는'],
      explain: '이것도 = 이것(这个·书面)+ 도(也)。第二样商品的连接句',
    },
    {
      id: 'd11-g3-c4',
      zhHint: '喜欢这个胡萝卜钥匙扣。（반말对朋友）',
      audioKo: '이 당근 키링 좋아해.',
      answer: ['이', '당근', '키링', '좋아해.'],
      tokens: ['이', '당근', '키링', '좋아해.', '좋아요.', '좋다.', '없어.'],
      explain: '이(这·指示形容词，接名词直接用) + 당근 키링(胡萝卜钥匙扣) + 좋아해(喜欢·반말)。「이거 = 这个（代词）」vs「이 + 名词 = 这~（限定词）」',
    },
  ],

  // ─── 规则理解 ───
  rule: [
    {
      id: 'd11-g3-r1',
      promptZh: '「좋다」vs「좋아하다」哪个描述最准确？',
      choices: [
        { text: '좋다 = 好（形容词），좋아하다 = 喜欢（动词）。宾格 을/를 只能跟 좋아하다', correct: true },
        { text: '两个词完全一样，可以互换', correct: false },
        { text: '좋다 是动词，좋아하다 是形容词', correct: false },
        { text: '좋다 用于人，좋아하다 用于物', correct: false },
      ],
      explain: '中文"喜欢"一词，韩语拆两个：好(형용사 좋다) vs 喜欢(동사 좋아하다)。喜欢某物 → 을/를 좋아해요。这是初学者高频错点',
    },
    {
      id: 'd11-g3-r2',
      promptZh: '客人指着远处货架问「저거 얼마예요?」，店员该用哪个指示词回答？',
      choices: [
        { text: '이거요, 저거요.（跟客人一样）', correct: false },
        { text: '그거요, 천 원이에요.（换成"你指的那个"）', correct: true },
        { text: '저거요, 저거요.（保持一致）', correct: false },
        { text: '이거요, 이거요.（换成"我手边这个"）', correct: false },
      ],
      explain: '空间指代要换视角：客人 저거（远处） → 店员 그거（客人指的那个）。这是韩语空间三层的核心考察',
    },
    {
      id: 'd11-g3-r3',
      promptZh: '关于「이거」vs「이 + 名词」，哪个描述最准确？',
      choices: [
        { text: '「이거」= 这个（代词，独立用）；「이 + 名词」= 这~（限定词，接名词）', correct: true },
        { text: '两者完全一样，可以互换', correct: false },
        { text: '「이거」用于书面，「이 ~」用于口语', correct: false },
        { text: '「이거」用于人，「이 ~」用于物', correct: false },
      ],
      explain: '이거 = 이 + 것 = 这个东西（代词）。이 是限定形容词，后必接名词：이 사람(这人)、이 책(这本书)。所以 「이 당근 키링」= 这个胡萝卜钥匙扣',
    },
    {
      id: 'd11-g3-r4',
      promptZh: '关于 「필요해요」 的助词，哪句最准确？',
      choices: [
        { text: '필요해요 前用**主格 이/가**：수건이 필요해요（跟 있어요/없어요 一样）', correct: true },
        { text: '前用宾格 을/를：수건을 필요해요', correct: false },
        { text: '前用位置 에：수건에 필요해요', correct: false },
        { text: '前用 은/는：수건은 필요해요', correct: false },
      ],
      explain: '필요하다(需要) 归类为**感受/存在类**动词——用主格 이/가。跟英文 need（要宾语）不同。这是韩语高频错点',
    },
  ],
};
