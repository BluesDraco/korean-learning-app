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
  title: '兽民银行 · 第一本韩国存折', titleEn: 'Sumin Bank · My First Korean Bankbook',
  subtitle: '乌龟柜员说话非常慢', subtitleEn: 'The turtle teller speaks very slowly',
  heroImageUrl: '/images/diary/day-18-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 18일 · 수요일 오전',
    weather: '兽尔 · 多云', weatherEn: 'Seoul · Cloudy',
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
      zh: '银行', zhEn: 'bank',
      pos: '名词', posEn: 'Noun',
      example: { ko: '은행에 가야 해요.', zh: '得去银行。', zhEn: 'I need to go to the bank.' },
      tip: '은(银) + 행(行)。韩国主要银行有国民、新韩、友利等', tipEn: '은(银) + 행(行). Major Korean banks include Kookmin, Shinhan, Woori, etc.',
    },
    {
      id: 'd18-w2',
      korean: '통장',
      hangul: 'tong-jang',
      zh: '存折', zhEn: 'bankbook',
      pos: '名词', posEn: 'Noun',
      example: { ko: '통장 만들고 싶어요.', zh: '我想开存折。', zhEn: 'I\'d like to open a bankbook.' },
      tip: '통(通) + 장(帐)。韩国银行至今仍发纸质存折', tipEn: '통(通) + 장(帐). Korean banks still issue paper bankbooks.',
    },
    {
      id: 'd18-w3',
      korean: '비밀번호',
      hangul: 'bi-mil-beon-ho',
      zh: '密码', zhEn: 'PIN',
      pos: '名词', posEn: 'Noun',
      example: { ko: '비밀번호를 입력해 주세요.', zh: '请输入密码。', zhEn: 'Please enter your PIN.' },
      tip: '비밀(秘密) + 번호(番号)。韩国银行密码通常是4位或6位数字', tipEn: '비밀(秘密) + 번호(番号). Korean bank PINs are usually 4 or 6 digits.',
    },
    {
      id: 'd18-w4',
      korean: '외국인등록증',
      hangul: 'oe-gu-gin-deung-nok-jeung',
      zh: '外国人登录证', zhEn: 'Alien Registration Card',
      pos: '名词', posEn: 'Noun',
      example: { ko: '외국인등록증 가져왔어요.', zh: '带了外国人登录证。', zhEn: 'I brought my Alien Registration Card.' },
      tip: '在韩国超过90天的外国人必须办理。开户、办手机都需要', tipEn: 'Required for foreigners staying over 90 days in Korea. Needed for opening accounts and getting a phone.',
    },
    {
      id: 'd18-w5',
      korean: '만들고 싶어요',
      hangul: 'man-deul-go si-peo-yo',
      zh: '想做/想办', zhEn: 'want to do/make',
      pos: '表达', posEn: 'Expression',
      example: { ko: '통장 만들고 싶어요.', zh: '我想开存折。', zhEn: 'I\'d like to open a bankbook.' },
      tip: '만들다(做/制作) + 고 싶어요(想)。Day 15学过的语法再次出场',
    },
    {
      id: 'd18-w6',
      korean: '사인',
      hangul: 'sa-in',
      zh: '签名', zhEn: 'Signature',
      pos: '名词', posEn: 'Noun',
      example: { ko: '여기에 사인해 주세요.', zh: '请在这里签名。', zhEn: 'Please sign here.' },
      tip: '英语 sign 的韩式外来语。서명(署名) 更正式但口语多用 사인', tipEn: 'Korean loanword from English \'sign.\' 서명(署名) is more formal, but 사인 is common in speech.',
    },
  ],

  dialogue: {
    scene: '兽民银行·开户柜台', sceneEn: 'Su-min Bank · Account Opening Counter',
    setting: {
      time: '周三上午', timeEn: 'Wednesday morning',
      place: '수민은행（兽民银行）', placeEn: 'Su-min Bank (Su-min Bank)',
      npc: '乌龟柜员（说话很慢）', npcEn: 'Turtle Teller (speaks very slowly)',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '乌龟柜员', npcNameEn: 'Turtle Teller',
        ko: '어떻게… 오셨어요…?',
        hangul: 'eo-tteo-ke… o-syeo-sseo-yo…?',
        zh: '您……要办什么……？', zhEn: 'What... can I help you... with?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '통장 만들고 싶어요. 학생이에요.',
        hangul: 'tong-jang man-deul-go si-peo-yo. hak-saeng-i-e-yo.',
        zh: '我想开户。我是学生。', zhEn: 'I\'d like to open an account. I\'m a student.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '乌龟柜员', npcNameEn: 'Turtle Teller',
        ko: '외국인등록증이랑… 여권… 부탁드립니다.',
        hangul: 'oe-gu-gin-deung-nok-jeung-i-rang… yeo-gwon… bu-tak-deu-rim-ni-da.',
        zh: '请给……登录证和……护照。', zhEn: 'Please give me... your ID and... passport.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '여기 있어요.',
        hangul: 'yeo-gi i-sseo-yo.',
        zh: '在这里。', zhEn: 'Here it is.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '乌龟柜员', npcNameEn: 'Turtle Teller',
        ko: '비밀번호… 네 자리… 입력해 주세요.',
        hangul: 'bi-mil-beon-ho… ne ja-ri… im-nyeo-kae ju-se-yo.',
        zh: '请输入……四位……密码。', zhEn: 'Please enter... a four-digit... PIN.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '거북이님 천천히 말해 줘서 오히려 좋아.',
        hangul: 'geo-bu-gi-nim cheon-cheon-hi mal-hae jwo-seo o-hi-ryeo jo-a.',
        zh: '乌龟先生说慢反而好。', zhEn: 'Turtle\'s slow pace is actually a good thing.',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: '乌龟柜员让Tori输入密码，Tori应该怎么回应？', zhEn: 'The Turtle Teller asks Tori to enter a PIN. How should Tori respond?',
        practice: 'pick',
        choices: [
          { ko: '네, 알겠습니다.', zh: '好的，我知道了。', zhEn: 'Okay, got it.', correct: true },
          { ko: '비밀번호가 뭐예요?', zh: '密码是什么？', zhEn: 'What\'s the PIN?', correct: false },
          { ko: '통장 주세요.', zh: '请给我存折。', zhEn: 'Please give me a passbook.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '想要做……：~고 싶어요（复习+深化）', titleEn: 'Want to do...: ~고 싶어요 (Review + Deep Dive)',
    pattern: 'V词干 + **고 싶어요** = 想做___', patternEn: 'V-stem + **고 싶어요** = want to do ___',
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
      { ko: '통장 만들고 싶어요.', zh: '我想开存折。', zhEn: 'I\'d like to open a bankbook.', highlight: '고 싶어요', note: '만들다 词干"만들"收音 ㄹ + 고 싶어요。在银行说这句就能开户', noteEn: 'The stem of 만들다 is "만들" with the final consonant ㄹ + 고 싶어요. Say this at the bank to open an account.' },
      { ko: '뭐 먹고 싶어요?', zh: '想吃什么？', zhEn: 'What do you want to eat?', highlight: '고 싶어요', note: '먹다 + 고 싶어요 的疑问形式。韩国朋友约饭时必问的一句', noteEn: 'The question form of 먹다 + 고 싶어요. A must-ask when Korean friends invite you to eat.' },
      { ko: '한국어를 잘하고 싶어요.', zh: '我想学好韩语。', zhEn: 'I want to learn Korean well.', highlight: '고 싶어요', note: '잘하다(做好) 词干"잘하"无收音 → 잘하고 싶어요。表达学习目标', noteEn: 'The stem "잘하" has no final consonant → 잘하고 싶어요. Expresses a learning goal.' },
      { ko: '카드도 만들고 싶어요.', zh: '也想办卡。', zhEn: 'I want to get a card too.', highlight: '고 싶어요', note: '도(也) 放在名词后：카드 + 도。만들고 싶어요 和 Day 的통장句式一样', noteEn: '도 (also) goes after a noun: 카드 + 도. 만들고 싶어요 follows the same pattern as the 통장 sentence from Day.' },
      { ko: '친구가 여행 가고 싶어해요.', zh: '朋友想去旅行。', zhEn: 'My friend wants to travel.', highlight: '고 싶어해요', note: '第三人称用 싶어해요（不是 싶어요）。가다 + 고 싶어하다 + 어요', noteEn: 'For third person, use 싶어해요 (not 싶어요). 가다 + 고 싶어하다 + 어요.' },
    ],
    pitfall:
      '① 만들다 的 ㄹ 收音在接 고 时保留不变：만들 + 고 = 만들고 ✓（不是 만드고 ❌）。② 고 싶어요 只能接动词！"想漂亮"不能说 예쁘고 싶어요 ❌ → 예뻐지고 싶어요 ✓。③ 第三人称必须用 ~고 싶어해요，不能用 ~고 싶어요 描述别人。',
  },

  output: [
    {
      id: 'd18-o1',
      kind: 'compose',
      zhHint: '我想开存折。', zhHintEn: 'I\'d like to open a bankbook.',
      tokens: ['통장', '만들고', '싶어요', '만들어요', '있어요', '만들래요'],
      composeAnswer: ['통장', '만들고', '싶어요'],
      successMsg: '통장 만들고 싶어요 — 乌龟柜员慢慢点了点头。', successMsgEn: 'I want to open a bankbook — the turtle teller nodded slowly.',
    },
    {
      id: 'd18-o2',
      kind: 'listen-choice',
      audioKo: '외국인등록증이랑 여권 주세요.',
      successMsg: '✓ 등록증 + 여권，开户必备的两个证件。', successMsgEn: '✓ Alien registration card + passport, the two documents needed to open an account.',
      choices: [
        { zh: '请给登录证和护照。', zhEn: 'Please give me your registration card and passport.', correct: true },
        { zh: '请给存折和密码。', zhEn: 'Please give me your bankbook and password.', correct: false },
        { zh: '请输入密码。', zhEn: 'Please enter your PIN.', correct: false },
        { zh: '请签名。', zhEn: 'Please sign here.', correct: false },
      ],
    },
    {
      id: 'd18-o3',
      kind: 'zh-to-ko',
      zhPrompt: '想吃什么？', zhPromptEn: 'What do you want to eat?',
      successMsg: '"뭐 먹고 싶어요?" — 고 싶어요 的疑问句，约饭必备。', successMsgEn: '"뭐 먹고 싶어요?" — the question form of 고 싶어요, essential for making meal plans.',
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
      zhHint: '我想开存折。', zhHintEn: 'I\'d like to open a bankbook.',
      successMsg: '만들다 词干"만들" ㄹ收音保留 + 고 싶어요。不是 만드고。', successMsgEn: 'The stem "만들" keeps its ㄹ final consonant + 고 싶어요. Not 만드고.',
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
      successMsg: '✓ Day 18 全对。第一本韩国存折到手！', successMsgEn: '✓ Day 18 all correct. Got my first Korean bankbook!',
      pairs: [
        { ko: '은행', zh: '银行', zhEn: 'bank' },
        { ko: '통장', zh: '存折', zhEn: 'bankbook' },
        { ko: '비밀번호', zh: '密码', zhEn: 'PIN' },
        { ko: '외국인등록증', zh: '外国人登录证', zhEn: 'Alien Registration Card' },
        { ko: '사인', zh: '签名', zhEn: 'Signature' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '첫 번째 한국 통장 완성! 토리, 이제 진짜 서울 시민이에요!',
    preview: '存折有了——下次去医院能不能也这么顺利？', previewEn: 'Got the bankbook — will it go this smoothly at the hospital next time?',
    stickerId: 'sticker-d18',
    sceneImageUrl: '/images/diary/day-18-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「만들다接고싶어요为什么不去掉ㄹ？」「韩国开户需要什么证件？」',
};
