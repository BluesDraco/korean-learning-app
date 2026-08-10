import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 57 · 2-2 귀 트이기 · 편지 문체 · 반사실적 가정 */
export const day57Listen: ListenSubQuestData = {
  day: 27, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '手机屏幕两端 · 三个回信',

  meaning: [
    { id: 'd57-l2-m1', audioKo: '토리… 우리 진짜 오래 됐다. 나도 고마워.',       choices: [{ text: '兔莉……我们真的认识很久了。我也谢谢你。', correct: true }, { text: '兔莉，很久没见。',                        correct: false }, { text: '兔莉，谢谢我一下。',                        correct: false }, { text: '我们才认识不久。',                          correct: false }], explain: 'Minji 回信' },
    { id: 'd57-l2-m2', audioKo: '편지 잘 읽었어! 답장 3장 썼어.',                    choices: [{ text: '信读了！我回了 3 页！',              correct: true }, { text: '没读你的信。',                            correct: false }, { text: '3 页信太长了。',                          correct: false }, { text: '写了一页答复。',                          correct: false }], explain: 'Junho 兴奋回信' },
    { id: 'd57-l2-m3', audioKo: '고마워. 나도.',                                    choices: [{ text: '谢谢。我也是。',                    correct: true }, { text: '谢谢。不用。',                            correct: false }, { text: '谢什么。别客气。',                        correct: false }, { text: '现在没事。',                              correct: false }], explain: 'Haru 两字回信' },
    { id: 'd57-l2-m4', audioKo: '너 없었으면 나 아직 뒤에서 앉아 있었을 거야.',      choices: [{ text: '没有你我还坐在教室后面。',        correct: true }, { text: '有你我坐在后面。',                        correct: false }, { text: '你还坐在后面。',                          correct: false }, { text: '你和我一起坐后面。',                        correct: false }], explain: '반사실적 가정 · ~았/었으면 ... ~았/었을 거야' },
    { id: 'd57-l2-m5', audioKo: '서두르지 않을게. 언제든 괜찮아.',                    choices: [{ text: '不催你。什么时候都行。',            correct: true }, { text: '快点告诉我。',                            correct: false }, { text: '不用等我。',                              correct: false }, { text: '我今天有空。',                          correct: false }], explain: 'Tori 温柔承诺' },
  ],

  cloze: [
    { id: 'd57-l2-c1', audioKo: '민지에게 편지를 썼어요.',           clozeParts: ['민지', ' 편지를 썼어요.'],           choices: [{ text: '에게',   correct: true }, { text: '께',       correct: false }, { text: '에서', correct: false }, { text: '한테서', correct: false }], explain: '平辈书信开头 · ~에게' },
    { id: 'd57-l2-c2', audioKo: '서두르지 않을게.',                    clozeParts: ['서두르지 ', '.'],                   choices: [{ text: '않을게', correct: true }, { text: '않을 거야', correct: false }, { text: '안 해요', correct: false }, { text: '못 해',   correct: false }], explain: '~지 않을게 承诺不做' },
    { id: 'd57-l2-c3', audioKo: '너 없었으면 나 아직 뒤에서 앉아 있었을 거야.', clozeParts: ['너 없었으면 나 아직 뒤에서 앉아 ', '.'], choices: [{ text: '있었을 거야', correct: true }, { text: '있어',   correct: false }, { text: '있어요',   correct: false }, { text: '있을 거야', correct: false }], explain: '반사실적 가정 · ~았/었을 거야' },
    { id: 'd57-l2-c4', audioKo: '준호는 멈출 줄 몰라.',                 clozeParts: ['준호는 멈출 줄 ', '.'],             choices: [{ text: '몰라',   correct: true }, { text: '알아',     correct: false }, { text: '있어',   correct: false }, { text: '없어',     correct: false }], explain: '~ㄹ 줄 모르다 = 不会 / 不懂' },
  ],

  reply: [
    { id: 'd57-l2-r1', audioKo: '토리… 우리 진짜 오래 됐다. 나도 고마워.',   promptZh: 'Minji 感激地回。你想深情回应"没有你我还坐在教室后面"，最自然的一句？', choices: [{ text: '너 없었으면 나 아직 뒤에서 앉아 있었을 거야.',                    correct: true }, { text: '나 이제 필요 없어.',                        correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: 'Tori 深情' },
    { id: 'd57-l2-r2', audioKo: '편지 잘 읽었어! 답장 3장 썼어.',              promptZh: 'Junho 说他回了 3 页。你想温柔调侃"Junho 一说 KPOP 就停不下来"，最自然的一句？', choices: [{ text: '3장이나?! 준호는 KPOP 얘기하면 멈출 줄 몰라 진짜.',                    correct: true }, { text: '읽지 마.',                              correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '멈출 줄 모르다 惯用' },
    { id: 'd57-l2-r3', audioKo: '고마워. 나도.',                                promptZh: 'Haru 只回了两字。你想温柔回"不催你。什么时候都行"，最自然的一句？', choices: [{ text: '서두르지 않을게. 언제든 괜찮아.',                                    correct: true }, { text: '왜 두 글자만 써?',                          correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어.',                                  correct: false }], explain: 'Tori 原句 · 温柔承诺' },
  ],
};
