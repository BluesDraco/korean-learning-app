import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 10 · 1-5 Boss 战 · 있어요/없어요 综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 11：다이소 · 이거/그거/저거 升级 + 数量组合
 */
export const day10Boss: BossSubQuestData = {
  day: 10, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '식당通关 · 从「있어요?」到「잘 먹었습니다」', subtitleEn: 'Restaurant Level-Up · From "있어요?" to "잘 먹었습니다"',
  intro: '中午 12:20，最后三分钟窗口关门。你端着空餐盘，肚子饱、鼻子还有点辣。袋鼠阿姨在收餐盘。这一顿——第一顿在韩国自己点的饭——你还没道别。', introEn: '12:20 PM, the window closes in three minutes. You\'re holding an empty tray, full stomach, nose still a bit tingly. The ajumma is clearing trays. This meal—your first self-ordered meal in Korea—you haven\'t said goodbye yet.',
  outroHook: '通过！Junho 在食堂角落挥手：「다이소 가자! 거기서 다 있어!」宿舍清单一堆没买——샴푸、수건、슬리퍼。下一关 다이소 千元百货，「이거/그거/저거」要升级。', outroHookEn: 'Passed! Junho waves from the corner of the cafeteria: "다이소 가자! 거기서 다 있어!" A bunch of dorm list items still unbought—샴푸, 수건, 슬리퍼. Next level: Daiso\'s thousand-won shop, where "이거/그거/저거" needs an upgrade.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd10-b5-t1',
        audioKo: '김치찌개 있어요?',
        choices: [
          { text: '有泡菜汤吗？', textEn: 'Do you have kimchi stew?', correct: true },
          { text: '有大酱汤吗？', textEn: 'Is there doenjang stew?', correct: false },
          { text: '泡菜汤好吃吗？', textEn: 'Is the kimchi stew good?', correct: false },
          { text: '泡菜汤多少钱？', textEn: 'How much is the kimchi stew?', correct: false },
        ],
        explain: '菜名 + 있어요? = 有~吗？点单前先确认', explainEn: 'Dish name + 있어요? = Is there ~? Confirm before ordering.',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd10-b5-t2',
        audioKo: '오늘 없어요.',
        choices: [
          { text: '今天有。', textEn: 'We have it today.', correct: false },
          { text: '今天没有。', textEn: 'Not today.', correct: true },
          { text: '今天好吃。', textEn: 'It\'s delicious today.', correct: false },
          { text: '今天没关系。', textEn: 'It\'s okay today.', correct: false },
        ],
        explain: '없어요 实际发音 [업써요]（ㅄ 双收音只发左边 ㅂ，右边 ㅅ 触发紧音）', explainEn: '없어요 is actually pronounced [업써요] (the ㅄ double final consonant only sounds the left ㅂ; the right ㅅ triggers a tense sound).',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd10-b5-t3',
        promptZh: '"有时间吗？"哪句正确？', promptZhEn: 'Which is correct for "Do you have time?"',
        choices: [
          { text: '시간를 있어요?', correct: false },
          { text: '시간이 있어요?', correct: true },
          { text: '시간에 있어요?', correct: false },
          { text: '시간이 있다?', correct: false },
        ],
        explain: '있어요/없어요 前用**主格 이/가**，不是宾格 을/를。시간 有받침 ㄴ → 이',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd10-b5-t4',
        promptKo: '맛있어요',
        promptHangul: 'ma-si-sseo-yo',
        choices: [
          { text: '好吃', textEn: 'delicious', correct: true },
          { text: '不好吃', textEn: 'Not tasty', correct: false },
          { text: '好看', textEn: 'Good-looking', correct: false },
          { text: '好听', textEn: 'Nice to listen to', correct: false },
        ],
        explain: '맛(味) + 있다(有) 合成 → 맛있다 → 맛있어요。同理 재미있다(有趣)。反义 맛없다(不好吃)', explainEn: '맛 (taste) + 있다 (to have) combine → 맛있다 → 맛있어요. Same for 재미있다 (fun). Opposite: 맛없다 (not tasty)',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd10-b5-t5',
        zhHint: '那，请给我大酱汤。', zhHintEn: 'Then, please give me soybean paste stew.',
        audioKo: '그럼 된장찌개 주세요.',
        answer: ['그럼', '된장찌개', '주세요.'],
        tokens: ['그럼', '된장찌개', '주세요.', '그래서', '김치찌개', '있어요?'],
        explain: '그럼 = 那(顺承)。「그럼 ~ 주세요」是餐厅万能替换句', explainEn: '그럼 = then (transition). "그럼 ~ 주세요" is the all-purpose restaurant substitution phrase',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd10-b5-t6',
        zhHint: '真的好好吃！', zhHintEn: 'It\'s really delicious!',
        audioKo: '진짜 맛있어요!',
        answer: ['진짜', '맛있어요!'],
        tokens: ['진짜', '맛있어요!', '맛없어요!', '없어요!', '괜찮아요!', '진짜'],
        explain: '진짜(真的) + 맛있어요(好吃)。加 진짜 加强感叹', explainEn: '진짜 (really) + 맛있어요 (delicious). Adding 진짜 intensifies the exclamation',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd10-b5-t7',
        audioKo: '오늘 뭐 드릴까요?',
        promptZh: '袋鼠阿姨问"今天给您什么？"你想点泡菜汤，应该？', promptZhEn: 'Auntie Kangaroo asks, "What can I get you today?" You want to order kimchi stew. What should you say?',
        choices: [
          { text: '김치찌개 주세요.', correct: true },
          { text: '얼마예요?', correct: false },
          { text: '없어요.', correct: false },
          { text: '괜찮아요.', correct: false },
        ],
        explain: '点单公式：菜名 + 주세요。김치찌개 + 주세요 = 请给我泡菜汤', explainEn: 'Ordering formula: dish name + 주세요. 김치찌개 + 주세요 = Please give me kimchi stew',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd10-b5-t8',
        promptZh: '你把空餐盘还给阿姨，想按韩国餐桌礼仪说"我吃好了"，应该？', promptZhEn: 'You return your empty tray to Auntie and want to say "I\'m done eating" per Korean table etiquette. What should you say?',
        choices: [
          { text: '잘 먹었습니다.', correct: true },
          { text: '만나서 반가워요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '없어요.', correct: false },
        ],
        explain: '「잘 먹었습니다」直译"我吃得很好"——韩国餐后必说。跟餐前 「잘 먹겠습니다」一对', explainEn: '잘 먹었습니다 literally means "I ate well" — a must-say after meals in Korea. It pairs with the pre-meal 잘 먹겠습니다',
      },
    },
  ],
};
