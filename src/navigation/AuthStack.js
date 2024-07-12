import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LoginScreen,SignupScreen } from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})