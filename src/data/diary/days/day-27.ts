import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 27 · 회식 · Minji请客
 *
 * 剧情：Minji期中结束请大家吃烤肉。四只动物挤在합정 불꽃숯불角落桌。
 * Tori学会了韩国请客文化——"다음에 내가 살게."
 *
 * 学习目标：韩国请客文化表达（한턱/낼게요/살게）/ 결제 词汇
 * 语料层级：해요体 + 반말（朋友聚餐）
 * 韩语自审：korean skill PASS（자연성/문법/조사 三关）
 */
export const day27: ToriDay = {
  level: 'beginner',
  day: 27,
  phase: 'expression',
  title: '聚餐 · Minji请客', titleEn: 'Dinner · Minji\'s treat',
  subtitle: '4个动物挤在烤肉店', subtitleEn: '4 animals squeezed into a BBQ place',
  heroImageUrl: '/images/diary/day-27-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 27일 · 금요일 저녁',
    weather: '兽尔 · 夜晚', weatherEn: 'Seoul · Night',
    toriPose: 'shy',
    diaryText: `9月27日，周五晚上。

期中考试终于结束了。
Minji在群聊发了一句："오늘 내가 한턱 낸다!"
（今天我请客！）

四只动物挤在합정的불꽃숯불（火花炭火）烤肉店。
角落的小桌子，烤盘冒着烟。
熊店员端来五花肉和生菜。

Junho 夹肉的速度比谁都快。
Haru 默默帮大家翻肉。
Minji 笑着看我们吃。

我想抢着付钱，
但 Minji 说：
"한국에서는 시험 끝나면 내가 사. 다음에 토리가 사."
（在韩国考完试我请。下次你请。）

原来韩国的请客文化是这样——
今天你请，下次我请。不是客气，是约定。`,
  },

  words: [
    {
      id: 'd27-w1',
      korean: '한턱 내다',
      hangul: 'han-teok nae-da',
      zh: '请客', zhEn: 'Treat',
      pos: '表达', posEn: 'Expression',
      example: { ko: '오늘 내가 한턱 낼게!', zh: '今天我请客！', zhEn: 'I\'m treating today!' },
      tip: '한턱 = 一顿（请的那顿）；내다 = 付出。한턱 내다 是"请一顿"的固定搭配',
    },
    {
      id: 'd27-w2',
      korean: '제가 낼게요',
      hangul: 'je-ga nael-ge-yo',
      zh: '我来付', zhEn: 'I\'ll pay',
      pos: '表达', posEn: 'Expression',
      example: { ko: '여기 제가 낼게요.', zh: '这里我来付。', zhEn: 'I\'ll pay here.' },
      tip: '제(我·谦称) + 가 + 내다(付) + ㄹ게요(意愿)。抢着买单时的标准句', tipEn: '제 (I, humble) + 가 + 내다 (pay) + ㄹ게요 (intention). The standard phrase when fighting over the bill.',
    },
    {
      id: 'd27-w3',
      korean: '결제',
      hangul: 'gyeol-je',
      zh: '结账', zhEn: 'check, please',
      pos: '名词', posEn: 'Noun',
      example: { ko: '카드로 결제할게요.', zh: '用卡结账。', zhEn: 'Pay by card.' },
      tip: '결(决) + 제(済)。결제하다 = 结账/支付。계산 也是"结账"', tipEn: '결 (决) + 제 (済). 결제하다 = to settle/pay. 계산 also means "to pay."',
    },
    {
      id: 'd27-w4',
      korean: '인분',
      hangul: 'in-bun',
      zh: '人份', zhEn: 'Per person',
      pos: '名词', posEn: 'Noun',
      example: { ko: '삼겹살 4인분 주세요.', zh: '请给我4人份五花肉。', zhEn: 'Please give me 4 servings of pork belly.' },
      tip: '인(人) + 분(份)。数字 + 인분 = 几人份。点烤肉时必用', tipEn: '인 (person) + 분 (portion). Number + 인분 = how many servings. Essential when ordering BBQ.',
    },
    {
      id: 'd27-w5',
      korean: '잘 먹었습니다',
      hangul: 'jal meo-geot-seum-ni-da',
      zh: '吃好了（感谢款待）', zhEn: 'I ate well (thanks for the meal)',
      pos: '表达', posEn: 'Expression',
      example: { ko: '잘 먹었습니다. 감사합니다.', zh: '吃好了。谢谢。', zhEn: 'I ate well. Thank you.' },
      tip: '합쇼체正式感谢。被请客后必说。잘 먹겠습니다 = 开动了（饭前）', tipEn: '합쇼체 formal thanks. Must say after being treated. 잘 먹겠습니다 = "I\'ll eat well" (before eating).',
    },
    {
      id: 'd27-w6',
      korean: '다음에',
      hangul: 'da-eum-e',
      zh: '下次', zhEn: 'Next time',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '다음에 제가 살게요.', zh: '下次我请。', zhEn: 'Next time, I\'ll treat.' },
      tip: '다음(下次) + 에(时间助词)。다음에 내가 살게 = 下次我买单（约定）', tipEn: '다음 (next) + 에 (time particle). 다음에 내가 살게 = I\'ll get it next time (a promise)',
    },
  ],

  dialogue: {
    scene: '烤肉店·四人聚餐', sceneEn: 'BBQ restaurant · group dinner for four',
    setting: {
      time: '周五晚上', timeEn: 'Friday evening',
      place: '합정 불꽃숯불（火花炭火烤肉店）', placeEn: '합정 불꽃숯불 (Spark Charcoal BBQ)',
      npc: 'Minji（水獭）/ 熊店员', npcEn: 'Minji (otter) / Bear staff member',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '오늘 내가 한턱 낸다!',
        hangul: 'o-neul nae-ga han-teok naen-da!',
        zh: '今天我请客！', zhEn: 'I\'m treating today!',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '아니, 오늘 내가 낼게. 시험 끝난 기념으로.',
        hangul: 'a-ni, o-neul nae-ga nael-ge. si-heom kkeun-nan gi-nyeo-meu-ro.',
        zh: '不行，今天我请。庆祝考试结束。', zhEn: 'No, it\'s on me today. Let\'s celebrate the exams being over.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '한국에서는 시험 끝나면 내가 사. 다음에 토리가 사.',
        hangul: 'han-gu-ge-seo-neun si-heom kkeun-na-myeon nae-ga sa. da-eum-e to-ri-ga sa.',
        zh: '在韩国考完我请。下次你请。', zhEn: 'I\'ll treat after the exams in Korea. Next time, it\'s your turn.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '熊店员', npcNameEn: 'Bear staff member',
        ko: '계산 도와드릴게요. 60,000원입니다.',
        hangul: 'gye-san do-wa-deu-ril-ge-yo. yuk-man-won-im-ni-da.',
        zh: '我帮您结账。60000元。', zhEn: 'I\'ll take care of the bill. It\'s 60,000 won.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '다음에… 내가 사는 날이 오겠지?',
        hangul: 'da-eum-e… nae-ga sa-neun na-ri o-get-ji?',
        zh: '下次……我请客的那天会来吧？', zhEn: 'Next time... you\'ll come on the day I treat, right?',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: '吃完了，Minji付了账。Tori应该怎么感谢并约定下次？', zhEn: 'The meal\'s over, and Minji paid. How should Tori thank her and promise a next time?',
        practice: 'pick',
        choices: [
          { ko: '잘 먹었습니다. 다음엔 제가 살게요.', zh: '吃好了。下次我请。', zhEn: 'I\'m full. Next time, I\'ll treat.', correct: true },
          { ko: '돈 주세요.', zh: '给我钱。', zhEn: 'Give me the money.', correct: false },
          { ko: '맛없었어요.', zh: '不好吃。', zhEn: 'It\'s not tasty.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '韩国请客文化：한턱 / 낼게요 / 살게', titleEn: 'Korean treating culture: 한턱 / 낼게요 / 살게',
    pattern: '**한턱 내다** = 请一顿  |  **제가 낼게요** = 我来付  |  **다음에 내가 살게** = 下次我请',
    whenToUse: '韩国聚餐文化：一人请客（不AA）→ 被请的人说"잘 먹었습니다"→ 约定"다음에 내가 살게"。Day 27 完整体验了这套流程。', whenToUseEn: 'Korean dining culture: one person treats (no splitting) → the person treated says "잘 먹었습니다" → promise "다음에 내가 살게". Day 27 fully experienced this flow.',
    rules: [
      '**한턱 내다**：한턱 = 一顿请客；내다 = 付出/掏钱。"오늘 내가 한턱 낼게!" = 今天我请！。한턱 是固定搭配，不能说 두턱 ❌',
      '**V + ㄹ게(요)**：表示"我会做___"的意愿/承诺。내다→낼게(요)（我会付的）；사다→살게(요)（我会请的）。ㄹ게 = 对听话者的承诺',
      '**제가 vs 내가**：제가 = 해요体谦称"我"；내가 = 반말"我"。对店员说 제가 낼게요；对朋友说 내가 낼게',
      '**잘 먹었습니다**：被请客后的标准感谢。합쇼체最高礼貌。잘(好好地) + 먹었습니다(吃了)。相当于"谢谢款待"',
      '**잘 먹겠습니다**：饭前说 = "我开动了"。겠 = 将要。먹었(过去) vs 먹겠(将来)',
      '**다음에 내가 살게**：韩国请客的"回礼约定"。不是客气话，是真的约定下次自己请。사다(买) → 살게（ㄹ게 承诺）',
      '**계산 vs 결제**：계산 = 算账/结账（口语常用）；결제 = 支付/刷卡（偏正式）。"계산해 주세요"= 请结账。两个在饭店都能用',
    ],
    examples: [
      { ko: '오늘 내가 한턱 낼게!', zh: '今天我请客！', zhEn: 'I\'m treating today!', highlight: '한턱 낼게', note: '한턱 내다 + ㄹ게(반말承诺)。朋友间宣布请客的标准句' },
      { ko: '여기 제가 낼게요.', zh: '这里我来付。', zhEn: 'I\'ll pay here.', highlight: '제가 낼게요', note: '제가(해요体"我") + 낼게요(내다+ㄹ게요)。对店员抢买单', noteEn: '제가 (해요 form "I") + 낼게요 (내다+ㄹ게요). Used to grab the bill from the staff.' },
      { ko: '잘 먹었습니다.', zh: '吃好了。（感谢款待）', zhEn: 'I ate well. (Thanks for the meal.)', highlight: '잘 먹었습니다', note: '합쇼체过去式。被请客后必说。是感谢不是单纯"吃饱了"', noteEn: '합쇼체 past tense. A must-say after being treated. It\'s gratitude, not just "I\'m full."' },
      { ko: '다음에 제가 살게요.', zh: '下次我请。', zhEn: 'Next time, I\'ll treat.', highlight: '살게요', note: '사다(买/请) → 살게요(ㄹ게요承诺)。韩国请客文化的回礼约定', noteEn: '사다 (buy/treat) → 살게요 (ㄹ게요 promise). The reciprocal promise in Korean treating culture.' },
      { ko: '카드로 결제할게요.', zh: '用卡结账。', zhEn: 'Pay by card.', highlight: '결제할게요', note: '결제하다 + ㄹ게요。하다类 → 할게요。付款时的标准句', noteEn: '결제하다 + ㄹ게요. 하다 verbs → 할게요. The standard phrase when paying.' },
    ],
    pitfall:
      '① 한턱 是固定词，不能拆：한 + 턱 ❌。也不能说 두턱/세턱。② ㄹ게요 只能用于第一人称（我的承诺）。"그 사람이 낼게요" ❌ → 第三人称用 낼 거예요。③ 잘 먹었습니다 vs 잘 먹겠습니다：过去=吃完感谢；将来=开动了。顺序别搞反。',
  },

  output: [
    {
      id: 'd27-o1',
      kind: 'compose',
      zhHint: '吃好了。下次我请。', zhHintEn: 'I\'m full. Next time, I\'ll treat.',
      tokens: ['잘', '먹었습니다', '다음엔', '제가', '살게요', '낼게요', '감사합니다'],
      composeAnswer: ['잘', '먹었습니다', '다음엔', '제가', '살게요'],
      successMsg: '잘 먹었습니다. 다음엔 제가 살게요. — 完美的韩式请客回应。', successMsgEn: '잘 먹었습니다. 다음엔 제가 살게요. — The perfect Korean response to being treated.',
    },
    {
      id: 'd27-o2',
      kind: 'listen-choice',
      audioKo: '계산 도와드릴게요. 60,000원입니다.',
      successMsg: '✓ 계산 = 结账；도와드릴게요 = 帮您(존경)；6만원 = 6万元。', successMsgEn: '✓ 계산 = the bill; 도와드릴게요 = I\'ll help you (honorific); 6만원 = 60,000 won.',
      choices: [
        { zh: '我帮您结账。60000元。', zhEn: 'I\'ll take care of the bill. It\'s 60,000 won.', correct: true },
        { zh: '请给我6万元。', zhEn: 'Please give me 60,000 won.', correct: false },
        { zh: '一共600元。', zhEn: 'It\'s 600 yuan in total.', correct: false },
        { zh: '不用结账。', zhEn: 'No need to pay.', correct: false },
      ],
    },
    {
      id: 'd27-o3',
      kind: 'zh-to-ko',
      zhPrompt: '今天我请客！', zhPromptEn: 'I\'m treating today!',
      successMsg: '"오늘 내가 한턱 낼게!" — 한턱 내다 + ㄹ게 承诺。',
      choices: [
        { ko: '오늘 내가 한턱 낼게!', correct: true },
        { ko: '오늘 내가 한턱 냈어!', correct: false },
        { ko: '오늘 제가 한턱 내세요!', correct: false },
        { ko: '오늘 한턱 사 주세요!', correct: false },
      ],
    },
    {
      id: 'd27-o4',
      kind: 'particle-error',
      zhHint: '下次我请。', zhHintEn: 'Next time, I\'ll treat.',
      successMsg: '사다 词干"사"无收音 + ㄹ게요 = 살게요（ㄹ 插入）。', successMsgEn: '사다 stem "사" (no batchim) + ㄹ게요 = 살게요 (ㄹ insertion).',
      choices: [
        { ko: '다음에 제가 살게요.', correct: true },
        { ko: '다음에 제가 사을게요.', correct: false },
        { ko: '다음에 제가 살겠어요.', correct: false },
        { ko: '다음에 저를 살게요.', correct: false },
      ],
    },
    {
      id: 'd27-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 27 全对。下次轮到Tori请客了！', successMsgEn: '✓ Day 27 all correct. Next time it\'s Tori\'s treat!',
      pairs: [
        { ko: '한턱 내다', zh: '请客', zhEn: 'Treat' },
        { ko: '결제', zh: '结账', zhEn: 'check, please' },
        { ko: '인분', zh: '人份', zhEn: 'Per person' },
        { ko: '잘 먹었습니다', zh: '吃好了（感谢）', zhEn: 'I ate well (thanks).' },
        { ko: '다음에', zh: '下次', zhEn: 'Next time' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '첫 한국식 회식 완료! 다음엔 토리가 살게요!',
    preview: '明天：偶像签售会。一个人排队，对着本命说一句真心话。', previewEn: 'Tomorrow: idol fan signing event. Standing in line alone, saying one heartfelt thing to your bias.',
    stickerId: 'sticker-d27',
    sceneImageUrl: '/images/diary/day-27-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「한턱 내다是什么意思？」「잘 먹었습니다和잘 먹겠습니다有什么区别？」',
};
