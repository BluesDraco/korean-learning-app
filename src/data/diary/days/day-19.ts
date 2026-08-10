import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 19 · 병원 · 第一次去内科
 *
 * 剧情：上次的药只压了三天。Haru拍板："약국 말고 병원 가자."
 * 穿白大褂的兔护士在前台问"哪里不舒服?"
 * Tori第一次用韩语描述自己的症状。
 *
 * 学习目标：N + 도（也）/ 身体症状表达 / 就诊流程
 * 语料层级：해요体（面对医护人员，礼貌正式）
 * 韩语自审：korean skill PASS（자연성/문법/조사 三关）
 */
export const day19: ToriDay = {
  level: 'beginner',
  day: 19,
  phase: 'expansion',
  title: '医院 · 第一次去内科', titleEn: 'Hospital · First Visit to Internal Medicine',
  subtitle: '兔护士问"哪里不舒服?"', subtitleEn: 'The rabbit nurse asks, "Where does it hurt?"',
  heroImageUrl: '/images/diary/day-19-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 19일 · 목요일 오전',
    weather: '兽尔 · 阴冷', weatherEn: 'Seoul · Overcast and Cold',
    toriPose: 'shy',
    diaryText: `9月19日，周四上午。

上次在药店买的感冒药只压了三天。
嗓子又开始疼，还发烧了。

Haru看我缩在被子里，拍板说：
"약국 말고 병원 가자."
（别去药店了，去医院吧。）

内科诊所门口，
一只穿白大褂的兔护士站在前台，
耳朵上别着一支笔。

"안녕하세요. 어디 아프세요?"
（您好。哪里不舒服？）

我张了张嘴——
第一次要用韩语说"我哪里疼"。`,
  },

  words: [
    {
      id: 'd19-w1',
      korean: '병원',
      hangul: 'byeong-won',
      zh: '医院', zhEn: 'Hospital',
      pos: '名词', posEn: 'Noun',
      example: { ko: '병원에 가야 해요.', zh: '得去医院。', zhEn: 'I have to go to the hospital.' },
      tip: '병(病) + 원(院)。韩国小诊所也叫병원', tipEn: '병 (sickness) + 원 (institution). Small clinics in Korea are also called 병원.',
    },
    {
      id: 'd19-w2',
      korean: '내과',
      hangul: 'nae-gwa',
      zh: '内科', zhEn: 'Internal Medicine',
      pos: '名词', posEn: 'Noun',
      example: { ko: '감기는 내과에 가세요.', zh: '感冒去内科。', zhEn: 'Go to internal medicine for a cold.' },
      tip: '내(内) + 과(科)。感冒发烧腹泻都归内科管', tipEn: '내 (internal) + 과 (department). Colds, fevers, and diarrhea all fall under internal medicine.',
    },
    {
      id: 'd19-w3',
      korean: '열',
      hangul: 'yeol',
      zh: '发烧；热', zhEn: 'Fever; heat',
      pos: '名词', posEn: 'Noun',
      example: { ko: '열이 나요.', zh: '我发烧了。', zhEn: 'I have a fever.' },
      tip: '열이 나다 = 发烧（惯用表达）。열 有收音 ㄹ → 이 나다', tipEn: '열이 나다 = to have a fever (idiomatic expression). 열 has the final consonant ㄹ → 이 나다',
    },
    {
      id: 'd19-w4',
      korean: '목',
      hangul: 'mok',
      zh: '喉咙；脖子', zhEn: 'throat; neck',
      pos: '名词', posEn: 'Noun',
      example: { ko: '목이 아파요.', zh: '喉咙疼。', zhEn: 'My throat hurts.' },
      tip: '목 有收音 ㄱ。목이 아프다 = 嗓子疼，是最常见的感冒症状描述', tipEn: '목 has the final consonant ㄱ. 목이 아프다 = sore throat, the most common cold symptom description',
    },
    {
      id: 'd19-w5',
      korean: '아파요',
      hangul: 'a-pa-yo',
      zh: '疼', zhEn: 'to hurt',
      pos: '动词', posEn: 'Verb',
      example: { ko: '머리가 아파요.', zh: '头疼。', zhEn: 'My head hurts.' },
      tip: '아프다(疼) → 아파요。ㅡ불규칙：아프 + 아요 → 아파요', tipEn: '아프다 (to hurt) → 아파요. ㅡ-irregular: 아프 + 아요 → 아파요',
    },
    {
      id: 'd19-w6',
      korean: '진료',
      hangul: 'jin-ryo',
      zh: '诊疗', zhEn: 'medical treatment',
      pos: '名词', posEn: 'Noun',
      example: { ko: '진료 받으러 왔어요.', zh: '来看诊的。', zhEn: '(I) came for a check-up.' },
      tip: '진(诊) + 료(疗)。진료를 받다 = 接受诊疗/看病', tipEn: '진 (诊) + 료 (疗). 진료를 받다 = to receive medical treatment/see a doctor',
    },
  ],

  dialogue: {
    scene: '内科诊所·前台', sceneEn: 'internal medicine clinic · front desk',
    setting: {
      time: '周四上午', timeEn: 'Thursday morning',
      place: '내과（内科诊所）', placeEn: '내과 (internal medicine clinic)',
      npc: '兔护士（穿白大褂·耳朵别着笔）', npcEn: 'Rabbit Nurse (in a white coat · pen tucked behind ear)',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '兔护士', npcNameEn: 'Rabbit Nurse',
        ko: '안녕하세요. 어디 아프세요?',
        hangul: 'an-nyeong-ha-se-yo. eo-di a-peu-se-yo?',
        zh: '您好。哪里不舒服？', zhEn: 'Hello. Where does it hurt?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '열도 나고, 목도 아파요.',
        hangul: 'yeol-do na-go, mok-do a-pa-yo.',
        zh: '也发烧，嗓子也疼。', zhEn: 'I have a fever, and my throat hurts too.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '兔护士', npcNameEn: 'Rabbit Nurse',
        ko: '처음 오시는 거죠? 외국인등록증 주세요.',
        hangul: 'cheo-eum o-si-neun geo-jyo? oe-gu-gin-deung-nok-jeung ju-se-yo.',
        zh: '第一次来吧？请给登录证。', zhEn: 'First time here? Please give me your registration card.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 여기 있어요.',
        hangul: 'ne, yeo-gi i-sseo-yo.',
        zh: '是的，在这里。', zhEn: 'Yes, here it is.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '兔护士', npcNameEn: 'Rabbit Nurse',
        ko: '30분 정도 기다리셔야 해요.',
        hangul: 'sam-sip-bun jeong-do gi-da-ri-syeo-ya hae-yo.',
        zh: '需要等30分钟左右。', zhEn: 'You\'ll need to wait about 30 minutes.',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: '护士说需要等30分钟，Tori应该怎么回答？', zhEn: 'The nurse said to wait 30 minutes. How should Tori respond?',
        practice: 'pick',
        choices: [
          { ko: '네, 알겠습니다.', zh: '好的，明白了。', zhEn: 'Okay, understood.', correct: true },
          { ko: '안 기다릴래요.', zh: '我不想等。', zhEn: 'I don\'t want to wait.', correct: false },
          { ko: '30분이 뭐예요?', zh: '30分钟是什么？', zhEn: 'What is 30 minutes?', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '也：N + 도', titleEn: 'also: N + 도',
    pattern: 'N + **도** = ___也', patternEn: 'N + **도** = ___ too',
    whenToUse: '表示"也/都"。把助词 은/는、이/가、을/를 替换成 도 就行。Day 19 兔莉说"열도 나고, 목도 아파요"——发烧也有，嗓子也疼。도 让两个症状并列表达。', whenToUseEn: 'Means "also/all." Just replace the particles 은/는, 이/가, 을/를 with 도. On Day 19, Tori says "열도 나고, 목도 아파요" — fever too, sore throat too. 도 connects both symptoms.',
    rules: [
      '**基本公式**：名词 + 도 = ___也。替换原来的格助词（은/는、이/가、을/를）。例：저는 → 저도（我也）；커피를 → 커피도（咖啡也）',
      '**替换规则**：도 直接替代主格/宾格/主题助词，不叠加。저는 학생이에요 → 저도 학생이에요（我也是学生）。不是 저는도 ❌',
      '**并列用法**：A도 B도 = A也B也。열도 나고 목도 아파요 = 发烧也有嗓子也疼。两个"都"同时出现时用 도…도… 结构',
      '**도 + 고**：도…V고, 도…V = 两个动作/状态并列。고 起连接作用，도 给每个名词加"也"',
      '**位置固定**：도 紧跟名词后面，动词前面。저도 가요（我也去）/ 이것도 주세요（这个也给我）',
      '**否定搭配**：아무것도 + 否定 = 什么都不……。아무것도 안 먹었어요（什么都没吃）。도 在否定句中表"连……都"',
      '**에도 用法**：表示"在……也"。서울에도 있어요（在兽尔也有）。도 可以接在 에(位置) 后面',
    ],
    examples: [
      { ko: '열도 나고, 목도 아파요.', zh: '也发烧，嗓子也疼。', zhEn: 'I have a fever, and my throat hurts too.', highlight: '도', note: '열 + 도 / 목 + 도，两个症状并列。고 连接两个分句', noteEn: '열 + 도 / 목 + 도, listing two symptoms. 고 connects the two clauses.' },
      { ko: '저도 학생이에요.', zh: '我也是学生。', zhEn: 'I\'m a student too.', highlight: '도', note: '저 + 도 替换了 저는。도 直接取代主题助词 는', noteEn: '저 + 도 replaces 저는. 도 directly takes the place of the topic particle 는.' },
      { ko: '커피도 주세요.', zh: '咖啡也给我。', zhEn: 'Give me coffee too.', highlight: '도', note: '커피 + 도 替换了 커피를。点餐时"再加一个"就用 도', noteEn: '커피 + 도 replaces 커피를. When ordering "one more," use 도.' },
      { ko: '내일도 병원에 가야 해요.', zh: '明天也得去医院。', zhEn: 'I have to go to the hospital tomorrow too.', highlight: '도', note: '내일 + 도。时间词后面也能接 도 表示"那天也"', noteEn: '내일 + 도. You can also attach 도 to time words to mean "that day too."' },
      { ko: '아무것도 안 먹었어요.', zh: '什么都没吃。', zhEn: 'I haven\'t eaten anything.', highlight: '도', note: '아무것(什么) + 도 + 否定 = 什么都没。생病时常说的一句' },
    ],
    pitfall:
      '① 도 替换助词，不叠加！저는도 ❌ → 저도 ✓。을/를도 ❌ → 도 ✓。② 도 的位置：名词 + 도 + 动词。不能放在动词后面。"去也"不能说 가도요 ❌（가도 是让步"即使去"，语法完全不同）。③ 并列时每个名词都要加 도：열도…목도…。不能只加一个。',
  },

  output: [
    {
      id: 'd19-o1',
      kind: 'compose',
      zhHint: '也发烧，嗓子也疼。', zhHintEn: 'I have a fever, and my throat hurts too.',
      tokens: ['열도', '나고', '목도', '아파요', '열이', '목이', '나요'],
      composeAnswer: ['열도', '나고', '목도', '아파요'],
      successMsg: '열도 나고, 목도 아파요 — 兔护士听懂了，在本子上勾了两项。', successMsgEn: '열도 나고, 목도 아파요 — The nurse rabbit understood and checked off two items on her notepad.',
    },
    {
      id: 'd19-o2',
      kind: 'listen-choice',
      audioKo: '처음 오시는 거죠? 외국인등록증 주세요.',
      successMsg: '✓ 第一次来的外国人需要出示登录证。和银行一样。', successMsgEn: '✓ Foreigners visiting for the first time need to show their alien registration card. Same as at the bank.',
      choices: [
        { zh: '第一次来吧？请给登录证。', zhEn: 'First time here? Please give me your registration card.', correct: true },
        { zh: '请给护照和存折。', zhEn: 'Please give me your passport and bankbook.', correct: false },
        { zh: '第一次来吧？请签名。', zhEn: 'First time here, right? Please sign.', correct: false },
        { zh: '请等30分钟。', zhEn: 'Please wait 30 minutes.', correct: false },
      ],
    },
    {
      id: 'd19-o3',
      kind: 'zh-to-ko',
      zhPrompt: '我也是学生。', zhPromptEn: 'I\'m a student too.',
      successMsg: '"저도 학생이에요." — 저 + 도，替换了 저는。', successMsgEn: '"저도 학생이에요." — 저 + 도, replacing 저는.',
      choices: [
        { ko: '저도 학생이에요.', correct: true },
        { ko: '저는도 학생이에요.', correct: false },
        { ko: '저는 학생도예요.', correct: false },
        { ko: '저도 학생예요.', correct: false },
      ],
    },
    {
      id: 'd19-o4',
      kind: 'particle-error',
      zhHint: '也发烧，嗓子也疼。', zhHintEn: 'I have a fever, and my throat hurts too.',
      successMsg: '열 + 도 / 목 + 도。도 直接替换格助词，不叠加。', successMsgEn: '열 + 도 / 목 + 도. 도 directly replaces the case particle, not stacking.',
      choices: [
        { ko: '열도 나고, 목도 아파요.', correct: true },
        { ko: '열이도 나고, 목이도 아파요.', correct: false },
        { ko: '열도 나고, 목은 아파요.', correct: false },
        { ko: '열 나도, 목 아파도요.', correct: false },
      ],
    },
    {
      id: 'd19-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 19 全对。下次去医院，你已经能描述症状了。', successMsgEn: '✓ Day 19 all correct. Next time you go to the hospital, you can describe your symptoms.',
      pairs: [
        { ko: '병원', zh: '医院', zhEn: 'Hospital' },
        { ko: '내과', zh: '内科', zhEn: 'Internal Medicine' },
        { ko: '열', zh: '发烧', zhEn: 'fever' },
        { ko: '목', zh: '喉咙', zhEn: 'throat' },
        { ko: '진료', zh: '诊疗', zhEn: 'medical treatment' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '아픈 데도 한국어로 잘 말했어요! 토리, 대단해요!',
    preview: '感冒快好了，可房子还没定下来——明天海豹房东要来，学着问清租金和管理费都包含什么。', previewEn: 'The cold is almost better, but the housing isn\'t settled yet — tomorrow the seal landlord is coming. Learn to ask what\'s included in the rent and maintenance fees.',
    stickerId: 'sticker-d19',
    sceneImageUrl: '/images/diary/day-19-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「도是怎么用的？跟은/는有什么区别？」「韩语怎么说嗓子疼头疼？」',
};
