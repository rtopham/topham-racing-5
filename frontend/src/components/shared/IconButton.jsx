import Icon from './Icon'
import Tip from './Tip'

const IconButton = ({ icon, className, onClick, tip }) => (
  <span
    onClick={onClick}
    style={{
      cursor: 'pointer'
    }}
  >
    <Icon icon={icon} className={className} tip={tip} />
  </span>
)

export default IconButton
