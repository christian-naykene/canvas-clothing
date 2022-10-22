import { DirectoryItem } from '../directory/directory-item.component'
import './categories.styles.scss'

export const Categories = () => {
  const categories = require('../../directory/directory.json')
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}
