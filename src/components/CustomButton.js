import { Pressable, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window')

const CustomButton = ({ onPress, title, active, icon }) => {
  return (
    <View style={{ alignSelf: 'flex-end' }}>
      <Pressable onPress={() => onPress()} style={[styles.button, { backgroundColor: active ? 'red' : 'black' }]}>
        <Text style={{ fontWeight: '600', color: 'white' }}>{title}</Text>
      </Pressable>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
   //height: height / 15,
    borderRadius: 12,
    padding:12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',

  }
})     /*   <Feather name="copy" size={24} color="black" />*/
