export type FilterResult = { ok: true } | { ok: false; reason: string };

// Political keywords — global red line, blocked in all contexts
const POLITICAL_KEYWORDS = [
  '习近平', '江泽民', '胡锦涛', '毛泽东', '邓小平', '李克强', '王岐山',
  '天安门事件', '六四事件', '六四', '天安门广场镇压',
  '文化大革命', '大跃进', '反右运动',
  '台湾独立', '台独', '西藏独立', '藏独', '新疆独立', '疆独', '东突',
  '法轮功', '法轮大法', '真善忍',
  '中共倒台', '共产党倒台', '推翻政府', '推翻共产党', '中共',
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

export function filterContent(
  text: string,
  context: 'username' | 'ai_input' | 'user_content',
): FilterResult {
  const political = checkPolitical(text);
  if (!political.ok) return political;

  const adPrivacy = checkAdAndPrivacy(text);
  if (!adPrivacy.ok) return adPrivacy;

  if (context === 'username') {
    if (USERNAME_AD_PATTERN.test(text)) return { ok: false, reason: '用户名包含不支持的词汇' };
    if (USERNAME_PROFANITY.test(text)) return { ok: false, reason: '用户名包含不支持的词汇' };
  }

  return { ok: true };
}
