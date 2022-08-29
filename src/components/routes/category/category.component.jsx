import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CategoriesContext } from '../../../context/categories.context'
import { ProductCard } from '../../product-card/product-card.component'
import './category.styles.scss'

export const Category = () => {
  const { category } = useParams()
  const { categoriesMap } = useContext(CategoriesContext)
  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [categoriesMap, category])

  return (
    <>
      <h2 className="title">{category.toLocaleUpperCase()}</h2>
      <div className='category-container'>
        { products &&
          products.map(product => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </>
  )
}
