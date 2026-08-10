import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 89 · 3-2 귀 트이기 · ~은/는 아니지? · 毕业前夜聊天到天亮 */
export const day89Listen: ListenSubQuestData = {
  day: 29, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '301호 밤샘 · 이별은 아니지? · 새벽',

  meaning: [
    { id: 'd89-l2-m1', audioKo: '우리, 이별은 아니지?',                                            choices: [{ text: '我们，不是离别吧？',                correct: true }, { text: '我们离别了。',                        correct: false }, { text: '我们要离别。',                        correct: false }, { text: '我们不见面。',                        correct: false }], explain: '~은/는 아니지? · 柔和确认' },
    { id: 'd89-l2-m2', audioKo: '이별은 없어. 계속 이어져 있을 거야.',                            choices: [{ text: '没有离别，会一直相连的。',          correct: true }, { text: '离别开始了。',                        correct: false }, { text: '我们断开了。',                        correct: false }, { text: '不能相连。',                          correct: false }], explain: 'Haru 的凌晨回答' },
    { id: 'd89-l2-m3', audioKo: '결국 우리 밤샘했어.',                                            choices: [{ text: '结果我们通宵了。',                  correct: true }, { text: '我们早睡了。',                        correct: false }, { text: '我们没聊天。',                        correct: false }, { text: '我们午睡了。',                        correct: false }], explain: '밤샘하다 · 通宵' },
    { id: 'd89-l2-m4', audioKo: '이 이야기는 우리 넷의 뼈대야.',                                  choices: [{ text: '这故事是我们四个的骨架。',          correct: true }, { text: '这故事不重要。',                      correct: false }, { text: '这是别人的故事。',                    correct: false }, { text: '故事讲完了。',                        correct: false }], explain: '뼈대 · 隐喻 · 根本' },
    { id: 'd89-l2-m5', audioKo: '새벽 6시에 해가 떴어.',                                          choices: [{ text: '凌晨6点太阳升起了。',              correct: true }, { text: '晚上6点天黑了。',                    correct: false }, { text: '中午太阳最大。',                      correct: false }, { text: '一整天没出太阳。',                    correct: false }], explain: '새벽 · 凌晨' },
  ],

  cloze: [
    { id: 'd89-l2-c1', audioKo: '우리, 이별은 아니지?',        clozeParts: ['우리, 이별', ' 아니지?'],         choices: [{ text: '은',        correct: true }, { text: '이',        correct: false }, { text: '을',        correct: false }, { text: '에',        correct: false }], explain: '有收音 · 이별은' },
    { id: 'd89-l2-c2', audioKo: '우리, 이별은 아니지?',        clozeParts: ['우리, 이별은 ', '?'],             choices: [{ text: '아니지',    correct: true }, { text: '맞지',      correct: false }, { text: '이지',      correct: false }, { text: '있지',      correct: false }], explain: '아니지? · 确认否定' },
    { id: 'd89-l2-c3', audioKo: '오해는 아니에요?',            clozeParts: ['오해', ' 아니에요?'],             choices: [{ text: '는',        correct: true }, { text: '은',        correct: false }, { text: '가',        correct: false }, { text: '를',        correct: false }], explain: '无收音 · 오해는' },
    { id: 'd89-l2-c4', audioKo: '계속 이어져 있을 거야.',       clozeParts: ['계속 ', ' 있을 거야.'],           choices: [{ text: '이어져',    correct: true }, { text: '이어서',    correct: false }, { text: '이었어',    correct: false }, { text: '이어질',    correct: false }], explain: '이어지다 · ~어 있다' },
  ],

  reply: [
    { id: 'd89-l2-r1', audioKo: '얘기 하나씩 하고 자자. 못 자면 밤샘.',                            promptZh: 'Minji 提议每人讲一个故事，睡不着就通宵。你想爽快答应，最自然的一句？',                choices: [{ text: '좋아. 그럼 밤새 얘기하자.',                                                correct: true }, { text: '싫어, 지금 잘래.',                        correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '答应 · 밤새 얘기하자' },
    { id: 'd89-l2-r2', audioKo: '우리, 이별은 아니지?',                                            promptZh: '天快亮时你听到有人柔声这样问。你想温柔地肯定"嗯，不是离别，我们用韩语继续连着"，最自然的一句？',                    choices: [{ text: '응. 이별은 없어. 계속 한국어로 이어지자.',                                  correct: true }, { text: '응, 이제 안 만날 거야.',                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '이별은 없어 · 温柔肯定' },
    { id: 'd89-l2-r3', audioKo: '가장 소중한 순간이 언제였어?',                                    promptZh: 'Junho 问你最珍贵的瞬间是什么时候。你想说"都在这里——包括今晚这个房间"，最自然的一句？',              choices: [{ text: '다 여기 있어. 오늘 밤, 이 방까지.',                                        correct: true }, { text: '기억 안 나.',                            correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '순간 · 珍惜' },
  ],
};
