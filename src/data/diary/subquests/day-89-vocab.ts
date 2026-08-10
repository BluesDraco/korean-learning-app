import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 89 · 3-1 단어 마스터 · 毕业前夜聊天到天亮 · ~은/는 아니지? */
export const day89Vocab: VocabSubQuestData = {
  day: 29, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '졸업 전야 8 个词', subtitleEn: '8 Words for Graduation Eve',

  encounter: [
    { id: 'd89-v1-e1', korean: '전야',       hangul: 'jeon-ya',       zh: '前夜', zhEn: 'eve',       pos: '名词', posEn: 'Noun',   example: { ko: '오늘은 졸업 전야예요.',          zh: '今天是毕业前夜。', zhEn: 'Today is the night before graduation.' },    tip: 'Day 89 主题词 · 前(전) + 夜(야)', tipEn: 'Day 89 Theme · Before (전) + Night (야)',                                    tier: 'core' },
    { id: 'd89-v1-e2', korean: '밤샘',       hangul: 'bam-saem',      zh: '通宵', zhEn: 'all-nighter',       pos: '名词', posEn: 'Noun',   example: { ko: '결국 밤샘했어요.',              zh: '结果通宵了。', zhEn: 'We ended up pulling an all-nighter.' },        tip: '밤(夜) + 샘 · 밤샘하다 = 熬夜', tipEn: '밤 (Night) + 샘 · 밤샘하다 = To Stay Up All Night',                                      tier: 'core' },
    { id: 'd89-v1-e3', korean: '뼈대',       hangul: 'ppyeo-dae',     zh: '骨架 / 根本', zhEn: 'Skeleton / Foundation', pos: '名词', posEn: 'Noun',   example: { ko: '이 이야기는 우리의 뼈대예요.',   zh: '这故事是我们的骨架。', zhEn: 'This story is our backbone.' }, tip: 'Day 89 隐喻 · 뼈(骨) + 대(架)', tipEn: 'Day 89 Metaphor · 뼈 (Bone) + 대 (Frame)',                                      tier: 'core' },
    { id: 'd89-v1-e4', korean: '이별',       hangul: 'i-byeol',       zh: '离别', zhEn: 'parting',       pos: '名词', posEn: 'Noun',   example: { ko: '이별은 없어요.',                zh: '没有离别。', zhEn: 'No parting.' },          tip: 'Day 89 情感核心 · 离(이) + 别(별)', tipEn: 'Day 89 Emotional Core · Parting (이) + Separation (별)',                                  tier: 'core' },
    { id: 'd89-v1-e5', korean: '이어지다',   hangul: 'i-eo-ji-da',    zh: '相连 / 延续', zhEn: 'Connected / Continued', pos: '动词', posEn: 'Verb',   example: { ko: '우리는 계속 이어져 있을 거예요.', zh: '我们会一直相连。', zhEn: 'We\'ll always be connected.' },   tip: '잇다(连) + 어지다 · 서로 연결', tipEn: '잇다 (Connect) + 어지다 · Connected to Each Other',                                       tier: 'core' },
    { id: 'd89-v1-e6', korean: '새벽',       hangul: 'sae-byeok',     zh: '凌晨', zhEn: 'Early Morning',       pos: '名词', posEn: 'Noun',   example: { ko: '새벽 6시에 해가 떴어요.',        zh: '凌晨6点太阳升起。', zhEn: 'The sun rises at 6 a.m.' },   tip: '固有语 · 深夜到黎明', tipEn: 'Native Word · From Late Night to Dawn',                                                 tier: 'core' },
    { id: 'd89-v1-e7', korean: '곯아떨어지다', hangul: 'gol-a-tteo-reo-ji-da', zh: '累倒睡着', zhEn: 'Falling Asleep from Exhaustion', pos: '动词', posEn: 'Verb', example: { ko: '준호가 곯아떨어졌어요.',        zh: 'Junho累睡着了。', zhEn: 'Junho fell asleep from exhaustion.' },     tip: '疲惫到自然睡着的状态', tipEn: 'The state of naturally falling asleep from fatigue',                                                tier: 'ext' },
    { id: 'd89-v1-e8', korean: '순간',       hangul: 'sun-gan',       zh: '瞬间', zhEn: 'moment',       pos: '名词', posEn: 'Noun',   example: { ko: '그 순간을 기억해요.',            zh: '记得那个瞬间。', zhEn: 'Remember that moment.' },      tip: '瞬(순) + 间(간) · Day 85 也学过', tipEn: 'Moment (순) + Between (간) · Also Learned on Day 85',                                    tier: 'ext' },
  ],

  recognize: [
    { id: 'd89-v1-r1', korean: '전야',       hangul: 'jeon-ya',       choices: [{ zh: '前夜', zhEn: 'eve',       correct: true }, { zh: '深夜', zhEn: 'Late night',  correct: false }, { zh: '黎明', zhEn: 'Dawn',    correct: false }, { zh: '午夜', zhEn: 'Midnight',    correct: false }] },
    { id: 'd89-v1-r2', korean: '밤샘',       hangul: 'bam-saem',      choices: [{ zh: '通宵', zhEn: 'all-nighter',       correct: true }, { zh: '午睡', zhEn: 'nap',  correct: false }, { zh: '早起', zhEn: 'early rising',    correct: false }, { zh: '失眠', zhEn: 'insomnia',    correct: false }] },
    { id: 'd89-v1-r3', korean: '뼈대',       hangul: 'ppyeo-dae',     choices: [{ zh: '骨架 / 根本', zhEn: 'Skeleton / Foundation', correct: true }, { zh: '皮肤', zhEn: 'skin',  correct: false }, { zh: '外壳', zhEn: 'shell',    correct: false }, { zh: '装饰', zhEn: 'Decorate',    correct: false }] },
    { id: 'd89-v1-r4', korean: '이별',       hangul: 'i-byeol',       choices: [{ zh: '离别', zhEn: 'parting',       correct: true }, { zh: '重逢', zhEn: 'Reunion',  correct: false }, { zh: '相遇', zhEn: 'Meeting',    correct: false }, { zh: '约定', zhEn: 'Promise',    correct: false }] },
    { id: 'd89-v1-r5', korean: '이어지다',   hangul: 'i-eo-ji-da',    choices: [{ zh: '相连 / 延续', zhEn: 'Connected / Continued', correct: true }, { zh: '断开', zhEn: 'disconnect',  correct: false }, { zh: '消失', zhEn: 'disappear',    correct: false }, { zh: '结束', zhEn: 'End.',    correct: false }] },
    { id: 'd89-v1-r6', korean: '새벽',       hangul: 'sae-byeok',     choices: [{ zh: '凌晨', zhEn: 'Early Morning',       correct: true }, { zh: '傍晚', zhEn: 'evening',  correct: false }, { zh: '正午', zhEn: 'noon',    correct: false }, { zh: '深夜', zhEn: 'Late night',    correct: false }] },
  ],

  spell: [
    { id: 'd89-v1-s1', zhHint: '前夜', zhHintEn: 'eve',    answer: ['전', '야'],       syllables: ['전', '야', '천', '여'] },
    { id: 'd89-v1-s2', zhHint: '通宵', zhHintEn: 'all-nighter',    answer: ['밤', '샘'],       syllables: ['밤', '샘', '밥', '셈'] },
    { id: 'd89-v1-s3', zhHint: '离别', zhHintEn: 'parting',    answer: ['이', '별'],       syllables: ['이', '별', '의', '벌'] },
    { id: 'd89-v1-s4', zhHint: '凌晨', zhHintEn: 'Early Morning',    answer: ['새', '벽'],       syllables: ['새', '벽', '세', '뱍'] },
  ],

  write: [
    { id: 'd89-v1-w1', korean: '전', hangul: 'jeon',    wordKorean: '전야',   wordZh: '前夜', wordZhEn: 'eve' },
    { id: 'd89-v1-w2', korean: '야', hangul: 'ya',      wordKorean: '전야',   wordZh: '前夜', wordZhEn: 'eve' },
    { id: 'd89-v1-w3', korean: '밤', hangul: 'bam',     wordKorean: '밤샘',   wordZh: '通宵', wordZhEn: 'all-nighter' },
    { id: 'd89-v1-w4', korean: '샘', hangul: 'saem',    wordKorean: '밤샘',   wordZh: '通宵', wordZhEn: 'all-nighter' },
    { id: 'd89-v1-w5', korean: '이', hangul: 'i',       wordKorean: '이별',   wordZh: '离别', wordZhEn: 'parting' },
    { id: 'd89-v1-w6', korean: '별', hangul: 'byeol',   wordKorean: '이별',   wordZh: '离别', wordZhEn: 'parting' },
    { id: 'd89-v1-w7', korean: '새', hangul: 'sae',     wordKorean: '새벽',   wordZh: '凌晨', wordZhEn: 'Early Morning' },
    { id: 'd89-v1-w8', korean: '벽', hangul: 'byeok',   wordKorean: '새벽',   wordZh: '凌晨', wordZhEn: 'Early Morning' },
  ],

  dictation: [
    { id: 'd89-v1-d1', korean: '우리 이별은 아니지',            hangul: 'u-ri i-byeo-reun a-ni-ji',              syllables: ['우', '리', '이', '별', '은', '아', '니', '지'], zh: '我们不是离别吧', zhEn: 'We\'re not saying goodbye, are we?' },
    { id: 'd89-v1-d2', korean: '이별은 없어',                  hangul: 'i-byeo-reun eop-seo',                   syllables: ['이', '별', '은', '없', '어'], zh: '没有离别', zhEn: 'No goodbye' },
    { id: 'd89-v1-d3', korean: '계속 이어져 있을 거야',          hangul: 'gye-sok i-eo-jyeo i-sseul geo-ya',      syllables: ['계', '속', '이', '어', '져', '있', '을', '거', '야'], zh: '会一直相连的', zhEn: 'We\'ll always stay connected' },
  ],
};
