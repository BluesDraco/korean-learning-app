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
  subtitle: '在宿舍 301 号房，听清做菜决心的每一句', subtitleEn: 'In dorm room 301, catch every word of the cooking resolution.',

  meaning: [
    {
      id: 'd15-l2-m1',
      audioKo: '요리 배우고 싶어요.',
      choices: [
        { text: '想学做菜。', textEn: 'I want to learn to cook.', correct: true },
        { text: '正在学做菜。', textEn: 'I\'m learning to cook.', correct: false },
        { text: '要教做菜。', textEn: 'I\'m going to teach cooking.', correct: false },
        { text: '不喜欢做菜。', textEn: 'I don\'t like cooking.', correct: false },
      ],
      explain: '요리(料理) + 배우다(学) + 고 싶어요(想做) = 想学做菜', explainEn: '요리 (cooking) + 배우다 (to learn) + 고 싶어요 (want to) = want to learn cooking',
    },
    {
      id: 'd15-l2-m2',
      audioKo: '라면 그만 먹을래요.',
      choices: [
        { text: '不再吃泡面了。', textEn: 'I\'m not eating ramen anymore.', correct: true },
        { text: '想再吃泡面。', textEn: 'I want to eat ramen again.', correct: false },
        { text: '不吃泡面吗？', textEn: 'Not eating ramen?', correct: false },
        { text: '泡面卖完了。', textEn: 'The ramen is sold out.', correct: false },
      ],
      explain: '그만(到此为止) + 먹다(吃) + 을래요(意愿) = 不再吃了。Tori 的决心', explainEn: '그만 (stop here) + 먹다 (to eat) + 을래요 (intention) = won\'t eat anymore. Tori\'s resolution.',
    },
    {
      id: 'd15-l2-m3',
      audioKo: '이거 벽이야. 라면 벽.',
      choices: [
        { text: '这是墙。泡面墙。（반말）', textEn: 'This is a wall. A ramen wall. (반말)', correct: true },
        { text: '这堵墙很硬。', textEn: 'This wall is hard.', correct: false },
        { text: '这里没有墙。', textEn: 'There\'s no wall here.', correct: false },
        { text: '再吃一碗泡面。', textEn: 'Eat one more bowl of ramen.', correct: false },
      ],
      explain: 'Haru 반말："이거 벽이야"（这是墙）。이거 + 벽 + 이야（반말"是"）', explainEn: 'Haru\'s 반말: "이거 벽이야" (this is a wall). 이거 + 벽 + 이야 (반말 for \'is\')',
    },
    {
      id: 'd15-l2-m4',
      audioKo: '다음 주부터.',
      choices: [
        { text: '从下周开始。', textEn: 'Starting next week.', correct: true },
        { text: '一直到下周。', textEn: 'Until next week.', correct: false },
        { text: '下周结束。', textEn: 'Ends next week.', correct: false },
        { text: '每周一次。', textEn: 'Once a week.', correct: false },
      ],
      explain: '다음 주(下周) + 부터(从~开始)。约定开课的时间', explainEn: '다음 주 (next week) + 부터 (from~). The time agreed for the class to start.',
    },
    {
      id: 'd15-l2-m5',
      audioKo: '뭐 먹을래요?',
      choices: [
        { text: '你想吃什么？', textEn: 'What do you want to eat?', correct: true },
        { text: '你吃了什么？', textEn: 'What did you eat?', correct: false },
        { text: '想吃吗？', textEn: 'Want to eat?', correct: false },
        { text: '一起吃吧。', textEn: 'Let\'s eat together.', correct: false },
      ],
      explain: '뭐(什么) + 먹다 + 을래요?（意愿疑问）。朋友间约饭的最常见问句', explainEn: '뭐 (what) + 먹다 + 을래요? (intention question). The most common way to ask a friend to eat.',
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
      explain: '배우다 + 고 싶어요 = 想学。表达愿望', explainEn: '배우다 + 고 싶어요 = want to learn. Expressing desire.',
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
      explain: '가르치다 + 어 줘(반말"请给我") = 教我。반말请求朋友帮忙', explainEn: '가르치다 + 어 줘 (casual "please give me") = teach me. Casual request for a friend\'s help',
    },
  ],

  reply: [
    {
      id: 'd15-l2-r1',
      audioKo: '토리… 이거 벽이야. 라면 벽.',
      promptZh: 'Haru 반말说"这是墙。泡面墙。"你想承认并求她教做菜，应该？', promptZhEn: 'Haru says casually, "This is a wall. A ramen wall." You want to admit it and ask her to teach you cooking. What should you say?',
      choices: [
        { text: '하루야, 요리 가르쳐 줘.', correct: true },
        { text: '아니야, 벽이 아니야.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '괜찮아요, 감사합니다.', correct: false },
      ],
      explain: '반말对반말：하루야(呼语) + 요리 가르쳐 줘(教我做菜吧)', explainEn: 'Casual to casual: Haru-ya (vocative) + yori gareuchyeo jwo (teach me to cook)',
    },
    {
      id: 'd15-l2-r2',
      audioKo: '뭐 먹을래?',
      promptZh: 'Junho 반말问"想吃什么？"你想说"随便，你决定"，最自然的一句？', promptZhEn: 'Junho asks casually, "What do you want to eat?" You want to say "Anything, you decide." What\'s the most natural response?',
      choices: [
        { text: '아무거나 좋아. 네가 정해.', correct: true },
        { text: '없어요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '아무거나(随便) + 좋아(可以) + 네가 정해(你决定)。반말朋友约饭套路', explainEn: 'amugeona (anything) + joa (okay) + nega jeonghae (you decide). Casual friend dinner plans',
    },
    {
      id: 'd15-l2-r3',
      audioKo: '요리 가르쳐 줄까?',
      promptZh: 'Haru 반말问"要我教你做菜吗？"你想欣然接受，应该？', promptZhEn: 'Haru asks casually, "Want me to teach you to cook?" You want to accept happily. What should you say?',
      choices: [
        { text: '응, 진짜 배우고 싶어.', correct: true },
        { text: '아니요, 괜찮아요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '몰라요.', correct: false },
      ],
      explain: '응(嗯·반말"是") + 진짜(真的) + 배우고 싶어(想学·반말)。朋友间接受帮助', explainEn: 'eung (yeah, casual "yes") + jinjja (really) + baeugo sipeo (want to learn, casual). Accepting help between friends',
    },
  ],
};
