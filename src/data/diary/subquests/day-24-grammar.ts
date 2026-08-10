import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 24 · 1-3 문법 탐험 · 语法关
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：邀请三件套（같이 / ㄹ래요? / 당연하지） + ~고（然后）+ 어디서（在哪儿）
 */
export const day24Grammar: GrammarSubQuestData = {
  day: 24, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握邀请-回应-确认三件套',

  fix: [
    {
      id: 'd24-g3-f1',
      promptKo: '같이 카페 가래요?',
      promptZh: '"一起去咖啡馆吗？"哪句正确？',
      choices: [
        { text: '같이 카페 가래요?', correct: false },
        { text: '같이 카페 갈래요?', correct: true },
        { text: '같이 카페 가고 있어요?', correct: false },
        { text: '같이 카페 갈게요?', correct: false },
      ],
      explain: '가다 + ㄹ래요? = 갈래요?（提议邀请）。ㄹ 是必需的，不能省',
    },
    {
      id: 'd24-g3-f2',
      promptKo: '어디에 만나요?',
      promptZh: '"在哪见？"哪句最标准？',
      choices: [
        { text: '어디에 만나요?', correct: false },
        { text: '어디서 만나요?', correct: true },
        { text: '어디를 만나요?', correct: false },
        { text: '어디가 만나요?', correct: false },
      ],
      explain: '만나다 是动作 → 用 에서（动作地点），缩写 서。에 表示"存在/方向"',
    },
    {
      id: 'd24-g3-f3',
      promptKo: '학교 끝나서 만나요.',
      promptZh: '"下课后见面"哪句最标准？',
      choices: [
        { text: '학교 끝나서 만나요.', correct: false },
        { text: '학교 끝나고 만나요.', correct: true },
        { text: '학교 끝난 후 만나요.', correct: false },
        { text: '학교 끝나면 만나요.', correct: false },
      ],
      explain: '~고 表示"之后"（两个动作先后）。~서 表示原因/理由，语感不同。끝난 후 语法正确但书面感',
    },
    {
      id: 'd24-g3-f4',
      promptKo: '선생님, 당연하지!',
      promptZh: '对老师说"当然了"最得体的一句？',
      choices: [
        { text: '선생님, 당연하지!', correct: false },
        { text: '선생님, 당연하죠!', correct: true },
        { text: '선생님, 당연!', correct: false },
        { text: '선생님, 콜!', correct: false },
      ],
      explain: '당연하지 是반말；对长辈用 당연하죠（해요体，당연하지요 的缩写）。콜 也是반말',
    },
    {
      id: 'd24-g3-f5',
      promptKo: '진짜 갈래.',
      promptZh: '"真的去（承诺自己）"哪句最标准？',
      choices: [
        { text: '진짜 갈래.', correct: false },
        { text: '진짜 갈게.', correct: true },
        { text: '진짜 가고 있어.', correct: false },
        { text: '진짜 갔어.', correct: false },
      ],
      explain: 'ㄹ래 = 提议/意愿询问 ; ㄹ게 = 承诺（"我一定会~"）。承诺场景用 갈게',
    },
  ],

  compose: [
    {
      id: 'd24-g3-c1',
      zhHint: '一起去吧！在哪见？',
      audioKo: '같이 가자! 어디서 만나?',
      answer: ['같이', '가자!', '어디서', '만나?'],
      tokens: ['같이', '가자!', '어디서', '만나?', '따로', '어디에', '만나요.', '있어.'],
      explain: '반말群聊：같이 + 가자（一起吧）+ 어디서 만나?（在哪见）',
    },
    {
      id: 'd24-g3-c2',
      zhHint: '明天放学去咖啡馆吗？',
      audioKo: '내일 학교 끝나고 카페 갈래?',
      answer: ['내일', '학교', '끝나고', '카페', '갈래?'],
      tokens: ['내일', '학교', '끝나고', '카페', '갈래?', '갔어?', '갈게.', '있어?'],
      explain: '끝나고（结束后）+ 갈래?（要去吗）· 朋友随意邀请',
    },
    {
      id: 'd24-g3-c3',
      zhHint: '当然了！真的去！',
      audioKo: '당연하지! 진짜 갈게!',
      answer: ['당연하지!', '진짜', '갈게!'],
      tokens: ['당연하지!', '진짜', '갈게!', '갈래!', '몰라!', '싫어!', '없어!'],
      explain: '당연하지（那还用说）+ 갈게（承诺自己会去）· 반말最强肯定',
    },
    {
      id: 'd24-g3-c4',
      zhHint: '有一家新开的地方。',
      audioKo: '새로 생긴 데 있어.',
      answer: ['새로', '생긴', '데', '있어.'],
      tokens: ['새로', '생긴', '데', '있어.', '생기다', '있어요.', '없어.', '뭐야?'],
      explain: '새로（新）+ 생긴（관형형·出现的）+ 데（地方）· 修饰后置',
    },
  ],

  rule: [
    {
      id: 'd24-g3-r1',
      promptZh: '关于 ㄹ래요? 的用法，哪句最准确？',
      choices: [
        { text: 'V + ㄹ래요? = 要做~吗？（提议/邀请）。가다 → 갈래요?', correct: true },
        { text: 'ㄹ래요? 是过去时', correct: false },
        { text: 'ㄹ래요? 用于命令', correct: false },
        { text: 'ㄹ래요? 只用于第三人称', correct: false },
      ],
      explain: 'ㄹ래요? 询问对方意愿。반말 = ㄹ래?。用于 1/2 人称，不能用 3 人称',
    },
    {
      id: 'd24-g3-r2',
      promptZh: '关于 ㄹ게 vs ㄹ래，哪句最准确？',
      choices: [
        { text: 'ㄹ게 = 我承诺会做（意愿声明）；ㄹ래(?) = 想做 / 要做吗？（意愿询问）', correct: true },
        { text: '两者完全一样', correct: false },
        { text: 'ㄹ게 用现在，ㄹ래 用过去', correct: false },
        { text: 'ㄹ게 用书面，ㄹ래 用口语', correct: false },
      ],
      explain: '갈게 = 我一定去；갈래? = 你要去吗？回复朋友邀请时"我承诺"用 갈게',
    },
    {
      id: 'd24-g3-r3',
      promptZh: '关于 에 vs 에서，哪句最准确？',
      choices: [
        { text: '에 = 存在地点 / 方向；에서 = 动作发生地点。만나다 用 에서', correct: true },
        { text: '两者完全一样', correct: false },
        { text: '에 用现在，에서 用过去', correct: false },
        { text: '에서 只用书面语', correct: false },
      ],
      explain: '학교에 있어요（在学校 · 存在）; 학교에서 공부해요（在学校学 · 动作）',
    },
    {
      id: 'd24-g3-r4',
      promptZh: '关于 같이 的发音，哪句最准确？',
      choices: [
        { text: '같이 读作 [가치]，因为 구개음화（ㅌ+ㅣ → ㅊ）', correct: true },
        { text: '같이 读作 [갇이]', correct: false },
        { text: '같이 读作 [같이]（照写读）', correct: false },
        { text: '같이 读作 [강이]', correct: false },
      ],
      explain: 'ㅌ + ㅣ 触发口盖化（구개음화）→ 발음为 ㅊ。类似的还有 밭이 → [바치]',
    },
  ],
};
