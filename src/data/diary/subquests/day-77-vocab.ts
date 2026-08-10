import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 77 · 3-1 단어 마스터 · 여행 계획 발표·最高分 · ~을/를 ~에 담다 */
export const day77Vocab: VocabSubQuestData = {
  day: 17, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '발표·설계 8 个词', subtitleEn: '발표·설계 8 words',

  encounter: [
    { id: 'd77-v1-e1', korean: '계획',       hangul: 'gye-hoek',       zh: '计划', zhEn: 'Plan',        pos: '名词', posEn: 'Noun',   example: { ko: '여행 계획을 세웠어요.',          zh: '定了旅行计划。', zhEn: 'I made a travel plan.' },      tip: 'Day 77 主题词 · 计(계) + 划(획) · 계획을 세우다 = 定计划', tipEn: 'Day 77 Theme Word · 计(계) + 划(획) · 계획을 세우다 = Make a plan',              tier: 'core' },
    { id: 'd77-v1-e2', korean: '발표',       hangul: 'bal-pyo',        zh: '发表 / 展示', zhEn: 'Presentation / Showcase', pos: '名词', posEn: 'Noun',   example: { ko: '발표가 잘 끝났어요.',            zh: '发表顺利结束了。', zhEn: 'The presentation ended smoothly.' },    tip: '发(발) + 表(표) · 발표하다 = 做展示', tipEn: '发(발) + 表(표) · 발표하다 = Give a presentation',                                  tier: 'core' },
    { id: 'd77-v1-e3', korean: '흐름',       hangul: 'heu-reum',       zh: '流程 / 脉络', zhEn: 'Flow / Structure', pos: '名词', posEn: 'Noun',   example: { ko: '자연-문화-휴식의 흐름이에요.',    zh: '自然-文化-休息的流程。', zhEn: 'A flow of nature, culture, and rest.' }, tip: '흐르다(流) → 흐름 · 설계 어휘', tipEn: '흐르다(流) → 흐름 · Design vocabulary',                                        tier: 'core' },
    { id: 'd77-v1-e4', korean: '밀도',       hangul: 'mil-do',         zh: '密度', zhEn: 'Density',        pos: '名词', posEn: 'Noun',   example: { ko: '속도보다 밀도가 중요해요.',      zh: '密度比速度重要。', zhEn: 'Density matters more than speed.' },    tip: '密(밀) + 度(도) · Day 77 명제 키워드', tipEn: 'Density (밀) + Degree (도) · Day 77 Theme Keyword',                                 tier: 'core' },
    { id: 'd77-v1-e5', korean: '설계',       hangul: 'seol-gye',       zh: '设计', zhEn: 'Design',        pos: '名词', posEn: 'Noun',   example: { ko: '흐름의 설계예요.',              zh: '流程的设计。', zhEn: 'The design of the flow.' },        tip: '设(설) + 计(계) · 설계하다 = 设计', tipEn: 'Design (설) + Plan (계) · 설계하다 = Design',                                    tier: 'core' },
    { id: 'd77-v1-e6', korean: '실천하다',   hangul: 'sil-cheon-ha-da', zh: '实践', zhEn: 'Practice',       pos: '动词', posEn: 'Verb',   example: { ko: '배운 걸 실천했어요.',            zh: '把学到的实践了。', zhEn: 'I put what I learned into practice.' },    tip: '实(실) + 践(천) + 하다', tipEn: '실 + 천 + 하다 (to practice)',                                              tier: 'core' },
    { id: 'd77-v1-e7', korean: '특징',       hangul: 'teuk-jing',      zh: '特点 / 特征', zhEn: 'Characteristics / Features', pos: '名词', posEn: 'Noun',   example: { ko: '이 계획의 특징이에요.',          zh: '这是本计划的特点。', zhEn: 'This is a feature of this plan.' },  tip: '特(특) + 徵(징) · 发表常用', tipEn: 'Special (특) + Sign (징) · Common in presentations',                                          tier: 'ext' },
    { id: 'd77-v1-e8', korean: '가상',       hangul: 'ga-sang',        zh: '虚拟 / 假想', zhEn: 'Virtual / Hypothetical', pos: '名词', posEn: 'Noun',   example: { ko: '가상 여행 계획이에요.',          zh: '是虚拟旅行计划。', zhEn: 'It\'s a virtual travel plan.' },    tip: '假(가) + 想(상) · 반대 = 실제', tipEn: 'Hypothetical (가) + Think (상) · Opposite = Real',                                        tier: 'ext' },
  ],

  recognize: [
    { id: 'd77-v1-r1', korean: '계획',       hangul: 'gye-hoek',       choices: [{ zh: '计划', zhEn: 'Plan',        correct: true }, { zh: '结果', zhEn: 'result',    correct: false }, { zh: '记录', zhEn: 'Record',    correct: false }, { zh: '契约', zhEn: 'Contract',    correct: false }] },
    { id: 'd77-v1-r2', korean: '발표',       hangul: 'bal-pyo',        choices: [{ zh: '发表 / 展示', zhEn: 'Presentation / Showcase', correct: true }, { zh: '发音', zhEn: 'pronunciation',    correct: false }, { zh: '发现', zhEn: 'to discover',    correct: false }, { zh: '发送', zhEn: 'Send',    correct: false }] },
    { id: 'd77-v1-r3', korean: '흐름',       hangul: 'heu-reum',       choices: [{ zh: '流程 / 脉络', zhEn: 'Flow / Structure', correct: true }, { zh: '结尾', zhEn: 'Ending',    correct: false }, { zh: '声音', zhEn: 'Voice',    correct: false }, { zh: '云', zhEn: 'cloud',      correct: false }] },
    { id: 'd77-v1-r4', korean: '밀도',       hangul: 'mil-do',         choices: [{ zh: '密度', zhEn: 'Density',        correct: true }, { zh: '速度', zhEn: 'speed',    correct: false }, { zh: '温度', zhEn: 'temperature',    correct: false }, { zh: '高度', zhEn: 'height',    correct: false }] },
    { id: 'd77-v1-r5', korean: '실천하다',   hangul: 'sil-cheon-ha-da', choices: [{ zh: '实践', zhEn: 'Practice',       correct: true }, { zh: '计划', zhEn: 'Plan',    correct: false }, { zh: '想象', zhEn: 'imagination',    correct: false }, { zh: '放弃', zhEn: 'Give up',    correct: false }] },
    { id: 'd77-v1-r6', korean: '특징',       hangul: 'teuk-jing',      choices: [{ zh: '特点 / 特征', zhEn: 'Characteristics / Features', correct: true }, { zh: '缺点', zhEn: 'Weakness',    correct: false }, { zh: '优惠', zhEn: 'Discount',    correct: false }, { zh: '习惯', zhEn: 'habit',    correct: false }] },
  ],

  spell: [
    { id: 'd77-v1-s1', zhHint: '发表', zhHintEn: 'Presentation',    answer: ['발', '표'], syllables: ['발', '표', '반', '포'] },
    { id: 'd77-v1-s2', zhHint: '设计', zhHintEn: 'Design',    answer: ['설', '계'], syllables: ['설', '계', '섬', '개'] },
    { id: 'd77-v1-s3', zhHint: '密度', zhHintEn: 'Density',    answer: ['밀', '도'], syllables: ['밀', '도', '민', '토'] },
    { id: 'd77-v1-s4', zhHint: '特点', zhHintEn: 'Features',    answer: ['특', '징'], syllables: ['특', '징', '득', '정'] },
  ],

  write: [
    { id: 'd77-v1-w1', korean: '계', hangul: 'gye',      wordKorean: '계획',       wordZh: '计划', wordZhEn: 'Plan' },
    { id: 'd77-v1-w2', korean: '획', hangul: 'hoek',     wordKorean: '계획',       wordZh: '计划', wordZhEn: 'Plan' },
    { id: 'd77-v1-w3', korean: '발', hangul: 'bal',      wordKorean: '발표',       wordZh: '发表', wordZhEn: 'Presentation' },
    { id: 'd77-v1-w4', korean: '표', hangul: 'pyo',      wordKorean: '발표',       wordZh: '发表', wordZhEn: 'Presentation' },
    { id: 'd77-v1-w5', korean: '설', hangul: 'seol',     wordKorean: '설계',       wordZh: '设计', wordZhEn: 'Design' },
    { id: 'd77-v1-w6', korean: '밀', hangul: 'mil',      wordKorean: '밀도',       wordZh: '密度', wordZhEn: 'Density' },
    { id: 'd77-v1-w7', korean: '실', hangul: 'sil',      wordKorean: '실천하다',   wordZh: '实践', wordZhEn: 'Practice' },
    { id: 'd77-v1-w8', korean: '특', hangul: 'teuk',     wordKorean: '특징',       wordZh: '特点', wordZhEn: 'Features' },
  ],

  dictation: [
    { id: 'd77-v1-d1', korean: '흐름을 3일에 담았어요',          hangul: 'heu-reu-meul sam-i-re da-ma-sseo-yo',        syllables: ['흐', '름', '을', '3', '일', '에', '담', '았', '어', '요'], zh: '把流程装进3天', zhEn: 'Fit the process into 3 days' },
    { id: 'd77-v1-d2', korean: '속도보다 밀도가 중요해요',        hangul: 'sok-do-bo-da mil-do-ga jung-yo-hae-yo',      syllables: ['속', '도', '보', '다', '밀', '도', '가', '중', '요', '해', '요'], zh: '密度比速度重要', zhEn: 'Density matters more than speed' },
    { id: 'd77-v1-d3', korean: '배운 걸 실천했어요',              hangul: 'bae-un geol sil-cheon-hae-sseo-yo',          syllables: ['배', '운', '걸', '실', '천', '했', '어', '요'], zh: '把学到的实践了', zhEn: 'Put what I learned into practice' },
  ],
};
