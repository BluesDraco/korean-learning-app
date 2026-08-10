import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 25 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：兽尔江 3000 人演唱会 · 应援口号 + 朋友鼓励 + 场合语体切换
 */
export const day25Scene: SceneSubQuestData = {
  day: 25, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '3000 人里找到自己的声音',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd25-sc-s1',
      scenario: 'MC 在台上喊「다 같이! 사랑해!」，3000 人开始齐喊三连。你也要跟上，喊哪三句？',
      choices: [
        { ko: '사랑해! 응원해! 따라해!', zh: '我爱你！我支持你！跟着我！', correct: true },
        { ko: '안녕하세요! 감사합니다! 죄송해요!', zh: '你好！谢谢！对不起！', correct: false },
        { ko: '사랑해요! 응원해요! 따라해요!', zh: '(해요体在应援场合不搭)', correct: false },
        { ko: '오빠! 최고! 감사!', zh: '哥！最棒！谢谢！', correct: false },
      ],
      explain: '演唱会应援用반말（去 요）· 沉重庄严感在这里反而突兀',
    },
    {
      type: 'situation',
      id: 'd25-sc-s2',
      scenario: 'Minji 看你紧张不敢喊，鼓励你放开。你想接受鼓励，最有决心的一句？',
      choices: [
        { ko: '알았어. 외칠게!', zh: '好，我喊！', correct: true },
        { ko: '싫어.', zh: '不要。', correct: false },
        { ko: '몰라.', zh: '不知道。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
      ],
      explain: '알았어（回应鼓励）+ 외칠게（承诺行动）· 반말最强承诺',
    },
    {
      type: 'situation',
      id: 'd25-sc-s3',
      scenario: '毕业典礼上老师握着你的手说加油，你想真诚回应尊敬老师，最得体的一句？',
      choices: [
        { ko: '선생님, 정말 감사합니다. 열심히 하겠습니다.', zh: '老师，真的非常感谢。我会努力的。', correct: true },
        { ko: '선생님, 사랑해!', zh: '老师，爱你！', correct: false },
        { ko: '화이팅! 최고!', zh: '加油！最棒！', correct: false },
        { ko: '따라해!', zh: '跟着做！', correct: false },
      ],
      explain: '对老师用합쇼체 + 겠습니다承诺。演唱会那套반말用在这里会失礼',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd25-sc-d1',
      lines: [
        { speaker: 'Junho', ko: '토리, 응원봉 받아. 오늘 우리가 가르쳐 줄게.', zh: '兔莉，拿好应援棒。今天我们教你。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '고마워. 잘 부탁해.', zh: '谢了。拜托了。', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '싫어.', zh: '不要。', correct: false },
        { ko: '응원봉이 뭐야?', zh: '应援棒是什么？', correct: false },
      ],
      explain: '朋友帮忙 → 고마워 + 잘 부탁해（반말"拜托了"）',
    },
    {
      type: 'dialogue',
      id: 'd25-sc-d2',
      lines: [
        { speaker: 'Minji', ko: '토리, 그냥 외쳐! 부끄러워하지 마!', zh: '兔莉，就喊出来！别害羞！' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '알았어! 사랑해!', zh: '好！我爱你！', correct: true },
        { ko: '싫어. 부끄러워.', zh: '不要，好害羞。', correct: false },
        { ko: '외치가 뭐야?', zh: '喊是什么？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '接受鼓励 → 알았어 + 立刻加入应援。这是学员心境的自然反应',
    },
    {
      type: 'dialogue',
      id: 'd25-sc-d3',
      lines: [
        { speaker: 'MC', ko: '다 함께! 오빠 최고!', zh: '大家一起！哥最棒！' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '오빠 최고!', zh: '哥最棒！', correct: true },
        { ko: '언니 최고!', zh: '姐最棒！（错爱豆性别）', correct: false },
        { ko: '오빠 안녕!', zh: '哥你好！', correct: false },
        { ko: '오빠 얼마?', zh: '哥多少钱？', correct: false },
      ],
      explain: 'MC 教口号 → 跟着复读。此场景爱豆是男团 → 오빠',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd25-sc-c1',
      ko: '사랑해!',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '演唱会应援 / 情侣间 / 亲密朋友之间', correct: true },
        { zh: '第一次见客户', correct: false },
        { zh: '对老师表达尊敬', correct: false },
        { zh: '在银行说明来意', correct: false },
      ],
      explain: '반말 사랑해 用于亲密关系。对不熟的人/长辈用 사랑해요 / 사랑합니다',
    },
    {
      type: 'context',
      id: 'd25-sc-c2',
      ko: '화이팅!',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '任何鼓励场合，考试前 / 比赛 / 工作 / 生活加油', correct: true },
        { zh: '只用于打架前', correct: false },
        { zh: '只用于运动员', correct: false },
        { zh: '只用于书面语', correct: false },
      ],
      explain: '不分场合最万能的鼓励词。파이팅 也可以',
    },
  ],
};
