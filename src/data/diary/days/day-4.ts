import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 4 · 韩光宿舍 · 报到 · 浣熊宿管
 *
 * 剧情：兔莉拖着粉色行李箱来到 韩光 语言学校的宿舍楼。
 * 一楼前台坐着一位戴着圆眼镜的浣熊宿管阿姨，桌上一本厚厚的入住登记册。
 * 她翻着名单，问兔莉是不是新来的学生，要名字、国籍、房间号。
 * 最后阿姨递过一把钥匙，钥匙串上挂着一个小胡萝卜挂件——是阿姨自己做的，
 * 她说"国际学生第一周都送一个"。
 *
 * 学习目标：자기소개 / 数字 1-10（号码用）/ 입니다 vs 이에요 礼貌差异
 * 韩语自审：korean skill PASS
 */
export const day4: ToriDay = {
  level: 'beginner',
  day: 4,
  phase: 'foundation',
  title: '韩光宿舍 · 报到',
  subtitle: '钥匙挂件上有一个小胡萝卜',
  heroImageUrl: '/images/diary/day-04-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 4일 · 韩光宿舍大堂',
    weather: '兽尔 · 阴',
    toriPose: 'shy',
    diaryText: `9月 4日，韩光宿舍 1 楼前台。

宿管阿姨是一只浣熊。
圆眼镜，灰白条纹尾巴搭在椅背上，
正在翻一本厚厚的入住登记册。

"새로 온 학생이에요?"（新来的学生吗？）
我用了昨天练熟的句子回答："네, 토리입니다."

她抬头看了我一眼，又看了眼登记册，
点点头说："301호예요. 키 받으세요."（301 号，拿钥匙。）
走廊很长，隔壁302房的门缝里飘出KPOP音乐。

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
      place: '韩光宿舍 1 楼',
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
        speaker: 'npc',
        npcName: '浣熊宿管',
        ko: '301호. 옆방에 하루 학생이 있어요.',
        hangul: 'sam-baek-il-ho. yeop-bang-e ha-ru hak-saeng-i i-sseo-yo',
        zh: '301号。隔壁有Haru同学。',
        practice: 'listen',
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
    pattern: 'N + 입니다（합쇼체·最正式） / N + 이에요·예요（해요체·温暖礼貌）',
    whenToUse: '都是"是 ___"，区别在敬语层级。韩语同一句话根据对象不同可以有 4 种说法，입니다 和 이에요/예요 是初学者最需要掌握的两种。',
    rules: [
      '**입니다（합쇼체）**：最正式、最礼貌。对长辈、面试、播音、演讲、军队。名词 + 입니다，**不受받침影响**——不管你前面名词有没有收音，永远是 입니다',
      '**이에요/예요（해요체）**：温暖礼貌，日常最常用。对陌生人、店员、同学、朋友的朋友。받침规则：有收音 → 이에요，无收音 → 예요',
      '**받침判断规则**：看名词最后一个字的终声。有终声(받침 있음) → 이에요：학생→학생**이에요**（ㅇ받침）、물→물**이에요**（ㄹ받침）。无终声(받침 없음) → 예요：토리→토리**예요**、친구→친구**예요**',
      '**疑问形式**：입니다 → 입니까?（最正式疑问），이에요/예요 → 이에요?/예요?（温暖疑问）。句尾升调即可，无需变形',
      '**否定形式**：입니다/이에요 的否定是「이/가 아닙니다」（最正式）或「이/가 아니에요」（温暖礼貌）。학생이 아닙니다（不是学生），토리가 아니에요（不是兔莉）',
      '**4 级敬语对照表**：합쇼체(입니다) 最正式 → 해요체(이에요/예요) 温暖礼貌 → 해체(이야/야, 반말) 朋友间 → 해라체(이다, 书面)。Day 4 只学前两级',
      '**实际场景选择**：第一次见教授 → 저는 학생입니다。见同学 → 저는 학생이에요。跟朋友 → 나는 학생이야（반말，还没学）',
      '**이다 词干规则**：이에요/예요 来自 이다(是) + 어요(敬语尾)。이다 + 어요 → 이어요 → 여요 → 예요（缩写过程）。有收音时保留 이 → 이에요',
    ],
    examples: [
      { ko: '저는 토리입니다.', zh: '我是兔莉。（最正式）', highlight: '입니다', note: '토리 无받침 + 입니다。自我介绍最正式版，面试/典礼用' },
      { ko: '저는 토리예요.', zh: '我是兔莉。（温暖礼貌）', highlight: '예요', note: '토리 无받침 → 예요。日常最常用，比 입니다 更有人情味' },
      { ko: '저는 학생입니다.', zh: '我是学生。（最正式）', highlight: '입니다', note: '학생 有받침 ㅇ，但 입니다 不受받침影响，永远是 입니다' },
      { ko: '저는 학생이에요.', zh: '我是学生。（温暖礼貌）', highlight: '이에요', note: '학생 有받침 ㅇ → 이에요。日常用这个就够了' },
      { ko: '중국 사람입니까?', zh: '是中国人吗？（最正式疑问）', highlight: '입니까', note: '입니다 → 입니까 变疑问。합쇼체疑问专用形，对长辈用' },
      { ko: '학생이 아니에요.', zh: '不是学生。（否定）', highlight: '아니에요', note: '이다否定 = 이/가 아니에요。학생有받침 → 이 아니에요' },
    ],
    pitfall:
      '① 不要混用 입니다 和 예요：토리입니다（✅）vs 토리예요（✅）都对，但 토리입예요（❌）不存在。② 否定时主语加 이/가：학생이 아닙니다（✅），不是 학생을 아닙니다（❌）。③ 对朋友用 입니다 会显得太生硬——该用 반말 时用 반말，该用 해요체 时用 해요체。',
  },

  output: [
    {
      id: 'd04-o1',
      kind: 'compose',
      zhHint: '我是中国人。（温暖礼貌的句尾）',
      tokens: ['저는', '중국', '사람이에요', '입니다', '사람예요', '예요'],
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
      successMsg: '학생 末字 「생」有收音(받침) ㅇ → 用「이에요」。「저는」没问题。',
      choices: [
        { ko: '저는 학생이에요.', correct: true },
        { ko: '저는 학생예요.', correct: false },
        { ko: '저은 학생이에요.', correct: false },
        { ko: '저는 학생이예요.', correct: false },
      ],
    },
    {
      id: 'd04-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 4 核心词全部对上。钥匙串上的小胡萝卜在你手心里晃了晃。',
      pairs: [
        { ko: '학생', zh: '学生' },
        { ko: '이름', zh: '名字' },
        { ko: '방', zh: '房间' },
        { ko: '키', zh: '钥匙' },
        { ko: '선물', zh: '礼物' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '第一次完整的自我介绍，对方也听懂了。这就是开始。',
    preview: '明天去倒垃圾的路上，会遇到一只在走廊里晾袜子的仓鼠邻居。',
    stickerId: 'sticker-d04',
    sceneImageUrl: '/images/diary/day-04-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「입니다和이에요什么时候用」「房间号怎么读」「韩语怎么说我叫XX」',
};
