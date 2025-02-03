"use client";

import { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("basket")) || [];
    setCartItems(storedCart);
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);
