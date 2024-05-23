import { StyleSheet, Text, View, Pressable, ToastAndroid } from "react-native";
import React, { useContext } from "react";
import CartContext from "../features/cartContext"; // Importing cart context
import { addToOrders } from "../features/firebase/order"; // Importing function to add orders
import OrderContext from "../features/orderContext"; // Importing order context

// TotalSummaryCard component
const TotalSummaryCard = ({ totalPrice }) => {
  const { setCartItems } = useContext(CartContext); // Getting setCartItems function from cart context
  const { setOrderItems } = useContext(OrderContext) // Getting setOrderItems function from order context

  // Function to place order
  const placeOrder = async () => {
    const res = await addToOrders(); // Adding order
    if (res.success === true) { // If order placement is successful
      setCartItems([]); // Clear cart items
      ToastAndroid.show("Order placed successfully!!!", ToastAndroid.BOTTOM) // Show toast notification
      // Instead of setting orderItems directly, fetch updated orders and update the state
      // fetchAllOrders(); // Fetch updated orders
    }
  }

  return (
    <View className="border border-gray-200 rounded-lg p-6">
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-lg">Total Price:</Text>
        <Text className="font-extrabold text-xl">£{totalPrice}</Text>
      </View>
      <Pressable onPress={placeOrder} className="bg-black py-4 rounded-lg mt-6">
        <Text className="font-semibold text-white text-center">Place Order</Text>
      </Pressable>
    </View>
  );
};

export default TotalSummaryCard;

const styles = StyleSheet.create({}); // Styles for the component
