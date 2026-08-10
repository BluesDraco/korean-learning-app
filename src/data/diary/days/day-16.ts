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
  title: '中介所 · 第一次说"我在找房子"', titleEn: 'Realtor\'s office · First time saying "I\'m looking for a place"',
  subtitle: '老犬中介翻开了厚厚的册子', subtitleEn: 'The old dog realtor opened a thick booklet',
  heroImageUrl: '/images/diary/day-16-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 16일 · 월요일 오후',
    weather: '兽尔 · 微风', weatherEn: 'Seoul · Breeze',
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
      zh: '家；房子', zhEn: 'home; house',
      pos: '名词', posEn: 'Noun',
      example: { ko: '어떤 집 찾으세요?', zh: '您找什么样的房子？', zhEn: 'What kind of house are you looking for?' },
      tip: '집 有收音 ㅂ。"집이"连读时发 [지비]', tipEn: '집 has the final consonant ㅂ. When "집이" is linked, it\'s pronounced [지비]',
    },
    {
      id: 'd16-w2',
      korean: '원룸',
      hangul: 'won-rum',
      zh: '一居室', zhEn: 'studio',
      pos: '名词', posEn: 'Noun',
      example: { ko: '원룸 찾고 있어요.', zh: '我在找一居室。', zhEn: 'I\'m looking for a studio.' },
      tip: '원(one) + 룸(room)，韩式外来语。指独立的单间套房', tipEn: '원(one) + 룸(room), a Korean loanword. Refers to an independent single-room suite',
    },
    {
      id: 'd16-w3',
      korean: '보증금',
      hangul: 'bo-jeung-geum',
      zh: '押金', zhEn: 'deposit',
      pos: '名词', posEn: 'Noun',
      example: { ko: '보증금은 500만 원이에요.', zh: '押金是500万韩元。', zhEn: 'The deposit is 5 million won.' },
      tip: '보증(保证) + 금(金)。韩国租房第一个要谈的数字', tipEn: '보증(guarantee) + 금(money). The first number to discuss when renting in Korea',
    },
    {
      id: 'd16-w4',
      korean: '월세',
      hangul: 'wol-se',
      zh: '月租', zhEn: 'monthly rent',
      pos: '名词', posEn: 'Noun',
      example: { ko: '월세는 50만 원 정도요.', zh: '月租50万韩元左右。', zhEn: 'The monthly rent is around 500,000 won.' },
      tip: '월(月) + 세(税/租)。和보증금一起是韩国租房核心词', tipEn: '월(month) + 세(tax/rent). Together with 보증금, it\'s a core term in Korean housing',
    },
    {
      id: 'd16-w5',
      korean: '찾고 있어요',
      hangul: 'chat-go i-sseo-yo',
      zh: '正在找', zhEn: 'looking for',
      pos: '表达', posEn: 'Expression',
      example: { ko: '학교 근처 원룸을 찾고 있어요.', zh: '正在找学校附近的一居室。', zhEn: 'I\'m looking for a studio near school.' },
      tip: '찾다(找) + 고 있어요(正在) = 正在找。今天的核心语法', tipEn: '찾다(to find) + 고 있어요(am doing) = looking for. Today\'s core grammar',
    },
    {
      id: 'd16-w6',
      korean: '층',
      hangul: 'cheung',
      zh: '楼层', zhEn: 'floor',
      pos: '名词', posEn: 'Noun',
      example: { ko: '3층 원룸 보여 주세요.', zh: '请给我看3楼的一居室。', zhEn: 'Please show me a studio on the 3rd floor.' },
      tip: '数字 + 층。韩国公寓从1층(1楼)数起', tipEn: 'Number + 층. Korean apartments start counting from 1층 (1st floor)',
    },
  ],

  dialogue: {
    scene: '幸福房产·第一次看房', sceneEn: 'Happy Realty · First House Viewing',
    setting: {
      time: '周一下午', timeEn: 'Monday afternoon',
      place: '행복부동산（幸福房产）', placeEn: '행복부동산 (Happy Realty)',
      npc: '老犬中介（金毛老犬·戴老花镜）', npcEn: 'Old Dog Agent (Golden Retriever with reading glasses)',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '老犬中介', npcNameEn: 'Old Dog Agent',
        ko: '어서 오세요. 어떤 집 찾으세요?',
        hangul: 'eo-seo o-se-yo. eo-tteon jip cha-jeu-se-yo?',
        zh: '欢迎。您找什么样的房子？', zhEn: 'Welcome. What kind of house are you looking for?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '원룸 찾고 있어요. 학교 근처로요.',
        hangul: 'won-rum chat-go i-sseo-yo. hak-gyo geun-cheo-ro-yo.',
        zh: '我在找一居室。学校附近的。', zhEn: 'I\'m looking for a studio. Near the school.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '老犬中介', npcNameEn: 'Old Dog Agent',
        ko: '보증금이랑 월세는 얼마까지 가능해요?',
        hangul: 'bo-jeung-geum-i-rang wol-se-neun eol-ma-kka-ji ga-neung-hae-yo?',
        zh: '押金和月租预算多少？', zhEn: 'What\'s your budget for deposit and monthly rent?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '보증금은 500만, 월세는 50만 정도요.',
        hangul: 'bo-jeung-geu-meun o-baek-man, wol-se-neun o-sip-man jeong-do-yo.',
        zh: '押金500万，月租50万左右。', zhEn: 'Deposit is 5 million won, and monthly rent is around 500,000 won.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '老犬中介', npcNameEn: 'Old Dog Agent',
        ko: '음… 학교 근처에 괜찮은 데가 하나 있어요.',
        hangul: 'eum… hak-gyo geun-cheo-e gwaen-chan-eun de-ga ha-na i-sseo-yo.',
        zh: '嗯……学校附近有一个不错的。', zhEn: 'Hmm... there\'s a nice one near the school.',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: 'Tori想看3楼采光好的房间，她应该怎么说？', zhEn: 'Tori wants to see a room on the 3rd floor with good lighting. What should she say?',
        practice: 'pick',
        choices: [
          { ko: '3층 원룸 보여 주세요.', zh: '请给我看3楼的一居室。', zhEn: 'Please show me a studio on the 3rd floor.', correct: true },
          { ko: '3층 집 사고 싶어요.', zh: '想买3楼的房子。', zhEn: 'I want to buy a house on the 3rd floor.', correct: false },
          { ko: '3층에 살고 있어요.', zh: '我住在3楼。', zhEn: 'I live on the 3rd floor.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '正在做……：~고 있어요', titleEn: 'Doing...: ~고 있어요',
    pattern: 'V词干 + **고 있어요** = 正在做___', patternEn: 'V stem + **고 있어요** = doing ___',
    whenToUse: '表示动作正在进行中。相当于中文的"正在……"。Day 16 兔莉说"원룸 찾고 있어요"（正在找一居室）——不是"我要找"，是"我现在持续在做这件事"。', whenToUseEn: 'Indicates an action in progress. Equivalent to "doing..." in Chinese. On Day 16, Tori says "원룸 찾고 있어요" (looking for a studio) — not "I want to find," but "I\'m currently in the middle of doing this."',
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
      { ko: '원룸 찾고 있어요.', zh: '正在找一居室。', zhEn: 'I\'m looking for a studio.', highlight: '고 있어요', note: '찾다 词干"찾"有收音 ㅈ，但接 고 不受影响，直接 찾 + 고 있어요', noteEn: 'The stem of 찾다 is "찾," which has the final consonant ㅈ, but adding 고 is unaffected — just 찾 + 고 있어요.' },
      { ko: '한국어 공부하고 있어요.', zh: '正在学韩语。', zhEn: 'I\'m learning Korean.', highlight: '고 있어요', note: '공부하다 词干"공부하"无收音 → 공부하고 있어요。하다 类最常见的例子', noteEn: 'The stem of 공부하다 is "공부하" with no final consonant → 공부하고 있어요. This is the most common example of the 하다 type.' },
      { ko: '지금 뭐 하고 있어요?', zh: '你现在在做什么？', zhEn: 'What are you doing right now?', highlight: '고 있어요', note: '하다 → 하고 있어요?（疑问）。韩国人打电话第一句经常这么问', noteEn: '하다 → 하고 있어요? (question). Koreans often ask this as the first thing on the phone.' },
      { ko: '친구를 기다리고 있어요.', zh: '正在等朋友。', zhEn: 'I\'m waiting for a friend.', highlight: '고 있어요', note: '기다리다 词干"기다리"无收音 → 기다리고 있어요。를 因为 친구 无收音', noteEn: 'The stem of 기다리다 is "기다리" with no final consonant → 기다리고 있어요. 를 is used because 친구 has no final consonant.' },
      { ko: '안경을 쓰고 있어요.', zh: '戴着眼镜。', zhEn: 'I\'m wearing glasses.', highlight: '고 있어요', note: '쓰다(戴) → 쓰고 있어요。这里表"状态"而非动作进行。穿戴类特殊用法', noteEn: '쓰다 (wear) → 쓰고 있어요. Here it indicates a "state" rather than an ongoing action. This is a special usage for wearing items.' },
    ],
    pitfall:
      '① 고 있어요 前面只能接动词！不能接形容词。"正在漂亮" ❌ → 형용사 不能用 고 있어요。② 不要和 ~고 싶어요 混淆：고 있어요 = 正在做（进行）；고 싶어요 = 想做（愿望）。③ 살다(住) 特殊：살고 있어요 = 正住着（强调持续）；살아요 = 住（一般事实）。两个都对但语感不同。',
  },

  output: [
    {
      id: 'd16-o1',
      kind: 'compose',
      zhHint: '正在找一居室。', zhHintEn: 'I\'m looking for a studio.',
      tokens: ['원룸', '찾고', '있어요', '찾아요', '싶어요', '찾을래요'],
      composeAnswer: ['원룸', '찾고', '있어요'],
      successMsg: '원룸 찾고 있어요 — Tori说出这句的时候，老犬中介笑了。', successMsgEn: '원룸 찾고 있어요 — When Tori says this, the old dog real estate agent smiles.',
    },
    {
      id: 'd16-o2',
      kind: 'listen-choice',
      audioKo: '보증금은 500만, 월세는 50만 정도요.',
      successMsg: '✓ 보증금 + 월세，韩国租房最核心的两个数字。', successMsgEn: '✓ Deposit + monthly rent — the two most essential numbers for renting in Korea.',
      choices: [
        { zh: '押金500万，月租50万左右。', zhEn: 'Deposit is 5 million won, and monthly rent is around 500,000 won.', correct: true },
        { zh: '押金50万，月租500万左右。', zhEn: 'Deposit is 500,000 won, and monthly rent is around 5 million won.', correct: false },
        { zh: '房租一共550万。', zhEn: 'The total rent is 5.5 million won.', correct: false },
        { zh: '我有500万存款。', zhEn: 'I have 5 million won in savings.', correct: false },
      ],
    },
    {
      id: 'd16-o3',
      kind: 'zh-to-ko',
      zhPrompt: '正在学韩语。', zhPromptEn: 'I\'m learning Korean.',
      successMsg: '"한국어 공부하고 있어요." — 공부하다 + 고 있어요，标准进行时。', successMsgEn: '"한국어 공부하고 있어요." — 공부하다 + 고 있어요, the standard progressive form.',
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
      zhHint: '正在找学校附近的一居室。', zhHintEn: 'I\'m looking for a studio near school.',
      successMsg: '찾(有收音ㅈ) + 고 있어요；학교 근처 = 学校附近。', successMsgEn: '찾(받침 ㅈ) + 고 있어요; 학교 근처 = near the school.',
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
      successMsg: '✓ Day 16 核心词全对。下次看房，Tori就能听懂中介说什么了。', successMsgEn: '✓ Day 16 core words all correct. Next time you view a house, Tori will understand what the agent says.',
      pairs: [
        { ko: '집', zh: '房子', zhEn: 'house' },
        { ko: '원룸', zh: '一居室', zhEn: 'studio' },
        { ko: '보증금', zh: '押金', zhEn: 'deposit' },
        { ko: '월세', zh: '月租', zhEn: 'monthly rent' },
        { ko: '층', zh: '楼层', zhEn: 'floor' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '첫 번째 부동산 방문 완료! 토리, 잘했어요!',
    preview: '兽尔寸步难行的第一步——明天去地铁站办交通卡티머니카드，学会用"~주세요"向柜员开口。', previewEn: 'The first step to getting around in Seoul—tomorrow, go to the subway station to get a T-money card and learn to use "~주세요" when talking to the clerk.',
    stickerId: 'sticker-d16',
    sceneImageUrl: '/images/diary/day-16-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「고 있어요是什么意思？」「韩国租房的보증금和월세怎么区分？」',
};
