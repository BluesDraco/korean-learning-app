import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 5 · 1-5 Boss 战 · 走廊初见综合大考
 * 8 题混合：听句选意×2 + 助词改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 6：한빛语言学校第一天上课，班长是一只很凶的老虎 Junho
 */
export const day5Boss: BossSubQuestData = {
  day: 5, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '和第一位邻居完成一次完整的自我介绍', subtitleEn: 'Complete a full self-introduction with your first neighbor',
  intro: 'Haru 站在垃圾桶旁，粉色袜子还挂在竹竿上晃。她好像认识你，其实也没那么认识。这一次，主题助词 은/는 就是你自我介绍的第一根线。', introEn: 'Haru stands by the trash bin, pink socks still dangling from the bamboo pole. She seems to know you, but not really. This time, the topic particles 은/는 are the first thread of your self-introduction.',
  outroHook: '通过！Haru 拉着你冲进食堂，人生第一份韩国宿舍早饭：紫菜包饭+牛奶。下一关 —— 한빛教室第一堂课，班长是一只戴着黑框眼镜的老虎 Junho。挑战已经在等你。', outroHookEn: 'Passed! Haru pulls you into the cafeteria for your first Korean dorm breakfast: gimbap + milk. Next level — first class in 한빛 classroom, where the class president is a tiger named Junho wearing black-rimmed glasses. The challenge is already waiting for you.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd05-b5-t1',
        audioKo: '같이 아침 먹으러 갈래요?',
        choices: [
          { text: '一起去吃早饭吗？', textEn: 'Want to go eat breakfast together?', correct: true },
          { text: '你吃过早饭了吗？', textEn: 'Did you eat breakfast?', correct: false },
          { text: '早饭在哪吃？', textEn: 'Where do you eat breakfast?', correct: false },
          { text: '你喜欢吃早饭吗？', textEn: 'Do you like eating breakfast?', correct: false },
        ],
        explain: '같이(一起) + 아침 먹으러(为了吃早饭) + 갈래요(要去吗)。邀请标准句', explainEn: '같이 (together) + 아침 먹으러 (to eat breakfast) + 갈래요 (want to go?) — standard invitation pattern.',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd05-b5-t2',
        audioKo: '오늘은 날씨가 좋아요.',
        choices: [
          { text: '今天心情好。', textEn: 'I\'m in a good mood today.', correct: false },
          { text: '今天天气好。', textEn: 'The weather is nice today.', correct: true },
          { text: '今天很热。', textEn: 'It\'s hot today.', correct: false },
          { text: '天气一直很好。', textEn: 'The weather has been nice all along.', correct: false },
        ],
        explain: '오늘은(今天呢，主题) + 날씨가(天气，主语) + 좋아요。主题 은/는 + 主格 이/가 同句', explainEn: '오늘은 (today, topic) + 날씨가 (weather, subject) + 좋아요. Topic 은/는 + subject marker 이/가 in the same sentence.',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd05-b5-t3',
        promptZh: '"我叫兔莉"哪句正确？', promptZhEn: 'Which is correct for "My name is Tori"?',
        choices: [
          { text: '저은 토리예요.', correct: false },
          { text: '저는 토리예요.', correct: true },
          { text: '저가 토리예요.', correct: false },
          { text: '저를 토리예요.', correct: false },
        ],
        explain: '저 无收音 → 主题助词用 는。「저은」是新手最常犯的错——受"有收音用 은"规则误导', explainEn: '저 has no final consonant → topic particle is 는. "저은" is the most common beginner mistake — misled by the rule "use 은 after a final consonant."',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd05-b5-t4',
        promptKo: '몰라요',
        promptHangul: 'mol-la-yo',
        choices: [
          { text: '不知道', textEn: 'I don\'t know', correct: true },
          { text: '不是', textEn: 'No.', correct: false },
          { text: '不喜欢', textEn: 'Don\'t like it.', correct: false },
          { text: '不用了', textEn: 'No thanks.', correct: false },
        ],
        explain: '모르다(不知道) 的해요体。反义词是 알아요（知道）', explainEn: 'The 해요 form of 모르다 (don\'t know). The antonym is 알아요 (know)',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd05-b5-t5',
        zhHint: '我的朋友是中国人。', zhHintEn: 'My friend is Chinese.',
        audioKo: '제 친구는 중국 사람이에요.',
        answer: ['제', '친구는', '중국', '사람이에요.'],
        tokens: ['제', '친구는', '중국', '사람이에요.', '친구은', '사람예요.', '한국'],
        explain: '친구 无收音 → 는。사람 有收音 → 이에요。两处收音判断都要过', explainEn: '친구 has no final consonant → 는. 사람 has a final consonant → 이에요. Both final-consonant checks must pass.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd05-b5-t6',
        zhHint: '一起去吃早饭吗？', zhHintEn: 'Want to go eat breakfast together?',
        audioKo: '같이 아침 먹으러 갈래요?',
        answer: ['같이', '아침', '먹으러', '갈래요?'],
        tokens: ['같이', '아침', '먹으러', '갈래요?', '혼자', '저녁', '갈까요?'],
        explain: '~러 갈래요 = 邀请句式。같이 + 目的 + 먹으러/보러 + 갈래요', explainEn: '~러 갈래요 = invitation pattern. 같이 + purpose + 먹으러/보러 + 갈래요.',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd05-b5-t7',
        audioKo: '식당 어디 있는지 알아요?',
        promptZh: 'Haru 问你知不知道食堂在哪，你其实不知道，应该？', promptZhEn: 'Haru asks if you know where the cafeteria is, but you don\'t. What should you say?',
        choices: [
          { text: '네, 알아요. 혼자 갈게요.', correct: false },
          { text: '아니요, 몰라요. 같이 가요!', correct: true },
          { text: '식당은 없어요.', correct: false },
          { text: '식당이에요?', correct: false },
        ],
        explain: '不知道就 아니요 몰라요 + 「같이 가요」= 邻居间自然的搭伙。撒谎说 알아요 会露馅', explainEn: 'If you don\'t know, say 아니요 몰라요 + "같이 가요" — a natural way to team up with a neighbor. Lying and saying 알아요 will backfire.',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd05-b5-t8',
        promptZh: 'Haru 邀请一起吃早饭，你想开心答应，应该？', promptZhEn: 'Haru invites you to breakfast, and you want to happily accept. What should you say?',
        choices: [
          { text: '아니요, 몰라요.', correct: false },
          { text: '저는 학생이에요.', correct: false },
          { text: '네, 좋아요! 같이 가요.', correct: true },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '答应邀请的黄金句：네 + 좋아요 + 같이 가요。「좋아요」是"好啊/我愿意"的意思', explainEn: 'The golden phrase for accepting an invitation: 네 + 좋아요 + 같이 가요. "좋아요" means "sure / I\'d love to."',
      },
    },
  ],
};
