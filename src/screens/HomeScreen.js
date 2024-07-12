import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import { React, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { addDoc, collection, getDocs, updateDoc, doc,setDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { CustomButton } from '../components'
import RoomCard from '../components/RoomCard'
import { arrayUnion } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { width, height } = Dimensions.get('screen');


const HomeScreen = () => {
  const [data, setData] = useState([])
  const {userEmail,userId} = useSelector((state) => state.user)

  const handleTicket = async (email,uid,room,bed,number)=>{
    await takeUser(email,uid,room,bed,number)
    await takeRoom(number)
  }
  const takeUser = async (email, uid, room, bed, number) => {
    try {
      const documentRef = doc(db, "tickets", email);
      await setDoc(documentRef, {
        email: email,
        uid: uid,
        room: room,
        bed: bed,
        number: number,
      });
    } catch (e) {
      console.error("Bilet Almada HATA: ", e);
    }
  }

  const getData = async () => {
    const allData = []
    try {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      querySnapshot.forEach((doc) => {
        allData.push(doc.data())
      });
      setData(allData)
    } catch {

    }

  }
  const takeRoom = async (number) => {
    try {
      const documentRef = doc(db, "roomNumbers", "3NPrt08W7UzGbZootlad");

      await updateDoc(documentRef, {
        taken: arrayUnion(number)
      });
      console.log("eklendi")
    } catch (e) {
      console.error("ERROR: güncellenemedi ", e);
    }
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <View style={styles.container}>
      <ScrollView>
        {data.map((value, index) => {
          return (
            <RoomCard onPress={() => handleTicket(userEmail,userId,value.room,value.bed,value.number)} index={index} bed={value.bed} room={value.room} number={value.number} />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width / 1.1,
    alignItems: 'center',
    alignSelf: 'center',
  }
})







