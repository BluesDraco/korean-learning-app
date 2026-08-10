import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 18 · 1-5 Boss 战 · 兽民银行开户综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：~고 싶어요 + ㄹ 词干动词 + 银行开户全流程语料
 */
export const day18Boss: BossSubQuestData = {
  day: 18, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '拿到第一本韩国存折', subtitleEn: 'Get your first Korean bankbook',
  intro: '乌龟柜员放慢速度把最后一份文件推过来。「마지막이에요…（这是最后一步了……）」窗口外阳光斜下来。今天学过的每一句现在都要用上。', introEn: 'The turtle teller slows down and slides the last document over. "마지막이에요… (This is the last step...)" Sunlight slants in through the window. Every sentence you learned today now needs to be used.',
  outroHook: '通过！第一本韩国存折到手，Tori 真的成了兽尔的居民。可夜里嗓子开始发烫——下一站，Haru 要带你去医院内科，第一次用韩语跟医生说清哪里不舒服。', outroHookEn: 'Passed! Your first Korean bankbook is in hand, and Tori is truly a resident of Ssorieul. But at night, your throat starts to burn—next stop, Haru will take you to the hospital\'s internal medicine department, where you\'ll use Korean for the first time to tell the doctor exactly what\'s wrong.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd18-b5-t1',
        audioKo: '통장 만들고 싶어요.',
        choices: [
          { text: '我想开存折。', textEn: 'I\'d like to open a bankbook.', correct: true },
          { text: '存折做好了。', textEn: 'The bankbook is ready.', correct: false },
          { text: '有存折吗？', textEn: 'Do you have a bankbook?', correct: false },
          { text: '想看存折。', textEn: 'I want to see the bankbook.', correct: false },
        ],
        explain: '통장(存折) + 만들다(做/办) + 고 싶어요(想) = 想开存折', explainEn: 'Bankbook + to make/open + want to = I want to open a bankbook.',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd18-b5-t2',
        audioKo: '외국인등록증이랑 여권 부탁드립니다.',
        choices: [
          { text: '请给我登录证和护照。', textEn: 'Please give me your alien registration card and passport.', correct: true },
          { text: '请给我存折和护照。', textEn: 'Please give me your bankbook and passport.', correct: false },
          { text: '请出示学生证。', textEn: 'Please show your student ID.', correct: false },
          { text: '登录证在哪里？', textEn: 'Where is the alien registration card?', correct: false },
        ],
        explain: 'A + 이랑 + B = A 和 B。부탁드립니다 = 请（最正式）', explainEn: 'A + 이랑 + B = A and B. 부탁드립니다 = please (most formal).',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd18-b5-t3',
        promptZh: '"我想开存折"哪句正确？', promptZhEn: 'Which sentence is correct for \'I want to open a bankbook\'?',
        choices: [
          { text: '통장 만드고 싶어요.', correct: false },
          { text: '통장 만들어 싶어요.', correct: false },
          { text: '통장 만들고 싶어요.', correct: true },
          { text: '통장 만들 싶어요.', correct: false },
        ],
        explain: '만들다 词干"만들"（ㄹ 收音保留）+ 고 싶어요。ㄹ 不脱落', explainEn: 'The stem of 만들다 is \'만들\' (the ㄹ batchim is kept) + 고 싶어요. The ㄹ does not drop.',
      },
    },
    {
      type: 'choice',
      label: '形态改错', labelEn: 'Fix the form',
      task: {
        id: 'd18-b5-t4',
        promptZh: '"朋友想去韩国"（第三人称）哪句正确？', promptZhEn: 'Which sentence is correct for \'My friend wants to go to Korea\' (third person)?',
        choices: [
          { text: '친구가 한국에 가고 싶어요.', correct: false },
          { text: '친구가 한국에 가고 싶어해요.', correct: true },
          { text: '친구가 한국에 가고 싶다.', correct: false },
          { text: '친구가 한국에 가고 싶어.', correct: false },
        ],
        explain: '第三人称"想~"必须加 하다 → 고 싶어해요。「고 싶어요」只能说自己/问对方', explainEn: 'For third person \'want to~\', you must add 하다 → 고 싶어해요. \'고 싶어요\' is only for oneself or asking the other person.',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd18-b5-t5',
        promptKo: '비밀번호',
        promptHangul: 'bi-mil-beon-ho',
        choices: [
          { text: '密码', textEn: 'PIN', correct: true },
          { text: '姓名', textEn: 'Name', correct: false },
          { text: '账号', textEn: 'Account number', correct: false },
          { text: '签名', textEn: 'Signature', correct: false },
        ],
        explain: '비밀(秘密) + 번호(番号) = 密码', explainEn: '비밀 (secret) + 번호 (number) = password.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd18-b5-t6',
        zhHint: '想吃什么？', zhHintEn: 'What do you want to eat?',
        audioKo: '뭐 먹고 싶어요?',
        answer: ['뭐', '먹고', '싶어요?'],
        tokens: ['뭐', '먹고', '싶어요?', '먹을래요?', '먹었어요?', '있어요?'],
        explain: '뭐(什么) + 먹다 + 고 싶어요? = 想吃什么？韩国朋友约饭必问', explainEn: '뭐 (what) + 먹다 + 고 싶어요? = What do you want to eat? A must-ask when Korean friends plan a meal.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd18-b5-t7',
        zhHint: '请在这里签名。', zhHintEn: 'Please sign here.',
        audioKo: '여기에 사인해 주세요.',
        answer: ['여기에', '사인해', '주세요.'],
        tokens: ['여기에', '사인해', '주세요.', '사인하세요.', '여기가', '사인했어요.'],
        explain: '여기에(在这里·地点助词 에) + 사인하다 → 사인해 주세요', explainEn: '여기에 (here, location particle 에) + 사인하다 → 사인해 주세요.',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd18-b5-t8',
        promptZh: '乌龟柜员说「비밀번호 네 자리 입력해 주세요」，你听懂了要输 4 位密码，最礼貌的回应？', promptZhEn: 'The turtle teller says \'비밀번호 네 자리 입력해 주세요\'. You understand you need to enter a 4-digit password. What\'s the most polite response?',
        choices: [
          { text: '네, 알겠습니다.', correct: true },
          { text: '응, 알았어.', correct: false },
          { text: '비밀번호가 뭐예요?', correct: false },
          { text: '통장 주세요.', correct: false },
        ],
        explain: '收到指令 → 「네, 알겠습니다」（합쇼체）。银行场合用最高级礼貌', explainEn: 'Upon receiving an instruction → \'네, 알겠습니다\' (합쇼체). Use the highest level of politeness in a bank setting.',
      },
    },
  ],
};
