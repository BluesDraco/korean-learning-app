import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 43 · 2-5 Boss 战 · 🎤 노래방 · Tori 开麦 */
export const day43Boss: BossSubQuestData = {
  day: 13, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '한 곡 관문',
  subtitle: '🎤 코인 노래방 · 第一次开麦',
  intro: '弘爪街 코인 노래방 3 号房。Junho 唱完 rap 整栋楼在抖，Minji 笑到滑下椅子。Haru 把麦克风递到你手里："토리, 뭐라도 한번 불러 봐." 你手心是凉的，但屏幕上熟悉的前奏响起来了。28 天听的 KPOP 现在要用出去。~아/어 보다 = 试试看。今晚要用它说完 5 句话。',
  outroHook: 'Junho 拍手叫好，Haru 在角落安静地鼓掌。走出노래방时兽尔的秋风吹过来 —— 你把应援棒收进包里，Junho 说："다음엔 나랑 듀엣 해 볼래?" 你笑了。下一次，会更好。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd43-b5-t1', audioKo: '토리, 뭐라도 한번 불러 봐.',   choices: [{ text: '兔莉，随便唱一首试试。',        correct: true }, { text: '兔莉，不要唱歌。',                  correct: false }, { text: '兔莉，一起来唱。',                  correct: false }, { text: '兔莉，别再唱了。',                  correct: false }], explain: 'Haru 原句 · 뭐라도 = 随便' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd43-b5-t2', audioKo: '토리, 실력 진짜 늘었네!',      choices: [{ text: '兔莉，实力真的进步了！',        correct: true }, { text: '兔莉，实力退步了。',              correct: false }, { text: '兔莉，我不看实力。',              correct: false }, { text: '兔莉，你在骄傲。',                  correct: false }], explain: 'Junho 原句 · 실력이 늘다' } },
    { type: 'choice',  label: '르 不规则',    task: { id: 'd43-b5-t3', promptZh: '"试着唱"哪句正确？',                                                                                                                choices: [{ text: '부르어 봐',                        correct: false }, { text: '불러 봐',                       correct: true }, { text: '부르 봐',                          correct: false }, { text: '부러 봐',                              correct: false }], explain: '르 不规则' } },
    { type: 'choice',  label: 'ㄷ 不规则',    task: { id: 'd43-b5-t4', promptZh: '"试着听这首歌"哪句正确？',                                                                                                          choices: [{ text: '이 노래를 듣어 보세요.',           correct: false }, { text: '이 노래를 들어 보세요.',        correct: true }, { text: '이 노래를 듣 보세요.',              correct: false }, { text: '이 노래가 들어 보세요.',                 correct: false }], explain: 'ㄷ → ㄹ + 아/어' } },
    { type: 'choice',  label: '认词',         task: { id: 'd43-b5-t5', promptKo: '용기', promptHangul: 'yong-gi',                                                                                                    choices: [{ text: '勇气',                    correct: true }, { text: '力气',              correct: false }, { text: '怒气',                  correct: false }, { text: '气球',                     correct: false }], explain: 'Day 1 妈妈胡萝卜上的字' } },
    { type: 'compose', label: '组句',         task: { id: 'd43-b5-t6', zhHint: '试着唱一次吧。',                                                                                                                    audioKo: '한번 노래를 불러 봐.',                answer: ['한번', '노래를', '불러', '봐.'],                       tokens: ['한번', '노래를', '불러', '봐.', '부르어', '부르', '노래가', '봤어'],                               explain: 'Haru 原句 · 르 不规则' } },
    { type: 'compose', label: '组句',         task: { id: 'd43-b5-t7', zhHint: '鼓起勇气试着发表了。',                                                                                                              audioKo: '용기를 내서 발표해 봤어요.',            answer: ['용기를', '내서', '발표해', '봤어요.'],                tokens: ['용기를', '내서', '발표해', '봤어요.', '발표하', '발표하고', '용기가', '내가'],                       explain: '하다 → 해 + 봤어요' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd43-b5-t8', promptZh: 'Junho 夸你 "실력 진짜 늘었네!"。你想道谢并说想再唱一首，最自然的一句？',                                                          choices: [{ text: '고마워. 한 곡 더 불러 볼래.',      correct: true }, { text: '이제 집에 갈래.',                       correct: false }, { text: '내가 못 해.',                             correct: false }, { text: '얼마예요?',                              correct: false }], explain: '고마워 + 再唱一首' } },
  ],
};
