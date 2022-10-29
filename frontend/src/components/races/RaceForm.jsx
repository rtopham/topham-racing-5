import { Container } from 'react-bootstrap'
import { EDIT_ICON } from '../../utils/icons'
import GenerateForm from '../../forms/form-components/GenerateForm'
import Icon from '../shared/Icon'
import { toast } from 'react-toastify'
import useForm from '../../forms/form-hooks/useForm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateRace } from '../../features/races/raceSlice'
import { raceFields } from '../../forms/fields-and-forms/raceFields'

const RaceForm = ({ race }) => {
  const raceForm = useForm(raceFields, {
    ...race,
    race_date: race.race_date.substring(0, 10)
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { form, values, validateForm, changesMade } = raceForm

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(updateRace(values))
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate('/')
        toast.success('Race updated!')
      })
      .catch(toast.error)
  }

  return (
    <>
      <Container style={{ width: '500px' }}>
        <section>
          <h1>
            <Icon icon={EDIT_ICON} /> Edit Race
          </h1>
        </section>

        <section>
          <GenerateForm
            form={form}
            uselabels
            onSubmit={onSubmit}
            buttonText='Add Race'
            buttonVariant='outline-dark'
            disabled={
              !validateForm(form) ||
              !changesMade(
                { ...race, race_date: race.race_date.substring(0, 10) },
                values
              )
            }
          />
        </section>
      </Container>
    </>
  )
}

export default RaceForm
