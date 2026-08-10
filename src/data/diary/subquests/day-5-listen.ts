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
  subtitle: '听清 Haru 的邀请，抓住 은/는 的位置', subtitleEn: 'Listen carefully to Haru\'s invitation and catch where 은/는 goes.',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd05-l2-m1',
      audioKo: '같이 아침 먹으러 갈래요?',
      choices: [
        { text: '一起去吃早饭吗？', textEn: 'Want to go eat breakfast together?', correct: true },
        { text: '你吃过早饭了吗？', textEn: 'Did you eat breakfast?', correct: false },
        { text: '早饭喜欢吃什么？', textEn: 'What do you like to eat for breakfast?', correct: false },
        { text: '早饭在哪吃？', textEn: 'Where do you eat breakfast?', correct: false },
      ],
      explain: '같이(一起) + 아침(早饭) + 먹으러(为了吃) + 갈래요(要去吗)。~러 갈래요 是邀请标准句', explainEn: '같이 (together) + 아침 (breakfast) + 먹으러 (to eat) + 갈래요 (want to go?). ~러 갈래요 is the standard invitation pattern.',
    },
    {
      id: 'd05-l2-m2',
      audioKo: '네, 맞아요. 저는 토리예요.',
      choices: [
        { text: '是的，我是 Haru。', textEn: 'Yes, I\'m Haru.', correct: false },
        { text: '是的，没错。我叫兔莉。', textEn: 'Yes, that\'s right. My name is Tori.', correct: true },
        { text: '不，我不是新来的。', textEn: 'No, I\'m not new here.', correct: false },
        { text: '是的，我知道。', textEn: 'Yes, I know.', correct: false },
      ],
      explain: '맞아요 = 对/没错，比单说 네 更暖。저는 = 说到我（主题）', explainEn: '맞아요 = right/correct, warmer than just 네. 저는 = as for me (topic)',
    },
    {
      id: 'd05-l2-m3',
      audioKo: '식당은 1층에 있어요.',
      choices: [
        { text: '1 楼有食堂。', textEn: 'There\'s a cafeteria on the 1st floor.', correct: false },
        { text: '食堂在 1 楼。', textEn: 'The cafeteria is on the 1st floor.', correct: true },
        { text: '1 楼的食堂关门了。', textEn: 'The cafeteria on the 1st floor is closed.', correct: false },
        { text: '我在 1 楼等你。', textEn: 'I\'ll wait for you on the 1st floor.', correct: false },
      ],
      explain: '식당은(食堂呢，主题) + 1층에(在 1 楼) + 있어요(有/在)。是在描述"食堂"这个话题的位置', explainEn: '식당은 (as for the cafeteria, topic) + 1층에 (on the 1st floor) + 있어요 (is/exists). It describes the location of the topic "cafeteria."',
    },
    {
      id: 'd05-l2-m4',
      audioKo: '오늘은 날씨가 좋아요.',
      choices: [
        { text: '每天天气都很好。', textEn: 'The weather is nice every day.', correct: false },
        { text: '今天天气好。', textEn: 'The weather is nice today.', correct: true },
        { text: '今天下雨了。', textEn: 'It rained today.', correct: false },
        { text: '天气不好。', textEn: 'The weather is bad.', correct: false },
      ],
      explain: '오늘은(今天呢，主题·隐含对比) + 날씨가(天气) + 좋아요。主题 은/는 + 主语 이/가 同句出现', explainEn: '오늘은 (as for today, topic·implied contrast) + 날씨가 (weather) + 좋아요. Topic 은/는 + subject 이/가 appear in the same sentence.',
    },
    {
      id: 'd05-l2-m5',
      audioKo: '아니요, 몰라요. 같이 가요.',
      choices: [
        { text: '不，不喜欢。一起走吧。', textEn: 'No, I don\'t like it. Let\'s go together.', correct: false },
        { text: '不，不知道。一起去吧。', textEn: 'No, I don\'t know. Let\'s go together.', correct: true },
        { text: '不是，是我。一起吃吧。', textEn: 'No, it\'s me. Let\'s eat together.', correct: false },
        { text: '不知道，我自己去。', textEn: 'I don\'t know, I\'ll go by myself.', correct: false },
      ],
      explain: '몰라요 = 不知道。「같이 가요」比「같이 갈래요」更肯定——已经决定要一起', explainEn: '몰라요 = I don\'t know. "같이 가요" is more definitive than "같이 갈래요" — the decision to go together is already made.',
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
      explain: '저 无收音 → 主题助词用 는。「저는 토리예요」= "说到我，是兔莉"', explainEn: '저 has no final consonant → topic particle is 는. "저는 토리예요" = "As for me, I\'m Tori."',
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
      explain: '오늘 有收音 ㄹ → 主题助词用 은。隐含对比："今天（相比其他天）天气好"', explainEn: '오늘 has final consonant ㄹ → topic particle is 은. Implied contrast: "Today (compared to other days) the weather is good."',
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
      explain: '식당 有收音 ㅇ → 은。音频里 Haru 已经把"食堂"当成话题接续（前一句刚提到食堂），所以填 은 更贴语境', explainEn: '식당 has final consonant ㅇ → 은. In the audio, Haru already treats "cafeteria" as a continuing topic (just mentioned in the previous sentence), so 은 fits the context better.',
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
      explain: '아침 = 早饭。점심(午饭)、저녁(晚饭) 是同类词。식당 是"食堂"这个地点，不是要吃的东西', explainEn: '아침 = breakfast. 점심 (lunch) and 저녁 (dinner) are related words. 식당 is the place "cafeteria," not something to eat.',
    },
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
    {
      id: 'd05-l2-r1',
      audioKo: '301호 새로 온 학생이에요?',
      promptZh: 'Haru 问你是不是 301 新来的，你想温暖地承认，应该说？', promptZhEn: 'Haru asks if you\'re new to room 301. You want to warmly admit it — what should you say?',
      choices: [
        { text: '네, 맞아요. 저는 토리예요.', correct: true },
        { text: '아니요, 저는 학생이 아니에요.', correct: false },
        { text: '괜찮아요, 감사합니다.', correct: false },
        { text: '이름이 뭐예요?', correct: false },
      ],
      explain: '맞아요(没错) 比单说 네 更亲切。第一次交朋友的场合用这句最暖', explainEn: '맞아요 (that\'s right) is friendlier than just 네. It\'s the warmest choice for a first meeting.',
    },
    {
      id: 'd05-l2-r2',
      audioKo: '같이 아침 먹으러 갈래요?',
      promptZh: 'Haru 邀请一起吃早饭，你想开心地答应，应该说？', promptZhEn: 'Haru invites you to have breakfast together. You want to happily accept — what should you say?',
      choices: [
        { text: '아니요, 몰라요.', correct: false },
        { text: '네, 좋아요! 같이 가요.', correct: true },
        { text: '저는 학생이에요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '좋아요 = 好啊/我喜欢。答应邀请用「같이 가요」（一起走吧）。갈래요? 是问对方要不要，가요 是"走吧"的果断回应', explainEn: '좋아요 = sounds good / I like it. To accept an invitation, use "같이 가요" (let\'s go). 갈래요? asks if the other person wants to; 가요 is a decisive "let\'s go."',
    },
    {
      id: 'd05-l2-r3',
      audioKo: '식당 어디 있는지 알아요?',
      promptZh: 'Haru 问你知不知道食堂在哪，你其实完全不知道，应该说？', promptZhEn: 'Haru asks if you know where the cafeteria is, but you have no idea. What should you say?',
      choices: [
        { text: '네, 알아요. 혼자 갈게요.', correct: false },
        { text: '아니요, 몰라요. 같이 가요!', correct: true },
        { text: '식당은 없어요.', correct: false },
        { text: '식당이에요?', correct: false },
      ],
      explain: '不知道就 아니요, 몰라요 直说。加「같이 가요」变成"我也不知道，一起找吧"——邻居间最自然的回应', explainEn: 'If you don\'t know, just say 아니요, 몰라요. Add 같이 가요 to make it "I don\'t know either, let\'s find it together"—the most natural response between neighbors.',
    },
  ],
};
