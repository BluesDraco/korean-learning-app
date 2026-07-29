import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 17 · 1-5 Boss 战 · ~아/어 주세요 综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 18：수민은행 · 银行开户
 */
export const day17Boss: BossSubQuestData = {
  day: 17, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: 'T-Money 卡通关 · 从"하나 주세요"到"카드로 할게요"',
  intro: '猫头鹰售票员的眼镜片映着窗外的日光。你手心汗湿——但要用韩语走完办卡 + 充值 + 付款的全流程。Boss 战开始。',
  outroHook: '通过！蓝色的卡在手心还有点凉，但你握紧了。回宿舍路上，Junho 提醒你还没开韩国银行账户——学费要打给学校、房租要转给房东。下一关：수민은행（兽民银行），乌龟柜员说话很慢，请耐心。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd17-b5-t1',
        audioKo: '충전 해 주세요.',
        choices: [
          { text: '请帮我充值。', correct: true },
          { text: '请给我一张卡。', correct: false },
          { text: '请稍等一下。', correct: false },
          { text: '请帮我拍照。', correct: false },
        ],
        explain: '충전(充值) + 해 주세요（하다 类）',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd17-b5-t2',
        audioKo: '카드로 할게요.',
        choices: [
          { text: '我用卡付。', correct: true },
          { text: '我要卡。', correct: false },
          { text: '卡多少钱？', correct: false },
          { text: '卡不行吗？', correct: false },
        ],
        explain: '카드 + 로（方式）+ 할게요（意愿）= 我用卡付',
      },
    },
    {
      type: 'choice',
      label: '语法改错',
      task: {
        id: 'd17-b5-t3',
        promptZh: '"请帮我拍照"最标准的说法？',
        choices: [
          { text: '사진 찍아 주세요.', correct: false },
          { text: '사진 찍어 주세요.', correct: true },
          { text: '사진 찍으세요.', correct: false },
          { text: '사진 찍고 있어요.', correct: false },
        ],
        explain: '찍다 词干 ㅣ → 어 주세요。「찍아 주세요 ❌」',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd17-b5-t4',
        promptKo: '도와주세요',
        promptHangul: 'do-wa-ju-se-yo',
        choices: [
          { text: '请帮帮我', correct: true },
          { text: '请给我', correct: false },
          { text: '请稍等', correct: false },
          { text: '请慢走', correct: false },
        ],
        explain: '돕다(ㅂ 不规则) → 도와 + 주세요。紧急求助黄金句',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd17-b5-t5',
        zhHint: '请给我一张 T-money 卡。',
        audioKo: '티머니카드 하나 주세요.',
        answer: ['티머니카드', '하나', '주세요.'],
        tokens: ['티머니카드', '하나', '주세요.', '한 장', '일', '있어요.'],
        explain: '「하나 주세요」= 请给我一张/一个。주다 本身不需要 아/어',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd17-b5-t6',
        zhHint: '请稍等一下。',
        audioKo: '잠깐 기다려 주세요.',
        answer: ['잠깐', '기다려', '주세요.'],
        tokens: ['잠깐', '기다려', '주세요.', '기다리세요.', '기다렸어요.', '기다리고 있어요.'],
        explain: '기다리다 词干 ㅣ → 기다려 주세요',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd17-b5-t7',
        audioKo: '카드로 하실 거예요, 현금으로 하실 거예요?',
        promptZh: '售票员问"用卡还是现金？"你想用卡付，最自然的一句？',
        choices: [
          { text: '카드로 할게요.', correct: true },
          { text: '카드 있어요?', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '만 원이요.', correct: false },
        ],
        explain: 'N + 로 + 할게요 = 用 N 付。카드 无받침 → 로',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd17-b5-t8',
        promptZh: '游客搭话「저기요, 잠깐 시간 있어요?」（有时间吗？）— 你猜想他想请人拍照，最自然的一句？',
        choices: [
          { text: '네, 사진 찍어 드릴까요?', correct: true },
          { text: '아니요, 없어요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '游客搭话通常想拍照。「찍어 드릴까요?」= 要我为您拍吗（드리다 是 주다 敬语）',
      },
    },
  ],
};
