import React from 'react'

// Creating a new context for managing orders
const OrderContext=React.createContext()

// Exporting the OrderProvider component to provide order context to its descendants
export const OrderProvider = OrderContext.Provider;

// Exporting the OrderContext for accessing order state and methods throughout the application
export default OrderContext;