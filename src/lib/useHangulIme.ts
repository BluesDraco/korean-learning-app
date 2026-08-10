'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { composeBuffer, decomposeFull, qwertyKeyToJamo } from '@/lib/hangulCompose';

/**
 * 自立型韩文 IME 钩子 · jamo buffer 为真源(不依赖系统输入法)。
 * 物理键盘 + 虚拟键盘统一喂进同一个 buffer,组字/退格/按键高亮全由 App 接管。
 * 默写页 / 打字页桌面端共用。
 *
 * 按键监听绑在「可聚焦显示区 div」上(keyProps),不用 window 全局监听,
 * 避免误吞页面其他按钮的 Enter/Space。
 */

interface UseHangulImeOptions {
  [k: string]: unknown;
  /** buffer 变化后回调组合文本 · 消费方用它同步自己的 input state */
  onChange?: (text: string) => void;
  /** 按下 Enter 时触发(提交/下一题) */
  onEnter?: () => void;
  /** true 时挂全局 Backspace 兜底(挡浏览器"后退"),桌面 session 期间开 */
  guardBackspace?: boolean;
}

export interface HangulIme {
  [k: string]: unknown;
  /** 组合后的韩文(用于展示与判分) */
  text: string;
  /** 当前闪光的物理键(小写 qwerty 或 ' '),供虚拟键盘高亮 */
  pressedKey: string | null;
  /** 虚拟键点击 · 追加一个 jamo */
  inputJamo: (jamo: string) => void;
  /** 退格 · 逐 jamo 删(iOS 式) */
  backspace: () => void;
  /** 空格 */
  space: () => void;
  /** 清空 buffer(换题/重来时调用) */
  reset: () => void;
  /** 外部文本变化时(点词填入/语音转写/提示填入/粘贴)把 buffer 重置成该文本的 jamo 分解,
   *  让虚拟/物理键盘在正确基础上继续组合。不触发 onChange(避免与外部 setInput 回环)。 */
  syncExternal: (text: string) => void;
  /** 绑到可聚焦显示区 div 的属性 · 键盘监听只在该区聚焦时生效 */
  keyProps: {
    tabIndex: number;
    onKeyDown: (e: ReactKeyboardEvent) => void;
  };
}

export function useHangulIme({ onChange, onEnter, guardBackspace }: UseHangulImeOptions): HangulIme {
  const bufferRef = useRef<string[]>([]);
  const [text, setText] = useState('');
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onChangeRef = useRef(onChange);
  const onEnterRef = useRef(onEnter);
  onChangeRef.current = onChange;
  onEnterRef.current = onEnter;

  const commit = useCallback((next: string[]) => {
    bufferRef.current = next;
    const t = composeBuffer(next);
    setText(t);
    onChangeRef.current?.(t);
  }, []);

  const flashKey = useCallback((qwerty: string) => {
    setPressedKey(qwerty);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setPressedKey(null), 130);
  }, []);

  const inputJamo = useCallback((jamo: string) => {
    commit([...bufferRef.current, jamo]);
  }, [commit]);

  const backspace = useCallback(() => {
    if (bufferRef.current.length === 0) return;
    commit(bufferRef.current.slice(0, -1));
  }, [commit]);

  const space = useCallback(() => {
    commit([...bufferRef.current, ' ']);
  }, [commit]);

  const reset = useCallback(() => {
    commit([]);
  }, [commit]);

  // 外部文本 → buffer(不回调 onChange)。文本与当前 buffer 组合结果一致时跳过,避免多余重置。
  // 注:此处只 setText 本地、不触发 onChange(否则与外部 setInput 回环)。消费方须用外部 value 作
  // KoreanKeyboardDisplay 的 composingText,不要读 ime.text(syncExternal 后二者可能短暂不同步)。
  const syncExternal = useCallback((next: string) => {
    if (composeBuffer(bufferRef.current) === next) return;
    bufferRef.current = decomposeFull(next);
    setText(next);
  }, []);

  useEffect(() => () => { if (flashTimer.current) clearTimeout(flashTimer.current); }, []);

  // 兜底 · 挡浏览器 Backspace 后退。只 preventDefault 不删字(删字由显示区 onKeyDown 负责,避免双删)。
  // 只在真正输入框外拦截:真 input/textarea 的 Backspace 是原生编辑行为,不能动。
  useEffect(() => {
    if (!guardBackspace) return;
    const guard = (e: KeyboardEvent) => {
      if (e.key !== 'Backspace') return;
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || t?.isContentEditable) return;
      e.preventDefault();
    };
    window.addEventListener('keydown', guard);
    return () => window.removeEventListener('keydown', guard);
  }, [guardBackspace]);

  // 监听绑在显示区 div 上 · 只在该区聚焦时处理,不影响页面其他按钮
  const onKeyDown = useCallback((e: ReactKeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Enter') { e.preventDefault(); onEnterRef.current?.(); return; }
    if (e.key === 'Backspace') { e.preventDefault(); backspace(); return; }
    if (e.key === ' ') { e.preventDefault(); space(); flashKey(' '); return; }
    if (e.key === 'Tab') return; // 保留 Tab 焦点导航

    const jamo = qwertyKeyToJamo(e.key, e.shiftKey);
    if (jamo) {
      e.preventDefault();
      inputJamo(jamo);
      flashKey(e.key.toLowerCase());
    }
  }, [backspace, space, inputJamo, flashKey]);

  return {
    text, pressedKey, inputJamo, backspace, space, reset, syncExternal,
    keyProps: { tabIndex: 0, onKeyDown },
  };
}
