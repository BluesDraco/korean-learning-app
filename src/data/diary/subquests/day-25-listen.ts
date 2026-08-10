import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 25 · 1-2 귀 트이기 · 听力子关卡
 * 素材：Day 25 主流程「兽尔江·3000人演唱会」+ 补充应援语料
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 하다→해 반말变位 + V지 마 禁止
 */
export const day25Listen: ListenSubQuestData = {
  day: 25, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在 3000 人的声浪里，听清每一声应援', subtitleEn: 'Amid the roar of 3,000 people, hear every single cheer.',

  meaning: [
    {
      id: 'd25-l2-m1',
      audioKo: '오늘 우리가 가르쳐 줄게.',
      choices: [
        { text: '今天我们教你。', textEn: 'Today we\'ll teach you.', correct: true },
        { text: '今天我们要走了。', textEn: 'We\'re leaving today.', correct: false },
        { text: '今天我们上课。', textEn: 'We have class today.', correct: false },
        { text: '今天你教我们。', textEn: 'You\'re teaching us today.', correct: false },
      ],
      explain: '가르치다(教) + 어 주다(为你做) + ㄹ게(承诺) = 我承诺教你', explainEn: '가르치다 (to teach) + 어 주다 (do for you) + ㄹ게 (promise) = I promise to teach you.',
    },
    {
      id: 'd25-l2-m2',
      audioKo: '세 마디만 따라 해.',
      choices: [
        { text: '跟着喊三句就行。', textEn: 'Just follow and shout three phrases.', correct: true },
        { text: '三句都别喊。', textEn: 'Don\'t shout any of the three phrases.', correct: false },
        { text: '别跟着喊。', textEn: 'Don\'t follow along and shout.', correct: false },
        { text: '换三句喊。', textEn: 'Shout three different phrases instead.', correct: false },
      ],
      explain: '세 마디（三句）+ 만（只）+ 따라 해（跟着做·반말）', explainEn: '세 마디 (three phrases) + 만 (only) + 따라 해 (follow along, casual)',
    },
    {
      id: 'd25-l2-m3',
      audioKo: '그냥 외쳐! 부끄러워하지 마!',
      choices: [
        { text: '就喊出来！别害羞！', textEn: 'Just shout it out! Don\'t be shy!', correct: true },
        { text: '安静点！别喊！', textEn: 'Quiet down! Don\'t shout!', correct: false },
        { text: '想喊就喊。', textEn: 'Shout if you want to.', correct: false },
        { text: '别哭！', textEn: 'Don\'t cry!', correct: false },
      ],
      explain: '그냥(就是/直接) + 외쳐 + V지 마(반말禁止)', explainEn: '그냥 (just/directly) + 외쳐 (shout) + V지 마 (don\'t, casual negative)',
    },
    {
      id: 'd25-l2-m4',
      audioKo: '오빠 최고!',
      choices: [
        { text: '哥哥最棒！', textEn: 'You\'re the best, oppa!', correct: true },
        { text: '哥哥来了！', textEn: 'Oppa is here!', correct: false },
        { text: '哥哥太远。', textEn: 'Oppa is too far away.', correct: false },
        { text: '哥哥不行。', textEn: 'Oppa can\'t do it.', correct: false },
      ],
      explain: '최고 是感叹称赞。粉丝对爱豆最常喊之一', explainEn: '최고 is an exclamation of praise. One of the most common things fans shout to their idols.',
    },
    {
      id: 'd25-l2-m5',
      audioKo: '다 함께 노래해요!',
      choices: [
        { text: '大家一起唱歌！', textEn: 'Everyone, sing together!', correct: true },
        { text: '大家一起听歌。', textEn: 'Everyone, listen to the song together.', correct: false },
        { text: '大家一起走。', textEn: 'Everyone, let\'s go together.', correct: false },
        { text: '大家不唱了。', textEn: 'Everyone stopped singing.', correct: false },
      ],
      explain: '다(全部) + 함께(一起) + 노래해요。MC 常喊的口号', explainEn: 'All together + sing along. A common chant by the MC.',
    },
  ],

  cloze: [
    {
      id: 'd25-l2-c1',
      audioKo: '사랑해!',
      clozeParts: ['사랑', '!'],
      choices: [
        { text: '해', correct: true },
        { text: '해요', correct: false },
        { text: '했다', correct: false },
        { text: '하다', correct: false },
      ],
      explain: '하다 → 해（반말）。演唱会喊口号用반말', explainEn: '하다 → 해 (casual). Concert chants use casual speech.',
    },
    {
      id: 'd25-l2-c2',
      audioKo: '응원해!',
      clozeParts: ['응원', '!'],
      choices: [
        { text: '해', correct: true },
        { text: '해요', correct: false },
        { text: '했다', correct: false },
        { text: '하니?', correct: false },
      ],
      explain: '응원하다 → 응원해（반말）',
    },
    {
      id: 'd25-l2-c3',
      audioKo: '부끄러워하지 마!',
      clozeParts: ['부끄러워하지 ', '!'],
      choices: [
        { text: '마', correct: true },
        { text: '마세요', correct: false },
        { text: '해', correct: false },
        { text: '해요', correct: false },
      ],
      explain: 'V지 마 = 别做（반말禁止）。합쇼체 = V지 마세요',
    },
    {
      id: 'd25-l2-c4',
      audioKo: '크게 외쳐!',
      clozeParts: ['크게 ', '!'],
      choices: [
        { text: '외쳐', correct: true },
        { text: '외치어', correct: false },
        { text: '외치아', correct: false },
        { text: '외쳤어', correct: false },
      ],
      explain: '외치+어 → 외쳐（ㅣ+ㅓ=ㅕ 缩合）。반말命令', explainEn: '외치+어 → 외쳐 (ㅣ+ㅓ=ㅕ contraction). Casual command.',
    },
  ],

  reply: [
    {
      id: 'd25-l2-r1',
      audioKo: '토리, 응원봉 받아. 오늘 우리가 가르쳐 줄게.',
      promptZh: 'Junho 把应援棒塞给你，你有点紧张但想接受，最合适的一句？', promptZhEn: 'Junho hands you a light stick; you\'re nervous but want to accept. What\'s the most fitting line?',
      choices: [
        { text: '고마워. 잘 부탁해.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '싫어.', correct: false },
        { text: '응원봉이 뭐야?', correct: false },
      ],
      explain: '朋友教你 → 고마워（谢了）+ 잘 부탁해（拜托了·반말）', explainEn: 'Friend teaches you → 고마워 (thanks) + 잘 부탁해 (please take care of me, casual).',
    },
    {
      id: 'd25-l2-r2',
      audioKo: '토리, 그냥 외쳐! 부끄러워하지 마!',
      promptZh: 'Minji 鼓励你放开喊，你想接受鼓励，最有决心的一句？', promptZhEn: 'Minji encourages you to shout freely; you want to accept the encouragement. What\'s the most determined line?',
      choices: [
        { text: '알았어. 외칠게!', correct: true },
        { text: '몰라.', correct: false },
        { text: '싫어.', correct: false },
        { text: '외치가 뭐야?', correct: false },
      ],
      explain: '알았어（好）+ 외칠게（我会喊·承诺）· 朋友鼓励下的最强回应', explainEn: '알았어 (okay) + 외칠게 (I\'ll shout, promise). The strongest response to a friend\'s encouragement.',
    },
    {
      id: 'd25-l2-r3',
      audioKo: '다 같이! 사랑해!',
      promptZh: 'MC 在台上喊"다 같이!"3000人开始齐喊。你的反应？', promptZhEn: 'The MC shouts "다 같이!" on stage, and 3,000 people start chanting together. What\'s your reaction?',
      choices: [
        { text: '사랑해! 응원해! 따라해!', correct: true },
        { text: '안녕하세요.', correct: false },
        { text: '감사합니다.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '演唱会应援三连：사랑해 → 응원해 → 따라해', explainEn: 'Concert cheer trio: 사랑해 → 응원해 → 따라해.',
    },
  ],
};
