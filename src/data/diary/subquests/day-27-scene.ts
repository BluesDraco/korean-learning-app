import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 27 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：烤肉店 4 人聚餐 · 请客文化 + 饭前饭后感谢 + 结账场景
 */
export const day27Scene: SceneSubQuestData = {
  day: 27, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '走完一次完整的韩式聚餐流程',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd27-sc-s1',
      scenario: 'Minji 抢先说「오늘 내가 한턱 낸다!」，你想争取自己请（因为你的考试成绩最好），最自然的一句？',
      choices: [
        { ko: '아니, 오늘 내가 낼게. 시험 끝난 기념으로.', zh: '不，今天我请。庆祝考完。', correct: true },
        { ko: '싫어. 배 안 고파.', zh: '不要。不饿。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '抢买单：内가 낼게 + 理由。반말 场合最自然',
    },
    {
      type: 'situation',
      id: 'd27-sc-s2',
      scenario: '菜刚上桌，热气冒上来，四人准备开动。最合适开始吃前的一句？',
      choices: [
        { ko: '잘 먹겠습니다!', zh: '我开动了！', correct: true },
        { ko: '잘 먹었습니다.', zh: '吃好了。', correct: false },
        { ko: '싫어요.', zh: '不要。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
      ],
      explain: '饭前用 겠（将要），饭后才用 었。搞反变笑话',
    },
    {
      type: 'situation',
      id: 'd27-sc-s3',
      scenario: 'Minji 结完账，你想感谢款待并约定下次自己请，最完整的一句？',
      choices: [
        { ko: '잘 먹었습니다. 다음엔 제가 살게요.', zh: '吃好了。下次我请。', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '싫어요.', zh: '不要。', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '被请客标准回礼：过去感谢（잘 먹었습니다）+ 未来承诺（다음엔 제가 살게요）',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd27-sc-d1',
      lines: [
        { speaker: 'Minji', ko: '오늘 내가 한턱 낸다!', zh: '今天我请客！' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '아니, 오늘 내가 낼게. 시험 끝난 기념으로.', zh: '不，今天我请。庆祝考完。', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
        { ko: '몰라.', zh: '不知道。', correct: false },
      ],
      explain: '朋友抢单 → 抢回来 + 理由 · 韩国请客文化第一层',
    },
    {
      type: 'dialogue',
      id: 'd27-sc-d2',
      lines: [
        { speaker: 'Minji', ko: '한국에서는 시험 끝나면 내가 사. 다음에 토리가 사.', zh: '在韩国考完试我请。下次你请。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '알았어. 다음엔 내가 꼭 살게!', zh: '好。下次我一定请！', correct: true },
        { ko: '지금 내가 내야 해.', zh: '现在必须我付。', correct: false },
        { ko: '싫어.', zh: '不要。', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '接受回礼约定：알았어 + 다음엔 내가 꼭 살게。꼭（一定）加强诚意',
    },
    {
      type: 'dialogue',
      id: 'd27-sc-d3',
      lines: [
        { speaker: '점원 곰', ko: '계산 도와드릴게요. 60,000원입니다.', zh: '我帮您结账。60000元。' },
      ],
      blankSpeaker: 'Minji',
      choices: [
        { ko: '카드로 결제할게요.', zh: '用卡结账。', correct: true },
        { ko: '싫어요.', zh: '不要。', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
      ],
      explain: '店员报金额 → 客户选支付方式。「카드로」= 用卡（工具助词 로）',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd27-sc-c1',
      ko: '한턱 낼게!',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '有喜事 / 升职 / 考完试 / 生日 · 主动向朋友宣布请客', correct: true },
        { zh: '收到别人的礼物', correct: false },
        { zh: '拒绝对方的邀请', correct: false },
        { zh: '第一次见客户', correct: false },
      ],
      explain: '한턱 是"庆祝性质"的请客。日常吃饭说「내가 살게」就好',
    },
    {
      type: 'context',
      id: 'd27-sc-c2',
      ko: '잘 먹었습니다.',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '吃完饭后向请客/做饭的人表达感谢', correct: true },
        { zh: '刚坐下要开动', correct: false },
        { zh: '朋友送礼时', correct: false },
        { zh: '第一次见面', correct: false },
      ],
      explain: '过去时 → 饭后。饭前是 잘 먹겠습니다',
    },
  ],
};
