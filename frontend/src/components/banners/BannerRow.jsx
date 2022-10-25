import DeleteRecordButton from '../../components/shared/DeleteRecordButton'

const BannerRow = ({ banner }) => {
  const imgUrl = '/banners/' + banner.filename

  const deleteFunction = () => {
    console.log('Delete the banner')
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
