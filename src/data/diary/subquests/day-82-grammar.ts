import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 82 · 3-3 문법 탐험 · 双主题 은/는 + ~지만 · A是A但B是B(诗意对比) */
export const day82Grammar: GrammarSubQuestData = {
  day: 22, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（A…但B…·诗意对比）：N은/는 A지만 N은/는 A',

  fix: [
    { id: 'd82-g3-f1', promptKo: '바람이 세지만 안이 따뜻해.',       promptZh: '"风大但拥抱温暖"（诗意对比）哪句最自然？',       choices: [{ text: '바람이 세지만 안이 따뜻해.',          correct: false }, { text: '바람은 세지만 안은 따뜻해.',    correct: true }, { text: '바람을 세지만 안을 따뜻해.',            correct: false }, { text: '바람에 세지만 안에 따뜻해.',                correct: false }], explain: '两个对比主题用 **은/는**（바람은 … 안은）· 이/가 表新信息、不做对比,此处诗意对照要用 은/는' },
    { id: 'd82-g3-f2', promptKo: '몸은 지쳐지만 기분은 좋아요.',       promptZh: '"身累但心情好"哪句正确？',       choices: [{ text: '몸은 지쳐지만 기분은 좋아요.',          correct: false }, { text: '몸은 지쳤지만 기분은 좋아요.',    correct: true }, { text: '몸은 지치지만 기분은 좋아요.',            correct: false }, { text: '몸은 지쳤으면 기분은 좋아요.',                correct: false }], explain: '지치다 → 过去 **지쳤지만**（지쳐지만/지치지만 错;这里是"已经累了"的状态用过去）' },
    { id: 'd82-g3-f3', promptKo: '길은 길지만 마음이 가벼워요.',         promptZh: '"路远但心轻"（诗意对比）哪句最自然？',   choices: [{ text: '길은 길지만 마음이 가벼워요.',            correct: false }, { text: '길은 길지만 마음은 가벼워요.',    correct: true }, { text: '길은 길지만 마음을 가벼워요.',        correct: false }, { text: '길이 길지만 마음이 가벼워요.',              correct: false }], explain: '后半主题也要用 **은/는** 保持对比：마음은（마음이=新信息,破坏对照）' },
    { id: 'd82-g3-f4', promptKo: '한국에 용기 내는 법을 배웠어.',      promptZh: '"在韩国学到了鼓起勇气的方法"哪句正确？',   choices: [{ text: '한국에 용기 내는 법을 배웠어.',         correct: false }, { text: '한국에서 용기 내는 법을 배웠어.',      correct: true }, { text: '한국에서 용기 내는 법이 배웠어.',                correct: false }, { text: '한국에서 용기 내는 법에서 배웠어.',                correct: false }], explain: '动作发生地用 **에서**（한국에서）· 배우다的宾语用 을（법을）' },
    { id: 'd82-g3-f5', promptZh: '关于「双主题 은/는 + ~지만」的诗意对比，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**两个对照的主题都用 은/는,中间用 ~지만** · 바람은 세지만 안은 따뜻해 = A是A但B是B · 用 이/가 会破坏对照感', correct: true }, { text: '两个主题都用 이/가',            correct: false }, { text: '前用 은/는后用 이/가',        correct: false }, { text: '~지만 表因果',           correct: false }], explain: '双主题 은/는 对照' },
  ],

  compose: [
    { id: 'd82-g3-c1', zhHint: '风大但拥抱温暖。',                  audioKo: '바람은 세지만 안은 따뜻해.',              answer: ['바람은', '세지만', '안은', '따뜻해.'],                     tokens: ['바람은', '세지만', '안은', '따뜻해.', '바람이', '안이', '차가워.'],                                  explain: '双主题 은/는 + ~지만' },
    { id: 'd82-g3-c2', zhHint: '身累但心情好。',                  audioKo: '몸은 지쳤지만 기분은 좋아요.',          answer: ['몸은', '지쳤지만', '기분은', '좋아요.'],                   tokens: ['몸은', '지쳤지만', '기분은', '좋아요.', '몸이', '기분이', '나빠요.'],                     explain: '지쳤지만 · 过去状态对比' },
    { id: 'd82-g3-c3', zhHint: '路远但心轻。',                    audioKo: '길은 길지만 마음은 가벼워요.',        answer: ['길은', '길지만', '마음은', '가벼워요.'],                 tokens: ['길은', '길지만', '마음은', '가벼워요.', '길이', '마음이', '무거워요.'],                 explain: '길은 … 마음은 · 双主题' },
    { id: 'd82-g3-c4', zhHint: '话短但真心深。',                  audioKo: '말은 짧지만 진심은 깊어요.',            answer: ['말은', '짧지만', '진심은', '깊어요.'],                  tokens: ['말은', '짧지만', '진심은', '깊어요.', '말이', '진심이', '얕아요.'],                 explain: '말은 … 진심은 · Day 57 呼应' },
  ],

  rule: [
    { id: 'd82-g3-r1', promptZh: '关于「双主题 은/는 + ~지만」的用法，哪句最准确？',                                choices: [{ text: '**两个对照的事物都标 은/는,中间用~지만,形成诗意对比** · 바람은 세지만 안은 따뜻해', correct: true }, { text: '表因果关系',               correct: false }, { text: '表时间先后',               correct: false }, { text: '表条件假设',                    correct: false }], explain: '双主题诗意对比' },
    { id: 'd82-g3-r2', promptZh: '关于「对比时用 은/는 还是 이/가」，哪句最准确？',                                  choices: [{ text: '**对照/对比用 은/는**（바람은…안은）· 이/가 引入新信息、不适合做对照', correct: true }, { text: '对比用 이/가',    correct: false }, { text: '两者随意',      correct: false }, { text: '对比不用助词',                    correct: false }], explain: '对比用 은/는' },
    { id: 'd82-g3-r3', promptZh: '关于「지치다」的活용，哪句最准确？',                                    choices: [{ text: '**지치다 → 지쳤지만**（"已经累了"的状态用过去 + 지만）· 不是 지쳐지만/지치지만', correct: true }, { text: '지치다 → 지쳐지만',            correct: false }, { text: '지치다 → 지친지만',    correct: false }, { text: '지치다 → 지칠지만',           correct: false }], explain: '过去 + 지만' },
    { id: 'd82-g3-r4', promptZh: '关于「~에서 vs ~에」（动作地点），哪句最准确？',                              choices: [{ text: '**动作发生地用 ~에서**（한국에서 배웠어=在韩国学到）· ~에 表存在/方向', correct: true }, { text: '动作发生地用 ~에',            correct: false }, { text: '两者完全一样',        correct: false }, { text: '~에서 表方向',                      correct: false }], explain: '动作地点 ~에서' },
  ],
};
