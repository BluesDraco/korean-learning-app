import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 2 · 1-3 语法关 · N + (을/를) + 주세요
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 * 教学梯度：
 *   fix 逐条揪 콜라은/콜라이 之类真实翻车 → compose 从口语 주세요 到加宾格助词
 *   → rule 抽象出 有收音 을 / 无收音 를 / 口语可省略 三条规则
 */
export const day2Grammar: GrammarSubQuestData = {
  day: 2, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握「주세요」点单和 을/를 宾格助词', subtitleEn: 'Master ordering with \'주세요\' and the object particle 을/를',

  // ─── 助词改错：给错句 → 选正确写法 ───
  fix: [
    {
      id: 'd02-g3-f1',
      promptKo: '콜라은 주세요.',
      promptZh: '下列哪个句子是正确的？', promptZhEn: 'Which of the following sentences is correct?',
      choices: [
        { text: '콜라은 주세요.', correct: false },
        { text: '콜라는 주세요.', correct: false },
        { text: '콜라를 주세요.', correct: true },
        { text: '콜라이 주세요.', correct: false },
      ],
      explain: '点单时用宾格助词 을/를，不用主题助词 은/는。콜라 无收音 → 를。口语常直接说 「콜라 주세요」把 를 省略', explainEn: 'When ordering, use the object particle 을/를, not the topic particle 은/는. 콜라 has no final consonant → 를. In speech, people often just say 「콜라 주세요」 and drop 를.',
    },
    {
      id: 'd02-g3-f2',
      promptKo: '물를 주세요.',
      promptZh: '哪句正确？', promptZhEn: 'Which sentence is correct?',
      choices: [
        { text: '물를 주세요.', correct: false },
        { text: '물을 주세요.', correct: true },
        { text: '물은 주세요.', correct: false },
        { text: '물이 주세요.', correct: false },
      ],
      explain: '물 末字有收音 ㄹ → 宾格助词用 을。无收音才用 를', explainEn: '물 ends with the consonant ㄹ → use the object particle 을. Only use 를 when there\'s no final consonant.',
    },
    {
      id: 'd02-g3-f3',
      promptKo: '커피이 부탁드립니다.',
      promptZh: '想麻烦店员给一杯咖啡，最得体的说法是？', promptZhEn: 'What\'s the most polite way to ask a staff member for a cup of coffee?',
      choices: [
        { text: '커피 안 주세요.', correct: false },
        { text: '커피 주세요, 아니요.', correct: false },
        { text: '커피를 부탁드립니다.', correct: true },
        { text: '커피이 부탁드립니다.', correct: false },
      ],
      explain: '부탁드립니다 是 주세요 的敬语升级。커피 无收音 → 를（加了更标准，口语可省略）。「안 주세요 ❌」不是韩语说法', explainEn: '부탁드립니다 is a more formal upgrade of 주세요. 커피 has no final consonant → 를 (adding it is more standard, but can be dropped in speech). 「안 주세요 ❌」 is not correct Korean.',
    },
    {
      id: 'd02-g3-f4',
      promptKo: '아니요, 얼음 안 주세요.',
      promptZh: '空乘问要不要冰，你不想要，正确说法是？', promptZhEn: 'If a flight attendant asks if you want ice and you don\'t, what\'s the correct response?',
      choices: [
        { text: '아니요, 얼음 안 주세요.', correct: false },
        { text: '얼음 주세요, 안 돼요.', correct: false },
        { text: '아니요, 괜찮아요.', correct: true },
        { text: '얼음 아니요.', correct: false },
      ],
      explain: '주세요 没有直接否定形式。婉拒统一用 아니요, 괜찮아요', explainEn: '주세요 has no direct negative form. To politely decline, always use 아니요, 괜찮아요.',
    },
    {
      id: 'd02-g3-f5',
      promptKo: '콜라 한잔을 주세요.',
      promptZh: '"请给我一杯可乐"最自然的写法是？', promptZhEn: 'What\'s the most natural way to write "Please give me a cola"?',
      choices: [
        { text: '콜라 한잔을 주세요.', correct: false },
        { text: '콜라 한 잔 주세요.', correct: true },
        { text: '콜라 잔 한 주세요.', correct: false },
        { text: '한 잔 콜라 주세요.', correct: false },
      ],
      explain: '数词+量词写作「한 잔」（中间空格）。语序：名词 + 数量 + 주세요。「한잔을」既拼错又赘', explainEn: 'Number + counter is written as 「한 잔」 (with a space). Word order: noun + quantity + 주세요. 「한잔을」 is both misspelled and redundant.',
    },
  ],

  // ─── 组句：词块拼完整句 ───
  compose: [
    {
      id: 'd02-g3-c1',
      zhHint: '请给我一杯可乐。', zhHintEn: 'Please give me a cola.',
      audioKo: '콜라 한 잔 주세요.',
      answer: ['콜라', '한', '잔', '주세요.'],
      tokens: ['콜라', '한', '잔', '주세요.', '두', '커피'],
      explain: '语序：名词 콜라 + 数量 한 잔 + 주세요', explainEn: 'Word order: noun 콜라 + quantity 한 잔 + 주세요.',
    },
    {
      id: 'd02-g3-c2',
      zhHint: '请给我水。（加宾格助词，更标准）', zhHintEn: 'Please give me water. (Adding the object particle is more standard.)',
      audioKo: '물을 주세요.',
      answer: ['물을', '주세요.'],
      tokens: ['물을', '주세요.', '물를', '물이', '부탁', '얼음'],
      explain: '물 有收音 ㄹ → 을。是干扰项：물를 ❌、물이 是主格不是宾格', explainEn: '물 has the final consonant ㄹ → use 을. Distractors: 물를 ❌, 물이 is the subject particle, not the object particle.',
    },
    {
      id: 'd02-g3-c3',
      zhHint: '不用了，没关系。', zhHintEn: 'No need, it\'s fine.',
      audioKo: '아니요, 괜찮아요.',
      answer: ['아니요,', '괜찮아요.'],
      tokens: ['아니요,', '괜찮아요.', '네,', '주세요.', '감사합니다.'],
      explain: '婉拒的黄金句：先 아니요 表态度，再 괜찮아요 缓语气', explainEn: 'The golden phrase for declining: start with 아니요 to show your stance, then 괜찮아요 to soften the tone.',
    },
    {
      id: 'd02-g3-c4',
      zhHint: '麻烦给我菜单。（最礼貌）', zhHintEn: 'Could I have the menu, please? (Most polite)',
      audioKo: '메뉴 부탁드립니다.',
      answer: ['메뉴', '부탁드립니다.'],
      tokens: ['메뉴', '부탁드립니다.', '주세요.', '커피', '감사합니다.'],
      explain: '부탁드립니다 比 주세요 更正式，适合对店员/长辈用', explainEn: '부탁드립니다 is more formal than 주세요, suitable for staff or elders.',
    },
  ],

  // ─── 规则理解选择 ───
  rule: [
    {
      id: 'd02-g3-r1',
      promptZh: '"콜라"（末字无收音），加宾格助词点单时应该是？', promptZhEn: 'For "콜라" (no final consonant), what object particle should you use when ordering?',
      choices: [
        { text: '콜라를 주세요.', correct: true },
        { text: '콜라을 주세요.', correct: false },
        { text: '콜라은 주세요.', correct: false },
        { text: '콜라는 주세요.', correct: false },
      ],
      explain: '宾格助词：无收音 → 를，有收音 → 을。은/는 是主题助词，不用于「주세요」点单', explainEn: 'Object particle: no final consonant → 를, with final consonant → 을. 은/는 is the topic particle, not used with 「주세요」 when ordering.',
    },
    {
      id: 'd02-g3-r2',
      promptZh: '"물"（末字有收音 ㄹ），加宾格助词应该是？', promptZhEn: 'For "물" (ends with the consonant ㄹ), what object particle should you use?',
      choices: [
        { text: '물를', correct: false },
        { text: '물을', correct: true },
        { text: '물은', correct: false },
        { text: '물이', correct: false },
      ],
      explain: '有收音 → 을。물를 是最常见的初学者错误', explainEn: 'With a final consonant → 을. 물를 is the most common beginner mistake.',
    },
    {
      id: 'd02-g3-r3',
      promptZh: '关于「주세요」的用法，下面哪一句是对的？', promptZhEn: 'Which of the following is correct about the usage of 「주세요」?',
      choices: [
        { text: '주세요 前面必须加 을/를，不能省略。', textEn: 'You must add 을/를 before 주세요; it can\'t be omitted.', correct: false },
        { text: '주세요 只能对朋友用，不能对店员用。', textEn: '주세요 can only be used with friends, not with staff.', correct: false },
        { text: '口语中「콜라 주세요」是可以的，을/를 常省略。', textEn: 'In speech, 「콜라 주세요」 is fine; 을/를 is often omitted.', correct: true },
        { text: '拒绝时应该说「안 주세요」。', textEn: 'When declining, you should say 「안 주세요」.', correct: false },
      ],
      explain: '口语中 을/를 常省略；주세요 是标准礼貌用语；否定不用「안 주세요」，用 아니요, 괜찮아요', explainEn: 'In speech, 을/를 is often omitted; 주세요 is standard polite language; for negation, don\'t use 「안 주세요」, use 아니요, 괜찮아요.',
    },
    {
      id: 'd02-g3-r4',
      promptZh: '想对店员非常礼貌地说"请给我菜单"，哪句最得体？', promptZhEn: 'What\'s the most polite way to say "Please give me the menu" to a staff member?',
      choices: [
        { text: '메뉴 줘요.', correct: false },
        { text: '메뉴 주세요.', correct: false },
        { text: '메뉴 부탁드립니다.', correct: true },
        { text: '메뉴 안 줘요.', correct: false },
      ],
      explain: '敬语阶梯：줘요（口语，对朋友）< 주세요（标准礼貌）< 부탁드립니다（正式敬语，对长辈/店员）', explainEn: 'Honorific ladder: 줘요 (casual, to friends) < 주세요 (standard polite) < 부탁드립니다 (formal honorific, to elders/staff).',
    },
  ],
};
