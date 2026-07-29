'use client';

import { useEffect, useState, useCallback } from 'react';

// 统一的 PWA 安装能力：读取 layout 早期捕获的 beforeinstallprompt（window.__bipEvent），
// 供加桌面引导卡 + 教程页一键按钮共用。
// - canInstall：仅安卓 Chrome / 桌面 Chrome·Edge 等支持 beforeinstallprompt 的浏览器为 true
// - iOS Safari 无此 API，canInstall 恒为 false，UI 靠图文步骤引导
type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> };
type BIPWindow = Window & { __bipEvent?: BIPEvent | null };

export function useInstallPrompt() {
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const w = window as BIPWindow;
    if (w.__bipEvent) setCanInstall(true);

    const onInstallable = () => setCanInstall(true);
    const onInstalled = () => setCanInstall(false);
    window.addEventListener('tori-installable', onInstallable);
    window.addEventListener('tori-installed', onInstalled);
    return () => {
      window.removeEventListener('tori-installable', onInstallable);
      window.removeEventListener('tori-installed', onInstalled);
    };
  }, []);

  // 返回 'accepted' | 'dismissed' | 'unavailable'
  const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    const w = window as BIPWindow;
    const bip = w.__bipEvent;
    if (!bip) return 'unavailable';
    try {
      await bip.prompt();
      const { outcome } = await bip.userChoice;
      w.__bipEvent = null;
      setCanInstall(false);
      return outcome;
    } catch {
      return 'unavailable';
    }
  }, []);

  return { canInstall, promptInstall };
}
