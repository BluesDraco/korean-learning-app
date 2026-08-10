import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 19 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：내과 诊所 · 从挂号到看诊到拿处方的全流程
 */
export const day19Scene: SceneSubQuestData = {
  day: 19, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在内科完成第一次看病', subtitleEn: 'Complete your first visit to the internal medicine department.',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd19-sc-s1',
      scenario: '兔护士问「어디 아프세요?（哪里不舒服？）」你发烧、嗓子也疼，最完整的一句？', scenarioEn: 'The rabbit nurse asks "어디 아프세요? (Where does it hurt?)" You have a fever and your throat hurts too. What\'s the most complete answer?',
      choices: [
        { ko: '열도 나고, 목도 아파요.', zh: '也发烧，嗓子也疼。', zhEn: 'I have a fever, and my throat hurts too.', correct: true },
        { ko: '병원이에요.', zh: '这是医院。', zhEn: 'This is the hospital.', correct: false },
        { ko: '감기예요.', zh: '是感冒。', zhEn: 'It\'s a cold.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
      ],
      explain: '被问症状 → 用 도…도… 并列表达。护士要在病历上勾多个症状，越具体越好', explainEn: 'When asked about symptoms → use 도…도… to list them. The nurse needs to check off multiple symptoms on your chart, so the more specific, the better.',
    },
    {
      type: 'situation',
      id: 'd19-sc-s2',
      scenario: '医生开完处方，递给你「처방전 여기 있어요」，你还需要问哪里去拿药，最自然的？', scenarioEn: 'The doctor finishes the prescription and hands it to you saying "처방전 여기 있어요". You still need to ask where to get the medicine. What\'s the most natural question?',
      choices: [
        { ko: '약국은 어디예요?', zh: '药店在哪里？', zhEn: 'Where is the pharmacy?', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '병원이 어디예요?', zh: '医院在哪里？', zhEn: 'Where is the hospital?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '韩国看病流程：拿处方后要去 약국(药店) 抓药。「X이 어디예요?」= X 在哪里？', explainEn: 'In Korea, after getting a prescription, you go to the 약국 (pharmacy) to get your medicine. "X이 어디예요?" = Where is X?',
    },
    {
      type: 'situation',
      id: 'd19-sc-s3',
      scenario: '朋友说 "저 감기에 걸렸어요"（我感冒了），最贴心的回应？', scenarioEn: 'A friend says "저 감기에 걸렸어요" (I caught a cold). What\'s the most caring response?',
      choices: [
        { ko: '많이 아파요? 병원 갔어요?', zh: '很难受吗？去医院了吗？', zhEn: 'Are you feeling really sick? Did you go to the hospital?', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '저는 학생이에요.', zh: '我是学生。', zhEn: 'I am a student.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '朋友说生病 → 关心症状程度 + 建议看医生。「많이 아파요?」= 很疼/难受吗？', explainEn: 'Friend says they\'re sick → show concern about how bad it is + suggest seeing a doctor. 「많이 아파요?」= Does it hurt a lot? / Are you feeling really bad?',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd19-sc-d1',
      lines: [
        { speaker: '토끼 간호사', ko: '안녕하세요. 어디 아프세요?', zh: '您好，哪里不舒服？', zhEn: 'Hello, where do you feel unwell?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '열도 나고, 목도 아파요.', zh: '也发烧，嗓子也疼。', zhEn: 'I have a fever, and my throat hurts too.', correct: true },
        { ko: '병원이 어디예요?', zh: '医院在哪里？', zhEn: 'Where is the hospital?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '감기가 뭐예요?', zh: '感冒是什么？', zhEn: 'What is a cold?', correct: false },
      ],
      explain: '护士问诊 → 说症状。도…도… 是最简洁的并列表达', explainEn: 'Nurse asks about symptoms → describe them. 도…도… is the simplest way to list things.',
    },
    {
      type: 'dialogue',
      id: 'd19-sc-d2',
      lines: [
        { speaker: '토끼 간호사', ko: '처음 오시는 거죠? 외국인등록증 주세요.', zh: '第一次来吧？请给登录证。', zhEn: 'First time here? Please give me your registration card.' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 여기 있어요.', zh: '好的，在这里。', zhEn: 'Okay, here it is.', correct: true },
        { ko: '외국인등록증이 뭐예요?', zh: '登录证是什么？', zhEn: 'What is an alien registration card?', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '없어요.', zh: '没有。', zhEn: 'There isn\'t any.', correct: false },
      ],
      explain: '递证件 → 「네, 여기 있어요」。跟 Day 18 银行开户是同一动作', explainEn: 'Handing over the ID → 「네, 여기 있어요」. Same action as opening a bank account on Day 18.',
    },
    {
      type: 'dialogue',
      id: 'd19-sc-d3',
      lines: [
        { speaker: '의사 선생님', ko: '감기 같아요. 약 드릴게요.', zh: '像是感冒。给您开药。', zhEn: 'It seems like a cold. I\'ll prescribe you some medicine.' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 감사합니다.', zh: '好的，谢谢。', zhEn: 'Okay, thank you.', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '약이 뭐예요?', zh: '药是什么？', zhEn: 'What is medicine?', correct: false },
      ],
      explain: '医生给你开药 → 感谢就够了。「감사합니다」是最合适的합쇼체礼貌', explainEn: 'Doctor prescribes medicine → just say thanks. 「감사합니다」 is the most appropriate formal polite form.',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd19-sc-c1',
      ko: '어디 아프세요?',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '医护人员对患者问诊', zhEn: 'Medical staff asking a patient about their symptoms', correct: true },
        { zh: '朋友之间问路', zhEn: 'Friends asking each other for directions', correct: false },
        { zh: '客人在餐厅点菜', zhEn: 'A customer ordering food at a restaurant', correct: false },
        { zh: '第一次见面打招呼', zhEn: 'Greeting someone for the first time', correct: false },
      ],
      explain: '아프다 + 세요? = 敬语。医院/诊所专用问句。朋友之间会说「어디 아파?」（반말）', explainEn: '아프다 + 세요? = polite form. Used specifically in hospitals/clinics. Between friends, you\'d say 「어디 아파?」 (casual).',
    },
    {
      type: 'context',
      id: 'd19-sc-c2',
      ko: '감기에 걸렸어요.',
      promptZh: '这句话最可能出现在什么场景？', promptZhEn: 'In what situation is this sentence most likely used?',
      choices: [
        { zh: '跟别人说自己生病了（请假 / 就诊 / 关心）', zhEn: 'Telling someone you\'re sick (for time off / a doctor\'s visit / showing concern)', correct: true },
        { zh: '在药店买药前问价格', zhEn: 'Asking the price before buying medicine at a pharmacy', correct: false },
        { zh: '医生对患者宣布诊断结果', zhEn: 'Doctor telling a patient the diagnosis', correct: false },
        { zh: '在餐厅点感冒药汤', zhEn: 'Ordering cold medicine soup at a restaurant', correct: false },
      ],
      explain: '「감기에 걸렸어요」= 感冒了。用于**自我陈述**症状。医生宣布诊断会说「감기예요/감기 같아요」', explainEn: '「감기에 걸렸어요」= I caught a cold. Used to **state your own** symptoms. A doctor announcing a diagnosis would say 「감기예요/감기 같아요」.',
    },
  ],
};
