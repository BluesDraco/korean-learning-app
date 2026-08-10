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
  subtitle: '在四人群聊里听懂每一次@',

  meaning: [
    {
      id: 'd24-l2-m1',
      audioKo: '내일 학교 끝나고 카페 갈래?',
      choices: [
        { text: '明天放学去咖啡馆吗？', correct: true },
        { text: '明天学校要关门。', correct: false },
        { text: '咖啡馆什么时候关？', correct: false },
        { text: '现在放学了，一起去吧。', correct: false },
      ],
      explain: '끝나고(结束后) + 갈래?(要去吗) = 朋友的随意邀请',
    },
    {
      id: 'd24-l2-m2',
      audioKo: '새로 생긴 데 있어. 같이 가자!',
      choices: [
        { text: '有家新开的，一起去吧！', correct: true },
        { text: '刚开的那家关了。', correct: false },
        { text: '新的地方还没找到。', correct: false },
        { text: '我们分开去吧。', correct: false },
      ],
      explain: '새로 생긴 데 = 新开的地方。같이 가자 = 一起去吧（반말提议）',
    },
    {
      id: 'd24-l2-m3',
      audioKo: '학교 정문 5시!',
      choices: [
        { text: '学校正门5点！', correct: true },
        { text: '学校5号门。', correct: false },
        { text: '5点关学校正门。', correct: false },
        { text: '正门5楼。', correct: false },
      ],
      explain: '约定地点 + 时间：정문(正门) + 5시。省略助词是口语特征',
    },
    {
      id: 'd24-l2-m4',
      audioKo: '토리 진짜 올 거지?',
      choices: [
        { text: '兔莉你真的会来吧？', correct: true },
        { text: '兔莉真的来过。', correct: false },
        { text: '兔莉正在来。', correct: false },
        { text: '兔莉不会来。', correct: false },
      ],
      explain: '올 거지? = 会来吧？（未来形 + 确认语尾 지）',
    },
    {
      id: 'd24-l2-m5',
      audioKo: '당연하지! 진짜 갈게!',
      choices: [
        { text: '当然了！真的去！', correct: true },
        { text: '不知道，可能去。', correct: false },
        { text: '当然不去。', correct: false },
        { text: '真的没时间。', correct: false },
      ],
      explain: '朋友间强烈肯定 → 당연하지 + 갈게（承诺）',
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
      explain: '같이(一起) 放在动词前。反义是 따로(单独)',
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
      explain: '가다 + ㄹ래? = 갈래?（提议邀请 · 반말）',
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
      explain: '어디 + 서(에서缩写) → 表示"在哪里做~"',
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
      explain: '~고 表示"~之后"（两个动作先后）。끝나서 表示原因，语感不同',
    },
  ],

  reply: [
    {
      id: 'd24-l2-r1',
      audioKo: '내일 학교 끝나고 카페 갈래?',
      promptZh: 'Junho 邀你放学后去咖啡馆，你想附和"一起"并问地点，最自然的一句？',
      choices: [
        { text: '같이 가자! 어디서 만나?', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '카페가 뭐야?', correct: false },
        { text: '싫어.', correct: false },
      ],
      explain: '반말群聊 → 같이 가자（一起去吧）+ 어디서 만나?（在哪见）· 邀请回应三件套',
    },
    {
      id: 'd24-l2-r2',
      audioKo: '학교 정문 5시!',
      promptZh: 'Junho 定好正门 5 点，你答应，最简短的一句？',
      choices: [
        { text: '알았어! 콜!', correct: true },
        { text: '싫어.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '정문이 뭐야?', correct: false },
      ],
      explain: '알았어（知道了）+ 콜（成交）· 群聊반말常用组合',
    },
    {
      id: 'd24-l2-r3',
      audioKo: '토리 진짜 올 거지?',
      promptZh: 'Haru 想确认你真会来，你想强烈肯定，最有决心的一句？',
      choices: [
        { text: '당연하지! 진짜 갈게!', correct: true },
        { text: '몰라.', correct: false },
        { text: '싫어.', correct: false },
        { text: '카페가 어디야?', correct: false },
      ],
      explain: '朋友质疑 → 당연하지（那还用说）+ 갈게（我承诺去）· 반말最强肯定',
    },
  ],
};
