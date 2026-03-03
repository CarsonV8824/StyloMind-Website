import { useNavigate } from 'react-router-dom'
import './SideBar.css'

function SideBar() {
  const navigate = useNavigate()

  return (
    <div className="sidebar">
      <button className="sideBarButton" onClick={() => navigate('/home')}>Home</button>
      <button className="sideBarButton" onClick={() => navigate('/upload')}>Upload</button>
      <button className="sideBarButton" onClick={() => navigate('/stats')}>See Stats</button>
    </div>
  )
}

export default SideBar
