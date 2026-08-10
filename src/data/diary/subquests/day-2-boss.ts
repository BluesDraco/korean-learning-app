import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 2 · 1-5 Boss 战 · 飞机点单综合大考
 * 8 题混合：听句选意×2 + 助词改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 3：机场遇 Minji + 짐 vs 집 翻车
 */
export const day2Boss: BossSubQuestData = {
  day: 2, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '完成人生第一次全套韩语点单',
  intro: '飞机快落地了。餐车再一次经过——这一次不再有胡萝卜提醒，一切要靠自己。空乘的眼睛落在你身上。',
  outroHook: '通过！飞机降落，兔莉拖着爆炸的行李箱走出仁爪机场。出租车候车区，一只水獭姐姐正在等车——下一关的挑战已经在等你。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd02-b5-t1',
        audioKo: '콜라 한 잔 주세요.',
        choices: [
          { text: '请给我一杯水。', correct: false },
          { text: '请给我一杯可乐。', correct: true },
          { text: '请给我一杯咖啡。', correct: false },
          { text: '请给我一杯果汁。', correct: false },
        ],
        explain: '콜라(可乐) + 한 잔(一杯) + 주세요(请给我)',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd02-b5-t2',
        audioKo: '아니요, 괜찮아요.',
        choices: [
          { text: '是的，谢谢。', correct: false },
          { text: '不用了，没关系。', correct: true },
          { text: '不知道，对不起。', correct: false },
          { text: '好的，我明白了。', correct: false },
        ],
        explain: '아니요 + 괜찮아요 = 婉拒的黄金搭档',
      },
    },
    {
      type: 'choice',
      label: '助词改错',
      task: {
        id: 'd02-b5-t3',
        promptZh: '下面哪句是正确的点单？',
        choices: [
          { text: '물를 주세요.', correct: false },
          { text: '물은 주세요.', correct: false },
          { text: '물이 주세요.', correct: false },
          { text: '물을 주세요.', correct: true },
        ],
        explain: '물 有收音 ㄹ → 宾格助词用 을。을/를 是宾格，은/는 是主题，이/가 是主格',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd02-b5-t4',
        promptKo: '부탁드립니다',
        promptHangul: 'bu-tak-deu-rim-ni-da',
        choices: [
          { text: '拜托您了 / 麻烦您', correct: true },
          { text: '谢谢您', correct: false },
          { text: '对不起', correct: false },
          { text: '没关系', correct: false },
        ],
        explain: '부탁 = 拜托，드리다 = 献给（谦让），합니다体 = 正式敬语。合起来最礼貌',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd02-b5-t5',
        zhHint: '请给我一杯可乐。',
        audioKo: '콜라 한 잔 주세요.',
        answer: ['콜라', '한', '잔', '주세요.'],
        tokens: ['콜라', '한', '잔', '주세요.', '두', '커피'],
        explain: '语序：名词 콜라 + 数量 한 잔 + 주세요。「한 잔」永远夹在中间',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd02-b5-t6',
        zhHint: '麻烦给我菜单。',
        audioKo: '메뉴 부탁드립니다.',
        answer: ['메뉴', '부탁드립니다.'],
        tokens: ['메뉴', '부탁드립니다.', '주세요.', '커피', '감사합니다.'],
        explain: '부탁드립니다 比 주세요 更正式，对空乘/店员用最得体',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd02-b5-t7',
        audioKo: '얼음 드릴까요?',
        promptZh: '空乘问「要冰吗？」，你不想要冰，应该回？',
        choices: [
          { text: '네, 얼음 주세요.', correct: false },
          { text: '아니요, 괜찮아요.', correct: true },
          { text: '죄송합니다.', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '婉拒统一用 아니요, 괜찮아요。죄송합니다（对不起）用来拒绝好意会太严重',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd02-b5-t8',
        promptZh: '空乘把可乐递给你，你应该说？',
        choices: [
          { text: '아니요, 괜찮아요.', correct: false },
          { text: '저는 토리예요.', correct: false },
          { text: '감사합니다.', correct: true },
          { text: '이름이 뭐예요?', correct: false },
        ],
        explain: '收到东西一律 감사합니다。괜찮아요 是"不用了"，语义相反',
      },
    },
  ],
};
