import Spinner from '../components/shared/Spinner'
import { useParams } from 'react-router-dom'
import StravaWidgets from '../components/strava/StravaWidgets'
import StravaStats from '../components/strava/StravaStats'
import useStravaProfile from '../components/strava/strava-hooks/useStravaProfile'

const Strava = () => {
  const { userId } = useParams()

  const [stravaProfile, checkTokens] = useStravaProfile(userId)

  if (!stravaProfile) return <Spinner />

  return (
    <>
      <StravaStats stravaProfile={stravaProfile} checkTokens={checkTokens} />
      <StravaWidgets stravaProfile={stravaProfile} />
    </>
  )
}

export default Strava
