import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 19 · 1-5 Boss 战 · 内科看病综合大考
 * 8 题混合：听句选意×2 + 助词改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：N + 도 助词替换 + 病症搭配（이 아프다 / 이 나다 / 에 걸리다）
 */
export const day19Boss: BossSubQuestData = {
  day: 19, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '第一次用韩语看完内科', subtitleEn: 'First time seeing an internal medicine doctor in Korean',
  intro: '候诊室的椅子有点凉。号码牌被 Tori 攥得发热。护士叫号：「토리 님, 진료실로 오세요.」（Tori 先生 / 女士，请进诊室。）今天学过的每一句现在都要用上。', introEn: 'The waiting room chairs are a bit cold. Tori\'s grip on the number ticket has made it warm. The nurse calls out: "토리 님, 진료실로 오세요." (Mr./Ms. Tori, please come to the exam room.) Every sentence learned today is about to be used.',
  outroHook: '通过！拿了药，感冒总算有了着落。可另一件事悬着——宿舍合同快到期，房子还没定。下一站：海豹房东上门谈签约，租金、管理费到底包含什么，得一句句问清楚。', outroHookEn: 'Passed! Got the medicine, so the cold is finally taken care of. But another thing is hanging—the dorm contract is about to expire and housing isn\'t settled yet. Next stop: the seal landlord comes over to discuss signing. What exactly do rent and management fees include? Need to ask clearly, sentence by sentence.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd19-b5-t1',
        audioKo: '어디 아프세요?',
        choices: [
          { text: '哪里不舒服？', textEn: 'Where does it hurt?', correct: true },
          { text: '你去哪里？', textEn: 'Where are you going?', correct: false },
          { text: '在哪里？', textEn: 'Where is it?', correct: false },
          { text: '什么时候去医院？', textEn: 'When are you going to the hospital?', correct: false },
        ],
        explain: '아프다 + 세요? = 医护对患者的敬语问句', explainEn: '아프다 + 세요? = polite question from medical staff to patient',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd19-b5-t2',
        audioKo: '열도 나고 목도 아파요.',
        choices: [
          { text: '也发烧，嗓子也疼。', textEn: 'I have a fever, and my throat hurts too.', correct: true },
          { text: '嗓子疼，但是没发烧。', textEn: 'My throat hurts, but I don\'t have a fever.', correct: false },
          { text: '发烧了，还想睡觉。', textEn: 'I have a fever and feel sleepy.', correct: false },
          { text: '头疼，肚子也疼。', textEn: 'My head hurts and my stomach hurts too.', correct: false },
        ],
        explain: '「A도 …고, B도 …」= 两个症状并列', explainEn: '"A도 …고, B도 …" = listing two symptoms together',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd19-b5-t3',
        promptZh: '"我也是学生"哪句正确？', promptZhEn: 'Which is correct for "I\'m a student too"?',
        choices: [
          { text: '저는도 학생이에요.', correct: false },
          { text: '저도 학생이에요.', correct: true },
          { text: '저도는 학생이에요.', correct: false },
          { text: '저이 학생이에요.', correct: false },
        ],
        explain: '도 替换 는，不叠加。저 + 도 → 저도', explainEn: '도 replaces 는, not added on top. 저 + 도 → 저도',
      },
    },
    {
      type: 'choice',
      label: '搭配改错', labelEn: 'Fix the collocation error',
      task: {
        id: 'd19-b5-t4',
        promptZh: '"感冒了"哪句正确？', promptZhEn: 'Which is correct for "I caught a cold"?',
        choices: [
          { text: '감기를 걸렸어요.', correct: false },
          { text: '감기에 걸렸어요.', correct: true },
          { text: '감기가 했어요.', correct: false },
          { text: '감기는 있어요.', correct: false },
        ],
        explain: '「감기에 걸리다」是固定搭配，用 에 不用 을/를', explainEn: '"감기에 걸리다" is a fixed collocation, use 에 not 을/를',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd19-b5-t5',
        promptKo: '처방전',
        promptHangul: 'cheo-bang-jeon',
        choices: [
          { text: '处方 / 处方笺', textEn: 'prescription', correct: true },
          { text: '病历', textEn: 'medical record', correct: false },
          { text: '账单', textEn: 'bill', correct: false },
          { text: '医院', textEn: 'Hospital', correct: false },
        ],
        explain: '汉字词「处方笺」。医生开好之后拿去药店抓药', explainEn: 'Sino-Korean word for \'prescription\'. After the doctor writes it, you take it to the pharmacy to get the medicine.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd19-b5-t6',
        zhHint: '也发烧，嗓子也疼。', zhHintEn: 'I have a fever, and my throat hurts too.',
        audioKo: '열도 나고, 목도 아파요.',
        answer: ['열도', '나고,', '목도', '아파요.'],
        tokens: ['열도', '나고,', '목도', '아파요.', '열이', '목이', '나요.'],
        explain: '并列症状标准句式：A도 V고, B도 V', explainEn: 'Standard pattern for listing symptoms: A도 V고, B도 V',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd19-b5-t7',
        zhHint: '流鼻涕。', zhHintEn: 'I have a runny nose.',
        audioKo: '콧물이 나요.',
        answer: ['콧물이', '나요.'],
        tokens: ['콧물이', '나요.', '콧물을', '콧물도', '있어요.'],
        explain: '나다 用 이/가。콧물 末字有收音 → 이', explainEn: '나다 takes 이/가. 콧물 ends with a final consonant → 이',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd19-b5-t8',
        promptZh: '护士说「30분 정도 기다리셔야 해요」，你愿意等，最礼貌的一句？', promptZhEn: 'The nurse says \'30분 정도 기다리셔야 해요\'. You\'re willing to wait — what\'s the most polite response?',
        choices: [
          { text: '네, 알겠습니다.', correct: true },
          { text: '응, 알았어.', correct: false },
          { text: '안 기다릴래요.', correct: false },
          { text: '30분이 뭐예요?', correct: false },
        ],
        explain: '医院是正式场合 → 합쇼체「알겠습니다」最合适', explainEn: 'Hospitals are formal settings → 합쇼체 \'알겠습니다\' is most appropriate.',
      },
    },
  ],
};
