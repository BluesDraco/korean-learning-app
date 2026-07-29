import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 28 · 1-5 Boss 战 · 签售会综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：V지 못하다 + 세요 敬语 + 으로/로 方式 + 韩式谦虚
 */
export const day28Boss: BossSubQuestData = {
  day: 28, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '在偶像面前的 30 秒实战',
  intro: '前面还有一个人。你捏紧了勇气胡萝卜，手心的汗把毛发都打湿了一点。偶像抬头，笑得温柔。心跳压过整个大厅的音乐。妈妈，胡萝卜，28 天——现在，是你的舞台。',
  outroHook: '通过！专辑上是本命亲手写的"용기를 내요"。Tori 走出场馆，风把她耳边的胡萝卜笔吹得晃。明天，打开妈妈塞的日记本——用韩语写第一篇。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd28-b5-t1',
        audioKo: '이름이 뭐예요?',
        choices: [
          { text: '你叫什么名字？', correct: true },
          { text: '这是什么？', correct: false },
          { text: '几号？', correct: false },
          { text: '多少钱？', correct: false },
        ],
        explain: '偶像签售会第一问',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd28-b5-t2',
        audioKo: '평생 잊지 못할 거예요.',
        choices: [
          { text: '一辈子不会忘。', correct: true },
          { text: '不用记住。', correct: false },
          { text: '记不住。', correct: false },
          { text: '一辈子在忘记。', correct: false },
        ],
        explain: '평생 + 잊지 못하다 + ㄹ 거예요 · 感动最强表达',
      },
    },
    {
      type: 'choice',
      label: '语法选择',
      task: {
        id: 'd28-b5-t3',
        promptZh: '"因为太感动一辈子无法忘"哪句更贴切？',
        choices: [
          { text: '평생 안 잊을 거예요.', correct: false },
          { text: '평생 잊지 못할 거예요.', correct: true },
          { text: '평생 잊지 마세요.', correct: false },
          { text: '평생 잊었어요.', correct: false },
        ],
        explain: '못 = 能力/情感否定（无法）· 안 = 意志否定（不打算）',
      },
    },
    {
      type: 'choice',
      label: '助词改错',
      task: {
        id: 'd28-b5-t4',
        promptZh: '"真心支持你"哪句正确？',
        choices: [
          { text: '진심에 응원해요.', correct: false },
          { text: '진심으로 응원해요.', correct: true },
          { text: '진심로 응원해요.', correct: false },
          { text: '진심을 응원해요.', correct: false },
        ],
        explain: '진심 有收音 ㅁ → 으로（方式助词）',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd28-b5-t5',
        promptKo: '용기',
        promptHangul: 'yong-gi',
        choices: [
          { text: '勇气', correct: true },
          { text: '力气', correct: false },
          { text: '荣耀', correct: false },
          { text: '英雄', correct: false },
        ],
        explain: '용기를 내다 = 鼓起勇气 · 偶像给 Tori 写的话',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd28-b5-t6',
        zhHint: '还差很多。但是真的好喜欢。',
        audioKo: '아직 많이 부족해요. 근데 진짜 좋아해요.',
        answer: ['아직', '많이', '부족해요.', '근데', '진짜', '좋아해요.'],
        tokens: ['아직', '많이', '부족해요.', '근데', '진짜', '좋아해요.', '잘해요.', '싫어해요.'],
        explain: '韩式谦虚 + 转折 + 真心 · 被夸时的黄金配方',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd28-b5-t7',
        zhHint: '真的感谢。一辈子不会忘。',
        audioKo: '진짜 감사합니다. 평생 잊지 못할 거예요.',
        answer: ['진짜', '감사합니다.', '평생', '잊지', '못할', '거예요.'],
        tokens: ['진짜', '감사합니다.', '평생', '잊지', '못할', '거예요.', '고마워요.', '안 잊을', '거예요.'],
        explain: '합쇼체感谢 + 못 잊을 거예요 · 签售会最强句',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd28-b5-t8',
        promptZh: '你想对偶像说"我支持你。请保重身体。"，最合适的一句？',
        choices: [
          { text: '응원해요. 건강하세요.', correct: true },
          { text: '응원해. 건강해.', correct: false },
          { text: '응원해요. 건강합니다.', correct: false },
          { text: '응원해요. 건강해요.', correct: false },
        ],
        explain: '해요体 응원해요 + 세요 敬语祝福 · 对偶像最佳语体',
      },
    },
  ],
};
