import React, { useContext } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Pressable, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import User from "../../assets/user.png";
import AuthContext from "../features/authContext";
import { logout } from "../features/firebase/userAuth";

const account = require("../../assets/icon.png");
const help = require("../../assets/icon.png");
const notification = require("../../assets/icon.png");
const setting = require("../../assets/icon.png");

const ProfileScreen = ({ navigation }) => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    const res = await logout();
    if (res.success === true) {
      ToastAndroid.show("Logged Out Successfully", ToastAndroid.BOTTOM);
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.topSection}>
          <View style={styles.propicArea}>
            <Image source={User} style={styles.propic} />
          </View>
        </View>

        <View style={styles.buttonList}>
          {isLoggedIn ? (
            <View style={styles.buttonSection}>
              <View style={styles.buttonArea}>
                <TouchableOpacity onPress={() => navigation.navigate('accountscreen')}>
                  <Text style={styles.buttonName}>Account</Text>
                </TouchableOpacity>
                <View style={styles.sp}></View>
              </View>

              <View style={styles.buttonArea}>
                <TouchableOpacity onPress={() => navigation.navigate('cart-screen')}>
                  <Text style={styles.buttonName}>My Cart</Text>
                </TouchableOpacity>
                <View style={styles.sp}></View>
              </View>

              <View style={styles.buttonArea}>
                <TouchableOpacity onPress={() => navigation.navigate('orderscreen')}>
                  <Text style={styles.buttonName}>My Products</Text>
                </TouchableOpacity>
                <View style={styles.sp}></View>
              </View>

              <View style={styles.buttonArea}>
                <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                  <Text style={styles.buttonName}>Settings</Text>
                </TouchableOpacity>
                <View style={styles.sp}></View>
              </View>
            </View>
          ) : (
            <View style={styles.buttonSection}>
              <Text style={styles.buttonName}>Login to view your Profile!</Text>
            </View>
          )}
        </View>
      </View>

      {isLoggedIn && (
        <View style={styles.logoutButton}>
          <Pressable onPress={handleLogout}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16, textAlign: "center" }}>Log Out</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  topSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  propicArea: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 30,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#FFBB3B'
  },
  propic: {
    width: '100%',
    height: '100%',
  },
  buttonList: {
    marginTop: 20,
  },
  buttonSection: {
    marginBottom: 20,
  },
  buttonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sp: {
    height: 1,
    backgroundColor: '#00000045'
  },
  logoutButton: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  }
});

export default ProfileScreen;
