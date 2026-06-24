'use client';

import { useState, useEffect } from 'react';

const BREAKPOINT = 768;

function getIsDesktop() {
  return typeof window !== 'undefined' && window.innerWidth >= BREAKPOINT;
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
