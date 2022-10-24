import Icon from './Icon'
import Tip from './Tip'

const IconButton = ({ icon, className, onClick, tip }) => (
  <Tip message={tip} plackement='top'>
    <span
      onClick={onClick}
      style={{
        cursor: 'pointer'
      }}
    >
      <Icon className={icon + ' ' + className} />
    </span>
  </Tip>
)

export default IconButton
