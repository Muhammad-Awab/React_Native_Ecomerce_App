// import React, { createContext, useState } from 'react';
// const ProductContext = createContext();
// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]); // Initialize products with an empty array

//   return (
//     <ProductContext.Provider value={{ products, setProducts }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export default ProductContext;


import React, { createContext, useState } from 'react';


const ProductContext = createContext();


export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Initialize products with an empty array
  const [currentProduct, setCurrentProduct] = useState(null); // Initialize currentProduct with null

  return (
    <ProductContext.Provider value={{ products, setProducts, currentProduct, setCurrentProduct }}>
      <ProductContext.Provider value={{ products, setProducts, currentProduct, setCurrentProduct }}>
        {children}
      </ProductContext.Provider>
      );
};

      export default ProductContext;
