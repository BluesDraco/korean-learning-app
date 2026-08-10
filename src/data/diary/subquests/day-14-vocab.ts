import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 14 · 1-1 단어 마스터 · 词汇子关卡
 *
 * Chapter 2 收官——围绕咖啡馆场景 + 温度/味道形容词：
 * - core: 라떼 / 아메리카노 / 뜨거운 / 시원한 / 어서 오세요 / 나왔어요
 * - ext:  드시고 가세요 / 여기서 먹을게요
 *
 * 教学重点：
 *   라떼 / 아메리카노 = 咖啡馆两大主打
 *   뜨거운 / 시원한 = 温度对比升级（따뜻한/차가운 之外）
 *   어서 오세요 / 나왔어요 = 店员两句招牌
 *   드시고 가세요 vs 포장 = 堂食/外带二选一
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day14Vocab: VocabSubQuestData = {
  day: 14,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '하루카페 收银台前学会的 8 个词',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd14-v1-e1',
      korean: '라떼',
      hangul: 'ra-tte',
      zh: '拿铁',
      pos: '名词',
      example: { ko: '따뜻한 라떼 주세요.', zh: '请给我一杯热拿铁。' },
      tip: '外来词 latte。「라떼」是 espresso + 牛奶。搭配量词 「잔」(杯)——라떼 한 잔',
      tier: 'core',
    },
    {
      id: 'd14-v1-e2',
      korean: '아메리카노',
      hangul: 'a-me-ri-ka-no',
      zh: '美式咖啡',
      pos: '名词',
      example: { ko: '아이스 아메리카노 하나 주세요.', zh: '请给我一杯冰美式。' },
      tip: '外来词 americano。韩国咖啡馆 No.1 销量。缩写 「아아」= 冰美式（口语流行）',
      tier: 'core',
    },
    {
      id: 'd14-v1-e3',
      korean: '뜨거운',
      hangul: 'tteu-geo-un',
      zh: '烫的 / 很热的',
      pos: '形容词',
      example: { ko: '뜨거우니까 조심하세요.', zh: '因为烫，请小心。' },
      tip: '뜨겁다 → 뜨거운(定语·ㅂ 不规则)。比 「따뜻한」(温暖) 更烫。汤/开水用 뜨거운，咖啡用 따뜻한',
      tier: 'core',
    },
    {
      id: 'd14-v1-e4',
      korean: '시원한',
      hangul: 'si-won-han',
      zh: '凉爽的',
      pos: '形容词',
      example: { ko: '시원한 물 주세요.', zh: '请给我凉水。' },
      tip: '시원하다 → 시원한(定语)。比 「차가운」(冰冷) 温和。夏天喝的舒服凉水用 시원한；冰饮料还是 차가운/아이스',
      tier: 'core',
    },
    {
      id: 'd14-v1-e5',
      korean: '어서 오세요',
      hangul: 'eo-seo-o-se-yo',
      zh: '欢迎光临',
      pos: '表达',
      example: { ko: '어서 오세요. 주문 도와드릴게요.', zh: '欢迎光临。我帮您点单。' },
      tip: '固定套语。任何店铺进门必听。「어서」= 快/请 + 「오세요」= 请来。반말不用，商业场景专用',
      tier: 'core',
    },
    {
      id: 'd14-v1-e6',
      korean: '나왔어요',
      hangul: 'na-wa-sseo-yo',
      zh: '好了 / 出来了',
      pos: '动词',
      example: { ko: '라떼 나왔어요.', zh: '拿铁好了。' },
      tip: '나오다(出来) 过去式 → 나왔어요。咖啡馆/餐厅"您点的东西好了"用这句。听到就是取餐信号',
      tier: 'core',
    },
    {
      id: 'd14-v1-e7',
      korean: '드시고 가세요',
      hangul: 'deu-si-go ga-se-yo',
      zh: '堂食（在这儿用完再走）',
      pos: '表达',
      example: { ko: '드시고 가세요, 포장이세요?', zh: '堂食还是外带？' },
      tip: '드시다(吃·敬语) + 고(先做) + 가세요(走·敬语) = 吃完再走。跟 「포장」(外带) 一对。店员必问',
      tier: 'ext',
    },
    {
      id: 'd14-v1-e8',
      korean: '여기서 먹을게요',
      hangul: 'yeo-gi-seo meo-geul-ge-yo',
      zh: '在这儿吃 / 堂食',
      pos: '表达',
      example: { ko: '여기서 먹을게요.', zh: '在这里吃。' },
      tip: '여기서(在这儿·여기+에서 缩写) + 먹을게요(要吃·意愿形)。回答"堂食还是外带"时最自然的一句',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd14-v1-w1', korean: '라',  hangul: 'ra',      wordKorean: '라떼',           wordZh: '拿铁' },
    { id: 'd14-v1-w2', korean: '아',  hangul: 'a',       wordKorean: '아메리카노',     wordZh: '美式' },
    { id: 'd14-v1-w3', korean: '뜨',  hangul: 'tteu',    wordKorean: '뜨거운',         wordZh: '烫的' },
    { id: 'd14-v1-w4', korean: '시',  hangul: 'si',      wordKorean: '시원한',         wordZh: '凉爽的' },
    { id: 'd14-v1-w5', korean: '어',  hangul: 'eo',      wordKorean: '어서 오세요',    wordZh: '欢迎光临' },
    { id: 'd14-v1-w6', korean: '나',  hangul: 'na',      wordKorean: '나왔어요',       wordZh: '好了' },
    { id: 'd14-v1-w7', korean: '드',  hangul: 'deu',     wordKorean: '드시고 가세요',  wordZh: '堂食' },
    { id: 'd14-v1-w8', korean: '포',  hangul: 'po',      wordKorean: '포장',           wordZh: '外带' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd14-v1-r1',
      korean: '라떼',
      hangul: 'ra-tte',
      choices: [
        { zh: '拿铁', correct: true },
        { zh: '美式', correct: false },
        { zh: '摩卡', correct: false },
        { zh: '奶茶', correct: false },
      ],
    },
    {
      id: 'd14-v1-r2',
      korean: '아메리카노',
      hangul: 'a-me-ri-ka-no',
      choices: [
        { zh: '美式咖啡', correct: true },
        { zh: '拿铁', correct: false },
        { zh: '意式浓缩', correct: false },
        { zh: '卡布奇诺', correct: false },
      ],
    },
    {
      id: 'd14-v1-r3',
      korean: '뜨거운',
      hangul: 'tteu-geo-un',
      choices: [
        { zh: '烫的 / 很热的', correct: true },
        { zh: '温的', correct: false },
        { zh: '凉的', correct: false },
        { zh: '冰的', correct: false },
      ],
    },
    {
      id: 'd14-v1-r4',
      korean: '시원한',
      hangul: 'si-won-han',
      choices: [
        { zh: '凉爽的', correct: true },
        { zh: '烫的', correct: false },
        { zh: '冰的（冷冰冰）', correct: false },
        { zh: '暖的', correct: false },
      ],
    },
    {
      id: 'd14-v1-r5',
      korean: '어서 오세요',
      hangul: 'eo-seo-o-se-yo',
      choices: [
        { zh: '欢迎光临', correct: true },
        { zh: '慢走', correct: false },
        { zh: '再来', correct: false },
        { zh: '请等一下', correct: false },
      ],
    },
    {
      id: 'd14-v1-r6',
      korean: '나왔어요',
      hangul: 'na-wa-sseo-yo',
      choices: [
        { zh: '好了 / 出来了', correct: true },
        { zh: '来了 / 到了', correct: false },
        { zh: '走了', correct: false },
        { zh: '没有了', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd14-v1-s1',
      zhHint: '热的 / 温的',
      answer: ['따', '뜻', '한'],
      // 干扰："뜨"（形近字混）；"할"（받침 ㄴ→ㄹ 混）
      syllables: ['따', '뜻', '한', '뜨', '할'],
    },
    {
      id: 'd14-v1-s2',
      zhHint: '冰的 / 冷的',
      answer: ['차', '가', '운'],
      // 干扰："자"（초성 ㅊ→ㅈ 送气差别）；"안"（초성 ㅇ 相同、位置错）
      syllables: ['차', '가', '운', '자', '안'],
    },
    {
      id: 'd14-v1-s3',
      zhHint: '甜的（副词形）',
      answer: ['달', '게'],
      // 干扰："딸"（초성 ㄷ→ㄸ 送气差别）；"개"（元음 ㅐ→ㅔ 混）
      syllables: ['달', '게', '딸', '개'],
    },
    {
      id: 'd14-v1-s4',
      zhHint: '外带',
      answer: ['포', '장'],
      // 干扰："보"（초성 ㅍ→ㅂ 送气差别）；"잠"（받침 ㅇ→ㅁ 混）
      syllables: ['포', '장', '보', '잠'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd14-v1-d1', korean: '한 잔',    hangul: 'han jan',       syllables: ['한', '잔'],           zh: '一杯' },
    { id: 'd14-v1-d2', korean: '주문',     hangul: 'ju-mun',        syllables: ['주', '문'],           zh: '点单' },
    { id: 'd14-v1-d3', korean: '맛있게 드세요', hangul: 'ma-sit-ge deu-se-yo', syllables: ['맛', '있', '게', '드', '세', '요'], zh: '请慢用' },
  ],
};
