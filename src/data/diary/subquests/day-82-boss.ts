import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 82 · 3-5 Boss 战 · 🎒 兽尔江大桥·和好 · 双主题 은/는 + ~지만 */
export const day82Boss: BossSubQuestData = {
  day: 22, level: 'advanced', idx: 5, kind: 'boss',
  koTitle: '화해의 관문',
  subtitle: '🎒 한강 다리 · 먼저 내민 손 · 시적 대비',

  intro: '周五傍晚。兽尔江大桥南端,Minji 竟然比你还早到。三天冷战后的第一句话很轻。你先开口道歉,Minji 也道歉。风很大,她说"너 변했어. 예전엔 안 먼저 왔잖아"。你说在韩国学会了拿出勇气——自尊心哪有友情大。今天要用双主题 은/는 + ~지만 说出这一刻:바람은 세지만 안은 따뜻해 → 몸은 지쳤지만 기분은 좋아 → 말은 짧지만 진심은 깊어。',
  outroHook: '你们在桥上抱在一起,风依然很大,怀里是热的。"토리, 진짜 컸다"——今天又是这句,但这次不一样,因为是你先走的那一步。明天,Haru 要告诉你一个藏了很久的真相——她为什么会在 Day 7 的地铁里帮你。（Day 83 · 하루의 진짜 이야기）',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd82-b5-t1', audioKo: '바람은 세지만 안은 따뜻해요.',                                            choices: [{ text: '风大但拥抱温暖。',                    correct: true }, { text: '风小拥抱也冷。',                  correct: false }, { text: '没风也不暖。',              correct: false }, { text: '风暖拥抱冷。',              correct: false }], explain: 'Day 82 诗意句 · 双主题 은/는 + ~지만' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd82-b5-t2', audioKo: '한국에서 용기 내는 법을 배웠어요.',                                        choices: [{ text: '在韩国学到了鼓起勇气的方法。',                    correct: true }, { text: '在韩国忘了勇气。',                  correct: false }, { text: '没学到勇气。',                    correct: false }, { text: '不需要勇气。',                  correct: false }], explain: '한국에서 + 용기 내는 법을 배우다' } },
    { type: 'choice',  label: '双主题 은/는', task: { id: 'd82-b5-t3', promptZh: '"风大但拥抱温暖"（诗意对比）哪句最自然？',                                                                                                                                    choices: [{ text: '바람이 세지만 안이 따뜻해.',                     correct: false }, { text: '바람은 세지만 안은 따뜻해.',        correct: true }, { text: '바람을 세지만 안을 따뜻해.',              correct: false }, { text: '바람에 세지만 안에 따뜻해.',                 correct: false }], explain: '对比主题用 은/는(바람은…안은)' } },
    { type: 'choice',  label: '~지만',        task: { id: 'd82-b5-t4', promptZh: '"身累但心情好"哪句正确？',                                                                                                                                    choices: [{ text: '몸은 지쳐지만 기분은 좋아요.',                          correct: false }, { text: '몸은 지쳤지만 기분은 좋아요.',    correct: true }, { text: '몸은 지치지만 기분은 좋아요.',                    correct: false }, { text: '몸은 지쳤으면 기분은 좋아요.',                    correct: false }], explain: '过去 + 지만 · 지쳤지만' } },
    { type: 'choice',  label: '认词',         task: { id: 'd82-b5-t5', promptKo: '용기',    promptHangul: 'yong-gi',                                                                                                                             choices: [{ text: '勇气',                    correct: true }, { text: '义气',                            correct: false }, { text: '力气',                            correct: false }, { text: '运气',                              correct: false }], explain: 'Day 1 妈妈胡萝卜上的两个字' } },
    { type: 'compose', label: '组句',         task: { id: 'd82-b5-t6', zhHint: '风大但拥抱温暖。',                                                                                                                                            audioKo: '바람은 세지만 안은 따뜻해.',                            answer: ['바람은', '세지만', '안은', '따뜻해.'],   tokens: ['바람은', '세지만', '안은', '따뜻해.', '바람이', '안이', '차가워.'],         explain: '双主题 은/는 + ~지만' } },
    { type: 'compose', label: '组句',         task: { id: 'd82-b5-t7', zhHint: '话短但真心深。',                                                                                                                                            audioKo: '말은 짧지만 진심은 깊어요.',                          answer: ['말은', '짧지만', '진심은', '깊어요.'],                              tokens: ['말은', '짧지만', '진심은', '깊어요.', '말이', '진심이', '얕아요.'],           explain: '말은 … 진심은 · 双主题' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd82-b5-t8', promptZh: 'Minji 说你真长大了。你想认真回一句关于两人友情的话，最自然的一句？',                                                                                            choices: [{ text: '앞으로도 이런 걸로 냉전하지 말자. 서로 먼저 가자.',       correct: true }, { text: '이번엔 내가 컸어. 다음엔 네 차례야.',                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                correct: false }], explain: '~지 말자 + ~자 · 约定' } },
  ],
};
