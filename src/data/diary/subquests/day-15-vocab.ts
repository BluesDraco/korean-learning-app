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
  subtitle: '泡面墙前学会的 8 个词',

  encounter: [
    {
      id: 'd15-v1-e1',
      korean: '정신',
      hangul: 'jeong-sin',
      zh: '精神',
      pos: '名词',
      example: { ko: '정신 안정 물자.', zh: '精神稳定物资。' },
      tip: '汉字词「精神」。搭配 「정신 나가다」= 疯了/失神。今天兔莉把泡面叫作"精神稳定物资"',
      tier: 'core',
    },
    {
      id: 'd15-v1-e2',
      korean: '안정',
      hangul: 'an-jeong',
      zh: '稳定 / 安定',
      pos: '名词',
      example: { ko: '마음 안정이 필요해요.', zh: '需要心灵稳定。' },
      tip: '汉字词「安定」。跟 「불안」(不安) 相对。「안정되다」= 变稳定',
      tier: 'core',
    },
    {
      id: 'd15-v1-e3',
      korean: '상자',
      hangul: 'sang-ja',
      zh: '箱子 / 盒子',
      pos: '名词',
      example: { ko: '라면 상자가 열네 개 있어요.', zh: '有十四个泡面盒子。' },
      tip: '汉字词「箱子」。搭配量词 「개」(个)。「상자에 담다」= 装到盒里',
      tier: 'core',
    },
    {
      id: 'd15-v1-e4',
      korean: '다음 주',
      hangul: 'da-eum ju',
      zh: '下周',
      pos: '名词',
      example: { ko: '다음 주부터 요리 수업이에요.', zh: '从下周开始上做菜课。' },
      tip: '다음(下一个) + 주(周)。搭配 「부터」(从~开始) → 다음 주부터。「지난 주」= 上周',
      tier: 'core',
    },
    {
      id: 'd15-v1-e5',
      korean: '그만',
      hangul: 'geu-man',
      zh: '到此为止 / 不再',
      pos: '副词',
      example: { ko: '라면 그만 먹을래요.', zh: '不再吃泡面了。' },
      tip: 'Day 15 主语法搭配词。「그만 + V을래요」= 不再做~了（决心）。「그만해」= 别说了（반말）',
      tier: 'core',
    },
    {
      id: 'd15-v1-e6',
      korean: '결심',
      hangul: 'gyeol-sim',
      zh: '决心',
      pos: '名词',
      example: { ko: '오늘 큰 결심을 했어요.', zh: '今天下了很大决心。' },
      tip: '汉字词「決心」。搭配 「결심하다」= 下决心。今天的关键词——从泡面墙前抬起头',
      tier: 'core',
    },
    {
      id: 'd15-v1-e7',
      korean: '가르치다',
      hangul: 'ga-reu-chi-da',
      zh: '教',
      pos: '动词',
      example: { ko: '요리 가르쳐 줘.', zh: '教我做菜吧。（반말）' },
      tip: '固有词。跟 「배우다」(学) 一对。「~에게 가르치다」= 教某人。「가르쳐 주다」= 教（给我）',
      tier: 'ext',
    },
    {
      id: 'd15-v1-e8',
      korean: '조금씩',
      hangul: 'jo-geum-ssik',
      zh: '一点点地',
      pos: '副词',
      example: { ko: '조금씩 배울 거예요.', zh: '要一点一点学。' },
      tip: '조금(一点) + 씩(每·分配)。「조금씩」= 一点一点地。下决心时的自然搭配',
      tier: 'ext',
    },
  ],

  write: [
    { id: 'd15-v1-w1', korean: '정',  hangul: 'jeong',   wordKorean: '정신',       wordZh: '精神' },
    { id: 'd15-v1-w2', korean: '안',  hangul: 'an',      wordKorean: '안정',       wordZh: '稳定' },
    { id: 'd15-v1-w3', korean: '상',  hangul: 'sang',    wordKorean: '상자',       wordZh: '箱子' },
    { id: 'd15-v1-w4', korean: '주',  hangul: 'ju',      wordKorean: '다음 주',    wordZh: '下周' },
    { id: 'd15-v1-w5', korean: '그',  hangul: 'geu',     wordKorean: '그만',       wordZh: '到此为止' },
    { id: 'd15-v1-w6', korean: '결',  hangul: 'gyeol',   wordKorean: '결심',       wordZh: '决心' },
    { id: 'd15-v1-w7', korean: '가',  hangul: 'ga',      wordKorean: '가르치다',   wordZh: '教' },
    { id: 'd15-v1-w8', korean: '씩',  hangul: 'ssik',    wordKorean: '조금씩',     wordZh: '一点点' },
  ],

  recognize: [
    {
      id: 'd15-v1-r1',
      korean: '정신',
      hangul: 'jeong-sin',
      choices: [
        { zh: '精神', correct: true },
        { zh: '身体', correct: false },
        { zh: '心情', correct: false },
        { zh: '感情', correct: false },
      ],
    },
    {
      id: 'd15-v1-r2',
      korean: '안정',
      hangul: 'an-jeong',
      choices: [
        { zh: '稳定 / 安定', correct: true },
        { zh: '紧张', correct: false },
        { zh: '快乐', correct: false },
        { zh: '担心', correct: false },
      ],
    },
    {
      id: 'd15-v1-r3',
      korean: '상자',
      hangul: 'sang-ja',
      choices: [
        { zh: '箱子 / 盒子', correct: true },
        { zh: '袋子', correct: false },
        { zh: '包装', correct: false },
        { zh: '瓶子', correct: false },
      ],
    },
    {
      id: 'd15-v1-r4',
      korean: '다음 주',
      hangul: 'da-eum ju',
      choices: [
        { zh: '下周', correct: true },
        { zh: '本周', correct: false },
        { zh: '上周', correct: false },
        { zh: '下个月', correct: false },
      ],
    },
    {
      id: 'd15-v1-r5',
      korean: '그만',
      hangul: 'geu-man',
      choices: [
        { zh: '到此为止 / 不再', correct: true },
        { zh: '继续', correct: false },
        { zh: '开始', correct: false },
        { zh: '一起', correct: false },
      ],
    },
    {
      id: 'd15-v1-r6',
      korean: '결심',
      hangul: 'gyeol-sim',
      choices: [
        { zh: '决心', correct: true },
        { zh: '决定', correct: false },
        { zh: '结果', correct: false },
        { zh: '开始', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd15-v1-s1',
      zhHint: '泡面',
      answer: ['라', '면'],
      // 干扰：나（초성 ㄹ→ㄴ 混）；맨（받침 ㄴ 相同、元音差别）
      syllables: ['라', '면', '나', '맨'],
    },
    {
      id: 'd15-v1-s2',
      zhHint: '墙',
      answer: ['벽'],
      // 干扰："박"（元音 ㅕ→ㅏ 混）；"별"（받침 ㄱ→ㄹ 混）；"빅"（초성 ㅂ 相同、元음差别）
      syllables: ['벽', '박', '별', '빅'],
    },
    {
      id: 'd15-v1-s3',
      zhHint: '料理',
      answer: ['요', '리'],
      // 干扰："유"（元음 ㅛ→ㅠ 混）；"니"（초성 ㄹ→ㄴ 混）
      syllables: ['요', '리', '유', '니'],
    },
    {
      id: 'd15-v1-s4',
      zhHint: '健康',
      answer: ['건', '강'],
      // 干扰："권"（元음 ㅓ→ㅝ 混）；"광"（초성 ㄱ 相同、元음差别）
      syllables: ['건', '강', '권', '광'],
    },
  ],

  dictation: [
    { id: 'd15-v1-d1', korean: '라면',    hangul: 'ra-myeon',    syllables: ['라', '면'],       zh: '泡面' },
    { id: 'd15-v1-d2', korean: '요리',    hangul: 'yo-ri',       syllables: ['요', '리'],       zh: '料理' },
    { id: 'd15-v1-d3', korean: '배우고 싶어요', hangul: 'bae-u-go si-peo-yo', syllables: ['배', '우', '고', '싶', '어', '요'], zh: '想学' },
  ],
};
