// Global audio singleton — prevents overlapping playback and supports rate control.
'use client';

type PlayerState = 'idle' | 'loading' | 'playing' | 'paused';

class AudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private _state: PlayerState = 'idle';
  private onStateChange: ((s: PlayerState) => void) | null = null;

  get state() { return this._state; }

  setStateChange(fn: (s: PlayerState) => void) {
    this.onStateChange = fn;
  }

  private setState(s: PlayerState) {
    this._state = s;
    this.onStateChange?.(s);
  }

  /** Play a URL at given rate. Stops any currently playing audio first. */
  play(url: string, rate: number = 1): void {
    this.stop();
    this.audio = new Audio(url);
    this.audio.playbackRate = rate;
    this.audio.onplay = () => this.setState('playing');
    this.audio.onended = () => this.setState('idle');
    this.audio.onerror = () => this.setState('idle');
    this.audio.oncanplaythrough = () => {
      this.audio?.play().catch(() => this.setState('idle'));
    };
    this.setState('loading');
  }

  /** Play TTS for Korean text using browser speechSynthesis (fast, offline). */
  speakTTS(text: string, rate: number = 0.75): void {
    this.stop();
    if (typeof speechSynthesis === 'undefined') return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = rate;
    u.onstart = () => this.setState('playing');
    u.onend = () => this.setState('idle');
    u.onerror = () => this.setState('idle');
    this.setState('loading');
    speechSynthesis.speak(u);
  }

  pause(): void {
    if (this.audio) { this.audio.pause(); this.setState('paused'); }
  }

  resume(): void {
    if (this.audio) { this.audio.play().catch(() => {}); this.setState('playing'); }
  }

  stop(): void {
    if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
    if (this.audio) {
      this.audio.pause();
      this.audio.onended = null;
      this.audio.onerror = null;
      this.audio.oncanplaythrough = null;
      this.audio.onplay = null;
      this.audio = null;
    }
    this.setState('idle');
  }
}

export const globalPlayer = new AudioPlayer();
