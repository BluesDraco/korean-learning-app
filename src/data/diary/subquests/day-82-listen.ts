import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 82 · 3-2 귀 트이기 · 双主题 은/는 + ~지만 · 兽尔江大桥和好 */
export const day82Listen: ListenSubQuestData = {
  day: 22, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '한강 다리 · 바람은 세지만 안은 따뜻해',

  meaning: [
    { id: 'd82-l2-m1', audioKo: '바람은 세지만 안은 따뜻해요.',                                  choices: [{ text: '风大但拥抱温暖。',                        correct: true }, { text: '风小拥抱也冷。',                    correct: false }, { text: '没有风也不暖。',                    correct: false }, { text: '风暖拥抱冷。',                      correct: false }], explain: '双主题 은/는 + ~지만' },
    { id: 'd82-l2-m2', audioKo: '너 변했어. 예전엔 안 먼저 왔잖아.',                              choices: [{ text: '你变了。以前不会先来。',                  correct: true }, { text: '你没变。以前也先来。',              correct: false }, { text: '你变差了。',                        correct: false }, { text: '别先来。',                          correct: false }], explain: 'Minji 的洞察 · 변하다 + ~잖아' },
    { id: 'd82-l2-m3', audioKo: '한국에서 용기 내는 법을 배웠어요.',                              choices: [{ text: '在韩国学到了鼓起勇气的方法。',            correct: true }, { text: '在韩国忘了勇气。',                  correct: false }, { text: '没学到勇气。',                      correct: false }, { text: '不需要勇气。',                      correct: false }], explain: '한국에서 + 용기 내는 법을 배우다' },
    { id: 'd82-l2-m4', audioKo: '자존심보다 우정이 커요.',                                        choices: [{ text: '友情比自尊大。',                        correct: true }, { text: '自尊比友情大。',                    correct: false }, { text: '两个一样。',                        correct: false }, { text: '都不重要。',                        correct: false }], explain: '~보다 · 比较' },
    { id: 'd82-l2-m5', audioKo: '몸은 지쳤지만 기분은 좋아요.',                                    choices: [{ text: '身累但心情好。',                        correct: true }, { text: '身体好但心情差。',                  correct: false }, { text: '又累又不开心。',                    correct: false }, { text: '不累也不开心。',                    correct: false }], explain: '双主题 은/는 + ~지만' },
  ],

  cloze: [
    { id: 'd82-l2-c1', audioKo: '바람은 세지만 안은 따뜻해요.',   clozeParts: ['바람은 세지만 ', ' 따뜻해요.'],   choices: [{ text: '안은', correct: true }, { text: '안이',    correct: false }, { text: '안을',    correct: false }, { text: '안에', correct: false }], explain: '对比主题 은/는 · 안은' },
    { id: 'd82-l2-c2', audioKo: '몸은 지쳤지만 기분은 좋아요.',   clozeParts: ['몸은 ', ' 기분은 좋아요.'],   choices: [{ text: '지쳤지만', correct: true }, { text: '지쳐지만',  correct: false }, { text: '지치지만',    correct: false }, { text: '지쳤으면', correct: false }], explain: '过去 + 지만 · 지쳤지만' },
    { id: 'd82-l2-c3', audioKo: '한국에서 용기 내는 법을 배웠어요.',   clozeParts: ['한국', ' 용기 내는 법을 배웠어요.'], choices: [{ text: '에서',     correct: true }, { text: '에',      correct: false }, { text: '을',      correct: false }, { text: '으로',      correct: false }], explain: '动作地点 ~에서' },
    { id: 'd82-l2-c4', audioKo: '자존심보다 우정이 커요.',          clozeParts: ['자존심', ' 우정이 커요.'],             choices: [{ text: '보다', correct: true }, { text: '처럼', correct: false }, { text: '마다', correct: false }, { text: '밖에', correct: false }], explain: '~보다 · 比较' },
  ],

  reply: [
    { id: 'd82-l2-r1', audioKo: '너 변했어. 예전엔 안 먼저 왔잖아.',                                          promptZh: 'Minji 说你变了、以前不会主动。你想说"在韩国学会了鼓起勇气"，最自然的一句？',                choices: [{ text: '한국에서 용기 내는 법을 배웠어. 자존심보다 우정이 크잖아.',                                          correct: true }, { text: '아니, 하나도 안 변했어.',                                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어.',                                  correct: false }], explain: '용기 내는 법 + ~잖아' },
    { id: 'd82-l2-r2', audioKo: '안 추워?',                                    promptZh: 'Minji 问你冷不冷（桥上风大）。你想说"风大但拥抱温暖"，最自然的一句？',                    choices: [{ text: '바람은 세지만 안은 따뜻해.',                                          correct: true }, { text: '바람도 없고 안도 차가워.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '双主题 은/는 + ~지만' },
    { id: 'd82-l2-r3', audioKo: '토리, 진짜 컸다.',                                        promptZh: 'Minji 说你真长大了。你想说"以后别再为这种事冷战，互相先低头"，最自然的一句？',                        choices: [{ text: '앞으로 이런 걸로 냉전하지 말자. 서로 먼저 가자.',                                  correct: true }, { text: '다음엔 네가 먼저 사과해.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~지 말자 + ~자 · 提议' },
  ],
};
