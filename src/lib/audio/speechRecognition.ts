'use client';

// Web Speech API wrapper for Korean STT.
// Falls back gracefully when not supported (WeChat WebView, Firefox, etc.)

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition
  );
}

type InterimCallback = (text: string) => void;
type FinalCallback = (text: string) => void;
type ErrorCallback = (reason: 'not-supported' | 'denied' | 'network' | 'unknown') => void;

export class KoreanSpeechRecognizer {
  private recognition: any = null;
  private onInterimCb: InterimCallback | null = null;
  private onFinalCb: FinalCallback | null = null;
  private onErrorCb: ErrorCallback | null = null;
  private _active = false;

  get active() {
    return this._active;
  }

  onInterim(cb: InterimCallback) { this.onInterimCb = cb; return this; }
  onFinal(cb: FinalCallback) { this.onFinalCb = cb; return this; }
  onError(cb: ErrorCallback) { this.onErrorCb = cb; return this; }

  start() {
    if (!isSpeechRecognitionSupported()) {
      this.onErrorCb?.('not-supported');
      return;
    }
    if (this._active) return;

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SR();
    this.recognition.lang = 'ko-KR';
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
    this.recognition.continuous = false;

    this.recognition.onresult = (e: any) => {
      let interim = '';
      let final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          final += t;
        } else {
          interim += t;
        }
      }
      if (interim) this.onInterimCb?.(interim);
      if (final) {
        this._active = false;
        this.onFinalCb?.(final.trim());
      }
    };

    this.recognition.onerror = (e: any) => {
      this._active = false;
      if (e.error === 'not-allowed') {
        this.onErrorCb?.('denied');
      } else if (e.error === 'network') {
        this.onErrorCb?.('network');
      } else {
        this.onErrorCb?.('unknown');
      }
    };

    this.recognition.onend = () => {
      this._active = false;
    };

    this._active = true;
    this.recognition.start();
  }

  stop() {
    if (this.recognition && this._active) {
      this.recognition.stop();
      this._active = false;
    }
  }

  abort() {
    if (this.recognition) {
      this.recognition.abort();
      this._active = false;
    }
  }
}
