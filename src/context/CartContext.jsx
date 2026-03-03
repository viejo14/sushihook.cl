import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item, quantity = 1) => {
    setCartItems(prevItems => {
      const itemKey = item.cartItemId || item.id;
      const existingItem = prevItems.find(i => (i.cartItemId || i.id) === itemKey);
      if (existingItem) {
        return prevItems.map(i => 
          (i.cartItemId || i.id) === itemKey
            ? {
                ...i,
                quantity: i.quantity + quantity,
                extraPrice: (i.extraPrice || 0) + (item.extraPrice || 0)
              }
            : i
        );
      }
      return [...prevItems, { ...item, quantity }];
    });
    // Open cart automatically when adding items
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prevItems =>
      prevItems.filter(item => (item.cartItemId || item.id) !== itemKey)
    );
  };

  const updateQuantity = (itemKey, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemKey);
      return;
    }
    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.cartItemId || item.id) === itemKey
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.quantity) + (item.extraPrice || 0),
      0
    );
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    toggleCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
