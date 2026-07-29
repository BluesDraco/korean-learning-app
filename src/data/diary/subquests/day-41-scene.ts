import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 41 · 2-4 상황 속으로 · 发表准备 */
export const day41Scene: SceneSubQuestData = {
  day: 11, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '深夜书桌 · 一袋火锅底料和一份 PPT',

  tasks: [
    { type: 'situation', id: 'd41-sc-s1', scenario: '你想告诉 Junho "为了介绍火锅文化在找资料"，最自然的一句？', choices: [{ ko: '훠궈 문화를 소개하기 위해서 자료를 찾고 있어.', zh: '为了介绍火锅文化在找资料。', correct: true }, { ko: '훠궈 문화를 소개할 위해서 자료를 찾고 있어.', zh: '为了介绍火锅文化在找资料。', correct: false }, { ko: '훠궈 문화 위해서 자료를 찾고 있어.', zh: '为了火锅文化在找资料。', correct: false }, { ko: '훠궈 문화를 소개기 위해서 자료를 찾고 있어.', zh: '为了介绍火锅文化在找资料。', correct: false }], explain: '동사 소개하다 → 소개하기 위해서' },
    { type: 'situation', id: 'd41-sc-s2', scenario: '自我介绍时说"为了学韩语来到韩国"，最标准的一句？', choices: [{ ko: '한국어를 배우기 위해서 한국에 왔어요.', zh: '为了学韩语来到韩国。', correct: true }, { ko: '한국어를 배웠기 위해서 한국에 왔어요.', zh: '为了学韩语来到韩国。', correct: false }, { ko: '한국어 위해서 한국에 왔어요.', zh: '为了韩语来到韩国。', correct: false }, { ko: '한국어를 배우니까 한국에 왔어요.', zh: '因为学韩语来到了韩国。', correct: false }], explain: '留学生自介固定句' },
    { type: 'situation', id: 'd41-sc-s3', scenario: '想说"为了家人努力工作"，最标准的一句？', choices: [{ ko: '가족을 위해서 열심히 일해요.', zh: '为了家人努力工作。', correct: true }, { ko: '가족기 위해서 열심히 일해요.', zh: '为了家人努力工作。', correct: false }, { ko: '가족를 위해서 열심히 일해요.', zh: '为了家人努力工作。', correct: false }, { ko: '가족 위해서 열심히 일해요.', zh: '为家人努力工作。', correct: false }], explain: '名词 + 을 위해서' },

    { type: 'dialogue', id: 'd41-sc-d1', lines: [{ speaker: '준호', ko: '토리, 발표 준비 잘 돼가?', zh: '兔莉，发表准备顺利吗？' }], blankSpeaker: '토리', choices: [{ ko: '응, 훠궈랑 KPOP의 공통점을 찾았어.', zh: '嗯，找到火锅和 KPOP 的共同点了。', correct: true }, { ko: '아니, 준비 안 했어.', zh: '不，我没准备。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: 'Tori 原句 · 自信应答' },
    { type: 'dialogue', id: 'd41-sc-d2', lines: [{ speaker: '준호', ko: '공통점이 뭔데?', zh: '共同点是什么？' }], blankSpeaker: '토리', choices: [{ ko: '"함께"야. 같이 먹고 같이 응원하는 거.', zh: '是"一起"。一起吃、一起应援。', correct: true }, { ko: '아직 몰라.', zh: '还不知道。', correct: false }, { ko: '훠궈가 더 매워.', zh: '火锅更辣。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Tori 原句 · 함께 是核心' },
    { type: 'dialogue', id: 'd41-sc-d3', lines: [{ speaker: '준호', ko: '왜 훠궈로 정했어?', zh: '为什么定火锅？' }], blankSpeaker: '토리', choices: [{ ko: '함께 먹는 문화를 소개하기 위해서.', zh: '为了介绍一起吃的文化。', correct: true }, { ko: '함께 먹는 문화 위해서.', zh: '为了一起吃的文化。', correct: false }, { ko: '함께 먹었으니까.', zh: '因为一起吃过。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '~기 위해서 表目的' },

    { type: 'context', id: 'd41-sc-c1', ko: '한국어를 배우기 위해서 한국에 왔어요.', promptZh: '这句话最适合在什么情境下说？', choices: [{ zh: '自我介绍 / 说明来韩国的目的 · 留学生固定句', correct: true }, { zh: '拒绝对方邀请', correct: false }, { zh: '感叹韩语很难', correct: false }, { zh: '道歉自己迟到', correct: false }], explain: '~기 위해서 = 目的连接' },
    { type: 'context', id: 'd41-sc-c2', ko: '~기 위해서 vs ~(으)려고', promptZh: '这两种目的表达的差别，哪句最准确？', choices: [{ zh: '~기 위해서 = 书面 / 正式 / 明确目的；~(으)려고 = 口语 / "打算" 语感', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '~(으)려고 是敬语', correct: false }, { zh: '~기 위해서 只用于过去', correct: false }], explain: '写发表用 ~기 위해서 更正式' },
  ],
};
