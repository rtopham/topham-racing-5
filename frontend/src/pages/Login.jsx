import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { toast } from 'react-toastify'
import { SIGN_IN_ICON } from '../utils/icons'
import Icon from '../components/shared/Icon'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import Spinner from '../components/shared/Spinner'
import GenerateForm from '../forms/form-components/GenerateForm'

import useForm from '../forms/form-hooks/useForm'
import { loginFields } from '../forms/fields-and-forms/authFields'

const Login = () => {
  const initialState = { email: '', password: '' }
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginForm = useForm(loginFields, initialState)

  const { form, values, validateForm } = loginForm

  const { isLoading } = useSelector((state) => state.auth)

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = values
    dispatch(login(userData))
      .unwrap()
      .then((user) => {
        // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
        // getting a good response from our API or catch the AsyncThunkAction
        // rejection to show an error message
        toast.success(`Logged in as ${user.name}`)
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
            <Icon icon={SIGN_IN_ICON} /> Login
          </h1>
          <p>Please log in to add or edit races</p>
        </section>

        <section>
          <GenerateForm
            form={form}
            onSubmit={onSubmit}
            buttonText='Log in'
            buttonVariant='outline-dark'
            disabled={!validateForm(form)}
          />
        </section>
      </Container>
    </>
  )
}

export default Login
