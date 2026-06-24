'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { speak as speakKorean } from '@/lib/tts';
import { db } from '@/lib/db';
import { playClick, playSuccess } from '@/lib/soundManager';
import DOMPurify from 'isomorphic-dompurify';

async function loadSavedKoreanWords(): Promise<Set<string>> {
  try {
    const all = await db.words.orderBy('id').limit(2000).toArray();
    return new Set(all.map((w) => w.word));
  } catch {
    return new Set();
  }
}

async function saveToDb(korean: string, chinese: string): Promise<boolean> {
  try {
    const existing = await db.words.where('word').equals(korean).first();
    if (existing) return false;
    await db.words.add({
      id: crypto.randomUUID(),
      word: korean,
      pronunciation: '',
      meaning: chinese,
      partOfSpeech: '',
      examples: [],
      sourceEntryId: undefined,
      mastery: 'new',
      srsLevel: 0,
      nextReview: 0,
      easeFactor: 2.5,
      interval: 0,
      createdAt: Date.now(),
      lastReviewed: null,
    });
    return true;
  } catch {
    return false;
  }
}

export default function ArticleContent({
  html,
}: {
  html: string;
  basePath?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const safeHtml = useMemo(() => {
    // DOMPurify strips <style> as a "head" element even with ADD_TAGS.
    // Extract it before sanitization, sanitize only the body, then recombine.
    const styleMatch = html.match(/<style>[\s\S]*?<\/style>/);
    const styleTag = styleMatch ? styleMatch[0] : '';
    const bodyOnly = html.replace(/<style>[\s\S]*?<\/style>/, '');
    const cleanBody = DOMPurify.sanitize(bodyOnly);
    return styleTag + cleanBody;
  }, [html]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Restore saved word state from db
    let savedWords = new Set<string>();
    loadSavedKoreanWords().then((words) => {
      savedWords = words;
      const phraseItems = container.querySelectorAll('.phrase-item');
      phraseItems.forEach((item) => {
        const ko = item.querySelector('.phrase-ko');
        const addBtn = item.querySelector<HTMLElement>('.add-btn');
        if (ko && addBtn && savedWords.has(ko.textContent?.replace('🔊', '').trim() || '')) {
          addBtn.classList.add('saved');
          addBtn.textContent = '✓';
        }
      });
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
          playClick();
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
        playClick();
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
          saveToDb(korean, chinese);
          playSuccess();
          addBtn.classList.add('saved');
          addBtn.textContent = '✓';
          showToast('已加入单词本：' + korean);
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
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
