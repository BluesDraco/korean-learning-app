import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 56 · 新生 · 词汇子关卡 */
export const day56Vocab: VocabSubQuestData = {
  day: 26, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '成为别人的 Haru · 8 个词', subtitleEn: 'Becoming someone else\'s Haru · 8 words',

  encounter: [
    { id: 'd56-v1-e1', korean: '신입생',    hangul: 'sin-ip-saeng',    zh: '新生', zhEn: 'new student',        pos: '名词', posEn: 'Noun',   example: { ko: '새 학기라서 신입생이 왔어요.',  zh: '开学季来了新生。', zhEn: 'New students arrived at the start of the semester.' },   tip: '新(신) + 入(입) + 生(생) · 简称 신입', tipEn: '新(신) + 入(입) + 生(생) · abbreviated as 신입',                          tier: 'core' },
    { id: 'd56-v1-e2', korean: '터지다',    hangul: 'teo-ji-da',        zh: '爆开 / 破', zhEn: 'to burst / to break',   pos: '动词', posEn: 'Verb',   example: { ko: '가방이 터졌어요.',                zh: '包爆开了。', zhEn: 'The bag burst open.' },         tip: '자동 · 캐리어 터지다',                                          tier: 'core' },
    { id: 'd56-v1-e3', korean: '정리하다',  hangul: 'jeong-ni-ha-da',   zh: '整理 / 收拾', zhEn: 'to organize / to tidy up', pos: '动词', posEn: 'Verb',   example: { ko: '같이 정리해요.',                  zh: '一起收拾。', zhEn: 'Let\'s tidy up together.' },         tip: '整(정) + 理(리) + 하다', tipEn: 'organize (정) + arrange (리) + 하다',                                        tier: 'core' },
    { id: 'd56-v1-e4', korean: '똑같다',    hangul: 'ttok-gat-da',      zh: '一模一样', zhEn: 'exactly the same',    pos: '形容词', posEn: 'Adjective.', example: { ko: '진짜 똑같았어요.',                zh: '真的一模一样。', zhEn: 'They\'re really exactly the same.' },     tip: '똑(完全) + 같다 · 强调完全相同', tipEn: '똑(completely) + 같다 · emphasizes being exactly the same',                                tier: 'core' },
    { id: 'd56-v1-e5', korean: '받침',      hangul: 'bat-chim',         zh: '收音', zhEn: 'final consonant',        pos: '名词', posEn: 'Noun',   example: { ko: '받침이 하나 다를 뿐이에요.',      zh: '只是收音差一个字母。', zhEn: 'It\'s just one final consonant different.' }, tip: '韩语字母的下部 · 짐 ㅁ vs 집 ㅂ', tipEn: 'The bottom of Korean letters · 짐 ㅁ vs 집 ㅂ',                              tier: 'core' },
    { id: 'd56-v1-e6', korean: '차이',      hangul: 'cha-i',            zh: '差别', zhEn: 'difference',        pos: '名词', posEn: 'Noun',   example: { ko: '작은 차이지만 뜻이 달라요.',     zh: '虽然差别小但意思不同。', zhEn: 'Though the difference is small, the meaning is different.' }, tip: '差(차) + 异(이)', tipEn: 'Difference (차) + Difference (이)',                                              tier: 'core' },
    { id: 'd56-v1-e7', korean: '실수하다',  hangul: 'sil-su-ha-da',     zh: '失误 / 犯错', zhEn: 'Mistake / Error', pos: '动词', posEn: 'Verb',   example: { ko: '나도 처음에 실수해 봤어요.',      zh: '我一开始也犯过。', zhEn: 'I made that mistake at first too.' },   tip: '~아/어 봤어요 表经验 · Day 43 复习', tipEn: '~아/어 봤어요 for experience · Day 43 Review',                            tier: 'ext' },
    { id: 'd56-v1-e8', korean: '기숙사',    hangul: 'gi-suk-sa',        zh: '宿舍', zhEn: 'dormitory',        pos: '名词', posEn: 'Noun',   example: { ko: '한빛 기숙사 3층 복도.',             zh: '韩光宿舍 3 楼走廊。', zhEn: 'Hangwang Dormitory, 3rd floor hallway.' }, tip: '寄(기) + 宿(숙) + 舍(사)', tipEn: '寄(gi) + 宿(suk) + 舍(sa)',                                     tier: 'ext' },
  ],

  recognize: [
    { id: 'd56-v1-r1', korean: '신입생',    hangul: 'sin-ip-saeng',     choices: [{ zh: '新生', zhEn: 'new student',        correct: true }, { zh: '毕业生', zhEn: 'Graduate',    correct: false }, { zh: '优等生', zhEn: 'Top student',      correct: false }, { zh: '预备生', zhEn: 'Prospective student',      correct: false }] },
    { id: 'd56-v1-r2', korean: '터지다',    hangul: 'teo-ji-da',         choices: [{ zh: '爆开', zhEn: 'burst open',        correct: true }, { zh: '拉链', zhEn: 'Zipper',      correct: false }, { zh: '锁上', zhEn: 'Lock',        correct: false }, { zh: '合上', zhEn: 'Close',        correct: false }] },
    { id: 'd56-v1-r3', korean: '정리하다',  hangul: 'jeong-ni-ha-da',    choices: [{ zh: '整理', zhEn: 'Organize',        correct: true }, { zh: '打扫', zhEn: 'Clean',      correct: false }, { zh: '布置', zhEn: 'Arrange',        correct: false }, { zh: '扔掉', zhEn: 'Throw away',        correct: false }] },
    { id: 'd56-v1-r4', korean: '똑같다',    hangul: 'ttok-gat-da',       choices: [{ zh: '一模一样', zhEn: 'exactly the same',    correct: true }, { zh: '完全不同', zhEn: 'Completely different',  correct: false }, { zh: '相似', zhEn: 'Similar',        correct: false }, { zh: '相反', zhEn: 'Opposite',        correct: false }] },
    { id: 'd56-v1-r5', korean: '받침',      hangul: 'bat-chim',          choices: [{ zh: '收音', zhEn: 'final consonant',        correct: true }, { zh: '元音', zhEn: 'Vowel',      correct: false }, { zh: '发音', zhEn: 'pronunciation',        correct: false }, { zh: '声调', zhEn: 'Tone',        correct: false }] },
    { id: 'd56-v1-r6', korean: '차이',      hangul: 'cha-i',             choices: [{ zh: '差别', zhEn: 'difference',        correct: true }, { zh: '相同', zhEn: 'same',      correct: false }, { zh: '距离', zhEn: 'Distance',        correct: false }, { zh: '时间', zhEn: 'time',        correct: false }] },
  ],

  spell: [
    { id: 'd56-v1-s1', zhHint: '新生（신입）', zhHintEn: 'New student (신입)', answer: ['신', '입'], syllables: ['신', '입', '심', '입'] },
    { id: 'd56-v1-s2', zhHint: '整理（정리）', zhHintEn: 'Organize (정리)', answer: ['정', '리'], syllables: ['정', '리', '전', '리'] },
    { id: 'd56-v1-s3', zhHint: '收音', zhHintEn: 'final consonant',        answer: ['받', '침'], syllables: ['받', '침', '반', '침'] },
    { id: 'd56-v1-s4', zhHint: '差别', zhHintEn: 'difference',        answer: ['차', '이'], syllables: ['차', '이', '자', '이'] },
  ],

  write: [
    { id: 'd56-v1-w1', korean: '신', hangul: 'sin',        wordKorean: '신입생',     wordZh: '新生', wordZhEn: 'new student' },
    { id: 'd56-v1-w2', korean: '입', hangul: 'ip',         wordKorean: '신입생',     wordZh: '新生', wordZhEn: 'new student' },
    { id: 'd56-v1-w3', korean: '정', hangul: 'jeong',      wordKorean: '정리하다',   wordZh: '整理', wordZhEn: 'Organize' },
    { id: 'd56-v1-w4', korean: '리', hangul: 'ri',         wordKorean: '정리하다',   wordZh: '整理', wordZhEn: 'Organize' },
    { id: 'd56-v1-w5', korean: '받', hangul: 'bat',        wordKorean: '받침',       wordZh: '收音', wordZhEn: 'final consonant' },
    { id: 'd56-v1-w6', korean: '침', hangul: 'chim',       wordKorean: '받침',       wordZh: '收音', wordZhEn: 'final consonant' },
    { id: 'd56-v1-w7', korean: '차', hangul: 'cha',        wordKorean: '차이',       wordZh: '差别', wordZhEn: 'difference' },
    { id: 'd56-v1-w8', korean: '똑', hangul: 'ttok',       wordKorean: '똑같다',     wordZh: '一模一样', wordZhEn: 'exactly the same' },
  ],

  dictation: [
    { id: 'd56-v1-d1', korean: '실수해 봤어요',        hangul: 'sil-su-hae bwa-sseo-yo',         syllables: ['실', '수', '해', '봤', '어', '요'],       zh: '曾经犯过错', zhEn: 'Made a mistake before' },
    { id: 'd56-v1-d2', korean: '받침 하나 차이예요',    hangul: 'bat-chim ha-na cha-i-ye-yo',      syllables: ['받', '침', '하', '나', '차', '이', '예', '요'], zh: '只差一个收音', zhEn: 'Only one final consonant apart' },
    { id: 'd56-v1-d3', korean: '같이 정리해요',         hangul: 'ga-chi jeong-ni-hae-yo',          syllables: ['같', '이', '정', '리', '해', '요'],           zh: '一起收拾', zhEn: 'Clean up together' },
  ],
};
