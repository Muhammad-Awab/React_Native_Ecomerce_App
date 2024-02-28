import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Pressable, ToastAndroid } from "react-native";
import React, { useContext } from "react";
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
    const res = await logout()
    if (res.success === true) {
      ToastAndroid.show("Logged Out Successfully", ToastAndroid.BOTTOM)
      setIsLoggedIn(false);
      setCurrentUser(null)
    }
  }

  return (
    <SafeAreaView className="bg-white h-full p-6 justify-between">
      <View>
        <View className="justify-center items-center">
          <View className="border border-slate-200 rounded-lg">
            <Image source={User} className="h-32 w-32 object-cover" />
          </View>
        </View>

        <View className="mt-6">
          {isLoggedIn
            ?
            <View className="items-center justify-center">
              <Text className="text-lg font-bold">{currentUser?.name}</Text>
              <Text className="text-xs, font-bold text-gray-500">{currentUser?.email}</Text>




              <View style={{ marginTop: 40, paddingLeft: 6, paddingRight: 6 }}>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => navigation.navigate('accountscreen')}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Account</Text>
                </TouchableOpacity>
                <View className="border-b border-slate-300 mt-2 "></View>
              </View>

              <View className="mt-5 pl-6 pr-6">
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => navigation.navigate('cart-screen')}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>My Cart</Text>
                </TouchableOpacity>
                <View className="border-b border-slate-300 mt-2 "></View>
              </View>

              <View className="mt-5 pl-6 pr-6">
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => navigation.navigate('orderscreen')}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>My Products</Text>
                </TouchableOpacity>
                <View className="border-b border-slate-300 mt-2 "></View>
              </View>

              <View className="mt-5 pl-6 pr-6">
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => navigation.navigate('settings')}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Settings</Text>
                </TouchableOpacity>
                <View className="border-b border-slate-300 mt-2 "></View>
              </View>




            </View>

            :
            <View className="items-center justify-center">
              <Text className="text-lg font-bold">Login to view your Profile!</Text>
            </View>
          }
        </View>
      </View>
      {isLoggedIn &&
        <View className="justify-center items-center">
          <Pressable onPress={handleLogout} className="bg-black w-full py-4
           rounded-lg">
            <Text className="font-bold text-white text-center">Log Out</Text>
          </Pressable>
        </View>
      }
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propicArea: {
    width: 170,
    height: 170,
    borderRadius: '100%',
    borderWidth: 4,
    borderColor: '#FFBB3B'
  },
  propic: {
    width: '100%',
    height: '100%'
  },
  name: {
    marginTop: 20,
    color: 'white',
    fontSize: 32,
  },
  membership: {
    color: '#FFBB3B',
    fontSize: 18,
  },
  buttonList: {
    marginTop: 20,
  },
  buttonSection: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,

  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconArea: {
    width: 40,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  buttonName: {
    width: 300,
    fontSize: 20,
    color: 'white',
    marginLeft: 20,
  },
  sp: {
    width: 400,
    marginTop: 10,
    height: 1,
    backgroundColor: '#FFFFFF45'
  }
});
