import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 12 · 1-3 문법 탐험 · 语法关
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：汉字数词 + 价格表达
 * 教学梯度：
 *   fix 挑高频错——일만/십이천/固有汉字混用
 *   → compose 从简单价格到复杂拆分
 *   → rule 抽象规则：两套数字系统 / 万位拆分 / 얼마 vs 몇
 */
export const day12Grammar: GrammarSubQuestData = {
  day: 12, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '汉字数词 · 价格拆分不打结',

  // ─── 助词/形态改错 ───
  fix: [
    {
      id: 'd12-g3-f1',
      promptKo: '일만 원이에요.',
      promptZh: '"10000 元"最标准的说法？',
      choices: [
        { text: '일만 원이에요.', correct: false },
        { text: '만 원이에요.', correct: true },
        { text: '십천 원이에요.', correct: false },
        { text: '만원원이에요.', correct: false },
      ],
      explain: '韩语百/千/万前**不加 일**。100 = 백，1000 = 천，10000 = 만——直接说，不用 「일만」',
    },
    {
      id: 'd12-g3-f2',
      promptKo: '십이천 원이에요.',
      promptZh: '"12000 元"最标准的说法？',
      choices: [
        { text: '십이천 원이에요.', correct: false },
        { text: '만 이천원이에요.', correct: true },
        { text: '일만 이천원이에요.', correct: false },
        { text: '만이천원이에요.', correct: false },
      ],
      explain: '韩语以「万」为基准拆分：12000 = 万(1) + 2000 = 만 이천（不是 十二千）',
    },
    {
      id: 'd12-g3-f3',
      promptKo: '이거 이만 원이에요.',
      promptZh: '"这个是 20000 元"最标准的说法？',
      choices: [
        { text: '이거 이만 원이에요.', correct: true },
        { text: '이거 두만 원이에요.', correct: false },
        { text: '이거 이만 개 원이에요.', correct: false },
        { text: '이거 스만 원이에요.', correct: false },
      ],
      explain: '20000 = 이(2·汉字数) + 만 = 이만。价格用汉字数不用固有数（두 = 固有数变形，只用于量词）',
    },
    {
      id: 'd12-g3-f4',
      promptKo: '얼마 볼펜 있어요?',
      promptZh: '"有多少支圆珠笔？"最标准的说法？',
      choices: [
        { text: '얼마 볼펜 있어요?', correct: false },
        { text: '볼펜 몇 자루 있어요?', correct: true },
        { text: '볼펜 얼마 있어요?', correct: false },
        { text: '몇 볼펜 있어요?', correct: false },
      ],
      explain: '얼마 = 多少钱（用于价格）；몇 = 几个/多少（用于数量·后必跟量词）。问数量必用 몇 + 量词',
    },
    {
      id: 'd12-g3-f5',
      promptKo: '노트 두 자루 주세요.',
      promptZh: '"请给我两本本子"最标准的说法？',
      choices: [
        { text: '노트 두 자루 주세요.', correct: false },
        { text: '노트 두 권 주세요.', correct: true },
        { text: '노트 이 권 주세요.', correct: false },
        { text: '노트 둘 권 주세요.', correct: false },
      ],
      explain: '本子的量词是 「권」，笔的量词是 「자루」。固有数 둘 → 두（搭量词变形）。汉字数 이 不用于数量',
    },
  ],

  // ─── 组句 ───
  compose: [
    {
      id: 'd12-g3-c1',
      zhHint: '这个多少钱？',
      audioKo: '이거 얼마예요?',
      answer: ['이거', '얼마예요?'],
      tokens: ['이거', '얼마예요?', '있어요?', '뭐예요?', '몇 개예요?', '저거'],
      explain: '이거(这个) + 얼마예요?（多少钱？）。购物万能问价句',
    },
    {
      id: 'd12-g3-c2',
      zhHint: '那个是 12000 元。（店员报价）',
      audioKo: '그거 만 이천원이에요.',
      answer: ['그거', '만', '이천원이에요.'],
      tokens: ['그거', '만', '이천원이에요.', '이거', '십이천원이에요.', '일만'],
      explain: '店员视角：客人指的东西 → 그거。价格 만 이천（不加 일，以万为基准拆分）',
    },
    {
      id: 'd12-g3-c3',
      zhHint: '请给我两本本子。',
      audioKo: '노트 두 권 주세요.',
      answer: ['노트', '두', '권', '주세요.'],
      tokens: ['노트', '두', '권', '주세요.', '이', '자루', '개'],
      explain: '노트(本子) + 固有数 두(2) + 권(本量词) + 주세요',
    },
    {
      id: 'd12-g3-c4',
      zhHint: '真的太贵了！（对朋友的반말感叹）',
      audioKo: '진짜 너무 비싸다!',
      answer: ['진짜', '너무', '비싸다!'],
      tokens: ['진짜', '너무', '비싸다!', '비싸요!', '싸다!', '괜찮아!'],
      explain: '진짜(真的) + 너무(太) + 비싸다(贵·반말·감탄)。「~다!」是반말감탄形，比 「비싸!」更强',
    },
  ],

  // ─── 规则理解 ───
  rule: [
    {
      id: 'd12-g3-r1',
      promptZh: '韩语有两套数字系统，哪句描述最准确？',
      choices: [
        { text: '汉字数 (일이삼) → 价格/号码/年月日；固有数 (하나둘셋) → 数东西/年龄/小时', correct: true },
        { text: '汉字数用于书面，固有数用于口语', correct: false },
        { text: '两套数字随便用，都是一样的', correct: false },
        { text: '汉字数只到 10，固有数可以到 100', correct: false },
      ],
      explain: '两套并用是韩语数字的核心难点。价格必用汉字数(오백원)，数东西必用固有数(사과 다섯 개)——不可混用',
    },
    {
      id: 'd12-g3-r2',
      promptZh: '关于 「일만」和「만」，哪个描述最准确？',
      choices: [
        { text: '韩语百/千/万前**不加 일**——10000 = 만，不是 일만', correct: true },
        { text: '「일만」是正式说法，「만」是口语', correct: false },
        { text: '「일만」= 一万一，「만」= 一万', correct: false },
        { text: '「일만」是错的，只能用 「하나만」', correct: false },
      ],
      explain: '100 = 백(不是 일백)、1000 = 천(不是 일천)、10000 = 만(不是 일만)。但 11000 = 만 천（万后还有千位，천 前依然不加 일）',
    },
    {
      id: 'd12-g3-r3',
      promptZh: '关于「얼마」和「몇」，哪个描述最准确？',
      choices: [
        { text: '「얼마」用于问价格；「몇」用于问数量（后跟量词）', correct: true },
        { text: '「얼마」用于书面，「몇」用于口语', correct: false },
        { text: '两者可以互换', correct: false },
        { text: '「얼마」只用于食物，「몇」只用于人', correct: false },
      ],
      explain: '얼마예요? = 多少钱？（价格）。몇 개 있어요? = 有几个？（数量·后必跟量词）',
    },
    {
      id: 'd12-g3-r4',
      promptZh: '12000 用韩语最标准的读法？',
      choices: [
        { text: '만 이천（万 二千·以万为基准拆分）', correct: true },
        { text: '십이천（十二千·中文式拆分）', correct: false },
        { text: '일만 이천（一万二千·加 일 是错的）', correct: false },
        { text: '만 십이（万 十二·顺序错）', correct: false },
      ],
      explain: '韩语以万为基准拆分——12000 = 만(10000) + 이천(2000) = 만 이천。这也是韩国人心算价格的方式',
    },
  ],
};
