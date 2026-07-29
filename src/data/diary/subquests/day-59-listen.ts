import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 59 · 2-2 귀 트이기 · ~(으)ㄹ 수 있어 决心 · 自我鼓励 */
export const day59Listen: ListenSubQuestData = {
  day: 29, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '书桌 · 卫生间镜子前 · 一句"할 수 있어"',

  meaning: [
    { id: 'd59-l2-m1', audioKo: '토리, 원고 몇 번 고쳤어?',                     choices: [{ text: '兔莉，稿子改了几遍？',            correct: true }, { text: '兔莉，写稿子吧。',                        correct: false }, { text: '兔莉，稿子在哪？',                      correct: false }, { text: '兔莉，改吧。',                          correct: false }], explain: 'Haru 问 · 몇 번 = 几遍' },
    { id: 'd59-l2-m2', audioKo: 'Day 30에도 이거 다 했잖아. 넌 이미 할 수 있어.',   choices: [{ text: 'Day 30 也做过啊。你已经能做到了。', correct: true }, { text: 'Day 30 你还没做。',                      correct: false }, { text: 'Day 30 从没做过。',                      correct: false }, { text: 'Day 30 是最后的。',                        correct: false }], explain: 'Haru 鼓励 · Day 30 铺垫' },
    { id: 'd59-l2-m3', audioKo: '저는 토리예요. 이제 정말 여기서 살아요.',        choices: [{ text: '我是兔莉。现在真的住在这里了。',     correct: true }, { text: '我是兔莉。以前住这。',                    correct: false }, { text: '我叫兔莉。以后要来。',                    correct: false }, { text: '我是兔莉。已经离开。',                    correct: false }], explain: 'Tori 镜子前练习 · 살다 → 살아요' },
    { id: 'd59-l2-m4', audioKo: '할 수 있어. 화이팅.',                            choices: [{ text: '能做到。加油。',                    correct: true }, { text: '不能做到。别加油。',                    correct: false }, { text: '快做完了。',                          correct: false }, { text: '我不加油。',                          correct: false }], explain: 'Tori 自我鼓励 · Day 38 复习' },
    { id: 'd59-l2-m5', audioKo: '내일 잘할 수 있을 거예요.',                       choices: [{ text: '明天会能做好的。',                  correct: true }, { text: '明天做不好。',                          correct: false }, { text: '明天不用做。',                          correct: false }, { text: '昨天做好了。',                          correct: false }], explain: '~ㄹ 수 있을 거예요 = 未来预测' },
  ],

  cloze: [
    { id: 'd59-l2-c1', audioKo: '넌 이미 할 수 있어.',                clozeParts: ['넌 이미 ', '.'],                choices: [{ text: '할 수 있어', correct: true }, { text: '하ㄹ 수 있어', correct: false }, { text: '할수 있어', correct: false }, { text: '할 수 없어', correct: false }], explain: '반말 决心 · 수 前空格' },
    { id: 'd59-l2-c2', audioKo: '이제 여덟 번… 아직 마음에 안 들어.', clozeParts: ['이제 여덟 번… 아직 마음에 ', ' 들어.'], choices: [{ text: '안',     correct: true }, { text: '못',           correct: false }, { text: '잘',       correct: false }, { text: '많이',         correct: false }], explain: '否定 안 + V · 母语惯用 마음에 안 들다 = 不满意' },
    { id: 'd59-l2-c3', audioKo: '저는 토리예요. 이제 정말 여기서 살아요.', clozeParts: ['저는 토리예요. 이제 정말 여기서 ', '.'], choices: [{ text: '살아요',   correct: true }, { text: '삽니다',       correct: false }, { text: '사네요',     correct: false }, { text: '살고 있어요', correct: false }], explain: '살다 → 살아요（ㄹ 词干）' },
    { id: 'd59-l2-c4', audioKo: '내일 잘할 수 있을 거예요.',              clozeParts: ['내일 잘', ' 거예요.'],           choices: [{ text: '할 수 있을', correct: true }, { text: '할 수 있어',   correct: false }, { text: '할 수 없을', correct: false }, { text: '할수 있을',   correct: false }], explain: '~ㄹ 수 있을 거예요 = 未来预测' },
  ],

  reply: [
    { id: 'd59-l2-r1', audioKo: '토리, 원고 몇 번 고쳤어?',                     promptZh: 'Haru 问你改了几遍稿子。你想诚实说"第八遍还不满意"，最自然的一句？',                choices: [{ text: '이제 여덟 번… 아직 마음에 안 들어.',                    correct: true }, { text: '한 번도 안 고쳤어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                    correct: false }], explain: 'Tori 原句' },
    { id: 'd59-l2-r2', audioKo: 'Day 30에도 이거 다 했잖아. 넌 이미 할 수 있어.', promptZh: 'Haru 提醒你 Day 30 也做过。你想承认并给自己打气，最自然的一句？',                    choices: [{ text: '맞아, 그때도 손 떨렸는데 다 했어.',                    correct: true }, { text: '아니, Day 30 는 다른 사람이 했어.',              correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                    correct: false }], explain: 'Tori 内心 OS' },
    { id: 'd59-l2-r3', audioKo: '거울 앞에서 세 번 연습했어.',                  promptZh: '你对着镜子练了三遍。最后想给自己鼓劲的一句？',                                     choices: [{ text: '할 수 있어. 화이팅.',                                    correct: true }, { text: '이제 그만할래.',                          correct: false }, { text: '내일 결석해야겠어.',                        correct: false }, { text: '얼마예요?',                              correct: false }], explain: 'Tori 自我鼓励' },
  ],
};
