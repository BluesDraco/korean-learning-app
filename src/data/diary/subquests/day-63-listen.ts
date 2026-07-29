import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 63 · 3-2 귀 트이기 · ~아/어 버리다 · 打工第一天 洒咖啡 */
export const day63Listen: ListenSubQuestData = {
  day: 3, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '곰다방 · 首班日 · 洒咖啡',

  meaning: [
    { id: 'd63-l2-m1', audioKo: '아이스 아메리카노 톨 사이즈 한 잔, 시럽 하나 빼고, 얼음 적게.', choices: [{ text: '中杯冰美式一杯，去一份糖浆，冰少一点。', correct: true }, { text: '中杯热美式一杯。',              correct: false }, { text: '大杯冰美式，加糖浆。',            correct: false }, { text: '一杯热拿铁。',                    correct: false }], explain: '狐狸小姐 · 打工第一单' },
    { id: 'd63-l2-m2', audioKo: '11번 테이블에 갖다드려.',                                        choices: [{ text: '请端到 11 号桌。',                    correct: true }, { text: '请从 11 号桌端过来。',       correct: false }, { text: '不用送到桌上。',                 correct: false }, { text: '11 号桌坐下。',                 correct: false }], explain: '店长交代 · ~아/어 드리다 敬语' },
    { id: 'd63-l2-m3', audioKo: '커피를 쏟아 버렸어요.',                                            choices: [{ text: '把咖啡洒了。',                        correct: true }, { text: '把咖啡装好了。',              correct: false }, { text: '把咖啡喝了。',                    correct: false }, { text: '不点咖啡。',                      correct: false }], explain: 'Day 63 主题句 · 쏟다 + 버리다 · 遗憾' },
    { id: 'd63-l2-m4', audioKo: '괜찮아요, 처음이니까.',                                            choices: [{ text: '没事，第一天嘛。',                    correct: true }, { text: '不行，你走。',                correct: false }, { text: '不好，重来。',                    correct: false }, { text: '再倒一杯。',                      correct: false }], explain: '店长安慰 · ~니까 表原因' },
    { id: 'd63-l2-m5', audioKo: '3시간 다 채웠어. 그거만으로도 잘한 거야.',                        choices: [{ text: '撑满 3 小时。光这点就很好了。',        correct: true }, { text: '3 小时太长了。',                correct: false }, { text: '3 小时没到。',                  correct: false }, { text: '不到 1 小时。',                  correct: false }], explain: '店长送别 · 다 채우다 = 撑满 / 补足' },
  ],

  cloze: [
    { id: 'd63-l2-c1', audioKo: '커피를 쏟아 버렸어요.',       clozeParts: ['커피를 쏟', ' 버렸어요.'],       choices: [{ text: '아',   correct: true }, { text: '다',    correct: false }, { text: '고',    correct: false }, { text: '서', correct: false }], explain: '쏟다 → **쏟아** + 버리다 · 有 받침 아' },
    { id: 'd63-l2-c2', audioKo: '주스를 다 마셔 버렸어요.',     clozeParts: ['주스를 다 마시', ' 버렸어요.'], choices: [{ text: '어',   correct: true }, { text: '아',    correct: false }, { text: '고',    correct: false }, { text: '서', correct: false }], explain: '마시 + **어** → 마셔 · 母音缩合' },
    { id: 'd63-l2-c3', audioKo: '기차가 떠나 버렸어요.',        clozeParts: ['기차가 ', ' 버렸어요.'],         choices: [{ text: '떠나',   correct: true }, { text: '떠나서',  correct: false }, { text: '떠난',  correct: false }, { text: '떠나고', correct: false }], explain: '떠나다 → **떠나** + 버리다（同形无变）' },
    { id: 'd63-l2-c4', audioKo: '숙제를 다 해 버렸어요.',        clozeParts: ['숙제를 다 ', ' 버렸어요.'],       choices: [{ text: '해',   correct: true }, { text: '해서',    correct: false }, { text: '한',    correct: false }, { text: '하고', correct: false }], explain: '하다 → **해** + 버리다 · 하다缩合' },
  ],

  reply: [
    { id: 'd63-l2-r1', audioKo: '아이스 아메리카노 톨 사이즈 한 잔, 시럽 하나 빼고, 얼음 적게.',   promptZh: '狐狸小姐一口气报订单你没听清。想请她慢慢再说一遍，最自然的一句？', choices: [{ text: '죄송해요, 다시 한 번만 말씀해 주세요.',                    correct: true }, { text: '싫어요, 안 팔아요.',              correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '打工救命句 · 再说一遍请求' },
    { id: 'd63-l2-r2', audioKo: '괜찮아요! 처음이니까.',                                              promptZh: '洒了咖啡，客人和店长都安慰你。你想低头道歉，最自然的一句？',        choices: [{ text: '죄송합니다. 다시 준비해 드릴게요.',                          correct: true }, { text: '몰라요. 얼마예요?',              correct: false }, { text: '싫어요.',                                correct: false }, { text: '내일 갈게요.',                            correct: false }], explain: '正式道歉 + 承诺 · ~아/어 드릴게요' },
    { id: 'd63-l2-r3', audioKo: '토리야, 3시간 다 채웠어. 그거만으로도 잘한 거야.',                promptZh: '店长夸你撑满了 3 小时。你想说"明天会更好"，最自然的一句？',        choices: [{ text: '감사합니다. 내일은 더 잘하겠습니다.',                        correct: true }, { text: '싫어요, 안 갈래요.',              correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '正式感谢 + ~겠습니다 承诺' },
  ],
};
