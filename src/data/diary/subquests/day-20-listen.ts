import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 20 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 20 主流程「원룸 · 海豹房东」+ 补充租房语料
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化「N에 뭐가 들어 있어요?」+ 따로예요 结构
 */
export const day20Listen: ListenSubQuestData = {
  day: 20, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在空荡的一居室，听清房东的每一笔账', subtitleEn: 'In an empty studio, catch every charge the landlord lists',

  meaning: [
    {
      id: 'd20-l2-m1',
      audioKo: '관리비에 뭐가 들어 있어요?',
      choices: [
        { text: '管理费包含什么？', textEn: 'What does the maintenance fee include?', correct: true },
        { text: '管理费多少？', textEn: 'How much is the management fee?', correct: false },
        { text: '管理费怎么交？', textEn: 'How do I pay the management fee?', correct: false },
        { text: '管理费是谁交？', textEn: 'Who pays the management fee?', correct: false },
      ],
      explain: '「N에 뭐가 들어 있어요?」= N 里包含什么。签合同必问', explainEn: '"N에 뭐가 들어 있어요?" = What\'s included in N. Must ask when signing a contract',
    },
    {
      id: 'd20-l2-m2',
      audioKo: '보증금 500만, 월세 50만이에요.',
      choices: [
        { text: '押金500万，月租50万。', textEn: 'Deposit 5 million won, monthly rent 500,000 won.', correct: true },
        { text: '押金50万，月租500万。', textEn: 'Deposit 500,000 won, monthly rent 5 million won.', correct: false },
        { text: '总共550万。', textEn: 'Total 5.5 million won.', correct: false },
        { text: '月租50万，管理费5万。', textEn: 'Monthly rent 500,000 won, management fee 50,000 won.', correct: false },
      ],
      explain: '보증금(押金) 500만 + 월세(月租) 50만。租房的两个核心数字', explainEn: '보증금 (deposit) 5 million + 월세 (monthly rent) 500,000. The two key numbers in renting',
    },
    {
      id: 'd20-l2-m3',
      audioKo: '전기세는 따로예요.',
      choices: [
        { text: '电费另算。', textEn: 'Electricity is extra.', correct: true },
        { text: '电费包含在里面。', textEn: 'Electricity is included.', correct: false },
        { text: '电费很贵。', textEn: 'Electricity is expensive.', correct: false },
        { text: '电费是免费的。', textEn: 'Electricity is free.', correct: false },
      ],
      explain: '「따로예요」= 另算/另收。租房必确认——包不包含在管理费里', explainEn: '"따로예요" = separate/charged extra. Must confirm when renting — whether it\'s included in the management fee',
    },
    {
      id: 'd20-l2-m4',
      audioKo: '수도세랑 청소비만 들어 있어요.',
      choices: [
        { text: '只包含水费和清洁费。', textEn: 'It only includes water and cleaning fees.', correct: true },
        { text: '水费和清洁费另算。', textEn: 'Water and cleaning fees are separate.', correct: false },
        { text: '水费太贵了。', textEn: 'The water bill is too expensive.', correct: false },
        { text: '不包含清洁费。', textEn: 'It doesn\'t include cleaning fees.', correct: false },
      ],
      explain: '「A랑 B만 들어 있어요」= 只包含 A 和 B。만(只) 限定范围', explainEn: '\'A랑 B만 들어 있어요\' = Only includes A and B. 만 (only) limits the scope.',
    },
    {
      id: 'd20-l2-m5',
      audioKo: '토리 학생이죠?',
      choices: [
        { text: '是兔莉同学吧？', textEn: 'You\'re Tori, right?', correct: true },
        { text: '你是学生吗？', textEn: 'Are you a student?', correct: false },
        { text: '兔莉在哪里？', textEn: 'Where is Tori?', correct: false },
        { text: '兔莉学过韩语吗？', textEn: 'Has Tori studied Korean?', correct: false },
      ],
      explain: '「~이죠?」= ~对吧？（软性确认）。房东见面时对本人身份的礼貌确认', explainEn: '\'~이죠?\' = ~, right? (soft confirmation). A polite way for the landlord to confirm your identity when meeting.',
    },
  ],

  cloze: [
    {
      id: 'd20-l2-c1',
      audioKo: '관리비에 뭐가 들어 있어요?',
      clozeParts: ['관리비', ' 뭐가 들어 있어요?'],
      choices: [
        { text: '에', correct: true },
        { text: '이', correct: false },
        { text: '를', correct: false },
        { text: '도', correct: false },
      ],
      explain: '「N에 뭐가 들어 있어요?」= N 里包含什么。에 表示"在里面"', explainEn: '\'N에 뭐가 들어 있어요?\' = What does N include? 에 indicates \'inside\'.',
    },
    {
      id: 'd20-l2-c2',
      audioKo: '가방에 뭐가 들어 있어요?',
      clozeParts: ['가방에 ', ' 들어 있어요?'],
      choices: [
        { text: '뭐가', correct: true },
        { text: '뭐를', correct: false },
        { text: '뭐도', correct: false },
        { text: '뭐는', correct: false },
      ],
      explain: '뭐(什么) + 가(主格)。들어 있다 是自动词，问的对象是主语 → 用 이/가', explainEn: '뭐 (what) + 가 (subject particle). 들어 있다 is an intransitive verb, so the question targets the subject → use 이/가.',
    },
    {
      id: 'd20-l2-c3',
      audioKo: '전기세는 따로예요.',
      clozeParts: ['전기세', ' 따로예요.'],
      choices: [
        { text: '는', correct: true },
        { text: '가', correct: false },
        { text: '를', correct: false },
        { text: '도', correct: false },
      ],
      explain: '「는」是主题助词，指出"电费"这个话题。전기세 末字"세"无받침 → 는（有받침才用 은）',
    },
    {
      id: 'd20-l2-c4',
      audioKo: '인터넷만 들어 있어요.',
      clozeParts: ['인터넷', ' 들어 있어요.'],
      choices: [
        { text: '만', correct: true },
        { text: '도', correct: false },
        { text: '는', correct: false },
        { text: '를', correct: false },
      ],
      explain: '「만」= 只。「A만 들어 있어요」= 只包含 A。回答"包含什么"时的关键词', explainEn: '\'만\' = only. \'A만 들어 있어요\' = Only includes A. Key word when answering \'what\'s included\'.',
    },
  ],

  reply: [
    {
      id: 'd20-l2-r1',
      audioKo: '보증금 500만, 월세 50만이에요.',
      promptZh: '房东报完押金和月租，你想问管理费包含什么，最标准的一句？', promptZhEn: 'After the landlord states the deposit and monthly rent, what\'s the most standard way to ask what the management fee includes?',
      choices: [
        { text: '관리비에 뭐가 들어 있어요?', correct: true },
        { text: '월세가 얼마예요?', correct: false },
        { text: '보증금 깎아 주세요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '接下来必然要问管理费明细。「N에 뭐가 들어 있어요?」是今天的核心句', explainEn: 'Next, you must ask for the management fee details. \'N에 뭐가 들어 있어요?\' is today\'s core sentence.',
    },
    {
      id: 'd20-l2-r2',
      audioKo: '수도세랑 청소비만 들어 있어요.',
      promptZh: '房东说只包含水费和清洁费，你想确认电费另算，最自然的一句？', promptZhEn: 'The landlord says it only includes water and cleaning fees. What\'s the most natural way to confirm electricity is separate?',
      choices: [
        { text: '전기세는 따로예요?', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
        { text: '수도세가 뭐예요?', correct: false },
      ],
      explain: '追问"另一项是否另算" → 「N은/는 따로예요?」句式。전기세 末字"세"无받침 → 는（有받침才用 은）',
    },
    {
      id: 'd20-l2-r3',
      audioKo: '토리 학생이죠?',
      promptZh: '房东确认你身份，最有礼貌的一句？', promptZhEn: 'What\'s the most polite way for the landlord to confirm your identity?',
      choices: [
        { text: '네, 안녕하세요. 잘 부탁드려요.', correct: true },
        { text: '아니요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '집이 어디예요?', correct: false },
      ],
      explain: '第一次见房东 → 承认身份 + 打招呼 + 「잘 부탁드려요」（请多关照）', explainEn: 'First meeting with the landlord → acknowledge identity + greet + \'잘 부탁드려요\' (please take care of me).',
    },
  ],
};
