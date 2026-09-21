import { HashRouter, Routes, Route } from 'react-router-dom'
import { StatusBar } from './components/hud/StatusBar'
import { DashboardPage } from './pages/DashboardPage'
import { MissionPage } from './pages/MissionPage'

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen">
        <StatusBar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/mission" element={<MissionPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
