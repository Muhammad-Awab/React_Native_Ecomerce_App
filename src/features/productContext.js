import React, { createContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  return (
    <ProductContext.Provider value={{ products, setProducts, currentProduct, setCurrentProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;