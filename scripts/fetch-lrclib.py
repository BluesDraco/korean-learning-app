"""Fetch synced lyrics from LRCLIB for all K-pop songs."""
import re, json, urllib.request, urllib.error, urllib.parse, sys, os

KPOP = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'data', 'kpopSongs.ts')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lrclib_lyrics.json')

with open(KPOP) as f:
    data = f.read()

songs = []
pattern = r"""id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*artist:\s*'([^']+)'[^}]*?videoId:\s*'([^']+)'"""
for m in re.finditer(pattern, data):
    songs.append({'id': m.group(1), 'title': m.group(2), 'artist': m.group(3), 'videoId': m.group(4)})

print(f'Found {len(songs)} songs', flush=True)

results = {}
if os.path.exists(OUT):
    with open(OUT) as f:
        results = json.load(f)
    print(f'Loaded {len(results)} existing results')

def search_lrc(artist, title):
    url = 'https://lrclib.net/api/get?artist_name=' + urllib.parse.quote(artist) + '&track_name=' + urllib.parse.quote(title) + '&duration=240'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        resp = urllib.request.urlopen(req, timeout=15)
        return json.loads(resp.read())
    except:
        return None

new = 0
for i, song in enumerate(songs):
    vid = song['videoId']
    if vid in results:
        continue
    lrc = search_lrc(song['artist'], song['title'])
    if lrc and lrc.get('syncedLyrics'):
        results[vid] = {
            'id': song['id'],
            'title': song['title'],
            'artist': song['artist'],
            'videoId': vid,
            'syncedLyrics': lrc['syncedLyrics'],
            'plainLyrics': lrc.get('plainLyrics', '')
        }
        lines = len(lrc['syncedLyrics'].split('\n'))
        new += 1
        print(f'  [{i+1}/{len(songs)}] FOUND {song["artist"]} - {song["title"]}: {lines} lines', flush=True)
    else:
        results[vid] = None
        print(f'  [{i+1}/{len(songs)}] MISS {song["artist"]} - {song["title"]}', flush=True)

    if (i + 1) % 10 == 0:
        with open(OUT, 'w') as f:
            json.dump(results, f, ensure_ascii=False)

with open(OUT, 'w') as f:
    json.dump(results, f, ensure_ascii=False)

found = sum(1 for v in results.values() if v is not None)
print(f'\nDone: {found}/{len(songs)} found on LRCLIB')
print(f'Saved to {OUT}')
