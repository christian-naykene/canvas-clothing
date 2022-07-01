import SHOP_DATA from '../../../shop-data.json'
import { useContext } from 'react'
import { ProductsContext } from '../../../context/products.context'
export const Shop = () => {
  const { products } = useContext(ProductsContext)
  console.log(products)
  return (
    products.map(({id, name}) => (
      <div key={id}>
        <h1>{name}</h1>
      </div>
    ))
  )
}
