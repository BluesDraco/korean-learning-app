import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 32 · 추석 · 中秋节·一个人的节日 词汇子关卡 */
export const day32Vocab: VocabSubQuestData = {
  day: 2, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '中秋节的 8 个词', subtitleEn: '8 words for Chuseok',

  encounter: [
    { id: 'd32-v1-e1', korean: '추석',      hangul: 'chu-seok',      zh: '中秋节', zhEn: 'Chuseok',        pos: '名词', posEn: 'Noun',   example: { ko: '오늘은 추석이에요.',          zh: '今天是中秋节。', zhEn: 'Today is Chuseok.' },       tip: '韩国最大传统节日之一，全家团圆吃松片糕', tipEn: 'One of Korea\'s biggest traditional holidays, families gather to eat songpyeon',                     tier: 'core' },
    { id: 'd32-v1-e2', korean: '연휴',      hangul: 'yeon-hyu',      zh: '连休 / 假期', zhEn: 'long weekend / holiday',   pos: '名词', posEn: 'Noun',   example: { ko: '연휴라서 학교가 쉬어요.',      zh: '因为放假学校休息。', zhEn: 'School is closed because of the holiday.' },   tip: '连(연) + 休(휴)。3 天以上假期都能叫 연휴', tipEn: '연(連) + 휴(休). Any holiday of 3+ days can be called 연휴',                   tier: 'core' },
    { id: 'd32-v1-e3', korean: '송편',      hangul: 'song-pyeon',    zh: '松片糕', zhEn: 'Songpyeon',        pos: '名词', posEn: 'Noun',   example: { ko: '엄마가 송편을 만들었어요.',    zh: '妈妈做了松片糕。', zhEn: 'Mom made songpyeon.' },     tip: '半月形年糕，中秋必吃，包芝麻/豆沙/栗子', tipEn: 'Half-moon rice cake, a must-eat for Chuseok, filled with sesame/red bean/chestnut',                     tier: 'core' },
    { id: 'd32-v1-e4', korean: '고향',      hangul: 'go-hyang',      zh: '故乡 / 家乡', zhEn: 'hometown',   pos: '名词', posEn: 'Noun',   example: { ko: '고향 생각이 나요.',            zh: '想起家乡了。', zhEn: 'I\'m reminded of my hometown.' },         tip: '故(고) + 乡(향)。汉字词', tipEn: '고(故) + 향(鄕). Sino-Korean word',                                     tier: 'core' },
    { id: 'd32-v1-e5', korean: '눈물',      hangul: 'nun-mul',       zh: '眼泪', zhEn: 'Tears',          pos: '名词', posEn: 'Noun',   example: { ko: '눈물이 났어요.',                zh: '流眼泪了。', zhEn: 'Tears are falling.' },           tip: '눈(眼) + 물(水)。搭配 나다 → 눈물이 나다', tipEn: '눈(eye) + 물(water). Used with 나다 → 눈물이 나다',                    tier: 'core' },
    { id: 'd32-v1-e6', korean: '보고 싶다', hangul: 'bo-go sip-da',   zh: '想 / 想念', zhEn: 'to miss / to long for',     pos: '表达', posEn: 'Expression',   example: { ko: '엄마가 보고 싶어요.',           zh: '想妈妈。', zhEn: 'I miss Mom.' },             tip: '보다(看) + 고 싶다。想人想家都用', tipEn: '보다(to see) + 고 싶다. Used for missing people or home',                            tier: 'core' },
    { id: 'd32-v1-e7', korean: '혼자',      hangul: 'hon-ja',        zh: '独自 / 一个人', zhEn: 'alone / by oneself', pos: '副词', posEn: 'Adverb',   example: { ko: '혼자 있으면 안 돼요.',          zh: '不能一个人待着。', zhEn: 'I can\'t stay alone.' },     tip: '혼자 있다 = 独处。反义 같이 / 함께', tipEn: '혼자 있다 = to be alone. Opposite: 같이 / 함께',                          tier: 'ext' },
    { id: 'd32-v1-e8', korean: '달',        hangul: 'dal',           zh: '月亮 / 月', zhEn: 'moon',     pos: '名词', posEn: 'Noun',   example: { ko: '오늘 밤 달이 밝아요.',          zh: '今晚月亮真亮。', zhEn: 'The moon is really bright tonight.' },       tip: '달 = 月亮；也表"个月"(时长)：한 달 = 一个月。注意日历月份用「월」(1월=일월)，别和 달 混', tipEn: '달 = moon; also means \'month\' (duration): 한 달 = one month. Note: calendar months use 월 (1월=일월), don\'t confuse with 달',                             tier: 'ext' },
  ],

  recognize: [
    { id: 'd32-v1-r1', korean: '추석',      hangul: 'chu-seok',     choices: [{ zh: '中秋节', zhEn: 'Chuseok',       correct: true }, { zh: '春节', zhEn: 'Lunar New Year',       correct: false }, { zh: '端午', zhEn: 'Dano (festival)',       correct: false }, { zh: '生日', zhEn: 'birthday',       correct: false }] },
    { id: 'd32-v1-r2', korean: '연휴',      hangul: 'yeon-hyu',     choices: [{ zh: '连休 / 假期', zhEn: 'long weekend / holiday',  correct: true }, { zh: '周末', zhEn: 'weekend',       correct: false }, { zh: '工作日', zhEn: 'weekday',     correct: false }, { zh: '午休', zhEn: 'lunch break',       correct: false }] },
    { id: 'd32-v1-r3', korean: '송편',      hangul: 'song-pyeon',   choices: [{ zh: '松片糕', zhEn: 'Songpyeon',       correct: true }, { zh: '月饼', zhEn: 'Mooncake',       correct: false }, { zh: '年糕汤', zhEn: 'Rice cake soup',     correct: false }, { zh: '饺子', zhEn: 'dumplings',       correct: false }] },
    { id: 'd32-v1-r4', korean: '고향',      hangul: 'go-hyang',     choices: [{ zh: '故乡', zhEn: 'hometown',         correct: true }, { zh: '首都', zhEn: 'capital',       correct: false }, { zh: '故人', zhEn: 'old friend',       correct: false }, { zh: '异乡', zhEn: 'foreign land',       correct: false }] },
    { id: 'd32-v1-r5', korean: '눈물',      hangul: 'nun-mul',      choices: [{ zh: '眼泪', zhEn: 'Tears',         correct: true }, { zh: '汗水', zhEn: 'sweat',       correct: false }, { zh: '鼻涕', zhEn: 'runny nose',       correct: false }, { zh: '露水', zhEn: 'dew',       correct: false }] },
    { id: 'd32-v1-r6', korean: '보고 싶다', hangul: 'bo-go sip-da', choices: [{ zh: '想 / 想念', zhEn: 'to miss / to long for',    correct: true }, { zh: '看见', zhEn: 'to see',       correct: false }, { zh: '不想看', zhEn: 'don\'t want to see',     correct: false }, { zh: '希望', zhEn: 'hope',       correct: false }] },
  ],

  spell: [
    { id: 'd32-v1-s1', zhHint: '中秋节', zhHintEn: 'Chuseok',    answer: ['추', '석'],  syllables: ['추', '석', '수', '섭'] },
    { id: 'd32-v1-s2', zhHint: '连休', zhHintEn: 'long holiday',      answer: ['연', '휴'],  syllables: ['연', '휴', '영', '휴'] },
    { id: 'd32-v1-s3', zhHint: '故乡', zhHintEn: 'hometown',      answer: ['고', '향'],  syllables: ['고', '향', '구', '항'] },
    { id: 'd32-v1-s4', zhHint: '眼泪', zhHintEn: 'Tears',      answer: ['눈', '물'],  syllables: ['눈', '물', '눔', '무'] },
  ],

  write: [
    { id: 'd32-v1-w1', korean: '추', hangul: 'chu',       wordKorean: '추석',      wordZh: '中秋节', wordZhEn: 'Chuseok' },
    { id: 'd32-v1-w2', korean: '석', hangul: 'seok',      wordKorean: '추석',      wordZh: '中秋节', wordZhEn: 'Chuseok' },
    { id: 'd32-v1-w3', korean: '연', hangul: 'yeon',      wordKorean: '연휴',      wordZh: '连休', wordZhEn: 'long holiday' },
    { id: 'd32-v1-w4', korean: '휴', hangul: 'hyu',       wordKorean: '연휴',      wordZh: '连休', wordZhEn: 'long holiday' },
    { id: 'd32-v1-w5', korean: '송', hangul: 'song',      wordKorean: '송편',      wordZh: '松片糕', wordZhEn: 'Songpyeon' },
    { id: 'd32-v1-w6', korean: '편', hangul: 'pyeon',     wordKorean: '송편',      wordZh: '松片糕', wordZhEn: 'Songpyeon' },
    { id: 'd32-v1-w7', korean: '고', hangul: 'go',        wordKorean: '고향',      wordZh: '故乡', wordZhEn: 'hometown' },
    { id: 'd32-v1-w8', korean: '향', hangul: 'hyang',     wordKorean: '고향',      wordZh: '故乡', wordZhEn: 'hometown' },
  ],

  dictation: [
    { id: 'd32-v1-d1', korean: '연휴라서',     hangul: 'yeon-hyu-ra-seo',       syllables: ['연', '휴', '라', '서'],       zh: '因为放假', zhEn: 'because of the holiday' },
    { id: 'd32-v1-d2', korean: '고향이 그리워요', hangul: 'go-hyang-i geu-ri-wo-yo', syllables: ['고', '향', '이', '그', '리', '워', '요'], zh: '想念家乡', zhEn: 'miss home' },
    { id: 'd32-v1-d3', korean: '눈물이 났어요',  hangul: 'nun-mu-ri na-sseo-yo',    syllables: ['눈', '물', '이', '났', '어', '요'], zh: '流眼泪了', zhEn: 'tears fell' },
  ],
};
