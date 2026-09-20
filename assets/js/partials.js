/* Shared header & footer — edit navigation / contact details here once, applied to every page. */
(function () {
  const mark = `
  <svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
    <defs><linearGradient id="bm" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b7290"/><stop offset=".6" stop-color="#1bb2c8"/><stop offset="1" stop-color="#62dfc6"/>
    </linearGradient></defs>
    <path d="M20 2 35 10.5v19L20 38 5 29.5v-19Z" fill="url(#bm)"/>
    <path d="M20 2v36M5 10.5 20 19l15-8.5M20 19v19" stroke="rgba(255,255,255,.55)" stroke-width="1.2" fill="none"/>
  </svg>`;

  const header = `
  <div class="wrap">
    <a class="brand" href="index.html">${mark}
      <span><span class="brand-name">Cha Lab.</span>
      <span class="brand-sub"><span class="en">Sustainable Battery Materials · Dong-A University</span><span class="ko">지속가능 전지소재 연구실 · 동아대학교</span></span></span>
    </a>
    <nav class="nav" aria-label="Main">
      <a href="index.html"><span class="en">Home</span><span class="ko">홈</span></a>
      <a href="research.html"><span class="en">Research</span><span class="ko">연구</span></a>
      <a href="people.html"><span class="en">People</span><span class="ko">구성원</span></a>
      <a href="publications.html"><span class="en">Publications</span><span class="ko">논문</span></a>
      <a href="news.html"><span class="en">News</span><span class="ko">소식</span></a>
      <a href="contact.html"><span class="en">Join us</span><span class="ko">모집·연락</span></a>
      <div class="nav-tools">
        <button class="icon-btn lang-btn" data-toggle-lang type="button" aria-label="Switch language">
          <span class="l-en">EN</span><span class="sep">/</span><span class="l-ko">KO</span>
        </button>
        <button class="icon-btn theme-btn" data-toggle-theme type="button" aria-label="Toggle dark mode">
          <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>
          <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        </button>
      </div>
    </nav>
    <button class="icon-btn menu-btn" data-toggle-menu type="button" aria-label="Menu" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
  </div>`;

  const footer = `
  <div class="wrap">
    <div>
      <a class="brand" href="index.html">${mark}
        <span><span class="brand-name">Cha Lab.</span>
        <span class="brand-sub"><span class="en">Sustainable Battery Materials Laboratory</span><span class="ko">지속가능 전지소재 연구실</span></span></span>
      </a>
      <p><span class="en">Department of Chemical Engineering<br>S06-0413, Seunghak Campus, Dong-A University<br>Busan, Republic of Korea</span>
         <span class="ko">동아대학교 화학공학과<br>승학캠퍼스 S06-0413<br>부산광역시 사하구</span></p>
      <p><a href="mailto:hcha@dau.ac.kr">hcha@dau.ac.kr</a></p>
    </div>
    <div>
      <h4><span class="en">Explore</span><span class="ko">바로가기</span></h4>
      <ul>
        <li><a href="research.html"><span class="en">Research</span><span class="ko">연구</span></a></li>
        <li><a href="people.html"><span class="en">People</span><span class="ko">구성원</span></a></li>
        <li><a href="publications.html"><span class="en">Publications</span><span class="ko">논문</span></a></li>
        <li><a href="news.html"><span class="en">News</span><span class="ko">소식</span></a></li>
        <li><a href="contact.html"><span class="en">Join us</span><span class="ko">모집·연락</span></a></li>
      </ul>
    </div>
    <div>
      <h4><span class="en">Links</span><span class="ko">외부 링크</span></h4>
      <ul>
        <li><a href="https://scholar.google.co.kr/citations?user=St7bsSAAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a></li>
        <li><a href="https://www.donga.ac.kr" target="_blank" rel="noopener"><span class="en">Dong-A University</span><span class="ko">동아대학교</span></a></li>
        <li><a href="https://cheme.donga.ac.kr" target="_blank" rel="noopener"><span class="en">Dept. of Chemical Engineering</span><span class="ko">화학공학과</span></a></li>
      </ul>
    </div>
    <div class="copy">
      <span>© <span data-year></span> Cha Lab., Dong-A University. <span class="en">All rights reserved.</span></span>
      <span class="en">Electron micrographs and figures © Cha Lab.</span><span class="ko">전자현미경 사진 및 도식 © Cha Lab.</span>
    </div>
  </div>`;

  const h = document.getElementById('site-header');
  const f = document.getElementById('site-footer');
  if (h) h.innerHTML = header;
  if (f) f.innerHTML = footer;
})();
