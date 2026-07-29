import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 10 · 1-5 Boss 战 · 있어요/없어요 综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 11：다이소 · 이거/그거/저거 升级 + 数量组合
 */
export const day10Boss: BossSubQuestData = {
  day: 10, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '식당通关 · 从「있어요?」到「잘 먹었습니다」',
  intro: '中午 12:20，最后三分钟窗口关门。你端着空餐盘，肚子饱、鼻子还有点辣。袋鼠阿姨在收餐盘。这一顿——第一顿在韩国自己点的饭——你还没道别。',
  outroHook: '通过！Junho 在食堂角落挥手：「다이소 가자! 거기서 다 있어!」宿舍清单一堆没买——샴푸、수건、슬리퍼。下一关 다이소 千元百货，「이거/그거/저거」要升级。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd10-b5-t1',
        audioKo: '김치찌개 있어요?',
        choices: [
          { text: '有泡菜汤吗？', correct: true },
          { text: '有大酱汤吗？', correct: false },
          { text: '泡菜汤好吃吗？', correct: false },
          { text: '泡菜汤多少钱？', correct: false },
        ],
        explain: '菜名 + 있어요? = 有~吗？点单前先确认',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd10-b5-t2',
        audioKo: '오늘 없어요.',
        choices: [
          { text: '今天有。', correct: false },
          { text: '今天没有。', correct: true },
          { text: '今天好吃。', correct: false },
          { text: '今天没关系。', correct: false },
        ],
        explain: '없어요 实际发音 [업써요]（ㅄ 双收音只发左边 ㅂ，右边 ㅅ 触发紧音）',
      },
    },
    {
      type: 'choice',
      label: '助词改错',
      task: {
        id: 'd10-b5-t3',
        promptZh: '"有时间吗？"哪句正确？',
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
      label: '认词',
      task: {
        id: 'd10-b5-t4',
        promptKo: '맛있어요',
        promptHangul: 'ma-si-sseo-yo',
        choices: [
          { text: '好吃', correct: true },
          { text: '不好吃', correct: false },
          { text: '好看', correct: false },
          { text: '好听', correct: false },
        ],
        explain: '맛(味) + 있다(有) 合成 → 맛있다 → 맛있어요。同理 재미있다(有趣)。反义 맛없다(不好吃)',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd10-b5-t5',
        zhHint: '那，请给我大酱汤。',
        audioKo: '그럼 된장찌개 주세요.',
        answer: ['그럼', '된장찌개', '주세요.'],
        tokens: ['그럼', '된장찌개', '주세요.', '그래서', '김치찌개', '있어요?'],
        explain: '그럼 = 那(顺承)。「그럼 ~ 주세요」是餐厅万能替换句',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd10-b5-t6',
        zhHint: '真的好好吃！',
        audioKo: '진짜 맛있어요!',
        answer: ['진짜', '맛있어요!'],
        tokens: ['진짜', '맛있어요!', '맛없어요!', '없어요!', '괜찮아요!', '진짜'],
        explain: '진짜(真的) + 맛있어요(好吃)。加 진짜 加强感叹',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd10-b5-t7',
        audioKo: '오늘 뭐 드릴까요?',
        promptZh: '袋鼠阿姨问"今天给您什么？"你想点泡菜汤，应该？',
        choices: [
          { text: '김치찌개 주세요.', correct: true },
          { text: '얼마예요?', correct: false },
          { text: '없어요.', correct: false },
          { text: '괜찮아요.', correct: false },
        ],
        explain: '点单公式：菜名 + 주세요。김치찌개 + 주세요 = 请给我泡菜汤',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd10-b5-t8',
        promptZh: '你把空餐盘还给阿姨，想按韩国餐桌礼仪说"我吃好了"，应该？',
        choices: [
          { text: '잘 먹었습니다.', correct: true },
          { text: '만나서 반가워요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '없어요.', correct: false },
        ],
        explain: '「잘 먹었습니다」直译"我吃得很好"——韩国餐后必说。跟餐前 「잘 먹겠습니다」一对',
      },
    },
  ],
};
