import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 27 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：烤肉店 4 人聚餐 · 请客文化 + 饭前饭后感谢 + 结账场景
 */
export const day27Scene: SceneSubQuestData = {
  day: 27, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '走完一次完整的韩式聚餐流程', subtitleEn: 'Complete a full Korean group meal flow',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd27-sc-s1',
      scenario: 'Minji 抢先说「오늘 내가 한턱 낸다!」，你想争取自己请（因为你的考试成绩最好），最自然的一句？', scenarioEn: 'Minji jumps in with \'오늘 내가 한턱 낸다!\', you want to insist on paying (because you got the best exam score). What\'s the most natural thing to say?',
      choices: [
        { ko: '아니, 오늘 내가 낼게. 시험 끝난 기념으로.', zh: '不，今天我请。庆祝考完。', zhEn: 'No, I\'m paying today. To celebrate finishing the exam.', correct: true },
        { ko: '싫어. 배 안 고파.', zh: '不要。不饿。', zhEn: 'No. Not hungry.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '抢买单：内가 낼게 + 理由。반말 场合最自然', explainEn: 'Grabbing the bill: 내가 낼게 + reason. Most natural in informal settings',
    },
    {
      type: 'situation',
      id: 'd27-sc-s2',
      scenario: '菜刚上桌，热气冒上来，四人准备开动。最合适开始吃前的一句？', scenarioEn: 'The food just arrived, steam rising, four people about to dig in. What\'s the most appropriate thing to say before eating?',
      choices: [
        { ko: '잘 먹겠습니다!', zh: '我开动了！', zhEn: 'I\'m digging in!', correct: true },
        { ko: '잘 먹었습니다.', zh: '吃好了。', zhEn: 'I ate well.', correct: false },
        { ko: '싫어요.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
      ],
      explain: '饭前用 겠（将要），饭后才用 었。搞反变笑话', explainEn: 'Use 겠 (will) before meals, 었 after. Getting it backwards is a joke',
    },
    {
      type: 'situation',
      id: 'd27-sc-s3',
      scenario: 'Minji 结完账，你想感谢款待并约定下次自己请，最完整的一句？', scenarioEn: 'Minji finishes paying. You want to thank her for the meal and promise to treat next time. What\'s the most complete thing to say?',
      choices: [
        { ko: '잘 먹었습니다. 다음엔 제가 살게요.', zh: '吃好了。下次我请。', zhEn: 'I\'m full. Next time, I\'ll treat.', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '싫어요.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '被请客标准回礼：过去感谢（잘 먹었습니다）+ 未来承诺（다음엔 제가 살게요）', explainEn: 'Standard response to being treated: past thanks (잘 먹었습니다) + future promise (다음엔 제가 살게요)',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd27-sc-d1',
      lines: [
        { speaker: 'Minji', ko: '오늘 내가 한턱 낸다!', zh: '今天我请客！', zhEn: 'I\'m treating today!' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '아니, 오늘 내가 낼게. 시험 끝난 기념으로.', zh: '不，今天我请。庆祝考完。', zhEn: 'No, I\'m paying today. To celebrate finishing the exam.', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '몰라.', zh: '不知道。', zhEn: 'I don\'t know.', correct: false },
      ],
      explain: '朋友抢单 → 抢回来 + 理由 · 韩国请客文化第一层', explainEn: 'Friend grabs the bill → grab it back + reason · first layer of Korean treating culture',
    },
    {
      type: 'dialogue',
      id: 'd27-sc-d2',
      lines: [
        { speaker: 'Minji', ko: '한국에서는 시험 끝나면 내가 사. 다음에 토리가 사.', zh: '在韩国考完试我请。下次你请。', zhEn: 'I\'ll treat after the exam in Korea. You treat next time.' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '알았어. 다음엔 내가 꼭 살게!', zh: '好。下次我一定请！', zhEn: 'Okay. Next time, I\'ll definitely treat you!', correct: true },
        { ko: '지금 내가 내야 해.', zh: '现在必须我付。', zhEn: 'Now I have to pay.', correct: false },
        { ko: '싫어.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '接受回礼约定：알았어 + 다음엔 내가 꼭 살게。꼭（一定）加强诚意', explainEn: 'Accepting the return treat: 알았어 + 다음엔 내가 꼭 살게. 꼭 (definitely) strengthens sincerity.',
    },
    {
      type: 'dialogue',
      id: 'd27-sc-d3',
      lines: [
        { speaker: '점원 곰', ko: '계산 도와드릴게요. 60,000원입니다.', zh: '我帮您结账。60000元。', zhEn: 'I\'ll take care of the bill. It\'s 60,000 won.' },
      ],
      blankSpeaker: 'Minji',
      choices: [
        { ko: '카드로 결제할게요.', zh: '用卡结账。', zhEn: 'Pay by card.', correct: true },
        { ko: '싫어요.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
      ],
      explain: '店员报金额 → 客户选支付方式。「카드로」= 用卡（工具助词 로）', explainEn: 'Cashier states amount → customer chooses payment method. 카드로 = with card (tool particle 로).',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd27-sc-c1',
      ko: '한턱 낼게!',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '有喜事 / 升职 / 考完试 / 生日 · 主动向朋友宣布请客', zhEn: 'Good news / promotion / after exams / birthday · proactively announce treating friends.', correct: true },
        { zh: '收到别人的礼物', zhEn: 'Receiving a gift from someone.', correct: false },
        { zh: '拒绝对方的邀请', zhEn: 'Declining someone\'s invitation.', correct: false },
        { zh: '第一次见客户', zhEn: 'Meeting a client for the first time', correct: false },
      ],
      explain: '한턱 是"庆祝性质"的请客。日常吃饭说「내가 살게」就好', explainEn: '한턱 is a "celebration-style" treat. For everyday meals, just say 내가 살게.',
    },
    {
      type: 'context',
      id: 'd27-sc-c2',
      ko: '잘 먹었습니다.',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '吃完饭后向请客/做饭的人表达感谢', zhEn: 'Expressing thanks to the host/cook after a meal.', correct: true },
        { zh: '刚坐下要开动', zhEn: 'Just sat down to start eating.', correct: false },
        { zh: '朋友送礼时', zhEn: 'When a friend gives a gift.', correct: false },
        { zh: '第一次见面', zhEn: 'First meeting.', correct: false },
      ],
      explain: '过去时 → 饭后。饭前是 잘 먹겠습니다', explainEn: 'Past tense → after the meal. Before the meal, it\'s 잘 먹겠습니다.',
    },
  ],
};
