import { useSelector } from 'react-redux'

import Spinner from '../components/shared/Spinner'
import BannerList from '../components/banners/BannerList'
import Container from 'react-bootstrap/Container'
import BannerUpload from '../components/banners/BannerUpload'

const EditRaces = () => {
  const { user, isLoading } = useSelector((state) => state.auth)

  const { banners } = user

  if (isLoading) {
    return <Spinner />
  }
  return (
    <Container>
      <h1>Manage Banners</h1>
      <BannerUpload user={user} />
      <BannerList banners={banners} />
    </Container>
  )
}

export default EditRaces
