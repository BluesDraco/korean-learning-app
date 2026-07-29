'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// feed 内联语音播放：全局单例，同一时刻只播一条。
// 点新卡片自动停掉正在播的那条（真实社媒 feed 音频行为）。
// 详情页有自己独立的 <audio ref>，不走这里，互不干扰。

let currentAudio: HTMLAudioElement | null = null;
const listeners = new Set<() => void>();
function stopOthers(except: HTMLAudioElement) {
  if (currentAudio && currentAudio !== except) {
    currentAudio.pause();
  }
  currentAudio = except;
  listeners.forEach((fn) => fn());
}

export function useFeedAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ratio, setRatio] = useState(0); // 播放进度 0~1

  // 别的卡片开始播时，同步把自己标记为停（单例广播）
  useEffect(() => {
    const onOther = () => {
      const a = audioRef.current;
      if (a && currentAudio !== a) setPlaying(false);
    };
    listeners.add(onOther);
    return () => { listeners.delete(onOther); };
  }, []);

  // 卸载时暂停、移除监听、让出单例（避免监听器挂在待 GC 的 Audio 上）
  useEffect(() => {
    return () => {
      cleanupRef.current?.();
      if (currentAudio === audioRef.current) currentAudio = null;
    };
  }, []);

  const toggle = useCallback((e?: { stopPropagation?: () => void; preventDefault?: () => void }) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    let a = audioRef.current;
    if (!a) {
      a = new Audio(src);
      a.preload = 'metadata';
      const onTime = () => setRatio(a!.duration > 0 ? a!.currentTime / a!.duration : 0);
      const onEnded = () => { setPlaying(false); setRatio(0); };
      const onPause = () => setPlaying(false);
      const onPlay = () => setPlaying(true);
      a.addEventListener('timeupdate', onTime);
      a.addEventListener('ended', onEnded);
      a.addEventListener('pause', onPause);
      a.addEventListener('play', onPlay);
      cleanupRef.current = () => {
        a!.pause();
        a!.removeEventListener('timeupdate', onTime);
        a!.removeEventListener('ended', onEnded);
        a!.removeEventListener('pause', onPause);
        a!.removeEventListener('play', onPlay);
      };
      audioRef.current = a;
    }
    if (a.paused) {
      stopOthers(a); // 先停掉别的正在播的
      // iOS 手势栈安全：play() 直接在点击栈里调，不 await 任何东西
      void a.play().catch(() => setPlaying(false));
    } else {
      a.pause();
    }
  }, [src]);

  return { playing, ratio, toggle };
}
