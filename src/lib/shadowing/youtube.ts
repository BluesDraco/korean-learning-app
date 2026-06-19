// YouTube IFrame API postMessage helpers
// The YT IFrame API is loaded globally via script tag in YouTubePlayer.tsx

export type YTPlayerState = 'unstarted' | 'ended' | 'playing' | 'paused' | 'buffering' | 'cued';

export function ytCommand(iframeId: string, func: string, args?: unknown[]) {
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
  if (!iframe?.contentWindow) return;
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: 'command', func, args: args ?? [] }),
    '*'
  );
}

export function ytPlay(iframeId: string) { ytCommand(iframeId, 'playVideo'); }
export function ytPause(iframeId: string) { ytCommand(iframeId, 'pauseVideo'); }
export function ytSeekTo(iframeId: string, seconds: number) {
  ytCommand(iframeId, 'seekTo', [seconds, true]);
}
export function ytSetRate(iframeId: string, rate: number) {
  ytCommand(iframeId, 'setPlaybackRate', [rate]);
}
export function ytMute(iframeId: string) { ytCommand(iframeId, 'mute'); }
export function ytUnmute(iframeId: string) { ytCommand(iframeId, 'unMute'); }
