import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 25 · 1-3 문법 탐험 · 语法关
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：하다类반말（해요 去 요）+ V지 마 禁止 + ㅂ 不规则
 */
export const day25Grammar: GrammarSubQuestData = {
  day: 25, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握 하다类반말 + 禁止 + 应援口号',

  fix: [
    {
      id: 'd25-g3-f1',
      promptKo: '사랑하다!',
      promptZh: '"我爱你（반말应援）"哪句正确？',
      choices: [
        { text: '사랑하다!', correct: false },
        { text: '사랑해!', correct: true },
        { text: '사랑하여!', correct: false },
        { text: '사랑하아!', correct: false },
      ],
      explain: '하다类반말 = 해。사랑하다 → 사랑해',
    },
    {
      id: 'd25-g3-f2',
      promptKo: '부끄러워하지 마세요!',
      promptZh: '朋友对你喊"别害羞"，最自然（반말）的一句？',
      choices: [
        { text: '부끄러워하지 마세요!', correct: false },
        { text: '부끄러워하지 마!', correct: true },
        { text: '부끄러워하다 마!', correct: false },
        { text: '부끄러워하 마!', correct: false },
      ],
      explain: 'V지 마 = 别做（반말）；V지 마세요 是합쇼체。朋友间用반말',
    },
    {
      id: 'd25-g3-f3',
      promptKo: '크게 외치어!',
      promptZh: '"大声喊！"哪句正确？',
      choices: [
        { text: '크게 외치어!', correct: false },
        { text: '크게 외쳐!', correct: true },
        { text: '크게 외치아!', correct: false },
        { text: '크게 외치!', correct: false },
      ],
      explain: '외치+어 缩合为 외쳐（ㅣ+ㅓ=ㅕ）',
    },
    {
      id: 'd25-g3-f4',
      promptKo: '아, 부끄럽어요.',
      promptZh: '"啊，好害羞"哪句正确？',
      choices: [
        { text: '아, 부끄럽어요.', correct: false },
        { text: '아, 부끄러워요.', correct: true },
        { text: '아, 부끄러워아요.', correct: false },
        { text: '아, 부끄러웨요.', correct: false },
      ],
      explain: '부끄럽다 ㅂ 不规则：ㅂ 在元音前变 우 → 부끄러우 + 어요 = 부끄러워요',
    },
    {
      id: 'd25-g3-f5',
      promptKo: '선생님, 사랑해!',
      promptZh: '对老师表达"我爱您（尊敬）"最得体的一句？',
      choices: [
        { text: '선생님, 사랑해!', correct: false },
        { text: '선생님, 사랑합니다!', correct: true },
        { text: '선생님, 사랑해요!', correct: false },
        { text: '선생님, 사랑!', correct: false },
      ],
      explain: '对长辈优先 합쇼체「사랑합니다」；사랑해요 也可但不如 합쇼체 郑重；사랑해 是반말 会失礼',
    },
  ],

  compose: [
    {
      id: 'd25-g3-c1',
      zhHint: '我爱你！我支持你！跟着我！',
      audioKo: '사랑해! 응원해! 따라해!',
      answer: ['사랑해!', '응원해!', '따라해!'],
      tokens: ['사랑해!', '응원해!', '따라해!', '사랑하다!', '응원해요.', '따라 갔어!'],
      explain: '演唱会应援三连（하다 → 해 반말）',
    },
    {
      id: 'd25-g3-c2',
      zhHint: '别担心！加油！',
      audioKo: '걱정하지 마! 화이팅!',
      answer: ['걱정하지', '마!', '화이팅!'],
      tokens: ['걱정하지', '마!', '화이팅!', '걱정해!', '싸이팅!', '마세요.', '있어!'],
      explain: 'V지 마（禁止 반말）+ 화이팅（加油·万能）· 朋友鼓励标准',
    },
    {
      id: 'd25-g3-c3',
      zhHint: '大声喊！别害羞！',
      audioKo: '크게 외쳐! 부끄러워하지 마!',
      answer: ['크게', '외쳐!', '부끄러워하지', '마!'],
      tokens: ['크게', '외쳐!', '부끄러워하지', '마!', '작게', '외치어!', '마세요.'],
      explain: '外쳐（외치+어 缩合）+ 지 마（禁止）· MC 或朋友鼓励语',
    },
    {
      id: 'd25-g3-c4',
      zhHint: '哥哥最棒！',
      audioKo: '오빠 최고!',
      answer: ['오빠', '최고!'],
      tokens: ['오빠', '최고!', '언니', '진짜', '없어!', '아니!'],
      explain: '最简感叹赞美 · 演唱会应援必备',
    },
  ],

  rule: [
    {
      id: 'd25-g3-r1',
      promptZh: '关于 하다类반말 变位，哪句最准确？',
      choices: [
        { text: '所有 하다类 반말 = 해。사랑하다→사랑해；공부하다→공부해', correct: true },
        { text: '하다 → 하야', correct: false },
        { text: '하다 → 하아', correct: false },
        { text: '하다 → 하여（书面）', correct: false },
      ],
      explain: '하다 반말 无条件是 해。해요体去 요 = 해',
    },
    {
      id: 'd25-g3-r2',
      promptZh: '关于 V지 마 的用法，哪句最准确？',
      choices: [
        { text: 'V지 마 = 别做（반말禁止命令）。합쇼체 = V지 마세요', correct: true },
        { text: 'V지 마 是过去时', correct: false },
        { text: 'V지 마 是提议邀请', correct: false },
        { text: 'V지 마 用于自己不做', correct: false },
      ],
      explain: '걱정하지 마（别担心）/ 울지 마（别哭）· 朋友鼓励万能句',
    },
    {
      id: 'd25-g3-r3',
      promptZh: '关于 ㅂ 不规则，哪句最准确？',
      choices: [
        { text: '부끄럽다/춥다 等 ㅂ 结尾形容词，在元音前 ㅂ 变 우。부끄럽+어요 → 부끄러워요', correct: true },
        { text: 'ㅂ 直接消失。부끄럽어요 → 부끄러요', correct: false },
        { text: 'ㅂ 变 ㅁ', correct: false },
        { text: 'ㅂ 不变化', correct: false },
      ],
      explain: 'ㅂ 在元音前变 우 是韩语常见不规则。춥+어요 → 추워요 同理',
    },
    {
      id: 'd25-g3-r4',
      promptZh: '关于 화이팅 的用法，哪句最准确？',
      choices: [
        { text: '英语 fighting 的韩式变体 = 加油。파이팅 也可，不是"打架"', correct: true },
        { text: '意思是"战斗"', correct: false },
        { text: '只用于运动场', correct: false },
        { text: '只用于运动员之间', correct: false },
      ],
      explain: '韩语里最常见的鼓励词，不分场合。考试/工作/演唱会/生活都用',
    },
  ],
};
