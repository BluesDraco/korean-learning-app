import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 13 · 1-3 문법 탐험 · 语法关
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：病情三句型——걸리다/나다/아프다
 * 教学梯度：
 *   fix 挑高频错——助词错用、三动词混用
 *   → compose 从单症状到组合句
 *   → rule 抽象规则：过去式使用、아프다 형용사特性、敬语层级
 */
export const day13Grammar: GrammarSubQuestData = {
  day: 13, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '病情描述三句型 · 걸렸어요 / 나요 / 아파요', subtitleEn: 'Three sentence patterns for describing conditions · 걸렸어요 / 나요 / 아파요',

  // ─── 助词/形态改错 ───
  fix: [
    {
      id: 'd13-g3-f1',
      promptKo: '감기 있어요.',
      promptZh: '"我感冒了"哪句最标准？', promptZhEn: 'Which is the most standard way to say "I have a cold"?',
      choices: [
        { text: '감기 있어요.', correct: false },
        { text: '감기 걸렸어요.', correct: true },
        { text: '감기 아파요.', correct: false },
        { text: '감기 나요.', correct: false },
      ],
      explain: '感冒用 걸리다（得病）+ 过去式 걸렸어요。不用 있다（存在）——감기 있어요 ❌', explainEn: 'For a cold, use 걸리다 (to catch) + past tense 걸렸어요. Don\'t use 있다 (to exist) — 감기 있어요 ❌',
    },
    {
      id: 'd13-g3-f2',
      promptKo: '열이 아파요.',
      promptZh: '"发烧了"哪句最标准？', promptZhEn: 'Which is the most standard way to say "I have a fever"?',
      choices: [
        { text: '열이 아파요.', correct: false },
        { text: '열이 나요.', correct: true },
        { text: '열이 걸렸어요.', correct: false },
        { text: '열이 있어요.', correct: false },
      ],
      explain: '发烧用 나다（出现）→ 열이 나요。不用 아프다 ❌——「열」是症状不是身体部位', explainEn: 'For a fever, use 나다 (to appear) → 열이 나요. Don\'t use 아프다 ❌ — "열" is a symptom, not a body part.',
    },
    {
      id: 'd13-g3-f3',
      promptKo: '머리를 아파요.',
      promptZh: '"头痛"哪句最标准？', promptZhEn: 'Which is the most standard way to say "headache"?',
      choices: [
        { text: '머리를 아파요.', correct: false },
        { text: '머리가 아파요.', correct: true },
        { text: '머리에 아파요.', correct: false },
        { text: '머리는 아파요.', correct: false },
      ],
      explain: '아프다 前用**主格 이/가**（不是宾格 을/를）。아프다 是形容词/感受词，用主格', explainEn: 'Use the subjective case 이/가 (not the objective 을/를) before 아프다. 아프다 is an adjective/feeling word, so it takes the subjective case.',
    },
    {
      id: 'd13-g3-f4',
      promptKo: '콧물 나요.',
      promptZh: '"流鼻涕"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "runny nose"?',
      choices: [
        { text: '콧물 나요.', correct: false },
        { text: '콧물이 나요.', correct: true },
        { text: '콧물을 나요.', correct: false },
        { text: '콧물에 나요.', correct: false },
      ],
      explain: '症状"出现"用 나다，前必用主格 이/가。콧물 有받침 ㄹ → 이',
    },
    {
      id: 'd13-g3-f5',
      promptKo: '식후에 먹으세요.',
      promptZh: '"请饭后服用"最礼貌的说法？', promptZhEn: 'What\'s the most polite way to say "Please take after meals"?',
      choices: [
        { text: '식후에 먹으세요.', correct: false },
        { text: '식후에 드세요.', correct: true },
        { text: '식후에 먹어요.', correct: false },
        { text: '식후에 잡수세요.', correct: false },
      ],
      explain: '「드세요」是「먹다/마시다」的敬语（对客/病人用）。「먹으세요」也存在但 드세요 更常用、更礼貌', explainEn: '드세요 is the honorific of 먹다/마시다 (used for guests/patients). 먹으세요 also exists, but 드세요 is more common and more polite.',
    },
  ],

  // ─── 组句 ───
  compose: [
    {
      id: 'd13-g3-c1',
      zhHint: '我感冒了。流鼻涕。', zhHintEn: 'I have a cold. I have a runny nose.',
      audioKo: '감기 걸렸어요. 콧물이 나요.',
      answer: ['감기', '걸렸어요.', '콧물이', '나요.'],
      tokens: ['감기', '걸렸어요.', '콧물이', '나요.', '있어요.', '콧물을', '아파요.'],
      explain: '병 + 걸렸어요 (感冒得了) + 症状 + 이/가 + 나요 (症状出现)。药店描述症状黄金公式', explainEn: '병 + 걸렸어요 (caught a cold) + symptom + 이/가 + 나요 (symptom appears). The golden formula for describing symptoms at the pharmacy.',
    },
    {
      id: 'd13-g3-c2',
      zhHint: '头痛。嗓子也痛。', zhHintEn: 'Headache. My throat hurts too.',
      audioKo: '머리가 아파요. 목도 아파요.',
      answer: ['머리가', '아파요.', '목도', '아파요.'],
      tokens: ['머리가', '아파요.', '목도', '아파요.', '머리를', '목이', '나요.'],
      explain: '身体部位 + 이/가 + 아파요。第二个部位用 도(也) 连接', explainEn: 'Body part + 이/가 + 아파요. Connect the second body part with 도 (also).',
    },
    {
      id: 'd13-g3-c3',
      zhHint: '请饭后服用。请多喝热水。', zhHintEn: 'Please take after meals. Please drink plenty of warm water.',
      audioKo: '식후에 드세요. 따뜻한 물 많이 마셔요.',
      answer: ['식후에', '드세요.', '따뜻한', '물', '많이', '마셔요.'],
      tokens: ['식후에', '드세요.', '따뜻한', '물', '많이', '마셔요.', '식전에', '먹으세요.', '차가운'],
      explain: '식후(饭后) + 에(时间助词) + 드세요(请服用·敬语)。따뜻한 물(热水) + 많이 마셔요(多喝)', explainEn: '식후 (after meals) + 에 (time particle) + 드세요 (please take · honorific). 따뜻한 물 (warm water) + 많이 마셔요 (drink a lot).',
    },
    {
      id: 'd13-g3-c4',
      zhHint: '哪里不舒服？', zhHintEn: 'Where does it hurt?',
      audioKo: '어디가 불편하세요?',
      answer: ['어디가', '불편하세요?'],
      tokens: ['어디가', '불편하세요?', '어디에', '아파요?', '뭐예요?', '있어요?'],
      explain: '어디(哪里) + 가 + 불편하세요?（不舒服吗？·敬语）。医生/药师问诊标准句', explainEn: '어디 (where) + 가 + 불편하세요? (Are you uncomfortable? · honorific). Standard doctor/pharmacist consultation sentence.',
    },
  ],

  // ─── 规则理解 ───
  rule: [
    {
      id: 'd13-g3-r1',
      promptZh: '关于「걸리다」「나다」「아프다」三个词，哪句描述最准确？', promptZhEn: 'Regarding the three words 걸리다, 나다, and 아프다, which description is most accurate?',
      choices: [
        { text: '걸리다 = 得病(感冒/流感)；나다 = 症状出现(发烧/流鼻涕)；아프다 = 身体部位痛', textEn: '걸리다 = to catch a disease (cold/flu); 나다 = for a symptom to appear (fever/runny nose); 아프다 = for a body part to hurt.', correct: true },
        { text: '三个词都是"痛"的意思，可以互换', textEn: 'All three words mean "pain" and can be used interchangeably.', correct: false },
        { text: '걸리다只用于感冒，其他病用 아프다', textEn: '걸리다 is only used for colds; for other illnesses, use 아프다', correct: false },
        { text: '아프다只用于头痛，其他部位用 나다', textEn: '아프다 is only used for headaches; for other body parts, use 나다', correct: false },
      ],
      explain: '三个词各司其职：得病用 걸리다；症状出现用 나다；身体部位痛用 아프다。混用会闹笑话：열이 아파요 ❌', explainEn: 'Each word has its role: catching an illness uses 걸리다; symptoms appearing use 나다; body part pain uses 아프다. Mixing them up can be funny: 열이 아파요 ❌',
    },
    {
      id: 'd13-g3-r2',
      promptZh: '"我感冒了"为什么用过去式 걸렸어요 不用现在时 걸려요？', promptZhEn: 'Why does "I caught a cold" use the past tense 걸렸어요 instead of the present tense 걸려요?',
      choices: [
        { text: '因为已经感染上了——从感染到出现症状有时间差，用过去式强调"结果状态"', textEn: 'Because you\'ve already been infected—there\'s a time gap between infection and symptoms, so the past tense emphasizes the "result state"', correct: true },
        { text: '因为韩语没有现在时', textEn: 'Because Korean has no present tense', correct: false },
        { text: '因为걸리다只有过去式', textEn: 'Because 걸리다 only has a past tense', correct: false },
        { text: '因为걸려요语法错误', textEn: 'Because 걸려요 is grammatically incorrect', correct: false },
      ],
      explain: '得病用过去式强调"结果状态"，是韩语特有的时态用法。类似 「길을 잃었어요」= 迷路了', explainEn: 'Using the past tense for getting sick emphasizes the "result state," a tense usage unique to Korean. Similar to 「길을 잃었어요」 = got lost',
    },
    {
      id: 'd13-g3-r3',
      promptZh: '"머리가 아파요" — 关于 아프다 前的助词，哪句描述最准确？', promptZhEn: '"머리가 아파요" — Which description of the particle before 아프다 is most accurate?',
      choices: [
        { text: '아프다 是形容词/感受词，前用主格 이/가，不用宾格 을/를', textEn: '아프다 is an adjective/feeling word, so it takes the nominative 이/가, not the accusative 을/를', correct: true },
        { text: '아프다 是动词，前用宾格 을/를', textEn: '아프다 is a verb, so it takes the accusative 을/를', correct: false },
        { text: '아프다前不用任何助词', textEn: 'No particle is used before 아프다', correct: false },
        { text: '아프다前用位置 에', textEn: 'The location particle 에 is used before 아프다', correct: false },
      ],
      explain: '아프다 是**形容词**（感受表达）。跟 있다/없다/필요하다 一样是感受类，前用主格 이/가。머리가 아파요 ✅', explainEn: '아프다 is an **adjective** (expressing a feeling). Like 있다/없다/필요하다, it\'s a feeling-type word, so it takes the nominative 이/가. 머리가 아파요 ✅',
    },
    {
      id: 'd13-g3-r4',
      promptZh: '关于「드세요」和「먹으세요」，哪句描述最准确？', promptZhEn: 'Which description of 「드세요」 and 「먹으세요」 is most accurate?',
      choices: [
        { text: '드세요 是「먹다/마시다」的敬语——吃、喝共用一词。饭桌、药店、请客都用', textEn: '드세요 is the honorific for 「먹다/마시다」—one word for both eating and drinking. Used at the table, pharmacy, and when treating someone', correct: true },
        { text: '两者完全一样，可以互换', textEn: 'They\'re exactly the same and interchangeable.', correct: false },
        { text: '드세요 是반말，먹으세요 是敬语', textEn: '드세요 is 반말, and 먹으세요 is honorific', correct: false },
        { text: '드세요 用于喝，먹으세요 用于吃', textEn: '드세요 is for drinking, 먹으세요 is for eating', correct: false },
      ],
      explain: '드시다 是 먹다/마시다 的敬语形。对客人、长辈、病人用 드세요。먹으세요 也是敬语但更普通，드세요 层级更高', explainEn: '드시다 is the honorific form of 먹다/마시다. Use 드세요 for guests, elders, and the sick. 먹으세요 is also honorific but more common; 드세요 is a higher level',
    },
  ],
};
