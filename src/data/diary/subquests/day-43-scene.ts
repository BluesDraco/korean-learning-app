import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 43 · 2-4 상황 속으로 · 노래방 */
export const day43Scene: SceneSubQuestData = {
  day: 13, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '弘爪街 코인 노래방 3 号房',

  tasks: [
    { type: 'situation', id: 'd43-sc-s1', scenario: 'Haru 递给你麦克风说"随便唱一首试试"（반말），最自然的一句？', choices: [{ ko: '뭐라도 한번 불러 봐.', zh: '随便唱一首试试。', correct: true }, { ko: '뭐라도 한번 부르어 봐.', zh: '随便唱一首试试。', correct: false }, { ko: '뭐라도 한번 부르 봐.', zh: '随便唱一首试试。', correct: false }, { ko: '뭐라도 한번 부러 봐.', zh: '随便唱一首试试。', correct: false }], explain: 'Haru 原句 · 르 不规则' },
    { type: 'situation', id: 'd43-sc-s2', scenario: '你想告诉朋友"试过韩国料理"，最标准的一句？', choices: [{ ko: '한국 음식을 먹어 봤어요.', zh: '试过韩国料理。', correct: true }, { ko: '한국 음식을 먹었어요.', zh: '吃了韩国料理。', correct: false }, { ko: '한국 음식을 먹어 봐요.', zh: '尝尝韩国料理。', correct: false }, { ko: '한국 음식을 먹고 봤어요.', zh: '吃过韩国料理。', correct: false }], explain: '~아/어 봤어요 表尝试经验' },
    { type: 'situation', id: 'd43-sc-s3', scenario: '店员想推荐一道菜，"请尝尝这个"最自然的一句？', choices: [{ ko: '이거 한번 먹어 보세요.', zh: '请尝尝这个。', correct: true }, { ko: '이거 한번 먹어요.', zh: '吃一下这个。', correct: false }, { ko: '이거 한번 먹었어요.', zh: '尝过这个了。', correct: false }, { ko: '이거 한번 먹으세요.', zh: '请吃一下这个。', correct: false }], explain: '~아/어 보세요 = 邀请尝试' },

    { type: 'dialogue', id: 'd43-sc-d1', lines: [{ speaker: '준호', ko: '내가 먼저 부를게. 잘 봐!', zh: '我先唱。看好了！' }], blankSpeaker: '토리', choices: [{ ko: '오케이, 준호 진짜 멋있어!', zh: '好，Junho 真帅！', correct: true }, { ko: '싫어.', zh: '不要。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: '적극적 응답 + 멋있다 夸赞' },
    { type: 'dialogue', id: 'd43-sc-d2', lines: [{ speaker: '하루', ko: '토리, 뭐라도 한번 불러 봐.', zh: '兔莉，随便唱一首试试。' }], blankSpeaker: '토리', choices: [{ ko: '떨려. 근데 한번 불러 볼래.', zh: '好紧张……但今天想试试。', correct: true }, { ko: '싫어, 안 불러.', zh: '不要，我不唱。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워.', zh: '很高兴认识你。', correct: false }], explain: '떨려 + ~아/어 볼래' },
    { type: 'dialogue', id: 'd43-sc-d3', lines: [{ speaker: '준호', ko: '토리, 실력 진짜 늘었네!', zh: '兔莉，实力真的进步了！' }], blankSpeaker: '토리', choices: [{ ko: '고마워. 한 곡 더 불러 볼래.', zh: '谢谢。再唱一首试试。', correct: true }, { ko: '이제 집에 갈래.', zh: '我要回家了。', correct: false }, { ko: '내가 못 해.', zh: '我做不到。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '谢谢 + 再试一首' },

    { type: 'context', id: 'd43-sc-c1', ko: '한번 불러 봐.', promptZh: '这句话最适合在什么情境下说？', choices: [{ zh: '朋友之间**鼓励尝试** · 반말命令 + 尝试语感', correct: true }, { zh: '拒绝对方邀请', correct: false }, { zh: '道歉自己没唱', correct: false }, { zh: '感叹别人唱得好', correct: false }], explain: '~아/어 봐 = 试试看 · 반말鼓励' },
    { type: 'context', id: 'd43-sc-c2', ko: '~아/어 봤어요 vs ~았/었어요', promptZh: '这两种过去表达的差别，哪句最准确？', choices: [{ zh: '~아/어 봤어요 = 尝过 / 有过经验；~았/었어요 = 单纯做了这件事', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '~아/어 봤어요 是敬语', correct: false }, { zh: '~았/었어요 是命令形', correct: false }], explain: '먹었어요 vs 먹어 봤어요' },
  ],
};
