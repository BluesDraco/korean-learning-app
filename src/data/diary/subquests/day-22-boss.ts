import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 22 · 1-5 Boss 战 · 해요体登场综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：해요体三规则 + 缩合 + ㄷ/ㅂ不规则识别
 */
export const day22Boss: BossSubQuestData = {
  day: 22, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '让 8 个动词全部戴上"~요"帽子',
  intro: '火鹤老师放下粉笔，粉红色的翅膀轻轻收在身后。「토리 학생, 오늘 배운 걸 다 써 볼래요?」（Tori，把今天学的全用一遍？）你翻开笔记本，深呼吸——해요体第一次实战。',
  outroHook: '通过！从今天起，你说的每句话都是 ~요 结尾。明天，弘大街头，Junho 拉你去追星——KPOP 词汇袭来。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd22-b5-t1',
        audioKo: '학교에 가요.',
        choices: [
          { text: '去学校。', correct: true },
          { text: '来学校。', correct: false },
          { text: '在学校。', correct: false },
          { text: '想去学校。', correct: false },
        ],
        explain: '가다 → 가요（ㅏ+ㅏ 合并）。에 表示方向',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd22-b5-t2',
        audioKo: '한국어 공부해요.',
        choices: [
          { text: '学韩语。', correct: true },
          { text: '教韩语。', correct: false },
          { text: '想学韩语。', correct: false },
          { text: '韩语学好了。', correct: false },
        ],
        explain: '공부하다 → 공부해요（하다 → 해요 规则3）',
      },
    },
    {
      type: 'choice',
      label: '形态改错',
      task: {
        id: 'd22-b5-t3',
        promptZh: '"喝咖啡"哪句正确？',
        choices: [
          { text: '커피 마시어요.', correct: false },
          { text: '커피 마셔요.', correct: true },
          { text: '커피 마시아요.', correct: false },
          { text: '커피 마셔여요.', correct: false },
        ],
        explain: '마시+어 缩合为 마셔（ㅣ+ㅓ=ㅕ）',
      },
    },
    {
      type: 'choice',
      label: '形态改错',
      task: {
        id: 'd22-b5-t4',
        promptZh: '"听音乐"哪句正确？',
        choices: [
          { text: '음악 듣어요.', correct: false },
          { text: '음악 들어요.', correct: true },
          { text: '음악 듣아요.', correct: false },
          { text: '음악 들아요.', correct: false },
        ],
        explain: '듣다 ㄷ不规则：ㄷ 在元音前变ㄹ → 들 + 어요',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd22-b5-t5',
        promptKo: '배우다',
        promptHangul: 'bae-u-da',
        choices: [
          { text: '学 / 学习', correct: true },
          { text: '教', correct: false },
          { text: '记', correct: false },
          { text: '练', correct: false },
        ],
        explain: '배우다 是学生对老师"学习"这个动作。해요体是 배워요（ㅜ+ㅓ=ㅝ）',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd22-b5-t6',
        zhHint: '朋友来了。',
        audioKo: '친구가 와요.',
        answer: ['친구가', '와요.'],
        tokens: ['친구가', '와요.', '오아요.', '왔어요.', '가요.', '오해요.'],
        explain: '오다 → 와요（ㅗ+ㅏ=ㅘ 缩合）',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd22-b5-t7',
        zhHint: '看电影。',
        audioKo: '영화 봐요.',
        answer: ['영화', '봐요.'],
        tokens: ['영화', '봐요.', '보아요.', '봤어요.', '봐해요.', '보요.'],
        explain: '보다 → 봐요（ㅗ+ㅏ=ㅘ 缩合）',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd22-b5-t8',
        promptZh: '火鹤老师问「"공부하다"는 어떻게 바꿔요?（"공부하다"怎么变？）」，最标准的答法？',
        choices: [
          { text: '공부해요. 하다는 해요예요.', correct: true },
          { text: '공부하아요. 아요예요.', correct: false },
          { text: '공부하어요. 어요예요.', correct: false },
          { text: '공부하하요.', correct: false },
        ],
        explain: '하다类无条件 해요。回答带理由（"하다는 해요"）更完整',
      },
    },
  ],
};
