import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 6 · 1-5 Boss 战 · 教室破冰综合大考
 * 8 题混合：听句选意×2 + 助词改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 7：Tori 独自坐地铁走丢，手机 1%，末班车雨天
 */
export const day6Boss: BossSubQuestData = {
  day: 6, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '在教室独立完成一次自我介绍 + 是非问答', subtitleEn: 'Complete a self-introduction and yes/no Q&A on your own in the classroom',
  intro: '第一节课的下课铃刚响，Junho 把应援棒收进书包，抬头看你。教室里 20 双眼睛也在看你。这一次，是非疑问句和 좋아해요 就是你的通行证。', introEn: 'The bell for the first class just rang, Junho tucked his light stick into his bag and looked up at you. 20 pairs of eyes in the classroom are also on you. This time, yes/no questions and 좋아해요 are your ticket through.',
  outroHook: '通过！Junho 把手机号写在你笔记本第一页："주말에 콘서트 갈래요?"（周末去演唱会吗？）——但下一关不是演唱会。周六傍晚，兽尔下起了雨，你独自在地铁里坐过站，手机只剩 1%。挑战已经在等你。', outroHookEn: 'Passed! Junho wrote his number on the first page of your notebook: "주말에 콘서트 갈래요?" (Want to go to a concert this weekend?) — but the next challenge isn\'t the concert. Saturday evening, it rains in Seoul, you miss your stop on the subway alone, and your phone is at 1%. A challenge is already waiting for you.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd06-b5-t1',
        audioKo: '중국에서 왔어요?',
        choices: [
          { text: '你想去中国吗？', textEn: 'Do you want to go to China?', correct: false },
          { text: '你从中国来吗？', textEn: 'Are you from China?', correct: true },
          { text: '你有中国朋友吗？', textEn: 'Do you have Chinese friends?', correct: false },
          { text: '你会中文吗？', textEn: 'Can you speak Chinese?', correct: false },
        ],
        explain: '중국에서(从中国) + 왔어요(来了) + 升调 = 疑问', explainEn: '중국에서 (from China) + 왔어요 (came) + rising tone = question',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd06-b5-t2',
        audioKo: '제가 좋아하는 그룹이에요.',
        choices: [
          { text: '这是我们班的组合。', textEn: 'This is our class\'s group.', correct: false },
          { text: '这是我喜欢的组合。', textEn: 'This is the group I like.', correct: true },
          { text: '这是有名的偶像。', textEn: 'This is a famous idol.', correct: false },
          { text: '这是新出道的团。', textEn: 'This is a newly debuted group.', correct: false },
        ],
        explain: '제가(我) + 좋아하는(喜欢的·定语) + 그룹이에요。좋아하다 + 는 = 定语形', explainEn: '제가 (I) + 좋아하는 (liked, modifier) + 그룹이에요. 좋아하다 + 는 = modifier form',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd06-b5-t3',
        promptZh: '"我喜欢 KPOP"哪句正确？', promptZhEn: 'Which sentence is correct for "I like KPOP"?',
        choices: [
          { text: '저는 KPOP를 좋아요.', correct: false },
          { text: '저는 KPOP이 좋아해요.', correct: false },
          { text: '저는 KPOP을 좋아해요.', correct: true },
          { text: '저는 KPOP는 좋아해요.', correct: false },
        ],
        explain: '좋아하다（动词） + 을/를。KPOP 尾音 P 视为有收音 → 을。「좋다」（形容词）才配 이/가', explainEn: '좋아하다 (verb) + 을/를. KPOP ends with P, treated as having a final consonant → 을. Only 좋다 (adjective) takes 이/가.',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd06-b5-t4',
        promptKo: '잘 부탁드려요',
        promptHangul: 'jal bu-tak-deu-ryeo-yo',
        choices: [
          { text: '请多关照', textEn: 'please take care of me', correct: true },
          { text: '真的很喜欢', textEn: 'Really like it a lot', correct: false },
          { text: '真的谢谢', textEn: 'Thanks a lot', correct: false },
          { text: '再见（请慢走）', textEn: 'Goodbye (take care)', correct: false },
        ],
        explain: '잘(好好地) + 부탁드려요(拜托您了) = 自我介绍收尾金句。比 부탁합니다 更柔和', explainEn: '잘 (well) + 부탁드려요 (please take care of me) = the perfect self-intro closer. Softer than 부탁합니다.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd06-b5-t5',
        zhHint: '你好，我是新生兔莉，请多关照。', zhHintEn: 'Hi, I\'m Tori, a new student. Please take care of me.',
        audioKo: '안녕하세요, 신입생 토리예요. 잘 부탁드려요.',
        answer: ['안녕하세요,', '신입생', '토리예요.', '잘', '부탁드려요.'],
        tokens: ['안녕하세요,', '신입생', '토리예요.', '잘', '부탁드려요.', '반장', '토리이에요.'],
        explain: '自我介绍套路：招呼 + 身份+名字+예요 + 잘 부탁드려요。토리 无收音 → 예요', explainEn: 'Self-intro formula: greeting + role + name + 예요 + 잘 부탁드려요. 토리 has no final consonant → 예요',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd06-b5-t6',
        zhHint: '我喜欢 KPOP。', zhHintEn: 'I like KPOP.',
        audioKo: '저는 KPOP을 좋아해요.',
        answer: ['저는', 'KPOP을', '좋아해요.'],
        tokens: ['저는', 'KPOP을', '좋아해요.', 'KPOP이', '좋아요.', 'KPOP를'],
        explain: '좋아하다 + 을/를。저는(主题) + KPOP을(宾语) + 좋아해요(动词)', explainEn: '좋아하다 + 을/를. 저는 (topic) + KPOP을 (object) + 좋아해요 (verb)',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd06-b5-t7',
        audioKo: 'KPOP 좋아해요?',
        promptZh: 'Junho 问喜不喜欢 KPOP，你偷偷喜欢很久了，应该？', promptZhEn: 'Junho asks if you like KPOP, and you\'ve secretly liked it for a while. What should you say?',
        choices: [
          { text: '아니요, 안 좋아해요.', correct: false },
          { text: '네, 정말 좋아해요.', correct: true },
          { text: 'KPOP은 뭐예요?', correct: false },
          { text: '괜찮아요.', correct: false },
        ],
        explain: '네 + 정말 좋아해요（真的很喜欢） = 大方承认。정말 是同好间破冰的关键词', explainEn: '네 + 정말 좋아해요 (really like it) = admit it openly. 정말 is the key word to break the ice between fans.',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd06-b5-t8',
        promptZh: 'Junho 掏出应援棒说"我喜欢的团有 4 个中国成员"，你想表达自己也是粉丝，应该？', promptZhEn: 'Junho pulls out a light stick and says, "My favorite group has 4 Chinese members." You want to express that you\'re also a fan. What should you say?',
        choices: [
          { text: '아니요, 저는 안 좋아해요.', correct: false },
          { text: '어? 저도 팬이에요!', correct: true },
          { text: '이름이 뭐예요?', correct: false },
          { text: '괜찮아요, 감사합니다.', correct: false },
        ],
        explain: '发现同好用 어? + 저도(我也) + 팬이에요。팬 有收音 ㄴ → 이에요', explainEn: 'Found a fellow fan! Use 어? + 저도 (me too) + 팬이에요. 팬 ends in a consonant (ㄴ), so it takes 이에요.',
      },
    },
  ],
};
