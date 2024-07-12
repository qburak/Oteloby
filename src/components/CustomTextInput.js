import { StyleSheet, Text, View, TextInput,Dimensions } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window')

const CustomTextInput = ({handleOnChangeText,handleValue,placeholder, secureText}) => {
    return (
        <View>
            <TextInput onChangeText={handleOnChangeText} value={handleValue} placeholder={placeholder} style={styles.textInput} secureTextEntry={secureText} />
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 0.75,
        borderRadius: 12,
        height: height / 15,
        padding: 15,
        marginVertical:6,
    }
})