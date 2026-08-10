import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 41 · 2-3 문법 탐험 · ~기 위해서 · N + 을/를 위해서 · vs ~(으)려고 */
export const day41Grammar: GrammarSubQuestData = {
  day: 11, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '为了___：~기 위해서 / N + 을/를 위해서',

  fix: [
    { id: 'd41-g3-f1', promptKo: '소개할 위해서 자료를 찾아요.',    promptZh: '"为了介绍找资料"哪句正确？',                choices: [{ text: '소개할 위해서 자료를 찾아요.',     correct: false }, { text: '소개하기 위해서 자료를 찾아요.',   correct: true }, { text: '소개하는 위해서 자료를 찾아요.',    correct: false }, { text: '소개하고 위해서 자료를 찾아요.',        correct: false }], explain: '动词 + **기** 위해서（기 是名词化）' },
    { id: 'd41-g3-f2', promptKo: '가족기 위해서 일해요.',            promptZh: '"为了家人工作"哪句正确？',                  choices: [{ text: '가족기 위해서 일해요.',             correct: false }, { text: '가족을 위해서 일해요.',           correct: true }, { text: '가족의 위해서 일해요.',             correct: false }, { text: '가족에서 위해서 일해요.',                  correct: false }], explain: '名词用 **을/를** 위해서（不是 기）· 가족 有收音 → 을' },
    { id: 'd41-g3-f3', promptKo: '건강기 위해서 운동해요.',           promptZh: '"为了健康运动"哪句正确？',                 choices: [{ text: '건강기 위해서 운동해요.',          correct: false }, { text: '건강을 위해서 운동해요.',        correct: true }, { text: '건강는 위해서 운동해요.',            correct: false }, { text: '건강 위해서 운동해요.',                   correct: false }], explain: '名词用 **을/를** · 건강 有收音 ㅇ → 을' },
    { id: 'd41-g3-f4', promptKo: '한국어를 배울 위해 왔어요.',        promptZh: '"为了学韩语来到韩国"哪句正确？',           choices: [{ text: '한국어를 배울 위해 왔어요.',       correct: false }, { text: '한국어를 배우기 위해서 왔어요.', correct: true }, { text: '한국어를 배우니까 왔어요.',          correct: false }, { text: '한국어를 배웠기 위해서 왔어요.',              correct: false }], explain: '~**기** 위해서（不是 ~을 / ~았기）· 时态放句尾' },
    { id: 'd41-g3-f5', promptZh: '关于 ~기 위해서 前后主语规则，哪句最准确？', choices: [{ text: '~기 위해서 前后主语一致时用；不同人做时用 N + 을/를 위해서', correct: true }, { text: '前后主语可任意',                    correct: false }, { text: '~기 위해서 只用于过去',              correct: false }, { text: '主语必须是第三人称',                    correct: false }], explain: '同一个人的目的用 ~기 위해서（내가 배우기 위해서 내가 왔어요）' },
  ],

  compose: [
    { id: 'd41-g3-c1', zhHint: '为了介绍火锅文化在找资料。',      audioKo: '훠궈 문화를 소개하기 위해서 자료를 찾아요.', answer: ['훠궈 문화를', '소개하기 위해서', '자료를', '찾아요.'], tokens: ['훠궈 문화를', '소개하기 위해서', '자료를', '찾아요.', '소개하려고', '소개할 위해서', '찾았어요.'], explain: '동사 + 기 위해서' },
    { id: 'd41-g3-c2', zhHint: '为了学韩语来到韩国。',            audioKo: '한국어를 배우기 위해서 한국에 왔어요.',      answer: ['한국어를', '배우기 위해서', '한국에', '왔어요.'],         tokens: ['한국어를', '배우기 위해서', '한국에', '왔어요.', '배우고', '배우려고', '한국에서', '가요.'], explain: '留学生自介核心句' },
    { id: 'd41-g3-c3', zhHint: '为了健康每天运动。',              audioKo: '건강을 위해서 매일 운동해요.',              answer: ['건강을 위해서', '매일', '운동해요.'],                    tokens: ['건강을 위해서', '매일', '운동해요.', '건강기 위해서', '건강는 위해서', '운동했어요.'],           explain: '名词 + 을 위해서' },
    { id: 'd41-g3-c4', zhHint: '为了家人努力工作。',              audioKo: '가족을 위해서 열심히 일해요.',              answer: ['가족을 위해서', '열심히', '일해요.'],                    tokens: ['가족을 위해서', '열심히', '일해요.', '가족의 위해서', '가족기 위해서', '일했어요.'],           explain: '名词 + 을 위해서 · 가족 有收音' },
  ],

  rule: [
    { id: 'd41-g3-r1', promptZh: '关于「~기 위해서 vs N + 을/를 위해서」，哪句最准确？', choices: [{ text: '动词 + **기** 위해서；名词 + **을/를** 위해서 · 前者动作目的，后者对象目的', correct: true }, { text: '两者完全一样',            correct: false }, { text: '所有词一律 + 기 위해서',            correct: false }, { text: '所有词一律 + 을/를 위해서',           correct: false }], explain: '소개하기 위해서 / 가족을 위해서' },
    { id: 'd41-g3-r2', promptZh: '关于「~기 위해서 vs ~(으)려고」，哪句最准确？',      choices: [{ text: '~기 위해서 = 书面正式 / 明确目的；~(으)려고 = 口语 / "打算" 语感', correct: true }, { text: '两者完全一样',       correct: false }, { text: '~(으)려고 是敬语',      correct: false }, { text: '~기 위해서 只用于过去',            correct: false }], explain: '两者可换但语感不同 · ~기 위해서 更正式' },
    { id: 'd41-g3-r3', promptZh: '关于主语一致，哪句最准确？',                            choices: [{ text: '~기 위해서 前后**主语一般是同一个人**；为别人做用 N + 을/를 위해서', correct: true }, { text: '前后主语可任意',      correct: false }, { text: '~기 위해서 只用于第三人称',       correct: false }, { text: '主语必须是"我"',                    correct: false }], explain: '내가 배우기 위해서 내가 왔어요（O）' },
    { id: 'd41-g3-r4', promptZh: '关于时态位置，哪句最准确？',                            choices: [{ text: '~기 위해서 前**永远原形**，时态放在**句尾**（왔어요 / 갈 거예요）', correct: true }, { text: '~기 위해서 前接过去时',            correct: false }, { text: '句尾必须是现在时',                    correct: false }, { text: '时态放在最前面',                       correct: false }], explain: '~기 위해서 前不接 았/었 / 겠' },
  ],
};
