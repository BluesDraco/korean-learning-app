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
  subtitle: '掌握邀请-回应-确认三件套', subtitleEn: 'Master the invite-respond-confirm trio',

  fix: [
    {
      id: 'd24-g3-f1',
      promptKo: '같이 카페 가래요?',
      promptZh: '"一起去咖啡馆吗？"哪句正确？', promptZhEn: 'Which is correct for "Want to go to a café together?"',
      choices: [
        { text: '같이 카페 가래요?', correct: false },
        { text: '같이 카페 갈래요?', correct: true },
        { text: '같이 카페 가고 있어요?', correct: false },
        { text: '같이 카페 갈게요?', correct: false },
      ],
      explain: '가다 + ㄹ래요? = 갈래요?（提议邀请）。ㄹ 是必需的，不能省', explainEn: '가다 + ㄹ래요? = 갈래요? (suggestion/invitation). ㄹ is essential, can\'t be omitted',
    },
    {
      id: 'd24-g3-f2',
      promptKo: '어디에 만나요?',
      promptZh: '"在哪见？"哪句最标准？', promptZhEn: 'Which is the most standard way to say "Where should we meet?"',
      choices: [
        { text: '어디에 만나요?', correct: false },
        { text: '어디서 만나요?', correct: true },
        { text: '어디를 만나요?', correct: false },
        { text: '어디가 만나요?', correct: false },
      ],
      explain: '만나다 是动作 → 用 에서（动作地点），缩写 서。에 表示"存在/方向"', explainEn: '만나다 is an action → use 에서 (action location), abbreviated as 서. 에 indicates "existence/direction"',
    },
    {
      id: 'd24-g3-f3',
      promptKo: '학교 끝나서 만나요.',
      promptZh: '"下课后见面"哪句最标准？', promptZhEn: 'Which is the most standard for "meet after class"?',
      choices: [
        { text: '학교 끝나서 만나요.', correct: false },
        { text: '학교 끝나고 만나요.', correct: true },
        { text: '학교 끝난 후 만나요.', correct: false },
        { text: '학교 끝나면 만나요.', correct: false },
      ],
      explain: '~고 表示"之后"（两个动作先后）。~서 表示原因/理由，语感不同。끝난 후 语法正确但书面感', explainEn: '~고 means "after" (sequential actions). ~서 indicates cause/reason, different nuance. 끝난 후 is grammatically correct but feels written/formal',
    },
    {
      id: 'd24-g3-f4',
      promptKo: '선생님, 당연하지!',
      promptZh: '对老师说"当然了"最得体的一句？', promptZhEn: 'What\'s the most polite way to say "of course" to a teacher?',
      choices: [
        { text: '선생님, 당연하지!', correct: false },
        { text: '선생님, 당연하죠!', correct: true },
        { text: '선생님, 당연!', correct: false },
        { text: '선생님, 콜!', correct: false },
      ],
      explain: '당연하지 是반말；对长辈用 당연하죠（해요体，당연하지요 的缩写）。콜 也是반말', explainEn: '당연하지 is 반말; use 당연하죠 (해요 form, short for 당연하지요) with elders. 콜 is also 반말',
    },
    {
      id: 'd24-g3-f5',
      promptKo: '진짜 갈래.',
      promptZh: '"真的去（承诺自己）"哪句最标准？', promptZhEn: 'Which is the most standard way to say "I\'ll really go (promising myself)"?',
      choices: [
        { text: '진짜 갈래.', correct: false },
        { text: '진짜 갈게.', correct: true },
        { text: '진짜 가고 있어.', correct: false },
        { text: '진짜 갔어.', correct: false },
      ],
      explain: 'ㄹ래 = 提议/意愿询问 ; ㄹ게 = 承诺（"我一定会~"）。承诺场景用 갈게', explainEn: 'ㄹ래 = suggestion/will inquiry; ㄹ게 = promise ("I definitely will~"). Use 갈게 for promises',
    },
  ],

  compose: [
    {
      id: 'd24-g3-c1',
      zhHint: '一起去吧！在哪见？', zhHintEn: 'Let\'s go together! Where should we meet?',
      audioKo: '같이 가자! 어디서 만나?',
      answer: ['같이', '가자!', '어디서', '만나?'],
      tokens: ['같이', '가자!', '어디서', '만나?', '따로', '어디에', '만나요.', '있어.'],
      explain: '반말群聊：같이 + 가자（一起吧）+ 어디서 만나?（在哪见）', explainEn: '반말 group chat: 같이 + 가자 (let\'s go together) + 어디서 만나? (where to meet?)',
    },
    {
      id: 'd24-g3-c2',
      zhHint: '明天放学去咖啡馆吗？', zhHintEn: 'Want to go to the café after school tomorrow?',
      audioKo: '내일 학교 끝나고 카페 갈래?',
      answer: ['내일', '학교', '끝나고', '카페', '갈래?'],
      tokens: ['내일', '학교', '끝나고', '카페', '갈래?', '갔어?', '갈게.', '있어?'],
      explain: '끝나고（结束后）+ 갈래?（要去吗）· 朋友随意邀请', explainEn: '끝나고 (after it ends) + 갈래? (wanna go?) · casual invite between friends',
    },
    {
      id: 'd24-g3-c3',
      zhHint: '当然了！真的去！', zhHintEn: 'Of course! I\'ll really go!',
      audioKo: '당연하지! 진짜 갈게!',
      answer: ['당연하지!', '진짜', '갈게!'],
      tokens: ['당연하지!', '진짜', '갈게!', '갈래!', '몰라!', '싫어!', '없어!'],
      explain: '당연하지（那还用说）+ 갈게（承诺自己会去）· 반말最强肯定', explainEn: '당연하지 (obviously) + 갈게 (promise to go) · strongest 반말 affirmation',
    },
    {
      id: 'd24-g3-c4',
      zhHint: '有一家新开的地方。', zhHintEn: 'There\'s a newly opened place.',
      audioKo: '새로 생긴 데 있어.',
      answer: ['새로', '생긴', '데', '있어.'],
      tokens: ['새로', '생긴', '데', '있어.', '생기다', '있어요.', '없어.', '뭐야?'],
      explain: '새로（新）+ 생긴（관형형·出现的）+ 데（地方）· 修饰后置', explainEn: '새로 (newly) + 생긴 (modifier·appeared) + 데 (place) · modifier comes after',
    },
  ],

  rule: [
    {
      id: 'd24-g3-r1',
      promptZh: '关于 ㄹ래요? 的用法，哪句最准确？', promptZhEn: 'Which is most accurate about the usage of ㄹ래요?',
      choices: [
        { text: 'V + ㄹ래요? = 要做~吗？（提议/邀请）。가다 → 갈래요?', textEn: 'V + ㄹ래요? = want to do~? (suggestion/invitation). 가다 → 갈래요?', correct: true },
        { text: 'ㄹ래요? 是过去时', textEn: 'ㄹ래요? is past tense', correct: false },
        { text: 'ㄹ래요? 用于命令', textEn: 'ㄹ래요? is used for commands', correct: false },
        { text: 'ㄹ래요? 只用于第三人称', textEn: 'ㄹ래요? is only used for third person', correct: false },
      ],
      explain: 'ㄹ래요? 询问对方意愿。반말 = ㄹ래?。用于 1/2 人称，不能用 3 人称', explainEn: 'ㄹ래요? asks the other person\'s will. 반말 = ㄹ래?. Used for 1st/2nd person, not 3rd person',
    },
    {
      id: 'd24-g3-r2',
      promptZh: '关于 ㄹ게 vs ㄹ래，哪句最准确？', promptZhEn: 'Which is most accurate about ㄹ게 vs ㄹ래?',
      choices: [
        { text: 'ㄹ게 = 我承诺会做（意愿声明）；ㄹ래(?) = 想做 / 要做吗？（意愿询问）', textEn: 'ㄹ게 = I promise to do (statement of will); ㄹ래(?) = want to do / will you do? (inquiry of will)', correct: true },
        { text: '两者完全一样', textEn: 'The two are exactly the same', correct: false },
        { text: 'ㄹ게 用现在，ㄹ래 用过去', textEn: 'ㄹ게 is for present, ㄹ래 is for past', correct: false },
        { text: 'ㄹ게 用书面，ㄹ래 用口语', textEn: 'ㄹ게 is written, ㄹ래 is spoken', correct: false },
      ],
      explain: '갈게 = 我一定去；갈래? = 你要去吗？回复朋友邀请时"我承诺"用 갈게', explainEn: '갈게 = I\'ll definitely go; 갈래? = Do you want to go? When replying to a friend\'s invitation, use 갈게 for \'I promise\'',
    },
    {
      id: 'd24-g3-r3',
      promptZh: '关于 에 vs 에서，哪句最准确？', promptZhEn: 'Which is most accurate about 에 vs 에서?',
      choices: [
        { text: '에 = 存在地点 / 方向；에서 = 动作发生地点。만나다 用 에서', textEn: '에 = location of existence / direction; 에서 = location where action occurs. 만나다 uses 에서', correct: true },
        { text: '两者完全一样', textEn: 'The two are exactly the same', correct: false },
        { text: '에 用现在，에서 用过去', textEn: '에 is for present, 에서 is for past', correct: false },
        { text: '에서 只用书面语', textEn: '에서 is only used in written language', correct: false },
      ],
      explain: '학교에 있어요（在学校 · 存在）; 학교에서 공부해요（在学校学 · 动作）', explainEn: '학교에 있어요 (at school · existence); 학교에서 공부해요 (study at school · action)',
    },
    {
      id: 'd24-g3-r4',
      promptZh: '关于 같이 的发音，哪句最准确？', promptZhEn: 'Which is most accurate about the pronunciation of 같이?',
      choices: [
        { text: '같이 读作 [가치]，因为 구개음화（ㅌ+ㅣ → ㅊ）', correct: true },
        { text: '같이 读作 [갇이]', textEn: '같이 is pronounced [갇이]', correct: false },
        { text: '같이 读作 [같이]（照写读）', textEn: '같이 is pronounced [같이] (as written)', correct: false },
        { text: '같이 读作 [강이]', textEn: '같이 is pronounced [강이]', correct: false },
      ],
      explain: 'ㅌ + ㅣ 触发口盖化（구개음화）→ 발음为 ㅊ。类似的还有 밭이 → [바치]',
    },
  ],
};
