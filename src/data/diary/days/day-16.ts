import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 16 · 부동산 · 第一次说"我在找房子"
 *
 * 剧情：Tori推开「행복부동산」的门，戴老花镜的金毛老犬中介问道：
 * "어떤 집 찾으세요?" Tori第一次说出"원룸 찾고 있어요"。
 * 不是"我要"，是"我正在找"——这一句让她觉得自己像个真正的兽尔人了。
 *
 * 学习目标：~고 있어요（正在做……）/ 房产词汇 / 楼层表达
 * 语料层级：해요体（礼貌正式，面对陌生中介）
 * 韩语自审：korean skill PASS（자연성/문법/부동산 실제 표현 三关）
 */
export const day16: ToriDay = {
  level: 'beginner',
  day: 16,
  phase: 'expansion',
  title: '中介所 · 第一次说"我在找房子"',
  subtitle: '老犬中介翻开了厚厚的册子',
  heroImageUrl: '/images/diary/day-16-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 16일 · 월요일 오후',
    weather: '兽尔 · 微风',
    toriPose: 'shy',
    diaryText: `9月16日，周一下午。

宿舍合同明年2月到期。
Junho说："토리야, 집은 빨리 봐야 돼."
（兔莉，房子要早点看。）

我打开Naver地图，学校北门拐角——
一家「행복부동산」（幸福房产），
招牌上画着一只戴老花镜的金毛老犬。

推门进去，铃铛响了一下。
老犬中介从厚厚的册子上抬起头，
眼镜滑到鼻尖。桌上放着一个橡果形状的摆件，好可爱。

"어서 오세요. 어떤 집 찾으세요?"
（欢迎，您找什么样的房子？）

我深呼吸。
然后说了："원룸 찾고 있어요."
——不是"我要"，是"我正在找"。`,
  },

  words: [
    {
      id: 'd16-w1',
      korean: '집',
      hangul: 'jip',
      zh: '家；房子',
      pos: '名词',
      example: { ko: '어떤 집 찾으세요?', zh: '您找什么样的房子？' },
      tip: '집 有收音 ㅂ。"집이"连读时发 [지비]',
    },
    {
      id: 'd16-w2',
      korean: '원룸',
      hangul: 'won-rum',
      zh: '一居室',
      pos: '名词',
      example: { ko: '원룸 찾고 있어요.', zh: '我在找一居室。' },
      tip: '원(one) + 룸(room)，韩式外来语。指独立的单间套房',
    },
    {
      id: 'd16-w3',
      korean: '보증금',
      hangul: 'bo-jeung-geum',
      zh: '押金',
      pos: '名词',
      example: { ko: '보증금은 500만 원이에요.', zh: '押金是500万韩元。' },
      tip: '보증(保证) + 금(金)。韩国租房第一个要谈的数字',
    },
    {
      id: 'd16-w4',
      korean: '월세',
      hangul: 'wol-se',
      zh: '月租',
      pos: '名词',
      example: { ko: '월세는 50만 원 정도요.', zh: '月租50万韩元左右。' },
      tip: '월(月) + 세(税/租)。和보증금一起是韩国租房核心词',
    },
    {
      id: 'd16-w5',
      korean: '찾고 있어요',
      hangul: 'chat-go i-sseo-yo',
      zh: '正在找',
      pos: '表达',
      example: { ko: '학교 근처 원룸을 찾고 있어요.', zh: '正在找学校附近的一居室。' },
      tip: '찾다(找) + 고 있어요(正在) = 正在找。今天的核心语法',
    },
    {
      id: 'd16-w6',
      korean: '층',
      hangul: 'cheung',
      zh: '楼层',
      pos: '名词',
      example: { ko: '3층 원룸 보여 주세요.', zh: '请给我看3楼的一居室。' },
      tip: '数字 + 층。韩国公寓从1층(1楼)数起',
    },
  ],

  dialogue: {
    scene: '幸福房产·第一次看房',
    setting: {
      time: '周一下午',
      place: '행복부동산（幸福房产）',
      npc: '老犬中介（金毛老犬·戴老花镜）',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '老犬中介',
        ko: '어서 오세요. 어떤 집 찾으세요?',
        hangul: 'eo-seo o-se-yo. eo-tteon jip cha-jeu-se-yo?',
        zh: '欢迎。您找什么样的房子？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '원룸 찾고 있어요. 학교 근처로요.',
        hangul: 'won-rum chat-go i-sseo-yo. hak-gyo geun-cheo-ro-yo.',
        zh: '我在找一居室。学校附近的。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '老犬中介',
        ko: '보증금이랑 월세는 얼마까지 가능해요?',
        hangul: 'bo-jeung-geum-i-rang wol-se-neun eol-ma-kka-ji ga-neung-hae-yo?',
        zh: '押金和月租预算多少？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '보증금은 500만, 월세는 50만 정도요.',
        hangul: 'bo-jeung-geu-meun o-baek-man, wol-se-neun o-sip-man jeong-do-yo.',
        zh: '押金500万，月租50万左右。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '老犬中介',
        ko: '음… 학교 근처에 괜찮은 데가 하나 있어요.',
        hangul: 'eum… hak-gyo geun-cheo-e gwaen-chan-eun de-ga ha-na i-sseo-yo.',
        zh: '嗯……学校附近有一个不错的。',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: 'Tori想看3楼采光好的房间，她应该怎么说？',
        practice: 'pick',
        choices: [
          { ko: '3층 원룸 보여 주세요.', zh: '请给我看3楼的一居室。', correct: true },
          { ko: '3층 집 사고 싶어요.', zh: '想买3楼的房子。', correct: false },
          { ko: '3층에 살고 있어요.', zh: '我住在3楼。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '正在做……：~고 있어요',
    pattern: 'V词干 + **고 있어요** = 正在做___',
    whenToUse: '表示动作正在进行中。相当于中文的"正在……"。Day 16 兔莉说"원룸 찾고 있어요"（正在找一居室）——不是"我要找"，是"我现在持续在做这件事"。',
    rules: [
      '**基本公式**：动词词干 + 고 있어요 = 正在做___。无论词干有无收音，直接接"고"。例：찾다 → 찾고 있어요（正在找）；먹다 → 먹고 있어요（正在吃）',
      '**无收音同样直接接**：배우다 → 배우고 있어요（正在学）；하다 → 하고 있어요（正在做）。不需要加任何东西，词干后直接 + 고 있어요',
      '**过去进行**：고 있었어요 = 之前一直在做___。例：아까 공부하고 있었어요（刚才正在学习）。있어요 → 있었어요 变过去',
      '**否定形式**：안 + V고 있어요 = 没在做。例：지금 안 먹고 있어요（现在没在吃）。或者 V + 지 않고 있어요',
      '**与 ~는 중이에요 区别**：两者都表"正在"，但 ~고 있어요 更口语自然；~는 중이에요 更书面正式。日常对话优先用 고 있어요',
      '**穿戴状态**：고 있어요 还能表示穿戴的持续状态。모자를 쓰고 있어요 = 戴着帽子（不是"正在戴"的动作，而是"戴着"的状态）',
      '**하다 类动词**：공부하다 → 공부하고 있어요（正在学习）；요리하다 → 요리하고 있어요（正在做饭）。하다 前面的名词不分离',
    ],
    examples: [
      { ko: '원룸 찾고 있어요.', zh: '正在找一居室。', highlight: '고 있어요', note: '찾다 词干"찾"有收音 ㅈ，但接 고 不受影响，直接 찾 + 고 있어요' },
      { ko: '한국어 공부하고 있어요.', zh: '正在学韩语。', highlight: '고 있어요', note: '공부하다 词干"공부하"无收音 → 공부하고 있어요。하다 类最常见的例子' },
      { ko: '지금 뭐 하고 있어요?', zh: '你现在在做什么？', highlight: '고 있어요', note: '하다 → 하고 있어요?（疑问）。韩国人打电话第一句经常这么问' },
      { ko: '친구를 기다리고 있어요.', zh: '正在等朋友。', highlight: '고 있어요', note: '기다리다 词干"기다리"无收音 → 기다리고 있어요。를 因为 친구 无收音' },
      { ko: '안경을 쓰고 있어요.', zh: '戴着眼镜。', highlight: '고 있어요', note: '쓰다(戴) → 쓰고 있어요。这里表"状态"而非动作进行。穿戴类特殊用法' },
    ],
    pitfall:
      '① 고 있어요 前面只能接动词！不能接形容词。"正在漂亮" ❌ → 형용사 不能用 고 있어요。② 不要和 ~고 싶어요 混淆：고 있어요 = 正在做（进行）；고 싶어요 = 想做（愿望）。③ 살다(住) 特殊：살고 있어요 = 正住着（强调持续）；살아요 = 住（一般事实）。两个都对但语感不同。',
  },

  output: [
    {
      id: 'd16-o1',
      kind: 'compose',
      zhHint: '正在找一居室。',
      tokens: ['원룸', '찾고', '있어요', '찾아요', '싶어요', '찾을래요'],
      composeAnswer: ['원룸', '찾고', '있어요'],
      successMsg: '원룸 찾고 있어요 — Tori说出这句的时候，老犬中介笑了。',
    },
    {
      id: 'd16-o2',
      kind: 'listen-choice',
      audioKo: '보증금은 500만, 월세는 50만 정도요.',
      successMsg: '✓ 보증금 + 월세，韩国租房最核心的两个数字。',
      choices: [
        { zh: '押金500万，月租50万左右。', correct: true },
        { zh: '押金50万，月租500万左右。', correct: false },
        { zh: '房租一共550万。', correct: false },
        { zh: '我有500万存款。', correct: false },
      ],
    },
    {
      id: 'd16-o3',
      kind: 'zh-to-ko',
      zhPrompt: '正在学韩语。',
      successMsg: '"한국어 공부하고 있어요." — 공부하다 + 고 있어요，标准进行时。',
      choices: [
        { ko: '한국어 공부하고 있어요.', correct: true },
        { ko: '한국어 공부하고 싶어요.', correct: false },
        { ko: '한국어 공부해요.', correct: false },
        { ko: '한국어 공부하고 있다.', correct: false },
      ],
    },
    {
      id: 'd16-o4',
      kind: 'particle-error',
      zhHint: '正在找学校附近的一居室。',
      successMsg: '찾(有收音ㅈ) + 고 있어요；학교 근처 = 学校附近。',
      choices: [
        { ko: '학교 근처 원룸을 찾고 있어요.', correct: true },
        { ko: '학교 근처 원룸을 찾아 있어요.', correct: false },
        { ko: '학교 근처 원룸이 찾고 있어요.', correct: false },
        { ko: '학교 근처 원룸을 찾은 있어요.', correct: false },
      ],
    },
    {
      id: 'd16-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 16 核心词全对。下次看房，Tori就能听懂中介说什么了。',
      pairs: [
        { ko: '집', zh: '房子' },
        { ko: '원룸', zh: '一居室' },
        { ko: '보증금', zh: '押金' },
        { ko: '월세', zh: '月租' },
        { ko: '층', zh: '楼层' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '첫 번째 부동산 방문 완료! 토리, 잘했어요!',
    preview: '兽尔寸步难行的第一步——明天去地铁站办交通卡티머니카드，学会用"~주세요"向柜员开口。',
    stickerId: 'sticker-d16',
    sceneImageUrl: '/images/diary/day-16-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「고 있어요是什么意思？」「韩国租房的보증금和월세怎么区分？」',
};
