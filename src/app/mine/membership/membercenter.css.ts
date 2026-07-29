// 会员中心样式 —— 复用定价页/登录页「暖奶油悬浮卡」品牌视觉
// --au-* token 值与 membership.css.ts / auth.css 一致，明暗靠 [data-theme="dark"] 覆盖
export const MEMBER_CENTER_CSS = `
.mc-scope {
  --au-bg: oklch(97% 0.018 75);
  --au-aside-1: oklch(94% 0.045 70);
  --au-aside-2: oklch(90% 0.06 45);
  --au-surface: oklch(99.5% 0.006 75);
  --au-surface-2: oklch(98% 0.012 72);
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
  --au-mint: oklch(70% 0.09 165);
  --au-mint-soft: oklch(93% 0.05 165);
  --au-serif: 'Fraunces', 'Noto Serif SC', Georgia, serif;
  --elev-1: 0 1px 2px oklch(50% 0.05 40 / 0.06), 0 4px 12px oklch(50% 0.05 40 / 0.06);
  --elev-2: 0 2px 4px oklch(50% 0.06 40 / 0.07), 0 12px 30px oklch(50% 0.06 40 / 0.10);
  --sheen: inset 0 1px 0 oklch(100% 0 0 / 0.7);

  color: var(--au-ink-1);
  font-family: 'Pretendard', 'Noto Sans SC', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
[data-theme="dark"] .mc-scope {
  --au-bg: oklch(20% 0.016 60);
  --au-aside-1: oklch(26% 0.03 40);
  --au-aside-2: oklch(22% 0.035 20);
  --au-surface: oklch(24% 0.016 60);
  --au-surface-2: oklch(27% 0.018 60);
  --au-ink-1: oklch(94% 0.015 75);
  --au-ink-2: oklch(76% 0.02 75);
  --au-ink-3: oklch(62% 0.02 75);
  --au-line: oklch(34% 0.02 60);
  --au-pink: oklch(78% 0.13 10);
  --au-pink-deep: oklch(80% 0.13 12);
  --au-pink-soft: oklch(40% 0.08 10 / 0.35);
  --au-gold: oklch(80% 0.1 78);
  --au-gold-deep: oklch(82% 0.1 78);
  --au-mint: oklch(78% 0.08 165);
  --au-mint-soft: oklch(38% 0.06 165 / 0.4);
  --sheen: inset 0 1px 0 oklch(100% 0 0 / 0.06);
}

/* ── 暖奶油舞台（把内页内容包成一块品牌化画布）── */
.mc-stage {
  position: relative;
  border-radius: 28px;
  border: 1px solid var(--au-line);
  padding: clamp(22px, 3.4vw, 40px);
  background:
    radial-gradient(72% 60% at 6% 0%, var(--au-aside-1), transparent 58%),
    radial-gradient(64% 66% at 96% 100%, var(--au-aside-2), transparent 58%),
    var(--au-bg);
  box-shadow: var(--elev-1), var(--sheen);
  overflow: hidden;
}

/* ── 顶部标题 ── */
.mc-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--au-pink-deep); margin: 0 0 8px;
}
.mc-title { font-family: var(--au-serif); font-size: clamp(24px, 3vw, 32px); font-weight: 700; letter-spacing: -0.01em; color: var(--au-ink-1); margin: 0 0 20px; }

/* ── 状态提示条（成功 / 到期）── */
.mc-alert {
  display: flex; align-items: center; gap: 11px;
  padding: 14px 18px; border-radius: 16px; margin-bottom: 18px;
  box-shadow: var(--elev-1), var(--sheen);
}
.mc-alert-icon { flex-shrink: 0; }
.mc-alert-title { margin: 0; font-size: 14.5px; font-weight: 700; color: var(--au-ink-1); }
.mc-alert-sub { margin: 2px 0 0; font-size: 12.5px; color: var(--au-ink-2); }
.mc-alert.ok  { background: var(--au-mint-soft); border: 1px solid var(--au-mint); }
.mc-alert.ok  .mc-alert-icon { color: var(--au-mint); }
.mc-alert.warn { background: var(--au-pink-soft); border: 1px solid var(--au-pink); }
.mc-alert.warn .mc-alert-icon { color: var(--au-pink-deep); }
.mc-alert-cta {
  flex-shrink: 0; margin-left: auto; padding: 8px 16px; border: none; border-radius: 999px;
  background: linear-gradient(150deg, #ff9dbb, #ff7fa8); color: #fff;
  font-size: 13px; font-weight: 700; cursor: pointer;
  box-shadow: 0 4px 12px oklch(70% 0.14 10 / 0.3);
  transition: transform 0.18s var(--ease, cubic-bezier(0.25,1,0.5,1));
}
.mc-alert-cta:hover { transform: translateY(-1px); }

/* ── 主网格：左会员卡 + 右操作 ── */
.mc-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; align-items: start; }
@media (max-width: 860px) { .mc-grid { grid-template-columns: 1fr; gap: 16px; } }

/* ── 会员卡（membership pass）── */
/* flex column + min-height：内容顶部成组、meta 沉底，中间呼吸区由放大的皇冠水印填充 */
.mc-pass {
  position: relative; overflow: hidden;
  border-radius: 24px; padding: clamp(24px, 2.6vw, 34px);
  box-shadow: var(--elev-2), var(--sheen);
  color: #fff;
  display: flex; flex-direction: column;
  min-height: 236px;
}
/* 付费档：对角主渐变 + 左上高光 + 收尾深色，让纯色底有光泽和纵深 */
.mc-pass.monthly {
  background:
    radial-gradient(82% 120% at 84% -14%, oklch(100% 0 0 / 0.32), transparent 52%),
    linear-gradient(148deg, #ffa6c1, #ff6f9e 60%, #f0568a);
}
.mc-pass.yearly {
  background:
    radial-gradient(82% 120% at 84% -14%, oklch(100% 0 0 / 0.34), transparent 52%),
    linear-gradient(148deg, #f6cd7d, #dc9a34 58%, #c8871f);
}
.mc-pass.lifetime {
  background:
    radial-gradient(82% 120% at 84% -14%, oklch(100% 0 0 / 0.32), transparent 52%),
    linear-gradient(148deg, #d3b8f7, #9a6fe0 56%, #8250d4);
}
.mc-pass.free {
  color: var(--au-ink-1);
  background:
    radial-gradient(120% 140% at 100% 0%, oklch(90% 0.055 20 / 0.55), transparent 60%),
    var(--au-surface);
  border: 1px solid var(--au-line);
}
[data-theme="dark"] .mc-pass.free {
  background:
    radial-gradient(120% 140% at 100% 0%, oklch(52% 0.08 20 / 0.5), transparent 60%),
    var(--au-surface-2);
}
.mc-pass.free .mc-pass-kicker { color: var(--au-pink-deep); opacity: 1; }

/* 皇冠水印：放大、右侧垂直居中，作为右半区视觉锚填补横向空白（覆盖 svg 固定尺寸） */
.mc-pass-watermark {
  position: absolute; right: clamp(-30px, -0.5vw, -14px); top: 50%;
  width: clamp(160px, 17vw, 214px); height: auto;
  transform: translateY(-50%) rotate(-8deg);
  opacity: 0.17; pointer-events: none;
}
.mc-pass.free .mc-pass-watermark { opacity: 0.11; }

/* 字体明度层次：kicker 半透明小字 → name 衬线特大纯白（最亮）→ 要点略透明 → meta 证章 */
.mc-pass-head { position: relative; z-index: 1; }
.mc-pass-kicker { font-size: 12.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.72; margin: 0; }
.mc-pass-name { font-family: var(--au-serif); font-size: clamp(31px, 3.3vw, 40px); font-weight: 700; line-height: 1.02; margin: 7px 0 0; text-shadow: 0 1px 2px oklch(30% 0.06 320 / 0.18); }

/* 权益要点：每条独立一行 + 细图标，天然分行有节奏，比长句更显尊贵 */
.mc-pass-points {
  position: relative; z-index: 1;
  list-style: none; margin: 18px 0 0; padding: 0;
  display: flex; flex-direction: column; gap: 9px;
}
.mc-pass-points li {
  display: flex; align-items: center; gap: 9px;
  font-size: 13.5px; line-height: 1.35; font-weight: 500;
  color: oklch(100% 0 0 / 0.94);
}
.mc-pass-point-check {
  flex-shrink: 0;
  padding: 2px; border-radius: 999px;
  background: oklch(100% 0 0 / 0.22);
  color: #fff;
}
.mc-pass.free .mc-pass-points li { color: var(--au-ink-2); }
.mc-pass.free .mc-pass-point-check { background: var(--au-pink-soft); color: var(--au-pink-deep); }

/* meta 证章：细描边 + 沉底 + 与要点拉开间距，付费尊贵感 */
.mc-pass-meta {
  display: inline-flex; align-items: center; gap: 6px; margin-top: 22px; align-self: flex-start;
  padding: 8px 16px; border-radius: 999px; font-size: 12.5px; font-weight: 600;
  background: oklch(100% 0 0 / 0.16);
  border: 1px solid oklch(100% 0 0 / 0.34);
  backdrop-filter: blur(4px);
  position: relative; z-index: 1;
}
.mc-pass.free .mc-pass-meta { background: oklch(30% 0.02 55 / 0.05); border-color: var(--au-line); color: var(--au-ink-2); }

/* ── 右栏操作卡 ── */
.mc-side { display: flex; flex-direction: column; gap: 16px; }
.mc-side-card {
  background: var(--au-surface); border: 1px solid var(--au-line);
  border-radius: 20px; padding: 20px; box-shadow: var(--elev-1), var(--sheen);
}
.mc-side-title { font-family: var(--au-serif); font-size: 16px; font-weight: 700; color: var(--au-ink-1); margin: 0 0 4px; }
.mc-side-sub { font-size: 12.5px; color: var(--au-ink-3); line-height: 1.6; margin: 0 0 14px; }
.mc-cta {
  width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 13px; border: none; border-radius: 999px; cursor: pointer;
  font-size: 15px; font-weight: 700; color: #fff;
  background: linear-gradient(150deg, #ff9dbb, #ff7fa8);
  box-shadow: 0 6px 16px oklch(70% 0.14 10 / 0.32);
  transition: transform 0.18s cubic-bezier(0.25,1,0.5,1), box-shadow 0.18s;
}
.mc-cta:hover { transform: translateY(-1px); box-shadow: 0 10px 22px oklch(70% 0.14 10 / 0.4); }
.mc-cta.gold { background: linear-gradient(150deg, #f0c060, #d99a3a); box-shadow: 0 6px 16px oklch(72% 0.12 75 / 0.34); }

.mc-perk { display: flex; align-items: flex-start; gap: 9px; font-size: 13.5px; color: var(--au-ink-2); padding: 6px 0; line-height: 1.5; }
.mc-perk-check { flex-shrink: 0; margin-top: 1px; color: var(--au-purple); }
.mc-perk-emoji { flex-shrink: 0; font-size: 16px; line-height: 1.4; }
.mc-perk-note { font-size: 12px; color: var(--au-ink-3); line-height: 1.6; margin: 12px 0 0; }
.mc-perk-ship {
  display: flex; align-items: flex-start; gap: 7px; margin: 10px 0 0;
  font-size: 12px; font-weight: 600; color: var(--au-ink-2); line-height: 1.55;
  padding: 9px 12px; border-radius: 11px;
  background: oklch(94% 0.03 145 / 0.7); border: 1px solid oklch(80% 0.06 145 / 0.4);
}
.mc-perk-ship svg { flex-shrink: 0; margin-top: 1px; color: var(--au-gold-deep); }
.mc-perk-divider { height: 1px; background: var(--au-line); margin: 14px 0 10px; }

/* ── 我的权益（当前档位一览）── */
.mc-benefits { margin-top: 20px; }
.mc-benefits-head { display: flex; align-items: baseline; gap: 10px; margin: 0 0 12px; }
.mc-benefits-title { font-family: var(--au-serif); font-size: 18px; font-weight: 700; color: var(--au-ink-1); margin: 0; }
.mc-benefits-hint { font-size: 12.5px; color: var(--au-ink-3); }
.mc-ben-groups { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
@media (max-width: 860px) { .mc-ben-groups { grid-template-columns: 1fr; } }
.mc-ben-group {
  background: var(--au-surface); border: 1px solid var(--au-line);
  border-radius: 18px; padding: 16px 18px; box-shadow: var(--elev-1), var(--sheen);
}
.mc-ben-group-label { font-size: 12px; font-weight: 700; letter-spacing: 0.04em; color: var(--au-pink-deep); margin: 0 0 10px; }
.mc-ben-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 7px 0; border-top: 1px solid var(--au-line); }
.mc-ben-row:first-of-type { border-top: none; }
.mc-ben-name { font-size: 13px; color: var(--au-ink-2); }
.mc-ben-val { font-size: 13px; font-weight: 700; color: var(--au-ink-1); text-align: right; white-space: nowrap; }
.mc-ben-val.lock { color: var(--au-ink-3); font-weight: 500; opacity: 0.65; }
.mc-ben-val.inf { display: inline-flex; align-items: center; gap: 3px; color: var(--au-purple); }
.mc-ben-val.yes { color: var(--au-mint); }

/* ── 未登录 ── */
.mc-guest {
  text-align: center; padding: 44px 24px; border-radius: 24px;
  background: var(--au-surface); border: 1px solid var(--au-line); box-shadow: var(--elev-1), var(--sheen);
}
.mc-guest-icon { color: var(--au-ink-3); margin: 0 auto 12px; }
.mc-guest-title { font-family: var(--au-serif); font-size: 19px; font-weight: 700; color: var(--au-ink-1); margin: 0 0 6px; }
.mc-guest-sub { font-size: 13.5px; color: var(--au-ink-3); margin: 0 0 18px; }
.mc-sub-box { margin-top: 14px; padding: 12px 14px; border-radius: 12px; background: var(--au-pink-soft); border: 1px solid oklch(80% 0.06 10 / 0.3); }
.mc-sub-icon { flex-shrink: 0; }
.mc-sub-icon.ok { color: #22c55e; }
.mc-sub-icon.warn { color: var(--au-gold-deep); }
.mc-sub-msg { font-size: 13px; font-weight: 600; color: var(--au-ink-2); margin: 6px 0 2px; }
.mc-sub-date { font-size: 12px; color: var(--au-ink-3); margin: 2px 0 8px; }
.mc-sub-cancel {
  display: inline-flex; align-items: center; gap: 4px;
  margin-top: 6px; padding: 6px 13px; border-radius: 999px; border: 1px solid var(--au-ink-3);
  background: transparent; color: var(--au-ink-3); font-size: 12px; font-weight: 600; cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}
.mc-sub-cancel:hover { color: #e8384f; border-color: #e8384f; }
.mc-sub-cancel:disabled { opacity: 0.5; cursor: default; }
.mc-sub-err { font-size: 12px; color: #e8384f; margin: 6px 0 0; }
`;
