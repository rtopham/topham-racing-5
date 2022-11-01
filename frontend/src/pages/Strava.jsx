import Spinner from '../components/shared/Spinner'
import { useParams } from 'react-router-dom'
import StravaWidgets from '../components/strava/StravaWidgets'
import StravaStats from '../components/strava/StravaStats'
import useStrava from '../components/strava/strava-hooks/useStrava'

const Strava = () => {
  const { userId } = useParams()

  const stravaProfile = useStrava(userId)

  if (!stravaProfile) return <Spinner />

  return (
    <>
      <StravaStats stravaProfile={stravaProfile} />
      <StravaWidgets stravaProfile={stravaProfile} />
    </>
  )
}

export default Strava
