import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text, View, Image, ScrollView, Pressable, TextInput, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UserLogo from "../../assets/user.png";
import OfferCard from "../components/OfferCard";
import NewArrivalsCard from "../components/NewArrivalsCard";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthenticationModal from "../components/AuthenticationModal";
import AuthContext from "../features/authContext";
import ProductContext from "../features/productContext";
import { getProducts } from "../features/firebase/product";

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const { products, setProducts } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchAllProducts = async () => {
    const result = await getProducts();
    setProducts(result);
    setFilteredProducts(result); //initially set filteredproducts to all fetched products
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>
              Welcome, <Text style={styles.username}>{currentUser?.name}</Text>
            </Text>
            <Text style={styles.appName}>Our Fashion App</Text>
          </View>
          {!isLoggedIn && (
            <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.loginButton}>
              <Image
                source={UserLogo}
                style={styles.userLogo}
              />
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color={"#111"} />
          <TextInput
            placeholder="Search..."
            placeholderTextColor={"#666666"}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.offerSection}>
          <OfferCard />
        </View>

        <View style={styles.newArrivalsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>New Arrivals</Text>
            <Pressable onPress={() => navigation.navigate("productlistscreen")}>
              <Text style={styles.viewAllText}>View All</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredProducts.map(product =>
              <Pressable key={product.id} onPress={() => navigation.navigate("detailscreen", { productId: product.id })}>
                <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
              </Pressable>
            )}
          </ScrollView>
        </View>
        <AuthenticationModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    color: '#0066CC',
  },
  appName: {
    fontSize: 18,
    color: '#666666',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: '#CCCCCC',
  },
  userLogo: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  loginText: {
    fontWeight: 'bold',
    color: '#0066CC',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  offerSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  newArrivalsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#0066CC',
    fontSize: 16,
  },
});

export default Home;
