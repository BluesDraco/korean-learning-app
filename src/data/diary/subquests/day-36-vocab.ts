import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 36 · 妈妈的包裹 · 词汇子关卡 */
export const day36Vocab: VocabSubQuestData = {
  day: 6, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '妈妈从中国寄来的 8 个词', subtitleEn: '8 words mom sent from China',

  encounter: [
    { id: 'd36-v1-e1', korean: '소포',        hangul: 'so-po',           zh: '包裹', zhEn: 'package / parcel',        pos: '名词', posEn: 'Noun',   example: { ko: '엄마가 소포를 보냈어요.',       zh: '妈妈寄了包裹。', zhEn: 'Mom sent a package.' },   tip: '小(소) + 包(포) 汉字词 · 택배 = 快递（国内更常用）', tipEn: '소(小) + 포(包) Sino-Korean · 택배 = parcel (more common domestically)',           tier: 'core' },
    { id: 'd36-v1-e2', korean: '보내다',      hangul: 'bo-nae-da',        zh: '寄 / 送', zhEn: 'send',     pos: '动词', posEn: 'Verb',   example: { ko: '편지를 보내주셨어요.',           zh: '给我寄了信。', zhEn: 'He sent me a letter.' },     tip: '보내다 → 보냈어요 / 보내주다（为我寄）', tipEn: '보내다 → 보냈어요 / 보내주다 (send for me)',                        tier: 'core' },
    { id: 'd36-v1-e3', korean: '경비실',      hangul: 'gyeong-bi-sil',    zh: '值班室', zhEn: 'security office',      pos: '名词', posEn: 'Noun',   example: { ko: '경비실에서 소포를 찾았어요.',   zh: '在值班室拿到了包裹。', zhEn: 'I picked up the package at the security office.' }, tip: '警备(경비) + 室(실) · 宿舍/公寓一楼收快递的地方', tipEn: '경비(guard) + 실(room) · place on first floor of dorm/apartment to receive parcels',              tier: 'core' },
    { id: 'd36-v1-e4', korean: '고춧가루',    hangul: 'go-chut-ga-ru',   zh: '辣椒粉', zhEn: 'chili powder',      pos: '名词', posEn: 'Noun',   example: { ko: '엄마가 고춧가루도 보냈어요.',   zh: '妈妈还寄了辣椒粉。', zhEn: 'Mom also sent chili powder.' }, tip: '고추(辣椒) + 가루(粉) · 韩国厨房必备', tipEn: '고추(chili) + 가루(powder) · essential in Korean kitchen',                          tier: 'core' },
    { id: 'd36-v1-e5', korean: '눈물이 나다', hangul: 'nun-mu-ri na-da',  zh: '流眼泪', zhEn: 'Tears streaming down',      pos: '表达', posEn: 'Expression',   example: { ko: '갑자기 눈물이 났어요.',           zh: '突然流眼泪了。', zhEn: 'Suddenly tears came.' },   tip: '눈물(眼泪) + 나다(出现) · 主语用 이/가', tipEn: '눈물(tears) + 나다(appear) · subject takes 이/가',                       tier: 'core' },
    { id: 'd36-v1-e6', korean: '그리워하다',  hangul: 'geu-ri-wo-ha-da', zh: '想念 / 思念', zhEn: 'Miss / Long for',  pos: '动词', posEn: 'Verb',   example: { ko: '엄마를 그리워하고 있어요.',      zh: '想念着妈妈。', zhEn: 'I miss my mom.' },     tip: '比 보고 싶다 更深沉 · 长期分离的情感', tipEn: 'Deeper than 보고 싶다 · emotion of long separation',                          tier: 'core' },
    { id: 'd36-v1-e7', korean: '챙기다',      hangul: 'chaeng-gi-da',    zh: '打点 / 备好', zhEn: 'Prepare / Get ready', pos: '动词', posEn: 'Verb',   example: { ko: '엄마가 다 챙겨주셨어요.',        zh: '妈妈全都备好了。', zhEn: 'Mom got everything ready.' }, tip: '为别人 챙겨주다 · 表关怀', tipEn: 'For others 챙겨주다 · showing care',                                      tier: 'ext' },
    { id: 'd36-v1-e8', korean: '상자',        hangul: 'sang-ja',         zh: '箱子', zhEn: 'box',        pos: '名词', posEn: 'Noun',   example: { ko: '상자를 열었어요.',                zh: '打开了箱子。', zhEn: 'Opened the box.' },     tip: '与 소포 搭配 · 소포 상자 = 包裹箱', tipEn: 'Pairs with 소포 · 소포 상자 = parcel box',                             tier: 'ext' },
  ],

  recognize: [
    { id: 'd36-v1-r1', korean: '소포',        hangul: 'so-po',           choices: [{ zh: '包裹', zhEn: 'package / parcel',        correct: true }, { zh: '信件', zhEn: 'Letter',        correct: false }, { zh: '货物', zhEn: 'Goods',        correct: false }, { zh: '行李', zhEn: 'luggage',      correct: false }] },
    { id: 'd36-v1-r2', korean: '보내다',      hangul: 'bo-nae-da',        choices: [{ zh: '寄', zhEn: 'send',          correct: true }, { zh: '收', zhEn: 'Receive',          correct: false }, { zh: '买', zhEn: 'Buy',          correct: false }, { zh: '拿', zhEn: 'To take',        correct: false }] },
    { id: 'd36-v1-r3', korean: '경비실',      hangul: 'gyeong-bi-sil',    choices: [{ zh: '值班室', zhEn: 'security office',      correct: true }, { zh: '教室', zhEn: 'Classroom',        correct: false }, { zh: '洗手间', zhEn: 'Bathroom',      correct: false }, { zh: '厨房', zhEn: 'Kitchen',      correct: false }] },
    { id: 'd36-v1-r4', korean: '고춧가루',    hangul: 'go-chut-ga-ru',   choices: [{ zh: '辣椒粉', zhEn: 'chili powder',      correct: true }, { zh: '花椒', zhEn: 'Sichuan pepper',        correct: false }, { zh: '芝麻粉', zhEn: 'Sesame powder',      correct: false }, { zh: '盐', zhEn: 'Salt',        correct: false }] },
    { id: 'd36-v1-r5', korean: '눈물이 나다', hangul: 'nun-mu-ri na-da',  choices: [{ zh: '流眼泪', zhEn: 'Tears streaming down',      correct: true }, { zh: '流鼻涕', zhEn: 'Runny nose',      correct: false }, { zh: '流汗', zhEn: 'Sweat',        correct: false }, { zh: '流血', zhEn: 'Bleed',      correct: false }] },
    { id: 'd36-v1-r6', korean: '그리워하다',  hangul: 'geu-ri-wo-ha-da', choices: [{ zh: '想念', zhEn: 'miss',        correct: true }, { zh: '喜欢', zhEn: 'like',        correct: false }, { zh: '讨厌', zhEn: 'To hate',        correct: false }, { zh: '感谢', zhEn: 'Thanks',      correct: false }] },
  ],

  spell: [
    { id: 'd36-v1-s1', zhHint: '包裹', zhHintEn: 'package / parcel',      answer: ['소', '포'], syllables: ['소', '포', '소', '보'] },
    { id: 'd36-v1-s2', zhHint: '值班室', zhHintEn: 'security office',    answer: ['경', '비', '실'], syllables: ['경', '비', '실', '싱', '싣'] },
    { id: 'd36-v1-s3', zhHint: '辣椒', zhHintEn: 'Chili pepper',      answer: ['고', '추'], syllables: ['고', '추', '구', '추'] },
    { id: 'd36-v1-s4', zhHint: '箱子', zhHintEn: 'box',      answer: ['상', '자'], syllables: ['상', '자', '샹', '자'] },
  ],

  write: [
    { id: 'd36-v1-w1', korean: '소', hangul: 'so',        wordKorean: '소포',      wordZh: '包裹', wordZhEn: 'package / parcel' },
    { id: 'd36-v1-w2', korean: '포', hangul: 'po',        wordKorean: '소포',      wordZh: '包裹', wordZhEn: 'package / parcel' },
    { id: 'd36-v1-w3', korean: '경', hangul: 'gyeong',    wordKorean: '경비실',    wordZh: '值班室', wordZhEn: 'security office' },
    { id: 'd36-v1-w4', korean: '비', hangul: 'bi',        wordKorean: '경비실',    wordZh: '值班室', wordZhEn: 'security office' },
    { id: 'd36-v1-w5', korean: '고', hangul: 'go',        wordKorean: '고춧가루',  wordZh: '辣椒粉', wordZhEn: 'chili powder' },
    { id: 'd36-v1-w6', korean: '춧', hangul: 'chut',      wordKorean: '고춧가루',  wordZh: '辣椒粉', wordZhEn: 'chili powder' },
    { id: 'd36-v1-w7', korean: '눈', hangul: 'nun',       wordKorean: '눈물',      wordZh: '眼泪', wordZhEn: 'Tears' },
    { id: 'd36-v1-w8', korean: '물', hangul: 'mul',       wordKorean: '눈물',      wordZh: '眼泪', wordZhEn: 'Tears' },
  ],

  dictation: [
    { id: 'd36-v1-d1', korean: '보내주셨어요',      hangul: 'bo-nae-ju-syeo-sseo-yo',   syllables: ['보', '내', '주', '셨', '어', '요'],            zh: '（长辈）给我寄了', zhEn: '(Elder) sent me' },
    { id: 'd36-v1-d2', korean: '소포가 왔어요',       hangul: 'so-po-ga wa-sseo-yo',      syllables: ['소', '포', '가', '왔', '어', '요'],            zh: '包裹到了', zhEn: 'The package arrived' },
    { id: 'd36-v1-d3', korean: '고춧가루도 있어요',   hangul: 'go-chut-ga-ru-do i-sseo-yo', syllables: ['고', '춧', '가', '루', '도', '있', '어', '요'], zh: '还有辣椒粉', zhEn: 'And chili powder too' },
  ],
};
