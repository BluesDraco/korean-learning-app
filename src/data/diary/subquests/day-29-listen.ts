import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 29 · 1-2 귀 트이기 · 听力子关卡
 * 素材：Day 29 主流程「独白·日记体」+ 补充过去时语料
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化过去时三规则（았/었/했）+ 缩合识别
 */
export const day29Listen: ListenSubQuestData = {
  day: 29, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '把日记里每一句过去时听出来',

  meaning: [
    {
      id: 'd29-l2-m1',
      audioKo: '오늘은 비가 왔어요.',
      choices: [
        { text: '今天下雨了。', correct: true },
        { text: '今天不下雨。', correct: false },
        { text: '今天可能下雨。', correct: false },
        { text: '今天雪很大。', correct: false },
      ],
      explain: '오다 → 왔어요（ㅗ+ㅏ=ㅘ+ㅆ어요）· 天气过去时',
    },
    {
      id: 'd29-l2-m2',
      audioKo: '어제 친구들이랑 삼겹살을 먹었어요.',
      choices: [
        { text: '昨天和朋友们吃了五花肉。', correct: true },
        { text: '明天和朋友要吃五花肉。', correct: false },
        { text: '现在在吃五花肉。', correct: false },
        { text: '朋友请吃五花肉。', correct: false },
      ],
      explain: '먹다 → 먹었어요（어 + 었어요）',
    },
    {
      id: 'd29-l2-m3',
      audioKo: '한국어 공부했어요.',
      choices: [
        { text: '学了韩语。', correct: true },
        { text: '在学韩语。', correct: false },
        { text: '要学韩语。', correct: false },
        { text: '想学韩语。', correct: false },
      ],
      explain: '공부하다 → 공부했어요（하다 → 했어요 规则3）',
    },
    {
      id: 'd29-l2-m4',
      audioKo: '정말 즐거웠어요.',
      choices: [
        { text: '真的很开心。', correct: true },
        { text: '真的很累。', correct: false },
        { text: '正在很开心。', correct: false },
        { text: '不太开心。', correct: false },
      ],
      explain: '즐겁다 ㅂ 不规则 → 즐거웠어요（우 + 었어요）',
    },
    {
      id: 'd29-l2-m5',
      audioKo: '저는 용기를 냈어요.',
      choices: [
        { text: '我鼓起了勇气。', correct: true },
        { text: '我没有勇气。', correct: false },
        { text: '我想鼓起勇气。', correct: false },
        { text: '我一直有勇气。', correct: false },
      ],
      explain: '내다 → 냈어요（내+었→냈 缩合）· 日记的最后一句',
    },
  ],

  cloze: [
    {
      id: 'd29-l2-c1',
      audioKo: '어제 학교에 갔어요.',
      clozeParts: ['어제 학교에 ', '.'],
      choices: [
        { text: '갔어요', correct: true },
        { text: '가았어요', correct: false },
        { text: '가어요', correct: false },
        { text: '갔아요', correct: false },
      ],
      explain: '가+았 缩合 = 갔（ㅏ+ㅏ=ㅏ+ㅆ）',
    },
    {
      id: 'd29-l2-c2',
      audioKo: '비가 왔어요.',
      clozeParts: ['비가 ', '.'],
      choices: [
        { text: '왔어요', correct: true },
        { text: '오았어요', correct: false },
        { text: '왔아요', correct: false },
        { text: '오었어요', correct: false },
      ],
      explain: '오+았 缩合 = 왔（ㅗ+ㅏ=ㅘ+ㅆ）',
    },
    {
      id: 'd29-l2-c3',
      audioKo: '한국어 공부했어요.',
      clozeParts: ['한국어 공부', '.'],
      choices: [
        { text: '했어요', correct: true },
        { text: '하았어요', correct: false },
        { text: '하었어요', correct: false },
        { text: '하여요', correct: false },
      ],
      explain: '하다 → 하+였 缩合 = 했（하다类无条件）',
    },
    {
      id: 'd29-l2-c4',
      audioKo: '정말 즐거웠어요.',
      clozeParts: ['정말 ', '.'],
      choices: [
        { text: '즐거웠어요', correct: true },
        { text: '즐겁었어요', correct: false },
        { text: '즐겁았어요', correct: false },
        { text: '즐거워요', correct: false },
      ],
      explain: 'ㅂ 不规则过去：ㅂ→우 + 었 = 우었 缩合 = 웠',
    },
  ],

  reply: [
    {
      id: 'd29-l2-r1',
      audioKo: '어제 뭐 했어요?',
      promptZh: '朋友问你昨天做什么，你想说"和朋友吃了五花肉"，最标准的一句？',
      choices: [
        { text: '친구들이랑 삼겹살을 먹었어요.', correct: true },
        { text: '친구들이랑 삼겹살을 먹어요.', correct: false },
        { text: '친구들이랑 삼겹살을 먹을게요.', correct: false },
        { text: '삼겹살이 뭐예요?', correct: false },
      ],
      explain: '被问过去 → 답도 过去时（먹었어요）',
    },
    {
      id: 'd29-l2-r2',
      audioKo: '한국 생활 어땠어요?',
      promptZh: '朋友问你在韩国的生活怎么样，你想回顾"真的很开心"，最标准的一句？',
      choices: [
        { text: '정말 즐거웠어요.', correct: true },
        { text: '정말 즐거워요.', correct: false },
        { text: '정말 즐거울 거예요.', correct: false },
        { text: '즐겁다.', correct: false },
      ],
      explain: '어땠어요? 是过去问 → 답도 用过去时（즐거웠어요）',
    },
    {
      id: 'd29-l2-r3',
      audioKo: '28일 동안 뭐가 제일 기억에 남아요?',
      promptZh: '朋友问 28 天最印象深的是什么，你想说"我鼓起了勇气"，最有分量的一句？',
      choices: [
        { text: '저는 용기를 냈어요.', correct: true },
        { text: '저는 용기를 내요.', correct: false },
        { text: '저는 용기가 없어요.', correct: false },
        { text: '저는 용기를 낼게요.', correct: false },
      ],
      explain: '回顾 28 天完成的事 → 过去时（냈어요 = 已经鼓起）',
    },
  ],
};
