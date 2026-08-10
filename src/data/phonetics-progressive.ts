// 分步学习 · Stage 数据（Stage 1~4：元音/辅音/紧音）

export interface ProgressiveCombo {
  [k: string]: unknown;
  syllable: string;
  meaning: string;
  meaningEn?: string;
  romanization?: string;
}

export interface ProgressiveConfused {
  [k: string]: unknown;
  jamo: string;       // 易混字母
  syllable: string;   // 对照发音用的 syllable（命中 audioRegistry）
  tip: string;        // 区分要点
  tipEn?: string;
}

export interface ProgressiveStroke {
  [k: string]: unknown;
  d: string;          // 中心线 SVG path（M/L/C），用于匹配 + 动画基准
  arrow: { x: number; y: number; rot: number };  // 箭头位置+旋转
  hint: string;       // '竖线 上→下'
  hintEn?: string;
}

export interface ProgressiveLetter {
  [k: string]: unknown;
  jamo: string;       // 'ㅏ' / 'ㄱ'
  syllable: string;   // '아' / '박'（用于真人音频 key）
  romanization: string;
  cnApprox: string;   // 中文近似音
  cnApproxEn?: string;
  mouthHint: string;  // 口型说明
  mouthHintEn?: string;
  mnemonic: string;   // 记忆口诀
  mnemonicEn?: string;
  combos: ProgressiveCombo[];
  confused: ProgressiveConfused;
  strokes: ProgressiveStroke[];
}

export interface ProgressiveStage {
  [k: string]: unknown;
  id: number;
  name: string;
  nameEn?: string;
  nameKr: string;
  emoji: string;
  desc: string;
  descEn?: string;
  letters: ProgressiveLetter[];
  locked: boolean;
}

