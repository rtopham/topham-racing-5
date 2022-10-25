import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { addBanner } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
const formData = new FormData()
const BannerUpload = ({ user }) => {
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const onChange = (e) => {
    const value = e.target.files[0]
    const validExtension = new RegExp(
      '(' +
        ['.jpg', '.jpeg', '.gif', '.png'].join('|').replace(/\./g, '\\.') +
        ')$'
    ).test(value.name)

    if (!validExtension) setError('Please choose an image file')
    else {
      setFileName(value.name)
      formData.set('banner', e.target.files[0])

      setError(null)
    }
  }

  const clickUploadBanner = (e) => {
    e.preventDefault()

    dispatch(addBanner(formData))
      .unwrap()
      .then(() => {
        toast.success('Banner added!')
      })
      .catch(toast.error)
  }
  return (
    <Card className='mt-3'>
      <Card.Header>
        <Card.Title>Upload New Banner</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={clickUploadBanner}>
          <Form.Group>
            <input
              name='bannerFileName'
              accept='image/*'
              onChange={onChange}
              id='icon-button-file-2'
              type='file'
            />
            <label htmlFor='icon-button-file-2'>
              <Button variant='link' as='span'>
                <i className='fa fa-image fa-2x'></i>
              </Button>
            </label>
            <span>{fileName}</span>
          </Form.Group>
          <Form.Group>
            {error && (
              <span>
                <i className='fa fa-exclamation'></i> {error}
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Button variant='primary' type='submit' disabled={fileName === ''}>
              Upload
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default BannerUpload
