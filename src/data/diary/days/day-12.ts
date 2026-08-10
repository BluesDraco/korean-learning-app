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
  title: '街边文具店 · 万元的故事', titleEn: 'Street-side stationery store · The story of 10,000 won',
  subtitle: 'Minji 教我「一万元」差点把舌头打结', subtitleEn: 'Minji taught me \'10,000 won\' and I almost twisted my tongue',
  heroImageUrl: '/images/diary/day-12-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 12일 · 목요일 오후',
    weather: '兽尔 · 多云转晴', weatherEn: 'Seoul · Cloudy to clear',
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
      zh: '钱', zhEn: 'money',
      pos: '名词', posEn: 'Noun',
      example: { ko: '돈이 없어요.', zh: '没有钱。', zhEn: 'No money.' },
      tip: '韩国人买单常说「돈 내요」(我出钱)。돈 있다(有钱) / 돈 없다(没钱)', tipEn: 'Koreans often say \'돈 내요\' (I\'ll pay) when settling the bill. 돈 있다 (have money) / 돈 없다 (no money)',
    },
    {
      id: 'd12-w2',
      korean: '백',
      hangul: 'baek',
      zh: '百 / 100', zhEn: 'hundred / 100',
      pos: '名词', posEn: 'Noun',
      example: { ko: '백 원이에요.', zh: '100 元。', zhEn: '100 won.' },
      tip: '汉字数：일(1) 이(2)… 십(10) 백(100) 천(1000) 만(10000)', tipEn: 'Sino-Korean numbers: 일(1) 이(2)… 십(10) 백(100) 천(1000) 만(10000)',
    },
    {
      id: 'd12-w3',
      korean: '천',
      hangul: 'cheon',
      zh: '千 / 1000', zhEn: 'thousand / 1000',
      pos: '名词', posEn: 'Noun',
      example: { ko: '천 원이에요.', zh: '1000 元。', zhEn: '1,000 won.' },
      tip: '천 원 ≈ 5 元人民币。다이소 所有东西 천 원起', tipEn: '천 원 ≈ 5 RMB. Everything at Daiso starts at 천 원.',
    },
    {
      id: 'd12-w4',
      korean: '만',
      hangul: 'man',
      zh: '万 / 10000', zhEn: 'ten thousand / 10000',
      pos: '名词', posEn: 'Noun',
      example: { ko: '만 원이에요.', zh: '10000 元（约 50 元人民币）。', zhEn: '10,000 won (about 50 RMB).' },
      tip: '韩国的"万"和"千"是分开发音的，不像中文。"만 원" = 10000원', tipEn: 'In Korean, \'ten thousand\' and \'thousand\' are pronounced separately, unlike Chinese. \'만 원\' = 10,000 won.',
    },
    {
      id: 'd12-w5',
      korean: '얼마예요',
      hangul: 'eol-ma-ye-yo',
      zh: '多少钱', zhEn: 'How much?',
      pos: '表达', posEn: 'Expression',
      example: { ko: '이거 얼마예요?', zh: '这个多少钱？', zhEn: 'How much is this?' },
      tip: '얼마(多少) + 예요。购物问价第一句', tipEn: 'How much is it? The first phrase for asking prices while shopping.',
    },
    {
      id: 'd12-w6',
      korean: '원',
      hangul: 'won',
      zh: '韩元（单位）', zhEn: 'Korean won (currency unit)',
      pos: '名词', posEn: 'Noun',
      example: { ko: '5,000원이에요.', zh: '5000 韩元。', zhEn: '5,000 won.' },
      tip: '￦ 或 원。韩币最小纸币是 천 원 (₩1,000)', tipEn: '₩ or 원. The smallest Korean bill is 천 원 (₩1,000).',
    },
  ],

  dialogue: {
    scene: '文具店收银台', sceneEn: 'Stationery store checkout counter',
    setting: {
      time: '下午没课后', timeEn: 'After school, no classes in the afternoon',
      place: '学校对面文具店', placeEn: 'Stationery store across from school',
      npc: '店员 + Minji', npcEn: 'Store clerk + Minji',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '저기요, 이거 얼마예요?',
        hangul: 'jeo-gi-yo, i-geo eol-ma-ye-yo',
        zh: '不好意思，这个多少钱？', zhEn: 'Excuse me, how much is this?',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '店员', npcNameEn: 'Store clerk',
        ko: '그거 만 이천원이에요.',
        hangul: 'geu-geo man i-cheon-won-i-e-yo',
        zh: '那个是 12000 元。', zhEn: 'That\'s 12,000 won.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '만…이천…원이에요?',
        hangul: 'man… i-cheon… won-i-e-yo',
        zh: '一万……两千……元吗？', zhEn: 'Ten... two... thousand won?',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '맞아, 잘했어!',
        hangul: 'ma-ja, jal-hae-sseo!',
        zh: '对，做得好！', zhEn: 'Yes, well done!',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '만 원… 만 원… 만 원… 혀 꼬임!',
        hangul: 'man won… man won… man won… hyeo kko-im!',
        zh: '만 원……만 원……만 원……舌头打结！', zhEn: 'Man won... man won... man won... tongue-tied!',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '店员把笔装进袋子，Tori 付完一万二——应该说什么？', zhEn: 'The clerk bags the pen, Tori pays 12,000—what should she say?',
        practice: 'pick',
        choices: [
          { ko: '감사합니다. 좋은 하루 보내세요.', zh: '谢谢。祝您愉快。（礼貌收尾）', zhEn: 'Thank you. Have a nice day. (Polite closing)', correct: true },
          { ko: '만 원만 받으세요.', zh: '只收一万吧。（砍价？在韩语语境不对）', zhEn: 'Just take 10,000. (Bargaining? Not appropriate in Korean context)', correct: false },
          { ko: '너무 비싸요.', zh: '太贵了。（刚付完钱说这个不礼貌）', zhEn: 'Too expensive. (Rude to say right after paying)', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '汉字数词 · 价格/号码/年月日', titleEn: 'Sino-Korean numbers · Prices/phone numbers/dates',
    pattern: '일(1) 이(2) 삼(3) 사(4) 오(5) 육(6) 칠(7) 팔(8) 구(9) 십(10) 백(百) 천(千) 만(万)', patternEn: 'il(1) i(2) sam(3) sa(4) o(5) yuk(6) chil(7) pal(8) gu(9) sip(10) baek(100) cheon(1,000) man(10,000)',
    whenToUse: '韩语有两套数字系统——汉字数词(일이삼사…)用于价格、号码、年月日、分钟；固有数词(하나둘셋…)用于数东西、年龄、小时。Day 12 兔莉在便利店结账，听到价格"오백원"开始学汉字数词。',
    rules: [
      '**1-10 汉字数词**：일(1) 이(2) 삼(3) 사(4) 오(5) 육(6) 칠(7) 팔(8) 구(9) 십(10)。发音类似中文，很快就能记住：일=一，이=二，삼=三，사=四',
      '**百千万**：백=百(100)、천=千(1000)、만=万(10000)。韩语没有"十万"这个词——十万就是 십만(十+万)。亿 = 억',
      '**数字组合规则**：和中文一样，从高位到低位依次读。325 = 삼백이십오（三百二十五）。15 = 십오（十五，不是 일십오）。20 = 이십（二十）',
      '**만(万)以上的拆分**：12000 = 만 이천（万二千），不是 십이천（十二千）。韩语以"万"为基准拆分：12345 = 만 이천삼백사십오（一万二千三百四十五）',
      '**价格表达**：数字 + 원(韩元)。500원、3,000원、12,000원。얼마예요? = 多少钱？얼마(多少) + 예요(是) = 多少钱',
      '**汉字数 vs 固有数使用场景**：汉字数 → 价格(500원)、电话号码(010-1234-5678)、年月日(2024년 9월 1일)、分钟(5분)、楼层(3층)。固有数 → 数东西(사과 세 개)、年龄(스무 살)、小时(두 시)',
      '**编号/顺序**：번호(号码)、몇 번(几号)。301호 = 삼백일호（301号房间）。버스 100번 = 백번 버스（100路公交）',
      '**百以下省略일**：100 = 백（不是 일백），1000 = 천（不是 일천）。但 110 = 백십，101 = 백일——中间有数字时才用 일。11000 = 만 천（不是 일만 천）',
    ],
    examples: [
      { ko: '오백원이에요.', zh: '500 韩元。', zhEn: '500 won.', highlight: '오백', note: '오(5) + 백(100) = 五百。500원 约合人民币 2.5 元', noteEn: 'o(5) + baek(100) = five hundred. 500 won is about 2.5 RMB.' },
      { ko: '삼천원이에요.', zh: '3000 韩元。', zhEn: '3,000 won.', highlight: '삼천', note: '삼(3) + 천(1000) = 三千。3000원 约合人民币 15 元', noteEn: 'sam(3) + cheon(1,000) = three thousand. 3,000 won is about 15 RMB.' },
      { ko: '만 이천원이에요.', zh: '12000 韩元。', zhEn: '12,000 won.', highlight: '만 이천', note: '만(10000) + 이천(2000) = 一万二千。以万为基准拆分', noteEn: 'man(10,000) + i-cheon(2,000) = 12,000. Split by 10,000 units.' },
      { ko: '오만원이에요.', zh: '50000 韩元。', zhEn: '50,000 won.', highlight: '오만', note: '오(5) + 만(10000) = 五万。韩国最大面值纸币就是 오만원', noteEn: 'o(5) + man(10,000) = 50,000. The largest Korean banknote is o-man-won.' },
      { ko: '이거 얼마예요?', zh: '这个多少钱？', zhEn: 'How much is this?', highlight: '얼마예요', note: '얼마(多少) + 예요(是)。购物万能问句，无收音→예요', noteEn: 'eol-ma (how much) + ye-yo (is). The all-purpose shopping question; no final consonant → ye-yo.' },
      { ko: '삼백오십 번이에요.', zh: '是 350 号。', zhEn: 'It\'s number 350.', highlight: '삼백오십 번', note: '삼백(300) + 오십(50) + 번(号)。报号码用汉字数词', noteEn: 'sam-baek (300) + o-sip (50) + beon (number). Use Sino-Korean numbers for numbers.' },
    ],
    pitfall:
      '① 100 是 백 不是 일백——百、千、万前面**都不加 일**。1000 = 천，10000 = 만，直接说，不用 일만。② 12000 是 만 이천 不是 십이천——韩语没有"千"以上的连续进位。③ 价格用汉字数(오백원)，数苹果用固有数(사과 다섯 개)——两套数字不可混用。④ 얼마예요 只用于问价格——问电话号码用 몇 번이에요? 不用 얼마예요。',
  },

  output: [
    {
      id: 'd12-o1',
      kind: 'compose',
      zhHint: '这个多少钱？（购物问价）', zhHintEn: 'How much is this? (asking price while shopping)',
      tokens: ['이거', '얼마예요', '?', '저거', '몇원이에요', '주세요'],
      composeAnswer: ['이거', '얼마예요', '?'],
      successMsg: '店员抬头看了一眼你说的话——她听懂了 ✓', successMsgEn: 'The clerk looked up at what you said—she understood ✓',
    },
    {
      id: 'd12-o2',
      kind: 'listen-choice',
      audioKo: '만 이천원이에요.',
      successMsg: '✓ 「12000 元」。「만」(万) + 「이천」(二千) = 一万二千。', successMsgEn: '✓ \'12,000 won.\' \'man\' (10,000) + \'i-cheon\' (2,000) = 12,000.',
      choices: [
        { zh: '12000 元。', zhEn: '12,000 won.', correct: true },
        { zh: '1200 元。', zhEn: '1,200 won.', correct: false },
        { zh: '21000 元。', zhEn: '21,000 won.', correct: false },
        { zh: '1000 元。', zhEn: '1,000 won.', correct: false },
      ],
    },
    {
      id: 'd12-o3',
      kind: 'zh-to-ko',
      zhPrompt: '那个是 12000 元。', zhPromptEn: 'That\'s 12,000 won.',
      successMsg: '"만 이천원" = 万二千元。不加"일"，만直接跟이천。', successMsgEn: '\'man i-cheon-won\' = 12,000 won. No \'il\' needed; man directly followed by i-cheon.',
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
      zhHint: '5000 元。', zhHintEn: '5,000 won.',
      successMsg: '「오천」(五千)。汉字数 5+1000。원 前不加额外助词。', successMsgEn: '\'o-cheon\' (5,000). Sino-Korean 5+1000. No extra particle before won.',
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
      successMsg: '✓ Day 12 核心词全部对上。만 원 终于念顺了。', successMsgEn: '✓ Day 12 core words all matched. man-won finally rolls off the tongue.',
      pairs: [
        { ko: '돈', zh: '钱', zhEn: 'money' },
        { ko: '백', zh: '百', zhEn: 'hundred' },
        { ko: '천', zh: '千', zhEn: 'thousand' },
        { ko: '만', zh: '万', zhEn: 'ten thousand' },
        { ko: '얼마예요', zh: '多少钱', zhEn: 'How much?' },
      ],
    },
  ],

  recap: {
    toriPose: 'cheer',
    praise: '만 원 的发音拿下了！Tori 今天交了学费——不是钱，是练到舌头打结。', praiseEn: 'Nailed the pronunciation of man-won! Tori paid tuition today—not in money, but in tongue-twisting practice.',
    preview: '夜里突然感冒了，喉咙火烧一样。明天 Haru 要敲门带我去약국（药店）——第一次用韩语说哪里不舒服。', previewEn: 'I caught a cold suddenly at night, my throat burning. Tomorrow Haru will knock and take me to the pharmacy (yak-guk)—my first time saying where it hurts in Korean.',
    stickerId: 'sticker-d12',
    sceneImageUrl: '/images/diary/day-12-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「韩语数字两套怎么记」「만 원和오만원的区别」「얼마예요怎么用」',
};
