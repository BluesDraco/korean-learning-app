import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 6 · 1-3 语法关 · 是非疑问句 ~이에요? / ~예요?
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 教学梯度：
 *   fix 揪疑问句常见错（少 ? / 收音判断错 / 疑问词误用 은/는）
 *   → compose 从「X이에요?」到 KPOP 좋아해요 综合练
 *   → rule 抽象 3 条：升调即疑问 / 좋아하다 用 을/를 / 疑问词后必 이/가
 *
 * 承上（Day 5 은/는 vs 이/가 收束）继续深化 을/를 与 이/가 的区分
 * 特别强化 좋아하다（动词，宾格）vs 좋다（形容词，主格）这对高频翻车点
 */
export const day6Grammar: GrammarSubQuestData = {
  day: 6, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '是非疑问句 + 좋아하다 vs 좋다 区分',

  // ─── 助词改错：给错句 → 选正确写法 ───
  fix: [
    {
      id: 'd06-g3-f1',
      promptKo: '중국 사람예요?',
      promptZh: '"是中国人吗？"哪句正确？',
      choices: [
        { text: '중국 사람예요?', correct: false },
        { text: '중국 사람이에요?', correct: true },
        { text: '중국 사람이예요?', correct: false },
        { text: '중국 사람이입니까?', correct: false },
      ],
      explain: '사람 有收音 ㅁ → 이에요?。「사람예요」漏了 이，「이예요」是错拼',
    },
    {
      id: 'd06-g3-f2',
      promptKo: '토리이에요?',
      promptZh: '"是兔莉吗？"哪句正确？',
      choices: [
        { text: '토리이에요?', correct: false },
        { text: '토리예요?', correct: true },
        { text: '토리에요?', correct: false },
        { text: '토리이예요?', correct: false },
      ],
      explain: '토리 无收音 → 예요?（不加 이）。「토리이에요」是把无收音硬套有收音规则',
    },
    {
      id: 'd06-g3-f3',
      promptKo: 'KPOP를 좋아요.',
      promptZh: '"喜欢 KPOP"哪句正确？',
      choices: [
        { text: 'KPOP를 좋아요.', correct: false },
        { text: 'KPOP을 좋아해요.', correct: true },
        { text: 'KPOP이 좋아해요.', correct: false },
        { text: 'KPOP를 좋아해요.', correct: false },
      ],
      explain: '좋아하다（动词） + 을/를。KPOP 按发音「케이팝」尾音 ㅂ 处理 → 을。「좋다」（形容词）才配 이/가',
    },
    {
      id: 'd06-g3-f4',
      promptKo: '뭐는 좋아해요?',
      promptZh: '"你喜欢什么？"哪句正确？',
      choices: [
        { text: '뭐는 좋아해요?', correct: false },
        { text: '뭐가 좋아해요?', correct: false },
        { text: '뭐를 좋아해요?', correct: true },
        { text: '뭐이 좋아해요?', correct: false },
      ],
      explain: '좋아하다 是动词，前面搭宾格 을/를。뭐 无收音 → 를。疑问词后**不能**用 은/는',
    },
    {
      id: 'd06-g3-f5',
      promptKo: '반장이에요.',
      promptZh: '"是班长吗？"哪句正确？',
      choices: [
        { text: '반장이에요.', correct: false },
        { text: '반장예요?', correct: false },
        { text: '반장이에요?', correct: true },
        { text: '반장이입니까?', correct: false },
      ],
      explain: '陈述句加 ? = 疑问，词形不变。반장 有收音 → 이에요?。「반장이에요.」没问号是陈述',
    },
  ],

  // ─── 组句：词块拼完整句 ───
  compose: [
    {
      id: 'd06-g3-c1',
      zhHint: '是中国人吗？',
      audioKo: '중국 사람이에요?',
      answer: ['중국', '사람이에요?'],
      tokens: ['중국', '사람이에요?', '사람예요?', '사람이예요?', '한국', '입니까?'],
      explain: '사람 有收音 → 이에요?。「사람예요/사람이예요」都是常见错拼',
    },
    {
      id: 'd06-g3-c2',
      zhHint: '我喜欢 KPOP。',
      audioKo: '저는 KPOP을 좋아해요.',
      answer: ['저는', 'KPOP을', '좋아해요.'],
      tokens: ['저는', 'KPOP을', '좋아해요.', 'KPOP이', '좋아요.', 'KPOP를'],
      explain: '좋아하다（动词） 前用宾格。「KPOP이 좋아요」也对但意思不同（KPOP 让人喜欢），Day 6 主考 좋아하다',
    },
    {
      id: 'd06-g3-c3',
      zhHint: '你好，我是新生兔莉，请多关照。',
      audioKo: '안녕하세요, 신입생 토리예요. 잘 부탁드려요.',
      answer: ['안녕하세요,', '신입생', '토리예요.', '잘', '부탁드려요.'],
      tokens: ['안녕하세요,', '신입생', '토리예요.', '잘', '부탁드려요.', '반장', '토리이에요.'],
      explain: '自我介绍套路：招呼 + 身份/名字+예요/이에요 + 잘 부탁드려요。토리 无收音 → 예요',
    },
    {
      id: 'd06-g3-c4',
      zhHint: '这是我喜欢的组合。',
      audioKo: '제가 좋아하는 그룹이에요.',
      answer: ['제가', '좋아하는', '그룹이에요.'],
      tokens: ['제가', '좋아하는', '그룹이에요.', '저는', '좋아요', '그룹예요.'],
      explain: '좋아하다 + 는 = "喜欢的"（定语形）。「제가 좋아하는 그룹」直译：我喜欢的组合。这种"XX 하는 YY"的定语句以后会天天见',
    },
  ],

  // ─── 规则理解选择 ───
  rule: [
    {
      id: 'd06-g3-r1',
      promptZh: '想问"是学生吗？"，哪句正确？',
      choices: [
        { text: '학생예요?', correct: false },
        { text: '학생이에요?', correct: true },
        { text: '학생이예요?', correct: false },
        { text: '학생이 뭐예요?', correct: false },
      ],
      explain: '陈述 → 疑问只需句尾升调 + ?。학생 有收音 → 이에요?。词形不变',
    },
    {
      id: 'd06-g3-r2',
      promptZh: '关于「좋아해요」和「좋아요」的区别，哪句是对的？',
      choices: [
        { text: '完全一样，随便用。', correct: false },
        { text: '좋아해요 是动词（喜欢），前面用 을/를。좋아요 是形容词（好/喜欢），前面用 이/가。', correct: true },
        { text: '좋아해요 只对朋友用，좋아요 只对长辈用。', correct: false },
        { text: '좋아해요 是过去时，좋아요 是现在时。', correct: false },
      ],
      explain: '中文的"喜欢"在韩语里两个词：동사 좋아하다 + 을/를 vs 형용사 좋다 + 이/가。中国学生高频翻车点',
    },
    {
      id: 'd06-g3-r3',
      promptZh: '"喜欢什么？"哪句正确？',
      choices: [
        { text: '뭐는 좋아해요?', correct: false },
        { text: '뭐가 좋아해요?', correct: false },
        { text: '뭐를 좋아해요?', correct: true },
        { text: '뭐이 좋아해요?', correct: false },
      ],
      explain: '좋아하다 + 을/를。뭐 无收音 → 를。疑问词后**必用**主格/宾格，不能用 은/는',
    },
    {
      id: 'd06-g3-r4',
      promptZh: '想用最正式的합쇼체问长辈"是韩国人吗？"，应该？',
      choices: [
        { text: '한국 사람이야?', correct: false },
        { text: '한국 사람이에요?', correct: false },
        { text: '한국 사람입니까?', correct: true },
        { text: '한국 사람예요?', correct: false },
      ],
      explain: '합쇼체用 입니까? 是最正式的疑问形（新闻/军队/面试）。해요体「이에요?」对长辈也够礼貌，日常足够用。반말 이야?/야? 只对朋友',
    },
  ],
};
