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

const Drawer = createDrawerNavigator(); // Creating a drawer navigator
const Tab = createBottomTabNavigator(); // Creating a bottom tab navigator

// Custom drawer content component
function CustomDrawerContent(props) {

    const [modalVisible, setModalVisible] = useState(false); // State variable to manage modal visibility
    const { isLoggedIn, setIsLoggedIn, setCurrentUser } = useContext(AuthContext); // Extracting isLoggedIn, setIsLoggedIn, and setCurrentUser from AuthContext

    // Function to handle logout
    const handleLogout = async () => {
        setIsLoggedIn(false); // Setting isLoggedIn to false
        setCurrentUser(null); // Clearing current user
        props.navigation.navigate('homescreen'); // Navigating to HomeScreen
    };

    // Function to handle login
    const handleLogin = () => {
        props.navigation.navigate('homescreen'); // Replace 'AuthScreen' with the name of your authentication screen
        setModalVisible(!modalVisible); // Toggling modal visibility
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

// Drawer navigator component
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={CustomDrawerContent}>
            <Drawer.Screen name="Smart E-comm" component={TabNavigator} />
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            <Drawer.Screen name="Account" component={AccountScreen} />
        </Drawer.Navigator>
    );
};

// Bottom tab navigator component
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

// Main app component
const App = () => {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    );
};

export default App;

// Styles for the component
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

// This 'HomeIcon', 'CartIcon', 'OrderIcon' and 'ProfileIcon' components: Displays a MaterialIcons icons with specified color and size
const HomeIcon = ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />;
const CartIcon = ({ color, size }) => <MaterialIcons name="shopping-cart" size={size} color={color} />;
const OrderIcon = ({ color, size }) => <MaterialIcons name="list-alt" size={size} color={color} />;
const ProfileIcon = ({ color, size }) => <MaterialIcons name="account-circle" size={size} color={color} />;