import React, { createContext, useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const newItem = {
      id: uuidv4(),
      ...item,
      totalPrice: item.price * item.quantity,
    };
    setCart([...cart, newItem]);
  };

  const removeFromCart = (itemUid) => {
    setCart(cart.filter((item) => item.uid !== itemUid));
  };

  const updateCartItem = (itemId, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity } : item
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
