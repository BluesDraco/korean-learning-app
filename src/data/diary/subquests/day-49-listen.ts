import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 49 · 2-2 귀 트이기 · ~아/어야 돼요 · 反义 ~면 안 돼요 */
export const day49Listen: ListenSubQuestData = {
  day: 19, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '教室后排 · 三个人的真心话',

  meaning: [
    { id: 'd49-l2-m1', audioKo: '친구니까 서로 사과해야 돼.',           choices: [{ text: '既然是朋友就应该互相道歉。',    correct: true }, { text: '朋友不能道歉。',                    correct: false }, { text: '不用道歉。',                          correct: false }, { text: '别当朋友了。',                        correct: false }], explain: 'Tori 调解原句 · ~아/어야 돼' },
    { id: 'd49-l2-m2', audioKo: '진심으로 미안해.',                       choices: [{ text: '真心抱歉。',                       correct: true }, { text: '不好意思迟到了。',                  correct: false }, { text: '我不知道。',                          correct: false }, { text: '没事了。',                            correct: false }], explain: '진심으로 = 真心地 · 真诚道歉' },
    { id: 'd49-l2-m3', audioKo: '지금 자야 돼요. 내일 시험이에요.',        choices: [{ text: '现在该睡了。明天有考试。',        correct: true }, { text: '现在别睡。明天有考试。',              correct: false }, { text: '现在起床。',                          correct: false }, { text: '明天考试请早起。',                    correct: false }], explain: '~아/어야 돼요 建议 / 决心' },
    { id: 'd49-l2-m4', audioKo: '아니야, 내가 먼저 미안해.',              choices: [{ text: '不，我先说对不起。',              correct: true }, { text: '不，你先道歉。',                        correct: false }, { text: '没事，我不在意。',                      correct: false }, { text: '这不是我错。',                          correct: false }], explain: 'Junho · 敢承认自己错' },
    { id: 'd49-l2-m5', audioKo: '너희 둘이 진짜 자랑스러워.',              choices: [{ text: '你们俩真让我骄傲。',              correct: true }, { text: '你们不用骄傲。',                        correct: false }, { text: '你们再吵一次。',                        correct: false }, { text: '你们太吵了。',                          correct: false }], explain: 'Tori 的赞美' },
  ],

  cloze: [
    { id: 'd49-l2-c1', audioKo: '서로 사과해야 돼.',                  clozeParts: ['서로 ', ' 돼.'],                   choices: [{ text: '사과해야', correct: true }, { text: '사과하야', correct: false }, { text: '사과하아야', correct: false }, { text: '사과하고',   correct: false }], explain: '하다 → **해**야 돼' },
    { id: 'd49-l2-c2', audioKo: '지금 자야 돼요.',                     clozeParts: ['지금 ', ' 돼요.'],                choices: [{ text: '자야',   correct: true }, { text: '자아야', correct: false }, { text: '잠야', correct: false }, { text: '자고',   correct: false }], explain: '자다 无收音 → 자야' },
    { id: 'd49-l2-c3', audioKo: '학생은 열심히 공부해야 해요.',        clozeParts: ['학생은 열심히 ', ' 해요.'],      choices: [{ text: '공부해야', correct: true }, { text: '공부하야', correct: false }, { text: '공부하아야', correct: false }, { text: '공부하고', correct: false }], explain: '~아/어야 하다 문어체' },
    { id: 'd49-l2-c4', audioKo: '싸우면 안 돼.',                       clozeParts: ['싸우면 ', ' 돼.'],                choices: [{ text: '안',   correct: true }, { text: '못',     correct: false }, { text: '아',     correct: false }, { text: '지',       correct: false }], explain: '否定 · ~(으)면 **안** 돼요' },
  ],

  reply: [
    { id: 'd49-l2-r1', audioKo: '나 준호랑 진짜 못 봐. 이제 안 볼 거야.',         promptZh: 'Minji 生气不想见 Junho。你想劝她"既然是朋友就应该互相道歉"，最自然的一句？', choices: [{ text: '친구니까 서로 사과해야 돼.',                       correct: true }, { text: '그럼 절교해.',                    correct: false }, { text: '얼마예요?',                       correct: false }, { text: '몰라.',                         correct: false }], explain: 'Tori 调解原句 · ~아/어야 돼' },
    { id: 'd49-l2-r2', audioKo: '나도 잘못했어. 미안해, 준호야.',                  promptZh: 'Minji 主动道歉了。你想温柔地说"两个人和好就好了"，最自然的一句？',               choices: [{ text: '두 사람 화해하면 나도 정말 좋겠어.',              correct: true }, { text: '이제 나가.',                    correct: false }, { text: '얼마예요?',                       correct: false }, { text: '싫어.',                         correct: false }], explain: '~(으)면 좋겠어 温柔希望' },
    { id: 'd49-l2-r3', audioKo: '한국어 잘하고 싶어. 어떻게 해?',                promptZh: '朋友问怎么学好韩语。你想说"想说好就得每天练"，最自然的一句？',                     choices: [{ text: '한국어를 잘하려면 매일 연습해야 돼.',              correct: true }, { text: '한국어가 잘하면 연습 안 해도 돼.',                    correct: false }, { text: '한국어 잘하려면 얼마예요?',                            correct: false }, { text: '한국어 몰라.',                                        correct: false }], explain: '~(으)려면 + ~아/어야 돼' },
  ],
};
