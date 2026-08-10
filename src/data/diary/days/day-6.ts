import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 6 · 韩光教室 · Junho 老虎登场
 *
 * 剧情：兔莉第一天上 韩光语言学校的课。教室门一推开，
 * 一只穿着白衬衫的老虎坐在第一排，怀里抱着一个偶像应援手幅。
 * 他举手介绍自己："안녕하세요, 반장 준호예요. KPOP 좋아해요. 잘 부탁드려요."
 * 兔莉以为老虎都很凶，结果他笑起来虎牙圆圆的，
 * 说"중국에서 왔어요?" 然后掏出一张写着汉字的应援棒说他在追的偶像组合是 4 个中国成员。
 * 这一刻兔莉知道她有了第二个朋友。
 *
 * 学习目标：~이에요? 是非疑问 / 喜欢 좋아해요 / 班级日常
 * 韩语自审：korean skill PASS
 */
export const day6: ToriDay = {
  level: 'beginner',
  day: 6,
  phase: 'foundation',
  title: '韩光教室 · Junho 班长', titleEn: 'Hangwang Classroom · Class President Junho',
  subtitle: '虎牙的老虎其实在追 KPOP', subtitleEn: 'The tiger with fangs is actually into KPOP',
  heroImageUrl: '/images/diary/day-06-hero.jpg',
  estimatedMin: 13,

  opening: {
    date: '9월 6일 · 韩光语学院教室', dateEn: 'September 6 · Hangwang Language Academy Classroom',
    weather: '兽尔 · 晴', weatherEn: 'Seoul · Sunny',
    toriPose: 'shy',
    diaryText: `9月 6日，韩光语学院 102 教室。

第一节韩语课。
我推开门的瞬间，所有动物都看了过来。
窗外兽尔动物城的阳光照进来，黑板上写着"한국어 1급"。

第一排坐着一只老虎。
白衬衫，金色眼睛，怀里抱着一个偶像应援手幅。
他举手站起来：

"안녕하세요, 반장 준호예요. KPOP 좋아해요. 잘 부탁드려요."
（你好，我是班长 Junho。喜欢 KPOP。请多关照。）

我倒抽一口气——老虎都这么凶吗？
结果他笑起来，虎牙圆圆的。
然后他朝我走过来：

"중국에서 왔어요?"（你从中国来吗？）
我点头。
他眼睛亮了，从书包里掏出一张应援棒：
"제가 좋아하는 그룹, 중국 멤버 4명이에요."
（我喜欢的团，4 个中国成员。）

…我有第二个朋友了。`,
  },

  words: [
    {
      id: 'd06-w1',
      korean: '반장',
      hangul: 'ban-jang',
      zh: '班长', zhEn: 'class president',
      pos: '名词', posEn: 'Noun',
      example: { ko: '저는 반장이에요.', zh: '我是班长。', zhEn: 'I\'m the class president.' },
      tip: '받침 ㅇ → 이에요',
    },
    {
      id: 'd06-w2',
      korean: '우리',
      hangul: 'u-ri',
      zh: '我们', zhEn: 'we',
      pos: '代词', posEn: 'Pronoun',
      example: { ko: '우리는 반 친구예요.', zh: '我们是同学。', zhEn: 'We\'re classmates.' },
      tip: '韩国人也用「우리」表示"我"(우리 엄마=我妈)，集体感很强', tipEn: 'Koreans also use 「우리」 to mean "my" (우리 엄마 = my mom), showing a strong sense of collectivism',
    },
    {
      id: 'd06-w3',
      korean: '좋아해요',
      hangul: 'jo-a-hae-yo',
      zh: '喜欢', zhEn: 'like',
      pos: '动词', posEn: 'Verb',
      example: { ko: 'KPOP 좋아해요.', zh: '喜欢 KPOP。', zhEn: 'I like KPOP.' },
      tip: '动词原形「좋아하다」，前面用「을/를」：KPOP을 좋아해요', tipEn: 'Verb base form 「좋아하다」, use 「을/를」 before it: KPOP을 좋아해요',
    },
    {
      id: 'd06-w4',
      korean: '잘 부탁드려요',
      hangul: 'jal bu-tak-deu-ryeo-yo',
      zh: '请多关照', zhEn: 'please take care of me',
      pos: '表达', posEn: 'Expression',
      example: { ko: '신입생 토리예요, 잘 부탁드려요.', zh: '我是新生兔莉，请多关照。', zhEn: 'I\'m new student Tori. Please take care of me.' },
      tip: '比「잘 부탁합니다」更柔和，韩国人日常更爱用', tipEn: 'Softer than 「잘 부탁합니다」, Koreans use it more in daily life',
    },
    {
      id: 'd06-w5',
      korean: '멤버',
      hangul: 'mem-beo',
      zh: '成员', zhEn: 'member',
      pos: '名词', posEn: 'Noun',
      example: { ko: '그룹 멤버는 4명이에요.', zh: '组合成员有 4 个人。', zhEn: 'The group has 4 members.' },
      tip: '英文 member 音译。KPOP 词汇里必背', tipEn: 'Transliteration of the English word \'member.\' Essential KPOP vocabulary.',
    },
    {
      id: 'd06-w6',
      korean: '교실',
      hangul: 'gyo-sil',
      zh: '教室', zhEn: 'Classroom',
      pos: '名词', posEn: 'Noun',
      example: { ko: '교실은 2층이에요.', zh: '教室在 2 楼。', zhEn: 'The classroom is on the 2nd floor.' },
      tip: '받침 ㄹ → 이에요 / 은',
    },
  ],

  dialogue: {
    scene: '韩光语学院 102 教室 · 第一节课前', sceneEn: 'Hangwang Language Academy, Room 102 · Before the first class',
    setting: {
      time: '上午 9 点', timeEn: '9 AM',
      place: '教室', placeEn: 'Classroom',
      npc: 'Junho 老虎', npcEn: 'Junho the Tiger',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '안녕하세요, 반장 준호예요.',
        hangul: 'an-nyeong-ha-se-yo, ban-jang jun-ho-ye-yo',
        zh: '你好，我是班长 Junho。', zhEn: 'Hello, I\'m the class president, Junho.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: 'KPOP 좋아해요. 잘 부탁드려요.',
        hangul: 'KPOP jo-a-hae-yo. jal bu-tak-deu-ryeo-yo',
        zh: '喜欢 KPOP。请多关照。', zhEn: 'I like KPOP. Nice to meet you.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '호랑이가 말하면 다 무섭다…',
        hangul: 'ho-rang-i-ga mal-ha-myeon da mu-seop-da…',
        zh: '老虎说话就都好可怕……', zhEn: 'Tigers are scary when they talk...',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '안녕하세요, 토리예요. 잘 부탁드려요.',
        hangul: 'an-nyeong-ha-se-yo, to-ri-ye-yo. jal bu-tak-deu-ryeo-yo',
        zh: '你好，我是兔莉。请多关照。', zhEn: 'Hello, I\'m Tori. Nice to meet you.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '중국에서 왔어요?',
        hangul: 'jung-guk-e-seo wa-sseo-yo',
        zh: '你从中国来吗？', zhEn: 'Are you from China?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Junho 问"你从中国来吗"，兔莉应该怎么回答？', zhEn: 'Junho asks, \'Are you from China?\' How should Tori respond?',
        practice: 'pick',
        choices: [
          { ko: '네, 중국에서 왔어요.', zh: '是的，我从中国来。', zhEn: 'Yes, I\'m from China.', correct: true },
          { ko: '아니요, 한국 사람이에요.', zh: '不，我是韩国人。', zhEn: 'No, I\'m Korean.', correct: false },
          { ko: '여기는 교실이에요.', zh: '这里是教室。', zhEn: 'This is the classroom.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '是非疑问句 · ~이에요? / ~예요?', titleEn: 'Yes/No Questions · ~이에요? / ~예요?',
    pattern: '陈述: N + 이에요/예요 → 疑问: N + 이에요?/예요? （升调）', patternEn: 'Statement: N + 이에요/예요 → Question: N + 이에요?/예요? (rising intonation)',
    whenToUse: '韩语疑问句最简单的形式——不需要变形、不加疑问词，只要把陈述句的句尾升调，就变成"是___吗？"。Day 6 Junho 问兔莉"是中国人吗"用 이에요? 升调。', whenToUseEn: 'The simplest form of Korean questions—no conjugation, no question words. Just raise the intonation at the end of a statement to turn it into \'Is it ___?\' On Day 6, Junho asks Tori \'Are you Chinese?\' using 이에요? with rising intonation.',
    rules: [
      '**核心规则**：陈述句 → 疑问句，只需句尾升调，无需变形。학생이에요.（我是学生）→ 학생이에요?（你是学生吗？）。书面加 ? 号',
      '**받침规则不变**：有收音 → 이에요?（학생이에요?、사람이에요?）。无收音 → 예요?（토리예요?、친구예요?）。받침规则和 Day 1/4 完全一致',
      '**回答模式**：네（是/对）+ 肯定陈述。아니요（不是）+ 否定陈述。"네, 학생이에요"（是的，我是学生）。"아니요, 학생이 아니에요"（不，我不是学生）',
      '**回答简单记忆**：네 = 对方说的对；아니요 = 对方说错。肯定问句（학생이에요?）用中文习惯直接答就行——Day 10 会详细讲否定疑问的反直觉逻辑',
      '**3 级敬语疑问对照**：합쇼체 → 입니까?（학생입니까?，最正式）。해요체 → 이에요?/예요?（학생이에요?，日常礼貌）。해체(반말) → 이야?/야?（학생이야?，朋友间）',
      '**进阶——있다/없다 疑问**：있어요?（有吗？）/ 없어요?（没有吗？）。一样的升调规则。친구 있어요?（有朋友吗？）→ 네, 있어요 / 아니요, 없어요',
      '**疑问词疑问 vs 是非疑问**：뭐예요?（是什么？）用疑问词 → 不能用 네/아니요 回答。학생이에요?（是学生吗？）无疑问词 → 用 네/아니요 回答',
      '**이에요 vs 예요 的由来**：이다(是) + 어요(敬语) → 이어요 → 이에요（有收音保留 이）/ 예요（无收音省略 이 只留 예）。这是正字法规则，不是口语缩读',
    ],
    examples: [
      { ko: '중국 사람이에요?', zh: '是中国人吗？', zhEn: 'Are you Chinese?', highlight: '이에요?', note: '사람 有받침 ㅁ → 이에요 + 升调 = 疑问。回答: 네 / 아니요' },
      { ko: '학생이에요?', zh: '是学生吗？', zhEn: 'Are you a student?', highlight: '이에요?', note: '학생 有받침 ㅇ → 이에요?。Junho 问兔莉的第一句话' },
      { ko: '토리예요?', zh: '是兔莉吗？', zhEn: 'Are you Tori?', highlight: '예요?', note: '토리 无받침 → 예요?。确认对方名字的标准问法' },
      { ko: '반장이에요?', zh: '是班长吗？', zhEn: 'Are you the class president?', highlight: '이에요?', note: '반장 有받침 ㅇ → 이에요?。Junho 在教室自我介绍后的疑问' },
      { ko: '한국 사람입니까?', zh: '是韩国人吗？（最正式）', zhEn: 'Are you Korean? (Most formal)', highlight: '입니까', note: '입니까 = 합쇼체疑问。对长辈/老师/面试官用，比 이에요? 更正式', noteEn: '입니까 = 합쇼체 question. Used for elders/teachers/interviewers, more formal than 이에요?.' },
      { ko: '친구 있어요?', zh: '有朋友吗？', zhEn: 'Do you have friends?', highlight: '있어요?', note: '있다(有) + 어요 = 있어요。升调变疑问。답변: 네, 있어요 / 아니요, 없어요', noteEn: '있다 (to have) + 어요 = 있어요. Rising tone makes it a question. Answer: 네, 있어요 / 아니요, 없어요.' },
    ],
    pitfall:
      '① 句尾标 ? ≠ 词形变化——中文靠"吗"，韩语靠升调。② 韩语 네/아니요 跟中文逻辑不一样：否定疑问句的回答容易搞反。③ 对老师和长辈用 입니까?，对同学用 이에요?。④ 疑问词(뭐/누구/어디)疑问句不用 네/아니요 回答。',
  },

  output: [
    {
      id: 'd06-o1',
      kind: 'compose',
      zhHint: '是中国人吗？', zhHintEn: 'Are you Chinese?',
      tokens: ['중국', '사람이에요', '?', '예요', '학생이에요', '한국'],
      composeAnswer: ['중국', '사람이에요', '?'],
      successMsg: 'Junho 听到答案，眼睛瞬间亮了，掏出了 KPOP 应援棒 ✨', successMsgEn: 'Junho\'s eyes lit up the moment he heard the answer, and he whipped out his KPOP light stick ✨',
    },
    {
      id: 'd06-o2',
      kind: 'listen-choice',
      audioKo: 'KPOP 좋아해요?',
      successMsg: '✓ 「喜欢 KPOP 吗？」「좋아해요」+ 升调 = 疑问。', successMsgEn: '✓ \'Do you like KPOP?\' \'좋아해요\' + rising tone = question.',
      choices: [
        { zh: '喜欢 KPOP 吗？', zhEn: 'Do you like KPOP?', correct: true },
        { zh: '听 KPOP 吗？', zhEn: 'Do you listen to KPOP?', correct: false },
        { zh: '是 KPOP 团成员吗？', zhEn: 'Are you a KPOP group member?', correct: false },
        { zh: '请多关照。', zhEn: 'Please take care of me.', correct: false },
      ],
    },
    {
      id: 'd06-o3',
      kind: 'zh-to-ko',
      zhPrompt: '你好，我是兔莉。请多关照。', zhPromptEn: 'Hello, I\'m Tori. Nice to meet you.',
      successMsg: '"잘 부탁드려요" 比「잘 부탁합니다」更柔。「토리」无收音(받침 없음)配「예요」。', successMsgEn: '\'잘 부탁드려요\' is softer than \'잘 부탁합니다\'. \'토리\' has no final consonant (받침 없음), so it pairs with \'예요\'.',
      choices: [
        { ko: '안녕하세요, 토리예요. 잘 부탁드려요.', correct: true },
        { ko: '안녕하세요, 토리이에요. 잘 부탁드려요.', correct: false },
        { ko: '안녕하세요, 토리예요. 잘 부탁이에요.', correct: false },
        { ko: '안녕히 가세요, 토리예요. 잘 부탁드려요.', correct: false },
      ],
    },
    {
      id: 'd06-o4',
      kind: 'particle-error',
      zhHint: '我是班长。', zhHintEn: 'I\'m the class president.',
      successMsg: '반장 末字「장」有收音(받침) ㅇ → 이에요。「저는」(无收音(받침 없음)) → 主题助词「는」。', successMsgEn: 'The last syllable of 반장, \'장\', has a final consonant (받침) ㅇ → 이에요. \'저는\' (no final consonant) → topic particle \'는\'.',
      choices: [
        { ko: '저는 반장이에요.', correct: true },
        { ko: '저는 반장예요.', correct: false },
        { ko: '저은 반장이에요.', correct: false },
        { ko: '저는 반장이예요.', correct: false },
      ],
    },
    {
      id: 'd06-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 6 核心词全部对上。Junho 把应援棒举高了一下，算是欢迎你加入。', successMsgEn: '✓ All Day 6 core words matched. Junho raised his light stick a bit, as a welcome to the group.',
      pairs: [
        { ko: '반장', zh: '班长', zhEn: 'class president' },
        { ko: '우리', zh: '我们', zhEn: 'we' },
        { ko: '좋아해요', zh: '喜欢', zhEn: 'like' },
        { ko: '잘 부탁드려요', zh: '请多关照', zhEn: 'please take care of me' },
        { ko: '교실', zh: '教室', zhEn: 'Classroom' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '一周就有了两个朋友。Minji + Haru + Junho。토리, 너무 잘했어요!', praiseEn: 'Two friends in one week. Minji + Haru + Junho. 토리, you did so well!',
    preview: '明天宿管阿姨要做第一次入住检查。一周下来学的话能撑过去吗？', previewEn: 'The dorm manager is doing the first room inspection tomorrow. Can you survive it with what you\'ve learned this week?',
    stickerId: 'sticker-d06',
    sceneImageUrl: '/images/diary/day-06-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~이에요?和~입니까?有什么区别」「KPOP相关韩语怎么说」「韩语怎么说我喜欢」',
};
