import DeleteRecordButton from '../../components/shared/DeleteRecordButton'
import { deleteBanner } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const BannerRow = ({ banner }) => {
  //const localImgUrl = '/banners/' + banner.filename
  const awsImgUrl = `/api/users/banners/${banner.filename}`

  //const imgUrl = localImgUrl

  const imgUrl = awsImgUrl

  const dispatch = useDispatch()

  const deleteFunction = () => {
    dispatch(deleteBanner(banner._id))
      .unwrap()
      .then(() => {
        toast.success('Banner deleted!')
      })
      .catch(toast.error)
  }

  const divStyle = {
    height: '220px',
    width: '100%',
    backgroundImage: 'url(' + imgUrl + ')',
    backgroundSize: 'cover',
    marginTop: '20px',
    color: 'white'
  }

  return (
    <div style={divStyle}>
      {banner._id}

      <DeleteRecordButton
        className='text-white float-end p-2'
        title='Delete Banner?'
        confirmationText='delete banner'
        confirmationButtonText='Delete Banner'
        tip='Delete this banner'
        confirmationFunction={deleteFunction}
      >
        Delete <strong>{banner.filename}</strong>
        <br></br>
        This action cannot be undone.
      </DeleteRecordButton>
      <br />
      {banner.filename}
    </div>
  )
}

export default BannerRow
