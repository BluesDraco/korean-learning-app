import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 19 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：내과 诊所 · 从挂号到看诊到拿处方的全流程
 */
export const day19Scene: SceneSubQuestData = {
  day: 19, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在内科完成第一次看病',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd19-sc-s1',
      scenario: '兔护士问「어디 아프세요?（哪里不舒服？）」你发烧、嗓子也疼，最完整的一句？',
      choices: [
        { ko: '열도 나고, 목도 아파요.', zh: '也发烧，嗓子也疼。', correct: true },
        { ko: '병원이에요.', zh: '这是医院。', correct: false },
        { ko: '감기예요.', zh: '是感冒。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
      ],
      explain: '被问症状 → 用 도…도… 并列表达。护士要在病历上勾多个症状，越具体越好',
    },
    {
      type: 'situation',
      id: 'd19-sc-s2',
      scenario: '医生开完处方，递给你「처방전 여기 있어요」，你还需要问哪里去拿药，最自然的？',
      choices: [
        { ko: '약국은 어디예요?', zh: '药店在哪里？', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '병원이 어디예요?', zh: '医院在哪里？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '韩国看病流程：拿处方后要去 약국(药店) 抓药。「X이 어디예요?」= X 在哪里？',
    },
    {
      type: 'situation',
      id: 'd19-sc-s3',
      scenario: '朋友说 "저 감기에 걸렸어요"（我感冒了），最贴心的回应？',
      choices: [
        { ko: '많이 아파요? 병원 갔어요?', zh: '很难受吗？去医院了吗？', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '저는 학생이에요.', zh: '我是学生。', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '朋友说生病 → 关心症状程度 + 建议看医生。「많이 아파요?」= 很疼/难受吗？',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd19-sc-d1',
      lines: [
        { speaker: '토끼 간호사', ko: '안녕하세요. 어디 아프세요?', zh: '您好，哪里不舒服？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '열도 나고, 목도 아파요.', zh: '也发烧，嗓子也疼。', correct: true },
        { ko: '병원이 어디예요?', zh: '医院在哪里？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
        { ko: '감기가 뭐예요?', zh: '感冒是什么？', correct: false },
      ],
      explain: '护士问诊 → 说症状。도…도… 是最简洁的并列表达',
    },
    {
      type: 'dialogue',
      id: 'd19-sc-d2',
      lines: [
        { speaker: '토끼 간호사', ko: '처음 오시는 거죠? 외국인등록증 주세요.', zh: '第一次来吧？请给登录证。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 여기 있어요.', zh: '好的，在这里。', correct: true },
        { ko: '외국인등록증이 뭐예요?', zh: '登录证是什么？', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '없어요.', zh: '没有。', correct: false },
      ],
      explain: '递证件 → 「네, 여기 있어요」。跟 Day 18 银行开户是同一动作',
    },
    {
      type: 'dialogue',
      id: 'd19-sc-d3',
      lines: [
        { speaker: '의사 선생님', ko: '감기 같아요. 약 드릴게요.', zh: '像是感冒。给您开药。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 감사합니다.', zh: '好的，谢谢。', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '약이 뭐예요?', zh: '药是什么？', correct: false },
      ],
      explain: '医生给你开药 → 感谢就够了。「감사합니다」是最合适的합쇼체礼貌',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd19-sc-c1',
      ko: '어디 아프세요?',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '医护人员对患者问诊', correct: true },
        { zh: '朋友之间问路', correct: false },
        { zh: '客人在餐厅点菜', correct: false },
        { zh: '第一次见面打招呼', correct: false },
      ],
      explain: '아프다 + 세요? = 敬语。医院/诊所专用问句。朋友之间会说「어디 아파?」（반말）',
    },
    {
      type: 'context',
      id: 'd19-sc-c2',
      ko: '감기에 걸렸어요.',
      promptZh: '这句话最可能出现在什么场景？',
      choices: [
        { zh: '跟别人说自己生病了（请假 / 就诊 / 关心）', correct: true },
        { zh: '在药店买药前问价格', correct: false },
        { zh: '医生对患者宣布诊断结果', correct: false },
        { zh: '在餐厅点感冒药汤', correct: false },
      ],
      explain: '「감기에 걸렸어요」= 感冒了。用于**自我陈述**症状。医生宣布诊断会说「감기예요/감기 같아요」',
    },
  ],
};
