'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { BlogPostScore, BlogComment, BlogUserStats, BlogCategory, BlogImage } from '@/types';
import { getBlogAuthor } from '@/data/blogCast';
import { templatesForDay, splitTemplate, composeFilled, type FillTemplate } from '@/data/blogFillTemplates';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { FloatingKoreanKeyboard } from '@/components/FloatingKoreanKeyboard';
import { useIsDesktop } from '@/lib/useIsMobile';

type Mode = 'fill' | 'free';

interface PostResult {
  [k: string]: unknown;
  slug: string;
  aiStatus: 'passed' | 'blocked';
  aiReason?: string;
  score?: BlogPostScore;
  reply?: BlogComment;
  stats?: BlogUserStats;
  joinContest?: boolean;
}

// 草稿：输入时实时存 localStorage，重开恢复，发帖成功清除，超 7 天作废
const DRAFT_KEY = 'blog-composer-draft';
const DRAFT_TTL = 7 * 24 * 60 * 60 * 1000;
const MAX_IMAGES = 10;

interface Draft {
  [k: string]: unknown;
  mode: Mode;
  text: string;
  blanks: string[];
  tplId: string;
  images: BlogImage[];
  category: BlogCategory;
  savedAt: number;
}

// 读出图片真实像素宽高（自适应比例用）。加载失败兜底 1:1，不阻断发帖。
function readImageSize(url: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve({ w: img.naturalWidth || 1, h: img.naturalHeight || 1 });
    img.onerror = () => resolve({ w: 1, h: 1 });
    img.src = url;
  });
}

// 客户端压缩：等比缩到最长边 1280，从 q=0.85 逐级降质到 ≤480KB（服务端硬限 500KB）。
// 统一输出 image/jpeg（与服务端「落盘转 jpg」一致）。失败则返回原文件交服务端裁决。
const UPLOAD_TARGET_BYTES = 480 * 1024;
const MAX_EDGE = 1280;
async function compressImage(file: File): Promise<File> {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale);
    const h = Math.round(bmp.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) { bmp.close(); return file; }
    ctx.fillStyle = '#fff'; // 透明 PNG 转 JPEG 时透明区填白，避免黑底
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(bmp, 0, 0, w, h);
    bmp.close();
    for (let q = 0.85; q >= 0.5; q -= 0.1) {
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/jpeg', q));
      if (blob && (blob.size <= UPLOAD_TARGET_BYTES || q <= 0.5)) {
        return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' });
      }
    }
    return file;
  } catch {
    return file;
  }
}

const CATEGORIES: { key: BlogCategory; label: string; desc: string }[] = [
  { key: '서울 일기', label: 'blog.cat_label_seoul', desc: 'blog.cat_desc_seoul' },
  { key: '일상', label: 'blog.cat_label_daily', desc: 'blog.cat_desc_daily' },
  { key: '문화 노트', label: 'blog.cat_label_culture', desc: 'blog.cat_desc_culture' },
  { key: '속담', label: 'blog.cat_label_proverb', desc: 'blog.cat_desc_proverb' },
];

// 提交后的分步进度（覆盖遮罩）：内容审核 → AI 评分 → 生成回应
const STEPS = [
  { key: 'moderate', label: 'blog.step_moderate', ms: 10_000 },
  { key: 'score', label: 'blog.step_score', ms: 20_000 },
  { key: 'reply', label: 'blog.step_reply', ms: 5_000 },
];

