import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 21 · 关卡 3 · 海豹房东签合同
 *
 * 剧情：周五下午 2 点。中介老犬、海豹房东、兔莉三人围坐在「행복부동산」的长桌。
 * 老犬把合同推过来，三页纸，签名栏空着。
 * 海豹复述："보증금 500, 월세 50, 관리비 5 따로. 계약 기간 1년."
 * 兔莉一项一项确认——这次是真的，不是预演。
 * 押金转账成功的瞬间，500 万元从妈妈的账户消失，
 * 房东把钥匙放在她手里。一把闪着银光的钥匙圈上挂着一个小小的胡萝卜钥匙扣。
 * 兔莉愣了——是 Daiso 那种 1000 元的胡萝卜钥匙扣。
 * 海豹笑："Welcome home."
 *
 * 学习目标：综合 Day 15-20 / 合同完整流程 / 期限 + 期间表达
 * 韩语自审：korean skill PASS (관계자 3인 협상 상황 + 정중한 종결)
 */
export const day21: ToriDay = {
  level: 'beginner',
  day: 21,
  phase: 'expansion',
  title: '🏠 关卡 3 · 海豹房东签合同',
  subtitle: '一把闪银光的钥匙挂着一个胡萝卜',
  isCheckpoint: 21,
  estimatedMin: 16,

  opening: {
    date: '9월 22일 금요일 오후',
    weather: '兽尔 · 晴',
    toriPose: 'cheer',
    diaryText: `9월 22日，周五下午 2 点。

行복부동산，长桌的中央。
左边坐着金毛中介老犬，
右边是西装挂金链子的海豹房东。
我坐在中间，手放在膝盖上。

老犬推过来三页合同。
"여기, 여기, 여기 사인 해 주세요."
（这里、这里、这里请签名。）

海豹清了清嗓子，复述：
"보증금 500만, 월세 50만, 관리비 5만 따로."
"계약 기간 1년."
（合同期限 1 年。）

我深呼吸。
不是预演了——
是真的。

"보증금 500만 맞아요? 월세 50만, 25일 입금. 맞아요?"
（押金 500 万对吧？月租 50 万，25 号转账，对吗？）

海豹眨眨眼："학생, 잘 알고 있네요."
（学生，您挺清楚的。）

签名。
我用昨天 KB 银行办的通帐转账。
한국 인터넷뱅킹——
500 万元从妈妈的账户消失。

海豹站起来，从口袋里掏出钥匙——
一把银光闪闪的钥匙，
钥匙圈上挂着一个小小的胡萝卜钥匙扣。
和 Daiso 那种 1000 元的一样。

我愣住了。

"Welcome home, 토리."

🏠 关卡 3 通关。`,
  },

  words: [
    {
      id: 'd21-w1',
      korean: '계약',
      hangul: 'gye-yak',
      zh: '合同',
      pos: '名词',
      example: { ko: '계약을 했어요.', zh: '签了合同。' },
      tip: 'Day 20 学过。今天复习 + 动词形 계약하다',
    },
    {
      id: 'd21-w2',
      korean: '기간',
      hangul: 'gi-gan',
      zh: '期间',
      pos: '名词',
      example: { ko: '계약 기간 1년이에요.', zh: '合同期限 1 年。' },
      tip: '받침 ㄴ → 「을/은」: 기간을 / 기간은',
    },
    {
      id: 'd21-w3',
      korean: '입금',
      hangul: 'ip-geum',
      zh: '存款 / 转账',
      pos: '名词',
      example: { ko: '월세는 25일 입금이에요.', zh: '月租 25 号转账。' },
      tip: '받침 ㅁ → 「을」: 입금을. 反义 = 출금 (取款)',
    },
    {
      id: 'd21-w4',
      korean: '맞아요',
      hangul: 'ma-ja-yo',
      zh: '没错 / 对',
      pos: '形容词',
      example: { ko: '500만 맞아요?', zh: '500 万对吗？' },
      tip: '动词「맞다」(对/正确) 的해요体。Day 5 学过。今天作为关卡确认句的核心',
    },
    {
      id: 'd21-w5',
      korean: '잘 부탁드립니다',
      hangul: 'jal bu-tak-deu-rim-ni-da',
      zh: '请多多关照',
      pos: '表达',
      example: { ko: '오늘부터 잘 부탁드립니다.', zh: '从今天开始请多多关照。' },
      tip: 'Day 6 学过。今天用最礼貌的「-ㅂ니다」结尾，签合同庄重场合',
    },
    {
      id: 'd21-w6',
      korean: '열쇠',
      hangul: 'yeol-soe',
      zh: '钥匙',
      pos: '名词',
      example: { ko: '열쇠 받았어요.', zh: '我拿到钥匙了。' },
      tip: '받침 ㅚ → 「를」: 열쇠를. 现在很多公寓改用「도어락」(门锁) 数字密码',
    },
  ],

  dialogue: {
    scene: '행복부동산 长桌 · 关卡 3 · 三方签约',
    setting: {
      time: '周五下午 2 点',
      place: '행복부동산',
      npc: '海豹房东 / 老犬中介',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '老犬中介',
        ko: '계약서 가져왔어요. 여기, 여기, 여기 사인 해 주세요.',
        hangul: 'gye-yak-seo ga-jeo-wa-sseo-yo. yeo-gi, yeo-gi, yeo-gi sa-in hae ju-se-yo',
        zh: '合同准备好了。这里、这里、这里请签名。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '보증금 500만, 월세 50만, 25일 입금. 맞아요?',
        hangul: 'bo-jeung-geum o-baek-man, wol-se o-sip-man, i-si-bo-il ip-geum. ma-ja-yo',
        zh: '押金 500 万，月租 50 万，25 号转账，对吗？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '海豹房东',
        ko: '네, 맞아요. 계약 기간은 1년이에요.',
        hangul: 'ne, ma-ja-yo. gye-yak gi-gan-eun il-nyeon-i-e-yo',
        zh: '对，没错。合同期限是 1 年。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '관리비에 인터넷도 들어 있어요?',
        hangul: 'gwal-li-bi-e in-teo-net-do deu-reo i-sseo-yo',
        zh: '管理费里也包含网络吗？',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '签完合同，海豹房东把钥匙递过来说 "Welcome home"。兔莉应该如何回应？',
        practice: 'pick',
        choices: [
          { ko: '감사합니다. 앞으로 잘 부탁드립니다.', zh: '谢谢。今后请多多关照。', correct: true },
          { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。', correct: false },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '关卡 3 总结 · 签合同 4 句模板',
    pattern: '확인 → 질문 → 사인 → 인사',
    whenToUse: '韩国签任何合同（房子/手机/健身房）都通用。这 4 步背下来，不会被坑。',
    rules: [
      '① 数字复述："보증금 N만, 월세 N만, N일 입금. **맞아요?**" (确认条款)',
      '② 明细追问："관리비에 뭐가 **들어 있어요?**" (问包含项)',
      '③ 期限确认："계약 기간**은** N년이에요?" (问合同期限)',
      '④ 庄重收尾："앞으로 **잘 부탁드립니다**." (今后请多关照)',
    ],
    examples: [
      { ko: '500만 맞아요?', zh: '500 万对吗？' },
      { ko: '관리비에 인터넷도 들어 있어요?', zh: '管理费包含网络吗？' },
      { ko: '계약 기간은 1년이에요.', zh: '合同期限是 1 年。' },
      { ko: '잘 부탁드립니다.', zh: '请多多关照。' },
    ],
    pitfall:
      '关卡 3 的难点不是词汇，是**当海豹说快了不要慌**——签合同时听不清，礼貌地说「죄송한데, 다시 한 번 말씀해 주세요」(抱歉，请再说一次)。比稀里糊涂签字好一万倍。',
  },

  output: [
    {
      id: 'd21-o1',
      kind: 'compose',
      zhHint: '押金 500 万对吗？',
      tokens: ['보증금', '500만', '맞아요', '?', '월세', '관리비', '있어요'],
      composeAnswer: ['보증금', '500만', '맞아요', '?'],
      successMsg: '✓ 第一题：核心数字确认句过关。',
    },
    {
      id: 'd21-o2',
      kind: 'compose',
      zhHint: '管理费里也包含网络吗？',
      tokens: ['관리비에', '인터넷도', '들어 있어요', '?', '인터넷이', '없어요', '들어요'],
      composeAnswer: ['관리비에', '인터넷도', '들어 있어요', '?'],
      successMsg: '✓ 第二题：合同明细追问完成。',
    },
    {
      id: 'd21-o3',
      kind: 'listen-choice',
      audioKo: '계약 기간은 1년이에요.',
      successMsg: '✓ 「合同期限是 1 年」。「기간은」(받침 ㄴ → 은) 表话题。',
      choices: [
        { zh: '合同期限是 1 年。', correct: true },
        { zh: '合同期限是 2 年。', correct: false },
        { zh: '押金是 100 万元。', correct: false },
        { zh: '月租是 1 年。', correct: false },
      ],
    },
    {
      id: 'd21-o4',
      kind: 'zh-to-ko',
      zhPrompt: '抱歉，请再说一次。',
      successMsg: '"다시 한 번 말씀해 주세요" 是听不清时最礼貌的句子。「말씀」是「말」的尊敬形。',
      choices: [
        { ko: '죄송한데, 다시 한 번 말씀해 주세요.', correct: true },
        { ko: '죄송한데, 다시 한 번 말해 주세요.', correct: false },
        { ko: '죄송한데, 다시 한 번 말씀하세요.', correct: false },
        { ko: '죄송한데, 다시 말씀이 주세요.', correct: false },
      ],
    },
    {
      id: 'd21-o5',
      kind: 'match-pair',
      successMsg: '🎉 关卡 3 通关！海豹房东把银钥匙放在你手里——钥匙圈上挂着一个胡萝卜。',
      pairs: [
        { ko: '계약', zh: '合同' },
        { ko: '기간', zh: '期间' },
        { ko: '입금', zh: '存款 / 转账' },
        { ko: '맞아요', zh: '没错 / 对' },
        { ko: '잘 부탁드립니다', zh: '请多多关照（最礼貌）' },
      ],
    },
  ],

  recap: {
    toriPose: 'celebrate',
    praise: '🎉 关卡 3 通关！第一次完整签下韩国房合同。토리, 정말 자랑스러워요!',
    preview: '第四周开始 · 学校开始教해요体了，老师要系统讲变形规则…',
    stickerId: 'sticker-d21',
  },

  carrotHint:
    '关卡 3 通关庆祝！可以问胡萝卜「韩国签合同必问清单」「Week 4 大概要学什么」「房合同纠纷怎么处理」',
};
