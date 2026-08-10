import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 5 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 5 主流程 Haru 走廊对话 + 邀请早饭场景
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强制填 은/는（对比 이/가），reply 聚焦邀请回应
 */
export const day5Listen: ListenSubQuestData = {
  day: 5, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '听清 Haru 的邀请，抓住 은/는 的位置',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd05-l2-m1',
      audioKo: '같이 아침 먹으러 갈래요?',
      choices: [
        { text: '一起去吃早饭吗？', correct: true },
        { text: '你吃过早饭了吗？', correct: false },
        { text: '早饭喜欢吃什么？', correct: false },
        { text: '早饭在哪吃？', correct: false },
      ],
      explain: '같이(一起) + 아침(早饭) + 먹으러(为了吃) + 갈래요(要去吗)。~러 갈래요 是邀请标准句',
    },
    {
      id: 'd05-l2-m2',
      audioKo: '네, 맞아요. 저는 토리예요.',
      choices: [
        { text: '是的，我是 Haru。', correct: false },
        { text: '是的，没错。我叫兔莉。', correct: true },
        { text: '不，我不是新来的。', correct: false },
        { text: '是的，我知道。', correct: false },
      ],
      explain: '맞아요 = 对/没错，比单说 네 更暖。저는 = 说到我（主题）',
    },
    {
      id: 'd05-l2-m3',
      audioKo: '식당은 1층에 있어요.',
      choices: [
        { text: '1 楼有食堂。', correct: false },
        { text: '食堂在 1 楼。', correct: true },
        { text: '1 楼的食堂关门了。', correct: false },
        { text: '我在 1 楼等你。', correct: false },
      ],
      explain: '식당은(食堂呢，主题) + 1층에(在 1 楼) + 있어요(有/在)。是在描述"食堂"这个话题的位置',
    },
    {
      id: 'd05-l2-m4',
      audioKo: '오늘은 날씨가 좋아요.',
      choices: [
        { text: '每天天气都很好。', correct: false },
        { text: '今天天气好。', correct: true },
        { text: '今天下雨了。', correct: false },
        { text: '天气不好。', correct: false },
      ],
      explain: '오늘은(今天呢，主题·隐含对比) + 날씨가(天气) + 좋아요。主题 은/는 + 主语 이/가 同句出现',
    },
    {
      id: 'd05-l2-m5',
      audioKo: '아니요, 몰라요. 같이 가요.',
      choices: [
        { text: '不，不喜欢。一起走吧。', correct: false },
        { text: '不，不知道。一起去吧。', correct: true },
        { text: '不是，是我。一起吃吧。', correct: false },
        { text: '不知道，我自己去。', correct: false },
      ],
      explain: '몰라요 = 不知道。「같이 가요」比「같이 갈래요」更肯定——已经决定要一起',
    },
  ],

  // ─── 听句填空：播完整句 → 挖一词，4 韩文选项 ───
  cloze: [
    {
      id: 'd05-l2-c1',
      audioKo: '저는 토리예요.',
      clozeParts: ['저', ' 토리예요.'],
      choices: [
        { text: '는', correct: true },
        { text: '은', correct: false },
        { text: '가', correct: false },
        { text: '이', correct: false },
      ],
      explain: '저 无收音 → 主题助词用 는。「저는 토리예요」= "说到我，是兔莉"',
    },
    {
      id: 'd05-l2-c2',
      audioKo: '오늘은 날씨가 좋아요.',
      clozeParts: ['오늘', ' 날씨가 좋아요.'],
      choices: [
        { text: '는', correct: false },
        { text: '은', correct: true },
        { text: '이', correct: false },
        { text: '가', correct: false },
      ],
      explain: '오늘 有收音 ㄹ → 主题助词用 은。隐含对比："今天（相比其他天）天气好"',
    },
    {
      id: 'd05-l2-c3',
      audioKo: '식당은 어디에 있어요?',
      clozeParts: ['식당', ' 어디에 있어요?'],
      choices: [
        { text: '이', correct: false },
        { text: '가', correct: false },
        { text: '은', correct: true },
        { text: '을', correct: false },
      ],
      explain: '식당 有收音 ㅇ → 은。音频里 Haru 已经把"食堂"当成话题接续（前一句刚提到食堂），所以填 은 更贴语境',
    },
    {
      id: 'd05-l2-c4',
      audioKo: '같이 아침 먹으러 갈래요?',
      clozeParts: ['같이 ', ' 먹으러 갈래요?'],
      choices: [
        { text: '점심', correct: false },
        { text: '저녁', correct: false },
        { text: '아침', correct: true },
        { text: '식당', correct: false },
      ],
      explain: '아침 = 早饭。점심(午饭)、저녁(晚饭) 是同类词。식당 是"食堂"这个地点，不是要吃的东西',
    },
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
    {
      id: 'd05-l2-r1',
      audioKo: '301호 새로 온 학생이에요?',
      promptZh: 'Haru 问你是不是 301 新来的，你想温暖地承认，应该说？',
      choices: [
        { text: '네, 맞아요. 저는 토리예요.', correct: true },
        { text: '아니요, 저는 학생이 아니에요.', correct: false },
        { text: '괜찮아요, 감사합니다.', correct: false },
        { text: '이름이 뭐예요?', correct: false },
      ],
      explain: '맞아요(没错) 比单说 네 更亲切。第一次交朋友的场合用这句最暖',
    },
    {
      id: 'd05-l2-r2',
      audioKo: '같이 아침 먹으러 갈래요?',
      promptZh: 'Haru 邀请一起吃早饭，你想开心地答应，应该说？',
      choices: [
        { text: '아니요, 몰라요.', correct: false },
        { text: '네, 좋아요! 같이 가요.', correct: true },
        { text: '저는 학생이에요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '좋아요 = 好啊/我喜欢。答应邀请用「같이 가요」（一起走吧）。갈래요? 是问对方要不要，가요 是"走吧"的果断回应',
    },
    {
      id: 'd05-l2-r3',
      audioKo: '식당 어디 있는지 알아요?',
      promptZh: 'Haru 问你知不知道食堂在哪，你其实完全不知道，应该说？',
      choices: [
        { text: '네, 알아요. 혼자 갈게요.', correct: false },
        { text: '아니요, 몰라요. 같이 가요!', correct: true },
        { text: '식당은 없어요.', correct: false },
        { text: '식당이에요?', correct: false },
      ],
      explain: '不知道就 아니요, 몰라요 直说。加「같이 가요」变成"我也不知道，一起找吧"——邻居间最自然的回应',
    },
  ],
};
