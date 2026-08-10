import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 16 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 房产中介场景 8 个新词：
 * - core: 부동산 / 어떤 / 근처 / 채광 / 계약 / 지하철역
 * - ext:  괜찮은 / 데
 */
export const day16Vocab: VocabSubQuestData = {
  day: 16,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '幸福房产的柜台前学会的 8 个词',

  encounter: [
    {
      id: 'd16-v1-e1',
      korean: '부동산',
      hangul: 'bu-dong-san',
      zh: '房产中介 / 不动产',
      pos: '名词',
      example: { ko: '부동산에 가서 원룸을 봐요.', zh: '去房产中介看一居室。' },
      tip: '汉字词「不动产」。既指房产也指中介店。搭配「에 가다」= 去中介',
      tier: 'core',
    },
    {
      id: 'd16-v1-e2',
      korean: '어떤',
      hangul: 'eo-tteon',
      zh: '什么样的',
      pos: '限定词',
      example: { ko: '어떤 집 찾으세요?', zh: '找什么样的房子？' },
      tip: '어떤 + 名词 = 什么样的 ~。跟 「무슨」（什么）区别：어떤 更问性质/类型，무슨 更问名称/种类',
      tier: 'core',
    },
    {
      id: 'd16-v1-e3',
      korean: '근처',
      hangul: 'geun-cheo',
      zh: '附近',
      pos: '名词',
      example: { ko: '학교 근처 원룸이에요.', zh: '是学校附近的一居室。' },
      tip: '汉字词「近处」。「N 근처」= ~附近。「학교 근처에 살아요」= 住在学校附近',
      tier: 'core',
    },
    {
      id: 'd16-v1-e4',
      korean: '채광',
      hangul: 'chae-gwang',
      zh: '采光',
      pos: '名词',
      example: { ko: '채광이 좋아요.', zh: '采光好。' },
      tip: '汉字词「采光」。看房时最常问的词之一。搭配 「좋다/나쁘다」',
      tier: 'core',
    },
    {
      id: 'd16-v1-e5',
      korean: '계약',
      hangul: 'gye-yak',
      zh: '合同 / 契约',
      pos: '名词',
      example: { ko: '계약 언제 끝나요?', zh: '合同什么时候到期？' },
      tip: '汉字词「契约」。搭配 「계약하다」= 签合同、「계약이 끝나다」= 合同到期',
      tier: 'core',
    },
    {
      id: 'd16-v1-e6',
      korean: '지하철역',
      hangul: 'ji-ha-cheol-yeok',
      zh: '地铁站',
      pos: '名词',
      example: { ko: '지하철역이 가까워요.', zh: '地铁站很近。' },
      tip: '지하철(地铁) + 역(站)。租房必问「~역에서 몇 분」= 离站几分钟',
      tier: 'core',
    },
    {
      id: 'd16-v1-e7',
      korean: '괜찮은',
      hangul: 'gwaen-chan-eun',
      zh: '不错的',
      pos: '形容词',
      example: { ko: '괜찮은 데가 하나 있어요.', zh: '有一个不错的地方。' },
      tip: '괜찮다 → 괜찮은(定语)。中介推荐房源常用。「괜찮은 원룸」= 不错的一居室',
      tier: 'ext',
    },
    {
      id: 'd16-v1-e8',
      korean: '데',
      hangul: 'de',
      zh: '地方（口语·代词）',
      pos: '代词',
      example: { ko: '괜찮은 데가 있어요.', zh: '有个不错的地方。' },
      tip: '데 = 곳(地方) 的口语。「~는 데」= ~的地方。中介说 「좋은 데 있어요」= 有好地方',
      tier: 'ext',
    },
  ],

  write: [
    { id: 'd16-v1-w1', korean: '부',  hangul: 'bu',      wordKorean: '부동산',     wordZh: '房产中介' },
    { id: 'd16-v1-w2', korean: '떤',  hangul: 'tteon',   wordKorean: '어떤',       wordZh: '什么样的' },
    { id: 'd16-v1-w3', korean: '근',  hangul: 'geun',    wordKorean: '근처',       wordZh: '附近' },
    { id: 'd16-v1-w4', korean: '채',  hangul: 'chae',    wordKorean: '채광',       wordZh: '采光' },
    { id: 'd16-v1-w5', korean: '계',  hangul: 'gye',     wordKorean: '계약',       wordZh: '合同' },
    { id: 'd16-v1-w6', korean: '역',  hangul: 'yeok',    wordKorean: '지하철역',   wordZh: '地铁站' },
    { id: 'd16-v1-w7', korean: '괜',  hangul: 'gwaen',   wordKorean: '괜찮은',     wordZh: '不错的' },
    { id: 'd16-v1-w8', korean: '데',  hangul: 'de',      wordKorean: '데',         wordZh: '地方' },
  ],

  recognize: [
    {
      id: 'd16-v1-r1',
      korean: '부동산',
      hangul: 'bu-dong-san',
      choices: [
        { zh: '房产中介 / 不动产', correct: true },
        { zh: '便利店', correct: false },
        { zh: '文具店', correct: false },
        { zh: '银行', correct: false },
      ],
    },
    {
      id: 'd16-v1-r2',
      korean: '어떤',
      hangul: 'eo-tteon',
      choices: [
        { zh: '什么样的', correct: true },
        { zh: '这个', correct: false },
        { zh: '那个', correct: false },
        { zh: '几个', correct: false },
      ],
    },
    {
      id: 'd16-v1-r3',
      korean: '근처',
      hangul: 'geun-cheo',
      choices: [
        { zh: '附近', correct: true },
        { zh: '远处', correct: false },
        { zh: '里面', correct: false },
        { zh: '外面', correct: false },
      ],
    },
    {
      id: 'd16-v1-r4',
      korean: '채광',
      hangul: 'chae-gwang',
      choices: [
        { zh: '采光', correct: true },
        { zh: '暖气', correct: false },
        { zh: '通风', correct: false },
        { zh: '门窗', correct: false },
      ],
    },
    {
      id: 'd16-v1-r5',
      korean: '계약',
      hangul: 'gye-yak',
      choices: [
        { zh: '合同 / 契约', correct: true },
        { zh: '押金', correct: false },
        { zh: '月租', correct: false },
        { zh: '中介费', correct: false },
      ],
    },
    {
      id: 'd16-v1-r6',
      korean: '지하철역',
      hangul: 'ji-ha-cheol-yeok',
      choices: [
        { zh: '地铁站', correct: true },
        { zh: '公交站', correct: false },
        { zh: '出租车站', correct: false },
        { zh: '火车站', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd16-v1-s1',
      zhHint: '一居室',
      answer: ['원', '룸'],
      // 干扰："왼"（元음 ㅝ→ㅚ 混）；"룸"外加 "른"（받침 ㅁ→ㄴ 混）
      syllables: ['원', '룸', '왼', '른'],
    },
    {
      id: 'd16-v1-s2',
      zhHint: '押金',
      answer: ['보', '증', '금'],
      // 干扰："포"（초성 ㅂ→ㅍ 送气差别）；"근"（받침 ㅁ→ㄴ 混）
      syllables: ['보', '증', '금', '포', '근'],
    },
    {
      id: 'd16-v1-s3',
      zhHint: '楼层',
      answer: ['층'],
      // 干扰："충"（元음 ㅡ→ㅜ 混）；"청"（초성 ㅊ 相同、元음差别）；"승"（초성 ㅊ→ㅅ 送气差别）
      syllables: ['층', '충', '청', '승'],
    },
    {
      id: 'd16-v1-s4',
      zhHint: '房子 / 家',
      answer: ['집'],
      // 干扰："짐"（받침 ㅂ→ㅁ 混）；"찝"（초성 ㅈ→ㅉ 紧音差别）；"짚"（받침 ㅂ→ㅍ 送气差别）
      syllables: ['집', '짐', '찝', '짚'],
    },
  ],

  dictation: [
    { id: 'd16-v1-d1', korean: '원룸',        hangul: 'won-rum',           syllables: ['원', '룸'],             zh: '一居室' },
    { id: 'd16-v1-d2', korean: '찾고 있어요', hangul: 'chat-go i-sseo-yo', syllables: ['찾', '고', '있', '어', '요'], zh: '正在找' },
    { id: 'd16-v1-d3', korean: '월세',        hangul: 'wol-se',            syllables: ['월', '세'],             zh: '月租' },
  ],
};
