import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 10 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——围绕学校食堂场景：
 * - core: 밥 / 국 / 반찬 / 아줌마 / 매워요 / 잘 먹겠습니다
 * - ext:  잘 먹었습니다 / 시간
 *
 * 教学重点：
 *   밥/국/반찬 是"韩国餐三件套"，饭桌上必用
 *   아줌마 是叫食堂/餐厅阿姨的固定称呼
 *   잘 먹겠습니다 / 잘 먹었습니다 是餐前餐后的仪式感表达
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day10Vocab: VocabSubQuestData = {
  day: 10,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '在学校食堂餐盘上认识的 8 个词',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd10-v1-e1',
      korean: '밥',
      hangul: 'bap',
      zh: '饭 / 米饭',
      pos: '名词',
      example: { ko: '밥 먹었어요?', zh: '吃饭了吗？' },
      tip: '固有词。「밥 먹었어요?」= 韩国人的招呼语，跟"你吃了吗"一样。「밥」本义米饭，也泛指餐',
      tier: 'core',
    },
    {
      id: 'd10-v1-e2',
      korean: '국',
      hangul: 'guk',
      zh: '汤',
      pos: '名词',
      example: { ko: '국이 맛있어요.', zh: '汤好喝。' },
      tip: '固有词。区别于 「찌개」(火锅/浓汤) 和 「탕」(炖汤)。국 是清汤，米饭旁的小碗',
      tier: 'core',
    },
    {
      id: 'd10-v1-e3',
      korean: '반찬',
      hangul: 'ban-chan',
      zh: '小菜 / 配菜',
      pos: '名词',
      example: { ko: '반찬 더 주세요.', zh: '请再加点小菜。' },
      tip: '汉字词「饭馔」。韩国餐桌配 3-5 种小菜，很多店里可以免费续。「반찬 더」= 加菜',
      tier: 'core',
    },
    {
      id: 'd10-v1-e4',
      korean: '아줌마',
      hangul: 'a-jum-ma',
      zh: '阿姨（中年女性）',
      pos: '名词',
      example: { ko: '아줌마, 물 좀 주세요.', zh: '阿姨，请给我点水。' },
      tip: '食堂/市场/餐厅阿姨的固定称呼。正式一点是「아주머니」。对年轻女服务员用 「저기요」更礼貌',
      tier: 'core',
    },
    {
      id: 'd10-v1-e5',
      korean: '매워요',
      hangul: 'mae-wo-yo',
      zh: '辣',
      pos: '形容词',
      example: { ko: '너무 매워요!', zh: '太辣了！' },
      tip: '맵다 → 매워요（ㅂ 不规则）。韩国菜辣度分级：안 매워요(不辣)/조금 매워요(有点辣)/많이 매워요(很辣)/너무 매워요(太辣)',
      tier: 'core',
    },
    {
      id: 'd10-v1-e6',
      korean: '잘 먹겠습니다',
      hangul: 'jal meok-ge-sseum-ni-da',
      zh: '我要开动了（餐前）',
      pos: '表达',
      example: { ko: '잘 먹겠습니다!', zh: '我开动了！' },
      tip: '直译"我会好好吃的"。韩国餐前必说的礼貌语。对朋友用반말「잘 먹을게」',
      tier: 'core',
    },
    {
      id: 'd10-v1-e7',
      korean: '잘 먹었습니다',
      hangul: 'jal meo-geo-sseum-ni-da',
      zh: '我吃好了 / 谢谢款待',
      pos: '表达',
      example: { ko: '잘 먹었습니다, 아줌마.', zh: '吃好了，阿姨。' },
      tip: '直译"我吃得很好"。餐后离桌前必说。对朋友用반말「잘 먹었어」。跟 잘 먹겠습니다 一对',
      tier: 'ext',
    },
    {
      id: 'd10-v1-e8',
      korean: '시간',
      hangul: 'si-gan',
      zh: '时间',
      pos: '名词',
      example: { ko: '시간 있어요?', zh: '有时间吗？' },
      tip: '汉字词「时间」。搭配 있다/없다 → 시간 있어요/시간 없어요。也用在 「시간이 없어요」= 没时间',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd10-v1-w1', korean: '밥',  hangul: 'bap',     wordKorean: '밥',       wordZh: '饭' },
    { id: 'd10-v1-w2', korean: '국',  hangul: 'guk',     wordKorean: '국',       wordZh: '汤' },
    { id: 'd10-v1-w3', korean: '반',  hangul: 'ban',     wordKorean: '반찬',     wordZh: '小菜' },
    { id: 'd10-v1-w4', korean: '아',  hangul: 'a',       wordKorean: '아줌마',   wordZh: '阿姨' },
    { id: 'd10-v1-w5', korean: '매',  hangul: 'mae',     wordKorean: '매워요',   wordZh: '辣' },
    { id: 'd10-v1-w6', korean: '겠',  hangul: 'get',     wordKorean: '잘 먹겠습니다', wordZh: '开动了' },
    { id: 'd10-v1-w7', korean: '먹',  hangul: 'meok',    wordKorean: '잘 먹었습니다', wordZh: '吃好了' },
    { id: 'd10-v1-w8', korean: '시',  hangul: 'si',      wordKorean: '시간',     wordZh: '时间' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd10-v1-r1',
      korean: '밥',
      hangul: 'bap',
      choices: [
        { zh: '饭 / 米饭', correct: true },
        { zh: '面 / 面条', correct: false },
        { zh: '汤', correct: false },
        { zh: '包子', correct: false },
      ],
    },
    {
      id: 'd10-v1-r2',
      korean: '국',
      hangul: 'guk',
      choices: [
        { zh: '汤（清汤）', correct: true },
        { zh: '菜', correct: false },
        { zh: '饭', correct: false },
        { zh: '肉', correct: false },
      ],
    },
    {
      id: 'd10-v1-r3',
      korean: '반찬',
      hangul: 'ban-chan',
      choices: [
        { zh: '小菜 / 配菜', correct: true },
        { zh: '主食', correct: false },
        { zh: '零食', correct: false },
        { zh: '甜品', correct: false },
      ],
    },
    {
      id: 'd10-v1-r4',
      korean: '아줌마',
      hangul: 'a-jum-ma',
      choices: [
        { zh: '阿姨（中年女性）', correct: true },
        { zh: '姐姐（年轻女性）', correct: false },
        { zh: '爷爷', correct: false },
        { zh: '大叔（中年男性）', correct: false },
      ],
    },
    {
      id: 'd10-v1-r5',
      korean: '매워요',
      hangul: 'mae-wo-yo',
      choices: [
        { zh: '辣', correct: true },
        { zh: '甜', correct: false },
        { zh: '咸', correct: false },
        { zh: '酸', correct: false },
      ],
    },
    {
      id: 'd10-v1-r6',
      korean: '잘 먹겠습니다',
      hangul: 'jal meok-ge-sseum-ni-da',
      choices: [
        { zh: '我要开动了（餐前）', correct: true },
        { zh: '我吃好了（餐后）', correct: false },
        { zh: '请给我菜单', correct: false },
        { zh: '请结账', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd10-v1-s1',
      zhHint: '小菜 / 配菜',
      answer: ['반', '찬'],
      // 干扰："방"（收音 ㄴ→ㅇ 混）；"잔"（초성 ㅊ→ㅈ 送气差别）
      syllables: ['반', '찬', '방', '잔'],
    },
    {
      id: 'd10-v1-s2',
      zhHint: '阿姨',
      answer: ['아', '줌', '마'],
      // 干扰："오"（元音 ㅏ→ㅗ 混）；"맘"（초성 ㅁ 相同、元音差别）
      syllables: ['아', '줌', '마', '오', '맘'],
    },
    {
      id: 'd10-v1-s3',
      zhHint: '汤（清汤）',
      answer: ['국'],
      // 干扰："국"外加相似字："굿"（받침 ㄱ→ㅅ 混）；"군"（받침 ㄱ→ㄴ 混）；"고"（无收音 vs 有收音）
      syllables: ['국', '굿', '군', '고'],
    },
    {
      id: 'd10-v1-s4',
      zhHint: '时间',
      answer: ['시', '간'],
      // 干扰："서"（元音 ㅣ→ㅓ 混）；"강"（받침 ㄴ→ㅇ 混）
      syllables: ['시', '간', '서', '강'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd10-v1-d1', korean: '있어요',  hangul: 'i-sseo-yo',     syllables: ['있', '어', '요'],       zh: '有 / 在' },
    { id: 'd10-v1-d2', korean: '없어요',  hangul: 'eop-seo-yo',    syllables: ['없', '어', '요'],       zh: '没有 / 不在' },
    { id: 'd10-v1-d3', korean: '맛있어요', hangul: 'ma-si-sseo-yo', syllables: ['맛', '있', '어', '요'], zh: '好吃' },
  ],
};
