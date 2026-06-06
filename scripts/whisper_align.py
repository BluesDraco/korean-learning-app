#!/usr/bin/env python3
"""
whisper_align.py — 用 faster-whisper 对齐 KPOP 歌词时间轴
对每首歌的 COS webm 音频做转录，输出逐句时间轴 JSON
用法: python3 whisper_align.py
输出: /tmp/kpop_timestamps/{videoId}.json
"""

import json
import os
import subprocess
import sys
import urllib.request
from pathlib import Path

COS_BASE = "https://torikorean-1436752408.cos.ap-hongkong.myqcloud.com/audio/kpop"
OUT_DIR = Path("/tmp/kpop_timestamps")
AUDIO_DIR = Path("/tmp/kpop_audio")
MODEL_SIZE = "small"  # small 在 CPU 上精度/速度平衡最好

VIDEO_IDS = [
    "0-q1KafFCLU","0lapF4DQPKQ","11cta61wi0g","2HcVZm_4qAI","2S24-y0Ij3Y",
    "7C2z4GqqS5E","7HDeem-JaSY","8dJyRm2jJ-U","8mA6jIeojnk","9pdj4iJD08s",
    "Amq-qlqbjYA","ArmDp-zijuc","CM4CkVFmTds","CuklIb9d3fI","D1PvIWdJ8xo",
    "D8VEhcPeSlc","EaswWiwMVs8","Hbb5GPxXF1w","IHNzOHi8sJs","J-wFp43XOrA",
    "J_CFBjAyPWE","Jh4QFaPmdss","MBdVXkSdhwU","MjCZfZfucEc","OvioeS1ZZ7o",
    "POe9SOEKotk","SxHmoifp0oQ","TQTlCHxyuu8","UBURTj20HXI",
    # VyQz1XZqDLg 跳过 (香港区域限制，COS 没有文件)
    "WMweEpGlu_U","WPdWvnAAurg","WyiIGEHQP8o","X-uJtV8ScYk","XsX3ATc3FbA",
    "Y4Zpm41f1VQ","Y8JFxS1HlDo","ZNZj64oIBqc","ZeerrnuLi5E","_ZAgIHmHLdc",
    "c9RzZpV460k","dYRITmpFbJ4","dyRsYk0LyA8","f5_wn8mexmM","fE2h3lGlOsk",
    "gQlMMD8auMs","gRnuFC4Ualw","gdZLi9oWNZg","jYSlpC6Ud2A","js1CtxSY38I",
    "kOHB85vDuow","pBuZEGYXA6E","pNfTK39k55U","pSUydWEqKwE","v7bnOxV4jAc",
    "z3szNvgQxHo","zuoSn3ObMz4",
]

OUT_DIR.mkdir(parents=True, exist_ok=True)
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

def download(video_id: str) -> Path | None:
    # 优先用已转换的 wav（如果存在），否则下载 webm 再转
    wav_path = AUDIO_DIR / f"{video_id}.wav"
    if wav_path.exists():
        return wav_path
    webm_path = AUDIO_DIR / f"{video_id}.webm"
    if not webm_path.exists():
        url = f"{COS_BASE}/{video_id}.webm"
        print(f"  下载 {url}")
        try:
            urllib.request.urlretrieve(url, webm_path)
        except Exception as e:
            print(f"  下载失败: {e}")
            return None
    # 用 ffmpeg 转为 wav 16kHz mono（whisper 标准输入）
    print(f"  转换为 wav...")
    ret = subprocess.run(
        ["ffmpeg", "-y", "-i", str(webm_path), "-ar", "16000", "-ac", "1", str(wav_path)],
        capture_output=True
    )
    if ret.returncode != 0:
        print(f"  ffmpeg 失败: {ret.stderr.decode()[:200]}")
        return None
    webm_path.unlink()  # 删除 webm 节省空间
    return wav_path

def transcribe(audio_path: Path, video_id: str) -> list[dict]:
    from faster_whisper import WhisperModel
    # 模型第一次运行时自动下载到 ~/.cache/huggingface
    model = WhisperModel(MODEL_SIZE, device="cpu", compute_type="int8")
    segments, info = model.transcribe(
        str(audio_path),
        language="ko",
        word_timestamps=True,
        vad_filter=True,
        vad_parameters={"min_silence_duration_ms": 300},
    )
    print(f"  检测语言: {info.language} ({info.language_probability:.2f})")
    result = []
    for seg in segments:
        result.append({
            "start": round(seg.start, 2),
            "end": round(seg.end, 2),
            "text": seg.text.strip(),
        })
    return result

def main():
    # 懒加载模型（只加载一次）
    print(f"加载 Whisper {MODEL_SIZE} 模型...")
    from faster_whisper import WhisperModel
    model = WhisperModel(MODEL_SIZE, device="cpu", compute_type="int8")

    total = len(VIDEO_IDS)
    for i, vid in enumerate(VIDEO_IDS):
        out_path = OUT_DIR / f"{vid}.json"
        if out_path.exists():
            print(f"[{i+1}/{total}] {vid} — 已存在，跳过")
            continue

        print(f"\n[{i+1}/{total}] {vid}")
        audio_path = download(vid)
        if not audio_path:
            print(f"  跳过")
            continue

        print(f"  转录中...")
        try:
            segments_gen, info = model.transcribe(
                str(audio_path),
                language="ko",
                word_timestamps=False,
                vad_filter=True,
                vad_parameters={"min_silence_duration_ms": 300},
            )
            segs = []
            for seg in segments_gen:
                segs.append({
                    "start": round(seg.start, 2),
                    "end": round(seg.end, 2),
                    "text": seg.text.strip(),
                })
            print(f"  完成，{len(segs)} 段")
            out_path.write_text(json.dumps(segs, ensure_ascii=False, indent=2))
        except Exception as e:
            print(f"  转录失败: {e}")

    print(f"\n全部完成！结果在 {OUT_DIR}")

if __name__ == "__main__":
    main()
