import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 30 · 1-5 Boss 战 · 🎓 毕业最终考
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：~지만 转折 + N 동안 + 살게요 + 30 天所学总复习
 */
export const day30Boss: BossSubQuestData = {
  day: 30, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '🎓 초급 졸업 · 走完 30 天', subtitleEn: '🎓 Beginner Graduation · Completed 30 Days',
  intro: '305 教室安静下来。火鹤老师放下粉笔，看向 Tori。窗外的秋天，光透过玻璃打在桌面上——上面还是那份试卷。第 3 题 짐/집 · Day 3 的笑话变成了 Day 30 的答案。妈妈，胡萝卜，30 天——你走到这里了。', introEn: 'Classroom 305 fell quiet. Teacher Flamingo put down the chalk and looked at Tori. Outside, autumn light streamed through the window onto the desk—where the test paper still lay. Question 3, 짐/집—the joke from Day 3 had become the answer on Day 30. Mom, carrots, 30 days—you made it here.',
  outroHook: '🎓 通过！초급반 졸업，중급반 등록。Tori 合上日记本，把胡萝卜笔别在耳朵上。30 天的故事画上句号——但 Tori 的韩语人生才刚刚开始。', outroHookEn: '🎓 Passed! Beginner class graduated, intermediate class registered. Tori closed the diary and tucked the carrot pen behind her ear. The 30-day story came to an end—but Tori\'s Korean journey was just beginning.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd30-b5-t1',
        audioKo: '토리 학생, 합격. 중급반으로 올라가세요.',
        choices: [
          { text: 'Tori 同学，合格。升入中级班。', textEn: 'Student Tori, you passed. You\'re moving up to the intermediate class.', correct: true },
          { text: 'Tori 同学，不合格。', textEn: 'Student Tori, you didn\'t pass.', correct: false },
          { text: 'Tori 同学，考试取消。', textEn: 'Student Tori, the exam is canceled.', correct: false },
          { text: 'Tori 同学，请回家。', textEn: 'Student Tori, please go home.', correct: false },
        ],
        explain: '合格宣布 + 升级指令', explainEn: 'Pass announcement + promotion instruction',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd30-b5-t2',
        audioKo: '30일 동안 실수도 많았지만 정말 행복했어요.',
        choices: [
          { text: '30 天犯过很多错，但真的很幸福。', textEn: 'Made many mistakes over 30 days, but truly happy.', correct: true },
          { text: '30 天没有失误，很幸福。', textEn: 'No mistakes in 30 days, very happy.', correct: false },
          { text: '30 天犯错，不幸福。', textEn: 'Made mistakes for 30 days, not happy.', correct: false },
          { text: '30 天不算失误。', textEn: '30 days doesn\'t count as a mistake.', correct: false },
        ],
        explain: '동안 + 지만 + 过去时 · 回顾感言', explainEn: 'During + but + past tense · reflective remarks',
      },
    },
    {
      type: 'choice',
      label: '连接词选择', labelEn: 'Choosing the connector',
      task: {
        id: 'd30-b5-t3',
        promptZh: '"虽然失误多但很幸福"哪句正确？', promptZhEn: 'Which sentence is correct: "Although there were many mistakes, I was happy"?',
        choices: [
          { text: '실수도 많고 행복했어요.', correct: false },
          { text: '실수도 많았지만 행복했어요.', correct: true },
          { text: '실수도 많아서 행복했어요.', correct: false },
          { text: '실수도 많으면 행복했어요.', correct: false },
        ],
        explain: '지만 = 但是（转折）· ~고 是并列 · ~서 是原因', explainEn: '지만 = but (contrast) · ~고 is listing · ~서 is reason',
      },
    },
    {
      type: 'choice',
      label: '词汇辨析', labelEn: 'Vocabulary distinction',
      task: {
        id: 'd30-b5-t4',
        promptZh: '"行李好重"哪句正确？', promptZhEn: 'Which sentence is correct: "The luggage is so heavy"?',
        choices: [
          { text: '집이 무거워요.', correct: false },
          { text: '짐이 무거워요.', correct: true },
          { text: '짐이 무겁어요.', correct: false },
          { text: '짐가 무거워요.', correct: false },
        ],
        explain: 'Day 3 的经典梗 · 짐 = 行李 / 집 = 家', explainEn: 'Classic joke from Day 3 · 짐 = luggage / 집 = home',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd30-b5-t5',
        promptKo: '앞으로도',
        promptHangul: 'a-peu-ro-do',
        choices: [
          { text: '今后也', textEn: 'From now on too', correct: true },
          { text: '以前也', textEn: 'Before too', correct: false },
          { text: '再往前', textEn: 'Further back', correct: false },
          { text: '一直到', textEn: 'All the way until', correct: false },
        ],
        explain: '앞으로 + 도 · 承诺关系延续的关键词', explainEn: '앞으로 + 도 · key phrase for continuing a promise',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd30-b5-t6',
        zhHint: '30 天犯过很多错，但真的很幸福。', zhHintEn: 'Made many mistakes over 30 days, but truly happy.',
        audioKo: '30일 동안 실수도 많았지만, 정말 행복했어요.',
        answer: ['30일', '동안', '실수도', '많았지만,', '정말', '행복했어요.'],
        tokens: ['30일', '동안', '실수도', '많았지만,', '정말', '행복했어요.', '전에', '힘들었어요.', '많고'],
        explain: '동안 + 지만 + 정말 · 毕业感言核心句', explainEn: '동안 + 지만 + 정말 · core sentence of graduation speech',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd30-b5-t7',
        zhHint: '老师、朋友们真的感谢。今后也会好好生活。', zhHintEn: 'Teacher, friends, thank you so much. I\'ll live well from now on.',
        audioKo: '선생님, 친구들 진짜 감사합니다. 앞으로도 잘 살게요.',
        answer: ['선생님,', '친구들', '진짜', '감사합니다.', '앞으로도', '잘', '살게요.'],
        tokens: ['선생님,', '친구들', '진짜', '감사합니다.', '앞으로도', '잘', '살게요.', '살아요.', '할게요.', '고마워.'],
        explain: '毕业最终句：感谢 + 承诺 · 30 天走完的仪式感', explainEn: 'Final graduation line: gratitude + promise · the ceremonial feel of completing 30 days',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd30-b5-t8',
        promptZh: '老师宣布"토리 학생, 합격. 중급반으로 올라가세요"。你要惊喜+感谢，最标准的一句？', promptZhEn: 'The teacher announces, "Tori student, you passed. Move up to the intermediate class." What\'s the most standard response for surprise + gratitude?',
        choices: [
          { text: '정말요? 감사합니다!', correct: true },
          { text: '싫어요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '몰라요.', correct: false },
        ],
        explain: '正式宣布 → 정말요?（惊喜）+ 감사합니다（합쇼체）', explainEn: 'Formal announcement → 정말요? (surprise) + 감사합니다 (formal style)',
      },
    },
  ],
};
