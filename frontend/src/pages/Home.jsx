import Container from 'react-bootstrap/Container'
import Icon from '../components/shared/Icon'
import { BIKE_ICON } from '../utils/icons'
import GenerateForm from '../components/form-components/GenerateForm'
import useForm from '../forms/form-hooks/useForm'

import { raceFields } from '../forms/inputs/races/raceInputs'

const Home = () => {
  const initialState = {
    race_date: '',
    race_name: '',
    time: '',
    category: '',
    location: '',
    series: ''
  }

  const raceForm = useForm(raceFields, initialState)

  const { form, values, validateForm } = raceForm

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(values)
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
            useLabels
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

export default Home
