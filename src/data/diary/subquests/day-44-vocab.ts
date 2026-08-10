import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 44 · 한강 소풍 · 词汇子关卡 */
export const day44Vocab: VocabSubQuestData = {
  day: 14, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '野餐毯上的 8 个词', subtitleEn: '8 words on the picnic blanket',

  encounter: [
    { id: 'd44-v1-e1', korean: '소풍',      hangul: 'so-pung',      zh: '野餐 / 远足', zhEn: 'Picnic / hike',  pos: '名词', posEn: 'Noun', example: { ko: '주말에 소풍을 가요.',        zh: '周末去野餐。', zhEn: 'I\'m going on a picnic this weekend.' },       tip: '逍(소) + 风(풍)＝逍風 · 소풍 가다 = 去郊游/野餐', tipEn: '逍(소) + 风(풍) = 逍風 · 소풍 가다 = to go on a picnic/outing',                          tier: 'core' },
    { id: 'd44-v1-e2', korean: '돗자리',    hangul: 'dot-ja-ri',    zh: '野餐垫', zhEn: 'picnic mat',        pos: '名词', posEn: 'Noun', example: { ko: '돗자리를 깔았어요.',          zh: '铺了野餐垫。', zhEn: 'I spread out the picnic mat.' },       tip: '돗자리를 깔다 = 铺垫子', tipEn: '돗자리를 깔다 = to lay out a mat',                                        tier: 'core' },
    { id: 'd44-v1-e3', korean: '하늘',      hangul: 'ha-neul',      zh: '天空', zhEn: 'sky',          pos: '名词', posEn: 'Noun', example: { ko: '하늘이 진짜 예뻐요.',        zh: '天空真美。', zhEn: 'The sky is really beautiful.' },         tip: 'ㄹ 收音 → 이/가 中的 이', tipEn: 'ㄹ final consonant → 이 in 이/가',                                       tier: 'core' },
    { id: 'd44-v1-e4', korean: '순간',      hangul: 'sun-gan',      zh: '瞬间', zhEn: 'moment',          pos: '名词', posEn: 'Noun', example: { ko: '이 순간을 기억할게요.',      zh: '我会记住这一刻。', zhEn: 'I will remember this moment.' },   tip: '瞬(순) + 间(간)', tipEn: 'moment (순) + between (간)',                                              tier: 'core' },
    { id: 'd44-v1-e5', korean: '기억',      hangul: 'gi-eok',       zh: '记忆', zhEn: 'memory',          pos: '名词', posEn: 'Noun', example: { ko: '이 순간도 이미 기억이 됐어요.', zh: '这一刻已经是记忆。', zhEn: 'This moment is already a memory.' }, tip: '기억하다 = 记住 · 기억이 나다 = 想起', tipEn: '기억하다 = to remember · 기억이 나다 = to recall',                          tier: 'core' },
    { id: 'd44-v1-e6', korean: '영원히',    hangul: 'yeong-won-hi', zh: '永远', zhEn: 'forever',          pos: '副词', posEn: 'Adverb', example: { ko: '영원히 잊지 않을게요.',      zh: '永远不会忘记。', zhEn: 'I will never forget.' },     tip: '永(영) + 远(원) + 히 · 감정 표현 关键词', tipEn: '永(영) + 远(원) + 히 · Key word for emotional expression',                       tier: 'core' },
    { id: 'd44-v1-e7', korean: '계속되다',  hangul: 'gye-sok-dwae-da', zh: '持续', zhEn: 'To continue',        pos: '动词', posEn: 'Verb', example: { ko: '이 하루가 계속됐으면.',       zh: '这一天要能持续。', zhEn: 'I wish this day could last.' },   tip: '계속(继续) + 되다 · 계속되다 → 계속됐어요', tipEn: '계속(continue) + 되다 · 계속되다 → 계속됐어요',                     tier: 'ext' },
    { id: 'd44-v1-e8', korean: '남다',      hangul: 'nam-da',       zh: '留 / 留下', zhEn: 'stay / leave behind',      pos: '动词', posEn: 'Verb', example: { ko: '기억은 남아요.',                zh: '记忆会留下。', zhEn: 'The memories will remain.' },       tip: '记忆 / 时间 / 剩余 都能 남다 · 남아요', tipEn: 'memory / time / leftover — all can 남다 · 남아요',                          tier: 'ext' },
  ],

  recognize: [
    { id: 'd44-v1-r1', korean: '소풍',    hangul: 'so-pung',       choices: [{ zh: '野餐', zhEn: 'picnic',      correct: true }, { zh: '徒步', zhEn: 'hiking',      correct: false }, { zh: '露营', zhEn: 'camping',    correct: false }, { zh: '登山', zhEn: 'mountain climbing',    correct: false }] },
    { id: 'd44-v1-r2', korean: '돗자리',  hangul: 'dot-ja-ri',     choices: [{ zh: '野餐垫', zhEn: 'picnic mat',    correct: true }, { zh: '被子', zhEn: 'quilt',      correct: false }, { zh: '桌布', zhEn: 'tablecloth',    correct: false }, { zh: '窗帘', zhEn: 'curtain',    correct: false }] },
    { id: 'd44-v1-r3', korean: '하늘',    hangul: 'ha-neul',       choices: [{ zh: '天空', zhEn: 'sky',      correct: true }, { zh: '海', zhEn: 'sea',        correct: false }, { zh: '风', zhEn: 'wind',      correct: false }, { zh: '云', zhEn: 'cloud',      correct: false }] },
    { id: 'd44-v1-r4', korean: '순간',    hangul: 'sun-gan',       choices: [{ zh: '瞬间', zhEn: 'moment',      correct: true }, { zh: '一年', zhEn: 'One year',      correct: false }, { zh: '一天', zhEn: 'One day',    correct: false }, { zh: '一小时', zhEn: 'one hour',  correct: false }] },
    { id: 'd44-v1-r5', korean: '기억',    hangul: 'gi-eok',        choices: [{ zh: '记忆', zhEn: 'memory',      correct: true }, { zh: '想象', zhEn: 'imagination',      correct: false }, { zh: '梦', zhEn: 'dream',      correct: false }, { zh: '错觉', zhEn: 'illusion',    correct: false }] },
    { id: 'd44-v1-r6', korean: '영원히',  hangul: 'yeong-won-hi',  choices: [{ zh: '永远', zhEn: 'forever',      correct: true }, { zh: '暂时', zhEn: 'temporarily',      correct: false }, { zh: '很久', zhEn: 'a long time',    correct: false }, { zh: '一直', zhEn: 'straight / all the way',    correct: false }] },
  ],

  spell: [
    { id: 'd44-v1-s1', zhHint: '野餐', zhHintEn: 'picnic',       answer: ['소', '풍'], syllables: ['소', '풍', '수', '푸'] },
    { id: 'd44-v1-s2', zhHint: '天空', zhHintEn: 'sky',       answer: ['하', '늘'], syllables: ['하', '늘', '하', '눌'] },
    { id: 'd44-v1-s3', zhHint: '瞬间', zhHintEn: 'moment',       answer: ['순', '간'], syllables: ['순', '간', '슨', '간'] },
    { id: 'd44-v1-s4', zhHint: '记忆', zhHintEn: 'memory',       answer: ['기', '억'], syllables: ['기', '억', '기', '엇'] },
  ],

  write: [
    { id: 'd44-v1-w1', korean: '소', hangul: 'so',         wordKorean: '소풍',    wordZh: '野餐', wordZhEn: 'picnic' },
    { id: 'd44-v1-w2', korean: '풍', hangul: 'pung',       wordKorean: '소풍',    wordZh: '野餐', wordZhEn: 'picnic' },
    { id: 'd44-v1-w3', korean: '하', hangul: 'ha',         wordKorean: '하늘',    wordZh: '天空', wordZhEn: 'sky' },
    { id: 'd44-v1-w4', korean: '늘', hangul: 'neul',       wordKorean: '하늘',    wordZh: '天空', wordZhEn: 'sky' },
    { id: 'd44-v1-w5', korean: '순', hangul: 'sun',        wordKorean: '순간',    wordZh: '瞬间', wordZhEn: 'moment' },
    { id: 'd44-v1-w6', korean: '간', hangul: 'gan',        wordKorean: '순간',    wordZh: '瞬间', wordZhEn: 'moment' },
    { id: 'd44-v1-w7', korean: '기', hangul: 'gi',         wordKorean: '기억',    wordZh: '记忆', wordZhEn: 'memory' },
    { id: 'd44-v1-w8', korean: '억', hangul: 'eok',        wordKorean: '기억',    wordZh: '记忆', wordZhEn: 'memory' },
  ],

  dictation: [
    { id: 'd44-v1-d1', korean: '계속됐으면 좋겠어',   hangul: 'gye-sok-dwae-sseu-myeon jo-ke-sseo',  syllables: ['계', '속', '됐', '으', '면', '좋', '겠', '어'], zh: '要是能持续就好了', zhEn: 'I wish this could last' },
    { id: 'd44-v1-d2', korean: '하늘이 예뻐요',        hangul: 'ha-neu-ri ye-ppeo-yo',                syllables: ['하', '늘', '이', '예', '뻐', '요'],           zh: '天空真美', zhEn: 'The sky is so beautiful' },
    { id: 'd44-v1-d3', korean: '이 순간을 기억할게요', hangul: 'i sun-ga-neul gi-eo-kal-ge-yo',       syllables: ['이', '순', '간', '을', '기', '억', '할', '게', '요'], zh: '我会记住这一刻', zhEn: 'I\'ll remember this moment' },
  ],
};
