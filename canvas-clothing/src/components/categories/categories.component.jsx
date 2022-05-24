import { CategoryItem } from "../category-item/category-item.component"
import './categories.styles.scss'

export const Categories = () => {
  const categories = require('../../directory/directory.json')
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}
