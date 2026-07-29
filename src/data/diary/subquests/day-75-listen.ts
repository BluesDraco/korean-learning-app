import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 75 · 3-2 귀 트이기 · ~았/었을 텐데 · 부산 迷路·独立问路 */
export const day75Listen: ListenSubQuestData = {
  day: 15, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '부산 골목 · 길을 잃었지만 스스로 찾았어요',

  meaning: [
    { id: 'd75-l2-m1', audioKo: '75일 전이었으면 울고 있었을 텐데.',                          choices: [{ text: '75天前的话本该在哭的。',                  correct: true }, { text: '75天前哭了。',                      correct: false }, { text: '现在在哭。',                        correct: false }, { text: '不会哭。',                          correct: false }], explain: '~았/었을 텐데 · 过去反事实（本该哭，但没哭）' },
    { id: 'd75-l2-m2', audioKo: '광복동 지하철역 어디예요?',                                    choices: [{ text: '光复洞地铁站在哪？',                      correct: true }, { text: '光复洞远吗？',                      correct: false }, { text: '这是光复洞吗？',                    correct: false }, { text: '光复洞怎么样？',                    correct: false }], explain: '问路 · 어디예요?' },
    { id: 'd75-l2-m3', audioKo: '표준어로 한 번만 더 부탁드려도 될까요?',                        choices: [{ text: '能用标准语再说一次吗？',                  correct: true }, { text: '请说方言。',                        correct: false }, { text: '我听懂了。',                        correct: false }, { text: '不用说了。',                        correct: false }], explain: '표준어 · 礼貌请求 ~아도 될까요?' },
    { id: 'd75-l2-m4', audioKo: '두려움을 스스로 극복했어요.',                                   choices: [{ text: '自己克服了恐惧。',                        correct: true }, { text: '很害怕。',                          correct: false }, { text: '有人帮我克服。',                    correct: false }, { text: '没能克服。',                        correct: false }], explain: '스스로 + 극복하다' },
    { id: 'd75-l2-m5', audioKo: '이번엔 침착하게 길을 찾았어요.',                                 choices: [{ text: '这次沉着地找到了路。',                    correct: true }, { text: '这次又迷路了。',                    correct: false }, { text: '这次很慌张。',                      correct: false }, { text: '这次哭了。',                        correct: false }], explain: '침착하게 + 길을 찾다' },
  ],

  cloze: [
    { id: 'd75-l2-c1', audioKo: '75일 전이었으면 울고 있었을 텐데.',   clozeParts: ['75일 전이었으면 울고 ', '.'],   choices: [{ text: '있었을 텐데', correct: true }, { text: '있어요',    correct: false }, { text: '있겠어요',    correct: false }, { text: '있더라고요', correct: false }], explain: '~았/었을 텐데 · 过去反事实' },
    { id: 'd75-l2-c2', audioKo: '혼자였으면 당황했을 텐데.',           clozeParts: ['혼자였으면 ', '.'],             choices: [{ text: '당황했을 텐데', correct: true }, { text: '당황해요',  correct: false }, { text: '당황할래요',  correct: false }, { text: '당황하세요', correct: false }], explain: '조건 ~았으면 + 결과 ~았을 텐데' },
    { id: 'd75-l2-c3', audioKo: '표준어로 부탁드렸어요.',              clozeParts: ['', '로 부탁드렸어요.'],         choices: [{ text: '표준어',     correct: true }, { text: '사투리',    correct: false }, { text: '중국어',      correct: false }, { text: '영어',      correct: false }], explain: '표준어 · 用标准语拜托' },
    { id: 'd75-l2-c4', audioKo: '스스로 길을 찾았어요.',                clozeParts: ['스스로 ', ' 찾았어요.'],       choices: [{ text: '길을',       correct: true }, { text: '길이',      correct: false }, { text: '길에',        correct: false }, { text: '길은',      correct: false }], explain: '길을 찾다 · 宾格 을' },
  ],

  reply: [
    { id: 'd75-l2-r1', audioKo: '혼자 길 찾았어? 안 무서웠어?',                                  promptZh: 'Junho 问你一个人找到路了吗、怕不怕。你想说"75天前的话本该哭的，现在会问路了"，最自然的一句？',                choices: [{ text: '75일 전이었으면 울었을 텐데. 이젠 물어봐.',                                          correct: true }, { text: '몰라.',                                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어.',                                  correct: false }], explain: '반말 + ~았을 텐데 · 成长报告' },
    { id: 'd75-l2-r2', audioKo: '사투리 알아들었어?',                                            promptZh: '朋友问你听懂方言了吗。你想说"没全懂，请她用标准语再说了一次"，最自然的一句？',                    choices: [{ text: '반만 알아들어서 표준어로 다시 부탁했어.',                                          correct: true }, { text: '다 사투리로 대답했어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '표준어로 + 부탁하다' },
    { id: 'd75-l2-r3', audioKo: '이제 혼자서도 괜찮겠다?',                                        promptZh: 'Haru 说你现在一个人也没问题了吧。你想说"嗯，自己克服了恐惧"，最自然的一句？',                        choices: [{ text: '응, 두려움을 스스로 극복했어.',                                  correct: true }, { text: '아니, 아직도 무서워.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '스스로 + 극복하다' },
  ],
};
