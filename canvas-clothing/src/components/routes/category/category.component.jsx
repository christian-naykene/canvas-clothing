import { useParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import './category.styles.scss'
import { CategoriesContext } from '../../../context/categories.context'
import { ProductCard } from '../../product-card/product-card.component'

export const Category = () => {
  const { category } = useParams()
  const { categoriesMap } = useContext(CategoriesContext)

  const [products, setProducts] = useState(categoriesMap[category])

  useEffect( product => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return(
    <>
    <h2 className='category-title'>{category.toLocaleUpperCase()}</h2>
    <div className='category-container'>
      { products && products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </>
  )

}
