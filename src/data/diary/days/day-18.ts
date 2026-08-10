import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 18 · 수민은행 · 第一本韩国通帐
 *
 * 剧情：Tori带着外国人登录证去수민은행（兽民银行）。
 * 柜台后的乌龟柜员每个字都像从壳里慢慢推出来。
 * Tori反而全听懂了——因为慢。第一本韩国存折到手。
 *
 * 学习目标：~고 싶어요（想要做……）复习 / 银行词汇 / 证件表达
 * 语料层级：해요体 + 합쇼체（银行正式场合混用）
 * 韩语自审：korean skill PASS（자연성/문법/조사 三关）
 */
export const day18: ToriDay = {
  level: 'beginner',
  day: 18,
  phase: 'expansion',
  title: '兽民银行 · 第一本韩国存折',
  subtitle: '乌龟柜员说话非常慢',
  heroImageUrl: '/images/diary/day-18-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 18일 · 수요일 오전',
    weather: '兽尔 · 多云',
    toriPose: 'shy',
    diaryText: `9月18日，周三上午。

今天的任务：去银行开户。
没有韩国的存折，生活费没法收、月租没法付。

수민은행（兽民银行）——
名字听起来像是给动物们开的银行。
门口果然站着一只打领带的松鼠保安。

柜台后面，
一只乌龟慢吞吞地从壳里抬起头。
"어떻게… 오셨어요…?"
（您……要办什么……？）

每个字都像从壳里慢慢推出来。
我反而全听懂了——因为慢。
谢谢你，乌龟先生。`,
  },

  words: [
    {
      id: 'd18-w1',
      korean: '은행',
      hangul: 'eun-haeng',
      zh: '银行',
      pos: '名词',
      example: { ko: '은행에 가야 해요.', zh: '得去银行。' },
      tip: '은(银) + 행(行)。韩国主要银行有国民、新韩、友利等',
    },
    {
      id: 'd18-w2',
      korean: '통장',
      hangul: 'tong-jang',
      zh: '存折',
      pos: '名词',
      example: { ko: '통장 만들고 싶어요.', zh: '我想开存折。' },
      tip: '통(通) + 장(帐)。韩国银行至今仍发纸质存折',
    },
    {
      id: 'd18-w3',
      korean: '비밀번호',
      hangul: 'bi-mil-beon-ho',
      zh: '密码',
      pos: '名词',
      example: { ko: '비밀번호를 입력해 주세요.', zh: '请输入密码。' },
      tip: '비밀(秘密) + 번호(番号)。韩国银行密码通常是4位或6位数字',
    },
    {
      id: 'd18-w4',
      korean: '외국인등록증',
      hangul: 'oe-gu-gin-deung-nok-jeung',
      zh: '外国人登录证',
      pos: '名词',
      example: { ko: '외국인등록증 가져왔어요.', zh: '带了外国人登录证。' },
      tip: '在韩国超过90天的外国人必须办理。开户、办手机都需要',
    },
    {
      id: 'd18-w5',
      korean: '만들고 싶어요',
      hangul: 'man-deul-go si-peo-yo',
      zh: '想做/想办',
      pos: '表达',
      example: { ko: '통장 만들고 싶어요.', zh: '我想开存折。' },
      tip: '만들다(做/制作) + 고 싶어요(想)。Day 15学过的语法再次出场',
    },
    {
      id: 'd18-w6',
      korean: '사인',
      hangul: 'sa-in',
      zh: '签名',
      pos: '名词',
      example: { ko: '여기에 사인해 주세요.', zh: '请在这里签名。' },
      tip: '英语 sign 的韩式外来语。서명(署名) 更正式但口语多用 사인',
    },
  ],

  dialogue: {
    scene: '兽民银行·开户柜台',
    setting: {
      time: '周三上午',
      place: '수민은행（兽民银行）',
      npc: '乌龟柜员（说话很慢）',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '乌龟柜员',
        ko: '어떻게… 오셨어요…?',
        hangul: 'eo-tteo-ke… o-syeo-sseo-yo…?',
        zh: '您……要办什么……？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '통장 만들고 싶어요. 학생이에요.',
        hangul: 'tong-jang man-deul-go si-peo-yo. hak-saeng-i-e-yo.',
        zh: '我想开户。我是学生。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '乌龟柜员',
        ko: '외국인등록증이랑… 여권… 부탁드립니다.',
        hangul: 'oe-gu-gin-deung-nok-jeung-i-rang… yeo-gwon… bu-tak-deu-rim-ni-da.',
        zh: '请给……登录证和……护照。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '여기 있어요.',
        hangul: 'yeo-gi i-sseo-yo.',
        zh: '在这里。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '乌龟柜员',
        ko: '비밀번호… 네 자리… 입력해 주세요.',
        hangul: 'bi-mil-beon-ho… ne ja-ri… im-nyeo-kae ju-se-yo.',
        zh: '请输入……四位……密码。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '거북이님 천천히 말해 줘서 오히려 좋아.',
        hangul: 'geo-bu-gi-nim cheon-cheon-hi mal-hae jwo-seo o-hi-ryeo jo-a.',
        zh: '乌龟先生说慢反而好。',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: '乌龟柜员让Tori输入密码，Tori应该怎么回应？',
        practice: 'pick',
        choices: [
          { ko: '네, 알겠습니다.', zh: '好的，我知道了。', correct: true },
          { ko: '비밀번호가 뭐예요?', zh: '密码是什么？', correct: false },
          { ko: '통장 주세요.', zh: '请给我存折。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '想要做……：~고 싶어요（复习+深化）',
    pattern: 'V词干 + **고 싶어요** = 想做___',
    whenToUse: 'Day 15 首次学了 ~고 싶어요，今天在银行实战应用。만들다 → 만들고 싶어요（想办/想做）。这次重点看不规则动词 만들다 如何接 고 싶어요，以及疑问句 뭐 V고 싶어요?',
    rules: [
      '**复习公式**：动词词干 + 고 싶어요 = 想做___。词干有无收音都直接接"고"',
      '**만들다 接法**：만들다 词干"만들"有收音 ㄹ → 直接 + 고 싶어요 = 만들고 싶어요。ㄹ 收音不影响 고 的接续',
      '**疑问句**：뭐 + V고 싶어요? = 想做什么？例：뭐 먹고 싶어요?（想吃什么？）/ 뭐 하고 싶어요?（想做什么？）',
      '**第三人称**：描述别人"想做"用 ~고 싶어해요。친구가 한국에 가고 싶어해요（朋友想去韩国）。고 싶어요 只用于"我想/你想？"',
      '**过去想**：~고 싶었어요 = 以前想做___。통장 만들고 싶었어요（之前一直想开存折）',
      '**否定**：~고 싶지 않아요 = 不想做___。기다리고 싶지 않아요（不想等）',
      '**실전搭配**：在银行/机构，"想办___"的万能句式 = [名词] + 만들고 싶어요 / 하고 싶어요。카드 만들고 싶어요（想办卡）/ 계좌 개설하고 싶어요（想开账户）',
    ],
    examples: [
      { ko: '통장 만들고 싶어요.', zh: '我想开存折。', highlight: '고 싶어요', note: '만들다 词干"만들"收音 ㄹ + 고 싶어요。在银行说这句就能开户' },
      { ko: '뭐 먹고 싶어요?', zh: '想吃什么？', highlight: '고 싶어요', note: '먹다 + 고 싶어요 的疑问形式。韩国朋友约饭时必问的一句' },
      { ko: '한국어를 잘하고 싶어요.', zh: '我想学好韩语。', highlight: '고 싶어요', note: '잘하다(做好) 词干"잘하"无收音 → 잘하고 싶어요。表达学习目标' },
      { ko: '카드도 만들고 싶어요.', zh: '也想办卡。', highlight: '고 싶어요', note: '도(也) 放在名词后：카드 + 도。만들고 싶어요 和 Day 的통장句式一样' },
      { ko: '친구가 여행 가고 싶어해요.', zh: '朋友想去旅行。', highlight: '고 싶어해요', note: '第三人称用 싶어해요（不是 싶어요）。가다 + 고 싶어하다 + 어요' },
    ],
    pitfall:
      '① 만들다 的 ㄹ 收音在接 고 时保留不变：만들 + 고 = 만들고 ✓（不是 만드고 ❌）。② 고 싶어요 只能接动词！"想漂亮"不能说 예쁘고 싶어요 ❌ → 예뻐지고 싶어요 ✓。③ 第三人称必须用 ~고 싶어해요，不能用 ~고 싶어요 描述别人。',
  },

  output: [
    {
      id: 'd18-o1',
      kind: 'compose',
      zhHint: '我想开存折。',
      tokens: ['통장', '만들고', '싶어요', '만들어요', '있어요', '만들래요'],
      composeAnswer: ['통장', '만들고', '싶어요'],
      successMsg: '통장 만들고 싶어요 — 乌龟柜员慢慢点了点头。',
    },
    {
      id: 'd18-o2',
      kind: 'listen-choice',
      audioKo: '외국인등록증이랑 여권 주세요.',
      successMsg: '✓ 등록증 + 여권，开户必备的两个证件。',
      choices: [
        { zh: '请给登录证和护照。', correct: true },
        { zh: '请给存折和密码。', correct: false },
        { zh: '请输入密码。', correct: false },
        { zh: '请签名。', correct: false },
      ],
    },
    {
      id: 'd18-o3',
      kind: 'zh-to-ko',
      zhPrompt: '想吃什么？',
      successMsg: '"뭐 먹고 싶어요?" — 고 싶어요 的疑问句，约饭必备。',
      choices: [
        { ko: '뭐 먹고 싶어요?', correct: true },
        { ko: '뭐 먹을래요?', correct: false },
        { ko: '뭐 먹고 있어요?', correct: false },
        { ko: '뭐 먹어 주세요?', correct: false },
      ],
    },
    {
      id: 'd18-o4',
      kind: 'particle-error',
      zhHint: '我想开存折。',
      successMsg: '만들다 词干"만들" ㄹ收音保留 + 고 싶어요。不是 만드고。',
      choices: [
        { ko: '통장 만들고 싶어요.', correct: true },
        { ko: '통장 만드고 싶어요.', correct: false },
        { ko: '통장 만들고 싶다요.', correct: false },
        { ko: '통장 만들고 싶어해요.', correct: false },
      ],
    },
    {
      id: 'd18-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 18 全对。第一本韩国存折到手！',
      pairs: [
        { ko: '은행', zh: '银行' },
        { ko: '통장', zh: '存折' },
        { ko: '비밀번호', zh: '密码' },
        { ko: '외국인등록증', zh: '外国人登录证' },
        { ko: '사인', zh: '签名' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '첫 번째 한국 통장 완성! 토리, 이제 진짜 서울 시민이에요!',
    preview: '存折有了——下次去医院能不能也这么顺利？',
    stickerId: 'sticker-d18',
    sceneImageUrl: '/images/diary/day-18-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「만들다接고싶어요为什么不去掉ㄹ？」「韩国开户需要什么证件？」',
};
