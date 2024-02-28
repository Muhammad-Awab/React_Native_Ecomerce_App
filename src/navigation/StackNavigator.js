import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import DetailScreen from '../screens/DetailScreen'
import ProfileScreen from '../screens/ProfileScreen'
import OrderScreen from '../screens/OrderScreen'
import ProductListScreen from '../screens/ProductListScreen'
import AccountScreen from '../screens/AccountScreen'

const Stack = createStackNavigator()

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
            <Stack.Screen name='homescreen' component={HomeScreen} />
            <Stack.Screen name='accountscreen' component={AccountScreen} />
            <Stack.Screen name='detailscreen' component={DetailScreen} />
            <Stack.Screen name='orderscreen' component={DetailScreen} />
            <Stack.Screen name='productlistscreen' component={ProductListScreen} />
        </Stack.Navigator>
    )
}

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

export { MainStackNavigator, AccountStackNavigator, CartStackNavigator, ProfileStackNavigator, OrderStackNavigator }
