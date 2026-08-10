import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 89 · 3-3 문법 탐험 · ~은/는 아니지? / 아니에요? · 不是…吧？ */
export const day89Grammar: GrammarSubQuestData = {
  day: 29, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（不是…吧？）：N + 은/는 아니지? / 아니에요?',

  fix: [
    { id: 'd89-g3-f1', promptKo: '우리, 이별이 아니지?',       promptZh: '"我们不是离别吧？"—— 想柔和地确认否定，哪句最自然？',           choices: [{ text: '우리, 이별이 아니지?',           correct: false }, { text: '우리, 이별은 아니지?',            correct: true }, { text: '우리, 이별을 아니지?',                correct: false }, { text: '우리, 이별에 아니지?',                  correct: false }], explain: '柔和确认否定用 **은/는**：이별**은** 아니지?（이별 有收音 + 은）' },
    { id: 'd89-g3-f2', promptKo: '오해은 아니에요?',           promptZh: '"不是误会吧？"（柔和确认,对长辈해요体）哪句最自然？',              choices: [{ text: '오해은 아니에요?',           correct: false }, { text: '오해는 아니에요?',          correct: true }, { text: '오해을 아니에요?',                correct: false }, { text: '오해가 아니에요?',                  correct: false }], explain: '오해 无收音 → **는**（오해는 아니에요?）' },
    { id: 'd89-g3-f3', promptKo: '너 지금 화난 것은 아니지?',   promptZh: '"你现在不是生气吧？"哪句最自然？',           choices: [{ text: '너 지금 화난 건 아니지?',          correct: true }, { text: '너 지금 화나는 건 아니지?', correct: false }, { text: '너 지금 화날 건 아니지?',                correct: false }, { text: '너 지금 화나 건 아니지?',                    correct: false }], explain: '过去状态 → **화난**（화나 + ㄴ）· 것 → 건(缩) · ~ㄴ 건 아니지?' },
    { id: 'd89-g3-f4', promptKo: '거짓말이 아니지?',           promptZh: '"不是撒谎吧？"—— 想柔和地确认,哪句最自然？',              choices: [{ text: '거짓말이 아니지?',    correct: false }, { text: '거짓말은 아니지?',          correct: true }, { text: '거짓말를 아니지?',                correct: false }, { text: '거짓말도 아니지?',                    correct: false }], explain: '柔和确认否定用 은/는 · 거짓말(有收音) + **은**' },
    { id: 'd89-g3-f5', promptZh: '关于「~은/는 아니지?」的核心用法，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**N + 은/는 아니지? = 不是…吧？(柔和确认，希望对方否定那个可怕的事实)** · 이별은 아니지? = 不是离别吧? · 说话人想听到"아니야"', correct: true }, { text: '强烈肯定',            correct: false }, { text: '命令对方',        correct: false }, { text: '表示未来',           correct: false }], explain: '柔和确认否定' },
  ],

  compose: [
    { id: 'd89-g3-c1', zhHint: '我们不是离别吧？',                    audioKo: '우리, 이별은 아니지?',               answer: ['우리,', '이별은', '아니지?'],                     tokens: ['우리,', '이별은', '아니지?', '이별이', '이별을', '맞지?'],                          explain: 'Day 89 主题句 · 有收音 은' },
    { id: 'd89-g3-c2', zhHint: '不是误会吧？',                        audioKo: '오해는 아니에요?',                   answer: ['오해는', '아니에요?'],                   tokens: ['오해는', '아니에요?', '오해은', '오해가', '맞아요?'],                          explain: '无收音 는 + 해요体' },
    { id: 'd89-g3-c3', zhHint: '你现在不是生气吧？',                  audioKo: '너 지금 화난 건 아니지?',            answer: ['너', '지금', '화난 건', '아니지?'],           tokens: ['너', '지금', '화난 건', '아니지?', '화나는 건', '화날 건', '맞지?'],                          explain: '过去状态 화난 + 건' },
    { id: 'd89-g3-c4', zhHint: '不是撒谎吧？',                        audioKo: '거짓말은 아니지?',                   answer: ['거짓말은', '아니지?'],           tokens: ['거짓말은', '아니지?', '거짓말이', '거짓말을', '맞지?'],                          explain: '有收音 은' },
  ],

  rule: [
    { id: 'd89-g3-r1', promptZh: '关于「~은/는 아니지?」的语气，哪句最准确？',                                choices: [{ text: '**柔和确认否定 · 说话人心里害怕某个事实,希望对方回答"아니야(不是)"** · 이별은 아니지? = 不是离别吧?', correct: true }, { text: '强硬命令',            correct: false }, { text: '开心宣布',                   correct: false }, { text: '单纯提问',                    correct: false }], explain: '柔和确认否定' },
    { id: 'd89-g3-r2', promptZh: '关于「반말 vs 해요体」，哪句最准确？',                                  choices: [{ text: '**반말 = ~은/는 아니지? · 해요体 = ~은/는 아니에요?** · 对朋友用 아니지,对长辈用 아니에요', correct: true }, { text: '两者一样',           correct: false }, { text: '아니지 更礼貌',            correct: false }, { text: '아니에요 是반말',                  correct: false }], explain: '语体差别' },
    { id: 'd89-g3-r3', promptZh: '关于「助词 은/는」的选择，哪句最准确？',                                    choices: [{ text: '**有收音 + 은,无收音 + 는** · 이별(有收音) → 이별은 · 오해(无收音) → 오해는', correct: true }, { text: '一律用 은',            correct: false }, { text: '一律用 는',    correct: false }, { text: '要用 이/가',           correct: false }], explain: '收音判断' },
    { id: 'd89-g3-r4', promptZh: '关于「~아니지? vs ~잖아」的差别，哪句最准确？',                              choices: [{ text: '**~아니지? = 不确定,柔和确认(希望否定)** · **~잖아 = 已知事实,提醒对方** · 이별은 아니지?(不确定) vs 친구잖아(明明是朋友嘛)', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~아니지 是提醒',        correct: false }, { text: '~잖아 表不确定',                      correct: false }], explain: '确认 vs 提醒' },
  ],
};
