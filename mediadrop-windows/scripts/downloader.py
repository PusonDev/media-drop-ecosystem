import sys, subprocess, json, os

BIN_PATH = os.path.join(os.path.dirname(__dirname), 'resources', 'bin')
YTDLP = os.path.join(BIN_PATH, 'yt-dlp.exe') if os.name == 'nt' else os.path.join(BIN_PATH, 'yt-dlp')
FFMPEG = BIN_PATH

def fetch_info(url):
    result = subprocess.run(
        [YTDLP, '--js-runtimes', 'node', '--dump-json', '--no-playlist', url],
        capture_output=True, text=True, encoding='utf-8', errors='ignore'
    )
    if result.returncode != 0:
        print(json.dumps({"error": result.stderr}))
        return None
    return json.loads(result.stdout)

def download(url, fmt, output_path, subtitle=None):
    cmd = [
        YTDLP, '-f', fmt,
        '--js-runtimes', 'node',
        '--merge-output-format', 'mp4',
        '--ffmpeg-location', FFMPEG,
        '--concurrent-fragments', '8',
        '--continue', '--newline',
        '-o', os.path.join(output_path, '%(title)s.%(ext)s'),
        url
    ]
    if subtitle and subtitle != 'none':
        cmd += ['--write-sub', '--sub-lang', subtitle, '--convert-subs', 'srt']
        
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding='utf-8', errors='ignore')
    for line in process.stdout:
        print(line, flush=True)
    process.wait()
    return process.returncode

def auto_update():
    subprocess.run([YTDLP, '-U'], capture_output=True)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(1)
        
    action = sys.argv[1]
    
    if action == 'info':
        res = fetch_info(sys.argv[2])
        if res:
            print(json.dumps(res))
    elif action == 'download':
        url = sys.argv[2]
        fmt = sys.argv[3]
        output_path = sys.argv[4]
        subtitle = sys.argv[5] if len(sys.argv) > 5 else None
        sys.exit(download(url, fmt, output_path, subtitle))
    elif action == 'update':
        auto_update()
