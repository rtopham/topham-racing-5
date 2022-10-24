import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { toast } from 'react-toastify'
import { USER_ICON } from '../utils/icons'
import Icon from '../components/shared/Icon'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'
import Spinner from '../components/shared/Spinner'
import GenerateForm from '../forms/form-components/GenerateForm'
import { checkPasswordMatch } from '../forms/form-utils/formValidation'

import useForm from '../forms/form-hooks/useForm'
import { registerFields } from '../forms/fields-and-forms/authFields'

const Register = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const registerForm = useForm(registerFields, initialState)

  const { form, values, validateForm } = registerForm

  const { isLoading } = useSelector((state) => state.auth)

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = values
    dispatch(register(userData))
      .unwrap()
      .then((user) => {
        // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
        // getting a good response from our API or catch the AsyncThunkAction
        // rejection to show an error message
        toast.success(`Registered new user: ${user.name}`)
        navigate('/')
      })
      .catch(toast.error)
  }
  if (isLoading) return <Spinner />
  return (
    <>
      <Container style={{ width: '500px' }}>
        <section>
          <h1>
            <Icon icon={USER_ICON} /> Register
          </h1>
          <p>Please register to use all features</p>
        </section>

        <section>
          <GenerateForm
            form={form}
            onSubmit={onSubmit}
            buttonText='Register'
            buttonVariant='outline-dark'
            disabled={
              !validateForm(form) ||
              !checkPasswordMatch(values.password, values.confirmPassword)
            }
          />
        </section>
      </Container>
    </>
  )
}

export default Register
