import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AuthContext from '../features/authContext';
import { logout } from '../features/firebase/userAuth';
import { CartStackNavigator, AccountStackNavigator, MainStackNavigator, OrderStackNavigator, ProfileStackNavigator } from './StackNavigator'

import AuthenticationModal from "../components/AuthenticationModal";

import HomeScreen from '../screens/HomeScreen'; // Import your HomeScreen component
import AccountScreen from '../screens/AccountScreen'; // Import your AccountScreen component

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function CustomDrawerContent(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const { isLoggedIn, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);

    const handleLogout = async () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        props.navigation.navigate('homescreen');
    };

    const handleLogin = () => {
        props.navigation.navigate('homescreen'); // replace 'AuthScreen' with the name of your authentication screen
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.drawerContent}>
            {isLoggedIn ? (
                <Pressable onPress={handleLogout} style={styles.logoutButton}>
                    <MaterialIcons name="exit-to-app" size={24} color="black" />
                    <Text style={styles.logoutText}>Logout</Text>
                </Pressable>
            ) : (
                <Pressable onPress={handleLogin} style={styles.loginButton}>
                    <MaterialIcons name="login" size={24} color="black" />
                    <Text style={styles.loginText}>Login</Text>
                    <AuthenticationModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
                </Pressable>
            )}
        </View>
    );
}

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={CustomDrawerContent}>
            <Drawer.Screen name="Smart E-comm" component={TabNavigator} />
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            <Drawer.Screen name="Account" component={AccountScreen} />
        </Drawer.Navigator>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    height: 60
                }
            }}>
            <Tab.Screen name='Home' component={MainStackNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name='Cart' component={CartStackNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="shopping-cart" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name='Order' component={OrderStackNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="list-alt" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name='Profile' component={ProfileStackNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="account-circle" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
const App = () => {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutText: {
        marginLeft: 10,
    },
});

const HomeIcon = ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />;
const CartIcon = ({ color, size }) => <MaterialIcons name="shopping-cart" size={size} color={color} />;
const OrderIcon = ({ color, size }) => <MaterialIcons name="list-alt" size={size} color={color} />;
const ProfileIcon = ({ color, size }) => <MaterialIcons name="account-circle" size={size} color={color} />;