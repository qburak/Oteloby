import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeScreen } from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen'


const Stack = createNativeStackNavigator();

const UserStack = () => {
  const { userEmail } = useSelector((state) => state.user)
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown:false}} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default UserStack

const styles = StyleSheet.create({})