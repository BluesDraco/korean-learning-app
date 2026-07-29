export type FilterResult = { ok: true } | { ok: false; reason: string };

// 政治红线 — 涉中共相关全拒（普通政治如各国选举/政治学等不在此列，正常放行）
const POLITICAL_KEYWORDS = [
  '习近平', '江泽民', '胡锦涛', '毛泽东', '邓小平', '李克强', '王岐山',
  '赵紫阳', '刘晓波', '王丹', '零八宪章',
  '天安门事件', '六四事件', '六四', '天安门广场镇压',
  '文化大革命', '大跃进', '反右运动',
  '白纸运动', '白纸革命',
  '台湾独立', '台独', '西藏独立', '藏独', '新疆独立', '疆独', '东突',
  '香港独立', '港独', '反送中', '反送中运动', '雨伞革命', '占中',
  '达赖', '达赖喇嘛',
  '法轮功', '法轮大法', '真善忍',
  '中共倒台', '共产党倒台', '推翻政府', '推翻共产党', '中共',
];

// 极端色情 — 无歧义违法/伤害类，任何语境拒绝（普通色情/成人恋爱/性话题放行）
// 儿童性内容为绝对红线：未成年指示词 + 性指示词 组合，双保险
const CHILD_SEXUAL_COMBO = /(幼女|幼童|萝莉|未成年|小学生|初中生|小学|中学生|儿童|小孩|초등학생|중학생|미성년|아동)[\s\S]{0,6}(性|做爱|上床|裸|奸|口交|自慰|色情|援交|섹스|성관계|자위|포르노)/i;
const EXTREME_SEXUAL_PATTERNS: RegExp[] = [
  CHILD_SEXUAL_COMBO,
  /恋童|童奸|奸幼|儿童色情|幼交|萝莉控/i,
  /pedophil|child\s*porn|\bcsam\b|\bloli(ta|con)?\b/i,
  /强奸|轮奸|迷奸|强暴|性侵|迷姦/i,
  /강간|윤간|성폭행|성폭력|미성년.{0,4}성/i,
  /乱伦|근친/i,
  /兽交|人兽|人獸|獸交|수간/i,
  /rape|incest|bestialit|zoophil/i,
];

// 极端仇恨/暴力威胁 — 拒绝（日常脏话如 妈的/操/씨발 放行）
const EXTREME_HATE_PATTERNS: RegExp[] = [
  /支那|支那人|尼哥|黑鬼|死全家|灭你全家|灭全家/i,
  /杀了你|弄死你|捅死你|砍死你|烧死你/,
  /죽여\s*버|죽여\s*줄|죽여\s*버릴|칼로.{0,4}죽|씨발.{0,3}죽여/i,
  /gas\s*the|kill\s*all\s*(jew|black|muslim|gay)|genocide|nigger/i,
  /该死的?(犹太|黑|穆斯林|同性恋)人?|(犹太|黑|穆斯林|同性恋)人?去死/,
];

const AD_PATTERNS = [
  /1[3-9]\d{9}/,
  /(加|联系|QQ|qq|扣扣)\s*[：:]\s*\d{5,11}/i,
  /(微信|wx|wechat)\s*[：:]\s*[a-zA-Z0-9_-]{6,20}/i,
];

const PRIVACY_PATTERNS = [
  /[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]/,
];

const USERNAME_AD_PATTERN = /(免费|赚钱|加群|引流|代理|推广|招募|兼职|日赚|月入)/;
const USERNAME_PROFANITY = /(porn|sex|xxx|fuck|shit|bitch|nigger|asshole)/i;

function checkPolitical(text: string): FilterResult {
  for (const kw of POLITICAL_KEYWORDS) {
    if (text.includes(kw)) {
      return { ok: false, reason: '内容包含不支持的词汇' };
    }
  }
  return { ok: true };
}

function checkAdAndPrivacy(text: string): FilterResult {
  for (const re of AD_PATTERNS) {
    if (re.test(text)) return { ok: false, reason: '内容包含广告联系方式' };
  }
  for (const re of PRIVACY_PATTERNS) {
    if (re.test(text)) return { ok: false, reason: '内容包含隐私信息' };
  }
  return { ok: true };
}

// 极端内容 — 任何语境都拒绝（普通色情/日常脏话不在此列，正常放行）
function checkExtreme(text: string): FilterResult {
  for (const re of EXTREME_SEXUAL_PATTERNS) {
    if (re.test(text)) return { ok: false, reason: '内容包含违规信息，无法处理' };
  }
  for (const re of EXTREME_HATE_PATTERNS) {
    if (re.test(text)) return { ok: false, reason: '内容包含违规信息，无法处理' };
  }
  return { ok: true };
}

export function filterContent(
  text: string,
  context: 'username' | 'ai_input' | 'user_content',
): FilterResult {
  const political = checkPolitical(text);
  if (!political.ok) return political;

  const extreme = checkExtreme(text);
  if (!extreme.ok) return extreme;

  const adPrivacy = checkAdAndPrivacy(text);
  if (!adPrivacy.ok) return adPrivacy;

  if (context === 'username') {
    if (USERNAME_AD_PATTERN.test(text)) return { ok: false, reason: '用户名包含不支持的词汇' };
    if (USERNAME_PROFANITY.test(text)) return { ok: false, reason: '用户名包含不支持的词汇' };
  }

  return { ok: true };
}
