import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 1 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 1 主流程对话 + 词汇例句
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 */
export const day1Listen: ListenSubQuestData = {
  day: 1, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '听清每一句，找到韩语的节奏', subtitleEn: 'Listen carefully to each sentence and find the rhythm of Korean',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd01-l2-m1',
      audioKo: '안녕하세요.',
      choices: [
        { text: '谢谢。', textEn: 'Thank you.', correct: false },
        { text: '你好。', textEn: 'Hello.', correct: true },
        { text: '再见。', textEn: 'Goodbye.', correct: false },
        { text: '很高兴认识你。', textEn: 'Nice to meet you.', correct: false },
      ],
      explain: '안녕하세요 是最常用的韩语问候语', explainEn: '안녕하세요 is the most common Korean greeting',
    },
    {
      id: 'd01-l2-m2',
      audioKo: '저는 중국 사람이에요.',
      choices: [
        { text: '我是学生。', textEn: 'I am a student.', correct: false },
        { text: '我是兔莉。', textEn: 'I am Tori.', correct: false },
        { text: '我是中国人。', textEn: 'I am Chinese.', correct: true },
        { text: '我叫Haru。', textEn: 'My name is Haru.', correct: false },
      ],
      explain: '중국 사람 = 中国人', explainEn: '중국 사람 = Chinese person',
    },
    {
      id: 'd01-l2-m3',
      audioKo: '저는 토리예요.',
      choices: [
        { text: '我是中国人。', textEn: 'I am Chinese.', correct: false },
        { text: '我是学生。', textEn: 'I am a student.', correct: false },
        { text: '我的名字是韩国。', textEn: 'My name is Korea.', correct: false },
        { text: '我是兔莉。', textEn: 'I am Tori.', correct: true },
      ],
      explain: '토리예요 = 是兔莉（无收音 → 예요）', explainEn: '토리예요 = is Tori (no final consonant → 예요)',
    },
    {
      id: 'd01-l2-m4',
      audioKo: '친구를 만나고 싶어요.',
      choices: [
        { text: '我想见朋友。', textEn: 'I want to meet a friend.', correct: true },
        { text: '我有朋友。', textEn: 'I have a friend.', correct: false },
        { text: '我是朋友。', textEn: 'I am a friend.', correct: false },
        { text: '我在等朋友。', textEn: 'I am waiting for a friend.', correct: false },
      ],
      explain: '만나고 싶어요 = 想见…', explainEn: '만나고 싶어요 = want to meet...',
    },
    {
      id: 'd01-l2-m5',
      audioKo: '내일 저는 한국에 가요.',
      choices: [
        { text: '今天我在韩国。', textEn: 'Today I am in Korea.', correct: false },
        { text: '明天我要去韩国。', textEn: 'Tomorrow I will go to Korea.', correct: true },
        { text: '我喜欢韩国。', textEn: 'I like Korea.', correct: false },
        { text: '我从韩国来。', textEn: 'I come from Korea.', correct: false },
      ],
      explain: '내일 = 明天，한국에 가요 = 去韩国', explainEn: '내일 = tomorrow, 한국에 가요 = go to Korea',
    },
  ],

  // ─── 听句填空：播完整句 → 挖一词，4 韩文选项 ───
  cloze: [
    {
      id: 'd01-l2-c1',
      audioKo: '저는 학생이에요.',
      clozeParts: ['저는', '이에요.'],
      choices: [
        { text: '한국', correct: false },
        { text: '이름', correct: false },
        { text: '학생', correct: true },
        { text: '친구', correct: false },
      ],
      explain: '학생 = 学生（有收音 ㅇ → 이에요）', explainEn: '학생 = student (has final consonant ㅇ → 이에요)',
    },
    {
      id: 'd01-l2-c2',
      audioKo: '제 이름은 토리예요.',
      clozeParts: ['제', '은 토리예요.'],
      choices: [
        { text: '저', correct: false },
        { text: '당근', correct: false },
        { text: '엄마', correct: false },
        { text: '이름', correct: true },
      ],
      explain: '이름 = 名字，제 이름 = 我的名字', explainEn: '이름 = name, 제 이름 = my name',
    },
    {
      id: 'd01-l2-c3',
      audioKo: '저는 한국 사람이에요.',
      clozeParts: ['저는', '사람이에요.'],
      choices: [
        { text: '한국', correct: true },
        { text: '중국', correct: false },
        { text: '학생', correct: false },
        { text: '이름', correct: false },
      ],
      explain: '한국 = 韩国（兔莉要去的地方）', explainEn: '한국 = Korea (the place Tori is going to)',
    },
    {
      id: 'd01-l2-c4',
      audioKo: '안녕하세요, 만나서 반가워요.',
      clozeParts: ['안녕하세요,', '반가워요.'],
      choices: [
        { text: '저는', correct: false },
        { text: '만나서', correct: true },
        { text: '감사합니다', correct: false },
        { text: '죄송해요', correct: false },
      ],
      explain: '만나서 반가워요 = 很高兴认识你（만나다 见 + 반갑다 高兴）', explainEn: '만나서 반가워요 = nice to meet you (만나다 to meet + 반갑다 to be glad)',
    },
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
    {
      id: 'd01-l2-r1',
      audioKo: '안녕히 가세요.',
      promptZh: '对方对你说"再见（请慢走）"，作为要离开的人，你应该说？', promptZhEn: 'If someone says "goodbye (go safely)" to you, as the one leaving, what should you say?',
      choices: [
        { text: '안녕하세요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
        { text: '안녕히 계세요.', correct: true },
        { text: '감사합니다.', correct: false },
      ],
      explain: '韩语告别有两句：留下的人说 안녕히 가세요（请慢走），离开的人说 안녕히 계세요（请留步）', explainEn: 'There are two ways to say goodbye in Korean: the person staying says 안녕히 가세요 (go safely), and the person leaving says 안녕히 계세요 (stay well)',
    },
    {
      id: 'd01-l2-r2',
      audioKo: '안녕하세요! 처음 뵙겠습니다.',
      promptZh: '对方打招呼并说初次见面，你应该怎么回？', promptZhEn: 'If someone greets you and says it\'s your first meeting, how should you respond?',
      choices: [
        { text: '당근이에요.', correct: false },
        { text: '저는 학생이에요.', correct: false },
        { text: '네, 알겠어요.', correct: false },
        { text: '만나서 반가워요.', correct: true },
      ],
      explain: '初次见面的回应，用 만나서 반가워요（很高兴认识你）最自然', explainEn: 'The most natural response to a first meeting is 만나서 반가워요 (nice to meet you)',
    },
    {
      id: 'd01-l2-r3',
      audioKo: '이름이 뭐예요?',
      promptZh: '对方问"你叫什么名字"，你应该说？', promptZhEn: 'If someone asks "What\'s your name?", what should you say?',
      choices: [
        { text: '제 이름은 토리예요.', correct: true },
        { text: '저는 중국 사람이에요.', correct: false },
        { text: '네, 감사합니다.', correct: false },
        { text: '안녕하세요.', correct: false },
      ],
      explain: '제 이름은 ___예요/이에요 是回答名字的标准句型', explainEn: '제 이름은 ___예요/이에요 is the standard pattern for answering with your name',
    },
  ],
};
