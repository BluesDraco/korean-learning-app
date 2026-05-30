'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { speak as speakKorean } from '@/lib/tts';

const STORAGE_KEY = 'korea-saved-words';

function getSaved(): { ko: string; zh: string; addedAt: number }[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function saveWord(korean: string, chinese: string): boolean {
  const words = getSaved();
  if (!words.some((w) => w.ko === korean)) {
    words.push({ ko: korean, zh: chinese, addedAt: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
    return true;
  }
  return false;
}

export default function ArticleContent({
  html,
}: {
  html: string;
  basePath?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Restore saved word state
    const words = getSaved();
    const phraseItems = container.querySelectorAll('.phrase-item');
    phraseItems.forEach((item) => {
      const ko = item.querySelector('.phrase-ko');
      const addBtn = item.querySelector<HTMLElement>('.add-btn');
      if (ko && addBtn && words.some((w) => w.ko === ko.textContent?.replace('🔊', '').trim())) {
        addBtn.classList.add('saved');
        addBtn.textContent = '✓';
      }
    });

    function showToast(msg: string) {
      const c = containerRef.current;
      if (!c) return;
      const existing = c.querySelector('.ka-toast');
      if (existing) existing.remove();
      const t = document.createElement('div');
      t.className = 'ka-toast';
      t.textContent = msg;
      c.appendChild(t);
      requestAnimationFrame(() => t.classList.add('show'));
      setTimeout(() => {
        t.classList.remove('show');
        setTimeout(() => t.remove(), 300);
      }, 1800);
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      // Speak button
      const speakBtn = target.closest('.phrase-speak') as HTMLElement | null;
      if (speakBtn) {
        e.preventDefault();
        const phraseItem = speakBtn.closest('.phrase-item');
        const koEl = phraseItem?.querySelector('.phrase-ko');
        if (koEl) {
          const text = koEl.textContent?.replace('🔊', '').trim() || '';
          speakBtn.classList.add('speaking');
          speakKorean(text);
          setTimeout(() => speakBtn.classList.remove('speaking'), 800);
        }
        return;
      }

      // Click on phrase-ko text
      const koText = target.closest('.phrase-ko') as HTMLElement | null;
      if (koText) {
        const text = koText.textContent?.replace('🔊', '').trim() || '';
        const sb = koText.parentElement?.querySelector('.phrase-speak');
        if (sb) sb.classList.add('speaking');
        speakKorean(text);
        setTimeout(() => { if (sb) sb.classList.remove('speaking'); }, 800);
        return;
      }

      // Add to vocabulary button
      const addBtn = target.closest('.add-btn') as HTMLElement | null;
      if (addBtn) {
        e.preventDefault();
        if (addBtn.classList.contains('saved')) {
          showToast('已在单词本中');
          return;
        }
        const item = addBtn.closest('.phrase-item');
        if (!item) return;
        const ko = item.querySelector('.phrase-ko');
        const zh = item.querySelector('.phrase-zh');
        if (ko && zh) {
          const korean = ko.textContent?.replace('🔊', '').trim() || '';
          const chinese = zh.textContent?.trim() || '';
          if (saveWord(korean, chinese)) {
            addBtn.classList.add('saved');
            addBtn.textContent = '✓';
            showToast('已加入单词本：' + korean);
          } else {
            showToast('该单词已在单词本中');
          }
        }
        return;
      }

      // Navigation links inside article (next article, related links)
      const link = target.closest('a') as HTMLAnchorElement | null;
      if (link) {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('http')) {
          e.preventDefault();
          router.push(href);
        }
        return;
      }
    }

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [html, router]);

  return (
    <div
      ref={containerRef}
      className="korea-article"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
