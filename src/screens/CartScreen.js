import { Text, View, ScrollView, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItem from "../components/CartItem";
import TotalSummaryCard from "../components/TotalSummaryCard";
import CartContext from "../features/cartContext";
import { getCartItems } from "../features/firebase/cart";
import AuthContext from "../features/authContext";

const Cart = ({ navigation }) => {
  const [total, setTotal] = useState();
  const { currentUser, isLoggedIn } = useContext(AuthContext);
  const { cartItems, setCartItems } = useContext(CartContext);

  const calculateTotalAmount = async (data) => {
    const subTotal = await data.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.qty),
      0
    );
    setTotal(subTotal.toFixed(2));
  };

  const fetchCartItems = async () => {
    const res = await getCartItems();
    if (res.success === true) {
      setCartItems(res.data);
      setTotal(res.subTotal);
      calculateTotalAmount(res.data);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchCartItems();
  }, [currentUser, cartItems?.length, cartItems, getCartItems]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Cart</Text>
      </View>
      {isLoggedIn ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {cartItems?.map((item) => (
            <CartItem
              key={item.id}
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
