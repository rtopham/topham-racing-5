import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRaces } from '../../features/races/raceSlice'
import Spinner from '../shared/Spinner'
import RaceTable from '../races/RaceTable'

const Races = () => {
  const { races } = useSelector((state) => state.races)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRaces())
  }, [dispatch])

  if (!races) {
    return <Spinner />
  }
  return (
    <>
      <h1>Races</h1>
      <RaceTable races={races} />
    </>
  )
}

export default Races
