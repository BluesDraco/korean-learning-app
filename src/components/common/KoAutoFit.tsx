'use client';
import { useEffect } from 'react';

/**
 * 全站韩语文本自动缩字号器。
 *
 * 工作方式：
 * 1. 扫描页面上所有带韩语类名的元素（.ko-text, .msg-ko, .diary-ko, ...）
 * 2. 用 ResizeObserver 监听宽度变化；MutationObserver 捕获新增/更新节点
 * 3. 元素 scrollWidth > clientWidth 时，按 5% 一档降字号（下限 60% = 保证可读）
 * 4. 不再溢出立刻停，能装下就恢复原字号
 *
 * 挂在 layout 里一次，覆盖全站。无需组件级 wrapper。
 */

const KO_SELECTORS = [
  '.ko-text', '.ko-body',
  '.diary-ko', '.diary-ko-soft', '.diary-handwriting-ko',
  '.diary-detail-example-quote-ko',
  '.diary-v4-ko-title', '.diary-v4-lockover-ko',
  '.diary-v4-chap-ko', '.diary-v4-sq-label-ko',
  '.subquest-encounter-ko', '.subquest-encounter-hangul',
  '.subquest-example-ko', '.subquest-write-caption-ko',
  '.chatui-msg-ko', '.msg-ko',
  '.spv2-opening-line-ko',
  '.spv2-vcard-ko', '.spv2-vcard-example-ko',
  '.spv2-pcard-ko',
  '.spv2-brow-ko',
  '.spv2-quiz-prompt-ko', '.spv2-quiz-prompt-ko-text',
  '.spv2-dline-ko', '.spv2-dline-ko-wrap',
  '.wbp-item-ko',
  '.az2-korean', '.h-ko',
  '.korea-article',
  '.hr-sc-text',
  // ── 补漏（2026-07-11 审计后新增） ──
  '.word-ko',              // 词卡韩文
  '.spv2-choice-text',     // Quiz 选项韩语文本
  '.spv2-chip-ko',         // 词汇 chip
  '.spv2-flip-ko',         // 翻卡韩文
  '.spv2-side-title',      // 章节标题
  '.spv2-side-sub',        // 章节副标
  '.spv2-mod-name',        // 模块名
  '.tk-q-ko',              // TOPIK 题干韩文
  '.tk-mistake-ko',        // TOPIK 错题韩文
].join(',');

const MIN_SCALE = 0.6;
const STEP = 0.05;
const SCALE_ATTR = 'data-ko-scale';

function fitOne(el: HTMLElement) {
  // 闪卡卡片里的大字号词头不参与自动缩字：它是居中焦点大字，卡片够宽 + keep-all，
  // 且字体统一后 .ko-text 字体变宽会误触发缩放（44px 被压到 60%=26px，就是"突然变小"的根因）。
  if (el.closest('.flashcard-scale')) return;
  // 先恢复原字号再测量，避免累积缩小
  el.style.removeProperty('font-size');
  el.removeAttribute(SCALE_ATTR);
  if (el.scrollWidth <= el.clientWidth) return;

  const baseFont = parseFloat(getComputedStyle(el).fontSize);
  if (!baseFont || Number.isNaN(baseFont)) return;

  let scale = 1;
  while (scale > MIN_SCALE && el.scrollWidth > el.clientWidth) {
    scale = Math.max(MIN_SCALE, scale - STEP);
    el.style.fontSize = `${baseFont * scale}px`;
  }
  el.setAttribute(SCALE_ATTR, scale.toFixed(2));
}

export function KoAutoFit() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observed = new WeakSet<Element>();
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target instanceof HTMLElement) fitOne(entry.target);
      }
    });

    const observeAll = (root: ParentNode) => {
      const nodes = root.querySelectorAll<HTMLElement>(KO_SELECTORS);
      nodes.forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        ro.observe(el);
        fitOne(el);
      });
    };

    observeAll(document);

    // 监听后续 DOM 变化：React 更新、动态加载等
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as Element;
          if (el.matches?.(KO_SELECTORS)) {
            observed.add(el);
            ro.observe(el as HTMLElement);
            fitOne(el as HTMLElement);
          }
          if ('querySelectorAll' in el) observeAll(el as ParentNode);
        });
        // 文本内容变了也重测一次
        if (m.type === 'characterData') {
          let node: Node | null = m.target;
          while (node && node.nodeType !== 1) node = node.parentNode;
          if (node && (node as Element).matches?.(KO_SELECTORS)) {
            fitOne(node as HTMLElement);
          }
        }
      }
    });
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
