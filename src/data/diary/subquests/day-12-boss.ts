import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 12 · 1-5 Boss 战 · 汉字数词 + 价格综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 13：半夜感冒 + 약국 场景
 */
export const day12Boss: BossSubQuestData = {
  day: 12, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '文具店通关 · 从「얼마예요」到「만 이천원」',
  intro: '收银台上的塑料包装反着灯。Minji 抱臂看你——她已经笑到肚子疼，接下来这一句你要自己念出来。舌头准备就位，深呼吸。',
  outroHook: '通过！만 원 的音你终于念顺了。回宿舍路上，Junho 说想约你明天一起吃辣鸡面。你点头。但夜里 2 点你被鼻塞憋醒——喉咙火烧一样。感冒了。下一关：Haru 敲门带你去 약국（药店）。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd12-b5-t1',
        audioKo: '이거 얼마예요?',
        choices: [
          { text: '这个多少钱？', correct: true },
          { text: '这个有吗？', correct: false },
          { text: '这个好吗？', correct: false },
          { text: '这个是什么？', correct: false },
        ],
        explain: '얼마 = 多少钱。购物万能问价句',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd12-b5-t2',
        audioKo: '만 이천원이에요.',
        choices: [
          { text: '1200 元。', correct: false },
          { text: '12000 元。', correct: true },
          { text: '20000 元。', correct: false },
          { text: '2000 元。', correct: false },
        ],
        explain: '만(10000) + 이천(2000) = 12000。以万为基准拆分',
      },
    },
    {
      type: 'choice',
      label: '价格改错',
      task: {
        id: 'd12-b5-t3',
        promptZh: '"10000 元"最标准的说法？',
        choices: [
          { text: '일만 원이에요.', correct: false },
          { text: '만 원이에요.', correct: true },
          { text: '십천 원이에요.', correct: false },
          { text: '만원원이에요.', correct: false },
        ],
        explain: '韩语百/千/万前**不加 일**。10000 = 만，不用 일만',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd12-b5-t4',
        promptKo: '얼마예요',
        promptHangul: 'eol-ma-ye-yo',
        choices: [
          { text: '多少钱？', correct: true },
          { text: '什么？', correct: false },
          { text: '哪里？', correct: false },
          { text: '几个？', correct: false },
        ],
        explain: '얼마(多少·价格) + 예요(是) = 多少钱',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd12-b5-t5',
        zhHint: '这个多少钱？',
        audioKo: '이거 얼마예요?',
        answer: ['이거', '얼마예요?'],
        tokens: ['이거', '얼마예요?', '있어요?', '뭐예요?', '몇 개예요?', '저거'],
        explain: '购物万能问价句 = 指示词 + 얼마예요?',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd12-b5-t6',
        zhHint: '那个是 12000 元。（店员报价）',
        audioKo: '그거 만 이천원이에요.',
        answer: ['그거', '만', '이천원이에요.'],
        tokens: ['그거', '만', '이천원이에요.', '이거', '십이천원이에요.', '일만'],
        explain: '店员视角客人指的东西 → 그거。价格 만 이천（不加 일）',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd12-b5-t7',
        audioKo: '이거 얼마예요?',
        promptZh: '客人问"这个多少钱？"你（店员）看到标签写 12000 元，应该？',
        choices: [
          { text: '만 이천원이에요.', correct: true },
          { text: '십이천원이에요.', correct: false },
          { text: '일만 이천원이에요.', correct: false },
          { text: '몰라요.', correct: false },
        ],
        explain: '12000 = 만 이천（万二千）。以万拆分，不加 일',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd12-b5-t8',
        promptZh: '付完钱店员把笔装袋递过来。你想道谢+祝她愉快，最礼貌的一句？',
        choices: [
          { text: '감사합니다. 좋은 하루 보내세요.', correct: true },
          { text: '만 원만 받으세요.', correct: false },
          { text: '너무 비싸요.', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '결제 후 礼貌套语 = 감사합니다 + 좋은 하루 보내세요',
      },
    },
  ],
};
