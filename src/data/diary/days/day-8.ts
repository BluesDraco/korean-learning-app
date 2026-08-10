import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 8 · 第一晚想家 · 独处
 *
 * 剧情：地铁事件后的夜晚，Tori 坐在宿舍 301 的床上。
 * 房间里只有泡面、行李箱和一面贴满便利贴的镜子。
 * 外面兽尔动物城的夜景很美，但她觉得自己很小。
 *
 * 学习目标：~고 싶어요 (想做___) / 보고 싶어요 (想念) / 情绪表达
 * 语料层级：해요体 + 独白반말
 * 韩语自审：korean skill PASS（자연성/문법/발음 三关）
 */
export const day8: ToriDay = {
  level: 'beginner',
  day: 8,
  phase: 'foundation',
  title: '第一晚想家 · 独处', titleEn: 'First night homesick · alone',
  subtitle: '空荡荡的房间只有泡面和想家的眼泪', subtitleEn: 'An empty room with only instant noodles and homesick tears',
  heroImageUrl: '/images/diary/day-08-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 8일 · 일요일 밤',
    weather: '兽尔 · 雨后', weatherEn: 'Seoul · after the rain',
    toriPose: 'shy',
    diaryText: `9月 8日，深夜。

Haru 把我送回宿舍门口，
说了声"잘 자"，就回 302 了。

我关上 301 的门。

房间里有：
一箱还没开的行李、
一包即食泡面、
一面贴满便利贴的镜子——
上面有妈妈的字：「加油」。

窗外是兽尔动物城的夜景。
很美。但我觉得自己很小。

我打开手机想给妈妈打电话，
然后想了想，关上了。

对着镜子说：
"엄마, 나 잘 지내고 있어."
（妈妈，我过得很好。）

然后哭了。`,
  },

  words: [
    {
      id: 'd08-w1',
      korean: '외로워요',
      hangul: 'oe-ro-wo-yo',
      zh: '孤独', zhEn: 'Loneliness',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '오늘 외로워요.', zh: '今天感到孤独。', zhEn: 'I feel lonely today.' },
      tip: '形容词「외롭다」的 해요体形。坦诚说出来反而轻松', tipEn: 'The adjective \'외롭다\' in 해요 form. Saying it honestly makes it lighter.',
    },
    {
      id: 'd08-w2',
      korean: '보고 싶어요',
      hangul: 'bo-go si-peo-yo',
      zh: '想念', zhEn: 'miss',
      pos: '表达', posEn: 'Expression',
      example: { ko: '엄마가 보고 싶어요.', zh: '我想妈妈。', zhEn: 'I miss my mom.' },
      tip: '보다(看/见) + 고 싶어요(想做)。「보고 싶다」= 想见到。韩语里「想念」就是「想见」', tipEn: '보다 (to see) + 고 싶어요 (want to). \'보고 싶다\' = want to see. In Korean, \'missing\' is \'wanting to see\'',
    },
    {
      id: 'd08-w3',
      korean: '전화',
      hangul: 'jeon-hwa',
      zh: '电话', zhEn: 'Phone call',
      pos: '名词', posEn: 'Noun',
      example: { ko: '전화할게요.', zh: '我会打电话的。', zhEn: 'I\'ll make the call.' },
      tip: '전화(电话) + 하다 = 打电话。전화 받다 = 接电话', tipEn: '전화 (phone) + 하다 = to call. 전화 받다 = to answer the phone',
    },
    {
      id: 'd08-w4',
      korean: '울다',
      hangul: 'ul-da',
      zh: '哭', zhEn: 'Crying',
      pos: '动词', posEn: 'Verb',
      example: { ko: '조금 울었어요.', zh: '哭了一会儿。', zhEn: 'I cried for a bit.' },
      tip: '울다 → 해요体 울어요。在韩国哭一哭没关系，Haru 一定懂', tipEn: '울다 → 해요 form 울어요. It\'s okay to cry in Korea; Haru will understand.',
    },
    {
      id: 'd08-w5',
      korean: '내일',
      hangul: 'nae-il',
      zh: '明天', zhEn: 'Tomorrow',
      pos: '名词', posEn: 'Noun',
      example: { ko: '내일 또 해요.', zh: '明天继续。', zhEn: 'I\'ll continue tomorrow.' },
      tip: '오늘(今天) / 내일(明天) / 어제(昨天)。三个时间词必背', tipEn: '오늘 (today) / 내일 (tomorrow) / 어제 (yesterday). Three time words you must memorize.',
    },
    {
      id: 'd08-w6',
      korean: '괜찮아질 거예요',
      hangul: 'gwaen-cha-na-jil geo-ye-yo',
      zh: '会好起来的', zhEn: 'It\'ll get better',
      pos: '表达', posEn: 'Expression',
      example: { ko: '괜찮아질 거예요. 진짜로.', zh: '会好起来的。真的。', zhEn: 'It\'ll get better. Really.' },
      tip: '괜찮다(没事) + -아지다(变得...) + -ㄹ 거예요(将会) = 会变没事的。对自己说的最温柔一句话', tipEn: '괜찮다 (okay) + -아지다 (become) + -ㄹ 거예요 (will) = will become okay. The gentlest thing you can say to yourself.',
    },
  ],

  dialogue: {
    scene: '宿舍 301 · 深夜独处', sceneEn: 'Dorm 301 · alone late at night',
    setting: {
      time: '深夜', timeEn: 'Late night',
      place: '宿舍 301', placeEn: 'Dorm 301',
      npc: '镜子里的自己', npcEn: 'Myself in the mirror',
    },
    lines: [
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '엄마 보고 싶어…',
        hangul: 'eom-ma bo-go si-peo…',
        zh: '想妈妈……', zhEn: 'I miss Mom...',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '엄마, 나 잘 지내고 있어.',
        hangul: 'eom-ma, na jal ji-nae-go i-sseo',
        zh: '妈妈，我过得很好。', zhEn: 'Mom, I\'m doing well.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '한국어 너무 어려워.',
        hangul: 'han-gu-geo neo-mu eo-ryeo-wo',
        zh: '韩语好难。', zhEn: 'Korean is so hard.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '근데… 내일 또 해야지.',
        hangul: 'geun-de… nae-il tto hae-ya-ji',
        zh: '但是……明天还要继续。', zhEn: 'But... tomorrow must go on.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Tori 对着镜子，给明天的自己说最后一句话——哪句最像真正鼓励自己的话？', zhEn: 'Tori looks in the mirror and says one last thing to tomorrow\'s self—which one sounds most like real self-encouragement?',
        practice: 'pick',
        choices: [
          { ko: '내일도 화이팅. 괜찮아질 거야.', zh: '明天也加油。会好起来的。（自我鼓励）', zhEn: 'Keep it up tomorrow. It\'ll get better. (Self-encouragement)', correct: true },
          { ko: '감사합니다. 죄송합니다.', zh: '谢谢。对不起。（礼貌句，对镜子说不合语境）', zhEn: 'Thank you. I\'m sorry. (Polite phrases, not fitting for talking to a mirror)', correct: false },
          { ko: '저는 중국 사람이에요.', zh: '我是中国人。（自我介绍，此时此刻不合适）', zhEn: 'I\'m Chinese. (Self-introduction, not appropriate at this moment)', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '想做某事 · 동사 + 고 싶어요', titleEn: 'Want to do something · Verb + 고 싶어요',
    pattern: '동사 어간 + 고 싶어요  /  명사 + 하고 싶어요',
    whenToUse: '表达"想做___"的万能句型，TOPIK 初级必考。韩语里说"我想妈妈"其实是"我想见妈妈"——보다(见) + 고 싶어요 = 보고 싶어요（想见=想念）。Day 8 兔莉想家了，对着镜子说想妈妈。', whenToUseEn: 'The all-purpose pattern for expressing \'want to do ___\', a must-know for TOPIK beginner level. In Korean, saying \'I miss Mom\' is actually \'I want to see Mom\'—보다 (to see) + 고 싶어요 = 보고 싶어요 (to miss). Day 8: Tori is homesick and says she misses Mom to the mirror.',
    rules: [
      '**基本公式**：动词词干 + 고 싶어요。去掉 다 加 고 싶어요：가다→가고 싶어요（想去）、먹다→먹고 싶어요（想吃）、보다→보고 싶어요（想看/想见）',
      '**名词 + 하다 类动词**：许多名词加 하다 就成动词，再接 고 싶어요。공부(名词) + 하다 = 공부하다 → 공부하고 싶어요（想学习）。전화 + 하다 → 전화하고 싶어요（想打电话）。想要具体的东西要用 을/를 + 원하다：물을 원해요（想要水）',
      '**싶다 词性陷阱**：싶다 本身是形容词(형용사)，所以 고 싶어요 整体按形容词规则变化——过去式用 고 싶었어요，否定用 고 싶지 않아요（而不是 안 먹고 싶어요）',
      '**第一/第二人称 vs 第三人称**：韩语中 고 싶어요 只能用于第一人称（我想）和第二人称疑问（你想吗？）。第三人称（他想）用 고 싶어해요：토리가 한국에 가고 싶어해요（兔莉想去韩国）',
      '**보고 싶어요 = 我想你**：韩语没有直接"想念"这个动词，用 보다(见) + 고 싶어요 = 想见 → 想念。엄마 보고 싶어요（我想妈妈）、보고 싶을 거야（我会想你的）',
      '**否定两种方式**：① 短否定 안 + 动词 + 고 싶어요 → 안 먹고 싶어요（不想吃，口语常用）。② 长否定 动词 + 고 싶지 않아요 → 먹고 싶지 않아요（不想吃，更标准）',
      '**过去式**：动词词干 + 고 싶었어요。어제 한국에 가고 싶었어요（昨天想去韩国）。먹고 싶었는데 못 먹었어요（想吃但没能吃到）',
      '**고 싶어요 vs -(으)ㄹ래요**：两者都表达意愿但不同。고 싶어요 = 内心愿望（可能不行动），-(으)ㄹ래요 = 即时决定/邀请（马上行动）。갈래요?（走吗？邀请）vs 가고 싶어요（想去，内心愿望）',
    ],
    examples: [
      { ko: '엄마가 보고 싶어요.', zh: '我想妈妈。', zhEn: 'I miss my mom.', highlight: '보고 싶어요', note: '보다(见) + 고 싶어요 = 想见。韩语"想念"就是"想见"，直译理解很容易', noteEn: '보다 (to see) + 고 싶어요 = to want to see. In Korean, \'to miss\' is \'to want to see\'—easy to understand literally.' },
      { ko: '한국에 가고 싶어요.', zh: '我想去韩国。', zhEn: 'I want to go to Korea.', highlight: '가고 싶어요', note: '가다 词干 가 + 고 싶어요。에 是地点助词', noteEn: '가다 stem 가 + 고 싶어요. 에 is the location particle.' },
      { ko: '불고기 먹고 싶어요.', zh: '我想吃烤肉。', zhEn: 'I want to eat bulgogi.', highlight: '먹고 싶어요', note: '먹다 词干 먹 + 고 싶어요。불고기(烤肉) 是韩国代表料理', noteEn: '먹다 stem 먹 + 고 싶어요. Bulgogi (grilled meat) is a representative Korean dish.' },
      { ko: '친구 하고 싶어요.', zh: '我想交朋友。', zhEn: 'I want to make friends.', highlight: '하고 싶어요', note: '名词 + 하고 싶어요 = 想要某物/想做某事。친구(朋友) 是名词' },
      { ko: '보고 싶을 거야.', zh: '我会想你的。', zhEn: 'I\'ll miss you.', highlight: '보고 싶을 거야', note: '보다 + 고 + 싶다 → 싶을 거야（将来时推测）。对朋友说的 반말', noteEn: '보다 + 고 + 싶다 → 싶을 거야 (future tense conjecture). Casual speech to a friend.' },
      { ko: '집에 가고 싶지 않아요.', zh: '不想回家。', zhEn: 'I don\'t want to go home.', highlight: '싶지 않아요', note: '长否定：고 싶지 않아요。口语也可说 안 가고 싶어요', noteEn: 'Long negation: 고 싶지 않아요. In speech, you can also say 안 가고 싶어요.' },
    ],
    pitfall:
      '① 想某人/某物必须用 보고 싶어요（想见），不能说 엄마 싶어요 ❌。② 第三人称必须用 고 싶어해요：토리가 가고 싶어요 ❌ → 가고 싶어해요 ✅。③ 싶다 是形容词，过去式要加 었 → 싶었어요。容易漏掉过去时标记 었，写成 싶어요。④ 안 고 싶어요 ❌——안 要放在动词前（안 먹고 싶어요），不能插在 고 前面。',
  },

  output: [
    {
      id: 'd08-o1',
      kind: 'compose',
      zhHint: '我想妈妈。', zhHintEn: 'I miss my mom.',
      tokens: ['엄마가', '보고', '싶어요', '엄마를', '만나요', '보아요'],
      composeAnswer: ['엄마가', '보고', '싶어요'],
      successMsg: '镜子里的兔莉点了点头。', successMsgEn: 'Tori in the mirror nodded.',
    },
    {
      id: 'd08-o2',
      kind: 'listen-choice',
      audioKo: '한국어를 공부하고 싶어요.',
      successMsg: '✓「我想学韩语」。공부하다 + 고 싶어요。', successMsgEn: '✓ \'I want to learn Korean.\' 공부하다 + 고 싶어요.',
      choices: [
        { zh: '我想学韩语。', zhEn: 'I want to learn Korean.', correct: true },
        { zh: '我在学韩语。', zhEn: 'I\'m learning Korean.', correct: false },
        { zh: '韩语很难。', zhEn: 'Korean is hard.', correct: false },
        { zh: '我不想学韩语。', zhEn: 'I don\'t want to study Korean.', correct: false },
      ],
    },
    {
      id: 'd08-o3',
      kind: 'zh-to-ko',
      zhPrompt: '我想回家。', zhPromptEn: 'I want to go home.',
      successMsg: '집에 가고 싶어요。집(家) + 에(方向助词) + 가다 + 고 싶어요。', successMsgEn: '집에 가고 싶어요. 집 (home) + 에 (direction particle) + 가다 + 고 싶어요.',
      choices: [
        { ko: '집에 가고 싶어요.', correct: true },
        { ko: '집이 가고 싶어요.', correct: false },
        { ko: '집에 보고 싶어요.', correct: false },
        { ko: '집을 가고 싶어요.', correct: false },
      ],
    },
    {
      id: 'd08-o4',
      kind: 'particle-error',
      zhHint: '我想念朋友。（助词选哪个？）', zhHintEn: 'I miss my friend. (Which particle?)',
      successMsg: '친구**가** 보고 싶어요。「보고 싶다」的思念对象用 이/가，不用 을/를。', successMsgEn: '친구**가** 보고 싶어요. The object of longing in \'보고 싶다\' takes 이/가, not 을/를.',
      choices: [
        { ko: '친구가 보고 싶어요.', correct: true },
        { ko: '친구도 보고 싶어요.', correct: false },
        { ko: '친구는 보고 싶어요.', correct: false },
        { ko: '친구에 보고 싶어요.', correct: false },
      ],
    },
    {
      id: 'd08-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 8 核心词全部对上。明天继续，괜찮아질 거야。', successMsgEn: '✓ Day 8 core words all matched. Keep going tomorrow, 괜찮아질 거야.',
      pairs: [
        { ko: '외로워요', zh: '孤独', zhEn: 'Loneliness' },
        { ko: '보고 싶어요', zh: '想念', zhEn: 'miss' },
        { ko: '울다', zh: '哭', zhEn: 'Crying' },
        { ko: '내일', zh: '明天', zhEn: 'Tomorrow' },
        { ko: '괜찮아질 거예요', zh: '会好起来的', zhEn: 'It\'ll get better' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '哭了也没关系。明天还是会继续的。토리, 오늘도 잘했어요.', praiseEn: 'It\'s okay to cry. Tomorrow will still go on. 토리, 오늘도 잘했어요.',
    preview: '明天——一个人去 CU 便利店买早饭。一个人，第一次。', previewEn: 'Tomorrow—going to CU convenience store alone to buy breakfast. Alone, for the first time.',
    stickerId: 'sticker-d08',
    sceneImageUrl: '/images/diary/day-08-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「韩语怎么说我想念某人」「고 싶어요 和 고 싶다 有什么区别」「安慰自己的韩语怎么说」',
};
