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


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [orders, setOrders] = useState(null);

  return (

    <AuthProvider
      value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
    >
      <ProductProvider
        value={{ products, setProducts, currentProduct, setCurrentProduct }}
      >
        <CartProvider value={{ cartItems, setCartItems }}>
          <OrderProvider value={{ orders, setOrders }}>
            <DrawerNavigator />

          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>

  );
}
