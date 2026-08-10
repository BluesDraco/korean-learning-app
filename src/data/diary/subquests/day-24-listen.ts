import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 24 · 1-2 귀 트이기 · 听力子关卡
 * 素材：Day 24 主流程「群聊·四人约定」+ 补充约定语料
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化邀请三件套（같이 / ㄹ래? / 당연하지）
 */
export const day24Listen: ListenSubQuestData = {
  day: 24, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在四人群聊里听懂每一次@', subtitleEn: 'Understand every @ in a four-person group chat',

  meaning: [
    {
      id: 'd24-l2-m1',
      audioKo: '내일 학교 끝나고 카페 갈래?',
      choices: [
        { text: '明天放学去咖啡馆吗？', textEn: 'Want to go to the café after school tomorrow?', correct: true },
        { text: '明天学校要关门。', textEn: 'The school will be closed tomorrow.', correct: false },
        { text: '咖啡馆什么时候关？', textEn: 'When does the café close?', correct: false },
        { text: '现在放学了，一起去吧。', textEn: 'School\'s over now, let\'s go together.', correct: false },
      ],
      explain: '끝나고(结束后) + 갈래?(要去吗) = 朋友的随意邀请', explainEn: '끝나고 (after it ends) + 갈래? (do you want to go?) = a casual invitation from a friend',
    },
    {
      id: 'd24-l2-m2',
      audioKo: '새로 생긴 데 있어. 같이 가자!',
      choices: [
        { text: '有家新开的，一起去吧！', textEn: 'There\'s a newly opened place, let\'s go together!', correct: true },
        { text: '刚开的那家关了。', textEn: 'The one that just opened closed down.', correct: false },
        { text: '新的地方还没找到。', textEn: 'Haven\'t found a new place yet.', correct: false },
        { text: '我们分开去吧。', textEn: 'Let\'s go separately.', correct: false },
      ],
      explain: '새로 생긴 데 = 新开的地方。같이 가자 = 一起去吧（반말提议）', explainEn: '새로 생긴 데 = a newly opened place. 같이 가자 = let\'s go together (casual suggestion)',
    },
    {
      id: 'd24-l2-m3',
      audioKo: '학교 정문 5시!',
      choices: [
        { text: '学校正门5点！', textEn: 'At the school\'s main gate at 5!', correct: true },
        { text: '学校5号门。', textEn: 'School gate 5.', correct: false },
        { text: '5点关学校正门。', textEn: 'The school\'s main gate closes at 5.', correct: false },
        { text: '正门5楼。', textEn: 'Main gate, 5th floor.', correct: false },
      ],
      explain: '约定地点 + 时间：정문(正门) + 5시。省略助词是口语特征', explainEn: 'Meeting place + time: 정문 (main gate) + 5시. Omitting particles is a spoken language feature.',
    },
    {
      id: 'd24-l2-m4',
      audioKo: '토리 진짜 올 거지?',
      choices: [
        { text: '兔莉你真的会来吧？', textEn: 'Tori, you\'ll really come, right?', correct: true },
        { text: '兔莉真的来过。', textEn: 'Tori really did come.', correct: false },
        { text: '兔莉正在来。', textEn: 'Tori is coming.', correct: false },
        { text: '兔莉不会来。', textEn: 'Tori won\'t come.', correct: false },
      ],
      explain: '올 거지? = 会来吧？（未来形 + 确认语尾 지）', explainEn: '올 거지? = Will come, right? (Future form + confirmation ending 지)',
    },
    {
      id: 'd24-l2-m5',
      audioKo: '당연하지! 진짜 갈게!',
      choices: [
        { text: '当然了！真的去！', textEn: 'Of course! I\'ll really go!', correct: true },
        { text: '不知道，可能去。', textEn: 'Not sure, might go.', correct: false },
        { text: '当然不去。', textEn: 'Of course not.', correct: false },
        { text: '真的没时间。', textEn: 'Really no time.', correct: false },
      ],
      explain: '朋友间强烈肯定 → 당연하지 + 갈게（承诺）', explainEn: 'Strong affirmation among friends → 당연하지 + 갈게 (promise)',
    },
  ],

  cloze: [
    {
      id: 'd24-l2-c1',
      audioKo: '같이 가자!',
      clozeParts: ['', ' 가자!'],
      choices: [
        { text: '같이', correct: true },
        { text: '따로', correct: false },
        { text: '진짜', correct: false },
        { text: '어디서', correct: false },
      ],
      explain: '같이(一起) 放在动词前。反义是 따로(单独)', explainEn: '같이 (together) goes before the verb. The opposite is 따로 (separately).',
    },
    {
      id: 'd24-l2-c2',
      audioKo: '카페 갈래?',
      clozeParts: ['카페 ', '?'],
      choices: [
        { text: '갈래', correct: true },
        { text: '갔어', correct: false },
        { text: '갈게', correct: false },
        { text: '가고 싶어', correct: false },
      ],
      explain: '가다 + ㄹ래? = 갈래?（提议邀请 · 반말）', explainEn: '가다 + ㄹ래? = 갈래? (suggestion/invitation · casual speech)',
    },
    {
      id: 'd24-l2-c3',
      audioKo: '어디서 만나?',
      clozeParts: ['', ' 만나?'],
      choices: [
        { text: '어디서', correct: true },
        { text: '어디', correct: false },
        { text: '어디에', correct: false },
        { text: '어디를', correct: false },
      ],
      explain: '어디 + 서(에서缩写) → 表示"在哪里做~"', explainEn: '어디 + 서 (abbreviation of 에서) → indicates "where to do ~"',
    },
    {
      id: 'd24-l2-c4',
      audioKo: '학교 끝나고 만나요.',
      clozeParts: ['학교 ', ' 만나요.'],
      choices: [
        { text: '끝나고', correct: true },
        { text: '끝나서', correct: false },
        { text: '끝나면', correct: false },
        { text: '끝나는데', correct: false },
      ],
      explain: '~고 表示"~之后"（两个动作先后）。끝나서 表示原因，语感不同', explainEn: '~고 means "after ~" (two actions in sequence). 끝나서 indicates reason, with a different nuance.',
    },
  ],

  reply: [
    {
      id: 'd24-l2-r1',
      audioKo: '내일 학교 끝나고 카페 갈래?',
      promptZh: 'Junho 邀你放学后去咖啡馆，你想附和"一起"并问地点，最自然的一句？', promptZhEn: 'Junho invites you to a café after school. You want to agree with "together" and ask where. What\'s the most natural sentence?',
      choices: [
        { text: '같이 가자! 어디서 만나?', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '카페가 뭐야?', correct: false },
        { text: '싫어.', correct: false },
      ],
      explain: '반말群聊 → 같이 가자（一起去吧）+ 어디서 만나?（在哪见）· 邀请回应三件套', explainEn: 'Casual group chat → 같이 가자 (let\'s go together) + 어디서 만나? (where to meet) · the three-part invitation response set',
    },
    {
      id: 'd24-l2-r2',
      audioKo: '학교 정문 5시!',
      promptZh: 'Junho 定好正门 5 点，你答应，最简短的一句？', promptZhEn: 'Junho sets the main gate at 5. You agree. What\'s the shortest sentence?',
      choices: [
        { text: '알았어! 콜!', correct: true },
        { text: '싫어.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '정문이 뭐야?', correct: false },
      ],
      explain: '알았어（知道了）+ 콜（成交）· 群聊반말常用组合', explainEn: '알았어 (got it) + 콜 (deal) · common casual group chat combo',
    },
    {
      id: 'd24-l2-r3',
      audioKo: '토리 진짜 올 거지?',
      promptZh: 'Haru 想确认你真会来，你想强烈肯定，最有决心的一句？', promptZhEn: 'Haru wants to confirm you\'ll really come. You want to strongly affirm. What\'s the most determined sentence?',
      choices: [
        { text: '당연하지! 진짜 갈게!', correct: true },
        { text: '몰라.', correct: false },
        { text: '싫어.', correct: false },
        { text: '카페가 어디야?', correct: false },
      ],
      explain: '朋友质疑 → 당연하지（那还用说）+ 갈게（我承诺去）· 반말最强肯定', explainEn: 'Friend doubts → 당연하지 (of course) + 갈게 (I\'ll go, promise) · strongest casual affirmation',
    },
  ],
};
