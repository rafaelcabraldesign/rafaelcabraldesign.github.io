#!/usr/bin/env python3
"""Build static Pages with WebP dimensions and individually maintained case data.

No third-party dependencies, API calls from the browser, or generated commits.
The GitHub Actions checkout supplies Git history for chronological ordering.
"""
import argparse
import json
import os
import re
import subprocess
from pathlib import Path
import shutil
import struct

PAGES = ('index.html', 'projetos.html', 'projeto.html')
MARKER = '<script id="portfolio-image-index" type="application/json">null</script>'
CONTENT_MARKER = '<script id="portfolio-content-index" type="application/json">null</script>'
PROJECTS_DIR = Path('conteudo/projetos')


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



def read_object(path):
    try:
        value = json.loads(path.read_text(encoding='utf-8'))
    except json.JSONDecodeError as exc:
        raise ValueError(f'Invalid JSON in {path}: {exc}') from exc
    if not isinstance(value, dict):
        raise ValueError(f'Expected a JSON object in {path}')
    return value


def string_field(data, key, path):
    value = data.get(key, '')
    if not isinstance(value, str):
        raise ValueError(f'{path}: {key} must be a string')
    return value.strip()


def description_text(data, path):
    # A paragraph per array entry makes manual edits easy. A single string
    # with escaped blank lines is also accepted for backwards flexibility.
    value = data.get('texto', [])
    if isinstance(value, str):
        return value.strip()
    if not isinstance(value, list) or not all(isinstance(item, str) for item in value):
        raise ValueError(f'{path}: texto must be a string or an array of paragraphs')
    return '\n\n'.join(item.strip() for item in value if item.strip())


def has_content(data, path):
    return bool(string_field(data, 'resumo', path) or description_text(data, path))


def run_git(root, *args, check=True):
    return subprocess.run(['git', *args], cwd=root, text=True, encoding='utf-8',
                          capture_output=True, check=check,
                          env={**os.environ, 'GIT_TERMINAL_PROMPT': '0'})


def history_positions(root):
    """Get first-parent commit order, i.e. publication order on main.

    The existing v2.8 workflow uses a shallow checkout. In Actions only,
    fetch the missing ancestry with a blob filter: old image blobs need not
    be downloaded. The checkout's existing read-only credential suffices.
    This avoids requiring a new hidden .github workflow upload.
    """
    ci = os.environ.get('GITHUB_ACTIONS') == 'true'
    try:
        repo = run_git(root, 'rev-parse', '--show-toplevel', check=False)
    except FileNotFoundError:
        repo = None
    if not repo or repo.returncode != 0 or Path(repo.stdout.strip()).resolve() != root:
        if ci:
            raise RuntimeError('Git history is required in GitHub Actions')
        print('Preview: no Git repository; using catalog order as a fallback.')
        return None
    shallow = run_git(root, 'rev-parse', '--is-shallow-repository').stdout.strip() == 'true'
    if shallow:
        if not ci:
            print('Preview: shallow Git history; using catalog order as a fallback.')
            return None
        print('Fetching publication history (without historical image blobs)...', flush=True)
        try:
            run_git(root, 'fetch', '--unshallow', '--no-tags', '--filter=blob:none', 'origin')
        except subprocess.CalledProcessError as exc:
            raise RuntimeError(f'Could not obtain Git history: {exc.stderr.strip()}') from exc
        if run_git(root, 'rev-parse', '--is-shallow-repository').stdout.strip() == 'true':
            raise RuntimeError('Git checkout remains shallow; publication order cannot be determined')
    result = run_git(root, 'rev-list', '--first-parent', '--reverse', 'HEAD')
    return {commit: position for position, commit in enumerate(result.stdout.splitlines())}


def first_content_position(root, path, positions):
    if positions is None:
        return 0
    relative = path.relative_to(root).as_posix()
    # Only inspect commits that changed this individual JSON file, not every
    # historical image upload. First-parent ordering records when it became
    # visible on the publication branch, even when changes were merged.
    history = run_git(root, 'log', '--first-parent', '--reverse', '--format=%H', 'HEAD', '--', relative)
    for commit in history.stdout.splitlines():
        if commit not in positions:
            continue
        previous = run_git(root, 'show', f'{commit}:{relative}', check=False)
        if previous.returncode:
            # A deletion is legitimate; any other read failure is a blocker.
            exists = run_git(root, 'cat-file', '-e', f'{commit}:{relative}', check=False)
            if exists.returncode:
                # Check tree metadata rather than assuming every error means deletion.
                tree = run_git(root, 'ls-tree', commit, '--', relative)
                if not tree.stdout.strip():
                    continue
            raise RuntimeError(f'Unable to read historical project data: {relative} at {commit}')
        try:
            old = json.loads(previous.stdout)
            if isinstance(old, dict) and has_content(old, relative):
                return positions[commit]
        except (ValueError, TypeError):
            # Invalid intermediate JSON could not have been published.
            continue
    # An uncommitted edit in a local preview has not been published yet.
    return len(positions)


