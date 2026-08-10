import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 29 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词是"过去时变位对"，本关补充 8 个真正日记用词。
 * - core: 어제 / 지금 / 일기 / 쓰다 / 봤어요 / 성장하다（进认词考察）
 * - ext:  자랑스럽다 / 만났어요（进拼写 / 听辨）
 *
 * 场景延展：从"日记本"到"写字"到"回顾成长"。
 */
export const day29Vocab: VocabSubQuestData = {
  day: 29,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '写第一篇韩语日记要用的 8 个词', subtitleEn: '8 words you need for your first Korean diary entry',

  encounter: [
    {
      id: 'd29-v1-e1',
      korean: '어제',
      hangul: 'eo-je',
      zh: '昨天', zhEn: 'yesterday',
      pos: '名词/副词', posEn: 'Noun/adverb',
      example: { ko: '어제 친구를 만났어요.', zh: '昨天见朋友了。', zhEn: 'I met a friend yesterday.' },
      tip: '过去时最搭档的时间词。反义 오늘（今天）/ 내일（明天）', tipEn: 'The best time word to pair with past tense. Opposites: 오늘 (today) / 내일 (tomorrow)',
      tier: 'core',
    },
    {
      id: 'd29-v1-e2',
      korean: '지금',
      hangul: 'ji-geum',
      zh: '现在', zhEn: 'Now',
      pos: '名词/副词', posEn: 'Noun/adverb',
      example: { ko: '지금은 서울에 살아요.', zh: '现在住在首尔。', zhEn: 'I live in Seoul now.' },
      tip: '过去 vs 现在对比时最常用。日记体"以前~/现在~"的对比', tipEn: 'Most used when contrasting past vs. present. Diary style: "before~/now~" comparison',
      tier: 'core',
    },
    {
      id: 'd29-v1-e3',
      korean: '일기',
      hangul: 'il-gi',
      zh: '日记', zhEn: 'Diary',
      pos: '名词', posEn: 'Noun',
      example: { ko: '한국어로 일기를 써요.', zh: '用韩语写日记。', zhEn: 'Write a diary in Korean.' },
      tip: '汉字词「日记」。搭配「일기를 쓰다」= 写日记 / 「일기장」= 日记本', tipEn: 'Sino-Korean word for "diary." Pairs with 「일기를 쓰다」= write a diary / 「일기장」= diary notebook',
      tier: 'core',
    },
    {
      id: 'd29-v1-e4',
      korean: '쓰다',
      hangul: 'sseu-da',
      zh: '写 / 用 / 苦', zhEn: 'write / use / bitter',
      pos: '动词', posEn: 'Verb',
      example: { ko: '일기를 썼어요.', zh: '写了日记。', zhEn: 'I wrote a diary.' },
      tip: '해요体：써요（ㅡ 脱落 + 어요）。过去：썼어요。三重多义 · 写/用/苦', tipEn: '해요 form: 써요 (ㅡ drop + 어요). Past: 썼어요. Triple meaning · write/use/bitter',
      tier: 'core',
    },
    {
      id: 'd29-v1-e5',
      korean: '봤어요',
      hangul: 'bwa-sseo-yo',
      zh: '看了', zhEn: 'watched',
      pos: '动词', posEn: 'Verb',
      example: { ko: '영화를 봤어요.', zh: '看了电影。', zhEn: 'I watched a movie.' },
      tip: '보다 → 봤어요（ㅗ+ㅏ=ㅘ + ㅆ어요）· 缩合形式', tipEn: '보다 → 봤어요 (ㅗ+ㅏ=ㅘ + ㅆ어요) · contracted form',
      tier: 'core',
    },
    {
      id: 'd29-v1-e6',
      korean: '성장하다',
      hangul: 'seong-jang-ha-da',
      zh: '成长', zhEn: 'growth',
      pos: '动词', posEn: 'Verb',
      example: { ko: '한 달 동안 많이 성장했어요.', zh: '一个月里成长了很多。', zhEn: 'I\'ve grown a lot in a month.' },
      tip: '汉字词「成长」+ 하다。日记体常用。过去：성장했어요', tipEn: 'Sino-Korean \'成长\' + 하다. Common in diary style. Past: 성장했어요',
      tier: 'core',
    },
    {
      id: 'd29-v1-e7',
      korean: '자랑스럽다',
      hangul: 'ja-rang-seu-reop-da',
      zh: '骄傲 / 感到自豪', zhEn: 'proud / feel proud',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '내 자신이 자랑스러워요.', zh: '为自己感到骄傲。', zhEn: 'I\'m proud of myself.' },
      tip: 'ㅂ 不规则 → 자랑스러워요 / 过去 자랑스러웠어요。日记体的收尾句', tipEn: 'ㅂ irregular → 자랑스러워요 / past 자랑스러웠어요. A closing line for diary entries.',
      tier: 'ext',
    },
    {
      id: 'd29-v1-e8',
      korean: '만났어요',
      hangul: 'man-na-sseo-yo',
      zh: '见了 / 遇到了', zhEn: 'met / encountered',
      pos: '动词', posEn: 'Verb',
      example: { ko: '어제 친구를 만났어요.', zh: '昨天见了朋友。', zhEn: 'I met a friend yesterday.' },
      tip: '만나다 → 만났어요（만나+았어요 缩合 ㅏ+ㅏ=ㅏㅆ）', tipEn: '만나다 → 만났어요 (만나+았어요 contraction ㅏ+ㅏ=ㅏㅆ)',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd29-v1-r1',
      korean: '어제',
      hangul: 'eo-je',
      choices: [
        { zh: '昨天', zhEn: 'yesterday', correct: true },
        { zh: '今天', zhEn: 'today', correct: false },
        { zh: '明天', zhEn: 'Tomorrow', correct: false },
        { zh: '前天', zhEn: 'the day before yesterday', correct: false },
      ],
    },
    {
      id: 'd29-v1-r2',
      korean: '지금',
      hangul: 'ji-geum',
      choices: [
        { zh: '现在', zhEn: 'Now', correct: true },
        { zh: '以前', zhEn: 'before', correct: false },
        { zh: '以后', zhEn: 'after', correct: false },
        { zh: '当时', zhEn: 'at that time', correct: false },
      ],
    },
    {
      id: 'd29-v1-r3',
      korean: '일기',
      hangul: 'il-gi',
      choices: [
        { zh: '日记', zhEn: 'Diary', correct: true },
        { zh: '天气', zhEn: 'weather', correct: false },
        { zh: '日程', zhEn: 'schedule', correct: false },
        { zh: '记忆', zhEn: 'memory', correct: false },
      ],
    },
    {
      id: 'd29-v1-r4',
      korean: '쓰다',
      hangul: 'sseu-da',
      choices: [
        { zh: '写 / 用 / 苦', zhEn: 'write / use / bitter', correct: true },
        { zh: '读', zhEn: 'Read', correct: false },
        { zh: '听', zhEn: 'Listen', correct: false },
        { zh: '甜', zhEn: 'sweet', correct: false },
      ],
    },
    {
      id: 'd29-v1-r5',
      korean: '봤어요',
      hangul: 'bwa-sseo-yo',
      choices: [
        { zh: '看了', zhEn: 'watched', correct: true },
        { zh: '看着', zhEn: 'watching', correct: false },
        { zh: '想看', zhEn: 'want to see', correct: false },
        { zh: '不看', zhEn: 'not watching', correct: false },
      ],
    },
    {
      id: 'd29-v1-r6',
      korean: '성장하다',
      hangul: 'seong-jang-ha-da',
      choices: [
        { zh: '成长', zhEn: 'growth', correct: true },
        { zh: '衰老', zhEn: 'aging', correct: false },
        { zh: '成绩', zhEn: 'grades', correct: false },
        { zh: '成立', zhEn: 'establishment', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd29-v1-s1',
      zhHint: '去了', zhHintEn: 'went',
      answer: ['갔', '어', '요'],
      // 干扰："가"（现在时词干）；"았"（错误未缩合）
      syllables: ['갔', '어', '요', '가', '았'],
    },
    {
      id: 'd29-v1-s2',
      zhHint: '吃了', zhHintEn: 'ate',
      answer: ['먹', '었', '어', '요'],
      // 干扰："었"（重复）；"았"（错误规则）；"먹"（现在时）
      syllables: ['먹', '었', '어', '요', '았'],
    },
    {
      id: 'd29-v1-s3',
      zhHint: '下雨了', zhHintEn: 'It rained.',
      answer: ['비', '가', '왔', '어', '요'],
      // 干扰："오았"（未缩合）；"비"（同）
      syllables: ['비', '가', '왔', '어', '요', '오'],
    },
    {
      id: 'd29-v1-s4',
      zhHint: '做了 / 学习了', zhHintEn: 'did / studied',
      answer: ['했', '어', '요'],
      // 干扰："하아"（错误规则）；"하였"（书面语）
      syllables: ['했', '어', '요', '하아', '하였'],
    },
  ],

  write: [
    { id: 'd29-v1-w1', korean: '갔', hangul: 'gat',       wordKorean: '갔어요',      wordZh: '去了', wordZhEn: 'went' },
    { id: 'd29-v1-w2', korean: '먹', hangul: 'meok',      wordKorean: '먹었어요',    wordZh: '吃了', wordZhEn: 'ate' },
    { id: 'd29-v1-w3', korean: '했', hangul: 'haet',      wordKorean: '했어요',      wordZh: '做了', wordZhEn: 'did' },
    { id: 'd29-v1-w4', korean: '왔', hangul: 'wat',       wordKorean: '왔어요',      wordZh: '来了', wordZhEn: 'came' },
    { id: 'd29-v1-w5', korean: '어', hangul: 'eo',        wordKorean: '어제',        wordZh: '昨天', wordZhEn: 'yesterday' },
    { id: 'd29-v1-w6', korean: '지', hangul: 'ji',        wordKorean: '지금',        wordZh: '现在', wordZhEn: 'Now' },
    { id: 'd29-v1-w7', korean: '일', hangul: 'il',        wordKorean: '일기',        wordZh: '日记', wordZhEn: 'Diary' },
    { id: 'd29-v1-w8', korean: '썼', hangul: 'sseot',     wordKorean: '썼어요',      wordZh: '写了', wordZhEn: 'wrote' },
  ],

  dictation: [
    { id: 'd29-v1-d1', korean: '갔어요',        hangul: 'ga-sseo-yo',           syllables: ['갔', '어', '요'],           zh: '去了', zhEn: 'went' },
    { id: 'd29-v1-d2', korean: '먹었어요',      hangul: 'meo-geo-sseo-yo',      syllables: ['먹', '었', '어', '요'],     zh: '吃了', zhEn: 'ate' },
    { id: 'd29-v1-d3', korean: '용기를 냈어요', hangul: 'yong-gi-reul nae-sseo-yo', syllables: ['용', '기', '를', '냈', '어', '요'], zh: '鼓起了勇气', zhEn: 'gathered courage' },
  ],
};
