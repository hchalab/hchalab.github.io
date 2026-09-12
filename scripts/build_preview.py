# -*- coding: utf-8 -*-
"""
내부 공유용 단일 HTML 빌드 스크립트
------------------------------------
6개 페이지(index / research / people / publications / news / contact)를
하나의 HTML 파일로 합치고, CSS·JS·이미지를 모두 파일 안에 내장합니다.
서버 없이 더블클릭으로 열리며, 상단 메뉴는 해시(#research 등)로 페이지를 전환합니다.

사용법 (프로젝트 폴더에서):
    python scripts/build_preview.py
    → "Cha Lab 홈페이지 미리보기.html" 생성

옵션:
    --artifact  <출력경로>   claude.ai 아티팩트용(doctype/html/head/body 없는) 변형도 생성
"""
import base64, mimetypes, re, sys, io
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ['index', 'research', 'people', 'publications', 'news', 'contact']
TITLES = {
    'index': 'Cha Lab. — Sustainable Battery Materials · Dong-A University',
    'research': 'Research — Cha Lab.', 'people': 'People — Cha Lab.',
    'publications': 'Publications — Cha Lab.', 'news': 'News — Cha Lab.', 'contact': 'Join us — Cha Lab.',
}

def read(p): return io.open(ROOT / p, encoding='utf-8').read()

def data_uri(rel):
    p = ROOT / rel
    mime = mimetypes.guess_type(str(p))[0] or 'application/octet-stream'
    if p.suffix == '.svg': mime = 'image/svg+xml'
    return f'data:{mime};base64,' + base64.b64encode(p.read_bytes()).decode()

def inline_images(s, prefix):
    """prefix: HTML 은 'assets/img/', CSS 는 '../img/'"""
    return re.sub(r'(["\(])' + re.escape(prefix) + r'([\w\-\.]+)(["\)])',
                  lambda m: m.group(1) + data_uri('assets/img/' + m.group(2)) + m.group(3), s)

def rewrite_links(s):
    # research.html#anchor -> #research/anchor ,  people.html -> #people
    s = re.sub(r'href="(' + '|'.join(PAGES) + r')\.html#([\w\-]+)"', r'href="#\1/\2"', s)
    s = re.sub(r'href="(' + '|'.join(PAGES) + r')\.html"', r'href="#\1"', s)
    return s

def build(artifact=False):
    css = inline_images(read('assets/css/style.css'), '../img/')
    css += '\n/* preview bundle */\n.page[hidden]{display:none}\n'
    js_partials = rewrite_links(read('assets/js/partials.js'))
    js_main = read('assets/js/main.js')
    js_pubs = read('assets/js/publications.js')
    js_news = read('assets/js/news.js')

    mains, page_scripts = [], []
    for p in PAGES:
        html = read(p + '.html')
        main = re.search(r'<main id="main">(.*?)</main>', html, re.S).group(1)
        main = rewrite_links(inline_images(main, 'assets/img/')).replace(' loading="lazy"', '')  # 내장 이미지는 지연 로딩 불필요
        mains.append(f'<div class="page" id="page-{p}" hidden data-title="{TITLES[p]}">\n{main}\n</div>')
        # 푸터 뒤의 페이지 전용 인라인 스크립트
        tail = html.split('</footer>')[-1]
        for m in re.finditer(r'<script>(.*?)</script>', tail, re.S):
            page_scripts.append(m.group(1))

    router = """
/* preview router: #page or #page/anchor */
(function(){
  var pages=%s;
  function show(){
    var h=(location.hash||'#index').slice(1).split('/'); var p=h[0], anchor=h[1];
    if(pages.indexOf(p)<0) p='index';
    document.querySelectorAll('.page').forEach(function(el){ el.hidden = (el.id!=='page-'+p); });
    var cur=document.getElementById('page-'+p); document.title=cur.getAttribute('data-title');
    document.querySelectorAll('.nav a').forEach(function(a){ a.removeAttribute('aria-current'); if(a.getAttribute('href')==='#'+p) a.setAttribute('aria-current','page'); });
    var nav=document.querySelector('.nav'); if(nav) nav.classList.remove('open');
    cur.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
    if(anchor){ var t=document.getElementById(anchor); if(t){ t.scrollIntoView(); return; } }
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange', show); show();
})();
""" % (str(PAGES).replace("'", '"'))

    head_links = (
        '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">\n'
    )
    if not artifact:
        head_links += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">\n'

    body = (
        '<a class="skip" href="#page-index">Skip to content</a>\n'
        '<header class="site-header" id="site-header"></header>\n'
        '<main>\n' + '\n'.join(mains) + '\n</main>\n'
        '<footer class="site-footer" id="site-footer"></footer>\n'
        '<script>\n' + js_partials + '\n</script>\n'
        '<script>\n' + js_pubs + '\n</script>\n'
        '<script>\n' + js_news + '\n</script>\n'
        '<script>\n' + js_main + '\n</script>\n'
        '<script>\n' + '\n'.join(page_scripts) + '\n</script>\n'
        '<script>\n' + router + '\n</script>\n'
    )
    preinit = "<script>(function(){try{var t=localStorage.getItem('chalab-theme');if(t)document.documentElement.setAttribute('data-theme',t);var l=localStorage.getItem('chalab-lang');if(l)document.documentElement.setAttribute('data-lang',l);}catch(e){}})();</script>\n"
    notice = ('<div style="background:#0a2530;color:#9dbcc6;font:12px/1.4 ui-monospace,monospace;text-align:center;padding:6px 12px;letter-spacing:.04em">'
              'INTERNAL PREVIEW · 내부 검토용 미리보기 · 위치·지도·구성원 등 일부 항목은 추후 채워질 예정입니다</div>\n')

    if artifact:
        return (f'<title>Cha Lab.</title>\n{head_links}<style>\n{css}\n</style>\n{preinit}{notice}{body}')
    return ('<!DOCTYPE html>\n<html lang="en" data-lang="en">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
            f'<title>{TITLES["index"]}</title>\n'
            f'<link rel="icon" href="{data_uri("assets/img/favicon.svg")}">\n'
            f'{head_links}<style>\n{css}\n</style>\n{preinit}</head>\n<body>\n{notice}{body}</body>\n</html>\n')

if __name__ == '__main__':
    out = ROOT / 'Cha Lab 홈페이지 미리보기.html'
    io.open(out, 'w', encoding='utf-8', newline='\n').write(build())
    print('written', out, out.stat().st_size // 1024, 'KB')
    if '--artifact' in sys.argv:
        ap = Path(sys.argv[sys.argv.index('--artifact') + 1])
        io.open(ap, 'w', encoding='utf-8', newline='\n').write(build(artifact=True))
        print('written', ap, ap.stat().st_size // 1024, 'KB')
