import './Nav.css'

export default function Nav({ tabs, activeTab, onTabChange }) {
  return (
    <nav className="nav">
      <div className="nav-brand" onClick={() => onTabChange('홈')}>
        <span className="nav-logo">⊕</span>
        <span className="nav-title">ASTROPEDIA</span>
      </div>
      <div className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  )
}
