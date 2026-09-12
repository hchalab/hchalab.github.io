/* Cha Lab — shared behaviour: language, theme, mobile nav, reveal, footer year */
(function () {
  const html = document.documentElement;

  /* ---- Language (en | ko) ---- */
  const savedLang = localStorage.getItem('chalab-lang');
  const browserKo = (navigator.language || '').toLowerCase().startsWith('ko');
  const lang = savedLang || (browserKo ? 'ko' : 'en');
  setLang(lang);

  function setLang(l) {
    html.setAttribute('data-lang', l);
    html.setAttribute('lang', l);
    localStorage.setItem('chalab-lang', l);
    document.dispatchEvent(new CustomEvent('langchange', { detail: l }));
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-toggle-lang]');
    if (!b) return;
    setLang(html.getAttribute('data-lang') === 'en' ? 'ko' : 'en');
  });

  /* ---- Theme (light | dark) ---- */
  const savedTheme = localStorage.getItem('chalab-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  html.setAttribute('data-theme', savedTheme || (prefersDark ? 'dark' : 'light'));
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-toggle-theme]');
    if (!b) return;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('chalab-theme', next);
  });

  /* ---- Mobile nav ---- */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-toggle-menu]');
    const nav = document.querySelector('.nav');
    if (b && nav) {
      const open = nav.classList.toggle('open');
      b.setAttribute('aria-expanded', open);
      return;
    }
    if (nav && nav.classList.contains('open') && !e.target.closest('.nav')) nav.classList.remove('open');
  });

  /* ---- Current page highlight ---- */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach((a) => {
    const target = a.getAttribute('href').split('/').pop();
    if (target === here) a.setAttribute('aria-current', 'page');
  });

  /* ---- Reveal on scroll ---- */
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: 0.08 })
    : null;
  document.querySelectorAll('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('in')));

  /* ---- Footer year ---- */
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
})();

/* ---- Helpers shared by publications / news renderers ---- */
window.ChaLab = {
  /* Bold the PI in an author string */
  highlightPI(authors) {
    return authors.replace(/(H(?:yungyeon)? Cha\*?)/g, '<b>$1</b>');
  },
  scholarLink(title) {
    return 'https://scholar.google.com/scholar?q=' + encodeURIComponent('"' + title + '"');
  },
  typeLabel: {
    article: { en: 'Article', ko: '논문' },
    review: { en: 'Review', ko: '리뷰' },
    patent: { en: 'Patent', ko: '특허' },
    chapter: { en: 'Book chapter', ko: '단행본' },
  },
};
