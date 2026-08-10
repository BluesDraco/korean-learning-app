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
  subtitle: '幸福房产的柜台前学会的 8 个词', subtitleEn: '8 words learned at the Happy Realty counter',

  encounter: [
    {
      id: 'd16-v1-e1',
      korean: '부동산',
      hangul: 'bu-dong-san',
      zh: '房产中介 / 不动产', zhEn: 'Real estate agent / real estate',
      pos: '名词', posEn: 'Noun',
      example: { ko: '부동산에 가서 원룸을 봐요.', zh: '去房产中介看一居室。', zhEn: 'Going to the real estate agent to look at a studio.' },
      tip: '汉字词「不动产」。既指房产也指中介店。搭配「에 가다」= 去中介', tipEn: 'Sino-Korean word \'부동산\'. Refers to both real estate and the agency. Paired with \'에 가다\' = to go to the agency',
      tier: 'core',
    },
    {
      id: 'd16-v1-e2',
      korean: '어떤',
      hangul: 'eo-tteon',
      zh: '什么样的', zhEn: 'What kind of',
      pos: '限定词', posEn: 'Determiner',
      example: { ko: '어떤 집 찾으세요?', zh: '找什么样的房子？', zhEn: 'What kind of house are you looking for?' },
      tip: '어떤 + 名词 = 什么样的 ~。跟 「무슨」（什么）区别：어떤 更问性质/类型，무슨 更问名称/种类', tipEn: '어떤 + noun = what kind of ~. Difference from \'무슨\' (what): 어떤 asks more about nature/type, 무슨 asks more about name/kind',
      tier: 'core',
    },
    {
      id: 'd16-v1-e3',
      korean: '근처',
      hangul: 'geun-cheo',
      zh: '附近', zhEn: 'nearby',
      pos: '名词', posEn: 'Noun',
      example: { ko: '학교 근처 원룸이에요.', zh: '是学校附近的一居室。', zhEn: 'It\'s a studio near the school.' },
      tip: '汉字词「近处」。「N 근처」= ~附近。「학교 근처에 살아요」= 住在学校附近', tipEn: 'Hanja word \'nearby\'. \'N 근처\' = ~near. \'학교 근처에 살아요\' = I live near the school.',
      tier: 'core',
    },
    {
      id: 'd16-v1-e4',
      korean: '채광',
      hangul: 'chae-gwang',
      zh: '采光', zhEn: 'lighting',
      pos: '名词', posEn: 'Noun',
      example: { ko: '채광이 좋아요.', zh: '采光好。', zhEn: 'The lighting is good.' },
      tip: '汉字词「采光」。看房时最常问的词之一。搭配 「좋다/나쁘다」', tipEn: 'Hanja word \'lighting\'. One of the most common words when viewing a place. Used with \'좋다/나쁘다\' (good/bad).',
      tier: 'core',
    },
    {
      id: 'd16-v1-e5',
      korean: '계약',
      hangul: 'gye-yak',
      zh: '合同 / 契约', zhEn: 'contract / lease',
      pos: '名词', posEn: 'Noun',
      example: { ko: '계약 언제 끝나요?', zh: '合同什么时候到期？', zhEn: 'When does the contract expire?' },
      tip: '汉字词「契约」。搭配 「계약하다」= 签合同、「계약이 끝나다」= 合同到期', tipEn: 'Hanja word \'contract\'. Used with \'계약하다\' = to sign a contract, \'계약이 끝나다\' = contract expires.',
      tier: 'core',
    },
    {
      id: 'd16-v1-e6',
      korean: '지하철역',
      hangul: 'ji-ha-cheol-yeok',
      zh: '地铁站', zhEn: 'subway station',
      pos: '名词', posEn: 'Noun',
      example: { ko: '지하철역이 가까워요.', zh: '地铁站很近。', zhEn: 'The subway station is very close.' },
      tip: '지하철(地铁) + 역(站)。租房必问「~역에서 몇 분」= 离站几分钟', tipEn: '지하철 (subway) + 역 (station). When renting, always ask \'~역에서 몇 분\' = how many minutes from the station.',
      tier: 'core',
    },
    {
      id: 'd16-v1-e7',
      korean: '괜찮은',
      hangul: 'gwaen-chan-eun',
      zh: '不错的', zhEn: 'decent',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '괜찮은 데가 하나 있어요.', zh: '有一个不错的地方。', zhEn: 'There\'s a decent place.' },
      tip: '괜찮다 → 괜찮은(定语)。中介推荐房源常用。「괜찮은 원룸」= 不错的一居室', tipEn: '괜찮다 → 괜찮은 (attributive). Commonly used by agents to recommend listings. \'괜찮은 원룸\' = a decent studio.',
      tier: 'ext',
    },
    {
      id: 'd16-v1-e8',
      korean: '데',
      hangul: 'de',
      zh: '地方（口语·代词）', zhEn: 'place (colloquial, pronoun)',
      pos: '代词', posEn: 'Pronoun',
      example: { ko: '괜찮은 데가 있어요.', zh: '有个不错的地方。', zhEn: 'There\'s a nice place.' },
      tip: '데 = 곳(地方) 的口语。「~는 데」= ~的地方。中介说 「좋은 데 있어요」= 有好地方', tipEn: '데 = colloquial for 곳 (place). \'~는 데\' = the place where ~. Agents say \'좋은 데 있어요\' = there\'s a good place.',
      tier: 'ext',
    },
  ],

  write: [
    { id: 'd16-v1-w1', korean: '부',  hangul: 'bu',      wordKorean: '부동산',     wordZh: '房产中介', wordZhEn: 'real estate agent' },
    { id: 'd16-v1-w2', korean: '떤',  hangul: 'tteon',   wordKorean: '어떤',       wordZh: '什么样的', wordZhEn: 'What kind of' },
    { id: 'd16-v1-w3', korean: '근',  hangul: 'geun',    wordKorean: '근처',       wordZh: '附近', wordZhEn: 'nearby' },
    { id: 'd16-v1-w4', korean: '채',  hangul: 'chae',    wordKorean: '채광',       wordZh: '采光', wordZhEn: 'lighting' },
    { id: 'd16-v1-w5', korean: '계',  hangul: 'gye',     wordKorean: '계약',       wordZh: '合同', wordZhEn: 'contract' },
    { id: 'd16-v1-w6', korean: '역',  hangul: 'yeok',    wordKorean: '지하철역',   wordZh: '地铁站', wordZhEn: 'subway station' },
    { id: 'd16-v1-w7', korean: '괜',  hangul: 'gwaen',   wordKorean: '괜찮은',     wordZh: '不错的', wordZhEn: 'decent' },
    { id: 'd16-v1-w8', korean: '데',  hangul: 'de',      wordKorean: '데',         wordZh: '地方', wordZhEn: 'place' },
  ],

  recognize: [
    {
      id: 'd16-v1-r1',
      korean: '부동산',
      hangul: 'bu-dong-san',
      choices: [
        { zh: '房产中介 / 不动产', zhEn: 'Real estate agent / real estate', correct: true },
        { zh: '便利店', zhEn: 'Convenience store', correct: false },
        { zh: '文具店', zhEn: 'Stationery store', correct: false },
        { zh: '银行', zhEn: 'bank', correct: false },
      ],
    },
    {
      id: 'd16-v1-r2',
      korean: '어떤',
      hangul: 'eo-tteon',
      choices: [
        { zh: '什么样的', zhEn: 'What kind of', correct: true },
        { zh: '这个', zhEn: 'This', correct: false },
        { zh: '那个', zhEn: 'that', correct: false },
        { zh: '几个', zhEn: 'a few', correct: false },
      ],
    },
    {
      id: 'd16-v1-r3',
      korean: '근처',
      hangul: 'geun-cheo',
      choices: [
        { zh: '附近', zhEn: 'nearby', correct: true },
        { zh: '远处', zhEn: 'far away', correct: false },
        { zh: '里面', zhEn: 'inside', correct: false },
        { zh: '外面', zhEn: 'outside', correct: false },
      ],
    },
    {
      id: 'd16-v1-r4',
      korean: '채광',
      hangul: 'chae-gwang',
      choices: [
        { zh: '采光', zhEn: 'lighting', correct: true },
        { zh: '暖气', zhEn: 'heating', correct: false },
        { zh: '通风', zhEn: 'ventilation', correct: false },
        { zh: '门窗', zhEn: 'doors and windows', correct: false },
      ],
    },
    {
      id: 'd16-v1-r5',
      korean: '계약',
      hangul: 'gye-yak',
      choices: [
        { zh: '合同 / 契约', zhEn: 'contract / lease', correct: true },
        { zh: '押金', zhEn: 'deposit', correct: false },
        { zh: '月租', zhEn: 'monthly rent', correct: false },
        { zh: '中介费', zhEn: 'brokerage fee', correct: false },
      ],
    },
    {
      id: 'd16-v1-r6',
      korean: '지하철역',
      hangul: 'ji-ha-cheol-yeok',
      choices: [
        { zh: '地铁站', zhEn: 'subway station', correct: true },
        { zh: '公交站', zhEn: 'bus stop', correct: false },
        { zh: '出租车站', zhEn: 'taxi stand', correct: false },
        { zh: '火车站', zhEn: 'train station', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd16-v1-s1',
      zhHint: '一居室', zhHintEn: 'studio',
      answer: ['원', '룸'],
      // 干扰："왼"（元음 ㅝ→ㅚ 混）；"룸"外加 "른"（받침 ㅁ→ㄴ 混）
      syllables: ['원', '룸', '왼', '른'],
    },
    {
      id: 'd16-v1-s2',
      zhHint: '押金', zhHintEn: 'deposit',
      answer: ['보', '증', '금'],
      // 干扰："포"（초성 ㅂ→ㅍ 送气差别）；"근"（받침 ㅁ→ㄴ 混）
      syllables: ['보', '증', '금', '포', '근'],
    },
    {
      id: 'd16-v1-s3',
      zhHint: '楼层', zhHintEn: 'floor',
      answer: ['층'],
      // 干扰："충"（元음 ㅡ→ㅜ 混）；"청"（초성 ㅊ 相同、元음差别）；"승"（초성 ㅊ→ㅅ 送气差别）
      syllables: ['층', '충', '청', '승'],
    },
    {
      id: 'd16-v1-s4',
      zhHint: '房子 / 家', zhHintEn: 'house / home',
      answer: ['집'],
      // 干扰："짐"（받침 ㅂ→ㅁ 混）；"찝"（초성 ㅈ→ㅉ 紧音差别）；"짚"（받침 ㅂ→ㅍ 送气差别）
      syllables: ['집', '짐', '찝', '짚'],
    },
  ],

  dictation: [
    { id: 'd16-v1-d1', korean: '원룸',        hangul: 'won-rum',           syllables: ['원', '룸'],             zh: '一居室', zhEn: 'studio' },
    { id: 'd16-v1-d2', korean: '찾고 있어요', hangul: 'chat-go i-sseo-yo', syllables: ['찾', '고', '있', '어', '요'], zh: '正在找', zhEn: 'looking for' },
    { id: 'd16-v1-d3', korean: '월세',        hangul: 'wol-se',            syllables: ['월', '세'],             zh: '月租', zhEn: 'monthly rent' },
  ],
};
