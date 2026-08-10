import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 25 · 1-5 Boss 战 · 3000 人演唱会综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：하다类반말 + V지 마 + ㅂ 不规则 + 应援口号
 */
export const day25Boss: BossSubQuestData = {
  day: 25, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '让自己的声音混进 3000 人里',
  intro: '兽尔江草坪的应援棒亮成一片。Junho 的老虎尾巴还在抖，Minji 已经在跳。MC 的声音从音响里滚出来。手里的棒子发着温热的光——是时候把三连喊出去了。',
  outroHook: '通过！Tori 的声音混进了 3000 人里，草坪的光在她眼里闪。明天回다이소——想给自己买一根胡萝卜形状的笔。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd25-b5-t1',
        audioKo: '오늘 우리가 가르쳐 줄게.',
        choices: [
          { text: '今天我们教你。', correct: true },
          { text: '今天我们学。', correct: false },
          { text: '今天没课。', correct: false },
          { text: '你教我们。', correct: false },
        ],
        explain: '가르치+어 주다 + ㄹ게（承诺给你做）',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd25-b5-t2',
        audioKo: '부끄러워하지 마!',
        choices: [
          { text: '别害羞！', correct: true },
          { text: '不用害羞。', correct: false },
          { text: '很害羞。', correct: false },
          { text: '害羞了。', correct: false },
        ],
        explain: 'V지 마 = 别做（반말禁止）',
      },
    },
    {
      type: 'choice',
      label: '语尾选择',
      task: {
        id: 'd25-b5-t3',
        promptZh: '"我爱你（应援반말）"哪句正确？',
        choices: [
          { text: '사랑하다!', correct: false },
          { text: '사랑해!', correct: true },
          { text: '사랑하아!', correct: false },
          { text: '사랑하여!', correct: false },
        ],
        explain: '하다 → 해（반말）',
      },
    },
    {
      type: 'choice',
      label: '形态改错',
      task: {
        id: 'd25-b5-t4',
        promptZh: '"啊，好害羞"哪句正确？',
        choices: [
          { text: '아, 부끄럽어요.', correct: false },
          { text: '아, 부끄러워요.', correct: true },
          { text: '아, 부끄럽아요.', correct: false },
          { text: '아, 부끄러웨요.', correct: false },
        ],
        explain: 'ㅂ 不规则：ㅂ 在元音前变 우 → 부끄러워요',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd25-b5-t5',
        promptKo: '화이팅',
        promptHangul: 'hwa-i-ting',
        choices: [
          { text: '加油', correct: true },
          { text: '打架', correct: false },
          { text: '战斗', correct: false },
          { text: '再见', correct: false },
        ],
        explain: '韩式英语。不分场合最万能的鼓励词',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd25-b5-t6',
        zhHint: '我爱你！我支持你！跟着我！',
        audioKo: '사랑해! 응원해! 따라해!',
        answer: ['사랑해!', '응원해!', '따라해!'],
        tokens: ['사랑해!', '응원해!', '따라해!', '사랑하다!', '응원해요.', '따라 갔어!'],
        explain: '演唱会应援三连（하다→해）',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd25-b5-t7',
        zhHint: '别担心！加油！',
        audioKo: '걱정하지 마! 화이팅!',
        answer: ['걱정하지', '마!', '화이팅!'],
        tokens: ['걱정하지', '마!', '화이팅!', '걱정해!', '싸이팅!', '마세요.'],
        explain: 'V지 마（禁止）+ 화이팅（万能加油）· 朋友鼓励标准',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd25-b5-t8',
        promptZh: '对老师表达"我爱您（尊敬）"，最得体的一句？',
        choices: [
          { text: '선생님, 사랑합니다!', correct: true },
          { text: '선생님, 사랑해!', correct: false },
          { text: '선생님, 화이팅!', correct: false },
          { text: '선생님, 최고!', correct: false },
        ],
        explain: '对长辈用 합쇼체「사랑합니다」· 반말 사랑해 会失礼',
      },
    },
  ],
};
