import React, { useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, Pressable, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProductItem from "../components/ProductItem";
import ProductContext from "../features/productContext";
import { getProducts } from "../features/firebase/product";

const ProductListScreen = ({ navigation }) => {
  const { products, setProducts } = useContext(ProductContext);

  const fetchAllProducts = async () => {
    const result = await getProducts();
    setProducts(result);
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Products",
      headerLeft: () => (
        <Pressable onPress={goBack} style={styles.headerButton}>
          <MaterialIcons name="chevron-left" size={34} color={"#111"} />
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: "white",
      },
      headerTitleAlign: "center",
    });
    fetchAllProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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

