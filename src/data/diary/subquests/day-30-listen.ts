import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 30 · 1-2 귀 트이기 · 听力子关卡
 * 素材：Day 30 主流程「月考+毕业」+ 补充毕业感言语料
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 지만 转折 + N 동안 + ㄹ게요 承诺
 */
export const day30Listen: ListenSubQuestData = {
  day: 30, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在 305 教室听清毕业的每一句话', subtitleEn: 'In room 305, hear every word of graduation clearly.',

  meaning: [
    {
      id: 'd30-l2-m1',
      audioKo: '토리 학생, 합격. 중급반으로 올라가세요.',
      choices: [
        { text: 'Tori 同学，合格。升入中级班。', textEn: 'Student Tori, you passed. You\'re moving up to the intermediate class.', correct: true },
        { text: 'Tori 同学，不合格。请重修。', textEn: 'Tori, you didn\'t pass. Please retake the course.', correct: false },
        { text: 'Tori 同学，考试取消了。', textEn: 'Tori, the exam is canceled.', correct: false },
        { text: 'Tori 同学，请下课回家。', textEn: 'Tori, class is over. Please go home.', correct: false },
      ],
      explain: '合격 + 중급반으로 올라가세요 · 毕业升级的正式宣布',
    },
    {
      id: 'd30-l2-m2',
      audioKo: '30일 전에 한국에 왔어요.',
      choices: [
        { text: '30 天前来到韩国。', textEn: 'I came to Korea 30 days ago.', correct: true },
        { text: '30 天后要来韩国。', textEn: 'I\'m coming to Korea in 30 days.', correct: false },
        { text: '在韩国待了 30 天。', textEn: 'I stayed in Korea for 30 days.', correct: false },
        { text: '30 号来韩国。', textEn: 'I\'m coming to Korea on the 30th.', correct: false },
      ],
      explain: '「N일 전에」+ 过去时 · 叙述起点的标准句', explainEn: '\'N일 전에\' + past tense · Standard sentence for describing a starting point.',
    },
    {
      id: 'd30-l2-m3',
      audioKo: '30일 동안 실수도 많았지만, 정말 행복했어요.',
      choices: [
        { text: '30 天犯过很多错，但真的很幸福。', textEn: 'Made many mistakes over 30 days, but truly happy.', correct: true },
        { text: '30 天没有失误，很幸福。', textEn: 'No mistakes in 30 days, very happy.', correct: false },
        { text: '30 天犯错，不幸福。', textEn: 'Made mistakes for 30 days, not happy.', correct: false },
        { text: '30 天没时间幸福。', textEn: 'No time to be happy for 30 days.', correct: false },
      ],
      explain: '지만 = 但是（转折）· N 동안 = 期间', explainEn: '지만 = but (contrast) · N 동안 = during/for (a period).',
    },
    {
      id: 'd30-l2-m4',
      audioKo: '앞으로도 잘 살게요.',
      choices: [
        { text: '今后也会好好生活。', textEn: 'I\'ll live well from now on.', correct: true },
        { text: '以前活得很好。', textEn: 'I used to live well.', correct: false },
        { text: '不打算再活了。', textEn: 'I don\'t plan to live anymore.', correct: false },
        { text: '今后不生活。', textEn: 'I won\'t live from now on.', correct: false },
      ],
      explain: '살다 → 살게요（ㄹ 词干 + ㄹ게요）· 承诺句', explainEn: '살다 → 살게요 (ㄹ stem + ㄹ게요) · Promise/commitment sentence.',
    },
    {
      id: 'd30-l2-m5',
      audioKo: '짐이 무거워요.',
      choices: [
        { text: '行李好重。', textEn: 'The luggage is heavy.', correct: true },
        { text: '家好重。', textEn: 'The house is heavy.', correct: false },
        { text: '心情好沉重。', textEn: 'My heart feels heavy.', correct: false },
        { text: '好累。', textEn: 'I\'m so tired.', correct: false },
      ],
      explain: '짐 = 行李。Day 3 曾说错为 「집이 무거워요」（家好重）', explainEn: '짐 = luggage. On Day 3, I mistakenly said \'집이 무거워요\' (the house is heavy).',
    },
  ],

  cloze: [
    {
      id: 'd30-l2-c1',
      audioKo: '실수도 많았지만 행복했어요.',
      clozeParts: ['실수도 많았', ' 행복했어요.'],
      choices: [
        { text: '지만', correct: true },
        { text: '고', correct: false },
        { text: '면', correct: false },
        { text: '서', correct: false },
      ],
      explain: 'V/A + 지만 = 但是（转折）· 直接接词干（不去 다）', explainEn: 'V/A + 지만 = but (contrast) · Attach directly to the stem (drop 다).',
    },
    {
      id: 'd30-l2-c2',
      audioKo: '30일 동안 행복했어요.',
      clozeParts: ['30일 ', ' 행복했어요.'],
      choices: [
        { text: '동안', correct: true },
        { text: '전에', correct: false },
        { text: '후에', correct: false },
        { text: '에서', correct: false },
      ],
      explain: 'N + 동안 = 期间。전에 = 之前，후에 = 之后', explainEn: 'N + 동안 = during/for. 전에 = before, 후에 = after.',
    },
    {
      id: 'd30-l2-c3',
      audioKo: '앞으로도 잘 살게요.',
      clozeParts: ['앞으로도 잘 ', '.'],
      choices: [
        { text: '살게요', correct: true },
        { text: '살아요', correct: false },
        { text: '살아있어요', correct: false },
        { text: '살아 봐요', correct: false },
      ],
      explain: '承诺"我会~" → V + ㄹ게요。살다 → 살게요', explainEn: 'Promise "I will~" → V + ㄹ게요. 살다 → 살게요',
    },
    {
      id: 'd30-l2-c4',
      audioKo: '30일 전에 한국에 왔어요.',
      clozeParts: ['30일 ', ' 한국에 왔어요.'],
      choices: [
        { text: '전에', correct: true },
        { text: '동안', correct: false },
        { text: '후에', correct: false },
        { text: '까지', correct: false },
      ],
      explain: '「N 전에」= N 之前。搭配过去时叙述起点', explainEn: '「N 전에」= before N. Use with past tense to mark the starting point of a narrative',
    },
  ],

  reply: [
    {
      id: 'd30-l2-r1',
      audioKo: '토리 학생, 합격. 중급반으로 올라가세요.',
      promptZh: '老师宣布你合格升级，你惊喜又感谢，最自然的一句？', promptZhEn: 'Your teacher announces you passed and are moving up. You\'re surprised and grateful—what\'s the most natural thing to say?',
      choices: [
        { text: '정말요? 감사합니다!', correct: true },
        { text: '싫어요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '正식宣布 → 정말요?（惊喜）+ 감사합니다（합쇼체感谢）',
    },
    {
      id: 'd30-l2-r2',
      audioKo: '한국 생활 어땠어요?',
      promptZh: '老师问你在韩国的生活怎么样，你想说"虽然失误多但很幸福"，最完整的一句？', promptZhEn: 'Your teacher asks how life in Korea is. You want to say "I made many mistakes but I\'m happy"—what\'s the most complete sentence?',
      choices: [
        { text: '실수도 많았지만 정말 행복했어요.', correct: true },
        { text: '실수 없어요.', correct: false },
        { text: '행복해요.', correct: false },
        { text: '아직 부족해요.', correct: false },
      ],
      explain: '过去时 + 지만 转折 · 回顾感言标准结构', explainEn: 'Past tense + 지만 for contrast · standard structure for reflective remarks',
    },
    {
      id: 'd30-l2-r3',
      audioKo: '중급반에서도 잘하세요.',
      promptZh: '老师祝你在中级班也顺利，你想承诺"今后也会好好生活"，最合适的一句？', promptZhEn: 'Your teacher wishes you well in the intermediate class. You want to promise "I\'ll live well from now on"—what\'s the most fitting sentence?',
      choices: [
        { text: '네, 앞으로도 잘 살게요.', correct: true },
        { text: '싫어요.', correct: false },
        { text: '몰라요.', correct: false },
        { text: '얼마예요?', correct: false },
      ],
      explain: '收到祝福 → 承诺 앞으로도 잘 살게요', explainEn: 'Received well-wishes → promise 앞으로도 잘 살게요',
    },
  ],
};
