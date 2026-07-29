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
  subtitle: '写第一篇韩语日记要用的 8 个词',

  encounter: [
    {
      id: 'd29-v1-e1',
      korean: '어제',
      hangul: 'eo-je',
      zh: '昨天',
      pos: '名词/副词',
      example: { ko: '어제 친구를 만났어요.', zh: '昨天见朋友了。' },
      tip: '过去时最搭档的时间词。反义 오늘（今天）/ 내일（明天）',
      tier: 'core',
    },
    {
      id: 'd29-v1-e2',
      korean: '지금',
      hangul: 'ji-geum',
      zh: '现在',
      pos: '名词/副词',
      example: { ko: '지금은 서울에 살아요.', zh: '现在住在首尔。' },
      tip: '过去 vs 现在对比时最常用。日记体"以前~/现在~"的对比',
      tier: 'core',
    },
    {
      id: 'd29-v1-e3',
      korean: '일기',
      hangul: 'il-gi',
      zh: '日记',
      pos: '名词',
      example: { ko: '한국어로 일기를 써요.', zh: '用韩语写日记。' },
      tip: '汉字词「日记」。搭配「일기를 쓰다」= 写日记 / 「일기장」= 日记本',
      tier: 'core',
    },
    {
      id: 'd29-v1-e4',
      korean: '쓰다',
      hangul: 'sseu-da',
      zh: '写 / 用 / 苦',
      pos: '动词',
      example: { ko: '일기를 썼어요.', zh: '写了日记。' },
      tip: '해요体：써요（ㅡ 脱落 + 어요）。过去：썼어요。三重多义 · 写/用/苦',
      tier: 'core',
    },
    {
      id: 'd29-v1-e5',
      korean: '봤어요',
      hangul: 'bwa-sseo-yo',
      zh: '看了',
      pos: '动词',
      example: { ko: '영화를 봤어요.', zh: '看了电影。' },
      tip: '보다 → 봤어요（ㅗ+ㅏ=ㅘ + ㅆ어요）· 缩合形式',
      tier: 'core',
    },
    {
      id: 'd29-v1-e6',
      korean: '성장하다',
      hangul: 'seong-jang-ha-da',
      zh: '成长',
      pos: '动词',
      example: { ko: '한 달 동안 많이 성장했어요.', zh: '一个月里成长了很多。' },
      tip: '汉字词「成长」+ 하다。日记体常用。过去：성장했어요',
      tier: 'core',
    },
    {
      id: 'd29-v1-e7',
      korean: '자랑스럽다',
      hangul: 'ja-rang-seu-reop-da',
      zh: '骄傲 / 感到自豪',
      pos: '形容词',
      example: { ko: '내 자신이 자랑스러워요.', zh: '为自己感到骄傲。' },
      tip: 'ㅂ 不规则 → 자랑스러워요 / 过去 자랑스러웠어요。日记体的收尾句',
      tier: 'ext',
    },
    {
      id: 'd29-v1-e8',
      korean: '만났어요',
      hangul: 'man-na-sseo-yo',
      zh: '见了 / 遇到了',
      pos: '动词',
      example: { ko: '어제 친구를 만났어요.', zh: '昨天见了朋友。' },
      tip: '만나다 → 만났어요（만나+았어요 缩合 ㅏ+ㅏ=ㅏㅆ）',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd29-v1-r1',
      korean: '어제',
      hangul: 'eo-je',
      choices: [
        { zh: '昨天', correct: true },
        { zh: '今天', correct: false },
        { zh: '明天', correct: false },
        { zh: '前天', correct: false },
      ],
    },
    {
      id: 'd29-v1-r2',
      korean: '지금',
      hangul: 'ji-geum',
      choices: [
        { zh: '现在', correct: true },
        { zh: '以前', correct: false },
        { zh: '以后', correct: false },
        { zh: '当时', correct: false },
      ],
    },
    {
      id: 'd29-v1-r3',
      korean: '일기',
      hangul: 'il-gi',
      choices: [
        { zh: '日记', correct: true },
        { zh: '天气', correct: false },
        { zh: '日程', correct: false },
        { zh: '记忆', correct: false },
      ],
    },
    {
      id: 'd29-v1-r4',
      korean: '쓰다',
      hangul: 'sseu-da',
      choices: [
        { zh: '写 / 用 / 苦', correct: true },
        { zh: '读', correct: false },
        { zh: '听', correct: false },
        { zh: '甜', correct: false },
      ],
    },
    {
      id: 'd29-v1-r5',
      korean: '봤어요',
      hangul: 'bwa-sseo-yo',
      choices: [
        { zh: '看了', correct: true },
        { zh: '看着', correct: false },
        { zh: '想看', correct: false },
        { zh: '不看', correct: false },
      ],
    },
    {
      id: 'd29-v1-r6',
      korean: '성장하다',
      hangul: 'seong-jang-ha-da',
      choices: [
        { zh: '成长', correct: true },
        { zh: '衰老', correct: false },
        { zh: '成绩', correct: false },
        { zh: '成立', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd29-v1-s1',
      zhHint: '去了',
      answer: ['갔', '어', '요'],
      // 干扰："가"（现在时词干）；"았"（错误未缩合）
      syllables: ['갔', '어', '요', '가', '았'],
    },
    {
      id: 'd29-v1-s2',
      zhHint: '吃了',
      answer: ['먹', '었', '어', '요'],
      // 干扰："었"（重复）；"았"（错误规则）；"먹"（现在时）
      syllables: ['먹', '었', '어', '요', '았'],
    },
    {
      id: 'd29-v1-s3',
      zhHint: '下雨了',
      answer: ['비', '가', '왔', '어', '요'],
      // 干扰："오았"（未缩合）；"비"（同）
      syllables: ['비', '가', '왔', '어', '요', '오'],
    },
    {
      id: 'd29-v1-s4',
      zhHint: '做了 / 学习了',
      answer: ['했', '어', '요'],
      // 干扰："하아"（错误规则）；"하였"（书面语）
      syllables: ['했', '어', '요', '하아', '하였'],
    },
  ],

  write: [
    { id: 'd29-v1-w1', korean: '갔', hangul: 'gat',       wordKorean: '갔어요',      wordZh: '去了' },
    { id: 'd29-v1-w2', korean: '먹', hangul: 'meok',      wordKorean: '먹었어요',    wordZh: '吃了' },
    { id: 'd29-v1-w3', korean: '했', hangul: 'haet',      wordKorean: '했어요',      wordZh: '做了' },
    { id: 'd29-v1-w4', korean: '왔', hangul: 'wat',       wordKorean: '왔어요',      wordZh: '来了' },
    { id: 'd29-v1-w5', korean: '어', hangul: 'eo',        wordKorean: '어제',        wordZh: '昨天' },
    { id: 'd29-v1-w6', korean: '지', hangul: 'ji',        wordKorean: '지금',        wordZh: '现在' },
    { id: 'd29-v1-w7', korean: '일', hangul: 'il',        wordKorean: '일기',        wordZh: '日记' },
    { id: 'd29-v1-w8', korean: '썼', hangul: 'sseot',     wordKorean: '썼어요',      wordZh: '写了' },
  ],

  dictation: [
    { id: 'd29-v1-d1', korean: '갔어요',        hangul: 'ga-sseo-yo',           syllables: ['갔', '어', '요'],           zh: '去了' },
    { id: 'd29-v1-d2', korean: '먹었어요',      hangul: 'meo-geo-sseo-yo',      syllables: ['먹', '었', '어', '요'],     zh: '吃了' },
    { id: 'd29-v1-d3', korean: '용기를 냈어요', hangul: 'yong-gi-reul nae-sseo-yo', syllables: ['용', '기', '를', '냈', '어', '요'], zh: '鼓起了勇气' },
  ],
};
