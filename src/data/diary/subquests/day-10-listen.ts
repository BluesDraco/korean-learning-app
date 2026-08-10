import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 10 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 10 主流程学校 식당场景
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 있어요/없어요 助词搭配，reply 铺 아줌마 应对
 */
export const day10Listen: ListenSubQuestData = {
  day: 10, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在学校食堂窗口，听清"有什么/没什么"', subtitleEn: 'At the school cafeteria counter, listen carefully for "what\'s available / what\'s not."',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd10-l2-m1',
      audioKo: '김치찌개 있어요?',
      choices: [
        { text: '有泡菜汤吗？', textEn: 'Do you have kimchi stew?', correct: true },
        { text: '有大酱汤吗？', textEn: 'Is there doenjang stew?', correct: false },
        { text: '泡菜汤好吃吗？', textEn: 'Is the kimchi stew good?', correct: false },
        { text: '泡菜汤没有。', textEn: 'There\'s no kimchi stew.', correct: false },
      ],
      explain: '김치찌개(泡菜汤) + 있어요?（有吗·句末升调）。是非疑问句形与陈述句同，只靠语调', explainEn: '김치찌개 (kimchi stew) + 있어요? (Is there any? with rising intonation at the end). Yes/no questions have the same form as statements; only intonation differs.',
    },
    {
      id: 'd10-l2-m2',
      audioKo: '오늘 없어요.',
      choices: [
        { text: '今天有。', textEn: 'We have it today.', correct: false },
        { text: '今天没有。', textEn: 'Not today.', correct: true },
        { text: '今天好吃。', textEn: 'It\'s delicious today.', correct: false },
        { text: '今天没关系。', textEn: 'It\'s okay today.', correct: false },
      ],
      explain: '없어요 实际发音 [업써요]。「ㅄ」是双收音，只发左边的 ㅂ', explainEn: '없어요 is actually pronounced [업써요]. 「ㅄ」 is a double batchim; only the left ㅂ is pronounced.',
    },
    {
      id: 'd10-l2-m3',
      audioKo: '진짜 맛있어요!',
      choices: [
        { text: '真的好吃！', textEn: 'It\'s really delicious!', correct: true },
        { text: '真的没味道！', textEn: 'It really has no taste!', correct: false },
        { text: '真的辣！', textEn: 'It\'s really spicy!', correct: false },
        { text: '真的贵！', textEn: 'It\'s really expensive!', correct: false },
      ],
      explain: '진짜(真的) + 맛있어요(好吃)。맛(味) + 있다(有) = 有味道 = 好吃。四音节连读 [진짜 마시써요]', explainEn: '진짜 (really) + 맛있어요 (delicious). 맛 (taste) + 있다 (have) = has taste = delicious. Four-syllable liaison [진짜 마시써요]',
    },
    {
      id: 'd10-l2-m4',
      audioKo: '오늘 뭐 드릴까요?',
      choices: [
        { text: '今天给您什么？', textEn: 'What can I get you today?', correct: true },
        { text: '今天几点结束？', textEn: 'What time does it end today?', correct: false },
        { text: '今天贵吗？', textEn: 'Is it expensive today?', correct: false },
        { text: '今天好吃吗？', textEn: 'Is it delicious today?', correct: false },
      ],
      explain: '뭐(什么) + 드릴까요?（给您·敬语疑问）。「드리다」是「주다」(给) 的敬语。食堂/餐厅招呼语', explainEn: '뭐 (what) + 드릴까요? (shall I give you? honorific question). 드리다 is the honorific of 주다 (to give). A greeting used in cafeterias/restaurants',
    },
    {
      id: 'd10-l2-m5',
      audioKo: '된장찌개도 맛있어요.',
      choices: [
        { text: '大酱汤不好吃。', textEn: 'The soybean paste stew isn\'t delicious.', correct: false },
        { text: '大酱汤也好吃。', textEn: 'The soybean paste stew is delicious too.', correct: true },
        { text: '大酱汤没有。', textEn: 'There\'s no soybean paste stew.', correct: false },
        { text: '大酱汤太辣。', textEn: 'The soybean paste stew is too spicy.', correct: false },
      ],
      explain: '된장찌개(大酱汤) + 도(也) + 맛있어요(好吃)。도 = 也，粘在名词后', explainEn: '된장찌개 (soybean paste stew) + 도 (also) + 맛있어요 (delicious). 도 = also, attached after a noun',
    },
  ],

  // ─── 听句填空：播完整句 → 挖一词，4 韩文选项 ───
  cloze: [
    {
      id: 'd10-l2-c1',
      audioKo: '시간 있어요?',
      clozeParts: ['시간 ', '?'],
      choices: [
        { text: '있어요', correct: true },
        { text: '없어요', correct: false },
        { text: '좋아요', correct: false },
        { text: '몰라요', correct: false },
      ],
      explain: '시간 있어요? = 有时间吗？问别人是否有空的最常用句。是非疑问只靠升调', explainEn: '시간 있어요? = Do you have time? The most common way to ask if someone is free. Yes/no questions rely only on rising intonation',
    },
    {
      id: 'd10-l2-c2',
      audioKo: '문제없어요!',
      clozeParts: ['문제', '!'],
      choices: [
        { text: '없어요', correct: true },
        { text: '있어요', correct: false },
        { text: '많아요', correct: false },
        { text: '좋아요', correct: false },
      ],
      explain: '문제(问题) + 없어요 = 没问题。回答确认/安慰时的固定搭配', explainEn: '문제 (problem) + 없어요 = no problem. A fixed phrase for confirming or reassuring.',
    },
    {
      id: 'd10-l2-c3',
      audioKo: '그럼 된장찌개 주세요.',
      clozeParts: ['', '된장찌개 주세요.'],
      choices: [
        { text: '그럼', correct: true },
        { text: '그리고', correct: false },
        { text: '그래서', correct: false },
        { text: '그런데', correct: false },
      ],
      explain: '그럼 = 那(顺承·"既然如此")。「그럼 ~ 주세요」= 那就请给我 ~。听到对方拒绝/建议后接受时用', explainEn: '그럼 = then (consequential, "in that case"). 그럼 ~ 주세요 = Then please give me ~. Used when accepting after hearing a refusal or suggestion',
    },
    {
      id: 'd10-l2-c4',
      audioKo: '어제 집에 있었어요.',
      clozeParts: ['어제 집에 ', '.'],
      choices: [
        { text: '있었어요', correct: true },
        { text: '있어요', correct: false },
        { text: '없어요', correct: false },
        { text: '갔어요', correct: false },
      ],
      explain: '있다 过去式 → 있었어요。있 + 었 + 어요。「어제 집에 있었어요」= 昨天在家', explainEn: '있다 past tense → 있었어요. 있 + 었 + 어요. 어제 집에 있었어요 = I was home yesterday',
    },
  ],

  // ─── 听对话选回应 ───
  reply: [
    {
      id: 'd10-l2-r1',
      audioKo: '오늘 뭐 드릴까요?',
      promptZh: '袋鼠阿姨问"今天给您什么？"你想点泡菜汤，应该？', promptZhEn: 'Auntie Kangaroo asks, "What can I get you today?" You want to order kimchi stew. What should you say?',
      choices: [
        { text: '김치찌개 주세요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '없어요.', correct: false },
        { text: '보고 싶어요.', correct: false },
      ],
      explain: '点单公式：菜名 + 주세요。김치찌개(泡菜汤) + 주세요 = 请给我泡菜汤', explainEn: 'Ordering formula: dish name + 주세요. 김치찌개 (kimchi stew) + 주세요 = Please give me kimchi stew',
    },
    {
      id: 'd10-l2-r2',
      audioKo: '김치찌개 있어요?',
      promptZh: '客人问"有泡菜汤吗？"今天真的卖完了，你（店员）应该？', promptZhEn: 'A customer asks "Do you have kimchi stew?" It\'s really sold out today. What should you (the staff) say?',
      choices: [
        { text: '네, 있어요.', correct: false },
        { text: '아니요, 오늘 없어요.', correct: true },
        { text: '괜찮아요.', correct: false },
        { text: '몰라요.', correct: false },
      ],
      explain: '「있어요?」的否定答法：아니요, 없어요（不，没有）。「오늘 없어요」= 今天没有，是委婉说"卖完了"', explainEn: 'The negative answer to 있어요? is: 아니요, 없어요 (No, there isn\'t). 오늘 없어요 = Not today, a polite way to say "sold out"',
    },
    {
      id: 'd10-l2-r3',
      audioKo: '된장찌개 있어요. 어떠세요?',
      promptZh: '阿姨说"有大酱汤，您觉得怎么样？"你决定改点这个，应该？', promptZhEn: 'The auntie says "We have soybean paste stew, how about it?" You decide to switch to this. What should you say?',
      choices: [
        { text: '그럼 된장찌개 주세요.', correct: true },
        { text: '아니요, 없어요.', correct: false },
        { text: '얼마예요? 얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '「그럼 ~ 주세요」= 那就请给我 ~。听到对方建议后转换接受的标准句', explainEn: '그럼 ~ 주세요 = Then please give me ~. The standard phrase to accept after hearing a suggestion',
    },
  ],
};
