import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
