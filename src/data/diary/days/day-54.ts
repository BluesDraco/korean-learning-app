import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 54 · 동물문 시장 · 讨价还价
 *
 * 剧情：Minji带Tori去동물문市场买衣服。Tori学会韩国式讨价还价——"조금만 깎아주세요"。
 * 从25000砍到20000。Minji在旁边竖大拇指。
 *
 * 学习目标：요청 ~아/어 주세요 심화 / 흥정 표현
 * 语料层级：해요体 · 아저씨/이모 반말
 * 韩语自审：korean skill PASS
 */
export const day54: ToriDay = {
  level: 'intermediate',
  day: 24,
  phase: 'expansion',
  title: '동물문市场 · 讨价还价的韩语',
  subtitle: '"조금만 깎아주세요" — 从25000砍到20000',
  heroImageUrl: '/images/diary/day-54-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 26일 · 토요일 오후',
    weather: '兽尔 · 秋阳',
    toriPose: 'shy',
    diaryText: `10月26日，周六下午。

Minji拉我去동물문市场——
韩国最大的服装批发地。

第一家店，我看中一件橘色外套。
挂牌上写着"25,000원"。

Minji在我耳边小声：
"토리, 시장에서는 깎아 달라고 해야 돼."
（兔莉，在市场要说讲价。）

我深呼吸，走到店主面前。
店主是一只戴金链子的獾。

"저기요, 이거 얼마예요?"
"25,000원이에요."
"조금만 깎아주세요."

（那个，这件多少钱？
——25,000元。
——便宜一点吧。）

獾眯了眯眼："학생이야? 얼마 가지고 있어?"
（是学生吗？带了多少？）

我没有慌，
心里已经想好一个数字：
"20,000원 있어요."

（我有20,000元。）

獾大笑："쯧, 학생이라서 22,000원에 줄게."
（啧，看你是学生，22,000元卖你。）

我摇头："이모, 20,000원 딱 있어요. 진짜 좀만 봐주세요."
（阿姨，我就20,000元。真的照顾一下。）

獾看看Minji（Minji点头），
"에휴, 학생 성공."（哎，学生赢了。）

我掏出20,000现金——
Minji在后面竖大拇指，
嘴型："완벽."（完美。）

出门后我把外套穿身上，
瞬间觉得比出门前"兽尔"多了一点。`,
  },

  words: [
    {
      id: 'd54-w1',
      korean: '시장',
      hangul: 'si-jang',
      zh: '市场',
      pos: '名词',
      example: { ko: '동물문 시장에 갔어요.', zh: '去了동물문市场。' },
      tip: '市(시) + 场(장)。재래시장 = 传统市场',
    },
    {
      id: 'd54-w2',
      korean: '깎다',
      hangul: 'kkak-da',
      zh: '砍价/削',
      pos: '动词',
      example: { ko: '조금 깎아주세요.', zh: '便宜一点。' },
      tip: '发음 [깍따]. 깎아 주다 = 讲价',
    },
    {
      id: 'd54-w3',
      korean: '가격',
      hangul: 'ga-gyeok',
      zh: '价格',
      pos: '名词',
      example: { ko: '가격이 싸요.', zh: '价格便宜。' },
      tip: '价(가) + 格(격). 정찰가 = 定价',
    },
    {
      id: 'd54-w4',
      korean: '싸다',
      hangul: 'ssa-da',
      zh: '便宜',
      pos: '形容词',
      example: { ko: '이거 진짜 싸요!', zh: '这个真便宜！' },
      tip: '反义: 비싸다(贵). 시장에서 자주 씀',
    },
    {
      id: 'd54-w5',
      korean: '현금',
      hangul: 'hyeon-geum',
      zh: '现金',
      pos: '名词',
      example: { ko: '현금으로 낼게요.', zh: '给现金。' },
      tip: '现(현) + 金(금). 시장에서는 카드보다 현금 더 잘 통함',
    },
    {
      id: 'd54-w6',
      korean: '진짜',
      hangul: 'jin-jja',
      zh: '真的',
      pos: '副词',
      example: { ko: '진짜 좀만 봐주세요.', zh: '真的照顾一下。' },
      tip: 'Day 23 학과. 讨价还价的口头禅',
    },
  ],

  dialogue: {
    scene: '동물문 시장·옷 가게',
    setting: {
      time: '周六 15:00',
      place: '동물문 시장 A동 3층',
      npc: '獾店主 / Minji',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '저기요, 이 재킷 얼마예요?',
        hangul: 'jeo-gi-yo, i ja-ket eol-ma-ye-yo?',
        zh: '那个，这件外套多少钱？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '獾店主',
        ko: '25,000원이에요.',
        hangul: 'i-man-o-cheon-wo-ni-e-yo',
        zh: '25,000元。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '조금만 깎아주세요. 학생이에요.',
        hangul: 'jo-geum-man kka-kka-ju-se-yo. hak-saeng-i-e-yo',
        zh: '便宜一点吧。我是学生。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '獾店主',
        ko: '얼마 가지고 있어?',
        hangul: 'eol-ma ga-ji-go i-sseo?',
        zh: '你带了多少？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '20,000원 딱 있어요. 진짜 좀만 봐주세요.',
        hangul: 'i-man-won ttak i-sseo-yo. jin-jja jom-man bwa-ju-se-yo',
        zh: '就20,000元。真的照顾一下。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '獾店主同意20,000元卖了。Tori想道谢的最合适一句？',
        practice: 'pick',
        choices: [
          { ko: '감사합니다! 잘 입을게요.', zh: '谢谢！我会好好穿的。', correct: true },
          { ko: '아, 안 살래요.', zh: '啊，不买了。', correct: false },
          { ko: '더 깎아주세요.', zh: '再便宜点。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '请为我___：~아/어 주세요（Day 46 深化）',
    pattern: 'V + **아/어 주세요**',
    whenToUse: 'Day 46 学过 ~아/어 주다 施惠。Day 54 深化——**~아/어 주세요** 是"请为我做___"的最刚需请求句。市场砍价、餐厅、问路都用它。Tori 今天讲价说 「깎아**주세요**」= 请给我便宜点。加 **좀** (一下/一点)会更柔和。',
    rules: [
      '**基本公式**：V + 아/어 주세요。깎다 → 깎아**주세요** / 도와주세요 / 사주세요',
      '**~좀 (口语缓冲)**：조금만 = 一点点 / 좀 = 一下。조금만 깎아주세요 = 便宜一点点吧',
      '**정중 up → ~아/어 주시겠어요?**：请求最正式版。깎아 주시겠어요? = 能给便宜一点吗？',
      '**반말 → ~아/어 줘**：깎아 줘 = 给我便宜点(朋友/亲近的人)'
    ],
    examples: [
      { ko: '조금만 깎아주세요.', zh: '便宜一点吧。', highlight: '깎아주세요', note: '깎다 → 깎아 주세요 + 조금만 = 韩式讲价固定表达' },
      { ko: '이거 하나만 봐주세요.', zh: '这个照顾一下。', highlight: '봐주세요', note: '봐주다 = 照顾/给面子。시장 시나리오' },
      { ko: '진짜 좀만 봐주세요.', zh: '真的照顾一下。', highlight: '봐주세요', note: '진짜 + 좀만(=조금만 축약) + 봐주세요 = 情感强化版' },
      { ko: '커피 두 잔 주세요.', zh: '来两杯咖啡。', highlight: '주세요', note: '단순 주다 + 세요 = 请给我 (~아/어 주세요 前身)' },
    ],
    pitfall:
      '① **~아/어 주세요** vs **~(으)세요**：깎아주세요 (请给我便宜点—施惠) vs 깎으세요 (请你砍价—命令)。前者礼貌请求。② **주세요** 前是**动词**，不能直接接名词——想说"请给我咖啡"用 "커피 주세요"（不加 어/아）。③ 반말不加세요：깎아 줘。④ 시장 表达三件套："이거 얼마예요?" + "좀 깎아주세요" + "봐주세요".',
  },

  output: [
    {
      id: 'd54-o1',
      kind: 'compose',
      zhHint: '便宜一点吧。',
      tokens: ['조금만', '깎아주세요', '깎아 있어요', '깎으세요', '조금이나'],
      composeAnswer: ['조금만', '깎아주세요'],
      successMsg: '韩国市场必备一句。~아/어 주세요 + 조금만.',
    },
    {
      id: 'd54-o2',
      kind: 'listen-choice',
      audioKo: '20,000원 딱 있어요.',
      successMsg: '✓ 讲价时说"手里就这么多"的固定说法.',
      choices: [
        { zh: '就20,000元（正好）。', correct: true },
        { zh: '20,000元太贵了。', correct: false },
        { zh: '不够20,000元。', correct: false },
        { zh: '要20,000元零钱。', correct: false },
      ],
    },
    {
      id: 'd54-o3',
      kind: 'zh-to-ko',
      zhPrompt: '这个照顾一下。',
      successMsg: '"이거 하나만 봐주세요." — 봐주다 = 照顾/给面子.',
      choices: [
        { ko: '이거 하나만 봐주세요.', correct: true },
        { ko: '이거 하나만 보세요.', correct: false },
        { ko: '이거 하나만 봐 주다.', correct: false },
        { ko: '이거 하나가 봐주세요.', correct: false },
      ],
    },
    {
      id: 'd54-o4',
      kind: 'particle-error',
      zhHint: '给现金。',
      successMsg: '현금 有받침 → **으로** (工具/手段).',
      choices: [
        { ko: '현금으로 낼게요.', correct: true },
        { ko: '현금로 낼게요.', correct: false },
        { ko: '현금에 낼게요.', correct: false },
        { ko: '현금이 낼게요.', correct: false },
      ],
    },
    {
      id: 'd54-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 54 全对。25,000 → 20,000. 성공.',
      pairs: [
        { ko: '시장', zh: '市场' },
        { ko: '깎다', zh: '砍价' },
        { ko: '가격', zh: '价格' },
        { ko: '싸다', zh: '便宜' },
        { ko: '현금', zh: '现金' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '한국식 흥정 성공! 5000원 깎았어요. 완전 시장 프로.',
    preview: '明天Tori翻看日记本——对比55天前和现在的自己。',
    stickerId: 'sticker-d54',
    sceneImageUrl: '/images/diary/day-54-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~아/어 주세요 和 ~(으)세요 什么时候用？」「시장에서 어떻게 흥정할까요?」',
};
