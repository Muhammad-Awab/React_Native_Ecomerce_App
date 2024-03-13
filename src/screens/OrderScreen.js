import { Text, View, ScrollView, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "../components/OrderItem";
import { getAllOrderItems } from "../features/firebase/order";
import OrderContext from "../features/orderContext";
import AuthContext from "../features/authContext";

const OrderScreen = ({ navigation }) => {
  const { orders, setOrders } = useContext(OrderContext);
  const { currentUser, isLoggedIn } = useContext(AuthContext);

  const fetchAllOrders = async () => {
    const res = await getAllOrderItems();
    if (res.success === true) {
      setOrders(res.data);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAllOrders();
  }, [currentUser, isLoggedIn]);

  // Listen for changes in orders context
  useEffect(() => {
    if (isLoggedIn) {
      fetchAllOrders();
    }
  }, [orders, isLoggedIn]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Orders</Text>
      </View>
      {isLoggedIn ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {orders?.map((order, index) => (
            <OrderItem
              key={`${order.orderId}-${index}`} // Combine orderId with index
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
