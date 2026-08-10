import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 15 · 1-5 Boss 战 · ~고 싶어요 / ~을래요 综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 16：부동산 · 找房子进行时 ~고 있어요
 */
export const day15Boss: BossSubQuestData = {
  day: 15, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '泡面墙通关 · 用韩语说出决心', subtitleEn: 'Ramen Wall Cleared · Declare Your Resolve in Korean',
  intro: '角落十四个泡面盒还没扔。Haru 靠在门口，等你说下一句。这一句要用韩语——不是"我想再吃"，是"我不再吃了"。Boss 战开始。', introEn: 'Fourteen ramen cups still sit in the corner. Haru leans by the door, waiting for your next line. This one has to be in Korean—not "I want to eat more," but "I won\'t eat anymore." The boss battle begins.',
  outroHook: '通过！Haru 说下周开课。你把泡面盒装袋扔到走廊回收箱。明天周六，Junho 提醒你宿舍合同 2 月到期——是时候找房子了。下一关：부동산（房产中介）。「원룸 찾고 있어요」（我正在找一居室），你已经能说了吗？', outroHookEn: 'Passed! Haru says class starts next week. You bag the ramen cups and toss them in the hallway recycling bin. Tomorrow\'s Saturday, and Junho reminds you your dorm contract expires in February—time to find a place. Next level: 부동산 (real estate agency). 「원룸 찾고 있어요」 (I\'m looking for a studio), can you say it yet?',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd15-b5-t1',
        audioKo: '요리 배우고 싶어요.',
        choices: [
          { text: '想学做菜。', textEn: 'I want to learn to cook.', correct: true },
          { text: '正在学做菜。', textEn: 'I\'m learning to cook.', correct: false },
          { text: '想教做菜。', textEn: 'I want to teach cooking.', correct: false },
          { text: '不喜欢做菜。', textEn: 'I don\'t like cooking.', correct: false },
        ],
        explain: '요리 + 배우다 + 고 싶어요 = 想学做菜', explainEn: '요리 + 배우다 + 고 싶어요 = want to learn cooking',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd15-b5-t2',
        audioKo: '라면 그만 먹을래요.',
        choices: [
          { text: '不再吃泡面了。', textEn: 'I\'m not eating ramen anymore.', correct: true },
          { text: '想再吃泡面。', textEn: 'I want to eat ramen again.', correct: false },
          { text: '一起吃泡面吗？', textEn: 'Want to eat ramen together?', correct: false },
          { text: '泡面卖完了。', textEn: 'The ramen is sold out.', correct: false },
        ],
        explain: '그만 + 먹다 + 을래요 = 不再吃了。Tori 的决心', explainEn: '그만 + 먹다 + 을래요 = not eating anymore. Tori\'s resolve',
      },
    },
    {
      type: 'choice',
      label: '形态改错', labelEn: 'Fix the form',
      task: {
        id: 'd15-b5-t3',
        promptZh: '"一起去吗？"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "Want to go together?"',
        choices: [
          { text: '같이 가을래요?', correct: false },
          { text: '같이 갈래요?', correct: true },
          { text: '같이 가ㄹ래요?', correct: false },
          { text: '같이 가는래요?', correct: false },
        ],
        explain: '가다 无받침 → ㄹ래요 直接接 → 갈래요',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd15-b5-t4',
        promptKo: '그만',
        promptHangul: 'geu-man',
        choices: [
          { text: '到此为止 / 不再', textEn: 'That\'s it / no more', correct: true },
          { text: '继续', textEn: 'Continue', correct: false },
          { text: '再一次', textEn: 'One more time', correct: false },
          { text: '一起', textEn: 'together', correct: false },
        ],
        explain: '그만 = 到此为止（副词）。「그만 + V을래요」表决心', explainEn: '그만 = that\'s it (adverb). 「그만 + V을래요」 shows determination',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd15-b5-t5',
        zhHint: '想学做菜。', zhHintEn: 'I want to learn to cook.',
        audioKo: '요리 배우고 싶어요.',
        answer: ['요리', '배우고', '싶어요.'],
        tokens: ['요리', '배우고', '싶어요.', '배워요.', '배울래요.', '가르치고'],
        explain: '배우다 + 고 싶어요 = 想学。愿望表达', explainEn: '배우다 + 고 싶어요 = want to learn. Expressing wishes',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd15-b5-t6',
        zhHint: '不再吃泡面了。', zhHintEn: 'I\'m not eating ramen anymore.',
        audioKo: '라면 그만 먹을래요.',
        answer: ['라면', '그만', '먹을래요.'],
        tokens: ['라면', '그만', '먹을래요.', '먹고', '싶어요.', '더', '먹었어요.'],
        explain: '「그만 + V을래요」= 不再做~。먹다(有받침) → 먹을래요',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd15-b5-t7',
        audioKo: '토리… 이거 벽이야. 라면 벽.',
        promptZh: 'Haru 반말说"这是墙。泡面墙。"你想求她教你做菜，应该？', promptZhEn: 'Haru says in 반말, "This is a wall. A ramen wall." You want to beg her to teach you cooking, what should you say?',
        choices: [
          { text: '하루야, 요리 가르쳐 줘.', correct: true },
          { text: '아니야, 벽이 아니야.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '괜찮아요, 감사합니다.', correct: false },
        ],
        explain: '반말对반말：呼语 + 请求。「가르쳐 줘」= 教我吧', explainEn: '반말 to 반말: vocative + request. 「가르쳐 줘」= teach me',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd15-b5-t8',
        promptZh: '朋友问 「뭐 먹을래?」（你想吃什么？）你想吃有营养的，最自然的答法？', promptZhEn: 'A friend asks 「뭐 먹을래?」 (What do you want to eat?) You want something nutritious, what\'s the most natural reply?',
        choices: [
          { text: '몸에 좋은 거 먹을래.', correct: true },
          { text: '라면 먹을래요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '반말对반말：몸에 좋은 거(对身体好的·母语者常用) + 먹을래', explainEn: '반말 to 반말: 몸에 좋은 거 (good for you, common among native speakers) + 먹을래',
      },
    },
  ],
};
