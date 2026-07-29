import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 6 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——围绕教室 + KPOP 场景：
 * - core: 학원 / 그룹 / 응원봉 / 노래 / 팬 / 신입생（进认词考察）
 * - ext:  네 / 아니요（是/否——为 boss 是非疑问回答做铺垫）
 *
 * 教学重点：是非疑问 ~이에요? 主考回答方式，先把 네 / 아니요 用到肌肉记忆。
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day6Vocab: VocabSubQuestData = {
  day: 6,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '한빛教室里悄悄多学的 8 个词',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd06-v1-e1',
      korean: '학원',
      hangul: 'ha-gwon',
      zh: '补习班 / 语言学校',
      pos: '名词',
      example: { ko: '한빛 어학원이에요.', zh: '是한빛语言学校。' },
      tip: '汉字词「学院」。韩国留学生上语言课的地方叫 어학원（语学院） 或 학원（补习班）。발음 [하권]，ㄱ+ㅇ 连音。',
      tier: 'core',
    },
    {
      id: 'd06-v1-e2',
      korean: '그룹',
      hangul: 'geu-rup',
      zh: '组合 / 团体',
      pos: '名词',
      example: { ko: '제가 좋아하는 그룹이에요.', zh: '这是我喜欢的组合。' },
      tip: '英文 group 音译。KPOP 词汇高频——「아이돌 그룹」= 偶像团。粉丝间说「우리 그룹」= 我们家（喜欢的）团。',
      tier: 'core',
    },
    {
      id: 'd06-v1-e3',
      korean: '응원봉',
      hangul: 'eung-won-bong',
      zh: '应援棒',
      pos: '名词',
      example: { ko: '응원봉을 들었어요.', zh: '举着应援棒。' },
      tip: '汉字词「应援棒」。演唱会举的那种发光棒。ㅇ+ㅇ 连续两个 ㅇ 收音，念的时候鼻腔一直震动。',
      tier: 'core',
    },
    {
      id: 'd06-v1-e4',
      korean: '노래',
      hangul: 'no-rae',
      zh: '歌 / 歌曲',
      pos: '名词',
      example: { ko: '이 노래 좋아해요.', zh: '喜欢这首歌。' },
      tip: '固有词。「노래방」= 练歌房（KTV）、「노래를 부르다」= 唱歌。搭配 좋아해요 时用宾格 을/를。',
      tier: 'core',
    },
    {
      id: 'd06-v1-e5',
      korean: '팬',
      hangul: 'paen',
      zh: '粉丝',
      pos: '名词',
      example: { ko: '저는 팬이에요.', zh: '我是粉丝。' },
      tip: '英文 fan 音译。「팬미팅」= 粉丝见面会，「팬사인회」= 签售会。发音 [팬]，元音 ㅐ 张嘴的 e。',
      tier: 'core',
    },
    {
      id: 'd06-v1-e6',
      korean: '신입생',
      hangul: 'sin-ip-saeng',
      zh: '新生',
      pos: '名词',
      example: { ko: '저는 신입생이에요.', zh: '我是新生。' },
      tip: '汉字词「新入生」。开学季高频。발음 [시닙쌩]——ㄴ+ㅇ 连音 + ㅂ 后紧音化。',
      tier: 'core',
    },
    {
      id: 'd06-v1-e7',
      korean: '네',
      hangul: 'ne',
      zh: '是 / 对',
      pos: '感叹词',
      example: { ko: '네, 맞아요.', zh: '是的，没错。' },
      tip: 'Day 1 复习。是非疑问回答的正面词。发音短促上扬 [네]，日常口语也说 [예]（更正式）。',
      tier: 'ext',
    },
    {
      id: 'd06-v1-e8',
      korean: '아니요',
      hangul: 'a-ni-yo',
      zh: '不 / 不是',
      pos: '感叹词',
      example: { ko: '아니요, 저는 한국 사람이 아니에요.', zh: '不，我不是韩国人。', },
      tip: 'Day 1 复习。是非疑问回答的否定词。也可写作「아뇨」（缩写，更口语）。回答否定疑问时容易搞反——Day 10 再深挖。',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd06-v1-w1', korean: '학',  hangul: 'hak',     wordKorean: '학원',   wordZh: '语言学校' },
    { id: 'd06-v1-w2', korean: '그',  hangul: 'geu',     wordKorean: '그룹',   wordZh: '组合' },
    { id: 'd06-v1-w3', korean: '응',  hangul: 'eung',    wordKorean: '응원봉', wordZh: '应援棒' },
    { id: 'd06-v1-w4', korean: '노',  hangul: 'no',      wordKorean: '노래',   wordZh: '歌' },
    { id: 'd06-v1-w5', korean: '팬',  hangul: 'paen',    wordKorean: '팬',     wordZh: '粉丝' },
    { id: 'd06-v1-w6', korean: '신',  hangul: 'sin',     wordKorean: '신입생', wordZh: '新生' },
    { id: 'd06-v1-w7', korean: '네',  hangul: 'ne',      wordKorean: '네',     wordZh: '是' },
    { id: 'd06-v1-w8', korean: '아',  hangul: 'a',       wordKorean: '아니요', wordZh: '不' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd06-v1-r1',
      korean: '학원',
      hangul: 'ha-gwon',
      choices: [
        { zh: '补习班 / 语言学校', correct: true },
        { zh: '大学', correct: false },
        { zh: '图书馆', correct: false },
        { zh: '教室', correct: false },
      ],
    },
    {
      id: 'd06-v1-r2',
      korean: '그룹',
      hangul: 'geu-rup',
      choices: [
        { zh: '组合 / 团体', correct: true },
        { zh: '演唱会', correct: false },
        { zh: '专辑', correct: false },
        { zh: '成员', correct: false },
      ],
    },
    {
      id: 'd06-v1-r3',
      korean: '응원봉',
      hangul: 'eung-won-bong',
      choices: [
        { zh: '应援棒', correct: true },
        { zh: '手幅', correct: false },
        { zh: '海报', correct: false },
        { zh: '门票', correct: false },
      ],
    },
    {
      id: 'd06-v1-r4',
      korean: '노래',
      hangul: 'no-rae',
      choices: [
        { zh: '歌 / 歌曲', correct: true },
        { zh: '舞蹈', correct: false },
        { zh: '电影', correct: false },
        { zh: '演唱会', correct: false },
      ],
    },
    {
      id: 'd06-v1-r5',
      korean: '팬',
      hangul: 'paen',
      choices: [
        { zh: '粉丝', correct: true },
        { zh: '偶像', correct: false },
        { zh: '朋友', correct: false },
        { zh: '成员', correct: false },
      ],
    },
    {
      id: 'd06-v1-r6',
      korean: '신입생',
      hangul: 'sin-ip-saeng',
      choices: [
        { zh: '新生', correct: true },
        { zh: '毕业生', correct: false },
        { zh: '老师', correct: false },
        { zh: '班长', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词，非字母级）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd06-v1-s1',
      zhHint: '组合',
      answer: ['그', '룹'],
      // 干扰："구"（元音 ㅡ→ㅜ 高频混淆）；"룰"（收音 ㅂ→ㄹ 混）
      syllables: ['그', '룹', '구', '룰'],
    },
    {
      id: 'd06-v1-s2',
      zhHint: '应援棒',
      answer: ['응', '원', '봉'],
      // 干扰："웅"（초성 ㅇ 无 → ㅇ 有区别）；"본"（收音 ㅇ→ㄴ 混）
      syllables: ['응', '원', '봉', '웅', '본'],
    },
    {
      id: 'd06-v1-s3',
      zhHint: '歌',
      answer: ['노', '래'],
      // 干扰："로"（初声 ㄴ→ㄹ 混）；"내"（元音 ㅐ 相同，初声差）
      syllables: ['노', '래', '로', '내'],
    },
    {
      id: 'd06-v1-s4',
      zhHint: '新生',
      answer: ['신', '입', '생'],
      // 干扰："싱"（收音 ㄴ→ㅇ 混）；"엽"（초성 ㅇ 相同, 元音差）
      syllables: ['신', '입', '생', '싱', '엽'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd06-v1-d1', korean: '노래',   hangul: 'no-rae',    syllables: ['노', '래'],       zh: '歌' },
    { id: 'd06-v1-d2', korean: '그룹',   hangul: 'geu-rup',   syllables: ['그', '룹'],       zh: '组合' },
    { id: 'd06-v1-d3', korean: '신입생', hangul: 'sin-ip-saeng', syllables: ['신', '입', '생'], zh: '新生' },
  ],
};
