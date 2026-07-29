import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 66 · 3-2 귀 트이기 · N + 만 / ~기만 하다 · 狮子超市被拒 */
export const day66Listen: ListenSubQuestData = {
  day: 6, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '곰나라 마트 · 편견의 목소리',

  meaning: [
    { id: 'd66-l2-m1', audioKo: '알바 구합니다.',                                          choices: [{ text: '招兼职。',                              correct: true }, { text: '不招人。',                    correct: false }, { text: '在找路。',                    correct: false }, { text: '在找店铺。',                  correct: false }], explain: '招聘启事 · 알바 구하다' },
    { id: 'd66-l2-m2', audioKo: '너무 작아서 안 될 것 같아요.',                            choices: [{ text: '（你）太小了，可能不行。',              correct: true }, { text: '你太大了。',                  correct: false }, { text: '大小刚好。',                  correct: false }, { text: '不看大小。',                  correct: false }], explain: '狮子拒绝 · Day 66 关键台词' },
    { id: 'd66-l2-m3', audioKo: '체력이 필요한 일이라서.',                                  choices: [{ text: '这份工作需要体力。',                    correct: true }, { text: '不需要体力。',                correct: false }, { text: '体力不重要。',                correct: false }, { text: '要看体重。',                    correct: false }], explain: '狮子话术 · ~라서' },
    { id: 'd66-l2-m4', audioKo: '겉모습만 보고 이력서는 안 봐요.',                          choices: [{ text: '光看外表不看简历。',                    correct: true }, { text: '简历看得很仔细。',            correct: false }, { text: '外表和简历都看。',            correct: false }, { text: '什么都不看。',                correct: false }], explain: 'N + 만 + V + 고 = 光 N 不 V' },
    { id: 'd66-l2-m5', audioKo: '체형은 능력이 아니에요.',                                  choices: [{ text: '体型不代表能力。',                      correct: true }, { text: '体型就是能力。',              correct: false }, { text: '能力就是体型。',              correct: false }, { text: '不谈能力。',                  correct: false }], explain: 'Tori 反击 · N은/는 N이 아니다' },
  ],

  cloze: [
    { id: 'd66-l2-c1', audioKo: '체형만 봐요.',                     clozeParts: ['체형', ' 봐요.'],                choices: [{ text: '만',   correct: true }, { text: '을',    correct: false }, { text: '이',    correct: false }, { text: '에서', correct: false }], explain: 'N + **만** · 覆盖宾格 을/를' },
    { id: 'd66-l2-c2', audioKo: '멍하기만 하고 아무것도 안 해요.',   clozeParts: ['멍하', ' 하고 아무것도 안 해요.'], choices: [{ text: '기만',   correct: true }, { text: '게만',    correct: false }, { text: '서만',    correct: false }, { text: '은만', correct: false }], explain: 'V + **기만 하다**' },
    { id: 'd66-l2-c3', audioKo: '겉모습만 보고 이력서는 안 봐요.',   clozeParts: ['겉모습', ' 보고 이력서는 안 봐요.'], choices: [{ text: '만',   correct: true }, { text: '이',    correct: false }, { text: '을',    correct: false }, { text: '으로', correct: false }], explain: 'N + 만（不加宾格）+ V 고' },
    { id: 'd66-l2-c4', audioKo: '편견만 있고 아무것도 안 봐요.',      clozeParts: ['편견', ' 있고 아무것도 안 봐요.'], choices: [{ text: '만',   correct: true }, { text: '이',    correct: false }, { text: '을',    correct: false }, { text: '에서', correct: false }], explain: 'N + 만 + 있고 · 光有 N' },
  ],

  reply: [
    { id: 'd66-l2-r1', audioKo: '너무 작아서 안 될 것 같아요.',                            promptZh: '狮子说你太小可能不行。你想不失礼但守住底线说"体型不代表能力"，最自然的一句？',       choices: [{ text: '체형은 능력이 아니에요. 이력서를 한 번 봐 주세요.',           correct: true }, { text: '싫어요, 안 가.',                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '守住底线的正式回应' },
    { id: 'd66-l2-r2', audioKo: '체력이 필요한 일이라서.',                                  promptZh: '狮子搬出体力理由。你想说"能力不只在体力"，最自然的一句？',                    choices: [{ text: '능력은 체력만이 아니에요.',                                    correct: true }, { text: '체력이 없어요.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: 'N + **만이** 아니다 = 不只 N' },
    { id: 'd66-l2-r3', audioKo: '너 왜 그렇게 화났어?',                                     promptZh: '朋友问你为什么生气。你想说"（他）光看体型什么都不看"，最自然的一句？',           choices: [{ text: '체형만 보고 아무것도 안 봤어.',                                correct: true }, { text: '체형를만 안 봤어.',              correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: 'N + 만 + V + 고 = 光 N 只 V' },
  ],
};
