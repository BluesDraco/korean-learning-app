import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 18 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 18 主流程「兽民银行 · 乌龟柜员」
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 ~고 싶어요 复习 + ㄹ 词干动词
 */
export const day18Listen: ListenSubQuestData = {
  day: 18, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在兽民银行听清乌龟柜员的每一句慢话', subtitleEn: 'At the Beast Bank, listen carefully to every slow word from the turtle teller.',

  meaning: [
    {
      id: 'd18-l2-m1',
      audioKo: '통장 만들고 싶어요.',
      choices: [
        { text: '我想开存折。', textEn: 'I\'d like to open a bankbook.', correct: true },
        { text: '存折做好了。', textEn: 'The bankbook is ready.', correct: false },
        { text: '有存折吗？', textEn: 'Do you have a bankbook?', correct: false },
        { text: '存折是什么？', textEn: 'What is a bankbook?', correct: false },
      ],
      explain: '통장(存折) + 만들다(做/办) + 고 싶어요(想) = 想开存折。银行开户核心句', explainEn: '통장 (bankbook) + 만들다 (make/open) + 고 싶어요 (want to) = I want to open a bankbook. Key sentence for opening an account.',
    },
    {
      id: 'd18-l2-m2',
      audioKo: '어떻게 오셨어요?',
      choices: [
        { text: '您要办什么？', textEn: 'What would you like to do?', correct: true },
        { text: '您怎么来的？', textEn: 'How did you get here?', correct: false },
        { text: '您几点到？', textEn: 'What time did you arrive?', correct: false },
        { text: '您从哪来？', textEn: 'Where are you from?', correct: false },
      ],
      explain: '「어떻게 오셨어요?」直译"您怎么来的"，实际是"来办什么事？"（银行/公文常用）', explainEn: '「어떻게 오셨어요?」 literally means "How did you come?" but actually means "What can I do for you?" (common in banks/official settings).',
    },
    {
      id: 'd18-l2-m3',
      audioKo: '외국인등록증이랑 여권 주세요.',
      choices: [
        { text: '请给我登录证和护照。', textEn: 'Please give me your alien registration card and passport.', correct: true },
        { text: '请给我存折和密码。', textEn: 'Please give me the bankbook and password.', correct: false },
        { text: '请输入密码。', textEn: 'Please enter your PIN.', correct: false },
        { text: '护照丢了。', textEn: 'I lost my passport.', correct: false },
      ],
      explain: 'A + 이랑 + B = A 和 B（口语）。「이랑/랑」用法：有받침 → 이랑，无받침 → 랑',
    },
    {
      id: 'd18-l2-m4',
      audioKo: '비밀번호 네 자리 입력해 주세요.',
      choices: [
        { text: '请输入四位密码。', textEn: 'Please enter your 4-digit password.', correct: true },
        { text: '请设置密码。', textEn: 'Please set a password.', correct: false },
        { text: '请重新输入。', textEn: 'Please enter it again.', correct: false },
        { text: '密码错误。', textEn: 'Incorrect password.', correct: false },
      ],
      explain: '비밀번호(密码) + 네 자리(四位) + 입력해 주세요(请输入)。「네」是固有数四搭量词的变形', explainEn: '비밀번호 (password) + 네 자리 (4 digits) + 입력해 주세요 (please enter). 「네」 is the native Korean number four combined with a counter.',
    },
    {
      id: 'd18-l2-m5',
      audioKo: '여기에 사인해 주세요.',
      choices: [
        { text: '请在这里签名。', textEn: 'Please sign here.', correct: true },
        { text: '请在这里等一下。', textEn: 'Please wait here.', correct: false },
        { text: '这是您的签名吗？', textEn: 'Is this your signature?', correct: false },
        { text: '请重新签名。', textEn: 'Please sign again.', correct: false },
      ],
      explain: '여기에(在这里) + 사인하다(签名) → 사인해 주세요。银行/合同签字场景', explainEn: '여기에 (here) + 사인하다 (to sign) → 사인해 주세요. Used for signing at banks/contracts.',
    },
  ],

  cloze: [
    {
      id: 'd18-l2-c1',
      audioKo: '통장 만들고 싶어요.',
      clozeParts: ['통장 ', '.'],
      choices: [
        { text: '만들고 싶어요', correct: true },
        { text: '만드고 싶어요', correct: false },
        { text: '만들어요', correct: false },
        { text: '만들었어요', correct: false },
      ],
      explain: '만들다 词干"만들"有받침 ㄹ → 直接 + 고 싶어요。**ㄹ 保留**（不脱落）',
    },
    {
      id: 'd18-l2-c2',
      audioKo: '뭐 먹고 싶어요?',
      clozeParts: ['뭐 ', '?'],
      choices: [
        { text: '먹고 싶어요', correct: true },
        { text: '먹고 있어요', correct: false },
        { text: '먹을래요', correct: false },
        { text: '먹었어요', correct: false },
      ],
      explain: '뭐(什么) + 먹다 + 고 싶어요?（想~疑问）。约饭必备句', explainEn: '뭐 (what) + 먹다 + 고 싶어요? (want to~ question). Essential for making meal plans.',
    },
    {
      id: 'd18-l2-c3',
      audioKo: '학생증도 필요해요?',
      clozeParts: ['학생증', '필요해요?'],
      choices: [
        { text: '도', correct: true },
        { text: '가', correct: false },
        { text: '를', correct: false },
        { text: '에', correct: false },
      ],
      explain: '「도」= 也（附加助词）。「학생증도 필요해요?」= 也需要学生证吗？', explainEn: '「도」= also (additive particle). 「학생증도 필요해요?」= Do you also need a student ID?',
    },
    {
      id: 'd18-l2-c4',
      audioKo: '비밀번호를 입력해 주세요.',
      clozeParts: ['비밀번호', '입력해 주세요.'],
      choices: [
        { text: '를', correct: true },
        { text: '가', correct: false },
        { text: '도', correct: false },
        { text: '에', correct: false },
      ],
      explain: '입력하다 是及物动词 → 前用宾格 을/를。비밀번호 末字"호"无받침 → 를',
    },
  ],

  reply: [
    {
      id: 'd18-l2-r1',
      audioKo: '어떻게 오셨어요?',
      promptZh: '乌龟柜员问"您要办什么？"你想开存折，最自然的一句？', promptZhEn: 'The turtle teller asks "What can I do for you?" You want to open a passbook. What\'s the most natural thing to say?',
      choices: [
        { text: '통장 만들고 싶어요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '통장 있어요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '银行询问 → 客户说明目的：X 만들고 싶어요 = 想办 X', explainEn: 'Bank inquiry → customer states purpose: X 만들고 싶어요 = I want to get X.',
    },
    {
      id: 'd18-l2-r2',
      audioKo: '외국인등록증이랑 여권 주세요.',
      promptZh: '柜员要证件，你已经带来了，最自然的一句？', promptZhEn: 'The teller asks for your ID, and you\'ve brought it. What\'s the most natural thing to say?',
      choices: [
        { text: '네, 여기 있어요.', correct: true },
        { text: '없어요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '递证件时说 「네, 여기 있어요」= 好的，在这里。母语者递东西的标准句', explainEn: 'When handing over your ID, say 「네, 여기 있어요」= Okay, here it is. The standard phrase native speakers use when handing things over.',
    },
    {
      id: 'd18-l2-r3',
      audioKo: '비밀번호 네 자리 입력해 주세요.',
      promptZh: '柜员让你输密码，你想说"我知道了"，最自然的一句？', promptZhEn: 'The teller asks you to enter your PIN. You want to say "I understand." What\'s the most natural thing to say?',
      choices: [
        { text: '네, 알겠습니다.', correct: true },
        { text: '비밀번호가 뭐예요?', correct: false },
        { text: '없어요.', correct: false },
        { text: '통장 주세요.', correct: false },
      ],
      explain: '收到指令 → 「네, 알겠습니다」（합쇼체·最礼貌）。银行/公务场合用最高敬语', explainEn: 'When given an instruction → 「네, 알겠습니다」 (합쇼체·most polite). Use the highest honorific in banks/official settings.',
    },
  ],
};
