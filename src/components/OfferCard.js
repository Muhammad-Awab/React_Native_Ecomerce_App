import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import Suit from "../../assets/suit.png";

// OfferCard component
const OfferCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.offerText}>50% Off</Text>
        <Text style={styles.offerDescription}>On everything today</Text>
        <Text style={styles.offerCode}>With code: FSCREATION</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Get Now</Text>
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <Image source={Suit} style={styles.image} />
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    maxWidth: 250,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 6,
    maxHeight: 160,
    overflow: "hidden",
    backgroundColor: "#c7c7c7",
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  offerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  offerDescription: {
    fontSize: 16,
  },
  offerCode: {
    fontSize: 12,
    marginVertical: 4,
  },
  button: {
    backgroundColor: "black",
    width: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 55,
    height: 150,
    resizeMode: "contain",
  },
});

export default OfferCard;
