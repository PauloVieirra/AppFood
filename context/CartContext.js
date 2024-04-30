import React, { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  console.log(cart);

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.uid === item.uid);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + item.quantity,
        totalPrice: updatedCart[existingItemIndex].price * (updatedCart[existingItemIndex].quantity + item.quantity),
      };
      setCart(updatedCart);
    } else {
      const newItem = {
        id: uuidv4(),
        ...item,
        totalPrice: item.price * item.quantity,
      };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (itemUid) => {
    setCart(cart.filter((item) => item.uid !== itemUid));
  };

  
  const updateCartItem = (itemId, newQuantity) => {
    setCart(
        cart.map((item) =>
            item.uid === itemId ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity } : item
        )
    );
};


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
