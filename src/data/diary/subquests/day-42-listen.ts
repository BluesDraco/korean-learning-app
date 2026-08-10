import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 42 · 2-2 귀 트이기 · ~(으)면 假设 · 收音判定 · ㄷ 不规则 */
export const day42Listen: ListenSubQuestData = {
  day: 12, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '教室里的第一次发表',

  meaning: [
    { id: 'd42-l2-m1', audioKo: '오늘은 중국 훠궈 문화를 소개하겠습니다.',        choices: [{ text: '今天我要介绍中国火锅文化。',     correct: true }, { text: '今天介绍中国的文化。',              correct: false }, { text: '介绍完中国火锅了。',              correct: false }, { text: '中国不吃火锅。',              correct: false }], explain: '~겠습니다 = 正式发表开场 · 我将' },
    { id: 'd42-l2-m2', audioKo: '바로 "함께"예요.',                                choices: [{ text: '就是"一起"。',                    correct: true }, { text: '不是"一起"。',                    correct: false }, { text: '现在开始。',                          correct: false }, { text: '一起走。',                            correct: false }], explain: '바로 = 就是 · 强调答案' },
    { id: 'd42-l2-m3', audioKo: '함께 먹으면 훠궈, 함께 응원하면 콘서트.',        choices: [{ text: '一起吃就是火锅，一起应援就是演唱会。', correct: true }, { text: '吃了火锅去演唱会。',                    correct: false }, { text: '演唱会不能吃火锅。',                    correct: false }, { text: '一起去看演唱会吃火锅。',                    correct: false }], explain: 'Tori 发表金句 · ~(으)면 假设两组对仗' },
    { id: 'd42-l2-m4', audioKo: '와, 진짜 좋은 발표였어!',                          choices: [{ text: '哇，真的是很好的发表！',        correct: true }, { text: '哇，发表得再来一次。',              correct: false }, { text: '哇，是我的发表。',                    correct: false }, { text: '哇，明天有发表。',                    correct: false }], explain: 'Junho 应答 · ~였어 반말过去' },
    { id: 'd42-l2-m5', audioKo: '들어주셔서 감사합니다.',                          choices: [{ text: '感谢大家聆听。',                  correct: true }, { text: '请进来。',                            correct: false }, { text: '请慢走。',                            correct: false }, { text: '请再讲一遍。',                        correct: false }], explain: '发表结尾定式 · ~아/어 주셔서 감사합니다' },
  ],

  cloze: [
    { id: 'd42-l2-c1', audioKo: '함께 먹으면 훠궈예요.',       clozeParts: ['함께 먹', ' 훠궈예요.'],         choices: [{ text: '으면', correct: true }, { text: '면',   correct: false }, { text: '어서', correct: false }, { text: '고',   correct: false }], explain: '먹다 有收音 ㄱ → **으면**' },
    { id: 'd42-l2-c2', audioKo: '함께 응원하면 콘서트예요.',    clozeParts: ['함께 응원하', ' 콘서트예요.'],   choices: [{ text: '면', correct: true }, { text: '으면', correct: false }, { text: '어서', correct: false }, { text: '고',   correct: false }], explain: '응원하다 无收音 → **면**（하다 直接 + 면）' },
    { id: 'd42-l2-c3', audioKo: '비가 오면 우산을 가져가세요.',  clozeParts: ['비가 오', ' 우산을 가져가세요.'], choices: [{ text: '면', correct: true }, { text: '으면', correct: false }, { text: '아서', correct: false }, { text: '니까', correct: false }], explain: '오다 无收音 → **면** · ~(으)면 后可接命令' },
    { id: 'd42-l2-c4', audioKo: '이 노래를 들으면 훠궈 생각이 나요.', clozeParts: ['이 노래를 ', ' 훠궈 생각이 나요.'], choices: [{ text: '들으면', correct: true }, { text: '듣으면', correct: false }, { text: '듣면', correct: false }, { text: '듣어면', correct: false }], explain: 'ㄷ 不规则 · 듣다 → **들으면**（ㄷ → ㄹ + 으면）' },
  ],

  reply: [
    { id: 'd42-l2-r1', audioKo: '한국에 가면 뭐 하고 싶어요?',                     promptZh: '有人问"如果去韩国想做什么"。你想说"想吃火锅"，最自然的一句？',              choices: [{ text: '훠궈를 먹고 싶어요.',                             correct: true }, { text: '훠궈를 먹었어요.',                      correct: false }, { text: '얼마예요?',                       correct: false }, { text: '몰라요.',                         correct: false }], explain: '~고 싶어요 表愿望' },
    { id: 'd42-l2-r2', audioKo: '와, 진짜 좋은 발표였어!',                          promptZh: 'Junho 夸你的发表。你想大方接受夸奖并承认自己努力过，最自然的一句？',                        choices: [{ text: '고마워. 열심히 준비했어.',                      correct: true }, { text: '아니야, 별로였어.',                       correct: false }, { text: '얼마예요?',                             correct: false }, { text: '싫어.',                                 correct: false }], explain: '고마워 + 열심히 준비했어 = 感谢 + 自然承认' },
    { id: 'd42-l2-r3', audioKo: '발표 어땠어?',                                      promptZh: 'Junho 问发表感觉怎么样。你想说"如果下次再讲会更好"，最自然的一句？',       choices: [{ text: '다음에 하면 더 잘할 수 있을 것 같아.',            correct: true }, { text: '다음에 안 할래.',                          correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~(으)면 + 未来推测 · ~ㄹ 것 같아' },
  ],
};
