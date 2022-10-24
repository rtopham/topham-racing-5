import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getRacesByUser } from '../../features/races/raceSlice'
import Spinner from '../shared/Spinner'
import RaceTable from './RaceTable'
import LastRace from './LastRace'
import Filters from './Filters'

import useStravaProfile from '../strava/strava-hooks/useStravaProfile'

const RacesByUser = () => {
  const { races, filtered } = useSelector((state) => state.races)

  const dispatch = useDispatch()
  const { userId } = useParams()

  const [stravaProfile, checkTokens] = useStravaProfile(userId)

  useEffect(() => {
    dispatch(getRacesByUser(userId))
  }, [dispatch, userId])

  if (!races || !filtered || !stravaProfile) {
    return <Spinner />
  }

  return (
    <>
      <LastRace race={races[0]} />
      <Filters races={races} />
      <RaceTable
        races={filtered}
        stravaProfile={stravaProfile}
        checkTokens={checkTokens}
      />
    </>
  )
}

export default RacesByUser
