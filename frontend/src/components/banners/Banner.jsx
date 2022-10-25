import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getBannersByUser } from '../../features/banners/bannerSlice'
import Image from 'react-bootstrap/Image'

const Banner = () => {
  const { userId } = useParams()
  const location = useLocation()
  const { banners } = useSelector((state) => state.banners)
  const dispatch = useDispatch()

  const [banner, setBanner] = useState()

  useEffect(() => {
    dispatch(getBannersByUser(userId))
  }, [dispatch, userId])

  useEffect(() => {
    if (banners) {
      setBanner(
        `/banners/${
          banners[Math.floor(Math.random() * banners.length)].filename
        }`
      )
    }
  }, [banners, location])

  if (!banners) return null

  const divStyle = {
    height: '220px',
    width: '100%'
  }

  return (
    <div className={divStyle}>
      <Image style={divStyle} className='mb-3' src={banner} />
    </div>
  )
}

export default Banner