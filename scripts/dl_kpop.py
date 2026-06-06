import json, subprocess, os, sys

os.chdir('/www/wwwroot/torikorean.com/public/audio/kpop')
with open('/tmp/kpop_vids.json') as f:
    vids = json.load(f)

total = len(vids)
done = 0
skipped = 0
new = 0
uploaded = 0

for vid in vids:
    done += 1
    fname = f'{vid}.webm'
    # Check COS first — if already there, skip download
    cos_check = subprocess.run(
        ['coscmd', 'info', f'audio/kpop/{fname}'],
        capture_output=True, text=True
    )
    if cos_check.returncode == 0:
        skipped += 1
        # Ensure local cache exists for server fallback
        if not os.path.exists(fname):
            print(f'[{done}/{total}] {vid} — COS已存在，下载本地缓存...', flush=True)
            r = subprocess.run(
                ['/usr/local/bin/yt-dlp', '-f', 'bestaudio[ext=webm]/bestaudio',
                 '--max-filesize', '30M', '-o', f'{vid}.%(ext)s', '--no-progress', vid],
                capture_output=True, text=True, timeout=120
            )
            if r.returncode == 0:
                print(f'  本地缓存 OK', flush=True)
        else:
            print(f'[{done}/{total}] {vid} — COS+本地已存在，跳过', flush=True)
        continue

    print(f'[{done}/{total}] {vid}', flush=True)
    try:
        r = subprocess.run(
            ['/usr/local/bin/yt-dlp', '-f', 'bestaudio[ext=webm]/bestaudio',
             '--max-filesize', '30M', '-o', f'{vid}.%(ext)s', '--no-progress', vid],
            capture_output=True, text=True, timeout=120
        )
        if r.returncode != 0:
            err = r.stderr.strip().split('\n')[-1] if r.stderr else 'unknown'
            print(f'  DOWNLOAD FAIL: {err[:120]}', flush=True)
            continue

        new += 1
        size = os.path.getsize(fname) if os.path.exists(fname) else 0
        print(f'  下载 OK ({size//1024}KB)，上传 COS...', flush=True)

        # Upload to COS
        up = subprocess.run(
            ['coscmd', 'upload', fname, f'audio/kpop/{fname}'],
            capture_output=True, text=True, timeout=60
        )
        if up.returncode == 0:
            uploaded += 1
            print(f'  COS OK', flush=True)
        else:
            print(f'  COS FAIL: {up.stderr.strip()[:120]}', flush=True)

    except Exception as e:
        print(f'  ERROR: {e}', flush=True)

print(f'\nDone. 新增 {new}，上传COS {uploaded}，跳过 {skipped}，共 {len(os.listdir())} 本地文件')
