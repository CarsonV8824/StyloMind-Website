import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SideBar from './componets/SideBar'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Stats from './pages/Stats'
import Footer from './componets/Footer'
import Compare from './pages/Compare'

function App() {
  return (
    <div className="appLayout">
      <SideBar />
      <main className="pageContent">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
