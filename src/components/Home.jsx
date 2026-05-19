import { useEffect, useRef } from 'react'
import './Home.css'

function StarCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const draw = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 별 고정 그리기 (반짝임 없음)
      const stars = Array.from({ length: 250 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.3,
        opacity: Math.random() * 0.6 + 0.3,
      }))

      stars.forEach(s => {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`
        ctx.fill()
      })
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  return <canvas ref={canvasRef} className="star-canvas" />
}

export default function Home({ onNavigate }) {
  const stats = [
    { value: '8', label: '태양계 행성' },
    { value: '88', label: '공인 별자리' },
    { value: '200억+', label: '관측 가능 항성' },
    { value: '13.8Gyr', label: '우주의 나이' },
  ]

  return (
    <div className="home">
      <StarCanvas />
      <section className="hero">
        <div className="hero-content">
          <p className="section-label">천문학 지식 탐구 플랫폼 · v1.0</p>
          <h1 className="hero-title">
            우주를 향한<br />
            <span className="hero-highlight">과학적 탐구</span>
          </h1>
          <p className="hero-desc">
            행성·별자리·은하계에 관한 검증된 과학 데이터와<br />
            인터랙티브 시뮬레이션으로 우주를 탐험하세요.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => onNavigate('백과사전')}>
              백과사전 탐색 →
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('시뮬레이션')}>
              시뮬레이션 보기
            </button>
          </div>
        </div>

        <div className="hero-stats">
          {stats.map(stat => (
            <div key={stat.label} className="stat-item">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