// ── Stage 1 · 基本元音 10 个 ──
const stage1Letters: ProgressiveLetter[] = [
  {
    jamo: 'ㅏ', syllable: '아', romanization: 'a', cnApprox: '啊', cnApproxEn: 'ah',
    cnApproxEn: 'like "ah"',
    mouthHint: '嘴巴自然张开，发音时舌面后部稍微抬起，唇形略扁。', mouthHintEn: 'Open your mouth naturally, slightly raise the back of your tongue, and keep your lips somewhat flat.',
    mouthHintEn: 'Open the mouth naturally; the back of the tongue rises slightly and the lips are somewhat flat.',
    mnemonic: '想象「a」=「啊」最响亮的元音，竖线像人，旁边一横像伸出的手臂。', mnemonicEn: 'Imagine \'a\' = \'ah\', the most resonant vowel. The vertical line is like a person, and the horizontal line beside it is like an outstretched arm.',
    mnemonicEn: 'Picture "a" = the most resonant vowel; the vertical line is a person and the short stroke beside it is an outstretched arm.',
    combos: [
      { syllable: '아', romanization: 'a', meaning: '啊（感叹）', meaningEn: 'ah (exclamation)' },
      { syllable: '나', romanization: 'na', meaning: '我', meaningEn: 'I / me' },
      { syllable: '바다', romanization: 'ba-da', meaning: '海', meaningEn: 'sea' },
      { syllable: '아빠', romanization: 'a-ppa', meaning: '爸爸', meaningEn: 'dad' },
    ],
    confused: { jamo: 'ㅓ', syllable: '어', tip: 'ㅏ 嘴大开、舌位靠前；ㅓ 嘴开度小、舌位靠后。形状上 ㅏ 短横在右、ㅓ 短横在左。', tipEn: 'ㅏ: mouth wide open, tongue forward; ㅓ: smaller opening, tongue back. In shape, ㅏ has the short stroke on the right, ㅓ on the left.' },
      strokes: [
        { d: 'M 80 30 L 80 170', arrow: { x: 80, y: 178, rot: 90 }, hint: '竖线 上→下', hintEn: 'vertical, top→bottom' },
        { d: 'M 80 100 L 150 100', arrow: { x: 158, y: 100, rot: 0 }, hint: '短横 左→右', hintEn: 'short stroke, left→right' }
      ],
  },
  {
    jamo: 'ㅑ', syllable: '야', romanization: 'ya', cnApprox: '呀', cnApproxEn: 'Ya',
    cnApproxEn: 'like "ya"',
    mouthHint: '由 y 滑音快速过渡到 ㅏ，发音时先发 y 音然后迅速过渡到「啊」，整体读作「呀」。', mouthHintEn: 'Glide quickly from a \'y\' sound into ㅏ. Say \'y\' first, then transition rapidly to \'ah\', making it \'ya\'.',
    mouthHintEn: 'Glide from a y-onset quickly into ㅏ: start with the y sound, then slide rapidly into "ah", read as one "ya".',
    mnemonic: 'ㅏ 右边多一道短横 = 给「啊」加上 y 起音，写作「ya」=「呀」。', mnemonicEn: 'An extra short stroke on the right of ㅏ = adding a \'y\' onset to \'ah\', written as \'ya\' = \'ya\'.',
    mnemonicEn: 'ㅏ with an extra short stroke on the right = adding a y-onset to "ah", written "ya".',
    combos: [
      { syllable: '야', romanization: 'ya', meaning: '喂（招呼）', meaningEn: 'hey (calling out)' },
      { syllable: '야채', romanization: 'ya-chae', meaning: '蔬菜', meaningEn: 'vegetables' },
      { syllable: '이야기', romanization: 'i-ya-gi', meaning: '故事', meaningEn: 'story' },
      { syllable: '약속', romanization: 'yak-sok', meaning: '约定', meaningEn: 'promise / appointment' },
    ],
    confused: { jamo: 'ㅕ', syllable: '여', tip: 'ㅑ 收尾是 ㅏ（大开口、舌位靠前）；ㅕ 收尾是 ㅓ（开度小、舌位靠后）。形状上 ㅑ 双横在右、ㅕ 双横在左。', tipEn: 'ㅑ ends in ㅏ (wide open, tongue forward); ㅕ ends in ㅓ (smaller opening, tongue back). In shape, ㅑ has the double strokes on the right, ㅕ on the left.' },
      strokes: [
        { d: 'M 80 30 L 80 170', arrow: { x: 80, y: 178, rot: 90 }, hint: '竖线 上→下', hintEn: 'vertical, top→bottom' },
        { d: 'M 80 65 L 150 65', arrow: { x: 158, y: 65, rot: 0 }, hint: '上短横 左→右', hintEn: 'upper short stroke, left→right' },
        { d: 'M 80 135 L 150 135', arrow: { x: 158, y: 135, rot: 0 }, hint: '下短横 左→右', hintEn: 'lower short stroke, left→right' }
      ],
  },
  {
    jamo: 'ㅓ', syllable: '어', romanization: 'eo', cnApprox: '呃', cnApproxEn: 'Eo',
    cnApproxEn: 'like "uh"',
    mouthHint: '发音时口型比 ㅏ 稍小，舌位更低，双唇放松，不要撅圆嘴。', mouthHintEn: 'When pronouncing, the mouth shape is slightly smaller than ㅏ, tongue lower, lips relaxed—don\'t round them.',
    mouthHintEn: 'The mouth opening is a bit smaller than ㅏ, the tongue lower, lips relaxed; do not round or purse the lips.',
    mnemonic: 'ㅏ 的「啊」翻转 → 短横移到左边，发音也从张开变成往后收，听感介于「哦」和「呃」之间。', mnemonicEn: 'Flip the \'ah\' of ㅏ → the short stroke moves to the left, and the sound shifts from open to pulled back, between \'oh\' and \'uh\'.',
    mnemonicEn: 'Flip ㅏ ("ah") → the short stroke moves to the left; the sound also shifts from open to pulled back, landing between "oh" and "uh".',
    combos: [
      { syllable: '어', romanization: 'eo', meaning: '嗯/啊（感叹）', meaningEn: 'uh / oh (exclamation)' },
      { syllable: '어머니', romanization: 'eo-meo-ni', meaning: '母亲', meaningEn: 'mother' },
      { syllable: '버스', romanization: 'beo-seu', meaning: '巴士', meaningEn: 'bus' },
      { syllable: '거기', romanization: 'geo-gi', meaning: '那里', meaningEn: 'there' },
    ],
    confused: { jamo: 'ㅏ', syllable: '아', tip: 'ㅓ 不要撅圆嘴，舌位往后；ㅏ 嘴大开、舌位靠前。形状上短横方向相反。', tipEn: 'ㅓ: do not round the lips, tongue back; ㅏ: mouth wide open, tongue forward. Their short strokes point in opposite directions.' },
      strokes: [
        { d: 'M 50 100 L 120 100', arrow: { x: 128, y: 100, rot: 0 }, hint: '短横 左→右', hintEn: 'short stroke, left→right' },
        { d: 'M 120 30 L 120 170', arrow: { x: 120, y: 178, rot: 90 }, hint: '竖线 上→下', hintEn: 'vertical, top→bottom' }
      ],
  },
  {
    jamo: 'ㅕ', syllable: '여', romanization: 'yeo', cnApprox: '哟（扁嘴，非圆嘴 ㅛ）', cnApproxEn: 'Yo (flat lips, not rounded like ㅛ)',
    cnApproxEn: 'like "yaw" (flat lips, not rounded like ㅛ)',
    mouthHint: '由 y 滑音快速过渡到 ㅓ，发音类似「哟」，注意嘴不要撅圆。', mouthHintEn: 'Glide quickly from a \'y\' sound into ㅓ, similar to \'yo\', but keep your lips flat, not rounded.',
    mouthHintEn: 'Glide from a y-onset quickly into ㅓ, sounding like "yaw"; keep the lips from rounding.',
    mnemonic: 'ㅓ 左边多一道短横 = 给 ㅓ 加上 y 起音，写作「yeo」。', mnemonicEn: 'An extra short stroke on the left of ㅓ = adding a \'y\' onset to ㅓ, written as \'yeo\'.',
    mnemonicEn: 'ㅓ with an extra short stroke on the left = adding a y-onset to ㅓ, written "yeo".',
    combos: [
      { syllable: '여자', romanization: 'yeo-ja', meaning: '女人', meaningEn: 'woman' },
      { syllable: '여행', romanization: 'yeo-haeng', meaning: '旅行', meaningEn: 'travel' },
      { syllable: '겨울', romanization: 'gyeo-ul', meaning: '冬天', meaningEn: 'winter' },
      { syllable: '연필', romanization: 'yeon-pil', meaning: '铅笔', meaningEn: 'pencil' },
    ],
    confused: { jamo: 'ㅑ', syllable: '야', tip: 'ㅕ 收尾是 ㅓ（嘴小、舌位靠后）；ㅑ 收尾是 ㅏ（嘴大开、舌位靠前）。形状上双横方向相反。', tipEn: 'ㅕ ends in ㅓ (smaller mouth, tongue back); ㅑ ends in ㅏ (wide open, tongue forward). Their double strokes point in opposite directions.' },
      strokes: [
        { d: 'M 50 65 L 120 65', arrow: { x: 128, y: 65, rot: 0 }, hint: '上短横 左→右', hintEn: 'upper short stroke, left→right' },
        { d: 'M 50 135 L 120 135', arrow: { x: 128, y: 135, rot: 0 }, hint: '下短横 左→右', hintEn: 'lower short stroke, left→right' },
        { d: 'M 120 30 L 120 170', arrow: { x: 120, y: 178, rot: 90 }, hint: '竖线 上→下', hintEn: 'vertical, top→bottom' }
      ],
  },
  {
    jamo: 'ㅗ', syllable: '오', romanization: 'o', cnApprox: '哦', cnApproxEn: 'oh',
    cnApproxEn: 'like "oh"',
    mouthHint: '嘴巴略微收圆，舌面后部抬起，发音较饱满。', mouthHintEn: 'Round your lips slightly, raise the back of your tongue, and pronounce it fully.',
    mouthHintEn: 'Round the lips slightly, raise the back of the tongue; the sound is full and rounded.',
    mnemonic: '一横上面加一短竖 = 太阳从地平线升起，发圆唇的「o」。', mnemonicEn: 'A horizontal line with a short vertical above = the sun rising over the horizon, pronounced with rounded lips as \'o\'.',
    mnemonicEn: 'A short vertical stroke above a horizontal line = the sun rising over the horizon, giving a rounded-lip "o".',
    combos: [
      { syllable: '오빠', romanization: 'o-ppa', meaning: '哥哥（女生称）', meaningEn: 'older brother (said by a girl)' },
      { syllable: '소금', romanization: 'so-geum', meaning: '盐', meaningEn: 'salt' },
      { syllable: '코', romanization: 'ko', meaning: '鼻子', meaningEn: 'nose' },
      { syllable: '도시', romanization: 'do-si', meaning: '城市', meaningEn: 'city' },
    ],
    confused: { jamo: 'ㅜ', syllable: '우', tip: 'ㅗ 短竖在横线上方、嘴唇圆但不嘟；ㅜ 短竖在下方、嘴唇向前嘟起更明显。', tipEn: 'ㅗ: short stroke above the line, lips rounded but not pushed forward; ㅜ: short stroke below, lips pushed forward more noticeably.' },
      strokes: [
        { d: 'M 100 30 L 100 100', arrow: { x: 100, y: 108, rot: 90 }, hint: '短竖 上→下', hintEn: 'short vertical, top→bottom' },
        { d: 'M 45 100 L 155 100', arrow: { x: 163, y: 100, rot: 0 }, hint: '横线 左→右', hintEn: 'horizontal, left→right' }
      ],
  },
  {
    jamo: 'ㅛ', syllable: '요', romanization: 'yo', cnApprox: '哟', cnApproxEn: 'yo',
    cnApproxEn: 'like "yo"',
    mouthHint: '由 y 滑音快速过渡到 ㅗ，发音时嘴唇收圆并突出。', mouthHintEn: 'Glide quickly from a y sound to ㅗ, rounding and protruding your lips.',
    mouthHintEn: 'Glide from a y-onset quickly into ㅗ; round and protrude the lips as you sound it.',
    mnemonic: 'ㅗ 上方加双竖 = 给「o」加上 y 起音，写作「yo」=「哟」。', mnemonicEn: 'Adding double verticals above ㅗ = adding a y onset to \'o\', written as \'yo\' = \'yo\'.',
    mnemonicEn: 'ㅗ with two short strokes above = adding a y-onset to "o", written "yo".',
    combos: [
      { syllable: '요리', romanization: 'yo-ri', meaning: '料理', meaningEn: 'cooking / dish' },
      { syllable: '교실', romanization: 'gyo-sil', meaning: '教室', meaningEn: 'classroom' },
      { syllable: '학교', romanization: 'hak-gyo', meaning: '学校', meaningEn: 'school' },
      { syllable: '효도', romanization: 'hyo-do', meaning: '孝道', meaningEn: 'filial piety' },
    ],
    confused: { jamo: 'ㅠ', syllable: '유', tip: 'ㅛ 双竖在横线上方（圆嘴 yo）；ㅠ 双竖在横线下方（嘟嘴 yu）。', tipEn: 'ㅛ: two strokes above the line (rounded "yo"); ㅠ: two strokes below the line (pushed-forward "yu").' },
      strokes: [
        { d: 'M 75 30 L 75 100', arrow: { x: 75, y: 108, rot: 90 }, hint: '左短竖 上→下', hintEn: 'left short vertical, top→bottom' },
        { d: 'M 125 30 L 125 100', arrow: { x: 125, y: 108, rot: 90 }, hint: '右短竖 上→下', hintEn: 'right short vertical, top→bottom' },
        { d: 'M 45 100 L 155 100', arrow: { x: 163, y: 100, rot: 0 }, hint: '横线 左→右', hintEn: 'horizontal, left→right' }
      ],
  },
  {
    jamo: 'ㅜ', syllable: '우', romanization: 'u', cnApprox: '乌', cnApproxEn: 'u',
    cnApproxEn: 'like "oo"',
    mouthHint: '发音时嘴唇收得很圆很小，舌面后部高高抬起。', mouthHintEn: 'Pronounce with lips very rounded and small, tongue back raised high.',
    mouthHintEn: 'Purse the lips into a small tight circle and raise the back of the tongue high.',
    mnemonic: '一横下面加一短竖 = 水滴往下掉，发嘟嘴的「u」。', mnemonicEn: 'A horizontal line with a short vertical below = a water drop falling, pronounced with pouted lips as \'u\'.',
    mnemonicEn: 'A short vertical stroke below a horizontal line = a water drop falling down, giving a pushed-lip "u".',
    combos: [
      { syllable: '우유', romanization: 'u-yu', meaning: '牛奶', meaningEn: 'milk' },
      { syllable: '두부', romanization: 'du-bu', meaning: '豆腐', meaningEn: 'tofu' },
      { syllable: '무지개', romanization: 'mu-ji-gae', meaning: '彩虹', meaningEn: 'rainbow' },
      { syllable: '구두', romanization: 'gu-du', meaning: '皮鞋', meaningEn: 'dress shoes' },
    ],
    confused: { jamo: 'ㅗ', syllable: '오', tip: 'ㅜ 嘴唇嘟起更明显（接近「乌」）；ㅗ 嘴唇圆但不嘟（接近「哦」）。形状上短竖位置上下相反。', tipEn: 'ㅜ: lips pushed forward more (closer to "oo"); ㅗ: lips rounded but not pushed (closer to "oh"). The short stroke sits below vs. above.' },
      strokes: [
        { d: 'M 45 100 L 155 100', arrow: { x: 163, y: 100, rot: 0 }, hint: '横线 左→右', hintEn: 'horizontal, left→right' },
        { d: 'M 100 100 L 100 170', arrow: { x: 100, y: 178, rot: 90 }, hint: '短竖 上→下', hintEn: 'short vertical, top→bottom' }
      ],
  },
  {
    jamo: 'ㅠ', syllable: '유', romanization: 'yu', cnApprox: '由', cnApproxEn: 'yu',
    cnApproxEn: 'like "yoo"',
    mouthHint: '由 y 滑音快速过渡到 ㅜ，发音时嘴唇收得很圆很小。', mouthHintEn: 'Glide quickly from a y sound to ㅜ, keeping lips very rounded and small.',
    mouthHintEn: 'Glide from a y-onset quickly into ㅜ; purse the lips into a small tight circle.',
    mnemonic: 'ㅜ 下方加双竖 = 给「u」加上 y 起音，写作「yu」=「由」。', mnemonicEn: 'Adding double verticals below ㅜ = adding a y onset to \'u\', written as \'yu\' = \'yu\'.',
    mnemonicEn: 'ㅜ with two short strokes below = adding a y-onset to "u", written "yu".',
    combos: [
      { syllable: '우유', romanization: 'u-yu', meaning: '牛奶', meaningEn: 'milk' },
      { syllable: '이유', romanization: 'i-yu', meaning: '理由', meaningEn: 'reason' },
      { syllable: '유리', romanization: 'yu-ri', meaning: '玻璃', meaningEn: 'glass' },
      { syllable: '휴식', romanization: 'hyu-sik', meaning: '休息', meaningEn: 'rest / break' },
    ],
    confused: { jamo: 'ㅛ', syllable: '요', tip: 'ㅠ 双竖在横线下方（嘟嘴 yu）；ㅛ 双竖在横线上方（圆嘴 yo）。', tipEn: 'ㅠ: two strokes below the line (pushed-forward "yu"); ㅛ: two strokes above the line (rounded "yo").' },
      strokes: [
        { d: 'M 45 100 L 155 100', arrow: { x: 163, y: 100, rot: 0 }, hint: '横线 左→右', hintEn: 'horizontal, left→right' },
        { d: 'M 75 100 L 75 170', arrow: { x: 75, y: 178, rot: 90 }, hint: '左短竖 上→下', hintEn: 'left short vertical, top→bottom' },
        { d: 'M 125 100 L 125 170', arrow: { x: 125, y: 178, rot: 90 }, hint: '右短竖 上→下', hintEn: 'right short vertical, top→bottom' }
      ],
  },
  {
    jamo: 'ㅡ', syllable: '으', romanization: 'eu', cnApprox: '呃（嘴扁）', cnApproxEn: 'Uh (flattened lips)',
    cnApproxEn: 'like "eu" [ɯ] (flat lips)',
    mouthHint: '发音时嘴唇稍微扁平，舌面中部抬起，气流从舌面和硬腭之间通过。中文里没有完全对应的音。', mouthHintEn: 'When pronouncing, the lips are slightly flattened, the middle of the tongue rises, and air passes between the tongue surface and the hard palate. There\'s no exact equivalent in Chinese.',
    mouthHintEn: 'Keep the lips slightly flat, raise the middle of the tongue, and let air pass between the tongue and hard palate. There is no exact English equivalent.',
    mnemonic: '形状就是一条横线 = 嘴唇也压扁成一条线。', mnemonicEn: 'The shape is a horizontal line = lips also pressed flat into a line.',
    mnemonicEn: 'The shape is just a horizontal line = flatten the lips into a line too.',
    combos: [
      { syllable: '그', romanization: 'geu', meaning: '那（指示）', meaningEn: 'that (demonstrative)' },
      { syllable: '크다', romanization: 'keu-da', meaning: '大', meaningEn: 'to be big' },
      { syllable: '음식', romanization: 'eum-sik', meaning: '食物', meaningEn: 'food' },
      { syllable: '으르렁', romanization: 'eu-reu-reong', meaning: '咆哮声', meaningEn: 'growling sound' },
    ],
    confused: { jamo: 'ㅣ', syllable: '이', tip: 'ㅡ 嘴角横向拉平、几乎不张嘴；ㅣ 嘴角横向拉开但比 ㅡ 更开，发清晰的「一」。', tipEn: 'ㅡ: corners of the mouth pulled flat, barely opening; ㅣ: corners pulled sideways but more open than ㅡ, giving a clear "ee".' },
      strokes: [
        { d: 'M 30 100 L 170 100', arrow: { x: 178, y: 100, rot: 0 }, hint: '横线 左→右', hintEn: 'horizontal, left→right' }
      ],
  },
  {
    jamo: 'ㅣ', syllable: '이', romanization: 'i', cnApprox: '一/衣', cnApproxEn: 'One/clothes',
    cnApproxEn: 'like "ee"',
    mouthHint: '舌尖抵住下齿龈，舌面前部高高抬起，接近硬腭前部形成缝隙，发清晰的「一」。', mouthHintEn: 'Press the tip of your tongue against the lower gum, raise the front of the tongue high, forming a gap near the front of the hard palate, and make a clear \'ee\' sound.',
    mouthHintEn: 'Rest the tongue tip against the lower gum, raise the front of the tongue high toward the front of the hard palate to form a narrow gap, giving a clear "ee".',
    mnemonic: '一根竖线 = 一个人站立的形状，正好对应中文「一」的发音。', mnemonicEn: 'A vertical line = the shape of a person standing, which matches the Chinese \'one\' sound.',
    mnemonicEn: 'A single vertical line = the shape of a standing person, matching a clear "ee".',
    combos: [
      { syllable: '이', romanization: 'i', meaning: '这（如 이 사람=这个人）', meaningEn: 'this (e.g. 이 사람 = this person)' },
      { syllable: '비', romanization: 'bi', meaning: '雨', meaningEn: 'rain' },
      { syllable: '시간', romanization: 'si-gan', meaning: '时间', meaningEn: 'time' },
      { syllable: '기차', romanization: 'gi-cha', meaning: '火车', meaningEn: 'train' },
    ],
    confused: { jamo: 'ㅡ', syllable: '으', tip: 'ㅣ 嘴向两边拉开发「一」；ㅡ 嘴几乎不张、发压扁的「呃」。形状上一竖一横。', tipEn: 'ㅣ: pull the mouth sideways for "ee"; ㅡ: barely open, giving a flattened "eu". One is vertical, the other horizontal.' },
      strokes: [
        { d: 'M 100 30 L 100 170', arrow: { x: 100, y: 178, rot: 90 }, hint: '竖线 上→下', hintEn: 'vertical, top→bottom' }
      ],
  },
];

