import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 19 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 19 主流程「내과·兔护士」+ 补充症状语料
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 N + 도 助词替换 + 症状表达 X이 아프다 / X이 나다
 */
export const day19Listen: ListenSubQuestData = {
  day: 19, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在内科前台听清兔护士的每一句', subtitleEn: 'At the internal medicine front desk, catch every word Nurse Rabbit says',

  meaning: [
    {
      id: 'd19-l2-m1',
      audioKo: '어디 아프세요?',
      choices: [
        { text: '哪里不舒服？', textEn: 'Where does it hurt?', correct: true },
        { text: '哪里疼？（问熟人）', textEn: 'Where does it hurt? (asking someone familiar)', correct: false },
        { text: '什么时候不舒服？', textEn: 'When did you start feeling unwell?', correct: false },
        { text: '在哪里？', textEn: 'Where is it?', correct: false },
      ],
      explain: '아프다 + 세요? = 敬语疑问。医护人员对患者的标准问句', explainEn: '아프다 + 세요? = polite question. Standard for medical staff to ask patients',
    },
    {
      id: 'd19-l2-m2',
      audioKo: '열도 나고, 목도 아파요.',
      choices: [
        { text: '也发烧，嗓子也疼。', textEn: 'I have a fever, and my throat hurts too.', correct: true },
        { text: '只是发烧，嗓子不疼。', textEn: 'Just a fever, no sore throat.', correct: false },
        { text: '嗓子疼，没发烧。', textEn: 'Sore throat, no fever.', correct: false },
        { text: '肚子疼，头也疼。', textEn: 'Stomach ache, and headache too.', correct: false },
      ],
      explain: '「A도 …고, B도 …」= A 也 … B 也 …。两个症状并列表达', explainEn: '"A도 …고, B도 …" = A also …, B also …. Lists two symptoms together',
    },
    {
      id: 'd19-l2-m3',
      audioKo: '30분 정도 기다리셔야 해요.',
      choices: [
        { text: '需要等30分钟左右。', textEn: 'You\'ll need to wait about 30 minutes.', correct: true },
        { text: '30分钟后来。', textEn: 'Come back in 30 minutes.', correct: false },
        { text: '30分钟内看完。', textEn: 'Will be seen within 30 minutes.', correct: false },
        { text: '等一下再来。', textEn: 'Come back later.', correct: false },
      ],
      explain: '정도(左右) + 기다리셔야 해요(得等)。医院/银行常听到的话', explainEn: '정도 (about) + 기다리셔야 해요 (have to wait). Commonly heard at hospitals/banks',
    },
    {
      id: 'd19-l2-m4',
      audioKo: '감기에 걸렸어요.',
      choices: [
        { text: '感冒了。', textEn: 'I caught a cold.', correct: true },
        { text: '快感冒了。', textEn: 'I\'m about to catch a cold.', correct: false },
        { text: '刚吃过感冒药。', textEn: 'I just took cold medicine.', correct: false },
        { text: '很怕感冒。', textEn: 'I\'m really afraid of catching a cold.', correct: false },
      ],
      explain: '感冒用 걸리다（挂上），不用 하다。「감기에 걸리다」是固定搭配', explainEn: 'For colds, use 걸리다 (to catch), not 하다. "감기에 걸리다" is a fixed expression.',
    },
    {
      id: 'd19-l2-m5',
      audioKo: '처방전 여기 있어요.',
      choices: [
        { text: '处方在这里。', textEn: 'The prescription is here.', correct: true },
        { text: '在这里挂号。', textEn: 'Check in here.', correct: false },
        { text: '取药在这里。', textEn: 'Pick up your medicine here.', correct: false },
        { text: '医生在这里。', textEn: 'The doctor is here.', correct: false },
      ],
      explain: '处方开好后，医生递给你说的话。拿着去 약국(药店) 抓药', explainEn: 'What the doctor says when handing you the prescription. Take it to the 약국 (pharmacy) to get your medicine.',
    },
  ],

  cloze: [
    {
      id: 'd19-l2-c1',
      audioKo: '저도 학생이에요.',
      clozeParts: ['저', ' 학생이에요.'],
      choices: [
        { text: '도', correct: true },
        { text: '는', correct: false },
        { text: '가', correct: false },
        { text: '를', correct: false },
      ],
      explain: '도 = "也"。「저도」= 我也，直接替换主题助词 는，不叠加', explainEn: '도 = "also". "저도" = me too, directly replaces the topic particle 는, not added on top.',
    },
    {
      id: 'd19-l2-c2',
      audioKo: '열도 나고 목도 아파요.',
      clozeParts: ['열', ' 나고 목도 아파요.'],
      choices: [
        { text: '도', correct: true },
        { text: '이', correct: false },
        { text: '을', correct: false },
        { text: '은', correct: false },
      ],
      explain: '并列症状 → A도 …, B도 …。都要加 도。「열도」= 发烧也', explainEn: 'Listing symptoms → A도 …, B도 …. Add 도 to each. "열도" = fever too.',
    },
    {
      id: 'd19-l2-c3',
      audioKo: '머리가 아파요.',
      clozeParts: ['머리', ' 아파요.'],
      choices: [
        { text: '가', correct: true },
        { text: '를', correct: false },
        { text: '에', correct: false },
        { text: '도', correct: false },
      ],
      explain: '아프다 是形容词 → 主语用 이/가。머리 无收音 → 가。「머리가 아파요」= 头疼', explainEn: '아프다 is an adjective → subject takes 이/가. 머리 has no final consonant → 가. "머리가 아파요" = my head hurts.',
    },
    {
      id: 'd19-l2-c4',
      audioKo: '콧물이 나요.',
      clozeParts: ['콧물', ' 나요.'],
      choices: [
        { text: '이', correct: true },
        { text: '가', correct: false },
        { text: '는', correct: false },
        { text: '를', correct: false },
      ],
      explain: '나다 用主格 이/가。콧물 末字"물"有收音 ㄹ → 이。「콧물이 나요」= 流鼻涕', explainEn: '나다 takes the nominative 이/가. 콧물 ends in "물" with final consonant ㄹ → 이. "콧물이 나요" = I have a runny nose.',
    },
  ],

  reply: [
    {
      id: 'd19-l2-r1',
      audioKo: '어디 아프세요?',
      promptZh: '兔护士问"哪里不舒服？"你发烧、嗓子也疼，最完整的一句？', promptZhEn: 'The rabbit nurse asks "Where does it hurt?" You have a fever and your throat hurts too. What\'s the most complete answer?',
      choices: [
        { text: '열도 나고, 목도 아파요.', correct: true },
        { text: '병원이에요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
        { text: '얼마예요?', correct: false },
      ],
      explain: '被问症状 → 用 도…도… 并列描述。这是医护对话的核心句式', explainEn: 'When asked about symptoms → use 도…도… to list them. This is the core pattern in medical conversations.',
    },
    {
      id: 'd19-l2-r2',
      audioKo: '처음 오시는 거죠? 외국인등록증 주세요.',
      promptZh: '护士要看登录证，你已经带着，最自然的一句？', promptZhEn: 'The nurse asks for your ID card, and you have it with you. What\'s the most natural thing to say?',
      choices: [
        { text: '네, 여기 있어요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '없어요.', correct: false },
        { text: '병원이 어디예요?', correct: false },
      ],
      explain: '递证件的标准句：「여기 있어요」。跟 Day 18 银行开户是同一套动作', explainEn: 'The standard phrase for handing over your ID: "여기 있어요". Same action as opening a bank account on Day 18.',
    },
    {
      id: 'd19-l2-r3',
      audioKo: '30분 정도 기다리셔야 해요.',
      promptZh: '护士说要等 30 分钟，你愿意等，最礼貌的一句？', promptZhEn: 'The nurse says you\'ll have to wait 30 minutes, and you\'re willing to wait. What\'s the most polite response?',
      choices: [
        { text: '네, 알겠습니다.', correct: true },
        { text: '안 기다릴래요.', correct: false },
        { text: '30분이 뭐예요?', correct: false },
        { text: '얼마예요?', correct: false },
      ],
      explain: '接受安排 → 「네, 알겠습니다」（합쇼체）。医院是正式场合，用最礼貌回应', explainEn: 'Accepting the arrangement → "네, 알겠습니다" (합쇼체). Hospitals are formal settings, so use the most polite response.',
    },
  ],
};
