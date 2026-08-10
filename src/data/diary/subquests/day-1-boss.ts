import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 1 · 1-5 Boss 战 · 完整自我介绍综合大考
 * 8 题混合：听句选意×2 + 助词改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 */
export const day1Boss: BossSubQuestData = {
  day: 1, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '对着镜子，完成完整的自我介绍',
  intro: '出发前的最后一晚。兔莉站在镜子前，胡萝卜握在手心。今天学的一切，现在全要用上。',
  outroHook: '通过！明天飞机上，空乘问"要喝什么"——下一关的挑战已经在等你了。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd01-b5-t1',
        audioKo: '안녕하세요, 저는 토리예요.',
        choices: [
          { text: '你好，我是学生。', correct: false },
          { text: '你好，我是兔莉。', correct: true },
          { text: '再见，我是兔莉。', correct: false },
          { text: '你好，我是中国人。', correct: false },
        ],
        explain: '안녕하세요=你好，저는=我，토리예요=是兔莉',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd01-b5-t2',
        audioKo: '저는 중국 사람이에요.',
        choices: [
          { text: '我是韩国人。', correct: false },
          { text: '我是学生。', correct: false },
          { text: '我是中国人。', correct: true },
          { text: '我在中国。', correct: false },
        ],
        explain: '중국=中国，사람=人，이에요=是（有收音→이에요）',
      },
    },
    {
      type: 'choice',
      label: '助词改错',
      task: {
        id: 'd01-b5-t3',
        promptZh: '下面哪句是正确的自我介绍？',
        choices: [
          { text: '저는 학생예요.', correct: false },
          { text: '저은 학생이에요.', correct: false },
          { text: '저는 학생이요.', correct: false },
          { text: '저는 학생이에요.', correct: true },
        ],
        explain: '저无收音→는；학생有收音→이에요',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd01-b5-t4',
        promptKo: '만나서 반가워요',
        promptHangul: 'man-na-seo ban-ga-wo-yo',
        choices: [
          { text: '很高兴认识你', correct: true },
          { text: '谢谢你', correct: false },
          { text: '再见', correct: false },
          { text: '对不起', correct: false },
        ],
        explain: '만나다=见面，반갑다=高兴，合起来=很高兴认识你',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd01-b5-t5',
        zhHint: '我的名字是兔莉。',
        audioKo: '제 이름은 토리예요.',
        answer: ['제', '이름은', '토리예요.'],
        tokens: ['제', '이름은', '토리예요.', '저는', '한국이에요.'],
        explain: '제=我的，이름末字有收音→은，토리无收音→예요',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd01-b5-t6',
        zhHint: '我是韩语学生。',
        audioKo: '저는 한국어 학생이에요.',
        answer: ['저는', '한국어', '학생이에요.'],
        tokens: ['저는', '한국어', '학생이에요.', '중국', '친구예요.'],
        explain: '학생末字有收音ㅇ→이에요；친구末字无收音→예요',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd01-b5-t7',
        audioKo: '안녕하세요! 처음 뵙겠습니다.',
        promptZh: '对方打招呼说初次见面，你应该回？',
        choices: [
          { text: '감사합니다.', correct: false },
          { text: '만나서 반가워요!', correct: true },
          { text: '저는 토리예요.', correct: false },
          { text: '네, 알겠어요.', correct: false },
        ],
        explain: '처음 뵙겠습니다=初次见面（敬语），最自然的回应是만나서 반가워요',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd01-b5-t8',
        promptZh: '妈妈递给你一根胡萝卜，你应该说？',
        choices: [
          { text: '아니요, 괜찮아요.', correct: false },
          { text: '저는 토리예요.', correct: false },
          { text: '감사합니다, 엄마.', correct: true },
          { text: '이름이 뭐예요?', correct: false },
        ],
        explain: '收到长辈给的东西说감사합니다（谢谢），语气最自然',
      },
    },
  ],
};
