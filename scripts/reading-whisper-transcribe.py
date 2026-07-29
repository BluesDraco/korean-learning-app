"""
用 faster-whisper (large-v3) 对阅读文章 mp3 做词级时间戳转写。
输出 D:/pytools/reading-align/{id}.json，供 reading-align-timings.mjs 映射回 audioTimings。

只转写 D:/pytools/reading-need.txt 里列出且 json 尚未生成的篇，可断点续跑。

用法（venv 的 python）：
  D:/pytools/whisper-venv/Scripts/python.exe scripts/reading-whisper-transcribe.py
"""
import os, sys, json, glob

os.environ.setdefault("HF_HOME", "D:/pytools/hf-home")
os.environ.setdefault("HUGGINGFACE_HUB_CACHE", "D:/pytools/hf-home/hub")

from faster_whisper import WhisperModel

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_ROOT = os.path.join(ROOT, "public", "audio", "reading")
OUT_DIR = "D:/pytools/reading-align"
NEED_FILE = "D:/pytools/reading-need.txt"
os.makedirs(OUT_DIR, exist_ok=True)

need = set()
if os.path.exists(NEED_FILE):
    with open(NEED_FILE, encoding="utf-8") as f:
        need = {ln.strip() for ln in f if ln.strip()}
print(f"待转写清单 {len(need)} 篇", flush=True)

print("加载 large-v3 模型...", flush=True)
model = WhisperModel("large-v3", device="cpu", compute_type="int8",
                     download_root="D:/pytools/hf-home/faster-whisper")
print("模型就绪。", flush=True)

# reading mp3 是扁平的 reading/*.mp3
mp3s = sorted(glob.glob(os.path.join(AUDIO_ROOT, "*.mp3")))
done, skipped = 0, 0
for mp3 in mp3s:
    ep_id = os.path.splitext(os.path.basename(mp3))[0]
    if need and ep_id not in need:
        continue
    out = os.path.join(OUT_DIR, ep_id + ".json")
    if os.path.exists(out):
        skipped += 1
        continue
    print(f"转写 {ep_id} ...", flush=True)
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
    print(f"  {ep_id}: {len(words)} 词, 音频 {info.duration:.1f}s", flush=True)

print(f"完成：新转写 {done} 篇，跳过 {skipped} 篇。输出 {OUT_DIR}", flush=True)
