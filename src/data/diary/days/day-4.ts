import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 4 · 한빛宿舍 · 报到 · 浣熊宿管
 *
 * 剧情：兔莉拖着粉色行李箱来到 한빛 语言学校的宿舍楼。
 * 一楼前台坐着一位戴着圆眼镜的浣熊宿管阿姨，桌上一本厚厚的入住登记册。
 * 她翻着名单，问兔莉是不是新来的学生，要名字、国籍、房间号。
 * 最后阿姨递过一把钥匙，钥匙串上挂着一个小胡萝卜挂件——是阿姨自己做的，
 * 她说"国际学生第一周都送一个"。
 *
 * 学习目标：자기소개 / 数字 1-10（号码用）/ 입니다 vs 이에요 礼貌差异
 * 韩语自审：korean skill PASS
 */
export const day4: ToriDay = {
  day: 4,
  phase: 'foundation',
  title: '한빛宿舍 · 报到',
  subtitle: '钥匙挂件上有一个小胡萝卜',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9月 4日 한빛 기숙사 로비',
    weather: '首尔 · 阴',
    toriPose: 'shy',
    diaryText: `9月 4日，한빛宿舍 1 楼前台。

宿管阿姨是一只浣熊。
圆眼镜，灰白条纹尾巴搭在椅背上，
正在翻一本厚厚的入住登记册。

"새로 온 학생이에요?"（新来的学生吗？）
我用了昨天练熟的句子回答："네, 토리입니다."

她抬头看了我一眼，又看了眼登记册，
点点头说："301호예요. 키 받으세요."（301 号，拿钥匙。）

钥匙串上挂着一个小小的胡萝卜挂件。
我有点惊讶。
阿姨笑了一下："우리 기숙사 첫 주 선물이에요."
（我们宿舍第一周的礼物。）

我把背包里妈妈给的胡萝卜偷偷掏出来对了对。
两个胡萝卜，长得几乎一模一样。`,
  },

  words: [
    {
      id: 'd04-w1',
      korean: '학생',
      hangul: 'hak-saeng',
      zh: '学生',
      pos: '名词',
      example: { ko: '저는 학생이에요.', zh: '我是学生。' },
      tip: '받침 ㅇ → 用「이에요」',
    },
    {
      id: 'd04-w2',
      korean: '이름',
      hangul: 'i-reum',
      zh: '名字',
      pos: '名词',
      example: { ko: '이름이 뭐예요?', zh: '叫什么名字？' },
      tip: '받침 ㅁ → 主语助词用「이」',
    },
    {
      id: 'd04-w3',
      korean: '방',
      hangul: 'bang',
      zh: '房间',
      pos: '名词',
      example: { ko: '제 방은 301호예요.', zh: '我的房间是 301 号。' },
      tip: '「방 번호」就是房间号',
    },
    {
      id: 'd04-w4',
      korean: '키',
      hangul: 'ki',
      zh: '钥匙',
      pos: '名词',
      example: { ko: '키 여기 있어요.', zh: '钥匙在这儿。' },
      tip: '英文 key 的音译，比固有词「열쇠」更日常',
    },
    {
      id: 'd04-w5',
      korean: '받으세요',
      hangul: 'ba-deu-se-yo',
      zh: '请拿 / 请收下',
      pos: '表达',
      example: { ko: '여기 있어요, 받으세요.', zh: '在这儿，请收下。' },
      tip: '动词「받다」(收/拿) + 礼貌句尾「-(으)세요」',
    },
    {
      id: 'd04-w6',
      korean: '선물',
      hangul: 'seon-mul',
      zh: '礼物',
      pos: '名词',
      example: { ko: '이건 선물이에요.', zh: '这是礼物。' },
      tip: '받침 ㄹ → 「이에요」',
    },
  ],

  dialogue: {
    scene: '宿舍前台 · 入住登记',
    setting: {
      time: '下午 2 点',
      place: '한빛宿舍 1 楼',
      npc: '浣熊宿管',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '浣熊宿管',
        ko: '안녕하세요. 새로 온 학생이에요?',
        hangul: 'an-nyeong-ha-se-yo. sae-ro on hak-saeng-i-e-yo',
        zh: '你好，是新来的学生吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 토리입니다.',
        hangul: 'ne, to-ri-im-ni-da',
        zh: '是的，我叫兔莉。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '浣熊宿管',
        ko: '중국 학생이에요?',
        hangul: 'jung-guk hak-saeng-i-e-yo',
        zh: '是中国学生吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 중국 사람이에요.',
        hangul: 'ne, jung-guk sa-ram-i-e-yo',
        zh: '是的，我是中国人。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '宿管递过钥匙说「301호예요」，兔莉应该说什么？',
        practice: 'pick',
        choices: [
          { ko: '감사합니다.', zh: '谢谢。', correct: true },
          { ko: '죄송합니다.', zh: '对不起。', correct: false },
          { ko: '아니요, 괜찮아요.', zh: '不用了，谢谢。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '입니다 vs 이에요 / 예요',
    pattern: 'N + 입니다（最礼貌）/ N + 이에요·예요（礼貌温暖）',
    whenToUse: '都是「是 ___」，但场合不同。',
    rules: [
      '「**입니다**」最正式：对长辈、面试、播音、第一次见面。不管받침都用 입니다',
      '「**이에요/예요**」温暖礼貌：日常聊天、朋友的朋友、店员对顾客。受받침规则',
      'Day 1 学过的规则还在：받침有→**이에요**，받침无→**예요**',
    ],
    examples: [
      { ko: '토리입니다. (最礼貌)', zh: '我是兔莉。', highlight: '입니다' },
      { ko: '토리예요. (温暖礼貌)', zh: '我是兔莉。', highlight: '예요' },
      { ko: '학생입니다.', zh: '我是学生。', highlight: '입니다' },
      { ko: '학생이에요.', zh: '我是学生。', highlight: '이에요' },
    ],
    pitfall:
      '宿管阿姨问话场景兔莉用「토리입니다」（更礼貌），但和朋友聊天用「토리예요」（更温暖）。两个都对，看场合。',
  },

  output: [
    {
      id: 'd04-o1',
      kind: 'compose',
      zhHint: '我是中国人。（温暖礼貌的句尾）',
      tokens: ['저는', '중국', '사람이에요', '입니다', '학생이에요', '예요'],
      composeAnswer: ['저는', '중국', '사람이에요'],
      successMsg: '宿管阿姨在登记册上写下了你的名字 ✓',
    },
    {
      id: 'd04-o2',
      kind: 'listen-choice',
      audioKo: '키 받으세요.',
      successMsg: '✓ 「请收下钥匙」。「받다」是收/拿，加 「-(으)세요」变礼貌请求。',
      choices: [
        { zh: '请收下钥匙。', correct: true },
        { zh: '请给我钥匙。', correct: false },
        { zh: '钥匙在哪里？', correct: false },
        { zh: '这是礼物。', correct: false },
      ],
    },
    {
      id: 'd04-o3',
      kind: 'zh-to-ko',
      zhPrompt: '是的，我叫兔莉。（最正式句尾）',
      successMsg: '"토리입니다." — 对宿管阿姨用最正式的「입니다」。',
      choices: [
        { ko: '네, 토리입니다.', correct: true },
        { ko: '네, 토리이에요.', correct: false },
        { ko: '네, 토리이입니다.', correct: false },
        { ko: '네, 저 토리예요입니다.', correct: false },
      ],
    },
    {
      id: 'd04-o4',
      kind: 'particle-error',
      zhHint: '我是学生。（温暖礼貌句尾）',
      successMsg: '학생 末字 「생」有받침 ㅇ → 用「이에요」。「저는」没问题。',
      choices: [
        { ko: '저는 학생이에요.', correct: true },
        { ko: '저는 학생예요.', correct: false },
        { ko: '저은 학생이에요.', correct: false },
        { ko: '저는 학생이예요.', correct: false },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '第一次完整的自我介绍，对方也听懂了。这就是开始。',
    preview: '明天去倒垃圾的路上，会遇到一只在走廊里晾袜子的仓鼠邻居。',
    stickerId: 'sticker-d04',
  },

  carrotHint:
    '今天的胡萝卜：「입니다和이에요什么时候用」「房间号怎么读」「韩语怎么说我叫XX」',
};
