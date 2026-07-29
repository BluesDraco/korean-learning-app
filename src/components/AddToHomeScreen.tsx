'use client';

import { useEffect, useState } from 'react';
import { Share, Plus, X } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { t } from '@/lib/i18n';
import './AddToHomeScreen.css';

// 进站几秒后底部滑出「加到主屏幕」引导。
// - iOS Safari：无安装 API，引导手动「分享 → 添加到主屏幕」
// - 安卓 Chrome / 桌面 Chrome·Edge：有 beforeinstallprompt，一键安装
// 已装成 standalone / 已关过（30 天内）/ Capacitor 壳内 / 无安装能力的桌面浏览器：不弹。
const DISMISS_KEY = 'tori-a2hs-dismissed';
const DISMISS_DAYS = 30;

function isStandalone(): boolean {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
    // Capacitor App 壳内：用户已在安装好的 App 里，绝不能再弹「加到主屏幕」
    !!(window as unknown as { Capacitor?: unknown }).Capacitor
  );
}

function isIOS(): boolean {
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua);
  // iPadOS 13+ 伪装成 Mac，靠触摸点数补判
  const iPadOS = navigator.platform === 'MacIntel' && (navigator.maxTouchPoints || 0) > 1;
  return iOS || iPadOS;
}

function recentlyDismissed(): boolean {
  try {
    const ts = Number(localStorage.getItem(DISMISS_KEY) || 0);
    return ts > 0 && Date.now() - ts < DISMISS_DAYS * 864e5;
  } catch {
    return false;
  }
}

export function AddToHomeScreen() {
  const { lang } = useLang();
  const { canInstall, promptInstall } = useInstallPrompt();
  const [ready, setReady] = useState(false); // 4s 后允许弹
  const [dismissed, setDismissed] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    if (isStandalone() || recentlyDismissed()) { setDismissed(true); return; }
    setIos(isIOS());
    const timer = setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setDismissed(true);
  };

  const install = async () => {
    await promptInstall();
    dismiss();
  };

  // iOS 靠图文；安卓/桌面 Chrome·Edge 能一键（canInstall）；
  // 其余（华为鸿蒙自带浏览器 / 国产浏览器 / 微信等 WebView）不支持 PWA 安装，
  // 只能加「网页快捷方式」，给一套诚实的图文步骤引导，不承诺 App 外壳。
  if (dismissed || !ready) return null;

  return (
    <div className="a2hs" role="dialog" aria-label={t('a2hs.title', lang)}>
      <button className="a2hs-close" onClick={dismiss} aria-label={t('a2hs.close', lang)}>
        <X size={16} />
      </button>
      <div className="a2hs-icon">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon-192.png?v=3" alt="Tori" width={52} height={52} />
      </div>
      <div className="a2hs-body">
        <p className="a2hs-title">{t('a2hs.title', lang)}</p>
        {ios ? (
          <p className="a2hs-desc">
            {t('a2hs.desc_ios_pre', lang)} <Share size={13} className="a2hs-inline" /> {t('a2hs.desc_ios_post', lang)}
          </p>
        ) : canInstall ? (
          <p className="a2hs-desc">{t('a2hs.desc_android', lang)}</p>
        ) : (
          <p className="a2hs-desc">{t('a2hs.desc_shortcut', lang)}</p>
        )}
      </div>
      {!ios && canInstall && (
        <button className="a2hs-cta" onClick={install}>
          <Plus size={15} /> {t('a2hs.install', lang)}
        </button>
      )}
    </div>
  );
}
