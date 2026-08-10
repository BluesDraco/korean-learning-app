import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 70 · 3-1 단어 마스터 · 辩论赛 vs Danielle */
export const day70Vocab: VocabSubQuestData = {
  day: 10, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '토론 대회 8 个词',

  encounter: [
    { id: 'd70-v1-e1', korean: '토론',       hangul: 'to-ron',       zh: '辩论 / 讨论',  pos: '名词',   example: { ko: '오늘은 토론 대회예요.',           zh: '今天是辩论赛。' },        tip: '讨(토) + 论(론) · 토론하다 = 辩论',                                        tier: 'core' },
    { id: 'd70-v1-e2', korean: '주장',       hangul: 'ju-jang',      zh: '主张',        pos: '名词',   example: { ko: '제 주장은 이거예요.',              zh: '我的主张是这个。' },      tip: '主(주) + 张(장) · 주장하다 = 主张',                                        tier: 'core' },
    { id: 'd70-v1-e3', korean: '반대',       hangul: 'ban-dae',      zh: '反对',        pos: '名词',   example: { ko: '저는 반대해요.',                    zh: '我反对。' },              tip: '反(반) + 对(대) · 반대편 = 反方',                                          tier: 'core' },
    { id: 'd70-v1-e4', korean: '찬성',       hangul: 'chan-seong',   zh: '赞成',        pos: '名词',   example: { ko: '저는 찬성이에요.',                  zh: '我赞成。' },              tip: '赞(찬) + 成(성) · 찬성편 = 正方',                                          tier: 'core' },
    { id: 'd70-v1-e5', korean: '능력',       hangul: 'neung-nyeok',  zh: '能力',        pos: '名词',   example: { ko: '능력이 중요해요.',                  zh: '能力重要。' },            tip: '能(능) + 力(력) · 발음 [능녁] · ㄴ 첨가',                                  tier: 'core' },
    { id: 'd70-v1-e6', korean: '증명하다',   hangul: 'jeung-myeong-ha-da', zh: '证明',   pos: '动词',   example: { ko: '실력으로 증명해요.',                zh: '用实力证明。' },          tip: '证(증) + 明(명) + 하다',                                                    tier: 'core' },
    { id: 'd70-v1-e7', korean: '반면',       hangul: 'ban-myeon',    zh: '反面 / 另一方面', pos: '名词', example: { ko: '체형은 작은 반면 능력은 커요.',   zh: '体型小，另一方面能力很强。' }, tip: 'Day 70 主题词 · ~는 반면(에) 语法核心',                                     tier: 'core' },
    { id: 'd70-v1-e8', korean: '결과',       hangul: 'gyeol-gwa',    zh: '结果',        pos: '名词',   example: { ko: '결과가 나왔어요.',                  zh: '结果出来了。' },          tip: '结(결) + 果(과) · 시합 결과 = 比赛结果',                                    tier: 'ext' },
  ],

  recognize: [
    { id: 'd70-v1-r1', korean: '토론',       hangul: 'to-ron',       choices: [{ zh: '辩论',    correct: true }, { zh: '演讲',       correct: false }, { zh: '会议',       correct: false }, { zh: '论文',       correct: false }] },
    { id: 'd70-v1-r2', korean: '주장',       hangul: 'ju-jang',      choices: [{ zh: '主张',    correct: true }, { zh: '主意',       correct: false }, { zh: '意见书',     correct: false }, { zh: '主人',       correct: false }] },
    { id: 'd70-v1-r3', korean: '반대',       hangul: 'ban-dae',      choices: [{ zh: '反对',    correct: true }, { zh: '相反',       correct: false }, { zh: '不同',       correct: false }, { zh: '对面',       correct: false }] },
    { id: 'd70-v1-r4', korean: '찬성',       hangul: 'chan-seong',   choices: [{ zh: '赞成',    correct: true }, { zh: '同情',       correct: false }, { zh: '完成',       correct: false }, { zh: '成绩',       correct: false }] },
    { id: 'd70-v1-r5', korean: '능력',       hangul: 'neung-nyeok',  choices: [{ zh: '能力',    correct: true }, { zh: '实力',       correct: false }, { zh: '努力',       correct: false }, { zh: '体力',       correct: false }] },
    { id: 'd70-v1-r6', korean: '증명하다',   hangul: 'jeung-myeong-ha-da', choices: [{ zh: '证明', correct: true }, { zh: '说明',       correct: false }, { zh: '证实（作证）', correct: false }, { zh: '证据',      correct: false }] },
  ],

  spell: [
    { id: 'd70-v1-s1', zhHint: '辩论',    answer: ['토', '론'], syllables: ['토', '론', '토', '른'] },
    { id: 'd70-v1-s2', zhHint: '主张',    answer: ['주', '장'], syllables: ['주', '장', '수', '잔'] },
    { id: 'd70-v1-s3', zhHint: '反对',    answer: ['반', '대'], syllables: ['반', '대', '반', '태'] },
    { id: 'd70-v1-s4', zhHint: '能力',    answer: ['능', '력'], syllables: ['능', '력', '능', '역'] },
  ],

  write: [
    { id: 'd70-v1-w1', korean: '토', hangul: 'to',         wordKorean: '토론',     wordZh: '辩论' },
    { id: 'd70-v1-w2', korean: '론', hangul: 'ron',        wordKorean: '토론',     wordZh: '辩论' },
    { id: 'd70-v1-w3', korean: '주', hangul: 'ju',         wordKorean: '주장',     wordZh: '主张' },
    { id: 'd70-v1-w4', korean: '장', hangul: 'jang',       wordKorean: '주장',     wordZh: '主张' },
    { id: 'd70-v1-w5', korean: '반', hangul: 'ban',        wordKorean: '반대',     wordZh: '反对' },
    { id: 'd70-v1-w6', korean: '찬', hangul: 'chan',       wordKorean: '찬성',     wordZh: '赞成' },
    { id: 'd70-v1-w7', korean: '능', hangul: 'neung',      wordKorean: '능력',     wordZh: '能力' },
    { id: 'd70-v1-w8', korean: '증', hangul: 'jeung',      wordKorean: '증명하다', wordZh: '证明' },
  ],

  dictation: [
    { id: 'd70-v1-d1', korean: '체형은 작은 반면 능력은 커요',        hangul: 'che-hyeong-eun ja-geun ban-myeon neung-nyeo-geun keo-yo', syllables: ['체', '형', '은', '작', '은', '반', '면', '능', '력', '은', '커', '요'], zh: '体型小，另一方面能力大' },
    { id: 'd70-v1-d2', korean: '실력으로 증명해요',                    hangul: 'sil-lyeo-geu-ro jeung-myeong-hae-yo',                    syllables: ['실', '력', '으', '로', '증', '명', '해', '요'],                             zh: '用实力证明' },
    { id: 'd70-v1-d3', korean: '저는 반대예요',                         hangul: 'jeo-neun ban-dae-ye-yo',                                  syllables: ['저', '는', '반', '대', '예', '요'],                                          zh: '我反对' },
  ],
};
