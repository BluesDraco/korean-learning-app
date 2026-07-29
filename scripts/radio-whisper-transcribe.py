"""
用 faster-whisper (large-v3) 对电台 mp3 做词级时间戳转写。
输出 D:/pytools/radio-align/{id}.json，供 radio-align-subs.mjs 映射回字幕句边界。

只转写"磁盘上有 mp3 且尚未生成 json"的期，可重复安全运行（断点续跑）。

用法（venv 的 python）：
  D:/pytools/whisper-venv/Scripts/python.exe scripts/radio-whisper-transcribe.py
可选：只跑某档 -> 传 program 前缀参数，如 squirrel-morning
"""
import os, sys, json, glob

# 模型/缓存全部指向 D 盘，绝不写 C 盘
os.environ.setdefault("HF_HOME", "D:/pytools/hf-home")
os.environ.setdefault("HUGGINGFACE_HUB_CACHE", "D:/pytools/hf-home/hub")

from faster_whisper import WhisperModel

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_ROOT = os.path.join(ROOT, "public", "audio", "radio")
OUT_DIR = "D:/pytools/radio-align"
os.makedirs(OUT_DIR, exist_ok=True)

only_prog = sys.argv[1] if len(sys.argv) > 1 else None

# CPU int8：无 GPU 环境最省内存、够快；模型缓存落 D 盘
print("加载 large-v3 模型（首次会下载到 D:/pytools/hf-home）...", flush=True)
model = WhisperModel("large-v3", device="cpu", compute_type="int8",
                     download_root="D:/pytools/hf-home/faster-whisper")
print("模型就绪。", flush=True)

mp3s = sorted(glob.glob(os.path.join(AUDIO_ROOT, "*", "*.mp3")))
done, skipped = 0, 0
for mp3 in mp3s:
    ep_id = os.path.splitext(os.path.basename(mp3))[0]
    if only_prog and not ep_id.startswith(only_prog):
        continue
    out = os.path.join(OUT_DIR, ep_id + ".json")
    if os.path.exists(out):
        skipped += 1
        continue
    print(f"转写 {ep_id} ...", flush=True)
    # word_timestamps=True 拿到每个词的 start/end；language 锁 ko 避免误判
    segments, info = model.transcribe(mp3, language="ko", word_timestamps=True,
                                      vad_filter=True)
    words = []
    seg_list = []
    for seg in segments:
        seg_list.append({"start": seg.start, "end": seg.end, "text": seg.text})
        if seg.words:
            for w in seg.words:
                words.append({"start": w.start, "end": w.end, "word": w.word})
    with open(out, "w", encoding="utf-8") as f:
        json.dump({"id": ep_id, "duration": info.duration,
                   "segments": seg_list, "words": words}, f,
                  ensure_ascii=False, indent=0)
    done += 1
    print(f"  {ep_id}: {len(words)} 词, 音频 {info.duration:.1f}s -> {out}", flush=True)

print(f"完成：新转写 {done} 期，跳过 {skipped} 期（已存在）。输出目录 {OUT_DIR}", flush=True)
