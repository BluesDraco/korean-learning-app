import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 61 · 3-2 귀 트이기 · ~처럼 / ~같이 · 高级班第一天 */
export const day61Listen: ListenSubQuestData = {
  day: 1, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '大讲堂 401 · Danielle 完美得不真实',

  meaning: [
    { id: 'd61-l2-m1', audioKo: '누가 답할래요?',                         choices: [{ text: '谁来答？',                        correct: true }, { text: '谁来提问？',              correct: false }, { text: '谁没听懂？',                correct: false }, { text: '谁想休息？',                correct: false }], explain: '火鹤老师课堂提问 · ~ㄹ래요' },
    { id: 'd61-l2-m2', audioKo: '다니엘 씨는 원어민처럼 발음해요.',       choices: [{ text: 'Danielle 发音像母语者。',        correct: true }, { text: 'Danielle 想成为母语者。',  correct: false }, { text: 'Danielle 教母语者发音。',   correct: false }, { text: 'Danielle 不是母语者。',    correct: false }], explain: 'Day 61 主题句 · N + 처럼' },
    { id: 'd61-l2-m3', audioKo: '실력 차이가 너무 커요.',                 choices: [{ text: '实力差距太大。',                  correct: true }, { text: '实力都一样。',            correct: false }, { text: '实力没有差别。',            correct: false }, { text: '实力还没测。',              correct: false }], explain: 'Tori 内心 · 차이 + 크다' },
    { id: 'd61-l2-m4', audioKo: '문법 하나도 안 틀렸어요.',               choices: [{ text: '语法一处都没错。',                correct: true }, { text: '语法全错了。',            correct: false }, { text: '语法有一处错。',            correct: false }, { text: '不知道语法。',              correct: false }], explain: 'Danielle 表现 · 하나도 안 + V' },
    { id: 'd61-l2-m5', audioKo: '각자 속도가 있어요.',                     choices: [{ text: '各自有自己的节奏。',              correct: true }, { text: '大家速度都一样。',        correct: false }, { text: '没有节奏。',                correct: false }, { text: '要跟上速度。',              correct: false }], explain: '火鹤老师安慰 · 각자 + 名词' },
  ],

  cloze: [
    { id: 'd61-l2-c1', audioKo: '다니엘 씨는 원어민처럼 발음해요.',       clozeParts: ['다니엘 씨는 원어민', ' 발음해요.'],   choices: [{ text: '처럼',   correct: true }, { text: '같다',     correct: false }, { text: '보다',   correct: false }, { text: '한테',   correct: false }], explain: 'N + **처럼** + V = 像 N 一样' },
    { id: 'd61-l2-c2', audioKo: '눈이 별처럼 빛나요.',                     clozeParts: ['눈이 별', ' 빛나요.'],                choices: [{ text: '처럼',   correct: true }, { text: '이',      correct: false }, { text: '에서',   correct: false }, { text: '으로',   correct: false }], explain: '별（星）无 받침 → 별처럼' },
    { id: 'd61-l2-c3', audioKo: '한국 사람같이 자연스러워요.',             clozeParts: ['한국 사람', ' 자연스러워요.'],        choices: [{ text: '같이',   correct: true }, { text: '이',      correct: false }, { text: '에게',   correct: false }, { text: '한테',   correct: false }], explain: 'N + **같이** = 처럼 同义（~같이 常用于口语）' },
    { id: 'd61-l2-c4', audioKo: '아이처럼 웃었어요.',                       clozeParts: ['아이', ' 웃었어요.'],                 choices: [{ text: '처럼',   correct: true }, { text: '이',      correct: false }, { text: '한테',   correct: false }, { text: '으로',   correct: false }], explain: '아이 + 처럼 = 像小孩一样' },
  ],

  reply: [
    { id: 'd61-l2-r1', audioKo: '누가 답할래요?',                                          promptZh: '火鹤老师提问，你还没准备好想说"我等等再答"，最自然的一句？',                    choices: [{ text: '조금만 생각할 시간을 주세요.',                                correct: true }, { text: '얼마예요?',                          correct: false }, { text: '몰라요, 안 할래요.',                    correct: false }, { text: '싫어요.',                                correct: false }], explain: '正式请求延时 · ~을/를 주세요' },
    { id: 'd61-l2-r2', audioKo: '다니엘 씨는 정말 대단해요.',                              promptZh: 'Junho 感叹 Danielle 厉害。你想温柔说"她像母语者"，最自然的一句？',              choices: [{ text: '네, 다니엘 씨는 원어민처럼 말해요.',                          correct: true }, { text: '아니에요, 다니엘 씨는 못해요.',      correct: false }, { text: '몰라요.',                                correct: false }, { text: '얼마예요?',                              correct: false }], explain: '~처럼 + V 认同评价' },
    { id: 'd61-l2-r3', audioKo: '토리 씨도 60일 전보다 정말 많이 늘었어요.',              promptZh: '火鹤老师安慰你。你想说"我会继续努力"，最自然的一句？',                        choices: [{ text: '네, 저도 계속 노력할게요.',                                    correct: true }, { text: '저는 이제 안 할래요.',              correct: false }, { text: '다니엘 씨가 최고예요.',                 correct: false }, { text: '얼마예요?',                              correct: false }], explain: '正式承诺 · ~ㄹ게요' },
  ],
};
