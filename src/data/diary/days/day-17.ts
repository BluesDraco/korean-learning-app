import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 17 · 티머니카드 · 拿到兽尔的钥匙
 *
 * 剧情：Tori去地铁站办T-money卡。严肃但温柔的猫头鹰售票员，眼镜片反着光。
 * 售票窗口旁有一张旧海报写着"제5층 안내"，被贴纸盖住一半。Tori没在意。
 * 办完卡的瞬间，她觉得自己拿到了兽尔的钥匙。
 *
 * 学习目标：~아/어 주세요（请帮我做……）/ 数字+货币 / 地铁词汇
 * 语料层级：해요体（面对陌生售票员，礼貌正式）
 * 韩语自审：korean skill PASS（자연성/문법/조사 三关）
 */
export const day17: ToriDay = {
  level: 'beginner',
  day: 17,
  phase: 'expansion',
  title: '交通卡 · 拿到兽尔的钥匙',
  subtitle: '猫头鹰售票员把卡推过来',
  heroImageUrl: '/images/diary/day-17-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 17일 · 화요일 아침',
    weather: '兽尔 · 阴',
    toriPose: 'shy',
    diaryText: `9月17日，周二早上。

今天要去办T-money卡——
没有这张卡，在兽尔寸步难行。

地铁站的售票窗口，
一只严肃的猫头鹰坐在里面，
眼镜片反着光。

窗口旁边有一张旧海报，
上面写着"제5층 안내"（第五层指引），
被贴纸盖住了一半。我没在意。

我走到窗口前，深呼吸。
"티머니카드 하나 주세요."

猫头鹰推过来一张蓝色的卡。
摸到卡的瞬间，我觉得——
这是兽尔的钥匙。`,
  },

  words: [
    {
      id: 'd17-w1',
      korean: '지하철',
      hangul: 'ji-ha-cheol',
      zh: '地铁',
      pos: '名词',
      example: { ko: '지하철역이 가까워요.', zh: '地铁站很近。' },
      tip: '지하(地下) + 철(铁) = 地铁。兽尔地铁是日常出行最主要的交通',
    },
    {
      id: 'd17-w2',
      korean: '티머니카드',
      hangul: 'ti-meo-ni-ka-deu',
      zh: '一卡通（T-money卡）',
      pos: '名词',
      example: { ko: '티머니카드 하나 주세요.', zh: '请给我一张T-money卡。' },
      tip: '韩国公交地铁通用卡。便利店也能用',
    },
    {
      id: 'd17-w3',
      korean: '충전',
      hangul: 'chung-jeon',
      zh: '充值',
      pos: '名词',
      example: { ko: '충전 해 주세요.', zh: '请帮我充值。' },
      tip: '충전하다 = 充值（动词）。편의점에서도 충전할 수 있어요',
    },
    {
      id: 'd17-w4',
      korean: '만 원',
      hangul: 'man won',
      zh: '一万韩元',
      pos: '名词',
      example: { ko: '만 원이요.', zh: '一万元。' },
      tip: '만(万) + 원(元)。韩国日常消费的基本单位',
    },
    {
      id: 'd17-w5',
      korean: '하나',
      hangul: 'ha-na',
      zh: '一个',
      pos: '名词',
      example: { ko: '카드 하나 주세요.', zh: '请给我一张卡。' },
      tip: '固有数词"一"。数物品时用하나/둘/셋/넷……',
    },
    {
      id: 'd17-w6',
      korean: '됐어요',
      hangul: 'dwae-sseo-yo',
      zh: '好了；可以了',
      pos: '动词',
      example: { ko: '네, 됐어요.', zh: '嗯，好了。' },
      tip: '되다(成为/完成) 的过去式。表示"搞定了/够了"',
    },
  ],

  dialogue: {
    scene: '地铁站售票窗口',
    setting: {
      time: '周二早上',
      place: '地铁站·售票窗口',
      npc: '猫头鹰售票员（严肃·戴眼镜）',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '티머니카드 하나 주세요.',
        hangul: 'ti-meo-ni-ka-deu ha-na ju-se-yo.',
        zh: '请给我一张T-money卡。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '猫头鹰售票员',
        ko: '카드는 4,000원이에요.',
        hangul: 'ka-deu-neun sa-cheon-won-i-e-yo.',
        zh: '卡是4000元。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '충전도 해 주세요. 만 원이요.',
        hangul: 'chung-jeon-do hae ju-se-yo. man won-i-yo.',
        zh: '也帮我充值。一万元。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '猫头鹰售票员',
        ko: '모두 14,000원이에요.',
        hangul: 'mo-du man-sa-cheon-won-i-e-yo.',
        zh: '一共14000元。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '5층? 지하철역에 5층이 있나?',
        hangul: 'o-cheung? ji-ha-cheol-yeo-ge o-cheung-i in-na?',
        zh: '5层？地铁站有5层吗？',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: 'Tori要付钱了。她想刷卡支付，应该怎么说？',
        practice: 'pick',
        choices: [
          { ko: '카드로 할게요.', zh: '我用卡付。', correct: true },
          { ko: '현금으로 주세요.', zh: '请给我现金。', correct: false },
          { ko: '카드 있어요?', zh: '你有卡吗？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '请帮我做……：~아/어 주세요',
    pattern: 'V词干 + **아/어 주세요** = 请（帮我）做___',
    whenToUse: '礼貌地请求别人帮自己做某事。比单纯的 ~세요 多了一层"为我"的感觉。Day 17 兔莉说"충전 해 주세요"（请帮我充值）——不是命令，是温和的请求。',
    rules: [
      '**基本公式**：动词词干 + 아/어 주세요 = 请帮我做___。아/어 的选择看词干最后一个元音：ㅏ/ㅗ → 아 주세요；其他 → 어 주세요',
      '**하다 类特殊**：하다 → 해 주세요。충전하다 → 충전해 주세요（请帮我充值）。所有 하다 类动词都变成 해 주세요',
      '**ㅏ/ㅗ 元音 → 아 주세요**：보다(看) → 봐 주세요（请帮我看/请给我看）；찾다(找) → 찾아 주세요（请帮我找）',
      '**其他元音 → 어 주세요**：가르치다(教) → 가르쳐 주세요（请教我）；기다리다(等) → 기다려 주세요（请等我）',
      '**与 ~(으)세요 区别**：~세요 是一般请求/命令（"请做"）；~아/어 주세요 强调"为我做"（"请帮我做"）。앉으세요 = 请坐；도와주세요 = 请帮帮我',
      '**도 的插入**：충전"도" 해 주세요 = "也"帮我充值。도(也) 放在名词后、动词前',
      '**缩略形式**：口语中 주세요 有时缩为 줘요（稍随意）或 줘（반말）。가르쳐 줘 = 教我吧（对朋友）',
    ],
    examples: [
      { ko: '충전 해 주세요.', zh: '请帮我充值。', highlight: '해 주세요', note: '충전하다 → 해 주세요。하다 类动词的"帮我做"标准形式' },
      { ko: '카드 하나 주세요.', zh: '请给我一张卡。', highlight: '주세요', note: '주다(给) + 세요 = 주세요。这里不需要 아/어，因为"给"本身就是 주다' },
      { ko: '도와주세요.', zh: '请帮帮我。', highlight: '아 주세요', note: '돕다(帮) → 도와(ㅂ不规则变化) + 주세요。紧急求助时的必备句' },
      { ko: '잠깐 기다려 주세요.', zh: '请稍等一下。', highlight: '어 주세요', note: '기다리다 词干"기다리"末元音 ㅣ → 어 주세요。기다리 + 어 = 기다려' },
      { ko: '사진 찍어 주세요.', zh: '请帮我拍照。', highlight: '어 주세요', note: '찍다(拍) 词干"찍"末元音 ㅣ → 어 주세요。旅行时最实用的一句' },
    ],
    pitfall:
      '① 주세요 ≠ 아/어 주세요：물 주세요 = 请给我水（주다本身）；물 사 주세요 = 请帮我买水（사다 + 아 주세요）。区分"给"和"帮做"。② 하다 类永远是 해 주세요，不是 하아 주세요 ❌。③ 돕다 是 ㅂ 不规则动词：돕 + 아 → 도와（不是 돕아 ❌）→ 도와 주세요。',
  },

  output: [
    {
      id: 'd17-o1',
      kind: 'compose',
      zhHint: '请帮我充值。一万元。',
      tokens: ['충전', '해', '주세요', '만', '원이요', '할게요', '있어요'],
      composeAnswer: ['충전', '해', '주세요'],
      successMsg: '충전 해 주세요 — 猫头鹰点了点头，开始操作。',
    },
    {
      id: 'd17-o2',
      kind: 'listen-choice',
      audioKo: '모두 14,000원이에요.',
      successMsg: '✓ 카드 4000 + 충전 10000 = 모두 14000원。算对了。',
      choices: [
        { zh: '一共14000元。', correct: true },
        { zh: '一共4000元。', correct: false },
        { zh: '一共10000元。', correct: false },
        { zh: '找您14000元。', correct: false },
      ],
    },
    {
      id: 'd17-o3',
      kind: 'zh-to-ko',
      zhPrompt: '请帮我拍照。',
      successMsg: '"사진 찍어 주세요." — 찍다 + 어 주세요，旅行必备句。',
      choices: [
        { ko: '사진 찍어 주세요.', correct: true },
        { ko: '사진 찍으세요.', correct: false },
        { ko: '사진 찍아 주세요.', correct: false },
        { ko: '사진 찍고 있어요.', correct: false },
      ],
    },
    {
      id: 'd17-o4',
      kind: 'particle-error',
      zhHint: '请帮我充值。',
      successMsg: '충전하다 → 해 주세요（하다类标准变化）。不是 하아 주세요。',
      choices: [
        { ko: '충전 해 주세요.', correct: true },
        { ko: '충전 하아 주세요.', correct: false },
        { ko: '충전 하여 주세요.', correct: false },
        { ko: '충전 해 줘세요.', correct: false },
      ],
    },
    {
      id: 'd17-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 17 全对。有了T-money卡，兽尔的地铁随你坐。',
      pairs: [
        { ko: '지하철', zh: '地铁' },
        { ko: '티머니카드', zh: '一卡通' },
        { ko: '충전', zh: '充值' },
        { ko: '만 원', zh: '一万韩元' },
        { ko: '하나', zh: '一个' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '티머니카드 get! 이제 서울 어디든 갈 수 있어요!',
    preview: '明天要去수민은행开户——第一本韩国存折(통장)怎么办？学费、房租都得靠它。',
    stickerId: 'sticker-d17',
    sceneImageUrl: '/images/diary/day-17-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「아/어 주세요和 세요有什么区别？」「韩国地铁怎么充值？」',
};
