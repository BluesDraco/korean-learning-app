'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  const isPopRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (history.scrollRestoration !== 'auto') history.scrollRestoration = 'auto';
    const onPop = () => {
      isPopRef.current = true;
      // 如果 popstate 不伴随路由变化（hash / 同路径），
      // 下一帧自动清旗，避免污染之后的真正 push 导航。
      setTimeout(() => { isPopRef.current = false; }, 0);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (isPopRef.current) {
      isPopRef.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
