import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

/*
  ==========================================================
  react-router-dom 기반 page
  ==========================================================

  [중요]
  이 코드를 사용하려면 프로젝트에 react-router-dom이 설치되어 있어야 합니다.

  설치 명령:
  npm install react-router-dom

  [이 코드에서 가장 먼저 보면 좋은 수정 포인트]
  1) 첫 화면 대표작 수정 -> featuredWork
  2) 작품 목록 추가/수정 -> works
  3) 메뉴 / 하위 메뉴 경로 수정 -> menu
  4) 각 하위 페이지의 임시 내용 수정 -> pageContent
  5) 이메일 / 인스타그램 수정 -> SiteFooter

  [해결 방식]
  - 메뉴 item 전체를 relative 컨테이너로 감쌈
  - 드롭다운을 top-full 바로 아래에 붙임
  - invisible / opacity / pointer-events 조합으로 제어
  - group-hover 뿐 아니라 group-focus-within도 함께 사용
  - 드롭다운 자체에 마우스를 올려도 유지되도록 구조를 연결
*/

/*
  =====================================
  1. 대표작 데이터
  =====================================

  [어떻게 수정하나?]
  - title: 작품명
  - year: 연도
  - medium: 재료 / 매체
  - image: 대표 이미지 주소
  - description: 대표작 설명

  [어느 화면에 반영되나?]
  - Home 페이지의 첫 화면 대표작 영역에 반영됩니다.
*/
const featuredWork = {
  title: "FIELD FIGURE IX",
  year: "2026",
  medium: "Cast iron",
  image:
    "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1600&q=80",
  description:
    "첫 화면에서 대표작이 강하게 보이도록 구성한 히어로 영역입니다. 이후 아래로 이어지는 작품 아카이브로 자연스럽게 연결됩니다.",
};

/*
  =====================================
  2. 작품 목록 데이터
  =====================================

  [작품 추가 방법]
  아래 works 배열에 객체를 하나 더 추가하면 됩니다.

  예시:
  {
    id: 7,
    slug: "new-work",
    title: "New Work Title",
    year: "2026",
    category: "Exhibitions",
    image: "이미지주소",
    summary: "짧은 설명",
  }

  [어느 부분이 바뀌나?]
  - Home 페이지 작품 카드 목록
  - 추후 작품 상세 페이지 연결 시 slug를 사용할 수 있음
*/
const works = [
  {
    id: 1,
    slug: "horizon-body",
    title: "Horizon Body",
    year: "2025",
    category: "Exhibitions",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    summary: "대형 설치 작업과 전시 문맥을 함께 보여주는 작품입니다.",
  },
  {
    id: 2,
    slug: "standing-matter",
    title: "Standing Matter",
    year: "2024",
    category: "Drawing",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80",
    summary: "조형적 아이디어를 드로잉 언어로 압축한 작업입니다.",
  },
  {
    id: 3,
    slug: "threshold-form",
    title: "Threshold Form",
    year: "2024",
    category: "Making",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
    summary: "제작 과정과 재료 실험을 기록하는 성격의 작업입니다.",
  },
  {
    id: 4,
    slug: "weight-of-air",
    title: "Weight of Air",
    year: "2023",
    category: "Exhibitions",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    summary: "공간감과 신체성을 동시에 다루는 전시 중심 작업입니다.",
  },
  {
    id: 5,
    slug: "body-diagram",
    title: "Body Diagram",
    year: "2023",
    category: "Drawing",
    image:
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1200&q=80",
    summary: "작가의 사고 흐름을 선과 면으로 정리한 드로잉입니다.",
  },
  {
    id: 6,
    slug: "process-study",
    title: "Process Study",
    year: "2022",
    category: "Making",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    summary: "완성 이전의 과정과 구조를 보여주는 스터디 작업입니다.",
  },
];

