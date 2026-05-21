import { useState, useEffect } from 'react'
import { solarSystemBodies, dwarfPlanets, notableStars, exoPlanets } from '../data/planets'
import { constellations } from '../data/constellations'
import './Encyclopedia.css'

const allPlanets = [...solarSystemBodies, ...dwarfPlanets]

export default function Encyclopedia() {
  const [tab, setTab] = useState('행성')
  const [planetTab, setPlanetTab] = useState('태양계')
  const [selected, setSelected] = useState(null)
  const [seasonFilter, setSeasonFilter] = useState('전체')

  const seasons = ['전체', '봄', '여름', '가을', '겨울', '사계절', '남반구']
  const filteredConstellations = seasonFilter === '전체'
    ? constellations
    : constellations.filter(c => c.season === seasonFilter)

  const closeDetail = () => setSelected(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeDetail()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="page-container encyclopedia">
      <p className="section-label">Knowledge Database</p>
      <h1>천문학 백과사전</h1>

      <div className="enc-tabs">
        {['행성', '항성', '별자리'].map(t => (
          <button
            key={t}
            className={`enc-tab ${tab === t ? 'active' : ''}`}
            onClick={() => { setTab(t); setSelected(null) }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 행성 탭 */}
      {tab === '행성' && (
        <>
          {/* 행성 서브탭 */}
          <div className="enc-sub-tabs">
            {['태양계', '외계행성'].map(t => (
              <button
                key={t}
                className={`enc-sub-tab ${planetTab === t ? 'active' : ''}`}
                onClick={() => { setPlanetTab(t); setSelected(null) }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* 태양계 안내 문구 */}
          {planetTab === '태양계' && (
            <div className="exo-notice">
              태양계(Solar System)는 약 46억 년 전 거대한 분자구름의 중력 수축으로 형성된 우리의 우주적 고향이다. 유일한 항성인 <strong>태양</strong>을 중심으로, 암석형 내행성(수성~화성), 거대 가스 행성(목성, 토성), 그리고 거대 얼음 행성(천왕성, 해왕성)으로 이루어진 <strong>8개의 공인 행성</strong>이 존재한다. 이 밖에도 명왕성, 세레스 등 왜행성들과 소행성대, 카이퍼 대, 오르트 구름에 이르는 수많은 소천체들이 태양의 중력에 묶여 공전하고 있다. 태양계는 인류가 직접 탐사선을 보내 표면을 연구할 수 있는 유일한 항성계로, 행성의 형성과 기후의 진화, 나아가 <strong>생명체의 기원</strong>을 이해하는 데 가장 완벽하고 필수적인 천문학적 실험실 역할을 한다.
            </div>
          )}

          {/* 태양계 행성 그리드 */}
          {planetTab === '태양계' && (
            <div className="enc-grid">
              {allPlanets.map(body => (
                <div
                  key={body.id}
                  className="enc-card glass-card"
                  onClick={() => setSelected(body)}
                >
                  <div className="enc-card-color" style={{ background: body.color }} />
                  <div className="enc-card-info">
                    <h3>{body.name}</h3>
                    <span className="enc-card-en">{body.nameEn}</span>
                    <span className="enc-card-type">{body.type}</span>
                  </div>
                  <div className="enc-card-stat">
                    <span className="enc-stat-val">{body.diameter.toLocaleString()} km</span>
                    <span className="enc-stat-label">지름</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 외계행성 안내 문구 */}
          {planetTab === '외계행성' && (
            <div className="exo-notice">
              현재 인류가 관측과 검증을 통해 확인한 외계행성은 <strong>6,270개 이상</strong>이다.
              이들은 대부분 통과 관측법, 시선속도법, 직접 촬영 등 다양한 천문 관측 기법을 통해
              발견되었으며, NASA Exoplanet Archive와 같은 국제 천문 데이터베이스에 지속적으로
              갱신되고 있다. 그러나 이 수치는 실제 우주에 존재하는 행성의 극히 일부에 불과하다.
              우리 은하 안에만 수천억 개의 항성이 존재하고, 많은 항성이 하나 이상의 행성을
              거느릴 가능성이 높기 때문에, 아직 관측되지 않은 행성의 수는 현재 확인된 수보다
              훨씬 많을 것으로 추정된다.
            </div>
          )}

          {/* 외계행성 그리드 */}
          {planetTab === '외계행성' && (
            <div className="enc-grid">
              {exoPlanets.map(planet => (
                <div
                  key={planet.id}
                  className="enc-card glass-card"
                  onClick={() => setSelected(planet)}
                >
                  <div className="enc-card-color" style={{ background: planet.color }} />
                  <div className="enc-card-info">
                    <h3>{planet.name}</h3>
                    <span className="enc-card-en">{planet.nameEn}</span>
                    <span className="enc-card-type">{planet.type}</span>
                  </div>
                  <div className="enc-card-stat">
                    <span className="enc-stat-val">{planet.distance} 광년</span>
                    <span className="enc-stat-label">거리</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* 항성 탭 */}
      {tab === '항성' && (
        <>
          <div className="exo-notice">
            항성(恒星, Star)은 핵융합 반응을 통해 스스로 빛을 내는 고온의 플라즈마 천체로, 우주를 구성하는 가장 근본적인 천문 단위다. 우리 은하에만 약 <strong>2,000억~4,000억 개</strong>의 항성이 존재하며, 관측 가능한 우주 전체에는 약 <strong>10²⁴개</strong> 이상의 항성이 있을 것으로 추정된다. 항성은 질량과 온도에 따라 O·B·A·F·G·K·M형의 스펙트럼 유형으로 분류되며, 분자구름에서 태어나 수명에 따라 백색왜성, 중성자별, 블랙홀로 생을 마감하는 장대한 진화 과정을 거친다. 태양 역시 G형 주계열성으로 수십억 년 후 적색거성으로 진화할 것이다. 또한 항성은 단순한 빛의 원천이 아니다. 수소에서 철에 이르는 무거운 원소들은 모두 항성 내부의 핵융합로에서 만들어지며, 초신성 폭발을 통해 우주 공간에 흩뿌려져 다음 세대 별과 행성, 그리고 생명체의 재료가 된다. 칼 세이건의 말처럼, 지구의 암석, 대기, 그리고 우리 몸을 구성하는 원자들은 모두 오래전 폭발한 <strong>'별의 물질로 만들어진 존재'</strong>인 것이다.
          </div>
          <div className="enc-list">
          {notableStars.map(star => (
            <div
              key={star.id}
              className="enc-row glass-card"
              onClick={() => setSelected(star)}
            >
              <div className="enc-row-left">
                <h3>{star.name}</h3>
                <span className="enc-card-en">{star.nameEn}</span>
              </div>
              <p className="enc-row-desc">{star.description}</p>
              <div className="enc-row-meta">
                <span>거리 <strong>{star.distance}광년</strong></span>
                <span>등급 <strong>{star.magnitude}</strong></span>
                <span>별자리 <strong>{star.constellation}</strong></span>
              </div>
            </div>
          ))}
        </div>
        </>
      )}

      {/* 별자리 탭 */}
      {tab === '별자리' && (
        <>
          <div className="exo-notice">
            별자리(Constellation)는 천구 위의 별들을 연결해 만든 상상의 무늬로, 국제천문연맹(IAU)이 공인한 <strong>88개</strong>의 공식 별자리가 있다. 이들은 고대 그리스·로마 신화, 대항해시대의 탐험, 그리고 18세기 과학 도구에서 이름을 따왔으며, 천문학자들이 천체의 위치를 소통하는 좌표 체계의 기초가 된다.
          </div>

          <div className="news-filters">
            {seasons.map(s => (
              <button
                key={s}
                className={`news-filter-btn ${seasonFilter === s ? 'active' : ''}`}
                onClick={() => setSeasonFilter(s)}
              >
                {s === '전체' ? '전체' : s === '봄' ? '🌸 봄' : s === '여름' ? '☀️ 여름' : s === '가을' ? '🍂 가을' : s === '겨울' ? '❄️ 겨울' : s === '사계절' ? '🔄 사계절(주극성)' : '🌏 남반구'}
              </button>
            ))}
          </div>

          <p className="news-count">총 <strong>{filteredConstellations.length}</strong>개 별자리</p>

          <div className="enc-grid">
            {filteredConstellations.map(c => (
              <div
                key={c.id}
                className="enc-card glass-card"
                onClick={() => setSelected(c)}
              >
                <div className="enc-card-body">
                  <h3>{c.name}</h3>
                  <span className="enc-card-en">{c.nameEn}</span>
                  <span className="enc-card-type">{c.season} · {c.hemisphere}</span>
                </div>
                <div className="enc-card-stat">
                  <span className="enc-stat-val">{c.area.toLocaleString()}</span>
                  <span className="enc-stat-label">평방도</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 상세 모달 */}
      {selected && (
        <div className="detail-overlay" onClick={closeDetail}>
          <div className="detail-modal glass-card" onClick={e => e.stopPropagation()}>
            <button className="detail-close" onClick={closeDetail}>✕</button>
            <div className="detail-header">
              {selected.color && (
                <div className="detail-color" style={{ background: selected.color }} />
              )}
              <div>
                <h2>{selected.name}</h2>
                <span className="enc-card-en">{selected.nameEn}</span>
                <span className="enc-card-type">{selected.type}</span>
              </div>
            </div>
            <p className="detail-desc">{selected.description}</p>

            {/* 행성 상세 스펙 */}
            {selected.diameter && (
              <div className="detail-specs">
                <div className="spec">
                  <span className="spec-label">지름</span>
                  <span className="spec-value">{selected.diameter.toLocaleString()} km</span>
                </div>
                {selected.mass && (
                  <div className="spec">
                    <span className="spec-label">질량</span>
                    <span className="spec-value">{selected.mass}</span>
                  </div>
                )}
                {selected.distanceFromSun > 0 && (
                  <div className="spec">
                    <span className="spec-label">태양 거리</span>
                    <span className="spec-value">{selected.distanceFromSun.toLocaleString()} 백만km</span>
                  </div>
                )}
                {selected.orbitalPeriod && (
                  <div className="spec">
                    <span className="spec-label">공전 주기</span>
                    <span className="spec-value">
                      {selected.orbitalPeriod > 365
                        ? `${(selected.orbitalPeriod / 365.25).toFixed(1)}년`
                        : `${selected.orbitalPeriod}일`}
                    </span>
                  </div>
                )}
                {selected.gravity && (
                  <div className="spec">
                    <span className="spec-label">중력</span>
                    <span className="spec-value">{selected.gravity} m/s²</span>
                  </div>
                )}
                {selected.moons !== undefined && (
                  <div className="spec">
                    <span className="spec-label">위성 수</span>
                    <span className="spec-value">{selected.moons}개</span>
                  </div>
                )}
              </div>
            )}

            {/* 항성 상세 스펙 */}
            {selected.distance && selected.luminosity && (
              <div className="detail-specs">
                <div className="spec">
                  <span className="spec-label">거리</span>
                  <span className="spec-value">{selected.distance} 광년</span>
                </div>
                <div className="spec">
                  <span className="spec-label">겉보기 등급</span>
                  <span className="spec-value">{selected.magnitude}</span>
                </div>
                <div className="spec">
                  <span className="spec-label">광도 (태양 대비)</span>
                  <span className="spec-value">{selected.luminosity.toLocaleString()}배</span>
                </div>
                <div className="spec">
                  <span className="spec-label">표면 온도</span>
                  <span className="spec-value">{selected.temperature.toLocaleString()}K</span>
                </div>
              </div>
            )}

            {/* 외계행성 상세 스펙 */}
            {selected.hostStar && (
              <div className="detail-specs">
                <div className="spec">
                  <span className="spec-label">모항성</span>
                  <span className="spec-value">{selected.hostStar}</span>
                </div>
                <div className="spec">
                  <span className="spec-label">거리</span>
                  <span className="spec-value">{selected.distance} 광년</span>
                </div>
                <div className="spec">
                  <span className="spec-label">질량</span>
                  <span className="spec-value">{selected.mass}</span>
                </div>
                <div className="spec">
                  <span className="spec-label">공전 주기</span>
                  <span className="spec-value">
                    {selected.orbitalPeriod >= 365
                      ? `${(selected.orbitalPeriod / 365.25).toFixed(1)}년`
                      : `${selected.orbitalPeriod}일`}
                  </span>
                </div>
                <div className="spec">
                  <span className="spec-label">발견 연도</span>
                  <span className="spec-value">{selected.discovery}년</span>
                </div>
                <div className="spec">
                  <span className="spec-label">발견 방법</span>
                  <span className="spec-value">{selected.discoveryMethod}</span>
                </div>
              </div>
            )}


            {/* 별자리 상세 스펙 */}
            {selected.area && selected.mainStars && (
              <div className="detail-specs">
                <div className="spec">
                  <span className="spec-label">면적</span>
                  <span className="spec-value">{selected.area.toLocaleString()} 평방도</span>
                </div>
                <div className="spec">
                  <span className="spec-label">주요 별 수</span>
                  <span className="spec-value">{selected.mainStars}개</span>
                </div>
                <div className="spec">
                  <span className="spec-label">가장 밝은 별</span>
                  <span className="spec-value">{selected.brightestStar}</span>
                </div>
                <div className="spec">
                  <span className="spec-label">관측 계절</span>
                  <span className="spec-value">{selected.season}</span>
                </div>
              </div>
            )}

            {/* 신화 */}
            {selected.mythology && (
              <div className="detail-facts">
                <h4>📜 신화와 유래</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.9rem' }}>{selected.mythology}</p>
              </div>
            )}

            {/* 흥미로운 사실 */}
            {selected.facts && (
              <div className="detail-facts">
                <h4>📌 흥미로운 사실</h4>
                <ul>
                  {selected.facts.map((fact, i) => (
                    <li key={i}>{fact}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
