import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 18 · 1-3 문법 탐험 · 语法关
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：~고 싶어요 复习 + ㄹ 词干动词的接续规则
 */
export const day18Grammar: GrammarSubQuestData = {
  day: 18, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '~고 싶어요 深化 · ㄹ 词干动词',

  fix: [
    {
      id: 'd18-g3-f1',
      promptKo: '통장 만드고 싶어요.',
      promptZh: '"我想开存折"最标准的说法？',
      choices: [
        { text: '통장 만드고 싶어요.', correct: false },
        { text: '통장 만들고 싶어요.', correct: true },
        { text: '통장 만들어 싶어요.', correct: false },
        { text: '통장 만듭고 싶어요.', correct: false },
      ],
      explain: '만들다 的 ㄹ 收音**在 고 前保留**（ㄹ 只在 ㄴ/ㅂ/ㅅ/오 前脱落）。词干 만들 + 고 싶어요 = 만들고 싶어요',
    },
    {
      id: 'd18-g3-f2',
      promptKo: '카드 만들고 싶어요.',
      promptZh: '朋友想办卡（第三人称），最自然的说法？',
      choices: [
        { text: '친구가 카드 만들고 싶어요.', correct: false },
        { text: '친구가 카드 만들고 싶어해요.', correct: true },
        { text: '친구가 카드 만들래요.', correct: false },
        { text: '친구가 카드 만들었어요.', correct: false },
      ],
      explain: '第三人称"想~"必须加 하다 → 고 싶어해요。「고 싶어요」只用于第一/第二人称',
    },
    {
      id: 'd18-g3-f3',
      promptKo: '뭐 먹을래요?',
      promptZh: '想问"想吃什么？"（问对方内心愿望）最自然的说法？',
      choices: [
        { text: '뭐 먹을래요?', correct: false },
        { text: '뭐 먹고 싶어요?', correct: true },
        { text: '뭐 먹었어요?', correct: false },
        { text: '뭐 먹어요?', correct: false },
      ],
      explain: '「먹고 싶어요?」问内心愿望；「먹을래요?」偏提议邀请。两者场景不同——这里问"想吃什么"更适合 고 싶어요',
    },
    {
      id: 'd18-g3-f4',
      promptKo: '통장을 만들고 싶어요.',
      promptZh: '"我想开存折"哪句最标准？',
      choices: [
        { text: '통장가 만들고 싶어요.', correct: false },
        { text: '통장을 만들고 싶어요.', correct: true },
        { text: '통장은 만들고 싶어요.', correct: false },
        { text: '통장에 만들고 싶어요.', correct: false },
      ],
      explain: '만들다 是及物动词 → 前用宾格 을/를。통장 有받침 ㅇ → 을。口语可省略 을，但标准句保留',
    },
    {
      id: 'd18-g3-f5',
      promptKo: '비밀번호가 입력해 주세요.',
      promptZh: '"请输入密码"最标准的说法？',
      choices: [
        { text: '비밀번호가 입력해 주세요.', correct: false },
        { text: '비밀번호를 입력해 주세요.', correct: true },
        { text: '비밀번호는 입력해 주세요.', correct: false },
        { text: '비밀번호에 입력해 주세요.', correct: false },
      ],
      explain: '입력하다 是及物动词 → 前用宾格 을/를。비밀번호 末字"호"无받침 → 를',
    },
  ],

  compose: [
    {
      id: 'd18-g3-c1',
      zhHint: '我想开存折。',
      audioKo: '통장 만들고 싶어요.',
      answer: ['통장', '만들고', '싶어요.'],
      tokens: ['통장', '만들고', '싶어요.', '만들어요.', '만드고', '만들어 있어요.', '만들었어요.'],
      explain: '만들다 词干 만들（ㄹ 保留）+ 고 싶어요。银行开户核心句',
    },
    {
      id: 'd18-g3-c2',
      zhHint: '想吃什么？（朋友问朋友）',
      audioKo: '뭐 먹고 싶어요?',
      answer: ['뭐', '먹고', '싶어요?'],
      tokens: ['뭐', '먹고', '싶어요?', '먹을래요?', '먹었어요?', '먹고 있어요?'],
      explain: '뭐 + 먹고 싶어요? 疑问句。问对方内心愿望',
    },
    {
      id: 'd18-g3-c3',
      zhHint: '请给我登录证和护照。',
      audioKo: '외국인등록증이랑 여권 주세요.',
      answer: ['외국인등록증이랑', '여권', '주세요.'],
      tokens: ['외국인등록증이랑', '여권', '주세요.', '외국인등록증하고', '여권도', '보여주세요.'],
      explain: '「A + 이랑 + B」= A 和 B（口语）。有받침 → 이랑，无받침 → 랑',
    },
    {
      id: 'd18-g3-c4',
      zhHint: '请在这里签名。',
      audioKo: '여기에 사인해 주세요.',
      answer: ['여기에', '사인해', '주세요.'],
      tokens: ['여기에', '사인해', '주세요.', '사인하세요.', '사인했어요.', '사인하고 있어요.'],
      explain: '여기에(在这里·地点助词 에) + 사인하다 → 사인해 주세요',
    },
  ],

  rule: [
    {
      id: 'd18-g3-r1',
      promptZh: '关于 ㄹ 词干动词接 ~고 싶어요，哪句最准确？',
      choices: [
        { text: 'ㄹ 收音在 고 前**保留**：만들다 → 만들고 싶어요（不是 만드고 ❌）', correct: true },
        { text: 'ㄹ 收音在 고 前**脱落**：만들다 → 만드고 싶어요', correct: false },
        { text: 'ㄹ 变成 ㄴ：만들다 → 만는고 싶어요', correct: false },
        { text: 'ㄹ 全部去掉：만들다 → 만다고 싶어요', correct: false },
      ],
      explain: 'ㄹ 只在特定环境脱落（ㄴ/ㅂ/ㅅ/오 之前）。고 不是那 4 个字母，所以 ㄹ **保留**',
    },
    {
      id: 'd18-g3-r2',
      promptZh: '关于「이랑/랑」的用法，哪句最准确？',
      choices: [
        { text: '「이랑/랑」= 和（口语并列助词）。有받침 → 이랑，无받침 → 랑', correct: true },
        { text: '「이랑」= 主格助词', correct: false },
        { text: '「이랑」和「이나」意思一样', correct: false },
        { text: '「이랑」只用于书面', correct: false },
      ],
      explain: '并列 3 种方式：口语 이랑/랑、书面 와/과、通用 하고。등록증이랑 여권 = 登录证和护照',
    },
    {
      id: 'd18-g3-r3',
      promptZh: '关于 ~고 싶어요 vs ~을래요?，哪句最准确？',
      choices: [
        { text: '고 싶어요? = 问对方内心愿望（较正式）；을래요? = 提议邀请（"你要不要~"）', correct: true },
        { text: '两者完全一样', correct: false },
        { text: '고 싶어요 用过去，을래요 用将来', correct: false },
        { text: '고 싶어요 用书面，을래요 用口语', correct: false },
      ],
      explain: '뭐 먹고 싶어요? 问对方想什么；뭐 먹을래? 邀约的语气。两者可以互用但语感不同',
    },
    {
      id: 'd18-g3-r4',
      promptZh: '关于「부탁드립니다」，哪句最准确？',
      choices: [
        { text: '부탁하다(拜托) → 부탁드리다（敬语） + 합쇼체 → 부탁드립니다。银行/公文最礼貌', correct: true },
        { text: '부탁드립니다 是"帮我"的意思', correct: false },
        { text: '「부탁드립니다」和「부탁해요」一样', correct: false },
        { text: '「부탁드립니다」只对朋友说', correct: false },
      ],
      explain: '드리다 是 주다 的敬语。부탁하다 → 부탁드리다 → 부탁드립니다（합쇼체）是最高级礼貌',
    },
  ],
};
