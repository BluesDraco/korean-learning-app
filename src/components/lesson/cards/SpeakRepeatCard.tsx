import { useState, useCallback, useRef } from 'react';
import { Mic, Volume2, Square, Play } from 'lucide-react';

interface Props {
  korean: string;
  pronunciation: string;
  chinese: string;
  playing: boolean;
  onSpeak: () => void;
  onScore?: (score: number, transcript: string) => void;
}

/** Check if SpeechRecognition API is available */
function hasSpeechRecognition(): boolean {
  return !!(typeof window !== 'undefined' &&
    (window.SpeechRecognition || (window as any).webkitSpeechRecognition));
}

export function SpeakRepeatCard({ korean, pronunciation, chinese, playing, onSpeak, onScore }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = useCallback(async () => {
    if (!hasSpeechRecognition()) {
      setError('此浏览器不支持语音识别，请使用 Chrome');
      return;
    }

    setError('');
    setScore(null);
    setTranscript('');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    recognitionRef.current = rec;
    rec.lang = 'ko-KR';
    rec.interimResults = false;
    rec.maxAlternatives = 3;

    rec.onresult = (event: any) => {
      const results: string[] = [];
      for (let i = 0; i < event.results.length; i++) {
        for (let j = 0; j < event.results[i].length; j++) {
          results.push(event.results[i][j].transcript.trim());
        }
      }
      const best = results[0] || '';
      setTranscript(best);

      // Score: compare recognized text with target
      const targetLower = korean.replace(/\s+/g, '').toLowerCase();
      const spokenLower = best.replace(/\s+/g, '').toLowerCase();

      // Character-level Jaccard similarity
      const targetSet = new Set(targetLower.split(''));
      const spokenSet = new Set(spokenLower.split(''));
      let overlap = 0;
      for (const c of spokenSet) {
        if (targetSet.has(c)) overlap++;
      }
      const union = new Set([...targetSet, ...spokenSet]).size;
      const jaccard = union > 0 ? overlap / union : 0;

      // Also check exact match
      const exactMatch = targetLower === spokenLower;
      const finalScore = exactMatch ? 100 : Math.round(jaccard * 100);

      setScore(finalScore);
      onScore?.(finalScore, best);
    };

    rec.onerror = (event: any) => {
      if (event.error === 'no-speech') {
        setError('未检测到语音，请再试一次');
      } else if (event.error === 'aborted') {
        // User stopped
      } else {
        setError(`识别错误: ${event.error}`);
      }
      setIsRecording(false);
    };

    rec.onend = () => {
      setIsRecording(false);
    };

    try {
      await rec.start();
      setIsRecording(true);
    } catch (e: any) {
      setError(`无法启动麦克风: ${e.message}`);
    }
  }, [korean, onScore]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.abort();
    setIsRecording(false);
  }, []);

  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-center gap-2">
        <Mic size={18} className="text-[var(--pink-primary)]" />
        <span className="text-sm font-bold text-[var(--text-primary)]">影子跟读</span>
      </div>

      <p className="text-xs text-[var(--text-muted)]">听一遍，然后跟着读</p>

      {/* Listen button */}
      <button
        onClick={(e) => { e.stopPropagation(); onSpeak(); }}
        className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all ${
          playing
            ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
            : 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20'
        }`}
      >
        <Volume2 size={16} className="inline mr-1.5" />
        {playing ? '播放中...' : '听发音'}
      </button>

      {/* Target sentence */}
      <div className="bg-[var(--bg-input)] rounded-2xl p-5 w-full max-w-xs mx-auto space-y-2">
        <p className="text-2xl font-bold text-[var(--text-primary)]">{korean}</p>
        <p className="text-xs text-[var(--text-muted)] font-mono">{pronunciation}</p>
        <p className="text-sm text-[var(--pink-primary)]">{chinese}</p>
      </div>

      {/* Record / Stop / Score */}
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2">
          {!isRecording ? (
            <button
              onClick={(e) => { e.stopPropagation(); startRecording(); }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-dashed border-[var(--pink-pale)] text-[var(--pink-primary)] text-sm font-medium hover:bg-[var(--pink-primary)]/5 transition-colors"
            >
              <Mic size={16} />
              开始跟读
            </button>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); stopRecording(); }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium animate-pulse"
            >
              <Square size={16} />
              停止录音
            </button>
          )}
        </div>

        {/* Score display */}
        {score !== null && (
          <div className={`p-3 rounded-xl text-center ${
            score >= 80 ? 'bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20' :
            score >= 50 ? 'bg-amber-500/10 border border-amber-500/20' :
            'bg-red-50 border border-red-500/10'
          }`}>
            <p className={`text-2xl font-extrabold ${
              score >= 80 ? 'text-[var(--mint-soft)]' :
              score >= 50 ? 'text-amber-500' :
              'text-red-400'
            }`}>
              {score}分
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              识别结果: {transcript || '(无)'}
            </p>
            {score >= 80 && <p className="text-xs text-[var(--mint-soft)] mt-0.5">发音很好!</p>}
            {score >= 50 && score < 80 && <p className="text-xs text-amber-500 mt-0.5">还不错，再练练</p>}
            {score < 50 && <p className="text-xs text-red-400 mt-0.5">多听几遍再试</p>}
          </div>
        )}

        {error && (
          <p className="text-xs text-red-400 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
