import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 15 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 泡面墙场景 8 个新词：
 * - core: 정신 / 안정 / 상자 / 다음 주 / 그만 / 결심
 * - ext:  가르치다 / 조금씩
 *
 * 教学重点：
 *   그만 = 到此为止，配 을래요 表决心（Day 15 主语法）
 *   가르치다 = 教，跟 배우다 一对
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day15Vocab: VocabSubQuestData = {
  day: 15,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '泡面墙前学会的 8 个词', subtitleEn: '8 words learned in front of the ramen wall',

  encounter: [
    {
      id: 'd15-v1-e1',
      korean: '정신',
      hangul: 'jeong-sin',
      zh: '精神', zhEn: 'spirit',
      pos: '名词', posEn: 'Noun',
      example: { ko: '정신 안정 물자.', zh: '精神稳定物资。', zhEn: 'Spirit-stabilizing supplies.' },
      tip: '汉字词「精神」。搭配 「정신 나가다」= 疯了/失神。今天兔莉把泡面叫作"精神稳定物资"', tipEn: 'Sino-Korean word \'精神\'. Used with \'정신 나가다\' = to go crazy/lose your mind. Today Tori called ramen \'spirit-stabilizing supplies.\'',
      tier: 'core',
    },
    {
      id: 'd15-v1-e2',
      korean: '안정',
      hangul: 'an-jeong',
      zh: '稳定 / 安定', zhEn: 'stable / calm',
      pos: '名词', posEn: 'Noun',
      example: { ko: '마음 안정이 필요해요.', zh: '需要心灵稳定。', zhEn: 'Need to calm the mind.' },
      tip: '汉字词「安定」。跟 「불안」(不安) 相对。「안정되다」= 变稳定', tipEn: 'Sino-Korean word \'安定\'. Opposite of \'불안\' (不安). \'안정되다\' = to become stable.',
      tier: 'core',
    },
    {
      id: 'd15-v1-e3',
      korean: '상자',
      hangul: 'sang-ja',
      zh: '箱子 / 盒子', zhEn: 'box / container',
      pos: '名词', posEn: 'Noun',
      example: { ko: '라면 상자가 열네 개 있어요.', zh: '有十四个泡面盒子。', zhEn: 'There are fourteen ramen boxes.' },
      tip: '汉字词「箱子」。搭配量词 「개」(个)。「상자에 담다」= 装到盒里', tipEn: 'Sino-Korean word \'箱子\'. Used with counter \'개\' (个). \'상자에 담다\' = to put into a box.',
      tier: 'core',
    },
    {
      id: 'd15-v1-e4',
      korean: '다음 주',
      hangul: 'da-eum ju',
      zh: '下周', zhEn: 'next week',
      pos: '名词', posEn: 'Noun',
      example: { ko: '다음 주부터 요리 수업이에요.', zh: '从下周开始上做菜课。', zhEn: 'Cooking class starts next week.' },
      tip: '다음(下一个) + 주(周)。搭配 「부터」(从~开始) → 다음 주부터。「지난 주」= 上周', tipEn: '다음 (next) + 주 (week). With \'부터\' (from) → 다음 주부터. \'지난 주\' = last week.',
      tier: 'core',
    },
    {
      id: 'd15-v1-e5',
      korean: '그만',
      hangul: 'geu-man',
      zh: '到此为止 / 不再', zhEn: 'That\'s it / no more',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '라면 그만 먹을래요.', zh: '不再吃泡面了。', zhEn: 'I\'m not eating ramen anymore.' },
      tip: 'Day 15 主语法搭配词。「그만 + V을래요」= 不再做~了（决心）。「그만해」= 别说了（반말）', tipEn: 'Day 15 main grammar collocation. \'그만 + V을래요\' = I\'ll stop doing ~ (determination). \'그만해\' = stop it (반말).',
      tier: 'core',
    },
    {
      id: 'd15-v1-e6',
      korean: '결심',
      hangul: 'gyeol-sim',
      zh: '决心', zhEn: 'determination',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오늘 큰 결심을 했어요.', zh: '今天下了很大决心。', zhEn: 'Made a big decision today.' },
      tip: '汉字词「決心」。搭配 「결심하다」= 下决心。今天的关键词——从泡面墙前抬起头', tipEn: 'Sino-Korean word \'決心\'. Used with \'결심하다\' = to make up one\'s mind. Today\'s keyword—lifting your head from the ramen wall.',
      tier: 'core',
    },
    {
      id: 'd15-v1-e7',
      korean: '가르치다',
      hangul: 'ga-reu-chi-da',
      zh: '教', zhEn: 'teach',
      pos: '动词', posEn: 'Verb',
      example: { ko: '요리 가르쳐 줘.', zh: '教我做菜吧。（반말）', zhEn: 'Teach me to cook. (반말)' },
      tip: '固有词。跟 「배우다」(学) 一对。「~에게 가르치다」= 教某人。「가르쳐 주다」= 教（给我）', tipEn: 'Native Korean word. Pairs with \'배우다\' (to learn). \'~에게 가르치다\' = to teach someone. \'가르쳐 주다\' = to teach (for me).',
      tier: 'ext',
    },
    {
      id: 'd15-v1-e8',
      korean: '조금씩',
      hangul: 'jo-geum-ssik',
      zh: '一点点地', zhEn: 'little by little',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '조금씩 배울 거예요.', zh: '要一点一点学。', zhEn: 'Need to learn little by little.' },
      tip: '조금(一点) + 씩(每·分配)。「조금씩」= 一点一点地。下决心时的自然搭配', tipEn: '조금 (a bit) + 씩 (each/distribution). \'조금씩\' = little by little. Natural collocation when making a decision.',
      tier: 'ext',
    },
  ],

  write: [
    { id: 'd15-v1-w1', korean: '정',  hangul: 'jeong',   wordKorean: '정신',       wordZh: '精神', wordZhEn: 'spirit' },
    { id: 'd15-v1-w2', korean: '안',  hangul: 'an',      wordKorean: '안정',       wordZh: '稳定', wordZhEn: 'stable' },
    { id: 'd15-v1-w3', korean: '상',  hangul: 'sang',    wordKorean: '상자',       wordZh: '箱子', wordZhEn: 'box' },
    { id: 'd15-v1-w4', korean: '주',  hangul: 'ju',      wordKorean: '다음 주',    wordZh: '下周', wordZhEn: 'next week' },
    { id: 'd15-v1-w5', korean: '그',  hangul: 'geu',     wordKorean: '그만',       wordZh: '到此为止', wordZhEn: 'that\'s it for now' },
    { id: 'd15-v1-w6', korean: '결',  hangul: 'gyeol',   wordKorean: '결심',       wordZh: '决心', wordZhEn: 'determination' },
    { id: 'd15-v1-w7', korean: '가',  hangul: 'ga',      wordKorean: '가르치다',   wordZh: '教', wordZhEn: 'teach' },
    { id: 'd15-v1-w8', korean: '씩',  hangul: 'ssik',    wordKorean: '조금씩',     wordZh: '一点点', wordZhEn: 'a little bit' },
  ],

  recognize: [
    {
      id: 'd15-v1-r1',
      korean: '정신',
      hangul: 'jeong-sin',
      choices: [
        { zh: '精神', zhEn: 'spirit', correct: true },
        { zh: '身体', zhEn: 'body', correct: false },
        { zh: '心情', zhEn: 'mood', correct: false },
        { zh: '感情', zhEn: 'feelings', correct: false },
      ],
    },
    {
      id: 'd15-v1-r2',
      korean: '안정',
      hangul: 'an-jeong',
      choices: [
        { zh: '稳定 / 安定', zhEn: 'stable / calm', correct: true },
        { zh: '紧张', zhEn: 'nervous', correct: false },
        { zh: '快乐', zhEn: 'happiness', correct: false },
        { zh: '担心', zhEn: 'worry', correct: false },
      ],
    },
    {
      id: 'd15-v1-r3',
      korean: '상자',
      hangul: 'sang-ja',
      choices: [
        { zh: '箱子 / 盒子', zhEn: 'box / container', correct: true },
        { zh: '袋子', zhEn: 'bag', correct: false },
        { zh: '包装', zhEn: 'packaging', correct: false },
        { zh: '瓶子', zhEn: 'bottle', correct: false },
      ],
    },
    {
      id: 'd15-v1-r4',
      korean: '다음 주',
      hangul: 'da-eum ju',
      choices: [
        { zh: '下周', zhEn: 'next week', correct: true },
        { zh: '本周', zhEn: 'this week', correct: false },
        { zh: '上周', zhEn: 'last week', correct: false },
        { zh: '下个月', zhEn: 'next month', correct: false },
      ],
    },
    {
      id: 'd15-v1-r5',
      korean: '그만',
      hangul: 'geu-man',
      choices: [
        { zh: '到此为止 / 不再', zhEn: 'That\'s it / no more', correct: true },
        { zh: '继续', zhEn: 'Continue', correct: false },
        { zh: '开始', zhEn: 'start', correct: false },
        { zh: '一起', zhEn: 'together', correct: false },
      ],
    },
    {
      id: 'd15-v1-r6',
      korean: '결심',
      hangul: 'gyeol-sim',
      choices: [
        { zh: '决心', zhEn: 'determination', correct: true },
        { zh: '决定', zhEn: 'Decision', correct: false },
        { zh: '结果', zhEn: 'result', correct: false },
        { zh: '开始', zhEn: 'start', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd15-v1-s1',
      zhHint: '泡面', zhHintEn: 'Ramen',
      answer: ['라', '면'],
      // 干扰：나（초성 ㄹ→ㄴ 混）；맨（받침 ㄴ 相同、元音差别）
      syllables: ['라', '면', '나', '맨'],
    },
    {
      id: 'd15-v1-s2',
      zhHint: '墙', zhHintEn: 'Wall',
      answer: ['벽'],
      // 干扰："박"（元音 ㅕ→ㅏ 混）；"별"（받침 ㄱ→ㄹ 混）；"빅"（초성 ㅂ 相同、元음差别）
      syllables: ['벽', '박', '별', '빅'],
    },
    {
      id: 'd15-v1-s3',
      zhHint: '料理', zhHintEn: 'cooking',
      answer: ['요', '리'],
      // 干扰："유"（元음 ㅛ→ㅠ 混）；"니"（초성 ㄹ→ㄴ 混）
      syllables: ['요', '리', '유', '니'],
    },
    {
      id: 'd15-v1-s4',
      zhHint: '健康', zhHintEn: 'health',
      answer: ['건', '강'],
      // 干扰："권"（元음 ㅓ→ㅝ 混）；"광"（초성 ㄱ 相同、元음差别）
      syllables: ['건', '강', '권', '광'],
    },
  ],

  dictation: [
    { id: 'd15-v1-d1', korean: '라면',    hangul: 'ra-myeon',    syllables: ['라', '면'],       zh: '泡面', zhEn: 'Ramen' },
    { id: 'd15-v1-d2', korean: '요리',    hangul: 'yo-ri',       syllables: ['요', '리'],       zh: '料理', zhEn: 'cooking' },
    { id: 'd15-v1-d3', korean: '배우고 싶어요', hangul: 'bae-u-go si-peo-yo', syllables: ['배', '우', '고', '싶', '어', '요'], zh: '想学', zhEn: 'want to learn' },
  ],
};
