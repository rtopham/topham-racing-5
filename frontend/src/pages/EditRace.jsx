import { useEffect } from 'react'

import Spinner from '../components/shared/Spinner'
import RaceForm from '../components/races/RaceForm'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getRace } from '../features/races/raceSlice'

const EditRace = () => {
  const { race } = useSelector((state) => state.races)

  const dispatch = useDispatch()

  const { raceId } = useParams()

  useEffect(() => {
    dispatch(getRace(raceId)).unwrap().catch(toast.error)
  }, [raceId, dispatch])

  if (!race) return <Spinner />
  return <RaceForm race={race} />
}

export default EditRace
