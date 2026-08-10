import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 4 · 1-5 Boss 战 · 宿舍报到综合大考
 * 8 题混合：听句选意×2 + 助词改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 5：走廊里晾袜子的仓鼠 Haru
 */
export const day4Boss: BossSubQuestData = {
  day: 4, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '在宿舍前台完成一次正式的入住登记', subtitleEn: 'Complete a formal check-in at the dormitory front desk',
  intro: '宿管阿姨合上了登记册，钥匙就在她掌心。你握紧包里的胡萝卜——这一次要靠 입니다 撑起礼貌，靠 이에요 稳住细节。', introEn: 'The dorm manager closed the register, the key in her palm. You grip the carrot in your bag—this time, you\'ll rely on 입니다 for politeness and 이에요 for the details.',
  outroHook: '通过！阿姨把胡萝卜挂件放进你手心："우리 기숙사 첫 주 선물이에요."（这是我们宿舍第一周的礼物。）走廊尽头有人在晾袜子——下一关的挑战已经在等你。', outroHookEn: 'Passed! The manager places the carrot keychain in your palm: "우리 기숙사 첫 주 선물이에요." (This is our dorm\'s first-week gift.) Someone is hanging socks at the end of the hallway—the next challenge is already waiting for you.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd04-b5-t1',
        audioKo: '새로 온 학생이에요?',
        choices: [
          { text: '你是新来的学生吗？', textEn: 'Are you a new student?', correct: true },
          { text: '你叫什么名字？', textEn: 'What\'s your name?', correct: false },
          { text: '你几年级？', textEn: 'What grade are you in?', correct: false },
          { text: '你是中国人吗？', textEn: 'Are you Chinese?', correct: false },
        ],
        explain: '새로 온 = 新来的（새로 副词 + 온 过去时定语），학생이에요 = 是学生吗', explainEn: '새로 온 = new (새로 adverb + 온 past tense modifier), 학생이에요 = is a student',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd04-b5-t2',
        audioKo: '301호예요. 키 받으세요.',
        choices: [
          { text: 'Haru 住在 301。', textEn: 'Haru lives in 301.', correct: false },
          { text: '301 号，请收下钥匙。', textEn: 'Room 301, here\'s your key.', correct: true },
          { text: '钥匙丢在 301。', textEn: 'The key was left in 301.', correct: false },
          { text: '这是新钥匙。', textEn: 'This is the new key.', correct: false },
        ],
        explain: '301호(号) + 예요(是) + 키(钥匙) + 받으세요(请收下)', explainEn: '301호 + 예요 + 키 + 받으세요',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd04-b5-t3',
        promptZh: '"我不是学生"（温暖礼貌）哪句正确？', promptZhEn: 'Which is correct for "I\'m not a student" (warm and polite)?',
        choices: [
          { text: '학생을 아니에요.', correct: false },
          { text: '학생이 아니에요.', correct: true },
          { text: '학생는 아니에요.', correct: false },
          { text: '학생이 아니이에요.', correct: false },
        ],
        explain: '이다 否定 = X이/가 아니에요。학생 有收音 → 이 아니에요。用宾格 을 是错的', explainEn: 'The negative of 이다 is X이/가 아니에요. 학생 ends in a consonant → 이 아니에요. Using the object particle 을 is wrong.',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd04-b5-t4',
        promptKo: '잠깐만요',
        promptHangul: 'jam-kkan-man-yo',
        choices: [
          { text: '请稍等一下', textEn: 'Please wait a moment.', correct: true },
          { text: '请慢走', textEn: 'Please go safely', correct: false },
          { text: '请再说一遍', textEn: 'Please say that again.', correct: false },
          { text: '请给我看', textEn: 'Please show me.', correct: false },
        ],
        explain: '잠깐(一会儿) + 만(只) + 요(敬语) = 请稍等。找东西/接电话/临时中断都用它', explainEn: '잠깐 + 만 + 요 = Please wait. Use it when looking for something, answering a call, or pausing briefly.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd04-b5-t5',
        zhHint: '是的，我叫兔莉。（最正式）', zhHintEn: 'Yes, I\'m Tori. (Most formal)',
        audioKo: '네, 토리입니다.',
        answer: ['네,', '토리입니다.'],
        tokens: ['네,', '토리입니다.', '토리예요.', '토리이에요.', '아니요,', '학생입니다.'],
        explain: '입니다 不受收音影响，直接接名词。对宿管用 입니다 更得体', explainEn: '입니다 is not affected by final consonants; attach it directly to nouns. Using 입니다 with the dorm manager is more polite.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd04-b5-t6',
        zhHint: '好的，明白了。谢谢。', zhHintEn: 'Okay, understood. Thank you.',
        audioKo: '네, 알겠어요. 감사합니다.',
        answer: ['네,', '알겠어요.', '감사합니다.'],
        tokens: ['네,', '알겠어요.', '감사합니다.', '아니요,', '괜찮아요.', '만나서 반가워요.'],
        explain: '收到长辈指示的标准应答：네 + 알겠어요 + 감사합니다', explainEn: 'Standard response to an elder\'s instruction: 네 + 알겠어요 + 감사합니다',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd04-b5-t7',
        audioKo: '여권 좀 보여주세요.',
        promptZh: '前台要看护照，你在包里找。你应该说？', promptZhEn: 'The front desk wants to see your passport, and you\'re looking in your bag. What should you say?',
        choices: [
          { text: '아니요, 없어요.', correct: false },
          { text: '잠깐만요, 여권 좀 찾을게요.', correct: true },
          { text: '괜찮아요, 감사합니다.', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '找东西用 잠깐만요。「아니요 없어요」会让前台以为你没带护照', explainEn: 'Use 잠깐만요 when looking for something. Saying "아니요 없어요" would make the front desk think you don\'t have your passport.',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd04-b5-t8',
        promptZh: '阿姨递给你钥匙说"301号，请收下钥匙"，你应该？', promptZhEn: 'The auntie hands you the key and says "Room 301, here\'s your key." What should you do?',
        choices: [
          { text: '아니요, 괜찮아요.', correct: false },
          { text: '만나서 반가워요.', correct: false },
          { text: '네, 감사합니다.', correct: true },
          { text: '이름이 뭐예요?', correct: false },
        ],
        explain: '收到钥匙 = 收到东西 → 네 + 감사합니다。用 괜찮아요 会拒绝钥匙', explainEn: 'Receiving the key = receiving something → 네 + 감사합니다. Using 괜찮아요 would reject the key.',
      },
    },
  ],
};
