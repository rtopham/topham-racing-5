import Tip from './Tip'

const Icon = ({ icon, className, tip }) => {
  return tip ? (
    <Tip message={tip}>
      <i className={icon + ' ' + className} />
    </Tip>
  ) : (
    <i className={icon + ' ' + className} />
  )
}

export default Icon
