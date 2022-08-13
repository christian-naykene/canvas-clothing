import { useEffect } from "react";
import { createContext, useState } from "react";

export const CartContext =  createContext({
  setIsCartOpen: () => {},
  isCartOpen: false,
  cartItems: [],
  addItemToCart: () => {},
  cartItemsCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {}
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

  const dropFromCart = (cartItems, productToRemove) => {
    return cartItems.filter(item => item.id !== productToRemove.id)
  }

  //Create a function that decreases the cart item quantity or removes it from cart if q is 1
  const decreaseCartItem = (cartArray, productToRemove) => {
    //Check if cart item exists in cart array
    const existingCartItem = cartArray.find(item => item.id === productToRemove.id)
    //If quantity = 1, remove from cart
    if (existingCartItem) {
      if(productToRemove.quantity === 1) {
        return cartItems.filter(item => item.id !== productToRemove.id)
      }
    }
    return cartArray.map(item => item.id === productToRemove.id ?
      {...item, quantity: item.quantity - 1}
      : item
    )
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems( decreaseCartItem(cartItems, productToRemove))
  }

  const increaseCartItem = (cartArray, productToAdd) => {
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
    setCartItems( increaseCartItem(cartItems, productToAdd))
  }

  const clearItemFromCart = (productToRemove) => {
    setCartItems(dropFromCart(cartItems, productToRemove))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartItemsCount,
    removeItemFromCart,
    clearItemFromCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
