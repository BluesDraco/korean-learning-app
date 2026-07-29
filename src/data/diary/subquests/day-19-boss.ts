import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 19 · 1-5 Boss 战 · 内科看病综合大考
 * 8 题混合：听句选意×2 + 助词改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：N + 도 助词替换 + 病症搭配（이 아프다 / 이 나다 / 에 걸리다）
 */
export const day19Boss: BossSubQuestData = {
  day: 19, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '第一次用韩语看完内科',
  intro: '候诊室的椅子有点凉。号码牌被 Tori 攥得发热。护士叫号：「토리 님, 진료실로 오세요.」（Tori 先生 / 女士，请进诊室。）今天学过的每一句现在都要用上。',
  outroHook: '通过！拿了药，感冒总算有了着落。可另一件事悬着——宿舍合同快到期，房子还没定。下一站：海豹房东上门谈签约，租金、管理费到底包含什么，得一句句问清楚。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd19-b5-t1',
        audioKo: '어디 아프세요?',
        choices: [
          { text: '哪里不舒服？', correct: true },
          { text: '你去哪里？', correct: false },
          { text: '在哪里？', correct: false },
          { text: '什么时候去医院？', correct: false },
        ],
        explain: '아프다 + 세요? = 医护对患者的敬语问句',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd19-b5-t2',
        audioKo: '열도 나고 목도 아파요.',
        choices: [
          { text: '也发烧，嗓子也疼。', correct: true },
          { text: '嗓子疼，但是没发烧。', correct: false },
          { text: '发烧了，还想睡觉。', correct: false },
          { text: '头疼，肚子也疼。', correct: false },
        ],
        explain: '「A도 …고, B도 …」= 两个症状并列',
      },
    },
    {
      type: 'choice',
      label: '助词改错',
      task: {
        id: 'd19-b5-t3',
        promptZh: '"我也是学生"哪句正确？',
        choices: [
          { text: '저는도 학생이에요.', correct: false },
          { text: '저도 학생이에요.', correct: true },
          { text: '저도는 학생이에요.', correct: false },
          { text: '저이 학생이에요.', correct: false },
        ],
        explain: '도 替换 는，不叠加。저 + 도 → 저도',
      },
    },
    {
      type: 'choice',
      label: '搭配改错',
      task: {
        id: 'd19-b5-t4',
        promptZh: '"感冒了"哪句正确？',
        choices: [
          { text: '감기를 걸렸어요.', correct: false },
          { text: '감기에 걸렸어요.', correct: true },
          { text: '감기가 했어요.', correct: false },
          { text: '감기는 있어요.', correct: false },
        ],
        explain: '「감기에 걸리다」是固定搭配，用 에 不用 을/를',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd19-b5-t5',
        promptKo: '처방전',
        promptHangul: 'cheo-bang-jeon',
        choices: [
          { text: '处方 / 处方笺', correct: true },
          { text: '病历', correct: false },
          { text: '账单', correct: false },
          { text: '医院', correct: false },
        ],
        explain: '汉字词「处方笺」。医生开好之后拿去药店抓药',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd19-b5-t6',
        zhHint: '也发烧，嗓子也疼。',
        audioKo: '열도 나고, 목도 아파요.',
        answer: ['열도', '나고,', '목도', '아파요.'],
        tokens: ['열도', '나고,', '목도', '아파요.', '열이', '목이', '나요.'],
        explain: '并列症状标准句式：A도 V고, B도 V',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd19-b5-t7',
        zhHint: '流鼻涕。',
        audioKo: '콧물이 나요.',
        answer: ['콧물이', '나요.'],
        tokens: ['콧물이', '나요.', '콧물을', '콧물도', '있어요.'],
        explain: '나다 用 이/가。콧물 末字有收音 → 이',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd19-b5-t8',
        promptZh: '护士说「30분 정도 기다리셔야 해요」，你愿意等，最礼貌的一句？',
        choices: [
          { text: '네, 알겠습니다.', correct: true },
          { text: '응, 알았어.', correct: false },
          { text: '안 기다릴래요.', correct: false },
          { text: '30분이 뭐예요?', correct: false },
        ],
        explain: '医院是正式场合 → 합쇼체「알겠습니다」最合适',
      },
    },
  ],
};
