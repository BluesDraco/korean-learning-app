import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 77 · 3-1 단어 마스터 · 여행 계획 발표·最高分 · ~을/를 ~에 담다 */
export const day77Vocab: VocabSubQuestData = {
  day: 17, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '발표·설계 8 个词',

  encounter: [
    { id: 'd77-v1-e1', korean: '계획',       hangul: 'gye-hoek',       zh: '计划',        pos: '名词',   example: { ko: '여행 계획을 세웠어요.',          zh: '定了旅行计划。' },      tip: 'Day 77 主题词 · 计(계) + 划(획) · 계획을 세우다 = 定计划',              tier: 'core' },
    { id: 'd77-v1-e2', korean: '발표',       hangul: 'bal-pyo',        zh: '发表 / 展示', pos: '名词',   example: { ko: '발표가 잘 끝났어요.',            zh: '发表顺利结束了。' },    tip: '发(발) + 表(표) · 발표하다 = 做展示',                                  tier: 'core' },
    { id: 'd77-v1-e3', korean: '흐름',       hangul: 'heu-reum',       zh: '流程 / 脉络', pos: '名词',   example: { ko: '자연-문화-휴식의 흐름이에요.',    zh: '自然-文化-休息的流程。' }, tip: '흐르다(流) → 흐름 · 설계 어휘',                                        tier: 'core' },
    { id: 'd77-v1-e4', korean: '밀도',       hangul: 'mil-do',         zh: '密度',        pos: '名词',   example: { ko: '속도보다 밀도가 중요해요.',      zh: '密度比速度重要。' },    tip: '密(밀) + 度(도) · Day 77 명제 키워드',                                 tier: 'core' },
    { id: 'd77-v1-e5', korean: '설계',       hangul: 'seol-gye',       zh: '设计',        pos: '名词',   example: { ko: '흐름의 설계예요.',              zh: '流程的设计。' },        tip: '设(설) + 计(계) · 설계하다 = 设计',                                    tier: 'core' },
    { id: 'd77-v1-e6', korean: '실천하다',   hangul: 'sil-cheon-ha-da', zh: '实践',       pos: '动词',   example: { ko: '배운 걸 실천했어요.',            zh: '把学到的实践了。' },    tip: '实(실) + 践(천) + 하다',                                              tier: 'core' },
    { id: 'd77-v1-e7', korean: '특징',       hangul: 'teuk-jing',      zh: '特点 / 特征', pos: '名词',   example: { ko: '이 계획의 특징이에요.',          zh: '这是本计划的特点。' },  tip: '特(특) + 徵(징) · 发表常用',                                          tier: 'ext' },
    { id: 'd77-v1-e8', korean: '가상',       hangul: 'ga-sang',        zh: '虚拟 / 假想', pos: '名词',   example: { ko: '가상 여행 계획이에요.',          zh: '是虚拟旅行计划。' },    tip: '假(가) + 想(상) · 반대 = 실제',                                        tier: 'ext' },
  ],

  recognize: [
    { id: 'd77-v1-r1', korean: '계획',       hangul: 'gye-hoek',       choices: [{ zh: '计划',        correct: true }, { zh: '结果',    correct: false }, { zh: '记录',    correct: false }, { zh: '契约',    correct: false }] },
    { id: 'd77-v1-r2', korean: '발표',       hangul: 'bal-pyo',        choices: [{ zh: '发表 / 展示', correct: true }, { zh: '发音',    correct: false }, { zh: '发现',    correct: false }, { zh: '发送',    correct: false }] },
    { id: 'd77-v1-r3', korean: '흐름',       hangul: 'heu-reum',       choices: [{ zh: '流程 / 脉络', correct: true }, { zh: '结尾',    correct: false }, { zh: '声音',    correct: false }, { zh: '云',      correct: false }] },
    { id: 'd77-v1-r4', korean: '밀도',       hangul: 'mil-do',         choices: [{ zh: '密度',        correct: true }, { zh: '速度',    correct: false }, { zh: '温度',    correct: false }, { zh: '高度',    correct: false }] },
    { id: 'd77-v1-r5', korean: '실천하다',   hangul: 'sil-cheon-ha-da', choices: [{ zh: '实践',       correct: true }, { zh: '计划',    correct: false }, { zh: '想象',    correct: false }, { zh: '放弃',    correct: false }] },
    { id: 'd77-v1-r6', korean: '특징',       hangul: 'teuk-jing',      choices: [{ zh: '特点 / 特征', correct: true }, { zh: '缺点',    correct: false }, { zh: '优惠',    correct: false }, { zh: '习惯',    correct: false }] },
  ],

  spell: [
    { id: 'd77-v1-s1', zhHint: '发表',    answer: ['발', '표'], syllables: ['발', '표', '반', '포'] },
    { id: 'd77-v1-s2', zhHint: '设计',    answer: ['설', '계'], syllables: ['설', '계', '섬', '개'] },
    { id: 'd77-v1-s3', zhHint: '密度',    answer: ['밀', '도'], syllables: ['밀', '도', '민', '토'] },
    { id: 'd77-v1-s4', zhHint: '特点',    answer: ['특', '징'], syllables: ['특', '징', '득', '정'] },
  ],

  write: [
    { id: 'd77-v1-w1', korean: '계', hangul: 'gye',      wordKorean: '계획',       wordZh: '计划' },
    { id: 'd77-v1-w2', korean: '획', hangul: 'hoek',     wordKorean: '계획',       wordZh: '计划' },
    { id: 'd77-v1-w3', korean: '발', hangul: 'bal',      wordKorean: '발표',       wordZh: '发表' },
    { id: 'd77-v1-w4', korean: '표', hangul: 'pyo',      wordKorean: '발표',       wordZh: '发表' },
    { id: 'd77-v1-w5', korean: '설', hangul: 'seol',     wordKorean: '설계',       wordZh: '设计' },
    { id: 'd77-v1-w6', korean: '밀', hangul: 'mil',      wordKorean: '밀도',       wordZh: '密度' },
    { id: 'd77-v1-w7', korean: '실', hangul: 'sil',      wordKorean: '실천하다',   wordZh: '实践' },
    { id: 'd77-v1-w8', korean: '특', hangul: 'teuk',     wordKorean: '특징',       wordZh: '特点' },
  ],

  dictation: [
    { id: 'd77-v1-d1', korean: '흐름을 3일에 담았어요',          hangul: 'heu-reu-meul sam-i-re da-ma-sseo-yo',        syllables: ['흐', '름', '을', '3', '일', '에', '담', '았', '어', '요'], zh: '把流程装进3天' },
    { id: 'd77-v1-d2', korean: '속도보다 밀도가 중요해요',        hangul: 'sok-do-bo-da mil-do-ga jung-yo-hae-yo',      syllables: ['속', '도', '보', '다', '밀', '도', '가', '중', '요', '해', '요'], zh: '密度比速度重要' },
    { id: 'd77-v1-d3', korean: '배운 걸 실천했어요',              hangul: 'bae-un geol sil-cheon-hae-sseo-yo',          syllables: ['배', '운', '걸', '실', '천', '했', '어', '요'], zh: '把学到的实践了' },
  ],
};
