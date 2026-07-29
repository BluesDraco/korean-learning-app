// 会员定价页样式 —— 复用登录页/落地页「暖奶油悬浮卡」品牌视觉
// --au-* token 值与 auth.css / HomePage 完全一致，明暗靠 [data-theme="dark"] 覆盖
export const MEMBERSHIP_CSS = `
.mb-scope {
  --au-bg: oklch(97% 0.018 75);
  --au-aside-1: oklch(94% 0.045 70);
  --au-aside-2: oklch(90% 0.06 45);
  --au-surface: oklch(99.5% 0.006 75);
  --au-ink-1: oklch(28% 0.02 55);
  --au-ink-2: oklch(46% 0.02 55);
  --au-ink-3: oklch(60% 0.02 55);
  --au-line: oklch(88% 0.02 70);
  --au-pink: oklch(72% 0.14 8);
  --au-pink-deep: oklch(60% 0.16 10);
  --au-pink-soft: oklch(90% 0.06 10);
  --au-gold: oklch(76% 0.11 75);
  --au-gold-deep: oklch(58% 0.1 72);
  --au-purple: oklch(66% 0.13 305);
  --au-serif: 'Fraunces', 'Noto Serif SC', Georgia, serif;
  --elev-1: 0 1px 2px oklch(50% 0.05 40 / 0.06), 0 4px 12px oklch(50% 0.05 40 / 0.06);
  --elev-2: 0 2px 4px oklch(50% 0.06 40 / 0.07), 0 12px 30px oklch(50% 0.06 40 / 0.10);
  --elev-3: 0 4px 8px oklch(50% 0.07 40 / 0.08), 0 24px 56px oklch(50% 0.07 40 / 0.14);
  --sheen: inset 0 1px 0 oklch(100% 0 0 / 0.7);

  min-height: 100vh; min-height: 100dvh;
  color: var(--au-ink-1);
  font-family: 'Pretendard', 'Noto Sans SC', system-ui, sans-serif;
  background:
    radial-gradient(80% 60% at 8% 4%, var(--au-aside-1), transparent 55%),
    radial-gradient(70% 70% at 92% 96%, var(--au-aside-2), transparent 55%),
    var(--au-bg);
  -webkit-font-smoothing: antialiased;
  padding-bottom: 60px;
}
[data-theme="dark"] .mb-scope {
  --au-bg: oklch(20% 0.016 60);
  --au-aside-1: oklch(26% 0.03 40);
  --au-aside-2: oklch(22% 0.035 20);
  --au-surface: oklch(24% 0.016 60);
  --au-ink-1: oklch(94% 0.015 75);
  --au-ink-2: oklch(76% 0.02 75);
  --au-ink-3: oklch(62% 0.02 75);
  --au-line: oklch(34% 0.02 60);
  --au-pink: oklch(78% 0.13 10);
  --au-pink-deep: oklch(80% 0.13 12);
  --au-pink-soft: oklch(40% 0.08 10 / 0.35);
  --au-gold: oklch(80% 0.1 78);
  --au-gold-deep: oklch(82% 0.1 78);
  --sheen: inset 0 1px 0 oklch(100% 0 0 / 0.06);
}

/* ── 顶栏 ── */
.mb-topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: calc(20px + env(safe-area-inset-top, 0px)) clamp(20px, 5vw, 56px) 20px;
  max-width: 1200px; margin: 0 auto;
}
.mb-back {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 14px; color: var(--au-ink-2); text-decoration: none;
  padding: 8px 14px; border-radius: 999px; transition: background 0.2s;
}
.mb-back:hover { background: oklch(50% 0.05 40 / 0.06); }
.mb-brand { display: flex; align-items: baseline; gap: 8px; }
.mb-brand-en { font-family: var(--au-serif); font-weight: 700; font-size: 20px; color: var(--au-pink-deep); }
.mb-brand-kr { font-size: 13px; color: var(--au-ink-3); }

/* ── Hero ── */
.mb-hero {
  text-align: center; max-width: 720px;
  margin: clamp(16px, 3vw, 36px) auto clamp(28px, 4vw, 48px);
  padding: 0 24px;
}
.mb-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; letter-spacing: 0.02em;
  color: var(--au-pink-deep);
  background: var(--au-pink-soft);
  padding: 7px 16px; border-radius: 999px; margin-bottom: 18px;
}
.mb-h1 {
  font-family: var(--au-serif);
  font-size: clamp(28px, 4.4vw, 44px); font-weight: 700;
  line-height: 1.2; letter-spacing: -0.01em; color: var(--au-ink-1);
  margin: 0 0 14px;
}
.mb-tagline { font-size: clamp(14px, 1.6vw, 17px); line-height: 1.7; color: var(--au-ink-2); margin: 0 auto; max-width: 46ch; }
/* 内测感谢 · 限时截止横幅 */
.mb-promo-banner {
  display: inline-flex; align-items: center; gap: 8px; margin: 20px auto 0;
  padding: 9px 20px; border-radius: 999px;
  font-size: 13.5px; font-weight: 600; line-height: 1.5; text-align: left;
  color: var(--au-pink-deep);
  background: linear-gradient(135deg, var(--au-pink-soft), oklch(94% 0.06 75 / 0.7));
  border: 1px solid oklch(80% 0.1 20 / 0.35);
  box-shadow: var(--elev-1);
}
.mb-promo-banner svg { flex-shrink: 0; color: var(--au-pink-deep); }
.mb-loading { text-align: center; padding: 80px 0; color: var(--au-ink-3); }

/* ── 定价卡 ── */
.mb-cards {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 22px; max-width: 1320px; margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 56px); align-items: start;
}
.mb-card {
  position: relative;
  background: var(--au-surface);
  border: 1px solid var(--au-line);
  border-radius: 26px;
  padding: 34px 28px;
  box-shadow: var(--elev-1), var(--sheen);
  transition: transform 0.24s cubic-bezier(0.25,1,0.5,1), box-shadow 0.24s;
}
.mb-card:hover { transform: translateY(-4px); box-shadow: var(--elev-2), var(--sheen); }
.mb-card.is-rec {
  transform: translateY(-6px) scale(1.015);
}
.mb-card.is-rec:hover { transform: translateY(-10px) scale(1.015); }
/* 年度=金色强调（最受欢迎），与年度金按钮对应 */
.mb-card.tier-yearly.is-rec {
  border-color: var(--au-gold);
  box-shadow: var(--elev-3), var(--sheen), 0 0 0 1px var(--au-gold);
}
/* 永久=紫色强调（最超值），与永久紫按钮对应 */
.mb-card.tier-lifetime.is-rec {
  border-color: var(--au-purple);
  box-shadow: var(--elev-3), var(--sheen), 0 0 0 1px var(--au-purple);
}
.mb-rec-badge {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  color: #fff; font-size: 13px; font-weight: 700;
  padding: 6px 18px; border-radius: 999px; white-space: nowrap;
}
.mb-card.tier-yearly .mb-rec-badge {
  background: linear-gradient(150deg, #f0c060, #d99a3a);
  box-shadow: 0 4px 12px oklch(72% 0.12 75 / 0.4);
}
.mb-card.tier-lifetime .mb-rec-badge {
  background: linear-gradient(150deg, #c3a6f0, #a97fe0);
  box-shadow: 0 4px 12px oklch(66% 0.13 305 / 0.4);
}
.mb-card-head { margin-bottom: 20px; }
.mb-card-name { font-family: var(--au-serif); font-size: 28px; font-weight: 700; color: var(--au-ink-1); margin: 0 0 5px; }
.mb-card.tier-monthly .mb-card-name { color: var(--au-pink-deep); }
.mb-card.tier-yearly .mb-card-name { color: var(--au-gold); }
.mb-card.tier-lifetime .mb-card-name { color: var(--au-purple); }
.mb-card-tag { font-size: 13.5px; color: var(--au-ink-3); margin: 0; }
.mb-price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 6px; }
.mb-price-big { flex-shrink: 0; white-space: nowrap; font-family: var(--au-serif); font-size: 44px; font-weight: 700; color: var(--au-ink-1); }
.mb-price-unit { font-size: 14px; color: var(--au-ink-3); }
/* 价格附注区（划线原价 + 省钱标 + 折算），给个 min-height 让四卡 CTA 对齐 */
.mb-price-meta { min-height: 46px; margin-bottom: 16px; display: flex; flex-direction: column; gap: 5px; align-items: flex-start; }
.mb-price-line { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.mb-price-origin { font-size: 13.5px; color: var(--au-ink-3); }
.mb-price-was { font-size: 13px; color: var(--au-ink-3); text-decoration: line-through; text-decoration-color: oklch(60% 0.02 55 / 0.5); }
/* 折扣红牌：电商大促感，白字实心红底 */
.mb-price-off {
  display: inline-flex; align-items: center; font-size: 13px; font-weight: 800; letter-spacing: 0.01em;
  color: #fff; background: linear-gradient(150deg, #ff5a6e, #e8384f);
  padding: 3px 10px; border-radius: 8px;
  box-shadow: 0 3px 9px oklch(58% 0.2 20 / 0.32);
}
/* 永久档「限时创始价」红牌：单独占一行，不与价格数字挤同一行（否则 ¥298 被压换行） */
.mb-price-badge-row { display: flex; margin: -2px 0 6px; }
/* 永久档「8.31后¥348」涨价预告：比普通划线醒目，深色+价格标红，不划线 */
.mb-price-future { font-size: 13px; font-weight: 700; color: var(--au-ink-2); }
.mb-price-future b { color: #e8384f; }
.mb-price-equiv { font-size: 13.5px; font-weight: 600; color: var(--au-ink-2); }
/* 永久档单月折算：主打行，加粗提级，b 标签用紫色强调数字 */
.mb-price-equiv-strong { font-size: 14px; color: var(--au-ink-1); line-height: 1.5; }
.mb-price-equiv-strong b { color: var(--au-purple); font-weight: 800; }
/* 永久档额外赠品行：加深到清晰可读的重点信息，金额用金色点出（但不盖过单月折算主行） */
.mb-price-net { font-size: 13px; color: var(--au-ink-2); font-weight: 600; line-height: 1.5; }
.mb-price-net b { color: var(--au-gold-deep); font-weight: 800; }
.mb-price-net b { color: var(--au-purple); font-weight: 700; }

.mb-cta {
  width: 100%; padding: 15px; border: none; border-radius: 999px;
  font-size: 15.5px; font-weight: 700; cursor: pointer;
  background: oklch(50% 0.05 40 / 0.07); color: var(--au-ink-1);
  transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
  margin-bottom: 22px;
}
.mb-cta:hover { transform: translateY(-1px); }
.mb-cta:disabled { cursor: default; transform: none; opacity: 0.55; box-shadow: none; }
.mb-cta:disabled:hover { transform: none; }

/* 当前方案角标（覆盖 rec-badge 定位）+ 卡片高亮 */
.mb-badge-current { background: var(--au-ink-1); color: var(--au-surface); box-shadow: 0 4px 12px oklch(30% 0.02 55 / 0.28); }
.mb-card.is-current { box-shadow: var(--elev-2), var(--sheen), 0 0 0 2px var(--au-ink-1); }
/* 已拥有更高档：整卡降饱和，示意不可购买 */
.mb-card.is-owned { opacity: 0.68; }

/* 顶部提示条（点击已拥有/checkout 失败时显示原因） */
.mb-notice {
  max-width: 720px; margin: 0 auto 24px; padding: 12px 16px;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  background: var(--au-pink-soft); border: 1px solid var(--au-pink);
  border-radius: 14px; color: var(--au-ink-1); font-size: 14px; font-weight: 600;
}
.mb-notice button { background: none; border: none; color: var(--au-ink-3); cursor: pointer; padding: 2px; display: inline-flex; flex-shrink: 0; }
.mb-card.tier-monthly .mb-cta { background: linear-gradient(150deg, #ff9dbb, #ff7fa8); color: #fff; box-shadow: 0 6px 16px oklch(70% 0.14 10 / 0.32); }
.mb-card.tier-yearly .mb-cta { background: linear-gradient(150deg, #f0c060, #d99a3a); color: #fff; box-shadow: 0 6px 16px oklch(72% 0.12 75 / 0.34); }
.mb-card.tier-lifetime .mb-cta { background: linear-gradient(150deg, #c3a6f0, #a97fe0); color: #fff; box-shadow: 0 6px 16px oklch(66% 0.13 305 / 0.32); }

.mb-hl-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
.mb-hl-list li { display: flex; align-items: flex-start; gap: 9px; font-size: 14px; line-height: 1.55; color: var(--au-ink-2); }
.mb-hl-check { flex-shrink: 0; margin-top: 2px; color: var(--au-pink); }
.mb-card.tier-yearly .mb-hl-check { color: var(--au-gold); }
.mb-card.tier-lifetime .mb-hl-check { color: var(--au-purple); }

/* ── 信任条（压购买焦虑）── */
.mb-trust {
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
  gap: clamp(18px, 3vw, 40px); max-width: 1320px;
  margin: clamp(28px, 4vw, 44px) auto 0; padding: 0 clamp(20px, 5vw, 56px);
}
.mb-trust-item { display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; color: var(--au-ink-2); }
.mb-trust-item svg { color: var(--au-pink); flex-shrink: 0; }

/* ── 邀请有礼 · 票据式 banner（免费得会员的替代路径）── */
.mb-invite {
  max-width: 1320px; margin: clamp(40px, 5vw, 68px) auto 0;
  padding: 0 clamp(20px, 5vw, 56px);
}
.mb-invite-ticket {
  position: relative; isolation: isolate; overflow: hidden;
  display: grid; grid-template-columns: auto 1fr auto; align-items: center;
  gap: clamp(18px, 3vw, 34px);
  padding: clamp(22px, 3vw, 30px) clamp(24px, 4vw, 40px);
  border-radius: 24px; border: 1px solid var(--au-line);
  background:
    radial-gradient(120% 140% at 0% 0%, oklch(90% 0.06 10 / 0.6), transparent 46%),
    radial-gradient(120% 160% at 100% 100%, oklch(80% 0.11 75 / 0.42), transparent 50%),
    var(--au-surface);
  box-shadow: var(--elev-2), var(--sheen);
}
/* 票根：右侧一道虚线 + 两个半圆缺口，做出"撕票"质感 */
.mb-invite-ticket::before {
  content: ''; position: absolute; top: 12px; bottom: 12px; right: clamp(128px, 15vw, 190px);
  border-right: 2px dashed oklch(60% 0.06 40 / 0.35); z-index: 0;
}
.mb-invite-fig {
  position: relative; z-index: 1;
  width: clamp(56px, 8vw, 76px); height: clamp(56px, 8vw, 76px);
  border-radius: 50%; flex-shrink: 0;
  background: radial-gradient(circle at 35% 30%, oklch(99% 0.02 75), oklch(92% 0.05 30));
  box-shadow: inset 0 0 0 1px oklch(100% 0 0 / 0.6), var(--elev-1);
  display: grid; place-items: center;
}
.mb-invite-fig img { object-fit: contain; }
.mb-invite-body { position: relative; z-index: 1; min-width: 0; }
.mb-invite-kicker {
  display: inline-block; font-size: 11.5px; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--au-gold-deep); margin-bottom: 7px;
}
.mb-invite-h {
  font-family: var(--au-serif); font-size: clamp(19px, 2.4vw, 25px); font-weight: 700;
  line-height: 1.25; color: var(--au-ink-1); margin: 0 0 6px;
}
.mb-invite-sub { font-size: clamp(13px, 1.5vw, 14.5px); line-height: 1.55; color: var(--au-ink-2); margin: 0; }
.mb-invite-sub b { color: var(--au-pink-deep); font-weight: 700; }
.mb-invite-cta {
  position: relative; z-index: 1; white-space: nowrap; flex-shrink: 0;
  display: inline-flex; align-items: center; gap: 7px;
  padding: 13px 26px; border-radius: 999px; border: none; cursor: pointer;
  font-size: 15px; font-weight: 700; color: #fff; text-decoration: none;
  background: linear-gradient(150deg, #ff9dbb, #ff7fa8);
  box-shadow: 0 6px 16px oklch(70% 0.14 10 / 0.32);
  transition: transform 0.18s var(--ease, cubic-bezier(0.25,1,0.5,1)), box-shadow 0.18s;
}
.mb-invite-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 22px oklch(70% 0.14 10 / 0.4); }
.mb-invite-cta svg { transition: transform 0.2s cubic-bezier(0.25,1,0.5,1); }
.mb-invite-cta:hover svg { transform: translateX(3px); }
@media (max-width: 640px) {
  .mb-invite-ticket { grid-template-columns: auto 1fr; row-gap: 18px; }
  .mb-invite-ticket::before { display: none; }
  .mb-invite-cta { grid-column: 1 / -1; justify-content: center; }
}

/* ── 永久档尊享礼盒（金调，塑造超值感）── */
.mb-gift { max-width: 1320px; margin: clamp(44px, 6vw, 76px) auto 0; padding: 0 clamp(20px, 5vw, 56px); }
.mb-gift-head { text-align: center; margin: 0 0 26px; }
.mb-gift-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--au-gold-deep); margin: 0 0 9px;
}
.mb-gift-eyebrow svg { color: var(--au-gold-deep); }
.mb-gift-title { font-family: var(--au-serif); font-size: clamp(22px, 3vw, 32px); font-weight: 700; color: var(--au-ink-1); margin: 0; }
.mb-gift-sub { font-size: clamp(13px, 1.5vw, 14.5px); line-height: 1.6; color: var(--au-ink-2); margin: 10px auto 0; max-width: 620px; }
.mb-gift-box {
  position: relative; overflow: hidden;
  border-radius: 24px; border: 1px solid oklch(80% 0.08 75 / 0.5);
  background:
    radial-gradient(120% 150% at 100% 0%, oklch(84% 0.1 78 / 0.4), transparent 48%),
    radial-gradient(110% 140% at 0% 100%, oklch(90% 0.06 60 / 0.4), transparent 50%),
    var(--au-surface);
  box-shadow: var(--elev-2), var(--sheen);
  padding: clamp(20px, 3vw, 30px) clamp(20px, 3.5vw, 38px);
}
.mb-gift-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.mb-gift-item {
  display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px;
  padding: 13px 6px; border-bottom: 1px dashed oklch(70% 0.05 60 / 0.28);
}
.mb-gift-item:last-child { border-bottom: none; }
.mb-gift-emoji {
  width: 44px; height: 44px; flex-shrink: 0; border-radius: 13px;
  display: grid; place-items: center; font-size: 24px;
  background: oklch(94% 0.04 75); box-shadow: inset 0 0 0 1px oklch(100% 0 0 / 0.5);
}
.mb-gift-info { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.mb-gift-name { font-size: 15.5px; font-weight: 700; color: var(--au-ink-1); }
.mb-gift-desc { font-size: 12.5px; line-height: 1.5; color: var(--au-ink-3); }
.mb-gift-tick { flex-shrink: 0; color: var(--au-gold-deep); }
.mb-gift-foot {
  margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--au-line);
  display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 16px;
}
.mb-gift-value { display: flex; flex-direction: column; gap: 3px; }
.mb-gift-value-label { font-size: 12.5px; color: var(--au-ink-3); }
.mb-gift-value-num {
  font-family: var(--au-serif); font-size: clamp(28px, 4vw, 38px); font-weight: 700;
  color: var(--au-gold-deep); line-height: 1; letter-spacing: 0.01em;
}
.mb-gift-value-note { font-size: 12.5px; color: var(--au-ink-2); margin-top: 4px; }
.mb-gift-ship {
  display: inline-flex; align-items: center; gap: 7px; margin: 0;
  font-size: 13px; font-weight: 600; color: var(--au-ink-2);
  padding: 9px 15px; border-radius: 12px;
  background: oklch(94% 0.03 145 / 0.7); border: 1px solid oklch(80% 0.06 145 / 0.4);
}
.mb-gift-ship svg { color: var(--au-gold-deep); flex-shrink: 0; }
@media (max-width: 560px) {
  .mb-gift-item { grid-template-columns: auto 1fr; row-gap: 8px; }
  .mb-gift-val { grid-column: 2; justify-self: start; }
  .mb-gift-foot { flex-direction: column; align-items: stretch; }
}

/* ── 对比表（桌面主角）── */
.mb-compare { max-width: 1320px; margin: clamp(52px, 7vw, 92px) auto 0; padding: 0 clamp(20px, 5vw, 56px); }
.mb-compare-head { text-align: center; margin: 0 0 32px; }
.mb-compare-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--au-pink-deep); margin: 0 0 8px; }
.mb-compare-title { font-family: var(--au-serif); font-size: clamp(24px, 3.2vw, 34px); font-weight: 700; color: var(--au-ink-1); margin: 0; }
.mb-compare-sub { font-size: 14px; color: var(--au-ink-2); margin: 10px 0 0; }
.mb-table-wrap {
  position: relative;
  background: var(--au-surface); border: 1px solid var(--au-line);
  border-radius: 22px; overflow: hidden; box-shadow: var(--elev-2), var(--sheen);
}
.mb-table { width: 100%; border-collapse: collapse; font-size: 14.5px; table-layout: fixed; }
.mb-table col.mb-col-name { width: 30%; }
/* 高亮列竖带：年度金、永久紫，两列拉开区分度 */
.mb-table col.mb-col-yearly { background: linear-gradient(180deg, oklch(80% 0.11 75 / 0.16), oklch(80% 0.11 75 / 0.05)); }
.mb-table col.mb-col-lifetime { background: linear-gradient(180deg, oklch(70% 0.13 305 / 0.14), oklch(70% 0.13 305 / 0.05)); }
.mb-table thead th {
  padding: 22px 14px 20px; text-align: center; vertical-align: bottom;
  border-bottom: 2px solid var(--au-line);
}
.mb-th-tier-name { display: block; font-family: var(--au-serif); font-size: 17px; font-weight: 700; color: var(--au-ink-1); }
.mb-th-tier-price { display: block; font-size: 12.5px; font-weight: 600; color: var(--au-ink-3); margin-top: 4px; }
.mb-table thead th.mb-th-name { text-align: left; padding-left: 24px; vertical-align: bottom; }
.mb-table thead th.mb-th-name .mb-th-tier-name { font-family: 'Pretendard','Noto Sans SC',sans-serif; font-size: 13px; font-weight: 600; color: var(--au-ink-3); }
.mb-table thead th.tier-monthly .mb-th-tier-name { color: var(--au-pink-deep); }
.mb-table thead th.tier-yearly .mb-th-tier-name { color: var(--au-gold); }
.mb-table thead th.tier-lifetime .mb-th-tier-name { color: var(--au-purple); }
.mb-th-star {
  display: inline-block; font-size: 10.5px; font-weight: 700; letter-spacing: 0.04em;
  color: #fff; padding: 2px 9px; border-radius: 999px; margin-bottom: 8px;
}
.mb-table thead th.tier-yearly .mb-th-star {
  background: linear-gradient(150deg, #f0c060, #d99a3a);
  box-shadow: 0 2px 6px oklch(72% 0.12 75 / 0.4);
}
.mb-table thead th.tier-lifetime .mb-th-star {
  background: linear-gradient(150deg, #c3a6f0, #a97fe0);
  box-shadow: 0 2px 6px oklch(66% 0.13 305 / 0.4);
}
.mb-group-row td {
  padding: 13px 24px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--au-pink-deep); background: var(--au-pink-soft);
}
.mb-body-row { border-bottom: 1px solid var(--au-line); }
.mb-body-row:last-child { border-bottom: none; }
.mb-body-row:hover { background: oklch(50% 0.04 60 / 0.03); }
.mb-td-name { padding: 15px 24px; color: var(--au-ink-2); text-align: left; font-weight: 500; }
.mb-td-val { padding: 15px 14px; text-align: center; }
.mb-td-val.tier-yearly { position: relative; }
.mb-cell-yes { color: var(--au-pink); display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; }
.mb-cell-no { color: var(--au-ink-3); opacity: 0.4; font-size: 16px; display: inline-flex; align-items: center; justify-content: center; line-height: 1; }
.mb-cell-text { font-size: 13.5px; font-weight: 600; color: var(--au-ink-1); line-height: 1.4; }
.mb-cell-num { font-size: 16px; font-weight: 700; color: var(--au-ink-1); }
.mb-cell-unit { font-size: 11px; font-weight: 400; color: var(--au-ink-3); margin-left: 1px; }
.mb-cell-inf { display: inline-flex; align-items: center; gap: 3px; font-size: 13.5px; font-weight: 700; color: var(--au-purple); }


.mb-faq { max-width: 1320px; margin: clamp(48px, 6vw, 80px) auto 0; padding: 0 clamp(20px, 5vw, 56px); }
.mb-faq-head { text-align: center; margin: 0 0 28px; }
.mb-faq-title { font-family: var(--au-serif); font-size: clamp(20px, 2.8vw, 28px); font-weight: 700; color: var(--au-ink-1); margin: 0; }
.mb-faq-list { margin: 0; display: flex; flex-direction: column; gap: 0; }
.mb-faq-item { padding: 18px 0; border-bottom: 1px solid var(--au-line); }
.mb-faq-item:first-child { border-top: 1px solid var(--au-line); }
.mb-faq-q { font-size: 15px; font-weight: 700; color: var(--au-ink-1); margin: 0 0 8px; }
.mb-faq-a { font-size: 14px; line-height: 1.75; color: var(--au-ink-2); margin: 0; }
.mb-faq-a b { color: var(--au-pink-deep); font-weight: 700; }
.mb-faq-a em { font-style: normal; color: var(--au-ink-1); font-weight: 600; }

/* ── 底部 ── */
.mb-foot { text-align: center; margin: clamp(40px, 6vw, 64px) auto 0; padding: 0 24px; }
.mb-foot p { font-size: 15px; color: var(--au-ink-2); margin: 0 0 10px; }
.mb-foot-wechat { font-size: 15px; color: var(--au-ink-2); }
.mb-foot-wechat strong {
  font-family: var(--au-serif); font-size: 18px; font-weight: 700;
  color: var(--au-gold-deep); letter-spacing: 0.02em; margin-left: 4px;
}

/* ── 响应式 ── */
@media (max-width: 900px) {
  .mb-cards { grid-template-columns: 1fr 1fr; gap: 14px; }
  .mb-card.is-rec { transform: none; }
  .mb-card.is-rec:hover { transform: translateY(-4px); }
}
.mb-table-hint { display: none; }
@media (max-width: 640px) {
  .mb-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .mb-table { min-width: 560px; font-size: 13.5px; }
  .mb-table-hint {
    display: block; text-align: right; font-size: 12.5px; font-weight: 600;
    color: var(--au-pink-deep); margin: 0 4px 8px 0;
  }
}
@media (max-width: 560px) {
  .mb-cards { grid-template-columns: 1fr; }
  .mb-price-big { font-size: 34px; }
  .mb-td-name, .mb-table thead th.mb-th-name { padding-left: 16px; }
  .mb-td-val { padding: 12px 8px; }
}

/* 会员中心暂停开放弹窗 */
.mb-paused-overlay {
  min-height: 100dvh;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}
.mb-paused-card {
  width: 100%; max-width: 360px;
  background: var(--au-surface);
  border: 1px solid var(--au-line);
  border-radius: 24px;
  padding: 36px 28px 30px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(60,40,30,0.04), 0 12px 28px -10px rgba(190,120,90,0.18), 0 30px 60px -24px rgba(160,90,70,0.2);
}
.mb-paused-emoji { font-size: 52px; line-height: 1; display: block; margin-bottom: 16px; }
.mb-paused-title {
  font-size: 21px; font-weight: 800; color: var(--au-ink-1);
  margin: 0 0 10px;
}
.mb-paused-desc {
  font-size: 14.5px; line-height: 1.7; color: var(--au-ink-2);
  margin: 0 0 24px;
}
.mb-paused-cta {
  width: 100%; padding: 14px 0;
  border: none; border-radius: 999px; cursor: pointer;
  font-size: 15px; font-weight: 700; color: #fff;
  background: linear-gradient(150deg, var(--au-pink), var(--au-pink-deep));
  box-shadow: 0 6px 18px -4px rgba(190,90,110,0.4);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.mb-paused-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 24px -6px rgba(190,90,110,0.48); }
`;
