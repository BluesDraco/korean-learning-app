import { Edit3, Keyboard } from 'lucide-react';
import { KoreanKeyboard } from '@/components/KoreanKeyboard';
import type { OutputTask } from '@/data/thirtyDayCourse';

interface Props {
  output: OutputTask;
  text: string;
  setText: (v: string) => void;
  showKeyboard: boolean;
  setShowKeyboard: (v: boolean) => void;
  isMobile: boolean;
}

export function OutputCard({ output, text, setText, showKeyboard, setShowKeyboard, isMobile }: Props) {
  return (
    <div className="w-full text-left space-y-4">
      <div className="flex items-center gap-2">
        <Edit3 size={18} className="text-[var(--pink-primary)]" />
        <span className="text-sm font-bold text-[var(--text-primary)]">输出练习</span>
      </div>
      <p className="text-sm text-[var(--text-primary)]">{output.prompt}</p>
      <p className="text-[11px] text-[var(--text-muted)]">提示：{output.hint}</p>
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => isMobile && setShowKeyboard(true)}
          placeholder="写下你的韩语句子..."
          rows={3}
          className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl p-3 pr-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] resize-none focus:outline-none focus:border-[var(--pink-pale)]"
        />
        {isMobile && (
          <button
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`absolute right-2 bottom-2 p-1.5 rounded-lg transition-colors ${showKeyboard ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)]'}`}
          >
            <Keyboard size={16} />
          </button>
        )}
      </div>
      <KoreanKeyboard value={text} onChange={setText} visible={showKeyboard} onClose={() => setShowKeyboard(false)} />
      {text && (
        <div className="p-3 bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-xl">
          <p className="text-[11px] text-[var(--text-muted)] mb-1">参考例句</p>
          <p className="text-sm text-[var(--text-primary)]">{output.exampleAnswer}</p>
        </div>
      )}
    </div>
  );
}
