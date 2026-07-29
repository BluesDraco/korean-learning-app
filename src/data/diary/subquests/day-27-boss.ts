import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 27 · 1-5 Boss 战 · 회식请客综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：ㄹ게(요) 承诺 + 잘 먹겠/었 时态 + 请客文化用语
 */
export const day27Boss: BossSubQuestData = {
  day: 27, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '完成一次完整的韩式聚餐',
  intro: '烤盘的烟往天花板上滚。Junho 已经在夹肉，Haru 默默翻，Minji 笑着看你。你手里攥着钱包边缘——是抢先付？还是接受"下次我请"的约定？今天的每一句都要恰到好处。',
  outroHook: '通过！Minji 结了账。你答应了下次自己请。烤肉店走出来的夜风里，Tori 明白了——今天你请，下次我请，就是朋友。明天，偶像签售会——一个人排队，只能靠自己。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd27-b5-t1',
        audioKo: '오늘 내가 한턱 낸다!',
        choices: [
          { text: '今天我请客！', correct: true },
          { text: '今天不请客。', correct: false },
          { text: '今天付一半。', correct: false },
          { text: '今天没时间吃饭。', correct: false },
        ],
        explain: '한턱 내다 = 请一顿。반말 낸다 是宣示语气',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd27-b5-t2',
        audioKo: '삼겹살 4인분 주세요.',
        choices: [
          { text: '请给我4人份五花肉。', correct: true },
          { text: '五花肉多少钱？', correct: false },
          { text: '五花肉够4人。', correct: false },
          { text: '4号桌上五花肉。', correct: false },
        ],
        explain: '数字 + 인분 = 几人份',
      },
    },
    {
      type: 'choice',
      label: '语尾选择',
      task: {
        id: 'd27-b5-t3',
        promptZh: '刚上菜，最合适饭前说的一句？',
        choices: [
          { text: '잘 먹었습니다.', correct: false },
          { text: '잘 먹겠습니다.', correct: true },
          { text: '잘 먹어요.', correct: false },
          { text: '잘 먹지 마세요.', correct: false },
        ],
        explain: '겠 = 将要（饭前）；었 = 过去（饭后）',
      },
    },
    {
      type: 'choice',
      label: '形态改错',
      task: {
        id: 'd27-b5-t4',
        promptZh: '"下次我请"哪句正确？',
        choices: [
          { text: '다음에 제가 사을게요.', correct: false },
          { text: '다음에 제가 살게요.', correct: true },
          { text: '다음에 제가 사겠어요.', correct: false },
          { text: '다음에 제가 사요.', correct: false },
        ],
        explain: '사다 + ㄹ게요 → 살게요',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd27-b5-t5',
        promptKo: '회식',
        promptHangul: 'hoe-sik',
        choices: [
          { text: '聚餐 / 会餐', correct: true },
          { text: '会议', correct: false },
          { text: '午餐', correct: false },
          { text: '婚礼', correct: false },
        ],
        explain: '汉字词「会食」。公司/学校/朋友的正式聚餐',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd27-b5-t6',
        zhHint: '今天我请客！',
        audioKo: '오늘 내가 한턱 낼게!',
        answer: ['오늘', '내가', '한턱', '낼게!'],
        tokens: ['오늘', '내가', '한턱', '낼게!', '냈어!', '내세요.', '내다.'],
        explain: '한턱 내다 + ㄹ게（반말承诺）',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd27-b5-t7',
        zhHint: '吃好了。下次我请。',
        audioKo: '잘 먹었습니다. 다음엔 제가 살게요.',
        answer: ['잘', '먹었습니다.', '다음엔', '제가', '살게요.'],
        tokens: ['잘', '먹었습니다.', '다음엔', '제가', '살게요.', '먹겠습니다.', '내가', '사요.'],
        explain: '被请客回礼两连：过去感谢 + 未来承诺',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd27-b5-t8',
        promptZh: 'Minji 用韩国请客文化说服你：「다음에 토리가 사」。你想接受约定，最有诚意的一句？',
        choices: [
          { text: '알았어. 다음엔 내가 꼭 살게!', correct: true },
          { text: '지금 내가 내야 해.', correct: false },
          { text: '싫어.', correct: false },
          { text: '몰라.', correct: false },
        ],
        explain: '接受回礼约定 + 꼭（一定）加强诚意 · 韩国请客文化的关键"礼尚往来"',
      },
    },
  ],
};
