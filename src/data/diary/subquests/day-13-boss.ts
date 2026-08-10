import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 13 · 1-5 Boss 战 · 病情描述综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 14：Chapter 2 收官 · 咖啡馆点单
 */
export const day13Boss: BossSubQuestData = {
  day: 13, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '药店通关 · 独立完整描述感冒症状', subtitleEn: 'Pharmacy Clear · Independently Describe Cold Symptoms',
  intro: 'Haru 在你身后，白鹭姐姐在你面前，柜台上三盒药整齐排开。你感冒了，头晕、喉咙痛、鼻涕停不下来。这一关——即使脑子懵，也要把症状说清楚。', introEn: 'Haru is behind you, Sister Baekro is in front, and three boxes of medicine are neatly lined up on the counter. You have a cold—dizzy, sore throat, and a runny nose that won\'t stop. This level—even if your head is foggy, you need to describe your symptoms clearly.',
  outroHook: '通过！三盒药进书包，따뜻한 물 一大杯下肚。Haru 说她刚来韩国时也这样开始的。你躺回床上，忽然明白——学韩语和过日子，都从生病那天真正开始的。明天：一个人去哈鲁카페，咖啡馆完整对话，Chapter 2 收官。', outroHookEn: 'Cleared! Three boxes of medicine go into your backpack, and a big cup of 따뜻한 물 goes down. Haru says she started the same way when she first came to Korea. You lie back in bed and suddenly realize—learning Korean and living life both truly begin from the day you get sick. Tomorrow: go to Haru\'s Café alone, complete a full café conversation, and wrap up Chapter 2.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd13-b5-t1',
        audioKo: '감기 걸렸어요.',
        choices: [
          { text: '我感冒了。', textEn: 'I have a cold.', correct: true },
          { text: '我发烧了。', textEn: 'I have a fever.', correct: false },
          { text: '我拉肚子了。', textEn: 'I have diarrhea.', correct: false },
          { text: '我头痛。', textEn: 'I have a headache.', correct: false },
        ],
        explain: '感冒用 걸리다 + 过去式 → 걸렸어요。得病固定搭配', explainEn: 'For catching a cold, use 걸리다 + past tense → 걸렸어요. Fixed expression for getting sick.',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd13-b5-t2',
        audioKo: '식후에 드세요.',
        choices: [
          { text: '请饭后服用。', textEn: 'Please take it after meals.', correct: true },
          { text: '请饭前服用。', textEn: 'Please take before meals.', correct: false },
          { text: '请空腹服用。', textEn: 'Take on an empty stomach.', correct: false },
          { text: '请每 4 小时服用。', textEn: 'Take every 4 hours.', correct: false },
        ],
        explain: '식후(饭后) + 에(时间助词) + 드세요(请服用·敬语)', explainEn: '식후 (after meals) + 에 (time particle) + 드세요 (please take · honorific)',
      },
    },
    {
      type: 'choice',
      label: '助词/形态改错', labelEn: 'Particle/Form Correction',
      task: {
        id: 'd13-b5-t3',
        promptZh: '"头痛"最标准的说法？', promptZhEn: 'What\'s the most standard way to say \'headache\'?',
        choices: [
          { text: '머리를 아파요.', correct: false },
          { text: '머리가 아파요.', correct: true },
          { text: '머리에 아파요.', correct: false },
          { text: '머리는 아파요.', correct: false },
        ],
        explain: '아프다 前用**主格 이/가**（形容词/感受词）', explainEn: 'Use the **subject particle 이/가** before 아프다 (for adjectives/feelings)',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd13-b5-t4',
        promptKo: '드세요',
        promptHangul: 'deu-se-yo',
        choices: [
          { text: '请吃 / 请喝（敬语）', textEn: 'Please eat / drink (polite form).', correct: true },
          { text: '请给我', textEn: 'Please give me', correct: false },
          { text: '请看', textEn: 'Please look', correct: false },
          { text: '请等', textEn: 'Please wait', correct: false },
        ],
        explain: '드시다 = 먹다/마시다 的敬语。对客/病/长辈用', explainEn: '드시다 = honorific for 먹다/마시다. Used for guests, the sick, or elders.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd13-b5-t5',
        zhHint: '我感冒了。流鼻涕。', zhHintEn: 'I have a cold. I have a runny nose.',
        audioKo: '감기 걸렸어요. 콧물이 나요.',
        answer: ['감기', '걸렸어요.', '콧물이', '나요.'],
        tokens: ['감기', '걸렸어요.', '콧물이', '나요.', '있어요.', '콧물을', '아파요.'],
        explain: '病名 + 걸렸어요 + 症状 + 이/가 + 나요。药店描述症状黄金公式', explainEn: 'Disease name + 걸렸어요 + symptom + 이/가 + 나요. The golden formula for describing symptoms at the pharmacy.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd13-b5-t6',
        zhHint: '请饭后服用。请多喝热水。', zhHintEn: 'Please take after meals. Please drink plenty of warm water.',
        audioKo: '식후에 드세요. 따뜻한 물 많이 마셔요.',
        answer: ['식후에', '드세요.', '따뜻한', '물', '많이', '마셔요.'],
        tokens: ['식후에', '드세요.', '따뜻한', '물', '많이', '마셔요.', '식전에', '먹으세요.', '차가운'],
        explain: '식후 + 에 + 드세요 + 따뜻한 물 + 많이 + 마셔요',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd13-b5-t7',
        audioKo: '어디가 불편하세요?',
        promptZh: '白鹭姐姐问"哪里不舒服？"你想描述感冒+流鼻涕，应该？', promptZhEn: 'White Heron sister asks, "Where do you feel unwell?" You want to describe a cold + runny nose. What should you say?',
        choices: [
          { text: '감기 걸렸어요. 콧물이 나요.', correct: true },
          { text: '아니요, 괜찮아요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '药店问诊标准公式：病名+걸렸어요 + 症状+이/가+나요', explainEn: 'Standard pharmacy consultation formula: disease name + 걸렸어요 + symptom + 이/가 + 나요',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd13-b5-t8',
        promptZh: '药师嘱咐完，你想道谢+确认自己听懂，最礼貌的一句？', promptZhEn: 'After the pharmacist\'s instructions, you want to thank them and confirm you understood. What\'s the most polite thing to say?',
        choices: [
          { text: '네, 알겠습니다. 감사합니다.', correct: true },
          { text: '얼마예요?', correct: false },
          { text: '아니요, 괜찮아요.', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '对专业人员（药师/医生）用합쇼체（最高敬语）', explainEn: 'Use 합쇼체 (highest honorific) with professionals (pharmacists/doctors).',
      },
    },
  ],
};
