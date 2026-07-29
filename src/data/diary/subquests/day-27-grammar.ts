import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 27 · 1-3 문법 탐험 · 语法关
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：ㄹ게(요) 承诺 + 잘 먹겠/었 时态区分 + 请客文化用语
 */
export const day27Grammar: GrammarSubQuestData = {
  day: 27, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握 ㄹ게(요) 承诺 + 请客文化三件套',

  fix: [
    {
      id: 'd27-g3-f1',
      promptKo: '다음에 제가 사을게요.',
      promptZh: '"下次我请"哪句正确？',
      choices: [
        { text: '다음에 제가 사을게요.', correct: false },
        { text: '다음에 제가 살게요.', correct: true },
        { text: '다음에 제가 사겠어요.', correct: false },
        { text: '다음에 제가 사요.', correct: false },
      ],
      explain: '사다 词干"사"无收音 + ㄹ게요 → 살게요（ㄹ 直接插入词干末尾）',
    },
    {
      id: 'd27-g3-f2',
      promptKo: '잘 먹었습니다! (刚上桌)',
      promptZh: '刚上菜想说"开动了"，哪句正确？',
      choices: [
        { text: '잘 먹었습니다!', correct: false },
        { text: '잘 먹겠습니다!', correct: true },
        { text: '잘 먹습니다!', correct: false },
        { text: '잘 먹어요!', correct: false },
      ],
      explain: '饭前 → 겠（将要）；饭后 → 었（过去）',
    },
    {
      id: 'd27-g3-f3',
      promptKo: '그 사람이 낼게요.',
      promptZh: '"那个人会付（第三人称）"哪句正确？',
      choices: [
        { text: '그 사람이 낼게요.', correct: false },
        { text: '그 사람이 낼 거예요.', correct: true },
        { text: '그 사람이 냈어요.', correct: false },
        { text: '그 사람이 내세요.', correct: false },
      ],
      explain: 'ㄹ게요 只能用于第一人称承诺。第三人称"将会~"用 ㄹ 거예요',
    },
    {
      id: 'd27-g3-f4',
      promptKo: '삼겹살 4명분 주세요.',
      promptZh: '"请给4人份五花肉"哪句正确？',
      choices: [
        { text: '삼겹살 4명분 주세요.', correct: false },
        { text: '삼겹살 4인분 주세요.', correct: true },
        { text: '삼겹살 4개 주세요.', correct: false },
        { text: '삼겹살 4번 주세요.', correct: false },
      ],
      explain: '食物量词用 인분（人份）· 명（人数）用于计数人本身',
    },
    {
      id: 'd27-g3-f5',
      promptKo: '선생님, 다음엔 내가 살게.',
      promptZh: '对老师说"下次我请"最得体的一句？',
      choices: [
        { text: '선생님, 다음엔 내가 살게.', correct: false },
        { text: '선생님, 다음엔 제가 살게요.', correct: true },
        { text: '선생님, 다음엔 나가 살게요.', correct: false },
        { text: '선생님, 다음엔 저가 살게요.', correct: false },
      ],
      explain: '对老师用 제가（"我"的谦称）+ ㄹ게요（해요体 承诺）',
    },
  ],

  compose: [
    {
      id: 'd27-g3-c1',
      zhHint: '今天我请客！',
      audioKo: '오늘 내가 한턱 낼게!',
      answer: ['오늘', '내가', '한턱', '낼게!'],
      tokens: ['오늘', '내가', '한턱', '낼게!', '냈어!', '내세요.', '내다.'],
      explain: '한턱 내다 + ㄹ게（반말承诺）· 朋友宣布请客',
    },
    {
      id: 'd27-g3-c2',
      zhHint: '吃好了。下次我请。',
      audioKo: '잘 먹었습니다. 다음엔 제가 살게요.',
      answer: ['잘', '먹었습니다.', '다음엔', '제가', '살게요.'],
      tokens: ['잘', '먹었습니다.', '다음엔', '제가', '살게요.', '먹겠습니다.', '내가', '사요.'],
      explain: '被请客标准回礼：过去感谢 + 未来承诺',
    },
    {
      id: 'd27-g3-c3',
      zhHint: '请给4人份五花肉。',
      audioKo: '삼겹살 4인분 주세요.',
      answer: ['삼겹살', '4인분', '주세요.'],
      tokens: ['삼겹살', '4인분', '주세요.', '4명', '4개', '주지 마세요.'],
      explain: '烤肉点单标准句 · 인분 是食物量词',
    },
    {
      id: 'd27-g3-c4',
      zhHint: '用卡结账。',
      audioKo: '카드로 결제할게요.',
      answer: ['카드로', '결제할게요.'],
      tokens: ['카드로', '결제할게요.', '카드가', '결제했어요.', '결제해 주세요.'],
      explain: '結제하다 → 결제할게요（하다 → 할게요 承诺）',
    },
  ],

  rule: [
    {
      id: 'd27-g3-r1',
      promptZh: '关于「V + ㄹ게(요)」的用法，哪句最准确？',
      choices: [
        { text: '第一人称承诺"我会做~"。ㄹ게 반말；ㄹ게요 해요体', correct: true },
        { text: '所有人称都能用', correct: false },
        { text: '过去时', correct: false },
        { text: '疑问句', correct: false },
      ],
      explain: 'ㄹ게 = 对听话者的承诺。第三人称"~会做"用 ㄹ 거예요',
    },
    {
      id: 'd27-g3-r2',
      promptZh: '关于「잘 먹었습니다」vs「잘 먹겠습니다」，哪句最准确？',
      choices: [
        { text: '먹었 = 过去（吃完了 · 饭后感谢）；먹겠 = 将要（要开动了 · 饭前）', correct: true },
        { text: '两者意思一样', correct: false },
        { text: '먹었 是반말，먹겠 是합쇼체', correct: false },
        { text: '먹겠 是饭后用', correct: false },
      ],
      explain: '搞混就闹笑话。刚坐下说 잘 먹었습니다 → 变成"我已经吃完了要走了"',
    },
    {
      id: 'd27-g3-r3',
      promptZh: '关于「제가 vs 내가」，哪句最准确？',
      choices: [
        { text: '제가 = 해요体/합쇼체谦称"我"（对长辈/正式）；내가 = 반말"我"（对朋友）', correct: true },
        { text: '两者完全一样', correct: false },
        { text: '제가 只用书面语', correct: false },
        { text: '내가 用于第三人称', correct: false },
      ],
      explain: '对店员/老师 → 제가 낼게요；对朋友 → 내가 낼게',
    },
    {
      id: 'd27-g3-r4',
      promptZh: '关于韩国请客文化，哪句最符合 Day 27 的语境？',
      choices: [
        { text: '一人请客+下次回请。「다음에 내가 살게」不是客套是约定', correct: true },
        { text: '韩国都是 AA 制', correct: false },
        { text: '晚辈总是请长辈', correct: false },
        { text: '请客的人不用说话', correct: false },
      ],
      explain: 'Minji 主流程原话：「시험 끝나면 내가 사. 다음에 토리가 사」= 轮流请客',
    },
  ],
};
