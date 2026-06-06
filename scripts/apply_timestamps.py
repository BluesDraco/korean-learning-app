#!/usr/bin/env python3
"""
apply_timestamps.py
把 Whisper 输出的时间轴对齐回 kpopSongs.ts 里的每一行歌词。

策略：
- kpopSongs.ts 里每行有原始 start/end（秒）
- Whisper JSON 里有精确的 start/end + 识别文本
- 对每首歌的每一行，找 Whisper 里时间上最近的段，取其 start/end
- 如果 Whisper 段数太少（≤3），该首歌跳过（保留原始时间轴）
- 输出：直接修改 kpopSongs.ts，把 t(m,s) 替换成精确秒数
"""

import json
import re
import os
from pathlib import Path

SONGS_FILE = Path(__file__).parent.parent / "src/data/kpopSongs.ts"
TS_DIR = Path(__file__).parent / "kpop_timestamps"

def load_whisper(video_id: str) -> list[dict]:
    p = TS_DIR / f"{video_id}.json"
    if not p.exists():
        return []
    return json.loads(p.read_text(encoding="utf-8"))

def fmt(s: float) -> str:
    """把秒数格式化为整数或一位小数，用于写回 .ts"""
    if s == int(s):
        return str(int(s))
    return f"{s:.1f}"

def find_best_segment(orig_start: float, orig_end: float, segs: list[dict]) -> dict | None:
    """
    找 Whisper 段中与原始行时间最接近的段。
    优先找 start 时间最接近的段（原始 start 是手工标注的，相对可信）
    """
    if not segs:
        return None
    best = min(segs, key=lambda s: abs(s["start"] - orig_start))
    # 如果最近的段偏差超过 8 秒，认为没找到
    if abs(best["start"] - orig_start) > 8:
        return None
    return best

def process_song(video_id: str, lyrics_block: str) -> str:
    """处理一首歌的 lyrics 数组文本，返回更新后的文本"""
    segs = load_whisper(video_id)
    if len(segs) <= 3:
        print(f"  {video_id}: 只有 {len(segs)} 段，跳过")
        return lyrics_block

    print(f"  {video_id}: {len(segs)} 段，开始对齐")

    # 提取每一行的 start/end，格式是 t(m,s) 或纯数字
    # 匹配 L('...', start, end, ...) 或 _(start, end, ...)
    # start/end 可能是 t(m,s) 形式或裸数字
    def t(m, s): return m * 60 + s

    def parse_time(tok: str) -> float:
        tok = tok.strip()
        m = re.match(r't\((\d+),\s*(\d+)\)', tok)
        if m:
            return t(int(m.group(1)), int(m.group(2)))
        return float(tok)

    def time_to_ts(s: float) -> str:
        """秒 → t(m,s) 格式"""
        m = int(s) // 60
        sec = int(round(s)) % 60
        return f"t({m},{sec})"

    # 找出所有行的 start/end 位置
    # 匹配 L( 或 _( 开头的行，提取第一二个数值参数
    # L('SECTION', START, END, ...) 或 _(START, END, ...)
    pattern = re.compile(
        r'(L\([^,]+,\s*|_\()'           # L('xx', 或 _(
        r'(t\(\d+,\s*\d+\)|\d+(?:\.\d+)?)'  # start
        r'(\s*,\s*)'
        r'(t\(\d+,\s*\d+\)|\d+(?:\.\d+)?)'  # end
    )

    updated = lyrics_block
    offset = 0  # 跟踪替换后的字符偏移

    matches = list(pattern.finditer(lyrics_block))
    replacements = []

    for i, m in enumerate(matches):
        orig_start = parse_time(m.group(2))
        orig_end   = parse_time(m.group(4))

        seg = find_best_segment(orig_start, orig_end, segs)
        if seg is None:
            continue

        new_start = seg["start"]
        # end：用下一个 Whisper 段的 start，或当前段的 end
        seg_idx = segs.index(seg)
        if seg_idx + 1 < len(segs):
            new_end = segs[seg_idx + 1]["start"]
        else:
            new_end = seg["end"]

        # 只有偏差 > 0.5s 才替换，避免无意义改动
        if abs(new_start - orig_start) < 0.5 and abs(new_end - orig_end) < 0.5:
            continue

        old_start_str = m.group(2)
        old_end_str   = m.group(4)
        new_start_str = time_to_ts(new_start)
        new_end_str   = time_to_ts(new_end)

        replacements.append((m.start(2), m.end(2), old_start_str, new_start_str))
        replacements.append((m.start(4), m.end(4), old_end_str,   new_end_str))

    # 从后往前替换，避免位置偏移
    replacements.sort(key=lambda x: x[0], reverse=True)
    result = list(lyrics_block)
    for start_pos, end_pos, old, new in replacements:
        result[start_pos:end_pos] = list(new)
    updated = "".join(result)

    changed = sum(1 for s, e, o, n in replacements if o != n) // 2
    print(f"    更新了 {changed} 行时间轴")
    return updated

def main():
    src = SONGS_FILE.read_text(encoding="utf-8")

    # 找出每首歌的 videoId 和对应 lyrics 块
    # 按 videoId 定位，然后找对应的 lyrics: [ ... ] 块
    song_pattern = re.compile(r"videoId:\s*'([^']+)'")
    lyrics_pattern = re.compile(r"(lyrics:\s*\[)(.*?)(\],)", re.DOTALL)

    result = src
    offset = 0

    # 找所有歌曲位置
    song_matches = list(song_pattern.finditer(src))
    lyrics_matches = list(lyrics_pattern.finditer(src))

    print(f"找到 {len(song_matches)} 首歌，{len(lyrics_matches)} 个 lyrics 块")

    # 逐首匹配：每首歌的 videoId 后面最近的 lyrics 块
    updated_src = src
    shift = 0  # 由于替换导致的字符偏移

    for si, sm in enumerate(song_matches):
        vid = sm.group(1)
        song_pos = sm.start()

        # 找这首歌之后最近的 lyrics 块
        lm = None
        for lx in lyrics_matches:
            if lx.start() > song_pos:
                # 确保在下一首歌之前
                next_song_pos = song_matches[si+1].start() if si+1 < len(song_matches) else len(src)
                if lx.start() < next_song_pos:
                    lm = lx
                break

        if lm is None:
            print(f"  {vid}: 没找到 lyrics 块，跳过")
            continue

        orig_block = lm.group(2)
        new_block  = process_song(vid, orig_block)

        if new_block != orig_block:
            # 在已修改的 updated_src 里找并替换
            # 用原始位置 + shift 偏移
            abs_start = lm.start(2) + shift
            abs_end   = lm.end(2)   + shift
            updated_src = updated_src[:abs_start] + new_block + updated_src[abs_end:]
            shift += len(new_block) - len(orig_block)

    SONGS_FILE.write_text(updated_src, encoding="utf-8")
    print(f"\n✅ 写回 {SONGS_FILE}")

if __name__ == "__main__":
    main()
