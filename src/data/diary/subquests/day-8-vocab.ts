import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 8 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——围绕深夜独处 + 想家 + 반말独白：
 * - core: 밤 / 혼자 / 엄마 / 힘들다 / 잠 / 편지
 * - ext:  잘 자 / 화이팅
 *
 * 教学重点：
 *   힘들다 是 Chapter 2 高频词——"累/难/辛苦"三义合一
 *   잘 자 / 화이팅 铺 Day 9 之后的日常반말对话
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day8Vocab: VocabSubQuestData = {
  day: 8,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '空房间 301 号里学会的 8 个词',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd08-v1-e1',
      korean: '밤',
      hangul: 'bam',
      zh: '夜晚 / 晚上',
      pos: '名词',
      example: { ko: '오늘 밤 조용해요.', zh: '今晚很安静。' },
      tip: '固有词。「밤」还可以指"栗子"，靠上下文区分。「낮」(白天) 是它的反义词。「밤에」= 在夜里（时间助词 에）。',
      tier: 'core',
    },
    {
      id: 'd08-v1-e2',
      korean: '혼자',
      hangul: 'hon-ja',
      zh: '一个人 / 独自',
      pos: '副词',
      example: { ko: '혼자 있어요.', zh: '我一个人在。' },
      tip: '固有词副词。「혼자 있다」= 独自一人。反义词 「같이」(一起)。발음 [혼자]，「ㅎ」清气送出',
      tier: 'core',
    },
    {
      id: 'd08-v1-e3',
      korean: '엄마',
      hangul: 'eom-ma',
      zh: '妈妈',
      pos: '名词',
      example: { ko: '엄마, 보고 싶어.', zh: '妈妈，我想你。' },
      tip: '亲密叫法（반말）。正式场合用「어머니」。跟妈妈对话用「엄마」，介绍时对外人用「어머니」',
      tier: 'core',
    },
    {
      id: 'd08-v1-e4',
      korean: '힘들다',
      hangul: 'him-deul-da',
      zh: '累 / 难 / 辛苦',
      pos: '形容词',
      example: { ko: '한국어 힘들어요.', zh: '韩语好难。' },
      tip: '해요体 → 힘들어요。三重含义合一：身体累、心理苦、事情难。ㄹ 收音在 어요 前保留',
      tier: 'core',
    },
    {
      id: 'd08-v1-e5',
      korean: '잠',
      hangul: 'jam',
      zh: '睡眠 / 觉',
      pos: '名词',
      example: { ko: '잠이 안 와요.', zh: '睡不着。' },
      tip: '固有词。搭配「잠을 자다」= 睡觉，「잠이 오다」= 犯困。「잠이 안 와요」= 睡不着（很常用）',
      tier: 'core',
    },
    {
      id: 'd08-v1-e6',
      korean: '편지',
      hangul: 'pyeon-ji',
      zh: '信 / 书信',
      pos: '名词',
      example: { ko: '엄마한테 편지를 써요.', zh: '给妈妈写信。' },
      tip: '汉字词「便纸」。搭配「편지를 쓰다」(写信) / 「편지를 받다」(收信)。给家人用「~한테」(给~，口语)',
      tier: 'core',
    },
    {
      id: 'd08-v1-e7',
      korean: '잘 자',
      hangul: 'jal ja',
      zh: '晚安（반말）',
      pos: '表达',
      example: { ko: '토리야, 잘 자.', zh: '兔莉，晚安。' },
      tip: '반말晚安。해요体是「잘 자요」，더 정중하면「안녕히 주무세요」。Haru 关门前对同龄兔莉说的话',
      tier: 'ext',
    },
    {
      id: 'd08-v1-e8',
      korean: '화이팅',
      hangul: 'hwa-i-ting',
      zh: '加油！',
      pos: '表达',
      example: { ko: '내일도 화이팅!', zh: '明天也加油！' },
      tip: '外来词 fighting（韩式英语）。也写作「파이팅」。给自己或朋友打气万能句。반말/해요体通用',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd08-v1-w1', korean: '밤',  hangul: 'bam',     wordKorean: '밤',       wordZh: '夜晚' },
    { id: 'd08-v1-w2', korean: '혼',  hangul: 'hon',     wordKorean: '혼자',     wordZh: '一个人' },
    { id: 'd08-v1-w3', korean: '엄',  hangul: 'eom',     wordKorean: '엄마',     wordZh: '妈妈' },
    { id: 'd08-v1-w4', korean: '힘',  hangul: 'him',     wordKorean: '힘들다',   wordZh: '累/难' },
    { id: 'd08-v1-w5', korean: '잠',  hangul: 'jam',     wordKorean: '잠',       wordZh: '睡眠' },
    { id: 'd08-v1-w6', korean: '편',  hangul: 'pyeon',   wordKorean: '편지',     wordZh: '信' },
    { id: 'd08-v1-w7', korean: '자',  hangul: 'ja',      wordKorean: '잘 자',    wordZh: '晚安' },
    { id: 'd08-v1-w8', korean: '팅',  hangul: 'ting',    wordKorean: '화이팅',   wordZh: '加油' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd08-v1-r1',
      korean: '밤',
      hangul: 'bam',
      choices: [
        { zh: '夜晚 / 晚上', correct: true },
        { zh: '白天', correct: false },
        { zh: '早上', correct: false },
        { zh: '中午', correct: false },
      ],
    },
    {
      id: 'd08-v1-r2',
      korean: '혼자',
      hangul: 'hon-ja',
      choices: [
        { zh: '一个人 / 独自', correct: true },
        { zh: '一起', correct: false },
        { zh: '兄弟', correct: false },
        { zh: '朋友', correct: false },
      ],
    },
    {
      id: 'd08-v1-r3',
      korean: '엄마',
      hangul: 'eom-ma',
      choices: [
        { zh: '妈妈', correct: true },
        { zh: '爸爸', correct: false },
        { zh: '姐姐', correct: false },
        { zh: '奶奶', correct: false },
      ],
    },
    {
      id: 'd08-v1-r4',
      korean: '힘들다',
      hangul: 'him-deul-da',
      choices: [
        { zh: '累 / 难 / 辛苦', correct: true },
        { zh: '开心 / 高兴', correct: false },
        { zh: '有趣 / 好玩', correct: false },
        { zh: '简单 / 容易', correct: false },
      ],
    },
    {
      id: 'd08-v1-r5',
      korean: '잠',
      hangul: 'jam',
      choices: [
        { zh: '睡眠 / 觉', correct: true },
        { zh: '梦', correct: false },
        { zh: '床', correct: false },
        { zh: '被子', correct: false },
      ],
    },
    {
      id: 'd08-v1-r6',
      korean: '편지',
      hangul: 'pyeon-ji',
      choices: [
        { zh: '信 / 书信', correct: true },
        { zh: '书 / 书本', correct: false },
        { zh: '照片', correct: false },
        { zh: '礼物', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd08-v1-s1',
      zhHint: '一个人 / 独自',
      answer: ['혼', '자'],
      // 干扰："홀"（초성 ㅎ 相同、元音 ㅗ vs ㅗ 但收音差别 ㄴ→ㄹ）；"차"（初声 ㅈ→ㅊ 送气差别）
      syllables: ['혼', '자', '홀', '차'],
    },
    {
      id: 'd08-v1-s2',
      zhHint: '妈妈',
      answer: ['엄', '마'],
      // 干扰："어"（无收音 vs 有收音 ㅁ 高频混）；"만"（초성 ㅁ 相同、位置错位）
      syllables: ['엄', '마', '어', '만'],
    },
    {
      id: 'd08-v1-s3',
      zhHint: '信 / 书信',
      answer: ['편', '지'],
      // 干扰："평"（元音 ㅕ→ㅕ 但收音 ㄴ→ㅇ 混）；"자"（초성 ㅈ 相同、元音差别）
      syllables: ['편', '지', '평', '자'],
    },
    {
      id: 'd08-v1-s4',
      zhHint: '加油！',
      answer: ['화', '이', '팅'],
      // 干扰："하"（元音 ㅘ→ㅏ 混）；"딩"（초성 ㅌ→ㄷ 送气差别）
      syllables: ['화', '이', '팅', '하', '딩'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd08-v1-d1', korean: '밤',       hangul: 'bam',          syllables: ['밤'],                zh: '夜晚' },
    { id: 'd08-v1-d2', korean: '엄마',     hangul: 'eom-ma',       syllables: ['엄', '마'],          zh: '妈妈' },
    { id: 'd08-v1-d3', korean: '보고 싶어요', hangul: 'bo-go si-peo-yo', syllables: ['보', '고', '싶', '어', '요'], zh: '想念' },
  ],
};
