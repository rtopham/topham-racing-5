import Container from 'react-bootstrap/Container'
import Icon from '../components/shared/Icon'
import { SAND_BOX_ICON } from '../utils/icons'
import GenerateForm from '../forms/form-components/GenerateForm'
import useForm from '../forms/form-hooks/useForm'

import { sandBoxFields } from '../forms/fields-and-forms/sandBoxFields'

const SandBox = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    selection: 'Option 3',
    radioButtons: 'Female',
    mySwitch: false,
    checkBox: false,
    checkBox2: true,
    numberInput: 0,
    dateInput: '',
    colorInput: '#000000',
    textBox: '',
    time: ''
  }

  const sandBoxForm = useForm(sandBoxFields, initialState)

  const { form, validateForm } = sandBoxForm

  //console.log(raceForm)

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(sandBoxForm.values)
  }
  return (
    <>
      <Container style={{ width: '500px' }}>
        <section>
          <h1>
            <Icon icon={SAND_BOX_ICON} /> Sand Box
          </h1>
        </section>

        <section>
          <GenerateForm
            form={form}
            onSubmit={onSubmit}
            buttonText='Submit Sand Box Form'
            buttonVariant='outline-dark'
            disabled={!validateForm(form)}
          />
        </section>
      </Container>
    </>
  )
}

export default SandBox
