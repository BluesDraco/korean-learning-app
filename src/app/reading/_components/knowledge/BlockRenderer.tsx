'use client';

import { useCallback, useEffect, useState } from 'react';
import { Volume2, Plus, Check } from 'lucide-react';
import { speakWord } from '@/lib/tts';
import { db, ensureFavoritesBook } from '@/lib/db';
import { stripParticle } from '@/lib/koreanParticles';
import { playClick, playSuccess } from '@/lib/soundManager';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import type { KBBlock } from '@/data/reading-knowledge';

// 加生词本：复刻 ArticleReaderClient.toggleSaveWord 的 db 契约。
// strip=true 时去尾部助词（单词用），整句短语不 strip。
async function saveWord(ko: string, ro: string, zh: string, sourceTitle: string, strip: boolean): Promise<boolean> {
  const word = strip ? stripParticle(ko) : ko;
  try {
    const exists = await db.words.where('word').equals(word).first();
    let wordId: string;
    if (!exists) {
      wordId = crypto.randomUUID();
      await db.words.put({
        id: wordId, word, pronunciation: ro || '', meaning: zh,
        partOfSpeech: 'word', examples: [], source: 'reading',
        sourceDetail: sourceTitle, mastery: 'new', srsLevel: 0,
        easeFactor: 2.5, interval: 0, nextReview: Date.now(),
        correctCount: 0, wrongCount: 0, createdAt: Date.now(), lastReviewed: null,
      });
    } else {
      wordId = exists.id;
    }
    const bookId = await ensureFavoritesBook();
    const book = await db.wordBooks.get(bookId);
    if (book && !book.wordIds.includes(wordId)) {
      await db.wordBooks.update(bookId, { wordIds: [...book.wordIds, wordId], updatedAt: Date.now() });
    }
    return true;
  } catch {
    return false;
  }
}

// 词卡：点韩语发音 + 加生词本按钮。phrase（整句）与 vocab（单词）共用。
function WordCard({
  ko, ro, zh, scene, sourceTitle, strip, saved, onSave, lang,
}: {
  ko: string; ro?: string; zh: string; scene?: string;
  sourceTitle: string; strip: boolean; saved: boolean; onSave: (key: string) => void;
  lang: string;
}) {
  const speak = useCallback(() => { playClick(); speakWord(ko); }, [ko]);
  const add = useCallback(async () => {
    if (saved) return;
    const ok = await saveWord(ko, ro ?? '', zh, sourceTitle, strip);
    if (ok) { playSuccess(); onSave(ko); }
  }, [ko, ro, zh, sourceTitle, strip, saved, onSave]);

  return (
    <div className="kb-word-card">
      <button className="kb-word-add" onClick={add} aria-label={saved ? t('wcard.saved', lang as 'zh' | 'en' | 'zh-TW') : t('wcard.add', lang as 'zh' | 'en' | 'zh-TW')} data-saved={saved}>
        {saved ? <Check size={13} /> : <Plus size={13} />}
      </button>
      <button className="kb-word-ko" onClick={speak}>
        <span>{ko}</span>
        <Volume2 size={13} className="kb-word-spk" />
      </button>
      {ro && <div className="kb-word-ro">{ro}</div>}
      {scene && <div className="kb-word-scene">{scene}</div>}
      <div className="kb-word-zh">{zh}</div>
    </div>
  );
}

