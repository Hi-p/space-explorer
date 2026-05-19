import { useState } from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import Encyclopedia from './components/Encyclopedia'
import SolarSystem from './components/SolarSystem'
import News from './components/News'
import About from './components/About'
import './App.css'

const TABS = ['홈', '백과사전', '시뮬레이션', '뉴스', '소개']

function App() {
  const [activeTab, setActiveTab] = useState('홈')

  const renderPage = () => {
    switch (activeTab) {
      case '홈': return <Home onNavigate={setActiveTab} />
      case '백과사전': return <Encyclopedia />
      case '시뮬레이션': return <SolarSystem />
      case '뉴스': return <News />
      case '소개': return <About />
      default: return <Home onNavigate={setActiveTab} />
    }
  }

  return (
    <>
      <Nav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <main>{renderPage()}</main>
      <footer className="footer">
        <span>ASTROPEDIA © {new Date().getFullYear()}</span>
        <span>데이터 기준: NASA / IAU 2024</span>
      </footer>
    </>
  )
}

export default App
