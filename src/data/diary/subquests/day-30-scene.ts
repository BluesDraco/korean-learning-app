import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 30 · 1-4 상황 속으로 · 情景关 · 毕业
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：월考 + 毕业感言 · 5 段自述实战 · 30 天回顾
 */
export const day30Scene: SceneSubQuestData = {
  day: 30, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在 305 教室，把 30 天说完',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd30-sc-s1',
      scenario: '试卷第 3 题：짐/집 辨析。你想到 Day 3 那个笑话。要选"行李好重"，正确写法？',
      choices: [
        { ko: '짐이 무거워요.', zh: '行李好重。', correct: true },
        { ko: '집이 무거워요.', zh: '家好重。', correct: false },
        { ko: '짐이 무겁어요.', zh: '(变位错误)', correct: false },
        { ko: '집이 무거워요요.', zh: '(结尾多余)', correct: false },
      ],
      explain: '짐 = 行李（收音 ㅁ）；집 = 家（收音 ㅂ）· 差一字母差整个意思',
    },
    {
      type: 'situation',
      id: 'd30-sc-s2',
      scenario: '毕业感言的开头 · 你想说"30 天前来到韩国"，最标准的一句？',
      choices: [
        { ko: '30일 전에 한국에 왔어요.', zh: '30 天前来到韩国。', correct: true },
        { ko: '30일 후에 한국에 왔어요.', zh: '(时间词矛盾)', correct: false },
        { ko: '30일 동안 한국에 가요.', zh: '(时态错)', correct: false },
        { ko: '30일 전에 한국에 가요.', zh: '(时态错)', correct: false },
      ],
      explain: '「N 전에」+ 过去时 · 逻辑一致',
    },
    {
      type: 'situation',
      id: 'd30-sc-s3',
      scenario: '毕业感言最后一句 · 你想感谢老师和朋友并承诺今后好好生活，最完整的一句？',
      choices: [
        { ko: '선생님, 친구들 진짜 감사합니다. 앞으로도 잘 살게요.', zh: '老师、朋友们真的感谢。今后也会好好生活。', correct: true },
        { ko: '안녕히 계세요.', zh: '再见。（太简单）', correct: false },
        { ko: '한국어 어려워요.', zh: '韩语好难。（负面）', correct: false },
        { ko: '만나서 반가워요.', zh: '(套话·语境错)', correct: false },
      ],
      explain: '感谢 + 承诺 · 毕业感言标准结尾 · 살게요 是 ㄹ 词干承诺',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd30-sc-d1',
      lines: [
        { speaker: '홍학 선생님', ko: '토리 학생, 합격. 중급반으로 올라가세요.', zh: 'Tori 同学，合格。升入中级班。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '정말요? 감사합니다!', zh: '真的吗？谢谢！', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '싫어요.', zh: '不要。', correct: false },
        { ko: '어제 왔어요.', zh: '昨天来了。', correct: false },
      ],
      explain: '正式宣布通过 → 정말요?（惊喜）+ 감사합니다（합쇼체感谢）',
    },
    {
      type: 'dialogue',
      id: 'd30-sc-d2',
      lines: [
        { speaker: '홍학 선생님', ko: '30일 동안 어땠어요?', zh: '30 天感觉怎么样？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '실수도 많았지만 정말 행복했어요.', zh: '虽然失误多但真的很幸福。', correct: true },
        { ko: '실수 없어요.', zh: '没失误。', correct: false },
        { ko: '싫었어요.', zh: '很讨厌。', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '过去问 → 过去答 · 지만 转折是"承认失误但仍幸福"的成熟表达',
    },
    {
      type: 'dialogue',
      id: 'd30-sc-d3',
      lines: [
        { speaker: '민지', ko: '중급반에서도 우리 계속 친구야?', zh: '中级班还是朋友吧？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '당연하지! 앞으로도 잘 부탁해.', zh: '当然！今后也请多关照。', correct: true },
        { ko: '몰라.', zh: '不知道。', correct: false },
        { ko: '아니.', zh: '不。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
      ],
      explain: '朋友确认关系 → 당연하지（那还用说）+ 앞으로도 잘 부탁해（반말关照）',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd30-sc-c1',
      ko: '실수도 많았지만 행복했어요.',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '回顾一段完成的经历（毕业感言 / 项目结束 / 年终总结）', correct: true },
        { zh: '正在犯错的当下', correct: false },
        { zh: '拒绝对方的邀请', correct: false },
        { zh: '第一次见面', correct: false },
      ],
      explain: 'V았지만 A았어요 = 过去+转折+过去 · 完整回顾的时态组合',
    },
    {
      type: 'context',
      id: 'd30-sc-c2',
      ko: '앞으로도 잘 살게요.',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '结束一段学习 / 告别老师 / 换新环境时的承诺', correct: true },
        { zh: '刚开始上课', correct: false },
        { zh: '不打算继续学下去', correct: false },
        { zh: '拒绝对方帮助', correct: false },
      ],
      explain: '앞으로도（今后也）+ 살게요（我会好好活）· 承诺"关系继续"的仪式感表达',
    },
  ],
};
