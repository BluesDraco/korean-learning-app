import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 87 · 3-1 단어 마스터 · 妈妈来接机 · ~(으)면서 */
export const day87Vocab: VocabSubQuestData = {
  day: 27, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '공항·마중 8 个词',

  encounter: [
    { id: 'd87-v1-e1', korean: '도착홀',       hangul: 'do-cha-kol',      zh: '到达大厅',    pos: '名词',   example: { ko: '도착홀에서 엄마를 기다렸어요.', zh: '在到达大厅等妈妈。' },  tip: 'Day 87 主题词 · 到(도) + 着(착) + hall',                            tier: 'core' },
    { id: 'd87-v1-e2', korean: '마중',         hangul: 'ma-jung',         zh: '接机 / 迎接', pos: '名词',   example: { ko: '엄마 마중을 나갔어요.',          zh: '去接妈妈了。' },        tip: '固有语 · 마중을 나가다 = 去迎接',                                    tier: 'core' },
    { id: 'd87-v1-e3', korean: '맞이하다',     hangul: 'ma-ji-ha-da',     zh: '迎接',        pos: '动词',   example: { ko: '엄마를 맞이했어요.',            zh: '迎接了妈妈。' },        tip: '맞다(迎) + 이하다 · 마중과 짝',                                      tier: 'core' },
    { id: 'd87-v1-e4', korean: '항공편',       hangul: 'hang-gong-pyeon', zh: '航班',        pos: '名词',   example: { ko: 'CN123 항공편이 도착했어요.',    zh: 'CN123航班到了。' },     tip: '航(항) + 空(공) + 便(편)',                                            tier: 'core' },
    { id: 'd87-v1-e5', korean: '고개 끄덕이다', hangul: 'go-gae kkeu-deo-gi-da', zh: '点头',   pos: '动词',   example: { ko: '엄마가 고개를 끄덕였어요.',      zh: '妈妈点了点头。' },      tip: '고개(头) + 끄덕이다(点) · 边听边点头',                              tier: 'core' },
    { id: 'd87-v1-e6', korean: '청중',         hangul: 'cheong-jung',     zh: '听众',        pos: '名词',   example: { ko: '내 한국어의 청중이 왔어요.',    zh: '我韩语的听众来了。' },  tip: 'Day 87 灵魂词 · 听(청) + 众(중)',                                    tier: 'core' },
    { id: 'd87-v1-e7', korean: '팔짱을 끼다',   hangul: 'pal-jjang-eul kki-da', zh: '挽胳膊',  pos: '动词',   example: { ko: '엄마 팔짱을 꼈어요.',            zh: '挽着妈妈的胳膊。' },    tip: '팔짱(挽) + 끼다 · 亲密动作',                                          tier: 'ext' },
    { id: 'd87-v1-e8', korean: '자동문',       hangul: 'ja-dong-mun',     zh: '自动门',      pos: '名词',   example: { ko: '자동문이 열렸어요.',            zh: '自动门开了。' },        tip: '自(자) + 动(동) + 门(문)',                                            tier: 'ext' },
  ],

  recognize: [
    { id: 'd87-v1-r1', korean: '도착홀',       hangul: 'do-cha-kol',      choices: [{ zh: '到达大厅',    correct: true }, { zh: '登机口',  correct: false }, { zh: '候机室',  correct: false }, { zh: '行李处',  correct: false }] },
    { id: 'd87-v1-r2', korean: '마중',         hangul: 'ma-jung',         choices: [{ zh: '接机 / 迎接', correct: true }, { zh: '送别',    correct: false }, { zh: '出发',    correct: false }, { zh: '值机',    correct: false }] },
    { id: 'd87-v1-r3', korean: '항공편',       hangul: 'hang-gong-pyeon', choices: [{ zh: '航班',        correct: true }, { zh: '车次',    correct: false }, { zh: '船班',    correct: false }, { zh: '机票',    correct: false }] },
    { id: 'd87-v1-r4', korean: '청중',         hangul: 'cheong-jung',     choices: [{ zh: '听众',        correct: true }, { zh: '观众',    correct: false }, { zh: '演员',    correct: false }, { zh: '主持',    correct: false }] },
    { id: 'd87-v1-r5', korean: '고개 끄덕이다', hangul: 'go-gae kkeu-deo-gi-da', choices: [{ zh: '点头',   correct: true }, { zh: '摇头',    correct: false }, { zh: '低头',    correct: false }, { zh: '抬头',    correct: false }] },
    { id: 'd87-v1-r6', korean: '자동문',       hangul: 'ja-dong-mun',     choices: [{ zh: '自动门',      correct: true }, { zh: '旋转门',  correct: false }, { zh: '玻璃窗',  correct: false }, { zh: '电梯',    correct: false }] },
  ],

  spell: [
    { id: 'd87-v1-s1', zhHint: '接机',    answer: ['마', '중'],       syllables: ['마', '중', '머', '준'] },
    { id: 'd87-v1-s2', zhHint: '听众',    answer: ['청', '중'],       syllables: ['청', '중', '천', '준'] },
    { id: 'd87-v1-s3', zhHint: '航班',    answer: ['항', '공', '편'], syllables: ['항', '공', '편', '한', '곰', '평'] },
    { id: 'd87-v1-s4', zhHint: '自动门',  answer: ['자', '동', '문'], syllables: ['자', '동', '문', '차', '돔', '분'] },
  ],

  write: [
    { id: 'd87-v1-w1', korean: '마', hangul: 'ma',       wordKorean: '마중',     wordZh: '接机' },
    { id: 'd87-v1-w2', korean: '중', hangul: 'jung',     wordKorean: '마중',     wordZh: '接机' },
    { id: 'd87-v1-w3', korean: '청', hangul: 'cheong',   wordKorean: '청중',     wordZh: '听众' },
    { id: 'd87-v1-w4', korean: '항', hangul: 'hang',     wordKorean: '항공편',   wordZh: '航班' },
    { id: 'd87-v1-w5', korean: '공', hangul: 'gong',     wordKorean: '항공편',   wordZh: '航班' },
    { id: 'd87-v1-w6', korean: '편', hangul: 'pyeon',    wordKorean: '항공편',   wordZh: '航班' },
    { id: 'd87-v1-w7', korean: '자', hangul: 'ja',       wordKorean: '자동문',   wordZh: '自动门' },
    { id: 'd87-v1-w8', korean: '문', hangul: 'mun',      wordKorean: '자동문',   wordZh: '自动门' },
  ],

  dictation: [
    { id: 'd87-v1-d1', korean: '엄마를 맞이했어요',          hangul: 'eom-ma-reul ma-ji-hae-sseo-yo',         syllables: ['엄', '마', '를', '맞', '이', '했', '어', '요'], zh: '迎接了妈妈' },
    { id: 'd87-v1-d2', korean: '창밖을 보면서 설명했어요',    hangul: 'chang-ba-kkeul bo-myeon-seo seol-myeong-hae-sseo-yo', syllables: ['창', '밖', '을', '보', '면', '서', '설', '명', '했', '어', '요'], zh: '一边看窗外一边解释' },
    { id: 'd87-v1-d3', korean: '엄마가 고개를 끄덕였어요',    hangul: 'eom-ma-ga go-gae-reul kkeu-deo-gyeo-sseo-yo', syllables: ['엄', '마', '가', '고', '개', '를', '끄', '덕', '였', '어', '요'], zh: '妈妈点了点头' },
  ],
};
