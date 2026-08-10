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
  subtitle: '听清 Junho 的疑问，学会用 네 / 아니요 回应',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd06-l2-m1',
      audioKo: '안녕하세요, 반장 준호예요.',
      choices: [
        { text: '你好，我是新生 Junho。', correct: false },
        { text: '你好，我是班长 Junho。', correct: true },
        { text: '你好，Junho 是老师。', correct: false },
        { text: '你好，我叫 Haru。', correct: false },
      ],
      explain: '반장(班长) + 준호(Junho) + 예요。준호 无收音 → 예요',
    },
    {
      id: 'd06-l2-m2',
      audioKo: '중국에서 왔어요?',
      choices: [
        { text: '你会中文吗？', correct: false },
        { text: '你从中国来吗？', correct: true },
        { text: '你想去中国吗？', correct: false },
        { text: '你有中国朋友吗？', correct: false },
      ],
      explain: '중국에서(从中国) + 왔어요(来了) + 升调 = 疑问。「从哪儿来」的高频问法',
    },
    {
      id: 'd06-l2-m3',
      audioKo: 'KPOP 좋아해요?',
      choices: [
        { text: '喜欢 KPOP 吗？', correct: true },
        { text: 'KPOP 是什么？', correct: false },
        { text: '你唱 KPOP 吗？', correct: false },
        { text: 'KPOP 好听吗？', correct: false },
      ],
      explain: '좋아해요 + 升调 = 疑问。「좋아하다」是**动词**，前面搭配宾格 을/를（KPOP을 좋아해요）',
    },
    {
      id: 'd06-l2-m4',
      audioKo: '잘 부탁드려요.',
      choices: [
        { text: '再见，请慢走。', correct: false },
        { text: '请多关照。', correct: true },
        { text: '谢谢您。', correct: false },
        { text: '对不起。', correct: false },
      ],
      explain: '잘(好好地) + 부탁드려요(拜托您)。自我介绍收尾金句，比 부탁합니다 更柔和',
    },
    {
      id: 'd06-l2-m5',
      audioKo: '제가 좋아하는 그룹이에요.',
      choices: [
        { text: '这是我们班的班长。', correct: false },
        { text: '这是我喜欢的组合。', correct: true },
        { text: '这是我朋友的团。', correct: false },
        { text: '这是有名的偶像。', correct: false },
      ],
      explain: '제가(我) + 좋아하는(喜欢的·定语形) + 그룹이에요(是组合)。定语 좋아하는 修饰 그룹',
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
      explain: '사람 有收音 ㅁ → 이에요。升调 + ? = 是非疑问',
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
      explain: '토리 无收音 → 예요。升调即疑问，无需词形变化',
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
      explain: '반장(班长) + 이에요? 是 Junho 自我介绍后确认身份的自然问法',
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
      explain: '좋아하다 = 喜欢（动词，搭 을/를）。좋다 = 好/喜欢（形容词，搭 이/가）。KPOP 좋아해요 = 喜欢 KPOP',
    },
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
    {
      id: 'd06-l2-r1',
      audioKo: '중국에서 왔어요?',
      promptZh: 'Junho 问你是不是从中国来，你确实是，应该说？',
      choices: [
        { text: '네, 중국에서 왔어요.', correct: true },
        { text: '아니요, 한국 사람이에요.', correct: false },
        { text: '여기는 교실이에요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '是非疑问回答公式：네 + 肯定重复。也可以简答 「네, 맞아요」',
    },
    {
      id: 'd06-l2-r2',
      audioKo: 'KPOP 좋아해요?',
      promptZh: 'Junho 问喜不喜欢 KPOP，你偷偷喜欢很久了，应该说？',
      choices: [
        { text: '아니요, 안 좋아해요.', correct: false },
        { text: '네, 정말 좋아해요.', correct: true },
        { text: 'KPOP은 뭐예요?', correct: false },
        { text: '괜찮아요.', correct: false },
      ],
      explain: '네 + 정말 좋아해요（真的很喜欢）= 大方承认。정말 加强度，是同好间破冰的关键词',
    },
    {
      id: 'd06-l2-r3',
      audioKo: '안녕하세요, 반장 준호예요. 잘 부탁드려요.',
      promptZh: 'Junho 自我介绍完，你想友好回应，应该说？',
      choices: [
        { text: '아니요, 저는 반장이 아니에요.', correct: false },
        { text: '안녕하세요, 토리예요. 잘 부탁드려요.', correct: true },
        { text: '괜찮아요, 감사합니다.', correct: false },
        { text: '안녕히 가세요.', correct: false },
      ],
      explain: '同学初见对称回应：안녕하세요 + 名字+예요/이에요 + 잘 부탁드려요',
    },
  ],
};
