/**
 * 韩语助词剥离工具
 *
 * 韩语写作里，名词后常附助词（particle/조사），如：
 *   학교에 (학교 + 에)、용기를 (용기 + 를)、한국에서 (한국 + 에서)
 *
 * 收藏单词时不应把整段 surface 入库，应剥成原型。
 *
 * 覆盖最常见 ~15 个助词，按"先长后短"原则匹配避免误剥。
 * 不能处理动词/形容词变形（예요/이에요/했어요 等），这些需要 AI 形态分析。
 */

// 按字面长度 desc 排序，避免「에서」被先匹配成「에」
const PARTICLES = [
  // 双字符
  '에서', '에게', '한테', '으로', '까지', '부터', '마저', '에다', '에서는', '에서도', '에게서',
  // 单字符
  '을', '를', '이', '가', '은', '는', '에', '와', '과', '도', '만', '로', '의', '도', '랑', '며',
] as const;

// 三字符以上的长助词
const LONG_PARTICLES = ['에서는', '에서도', '에게서'] as const;

/**
 * 去掉名词末尾的助词，返回估计的原型。
 *
 * - 输入「한국에」→「한국」
 * - 输入「용기를」→「용기」
 * - 输入「학교에서」→「학교」
 * - 输入「학교」→「학교」（无助词，原样返回）
 * - 输入「예요」「했어요」等动词/形容词变形 → 不处理，原样返回
 *
 * 注意：保守剥离，**只剥末尾**，不处理多重助词嵌套。
 * 剥离后若结果过短（≤1 字且不含完整音节），返回原值（防误剥成 jamo）。
 */
export function stripParticle(word: string): string {
  if (!word) return word;
  const trimmed = word.trim();
  if (trimmed.length < 2) return trimmed;

  // 长助词优先
  for (const p of LONG_PARTICLES) {
    if (trimmed.endsWith(p) && trimmed.length > p.length + 1) {
      return trimmed.slice(0, -p.length);
    }
  }

  // 双字符
  const double = ['에서', '에게', '한테', '으로', '까지', '부터', '마저', '에다'];
  for (const p of double) {
    if (trimmed.endsWith(p) && trimmed.length > p.length + 1) {
      return trimmed.slice(0, -p.length);
    }
  }

  // 单字符
  const single = ['을', '를', '이', '가', '은', '는', '에', '와', '과', '도', '만', '로', '의', '랑', '며'];
  const last = trimmed.slice(-1);
  if (single.includes(last) && trimmed.length >= 2) {
    const stem = trimmed.slice(0, -1);
    // 剥后必须是完整韩文音节（가-힯），防止剥出 jamo 或英文字符
    if (/^[가-힯]+$/.test(stem)) return stem;
  }

  return trimmed;
}

/**
 * 判断词是否疑似纯助词或助词为主（用于写入前过滤）
 * 例：'에' '를' 这种单助词作为 word 是脏数据
 */
export function isLikelyParticleOnly(word: string): boolean {
  if (!word) return true;
  const t = word.trim();
  if (t.length === 0) return true;
  const allParticles = [...LONG_PARTICLES, ...PARTICLES];
  return allParticles.includes(t as any);
}
