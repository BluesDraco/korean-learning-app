import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 20 · 房东上门 · 合同细节预演
 *
 * 剧情：中介电话："내일 집주인이랑 만날 거예요."(明天和房东见面)
 * 兔莉提前回到那家원룸——3 楼，朝南，阳光把地板烫得发亮。
 * 一只穿西装的海豹房东踩着皮鞋走进来，脖子上挂着金链子，
 * 笑起来一只大门牙比另一只长。
 * 他翻开合同："보증금 500, 월세 50, 관리비 5 따로예요."
 * 兔莉一个字一个字记下来，胡萝卜被她攥得快变形了。
 * 这是关卡 3 前的最后一次预演。
 *
 * 学习目标：합约 핵심 어휘 / 따로 (单独) / N 짜리 / 数字 + 名词
 * 韩语自审：korean skill PASS (実際 임대차 표현)
 */
export const day20: ToriDay = {
  day: 20,
  phase: 'expansion',
  title: '합약 예고 · 海豹房东走进了房间',
  subtitle: '500/50/5 따로 — 兔莉的笔记本写满了',
  isCheckpoint: null,
  estimatedMin: 13,

  opening: {
    date: '9월 21일 목요일 오후',
    weather: '首尔 · 晴',
    toriPose: 'shy',
    diaryText: `9월 21日，周四下午。

中介老犬给我打电话：
"내일 집주인이랑 만날 거예요. 미리 한 번 가 볼래요?"
（明天和房东见面。要不要先去一次？）

我提前到那栋楼。
3 楼，朝南，阳光把木地板烫得发亮。
站在阳台上能看到学校操场的一角。

12 点整，
门口出现一只穿西装的海豹房东。
皮鞋擦得能照出人，
脖子上挂着金链子。
笑起来——
一只大门牙比另一只长。

"안녕하세요. 토리 학생이죠?"
（您好。是兔莉同学吧？）
"네, 안녕하세요."

他翻开合同。

"보증금 500만, 월세 50만, 관리비 5만 따로예요."
（押金 500 万，月租 50 万，管理费 5 万单独。）

我一个字一个字记。
보증금。월세。관리비。따로。
笔尖在纸上划出沙沙的声音。

胡萝卜在背包里被我攥得快变形了。

"질문 있어요?"
（有问题吗？）
"… 관리비에 뭐가 들어 있어요?"
（管理费包含什么？）

海豹愣了一下，
然后认真地解释了 5 分钟。
我全部记下来。

明天就是关卡 3。
今天，我已经准备好了。`,
  },

  words: [
    {
      id: 'd20-w1',
      korean: '집주인',
      hangul: 'jip-ju-in',
      zh: '房东',
      pos: '名词',
      example: { ko: '집주인이에요.', zh: '我是房东。' },
      tip: '집(房子) + 주인(主人)。「-님」加敬: 집주인님',
    },
    {
      id: 'd20-w2',
      korean: '계약',
      hangul: 'gye-yak',
      zh: '合同',
      pos: '名词',
      example: { ko: '계약 도와드릴게요.', zh: '我帮您签合同。' },
      tip: '받침 ㄱ → 「을」: 계약을. 动词形 = 계약하다',
    },
    {
      id: 'd20-w3',
      korean: '관리비',
      hangul: 'gwal-li-bi',
      zh: '管理费',
      pos: '名词',
      example: { ko: '관리비 5만 원이에요.', zh: '管理费 5 万元。' },
      tip: '韩国원룸标配。包括电梯/楼道清洁/网络。和월세分开收',
    },
    {
      id: 'd20-w4',
      korean: '따로',
      hangul: 'tta-ro',
      zh: '单独 / 另外',
      pos: '副词',
      example: { ko: '관리비 따로예요.', zh: '管理费另算。' },
      tip: '常搭配「예요」表达"是单独的"。和「같이」(一起)反义',
    },
    {
      id: 'd20-w5',
      korean: '들어 있어요',
      hangul: 'deu-reo i-sseo-yo',
      zh: '包含 / 在里面',
      pos: '表达',
      example: { ko: '관리비에 뭐가 들어 있어요?', zh: '管理费包含什么？' },
      tip: '动词「들어 있다」(包含、装在...里)。问合同明细必备',
    },
    {
      id: 'd20-w6',
      korean: '질문',
      hangul: 'jil-mun',
      zh: '问题 (提问)',
      pos: '名词',
      example: { ko: '질문 있어요.', zh: '我有问题。' },
      tip: '받침 ㄴ → 「을」: 질문을. 和 문제 (problem) 不同——质문是"提问"',
    },
  ],

  dialogue: {
    scene: '空房间 · 房东先来认人',
    setting: {
      time: '周四中午 12 点',
      place: '弘大附近原룸 3 楼',
      npc: '海豹房东',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '海豹房东',
        ko: '안녕하세요. 토리 학생이죠?',
        hangul: 'an-nyeong-ha-se-yo. to-ri hak-saeng-i-jyo',
        zh: '您好。是兔莉同学吧？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 안녕하세요. 잘 부탁드려요.',
        hangul: 'ne, an-nyeong-ha-se-yo. jal bu-tak-deu-ryeo-yo',
        zh: '是的，您好。请多关照。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '海豹房东',
        ko: '보증금 500만, 월세 50만, 관리비 5만 따로예요.',
        hangul: 'bo-jeung-geum o-baek-man, wol-se o-sip-man, gwal-li-bi o-man tta-ro-ye-yo',
        zh: '押金 500 万，月租 50 万，管理费 5 万单独。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '관리비에 뭐가 들어 있어요?',
        hangul: 'gwal-li-bi-e mwo-ga deu-reo i-sseo-yo',
        zh: '管理费包含什么？',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '海豹解释完管理费包含电梯、清洁、网络。兔莉想再确认有没有水电费在内，应该问什么？',
        practice: 'pick',
        choices: [
          { ko: '수도세, 전기세도 들어 있어요?', zh: '水费、电费也包含吗？', correct: true },
          { ko: '얼음 빼고요.', zh: '不要冰。', correct: false },
          { ko: '쭉 가세요.', zh: '一直走。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '问明细 · N에 뭐가 들어 있어요?',
    pattern: '名词 + 에 + 뭐가 들어 있어요?',
    whenToUse: '问"...里面包含什么"。合同明细、套餐内容、保险条款都用。让人感觉你认真在听。',
    rules: [
      'N + **에 뭐가 들어 있어요?** = ...里包含什么？',
      '回答用「N + 이/가 들어 있어요」: 전기세**가** 들어 있어요 (包含电费)',
      '否定回答用「N + 은/는 안 들어 있어요」: 전기세**는** 안 들어 있어요 (不包含电费)',
      '相关「N + 이/가 포함되어 있어요」更书面：합약서常见',
    ],
    examples: [
      { ko: '관리비에 뭐가 들어 있어요?', zh: '管理费包含什么？', highlight: '에 뭐가 들어 있어요' },
      { ko: '전기세도 들어 있어요.', zh: '电费也包含。', highlight: '들어 있어요' },
      { ko: '수도세는 안 들어 있어요.', zh: '水费不包含。', highlight: '안 들어 있어요' },
      { ko: '인터넷이 들어 있어요.', zh: '网络包含在内。', highlight: '들어 있어요' },
    ],
    pitfall:
      '签合同时 90% 的纠纷源于"以为关리비包了水电"。务必逐项问：수도세 / 전기세 / 가스비 / 인터넷 / 청소 — 每一项都用「~도 들어 있어요?」单独确认。',
  },

  output: [
    {
      id: 'd20-o1',
      kind: 'compose',
      zhHint: '管理费包含什么？',
      tokens: ['관리비에', '뭐가', '들어 있어요', '?', '관리비는', '있어요'],
      composeAnswer: ['관리비에', '뭐가', '들어 있어요', '?'],
      successMsg: '海豹房东点点头："질문 잘하시네요." (问得很好。) ✓',
    },
    {
      id: 'd20-o2',
      kind: 'listen-choice',
      audioKo: '관리비 5만 따로예요.',
      successMsg: '✓ 「管理费 5 万单独」。「따로예요」= 是另算的，签合同必问。',
      choices: [
        { zh: '管理费 5 万单独。', correct: true },
        { zh: '管理费 5 万包含。', correct: false },
        { zh: '月租 5 万。', correct: false },
        { zh: '押金 5 万。', correct: false },
      ],
    },
    {
      id: 'd20-o3',
      kind: 'zh-to-ko',
      zhPrompt: '水费不包含。',
      successMsg: '"수도세는 안 들어 있어요" — 否定回答用「는 안 V」结构。',
      choices: [
        { ko: '수도세는 안 들어 있어요.', correct: true },
        { ko: '수도세가 안 들어 있어요.', correct: false },
        { ko: '수도세는 들어 없어요.', correct: false },
        { ko: '수도세는 안 있어요.', correct: false },
      ],
    },
    {
      id: 'd20-o4',
      kind: 'particle-error',
      zhHint: '电费也包含。',
      successMsg: '「전기세」(无받침) → 「도」直接接（「도」替换主语助词「가」）。',
      choices: [
        { ko: '전기세도 들어 있어요.', correct: true },
        { ko: '전기세가도 들어 있어요.', correct: false },
        { ko: '전기세도가 들어 있어요.', correct: false },
        { ko: '전기세는도 들어 있어요.', correct: false },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '你已经能问"包含什么"——这一句让韩国房东不敢糊弄你。明天关卡 3 准备好了。',
    preview: '🏠 关卡 3 · 明天要和海豹房东正式签合同。500/50/5 — 一句都不能搞错。',
    stickerId: 'sticker-d20',
  },

  carrotHint:
    '今天的胡萝卜：「韩国원룸合同必问清单」「保证금/월세/관리비区别」「N에 뭐가 들어 있어요? 用法」',
};
