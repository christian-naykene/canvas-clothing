import { useEffect } from "react";
import { createContext, useState } from "react";

export const CartContext =  createContext({
  setIsCartOpen: () => {},
  isCartOpen: false,
  cartItems: [],
  setCartItems: () => {},
  cartItemsCount: 0
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const [cartItems, setCartItems] = useState([])
  const [cartItemsCount, setCartItemsCount] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0)
      setCartItemsCount(newCartCount)
  }, [cartItems])

  const handleCartItem = (cartArray, productToAdd) => {
    //find the item in the cart
    const existingCartItem = cartArray.find(cartItem => cartItem.id === productToAdd.id)
    //if it exists, return item and add quantity value by 1, else return the item
    //return new array with updated values (why new array?)
    if(existingCartItem) {
      return cartArray.map(cartItem => cartItem.id === productToAdd.id ?
      {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
      )
    }
      return [...cartItems, {...productToAdd, quantity: 1 }]
  }

  const addItemToCart = (productToAdd) => {
    setCartItems( handleCartItem(cartItems, productToAdd))
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartItemsCount }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
