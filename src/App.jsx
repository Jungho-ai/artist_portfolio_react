import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import sampleImage from "./assets/flowing_tree.jpg";
import { useState } from "react";


/*
  ==========================================================
  이 파일은 단일 파일 시안이지만, 실제 하위 페이지 이동이 가능하도록
  react-router-dom 기반 구조로 바꾼 버전입니다.
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

  [이번 수정에서 해결한 것]
  1) 하위 메뉴를 실제 페이지 라우팅으로 분리
  2) 드롭다운 메뉴에 마우스를 옮길 때 창이 사라지는 문제 해결

  [드롭다운 문제 원인]
  기존 코드에서는 버튼 아래와 드롭다운 박스 사이에 hover가 끊기는 공간이 있었고,
  group-hover만으로 처리해서 마우스가 하위 메뉴로 이동하는 순간 hover가 풀렸습니다.

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
  image:sampleImage,
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
    label: "Exhibition",
    children: [
      { label: "Archive", path: "/exhibition/archive" },
    ],
  },
  {
    label: "Works",
    children: [
      { label: "Drawing", path: "/works/drawing" },
      { label: "Artist's Note", path: "/works/Artist's note" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "CV", path: "/resources/CV" },
      { label: "Texts", path: "/resources/texts" }
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
const artistNotes = [
  {
    id: 1,
    date: "March 2026",
    title: "On figure and distance",
    body: [
      "I have been thinking about how a figure can function less as an isolated object and more as a measure of distance within a room.",
      "The work begins not with anatomy but with interval: the gap between a surface and the body that approaches it, the gap between one object and another, and the invisible tension formed between them.",
      "In recent studio work, I have tried to reduce the amount of explanation inside the object itself and allow more of the meaning to emerge through placement, weight, and surrounding emptiness.",
    ],
  },
  {
  id: 2,
    date: "March 2026",
    title: "On figure and distance",
    image: sampleImage,
    imageAlt: "Artist note related image 1",
    body: [
      "문단1",
      "문단2",
      "문단3",
    ],
  },
  {
    id: 3,
    date: "October 2025",
    title: "Studio note on repetition",
    body: [
      "Repetition is useful not because it guarantees refinement, but because it reveals where refinement stops being productive.",
      "By remaking a similar structure several times, I can observe which decisions are essential and which are merely habitual.",
      "The note I leave for myself is simple: repeat until the structure becomes clear, then stop before the work turns illustrative.",
    ],
  },
];

const drawingWorks = [
  {
    id: 1,
    title: "Drawing I",
    year: "2026",
    medium: "Graphite on paper",
    size: "10 × 10 cm",
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    title: "Drawing II",
    year: "2025",
    medium: "Ink on paper",
    size: "24 × 18 cm",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    title: "Drawing III",
    year: "2025",
    medium: "Charcoal on paper",
    size: "30 × 20 cm",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
  },
];

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
  "/works/Artist's Note": {
    title: "Artist's Note",
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
  CV 페이지 데이터
  =====================================

  Antony Gormley 사이트의 CV 페이지처럼,
  이미지 + 작가 소개 + 약력/전시/컬렉션 등의 문서형 레이아웃을 참고하되
  직접 복제하지 않고 보다 범용적인 아카이브 형식으로 구성합니다.
*/
const CVData = {
  portrait:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80",
  name: "JungIn An",
  statement: [
    "Artist Name works across sculpture, drawing, and installation, focusing on the relationship between body, material, and surrounding space.",
    "The practice moves between finished object and process record, often treating the human figure as both a physical structure and a spatial measure.",
    "Recent work has expanded into large-scale exhibition formats, public commissions, and material-based studio research."
  ],
  biography: [
    "Seoul",
    "Studied fine art and spatial practice, later developing a body of work spanning sculpture, drawing, and site-responsive installation.",
    "Works have been presented in museums, galleries, and public spaces internationally."
  ],
  
  selectedExhibitions: [
    "2026 — Bodies in Space, National Museum, Seoul",
    "2025 — Threshold Forms, Example Gallery, London",
    "2024 — Matter and Presence, Project Space, Busan",
    "2023 — Field Notes, Studio Archive, Tokyo",
  ]
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            </p>
            <Link to="/" className="mt-1 block text-2xl tracking-wide">
              JungIn An
            </Link>
          </div>

          <div className="relative translate-x-3">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center"
              aria-label="Toggle menu"
            >
              <span className="text-lg leading-none">
                {menuOpen ? "×" : "☰"}
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full z-50 mt-3 w-72 border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="space-y-6">
                  {menu.map((item) => (
                    <div key={item.label}>
                      <p className="text-xs uppercase tracking-[0.25em] text-neutral-800">
                        {item.label}
                      </p>

                      <ul className="mt-3 space-y-3">
                        {item.children.map((sub) => (
                          <li key={sub.path}>
                            <Link
                              to={sub.path}
                              className="block text-sm text-neutral-500 transition hover:text-black"
                              onClick={() => setMenuOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 lg:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Contact
          </p>
          <h5 className="mt-2 text-2xl"></h5>
        </div>

        <div className="space-y-3 text-sm">
          {/* 실제 이메일 주소를 넣으려면 href와 텍스트를 함께 수정 */}
          <a
            href="mailto:wjddls0611@naver.com"
            className="block text-neutral-700 underline underline-offset-4 transition hover:text-black"
          >
            wjddls0611@naver.com
          </a>

          {/* 실제 인스타그램 주소를 넣으려면 href와 텍스트를 함께 수정 */}
          <a
            href="https://www.instagram.com/inny_artist/"
            target="_blank"
            rel="noreferrer"
            className="block text-neutral-700 underline underline-offset-4 transition hover:text-black"
          >
            @inny_artis
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
        <div className="relative overflow-hidden bg-neutral-200 shadow-sm">
        <img
          src={featuredWork.image}
          alt={featuredWork.title}
          className="w-full h-auto object-contain"
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

        </div>

        <div className="space-y-16 lg:space-y-24">
          {works.map((work) => (
            <article key={work.id} className="border-b border-neutral-200 pb-12 lg:pb-16">
              <div className="overflow-hidden bg-neutral-200">
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
              className="border border-neutral-200 bg-white p-6 shadow-sm"
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
  Resources -> CV 전용 페이지
  =====================================

  사용자가 요청한 대로,
  Antony Gormley의 CV 페이지 같은 "문서형 아카이브" 분위기를 참고하되
  그대로 복제하지 않고 범용 작가 포트폴리오에 맞는 구조로 구성했습니다.

  [레이아웃 특징]
  - 상단에 이미지
  - 우측/하단에 작가 소개문
  - 아래에 Biography / Details / Selected Exhibitions / Collections 분리
*/
function CVPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 border-b border-neutral-200 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="overflow-hidden bg-neutral-200">
              <img
                src={CVData.portrait}
                alt={CVData.name}
                className="h-[55vh] w-full object-cover lg:h-[72vh]"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Resources
            </p>
            <h1 className="mt-3 text-4xl leading-tight lg:text-5xl">
              CV
            </h1>
            <h2 className="mt-6 text-2xl leading-tight lg:text-3xl">
              {CVData.name}
            </h2>

            <div className="mt-8 space-y-5">
              {CVData.statement.map((paragraph, index) => (
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
            {CVData.biography.map((paragraph, index) => (
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
              Selected Exhibitions
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {CVData.selectedExhibitions.map((item, index) => (
                <div key={`exhibition-${index}`} className="border-b border-neutral-200 pb-4">
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
            Exhibition
          </p>
          <h1 className="mt-3 text-4xl leading-tight lg:text-5xl">Archive</h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-neutral-600">
            전시 목록이 아카이브 형식으로 정리되는 페이지입니다. 각 전시의 대표 이미지를 클릭하면 해당 전시의 전체 이미지가 보이는 상세 페이지로 이동합니다.
          </p>
        </div>

        <div className="mt-12 space-y-16 lg:space-y-24">
          {exhibitions.map((exhibition) => (
            <article key={exhibition.slug} className="border-b border-neutral-200 pb-12 lg:pb-16">
              <Link to={`/exhibition/archive/${exhibition.slug}`} className="block">
                <div className="overflow-hidden bg-neutral-200">
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
                    <Link to={`/exhibition/archive/${exhibition.slug}`} className="hover:underline underline-offset-4">
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
            to="/exhibition/archive"
            className="text-sm text-neutral-700 underline underline-offset-4"
          >
            Back to exhibition archive
          </Link>
        </div>

        <div className="mt-10 space-y-12 lg:space-y-16">
          {exhibition.detailImages.map((image) => (
            <article key={image.id}>
              <div className="overflow-hidden bg-neutral-200">
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

function DrawingPage() {
  const [selectedDrawing, setSelectedDrawing] = useState(null);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="border-b border-neutral-200 pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Works
          </p>
          <h1 className="mt-3 text-4xl leading-tight lg:text-5xl">Drawing</h1>
        </div>

        <div className="mt-12 space-y-12 lg:space-y-16">
          {drawingWorks.map((work) => (
            <button
              key={work.id}
              type="button"
              onClick={() => setSelectedDrawing(work)}
              className="block w-full border-b border-neutral-200 pb-12 text-left lg:pb-16"
            >
              <div className="overflow-hidden bg-neutral-200">
                <img
                  src={work.image}
                  alt={work.title}
                  className="h-[48vh] w-full object-cover lg:h-[78vh]"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedDrawing && (
        <div className="fixed inset-0 z-[100] bg-black/70 px-6 py-6 lg:px-10 lg:py-10">
          <div className="mx-auto grid h-full max-w-7xl grid-cols-1 gap-6 bg-white p-4 shadow-2xl lg:grid-cols-12 lg:p-6">
            <div className="overflow-hidden bg-neutral-200 lg:col-span-8">
              <img
                src={selectedDrawing.image}
                alt={selectedDrawing.title}
                className="h-[55vh] w-full object-cover lg:h-full"
              />
            </div>

            <div className="flex flex-col justify-between lg:col-span-4 lg:pl-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  Caption
                </p>

                <div className="mt-6 space-y-6 text-sm leading-7 text-neutral-700">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                      Title
                    </p>
                    <p className="mt-2">{selectedDrawing.title}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                      Year
                    </p>
                    <p className="mt-2">{selectedDrawing.year}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                      Medium
                    </p>
                    <p className="mt-2">{selectedDrawing.medium}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                      Size
                    </p>
                    <p className="mt-2">{selectedDrawing.size}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDrawing(null)}
                className="mt-8 inline-flex w-fit rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

function ArtistsNotePage() {
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="border-b border-neutral-200 pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Works
          </p>
          <h1 className="mt-3 text-4xl leading-tight lg:text-5xl">
            Artist&apos;s Note
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-neutral-600">
            작가 노트를 아카이브 형식으로 쌓아두는 페이지입니다. 새로운
            노트는 <code>artistNotes</code> 배열에 추가하면 세로로 계속
            이어지는 구조로 자동 반영됩니다.
          </p>
        </div>

        <div className="mt-12 space-y-16 lg:space-y-20">
          {artistNotes.map((note) => (
            <article
              key={note.id}
              className="border-b border-neutral-200 pb-12 lg:pb-16"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                    {note.date}
                  </p>
                </div>

              <div className="lg:col-span-9">
                <h2 className="text-2xl leading-tight lg:text-3xl">
                  {note.title}
                    </h2>

                    {note.image && (
                      <div className="mt-6 overflow-hidden bg-neutral-200">
                        <img
                          src={note.image}
                          alt={note.imageAlt || note.title}
                          className="h-[36vh] w-full object-cover lg:h-[56vh]"
                        />
                      </div>
                    )}

                    <div className="mt-6 space-y-5">
                      {note.body.map((paragraph, index) => (
                        <p
                          key={`${note.id}-${index}`}
                          className="text-sm leading-8 text-neutral-700"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
              </div>
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
          path="/exhibition/archive"
          element={<ExhibitionsArchivePage />}
        />
        <Route
          path="/exhibition/archive/:slug"
          element={<ExhibitionDetailPage />}
        />
        <Route
          path="/works/drawing"
          element={<DrawingPage />}
        />
        <Route
          path="/works/Artist's Note"
          element={<ArtistsNotePage />}
        />

        <Route
          path="/resources/CV"
          element={<CVPage />}
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
