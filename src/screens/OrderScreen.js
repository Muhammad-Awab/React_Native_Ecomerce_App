import { Text, View, ScrollView, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "../components/OrderItem";
import { getAllOrderItems } from "../features/firebase/order";
import OrderContext from "../features/orderContext";
import AuthContext from "../features/authContext";

// Order screen component
const OrderScreen = ({ navigation }) => {
  // State and context variables
  const { orders, setOrders } = useContext(OrderContext); // Order context
  const { currentUser, isLoggedIn } = useContext(AuthContext); // Authentication context

  // Function to fetch all orders from database
  const fetchAllOrders = async () => {
    const res = await getAllOrderItems();
    if (res.success === true) {
      setOrders(res.data);
    }
  };

  // Effect hook to fetch all orders on component mount and when user changes
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAllOrders();
  }, [currentUser, isLoggedIn]);

  // Listen for changes in orders context and fetch orders if user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchAllOrders();
    }
  }, [orders, isLoggedIn]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Orders</Text>
      </View>
      {/* Display orders if user is logged in */}
      {isLoggedIn ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Map through orders and display order items */}
          {orders?.map((order, index) => (
            <OrderItem
              key={`£{order.orderId}-£{index}`} // Combine orderId with index
              brand={order.brand}
              qty={order.qty}
              title={order.title}
              date={order.date}
              orderId={order.orderId}
              image={order.image}
              price={order.price}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Login to view your Orders!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

// Styles for components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#ffffff",
  },
  header: {
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  scrollView: {
    marginTop: 10,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default OrderScreen;

