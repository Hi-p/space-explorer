import { useState } from 'react'
import { newsData } from '../data/news'
import './News.css'

/* 카테고리별 아이콘 매핑 */
const categoryIcons = {
  '외계행성':  '🪐',
  '우주망원경': '🔭',
  '탐사':      '🚀',
  '우주론':    '🌌',
  '관측':      '📡',
  '태양계':    '☀️',
  '항성':      '⭐',
  '은하':      '🌀',
  '행성형성':  '💫',
  '우주환경':  '🛡️',
}

/* 모든 카테고리 추출 */
const allCategories = [...new Set(newsData.map(n => n.category))]

export default function News() {
  const [filter, setFilter] = useState('전체')

  const filtered = filter === '전체'
    ? newsData
    : newsData.filter(n => n.category === filter)

  const [featured, ...rest] = filtered

  return (
    <div className="page-container news-page">
      <p className="section-label">Latest Research & Missions</p>
      <h1>천문학 뉴스</h1>

      {/* 카테고리 필터 */}
      <div className="news-filters">
        <button
          className={`news-filter-btn ${filter === '전체' ? 'active' : ''}`}
          onClick={() => setFilter('전체')}
        >
          전체
        </button>
        {allCategories.map(cat => (
          <button
            key={cat}
            className={`news-filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {categoryIcons[cat] || '📰'} {cat}
          </button>
        ))}
      </div>

      <p className="news-count">총 <strong>{filtered.length}</strong>건의 뉴스</p>

      {/* 하이라이트 (최신 뉴스 1개) */}
      {featured && (
        <article className="news-hero glass-card">
          <div className="news-hero-icon">{categoryIcons[featured.category] || '📰'}</div>
          <div className="news-hero-body">
            <div className="news-hero-meta">
              <span
                className="news-category"
                style={{ background: featured.categoryColor }}
              >
                {featured.category}
              </span>
              <time className="news-date">{featured.date}</time>
            </div>
            <h2 className="news-hero-title">{featured.title}</h2>
            <p className="news-hero-summary">{featured.summary}</p>
            {featured.whyItMatters && (
              <p className="news-impact">
                <span>의미</span>
                {featured.whyItMatters}
              </p>
            )}
            {featured.tags && (
              <div className="news-tags">
                {featured.tags.map(tag => (
                  <span key={tag} className="news-tag">{tag}</span>
                ))}
              </div>
            )}
            <a
              className="news-source"
              href={featured.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              📡 {featured.source} ↗
            </a>
          </div>
        </article>
      )}

      {/* 나머지 뉴스 카드 그리드 */}
      {rest.length > 0 && (
        <div className="news-grid">
          {rest.map(item => (
            <article key={item.id} className="news-card glass-card">
              <div className="news-card-top">
                <span className="news-card-icon">{categoryIcons[item.category] || '📰'}</span>
                <div className="news-card-meta">
                  <span
                    className="news-category"
                    style={{ background: item.categoryColor }}
                  >
                    {item.category}
                  </span>
                  <time className="news-date">{item.date}</time>
                </div>
              </div>
              <h3 className="news-card-title">{item.title}</h3>
              <p className="news-card-summary">{item.summary}</p>
              {item.tags && (
                <div className="news-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="news-tag">{tag}</span>
                  ))}
                </div>
              )}
              <a
                className="news-source"
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                📡 {item.source} ↗
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
