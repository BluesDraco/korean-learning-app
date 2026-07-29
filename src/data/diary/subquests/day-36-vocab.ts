import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 36 · 妈妈的包裹 · 词汇子关卡 */
export const day36Vocab: VocabSubQuestData = {
  day: 6, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '妈妈从中国寄来的 8 个词',

  encounter: [
    { id: 'd36-v1-e1', korean: '소포',        hangul: 'so-po',           zh: '包裹',        pos: '名词',   example: { ko: '엄마가 소포를 보냈어요.',       zh: '妈妈寄了包裹。' },   tip: '小(소) + 包(포) 汉字词 · 택배 = 快递（国内更常用）',           tier: 'core' },
    { id: 'd36-v1-e2', korean: '보내다',      hangul: 'bo-nae-da',        zh: '寄 / 送',     pos: '动词',   example: { ko: '편지를 보내주셨어요.',           zh: '给我寄了信。' },     tip: '보내다 → 보냈어요 / 보내주다（为我寄）',                        tier: 'core' },
    { id: 'd36-v1-e3', korean: '경비실',      hangul: 'gyeong-bi-sil',    zh: '值班室',      pos: '名词',   example: { ko: '경비실에서 소포를 찾았어요.',   zh: '在值班室拿到了包裹。' }, tip: '警备(경비) + 室(실) · 宿舍/公寓一楼收快递的地方',              tier: 'core' },
    { id: 'd36-v1-e4', korean: '고춧가루',    hangul: 'go-chut-ga-ru',   zh: '辣椒粉',      pos: '名词',   example: { ko: '엄마가 고춧가루도 보냈어요.',   zh: '妈妈还寄了辣椒粉。' }, tip: '고추(辣椒) + 가루(粉) · 韩国厨房必备',                          tier: 'core' },
    { id: 'd36-v1-e5', korean: '눈물이 나다', hangul: 'nun-mu-ri na-da',  zh: '流眼泪',      pos: '表达',   example: { ko: '갑자기 눈물이 났어요.',           zh: '突然流眼泪了。' },   tip: '눈물(眼泪) + 나다(出现) · 主语用 이/가',                       tier: 'core' },
    { id: 'd36-v1-e6', korean: '그리워하다',  hangul: 'geu-ri-wo-ha-da', zh: '想念 / 思念',  pos: '动词',   example: { ko: '엄마를 그리워하고 있어요.',      zh: '想念着妈妈。' },     tip: '比 보고 싶다 更深沉 · 长期分离的情感',                          tier: 'core' },
    { id: 'd36-v1-e7', korean: '챙기다',      hangul: 'chaeng-gi-da',    zh: '打点 / 备好', pos: '动词',   example: { ko: '엄마가 다 챙겨주셨어요.',        zh: '妈妈全都备好了。' }, tip: '为别人 챙겨주다 · 表关怀',                                      tier: 'ext' },
    { id: 'd36-v1-e8', korean: '상자',        hangul: 'sang-ja',         zh: '箱子',        pos: '名词',   example: { ko: '상자를 열었어요.',                zh: '打开了箱子。' },     tip: '与 소포 搭配 · 소포 상자 = 包裹箱',                             tier: 'ext' },
  ],

  recognize: [
    { id: 'd36-v1-r1', korean: '소포',        hangul: 'so-po',           choices: [{ zh: '包裹',        correct: true }, { zh: '信件',        correct: false }, { zh: '货物',        correct: false }, { zh: '行李',      correct: false }] },
    { id: 'd36-v1-r2', korean: '보내다',      hangul: 'bo-nae-da',        choices: [{ zh: '寄',          correct: true }, { zh: '收',          correct: false }, { zh: '买',          correct: false }, { zh: '拿',        correct: false }] },
    { id: 'd36-v1-r3', korean: '경비실',      hangul: 'gyeong-bi-sil',    choices: [{ zh: '值班室',      correct: true }, { zh: '教室',        correct: false }, { zh: '洗手间',      correct: false }, { zh: '厨房',      correct: false }] },
    { id: 'd36-v1-r4', korean: '고춧가루',    hangul: 'go-chut-ga-ru',   choices: [{ zh: '辣椒粉',      correct: true }, { zh: '花椒',        correct: false }, { zh: '芝麻粉',      correct: false }, { zh: '盐',        correct: false }] },
    { id: 'd36-v1-r5', korean: '눈물이 나다', hangul: 'nun-mu-ri na-da',  choices: [{ zh: '流眼泪',      correct: true }, { zh: '流鼻涕',      correct: false }, { zh: '流汗',        correct: false }, { zh: '流血',      correct: false }] },
    { id: 'd36-v1-r6', korean: '그리워하다',  hangul: 'geu-ri-wo-ha-da', choices: [{ zh: '想念',        correct: true }, { zh: '喜欢',        correct: false }, { zh: '讨厌',        correct: false }, { zh: '感谢',      correct: false }] },
  ],

  spell: [
    { id: 'd36-v1-s1', zhHint: '包裹',      answer: ['소', '포'], syllables: ['소', '포', '소', '보'] },
    { id: 'd36-v1-s2', zhHint: '值班室',    answer: ['경', '비', '실'], syllables: ['경', '비', '실', '싱', '싣'] },
    { id: 'd36-v1-s3', zhHint: '辣椒',      answer: ['고', '추'], syllables: ['고', '추', '구', '추'] },
    { id: 'd36-v1-s4', zhHint: '箱子',      answer: ['상', '자'], syllables: ['상', '자', '샹', '자'] },
  ],

  write: [
    { id: 'd36-v1-w1', korean: '소', hangul: 'so',        wordKorean: '소포',      wordZh: '包裹' },
    { id: 'd36-v1-w2', korean: '포', hangul: 'po',        wordKorean: '소포',      wordZh: '包裹' },
    { id: 'd36-v1-w3', korean: '경', hangul: 'gyeong',    wordKorean: '경비실',    wordZh: '值班室' },
    { id: 'd36-v1-w4', korean: '비', hangul: 'bi',        wordKorean: '경비실',    wordZh: '值班室' },
    { id: 'd36-v1-w5', korean: '고', hangul: 'go',        wordKorean: '고춧가루',  wordZh: '辣椒粉' },
    { id: 'd36-v1-w6', korean: '춧', hangul: 'chut',      wordKorean: '고춧가루',  wordZh: '辣椒粉' },
    { id: 'd36-v1-w7', korean: '눈', hangul: 'nun',       wordKorean: '눈물',      wordZh: '眼泪' },
    { id: 'd36-v1-w8', korean: '물', hangul: 'mul',       wordKorean: '눈물',      wordZh: '眼泪' },
  ],

  dictation: [
    { id: 'd36-v1-d1', korean: '보내주셨어요',      hangul: 'bo-nae-ju-syeo-sseo-yo',   syllables: ['보', '내', '주', '셨', '어', '요'],            zh: '（长辈）给我寄了' },
    { id: 'd36-v1-d2', korean: '소포가 왔어요',       hangul: 'so-po-ga wa-sseo-yo',      syllables: ['소', '포', '가', '왔', '어', '요'],            zh: '包裹到了' },
    { id: 'd36-v1-d3', korean: '고춧가루도 있어요',   hangul: 'go-chut-ga-ru-do i-sseo-yo', syllables: ['고', '춧', '가', '루', '도', '있', '어', '요'], zh: '还有辣椒粉' },
  ],
};
