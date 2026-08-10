import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 3 · 1-5 Boss 战 · 机场求助综合大考
 * 8 题混合：听句选意×2 + 助词改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 4：한빛宿舍报到，浣熊宿管阿姨说话很快
 */
export const day3Boss: BossSubQuestData = {
  day: 3, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '在机场出口独立完成一次求助', subtitleEn: 'Complete a request for help on your own at the airport exit.',
  intro: 'Minji 姐姐已经上车走了。此刻你独自一人站在仁爪机场出口，行李还剩最后 30 米。这一次，没人替你翻译。', introEn: 'Minji unnie has already gotten in the car and left. Now you\'re standing alone at Incheon Airport exit, with only 30 meters of luggage left. This time, no one will translate for you.',
  outroHook: '通过！出租车穿过汉江桥，缓缓停在한빛宿舍门口。门后传出一阵急促的韩语——是浣熊宿管阿姨在喊你的名字。下一关的挑战已经在等你。', outroHookEn: 'Pass! The taxi crosses the Han River bridge and slowly stops at the Hanbit dorm entrance. From behind the door comes a hurried burst of Korean—it\'s the raccoon dorm manager calling your name. The next challenge is already waiting for you.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd03-b5-t1',
        audioKo: '제 짐이 무거워요.',
        choices: [
          { text: '我的行李很重。', textEn: 'My luggage is heavy.', correct: true },
          { text: '我的家很温暖。', textEn: 'My home is warm.', correct: false },
          { text: '我的包很轻。', textEn: 'My bag is light.', correct: false },
          { text: '我的行李是新的。', textEn: 'My luggage is new.', correct: false },
        ],
        explain: '「짐」ㅁ 收音 = 行李。「집」ㅂ 收音 = 家。听准末尾辅音', explainEn: '\'짐\' ends with ㅁ = luggage. \'집\' ends with ㅂ = home. Listen carefully to the final consonant.',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd03-b5-t2',
        audioKo: '집이 어디예요?',
        choices: [
          { text: '行李在哪里？', textEn: 'Where is the luggage?', correct: false },
          { text: '你家在哪里？', textEn: 'Where is your house?', correct: true },
          { text: '你叫什么名字？', textEn: 'What\'s your name?', correct: false },
          { text: '你几岁？', textEn: 'How old are you?', correct: false },
        ],
        explain: '「집」= 家。「어디예요?」= 在哪里。谁在哪里用主格 이/가', explainEn: '\'집\' = home. \'어디예요?\' = where is it? Use the subject particle 이/가 for who is where.',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd03-b5-t3',
        promptZh: '"我的行李太重了"哪句正确？', promptZhEn: 'Which sentence is correct for \'My luggage is too heavy\'?',
        choices: [
          { text: '제 짐가 너무 무거워요.', correct: false },
          { text: '제 짐이 너무 무거워요.', correct: true },
          { text: '제 짐을 너무 무거워요.', correct: false },
          { text: '제 짐는 너무 무거워요.', correct: false },
        ],
        explain: '짐 有收音 ㅁ → 主格用 이。「무거워요」是形容词，前面用主格不用宾格', explainEn: '짐 ends with ㅁ → use subject particle 이. \'무거워요\' is an adjective, so it takes the subject particle, not the object particle.',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd03-b5-t4',
        promptKo: '도와주세요',
        promptHangul: 'do-wa-ju-se-yo',
        choices: [
          { text: '请帮帮我', textEn: 'Please help me', correct: true },
          { text: '请给我', textEn: 'Please give me', correct: false },
          { text: '请等一下', textEn: 'Please wait a moment', correct: false },
          { text: '请再说一次', textEn: 'Please say it again.', correct: false },
        ],
        explain: '돕다(帮) → 도와(词干) + 주세요(请给我做) = 请帮我。留学生保命句', explainEn: '돕다 (to help) → 도와 (stem) + 주세요 (please do for me) = please help me. A lifesaver phrase for international students.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd03-b5-t5',
        zhHint: '不好意思，请帮个忙。', zhHintEn: 'Excuse me, could you help me?',
        audioKo: '저기요, 좀 도와주세요.',
        answer: ['저기요,', '좀', '도와주세요.'],
        tokens: ['저기요,', '좀', '도와주세요.', '주세요.', '언니', '감사합니다.'],
        explain: '저기요(开场) + 좀(缓和) + 도와주세요(请帮我)。求助黄金三段', explainEn: '저기요 (opening) + 좀 (softener) + 도와주세요 (please help me). The golden three-part request.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd03-b5-t6',
        zhHint: '姐姐，真的非常感谢。', zhHintEn: 'Sister, thank you so much.',
        audioKo: '언니, 정말 감사합니다.',
        answer: ['언니,', '정말', '감사합니다.'],
        tokens: ['언니,', '정말', '감사합니다.', '괜찮아요.', '미안해요.', '오빠,'],
        explain: '언니(呼语) + 정말(真的) + 감사합니다。정말 是加倍真诚的副词', explainEn: '언니 (term of address) + 정말 (really) + 감사합니다 (thank you). 정말 is an adverb that adds extra sincerity.',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd03-b5-t7',
        audioKo: '집이요?',
        promptZh: '你刚说错话，把 짐 说成了 집。对方疑惑地问「집이요?（家吗？）」你应该？', promptZhEn: 'You just misspoke, saying 짐 as 집. The other person asks in confusion \'집이요? (Home?)\' What should you do?',
        choices: [
          { text: '네, 집이에요.', correct: false },
          { text: '아, 죄송해요. 짐이요.', correct: true },
          { text: '만나서 반가워요.', correct: false },
          { text: '괜찮아요.', correct: false },
        ],
        explain: '主流程救场句：죄송해요 + 改口正确词 + 이요。用 「네, 집이에요」会把错误坐实', explainEn: 'The main recovery phrase: 죄송해요 + corrected word + 이요. Saying \'네, 집이에요\' would confirm the mistake.',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd03-b5-t8',
        promptZh: 'Minji 帮你把行李抬上了出租车，你应该说？', promptZhEn: 'Minji helped you put your luggage into the taxi. What should you say?',
        choices: [
          { text: '아니요, 괜찮아요.', correct: false },
          { text: '만나서 반가워요, 언니.', correct: false },
          { text: '정말 감사합니다, 언니.', correct: true },
          { text: '죄송해요, 무거워요.', correct: false },
        ],
        explain: '收到帮助后 정말 감사합니다 + 언니 是最真诚温暖的道谢。「아니요 괜찮아요」是拒绝，用错场景', explainEn: 'After receiving help, 정말 감사합니다 + 언니 is the most sincere and warm thanks. \'아니요 괜찮아요\' is a refusal, wrong in this context.',
      },
    },
  ],
};
