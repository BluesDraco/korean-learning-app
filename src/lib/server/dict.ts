// 词典百科服务端加载器：按需读取 src/data/dict/*.json，模块级缓存。
// 仅服务端使用（API 路由），50k 词条不进客户端 bundle。
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { DictEntry, DictListItem } from '@/types';

const DICT_DIR = join(process.cwd(), 'src/data/dict');

export const DICT_INDEX = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','#'] as const;
export type DictInitial = (typeof DICT_INDEX)[number];

interface Manifest {
  [k: string]: unknown;
  total: number;
  withZhCount: number;
  onlyKoCount: number;
  index: string[];
  buckets: Record<string, { file: string; count: number }>;
  source: string;
}

let manifestCache: Manifest | null = null;
const bucketCache = new Map<string, DictEntry[]>();

export function getManifest(): Manifest {
  if (!manifestCache) {
    manifestCache = JSON.parse(readFileSync(join(DICT_DIR, 'manifest.json'), 'utf8'));
  }
  return manifestCache!;
}

function fileFor(initial: string): string {
  return initial === '#' ? 'etc' : `cho-${DICT_INDEX.indexOf(initial as DictInitial)}`;
}

export function getBucket(initial: string): DictEntry[] {
  if (!DICT_INDEX.includes(initial as DictInitial)) return [];
  if (!bucketCache.has(initial)) {
    try {
      const arr = JSON.parse(readFileSync(join(DICT_DIR, `${fileFor(initial)}.json`), 'utf8'));
      bucketCache.set(initial, arr);
    } catch {
      bucketCache.set(initial, []);
    }
  }
  return bucketCache.get(initial)!;
}

// 列表项：剥离义项详情，只留首义项速览字段
export function toListItem(e: DictEntry): DictListItem {
  const first = e.s[0];
  return {
    id: e.id,
    k: e.k,
    ...(e.h ? { h: e.h } : {}),
    ...(e.pos ? { pos: e.pos } : {}),
    ...(e.pron ? { pron: e.pron } : {}),
    ...(e.lv ? { lv: e.lv } : {}),
    ...(first?.zh ? { zh: first.zh } : {}),
    ...(first?.defZh ? { defZh: first.defZh } : {}),
    ...(!first?.zh && !first?.defZh && first?.defKo ? { defKo: first.defKo } : {}),
  };
}

let allCache: DictEntry[] | null = null;
function getAll(): DictEntry[] {
  if (!allCache) {
    allCache = DICT_INDEX.flatMap(getBucket);
  }
  return allCache;
}

// 搜索：中文对译/释义、韩文表题词、发音。轻量线性扫描（50k 条，服务端一次加载）
export function searchDict(q: string, limit = 60): DictListItem[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  const isHangul = /[가-힣]/.test(query);
  const all = getAll();
  const starts: DictEntry[] = [];
  const contains: DictEntry[] = [];
  for (const e of all) {
    let hit = 0; // 0=no 1=contains 2=startsWith
    if (isHangul) {
      if (e.k === query) hit = 2;
      else if (e.k.startsWith(query)) hit = 2;
      else if (e.k.includes(query)) hit = 1;
    } else {
      // 中文 / 发音
      for (const s of e.s) {
        if (s.zh?.toLowerCase().includes(query) || s.defZh?.includes(query)) { hit = s.zh?.startsWith(query) ? 2 : 1; break; }
      }
      if (!hit && e.pron?.toLowerCase().includes(query)) hit = 1;
    }
    if (hit === 2) starts.push(e);
    else if (hit === 1) contains.push(e);
    if (starts.length >= limit) break;
  }
  return [...starts, ...contains].slice(0, limit).map(toListItem);
}

export function getEntryById(id: string): DictEntry | null {
  return getAll().find(e => e.id === id) ?? null;
}
