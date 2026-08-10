import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 25 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：兽尔江 3000 人演唱会 · 应援口号 + 朋友鼓励 + 场合语体切换
 */
export const day25Scene: SceneSubQuestData = {
  day: 25, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '3000 人里找到自己的声音', subtitleEn: 'Find your voice among 3,000 people.',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd25-sc-s1',
      scenario: 'MC 在台上喊「다 같이! 사랑해!」，3000 人开始齐喊三连。你也要跟上，喊哪三句？', scenarioEn: 'The MC shouts "다 같이! 사랑해!" on stage, and 3,000 people start the three-part chant. You need to join in—what three phrases do you shout?',
      choices: [
        { ko: '사랑해! 응원해! 따라해!', zh: '我爱你！我支持你！跟着我！', zhEn: 'I love you! I support you! Follow me!', correct: true },
        { ko: '안녕하세요! 감사합니다! 죄송해요!', zh: '你好！谢谢！对不起！', zhEn: 'Hello! Thank you! Sorry!', correct: false },
        { ko: '사랑해요! 응원해요! 따라해요!', zh: '(해요体在应援场合不搭)', zhEn: '(해요체 doesn\'t fit in cheer settings.)', correct: false },
        { ko: '오빠! 최고! 감사!', zh: '哥！最棒！谢谢！', zhEn: 'Bro! You\'re the best! Thanks!', correct: false },
      ],
      explain: '演唱会应援用반말（去 요）· 沉重庄严感在这里反而突兀', explainEn: 'Concert cheers use casual speech (drop 요). A heavy, solemn tone feels out of place here.',
    },
    {
      type: 'situation',
      id: 'd25-sc-s2',
      scenario: 'Minji 看你紧张不敢喊，鼓励你放开。你想接受鼓励，最有决心的一句？', scenarioEn: 'Minji sees you\'re nervous and not shouting, and encourages you to let loose. You want to accept the encouragement. What\'s the most determined line?',
      choices: [
        { ko: '알았어. 외칠게!', zh: '好，我喊！', zhEn: 'Okay, I\'ll shout!', correct: true },
        { ko: '싫어.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '몰라.', zh: '不知道。', zhEn: 'I don\'t know.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
      ],
      explain: '알았어（回应鼓励）+ 외칠게（承诺行动）· 반말最强承诺', explainEn: '알았어 (responding to encouragement) + 외칠게 (promising action). The strongest casual promise.',
    },
    {
      type: 'situation',
      id: 'd25-sc-s3',
      scenario: '毕业典礼上老师握着你的手说加油，你想真诚回应尊敬老师，最得体的一句？', scenarioEn: 'At graduation, your teacher holds your hand and says cheer up. You want to respond sincerely and respectfully. What\'s the most appropriate line?',
      choices: [
        { ko: '선생님, 정말 감사합니다. 열심히 하겠습니다.', zh: '老师，真的非常感谢。我会努力的。', zhEn: 'Teacher, thank you so much. I\'ll do my best.', correct: true },
        { ko: '선생님, 사랑해!', zh: '老师，爱你！', zhEn: 'Teacher, I love you!', correct: false },
        { ko: '화이팅! 최고!', zh: '加油！最棒！', zhEn: 'Cheer up! You\'re the best!', correct: false },
        { ko: '따라해!', zh: '跟着做！', zhEn: 'Follow along!', correct: false },
      ],
      explain: '对老师用합쇼체 + 겠습니다承诺。演唱会那套반말用在这里会失礼', explainEn: 'Use 합쇼체 + 겠습니다 with teachers. The casual concert style would be rude here.',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd25-sc-d1',
      lines: [
        { speaker: 'Junho', ko: '토리, 응원봉 받아. 오늘 우리가 가르쳐 줄게.', zh: '兔莉，拿好应援棒。今天我们教你。', zhEn: 'Tori, hold your light stick tight. Today we\'ll teach you.' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '고마워. 잘 부탁해.', zh: '谢了。拜托了。', zhEn: 'Thanks. Please take care of me.', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '싫어.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '응원봉이 뭐야?', zh: '应援棒是什么？', zhEn: 'What is a light stick?', correct: false },
      ],
      explain: '朋友帮忙 → 고마워 + 잘 부탁해（반말"拜托了"）', explainEn: 'Friend helping → 고마워 + 잘 부탁해 (casual "take care of me")',
    },
    {
      type: 'dialogue',
      id: 'd25-sc-d2',
      lines: [
        { speaker: 'Minji', ko: '토리, 그냥 외쳐! 부끄러워하지 마!', zh: '兔莉，就喊出来！别害羞！', zhEn: 'Tori, just shout it out! Don\'t be shy!' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '알았어! 사랑해!', zh: '好！我爱你！', zhEn: 'Okay! I love you!', correct: true },
        { ko: '싫어. 부끄러워.', zh: '不要，好害羞。', zhEn: 'No, I\'m too shy.', correct: false },
        { ko: '외치가 뭐야?', zh: '喊是什么？', zhEn: 'What is a chant?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '接受鼓励 → 알았어 + 立刻加入应援。这是学员心境的自然反应', explainEn: 'Accepting encouragement → 알았어 + immediately join the cheering. This is a natural reaction for a learner.',
    },
    {
      type: 'dialogue',
      id: 'd25-sc-d3',
      lines: [
        { speaker: 'MC', ko: '다 함께! 오빠 최고!', zh: '大家一起！哥最棒！', zhEn: 'Everyone together! You\'re the best, oppa!' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '오빠 최고!', zh: '哥最棒！', zhEn: 'You\'re the best, oppa!', correct: true },
        { ko: '언니 최고!', zh: '姐最棒！（错爱豆性别）', zhEn: 'You\'re the best, noona! (Wrong idol\'s gender)', correct: false },
        { ko: '오빠 안녕!', zh: '哥你好！', zhEn: 'Hello, oppa!', correct: false },
        { ko: '오빠 얼마?', zh: '哥多少钱？', zhEn: 'How much is oppa?', correct: false },
      ],
      explain: 'MC 教口号 → 跟着复读。此场景爱豆是男团 → 오빠', explainEn: 'MC teaches the chant → repeat after. In this scene, the idol is a boy group → 오빠',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd25-sc-c1',
      ko: '사랑해!',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '演唱会应援 / 情侣间 / 亲密朋友之间', zhEn: 'Concert cheering / between couples / close friends', correct: true },
        { zh: '第一次见客户', zhEn: 'Meeting a client for the first time', correct: false },
        { zh: '对老师表达尊敬', zhEn: 'Showing respect to a teacher', correct: false },
        { zh: '在银行说明来意', zhEn: 'Stating your purpose at a bank', correct: false },
      ],
      explain: '반말 사랑해 用于亲密关系。对不熟的人/长辈用 사랑해요 / 사랑합니다', explainEn: 'Casual 사랑해 is for close relationships. Use 사랑해요 / 사랑합니다 for strangers or elders.',
    },
    {
      type: 'context',
      id: 'd25-sc-c2',
      ko: '화이팅!',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '任何鼓励场合，考试前 / 比赛 / 工作 / 生活加油', zhEn: 'Any encouraging situation — before exams / competitions / work / life', correct: true },
        { zh: '只用于打架前', zhEn: 'Only used before a fight', correct: false },
        { zh: '只用于运动员', zhEn: 'Only used for athletes', correct: false },
        { zh: '只用于书面语', zhEn: 'Only used in writing', correct: false },
      ],
      explain: '不分场合最万能的鼓励词。파이팅 也可以', explainEn: 'The most versatile encouragement word for any situation. 파이팅 also works.',
    },
  ],
};
