import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CartStackNavigator, AccountStackNavigator, MainStackNavigator, OrderStackNavigator, ProfileStackNavigator } from './StackNavigator'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Create a bottom tab navigator to manage navigation between screens
const Tab = createBottomTabNavigator()

// TabNavigator: Navigator for the bottom tab bar with icons for Home, Cart, Order, and Profile
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
          tabBarIcon: ({ size, color }) => ( // Set icon for the Home tab
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name='Cart' component={CartStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => ( // Set icon for the Cart tab
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name='Order' component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => ( // Set icon for the Order tab
            <MaterialIcons name="list-alt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name='Profile' component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => ( // Set icon for the Profile tab
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

// Export the TabNavigator component as the default export
export default TabNavigator

// StyleSheet for the TabNavigator component
const styles = StyleSheet.create({})