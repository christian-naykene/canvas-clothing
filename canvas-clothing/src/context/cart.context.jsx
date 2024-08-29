import { createContext, useReducer } from "react";
import { createAction } from "../utils/firebase/reducer/reducer.utils";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemsCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemsCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled action type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, cartItemsCount, cartTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartItemsCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const dropFromCart = (cartItems, productToRemove) => {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  };

  //Create a function that decreases the cart item quantity or removes it from cart if q is 1
  const decreaseCartItem = (cartArray, productToRemove) => {
    //Check if cart item exists in cart array
    const existingCartItem = cartArray.find(
      (item) => item.id === productToRemove.id
    );
    //If quantity = 1, remove from cart
    if (existingCartItem) {
      if (productToRemove.quantity === 1) {
        return cartItems.filter((item) => item.id !== productToRemove.id);
      }
    }
    return cartArray.map((item) =>
      item.id === productToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = decreaseCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const increaseCartItem = (cartItems, productToAdd) => {
    if (!Array.isArray(cartItems)) {
      console.error("cartItems is not an array:", cartItems);
      return [];
    }
    //find the item in the cart
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
    //if it exists, return item and add quantity value by 1, else return the item
    //return new array with updated values (why new array?)
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = increaseCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToRemove) => {
    const newCartItems = dropFromCart(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartItemsCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
