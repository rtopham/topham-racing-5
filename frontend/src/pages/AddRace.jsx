import Container from 'react-bootstrap/Container'
import Icon from '../components/shared/Icon'
import { BIKE_ICON } from '../utils/icons'
import GenerateForm from '../forms/form-components/GenerateForm'
import useForm from '../forms/form-hooks/useForm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createRace } from '../features/races/raceSlice'

import { raceFields } from '../forms/fields-and-forms/raceFields'

const AddRace = () => {
  const initialState = {
    race_date: '',
    race_name: '',
    time: '',
    category: '',
    location: '',
    series: '',
    rank: 0
  }

  const raceForm = useForm(raceFields, initialState)

  const { form, values, validateForm } = raceForm

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //console.log(raceForm)

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createRace(values))
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate('/')
        toast.success('New Race created!')
      })
      .catch(toast.error)
  }
  return (
    <>
      <Container style={{ width: '500px' }}>
        <section>
          <h1>
            <Icon icon={BIKE_ICON} /> Add Race
          </h1>
        </section>

        <section>
          <GenerateForm
            form={form}
            uselabels
            onSubmit={onSubmit}
            buttonText='Add Race'
            buttonVariant='outline-dark'
            disabled={!validateForm(form)}
          />
        </section>
      </Container>
    </>
  )
}

export default AddRace
