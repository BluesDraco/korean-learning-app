import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 13 · 약국 · 感冒了 + Haru 陪去药店
 *
 * 剧情：半夜兔莉鼻塞醒来，咳嗽到肺都疼。早上 Haru 敲门发现她脸色发白，
 * 二话不说："약국 가자."（去药店吧。）一只白鹭药剂师姐姐站在柜台后。
 * 兔莉怯怯地说："감기 걸렸어요. 콧물이 나요."（我感冒了，流鼻涕。）
 * 白鹭姐姐温柔地拿了三盒药："이 약 드세요. 따뜻한 물 많이 마셔요."
 * 回宿舍路上，Haru 说她刚来韩国时也是这样开始的。
 *
 * 学习目标：症状词 / ~ 걸리다 / 약 드세요 / 礼貌建议
 * 韩语自审：korean skill PASS
 */
export const day13: ToriDay = {
  level: 'beginner',
  day: 13,
  phase: 'foundation',
  title: '药店 · 感冒了', titleEn: 'Pharmacy · Caught a cold',
  subtitle: 'Haru 陪我去药店，我学会了描述病情', subtitleEn: 'Haru went with me to the pharmacy, and I learned to describe symptoms',
  heroImageUrl: '/images/diary/day-13-hero.jpg',
  estimatedMin: 13,

  opening: {
    date: '9월 13일 · 금요일 아침',
    weather: '兽尔 · 雨', weatherEn: 'Seoul · Rain',
    toriPose: 'sleepy',
    diaryText: `9月 13日，半夜 2 点，我被鼻塞憋醒。
喉咙像着了火，咳一声胸口就疼。
胡萝卜在床头静静的。

早上 7 点，Haru 敲门借酱油。
她看到我脸色就皱眉："토리, 너 얼굴이 너무 안 좋아."
（兔莉，你脸色太差了。）

二话不说："약국 가자."
（去药店吧。）

她拽着我下楼。
药店在便利店旁边，白色招牌写着大大的"약"。
推开门，一只优雅的白鹭姐姐站在柜台后。
她脖子上戴着一枚精巧的月牙形项链——好漂亮，但我没好意思开口问。

我怯怯地说："감기 걸렸어요. 콧물이 나요."
（我感冒了，流鼻涕。）

白鹭姐姐温柔地拿了三盒药：
"감기약, 콧물약, 기침약. 식후에 드세요."
（感冒药、鼻涕药、咳嗽药。饭后服用。）
她又加了一句："따뜻한 물 많이 마셔요."
（多喝热水。）

回宿舍的路上，Haru 说：
"나도 처음 한국 왔을 때 이렇게 시작했어."
（我刚来韩国时也是这样开始的。）

吃完药躺下时，我突然懂了——
学韩语和过日子，
都是从生病那天真正开始的。`,
  },

  words: [
    {
      id: 'd13-w1',
      korean: '약국',
      hangul: 'yak-guk',
      zh: '药店', zhEn: 'pharmacy',
      pos: '名词', posEn: 'Noun',
      example: { ko: '약국 가요.', zh: '我去药店。', zhEn: 'I\'m going to the pharmacy.' },
      tip: '韩国药店一般在便利店附近，认招牌上大大的「약」字', tipEn: 'Korean pharmacies are usually near convenience stores; look for the big \'약\' sign on the signboard.',
    },
    {
      id: 'd13-w2',
      korean: '감기',
      hangul: 'gam-gi',
      zh: '感冒', zhEn: 'cold',
      pos: '名词', posEn: 'Noun',
      example: { ko: '감기 걸렸어요.', zh: '我感冒了。', zhEn: 'I have a cold.' },
      tip: '搭配：~걸리다 (得病)。「감기 걸렸어요」固定搭配', tipEn: 'Collocation: ~걸리다 (to catch). \'감기 걸렸어요\' is a fixed phrase.',
    },
    {
      id: 'd13-w3',
      korean: '콧물',
      hangul: 'kon-mul',
      zh: '鼻涕', zhEn: 'runny nose',
      pos: '名词', posEn: 'Noun',
      example: { ko: '콧물이 나요.', zh: '流鼻涕。', zhEn: 'I have a runny nose.' },
      tip: '搭配：~이/가 나요 (流出)。「콧물이 나요」', tipEn: 'Collocation: ~이/가 나요 (to flow). \'콧물이 나요\' means \'my nose is running.\'',
    },
    {
      id: 'd13-w4',
      korean: '기침',
      hangul: 'gi-chim',
      zh: '咳嗽', zhEn: 'cough',
      pos: '名词', posEn: 'Noun',
      example: { ko: '기침이 심해요.', zh: '咳嗽很厉害。', zhEn: 'I have a bad cough.' },
      tip: '搭配：~이 심해요 (很严重) / ~이 나요 (出现)', tipEn: 'Collocation: ~이 심해요 (severe) / ~이 나요 (to occur).',
    },
    {
      id: 'd13-w5',
      korean: '약',
      hangul: 'yak',
      zh: '药', zhEn: 'medicine',
      pos: '名词', posEn: 'Noun',
      example: { ko: '이 약 드세요.', zh: '请吃这个药。', zhEn: 'Please take this medicine.' },
      tip: '前缀：감기약(感冒药) / 두통약(头痛药) / 콧물약(鼻涕药)', tipEn: 'Prefixes: 감기약 (cold medicine) / 두통약 (headache medicine) / 콧물약 (runny nose medicine).',
    },
    {
      id: 'd13-w6',
      korean: '드세요',
      hangul: 'deu-se-yo',
      zh: '请吃 / 请喝（敬语）', zhEn: 'Please eat / drink (polite form).',
      pos: '表达', posEn: 'Expression',
      example: { ko: '식후에 드세요.', zh: '请饭后服用。', zhEn: 'Please take it after meals.' },
      tip: '「먹다 / 마시다」的尊敬形。对病人、长辈用', tipEn: 'Honorific form of \'먹다 / 마시다.\' Used for patients or elders.',
    },
  ],

  dialogue: {
    scene: '약국 柜台', sceneEn: 'pharmacy counter',
    setting: {
      time: '早上 8 点', timeEn: '8 AM',
      place: '宿舍附近 약국', placeEn: 'pharmacy near the dormitory',
      npc: '白鹭药剂师', npcEn: 'White Heron Pharmacist',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '白鹭药剂师', npcNameEn: 'White Heron Pharmacist',
        ko: '어디가 불편하세요?',
        hangul: 'eo-di-ga bul-pyeon-ha-se-yo',
        zh: '哪里不舒服？', zhEn: 'Where does it hurt?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '감기 걸렸어요. 콧물이 나요.',
        hangul: 'gam-gi geol-lyeo-sseo-yo. kon-mul-i na-yo',
        zh: '我感冒了，流鼻涕。', zhEn: 'I have a cold and a runny nose.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '白鹭药剂师', npcNameEn: 'White Heron Pharmacist',
        ko: '기침도 하세요?',
        hangul: 'gi-chim-do ha-se-yo',
        zh: '也咳嗽吗？', zhEn: 'Do you cough too?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 좀 해요.',
        hangul: 'ne, jom hae-yo',
        zh: '是的，有点。', zhEn: 'Yes, a little.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '목걸이 예쁘다… 달 모양…',
        hangul: 'mok-geo-ri ye-ppeu-da… dal mo-yang…',
        zh: '项链好漂亮……月亮形状……', zhEn: 'The necklace is so pretty... moon-shaped...',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '白鹭姐姐说"식후에 드세요. 따뜻한 물 많이 마셔요."，兔莉应该回什么？', zhEn: 'Sister Egret said "식후에 드세요. 따뜻한 물 많이 마셔요." What should Tori reply?',
        practice: 'pick',
        choices: [
          { ko: '네, 알겠습니다. 감사합니다.', zh: '好的，我知道了。谢谢。', zhEn: 'Okay, I got it. Thanks.', correct: true },
          { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
          { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。', zhEn: 'No need, it\'s fine.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '描述病情 · 걸렸어요 / 나요 / 아파요', titleEn: 'Describing symptoms · 걸렸어요 / 나요 / 아파요',
    pattern: '병 + 걸렸어요 (得了___) / 증상 + 이/가 + 나요 (出现___) / 부위 + 아파요 (___疼)', patternEn: '병 + 걸렸어요 (caught ___) / 증상 + 이/가 + 나요 (developed ___) / 부위 + 아파요 (___ hurts)',
    whenToUse: '韩国看病、买药、跟朋友说"身体不舒服"必备。韩语描述病情有三套句型——得病(걸리다)、症状(나다)、疼痛(아프다)——各自搭配不同的身体部位和症状词。Day 13 兔莉感冒了，Haru 陪她去药店。', whenToUseEn: 'Essential for seeing a doctor, buying medicine, or telling friends you\'re unwell in Korea. Korean has three patterns for describing illness—catching a disease (걸리다), symptoms (나다), and pain (아프다)—each paired with different body parts and symptom words. On Day 13, Tori has a cold, and Haru goes with her to the pharmacy.',
    rules: [
      '**병 + 걸렸어요 = 得了___病**：걸리다(得/患) 的过去式 → 걸렸어요。韩语用过去时强调"已经感染上了"。감기 걸렸어요（感冒了）、독감 걸렸어요（得流感了）、코로나 걸렸어요（得新冠了）',
      '**걸리다 现在时 vs 过去时**：걸려요 = 正在得（很少用），걸렸어요 = 已经得了（常用）。生病一般用过去时——因为从感染到出现症状有时间差',
      '**증상 + 이/가 나요 = 出现___症状**：나다(出来/发生) → 나요。콧물이 나요（流鼻涕）、열이 나요（发烧）、기침이 나요（咳嗽）。所有症状用 이/가 + 나요 表示"正在出现"',
      '**부위 + 이/가 아파요 = ___疼**：아프다(疼/痛) → 아파요。머리가 아파요（头痛）、배가 아파요（肚子痛）、목이 아파요（嗓子痛）。身体部位 + 이/가 + 아파요',
      '**严重程度副词**：많이(多/厉害) > 좀/조금(有点)。기침이 많이 나요（咳得很厉害）、목이 좀 아파요（嗓子有点痛）。많이 放在动词前',
      '**吃药/买药表达**：약(药) + 주세요/사다(买)。감기약 주세요（请给我感冒药）。약국(药店) + 에 가다 = 去药店。처방전(处方) + 필요해요(需要) = 需要处方',
      '**感觉表达**：기분이 안 좋아요（心情不好/不舒服）。区别于 몸이 안 좋아요（身体不舒服）。两者都是委婉表达不适的常用句式',
      '**걸리다 vs 나다 vs 아프다 区别表**：걸리다 → 得病（감기 걸렸어요）。나다 → 症状出现（열이 나요）。아프다 → 疼痛（머리 아파요）。三词不可互换——不能说 감기 나요 ❌ 或 열이 아파요 ❌',
    ],
    examples: [
      { ko: '감기 걸렸어요.', zh: '我感冒了。', zhEn: 'I have a cold.', highlight: '걸렸어요', note: '감기(感冒) + 걸리다(得·过去时) → 걸렸어요。规则活用：걸리 + 었어요 → 걸렸어요（이+었 母音合并为 였）', noteEn: '감기 (cold) + 걸리다 (catch·past tense) → 걸렸어요. Regular conjugation: 걸리 + 었어요 → 걸렸어요 (이+었 vowels merge into 였)' },
      { ko: '콧물이 나요.', zh: '流鼻涕。', zhEn: 'I have a runny nose.', highlight: '콧물이 나요', note: '콧물(鼻水·鼻涕) + 이(主格) + 나다(出来) → 나요。鼻涕出来的意思', noteEn: '콧물 (runny nose) + 이 (subject) + 나다 (come out) → 나요. Means mucus coming out.' },
      { ko: '열이 나요. 머리도 아파요.', zh: '发烧。头也痛。', zhEn: 'I have a fever. My head hurts too.', highlight: '열이 / 아파요', note: '열(热·发烧) + 이 + 나요。머리(头) + 도(也) + 아파요(痛)。两个症状连续描述', noteEn: '열 (fever) + 이 + 나요. 머리 (head) + 도 (also) + 아파요 (hurts). Describing two symptoms in sequence.' },
      { ko: '기침이 많이 나요.', zh: '咳得很厉害。', zhEn: 'I\'m coughing a lot.', highlight: '많이 나요', note: '기침(咳嗽) + 이 + 많이(多·副词) + 나요。많이 修饰 나다 表程度', noteEn: '기침 (cough) + 이 + 많이 (a lot·adverb) + 나요. 많이 modifies 나다 to show degree.' },
      { ko: '목이 아파요. 약 주세요.', zh: '嗓子痛。请给我药。', zhEn: 'My throat hurts. Please give me medicine.', highlight: '목이 아파요', note: '목(嗓子·脖子) + 이 + 아파요。약(药) + 주세요 = 请给我药，药店用语', noteEn: '목 (throat·neck) + 이 + 아파요. 약 (medicine) + 주세요 = Please give me medicine, pharmacy phrase.' },
      { ko: '몸이 안 좋아요.', zh: '身体不舒服。', zhEn: 'I don\'t feel well.', highlight: '안 좋아요', note: '몸(身体) + 이 + 안(不) + 좋아요(好)。最常用的委婉表达不适的句子', noteEn: '몸 (body) + 이 + 안 (not) + 좋아요 (good). The most common polite way to say you feel unwell.' },
    ],
    pitfall:
      '① 감기 있어요 ❌ → 감기 걸렸어요 ✅——感冒用 걸리다，不用 있다。② 열이 아파요 ❌ → 열이 나요 ✅——发烧用 나다(出来)，不用 아프다(痛)。③ 목이 걸렸어요 ❌ → 목이 아파요 ✅——身体部位痛用 아프다，器官不会"得病"。④ 症状词要加 이/가 再接 나요：콧물 나요 ❌ → 콧물이 나요 ✅。',
  },

  output: [
    {
      id: 'd13-o1',
      kind: 'compose',
      zhHint: '我感冒了，流鼻涕。', zhHintEn: 'I have a cold and a runny nose.',
      tokens: ['감기', '걸렸어요', '콧물이', '나요', '있어요', '기침이'],
      composeAnswer: ['감기', '걸렸어요', '콧물이', '나요'],
      successMsg: '白鹭药剂师姐姐拿出了三盒药递给你 ✓', successMsgEn: 'Sister Egret the pharmacist took out three boxes of medicine and handed them to you ✓',
    },
    {
      id: 'd13-o2',
      kind: 'listen-choice',
      audioKo: '식후에 드세요.',
      successMsg: '✓ 「请饭后服用」。「식후」= 饭后；「드세요」是「먹다」的尊敬形。', successMsgEn: '✓ "Please take after meals." 「식후」= after meals; 「드세요」 is the honorific form of 「먹다」.',
      choices: [
        { zh: '请饭后服用。', zhEn: 'Please take it after meals.', correct: true },
        { zh: '请饭前服用。', zhEn: 'Please take before meals.', correct: false },
        { zh: '请喝热水。', zhEn: 'Please drink warm water.', correct: false },
        { zh: '咳嗽厉害吗？', zhEn: 'Is your cough bad?', correct: false },
      ],
    },
    {
      id: 'd13-o3',
      kind: 'zh-to-ko',
      zhPrompt: '咳嗽很厉害。', zhPromptEn: 'I have a bad cough.',
      successMsg: '"기침이 심해요" — 「기침」(받침 ㅁ)→「이」；「심하다」是「严重」。',
      choices: [
        { ko: '기침이 심해요.', correct: true },
        { ko: '기침가 심해요.', correct: false },
        { ko: '기침이 많아요.', correct: false },
        { ko: '기침이 걸렸어요.', correct: false },
      ],
    },
    {
      id: 'd13-o4',
      kind: 'particle-error',
      zhHint: '发烧了。', zhHintEn: 'I have a fever.',
      successMsg: '「열」(받침 ㄹ) → 主语助词「이」。「나요」是「나다」(出/流) 的礼貌形。',
      choices: [
        { ko: '열이 나요.', correct: true },
        { ko: '열가 나요.', correct: false },
        { ko: '열을 나요.', correct: false },
        { ko: '열이 아파요.', correct: false },
      ],
    },
    {
      id: 'd13-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 13 核心词全部对上。感冒了，但身边有人。', successMsgEn: '✓ Day 13 core vocabulary all matched. Caught a cold, but someone\'s by your side.',
      pairs: [
        { ko: '약국', zh: '药店', zhEn: 'pharmacy' },
        { ko: '감기', zh: '感冒', zhEn: 'cold' },
        { ko: '콧물', zh: '鼻涕', zhEn: 'runny nose' },
        { ko: '기침', zh: '咳嗽', zhEn: 'cough' },
        { ko: '약', zh: '药', zhEn: 'medicine' },
      ],
    },
  ],
  recap: {
    toriPose: 'sleepy',
    praise: '在韩国第一次生病、第一次自己买药。Haru 在你身边。', praiseEn: 'First time being sick in Korea, first time buying medicine alone. Haru is by your side.',
    preview: '明天：咖啡馆点单的完整对话，一个人能撑下来吗？', previewEn: 'Tomorrow: full café ordering conversation. Can you make it through alone?',
    stickerId: 'sticker-d13',
    sceneImageUrl: '/images/diary/day-13-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「韩国常见症状词」「药店常用句」「饭后吃药怎么说」',
};
