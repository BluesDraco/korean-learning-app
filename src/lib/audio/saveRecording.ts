'use client';

// 跟读录音统一存储：元数据走云端(db.recordings)，音频 Blob 只存本地 IndexedDB(voiceStore)。
// 与 companion/practice 的语音消息共用同一本地 store，按 id 索引，互不碰撞。
// 新记录不再写 audio_data(base64)，云库不膨胀；旧日记 base64 录音仍由读取页兼容播放。

import { db } from '@/lib/db';
import { putVoice, deleteVoice } from './voiceStore';

export interface SaveRecordingInput {
  blob: Blob;
  durationMs: number;
  type: string;         // 'shadowing' | 'pronunciation' | 'retell'
  sourceType: string;   // 分类主键：'tori-diary' | 'reading' | 'phonetics' | 'speaking-shadow' | 'speaking-retell'
  sourceId?: string;
  lineId?: string;
  korean?: string;
  userId?: string;
}

// 成功返回记录 id；未登录或存储失败返回 null(调用方据此给 UI 反馈)。
export async function saveRecording(input: SaveRecordingInput): Promise<string | null> {
  if (!input.userId) return null;
  const id = crypto.randomUUID();
  let voiceStored = false;
  try {
    await putVoice(id, input.blob);
    voiceStored = true;
    await db.recordings.add({
      id,
      userId: input.userId,
      type: input.type,
      sourceType: input.sourceType,
      source_type: input.sourceType,
      sourceId: input.sourceId,
      source_id: input.sourceId,
      lineId: input.lineId,
      line_id: input.lineId,
      korean: input.korean,
      // audio_url 列 NOT NULL 无默认值：音频本体存本地 voiceStore，云端占位空串
      audioUrl: '',
      audio_url: '',
      audioData: '',
      audio_data: '',
      durationMs: input.durationMs,
      duration_ms: input.durationMs,
      createdAt: Date.now(),
    });
    return id;
  } catch {
    // 元数据写入失败：回滚已存的本地 blob，避免孤儿
    if (voiceStored) await deleteVoice(id);
    return null;
  }
}
