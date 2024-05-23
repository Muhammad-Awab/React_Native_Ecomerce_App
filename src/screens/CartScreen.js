import { Text, View, ScrollView, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItem from "../components/CartItem";
import TotalSummaryCard from "../components/TotalSummaryCard";
import CartContext from "../features/cartContext";
import { getCartItems } from "../features/firebase/cart";
import AuthContext from "../features/authContext";

// Functional component representing the Cart screen
const Cart = ({ navigation }) => {
  const [total, setTotal] = useState("0.00"); // State to manage the total price of items in the cart
  const { currentUser, isLoggedIn } = useContext(AuthContext); // Accessing current user and login status through context
  const { cartItems, setCartItems } = useContext(CartContext); // Accessing cart items and setter function through context

  // Function to calculate total amount based on cart items
  const calculateTotalAmount = async (data) => {
    const subTotal = await data.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.qty),
      0
    );
    setTotal(subTotal.toFixed(2));
  };

  // Function to fetch cart items from Firebase
  const fetchCartItems = async () => {
    const res = await getCartItems();
    if (res.success === true) {
      setCartItems(res.data);
      calculateTotalAmount(res.data);
    }
  };

  // Effect hook to set navigation options and fetch cart items on component mount
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchCartItems();
  }, [currentUser, isLoggedIn]);

  // Effect hook to fetch cart items when there are changes in cartItems context
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartItems();
    }
  }, [cartItems, isLoggedIn]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Cart</Text>
      </View>
      {isLoggedIn ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {cartItems?.map((item, index) => (
            <CartItem
              key={`£{item.id}-£{index}`}
              id={item.id}
              title={item.title}
              brand={item.brand}
              qty={item.qty}
              image={item.image}
              price={item.price}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Login to view your Cart!</Text>
        </View>
      )}
      <View>
        <TotalSummaryCard totalPrice={total} />
      </View>
    </SafeAreaView>
  );
};

// Styles for components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  header: {
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  scrollView: {
    marginTop: 10,
    marginBottom: 20,
  },
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Cart;
