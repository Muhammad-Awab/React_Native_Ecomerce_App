import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

// OrderItem component
const OrderItem = ({ orderId, title, image, brand, date, price, qty }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.info}>Quantity: {qty}</Text>
        <Text style={styles.info}>Date: {date}</Text>
        <Text style={styles.info}>OrderID: <Text style={styles.orderId}>#{orderId}</Text></Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>£{price}</Text>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 2,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 10,
    flexDirection: "row",
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
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  brand: {
    fontSize: 14,
    marginTop: 1,
  },
  info: {
    fontSize: 12,
    marginTop: 1,
  },
  orderId: {
    fontWeight: "bold",
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  price: {
    fontWeight: "bold",
  },
});

export default OrderItem;
