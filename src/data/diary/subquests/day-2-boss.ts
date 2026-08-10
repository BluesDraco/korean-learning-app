import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 2 · 1-5 Boss 战 · 飞机点单综合大考
 * 8 题混合：听句选意×2 + 助词改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 3：机场遇 Minji + 짐 vs 집 翻车
 */
export const day2Boss: BossSubQuestData = {
  day: 2, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '完成人生第一次全套韩语点单', subtitleEn: 'Complete your first full Korean order in life',
  intro: '飞机快落地了。餐车再一次经过——这一次不再有胡萝卜提醒，一切要靠自己。空乘的眼睛落在你身上。', introEn: 'The plane is about to land. The cart passes by again—this time, no carrot reminder. It\'s all up to you. The flight attendant\'s eyes land on you.',
  outroHook: '通过！飞机降落，兔莉拖着爆炸的行李箱走出仁爪机场。出租车候车区，一只水獭姐姐正在等车——下一关的挑战已经在等你。', outroHookEn: 'Pass! The plane lands, and Tori drags her bursting suitcase out of Incheon Airport. At the taxi stand, an otter sister is waiting for a ride—the next challenge is already waiting for you.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd02-b5-t1',
        audioKo: '콜라 한 잔 주세요.',
        choices: [
          { text: '请给我一杯水。', textEn: 'Please give me a glass of water.', correct: false },
          { text: '请给我一杯可乐。', textEn: 'Please give me a cola.', correct: true },
          { text: '请给我一杯咖啡。', textEn: 'Please give me a coffee.', correct: false },
          { text: '请给我一杯果汁。', textEn: 'Please give me a juice.', correct: false },
        ],
        explain: '콜라(可乐) + 한 잔(一杯) + 주세요(请给我)', explainEn: 'Cola + one cup + please give me',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd02-b5-t2',
        audioKo: '아니요, 괜찮아요.',
        choices: [
          { text: '是的，谢谢。', textEn: 'Yes, thank you.', correct: false },
          { text: '不用了，没关系。', textEn: 'No need, it\'s fine.', correct: true },
          { text: '不知道，对不起。', textEn: 'I don\'t know, sorry.', correct: false },
          { text: '好的，我明白了。', textEn: 'Okay, I understand.', correct: false },
        ],
        explain: '아니요 + 괜찮아요 = 婉拒的黄金搭档', explainEn: 'No + it\'s okay = the golden combo for polite refusal',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd02-b5-t3',
        promptZh: '下面哪句是正确的点单？', promptZhEn: 'Which of the following is the correct way to order?',
        choices: [
          { text: '물를 주세요.', correct: false },
          { text: '물은 주세요.', correct: false },
          { text: '물이 주세요.', correct: false },
          { text: '물을 주세요.', correct: true },
        ],
        explain: '물 有收音 ㄹ → 宾格助词用 을。을/를 是宾格，은/는 是主题，이/가 是主格', explainEn: '물 has the final consonant ㄹ → use 을 as the object particle. 을/를 is object, 은/는 is topic, 이/가 is subject',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd02-b5-t4',
        promptKo: '부탁드립니다',
        promptHangul: 'bu-tak-deu-rim-ni-da',
        choices: [
          { text: '拜托您了 / 麻烦您', textEn: 'Please / I\'m asking you', correct: true },
          { text: '谢谢您', textEn: 'Thank you', correct: false },
          { text: '对不起', textEn: 'sorry', correct: false },
          { text: '没关系', textEn: 'it\'s okay', correct: false },
        ],
        explain: '부탁 = 拜托，드리다 = 献给（谦让），합니다体 = 正式敬语。合起来最礼貌', explainEn: '부탁 = request, 드리다 = to give (humble), 합니다 form = formal polite. Together, it\'s the most polite',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd02-b5-t5',
        zhHint: '请给我一杯可乐。', zhHintEn: 'Please give me a cola.',
        audioKo: '콜라 한 잔 주세요.',
        answer: ['콜라', '한', '잔', '주세요.'],
        tokens: ['콜라', '한', '잔', '주세요.', '두', '커피'],
        explain: '语序：名词 콜라 + 数量 한 잔 + 주세요。「한 잔」永远夹在中间', explainEn: 'Word order: noun 콜라 + quantity 한 잔 + 주세요. \'한 잔\' always goes in the middle',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd02-b5-t6',
        zhHint: '麻烦给我菜单。', zhHintEn: 'Please give me the menu.',
        audioKo: '메뉴 부탁드립니다.',
        answer: ['메뉴', '부탁드립니다.'],
        tokens: ['메뉴', '부탁드립니다.', '주세요.', '커피', '감사합니다.'],
        explain: '부탁드립니다 比 주세요 更正式，对空乘/店员用最得体', explainEn: '부탁드립니다 is more formal than 주세요, most appropriate for flight attendants/staff',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd02-b5-t7',
        audioKo: '얼음 드릴까요?',
        promptZh: '空乘问「要冰吗？」，你不想要冰，应该回？', promptZhEn: 'The flight attendant asks \'Want ice?\', you don\'t want ice, what should you reply?',
        choices: [
          { text: '네, 얼음 주세요.', correct: false },
          { text: '아니요, 괜찮아요.', correct: true },
          { text: '죄송합니다.', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '婉拒统一用 아니요, 괜찮아요。죄송합니다（对不起）用来拒绝好意会太严重', explainEn: 'For polite refusal, always use 아니요, 괜찮아요. 죄송합니다 (sorry) is too strong for declining kindness',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd02-b5-t8',
        promptZh: '空乘把可乐递给你，你应该说？', promptZhEn: 'The flight attendant hands you a cola, what should you say?',
        choices: [
          { text: '아니요, 괜찮아요.', correct: false },
          { text: '저는 토리예요.', correct: false },
          { text: '감사합니다.', correct: true },
          { text: '이름이 뭐예요?', correct: false },
        ],
        explain: '收到东西一律 감사합니다。괜찮아요 是"不用了"，语义相反', explainEn: 'When receiving something, always say 감사합니다. 괜찮아요 means \'no thanks\', opposite meaning',
      },
    },
  ],
};
