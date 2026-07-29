import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 32 · 2-5 Boss 战 · 🌕 추석 · 一个人的中秋节 */
export const day32Boss: BossSubQuestData = {
  day: 2, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '한가위 관문',
  subtitle: '🌕 추석 · 甜咸的一晚',
  intro: '走廊安静得能听见冰箱的嗡嗡声。302 号门开了一条缝，Haru 探出头递给你一盒粉粉绿绿的松片糕。窗外的月亮在城市的高楼间浮着，甜的松片糕和咸的眼泪在舌尖同时出现。今晚要说完这个节日里最难说的每一句话。',
  outroHook: 'Haru 站起来准备离开时留下一句："나 옆방이야. 언제든 노크해." (我就在隔壁，随时敲门。) 门轻轻关上，走廊安静了，但你的宿舍不再空。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd32-b5-t1',
        audioKo: '연휴라서 혼자 있으면 안 돼요.',
        choices: [
          { text: '因为是连休，一个人可不行。', correct: true },
          { text: '连休可以一个人过。', correct: false },
          { text: '一个人不能放假。', correct: false },
          { text: '一起放假不行。', correct: false },
        ],
        explain: 'Haru 递松片糕原句 · 연휴 无收音 → 라서',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd32-b5-t2',
        audioKo: '엄마가 만든 송편이에요. 같이 먹어요.',
        choices: [
          { text: '这是妈妈做的松片糕。一起吃吧。', correct: true },
          { text: '妈妈买了松片糕。一起吃吧。', correct: false },
          { text: '我要给妈妈做松片糕。', correct: false },
          { text: '妈妈不喜欢松片糕。', correct: false },
        ],
        explain: '만들다 → 만든（관형형过去/形容化）· 送礼场景',
      },
    },
    {
      type: 'choice',
      label: '连接词选择',
      task: {
        id: 'd32-b5-t3',
        promptZh: '"因为下雨，请带伞"哪句最自然？',
        choices: [
          { text: '비가 와서 우산 가져가세요.', correct: false },
          { text: '비가 오니까 우산 가져가세요.', correct: true },
          { text: '비가 오면 우산 가져가세요.', correct: false },
          { text: '비가 오지만 우산 가져가세요.', correct: false },
        ],
        explain: '后半句是命令 → 必须用 ~(으)니까',
      },
    },
    {
      type: 'choice',
      label: '收音判定',
      task: {
        id: 'd32-b5-t4',
        promptZh: '"因为是学生所以没钱"哪句正确？',
        choices: [
          { text: '학생라서 돈이 없어요.', correct: false },
          { text: '학생이라서 돈이 없어요.', correct: true },
          { text: '학생어서 돈이 없어요.', correct: false },
          { text: '학생아서 돈이 없어요.', correct: false },
        ],
        explain: '학생 有收音 ㅇ → **이라서**',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd32-b5-t5',
        promptKo: '송편',
        promptHangul: 'song-pyeon',
        choices: [
          { text: '松片糕', correct: true },
          { text: '月饼', correct: false },
          { text: '年糕汤', correct: false },
          { text: '拌饭', correct: false },
        ],
        explain: '半月形年糕 · 中秋必吃',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd32-b5-t6',
        zhHint: '因为想家所以哭了。',
        audioKo: '고향이 보고 싶어서 울었어요.',
        answer: ['고향이', '보고 싶어서', '울었어요.'],
        tokens: ['고향이', '보고 싶어서', '울었어요.', '보고 싶었어서', '보고 싶으니까', '울어요.'],
        explain: '~어서 前不接过去时 · 时态放句尾',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd32-b5-t7',
        zhHint: '不好意思迟到了。',
        audioKo: '늦어서 죄송해요.',
        answer: ['늦어서', '죄송해요.'],
        tokens: ['늦어서', '죄송해요.', '늦아서', '늦었어서', '늦으니까', '죄송합니다요.'],
        explain: '늦다 元音 ㅡ → 어서 · 道歉固定句',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd32-b5-t8',
        promptZh: 'Haru 关切地问 "많이 힘들었죠?"。你想诚实又不失礼，最自然的一句？',
        choices: [
          { text: '네, 조금요. 엄마가 보고 싶어요.', correct: true },
          { text: '아니요, 안 힘들어요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '싫어요.', correct: false },
        ],
        explain: '诚实回应 + 说出真心话',
      },
    },
  ],
};
