import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 75 · 3-1 단어 마스터 · 부산 迷路·独立问路 · ~았/었을 텐데 */
export const day75Vocab: VocabSubQuestData = {
  day: 15, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '독립·방언·길 찾기 8 个词', subtitleEn: '8 words on independence, dialect, and finding your way',

  encounter: [
    { id: 'd75-v1-e1', korean: '극복하다',   hangul: 'geuk-bo-ka-da',  zh: '克服', zhEn: 'overcome',        pos: '动词', posEn: 'Verb',   example: { ko: '두려움을 극복했어요.',            zh: '克服了恐惧。', zhEn: 'Overcame the fear.' },        tip: 'Day 75 主题词 · 克(극) + 服(복) + 하다', tipEn: 'Day 75 Theme Word · 克(극) + 服(복) + 하다',                              tier: 'core' },
    { id: 'd75-v1-e2', korean: '스스로',     hangul: 'seu-seu-ro',     zh: '独自 / 自己', zhEn: 'Alone / by oneself', pos: '副词', posEn: 'Adverb',   example: { ko: '스스로 길을 찾았어요.',          zh: '自己找到了路。', zhEn: 'Found the way on my own.' },      tip: '고유어 · 혼자보다 강조 "靠自己的意志"', tipEn: 'Native word · Stronger than 혼자, "by one\'s own will"',                                tier: 'core' },
    { id: 'd75-v1-e3', korean: '길을 잃다',  hangul: 'gi-reul il-ta',  zh: '迷路', zhEn: 'Lost',        pos: '表达', posEn: 'Expression',   example: { ko: '골목에서 길을 잃었어요.',        zh: '在巷子里迷路了。', zhEn: 'I got lost in the alley.' },    tip: 'Day 7 回响 · 길(路) + 잃다(丢失)', tipEn: 'Day 7 Echo · 길(road) + 잃다(lose)',                                    tier: 'core' },
    { id: 'd75-v1-e4', korean: '사투리',     hangul: 'sa-tu-ri',       zh: '方言', zhEn: 'dialect',        pos: '名词', posEn: 'Noun',   example: { ko: '부산 사투리는 어려워요.',        zh: '釜山方言很难。', zhEn: 'The Busan dialect is hard.' },      tip: '표준어의 반대 · 지역 말투',                                            tier: 'core' },
    { id: 'd75-v1-e5', korean: '표준어',     hangul: 'pyo-jun-eo',     zh: '标准语', zhEn: 'Standard language',      pos: '名词', posEn: 'Noun',   example: { ko: '표준어로 말해 주세요.',          zh: '请用标准语说。', zhEn: 'Please say it in standard language.' },      tip: '标(표) + 准(준) + 语(어) · 서울말 기준', tipEn: '标(표) + 准(준) + 语(어) · Based on Seoul speech',                              tier: 'core' },
    { id: 'd75-v1-e6', korean: '침착하다',   hangul: 'chim-cha-ka-da', zh: '镇定 / 沉着', zhEn: 'Calm / Composed', pos: '形容词', posEn: 'Adjective.', example: { ko: '침착하게 물어봤어요.',          zh: '沉着地问了路。', zhEn: 'Asked for directions calmly.' },      tip: '沉(침) + 着(착) + 하다 · 당황의 반대', tipEn: 'Calm (침) + composed (착) + 하다 · Opposite of flustered',                                tier: 'core' },
    { id: 'd75-v1-e7', korean: '헤매다',     hangul: 'he-mae-da',      zh: '徘徊 / 转来转去', zhEn: 'Wander / Pace around', pos: '动词', posEn: 'Verb', example: { ko: '한 시간이나 헤맸어요.',        zh: '徘徊了一个小时。', zhEn: 'Wandered around for an hour.' },    tip: '고유어 · 길을 못 찾고 왔다 갔다',                                      tier: 'ext' },
    { id: 'd75-v1-e8', korean: '낯설다',     hangul: 'nat-seol-da',    zh: '陌生', zhEn: 'Unfamiliar',        pos: '形容词', posEn: 'Adjective.', example: { ko: '골목이 낯설었어요.',            zh: '巷子很陌生。', zhEn: 'The alley was unfamiliar.' },        tip: 'ㄹ 불규칙 · 낯(脸/面) + 설다 · 반대 = 익숙하다', tipEn: 'ㄹ irregular · 낯 (face) + 설다 · Opposite = 익숙하다',                       tier: 'ext' },
  ],

  recognize: [
    { id: 'd75-v1-r1', korean: '극복하다',   hangul: 'geuk-bo-ka-da',  choices: [{ zh: '克服', zhEn: 'overcome',        correct: true }, { zh: '放弃', zhEn: 'Give up',    correct: false }, { zh: '害怕', zhEn: 'be scared',    correct: false }, { zh: '逃跑', zhEn: 'Run away',    correct: false }] },
    { id: 'd75-v1-r2', korean: '스스로',     hangul: 'seu-seu-ro',     choices: [{ zh: '独自 / 自己', zhEn: 'Alone / by oneself', correct: true }, { zh: '一起', zhEn: 'together',    correct: false }, { zh: '偶尔', zhEn: 'occasionally',    correct: false }, { zh: '总是', zhEn: 'Always',    correct: false }] },
    { id: 'd75-v1-r3', korean: '길을 잃다',  hangul: 'gi-reul il-ta',  choices: [{ zh: '迷路', zhEn: 'Lost',        correct: true }, { zh: '找到路', zhEn: 'Found the way',  correct: false }, { zh: '走路', zhEn: 'walk / on foot',    correct: false }, { zh: '问路', zhEn: 'Asking for directions',    correct: false }] },
    { id: 'd75-v1-r4', korean: '사투리',     hangul: 'sa-tu-ri',       choices: [{ zh: '方言', zhEn: 'dialect',        correct: true }, { zh: '标准语', zhEn: 'Standard language',  correct: false }, { zh: '外语', zhEn: 'foreign language',    correct: false }, { zh: '敬语', zhEn: 'honorifics',    correct: false }] },
    { id: 'd75-v1-r5', korean: '침착하다',   hangul: 'chim-cha-ka-da', choices: [{ zh: '镇定 / 沉着', zhEn: 'Calm / Composed', correct: true }, { zh: '慌张', zhEn: 'Flustered',    correct: false }, { zh: '生气', zhEn: 'Angry',    correct: false }, { zh: '开心', zhEn: 'happy',    correct: false }] },
    { id: 'd75-v1-r6', korean: '낯설다',     hangul: 'nat-seol-da',    choices: [{ zh: '陌生', zhEn: 'Unfamiliar',        correct: true }, { zh: '熟悉', zhEn: 'familiar',    correct: false }, { zh: '漂亮', zhEn: 'Pretty',    correct: false }, { zh: '危险', zhEn: 'Dangerous',    correct: false }] },
  ],

  spell: [
    { id: 'd75-v1-s1', zhHint: '方言', zhHintEn: 'dialect',    answer: ['사', '투', '리'], syllables: ['사', '투', '리', '자', '두'] },
    { id: 'd75-v1-s2', zhHint: '标准语', zhHintEn: 'Standard language',  answer: ['표', '준', '어'], syllables: ['표', '준', '어', '포', '순'] },
    { id: 'd75-v1-s3', zhHint: '克服', zhHintEn: 'overcome',    answer: ['극', '복'], syllables: ['극', '복', '금', '봉'] },
    { id: 'd75-v1-s4', zhHint: '镇定', zhHintEn: 'Calm',    answer: ['침', '착'], syllables: ['침', '착', '심', '작'] },
  ],

  write: [
    { id: 'd75-v1-w1', korean: '극', hangul: 'geuk',     wordKorean: '극복하다',   wordZh: '克服', wordZhEn: 'overcome' },
    { id: 'd75-v1-w2', korean: '복', hangul: 'bok',      wordKorean: '극복하다',   wordZh: '克服', wordZhEn: 'overcome' },
    { id: 'd75-v1-w3', korean: '사', hangul: 'sa',       wordKorean: '사투리',     wordZh: '方言', wordZhEn: 'dialect' },
    { id: 'd75-v1-w4', korean: '투', hangul: 'tu',       wordKorean: '사투리',     wordZh: '方言', wordZhEn: 'dialect' },
    { id: 'd75-v1-w5', korean: '표', hangul: 'pyo',      wordKorean: '표준어',     wordZh: '标准语', wordZhEn: 'Standard language' },
    { id: 'd75-v1-w6', korean: '침', hangul: 'chim',     wordKorean: '침착하다',   wordZh: '镇定', wordZhEn: 'Calm' },
    { id: 'd75-v1-w7', korean: '헤', hangul: 'he',       wordKorean: '헤매다',     wordZh: '徘徊', wordZhEn: 'Wander' },
    { id: 'd75-v1-w8', korean: '낯', hangul: 'nat',      wordKorean: '낯설다',     wordZh: '陌生', wordZhEn: 'Unfamiliar' },
  ],

  dictation: [
    { id: 'd75-v1-d1', korean: '스스로 길을 찾았어요',        hangul: 'seu-seu-ro gi-reul cha-ja-sseo-yo',   syllables: ['스', '스', '로', '길', '을', '찾', '았', '어', '요'], zh: '自己找到了路', zhEn: 'Found the way on my own' },
    { id: 'd75-v1-d2', korean: '두려움을 극복했어요',          hangul: 'du-ryeo-u-meul geuk-bo-kae-sseo-yo',  syllables: ['두', '려', '움', '을', '극', '복', '했', '어', '요'], zh: '克服了恐惧', zhEn: 'Overcame the fear' },
    { id: 'd75-v1-d3', korean: '표준어로 부탁드렸어요',        hangul: 'pyo-jun-eo-ro bu-tak-deu-ryeo-sseo-yo', syllables: ['표', '준', '어', '로', '부', '탁', '드', '렸', '어', '요'], zh: '(用)标准语拜托了', zhEn: 'Asked politely in standard language' },
  ],
};
