import './About.css'

const techStack = [
  { label: 'Frontend', value: 'React 19' },
  { label: 'Styling', value: 'Vanilla CSS' },
  { label: '3D Engine', value: 'Three.js + R3F' },
  { label: 'Build Tool', value: 'Vite' },
  { label: 'Animation', value: 'CSS Keyframes' },
  { label: 'Font', value: 'Inter + Orbitron' },
]

const dataSources = [
  { name: 'NASA Planetary Data System', url: 'https://pds.nasa.gov' },
  { name: 'IAU Minor Planet Center', url: 'https://www.minorplanetcenter.net' },
  { name: 'ESA Science & Technology', url: 'https://sci.esa.int' },
  { name: 'JPL Horizons System', url: 'https://ssd.jpl.nasa.gov/horizons' },
  { name: 'arXiv Astrophysics', url: 'https://arxiv.org/list/astro-ph/new' },
]

const roadmap = [
  { version: 'v1.0', desc: '백과사전 + 3D 태양계 시뮬레이션', done: true },
  { version: 'v1.1', desc: '외계행성 35개 + 항성 20개 데이터 확장', done: true },
  { version: 'v1.2', desc: 'IAU 공인 88개 별자리 데이터 완성', done: true },
  { version: 'v1.3', desc: '뉴스 페이지 매거진형 개편 (필터/하이라이트)', done: true },
  { version: 'v1.4', desc: '시뮬레이션 행성 클릭 인터랙션', done: true },
  { version: 'v1.5', desc: 'NASA APOD API 연동 (오늘의 천문 사진)', done: false },
  { version: 'v1.6', desc: '실시간 국제 우주정거장(ISS) 위치 추적', done: false },
  { version: 'v1.7', desc: '별자리 3D 뷰어 (Three.js 별 연결선)', done: false },
  { version: 'v1.8', desc: '다국어 지원 (한국어 / English)', done: false },
  { version: 'v2.0', desc: '사용자 즐겨찾기 & 학습 진도 시스템', done: false },
]

export default function About() {
  return (
    <div className="page-container about-page">
      <p className="section-label">About This Project</p>
      <h1>소개</h1>

      <div className="about-grid">
        <div className="about-purpose">
          <h2>프로젝트 목적</h2>
          <p>
            천문학·우주 과학에 대한 학술적으로 검증된 정보를 일반 사용자도
            이해하기 쉬운 형태로 정리하고, 행성·항성·별자리·우주 탐사와 관련된
            핵심 개념을 체계적으로 제공하는 것을 목표로 합니다. 단순한 정보
            나열이 아니라 천체의 물리적 특성, 관측 데이터, 분류 기준, 탐사
            사례를 함께 연결하여 사용자가 우주의 구조와 규모를 단계적으로
            이해할 수 있도록 구성했습니다. 백과사전형 콘텐츠, 인터랙티브
            시뮬레이션, 최신 연구 동향을 하나의 플랫폼에 통합함으로써 학습과
            탐구가 자연스럽게 이어지는 천문학 지식 환경을 제공하고자 합니다.
          </p>
          <h3>왜 만들었나요?</h3>
          <p>
            이 프로젝트는 천문학에 대한 개인적인 관심에서 출발했지만, 단순히
            흥미로운 우주 이미지를 보여주는 웹 페이지를 넘어 실제 과학적
            데이터를 바탕으로 한 탐구형 웹 콘텐츠를 만들어 보고자 기획했습니다.
            행성의 크기와 공전 주기, 항성의 밝기와 거리, 별자리의 분류처럼
            서로 다른 천문 정보를 한눈에 비교하고 이해할 수 있도록 정리하는
            과정 자체가 천문학을 더 깊게 배우는 방법이라고 생각했습니다.
            또한 3D 시뮬레이션과 시각적 인터페이스를 활용해 사용자가 정보를
            읽는 데서 그치지 않고 직접 관찰하고 탐색하는 경험을 제공하고자
            했습니다. 이 프로젝트를 통해 우주 과학을 더 정확하게 이해하고,
            복잡한 천문 데이터를 웹 기술로 표현하는 방법을 실험하고자 합니다.
          </p>
        </div>

        <div className="about-tech">
          <h2>기술 스택</h2>
          <div className="tech-grid">
            {techStack.map(t => (
              <div key={t.label} className="tech-card glass-card">
                <span className="tech-label">{t.label}</span>
                <span className="tech-value">{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about-bottom">
        <div className="about-sources">
          <h2>참조 데이터 출처</h2>
          {dataSources.map(s => (
            <a
              key={s.name}
              className="source-link glass-card"
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗ {s.name}
            </a>
          ))}
        </div>

        <div className="about-roadmap">
          <h2>개발 로드맵</h2>
          <div className="roadmap-progress-wrap">
            <div className="roadmap-progress-bar">
              <div
                className="roadmap-progress-fill"
                style={{ width: `${(roadmap.filter(r => r.done).length / roadmap.length) * 100}%` }}
              />
            </div>
            <span className="roadmap-progress-text">
              {roadmap.filter(r => r.done).length} / {roadmap.length} 완료
            </span>
          </div>
          <div className="roadmap-list glass-card">
            {roadmap.map(r => (
              <div key={r.version} className={`roadmap-item ${r.done ? 'done' : 'pending'}`}>
                <span className="roadmap-check">{r.done ? '✓' : '○'}</span>
                <span className="roadmap-ver">{r.version}</span>
                <span className="roadmap-desc">{r.desc}</span>
                <span className={`roadmap-badge ${r.done ? 'badge-done' : 'badge-pending'}`}>
                  {r.done ? '완료' : '예정'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
