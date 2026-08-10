import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 1 · 1-4 情景关
 * 3种题型：情景选择 / 对话填空 / 语境判断
 * 题目覆盖 Day 1 全部语料，不局限于剧情
 */
export const day1Scene: SceneSubQuestData = {
  day: 1, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在真实情景中用出今天学的韩语',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd01-sc-s1',
      scenario: '第一次见到某人，你想打招呼，应该说？',
      choices: [
        { ko: '안녕하세요!', zh: '你好！', correct: true },
        { ko: '감사합니다.', zh: '谢谢。', correct: false },
        { ko: '죄송해요.', zh: '对不起。', correct: false },
        { ko: '안녕히 가세요.', zh: '再见。', correct: false },
      ],
      explain: '안녕하세요 是韩语最常用的问候语，适合初次见面和日常打招呼',
    },
    {
      type: 'situation',
      id: 'd01-sc-s2',
      scenario: '有人帮了你一个忙，递给你东西，你应该说？',
      choices: [
        { ko: '죄송해요.', zh: '对不起。', correct: false },
        { ko: '괜찮아요.', zh: '没关系。', correct: false },
        { ko: '감사합니다.', zh: '谢谢。', correct: true },
        { ko: '저는 학생이에요.', zh: '我是学生。', correct: false },
      ],
      explain: '감사합니다 是标准感谢语，比口语说的 고마워요 更正式',
    },
    {
      type: 'situation',
      id: 'd01-sc-s3',
      scenario: '初次见面后，对方说"처음 뵙겠습니다"，你应该回？',
      choices: [
        { ko: '저는 토리예요.', zh: '我是兔莉。', correct: false },
        { ko: '안녕하세요.', zh: '你好。', correct: false },
        { ko: '감사합니다.', zh: '谢谢。', correct: false },
        { ko: '만나서 반가워요!', zh: '很高兴认识你！', correct: true },
      ],
      explain: '처음 뵙겠습니다 = 初次见面，标准回应是 만나서 반가워요',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd01-sc-d1',
      lines: [
        { speaker: '친구', ko: '이름이 뭐예요?', zh: '你叫什么名字？' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '저는 중국 사람이에요.', zh: '我是中国人。', correct: false },
        { ko: '제 이름은 토리예요.', zh: '我的名字是兔莉。', correct: true },
        { ko: '안녕하세요!', zh: '你好！', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '回答名字用"제 이름은 ___예요/이에요"句型',
    },
    {
      type: 'dialogue',
      id: 'd01-sc-d2',
      lines: [
        { speaker: '선생님', ko: '어느 나라 사람이에요?', zh: '你是哪国人？' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '감사합니다.', zh: '谢谢。', correct: false },
        { ko: '저는 학생이에요.', zh: '我是学生。', correct: false },
        { ko: '안녕하세요.', zh: '你好。', correct: false },
        { ko: '저는 중국 사람이에요.', zh: '我是中国人。', correct: true },
      ],
      explain: '어느 나라 사람 = 哪国人；回答用"저는 ___ 사람이에요"',
    },
    {
      type: 'dialogue',
      id: 'd01-sc-d3',
      lines: [
        { speaker: '엄마', ko: '토리야, 이거 가져가.', zh: '兔莉，把这个带上。' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아니요, 괜찮아요.', zh: '不了，没关系。', correct: false },
        { ko: '감사합니다, 엄마.', zh: '谢谢您，妈妈。', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
        { ko: '안녕히 계세요.', zh: '再见。', correct: false },
      ],
      explain: '妈妈递东西时用「감사합니다」（谢谢）最自然；「아니요, 괜찮아요」是拒绝，中国孩子容易客套一下说"不用"，但韩语里这样反而失礼',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd01-sc-c1',
      ko: '만나서 반가워요.',
      promptZh: '这句话在什么情况下说？',
      choices: [
        { zh: '初次见到对方、正式打招呼之后', correct: true },
        { zh: '告别时，说"再见"', correct: false },
        { zh: '收到礼物，表示感谢', correct: false },
        { zh: '不小心撞到人，道歉', correct: false },
      ],
      explain: '만나다=见面，반갑다=高兴，初次见面时用',
    },
    {
      type: 'context',
      id: 'd01-sc-c2',
      ko: '저는 학생이에요.',
      promptZh: '这句话最可能出现在什么场景？',
      choices: [
        { zh: '朋友问"你是做什么的？"你回答职业', correct: true },
        { zh: '向别人询问路怎么走', correct: false },
        { zh: '朋友生日，祝对方生日快乐', correct: false },
        { zh: '在餐厅点餐', correct: false },
      ],
      explain: '저는 학생이에요 = 我是学生，自我介绍职业/身份时使用',
    },
  ],
};
