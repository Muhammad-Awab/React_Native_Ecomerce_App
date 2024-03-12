import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ProductItem = ({ title, brand, image, price }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.brand}>{brand}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>Price: ${price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  innerContainer: {
    flexDirection: "row",
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  brand: {
    fontSize: 14,
    color: "#888",
  },
  priceContainer: {
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ProductItem;


