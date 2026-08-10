import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 13 · 1-5 Boss 战 · 病情描述综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 14：Chapter 2 收官 · 咖啡馆点单
 */
export const day13Boss: BossSubQuestData = {
  day: 13, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '药店通关 · 独立完整描述感冒症状',
  intro: 'Haru 在你身后，白鹭姐姐在你面前，柜台上三盒药整齐排开。你感冒了，头晕、喉咙痛、鼻涕停不下来。这一关——即使脑子懵，也要把症状说清楚。',
  outroHook: '通过！三盒药进书包，따뜻한 물 一大杯下肚。Haru 说她刚来韩国时也这样开始的。你躺回床上，忽然明白——学韩语和过日子，都从生病那天真正开始的。明天：一个人去哈鲁카페，咖啡馆完整对话，Chapter 2 收官。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd13-b5-t1',
        audioKo: '감기 걸렸어요.',
        choices: [
          { text: '我感冒了。', correct: true },
          { text: '我发烧了。', correct: false },
          { text: '我拉肚子了。', correct: false },
          { text: '我头痛。', correct: false },
        ],
        explain: '感冒用 걸리다 + 过去式 → 걸렸어요。得病固定搭配',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd13-b5-t2',
        audioKo: '식후에 드세요.',
        choices: [
          { text: '请饭后服用。', correct: true },
          { text: '请饭前服用。', correct: false },
          { text: '请空腹服用。', correct: false },
          { text: '请每 4 小时服用。', correct: false },
        ],
        explain: '식후(饭后) + 에(时间助词) + 드세요(请服用·敬语)',
      },
    },
    {
      type: 'choice',
      label: '助词/形态改错',
      task: {
        id: 'd13-b5-t3',
        promptZh: '"头痛"最标准的说法？',
        choices: [
          { text: '머리를 아파요.', correct: false },
          { text: '머리가 아파요.', correct: true },
          { text: '머리에 아파요.', correct: false },
          { text: '머리는 아파요.', correct: false },
        ],
        explain: '아프다 前用**主格 이/가**（形容词/感受词）',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd13-b5-t4',
        promptKo: '드세요',
        promptHangul: 'deu-se-yo',
        choices: [
          { text: '请吃 / 请喝（敬语）', correct: true },
          { text: '请给我', correct: false },
          { text: '请看', correct: false },
          { text: '请等', correct: false },
        ],
        explain: '드시다 = 먹다/마시다 的敬语。对客/病/长辈用',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd13-b5-t5',
        zhHint: '我感冒了。流鼻涕。',
        audioKo: '감기 걸렸어요. 콧물이 나요.',
        answer: ['감기', '걸렸어요.', '콧물이', '나요.'],
        tokens: ['감기', '걸렸어요.', '콧물이', '나요.', '있어요.', '콧물을', '아파요.'],
        explain: '病名 + 걸렸어요 + 症状 + 이/가 + 나요。药店描述症状黄金公式',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd13-b5-t6',
        zhHint: '请饭后服用。请多喝热水。',
        audioKo: '식후에 드세요. 따뜻한 물 많이 마셔요.',
        answer: ['식후에', '드세요.', '따뜻한', '물', '많이', '마셔요.'],
        tokens: ['식후에', '드세요.', '따뜻한', '물', '많이', '마셔요.', '식전에', '먹으세요.', '차가운'],
        explain: '식후 + 에 + 드세요 + 따뜻한 물 + 많이 + 마셔요',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd13-b5-t7',
        audioKo: '어디가 불편하세요?',
        promptZh: '白鹭姐姐问"哪里不舒服？"你想描述感冒+流鼻涕，应该？',
        choices: [
          { text: '감기 걸렸어요. 콧물이 나요.', correct: true },
          { text: '아니요, 괜찮아요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '药店问诊标准公式：病名+걸렸어요 + 症状+이/가+나요',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd13-b5-t8',
        promptZh: '药师嘱咐完，你想道谢+确认自己听懂，最礼貌的一句？',
        choices: [
          { text: '네, 알겠습니다. 감사합니다.', correct: true },
          { text: '얼마예요?', correct: false },
          { text: '아니요, 괜찮아요.', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '对专业人员（药师/医生）用합쇼체（最高敬语）',
      },
    },
  ],
};
