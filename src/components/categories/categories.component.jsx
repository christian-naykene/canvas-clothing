import { DirectoryItem } from "../directory-item/directory-item.component"
import './categories.styles.scss'

export const Categories = () => {
  const categories = require('../../directory/directory.json')
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} directory={category} />
      ))}
    </div>
  )
}
