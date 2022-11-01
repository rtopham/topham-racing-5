import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { updateStravaTokens } from '../../../features/strava/stravaSlice'

const useStrava = (userId) => {
  const { stravaProfile } = useSelector((state) => state.strava)
  const dispatch = useDispatch()

  useEffect(() => {
    //check tokens and get strava profile

    dispatch(updateStravaTokens(userId)).unwrap().catch(toast.error)
  }, [dispatch, userId])

  return stravaProfile
}

export default useStrava
