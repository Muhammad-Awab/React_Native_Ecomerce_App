import { Text, View, ScrollView } from "react-native";
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
      console.log("res.data", res.data);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAllOrders();
  });

  return (
    <SafeAreaView style={{ flex: 1, padding: 5, backgroundColor: "#ffffff" }}>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>My Orders</Text>
      </View>
      {isLoggedIn ? (
        <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>
          {orders?.map((order) => (
            <OrderItem
              key={order.id}
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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Login to view your Orders!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderScreen;
