import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 12 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 12 主流程文具店 + Minji 教韩币场景
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化韩币价格读法，reply 铺 만원/거스름돈找钱
 */
export const day12Listen: ListenSubQuestData = {
  day: 12, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在文具店听清价格数字，练念 만 원', subtitleEn: 'At a stationery store, listen carefully to price numbers and practice saying man won.',

  // ─── 听句选意 ───
  meaning: [
    {
      id: 'd12-l2-m1',
      audioKo: '만 원이에요.',
      choices: [
        { text: '10000 元。', textEn: '10,000 won.', correct: true },
        { text: '1000 元。', textEn: '1,000 won.', correct: false },
        { text: '100000 元。', textEn: '100,000 won.', correct: false },
        { text: '100 元。', textEn: '100 won.', correct: false },
      ],
      explain: '만(万) + 원 = 10000 元。约合 50 RMB。前不加 일', explainEn: 'man (ten thousand) + won = 10,000 won. About 50 RMB. No il before it.',
    },
    {
      id: 'd12-l2-m2',
      audioKo: '만 이천원이에요.',
      choices: [
        { text: '12000 元。', textEn: '12,000 won.', correct: true },
        { text: '1200 元。', textEn: '1,200 won.', correct: false },
        { text: '20000 元。', textEn: '20,000 won.', correct: false },
        { text: '2000 元。', textEn: '2000 won.', correct: false },
      ],
      explain: '만(10000) + 이천(2000) = 12000。以万为基准拆分，不是 십이천(十二千)', explainEn: 'man (10000) + icheon (2000) = 12000. Split by ten-thousand units, not sibicheon (twelve thousand).',
    },
    {
      id: 'd12-l2-m3',
      audioKo: '이거 얼마예요?',
      choices: [
        { text: '这个多少钱？', textEn: 'How much is this?', correct: true },
        { text: '这个有吗？', textEn: 'Do you have this?', correct: false },
        { text: '这个好吗？', textEn: 'Is this good?', correct: false },
        { text: '这个是什么？', textEn: 'What is this?', correct: false },
      ],
      explain: '이거(这个) + 얼마예요?（多少钱？）。购物万能问价句', explainEn: '이거 (this) + 얼마예요? (how much?). The go-to phrase for asking prices while shopping.',
    },
    {
      id: 'd12-l2-m4',
      audioKo: '오천 원 주세요.',
      choices: [
        { text: '请给我 5000 元。', textEn: 'Please give me 5,000 won.', correct: true },
        { text: '请给 500 元。', textEn: 'Please give 500 won.', correct: false },
        { text: '请给 50000 元。', textEn: 'Please give 50,000 won.', correct: false },
        { text: '5 元也可以。', textEn: '5 won is fine too.', correct: false },
      ],
      explain: '오천(5000) + 원 + 주세요。付款/找零场景。오천원纸币是韩国常用面额', explainEn: 'ocheon (5000) + won + juseyo. Payment/change scenario. The 5,000-won bill is a common Korean denomination.',
    },
    {
      id: 'd12-l2-m5',
      audioKo: '네, 맞아요.',
      choices: [
        { text: '是的，对。', textEn: 'Yes, that\'s right.', correct: true },
        { text: '不，错了。', textEn: 'No, that\'s wrong.', correct: false },
        { text: '不，没有。', textEn: 'No, there isn\'t.', correct: false },
        { text: '是的，谢谢。', textEn: 'Yes, thank you.', correct: false },
      ],
      explain: '네(是的) + 맞아요(对·확인)。店员/朋友确认对方说得对时的固定回应', explainEn: 'ne (yes) + majayo (right · confirmation). A fixed response when a store clerk or friend confirms what the other person said is correct.',
    },
  ],

  // ─── 听句填空 ───
  cloze: [
    {
      id: 'd12-l2-c1',
      audioKo: '이거 얼마예요?',
      clozeParts: ['이거 ', '?'],
      choices: [
        { text: '얼마예요', correct: true },
        { text: '뭐예요', correct: false },
        { text: '있어요', correct: false },
        { text: '주세요', correct: false },
      ],
      explain: '얼마(多少) + 예요(是·무받침) = 多少钱',
    },
    {
      id: 'd12-l2-c2',
      audioKo: '만 이천원이에요.',
      clozeParts: ['만 ', '이에요.'],
      choices: [
        { text: '이천원', correct: true },
        { text: '이십원', correct: false },
        { text: '이백원', correct: false },
        { text: '이만원', correct: false },
      ],
      explain: '만 + 이천 + 원 = 12000 元。以万为基准拆分', explainEn: 'man + icheon + won = 12,000 won. Split by ten-thousand units.',
    },
    {
      id: 'd12-l2-c3',
      audioKo: '노트 두 권 주세요.',
      clozeParts: ['노트 ', '주세요.'],
      choices: [
        { text: '두 권', correct: true },
        { text: '이 권', correct: false },
        { text: '두 개', correct: false },
        { text: '둘 권', correct: false },
      ],
      explain: '固有数 둘(2) → 두 + 권(本子量词)。价格用汉字数，数东西用固有数', explainEn: 'Native number dul (2) → du + gwon (counter for books). Use Sino-Korean numbers for prices, native numbers for counting things.',
    },
    {
      id: 'd12-l2-c4',
      audioKo: '이거 너무 비싸요.',
      clozeParts: ['이거 너무 ', '.'],
      choices: [
        { text: '비싸요', correct: true },
        { text: '싸요', correct: false },
        { text: '좋아요', correct: false },
        { text: '작아요', correct: false },
      ],
      explain: '너무(太·程度副词) + 비싸요(贵)。逛街嫌贵的固定表达', explainEn: 'neomu (too · degree adverb) + bissayo (expensive). A fixed expression for complaining about prices while shopping.',
    },
  ],

  // ─── 听对话选回应 ───
  reply: [
    {
      id: 'd12-l2-r1',
      audioKo: '이거 얼마예요?',
      promptZh: '客人问"这个多少钱？"你（店员）看到标签写着 12000 元，应该？', promptZhEn: 'A customer asks, "How much is this?" You (the clerk) see the tag says 12,000 won. What should you do?',
      choices: [
        { text: '만 이천원이에요.', correct: true },
        { text: '십이천원이에요.', correct: false },
        { text: '일만 이천원이에요.', correct: false },
        { text: '몰라요.', correct: false },
      ],
      explain: '12000 = 만 이천（万二千）。不加"일"——韩语百千万前都不加 일', explainEn: '12000 = 만 이천 (12,000). No "il" — Korean doesn\'t add il before hundreds, thousands, or ten-thousands.',
    },
    {
      id: 'd12-l2-r2',
      audioKo: '만 이천원이에요.',
      promptZh: '店员告诉你 12000 元，你想确认自己听对了，반말问 Minji，应该？', promptZhEn: 'The clerk tells you it\'s 12,000 won. You want to confirm you heard right, asking Minji in 반말. What should you say?',
      choices: [
        { text: '만 이천원이야?', correct: true },
        { text: '만 이천원이에요.', correct: false },
        { text: '얼마예요? 얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '반말 이다 → 야（无받침）/ 이야（有받침）。「원이야?」升调 = "是~吗？"·반말疑问',
    },
    {
      id: 'd12-l2-r3',
      audioKo: '만 이천원이에요.',
      promptZh: '店员报价 12000 元。你付款后想说"谢谢，祝您愉快"，最礼貌的一句应该？', promptZhEn: 'The clerk quotes 12,000 won. After paying, you want to say "Thanks, have a nice day." What\'s the most polite thing to say?',
      choices: [
        { text: '감사합니다. 좋은 하루 보내세요.', correct: true },
        { text: '아니요, 없어요.', correct: false },
        { text: '너무 비싸요!', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '감사합니다 + 좋은 하루 보내세요（祝您有个好日子）。店内结束的礼貌套语', explainEn: '감사합니다 + 좋은 하루 보내세요 (Have a nice day). A polite closing phrase in a store.',
    },
  ],
};
