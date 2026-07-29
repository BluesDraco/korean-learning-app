'use client';

import { useEffect, useState } from 'react';

// 「学习地图入口卡」是否隐藏。daily 入口卡上可一键隐藏，隐藏后只能在设置里重新打开。
// 三处共用：daily/page.tsx（移动）、DesktopDailyPage.tsx（桌面）、settings/page.tsx（开关）。
const MAP_ENTRY_HIDDEN_KEY = 'tori_hide_map_entry';
const EVENT = 'tori-map-entry-pref';

export function getMapEntryHidden(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(MAP_ENTRY_HIDDEN_KEY) === 'true';
}

export function setMapEntryHidden(hidden: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(MAP_ENTRY_HIDDEN_KEY, String(hidden));
  window.dispatchEvent(new CustomEvent(EVENT, { detail: hidden }));
}

// 读取偏好并跨组件/跨标签页同步。SSR 阶段返回 false（默认显示），挂载后校正。
export function useMapEntryHidden(): [boolean, (hidden: boolean) => void] {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(getMapEntryHidden());
    const onCustom = (e: Event) => setHidden((e as CustomEvent<boolean>).detail);
    const onStorage = (e: StorageEvent) => {
      if (e.key === MAP_ENTRY_HIDDEN_KEY) setHidden(e.newValue === 'true');
    };
    window.addEventListener(EVENT, onCustom);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, onCustom);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return [hidden, setMapEntryHidden];
}
