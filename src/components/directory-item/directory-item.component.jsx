import './directory-item.styles.scss'

export const DirectoryItem = ({ directory }) => {
  const { title, imageUrl } = directory
  return (
    <div className="directory-container">
      <div className="background-image" style={{
        backgroundImage:`url(${imageUrl})`
      }}>
      </div>
      <div className="directory-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}
