import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 15 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 15 主流程「泡面墙 + Haru 教做菜」
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 ~고 싶어요 / ~을래요 双句型
 */
export const day15Listen: ListenSubQuestData = {
  day: 15, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在宿舍 301 号房，听清做菜决心的每一句',

  meaning: [
    {
      id: 'd15-l2-m1',
      audioKo: '요리 배우고 싶어요.',
      choices: [
        { text: '想学做菜。', correct: true },
        { text: '正在学做菜。', correct: false },
        { text: '要教做菜。', correct: false },
        { text: '不喜欢做菜。', correct: false },
      ],
      explain: '요리(料理) + 배우다(学) + 고 싶어요(想做) = 想学做菜',
    },
    {
      id: 'd15-l2-m2',
      audioKo: '라면 그만 먹을래요.',
      choices: [
        { text: '不再吃泡面了。', correct: true },
        { text: '想再吃泡面。', correct: false },
        { text: '不吃泡面吗？', correct: false },
        { text: '泡面卖完了。', correct: false },
      ],
      explain: '그만(到此为止) + 먹다(吃) + 을래요(意愿) = 不再吃了。Tori 的决心',
    },
    {
      id: 'd15-l2-m3',
      audioKo: '이거 벽이야. 라면 벽.',
      choices: [
        { text: '这是墙。泡面墙。（반말）', correct: true },
        { text: '这堵墙很硬。', correct: false },
        { text: '这里没有墙。', correct: false },
        { text: '再吃一碗泡面。', correct: false },
      ],
      explain: 'Haru 반말："이거 벽이야"（这是墙）。이거 + 벽 + 이야（반말"是"）',
    },
    {
      id: 'd15-l2-m4',
      audioKo: '다음 주부터.',
      choices: [
        { text: '从下周开始。', correct: true },
        { text: '一直到下周。', correct: false },
        { text: '下周结束。', correct: false },
        { text: '每周一次。', correct: false },
      ],
      explain: '다음 주(下周) + 부터(从~开始)。约定开课的时间',
    },
    {
      id: 'd15-l2-m5',
      audioKo: '뭐 먹을래요?',
      choices: [
        { text: '你想吃什么？', correct: true },
        { text: '你吃了什么？', correct: false },
        { text: '想吃吗？', correct: false },
        { text: '一起吃吧。', correct: false },
      ],
      explain: '뭐(什么) + 먹다 + 을래요?（意愿疑问）。朋友间约饭的最常见问句',
    },
  ],

  cloze: [
    {
      id: 'd15-l2-c1',
      audioKo: '요리 배우고 싶어요.',
      clozeParts: ['요리 ', '.'],
      choices: [
        { text: '배우고 싶어요', correct: true },
        { text: '배워요', correct: false },
        { text: '가르쳐요', correct: false },
        { text: '먹어요', correct: false },
      ],
      explain: '배우다 + 고 싶어요 = 想学。表达愿望',
    },
    {
      id: 'd15-l2-c2',
      audioKo: '라면 그만 먹을래요.',
      clozeParts: ['라면 그만 ', '.'],
      choices: [
        { text: '먹을래요', correct: true },
        { text: '먹어요', correct: false },
        { text: '먹고 싶어요', correct: false },
        { text: '먹었어요', correct: false },
      ],
      explain: '먹다(有받침) + 을래요 = 决心/意愿。「그만 + V을래요」= 不再做~',
    },
    {
      id: 'd15-l2-c3',
      audioKo: '같이 요리할래요?',
      clozeParts: ['같이 ', '?'],
      choices: [
        { text: '요리할래요', correct: true },
        { text: '요리해요', correct: false },
        { text: '요리하고 있어요', correct: false },
        { text: '요리했어요', correct: false },
      ],
      explain: '요리하다(无받침) + ㄹ래요 = 할래요。「같이 ~할래요?」= 一起做~吗？（邀请）',
    },
    {
      id: 'd15-l2-c4',
      audioKo: '하루야, 요리 가르쳐 줘.',
      clozeParts: ['하루야, 요리 ', '.'],
      choices: [
        { text: '가르쳐 줘', correct: true },
        { text: '배워 줘', correct: false },
        { text: '먹어 줘', correct: false },
        { text: '만들어 줘', correct: false },
      ],
      explain: '가르치다 + 어 줘(반말"请给我") = 教我。반말请求朋友帮忙',
    },
  ],

  reply: [
    {
      id: 'd15-l2-r1',
      audioKo: '토리… 이거 벽이야. 라면 벽.',
      promptZh: 'Haru 반말说"这是墙。泡面墙。"你想承认并求她教做菜，应该？',
      choices: [
        { text: '하루야, 요리 가르쳐 줘.', correct: true },
        { text: '아니야, 벽이 아니야.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '괜찮아요, 감사합니다.', correct: false },
      ],
      explain: '반말对반말：하루야(呼语) + 요리 가르쳐 줘(教我做菜吧)',
    },
    {
      id: 'd15-l2-r2',
      audioKo: '뭐 먹을래?',
      promptZh: 'Junho 반말问"想吃什么？"你想说"随便，你决定"，最自然的一句？',
      choices: [
        { text: '아무거나 좋아. 네가 정해.', correct: true },
        { text: '없어요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '아무거나(随便) + 좋아(可以) + 네가 정해(你决定)。반말朋友约饭套路',
    },
    {
      id: 'd15-l2-r3',
      audioKo: '요리 가르쳐 줄까?',
      promptZh: 'Haru 반말问"要我教你做菜吗？"你想欣然接受，应该？',
      choices: [
        { text: '응, 진짜 배우고 싶어.', correct: true },
        { text: '아니요, 괜찮아요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '몰라요.', correct: false },
      ],
      explain: '응(嗯·반말"是") + 진짜(真的) + 배우고 싶어(想学·반말)。朋友间接受帮助',
    },
  ],
};
