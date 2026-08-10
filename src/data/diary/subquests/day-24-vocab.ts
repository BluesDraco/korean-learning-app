import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 24 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词（같이/갈래?/콜/새로 생긴/만나요/당연하지）之外的 8 个新词。
 * - core: 끝나고 / 몇 시 / 정문 / 갈게 / 알았어 / 꼭（进认词考察）
 * - ext:  데 / 좋아（进拼写 / 听辨）
 *
 * 场景延展：群聊约定五要素——时间/地点/方式/意愿/确认。
 */
export const day24Vocab: VocabSubQuestData = {
  day: 24,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '群聊里约定必用的 8 个词', subtitleEn: '8 essential words for making plans in a group chat.',

  encounter: [
    {
      id: 'd24-v1-e1',
      korean: '끝나고',
      hangul: 'kkeun-na-go',
      zh: '结束之后', zhEn: 'After it ends',
      pos: '表达', posEn: 'Expression',
      example: { ko: '수업 끝나고 만나요.', zh: '下课后见。', zhEn: 'See you after class.' },
      tip: '끝나다(结束) + 고(然后) = 结束后。约定时间"~完之后"用它', tipEn: '끝나다 (to end) + 고 (and then) = after it ends. Use it for \'after ~\' when setting a time.',
      tier: 'core',
    },
    {
      id: 'd24-v1-e2',
      korean: '몇 시',
      hangul: 'myeot si',
      zh: '几点', zhEn: 'What time',
      pos: '疑问词', posEn: 'interrogative',
      example: { ko: '몇 시에 만나요?', zh: '几点见？', zhEn: 'What time shall we meet?' },
      tip: '몇(几) + 시(点)。约定必问。回答用固有数 + 시：다섯 시(5点)', tipEn: '몇 (how many) + 시 (o\'clock). Essential for making plans. Answer with native numbers + 시: 다섯 시 (5 o\'clock).',
      tier: 'core',
    },
    {
      id: 'd24-v1-e3',
      korean: '정문',
      hangul: 'jeong-mun',
      zh: '正门', zhEn: 'main gate',
      pos: '名词', posEn: 'Noun',
      example: { ko: '학교 정문에서 봐.', zh: '学校正门见。', zhEn: 'Let\'s meet at the school\'s main gate.' },
      tip: '汉字词「正门」。학교/회사/공원 都有 정문。对应 「후문」= 后门', tipEn: 'Sino-Korean word for \'main gate.\' Schools, companies, and parks all have a 정문. The counterpart is \'후문\' = back gate.',
      tier: 'core',
    },
    {
      id: 'd24-v1-e4',
      korean: '갈게',
      hangul: 'gal-ge',
      zh: '我会去（意愿承诺）', zhEn: 'I\'ll go (intention/promise)',
      pos: '表达', posEn: 'Expression',
      example: { ko: '진짜 갈게.', zh: '真的去。', zhEn: 'I\'ll really go.' },
      tip: '가다 + ㄹ게(承诺语尾)。반말 = 갈게；해요体 = 갈게요。表达"我承诺会做"', tipEn: '가다 + ㄹ게 (promise ending). Casual = 갈게; polite = 갈게요. Expresses \'I promise to do it.\'',
      tier: 'core',
    },
    {
      id: 'd24-v1-e5',
      korean: '알았어',
      hangul: 'a-ra-sseo',
      zh: '知道了 / 好', zhEn: 'Got it / Okay',
      pos: '表达', posEn: 'Expression',
      example: { ko: '알았어. 내일 봐.', zh: '好，明天见。', zhEn: 'Okay, see you tomorrow.' },
      tip: '알다(知道) + 았어(과거·반말) = 알았어。합쇼체 = 알겠습니다', tipEn: '알다 (to know) + 았어 (past, casual) = 알았어. Formal = 알겠습니다.',
      tier: 'core',
    },
    {
      id: 'd24-v1-e6',
      korean: '꼭',
      hangul: 'kkok',
      zh: '一定 / 务必', zhEn: 'definitely / for sure',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '꼭 갈게!', zh: '一定去！', zhEn: 'I\'ll definitely go!' },
      tip: '强调决心。搭配 갈게 / 올게 / 할게 加重语气。母语者聊天很爱用', tipEn: 'Emphasizes determination. Pairs with 갈게 / 올게 / 할게 to add weight. Native speakers love using it in chats.',
      tier: 'core',
    },
    {
      id: 'd24-v1-e7',
      korean: '데',
      hangul: 'de',
      zh: '地方 / 处', zhEn: 'place / spot',
      pos: '依存名词', posEn: 'dependent noun',
      example: { ko: '새로 생긴 데 있어.', zh: '有一家新开的地方。', zhEn: 'There\'s a newly opened place.' },
      tip: '不能单独用。修饰语 + 데 = "~的地方"。곳(地方) 的口语版', tipEn: 'Can\'t be used alone. Modifier + 데 = \'the place where ~.\' Casual version of 곳 (place).',
      tier: 'ext',
    },
    {
      id: 'd24-v1-e8',
      korean: '좋아',
      hangul: 'jo-a',
      zh: '好啊', zhEn: 'Sounds good',
      pos: '表达', posEn: 'Expression',
      example: { ko: '좋아! 같이 가자!', zh: '好啊！一起去吧！', zhEn: 'Sounds good! Let\'s go together!', },
      tip: '좋다(好) → 좋아(반말)。回复邀请的最短快答。해요体 = 좋아요', tipEn: '좋다 (good) → 좋아 (casual). Shortest quick reply to an invitation. Polite = 좋아요.',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd24-v1-r1',
      korean: '끝나고',
      hangul: 'kkeun-na-go',
      choices: [
        { zh: '结束之后', zhEn: 'After it ends', correct: true },
        { zh: '正在结束', zhEn: 'Ending right now', correct: false },
        { zh: '一直到结束', zhEn: 'until the end', correct: false },
        { zh: '结束之前', zhEn: 'Before it ends', correct: false },
      ],
    },
    {
      id: 'd24-v1-r2',
      korean: '몇 시',
      hangul: 'myeot si',
      choices: [
        { zh: '几点', zhEn: 'What time', correct: true },
        { zh: '哪天', zhEn: 'which day', correct: false },
        { zh: '多少钱', zhEn: 'How much?', correct: false },
        { zh: '哪里', zhEn: 'Where', correct: false },
      ],
    },
    {
      id: 'd24-v1-r3',
      korean: '정문',
      hangul: 'jeong-mun',
      choices: [
        { zh: '正门', zhEn: 'main gate', correct: true },
        { zh: '后门', zhEn: 'back gate', correct: false },
        { zh: '侧门', zhEn: 'side gate', correct: false },
        { zh: '院子', zhEn: 'yard', correct: false },
      ],
    },
    {
      id: 'd24-v1-r4',
      korean: '갈게',
      hangul: 'gal-ge',
      choices: [
        { zh: '我会去（承诺）', zhEn: 'I\'ll go (promise)', correct: true },
        { zh: '你去（命令）', zhEn: 'You go (command)', correct: false },
        { zh: '在去（进行）', zhEn: 'going (in progress)', correct: false },
        { zh: '不去', zhEn: 'not going', correct: false },
      ],
    },
    {
      id: 'd24-v1-r5',
      korean: '알았어',
      hangul: 'a-ra-sseo',
      choices: [
        { zh: '知道了', zhEn: 'got it', correct: true },
        { zh: '不知道', zhEn: 'I don\'t know', correct: false },
        { zh: '认识', zhEn: 'know', correct: false },
        { zh: '忘记了', zhEn: 'forgot', correct: false },
      ],
    },
    {
      id: 'd24-v1-r6',
      korean: '꼭',
      hangul: 'kkok',
      choices: [
        { zh: '一定 / 务必', zhEn: 'definitely / for sure', correct: true },
        { zh: '大概', zhEn: 'probably', correct: false },
        { zh: '可能', zhEn: 'maybe', correct: false },
        { zh: '偶尔', zhEn: 'occasionally', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd24-v1-s1',
      zhHint: '一起', zhHintEn: 'together',
      answer: ['같', '이'],
      // 干扰："감"（초성 ㄱ 相同、收音差别）；"기"（元音差别）
      syllables: ['같', '이', '감', '기'],
    },
    {
      id: 'd24-v1-s2',
      zhHint: 'OK / 成交', zhHintEn: 'OK / deal',
      answer: ['콜'],
      // 干扰："콜"（原）；"쿨"（初声 ㅋ 相同、元音差）；"골"（初声差别）；"몰"（初声差别）
      syllables: ['콜', '쿨', '골', '몰'],
    },
    {
      id: 'd24-v1-s3',
      zhHint: '见面（해요体）', zhHintEn: 'meet (해요 form)',
      answer: ['만', '나', '요'],
      // 干扰："만"（同）；"먹"（意思是"吃"）；"자"（意思是"睡"）
      syllables: ['만', '나', '요', '먹', '자'],
    },
    {
      id: 'd24-v1-s4',
      zhHint: '当然了', zhHintEn: 'of course',
      answer: ['당', '연', '하', '지'],
      // 干扰："단"（초성 ㄷ相同、收音差别）；"근"（意思相关但结构差别）
      syllables: ['당', '연', '하', '지', '단', '근'],
    },
  ],

  write: [
    { id: 'd24-v1-w1', korean: '같', hangul: 'gat',       wordKorean: '같이',        wordZh: '一起', wordZhEn: 'together' },
    { id: 'd24-v1-w2', korean: '갈', hangul: 'gal',       wordKorean: '갈래?',       wordZh: '要去吗', wordZhEn: 'want to go?' },
    { id: 'd24-v1-w3', korean: '콜', hangul: 'kol',       wordKorean: '콜',          wordZh: 'OK' },
    { id: 'd24-v1-w4', korean: '만', hangul: 'man',       wordKorean: '만나요',      wordZh: '见面', wordZhEn: 'to meet' },
    { id: 'd24-v1-w5', korean: '당', hangul: 'dang',      wordKorean: '당연하지',    wordZh: '当然了', wordZhEn: 'of course' },
    { id: 'd24-v1-w6', korean: '끝', hangul: 'kkeut',     wordKorean: '끝나고',      wordZh: '结束后', wordZhEn: 'after it ends' },
    { id: 'd24-v1-w7', korean: '정', hangul: 'jeong',     wordKorean: '정문',        wordZh: '正门', wordZhEn: 'main gate' },
    { id: 'd24-v1-w8', korean: '꼭', hangul: 'kkok',      wordKorean: '꼭',          wordZh: '一定', wordZhEn: 'for sure' },
  ],

  dictation: [
    { id: 'd24-v1-d1', korean: '같이 가요',    hangul: 'ga-chi ga-yo',      syllables: ['같', '이', '가', '요'],           zh: '一起去', zhEn: 'go together' },
    { id: 'd24-v1-d2', korean: '어디서 만나?', hangul: 'eo-di-seo man-na?', syllables: ['어', '디', '서', '만', '나'],     zh: '在哪见', zhEn: 'where to meet?' },
    { id: 'd24-v1-d3', korean: '당연하지',    hangul: 'dang-yeon-ha-ji',   syllables: ['당', '연', '하', '지'],           zh: '当然了', zhEn: 'of course' },
  ],
};
