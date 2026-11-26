#!/usr/bin/env python3
"""Build static Pages and embed an index of actual WebP files, with dimensions.

No API, dependencies, credentials or generated commits are required. The source
repository is never modified. Run from the repository with Python 3.
"""
import argparse
import json
from pathlib import Path
import shutil
import struct

PAGES = ('index.html', 'projetos.html', 'projeto.html')
MARKER = '<script id="portfolio-image-index" type="application/json">null</script>'


def webp_dimensions(path):
    """Read dimensions from the VP8X, VP8L or VP8 bitstream header only."""
    with path.open('rb') as file:
        header = file.read(12)
        if len(header) != 12 or header[:4] != b'RIFF' or header[8:] != b'WEBP':
            raise ValueError('not a WebP file')
        end = min(path.stat().st_size, int.from_bytes(header[4:8], 'little') + 8)
        while file.tell() + 8 <= end:
            tag, size = struct.unpack('<4sI', file.read(8))
            start = file.tell()
            if start + size > end:
                raise ValueError('truncated WebP chunk')
            if tag == b'VP8X' and size >= 10:
                chunk = file.read(10)
                return (1 + int.from_bytes(chunk[4:7], 'little'),
                        1 + int.from_bytes(chunk[7:10], 'little'))
            if tag == b'VP8L' and size >= 5:
                chunk = file.read(5)
                if chunk[0] == 0x2F:
                    bits = int.from_bytes(chunk[1:5], 'little')
                    return ((bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1)
            if tag == b'VP8 ' and size >= 10:
                chunk = file.read(10)
                if chunk[3:6] == b'\x9d\x01\x2a':
                    width, height = struct.unpack('<HH', chunk[6:10])
                    width, height = width & 0x3FFF, height & 0x3FFF
                    if width and height:
                        return (width, height)
            file.seek(start + size + (size % 2))
    raise ValueError('WebP dimensions not found')


def make_index(root):
    files = {}
    for path in sorted((root / 'assets/img').rglob('*.webp')):
        if not path.is_file():
            continue
        try:
            files[path.relative_to(root).as_posix()] = webp_dimensions(path)
        except (OSError, ValueError) as exc:
            print(f'Warning: skipping invalid WebP {path.relative_to(root)}: {exc}')
    return {'version': 1, 'files': files}


def build(root, output):
    root, output = root.resolve(), output.resolve()
    if output == root or root.is_relative_to(output):
        raise ValueError('Output must be separate from the repository')
    if output.exists():
        raise FileExistsError(f'Output directory already exists: {output}')
    index = make_index(root)
    # Escape '<' so even an unusual file name cannot close the JSON script tag.
    payload = json.dumps(index, ensure_ascii=True, separators=(',', ':')).replace('<', '\\u003c')
    output.mkdir(parents=True)
    shutil.copytree(root / 'assets', output / 'assets')
    for page in PAGES:
        html = (root / page).read_text(encoding='utf-8')
        if html.count(MARKER) != 1:
            raise ValueError(f'Missing or duplicate index marker in {page}')
        (output / page).write_text(html.replace(MARKER, MARKER.replace('>null<', f'>{payload}<')), encoding='utf-8')
    for name in ('.nojekyll', 'CNAME', 'robots.txt', 'sitemap.xml', '404.html'):
        if (root / name).is_file():
            shutil.copy2(root / name, output / name)
    print(f'Indexed {len(index["files"])} WebP files; built {len(PAGES)} pages in {output}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    build(args.root, args.output)
