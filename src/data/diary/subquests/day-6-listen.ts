import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 6 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 6 主流程教室对话 + Junho KPOP 场景
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强制辨认句尾升调 이에요/예요，reply 聚焦是非疑问回答
 */
export const day6Listen: ListenSubQuestData = {
  day: 6, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '听清 Junho 的疑问，学会用 네 / 아니요 回应', subtitleEn: 'Listen carefully to Junho\'s questions and learn to respond with 네 / 아니요.',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd06-l2-m1',
      audioKo: '안녕하세요, 반장 준호예요.',
      choices: [
        { text: '你好，我是新生 Junho。', textEn: 'Hello, I\'m Junho, a new student.', correct: false },
        { text: '你好，我是班长 Junho。', textEn: 'Hello, I\'m the class president, Junho.', correct: true },
        { text: '你好，Junho 是老师。', textEn: 'Hello, Junho is a teacher.', correct: false },
        { text: '你好，我叫 Haru。', textEn: 'Hello, my name is Haru.', correct: false },
      ],
      explain: '반장(班长) + 준호(Junho) + 예요。준호 无收音 → 예요', explainEn: '반장 (class president) + 준호 (Junho) + 예요. Junho ends in a vowel → 예요.',
    },
    {
      id: 'd06-l2-m2',
      audioKo: '중국에서 왔어요?',
      choices: [
        { text: '你会中文吗？', textEn: 'Can you speak Chinese?', correct: false },
        { text: '你从中国来吗？', textEn: 'Are you from China?', correct: true },
        { text: '你想去中国吗？', textEn: 'Do you want to go to China?', correct: false },
        { text: '你有中国朋友吗？', textEn: 'Do you have Chinese friends?', correct: false },
      ],
      explain: '중국에서(从中国) + 왔어요(来了) + 升调 = 疑问。「从哪儿来」的高频问法', explainEn: '중국에서 (from China) + 왔어요 (came) + rising tone = question. A common way to ask "where are you from."',
    },
    {
      id: 'd06-l2-m3',
      audioKo: 'KPOP 좋아해요?',
      choices: [
        { text: '喜欢 KPOP 吗？', textEn: 'Do you like KPOP?', correct: true },
        { text: 'KPOP 是什么？', textEn: 'What is KPOP?', correct: false },
        { text: '你唱 KPOP 吗？', textEn: 'Do you sing KPOP?', correct: false },
        { text: 'KPOP 好听吗？', textEn: 'Is KPOP good to listen to?', correct: false },
      ],
      explain: '좋아해요 + 升调 = 疑问。「좋아하다」是**动词**，前面搭配宾格 을/를（KPOP을 좋아해요）', explainEn: '좋아해요 + rising tone = question. 좋아하다 is a **verb** and takes the object particle 을/를 (KPOP을 좋아해요).',
    },
    {
      id: 'd06-l2-m4',
      audioKo: '잘 부탁드려요.',
      choices: [
        { text: '再见，请慢走。', textEn: 'Goodbye, take care.', correct: false },
        { text: '请多关照。', textEn: 'Please take care of me.', correct: true },
        { text: '谢谢您。', textEn: 'Thank you.', correct: false },
        { text: '对不起。', textEn: 'I\'m sorry.', correct: false },
      ],
      explain: '잘(好好地) + 부탁드려요(拜托您)。自我介绍收尾金句，比 부탁합니다 更柔和', explainEn: '잘 (well) + 부탁드려요 (please take care of me). A perfect way to end a self-introduction — softer than 부탁합니다.',
    },
    {
      id: 'd06-l2-m5',
      audioKo: '제가 좋아하는 그룹이에요.',
      choices: [
        { text: '这是我们班的班长。', textEn: 'This is our class president.', correct: false },
        { text: '这是我喜欢的组合。', textEn: 'This is the group I like.', correct: true },
        { text: '这是我朋友的团。', textEn: 'This is my friend\'s group.', correct: false },
        { text: '这是有名的偶像。', textEn: 'This is a famous idol.', correct: false },
      ],
      explain: '제가(我) + 좋아하는(喜欢的·定语形) + 그룹이에요(是组合)。定语 좋아하는 修饰 그룹', explainEn: '제가 (I) + 좋아하는 (favorite, attributive form) + 그룹이에요 (is a group). The modifier 좋아하는 describes 그룹.',
    },
  ],

  // ─── 听句填空：播完整句 → 挖一词，4 韩文选项 ───
  cloze: [
    {
      id: 'd06-l2-c1',
      audioKo: '중국 사람이에요?',
      clozeParts: ['중국 사람', '?'],
      choices: [
        { text: '이에요', correct: true },
        { text: '예요', correct: false },
        { text: '입니까', correct: false },
        { text: '있어요', correct: false },
      ],
      explain: '사람 有收音 ㅁ → 이에요。升调 + ? = 是非疑问', explainEn: '사람 ends in ㅁ → 이에요. Rising tone + ? = yes/no question.',
    },
    {
      id: 'd06-l2-c2',
      audioKo: '토리예요?',
      clozeParts: ['토리', '?'],
      choices: [
        { text: '이에요', correct: false },
        { text: '예요', correct: true },
        { text: '이요', correct: false },
        { text: '이입니다', correct: false },
      ],
      explain: '토리 无收音 → 예요。升调即疑问，无需词形变化', explainEn: '토리 ends in a vowel → 예요. Rising tone makes it a question — no other changes needed.',
    },
    {
      id: 'd06-l2-c3',
      audioKo: '반장이에요?',
      clozeParts: ['', '이에요?'],
      choices: [
        { text: '반장', correct: true },
        { text: '학생', correct: false },
        { text: '신입생', correct: false },
        { text: '팬', correct: false },
      ],
      explain: '반장(班长) + 이에요? 是 Junho 自我介绍后确认身份的自然问法', explainEn: '반장 (class president) + 이에요? is a natural way to confirm Junho\'s role after his self-introduction.',
    },
    {
      id: 'd06-l2-c4',
      audioKo: 'KPOP 좋아해요.',
      clozeParts: ['KPOP ', '.'],
      choices: [
        { text: '좋아요', correct: false },
        { text: '좋아해요', correct: true },
        { text: '알아요', correct: false },
        { text: '있어요', correct: false },
      ],
      explain: '좋아하다 = 喜欢（动词，搭 을/를）。좋다 = 好/喜欢（形容词，搭 이/가）。KPOP 좋아해요 = 喜欢 KPOP', explainEn: '좋아하다 = to like (verb, takes 을/를). 좋다 = to be good/like (adjective, takes 이/가). KPOP 좋아해요 = I like KPOP.',
    },
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
    {
      id: 'd06-l2-r1',
      audioKo: '중국에서 왔어요?',
      promptZh: 'Junho 问你是不是从中国来，你确实是，应该说？', promptZhEn: 'Junho asks if you\'re from China, and you are. What should you say?',
      choices: [
        { text: '네, 중국에서 왔어요.', correct: true },
        { text: '아니요, 한국 사람이에요.', correct: false },
        { text: '여기는 교실이에요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '是非疑问回答公式：네 + 肯定重复。也可以简答 「네, 맞아요」', explainEn: 'Yes/no question answer formula: 네 + affirmative repetition. You can also simply say "네, 맞아요."',
    },
    {
      id: 'd06-l2-r2',
      audioKo: 'KPOP 좋아해요?',
      promptZh: 'Junho 问喜不喜欢 KPOP，你偷偷喜欢很久了，应该说？', promptZhEn: 'Junho asks if you like K-pop. You\'ve secretly liked it for a long time. What should you say?',
      choices: [
        { text: '아니요, 안 좋아해요.', correct: false },
        { text: '네, 정말 좋아해요.', correct: true },
        { text: 'KPOP은 뭐예요?', correct: false },
        { text: '괜찮아요.', correct: false },
      ],
      explain: '네 + 정말 좋아해요（真的很喜欢）= 大方承认。정말 加强度，是同好间破冰的关键词', explainEn: '네 + 정말 좋아해요 (really like it) = admit it openly. 정말 adds emphasis and is the key word for breaking the ice with a fellow fan.',
    },
    {
      id: 'd06-l2-r3',
      audioKo: '안녕하세요, 반장 준호예요. 잘 부탁드려요.',
      promptZh: 'Junho 自我介绍完，你想友好回应，应该说？', promptZhEn: 'After Junho introduces himself, you want to respond friendly. What should you say?',
      choices: [
        { text: '아니요, 저는 반장이 아니에요.', correct: false },
        { text: '안녕하세요, 토리예요. 잘 부탁드려요.', correct: true },
        { text: '괜찮아요, 감사합니다.', correct: false },
        { text: '안녕히 가세요.', correct: false },
      ],
      explain: '同学初见对称回应：안녕하세요 + 名字+예요/이에요 + 잘 부탁드려요', explainEn: 'Symmetrical response for first meeting a classmate: 안녕하세요 + name + 예요/이에요 + 잘 부탁드려요',
    },
  ],
};
