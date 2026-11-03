"""
Ontwikkelserver voor de webapplicatie.

Hetzelfde als `python -m http.server`, met één verschil: elk antwoord draagt
`Cache-Control: no-store`. Zonder dat blijft de browser oude ES-modules
hergebruiken na een wijziging — je test dan code die je net vervangen hebt, en
dat kost meer tijd dan het uitzoeken van de bug eronder.

`version.json` wordt bij het publiceren door Jekyll ingevuld. Lokaal levert
deze server het met de commit uit git, met de vermelding dat er niet-gecommitte
wijzigingen zijn als dat zo is.

Gebruik: python tools/devserver.py [poort] [map]
"""
import json
import subprocess
import sys
from datetime import datetime, timezone
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


def git(directory, *args):
    try:
        out = subprocess.run(['git', '-C', directory, *args], capture_output=True,
                             text=True, timeout=5)
        return out.stdout.strip() if out.returncode == 0 else ''
    except (OSError, subprocess.SubprocessError):
        return ''


class NoCacheHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.split('?')[0] == '/version.json':
            return self.send_version()
        return super().do_GET()

    def send_version(self):
        commit = git(self.directory, 'rev-parse', 'HEAD')
        dirty = bool(git(self.directory, 'status', '--porcelain', '--untracked-files=no'))
        body = json.dumps({
            'commit': commit,
            'built': datetime.now(timezone.utc).isoformat(timespec='seconds'),
            'source': 'local',
            'dirty': dirty,
        }).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):
        # Alleen fouten; de gewone verzoeken maken de uitvoer onleesbaar.
        status = args[1] if len(args) > 1 else ''
        if str(status).startswith(('4', '5')):
            super().log_message(fmt, *args)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8123
    directory = sys.argv[2] if len(sys.argv) > 2 else '.'
    handler = partial(NoCacheHandler, directory=directory)
    with ThreadingHTTPServer(('127.0.0.1', port), handler) as httpd:
        print(f'Bedient {directory} op http://localhost:{port} (zonder cache)')
        httpd.serve_forever()


if __name__ == '__main__':
    main()
