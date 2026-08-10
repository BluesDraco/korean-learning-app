import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 6 · 1-4 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖第一天教室自我介绍 + 是非疑问回答 + KPOP 破冰
 */
export const day6Scene: SceneSubQuestData = {
  day: 6, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在교실第一次跟同学破冰', subtitleEn: 'Breaking the ice with a classmate for the first time in the classroom',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd06-sc-s1',
      scenario: '第一天上课，Junho 走过来问「중국에서 왔어요?」（从中国来吗？）你确实是中国人，应该？', scenarioEn: 'On the first day of class, Junho comes over and asks, "중국에서 왔어요?" (Are you from China?) You are indeed Chinese. What should you do?',
      choices: [
        { ko: '네, 중국에서 왔어요.', zh: '是的，我从中国来。', zhEn: 'Yes, I\'m from China.', correct: true },
        { ko: '아니요, 한국 사람이에요.', zh: '不，我是韩国人。', zhEn: 'No, I\'m Korean.', correct: false },
        { ko: '여기는 교실이에요.', zh: '这里是教室。', zhEn: 'This is the classroom.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '是非疑问回答黄金公式：네 + 肯定重复。也可短答 「네, 맞아요」', explainEn: 'Golden formula for yes/no questions: 네 + affirmative repetition. You can also answer briefly with "네, 맞아요."',
    },
    {
      type: 'situation',
      id: 'd06-sc-s2',
      scenario: 'Junho 掏出应援棒说「제가 좋아하는 그룹이에요.」（我喜欢的团。）你也偷偷喜欢这个团，应该？', scenarioEn: 'Junho pulls out a light stick and says, "제가 좋아하는 그룹이에요." (It\'s the group I like.) You secretly like this group too. What should you do?',
      choices: [
        { ko: '아니요, 저는 안 좋아해요.', zh: '不，我不喜欢。', zhEn: 'No, I don\'t like it.', correct: false },
        { ko: '어? 저도 정말 좋아해요!', zh: '哎？我也真的很喜欢！', zhEn: 'Huh? I really like them too!', correct: true },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', zhEn: 'It\'s okay, thank you.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '发现同好用 어? + 저도(我也) + 정말 좋아해요 = 秒破冰的黄金三段', explainEn: 'Discovering a fellow fan: use 어? + 저도 (me too) + 정말 좋아해요 = the golden three-step to instantly break the ice',
    },
    {
      type: 'situation',
      id: 'd06-sc-s3',
      scenario: '轮到你自我介绍，你是从中国来的新生兔莉，应该？', scenarioEn: 'It\'s your turn to introduce yourself. You\'re Tori, a new student from China. What should you do?',
      choices: [
        { ko: '안녕하세요, 신입생 토리예요. 잘 부탁드려요.', zh: '你好，我是新生兔莉。请多关照。', zhEn: 'Hello, I\'m Tori, the new student. Please take care of me.', correct: true },
        { ko: '안녕하세요, 신입생 토리이에요. 잘 부탁드려요.', zh: '（拼写错）你好，我是新生兔莉。请多关照。', zhEn: '(spelling error) Hello, I\'m Tori, the new student. Please take care of me.', correct: false },
        { ko: '아니요, 저는 반장이 아니에요.', zh: '不，我不是班长。', zhEn: 'No, I\'m not the class president.', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', zhEn: 'It\'s okay, thank you.', correct: false },
      ],
      explain: '自我介绍套路：招呼 + 身份+名字+예요/이에요 + 잘 부탁드려요。토리 无收音 → 예요（不是 이에요）', explainEn: 'Self-introduction formula: greeting + status + name + 예요/이에요 + 잘 부탁드려요. 토리 has no final consonant → 예요 (not 이에요)',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd06-sc-d1',
      lines: [
        { speaker: 'Junho', ko: '안녕하세요, 반장 준호예요.', zh: '你好，我是班长 Junho。', zhEn: 'Hello, I\'m the class president, Junho.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '안녕하세요, 토리예요. 잘 부탁드려요.', zh: '你好，我是兔莉。请多关照。', zhEn: 'Hello, I\'m Tori. Nice to meet you.', correct: true },
        { ko: '아니요, 저는 반장이 아니에요.', zh: '不，我不是班长。', zhEn: 'No, I\'m not the class president.', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', zhEn: 'It\'s okay, thank you.', correct: false },
        { ko: '안녕히 가세요.', zh: '再见（请慢走）。', zhEn: 'Goodbye (please go safely).', correct: false },
      ],
      explain: '班长自我介绍完，对称回应：招呼 + 名字+예요 + 잘 부탁드려요', explainEn: 'After the class president introduces himself, respond symmetrically: greeting + name + 예요 + 잘 부탁드려요',
    },
    {
      type: 'dialogue',
      id: 'd06-sc-d2',
      lines: [
        { speaker: 'Junho', ko: 'KPOP 좋아해요?', zh: '喜欢 KPOP 吗？', zhEn: 'Do you like KPOP?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아니요, 몰라요.', zh: '不，不知道。', zhEn: 'No, I don\'t know.', correct: false },
        { ko: '네, 정말 좋아해요.', zh: '是的，真的很喜欢。', zhEn: 'Yes, I really like it.', correct: true },
        { ko: 'KPOP은 뭐예요?', zh: 'KPOP 是什么？', zhEn: 'What is KPOP?', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', zhEn: 'It\'s okay, thank you.', correct: false },
      ],
      explain: 'Junho 的应援棒都掏出来了，同好间承认+加强度：네 + 정말 좋아해요', explainEn: 'Junho has already pulled out his light stick. Among fellow fans, admit + emphasize: 네 + 정말 좋아해요',
    },
    {
      type: 'dialogue',
      id: 'd06-sc-d3',
      lines: [
        { speaker: 'Junho', ko: '제가 좋아하는 그룹, 중국 멤버 4명이에요.', zh: '我喜欢的团，4 个中国成员。', zhEn: 'The group I like has 4 Chinese members.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '어? 저도 팬이에요!', zh: '哎？我也是粉丝！', zhEn: 'Huh? I\'m a fan too!', correct: true },
        { ko: '아니요, 저는 안 좋아해요.', zh: '不，我不喜欢。', zhEn: 'No, I don\'t like it.', correct: false },
        { ko: '이름이 뭐예요?', zh: '你叫什么？', zhEn: 'What\'s your name?', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', zhEn: 'It\'s okay, thank you.', correct: false },
      ],
      explain: '发现同好用 어? + 저도(我也) + 팬이에요。팬 有收音 ㄴ → 이에요', explainEn: 'Found a fellow fan! Use 어? + 저도 (me too) + 팬이에요. 팬 ends in a consonant (ㄴ), so it takes 이에요.',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd06-sc-c1',
      ko: '중국 사람이에요?',
      promptZh: '这句话在什么场景最自然？', promptZhEn: 'In what situation is this sentence most natural?',
      choices: [
        { zh: '初次见面问对方国籍', zhEn: 'Asking someone\'s nationality when meeting for the first time', correct: true },
        { zh: '告诉别人自己是中国人', zhEn: 'Telling someone you are Chinese', correct: false },
        { zh: '问对方吃什么', zhEn: 'Asking what the other person is eating', correct: false },
        { zh: '道歉时表达歉意', zhEn: 'Expressing an apology when apologizing.', correct: false },
      ],
      explain: '陈述句 사람이에요（是XX人）+ 升调 + ？ = 疑问句。同学间/初见用 이에요? 最自然', explainEn: 'Statement 사람이에요 (is XX person) + rising intonation + ? = question. Among classmates/at first meeting, 이에요? is most natural.',
    },
    {
      type: 'context',
      id: 'd06-sc-c2',
      ko: 'KPOP 좋아해요.',
      promptZh: '关于这句话的用法，哪个描述最准确？', promptZhEn: 'Which description is most accurate about the usage of this sentence?',
      choices: [
        { zh: '좋아해요 是动词（喜欢），前面用 을/를：KPOP을 좋아해요 更完整', zhEn: '좋아해요 is a verb (to like), used with 을/를: KPOP을 좋아해요 is more complete', correct: true },
        { zh: '좋아해요 是形容词（好），前面用 이/가：KPOP이 좋아해요 更完整', zhEn: '좋아해요 is an adjective (good), used with 이/가: KPOP이 좋아해요 is more complete', correct: false },
        { zh: '좋아해요 只能对朋友用，对长辈要用 좋습니다', zhEn: '좋아해요 is only for friends; use 좋습니다 for elders', correct: false },
        { zh: '좋아해요 是过去时（喜欢过）', zhEn: '좋아해요 is past tense (liked)', correct: false },
      ],
      explain: '좋아하다=动词=用 을/를。跟 좋다（形容词=用 이/가）是一对高频翻车点', explainEn: '좋아하다 = verb = uses 을/를. It\'s a common mix-up with 좋다 (adjective = uses 이/가)',
    },
  ],
};
