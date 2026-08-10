import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 2 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 2 主流程对话 + 词汇例句
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 */
export const day2Listen: ListenSubQuestData = {
  day: 2, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '听清空乘的每一句，学会点单节奏', subtitleEn: 'Catch every word the flight attendant says and master the rhythm of ordering',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd02-l2-m1',
      audioKo: '콜라 한 잔 주세요.',
      choices: [
        { text: '请给我一杯水。', textEn: 'Please give me a glass of water.', correct: false },
        { text: '请给我一杯可乐。', textEn: 'Please give me a cola.', correct: true },
        { text: '请给我一杯咖啡。', textEn: 'Please give me a coffee.', correct: false },
        { text: '请给我一杯果汁。', textEn: 'Please give me a juice.', correct: false },
      ],
      explain: '콜라(可乐) + 한 잔(一杯) + 주세요(请给我)。这是兔莉飞机上说的第一句韩语', explainEn: 'Cola + one cup + please. This is the first Korean sentence Tori said on the plane',
    },
    {
      id: 'd02-l2-m2',
      audioKo: '음료수 드릴까요?',
      choices: [
        { text: '要冰块吗？', textEn: 'Would you like ice?', correct: false },
        { text: '要餐食吗？', textEn: 'Would you like a meal?', correct: false },
        { text: '要饮料吗？', textEn: 'Would you like a drink?', correct: true },
        { text: '要菜单吗？', textEn: 'Would you like a menu?', correct: false },
      ],
      explain: '음료수 = 饮料（汉字词"饮料水"），드릴까요 = 要给您……吗（敬语）', explainEn: '음료수 = drink (Sino-Korean for \'beverage water\'), 드릴까요 = shall I give you... (honorific)',
    },
    {
      id: 'd02-l2-m3',
      audioKo: '아니요, 괜찮아요.',
      choices: [
        { text: '好的，谢谢。', textEn: 'Okay, thank you.', correct: false },
        { text: '是的，请给我。', textEn: 'Yes, please.', correct: false },
        { text: '不用了，没关系。', textEn: 'No need, it\'s fine.', correct: true },
        { text: '不知道，对不起。', textEn: 'I don\'t know, sorry.', correct: false },
      ],
      explain: '아니요(不) + 괜찮아요(没关系)。婉拒对方好意的黄金搭档', explainEn: '아니요 (no) + 괜찮아요 (it\'s fine). The perfect combo for politely declining',
    },
    {
      id: 'd02-l2-m4',
      audioKo: '메뉴 부탁드립니다.',
      choices: [
        { text: '请给我菜单。（很礼貌）', textEn: 'Please give me the menu. (Very polite)', correct: true },
        { text: '这个菜单是什么？', textEn: 'What is this menu?', correct: false },
        { text: '我不要菜单。', textEn: 'I don\'t want the menu.', correct: false },
        { text: '菜单在哪里？', textEn: 'Where is the menu?', correct: false },
      ],
      explain: '부탁드립니다 是 주세요 的敬语升级版，对店员/长辈用会更得体', explainEn: '부탁드립니다 is a more formal version of 주세요, better for staff or elders',
    },
    {
      id: 'd02-l2-m5',
      audioKo: '얼음 많이 주세요.',
      choices: [
        { text: '请多给点水。', textEn: 'Please give me more water.', correct: false },
        { text: '请多给点冰。', textEn: 'Please give me more ice.', correct: true },
        { text: '请少给点冰。', textEn: 'Please give me less ice.', correct: false },
        { text: '不要冰块。', textEn: 'No ice, please.', correct: false },
      ],
      explain: '얼음(冰) + 많이(多) + 주세요。많이 是"多"的副词', explainEn: '얼음 (ice) + 많이 (a lot) + 주세요. 많이 is the adverb for \'a lot\'',
    },
  ],

  // ─── 听句填空：播完整句 → 挖一词，4 韩文选项 ───
  cloze: [
    {
      id: 'd02-l2-c1',
      audioKo: '콜라 한 잔 주세요.',
      clozeParts: ['콜라 한 잔', '.'],
      choices: [
        { text: '이에요', correct: false },
        { text: '예요', correct: false },
        { text: '주세요', correct: true },
        { text: '감사합니다', correct: false },
      ],
      explain: '点单公式：N + (数量) + 주세요。此处挖的是句尾 주세요', explainEn: 'Ordering formula: N + (quantity) + 주세요. Here, we\'re testing the ending 주세요',
    },
    {
      id: 'd02-l2-c2',
      audioKo: '커피 한 잔 부탁드립니다.',
      clozeParts: ['커피 한', '부탁드립니다.'],
      choices: [
        { text: '개', correct: false },
        { text: '잔', correct: true },
        { text: '병', correct: false },
        { text: '그릇', correct: false },
      ],
      explain: '잔 = 杯（量词），专门数杯装饮料。개=个、병=瓶、그릇=碗', explainEn: '잔 = cup (counter), used for drinks in cups. 개 = piece, 병 = bottle, 그릇 = bowl',
    },
    {
      id: 'd02-l2-c3',
      audioKo: '아니요, 괜찮아요.',
      clozeParts: ['아니요, ', '.'],
      choices: [
        { text: '괜찮아요', correct: true },
        { text: '감사합니다', correct: false },
        { text: '죄송합니다', correct: false },
        { text: '안녕하세요', correct: false },
      ],
      explain: '괜찮아요 = 没关系。婉拒时 아니요 + 괜찮아요 是黄金搭档', explainEn: '괜찮아요 = it\'s fine. When declining, 아니요 + 괜찮아요 is the perfect combo',
    },
    {
      id: 'd02-l2-c4',
      audioKo: '오렌지 주스 주세요.',
      clozeParts: ['오렌지', '주세요.'],
      choices: [
        { text: '커피', correct: false },
        { text: '콜라', correct: false },
        { text: '주스', correct: true },
        { text: '물', correct: false },
      ],
      explain: '오렌지 주스 = 橙汁。오렌지(orange) + 주스(juice) 都是外来语', explainEn: '오렌지 주스 = orange juice. Both 오렌지 (orange) and 주스 (juice) are loanwords',
    },
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
    {
      id: 'd02-l2-r1',
      audioKo: '음료수 드릴까요?',
      promptZh: '空乘问你要不要饮料，你想要一杯可乐，应该说？', promptZhEn: 'The flight attendant asks if you\'d like a drink, and you want a cola. What should you say?',
      choices: [
        { text: '네, 콜라 한 잔 주세요.', correct: true },
        { text: '아니요, 저는 학생이에요.', correct: false },
        { text: '감사합니다, 안녕히 계세요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '"要饮料吗？"→ 想要就先说 네，再点具体饮料 + 주세요', explainEn: '\'Would you like a drink?\' → If yes, say 네 first, then order the specific drink + 주세요',
    },
    {
      id: 'd02-l2-r2',
      audioKo: '얼음 드릴까요?',
      promptZh: '空乘问你要不要冰块，你不想要，应该说？', promptZhEn: 'The flight attendant asks if you want ice, and you don\'t. What should you say?',
      choices: [
        { text: '네, 얼음 주세요.', correct: false },
        { text: '아니요, 괜찮아요.', correct: true },
        { text: '죄송합니다.', correct: false },
        { text: '메뉴 주세요.', correct: false },
      ],
      explain: '"要冰吗？"婉拒就用 아니요, 괜찮아요。用「죄송합니다（对不起）」拒绝会显得太严重', explainEn: '"Ice?" Politely decline with 아니요, 괜찮아요. Using 죄송합니다 (sorry) is too serious for refusing kindness',
    },
    {
      id: 'd02-l2-r3',
      audioKo: '여기 콜라입니다.',
      promptZh: '空乘把可乐递给你，你应该说？', promptZhEn: 'The flight attendant hands you a cola, what should you say?',
      choices: [
        { text: '아니요, 괜찮아요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
        { text: '감사합니다.', correct: true },
        { text: '저는 토리예요.', correct: false },
      ],
      explain: '收到东西一律 감사합니다。用「괜찮아요」= 不用了，语义相反', explainEn: 'Always say 감사합니다 when receiving something. Using 괜찮아요 means "no thanks," which is the opposite meaning',
    },
  ],
};
