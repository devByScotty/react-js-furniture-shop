// CartContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the Cart Context
const CartContext = createContext();

// Custom hook to use the Cart Context
export const useCart = () => {
    return useContext(CartContext);
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    // Add item to cart
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Calculate total
    const calculateTotal = () => {
        const totalAmount = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
        setTotal(totalAmount);
    };

    return (
        <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, clearCart, calculateTotal }}>
            {children}
        </CartContext.Provider>
    );
};
