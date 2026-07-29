'use client';

import { useState, useEffect } from 'react';

function getIsDesktop() {
  if (typeof window === 'undefined') return false;
  // 桌面布局条件：宽>高（横屏方向）且宽度 ≥ 1024
  // 与 docs/responsive.md 的骨架层契约、diary.css / scene.css 的 (min-width: 1024px)、
  // globals.css 的 .desktop-app 断点一致。阈值 1024 排除横屏 iPhone (≤932)，
  // 保留 iPad mini 横屏 (1024×768) 及以上进入桌面壳。
  return window.innerWidth > window.innerHeight && window.innerWidth >= 1024;
}

// Shared singleton — one ResizeObserver for the entire app
const listeners = new Set<(v: boolean) => void>();
let ro: ResizeObserver | null = null;

function subscribe(fn: (v: boolean) => void) {
  if (!ro && typeof window !== 'undefined') {
    ro = new ResizeObserver(() => {
      const v = getIsDesktop();
      listeners.forEach(f => f(v));
    });
    ro.observe(document.documentElement);
  }
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);
  useEffect(() => subscribe(setIsDesktop), []);
  return isDesktop;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => !getIsDesktop());
  useEffect(() => subscribe(v => setIsMobile(!v)), []);
  return isMobile;
}
