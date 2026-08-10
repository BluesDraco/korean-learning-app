import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 88 · 3-1 단어 마스터 · 毕业照 · ~(이)라는 뜻이지 */
export const day88Vocab: VocabSubQuestData = {
  day: 28, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '졸업 사진 8 个词',

  encounter: [
    { id: 'd88-v1-e1', korean: '학사복',     hangul: 'hak-sa-bok',    zh: '学士服',     pos: '名词',   example: { ko: '학사복을 빌렸어요.',            zh: '借了学士服。' },        tip: 'Day 88 主题词 · 学(학) + 士(사) + 服(복)',                          tier: 'core' },
    { id: 'd88-v1-e2', korean: '학사모',     hangul: 'hak-sa-mo',     zh: '学士帽',     pos: '名词',   example: { ko: '학사모 위에 당근을 꽂았어요.',   zh: '把胡萝卜插在学士帽上。' }, tip: '学(학) + 士(사) + 帽(모)',                                          tier: 'core' },
    { id: 'd88-v1-e3', korean: '훈장',       hangul: 'hun-jang',      zh: '勋章',       pos: '名词',   example: { ko: '이 당근이 제 훈장이에요.',       zh: '这胡萝卜是我的勋章。' }, tip: 'Day 88 情感词 · 勋(훈) + 章(장)',                                    tier: 'core' },
    { id: 'd88-v1-e4', korean: '꽂다',       hangul: 'kkot-da',       zh: '插',         pos: '动词',   example: { ko: '모자에 당근을 꽂았어요.',        zh: '把胡萝卜插在帽子上。' }, tip: '꽂다 → 꽂았어요 · 插进',                                            tier: 'core' },
    { id: 'd88-v1-e5', korean: '반짝이다',   hangul: 'ban-jja-gi-da', zh: '闪耀',       pos: '动词',   example: { ko: '햇빛 아래 학사복이 반짝였어요.', zh: '阳光下学士服闪耀。' },  tip: '반짝(闪) + 이다 · 诗意表达',                                          tier: 'core' },
    { id: 'd88-v1-e6', korean: '셔터',       hangul: 'syeo-teo',      zh: '快门',       pos: '名词',   example: { ko: '셔터 소리가 세 번 났어요.',      zh: '快门声响了三次。' },    tip: '외래어 shutter',                                                     tier: 'core' },
    { id: 'd88-v1-e7', korean: '프레임',     hangul: 'peu-re-im',     zh: '画框 / 一帧', pos: '名词',   example: { ko: '넷이 한 프레임에 담겼어요.',     zh: '四个人装进一帧。' },    tip: '외래어 frame · 한 프레임 = 同一个画框',                              tier: 'ext' },
    { id: 'd88-v1-e8', korean: '뜻',         hangul: 'tteut',         zh: '意思 / 含义', pos: '名词',   example: { ko: '용기라는 뜻이에요.',            zh: '是勇气的意思。' },      tip: 'Day 88 语法核心 · ~(이)라는 뜻',                                    tier: 'ext' },
  ],

  recognize: [
    { id: 'd88-v1-r1', korean: '학사복',     hangul: 'hak-sa-bok',    choices: [{ zh: '学士服',     correct: true }, { zh: '校服',  correct: false }, { zh: '西装',    correct: false }, { zh: '演出服',  correct: false }] },
    { id: 'd88-v1-r2', korean: '학사모',     hangul: 'hak-sa-mo',     choices: [{ zh: '学士帽',     correct: true }, { zh: '围巾',  correct: false }, { zh: '帽檐',    correct: false }, { zh: '头纱',    correct: false }] },
    { id: 'd88-v1-r3', korean: '훈장',       hangul: 'hun-jang',      choices: [{ zh: '勋章',       correct: true }, { zh: '奖状',  correct: false }, { zh: '证书',    correct: false }, { zh: '徽章',    correct: false }] },
    { id: 'd88-v1-r4', korean: '꽂다',       hangul: 'kkot-da',       choices: [{ zh: '插',         correct: true }, { zh: '拔',    correct: false }, { zh: '扔',      correct: false }, { zh: '挂',      correct: false }] },
    { id: 'd88-v1-r5', korean: '반짝이다',   hangul: 'ban-jja-gi-da', choices: [{ zh: '闪耀',       correct: true }, { zh: '熄灭',  correct: false }, { zh: '摇晃',    correct: false }, { zh: '褪色',    correct: false }] },
    { id: 'd88-v1-r6', korean: '셔터',       hangul: 'syeo-teo',      choices: [{ zh: '快门',       correct: true }, { zh: '镜头',  correct: false }, { zh: '闪光灯',  correct: false }, { zh: '三脚架',  correct: false }] },
  ],

  spell: [
    { id: 'd88-v1-s1', zhHint: '学士服',  answer: ['학', '사', '복'], syllables: ['학', '사', '복', '한', '자', '북'] },
    { id: 'd88-v1-s2', zhHint: '勋章',    answer: ['훈', '장'],       syllables: ['훈', '장', '훙', '창'] },
    { id: 'd88-v1-s3', zhHint: '学士帽',  answer: ['학', '사', '모'], syllables: ['학', '사', '모', '한', '자', '무'] },
    { id: 'd88-v1-s4', zhHint: '意思',    answer: ['뜻'],             syllables: ['뜻', '뜬', '듯', '뜽'] },
  ],

  write: [
    { id: 'd88-v1-w1', korean: '학', hangul: 'hak',     wordKorean: '학사복', wordZh: '学士服' },
    { id: 'd88-v1-w2', korean: '사', hangul: 'sa',      wordKorean: '학사복', wordZh: '学士服' },
    { id: 'd88-v1-w3', korean: '복', hangul: 'bok',     wordKorean: '학사복', wordZh: '学士服' },
    { id: 'd88-v1-w4', korean: '훈', hangul: 'hun',     wordKorean: '훈장',   wordZh: '勋章' },
    { id: 'd88-v1-w5', korean: '장', hangul: 'jang',    wordKorean: '훈장',   wordZh: '勋章' },
    { id: 'd88-v1-w6', korean: '꽂', hangul: 'kkot',    wordKorean: '꽂다',   wordZh: '插' },
    { id: 'd88-v1-w7', korean: '모', hangul: 'mo',      wordKorean: '학사모', wordZh: '学士帽' },
    { id: 'd88-v1-w8', korean: '뜻', hangul: 'tteut',   wordKorean: '뜻',     wordZh: '意思' },
  ],

  dictation: [
    { id: 'd88-v1-d1', korean: '용기라는 뜻이지',              hangul: 'yong-gi-ra-neun tteu-si-ji',            syllables: ['용', '기', '라', '는', '뜻', '이', '지'], zh: '就是勇气的意思' },
    { id: 'd88-v1-d2', korean: '모자에 당근을 꽂았어요',        hangul: 'mo-ja-e dang-geu-neul kko-ja-sseo-yo',  syllables: ['모', '자', '에', '당', '근', '을', '꽂', '았', '어', '요'], zh: '把胡萝卜插在帽子上' },
    { id: 'd88-v1-d3', korean: '넷이 한 프레임에 담겼어요',      hangul: 'ne-si han peu-re-im-e dam-gyeo-sseo-yo', syllables: ['넷', '이', '한', '프', '레', '임', '에', '담', '겼', '어', '요'], zh: '四个人装进一帧' },
  ],
};
