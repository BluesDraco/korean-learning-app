import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 4 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 4 主流程对话 + 宿舍前台场景
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 2/3 强制辨 입니다 vs 이에요 语尾
 */
export const day4Listen: ListenSubQuestData = {
  day: 4, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '听清宿管阿姨的每一句，抓住 입니다 和 이에요',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd04-l2-m1',
      audioKo: '새로 온 학생이에요?',
      choices: [
        { text: '你是新来的学生吗？', correct: true },
        { text: '你是几年级的学生？', correct: false },
        { text: '你是留学生吗？', correct: false },
        { text: '你叫什么？', correct: false },
      ],
      explain: '새로 온(新来的) + 학생(学生) + 이에요(是)。句尾升调 = 疑问',
    },
    {
      id: 'd04-l2-m2',
      audioKo: '네, 토리입니다.',
      choices: [
        { text: '是的，我是韩国人。', correct: false },
        { text: '是的，我叫兔莉。', correct: true },
        { text: '是的，我是学生。', correct: false },
        { text: '是的，我明白了。', correct: false },
      ],
      explain: '입니다 是最正式的"是___"。对宿管/长辈用会显得更有礼貌',
    },
    {
      id: 'd04-l2-m3',
      audioKo: '301호예요. 키 받으세요.',
      choices: [
        { text: '这是钥匙。', correct: false },
        { text: '301 号，请收下钥匙。', correct: true },
        { text: '301 号房关门了。', correct: false },
        { text: '我住 301。', correct: false },
      ],
      explain: '301호(三百零一号) + 예요(是) + 키 받으세요(请收下钥匙)',
    },
    {
      id: 'd04-l2-m4',
      audioKo: '옆방에 하루 학생이 있어요.',
      choices: [
        { text: '隔壁是我的房间。', correct: false },
        { text: '隔壁有 Haru 同学。', correct: true },
        { text: '隔壁没人住。', correct: false },
        { text: 'Haru 现在不在。', correct: false },
      ],
      explain: '옆방(隔壁房间) + 에(在) + 하루 학생(Haru 同学) + 이 있어요(有)',
    },
    {
      id: 'd04-l2-m5',
      audioKo: '여권 좀 보여주세요.',
      choices: [
        { text: '请给我看下护照。', correct: true },
        { text: '这是我的护照。', correct: false },
        { text: '护照丢了。', correct: false },
        { text: '请填写这个表格。', correct: false },
      ],
      explain: '여권(护照) + 좀(缓和语气) + 보여주세요(请给我看)。前台/机场高频',
    },
  ],

  // ─── 听句填空：播完整句 → 挖一词，4 韩文选项 ───
  cloze: [
    {
      id: 'd04-l2-c1',
      audioKo: '새로 온 학생이에요?',
      clozeParts: ['새로 온 ', '이에요?'],
      choices: [
        { text: '학생', correct: true },
        { text: '선생님', correct: false },
        { text: '친구', correct: false },
        { text: '엄마', correct: false },
      ],
      explain: '학생 有收音 ㅇ → 이에요。「새로 온 학생」= 新来的学生',
    },
    {
      id: 'd04-l2-c2',
      audioKo: '네, 토리입니다.',
      clozeParts: ['네, 토리', '.'],
      choices: [
        { text: '이에요', correct: false },
        { text: '입니다', correct: true },
        { text: '이요', correct: false },
        { text: '예요', correct: false },
      ],
      explain: '토리입니다 = 是兔莉（最正式）。对宿管阿姨用 입니다 比 예요 更有礼貌',
    },
    {
      id: 'd04-l2-c3',
      audioKo: '저는 학생이에요.',
      clozeParts: ['저는 학생', '.'],
      choices: [
        { text: '입니다', correct: false },
        { text: '이에요', correct: true },
        { text: '예요', correct: false },
        { text: '이요', correct: false },
      ],
      explain: '학생 有收音 ㅇ → 이에요（不是 예요）。해요체版的 "我是学生"',
    },
    {
      id: 'd04-l2-c4',
      audioKo: '301호예요.',
      clozeParts: ['301호', '.'],
      choices: [
        { text: '이에요', correct: false },
        { text: '예요', correct: true },
        { text: '입니다', correct: false },
        { text: '있어요', correct: false },
      ],
      explain: '호(号) 无收音 → 예요。房间号后跟 예요 是常见句尾',
    },
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
    {
      id: 'd04-l2-r1',
      audioKo: '새로 온 학생이에요?',
      promptZh: '宿管阿姨问"是新来的学生吗？"，你想最正式地回答，应该说？',
      choices: [
        { text: '네, 토리입니다.', correct: true },
        { text: '아니요, 저는 선생님이에요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
        { text: '괜찮아요.', correct: false },
      ],
      explain: '对宿管阿姨用最正式的 입니다。「입니다」不受收音影响，토리+입니다 直接连',
    },
    {
      id: 'd04-l2-r2',
      audioKo: '여권 좀 보여주세요.',
      promptZh: '前台要看护照，你正在包里找，应该说？',
      choices: [
        { text: '아니요, 없어요.', correct: false },
        { text: '잠깐만요, 여권 좀 찾을게요.', correct: true },
        { text: '죄송합니다, 안녕히 계세요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '找东西/临时中断用 잠깐만요（请稍等）。用 아니요 없어요 会让对方以为你没带',
    },
    {
      id: 'd04-l2-r3',
      audioKo: '301호예요. 키 받으세요.',
      promptZh: '宿管递过钥匙，你应该？',
      choices: [
        { text: '아니요, 괜찮아요.', correct: false },
        { text: '감사합니다.', correct: true },
        { text: '이름이 뭐예요?', correct: false },
        { text: '저는 학생이에요.', correct: false },
      ],
      explain: '收到钥匙 = 收到东西 → 感谢用 감사합니다。用 괜찮아요 会变成"不用了"，反而失礼',
    },
  ],
};
