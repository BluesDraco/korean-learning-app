import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 29 · 1-5 Boss 战 · 过去时综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：过去时 ~았/었어요 三规则 + 缩合 + ㅂ/ㄷ 不规则
 */
export const day29Boss: BossSubQuestData = {
  day: 29, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '把 28 天全部写成过去时', subtitleEn: 'Write all 28 days in past tense.',
  intro: '牛皮日记本翻开第一页。胡萝卜笔在纸上停了一下。窗外雨声很轻，屋里安静。你要把过去 28 天写下来——每一个动词都要换成过去时的模样。', introEn: 'The leather diary opens to the first page. The carrot pen pauses on the paper. Rain taps softly outside; the room is quiet. You need to write down the past 28 days—every verb must take its past tense form.',
  outroHook: '通过！日记的最后一行"저는 용기를 냈어요"墨迹还没干。合上本子——明天，最后一天。30 天的故事画上句号。', outroHookEn: 'Passed! The ink on the diary\'s last line, \'저는 용기를 냈어요\', is still wet. Close the notebook—tomorrow, the final day. The 30-day story comes to a close.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd29-b5-t1',
        audioKo: '오늘은 비가 왔어요.',
        choices: [
          { text: '今天下雨了。', textEn: 'It rained today.', correct: true },
          { text: '今天不下雨。', textEn: 'It\'s not raining today.', correct: false },
          { text: '今天可能下雨。', textEn: 'It might rain today.', correct: false },
          { text: '今天雪很大。', textEn: 'It snowed a lot today.', correct: false },
        ],
        explain: '오다 → 왔어요 · 天气过去', explainEn: '오다 → 왔어요 · Weather in the past',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd29-b5-t2',
        audioKo: '저는 용기를 냈어요.',
        choices: [
          { text: '我鼓起了勇气。', textEn: 'I gathered my courage.', correct: true },
          { text: '我没有勇气。', textEn: 'I don\'t have courage.', correct: false },
          { text: '我想鼓起勇气。', textEn: 'I want to muster up courage.', correct: false },
          { text: '我一直有勇气。', textEn: 'I\'ve always had courage.', correct: false },
        ],
        explain: '내다 → 냈어요 · 日记完美的收尾', explainEn: '내다 → 냈어요 · Perfect ending for a diary',
      },
    },
    {
      type: 'choice',
      label: '形态改错', labelEn: 'Fix the form',
      task: {
        id: 'd29-b5-t3',
        promptZh: '"昨天去学校了"哪句正确？', promptZhEn: 'Which is correct for "I went to school yesterday"?',
        choices: [
          { text: '어제 학교에 가았어요.', correct: false },
          { text: '어제 학교에 갔어요.', correct: true },
          { text: '어제 학교에 가어요.', correct: false },
          { text: '어제 학교에 가았아요.', correct: false },
        ],
        explain: '가+았 缩合 = 갔', explainEn: '가+았 contraction = 갔',
      },
    },
    {
      type: 'choice',
      label: '形态改错', labelEn: 'Fix the form',
      task: {
        id: 'd29-b5-t4',
        promptZh: '"真的很开心（过去）"哪句正确？', promptZhEn: 'Which is correct for "I was really happy" (past)?',
        choices: [
          { text: '정말 즐겁었어요.', correct: false },
          { text: '정말 즐거웠어요.', correct: true },
          { text: '정말 즐겁았어요.', correct: false },
          { text: '정말 즐거워요.', correct: false },
        ],
        explain: 'ㅂ 不规则 → 우 + 었 = 웠', explainEn: 'ㅂ irregular → 우 + 었 = 웠',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd29-b5-t5',
        promptKo: '어제',
        promptHangul: 'eo-je',
        choices: [
          { text: '昨天', textEn: 'yesterday', correct: true },
          { text: '今天', textEn: 'today', correct: false },
          { text: '明天', textEn: 'Tomorrow', correct: false },
          { text: '前天', textEn: 'the day before yesterday', correct: false },
        ],
        explain: '过去时最搭档的时间词', explainEn: 'Time words that pair best with the past tense',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd29-b5-t6',
        zhHint: '昨天下雨了。', zhHintEn: 'It rained yesterday.',
        audioKo: '어제 비가 왔어요.',
        answer: ['어제', '비가', '왔어요.'],
        tokens: ['어제', '비가', '왔어요.', '내일', '오았어요.', '와요.', '올게요.'],
        explain: '어제 + 오다 → 왔어요',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd29-b5-t7',
        zhHint: '我鼓起了勇气。', zhHintEn: 'I gathered my courage.',
        audioKo: '저는 용기를 냈어요.',
        answer: ['저는', '용기를', '냈어요.'],
        tokens: ['저는', '용기를', '냈어요.', '내요.', '낼게요.', '있어요.', '없어요.'],
        explain: '내다 → 냈어요 · 日记最后一句', explainEn: '내다 → 냈어요 · Last line of the diary',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd29-b5-t8',
        promptZh: 'Minji 问「어제 삼겹살 어땠어?」（昨天五花肉怎么样？）你想说"真的很开心"，最标准的一句？', promptZhEn: 'Minji asks, "어제 삼겹살 어땠어?" (How was the pork belly yesterday?) You want to say "I was really happy." Which is the most standard?',
        choices: [
          { text: '정말 즐거웠어요.', correct: true },
          { text: '정말 즐거워요.', correct: false },
          { text: '정말 즐거울 거예요.', correct: false },
          { text: '즐겁다.', correct: false },
        ],
        explain: '过去问 → 过去答 · ㅂ 不规则 즐거웠어요', explainEn: 'Past question → past answer · ㅂ irregular 즐거웠어요',
      },
    },
  ],
};
