import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 50 · 2-5 Boss 战 · ❄️ 첫눈 */
export const day50Boss: BossSubQuestData = {
  day: 20, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '첫눈의 관문',
  subtitle: '❄️ 한빛 학원 前广场 · 韩国的第一场雪',
  intro: '18 点 20 分。放学出学院门口，天上飘下第一片雪。Haru 从旁边跳出来："토리! 첫눈이야!!" 她告诉你一个韩国传说 —— 初雪的时候许愿会成真。你闭上眼睛，广场的灯把雪照成金色。50 天前你连点单都要看词典，今晚你在异国的雪里，用韩语许了一个愿。今天要用 ~(으)면 说完传说、愿望、秘密。',
  outroHook: '雪一直下到晚上 10 点。广场的地上白了一层，你们的脚印一大一小，留在初雪上。Haru 说 "나도 하나 빌었어. 나도 비밀." 两个不肯说出口的愿望 —— 也许其中一个，是同一个。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd50-b5-t1', audioKo: '한국에서는 첫눈이 오면 소원을 빌면 이뤄진대.', choices: [{ text: '韩国说初雪时许愿会成真。',           correct: true }, { text: '韩国初雪时不能许愿。',                    correct: false }, { text: '许愿了雪就会下。',                        correct: false }, { text: '韩国不下初雪。',                          correct: false }], explain: 'Haru 传说 · 双 (으)면' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd50-b5-t2', audioKo: '비밀이야. 말하면 안 이뤄진대.',                choices: [{ text: '是秘密。说了就不灵了。',             correct: true }, { text: '不是秘密。可以说。',                      correct: false }, { text: '说了才会实现。',                          correct: false }, { text: '别说秘密。',                            correct: false }], explain: 'Tori 挡箭牌' } },
    { type: 'choice',  label: '收音判定',     task: { id: 'd50-b5-t3', promptZh: '"一到周末就睡懒觉"哪句正确？',                                                                                                        choices: [{ text: '주말면 늦잠을 자요.',                     correct: false }, { text: '주말이면 늦잠을 자요.',            correct: true }, { text: '주말으면 늦잠을 자요.',              correct: false }, { text: '주말은 늦잠을 자요.',                    correct: false }], explain: '名词 + 이면（不是动词加 으면）· 주말 有收音直接加 이면' } },
    { type: 'choice',  label: 'ㄹ 收音',      task: { id: 'd50-b5-t4', promptZh: '"许愿的话会实现"哪句正确？',                                                                                                          choices: [{ text: '소원을 빌으면 이뤄진대.',                  correct: false }, { text: '소원을 빌면 이뤄진대.',            correct: true }, { text: '소원을 빌아면 이뤄진대.',            correct: false }, { text: '소원을 빈면 이뤄진대.',                    correct: false }], explain: 'ㄹ 收音直接 + 면' } },
    { type: 'choice',  label: '认词',         task: { id: 'd50-b5-t5', promptKo: '이뤄지다', promptHangul: 'i-rwo-ji-da',                                                                                                choices: [{ text: '实现 / 成真',              correct: true }, { text: '消失',              correct: false }, { text: '实施',              correct: false }, { text: '实验',                     correct: false }], explain: '이루다 + 어지다 = 自动实现' } },
    { type: 'compose', label: '组句',         task: { id: 'd50-b5-t6', zhHint: '初雪来了许愿会成真。',                                                                                                                  audioKo: '첫눈이 오면 소원을 빌면 이뤄져.',            answer: ['첫눈이', '오면', '소원을', '빌면', '이뤄져.'],           tokens: ['첫눈이', '오면', '소원을', '빌면', '이뤄져.', '와서', '이뤄졌어', '빌었으니까', '오니까'],                    explain: '韩国传说 · 双 (으)면' } },
    { type: 'compose', label: '组句',         task: { id: 'd50-b5-t7', zhHint: '要是能说好韩语就好了。',                                                                                                                audioKo: '한국어를 잘하면 좋겠어요.',                    answer: ['한국어를', '잘하면', '좋겠어요.'],                        tokens: ['한국어를', '잘하면', '좋겠어요.', '잘하는', '한국어가', '좋아요.', '잘하고'],                                explain: '~(으)면 좋겠어요 愿望' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd50-b5-t8', promptZh: 'Haru 问 "뭐 빌었어?"。你不想说，最自然的一句？',                                                                                    choices: [{ text: '비밀이야. 말하면 안 이뤄진대.',              correct: true }, { text: '나도 몰라.',                              correct: false }, { text: '너 먼저 말해.',                          correct: false }, { text: '얼마예요?',                              correct: false }], explain: 'Tori 原句 · 借传说挡回' } },
  ],
};
