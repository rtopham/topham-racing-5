import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Icon from '../components/shared/Icon'
import EditStravaDetailsButton from '../components/strava/EditStravaDetailsButton'
import {
  EDIT_ICON,
  PLUS_ICON,
  USER_ICON,
  LOCK_ICON,
  SAND_BOX_ICON,
  IMAGE_ICON
} from '../utils/icons'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Spinner from '../components/shared/Spinner'
import EditRecordButton from '../components/shared/EditRecordButton'
import {
  profileFields,
  editPasswordFields
} from '../forms/fields-and-forms/authFields'

import { toast } from 'react-toastify'
import useForm from '../forms/form-hooks/useForm'

import { updateProfile } from '../features/auth/authSlice'
import useStravaProfile from '../components/strava/strava-hooks/useStravaProfile'
import { updateStravaProfile } from '../features/strava/stravaSlice'

import { useSelector, useDispatch } from 'react-redux'

const Dashboard = () => {
  const { userId } = useParams()
  const { user } = useSelector((state) => state.auth)
  const [stravaProfile, checkTokens] = useStravaProfile(userId)
  const { name, email } = user
  const editProfileForm = useForm(profileFields, { name, email })
  const editPasswordForm = useForm(editPasswordFields, {
    password: '',
    confirmPassword: ''
  })

  const dispatch = useDispatch()

  const editProfileFunction = () => {
    dispatch(updateProfile(editProfileForm.values))
      .unwrap()
      .then(() => {
        toast.success('Profile updated!')
      })
      .catch(toast.error)
  }

  const editPasswordFunction = () => {
    const { password } = editPasswordForm.values
    dispatch(updateProfile({ name, email, password }))
      .unwrap()
      .then(() => {
        toast.success('Password updated!')
      })
      .catch(toast.error)
  }

  const editStravaFunction = (values) => {
    const {
      strava_athlete_id,
      strava_token,
      strava_refresh_token,
      strava_token_expires_at,
      strava_activity_url,
      strava_rides_url
    } = values
    const updatedFields = {
      strava_athlete_id,
      strava_token,
      strava_refresh_token,
      strava_token_expires_at,
      strava_activity_url,
      strava_rides_url
    }
    dispatch(updateStravaProfile({ userId, updatedFields }))
      .unwrap()
      .then(() => {
        toast.success('Strava Details updated!')
      })
      .catch(toast.error)
  }

  if (!user || !stravaProfile) return <Spinner />

  return (
    <Container style={{ width: '500px' }}>
      <Link to='/add-race' style={{ textDecoration: 'none' }}>
        <div className='d-grid gap-2 mb-3'>
          <Button variant='outline-dark'>
            <Icon icon={PLUS_ICON} /> Add Race
          </Button>
        </div>
      </Link>
      <Link to='/edit-races' style={{ textDecoration: 'none' }}>
        <div className='d-grid gap-2 mb-3'>
          <Button variant='outline-dark'>
            <Icon icon={EDIT_ICON} /> Edit or Delete Race
          </Button>
        </div>
      </Link>
      <div className='d-grid gap-2 mb-3'>
        <EditRecordButton
          variant='outline-dark'
          icon={USER_ICON}
          buttonText='Edit Profile'
          title='Edit Profile'
          form={editProfileForm.form}
          editFunction={editProfileFunction}
          cancelFunction={editProfileForm.reset}
          disabled={
            !editProfileForm.validateForm(editProfileForm.form) ||
            !editProfileForm.changesMade(
              { name: user.name, email: user.email },
              editProfileForm.values
            )
          }
        />
      </div>
      <div className='d-grid gap-2 mb-3'>
        <EditRecordButton
          variant='outline-dark'
          icon={LOCK_ICON}
          buttonText='Edit Password'
          title='Edit Password'
          form={editPasswordForm.form}
          editFunction={editPasswordFunction}
          cancelFunction={editPasswordForm.reset}
          disabled={
            !editPasswordForm.validateForm(editPasswordForm.form) ||
            !editPasswordForm.changesMade(
              { name: user.name, email: user.email },
              editPasswordForm.values
            )
          }
        />
      </div>
      <EditStravaDetailsButton
        stravaProfile={stravaProfile}
        checkTokens={checkTokens}
        editStravaFunction={editStravaFunction}
      />
      <Link to='/banners' style={{ textDecoration: 'none' }}>
        <div className='d-grid gap-2 mb-3'>
          <Button variant='outline-dark'>
            <Icon icon={IMAGE_ICON} /> Manage Banners
          </Button>
        </div>
      </Link>

      <Link to='/sandbox' style={{ textDecoration: 'none' }}>
        <div className='d-grid gap-2 mb-3'>
          <Button variant='outline-dark'>
            <Icon icon={SAND_BOX_ICON} /> Sand Box
          </Button>
        </div>
      </Link>
    </Container>
  )
}

export default Dashboard
