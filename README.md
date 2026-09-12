# Cha Lab. 홈페이지 — 관리 가이드

동아대학교 화학공학과 **Cha Lab.** 연구실 홈페이지입니다.
빌드 도구 없이 HTML · CSS · JS 파일만으로 이루어져 있어, 파일을 고치고 GitHub에 올리면 그대로 반영됩니다.

## 폴더 구조

```
index.html          홈
research.html       연구 분야
people.html         지도교수 · 구성원 · 졸업생
publications.html   논문 목록 (검색 · 필터)
news.html           소식
contact.html        모집 · 연락처 · 지도
assets/
  css/style.css     디자인 (색·글꼴·레이아웃)
  js/partials.js    상단 메뉴 · 하단 푸터 (한 곳에서 수정)
  js/main.js        언어 전환 · 다크모드 · 모바일 메뉴
  js/publications.js  ★ 논문 데이터
  js/news.js          ★ 소식 데이터
  img/              이미지 (hero-sem.jpg, prof-cha.jpg, 로고 등)
연구성과 원본/       원본 PDF · PPT · 사진 (사이트에 배포되지 않아도 됨)
```

## 자주 하는 일

### 1. 논문 추가
`assets/js/publications.js` 를 열어 배열 **맨 위**에 항목을 추가합니다.

```js
{
  year: 2027,
  title: '논문 제목',
  authors: 'A Kim, H Cha, ...',          // H Cha 는 자동으로 굵게 표시
  journal: 'Advanced Materials', ref: '39 (1), 2400001',
  type: 'article',                        // article | review | patent | chapter
  lead: true,                             // 주저자(제1/교신)면 true
  cover: false,                           // 표지 논문이면 true
  doi: '10.1002/adma.202400001',          // 있으면 DOI 링크, 없으면 Scholar 검색 링크
  selected: true,                         // 홈 '대표 논문'에 노출 (최대 6편)
},
```

### 2. 소식 추가
`assets/js/news.js` 배열 맨 위에 추가합니다. `tag` 는 `lab | paper | award | talk | recruit`.

### 3. 구성원 추가
`people.html` 의 "Members" 섹션 주석에 있는 카드 양식을 복사해 넣고, 사진은 `assets/img/members/` 폴더에 넣습니다 (정방형 400×400px 권장).

### 4. 연구실 위치 · 지도
1. Google 지도에서 건물 검색 → **공유 → 지도 퍼가기** → iframe 코드 복사
2. `contact.html` 의 `<div class="map-placeholder" id="map">` 내부를 그 iframe 으로 교체
3. 같은 파일의 "Address" 항목에 건물·호수 입력

### 5. 색 바꾸기
`assets/css/style.css` 맨 위 `:root` 의 변수만 바꾸면 전체에 반영됩니다.
`--accent`(포인트), `--accent-soft`, `--mint` 세 개가 그라데이션을 만듭니다.

### 6. 한/영 텍스트
모든 문구는 `<span class="en">English</span><span class="ko">한국어</span>` 쌍으로 들어 있습니다.
둘 다 고쳐야 양쪽 언어에서 반영됩니다.

## 로컬에서 미리보기
폴더에서 아래 명령을 실행하고 브라우저에서 http://localhost:8765 접속:

```bash
python -m http.server 8765
```

## 배포 정보
- 사이트 주소: https://hchalab.github.io
- 저장소: https://github.com/hchalab/hchalab.github.io (계정 `hchalab`)
- `main` 브랜치에 올라간 파일이 1~2분 안에 사이트에 그대로 반영됩니다.

## 사소한 수정을 직접 하는 법 (브라우저만 있으면 됨)
1. https://github.com/hchalab/hchalab.github.io 에 `hchalab` 계정으로 로그인
2. 고칠 파일을 클릭 (예: 소식 → `assets/js/news.js`, 논문 → `assets/js/publications.js`, 문구 → `people.html` 등)
3. 오른쪽 위 **연필 아이콘(Edit this file)** 클릭
4. 내용을 고친 뒤 오른쪽 위 **Commit changes...** → 다시 **Commit changes** 클릭
5. 1~2분 후 사이트를 새로고침해서 확인 (반영이 안 보이면 Ctrl+F5)

파일을 잘못 고쳐 사이트가 깨지면, 저장소 페이지의 **Commits** 목록에서 이전 상태를 볼 수 있고 언제든 되돌릴 수 있습니다.

## 컴퓨터에서 여러 파일을 한 번에 수정하는 법
1. 이 폴더를 VS Code로 열어 수정
2. `index.html`을 더블클릭해 브라우저로 확인 (서버 없이 열림)
3. 터미널에서 아래 세 줄 실행 (또는 GitHub Desktop 프로그램에서 Commit → Push)

```bash
git add -A
git commit -m "내용 수정"
git push
```

## 학교 도메인 연결 (예: chalab.donga.ac.kr)
1. 학교 전산팀에 요청: "`chalab.donga.ac.kr` 을 `hchalab.github.io` 로 향하는 **CNAME 레코드**로 등록해 주세요"
2. 등록되면 저장소 **Settings → Pages → Custom domain** 에 `chalab.donga.ac.kr` 입력 → Save
3. 몇 분 뒤 **Enforce HTTPS** 체크
4. 이후 `hchalab.github.io` 로 들어와도 새 도메인으로 자동 이동됩니다

## 참고
- 논문 데이터 출처: Google Scholar 프로필 (2026-09 기준, 학회 초록 제외)
- 연구 내용·이미지 출처: 「연구성과 및 계획_차형연」(2026.06) 발표자료
- 글꼴: Inter / Inter Tight (Google Fonts), Pretendard (jsDelivr CDN)