/*
  =====================================
  3. 메뉴 데이터
  =====================================

  [핵심]
  이제 children는 문자열이 아니라 객체입니다.
  - label: 하위 메뉴 이름
  - path: 실제 이동할 페이지 경로

  [수정 포인트]
  - 메뉴명 바꾸기 -> label 수정
  - 이동 경로 바꾸기 -> path 수정
*/
const menu = [
  {
    label: "News",
    children: [
      { label: "Current", path: "/news/current" },
      { label: "Archive", path: "/news/archive" },
    ],
  },
  {
    label: "Works",
    children: [
      { label: "Exhibitions", path: "/works/exhibitions" },
      { label: "Drawing", path: "/works/drawing" },
      { label: "Making", path: "/works/making" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Profile", path: "/resources/profile" },
      { label: "Publications", path: "/resources/publications" },
      { label: "Texts", path: "/resources/texts" },
      { label: "Press", path: "/resources/press" },
    ],
  },
];

/*
  =====================================
  4. 하위 페이지 임시 콘텐츠 데이터
  =====================================

  [어떻게 수정하나?]
  - title: 페이지 제목
  - intro: 페이지 상단 소개
  - blocks: 카드처럼 보일 임시 항목들

  [어느 부분이 바뀌나?]
  - 각 하위 페이지의 본문 내용이 바뀝니다.

  나중에 실제 데이터가 생기면 이 부분만 교체하면 됩니다.
*/
const pageContent = {
  "/news/current": {
    title: "Current",
    intro:
      "현재 진행 중인 전시, 신규 프로젝트, 발표 예정 소식 등을 보여주는 페이지입니다.",
    blocks: [
      "Solo exhibition opening next month in Seoul",
      "New public sculpture commission in progress",
      "Recent studio update on cast material experiments",
    ],
  },
  "/news/archive": {
    title: "Archive",
    intro:
      "과거 뉴스와 공지 사항을 연도별로 정리하는 아카이브 페이지입니다.",
    blocks: [
      "2025 — Exhibition announcements and talks",
      "2024 — Archived press releases and project notes",
      "2023 — Public programs and retrospective updates",
    ],
  },
  "/works/drawing": {
    title: "Drawing",
    intro:
      "드로잉, 스케치, 개념 연구 작업을 모아 보여주는 페이지입니다.",
    blocks: [
      "Graphite studies on paper",
      "Charcoal figure sequence",
      "Concept sketches for large-scale sculpture",
    ],
  },
  "/works/making": {
    title: "Making",
    intro:
      "재료 실험, 제작 과정, 스튜디오 기록을 보여주는 페이지입니다.",
    blocks: [
      "Foundry process documentation",
      "Material casting experiments",
      "Studio installation progress log",
    ],
  },
  "/resources/publications": {
    title: "Publications",
    intro:
      "도록, 카탈로그, 인터뷰집 등 출판물을 정리하는 페이지입니다.",
    blocks: [
      "Monograph 2025",
      "Exhibition catalogue 2024",
      "Collected studio essays",
    ],
  },
  "/resources/texts": {
    title: "Texts",
    intro:
      "작가 노트, 비평문, 인터뷰 텍스트를 모아두는 페이지입니다.",
    blocks: [
      "Artist statement",
      "Essay on body and space",
      "Interview transcript with curator",
    ],
  },
  "/resources/press": {
    title: "Press",
    intro:
      "언론 기사, 전시 리뷰, 매체 보도 자료를 정리하는 페이지입니다.",
    blocks: [
      "Feature article in art magazine",
      "Review of recent exhibition",
      "Press mention for public installation",
    ],
  },
};

/*
  =====================================
  Profile 페이지 데이터
  =====================================

  Antony Gormley 사이트의 Profile 페이지처럼,
  이미지 + 작가 소개 + 약력/전시/컬렉션 등의 문서형 레이아웃을 참고하되
  직접 복제하지 않고 보다 범용적인 아카이브 형식으로 구성합니다.
*/
const profileData = {
  portrait:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80",
  name: "JungIn An",
  statement: [
    "Artist Name works across sculpture, drawing, and installation, focusing on the relationship between body, material, and surrounding space.",
    "The practice moves between finished object and process record, often treating the human figure as both a physical structure and a spatial measure.",
    "Recent work has expanded into large-scale exhibition formats, public commissions, and material-based studio research."
  ],
  biography: [
    "Born in Seoul, based between Seoul and London.",
    "Studied fine art and spatial practice, later developing a body of work spanning sculpture, drawing, and site-responsive installation.",
    "Works have been presented in museums, galleries, and public spaces internationally."
  ],
  details: {
    born: "1990, Seoul, South Korea",
    based: "Seoul / London",
    media: "Sculpture, Drawing, Installation",
  },
  selectedExhibitions: [
    "2026 — Bodies in Space, National Museum, Seoul",
    "2025 — Threshold Forms, Example Gallery, London",
    "2024 — Matter and Presence, Project Space, Busan",
    "2023 — Field Notes, Studio Archive, Tokyo",
  ],
  collections: [
    "Example Museum Collection",
    "Private Collection, Seoul",
    "Public Art Commission Archive",
  ],
};

/*
  =====================================
  Exhibition 아카이브 데이터
  =====================================

  [구조]
  - 대표 전시 목록: exhibitions
  - 각 전시 클릭 시 /works/exhibitions/:slug 로 이동
  - detailImages: 해당 전시에 속한 전체 이미지 목록

  아직 실제 이미지를 받지 못한 상태이므로 예시 이미지로 구현합니다.
*/
const exhibitions = [
  {
    title: "Exhibition A",
    slug: "a",
    year: "2026",
    venue: "Example Museum, Seoul",
    coverImage:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1600&q=80",
    description:
      "신체와 공간의 관계를 대형 조형 작업과 설치 방식으로 다룬 전시입니다.",
    detailImages: [
      {
        id: "a1",
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
        alt: "Exhibition A image a1",
      },
      {
        id: "a2",
        src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1400&q=80",
        alt: "Exhibition A image a2",
      },
      {
        id: "a3",
        src: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1400&q=80",
        alt: "Exhibition A image a3",
      },
    ],
  },
  {
    title: "Exhibition B",
    slug: "b",
    year: "2025",
    venue: "Gallery North, London",
    coverImage:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
    description:
      "드로잉과 조형 실험이 하나의 시퀀스로 전개되는 전시입니다.",
    detailImages: [
      {
        id: "b1",
        src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
        alt: "Exhibition B image b1",
      },
      {
        id: "b2",
        src: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1400&q=80",
        alt: "Exhibition B image b2",
      },
      {
        id: "b3",
        src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1400&q=80",
        alt: "Exhibition B image b3",
      },
    ],
  },
  {
    title: "Exhibition C",
    slug: "c",
    year: "2024",
    venue: "Project Space, Tokyo",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    description:
      "공간 배치와 재료의 물성을 전시장 동선과 함께 체험하게 하는 전시입니다.",
    detailImages: [
      {
        id: "c1",
        src: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1400&q=80",
        alt: "Exhibition C image c1",
      },
      {
        id: "c2",
        src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
        alt: "Exhibition C image c2",
      },
      {
        id: "c3",
        src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
        alt: "Exhibition C image c3",
      },
    ],
  },
];

/*
  =====================================
  공통 레이아웃 컴포넌트들
  =====================================
*/
function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <div>
          {/* 실제 작가 이름으로 바꾸려면 여기 수정 */}
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          </p>
          <Link to="/" className="mt-1 block text-2xl tracking-wide">
            JungIn An
          </Link>
        </div>

        <nav className="hidden gap-8 lg:flex">
          {menu.map((item) => (
            <div key={item.label} className="group relative">
              <button
                type="button"
                className="text-sm uppercase tracking-[0.22em] text-neutral-700 transition hover:text-black"
              >
                {item.label}
              </button>

              {/*
                드롭다운 사라짐 문제 해결 포인트
                ---------------------------------
                1) top-full 로 부모 바로 아래에 붙여 hover 단절을 줄임
                2) pt-3 로 시각적 여백은 주되, 실제 hover 영역은 이어지게 구성
                3) invisible/opacity/pointer-events 제어
                4) group-hover + group-focus-within 동시 적용

                만약 여백을 더 벌리고 싶으면 mt 대신 pt를 활용하는 편이 안전합니다.
              */}
              <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="min-w-[240px] rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl">
                  <ul className="space-y-3">
                    {item.children.map((sub) => (
                      <li key={sub.path}>
                        <Link
                          to={sub.path}
                          className="block text-sm text-neutral-600 transition hover:text-black"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Contact
          </p>
          <h5 className="mt-2 text-2xl">Get in touch</h5>
        </div>

        <div className="space-y-3 text-sm">
          {/* E-Mail */}
          <a
            href="mailto:artist@example.com"
            className="block text-neutral-700 underline underline-offset-4 transition hover:text-black"
          >
            artist@example.com
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/inny_artist/"
            target="_blank"
            rel="noreferrer"
            className="block text-neutral-700 underline underline-offset-4 transition hover:text-black"
          >
            @inny_artist
          </a>
        </div>
      </div>
    </footer>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-stone-50 text-neutral-900 font-serif">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

/*
  =====================================
  Home 페이지
  =====================================
*/
function HomePage() {
  return (
    <Layout>
      {/*
        =====================================
        메인 대표작 섹션
        =====================================

        [이번 수정 사항]
        1) 대표작 이미지를 더 크게 보여주도록 유지
        2) 작품명 / 연도를 이미지의 왼쪽 하단에 오버레이 형태로 배치

        [수정 포인트]
        - 대표작 정보 수정 -> featuredWork
        - 왼쪽 하단 캡션 위치 수정 -> absolute bottom-0 left-0 부분
        - 캡션 글자 크기 / 색 수정 -> 아래 caption div의 className 수정
      */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-neutral-200 shadow-sm">
          <img
            src={featuredWork.image}
            alt={featuredWork.title}
            className="h-[62vh] w-full object-cover lg:h-[86vh]"
          />

          {/*
            대표작 캡션 오버레이
            - 이미지 왼쪽 하단에 작품명, 연도 표시
            - 작품 설명을 추가하고 싶으면 아래 p 태그를 하나 더 넣으면 됨
          */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/65 via-black/25 to-transparent p-6 text-white lg:p-8">
            <p className="text-2xl leading-tight lg:text-4xl">{featuredWork.title}</p>
            <p className="mt-2 text-sm tracking-[0.18em] text-white/85 lg:text-base">
              {featuredWork.year}
            </p>
          </div>
        </div>
      </section>

      {/*
        =====================================
        메인 페이지 아래 작품 아카이브
        =====================================

        [이번 수정 사항]
        - 기존 카드 그리드 형식을 제거
        - 작품이 하나씩 세로로 이어지는 형식으로 변경
        - 사용자가 작품을 계속 추가할 수 있도록 works 배열 기반 구조는 유지

        [작품 추가 방법]
        - works 배열에 새 객체를 추가하면 아래 섹션에 자동으로 한 작품씩 계속 이어서 나타납니다.

        예시:
        {
          id: 7,
          slug: "new-work",
          title: "New Work Title",
          year: "2026",
          category: "Exhibitions",
          image: "이미지주소",
          summary: "짧은 설명"
        }

        [어느 부분을 수정해야 무엇이 바뀌나]
        - 이미지 바꾸기 -> works 배열의 image 수정
        - 작품명 바꾸기 -> works 배열의 title 수정
        - 연도 바꾸기 -> works 배열의 year 수정
        - 소개글 바꾸기 -> works 배열의 summary 수정
        - 작품 하나의 레이아웃 전체 바꾸기 -> 아래 article 구조 수정
      */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="mb-10 border-b border-neutral-200 pb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Works Archive
          </p>
          <h3 className="mt-2 text-2xl">Selected Works</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600">
            아래 작품들은 카드가 아니라 작품 하나씩 차례로 이어지는 형식입니다.
            works 배열에 데이터를 추가하면 이 아카이브가 계속 길어지는 구조입니다.
          </p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {works.map((work) => (
            <article key={work.id} className="border-b border-neutral-200 pb-12 lg:pb-16">
              <div className="overflow-hidden rounded-[2rem] bg-neutral-200">
                <img
                  src={work.image}
                  alt={work.title}
                  className="h-[48vh] w-full object-cover lg:h-[78vh]"
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="text-2xl leading-tight lg:text-3xl">{work.title}</p>
                  <p className="mt-2 text-sm tracking-[0.18em] text-neutral-500">
                    {work.year}
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                    {work.category}
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
                    {work.summary}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

/*
  =====================================
  하위 페이지 공통 템플릿
  =====================================

  [설명]
  News / Works / Resources 하위 페이지는 구조가 비슷하므로
  이 공통 컴포넌트에 데이터만 넣는 방식으로 만들었습니다.

  [수정 포인트]
  페이지 레이아웃 / 카드 디자인을 바꾸고 싶으면 이 컴포넌트를 수정하면 됩니다.
*/
function SubPage({ pageKey }) {
  const data = pageContent[pageKey];

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 border-b border-neutral-200 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Page
            </p>
            <h1 className="mt-3 text-4xl leading-tight lg:text-5xl">{data.title}</h1>
          </div>

          <div className="lg:col-span-8">
            <p className="max-w-3xl text-sm leading-7 text-neutral-600">
              {data.intro}
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.blocks.map((block, index) => (
            <article
              key={`${pageKey}-${index}`}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                Item {index + 1}
              </p>
              <p className="mt-4 text-sm leading-7 text-neutral-700">{block}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

/*
  =====================================
  Resources -> Profile 전용 페이지
  =====================================

  사용자가 요청한 대로,
  Antony Gormley의 Profile 페이지 같은 "문서형 아카이브" 분위기를 참고하되
  그대로 복제하지 않고 범용 작가 포트폴리오에 맞는 구조로 구성했습니다.

  [레이아웃 특징]
  - 상단에 이미지
  - 우측/하단에 작가 소개문
  - 아래에 Biography / Details / Selected Exhibitions / Collections 분리
*/
function ProfilePage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 border-b border-neutral-200 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[2rem] bg-neutral-200">
              <img
                src={profileData.portrait}
                alt={profileData.name}
                className="h-[55vh] w-full object-cover lg:h-[72vh]"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Resources
            </p>
            <h1 className="mt-3 text-4xl leading-tight lg:text-5xl">
              Profile
            </h1>
            <h2 className="mt-6 text-2xl leading-tight lg:text-3xl">
              {profileData.name}
            </h2>

            <div className="mt-8 space-y-5">
              {profileData.statement.map((paragraph, index) => (
                <p
                  key={`statement-${index}`}
                  className="max-w-3xl text-sm leading-8 text-neutral-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Biography
            </p>
          </div>
          <div className="space-y-5 lg:col-span-8">
            {profileData.biography.map((paragraph, index) => (
              <p
                key={`bio-${index}`}
                className="max-w-3xl text-sm leading-8 text-neutral-700"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 border-t border-neutral-200 py-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Details
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Born</p>
                <p className="mt-3 text-sm leading-7 text-neutral-700">{profileData.details.born}</p>
              </div>
              <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Based</p>
                <p className="mt-3 text-sm leading-7 text-neutral-700">{profileData.details.based}</p>
              </div>
              <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Media</p>
                <p className="mt-3 text-sm leading-7 text-neutral-700">{profileData.details.media}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 border-t border-neutral-200 py-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Selected Exhibitions
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {profileData.selectedExhibitions.map((item, index) => (
                <div key={`exhibition-${index}`} className="border-b border-neutral-200 pb-4">
                  <p className="text-sm leading-7 text-neutral-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 border-t border-neutral-200 py-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Collections
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {profileData.collections.map((item, index) => (
                <div key={`collection-${index}`} className="border-b border-neutral-200 pb-4">
                  <p className="text-sm leading-7 text-neutral-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

/*
  =====================================
  Works -> Exhibitions 목록 페이지
  =====================================

  [사용자 요구사항]
  - 전시회 목록이 아카이브 형식으로 보임
  - 각 전시에는 대표 이미지가 있음
  - 대표 이미지를 클릭하면 해당 전시 상세 페이지로 이동
*/
function ExhibitionsArchivePage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="border-b border-neutral-200 pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Works
          </p>
          <h1 className="mt-3 text-4xl leading-tight lg:text-5xl">Exhibitions</h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-neutral-600">
            전시 목록이 아카이브 형식으로 정리되는 페이지입니다. 각 전시의 대표 이미지를 클릭하면 해당 전시의 전체 이미지가 보이는 상세 페이지로 이동합니다.
          </p>
        </div>

        <div className="mt-12 space-y-16 lg:space-y-24">
          {exhibitions.map((exhibition) => (
            <article key={exhibition.slug} className="border-b border-neutral-200 pb-12 lg:pb-16">
              <Link to={`/works/exhibitions/${exhibition.slug}`} className="block">
                <div className="overflow-hidden rounded-[2rem] bg-neutral-200">
                  <img
                    src={exhibition.coverImage}
                    alt={exhibition.title}
                    className="h-[46vh] w-full object-cover transition duration-500 hover:scale-[1.02] lg:h-[74vh]"
                  />
                </div>
              </Link>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <h2 className="text-2xl leading-tight lg:text-3xl">
                    <Link to={`/works/exhibitions/${exhibition.slug}`} className="hover:underline underline-offset-4">
                      {exhibition.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm tracking-[0.18em] text-neutral-500">
                    {exhibition.year}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">{exhibition.venue}</p>
                </div>

                <div className="lg:col-span-8">
                  <p className="max-w-3xl text-sm leading-7 text-neutral-600">
                    {exhibition.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

/*
  =====================================
  Works -> Exhibitions -> 상세 페이지
  =====================================

  예:
  /works/exhibitions/a 로 접속하면
  Exhibition A의 a1, a2, a3 이미지가 보입니다.
*/
function ExhibitionDetailPage() {
  const { slug } = useParams();
  const exhibition = exhibitions.find((item) => item.slug === slug);

  if (!exhibition) {
    return <NotFoundPage />;
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="border-b border-neutral-200 pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Exhibition Detail
          </p>
          <h1 className="mt-3 text-4xl leading-tight lg:text-5xl">
            {exhibition.title}
          </h1>
          <p className="mt-4 text-sm tracking-[0.18em] text-neutral-500">
            {exhibition.year} · {exhibition.venue}
          </p>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-neutral-600">
            {exhibition.description}
          </p>
        </div>

        <div className="mt-8">
          <Link
            to="/works/exhibitions"
            className="text-sm text-neutral-700 underline underline-offset-4"
          >
            Back to exhibitions
          </Link>
        </div>

        <div className="mt-10 space-y-12 lg:space-y-16">
          {exhibition.detailImages.map((image) => (
            <article key={image.id}>
              <div className="overflow-hidden rounded-[2rem] bg-neutral-200">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-[48vh] w-full object-cover lg:h-[78vh]"
                />
              </div>
              <p className="mt-4 text-sm tracking-[0.18em] text-neutral-500">
                {image.id}
              </p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function NotFoundPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          404
        </p>
        <h1 className="mt-3 text-4xl">Page not found</h1>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-600">
          요청한 페이지를 찾을 수 없습니다. 메뉴에서 다른 페이지를 선택해 주세요.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block text-sm text-neutral-700 underline underline-offset-4"
        >
          Return to home
        </Link>
      </section>
    </Layout>
  );
}

/*
  =====================================
  최상위 App
  =====================================

  [핵심]
  여기서 실제 페이지 경로를 정의합니다.

  [수정 포인트]
  - 새 하위 페이지를 추가하려면 Route를 추가
  - 기존 페이지 경로를 바꾸려면 path 수정
*/
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/news/current"
          element={<SubPage pageKey="/news/current" />}
        />
        <Route
          path="/news/archive"
          element={<SubPage pageKey="/news/archive" />}
        />

        <Route
          path="/works/exhibitions"
          element={<ExhibitionsArchivePage />}
        />
        <Route
          path="/works/exhibitions/:slug"
          element={<ExhibitionDetailPage />}
        />
        <Route
          path="/works/drawing"
          element={<SubPage pageKey="/works/drawing" />}
        />
        <Route
          path="/works/making"
          element={<SubPage pageKey="/works/making" />}
        />

        <Route
          path="/resources/profile"
          element={<ProfilePage />}
        />
        <Route
          path="/resources/publications"
          element={<SubPage pageKey="/resources/publications" />}
        />
        <Route
          path="/resources/texts"
          element={<SubPage pageKey="/resources/texts" />}
        />
        <Route
          path="/resources/press"
          element={<SubPage pageKey="/resources/press" />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
