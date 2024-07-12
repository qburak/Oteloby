import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { CustomButton } from '../components'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {
    const generateCode = (id) => {
        const now = new Date();
        const minutes = now.getMinutes();
        const updateMinutes = Math.floor(minutes / 5) * 5;
    
        const middlePart = id.slice(4, 9);
    
        // Dakikaların toplamını hesapla
        const minuteSum = Math.floor(updateMinutes / 10) + (updateMinutes % 10);
    
        // Yeni kodu oluştur
        const newCode = middlePart + minuteSum.toString();
        return newCode;
      };
    
      const handleGenerateCode = () => {
        const newCode = generateCode(userId);
        setCode(newCode);
      };
    const [code, setCode] = useState("kod oluştur")
    const {userId} = useSelector((state) => state.user)
  return (
    <View style={styles.container}>
      <CustomButton onPress={handleGenerateCode} title={code} active={true}/>
    </View>
  )
  
}

export default ProfileScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        alignSelf:'center',
        width:'90%',
        padding:20,
    }
})