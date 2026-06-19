'use client';

import { useEffect, useRef, useCallback } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  playerId?: string;
  onTimeUpdate?: (seconds: number) => void;
  onStateChange?: (state: number) => void; // -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 cued
  className?: string;
}

export default function YouTubePlayer({
  videoId,
  playerId = 'yt-player',
  onTimeUpdate,
  onStateChange,
  className,
}: YouTubePlayerProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTimeUpdateRef = useRef(onTimeUpdate);
  const onStateChangeRef = useRef(onStateChange);
  onTimeUpdateRef.current = onTimeUpdate;
  onStateChangeRef.current = onStateChange;

  // Subscribe to infoDelivery from the iframe so YouTube pushes currentTime automatically
  const subscribeInfo = useCallback(() => {
    const iframe = document.getElementById(playerId) as HTMLIFrameElement | null;
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'listening' }), '*');
  }, [playerId]);

  const handleMessage = useCallback((e: MessageEvent) => {
    if (!e.data) return;
    try {
      const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;

      if (data.event === 'onReady') {
        // Once player is ready, subscribe to info pushes
        subscribeInfo();
      }

      if (data.event === 'onStateChange') {
        onStateChangeRef.current?.(data.info);
        if (data.info === 1) {
          // playing — poll every 200ms via postMessage to get currentTime
          // (infoDelivery fires ~250ms from YT, but we poll to guarantee ≤200ms latency)
          if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
              const iframe = document.getElementById(playerId) as HTMLIFrameElement | null;
              if (iframe?.contentWindow) {
                iframe.contentWindow.postMessage(
                  JSON.stringify({ event: 'listening' }),
                  '*'
                );
              }
            }, 200);
          }
        } else {
          if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
        }
      }

      // infoDelivery carries currentTime when subscribed via "listening"
      if (data.event === 'infoDelivery' && data.info?.currentTime != null) {
        onTimeUpdateRef.current?.(data.info.currentTime);
      }
    } catch {}
  }, [playerId, subscribeInfo]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    };
  }, [handleMessage]);

  const origin = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';
  const src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&playsinline=1&rel=0&modestbranding=1&origin=${origin}`;

  return (
    <div
      className={className}
      style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: 0 }}
    >
      <iframe
        id={playerId}
        src={src}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}
