import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 5 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——围绕邻居/早晨/邀请场景：
 * - core: 아침 / 식당 / 몰라요 / 알아요 / 오늘 / 좋아요（进认词考察）
 * - ext:  갈래요 / 어제（进拼写/听写考察）
 *
 * 教学重点：알아요 vs 몰라요 是 Haru 主流程对话直接使用的一对反义词。
 * 갈래요 是邀请句核心动词，Day 5 grammar 会作为组句素材。
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day5Vocab: VocabSubQuestData = {
  day: 5,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '走廊里悄悄多学的 8 个词', subtitleEn: '8 extra words to sneak in while in the hallway.',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd05-v1-e1',
      korean: '아침',
      hangul: 'a-chim',
      zh: '早晨 / 早饭', zhEn: 'Morning / breakfast.',
      pos: '名词', posEn: 'Noun',
      example: { ko: '아침 먹었어요?', zh: '吃早饭了吗？', zhEn: 'Did you eat breakfast?' },
      tip: '一词两用：既指"早晨"也指"早饭"。「점심」= 午饭，「저녁」= 晚饭。韩国人问候第一句常是"아침 먹었어요?"', tipEn: 'One word, two uses: it means both \'morning\' and \'breakfast.\' \'점심\' = lunch, \'저녁\' = dinner. Koreans often greet with \'아침 먹었어요?\' as the first line.',
      tier: 'core',
    },
    {
      id: 'd05-v1-e2',
      korean: '식당',
      hangul: 'sik-dang',
      zh: '食堂 / 餐厅', zhEn: 'Cafeteria / restaurant.',
      pos: '名词', posEn: 'Noun',
      example: { ko: '식당은 1층에 있어요.', zh: '食堂在 1 楼。', zhEn: 'The cafeteria is on the 1st floor.' },
      tip: '汉字词「食堂」。校内叫 학생식당（学生食堂），校外一般叫 식당 或 음식점。', tipEn: 'Sino-Korean word \'식당.\' On campus it\'s 학생식당 (student cafeteria), off campus it\'s usually 식당 or 음식점.',
      tier: 'core',
    },
    {
      id: 'd05-v1-e3',
      korean: '몰라요',
      hangul: 'mol-la-yo',
      zh: '不知道', zhEn: 'I don\'t know',
      pos: '动词', posEn: 'Verb',
      example: { ko: '아니요, 몰라요.', zh: '不，不知道。', zhEn: 'No, I don\'t know.' },
      tip: '「모르다」的해요体。留学生天天用的实话。搭配 「저기요, 좀 몰라서요」= "不好意思，我不太清楚"，比直接 몰라요 委婉。', tipEn: '\'모르다\' in the 해요 style. The honest phrase international students use daily. Pair it with \'저기요, 좀 몰라서요\' = "Excuse me, I\'m not too sure," which is softer than just 몰라요.',
      tier: 'core',
    },
    {
      id: 'd05-v1-e4',
      korean: '알아요',
      hangul: 'a-ra-yo',
      zh: '知道 / 认识', zhEn: 'Know / recognize.',
      pos: '动词', posEn: 'Verb',
      example: { ko: '네, 알아요.', zh: '是的，我知道。', zhEn: 'Yes, I know.' },
      tip: '「알다」的해요体。跟 몰라요 是一对反义词。알아요? 既能问"知道吗"也能问"认识吗"。', tipEn: '\'알다\' in the 해요 style. It\'s the opposite of 몰라요. 알아요? can ask both \'Do you know?\' and \'Do you recognize?\'',
      tier: 'core',
    },
    {
      id: 'd05-v1-e5',
      korean: '오늘',
      hangul: 'o-neul',
      zh: '今天', zhEn: 'today',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오늘은 날씨가 좋아요.', zh: '今天天气好。', zhEn: 'The weather is nice today.' },
      tip: '受收音 ㄹ 影响，主题助词用 은 → 오늘은。「어제」(昨天) / 「내일」(明天) 一组三个。', tipEn: 'Due to the final consonant ㄹ, the topic particle becomes 은 → 오늘은. \'어제\' (yesterday) / \'내일\' (tomorrow) form a set of three.',
      tier: 'core',
    },
    {
      id: 'd05-v1-e6',
      korean: '좋아요',
      hangul: 'jo-a-yo',
      zh: '好 / 喜欢', zhEn: 'Good / like.',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '한국 음식이 좋아요.', zh: '喜欢韩国菜。', zhEn: 'I like Korean food.' },
      tip: '「좋다」的해요体。既表评价（好）也表喜好（喜欢）。注意：좋아요 是形容词，前面用主格 이/가「什么让人喜欢」，别用宾格 을/를。「저는 김치가 좋아요」= 我喜欢泡菜。', tipEn: 'The 해요 form of 좋다. It expresses both evaluation (good) and preference (like). Note: 좋아요 is an adjective, so use the subject particle 이/가 to mark what is liked, not the object particle 을/를. 「저는 김치가 좋아요」= I like kimchi.',
      tier: 'core',
    },
    {
      id: 'd05-v1-e7',
      korean: '갈래요',
      hangul: 'gal-lae-yo',
      zh: '要去吗 / 想去', zhEn: 'Want to go? / Want to go',
      pos: '动词', posEn: 'Verb',
      example: { ko: '같이 갈래요?', zh: '一起去吗？', zhEn: 'Want to go together?' },
      tip: '「가다」+ ~ㄹ래요 = 询问对方意愿。邀请专用句尾。发音 [갈래요]，ㄹ+ㄹ 连音要念清。', tipEn: '가다 + ~ㄹ래요 = asking the other person\'s intention. A sentence ending used specifically for invitations. Pronounced [갈래요], with the ㄹ+ㄹ liaison clearly pronounced.',
      tier: 'ext',
    },
    {
      id: 'd05-v1-e8',
      korean: '어제',
      hangul: 'eo-je',
      zh: '昨天', zhEn: 'yesterday',
      pos: '名词', posEn: 'Noun',
      example: { ko: '어제 밤에 KPOP 들었어요.', zh: '昨晚听 KPOP 了。', zhEn: 'I listened to K-POP last night.' },
      tip: '和 오늘（今天）/ 내일（明天）配套。Haru 就是用「어제 밤에」抓到兔莉听 KPOP 的现行。', tipEn: 'Pairs with 오늘 (today) / 내일 (tomorrow). Haru used 「어제 밤에」 to catch Tori listening to K-POP in the act.',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd05-v1-w1', korean: '아',  hangul: 'a',       wordKorean: '아침',   wordZh: '早晨', wordZhEn: 'morning' },
    { id: 'd05-v1-w2', korean: '식',  hangul: 'sik',     wordKorean: '식당',   wordZh: '食堂', wordZhEn: 'cafeteria' },
    { id: 'd05-v1-w3', korean: '몰',  hangul: 'mol',     wordKorean: '몰라요', wordZh: '不知道', wordZhEn: 'I don\'t know' },
    { id: 'd05-v1-w4', korean: '알',  hangul: 'al',      wordKorean: '알아요', wordZh: '知道', wordZhEn: 'Know' },
    { id: 'd05-v1-w5', korean: '오',  hangul: 'o',       wordKorean: '오늘',   wordZh: '今天', wordZhEn: 'today' },
    { id: 'd05-v1-w6', korean: '좋',  hangul: 'jo',      wordKorean: '좋아요', wordZh: '好 / 喜欢', wordZhEn: 'Good / like.' },
    { id: 'd05-v1-w7', korean: '갈',  hangul: 'gal',     wordKorean: '갈래요', wordZh: '要去吗', wordZhEn: 'want to go?' },
    { id: 'd05-v1-w8', korean: '어',  hangul: 'eo',      wordKorean: '어제',   wordZh: '昨天', wordZhEn: 'yesterday' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd05-v1-r1',
      korean: '아침',
      hangul: 'a-chim',
      choices: [
        { zh: '早晨 / 早饭', zhEn: 'Morning / breakfast.', correct: true },
        { zh: '晚上', zhEn: 'Night', correct: false },
        { zh: '中午', zhEn: 'noon', correct: false },
        { zh: '夜里', zhEn: 'at night', correct: false },
      ],
    },
    {
      id: 'd05-v1-r2',
      korean: '식당',
      hangul: 'sik-dang',
      choices: [
        { zh: '食堂 / 餐厅', zhEn: 'Cafeteria / restaurant.', correct: true },
        { zh: '厨房', zhEn: 'Kitchen', correct: false },
        { zh: '教室', zhEn: 'Classroom', correct: false },
        { zh: '便利店', zhEn: 'Convenience store', correct: false },
      ],
    },
    {
      id: 'd05-v1-r3',
      korean: '몰라요',
      hangul: 'mol-la-yo',
      choices: [
        { zh: '不知道', zhEn: 'I don\'t know', correct: true },
        { zh: '不要', zhEn: 'don\'t want', correct: false },
        { zh: '不喜欢', zhEn: 'Don\'t like it.', correct: false },
        { zh: '不是', zhEn: 'No.', correct: false },
      ],
    },
    {
      id: 'd05-v1-r4',
      korean: '알아요',
      hangul: 'a-ra-yo',
      choices: [
        { zh: '知道 / 认识', zhEn: 'Know / recognize.', correct: true },
        { zh: '喜欢', zhEn: 'like', correct: false },
        { zh: '有', zhEn: 'to have / there is', correct: false },
        { zh: '想要', zhEn: 'To want', correct: false },
      ],
    },
    {
      id: 'd05-v1-r5',
      korean: '오늘',
      hangul: 'o-neul',
      choices: [
        { zh: '今天', zhEn: 'today', correct: true },
        { zh: '昨天', zhEn: 'yesterday', correct: false },
        { zh: '明天', zhEn: 'Tomorrow', correct: false },
        { zh: '每天', zhEn: 'every day', correct: false },
      ],
    },
    {
      id: 'd05-v1-r6',
      korean: '좋아요',
      hangul: 'jo-a-yo',
      choices: [
        { zh: '好 / 喜欢', zhEn: 'Good / like.', correct: true },
        { zh: '不好', zhEn: 'not good', correct: false },
        { zh: '一般', zhEn: 'ordinary', correct: false },
        { zh: '讨厌', zhEn: 'To hate', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词，非字母级）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd05-v1-s1',
      zhHint: '早晨', zhHintEn: 'morning',
      answer: ['아', '침'],
      // 干扰："야"（元音 ㅏ→ㅑ 高频混淆）；"참"（初声 ㅊ→ㅊ 相同，元音差别）
      syllables: ['아', '침', '야', '참'],
    },
    {
      id: 'd05-v1-s2',
      zhHint: '食堂', zhHintEn: 'cafeteria',
      answer: ['식', '당'],
      // 干扰："싣"（收音 ㄱ→ㄷ 混）；"당"字重复本身即答案—换成"덩"（元音 ㅏ→ㅓ 混）
      syllables: ['식', '당', '싣', '덩'],
    },
    {
      id: 'd05-v1-s3',
      zhHint: '不知道', zhHintEn: 'I don\'t know',
      answer: ['몰', '라', '요'],
      // 干扰："말"（元音 ㅗ→ㅏ 混）；"래"（元音 ㅏ→ㅐ 高频混淆）
      syllables: ['몰', '라', '요', '말', '래'],
    },
    {
      id: 'd05-v1-s4',
      zhHint: '昨天', zhHintEn: 'yesterday',
      answer: ['어', '제'],
      // 干扰："아"（元音 ㅓ→ㅏ 混）；"재"（元音 ㅔ→ㅐ 高频混淆）
      syllables: ['어', '제', '아', '재'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd05-v1-d1', korean: '아침',   hangul: 'a-chim',    syllables: ['아', '침'],       zh: '早晨', zhEn: 'morning' },
    { id: 'd05-v1-d2', korean: '알아요', hangul: 'a-ra-yo',   syllables: ['알', '아', '요'], zh: '知道', zhEn: 'Know' },
    { id: 'd05-v1-d3', korean: '같이',   hangul: 'ga-chi',    syllables: ['같', '이'],       zh: '一起（读音 [가치]，字形写 같이）', zhEn: 'together (pronounced [가치], written 같이)' },
  ],
};
