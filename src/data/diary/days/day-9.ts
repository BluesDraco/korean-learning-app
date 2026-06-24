import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 9 · 街边文具店 · Minji 教韩币
 *
 * 剧情：下午没课，Minji 带兔莉去学校对面的小文具店买笔。
 * Minji 教她"在韩国千和万是分开发音"：천 / 만。
 * 兔莉为了练"만 원"差点把舌头打结，Minji 笑到肚子疼。
 * 最后兔莉自己说出"만 이천 원이에요?"，店员姐姐温柔地点头。
 *
 * 学习目标：韩语数字 100/1000/10000 / 价格句型 / 얼마예요
 * 韩语自审：korean skill PASS
 */
export const day9: ToriDay = {
  level: 'beginner',
  day: 9,
  phase: 'foundation',
  title: '街边文具店 · 万元的故事',
  subtitle: 'Minji 教我「만 원」差点把舌头打结',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9月 10일 오후',
    weather: '首尔 · 多云转晴',
    toriPose: 'happy',
    diaryText: `9月 10日，周二下午没课。

Minji 拉我去学校对面的문구점（文具店）。
她说："토리야, 너 한국 돈 봤어?"
（兔莉，你看过韩币吗？）

我摇头。

她从钱包里抽出一张五彩缤纷的纸：
"이거 만 원이야. 너 알아? 한국에서는 천(千)이랑 만(万) 따로 말해."
（这是一万元。你知道吗？韩国千和万是分开说的。）

我："만 원? 만……워어어……원?"
她笑到弯腰：
"천천히, 만·원."

我又试了一次："만 원!"
她突然鼓掌。

最后结账时我用了人生最大勇气，
看着店员姐姐说出："이게 만 이천 원이에요?"
（这个是 12000 元吗？）

她温柔地点头："네, 맞아요."

我和 Minji 走出店门时，
我手里多了一只胡萝卜形状的圆珠笔。
她说："오늘 첫 한국 돈 쓴 거 축하해."
（今天第一次花韩币，恭喜你。）`,
  },

  words: [
    {
      id: 'd09-w1',
      korean: '돈',
      hangul: 'don',
      zh: '钱',
      pos: '名词',
      example: { ko: '돈이 없어요.', zh: '没有钱。' },
      tip: '받침 ㄴ → 用「이/는」: 돈이 / 돈은',
    },
    {
      id: 'd09-w2',
      korean: '백',
      hangul: 'baek',
      zh: '百 / 100',
      pos: '名词',
      example: { ko: '백 원이에요.', zh: '100 元。' },
      tip: '汉字数。1=일, 10=십, 100=백, 1000=천, 10000=만',
    },
    {
      id: 'd09-w3',
      korean: '천',
      hangul: 'cheon',
      zh: '千 / 1000',
      pos: '名词',
      example: { ko: '천 원이에요.', zh: '1000 元。' },
      tip: '注意发音是 cheon，不是 chen',
    },
    {
      id: 'd09-w4',
      korean: '만',
      hangul: 'man',
      zh: '万 / 10000',
      pos: '名词',
      example: { ko: '만 원이에요.', zh: '10000 元（约 50 元人民币）。' },
      tip: '韩币最常见面值。一万韩元 ≈ 50 RMB',
    },
    {
      id: 'd09-w5',
      korean: '얼마예요',
      hangul: 'eol-ma-ye-yo',
      zh: '多少钱',
      pos: '表达',
      example: { ko: '이거 얼마예요?', zh: '这个多少钱？' },
      tip: '얼마 + 예요. 얼마 无받침 → 예요',
    },
    {
      id: 'd09-w6',
      korean: '원',
      hangul: 'won',
      zh: '韩元（单位）',
      pos: '名词',
      example: { ko: '5,000원이에요.', zh: '5000 韩元。' },
      tip: '받침 ㄴ → 5000원이에요 / 만원은',
    },
  ],

  dialogue: {
    scene: '文具店收银台',
    setting: {
      time: '下午 3 点',
      place: '街边小店',
      npc: '店员姐姐 + Minji',
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
        ko: '그거 만 이천 원이에요.',
        hangul: 'geu-geo man i-cheon won-i-e-yo',
        zh: '那个是 12000 元。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '만…이천…원이에요?',
        hangul: 'man i-cheon won-i-e-yo',
        zh: '一万…两千…元吗？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '맞아, 잘했어!',
        hangul: 'ma-ja, jal-hae-sseo',
        zh: '对，做得好！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '兔莉付完钱，应该对店员说什么？',
        practice: 'pick',
        choices: [
          { ko: '감사합니다.', zh: '谢谢。', correct: true },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
          { ko: '죄송합니다.', zh: '对不起。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '汉字数 · 报价格用',
    pattern: '일(1) 이(2) 삼(3) 사(4) 오(5) 육(6) 칠(7) 팔(8) 구(9) 십(10)',
    whenToUse: '价格、号码、日期、楼层。涉及具体数字的报数全用汉字数。',
    rules: [
      '百 = **백**, 千 = **천**, 万 = **만**',
      '组合：100 = 백 · 200 = 이백 · 1000 = 천 · 12000 = 만 이천',
      '价格 + 「원이에요」(원 받침 ㄴ → 이에요)',
    ],
    examples: [
      { ko: '500원이에요.', zh: '500 元。' },
      { ko: '3,000원이에요.', zh: '3000 元。' },
      { ko: '12,000원이에요.', zh: '12000 元。', highlight: '만 이천' },
      { ko: '50,000원이에요.', zh: '50000 元（约 250 RMB）。', highlight: '오만' },
    ],
    pitfall:
      '韩国报价不读「일만」，直接说「만」。和中文「一万」要省略「一」是相反习惯。「만 원」= 一万元，不要画蛇添足说「일만 원」。',
  },

  output: [
    {
      id: 'd09-o1',
      kind: 'compose',
      zhHint: '这个多少钱？',
      tokens: ['이거', '얼마예요', '?', '얼마이에요', '저거', '원이에요'],
      composeAnswer: ['이거', '얼마예요', '?'],
      successMsg: '店员姐姐露出"啊这位小朋友学得真努力"的笑容 ✓',
    },
    {
      id: 'd09-o2',
      kind: 'listen-choice',
      audioKo: '만 이천 원이에요.',
      successMsg: '✓ 12000 韩元。韩国把万和千分开念：만(1万) + 이천(2000)。',
      choices: [
        { zh: '12000 元。', correct: true },
        { zh: '2000 元。', correct: false },
        { zh: '1200 元。', correct: false },
        { zh: '120000 元。', correct: false },
      ],
    },
    {
      id: 'd09-o3',
      kind: 'zh-to-ko',
      zhPrompt: '请问，这个多少钱？',
      successMsg: '"저기요" 是叫人开场；「얼마예요?」是问价标准句。',
      choices: [
        { ko: '저기요, 이거 얼마예요?', correct: true },
        { ko: '저기요, 이거 얼마이에요?', correct: false },
        { ko: '죄송해요, 이거 얼마예요?', correct: false },
        { ko: '저기요, 그거 얼마이에요?', correct: false },
      ],
    },
    {
      id: 'd09-o4',
      kind: 'particle-error',
      zhHint: '这个是 10000 元。',
      successMsg: '韩国不读「일만」，直接「만」。「원」(원 받침 ㄴ) → 이에요。',
      choices: [
        { ko: '이거 만 원이에요.', correct: true },
        { ko: '이거 일만 원이에요.', correct: false },
        { ko: '이거 만 원예요.', correct: false },
        { ko: '이거 만 원이예요.', correct: false },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '一天就学会了 100/1000/10000。明天敢去喊价了。토리, 천재예요!',
    preview: '明天午餐时间食堂的袋鼠阿姨会问我吃什么。她说话能听懂吗？',
    stickerId: 'sticker-d09',
  },

  carrotHint:
    '今天的胡萝卜：「韩国百千万怎么发音」「韩国货币和人民币换算」「얼마예요什么时候用」',
};
