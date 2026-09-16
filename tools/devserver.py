"""
Ontwikkelserver voor de webapplicatie.

Hetzelfde als `python -m http.server`, met één verschil: elk antwoord draagt
`Cache-Control: no-store`. Zonder dat blijft de browser oude ES-modules
hergebruiken na een wijziging — je test dan code die je net vervangen hebt, en
dat kost meer tijd dan het uitzoeken van de bug eronder.

Gebruik: python tools/devserver.py [poort] [map]
"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
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
