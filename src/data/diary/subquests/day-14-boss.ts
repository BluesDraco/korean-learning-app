import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 14 · 1-5 Boss 战 · Chapter 2 收官综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Chapter 3：兽尔独立生活正式开始 · 找房子/签合同
 */
export const day14Boss: BossSubQuestData = {
  day: 14, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: 'Chapter 2 收官 · 靠自己完成整个咖啡馆对话',
  intro: '收银台后金毛店员的围裙上有一小片奶泡。你没有 Haru，没有 Junho，没有 Minji——只有你和从 Day 8 到 Day 13 学到的所有话。这一杯咖啡，从"어서 오세요"到"맛있게 드세요"全靠你自己撑下来。',
  outroHook: '🎉 Chapter 2 通关！口误四次，咖啡一杯，金毛店员给你多挤了一层奶泡。杯子上歪歪扭扭写着"Tori"。你笑了——真正一个人做到了。下周开始：找房子、签合同。兽尔的独立生活，才刚刚开始。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd14-b5-t1',
        audioKo: '어서 오세요. 주문 도와드릴게요.',
        choices: [
          { text: '欢迎光临。我帮您点单。', correct: true },
          { text: '请慢走。有需要吗？', correct: false },
          { text: '要不要点单？', correct: false },
          { text: '欢迎再来。', correct: false },
        ],
        explain: '咖啡馆迎宾套语：어서 오세요 + 주문 도와드릴게요',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd14-b5-t2',
        audioKo: '맛있게 드세요.',
        choices: [
          { text: '请慢用。', correct: true },
          { text: '请带走。', correct: false },
          { text: '请等一下。', correct: false },
          { text: '请再点。', correct: false },
        ],
        explain: '맛있게(好吃地·副词形) + 드세요(请吃·敬语)。递餐固定结束语',
      },
    },
    {
      type: 'choice',
      label: '形容词改错',
      task: {
        id: 'd14-b5-t3',
        promptZh: '"请给我冰美式"最标准的说法？',
        choices: [
          { text: '차갑은 아메리카노 주세요.', correct: false },
          { text: '차가운 아메리카노 주세요.', correct: true },
          { text: '차갑다 아메리카노 주세요.', correct: false },
          { text: '차가워 아메리카노 주세요.', correct: false },
        ],
        explain: '차갑다 是 ㅂ 不规则——차갑 → 차가 + 운 = 차가운。不是 차갑은 ❌',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd14-b5-t4',
        promptKo: '달게',
        promptHangul: 'dal-ge',
        choices: [
          { text: '甜地（副词形）', correct: true },
          { text: '咸地（副词形）', correct: false },
          { text: '辣地（副词形）', correct: false },
          { text: '苦地（副词形）', correct: false },
        ],
        explain: '달다(甜·형용사) → 달게(甜地·副词形)。Tori 说反了——别犯',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd14-b5-t5',
        zhHint: '请给我一杯热拿铁。',
        audioKo: '따뜻한 라떼 한 잔 주세요.',
        answer: ['따뜻한', '라떼', '한', '잔', '주세요.'],
        tokens: ['따뜻한', '라떼', '한', '잔', '주세요.', '차가운', '이', '개'],
        explain: '温度定语 + 饮料 + 数量 + 请给我。咖啡馆万能公式',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd14-b5-t6',
        zhHint: '啊，不是！热拿铁！（纠正口误）',
        audioKo: '아, 아니요! 따뜻한 라떼요!',
        answer: ['아,', '아니요!', '따뜻한', '라떼요!'],
        tokens: ['아,', '아니요!', '따뜻한', '라떼요!', '차가운', '네,', '맞아요.', '아이스'],
        explain: '纠正口误开头：아, 아니요! + 正确说法。Tori 今天用了三次',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd14-b5-t7',
        audioKo: '드시고 가세요, 포장이세요?',
        promptZh: '店员问"堂食还是外带？"你想坐下来慢慢喝，应该？',
        choices: [
          { text: '여기서 먹을게요.', correct: true },
          { text: '포장이에요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '없어요.', correct: false },
        ],
        explain: '여기서(在这儿) + 먹을게요(要吃·意愿形)。堂食最自然的回应',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd14-b5-t8',
        promptZh: '"请做成甜的"（糖度定制）最标准的说法？',
        choices: [
          { text: '달게 해 주세요.', correct: true },
          { text: '짜게 해 주세요.', correct: false },
          { text: '단 것 주세요.', correct: false },
          { text: '설탕 있어요?', correct: false },
        ],
        explain: '「형용사+게+해 주세요」= 请做成~的。달게(甜) 不是 짜게(咸)——Tori 说反了',
      },
    },
  ],
};