def make_content(root):
    config = read_object(root / 'conteudo/config.json')
    contact = config.get('contato', {})
    if not isinstance(contact, dict) or not all(isinstance(v, str) for v in contact.values()):
        raise ValueError('contato must be an object of strings in conteudo/config.json')
    catalog = config.get('ordemCadastro', [])
    if not isinstance(catalog, list) or not all(isinstance(s, str) for s in catalog):
        raise ValueError('ordemCadastro must be an array of project slugs')
    order = {slug: n for n, slug in enumerate(dict.fromkeys(catalog))}
    positions = history_positions(root)
    records = []
    for path in sorted((root / PROJECTS_DIR).glob('*.json')):
        slug = path.stem
        if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', slug):
            raise ValueError(f'Invalid project file name: {path.name}; use lowercase letters, numbers and hyphens')
        item = read_object(path)
        name = string_field(item, 'nome', path)
        if not name:
            raise ValueError(f'{path}: nome is required')
        summary = string_field(item, 'resumo', path)
        body = description_text(item, path)
        industry = string_field(item, 'industria', path)
        label = string_field(item, 'rotuloIndustria', path)
        gallery = item.get('galeria', [])
        if not isinstance(gallery, list) or not all(isinstance(v, str) for v in gallery):
            raise ValueError(f'{path}: galeria must be an array of image paths')
        # Adapt the editable JSON to the existing rendering format, so no
        # changes to the visual presentation of previous cases are needed.
        project = {'slug': slug, 'nome': name, 'frase': summary,
                   'servicos': string_field(item, 'servicos', path),
                   'ano': string_field(item, 'ano', path), 'texto': body,
                   'imagem': string_field(item, 'imagem', path), 'galeria': gallery}
        project['segmento' if label == 'SEGMENTO' else 'industria'] = industry
        filled = bool(summary or body)
        first = first_content_position(root, path, positions) if filled else 0
        records.append(((not filled, first, order.get(slug, len(order)), slug), project))
    projects = [project for _, project in sorted(records, key=lambda record: record[0])]
    if not projects:
        raise ValueError('No projects found in conteudo/projetos/')
    manual = config.get('destaquesManuais', [])
    if not isinstance(manual, list) or not all(isinstance(s, str) for s in manual):
        raise ValueError('destaquesManuais must be an array of slugs')
    # An empty list enables automatic mode. If the owner later selects four
    # distinct completed projects, use that order on the homepage only.
    completed = {p['slug'] for p in projects if p['frase'] or p['texto']}
    if manual and (len(manual) != 4 or len(set(manual)) != 4 or not set(manual) <= completed):
        raise ValueError('destaquesManuais must be empty or contain four distinct completed project slugs')
    print('Project order: ' + ', '.join(p['slug'] for p in projects))
    return {'contato': contact, 'projetos': projects, 'destaquesManuais': manual}


def embed_json(html, marker, value, page):
    if html.count(marker) != 1:
        raise ValueError(f'Missing or duplicate index marker in {page}')
    # Protect the JSON script element against HTML-like characters in content.
    payload = json.dumps(value, ensure_ascii=True, separators=(',', ':')).replace('<', '\\u003c')
    return html.replace(marker, marker.replace('>null<', f'>{payload}<'))

def build(root, output):
    root, output = root.resolve(), output.resolve()
    if output == root or root.is_relative_to(output):
        raise ValueError('Output must be separate from the repository')
    if output.exists():
        raise FileExistsError(f'Output directory already exists: {output}')
    index = make_index(root)
    content = make_content(root)
    output.mkdir(parents=True)
    shutil.copytree(root / 'assets', output / 'assets')
    for page in PAGES:
        html = (root / page).read_text(encoding='utf-8')
        html = embed_json(html, MARKER, index, page)
        html = embed_json(html, CONTENT_MARKER, content, page)
        (output / page).write_text(html, encoding='utf-8')
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
