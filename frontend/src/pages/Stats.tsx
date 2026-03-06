import './global_pages.css'
import StatsButton from '../componets/StatsButton';

function Stats() {
  return (
    <div>
      <h1 className="title">Stats</h1>
      <p className="text">View your stats here.</p>
      <StatsButton />
    </div>
  )
}

export default Stats
