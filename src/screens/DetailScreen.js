import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Pressable, Text, View, Image, ToastAndroid, Modal } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getProductById } from "../features/firebase/product";
import ProductContext from "../features/productContext";
import { addToCart } from "../features/firebase/cart";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Detail screen component to display product details
const DetailScreen = ({ navigation, route }) => {
  const { currentProduct: product, setCurrentProduct } = useContext(ProductContext); // Accessing current product and setter function through context
  // State variables for managing quantity, size, and image modal visibility
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M"); // Default size is Medium
  const [showImageModal, setShowImageModal] = useState(false); // State to track image modal
  const { bottom } = useSafeAreaInsets();
  const id = route.params.productId;

  // Function to increment quantity
  const increment = () => {
    setQty(prev => prev + 1);
  }

  // Function to decrement quantity
  const decrement = () => {
    if (qty > 1) {
      setQty(prev => prev - 1);
    }
  }

  // Function to toggle image modal visibility
  const toggleImageModal = () => {
    setShowImageModal(!showImageModal);
  }

  // Function to navigate back
  const goBack = () => {
    navigation.goBack();
  }

  // Function to add item to cart
  const addItemToCart = async () => {
    const res = await addToCart(id, qty);
    if (res.success === true) {
      ToastAndroid.show("item added to cart", ToastAndroid.BOTTOM);
      setCartItems(res.data);
    }
  }  

  // Function to fetch product details by ID
  const fetchProductById = async (id) => {
    const result = await getProductById(id);
    setCurrentProduct(result);
  }

  // Effect hook to fetch product details by ID when the `id` prop changes
  useEffect(() => {
    fetchProductById(id); // Function to fetch product details from the database based on the provided `id`
  }, [id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {/* Displaying product image */}
        <View style={{ backgroundColor: "black" }}>
          <Pressable onPress={toggleImageModal}>
            <Image source={{ uri: product?.image }} style={{ resizeMode: "cover", height: 470 }} />
          </Pressable>
        </View>

        {/* Product details */}
        <View style={{ borderRadius: 30, backgroundColor: "white", marginTop: -20, padding: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
            <View>
               {/* Product title and brand */}
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>{product?.title}</Text>
              <Text style={{ color: "gray", fontSize: 12 }}>{product?.brand}</Text>
            </View>

            {/* Quantity selection */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable onPress={decrement} style={styles.quantityButton}>
                <Text style={{ fontWeight: "bold" }}>-</Text>
              </Pressable>
              <Text style={{ borderWidth: 1, borderColor: "gray", padding: 8 }}>{qty}</Text>
              <Pressable onPress={increment} style={styles.quantityButton}>
                <Text style={{ fontWeight: "bold" }}>+</Text>
              </Pressable>
            </View>
          </View>

          {/* Size selection */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <Text style={{ color: "gray", marginRight: 10 }}>Sizes:</Text>
            <Pressable onPress={() => setSize("S")} style={[styles.sizeButton, { backgroundColor: size === "S" ? "black" : "white" }]}>
              <Text style={{ color: size === "S" ? "white" : "black" }}>S</Text>
            </Pressable>
            <Pressable onPress={() => setSize("M")} style={[styles.sizeButton, { backgroundColor: size === "M" ? "black" : "white" }]}>
              <Text style={{ color: size === "M" ? "white" : "black" }}>M</Text>
            </Pressable>
            <Pressable onPress={() => setSize("L")} style={[styles.sizeButton, { backgroundColor: size === "L" ? "black" : "white" }]}>
              <Text style={{ color: size === "L" ? "white" : "black" }}>L</Text>
            </Pressable>
          </View>

          {/* Total price and add to cart button */}
          <View>
            <Text style={{ color: "gray", marginBottom: -4 }}>Total Price</Text>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}>£{product?.price}</Text>
          </View>
          <Pressable onPress={addItemToCart} style={styles.addButton}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Add to Cart</Text>
          </Pressable>
          <Text style={{ color: "gray", marginTop: 10 }}>{product?.description}</Text>

        </View>
      </ScrollView>

      {/* Image Modal */}
      <Modal visible={showImageModal} transparent={true} onRequestClose={toggleImageModal}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
          <Image source={{ uri: product?.image }} style={{ resizeMode: "contain", width: "80%", height: "80%" }} />
          <Pressable onPress={toggleImageModal} style={{ position: "absolute", top: 20, right: 20 }}>
            <MaterialIcons name="close" size={30} color={"#fff"} />
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Styles for components
const styles = {
  quantityButton: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
};

export default DetailScreen;
