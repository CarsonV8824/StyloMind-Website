import './global_pages.css'
import StatsButton from '../componets/StatsButton';
//import Graph from '../componets/StatsComponet';

function Stats() {
  return (
    <div>
      <div className="pageContainer">
        <h1 className="title">Stats</h1>
        <p className="text">View your stats here.</p>
        <StatsButton />
        {/* <Graph /> */}
      </div>
    </div>
  )
}

export default Stats
