import { newsData } from '../data/news'
import './News.css'

export default function News() {
  return (
    <div className="page-container news-page">
      <p className="section-label">Latest Research & Missions</p>
      <h1>천문학 뉴스</h1>

      <div className="news-list">
        {newsData.map(item => (
          <article key={item.id} className="news-item">
            <div className="news-date-col">
              <time className="news-date">{item.date}</time>
              <span
                className="news-category"
                style={{ background: item.categoryColor }}
              >
                {item.category}
              </span>
            </div>
            <div className="news-content">
              <h2 className="news-title">{item.title}</h2>
              <p className="news-summary">{item.summary}</p>
              {item.whyItMatters && (
                <p className="news-impact">
                  <span>의미</span>
                  {item.whyItMatters}
                </p>
              )}
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
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
