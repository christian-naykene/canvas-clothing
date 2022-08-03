import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import { CartContext } from '../../context/cart.context'
import { useContext } from 'react'

export const CartIcon = () => {
  const {isCartOpen, setIsCartOpen, cartItemsCount} = useContext(CartContext)
console.log(cartItemsCount)
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)



  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon'/>
      <span className='item-count'>{cartItemsCount}</span>
    </div>
  )
}
