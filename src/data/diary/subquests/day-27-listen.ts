import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 27 · 1-2 귀 트이기 · 听力子关卡
 * 素材：Day 27 主流程「烤肉店·Minji请客」+ 补充聚餐语料
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化「ㄹ게(요) 承诺 + 잘 먹겠/었 时态区分」
 */
export const day27Listen: ListenSubQuestData = {
  day: 27, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在烤肉店的烟里听清朋友的每一句约定',

  meaning: [
    {
      id: 'd27-l2-m1',
      audioKo: '오늘 내가 한턱 낸다!',
      choices: [
        { text: '今天我请客！', correct: true },
        { text: '今天我不请客。', correct: false },
        { text: '今天我付一半。', correct: false },
        { text: '今天不吃饭。', correct: false },
      ],
      explain: '한턱 내다 是"请一顿"固定搭配。반말 낸다 是宣示语气',
    },
    {
      id: 'd27-l2-m2',
      audioKo: '삼겹살 4인분 주세요.',
      choices: [
        { text: '请给我4人份五花肉。', correct: true },
        { text: '五花肉一人一份。', correct: false },
        { text: '4号桌上五花肉。', correct: false },
        { text: '五花肉多少钱？', correct: false },
      ],
      explain: '烤肉店必用：数量 + 인분。四人聚餐 → 4인분',
    },
    {
      id: 'd27-l2-m3',
      audioKo: '다음에 제가 살게요.',
      choices: [
        { text: '下次我请。', correct: true },
        { text: '下次帮我买。', correct: false },
        { text: '下次不用请。', correct: false },
        { text: '下次一起买。', correct: false },
      ],
      explain: '사다 → 살게요（ㄹ게요 承诺）。韩国请客文化的回礼约定',
    },
    {
      id: 'd27-l2-m4',
      audioKo: '잘 먹겠습니다!',
      choices: [
        { text: '我开动了！', correct: true },
        { text: '吃好了。', correct: false },
        { text: '不好吃。', correct: false },
        { text: '一起吃。', correct: false },
      ],
      explain: '겠 = 将要 → 饭前用。과거 잘 먹었습니다 才是"吃好了"',
    },
    {
      id: 'd27-l2-m5',
      audioKo: '계산 도와드릴게요.',
      choices: [
        { text: '我帮您结账。', correct: true },
        { text: '请自己结账。', correct: false },
        { text: '结账机在那边。', correct: false },
        { text: '结账免费。', correct: false },
      ],
      explain: '도와드리다 = 帮您（주다 的敬语）+ ㄹ게요 承诺 · 店员标准句',
    },
  ],

  cloze: [
    {
      id: 'd27-l2-c1',
      audioKo: '오늘 내가 한턱 낼게!',
      clozeParts: ['오늘 내가 한턱 ', '!'],
      choices: [
        { text: '낼게', correct: true },
        { text: '내다', correct: false },
        { text: '내요', correct: false },
        { text: '냈어', correct: false },
      ],
      explain: '내다 + ㄹ게（반말承诺）',
    },
    {
      id: 'd27-l2-c2',
      audioKo: '다음에 제가 살게요.',
      clozeParts: ['다음에 제가 ', '.'],
      choices: [
        { text: '살게요', correct: true },
        { text: '사을게요', correct: false },
        { text: '사요', correct: false },
        { text: '샀어요', correct: false },
      ],
      explain: '사다 + ㄹ게요 → 살게요（ㄹ 插入）',
    },
    {
      id: 'd27-l2-c3',
      audioKo: '잘 먹겠습니다!',
      clozeParts: ['잘 ', '!'],
      choices: [
        { text: '먹겠습니다', correct: true },
        { text: '먹었습니다', correct: false },
        { text: '먹습니다', correct: false },
        { text: '먹었어요', correct: false },
      ],
      explain: '饭前 → 겠（将要）。먹었 是"已经吃了"（饭后用）',
    },
    {
      id: 'd27-l2-c4',
      audioKo: '시험이 끝났어요!',
      clozeParts: ['시험이 ', '!'],
      choices: [
        { text: '끝났어요', correct: true },
        { text: '끝나요', correct: false },
        { text: '끝나겠어요', correct: false },
        { text: '끝났었어요', correct: false },
      ],
      explain: '过去时 → 끝나 + 았어요 → 끝났어요（缩合）',
    },
  ],

  reply: [
    {
      id: 'd27-l2-r1',
      audioKo: '오늘 내가 한턱 낸다!',
      promptZh: 'Minji 宣布请客，你想抢着付并说明理由，最自然的一句？',
      choices: [
        { text: '아니, 오늘 내가 낼게. 시험 끝난 기념으로.', correct: true },
        { text: '싫어. 배 안 고파.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '抢买单 → 내가 낼게 + 理由（시험 끝난 기념으로 = 庆祝考完）',
    },
    {
      id: 'd27-l2-r2',
      audioKo: '한국에서는 시험 끝나면 내가 사. 다음에 토리가 사.',
      promptZh: 'Minji 用韩国请客文化说服你，你想接受并感谢约定，最合适的一句？',
      choices: [
        { text: '알았어. 다음엔 내가 꼭 살게!', correct: true },
        { text: '싫어. 지금 내가 내야 해.', correct: false },
        { text: '몰라.', correct: false },
        { text: '얼마예요?', correct: false },
      ],
      explain: '알았어（接受）+ 다음엔 내가 꼭 살게（回礼约定）· 반말 최강 승낙',
    },
    {
      id: 'd27-l2-r3',
      audioKo: '계산 도와드릴게요. 60,000원입니다.',
      promptZh: '店员报出金额，Minji 结账，你想感谢款待并约定下次，最完整的一句？',
      choices: [
        { text: '잘 먹었습니다. 다음엔 제가 살게요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '싫어요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '被请客后必备两句：잘 먹었습니다（感谢款待）+ 다음엔 제가 살게요（回礼）',
    },
  ],
};
