import React from 'react'

// Create a new context for managing the shopping cart
const CartContext=React.createContext()

// Export the CartProvider component to provide cart context to its descendants
export const CartProvider = CartContext.Provider;

// Export the CartContext for accessing cart state and methods throughout the application
export default CartContext;