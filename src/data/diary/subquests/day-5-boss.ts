import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 5 · 1-5 Boss 战 · 走廊初见综合大考
 * 8 题混合：听句选意×2 + 助词改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 6：한빛语言学校第一天上课，班长是一只很凶的老虎 Junho
 */
export const day5Boss: BossSubQuestData = {
  day: 5, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '和第一位邻居完成一次完整的自我介绍',
  intro: 'Haru 站在垃圾桶旁，粉色袜子还挂在竹竿上晃。她好像认识你，其实也没那么认识。这一次，主题助词 은/는 就是你自我介绍的第一根线。',
  outroHook: '通过！Haru 拉着你冲进食堂，人生第一份韩国宿舍早饭：紫菜包饭+牛奶。下一关 —— 한빛教室第一堂课，班长是一只戴着黑框眼镜的老虎 Junho。挑战已经在等你。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd05-b5-t1',
        audioKo: '같이 아침 먹으러 갈래요?',
        choices: [
          { text: '一起去吃早饭吗？', correct: true },
          { text: '你吃过早饭了吗？', correct: false },
          { text: '早饭在哪吃？', correct: false },
          { text: '你喜欢吃早饭吗？', correct: false },
        ],
        explain: '같이(一起) + 아침 먹으러(为了吃早饭) + 갈래요(要去吗)。邀请标准句',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd05-b5-t2',
        audioKo: '오늘은 날씨가 좋아요.',
        choices: [
          { text: '今天心情好。', correct: false },
          { text: '今天天气好。', correct: true },
          { text: '今天很热。', correct: false },
          { text: '天气一直很好。', correct: false },
        ],
        explain: '오늘은(今天呢，主题) + 날씨가(天气，主语) + 좋아요。主题 은/는 + 主格 이/가 同句',
      },
    },
    {
      type: 'choice',
      label: '助词改错',
      task: {
        id: 'd05-b5-t3',
        promptZh: '"我叫兔莉"哪句正确？',
        choices: [
          { text: '저은 토리예요.', correct: false },
          { text: '저는 토리예요.', correct: true },
          { text: '저가 토리예요.', correct: false },
          { text: '저를 토리예요.', correct: false },
        ],
        explain: '저 无收音 → 主题助词用 는。「저은」是新手最常犯的错——受"有收音用 은"规则误导',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd05-b5-t4',
        promptKo: '몰라요',
        promptHangul: 'mol-la-yo',
        choices: [
          { text: '不知道', correct: true },
          { text: '不是', correct: false },
          { text: '不喜欢', correct: false },
          { text: '不用了', correct: false },
        ],
        explain: '모르다(不知道) 的해요体。反义词是 알아요（知道）',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd05-b5-t5',
        zhHint: '我的朋友是中国人。',
        audioKo: '제 친구는 중국 사람이에요.',
        answer: ['제', '친구는', '중국', '사람이에요.'],
        tokens: ['제', '친구는', '중국', '사람이에요.', '친구은', '사람예요.', '한국'],
        explain: '친구 无收音 → 는。사람 有收音 → 이에요。两处收音判断都要过',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd05-b5-t6',
        zhHint: '一起去吃早饭吗？',
        audioKo: '같이 아침 먹으러 갈래요?',
        answer: ['같이', '아침', '먹으러', '갈래요?'],
        tokens: ['같이', '아침', '먹으러', '갈래요?', '혼자', '저녁', '갈까요?'],
        explain: '~러 갈래요 = 邀请句式。같이 + 目的 + 먹으러/보러 + 갈래요',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd05-b5-t7',
        audioKo: '식당 어디 있는지 알아요?',
        promptZh: 'Haru 问你知不知道食堂在哪，你其实不知道，应该？',
        choices: [
          { text: '네, 알아요. 혼자 갈게요.', correct: false },
          { text: '아니요, 몰라요. 같이 가요!', correct: true },
          { text: '식당은 없어요.', correct: false },
          { text: '식당이에요?', correct: false },
        ],
        explain: '不知道就 아니요 몰라요 + 「같이 가요」= 邻居间自然的搭伙。撒谎说 알아요 会露馅',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd05-b5-t8',
        promptZh: 'Haru 邀请一起吃早饭，你想开心答应，应该？',
        choices: [
          { text: '아니요, 몰라요.', correct: false },
          { text: '저는 학생이에요.', correct: false },
          { text: '네, 좋아요! 같이 가요.', correct: true },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '答应邀请的黄金句：네 + 좋아요 + 같이 가요。「좋아요」是"好啊/我愿意"的意思',
      },
    },
  ],
};
