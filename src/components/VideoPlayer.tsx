'use client';

import { useRef, useImperativeHandle, forwardRef } from 'react';
import type { VideoPlatform } from '@/lib/platform-detector';

interface VideoPlayerProps {
  embedUrl: string;
  platform: VideoPlatform;
}

export interface VideoPlayerHandle {
  seekTo: (seconds: number) => void;
  setPlaybackRate: (rate: number) => void;
  pauseVideo: () => void;
  playVideo: () => void;
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  function VideoPlayer({ embedUrl, platform }, ref) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    function postMessage(data: object) {
      const msg = JSON.stringify(data);
      iframeRef.current?.contentWindow?.postMessage(msg, '*');
    }

    useImperativeHandle(ref, () => ({
      seekTo(seconds: number) {
        if (platform === 'youtube') {
          postMessage({ event: 'command', func: 'seekTo', args: [seconds, true] });
        } else {
          // B站: try postMessage seek
          postMessage({ type: 'seek', time: seconds });
        }
      },
      setPlaybackRate(rate: number) {
        if (platform === 'youtube') {
          postMessage({ event: 'command', func: 'setPlaybackRate', args: [rate] });
        }
        // B站 doesn't support rate change via postMessage
      },
      pauseVideo() {
        if (platform === 'youtube') {
          postMessage({ event: 'command', func: 'pauseVideo', args: [] });
        }
      },
      playVideo() {
        if (platform === 'youtube') {
          postMessage({ event: 'command', func: 'playVideo', args: [] });
        }
      },
    }));

    return (
      <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <iframe
          ref={iframeRef}
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen"
          allowFullScreen
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
    );
  }
);
