import { Image } from 'react-bootstrap'

const SeriesIcon = ({ series, className }) => {
  let imageUrl
  switch (series) {
    case 'USAC':
      imageUrl = '/images/USACSM.gif'
      break
    case 'Intermountain Cup':
      imageUrl = '/images/icup.jpg'
      break
    case 'Mid-Week':
      imageUrl = '/images/midweekSM.gif'
      break
    case 'Utah State Championship Series':
      imageUrl = '/images/uscsSM.gif'
      break
    default:
      imageUrl = '/images/chainringSM.gif'
  }
  return (
    <Image
      className={className}
      style={{ height: '25px', width: '25px' }}
      src={imageUrl}
      alt='Series'
      fluid
    />
  )
}

export default SeriesIcon
