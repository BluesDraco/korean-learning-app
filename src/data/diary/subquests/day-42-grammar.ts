import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 42 · 2-3 문법 탐험 · ~(으)면 · vs ~아/어서 · ㄷ 不规则 */
export const day42Grammar: GrammarSubQuestData = {
  day: 12, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '如果___：~(으)면 假设条件',

  fix: [
    { id: 'd42-g3-f1', promptKo: '함께 먹면 훠궈예요.',              promptZh: '"一起吃就是火锅"哪句正确？',                choices: [{ text: '함께 먹면 훠궈예요.',            correct: false }, { text: '함께 먹으면 훠궈예요.',       correct: true }, { text: '함께 먹어면 훠궈예요.',        correct: false }, { text: '함께 먹니까 훠궈예요.',        correct: false }], explain: '먹다 有收音 ㄱ → **으면**（不加어）' },
    { id: 'd42-g3-f2', promptKo: '비가 와서 우산 가져가세요.',        promptZh: '"如果下雨请带伞"哪句正确？',                choices: [{ text: '비가 와서 우산 가져가세요.',       correct: false }, { text: '비가 오면 우산 가져가세요.',   correct: true }, { text: '비가 오니까 우산 가져가세요.',   correct: false }, { text: '비가 온면 우산 가져가세요.',        correct: false }], explain: '**假设** → ~(으)면 · ~아/어서 表事实原因（后不接命令）' },
    { id: 'd42-g3-f3', promptKo: '이 노래를 듣으면 훠궈 생각이 나요.', promptZh: '"听到这首歌会想起火锅"哪句正确？',           choices: [{ text: '이 노래를 듣으면 훠궈 생각이 나요.', correct: false }, { text: '이 노래를 들으면 훠궈 생각이 나요.', correct: true }, { text: '이 노래를 듣면 훠궈 생각이 나요.',   correct: false }, { text: '이 노래를 듣어면 훠궈 생각이 나요.', correct: false }], explain: 'ㄷ 不规则 · 듣다 → **들으면**（ㄷ → ㄹ + 으면）' },
    { id: 'd42-g3-f4', promptKo: '만들으면 맛있어요.',                 promptZh: '"如果做的话就好吃"哪句正确？',              choices: [{ text: '만들으면 맛있어요.',              correct: false }, { text: '만들면 맛있어요.',            correct: true }, { text: '만들어면 맛있어요.',             correct: false }, { text: '만드면 맛있어요.',                  correct: false }], explain: 'ㄹ 收音特殊 · 만들다 → **만들면**（不加으）' },
    { id: 'd42-g3-f4b', promptKo: '한국어를 잘하면 좋겠다요.',          promptZh: '"要是能说好韩语就好了"哪句正确？',            choices: [{ text: '한국어를 잘하면 좋겠다요.',       correct: false }, { text: '한국어를 잘하면 좋겠어요.',   correct: true }, { text: '한국어를 잘하는 좋겠어요.',      correct: false }, { text: '한국어를 잘하고 좋겠어요.',           correct: false }], explain: '~(으)면 좋겠어요 = 愿望固定句' },
  ],

  compose: [
    { id: 'd42-g3-c1', zhHint: '一起吃就是火锅。',                audioKo: '함께 먹으면 훠궈예요.',                answer: ['함께', '먹으면', '훠궈예요.'],                          tokens: ['함께', '먹으면', '훠궈예요.', '먹면', '먹어서', '훠궈예', '먹으니까'],                              explain: '发表金句 · V + 으면 + N' },
    { id: 'd42-g3-c2', zhHint: '如果下雨请带伞。',                audioKo: '비가 오면 우산을 가져가세요.',           answer: ['비가', '오면', '우산을', '가져가세요.'],                tokens: ['비가', '오면', '우산을', '가져가세요.', '왔으면', '와서', '우산이', '가져가요.'],                      explain: '~(으)면 后可接命令 · 与 ~아/어서 区别' },
    { id: 'd42-g3-c3', zhHint: '听到这首歌会想起火锅。',          audioKo: '이 노래를 들으면 훠궈 생각이 나요.',    answer: ['이', '노래를', '들으면', '훠궈', '생각이', '나요.'],   tokens: ['이', '노래를', '들으면', '훠궈', '생각이', '나요.', '듣으면', '듣면', '노래가', '생각을'],           explain: 'ㄷ 不规则 · 듣다 → 들으면' },
    { id: 'd42-g3-c4', zhHint: '感谢大家聆听。',                  audioKo: '들어주셔서 감사합니다.',                answer: ['들어주셔서', '감사합니다.'],                             tokens: ['들어주셔서', '감사합니다.', '들어줘서', '들었어서', '감사해요.', '들으셔서'],                        explain: '发表结尾定式 · ~아/어 주셔서 감사합니다' },
  ],

  rule: [
    { id: 'd42-g3-r1', promptZh: '关于「~(으)면」的用法，哪句最准确？',            choices: [{ text: 'V/A + (으)면 = 如果___ · 表**假设/条件** · 后半句可接陈述/命令/建议', correct: true }, { text: '~(으)면 表因果',       correct: false }, { text: '~(으)면 是过去时',    correct: false }, { text: '~(으)면 只用于书面语',  correct: false }], explain: '가면 = 如果去 · 먹으면 = 如果吃' },
    { id: 'd42-g3-r2', promptZh: '关于「~(으)면 vs ~아/어서」的差别，哪句最准确？', choices: [{ text: '~(으)면 = 假设"如果" · 后可接命令；~아/어서 = 事实"因为" · 后不接命令', correct: true }, { text: '两者完全一样',        correct: false }, { text: '~아/어서 是敬语',   correct: false }, { text: '~(으)면 只用于名词',   correct: false }], explain: '비가 오면 우산 가져가세요 ✓ / 비가 와서 우산 가져가세요 ✗' },
    { id: 'd42-g3-r3', promptZh: '关于收音判定和 ㄹ 特殊规则，哪句最准确？',       choices: [{ text: '无收音 + 면 / 有收音 + 으면；ㄹ 收音特殊直接 + 면（不加으）', correct: true }, { text: '所有词一律 + 면',      correct: false }, { text: '所有词一律 + 으면',    correct: false }, { text: '有收音 → 면；无收音 → 으면', correct: false }], explain: '가면 / 먹으면 / 만들면' },
    { id: 'd42-g3-r4', promptZh: '关于 ㄷ 不规则动词接 ~(으)면，哪句最准确？',      choices: [{ text: '듣다 → 들으면（ㄷ → ㄹ + 으면）· 걷다 → 걸으면 类似', correct: true }, { text: 'ㄷ 不规则不变 → 듣으면',  correct: false }, { text: 'ㄷ 收音直接 + 면 → 듣면', correct: false }, { text: 'ㄷ 变 ㅇ → 드으면',      correct: false }], explain: '不规则处理与 해요体一致' },
  ],
};
