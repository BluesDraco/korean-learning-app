import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 24 · 1-5 Boss 战 · 群聊约定综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：邀请三件套 + ~고（然后）+ 어디서（在哪儿）+ ㄹ게 承诺
 */
export const day24Boss: BossSubQuestData = {
  day: 24, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '在群聊里敲定明天 5 点正门', subtitleEn: 'Finalize meeting at the main gate at 5 PM tomorrow in the group chat',
  intro: '手机震了三十几下。三个头像同时出现在屏幕上，最下面一行"토리는??"闪着待回复的小红点。从没被这么多人一起等过。深呼吸——반말群聊模式启动。', introEn: 'My phone buzzed over thirty times. Three profile pictures popped up on the screen, and at the bottom, "토리는??" blinked with a red dot waiting for a reply. I\'ve never been waited on by so many people at once. Deep breath—반말 group chat mode activated.',
  outroHook: '通过！约定敲定，明天정문 5시不见不散。明天汉江边，四人一起喊应援口号——반말的世界继续升级。', outroHookEn: 'Passed! The plan is set—tomorrow at 정문 5시, see you there. Tomorrow by the Han River, the four of us will shout the cheer together—the world of 반말 keeps leveling up.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd24-b5-t1',
        audioKo: '내일 학교 끝나고 카페 갈래?',
        choices: [
          { text: '明天放学去咖啡馆吗？', textEn: 'Want to go to the café after school tomorrow?', correct: true },
          { text: '明天学校要关门。', textEn: 'The school will be closed tomorrow.', correct: false },
          { text: '咖啡馆什么时候关？', textEn: 'When does the café close?', correct: false },
          { text: '现在放学，一起走吧。', textEn: 'School\'s out now, let\'s go together.', correct: false },
        ],
        explain: '끝나고（结束后）+ 갈래?（要去吗）', explainEn: '끝나고 (after it ends) + 갈래? (wanna go?)',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd24-b5-t2',
        audioKo: '당연하지! 진짜 갈게!',
        choices: [
          { text: '当然了！真的去！', textEn: 'Of course! I\'ll really go!', correct: true },
          { text: '当然不去。', textEn: 'Of course not.', correct: false },
          { text: '可能会去。', textEn: 'I might go.', correct: false },
          { text: '不知道。', textEn: 'I don\'t know.', correct: false },
        ],
        explain: '반말最强肯定 + 承诺组合', explainEn: 'The strongest 반말 affirmation + promise combo',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd24-b5-t3',
        promptZh: '"在哪见？"哪句最标准？', promptZhEn: 'Which is the most standard way to say "Where should we meet?"',
        choices: [
          { text: '어디에 만나?', correct: false },
          { text: '어디서 만나?', correct: true },
          { text: '어디를 만나?', correct: false },
          { text: '어디가 만나?', correct: false },
        ],
        explain: '만나다 是动作 → 用 에서（缩写 서）表动作地点', explainEn: '만나다 is an action → use 에서 (abbreviated as 서) to mark the location of the action',
      },
    },
    {
      type: 'choice',
      label: '语尾选择', labelEn: 'Ending choice',
      task: {
        id: 'd24-b5-t4',
        promptZh: '"真的去（承诺自己）"哪句最标准？', promptZhEn: 'Which is the most standard way to say "I\'ll really go (promising myself)"?',
        choices: [
          { text: '진짜 갈래.', correct: false },
          { text: '진짜 갈게.', correct: true },
          { text: '진짜 갈까.', correct: false },
          { text: '진짜 가요?', correct: false },
        ],
        explain: 'ㄹ게 = 承诺（"我会~"）; ㄹ래 = 意愿询问', explainEn: 'ㄹ게 = promise ("I will~"); ㄹ래 = asking about intention',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd24-b5-t5',
        promptKo: '끝나고',
        promptHangul: 'kkeun-na-go',
        choices: [
          { text: '结束之后', textEn: 'After it ends', correct: true },
          { text: '结束之前', textEn: 'Before it ends', correct: false },
          { text: '正在结束', textEn: 'Ending right now', correct: false },
          { text: '刚刚开始', textEn: 'Just started', correct: false },
        ],
        explain: '끝나다 + 고 = 结束后。约定"~完之后"的固定表达', explainEn: '끝나다 + 고 = after it ends. A fixed expression for "after ~ is done" in plans',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd24-b5-t6',
        zhHint: '一起去吧！在哪见？', zhHintEn: 'Let\'s go together! Where should we meet?',
        audioKo: '같이 가자! 어디서 만나?',
        answer: ['같이', '가자!', '어디서', '만나?'],
        tokens: ['같이', '가자!', '어디서', '만나?', '따로', '어디에', '만나요.', '있어.'],
        explain: '반말邀请回应双件套', explainEn: 'The two-piece set for responding to a 반말 invitation',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd24-b5-t7',
        zhHint: '当然了！一定去！', zhHintEn: 'Of course! I\'ll definitely go!',
        audioKo: '당연하지! 꼭 갈게!',
        answer: ['당연하지!', '꼭', '갈게!'],
        tokens: ['당연하지!', '꼭', '갈게!', '갈래!', '몰라!', '싫어!', '없어!'],
        explain: '당연하지 + 꼭 + 갈게 = 三层加强承诺', explainEn: '당연하지 + 꼭 + 갈게 = Triple-layered strong promise',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd24-b5-t8',
        promptZh: '对老师说"当然了"，最得体的一句？', promptZhEn: 'What\'s the most polite way to say "of course" to a teacher?',
        choices: [
          { text: '선생님, 당연하죠!', correct: true },
          { text: '선생님, 당연하지!', correct: false },
          { text: '선생님, 콜!', correct: false },
          { text: '선생님, 몰라요.', correct: false },
        ],
        explain: '对长辈用 당연하죠（해요体，당연하지요 的缩写）· 반말 하지 和 콜 都不合场合', explainEn: 'Use 당연하죠 (해요 form, short for 당연하지요) with elders · 반말 하지 and 콜 are both inappropriate',
      },
    },
  ],
};
