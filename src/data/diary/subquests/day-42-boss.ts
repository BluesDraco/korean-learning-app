import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 42 · 2-5 Boss 战 · 🎤 讲台上的火锅 */
export const day42Boss: BossSubQuestData = {
  day: 12, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '발표의 관문',
  subtitle: '🎤 「함께의 맛」5 分钟',
  intro: '教室灯亮着。你把火锅底料袋放在讲台上当道具，深吸一口气 —— "안녕하세요, 오늘은 중국 훠궈 문화를 소개하겠습니다." 5 分钟里要说清 "함께" 是什么、火锅和 KPOP 有什么共同点，然后用 "들어주셔서 감사합니다" 收尾。Danielle 坐在最后一排，第一次露出笑容。',
  outroHook: '掌声响起来。Junho 冲上来撞你肩膀："와, 진짜 대박이었어!" Danielle 走过你身边，轻声说了一句 "잘했어요, 토리씨." 你合上 PPT 的时候 —— 那袋剩下的火锅底料，好像变得有点重量。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd42-b5-t1', audioKo: '함께 먹으면 훠궈, 함께 응원하면 콘서트.', choices: [{ text: '一起吃就是火锅，一起应援就是演唱会。', correct: true }, { text: '吃火锅去演唱会。',                    correct: false }, { text: '演唱会不能吃火锅。',              correct: false }, { text: '一起去看演唱会吃火锅。',          correct: false }], explain: '发表金句 · ~(으)면 假设对仗' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd42-b5-t2', audioKo: '들어주셔서 감사합니다.',                choices: [{ text: '感谢大家聆听。',                    correct: true }, { text: '请进来。',                                 correct: false }, { text: '请慢走。',                                 correct: false }, { text: '请再讲一遍。',                             correct: false }], explain: '发表结尾定式' } },
    { type: 'choice',  label: '收音判定',     task: { id: 'd42-b5-t3', promptZh: '"一起吃"哪句正确？',                                                                                                                choices: [{ text: '함께 먹면',                        correct: false }, { text: '함께 먹으면',                       correct: true }, { text: '함께 먹어면',                    correct: false }, { text: '함께 먹니까',                          correct: false }], explain: '먹다 有收音 → 으면' } },
    { type: 'choice',  label: 'ㄷ 不规则',    task: { id: 'd42-b5-t4', promptZh: '"听到这首歌"哪句正确？',                                                                                                              choices: [{ text: '이 노래를 듣으면',                  correct: false }, { text: '이 노래를 들으면',                  correct: true }, { text: '이 노래를 듣면',                    correct: false }, { text: '이 노래를 듣어면',                     correct: false }], explain: 'ㄷ → ㄹ + 으면' } },
    { type: 'choice',  label: '认词',         task: { id: 'd42-b5-t5', promptKo: '핵심', promptHangul: 'haek-sim',                                                                                                     choices: [{ text: '核心',                    correct: true }, { text: '细节',            correct: false }, { text: '边缘',              correct: false }, { text: '错误',                     correct: false }], explain: '发表关键词' } },
    { type: 'compose', label: '组句',         task: { id: 'd42-b5-t6', zhHint: '一起吃就是火锅。',                                                                                                                    audioKo: '함께 먹으면 훠궈예요.',                answer: ['함께', '먹으면', '훠궈예요.'],                          tokens: ['함께', '먹으면', '훠궈예요.', '먹면', '먹어서', '먹으니까', '훠궈예'],                              explain: 'V 有收音 + 으면 · 发表金句' } },
    { type: 'compose', label: '组句',         task: { id: 'd42-b5-t7', zhHint: '如果下雨请带伞。',                                                                                                                    audioKo: '비가 오면 우산을 가져가세요.',           answer: ['비가', '오면', '우산을', '가져가세요.'],                tokens: ['비가', '오면', '우산을', '가져가세요.', '와서', '왔으면', '우산이', '가져가요.'],                    explain: '~(으)면 后可接命令' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd42-b5-t8', promptZh: 'Junho 夸你 "와, 진짜 좋은 발표였어!"。你想道谢并承认自己努力了，最自然的一句？',                                                    choices: [{ text: '고마워. 열심히 준비했어.',              correct: true }, { text: '아니야, 별로였어.',                       correct: false }, { text: '얼마예요?',                             correct: false }, { text: '싫어.',                                 correct: false }], explain: '고마워 + 열심히 준비했어' } },
  ],
};
