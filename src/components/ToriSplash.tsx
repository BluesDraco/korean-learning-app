'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import './ToriSplash.css';

// 品牌开场动画。每个浏览器会话（App 冷启动）播一次：
// sessionStorage 记账，同一会话内切页/刷新不重播；关掉标签页重开才再播。
// 顺带盖住首屏 SSR「先手机布局再切桌面」的闪烁。
// 在 Capacitor 壳内：动画首帧渲染后主动关掉原生闪屏，无缝衔接（否则原生闪屏会盖住动画）。
type CapWindow = Window & {
  Capacitor?: { Plugins?: { SplashScreen?: { hide?: () => void } } };
};

export function ToriSplash() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 只有动画真正播完才记账。若在此之前发生整页重定向（如 / → /auth/login），
    // 标记尚未写入，下一个稳定页面会把动画从头完整播完再记账。
    if (sessionStorage.getItem('tori-splash-shown')) return;

    setShow(true);
    // 动画首帧上屏后再关原生闪屏，避免衔接处露白
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        (window as CapWindow).Capacitor?.Plugins?.SplashScreen?.hide?.();
      });
    });

    const timer = setTimeout(() => {
      sessionStorage.setItem('tori-splash-shown', '1');
      setShow(false);
    }, 3100);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="tori-splash play" aria-hidden>
      <div className="ts-glow ts-glow-1" />
      <div className="ts-glow ts-glow-2" />
      <div className="ts-fig">
        <img src="/icon-512.png?v=3" alt="" />
      </div>
      <div className="ts-titles">
        <div className="ts-kicker">TORI KOREAN</div>
        <div className="ts-title">{t('splash.title', lang)}</div>
        <div className="ts-sub">토리의 한국어 일기</div>
      </div>
      <div className="ts-dots"><i /><i /><i /></div>
    </div>
  );
}
