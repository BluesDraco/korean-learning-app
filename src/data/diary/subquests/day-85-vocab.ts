import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 85 · 3-1 단어 마스터 · 카운트다운·倒计时 · ~(으)ㄹ 때마다 */
export const day85Vocab: VocabSubQuestData = {
  day: 25, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '카운트다운·추억 8 个词', subtitleEn: 'Countdown · 8 words for memories',

  encounter: [
    { id: 'd85-v1-e1', korean: '카운트다운', hangul: 'ka-un-teu-da-un', zh: '倒计时', zhEn: 'Countdown',      pos: '名词', posEn: 'Noun',   example: { ko: '카운트다운 캘린더예요.',        zh: '是倒计时日历。', zhEn: 'It\'s a countdown calendar.' },      tip: 'Day 85 主题词 · countdown 外来语', tipEn: 'Day 85 Theme Word · countdown loanword',                                    tier: 'core' },
    { id: 'd85-v1-e2', korean: '뜯다',       hangul: 'tteut-da',       zh: '撕', zhEn: 'Tear',          pos: '动词', posEn: 'Verb',   example: { ko: '한 장씩 뜯어요.',                zh: '一张一张撕。', zhEn: 'Tear them off one by one.' },        tip: '뜯다 → 뜯어요 · 발음 [뜯따]',                                          tier: 'core' },
    { id: 'd85-v1-e3', korean: '남다',       hangul: 'nam-da',         zh: '剩', zhEn: 'Remaining',          pos: '动词', posEn: 'Verb',   example: { ko: '오 일 남았어요.',              zh: '剩5天。', zhEn: '5 days left.' },            tip: '남다 → 남았어요 · 남은 = 剩下的', tipEn: '남다 → 남았어요 · 남은 = remaining',                                      tier: 'core' },
    { id: 'd85-v1-e4', korean: '받아주다',   hangul: 'ba-da-ju-da',    zh: '接纳', zhEn: 'Accept',        pos: '动词', posEn: 'Verb',   example: { ko: '반이 저를 받아줬어요.',          zh: '班上接纳了我。', zhEn: 'The class accepted me.' },      tip: '받다(接) + 주다(给) · 情感上的接纳', tipEn: '받다 (receive) + 주다 (give) · emotional acceptance',                                  tier: 'core' },
    { id: 'd85-v1-e5', korean: '추억',       hangul: 'chu-eok',        zh: '回忆', zhEn: 'Memories',        pos: '名词', posEn: 'Noun',   example: { ko: '좋은 추억이 많아요.',            zh: '有很多美好回忆。', zhEn: 'I have many good memories.' },    tip: 'Day 76 学过 · 追(추) + 忆(억)', tipEn: 'Day 76 learned · 追(chase) + 忆(recall)',                                        tier: 'core' },
    { id: 'd85-v1-e6', korean: '순간',       hangul: 'sun-gan',        zh: '瞬间 / 时刻', zhEn: 'moment / instant', pos: '名词', posEn: 'Noun',   example: { ko: '이 순간을 기억할게요.',          zh: '我会记住这一刻。', zhEn: 'I will remember this moment.' },    tip: '瞬(순) + 间(간)', tipEn: 'moment (순) + between (간)',                                                      tier: 'core' },
    { id: 'd85-v1-e7', korean: '기억해두다', hangul: 'gi-eo-kae-du-da', zh: '记住 / 记下来', zhEn: 'Remember / Write down', pos: '动词', posEn: 'Verb', example: { ko: '이 순간을 기억해둘게요.',        zh: '记住这个瞬间。', zhEn: 'Remember this moment.' },      tip: '기억하다 + ~아/어 두다（存起来）', tipEn: '기억하다 + ~아/어 두다 (store it up)',                                      tier: 'ext' },
    { id: 'd85-v1-e8', korean: '졸업',       hangul: 'jo-reop',        zh: '毕业', zhEn: 'graduation',        pos: '名词', posEn: 'Noun',   example: { ko: '졸업이 오 일 남았어요.',        zh: '离毕业还剩5天。', zhEn: '5 days left until graduation.' },    tip: '卒(졸) + 业(업) · 졸업하다 = 毕业', tipEn: '卒(졸) + 业(업) · 졸업하다 = graduate',                                    tier: 'ext' },
  ],

  recognize: [
    { id: 'd85-v1-r1', korean: '뜯다',       hangul: 'tteut-da',       choices: [{ zh: '撕', zhEn: 'Tear',          correct: true }, { zh: '贴', zhEn: 'stick',      correct: false }, { zh: '折', zhEn: 'fold',      correct: false }, { zh: '写', zhEn: 'write',      correct: false }] },
    { id: 'd85-v1-r2', korean: '남다',       hangul: 'nam-da',         choices: [{ zh: '剩', zhEn: 'Remaining',          correct: true }, { zh: '走', zhEn: 'Walk',      correct: false }, { zh: '来', zhEn: 'Come',      correct: false }, { zh: '满', zhEn: 'full',      correct: false }] },
    { id: 'd85-v1-r3', korean: '받아주다',   hangul: 'ba-da-ju-da',    choices: [{ zh: '接纳', zhEn: 'Accept',        correct: true }, { zh: '拒绝', zhEn: 'Refuse',    correct: false }, { zh: '递给', zhEn: 'hand over',    correct: false }, { zh: '归还', zhEn: 'return',    correct: false }] },
    { id: 'd85-v1-r4', korean: '추억',       hangul: 'chu-eok',        choices: [{ zh: '回忆', zhEn: 'Memories',        correct: true }, { zh: '计划', zhEn: 'Plan',    correct: false }, { zh: '梦想', zhEn: 'dream',    correct: false }, { zh: '约定', zhEn: 'Promise',    correct: false }] },
    { id: 'd85-v1-r5', korean: '순간',       hangul: 'sun-gan',        choices: [{ zh: '瞬间 / 时刻', zhEn: 'moment / instant', correct: true }, { zh: '空间', zhEn: 'space',    correct: false }, { zh: '房间', zhEn: 'Room',    correct: false }, { zh: '期间', zhEn: 'Period',    correct: false }] },
    { id: 'd85-v1-r6', korean: '졸업',       hangul: 'jo-reop',        choices: [{ zh: '毕业', zhEn: 'graduation',        correct: true }, { zh: '入学', zhEn: 'enrollment',    correct: false }, { zh: '开学', zhEn: 'school starts',    correct: false }, { zh: '休学', zhEn: 'Leave of absence',    correct: false }] },
  ],

  spell: [
    { id: 'd85-v1-s1', zhHint: '回忆', zhHintEn: 'Memories',    answer: ['추', '억'], syllables: ['추', '억', '초', '악'] },
    { id: 'd85-v1-s2', zhHint: '瞬间', zhHintEn: 'moment',    answer: ['순', '간'], syllables: ['순', '간', '숨', '건'] },
    { id: 'd85-v1-s3', zhHint: '毕业', zhHintEn: 'graduation',    answer: ['졸', '업'], syllables: ['졸', '업', '좀', '엄'] },
    { id: 'd85-v1-s4', zhHint: '接纳', zhHintEn: 'Accept',    answer: ['받', '아', '주', '다'], syllables: ['받', '아', '주', '다', '바', '조'] },
  ],

  write: [
    { id: 'd85-v1-w1', korean: '추', hangul: 'chu',      wordKorean: '추억',       wordZh: '回忆', wordZhEn: 'Memories' },
    { id: 'd85-v1-w2', korean: '억', hangul: 'eok',      wordKorean: '추억',       wordZh: '回忆', wordZhEn: 'Memories' },
    { id: 'd85-v1-w3', korean: '순', hangul: 'sun',      wordKorean: '순간',       wordZh: '瞬间', wordZhEn: 'moment' },
    { id: 'd85-v1-w4', korean: '간', hangul: 'gan',      wordKorean: '순간',       wordZh: '瞬间', wordZhEn: 'moment' },
    { id: 'd85-v1-w5', korean: '졸', hangul: 'jol',      wordKorean: '졸업',       wordZh: '毕业', wordZhEn: 'graduation' },
    { id: 'd85-v1-w6', korean: '업', hangul: 'eop',      wordKorean: '졸업',       wordZh: '毕业', wordZhEn: 'graduation' },
    { id: 'd85-v1-w7', korean: '뜯', hangul: 'tteut',    wordKorean: '뜯다',       wordZh: '撕', wordZhEn: 'Tear' },
    { id: 'd85-v1-w8', korean: '남', hangul: 'nam',      wordKorean: '남다',       wordZh: '剩', wordZhEn: 'Remaining' },
  ],

  dictation: [
    { id: 'd85-v1-d1', korean: '한 장씩 뜯어요',                hangul: 'han jang-ssik tteu-deo-yo',                  syllables: ['한', '장', '씩', '뜯', '어', '요'], zh: '一张一张撕', zhEn: 'tear off one by one' },
    { id: 'd85-v1-d2', korean: '오 일 남았어요',                hangul: 'o il na-ma-sseo-yo',                         syllables: ['오', '일', '남', '았', '어', '요'], zh: '剩5天', zhEn: '5 days left' },
    { id: 'd85-v1-d3', korean: '이 순간을 기억해둘게요',        hangul: 'i sun-ga-neul gi-eo-kae-dul-ge-yo',          syllables: ['이', '순', '간', '을', '기', '억', '해', '둘', '게', '요'], zh: '我会记住这一刻', zhEn: 'I\'ll remember this moment' },
  ],
};
