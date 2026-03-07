import './global_pages.css'
import StatsButton from '../componets/StatsButton';
import Graph from '../componets/StatsComponet';

function Stats() {
  return (
    
    <div className="pageContainer">
      <div className="ContentOfTitle">
        <h1 className="title">Stats</h1>
        <p className="text">View your stats here.</p>
      </div>
      <StatsButton />
      <Graph />
    </div>
  )
}

export default Stats
