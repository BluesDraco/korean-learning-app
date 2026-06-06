"""Verify all K-pop song videoIds against YouTube oEmbed API."""
import re, json, urllib.request, urllib.error, sys, os

KPOP_FILE = "/www/wwwroot/torikorean.com/src/data/kpopSongs.ts"
VIDS_FILE = "/tmp/all_vids.txt"
OUT_FILE = "/tmp/verify_results.json"

# Extract videoIds
if not os.path.exists(VIDS_FILE):
    with open(KPOP_FILE) as f:
        data = f.read()
    vids = list(set(re.findall(r"videoId:\s*'([^']+)'", data)))
    with open(VIDS_FILE, "w") as f:
        for v in vids:
            f.write(v + "\n")
else:
    with open(VIDS_FILE) as f:
        vids = [l.strip() for l in f if l.strip()]

# Build expected metadata
with open(KPOP_FILE) as f:
    data = f.read()

expected = {}
for line in data.split("\n"):
    m = re.search(r"id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*artist:\s*'([^']+)'", line)
    if not m:
        continue
    vid_m = re.search(r"videoId:\s*'([^']+)'", line)
    if not vid_m:
        continue
    vid = vid_m.group(1)
    if vid not in expected:
        expected[vid] = []
    expected[vid].append({"id": m.group(1), "title": m.group(2), "artist": m.group(3)})

print(f"Checking {len(vids)} videos...")

dead = []
wrong_title = []
ok_count = 0

for i, vid in enumerate(vids):
    songs = expected.get(vid, [])
    if not songs:
        continue

    try:
        url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=10)
        info = json.loads(resp.read())
        yt_title = info.get("title", "")

        if not yt_title:
            dead.append({"vid": vid, "songs": [f"{s['artist']} - {s['title']}" for s in songs]})
            continue

        for s in songs:
            yt_lower = yt_title.lower()
            title_words = [w.lower() for w in s["title"].split() if len(w) > 2]
            artist_words = [w.lower() for w in s["artist"].split() if len(w) > 2]

            title_hit = any(w in yt_lower for w in title_words) if title_words else False
            artist_hit = s["artist"].lower() in yt_lower or any(w in yt_lower for w in artist_words) if artist_words else False

            if not title_hit and not artist_hit:
                wrong_title.append({
                    "vid": vid, "id": s["id"],
                    "expected": f"{s['artist']} - {s['title']}",
                    "yt_title": yt_title
                })
            else:
                ok_count += 1
    except urllib.error.HTTPError as e:
        if e.code in (404, 403, 410):
            dead.append({"vid": vid, "songs": [f"{s['artist']} - {s['title']}" for s in songs]})
        else:
            wrong_title.append({"vid": vid, "id": songs[0]["id"], "expected": f"{songs[0]['artist']} - {songs[0]['title']}", "yt_title": f"HTTP {e.code}"})
    except Exception as e:
        wrong_title.append({"vid": vid, "id": songs[0]["id"] if songs else "?", "expected": "?", "yt_title": str(e)[:80]})

    if (i + 1) % 25 == 0:
        print(f"  {i+1}/{len(vids)}: ok={ok_count}, dead={len(dead)}, review={len(wrong_title)}")

print(f"\n=== RESULTS ===")
print(f"OK: {ok_count}")
print(f"DEAD (delete): {len(dead)}")
print(f"NEED REVIEW: {len(wrong_title)}")

if dead:
    print(f"\n=== DEAD VIDEOS ===")
    for d in dead:
        print(f"  {d['vid']}: {d['songs']}")

if wrong_title:
    print(f"\n=== NEED REVIEW ===")
    for w in wrong_title:
        print(f"  {w['vid']} ({w['id']})")
        print(f"    Expected: {w['expected']}")
        print(f"    YouTube: {w['yt_title']}")

with open(OUT_FILE, "w") as f:
    json.dump({"ok": ok_count, "dead": dead, "review": wrong_title}, f, ensure_ascii=False, indent=2)
print(f"\nSaved to {OUT_FILE}")