function Block({ block, sourceTitle, saved, onSave, onOpen, lang }: {
  block: KBBlock; sourceTitle: string;
  saved: Set<string>; onSave: (key: string) => void;
  onOpen: (slug: string) => void;
  lang: string;
}) {
  switch (block.type) {
    case 'intro':
      return <p className="kb-intro">{block.text}</p>;

    case 'toriQuote':
      return (
        <blockquote className="kb-quote">
          {block.label && <span className="kb-quote-label">{block.label}</span>}
          <span className="kb-quote-text">{block.text}</span>
        </blockquote>
      );

    case 'sectionBreak':
      return <div className="kb-break"><span>· · ·</span></div>;

    case 'sectionTitle':
      return (
        <div className="kb-sec-title">
          <span className="kb-sec-emoji">{block.emoji}</span>
          <div>
            <h2>{block.title}</h2>
            {block.sub && <span className="kb-sec-sub">{block.sub}</span>}
          </div>
        </div>
      );

    case 'paragraph':
      return (
        <div className="kb-para">
          {block.heading && <h3 className="kb-para-h">{block.heading}</h3>}
          <p>{block.text}</p>
        </div>
      );

    case 'highlight':
      return (
        <div className={`kb-highlight kb-highlight-${block.variant}`}>
          {block.title && <strong>{block.title}</strong>}
          <span>{block.text}</span>
        </div>
      );

    case 'cardGrid':
      return (
        <div className={`kb-grid kb-grid-${block.variant}`}>
          {block.cards.map((c, i) => (
            <div className="kb-card" key={i}>
              {c.emoji && <div className="kb-card-emoji">{c.emoji}</div>}
              <div className="kb-card-head">
                {c.ko && (
                  <button className="kb-card-ko" onClick={() => { playClick(); speakWord(c.ko!); }}>
                    <span>{c.ko}</span>
                    <Volume2 size={12} className="kb-card-spk" />
                  </button>
                )}
                {c.zh && <span className="kb-card-zh">{c.zh}</span>}
              </div>
              {c.ro && <div className="kb-card-ro">{c.ro}</div>}
              {c.tags && c.tags.length > 0 && (
                <div className="kb-card-tags">{c.tags.map((t, j) => <span key={j}>{t}</span>)}</div>
              )}
              {c.desc && <div className="kb-card-desc">{c.desc}</div>}
              {c.price && <div className="kb-card-price">{c.price}</div>}
              {c.tip && <div className="kb-card-tip">💡 {c.tip}</div>}
            </div>
          ))}
        </div>
      );

    case 'featureCard':
      return (
        <div className="kb-feature">
          <div className="kb-feature-head">
            {block.emoji && <span className="kb-feature-emoji">{block.emoji}</span>}
            <h3>{block.title}</h3>
          </div>
          {block.desc && <p className="kb-feature-desc">{block.desc}</p>}
          {block.scenes && block.scenes.length > 0 && (
            <div className="kb-scenes">
              {block.scenes.map((s, i) => (
                <div className="kb-scene-line" key={i}>
                  {s.speaker && <span className="kb-scene-spk">{s.speaker}</span>}
                  <button className="kb-scene-ko" onClick={() => { playClick(); speakWord(s.ko); }}>
                    <span>{s.ko}</span>
                    <Volume2 size={12} className="kb-scene-spk-icon" />
                  </button>
                  {s.ro && <span className="kb-scene-ro">{s.ro}</span>}
                  <span className="kb-scene-zh">{s.zh}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case 'table':
      return (
        <div className="kb-table-wrap">
          <table className="kb-table">
            <thead><tr>{block.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'steps':
      return (
        <div className="kb-steps">
          {block.steps.map((s, i) => (
            <div className="kb-step" key={i}>
              <div className="kb-step-num">{i + 1}</div>
              <div className="kb-step-body">
                <div className="kb-step-label">{s.label}</div>
                {s.desc && <div className="kb-step-desc">{s.desc}</div>}
                {s.ko && (
                  <button className="kb-step-ko" onClick={() => { playClick(); speakWord(s.ko!); }}>
                    <span>{s.ko}</span>
                    {s.zh && <span className="kb-step-ko-zh">— {s.zh}</span>}
                    <Volume2 size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      );

    case 'dialog':
      return (
        <div className="kb-dialog">
          {block.lines.map((l, i) => (
            <div className="kb-dialog-row" key={i}>
              <span className="kb-dialog-spk">{l.speaker}</span>
              <button className="kb-dialog-ko" onClick={() => { playClick(); speakWord(l.ko); }}>
                {l.ko} <Volume2 size={12} />
              </button>
              {l.ro && <span className="kb-dialog-ro">{l.ro}</span>}
              <span className="kb-dialog-zh">{l.zh}</span>
            </div>
          ))}
        </div>
      );

    case 'timeline':
      return (
        <div className="kb-timeline">
          {block.items.map((it, i) => (
            <div className="kb-time-card" key={i}>
              {it.emoji && <div className="kb-time-emoji">{it.emoji}</div>}
              <div className="kb-time-label">{it.label}</div>
              <div className="kb-time-desc">{it.desc}</div>
            </div>
          ))}
        </div>
      );

    case 'compareVs':
      return (
        <div className="kb-vs">
          {[block.left, block.right].map((col, i) => (
            <div className={`kb-vs-col kb-vs-col-${i === 0 ? 'a' : 'b'}`} key={i}>
              <div className="kb-vs-title">{col.title}</div>
              <ul>{col.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      );

    case 'trivia':
      return (
        <div className="kb-trivia">
          {block.items.map((it, i) => (
            <div className="kb-trivia-card" key={i}>
              <span className="kb-trivia-tag">{it.tag}</span>
              <div className="kb-trivia-q">{it.q}</div>
              <div className="kb-trivia-a">{it.a}</div>
            </div>
          ))}
        </div>
      );

    case 'phraseList':
      return (
        <div className="kb-wordsec">
          <div className="kb-wordsec-head">
            <span className="kb-wordsec-emoji">🐰</span>
            <div>
              <h3>{block.title ?? '토리 教你说'}</h3>
              {block.sub && <span className="kb-wordsec-sub">{block.sub}</span>}
            </div>
          </div>
          <div className="kb-word-grid">
            {block.items.map((p, i) => (
              <WordCard key={i} ko={p.ko} ro={p.ro} zh={p.zh} scene={p.scene}
                sourceTitle={sourceTitle} strip={false} saved={saved.has(p.ko)} onSave={onSave} lang={lang} />
            ))}
          </div>
        </div>
      );

    case 'vocabList':
      return (
        <div className="kb-wordsec">
          <div className="kb-wordsec-head">
            <span className="kb-wordsec-emoji">📖</span>
            <div><h3>{block.title ?? '本篇出现的词汇'}</h3></div>
          </div>
          <div className="kb-word-grid kb-word-grid-compact">
            {block.items.map((v, i) => (
              <WordCard key={i} ko={v.ko} ro={v.ro} zh={v.zh}
                sourceTitle={sourceTitle} strip saved={saved.has(v.ko)} onSave={onSave} lang={lang} />
            ))}
          </div>
        </div>
      );

    case 'ending':
      return (
        <div className="kb-ending">
          <div className="kb-ending-tori">🐰</div>
          <p className="kb-ending-text">{block.text}</p>
          {block.next && (
            <button className="kb-ending-next" onClick={() => onOpen(block.next!.slug)}>
              {t('kb.next_article', lang as 'zh' | 'en' | 'zh-TW')}：{block.next.title} →
            </button>
          )}
        </div>
      );

    default:
      return null;
  }
}

export default function BlockRenderer({ blocks, sourceTitle, onOpen }: {
  blocks: KBBlock[]; sourceTitle: string; onOpen: (slug: string) => void;
}) {
  const { lang } = useLang();
  const [saved, setSaved] = useState<Set<string>>(new Set());

  // 恢复已保存词状态：本篇所有 phrase/vocab 的 ko，查 db.words 命中即高亮
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const keys: string[] = [];
      for (const b of blocks) {
        if (b.type === 'phraseList') keys.push(...b.items.map((i) => i.ko));
        if (b.type === 'vocabList') keys.push(...b.items.map((i) => i.ko));
      }
      if (keys.length === 0) return;
      try {
        const next = new Set<string>();
        for (const ko of keys) {
          const w = stripParticle(ko);
          const hit = await db.words.where('word').equals(w).first()
            || await db.words.where('word').equals(ko).first();
          if (hit) next.add(ko);
        }
        if (!cancelled && next.size > 0) setSaved(next);
      } catch { /* 未登录/无库：留空 */ }
    })();
    return () => { cancelled = true; };
  }, [blocks]);

  const onSave = useCallback((key: string) => {
    setSaved((prev) => new Set(prev).add(key));
  }, []);

  return (
    <div className="kb-article">
      {blocks.map((b, i) => (
        <Block key={i} block={b} sourceTitle={sourceTitle} saved={saved} onSave={onSave} onOpen={onOpen} lang={lang} />
      ))}
    </div>
  );
}
