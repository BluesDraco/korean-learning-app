'use client';

// 语音消息音频的本地存储（IndexedDB）。按消息 id 存 Blob。
// 消息文本走云端持久化（100KB JSON 上限），音频本体只留本地——刷新/重进可回放，仅同设备。
// 原生 IDB，无依赖。

const DB_NAME = 'tori-voice';
const STORE = 'voice';
const VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const req = run(db.transaction(STORE, mode).objectStore(STORE));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      }),
  );
}

export function putVoice(id: string, blob: Blob): Promise<void> {
  return tx('readwrite', (s) => s.put(blob, id)).then(() => undefined);
}

// 返回可播放的 object URL（调用方负责在卸载时 revoke）。无音频返回 null。
export async function getVoiceURL(id: string): Promise<string | null> {
  try {
    const blob = await tx<Blob | undefined>('readonly', (s) => s.get(id));
    return blob ? URL.createObjectURL(blob) : null;
  } catch {
    return null;
  }
}

export function deleteVoice(id: string): Promise<void> {
  return tx('readwrite', (s) => s.delete(id)).then(() => undefined).catch(() => undefined);
}
