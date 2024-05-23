import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import AccountScreen from '../screens/AccountScreen'
import DetailScreen from '../screens/DetailScreen'
import ProductListScreen from '../screens/ProductListScreen'
import OrderScreen from '../screens/OrderScreen'
import ProfileScreen from '../screens/ProfileScreen'

// Create a stack navigator for managing navigation between screens
const Stack = createStackNavigator()

// MainStackNavigator: Navigator for main screens such as Home, Account, Product List, and Order
const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='homescreen'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#91c4f8"
                },
                headerShown: false
            }}
        >
             <Stack.Screen name='detailscreen' component={DetailScreen} />
            <Stack.Screen name='homescreen' component={HomeScreen} />
            <Stack.Screen name='accountscreen' component={AccountScreen} />
            <Stack.Screen name='productlistscreen' component={ProductListScreen} />
            <Stack.Screen name='orderscreen' component={DetailScreen} />

           
        </Stack.Navigator>
    )
}

// CartStackNavigator: Navigator for the Cart Screen
const CartStackNavigator = () => {
    return (<Stack.Navigator
        initialRouteName='cart-screen'
        screenOptions={{
            headerStyle: {
                backgroundColor: "#91c4f8"
            },
            headerShown: false
        }}
    >
        <Stack.Screen name='cart-screen' component={CartScreen} />
    </Stack.Navigator>
    )
}

// ProfileStackNavigator: Navigator for the Profile Screen
const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='profile-screen'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#91c4f8"
                },
                headerShown: false
            }}
        >
         <Stack.Screen name='profile-screen' component={ProfileScreen} />  
        </Stack.Navigator>
    )
}

// AccountStackNavigator: Navigator for the Account Screen
const AccountStackNavigator = () => {
    return (<Stack.Navigator
        initialRouteName='accountscreen'
        screenOptions={{
            headerStyle: {
                backgroundColor: "#91c4f8"
            },
            headerShown: false
        }}
    >
        <Stack.Screen name='accountscreen' component={AccountScreen} />
    </Stack.Navigator>
    )
}

// OrderStackNavigator: Navigator for the Order Screen
const OrderStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='orderscreen'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#91c4f8"
                },
                headerShown: false
            }}
        >
            <Stack.Screen name='orderscreen' component={OrderScreen} />
        </Stack.Navigator>
    )
}
// Export the navigation stacks to be used in the application
export { MainStackNavigator, AccountStackNavigator, CartStackNavigator, ProfileStackNavigator, OrderStackNavigator }
