import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 14 · 1-3 문법 탐험 · 语法关 · Chapter 2 收官
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：形容词定语形（修饰名词）+ 副词形（修饰动词）
 * 教学梯度：
 *   fix 挑高频错——차갑은/따뜻하게/짜게 vs 달게
 *   → compose 从单杯到复杂点单
 *   → rule 抽象规则：定语 vs 副词 / ㅂ不规则 / 量词固有数
 */
export const day14Grammar: GrammarSubQuestData = {
  day: 14, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '形容词定语形 / 副词形 · 咖啡厅生存韩语', subtitleEn: 'Adjective attributive form / adverb form · Survival Korean for cafes',

  // ─── 助词/形态改错 ───
  fix: [
    {
      id: 'd14-g3-f1',
      promptKo: '차갑은 아메리카노 주세요.',
      promptZh: '"请给我冰美式"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "Please give me an iced Americano"?',
      choices: [
        { text: '차갑은 아메리카노 주세요.', correct: false },
        { text: '차가운 아메리카노 주세요.', correct: true },
        { text: '차가워 아메리카노 주세요.', correct: false },
        { text: '차갑 아메리카노 주세요.', correct: false },
      ],
      explain: '차갑다 是 ㅂ 不规则——ㅂ 遇 (으)ㄴ 变 우 → 차가운。不是 차갑은 ❌', explainEn: '차갑다 is a ㅂ irregular—ㅂ before (으)ㄴ becomes 우 → 차가운. Not 차갑은 ❌',
    },
    {
      id: 'd14-g3-f2',
      promptKo: '달다 해 주세요.',
      promptZh: '"请做成甜的"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "Please make it sweet"?',
      choices: [
        { text: '달다 해 주세요.', correct: false },
        { text: '달게 해 주세요.', correct: true },
        { text: '단 해 주세요.', correct: false },
        { text: '달아 주세요.', correct: false },
      ],
      explain: '形容词修饰动词 → 副词形 게。달다 + 게 = 달게(甜地) + 해 주세요。「~게 해 주세요」= 请做成~', explainEn: 'Adjectives modifying verbs → adverb form 게. 달다 + 게 = 달게 (sweetly) + 해 주세요. 「~게 해 주세요」= Please make it ~',
    },
    {
      id: 'd14-g3-f3',
      promptKo: '따뜻한 라떼 이 잔 주세요.',
      promptZh: '"请给我两杯热拿铁"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "Please give me two hot lattes"?',
      choices: [
        { text: '따뜻한 라떼 이 잔 주세요.', correct: false },
        { text: '따뜻한 라떼 두 잔 주세요.', correct: true },
        { text: '따뜻한 라떼 둘 잔 주세요.', correct: false },
        { text: '따뜻한 라떼 두 개 주세요.', correct: false },
      ],
      explain: '固有数 둘(2) → 두（搭量词变形）。咖啡装杯用 잔，不用 개。价格用汉字数、数东西用固有数', explainEn: 'Native number 둘(2) → 두 (form change with counters). Coffee is counted with 잔, not 개. Use Sino-Korean numbers for prices, native numbers for counting things',
    },
    {
      id: 'd14-g3-f4',
      promptKo: '따뜻한 아이스 라떼요.',
      promptZh: '"热的冰拿铁"哪里错？', promptZhEn: 'What\'s wrong with "hot iced latte"?',
      choices: [
        { text: '语法完全正确', textEn: 'The grammar is completely correct', correct: false },
        { text: '「따뜻한」(热) 和 「아이스」(冰) 语义矛盾——温度只能选一个', textEn: '「따뜻한」(hot) and 「아이스」(iced) are contradictory—you can only pick one temperature', correct: true },
        { text: '「라떼」拼写错误', textEn: '「라떼」is misspelled', correct: false },
        { text: '「요」不该有', textEn: '「요」shouldn\'t be there', correct: false },
      ],
      explain: 'Day 14 兔莉犯的错——따뜻한 vs 아이스 是反义词，不能同时用。要么 따뜻한 라떼 要么 아이스 라떼', explainEn: 'Day 14 Tori\'s mistake—따뜻한 vs 아이스 are opposites, can\'t be used together. Either 따뜻한 라떼 or 아이스 라떼',
    },
    {
      id: 'd14-g3-f5',
      promptKo: '맛있게 드세요.',
      promptZh: '关于「맛있게 드세요」的形态，哪句正确？', promptZhEn: 'Regarding the form of 「맛있게 드세요」, which is correct?',
      choices: [
        { text: '맛있게 드세요.（副词形게+敬语드세요）', textEn: '맛있게 드세요. (adverb form 게 + honorific 드세요)', correct: true },
        { text: '맛있은 드세요.（用了定语形·错）', textEn: '맛있은 드세요. (used attributive form·wrong)', correct: false },
        { text: '맛있어 드세요.（用了해요体连接·错）', textEn: '맛있어 드세요. (used 해요-style connection·wrong)', correct: false },
        { text: '맛있다 드세요.（用了基本形·错）', textEn: '맛있다 드세요. (used base form·wrong)', correct: false },
      ],
      explain: '맛있다 修饰动词 드시다 → 副词形 게 → 맛있게 드세요（请慢用）。递餐固定结束语', explainEn: '맛있다 modifies the verb 드시다 → adverb form 게 → 맛있게 드세요 (enjoy your meal). Standard phrase when serving food',
    },
  ],

  // ─── 组句 ───
  compose: [
    {
      id: 'd14-g3-c1',
      zhHint: '请给我一杯热拿铁。', zhHintEn: 'Please give me a hot latte.',
      audioKo: '따뜻한 라떼 한 잔 주세요.',
      answer: ['따뜻한', '라떼', '한', '잔', '주세요.'],
      tokens: ['따뜻한', '라떼', '한', '잔', '주세요.', '차가운', '이', '개'],
      explain: '따뜻한(定语·热的) + 라떼 + 한 잔(1杯) + 주세요。咖啡馆万能点单公式', explainEn: '따뜻한 (attributive·hot) + 라떼 + 한 잔 (1 cup) + 주세요. The all-purpose café ordering formula',
    },
    {
      id: 'd14-g3-c2',
      zhHint: '请做成甜的。（糖度定制）', zhHintEn: 'Please make it sweet. (sweetness customization)',
      audioKo: '달게 해 주세요.',
      answer: ['달게', '해', '주세요.'],
      tokens: ['달게', '해', '주세요.', '달다', '단', '짜게', '한'],
      explain: '달게(副词形·甜地) + 해 주세요(请做)。「형용사 + 게 + 해 주세요」= 请做成~的', explainEn: '달게 (adverb form·sweetly) + 해 주세요 (please do). 「adjective + 게 + 해 주세요」= Please make it ~',
    },
    {
      id: 'd14-g3-c3',
      zhHint: '在这里吃。（堂食）', zhHintEn: 'Eat here. (dine-in)',
      audioKo: '여기서 먹을게요.',
      answer: ['여기서', '먹을게요.'],
      tokens: ['여기서', '먹을게요.', '포장이에요.', '가져갈게요.', '주세요.', '없어요.'],
      explain: '여기서(在这儿) + 먹을게요(要吃·意愿形)。回答"堂食还是外带"最自然', explainEn: '여기서 (here) + 먹을게요 (will eat·intention form). Most natural answer to "dine-in or takeout"',
    },
    {
      id: 'd14-g3-c4',
      zhHint: '啊，不是！热拿铁！（纠正口误）', zhHintEn: 'Oh, no! A hot latte! (correcting a slip-up)',
      audioKo: '아, 아니요! 따뜻한 라떼요!',
      answer: ['아,', '아니요!', '따뜻한', '라떼요!'],
      tokens: ['아,', '아니요!', '따뜻한', '라떼요!', '차가운', '네,', '맞아요.', '아이스'],
      explain: '아, 아니요! = 惊呼纠正开头。Tori 今天用了三次——点错颜色/温度/糖度都靠这句救场', explainEn: '아, 아니요! = exclamation to start a correction. Tori used it three times today—saved the day for wrong color/temperature/sweetness orders',
    },
  ],

  // ─── 规则理解 ───
  rule: [
    {
      id: 'd14-g3-r1',
      promptZh: '关于形容词定语形和副词形，哪句描述最准确？', promptZhEn: 'Which description of adjective attributive and adverb forms is most accurate?',
      choices: [
        { text: '定语形 (은/ㄴ)修饰名词（따뜻한 라떼）；副词形 (게)修饰动词（달게 해요）', textEn: 'Attributive form (은/ㄴ) modifies nouns (따뜻한 라떼); adverb form (게) modifies verbs (달게 해요)', correct: true },
        { text: '两者一样，可以互换', textEn: 'They\'re the same, interchangeable', correct: false },
        { text: '定语形用于口语，副词形用于书面', textEn: 'Attributive form is for speech, adverb form for writing', correct: false },
        { text: '定语形是动词，副词形是名词', textEn: 'The attributive form is a verb, the adverbial form is a noun', correct: false },
      ],
      explain: '定语形 = 修饰名词：따뜻한 라떼(热拿铁)。副词形 = 修饰动词：달게 해요(做成甜的)。两者不可混用', explainEn: 'Attributive form = modifies nouns: 따뜻한 라떼 (hot latte). Adverbial form = modifies verbs: 달게 해요 (make it sweet). They can\'t be mixed.',
    },
    {
      id: 'd14-g3-r2',
      promptZh: '关于 ㅂ 不规则形容词（차갑다/뜨겁다/맵다），哪句描述最准确？', promptZhEn: 'Which statement best describes ㅂ irregular adjectives (차갑다/뜨겁다/맵다)?',
      choices: [
        { text: '定语形要变形：ㅂ → 우 + ㄴ。차갑 → 차가운，뜨겁 → 뜨거운，맵 → 매운', textEn: 'The attributive form changes: ㅂ → 우 + ㄴ. 차갑 → 차가운, 뜨겁 → 뜨거운, 맵 → 매운', correct: true },
        { text: '不需要变形，直接加 은：차갑은/뜨겁은/맵은', textEn: 'No change needed, just add 은: 차갑은/뜨겁은/맵은', correct: false },
        { text: '要变成 ㅍ：차팦다/뜨펖다', textEn: 'Change to ㅍ: 차팦다/뜨펖다', correct: false },
        { text: '要去掉 ㅂ：차가다/뜨거다', textEn: 'Drop the ㅂ: 차가다/뜨거다', correct: false },
      ],
      explain: 'ㅂ 不规则是韩语高频规则——所有 ㅂ 结尾形容词按此变。区别于规则形（작다 → 작은·ㅂ 结尾除外）', explainEn: 'ㅂ irregular is a high-frequency Korean rule—all adjectives ending in ㅂ follow this. It differs from regular forms (작다 → 작은, except for ㅂ endings).',
    },
    {
      id: 'd14-g3-r3',
      promptZh: '"한 잔" — 关于 「한」，哪句描述最准确？', promptZhEn: '"한 잔" — Which statement best describes \'한\'?',
      choices: [
        { text: '固有数 하나(1) 搭量词时变 한。搭 잔(杯)/개(个)/명(人)都用这个变形', textEn: 'The native number 하나 (1) becomes 한 with counters. It\'s used with 잔 (cup)/개 (item)/명 (person).', correct: true },
        { text: '「한」是汉字数"一"', textEn: '\'한\' is the Sino-Korean number \'one\'', correct: false },
        { text: '「한」意思是"一个人"', textEn: '\'한\' means \'one person\'', correct: false },
        { text: '「한」只用于时间"一小时"', textEn: '\'한\' is only used for time \'one hour\'', correct: false },
      ],
      explain: '固有数 1-4 搭量词都变形：하나→한、둘→두、셋→세、넷→네。5 以上不变（다섯 잔 = 5 杯）', explainEn: 'Native numbers 1-4 change with counters: 하나→한, 둘→두, 셋→세, 넷→네. 5 and above don\'t change (다섯 잔 = 5 cups).',
    },
    {
      id: 'd14-g3-r4',
      promptZh: '关于「달다」vs「짜다」，哪句描述最准确？', promptZhEn: 'Which statement best describes \'달다\' vs \'짜다\'?',
      choices: [
        { text: '달다 = 甜（副词形 달게）；짜다 = 咸（副词形 짜게）。发音、含义都不同——绝对不要说错！', textEn: '달다 = sweet (adverbial form 달게); 짜다 = salty (adverbial form 짜게). They sound and mean different—never mix them up!', correct: true },
        { text: '两者一样，都是"味道"的意思', textEn: 'They\'re the same, both mean \'taste\'', correct: false },
        { text: '달다 = 咸，짜다 = 甜', textEn: '달다 = salty, 짜다 = sweet', correct: false },
        { text: '달다只用于饮料，짜다只用于饭菜', textEn: '달다 is only for drinks, 짜다 is only for food', correct: false },
      ],
      explain: 'Tori 今天说反了 — 「설탕 짜게」= 咸的糖。绝对不要犯：달게(甜)/짜게(咸)/맵게(辣)/시게(酸)/쓰게(苦)', explainEn: 'Tori got it backwards today—\'설탕 짜게\' = salty sugar. Never make this mistake: 달게 (sweet)/짜게 (salty)/맵게 (spicy)/시게 (sour)/쓰게 (bitter).',
    },
  ],
};
