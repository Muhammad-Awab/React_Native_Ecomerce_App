import React, { useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, Pressable, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProductItem from "../components/ProductItem";
import ProductContext from "../features/productContext";
import { getProducts } from "../features/firebase/product";

// Screen to display list of products
const ProductListScreen = ({ navigation }) => {
  const { products, setProducts } = useContext(ProductContext); // Context variables for products

  // Function to fetch all products from database
  const fetchAllProducts = async () => {
    const result = await getProducts();
    setProducts(result);
  };

  // Function to navigate back
  const goBack = () => {
    navigation.goBack();
  };

  // Effect hook to set navigation options and fetch products on component mount
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Products",
      headerLeft: () => (
        <Pressable
          onPress={goBack}
          className=" justify-center items-center h-10 w-10 mx-4 rounded-full "
        >
          <MaterialIcons name="chevron-left" size={34} color={"#111"} />
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: "white",
      },
      headerTitleAlign: "center",
    }),
      fetchAllProducts();
  }, []);

  // Render product list
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Map through products and display each product */}
        {products?.map((product) => (
          <Pressable
            key={product.id}
            onPress={() =>
              navigation.navigate("detailscreen", {
                productId: product?.id,
              })
            }
          >
            <ProductItem
              title={product?.title}
              image={product?.image}
              price={product?.price}
              brand={product?.brand}
            />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles for components
const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    marginHorizontal: 10,
  },
};

export default ProductListScreen;
