import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 8 · 1-5 Boss 战 · ~고 싶어요 综合大考
 * 8 题混合：听句选意×2 + 助词改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 9：早晨 CU 便利店独闯，指示词 이거/그거/저거
 */
export const day8Boss: BossSubQuestData = {
  day: 8, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '独处夜之收官 · 把想念说给自己听',
  intro: '深夜 12 点。手机屏幕暗着，妈妈的语音只有 3 秒。你想说的太多，还没学到那么多韩语——但你已经能说出"엄마가 보고 싶어요"。这一晚的最后一关：把想念说完。',
  outroHook: '通过！关灯躺下时，肚子咕的一声——空的。明天早上，你要一个人下楼去 CU。考拉店员在等你。别的不学，先学会指着东西说「이거 주세요」。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd08-b5-t1',
        audioKo: '엄마가 보고 싶어요.',
        choices: [
          { text: '我看见妈妈了。', correct: false },
          { text: '我想妈妈。', correct: true },
          { text: '妈妈想我。', correct: false },
          { text: '妈妈来了。', correct: false },
        ],
        explain: '보고 싶다 = 想见 = 想念。엄마 무받침 → 가',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd08-b5-t2',
        audioKo: '집에 가고 싶어요.',
        choices: [
          { text: '在家里。', correct: false },
          { text: '我想回家。', correct: true },
          { text: '家里有人。', correct: false },
          { text: '家不远。', correct: false },
        ],
        explain: '집(家) + 에(方向) + 가고 싶어요(想去)。留学生想家的核心句',
      },
    },
    {
      type: 'choice',
      label: '助词改错',
      task: {
        id: 'd08-b5-t3',
        promptZh: '"我想妈妈"最标准的写法？',
        choices: [
          { text: '엄마를 보고 싶어요.', correct: false },
          { text: '엄마가 보고 싶어요.', correct: true },
          { text: '엄마는 보고 싶어요.', correct: false },
          { text: '엄마에 보고 싶어요.', correct: false },
        ],
        explain: '「보고 싶다」的思念对象用**主格 이/가**，不是宾格 을/를。这是韩语心理动词的特有规则',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd08-b5-t4',
        promptKo: '힘들어요',
        promptHangul: 'him-deu-reo-yo',
        choices: [
          { text: '开心 / 高兴', correct: false },
          { text: '累 / 难 / 辛苦', correct: true },
          { text: '简单 / 容易', correct: false },
          { text: '有趣 / 好玩', correct: false },
        ],
        explain: '힘들다 → 힘들어요。三义合一：身体累、心理苦、事情难。ㄹ 收音在 어요 前保留',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd08-b5-t5',
        zhHint: '我想吃泡菜汤。',
        audioKo: '김치찌개 먹고 싶어요.',
        answer: ['김치찌개', '먹고', '싶어요.'],
        tokens: ['김치찌개', '먹고', '싶어요.', '먹었어요.', '먹어요.', '싶어해요.'],
        explain: '먹다(吃) + 고 싶어요 = 想吃。宾语 김치찌개 后可省略 을——口语常省略',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd08-b5-t6',
        zhHint: '我想学韩语。',
        audioKo: '한국어를 공부하고 싶어요.',
        answer: ['한국어를', '공부하고', '싶어요.'],
        tokens: ['한국어를', '공부하고', '싶어요.', '한국어가', '공부했고', '싶어해요.'],
        explain: '공부하다(学习) 词干 공부하 + 고 싶어요。宾语 한국어 用宾格 을/를',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd08-b5-t7',
        audioKo: '토리야, 잘 자.',
        promptZh: 'Haru 반말说"晚安"关门去了。兔莉也想用반말回她，应该？',
        choices: [
          { text: '안녕히 주무세요.', correct: false },
          { text: '잘 자, 하루야.', correct: true },
          { text: '만나서 반가워요.', correct: false },
          { text: '감사합니다.', correct: false },
        ],
        explain: '반말对반말：잘 자 + 名字+야。「안녕히 주무세요」对长辈说；同龄朋友用반말',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd08-b5-t8',
        promptZh: '深夜宿舍睡不着，你想给自己一句반말鼓励，最贴合"明天继续加油"的是？',
        choices: [
          { text: '내일도 화이팅. 괜찮아질 거야.', correct: true },
          { text: '내일 안 해요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '반말自励组合：내일도 화이팅 + 괜찮아질 거야。对自己说반말——是内心那句"哥们你可以的"',
      },
    },
  ],
};
