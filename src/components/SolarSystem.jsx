import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Html } from '@react-three/drei'
import './SolarSystem.css'

/* 행성 데이터: 궤도반경(AU 축소), 크기, 색상, 공전속도 */
const PLANETS = [
  {
    name: '수성', nameEn: 'Mercury', radius: 3, size: 0.15, color: '#B5B5B5', speed: 4.15,
    period: '88일', au: '0.39 AU',
    diameter: '4,879 km', mass: '0.055 M⊕', temp: '−173~427°C', moons: 0,
    desc: '태양에 가장 가까운 행성. 대기가 거의 없어 낮과 밤의 온도 차가 600°C에 달한다.'
  },
  {
    name: '금성', nameEn: 'Venus', radius: 4.5, size: 0.25, color: '#E8CDA0', speed: 1.62,
    period: '225일', au: '0.72 AU',
    diameter: '12,104 km', mass: '0.815 M⊕', temp: '462°C (평균)', moons: 0,
    desc: '두꺼운 이산화탄소 대기로 인한 극심한 온실효과로 태양계에서 표면 온도가 가장 높다.'
  },
  {
    name: '지구', nameEn: 'Earth', radius: 6, size: 0.26, color: '#4B8BBE', speed: 1.0,
    period: '365일', au: '1.00 AU',
    diameter: '12,742 km', mass: '1.0 M⊕', temp: '15°C (평균)', moons: 1,
    desc: '액체 상태의 물과 생명이 확인된 유일한 행성. 자기장이 태양풍으로부터 대기를 보호한다.'
  },
  {
    name: '화성', nameEn: 'Mars', radius: 7.5, size: 0.18, color: '#E27B58', speed: 0.53,
    period: '687일', au: '1.52 AU',
    diameter: '6,779 km', mass: '0.107 M⊕', temp: '−65°C (평균)', moons: 2,
    desc: '붉은 행성. 올림포스 몬스(태양계 최대 화산)와 마리네리스 협곡이 있으며, 유인 탐사 후보이다.'
  },
  {
    name: '목성', nameEn: 'Jupiter', radius: 10, size: 0.6, color: '#C88B3A', speed: 0.084,
    period: '12년', au: '5.20 AU',
    diameter: '139,820 km', mass: '317.8 M⊕', temp: '−110°C (상층)', moons: 95,
    desc: '태양계 최대 행성. 대적반(대적점)은 지구보다 큰 폭풍으로 수백 년 이상 지속되고 있다.'
  },
  {
    name: '토성', nameEn: 'Saturn', radius: 13, size: 0.5, color: '#E5C07B', speed: 0.034,
    period: '29년', au: '9.58 AU',
    diameter: '116,460 km', mass: '95.2 M⊕', temp: '−140°C (상층)', moons: 146,
    desc: '거대한 고리 체계가 특징. 위성 타이탄은 두꺼운 대기와 액체 메탄 호수를 가진 독특한 위성이다.'
  },
  {
    name: '천왕성', nameEn: 'Uranus', radius: 16, size: 0.35, color: '#73C2D0', speed: 0.012,
    period: '84년', au: '19.2 AU',
    diameter: '50,724 km', mass: '14.5 M⊕', temp: '−224°C', moons: 28,
    desc: '자전축이 약 98° 기울어져 옆으로 누워 공전하는 얼음 거인. 메탄 대기가 청록색을 띤다.'
  },
  {
    name: '해왕성', nameEn: 'Neptune', radius: 19, size: 0.33, color: '#3F54BA', speed: 0.006,
    period: '165년', au: '30.1 AU',
    diameter: '49,244 km', mass: '17.1 M⊕', temp: '−214°C', moons: 16,
    desc: '태양계에서 바람이 가장 강한 행성(시속 2,100km). 위성 트리톤은 역행 궤도를 도는 대형 위성이다.'
  },
]

const SUN_INFO = {
  name: '태양', nameEn: 'Sun',
  diameter: '1,391,000 km', mass: '333,000 M⊕', temp: '5,500°C (표면)',
  desc: '태양계의 중심 항성. G형 주계열성으로 핵융합을 통해 수소를 헬륨으로 변환하며 에너지를 방출한다.',
  color: '#FDB813'
}

function Sun({ onClick }) {
  const ref = useRef()
  useFrame(() => { ref.current.rotation.y += 0.002 })
  return (
    <mesh
      ref={ref}
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'auto' }}
    >
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshBasicMaterial color="#FDB813" />
      <pointLight intensity={200} color="#FDB813" distance={50} />
    </mesh>
  )
}

