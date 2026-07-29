'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

// 返回逻辑父页：永远 push(fallback)，不用 router.back()。
// router.back() 退的是浏览器历史栈的上一条，横向跳转/外链/PWA 进入时
// 常常不等于逻辑父页，导致"返回到上上个页面"。用于所有"返回/完成/退出"按钮。
export function useSmartBack(fallback: string) {
  const router = useRouter();
  return useCallback(() => {
    router.push(fallback);
  }, [router, fallback]);
}
