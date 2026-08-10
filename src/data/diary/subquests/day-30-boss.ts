import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 30 · 1-5 Boss 战 · 🎓 毕业最终考
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：~지만 转折 + N 동안 + 살게요 + 30 天所学总复习
 */
export const day30Boss: BossSubQuestData = {
  day: 30, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '🎓 초급 졸업 · 走完 30 天',
  intro: '305 教室安静下来。火鹤老师放下粉笔，看向 Tori。窗外的秋天，光透过玻璃打在桌面上——上面还是那份试卷。第 3 题 짐/집 · Day 3 的笑话变成了 Day 30 的答案。妈妈，胡萝卜，30 天——你走到这里了。',
  outroHook: '🎓 通过！초급반 졸업，중급반 등록。Tori 合上日记本，把胡萝卜笔别在耳朵上。30 天的故事画上句号——但 Tori 的韩语人生才刚刚开始。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd30-b5-t1',
        audioKo: '토리 학생, 합격. 중급반으로 올라가세요.',
        choices: [
          { text: 'Tori 同学，合格。升入中级班。', correct: true },
          { text: 'Tori 同学，不合格。', correct: false },
          { text: 'Tori 同学，考试取消。', correct: false },
          { text: 'Tori 同学，请回家。', correct: false },
        ],
        explain: '合格宣布 + 升级指令',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd30-b5-t2',
        audioKo: '30일 동안 실수도 많았지만 정말 행복했어요.',
        choices: [
          { text: '30 天犯过很多错，但真的很幸福。', correct: true },
          { text: '30 天没有失误，很幸福。', correct: false },
          { text: '30 天犯错，不幸福。', correct: false },
          { text: '30 天不算失误。', correct: false },
        ],
        explain: '동안 + 지만 + 过去时 · 回顾感言',
      },
    },
    {
      type: 'choice',
      label: '连接词选择',
      task: {
        id: 'd30-b5-t3',
        promptZh: '"虽然失误多但很幸福"哪句正确？',
        choices: [
          { text: '실수도 많고 행복했어요.', correct: false },
          { text: '실수도 많았지만 행복했어요.', correct: true },
          { text: '실수도 많아서 행복했어요.', correct: false },
          { text: '실수도 많으면 행복했어요.', correct: false },
        ],
        explain: '지만 = 但是（转折）· ~고 是并列 · ~서 是原因',
      },
    },
    {
      type: 'choice',
      label: '词汇辨析',
      task: {
        id: 'd30-b5-t4',
        promptZh: '"行李好重"哪句正确？',
        choices: [
          { text: '집이 무거워요.', correct: false },
          { text: '짐이 무거워요.', correct: true },
          { text: '짐이 무겁어요.', correct: false },
          { text: '짐가 무거워요.', correct: false },
        ],
        explain: 'Day 3 的经典梗 · 짐 = 行李 / 집 = 家',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd30-b5-t5',
        promptKo: '앞으로도',
        promptHangul: 'a-peu-ro-do',
        choices: [
          { text: '今后也', correct: true },
          { text: '以前也', correct: false },
          { text: '再往前', correct: false },
          { text: '一直到', correct: false },
        ],
        explain: '앞으로 + 도 · 承诺关系延续的关键词',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd30-b5-t6',
        zhHint: '30 天犯过很多错，但真的很幸福。',
        audioKo: '30일 동안 실수도 많았지만, 정말 행복했어요.',
        answer: ['30일', '동안', '실수도', '많았지만,', '정말', '행복했어요.'],
        tokens: ['30일', '동안', '실수도', '많았지만,', '정말', '행복했어요.', '전에', '힘들었어요.', '많고'],
        explain: '동안 + 지만 + 정말 · 毕业感言核心句',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd30-b5-t7',
        zhHint: '老师、朋友们真的感谢。今后也会好好生活。',
        audioKo: '선생님, 친구들 진짜 감사합니다. 앞으로도 잘 살게요.',
        answer: ['선생님,', '친구들', '진짜', '감사합니다.', '앞으로도', '잘', '살게요.'],
        tokens: ['선생님,', '친구들', '진짜', '감사합니다.', '앞으로도', '잘', '살게요.', '살아요.', '할게요.', '고마워.'],
        explain: '毕业最终句：感谢 + 承诺 · 30 天走完的仪式感',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd30-b5-t8',
        promptZh: '老师宣布"토리 학생, 합격. 중급반으로 올라가세요"。你要惊喜+感谢，最标准的一句？',
        choices: [
          { text: '정말요? 감사합니다!', correct: true },
          { text: '싫어요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '몰라요.', correct: false },
        ],
        explain: '正式宣布 → 정말요?（惊喜）+ 감사합니다（합쇼체）',
      },
    },
  ],
};
