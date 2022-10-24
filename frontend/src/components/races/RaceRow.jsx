import { Link } from 'react-router-dom'
import DeleteRecordButton from '../shared/DeleteRecordButton'
import EditRecordIcon from '../shared/EditRecordIcon'
import SeriesIcon from './SeriesIcon'
import StravaIconLink from '../strava/StravaIconLink'

import { raceFields } from '../../forms/fields-and-forms/raceFields'
import useForm from '../../forms/form-hooks/useForm'

import { useDispatch } from 'react-redux'
import { deleteRace, updateRace } from '../../features/races/raceSlice'
import { toast } from 'react-toastify'
import { yearMonthDayUTC } from '../../utils/dateFormats'

function RaceRow({ race, stravaProfile, checkTokens, editMode }) {
  const { race_name, race_date, series, category, time, rank } = race

  const editRaceForm = useForm(raceFields, {
    ...race,
    race_date: race.race_date.substring(0, 10)
  })

  const dispatch = useDispatch()

  const editFunction = () => {
    dispatch(updateRace(editRaceForm.values))
      .unwrap()
      .then(() => {
        toast.success('Race updated!')
      })
      .catch(toast.error)
  }

  const deleteFunction = () => {
    dispatch(deleteRace(race._id))
      .unwrap()
      .then(() => {
        toast.success('Race deleted!')
      })
      .catch(toast.error)
  }

  return (
    <tr>
      <td>
        {series}
        <SeriesIcon series={series} className='float-end' />
      </td>
      <td>
        {editMode ? (
          <Link to={`/race/${race._id}`}>{race_name}</Link>
        ) : (
          <>{race_name}</>
        )}
        {!editMode && (
          <StravaIconLink
            race={race}
            stravaProfile={stravaProfile}
            checkTokens={checkTokens}
          />
        )}
        {editMode && (
          <span className='float-end'>
            <EditRecordIcon
              className='text-primary me-3'
              title='Edit Race'
              form={editRaceForm.form}
              editFunction={editFunction}
              cancelFunction={editRaceForm.reset}
              disabled={
                !editRaceForm.validateForm(editRaceForm.form) ||
                !editRaceForm.changesMade(
                  {
                    ...race,

                    race_date: race.race_date.substring(0, 10)
                  },
                  editRaceForm.values
                )
              }
            />

            <DeleteRecordButton
              className='text-warning'
              title='Permanently Delete Race?'
              confirmationText='delete race'
              confirmationButtonText='Delete Race'
              tip='Delete this race'
              confirmationFunction={deleteFunction}
            >
              Delete{' '}
              <strong>
                {race_name} (date: {new Date(race_date).toLocaleDateString()})?{' '}
              </strong>
              <br></br>
              This action cannot be undone.
            </DeleteRecordButton>
          </span>
        )}
      </td>
      <td className='text-center'>{yearMonthDayUTC(race_date)}</td>
      <td className='text-center'>{category}</td>
      <td className='text-center'>{time}</td>
      <td className='text-center'>{rank}</td>
    </tr>
  )
}

export default RaceRow
