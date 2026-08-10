'use client';

import { useState, useEffect } from 'react';

function checkMobile() {
  if (typeof window === 'undefined') return false;
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmall = window.innerWidth < 768;
  return hasTouch && isSmall;
}

function checkDesktop() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(checkMobile);

  useEffect(() => {
    const check = () => setIsMobile(checkMobile());
    const ro = new ResizeObserver(check);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  return isMobile;
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(checkDesktop);

  useEffect(() => {
    const check = () => setIsDesktop(checkDesktop());
    const ro = new ResizeObserver(check);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  return isDesktop;
}
