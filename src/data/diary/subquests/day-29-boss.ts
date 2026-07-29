import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 29 · 1-5 Boss 战 · 过去时综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：过去时 ~았/었어요 三规则 + 缩合 + ㅂ/ㄷ 不规则
 */
export const day29Boss: BossSubQuestData = {
  day: 29, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '把 28 天全部写成过去时',
  intro: '牛皮日记本翻开第一页。胡萝卜笔在纸上停了一下。窗外雨声很轻，屋里安静。你要把过去 28 天写下来——每一个动词都要换成过去时的模样。',
  outroHook: '通过！日记的最后一行"저는 용기를 냈어요"墨迹还没干。合上本子——明天，最后一天。30 天的故事画上句号。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd29-b5-t1',
        audioKo: '오늘은 비가 왔어요.',
        choices: [
          { text: '今天下雨了。', correct: true },
          { text: '今天不下雨。', correct: false },
          { text: '今天可能下雨。', correct: false },
          { text: '今天雪很大。', correct: false },
        ],
        explain: '오다 → 왔어요 · 天气过去',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd29-b5-t2',
        audioKo: '저는 용기를 냈어요.',
        choices: [
          { text: '我鼓起了勇气。', correct: true },
          { text: '我没有勇气。', correct: false },
          { text: '我想鼓起勇气。', correct: false },
          { text: '我一直有勇气。', correct: false },
        ],
        explain: '내다 → 냈어요 · 日记完美的收尾',
      },
    },
    {
      type: 'choice',
      label: '形态改错',
      task: {
        id: 'd29-b5-t3',
        promptZh: '"昨天去学校了"哪句正确？',
        choices: [
          { text: '어제 학교에 가았어요.', correct: false },
          { text: '어제 학교에 갔어요.', correct: true },
          { text: '어제 학교에 가어요.', correct: false },
          { text: '어제 학교에 가았아요.', correct: false },
        ],
        explain: '가+았 缩合 = 갔',
      },
    },
    {
      type: 'choice',
      label: '形态改错',
      task: {
        id: 'd29-b5-t4',
        promptZh: '"真的很开心（过去）"哪句正确？',
        choices: [
          { text: '정말 즐겁었어요.', correct: false },
          { text: '정말 즐거웠어요.', correct: true },
          { text: '정말 즐겁았어요.', correct: false },
          { text: '정말 즐거워요.', correct: false },
        ],
        explain: 'ㅂ 不规则 → 우 + 었 = 웠',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd29-b5-t5',
        promptKo: '어제',
        promptHangul: 'eo-je',
        choices: [
          { text: '昨天', correct: true },
          { text: '今天', correct: false },
          { text: '明天', correct: false },
          { text: '前天', correct: false },
        ],
        explain: '过去时最搭档的时间词',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd29-b5-t6',
        zhHint: '昨天下雨了。',
        audioKo: '어제 비가 왔어요.',
        answer: ['어제', '비가', '왔어요.'],
        tokens: ['어제', '비가', '왔어요.', '내일', '오았어요.', '와요.', '올게요.'],
        explain: '어제 + 오다 → 왔어요',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd29-b5-t7',
        zhHint: '我鼓起了勇气。',
        audioKo: '저는 용기를 냈어요.',
        answer: ['저는', '용기를', '냈어요.'],
        tokens: ['저는', '용기를', '냈어요.', '내요.', '낼게요.', '있어요.', '없어요.'],
        explain: '내다 → 냈어요 · 日记最后一句',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd29-b5-t8',
        promptZh: 'Minji 问「어제 삼겹살 어땠어?」（昨天五花肉怎么样？）你想说"真的很开心"，最标准的一句？',
        choices: [
          { text: '정말 즐거웠어요.', correct: true },
          { text: '정말 즐거워요.', correct: false },
          { text: '정말 즐거울 거예요.', correct: false },
          { text: '즐겁다.', correct: false },
        ],
        explain: '过去问 → 过去答 · ㅂ 不规则 즐거웠어요',
      },
    },
  ],
};
