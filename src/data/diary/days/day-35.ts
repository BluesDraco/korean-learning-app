import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 35 · 길을 물어봐 · 角色反转
 *
 * 剧情：Tori在地铁站等车，一只海狸大叔急匆匆跑来问她韩光语言学校怎么走。
 * 她深呼吸，用完整的句子指了路。海狸大叔鞠躬道谢。Tori站在原地——
 * 我不再只是那个需要帮助的外国兔子了。
 *
 * 学习目标：방향 표현 / ~(으)로 가세요 / ~에서 ~까지
 * 语料层级：해요体 + 세요 敬语
 * 韩语自审：korean skill PASS
 */
export const day35: ToriDay = {
  level: 'intermediate',
  day: 5,
  phase: 'expansion',
  title: '被问路 · 角色反转', titleEn: 'Asked for directions · role reversal',
  subtitle: '第一次被本地人问路——我能答上来吗？', subtitleEn: 'First time a local asks me for directions — can I answer?',
  heroImageUrl: '/images/diary/day-35-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 8일 · 화요일 오전',
    weather: '兽尔 · 秋高气爽', weatherEn: 'Seoul · Crisp autumn air',
    toriPose: 'shy',
    diaryText: `10月8日，周二早上。

弘爪站2号线站台，我在等下一班车。
广告屏上放着Mochi的新歌——我下意识跟着旋律哼。

"저기, 학생, 잠깐만요."
（同学，等一下。）

我转头。
一只戴鸭舌帽的海狸大叔，气喘吁吁。
手里握着一张皱巴巴的地址纸。

"한빛 어학당 어디예요?"
（韩光语学院在哪里？）

我愣了一秒。
——被问路了。第一次。
被一个本地人问路。

心跳有点快，
但我想起Day 16老犬中介说话的样子。
深呼吸——

"2번 출구로 나가서, 왼쪽으로 쭉 가세요.
5분쯤 걸어요. 편의점 옆에 있어요."

海狸大叔鞠了一躬："고마워요, 학생."
然后跑向2号出口。

我站在原地，
突然意识到——
我不再只是那只需要帮助的外国兔子了。`,
  },

  words: [
    {
      id: 'd35-w1',
      korean: '출구',
      hangul: 'chul-gu',
      zh: '出口', zhEn: 'exit',
      pos: '名词', posEn: 'Noun',
      example: { ko: '2번 출구로 나가세요.', zh: '请从2号出口出去。', zhEn: 'Please exit through Exit 2.' },
      tip: '출(出) + 구(口)。地铁站导航必备。입구 = 入口', tipEn: '출(out) + 구(gate). Essential for navigating subway stations. 입구 = entrance',
    },
    {
      id: 'd35-w2',
      korean: '왼쪽',
      hangul: 'oen-jjok',
      zh: '左边', zhEn: 'left side',
      pos: '名词', posEn: 'Noun',
      example: { ko: '왼쪽으로 가세요.', zh: '请往左走。', zhEn: 'Please go left.' },
      tip: '왼(左) + 쪽(边)。反义: 오른쪽(右)。介词用 ~으로', tipEn: '왼(left) + 쪽(side). Opposite: 오른쪽(right). Use preposition ~으로',
    },
    {
      id: 'd35-w3',
      korean: '오른쪽',
      hangul: 'o-reun-jjok',
      zh: '右边', zhEn: 'right side',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오른쪽 편의점 옆이에요.', zh: '在右边便利店旁边。', zhEn: 'It\'s next to the convenience store on the right.' },
      tip: '오른 + 쪽。왼쪽/오른쪽 是问路四件套之二', tipEn: '오른 + 쪽. 왼쪽/오른쪽 are two of the four essentials for asking directions',
    },
    {
      id: 'd35-w4',
      korean: '쭉',
      hangul: 'jjuk',
      zh: '一直/笔直', zhEn: 'straight',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '쭉 가세요.', zh: '请一直走。', zhEn: 'Please go straight.' },
      tip: '拟态词。쭉 가다 = 直走。问路核心副词', tipEn: 'Mimetic word. 쭉 가다 = go straight. Core adverb for directions',
    },
    {
      id: 'd35-w5',
      korean: '걸어요',
      hangul: 'geo-reo-yo',
      zh: '走（走路）', zhEn: 'to walk',
      pos: '动词', posEn: 'Verb',
      example: { ko: '5분쯤 걸어요.', zh: '走大概5分钟。', zhEn: 'Walk about 5 minutes.' },
      tip: '걷다(走) → 걸어요。ㄷ 不规则：ㄷ → ㄹ 前 아/어', tipEn: '걷다(walk) → 걸어요. ㄷ irregular: ㄷ → ㄹ before 아/어',
    },
    {
      id: 'd35-w6',
      korean: '어학당',
      hangul: 'eo-hak-dang',
      zh: '语学堂', zhEn: 'language school',
      pos: '名词', posEn: 'Noun',
      example: { ko: '한빛 어학당은 여기서 5분이에요.', zh: '韩光语学堂离这里5分钟。', zhEn: 'Hangwang Language School is 5 minutes from here.' },
      tip: '어(语) + 학(学) + 당(堂)。语言学校的正式称呼', tipEn: '어(language) + 학(study) + 당(hall). Formal term for language school',
    },
  ],

  dialogue: {
    scene: '弘爪地铁站·被问路', sceneEn: 'Hongjjak Station · Asked for Directions',
    setting: {
      time: '周二早上 9:30', timeEn: 'Tuesday morning, 9:30',
      place: '弘爪站2号线站台', placeEn: 'Hongjjak Station, Line 2 platform',
      npc: '海狸大叔', npcEn: 'Uncle Beaver',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '海狸大叔', npcNameEn: 'Uncle Beaver',
        ko: '저기, 학생, 잠깐만요.',
        hangul: 'jeo-gi, hak-saeng, jam-kkan-man-yo',
        zh: '同学，等一下。', zhEn: 'Excuse me, student, wait a moment.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '海狸大叔', npcNameEn: 'Uncle Beaver',
        ko: '한빛 어학당 어디예요?',
        hangul: 'han-bit eo-hak-dang eo-di-ye-yo?',
        zh: '韩光语学堂在哪里？', zhEn: 'Where is Hangwang Language School?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '아, 길 물어보시네. 침착해, 나 이 근처 잘 알아.',
        hangul: 'a, gil mu-reo-bo-si-ne. chim-cha-kae, na i geun-cheo jal a-ra',
        zh: '啊，问路呢。冷静，我熟悉这附近。', zhEn: 'Ah, someone\'s asking for directions. Stay calm, I know this area well.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '2번 출구로 나가서, 왼쪽으로 쭉 가세요.',
        hangul: 'i-beon chul-gu-ro na-ga-seo, oen-jjo-geu-ro jjuk ga-se-yo',
        zh: '从2号出口出去，然后往左一直走。', zhEn: 'Go out through Exit 2, then keep walking left.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '5분쯤 걸어요. 편의점 옆에 있어요.',
        hangul: 'o-bun-jjeum geo-reo-yo. pyeo-nui-jeom yeo-pe i-sseo-yo',
        zh: '走大概5分钟。在便利店旁边。', zhEn: 'It\'s about a 5-minute walk. It\'s next to the convenience store.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '海狸大叔鞠躬说"고마워요, 학생"。Tori最自然的回应是？', zhEn: 'Uncle Beaver bows and says "고마워요, 학생". What\'s Tori\'s most natural response?',
        practice: 'pick',
        choices: [
          { ko: '아니에요. 조심히 가세요.', zh: '不客气。请慢走。', zhEn: 'You\'re welcome. Take care.', correct: true },
          { ko: '고마워요.', zh: '谢谢。', zhEn: 'Thank you.', correct: false },
          { ko: '괜찮으세요?', zh: '您还好吗？', zhEn: 'Are you okay?', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '往___走 / 从___到___：~(으)로 / ~에서 ~까지', titleEn: 'Toward ___ / From ___ to ___: ~(으)로 / ~에서 ~까지',
    pattern: 'N + **(으)로 가세요** · **N에서 N까지**',
    whenToUse: '指路两个核心助词。**(으)로** 表方向（"往哪"）：왼쪽으로 = 往左；2번 출구로 = 往2号出口。**에서~까지** 表起终点：집에서 학교까지 = 从家到学校。海狸大叔一句"어디예요"，Tori 用这两个句型答完整。', whenToUseEn: 'Two key particles for giving directions. **(으)로** indicates direction ("toward where"): 왼쪽으로 = to the left; 2번 출구로 = to Exit 2. **에서~까지** indicates start and end points: 집에서 학교까지 = from home to school. When Uncle Beaver asks "어디예요", Tori uses these two patterns to answer fully.',
    rules: [
      '**方向 ~(으)로**：有收音 → **으로**（밖으로 = 往外）；无收音 or ㄹ收音 → **로**（왼쪽으로、지하철로 = 用地铁）',
      '**起点终点 ~에서 ~까지**：에서 = 从（起点），까지 = 到（终点）。집에서 학교까지 5분이에요 = 从家到学校5分钟',
      '**动词固定搭配**：~(으)로 + 가다/오다/나가다（去/来/出去）。方向词 + 으로 是最刚需的组合',
      '**~쭉/똑바로 + 가세요**：쭉 가세요 = 一直走。똑바로 가세요 = 笔直走。指路必备副词'
    ],
    examples: [
      { ko: '왼쪽으로 가세요.', zh: '请往左走。', zhEn: 'Please go left.', highlight: '왼쪽으로', note: '왼쪽 有收音 ㄱ → **으로**。指路最核心的一句', noteEn: '왼쪽 ends with the final consonant ㄱ → **으로**. The most essential phrase for giving directions.' },
      { ko: '2번 출구로 나가세요.', zh: '请从2号出口出去。', zhEn: 'Please exit through Exit 2.', highlight: '출구로', note: '출구 无收音 → **로**。나가다 + 로 是地铁站导航固定搭配', noteEn: '출구 has no final consonant → **로**. 나가다 + 로 is the standard combination for subway station navigation.' },
      { ko: '집에서 학교까지 5분이에요.', zh: '从家到学校5分钟。', zhEn: 'It\'s 5 minutes from home to school.', highlight: '에서 ... 까지', note: '起点助词 에서 + 终点助词 까지 = 距离/时间表达', noteEn: 'Starting particle 에서 + ending particle 까지 = expressing distance/time.' },
      { ko: '쭉 가서 오른쪽으로 도세요.', zh: '一直走然后往右转。', zhEn: 'Keep going straight, then turn right.', highlight: '쭉 ... 으로', note: '쭉 + 가서(走) + 방향 + 으로 + 돌다(转)。指路进阶句', noteEn: '쭉 + 가서 (walk) + direction + 으로 + 돌다 (turn). An advanced sentence for giving directions.' },
    ],
    pitfall:
      '① ~(으)로 的选择看收音：❌ 왼쪽로 → ✅ 왼쪽으로（왼쪽 末字有 ㄱ）；❌ 지하철으로 → ✅ 지하철로（ㄹ收音特殊，用로）。② 에서 ≠ 에：에서 用于**动作起点**（집에서 오다 从家来）；에 用于**存在位置**（집에 있다 在家）。③ 까지 只表终点，不表"甚至"意思时不用「까지도」。',
  },

  output: [
    {
      id: 'd35-o1',
      kind: 'compose',
      zhHint: '请从2号出口出去，往左一直走。', zhHintEn: 'Please go out through Exit 2 and keep walking left.',
      tokens: ['2번', '출구로', '나가서', '왼쪽으로', '쭉 가세요', '가세요', '갑니다'],
      composeAnswer: ['2번', '출구로', '나가서', '왼쪽으로', '쭉 가세요'],
      successMsg: '第一次给别人指路。完整的一句。', successMsgEn: 'Giving directions for the first time. A complete sentence.',
    },
    {
      id: 'd35-o2',
      kind: 'listen-choice',
      audioKo: '집에서 학교까지 5분이에요.',
      successMsg: '✓ 从___到___的距离/时间标准表达。', successMsgEn: '✓ Standard expression for distance/time from ___ to ___.',
      choices: [
        { zh: '从家到学校5分钟。', zhEn: 'It\'s 5 minutes from home to school.', correct: true },
        { zh: '学校在家里5分钟处。', zhEn: 'The school is 5 minutes from home.', correct: false },
        { zh: '在家学习5分钟。', zhEn: 'Study at home for 5 minutes.', correct: false },
        { zh: '5分钟能到家。', zhEn: '5 minutes to get home.', correct: false },
      ],
    },
    {
      id: 'd35-o3',
      kind: 'zh-to-ko',
      zhPrompt: '请一直走然后往右转。', zhPromptEn: 'Please go straight and then turn right.',
      successMsg: '"쭉 가서 오른쪽으로 도세요." — 쭉 + 방향으로 + 돌다。',
      choices: [
        { ko: '쭉 가서 오른쪽으로 도세요.', correct: true },
        { ko: '쭉 가고 오른쪽에 도세요.', correct: false },
        { ko: '쭉 가서 오른쪽에서 도세요.', correct: false },
        { ko: '쭉 가고 오른쪽로 도세요.', correct: false },
      ],
    },
    {
      id: 'd35-o4',
      kind: 'particle-error',
      zhHint: '请往地铁站方向走。', zhHintEn: 'Please walk toward the subway station.',
      successMsg: '지하철역 有收音 → **으로**。收音判断决定 으로 / 로。', successMsgEn: '지하철역 has a batchim → use **으로**. The batchim determines whether to use 으로 or 로.',
      choices: [
        { ko: '지하철역으로 가세요.', correct: true },
        { ko: '지하철역로 가세요.', correct: false },
        { ko: '지하철역에 가세요.', correct: false },
        { ko: '지하철역까지 가세요.', correct: false },
      ],
    },
    {
      id: 'd35-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 35 全对。这条路，Tori 走成了本地人。', successMsgEn: '✓ Day 35 all correct. On this road, Tori has become a local.',
      pairs: [
        { ko: '출구', zh: '出口', zhEn: 'exit' },
        { ko: '왼쪽', zh: '左边', zhEn: 'left side' },
        { ko: '오른쪽', zh: '右边', zhEn: 'right side' },
        { ko: '쭉', zh: '一直', zhEn: 'straight / all the way' },
        { ko: '걸어요', zh: '走路', zhEn: 'walk / on foot' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '길을 알려줬어요! 이제 도움받는 사람이 아니라, 도와주는 사람.',
    preview: '明天，Tori收到一个包裹——妈妈从中国寄来的火锅底料。', previewEn: 'Tomorrow, Tori receives a package — hotpot base sent by mom from China.',
    stickerId: 'sticker-d35',
    sceneImageUrl: '/images/diary/day-35-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~(으)로 和 ~에 有什么区别？」「地铁站问路怎么说？」',
};
