import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 50 · 첫눈 · 词汇子关卡 */
export const day50Vocab: VocabSubQuestData = {
  day: 20, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '初雪的 8 个词',

  encounter: [
    { id: 'd50-v1-e1', korean: '첫눈',      hangul: 'cheon-nun',    zh: '初雪',        pos: '名词', example: { ko: '오늘 첫눈이 왔어요.',        zh: '今天下了初雪。' },       tip: '첫(初) + 눈(雪) · 발음 [천눈] · 韩国重视的一天',                tier: 'core' },
    { id: 'd50-v1-e2', korean: '소원',      hangul: 'so-won',       zh: '愿望',        pos: '名词', example: { ko: '소원을 빌었어요.',            zh: '许了愿。' },             tip: '所(소) + 愿(원) · 소원을 빌다',                                tier: 'core' },
    { id: 'd50-v1-e3', korean: '빌다',      hangul: 'bil-da',       zh: '祈求 / 许',   pos: '动词', example: { ko: '소원을 빌어요.',              zh: '许愿。' },               tip: 'ㄹ 词干 · 빌다 → 빌어요 / 빌면',                                tier: 'core' },
    { id: 'd50-v1-e4', korean: '이뤄지다',  hangul: 'i-rwo-ji-da',  zh: '实现 / 成真', pos: '动词', example: { ko: '소원이 이뤄져요.',            zh: '愿望实现。' },           tip: '이루다(实现) + 어지다(被动) → 自动实现',                        tier: 'core' },
    { id: 'd50-v1-e5', korean: '비밀',      hangul: 'bi-mil',       zh: '秘密',        pos: '名词', example: { ko: '이건 비밀이야.',              zh: '这是秘密。' },           tip: 'Day 34 复习 · 这次是 Tori 自己的秘密',                          tier: 'core' },
    { id: 'd50-v1-e6', korean: '발자국',    hangul: 'bal-ja-guk',   zh: '脚印',        pos: '名词', example: { ko: '눈 위에 발자국이 남았어요.',  zh: '雪上留下脚印。' },       tip: '발(脚) + 자국(痕迹) · 韩剧经典意象',                            tier: 'core' },
    { id: 'd50-v1-e7', korean: '광장',      hangul: 'gwang-jang',   zh: '广场',        pos: '名词', example: { ko: '광장에 눈이 쌓였어요.',        zh: '广场上积雪了。' },       tip: '广(광) + 场(장)',                                              tier: 'ext' },
    { id: 'd50-v1-e8', korean: '쌓이다',    hangul: 'ssa-i-da',     zh: '堆积 / 积',   pos: '动词', example: { ko: '눈이 쌓였어요.',              zh: '雪积了起来。' },         tip: '쌓다 + 이다(被动)',                                            tier: 'ext' },
  ],

  recognize: [
    { id: 'd50-v1-r1', korean: '첫눈',      hangul: 'cheon-nun',    choices: [{ zh: '初雪',        correct: true }, { zh: '大雪',      correct: false }, { zh: '细雨',      correct: false }, { zh: '雪花',      correct: false }] },
    { id: 'd50-v1-r2', korean: '소원',      hangul: 'so-won',       choices: [{ zh: '愿望',        correct: true }, { zh: '梦想',      correct: false }, { zh: '希望',      correct: false }, { zh: '打算',      correct: false }] },
    { id: 'd50-v1-r3', korean: '빌다',      hangul: 'bil-da',       choices: [{ zh: '许 / 祈求',   correct: true }, { zh: '借',        correct: false }, { zh: '欠',        correct: false }, { zh: '还',        correct: false }] },
    { id: 'd50-v1-r4', korean: '이뤄지다',  hangul: 'i-rwo-ji-da',  choices: [{ zh: '实现 / 成真', correct: true }, { zh: '消失',      correct: false }, { zh: '开始',      correct: false }, { zh: '结束',      correct: false }] },
    { id: 'd50-v1-r5', korean: '비밀',      hangul: 'bi-mil',       choices: [{ zh: '秘密',        correct: true }, { zh: '悄悄话',    correct: false }, { zh: '密码',      correct: false }, { zh: '亲密',      correct: false }] },
    { id: 'd50-v1-r6', korean: '발자국',    hangul: 'bal-ja-guk',   choices: [{ zh: '脚印',        correct: true }, { zh: '足球',      correct: false }, { zh: '脚踝',      correct: false }, { zh: '鞋印',      correct: false }] },
  ],

  spell: [
    { id: 'd50-v1-s1', zhHint: '初雪',        answer: ['첫', '눈'], syllables: ['첫', '눈', '천', '눈'] },
    { id: 'd50-v1-s2', zhHint: '愿望',        answer: ['소', '원'], syllables: ['소', '원', '수', '원'] },
    { id: 'd50-v1-s3', zhHint: '秘密',        answer: ['비', '밀'], syllables: ['비', '밀', '비', '민'] },
    { id: 'd50-v1-s4', zhHint: '广场',        answer: ['광', '장'], syllables: ['광', '장', '광', '잔'] },
  ],

  write: [
    { id: 'd50-v1-w1', korean: '첫', hangul: 'cheot',      wordKorean: '첫눈',      wordZh: '初雪' },
    { id: 'd50-v1-w2', korean: '눈', hangul: 'nun',        wordKorean: '첫눈',      wordZh: '初雪' },
    { id: 'd50-v1-w3', korean: '소', hangul: 'so',         wordKorean: '소원',      wordZh: '愿望' },
    { id: 'd50-v1-w4', korean: '원', hangul: 'won',        wordKorean: '소원',      wordZh: '愿望' },
    { id: 'd50-v1-w5', korean: '비', hangul: 'bi',         wordKorean: '비밀',      wordZh: '秘密' },
    { id: 'd50-v1-w6', korean: '밀', hangul: 'mil',        wordKorean: '비밀',      wordZh: '秘密' },
    { id: 'd50-v1-w7', korean: '발', hangul: 'bal',        wordKorean: '발자국',    wordZh: '脚印' },
    { id: 'd50-v1-w8', korean: '자', hangul: 'ja',         wordKorean: '발자국',    wordZh: '脚印' },
  ],

  dictation: [
    { id: 'd50-v1-d1', korean: '첫눈이 왔어요',      hangul: 'cheon-nu-ni wa-sseo-yo',        syllables: ['첫', '눈', '이', '왔', '어', '요'],       zh: '下了初雪' },
    { id: 'd50-v1-d2', korean: '소원을 빌면',         hangul: 'so-wo-neul bil-myeon',           syllables: ['소', '원', '을', '빌', '면'],             zh: '许愿的话' },
    { id: 'd50-v1-d3', korean: '말하면 안 이뤄진대',   hangul: 'mal-ha-myeon an i-rwo-jin-dae',  syllables: ['말', '하', '면', '안', '이', '뤄', '진', '대'], zh: '说了就不灵了' },
  ],
};
