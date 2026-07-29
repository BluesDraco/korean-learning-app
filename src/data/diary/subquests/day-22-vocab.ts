import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 22 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词是"变位对"（가다→가요/먹다→먹어요等），本关补充 8 个真正的新动词/名词。
 * 每个词都能演示해요体一条规则。
 * - core: 보다 / 자다 / 만나다 / 배우다 / 읽다 / 쉬다（进认词考察）
 * - ext:  운동하다 / 선생님（进拼写 / 听辨）
 *
 * 场景延展：语言学校 · 一整天日常动作韩语化。
 */
export const day22Vocab: VocabSubQuestData = {
  day: 22,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '让 8 个新动词全部戴上"해요"帽子',

  encounter: [
    {
      id: 'd22-v1-e1',
      korean: '보다 → 봐요',
      hangul: 'bo-da → bwa-yo',
      zh: '看',
      pos: '动词',
      example: { ko: '영화 봐요.', zh: '看电影。' },
      tip: '词干"보"末元音 ㅗ → 아요 → 보+아 缩合 = 봐요（ㅗ+ㅏ=ㅘ）',
      tier: 'core',
    },
    {
      id: 'd22-v1-e2',
      korean: '자다 → 자요',
      hangul: 'ja-da → ja-yo',
      zh: '睡',
      pos: '动词',
      example: { ko: '토리는 지금 자요.', zh: 'Tori 现在在睡觉。' },
      tip: '词干"자"末元音 ㅏ → 아요 → 자+아 缩合 = 자요（ㅏ+ㅏ=ㅏ）',
      tier: 'core',
    },
    {
      id: 'd22-v1-e3',
      korean: '만나다 → 만나요',
      hangul: 'man-na-da → man-na-yo',
      zh: '见面',
      pos: '动词',
      example: { ko: '친구 만나요.', zh: '见朋友。' },
      tip: '词干"만나"末元音 ㅏ → 아요 → 만나+아 缩合 = 만나요（ㅏ+ㅏ 合并）',
      tier: 'core',
    },
    {
      id: 'd22-v1-e4',
      korean: '배우다 → 배워요',
      hangul: 'bae-u-da → bae-wo-yo',
      zh: '学 / 学习',
      pos: '动词',
      example: { ko: '한국어 배워요.', zh: '学韩语。' },
      tip: '词干"배우"末元音 ㅜ → 어요 → 배우+어 缩合 = 배워요（ㅜ+ㅓ=ㅝ）',
      tier: 'core',
    },
    {
      id: 'd22-v1-e5',
      korean: '읽다 → 읽어요',
      hangul: 'ilk-da → il-geo-yo',
      zh: '读',
      pos: '动词',
      example: { ko: '책 읽어요.', zh: '读书。' },
      tip: '词干"읽"末元音 ㅣ → 어요 = 읽어요。有双收音，实际发音 [일거요]',
      tier: 'core',
    },
    {
      id: 'd22-v1-e6',
      korean: '쉬다 → 쉬어요',
      hangul: 'swi-da → swi-eo-yo',
      zh: '休息',
      pos: '动词',
      example: { ko: '오늘 쉬어요.', zh: '今天休息。' },
      tip: '词干"쉬"末元音 ㅟ → 어요 = 쉬어요（不缩合）。ㅟ 是罕见不缩合元音',
      tier: 'core',
    },
    {
      id: 'd22-v1-e7',
      korean: '운동하다 → 운동해요',
      hangul: 'un-dong-ha-da → un-dong-hae-yo',
      zh: '运动',
      pos: '动词',
      example: { ko: '아침에 운동해요.', zh: '早上运动。' },
      tip: '하다类无条件规则3 → 运动하다 → 运动해요。공부해요 同款',
      tier: 'ext',
    },
    {
      id: 'd22-v1-e8',
      korean: '선생님',
      hangul: 'seon-saeng-nim',
      zh: '老师',
      pos: '名词',
      example: { ko: '선생님은 홍학이에요.', zh: '老师是火烈鸟。' },
      tip: '선생(先生) + 님(敬语后缀)。当面称呼必加 님。火鹤老师 = 홍학 선생님',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd22-v1-r1',
      korean: '보다',
      hangul: 'bo-da',
      choices: [
        { zh: '看', correct: true },
        { zh: '听', correct: false },
        { zh: '读', correct: false },
        { zh: '写', correct: false },
      ],
    },
    {
      id: 'd22-v1-r2',
      korean: '자다',
      hangul: 'ja-da',
      choices: [
        { zh: '睡', correct: true },
        { zh: '休息', correct: false },
        { zh: '躺', correct: false },
        { zh: '起', correct: false },
      ],
    },
    {
      id: 'd22-v1-r3',
      korean: '만나다',
      hangul: 'man-na-da',
      choices: [
        { zh: '见面', correct: true },
        { zh: '认识', correct: false },
        { zh: '告别', correct: false },
        { zh: '错过', correct: false },
      ],
    },
    {
      id: 'd22-v1-r4',
      korean: '배우다',
      hangul: 'bae-u-da',
      choices: [
        { zh: '学 / 学习', correct: true },
        { zh: '教', correct: false },
        { zh: '教育', correct: false },
        { zh: '训练', correct: false },
      ],
    },
    {
      id: 'd22-v1-r5',
      korean: '읽다',
      hangul: 'ilk-da',
      choices: [
        { zh: '读', correct: true },
        { zh: '看', correct: false },
        { zh: '写', correct: false },
        { zh: '背', correct: false },
      ],
    },
    {
      id: 'd22-v1-r6',
      korean: '쉬다',
      hangul: 'swi-da',
      choices: [
        { zh: '休息', correct: true },
        { zh: '睡觉', correct: false },
        { zh: '呼吸', correct: false },
        { zh: '停', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd22-v1-s1',
      zhHint: '来（해요体）',
      answer: ['와', '요'],
      // 干扰："가"（意思是"去"）；"오"（원형）
      syllables: ['와', '요', '가', '오'],
    },
    {
      id: 'd22-v1-s2',
      zhHint: '喝（해요体）',
      answer: ['마', '셔', '요'],
      // 干扰："먹"（意思是"吃"）；"시"（원형 마시 的一部分，容易混）
      syllables: ['마', '셔', '요', '먹', '시'],
    },
    {
      id: 'd22-v1-s3',
      zhHint: '听（해요体）',
      answer: ['들', '어', '요'],
      // 干扰："듣"（원형词干，学生易误写为 듣어요）；"어"（正确的第二音节）；"아"（错误规则的输入）
      syllables: ['들', '어', '요', '듣', '아'],
    },
    {
      id: 'd22-v1-s4',
      zhHint: '学习（해요体）',
      answer: ['공', '부', '해', '요'],
      // 干扰："하"（원형的一部分）；"아"（学生易误接 아요）
      syllables: ['공', '부', '해', '요', '하', '아'],
    },
  ],

  write: [
    { id: 'd22-v1-w1', korean: '가', hangul: 'ga',    wordKorean: '가요',       wordZh: '去' },
    { id: 'd22-v1-w2', korean: '먹', hangul: 'meok',  wordKorean: '먹어요',     wordZh: '吃' },
    { id: 'd22-v1-w3', korean: '해', hangul: 'hae',   wordKorean: '해요',       wordZh: '做' },
    { id: 'd22-v1-w4', korean: '봐', hangul: 'bwa',   wordKorean: '봐요',       wordZh: '看' },
    { id: 'd22-v1-w5', korean: '자', hangul: 'ja',    wordKorean: '자요',       wordZh: '睡' },
    { id: 'd22-v1-w6', korean: '만', hangul: 'man',   wordKorean: '만나요',     wordZh: '见面' },
    { id: 'd22-v1-w7', korean: '들', hangul: 'deul',  wordKorean: '들어요',     wordZh: '听' },
    { id: 'd22-v1-w8', korean: '읽', hangul: 'ilk',   wordKorean: '읽어요',     wordZh: '读' },
  ],

  dictation: [
    { id: 'd22-v1-d1', korean: '가요',        hangul: 'ga-yo',              syllables: ['가', '요'],           zh: '去' },
    { id: 'd22-v1-d2', korean: '먹어요',      hangul: 'meo-geo-yo',         syllables: ['먹', '어', '요'],     zh: '吃' },
    { id: 'd22-v1-d3', korean: '공부해요',    hangul: 'gong-bu-hae-yo',     syllables: ['공', '부', '해', '요'], zh: '学习' },
  ],
};
