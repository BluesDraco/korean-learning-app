import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 84 · 3-2 귀 트이기 · N이/가 아니에요, N이에요/예요 · 公开演讲 */
export const day84Listen: ListenSubQuestData = {
  day: 24, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '대강당 · 용기는 큰 게 아니에요',

  meaning: [
    { id: 'd84-l2-m1', audioKo: '용기는 큰 게 아니에요. 작은 거예요.',                            choices: [{ text: '勇气不是大的，是小的。',                  correct: true }, { text: '勇气是大的。',                      correct: false }, { text: '勇气不小也不大。',                  correct: false }, { text: '大的才是勇气。',                    correct: false }], explain: 'A 아니에요 + B이에요/예요' },
    { id: 'd84-l2-m2', audioKo: '그 작은 게 저를 여기까지 데려왔어요.',                            choices: [{ text: '那小东西把我带到了这里。',                correct: true }, { text: '那大的带我走。',                    correct: false }, { text: '我自己走到这里。',                  correct: false }, { text: '没人带我来。',                      correct: false }], explain: '그 작은 게 + 데려오다' },
    { id: 'd84-l2-m3', audioKo: '방금 잠깐 잊었어요.',                                            choices: [{ text: '刚才忘了一下（词）。',                    correct: true }, { text: '一直记得。',                        correct: false }, { text: '完全没忘。',                        correct: false }, { text: '想起来了。',                        correct: false }], explain: '잊다 · 忘词' },
    { id: 'd84-l2-m4', audioKo: '실패는 끝이 아니에요. 시작이에요.',                              choices: [{ text: '失败不是终点，是起点。',                  correct: true }, { text: '失败就是终点。',                    correct: false }, { text: '成功是起点。',                      correct: false }, { text: '终点就是失败。',                    correct: false }], explain: 'A 아니에요 + B이에요' },
    { id: 'd84-l2-m5', audioKo: '원고 없이 말했어요.',                                            choices: [{ text: '不看稿子说了。',                        correct: true }, { text: '照着稿子念了。',                    correct: false }, { text: '没说话。',                          correct: false }, { text: '把稿子读完了。',                    correct: false }], explain: '원고 없이 · 即兴' },
  ],

  cloze: [
    { id: 'd84-l2-c1', audioKo: '용기는 큰 게 아니에요.',   clozeParts: ['용기는 큰 게 ', '.'],   choices: [{ text: '아니에요', correct: true }, { text: '이에요',    correct: false }, { text: '예요',    correct: false }, { text: '있어요', correct: false }], explain: '否定 · N이/가 아니에요' },
    { id: 'd84-l2-c2', audioKo: '실패는 끝이 아니에요.',   clozeParts: ['실패는 ', ' 아니에요.'],   choices: [{ text: '끝이', correct: true }, { text: '끝은',  correct: false }, { text: '끝을',    correct: false }, { text: '끝가', correct: false }], explain: '否定对象 · 끝(有收音) + 이' },
    { id: 'd84-l2-c3', audioKo: '중요한 건 언어가 아니에요.',   clozeParts: ['중요한 건 ', ' 아니에요.'], choices: [{ text: '언어가',     correct: true }, { text: '언어이',      correct: false }, { text: '언어는',      correct: false }, { text: '언어를',      correct: false }], explain: '언어(无收音) + 가 아니에요' },
    { id: 'd84-l2-c4', audioKo: '작은 거예요.',          clozeParts: ['작은 ', '.'],             choices: [{ text: '거예요', correct: true }, { text: '것예요', correct: false }, { text: '거이에요', correct: false }, { text: '게예요', correct: false }], explain: '것 → 거 + 예요' },
  ],

  reply: [
    { id: 'd84-l2-r1', audioKo: '연설 주제가 뭐였어?',                                          promptZh: 'Junho 问你演讲主题是什么。你想说"小小勇气的力量"，最自然的一句？',                choices: [{ text: '작은 용기의 힘이었어.',                                          correct: true }, { text: '몰라.',                                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어.',                                  correct: false }], explain: '主题回答' },
    { id: 'd84-l2-r2', audioKo: '중간에 잊어버렸을 때 어떻게 했어?',                                    promptZh: '朋友问你忘词时怎么办的。你想说"放下了稿子，用自己的话说"，最自然的一句？',                    choices: [{ text: '원고를 내려놓고 내 말로 했어.',                                          correct: true }, { text: '그냥 무대에서 도망갔어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '원고를 내려놓다 + 내 말로' },
    { id: 'd84-l2-r3', audioKo: '오늘 진짜 감동이었어.',                                        promptZh: '大家说很感动。你想谦逊地真心道谢，最自然的一句？',                        choices: [{ text: '들어줘서 진심으로 고마워.',                                  correct: true }, { text: '당연히 감동이지.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~아/어 줘서 고마워 · 谦逊致谢' },
  ],
};
