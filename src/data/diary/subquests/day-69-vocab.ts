import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 69 · 3-1 단어 마스터 · 반차별 논단 */
export const day69Vocab: VocabSubQuestData = {
  day: 9, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '반차별 논단 8 个词', subtitleEn: '반차별 논단 8 words',

  encounter: [
    { id: 'd69-v1-e1', korean: '논단',       hangul: 'non-dan',         zh: '论坛', zhEn: 'forum',    pos: '名词', posEn: 'Noun',   example: { ko: '반차별 논단이에요.',              zh: '是反歧视论坛。', zhEn: 'It\'s an anti-discrimination forum.' },       tip: '论(논) + 坛(단) · 학생 논단 = 学生论坛', tipEn: '论(논) + 坛(단) · 학생 논단 = student forum',                                    tier: 'core' },
    { id: 'd69-v1-e2', korean: '차별',       hangul: 'cha-byeol',       zh: '歧视', zhEn: 'Discrimination',    pos: '名词', posEn: 'Noun',   example: { ko: '차별을 반대해요.',                zh: '反对歧视。', zhEn: 'Oppose discrimination.' },           tip: '差(차) + 别(별) · 반차별 = 反歧视', tipEn: '차 (difference) + 별 (distinction) · 반차별 = anti-discrimination',                                        tier: 'core' },
    { id: 'd69-v1-e3', korean: '발표',       hangul: 'bal-pyo',         zh: '发表 / 演讲', zhEn: 'Presentation / speech', pos: '名词', posEn: 'Noun', example: { ko: '3 분 발표예요.',                    zh: '是 3 分钟演讲。', zhEn: 'It\'s a 3-minute speech.' },     tip: '发(발) + 表(표) · 발표하다 = 演讲', tipEn: '발 (emit) + 표 (surface) · 발표하다 = to present / to give a speech',                                          tier: 'core' },
    { id: 'd69-v1-e4', korean: '언어',       hangul: 'eon-eo',          zh: '语言', zhEn: 'language',    pos: '名词', posEn: 'Noun',   example: { ko: '언어로 깨야 해요.',                zh: '要用语言打破。', zhEn: 'Break it with words.' },       tip: '言(언) + 语(어) · Day 69 主题词', tipEn: '言(언) + 语(어) · Day 69 Theme Word',                                          tier: 'core' },
    { id: 'd69-v1-e5', korean: '깨다',        hangul: 'kkae-da',         zh: '打破 / 破坏', zhEn: 'break / destroy', pos: '动词', posEn: 'Verb', example: { ko: '편견을 깨야 해요.',                zh: '必须打破偏见。', zhEn: 'You must break the prejudice.' },       tip: '편견을 깨다 = 打破偏见 · 惯用组合', tipEn: '편견을 깨다 = Break prejudice · Common Collocation',                                        tier: 'core' },
    { id: 'd69-v1-e6', korean: '상처받다',  hangul: 'sang-cheo-bat-da', zh: '受伤', zhEn: 'Get hurt',   pos: '动词', posEn: 'Verb',   example: { ko: '편견 때문에 상처받았어요.',        zh: '因为偏见受伤。', zhEn: 'Hurt because of prejudice.' },       tip: '傷(상) + 处(처) + 받다 · 心 / 身都能用', tipEn: '傷(상) + 处(처) + 받다 · Works for heart / body',                                    tier: 'core' },
    { id: 'd69-v1-e7', korean: '박수',       hangul: 'bak-su',          zh: '掌声', zhEn: 'Applause',    pos: '名词', posEn: 'Noun',   example: { ko: '첫 박수, 두 번째 박수.',           zh: '第一声掌声，第二声掌声。', zhEn: 'First round of applause, second round of applause.' }, tip: 'Day 42 · Day 60 复用 · 논단 收束高潮', tipEn: 'Day 42 · Day 60 Reuse · 논단 Climax',                                     tier: 'ext' },
    { id: 'd69-v1-e8', korean: '정적',       hangul: 'jeong-jeok',      zh: '静默', zhEn: 'Silence',    pos: '名词', posEn: 'Noun',   example: { ko: '3초 정적.',                          zh: '3 秒静默。', zhEn: '3 seconds of silence.' },           tip: '静(정) + 寂(적) · Day 60 学过', tipEn: '静(정) + 寂(적) · Learned on Day 60',                                              tier: 'ext' },
  ],

  recognize: [
    { id: 'd69-v1-r1', korean: '논단',       hangul: 'non-dan',          choices: [{ zh: '论坛', zhEn: 'forum',        correct: true }, { zh: '会议', zhEn: 'meeting',        correct: false }, { zh: '论文', zhEn: 'Thesis',        correct: false }, { zh: '发表会', zhEn: 'Presentation',      correct: false }] },
    { id: 'd69-v1-r2', korean: '차별',       hangul: 'cha-byeol',        choices: [{ zh: '歧视', zhEn: 'Discrimination',        correct: true }, { zh: '选择', zhEn: 'choice',        correct: false }, { zh: '判断', zhEn: 'Judgment',        correct: false }, { zh: '区分', zhEn: 'Distinguish',        correct: false }] },
    { id: 'd69-v1-r3', korean: '발표',       hangul: 'bal-pyo',          choices: [{ zh: '发表 / 演讲', zhEn: 'Presentation / speech', correct: true }, { zh: '出版', zhEn: 'Publish',        correct: false }, { zh: '公告', zhEn: 'Announcement',        correct: false }, { zh: '通知', zhEn: 'Notice',        correct: false }] },
    { id: 'd69-v1-r4', korean: '언어',       hangul: 'eon-eo',           choices: [{ zh: '语言', zhEn: 'language',        correct: true }, { zh: '文字', zhEn: 'writing system',        correct: false }, { zh: '文化', zhEn: 'culture',        correct: false }, { zh: '声音', zhEn: 'Voice',        correct: false }] },
    { id: 'd69-v1-r5', korean: '깨다',        hangul: 'kkae-da',          choices: [{ zh: '打破', zhEn: 'break',        correct: true }, { zh: '合上', zhEn: 'Close',        correct: false }, { zh: '装满', zhEn: 'fill up',        correct: false }, { zh: '藏起', zhEn: 'hide',        correct: false }] },
    { id: 'd69-v1-r6', korean: '상처받다',  hangul: 'sang-cheo-bat-da', choices: [{ zh: '受伤', zhEn: 'Get hurt',        correct: true }, { zh: '康复', zhEn: 'Recovery',        correct: false }, { zh: '出发', zhEn: 'Departure',        correct: false }, { zh: '躲避', zhEn: 'Avoid',        correct: false }] },
  ],

  spell: [
    { id: 'd69-v1-s1', zhHint: '论坛', zhHintEn: 'forum',      answer: ['논', '단'], syllables: ['논', '단', '논', '탄'] },
    { id: 'd69-v1-s2', zhHint: '歧视', zhHintEn: 'Discrimination',      answer: ['차', '별'], syllables: ['차', '별', '자', '결'] },
    { id: 'd69-v1-s3', zhHint: '发表', zhHintEn: 'Presentation',      answer: ['발', '표'], syllables: ['발', '표', '반', '표'] },
    { id: 'd69-v1-s4', zhHint: '语言', zhHintEn: 'language',      answer: ['언', '어'], syllables: ['언', '어', '연', '어'] },
  ],

  write: [
    { id: 'd69-v1-w1', korean: '논', hangul: 'non',       wordKorean: '논단',        wordZh: '论坛', wordZhEn: 'forum' },
    { id: 'd69-v1-w2', korean: '단', hangul: 'dan',       wordKorean: '논단',        wordZh: '论坛', wordZhEn: 'forum' },
    { id: 'd69-v1-w3', korean: '차', hangul: 'cha',       wordKorean: '차별',        wordZh: '歧视', wordZhEn: 'Discrimination' },
    { id: 'd69-v1-w4', korean: '별', hangul: 'byeol',     wordKorean: '차별',        wordZh: '歧视', wordZhEn: 'Discrimination' },
    { id: 'd69-v1-w5', korean: '발', hangul: 'bal',       wordKorean: '발표',        wordZh: '演讲', wordZhEn: 'Speech' },
    { id: 'd69-v1-w6', korean: '언', hangul: 'eon',       wordKorean: '언어',        wordZh: '语言', wordZhEn: 'language' },
    { id: 'd69-v1-w7', korean: '깨', hangul: 'kkae',      wordKorean: '깨다',        wordZh: '打破', wordZhEn: 'break' },
    { id: 'd69-v1-w8', korean: '박', hangul: 'bak',       wordKorean: '박수',        wordZh: '掌声', wordZhEn: 'Applause' },
  ],

  dictation: [
    { id: 'd69-v1-d1', korean: '편견은 언어로 깨야 해요',            hangul: 'pyeon-gyeon-eun eon-eo-ro kkae-ya hae-yo',   syllables: ['편', '견', '은', '언', '어', '로', '깨', '야', '해', '요'], zh: '偏见要用语言打破', zhEn: 'Prejudice must be broken with words' },
    { id: 'd69-v1-d2', korean: '토끼도 할 수 있어요',                    hangul: 'to-kki-do hal su i-sseo-yo',                  syllables: ['토', '끼', '도', '할', '수', '있', '어', '요'],           zh: '兔子也做得到', zhEn: 'Even a rabbit can do it' },
    { id: 'd69-v1-d3', korean: '3초 정적',                                  hangul: 'sam-cho jeong-jeok',                          syllables: ['3', '초', '정', '적'],                                     zh: '3 秒静默', zhEn: '3 seconds of silence' },
  ],
};
