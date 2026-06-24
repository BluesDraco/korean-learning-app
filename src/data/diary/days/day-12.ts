import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 12 · 街边文具店 · Minji 教韩币
 *
 * 剧情：Minji 带 Tori 去文具店，教她韩语里"千和万是分开发音的"。
 * Tori 练 만 원 练到舌头打结。Minji 对这家店很熟，和老板打了个招呼。
 *
 * 学习目标：韩语数字 100/1000/10000 / 价格句型 / 얼마예요
 * 语料层级：해요体
 * 韩语自审：korean skill PASS（자연성/문법/발음 三关）
 */
export const day12: ToriDay = {
  level: 'beginner',
  day: 12,
  phase: 'foundation',
  title: '街边文具店 · 万元的故事',
  subtitle: 'Minji 教我「만 원」差点把舌头打结',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9月 12日 周四 下午',
    weather: '兽尔 · 多云转晴',
    toriPose: 'happy',
    diaryText: `9月 12日，周四下午没课。

Minji 拉我去学校对面的문구점（文具店）。
她说："토리야, 너 한국 돈 봤어?"
（兔莉，你看过韩币吗？）

我摇头。她从钱包里抽出一张 만 원 纸币：
"이거, 만 원. '만'은 10000이야."
（这张，만 원。'만' 就是一万。）

"천 원은 천 원. 1000."
"Korean money has two levels: 천 and 만."

我试着念：만 원… 만 원… 만 원…
然后——
"돼、万、圆——"
舌头打结了。

Minji 笑到肚子疼："발음 진짜 귀엽다!"
（你的发音真的太可爱了！）

她对着店里的文具老板打了个招呼，显然常来这家店。
然后她指着架上一支笔："이거 얼마예요?"

店员说："그거 만 이천원이에요."
（那个 12000 元。）

一万……两千……
我掰着手指算了好几遍，终于小声说出来：
"만…이천…원이에요?"

店员笑着点头："네, 맞아요."

我做到了。`,
  },

  words: [
    {
      id: 'd12-w1',
      korean: '돈',
      hangul: 'don',
      zh: '钱',
      pos: '名词',
      example: { ko: '돈이 없어요.', zh: '没有钱。' },
      tip: '韩国人买单常说「돈 내요」(我出钱)。돈 있다(有钱) / 돈 없다(没钱)',
    },
    {
      id: 'd12-w2',
      korean: '백',
      hangul: 'baek',
      zh: '百 / 100',
      pos: '名词',
      example: { ko: '백 원이에요.', zh: '100 元。' },
      tip: '汉字数：일(1) 이(2)… 십(10) 백(100) 천(1000) 만(10000)',
    },
    {
      id: 'd12-w3',
      korean: '천',
      hangul: 'cheon',
      zh: '千 / 1000',
      pos: '名词',
      example: { ko: '천 원이에요.', zh: '1000 元。' },
      tip: '천 원 ≈ 5 元人民币。다이소 所有东西 천 원起',
    },
    {
      id: 'd12-w4',
      korean: '만',
      hangul: 'man',
      zh: '万 / 10000',
      pos: '名词',
      example: { ko: '만 원이에요.', zh: '10000 元（约 50 元人民币）。' },
      tip: '韩国的"万"和"千"是分开发音的，不像中文。"만 원" = 10000원',
    },
    {
      id: 'd12-w5',
      korean: '얼마예요',
      hangul: 'eol-ma-ye-yo',
      zh: '多少钱',
      pos: '表达',
      example: { ko: '이거 얼마예요?', zh: '这个多少钱？' },
      tip: '얼마(多少) + 예요。购物问价第一句',
    },
    {
      id: 'd12-w6',
      korean: '원',
      hangul: 'won',
      zh: '韩元（单位）',
      pos: '名词',
      example: { ko: '5,000원이에요.', zh: '5000 韩元。' },
      tip: '￦ 或 원。韩币最小纸币是 천 원 (₩1,000)',
    },
  ],

  dialogue: {
    scene: '文具店收银台',
    setting: {
      time: '下午没课后',
      place: '学校对面文具店',
      npc: '店员 + Minji',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '저기요, 이거 얼마예요?',
        hangul: 'jeo-gi-yo, i-geo eol-ma-ye-yo',
        zh: '不好意思，这个多少钱？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '店员',
        ko: '그거 만 이천원이에요.',
        hangul: 'geu-geo man i-cheon-won-i-e-yo',
        zh: '那个是 12000 元。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '만…이천…원이에요?',
        hangul: 'man… i-cheon… won-i-e-yo',
        zh: '一万……两千……元吗？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '맞아, 잘했어!',
        hangul: 'ma-ja, jal-hae-sseo!',
        zh: '对，做得好！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '만 원… 만 원… 만 원… 혀 꼬임!',
        hangul: 'man won… man won… man won… hyeo kko-im!',
        zh: '만 원……만 원……만 원……舌头打结！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '店员把笔装进袋子，Tori 付完一万二——应该说什么？',
        practice: 'pick',
        choices: [
          { ko: '감사합니다. 좋은 하루 보내세요.', zh: '谢谢。祝您愉快。（礼貌收尾）', correct: true },
          { ko: '만 원만 받으세요.', zh: '只收一万吧。（砍价？在韩语语境不对）', correct: false },
          { ko: '너무 비싸요.', zh: '太贵了。（刚付完钱说这个不礼貌）', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '汉字数 · 报价格用',
    pattern: '일(1) 이(2) 삼(3) 사(4) 오(5) 육(6) 칠(7) 팔(8) 구(9) 십(10)',
    whenToUse: '报价格、号码、年月日 — 都用汉字数。和固有数分开记。',
    rules: [
      '**百 = 백**、**千 = 천**、**万 = 만**：韩语里每个数位都有独立名称，不像中文一万一万地数',
      '中间不加"일"：12000 = **만 이천**(万二千)，不是"일만 이천"(一万二千)',
      '单位放在数字后：500**원**、3**천**원、12**만**원',
    ],
    examples: [
      { ko: '500원이에요.', zh: '500 元。', highlight: '500원', note: '**오백원** = 五百元。오(5) + 백(100) + 원(元)' },
      { ko: '3,000원이에요.', zh: '3000 元。', highlight: '3,000원', note: '**삼천원** = 三千元。삼(3) + 천(1000) + 원(元)' },
      { ko: '12,000원이에요.', zh: '12000 元。', highlight: '12,000원', note: '**만 이천원** = 万二千元。不需要加일，만直接跟이천' },
      { ko: '50,000원이에요.', zh: '50000 元（约 250 RMB）。', highlight: '50,000원', note: '**오만원** = 五万元。오(5) + 만(10000) + 원(元)' },
    ],
    pitfall:
      '12000 是 "만 이천원"，不是 "십이천원"。韩语里从万开始拆分：만(万) + 이천(二千)。不套用中文的"一万二千"逻辑。',
  },

  output: [
    {
      id: 'd12-o1',
      kind: 'compose',
      zhHint: '这个多少钱？（购物问价）',
      tokens: ['이거', '얼마예요', '?', '저거', '몇원이에요', '주세요'],
      composeAnswer: ['이거', '얼마예요', '?'],
      successMsg: '店员抬头看了一眼你说的话——她听懂了 ✓',
    },
    {
      id: 'd12-o2',
      kind: 'listen-choice',
      audioKo: '만 이천원이에요.',
      successMsg: '✓ 「12000 元」。「만」(万) + 「이천」(二千) = 一万二千。',
      choices: [
        { zh: '12000 元。', correct: true },
        { zh: '1200 元。', correct: false },
        { zh: '21000 元。', correct: false },
        { zh: '1000 元。', correct: false },
      ],
    },
    {
      id: 'd12-o3',
      kind: 'zh-to-ko',
      zhPrompt: '那个是 12000 元。',
      successMsg: '"만 이천원" = 万二千元。不加"일"，만直接跟이천。',
      choices: [
        { ko: '그거 만 이천원이에요.', correct: true },
        { ko: '그거 일만 이천원이에요.', correct: false },
        { ko: '그거 십이천원이에요.', correct: false },
        { ko: '그거 백 이천원이에요.', correct: false },
      ],
    },
    {
      id: 'd12-o4',
      kind: 'particle-error',
      zhHint: '5000 元。',
      successMsg: '「오천」(五天)。汉字数 5+1000。원 前不加额外助词。',
      choices: [
        { ko: '오천원이에요.', correct: true },
        { ko: '오천만원이에요.', correct: false },
        { ko: '다서천원이에요.', correct: false },
        { ko: '오천원을이에요.', correct: false },
      ],
    },
    {
      id: 'd12-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 12 核心词全部对上。만 원 终于念顺了。',
      pairs: [
        { ko: '돈', zh: '钱' },
        { ko: '백', zh: '百' },
        { ko: '천', zh: '千' },
        { ko: '만', zh: '万' },
        { ko: '얼마예요', zh: '多少钱' },
      ],
    },
  ],

  recap: {
    toriPose: 'cheer',
    praise: '만 원 的发音拿下了！Tori 今天交了学费——不是钱，是练到舌头打结。',
    preview: '明天，一个人去 Haru 推荐的粉色咖啡馆。从打招呼到道谢，全靠自己。',
    stickerId: 'sticker-d12',
  },

  carrotHint:
    '今天的胡萝卜：「韩语数字两套怎么记」「만 원和오만원的区别」「얼마예요怎么用」',
};
