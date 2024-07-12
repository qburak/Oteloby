import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('screen');

const RoomCard = ({ onPress, index, room, bed, number }) => {
    return (
        <View key={index}>
            <Pressable onPress={onPress} style={styles.container}>
                <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center' }}>Oteloby</Text>
                <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 6 }}>oda sayısı : {room}</Text>
                <Text style={{ fontSize: 16, fontWeight: '400', marginBottom: 6 }}>yatak sayısı : {bed}</Text>
                <Text style={{ fontSize: 16, fontWeight: '400', textAlign: 'right' }}>oda numarası {number}</Text>
            </Pressable>
        </View>

    )
}

export default RoomCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'tomato',
        width: width / 1.2,
        borderWidth: 1,
        borderRadius: 12,
        padding: 15,
        marginVertical:10,

    }
})