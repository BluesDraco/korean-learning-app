import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 23 · 1-5 Boss 战 · 生日咖啡追星综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：진짜 vs 정말 场景差 + 팬이 되다 + KPOP 追星词汇
 */
export const day23Boss: BossSubQuestData = {
  day: 23, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '一杯饮料，一张应援卡，一个新粉丝',
  intro: '달빛카페 玻璃窗上的粉色横幅在阳光下发亮。Junho 的老虎尾巴止不住抖。你手里攥着刚买的饮料杯，应援卡就在袋子里——是老虎队友第一次带你入圈。',
  outroHook: '通过！Tori 也成了 Mochi 的粉丝。角落那只灰狼再没出现——大概真是错觉。明天，群聊要炸——三个朋友同时约你去新咖啡馆。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd23-b5-t1',
        audioKo: '진짜 사람 많아!',
        choices: [
          { text: '真的好多人！', correct: true },
          { text: '真的都是人。', correct: false },
          { text: '真的没有人。', correct: false },
          { text: '人真的不多。', correct: false },
        ],
        explain: '진짜 + 반말 많아 → 口语感叹',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd23-b5-t2',
        audioKo: '정말 감사합니다.',
        choices: [
          { text: '真的非常感谢。', correct: true },
          { text: '再次感谢。', correct: false },
          { text: '真的对不起。', correct: false },
          { text: '真的没关系。', correct: false },
        ],
        explain: '정말 + 합쇼체 = 正式感谢',
      },
    },
    {
      type: 'choice',
      label: '语感选择',
      task: {
        id: 'd23-b5-t3',
        promptZh: '对老师说"真的非常感谢"，哪句最得体？',
        choices: [
          { text: '선생님, 진짜 감사합니다.', correct: false },
          { text: '선생님, 정말 감사합니다.', correct: true },
          { text: '선생님, 진짜 고마워.', correct: false },
          { text: '선생님, 대박!', correct: false },
        ],
        explain: '对长辈/正式场合优先 정말。진짜 语感偏幼稚',
      },
    },
    {
      type: 'choice',
      label: '助词改错',
      task: {
        id: 'd23-b5-t4',
        promptZh: '"我也成为粉丝了"哪句正确？',
        choices: [
          { text: '저도 팬가 됐어요.', correct: false },
          { text: '저도 팬이 됐어요.', correct: true },
          { text: '저도 팬을 됐어요.', correct: false },
          { text: '저는도 팬이 됐어요.', correct: false },
        ],
        explain: '「N이/가 되다」= 成为 N。팬 有收音 → 이',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd23-b5-t5',
        promptKo: '생일카페',
        promptHangul: 'saeng-il-ka-pe',
        choices: [
          { text: '爱豆生日应援咖啡馆', correct: true },
          { text: '爱豆开的店', correct: false },
          { text: '爱豆送蛋糕', correct: false },
          { text: '爱豆见面会', correct: false },
        ],
        explain: 'K-POP 粉丝文化专有名词。缩写「생카」',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd23-b5-t6',
        zhHint: '真的吗？真的好想去！',
        audioKo: '진짜? 정말 가고 싶어요!',
        answer: ['진짜?', '정말', '가고', '싶어요!'],
        tokens: ['진짜?', '정말', '가고', '싶어요!', '진짜예요?', '있어요.', '없어요.'],
        explain: '진짜?（口语惊喜）+ 정말 가고 싶어요（认真愿望）· 年轻人真实语料',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd23-b5-t7',
        zhHint: '这首歌真好听。',
        audioKo: '이 노래 진짜 좋아요.',
        answer: ['이', '노래', '진짜', '좋아요.'],
        tokens: ['이', '노래', '진짜', '좋아요.', '정말요', '좋아해요.', '들어요.'],
        explain: '진짜 + 좋아요（好听·形容词）。别混 좋아해요（喜欢·动词）',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd23-b5-t8',
        promptZh: 'Junho 送你一张 Mochi 的 포토카드，你惊喜又想认真道谢，最韩国年轻人的一句？',
        choices: [
          { text: '정말요? 진짜 고마워요!', correct: true },
          { text: '싫어요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '팬가 뭐예요?', correct: false },
        ],
        explain: '정말요?（惊喜）+ 진짜 고마워요（感谢加强）· 两个"真的"叠用是韩国年轻人特色',
      },
    },
  ],
};
