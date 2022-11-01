import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getRacesByUser } from '../features/races/raceSlice'
import YearToDate from '../components/stats/YearToDate'
import AllTime from '../components/stats/AllTime'
import Spinner from '../components/shared/Spinner'
import { toast } from 'react-toastify'

const Stats = () => {
  const { races } = useSelector((state) => state.races)

  const dispatch = useDispatch()
  const { userId } = useParams()

  useEffect(() => {
    if (!races) {
      dispatch(getRacesByUser(userId)).unwrap().catch(toast.error)
    }
  }, [dispatch, userId, races])

  if (!races) {
    return <Spinner />
  }

  return (
    <>
      <YearToDate races={races} /> <AllTime races={races} />
    </>
  )
}

export default Stats
