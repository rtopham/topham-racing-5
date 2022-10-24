import { useEffect } from 'react'
import EditRecordButton from '../shared/EditRecordButton'
import { STRAVA_ICON } from '../../utils/icons'
import useForm from '../../forms/form-hooks/useForm'

import { stravaProfileFields } from '../../forms/fields-and-forms/stravaFields'

const EditStravaDetailsButton = ({
  stravaProfile,
  checkTokens,
  editStravaFunction
}) => {
  const editStravaProfileForm = useForm(stravaProfileFields, stravaProfile)

  useEffect(() => {
    checkTokens()
    //eslint-disable-next-line
  }, [])

  return (
    <div className='d-grid gap-2 mb-3'>
      <EditRecordButton
        variant='outline-dark'
        icon={STRAVA_ICON}
        buttonText='Edit Strava Details'
        title='Edit Strava Details'
        form={editStravaProfileForm.form}
        editFunction={() => {
          editStravaFunction(editStravaProfileForm.values)
        }}
        cancelFunction={editStravaProfileForm.reset}
        disabled={
          !editStravaProfileForm.validateForm(editStravaProfileForm.form) ||
          !editStravaProfileForm.changesMade(
            stravaProfile,
            editStravaProfileForm.values
          )
        }
      />
    </div>
  )
}

export default EditStravaDetailsButton
