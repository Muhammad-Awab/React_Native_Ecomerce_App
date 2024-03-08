import { Text, View, ScrollView, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "../components/OrderItem";
import { getAllOrderItems } from "../features/firebase/order";
import OrderContext from "../features/orderContext";
import AuthContext from "../features/authContext";

const OrderScreen = ({ navigation }) => {
  const { orders, setOrders } = useContext(OrderContext);
  const { isLoggedIn } = useContext(AuthContext);

  const fetchAllOrders = async () => {
    const res = await getAllOrderItems();
    if (res.success === true) {
      setOrders(res.data);
<<<<<<< HEAD

    }
  };

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });

  // }, []);
  useEffect(() => {
=======
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
>>>>>>> 4df307a98ad585f06209c677160409300a90f6d5
    fetchAllOrders();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Orders</Text>
      </View>
      {isLoggedIn ? (
<<<<<<< HEAD
        <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>
          {orders?.map((order, index) => (
            <OrderItem
              key={`${order.orderId}_${index}`}
=======
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {orders?.map((order, index) => (
            <OrderItem
              key={`${order.orderId}-${index}`} // Combine orderId with index
>>>>>>> 4df307a98ad585f06209c677160409300a90f6d5
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
