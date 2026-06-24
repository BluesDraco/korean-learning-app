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
  title: '第一晚想家 · 独处',
  subtitle: '空荡荡的房间只有泡面和想家的眼泪',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9月 8일 일요일 밤 늦게',
    weather: '兽尔 · 雨后',
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
      zh: '孤独',
      pos: '形容词',
      example: { ko: '오늘 외로워요.', zh: '今天感到孤独。' },
      tip: '형용사「외롭다」의 해요体。坦诚说出来反而轻松',
    },
    {
      id: 'd08-w2',
      korean: '보고 싶어요',
      hangul: 'bo-go si-peo-yo',
      zh: '想念',
      pos: '表达',
      example: { ko: '엄마가 보고 싶어요.', zh: '我想妈妈。' },
      tip: '보다(看/见) + 고 싶어요(想做)。「보고 싶다」= 想见到。韩语里「想念」就是「想见」',
    },
    {
      id: 'd08-w3',
      korean: '전화',
      hangul: 'jeon-hwa',
      zh: '电话',
      pos: '名词',
      example: { ko: '전화할게요.', zh: '我会打电话的。' },
      tip: '전화(电话) + 하다 = 打电话。전화 받다 = 接电话',
    },
    {
      id: 'd08-w4',
      korean: '울다',
      hangul: 'ul-da',
      zh: '哭',
      pos: '动词',
      example: { ko: '조금 울었어요.', zh: '哭了一会儿。' },
      tip: '울다 → 해요体 울어요。在韩国哭一哭没关系，Haru 一定懂',
    },
    {
      id: 'd08-w5',
      korean: '내일',
      hangul: 'nae-il',
      zh: '明天',
      pos: '名词',
      example: { ko: '내일 또 해요.', zh: '明天继续。' },
      tip: '오늘(今天) / 내일(明天) / 어제(昨天)。三个时间词必背',
    },
    {
      id: 'd08-w6',
      korean: '괜찮아질 거예요',
      hangul: 'gwaen-cha-na-jil geo-ye-yo',
      zh: '会好起来的',
      pos: '表达',
      example: { ko: '괜찮아질 거예요. 진짜로.', zh: '会好起来的。真的。' },
      tip: '괜찮다(没事) + 아질(变得) + 거예요(将会)。对自己说的最温柔一句话',
    },
  ],

  dialogue: {
    scene: '宿舍 301 · 深夜独处',
    setting: {
      time: '深夜',
      place: '宿舍 301',
      npc: '镜子里的自己',
    },
    lines: [
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '엄마 보고 싶어…',
        hangul: 'eom-ma bo-go si-peo…',
        zh: '想妈妈……',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '엄마, 나 잘 지내고 있어.',
        hangul: 'eom-ma, na jal ji-nae-go i-sseo',
        zh: '妈妈，我过得很好。（对着镜子说谎）',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '한국어 너무 어려워.',
        hangul: 'han-gu-geo neo-mu eo-ryeo-wo',
        zh: '韩语好难。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '근데… 내일 또 해야지.',
        hangul: 'geun-de… nae-il tto hae-ya-ji',
        zh: '但是……明天还要继续。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Tori 对着镜子，给明天的自己说最后一句话——哪句最像真正鼓励自己的话？',
        practice: 'pick',
        choices: [
          { ko: '내일도 화이팅. 괜찮아질 거야.', zh: '明天也加油。会好起来的。（自我鼓励）', correct: true },
          { ko: '감사합니다. 죄송합니다.', zh: '谢谢。对不起。（礼貌句，对镜子说不合语境）', correct: false },
          { ko: '저는 중국 사람이에요.', zh: '我是中国人。（自我介绍，此时此刻不合适）', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '想做某事 · 동사 + 고 싶어요',
    pattern: '동사 어간 + **고 싶어요**',
    whenToUse: '表达"想做___"。想念某人用「보고 싶어요」，想做某事用「동사 + 고 싶어요」。',
    rules: [
      '动词词干 + **고 싶어요**：가다 → 가**고 싶어요**（想去）',
      '想念某人：**보다**(见) + 고 싶어요 → 보**고 싶어요**（想见 = 想念）',
      '否定：**고 싶지 않아요** / 口语常用 **안 가고 싶어요**',
    ],
    examples: [
      { ko: '엄마가 보고 싶어요.', zh: '我想妈妈。', highlight: '보고 싶어요', note: '**보다**(见/看) + 고 싶어요。보고 싶다 = 想见到，韩语里「想念」就是「想见」' },
      { ko: '한국에 가고 싶어요.', zh: '我想去韩国。', highlight: '가고 싶어요', note: '**가다**(去) + 고 싶어요。词干 가 直接加고' },
      { ko: '한국어를 공부하고 싶어요.', zh: '我想学韩语。', highlight: '공부하고 싶어요', note: '**공부하다**(学习) + 고 싶어요。하다 동사 직접 연결' },
      { ko: '울고 싶어요.', zh: '想哭。', highlight: '울고 싶어요', note: '**울다**(哭) + 고 싶어요。ㄹ 받침 동사，직접 고 연결' },
    ],
    pitfall:
      '「보고 싶어요」的主语可以是人：엄마**가** 보고 싶어요（我想妈妈，助词用 가/이）；也可以是地方：한국**에** 가고 싶어요（助词用 에）。注意助词随宾语变。',
  },

  output: [
    {
      id: 'd08-o1',
      kind: 'compose',
      zhHint: '我想妈妈。',
      tokens: ['엄마가', '보고', '싶어요', '엄마를', '보고 싶어요', '보아요'],
      composeAnswer: ['엄마가', '보고', '싶어요'],
      successMsg: '镜子里的兔莉点了点头。',
    },
    {
      id: 'd08-o2',
      kind: 'listen-choice',
      audioKo: '한국어를 공부하고 싶어요.',
      successMsg: '✓「我想学韩语」。공부하다 + 고 싶어요。',
      choices: [
        { zh: '我想学韩语。', correct: true },
        { zh: '我在学韩语。', correct: false },
        { zh: '韩语很难。', correct: false },
        { zh: '我不想学韩语。', correct: false },
      ],
    },
    {
      id: 'd08-o3',
      kind: 'zh-to-ko',
      zhPrompt: '我想回家。',
      successMsg: '집에 가고 싶어요。집(家) + 에(方向助词) + 가다 + 고 싶어요。',
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
      zhHint: '我想念朋友。（助词选哪个？）',
      successMsg: '친구**가** 보고 싶어요。「보고 싶다」的思念对象用 이/가，不用 을/를。',
      choices: [
        { ko: '친구가 보고 싶어요.', correct: true },
        { ko: '친구를 보고 싶어요.', correct: false },
        { ko: '친구는 보고 싶어요.', correct: false },
        { ko: '친구에 보고 싶어요.', correct: false },
      ],
    },
    {
      id: 'd08-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 8 核心词全部对上。明天继续，괜찮아질 거야。',
      pairs: [
        { ko: '외로워요', zh: '孤独' },
        { ko: '보고 싶어요', zh: '想念' },
        { ko: '울다', zh: '哭' },
        { ko: '내일', zh: '明天' },
        { ko: '괜찮아질 거예요', zh: '会好起来的' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '哭了也没关系。明天还是会继续的。토리, 오늘도 잘했어요.',
    preview: '明天——一个人去 CU 便利店买早饭。一个人，第一次。',
    stickerId: 'sticker-d08',
  },

  carrotHint:
    '今天的胡萝卜：「韩语怎么说我想念某人」「고 싶어요 和 고 싶다 有什么区别」「安慰自己的韩语怎么说」',
};
