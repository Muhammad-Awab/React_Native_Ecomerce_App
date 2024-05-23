import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, Pressable, ToastAndroid } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { removeItemById } from "../features/firebase/cart"; // Importing function to remove item from cart
import CartContext from "../features/cartContext"; // Importing cart context

// CartItem component
const CartItem = ({ title, image, price, brand, qty, id }) => {
  const { setCartItems } = useContext(CartContext); // Getting setCartItems function from cart context

  // Function to remove item from cart
  const removeItem = async () => {
    const res = await removeItemById(id); // Calling removeItemById function with item id
    if (res.success === true) { // If item removal is successful
      // Show toast notification for successful removal
      ToastAndroid.show("Removed Successfully", ToastAndroid.BOTTOM);
      setCartItems(res.data); // Update cart items with new data after removal
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.brand}>{brand}</Text>
            <Text style={styles.qty}>Qty: {qty}</Text>
            <Text style={styles.price}>£{price}</Text>
          </View>
          <Pressable onPress={removeItem} style={styles.removeButton}>
            <MaterialIcons name="delete-outline" size={20} />
            <Text style={styles.removeText}>Remove</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  textContainer: {
    width: "50%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  brand: {
    fontSize: 14,
  },
  qty: {
    fontWeight: "bold",
  },
  price: {
    fontWeight: "bold",
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  removeText: {
    marginLeft: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});

export default CartItem;
