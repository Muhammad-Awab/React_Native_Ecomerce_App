import React, { createContext, useState } from 'react';

// Creating a new context for managing products
const ProductContext = createContext();

// Exporting the ProductProvider component to provide product context to its descendants

export const ProductProvider = ({ children }) => {
  // State variables to store products and the currently selected product
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Providing the products and methods to manipulate them via context
  return (
    <ProductContext.Provider value={{ products, setProducts, currentProduct, setCurrentProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
// Exporting the ProductContext for accessing product state and methods throughout the application
export default ProductContext;