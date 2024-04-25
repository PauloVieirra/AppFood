import React, { createContext, useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
 

  const addToCart = (item) => {
    const newItem = {
      id: uuidv4(), // Adiciona um novo campo "id" ao item com um ID único
      nome: item.nome,
      descricao: item.descricao,
      quantidade: item.quantity,
      price: item.price,
      image: item.image,
      curtadescricao: item.curtadescricao,
      uid: item.uid,
      formatedPrice: item.formatedPrice,
      totalPrice: item.totalPrice,
    };
    setCart([...cart, newItem]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
