import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import './SolarSystem.css'

/* 행성 데이터: 궤도반경(AU 축소), 크기, 색상, 공전속도 */
const PLANETS = [
  { name: '수성', radius: 3,  size: 0.15, color: '#B5B5B5', speed: 4.15,  period: '88일',  au: '0.39 AU' },
  { name: '금성', radius: 4.5, size: 0.25, color: '#E8CDA0', speed: 1.62,  period: '225일', au: '0.72 AU' },
  { name: '지구', radius: 6,  size: 0.26, color: '#4B8BBE', speed: 1.0,   period: '365일', au: '1.00 AU' },
  { name: '화성', radius: 7.5, size: 0.18, color: '#E27B58', speed: 0.53,  period: '687일', au: '1.52 AU' },
  { name: '목성', radius: 10, size: 0.6,  color: '#C88B3A', speed: 0.084, period: '12년',  au: '5.20 AU' },
  { name: '토성', radius: 13, size: 0.5,  color: '#E5C07B', speed: 0.034, period: '29년',  au: '9.58 AU' },
  { name: '천왕성', radius: 16, size: 0.35, color: '#73C2D0', speed: 0.012, period: '84년',  au: '19.2 AU' },
  { name: '해왕성', radius: 19, size: 0.33, color: '#3F54BA', speed: 0.006, period: '165년', au: '30.1 AU' },
]

function Sun() {
  const ref = useRef()
  useFrame(() => { ref.current.rotation.y += 0.002 })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshBasicMaterial color="#FDB813" />
      <pointLight intensity={200} color="#FDB813" distance={50} />
    </mesh>
  )
}

function Planet({ radius, size, color, speed }) {
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
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
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

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <Sun />
      {PLANETS.map(p => (
        <group key={p.name}>
          <OrbitRing radius={p.radius} />
          <Planet {...p} />
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
  return (
    <div className="page-container solar-page">
      <p className="section-label">Interactive Visualization</p>
      <h1>태양계 시뮬레이션</h1>
      <p className="solar-note">* 공전 속도는 실제 주기 비율 기반. 궤도 반경은 시각화를 위해 압축되었음.</p>

      <div className="solar-layout">
        <div className="solar-canvas-wrap">
          <Canvas camera={{ position: [0, 12, 18], fov: 50 }}>
            <Scene />
          </Canvas>
        </div>

        <div className="solar-sidebar">
          <h3 className="sidebar-title">공전 주기 비교</h3>
          {PLANETS.map(p => (
            <div key={p.name} className="orbit-row">
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
