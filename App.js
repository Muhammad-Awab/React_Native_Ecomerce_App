import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";
import { useState } from "react";
import { AuthProvider } from "./src/features/authContext";
import { ProductProvider } from "./src/features/productContext";
import { CartProvider } from "./src/features/cartContext";
import { OrderProvider } from "./src/features/orderContext";

import DrawerNavigator from "./src/navigation/DrawerNavigator";

// The main entry point of the application
export default function App() {
  // State variables to manage user authentication, product data, cart items, and orders
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [orders, setOrders] = useState(null);

  // Render the application components wrapped in context providers
  return (

    <AuthProvider // Context provider for managing authentication-related state variables such as 'isLoggedIn' and 'currentUser'
      value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
    >
      <ProductProvider // Context provider for managing product-related state variables such as 'products' and 'currentProduct'
        value={{ products, setProducts, currentProduct, setCurrentProduct }}
      >
        <CartProvider value={{ cartItems, setCartItems }}> {/* Context provider for managing cart-related state variables such as 'cartItems'*/}
          <OrderProvider value={{ orders, setOrders }}> {/* Context provider for managing order-related state variables such as 'orders'*/}
            <DrawerNavigator /> {/* Allows users to navigate between different screens using a drawer-based navigation structure of the application*/}

          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>

  );
}