// 发帖弹层：双模式（填空/自由）+ 配图 + 分类，提交后展示评分卡。
export default function BlogComposer({
  onClose,
  onPosted,
  currentDay,
}: {
  onClose: () => void;
  onPosted: (stats: BlogUserStats) => void;
  currentDay: number;
}) {
  const { lang } = useLang();
  const isDesktop = useIsDesktop();
  const templates = templatesForDay(currentDay);
  const [mode, setMode] = useState<Mode>('fill');
  const [text, setText] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [tpl, setTpl] = useState<FillTemplate>(() => templates[Math.floor(Math.random() * templates.length)]);
  const [blanks, setBlanks] = useState<string[]>(() => templates[0] ? [] : []);
  const [category, setCategory] = useState<BlogCategory>('서울 일기');
  const [images, setImages] = useState<BlogImage[]>([]);
  const [joinContest, setJoinContest] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState('');
  const [result, setResult] = useState<PostResult | null>(null);
  const [draftRestored, setDraftRestored] = useState(false);

  // 分步进度状态
  const [stepIdx, setStepIdx] = useState(0);
  const [slowNet, setSlowNet] = useState(false);
  const stepTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // 填空模式：当前模板拼出的完整句
  const blankCount = mode === 'fill' ? splitTemplate(tpl.template).length - 1 : 0;
  const filledText = mode === 'fill' ? composeFilled(tpl.template, blanks) : text.trim();
  const allBlanksFilled = mode !== 'fill' || blanks.slice(0, blankCount).every((b) => b?.trim());

  // ── 草稿恢复（挂载一次）──
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const d = JSON.parse(raw) as Draft;
      if (!d || Date.now() - d.savedAt > DRAFT_TTL) {
        localStorage.removeItem(DRAFT_KEY);
        return;
      }
      if (d.mode) setMode(d.mode);
      if (typeof d.text === 'string') setText(d.text);
      if (Array.isArray(d.blanks)) setBlanks(d.blanks);
      if (Array.isArray(d.images)) setImages(d.images);
      if (d.category) setCategory(d.category);
      const found = templates.find((t) => t.id === d.tplId);
      if (found) setTpl(found);
      if (d.text?.trim() || d.blanks?.some((b) => b?.trim()) || d.images?.length) setDraftRestored(true);
    } catch {
      /* 草稿损坏，忽略 */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 草稿实时保存（内容变化时；已出结果就不再存）──
  useEffect(() => {
    if (result) return;
    const hasContent = text.trim() || blanks.some((b) => b?.trim()) || images.length;
    if (!hasContent) return;
    const d: Draft = { mode, text, blanks, tplId: tpl.id, images, category, savedAt: Date.now() };
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    } catch {
      /* 存储满/隐私模式，忽略 */
    }
  }, [mode, text, blanks, tpl.id, images, category, result]);

  const clearDraft = () => {
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* 忽略 */ }
  };

  useEffect(() => () => stepTimers.current.forEach(clearTimeout), []);

  const requestClose = () => {
    if (submitting) return; // 评分中不允许关
    if (!result && (text.trim() || blanks.some((b) => b?.trim()) || images.length)) {
      if (!window.confirm(`草稿会保存下来，确定关闭吗？· ${t('blog.close_draft_confirm', lang)}`)) return;
    }
    onClose();
  };

  // 逐张上传（可多选），每张传完读出真实宽高追加进 images。达上限忽略多余。
  const uploadFiles = async (files: FileList) => {
    const room = MAX_IMAGES - images.length;
    if (room <= 0) { setErr(t('blog.max_images', lang, { n: MAX_IMAGES })); return; }
    setUploading(true);
    setErr('');
    try {
      for (const raw of Array.from(files).slice(0, room)) {
        if (!raw.type.startsWith('image/')) {
          setErr(t('blog.upload_failed', lang));
          continue;
        }
        const file = await compressImage(raw);
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/blog/upload', { method: 'POST', body: form });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          setErr(j.error ?? t('blog.upload_failed', lang));
          continue;
        }
        const { url } = await res.json();
        const { w, h } = await readImageSize(url);
        setImages((prev) => (prev.length >= MAX_IMAGES ? prev : [...prev, { url, w, h }]));
      }
    } catch {
      setErr(t('blog.network_error', lang));
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (i: number) => setImages((prev) => prev.filter((_, k) => k !== i));

  // 分步进度推进：定时把当前步往后走，超 40s 提示网络慢
  const startStepProgress = useCallback(() => {
    setStepIdx(0);
    setSlowNet(false);
    stepTimers.current.forEach(clearTimeout);
    stepTimers.current = [];
    let acc = 0;
    STEPS.forEach((s, i) => {
      acc += s.ms;
      if (i < STEPS.length - 1) {
        stepTimers.current.push(setTimeout(() => setStepIdx(i + 1), acc));
      }
    });
    stepTimers.current.push(setTimeout(() => setSlowNet(true), 40_000));
  }, []);

  const submit = async () => {
    const body = mode === 'fill'
      ? { text: filledText, mode, targetGrammar: tpl.grammar, category, images, joinContest }
      : { text: text.trim(), mode, category, images, joinContest };
    if (!filledText.trim() || submitting) return;
    if (mode === 'fill' && !allBlanksFilled) { setErr(t('blog.fill_all_blanks', lang)); return; }
    setSubmitting(true);
    setErr('');
    startStepProgress();
    try {
      const res = await fetch('/api/blog/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      stepTimers.current.forEach(clearTimeout);
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setErr(j.error ?? t('blog.post_failed', lang));
        setSubmitting(false);
        return;
      }
      const data = (await res.json()) as PostResult;
      clearDraft();
      setResult(data);
      if (data.stats) onPosted(data.stats);
    } catch {
      stepTimers.current.forEach(clearTimeout);
      setErr(t('blog.network_error', lang));
      setSubmitting(false);
    }
  };

  // ── 提交中：分步进度面板 ──
  if (submitting && !result) {
    return (
      <div className="blog-composer-overlay">
        <div className="blog-progress-panel" onClick={(e) => e.stopPropagation()}>
          <div className="blog-progress-title">{t('blog.publishing', lang)}</div>
          <div className="blog-progress-steps">
            {STEPS.map((s, i) => {
              const state = i < stepIdx ? 'done' : i === stepIdx ? 'active' : 'todo';
              return (
                <div className={`blog-progress-step ${state}`} key={s.key}>
                  <span className="blog-progress-dot">
                    {state === 'done' ? '✓' : state === 'active' ? <i className="blog-progress-spin" /> : i + 1}
                  </span>
                  <span className="blog-progress-label">{t(s.label, lang)}</span>
                </div>
              );
            })}
          </div>
          <div className="blog-progress-foot">
            {slowNet ? t('blog.slow_net', lang) : t('blog.usual_wait', lang)}
          </div>
        </div>
      </div>
    );
  }

  // 一审被拦截视图
  if (result && result.aiStatus === 'blocked') {
    return (
      <div className="blog-composer-overlay" onClick={onClose}>
        <div className="blog-score-card blog-score-blocked" onClick={(e) => e.stopPropagation()}>
          <div className="blog-blocked-icon">🚫</div>
          <div className="blog-blocked-title">{t('blog.blocked_title', lang)}</div>
          <div className="blog-blocked-reason">{t(result.aiReason || 'blog.blocked_default_reason', lang)}</div>
          <div className="blog-blocked-hint">{t('blog.blocked_hint', lang)}</div>
          <button type="button" className="blog-score-done" onClick={onClose}>
            {t('blog.ok_button', lang)}
          </button>
        </div>
      </div>
    );
  }

  // 一审通过 + 评分结果视图
  if (result && result.score && result.reply) {
    const animal = getBlogAuthor(result.reply.animalId);
    const { score } = result;
    return (
      <div className="blog-composer-overlay" onClick={onClose}>
        <div className="blog-score-card" onClick={(e) => e.stopPropagation()}>
          <div className="blog-score-xp">+{score.xpEarned} XP</div>
          <div className="blog-score-overall">{t('blog.score_points', lang, { n: score.overall })}</div>
          <div className="blog-score-dims">
            <span>{t('blog.dim_grammar', lang)} {score.dimensions.grammar}</span>
            <span>{t('blog.dim_vocabulary', lang)} {score.dimensions.vocabulary}</span>
            <span>{t('blog.dim_expression', lang)} {score.dimensions.expression}</span>
          </div>
          <div className="blog-score-comment">{score.comment}</div>

          <div className="blog-score-reply">
            <span className="blog-score-reply-who">{animal.emoji} {animal.name}</span>
            <span className="blog-score-reply-ko">{result.reply.ko}</span>
            <span className="blog-score-reply-zh">{result.reply.zh}</span>
          </div>

          {result.joinContest && (
            <div className="blog-score-contest">{t('blog.contest_joined', lang)}</div>
          )}

          <button type="button" className="blog-score-done" onClick={onClose}>
            {t('blog.confirm', lang)}
          </button>
        </div>
      </div>
    );
  }

  const tplParts = splitTemplate(tpl.template);

  return (
    <div className="blog-composer-overlay" onClick={requestClose}>
      <div className="blog-composer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="blog-composer-head">
          <span className="blog-composer-title">{t('blog.composer_title', lang)}</span>
          <button type="button" className="blog-composer-x" onClick={requestClose} aria-label={t('blog.aria_close', lang)}>✕</button>
        </div>

        {draftRestored && (
          <div className="blog-composer-draft-note">{t('blog.draft_restored', lang)} ✍️</div>
        )}

        <div className="blog-composer-tabs">
          <button
            type="button"
            className={`blog-composer-tab${mode === 'fill' ? ' active' : ''}`}
            onClick={() => setMode('fill')}
          >
            {t('blog.mode_fill', lang)}
          </button>
          <button
            type="button"
            className={`blog-composer-tab${mode === 'free' ? ' active' : ''}`}
            onClick={() => setMode('free')}
          >
            {t('blog.mode_free', lang)}
          </button>
        </div>

        {/* 分类选择 */}
        <div className="blog-composer-cats">
          {CATEGORIES.map((c) => (
            <button
              type="button"
              key={c.key}
              className={`blog-composer-cat${category === c.key ? ' active' : ''}`}
              onClick={() => setCategory(c.key)}
            >
              {t(c.label, lang)}
            </button>
          ))}
        </div>
        <div className="blog-composer-cat-desc">
          {t(CATEGORIES.find((c) => c.key === category)?.desc ?? '', lang)}
        </div>

        {mode === 'fill' ? (
          <div className="blog-fill">
            <div className="blog-fill-grammar">
              {t('blog.today_grammar', lang)} · <b>{tpl.grammar}</b>
              {templates.length > 1 && (
                <button
                  type="button"
                  className="blog-fill-shuffle"
                  onClick={() => {
                    const others = templates.filter((t) => t.id !== tpl.id);
                    const next = others[Math.floor(Math.random() * others.length)];
                    setTpl(next);
                    setBlanks([]);
                  }}
                >
                  🔄 {t('blog.shuffle_grammar', lang)}
                </button>
              )}
            </div>
            <div className="blog-fill-template">
              {tplParts.map((part, i) => (
                <span key={i} className="blog-fill-seg">
                  {part}
                  {i < tplParts.length - 1 && (
                    <input
                      className="blog-fill-input"
                      value={blanks[i] ?? ''}
                      placeholder={tpl.blanks[i] ?? ''}
                      onChange={(e) => {
                        setBlanks((prev) => {
                          const next = [...prev];
                          next[i] = e.target.value;
                          return next;
                        });
                      }}
                    />
                  )}
                </span>
              ))}
            </div>
            <div className="blog-fill-preview">
              <span className="blog-fill-preview-label">{t('blog.preview', lang)}</span>
              <span className="blog-fill-preview-text">{filledText}</span>
            </div>
          </div>
        ) : (
          <>
            <div className="blog-composer-hint">{t('blog.composer_hint', lang)}</div>
            <textarea
              className="blog-composer-textarea"
              value={text}
              maxLength={1000}
              placeholder={t('blog.composer_textarea_placeholder', lang)}
              onChange={(e) => setText(e.target.value)}
            />
            {isDesktop && (
            <button
              type="button"
              onClick={() => setShowKeyboard(v => !v)}
              aria-label={t('keyboard.toggle', lang)}
              style={{
                marginTop: 6, padding: '4px 12px', borderRadius: 99, fontSize: 13, fontWeight: 700,
                border: 'none', cursor: 'pointer',
                background: showKeyboard ? 'var(--hr-purple-soft)' : 'var(--hr-surface-2)',
                color: showKeyboard ? 'var(--hr-purple-strong)' : 'var(--hr-ink-3)',
              }}
            >⌨️ {t('keyboard.toggle', lang)}</button>
            )}
            {isDesktop && <FloatingKoreanKeyboard value={text} onChange={setText} visible={showKeyboard} onClose={() => setShowKeyboard(false)} />}
          </>
        )}

        <div className="blog-composer-thumbs">
          {images.map((img, i) => (
            <div className="blog-composer-thumb" key={`${img.url}-${i}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={t('blog.composer_image_alt', lang, { n: i + 1 })} />
              <button
                type="button"
                className="blog-composer-thumb-x"
                aria-label={t('blog.composer_delete_image', lang)}
                onClick={() => removeImage(i)}
              >
                ✕
              </button>
            </div>
          ))}
          {images.length < MAX_IMAGES && (
            <label className="blog-composer-add-photo">
              {uploading ? '⏳' : '＋'}
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                disabled={uploading}
                onChange={(e) => {
                  if (e.target.files?.length) void uploadFiles(e.target.files);
                  e.target.value = '';
                }}
              />
            </label>
          )}
        </div>

        <label className="blog-composer-contest">
          <input
            type="checkbox"
            checked={joinContest}
            onChange={(e) => setJoinContest(e.target.checked)}
          />
          <span>
            <b>{t('blog.contest_join_label', lang)}</b>
            <em>{t('blog.contest_join_desc', lang)}</em>
          </span>
        </label>

        {err && <div className="blog-composer-err">{err}</div>}

        <button
          type="button"
          className="blog-composer-post"
          disabled={!filledText.trim() || !allBlanksFilled || submitting || uploading}
          onClick={submit}
        >
          {t('blog.publish', lang)}
        </button>
      </div>
    </div>
  );
}