// ── Stage 2 · 合成元音 11 个 ──
const stage2Letters: ProgressiveLetter[] = [
  {
    jamo: 'ㅐ', syllable: '애', romanization: 'ae', cnApprox: '欸', cnApproxEn: 'Eh',
    cnApproxEn: 'like "eh" (as in "bed")',
    mouthHint: '发音时口型介于 ㅏ 和 ㅔ 之间（比 ㅏ 略小、比 ㅔ 略大），舌面位置较低；是单元音 [ɛ]，不要读成「哎」（ai）的双元音。', mouthHintEn: 'When pronouncing, the mouth shape is between ㅏ and ㅔ (slightly smaller than ㅏ, slightly larger than ㅔ), with the tongue lower; it\'s a monophthong [ɛ], don\'t read it as the diphthong \'ai\'.',
    mouthHintEn: 'The mouth opening falls between ㅏ and ㅔ (a little smaller than ㅏ, a little larger than ㅔ) with the tongue fairly low; it is a monophthong [ɛ], not the diphthong "ai".',
    mnemonic: 'ㅏ + ㅣ → ae，嘴张得比 ㅏ 小一些', mnemonicEn: 'ㅏ + ㅣ → ae, mouth opens slightly smaller than ㅏ',
    mnemonicEn: 'ㅏ + ㅣ → ae; open the mouth a bit less than for ㅏ.',
    combos: [
      { syllable: '애', meaning: '小孩', meaningEn: 'child' }, { syllable: '내', meaning: '我的', meaningEn: 'my' },
      { syllable: '개', meaning: '狗', meaningEn: 'dog' }, { syllable: '새', meaning: '鸟', meaningEn: 'bird' },
    ],
    confused: { jamo: 'ㅔ', syllable: '에', tip: '现代口语 ㅐ 和 ㅔ 几乎同音，传统上 ㅐ 嘴更张开。', tipEn: 'In modern speech ㅐ and ㅔ sound almost identical; traditionally ㅐ opens the mouth wider.' },
      strokes: [
        { d: 'M 70 30 L 70 170', arrow: { x: 70, y: 178, rot: 90 }, hint: '左竖 上→下', hintEn: 'left vertical, top→bottom' },
        { d: 'M 70 100 L 130 100', arrow: { x: 138, y: 100, rot: 0 }, hint: '中横 左→右', hintEn: 'middle stroke, left→right' },
        { d: 'M 130 30 L 130 170', arrow: { x: 130, y: 178, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' }
      ],
  },
  {
    jamo: 'ㅒ', syllable: '얘', romanization: 'yae', cnApprox: '耶', cnApproxEn: 'Yeah',
    cnApproxEn: 'like "yeh"',
    mouthHint: '先发 y 滑音再过渡到 ㅐ，与 ㅖ 在口语中同音。', mouthHintEn: 'Start with a y glide then transition to ㅐ, same sound as ㅖ in speech.',
    mouthHintEn: 'Start with a y-onset then glide into ㅐ; in speech it sounds the same as ㅖ.',
    mnemonic: 'ㅑ + ㅣ → yae（口语缩略词 얘 = 这孩子）', mnemonicEn: 'ㅑ + ㅣ → yae (colloquial abbreviation 얘 = this kid)',
    mnemonicEn: 'ㅑ + ㅣ → yae (the colloquial contraction 얘 = this kid).',
    combos: [
      { syllable: '얘', meaning: '这孩子', meaningEn: 'this kid' }, { syllable: '걔', meaning: '那孩子', meaningEn: 'that kid' },
      { syllable: '쟤', meaning: '那位', meaningEn: 'that one (person)' }, { syllable: '얘기', meaning: '故事', meaningEn: 'story / talk' },
    ],
    confused: { jamo: 'ㅖ', syllable: '예', tip: '现代口语 ㅒ 和 ㅖ 同音，靠词来分辨。', tipEn: 'In modern speech ㅒ and ㅖ are homophones; tell them apart by the word.' },
      strokes: [
        { d: 'M 70 30 L 70 170', arrow: { x: 70, y: 178, rot: 90 }, hint: '左竖 上→下', hintEn: 'left vertical, top→bottom' },
        { d: 'M 70 65 L 130 65', arrow: { x: 138, y: 65, rot: 0 }, hint: '上短横 左→右', hintEn: 'upper short stroke, left→right' },
        { d: 'M 70 135 L 130 135', arrow: { x: 138, y: 135, rot: 0 }, hint: '下短横 左→右', hintEn: 'lower short stroke, left→right' },
        { d: 'M 130 30 L 130 170', arrow: { x: 130, y: 178, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' }
      ],
  },
  {
    jamo: 'ㅔ', syllable: '에', romanization: 'e', cnApprox: '诶', cnApproxEn: 'eh',
    cnApproxEn: 'like "eh" (as in "pet")',
    mouthHint: '发音时口型比 ㅐ 更小更扁，舌面位置更高，发短促清晰的「诶」。', mouthHintEn: 'When pronouncing, the mouth shape is smaller and flatter than ㅐ, the tongue position is higher, producing a short, clear "eh."',
    mouthHintEn: 'The mouth is smaller and flatter than for ㅐ with the tongue higher, giving a short, clear "eh".',
    mnemonic: 'ㅓ + ㅣ → e，与 ㅐ 现代口语同音', mnemonicEn: 'ㅓ + ㅣ → e, same sound as ㅐ in modern speech',
    mnemonicEn: 'ㅓ + ㅣ → e; a homophone of ㅐ in modern speech.',
    combos: [
      { syllable: '에', meaning: '在', meaningEn: 'at / in (particle)' }, { syllable: '게', meaning: '螃蟹', meaningEn: 'crab' },
      { syllable: '네', meaning: '是', meaningEn: 'yes' }, { syllable: '세', meaning: '三', meaningEn: 'three' },
    ],
    confused: { jamo: 'ㅐ', syllable: '애', tip: '现代发音几乎相同，按词记忆即可。', tipEn: 'The modern pronunciations are nearly identical; just memorize by word.' },
      strokes: [
        { d: 'M 45 100 L 95 100', arrow: { x: 103, y: 100, rot: 0 }, hint: '短横 左→右', hintEn: 'short stroke, left→right' },
        { d: 'M 95 30 L 95 170', arrow: { x: 95, y: 178, rot: 90 }, hint: '左竖 上→下', hintEn: 'left vertical, top→bottom' },
        { d: 'M 135 30 L 135 170', arrow: { x: 135, y: 178, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' }
      ],
  },
  {
    jamo: 'ㅖ', syllable: '예', romanization: 'ye', cnApprox: '耶', cnApproxEn: 'Yeah',
    cnApproxEn: 'like "yeh"',
    mouthHint: '发音时口型介于 ㅕ 和 ㅣ 之间，舌面位置较高。', mouthHintEn: 'When pronouncing, the mouth shape is between ㅕ and ㅣ, with a higher tongue position.',
    mouthHintEn: 'The mouth opening falls between ㅕ and ㅣ with the tongue held fairly high.',
    mnemonic: 'ㅕ + ㅣ → ye，出现在 예/계/시계 等词', mnemonicEn: 'ㅕ + ㅣ → ye, appears in words like 예/계/시계',
    mnemonicEn: 'ㅕ + ㅣ → ye; appears in words like 예/계/시계.',
    combos: [
      { syllable: '예', meaning: '是、对（敬体回答）', meaningEn: 'yes, that\'s right (polite reply)' }, { syllable: '계산', meaning: '计算', meaningEn: 'calculation' },
      { syllable: '시계', meaning: '时钟', meaningEn: 'clock / watch' }, { syllable: '예의', meaning: '礼仪', meaningEn: 'manners / etiquette' },
    ],
    confused: { jamo: 'ㅒ', syllable: '얘', tip: '现代发音几乎相同，按词记忆即可。', tipEn: 'The modern pronunciations are nearly identical; just memorize by word.' },
      strokes: [
        { d: 'M 45 65 L 95 65', arrow: { x: 103, y: 65, rot: 0 }, hint: '上短横 左→右', hintEn: 'upper short stroke, left→right' },
        { d: 'M 45 135 L 95 135', arrow: { x: 103, y: 135, rot: 0 }, hint: '下短横 左→右', hintEn: 'lower short stroke, left→right' },
        { d: 'M 95 30 L 95 170', arrow: { x: 95, y: 178, rot: 90 }, hint: '左竖 上→下', hintEn: 'left vertical, top→bottom' },
        { d: 'M 135 30 L 135 170', arrow: { x: 135, y: 178, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' }
      ],
  },
  {
    jamo: 'ㅘ', syllable: '와', romanization: 'wa', cnApprox: '哇', cnApproxEn: 'wow',
    cnApproxEn: 'like "wah"',
    mouthHint: '由 ㅗ 和 ㅏ 结合而成，发音时先发 ㅗ 的音然后迅速过渡到 ㅏ。', mouthHintEn: 'Formed by combining ㅗ and ㅏ; when pronouncing, first make the ㅗ sound then quickly transition to ㅏ.',
    mouthHintEn: 'A combination of ㅗ and ㅏ: sound the ㅗ first, then glide quickly into ㅏ.',
    mnemonic: 'ㅗ + ㅏ → wa',
    mnemonicEn: 'ㅗ + ㅏ → wa',
    combos: [
      { syllable: '와', meaning: '和（口语连接词）', meaningEn: 'and / with (colloquial connector)' }, { syllable: '사과', meaning: '苹果', meaningEn: 'apple' },
      { syllable: '화장', meaning: '化妆', meaningEn: 'makeup' }, { syllable: '과일', meaning: '水果', meaningEn: 'fruit' },
    ],
    confused: { jamo: 'ㅙ', syllable: '왜', tip: 'ㅘ 收尾是 ㅏ；ㅙ 收尾是 ㅐ。', tipEn: 'ㅘ ends in ㅏ; ㅙ ends in ㅐ.' },
      strokes: [
        { d: 'M 50 35 L 50 100', arrow: { x: 50, y: 108, rot: 90 }, hint: '左短竖 上→下', hintEn: 'left short vertical, top→bottom' },
        { d: 'M 35 100 L 145 100', arrow: { x: 153, y: 100, rot: 0 }, hint: '横线 左→右', hintEn: 'horizontal, left→right' },
        { d: 'M 145 30 L 145 170', arrow: { x: 145, y: 178, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' },
        { d: 'M 145 100 L 175 100', arrow: { x: 183, y: 100, rot: 0 }, hint: '右短横 左→右', hintEn: 'right short stroke, left→right' }
      ],
  },
  {
    jamo: 'ㅙ', syllable: '왜', romanization: 'wae', cnApprox: '喂（现代同 ㅚ/ㅞ we）', cnApproxEn: 'yeah (modern same as ㅚ/ㅞ we)',
    cnApproxEn: 'like "weh" (modern-day same as ㅚ/ㅞ we)',
    mouthHint: '发音时口型介于 ㅘ 和 ㅐ 之间，口语与 ㅚ/ㅞ 同音。', mouthHintEn: 'The mouth shape is between ㅘ and ㅐ; in speech, it sounds the same as ㅚ/ㅞ.',
    mouthHintEn: 'The mouth opening falls between ㅘ and ㅐ; in speech it is a homophone of ㅚ/ㅞ.',
    mnemonic: 'ㅗ + ㅐ → wae',
    mnemonicEn: 'ㅗ + ㅐ → wae',
    combos: [
      { syllable: '왜', meaning: '为什么', meaningEn: 'why' }, { syllable: '돼지', meaning: '猪', meaningEn: 'pig' },
      { syllable: '괜찮아', meaning: '没关系', meaningEn: 'it\'s okay' }, { syllable: '쇄신', meaning: '刷新', meaningEn: 'reform / renewal' },
    ],
    confused: { jamo: 'ㅚ', syllable: '외', tip: 'ㅙ/ㅚ/ㅞ 现代口语全部同音 we。', tipEn: 'ㅙ/ㅚ/ㅞ are all homophones ("we") in modern speech.' },
      strokes: [
        { d: 'M 50 35 L 50 100', arrow: { x: 50, y: 108, rot: 90 }, hint: '左短竖 上→下', hintEn: 'left short vertical, top→bottom' },
        { d: 'M 35 100 L 125 100', arrow: { x: 133, y: 100, rot: 0 }, hint: '横线 左→右', hintEn: 'horizontal, left→right' },
        { d: 'M 125 30 L 125 170', arrow: { x: 125, y: 178, rot: 90 }, hint: '中竖 上→下', hintEn: 'middle vertical, top→bottom' },
        { d: 'M 125 100 L 155 100', arrow: { x: 163, y: 100, rot: 0 }, hint: '中短横 左→右', hintEn: 'middle short stroke, left→right' },
        { d: 'M 160 30 L 160 170', arrow: { x: 160, y: 178, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' }
      ],
  },
  {
    jamo: 'ㅚ', syllable: '외', romanization: 'oe', cnApprox: '喂（现代同 ㅙ/ㅞ we）', cnApproxEn: 'Hey (modern: same as ㅙ/ㅞ \'we\')',
    cnApproxEn: 'like "weh" (modern-day same as ㅙ/ㅞ we)',
    mouthHint: '现代口语读 we，标准音为圆唇单元音 [ø]。', mouthHintEn: 'In modern speech it\'s \'we\', but the standard sound is the rounded vowel [ø].',
    mouthHintEn: 'Pronounced "we" in modern speech; the standard sound is the rounded monophthong [ø].',
    mnemonic: 'ㅗ + ㅣ → oe',
    mnemonicEn: 'ㅗ + ㅣ → oe',
    combos: [
      { syllable: '외국', meaning: '外国', meaningEn: 'foreign country' }, { syllable: '회사', meaning: '公司', meaningEn: 'company' },
      { syllable: '되다', meaning: '变成（动词）', meaningEn: 'to become (verb)' }, { syllable: '교회', meaning: '教会', meaningEn: 'church' },
    ],
    confused: { jamo: 'ㅞ', syllable: '웨', tip: 'ㅚ/ㅙ/ㅞ 现代口语全部同音。', tipEn: 'ㅚ/ㅙ/ㅞ are all homophones in modern speech.' },
      strokes: [
        { d: 'M 50 35 L 50 100', arrow: { x: 50, y: 108, rot: 90 }, hint: '左短竖 上→下', hintEn: 'left short vertical, top→bottom' },
        { d: 'M 35 100 L 130 100', arrow: { x: 138, y: 100, rot: 0 }, hint: '横线 左→右', hintEn: 'horizontal, left→right' },
        { d: 'M 130 30 L 130 170', arrow: { x: 130, y: 178, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' }
      ],
  },
  {
    jamo: 'ㅝ', syllable: '워', romanization: 'wo', cnApprox: 'w+呃（非圆嘴 ㅗ）', cnApproxEn: 'w + uh (unrounded ㅗ)',
    cnApproxEn: 'w + "uh" (unrounded, not ㅗ)',
    mouthHint: '由 ㅜ（现代口语中滑至 ㅗ 类似）和 ㅓ 结合而成，发音时嘴唇稍微收圆。', mouthHintEn: 'Formed by combining ㅜ (which in modern speech glides toward ㅗ) and ㅓ; round your lips slightly when pronouncing.',
    mouthHintEn: 'A combination of ㅜ (which glides toward something like ㅗ in modern speech) and ㅓ; round the lips slightly as you sound it.',
    mnemonic: 'ㅜ + ㅓ → wo',
    mnemonicEn: 'ㅜ + ㅓ → wo',
    combos: [
      { syllable: '더워', meaning: '热（口语）', meaningEn: 'it\'s hot (colloquial)' }, { syllable: '권리', meaning: '权利', meaningEn: 'rights' },
      { syllable: '뭐', meaning: '什么（口语）', meaningEn: 'what (colloquial)' }, { syllable: '줘', meaning: '给（口语）', meaningEn: 'give (me) (colloquial)' },
    ],
    confused: { jamo: 'ㅞ', syllable: '웨', tip: 'ㅝ 收尾是 ㅓ；ㅞ 收尾是 ㅔ。', tipEn: 'ㅝ ends in ㅓ; ㅞ ends in ㅔ.' },
      strokes: [
        { d: 'M 35 100 L 145 100', arrow: { x: 153, y: 100, rot: 0 }, hint: '横线 左→右', hintEn: 'horizontal, left→right' },
        { d: 'M 50 100 L 50 165', arrow: { x: 50, y: 173, rot: 90 }, hint: '左短竖 上→下', hintEn: 'left short vertical, top→bottom' },
        { d: 'M 145 30 L 145 170', arrow: { x: 145, y: 178, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' },
        { d: 'M 145 100 L 175 100', arrow: { x: 183, y: 100, rot: 0 }, hint: '右短横 左→右', hintEn: 'right short stroke, left→right' }
      ],
  },
  {
    jamo: 'ㅞ', syllable: '웨', romanization: 'we', cnApprox: '喂', cnApproxEn: 'hello (on phone)',
    cnApproxEn: 'like "weh"',
    mouthHint: '发音时口型介于 ㅝ 和 ㅔ 之间，与 ㅚ/ㅙ 同音。', mouthHintEn: 'The mouth shape is between ㅝ and ㅔ, and it sounds the same as ㅚ/ㅙ.',
    mouthHintEn: 'The mouth opening falls between ㅝ and ㅔ; a homophone of ㅚ/ㅙ.',
    mnemonic: 'ㅜ + ㅔ → we',
    mnemonicEn: 'ㅜ + ㅔ → we',
    combos: [
      { syllable: '웨이터', meaning: '服务员', meaningEn: 'waiter' }, { syllable: '스웨터', meaning: '毛衣', meaningEn: 'sweater' },
      { syllable: '궤도', meaning: '轨道', meaningEn: 'orbit / track' },
    ],
    confused: { jamo: 'ㅚ', syllable: '외', tip: 'ㅞ/ㅚ/ㅙ 现代口语全部同音。', tipEn: 'ㅞ/ㅚ/ㅙ are all homophones in modern speech.' },
      strokes: [
        { d: 'M 35 100 L 125 100', arrow: { x: 133, y: 100, rot: 0 }, hint: '横线 左→右', hintEn: 'horizontal, left→right' },
        { d: 'M 50 100 L 50 165', arrow: { x: 50, y: 173, rot: 90 }, hint: '左短竖 上→下', hintEn: 'left short vertical, top→bottom' },
        { d: 'M 125 30 L 125 170', arrow: { x: 125, y: 178, rot: 90 }, hint: '中竖 上→下', hintEn: 'middle vertical, top→bottom' },
        { d: 'M 125 100 L 155 100', arrow: { x: 163, y: 100, rot: 0 }, hint: '中短横 左→右', hintEn: 'middle short stroke, left→right' },
        { d: 'M 160 30 L 160 170', arrow: { x: 160, y: 178, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' }
      ],
  },
  {
    jamo: 'ㅟ', syllable: '위', romanization: 'wi', cnApprox: '乌一（w+i 直接拼）', cnApproxEn: 'oo + i (w + i blended directly)',
    cnApproxEn: 'like "wee" (w + ee blended directly)',
    mouthHint: '先嘟起嘴唇发 ㅜ，再快速滑到 ㅣ，整体接近中文「威」。', mouthHintEn: 'Pucker your lips for ㅜ, then quickly glide to ㅣ — overall it sounds like Chinese \'wēi\'.',
    mouthHintEn: 'Start with the lips pursed for ㅜ, then glide quickly into ㅣ, sounding close to "wee".',
    mnemonic: 'ㅜ + ㅣ → wi',
    mnemonicEn: 'ㅜ + ㅣ → wi',
    combos: [
      { syllable: '위', meaning: '上', meaningEn: 'top / above' }, { syllable: '귀', meaning: '耳朵', meaningEn: 'ear' },
      { syllable: '뒤', meaning: '后', meaningEn: 'back / behind' }, { syllable: '쥐', meaning: '老鼠', meaningEn: 'mouse / rat' },
    ],
    confused: { jamo: 'ㅚ', syllable: '외', tip: 'ㅟ 收尾是 ㅣ（清亮 i）；ㅚ 收尾偏 e。', tipEn: 'ㅟ ends in ㅣ (bright "ee"); ㅚ ends closer to "e".' },
      strokes: [
        { d: 'M 35 100 L 130 100', arrow: { x: 138, y: 100, rot: 0 }, hint: '横线 左→右', hintEn: 'horizontal, left→right' },
        { d: 'M 50 100 L 50 165', arrow: { x: 50, y: 173, rot: 90 }, hint: '左短竖 上→下', hintEn: 'left short vertical, top→bottom' },
        { d: 'M 130 30 L 130 170', arrow: { x: 130, y: 178, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' }
      ],
  },
  {
    jamo: 'ㅢ', syllable: '의', romanization: 'ui', cnApprox: '呃一', cnApproxEn: 'uh + i',
    cnApproxEn: 'like "eu" + "ee"',
    mouthHint: '先发 ㅡ 扁嘴再快速滑到 ㅣ，词中位置常省略。', mouthHintEn: 'Start with ㅡ with flat lips, then quickly glide to ㅣ; it\'s often dropped in the middle of words.',
    mouthHintEn: 'Start with the flat-lipped ㅡ then glide quickly into ㅣ; it is often reduced when it appears mid-word.',
    mnemonic: 'ㅡ + ㅣ → ui（助词 의 表示"的"）', mnemonicEn: 'ㅡ + ㅣ → ui (the particle 의 means "of")',
    mnemonicEn: 'ㅡ + ㅣ → ui (the particle 의 means "of / \'s").',
    combos: [
      { syllable: '의자', meaning: '椅子', meaningEn: 'chair' }, { syllable: '의사', meaning: '医生', meaningEn: 'doctor' },
      { syllable: '희망', meaning: '希望', meaningEn: 'hope' }, { syllable: '무늬', meaning: '花纹', meaningEn: 'pattern' },
    ],
    confused: { jamo: 'ㅣ', syllable: '이', tip: '助词位置常读成 ㅔ（如 우리의 → 우리에）。', tipEn: 'As a particle it is often pronounced ㅔ (e.g. 우리의 → 우리에).' },
      strokes: [
        { d: 'M 30 100 L 160 100', arrow: { x: 168, y: 100, rot: 0 }, hint: '横线 左→右', hintEn: 'horizontal, left→right' },
        { d: 'M 160 30 L 160 170', arrow: { x: 160, y: 178, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' }
      ],
  },
];

// ── Stage 3 · 基本辅音 14 个 ──
const stage3Letters: ProgressiveLetter[] = [
  {
    jamo: 'ㄱ', syllable: '기역', romanization: 'g/k', cnApprox: '哥', cnApproxEn: 'Oppa',
    cnApproxEn: 'like the "g" in "go"',
    mouthHint: '发音时舌根紧贴软腭阻塞气流，然后突然放开使气流爆破而出，类似中文「哥」的声母。', mouthHintEn: 'When pronouncing, the back of the tongue blocks airflow at the soft palate, then releases suddenly to create a burst, similar to the initial consonant of Chinese "gē."',
    mouthHintEn: 'Press the back of the tongue against the soft palate to block the airflow, then release suddenly so the air bursts out; like the "g" in "go".',
    mnemonic: '像一把刀的形状', mnemonicEn: 'shaped like a knife',
    mnemonicEn: 'Shaped like a knife.',
    combos: [
      { syllable: '가족', meaning: '家族', meaningEn: 'family' }, { syllable: '고기', meaning: '肉', meaningEn: 'meat' },
      { syllable: '구두', meaning: '皮鞋', meaningEn: 'dress shoes' }, { syllable: '기차', meaning: '火车', meaningEn: 'train' },
    ],
    confused: { jamo: 'ㅋ', syllable: '키읔', tip: 'ㄱ 不送气；ㅋ 强烈送气。', tipEn: 'ㄱ is unaspirated; ㅋ is strongly aspirated.' },
      strokes: [
        { d: 'M 45 55 L 155 55 L 155 170', arrow: { x: 155, y: 178, rot: 90 }, hint: '一笔勾 顶横→右竖', hintEn: 'one stroke: top horizontal→right vertical' }
      ],
  },
  {
    jamo: 'ㄴ', syllable: '니은', romanization: 'n', cnApprox: '呢', cnApproxEn: 'ne',
    cnApproxEn: 'like the "n" in "no"',
    mouthHint: '发音时舌尖抵住上齿龈阻碍气流并通过鼻腔发出声音，类似中文「呢」的声母。', mouthHintEn: 'When pronouncing, the tip of the tongue touches the upper gum to block airflow and sound comes through the nose, similar to the initial consonant of Chinese "ne."',
    mouthHintEn: 'Rest the tongue tip against the upper gum to block the airflow and voice it through the nasal cavity; like the "n" in "no".',
    mnemonic: '像一个角，舌头抵上颚的形状', mnemonicEn: 'shaped like a horn, with the tongue touching the palate',
    mnemonicEn: 'Like a corner, mirroring the tongue pressing against the palate.',
    combos: [
      { syllable: '나라', meaning: '国家', meaningEn: 'country' }, { syllable: '노래', meaning: '歌曲', meaningEn: 'song' },
      { syllable: '누나', meaning: '姐姐（弟称）', meaningEn: 'older sister (said by a boy)' }, { syllable: '내일', meaning: '明天', meaningEn: 'tomorrow' },
    ],
    confused: { jamo: 'ㄷ', syllable: '디귿', tip: 'ㄴ 鼻音从鼻腔出；ㄷ 口腔短促爆破。', tipEn: 'ㄴ is a nasal released through the nose; ㄷ is a short oral burst.' },
      strokes: [
        { d: 'M 50 45 L 50 155 L 160 155', arrow: { x: 168, y: 155, rot: 0 }, hint: '一笔勾 左竖→底横', hintEn: 'one stroke: left vertical→bottom horizontal' }
      ],
  },
  {
    jamo: 'ㄷ', syllable: '디귿', romanization: 'd/t', cnApprox: '的', cnApproxEn: 'of',
    cnApproxEn: 'like the "d" in "do"',
    mouthHint: '发音时舌尖抵住上齿龈阻塞气流然后突然放开使气流爆破而出，类似中文「的」的声母。', mouthHintEn: 'When pronouncing, the tip of the tongue blocks airflow at the upper gum, then releases suddenly to create a burst, similar to the initial consonant of Chinese "de."',
    mouthHintEn: 'Rest the tongue tip against the upper gum to block the airflow, then release suddenly so the air bursts out; like the "d" in "do".',
    mnemonic: '像一扇门的形状', mnemonicEn: 'shaped like a door',
    mnemonicEn: 'Shaped like a door.',
    combos: [
      { syllable: '다리', meaning: '腿、桥', meaningEn: 'leg / bridge' }, { syllable: '도시', meaning: '城市', meaningEn: 'city' },
      { syllable: '두부', meaning: '豆腐', meaningEn: 'tofu' }, { syllable: '딸기', meaning: '草莓', meaningEn: 'strawberry' },
    ],
    confused: { jamo: 'ㅌ', syllable: '티읕', tip: 'ㄷ 不送气；ㅌ 强烈送气。', tipEn: 'ㄷ is unaspirated; ㅌ is strongly aspirated.' },
      strokes: [
        { d: 'M 45 45 L 155 45', arrow: { x: 163, y: 45, rot: 0 }, hint: '顶横 左→右', hintEn: 'top horizontal, left→right' },
        { d: 'M 45 45 L 45 155 L 155 155', arrow: { x: 163, y: 155, rot: 0 }, hint: '左竖→底横', hintEn: 'left vertical→bottom horizontal' }
      ],
  },
  {
    jamo: 'ㄹ', syllable: '리을', romanization: 'r/l', cnApprox: '啦', cnApproxEn: 'la',
    cnApproxEn: 'between "r" and "l"',
    mouthHint: '发音时舌尖卷起接触或接近硬腭后部发出颤音或边音。元音间为弹舌音 [ɾ]，收音位置为侧音 [l]。中文没有对应音，「啦」最接近但不精确。', mouthHintEn: 'When pronouncing, the tip of the tongue curls up to touch or approach the back of the hard palate to produce a trill or lateral sound. Between vowels it\'s a flap [ɾ], and in final position it\'s a lateral [l]. Chinese has no exact equivalent; "la" is closest but not precise.',
    mouthHintEn: 'Curl the tongue tip to touch or approach the back of the hard palate, producing a flap or lateral. Between vowels it is a flap [ɾ]; in the final position it is a lateral [l]. English has no exact match, though "l" is the closest.',
    mnemonic: '像蜿蜒的小路 → 舌尖像路一样弹过去', mnemonicEn: 'Like a winding path → the tongue flicks across like a road',
    mnemonicEn: 'Like a winding path → the tongue tip flicks across like a road.',
    combos: [
      { syllable: '라면', meaning: '拉面', meaningEn: 'ramen / instant noodles' }, { syllable: '러시아', meaning: '俄罗斯', meaningEn: 'Russia' },
      { syllable: '로마', meaning: '罗马', meaningEn: 'Rome' }, { syllable: '리본', meaning: '丝带', meaningEn: 'ribbon' },
    ],
    confused: { jamo: 'ㄴ', syllable: '니은', tip: 'ㄹ 弹舌或侧音；ㄴ 鼻音从鼻腔出。', tipEn: 'ㄹ is a flap or lateral; ㄴ is a nasal released through the nose.' },
      strokes: [
        { d: 'M 45 45 L 155 45 L 155 100', arrow: { x: 155, y: 108, rot: 90 }, hint: 'ㄱ 形', hintEn: 'ㄱ shape' },
        { d: 'M 45 100 L 155 100', arrow: { x: 163, y: 100, rot: 0 }, hint: '中横', hintEn: 'middle stroke' },
        { d: 'M 45 100 L 45 160 L 155 160', arrow: { x: 163, y: 160, rot: 0 }, hint: 'ㄴ 形', hintEn: 'ㄴ shape' }
      ],
  },
  {
    jamo: 'ㅁ', syllable: '미음', romanization: 'm', cnApprox: '么', cnApproxEn: 'what',
    cnApproxEn: 'like the "m" in "mom"',
    mouthHint: '发音时双唇紧闭阻塞气流然后通过鼻腔发出声音，类似中文「妈」的声母。', mouthHintEn: 'Close both lips to block airflow, then release through the nose, similar to the initial consonant of Chinese \'ma\' (妈).',
    mouthHintEn: 'Close the lips tightly to block the airflow and voice it through the nasal cavity; like the "m" in "mom".',
    mnemonic: '像一个口字的形状', mnemonicEn: 'like the shape of the character 口',
    mnemonicEn: 'Shaped like a mouth / box.',
    combos: [
      { syllable: '마음', meaning: '心、内心', meaningEn: 'heart / mind' }, { syllable: '모자', meaning: '帽子', meaningEn: 'hat' },
      { syllable: '물', meaning: '水', meaningEn: 'water' }, { syllable: '미국', meaning: '美国', meaningEn: 'USA' },
    ],
    confused: { jamo: 'ㅂ', syllable: '비읍', tip: 'ㅁ 鼻音持续；ㅂ 双唇短促爆破。', tipEn: 'ㅁ is a sustained nasal; ㅂ is a short bilabial burst.' },
      strokes: [
        { d: 'M 55 45 L 55 155', arrow: { x: 55, y: 163, rot: 90 }, hint: '左竖 上→下', hintEn: 'left vertical, top→bottom' },
        { d: 'M 55 45 L 145 45 L 145 155', arrow: { x: 145, y: 163, rot: 90 }, hint: '顶横→右竖', hintEn: 'top horizontal→right vertical' },
        { d: 'M 55 155 L 145 155', arrow: { x: 153, y: 155, rot: 0 }, hint: '底横 左→右', hintEn: 'bottom horizontal, left→right' }
      ],
  },
  {
    jamo: 'ㅂ', syllable: '비읍', romanization: 'b/p', cnApprox: '波', cnApproxEn: 'wave',
    cnApproxEn: 'like the "b" in "boy"',
    mouthHint: '发音时双唇紧闭阻塞气流然后突然放开使气流爆破而出，类似中文「波」的声母。', mouthHintEn: 'Close both lips to block airflow, then release suddenly for a burst, similar to the initial consonant of Chinese \'bo\' (波).',
    mouthHintEn: 'Close the lips tightly to block the airflow, then release suddenly so the air bursts out; like the "b" in "boy".',
    mnemonic: '像一个水桶的形状', mnemonicEn: 'like the shape of a bucket',
    mnemonicEn: 'Shaped like a bucket.',
    combos: [
      { syllable: '바다', meaning: '海', meaningEn: 'sea' }, { syllable: '비', meaning: '雨', meaningEn: 'rain' },
      { syllable: '봄', meaning: '春天', meaningEn: 'spring' }, { syllable: '병원', meaning: '医院', meaningEn: 'hospital' },
    ],
    confused: { jamo: 'ㅍ', syllable: '피읖', tip: 'ㅂ 不送气；ㅍ 强烈送气。', tipEn: 'ㅂ is unaspirated; ㅍ is strongly aspirated.' },
      strokes: [
        { d: 'M 55 45 L 55 155', arrow: { x: 55, y: 163, rot: 90 }, hint: '左竖 上→下', hintEn: 'left vertical, top→bottom' },
        { d: 'M 145 45 L 145 155', arrow: { x: 145, y: 163, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' },
        { d: 'M 55 100 L 145 100', arrow: { x: 153, y: 100, rot: 0 }, hint: '中横 左→右', hintEn: 'middle stroke, left→right' },
        { d: 'M 55 155 L 145 155', arrow: { x: 153, y: 155, rot: 0 }, hint: '底横 左→右', hintEn: 'bottom horizontal, left→right' }
      ],
  },
  {
    jamo: 'ㅅ', syllable: '시옷', romanization: 's', cnApprox: '丝', cnApproxEn: 'silk',
    cnApproxEn: 'like the "s" in "see"',
    mouthHint: '发音时舌尖抵住下齿背靠近齿龈阻碍气流并从舌尖和齿龈间空隙中流出；遇 ㅣ 和 y 系半元音（ㅑ/ㅕ/ㅛ/ㅠ）时腭化为 [ɕ]（类似 sh）。', mouthHintEn: 'Place the tongue tip against the lower teeth near the gums to block airflow, then let it escape through the gap; before ㅣ and y-series semivowels (ㅑ/ㅕ/ㅛ/ㅠ), it palatalizes to [ɕ] (like \'sh\').',
    mouthHintEn: 'Rest the tongue tip behind the lower teeth near the gum, obstructing the airflow so it streams out through the narrow gap; before ㅣ and the y-glide vowels (ㅑ/ㅕ/ㅛ/ㅠ) it palatalizes to [ɕ] (like "sh").',
    mnemonic: '像一座山的形状', mnemonicEn: 'like the shape of a mountain',
    mnemonicEn: 'Shaped like a mountain.',
    combos: [
      { syllable: '사람', meaning: '人', meaningEn: 'person' }, { syllable: '소금', meaning: '盐', meaningEn: 'salt' },
      { syllable: '수업', meaning: '课、上课', meaningEn: 'class / lesson' }, { syllable: '시간', meaning: '时间', meaningEn: 'time' },
    ],
    confused: { jamo: 'ㅈ', syllable: '지읒', tip: 'ㅅ 是摩擦音；ㅈ 是爆破+摩擦的塞擦音。', tipEn: 'ㅅ is a fricative; ㅈ is an affricate (a stop plus friction).' },
      strokes: [
        { d: 'M 140 45 L 60 155', arrow: { x: 52, y: 163, rot: 120 }, hint: '左撇 上→下', hintEn: 'left downstroke, top→bottom' },
        { d: 'M 140 45 L 160 125', arrow: { x: 165, y: 130, rot: 60 }, hint: '右捺 上→下', hintEn: 'right downstroke, top→bottom' }
      ],
  },
  {
    jamo: 'ㅇ', syllable: '이응', romanization: '–/ng', cnApprox: '（初声不发音）', cnApproxEn: '(Silent as initial consonant)',
    cnApproxEn: '(silent as an initial)',
    mouthHint: '作初声时不发音，只是占位；作终声时发 ng。', mouthHintEn: 'Silent as an initial, just a placeholder; pronounced as \'ng\' as a final.',
    mouthHintEn: 'Silent as an initial (just a placeholder); pronounced "ng" as a final.',
    mnemonic: '像数字 0，代表空/无', mnemonicEn: 'Like the number 0, representing emptiness/nothing',
    mnemonicEn: 'Like the number 0, standing for empty / nothing.',
    combos: [
      { syllable: '아기', meaning: '婴儿', meaningEn: 'baby' }, { syllable: '오빠', meaning: '哥哥（妹称）', meaningEn: 'older brother (said by a girl)' },
      { syllable: '우유', meaning: '牛奶', meaningEn: 'milk' }, { syllable: '이름', meaning: '名字', meaningEn: 'name' },
    ],
    confused: { jamo: 'ㅎ', syllable: '히읗', tip: 'ㅇ 初声不发音；ㅎ 喉部送气。', tipEn: 'ㅇ is silent as an initial; ㅎ is an aspirated glottal sound.' },
      strokes: [
        { d: 'M 100 55 C 55 55 55 145 100 145 C 145 145 145 55 100 55 Z', arrow: { x: 100, y: 55, rot: 0 }, hint: '画一个圆圈', hintEn: 'draw a circle' }
      ],
  },
  {
    jamo: 'ㅈ', syllable: '지읒', romanization: 'j', cnApprox: '机', cnApproxEn: 'Machine',
    cnApproxEn: 'like the "j" in "jeep"',
    mouthHint: '舌面贴硬腭爆破+摩擦，类似英语 jeep 的 j。', mouthHintEn: 'Tongue against hard palate, plosive + fricative, similar to \'j\' in English \'jeep\'.',
    mouthHintEn: 'Press the tongue body against the hard palate for a stop plus friction; like the "j" in "jeep".',
    mnemonic: '像一个人伸出手臂', mnemonicEn: 'Like a person extending an arm',
    mnemonicEn: 'Like a person stretching out their arms.',
    combos: [
      { syllable: '자전거', meaning: '自行车', meaningEn: 'bicycle' }, { syllable: '조용', meaning: '安静', meaningEn: 'quiet' },
      { syllable: '주말', meaning: '周末', meaningEn: 'weekend' }, { syllable: '지하철', meaning: '地铁', meaningEn: 'subway' },
    ],
    confused: { jamo: 'ㅊ', syllable: '치읓', tip: 'ㅈ 不送气；ㅊ 强烈送气。', tipEn: 'ㅈ is unaspirated; ㅊ is strongly aspirated.' },
      strokes: [
        { d: 'M 45 45 L 155 45', arrow: { x: 163, y: 45, rot: 0 }, hint: '顶横 左→右', hintEn: 'top horizontal, left→right' },
        { d: 'M 100 45 L 55 155', arrow: { x: 47, y: 163, rot: 120 }, hint: '左下撇', hintEn: 'lower-left downstroke' },
        { d: 'M 100 45 L 155 155', arrow: { x: 163, y: 163, rot: 60 }, hint: '右下撇', hintEn: 'lower-right downstroke' }
      ],
  },
  {
    jamo: 'ㅊ', syllable: '치읓', romanization: 'ch', cnApprox: '七', cnApproxEn: 'Seven',
    cnApproxEn: 'like the "ch" in "cheese"',
    mouthHint: '舌面贴硬腭爆破+强送气，不卷舌，类似中文"七"的声母 [tɕʰ]。', mouthHintEn: 'Tongue against hard palate, plosive with strong aspiration, not retroflex, similar to the initial [tɕʰ] in Chinese \'qi\'.',
    mouthHintEn: 'Press the tongue body against the hard palate for a stop plus strong aspiration, without curling the tongue; [tɕʰ], like a strongly aspirated "ch".',
    mnemonic: 'ㅈ 加一短横 → 送气版', mnemonicEn: 'ㅈ plus a short stroke → aspirated version',
    mnemonicEn: 'ㅈ with an extra short stroke → the aspirated version.',
    combos: [
      { syllable: '차', meaning: '茶、车', meaningEn: 'tea / car' }, { syllable: '책', meaning: '书', meaningEn: 'book' },
      { syllable: '추석', meaning: '中秋', meaningEn: 'Chuseok (Korean harvest festival)' }, { syllable: '친구', meaning: '朋友', meaningEn: 'friend' },
    ],
    confused: { jamo: 'ㅈ', syllable: '지읒', tip: 'ㅊ 强送气；ㅈ 不送气。', tipEn: 'ㅊ is strongly aspirated; ㅈ is unaspirated.' },
      strokes: [
        { d: 'M 100 30 L 100 50', arrow: { x: 100, y: 58, rot: 90 }, hint: '顶点 上→下', hintEn: 'top dot, top→bottom' },
        { d: 'M 45 55 L 155 55', arrow: { x: 163, y: 55, rot: 0 }, hint: '横笔 左→右', hintEn: 'horizontal stroke, left→right' },
        { d: 'M 100 55 L 55 160', arrow: { x: 47, y: 168, rot: 120 }, hint: '左下撇', hintEn: 'lower-left downstroke' },
        { d: 'M 100 55 L 155 160', arrow: { x: 163, y: 168, rot: 60 }, hint: '右下撇', hintEn: 'lower-right downstroke' }
      ],
  },
  {
    jamo: 'ㅋ', syllable: '키읔', romanization: 'k', cnApprox: '科', cnApproxEn: 'Department',
    cnApproxEn: 'like the "k" in "key"',
    mouthHint: '发音时舌根贴紧软腭阻塞气流然后突然放开并送气发出声音，类似英语 key 的 k。', mouthHintEn: 'The tongue root presses against the soft palate to block airflow, then releases with aspiration, similar to \'k\' in English \'key\'.',
    mouthHintEn: 'Press the back of the tongue against the soft palate to block the airflow, then release with aspiration; like the "k" in "key".',
    mnemonic: 'ㄱ 加一中横 → 送气版', mnemonicEn: 'Add a horizontal stroke to ㄱ → aspirated version',
    mnemonicEn: 'ㄱ with an extra middle stroke → the aspirated version.',
    combos: [
      { syllable: '카드', meaning: '卡片', meaningEn: 'card' }, { syllable: '코', meaning: '鼻子', meaningEn: 'nose' },
      { syllable: '커피', meaning: '咖啡', meaningEn: 'coffee' }, { syllable: '키', meaning: '身高', meaningEn: 'height' },
    ],
    confused: { jamo: 'ㄱ', syllable: '기역', tip: 'ㅋ 强送气；ㄱ 不送气。', tipEn: 'ㅋ is strongly aspirated; ㄱ is unaspirated.' },
      strokes: [
        { d: 'M 45 55 L 155 55', arrow: { x: 163, y: 55, rot: 0 }, hint: '顶横 左→右', hintEn: 'top horizontal, left→right' },
        { d: 'M 45 115 L 155 115 L 155 170', arrow: { x: 155, y: 178, rot: 90 }, hint: '中横→右竖', hintEn: 'middle stroke→right vertical' }
      ],
  },
  {
    jamo: 'ㅌ', syllable: '티읕', romanization: 't', cnApprox: '他', cnApproxEn: 'he',
    cnApproxEn: 'like the "t" in "tea"',
    mouthHint: '发音时舌尖抵住上齿龈阻塞气流然后突然放开并送气发出声音，类似中文「他」的声母。', mouthHintEn: 'When pronouncing, the tip of the tongue blocks airflow at the upper gum, then releases suddenly with aspiration, similar to the initial consonant of Chinese \'ta\' (他).',
    mouthHintEn: 'Rest the tongue tip against the upper gum to block the airflow, then release with aspiration; like the "t" in "tea".',
    mnemonic: 'ㄷ 加一中横 → 送气版', mnemonicEn: 'Add a horizontal stroke to ㄷ → aspirated version',
    mnemonicEn: 'ㄷ with an extra middle stroke → the aspirated version.',
    combos: [
      { syllable: '타조', meaning: '鸵鸟', meaningEn: 'ostrich' }, { syllable: '토끼', meaning: '兔子', meaningEn: 'rabbit' },
      { syllable: '투수', meaning: '投手', meaningEn: 'pitcher (baseball)' }, { syllable: '티셔츠', meaning: 'T 恤', meaningEn: 'T-shirt' },
    ],
    confused: { jamo: 'ㄷ', syllable: '디귿', tip: 'ㅌ 强送气；ㄷ 不送气。', tipEn: 'ㅌ is strongly aspirated; ㄷ is unaspirated.' },
      strokes: [
        { d: 'M 45 45 L 155 45', arrow: { x: 163, y: 45, rot: 0 }, hint: '顶横 左→右', hintEn: 'top horizontal, left→right' },
        { d: 'M 45 100 L 155 100', arrow: { x: 163, y: 100, rot: 0 }, hint: '中横 左→右', hintEn: 'middle stroke, left→right' },
        { d: 'M 45 45 L 45 155 L 155 155', arrow: { x: 163, y: 155, rot: 0 }, hint: '左竖→底横', hintEn: 'left vertical→bottom horizontal' }
      ],
  },
  {
    jamo: 'ㅍ', syllable: '피읖', romanization: 'p', cnApprox: '坡', cnApproxEn: 'slope',
    cnApproxEn: 'like the "p" in "pin"',
    mouthHint: '发音方法与 ㅂ 相同但力度更强，为送气音，类似英语 pin 的 p。', mouthHintEn: 'Pronounced like ㅂ but with more force, aspirated, similar to the \'p\' in English \'pin\'.',
    mouthHintEn: 'Same articulation as ㅂ but stronger and aspirated; like the "p" in "pin".',
    mnemonic: 'ㅂ 横版形状 → 送气版', mnemonicEn: 'ㅂ horizontal shape → aspirated version',
    mnemonicEn: 'A horizontal version of ㅂ → the aspirated version.',
    combos: [
      { syllable: '파', meaning: '葱', meaningEn: 'green onion' }, { syllable: '포도', meaning: '葡萄', meaningEn: 'grapes' },
      { syllable: '편지', meaning: '信', meaningEn: 'letter' }, { syllable: '피자', meaning: '披萨', meaningEn: 'pizza' },
    ],
    confused: { jamo: 'ㅂ', syllable: '비읍', tip: 'ㅍ 强送气；ㅂ 不送气。', tipEn: 'ㅍ is strongly aspirated; ㅂ is unaspirated.' },
      strokes: [
        { d: 'M 35 55 L 165 55', arrow: { x: 173, y: 55, rot: 0 }, hint: '顶横 左→右', hintEn: 'top horizontal, left→right' },
        { d: 'M 60 55 L 60 150', arrow: { x: 60, y: 158, rot: 90 }, hint: '左竖 上→下', hintEn: 'left vertical, top→bottom' },
        { d: 'M 130 55 L 130 150', arrow: { x: 130, y: 158, rot: 90 }, hint: '右竖 上→下', hintEn: 'right vertical, top→bottom' },
        { d: 'M 45 150 L 155 150', arrow: { x: 163, y: 150, rot: 0 }, hint: '底横 左→右', hintEn: 'bottom horizontal, left→right' }
      ],
  },
  {
    jamo: 'ㅎ', syllable: '히읗', romanization: 'h', cnApprox: '喝', cnApproxEn: 'Drink',
    cnApproxEn: 'like the "h" in "ha"',
    mouthHint: '发音时舌根和软腭放松让气流从口腔自由呼出产生摩擦声，类似中文「哈」的声母。', mouthHintEn: 'When pronouncing, relax the back of the tongue and soft palate to let air flow freely out of the mouth, creating friction, similar to the initial consonant of Chinese \'ha\' (哈).',
    mouthHintEn: 'Relax the back of the tongue and soft palate so the air flows freely out of the mouth with friction; like the "h" in "ha".',
    mnemonic: '上方一点+一横+下方圆圈', mnemonicEn: 'a dot on top + a horizontal stroke + a circle below',
    mnemonicEn: 'A dot on top + a horizontal stroke + a circle below.',
    combos: [
      { syllable: '하늘', meaning: '天空', meaningEn: 'sky' }, { syllable: '호랑이', meaning: '老虎', meaningEn: 'tiger' },
      { syllable: '학교', meaning: '学校', meaningEn: 'school' }, { syllable: '한국', meaning: '韩国', meaningEn: 'Korea' },
    ],
    confused: { jamo: 'ㅇ', syllable: '이응', tip: 'ㅎ 喉部明显送气；ㅇ 初声完全不发音。', tipEn: 'ㅎ has clear glottal aspiration; ㅇ is completely silent as an initial.' },
      strokes: [
        { d: 'M 100 30 L 100 48', arrow: { x: 100, y: 56, rot: 90 }, hint: '顶点 上→下', hintEn: 'top dot, top→bottom' },
        { d: 'M 55 55 L 145 55', arrow: { x: 153, y: 55, rot: 0 }, hint: '横笔 左→右', hintEn: 'horizontal stroke, left→right' },
        { d: 'M 100 85 C 70 85 65 160 100 160 C 135 160 130 85 100 85 Z', arrow: { x: 100, y: 85, rot: 0 }, hint: '底部圆圈', hintEn: 'bottom circle' }
      ],
  },
];

// ── Stage 4 · 紧音 5 个 ──
const stage4Letters: ProgressiveLetter[] = [
  {
    jamo: 'ㄲ', syllable: '쌍기역', romanization: 'kk', cnApprox: '嘎（紧）', cnApproxEn: 'ga (tense)',
    cnApproxEn: 'a tense "g" (like "gg", pronounced with a tight throat)',
    mouthHint: '声带紧绷，不送气，比 ㄱ 更用力的"嘎"。', mouthHintEn: 'Vocal cords are tense, not aspirated, a stronger \'ga\' than ㄱ.',
    mouthHintEn: 'Tense the vocal cords, no aspiration; a harder version of ㄱ.',
    mnemonic: '两个 ㄱ 叠加 → 紧音版', mnemonicEn: 'Two ㄱ stacked → tense version',
    mnemonicEn: 'Two ㄱ side by side → the tense version.',
    combos: [
      { syllable: '꼬리', meaning: '尾巴', meaningEn: 'tail' }, { syllable: '꽃', meaning: '花', meaningEn: 'flower' },
      { syllable: '꿈', meaning: '梦', meaningEn: 'dream' }, { syllable: '끝', meaning: '结束', meaningEn: 'end' },
    ],
    confused: { jamo: 'ㅋ', syllable: '키읔', tip: 'ㄲ 紧不送气；ㅋ 强送气。', tipEn: 'ㄲ is tense and unaspirated; ㅋ is strongly aspirated.' },
      strokes: [
        { d: 'M 30 65 L 85 65 L 85 170', arrow: { x: 85, y: 178, rot: 90 }, hint: '左 ㄱ', hintEn: 'left ㄱ' },
        { d: 'M 115 65 L 170 65 L 170 170', arrow: { x: 170, y: 178, rot: 90 }, hint: '右 ㄱ', hintEn: 'right ㄱ' }
      ],
  },
  {
    jamo: 'ㄸ', syllable: '쌍디귿', romanization: 'tt', cnApprox: '哒（紧）', cnApproxEn: 'Tight \'da\'',
    cnApproxEn: 'a tense "d" (like "dd", pronounced with a tight throat)',
    mouthHint: '声带紧绷，不送气，比 ㄷ 更用力的"哒"。', mouthHintEn: 'Vocal cords tense, unaspirated, a stronger \'da\' than ㄷ.',
    mouthHintEn: 'Tense the vocal cords, no aspiration; a harder version of ㄷ.',
    mnemonic: '两个 ㄷ 叠加 → 紧音版', mnemonicEn: 'Two ㄷ combined → tense version',
    mnemonicEn: 'Two ㄷ side by side → the tense version.',
    combos: [
      { syllable: '딸', meaning: '女儿', meaningEn: 'daughter' }, { syllable: '땅', meaning: '土地', meaningEn: 'land / ground' },
      { syllable: '떡', meaning: '年糕', meaningEn: 'rice cake' }, { syllable: '띠', meaning: '生肖、腰带', meaningEn: 'zodiac sign / belt' },
    ],
    confused: { jamo: 'ㅌ', syllable: '티읕', tip: 'ㄸ 紧不送气；ㅌ 强送气。', tipEn: 'ㄸ is tense and unaspirated; ㅌ is strongly aspirated.' },
      strokes: [
        { d: 'M 30 55 L 85 55', arrow: { x: 93, y: 55, rot: 0 }, hint: '左顶横', hintEn: 'left top horizontal' },
        { d: 'M 30 55 L 30 155 L 85 155', arrow: { x: 93, y: 155, rot: 0 }, hint: '左竖→底横', hintEn: 'left vertical→bottom horizontal' },
        { d: 'M 115 55 L 170 55', arrow: { x: 178, y: 55, rot: 0 }, hint: '右顶横', hintEn: 'right top horizontal' },
        { d: 'M 115 55 L 115 155 L 170 155', arrow: { x: 178, y: 155, rot: 0 }, hint: '右竖→底横', hintEn: 'right vertical→bottom horizontal' }
      ],
  },
  {
    jamo: 'ㅃ', syllable: '쌍비읍', romanization: 'pp', cnApprox: '吧（紧）', cnApproxEn: 'Tight \'ba\'',
    cnApproxEn: 'a tense "b" (like "bb", pronounced with a tight throat)',
    mouthHint: '声带紧绷，不送气，比 ㅂ 更用力的"吧"。', mouthHintEn: 'Vocal cords tense, unaspirated, a stronger \'ba\' than ㅂ.',
    mouthHintEn: 'Tense the vocal cords, no aspiration; a harder version of ㅂ.',
    mnemonic: '两个 ㅂ 叠加 → 紧音版', mnemonicEn: 'Two ㅂ combined → tense version',
    mnemonicEn: 'Two ㅂ side by side → the tense version.',
    combos: [
      { syllable: '빵', meaning: '面包', meaningEn: 'bread' }, { syllable: '뼈', meaning: '骨头', meaningEn: 'bone' },
      { syllable: '뽀뽀', meaning: '亲亲（口语）', meaningEn: 'kiss (colloquial)' }, { syllable: '빨강', meaning: '红色', meaningEn: 'red' },
    ],
    confused: { jamo: 'ㅍ', syllable: '피읖', tip: 'ㅃ 紧不送气；ㅍ 强送气。', tipEn: 'ㅃ is tense and unaspirated; ㅍ is strongly aspirated.' },
      strokes: [
        { d: 'M 30 55 L 30 155', arrow: { x: 30, y: 163, rot: 90 }, hint: '左竖1', hintEn: 'left vertical 1' },
        { d: 'M 85 55 L 85 155', arrow: { x: 85, y: 163, rot: 90 }, hint: '左竖2', hintEn: 'left vertical 2' },
        { d: 'M 30 105 L 85 105', arrow: { x: 93, y: 105, rot: 0 }, hint: '左中横', hintEn: 'left middle stroke' },
        { d: 'M 30 155 L 85 155', arrow: { x: 93, y: 155, rot: 0 }, hint: '左底横', hintEn: 'left bottom horizontal' },
        { d: 'M 115 55 L 115 155', arrow: { x: 115, y: 163, rot: 90 }, hint: '右竖1', hintEn: 'right vertical 1' },
        { d: 'M 170 55 L 170 155', arrow: { x: 170, y: 163, rot: 90 }, hint: '右竖2', hintEn: 'right vertical 2' },
        { d: 'M 115 105 L 170 105', arrow: { x: 178, y: 105, rot: 0 }, hint: '右中横', hintEn: 'right middle stroke' },
        { d: 'M 115 155 L 170 155', arrow: { x: 178, y: 155, rot: 0 }, hint: '右底横', hintEn: 'right bottom horizontal' }
      ],
  },
  {
    jamo: 'ㅆ', syllable: '쌍시옷', romanization: 'ss', cnApprox: '撒（紧）', cnApproxEn: 'tight (tense)',
    cnApproxEn: 'a tense "s" (like "ss", pronounced with a tight throat)',
    mouthHint: '声带紧绷的摩擦音，比 ㅅ 更短促有力。', mouthHintEn: 'A tense fricative with a tight vocal cord, shorter and more forceful than ㅅ.',
    mouthHintEn: 'A fricative with tensed vocal cords, shorter and more forceful than ㅅ.',
    mnemonic: '两个 ㅅ 叠加 → 紧音版', mnemonicEn: 'Two ㅅ combined → tense version',
    mnemonicEn: 'Two ㅅ side by side → the tense version.',
    combos: [
      { syllable: '쌀', meaning: '大米', meaningEn: 'rice (uncooked)' }, { syllable: '쌍둥이', meaning: '双胞胎', meaningEn: 'twins' },
      { syllable: '씨앗', meaning: '种子', meaningEn: 'seed' }, { syllable: '씨름', meaning: '摔跤', meaningEn: 'ssireum (Korean wrestling)' },
    ],
    confused: { jamo: 'ㅅ', syllable: '시옷', tip: 'ㅅ 轻而短；ㅆ 紧而长（声门收紧，时长更长）。', tipEn: 'ㅅ is light and short; ㅆ is tense and longer (the glottis tightens and the sound lasts longer).' },
      strokes: [
        { d: 'M 100 45 L 50 155', arrow: { x: 42, y: 163, rot: 120 }, hint: '左上撇', hintEn: 'upper-left downstroke' },
        { d: 'M 100 45 L 140 125', arrow: { x: 148, y: 130, rot: 60 }, hint: '右上捺', hintEn: 'upper-right downstroke' },
        { d: 'M 135 45 L 85 155', arrow: { x: 77, y: 163, rot: 120 }, hint: '左下撇', hintEn: 'lower-left downstroke' },
        { d: 'M 135 45 L 175 125', arrow: { x: 183, y: 130, rot: 60 }, hint: '右下捺', hintEn: 'lower-right downstroke' }
      ],
  },
  {
    jamo: 'ㅉ', syllable: '쌍지읒', romanization: 'jj', cnApprox: '机（紧，不卷舌）', cnApproxEn: 'machine (tense, not retroflex)',
    cnApproxEn: 'a tense "j" (like "jj", pronounced with a tight throat, no tongue-curl)',
    mouthHint: '声带紧绷的塞擦音，比 ㅈ 更用力。', mouthHintEn: 'A tense affricate with a tight vocal cord, more forceful than ㅈ.',
    mouthHintEn: 'An affricate with tensed vocal cords, more forceful than ㅈ.',
    mnemonic: '两个 ㅈ 叠加 → 紧音版', mnemonicEn: 'Two ㅈ combined → tense version',
    mnemonicEn: 'Two ㅈ side by side → the tense version.',
    combos: [
      { syllable: '짜장면', meaning: '炸酱面', meaningEn: 'jjajangmyeon (black-bean noodles)' }, { syllable: '쪽', meaning: '边、页', meaningEn: 'side / page' },
      { syllable: '찌개', meaning: '汤、锅', meaningEn: 'stew' }, { syllable: '쭉', meaning: '一直（副词）', meaningEn: 'straight / continuously (adverb)' },
    ],
    confused: { jamo: 'ㅊ', syllable: '치읓', tip: 'ㅉ 紧不送气；ㅊ 强送气。', tipEn: 'ㅉ is tense and unaspirated; ㅊ is strongly aspirated.' },
      strokes: [
        { d: 'M 30 50 L 95 50', arrow: { x: 103, y: 50, rot: 0 }, hint: '左顶横', hintEn: 'left top horizontal' },
        { d: 'M 62 50 L 38 150', arrow: { x: 30, y: 158, rot: 120 }, hint: '左左撇', hintEn: 'left, left downstroke' },
        { d: 'M 62 50 L 90 150', arrow: { x: 98, y: 158, rot: 60 }, hint: '左右撇', hintEn: 'left, right downstroke' },
        { d: 'M 105 50 L 170 50', arrow: { x: 178, y: 50, rot: 0 }, hint: '右顶横', hintEn: 'right top horizontal' },
        { d: 'M 138 50 L 113 150', arrow: { x: 105, y: 158, rot: 120 }, hint: '右左撇', hintEn: 'right, left downstroke' },
        { d: 'M 138 50 L 165 150', arrow: { x: 173, y: 158, rot: 60 }, hint: '右右撇', hintEn: 'right, right downstroke' }
      ],
  },
];

export const PROGRESSIVE_STAGES: ProgressiveStage[] = [
  { id: 1, name: '基本元音', nameEn: 'Basic Vowels', nameKr: '기본 모음', emoji: '🌊', desc: '10 个最基础的元音', descEn: '10 most basic vowels', letters: stage1Letters, locked: false },
  { id: 2, name: '合成元音', nameEn: 'Compound Vowels', nameKr: '이중모음', emoji: '🌈', desc: '11 个合成元音', descEn: '11 compound vowels', letters: stage2Letters, locked: false },
  { id: 3, name: '基本辅音', nameEn: 'Basic Consonants', nameKr: '기본 자음', emoji: '🌿', desc: '14 个基础辅音', descEn: '14 basic consonants', letters: stage3Letters, locked: false },
  { id: 4, name: '紧音', nameEn: 'Tense Consonants', nameKr: '된소리', emoji: '🔥', desc: '5 个紧音', descEn: '5 tense consonants', letters: stage4Letters, locked: false },
];

export function getStage(stageId: number): ProgressiveStage | null {
  return PROGRESSIVE_STAGES.find((s) => s.id === stageId) ?? null;
}

// 拼读题目用的辅音（合成音节走 speak()，无需注册音频）
export const BLEND_CONSONANTS = [
  { jamo: 'ㄱ', roman: 'g' }, { jamo: 'ㄴ', roman: 'n' }, { jamo: 'ㄷ', roman: 'd' },
  { jamo: 'ㄹ', roman: 'r' }, { jamo: 'ㅁ', roman: 'm' }, { jamo: 'ㅂ', roman: 'b' },
  { jamo: 'ㅅ', roman: 's' }, { jamo: 'ㅈ', roman: 'j' }, { jamo: 'ㅎ', roman: 'h' },
];

// 韩文音节合成（已在 phonetics/page.tsx 内部实现，此处复刻避免循环依赖）
const CHO_IDX: Record<string, number> = {
  'ㄱ': 0, 'ㄲ': 1, 'ㄴ': 2, 'ㄷ': 3, 'ㄸ': 4, 'ㄹ': 5, 'ㅁ': 6, 'ㅂ': 7, 'ㅃ': 8,
  'ㅅ': 9, 'ㅆ': 10, 'ㅇ': 11, 'ㅈ': 12, 'ㅉ': 13, 'ㅊ': 14, 'ㅋ': 15, 'ㅌ': 16, 'ㅍ': 17, 'ㅎ': 18,
};
const JUNG_IDX: Record<string, number> = {
  'ㅏ': 0, 'ㅐ': 1, 'ㅑ': 2, 'ㅒ': 3, 'ㅓ': 4, 'ㅔ': 5, 'ㅕ': 6, 'ㅖ': 7, 'ㅗ': 8, 'ㅘ': 9,
  'ㅙ': 10, 'ㅚ': 11, 'ㅛ': 12, 'ㅜ': 13, 'ㅝ': 14, 'ㅞ': 15, 'ㅟ': 16, 'ㅠ': 17, 'ㅡ': 18, 'ㅢ': 19, 'ㅣ': 20,
};

export function composeBlend(cho: string, jung: string): string {
  const c = CHO_IDX[cho], v = JUNG_IDX[jung];
  if (c == null || v == null) return '';
  return String.fromCodePoint(0xAC00 + c * 588 + v * 28);
}

// Stage 4 紧音 vs 送气音对照对（共用于 blend / challenge 题型）
export const TENSE_PAIRS: Array<{ tense: string; aspirated: string; tenseSyl: string; aspiratedSyl: string }> = [
  { tense: 'ㄲ', aspirated: 'ㅋ', tenseSyl: '까', aspiratedSyl: '카' },
  { tense: 'ㄸ', aspirated: 'ㅌ', tenseSyl: '따', aspiratedSyl: '타' },
  { tense: 'ㅃ', aspirated: 'ㅍ', tenseSyl: '빠', aspiratedSyl: '파' },
  { tense: 'ㅆ', aspirated: 'ㅅ', tenseSyl: '싸', aspiratedSyl: '사' },
  { tense: 'ㅉ', aspirated: 'ㅊ', tenseSyl: '짜', aspiratedSyl: '차' },
];

// 音节拼读题用：罗马音映射
export const JAMO_ROMAN: Record<string, string> = {
  ㄱ: 'g', ㄲ: 'kk', ㄴ: 'n', ㄷ: 'd', ㄸ: 'tt', ㄹ: 'r', ㅁ: 'm', ㅂ: 'b', ㅃ: 'pp',
  ㅅ: 's', ㅆ: 'ss', ㅇ: '', ㅈ: 'j', ㅉ: 'jj', ㅊ: 'ch', ㅋ: 'k', ㅌ: 't', ㅍ: 'p', ㅎ: 'h',
  ㅏ: 'a', ㅑ: 'ya', ㅓ: 'eo', ㅕ: 'yeo', ㅗ: 'o', ㅛ: 'yo', ㅜ: 'u', ㅠ: 'yu', ㅡ: 'eu', ㅣ: 'i',
  ㅐ: 'ae', ㅒ: 'yae', ㅔ: 'e', ㅖ: 'ye', ㅘ: 'wa', ㅙ: 'wae', ㅚ: 'oe', ㅝ: 'wo', ㅞ: 'we', ㅟ: 'wi', ㅢ: 'ui',
};

// 收音 → 罗马音（韩语收音只发 7 种音）
export const JONG_ROMAN: Record<string, string> = {
  ㄱ: 'k', ㄴ: 'n', ㄷ: 't', ㄹ: 'l', ㅁ: 'm', ㅂ: 'p', ㅇ: 'ng',
  // 收音同音归并
  ㄲ: 'k', ㅋ: 'k',
  ㅅ: 't', ㅆ: 't', ㅈ: 't', ㅊ: 't', ㅌ: 't', ㅎ: 't',
  ㅍ: 'p',
};

// 完整音节合成（带收音）
const JONG_IDX: Record<string, number> = {
  '': 0, ㄱ: 1, ㄲ: 2, ㄴ: 4, ㄷ: 7, ㄹ: 8, ㅁ: 16, ㅂ: 17, ㅅ: 19, ㅆ: 20, ㅇ: 21,
  ㅈ: 22, ㅊ: 23, ㅋ: 24, ㅌ: 25, ㅍ: 26, ㅎ: 27,
};
export function composeSyllable(cho: string, jung: string, jong: string = ''): string {
  const c = CHO_IDX[cho], v = JUNG_IDX[jung], b = JONG_IDX[jong] ?? 0;
  if (c == null || v == null) return '';
  return String.fromCodePoint(0xAC00 + c * 588 + v * 28 + b);
}

export function romanizeSyllable(cho: string, jung: string, jong: string = ''): string {
  return (JAMO_ROMAN[cho] ?? '') + (JAMO_ROMAN[jung] ?? '') + (jong ? (JONG_ROMAN[jong] ?? '') : '');
}

/**
 * 给单个字母（辅音/元音/收音）找一个**真人录音 key**：
 * - 辅音：字母名（如 ㄱ → '기역' → c-01.mp3）
 * - 元音：ㅇ + jung（如 ㅗ → '오' → v-05.mp3）
 * - 收音：示范音节（如 ㄱ → '박' → b-01.mp3）
 * 这些 key 必须与 audioRegistry / phoneticsPlayer 的 DIRECT_URL 一致，否则会回落到 TTS。
 */
const CONSONANT_NAME_FOR_AUDIO: Record<string, string> = {
  ㄱ: '기역', ㄴ: '니은', ㄷ: '디귿', ㄹ: '리을', ㅁ: '미음',
  ㅂ: '비읍', ㅅ: '시옷', ㅈ: '지읒', ㅊ: '치읓',
  ㅋ: '키읔', ㅌ: '티읕', ㅍ: '피읖', ㅎ: '히읗', ㅇ: '이응',
  ㄲ: '쌍기역', ㄸ: '쌍디귿', ㅃ: '쌍비읍', ㅆ: '쌍시옷', ㅉ: '쌍지읒',
};
// 收音 7 类同音归并 → 真人录音示范字
const BATCHIM_DEMO_FOR_AUDIO: Record<string, string> = {
  ㄱ: '박', ㄲ: '박', ㅋ: '박',
  ㄴ: '산',
  ㄷ: '옷', ㅅ: '옷', ㅆ: '옷', ㅈ: '옷', ㅊ: '옷', ㅌ: '옷', ㅎ: '옷',
  ㄹ: '말',
  ㅁ: '밤',
  ㅂ: '밥', ㅍ: '밥',
  ㅇ: '강',
};
export function slotPlaySyllable(slot: 'cho' | 'jung' | 'jong', jamo: string): string {
  if (slot === 'cho') return CONSONANT_NAME_FOR_AUDIO[jamo] ?? composeSyllable(jamo, 'ㅏ');
  if (slot === 'jung') return composeSyllable('ㅇ', jamo);
  return BATCHIM_DEMO_FOR_AUDIO[jamo] ?? composeSyllable('ㅇ', 'ㅏ', jamo);
}

// ─────────── 音节拼读题（blend / challenge / practice 共用） ───────────

export type SyllableOption = { roman: string; jamo: string };

export type SyllableQuestion = {
  cho: string;
  jung: string;
  jong: string;
  syllable: string;
  targetJamo: string;
  correctRoman: string;
  options: SyllableOption[];
  choRoman: string;
  jungRoman: string;
  jongRoman: string;
  layout: 'horizontal' | 'vertical';
};

const SYLLABLE_BASIC_VOWELS = ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ'];
const HORIZONTAL_VOWELS = new Set(['ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ']);

function syllableShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 构建音节拼读题。
 * - stage 1/2：考元音（jung 是 target）
 * - stage 3：考辅音（cho 是 target，过滤 ㅇ）
 * - stage 4：考辅音（cho 是 target）
 * letters 是本 stage 的 letters；对于 practice 混合模式，传任意 stage 的 letters 都可。
 */
export function buildSyllableQuestion(stageId: number, letters: ProgressiveLetter[]): SyllableQuestion {
  let cho = 'ㅇ';
  let jung = 'ㅏ';
  let jong = '';
  let slot: 'jung' | 'cho' | 'jong' = 'jung';
  let targetJamo = '';

  if (stageId === 1 || stageId === 2) {
    const target = letters[Math.floor(Math.random() * letters.length)];
    jung = target.jamo;
    targetJamo = target.jamo;
    slot = 'jung';
    const consPool = BLEND_CONSONANTS.map((c) => c.jamo);
    cho = consPool[Math.floor(Math.random() * consPool.length)];
  } else if (stageId === 3) {
    const choPool = letters.filter((l) => l.jamo !== 'ㅇ');
    const target = choPool[Math.floor(Math.random() * choPool.length)];
    cho = target.jamo;
    targetJamo = target.jamo;
    slot = 'cho';
    jung = SYLLABLE_BASIC_VOWELS[Math.floor(Math.random() * SYLLABLE_BASIC_VOWELS.length)];
  } else if (stageId === 4) {
    const target = letters[Math.floor(Math.random() * letters.length)];
    cho = target.jamo;
    targetJamo = target.jamo;
    slot = 'cho';
    jung = SYLLABLE_BASIC_VOWELS[Math.floor(Math.random() * SYLLABLE_BASIC_VOWELS.length)];
  }

  const syllable = composeSyllable(cho, jung, jong);
  const correctRoman = romanizeSyllable(cho, jung, jong);
  const choRoman = JAMO_ROMAN[cho] ?? '';
  const jungRoman = JAMO_ROMAN[jung] ?? '';
  const jongRoman = jong ? (JONG_ROMAN[jong] ?? '') : '';
  const layout: 'horizontal' | 'vertical' = HORIZONTAL_VOWELS.has(jung) ? 'horizontal' : 'vertical';

  const targetJamoInSlot = slot === 'jung' ? jung : slot === 'cho' ? cho : jong;
  const targetGroup = homophoneKey(targetJamoInSlot);
  const usedGroups = new Set<string>([targetGroup]);

  const wrongRomanSet = new Set<string>([correctRoman]);
  const wrongs: SyllableOption[] = [];

  const replacePool = slot === 'jung'
    ? letters.map((l) => l.jamo).filter((j) => j !== jung)
    : slot === 'cho'
      ? letters.map((l) => l.jamo).filter((j) => j !== cho && j !== 'ㅇ')
      : letters.map((l) => l.jamo).filter((j) => j !== jong);

  for (const alt of syllableShuffle(replacePool)) {
    if (wrongs.length >= 3) break;
    // 排除与已用（含 target）同音的字母
    if (usedGroups.has(homophoneKey(alt))) continue;
    const altRoman = slot === 'jung'
      ? romanizeSyllable(cho, alt, jong)
      : slot === 'cho'
        ? romanizeSyllable(alt, jung, jong)
        : romanizeSyllable(cho, jung, alt);
    if (altRoman && !wrongRomanSet.has(altRoman)) {
      wrongRomanSet.add(altRoman);
      usedGroups.add(homophoneKey(alt));
      wrongs.push({ roman: altRoman, jamo: alt });
    }
  }
  if (wrongs.length < 3) {
    const fallback = slot === 'jung'
      ? ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅔ']
      : slot === 'cho'
        ? BLEND_CONSONANTS.map((c) => c.jamo)
        : ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅇ'];
    for (const alt of syllableShuffle(fallback)) {
      if (wrongs.length >= 3) break;
      if (alt === targetJamoInSlot) continue;
      if (usedGroups.has(homophoneKey(alt))) continue;
      const altRoman = slot === 'jung'
        ? romanizeSyllable(cho, alt, jong)
        : slot === 'cho'
          ? romanizeSyllable(alt, jung, jong)
          : romanizeSyllable(cho, jung, alt);
      if (altRoman && !wrongRomanSet.has(altRoman)) {
        wrongRomanSet.add(altRoman);
        usedGroups.add(homophoneKey(alt));
        wrongs.push({ roman: altRoman, jamo: alt });
      }
    }
  }

  return {
    cho, jung, jong, syllable, targetJamo, correctRoman,
    options: syllableShuffle([{ roman: correctRoman, jamo: targetJamo }, ...wrongs]),
    choRoman, jungRoman, jongRoman, layout,
  };
}

// 现代韩语同音字分组：纯听音无法区分，出题时同组字母不能同时出现
export const HOMOPHONE_GROUPS: Record<string, string> = {
  'ㅐ': 'ae', 'ㅔ': 'ae',
  'ㅒ': 'yae', 'ㅖ': 'yae',
  'ㅚ': 'we', 'ㅙ': 'we', 'ㅞ': 'we',
};

export function homophoneKey(jamo: string): string {
  return HOMOPHONE_GROUPS[jamo] || jamo;
}
