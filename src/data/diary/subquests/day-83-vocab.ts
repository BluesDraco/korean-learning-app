import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 83 · 3-1 단어 마스터 · Haru의 真相 · 나중에 ~ㄹ게 + ~까지야 */
export const day83Vocab: VocabSubQuestData = {
  day: 23, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '진실·기다림 8 个词', subtitleEn: '진실·기다림 8 words',

  encounter: [
    { id: 'd83-v1-e1', korean: '진실',       hangul: 'jin-sil',        zh: '真相 / 真实', zhEn: 'Truth / Reality', pos: '名词', posEn: 'Noun',   example: { ko: '진실을 조금 알게 됐어요.',      zh: '知道了一点真相。', zhEn: 'I learned a bit of the truth.' },    tip: 'Day 83 主题词 · 真(진) + 实(실)', tipEn: 'Day 83 Theme Word · 真(진) + 实(실)',                                      tier: 'core' },
    { id: 'd83-v1-e2', korean: '유학생',     hangul: 'yu-hak-saeng',   zh: '留学生', zhEn: 'international student',      pos: '名词', posEn: 'Noun',   example: { ko: '그 친구도 유학생이었어요.',      zh: '那朋友也是留学生。', zhEn: 'That friend is also an international student.' },  tip: '留(유) + 学(학) + 生(생)', tipEn: '留(yu) + 学(hak) + 生(saeng)',                                            tier: 'core' },
    { id: 'd83-v1-e3', korean: '기숙사',     hangul: 'gi-suk-sa',      zh: '宿舍', zhEn: 'dormitory',        pos: '名词', posEn: 'Noun',   example: { ko: '같은 기숙사에 살았어요.',        zh: '住过同一间宿舍。', zhEn: 'We stayed in the same dorm.' },    tip: 'Day 4 学过 · 寄(기) + 宿(숙) + 舍(사)', tipEn: 'Learned on Day 4 · 寄(기) + 宿(숙) + 舍(사)',                              tier: 'core' },
    { id: 'd83-v1-e4', korean: '조심스럽다', hangul: 'jo-sim-seu-reop-da', zh: '小心翼翼', zhEn: 'Very carefully', pos: '形容词', posEn: 'Adjective.', example: { ko: '조심스럽게 물었어요.',          zh: '小心地问了。', zhEn: 'Asked carefully.' },        tip: 'ㅂ 불규칙: 조심스럽다 → 조심스러워요',                                tier: 'core' },
    { id: 'd83-v1-e5', korean: '유자차',     hangul: 'yu-ja-cha',      zh: '柚子茶', zhEn: 'Yuzu tea',      pos: '名词', posEn: 'Noun',   example: { ko: '유자차 두 잔을 들고 왔어요.',    zh: '端来了两杯柚子茶。', zhEn: 'Brought two cups of yuzu tea.' },  tip: '柚(유) + 子(자) + 茶(차) · 韩国冬天热饮', tipEn: '柚(유) + 子(자) + 茶(차) · A hot drink in Korean winter',                            tier: 'core' },
    { id: 'd83-v1-e6', korean: '기다리다',   hangul: 'gi-da-ri-da',    zh: '等 / 等待', zhEn: 'Wait / Waiting',   pos: '动词', posEn: 'Verb',   example: { ko: '천천히 기다릴게요.',            zh: '我慢慢等。', zhEn: 'I\'ll wait patiently.' },          tip: '기다리다 → 기다릴게(요) · 承诺形', tipEn: '기다리다 → 기다릴게(요) · Promise form',                                    tier: 'core' },
    { id: 'd83-v1-e7', korean: '서두르다',   hangul: 'seo-du-reu-da',  zh: '急 / 催促', zhEn: 'Hurry / Urge',   pos: '动词', posEn: 'Verb',   example: { ko: '서두르지 않을게요.',            zh: '我不催。', zhEn: 'I won\'t rush you.' },            tip: '르 불규칙: 서두르다 → 서둘러요 · 서두르지 마 = 别急', tipEn: '르 irregular: 서두르다 → 서둘러요 · 서두르지 마 = Don\'t rush',                  tier: 'ext' },
    { id: 'd83-v1-e8', korean: '나중에',     hangul: 'na-jung-e',      zh: '以后 / 之后', zhEn: 'Later / After', pos: '副词', posEn: 'Adverb',   example: { ko: '나중에 말해 줄게요.',            zh: '以后再告诉你。', zhEn: 'I\'ll tell you later.' },      tip: 'Day 34 学过 · 나중 + 에 · 반대 = 지금', tipEn: 'Learned on Day 34 · 나중 + 에 · Opposite = 지금',                              tier: 'ext' },
  ],

  recognize: [
    { id: 'd83-v1-r1', korean: '진실',       hangul: 'jin-sil',        choices: [{ zh: '真相 / 真实', zhEn: 'Truth / Reality', correct: true }, { zh: '谎言', zhEn: 'Lie',    correct: false }, { zh: '秘密', zhEn: 'secret',    correct: false }, { zh: '误会', zhEn: 'misunderstanding',    correct: false }] },
    { id: 'd83-v1-r2', korean: '유학생',     hangul: 'yu-hak-saeng',   choices: [{ zh: '留学生', zhEn: 'international student',      correct: true }, { zh: '实习生', zhEn: 'Intern',  correct: false }, { zh: '毕业生', zhEn: 'Graduate',  correct: false }, { zh: '新生', zhEn: 'new student',    correct: false }] },
    { id: 'd83-v1-r3', korean: '조심스럽다', hangul: 'jo-sim-seu-reop-da', choices: [{ zh: '小心翼翼', zhEn: 'Very carefully',  correct: true }, { zh: '大大咧咧', zhEn: 'careless',correct: false }, { zh: '生气', zhEn: 'Angry',    correct: false }, { zh: '着急', zhEn: 'to be in a hurry',    correct: false }] },
    { id: 'd83-v1-r4', korean: '기다리다',   hangul: 'gi-da-ri-da',    choices: [{ zh: '等 / 等待', zhEn: 'Wait / Waiting',   correct: true }, { zh: '催促', zhEn: 'urge',    correct: false }, { zh: '离开', zhEn: 'leave',    correct: false }, { zh: '追问', zhEn: 'press for an answer',    correct: false }] },
    { id: 'd83-v1-r5', korean: '서두르다',   hangul: 'seo-du-reu-da',  choices: [{ zh: '急 / 催促', zhEn: 'Hurry / Urge',   correct: true }, { zh: '慢慢来', zhEn: 'take it easy',  correct: false }, { zh: '停下', zhEn: 'Stop',    correct: false }, { zh: '休息', zhEn: 'to rest',    correct: false }] },
    { id: 'd83-v1-r6', korean: '나중에',     hangul: 'na-jung-e',      choices: [{ zh: '以后 / 之后', zhEn: 'Later / After', correct: true }, { zh: '现在', zhEn: 'Now',    correct: false }, { zh: '刚才', zhEn: 'just now',    correct: false }, { zh: '总是', zhEn: 'Always',    correct: false }] },
  ],

  spell: [
    { id: 'd83-v1-s1', zhHint: '真相', zhHintEn: 'The truth',    answer: ['진', '실'], syllables: ['진', '실', '준', '싣'] },
    { id: 'd83-v1-s2', zhHint: '留学生', zhHintEn: 'international student',  answer: ['유', '학', '생'], syllables: ['유', '학', '생', '요', '항'] },
    { id: 'd83-v1-s3', zhHint: '宿舍', zhHintEn: 'dormitory',    answer: ['기', '숙', '사'], syllables: ['기', '숙', '사', '구', '순'] },
    { id: 'd83-v1-s4', zhHint: '柚子茶', zhHintEn: 'Yuzu tea',  answer: ['유', '자', '차'], syllables: ['유', '자', '차', '요', '저'] },
  ],

  write: [
    { id: 'd83-v1-w1', korean: '진', hangul: 'jin',      wordKorean: '진실',       wordZh: '真相', wordZhEn: 'The truth' },
    { id: 'd83-v1-w2', korean: '실', hangul: 'sil',      wordKorean: '진실',       wordZh: '真相', wordZhEn: 'The truth' },
    { id: 'd83-v1-w3', korean: '유', hangul: 'yu',       wordKorean: '유학생',     wordZh: '留学生', wordZhEn: 'international student' },
    { id: 'd83-v1-w4', korean: '학', hangul: 'hak',      wordKorean: '유학생',     wordZh: '留学生', wordZhEn: 'international student' },
    { id: 'd83-v1-w5', korean: '기', hangul: 'gi',       wordKorean: '기숙사',     wordZh: '宿舍', wordZhEn: 'dormitory' },
    { id: 'd83-v1-w6', korean: '자', hangul: 'ja',       wordKorean: '유자차',     wordZh: '柚子茶', wordZhEn: 'Yuzu tea' },
    { id: 'd83-v1-w7', korean: '기', hangul: 'gi',       wordKorean: '기다리다',   wordZh: '等', wordZhEn: 'wait' },
    { id: 'd83-v1-w8', korean: '서', hangul: 'seo',      wordKorean: '서두르다',   wordZh: '催促', wordZhEn: 'urge' },
  ],

  dictation: [
    { id: 'd83-v1-d1', korean: '나중에 말해 줄게요',            hangul: 'na-jung-e mal-hae jul-ge-yo',                syllables: ['나', '중', '에', '말', '해', '줄', '게', '요'], zh: '以后再告诉你', zhEn: 'I\'ll tell you later' },
    { id: 'd83-v1-d2', korean: '오늘은 여기까지예요',            hangul: 'o-neu-reun yeo-gi-kka-ji-ye-yo',             syllables: ['오', '늘', '은', '여', '기', '까', '지', '예', '요'], zh: '今天到这里', zhEn: 'that\'s all for today' },
    { id: 'd83-v1-d3', korean: '기다릴게요 서두르지 않을게요',    hangul: 'gi-da-ril-ge-yo seo-du-reu-ji a-neul-ge-yo', syllables: ['기', '다', '릴', '게', '요', '서', '두', '르', '지', '않', '을', '게', '요'], zh: '我等你，不催你', zhEn: 'I\'ll wait for you, no rush' },
  ],
};
