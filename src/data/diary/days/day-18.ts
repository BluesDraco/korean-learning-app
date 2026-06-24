import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 18 · 은행 · 留学生账户
 *
 * 剧情：兔莉拿着外国人登录证、护照、学校在学证明，
 * 走进国民银行 (KB) 学校支行。柜台后是一只看起来已经工作了 20 年的乌龟柜员。
 * 他说话非常慢，每一个字都像从壳里慢慢推出来。
 * "통장 만들고 싶어요?"
 * 兔莉点头："네, 학생인데, 외국인등록증 있어요."
 * 乌龟把一摞表格慢慢推过来。两个小时后，兔莉拿到了人生第一本韩国通帐。
 *
 * 学习目标：留学生办卡 / 만들고 싶어요 / 비밀번호
 * 韩语自审：korean skill PASS（실제 은행창구 어휘）
 */
export const day18: ToriDay = {
  level: 'beginner',
  day: 18,
  phase: 'expansion',
  title: '국민은행 · 第一本韩国通帐',
  subtitle: '乌龟柜员说话非常慢',
  isCheckpoint: null,
  estimatedMin: 13,

  opening: {
    date: '9월 19일 화요일 오후',
    weather: '首尔 · 晴',
    toriPose: 'shy',
    diaryText: `9月 19日，周二下午。

我把外国人登录证、护照、学校的在学证明
全部装进透明文件夹里。
KB 国民银行学校支行——
留学生办卡指定网点。

走进银行，
取号机吐出一张「137」。
我等了 40 分钟。

终于轮到我。
柜台后是一只看起来工作了 20 年的乌龟。
他说话非常慢，
每一个字都像从壳里慢慢推出来。

"통장—만들고 싶어요?"
（您要—开户吗？）
"네. 학생인데, 외국인등록증 있어요."
（是的。学生，有外国人登录证。）

他眨了一下眼睛，没有变化的表情。
然后慢慢地，
把一摞表格推过来：
"여기 이름, 여기 사인, 여기 비밀번호."

两个小时后——
我拿到了人生第一本韩国통장，
深蓝色封面，烫金的"KB"。

走出银行的时候，
夕阳把首尔的人行道染成橘色。
我对着通帐自言自语：
"잘 부탁드려요, 통장 씨."`,
  },

  words: [
    {
      id: 'd18-w1',
      korean: '은행',
      hangul: 'eun-haeng',
      zh: '银行',
      pos: '名词',
      example: { ko: '은행에 가요.', zh: '去银行。' },
      tip: '받침 ㅇ → 「에」: 은행에 (在银行 / 去银行)',
    },
    {
      id: 'd18-w2',
      korean: '통장',
      hangul: 'tong-jang',
      zh: '存折 / 账户',
      pos: '名词',
      example: { ko: '통장 만들고 싶어요.', zh: '想开户。' },
      tip: '韩国办卡通常给一本纸质通帐。比起卡，更代表"在韩国有了根"',
    },
    {
      id: 'd18-w3',
      korean: '비밀번호',
      hangul: 'bi-mil-beon-ho',
      zh: '密码',
      pos: '名词',
      example: { ko: '비밀번호 4자리예요.', zh: '密码是 4 位。' },
      tip: '韩国卡密码 4 位。注意「자리」(位) 而不是「개」',
    },
    {
      id: 'd18-w4',
      korean: '외국인등록증',
      hangul: 'oe-gu-gin-deung-nok-jeung',
      zh: '外国人登录证',
      pos: '名词',
      example: { ko: '외국인등록증 있어요.', zh: '我有外国人登录证。' },
      tip: '简称 외등 / 등록증。来韩国 90 天以上必办。办卡看医生买电话卡都要',
    },
    {
      id: 'd18-w5',
      korean: '만들고 싶어요',
      hangul: 'man-deul-go si-peo-yo',
      zh: '我想做',
      pos: '表达',
      example: { ko: '통장 만들고 싶어요.', zh: '我想开户。' },
      tip: '动词「만들다」(做) + 「-고 싶어요」(想要做)。今天的核心句型',
    },
    {
      id: 'd18-w6',
      korean: '사인',
      hangul: 'sa-in',
      zh: '签名',
      pos: '名词',
      example: { ko: '여기 사인 해 주세요.', zh: '请在这里签名。' },
      tip: 'sign 音译。韩国办手续都要 사인 (签名) 而不是盖章',
    },
  ],

  dialogue: {
    scene: 'KB 국민은행 137번 창구',
    setting: {
      time: '周二下午 3 点',
      place: '학교 근처 KB은행',
      npc: '乌龟柜员',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '乌龟柜员',
        ko: '안녕하세요. 어떻게 오셨어요?',
        hangul: 'an-nyeong-ha-se-yo. eo-tteo-ke o-syeo-sseo-yo',
        zh: '您好。怎么过来的？(您要办什么？)',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '통장 만들고 싶어요. 학생이에요.',
        hangul: 'tong-jang man-deul-go si-peo-yo. hak-saeng-i-e-yo',
        zh: '我想开户。我是学生。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '乌龟柜员',
        ko: '외국인등록증이랑 여권 주세요.',
        hangul: 'oe-gu-gin-deung-nok-jeung-i-rang yeo-gwon ju-se-yo',
        zh: '请把外国人登录证和护照给我。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '여기 있어요.',
        hangul: 'yeo-gi i-sseo-yo',
        zh: '在这里。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '乌龟说"비밀번호 네 자리 입력해 주세요."(请输入 4 位密码)，兔莉应该如何回应？',
        practice: 'pick',
        choices: [
          { ko: '네, 알겠습니다.', zh: '好的，我知道了。', correct: true },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
          { ko: '오른쪽으로 도세요.', zh: '请右转。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '我想做某事 · 동사 + 고 싶어요',
    pattern: '동사 어간 + 고 싶어요',
    whenToUse: '表达"我想做某事"。办事、点餐、表达愿望最常用。',
    rules: [
      '动词去掉 **다** + **고 싶어요**: 만들다 → 만들**고 싶어요** (想开户)',
      '动词去掉 **다** + **고 싶어요**: 가다 → 가**고 싶어요** (想去)',
      '过去时：**고 싶었어요** (当时想...)',
      '主语是别人时换成 **고 싶어 해요**: 친구가 가**고 싶어 해요** (朋友想去)',
    ],
    examples: [
      { ko: '통장 만들고 싶어요.', zh: '我想开户。', highlight: '만들고 싶어요' },
      { ko: '한국에서 살고 싶어요.', zh: '我想在韩国生活。', highlight: '살고 싶어요' },
      { ko: '뭐 먹고 싶어요?', zh: '你想吃什么？', highlight: '먹고 싶어요' },
      { ko: '쉬고 싶어요.', zh: '我想休息。', highlight: '쉬고 싶어요' },
    ],
    pitfall:
      '注意「-고 있어요」(正在) 和「-고 싶어요」(想要) 长得像但不一样。Day 15 学的「찾고 있어요」是"正在找"，今天的「만들고 싶어요」是"想开户"。区别在 있/싶。',
  },

  output: [
    {
      id: 'd18-o1',
      kind: 'compose',
      zhHint: '我想开户。我是学生。',
      tokens: ['통장', '만들고', '싶어요', '학생이에요', '있어요', '만들어요'],
      composeAnswer: ['통장', '만들고', '싶어요', '학생이에요'],
      successMsg: '乌龟柜员慢慢点了一下头：「잠시만 기다려 주세요.」(请稍等。) ✓',
    },
    {
      id: 'd18-o2',
      kind: 'listen-choice',
      audioKo: '여권 주세요.',
      successMsg: '✓ 「请把护照给我」。「여권」= 护照，是办韩国账户必要证件之一。',
      choices: [
        { zh: '请把护照给我。', correct: true },
        { zh: '请给我登录证。', correct: false },
        { zh: '请输入密码。', correct: false },
        { zh: '请签名。', correct: false },
      ],
    },
    {
      id: 'd18-o3',
      kind: 'zh-to-ko',
      zhPrompt: '你想吃什么？',
      successMsg: '"먹고 싶어요" — 「먹다」(吃) 去 다 + 고 싶어요 = 想吃。「뭐」是疑问词「什么」。',
      choices: [
        { ko: '뭐 먹고 싶어요?', correct: true },
        { ko: '뭐 먹고 있어요?', correct: false },
        { ko: '뭐 먹어 싶어요?', correct: false },
        { ko: '뭐 먹다 싶어요?', correct: false },
      ],
    },
    {
      id: 'd18-o4',
      kind: 'particle-error',
      zhHint: '我想去韩国。',
      successMsg: '「가다」(去) 去 다 → 「가고 싶어요」。「한국에」用方位助词「에」。',
      choices: [
        { ko: '한국에 가고 싶어요.', correct: true },
        { ko: '한국를 가고 싶어요.', correct: false },
        { ko: '한국에 가고 있어요.', correct: false },
        { ko: '한국에 가 싶어요.', correct: false },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '深蓝色烫金的 KB 通帐握在手里。"在首尔有了根"是这种感觉。',
    preview: '明天嗓子又开始痒。Haru 说"이번에는 병원도 가자"。第一次去韩国병원挂号…',
    stickerId: 'sticker-d18',
  },

  carrotHint:
    '今天的胡萝卜：「韩国留学生开户流程」「외국인등록증怎么办」「-고 싶어요 vs -고 있어요 区别」',
};
