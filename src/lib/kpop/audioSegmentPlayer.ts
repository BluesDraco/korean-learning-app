// SegmentPlayer — unified audio segment playback
// Handles: load, seek to startMs, play to endMs, loop, slow, stop, cleanup

export type PlayerState = 'idle' | 'loading' | 'ready' | 'playing' | 'error';

export interface SegmentPlayerOptions {
  onStateChange?: (state: PlayerState) => void;
  onError?: (error: string) => void;
}

export class SegmentPlayer {
  private audio: HTMLAudioElement | null = null;
  private _state: PlayerState = 'idle';
  private _playbackRate = 1.0;
  private _loop = false;
  private _startMs = 0;
  private _endMs = 0;
  private _rafId: number | null = null;
  private _options: SegmentPlayerOptions;

  constructor(options: SegmentPlayerOptions = {}) {
    this._options = options;
  }

  get state() { return this._state; }
  get isPlaying() { return this._state === 'playing'; }

  private setState(s: PlayerState) {
    this._state = s;
    this._options.onStateChange?.(s);
  }

  async load(url: string): Promise<void> {
    this.destroy();
    this.setState('loading');

    // Create audio element without src first to avoid cached-load race.
    // Attach listeners BEFORE setting src so loadedmetadata always fires after registration.
    // NOTE: Do NOT set crossOrigin — COS bucket doesn't have CORS configured,
    // and Chromium blocks CORS requests to non-CORS origins.
    const audio = new Audio();
    audio.preload = 'auto';
    this.audio = audio;

    try {
      await new Promise<void>((resolve, reject) => {
        const onReady = () => {
          cleanup();
          this.setState('ready');
          resolve();
        };
        const onError = () => {
          cleanup();
          reject(new Error('audio load failed'));
        };
        const cleanup = () => {
          clearTimeout(timeoutId);
          audio.removeEventListener('loadedmetadata', onReady);
          audio.removeEventListener('error', onError);
          audio.removeEventListener('stalled', onStalled);
        };
        // Timeout fallback: some browsers never fire loadedmetadata for large/streamed files
        const timeoutId = setTimeout(() => {
          if (audio.readyState >= 1) {
            // HTMLMediaElement.HAVE_METADATA = 1 — metadata is already available
            cleanup();
            this.setState('ready');
            resolve();
          } else {
            cleanup();
            this.setState('error');
            reject(new Error('audio load timeout'));
          }
        }, 8000);
        const onStalled = () => {
          // Stalled but might have enough data — check readyState
          if (audio.readyState >= 1) {
            clearTimeout(timeoutId);
            cleanup();
            this.setState('ready');
            resolve();
          }
        };
        audio.addEventListener('loadedmetadata', onReady);
        audio.addEventListener('error', onError);
        audio.addEventListener('stalled', onStalled);
        audio.src = url;
        audio.load();
      });
    } catch {
      this.setState('error');
      this._options.onError?.('音频加载失败');
    }
  }

  playSegment(startMs: number, endMs: number, loop = false, slow = false): void {
    const audio = this.audio;
    if (!audio || this._state === 'loading') return;

    this._startMs = startMs;
    this._endMs = endMs;
    this._loop = loop;
    this._playbackRate = slow ? 0.75 : 1.0;
    audio.playbackRate = this._playbackRate;

    const startSec = startMs / 1000;
    const endSec = endMs / 1000;

    // Seek to start — wait for seek to complete before playing
    audio.currentTime = startSec;

    const onSeeked = () => {
      audio.removeEventListener('seeked', onSeeked);
      audio.play().then(() => {
        this.setState('playing');
        this.startRafMonitor(startSec, endSec);
      }).catch(() => {
        this._options.onError?.('播放失败');
      });
    };

    // If already near the target, skip waiting for seeked
    if (Math.abs(audio.currentTime - startSec) < 0.05) {
      audio.play().then(() => {
        this.setState('playing');
        this.startRafMonitor(startSec, endSec);
      }).catch(() => {
        this._options.onError?.('播放失败');
      });
    } else {
      audio.addEventListener('seeked', onSeeked, { once: true });
    }
  }

  private startRafMonitor(startSec: number, endSec: number) {
    this.stopRafMonitor();
    const audio = this.audio;
    if (!audio) return;

    const tick = () => {
      if (!audio || audio.paused) {
        this.stopRafMonitor();
        return;
      }
      if (audio.currentTime >= endSec) {
        if (this._loop) {
          audio.currentTime = startSec;
        } else {
          audio.pause();
          this.setState('idle');
          this.stopRafMonitor();
          return;
        }
      }
      this._rafId = requestAnimationFrame(tick);
    };
    this._rafId = requestAnimationFrame(tick);
  }

  private stopRafMonitor() {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  /** Current playback position in milliseconds */
  get currentTimeMs(): number {
    return (this.audio?.currentTime ?? 0) * 1000;
  }

  /** Seek to an absolute position (ms) without playing */
  seekToMs(ms: number) {
    if (this.audio) this.audio.currentTime = ms / 1000;
  }

  /** Play from an absolute position (ms) to end of file (no endMs monitor) */
  playFrom(startMs: number, slow = false): void {
    const audio = this.audio;
    if (!audio || this._state === 'loading') return;
    this.stopRafMonitor();
    this._playbackRate = slow ? 0.75 : 1.0;
    audio.playbackRate = this._playbackRate;
    audio.currentTime = startMs / 1000;
    audio.play().then(() => this.setState('playing')).catch(() => {});
  }

  setPlaybackRate(rate: number) {
    this._playbackRate = rate;
    if (this.audio) {
      this.audio.playbackRate = rate;
    }
  }

  stop() {
    this.stopRafMonitor();
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.setState('idle');
  }

  destroy() {
    this.stopRafMonitor();
    if (this.audio) {
      this.audio.pause();
      this.audio.removeAttribute('src');
      this.audio = null;
    }
    this.setState('idle');
  }
}
