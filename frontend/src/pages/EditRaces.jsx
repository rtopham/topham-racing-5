import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRaces } from '../features/races/raceSlice'
import Spinner from '../components/shared/Spinner'
import RaceTable from '../components/races/RaceTable'
import Container from 'react-bootstrap/Container'
import { toast } from 'react-toastify'

const EditRaces = () => {
  const { races } = useSelector((state) => state.races)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRaces()).unwrap().catch(toast.error)
  }, [dispatch])

  if (!races) {
    return <Spinner />
  }
  return (
    <Container>
      <h1>Edit Races</h1>
      <RaceTable races={races} editMode />
    </Container>
  )
}

export default EditRaces
