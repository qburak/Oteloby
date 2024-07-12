import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { act } from 'react'
import CustomButton from './CustomButton';

const { width, height } = Dimensions.get('screen');

const TicketCard = ({onPress,start,end,room,bed,number,checkIn,active}) => {
    return (
        <View style={styles.container}>
            <Text style={{marginVertical:8,fontWeight:'700',fontSize:22}}>Oteloby</Text>
            <Text>Başlangıç Tarihi : {start} </Text>
            <Text style={{marginVertical:4}}>Bitiş Tarihi : {end} </Text>
            <Text style={{marginBottom:4}}>{number} numaralı oda, {bed} Yataklı, {room} Odalı</Text>
            <View style={{ flexDirection: 'row',justifyContent:'space-between',marginVertical:5, }}>
                <CustomButton active={active} onPress={onPress} title={"CheckIn Yap"} />
                <Text style={{alignSelf:'center' }}> CheckIn : {checkIn ? "yapıldı" : "yapılmadı"}</Text>

            </View>

        </View>
    )
}

export default TicketCard

const styles = StyleSheet.create({
    container: {
        padding:10,
        borderWidth:0.75,
        margin:12,
        borderRadius:12,

    }
})