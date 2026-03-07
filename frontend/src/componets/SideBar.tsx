import { useNavigate } from 'react-router-dom'
import './SideBar.css'
import logo from '../assets/logo.png'

function SideBar() {
  const navigate = useNavigate()

  return (
    <div className="sidebar">
      <div className="sideBarTitle">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Stylomind</h2>
      </div>
      <div className="sideBarNav">
        <button className="sideBarButton" onClick={() => navigate('/home')}>Home</button>
        <button className="sideBarButton" onClick={() => navigate('/upload')}>Upload</button>
        <button className="sideBarButton" onClick={() => navigate('/stats')}>See Stats</button>
        <button className="sideBarButton" onClick={() => navigate('/compare')}>Compare Texts</button>
      </div>
    </div>
  )
}

export default SideBar
