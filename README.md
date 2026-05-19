# ASTROPEDIA - Space Explorer

ASTROPEDIA는 천문학과 우주 과학 정보를 웹에서 탐색할 수 있도록 만든 React 기반 프로젝트입니다. 태양계 주요 천체, 항성, 별자리, 천문학 뉴스, 3D 태양계 시뮬레이션을 하나의 웹 페이지 안에서 제공하는 것을 목표로 합니다.

## 프로젝트 목적

이 프로젝트는 천문학·우주 과학에 대한 학술적으로 검증된 정보를 일반 사용자도 쉽게 접근할 수 있도록 정리하는 것을 목표로 합니다. 행성, 항성, 별자리, 우주 탐사와 관련된 핵심 개념을 단순히 나열하는 것이 아니라, 각 천체의 물리적 특성, 관측 데이터, 분류 기준, 탐사 사례를 함께 연결해 우주의 구조와 규모를 단계적으로 이해할 수 있도록 구성했습니다.

또한 백과사전형 콘텐츠와 인터랙티브 시뮬레이션을 결합해 사용자가 정보를 읽는 데서 그치지 않고 직접 탐색하는 경험을 제공하고자 했습니다. 정적인 설명 중심의 천문학 자료에서 벗어나, 데이터와 시각화가 함께 작동하는 학습형 웹 애플리케이션을 만드는 것이 핵심 방향입니다.

## 왜 만들었나요?

천문학에 대한 개인적인 관심에서 시작한 프로젝트입니다. 행성의 크기와 공전 주기, 항성의 밝기와 거리, 별자리의 분류처럼 서로 다른 천문 정보를 체계적으로 정리하는 과정 자체가 천문학을 더 깊게 배우는 방법이라고 생각했습니다.

특히 웹 기술을 활용하면 복잡한 천문 데이터를 더 직관적으로 표현할 수 있습니다. React를 이용해 페이지와 데이터를 구조화하고, Three.js 기반 3D 시뮬레이션을 통해 태양계의 공전 구조를 시각적으로 보여줌으로써 사용자가 우주를 더 쉽게 이해할 수 있는 경험을 만들고자 했습니다.

## 현재 진행 상태

- 홈 화면 구현 완료
- 탭 기반 SPA 구조 구현 완료
- 천문학 백과사전 페이지 구현 완료
- 태양계 주요 천체 데이터 구축 완료
- 주요 항성 데이터 구축 완료
- 최신 천문학 뉴스 데이터 20개로 확장 완료
- 3D 태양계 시뮬레이션 구현 완료
- 소개 페이지 및 데이터 출처/로드맵 섹션 구현 완료
- 반응형 CSS 기본 대응 완료

아직 추가 개발이 필요한 부분:

- 별자리 88개 데이터 구축
- 별자리 상세 페이지 및 계절별 분류
- NASA APOD API 연동
- 뉴스 데이터 자동 업데이트
- ISS 또는 우주 탐사선 실시간 위치 추적
- 3D 시뮬레이션 행성 수 확장 및 데이터 통합

## 주요 기능

### 홈

- 우주 테마의 다크 UI
- Canvas 기반 별 배경
- 주요 통계 정보 표시
- 백과사전과 시뮬레이션 페이지로 빠른 이동

### 백과사전

- 태양계 주요 천체 정보 제공
- 왜행성 데이터 포함
- 주요 항성 목록 제공
- 카드 클릭 시 상세 모달 표시
- 지름, 질량, 거리, 공전 주기, 중력, 위성 수 등 주요 데이터 표시

### 3D 태양계 시뮬레이션

- React Three Fiber 기반 3D 렌더링
- 태양, 행성, 궤도 링 표시
- 공전 속도 비율 시각화
- OrbitControls를 통한 카메라 회전/줌
- 별 배경 렌더링

### 뉴스

- 천문학·우주 과학 관련 최신 뉴스 목록
- NASA, ESA, ESO 등 공식 출처 기반 데이터
- 카테고리, 날짜, 요약, 출처 링크 제공
- 각 뉴스에 `whyItMatters` 필드를 추가해 과학적 의미 설명
- 태그 기반으로 관련 주제 표시

### 소개

- 프로젝트 목적 설명
- 개발 동기 설명
- 기술 스택 표시
- 참조 데이터 출처 정리
- 향후 개발 로드맵 표시

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| Frontend | React 19 |
| Build Tool | Vite |
| 3D Rendering | Three.js, React Three Fiber |
| 3D Helpers | @react-three/drei |
| Styling | Vanilla CSS |
| State Management | React useState, useEffect |
| Lint | ESLint |
| Package Manager | npm |

## 데이터 구성

주요 데이터는 정적 JavaScript 파일로 관리합니다.

- `src/data/planets.js`
  - 태양계 천체 데이터
  - 왜행성 데이터
  - 주요 항성 데이터
- `src/data/news.js`
  - 천문학 뉴스 데이터
  - 날짜, 카테고리, 요약, 출처, 태그, 과학적 의미 포함

현재 백과사전 데이터에는 태양, 8개 행성, 3개 왜행성, 주요 항성 데이터가 포함되어 있습니다. 뉴스 데이터는 2026년 기준 NASA, ESA, ESO 등 공식 기관의 천문학·우주 과학 소식을 중심으로 구성되어 있습니다.

## 프로젝트 구조

```text
space-explorer/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Encyclopedia.jsx
│   │   ├── Encyclopedia.css
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Nav.jsx
│   │   ├── Nav.css
│   │   ├── News.jsx
│   │   ├── News.css
│   │   ├── SolarSystem.jsx
│   │   └── SolarSystem.css
│   ├── data/
│   │   ├── news.js
│   │   └── planets.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.js
├── vite.config.js
└── README.md
```

## 실행 방법

의존성 설치:

```bash
npm install
```

개발 서버 실행:

```bash
npm run dev
```

프로덕션 빌드:

```bash
npm run build
```

빌드 결과 미리보기:

```bash
npm run preview
```

린트 검사:

```bash
npm run lint
```

## 개발 메모

현재 3D 시뮬레이션의 행성 데이터는 `SolarSystem.jsx` 내부 배열로 관리되고, 백과사전 데이터는 `src/data/planets.js`에서 관리됩니다. 향후에는 두 데이터를 하나의 공통 데이터 구조로 통합하면 유지보수가 쉬워집니다.

뉴스 데이터는 현재 정적 파일로 관리됩니다. 이후 NASA, ESA, APOD 또는 기타 공개 API와 연결하면 최신 뉴스와 이미지를 자동으로 반영할 수 있습니다.

## 참고 데이터 출처

- NASA Planetary Data System
- NASA Exoplanet Exploration
- NASA Science
- European Space Agency
- European Southern Observatory
- IAU Minor Planet Center
- JPL Horizons System
- arXiv Astrophysics
