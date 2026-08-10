import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 27 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词（한턱 내다/제가 낼게요/결제/인분/잘 먹었습니다/다음에）之外的 8 个新词。
 * - core: 삼겹살 / 상추 / 회식 / 시험 / 끝나다 / 잘 먹겠습니다（进认词考察）
 * - ext:  대신 / 물（进拼写 / 听辨）
 *
 * 场景延展：从"考试结束"到"烤肉聚餐"到"饭前饭后感谢"。
 */
export const day27Vocab: VocabSubQuestData = {
  day: 27,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '烤肉店 · 四个人围一桌的 8 个词',

  encounter: [
    {
      id: 'd27-v1-e1',
      korean: '삼겹살',
      hangul: 'sam-gyeop-sal',
      zh: '五花肉',
      pos: '名词',
      example: { ko: '삼겹살 4인분 주세요.', zh: '请给我4人份五花肉。' },
      tip: '삼(三) + 겹(层) + 살(肉) = 三层肉。韩国烤肉最经典的一款',
      tier: 'core',
    },
    {
      id: 'd27-v1-e2',
      korean: '상추',
      hangul: 'sang-chu',
      zh: '生菜',
      pos: '名词',
      example: { ko: '상추 더 주세요.', zh: '请再给点生菜。' },
      tip: '烤肉必备包菜。搭配「깻잎」= 苏子叶。韩国烤肉店 상추 无限续',
      tier: 'core',
    },
    {
      id: 'd27-v1-e3',
      korean: '회식',
      hangul: 'hoe-sik',
      zh: '聚餐 / 会餐',
      pos: '名词',
      example: { ko: '오늘 회식이에요.', zh: '今天聚餐。' },
      tip: '汉字词「会食」。公司/学校/朋友的正式聚餐都叫 회식。搭配 회식하다',
      tier: 'core',
    },
    {
      id: 'd27-v1-e4',
      korean: '시험',
      hangul: 'si-heom',
      zh: '考试',
      pos: '名词',
      example: { ko: '시험 끝났어요!', zh: '考试结束了！' },
      tip: '汉字词「试验」。搭配 시험 끝나다（考完）/ 시험 잘 보다（考得好）',
      tier: 'core',
    },
    {
      id: 'd27-v1-e5',
      korean: '끝나다',
      hangul: 'kkeun-na-da',
      zh: '结束',
      pos: '动词',
      example: { ko: '수업이 끝났어요.', zh: '课结束了。' },
      tip: '해요体：끝나요。过去：끝났어요。搭配「시험이 끝나다」= 考试结束',
      tier: 'core',
    },
    {
      id: 'd27-v1-e6',
      korean: '잘 먹겠습니다',
      hangul: 'jal meok-get-seum-ni-da',
      zh: '我开动了 / 谢款待（饭前）',
      pos: '表达',
      example: { ko: '잘 먹겠습니다!', zh: '我开动了！' },
      tip: '겠 = 将要 → 饭前用。饭后感谢用 잘 먹었습니다（Day 27 主流程学过）',
      tier: 'core',
    },
    {
      id: 'd27-v1-e7',
      korean: '대신',
      hangul: 'dae-sin',
      zh: '代替 / 换成',
      pos: '副词',
      example: { ko: '대신 다음에 내가 살게.', zh: '换成下次我请。' },
      tip: '汉字词「代身」。搭配「N 대신 M」= 代替 N 换成 M',
      tier: 'ext',
    },
    {
      id: 'd27-v1-e8',
      korean: '물',
      hangul: 'mul',
      zh: '水',
      pos: '名词',
      example: { ko: '물 좀 주세요.', zh: '请给点水。' },
      tip: '固有词。餐厅韩国「물」自助免费。搭配「찬물」= 冰水 / 「뜨거운 물」= 热水',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd27-v1-r1',
      korean: '삼겹살',
      hangul: 'sam-gyeop-sal',
      choices: [
        { zh: '五花肉', correct: true },
        { zh: '牛排', correct: false },
        { zh: '鸡腿', correct: false },
        { zh: '鱼片', correct: false },
      ],
    },
    {
      id: 'd27-v1-r2',
      korean: '상추',
      hangul: 'sang-chu',
      choices: [
        { zh: '生菜', correct: true },
        { zh: '大葱', correct: false },
        { zh: '洋葱', correct: false },
        { zh: '土豆', correct: false },
      ],
    },
    {
      id: 'd27-v1-r3',
      korean: '회식',
      hangul: 'hoe-sik',
      choices: [
        { zh: '聚餐', correct: true },
        { zh: '会议', correct: false },
        { zh: '午餐', correct: false },
        { zh: '外卖', correct: false },
      ],
    },
    {
      id: 'd27-v1-r4',
      korean: '시험',
      hangul: 'si-heom',
      choices: [
        { zh: '考试', correct: true },
        { zh: '面试', correct: false },
        { zh: '测量', correct: false },
        { zh: '实验', correct: false },
      ],
    },
    {
      id: 'd27-v1-r5',
      korean: '끝나다',
      hangul: 'kkeun-na-da',
      choices: [
        { zh: '结束', correct: true },
        { zh: '开始', correct: false },
        { zh: '继续', correct: false },
        { zh: '暂停', correct: false },
      ],
    },
    {
      id: 'd27-v1-r6',
      korean: '잘 먹겠습니다',
      hangul: 'jal meok-get-seum-ni-da',
      choices: [
        { zh: '我开动了（饭前）', correct: true },
        { zh: '吃好了（饭后）', correct: false },
        { zh: '不好吃', correct: false },
        { zh: '不想吃', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd27-v1-s1',
      zhHint: '请客',
      answer: ['한', '턱'],
      // 干扰："탁"（元音 ㅓ→ㅏ 差）；"헌"（초성 ㅎ 相同、元音 ㅓ 差）
      syllables: ['한', '턱', '탁', '헌'],
    },
    {
      id: 'd27-v1-s2',
      zhHint: '结账',
      answer: ['결', '제'],
      // 干扰："계"（初声 ㄱ 相同）；"저"（초성 ㅈ 相同、元음 ㅔ→ㅓ 差）
      syllables: ['결', '제', '계', '저'],
    },
    {
      id: 'd27-v1-s3',
      zhHint: '人份',
      answer: ['인', '분'],
      // 干扰："인"（同）；"근"（元音 ㅣ→ㅡ 差）
      syllables: ['인', '분', '근', '븐'],
    },
    {
      id: 'd27-v1-s4',
      zhHint: '下次',
      answer: ['다', '음'],
      // 干扰："담"（초성 ㄷ 相同）；"엄"（元음差别）
      syllables: ['다', '음', '담', '엄'],
    },
  ],

  write: [
    { id: 'd27-v1-w1', korean: '한', hangul: 'han',       wordKorean: '한턱',        wordZh: '一顿' },
    { id: 'd27-v1-w2', korean: '결', hangul: 'gyeol',     wordKorean: '결제',        wordZh: '结账' },
    { id: 'd27-v1-w3', korean: '인', hangul: 'in',        wordKorean: '인분',        wordZh: '人份' },
    { id: 'd27-v1-w4', korean: '다', hangul: 'da',        wordKorean: '다음에',      wordZh: '下次' },
    { id: 'd27-v1-w5', korean: '삼', hangul: 'sam',       wordKorean: '삼겹살',      wordZh: '五花肉' },
    { id: 'd27-v1-w6', korean: '상', hangul: 'sang',      wordKorean: '상추',        wordZh: '生菜' },
    { id: 'd27-v1-w7', korean: '회', hangul: 'hoe',       wordKorean: '회식',        wordZh: '聚餐' },
    { id: 'd27-v1-w8', korean: '끝', hangul: 'kkeut',     wordKorean: '끝나다',      wordZh: '结束' },
  ],

  dictation: [
    { id: 'd27-v1-d1', korean: '잘 먹겠습니다',    hangul: 'jal meok-get-seum-ni-da',       syllables: ['잘', '먹', '겠', '습', '니', '다'],           zh: '我开动了' },
    { id: 'd27-v1-d2', korean: '잘 먹었습니다',    hangul: 'jal meo-geot-seum-ni-da',       syllables: ['잘', '먹', '었', '습', '니', '다'],           zh: '吃好了' },
    { id: 'd27-v1-d3', korean: '다음에 내가 살게', hangul: 'da-eum-e nae-ga sal-ge',        syllables: ['다', '음', '에', '내', '가', '살', '게'],     zh: '下次我请' },
  ],
};
