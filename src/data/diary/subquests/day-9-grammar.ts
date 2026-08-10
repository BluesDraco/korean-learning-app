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
  subtitle: '이거 / 그거 / 저거 · 便利店的空间三层', subtitleEn: '이거 / 그거 / 저거 · The three spatial levels of a convenience store',

  // ─── 助词/形态改错 ───
  fix: [
    {
      id: 'd09-g3-f1',
      promptKo: '삼각김밥 둘 개 주세요.',
      promptZh: '"请给我两个饭团"哪句正确？', promptZhEn: 'Which is correct for "Please give me two rice balls"?',
      choices: [
        { text: '삼각김밥 둘 개 주세요.', correct: false },
        { text: '삼각김밥 두 개 주세요.', correct: true },
        { text: '삼각김밥 이 개 주세요.', correct: false },
        { text: '삼각김밥 두 병 주세요.', correct: false },
      ],
      explain: '固有数 「둘(2)」搭配量词时变「두」→ 두 개。数东西用固有数（하나→한、둘→두、셋→세、넷→네），不是汉字数', explainEn: 'Native number 둘(2) becomes 두 with counters → 두 개. Count things with native numbers (하나→한, 둘→두, 셋→세, 넷→네), not Sino-Korean numbers',
    },
    {
      id: 'd09-g3-f2',
      promptKo: '이거 얼마이에요?',
      promptZh: '"这个多少钱？"哪句正确？', promptZhEn: 'Which is correct for "How much is this?"',
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
      promptZh: '"这个也请给我"（两样都要）最自然的说法？', promptZhEn: 'What\'s the most natural way to say "Please give me this too" (wanting both)?',
      choices: [
        { text: '이거 주세요, 이거 주세요.', correct: false },
        { text: '이것도 주세요.', correct: true },
        { text: '이것을 이것을 주세요.', correct: false },
        { text: '이것이 주세요.', correct: false },
      ],
      explain: '도 = 也。이것도 주세요 = 这个也请给我。第二样东西加 도 连接，比重复说 주세요 更自然', explainEn: '도 = also. 이것도 주세요 = Please give me this too. Adding 도 to the second item connects them more naturally than repeating 주세요',
    },
    {
      id: 'd09-g3-f4',
      promptKo: '커피 한 개 주세요.',
      promptZh: '"请给我一杯咖啡"最合适的量词是？', promptZhEn: 'What\'s the most suitable counter for "Please give me a cup of coffee"?',
      choices: [
        { text: '커피 한 개 주세요.', correct: false },
        { text: '커피 한 잔 주세요.', correct: true },
        { text: '커피 한 병 주세요.', correct: false },
        { text: '커피 하나 잔 주세요.', correct: false },
      ],
      explain: '咖啡装在杯子里用「잔」(杯)。개 = 通用量词但不精准；병 = 瓶（装的是瓶装咖啡）。固有数 하나 搭量词 → 한', explainEn: 'Coffee in a cup uses 잔 (cup). 개 is a general counter but not precise; 병 = bottle (for bottled coffee). Native number 하나 with a counter → 한',
    },
    {
      id: 'd09-g3-f5',
      promptKo: '저거요? 이거예요.',
      promptZh: '客人指着远处货架问「저거 얼마예요?」，店员回答时该用哪个指示词？', promptZhEn: 'A customer points at a distant shelf and asks "저거 얼마예요?" Which demonstrative should the clerk use in response?',
      choices: [
        { text: '저거요? 이거예요.', correct: false },
        { text: '저거요? 그거 천 원이에요.', correct: true },
        { text: '이거요? 이거 천 원이에요.', correct: false },
        { text: '이거요? 저거 천 원이에요.', correct: false },
      ],
      explain: '店员视角：客人问的东西对店员来说是"客人指的那个" → 그거。客人问 저거 → 店员应 그거。空间指代要换视角', explainEn: 'From the clerk\'s view: what the customer asked about is "the one the customer pointed at" → 그거. Customer says 저거 → clerk should say 그거. Spatial reference shifts perspective',
    },
  ],

  // ─── 组句 ───
  compose: [
    {
      id: 'd09-g3-c1',
      zhHint: '请给我这个。（在便利店指着东西说）', zhHintEn: 'Please give me this. (Pointing at something at the convenience store.)',
      audioKo: '이거 주세요.',
      answer: ['이거', '주세요.'],
      tokens: ['이거', '주세요.', '저거', '그거', '주실래요?', '주고 싶어요.'],
      explain: '이거(我手边这个) + 주세요(请给我)。便利店点单最基础的一句', explainEn: '이거 (this by me) + 주세요 (please give me). The most basic convenience store ordering phrase',
    },
    {
      id: 'd09-g3-c2',
      zhHint: '请给我这个。还有这个也是。', zhHintEn: 'I\'ll take this one. And this too, please.',
      audioKo: '이거 주세요. 그리고 이것도요.',
      answer: ['이거', '주세요.', '그리고', '이것도요.'],
      tokens: ['이거', '주세요.', '그리고', '이것도요.', '이거를', '이것이', '그것'],
      explain: '이것도요 = 「이것도 주세요」的省略形（省 주세요，仅保 도 요）——口语常见简化', explainEn: '이것도요 = shortened form of 이것도 주세요 (drops 주세요, keeps only 도 요) — common in spoken Korean',
    },
    {
      id: 'd09-g3-c3',
      zhHint: '请给我一瓶香蕉牛奶。', zhHintEn: 'Please give me a bottle of banana milk.',
      audioKo: '바나나우유 한 병 주세요.',
      answer: ['바나나우유', '한', '병', '주세요.'],
      tokens: ['바나나우유', '한', '병', '주세요.', '하나', '일', '개'],
      explain: '固有数 하나 → 한（搭量词变形）+ 병(瓶) + 주세요。饮料用 병 量词', explainEn: 'Native number 하나 → 한 (changes with counters) + 병 (bottle) + 주세요. Use 병 for drinks',
    },
    {
      id: 'd09-g3-c4',
      zhHint: '那个（远处）是什么？', zhHintEn: 'What is that (over there)?',
      audioKo: '저거 뭐예요?',
      answer: ['저거', '뭐예요?'],
      tokens: ['저거', '뭐예요?', '이거', '그거', '얼마예요?', '있어요?'],
      explain: '저거(远处那个) + 뭐예요?(是什么？) 。뭐 是 무엇(什么) 的口语缩写', explainEn: '저거 (that over there) + 뭐예요? (what is it?). 뭐 is the colloquial short form of 무엇 (what)',
    },
  ],

  // ─── 规则理解 ───
  rule: [
    {
      id: 'd09-g3-r1',
      promptZh: '关于 이거 / 그거 / 저거 的区别，哪句最准确？', promptZhEn: 'Which statement about the difference between 이거 / 그거 / 저거 is most accurate?',
      choices: [
        { text: '이거 = 这个（说话人附近），그거 = 那个（听话人附近或刚提过的），저거 = 那个（两人都远的第三方）', textEn: '이거 = this (near speaker), 그거 = that (near listener or previously mentioned), 저거 = that (far from both, a third party)', correct: true },
        { text: '이거 = 这个，그거/저거 都是那个，可以随便用', textEn: '이거 = this, 그거/저거 both mean that, so you can use them interchangeably', correct: false },
        { text: '이거 = 你的，그거 = 他的，저거 = 我的', textEn: '이거 = yours, 그거 = his, 저거 = mine', correct: false },
        { text: '三者都是"这个"，只是语气不同', textEn: 'All three mean "this," just with different tones', correct: false },
      ],
      explain: '韩语空间指代三层：我(이)/你(그)/远处(저)。比中文"这/那"多一层。"你手上的东西"用 그거，不用 이거', explainEn: 'Korean spatial reference has three layers: near me (이), near you (그), and far away (저). That\'s one more layer than Chinese\'s "this/that." For "the thing in your hand," use 그거, not 이거',
    },
    {
      id: 'd09-g3-r2',
      promptZh: '关于 이거/이것 的用法，哪句最准确？', promptZhEn: 'Which statement about 이거/이것 is most accurate?',
      choices: [
        { text: '이거/이것 都是同一个意思，이거是口语，이것是书面/正式', textEn: '이거 and 이것 mean the same thing; 이거 is colloquial, 이것 is written/formal', correct: true },
        { text: '이거 = 单数，이것 = 复数', textEn: '이거 = singular, 이것 = plural', correct: false },
        { text: '이거 是名词，이것 是代词', textEn: '이거 is a noun, 이것 is a pronoun', correct: false },
        { text: '이거 只指人，이것 只指物', textEn: '이거 only refers to people, 이것 only to objects', correct: false },
      ],
      explain: '이거 = 이것 的口语缩写。购物、日常对话用 이거；写作文、正式邮件用 이것。含义完全相同', explainEn: '이거 is the colloquial abbreviation of 이것. Use 이거 for shopping and everyday talk; use 이것 for essays and formal emails. The meaning is exactly the same',
    },
    {
      id: 'd09-g3-r3',
      promptZh: '"两杯咖啡"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "two coffees"?',
      choices: [
        { text: '커피 이 잔 주세요.', correct: false },
        { text: '커피 두 잔 주세요.', correct: true },
        { text: '커피 둘 잔 주세요.', correct: false },
        { text: '커피 두 개 주세요.', correct: false },
      ],
      explain: '固有数 둘(2) 搭量词时变 두。커피装杯子用「잔」量词。数东西用固有数，价格用汉字数', explainEn: 'Native number 둘 (2) becomes 두 before a counter. Coffee in cups uses the counter 잔. Count objects with native numbers, prices with Sino-Korean numbers',
    },
    {
      id: 'd09-g3-r4',
      promptZh: '客人指着远处货架问「저거 얼마예요?」，店员该用哪个指示词回答？', promptZhEn: 'A customer points at a distant shelf and asks 「저거 얼마예요?」, which demonstrative should the clerk use to answer?',
      choices: [
        { text: '이거요, 저거요.（跟客人一样）', textEn: '이거요, 저거요. (Same as the customer)', correct: false },
        { text: '그거요, 천 원이에요.（换成"你指的那个"）', textEn: '그거요, 천 원이에요. (Switch to "the one you\'re pointing at")', correct: true },
        { text: '저거요, 저거요.（保持一致）', textEn: '저거요, 저거요. (Keep it consistent)', correct: false },
        { text: '이거요, 이거요.（换成"我手边这个"）', textEn: '이거요, 이거요. (Switch to "this one by me")', correct: false },
      ],
      explain: '空间指代要换视角：客人视角是 저거（远处），店员视角是 그거（客人指的那个）。这是韩语空间三层的核心考察', explainEn: 'Spatial reference shifts with perspective: from the customer\'s view it\'s 저거 (far), from the clerk\'s view it\'s 그거 (the one the customer pointed at). This is the core test of Korean\'s three-layer spatial system',
    },
  ],
};
