import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 4 · 1-4 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖宿舍报到全流程：自我介绍→出示护照→领钥匙→道谢
 */
export const day4Scene: SceneSubQuestData = {
  day: 4, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在宿舍前台完成正式的自我介绍', subtitleEn: 'Complete a formal self-introduction at the dorm front desk',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd04-sc-s1',
      scenario: '宿舍前台，浣熊阿姨问「새로 온 학생이에요?」（新来的学生吗？）。想用最正式的方式回答，应该说？', scenarioEn: 'At the dorm front desk, the raccoon auntie asks, "새로 온 학생이에요?" (Are you a new student?). You want to answer most formally. What should you say?',
      choices: [
        { ko: '네, 토리입니다.', zh: '是的，我叫兔莉。', zhEn: 'Yes, my name is Tori.', correct: true },
        { ko: '네, 토리예요.', zh: '是的，我是兔莉。（温暖礼貌）', zhEn: 'Yes, I am Tori. (Warm and polite)', correct: false },
        { ko: '아니요, 저는 선생님이에요.', zh: '不，我是老师。', zhEn: 'No, I am a teacher.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '对宿管用 입니다 显得更正式规矩。「토리예요」（해요体）也可以，两档都能用，入住登记场合用 입니다 更"进入角色"', explainEn: 'Using 입니다 with the dorm manager is more formal and proper. 토리예요 (해요체) is also fine; both levels work, but 입니다 fits the check-in registration setting better for "getting into character"',
    },
    {
      type: 'situation',
      id: 'd04-sc-s2',
      scenario: '阿姨说「여권 좀 보여주세요」（请给我看护照）。你正在包里翻找，应该先说什么让阿姨稍等？', scenarioEn: 'The auntie says, "여권 좀 보여주세요" (Please show me your passport). You\'re rummaging in your bag. What should you say first to ask her to wait?',
      choices: [
        { ko: '아니요, 없어요.', zh: '不，没有。', zhEn: 'No, there isn\'t.', correct: false },
        { ko: '잠깐만요, 여권 좀 찾을게요.', zh: '稍等，我找一下护照。', zhEn: 'Just a moment, let me find my passport.', correct: true },
        { ko: '죄송합니다, 안녕히 가세요.', zh: '对不起，再见。', zhEn: 'Sorry, goodbye.', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', zhEn: 'It\'s okay, thank you.', correct: false },
      ],
      explain: '找东西/临时中断用 잠깐만요。用 아니요 없어요 会让阿姨以为你没带护照', explainEn: 'Use 잠깐만요 when looking for something or briefly interrupting. Using 아니요 없어요 would make the auntie think you didn\'t bring your passport',
    },
    {
      type: 'situation',
      id: 'd04-sc-s3',
      scenario: '阿姨递给你钥匙说「301호예요. 키 받으세요.」你应该？', scenarioEn: 'The auntie hands you the key and says, "301호예요. 키 받으세요." What should you do?',
      choices: [
        { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。', zhEn: 'No need, it\'s fine.', correct: false },
        { ko: '네, 감사합니다.', zh: '好的，谢谢。', zhEn: 'Okay, thank you.', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '죄송합니다.', zh: '对不起。', zhEn: 'I\'m sorry.', correct: false },
      ],
      explain: '收东西固定套路：네（是的）+ 감사합니다。「괜찮아요」是拒绝钥匙', explainEn: 'Standard routine for receiving something: 네 (yes) + 감사합니다. 괜찮아요 means refusing the key',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd04-sc-d1',
      lines: [
        { speaker: '사감', ko: '안녕하세요. 새로 온 학생이에요?', zh: '你好，是新来的学生吗？', zhEn: 'Hello, are you a new student?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '네, 토리입니다.', zh: '是的，我叫兔莉。', zhEn: 'Yes, my name is Tori.', correct: true },
        { ko: '아니요, 저는 학생이 아니에요.', zh: '不，我不是学生。', zhEn: 'No, I\'m not a student.', correct: false },
        { ko: '이름이 뭐예요?', zh: '你叫什么？', zhEn: 'What\'s your name?', correct: false },
        { ko: '안녕히 계세요.', zh: '再见（请留步）。', zhEn: 'Goodbye (please stay).', correct: false },
      ],
      explain: '正式场合正式回：네 + 名字+입니다', explainEn: 'In formal situations, respond formally: 네 + name + 입니다',
    },
    {
      type: 'dialogue',
      id: 'd04-sc-d2',
      lines: [
        { speaker: '사감', ko: '중국 학생이에요?', zh: '是中国学生吗？', zhEn: 'Are you a student from China?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '네, 중국 사람이에요.', zh: '是的，我是中国人。', zhEn: 'Yes, I am Chinese.', correct: true },
        { ko: '네, 학생예요.', zh: '是的，是学生。（拼写错）', zhEn: 'Yes, I am a student. (Spelling error)', correct: false },
        { ko: '아니요, 저는 토리예요.', zh: '不，我是兔莉。', zhEn: 'No, I am Tori.', correct: false },
        { ko: '괜찮아요.', zh: '没关系。', zhEn: 'It\'s okay.', correct: false },
      ],
      explain: '사람 末字 람 有收音 ㅁ → 이에요。回答用해요体和对方一致更自然，用 입니다 也不算错', explainEn: '사람\'s last syllable 람 has final consonant ㅁ → 이에요. Answering in 해요체 to match the other person is more natural; using 입니다 isn\'t wrong either',
    },
    {
      type: 'dialogue',
      id: 'd04-sc-d3',
      lines: [
        { speaker: '사감', ko: '301호. 옆방에 하루 학생이 있어요.', zh: '301 号。隔壁有 Haru 同学。', zhEn: 'Room 301. Haru is next door.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '네, 알겠어요. 감사합니다.', zh: '好的，明白了。谢谢。', zhEn: 'Okay, understood. Thank you.', correct: true },
        { ko: '아니요, 옆방은 비어 있어요.', zh: '不，隔壁是空的。', zhEn: 'No, the next room is empty.', correct: false },
        { ko: '이름이 뭐예요?', zh: '你叫什么？', zhEn: 'What\'s your name?', correct: false },
        { ko: '저는 학생이에요.', zh: '我是学生。', zhEn: 'I am a student.', correct: false },
      ],
      explain: '收到长辈指示 → 알겠어요（明白了）+ 감사합니다。这是最标准的应答组合', explainEn: 'When receiving instructions from elders → 알겠어요 (understood) + 감사합니다. This is the most standard response combination.',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd04-sc-c1',
      ko: '저는 토리입니다.',
      promptZh: '这句话最合适的使用场景是？', promptZhEn: 'What\'s the most appropriate situation for this phrase?',
      choices: [
        { zh: '面试、正式登记、对宿管/长辈自我介绍', zhEn: 'Introducing yourself in interviews, formal registrations, or to dorm managers/elders', correct: true },
        { zh: '和朋友聊天时自我介绍', zhEn: 'Introducing yourself when chatting with friends', correct: false },
        { zh: '朋友问你要不要喝可乐时', zhEn: 'When a friend asks if you want a Coke', correct: false },
        { zh: '收到礼物时道谢', zhEn: 'Thanking someone when you receive a gift', correct: false },
      ],
      explain: '입니다 = 합쇼체最正式。朋友间用会显得太生硬（该用 예요 或 반말）', explainEn: '입니다 = 합쇼체, the most formal. Using it with friends feels too stiff (use 예요 or 반말 instead)',
    },
    {
      type: 'context',
      id: 'd04-sc-c2',
      ko: '잠깐만요.',
      promptZh: '这句话在什么场景最自然？', promptZhEn: 'In what situation is this sentence most natural?',
      choices: [
        { zh: '需要对方稍等一下（找东西、接电话、临时中断）', zhEn: 'When you need the other person to wait a moment (looking for something, answering a call, or a brief interruption)', correct: true },
        { zh: '道歉赔不是时', zhEn: 'When apologizing and making amends', correct: false },
        { zh: '和朋友告别时', zhEn: 'When saying goodbye to friends', correct: false },
        { zh: '对方送你礼物时', zhEn: 'When someone gives you a gift', correct: false },
      ],
      explain: '잠깐만요 = 请稍等一下。对店员/前台/长辈都能用，比「기다려」(等) 礼貌', explainEn: '잠깐만요 = Please wait a moment. Can be used with store clerks, front desks, or elders; more polite than 기다려 (wait)',
    },
  ],
};
