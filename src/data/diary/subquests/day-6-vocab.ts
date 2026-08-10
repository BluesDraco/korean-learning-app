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
  subtitle: '한빛教室里悄悄多学的 8 个词', subtitleEn: '8 extra words secretly learned in Hanbit\'s classroom',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd06-v1-e1',
      korean: '학원',
      hangul: 'ha-gwon',
      zh: '补习班 / 语言学校', zhEn: 'Cram school / language school',
      pos: '名词', posEn: 'Noun',
      example: { ko: '한빛 어학원이에요.', zh: '是한빛语言学校。', zhEn: 'It\'s Hanbit Language School.' },
      tip: '汉字词「学院」。韩国留学生上语言课的地方叫 어학원（语学院） 或 학원（补习班）。발음 [하권]，ㄱ+ㅇ 连音。', tipEn: 'Sino-Korean word \'academy\'. Where international students in Korea take language classes is called 어학원 (language institute) or 학원 (cram school). Pronounced [하권], with ㄱ+ㅇ liaison.',
      tier: 'core',
    },
    {
      id: 'd06-v1-e2',
      korean: '그룹',
      hangul: 'geu-rup',
      zh: '组合 / 团体', zhEn: 'Group / team',
      pos: '名词', posEn: 'Noun',
      example: { ko: '제가 좋아하는 그룹이에요.', zh: '这是我喜欢的组合。', zhEn: 'This is the group I like.' },
      tip: '英文 group 音译。KPOP 词汇高频——「아이돌 그룹」= 偶像团。粉丝间说「우리 그룹」= 我们家（喜欢的）团。', tipEn: 'Transliteration of English \'group\'. High-frequency in KPOP vocabulary — \'아이돌 그룹\' = idol group. Fans say \'우리 그룹\' = our (favorite) group.',
      tier: 'core',
    },
    {
      id: 'd06-v1-e3',
      korean: '응원봉',
      hangul: 'eung-won-bong',
      zh: '应援棒', zhEn: 'light stick',
      pos: '名词', posEn: 'Noun',
      example: { ko: '응원봉을 들었어요.', zh: '举着应援棒。', zhEn: 'Holding a light stick.' },
      tip: '汉字词「应援棒」。演唱会举的那种发光棒。ㅇ+ㅇ 连续两个 ㅇ 收音，念的时候鼻腔一直震动。', tipEn: 'Sino-Korean word \'cheering stick\'. The glowing stick held at concerts. With two consecutive ㅇ final consonants, your nasal cavity vibrates throughout.',
      tier: 'core',
    },
    {
      id: 'd06-v1-e4',
      korean: '노래',
      hangul: 'no-rae',
      zh: '歌 / 歌曲', zhEn: 'Song.',
      pos: '名词', posEn: 'Noun',
      example: { ko: '이 노래 좋아해요.', zh: '喜欢这首歌。', zhEn: 'I like this song.' },
      tip: '固有词。「노래방」= 练歌房（KTV）、「노래를 부르다」= 唱歌。搭配 좋아해요 时用宾格 을/를。', tipEn: 'Native Korean word. \'노래방\' = singing room (KTV), \'노래를 부르다\' = to sing. Use the object particle 을/를 with 좋아해요.',
      tier: 'core',
    },
    {
      id: 'd06-v1-e5',
      korean: '팬',
      hangul: 'paen',
      zh: '粉丝', zhEn: 'Fan',
      pos: '名词', posEn: 'Noun',
      example: { ko: '저는 팬이에요.', zh: '我是粉丝。', zhEn: 'I\'m a fan.' },
      tip: '英文 fan 音译。「팬미팅」= 粉丝见面会，「팬사인회」= 签售会。发音 [팬]，元音 ㅐ 张嘴的 e。', tipEn: 'Transliteration of English \'fan\'. \'팬미팅\' = fan meeting, \'팬사인회\' = fan signing event. Pronounced [팬], with vowel ㅐ as an open \'e\'.',
      tier: 'core',
    },
    {
      id: 'd06-v1-e6',
      korean: '신입생',
      hangul: 'sin-ip-saeng',
      zh: '新生', zhEn: 'new student',
      pos: '名词', posEn: 'Noun',
      example: { ko: '저는 신입생이에요.', zh: '我是新生。', zhEn: 'I\'m a new student.' },
      tip: '汉字词「新入生」。开学季高频。발음 [시닙쌩]——ㄴ+ㅇ 连音 + ㅂ 后紧音化。', tipEn: 'Sino-Korean word \'new student\'. High-frequency at the start of the semester. Pronounced [시닙쌩] — ㄴ+ㅇ liaison + tense sound after ㅂ.',
      tier: 'core',
    },
    {
      id: 'd06-v1-e7',
      korean: '네',
      hangul: 'ne',
      zh: '是 / 对', zhEn: 'Yes / correct',
      pos: '感叹词', posEn: 'Interjection',
      example: { ko: '네, 맞아요.', zh: '是的，没错。', zhEn: 'Yes, that\'s right.' },
      tip: 'Day 1 复习。是非疑问回答的正面词。发音短促上扬 [네]，日常口语也说 [예]（更正式）。', tipEn: 'Day 1 review. Affirmative answer to yes/no questions. Pronounced short and rising [네]; in casual speech also [예] (more formal).',
      tier: 'ext',
    },
    {
      id: 'd06-v1-e8',
      korean: '아니요',
      hangul: 'a-ni-yo',
      zh: '不 / 不是', zhEn: 'No / not',
      pos: '感叹词', posEn: 'Interjection',
      example: { ko: '아니요, 저는 한국 사람이 아니에요.', zh: '不，我不是韩国人。', zhEn: 'No, I\'m not Korean.', },
      tip: 'Day 1 复习。是非疑问回答的否定词。也可写作「아뇨」（缩写，更口语）。回答否定疑问时容易搞反——Day 10 再深挖。', tipEn: 'Day 1 review. Negative answer to yes/no questions. Can also be written \'아뇨\' (contraction, more colloquial). Easy to mix up when answering negative questions — we\'ll dig deeper on Day 10.',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd06-v1-w1', korean: '학',  hangul: 'hak',     wordKorean: '학원',   wordZh: '语言学校', wordZhEn: 'Language school' },
    { id: 'd06-v1-w2', korean: '그',  hangul: 'geu',     wordKorean: '그룹',   wordZh: '组合', wordZhEn: 'combination' },
    { id: 'd06-v1-w3', korean: '응',  hangul: 'eung',    wordKorean: '응원봉', wordZh: '应援棒', wordZhEn: 'light stick' },
    { id: 'd06-v1-w4', korean: '노',  hangul: 'no',      wordKorean: '노래',   wordZh: '歌', wordZhEn: 'Song' },
    { id: 'd06-v1-w5', korean: '팬',  hangul: 'paen',    wordKorean: '팬',     wordZh: '粉丝', wordZhEn: 'Fan' },
    { id: 'd06-v1-w6', korean: '신',  hangul: 'sin',     wordKorean: '신입생', wordZh: '新生', wordZhEn: 'new student' },
    { id: 'd06-v1-w7', korean: '네',  hangul: 'ne',      wordKorean: '네',     wordZh: '是', wordZhEn: 'to be' },
    { id: 'd06-v1-w8', korean: '아',  hangul: 'a',       wordKorean: '아니요', wordZh: '不', wordZhEn: 'not' },
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
        { zh: '补习班 / 语言学校', zhEn: 'Cram school / language school', correct: true },
        { zh: '大学', zhEn: 'university', correct: false },
        { zh: '图书馆', zhEn: 'library', correct: false },
        { zh: '教室', zhEn: 'Classroom', correct: false },
      ],
    },
    {
      id: 'd06-v1-r2',
      korean: '그룹',
      hangul: 'geu-rup',
      choices: [
        { zh: '组合 / 团体', zhEn: 'Group / team', correct: true },
        { zh: '演唱会', zhEn: 'Concert', correct: false },
        { zh: '专辑', zhEn: 'Album', correct: false },
        { zh: '成员', zhEn: 'member', correct: false },
      ],
    },
    {
      id: 'd06-v1-r3',
      korean: '응원봉',
      hangul: 'eung-won-bong',
      choices: [
        { zh: '应援棒', zhEn: 'light stick', correct: true },
        { zh: '手幅', zhEn: 'hand banner', correct: false },
        { zh: '海报', zhEn: 'poster', correct: false },
        { zh: '门票', zhEn: 'Ticket', correct: false },
      ],
    },
    {
      id: 'd06-v1-r4',
      korean: '노래',
      hangul: 'no-rae',
      choices: [
        { zh: '歌 / 歌曲', zhEn: 'Song.', correct: true },
        { zh: '舞蹈', zhEn: 'dance', correct: false },
        { zh: '电影', zhEn: 'Movie', correct: false },
        { zh: '演唱会', zhEn: 'Concert', correct: false },
      ],
    },
    {
      id: 'd06-v1-r5',
      korean: '팬',
      hangul: 'paen',
      choices: [
        { zh: '粉丝', zhEn: 'Fan', correct: true },
        { zh: '偶像', zhEn: 'Idol', correct: false },
        { zh: '朋友', zhEn: 'friend', correct: false },
        { zh: '成员', zhEn: 'member', correct: false },
      ],
    },
    {
      id: 'd06-v1-r6',
      korean: '신입생',
      hangul: 'sin-ip-saeng',
      choices: [
        { zh: '新生', zhEn: 'new student', correct: true },
        { zh: '毕业生', zhEn: 'Graduate', correct: false },
        { zh: '老师', zhEn: 'Teacher', correct: false },
        { zh: '班长', zhEn: 'class president', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词，非字母级）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd06-v1-s1',
      zhHint: '组合', zhHintEn: 'combination',
      answer: ['그', '룹'],
      // 干扰："구"（元音 ㅡ→ㅜ 高频混淆）；"룰"（收音 ㅂ→ㄹ 混）
      syllables: ['그', '룹', '구', '룰'],
    },
    {
      id: 'd06-v1-s2',
      zhHint: '应援棒', zhHintEn: 'light stick',
      answer: ['응', '원', '봉'],
      // 干扰："웅"（초성 ㅇ 无 → ㅇ 有区别）；"본"（收音 ㅇ→ㄴ 混）
      syllables: ['응', '원', '봉', '웅', '본'],
    },
    {
      id: 'd06-v1-s3',
      zhHint: '歌', zhHintEn: 'Song',
      answer: ['노', '래'],
      // 干扰："로"（初声 ㄴ→ㄹ 混）；"내"（元音 ㅐ 相同，初声差）
      syllables: ['노', '래', '로', '내'],
    },
    {
      id: 'd06-v1-s4',
      zhHint: '新生', zhHintEn: 'new student',
      answer: ['신', '입', '생'],
      // 干扰："싱"（收音 ㄴ→ㅇ 混）；"엽"（초성 ㅇ 相同, 元音差）
      syllables: ['신', '입', '생', '싱', '엽'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd06-v1-d1', korean: '노래',   hangul: 'no-rae',    syllables: ['노', '래'],       zh: '歌', zhEn: 'Song' },
    { id: 'd06-v1-d2', korean: '그룹',   hangul: 'geu-rup',   syllables: ['그', '룹'],       zh: '组合', zhEn: 'combination' },
    { id: 'd06-v1-d3', korean: '신입생', hangul: 'sin-ip-saeng', syllables: ['신', '입', '생'], zh: '新生', zhEn: 'new student' },
  ],
};
