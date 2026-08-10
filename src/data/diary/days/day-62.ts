import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 62 · 알바 면접 · 咖啡馆面试
 *
 * 剧情：Tori去咖啡馆应聘打工。熊店长问韩语水平，她说"조금요"。熊店长笑说"솔직해서 좋아".
 * 诚实比完美更重要——Tori课堂外的第一课。
 *
 * 学习目标：겸손 표현 / 면접 대답 / -아/어서 (Day 32/52 종합 복습)
 * 语料层级：해요体 · 面试正式
 */
export const day62: ToriDay = {
  level: 'advanced',
  day: 2,
  phase: 'mastery',
  title: '打工面试 · 咖啡馆', titleEn: 'Part-time job interview · Café',
  subtitle: '"솔직해서 좋아" — 诚实比完美更重要', subtitleEn: '"솔직해서 좋아" — Honesty matters more than perfection',
  heroImageUrl: '/images/diary/day-62-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 5일 · 화요일 오후',
    weather: '兽尔 · 阴', weatherEn: 'Soo-ah · Yin',
    toriPose: 'shy',
    diaryText: `11月5日，周二下午。

学校旁边那家"곰다방"咖啡馆窗户上贴了张 A4 招聘启事，昨天路过的时候看到的。

推门进去，柜台后面站着一只穿围裙的黑熊，胸牌上写着"사장 김"。我把简历递过去，他擦了擦手接过来，抬头问我：

"이력서 잘 봤어. 한국어는 얼마나 해?"
（简历看了。你韩语说到什么水平？）

我犹豫了几秒。说"잘해요"是骗人，说"못해요"就没机会了，说"보통이에요"又太抽象。

我抬头看着他，说了实话：

"조금요. 근데 계속 배우고 있어요."
（一点点。但一直在学。）

黑熊眯了眯眼睛，然后笑出声：

"솔직해서 좋아. 완벽한 사람 안 뽑아. 정직한 사람 뽑아."
（诚实好。我不招完美的人，我招诚实的人。）

明天开始上班。

出门的时候心跳很快。不是紧张——是因为我第一次发现，诚实也是一种能力。

课堂里追学分满分的我，课堂外靠"诚实"拿到第一份兼职的我。这两个我，都是我。`,
  },

  words: [
    {
      id: 'd62-w1',
      korean: '아르바이트',
      hangul: 'a-reu-ba-i-teu',
      zh: '兼职/打工', zhEn: 'part-time job',
      pos: '名词', posEn: 'Noun',
      example: { ko: '카페 아르바이트를 시작해요.', zh: '开始咖啡馆打工。', zhEn: 'Started working part-time at the café.' },
      tip: '독일어 Arbeit 유래. 줄여서 "알바"라고 함',
    },
    {
      id: 'd62-w2',
      korean: '면접',
      hangul: 'myeon-jeop',
      zh: '面试', zhEn: 'interview',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오늘 면접 봤어요.', zh: '今天面了试。', zhEn: 'Had an interview today.' },
      tip: '面(면) + 接(접). 면접보다 = 面试 (동사搭配)', tipEn: '면(面) + 접(接). 면접보다 = interview (verb collocation)',
    },
    {
      id: 'd62-w3',
      korean: '이력서',
      hangul: 'i-ryeok-seo',
      zh: '简历', zhEn: 'resume',
      pos: '名词', posEn: 'Noun',
      example: { ko: '이력서를 냈어요.', zh: '交了简历。', zhEn: 'Submitted my resume.' },
      tip: '履(이) + 历(력) + 书(서). 이력서를 내다 = 投简历', tipEn: '이(履) + 력(歷) + 서(書). 이력서를 내다 = submit a resume',
    },
    {
      id: 'd62-w4',
      korean: '솔직하다',
      hangul: 'sol-jji-ka-da',
      zh: '直率/诚实', zhEn: 'straightforward/honest',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '솔직해서 좋아요.', zh: '直率所以好。', zhEn: 'Being straightforward is good.' },
      tip: '外来汉字 率(솔) + 直(직). 韩国面试文化重视这个词', tipEn: 'Sino-Korean 率(솔) + 直(직). This word is valued in Korean interview culture.',
    },
    {
      id: 'd62-w5',
      korean: '정직하다',
      hangul: 'jeong-ji-ka-da',
      zh: '正直/诚实', zhEn: 'honest',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '정직한 사람이 좋아요.', zh: '喜欢诚实的人。', zhEn: 'I like honest people.' },
      tip: '正(정) + 直(직). 솔직 은 표현이 직설적, 정직 은 도덕적', tipEn: '正(jeong) + 直(jik). 솔직 means blunt in expression, 정직 means morally honest',
    },
    {
      id: 'd62-w6',
      korean: '뽑다',
      hangul: 'ppop-da',
      zh: '选/招（人）', zhEn: 'to select/hire (someone)',
      pos: '动词', posEn: 'Verb',
      example: { ko: '정직한 사람을 뽑아요.', zh: '招诚实的人。', zhEn: 'Hire honest people.' },
      tip: 'Day 51 学过 (抽卡). 이 날은 招人/选拔', tipEn: 'Learned on Day 51 (card draw). This day is about hiring/selection',
    },
  ],

  dialogue: {
    scene: '곰다방 카페 · 면접',
    setting: {
      time: '周二 15:00', timeEn: 'Tuesday 15:00',
      place: '학교 앞 곰다방 카페',
      npc: '黑熊 사장', npcEn: 'Boss Black Bear',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '黑熊 사장', npcNameEn: 'Boss Black Bear',
        ko: '이력서 잘 봤어. 한국어는 얼마나 해?',
        hangul: 'i-ryeok-seo jal bwa-sseo. han-gu-geo-neun eol-ma-na hae?',
        zh: '简历看了。韩语到什么水平？', zhEn: 'I\'ve seen your resume. What\'s your Korean level?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '조금요. 근데 계속 배우고 있어요.',
        hangul: 'jo-geu-myo. geun-de gye-sok bae-u-go i-sseo-yo',
        zh: '一点。但一直在学。', zhEn: 'A little. But I keep learning.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '黑熊 사장', npcNameEn: 'Boss Black Bear',
        ko: '솔직해서 좋아. 완벽한 사람 안 뽑아. 정직한 사람 뽑아.',
        hangul: 'sol-jji-kae-seo jo-a. wan-byeo-kan sa-ram an ppo-ba. jeong-ji-kan sa-ram ppo-ba',
        zh: '诚实好。我不招完美的人。招诚实的人。', zhEn: 'Honesty is good. I don\'t hire perfect people. I hire honest people.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '아… 정직이 능력이 되네.',
        hangul: 'a… jeong-ji-gi neung-nyeo-gi doe-ne',
        zh: '啊……原来诚实也是能力。', zhEn: 'Ah... so honesty is a skill too.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '黑熊 사장', npcNameEn: 'Boss Black Bear',
        ko: '내일 오후 3시부터 시작할 수 있어?',
        hangul: 'nae-il o-hu se-si-bu-teo si-ja-kal su i-sseo?',
        zh: '明天下午3点开始能行吗？', zhEn: 'Can you start tomorrow at 3 PM?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '黑熊问明天3点能来吗。Tori想爽快答应表决心。合适的一句？', zhEn: 'Boss Black Bear asks if Tori can come at 3 PM tomorrow. Tori wants to agree readily and show determination. Which is the right line?',
        practice: 'pick',
        choices: [
          { ko: '네, 열심히 하겠습니다.', zh: '好的，我会努力工作的。', zhEn: 'Okay, I\'ll work hard.', correct: true },
          { ko: '음… 잘 모르겠어요.', zh: '嗯……不太清楚。', zhEn: 'Hmm... not really sure.', correct: false },
          { ko: '한국말 못 해서 안 될 것 같아요.', zh: '韩语不好，可能不行。', zhEn: 'My Korean isn\'t good, so maybe I can\'t.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '因为___所以___：~아/어서 (Day 32 深化 · 정중한 이유)', titleEn: 'Because ___ so ___ : ~아/어서 (Day 32 deepening · polite reason)',
    pattern: 'V/A + **아/어서** + Positive Result',
    whenToUse: 'Day 32 学过 ~아/어서 基础，Day 52 学过动作先后。Day 62 是**面试正式场合的因果**——熊店长说 「솔직**해서** 좋아」= 因为诚实所以好。~아/어서 + 긍정 결과 = 面试/职场/正式场合表达"因A故B"最刚需的连接。', whenToUseEn: 'Day 32 covered the basics of ~아/어서, Day 52 covered sequence of actions. Day 62 is about cause-and-effect in formal interview settings—Boss Bear says 「솔직**해서** 좋아」= because you\'re honest, it\'s good. ~아/어서 + positive result = the most essential connector for expressing "A therefore B" in interviews/workplaces/formal settings.',
    rules: [
      '**긍정 이유 → ~아/어서 좋다/괜찮다**：솔직해서 좋아 / 착해서 좋아 / 잘해서 좋아',
      '**부정 이유 → ~아/어서 안 돼요**：너무 작아서 안 될 것 같아요 (下节 Day 66 学的体型歧视句)',
      '**Day 32 pitfall 재확인**：~아/어서 뒷은 명령/제안 안 됨. 陈述/평가만 가능',
      '**~기 때문에 = 격식체**: 솔직하기 때문에 좋아요 (더 정중)'
    ],
    examples: [
      { ko: '솔직해서 좋아.', zh: '因为诚实所以好。', zhEn: 'Because you\'re honest, it\'s good.', highlight: '솔직해서', note: '솔직하다 → 솔직해서. 黑熊 사장 원문', noteEn: '솔직하다 → 솔직해서. Boss Black Bear\'s original line' },
      { ko: '한국어를 못해서 걱정이에요.', zh: '因为韩语不好所以担心。', zhEn: 'I\'m worried because my Korean isn\'t good.', highlight: '못해서', note: '못하다 → 못해서. 부정 이유 + 결과' },
      { ko: '정직한 사람이라서 뽑았어요.', zh: '因为是诚实的人所以选了。', zhEn: 'I chose them because they\'re an honest person.', highlight: '사람이라서', note: 'N + 이라서 (Day 32) = 이유 명사절' },
      { ko: '계속 배워서 실력이 늘었어요.', zh: '一直学所以实力提升。', zhEn: 'I keep studying, so my skills improve.', highlight: '배워서 ... 늘었어요', note: '배우다 → 배워서 + 결과. 성장 표현' },
    ],
    pitfall:
      '① Day 32 pitfall 复习: ~아/어서 뒷문장에 명령·제안 안 됨 → 명령엔 ~(으)니까 씀. ② 名词 이유절은 ~(이)라서: 학생이라서 (有받침) / 친구라서 (无받침). ③ **~기 때문에** 는 문어/면접 정중체. 회화에선 ~아/어서 더 자연스러움. ④ 韩国面试에서 자기 강점 설명 시 ~아/어서 표현 필수.',
  },

  output: [
    {
      id: 'd62-o1',
      kind: 'compose',
      zhHint: '一点。但一直在学。', zhHintEn: 'A little. But I keep learning.',
      tokens: ['조금요', '근데', '계속 배우고 있어요', '많이 해요', '이제 안 해요', '많이요'],
      composeAnswer: ['조금요', '근데', '계속 배우고 있어요'],
      successMsg: '솔직한 자기 소개. Tori 얻은 첫 알바의 문.',
    },
    {
      id: 'd62-o2',
      kind: 'listen-choice',
      audioKo: '완벽한 사람 안 뽑아. 정직한 사람 뽑아.',
      successMsg: '✓ 黑熊 사장의 채용 철학. 완벽 vs 정직.', successMsgEn: '✓ Boss Black Bear\'s hiring philosophy. Perfect vs honest.',
      choices: [
        { zh: '不招完美的人。招诚实的人。', zhEn: 'We don\'t hire perfect people. We hire honest ones.', correct: true },
        { zh: '完美的人才招。', zhEn: 'Only perfect people get hired.', correct: false },
        { zh: '诚实的人不招。', zhEn: 'Honest people don\'t get hired.', correct: false },
        { zh: '完美和诚实都不招。', zhEn: 'Neither perfect nor honest people get hired.', correct: false },
      ],
    },
    {
      id: 'd62-o3',
      kind: 'zh-to-ko',
      zhPrompt: '因为是诚实的人所以选了。', zhPromptEn: 'I chose them because they\'re an honest person.',
      successMsg: '"정직한 사람이라서 뽑았어요." — N + 이라서 이유절.',
      choices: [
        { ko: '정직한 사람이라서 뽑았어요.', correct: true },
        { ko: '정직한 사람라서 뽑았어요.', correct: false },
        { ko: '정직한 사람아서 뽑았어요.', correct: false },
        { ko: '정직한 사람이니까 뽑겠어요.', correct: false },
      ],
    },
    {
      id: 'd62-o4',
      kind: 'particle-error',
      zhHint: '一直学所以实力提升。', zhHintEn: 'I keep studying, so my skills improve.',
      successMsg: '배우다 → **배워서** + 결과절 (실력이 늘다).',
      choices: [
        { ko: '계속 배워서 실력이 늘었어요.', correct: true },
        { ko: '계속 배우서 실력이 늘었어요.', correct: false },
        { ko: '계속 배웠어서 실력이 늘었어요.', correct: false },
        { ko: '계속 배워서 실력을 늘었어요.', correct: false },
      ],
    },
    {
      id: 'd62-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 62 全对. 첫 알바 잡았어요.', successMsgEn: '✓ Day 62 all correct. Got my first part-time job.',
      pairs: [
        { ko: '아르바이트', zh: '兼职', zhEn: 'part-time job' },
        { ko: '면접', zh: '面试', zhEn: 'interview' },
        { ko: '이력서', zh: '简历', zhEn: 'resume' },
        { ko: '솔직하다', zh: '直率', zhEn: 'frank; straightforward' },
        { ko: '뽑다', zh: '招/选', zhEn: 'to hire/select' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '"솔직해서 좋아." — 완벽함이 아닌 정직으로 잡은 첫 알바.',
    preview: '明天 첫 알바 시작 — 걱정된다. 손님 말 다 알아들을 수 있을까?', previewEn: 'Tomorrow my first part-time job starts — I\'m nervous. Will I be able to understand everything customers say?',
    stickerId: 'sticker-d62',
    sceneImageUrl: '/images/diary/day-62-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「솔직 和 정직 有什么区别？」「面试怎么说自己韩语水平？」', carrotHintEn: 'Today\'s carrots: \'What\'s the difference between 솔직 and 정직?\' \'How do you talk about your Korean level in an interview?\'',
};
