import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 19 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词（병원/내과/열/목/아파요/진료）之外的 8 个新词。
 * - core: 감기 / 약 / 접수 / 처방전 / 의사 / 배（进认词考察）
 * - ext:  기다리다 / 콧물（进拼写 / 听辨）
 *
 * 内科诊所场景延展：从"感冒"到"接诊→拿处方"的完整流程词汇。
 */
export const day19Vocab: VocabSubQuestData = {
  day: 19,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '内科诊所前台学到的 8 个词', subtitleEn: '8 words learned at the internal medicine clinic front desk',

  encounter: [
    {
      id: 'd19-v1-e1',
      korean: '감기',
      hangul: 'gam-gi',
      zh: '感冒', zhEn: 'cold',
      pos: '名词', posEn: 'Noun',
      example: { ko: '감기에 걸렸어요.', zh: '感冒了。', zhEn: 'I caught a cold.' },
      tip: '汉字词「感气」。惯用搭配 감기에 걸리다 = 得感冒（用 걸리다 挂上，不用 하다）', tipEn: 'Sino-Korean word 「感气」. Common collocation: 감기에 걸리다 = to catch a cold (uses 걸리다, not 하다).',
      tier: 'core',
    },
    {
      id: 'd19-v1-e2',
      korean: '약',
      hangul: 'yak',
      zh: '药', zhEn: 'medicine',
      pos: '名词', posEn: 'Noun',
      example: { ko: '약 먹었어요?', zh: '吃药了吗？', zhEn: 'Did you take your medicine?' },
      tip: '「药」的固有汉字词。韩国说"吃药"用 약을 먹다（吃）。搭配「약국」= 药店', tipEn: 'Native Korean word for medicine. Koreans say 약을 먹다 (eat) for "take medicine." Related: 「약국」= pharmacy.',
      tier: 'core',
    },
    {
      id: 'd19-v1-e3',
      korean: '접수',
      hangul: 'jeop-su',
      zh: '挂号 / 受理', zhEn: 'Registration / Reception',
      pos: '名词', posEn: 'Noun',
      example: { ko: '접수는 저쪽이에요.', zh: '挂号在那边。', zhEn: 'Registration is over there.' },
      tip: '汉字词「接受」。医院/银行/政府都用。搭配「접수하다」= 挂号 / 办受理', tipEn: 'Sino-Korean word for \'accept/receive.\' Used in hospitals, banks, and government offices. Paired with \'접수하다\' = to register / check in.',
      tier: 'core',
    },
    {
      id: 'd19-v1-e4',
      korean: '처방전',
      hangul: 'cheo-bang-jeon',
      zh: '处方 / 处方笺', zhEn: 'prescription',
      pos: '名词', posEn: 'Noun',
      example: { ko: '처방전 여기 있어요.', zh: '处方在这里。', zhEn: 'The prescription is here.' },
      tip: '汉字词「处方笺」。韩国看病流程：병원(诊断) → 처방전 → 약국(拿药)。处方分两联', tipEn: 'Sino-Korean word for \'prescription.\' Korea\'s medical process: 병원 (diagnosis) → 처방전 (prescription) → 약국 (pick up meds). The prescription has two parts.',
      tier: 'core',
    },
    {
      id: 'd19-v1-e5',
      korean: '의사',
      hangul: 'ui-sa',
      zh: '医生', zhEn: 'Doctor',
      pos: '名词', posEn: 'Noun',
      example: { ko: '의사 선생님이에요.', zh: '是医生。', zhEn: 'He is a doctor.', },
      tip: '汉字词「医师」。当面称呼加 선생님 → 의사 선생님（最礼貌）', tipEn: 'Sino-Korean word for \'physician.\' Add 선생님 when addressing directly → 의사 선생님 (most polite).',
      tier: 'core',
    },
    {
      id: 'd19-v1-e6',
      korean: '배',
      hangul: 'bae',
      zh: '肚子 / 腹部', zhEn: 'Stomach / Abdomen',
      pos: '名词', posEn: 'Noun',
      example: { ko: '배가 아파요.', zh: '肚子疼。', zhEn: 'My stomach hurts.' },
      tip: '固有词。三重多义：肚子 / 梨 / 船（同形同音）。看病语境专指腹部', tipEn: 'Native Korean word. Triple meaning: stomach / pear / boat (same spelling and sound). In medical contexts, it specifically refers to the abdomen.',
      tier: 'core',
    },
    {
      id: 'd19-v1-e7',
      korean: '기다리다',
      hangul: 'gi-da-ri-da',
      zh: '等待', zhEn: 'Wait',
      pos: '动词', posEn: 'Verb',
      example: { ko: '30분 기다려 주세요.', zh: '请等30分钟。', zhEn: 'Please wait 30 minutes.' },
      tip: '해요体：기다려요。惯用「기다려 주세요」= 请等一下。看病/餐厅/机场都用', tipEn: '해요 form: 기다려요. Common phrase \'기다려 주세요\' = please wait. Used in hospitals, restaurants, and airports.',
      tier: 'ext',
    },
    {
      id: 'd19-v1-e8',
      korean: '콧물',
      hangul: 'kon-mul',
      zh: '鼻涕', zhEn: 'runny nose',
      pos: '名词', posEn: 'Noun',
      example: { ko: '콧물이 나요.', zh: '流鼻涕。', zhEn: 'I have a runny nose.' },
      tip: '코(鼻子) + 물(水)。사이시옷 使 코 变 콧。惯用 콧물이 나다 = 流鼻涕（不是 흐르다）', tipEn: '코 (nose) + 물 (water). The 사이시옷 changes 코 to 콧. Common expression 콧물이 나다 = to have a runny nose (not 흐르다).',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd19-v1-r1',
      korean: '감기',
      hangul: 'gam-gi',
      choices: [
        { zh: '感冒', zhEn: 'cold', correct: true },
        { zh: '头痛', zhEn: 'Headache', correct: false },
        { zh: '发烧', zhEn: 'fever', correct: false },
        { zh: '过敏', zhEn: 'Allergy', correct: false },
      ],
    },
    {
      id: 'd19-v1-r2',
      korean: '약',
      hangul: 'yak',
      choices: [
        { zh: '药', zhEn: 'medicine', correct: true },
        { zh: '茶', zhEn: 'tea', correct: false },
        { zh: '水', zhEn: 'Water', correct: false },
        { zh: '糖', zhEn: 'Sugar', correct: false },
      ],
    },
    {
      id: 'd19-v1-r3',
      korean: '접수',
      hangul: 'jeop-su',
      choices: [
        { zh: '挂号 / 受理', zhEn: 'Registration / Reception', correct: true },
        { zh: '缴费', zhEn: 'Payment', correct: false },
        { zh: '取药', zhEn: 'Pick up medication', correct: false },
        { zh: '预约', zhEn: 'Appointment', correct: false },
      ],
    },
    {
      id: 'd19-v1-r4',
      korean: '처방전',
      hangul: 'cheo-bang-jeon',
      choices: [
        { zh: '处方', zhEn: 'prescription', correct: true },
        { zh: '账单', zhEn: 'bill', correct: false },
        { zh: '病历', zhEn: 'medical record', correct: false },
        { zh: '化验单', zhEn: 'Lab test results', correct: false },
      ],
    },
    {
      id: 'd19-v1-r5',
      korean: '의사',
      hangul: 'ui-sa',
      choices: [
        { zh: '医生', zhEn: 'Doctor', correct: true },
        { zh: '护士', zhEn: 'Nurse', correct: false },
        { zh: '药师', zhEn: 'Pharmacist', correct: false },
        { zh: '患者', zhEn: 'Patient', correct: false },
      ],
    },
    {
      id: 'd19-v1-r6',
      korean: '배',
      hangul: 'bae',
      choices: [
        { zh: '肚子', zhEn: 'stomach', correct: true },
        { zh: '喉咙', zhEn: 'throat', correct: false },
        { zh: '腰', zhEn: 'Waist', correct: false },
        { zh: '胸', zhEn: 'chest', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd19-v1-s1',
      zhHint: '医院', zhHintEn: 'Hospital',
      answer: ['병', '원'],
      // 干扰："평"（初声 ㅂ→ㅍ 差别）；"완"（元音 ㅝ 相似）
      syllables: ['병', '원', '평', '완'],
    },
    {
      id: 'd19-v1-s2',
      zhHint: '发烧 / 热', zhHintEn: 'Fever / heat.',
      answer: ['열'],
      // 干扰："영"（收音 ㄹ→ㅇ）；"엽"（收音 ㄹ→ㅂ）；"열" 类似"헐"（初声差别）
      syllables: ['열', '영', '엽', '헐'],
    },
    {
      id: 'd19-v1-s3',
      zhHint: '处方', zhHintEn: 'prescription',
      answer: ['처', '방', '전'],
      // 干扰："차"（初声 ㅊ 相同、元音 ㅓ→ㅏ）；"팡"（初声差别）
      syllables: ['처', '방', '전', '차', '팡'],
    },
    {
      id: 'd19-v1-s4',
      zhHint: '鼻涕', zhHintEn: 'runny nose',
      answer: ['콧', '물'],
      // 干扰："코"（콧 少 사이시옷）；"뭉"（元音差别）
      syllables: ['콧', '물', '코', '뭉'],
    },
  ],

  write: [
    { id: 'd19-v1-w1', korean: '감', hangul: 'gam',   wordKorean: '감기',    wordZh: '感冒', wordZhEn: 'cold' },
    { id: 'd19-v1-w2', korean: '약', hangul: 'yak',   wordKorean: '약',      wordZh: '药', wordZhEn: 'medicine' },
    { id: 'd19-v1-w3', korean: '접', hangul: 'jeop',  wordKorean: '접수',    wordZh: '挂号', wordZhEn: 'to register (at a hospital)' },
    { id: 'd19-v1-w4', korean: '처', hangul: 'cheo',  wordKorean: '처방전',  wordZh: '处方', wordZhEn: 'prescription' },
    { id: 'd19-v1-w5', korean: '의', hangul: 'ui',    wordKorean: '의사',    wordZh: '医生', wordZhEn: 'Doctor' },
    { id: 'd19-v1-w6', korean: '배', hangul: 'bae',   wordKorean: '배',      wordZh: '肚子', wordZhEn: 'stomach' },
    { id: 'd19-v1-w7', korean: '기', hangul: 'gi',    wordKorean: '기다리다', wordZh: '等待', wordZhEn: 'Wait' },
    { id: 'd19-v1-w8', korean: '콧', hangul: 'kon',   wordKorean: '콧물',    wordZh: '鼻涕', wordZhEn: 'runny nose' },
  ],

  dictation: [
    { id: 'd19-v1-d1', korean: '열이 나요',   hangul: 'yeo-ri na-yo',    syllables: ['열', '이', '나', '요'],       zh: '发烧了', zhEn: 'have a fever' },
    { id: 'd19-v1-d2', korean: '목이 아파요', hangul: 'mo-gi a-pa-yo',   syllables: ['목', '이', '아', '파', '요'], zh: '嗓子疼', zhEn: 'sore throat' },
    { id: 'd19-v1-d3', korean: '기다려 주세요', hangul: 'gi-da-ryeo ju-se-yo', syllables: ['기', '다', '려', '주', '세', '요'], zh: '请等一下', zhEn: 'Please wait a moment' },
  ],
};
