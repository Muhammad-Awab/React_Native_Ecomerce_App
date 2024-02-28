import * as React from 'react';
import { StyleSheet, Text, Button, View, Pressable, ToastAndroid, TouchableOpacity } from 'react-native';
import { CartStackNavigator, AccountStackNavigator, MainStackNavigator, OrderStackNavigator, ProfileStackNavigator } from './StackNavigator'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


import { useContext } from "react";
import AuthContext from "../features/authContext";
import { logout } from "../features/firebase/userAuth";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// const DrawerNavigator = () => {
//     return (
//         <Drawer.Navigator initialRouteName="Home">
//             <Drawer.Screen name="Main" component={TabNavigator} />
//         </Drawer.Navigator>
//     );
// }

// const DrawerNavigator = () => {
//     return (
//         <Drawer.Navigator initialRouteName="Home">
//             <Drawer.Screen name="Main" component={TabNavigator} />
//             {/* Add a custom drawer item for logout */}
//             <Drawer.Screen
//                 name="Logout"
//                 component={LogoutScreen}
//                 options={{
//                     drawerLabel: 'Logout',
//                     drawerIcon: ({ color, size }) => (
//                         <MaterialIcons name="exit-to-app" size={size} color={color} />
//                     ),
//                 }}
//             />
//         </Drawer.Navigator>
//     );
// }

// // Screen for handling logout
// const LogoutScreen = ({ navigation }) => { // Pass navigation prop
//     const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext);

//     const handleLogout = async () => {
//         // Your logout logic here
//         setIsLoggedIn(false);
//         setCurrentUser(null);
//         // Navigate to the initial route (assuming it's your login screen)
//         navigation.navigate('homescreen'); // Replace 'Login' with your actual login screen route
//     }

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <TouchableOpacity onPress={handleLogout}>
//                 <Text>Logout</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

function CustomDrawerContent(props) {
    const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext);

    const handleLogout = async () => {
        // Your logout logic here
        setIsLoggedIn(false);
        setCurrentUser(null);
        // Navigate to the initial route (assuming it's your login screen)
        props.navigation.navigate('homescreen'); // Replace 'Login' with your actual login screen route

    }

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={handleLogout}
                icon={({ color, size }) => (
                    <MaterialIcons name="exit-to-app" size={size} color={color} />
                )}
            />
        </DrawerContentScrollView>
    );
}

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Main" component={TabNavigator} />
        </Drawer.Navigator>
    );
}
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
}

const App = () => {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    );
}

export default App;
