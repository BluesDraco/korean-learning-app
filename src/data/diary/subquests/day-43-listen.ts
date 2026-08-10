import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 43 · 2-2 귀 트이기 · ~아/어 보다 尝试 */
export const day43Listen: ListenSubQuestData = {
  day: 13, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '노래방 3호실 · 麦克风的每一声',

  meaning: [
    { id: 'd43-l2-m1', audioKo: '토리, 뭐라도 한번 불러 봐.',            choices: [{ text: '兔莉，随便唱一首试试。',        correct: true }, { text: '兔莉，不要唱歌。',                  correct: false }, { text: '兔莉，一起来唱。',                  correct: false }, { text: '兔莉，别再唱了。',                  correct: false }], explain: 'Haru 原句 · 뭐라도 = 随便什么 · 불러 봐' },
    { id: 'd43-l2-m2', audioKo: '토리, 실력 진짜 늘었네!',                choices: [{ text: '兔莉，实力真的进步了！',        correct: true }, { text: '兔莉，实力还差得远。',              correct: false }, { text: '兔莉，你在退步。',                  correct: false }, { text: '兔莉，我不看你实力。',              correct: false }], explain: 'Junho 原句 · 실력이 늘다 = 实力增长' },
    { id: 'd43-l2-m3', audioKo: '한국 음식을 먹어 봤어요.',                choices: [{ text: '试过韩国料理。',                  correct: true }, { text: '想吃韩国料理。',                    correct: false }, { text: '不能吃韩国料理。',                  correct: false }, { text: '会做韩国料理。',                    correct: false }], explain: '~아/어 봤어요 表尝试 / 经验' },
    { id: 'd43-l2-m4', audioKo: '이 노래를 들어 보세요.',                 choices: [{ text: '请试着听这首歌。',                correct: true }, { text: '正在听这首歌。',                    correct: false }, { text: '别听这首歌。',                      correct: false }, { text: '这首歌很好听。',                    correct: false }], explain: '~아/어 보세요 建议 · 듣다 → 들어（ㄷ 不규칙）' },
    { id: 'd43-l2-m5', audioKo: '용기를 내서 발표해 봤어요.',              choices: [{ text: '鼓起勇气试着发表了。',            correct: true }, { text: '没勇气发表。',                      correct: false }, { text: '不想发表。',                        correct: false }, { text: '发表得很不好。',                    correct: false }], explain: '용기를 내다 + ~아/어 봤어요 = 尝试经验' },
  ],

  cloze: [
    { id: 'd43-l2-c1', audioKo: '한번 불러 봐.',                        clozeParts: ['한번 ', ' 봐.'],                choices: [{ text: '불러', correct: true }, { text: '부르', correct: false }, { text: '불렀', correct: false }, { text: '부러', correct: false }], explain: '르 不规则 · 부르다 → **불러**' },
    { id: 'd43-l2-c2', audioKo: '이 노래를 들어 보세요.',                 clozeParts: ['이 노래를 ', ' 보세요.'],       choices: [{ text: '들어', correct: true }, { text: '듣어', correct: false }, { text: '듣', correct: false }, { text: '듣아', correct: false }], explain: 'ㄷ 不规则 · 듣다 → **들어**' },
    { id: 'd43-l2-c3', audioKo: '한국 음식을 먹어 봤어요.',                clozeParts: ['한국 음식을 먹어 ', '어요.'],   choices: [{ text: '봤', correct: true }, { text: '보', correct: false }, { text: '봐', correct: false }, { text: '보시', correct: false }], explain: '尝试过去 · **봤어요**' },
    { id: 'd43-l2-c4', audioKo: '발표해 봤어요.',                        clozeParts: ['발표', ' 봤어요.'],             choices: [{ text: '해',  correct: true }, { text: '하아', correct: false }, { text: '하고', correct: false }, { text: '하',   correct: false }], explain: '하다 → **해** + 봤어요' },
  ],

  reply: [
    { id: 'd43-l2-r1', audioKo: '토리, 뭐라도 한번 불러 봐.',           promptZh: 'Haru 让你随便唱一首。你紧张但想试试，最自然的一句？',        choices: [{ text: '떨려. 근데 한번 불러 볼래.',                       correct: true }, { text: '싫어, 안 불러.',                          correct: false }, { text: '얼마예요?',                            correct: false }, { text: '만나서 반가워.',                        correct: false }], explain: '떨려 + ~아/어 볼래 = 表试试的意愿' },
    { id: 'd43-l2-r2', audioKo: '토리, 실력 진짜 늘었네!',                promptZh: 'Junho 夸你实力进步。你想谦虚道谢并说"KPOP 有效果"，最自然的一句？', choices: [{ text: '고마워. 28일 동안 KPOP 들은 게 효과 있네.',      correct: true }, { text: '아니야, 별로였어.',                       correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: 'Tori 自认 KPOP 有效 · 자연스러운 반응' },
    { id: 'd43-l2-r3', audioKo: '한국 음식 좋아해?',                      promptZh: '有人问你喜欢韩国料理吗。你想说"试过很多，最喜欢泡菜炒饭"，最自然的一句？', choices: [{ text: '많이 먹어 봤어. 김치볶음밥이 제일 좋아.',           correct: true }, { text: '아니, 못 먹어 봤어.',                     correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '먹어 봤어 = 尝试过 · 제일 좋아 = 最喜欢' },
  ],
};
