import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 6 · 1-4 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖第一天教室自我介绍 + 是非疑问回答 + KPOP 破冰
 */
export const day6Scene: SceneSubQuestData = {
  day: 6, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在교실第一次跟同学破冰',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd06-sc-s1',
      scenario: '第一天上课，Junho 走过来问「중국에서 왔어요?」（从中国来吗？）你确实是中国人，应该？',
      choices: [
        { ko: '네, 중국에서 왔어요.', zh: '是的，我从中国来。', correct: true },
        { ko: '아니요, 한국 사람이에요.', zh: '不，我是韩国人。', correct: false },
        { ko: '여기는 교실이에요.', zh: '这里是教室。', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '是非疑问回答黄金公式：네 + 肯定重复。也可短答 「네, 맞아요」',
    },
    {
      type: 'situation',
      id: 'd06-sc-s2',
      scenario: 'Junho 掏出应援棒说「제가 좋아하는 그룹이에요.」（我喜欢的团。）你也偷偷喜欢这个团，应该？',
      choices: [
        { ko: '아니요, 저는 안 좋아해요.', zh: '不，我不喜欢。', correct: false },
        { ko: '어? 저도 정말 좋아해요!', zh: '哎？我也真的很喜欢！', correct: true },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '发现同好用 어? + 저도(我也) + 정말 좋아해요 = 秒破冰的黄金三段',
    },
    {
      type: 'situation',
      id: 'd06-sc-s3',
      scenario: '轮到你自我介绍，你是从中国来的新生兔莉，应该？',
      choices: [
        { ko: '안녕하세요, 신입생 토리예요. 잘 부탁드려요.', zh: '你好，我是新生兔莉。请多关照。', correct: true },
        { ko: '안녕하세요, 신입생 토리이에요. 잘 부탁드려요.', zh: '（拼写错）你好，我是新生兔莉。请多关照。', correct: false },
        { ko: '아니요, 저는 반장이 아니에요.', zh: '不，我不是班长。', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', correct: false },
      ],
      explain: '自我介绍套路：招呼 + 身份+名字+예요/이에요 + 잘 부탁드려요。토리 无收音 → 예요（不是 이에요）',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd06-sc-d1',
      lines: [
        { speaker: 'Junho', ko: '안녕하세요, 반장 준호예요.', zh: '你好，我是班长 Junho。' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '안녕하세요, 토리예요. 잘 부탁드려요.', zh: '你好，我是兔莉。请多关照。', correct: true },
        { ko: '아니요, 저는 반장이 아니에요.', zh: '不，我不是班长。', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', correct: false },
        { ko: '안녕히 가세요.', zh: '再见（请慢走）。', correct: false },
      ],
      explain: '班长自我介绍完，对称回应：招呼 + 名字+예요 + 잘 부탁드려요',
    },
    {
      type: 'dialogue',
      id: 'd06-sc-d2',
      lines: [
        { speaker: 'Junho', ko: 'KPOP 좋아해요?', zh: '喜欢 KPOP 吗？' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아니요, 몰라요.', zh: '不，不知道。', correct: false },
        { ko: '네, 정말 좋아해요.', zh: '是的，真的很喜欢。', correct: true },
        { ko: 'KPOP은 뭐예요?', zh: 'KPOP 是什么？', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', correct: false },
      ],
      explain: 'Junho 的应援棒都掏出来了，同好间承认+加强度：네 + 정말 좋아해요',
    },
    {
      type: 'dialogue',
      id: 'd06-sc-d3',
      lines: [
        { speaker: 'Junho', ko: '제가 좋아하는 그룹, 중국 멤버 4명이에요.', zh: '我喜欢的团，4 个中国成员。' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '어? 저도 팬이에요!', zh: '哎？我也是粉丝！', correct: true },
        { ko: '아니요, 저는 안 좋아해요.', zh: '不，我不喜欢。', correct: false },
        { ko: '이름이 뭐예요?', zh: '你叫什么？', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', correct: false },
      ],
      explain: '发现同好用 어? + 저도(我也) + 팬이에요。팬 有收音 ㄴ → 이에요',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd06-sc-c1',
      ko: '중국 사람이에요?',
      promptZh: '这句话在什么场景最自然？',
      choices: [
        { zh: '初次见面问对方国籍', correct: true },
        { zh: '告诉别人自己是中国人', correct: false },
        { zh: '问对方吃什么', correct: false },
        { zh: '道歉时表达歉意', correct: false },
      ],
      explain: '陈述句 사람이에요（是XX人）+ 升调 + ？ = 疑问句。同学间/初见用 이에요? 最自然',
    },
    {
      type: 'context',
      id: 'd06-sc-c2',
      ko: 'KPOP 좋아해요.',
      promptZh: '关于这句话的用法，哪个描述最准确？',
      choices: [
        { zh: '좋아해요 是动词（喜欢），前面用 을/를：KPOP을 좋아해요 更完整', correct: true },
        { zh: '좋아해요 是形容词（好），前面用 이/가：KPOP이 좋아해요 更完整', correct: false },
        { zh: '좋아해요 只能对朋友用，对长辈要用 좋습니다', correct: false },
        { zh: '좋아해요 是过去时（喜欢过）', correct: false },
      ],
      explain: '좋아하다=动词=用 을/를。跟 좋다（形容词=用 이/가）是一对高频翻车点',
    },
  ],
};
