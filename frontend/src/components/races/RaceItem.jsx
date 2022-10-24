import { Link } from 'react-router-dom'

function RaceItem({ race }) {
  return (
    <div>
      <div>{new Date(race.race_date).toLocaleString('en-US')}</div>
      <div>{race.series}</div>
      <div>{race.race_name}</div>
      <Link to={`/race/${race._id}`}>View</Link>
    </div>
  )
}

export default RaceItem
