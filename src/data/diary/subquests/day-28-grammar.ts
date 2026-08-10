import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 28 · 1-3 문법 탐험 · 语法关
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：V지 못하다（无法）+ 세요 敬语命令 + 으로/로 方式助词 + 합쇼체 vs 해요体
 */
export const day28Grammar: GrammarSubQuestData = {
  day: 28, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '签售会实战语法 · 谦虚 + 敬语 + 承诺', subtitleEn: 'Fan sign practical grammar · Humility + politeness + promises',

  fix: [
    {
      id: 'd28-g3-f1',
      promptKo: '평생 안 잊을 거예요.',
      promptZh: '"一辈子无法忘（因为太感动）"哪句更贴切？', promptZhEn: '"Can\'t forget for a lifetime (because it was so moving)" Which phrase fits better?',
      choices: [
        { text: '평생 안 잊을 거예요.', correct: false },
        { text: '평생 잊지 못할 거예요.', correct: true },
        { text: '평생 잊지 마세요.', correct: false },
        { text: '평생 잊었어요.', correct: false },
      ],
      explain: '못 = 能力/情感否定（无法）；안 = 意志否定（不打算）。感动到忘不掉 → 못', explainEn: '못 = ability/emotional negation (can\'t); 안 = volitional negation (won\'t). Too moved to forget → 못',
    },
    {
      id: 'd28-g3-f2',
      promptKo: '건강해요.',
      promptZh: '签售会分别时说"请保重"，哪句最合适？', promptZhEn: 'When parting at a fan sign, which is the most appropriate way to say "take care"?',
      choices: [
        { text: '건강해요.', correct: false },
        { text: '건강하세요.', correct: true },
        { text: '건강해.', correct: false },
        { text: '건강했어요.', correct: false },
      ],
      explain: 'V + 세요 = 尊敬命令/祝福。「건강하세요」= 请保重（分别祝福）', explainEn: 'V + 세요 = polite command/blessing. 「건강하세요」= take care (parting blessing)',
    },
    {
      id: 'd28-g3-f3',
      promptKo: '진심에 응원해요.',
      promptZh: '"真心支持你"哪句正确？', promptZhEn: 'Which sentence is correct for \'I sincerely support you\'?',
      choices: [
        { text: '진심에 응원해요.', correct: false },
        { text: '진심으로 응원해요.', correct: true },
        { text: '진심로 응원해요.', correct: false },
        { text: '진심을 응원해요.', correct: false },
      ],
      explain: '「N + 으로/로」= 以 N 方式。진심 有收音 ㅁ → 으로', explainEn: '「N + 으로/로」= in the manner of N. 진심 ends in ㅁ → 으로',
    },
    {
      id: 'd28-g3-f4',
      promptKo: '토리이에요. 중국에서 왔어요.',
      promptZh: '"我叫Tori。从中国来的。"哪句正确？', promptZhEn: 'Which sentence is correct: "My name is Tori. I\'m from China."?',
      choices: [
        { text: '토리이에요. 중국에서 왔어요.', correct: false },
        { text: '토리예요. 중국에서 왔어요.', correct: true },
        { text: '토리이에요. 중국에 왔어요.', correct: false },
        { text: '토리예요. 중국에 왔어요.', correct: false },
      ],
      explain: '토리 无收音 → 예요；出发地用 에서（不是 에·方向）', explainEn: 'Tori has no final consonant → 예요; use 에서 for starting point (not 에, which is direction)',
    },
    {
      id: 'd28-g3-f5',
      promptKo: '아니요, 아직 부족해!',
      promptZh: '对偶像说"还不够"，最得体的一句？', promptZhEn: 'What\'s the most polite way to tell your idol "not enough"?',
      choices: [
        { text: '아니요, 아직 부족해!', correct: false },
        { text: '아니요, 아직 부족해요.', correct: true },
        { text: '아니요, 아직 많이 부족합니다.', correct: false },
        { text: '아니요, 부족.', correct: false },
      ],
      explain: '对偶像用 해요体（不太远也不太近）。반말 부족해 失礼；부족합니다 太生硬', explainEn: 'Use 해요体 with your idol (not too distant, not too close). 반말 부족해 is rude; 부족합니다 is too stiff',
    },
  ],

  compose: [
    {
      id: 'd28-g3-c1',
      zhHint: '我叫Tori。从中国来的。', zhHintEn: 'I\'m Tori. I came from China.',
      audioKo: '토리예요. 중국에서 왔어요.',
      answer: ['토리예요.', '중국에서', '왔어요.'],
      tokens: ['토리예요.', '중국에서', '왔어요.', '토리이에요.', '중국에', '갔어요.'],
      explain: '자기소개 精简版 · 名字 + 출신지', explainEn: 'Self-intro condensed version · name + origin',
    },
    {
      id: 'd28-g3-c2',
      zhHint: '还不够。但是真的好喜欢。', zhHintEn: 'Not enough. But I really like you.',
      audioKo: '아직 많이 부족해요. 근데 진짜 좋아해요.',
      answer: ['아직', '많이', '부족해요.', '근데', '진짜', '좋아해요.'],
      tokens: ['아직', '많이', '부족해요.', '근데', '진짜', '좋아해요.', '잘해요.', '싫어해요.'],
      explain: '韩式谦虚 → 근데（但是） → 真心。签售会经典回应', explainEn: 'Korean-style modesty → 근데 (but) → sincerity. Classic fan sign response',
    },
    {
      id: 'd28-g3-c3',
      zhHint: '我支持你。请保重。', zhHintEn: 'I support you. Take care.',
      audioKo: '응원해요. 건강하세요.',
      answer: ['응원해요.', '건강하세요.'],
      tokens: ['응원해요.', '건강하세요.', '응원해!', '건강해요.', '건강해!', '있어요.'],
      explain: '해요体 응원해요 + 세요 敬语祝福 · 分别时的标准两句', explainEn: '해요体 응원해요 + 세요 honorific blessing · standard two phrases when parting',
    },
    {
      id: 'd28-g3-c4',
      zhHint: '真的感谢。一辈子不会忘。', zhHintEn: 'Thank you so much. I\'ll never forget this for the rest of my life.',
      audioKo: '진짜 감사합니다. 평생 잊지 못할 거예요.',
      answer: ['진짜', '감사합니다.', '평생', '잊지', '못할', '거예요.'],
      tokens: ['진짜', '감사합니다.', '평생', '잊지', '못할', '거예요.', '고마워요.', '안 잊을', '거예요.'],
      explain: '합쇼체 감사합니다 + 잊지 못할 거예요 · 最强感谢', explainEn: '합쇼체 감사합니다 + 잊지 못할 거예요 · strongest thanks',
    },
  ],

  rule: [
    {
      id: 'd28-g3-r1',
      promptZh: '关于 「V지 못하다」vs「안 V」的区别，哪句最准确？', promptZhEn: 'Which is most accurate about the difference between 「V지 못하다」 and 「안 V」?',
      choices: [
        { text: '못 = 能力/情感否定（无法）· 안 = 意志否定（不打算）', textEn: '못 = ability/emotional negation (cannot) · 안 = volitional negation (don\'t intend to)', correct: true },
        { text: '两者完全一样', textEn: 'The two are exactly the same', correct: false },
        { text: '못 是过去时', textEn: '못 is past tense', correct: false },
        { text: '안 是敬语', textEn: '안 is honorific', correct: false },
      ],
      explain: '못 잊어요 = 忘不了；안 잊어요 = 不打算忘。感动到"忘不了"用 못', explainEn: '못 잊어요 = can\'t forget; 안 잊어요 = don\'t intend to forget. Use 못 when moved to "can\'t forget"',
    },
    {
      id: 'd28-g3-r2',
      promptZh: '关于「V + 세요」，哪句最准确？', promptZhEn: 'Which is most accurate about 「V + 세요」?',
      choices: [
        { text: '「V + 세요」= 尊敬命令/祝福（"请~"）。건강하세요 = 请保重', textEn: '「V + 세요」= honorific command/blessing ("please~"). 건강하세요 = please take care', correct: true },
        { text: '「V + 세요」是过去时', textEn: '「V + 세요」 is past tense', correct: false },
        { text: '「V + 세요」是반말', textEn: '「V + 세요」 is 반말', correct: false },
        { text: '「V + 세요」= 想做~', textEn: '「V + 세요」 = want to do~', correct: false },
      ],
      explain: '드세요（请用）/ 오세요（请来）/ 건강하세요（请保重）都是同一句型', explainEn: '드세요 (please eat) / 오세요 (please come) / 건강하세요 (please take care) are all the same pattern',
    },
    {
      id: 'd28-g3-r3',
      promptZh: '关于「N + 으로/로」（方式助词），哪句最准确？', promptZhEn: 'Which is most accurate about 「N + 으로/로」 (method particle)?',
      choices: [
        { text: '有收音 → 으로；无收音/ㄹ收音 → 로。表示"以 N（方式）"', textEn: 'With final consonant → 으로; no final consonant/ㄹ final → 로. Means "by means of N"', correct: true },
        { text: '有收音 → 로；无收音 → 으로', textEn: 'With final consonant → 로; no final consonant → 으로', correct: false },
        { text: '所有名词都用 로', textEn: 'All nouns use 로', correct: false },
        { text: '这是宾格助词', textEn: 'This is an object particle', correct: false },
      ],
      explain: '진심으로（有 ㅁ）/ 카드로（无 ㄷ以外收音）· 特别：ㄹ收音也用 로（例：자전거로 也接 로）', explainEn: '진심으로 (has ㅁ) / 카드로 (no final consonant besides ㄷ) · Special: ㄹ final also uses 로 (e.g., 자전거로 also takes 로)',
    },
    {
      id: 'd28-g3-r4',
      promptZh: '关于签售会时对偶像的语体，哪句最准确？', promptZhEn: 'Which speech level is most accurate for speaking to an idol at a fan signing event?',
      choices: [
        { text: '해요体最合适。반말过近；합쇼체过远。「~예요/왔어요/좋아해요」', textEn: 'The 해요 style is best. 반말 is too close; 합쇼체 is too distant. 「~예요/왔어요/좋아해요」', correct: true },
        { text: '必须用반말（친밀）', textEn: 'Must use 반말 (intimate)', correct: false },
        { text: '必须用합쇼체', textEn: 'Must use 합쇼체', correct: false },
        { text: '任何都行', textEn: 'Any is fine', correct: false },
      ],
      explain: '仪式感 + 亲近感 = 해요体。합쇼체 感谢句才升级（진짜 감사합니다）', explainEn: 'Ceremony + closeness = 해요 style. Only the thank-you phrase upgrades to 합쇼체 (진짜 감사합니다)',
    },
  ],
};
