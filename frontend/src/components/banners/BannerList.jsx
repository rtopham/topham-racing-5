import BannerRow from './BannerRow'

const BannerList = ({ banners }) => {
  return (
    <div>
      {banners.map((banner) => {
        return <BannerRow banner={banner} key={banner._id} />
      })}
    </div>
  )
}

export default BannerList