function Planet({ radius, size, color, speed, name, isSelected, onClick }) {
  const groupRef = useRef()
  const meshRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed * 0.3
    groupRef.current.position.x = Math.cos(t) * radius
    groupRef.current.position.z = Math.sin(t) * radius
    meshRef.current.rotation.y += 0.01
  })
  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick() }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { document.body.style.cursor = 'auto' }}
      >
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          emissive={isSelected ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.4 : 0}
        />
      </mesh>
      {/* 선택 시 글로우 링 */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size + 0.1, size + 0.18, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      )}
      {/* 이름 라벨 */}
      <Html center distanceFactor={15} style={{ pointerEvents: 'none' }}>
        <span className="planet-label">{name}</span>
      </Html>
    </group>
  )
}

function OrbitRing({ radius }) {
  const points = []
  for (let i = 0; i <= 128; i++) {
    const angle = (i / 128) * Math.PI * 2
    points.push(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
  }
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={129}
          array={new Float32Array(points)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#1a2a3a" transparent opacity={0.5} />
    </line>
  )
}

function Scene({ selected, onSelect }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <Sun onClick={() => onSelect(SUN_INFO)} />
      {PLANETS.map(p => (
        <group key={p.name}>
          <OrbitRing radius={p.radius} />
          <Planet
            {...p}
            isSelected={selected?.name === p.name}
            onClick={() => onSelect(p)}
          />
        </group>
      ))}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={40}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  )
}

export default function SolarSystem() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="page-container solar-page">
      <p className="section-label">Interactive Visualization</p>
      <h1>태양계 시뮬레이션</h1>
      <p className="solar-note">* 행성을 클릭하면 상세 정보를 확인할 수 있습니다. 공전 속도는 실제 주기 비율 기반.</p>

      <div className="solar-layout">
        <div className="solar-canvas-wrap">
          <Canvas camera={{ position: [0, 12, 18], fov: 50 }}>
            <Scene selected={selected} onSelect={setSelected} />
          </Canvas>

          {/* 행성 정보 오버레이 패널 */}
          {selected && (
            <div className="planet-info-panel glass-card">
              <button className="planet-info-close" onClick={() => setSelected(null)}>✕</button>
              <div className="planet-info-header">
                <div className="planet-info-dot" style={{ background: selected.color }} />
                <div>
                  <h3 className="planet-info-name">{selected.name}</h3>
                  <span className="planet-info-en">{selected.nameEn}</span>
                </div>
              </div>
              <p className="planet-info-desc">{selected.desc}</p>
              <div className="planet-info-specs">
                <div className="planet-spec">
                  <span className="planet-spec-label">지름</span>
                  <span className="planet-spec-value">{selected.diameter}</span>
                </div>
                <div className="planet-spec">
                  <span className="planet-spec-label">질량</span>
                  <span className="planet-spec-value">{selected.mass}</span>
                </div>
                <div className="planet-spec">
                  <span className="planet-spec-label">온도</span>
                  <span className="planet-spec-value">{selected.temp}</span>
                </div>
                {selected.moons !== undefined && (
                  <div className="planet-spec">
                    <span className="planet-spec-label">위성</span>
                    <span className="planet-spec-value">{selected.moons}개</span>
                  </div>
                )}
                {selected.period && (
                  <div className="planet-spec">
                    <span className="planet-spec-label">공전</span>
                    <span className="planet-spec-value">{selected.period}</span>
                  </div>
                )}
                {selected.au && (
                  <div className="planet-spec">
                    <span className="planet-spec-label">거리</span>
                    <span className="planet-spec-value">{selected.au}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="solar-sidebar">
          <h3 className="sidebar-title">공전 주기 비교</h3>
          {PLANETS.map(p => (
            <div
              key={p.name}
              className={`orbit-row ${selected?.name === p.name ? 'orbit-row-active' : ''}`}
              onClick={() => setSelected(p)}
            >
              <div className="orbit-dot" style={{ background: p.color }} />
              <span className="orbit-name">{p.name}</span>
              <div className="orbit-bar-wrap">
                <div
                  className="orbit-bar"
                  style={{
                    width: `${Math.min((p.speed / 4.15) * 100, 100)}%`,
                    background: p.color,
                  }}
                />
              </div>
              <span className="orbit-period">{p.period}</span>
              <span className="orbit-au">{p.au}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
