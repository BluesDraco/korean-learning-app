import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 9 · 1-3 문법 탐험 · 语法关
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：指示代词 이거 / 그거 / 저거 三层空间 + 固有数量词
 * 教学梯度：
 *   fix 挑店员手上东西的指代 vs 远处橱窗差错
 *   → compose 从单词到组合句
 *   → rule 抽象空间三层 + 固有数变形
 */
export const day9Grammar: GrammarSubQuestData = {
  day: 9, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '이거 / 그거 / 저거 · 便利店的空间三层',

  // ─── 助词/形态改错 ───
  fix: [
    {
      id: 'd09-g3-f1',
      promptKo: '삼각김밥 둘 개 주세요.',
      promptZh: '"请给我两个饭团"哪句正确？',
      choices: [
        { text: '삼각김밥 둘 개 주세요.', correct: false },
        { text: '삼각김밥 두 개 주세요.', correct: true },
        { text: '삼각김밥 이 개 주세요.', correct: false },
        { text: '삼각김밥 두 병 주세요.', correct: false },
      ],
      explain: '固有数 「둘(2)」搭配量词时变「두」→ 두 개。数东西用固有数（하나→한、둘→두、셋→세、넷→네），不是汉字数',
    },
    {
      id: 'd09-g3-f2',
      promptKo: '이거 얼마이에요?',
      promptZh: '"这个多少钱？"哪句正确？',
      choices: [
        { text: '이거 얼마이에요?', correct: false },
        { text: '이거 얼마예요?', correct: true },
        { text: '이거 얼마입니다?', correct: false },
        { text: '이거 얼마가에요?', correct: false },
      ],
      explain: '얼마 무받침 → 예요（不是 이에요）。이에요/예요 只看前面名词最后一个字有没有 받침，不看语义',
    },
    {
      id: 'd09-g3-f3',
      promptKo: '이것 주세요, 이것 주세요.',
      promptZh: '"这个也请给我"（两样都要）最自然的说法？',
      choices: [
        { text: '이거 주세요, 이거 주세요.', correct: false },
        { text: '이것도 주세요.', correct: true },
        { text: '이것을 이것을 주세요.', correct: false },
        { text: '이것이 주세요.', correct: false },
      ],
      explain: '도 = 也。이것도 주세요 = 这个也请给我。第二样东西加 도 连接，比重复说 주세요 更自然',
    },
    {
      id: 'd09-g3-f4',
      promptKo: '커피 한 개 주세요.',
      promptZh: '"请给我一杯咖啡"最合适的量词是？',
      choices: [
        { text: '커피 한 개 주세요.', correct: false },
        { text: '커피 한 잔 주세요.', correct: true },
        { text: '커피 한 병 주세요.', correct: false },
        { text: '커피 하나 잔 주세요.', correct: false },
      ],
      explain: '咖啡装在杯子里用「잔」(杯)。개 = 通用量词但不精准；병 = 瓶（装的是瓶装咖啡）。固有数 하나 搭量词 → 한',
    },
    {
      id: 'd09-g3-f5',
      promptKo: '저거요? 이거예요.',
      promptZh: '客人指着远处货架问「저거 얼마예요?」，店员回答时该用哪个指示词？',
      choices: [
        { text: '저거요? 이거예요.', correct: false },
        { text: '저거요? 그거 천 원이에요.', correct: true },
        { text: '이거요? 이거 천 원이에요.', correct: false },
        { text: '이거요? 저거 천 원이에요.', correct: false },
      ],
      explain: '店员视角：客人问的东西对店员来说是"客人指的那个" → 그거。客人问 저거 → 店员应 그거。空间指代要换视角',
    },
  ],

  // ─── 组句 ───
  compose: [
    {
      id: 'd09-g3-c1',
      zhHint: '请给我这个。（在便利店指着东西说）',
      audioKo: '이거 주세요.',
      answer: ['이거', '주세요.'],
      tokens: ['이거', '주세요.', '저거', '그거', '주실래요?', '주고 싶어요.'],
      explain: '이거(我手边这个) + 주세요(请给我)。便利店点单最基础的一句',
    },
    {
      id: 'd09-g3-c2',
      zhHint: '请给我这个。还有这个也是。',
      audioKo: '이거 주세요. 그리고 이것도요.',
      answer: ['이거', '주세요.', '그리고', '이것도요.'],
      tokens: ['이거', '주세요.', '그리고', '이것도요.', '이거를', '이것이', '그것'],
      explain: '이것도요 = 「이것도 주세요」的省略形（省 주세요，仅保 도 요）——口语常见简化',
    },
    {
      id: 'd09-g3-c3',
      zhHint: '请给我一瓶香蕉牛奶。',
      audioKo: '바나나우유 한 병 주세요.',
      answer: ['바나나우유', '한', '병', '주세요.'],
      tokens: ['바나나우유', '한', '병', '주세요.', '하나', '일', '개'],
      explain: '固有数 하나 → 한（搭量词变形）+ 병(瓶) + 주세요。饮料用 병 量词',
    },
    {
      id: 'd09-g3-c4',
      zhHint: '那个（远处）是什么？',
      audioKo: '저거 뭐예요?',
      answer: ['저거', '뭐예요?'],
      tokens: ['저거', '뭐예요?', '이거', '그거', '얼마예요?', '있어요?'],
      explain: '저거(远处那个) + 뭐예요?(是什么？) 。뭐 是 무엇(什么) 的口语缩写',
    },
  ],

  // ─── 规则理解 ───
  rule: [
    {
      id: 'd09-g3-r1',
      promptZh: '关于 이거 / 그거 / 저거 的区别，哪句最准确？',
      choices: [
        { text: '이거 = 这个（说话人附近），그거 = 那个（听话人附近或刚提过的），저거 = 那个（两人都远的第三方）', correct: true },
        { text: '이거 = 这个，그거/저거 都是那个，可以随便用', correct: false },
        { text: '이거 = 你的，그거 = 他的，저거 = 我的', correct: false },
        { text: '三者都是"这个"，只是语气不同', correct: false },
      ],
      explain: '韩语空间指代三层：我(이)/你(그)/远处(저)。比中文"这/那"多一层。"你手上的东西"用 그거，不用 이거',
    },
    {
      id: 'd09-g3-r2',
      promptZh: '关于 이거/이것 的用法，哪句最准确？',
      choices: [
        { text: '이거/이것 都是同一个意思，이거是口语，이것是书面/正式', correct: true },
        { text: '이거 = 单数，이것 = 复数', correct: false },
        { text: '이거 是名词，이것 是代词', correct: false },
        { text: '이거 只指人，이것 只指物', correct: false },
      ],
      explain: '이거 = 이것 的口语缩写。购物、日常对话用 이거；写作文、正式邮件用 이것。含义完全相同',
    },
    {
      id: 'd09-g3-r3',
      promptZh: '"两杯咖啡"最标准的说法？',
      choices: [
        { text: '커피 이 잔 주세요.', correct: false },
        { text: '커피 두 잔 주세요.', correct: true },
        { text: '커피 둘 잔 주세요.', correct: false },
        { text: '커피 두 개 주세요.', correct: false },
      ],
      explain: '固有数 둘(2) 搭量词时变 두。커피装杯子用「잔」量词。数东西用固有数，价格用汉字数',
    },
    {
      id: 'd09-g3-r4',
      promptZh: '客人指着远处货架问「저거 얼마예요?」，店员该用哪个指示词回答？',
      choices: [
        { text: '이거요, 저거요.（跟客人一样）', correct: false },
        { text: '그거요, 천 원이에요.（换成"你指的那个"）', correct: true },
        { text: '저거요, 저거요.（保持一致）', correct: false },
        { text: '이거요, 이거요.（换成"我手边这个"）', correct: false },
      ],
      explain: '空间指代要换视角：客人视角是 저거（远处），店员视角是 그거（客人指的那个）。这是韩语空间三层的核心考察',
    },
  ],
};
