"""Structural check for restyled posts.

Verifies each post: links blog.css, loads posts.js + post-header.js, has a
generic <title>, has no hardcoded <h1>, wraps everything in <article id="post">,
is registered in posts.js, and still has its inline widget script intact.
"""
from html.parser import HTMLParser
from pathlib import Path
import re
import sys

posts_js = Path('assets/posts.js').read_text(encoding='utf-8')
registered = set(re.findall(r"slug:\s*'([^']+)'", posts_js))

failures = []
for path in sorted(Path('.').glob('*/index.html')):
    slug = path.parent.name
    html = path.read_text(encoding='utf-8')
    HTMLParser().feed(html)
    body = html.split('<body>')[1]
    no_comments = re.sub(r'<!--.*?-->', '', body, flags=re.S)
    script = re.findall(r'<script(?![^>]*src=)[^>]*>(.*?)</script>', html, flags=re.S)

    checks = {
        'blog.css linked': 'assets/blog.css' in html,
        'posts.js loaded': 'assets/posts.js' in html,
        'post-header.js loaded': 'assets/post-header.js' in html,
        'generic <title>': '<title>AI Visualizations</title>' in html,
        'no hardcoded <h1>': not re.search(r'<h1[\s>]', no_comments),
        'article#post wrapper': '<article id="post">' in html and '</article>' in html,
        'registered in posts.js': slug in registered,
        'widget script intact': bool(script) and len(script[0].strip()) > 200,
        'no leftover #header rules': not re.search(r'#header[\w-]*\s*(\{|h1)', html),
    }
    bad = [name for name, ok in checks.items() if not ok]
    print(f'{"PASS" if not bad else "FAIL"}  {slug}')
    for name in bad:
        print(f'        - {name}')
    if bad:
        failures.append(slug)

sys.exit(1 if failures else 0)
